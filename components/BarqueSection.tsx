import Link from "next/link";
import { Reveal } from "./Reveal";
import { stats } from "@/lib/barque-data";

/**
 * Homepage teaser for Barque. Sits after ResearchFramework (the "how")
 * and frames Barque as the intelligence layer behind it.
 *
 * Stays on cream so the page rhythm is preserved — the dark experience
 * lives on the /barque page itself.
 */
export function BarqueSection() {
  return (
    <section
      id="barque"
      className="relative py-24 md:py-40 border-t border-border bg-cream text-ink overflow-hidden"
    >
      {/* Faint star specks in a band behind the text — just enough to tease */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 22% 28%, #8B6F47 40%, transparent 41%), radial-gradient(1.5px 1.5px at 44% 62%, #3B5D4F 40%, transparent 41%), radial-gradient(1px 1px at 68% 38%, #8B6F47 40%, transparent 41%), radial-gradient(1.5px 1.5px at 86% 72%, #3B5D4F 40%, transparent 41%), radial-gradient(1px 1px at 58% 18%, #8B6F47 40%, transparent 41%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-14 md:mb-20">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                ✧
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Intelligence layer
              </span>
            </div>
            <span className="hidden md:inline text-[11px] uppercase tracking-[0.25em] text-ink/45">
              Barque · Vol. 01
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-ink text-[38px] sm:text-[44px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tightest max-w-[16ch]">
              Research is the{" "}
              <em className="italic text-sage-soft">whole game</em>.
            </h2>
            <p className="mt-6 md:mt-8 text-[15px] sm:text-[16px] md:text-[19px] leading-[1.55] text-ink/75 max-w-[52ch]">
              <em className="italic text-ink">Barque</em> is the protocol we
              lean on for it. Curiosity paired with a dataset far larger than
              any one mind can hold — cross-signal fusion, five-agent
              scenarios, Brier-scored forecasts. It tells us what to build,
              what to skip, and when the window opens.
            </p>

            <Reveal delay={200}>
              <div className="mt-10 md:mt-14 flex items-center gap-6">
                <Link
                  href="/barque"
                  className="inline-flex items-center gap-3 font-display text-ink text-[18px] md:text-[20px] tracking-snug border-b border-ink/50 hover:border-sage-soft hover:text-sage-soft transition-colors pb-1"
                >
                  <span>Read the log</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/barque#subscribe"
                  className="text-[13px] uppercase tracking-[0.22em] text-ink/55 hover:text-ink transition-colors"
                >
                  Weekly forecasts
                </Link>
              </div>
            </Reveal>
          </Reveal>

          <Reveal delay={180} className="col-span-12 md:col-span-5 md:pl-6">
            <div className="border-t border-ink/15 pt-8 md:pt-10 space-y-7 md:space-y-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                  Backtests resolved
                </div>
                <div className="font-display text-ink text-[44px] sm:text-[52px] md:text-[64px] leading-none tracking-tightest mt-2">
                  {stats.backtestsResolved}
                </div>
                <div className="text-[13px] text-ink/55 mt-2">
                  {stats.hits} of {stats.backtestsResolved} direction-correct
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                  Average Brier score
                </div>
                <div className="font-display text-ink text-[44px] sm:text-[52px] md:text-[64px] leading-none tracking-tightest mt-2">
                  {stats.avgBrier.toFixed(3)}
                </div>
                <div className="text-[13px] text-ink/55 mt-2">
                  Lower is better · below 0.10 is strong calibration
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                  Live forecasts
                </div>
                <div className="font-display text-ink text-[44px] sm:text-[52px] md:text-[64px] leading-none tracking-tightest mt-2">
                  {stats.forecastsLive}
                </div>
                <div className="text-[13px] text-ink/55 mt-2">
                  Currently pending, with public resolution dates
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
