/**
 * Editorial thumbnail for GLP-1 Picks — a stylized browser view of the
 * rankings index. Designed to feel like a product screenshot without
 * being one.
 */
export function GLP1PicksThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-white">
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 h-9 bg-[#F1ECE1] border-b border-[#E3DED1] flex items-center gap-1.5 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="mx-auto -translate-x-4 flex items-center gap-1.5 text-[10px] text-ink/60 font-mono">
          <span>🔒</span>
          <span>glp1picks.com</span>
        </div>
      </div>

      {/* Page content */}
      <div className="absolute inset-x-0 top-9 bottom-0 px-6 pt-5 pb-4 flex flex-col">
        {/* Masthead */}
        <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
          <div>
            <div className="font-display italic text-ink text-[18px] leading-none">
              The Pricing Index
            </div>
            <div className="text-[8px] tracking-[0.22em] text-muted mt-1.5 uppercase">
              40 providers · Updated April 2026
            </div>
          </div>
          <div className="text-right">
            <div className="font-display italic text-sage text-[11px]">Vol. IV</div>
            <div className="text-[7.5px] text-muted uppercase tracking-widest">
              Issue 04
            </div>
          </div>
        </div>

        {/* Top pick callout */}
        <div className="mt-3 p-3 rounded-md bg-sage/5 border border-sage/20 flex items-center justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-[0.22em] text-sage/80 mb-0.5">
              Editor&apos;s Top Pick
            </div>
            <div className="font-display text-ink text-[14px] leading-none">
              Eden Health
            </div>
            <div className="text-[9px] text-ink/60 mt-0.5">
              $249/mo · All-in · No hidden fees
            </div>
          </div>
          <div className="text-right">
            <div className="font-display italic text-sage text-[22px] leading-none">8.9</div>
            <div className="text-[7.5px] uppercase tracking-widest text-muted mt-0.5">
              of 10
            </div>
          </div>
        </div>

        {/* Rank rows */}
        <div className="mt-3 flex-1">
          {[
            { r: "02", n: "Sprout Health", p: "$259", s: "8.6" },
            { r: "03", n: "Strut Health", p: "$269", s: "8.4" },
            { r: "04", n: "Sesame Care", p: "$189", s: "8.2" },
            { r: "05", n: "Enhance MD", p: "$299", s: "8.0" },
          ].map((row) => (
            <div
              key={row.r}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-3 items-baseline py-1.5 border-b border-ink/5"
            >
              <span className="font-display italic text-bronze text-[11px] w-6">
                {row.r}
              </span>
              <span className="text-[11px] font-medium text-ink">{row.n}</span>
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
          <span>Methodology published</span>
          <span className="font-display italic normal-case text-sage">
            Read the full index →
          </span>
        </div>
      </div>
    </div>
  );
}
