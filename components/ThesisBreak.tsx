import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Editorial full-bleed image section used between Metrics and Approach.
 * Layered pull-quote over warm editorial photograph — Function Health pattern.
 */
export function ThesisBreak() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed editorial image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
        <Image
          src="/images/thesis-break.jpg"
          alt="Editorial still-life suggesting honest research and methodology"
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
        />

        {/* Warm darkening for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-ink/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent"
        />

        {/* Pull-quote overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full mx-auto max-w-[1320px] px-6 md:px-10 pb-12 md:pb-20">
            <Reveal>
              <div className="flex items-baseline gap-4 mb-6 md:mb-8">
                <span className="font-display italic text-cream/70 text-[20px] md:text-[26px]">
                  ❝
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/70">
                  On methodology
                </span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <blockquote className="font-display text-cream text-[28px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-snug max-w-[22ch] drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)]">
                Publish the methodology.{" "}
                <em className="italic text-sage-soft">
                  Trust follows transparency
                </em>
                .
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
