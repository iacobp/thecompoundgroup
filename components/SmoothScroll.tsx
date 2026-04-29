"use client";

/**
 * Lenis smooth-scroll wrapper, wired to GSAP's ScrollTrigger ticker so
 * scroll-driven animations stay in sync with the smoothed scroll position.
 *
 * Mounted once in the root layout. Disabled when the user prefers reduced
 * motion — native scroll is restored in that case.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap, prefersReducedMotion } from "@/lib/animations";

export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // Wire Lenis into GSAP's ticker so ScrollTrigger updates with smoothed pos.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
