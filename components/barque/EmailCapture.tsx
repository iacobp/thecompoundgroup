"use client";

import { useState } from "react";
import { Reveal } from "../Reveal";

type AudienceKey = "barque-newsletter" | "barque-api-waitlist";

const audiences: { key: AudienceKey; label: string; blurb: string }[] = [
  {
    key: "barque-newsletter",
    label: "Weekly forecasts",
    blurb:
      "One short brief every Sunday — the week's new signals, the Brier movements, the scenarios we're tracking.",
  },
  {
    key: "barque-api-waitlist",
    label: "API waitlist",
    blurb:
      "Programmatic access opens once the track record crosses 20 resolved forecasts. Early access invites go here first.",
  },
];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok"; note?: string } | { kind: "error"; msg: string };

export function EmailCapture() {
  const [audience, setAudience] = useState<AudienceKey>("barque-newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; note?: string };
      if (!res.ok || !data.ok) {
        setStatus({ kind: "error", msg: data.error ?? "Something went wrong." });
        return;
      }
      setStatus({ kind: "ok", note: data.note });
      setEmail("");
    } catch {
      setStatus({ kind: "error", msg: "Network error. Try again." });
    }
  }

  const active = audiences.find((a) => a.key === audience) ?? audiences[0];

  return (
    <section
      id="subscribe"
      className="relative py-28 md:py-44 border-t border-cream/10 bg-ink text-cream overflow-hidden"
    >
      {/* Subtle star specks as decoration */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, #C9B98A 40%, transparent 41%), radial-gradient(1px 1px at 38% 74%, #C9B98A 40%, transparent 41%), radial-gradient(1.5px 1.5px at 71% 31%, #F4F1EB 40%, transparent 41%), radial-gradient(1px 1px at 88% 62%, #8FB4A4 40%, transparent 41%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-5 mb-8 md:mb-10">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                V
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/55">
                Receive
              </span>
            </div>

            <h2 className="font-display text-cream text-[40px] md:text-[60px] lg:text-[72px] leading-[1.04] tracking-tightest max-w-[18ch]">
              Get the log{" "}
              <em className="italic text-sage-soft">before the market does</em>.
            </h2>

            <p className="mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.6] text-cream/70 max-w-[44ch]">
              Forecasts arrive long before the news cycle catches up. Two
              separate lists, two different intents — pick one, pick both.
            </p>
          </Reveal>

          <div className="col-span-12 md:col-span-7 md:col-start-7">
            <Reveal delay={120}>
              <div className="space-y-3 mb-8">
                {audiences.map((a) => {
                  const isActive = audience === a.key;
                  return (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => setAudience(a.key)}
                      className={`w-full text-left px-6 py-5 rounded-md border transition-all duration-300 ${
                        isActive
                          ? "border-sage-soft bg-sage-soft/[0.08]"
                          : "border-cream/15 hover:border-cream/35 bg-cream/[0.02]"
                      }`}
                      aria-pressed={isActive}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-display text-cream text-[22px] md:text-[26px] tracking-snug">
                          {a.label}
                        </div>
                        <div
                          className={`h-3 w-3 rounded-full border transition-colors ${
                            isActive
                              ? "bg-sage-soft border-sage-soft"
                              : "bg-transparent border-cream/40"
                          }`}
                          aria-hidden
                        />
                      </div>
                      <p className="mt-2 text-[13px] md:text-[14px] leading-[1.55] text-cream/65">
                        {a.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={240}>
              <form
                onSubmit={submit}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <label className="sr-only" htmlFor="barque-email">
                  Email address
                </label>
                <input
                  id="barque-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@somewhere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-cream/[0.06] border border-cream/20 rounded-md px-5 py-4 text-cream placeholder:text-cream/40 focus:border-sage-soft focus:outline-none focus:ring-0 transition-colors"
                  disabled={status.kind === "sending"}
                />
                <button
                  type="submit"
                  disabled={status.kind === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-sage-soft hover:bg-sage text-cream px-6 py-4 text-[14px] uppercase tracking-[0.18em] font-medium transition-colors disabled:opacity-60"
                >
                  {status.kind === "sending" ? "Sending…" : "Join " + active.label}
                </button>
              </form>

              <div className="mt-4 min-h-[20px] text-[13px]">
                {status.kind === "ok" && (
                  <p className="text-sage-soft">
                    {status.note ?? "On the list. Check your inbox."}
                  </p>
                )}
                {status.kind === "error" && (
                  <p className="text-[#E4A48F]">{status.msg}</p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
