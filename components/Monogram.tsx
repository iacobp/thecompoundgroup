type MonogramProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "outline" | "ghost";
};

/**
 * CG monogram lockup.
 * Used in nav (sm), hero backdrop (xl), footer (lg).
 */
export function Monogram({ size = "md", variant = "solid" }: MonogramProps) {
  const dim = {
    sm: "h-9 w-9 text-[18px]",
    md: "h-12 w-12 text-[24px]",
    lg: "h-20 w-20 text-[44px]",
    xl: "h-[440px] w-[440px] text-[240px]",
  }[size];

  const look = {
    solid: "bg-ink text-cream",
    outline: "bg-transparent text-ink border border-ink/30",
    ghost: "bg-transparent text-ink/[0.06]",
  }[variant];

  return (
    <span
      aria-hidden
      className={`relative inline-flex items-center justify-center rounded-full font-display leading-none ${dim} ${look}`}
    >
      <span className="-translate-y-[0.04em]">C</span>
      <span
        className="absolute -bottom-[0.04em] -right-[0.04em] translate-x-[28%] translate-y-[28%] inline-flex items-center justify-center rounded-full bg-cream text-ink font-display"
        style={{
          height: size === "xl" ? "56%" : "54%",
          width: size === "xl" ? "56%" : "54%",
          fontSize: "0.45em",
          boxShadow: "0 0 0 2px #1C1C1A inset",
        }}
      >
        <span className="-translate-y-[0.04em]">G</span>
      </span>
    </span>
  );
}
