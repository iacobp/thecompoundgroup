import Link from "next/link";
import { Reveal } from "./Reveal";

const loops = [
  {
    id: "Signal",
    detail:
      "Search demand, reader questions, changing prices, partner status, and market events enter as evidence rather than instinct.",
  },
  {
    id: "Decision",
    detail:
      "The system turns evidence into a small queue. Standards and editorial judgment decide what is allowed to change.",
  },
  {
    id: "Publish",
    detail:
      "Useful comparisons, tools, and routes meet a specific decision. Each property adapts the engine to its own audience.",
  },
  {
    id: "Learn",
    detail:
      "Traffic, engagement, conversion, and failures return to the record. The next cycle starts with what actually happened.",
  },
];

/**
 * A static, public explanation of how the studio operates.
 *
 * It deliberately carries no operating figures. The ledger is the one public
 * surface for those, while this section explains the repeatable system that
 * creates them. Keeping the diagram as ordinary server-rendered markup makes
 * it cheap to load, straightforward to hand off, and easy for an acquirer to
 * inspect without trusting a black box.
 */
export function OperatingSystem() {
  return (
    <section id="operating-system" className="border-t border-border bg-ink text-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-12 gap-8 md:gap-14">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-5 mb-8">
              <span className="font-display italic text-bronze text-[22px] md:text-[28px]">∞</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/55">
                The operating system
              </span>
            </div>

            <h2 className="font-display text-[42px] sm:text-[52px] md:text-[72px] leading-[0.94] tracking-tightest max-w-[11ch]">
              A portfolio that learns <em className="text-sage italic">in public.</em>
            </h2>

            <p className="mt-8 max-w-[43ch] text-[16px] md:text-[18px] leading-[1.65] text-cream/70">
              Each property has its own audience and subject matter. The operating pattern is shared: find a real decision, make the answer more useful, measure the result, and feed the evidence into the next pass.
            </p>

            <p className="mt-5 max-w-[43ch] text-[14px] md:text-[15px] leading-[1.7] text-cream/55">
              Automation handles repeatable observation and maintenance. People retain control of standards, editorial conclusions, and consequential changes.
            </p>

            <Link
              href="/numbers"
              className="group mt-10 inline-flex items-baseline gap-3 text-cream hover:text-sage transition-colors"
            >
              <span className="font-display text-[22px] md:text-[26px] tracking-tightest">
                Inspect the evidence trail
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-7">
            <div className="border-y border-cream/20">
              {loops.map((loop, index) => (
                <div
                  key={loop.id}
                  className="grid grid-cols-12 gap-5 border-b border-cream/15 py-7 last:border-b-0 md:py-9"
                >
                  <div className="col-span-2 font-mono text-[11px] tracking-[0.18em] text-bronze">
                    0{index + 1}
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-display text-[26px] md:text-[34px] leading-none tracking-tightest">
                      {loop.id}
                    </h3>
                  </div>
                  <p className="col-span-10 col-start-3 md:col-span-6 md:col-start-7 text-[14px] md:text-[15px] leading-[1.65] text-cream/65">
                    {loop.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45">
              <span>Evidence in</span>
              <span aria-hidden className="h-px w-8 bg-cream/30" />
              <span>Human rules</span>
              <span aria-hidden className="h-px w-8 bg-cream/30" />
              <span>Useful action</span>
              <span aria-hidden className="h-px w-8 bg-cream/30" />
              <span>Recorded outcome</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
