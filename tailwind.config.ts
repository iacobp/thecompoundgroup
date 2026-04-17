import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1A",
        cream: "#F4F1EB",
        sand: "#EFEBE4",
        sage: "#3B5D4F",
        "sage-soft": "#5A7A6E",
        bronze: "#8B6F47",
        muted: "#6B6A66",
        border: "#E3DED1",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        snug: "-0.02em",
      },
    },
  },
  plugins: [],
} satisfies Config;
