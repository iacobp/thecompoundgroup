import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/subscribe
 *
 * Body: { email: string, audience: "barque-newsletter" | "barque-api-waitlist" }
 *
 * Env:
 *   RESEND_API_KEY                          — full-access Resend API key
 *   RESEND_AUDIENCE_BARQUE_NEWSLETTER_ID    — audience for weekly forecast newsletter
 *   RESEND_AUDIENCE_BARQUE_API_WAITLIST_ID  — audience for API product waitlist
 *
 * Segmentation matters: API-waitlist intent is a different willingness-to-pay
 * signal than newsletter intent, and we want to measure them separately.
 */

const AUDIENCE_ENV_KEY: Record<string, string> = {
  "barque-newsletter": "RESEND_AUDIENCE_BARQUE_NEWSLETTER_ID",
  "barque-api-waitlist": "RESEND_AUDIENCE_BARQUE_API_WAITLIST_ID",
};

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
    const envKey = AUDIENCE_ENV_KEY[audienceKey];
    if (!envKey) {
      return NextResponse.json(
        { error: "Unknown audience." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env[envKey];
    if (!apiKey || !audienceId) {
      // Don't leak which env var is missing in the client-facing message.
      console.error("Resend config missing:", {
        hasApiKey: !!apiKey,
        hasAudienceId: !!audienceId,
        envKey,
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
      // Resend returns a friendly-ish error object; surface its message but
      // don't echo internal fields.
      console.error("Resend contact create error:", error);
      const alreadyExists =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string" &&
        (error as { message: string }).message.toLowerCase().includes("already");
      if (alreadyExists) {
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

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("subscribe route error:", err);
    return NextResponse.json(
      { error: "Unexpected error. Try again shortly." },
      { status: 500 }
    );
  }
}
