/**
 * GSAP animation primitives for The Compound mother site.
 *
 * - Custom signature ease ("compound") — applied across the site for brand identity
 * - Plugin registration (idempotent, safe to call multiple times)
 * - Reduced-motion helper that honors prefers-reduced-motion
 *
 * Used alongside the existing Framer Motion + IntersectionObserver Reveal stack.
 * GSAP is the wow-moment layer; existing primitives stay as-is.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

/**
 * Register GSAP plugins and define our signature ease curve.
 * Idempotent — safe to call from any client entry point.
 */
export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Signature ease — mirrors --ease-out-expo from globals.css with a slightly
  // more luxurious tail. Used as default ease across all GSAP animations.
  CustomEase.create(
    "compound",
    "M0,0 C0.07,0.0 0.16,0.7 0.4,0.92 0.62,0.99 0.74,1 1,1"
  );

  // Slower, more deliberate variant for hero moments.
  CustomEase.create(
    "compound-hero",
    "M0,0 C0.05,0 0.12,0.55 0.32,0.85 0.55,0.97 0.7,1 1,1"
  );

  // Set GSAP defaults so every tween picks up the brand ease unless overridden.
  gsap.defaults({ ease: "compound", duration: 0.9 });

  registered = true;
}

/**
 * Returns true if the user prefers reduced motion.
 * Wrap any GSAP animation entry point in a guard:
 *
 *   if (prefersReducedMotion()) { gsap.set(target, finalState); return; }
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
