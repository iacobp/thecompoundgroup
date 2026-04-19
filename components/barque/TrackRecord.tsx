import { Reveal } from "../Reveal";
import { backtests, stats } from "@/lib/barque-data";

export function TrackRecord() {
  return (
    <section
      id="track-record"
      className="relative py-24 md:py-36 border-t border-border bg-sand text-ink"
    >
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                III
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Track record
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-ink text-[40px] md:text-[64px] lg:text-[72px] leading-[1.04] tracking-tightest mb-16 md:mb-20 max-w-[22ch]">
            The log is{" "}
            <em className="italic text-sage-soft">public</em>. The Brier is
            the Brier.
          </h2>
        </Reveal>

        {/* Stat bar — six measures, two rows.
            Calibration: Backtests / Direction / Brier.
            Quality:    Lead time / Contrarian / Coverage. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-28 pb-12 border-b border-ink/15">
          <Reveal>
            <div>
              <div className="font-display text-ink text-[48px] md:text-[72px] leading-none tracking-tightest">
                {stats.backtestsResolved}
              </div>
              <div className="text-[12px] md:text-[13px] text-ink/60 mt-3 leading-[1.5] max-w-[24ch]">
                Backtests resolved against historical events
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <div className="font-display text-ink text-[48px] md:text-[72px] leading-none tracking-tightest">
                {stats.hits}/{stats.backtestsResolved}
              </div>
              <div className="text-[12px] md:text-[13px] text-ink/60 mt-3 leading-[1.5] max-w-[24ch]">
                Direction correct (outcome matched higher-probability side)
              </div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div>
              <div className="font-display text-ink text-[48px] md:text-[72px] leading-none tracking-tightest">
                {stats.avgBrier.toFixed(3)}
              </div>
              <div className="text-[12px] md:text-[13px] text-ink/60 mt-3 leading-[1.5] max-w-[24ch]">
                Average Brier score · lower is better, &lt; 0.10 is strong
              </div>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div>
              <div className="font-display text-ink text-[48px] md:text-[72px] leading-none tracking-tightest">
                {Math.round(stats.avgLeadMonths)}
                <span className="text-[24px] md:text-[28px] text-ink/55 align-top ml-1">
                  mo
                </span>
              </div>
              <div className="text-[12px] md:text-[13px] text-ink/60 mt-3 leading-[1.5] max-w-[24ch]">
                Average lead time from cutoff to resolution
              </div>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div>
              <div className="font-display text-ink text-[48px] md:text-[72px] leading-none tracking-tightest">
                {stats.contrarianCount}/{stats.backtestsResolved}
              </div>
              <div className="text-[12px] md:text-[13px] text-ink/60 mt-3 leading-[1.5] max-w-[24ch]">
                Contrarian calls · divergent from market/media consensus at cutoff
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div>
              <div className="font-display text-ink text-[32px] md:text-[40px] leading-[1.1] tracking-tightest pt-3 md:pt-4">
                <em className="italic text-sage-soft">Audit begins</em>
                <div className="mt-1">{stats.coverageAuditStart}</div>
              </div>
              <div className="text-[12px] md:text-[13px] text-ink/60 mt-3 leading-[1.5] max-w-[26ch]">
                Coverage — % of resolvable events in our domains that Barque
                forecasts. Measurement cycle opens after Ra&apos;s first quarter.
              </div>
            </div>
          </Reveal>
        </div>

        {/* Backtest log */}
        <div className="space-y-10 md:space-y-14">
          {backtests.map((b, i) => (
            <Reveal key={b.id} delay={60 * i}>
              <article className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-1">
                  <div className="font-display italic text-sage-soft text-[14px] md:text-[16px]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                      Cutoff · {b.cutoff}
                    </div>
                    {b.contrarian && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-sage-soft border border-sage-soft/40 rounded-full px-2 py-0.5">
                        Contrarian
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-ink text-[24px] md:text-[32px] leading-[1.15] tracking-snug mb-3">
                    {b.case}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-ink/75 max-w-[46ch]">
                    {b.prediction}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                        Called
                      </div>
                      <div className="font-display text-ink text-[28px] md:text-[32px] leading-none tracking-tightest mt-2">
                        {Math.round(b.probability * 100)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                        Outcome
                      </div>
                      <div className="font-display text-ink text-[22px] md:text-[24px] leading-tight tracking-snug mt-2 capitalize">
                        {b.outcome}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                        Brier
                      </div>
                      <div className="font-display text-ink text-[28px] md:text-[32px] leading-none tracking-tightest mt-2">
                        {b.brier.toFixed(3)}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[13px] md:text-[14px] leading-[1.6] text-ink/65 max-w-[56ch] border-l-2 border-sage-soft/50 pl-4">
                    {b.insight}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
