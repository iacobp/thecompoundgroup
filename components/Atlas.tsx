"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

/**
 * The Compound Atlas — an illustrated map of the studio's universe.
 *
 * The background is a single hand-illustrated landscape (generated via
 * fal.ai gpt-image-2 with the brand palette and apothecary aesthetic).
 * Districts are programmatic SVG hotspots overlaid on the image, each
 * with hover state, ambient pulse, and click → side panel.
 *
 * This is Tier 1: image as art, programmatic interactivity. Future tiers
 * will layer separate building PNGs for parallax + add 3D camera moves.
 */

type DistrictStatus = "live" | "in-development" | "planned" | "resource" | "studio";

type District = {
  id: string;
  name: string;
  // Position on the image as percentages (0–100). Calibrated against the
  // generated atlas image — adjust if the source art changes.
  x: number;
  y: number;
  // Radius of the interactive hotspot in % of the smaller image dimension.
  radius: number;
  status: DistrictStatus;
  badge?: string;
  description: string;
  href?: string;
  hrefLabel?: string;
  // Mempalace-style content: what lives in this district.
  artifacts: string[];
};

// Coordinates calibrated against the generated atlas image (1088x608).
// If the image is regenerated and architecture shifts, recalibrate these.
const districts: District[] = [
  {
    id: "studio",
    name: "The Compound Group",
    x: 47,
    y: 42,
    radius: 7,
    status: "studio",
    badge: "Studio",
    description:
      "The observatory at the center. Owns the methodology, the datasets, and the editorial standards every other district inherits. Founded 2026, operated by Arsenal Productions SRL.",
    artifacts: [
      "Published scoring methodology",
      "Continuously-updated datasets",
      "Citation-anchored sources",
      "Editorial standards (non-negotiable)",
    ],
  },
  {
    id: "glp1",
    name: "GLP-1 Quarter",
    x: 16,
    y: 32,
    radius: 6,
    status: "live",
    badge: "Live",
    description:
      "The apothecary tower. Independent comparison of forty-eight GLP-1 telehealth programs, ranked on annual cost, clinical credentialing, and pricing transparency. Affiliate-disclosed on every page.",
    href: "https://glp1picks.com",
    hrefLabel: "Visit glp1picks.com",
    artifacts: ["48 telehealth programs", "Three-pillar scoring", "Live pricing data"],
  },
  {
    id: "titrate",
    name: "Titrate Atelier",
    x: 17,
    y: 68,
    radius: 5.5,
    status: "in-development",
    badge: "In development",
    // href + description below — corrected to titrate.health (landing live)
    description:
      "The precision laboratory. Peptide and GLP-1 multi-compound tracker with the reconstitution calculator the category has been missing. Stacking past the three-peptide ceiling.",
    href: "https://titrate.health",
    hrefLabel: "Join the waitlist",
    artifacts: ["Reconstitution calculator", "Multi-compound stacking", "Refill decision support"],
  },
  {
    id: "revolume",
    name: "Revolume Studio",
    x: 42,
    y: 78,
    radius: 5.5,
    status: "in-development",
    badge: "In development",
    description:
      "The conservatory chamber. Private on-device skin scan for GLP-1 users — sixteen markers specific to post-rapid-weight-loss facial change, routed to a personalized routine, prescription, or procedure.",
    href: "https://revolume.app",
    hrefLabel: "Visit revolume.app",
    artifacts: ["16 facial markers", "On-device privacy", "Procedure shortlist"],
  },
  {
    id: "methodology",
    name: "Methodology Library",
    x: 73,
    y: 32,
    radius: 6,
    status: "resource",
    badge: "Public resource",
    description:
      "The classical library. The scoring framework, source-weighting, and review process — published in full so every ranking can be audited against it.",
    href: "/#research",
    hrefLabel: "Read the methodology",
    artifacts: ["Open scoring weights", "Versioned methodology", "Reproducible rankings"],
  },
  {
    id: "editorial",
    name: "Editorial Hall",
    x: 84,
    y: 55,
    radius: 5.5,
    status: "resource",
    badge: "Public resource",
    description:
      "The court hall. Disclosure rules, ranking integrity rules, and the line between editorial recommendation and paid placement. Non-negotiable across the portfolio.",
    href: "/#approach",
    hrefLabel: "Editorial standards",
    artifacts: ["Affiliate disclosure", "Correction policy", "Recommendation vs placement"],
  },
  {
    id: "frontier",
    name: "The Frontier",
    x: 53,
    y: 11,
    radius: 7,
    status: "planned",
    badge: "Planned 2026–27",
    description:
      "The misty horizon. Five products under construction: Supplement Index, Pet Health, Peptide Index, Neuroscience Index, Neuroplasticity Lab. Each extends the same methodology to an adjacent category.",
    href: "/#portfolio",
    hrefLabel: "See the roadmap",
    artifacts: [
      "Supplement Index (2026)",
      "Pet Health (2026–27)",
      "Peptide Index (Q3 2026, post-FDA panel)",
      "Neuroscience Index (2027)",
      "Neuroplasticity Lab (2027)",
    ],
  },
];

