"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCollide,
  forceX,
  forceY,
  type Simulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import { Reveal } from "./Reveal";

/**
 * Force-directed portfolio graph, powered by d3-force (the same engine
 * Obsidian uses). The "Obsidian feel" comes from d3's alpha-decay model:
 * the simulation runs with high energy on entrance and during drag, then
 * decays to zero so the graph naturally settles. On drop the released
 * node stays where you put it because d3 only applies forces while alpha
 * is non-trivial.
 *
 * Visual depth: each node is filled with a radial gradient (highlight +
 * shadow side), the canvas has a vignette gradient overlay, and every
 * circle drops a soft shadow via SVG filter. The hub gets a slow pulse.
 */

type NodeKind = "hub" | "live" | "dev" | "planned" | "resource";

type GraphNode = SimulationNodeDatum & {
  id: string;
  label: string;
  sub?: string;
  description?: string;
  href?: string;
  kind: NodeKind;
  radius: number;
  // Designed home position — populated at runtime from the data file's x/y.
  // d3-force uses forceX/forceY to pull each node back toward its home,
  // strong for resources, very weak for products (so dragged products stay).
  homeX?: number;
  homeY?: number;
};

type GraphLink = SimulationLinkDatum<GraphNode> & {
  kind?: "feeds" | "structural";
};

const WIDTH = 1000;
const HEIGHT = 720;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

const initialNodes: GraphNode[] = [
  {
    id: "cg",
    label: "The Compound Group",
    kind: "hub",
    href: "#portfolio",
    description:
      "Research-led consumer biotech media studio. Owns the methodology, the datasets, and the editorial standards every property below inherits.",
    x: CX,
    y: CY,
    radius: 30,
  },

  {
    id: "glp1picks",
    label: "GLP-1 Picks",
    sub: "Live",
    kind: "live",
    href: "https://glp1picks.com",
    description:
      "Independent comparison of 40 GLP-1 telehealth programs. Ranked by annual cost, clinical credentialing, and pricing transparency — with affiliate disclosures on every page.",
    x: CX - 220,
    y: CY - 120,
    radius: 24,
  },
  {
    id: "titrate",
    label: "Titrate",
    sub: "In development",
    kind: "dev",
    href: "/tracker",
    description:
      "Peptide and GLP-1 multi-compound tracker. Reconstitution calculator with a unit toggle the category has been missing. Stacking past the three-peptide ceiling.",
    x: CX - 230,
    y: CY + 140,
    radius: 21,
  },
  {
    id: "revolume",
    label: "Revolume",
    sub: "In development",
    kind: "dev",
    href: "https://revolume.app",
    description:
      "Private, on-device skin scan built for GLP-1 users. Sixteen clinically-derived markers, a personalized routine, a procedure shortlist — what to do about facial volume loss, in plain language.",
    x: CX - 80,
    y: CY + 230,
    radius: 21,
  },

  {
    id: "supplements",
    label: "Supplement Index",
    sub: "Planned 2026",
    kind: "planned",
    href: "#portfolio",
    description:
      "Reviews site for the supplements GLP-1 users actually reach for — protein, fiber, electrolytes, basic micronutrients, plus nootropics. Sourced from peer-reviewed evidence where it exists.",
    x: CX + 220,
    y: CY - 190,
    radius: 19,
  },
  {
    id: "glp1pets",
    label: "GLP-1 Pets",
    sub: "Live",
    kind: "live",
    href: "https://glp1pets.com",
    description:
      "Independent tracker for veterinary GLP-1 weight loss drugs. Okava's MEOW-1 cat trial (summer 2026 readout), Akston AKS-562c at Cornell, and the road to canine GLP-1. Same methodology, applied to the pet chemistry class.",
    x: CX + 290,
    y: CY - 40,
    radius: 22,
  },
  {
    id: "peptides",
    label: "Peptide Index",
    sub: "Planned Q3 2026",
    kind: "planned",
    href: "#portfolio",
    description:
      "Research-backed index for BPC-157, TB-500, ipamorelin, and adjacent compounds. Publishing after the July 2026 FDA advisory panel clarifies what the regulation permits.",
    x: CX + 240,
    y: CY + 110,
    radius: 19,
  },
  {
    id: "neuro",
    label: "Neuroscience Index",
    sub: "Planned 2027",
    kind: "planned",
    href: "#portfolio",
    description:
      "Nootropics, neuroprotective compounds, cognitive-aging formulas — reviewed with the same rigor we apply to GLP-1. What has clinical trials, and what is still hopeful biochemistry.",
    x: CX + 180,
    y: CY + 230,
    radius: 19,
  },
  {
    id: "plasticity",
    label: "Neuroplasticity Lab",
    sub: "Planned 2027",
    kind: "planned",
    href: "#portfolio",
    description:
      "The behavioral counterpart to the Neuroscience Index. Cognitive apps, neurofeedback hardware, meditation platforms, small protocols with measurable effects.",
    x: CX + 30,
    y: CY + 260,
    radius: 19,
  },

  {
    id: "methodology",
    label: "Published methodology",
    kind: "resource",
    href: "#research",
    description:
      "The scoring framework, source-weighting, and review process — published in full so every ranking can be audited against it.",
    x: CX - 130,
    y: CY - 260,
    radius: 13,
  },
  {
    id: "database",
    label: "Live datasets",
    kind: "resource",
    href: "#research",
    description:
      "Continuously updated pricing, formulary, and clinical-credential data. Every property pulls from the same source of record.",
    x: CX - 310,
    y: CY + 30,
    radius: 13,
  },
  {
    id: "review",
    label: "Peer-reviewed sources",
    kind: "resource",
    href: "#research",
    description:
      "Citation-anchored source library. Every claim in every property can be traced to the underlying study.",
    x: CX - 180,
    y: CY + 270,
    radius: 13,
  },
  {
    id: "editorial",
    label: "Editorial standards",
    kind: "resource",
    href: "#approach",
    description:
      "Disclosure rules, ranking integrity rules, and the line between editorial recommendation and paid placement. Non-negotiable across the portfolio.",
    x: CX + 80,
    y: CY - 290,
    radius: 13,
  },
];

