"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * Interactive scatter chart: advertised starter price vs. typical ongoing
 * monthly cost across GLP-1 telehealth programs. The diagonal marks
 * parity — programs above it have pricing structures where the starter
 * rate and the ongoing rate differ. Framing is descriptive, not accusatory.
 */

type Point = {
  id: string;
  name: string;
  advertised: number;
  actual: number;
  simple: boolean;
  structure?: string;
};

const data: Point[] = [
  { id: "eden", name: "Eden Health", advertised: 249, actual: 249, simple: true },
  { id: "sprout", name: "Sprout Health", advertised: 259, actual: 259, simple: true },
  { id: "sesame", name: "Sesame Care", advertised: 189, actual: 189, simple: true },
  { id: "strut", name: "Strut Health", advertised: 269, actual: 269, simple: true },
  { id: "enhance", name: "Enhance MD", advertised: 299, actual: 299, simple: true },
  { id: "tmates", name: "TMates", advertised: 215, actual: 215, simple: true },
  { id: "petermd", name: "PeterMD", advertised: 165, actual: 165, simple: true },
  { id: "willow", name: "Willow", advertised: 160, actual: 299, simple: false, structure: "Starter rate, then standard refill pricing" },
  { id: "ro", name: "Ro", advertised: 99, actual: 344, simple: false, structure: "Introductory first-month rate" },
  { id: "hims", name: "Hims", advertised: 85, actual: 295, simple: false, structure: "Introductory first-month rate" },
  { id: "hers", name: "Hers", advertised: 85, actual: 295, simple: false, structure: "Introductory first-month rate" },
  { id: "fridays", name: "Fridays", advertised: 129, actual: 269, simple: false, structure: "Medication billed separately from visit" },
  { id: "zealthy", name: "Zealthy", advertised: 115, actual: 249, simple: false, structure: "Membership billed separately" },
  { id: "trimrx", name: "TrimRx", advertised: 149, actual: 269, simple: false, structure: "Medication billed separately" },
  { id: "henry", name: "Henry Meds", advertised: 185, actual: 297, simple: false, structure: "Pricing scales with dose escalation" },
  { id: "shed", name: "Shed", advertised: 219, actual: 249, simple: false, structure: "Laboratory fees billed separately" },
];

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
  const gaps = data.map((d) => d.actual - d.advertised);
  const avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  const simpleCount = data.filter((d) => d.simple).length;
  const widestGap = Math.max(...gaps);
  const widestId = data.find((d) => d.actual - d.advertised === widestGap)?.id;
  const widestName = data.find((d) => d.id === widestId)?.name;

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
              Pricing data · From our April index
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-ink text-[40px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tightest">
              Advertised starter price, plotted against{" "}
              <em className="italic text-sage">actual ongoing monthly cost</em>.
            </h2>
          </Reveal>
          <Reveal delay={160} className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink/75 max-w-[48ch]">
              Each dot represents a GLP-1 telehealth program in our index.
              The dashed diagonal marks the point where the starter rate and
              the typical ongoing rate are the same. Programs above the line
              have a pricing structure — an introductory month, a separately
              billed membership, dose-based escalation — that makes their
              first-month cost different from their steady-state cost. Hover
              a dot for the specifics.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="relative aspect-[5/4] w-full rounded-md bg-gradient-to-br from-sand/70 to-sand/40 border border-border overflow-visible">
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
                aria-label="Scatter plot of advertised starter price versus typical ongoing monthly cost for GLP-1 telehealth programs"
              >
                <defs>
                  <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

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

                {data
                  .filter((d) => !d.simple)
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

                      {isHover && (
                        <circle
                          cx={cxAct}
                          cy={cyAct}
                          r={2.6}
                          fill="none"
                          stroke={d.simple ? "#3B5D4F" : "#8B6F47"}
                          strokeOpacity={0.35}
                          strokeWidth={0.6}
                          vectorEffect="non-scaling-stroke"
                        />
                      )}

                      <circle
                        cx={cxAct}
                        cy={cyAct}
                        r={isHover ? 2 : 1.25}
                        fill={d.simple ? "#3B5D4F" : "#8B6F47"}
                        opacity={animate ? 1 : 0}
                        filter={isHover ? "url(#soft-glow)" : undefined}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            500 + i * 60
                          }ms, r 0.35s cubic-bezier(0.34,1.56,0.64,1)`,
                        }}
                      />

                      <circle cx={cxAct} cy={cyAct} r={3.2} fill="transparent" />
                    </g>
                  );
                })}
              </svg>

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

              <div className="absolute -bottom-14 left-0 right-0 text-center text-[11px] uppercase tracking-[0.25em] text-muted">
                Advertised starter price →
              </div>
              <div
                className="absolute -left-[92px] md:-left-[104px] top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.25em] text-muted"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
              >
                Ongoing monthly cost →
              </div>

              <div
                className="absolute text-[11px] tracking-[0.22em] text-sage font-display italic"
                style={{ top: "12%", right: "6%" }}
              >
                advertised = ongoing
              </div>

              {hoveredPoint && (
                <div
                  className="absolute bg-ink text-cream text-[12px] md:text-[13px] rounded-md px-3.5 py-2.5 shadow-2xl pointer-events-none z-10"
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
                  <div className="text-cream/75 text-[11px] leading-snug mt-1">
                    Starter{" "}
                    <span className="tabular-nums">${hoveredPoint.advertised}</span>
                    {" · Ongoing "}
                    <span
                      className={
                        hoveredPoint.simple
                          ? "text-sage-soft tabular-nums"
                          : "text-bronze tabular-nums"
                      }
                    >
                      ${hoveredPoint.actual}
                    </span>
                  </div>
                  {hoveredPoint.structure && (
                    <div className="text-cream/60 text-[10px] mt-1.5 italic max-w-[24ch] whitespace-normal">
                      {hoveredPoint.structure}
                    </div>
                  )}
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
                Flat pricing — starter matches ongoing
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-bronze" />
                Structured pricing — starter differs from ongoing
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="inline-block h-[2px] w-5"
                  style={{
                    background: "repeating-linear-gradient(90deg,#3B5D4F 0 3px,transparent 3px 5px)",
                  }}
                />
                Parity line
              </span>
            </div>
          </div>

          <Reveal delay={200} className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24 space-y-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Programs in the index
                </div>
                <div className="font-display text-ink text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {data.length}
                </div>
                <div className="text-[13px] text-muted mt-1 leading-[1.5]">
                  Sampled from the forty-program index on glp1picks.com
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Flat pricing
                </div>
                <div className="font-display text-sage text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {simpleCount}
                </div>
                <div className="text-[13px] text-muted mt-1 leading-[1.5]">
                  Starter price matches the ongoing monthly rate
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Average variance
                </div>
                <div className="font-display text-bronze text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  +${avgGap}
                </div>
                <div className="text-[13px] text-muted mt-1 leading-[1.5]">
                  Typical difference between starter and ongoing, across the set
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Widest structural variance
                </div>
                <div className="font-display italic text-ink text-[20px] leading-tight">
                  {widestName}{" "}
                  <span className="text-bronze tabular-nums">+${widestGap}</span>
                </div>
                <div className="text-[12px] text-muted mt-2 leading-[1.55]">
                  A program where introductory-month pricing differs most from
                  the steady-state monthly rate. The structural distance
                  between the two numbers, measured in dollars per month.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
