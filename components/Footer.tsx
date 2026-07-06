import { Reveal } from "./Reveal";
import { Monogram } from "./Monogram";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="bg-ink text-cream py-24 md:py-36 relative overflow-hidden"
    >
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

            <h2 className="font-display text-cream text-[34px] sm:text-[40px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-tightest mb-8 md:mb-10 max-w-[18ch]">
              Press, partnerships,{" "}
              <em className="italic text-sage-soft">and acquisitions.</em>
            </h2>

            <MagneticButton
              href="mailto:hello@thecompound.group"
              ariaLabel="Email hello@thecompound.group"
              strength={0.25}
              className="font-display italic text-cream text-[20px] sm:text-[24px] md:text-[32px] link-line break-all"
            >
              <span className="inline-flex items-center gap-3">
                hello@thecompound.group
                <span aria-hidden className="text-[0.6em] opacity-70">→</span>
              </span>
            </MagneticButton>

            <p className="mt-10 max-w-[52ch] text-[14px] md:text-[15px] leading-[1.7] text-cream/65">
              The inbox is read by a human — a single principal, working with
              AI-assisted engineering and content teams. Most inbound messages
              get a reply within a day.
            </p>
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
                  <div className="text-[12px] text-cream/55 mt-1">
                    Provider comparison — Live
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://hrtpicks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-cream/15 pb-4 hover:border-cream/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-cream text-[22px]">
                      HRT Picks
                    </span>
                    <span
                      aria-hidden
                      className="text-cream/50 text-[14px] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    >
                      ↗
                    </span>
                  </div>
                  <div className="text-[12px] text-cream/55 mt-1">
                    Hormone telehealth comparison — Live
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://glp1pets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-cream/15 pb-4 hover:border-cream/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-cream text-[22px]">
                      GLP-1 Pets
                    </span>
                    <span
                      aria-hidden
                      className="text-cream/50 text-[14px] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    >
                      ↗
                    </span>
                  </div>
                  <div className="text-[12px] text-cream/55 mt-1">
                    Veterinary GLP-1 tracker — Live
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://titrate.health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-cream/15 pb-4 hover:border-cream/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-cream text-[22px]">
                      Titrate
                    </span>
                    <span
                      aria-hidden
                      className="text-cream/50 text-[14px] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    >
                      ↗
                    </span>
                  </div>
                  <div className="text-[12px] text-cream/55 mt-1">
                    Peptide & GLP-1 tracker — Live
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://revolume.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-cream/15 pb-4 hover:border-cream/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-cream text-[22px]">
                      Revolume
                    </span>
                    <span
                      aria-hidden
                      className="text-cream/50 text-[14px] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    >
                      →
                    </span>
                  </div>
                  <div className="text-[12px] text-cream/55 mt-1">
                    Skin scan for GLP-1 — In development
                  </div>
                </a>
              </li>
            </ul>

            <div className="mt-10 text-[13px] leading-[1.7] text-cream/55">
              <em className="italic">Forthcoming:</em> Supplement Index,
              Peptide Index, the Neuroscience Index, and the Neuroplasticity
              Lab as a distinct product alongside it.
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
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] text-cream/55">
            <span>© {year} The Compound Group</span>
            <span className="font-display italic text-cream/75">
              A research-led studio for consumer health.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
