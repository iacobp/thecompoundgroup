/**
 * Editorial thumbnail for Revolume.
 * A stylized rendering of the actual landing page hero — cream
 * backdrop with the locked "Don't lose your face" tagline and the
 * waitlist CTA, alongside a subtle face-scan landmark visual.
 */
export function RevolumeThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#FAF7F2]">
      {/* Paper-grain / radial gradients matching the real site */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(62,142,126,0.08) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(138,58,74,0.05) 0%, transparent 45%)",
        }}
      />

      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 h-9 bg-[#F1ECE1] border-b border-[#E3DED1] flex items-center gap-1.5 px-4 z-10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="mx-auto -translate-x-4 flex items-center gap-1.5 text-[10px] text-ink/60 font-mono">
          <span>🔒</span>
          <span>revolume.app</span>
        </div>
      </div>

      {/* Page content */}
      <div className="absolute inset-x-0 top-9 bottom-0 px-6 pt-5 pb-4 flex">
        {/* Hero copy column */}
        <div className="flex-1 pr-4">
          {/* Nav */}
          <div className="flex items-baseline gap-2.5 mb-5">
            <span className="font-display italic text-ink text-[13px] leading-none">
              Revolume
            </span>
            <span className="text-[7px] uppercase tracking-[0.22em] text-ink/40">
              A Compound product
            </span>
          </div>

          {/* Kicker */}
          <div className="text-[7.5px] uppercase tracking-[0.22em] text-[#3e8e7e] mb-3">
            For Ozempic · Wegovy · Mounjaro · Zepbound
          </div>

          {/* Headline */}
          <div className="font-display text-ink text-[24px] leading-[0.98] tracking-tight">
            You lost the weight.
          </div>
          <div className="font-display italic text-[#2e6b5f] text-[24px] leading-[0.98] tracking-tight">
            Don&apos;t lose your face.
          </div>

          {/* Subhead */}
          <div className="mt-3 text-[8.5px] leading-[1.45] text-ink/60 max-w-[28ch]">
            Track facial volume changes on GLP-1. 15 skin markers in 60 seconds.
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2">
            <div className="rounded-md bg-[#3e8e7e] text-[#faf7f2] text-[8.5px] font-medium px-3 py-1.5">
              Join the waitlist
            </div>
            <div className="rounded-md border border-ink/15 text-ink/60 text-[7px] px-2 py-1.5 flex items-baseline gap-1">
              <span className="uppercase tracking-[0.14em] text-[6px]">Coming</span>
              <span className="font-display italic text-[8.5px] text-ink">iPhone</span>
            </div>
          </div>

          {/* Source line */}
          <div className="mt-4 text-[6.5px] italic text-ink/45 leading-[1.5] max-w-[34ch] font-display">
            Cited: Vanderbilt Facial Volume Study, JCD 2026, ASDS.
          </div>
        </div>

        {/* Scan visualization column */}
        <div className="w-[32%] relative">
          {/* Face oval with landmark dots */}
          <svg viewBox="0 0 120 160" className="absolute inset-0 w-full h-full">
            {/* Face outline */}
            <ellipse
              cx="60"
              cy="80"
              rx="34"
              ry="48"
              fill="none"
              stroke="#3e8e7e"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              opacity="0.55"
            />
            {/* Jawline arc */}
            <path
              d="M 28 92 Q 60 130 92 92"
              fill="none"
              stroke="#3e8e7e"
              strokeWidth="0.6"
              strokeDasharray="1.5 2"
              opacity="0.45"
            />
            {/* Volume markers */}
            {[
              [42, 70, "#2e6b5f"],
              [78, 70, "#2e6b5f"],
              [60, 88, "#8a3a4a"],
              [46, 100, "#2e6b5f"],
              [74, 100, "#2e6b5f"],
              [60, 50, "#1c1a17"],
              [36, 80, "#3e8e7e"],
              [84, 80, "#3e8e7e"],
            ].map(([cx, cy, fill], i) => (
              <circle
                key={i}
                cx={cx as number}
                cy={cy as number}
                r={1.4}
                fill={fill as string}
              />
            ))}
            {/* Tiny connector labels */}
            <line
              x1="78"
              y1="70"
              x2="100"
              y2="62"
              stroke="#3e8e7e"
              strokeWidth="0.3"
              opacity="0.7"
            />
            <line
              x1="74"
              y1="100"
              x2="100"
              y2="110"
              stroke="#8a3a4a"
              strokeWidth="0.3"
              opacity="0.7"
            />
          </svg>

          {/* Absolute labels */}
          <div className="absolute right-0 top-[34%] text-[6px] text-[#2e6b5f] font-medium tracking-tight">
            Cheek volume
          </div>
          <div className="absolute right-0 top-[66%] text-[6px] text-[#8a3a4a] font-medium tracking-tight">
            Jawline laxity
          </div>
          <div className="absolute bottom-0 right-0 font-display italic text-[#2e6b5f] text-[10px] leading-none">
            15 markers
          </div>
        </div>
      </div>
    </div>
  );
}
