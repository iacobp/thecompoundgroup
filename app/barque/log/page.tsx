import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { BriefCard } from "@/components/barque/BriefCard";
import { briefs, briefStats } from "@/lib/barque-briefs";
import { getOverdueForecasts } from "@/lib/barque-data";

const title = "Dawn Log — Barque";
const description =
  "Every Ra run, logged in public. Meta-cognition, forecast updates, and the Augur's picks from each dawn.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/barque/log" },
  openGraph: {
    type: "website",
    url: "https://thecompoundgroup.com/barque/log",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BarqueLogIndexPage() {
  const sorted = [...briefs].sort((a, b) => (a.date < b.date ? 1 : -1));
  const overdue = getOverdueForecasts();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Nav />

      <section className="relative pt-[140px] md:pt-[180px] pb-20 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="flex items-baseline gap-4 mb-6 md:mb-8">
            <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
              Ω
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
              Barque · The Dawn Log
            </span>
          </div>

          <h1 className="font-display text-ink text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.94] tracking-tightest max-w-[20ch] mb-8 md:mb-12">
            How the ship{" "}
            <em className="italic text-sage-soft">got smarter</em>.
          </h1>

          <p className="text-[16px] md:text-[19px] leading-[1.6] text-ink/75 max-w-[60ch]">
            Every Ra run, logged in public. Meta-cognition, forecast updates,
            Augur picks, and — on Sundays — the rotated premortem and
            candidate forecasts. The log is the track record; the track record
            is the moat.
          </p>

          <div className="mt-10 md:mt-14 text-[13px] text-ink/55">
            {briefStats.total} brief{briefStats.total === 1 ? "" : "s"}{" "}
            published
            {briefStats.firstBriefDate
              ? ` · since ${new Date(briefStats.firstBriefDate).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "long", year: "numeric" }
                )}`
              : ""}
          </div>

          {overdue.length > 0 ? (
            <div className="mt-10 md:mt-12 border border-bronze/40 bg-bronze/5 rounded-lg p-5 md:p-6 max-w-[620px]">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-bronze mb-2">
                Overdue · {overdue.length}
              </div>
              <p className="text-[14px] md:text-[15px] leading-[1.55] text-ink/80 mb-3">
                {overdue.length === 1
                  ? "One forecast is past its resolution date and awaiting the operator to resolve or re-forecast."
                  : `${overdue.length} forecasts are past their resolution date and awaiting the operator to resolve or re-forecast.`}
              </p>
              <ul className="space-y-1">
                {overdue.map((f) => (
                  <li key={f.id} className="text-[13px] md:text-[14px] leading-[1.5]">
                    <Link
                      href={`/barque/forecasts/${f.id}`}
                      className="text-ink/75 hover:text-sage-soft underline decoration-ink/20 hover:decoration-sage-soft underline-offset-4"
                    >
                      {f.entity}
                    </Link>
                    <span className="text-ink/55"> · was {f.resolutionDate}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          {sorted.length === 0 ? (
            <p className="text-ink/60 py-20 text-center">
              The first brief publishes at dawn.
            </p>
          ) : (
            <div>
              {sorted.map((brief) => (
                <BriefCard key={brief.slug} brief={brief} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
