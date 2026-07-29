import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import {
  portfolioMetrics,
  type PortfolioProperty,
  type PortfolioStatus,
} from "@/lib/portfolio-metrics";

const title = "By the numbers — The Compound Group";
const description =
  "What every property in the portfolio looks like at the unit-economic level. Traffic, conversions, revenue, subscribers — refreshed weekly, methodology published.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/numbers" },
  openGraph: {
    type: "website",
    url: "https://thecompoundgroup.com/numbers",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

function StatusPill({ status }: { status: PortfolioStatus }) {
  const label =
    status === "live"
      ? "Live"
      : status === "in-development"
        ? "In development"
        : "Planned";
  const dotColor =
    status === "live"
      ? "bg-sage"
      : status === "in-development"
        ? "bg-bronze"
        : "bg-muted";
  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted">
      <span
        className={`relative inline-block h-1.5 w-1.5 rounded-full ${dotColor}`}
      />
      {label}
    </span>
  );
}

function PropertyCard({ p }: { p: PortfolioProperty }) {
  const refreshDate = new Date(`${p.asOf}T00:00:00Z`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  );

  return (
    <article className="border border-border rounded-md bg-white/40 backdrop-blur-sm p-6 md:p-8">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <div className="flex items-baseline gap-4 mb-4 flex-wrap">
          <span className="font-display italic text-bronze text-[22px] md:text-[26px] leading-none">
            {p.num}
          </span>
          <h2 className="font-display text-ink text-[28px] md:text-[36px] leading-[1.05] tracking-tightest">
            {p.name}
          </h2>
          <StatusPill status={p.status} />
        </div>

        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[12px] text-ink/60 hover:text-sage transition-colors font-mono"
        >
          {p.domain} <span aria-hidden>↗</span>
        </a>

        <p className="mt-5 text-[15px] md:text-[16px] leading-[1.65] text-ink/75 max-w-[60ch]">
          {p.oneLiner}
        </p>

        <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
          Conversion event · {p.conversionEvent}
        </div>
      </header>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-7 mb-6 pt-6 border-t border-border">
        {p.metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
              {m.label}
            </div>
            <div className="font-display text-ink text-[24px] md:text-[28px] leading-none tracking-tightest tabular-nums">
              {m.value}
            </div>
            {m.context ? (
              <div className="mt-2 text-[12px] text-ink/55 leading-[1.45] max-w-[28ch]">
                {m.context}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Note + refresh stamp */}
      {p.note ? (
        <div className="border-t border-border pt-5 mt-2">
          <p className="text-[13px] leading-[1.65] text-ink/65 italic font-display max-w-[60ch]">
            {p.note}
          </p>
        </div>
      ) : null}

      <div className="mt-5 text-[10px] uppercase tracking-[0.22em] text-ink/40">
        Last refreshed · {refreshDate}
      </div>
    </article>
  );
}

export default function NumbersPage() {
  const refreshLabel = new Date(
    `${portfolioMetrics.refreshedOn}T00:00:00Z`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Nav />

      <section className="relative pt-[140px] md:pt-[180px] pb-16 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-6 md:mb-8">
              <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
                №
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
                Portfolio · By the numbers
              </span>
            </div>

            <h1 className="font-display text-ink text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] leading-[0.94] tracking-tightest max-w-[18ch] mb-6 md:mb-8">
              The work,{" "}
              <em className="italic text-sage">at unit-economic depth.</em>
            </h1>

            <p className="text-[16px] md:text-[19px] leading-[1.6] text-ink/75 max-w-[60ch]">
              Every property in the portfolio, the metric that matters per
              property, and the cadence at which we update each number. The
              point is to make the work legible — the same instinct that
              produced the public Barque log.
            </p>

            <div className="mt-8 md:mt-10 text-[12px] md:text-[13px] text-muted">
              Refreshed weekly · Latest snapshot {refreshLabel}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Aggregate strip */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-10 md:mb-14">
              <span className="font-display italic text-bronze text-[18px]">§</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
                Portfolio aggregate
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
            {portfolioMetrics.aggregate.map((m) => (
              <Reveal key={m.label}>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                    {m.label}
                  </div>
                  <div className="font-display text-ink text-[36px] md:text-[48px] leading-none tracking-tightest tabular-nums">
                    {m.value}
                  </div>
                  {m.context ? (
                    <div className="mt-3 text-[12px] text-ink/55 leading-[1.5] max-w-[24ch]">
                      {m.context}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Per-property cards */}
      <section className="py-16 md:py-24 border-b border-border bg-sand/40">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-10 md:mb-14">
              <span className="font-display italic text-bronze text-[18px]">¶</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
                Per property
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {portfolioMetrics.properties.map((p) => (
              <Reveal key={p.slug}>
                <PropertyCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-14">
            <Reveal className="col-span-12 md:col-span-4">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display italic text-bronze text-[18px]">·</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  How we count
                </span>
              </div>
              <h2 className="font-display text-ink text-[28px] md:text-[36px] leading-[1.1] tracking-tightest mb-4">
                Methodology, in the open.
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[1.65] text-ink/65 max-w-[36ch]">
                {portfolioMetrics.cadence}
              </p>
            </Reveal>

            <Reveal delay={120} className="col-span-12 md:col-span-8">
              <ul className="space-y-5">
                {portfolioMetrics.methodology.map((m, i) => (
                  <li
                    key={i}
                    className="text-[14px] md:text-[15px] leading-[1.7] text-ink/75 max-w-[64ch] pl-6 relative"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-2 inline-block h-1 w-3 bg-bronze/50 rounded-full"
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
