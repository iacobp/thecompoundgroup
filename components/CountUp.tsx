"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server, so the reset below
 * runs before the first paint without React logging the SSR warning.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type CountUpProps = {
  /** Target number to count to. */
  to: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Optional prefix rendered before the number (e.g. "$"). */
  prefix?: string;
  /** Optional suffix appended when complete (e.g. "+", "K"). */
  suffix?: string;
  /** Locale number formatting. */
  format?: boolean;
  /** Class name for the wrapping span. */
  className?: string;
};

/**
 * Animates a number from 0 to target when it enters the viewport.
 * Uses IntersectionObserver plus requestAnimationFrame for a smooth ease-out.
 *
 * The initial state is the TARGET, not zero, so the server-rendered HTML
 * carries the real number. It used to render zero, which meant every crawler
 * and every reader without JS was served an empty count under a label that
 * promised a figure. The reset happens in a layout effect, before the browser
 * paints, so a human still sees the count run.
 */
export function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  format = true,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!startedRef.current) setValue(0);
  }, [to]);

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
      {prefix}
      {format ? value.toLocaleString("en-US") : value}
      {suffix}
    </span>
  );
}
