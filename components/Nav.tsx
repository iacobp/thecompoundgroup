"use client";

import Link from "next/link";
import { Monogram } from "./Monogram";
import { useEffect, useState } from "react";

type NavVariant = "auto" | "dark";

const links = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/numbers", label: "Ledger" },
  { href: "/atlas", label: "Atlas" },
  { href: "/barque", label: "Barque" },
  { href: "/#approach", label: "Approach" },
  { href: "/#contact", label: "Contact" },
];

export function Nav({ variant = "auto" }: { variant?: NavVariant } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the drawer if the viewport grows past the md breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // On dedicated dark pages (like /barque) the hero is dark, but the body
  // sections are cream — so we still want the scroll-based transition.
  // "dark" variant keeps text cream at the top and only transitions after scroll.
  const textClass = scrolled ? "text-ink" : "text-cream";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
          scrolled
            ? "pt-3 pb-3 backdrop-blur-md bg-cream/85 border-b border-border"
            : variant === "dark"
            ? "pt-6 md:pt-7 pb-4 bg-transparent"
            : "pt-6 md:pt-7 pb-4 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 md:px-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="The Compound Group — home"
            className="group inline-flex items-center gap-2.5 md:gap-3 min-w-0"
            onClick={() => setOpen(false)}
          >
            <Monogram size="sm" variant={scrolled ? "solid" : "outline"} />
            <span
              className={`font-display text-[17px] sm:text-[19px] md:text-[22px] tracking-snug truncate transition-colors duration-500 ${textClass}`}
            >
              The Compound Group
            </span>
          </Link>

          <nav
            className={`hidden md:flex items-center gap-9 text-[14px] transition-colors duration-500 ${
              scrolled ? "text-ink/70" : "text-cream/80"
            }`}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-line transition-colors ${
                  scrolled ? "hover:text-ink" : "hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            className={`md:hidden relative z-[60] -mr-2 p-2 inline-flex items-center justify-center transition-colors ${
              open ? "text-cream" : textClass
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden
              className="relative block h-4 w-6"
            >
              <span
                className={`absolute left-0 right-0 top-0 h-px bg-current transition-all duration-300 ease-out ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-[7px] h-px bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 right-0 bottom-0 h-px bg-current transition-all duration-300 ease-out ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer — full-bleed ink panel, fades/slides over content */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute inset-0 flex flex-col px-6 pt-[92px] pb-10 transition-transform duration-500 ease-out ${
            open ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cream/55 mb-10">
            <span className="inline-block h-px w-8 bg-cream/40" />
            <span>Menu</span>
          </div>
          <nav className="flex flex-col gap-7">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display text-cream text-[36px] sm:text-[44px] leading-[1.05] tracking-tightest transition-all duration-500 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                {l.label}
                <span className="text-sage-soft italic">.</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-10 border-t border-cream/15">
            <div className="flex items-center gap-3">
              <Monogram size="sm" variant="cream" />
              <span className="font-display italic text-cream/65 text-[14px]">
                A research-led studio for consumer health
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
