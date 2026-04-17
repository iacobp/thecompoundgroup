import Link from "next/link";

export function Nav() {
  return (
    <header className="pt-8 pb-4 md:pt-10">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 flex items-center justify-between">
        <Link
          href="/"
          aria-label="The Compound Group — home"
          className="group inline-flex items-baseline gap-2"
        >
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream font-display text-[18px] leading-none"
          >
            C
          </span>
          <span className="font-display text-[22px] tracking-snug text-ink">
            The Compound Group
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] text-ink/75">
          <a href="#portfolio" className="link-line hover:text-ink">Portfolio</a>
          <a href="#approach" className="link-line hover:text-ink">Approach</a>
          <a href="#contact" className="link-line hover:text-ink">Contact</a>
        </nav>
      </div>
    </header>
  );
}
