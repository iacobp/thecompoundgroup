"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * Interactive scatter chart: advertised vs. actual all-in monthly price
 * across GLP-1 telehealth providers. The diagonal line is honesty.
 * Dots above the line are marketing dressed as medicine.
 *
 * Animated entrance (draws in on scroll) + hover tooltip per provider.
 */

type Point = {
  id: string;
  name: string;
  advertised: number;
  actual: number;
  honest: boolean;
  note?: string;
};

const data: Point[] = [
  { id: "eden", name: "Eden Health", advertised: 249, actual: 249, honest: true },
  { id: "sprout", name: "Sprout Health", advertised: 259, actual: 259, honest: true },
  { id: "sesame", name: "Sesame Care", advertised: 189, actual: 189, honest: true },
  { id: "strut", name: "Strut Health", advertised: 269, actual: 269, honest: true },
  { id: "enhance", name: "Enhance MD", advertised: 299, actual: 299, honest: true },
  { id: "tmates", name: "TMates", advertised: 215, actual: 215, honest: true },
  { id: "petermd", name: "PeterMD", advertised: 165, actual: 165, honest: true },
  { id: "willow", name: "Willow", advertised: 160, actual: 299, honest: false, note: "Intro price hides ongoing cost" },
  { id: "ro", name: "Ro", advertised: 99, actual: 344, honest: false, note: "Intro price only" },
  { id: "hims", name: "Hims", advertised: 85, actual: 295, honest: false, note: "First-month teaser" },
  { id: "hers", name: "Hers", advertised: 85, actual: 295, honest: false, note: "First-month teaser" },
  { id: "fridays", name: "Fridays", advertised: 129, actual: 269, honest: false, note: "Add-on fees" },
  { id: "zealthy", name: "Zealthy", advertised: 115, actual: 249, honest: false, note: "Membership separate" },
  { id: "trimrx", name: "TrimRx", advertised: 149, actual: 269, honest: false, note: "Meds billed separately" },
  { id: "henry", name: "Henry Meds", advertised: 185, actual: 297, honest: false, note: "Dose escalation charges" },
  { id: "shed", name: "Shed", advertised: 219, actual: 249, honest: false, note: "Lab fees extra" },
];

// Chart bounds (dollars)
const MIN = 50;
const MAX = 360;
const TICKS = [50, 150, 250, 350];

