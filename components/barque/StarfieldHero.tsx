import { Reveal } from "../Reveal";

export function StarfieldHero() {
  return (
    <section className="relative min-h-[92vh] bg-ink text-cream overflow-hidden">
      {/* Base ink wash — behind the video for safety if it fails to load */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(28,28,26,1) 0%, rgba(14,14,13,1) 100%)",
        }}
      />

      {/* Hero video — the barque painted in dots of light, Seedance 2.0 */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-[1]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/video/barque.mp4" type="video/mp4" />
      </video>

      {/* Top fade for nav legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0E0E0D]/70 to-transparent z-[2]"
      />

      {/* Left-side gradient for text legibility over the starfield */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#0E0E0D]/85 via-[#0E0E0D]/40 to-transparent z-[2]"
      />

      {/* Bottom fade into the next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-ink/80 to-ink z-[2]"
      />

      {/* Content */}
      <div className="relative z-[3] mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-[160px] md:pt-[200px] pb-24 md:pb-40 flex flex-col min-h-[92vh]">
        <Reveal>
          <div className="flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/70">
            <span className="inline-block h-px w-10 bg-cream/40" />
            <span>Barque · The Compound Research</span>
            <span className="hidden md:inline opacity-50">·</span>
            <span className="hidden md:inline opacity-80">
              Vol. 01 — Est. 2026
            </span>
          </div>
        </Reveal>

        <div className="flex-1 min-h-[40px] md:min-h-[80px]" />

        <div className="grid grid-cols-12">
          <h1 className="col-span-12 font-display text-cream tracking-tightest leading-[0.94] text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)] max-w-[18ch]">
            <Reveal delay={120}>
              <span className="block">The ship we send</span>
            </Reveal>
            <Reveal delay={260}>
              <span className="block">
                into the <em className="italic text-sage-soft">signal</em>,
              </span>
            </Reveal>
            <Reveal delay={400}>
              <span className="block">returns at dawn.</span>
            </Reveal>
          </h1>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-6 md:gap-12">
          <Reveal
            delay={560}
            className="col-span-12 md:col-span-7 md:col-start-4"
          >
            <p className="text-[17px] md:text-[20px] leading-[1.55] text-cream/85 font-light">
              <em className="italic text-cream">Barque</em> is the research
              engine behind every Compound decision. One operator, a dataset
              far larger than any one mind can hold, and the discipline of{" "}
              <em className="italic text-cream">curiosity</em> applied to
              weak signals most desks ignore. The protocol fuses them across
              domains no single team bridges and returns{" "}
              <em className="italic text-cream">
                falsifiable, Brier-scored forecasts
              </em>
              .
              <span
                aria-hidden
                className="align-super text-sage-soft text-[0.6em] ml-0.5 font-display italic not-italic"
              >
                ¹
              </span>
            </p>
          </Reveal>

          <Reveal
            delay={720}
            className="col-span-12 md:col-span-3 md:col-start-11 md:pt-1"
          >
            <div className="flex items-start gap-2 text-[12px] leading-[1.6] text-cream/60">
              <span className="font-display italic text-sage-soft">¹</span>
              <span>
                Named for the solar barque that carried Ra through the Duat
                each night — the ship returns at dawn with what it learned in
                the underworld.
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={960}>
          <div className="mt-16 md:mt-24 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/65">
              <span className="inline-block h-4 w-px bg-cream/50 animate-pulse" />
              <span>Scroll · The log below</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-cream/55">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-sage-soft animate-pulse" />
                Pending forecast
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-cream" />
                Resolved true
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
