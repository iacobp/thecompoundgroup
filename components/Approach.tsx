import Image from "next/image";
import { Reveal } from "./Reveal";

const principles = [
  {
    num: "I",
    label: "Transparency",
    body:
      "Every methodology published. Every affiliate disclosed. Every price shown all-in. If we can't say it out loud, we don't put it on the site.",
  },
  {
    num: "II",
    label: "Specificity",
    body:
      "Generic advice is a lie told politely. We name the provider. Name the price. Name the trade-off. Even when it costs us a commission.",
  },
  {
    num: "III",
    label: "Compounding",
    body:
      "GLP-1 feeds supplements. Supplements feed peptides. Peptides feed the mind. Pet health feeds all of it. Trust, once earned, doesn't start over.",
  },
  {
    num: "IV",
    label: "Patience",
    body:
      "We build for ten years, not ten weeks. Acquisition-ready means defensible — not in a rush to be sold.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="py-28 md:py-44 border-t border-border relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -left-10 top-24 font-display italic text-ink/[0.04] text-[400px] leading-none pointer-events-none select-none hidden md:block"
      >
        *
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-5 mb-20 md:mb-32">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              †
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              The manifesto
            </span>
          </div>
        </Reveal>

        {/* Manifesto */}
        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-28 md:mb-40">
          <Reveal className="col-span-12 md:col-span-9 md:col-start-3">
            <p className="font-display text-ink text-[32px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-snug">
              Most consumer health is a pitch.{" "}
              <em className="italic text-sage">Sponsored content dressed as advice</em>.{" "}
              <em className="italic text-sage">Membership fees hiding real prices</em>.{" "}
              <em className="italic text-sage">
                Comparison sites that only rank their advertisers
              </em>
              .
            </p>
            <p className="font-display text-ink/70 text-[28px] md:text-[44px] lg:text-[52px] leading-[1.15] tracking-snug mt-10 md:mt-14">
              We build the <span className="text-ink">opposite</span>.{" "}
              <em className="italic text-sage/90">Slowly</em>.
            </p>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
                <span className="inline-block h-px w-8 bg-ink/40" />
                <span>Principles</span>
              </div>
              <p className="font-display italic text-ink/80 text-[19px] md:text-[22px] leading-[1.4] mb-8 max-w-[28ch]">
                Four commitments. Every brand in the portfolio signs up for all four.
              </p>
              <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-sm">
                <Image
                  src="/images/notebook-detail.jpg"
                  alt="Crystalline molecular network rendered in warm light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ink/10"
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
                Research · Atom by atom
              </p>
            </div>
          </Reveal>

          <div className="col-span-12 md:col-span-8">
            <div className="divide-y divide-border border-t border-b border-border">
              {principles.map((p, i) => (
                <Reveal key={p.num} delay={i * 120}>
                  <article className="grid grid-cols-12 gap-6 py-10 md:py-14 items-start">
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
                        {p.num}
                      </span>
                    </div>
                    <div className="col-span-10 md:col-span-4">
                      <div className="font-display text-ink text-[32px] md:text-[40px] leading-[0.95] tracking-snug">
                        {p.label}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink/80 max-w-[46ch]">
                        {p.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
