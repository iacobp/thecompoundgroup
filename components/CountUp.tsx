"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Target number to count to. */
  to: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Optional suffix appended when complete (e.g. "+", "K"). */
  suffix?: string;
  /** Locale number formatting. */
  format?: boolean;
  /** Class name for the wrapping span. */
  className?: string;
};

/**
 * Animates a number from 0 → target when it enters the viewport.
 * Uses IntersectionObserver + requestAnimationFrame for smooth ease-out.
 */
export function CountUp({
  to,
  duration = 1600,
  suffix = "",
  format = true,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        if (
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ) {
          setValue(to);
          observer.disconnect();
          return;
        }

        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo for a confident settle
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(Math.round(to * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        observer.disconnect();
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {format ? value.toLocaleString("en-US") : value}
      {suffix}
    </span>
  );
}