export function PricingAudit() {
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toX = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;
  const toY = (v: number) => 100 - ((v - MIN) / (MAX - MIN)) * 100;

  const hoveredPoint = data.find((d) => d.id === hovered);

  // Derive some summary stats for the bottom row
  const gaps = data.map((d) => d.actual - d.advertised);
  const avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  const honestCount = data.filter((d) => d.honest).length;
  const worstGap = Math.max(...gaps);
  const worstName = data.find((d) => d.actual - d.advertised === worstGap)?.name;

  return (
    <section
      id="audit"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <Reveal>
          <div className="flex items-baseline gap-5 mb-10 md:mb-14">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              ‡
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              Exhibit A · The pricing audit
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-ink text-[40px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-tightest">
              What they advertise.{" "}
              <em className="italic text-sage">What you actually pay</em>.
            </h2>
          </Reveal>
          <Reveal delay={160} className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-ink/75 max-w-[46ch]">
              Every dot is a GLP-1 telehealth provider. The diagonal is honesty
              — advertised equals actual. Dots hovering above it are
              marketing dressed as medicine. Hover any point for the receipt.
            </p>
          </Reveal>
        </div>

        {/* Chart */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="relative aspect-[5/4] w-full rounded-md bg-sand/50 border border-border overflow-visible">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Scatter plot of advertised versus actual monthly prices for GLP-1 providers"
              >
                {/* Gridlines */}
                {TICKS.map((t) => (
                  <g key={`g-${t}`}>
                    <line
                      x1={toX(t)}
                      y1={0}
                      x2={toX(t)}
                      y2={100}
                      stroke="#1C1C1A"
                      strokeOpacity="0.08"
                      strokeWidth={0.15}
                      vectorEffect="non-scaling-stroke"
                    />
                    <line
                      x1={0}
                      y1={toY(t)}
                      x2={100}
                      y2={toY(t)}
                      stroke="#1C1C1A"
                      strokeOpacity="0.08"
                      strokeWidth={0.15}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ))}

                {/* Honesty diagonal */}
                <line
                  x1={toX(MIN)}
                  y1={toY(MIN)}
                  x2={toX(MAX)}
                  y2={toY(MAX)}
                  stroke="#3B5D4F"
                  strokeWidth={0.35}
                  strokeDasharray="1.2 0.8"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDashoffset: animate ? 0 : 200,
                    transition: "stroke-dashoffset 1.6s cubic-bezier(0.19,1,0.22,1)",
                  }}
                />

                {/* Gap vectors — thin lines from advertised→actual for each dishonest one */}
                {data
                  .filter((d) => !d.honest)
                  .map((d, i) => (
                    <line
                      key={`gap-${d.id}`}
                      x1={toX(d.advertised)}
                      y1={toY(d.advertised)}
                      x2={toX(d.advertised)}
                      y2={toY(d.actual)}
                      stroke="#8B6F47"
                      strokeOpacity={hovered === d.id ? 0.75 : 0.22}
                      strokeWidth={0.35}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        transformOrigin: `${toX(d.advertised)}px ${toY(d.advertised)}px`,
                        transform: animate ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform 1.1s cubic-bezier(0.19,1,0.22,1) ${
                          400 + i * 60
                        }ms`,
                      }}
                    />
                  ))}

                {/* Points */}
                {data.map((d, i) => {
                  const isHover = hovered === d.id;
                  const cxAdv = toX(d.advertised);
                  const cyAdv = toY(d.advertised);
                  const cxAct = toX(d.advertised);
                  const cyAct = toY(d.actual);
                  return (
                    <g
                      key={d.id}
                      onMouseEnter={() => setHovered(d.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(d.id)}
                      onBlur={() => setHovered(null)}
                      tabIndex={0}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Advertised price marker (small, hollow) */}
                      <circle
                        cx={cxAdv}
                        cy={cyAdv}
                        r={isHover ? 0.9 : 0.7}
                        fill="none"
                        stroke="#6B6A66"
                        strokeWidth={0.3}
                        vectorEffect="non-scaling-stroke"
                        opacity={animate ? 0.6 : 0}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            300 + i * 40
                          }ms, r 0.3s ease-out`,
                        }}
                      />
                      {/* Actual price marker (big, filled) */}
                      <circle
                        cx={cxAct}
                        cy={cyAct}
                        r={isHover ? 1.8 : 1.2}
                        fill={d.honest ? "#3B5D4F" : "#8B6F47"}
                        opacity={animate ? 1 : 0}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            500 + i * 60
                          }ms, r 0.3s ease-out`,
                        }}
                      />
                      {/* Hitbox */}
                      <circle
                        cx={cxAct}
                        cy={cyAct}
                        r={3}
                        fill="transparent"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Axis labels */}
              <div className="pointer-events-none absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted px-1">
                {TICKS.map((t) => (
                  <span key={`xl-${t}`}>${t}</span>
                ))}
              </div>
              <div className="pointer-events-none absolute -left-10 md:-left-12 top-0 bottom-0 flex flex-col justify-between text-[10px] uppercase tracking-[0.2em] text-muted py-1 text-right">
                {[...TICKS].reverse().map((t) => (
                  <span key={`yl-${t}`}>${t}</span>
                ))}
              </div>

              {/* Axis titles */}
              <div className="absolute -bottom-14 left-0 right-0 text-center text-[11px] uppercase tracking-[0.25em] text-muted">
                Advertised price →
              </div>
              <div
                className="absolute -left-[92px] md:-left-[104px] top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.25em] text-muted"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
              >
                Actual price →
              </div>

              {/* Honesty line label */}
              <div
                className="absolute text-[11px] uppercase tracking-[0.22em] text-sage font-display italic normal-case"
                style={{ top: "12%", right: "6%" }}
              >
                honesty line
              </div>

              {/* Tooltip */}
              {hoveredPoint && (
                <div
                  className="absolute bg-ink text-cream text-[12px] md:text-[13px] rounded-sm px-3 py-2 shadow-lg pointer-events-none"
                  style={{
                    left: `${toX(hoveredPoint.advertised)}%`,
                    top: `${toY(hoveredPoint.actual)}%`,
                    transform: "translate(-50%, -130%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="font-display text-cream text-[14px] leading-tight">
                    {hoveredPoint.name}
                  </div>
                  <div className="text-cream/70 text-[11px] leading-snug mt-0.5">
                    Advertised ${hoveredPoint.advertised}{" · "}
                    <span
                      className={hoveredPoint.honest ? "text-sage-soft" : "text-bronze"}
                    >
                      Actual ${hoveredPoint.actual}
                    </span>
                  </div>
                  {hoveredPoint.note && (
                    <div className="text-cream/55 text-[10px] mt-1 italic">
                      {hoveredPoint.note}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-6 md:gap-10 text-[12px] text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
                Honest — advertised = actual
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-bronze" />
                Inflated — actual price above advertised
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="inline-block h-[2px] w-5"
                  style={{
                    background: "repeating-linear-gradient(90deg,#3B5D4F 0 3px,transparent 3px 5px)",
                  }}
                />
                Honesty line
              </span>
            </div>
          </div>

          {/* Data readout column */}
          <Reveal delay={200} className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24 space-y-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Dataset
                </div>
                <div className="font-display text-ink text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {data.length}
                </div>
                <div className="text-[13px] text-muted mt-1">
                  Providers in the index
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Honest
                </div>
                <div className="font-display text-sage text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {honestCount}
                </div>
                <div className="text-[13px] text-muted mt-1">
                  Advertised = actual
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Average gap
                </div>
                <div className="font-display text-bronze text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  +${avgGap}
                </div>
                <div className="text-[13px] text-muted mt-1">
                  Above what was advertised
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Biggest gap
                </div>
                <div className="font-display italic text-ink text-[20px] leading-tight">
                  {worstName} <span className="text-bronze">+${worstGap}</span>
                </div>
                <div className="text-[12px] text-muted mt-1 leading-[1.5]">
                  The distance between their marketing and their invoice.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
