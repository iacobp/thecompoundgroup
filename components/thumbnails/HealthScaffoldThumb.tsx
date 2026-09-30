import { comparisonScaffolds } from "@/lib/portfolio-development";

/** Editorial replica of the actual shared-app preview, without a made-up domain. */
export function HealthScaffoldThumb({ edition }: { edition: "hair" | "desire" }) {
  const hair = edition === "hair";
  const project = comparisonScaffolds.find(item => item.slug === (hair ? "hair-index" : "desire-index"))!;
  const accent = hair ? "#3F6157" : "#853F48";
  const tint = hair ? "#E4EBE5" : "#F2E4E5";
  return <figure>
    <div role="img" aria-label={`${project.name} preview: ${hair ? "women's and men's care pathways" : "ED provider comparisons"} and a cost calculator`} className="overflow-hidden rounded-xl border border-border bg-[#F8F7F2] text-[#242C29] [container-type:inline-size] font-sans">
      <div className="px-[5cqw] py-[2cqw] text-[2cqw]" style={{ color: accent, backgroundColor: tint }}>Design preview · Not launched</div>
      <div className="flex items-center justify-between border-b border-[#DCDDD4] px-[5cqw] py-[3cqw]"><span className="text-[3.1cqw] font-semibold">{project.name}</span><span className="text-[1.8cqw]">{hair ? "For women / For men" : "ED care / Compare"}</span></div>
      <div className="grid grid-cols-[1.2fr_.8fr] gap-[4cqw] px-[5cqw] py-[7cqw]">
        <div><p className="text-[1.6cqw] uppercase tracking-wide" style={{ color: accent }}>{hair ? "Hair-loss care, clearly compared" : "Sexual health, on your terms"}</p><p className="mt-[3cqw] text-[5.4cqw] font-semibold leading-[1.04] tracking-[-.06em]">{hair ? <>Your hair.<br />A clearer next step.</> : <>Personal questions.<br />Clearer choices.</>}</p><div className="mt-[4cqw] inline-block rounded-[1cqw] px-[2cqw] py-[1.5cqw] text-[1.7cqw] text-white" style={{ backgroundColor: accent }}>{hair ? "Explore care providers" : "Explore ED providers"}</div></div>
        <div className="rounded-[2cqw] p-[3cqw]" style={{ backgroundColor: tint }}><p className="text-[1.6cqw] uppercase" style={{ color: accent }}>Before you choose</p><p className="mt-[3cqw] text-[3.3cqw] font-medium leading-tight">The details<br />make the difference.</p><div className="mt-[4cqw] space-y-[2cqw] text-[1.7cqw]"><p>01 &nbsp; The actual product</p><p>02 &nbsp; The full commitment</p><p>03 &nbsp; The care around it</p></div></div>
      </div>
    </div>
    <figcaption className="mt-2 text-[11px] leading-relaxed text-muted">Homepage scaffold. Final name undecided.</figcaption>
  </figure>;
}
