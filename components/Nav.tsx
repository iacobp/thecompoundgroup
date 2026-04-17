"use client";

import Link from "next/link";
import { Monogram } from "./Monogram";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled
          ? "pt-3 pb-3 backdrop-blur-md bg-cream/85 border-b border-border"
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
            className={`font-display text-[20px] md:text-[22px] tracking-snug transition-colors duration-500 ${
              scrolled ? "text-ink" : "text-cream"
            }`}
          >
            The Compound Group
          </span>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-9 text-[14px] transition-colors duration-500 ${
            scrolled ? "text-ink/70" : "text-cream/80"
          }`}
        >
          <a
            href="#portfolio"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Portfolio
          </a>
          <a
            href="#approach"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Approach
          </a>
          <a
            href="#contact"
            className={`link-line transition-colors ${
              scrolled ? "hover:text-ink" : "hover:text-cream"
            }`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
