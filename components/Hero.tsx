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

      {/* Warm dark gradient for text legibility */}
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

        {/* Thesis headline — Cole Schafer: rhythm, specificity, one unexpected turn */}
        <div className="grid grid-cols-12">
          <h1 className="col-span-12 font-display text-cream tracking-tightest leading-[0.92] text-[44px] sm:text-[64px] md:text-[88px] lg:text-[108px] drop-shadow-[0_2px_40px_rgba(0,0,0,0.35)] max-w-[16ch]">
            <Reveal delay={120}>
              <span className="block">
                We build the health
              </span>
            </Reveal>
            <Reveal delay={240}>
              <span className="block">
                companies{" "}
                <em className="italic text-sage-soft">that should exist</em>.
              </span>
            </Reveal>
            <Reveal delay={360}>
              <span className="block mt-4 md:mt-6 text-[28px] sm:text-[38px] md:text-[52px] lg:text-[64px] text-cream/85">
                Then we quietly buy{" "}
                <em className="italic text-sage-soft">the ones that already do</em>
                <span className="text-sage-soft">.</span>
              </span>
            </Reveal>
          </h1>
        </div>

        {/* Subline + footnote */}
        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-6 md:gap-12">
          <Reveal
            delay={520}
            className="col-span-12 md:col-span-7 md:col-start-4"
          >
            <p className="text-[17px] md:text-[20px] leading-[1.5] text-cream/90 font-light">
              A studio for consumer health.{" "}
              <em className="italic text-cream">GLP-1</em> to{" "}
              <em className="italic text-cream">neuroscience</em>.{" "}
              <em className="italic text-cream">Supplements</em> to{" "}
              <em className="italic text-cream">pet health</em>. We build or
              acquire — and never sell what we can&apos;t footnote.
              <span
                aria-hidden
                className="align-super text-sage-soft text-[0.6em] ml-0.5 font-display italic not-italic"
              >
                ¹
              </span>
            </p>
          </Reveal>

          <Reveal
            delay={680}
            className="col-span-12 md:col-span-3 md:col-start-11 md:pt-1"
          >
            <div className="flex items-start gap-2 text-[12px] leading-[1.55] text-cream/65">
              <span className="font-display italic text-sage-soft">¹</span>
              <span>
                Footnoted as in every stat has a source, every methodology is
                public, every provider ranking shows our work. Nothing we can&apos;t
                defend in a lab.
              </span>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue + monogram */}
        <Reveal delay={960}>
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

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-56 md:h-72 bg-gradient-to-b from-transparent via-cream/60 to-cream z-[1]"
      />
    </section>
  );
}
