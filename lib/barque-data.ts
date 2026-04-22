import fs from "node:fs";
import path from "node:path";

/**
 * Barque data — forecasts, ra_log, resolutions, backtests.
 *
 * Pulls three TSVs from the `barque` submodule at build time:
 *   ./barque/forecasts.tsv       — live + historical forecasts (source of truth)
 *   ./barque/ra/ra_log.tsv       — per-run re-evaluations (trajectory)
 *   ./barque/resolutions.tsv     — resolved forecasts (operator-written)
 *
 * Backtests stay hardcoded — historical cases for calibration, not a live
 * dataset.
 *
 * Each pending forecast has a stable `id` column (matches forecast_id in
 * ra_log.tsv). `getForecastArc(id)` composes a forecast's full trajectory
 * from creation through every Ra run through resolution.
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
  sources: string[];
  notes: string;
};

export type RaLogRow = {
  runDate: string;
  forecastId: string;
  trigger: string;
  newProbability: number;
  delta: number;
  newSignalStrength: number;
  signalsCited: string[];
  counterNarrative: string;
  notes: string;
  flagged: boolean;
};

export type ForecastResolution = {
  resolutionDate: string;
  forecastId: string;
  originalProbability: number;
  finalOutcome: "true" | "false";
  finalBrier: number;
  leadTimeDays: number;
  contrarian: boolean;
  notes: string;
};

export type ForecastArc = {
  forecast: Forecast;
  runs: RaLogRow[];
  resolution: ForecastResolution | null;
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
  contrarian: boolean;
  insight: string;
};

// ---------- TSV parsing ----------

const BARQUE_DIR = path.join(process.cwd(), "barque");

function readTsv(filePath: string): Record<string, string>[] {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const header = lines[0].split("\t").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split("\t");
    const obj: Record<string, string> = {};
    header.forEach((h, i) => {
      obj[h] = (cols[i] ?? "").trim();
    });
    return obj;
  });
}

function splitPipes(s: string | undefined): string[] {
  if (!s) return [];
  return s
    .split(/\s*\|\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseForecasts(): Forecast[] {
  const rows = readTsv(path.join(BARQUE_DIR, "forecasts.tsv"));
  return rows
    .filter((r) => r.id)
    .map((r) => ({
      id: r.id,
      dateMade: r.date_made,
      domain: r.domain,
      entity: r.entity,
      prediction: r.prediction,
      probability: parseFloat(r.probability),
      horizonDays: parseInt(r.horizon_days, 10) || 0,
      resolutionDate: r.resolution_date,
      resolution: (["pending", "true", "false"].includes(r.resolution)
        ? r.resolution
        : "pending") as Resolution,
      brier:
        r.brier === "pending" || r.brier === "" ? null : parseFloat(r.brier),
      signalStrength: parseInt(r.signal_strength, 10) || 0,
      sources: splitPipes(r.sources),
      notes: r.notes ?? "",
    }));
}

function parseRaLog(): RaLogRow[] {
  const rows = readTsv(path.join(BARQUE_DIR, "ra", "ra_log.tsv"));
  return rows
    .filter((r) => r.forecast_id)
    .map((r) => ({
      runDate: r.run_date,
      forecastId: r.forecast_id,
      trigger: r.trigger,
      newProbability: parseFloat(r.new_probability),
      delta: parseFloat(r.delta),
      newSignalStrength: parseInt(r.new_signal_strength, 10) || 0,
      signalsCited: splitPipes(r.signals_cited),
      counterNarrative: r.counter_narrative ?? "",
      notes: r.notes ?? "",
      flagged: r.flagged === "true",
    }));
}

function parseResolutions(): ForecastResolution[] {
  const rows = readTsv(path.join(BARQUE_DIR, "resolutions.tsv"));
  return rows
    .filter((r) => r.forecast_id)
    .map((r) => ({
      resolutionDate: r.resolution_date,
      forecastId: r.forecast_id,
      originalProbability: parseFloat(r.original_probability),
      finalOutcome: (r.final_outcome === "true" ? "true" : "false") as
        | "true"
        | "false",
      finalBrier: parseFloat(r.final_brier),
      leadTimeDays: parseInt(r.lead_time_days, 10) || 0,
      contrarian: r.contrarian === "true",
      notes: r.notes ?? "",
    }));
}

// ---------- cached module-level exports ----------

export const forecasts: Forecast[] = parseForecasts();
export const raLog: RaLogRow[] = parseRaLog();
export const resolutions: ForecastResolution[] = parseResolutions();

// ---------- helpers ----------

function todayIsoUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getForecastById(id: string): Forecast | undefined {
  return forecasts.find((f) => f.id === id);
}

export function getForecastArc(id: string): ForecastArc | null {
  const forecast = getForecastById(id);
  if (!forecast) return null;
  const runs = raLog
    .filter((r) => r.forecastId === id)
    .sort((a, b) => (a.runDate < b.runDate ? -1 : 1));
  const resolution = resolutions.find((r) => r.forecastId === id) ?? null;
  return { forecast, runs, resolution };
}

export function getOverdueForecasts(today: string = todayIsoUtc()): Forecast[] {
  return forecasts.filter(
    (f) => f.resolution === "pending" && f.resolutionDate < today,
  );
}

export function getLiveForecasts(today: string = todayIsoUtc()): Forecast[] {
  return forecasts.filter(
    (f) => f.resolution === "pending" && f.resolutionDate >= today,
  );
}

/**
 * For a given forecast, return the most recent Ra run (or null if none).
 * The "current" probability on the site is this run's new_probability,
 * not the original probability from forecasts.tsv.
 */
