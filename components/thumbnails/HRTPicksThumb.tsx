/** Compact replica of the live HRT landing structure; no static provider facts. */
export function HRTPicksThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#F4F2EC] text-[#24251F]">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#D4C8B4] bg-[#EAE6DD] px-4">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" /><span className="h-2 w-2 rounded-full bg-[#FEBC2E]" /><span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="mx-auto text-[9px] text-ink/60">hrtpicks.com</span>
      </div>
      <div className="flex h-9 items-center justify-between border-b border-[#D4C8B4] px-5 text-[9px]">
        <span className="font-semibold">HRT·Picks</span>
        <div className="flex rounded-md border border-[#D4C8B4] p-0.5"><span className="rounded bg-[#254D3E] px-2 py-1 text-white">Menopause HRT</span><span className="px-2 py-1">Men’s TRT</span></div>
      </div>
      <div className="px-5 pt-4">
        <p className="text-[8px] font-semibold text-[#254D3E]">Menopause HRT · Independent comparisons</p>
        <p className="mt-2 max-w-[240px] text-[23px] leading-[1.08] tracking-tight">Find your online HRT price in 30 seconds</p>
        <p className="mt-2 text-[8px] leading-relaxed text-ink/65">Compare treatment, delivery method and cost.</p>
        <div className="mt-3 rounded-lg border border-[#D4C8B4] p-3">
          <p className="text-[7px] uppercase tracking-widest text-ink/60">All-in monthly price finder</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[9px]"><div><p className="mb-1 text-[7px] text-ink/60">Hormone</p><p className="rounded border border-[#D4C8B4] px-2 py-2">Estradiol <span className="float-right">⌄</span></p></div><div><p className="mb-1 text-[7px] text-ink/60">Delivery</p><p className="rounded border border-[#D4C8B4] px-2 py-2">Any route <span className="float-right">⌄</span></p></div></div>
        </div>
        <div className="mt-3 flex justify-between text-[8px] text-[#254D3E]"><span>Compare providers →</span><span>Costs &amp; insurance →</span></div>
      </div>
    </div>
  );
}
