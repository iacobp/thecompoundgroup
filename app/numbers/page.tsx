import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import {
  AbsentCard,
  Figure,
  MetaNote,
  Panel,
  ScrollBox,
  SectionHead,
  SourceStamp,
  StateBadge,
} from "@/components/ledger/Primitives";
import { isAbsent, ledger } from "@/lib/generated/ledger";
import {
  ledgerMethodology,
  portfolioProperties,
  type PortfolioProperty,
} from "@/lib/portfolio-properties";

/**
 * /numbers, the ledger.
 *
 * THIS IS THE ONLY PAGE ON THE SITE THAT STATES AN OPERATING NUMBER, and every
 * number it states is read out of lib/generated/ledger.ts, which is generated
 * daily where the private repos are visible. Nothing here is typed by hand. If
 * a figure is not in that file, the page does not get to claim it: the fix is
 * to add it to barque/scripts/generate-ledger.py, never to type it back in.
 *
 * It grows by adding a section, not by adding a route. Splitting the ledger
 * across several pages is how you end up with four surfaces reporting the same
 * quantity from four vintages, which is exactly the state this replaced.
 *
 * The absences are load-bearing. A property with no reading gets a card the
 * same size as one with a reading, saying which of the six states it is in and
 * why. A ledger that only rendered what it happened to have would read as a
 * portfolio with no gaps, which would be the one dishonest thing on it.
 */

const title = "The ledger — The Compound Group";
const description =
  "Every operating number the portfolio has: revenue, search, forecast accuracy including the calls we got wrong, throughput, what broke and for how long, and what we do not measure at all.";

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
  twitter: { card: "summary_large_image", title, description },
};

const S = ledger.sections;

function Section({
  id,
  children,
  tone = "cream",
}: {
  id: string;
  children: React.ReactNode;
  tone?: "cream" | "sand";
}) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 border-b border-border ${
        tone === "sand" ? "bg-sand/40" : ""
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">{children}</div>
    </section>
  );
}

/* ─────────────────────────── revenue ─────────────────────────── */

