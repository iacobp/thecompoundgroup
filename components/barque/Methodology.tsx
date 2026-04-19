import { Reveal } from "../Reveal";

const loop = [
  { num: "I", label: "Observe", body: "Pull signals from 20+ public sources across regulatory, financial, search, social, and cultural data feeds. Breadth first, never autonomous." },
  { num: "II", label: "Cluster", body: "Group items by emerging entity. A new drug name, a new retailer withdrawal, a new vocabulary on Reddit — cluster the signal, not the noise." },
  { num: "III", label: "Simulate", body: "Five agents reason independently: the Regulator, the Incumbent, the DTC Marketer, the Consumer, the Investor. If four rhyme, the signal is real. If they diverge, it's weaker than it looks." },
  { num: "IV", label: "Score", body: "Signal Strength = volume × cross-domain × velocity × novelty × causal path. Below 20, we refuse to predict. Above 100, we predict with conviction." },
  { num: "V", label: "Resolve", body: "Every forecast has a date. When it passes, we score it with Brier — (probability − outcome)². The log is public. Corrections happen even when they hurt." },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="relative py-24 md:py-36 border-t border-border bg-cream text-ink"
    >
      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                IV
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                Methodology
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-ink text-[34px] sm:text-[40px] md:text-[64px] lg:text-[72px] leading-[1.04] tracking-tightest mb-5 md:mb-6 max-w-[22ch]">
            Not a time machine.{" "}
            <em className="italic text-sage-soft">A calibrated one.</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] text-ink/70 max-w-[60ch] mb-16 md:mb-28">
            Barque isn&apos;t trying to predict everything. It&apos;s a
            domain-specific forecasting loop with a Brier score — the same
            primitive Tetlock&apos;s superforecasters use, scaled across
            internet signals. Five steps, every session, every forecast.
          </p>
        </Reveal>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-10">
          {loop.map((step, i) => (
            <Reveal key={step.num} delay={80 * i} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="border-t border-ink/15 pt-5 md:pt-8 h-full">
                <div className="font-display italic text-sage-soft text-[20px] md:text-[24px] mb-3 md:mb-4">
                  {step.num}
                </div>
                <h3 className="font-display text-ink text-[28px] sm:text-[32px] md:text-[40px] leading-none tracking-tightest mb-4 md:mb-5">
                  {step.label}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink/70 max-w-[38ch]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
