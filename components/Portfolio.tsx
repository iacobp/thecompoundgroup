import { GLP1PicksThumb } from "./thumbnails/GLP1PicksThumb";
import { GLP1PetsThumb } from "./thumbnails/GLP1PetsThumb";
import { HRTPicksThumb } from "./thumbnails/HRTPicksThumb";
import { TitrateThumb } from "./thumbnails/TitrateThumb";
import { RevolumeThumb } from "./thumbnails/RevolumeThumb";
import { Reveal } from "./Reveal";

type Status = "live" | "in-development" | "planned";
type Mode = "built" | "acquired";

type PortfolioItem = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  status: Status;
  mode: Mode;
  href?: string;
  thumb?: React.ReactNode;
  meta: { label: string; value: string }[];
  cta: string;
};

const items: PortfolioItem[] = [
  {
    num: "I",
    name: "GLP-1 Picks",
    tagline:
      "A clear-eyed comparison of the major GLP-1 telehealth programs, priced the way a patient actually pays for them.",
    body:
      "We review forty-eight GLP-1 telehealth programs on three dimensions: the full monthly cost over a typical year, the quality and credentials of the clinical care, and the transparency of the program's pricing structure. The scoring methodology is published in full, the affiliate relationships are disclosed on every page, and the rankings follow directly from the methodology. When we earn a commission on a visit, the page you're reading says so.",
    status: "live",
    mode: "built",
    href: "https://glp1picks.com",
    thumb: <GLP1PicksThumb />,
    meta: [
      { label: "Type", value: "Comparison site" },
      { label: "Revenue", value: "Affiliate" },
      { label: "Since", value: "2026" },
    ],
    cta: "Visit glp1picks.com",
  },
  {
    num: "II",
    name: "HRT Picks",
    tagline:
      "The cleanest read on the HRT telehealth market — built for the women navigating a black-box-warning rewrite and a national patch shortage at the same time.",
    body:
      "In November 2025 the FDA removed black-box warnings from six menopausal hormone therapy products; demand doubled within months and the estradiol patch went into nationwide shortage. We compare every major HRT telehealth — Midi Health, Alloy, Winona, Evernow, Gennev, and the rest — on cost, formulary breadth, clinical depth, patient experience, and transparency. Insurance versus cash-pay is flagged on every page. Affiliate disclosures, too. The score is methodology-driven; affiliate status never moves the rank.",
    status: "live",
    mode: "built",
    href: "https://hrtpicks.vercel.app",
    thumb: <HRTPicksThumb />,
    meta: [
      { label: "Type", value: "Comparison site" },
      { label: "Revenue", value: "Affiliate" },
      { label: "Since", value: "2026" },
    ],
    cta: "Visit hrtpicks.com",
  },
  {
    num: "III",
    name: "GLP-1 Pets",
    tagline:
      "The first dedicated tracker for veterinary GLP-1 — same methodology as the human-side index, applied to the pet chemistry class.",
    body:
      "Sixty-one percent of US cats and fifty-nine percent of US dogs are overweight or obese (APOP). The first pharmaceutical answer is on its way: Okava's MEOW-1 cat trial of an exenatide-releasing implant reads out summer 2026, and Akston Biosciences is running a once-weekly injection at Cornell. Realistic FDA approval for cats is 2027–28, dogs 2028–30. We track every trial milestone, regulatory action, and pricing signal — and tell readers what works today (food, portions, body-condition scoring) until the science lands.",
    status: "live",
    mode: "built",
    href: "https://glp1pets.com",
    thumb: <GLP1PetsThumb />,
    meta: [
      { label: "Type", value: "Authority site" },
      { label: "Revenue", value: "Affiliate (post-launch)" },
      { label: "Since", value: "2026" },
    ],
    cta: "Visit glp1pets.com",
  },
  {
    num: "IV",
    name: "Titrate",
    tagline:
      "A peptide and GLP-1 tracker built around the decisions a patient keeps making — dose, reconstitution, stack, refill, program.",
    body:
      "The core logging works the way these apps should: doses, weight trends, side effects, injection-site rotation. The layer we're adding is decision support. Reconstitution calculators with a unit toggle the category has been missing. Multi-compound stacking past the three-peptide ceiling most apps cap at. And as programs update their pricing structures, formularies, and dose-escalation policies, the app surfaces the ones that continue to fit your situation — so the next refill is a deliberate choice.",
    status: "in-development",
    mode: "built",
    href: "https://titrate.health",
    thumb: <TitrateThumb />,
    meta: [
      { label: "Type", value: "iOS app" },
      { label: "Revenue", value: "Subscription + affiliate" },
      { label: "Launch", value: "Q3 2026" },
    ],
    cta: "Visit titrate.health",
  },
  {
    num: "V",
    name: "Revolume",
    tagline:
      "The skin scan built for GLP-1 — because the weight comes off, and the face follows.",
    body:
      "Sixty-five percent of patients on semaglutide, tirzepatide, or compounded GLP-1s experience facial volume loss within their first six months on the medication. Revolume is a private, on-device skin scan that measures the fifteen markers specific to post-rapid-weight-loss skin — volume, jawline definition, nasolabial depth, laxity — and routes the user to the routine, the telehealth prescription, or the in-clinic procedure that actually fits the stage they're at.",
    status: "in-development",
    mode: "built",
    href: "https://revolume.app",
    thumb: <RevolumeThumb />,
    meta: [
      { label: "Type", value: "Web scan + iOS app" },
      { label: "Revenue", value: "Affiliate + procedure referral" },
      { label: "Launch", value: "2026" },
    ],
    cta: "Visit revolume.app",
  },
];

