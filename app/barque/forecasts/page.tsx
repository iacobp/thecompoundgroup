import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  domainLabel,
  forecasts,
  getCurrentProbability,
  getLatestRun,
  getOverdueForecasts,
  resolutions,
  type Forecast,
} from "@/lib/barque-data";

const title = "Forecasts — Barque";
const description =
  "Every Barque forecast with its current probability, resolution date, and full arc. Live + overdue + resolved.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/barque/forecasts" },
  openGraph: {
    type: "website",
    url: "https://thecompound.group/barque/forecasts",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BarqueForecastsIndexPage() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const overdue = getOverdueForecasts(todayIso);
  const live = forecasts.filter(
    (f) => f.resolution === "pending" && f.resolutionDate >= todayIso,
  );
  const resolved = forecasts.filter((f) => f.resolution !== "pending");

  const liveSorted = [...live].sort((a, b) =>
    a.resolutionDate < b.resolutionDate ? -1 : 1,
  );
  const overdueSorted = [...overdue].sort((a, b) =>
    a.resolutionDate < b.resolutionDate ? -1 : 1,
  );
  const resolvedSorted = [...resolved].sort((a, b) =>
    a.resolutionDate < b.resolutionDate ? 1 : -1,
  );

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Nav />

      {/* Header */}
      <section className="relative pt-[140px] md:pt-[180px] pb-20 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="flex items-baseline gap-4 mb-6 md:mb-8">
            <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
              ✧
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
              Barque · Forecasts
            </span>
          </div>

          <h1 className="font-display text-ink text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.94] tracking-tightest max-w-[20ch] mb-8 md:mb-12">
            Predictions with{" "}
            <em className="italic text-sage-soft">dates on them</em>.
          </h1>

          <p className="text-[16px] md:text-[19px] leading-[1.6] text-ink/75 max-w-[60ch]">
            Every Barque forecast is a specific, falsifiable claim with a
            probability and a date it resolves. Probabilities are floored at
            0.05 and capped at 0.95 — never absolute, never hedged. Each one
            has an arc page showing every Ra run that moved it, the
            counter-narrative that would falsify it, and — once resolved —
            the final Brier.
          </p>

          <div className="mt-10 md:mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-ink/55">
            <span>
              {liveSorted.length} live
              {liveSorted.length === 1 ? " forecast" : " forecasts"}
            </span>
            {overdueSorted.length > 0 ? (
              <span className="text-bronze">
                {overdueSorted.length} overdue
              </span>
            ) : null}
            {resolvedSorted.length > 0 ? (
              <span>
                {resolvedSorted.length} resolved
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {/* Overdue (only if any) */}
      {overdueSorted.length > 0 ? (
        <ForecastGroup
          numeral="I"
          label="Overdue · awaiting operator resolution"
          tone="bronze"
          items={overdueSorted}
          emphasis="overdue"
        />
      ) : null}

      {/* Live */}
      <ForecastGroup
        numeral={overdueSorted.length > 0 ? "II" : "I"}
        label="Live · re-evaluated each dawn"
        tone="sage"
        items={liveSorted}
        emphasis="live"
      />

      {/* Resolved */}
      {resolvedSorted.length > 0 ? (
        <ForecastGroup
          numeral={overdueSorted.length > 0 ? "III" : "II"}
          label={`Resolved · ${resolutions.length} in the log`}
          tone="muted"
          items={resolvedSorted}
          emphasis="resolved"
        />
      ) : null}

      <Footer />
    </main>
  );
}

function ForecastGroup({
  numeral,
  label,
  tone,
  items,
  emphasis,
}: {
  numeral: string;
  label: string;
  tone: "sage" | "bronze" | "muted";
  items: Forecast[];
  emphasis: "live" | "overdue" | "resolved";
}) {
  const toneClass =
    tone === "bronze"
      ? "text-bronze"
      : tone === "sage"
        ? "text-sage-soft"
        : "text-ink/45";

  return (
    <section className="relative py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="flex items-baseline gap-4 mb-10 md:mb-14">
          <span className={`font-display italic text-[18px] ${toneClass}`}>
            {numeral}
          </span>
          <h2 className={`text-[11px] uppercase tracking-[0.3em] ${toneClass}`}>
            {label}
          </h2>
        </div>

        <div className="space-y-0">
          {items.map((f) => (
            <ForecastRow key={f.id} forecast={f} emphasis={emphasis} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ForecastRow({
  forecast: f,
  emphasis,
}: {
  forecast: Forecast;
  emphasis: "live" | "overdue" | "resolved";
}) {
  const currentProb = getCurrentProbability(f);
  const latestRun = getLatestRun(f.id);
  const todayIso = new Date().toISOString().slice(0, 10);
  const isOverdue =
    f.resolution === "pending" && f.resolutionDate < todayIso;
  const daysLeft = Math.max(
    0,
    Math.round(
      (new Date(f.resolutionDate).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const resolutionLabel =
    emphasis === "resolved"
      ? `Resolved ${formatDate(f.resolutionDate)}`
      : isOverdue
        ? `${Math.abs(
            Math.round(
              (Date.now() - new Date(f.resolutionDate).getTime()) /
                (1000 * 60 * 60 * 24),
            ),
          )}d overdue · was ${formatDate(f.resolutionDate)}`
        : `Resolves ${formatDate(f.resolutionDate)} · ${daysLeft}d`;

  return (
    <Link
      href={`/barque/forecasts/${f.id}`}
      className="group grid grid-cols-12 gap-x-4 gap-y-4 md:gap-8 py-7 md:py-9 border-t border-ink/10 transition-colors hover:border-ink/30"
    >
      <div className="col-span-12 md:col-span-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
          {domainLabel[f.domain] ?? f.domain}
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <div className="text-[12px] uppercase tracking-[0.2em] text-ink/45 mb-2">
          {f.entity}
        </div>
        <p className="font-display text-[19px] sm:text-[20px] md:text-[24px] leading-[1.25] text-ink tracking-snug max-w-[48ch] group-hover:text-sage transition-colors">
          {f.prediction}
        </p>
      </div>

      <div className="col-span-6 md:col-span-2">
        <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
          {emphasis === "resolved" ? "Final" : "Probability"}
        </div>
        <div className="font-display text-ink text-[30px] sm:text-[36px] md:text-[40px] leading-none tracking-tightest mt-2">
          {Math.round(currentProb * 100)}
          <span className="text-[15px] sm:text-[16px] md:text-[18px] text-ink/55 align-top ml-1">
            %
          </span>
        </div>
        {latestRun && emphasis !== "resolved" ? (
          <div className="text-[11px] sm:text-[12px] text-ink/50 mt-2">
            was {Math.round(f.probability * 100)}%
            {Math.abs(latestRun.delta) >= 0.005 ? (
              <span
                className={`ml-1 ${
                  latestRun.delta > 0 ? "text-sage" : "text-bronze"
                }`}
              >
                · {latestRun.delta > 0 ? "+" : ""}
                {latestRun.delta.toFixed(2)}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="col-span-6 md:col-span-2 md:text-right">
        <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
          {emphasis === "resolved" ? "Outcome" : "Resolves"}
        </div>
        <div
          className={`text-[13px] sm:text-[14px] leading-tight mt-2 ${
            emphasis === "overdue"
              ? "text-bronze"
              : emphasis === "resolved"
                ? "text-ink"
                : "text-ink/70"
          }`}
        >
          {resolutionLabel}
        </div>
      </div>
    </Link>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
