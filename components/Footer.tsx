import { Reveal } from "./Reveal";
import { Monogram } from "./Monogram";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="bg-ink text-cream py-24 md:py-36 relative overflow-hidden"
    >
      {/* Huge background monogram */}
      <div
        aria-hidden
        className="absolute -right-20 -bottom-32 font-display text-cream/[0.04] text-[500px] leading-none select-none pointer-events-none hidden md:block"
      >
        CG
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display italic text-cream/60 text-[22px]">¶</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-cream/50">
                Get in touch
              </span>
            </div>

            <h2 className="font-display text-cream text-[44px] md:text-[72px] lg:text-[92px] leading-[0.95] tracking-tightest mb-10">
              Press, partnerships,
              <br />
              <em className="italic text-sage-soft">and acquisitions.</em>
            </h2>

            <a
              href="mailto:hello@thecompound.group"
              className="inline-flex items-center gap-3 font-display italic text-cream text-[26px] md:text-[36px] link-line"
            >
              hello@thecompound.group
              <span aria-hidden className="text-[0.6em] opacity-70">→</span>
            </a>
          </Reveal>

          <Reveal delay={200} className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-6">
              Portfolio
            </div>
            <ul className="space-y-5">
              <li>
                <a
                  href="https://glp1picks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-cream/15 pb-4 hover:border-cream/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-cream text-[22px]">
                      GLP-1 Picks
                    </span>
                    <span
                      aria-hidden
                      className="text-cream/50 text-[14px] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    >
                      ↗
                    </span>
                  </div>
                  <div className="text-[12px] text-cream/50 mt-1">
                    Provider comparison · Live
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/tracker"
                  className="group block border-b border-cream/15 pb-4 hover:border-cream/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-cream text-[22px]">
                      GLP-1 Tracker
                    </span>
                    <span
                      aria-hidden
                      className="text-cream/50 text-[14px] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    >
                      →
                    </span>
                  </div>
                  <div className="text-[12px] text-cream/50 mt-1">
                    Mobile app · In development
                  </div>
                </a>
              </li>
            </ul>

            <div className="mt-10 text-[13px] leading-[1.6] text-cream/60">
              Operated remotely. Single operator with AI-assisted teams across
              engineering, content, and growth.
            </div>
          </Reveal>
        </div>

        <div className="mt-24 md:mt-36 pt-8 border-t border-cream/15 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Monogram size="sm" variant="outline" />
            <span className="font-display text-cream text-[18px]">
              The Compound Group
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] text-cream/50">
            <span>© {year} The Compound Group</span>
            <span className="font-display italic text-cream/70">
              Consumer health, built honestly.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