function RevenueSection() {
  const { totals, properties, partners } = S.revenue;

  return (
    <Section id="revenue">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="One"
          title="Revenue and conversions"
          lede="One property in the portfolio earns money. The other five do not, and each of them says why rather than reporting a zero it did not measure."
          meta={S.revenue.meta}
        />
      </Reveal>

      {totals ? (
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-14 md:mb-20 pb-14 md:pb-20 border-b border-border">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                Affiliate payout
              </div>
              <div className="font-display text-ink text-[38px] md:text-[64px] leading-none tracking-tightest tabular-nums">
                <CountUp to={totals.payout} prefix="$" duration={1600} />
              </div>
              <div className="mt-3 text-[12px] text-ink/55">{totals.window}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                Conversions
              </div>
              <div className="font-display text-ink text-[38px] md:text-[64px] leading-none tracking-tightest tabular-nums">
                <CountUp to={totals.conversions} duration={1600} />
              </div>
              <div className="mt-3 text-[12px] text-ink/55">{totals.window}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                Clicks to a partner
              </div>
              <div className="font-display text-ink text-[38px] md:text-[64px] leading-none tracking-tightest tabular-nums">
                <CountUp to={totals.clicks} duration={1600} />
              </div>
              <div className="mt-3 text-[12px] text-ink/55">{totals.window}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                Reading taken
              </div>
              <div className="font-display text-ink text-[28px] md:text-[40px] leading-none tracking-tightest tabular-nums">
                {totals.asOf}
              </div>
              <div className="mt-3 text-[12px] text-ink/55">
                the page shows the reading date, not the render date
              </div>
            </div>
          </div>
        </Reveal>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14 md:mb-20">
        {properties.map((p) =>
          isAbsent(p.meta.state) ? (
            <Reveal key={p.key}>
              <AbsentCard name={p.name} meta={p.meta} />
            </Reveal>
          ) : (
            <Reveal key={p.key}>
              <Panel>
                <div className="flex items-baseline gap-3 flex-wrap mb-6">
                  <h3 className="font-display text-ink text-[24px] md:text-[30px] leading-none tracking-tightest">
                    {p.name}
                  </h3>
                  <StateBadge state={p.meta.state} />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                  {p.figures.map((f) => (
                    <Figure key={f.label} {...f} />
                  ))}
                </div>
                <SourceStamp meta={p.meta} />
              </Panel>
            </Reveal>
          ),
        )}
      </div>

      <Reveal>
        <div className="flex items-baseline gap-4 mb-6 flex-wrap">
          <span className="font-display italic text-bronze text-[18px]">·</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Every partner, every click
          </span>
          <StateBadge state={partners.meta.state} />
        </div>
        <p className="text-[14px] md:text-[15px] leading-[1.7] text-ink/70 max-w-[68ch] mb-8">
          Earnings per click, partner by partner. This is the single field a
          competitor could act on directly, and it is here because a ledger that
          publishes only the flattering half is an advertisement. The rows
          sorted to the bottom, with clicks and no conversions, are the ones
          that cost us money.
        </p>
        <MetaNote meta={partners.meta} />
      </Reveal>

      {partners.rows.length ? (
        <Reveal>
          <ScrollBox>
            <table className="w-full min-w-[640px] text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-ink/20">
                  <th className="text-left font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 pr-4">
                    Partner
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                    Clicks
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                    Conversions
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                    Payout
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 pl-4">
                    Per click
                  </th>
                </tr>
              </thead>
              <tbody>
                {partners.rows.map((r) => (
                  <tr key={r.partner} className="border-b border-border">
                    <td className="py-3 pr-4 text-ink">{r.partner}</td>
                    <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                      {r.clicks.toLocaleString("en-US")}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                      {r.conversions.toLocaleString("en-US")}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                      ${r.payout.toLocaleString("en-US")}
                    </td>
                    <td
                      className={`py-3 pl-4 text-right tabular-nums ${
                        r.epc === null ? "text-bronze" : "text-ink"
                      }`}
                    >
                      {r.epc === null ? "nothing back" : `$${r.epc.toFixed(2)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollBox>
          <p className="mt-5 text-[12px] leading-[1.6] text-ink/55 max-w-[62ch]">
            Nothing back means the partner received clicks in this window and
            returned no conversion. It is not a zero we assumed, it is a zero we
            paid for.
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}

/* ─────────────────────────── search ─────────────────────────── */

function SearchSection() {
  return (
    <Section id="search" tone="sand">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Two"
          title="Search performance, per property"
          lede="Read from Search Console by a service account and committed as a dated snapshot. Six properties, five of them connected."
          meta={S.search.meta}
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {S.search.properties.map((p) =>
          isAbsent(p.meta.state) ? (
            <Reveal key={p.key}>
              <AbsentCard name={p.name} meta={p.meta} />
            </Reveal>
          ) : (
            <Reveal key={p.key}>
              <Panel>
                <div className="flex items-baseline gap-3 flex-wrap mb-6">
                  <h3 className="font-display text-ink text-[24px] md:text-[30px] leading-none tracking-tightest">
                    {p.name}
                  </h3>
                  <StateBadge state={p.meta.state} />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                  {p.figures.map((f) => (
                    <Figure key={f.label} {...f} />
                  ))}
                </div>
                <MetaNote meta={p.meta} />
                <SourceStamp meta={p.meta} />
              </Panel>
            </Reveal>
          ),
        )}
      </div>
    </Section>
  );
}

/* ─────────────────────────── forecasts ─────────────────────────── */

function ForecastSection() {
  const f = S.forecasts;
  return (
    <Section id="forecasts">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Three"
          title="Forecast accuracy, misses first"
          lede="Barque publishes dated predictions with a stated probability, then scores itself against what happened. The scoring rule punishes confidence, which is the only way a track record means anything."
          meta={f.meta}
        />
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-14 pb-14 border-b border-border">
          <Figure
            label="Brier score"
            value={f.brier === null ? "not scored" : f.brier.toFixed(3)}
            context={f.brierBasis}
            large
          />
          <Figure
            label="Called right"
            value={`${f.rightCount}`}
            context="the side the forecast leaned on is the side that happened"
            large
          />
          <Figure
            label="Called wrong"
            value={`${f.wrongCount}`}
            context="written up below in as much detail as the wins"
            large
          />
          <Figure
            label="Still open"
            value={`${f.openCount}`}
            context="past horizons are resolved before new forecasts are made"
            large
          />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {f.resolved.map((r) => (
          <Reveal key={r.id}>
            <Panel dashed={r.called === false}>
              <div className="flex items-baseline gap-3 flex-wrap mb-4">
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] ${
                    r.called === false ? "text-bronze" : "text-sage"
                  }`}
                >
                  {r.called === false ? "Wrong" : r.called === true ? "Right" : "Unscored"}
                </span>
                <h3 className="font-mono text-ink text-[14px] md:text-[16px]">
                  {r.id}
                </h3>
                {r.contrarian ? (
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    Contrarian call
                  </span>
                ) : null}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 mb-6">
                <Figure label="Stated probability" value={r.probability} />
                <Figure label="What happened" value={r.outcome} />
                <Figure
                  label="Brier"
                  value={r.brier === null ? "unscored" : r.brier.toFixed(4)}
                />
                <Figure label="Resolved" value={r.resolvedOn} />
              </div>

              <p className="text-[14px] leading-[1.7] text-ink/75 max-w-[76ch]">
                {r.notes}
              </p>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── throughput ─────────────────────────── */

function ThroughputSection() {
  const w = S.workOrders;
  return (
    <Section id="throughput" tone="sand">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Four"
          title="Work-order throughput"
          lede="The forecasting layer writes orders against the products. This is how many it wrote and what became of them. An order with no closing record counts as open, never as done."
          meta={w.meta}
        />
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-14 pb-14 border-b border-border">
          <Figure label="Orders raised" value={w.raised.toLocaleString("en-US")} large />
          {w.counts.slice(0, 2).map((c) => (
            <Figure
              key={c.status}
              label={c.status}
              value={c.count.toLocaleString("en-US")}
              large
            />
          ))}
          <Figure
            label="Median days to done"
            value={w.medianDaysToDone === null ? "not stated" : `${w.medianDaysToDone}`}
            context={w.medianBasis}
            large
          />
        </div>
      </Reveal>

      <Reveal>
        <ScrollBox>
          <table className="w-full min-w-[560px] text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-ink/20">
                <th className="text-left font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 pr-4">
                  Product
                </th>
                <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                  Raised
                </th>
                <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                  Done
                </th>
                <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 pl-4">
                  Still open
                </th>
              </tr>
            </thead>
            <tbody>
              {w.byProduct.map((p) => (
                <tr key={p.product} className="border-b border-border">
                  <td className="py-3 pr-4 text-ink font-mono text-[13px]">
                    {p.product}
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                    {p.raised}
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                    {p.done}
                  </td>
                  <td
                    className={`py-3 pl-4 text-right tabular-nums ${
                      p.open > 0 ? "text-bronze" : "text-ink/40"
                    }`}
                  >
                    {p.open}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollBox>
        <SourceStamp meta={w.meta} />
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────── incidents ─────────────────────────── */

function IncidentSection() {
  const i = S.incidents;
  const longest = i.rows.reduce(
    (max, r) => (r.daysBroken !== null && r.daysBroken > max ? r.daysBroken : max),
    0,
  );

  return (
    <Section id="broke">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Five"
          title="What broke, and for how long"
          lede="None of these crashed. Every one of them completed, reported success, and verified nothing, which is the failure mode that costs the most because it produces no alarm. Each row names the commit that fixed it, so the duration is checkable rather than asserted."
          meta={i.meta}
        />
      </Reveal>

      {longest ? (
        <Reveal>
          <p className="text-[15px] md:text-[17px] leading-[1.65] text-ink/70 max-w-[64ch] mb-12">
            The longest of them ran green for{" "}
            <span className="font-display text-ink text-[22px] md:text-[26px] tabular-nums">
              {longest}
            </span>{" "}
            days.
          </p>
        </Reveal>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {i.rows.map((r) => (
          <Reveal key={r.id}>
            <Panel>
              <div className="flex items-baseline gap-4 flex-wrap mb-5">
                <h3 className="font-display text-ink text-[22px] md:text-[30px] leading-[1.1] tracking-tightest max-w-[34ch]">
                  {r.title}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted font-mono normal-case tracking-normal text-[12px]">
                  {r.surface}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 mb-7">
                <Figure
                  label="Days broken"
                  value={
                    r.daysBroken === null
                      ? "undated"
                      : r.daysBrokenIsFloor
                        ? `${r.daysBroken}+`
                        : `${r.daysBroken}`
                  }
                  context={
                    r.daysBrokenIsFloor
                      ? "a floor, not a measurement. The true start is earlier and cannot be evidenced."
                      : undefined
                  }
                />
                <Figure label="First broken" value={r.firstBroken || "undated"} />
                <Figure label="Fixed" value={r.fixed || "open"} />
                <Figure label="Start date" value={r.firstBrokenState} />
              </div>

              <dl className="space-y-5 text-[14px] leading-[1.7] max-w-[80ch]">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
                    What broke
                  </dt>
                  <dd className="text-ink/80">{r.whatBroke}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
                    How it looked while broken
                  </dt>
                  <dd className="text-ink/80">{r.howItLookedGreen}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
                    What it was hiding
                  </dt>
                  <dd className="text-ink/80">{r.hiding}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
                    How the start date was established
                  </dt>
                  <dd className="text-ink/65">{r.firstBrokenBasis}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
                    Evidence it is fixed
                  </dt>
                  <dd className="text-ink/65">{r.fixEvidence}</dd>
                </div>
              </dl>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── content ─────────────────────────── */

function ContentSection() {
  const c = S.content;
  return (
    <Section id="content" tone="sand">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Six"
          title="What we published, and whether it ranked"
          lede="Publishing is not the outcome. Thirty days after an article goes up, either search has found it or it has not, and both answers are on this page."
          meta={c.meta}
        />
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 mb-12">
          <Figure label="Articles past 30 days old" value={`${c.eligible}`} large />
          <Figure label="Found by search" value={`${c.ranked}`} large />
          <Figure
            label="Not in the measured set"
            value={`${c.notRanked}`}
            context="published, and not earning impressions where we can see them"
            large
          />
        </div>
        <p className="text-[13px] leading-[1.65] text-ink/60 max-w-[70ch] mb-10">
          {c.scope}
        </p>
      </Reveal>

      {c.rows.length ? (
        <Reveal>
          <ScrollBox>
            <table className="w-full min-w-[640px] text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-ink/20">
                  <th className="text-left font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 pr-4">
                    Article
                  </th>
                  <th className="text-left font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                    Published
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                    Impressions
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 px-4">
                    Clicks
                  </th>
                  <th className="text-right font-medium uppercase tracking-[0.16em] text-[10px] text-muted py-3 pl-4">
                    Found
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.slug} className="border-b border-border">
                    <td className="py-3 pr-4 font-mono text-[12px] text-ink/85">
                      {r.slug}
                    </td>
                    <td className="py-3 px-4 text-ink/70 tabular-nums">
                      {r.published}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                      {r.impressions === null
                        ? "not in set"
                        : r.impressions.toLocaleString("en-US")}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums text-ink/75">
                      {r.clicks === null ? "not in set" : r.clicks.toLocaleString("en-US")}
                    </td>
                    <td
                      className={`py-3 pl-4 text-right ${
                        r.ranked ? "text-sage" : "text-bronze"
                      }`}
                    >
                      {r.ranked ? "yes" : "no"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollBox>
          <SourceStamp meta={c.meta} />
        </Reveal>
      ) : null}
    </Section>
  );
}

/* ─────────────────────────── AI citations ─────────────────────────── */

function AiSection() {
  const a = S.aiCitations;
  return (
    <Section id="ai">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Seven"
          title="AI citation share, engine by engine"
          lede="Assistants cite different domains from one another, so a blended number tells you nothing about any of them. These are separated, and the measurement behind them has a defect that is stated rather than smoothed over."
          meta={a.meta}
        />
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-12">
          <Figure
            label="Sessions from assistants"
            value={a.aiSessions.toLocaleString("en-US")}
            context={`${a.windowDays}-day window`}
            large
          />
          <Figure
            label="Share of all sessions"
            value={a.aiShare === null ? "not stated" : `${a.aiShare}%`}
            context="a floor, see below"
            large
          />
          <Figure
            label="All sessions"
            value={a.allSessions.toLocaleString("en-US")}
            context={`${a.windowDays}-day window`}
            large
          />
          <Figure
            label="Engines seen"
            value={`${a.engines.length}`}
            context="counted separately, never summed into one number"
            large
          />
        </div>
      </Reveal>

      {a.engines.length ? (
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {a.engines.map((e) => (
              <Panel key={e.engine}>
                <div className="font-display text-ink text-[24px] md:text-[28px] leading-none tracking-tightest mb-3">
                  {e.engine}
                </div>
                <div className="font-display text-ink text-[32px] md:text-[40px] leading-none tracking-tightest tabular-nums">
                  {e.sessions.toLocaleString("en-US")}
                </div>
                <div className="mt-2 text-[12px] text-ink/55">
                  sessions
                  {e.shareOfAllSessions === null
                    ? ""
                    : `, ${e.shareOfAllSessions}% of all traffic`}
                </div>
                {e.rawSources.length > 1 ? (
                  <div className="mt-3 text-[11px] text-ink/45 font-mono">
                    folded from {e.rawSources.join(", ")}
                  </div>
                ) : null}
              </Panel>
            ))}
          </div>
        </Reveal>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <Reveal>
          <Panel dashed>
            <div className="text-[10px] uppercase tracking-[0.22em] text-bronze mb-3">
              Known defect in this measurement
            </div>
            <p className="text-[14px] leading-[1.7] text-ink/80 max-w-[54ch]">
              {a.knownDefect}
            </p>
          </Panel>
        </Reveal>
        <Reveal>
          <Panel dashed>
            <div className="text-[10px] uppercase tracking-[0.22em] text-bronze mb-3">
              Why this is a floor
            </div>
            <p className="text-[14px] leading-[1.7] text-ink/80 max-w-[54ch]">
              {a.floorCaveat}
            </p>
          </Panel>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-6">
          <AbsentCard
            name="Every other property"
            meta={a.otherProperties}
          />
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────── spend ─────────────────────────── */

function SpendSection() {
  const s = S.spend;
  return (
    <Section id="spend" tone="sand">
      <Reveal>
        <SectionHead
          mark="§"
          eyebrow="Eight"
          title="Spend"
          lede="This is the thinnest section on the page, and it stays thin until there is a ledger behind it. One line is measured. The rest say what is not recorded and why, because an omitted cost reads as no cost."
          meta={s.meta}
        />
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 mb-12 max-w-[520px]">
          <Figure label="Lines measured" value={`${s.trackedCount}`} large />
          <Figure label="Lines not tracked" value={`${s.untrackedCount}`} large />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {s.rows.map((r) => (
          <Reveal key={r.item}>
            <Panel dashed={r.state !== "OK"}>
              <div className="flex items-baseline gap-3 flex-wrap mb-4">
                <h3 className="font-display text-ink text-[20px] md:text-[24px] leading-none tracking-tightest">
                  {r.item}
                </h3>
                <StateBadge state={r.state} />
              </div>
              <div className="font-display text-ink text-[28px] md:text-[36px] leading-none tracking-tightest tabular-nums mb-4">
                {r.amount ?? "no figure"}
                {r.amount ? (
                  <span className="text-[13px] font-sans text-ink/50 ml-3 tracking-normal">
                    {r.unit}
                  </span>
                ) : null}
              </div>
              <p className="text-[13px] leading-[1.65] text-ink/65 max-w-[52ch]">
                {r.basis}
              </p>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-ink/40">
                As of {r.asOf}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── properties ─────────────────────────── */

function PropertyCard({ p }: { p: PortfolioProperty }) {
  const label =
    p.status === "live"
      ? "Live"
      : p.status === "in-development"
        ? "In development"
        : "Planned";
  const dot =
    p.status === "live" ? "bg-sage" : p.status === "in-development" ? "bg-bronze" : "bg-muted";

  return (
    <Panel>
      <div className="flex items-baseline gap-4 mb-4 flex-wrap">
        <span className="font-display italic text-bronze text-[20px] md:text-[24px] leading-none">
          {p.num}
        </span>
        <h3 className="font-display text-ink text-[26px] md:text-[32px] leading-[1.05] tracking-tightest">
          {p.name}
        </h3>
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted">
          <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
          {label}
        </span>
      </div>

      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[12px] text-ink/60 hover:text-sage transition-colors font-mono"
      >
        {p.domain} <span aria-hidden>↗</span>
      </a>

      <p className="mt-5 text-[15px] leading-[1.65] text-ink/75 max-w-[58ch]">
        {p.oneLiner}
      </p>

      <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
        Conversion event · {p.conversionEvent}
      </div>

      {p.note ? (
        <p className="mt-5 pt-5 border-t border-border text-[13px] leading-[1.65] text-ink/65 italic font-display max-w-[58ch]">
          {p.note}
        </p>
      ) : null}
    </Panel>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function NumbersPage() {
  const sectionStates = Object.entries(S).map(([key, section]) => ({
    key,
    title: ledger.sectionTitles[key] ?? key,
    state: section.meta.state,
  }));

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
                The ledger
              </span>
            </div>

            <h1 className="font-display text-ink text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] leading-[0.94] tracking-tightest max-w-[18ch] mb-6 md:mb-8">
              Every number,{" "}
              <em className="italic text-sage">including the bad ones.</em>
            </h1>

            <p className="text-[16px] md:text-[19px] leading-[1.6] text-ink/75 max-w-[64ch]">
              What the portfolio earned, where search found it, which forecasts
              were wrong and by how much, what broke and how long it ran broken
              before anyone noticed, and the costs nobody here is tracking yet.
              Generated daily from the systems themselves. No figure on this page
              was typed by a person.
            </p>

            <p className="mt-6 text-[15px] md:text-[17px] leading-[1.65] text-ink/65 max-w-[64ch]">
              The absences matter as much as the figures. A source that was never
              read renders as words, never as a zero, because a missing
              measurement dressed as a measured zero is the specific lie this
              page exists to not tell.
            </p>

            <div className="mt-10 md:mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {sectionStates.map((s) => (
                <a
                  key={s.key}
                  href={`#${
                    {
                      revenue: "revenue",
                      search: "search",
                      forecasts: "forecasts",
                      workOrders: "throughput",
                      incidents: "broke",
                      content: "content",
                      aiCitations: "ai",
                      spend: "spend",
                    }[s.key] ?? s.key
                  }`}
                  className="group"
                >
                  <div className="text-[13px] text-ink/70 group-hover:text-sage transition-colors mb-1">
                    {s.title}
                  </div>
                  <StateBadge state={s.state} />
                </a>
              ))}
            </div>

            <div className="mt-10 md:mt-12 text-[12px] md:text-[13px] text-muted">
              Ledger generated {ledger.generatedAt} by{" "}
              <span className="font-mono">{ledger.generatedBy}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <RevenueSection />
      <SearchSection />
      <ForecastSection />
      <ThroughputSection />
      <IncidentSection />
      <ContentSection />
      <AiSection />
      <SpendSection />

      <Section id="properties">
        <Reveal>
          <SectionHead
            mark="¶"
            eyebrow="The properties"
            title="What each one is for"
            lede="The only part of this page a person writes. Everything above it is generated."
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioProperties.map((p) => (
            <Reveal key={p.slug}>
              <PropertyCard p={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="method" tone="sand">
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display italic text-bronze text-[18px]">·</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                How we count
              </span>
            </div>
            <h2 className="font-display text-ink text-[28px] md:text-[36px] leading-[1.1] tracking-tightest mb-5">
              Methodology, in the open.
            </h2>
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-ink/65 max-w-[38ch]">
              Six states, so that a value nobody read can never look like a value
              that came back zero: measured, measured and genuinely nothing, not
              fetched, not yet connected, not tracked, withheld. Every reading on
              this page carries one of them and the file it came from.
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-8">
            <ul className="space-y-5">
              {ledgerMethodology.map((m, i) => (
                <li
                  key={i}
                  className="text-[14px] md:text-[15px] leading-[1.7] text-ink/75 max-w-[68ch] pl-6 relative"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 inline-block h-1 w-3 bg-bronze/50 rounded-full"
                  />
                  {m}
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                What is deliberately not here
              </div>
              <p className="text-[14px] leading-[1.7] text-ink/70 max-w-[68ch]">
                The public log carries the daily briefs with their record and
                their reasoning. It does not carry the work-order queue or the
                strategic memo that sit in the same files, and those two sections
                are stripped before anything is published. Results in full was
                the decision. Broadcasting a plan that has not been executed yet
                is a different thing, and it was never chosen.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
