export function Approach() {
  return (
    <section id="approach" className="py-20 md:py-32 border-t border-border bg-sand">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {/* Section label */}
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted sticky top-10">
              <span className="inline-block h-px w-8 bg-ink/40" />
              <span>Approach</span>
            </div>
          </div>

          {/* Thesis body */}
          <div className="col-span-12 md:col-span-9 space-y-10">
            <p className="font-display text-ink text-[28px] md:text-[40px] leading-[1.15] tracking-snug max-w-[26ch]">
              Consumer health is{" "}
              <em className="italic text-sage">full of noise</em> — sponsored
              content dressed as advice, membership fees hiding true prices,
              comparison sites that only rank their advertisers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-4">
              <div>
                <div className="font-display italic text-bronze text-[18px] mb-3">
                  What we build
                </div>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink/80">
                  Honest comparison tools, transparent pricing, and apps that
                  serve the user over the advertiser. We earn when we direct
                  people to the <em className="italic">right</em> fit — never
                  when we sell a spot on a leaderboard.
                </p>
              </div>
              <div>
                <div className="font-display italic text-bronze text-[18px] mb-3">
                  Where we play
                </div>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink/80">
                  Regulated categories where the stakes matter: GLP-1,
                  supplements, peptides, neuroscience. Markets confusing enough
                  that truthful comparison is itself a product.
                </p>
              </div>
              <div>
                <div className="font-display italic text-bronze text-[18px] mb-3">
                  How we win
                </div>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink/80">
                  Programmatic SEO, editorial depth, affiliate infrastructure,
                  and AI-assisted operations. One operator, a small portfolio,
                  compound effects.
                </p>
              </div>
              <div>
                <div className="font-display italic text-bronze text-[18px] mb-3">
                  Why it compounds
                </div>
                <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink/80">
                  Every brand shares audience, infrastructure, and editorial
                  methodology. GLP-1 Picks feeds supplements. Supplements feed
                  peptides. Trust, once earned, travels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
