import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

type Numeric = {
  to: number;
  suffix?: string;
  label: string;
  note: string;
};

const numbers: Numeric[] = [
  { to: 960, suffix: "+", label: "Pages shipped", note: "Every one footnoted" },
  { to: 40, label: "Providers on record", note: "All-in pricing, no asterisks" },
  { to: 51, label: "State-by-state guides", note: "Where Medicaid meets reality" },
  { to: 20, label: "Affiliate partners", note: "None of them own a rank" },
];

export function Metrics() {
  return (
    <section className="py-20 md:py-28 border-t border-border bg-sand/60 relative overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-5 mb-14 md:mb-20">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              ¶
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              The work · Counted
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          {numbers.map((n, i) => (
            <Reveal key={n.label} delay={i * 100}>
              <div className="border-t border-ink/15 pt-6">
                <div className="font-display text-ink text-[56px] md:text-[88px] leading-[0.9] tracking-tightest mb-4 tabular-nums">
                  <CountUp to={n.to} suffix={n.suffix} duration={1800} />
                </div>
                <div className="text-[13px] md:text-[14px] text-ink font-medium mb-1">
                  {n.label}
                </div>
                <div className="text-[12px] text-muted">{n.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