export function getLatestRun(id: string): RaLogRow | null {
  const runs = raLog.filter((r) => r.forecastId === id);
  if (runs.length === 0) return null;
  return runs.reduce((latest, r) =>
    r.runDate > latest.runDate ? r : latest,
  );
}

/** Current probability = latest Ra update, fallback to original. */
export function getCurrentProbability(f: Forecast): number {
  const latest = getLatestRun(f.id);
  return latest ? latest.newProbability : f.probability;
}

// ---------- historical backtests (hardcoded — these don't live in a TSV) ----------

export const backtests: Backtest[] = [
  {
    id: "wegovy-mainstream",
    case: "Wegovy mainstreaming",
    domain: "glp1-metabolic",
    cutoff: "2022-08-31",
    prediction:
      "GLP-1-class drugs become #1 US weight-loss Rx by 2024-12-31",
    probability: 0.8,
    outcome: "true",
    brier: 0.04,
    signalStrength: 450,
    leadTimeMonths: 28,
    contrarian: false,
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
    contrarian: true,
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
    probability: 0.8,
    outcome: "true",
    brier: 0.04,
    signalStrength: 207,
    leadTimeMonths: 24,
    contrarian: true,
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
    contrarian: false,
    insight:
      "Weak signal environment. Protocol correctly expressed lower confidence via probability. Self-calibration working — weaker signal → wider error bars.",
  },
];

// ---------- aggregate stats ----------

export const stats = {
  forecastsLive: getLiveForecasts().length,
  forecastsOverdue: getOverdueForecasts().length,
  backtestsResolved: backtests.length,
  hits: backtests.filter((b) => b.outcome === "true").length,
  avgBrier:
    backtests.reduce((sum, b) => sum + b.brier, 0) / backtests.length,
  avgLeadMonths:
    backtests.reduce((sum, b) => sum + b.leadTimeMonths, 0) /
    backtests.length,
  contrarianCount: backtests.filter((b) => b.contrarian).length,
  coverageAuditStart: "Q3 2026",
};

export const domainLabel: Record<string, string> = {
  "glp1-metabolic": "GLP-1 / Metabolic",
  "menopause-queenager": "Menopause / HRT",
  "peptides-longevity": "Peptides / Longevity",
  "thecompound-portfolio": "Compound Portfolio",
  "consumer-tech": "Consumer Tech",
  "skincare": "Skincare",
  "pet-health": "Pet Health",
};
