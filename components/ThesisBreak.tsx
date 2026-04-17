import { Reveal } from "./Reveal";

/**
 * Full-bleed editorial moment between Metrics/ResearchFramework and Approach.
 * Uses the neuroplasticity montage as dynamic background with pull-quote overlay.
 */
export function ThesisBreak() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
        {/* Background video — futuristic neuroplasticity montage */}
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

        {/* Warm darkening for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent"
        />

        {/* Pull-quote overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full mx-auto max-w-[1320px] px-6 md:px-10 pb-12 md:pb-20">
            <Reveal>
              <div className="flex items-baseline gap-4 mb-6 md:mb-8">
                <span className="font-display italic text-sage-soft text-[20px] md:text-[26px]">
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
                  Let the protocols evolve
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
