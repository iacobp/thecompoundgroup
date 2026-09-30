import { comparisonScaffolds } from "@/lib/portfolio-development";

/** Editorial replicas of the approved, deployed health preview homepages. */
export function HealthScaffoldThumb({ edition }: { edition: "hair" | "desire" }) {
  const hair = edition === "hair";
  const project = comparisonScaffolds.find(item => item.slug === (hair ? "hair-index" : "desire-index"))!;
  const ink = hair ? "#19343D" : "#4D1E2B";
  const paper = hair ? "#F3F0E7" : "#FFF4DD";
  const signal = hair ? "#AC603E" : "#EB775F";
  return <figure>
    <div role="img" aria-label={`${project.name} preview: ${hair ? "editorial typography and flowing strands" : "bold typography and open parentheses"}, care pathways and a cost calculator`} className="overflow-hidden rounded-lg border border-border [container-type:inline-size] font-sans" style={{ backgroundColor: paper, color: ink }}>
      <div className="px-[5cqw] py-[2cqw] text-[2cqw]" style={{ backgroundColor: hair ? "#E3E7E1" : "#F0DFD0" }}>Design preview · Not launched</div>
      <div className="flex items-center justify-between border-b px-[5cqw] py-[3cqw]" style={{ borderColor: `${ink}40` }}><span className="text-[3.5cqw]" style={{ fontFamily: hair ? "Georgia, serif" : undefined, fontWeight: hair ? 400 : 600 }}>{project.name}</span><span className="text-[1.8cqw]">{hair ? "For women / For men" : "ED care / Compare"}</span></div>
      <div className="grid grid-cols-[1.1fr_1fr] px-[5cqw] pb-[5cqw] pt-[4cqw]">
        <div className="py-[5cqw] pr-[3cqw]"><p className="text-[1.5cqw] uppercase tracking-wide">{hair ? "Hair loss, thoughtfully explained" : "Independent guides to sexual health"}</p><p className="mt-[3cqw] text-[5.7cqw] leading-[1.04] tracking-[-.055em]" style={{ fontFamily: hair ? "Georgia, serif" : undefined, fontWeight: hair ? 400 : 650 }}>{hair ? <>Still you.<br /><em>More informed.</em></> : <>Personal questions.<br />Straight answers.</>}</p><div className="mt-[4cqw] inline-block px-[2cqw] py-[1.5cqw] text-[1.65cqw]" style={{ backgroundColor: ink, color: paper }}>{hair ? "Find your starting point" : "Explore ED treatment options"}</div></div>
        <div className="relative grid min-h-[49cqw] place-items-center overflow-hidden" style={{ backgroundColor: ink }}>
          {hair ? <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 540" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true"><g stroke="#D8DFDD" strokeWidth="1.8" opacity=".66">{Array.from({ length: 20 }, (_, i) => <path key={i} d={`M -70 ${160 + i * 15} C ${145 + i * 3} ${650 - i * 10.5} ${390 + i * 4.5} ${-200 + i * 13.5} 700 ${80 + i * 16.5}`} />)}</g><path d="M-70 400 C130 495 570 25 700 176" stroke={signal} strokeWidth="7" /></svg> : <span className="-translate-y-[3cqw] whitespace-nowrap text-[41cqw] leading-none tracking-[-.08em]" style={{ fontFamily: "Georgia, serif", color: signal }}>( )</span>}
          <span className="absolute bottom-[3cqw] left-[3cqw] text-[1.8cqw] leading-relaxed" style={{ color: paper }}>{hair ? <>Different textures.<br />A thoughtful next step.</> : <>A little more openness.<br />A little less guesswork.</>}</span>
        </div>
      </div>
    </div>
    <figcaption className="mt-2 text-[11px] leading-relaxed text-muted">Homepage preview. Final name undecided.</figcaption>
  </figure>;
}