const links: GraphLink[] = [
  { source: "cg", target: "glp1picks", kind: "structural" },
  { source: "cg", target: "glp1pets", kind: "structural" },
  { source: "cg", target: "titrate", kind: "structural" },
  { source: "cg", target: "revolume", kind: "structural" },
  { source: "cg", target: "supplements", kind: "structural" },
  { source: "cg", target: "peptides", kind: "structural" },
  { source: "cg", target: "neuro", kind: "structural" },
  { source: "cg", target: "plasticity", kind: "structural" },

  { source: "glp1picks", target: "glp1pets", kind: "feeds" },
  { source: "glp1picks", target: "titrate", kind: "feeds" },
  { source: "glp1picks", target: "revolume", kind: "feeds" },
  { source: "glp1picks", target: "supplements", kind: "feeds" },
  { source: "glp1picks", target: "peptides", kind: "feeds" },
  { source: "supplements", target: "neuro", kind: "feeds" },
  { source: "neuro", target: "plasticity", kind: "feeds" },

  { source: "methodology", target: "glp1picks" },
  { source: "methodology", target: "glp1pets" },
  { source: "methodology", target: "titrate" },
  { source: "methodology", target: "revolume" },
  { source: "methodology", target: "supplements" },
  { source: "methodology", target: "peptides" },
  { source: "methodology", target: "neuro" },
  { source: "methodology", target: "plasticity" },

  { source: "database", target: "glp1picks" },
  { source: "database", target: "glp1pets" },
  { source: "database", target: "titrate" },
  { source: "database", target: "supplements" },
  { source: "database", target: "peptides" },

  { source: "review", target: "glp1pets" },
  { source: "review", target: "peptides" },
  { source: "review", target: "neuro" },
  { source: "review", target: "plasticity" },
  { source: "review", target: "supplements" },

  { source: "editorial", target: "glp1picks" },
  { source: "editorial", target: "glp1pets" },
  { source: "editorial", target: "revolume" },
  { source: "editorial", target: "supplements" },
  { source: "editorial", target: "neuro" },
];

// Physics is d3-force. Tuned for drop-and-stay: products feel NO home pull
// (forceX/forceY strength 0), so the only thing pulling them after a drop
// is the link spring — which is intentionally weak. Resources are anchored
// firmly at corners. Hub is fx-pinned.
const LINK_DIST_STRUCTURAL = 200;
const LINK_DIST_FEEDS = 165;
const LINK_STRENGTH = 0.12; // soft springs — won't yank dragged products back
const CHARGE_STRENGTH = -260;
const COLLIDE_PADDING = 14;
const HOME_STRENGTH_PRODUCT = 0; // no home pull → drop and it stays
const HOME_STRENGTH_RESOURCE = 0.18;

