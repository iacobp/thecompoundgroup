import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { anchors } from "@/lib/generated/anchors";

type Numeric = {
  to: number;
  suffix?: string;
  label: string;
  note: string;
};

/**
 * Every figure here is read from lib/generated/anchors.ts, and every one of
 * them is a GLP-1 Picks number, which the eyebrow now says out loud. It used
 * to publish a page total, a provider count and a partner count as portfolio
 * figures "as of April", each of them well below what the anchor carries.
 *
 * There is no anchored total page count: the anchor records it as no-anchor,
 * because a total is a property of the rendered sitemap and no sitemap
 * snapshot is committed anywhere the generator can read. The anchor's own
 * instruction is to sum the route families and name them, which is what the
 * first tile does.
 */
const g = anchors.products.glp1picks.facts;

const routeFamilyPages =
  Number(g.providerCount.value) +
  Number(g.comparisonPageCount.value) +
  Number(g.stateGuideCount.value) +
  Number(g.blogPostCount.value);

const numbers: Numeric[] = [
  {
    to: routeFamilyPages,
    label: "Pages in four route families",
    note: "Reviews, head-to-head comparisons, state guides, articles",
  },
  {
    to: Number(g.providerCount.value),
    label: "Providers reviewed",
    note: "Scored on all-in monthly cost",
  },
  {
    to: Number(g.stateGuideCount.value),
    label: "State-level guides",
    note: "Including Medicaid coverage detail",
  },
  {
    to: Number(g.affiliatePartnerCount.value),
    label: "Affiliate partners",
    note: "Disclosed on every relevant page",
  },
];

export function Metrics() {
  return (
    <section className="py-20 md:py-28 border-t border-border bg-sand/60 relative overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-5 mb-14 md:mb-20">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              ¶
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              GLP-1 Picks · Read from the index on {g.providerCount.asOf}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-14">
          {numbers.map((n, i) => (
            <Reveal key={n.label} delay={i * 100}>
              <div className="border-t border-ink/15 pt-5 md:pt-6">
                <div className="font-display text-ink text-[44px] sm:text-[56px] md:text-[88px] leading-[0.9] tracking-tightest mb-3 md:mb-4 tabular-nums">
                  <CountUp to={n.to} suffix={n.suffix} duration={1800} />
                </div>
                <div className="text-[12px] sm:text-[13px] md:text-[14px] text-ink font-medium mb-1">
                  {n.label}
                </div>
                <div className="text-[11px] sm:text-[12px] text-muted leading-[1.5]">{n.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
