import { anchorValue } from "@/lib/generated/anchors";

/** A compact replica of BPFT's September 2026 goal-led homepage. */
export function BestPeptideForThatThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#f8f7f2] font-sans text-[#21372d] [container-type:inline-size]">
      <div className="absolute inset-x-0 top-0 flex h-[4.6cqw] items-center gap-[.85cqw] border-b border-[#21372d]/10 bg-[#ebe8e0] px-[2.3cqw]">
        <span className="h-[1.15cqw] w-[1.15cqw] rounded-full bg-[#cfb7ab]" />
        <span className="h-[1.15cqw] w-[1.15cqw] rounded-full bg-[#cdbf9f]" />
        <span className="h-[1.15cqw] w-[1.15cqw] rounded-full bg-[#9eafa4]" />
        <span className="mx-auto -translate-x-[2.3cqw] text-[1.3cqw] text-[#21372d]/60">bestpeptideforthat.com</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[4.6cqw] flex flex-col px-[3cqw] pb-[2.3cqw]">
        <div className="flex items-center justify-between border-b border-[#21372d]/10 py-[1.7cqw]">
          <div className="flex items-center gap-[1.15cqw]">
            <span className="rounded bg-[#174c38] px-[1.15cqw] py-[1.15cqw] text-[1.45cqw] font-bold tracking-tight text-[#f8f7f2]">BPFT↗</span>
            <span className="text-[1.3cqw] font-bold leading-tight">Best Peptide<br />For That</span>
          </div>
          <span className="text-[1.15cqw] text-[#21372d]/60">Best For · Compare · Tools</span>
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_1fr] items-start gap-[4cqw] pt-[5cqw]">
          <div className="pt-[.6cqw]">
            <p className="text-[.9cqw] font-semibold uppercase tracking-[0.12em] text-[#885b43]">Independent peptide comparisons</p>
            <p className="mt-[2.2cqw] text-[5.8cqw] font-bold leading-[0.99] tracking-[-0.055em]">Best peptide<br />for <span className="text-[#174c38]">your goal?</span></p>
            <p className="mt-[2.2cqw] max-w-[39cqw] text-[1.6cqw] leading-relaxed text-[#21372d]/70">Start with the evidence. Explore {anchorValue("bestpeptideforthat", "peptideCount")} compounds and understand your options.</p>
            <span className="mt-[3cqw] inline-flex items-center gap-[2.3cqw] rounded bg-[#174c38] px-[1.7cqw] py-[1.15cqw] text-[1.15cqw] font-semibold text-[#f8f7f2]">Find a peptide <span>↗</span></span>
          </div>
          <div className="rounded-lg bg-[#174c38] px-[3cqw] pb-[2.2cqw] pt-[3cqw] text-[#f8f7f2]">
            <p className="text-[.9cqw] font-semibold uppercase tracking-[0.15em] text-[#c5d5cb]">Start here</p>
            <p className="mb-[1.6cqw] mt-[1.6cqw] text-[3.2cqw] font-semibold leading-[1.1] tracking-tight">What do you want<br />to explore?</p>
            {["Weight Loss", "Muscle Growth", "Recovery & Healing", "Skin & Anti-Aging", "Sleep"].map((goal, index) => (
              <div key={goal} className="flex items-center gap-[1.15cqw] border-t border-[#f8f7f2]/15 py-[1.4cqw] text-[1.15cqw]">
                <span className="text-[#c5d5cb]">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-medium">{goal}</span><span>↗</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[2.2cqw] flex items-center justify-between border-t border-[#21372d]/10 pt-[1.7cqw] text-[1.15cqw] text-[#21372d]/60"><span>Evidence · Comparisons · Tools</span><span className="font-semibold text-[#174c38]">Explore by goal ↗</span></div>
      </div>
    </div>
  );
}
