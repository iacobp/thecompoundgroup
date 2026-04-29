"use client";

/**
 * Magnetic button — cursor-follow with damped spring, returns to rest on leave.
 * Premium agency-tier interaction. Honors prefers-reduced-motion (no follow).
 *
 * Usage:
 *   <MagneticButton href="/contact" className="...">Get in touch</MagneticButton>
 *   <MagneticButton onClick={...}>Apply</MagneticButton>
 */

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "gsap";
import { registerGsap, prefersReducedMotion } from "@/lib/animations";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  ariaLabel?: string;
  /** Strength of the magnetic pull, 0-1. Default 0.3. */
  strength?: number;
};

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  ariaLabel,
  strength = 0.3,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    registerGsap();

    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    if (prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "compound" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "compound" });
    const xToInner = gsap.quickTo(inner, "x", {
      duration: 0.7,
      ease: "compound",
    });
    const yToInner = gsap.quickTo(inner, "y", {
      duration: 0.7,
      ease: "compound",
    });

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      xTo(dx * strength);
      yTo(dy * strength);
      // Inner element drifts a little further for parallax depth
      xToInner(dx * strength * 0.4);
      yToInner(dy * strength * 0.4);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      xToInner(0);
      yToInner(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const Tag = href ? "a" : "button";
  const props = href
    ? { href, "aria-label": ariaLabel }
    : { onClick, "aria-label": ariaLabel, type: "button" as const };

  return (
    <Tag
      // @ts-expect-error polymorphic ref forwarding
      ref={ref}
      className={`inline-block will-change-transform ${className ?? ""}`}
      {...props}
    >
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </Tag>
  );
}
