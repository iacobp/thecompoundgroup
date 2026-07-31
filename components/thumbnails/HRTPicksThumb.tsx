/**
 * Editorial thumbnail for HRT Picks — a stylized browser view of the
 * relaunched independent hormone-care comparison (July 2026). Mirrors
 * the GLP-1 Picks / GLP-1 Pets family pattern, with the site's signature
 * element front and center: the A–F Price Transparency Grade.
 */
export function HRTPicksThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#FBF8EE]">
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
      <div className="absolute inset-x-0 top-9 bottom-0 px-6 pt-4 pb-4 flex flex-col">
        {/* Verification pill + wings */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sage/30 bg-white/80 px-2.5 py-1">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-sage opacity-60 animate-ping" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            </span>
            <span className="text-[7px] uppercase tracking-[0.18em] text-sage font-semibold">
              Prices verified · July 2026
            </span>
          </div>
          <span className="text-[7px] uppercase tracking-[0.22em] text-bronze font-semibold">
            Her HRT · His TRT
          </span>
        </div>

        {/* Editorial headline */}
        <div className="mt-3 border-b border-ink/10 pb-3">
          <div className="font-display italic text-ink text-[17px] leading-[1.1]">
            The independent
            <br />
            hormone-care comparison.
          </div>
          <div className="text-[7.5px] tracking-[0.22em] text-muted mt-1.5 uppercase">
            15 providers · No pay-for-placement
          </div>
        </div>

        {/* Price Transparency Grade — the signature element */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[7.5px] uppercase tracking-[0.2em] text-muted">
            Price Transparency Grade
          </span>
          <div className="flex items-center gap-1">
            {["A", "B", "C", "D", "F"].map((g) => (
              <span
                key={g}
                className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] font-display italic text-[9px] leading-none ${
                  g === "A"
                    ? "bg-sage text-cream"
                    : "border border-ink/15 text-ink/45"
                }`}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Rank rows */}
        <div className="mt-2.5 flex-1">
          {[
            { r: "01", n: "Midi Health", g: "A", s: "9.1" },
            { r: "02", n: "Alloy", g: "A", s: "8.7" },
            { r: "03", n: "Winona", g: "B", s: "8.5" },
          ].map((row) => (
            <div
              key={row.r}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center py-1.5 border-b border-ink/5"
            >
              <span className="font-display italic text-bronze text-[11px] w-6">
                {row.r}
              </span>
              <span className="text-[11px] font-medium text-ink">{row.n}</span>
              <span
                className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] font-display italic text-[9px] leading-none ${
                  row.g === "A"
                    ? "bg-sage/10 border border-sage/40 text-sage"
                    : "bg-bronze/10 border border-bronze/40 text-bronze"
                }`}
              >
                {row.g}
              </span>
              <span className="font-display italic text-ink text-[12px] tabular-nums w-6 text-right">
                {row.s}
              </span>
            </div>
          ))}
        </div>

        {/* Footer byline */}
        <div className="mt-2 pt-2 border-t border-ink/10 flex items-center justify-between text-[7.5px] text-muted uppercase tracking-[0.2em]">
          <span>From the team behind GLP-1 Picks</span>
          <span className="font-display italic normal-case text-sage">
            See the rankings →
          </span>
        </div>
      </div>
    </div>
  );
}
