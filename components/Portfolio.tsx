import { GLP1PicksThumb } from "./thumbnails/GLP1PicksThumb";
import { GLP1TrackerThumb } from "./thumbnails/GLP1TrackerThumb";
import { Reveal } from "./Reveal";

type Status = "live" | "in-development" | "planned";
type Mode = "built" | "acquired";

type PortfolioItem = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  status: Status;
  mode: Mode;
  href?: string;
  thumb?: React.ReactNode;
  meta: { label: string; value: string }[];
  cta: string;
};

const items: PortfolioItem[] = [
  {
    num: "I",
    name: "GLP-1 Picks",
    tagline: "The honest comparison of GLP-1 telehealth providers.",
    body:
      "Forty providers ranked on all-in monthly price, safety signals, and care quality. No pay-for-placement. Methodology published in full. The only index showing real costs.",
    status: "live",
    mode: "built",
    href: "https://glp1picks.com",
    thumb: <GLP1PicksThumb />,
    meta: [
      { label: "Type", value: "Comparison site" },
      { label: "Revenue", value: "Affiliate" },
      { label: "Since", value: "2026" },
    ],
    cta: "Visit glp1picks.com",
  },
  {
    num: "II",
    name: "GLP-1 Tracker",
    tagline: "Choose. Track. Switch. All in one app.",
    body:
      "Built on our provider-intelligence database. Dose logging and weight tracking — but the unlock is the switch nudge. When a better price appears, you hear about it first.",
    status: "in-development",
    mode: "built",
    href: "/tracker",
    thumb: <GLP1TrackerThumb />,
    meta: [
      { label: "Type", value: "Mobile app" },
      { label: "Revenue", value: "Subscription + affiliate" },
      { label: "Launch", value: "Q3 2026" },
    ],
    cta: "Join the waitlist",
  },
];

const upcoming = [
  {
    num: "03",
    name: "Supplement Index",
    tag: "For GLP-1 · For the mind",
    note:
      "Honest reviews of protein, fiber, electrolytes — and nootropics that actually have research behind them.",
    when: "2026",
    mode: "built" as Mode,
  },
  {
    num: "04",
    name: "Pet Health",
    tag: "Continuation of the thesis",
    note:
      "The compound model, applied to pet obesity and longevity. GLP-1 for dogs, supplements that evolve with the animal.",
    when: "2026-27",
    mode: "built" as Mode,
  },
  {
    num: "05",
    name: "Peptide Index",
    tag: "Post-FDA panel",
    note:
      "BPC-157, TB-500, and beyond. Launching after the July 2026 FDA reclassification guidance.",
    when: "Q3 2026",
    mode: "built" as Mode,
  },
  {
    num: "06",
    name: "Neuroscience protocols",
    tag: "In research",
    note:
      "Cognitive supplements, neuroplasticity training, focus tools. Protocols that evolve with the science.",
    when: "2027",
    mode: "built" as Mode,
  },
];

function StatusPill({ status }: { status: Status }) {
  const label =
    status === "live" ? "Live" : status === "in-development" ? "In development" : "Planned";
  const dot =
    status === "live"
      ? "bg-sage"
      : status === "in-development"
      ? "bg-bronze"
      : "bg-muted";
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className={`absolute inset-0 rounded-full ${dot} ${
            status === "live" ? "animate-ping opacity-60" : "opacity-0"
          }`}
        />
        <span className={`relative inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}

function ModeTag({ mode }: { mode: Mode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-ink/55">
      <span className="inline-block h-px w-4 bg-ink/30" />
      {mode === "built" ? "Built in-house" : "Acquired"}
    </span>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-40 border-t border-border relative">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Section label */}
        <Reveal>
          <div className="flex items-baseline justify-between mb-20 md:mb-32">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
                §
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
                Portfolio · Two live, four in pipeline
              </span>
            </div>
            <span className="hidden md:block font-display italic text-muted text-[17px]">
              Vol. 01
            </span>
          </div>
        </Reveal>

        {/* Alternating editorial layout */}
        <div className="space-y-32 md:space-y-56">
          {items.map((item, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <Reveal key={item.num}>
                <article className="grid grid-cols-12 gap-6 md:gap-14 items-center plate-hover">
                  <a
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`col-span-12 md:col-span-7 block group ${
                      reverse ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    {item.thumb}
                  </a>

                  <div
                    className={`col-span-12 md:col-span-5 ${
                      reverse ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-5 mb-7 flex-wrap">
                      <span className="font-display italic text-bronze text-[28px] leading-none">
                        {item.num}
                      </span>
                      <span className="h-px w-10 bg-ink/20" />
                      <StatusPill status={item.status} />
                      <ModeTag mode={item.mode} />
                    </div>

                    <h3 className="font-display text-ink text-[44px] md:text-[64px] leading-[0.95] tracking-tightest mb-5">
                      {item.name}
                    </h3>

                    <p className="font-display italic text-ink/85 text-[20px] md:text-[24px] leading-[1.25] mb-7 max-w-[22ch]">
                      {item.tagline}
                    </p>

                    <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink/70 max-w-[42ch] mb-10">
                      {item.body}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-10 border-t border-border pt-6">
                      {item.meta.map((m) => (
                        <div key={m.label}>
                          <div className="text-[9px] uppercase tracking-[0.22em] text-muted mb-1.5">
                            {m.label}
                          </div>
                          <div className="text-[13px] text-ink font-medium">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {item.href && (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-[14px] text-ink font-medium group/cta"
                      >
                        <span className="link-line">{item.cta}</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-500 ease-out group-hover/cta:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Pipeline */}
        <div className="mt-32 md:mt-56 grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display italic text-bronze text-[22px]">§§</span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                The pipeline
              </span>
            </div>
            <p className="font-display italic text-ink/75 text-[22px] md:text-[26px] leading-[1.35] max-w-[20ch]">
              We build. We acquire.{" "}
              <span className="text-ink">Always research-first.</span>
            </p>
            <p className="mt-5 text-[14px] leading-[1.6] text-muted max-w-[38ch]">
              Supplements that make sense. Minds that compound. Pet health as a
              continuation of the same thesis. Every protocol evolves.
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-8">
            <ul className="divide-y divide-border">
              {upcoming.map((u) => (
                <li
                  key={u.name}
                  className="group grid grid-cols-12 gap-4 items-baseline py-6 md:py-7"
                >
                  <span className="col-span-1 font-display italic text-bronze text-[14px]">
                    {u.num}
                  </span>
                  <div className="col-span-8 md:col-span-7">
                    <div className="font-display text-ink text-[22px] md:text-[28px] leading-none mb-1.5">
                      {u.name}
                    </div>
                    <div className="text-[13px] text-muted leading-[1.5]">
                      {u.note}
                    </div>
                  </div>
                  <span className="col-span-3 md:col-span-2 text-[11px] uppercase tracking-[0.22em] text-muted md:text-right">
                    {u.tag}
                  </span>
                  <span className="hidden md:block md:col-span-2 font-display italic text-ink/60 text-[17px] text-right">
                    {u.when}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
