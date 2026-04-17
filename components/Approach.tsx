import Image from "next/image";
import { Reveal } from "./Reveal";

const principles = [
  {
    num: "I",
    label: "Transparency",
    body:
      "Every methodology published. Every affiliate disclosed. Every price shown all-in.",
  },
  {
    num: "II",
    label: "Specificity",
    body:
      "Generic advice is a lie told politely. We publish the actual numbers, providers, and trade-offs.",
  },
  {
    num: "III",
    label: "Compounding",
    body:
      "Each brand shares audience, methodology, and trust. GLP-1 feeds supplements. Supplements feed peptides. Nothing starts from zero.",
  },
  {
    num: "IV",
    label: "Patience",
    body:
      "We build for ten years, not ten weeks. Acquisition-ready means defensible — not rushed.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="py-28 md:py-44 border-t border-border relative overflow-hidden">
      {/* Oversized decorative mark */}
      <div
        aria-hidden
        className="absolute -left-10 top-24 font-display italic text-ink/[0.04] text-[400px] leading-none pointer-events-none select-none hidden md:block"
      >
        *
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Section label */}
        <Reveal>
          <div className="flex items-baseline gap-5 mb-20 md:mb-32">
            <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
              †
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
              Approach · A studio manifesto
            </span>
          </div>
        </Reveal>

        {/* Manifesto */}
        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-28 md:mb-40">
          <Reveal className="col-span-12 md:col-span-9 md:col-start-3">
            <p className="font-display text-ink text-[32px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-snug">
              Consumer health is full of noise —{" "}
              <em className="italic text-sage">sponsored content dressed as advice</em>,{" "}
              <em className="italic text-sage">membership fees hiding true prices</em>,{" "}
              <em className="italic text-sage">
                comparison sites that only rank their advertisers
              </em>
              .
            </p>
            <p className="font-display text-ink/70 text-[28px] md:text-[44px] lg:text-[52px] leading-[1.15] tracking-snug mt-10 md:mt-14">
              We build the <span className="text-ink">opposite</span>.
            </p>
          </Reveal>
        </div>

        {/* Four principles — with editorial side image */}
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          {/* Sticky sidebar with photograph + header */}
          <Reveal className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
                <span className="inline-block h-px w-8 bg-ink/40" />
                <span>Principles</span>
              </div>
              <p className="font-display italic text-ink/80 text-[19px] md:text-[22px] leading-[1.4] mb-8 max-w-[28ch]">
                Four commitments every brand in the portfolio shares.
              </p>
              <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-sm">
                <Image
                  src="/images/notebook-detail.jpg"
                  alt="Handwritten editorial ledger with data in warm natural light"
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
                Methodology · Annotated
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
                      <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink/80 max-w-[44ch]">
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
