import Image from "next/image";
import { Reveal } from "./Reveal";

const principles = [
  {
    num: "I",
    label: "Transparency",
    body:
      "The scoring methodology for every ranking is published in full on the site, not buried in a FAQ or promised in an about page. Affiliate relationships are disclosed on the pages where they're relevant, so a reader can tell when a click earns us a commission and when it doesn't. Pricing is reported as the ongoing monthly cost a typical patient will actually pay — even when that number makes a partner look more expensive than their marketing rate suggests.",
  },
  {
    num: "II",
    label: "Specificity",
    body:
      "General advice is almost always less useful than it sounds. Our content names the specific program, quotes the specific cost, and describes the specific trade-off — because that is the only way a reader can weigh one option against another. Occasionally this choice costs us affiliate revenue. It's a trade we think is worth making for the kind of reader who comes back.",
  },
  {
    num: "III",
    label: "Compounding",
    body:
      "Each property in the portfolio extends the same research discipline into an adjacent category. The audience that trusts our GLP-1 work is the same audience looking for supplement guidance; the database infrastructure built for one transfers directly to the next. Pet health broadens the methodology to a parallel customer base, and the neuroscience work reads to a different reader entirely — but the underlying process travels.",
  },
  {
    num: "IV",
    label: "Patience",
    body:
      "Studios built on short time horizons tend to optimize for growth numbers that don't survive a due diligence process. We'd rather build slowly and end up with something defensible — content that ages well, data that's actually audited, partner relationships that hold. If an acquisition is part of the story, it happens because the work can stand up to scrutiny, not because a deadline demands it.",
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
              Operating principles
            </span>
          </div>
        </Reveal>

        {/* Flowing manifesto */}
        <div className="grid grid-cols-12 gap-6 md:gap-14 mb-28 md:mb-40">
          <Reveal className="col-span-12 md:col-span-9 md:col-start-3">
            <p className="font-display text-ink text-[28px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-snug">
              Consumer health is a category where the incentives rarely line
              up with clarity. Content is written to sell, pricing is
              structured to win the comparison on the headline number, and
              comparison tools themselves tend to optimize for commission
              rather than fit. None of this is malicious — it is simply how
              the economics work out when most participants have{" "}
              <em className="italic text-sage">something to sell</em>.
            </p>
            <p className="font-display text-ink/85 text-[24px] md:text-[36px] lg:text-[44px] leading-[1.2] tracking-snug mt-10 md:mt-14">
              We&apos;re trying to operate with the priorities reversed —{" "}
              <em className="italic text-sage">research before opinion</em>,
              methodology before recommendation, and affiliate revenue as a
              consequence of useful work rather than the driver of it.
            </p>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
                <span className="inline-block h-px w-8 bg-ink/40" />
                <span>Four commitments</span>
              </div>
              <p className="font-display italic text-ink/80 text-[19px] md:text-[22px] leading-[1.5] mb-8 max-w-[30ch]">
                The four operating constraints each property in the portfolio
                is built around, regardless of category or stage.
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
                Research · Structured and maintained
              </p>
            </div>
          </Reveal>

          <div className="col-span-12 md:col-span-8">
            <div className="divide-y divide-border border-t border-b border-border">
              {principles.map((p, i) => (
                <Reveal key={p.num} delay={i * 120}>
                  <article className="grid grid-cols-12 gap-6 py-12 md:py-16 items-start">
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
                      <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink/80 max-w-[52ch]">
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
