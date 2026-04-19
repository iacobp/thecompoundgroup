/**
 * Barque · Dawn Briefs
 *
 * Each brief is one Ra run. On weekdays: Observe / Cluster / Simulate /
 * Score / Resolve with Historian, Skeptic, Bayesian, Augur voices.
 * On Sundays: weekly edition — adds Stoic + Premortem + new-forecast
 * candidates.
 *
 * This module is the canonical source until Ra runs cloud-side and
 * commits briefs as markdown to github.com/iacobp/barque. At that
 * point /barque/log will fetch from the repo at build time and this
 * file retires.
 */

export type BriefKind = "daily" | "weekly";

export type ForecastUpdate = {
  forecastId: string;
  entity: string;
  priorProb: number;
  newProb: number;
  signal: string;
  counterNarrative?: string;
  flagged?: boolean;
};

export type AugurPick = {
  body: string;
};

export type StoicSplit = {
  actionable: string[];
  noise: string[];
};

export type PremortemEntry = {
  forecastId: string;
  entity: string;
  body: string;
  impliedDelta?: string;
};

export type ForecastCandidate = {
  statement: string;
  probability: number;
  resolutionDate: string;
  rationale: string;
};

export type Brief = {
  slug: string;
  date: string; // ISO YYYY-MM-DD
  dayOfWeek: string; // Sunday, Monday, ...
  kind: BriefKind;
  subtitle?: string; // for special editions — e.g. "first brief, manual run"
  metaCognition: string[]; // 3–6 bullets
  forecastUpdates: ForecastUpdate[];
  augurPicks: AugurPick[];
  stoic?: StoicSplit;
  premortem?: PremortemEntry;
  newForecastCandidates?: ForecastCandidate[];
  authorsNote?: string;
};

