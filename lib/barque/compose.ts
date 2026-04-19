/**
 * Compose helpers — turn CouncilOutput into:
 *   1. ra_log.tsv rows (one per forecast update) to append
 *   2. brief markdown file for the repo
 *   3. email HTML + text for Resend
 */

import type { CouncilOutput } from "./council";

function nowUTCStamp(runDate: string): string {
  return `${runDate} 07:00 UTC`;
}

export function buildRaLogRows(output: CouncilOutput): string {
  // Each row: run_date	forecast_id	trigger	new_probability	delta	new_signal_strength	signals_cited	counter_narrative	notes	flagged
  const stamp = nowUTCStamp(output.runDate);
  return output.forecastUpdates
    .map((u) => {
      const delta = u.newProb - u.priorProb;
      const signalsCited = u.signalsCited.join(" | ");
      const notes = u.signal.replace(/\t/g, " ").replace(/\n/g, " ");
      const counter = (u.counterNarrative ?? "").replace(/\t/g, " ").replace(/\n/g, " ");
      return [
        stamp,
        u.forecastId,
        "time",
        u.newProb.toFixed(2),
        delta.toFixed(2),
        Math.round(u.signalStrength).toString(),
        signalsCited,
        counter,
        notes,
        u.flagged ? "true" : "false",
      ].join("\t");
    })
    .join("\n");
}

export function buildBriefMarkdown(output: CouncilOutput): string {
  // If the council already produced a briefMarkdown, trust it.
  // Otherwise synthesize one from the pieces.
  if (output.briefMarkdown && output.briefMarkdown.trim().length > 200) {
    return output.briefMarkdown;
  }

  const dateLong = new Date(output.runDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dayOfWeek = new Date(output.runDate).toLocaleDateString("en-GB", {
    weekday: "long",
  });

  const parts: string[] = [];
  parts.push("---");
  parts.push(`slug: "${output.runDate}-dawn-brief"`);
  parts.push(`date: "${output.runDate}"`);
  parts.push(`dayOfWeek: "${dayOfWeek}"`);
  parts.push(`kind: "${output.runType}"`);
  parts.push("---");
  parts.push("");
  parts.push(`# Dawn Brief · ${dateLong}`);
  parts.push("");
  parts.push("## How Barque got smarter today");
  parts.push("");
  for (const b of output.metaCognition) {
    parts.push(`- ${b}`);
  }
  parts.push("");
  parts.push("## Forecast updates");
  parts.push("");
  for (const u of output.forecastUpdates) {
    const delta = u.newProb - u.priorProb;
    const deltaStr = delta >= 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2);
    parts.push(`### ${u.entity} · ${Math.round(u.newProb * 100)}% (${deltaStr})`);
    parts.push("");
    parts.push(u.signal);
    if (u.counterNarrative) {
      parts.push("");
      parts.push(`*Counter-narrative:* ${u.counterNarrative}`);
    }
    parts.push("");
  }
  if (output.augurPicks.length > 0) {
    parts.push("## Augur picks");
    parts.push("");
    for (const a of output.augurPicks) parts.push(a.body + "\n");
  }
  if (output.stoic) {
    parts.push("## Actionable · noise");
    parts.push("");
    parts.push("**Actionable**");
    for (const a of output.stoic.actionable) parts.push(`- ${a}`);
    parts.push("");
    parts.push("**Noise**");
    for (const n of output.stoic.noise) parts.push(`- ${n}`);
    parts.push("");
  }
  if (output.premortem) {
    parts.push(`## Premortem — ${output.premortem.entity}`);
    parts.push("");
    parts.push(output.premortem.body);
    if (output.premortem.impliedDelta) {
      parts.push("");
      parts.push(`*${output.premortem.impliedDelta}*`);
    }
    parts.push("");
  }
  if (output.newForecastCandidates.length > 0) {
    parts.push("## Candidates for the log");
    parts.push("");
    for (const c of output.newForecastCandidates) {
      parts.push(`### ${Math.round(c.probability * 100)}% · resolves ${c.resolutionDate}`);
      parts.push("");
      parts.push(c.statement);
      parts.push("");
      parts.push(c.rationale);
      parts.push("");
    }
  }
  return parts.join("\n");
}

export function buildEmailHtml(output: CouncilOutput): string {
  // Convert emailBody markdown into simple HTML. Keep dependencies zero.
  const md = output.emailBody;
  const html = md
    .split("\n\n")
    .map((para) => {
      if (para.startsWith("## "))
        return `<h2 style="font-family:Georgia,serif;font-size:18px;margin:24px 0 8px;">${escape(para.slice(3))}</h2>`;
      if (para.startsWith("# "))
        return `<h1 style="font-family:Georgia,serif;font-size:22px;margin:24px 0 8px;">${escape(para.slice(2))}</h1>`;
      if (para.startsWith("- ")) {
        const items = para
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => `<li style="margin-bottom:6px;">${escape(l.slice(2))}</li>`)
          .join("");
        return `<ul style="padding-left:20px;margin:8px 0 16px;">${items}</ul>`;
      }
      return `<p style="margin:0 0 14px;line-height:1.55;">${escape(para)}</p>`;
    })
    .join("\n");

  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,Inter,sans-serif;color:#1C1C1A;background:#F4F1EB;margin:0;padding:28px;">
<div style="max-width:620px;margin:0 auto;">
<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#6B6A66;margin-bottom:12px;">Barque · Dawn Brief</div>
${html}
<hr style="border:none;border-top:1px solid #E3DED1;margin:32px 0 14px;"/>
<div style="font-size:12px;color:#6B6A66;">Sent by Ra · ${output.runDate}. The Dawn Log publishes weekly highlights at thecompound.group/barque/log.</div>
</div>
</body></html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
