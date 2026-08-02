"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { anchors } from "@/lib/generated/anchors";

/**
 * Interactive scatter: the headline monthly price a GLP-1 telehealth program
 * leads with, against the highest monthly tier that same program publishes
 * for itself. The diagonal marks the case where those two numbers are equal.
 *
 * EVERY figure on this panel is read from lib/generated/anchors.ts. Nothing is
 * typed in. Until 2026-08-02 this chart plotted sixteen hand-entered
 * "advertised versus actual ongoing" pairs, twelve of which no longer matched
 * the source, and the second number in each pair had no source at all. The
 * glp1picks anchor carries one headline price per program plus that program's
 * own tier table, and nothing that could be called an ongoing cost without
 * somebody deciding which tier counted. So the axis now says what the data is.
 *
 * The programs that publish no tier table are NOT plotted and NOT defaulted
 * onto the parity line. Absent is not the same as equal, and a dot on the
 * diagonal would publish "this program has no higher tier" as a fact nobody
 * read. They are counted and named in the sidebar instead.
 */

const glp1picks = anchors.products.glp1picks.facts;
const HEADLINE: Record<string, number> = glp1picks.providerPrices.value;
const CEILING: Record<string, number> = glp1picks.providerPriceCeiling.value;
const NAMES: Record<string, string> = glp1picks.providerNames.value;

type Point = {
  id: string;
  name: string;
  headline: number;
  ceiling: number;
};

const plotted: Point[] = Object.keys(CEILING)
  .filter((slug) => typeof HEADLINE[slug] === "number")
  .map((slug) => ({
    id: slug,
    name: NAMES[slug] ?? slug,
    headline: HEADLINE[slug],
    ceiling: CEILING[slug],
  }))
  .sort((a, b) => a.headline - b.headline);

const noTierTable: string[] = Object.keys(HEADLINE)
  .filter((slug) => !(slug in CEILING))
  .map((slug) => NAMES[slug] ?? slug)
  .sort();

// Log scale on both axes. Headline prices sit between double and low triple
// figures while published ceilings reach four, so a linear axis folds most of
// the set into one corner.
const MIN = 40;
const MAX = 2200;
const TICKS = [50, 100, 250, 500, 1000, 2000];

