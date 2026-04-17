import { Reveal } from "./Reveal";
import { Monogram } from "./Monogram";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[94vh] overflow-hidden flex flex-col">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
        aria-hidden
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Top darkening for nav legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/55 to-transparent z-[1]"
      />

      {/* Warm dark gradient overlay for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/25 z-[1]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent z-[1]"
      />

      {/* Content */}
      <div className="relative z-[2] flex-1 flex flex-col mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-[140px] md:pt-[168px] pb-16 md:pb-20">
        {/* Edition marker */}
        <Reveal>
          <div className="flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/75">
            <span className="inline-block h-px w-10 bg-cream/40" />
            <span>Volume 01 · Est. 2026</span>
            <span className="hidden md:inline opacity-50">·</span>
            <span className="hidden md:inline opacity-80">
              A research studio for consumer health
            </span>
          </div>
        </Reveal>

        <div className="flex-1 min-h-[80px] md:min-h-[160px]" />

        {/* Thesis headline */}
        <div className="grid grid-cols-12">
          <h1 className="col-span-12 font-display text-cream tracking-tightest leading-[0.88] text-[56px] sm:text-[84px] md:text-[120px] lg:text-[148px] drop-shadow-[0_2px_40px_rgba(0,0,0,0.35)]">
            <Reveal delay={120}>
              <span className="block">Built. Acquired.</span>
            </Reveal>
            <Reveal delay={280}>
              <span className="block">
                <em className="italic text-sage-soft relative">
                  Researched
                  <span
                    aria-hidden
                    className="absolute -right-3 md:-right-5 top-[0.12em] text-sage-soft/70 font-display text-[0.25em] not-italic"
                  >
                    ¹
                  </span>
                </em>
                <span className="text-sage-soft">.</span>
              </span>
            </Reveal>
          </h1>
        </div>

        {/* Subline + footnote */}
        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-12">
          <Reveal
            delay={440}
            className="col-span-12 md:col-span-7 md:col-start-4"
          >
            <p className="text-[17px] md:text-[20px] leading-[1.45] text-cream/90 font-light">
              A studio that <em className="italic text-cream">builds</em> and{" "}
              <em className="italic text-cream">acquires</em> honest consumer
              health brands — <em className="italic text-cream">grounded in research</em>.
              From GLP-1 to supplements for the mind, pet health to
              neuroscience, we operate in the categories where no one else
              tells the truth about price, safety, and outcomes.
            </p>
          </Reveal>

          <Reveal
            delay={620}
            className="col-span-12 md:col-span-3 md:col-start-11 md:pt-1"
          >
            <div className="flex items-start gap-2 text-[12px] leading-[1.5] text-cream/65">
              <span className="font-display italic text-sage-soft">¹</span>
              <span>
                Research as in published methodology, original pricing data,
                and protocols that evolve. Trust compounds across the portfolio.
              </span>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue + floating monogram */}
        <Reveal delay={900}>
          <div className="mt-12 md:mt-16 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/65">
              <span className="inline-block h-4 w-px bg-cream/50 animate-pulse" />
              <span>Scroll · Portfolio below</span>
            </div>

            <div className="hidden md:block">
              <Monogram size="sm" variant="outline" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom fade into cream */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-56 md:h-72 bg-gradient-to-b from-transparent via-cream/60 to-cream z-[1]"
      />
    </section>
  );
}
