"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

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
    body: "Every ranking is backed by a live dataset we audit weekly.",
    detail:
      "Pricing. Dosing. FDA alerts. Medicaid coverage by state. Affiliate terms. All of it lives in structured databases we audit every week. No screenshots. No 'last updated 2023.' If a number on the site looks wrong, it's because we haven't run the audit yet — and we're about to.",
    stat: { value: "12,400+", note: "Structured datapoints, audited weekly" },
  },
  {
    key: "intent",
    num: "02",
    label: "Intent",
    body: "We start with the question you'd actually type at 1 AM.",
    detail:
      "Every page begins with the search — what you actually type, how you actually compare, where the existing answers lie by omission. When the intent shifts, so does our content. We don't write for the algorithm. We write for the question underneath it.",
    stat: { value: "3,200+", note: "Search intents mapped, per brand" },
  },
  {
    key: "mind",
    num: "03",
    label: "Mind",
    body: "Nootropics that hold up. Protocols that improve cognition without pretending to.",
    detail:
      "Nootropics. Neuroplasticity training. Focus stacks. Each one runs through the same filter: mechanism, dosage, third-party testing, peer-reviewed evidence. If it can't show up on all four, it doesn't show up on our site.",
    stat: { value: "∞", note: "Protocols update when the science does" },
  },
  {
    key: "body",
    num: "04",
    label: "Body",
    body: "GLP-1. Peptides. Hormones. Tracked from ad to invoice.",
    detail:
      "Telehealth providers. Compounding pharmacies. Hormone clinics. We track what you can actually buy, what it costs all-in, and what the side-effect forums are saying. Pet bodies get the same treatment.",
    stat: { value: "40+", note: "Providers on the record, all-in priced" },
  },
  {
    key: "protocols",
    num: "05",
    label: "Protocols",
    body: "Recommendations versioned like software. Changelog in public.",
    detail:
      "A 2026 Q2 recommendation is stamped. When a new trial drops, a pharmacy gets a warning letter, or a provider doubles their price — we push a new version and publish the changelog. You get to see the edit history.",
    stat: { value: "Q/Q", note: "Versioned quarterly · Changelog public" },
  },
];

const marqueeItems = [
  "Honest pricing",
  "Published methodology",
  "Named medical reviewer",
  "Loud affiliate disclosures",
  "Versioned protocols",
  "Peer-reviewed sources",
  "Pharmacy license checks",
  "Side-effect audits",
  "Cost-per-refill tracking",
  "Pet-health extensions",
  "Search-intent mapping",
  "Quarterly republishing",
];

export function ResearchFramework() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<string>(pillars[0].key);

  // Measure the active pillar button so the left-indicator can slide
  const listRef = useRef<HTMLUListElement | null>(null);
  const [indicator, setIndicator] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const btn = list.querySelector<HTMLElement>(`[data-key="${active}"]`);
    if (btn) {
      setIndicator({
        top: btn.offsetTop,
        height: btn.offsetHeight,
      });
    }
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(pillars[0].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activePillar = pillars.find((p) => p.key === active) ?? pillars[0];

  return (
    <section
      id="research"
      className="relative py-24 md:py-40 border-t border-border bg-ink text-cream overflow-hidden"
    >
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
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-sage-soft text-[22px] md:text-[28px]">
                Ω
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/60">
                The framework · How we break things down
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-cream text-[40px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-tightest mb-12 md:mb-20 max-w-[22ch]">
            Research, <em className="italic text-sage-soft">atom by atom</em>.
          </h2>
        </Reveal>

        {/* Marquee — Function-pattern horizontal scroll with pause control */}
        <div className="relative -mx-6 md:-mx-10 mb-20 md:mb-28">
          <div
            className="group/marquee marquee-parent relative overflow-hidden py-6 md:py-8 border-y border-cream/10"
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
                  className="shrink-0 flex items-center gap-4 transition-colors duration-300 hover:text-sage-soft"
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

            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="absolute bottom-1.5 md:bottom-2 left-6 md:left-10 inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-cream/55 hover:text-cream transition-colors"
              aria-label={paused ? "Resume motion" : "Pause motion"}
            >
              {paused ? (
                <span aria-hidden className="inline-flex items-center gap-1.5">
                  <span className="h-0 w-0 border-l-[6px] border-l-cream/70 border-y-[4px] border-y-transparent" />
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
            <div className="relative">
              {/* Sliding active indicator */}
              <span
                aria-hidden
                className="pillar-indicator absolute left-0 w-[3px] bg-sage-soft rounded-full"
                style={{
                  transform: `translateY(${indicator.top}px)`,
                  height: indicator.height,
                }}
              />

              <ul ref={listRef} className="space-y-1 pl-6">
                {pillars.map((p) => {
                  const isActive = p.key === active;
                  return (
                    <li key={p.key}>
                      <button
                        type="button"
                        data-key={p.key}
                        onMouseEnter={() => setActive(p.key)}
                        onFocus={() => setActive(p.key)}
                        onClick={() => setActive(p.key)}
                        className={`group w-full text-left grid grid-cols-12 items-center gap-4 py-5 md:py-6 border-b border-cream/10 transition-all duration-500 ${
                          isActive
                            ? "text-cream"
                            : "text-cream/50 hover:text-cream/90"
                        }`}
                      >
                        <span
                          className={`col-span-2 font-display italic text-[18px] md:text-[20px] transition-all duration-500 ${
                            isActive
                              ? "text-sage-soft translate-x-1"
                              : "text-cream/35"
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
            </div>
          </Reveal>

          {/* Detail pane */}
          <div className="col-span-12 md:col-span-7">
            <div className="md:sticky md:top-24 rounded-md border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-8 md:p-12 min-h-[420px]">
              <div
                key={activePillar.key}
                className="animate-fade-in"
                style={{
                  animation: "fadeSlideIn 0.5s cubic-bezier(0.19,1,0.22,1) both",
                }}
              >
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-display italic text-sage-soft text-[20px] md:text-[24px]">
                    {activePillar.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-cream/45">
                    Pillar · {activePillar.label.toLowerCase()}
                  </span>
                </div>

                <h3 className="font-display text-cream text-[40px] md:text-[64px] leading-[0.95] tracking-tightest mb-6">
                  {activePillar.label}
                </h3>

                <p className="font-display italic text-cream/85 text-[22px] md:text-[26px] leading-[1.3] mb-8 max-w-[28ch]">
                  {activePillar.body}
                </p>

                <p className="text-[15px] md:text-[17px] leading-[1.7] text-cream/75 mb-10 max-w-[52ch]">
                  {activePillar.detail}
                </p>

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
      </div>
    </section>
  );
}
