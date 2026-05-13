/**
 * Editorial thumbnail for HRT Picks — a stylized browser view of the
 * menopause HRT telehealth ranking page. Mirrors GLP-1 Picks' structure
 * so the family resemblance reads at a glance, with HRT-specific data
 * (insurance flag, the patch-shortage callout).
 */
export function HRTPicksThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-white">
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 h-9 bg-[#F1ECE1] border-b border-[#E3DED1] flex items-center gap-1.5 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="mx-auto -translate-x-4 flex items-center gap-1.5 text-[10px] text-ink/60 font-mono">
          <span>🔒</span>
          <span>hrtpicks.com</span>
        </div>
      </div>

      {/* Page content */}
      <div className="absolute inset-x-0 top-9 bottom-0 px-6 pt-5 pb-4 flex flex-col">
        {/* Masthead */}
        <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
          <div>
            <div className="font-display italic text-ink text-[18px] leading-none">
              The HRT Index
            </div>
            <div className="text-[8px] tracking-[0.22em] text-muted mt-1.5 uppercase">
              Menopause telehealth · May 2026
            </div>
          </div>
          <div className="text-right">
            <div className="font-display italic text-sage text-[11px]">Vol. I</div>
            <div className="text-[7.5px] text-muted uppercase tracking-widest">
              Issue 02
            </div>
          </div>
        </div>

        {/* Shortage banner — the editorial scoop */}
        <div className="mt-3 px-3 py-1.5 rounded-md bg-bronze/[0.08] border border-bronze/30 flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-bronze">
          <span>Estradiol patch · National shortage</span>
          <span className="font-display italic normal-case tracking-normal text-bronze/85 text-[10px]">
            Tracking →
          </span>
        </div>

        {/* Top pick callout */}
        <div className="mt-3 p-3 rounded-md bg-sage/5 border border-sage/20 flex items-center justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-[0.22em] text-sage/80 mb-0.5">
              Editor&apos;s Top Pick
            </div>
            <div className="font-display text-ink text-[14px] leading-none">
              Midi Health
            </div>
            <div className="text-[9px] text-ink/60 mt-0.5">
              Takes insurance · Broad formulary
            </div>
          </div>
          <div className="text-right">
            <div className="font-display italic text-sage text-[22px] leading-none">9.1</div>
            <div className="text-[7.5px] uppercase tracking-widest text-muted mt-0.5">
              of 10
            </div>
          </div>
        </div>

        {/* Rank rows */}
        <div className="mt-3 flex-1">
          {[
            { r: "02", n: "Alloy", p: "$59", s: "8.7", t: "Cash" },
            { r: "03", n: "Winona", p: "$85", s: "8.5", t: "Bioidentical" },
            { r: "04", n: "Evernow", p: "$35", s: "8.2", t: "Cash" },
            { r: "05", n: "Gennev", p: "$60", s: "7.9", t: "Hybrid" },
          ].map((row) => (
            <div
              key={row.r}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 items-baseline py-1.5 border-b border-ink/5"
            >
              <span className="font-display italic text-bronze text-[11px] w-6">
                {row.r}
              </span>
              <span className="text-[11px] font-medium text-ink">{row.n}</span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-muted">
                {row.t}
              </span>
              <span className="text-[9.5px] text-muted tabular-nums">
                {row.p}/mo
              </span>
              <span className="font-display italic text-ink text-[12px] tabular-nums w-6 text-right">
                {row.s}
              </span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-2 pt-2 border-t border-ink/10 flex items-center justify-between text-[7.5px] text-muted uppercase tracking-[0.2em]">
          <span>Insurance / formulary tracked</span>
          <span className="font-display italic normal-case text-sage">
            See the rankings →
          </span>
        </div>
      </div>
    </div>
  );
}
