import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { readFile, writeFile } from "@/lib/barque/github";
import { runCouncil } from "@/lib/barque/council";
import {
  buildBriefMarkdown,
  buildEmailHtml,
  buildRaLogRows,
} from "@/lib/barque/compose";

/**
 * GET /api/cron/ra
 *
 * Vercel cron hits this endpoint daily at 05:00 UTC (07:00 Bucharest).
 * Authorization: Bearer <CRON_SECRET> is injected by Vercel.
 *
 * Flow:
 *   1. Read barque repo state (forecasts.tsv, ra_log.tsv, council prompt, etc.)
 *   2. Call the Council via Anthropic API (Opus 4.7 + web search)
 *   3. Append ra_log rows, commit brief markdown, back to github.com/iacobp/barque
 *   4. Send email to the operator via Resend
 */

export const maxDuration = 300; // Vercel Pro Fluid Compute ceiling
export const dynamic = "force-dynamic";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isSunday(iso: string): boolean {
  // getUTCDay(): 0 = Sunday
  return new Date(iso + "T00:00:00Z").getUTCDay() === 0;
}

export async function GET(req: NextRequest) {
  // Vercel Cron sets this header; reject anything else.
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runDate = todayISO();
  const weekly = isSunday(runDate);

  try {
    // 1. Read barque repo state
    const [council, program, historical, forecasts, raLog] = await Promise.all([
      readFile("ra/council-prompt.md"),
      readFile("program.md"),
      readFile("historical-cases.md"),
      readFile("forecasts.tsv"),
      readFile("ra/ra_log.tsv"),
    ]);

    // 2. Run the council
    const output = await runCouncil({
      councilPrompt: council.content,
      programMd: program.content,
      historicalCasesMd: historical.content,
      forecastsTsv: forecasts.content,
      raLogTsv: raLog.content,
      runDate,
      isWeekly: weekly,
    });

    // 3. Append ra_log rows + commit brief to the repo
    const newRows = buildRaLogRows(output);
    if (newRows.length > 0) {
      const updatedRaLog = raLog.content.endsWith("\n")
        ? raLog.content + newRows + "\n"
        : raLog.content + "\n" + newRows + "\n";
      await writeFile({
        path: "ra/ra_log.tsv",
        content: updatedRaLog,
        sha: raLog.sha,
        message: `Ra run ${runDate}: ${output.forecastUpdates.length} forecast${output.forecastUpdates.length === 1 ? "" : "s"} re-evaluated`,
      });
    }

    const briefMd = buildBriefMarkdown(output);
    const briefPath = `briefs/${runDate}.md`;
    // If a brief exists for today (re-run), overwrite; otherwise create.
    let existingSha: string | null = null;
    try {
      const existing = await readFile(briefPath);
      existingSha = existing.sha;
    } catch {
      existingSha = null;
    }
    await writeFile({
      path: briefPath,
      content: briefMd,
      sha: existingSha,
      message: `Dawn Brief — ${runDate}`,
    });

    // 4. Send email via Resend (best-effort; don't fail the run on mail errors)
    let mailStatus: "sent" | "skipped" | "error" = "skipped";
    const resendKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.RESEND_NOTIFY_TO ?? "iacobpastina@gmail.com";
    const notifyFrom =
      process.env.RESEND_NOTIFY_FROM ?? "Barque <onboarding@resend.dev>";
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: notifyFrom,
          to: notifyTo,
          subject: output.emailSubject,
          html: buildEmailHtml(output),
          text: output.emailBody,
          replyTo: notifyTo,
        });
        mailStatus = "sent";
      } catch (err) {
        console.error("Resend send error:", err);
        mailStatus = "error";
      }
    }

    return NextResponse.json({
      ok: true,
      runDate,
      weekly,
      forecastsReevaluated: output.forecastUpdates.length,
      flaggedCount: output.forecastUpdates.filter((u) => u.flagged).length,
      candidateCount: output.newForecastCandidates.length,
      augurPickCount: output.augurPicks.length,
      briefCommitted: briefPath,
      mail: mailStatus,
    });
  } catch (err) {
    console.error("Ra cron run failed:", err);
    // Best-effort diagnostic email
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_NOTIFY_FROM ?? "Barque <onboarding@resend.dev>",
          to: process.env.RESEND_NOTIFY_TO ?? "iacobpastina@gmail.com",
          subject: `Barque · Dawn Brief · ${runDate} — RUN FAILED`,
          text: `Ra's ${runDate} run failed.\n\nError:\n${err instanceof Error ? err.message : String(err)}\n\nStack:\n${err instanceof Error ? err.stack ?? "" : ""}`,
        });
      }
    } catch (mailErr) {
      console.error("Diagnostic mail also failed:", mailErr);
    }
    return NextResponse.json(
      {
        ok: false,
        runDate,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
