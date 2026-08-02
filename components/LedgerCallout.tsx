import Link from "next/link";
import { Reveal } from "./Reveal";
import { ledger } from "@/lib/generated/ledger";

/**
 * Replaces the homepage metrics board.
 *
 * That board was a second ledger. Four tiles of portfolio scale, sitting on the
 * homepage, restating figures /numbers also carried, which meant two surfaces to
 * keep honest and two vintages to reconcile every time a product moved. The
 * operator's call on 2026-08-02 was that /numbers is the single ledger surface
 * and the only page permitted to state an operating number. So this band states
 * none. It says what is on the ledger and how recently it was generated, and
 * sends the reader there.
 *
 * The generated date is the one exception and it is not a claim about the
 * portfolio: it is a claim about this file, which is the thing a reader needs in
 * order to know whether the link is worth following.
 */
export function LedgerCallout() {
  const sections = Object.values(ledger.sectionTitles);

  return (
    <section className="py-20 md:py-28 border-t border-border bg-sand/60">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-14 items-start">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-5 mb-8">
              <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
                ¶
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
                The ledger
              </span>
            </div>
            <h2 className="font-display text-ink text-[36px] sm:text-[48px] md:text-[64px] leading-[0.98] tracking-tightest max-w-[14ch]">
              Every number,{" "}
              <em className="italic text-sage">including the bad ones.</em>
            </h2>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-7">
            <p className="text-[16px] md:text-[19px] leading-[1.6] text-ink/75 max-w-[56ch]">
              Revenue and earnings per partner. Search performance on every
              property, and the one property that is not connected yet. Forecast
              accuracy with the wrong calls written up in the same detail as the
              right ones. What broke, and how many days it ran green while
              broken. What we published and whether search ever found it. And the
              costs nobody here is tracking, listed as untracked rather than left
              off.
            </p>

            <p className="mt-6 text-[15px] leading-[1.65] text-ink/60 max-w-[56ch]">
              It lives on one page because a number that appears in two places
              eventually disagrees with itself. This site used to state portfolio
              scale in four places on four different dates. Now it states it in
              one.
            </p>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
              {sections.map((s) => (
                <li
                  key={s}
                  className="text-[12px] uppercase tracking-[0.18em] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>

            <Link
              href="/numbers"
              className="group mt-10 inline-flex items-baseline gap-3 text-ink hover:text-sage transition-colors"
            >
              <span className="font-display text-[22px] md:text-[26px] tracking-tightest">
                Read the ledger
              </span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-ink/40">
              Generated {ledger.generatedAt}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