function nodeFill(kind: NodeKind): string {
  // Each kind has a radial gradient defined in <defs> giving it a 3D feel.
  return `url(#ball-${kind})`;
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

// Spring presets — low stiffness, high damping, more mass.
const gentleSpring = { type: "spring" as const, stiffness: 90, damping: 26, mass: 1.1 };
const softSpring = { type: "spring" as const, stiffness: 70, damping: 24, mass: 1.2 };

// Easing curves.
//   cinematicEase — long-tail ease-out-expo, used for the single overall
//     graph fade-in once the section enters view.
//   slowEase — softer ease-out-quart, used for label hover-dim transitions.
const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const slowEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// d3-force replaces link source/target string IDs with node references after
// the simulation initializes. These helpers normalize both forms back to a
// string ID so render code doesn't have to care which state it's in.
function linkSourceId(l: GraphLink): string {
  return typeof l.source === "object" ? (l.source as GraphNode).id : String(l.source);
}
function linkTargetId(l: GraphLink): string {
  return typeof l.target === "object" ? (l.target as GraphNode).id : String(l.target);
}

// Navigate to a node's href. Internal anchors smooth-scroll, external opens a tab.
function navigate(href: string) {
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  if (href.startsWith("#")) {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }
  window.location.href = href;
}

export function PortfolioGraph() {
  const [, setTick] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  // d3-force needs the same node + link arrays from setup through teardown,
  // so we deep-clone the data once and stamp homeX/homeY from the designed
  // x/y. d3-force will populate runtime x/y/vx/vy on these objects in place.
  const nodesRef = useRef<GraphNode[]>(
    initialNodes.map((n) => ({ ...n, homeX: n.x, homeY: n.y }))
  );
  const linksRef = useRef<GraphLink[]>(
    links.map((l) => ({ ...l }))
  );
  const simRef = useRef<Simulation<GraphNode, GraphLink> | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // Click-vs-drag detection. Track pointerdown coords; if pointer barely moved
  // before pointerup, treat it as a click and navigate.
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const draggedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // d3-force simulation. This is the entire physics layer. Configured once
  // when the section enters view, kept alive for drag interactions, torn
  // down on unmount.
  useEffect(() => {
    if (!started) return;

    const nodes = nodesRef.current;
    const linkData = linksRef.current;

    // Pin the hub. d3-force respects fx/fy as fixed coordinates.
    const hub = nodes.find((n) => n.id === "cg");
    if (hub) {
      hub.fx = hub.homeX;
      hub.fy = hub.homeY;
    }

    // Light initial perturbation so the simulation has visible drift instead
    // of starting at equilibrium and not moving.
    for (const n of nodes) {
      if (n.id === "cg" || n.kind === "resource") continue;
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 30;
      n.x = (n.homeX ?? 0) + Math.cos(angle) * dist;
      n.y = (n.homeY ?? 0) + Math.sin(angle) * dist;
      n.vx = 0;
      n.vy = 0;
    }

    const sim = forceSimulation<GraphNode, GraphLink>(nodes)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(linkData)
          .id((d) => d.id)
          .distance((l) =>
            l.kind === "feeds" ? LINK_DIST_FEEDS : LINK_DIST_STRUCTURAL
          )
          .strength(LINK_STRENGTH)
      )
      .force("charge", forceManyBody<GraphNode>().strength(CHARGE_STRENGTH))
      .force(
        "collide",
        forceCollide<GraphNode>()
          .radius((d) => d.radius + COLLIDE_PADDING)
          .iterations(2)
      )
      .force(
        "x",
        forceX<GraphNode>((d) => d.homeX ?? CX).strength((d) =>
          d.kind === "resource" ? HOME_STRENGTH_RESOURCE : HOME_STRENGTH_PRODUCT
        )
      )
      .force(
        "y",
        forceY<GraphNode>((d) => d.homeY ?? CY).strength((d) =>
          d.kind === "resource" ? HOME_STRENGTH_RESOURCE : HOME_STRENGTH_PRODUCT
        )
      )
      .alpha(1)
      .alphaDecay(0.028)
      .velocityDecay(0.6)
      .on("tick", () => {
        // Soft bounds — pull nodes back inside the canvas if a force flings
        // them out. Pinned/dragged nodes (with fx/fy) skip naturally because
        // d3 doesn't update their positions.
        const margin = 60;
        for (const n of nodes) {
          if (n.fx != null || n.fy != null) continue;
          if ((n.x ?? 0) < margin) n.x = margin;
          if ((n.x ?? 0) > WIDTH - margin) n.x = WIDTH - margin;
          if ((n.y ?? 0) < margin) n.y = margin;
          if ((n.y ?? 0) > HEIGHT - margin) n.y = HEIGHT - margin;
        }
        setTick((t) => t + 1);
      });

    simRef.current = sim;
    return () => {
      sim.stop();
      simRef.current = null;
    };
  }, [started]);

  // Translate a client (mouse/touch) point to SVG viewBox coordinates.
  const toSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * WIDTH;
    const y = ((clientY - rect.top) / rect.height) * HEIGHT;
    return { x, y };
  };

  // d3-force drag pattern. On start, bump alphaTarget so the simulation
  // stays warm while dragging. Pin the node via fx/fy so d3 leaves its
  // position alone. On end, clear fx/fy and let alpha decay back to 0 —
  // this is what gives the floaty Obsidian feel: forces only apply while
  // alpha is non-trivial, so a dropped node doesn't snap-spring anywhere.
  const handlePointerDown = (nodeId: string) =>
    (e: React.PointerEvent<SVGGElement>) => {
      const node = nodesRef.current.find((n) => n.id === nodeId);
      if (!node) return;

      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      draggedRef.current = false;

      // Hub stays pinned permanently; click-to-navigate only.
      if (node.id !== "cg") {
        const p = toSvgPoint(e.clientX, e.clientY);
        dragOffsetRef.current = { x: p.x - (node.x ?? 0), y: p.y - (node.y ?? 0) };
        simRef.current?.alphaTarget(0.3).restart();
        node.fx = node.x ?? node.homeX;
        node.fy = node.y ?? node.homeY;
        setDragging(nodeId);
      }

      try {
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
      } catch {}
      e.preventDefault();
    };

  const handlePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    // Detect "real" drag — pointer movement of more than 5px from origin.
    const start = pointerStartRef.current;
    if (start) {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (dx * dx + dy * dy > 25) draggedRef.current = true;
    }

    if (!dragging) return;
    const node = nodesRef.current.find((n) => n.id === dragging);
    if (!node) return;
    const p = toSvgPoint(e.clientX, e.clientY);
    node.fx = p.x - dragOffsetRef.current.x;
    node.fy = p.y - dragOffsetRef.current.y;
  };

  const handlePointerUp = (nodeId: string) =>
    (e: React.PointerEvent<SVGGElement>) => {
      const node = nodesRef.current.find((n) => n.id === nodeId);
      const wasClick = !draggedRef.current;

      if (dragging && node && node.id !== "cg") {
        // Release the pin AND zero the velocity so any momentum that
        // accumulated during drag (from forces acting on the node while
        // fx/fy were held) doesn't make it drift on release. Then let
        // alpha decay — with no home pull and weak links, the node sits
        // exactly where dropped.
        node.fx = null;
        node.fy = null;
        node.vx = 0;
        node.vy = 0;
        simRef.current?.alphaTarget(0);
        setDragging(null);
      }

      try {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      } catch {}

      pointerStartRef.current = null;
      draggedRef.current = false;

      if (wasClick && node?.href) {
        navigate(node.href);
      }
    };

  const connectedIds = new Set<string>();
  if (hovered) {
    connectedIds.add(hovered);
    for (const l of links) {
      const s = linkSourceId(l);
      const t = linkTargetId(l);
      if (s === hovered) connectedIds.add(t);
      if (t === hovered) connectedIds.add(s);
    }
  }

  const hoveredNode = hovered
    ? nodesRef.current.find((n) => n.id === hovered)
    : null;

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
              A portfolio is a graph.{" "}
              <em className="italic text-sage">This is where the edges are.</em>
            </h2>
          </Reveal>
          <Reveal delay={160} className="col-span-12 md:col-span-5 md:pt-4">
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink/75 max-w-[48ch]">
              Each circle is a product or a public asset the studio maintains.
              The edges describe audience overlap, shared methodology, or
              infrastructure that recurs across categories. Hover a node to
              trace its relationships — or grab one and rearrange the map
              yourself.
            </p>
          </Reveal>
        </div>

        <div className="relative rounded-md border border-border bg-cream overflow-hidden">
          {/* Mobile scroll hint */}
          <div
            aria-hidden
            className="md:hidden absolute top-3 right-3 z-[2] text-[10px] uppercase tracking-[0.22em] text-muted/80 bg-cream/80 backdrop-blur-sm border border-border rounded-full px-2.5 py-1 inline-flex items-center gap-1.5 pointer-events-none"
          >
            <span>Scroll</span>
            <span>→</span>
          </div>
          <div className="w-full overflow-x-auto md:overflow-visible [scrollbar-width:thin]">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-auto block select-none w-[720px] md:w-full md:touch-none"
            style={{ touchAction: "pan-x pan-y" }}
            role="img"
            aria-label="Force-directed graph of The Compound Group portfolio"
          >
            <defs>
              <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#1C1C1A" opacity="0.07" />
              </pattern>

              {/* Vignette — soft fade at edges of the canvas to give depth. */}
              <radialGradient id="canvas-vignette" cx="0.5" cy="0.5" r="0.7">
                <stop offset="0" stopColor="#FAF7F0" stopOpacity="0" />
                <stop offset="0.55" stopColor="#FAF7F0" stopOpacity="0" />
                <stop offset="1" stopColor="#C9BE9F" stopOpacity="0.32" />
              </radialGradient>

              {/* Per-kind ball gradients — each circle gets a soft top-left
                  highlight + base color shading, giving a 3D sphere feel. */}
              <radialGradient id="ball-hub" cx="0.32" cy="0.28" r="0.92">
                <stop offset="0" stopColor="#3a3a37" />
                <stop offset="0.55" stopColor="#1C1C1A" />
                <stop offset="1" stopColor="#0a0a09" />
              </radialGradient>
              <radialGradient id="ball-live" cx="0.32" cy="0.28" r="0.92">
                <stop offset="0" stopColor="#5e8775" />
                <stop offset="0.55" stopColor="#3B5D4F" />
                <stop offset="1" stopColor="#283f36" />
              </radialGradient>
              <radialGradient id="ball-dev" cx="0.32" cy="0.28" r="0.92">
                <stop offset="0" stopColor="#a78659" />
                <stop offset="0.55" stopColor="#8B6F47" />
                <stop offset="1" stopColor="#624f33" />
              </radialGradient>
              <radialGradient id="ball-planned" cx="0.5" cy="0.45" r="0.78">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.7" stopColor="#F4F1EB" />
                <stop offset="1" stopColor="#E0DAC8" />
              </radialGradient>
              <radialGradient id="ball-resource" cx="0.5" cy="0.45" r="0.78">
                <stop offset="0" stopColor="#FBF8F0" />
                <stop offset="0.7" stopColor="#EFEBE4" />
                <stop offset="1" stopColor="#D7CFB7" />
              </radialGradient>

              {/* Drop shadow under every node — gives the layout depth so
                  circles read as floating above the canvas, not flat decals. */}
              <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
                <feOffset dy="3" result="offsetBlur" />
                <feFlood floodColor="#1C1C1A" floodOpacity="0.22" />
                <feComposite in2="offsetBlur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Hover glow — richer multi-pass blur for a luminous halo. */}
              <filter id="node-glow" x="-75%" y="-75%" width="250%" height="250%">
                <feGaussianBlur stdDeviation="2" result="blur1" />
                <feGaussianBlur stdDeviation="6" in="SourceGraphic" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width={WIDTH} height={HEIGHT} fill="url(#dot-grid)" />
            <rect width={WIDTH} height={HEIGHT} fill="url(#canvas-vignette)" pointerEvents="none" />

            {/* Single fade-in for the entire graph. The "entrance" of each
                individual node is handled by the force simulation drifting
                perturbed positions back into equilibrium — no per-element
                choreography fighting the physics. */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ duration: 1.4, ease: cinematicEase }}
            >
            {/* Edges */}
            {started && links.map((link, i) => {
              const sId = linkSourceId(link);
              const tId = linkTargetId(link);
              const source = nodesRef.current.find((n) => n.id === sId);
              const target = nodesRef.current.find((n) => n.id === tId);
              if (!source || !target) return null;

              const isActive = hovered && (sId === hovered || tId === hovered);
              const isDimmed = hovered && !isActive;
              const isFeed = link.kind === "feeds";

              const strokeColor = isActive
                ? isFeed ? "#8B6F47" : "#3B5D4F"
                : "#1C1C1A";
              const opacity = isActive ? 0.7 : isDimmed ? 0.06 : 0.14;

              return (
                <line
                  key={`link-${i}`}
                  x1={source.x ?? 0}
                  y1={source.y ?? 0}
                  x2={target.x ?? 0}
                  y2={target.y ?? 0}
                  stroke={strokeColor}
                  strokeOpacity={opacity}
                  strokeWidth={isFeed ? 1.3 : 0.85}
                  strokeDasharray={isFeed ? "0" : "3 2"}
                  strokeLinecap="round"
                  style={{
                    transition:
                      "stroke-opacity 0.7s cubic-bezier(0.19,1,0.22,1), stroke 0.7s ease-out",
                  }}
                />
              );
            })}

            {/* Flow dots along hovered edges */}
            {hovered && !dragging && links
              .filter((l) => linkSourceId(l) === hovered || linkTargetId(l) === hovered)
              .map((link, i) => {
                const sId = linkSourceId(link);
                const tId = linkTargetId(link);
                const source = nodesRef.current.find((n) => n.id === sId);
                const target = nodesRef.current.find((n) => n.id === tId);
                if (!source || !target) return null;
                const from = sId === hovered ? source : target;
                const to = sId === hovered ? target : source;
                const fx = from.x ?? 0;
                const fy = from.y ?? 0;
                const tx = to.x ?? 0;
                const ty = to.y ?? 0;
                return (
                  <motion.circle
                    key={`flow-${i}-${hovered}`}
                    r={2.2}
                    fill={link.kind === "feeds" ? "#8B6F47" : "#3B5D4F"}
                    opacity={0.85}
                    initial={{ cx: fx, cy: fy, opacity: 0 }}
                    animate={{
                      cx: [fx, tx],
                      cy: [fy, ty],
                      opacity: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.12,
                    }}
                  />
                );
              })}

            {/* Nodes — clean groups, no entrance shells. The simulation drifts
                them into place; the parent <motion.g> handles overall fade-in. */}
            {started && nodesRef.current.map((node) => {
              const isHovered = hovered === node.id;
              const isDragging = dragging === node.id;
              const isConnected = connectedIds.has(node.id);
              const isDimmed = hovered && !isConnected;
              const showLabel = node.kind !== "resource" || isHovered || !hovered;
              const halo = haloColor(node.kind);
              const canDrag = node.id !== "cg";
              const cursor = isDragging
                ? "grabbing"
                : node.href
                ? "pointer"
                : canDrag
                ? "grab"
                : "default";
              const nx = node.x ?? node.homeX ?? 0;
              const ny = node.y ?? node.homeY ?? 0;

              return (
                <g
                  key={node.id}
                  className="graph-node"
                  transform={`translate(${nx} ${ny})`}
                  onPointerDown={handlePointerDown(node.id)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp(node.id)}
                  onPointerCancel={handlePointerUp(node.id)}
                  onMouseEnter={() => !dragging && setHovered(node.id)}
                  onMouseLeave={() => !dragging && setHovered(null)}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && node.href) {
                      e.preventDefault();
                      navigate(node.href);
                    }
                  }}
                  tabIndex={0}
                  role={node.href ? "link" : undefined}
                  aria-label={node.href ? `${node.label} — open` : node.label}
                  style={{ cursor, outline: "none" }}
                >
                  {/* Hit area */}
                  <circle r={node.radius + 18} fill="transparent" />

                  {/* Ambient breathing halo when hovered */}
                  <AnimatePresence>
                    {isHovered && !isDragging && (
                      <motion.circle
                        key="breathe"
                        r={node.radius}
                        fill="none"
                        stroke={halo}
                        strokeWidth={1.2}
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                          scale: [1, 1.45, 1.9],
                          opacity: [0.32, 0.14, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 3.6,
                          ease: "easeOut",
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Static soft halo */}
                  <AnimatePresence>
                    {(isHovered || isDragging) && (
                      <motion.circle
                        key="static-halo"
                        r={node.radius + 7}
                        fill="none"
                        stroke={halo}
                        strokeWidth={0.9}
                        initial={{ scale: 0.75, opacity: 0 }}
                        animate={{
                          scale: isDragging ? 1.08 : 1,
                          opacity: isDragging ? 0.35 : 0.22,
                        }}
                        exit={{ scale: 0.75, opacity: 0 }}
                        transition={gentleSpring}
                      />
                    )}
                  </AnimatePresence>

                  {/* Main node — radial-gradient fill (3D ball look) +
                      always-on drop shadow (depth) + hover glow on top. */}
                  <motion.circle
                    r={node.radius}
                    fill={nodeFill(node.kind)}
                    stroke={nodeStroke(node.kind)}
                    strokeWidth={node.kind === "planned" ? 1.4 : 1}
                    animate={{
                      scale: isDragging ? 1.12 : isHovered ? 1.06 : 1,
                      opacity: isDimmed ? 0.55 : 1,
                    }}
                    transition={gentleSpring}
                    filter={
                      isHovered || isDragging
                        ? "url(#node-glow)"
                        : "url(#node-shadow)"
                    }
                    style={{ transformOrigin: "center" }}
                  />

                  {/* Label — stroked background for readability over overlapping nodes */}
                  {showLabel && (
                    <motion.text
                      y={node.radius + 22}
                      textAnchor="middle"
                      fontFamily="var(--font-display), Georgia, serif"
                      fontSize={node.kind === "hub" ? 18 : node.kind === "resource" ? 12 : 15}
                      fontStyle={node.kind === "resource" ? "italic" : "normal"}
                      fill={node.kind === "resource" ? "#6B6A66" : "#1C1C1A"}
                      animate={{ opacity: isDimmed ? 0.5 : 1 }}
                      transition={{ duration: 0.7, ease: slowEase }}
                      style={{
                        pointerEvents: "none",
                        paintOrder: "stroke",
                        stroke: "#FAF7F0",
                        strokeWidth: 5,
                        strokeLinejoin: "round",
                      }}
                    >
                      {node.label}
                    </motion.text>
                  )}
                  {node.sub && showLabel && node.kind !== "hub" && (
                    <motion.text
                      y={node.radius + 38}
                      textAnchor="middle"
                      fontFamily="var(--font-body), system-ui"
                      fontSize={10}
                      letterSpacing="0.18em"
                      fill="#6B6A66"
                      textRendering="geometricPrecision"
                      animate={{ opacity: isDimmed ? 0.5 : 0.85 }}
                      transition={{ duration: 0.7, ease: slowEase }}
                      style={{
                        pointerEvents: "none",
                        paintOrder: "stroke",
                        stroke: "#FAF7F0",
                        strokeWidth: 4,
                        strokeLinejoin: "round",
                      }}
                    >
                      {node.sub.toUpperCase()}
                    </motion.text>
                  )}
                </g>
              );
            })}
            </motion.g>
          </svg>
          </div>

          {/* Hover readout panel */}
          <AnimatePresence mode="wait">
            {hoveredNode ? (
              <motion.div
                key={hoveredNode.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={softSpring}
                className="absolute top-4 left-4 md:top-6 md:left-6 max-w-[340px] bg-ink text-cream rounded-lg px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] pointer-events-auto border border-cream/10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-cream/55">
                    {hoveredNode.kind === "hub"
                      ? "Parent · Studio"
                      : hoveredNode.kind === "live"
                      ? "Live product"
                      : hoveredNode.kind === "dev"
                      ? "In development"
                      : hoveredNode.kind === "planned"
                      ? "Planned"
                      : "Public resource"}
                  </div>
                  {hoveredNode.sub && (
                    <div className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                      {hoveredNode.sub}
                    </div>
                  )}
                </div>
                <div className="font-display text-cream text-[24px] leading-tight mt-1.5">
                  {hoveredNode.label}
                </div>
                {hoveredNode.description && (
                  <p className="mt-3 text-[13px] leading-[1.55] text-cream/75">
                    {hoveredNode.description}
                  </p>
                )}
                {hoveredNode.href && (
                  <a
                    href={hoveredNode.href}
                    target={
                      hoveredNode.href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      hoveredNode.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-4 inline-flex items-center gap-1.5 text-[12px] italic font-display text-sage hover:text-cream transition-colors"
                  >
                    Visit →
                  </a>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-4 left-4 md:top-6 md:left-6 text-[11px] uppercase tracking-[0.24em] text-muted/80 pointer-events-none"
              >
                Hover or tap a node
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
            Two properties are live, two more in development. Four more come
            online across 2026 and 2027. As they do, the graph densifies — a
            shared methodology, shared datasets, and an audience that overlaps
            more than any one product suggests on its own. The compounding,
            when it works, lives in the edges — in how the nodes connect.
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
