"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

/**
 * Force-directed graph of the portfolio, Obsidian-style.
 *
 * Positioning is handled by a custom force simulation that updates a plain
 * SVG <g> transform each frame. Motion (formerly framer-motion) layers
 * spring-based scale/opacity animations on the individual shapes inside
 * each group — never on the group itself, because motion does not compose
 * with string-valued SVG transform attributes.
 *
 * Only publicly-shareable relationships are represented. Nothing financial.
 */

type NodeKind = "hub" | "live" | "dev" | "planned" | "resource";

type GraphNode = {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pinned?: boolean;
  visibleAt: number;
};

type GraphLink = {
  source: string;
  target: string;
  kind?: "feeds" | "structural";
};

const WIDTH = 1000;
const HEIGHT = 720;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

const initialNodes: GraphNode[] = [
  { id: "cg", label: "The Compound Group", kind: "hub", x: CX, y: CY, vx: 0, vy: 0, radius: 30, pinned: true, visibleAt: 0 },

  { id: "glp1picks", label: "GLP-1 Picks", sub: "Live", kind: "live", x: CX - 220, y: CY - 120, vx: 0, vy: 0, radius: 24, visibleAt: 280 },
  { id: "glp1tracker", label: "GLP-1 Tracker", sub: "In development", kind: "dev", x: CX - 200, y: CY + 120, vx: 0, vy: 0, radius: 21, visibleAt: 500 },

  { id: "supplements", label: "Supplement Index", sub: "Planned 2026", kind: "planned", x: CX + 220, y: CY - 190, vx: 0, vy: 0, radius: 19, visibleAt: 720 },
  { id: "pet", label: "Pet Health", sub: "Planned 2026–27", kind: "planned", x: CX + 290, y: CY - 40, vx: 0, vy: 0, radius: 19, visibleAt: 880 },
  { id: "peptides", label: "Peptide Index", sub: "Planned Q3 2026", kind: "planned", x: CX + 240, y: CY + 110, vx: 0, vy: 0, radius: 19, visibleAt: 1040 },
  { id: "neuro", label: "Neuroscience Index", sub: "Planned 2027", kind: "planned", x: CX + 180, y: CY + 230, vx: 0, vy: 0, radius: 19, visibleAt: 1200 },
  { id: "plasticity", label: "Neuroplasticity Lab", sub: "Planned 2027", kind: "planned", x: CX + 30, y: CY + 260, vx: 0, vy: 0, radius: 19, visibleAt: 1360 },

  { id: "methodology", label: "Published methodology", kind: "resource", x: CX - 130, y: CY - 260, vx: 0, vy: 0, radius: 13, visibleAt: 1520 },
  { id: "database", label: "Live datasets", kind: "resource", x: CX - 310, y: CY + 30, vx: 0, vy: 0, radius: 13, visibleAt: 1620 },
  { id: "review", label: "Peer-reviewed sources", kind: "resource", x: CX - 180, y: CY + 270, vx: 0, vy: 0, radius: 13, visibleAt: 1720 },
  { id: "editorial", label: "Editorial standards", kind: "resource", x: CX + 80, y: CY - 290, vx: 0, vy: 0, radius: 13, visibleAt: 1820 },
];

const links: GraphLink[] = [
  { source: "cg", target: "glp1picks", kind: "structural" },
  { source: "cg", target: "glp1tracker", kind: "structural" },
  { source: "cg", target: "supplements", kind: "structural" },
  { source: "cg", target: "pet", kind: "structural" },
  { source: "cg", target: "peptides", kind: "structural" },
  { source: "cg", target: "neuro", kind: "structural" },
  { source: "cg", target: "plasticity", kind: "structural" },

  { source: "glp1picks", target: "glp1tracker", kind: "feeds" },
  { source: "glp1picks", target: "supplements", kind: "feeds" },
  { source: "glp1picks", target: "peptides", kind: "feeds" },
  { source: "supplements", target: "pet", kind: "feeds" },
  { source: "supplements", target: "neuro", kind: "feeds" },
  { source: "neuro", target: "plasticity", kind: "feeds" },

  { source: "methodology", target: "glp1picks" },
  { source: "methodology", target: "glp1tracker" },
  { source: "methodology", target: "supplements" },
  { source: "methodology", target: "pet" },
  { source: "methodology", target: "peptides" },
  { source: "methodology", target: "neuro" },
  { source: "methodology", target: "plasticity" },

  { source: "database", target: "glp1picks" },
  { source: "database", target: "glp1tracker" },
  { source: "database", target: "supplements" },
  { source: "database", target: "peptides" },

  { source: "review", target: "peptides" },
  { source: "review", target: "neuro" },
  { source: "review", target: "plasticity" },
  { source: "review", target: "supplements" },

  { source: "editorial", target: "glp1picks" },
  { source: "editorial", target: "supplements" },
  { source: "editorial", target: "pet" },
  { source: "editorial", target: "neuro" },
];

