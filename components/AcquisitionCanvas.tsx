import Link from "next/link";

const loops = [
  {
    number: "01",
    name: "Observe",
    detail:
      "Demand, pricing, market changes, audience questions, and partner conditions enter a shared evidence layer.",
  },
  {
    number: "02",
    name: "Decide",
    detail:
      "A small queue turns evidence into work. Editorial standards and consequential choices remain under human control.",
  },
  {
    number: "03",
    name: "Publish",
    detail:
      "Comparison pages, tools, trackers, and distribution surfaces meet a specific decision without pretending every property is the same.",
  },
  {
    number: "04",
    name: "Learn",
    detail:
      "Outcomes, failures, and unresolved gaps become the input to the next pass. The record is part of the operating asset.",
  },
];

const transfer = [
  ["Properties", "Domains, repositories, content, and product surfaces are separable assets with a shared operating pattern."],
  ["Evidence", "The public ledger names what is measured, what is empty, what is withheld, and what is not yet connected."],
  ["Routines", "The repeatable work is documented as inputs, rules, outputs, and review points rather than kept in one operator's head."],
  ["Control", "Automation can observe and prepare work. A human retains control of editorial conclusions, safety, and material changes."],
];

export function AcquisitionCanvas() {
  return (
    <main className="bg-cream text-ink">
      <section className="bg-ink text-cream pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sage-soft">
            Acquisition brief / public operating canvas
          </p>
          <div className="mt-10 grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-8">
              <h1 className="font-display text-[48px] sm:text-[60px] md:text-[88px] leading-[0.91] tracking-tightest max-w-[11ch]">
                A consumer-health portfolio designed to be understood, <em className="italic text-sage">not merely operated.</em>
              </h1>
            </div>
            <p className="col-span-12 md:col-span-4 self-end text-[15px] md:text-[17px] leading-[1.7] text-cream/70 max-w-[34ch]">
              The Compound turns repeatable commercial-intent work into useful health decision surfaces. This is the public map of what a future operator would inherit and how they would verify it.
            </p>
          </div>
          <div className="mt-16 border-t border-cream/20 pt-5 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
            <span>Human-owned standards</span>
            <span>Documented routines</span>
            <span>Independent verification</span>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">The repeatable loop</p>
              <h2 className="mt-5 font-display text-[38px] md:text-[52px] leading-[0.98] tracking-tightest max-w-[10ch]">
                One system, adapted to each property.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 border-t border-ink/20">
              {loops.map((loop) => (
                <div key={loop.number} className="grid grid-cols-12 gap-5 border-b border-border py-7 md:py-9">
                  <span className="col-span-2 font-mono text-[11px] tracking-[0.18em] text-bronze">{loop.number}</span>
                  <h3 className="col-span-10 md:col-span-4 font-display text-[27px] md:text-[34px] leading-none tracking-tightest">{loop.name}</h3>
                  <p className="col-span-10 col-start-3 md:col-span-6 md:col-start-7 text-[14px] md:text-[15px] leading-[1.7] text-ink/65">{loop.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-sand/40">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">What transfers</p>
              <h2 className="mt-5 font-display text-[38px] md:text-[52px] leading-[0.98] tracking-tightest max-w-[11ch]">
                The asset is more than a collection of domains.
              </h2>
            </div>
            <dl className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
              {transfer.map(([term, description]) => (
                <div key={term} className="border-t border-ink/20 py-7 md:py-8">
                  <dt className="font-display text-[25px] leading-none tracking-tightest">{term}</dt>
                  <dd className="mt-4 text-[14px] md:text-[15px] leading-[1.7] text-ink/65">{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28 grid grid-cols-12 gap-8 md:gap-14">
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Evidence, not a pitch deck</p>
            <h2 className="mt-5 font-display text-[38px] md:text-[52px] leading-[0.98] tracking-tightest max-w-[10ch]">
              Figures belong to one record, with their limitations.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-ink/75 max-w-[42ch]">
              The public ledger is deliberately separate from this page. It distinguishes a measured zero from an unmeasured number, identifies the reading date, and keeps the public story from outrunning the underlying record.
            </p>
            <p className="mt-5 text-[14px] leading-[1.7] text-ink/60 max-w-[42ch]">
              A serious acquisition process would still include private, read-only verification for the appropriate stage of diligence. This page is an orientation layer, not a substitute for diligence.
            </p>
            <Link href="/numbers" className="group mt-9 inline-flex items-baseline gap-3 font-display text-[24px] md:text-[28px] tracking-tightest hover:text-bronze transition-colors">
              Inspect the public ledger <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28 grid grid-cols-12 gap-8 md:gap-14">
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sage-soft">For people and agents</p>
            <h2 className="mt-5 font-display text-[38px] md:text-[52px] leading-[0.98] tracking-tightest max-w-[11ch]">
              A readable business has fewer hidden dependencies.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-cream/75 max-w-[43ch]">
              This brief is ordinary semantic HTML. The same plain-language operating model is available as structured public data so researchers and AI agents can inspect the business without scraping an animation or guessing at a claim.
            </p>
            <Link href="/acquisition/brief" className="group mt-9 inline-flex items-baseline gap-3 font-display text-[24px] md:text-[28px] tracking-tightest text-cream hover:text-sage transition-colors">
              Read the structured brief <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
