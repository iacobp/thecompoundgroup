/**
 * Editorial thumbnail for GLP-1 Picks.
 * A stylised rankings card — not a screenshot, but evocative of one.
 * Pure SVG for crisp rendering at any size.
 */
export function GLP1PicksThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-white to-[#EFEBE4]">
      {/* subtle top chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 px-5 pt-4">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 font-display text-[13px] italic text-ink/50">
          glp1picks.com
        </span>
      </div>

      {/* content */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Title strip */}
        <text
          x="26"
          y="68"
          fontFamily="Georgia, serif"
          fontSize="20"
          fill="#1C1C1A"
          fontStyle="italic"
        >
          Top GLP-1 providers
        </text>
        <text
          x="26"
          y="86"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
          fill="#6B6A66"
          letterSpacing="0.12em"
        >
          RANKED BY ALL-IN PRICE · APRIL 2026
        </text>

        {/* Rank rows — staggered tones convey hierarchy */}
        {[
          { rank: "01", name: "Eden Health", price: "$249", score: "8.9", highlight: true },
          { rank: "02", name: "Sprout Health", price: "$259", score: "8.6" },
          { rank: "03", name: "Strut Health", price: "$269", score: "8.4" },
          { rank: "04", name: "Sesame Care", price: "$189", score: "8.2" },
        ].map((r, i) => {
          const y = 112 + i * 40;
          return (
            <g key={r.rank}>
              {r.highlight && (
                <rect x="16" y={y - 20} width="368" height="34" rx="8" fill="#3B5D4F" opacity="0.06" />
              )}
              <text x="30" y={y} fontFamily="Georgia, serif" fontSize="14" fill="#8B6F47" fontStyle="italic">
                {r.rank}
              </text>
              <text x="60" y={y} fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#1C1C1A" fontWeight="500">
                {r.name}
              </text>
              <text x="260" y={y} fontFamily="Inter, system-ui, sans-serif" fontSize="12" fill="#6B6A66">
                {r.price}/mo
              </text>
              <text x="340" y={y} fontFamily="Georgia, serif" fontSize="14" fill={r.highlight ? "#3B5D4F" : "#1C1C1A"} fontStyle="italic">
                {r.score}
              </text>
            </g>
          );
        })}

        {/* Footer line */}
        <line x1="16" y1="280" x2="384" y2="280" stroke="#1C1C1A" strokeOpacity="0.08" />
      </svg>
    </div>
  );
}
