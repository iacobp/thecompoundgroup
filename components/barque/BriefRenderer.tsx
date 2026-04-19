import Link from "next/link";
import type { Brief } from "@/lib/barque-briefs";

/**
 * Full brief layout for /barque/log/[slug]. Editorial prose-first render
 * of a Ra run: meta-cognition, forecast updates, Augur picks, and —
 * on weekly editions — Stoic, Premortem, and new-forecast candidates.
 */
export function BriefRenderer({ brief }: { brief: Brief }) {
  const dateLong = new Date(brief.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[880px] px-6 md:px-10">
        {/* Header */}
        <header className="mb-14 md:mb-20 border-b border-ink/15 pb-10 md:pb-14">
          <Link
            href="/barque/log"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink/50 hover:text-sage-soft transition-colors mb-8"
          >
            <span aria-hidden>←</span>
            <span>All briefs</span>
          </Link>

          <div className="flex items-baseline gap-4 mb-4 md:mb-6">
            <span className="font-display italic text-sage-soft text-[22px] md:text-[26px]">
              {brief.kind === "weekly" ? "Ω" : "·"}
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
              Barque · Dawn Brief · {brief.dayOfWeek.toLowerCase()} edition
            </span>
          </div>

          <h1 className="font-display text-ink text-[36px] sm:text-[44px] md:text-[60px] leading-[1.02] tracking-tightest mb-6">
            {dateLong}
          </h1>

          {brief.subtitle ? (
            <p className="font-display italic text-sage text-[18px] md:text-[22px] leading-[1.4] max-w-[42ch]">
              {brief.subtitle}
            </p>
          ) : null}
        </header>

        {/* Section 1 — Meta-cognition */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-baseline gap-4 mb-8 md:mb-10">
            <span className="font-display italic text-sage-soft text-[18px]">
              I
            </span>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
              How Barque got smarter today
            </h2>
          </div>

          <ul className="space-y-6 md:space-y-8">
            {brief.metaCognition.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-4 md:gap-6 text-[15px] md:text-[17px] leading-[1.6] text-ink/80"
              >
                <span
                  aria-hidden
                  className="font-display italic text-sage-soft text-[14px] pt-1 shrink-0"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[62ch]">{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 — Forecast updates */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-baseline gap-4 mb-8 md:mb-10">
            <span className="font-display italic text-sage-soft text-[18px]">
              II
            </span>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
              Forecast updates
            </h2>
          </div>

          <div className="space-y-10 md:space-y-12">
            {brief.forecastUpdates.map((u) => {
              const delta = u.newProb - u.priorProb;
              const deltaSign = delta > 0 ? "+" : delta < 0 ? "" : "±";
              const deltaStr = Math.abs(delta) < 0.005 ? "0" : delta.toFixed(2);
              return (
                <article key={u.forecastId} className="grid grid-cols-12 gap-4 md:gap-6">
                  <div className="col-span-12 md:col-span-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-2">
                      {u.entity}
                    </div>
                    <div className="flex items-baseline gap-3">
                      <div className="font-display text-ink text-[32px] md:text-[40px] leading-none tracking-tightest">
                        {Math.round(u.newProb * 100)}
                        <span className="text-[16px] md:text-[18px] text-ink/55 ml-0.5">
                          %
                        </span>
                      </div>
                      <div
                        className={`font-display italic text-[15px] md:text-[16px] ${
                          delta > 0
                            ? "text-sage"
                            : delta < 0
                            ? "text-bronze"
                            : "text-ink/45"
                        }`}
                      >
                        {deltaSign}
                        {deltaStr}
                      </div>
                      {u.flagged ? (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-sage-soft border border-sage-soft/40 rounded-full px-2 py-0.5">
                          Flagged
                        </span>
                      ) : null}
                    </div>
                    <div className="text-[12px] text-ink/50 mt-2">
                      was {Math.round(u.priorProb * 100)}%
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-8">
                    <p className="text-[15px] md:text-[16px] leading-[1.65] text-ink/80 max-w-[56ch]">
                      {u.signal}
                    </p>
                    {u.counterNarrative ? (
                      <div className="mt-4 border-l-2 border-sage-soft/40 pl-4">
                        <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-1">
                          Counter-narrative
                        </div>
                        <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/70 max-w-[56ch]">
                          {u.counterNarrative}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 3 — Augur picks */}
        {brief.augurPicks.length > 0 ? (
          <section className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-8 md:mb-10">
              <span className="font-display italic text-sage-soft text-[18px]">
                III
              </span>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
                The Augur&apos;s picks
              </h2>
            </div>

            <div className="space-y-6">
              {brief.augurPicks.map((a, i) => (
                <div
                  key={i}
                  className="relative pl-8 md:pl-10 py-2"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 font-display italic text-sage-soft text-[20px]"
                  >
                    ✦
                  </span>
                  <p className="font-display italic text-ink text-[17px] md:text-[20px] leading-[1.5] max-w-[60ch]">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Section 4 — Stoic (weekly only) */}
        {brief.stoic ? (
          <section className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-8 md:mb-10">
              <span className="font-display italic text-sage-soft text-[18px]">
                IV
              </span>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Actionable · noise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-sage mb-4">
                  Actionable
                </div>
                <ul className="space-y-4">
                  {brief.stoic.actionable.map((a, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[14px] md:text-[15px] leading-[1.6] text-ink/80"
                    >
                      <span
                        aria-hidden
                        className="font-display italic text-sage shrink-0"
                      >
                        —
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-4">
                  Noise
                </div>
                <ul className="space-y-4">
                  {brief.stoic.noise.map((n, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[14px] md:text-[15px] leading-[1.6] text-ink/55"
                    >
                      <span
                        aria-hidden
                        className="font-display italic text-ink/30 shrink-0"
                      >
                        —
                      </span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {/* Section 5 — Premortem (weekly only) */}
        {brief.premortem ? (
          <section className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-8 md:mb-10">
              <span className="font-display italic text-sage-soft text-[18px]">
                V
              </span>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Premortem — {brief.premortem.entity}
              </h2>
            </div>
            <p className="font-display italic text-ink text-[18px] md:text-[22px] leading-[1.4] max-w-[56ch]">
              {brief.premortem.body}
            </p>
            {brief.premortem.impliedDelta ? (
              <p className="mt-5 text-[13px] uppercase tracking-[0.22em] text-sage-soft">
                {brief.premortem.impliedDelta}
              </p>
            ) : null}
          </section>
        ) : null}

        {/* Section 6 — New forecast candidates */}
        {brief.newForecastCandidates && brief.newForecastCandidates.length > 0 ? (
          <section className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-8 md:mb-10">
              <span className="font-display italic text-sage-soft text-[18px]">
                VI
              </span>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Candidates for the log
              </h2>
            </div>

            <div className="space-y-8">
              {brief.newForecastCandidates.map((c, i) => (
                <article
                  key={i}
                  className="border-t border-ink/15 pt-6 md:pt-8 grid grid-cols-12 gap-4 md:gap-6"
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="font-display text-ink text-[32px] md:text-[40px] leading-none tracking-tightest">
                      {Math.round(c.probability * 100)}%
                    </div>
                    <div className="text-[12px] text-ink/50 mt-2">
                      Resolves{" "}
                      {new Date(c.resolutionDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <p className="font-display text-ink text-[18px] md:text-[22px] leading-[1.3] max-w-[48ch] mb-3">
                      {c.statement}
                    </p>
                    <p className="text-[14px] leading-[1.6] text-ink/70 max-w-[56ch]">
                      {c.rationale}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Author's note */}
        {brief.authorsNote ? (
          <section className="mt-16 md:mt-24 pt-10 border-t border-ink/15">
            <p className="font-display italic text-ink/60 text-[14px] md:text-[15px] leading-[1.6] max-w-[56ch]">
              {brief.authorsNote}
            </p>
          </section>
        ) : null}
      </div>
    </article>
  );
}
