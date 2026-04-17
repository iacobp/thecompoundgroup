import { GLP1PicksThumb } from "./thumbnails/GLP1PicksThumb";
import { GLP1TrackerThumb } from "./thumbnails/GLP1TrackerThumb";
import { Reveal } from "./Reveal";

type Status = "live" | "in-development" | "planned";

type PortfolioItem = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  status: Status;
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
      "Forty providers ranked on all-in monthly price, safety signals, and care quality. No pay-for-placement. Editorial methodology published in full. The only index showing real costs.",
    status: "live",
    href: "https://glp1picks.com",
    thumb: <GLP1PicksThumb />,
    meta: [
      { label: "Type", value: "Comparison" },
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
      "Built on a provider-intelligence database. Dose logging and weight tracking — but the unlock is the switch nudge. When a better price appears, you hear about it first.",
    status: "in-development",
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
    name: "Supplement Index",
    tag: "GLP-1 companion",
    note: "Comparing protein, fiber, and electrolyte brands for GLP-1 users.",
    when: "2026",
  },
  {
    name: "Peptide Index",
    tag: "Post-FDA panel",
    note: "BPC-157, TB-500, and beyond. Launching after July 2026 FDA guidance.",
    when: "Q3 2026",
  },
  {
    name: "Neuroscience portfolio",
    tag: "In research",
    note: "Cognitive supplements, neuroplasticity training, focus tools.",
    when: "2027",
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
      <span className={`relative inline-flex h-1.5 w-1.5`}>
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
                Portfolio · Two live, three in pipeline
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
                  {/* Thumbnail */}
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

                  {/* Copy */}
                  <div
                    className={`col-span-12 md:col-span-5 ${
                      reverse ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-5 mb-7">
                      <span className="font-display italic text-bronze text-[28px] leading-none">
                        {item.num}
                      </span>
                      <span className="h-px w-10 bg-ink/20" />
                      <StatusPill status={item.status} />
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

                    {/* Meta grid */}
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

        {/* Upcoming — restrained editorial list */}
        <div className="mt-32 md:mt-56 grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display italic text-bronze text-[22px]">§§</span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                In the pipeline
              </span>
            </div>
            <p className="font-display italic text-ink/75 text-[22px] md:text-[26px] leading-[1.35] max-w-[20ch]">
              Each starts with the same question:{" "}
              <span className="text-ink">who is telling the truth here?</span>
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-8">
            <ul className="divide-y divide-border">
              {upcoming.map((u, i) => (
                <li
                  key={u.name}
                  className="group grid grid-cols-12 gap-4 items-baseline py-6 md:py-7"
                >
                  <span className="col-span-1 font-display italic text-bronze text-[14px]">
                    0{i + 3}
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
