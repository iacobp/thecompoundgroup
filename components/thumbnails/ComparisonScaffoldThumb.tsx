/** Editorial replica of the Healthspan Picks scaffold, explicitly shown before launch. */
export function ComparisonScaffoldThumb() {
  return (
    <figure>
      <div className="plate aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-[#f1f0e8] text-[#202722] [container-type:inline-size]">
        <div className="flex items-center justify-between border-b border-[#26342e]/15 bg-[#c8dd68] px-[5cqw] py-[3cqw] text-[2.2cqw]">
          <span className="font-semibold">Healthspan Picks</span>
          <span>NAD+ launch category</span>
        </div>
        <div className="px-[6cqw] py-[6cqw]">
          <p className="text-[2cqw] uppercase tracking-[0.15em] text-[#26342e]">A clearer way to compare NAD+ care</p>
          <p className="mt-[4cqw] text-[8.6cqw] font-semibold leading-[.88] tracking-[-.07em]">NAD+ plans,<br />made legible.</p>
          <p className="mt-[3cqw] max-w-[70cqw] text-[2.7cqw] leading-relaxed text-[#202722]/70">Specific products, routes, prices and the real cash commitment.</p>
          <div className="mt-[5cqw] flex flex-wrap gap-[2cqw] text-[2.1cqw]">
            {["Injection", "Nasal spray", "Oral precursors"].map((form) => <span key={form} className="rounded-full border border-[#26342e]/25 px-[3cqw] py-[1.5cqw]">{form}</span>)}
          </div>
          <div className="mt-[5cqw] border-t border-[#26342e]/20 pt-[3cqw] text-[2.2cqw] text-[#26342e]">Route-specific · Price history · Evidence</div>
        </div>
      </div>
      <figcaption className="mt-3 text-[11px] leading-relaxed text-muted">Healthspan Picks working design. The specialist sites remain at scaffold stage.</figcaption>
    </figure>
  );
}
