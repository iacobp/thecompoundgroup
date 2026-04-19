/**
 * Barque data — forecasts and backtests.
 *
 * Mirrored from ~/Documents/barque/forecasts.tsv and historical-cases.md.
 * Kept as a typed module so the site renders at build time without file IO.
 * When forecasts.tsv updates, update this module and push — Vercel redeploys.
 */

export type Resolution = "pending" | "true" | "false";

export type Forecast = {
  id: string;
  dateMade: string;
  domain: string;
  entity: string;
  prediction: string;
  probability: number;
  horizonDays: number;
  resolutionDate: string;
  resolution: Resolution;
  brier: number | null;
  signalStrength: number;
  notes: string;
};

export type Backtest = {
  id: string;
  case: string;
  domain: string;
  cutoff: string;
  prediction: string;
  probability: number;
  outcome: "true" | "false";
  brier: number;
  signalStrength: number;
  leadTimeMonths: number;
  insight: string;
};

export const forecasts: Forecast[] = [
  {
    id: "bpc157-pcac-2026",
    dateMade: "2026-04-18",
    domain: "peptides-longevity",
    entity: "BPC-157",
    prediction:
      "PCAC does NOT recommend Category 1 (unrestricted compounding) for BPC-157 at the 2026-07-23 meeting.",
    probability: 0.70,
    horizonDays: 96,
    resolutionDate: "2026-07-23",
    resolution: "pending",
    brier: null,
    signalStrength: 42,
    notes:
      "Regulator agent dominates regulatory decisions. FDA default on unapproved peptides without US safety dossier = not-Cat-1.",
  },
  {
    id: "medicare-glp1-bridge-uptake",
    dateMade: "2026-04-18",
    domain: "glp1-metabolic",
    entity: "Medicare GLP-1 Bridge",
    prediction:
      "CMS reports fewer than 1,000,000 Medicare GLP-1 Bridge enrollees by 2026-12-31.",
    probability: 0.65,
    horizonDays: 257,
    resolutionDate: "2026-12-31",
    resolution: "pending",
    brier: null,
    signalStrength: 55,
    notes:
      "Base rate: new Medicare Part D programs enroll slowly in year one (10–15% of eligible). 1M ≈ 7% of 14M eligible.",
  },
  {
    id: "compound-peptide-affiliate-share",
    dateMade: "2026-04-18",
    domain: "thecompound-portfolio",
    entity: "Peptide affiliate revenue share",
    prediction:
      "Peptide vendor affiliate revenue is less than 30% of total Compound affiliate revenue by 2026-12-31.",
    probability: 0.85,
    horizonDays: 257,
    resolutionDate: "2026-12-31",
    resolution: "pending",
    brier: null,
    signalStrength: 64,
    notes:
      "Peptide affiliate CPA ~10–30× lower than GLP-1 affiliate CPA ($8–40 vs $260). Math dominates.",
  },
];

export const backtests: Backtest[] = [
  {
    id: "wegovy-mainstream",
    case: "Wegovy mainstreaming",
    domain: "glp1-metabolic",
    cutoff: "2022-08-31",
    prediction:
      "GLP-1-class drugs become #1 US weight-loss Rx by 2024-12-31",
    probability: 0.80,
    outcome: "true",
    brier: 0.04,
    signalStrength: 450,
    leadTimeMonths: 28,
    insight:
      "Novo raising guidance while supply-constrained was the cardinal signal. When an incumbent raises guidance under rationing, demand signal is maxed.",
  },
  {
    id: "clubhouse-hype",
    case: "Clubhouse hype cycle",
    domain: "consumer-tech",
    cutoff: "2021-03-31",
    prediction:
      "Clubhouse does NOT become top-3 audio platform by 2023-06-30",
    probability: 0.75,
    outcome: "true",
    brier: 0.0625,
    signalStrength: 5,
    leadTimeMonths: 27,
    insight:
      "Agent divergence capped signal strength. 3 of 5 agents negative override loud 2-agent positive (capital + celebrity). Incumbent clones shipping during peak hype is a kill signal.",
  },
  {
    id: "nmn-non-ban",
    case: "NMN regulatory non-ban",
    domain: "peptides-longevity",
    cutoff: "2022-12-31",
    prediction:
      "NMN remains widely available despite FDA exclusion letter",
    probability: 0.80,
    outcome: "true",
    brier: 0.04,
    signalStrength: 207,
    leadTimeMonths: 24,
    insight:
      "FDA warning letters without injunction or court action historically do not remove supplements from market within 24 months. Industry lobby + litigation + consumer demand compound.",
  },
  {
    id: "bpc157-cat2-historical",
    case: "BPC-157 Category 2 placement",
    domain: "peptides-longevity",
    cutoff: "2023-03-31",
    prediction:
      "FDA places BPC-157 in 503A Category 2 by 2023-12-31",
    probability: 0.65,
    outcome: "true",
    brier: 0.1225,
    signalStrength: 48,
    leadTimeMonths: 6,
    insight:
      "Weak signal environment. Protocol correctly expressed lower confidence via probability. Self-calibration working — weaker signal → wider error bars.",
  },
];

/** Aggregate stats — computed at build time */
export const stats = {
  forecastsLive: forecasts.filter((f) => f.resolution === "pending").length,
  backtestsResolved: backtests.length,
  hits: backtests.filter((b) => b.outcome === "true").length,
  avgBrier:
    backtests.reduce((sum, b) => sum + b.brier, 0) / backtests.length,
  avgLeadMonths:
    backtests.reduce((sum, b) => sum + b.leadTimeMonths, 0) / backtests.length,
};

/** Domain display names */
export const domainLabel: Record<string, string> = {
  "glp1-metabolic": "GLP-1 / Metabolic",
  "menopause-queenager": "Menopause / HRT",
  "peptides-longevity": "Peptides / Longevity",
  "thecompound-portfolio": "Compound Portfolio",
  "consumer-tech": "Consumer Tech",
};