const upcoming = [
  {
    num: "06",
    name: "Supplement Index",
    tag: "Adjacent category",
    note:
      "A reviews site for the supplements GLP-1 and HRT users tend to look for — protein, fiber, electrolytes, micronutrient support, plus the menopause-specific category (Estroven, Amberen, Wile). Sourced from peer-reviewed evidence where it exists; the methodology notes where the research is still thin.",
    when: "2026",
    mode: "built" as Mode,
  },
  {
    num: "07",
    name: "Peptide Index",
    tag: "Post-FDA clarity",
    note:
      "Peptide therapy sits in a regulatory transition. After the July 2026 FDA advisory panel, we intend to publish a research-backed index covering BPC-157, TB-500, ipamorelin, and adjacent compounds — with pricing from licensed providers, the underlying evidence for each claim, and a clear account of what the regulation now permits.",
    when: "Q3 2026",
    mode: "built" as Mode,
  },
  {
    num: "08",
    name: "Neuroscience Index",
    tag: "Cognitive supplements",
    note:
      "The supplement side of cognition — nootropics, neuroprotective compounds, cognitive-aging formulas — reviewed with the same rigor we apply to GLP-1. Less about optimization culture, more about what has clinical trials behind it and what is still essentially hopeful biochemistry.",
    when: "2027",
    mode: "built" as Mode,
  },
  {
    num: "09",
    name: "Neuroplasticity Lab",
    tag: "Training & tools",
    note:
      "The behavioral counterpart to the Neuroscience Index. Rather than what goes into the brain, this asks how the brain can actually be trained — through cognitive apps, neurofeedback hardware, meditation platforms, and the small protocols with measurable effects. A separate product, sharing the same research discipline.",
    when: "2027",
    mode: "built" as Mode,
  },
];

