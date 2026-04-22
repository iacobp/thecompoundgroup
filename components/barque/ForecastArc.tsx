import Link from "next/link";
import type {
  ForecastArc as ForecastArcData,
  RaLogRow,
} from "@/lib/barque-data";
import { domainLabel } from "@/lib/barque-data";

/**
 * Full-arc layout for /barque/log/forecast/[id].
 *
 * Shows the trajectory of a single forecast from creation, through every
 * Ra run that moved it, through to resolution (if resolved) or a live
 * status with days-to-resolution / overdue warning.
 */
export function ForecastArc({ arc }: { arc: ForecastArcData }) {
  const { forecast, runs, resolution } = arc;

  const latestRun = runs.length > 0 ? runs[runs.length - 1] : null;
  const currentProb = latestRun
    ? latestRun.newProbability
    : forecast.probability;
  const latestDelta = latestRun ? latestRun.delta : 0;

  const todayIso = new Date().toISOString().slice(0, 10);
  const daysToResolution = daysBetween(todayIso, forecast.resolutionDate);
  const isOverdue =
    forecast.resolution === "pending" && forecast.resolutionDate < todayIso;
  const daysPastDue = isOverdue
    ? Math.abs(daysBetween(forecast.resolutionDate, todayIso))
    : 0;

  const statusLabel = resolution
    ? resolution.finalOutcome === "true"
      ? "Resolved · true"
      : "Resolved · false"
    : isOverdue
      ? `Overdue · ${daysPastDue}d past due`
      : `Live · ${daysToResolution}d to resolution`;

  const statusTone = resolution
    ? resolution.finalOutcome === "true"
      ? "text-sage"
      : "text-bronze"
    : isOverdue
      ? "text-bronze"
      : "text-sage-soft";

  const dateMadeLong = new Date(forecast.dateMade).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const resolutionLong = new Date(forecast.resolutionDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <article className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[960px] px-6 md:px-10">
        {/* Header */}
        <header className="mb-14 md:mb-20 border-b border-ink/15 pb-10 md:pb-14">
          <Link
            href="/barque/log"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink/50 hover:text-sage-soft transition-colors mb-8"
          >
            <span aria-hidden>←</span>
            <span>All briefs</span>
          </Link>

          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6 md:mb-8">
            <span className="font-display italic text-sage-soft text-[22px] md:text-[26px]">
              {resolution ? "Ω" : isOverdue ? "!" : "·"}
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
              Forecast · {domainLabel[forecast.domain] ?? forecast.domain}
            </span>
            <span
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.3em] ${statusTone}`}
            >
              {statusLabel}
            </span>
          </div>

          <h1 className="font-display text-ink text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1.04] tracking-tightest mb-4 max-w-[28ch]">
            {forecast.entity}
          </h1>

          <p className="text-[13px] md:text-[14px] text-ink/55 font-mono">
            {forecast.id}
          </p>
        </header>

        {/* Hero stats */}
        <section className="mb-14 md:mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatCell
            label="Current probability"
            value={
              <>
                {Math.round(currentProb * 100)}
                <span className="text-[18px] md:text-[22px] text-ink/55 ml-0.5">
                  %
                </span>
              </>
            }
            sub={
              latestRun
                ? `was ${Math.round(forecast.probability * 100)}% at creation`
                : "no Ra updates yet"
            }
          />
          <StatCell
            label="Last move"
            value={
              latestRun ? (
                <span
                  className={
                    latestDelta > 0
                      ? "text-sage"
                      : latestDelta < 0
                        ? "text-bronze"
                        : "text-ink/45"
                  }
                >
                  {latestDelta > 0 ? "+" : ""}
                  {Math.abs(latestDelta) < 0.005 ? "0" : latestDelta.toFixed(2)}
                </span>
              ) : (
                <span className="text-ink/45">—</span>
              )
            }
            sub={latestRun ? shortDate(latestRun.runDate) : "pending first run"}
          />
          <StatCell
            label="Resolves"
            value={
              <span
                className={`font-display text-[28px] md:text-[36px] leading-none ${
                  isOverdue ? "text-bronze" : "text-ink"
                }`}
              >
                {shortDate(forecast.resolutionDate)}
              </span>
            }
            sub={
              resolution
                ? `resolved ${shortDate(resolution.resolutionDate)}`
                : isOverdue
                  ? `${daysPastDue}d overdue`
                  : `in ${daysToResolution}d`
            }
          />
          <StatCell
            label="Signal strength"
            value={
              <span>{latestRun?.newSignalStrength ?? forecast.signalStrength}</span>
            }
            sub="0–1000 composite score"
          />
        </section>

        {/* Prediction */}
        <section className="mb-14 md:mb-20">
          <div className="flex items-baseline gap-4 mb-6 md:mb-8">
            <span className="font-display italic text-sage-soft text-[18px]">
              I
            </span>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
              The prediction
            </h2>
          </div>
          <p className="font-display text-ink text-[22px] md:text-[28px] leading-[1.3] tracking-snug max-w-[52ch] mb-6">
            {forecast.prediction}
          </p>
          {forecast.notes ? (
            <p className="text-[14px] md:text-[16px] leading-[1.65] text-ink/70 max-w-[58ch]">
              {forecast.notes}
            </p>
          ) : null}
        </section>

        {/* Trajectory */}
        <section className="mb-14 md:mb-20">
          <div className="flex items-baseline gap-4 mb-8 md:mb-10">
            <span className="font-display italic text-sage-soft text-[18px]">
              II
            </span>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
              Trajectory
            </h2>
          </div>

          <ol className="relative space-y-10 md:space-y-14 border-l border-ink/15 ml-4 md:ml-6 pl-6 md:pl-10">
            {/* Creation */}
            <li>
              <TimelineDot tone="ink" />
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                {dateMadeLong} · created
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <div className="font-display text-ink text-[28px] md:text-[34px] leading-none tracking-tightest">
                  {Math.round(forecast.probability * 100)}%
                </div>
                <div className="text-[12px] text-ink/50">
                  signal strength {forecast.signalStrength}
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/70 max-w-[56ch]">
                {forecast.notes ||
                  "Forecast opened. The council begins re-evaluation each dawn."}
              </p>
            </li>

            {/* Ra runs, chronological */}
            {runs.map((r) => (
              <TimelineRun key={r.runDate} run={r} />
            ))}

            {/* Resolution */}
            {resolution ? (
              <li>
                <TimelineDot
                  tone={resolution.finalOutcome === "true" ? "sage" : "bronze"}
                />
                <div className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                  {shortDate(resolution.resolutionDate)} · resolved{" "}
                  <span
                    className={
                      resolution.finalOutcome === "true"
                        ? "text-sage"
                        : "text-bronze"
                    }
                  >
                    {resolution.finalOutcome}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mr-2">
                      Final Brier
                    </span>
                    <span className="font-display text-ink text-[24px] md:text-[28px] leading-none tracking-tightest">
                      {resolution.finalBrier.toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mr-2">
                      Lead time
                    </span>
                    <span className="text-[15px] md:text-[16px] text-ink/80">
                      {resolution.leadTimeDays} days
                    </span>
                  </div>
                  {resolution.contrarian ? (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage-soft border border-sage-soft/40 rounded-full px-2 py-0.5">
                      Contrarian
                    </span>
                  ) : null}
                </div>
                {resolution.notes ? (
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/70 max-w-[56ch]">
                    {resolution.notes}
                  </p>
                ) : null}
              </li>
            ) : isOverdue ? (
              <li>
                <TimelineDot tone="bronze" />
                <div className="text-[11px] uppercase tracking-[0.22em] text-bronze mb-2">
                  {shortDate(forecast.resolutionDate)} · resolution date passed
                </div>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/70 max-w-[56ch]">
                  {daysPastDue} days past the resolution date. Awaiting
                  operator to append to <code>resolutions.tsv</code> with the
                  outcome and final Brier.
                </p>
              </li>
            ) : (
              <li>
                <TimelineDot tone="soft" />
                <div className="text-[11px] uppercase tracking-[0.22em] text-sage-soft mb-2">
                  {shortDate(forecast.resolutionDate)} · resolves
                </div>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/70 max-w-[56ch]">
                  {daysToResolution} days remaining. Re-evaluated each dawn
                  by the council.
                </p>
              </li>
            )}
          </ol>
        </section>

        {/* Sources */}
        {forecast.sources.length > 0 ? (
          <section>
            <div className="flex items-baseline gap-4 mb-6 md:mb-8">
              <span className="font-display italic text-sage-soft text-[18px]">
                III
              </span>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Sources at creation
              </h2>
            </div>
            <ul className="space-y-2">
              {forecast.sources.map((src, i) => (
                <li
                  key={i}
                  className="text-[13px] md:text-[14px] leading-[1.5] text-ink/70 break-all"
                >
                  {src.startsWith("http") ? (
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink/75 hover:text-sage-soft underline decoration-ink/20 hover:decoration-sage-soft underline-offset-4"
                    >
                      {src}
                    </a>
                  ) : (
                    src
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] text-ink/45 max-w-[56ch]">
              Sources cited in subsequent Ra runs appear in each trajectory
              entry above.
            </p>
          </section>
        ) : null}

        <p className="mt-16 md:mt-24 pt-8 border-t border-ink/15 font-display italic text-ink/55 text-[13px] md:text-[14px] leading-[1.6] max-w-[56ch]">
          Forecasts are never deleted; they are resolved. The log is the track
          record, and the track record is the moat.
        </p>
      </div>
    </article>
  );
}

function StatCell({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
}) {
  return (
    <div>
      <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-2">
        {label}
      </div>
      <div className="font-display text-ink text-[34px] md:text-[44px] leading-none tracking-tightest">
        {value}
      </div>
      <div className="text-[12px] text-ink/50 mt-2">{sub}</div>
    </div>
  );
}

function TimelineDot({ tone }: { tone: "ink" | "sage" | "bronze" | "soft" }) {
  const bg =
    tone === "ink"
      ? "bg-ink"
      : tone === "sage"
        ? "bg-sage"
        : tone === "bronze"
          ? "bg-bronze"
          : "bg-sage-soft";
  return (
    <span
      aria-hidden
      className={`absolute -left-[7px] md:-left-[9px] w-3 h-3 md:w-4 md:h-4 rounded-full ${bg} border-2 border-cream`}
    />
  );
}

function TimelineRun({ run }: { run: RaLogRow }) {
  const deltaTone =
    run.delta > 0 ? "text-sage" : run.delta < 0 ? "text-bronze" : "text-ink/45";
  const deltaSign = run.delta > 0 ? "+" : "";
  const deltaStr =
    Math.abs(run.delta) < 0.005 ? "0" : run.delta.toFixed(2);

  return (
    <li>
      <TimelineDot tone={run.flagged ? "bronze" : "soft"} />
      <div className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-2">
        {run.runDate} · Ra run
        {run.flagged ? (
          <span className="ml-3 text-sage-soft">· flagged</span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        <div className="font-display text-ink text-[26px] md:text-[32px] leading-none tracking-tightest">
          {Math.round(run.newProbability * 100)}
          <span className="text-[14px] md:text-[16px] text-ink/55 ml-0.5">
            %
          </span>
        </div>
        <div className={`font-display italic text-[14px] md:text-[15px] ${deltaTone}`}>
          {deltaSign}
          {deltaStr}
        </div>
        <div className="text-[11px] text-ink/45">
          · signal {run.newSignalStrength}
        </div>
      </div>
      {run.notes ? (
        <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/75 max-w-[56ch] mb-3">
          {run.notes}
        </p>
      ) : null}
      {run.counterNarrative ? (
        <div className="border-l-2 border-sage-soft/40 pl-4 mb-3">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-1">
            Counter-narrative
          </div>
          <p className="text-[13px] md:text-[14px] leading-[1.55] text-ink/65 max-w-[56ch]">
            {run.counterNarrative}
          </p>
        </div>
      ) : null}
      {run.signalsCited.length > 0 ? (
        <ul className="space-y-1 mt-3">
          {run.signalsCited.map((src, i) => (
            <li key={i} className="text-[12px] leading-[1.5] text-ink/55 break-all">
              {src.startsWith("http") ? (
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sage-soft underline decoration-ink/15 hover:decoration-sage-soft underline-offset-4"
                >
                  {src}
                </a>
              ) : (
                src
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function daysBetween(fromIso: string, toIso: string): number {
  const from = Date.parse(fromIso);
  const to = Date.parse(toIso);
  if (Number.isNaN(from) || Number.isNaN(to)) return 0;
  return Math.round((to - from) / (1000 * 60 * 60 * 24));
}

function shortDate(iso: string): string {
  // Strip any time component if present (e.g. "2026-04-22 04:04 UTC")
  const isoDate = iso.slice(0, 10);
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
