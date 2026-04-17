import { GLP1PicksThumb } from "./thumbnails/GLP1PicksThumb";
import { GLP1TrackerThumb } from "./thumbnails/GLP1TrackerThumb";

type Status = "live" | "in-development" | "planned";

type PortfolioItem = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  status: Status;
  href?: string;
  thumb?: React.ReactNode;
  category: string;
};

const items: PortfolioItem[] = [
  {
    num: "01",
    name: "GLP-1 Picks",
    tagline: "Honest comparison of GLP-1 telehealth providers.",
    body:
      "40 providers ranked on all-in monthly price, safety signals, and care quality. No pay-for-placement. Editorial methodology published.",
    status: "live",
    href: "https://glp1picks.com",
    thumb: <GLP1PicksThumb />,
    category: "Comparison · Affiliate",
  },
  {
    num: "02",
    name: "GLP-1 Tracker",
    tagline: "Choose, track, and switch providers — in one app.",
    body:
      "The only GLP-1 tracker built on a provider-intelligence database. Daily dose logging meets cost comparison and switch nudges. iOS and Android, 2026.",
    status: "in-development",
    href: "/tracker",
    thumb: <GLP1TrackerThumb />,
    category: "App · Subscription + Affiliate",
  },
];

const upcoming = [
  { name: "Supplement comparison", note: "GLP-1 adjacent · 2026" },
  { name: "Peptide comparison", note: "Post-FDA panel · Q3 2026" },
  { name: "Neuroscience & neuroplasticity", note: "In research · 2027" },
];

function StatusPill({ status }: { status: Status }) {
  const label =
    status === "live"
      ? "Live"
      : status === "in-development"
      ? "In development"
      : "Planned";
  const dot =
    status === "live" ? "bg-sage" : status === "in-development" ? "bg-bronze" : "bg-muted";
  return (
    <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Section label */}
        <div className="flex items-baseline justify-between mb-16 md:mb-24">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="inline-block h-px w-8 bg-ink/40" />
            <span>Portfolio</span>
          </div>
          <span className="font-display italic text-muted text-[15px] md:text-[17px]">
            Two live · three in pipeline
          </span>
        </div>

        {/* Alternating editorial layout */}
        <div className="space-y-28 md:space-y-40">
          {items.map((item, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={item.num}
                className="grid grid-cols-12 gap-6 md:gap-12 items-center"
              >
                {/* Thumbnail */}
                <div
                  className={`col-span-12 md:col-span-7 ${
                    reverse ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {item.thumb}
                </div>

                {/* Copy */}
                <div
                  className={`col-span-12 md:col-span-5 ${
                    reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display italic text-bronze text-[22px]">
                      {item.num}
                    </span>
                    <StatusPill status={item.status} />
                  </div>

                  <h3 className="font-display text-ink text-[40px] md:text-[52px] leading-[1] tracking-snug mb-4">
                    {item.name}
                  </h3>
                  <p className="font-display italic text-ink/85 text-[20px] md:text-[22px] leading-[1.3] mb-6">
                    {item.tagline}
                  </p>
                  <p className="text-[15px] md:text-[16px] leading-[1.6] text-ink/70 max-w-[44ch] mb-8">
                    {item.body}
                  </p>

                  <div className="flex items-center gap-6 text-[13px]">
                    <span className="text-muted">{item.category}</span>
                    {item.href && (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="link-line text-ink font-medium inline-flex items-center gap-1.5"
                      >
                        {item.status === "live" ? "Visit site" : "View preview"}
                        <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Upcoming — restrained text list (All Turtles style) */}
        <div className="mt-28 md:mt-40 grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted mb-4">
              <span className="inline-block h-px w-8 bg-ink/40" />
              <span>Upcoming</span>
            </div>
            <p className="font-display italic text-ink/70 text-[18px] md:text-[20px] leading-[1.4]">
              Next in the pipeline — each starts with the same question:{" "}
              <span className="text-ink">who is telling the truth here?</span>
            </p>
          </div>
          <ul className="col-span-12 md:col-span-8 md:pl-12 divide-y divide-border">
            {upcoming.map((u) => (
              <li key={u.name} className="flex items-baseline justify-between py-5">
                <span className="font-display text-ink text-[22px] md:text-[26px]">
                  {u.name}
                </span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-muted">
                  {u.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
