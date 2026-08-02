import type { ReactNode } from "react";
import { isAbsent, STATE_LABEL, type LedgerMeta } from "@/lib/generated/ledger";

/**
 * Shared rendering for the ledger.
 *
 * ONE RULE RUNS THROUGH ALL OF IT. A value that was never measured must not be
 * able to render the same way as a value that was measured and came back zero.
 * Every component here takes the reading's state, not just its number, and an
 * absent state renders as words rather than as a figure. There is no code path
 * that turns a missing source into a zero, because that conflation is what
 * produced a hundred consecutive green reports over a data layer returning
 * nothing.
 */

const ABSENT_TONE: Record<string, string> = {
  NOT_FETCHED: "text-bronze",
  NOT_CONNECTED: "text-muted",
  NOT_TRACKED: "text-muted",
  WITHHELD: "text-bronze",
  EMPTY: "text-muted",
  OK: "text-sage",
};

export function StateBadge({ state }: { state: string }) {
  const tone = ABSENT_TONE[state] ?? "text-muted";
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] ${tone}`}
    >
      <span
        aria-hidden
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          state === "OK" ? "bg-sage" : isAbsent(state) ? "bg-bronze/60" : "bg-muted/60"
        }`}
      />
      {STATE_LABEL[state as keyof typeof STATE_LABEL] ?? state}
    </span>
  );
}

/** The note explaining an absence. Rendered whenever there is one to give. */
export function MetaNote({ meta }: { meta: LedgerMeta }) {
  if (!meta.note) return null;
  return (
    <p className="mt-3 text-[13px] leading-[1.6] text-ink/60 max-w-[62ch]">
      {meta.note}
    </p>
  );
}

export function SourceStamp({ meta }: { meta: LedgerMeta }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-ink/40">
      <span>Read {meta.asOf}</span>
      <span className="font-mono normal-case tracking-normal text-[11px]">
        {meta.source}
      </span>
    </div>
  );
}

export function SectionHead({
  mark,
  eyebrow,
  title,
  lede,
  meta,
  children,
}: {
  mark: string;
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: LedgerMeta;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4 mb-6 flex-wrap">
        <span className="font-display italic text-bronze text-[18px]">{mark}</span>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </span>
        {meta ? <StateBadge state={meta.state} /> : null}
      </div>
      <h2 className="font-display text-ink text-[30px] md:text-[44px] leading-[1.05] tracking-tightest max-w-[22ch]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-[15px] md:text-[17px] leading-[1.65] text-ink/70 max-w-[64ch]">
          {lede}
        </p>
      ) : null}
      {meta ? <MetaNote meta={meta} /> : null}
      {children}
    </header>
  );
}

export function Figure({
  label,
  value,
  context,
  large = false,
}: {
  label: string;
  value: string;
  context?: string;
  large?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
        {label}
      </div>
      <div
        className={`font-display text-ink leading-none tracking-tightest tabular-nums ${
          large ? "text-[38px] md:text-[56px]" : "text-[24px] md:text-[30px]"
        }`}
      >
        {value}
      </div>
      {context ? (
        <div className="mt-2 text-[12px] text-ink/55 leading-[1.45] max-w-[30ch]">
          {context}
        </div>
      ) : null}
    </div>
  );
}

/**
 * A property that has no reading. It gets the same visual weight as one that
 * does, deliberately: the absences are half of what makes this page worth
 * reading, and a row that quietly shrinks is a row nobody notices is missing.
 */
export function AbsentCard({
  name,
  meta,
  suffix,
}: {
  name: string;
  meta: LedgerMeta;
  suffix?: string;
}) {
  return (
    <article className="border border-dashed border-border rounded-md p-6 bg-transparent">
      <div className="flex items-baseline gap-3 flex-wrap mb-3">
        <h3 className="font-display text-ink text-[22px] md:text-[26px] leading-none tracking-tightest">
          {name}
        </h3>
        <StateBadge state={meta.state} />
      </div>
      <p className="text-[13px] leading-[1.65] text-ink/65 max-w-[54ch]">
        {meta.note ?? suffix ?? "No reading is published for this property."}
      </p>
      <SourceStamp meta={meta} />
    </article>
  );
}

export function Panel({
  children,
  dashed = false,
}: {
  children: ReactNode;
  dashed?: boolean;
}) {
  return (
    <article
      className={`rounded-md p-6 md:p-8 ${
        dashed
          ? "border border-dashed border-border"
          : "border border-border bg-white/40 backdrop-blur-sm"
      }`}
    >
      {children}
    </article>
  );
}

/** Wide tables must scroll inside their own box, never the page. */
export function ScrollBox({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">{children}</div>
  );
}
