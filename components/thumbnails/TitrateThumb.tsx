/**
 * Editorial thumbnail for Titrate.
 * Peptide + GLP-1 multi-compound tracker. A phone on warm backdrop
 * with the clinical, compound-pharmacy vocabulary the app uses.
 */
export function TitrateThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-gradient-to-br from-[#EFEBE4] via-[#E8E2D3] to-[#DCD5C4]">
      {/* Soft corner light */}
      <div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #F8F4EC 0%, transparent 70%)" }}
      />

      {/* Top-left editorial label */}
      <div className="absolute top-5 left-5 z-10">
        <div className="text-[9px] uppercase tracking-[0.26em] text-ink/55">
          Titrate
        </div>
        <div className="font-display italic text-ink text-[22px] leading-none mt-1.5">
          Peptide & GLP-1
        </div>
        <div className="mt-3 h-px w-10 bg-ink/25" />
        <div className="mt-3 text-[10px] text-ink/60 leading-[1.4] max-w-[150px]">
          Reconstitution, doses,<br />
          stacks, side effects.<br />
          One app. Every unit.
        </div>
      </div>

      {/* Bottom-right tiny data annotation */}
      <div className="absolute bottom-4 right-5 z-10 text-right">
        <div className="font-display italic text-sage text-[13px]">
          iOS first
        </div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-ink/45">
          Launching 2026
        </div>
      </div>

      {/* Phone */}
      <div className="absolute right-[8%] top-[10%] bottom-[12%] aspect-[9/19] pointer-events-none">
        <div className="h-full w-full rounded-[14%/6%] bg-[#0E0E0C] p-[3%] shadow-[0_30px_60px_-12px_rgba(14,14,12,0.45)]">
          <div className="relative h-full w-full rounded-[11%/5%] bg-gradient-to-b from-[#FAF6EC] to-[#F4EFE1] overflow-hidden">
            {/* Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[2%] h-[3%] w-[34%] rounded-full bg-[#0E0E0C]" />

            {/* Status */}
            <div className="absolute inset-x-0 top-[1.2%] flex justify-between px-[8%] text-[5.5px] font-semibold text-ink">
              <span>9:41</span>
              <span className="flex items-center gap-0.5">
                <span className="inline-block h-0.5 w-2.5 rounded-sm bg-ink" />
                <span className="inline-block h-1 w-1 rounded-sm bg-ink" />
              </span>
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 top-[8%] px-[8%]">
              <div className="font-display italic text-muted text-[6px]">
                Monday, April 14
              </div>
              <div className="font-display text-ink text-[11px] leading-none mt-1">
                Today's stack
              </div>

              {/* Stack card — 2 compounds */}
              <div className="mt-2.5 rounded-[8px] bg-sage p-2.5 text-cream relative overflow-hidden">
                <div
                  className="absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-30"
                  style={{
                    background: "radial-gradient(circle, #6A8F82 0%, transparent 70%)",
                  }}
                />
                <div className="text-[4.5px] uppercase tracking-[0.18em] opacity-80">
                  Tirzepatide
                </div>
                <div className="font-display text-[13px] leading-none mt-1">
                  5.0 <span className="text-[9px] opacity-85">mg</span>
                </div>
                <div className="text-[4.5px] opacity-75 mt-1">
                  Due today · Left abdomen
                </div>
              </div>

              {/* Peptide row */}
              <div className="mt-2 rounded-[6px] border border-ink/10 bg-cream/60 p-1.5 flex items-center justify-between">
                <div>
                  <div className="text-[4.5px] uppercase tracking-[0.18em] text-muted">
                    BPC-157
                  </div>
                  <div className="font-display text-ink text-[9px] leading-none mt-0.5">
                    250 <span className="text-[6px] text-muted">mcg</span>
                  </div>
                </div>
                <div className="text-[5px] text-sage font-semibold uppercase tracking-[0.2em]">
                  ✓ Logged
                </div>
              </div>

              {/* Day dots */}
              <div className="mt-2.5 flex justify-between">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                  const done = i <= 1;
                  const today = i === 2;
                  return (
                    <div
                      key={i}
                      className={`h-3 w-3 rounded-full flex items-center justify-center text-[4px] font-semibold ${
                        today
                          ? "bg-sage text-cream"
                          : done
                          ? "bg-ink text-cream"
                          : "bg-ink/10 text-ink/50"
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>

              {/* Reconstitution calc nudge */}
              <div className="mt-3 rounded-md border border-sage/25 bg-cream/60 p-1.5">
                <div className="text-[4.5px] uppercase tracking-[0.18em] text-sage">
                  Reconstitution
                </div>
                <div className="text-[6px] text-ink leading-[1.3] mt-0.5">
                  10 mg vial · 2 mL BAC ·{" "}
                  <span className="font-semibold">0.25 mL per 1.25 mg</span>
                </div>
              </div>

              {/* Weight row */}
              <div className="mt-3 flex items-baseline gap-2">
                <div>
                  <div className="text-[4.5px] uppercase tracking-[0.18em] text-muted">
                    Weight
                  </div>
                  <div className="font-display text-ink text-[11px] leading-none">
                    184.2<span className="text-[7px] text-muted ml-0.5">lb</span>
                  </div>
                </div>
                <div className="font-display italic text-sage text-[9px]">
                  −12.4
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2 h-[0.8%] w-[28%] rounded-full bg-ink/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
