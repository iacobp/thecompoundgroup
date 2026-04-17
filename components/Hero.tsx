import { Reveal } from "./Reveal";
import { Monogram } from "./Monogram";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] md:min-h-[98vh] overflow-hidden -mt-[88px] md:-mt-[104px] pt-[120px] md:pt-[140px] flex flex-col">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
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

      {/* Dark warm gradient overlay for text legibility (Function Health approach) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/45 to-ink/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent"
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col mx-auto w-full max-w-[1320px] px-6 md:px-10 pb-16 md:pb-24">
        {/* Edition marker top */}
        <Reveal>
          <div className="flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/75 mt-2">
            <span className="inline-block h-px w-10 bg-cream/40" />
            <span>Volume 01 · Est. 2026</span>
            <span className="hidden md:inline opacity-50">·</span>
            <span className="hidden md:inline opacity-80">
              A studio for consumer health
            </span>
          </div>
        </Reveal>

        {/* Spacer pushes headline to lower portion of viewport */}
        <div className="flex-1" />

        {/* Thesis headline */}
        <div className="grid grid-cols-12">
          <h1 className="col-span-12 font-display text-cream tracking-tightest leading-[0.88] text-[56px] sm:text-[84px] md:text-[124px] lg:text-[156px] drop-shadow-[0_2px_40px_rgba(0,0,0,0.35)]">
            <Reveal delay={120}>
              <span className="block">Consumer health,</span>
            </Reveal>
            <Reveal delay={280}>
              <span className="block">
                built{" "}
                <em className="italic text-sage-soft relative">
                  honestly
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

        {/* Subline + footnote layout */}
        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-12">
          <Reveal
            delay={440}
            className="col-span-12 md:col-span-7 md:col-start-4"
          >
            <p className="text-[17px] md:text-[20px] leading-[1.45] text-cream/90 font-light">
              A studio building products that tell the truth about{" "}
              <em className="italic text-cream">price</em>,{" "}
              <em className="italic text-cream">safety</em>, and{" "}
              <em className="italic text-cream">outcomes</em> — in categories
              where nobody else does.
            </p>
          </Reveal>

          <Reveal
            delay={620}
            className="col-span-12 md:col-span-3 md:col-start-11 md:pt-1"
          >
            <div className="flex items-start gap-2 text-[12px] leading-[1.5] text-cream/65">
              <span className="font-display italic text-sage-soft">¹</span>
              <span>
                Honest as in transparent pricing, transparent methodology,
                and transparent ownership. No pay-for-placement. Ever.
              </span>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue + floating monogram */}
        <Reveal delay={900}>
          <div className="mt-14 md:mt-20 flex items-center justify-between">
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

      {/* Bottom edge fade into cream page */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream"
      />
    </section>
  );
}