const statusColor: Record<DistrictStatus, string> = {
  studio: "#1C1C1A",
  live: "#3B5D4F",
  "in-development": "#8B6F47",
  planned: "#6B6A66",
  resource: "#8B6F47",
};

export function Atlas() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selected = selectedId ? districts.find((d) => d.id === selectedId) : null;

  return (
    <section className="relative bg-cream min-h-[100vh]">
      {/* Back to home — sits above the kicker, top-left */}
      <Link
        href="/"
        aria-label="Back to The Compound Group"
        className="group absolute top-6 md:top-10 right-6 md:right-12 z-20 inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted hover:text-ink transition-colors bg-cream/85 backdrop-blur-sm border border-border rounded-full px-3.5 py-1.5"
      >
        <span
          aria-hidden
          className="transition-transform duration-500 ease-out group-hover:-translate-x-1"
        >
          ←
        </span>
        <span>Back to The Compound</span>
      </Link>

      {/* Top kicker */}
      <div className="absolute top-6 md:top-10 left-6 md:left-12 z-20 flex items-baseline gap-4">
        <span className="font-display italic text-bronze text-[24px] md:text-[30px]">
          ◉
        </span>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
          The Atlas · A walkable map of the studio
        </span>
      </div>

      {/* Map container */}
      <div className="relative w-full">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* Background illustrated map */}
          <Image
            src="/images/atlas/main.png"
            alt="The Compound Atlas — an illustrated map of the studio's universe"
            fill
            priority
            className="object-cover select-none pointer-events-none"
            sizes="100vw"
          />

          {/* Hotspot overlay */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Interactive districts of The Compound"
          >
            {/* Connection lines between districts (animated) */}
            <g pointerEvents="none">
              {districts
                .filter((d) => d.id !== "studio")
                .map((d) => (
                  <line
                    key={`path-${d.id}`}
                    x1={47}
                    y1={42}
                    x2={d.x}
                    y2={d.y}
                    stroke="#1C1C1A"
                    strokeOpacity={hoveredId === d.id || selectedId === d.id ? 0.6 : 0.28}
                    strokeWidth={hoveredId === d.id || selectedId === d.id ? 0.22 : 0.14}
                    strokeDasharray="0.8 0.6"
                    style={{ transition: "stroke-opacity 0.5s, stroke-width 0.5s" }}
                  />
                ))}
            </g>

            {/* Hotspots */}
            {districts.map((d) => {
              const isHovered = hoveredId === d.id;
              const isSelected = selectedId === d.id;
              const color = statusColor[d.status];
              return (
                <g
                  key={d.id}
                  onMouseEnter={() => setHoveredId(d.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(d.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(d.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${d.name}`}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  {/* Wide invisible hit area */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.radius * 1.4}
                    fill="transparent"
                  />

                  {/* Outer pulse ring (ambient — always animating) */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.18}
                    strokeOpacity={0.45}
                    className="atlas-pulse"
                  />

                  {/* Cream backdrop disc — gives the colored dot/ring a
                      consistent contrast surface so the marker reads against
                      sage vegetation, bronze stone, or ink-dark architecture
                      uniformly. Dropshadow simulated via a slightly larger
                      ink-tinted outer disc behind. */}
                  <circle
                    cx={d.x}
                    cy={d.y + 0.18}
                    r={d.radius * 0.78}
                    fill="#1C1C1A"
                    fillOpacity={0.18}
                  />
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.radius * 0.78}
                    fill="#FAF7F0"
                    fillOpacity={0.94}
                    stroke="#1C1C1A"
                    strokeWidth={0.08}
                    strokeOpacity={0.35}
                  />

                  {/* Inner ring with hover state */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.radius * 0.55}
                    fill="none"
                    stroke={color}
                    strokeWidth={isHovered || isSelected ? 0.32 : 0.22}
                    strokeOpacity={isHovered || isSelected ? 1 : 0.85}
                    style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
                  />

                  {/* Inner dot */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={isHovered || isSelected ? 0.85 : 0.7}
                    fill={color}
                    style={{ transition: "r 0.3s" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating labels (HTML positioned over SVG) */}
          {districts.map((d) => {
            const isHovered = hoveredId === d.id;
            const isSelected = selectedId === d.id;
            const visible = isHovered || isSelected;
            return (
              <div
                key={`label-${d.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${d.x}%`,
                  top: `calc(${d.y}% + ${d.radius * 0.95}%)`,
                  transform: "translate(-50%, 0)",
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0.85,
                    y: visible ? 4 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center justify-center font-display text-ink text-center whitespace-nowrap rounded-full bg-cream/95 border border-ink/15 px-2.5 py-0.5 shadow-[0_2px_8px_-2px_rgba(28,28,26,0.18)] backdrop-blur-sm"
                  style={{
                    fontSize: "clamp(10px, 1vw, 13px)",
                    lineHeight: 1.2,
                  }}
                >
                  {d.name}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 z-20 flex flex-wrap gap-x-6 gap-y-2 text-[11px] md:text-[12px] text-muted bg-cream/80 backdrop-blur-sm border border-border rounded-md px-4 py-2.5">
          <LegendDot color="#1C1C1A" label="Studio" />
          <LegendDot color="#3B5D4F" label="Live" />
          <LegendDot color="#8B6F47" label="In development" />
          <LegendDot color="#6B6A66" label="Planned" />
        </div>

        {/* Hint */}
        <div className="absolute bottom-6 md:bottom-10 right-6 md:right-12 z-20 text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-ink/75 bg-cream/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5">
          Hover to read · Click to enter
        </div>
      </div>

      {/* Side panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.aside
            key={selected.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-30 w-full sm:w-[420px] md:w-[480px] bg-ink text-cream overflow-y-auto shadow-[-20px_0_50px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="p-8 md:p-10">
              <button
                onClick={() => setSelectedId(null)}
                className="mb-8 text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:text-cream transition-colors"
                aria-label="Close panel"
              >
                ← Back to atlas
              </button>

              {selected.badge && (
                <div className="text-[10px] uppercase tracking-[0.24em] text-cream/55 mb-3">
                  {selected.badge}
                </div>
              )}

              <h2 className="font-display text-cream text-[32px] md:text-[42px] leading-[1.05] mb-6">
                {selected.name}
              </h2>

              <p className="text-[15px] md:text-[16px] leading-[1.65] text-cream/80 mb-8">
                {selected.description}
              </p>

              <div className="border-t border-cream/15 pt-6 mb-8">
                <div className="text-[10px] uppercase tracking-[0.24em] text-cream/55 mb-4">
                  In this district
                </div>
                <ul className="space-y-2.5">
                  {selected.artifacts.map((a) => (
                    <li
                      key={a}
                      className="text-[14px] leading-[1.5] text-cream/85 flex items-start gap-3"
                    >
                      <span className="font-display italic text-bronze flex-shrink-0 mt-0.5">
                        ◦
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selected.href && (
                <a
                  href={selected.href}
                  target={selected.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    selected.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="inline-flex items-center gap-2 font-display italic text-sage hover:text-cream text-[16px] md:text-[18px] transition-colors"
                >
                  {selected.hrefLabel ?? "Visit"} →
                </a>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
