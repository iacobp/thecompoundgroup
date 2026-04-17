type MonogramProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "outline" | "ghost" | "cream";
};

/**
 * Simple CG monogram — a solid circle with "CG" in Instrument Serif.
 * One shape, two letters. Minimal, editorial, recognizable.
 */
export function Monogram({ size = "md", variant = "solid" }: MonogramProps) {
  const dim = {
    sm: "h-9 w-9 text-[13px]",
    md: "h-12 w-12 text-[16px]",
    lg: "h-20 w-20 text-[28px]",
    xl: "h-[440px] w-[440px] text-[180px]",
  }[size];

  const look = {
    solid: "bg-ink text-cream",
    outline: "bg-transparent text-ink border border-ink/40",
    ghost: "bg-transparent text-ink/[0.06] border border-ink/[0.06]",
    cream: "bg-cream text-ink",
  }[variant];

  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-full font-display leading-none tracking-[-0.02em] ${dim} ${look}`}
    >
      <span className="-translate-y-[0.03em]">CG</span>
    </span>
  );
}