function StatusPill({ status }: { status: Status }) {
  const label =
    status === "live" ? "Live" : status === "in-development" ? "In development" : "Planned";
  const dot =
    status === "live"
      ? "bg-sage"
      : status === "in-development"
      ? "bg-bronze"
      : "bg-muted";
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className={`absolute inset-0 rounded-full ${dot} ${
            status === "live" ? "animate-ping opacity-60" : "opacity-0"
          }`}
        />
        <span className={`relative inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}

function ModeTag({ mode }: { mode: Mode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-ink/55">
      <span className="inline-block h-px w-4 bg-ink/30" />
      {mode === "built" ? "Built in-house" : "Acquired"}
    </span>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-40 border-t border-border relative">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Section label */}
        <Reveal>
          <div className="flex items-baseline justify-between mb-20 md:mb-32">
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-bronze text-[22px] md:text-[28px]">
                §
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted">
                Portfolio — active and forthcoming
              </span>
            </div>
            <span className="hidden md:block font-display italic text-muted text-[17px]">
              Vol. 01
            </span>
          </div>
        </Reveal>

        {/* Alternating editorial layout */}
        <div className="space-y-32 md:space-y-56">
          {items.map((item, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <Reveal key={item.num}>
                <article className="grid grid-cols-12 gap-6 md:gap-14 items-center plate-hover">
                  <a
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`col-span-12 md:col-span-7 block group ${
                      reverse ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    {item.thumb}
                  </a>

                  <div
                    className={`col-span-12 md:col-span-5 ${
                      reverse ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-5 mb-6 md:mb-7 flex-wrap">
                      <span className="font-display italic text-bronze text-[24px] md:text-[28px] leading-none">
                        {item.num}
                      </span>
                      <span className="h-px w-8 md:w-10 bg-ink/20" />
                      <StatusPill status={item.status} />
                      <ModeTag mode={item.mode} />
                    </div>

                    <h3 className="font-display text-ink text-[38px] sm:text-[44px] md:text-[64px] leading-[0.95] tracking-tightest mb-5">
                      {item.name}
                    </h3>

                    <p className="font-display italic text-ink/85 text-[18px] sm:text-[20px] md:text-[24px] leading-[1.25] mb-7 max-w-[22ch]">
                      {item.tagline}
                    </p>

                    <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink/70 max-w-[42ch] mb-10">
                      {item.body}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5 mb-10 border-t border-border pt-6">
                      {item.meta.map((m) => (
                        <div key={m.label}>
                          <div className="text-[9px] uppercase tracking-[0.22em] text-muted mb-1.5">
                            {m.label}
                          </div>
                          <div className="text-[13px] text-ink font-medium">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {item.href && (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-[14px] text-ink font-medium group/cta"
                      >
                        <span className="link-line">{item.cta}</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-500 ease-out group-hover/cta:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Pipeline */}
        <div className="mt-32 md:mt-56 grid grid-cols-12 gap-6 md:gap-14">
          <Reveal className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display italic text-bronze text-[22px]">§§</span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                What comes next
              </span>
            </div>
            <p className="font-display italic text-ink/80 text-[22px] md:text-[26px] leading-[1.4] max-w-[24ch]">
              Adjacent categories, where the{" "}
              <span className="text-ink not-italic">same research methodology transfers</span>{" "}
              and the consumer is asking the same three questions.
            </p>
            <p className="mt-6 text-[14px] leading-[1.75] text-muted max-w-[40ch]">
              What does it cost over the course of a year, what is actually in
              it, and what is the evidence that it does what the packaging
              says. We build or acquire where those three questions have no
              clear answer yet.
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-8">
            <ul className="divide-y divide-border">
              {upcoming.map((u) => (
                <li
                  key={u.name}
                  className="group grid grid-cols-12 gap-x-3 gap-y-2 md:gap-4 items-baseline py-6 md:py-7"
                >
                  <span className="col-span-2 md:col-span-1 font-display italic text-bronze text-[14px]">
                    {u.num}
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <div className="font-display text-ink text-[22px] md:text-[28px] leading-[1.05] mb-1.5">
                      {u.name}
                    </div>
                    <div className="text-[13px] text-muted leading-[1.5]">
                      {u.note}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 md:hidden text-[10px] uppercase tracking-[0.22em] text-muted">
                      <span>{u.tag}</span>
                      <span aria-hidden className="opacity-50">·</span>
                      <span className="font-display italic normal-case tracking-normal text-ink/60 text-[14px]">
                        {u.when}
                      </span>
                    </div>
                  </div>
                  <span className="hidden md:block md:col-span-2 text-[11px] uppercase tracking-[0.22em] text-muted md:text-right">
                    {u.tag}
                  </span>
                  <span className="hidden md:block md:col-span-2 font-display italic text-ink/60 text-[17px] text-right">
                    {u.when}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
