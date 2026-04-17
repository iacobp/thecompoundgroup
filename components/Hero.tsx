export function Hero() {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Editorial marker */}
          <div className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="inline-block h-px w-8 bg-ink/40" />
              <span>Arsenal Productions · Est. 2026</span>
            </div>
          </div>

          {/* Main thesis */}
          <h1 className="col-span-12 md:col-span-9 order-1 md:order-2 font-display text-ink tracking-tightest leading-[0.95] text-[48px] sm:text-[64px] md:text-[88px] lg:text-[104px]">
            Consumer health,
            <br />
            built{" "}
            <em className="italic text-sage">honestly</em>
            <span className="text-sage">.</span>
          </h1>

          {/* Subline */}
          <div className="col-span-12 md:col-span-9 md:col-start-4 order-3 mt-6 md:mt-10">
            <p className="max-w-[52ch] text-[17px] md:text-[19px] leading-[1.55] text-ink/75">
              A studio building products that tell the truth about{" "}
              <em className="italic">price</em>,{" "}
              <em className="italic">safety</em>, and{" "}
              <em className="italic">outcomes</em> — in categories where
              nobody else does. Today we publish in GLP-1 telehealth. Tomorrow:
              supplements, peptides, neuroscience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
