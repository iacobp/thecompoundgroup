/** Editorial replica of Longevity Ranked's cream, forest and chartreuse homepage. */
export function LongevityRankedThumb() {
  return (
    <figure>
      <div className="plate aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-[#f1f0e8] text-[#202722] [container-type:inline-size]">
        <div className="flex items-center gap-[2cqw] border-b border-[#26342e]/15 px-[4cqw] py-[2cqw] text-[1.8cqw] text-[#26342e]/70">
          <span aria-hidden className="flex gap-[.7cqw]">
            <span className="h-[1cqw] w-[1cqw] rounded-full bg-[#26342e]/30" />
            <span className="h-[1cqw] w-[1cqw] rounded-full bg-[#26342e]/20" />
            <span className="h-[1cqw] w-[1cqw] rounded-full bg-[#26342e]/15" />
          </span>
          <span>longevityranked.com</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#26342e]/15 px-[5cqw] py-[3cqw] text-[2.1cqw]">
          <span className="inline-flex flex-col items-start gap-[.2cqw] text-[#26342e]"><span className="text-[1cqw] font-semibold leading-none tracking-[.2em]">LONGEVITY</span><span className="text-[2.7cqw] font-semibold leading-none tracking-[-.065em]">ranked</span></span>
          <span>NAD+ &amp; sermorelin</span>
        </div>
        <div className="px-[6cqw] py-[5cqw]">
          <p className="text-[1.8cqw] uppercase tracking-[0.15em] text-[#26342e]">Longevity care, compared</p>
          <p className="mt-[3cqw] max-w-[80cqw] text-[6.6cqw] font-semibold leading-[.98] tracking-[-.07em]">Compare NAD+ and sermorelin providers, prices and plans.</p>
          <p className="mt-[3cqw] max-w-[75cqw] text-[2.4cqw] leading-relaxed text-[#202722]/70">The product. The payment terms. The questions to ask.</p>
          <div className="mt-[4cqw] grid grid-cols-[.85fr_1.15fr] gap-[2cqw]">
            <div className="rounded-[2cqw] bg-[#c8dd68] p-[3cqw]">
              <p className="text-[3.4cqw] font-semibold tracking-tight">NAD+</p>
              <p className="mt-[1cqw] text-[1.9cqw]">Compare providers</p>
            </div>
            <div className="rounded-[2cqw] bg-[#dce5de] p-[3cqw]">
              <p className="text-[3.4cqw] font-semibold tracking-tight">Sermorelin</p>
              <p className="mt-[1cqw] text-[1.9cqw]">See prices and plans</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-[11px] leading-relaxed text-muted">Longevity Ranked. Separate treatment categories, clear provider comparisons.</figcaption>
    </figure>
  );
}