export const briefs: Brief[] = [
  {
    slug: "2026-04-19-first-dawn-brief",
    date: "2026-04-19",
    dayOfWeek: "Sunday",
    kind: "weekly",
    subtitle:
      "First edition. Manual run before the scheduled task activates.",
    metaCognition: [
      "New heuristic promoted. \"Incumbent acquires facility 12+ months before the policy window opens\" is a reusable signal pattern. Hims acquired its California peptide facility Feb 2025 — fourteen months before the April 22 2026 Category 2 reclassification. Same structural class as Novo's 2021 Kalundborg expansion preceding Wegovy mainstreaming by 18 months. \"Pre-positioning-by-M&A\" added to the reference class for regulatory-adjacent forecasts.",
      "Failure mode caught. On the original BPC-157 single-peptide forecast (p=0.70 NOT Cat 1), we anchored to a pre-reclassification prior. The April 15 wave — 12 peptides exiting Cat 2 at once — is a structural break the original prior didn't anticipate. The revised multi-peptide forecast at p=0.52 is the honest update; the original row stays in the log as historical evidence of anchoring bias.",
      "Voice calibration. The Augur's threshold is too loose — three of four recent picks were things other voices would have surfaced anyway. Tightening the Augur's brief to \"signals the Historian and Skeptic would not see\" for the next run.",
      "Reference-class expansion. Adding \"mass-contamination reveals in unregulated consumer categories\" as a reference class for peptide-safety forecasts. Analogues: NAC/NMN mis-testing 2023, ConsumerLab creatine adulteration, 2008 heparin contamination. Not all produced firestorms; base rate for \">=40% contamination leading to a Top-5 outlet feature within 12 months\" is closer to 0.50 than the 0.70 we priced.",
      "Protocol drift caught. Curator was treating the 0.05 / 0.95 probability clip as guidance rather than rule. One case wanted to land at 0.93; clipped to 0.90. Rule stays hard.",
    ],
    forecastUpdates: [
      {
        forecastId: "pcac-july-multi-peptide",
        entity: "PCAC multi-peptide Cat 1 decision · 2026-07-23",
        priorProb: 0.55,
        newProb: 0.52,
        signal:
          "Fagron Academy publication notes USP monograph work for BPC-157 is expected but not yet initiated as of April 17. FDA has never granted Cat 1 on a novel peptide absent a USP monograph — the Skeptic's falsifier, absent rather than present.",
        counterNarrative:
          "The 12-peptide reclassification wave may indicate FDA willingness to grant conditional Cat 1 without a USP monograph; if so the base rate is too conservative.",
        flagged: false,
      },
      {
        forecastId: "hims-peptide-launch",
        entity: "Hims peptide DTC launch by 2026-12-31",
        priorProb: 0.80,
        newProb: 0.80,
        signal:
          "CNBC framing Hims as the RFK/peptide beneficiary (April 16) reinforces the thesis. Premortem surfaced a credible but non-material failure mode (safety incident → pre-emptive pause).",
        flagged: false,
      },
      {
        forecastId: "peptide-safety-incident",
        entity: "Peptide safety feature in top-5 US outlet by 2027-03-31",
        priorProb: 0.70,
        newProb: 0.70,
        signal:
          "No new evidence today, but reference class widened (see meta-cognition). Adjusted base rate is closer to 0.50 — internal flag for full re-price next Sunday.",
        flagged: true,
      },
      {
        forecastId: "medicare-glp1-bridge-uptake",
        entity: "Medicare GLP-1 Bridge <1M enrollees by 2026-12-31",
        priorProb: 0.65,
        newProb: 0.65,
        signal:
          "No CMS rulemaking or enrollment data ahead of the July 1 launch. First meaningful data expected late Q3.",
        flagged: false,
      },
    ],
    augurPicks: [
      {
        body:
          "A single Nevada compounding pharmacy filed preemptive Cat 1 product-labeling templates with their state board on April 17. One pharmacy, nobody's radar. Possibly wishful thinking; possibly a signal that a sophisticated industry actor is pricing in a Cat 1 outcome at July 23 higher than public odds imply. Worth watching if a second pharmacy files the same within the month.",
      },
    ],
    stoic: {
      actionable: [
        "Pre-write the PCAC July 23 scenario articles in both directions. Window is 95 days; publish within 4 hours of the decision.",
        "The Hims peptide launch forecast is high-conviction and resolves by year-end. Any Compound peptide properties need to be live before Hims launches at scale (Q4 2026 most likely).",
      ],
      noise: [
        "RFK / HHS political framing is real but not operator-actionable. Skip the political-commentary content.",
        "Celebrity-spokesperson arrangements. Relevant as cultural signal, not as action.",
      ],
    },
    premortem: {
      forecastId: "hims-peptide-launch",
      entity: "Hims peptide launch",
      body:
        "Imagine Hims does NOT launch peptides by year-end. The most credible failure path: a serious peptide-related adverse event at a competitor between now and July triggers a pre-emptive Hims pause. Latent condition partially present today: the 40% contamination rate plus accumulating safety coverage (NPR, UNSW) is the material of a bad-news cycle. Implication: holds the 0.80 posterior but warrants a faster downward move if any industry injury narrative breaks.",
      impliedDelta: "Hold p=0.80 for now; faster downward move on any injury narrative.",
    },
    newForecastCandidates: [
      {
        statement:
          "By 2026-06-30, at least 3 peptide-compounding pharmacies publish preemptive Cat 1 product labeling templates publicly or in state-board filings.",
        probability: 0.45,
        resolutionDate: "2026-06-30",
        rationale:
          "The Nevada filing (Augur pick) is either a lone data point or the first signal in a cumulative indicator. If three pharmacies file in 10 weeks, it means industry is pricing PCAC Cat 1 higher than we are, and our F2 (p=0.52) should adjust upward.",
      },
    ],
    authorsNote:
      "This is the first Dawn Brief. It was produced as a manual run of the council prompt before the scheduler migrates to cloud execution. Future briefs ship automatically each dawn. The log is public from day one — that is the point.",
  },
];

export function getBriefBySlug(slug: string): Brief | undefined {
  return briefs.find((b) => b.slug === slug);
}

export function getRecentBriefs(limit = 3): Brief[] {
  return [...briefs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export const briefStats = {
  total: briefs.length,
  firstBriefDate: briefs.length
    ? [...briefs].sort((a, b) => (a.date < b.date ? -1 : 1))[0].date
    : null,
};
