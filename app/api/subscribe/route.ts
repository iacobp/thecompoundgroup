import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/subscribe
 *
 * Body: { email: string, audience: string }
 *
 * Each product surface across The Compound has its own Resend audience so
 * we can measure demand per surface individually. Signups are stored in
 * Resend against the right audience AND a notification is sent to the
 * operator's inbox so the demand is visible in real time until the product
 * has its own dedicated inbox.
 *
 * Env:
 *   RESEND_API_KEY                          — full-access Resend API key
 *   RESEND_AUDIENCE_BARQUE_NEWSLETTER_ID    — weekly forecast newsletter
 *   RESEND_AUDIENCE_BARQUE_API_WAITLIST_ID  — API product waitlist
 *   RESEND_AUDIENCE_COMPOUND_INVESTORS_ID   — investor / acquirer interest (optional)
 *   (add RESEND_AUDIENCE_<SURFACE>_ID for every new product surface)
 *
 * Notification env:
 *   RESEND_NOTIFY_TO    — destination inbox for live signup notifications
 *                         (defaults to iacobpastina@gmail.com until we
 *                         register per-product inboxes)
 *   RESEND_NOTIFY_FROM  — verified Resend sender (e.g. "Barque <alerts@thecompound.group>"
 *                         or similar). If unset, notifications are skipped.
 */

type AudienceConfig = {
  envKey: string;
  label: string;
  surface: string;
};

const AUDIENCES: Record<string, AudienceConfig> = {
  "barque-newsletter": {
    envKey: "RESEND_AUDIENCE_BARQUE_NEWSLETTER_ID",
    label: "Barque newsletter",
    surface: "barque",
  },
  "barque-api-waitlist": {
    envKey: "RESEND_AUDIENCE_BARQUE_API_WAITLIST_ID",
    label: "Barque API waitlist",
    surface: "barque",
  },
  "compound-investors": {
    envKey: "RESEND_AUDIENCE_COMPOUND_INVESTORS_ID",
    label: "Compound investor / acquirer",
    surface: "compound",
  },
};

async function notifyOperator(opts: {
  resend: Resend;
  email: string;
  audience: AudienceConfig;
  audienceKey: string;
  referer: string | null;
  userAgent: string | null;
}) {
  const to = process.env.RESEND_NOTIFY_TO ?? "iacobpastina@gmail.com";
  const from = process.env.RESEND_NOTIFY_FROM;
  if (!from) {
    // Notification sender not configured yet — silently skip.
    // Contact is still stored against the audience in Resend.
    return;
  }

  const now = new Date().toISOString();
  const subject = `New ${opts.audience.label} signup · ${opts.email}`;
  const text = [
    `New signup on ${now}`,
    ``,
    `Audience: ${opts.audience.label}`,
    `Audience key: ${opts.audienceKey}`,
    `Surface: ${opts.audience.surface}`,
    `Email: ${opts.email}`,
    `Referer: ${opts.referer ?? "unknown"}`,
    `User-Agent: ${opts.userAgent ?? "unknown"}`,
  ].join("\n");

  try {
    await opts.resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: opts.email,
    });
  } catch (err) {
    // Never fail the signup because the notification failed.
    console.error("subscribe notify error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, audience } = (await req.json()) as {
      email?: string;
      audience?: string;
    };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "That email doesn't look right." },
        { status: 400 }
      );
    }

    const audienceKey = audience ?? "barque-newsletter";
    const audienceConfig = AUDIENCES[audienceKey];
    if (!audienceConfig) {
      return NextResponse.json({ error: "Unknown audience." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env[audienceConfig.envKey];
    if (!apiKey || !audienceId) {
      console.error("Resend config missing:", {
        hasApiKey: !!apiKey,
        hasAudienceId: !!audienceId,
        envKey: audienceConfig.envKey,
      });
      return NextResponse.json(
        { error: "Subscription service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend contact create error:", error);
      const alreadyExists =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string" &&
        (error as { message: string }).message
          .toLowerCase()
          .includes("already");
      if (alreadyExists) {
        // Fire-and-forget: still worth notifying on repeat intent, since
        // someone coming back to sign up again is a real demand signal.
        notifyOperator({
          resend,
          email,
          audience: audienceConfig,
          audienceKey,
          referer: req.headers.get("referer"),
          userAgent: req.headers.get("user-agent"),
        }).catch(() => {});
        return NextResponse.json(
          { ok: true, note: "Already on the list." },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "We couldn't add your email. Try again in a moment." },
        { status: 502 }
      );
    }

    // New signup — notify operator in the background. Don't block the
    // response on it; the contact is already safely in Resend.
    notifyOperator({
      resend,
      email,
      audience: audienceConfig,
      audienceKey,
      referer: req.headers.get("referer"),
      userAgent: req.headers.get("user-agent"),
    }).catch(() => {});

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("subscribe route error:", err);
    return NextResponse.json(
      { error: "Unexpected error. Try again shortly." },
      { status: 500 }
    );
  }
}
