"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "@/lib/animations";

/**
 * Full-bleed editorial moment between ResearchFramework and Approach.
 * Pinned ScrollTrigger: as the user scrolls through, the pull-quote
 * reveals character-by-character against the neuroplasticity video.
 *
 * The pull-quote becomes the punctuation between portfolio and approach —
 * a scroll-driven "stop and read this" moment.
 */
export function ThesisBreak() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const root = ref.current;
      if (!root) return;

      const quoteEl = root.querySelector<HTMLElement>("[data-thesis-quote]");
      const meta = root.querySelector<HTMLElement>("[data-thesis-meta]");
      if (!quoteEl) return;

      if (prefersReducedMotion()) {
        gsap.set([quoteEl, meta], { autoAlpha: 1 });
        return;
      }

      const split = SplitText.create(quoteEl, {
        type: "chars,words",
        wordsClass: "inline-block overflow-hidden",
        charsClass: "inline-block will-change-transform",
      });

      // Initial state — chars hidden, meta hidden
      gsap.set(split.chars, { yPercent: 110, autoAlpha: 0 });
      gsap.set(meta, { autoAlpha: 0, y: 12 });

      // Scrub-linked timeline tied to scroll position through the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      tl.to(meta, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "compound",
      })
        .to(
          split.chars,
          {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.012,
            duration: 0.6,
            ease: "compound-hero",
          },
          "-=0.2"
        );

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/video/neuroplasticity-poster.jpg"
          aria-hidden
        >
          <source src="/video/neuroplasticity.mp4" type="video/mp4" />
        </video>

        {/* Lighter overlay — only darkens the bottom third for pull-quote legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent"
        />

        {/* Pull-quote overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full mx-auto max-w-[1320px] px-6 md:px-10 pb-12 md:pb-20">
            <div
              data-thesis-meta
              className="flex items-baseline gap-4 mb-6 md:mb-8"
            >
              <span className="font-display italic text-sage-soft text-[20px] md:text-[26px]">
                ❝
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/70">
                From our methodology
              </span>
            </div>
            <blockquote
              data-thesis-quote
              className="font-display text-cream text-[26px] md:text-[44px] lg:text-[52px] leading-[1.2] tracking-snug max-w-[28ch] drop-shadow-[0_2px_30px_rgba(0,0,0,0.55)]"
            >
              Show the work, and keep showing it —{" "}
              <em className="italic text-sage-soft">
                as the evidence changes, so should the conclusion
              </em>
              .
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