function simulate(nodes: GraphNode[], now: number): number {
  const DAMPING = 0.88;
  const REPULSION = 1600;
  const SPRING_K = 0.018;
  const CENTER_K = 0.0015;
  const linkLengths: Record<string, number> = {
    structural: 180,
    feeds: 145,
  };

  const active = nodes.filter((n) => now >= n.visibleAt);

  for (let i = 0; i < active.length; i++) {
    for (let j = i + 1; j < active.length; j++) {
      const a = active[i];
      const b = active[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distSq = dx * dx + dy * dy + 0.01;
      const dist = Math.sqrt(distSq);
      const force = REPULSION / distSq;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      if (!a.pinned) {
        a.vx -= fx;
        a.vy -= fy;
      }
      if (!b.pinned) {
        b.vx += fx;
        b.vy += fy;
      }
    }
  }

  for (const link of links) {
    const a = nodes.find((n) => n.id === link.source);
    const b = nodes.find((n) => n.id === link.target);
    if (!a || !b) continue;
    if (now < a.visibleAt || now < b.visibleAt) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const ideal = linkLengths[link.kind || "structural"] ?? 160;
    const stretch = dist - ideal;
    const fx = (dx / dist) * stretch * SPRING_K;
    const fy = (dy / dist) * stretch * SPRING_K;
    if (!a.pinned) {
      a.vx += fx;
      a.vy += fy;
    }
    if (!b.pinned) {
      b.vx -= fx;
      b.vy -= fy;
    }
  }

  for (const n of active) {
    if (n.pinned) continue;
    n.vx += (CX - n.x) * CENTER_K;
    n.vy += (CY - n.y) * CENTER_K;
  }

  for (const n of active) {
    if (n.pinned) continue;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x += n.vx;
    n.y += n.vy;
    const margin = 50;
    if (n.x < margin) n.x = margin + (margin - n.x) * 0.5;
    if (n.x > WIDTH - margin) n.x = WIDTH - margin - (n.x - (WIDTH - margin)) * 0.5;
    if (n.y < margin) n.y = margin + (margin - n.y) * 0.5;
    if (n.y > HEIGHT - margin) n.y = HEIGHT - margin - (n.y - (HEIGHT - margin)) * 0.5;
  }

  let ke = 0;
  for (const n of active) {
    if (n.pinned) continue;
    ke += n.vx * n.vx + n.vy * n.vy;
  }
  return ke;
}

function nodeFill(kind: NodeKind): string {
  switch (kind) {
    case "hub": return "#1C1C1A";
    case "live": return "#3B5D4F";
    case "dev": return "#8B6F47";
    case "planned": return "#F4F1EB";
    case "resource": return "#EFEBE4";
  }
}

function nodeStroke(kind: NodeKind): string {
  if (kind === "planned") return "#6B6A66";
  if (kind === "resource") return "#8B6F47";
  return kind === "hub" ? "#F4F1EB" : "#1C1C1A";
}

function haloColor(kind: NodeKind): string {
  if (kind === "live") return "#3B5D4F";
  if (kind === "dev") return "#8B6F47";
  if (kind === "resource") return "#8B6F47";
  return "#1C1C1A";
}

const gentleSpring = { type: "spring" as const, stiffness: 170, damping: 22, mass: 0.9 };
const softSpring = { type: "spring" as const, stiffness: 130, damping: 20, mass: 1 };

export function PortfolioGraph() {
  const [, setTick] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<GraphNode[]>(initialNodes.map((n) => ({ ...n })));
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          startTimeRef.current = performance.now();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    let settled = false;
    let settledFrames = 0;

    const tick = () => {
      const now = performance.now() - startTimeRef.current;
      const ke = simulate(nodesRef.current, now);
      setTick((t) => t + 1);

      if (ke < 0.02 && now > 3000) {
        settledFrames++;
      } else {
        settledFrames = 0;
      }
      if (settledFrames > 60 && !settled) settled = true;

      if (!settled || hovered) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, hovered]);

  const connectedIds = new Set<string>();
  if (hovered) {
    connectedIds.add(hovered);
    for (const l of links) {
      if (l.source === hovered) connectedIds.add(l.target);
      if (l.target === hovered) connectedIds.add(l.source);
    }
  }

  const hoveredNode = hovered
    ? nodesRef.current.find((n) => n.id === hovered)
    : null;
  const now = started ? performance.now() - startTimeRef.current : 0;

  return (
    <section
      ref={containerRef}
      id="map"
      className="relative py-24 md:py-40 border-t border-border bg-sand/40 overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-5 mb-10 md:mb-14">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              ◉
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              The map · How the properties connect
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-14 md:mb-20">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display text-ink text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-tightest">
              A portfolio is a graph, not a list.{" "}
              <em className="italic text-sage">This is where the edges are.</em>
            </h2>
          </Reveal>
          <Reveal delay={160} className="col-span-12 md:col-span-5 md:pt-4">
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink/75 max-w-[48ch]">
              Each circle is a product or a public asset the studio maintains.
              The edges describe audience overlap, shared methodology, or
              infrastructure that recurs across categories. The configuration
              is simple today and will get denser as new properties come
              online.
            </p>
          </Reveal>
        </div>

        <div className="relative rounded-md border border-border bg-cream overflow-hidden">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-auto block"
            role="img"
            aria-label="Force-directed graph of The Compound Group portfolio"
          >
            <defs>
              <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#1C1C1A" opacity="0.08" />
              </pattern>
              <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width={WIDTH} height={HEIGHT} fill="url(#dot-grid)" />

            {/* Edges */}
            {links.map((link, i) => {
              const source = nodesRef.current.find((n) => n.id === link.source);
              const target = nodesRef.current.find((n) => n.id === link.target);
              if (!source || !target) return null;
              if (started && (now < source.visibleAt || now < target.visibleAt))
                return null;

              const isActive = hovered && (link.source === hovered || link.target === hovered);
              const isDimmed = hovered && !isActive;
              const isFeed = link.kind === "feeds";

              const strokeColor = isActive
                ? isFeed ? "#8B6F47" : "#3B5D4F"
                : "#1C1C1A";
              const opacity = isActive ? 0.8 : isDimmed ? 0.04 : 0.16;

              return (
                <line
                  key={`link-${i}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={strokeColor}
                  strokeOpacity={opacity}
                  strokeWidth={isFeed ? 1.4 : 0.9}
                  strokeDasharray={isFeed ? "0" : "3 2"}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-opacity 0.45s cubic-bezier(0.19,1,0.22,1), stroke 0.45s ease-out",
                  }}
                />
              );
            })}

            {/* Flow dots along hovered edges */}
            {hovered && links
              .filter((l) => l.source === hovered || l.target === hovered)
              .map((link, i) => {
                const source = nodesRef.current.find((n) => n.id === link.source);
                const target = nodesRef.current.find((n) => n.id === link.target);
                if (!source || !target) return null;
                const from = link.source === hovered ? source : target;
                const to = link.source === hovered ? target : source;
                return (
                  <motion.circle
                    key={`flow-${i}-${hovered}`}
                    r={2.4}
                    fill={link.kind === "feeds" ? "#8B6F47" : "#3B5D4F"}
                    initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                    animate={{
                      cx: [from.x, to.x],
                      cy: [from.y, to.y],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.9,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                );
              })}

            {/* Nodes */}
            {nodesRef.current.map((node) => {
              const entered = !started || now >= node.visibleAt;
              if (!entered) return null;
              const isHovered = hovered === node.id;
              const isConnected = connectedIds.has(node.id);
              const isDimmed = hovered && !isConnected;
              const showLabel = node.kind !== "resource" || isHovered || !hovered;
              const halo = haloColor(node.kind);

              return (
                <g
                  key={node.id}
                  className="graph-node"
                  transform={`translate(${node.x} ${node.y})`}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  {/* Hit area */}
                  <circle
                    r={node.radius + 16}
                    fill="transparent"
                  />

                  {/* Breathing halo (only while hovered) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.circle
                        key="breathe"
                        r={node.radius}
                        fill="none"
                        stroke={halo}
                        strokeWidth={1.5}
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                          scale: [1, 1.9, 2.5],
                          opacity: [0.55, 0.22, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 2.3,
                          ease: "easeOut",
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Static soft halo (only while hovered) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.circle
                        key="static-halo"
                        r={node.radius + 6}
                        fill="none"
                        stroke={halo}
                        strokeWidth={1}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.32 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={gentleSpring}
                      />
                    )}
                  </AnimatePresence>

                  {/* Main circle — motion on scale only, fill/stroke stable */}
                  <motion.circle
                    r={node.radius}
                    fill={nodeFill(node.kind)}
                    stroke={nodeStroke(node.kind)}
                    strokeWidth={node.kind === "planned" ? 1.5 : 1}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: isHovered ? 1.12 : 1,
                      opacity: isDimmed ? 0.4 : 1,
                    }}
                    transition={gentleSpring}
                    filter={isHovered ? "url(#node-glow)" : undefined}
                    style={{ transformOrigin: "center" }}
                  />

                  {/* Label */}
                  {showLabel && (
                    <motion.text
                      y={node.radius + 20}
                      textAnchor="middle"
                      fontFamily="var(--font-display), Georgia, serif"
                      fontSize={node.kind === "hub" ? 18 : node.kind === "resource" ? 12 : 15}
                      fontStyle={node.kind === "resource" ? "italic" : "normal"}
                      fill={node.kind === "resource" ? "#6B6A66" : "#1C1C1A"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isDimmed ? 0.45 : 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {node.label}
                    </motion.text>
                  )}
                  {node.sub && showLabel && node.kind !== "hub" && (
                    <motion.text
                      y={node.radius + 36}
                      textAnchor="middle"
                      fontFamily="var(--font-body), system-ui"
                      fontSize={10}
                      letterSpacing="0.18em"
                      fill="#6B6A66"
                      textRendering="geometricPrecision"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isDimmed ? 0.45 : 0.9 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {node.sub.toUpperCase()}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover readout panel */}
          <AnimatePresence mode="wait">
            {hoveredNode ? (
              <motion.div
                key={hoveredNode.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={softSpring}
                className="absolute top-4 left-4 md:top-6 md:left-6 max-w-[280px] bg-ink text-cream rounded-md px-4 py-3 shadow-xl"
              >
                <div className="text-[10px] uppercase tracking-[0.24em] text-cream/60 mb-1">
                  {hoveredNode.kind === "hub"
                    ? "Parent"
                    : hoveredNode.kind === "live"
                    ? "Live product"
                    : hoveredNode.kind === "dev"
                    ? "In development"
                    : hoveredNode.kind === "planned"
                    ? "Planned"
                    : "Public resource"}
                </div>
                <div className="font-display text-cream text-[20px] leading-tight mb-0.5">
                  {hoveredNode.label}
                </div>
                {hoveredNode.sub && (
                  <div className="text-[12px] text-cream/70">
                    {hoveredNode.sub}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 left-4 md:top-6 md:left-6 text-[11px] uppercase tracking-[0.24em] text-muted/80"
              >
                Hover any node
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-[12px] md:text-[13px] text-muted">
          <LegendDot color="#1C1C1A" label="Parent" />
          <LegendDot color="#3B5D4F" label="Live product" />
          <LegendDot color="#8B6F47" label="In development" />
          <LegendDot color="#F4F1EB" label="Planned" outline />
          <LegendDot color="#EFEBE4" label="Public resource" outline />
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-[2px] w-6" style={{ background: "#8B6F47" }} />
            Audience feed
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-[2px] w-6"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#1C1C1A 0 3px,transparent 3px 5px)",
              }}
            />
            Shared resource
          </span>
        </div>

        <Reveal>
          <p className="mt-14 md:mt-20 max-w-[60ch] text-[15px] md:text-[16px] leading-[1.75] text-ink/70">
            Two properties are live or shipping. Five more are scheduled to
            come online across 2026 and 2027. As they do, the graph densifies
            — a shared methodology, shared datasets, and an audience that
            overlaps more than any one product suggests on its own. The
            compounding, when it works, is in the edges rather than in the
            nodes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function LegendDot({
  color,
  label,
  outline,
}: {
  color: string;
  label: string;
  outline?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{
          background: color,
          border: outline ? `1px solid #6B6A66` : "none",
        }}
      />
      {label}
    </span>
  );
}
