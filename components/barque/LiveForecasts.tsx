import { Reveal } from "../Reveal";
import { forecasts, domainLabel } from "@/lib/barque-data";

function daysFrom(iso: string) {
  const now = new Date("2026-04-19").getTime();
  const target = new Date(iso).getTime();
  return Math.max(0, Math.round((target - now) / (1000 * 60 * 60 * 24)));
}

export function LiveForecasts() {
  return (
    <section
      id="forecasts"
      className="relative py-24 md:py-36 border-t border-border bg-cream text-ink"
    >
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                II
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Live forecasts
              </span>
            </div>
            <span className="hidden md:inline text-[11px] uppercase tracking-[0.25em] text-ink/45">
              Updated 19 April 2026
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-ink text-[34px] sm:text-[40px] md:text-[64px] lg:text-[72px] leading-[1.04] tracking-tightest mb-5 md:mb-6 max-w-[24ch]">
            Predictions with{" "}
            <em className="italic text-sage-soft">resolution dates</em>.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] text-ink/70 max-w-[58ch] mb-14 md:mb-24">
            Each forecast is a specific, falsifiable claim with a probability
            and a date it resolves. Probabilities are floored at 0.05 and
            capped at 0.95 — never absolute, never hedged. When a forecast
            resolves we score it with Brier and publish the result, even when
            it hurts.
          </p>
        </Reveal>

        <div className="space-y-8 md:space-y-10">
          {forecasts.map((f, i) => {
            const daysLeft = daysFrom(f.resolutionDate);
            return (
              <Reveal key={f.id} delay={120 * i}>
                <article className="group grid grid-cols-12 gap-x-4 gap-y-5 md:gap-8 py-8 md:py-10 border-t border-ink/10 transition-colors hover:border-ink/30">
                  <div className="col-span-12 md:col-span-2 flex items-baseline md:block gap-3">
                    <div className="font-display italic text-sage-soft text-[14px] md:text-[16px]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50 md:mt-2">
                      {domainLabel[f.domain] ?? f.domain}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <div className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-ink/45 mb-2">
                      {f.entity}
                    </div>
                    <p className="font-display text-[20px] sm:text-[22px] md:text-[28px] leading-[1.2] text-ink tracking-snug max-w-[44ch]">
                      {f.prediction}
                    </p>
                    <p className="mt-3 md:mt-4 text-[13px] md:text-[14px] leading-[1.6] text-ink/60 max-w-[52ch]">
                      {f.notes}
                    </p>
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                      Probability
                    </div>
                    <div className="font-display text-ink text-[36px] sm:text-[44px] md:text-[56px] leading-none tracking-tightest mt-2">
                      {Math.round(f.probability * 100)}
                      <span className="text-[18px] sm:text-[20px] md:text-[22px] text-ink/55 align-top ml-1">
                        %
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-ink/50 mt-2">
                      Signal strength {f.signalStrength}
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-2 md:text-right">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                      Resolves
                    </div>
                    <div className="font-display text-ink text-[18px] sm:text-[22px] md:text-[24px] leading-tight tracking-snug mt-2">
                      {new Date(f.resolutionDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-ink/50 mt-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-soft animate-pulse align-middle mr-1.5" />
                      {daysLeft} days
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
