import Link from "next/link";
import { Reveal } from "../Reveal";
import { BriefCard } from "./BriefCard";
import { getRecentBriefs, briefStats } from "@/lib/barque-briefs";

/**
 * Dawn Briefs preview — sits on the main /barque page, shows the
 * most recent briefs, links to /barque/log. The living-journal
 * evidence that Barque is getting smarter in public.
 */
export function DawnBriefsPreview() {
  const recent = getRecentBriefs(3);
  if (recent.length === 0) return null;

  return (
    <section
      id="log"
      className="relative py-24 md:py-36 border-t border-border bg-cream text-ink"
    >
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-14 md:mb-20">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                V
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                The Dawn Log
              </span>
            </div>
            <Link
              href="/barque/log"
              className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/55 hover:text-sage-soft transition-colors"
            >
              <span>All briefs</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-ink text-[34px] sm:text-[40px] md:text-[64px] lg:text-[72px] leading-[1.04] tracking-tightest mb-6 max-w-[22ch]">
            The ship returns.{" "}
            <em className="italic text-sage-soft">We log what it saw.</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] text-ink/70 max-w-[58ch] mb-12 md:mb-20">
            Ra runs each dawn. On Sundays the brief expands — the week&apos;s
            material moves, a rotated premortem, the Augur&apos;s weird
            signals, and candidate forecasts awaiting approval. This is what
            the log publishes.
          </p>
        </Reveal>

        <div>
          {recent.map((brief) => (
            <Reveal key={brief.slug}>
              <BriefCard brief={brief} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 md:mt-16 flex items-center justify-between">
            <Link
              href="/barque/log"
              className="inline-flex items-center gap-3 font-display text-ink text-[18px] md:text-[20px] tracking-snug border-b border-ink/50 hover:border-sage-soft hover:text-sage-soft transition-colors pb-1"
            >
              <span>Read every brief</span>
              <span aria-hidden>→</span>
            </Link>
            <span className="text-[12px] md:text-[13px] text-ink/50">
              {briefStats.total} published ·{" "}
              {briefStats.firstBriefDate
                ? `since ${new Date(briefStats.firstBriefDate).toLocaleDateString(
                    "en-GB",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}`
                : ""}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

