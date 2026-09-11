/** Editorial replica of the NAD Index scaffold, explicitly shown before launch. */
export function ComparisonScaffoldThumb() {
  return (
    <figure>
      <div className="plate aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-[#f7f6f1] text-[#24352f] [container-type:inline-size]">
        <div className="flex items-center justify-between border-b border-[#285b54]/15 bg-[#e4eeea] px-[5cqw] py-[3cqw] text-[2.2cqw]">
          <span className="font-semibold">NAD Index</span>
          <span>Scaffold preview</span>
        </div>
        <div className="px-[6cqw] py-[6cqw]">
          <p className="text-[2cqw] uppercase tracking-[0.15em] text-[#285b54]">NAD products, understood</p>
          <p className="mt-[4cqw] text-[7.4cqw] font-semibold leading-[1.03] tracking-tight">See the product.<br />Know the commitment.</p>
          <p className="mt-[3cqw] max-w-[70cqw] text-[2.7cqw] leading-relaxed text-[#24352f]/75">Formulation, advertised price and the terms behind the headline.</p>
          <div className="mt-[5cqw] flex flex-wrap gap-[2cqw] text-[2.1cqw]">
            {["Injection", "Nasal spray", "Oral"].map((form) => <span key={form} className="rounded-full border border-[#285b54]/25 px-[3cqw] py-[1.5cqw]">{form}</span>)}
          </div>
          <div className="mt-[5cqw] border-t border-[#285b54]/20 pt-[3cqw] text-[2.2cqw] text-[#285b54]">Product details · Payment terms · Evidence</div>
        </div>
      </div>
      <figcaption className="mt-3 text-[11px] leading-relaxed text-muted">NAD Index working design. The specialist sites remain at scaffold stage.</figcaption>
    </figure>
  );
}
