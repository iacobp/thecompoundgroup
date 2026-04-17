/**
 * Editorial thumbnail for GLP-1 Tracker.
 * A phone-shaped mockup showing a dose-tracking screen.
 */
export function GLP1TrackerThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EFEBE4] to-[#E3DED1]">
      {/* Faint background grid for editorial texture */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden>
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="#1C1C1A" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="300" stroke="#1C1C1A" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Phone */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* phone body */}
        <g transform="translate(128, 24)">
          <rect x="0" y="0" width="144" height="260" rx="22" fill="#1C1C1A" />
          <rect x="5" y="5" width="134" height="250" rx="18" fill="#FFFFFF" />

          {/* notch */}
          <rect x="58" y="9" width="28" height="5" rx="2.5" fill="#1C1C1A" />

          {/* status bar */}
          <text x="14" y="28" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fill="#1C1C1A" fontWeight="600">9:41</text>

          {/* Greeting */}
          <text x="14" y="54" fontFamily="Georgia, serif" fontSize="10" fontStyle="italic" fill="#6B6A66">Tuesday</text>
          <text x="14" y="70" fontFamily="Georgia, serif" fontSize="14" fill="#1C1C1A">Your dose</text>

          {/* Dose card */}
          <rect x="10" y="82" width="124" height="60" rx="10" fill="#3B5D4F" />
          <text x="20" y="102" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fill="#F4F1EB" letterSpacing="0.1em">SEMAGLUTIDE</text>
          <text x="20" y="120" fontFamily="Georgia, serif" fontSize="18" fill="#F4F1EB">0.5 mg</text>
          <text x="20" y="134" fontFamily="Inter, system-ui, sans-serif" fontSize="6.5" fill="#F4F1EB" opacity="0.7">Due today · Left thigh</text>

          {/* Week strip */}
          <text x="14" y="160" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fill="#6B6A66" letterSpacing="0.1em">WEEK 12</text>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
            const done = i <= 1;
            const today = i === 2;
            return (
              <g key={i} transform={`translate(${14 + i * 17}, 170)`}>
                <circle cx="6" cy="6" r="6" fill={today ? "#3B5D4F" : done ? "#1C1C1A" : "#E3DED1"} />
                <text x="6" y="9" fontFamily="Inter, system-ui, sans-serif" fontSize="6" fill={today || done ? "#F4F1EB" : "#6B6A66"} textAnchor="middle" fontWeight="600">{d}</text>
              </g>
            );
          })}

          {/* Metric row */}
          <text x="14" y="204" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fill="#6B6A66" letterSpacing="0.1em">WEIGHT</text>
          <text x="14" y="220" fontFamily="Georgia, serif" fontSize="14" fill="#1C1C1A">184.2 lb</text>
          <text x="58" y="220" fontFamily="Georgia, serif" fontSize="10" fontStyle="italic" fill="#3B5D4F">−12.4</text>

          {/* Switch nudge */}
          <rect x="10" y="230" width="124" height="18" rx="6" fill="#F4F1EB" stroke="#E3DED1" />
          <text x="18" y="242" fontFamily="Inter, system-ui, sans-serif" fontSize="6.5" fill="#1C1C1A">Switch to save $60/mo →</text>
        </g>

        {/* Corner label */}
        <text x="26" y="40" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fill="#6B6A66" letterSpacing="0.2em">IN DEVELOPMENT</text>
        <text x="26" y="58" fontFamily="Georgia, serif" fontSize="20" fontStyle="italic" fill="#1C1C1A">Track</text>
        <text x="26" y="78" fontFamily="Georgia, serif" fontSize="20" fontStyle="italic" fill="#1C1C1A">switch</text>
        <text x="26" y="98" fontFamily="Georgia, serif" fontSize="20" fontStyle="italic" fill="#3B5D4F">save.</text>
      </svg>
    </div>
  );
}