const lg = (v: number) => Math.log10(v);
const SPAN = lg(MAX) - lg(MIN);

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

  const toX = (v: number) => ((lg(v) - lg(MIN)) / SPAN) * 100;
  const toY = (v: number) => 100 - ((lg(v) - lg(MIN)) / SPAN) * 100;

  const stats = useMemo(() => {
    const multiples = plotted
      .map((d) => d.ceiling / d.headline)
      .sort((a, b) => a - b);
    const mid = Math.floor(multiples.length / 2);
    const median =
      multiples.length % 2
        ? multiples[mid]
        : (multiples[mid - 1] + multiples[mid]) / 2;
    const widest = plotted.reduce((a, b) =>
      b.ceiling - b.headline > a.ceiling - a.headline ? b : a
    );
    return {
      flatCount: plotted.filter((d) => d.ceiling === d.headline).length,
      median,
      widest,
    };
  }, []);

  const hoveredPoint = plotted.find((d) => d.id === hovered);

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
              Pricing data · Read from the index on{" "}
              {glp1picks.providerPrices.asOf}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-ink text-[40px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tightest">
              The price a program leads with, plotted against{" "}
              <em className="italic text-sage">the top of its own price list</em>.
            </h2>
          </Reveal>
          <Reveal delay={160} className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink/75 max-w-[48ch]">
              Horizontal is the headline monthly price. Vertical is the highest
              monthly tier the same program publishes anywhere in its own
              pricing table, across every drug and every dose it sells. The
              dashed diagonal is where the two are equal. Both axes are
              logarithmic, because the spread runs from double figures to four.
              Hover a dot for the pair.
            </p>
            <p className="mt-5 text-[13px] leading-[1.65] text-muted max-w-[48ch]">
              A program sitting high is not necessarily overcharging. Usually it
              carries brand-name Wegovy or Zepbound at an undiscounted cash rate
              alongside a compounded product at a fraction of it. The distance
              is the reason one advertised number tells you so little on its own.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            {/* Mobile-only y-axis caption (the desktop uses a rotated label outside the chart) */}
            <div className="md:hidden mb-3 text-[10px] uppercase tracking-[0.22em] text-muted">
              Highest published tier ↑
            </div>
            <div className="relative pl-10 pb-12 md:pl-0 md:pb-0">
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
                aria-label="Scatter plot of headline monthly price against the highest monthly tier each GLP-1 telehealth program publishes for itself"
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

                {plotted
                  .filter((d) => d.ceiling > d.headline)
                  .map((d, i) => (
                    <line
                      key={`gap-${d.id}`}
                      x1={toX(d.headline)}
                      y1={toY(d.headline)}
                      x2={toX(d.headline)}
                      y2={toY(d.ceiling)}
                      stroke="#8B6F47"
                      strokeOpacity={hovered === d.id ? 0.85 : 0.18}
                      strokeWidth={hovered === d.id ? 0.5 : 0.3}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        transformOrigin: `${toX(d.headline)}px ${toY(d.headline)}px`,
                        transform: animate ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform 1.1s cubic-bezier(0.19,1,0.22,1) ${
                          400 + i * 22
                        }ms, stroke-opacity 0.3s ease-out, stroke-width 0.3s ease-out`,
                      }}
                    />
                  ))}

                {plotted.map((d, i) => {
                  const isHover = hovered === d.id;
                  const flat = d.ceiling === d.headline;
                  const cx = toX(d.headline);
                  const cyHead = toY(d.headline);
                  const cyTop = toY(d.ceiling);
                  return (
                    <g
                      key={d.id}
                      onMouseEnter={() => setHovered(d.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(d.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() =>
                        setHovered((prev) => (prev === d.id ? null : d.id))
                      }
                      tabIndex={0}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={cx}
                        cy={cyHead}
                        r={isHover ? 1.1 : 0.7}
                        fill="none"
                        stroke="#6B6A66"
                        strokeWidth={0.3}
                        vectorEffect="non-scaling-stroke"
                        opacity={animate ? 0.6 : 0}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            300 + i * 18
                          }ms, r 0.4s cubic-bezier(0.34,1.56,0.64,1)`,
                        }}
                      />

                      {isHover && (
                        <circle
                          cx={cx}
                          cy={cyTop}
                          r={2.6}
                          fill="none"
                          stroke={flat ? "#3B5D4F" : "#8B6F47"}
                          strokeOpacity={0.35}
                          strokeWidth={0.6}
                          vectorEffect="non-scaling-stroke"
                        />
                      )}

                      <circle
                        cx={cx}
                        cy={cyTop}
                        r={isHover ? 2 : 1.15}
                        fill={flat ? "#3B5D4F" : "#8B6F47"}
                        opacity={animate ? 1 : 0}
                        filter={isHover ? "url(#soft-glow)" : undefined}
                        style={{
                          transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${
                            500 + i * 22
                          }ms, r 0.35s cubic-bezier(0.34,1.56,0.64,1)`,
                        }}
                      />

                      <circle cx={cx} cy={cyTop} r={3.2} fill="transparent" />
                    </g>
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted px-1">
                {TICKS.map((t) => (
                  <span key={`xl-${t}`}>${t}</span>
                ))}
              </div>
              <div className="pointer-events-none absolute -left-9 md:-left-12 top-0 bottom-0 flex flex-col justify-between text-[10px] uppercase tracking-[0.2em] text-muted py-1 text-right">
                {[...TICKS].reverse().map((t) => (
                  <span key={`yl-${t}`}>${t}</span>
                ))}
              </div>

              <div className="absolute -bottom-12 md:-bottom-14 left-0 right-0 text-center text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-muted">
                Headline monthly price →
              </div>
              <div
                className="hidden md:block absolute -left-[92px] md:-left-[104px] top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.25em] text-muted"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
              >
                Highest published tier →
              </div>

              <div
                className="hidden sm:block absolute text-[11px] tracking-[0.22em] text-sage font-display italic"
                style={{ top: "10%", right: "5%" }}
              >
                headline = ceiling
              </div>

              {hoveredPoint && (
                <div
                  className="hidden sm:block absolute bg-ink text-cream text-[12px] md:text-[13px] rounded-md px-3.5 py-2.5 shadow-2xl pointer-events-none z-10"
                  style={{
                    left: `${toX(hoveredPoint.headline)}%`,
                    top: `${toY(hoveredPoint.ceiling)}%`,
                    transform: "translate(-50%, calc(-100% - 14px))",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="font-display text-cream text-[15px] leading-tight">
                    {hoveredPoint.name}
                  </div>
                  <div className="text-cream/75 text-[11px] leading-snug mt-1">
                    Headline{" "}
                    <span className="tabular-nums">${hoveredPoint.headline}</span>
                    {" · Top tier "}
                    <span
                      className={
                        hoveredPoint.ceiling === hoveredPoint.headline
                          ? "text-sage-soft tabular-nums"
                          : "text-bronze tabular-nums"
                      }
                    >
                      ${hoveredPoint.ceiling}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-3 w-3 rotate-45 bg-ink"
                  />
                </div>
              )}
            </div>
            </div>

            {/* Mobile tap readout — the absolute tooltip above doesn't render nicely
                on touch. A fixed-position readout below the chart gives the same
                information in a layout that respects small viewports. */}
            {hoveredPoint && (
              <div className="sm:hidden mt-6 rounded-md bg-ink text-cream px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-display text-cream text-[18px] leading-tight">
                    {hoveredPoint.name}
                  </div>
                  <div
                    className={`font-display italic text-[13px] ${
                      hoveredPoint.ceiling === hoveredPoint.headline
                        ? "text-sage-soft"
                        : "text-bronze"
                    }`}
                  >
                    {hoveredPoint.ceiling === hoveredPoint.headline
                      ? "One rate"
                      : "Tiered"}
                  </div>
                </div>
                <div className="text-cream/75 text-[12px] leading-snug mt-1.5">
                  Headline{" "}
                  <span className="tabular-nums">${hoveredPoint.headline}</span>
                  {" · Top tier "}
                  <span
                    className={
                      hoveredPoint.ceiling === hoveredPoint.headline
                        ? "text-sage-soft tabular-nums"
                        : "text-bronze tabular-nums"
                    }
                  >
                    ${hoveredPoint.ceiling}
                  </span>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-12 md:mt-20 flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-10 text-[12px] text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
                Headline price is the top of the list
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-bronze" />
                The list goes higher than the headline
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
                  Programs plotted
                </div>
                <div className="font-display text-ink text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {plotted.length}
                </div>
                <div className="text-[13px] text-muted mt-1 leading-[1.5]">
                  Out of the {glp1picks.providerCount.value} programs in the
                  index on glp1picks.com
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  One rate only
                </div>
                <div className="font-display text-sage text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {stats.flatCount}
                </div>
                <div className="text-[13px] text-muted mt-1 leading-[1.5]">
                  Programs whose published list tops out at the price they lead
                  with
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Median multiple
                </div>
                <div className="font-display text-bronze text-[40px] md:text-[56px] leading-none tracking-tightest tabular-nums">
                  {stats.median.toFixed(1)}×
                </div>
                <div className="text-[13px] text-muted mt-1 leading-[1.5]">
                  The typical program&apos;s highest tier, as a multiple of the
                  price it leads with
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Widest spread
                </div>
                <div className="font-display italic text-ink text-[20px] leading-tight">
                  {stats.widest.name}{" "}
                  <span className="text-bronze tabular-nums">
                    ${stats.widest.headline} to ${stats.widest.ceiling}
                  </span>
                </div>
                <div className="text-[12px] text-muted mt-2 leading-[1.55]">
                  Both figures come off the same program&apos;s own page. The
                  low one buys a compounded product, the high one buys the
                  brand at an undiscounted cash rate.
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-2">
                  Publishes no tier table
                </div>
                <div className="font-display text-ink text-[20px] leading-tight tabular-nums">
                  {noTierTable.length}
                </div>
                <div className="text-[12px] text-muted mt-2 leading-[1.55]">
                  {noTierTable.join(", ")}. Left off the chart rather than
                  placed on the parity line, because publishing no tier is not
                  the same fact as publishing one.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
