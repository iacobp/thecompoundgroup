"use client";

import Link from "next/link";
import { Monogram } from "./Monogram";
import { useEffect, useState } from "react";

type NavVariant = "auto" | "dark";

export function Nav({ variant = "auto" }: { variant?: NavVariant } = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On dedicated dark pages (like /barque) the hero is dark, but the body
  // sections are cream — so we still want the scroll-based transition.
  // "dark" variant keeps text cream at the top and only transitions after scroll.
  const textClass = scrolled ? "text-ink" : "text-cream";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled
          ? "pt-3 pb-3 backdrop-blur-md bg-cream/85 border-b border-border"
          : variant === "dark"
          ? "pt-7 pb-4 bg-transparent"
          : "pt-7 pb-4 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 flex items-center justify-between">
        <Link
          href="/"
          aria-label="The Compound Group — home"
          className="group inline-flex items-center gap-3"
        >
          <Monogram size="sm" variant={scrolled ? "solid" : "outline"} />
          <span
            className={`font-display text-[20px] md:text-[22px] tracking-snug transition-colors duration-500 ${textClass}`}
          >
            The Compound Group
          </span>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-9 text-[14px] transition-colors duration-500 ${
            scrolled ? "text-ink/70" : "text-cream/80"
          }`}
        >
          <Link
            href="/#portfolio"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/barque"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Barque
          </Link>
          <Link
            href="/#approach"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Approach
          </Link>
          <Link
            href="/#contact"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
