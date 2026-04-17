"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * Interactive scatter chart: advertised vs. actual all-in monthly price
 * across GLP-1 telehealth providers. The diagonal line is honesty.
 * Dots above the line are marketing dressed as medicine.
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
  { id: "willow", name: "Willow", advertised: 160, actual: 299, honest: false, note: "Intro price hides the refill" },
  { id: "ro", name: "Ro", advertised: 99, actual: 344, honest: false, note: "Intro price only" },
  { id: "hims", name: "Hims", advertised: 85, actual: 295, honest: false, note: "First-month teaser" },
  { id: "hers", name: "Hers", advertised: 85, actual: 295, honest: false, note: "First-month teaser" },
  { id: "fridays", name: "Fridays", advertised: 129, actual: 269, honest: false, note: "Add-on fees at checkout" },
  { id: "zealthy", name: "Zealthy", advertised: 115, actual: 249, honest: false, note: "Membership billed separately" },
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
  const worstGap = Math.max(...data.map((d) => d.actual - d.advertised));
  const worstId = data.find((d) => d.actual - d.advertised === worstGap)?.id;

  const gaps = data.map((d) => d.actual - d.advertised);
  const avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  const honestCount = data.filter((d) => d.honest).length;
  const worstName = data.find((d) => d.id === worstId)?.name;

  return (
    <section
      id="audit"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-5 mb-10 md:mb-14">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              ‡
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              Exhibit A · The pricing receipt
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
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink/75 max-w-[46ch]">
              Every dot is a GLP-1 telehealth provider. The dashed diagonal is
              honesty — where the ad equals the invoice. Everything floating
              above it is marketing dressed as medicine. Hover any dot for the
              receipt.
            </p>
          </Reveal>
        </div>

        {/* Chart */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="relative aspect-[5/4] w-full rounded-md bg-gradient-to-br from-sand/70 to-sand/40 border border-border overflow-visible">
              {/* soft decorative corner light */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full opacity-60 blur-3xl"
                style={{ background: "radial-gradient(circle,#F4F1EB 0%,transparent 70%)" }}
              />

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Scatter plot of advertised versus actual monthly prices for GLP-1 providers"
              >
                <defs>
                  {/* Soft glow for hovered / worst */}
                  <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

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
                  strokeWidth={0.4}
                  strokeDasharray="1.2 0.8"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDashoffset: animate ? 0 : 200,
                    transition: "stroke-dashoffset 1.8s cubic-bezier(0.19,1,0.22,1)",
                  }}
                />

                {/* Gap vectors */}
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
                      strokeOpacity={hovered === d.id ? 0.85 : 0.22}
                      strokeWidth={hovered === d.id ? 0.5 : 0.35}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        transformOrigin: `${toX(d.advertised)}px ${toY(d.advertised)}px`,
                        transform: animate ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform 1.1s cubic-bezier(0.19,1,0.22,1) ${
                          400 + i * 60
                        }ms, stroke-opacity 0.3s ease-out, stroke-width 0.3s ease-out`,
                      }}
                    />
                  ))}

                {/* Points */}
                {data.map((d, i) => {
                  const isHover = hovered === d.id;
                  const isWorst = d.id === worstId;
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
                      {/* Advertised (hollow) */}
                      <circle
                        cx={cxAdv}
                        cy={cyAdv}
                        r={isHover ? 1.1 : 0.75}
                        fill="none"
                        stroke="#6B6A66"
                        strokeWidth={0.3}
                        vectorEffect="non-scaling-stroke"
                        opacity={animate ? 0.65 : 0}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            300 + i * 40
                          }ms, r 0.4s cubic-bezier(0.34,1.56,0.64,1)`,
                        }}
                      />

                      {/* Ping aura for the worst offender */}
                      {isWorst && animate && (
                        <circle
                          cx={cxAct}
                          cy={cyAct}
                          r={2.6}
                          fill="none"
                          stroke="#8B6F47"
                          strokeWidth={0.4}
                          vectorEffect="non-scaling-stroke"
                          opacity={0.55}
                          style={{
                            transformOrigin: `${cxAct}px ${cyAct}px`,
                            animation: "pulseRing 2.4s cubic-bezier(0,0,0.2,1) infinite",
                          }}
                        />
                      )}

                      {/* Glow ring on hover */}
                      {isHover && (
                        <circle
                          cx={cxAct}
                          cy={cyAct}
                          r={2.6}
                          fill="none"
                          stroke={d.honest ? "#3B5D4F" : "#8B6F47"}
                          strokeOpacity={0.35}
                          strokeWidth={0.6}
                          vectorEffect="non-scaling-stroke"
                        />
                      )}

                      {/* Actual (filled) */}
                      <circle
                        cx={cxAct}
                        cy={cyAct}
                        r={isHover ? 2 : 1.25}
                        fill={d.honest ? "#3B5D4F" : "#8B6F47"}
                        opacity={animate ? 1 : 0}
                        filter={isHover ? "url(#soft-glow)" : undefined}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            500 + i * 60
                          }ms, r 0.35s cubic-bezier(0.34,1.56,0.64,1)`,
                        }}
                      />

                      {/* Hitbox */}
                      <circle cx={cxAct} cy={cyAct} r={3.2} fill="transparent" />
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
                What they tell you →
              </div>
              <div
                className="absolute -left-[92px] md:-left-[104px] top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.25em] text-muted"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
              >
                What you pay →
              </div>

              {/* Honesty label */}
              <div
                className="absolute text-[11px] tracking-[0.22em] text-sage font-display italic"
                style={{ top: "12%", right: "6%" }}
              >
                the honesty line
              </div>

              {/* Tooltip */}
              {hoveredPoint && (
                <div
                  className="absolute bg-ink text-cream text-[12px] md:text-[13px] rounded-md px-3.5 py-2.5 shadow-2xl pointer-events-none z-10 transition-opacity"
                  style={{
                    left: `${toX(hoveredPoint.advertised)}%`,
                    top: `${toY(hoveredPoint.actual)}%`,
                    transform: "translate(-50%, calc(-100% - 14px))",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="font-display text-cream text-[15px] leading-tight">
                    {hoveredPoint.name}
                  </div>
                  <div className="text-cream/70 text-[11px] leading-snug mt-1">
                    Advertised{" "}
                    <span className="tabular-nums">${hoveredPoint.advertised}</span>
                    {" → "}
                    <span
                      className={
                        hoveredPoint.honest
                          ? "text-sage-soft tabular-nums"
                          : "text-bronze tabular-nums"
                      }
                    >
                      Actual ${hoveredPoint.actual}
                    </span>
                  </div>
                  {hoveredPoint.note && (
                    <div className="text-cream/55 text-[10px] mt-1.5 italic max-w-[22ch] whitespace-normal">
                      {hoveredPoint.note}
                    </div>
                  )}
                  {/* tooltip tail */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-3 w-3 rotate-45 bg-ink"
                  />
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-6 md:gap-10 text-[12px] text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
                Honest — ad = invoice
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-bronze" />
                Inflated — invoice above the ad
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
                  In the index
                </div>
                <div className="font-display text-ink text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {data.length}
                </div>
                <div className="text-[13px] text-muted mt-1">
                  Providers we actually checked
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Ad = invoice
                </div>
                <div className="font-display text-sage text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {honestCount}
                </div>
                <div className="text-[13px] text-muted mt-1">
                  The ones telling the truth
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Average overrun
                </div>
                <div className="font-display text-bronze text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  +${avgGap}
                </div>
                <div className="text-[13px] text-muted mt-1">
                  Above what they quoted
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Biggest offender
                </div>
                <div className="font-display italic text-ink text-[20px] leading-tight">
                  {worstName}{" "}
                  <span className="text-bronze tabular-nums">+${worstGap}</span>
                </div>
                <div className="text-[12px] text-muted mt-1 leading-[1.5]">
                  The distance between their marketing and your invoice.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
