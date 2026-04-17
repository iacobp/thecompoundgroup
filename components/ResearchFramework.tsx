"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * The atomical research framework — five pillars.
 * Pairs a horizontally-scrolling marquee (Function Health pattern) with
 * an interactive pillar grid you can hover/click to expand.
 */

type Pillar = {
  key: string;
  num: string;
  label: string;
  body: string;
  detail: string;
  stat: { value: string; note: string };
};

const pillars: Pillar[] = [
  {
    key: "databases",
    num: "01",
    label: "Databases",
    body: "Every ranking is backed by a live dataset we maintain ourselves.",
    detail:
      "Pricing, dosing, FDA alerts, state Medicaid coverage, affiliate terms — all tracked in structured databases, audited weekly. No screenshots. No stale numbers.",
    stat: { value: "12,400+", note: "Data points under weekly audit" },
  },
  {
    key: "intent",
    num: "02",
    label: "Intent",
    body: "We start from the question the buyer is actually asking.",
    detail:
      "Every piece of content begins with search intent analysis — what users ask, how they compare, where existing content lies or omits. Protocols change when intent shifts.",
    stat: { value: "3,200+", note: "Queries mapped per brand" },
  },
  {
    key: "mind",
    num: "03",
    label: "Mind",
    body: "Supplements and protocols that improve cognition — if they work.",
    detail:
      "Nootropics, neuroplasticity tools, focus protocols. We evaluate mechanism, dosage, third-party testing, and peer-reviewed evidence before anything gets a recommendation.",
    stat: { value: "∞", note: "Protocols evolve with the science" },
  },
  {
    key: "body",
    num: "04",
    label: "Body",
    body: "GLP-1, peptides, hormones — the visible interventions.",
    detail:
      "From telehealth providers to pharmacy verification, we track what you can actually buy, what it costs all-in, and what side effects real users report. Pet bodies included.",
    stat: { value: "40+", note: "Providers actively monitored" },
  },
  {
    key: "protocols",
    num: "05",
    label: "Protocols",
    body: "Recommendations that change when the evidence changes.",
    detail:
      "We publish versioned protocols with changelog transparency. A 2026 Q2 rec is stamped and updated when a new trial, FDA action, or pricing shift demands it.",
    stat: { value: "Q/Q", note: "Versioned, changelogged, public" },
  },
];

export function ResearchFramework() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<string>(pillars[0].key);

  // Close with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(pillars[0].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const marqueeItems = [
    "Honest pricing",
    "Published methodology",
    "Provider-level data",
    "Affiliate disclosure",
    "Editorial review",
    "Evolving protocols",
    "Search-intent mapping",
    "Peer-reviewed evidence",
    "Pet health expansion",
    "Pharmacy verification",
    "Cost transparency",
    "Side-effect tracking",
  ];

  const activePillar = pillars.find((p) => p.key === active) ?? pillars[0];

  return (
    <section
      id="research"
      className="relative py-24 md:py-40 border-t border-border bg-ink text-cream overflow-hidden"
    >
      {/* Optional video bg — will be wired to the research montage when ready */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/video/research.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/85 to-ink/95"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Section label */}
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                Ω
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/60">
                Framework · Atomical research
              </span>
            </div>
          </div>
        </Reveal>

        {/* Big editorial headline */}
        <Reveal>
          <h2 className="font-display text-cream text-[40px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-tightest mb-12 md:mb-20 max-w-[22ch]">
            Research broken down into{" "}
            <em className="italic text-sage-soft">its atoms</em>.
          </h2>
        </Reveal>

        {/* Marquee strip — horizontally scrolling pillars, Function pattern */}
        <div className="relative -mx-6 md:-mx-10 mb-20 md:mb-28">
          <div
            className="group/marquee relative overflow-hidden py-6 md:py-8 border-y border-cream/10"
            aria-label="Research principles marquee"
          >
            <div
              className={`flex gap-10 md:gap-14 will-change-transform ${
                paused ? "" : "animate-marquee"
              }`}
            >
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <div
                  key={`${item}-${i}`}
                  className="shrink-0 flex items-center gap-4"
                >
                  <span className="font-display italic text-sage-soft text-[18px]">
                    ●
                  </span>
                  <span className="font-display text-cream text-[28px] md:text-[40px] leading-none tracking-snug whitespace-nowrap">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Pause control */}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="absolute bottom-1.5 md:bottom-2 left-6 md:left-10 inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-cream/55 hover:text-cream transition-colors"
              aria-label={paused ? "Resume motion" : "Pause motion"}
            >
              {paused ? (
                <span aria-hidden className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-0 border-l-[6px] border-l-cream/70 border-y-[4px] border-y-transparent" />
                </span>
              ) : (
                <span aria-hidden className="inline-flex items-center gap-1">
                  <span className="h-3 w-[2px] bg-cream/70" />
                  <span className="h-3 w-[2px] bg-cream/70" />
                </span>
              )}
              {paused ? "Resume motion" : "Pause motion"}
            </button>

            {/* Edge fades */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-ink to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-ink to-transparent"
            />
          </div>
        </div>

        {/* Interactive pillar grid + detail pane */}
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-5">
            <ul className="space-y-1">
              {pillars.map((p) => {
                const isActive = p.key === active;
                return (
                  <li key={p.key}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(p.key)}
                      onFocus={() => setActive(p.key)}
                      onClick={() => setActive(p.key)}
                      className={`group w-full text-left grid grid-cols-12 items-center gap-4 py-5 md:py-6 border-b border-cream/10 transition-colors duration-300 ${
                        isActive ? "text-cream" : "text-cream/55 hover:text-cream"
                      }`}
                    >
                      <span
                        className={`col-span-2 font-display italic text-[18px] md:text-[20px] transition-colors duration-300 ${
                          isActive ? "text-sage-soft" : "text-cream/40"
                        }`}
                      >
                        {p.num}
                      </span>
                      <span className="col-span-8 md:col-span-7 font-display text-[30px] md:text-[44px] leading-[0.95] tracking-tightest">
                        {p.label}
                      </span>
                      <span
                        aria-hidden
                        className={`col-span-2 md:col-span-3 text-right text-[14px] md:text-[16px] transition-all duration-500 ${
                          isActive
                            ? "opacity-100 translate-x-0 text-sage-soft"
                            : "opacity-0 -translate-x-2"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Detail pane */}
          <div className="col-span-12 md:col-span-7">
            <div
              key={activePillar.key}
              className="md:sticky md:top-24 rounded-md border border-cream/10 bg-cream/[0.02] p-8 md:p-12"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-display italic text-sage-soft text-[20px] md:text-[24px]">
                  {activePillar.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-cream/45">
                  Pillar
                </span>
              </div>

              <h3 className="font-display text-cream text-[40px] md:text-[64px] leading-[0.95] tracking-tightest mb-6">
                {activePillar.label}
              </h3>

              <p className="font-display italic text-cream/85 text-[22px] md:text-[26px] leading-[1.3] mb-8 max-w-[28ch]">
                {activePillar.body}
              </p>

              <p className="text-[15px] md:text-[17px] leading-[1.65] text-cream/75 mb-10 max-w-[52ch]">
                {activePillar.detail}
              </p>

              {/* Stat block */}
              <div className="border-t border-cream/15 pt-6 flex items-baseline gap-6">
                <div>
                  <div className="font-display text-cream text-[48px] md:text-[64px] leading-none tracking-tightest">
                    {activePillar.stat.value}
                  </div>
                </div>
                <div className="flex-1 text-[13px] md:text-[14px] text-cream/60 leading-[1.5]">
                  {activePillar.stat.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
