import fs from "node:fs";
import path from "node:path";
import { forecasts } from "./barque-data";

/**
 * Barque · Dawn Briefs
 *
 * Parses Ra's commits from the `barque` submodule (`./barque/briefs/*.md`)
 * at build time and exposes them to `/barque/log`. The markdown format
 * follows the six-section schema defined in `barque/ra/council-prompt.md`.
 *
 * Public sections rendered on the site: §1 In Plain English,
 * §2 Signal Detail, §3 Resolutions & Upcoming, §4 How Barque Got Smarter.
 * §5 Work Orders and §6 Strategic Memo are never rendered publicly
 * (§5 lives in git for routine consumption but is filtered out here;
 * §6 never hits git at all per the strict firewall).
 *
 * The one pre-markdown brief (2026-04-19) lives in LEGACY_BRIEFS below
 * so its SEO-live slug stays stable. All future briefs ship via
 * markdown commits to the submodule.
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

export type Resolution = {
  body: string;
};

export type Brief = {
  slug: string;
  date: string; // ISO YYYY-MM-DD
  dayOfWeek: string; // Sunday, Monday, ...
  kind: BriefKind;
  subtitle?: string;
  // §1 — Public lede, jargon-free
  plainEnglish: string[];
  // §2 — Public rigorous layer (Signal Detail umbrella)
  forecastUpdates: ForecastUpdate[];
  augurPicks: AugurPick[];
  newForecastCandidates?: ForecastCandidate[];
  // §3 — Public, resolutions + upcoming
  resolutions?: Resolution[];
  // §4 — Public, meta-cognition
  metaCognition: string[];
  // Weekly-only structured voices (Stoic + Premortem)
  stoic?: StoicSplit;
  premortem?: PremortemEntry;
  authorsNote?: string;
};

// ---------- markdown parsing ----------

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return { meta, body: match[2] };
}

/**
 * Section names that are forbidden in public renders. §5 Work Orders
 * (operational, per-product) and §6 Strategic Memo (private, portfolio-
 * level decisions) must never reach /barque/log. The parser strips
 * these keys defensively before any downstream lookup so no future
 * code path can accidentally surface them even if called with a
 * matching key. Defense-in-depth on top of the private-repo boundary.
 */
const PRIVATE_SECTION_KEYS = new Set([
  "work orders",
  "section 5",
  "§5",
  "strategic memo",
  "section 6",
  "§6",
]);

/**
 * Split a brief body into a map of section-name → content by `## ` headers.
 * Keys are normalised to lower-case with single spaces. §5/§6 keys are
 * stripped before the map is returned.
 */
function splitSections(body: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = body.split(/\r?\n/);
  let current: string | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (current) sections[current] = buf.join("\n").trim();
    buf = [];
  };
  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      flush();
      // Normalise: lowercase, single-space, AND strip leading numeral
      // prefixes that drift across brief vintages (e.g. "## 1. In Plain
      // English", "## §2 Signal Detail", "## 4. How Barque Got Smarter
      // Today"). Without this, the parser misses any brief that switches
      // numbering style — which Ra started doing on 2026-05-09.
      let key = m[1].trim().toLowerCase().replace(/\s+/g, " ");
      key = key.replace(/^(?:§\s*)?\d+\.?\s+/, "");
      current = key;
    } else if (current) {
      buf.push(line);
    }
  }
  flush();
  // Strip private sections defensively — these must never render publicly.
  for (const key of Object.keys(sections)) {
    if (PRIVATE_SECTION_KEYS.has(key)) delete sections[key];
  }
  return sections;
}

/**
 * Turn a forecast-id like "bpc157-pcac-2026" into a human-readable entity
 * label "BPC-157 PCAC 2026" — used as a fallback when the new inline brief
 * format (`**forecast-id: holds 0.55.**`) doesn't supply an explicit name
 * the way the legacy `### Entity (id)` header did.
 */
/**
 * The ids that actually have an arc page under `/barque/forecasts/[id]`.
 *
 * `generateStaticParams` on that route builds one page per row of
 * `barque/forecasts.tsv`, so anything the brief parser invents outside this
 * set is a link to a page that was never generated. That is not theoretical:
 * Ra closes each forecast paragraph with a council summary line, and
 * `**Curator: holds 0.55.**` has the exact shape of the inline update marker
 * `**forecast-id: holds 0.55.**`. It parsed as a seventh forecast on every
 * brief that used the phrasing, each one linking to
 * `/barque/forecasts/Curator`, which 404s. The portfolio maintenance sweep
 * caught it on 2026-08-04.
 *
 * Matching against the real forecast set rather than blocklisting the five
 * council names (Historian, Skeptic, Bayesian, Augur, Curator) is deliberate:
 * a new voice, or any other bolded `Word: holds 0.55.` phrasing, is caught by
 * the same rule without anyone remembering to add it.
 */
const FORECAST_IDS = new Set(forecasts.map((f) => f.id));

function humanizeForecastId(id: string): string {
  return id
    .split("-")
    .map((part) => {
      if (/^\d/.test(part)) return part.toUpperCase();
      if (part.length <= 4) return part.toUpperCase();
      return part[0].toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function parseParagraphs(text: string): string[] {
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseBullets(text: string): string[] {
  const bullets: string[] = [];
  const lines = text.split(/\r?\n/);
  let current: string | null = null;
  for (const line of lines) {
    if (/^[-*]\s+/.test(line)) {
      if (current !== null) bullets.push(current.trim());
      current = line.replace(/^[-*]\s+/, "");
    } else if (current !== null && line.trim() !== "") {
      current += " " + line.trim();
    }
  }
  if (current !== null) bullets.push(current.trim());
  return bullets.filter(Boolean);
}

/**
 * Parse the Signal Detail / Forecast Updates section. Each forecast is
 * introduced by `### Entity Name (forecast-id)` followed by a
 * `**prior → new**` probability line and prose. An optional
 * `**Counter-narrative:**` paragraph separates the counter-case.
 */
function parseSignalDetail(text: string): ForecastUpdate[] {
  if (!text.trim()) return [];
  const out: ForecastUpdate[] = [];

  // --- Legacy format: `### Entity Name (forecast-id)` h3 sections ---
  //
  // Used by the pre-markdown brief and a handful of early markdown briefs.
  // Kept first so it still parses if Ra reverts to the explicit header.
  const subsections = text.split(/\r?\n(?=###\s)/g);
  for (const sub of subsections) {
    const head = sub.match(/^###\s+(.+?)\s*\(([^)]+)\)\s*\r?\n/);
    if (!head) continue;
    const entity = head[1].trim();
    const forecastId = head[2].trim();
    if (!FORECAST_IDS.has(forecastId)) continue;
    const rest = sub.slice(head[0].length);
    const prob = rest.match(
      /\*\*\s*([\d.]+)\s*→\s*([\d.]+)\s*\*\*(?:\s*·\s*delta\s*([-+]?[\d.]+))?/,
    );
    if (!prob) continue;
    const priorProb = parseFloat(prob[1]);
    const newProb = parseFloat(prob[2]);
    const afterProb = rest.slice((prob.index ?? 0) + prob[0].length).trim();
    const counterIdx = afterProb.search(/\*\*Counter-narrative:\*\*/i);
    const signal = (counterIdx >= 0
      ? afterProb.slice(0, counterIdx)
      : afterProb
    ).trim();
    const counterNarrative =
      counterIdx >= 0
        ? afterProb
            .slice(counterIdx)
            .replace(/\*\*Counter-narrative:\*\*/i, "")
            .trim()
        : undefined;
    out.push({
      forecastId,
      entity,
      priorProb,
      newProb,
      signal,
      counterNarrative,
      flagged: Math.abs(newProb - priorProb) >= 0.15,
    });
  }
  if (out.length > 0) return out;

  // --- New inline formats (Ra circa 2026-05-04 onwards) ---
  //
  // Each forecast is a paragraph that opens with one of three shapes:
  //
  //   **forecast-id: holds 0.55.**                       (current, May 10+)
  //   **forecast-id: 0.84 → 0.86 (+0.02).**              (current, when moving)
  //   *forecast-id* — prior 0.85, posterior 0.86 (+0.01) (transitional, May 9)
  //
  // The trailing period is tolerated in either position inside the bold
  // wrapper. Signal prose runs from the end of the marker to the start
  // of the next marker (or the end of the section).
  const BOLD_RE =
    /\*\*([a-z][a-z0-9-]+):\s*(?:holds\s+([\d.]+)|([\d.]+)\s*(?:→|->)\s*([\d.]+))\s*(?:\(([+-]?[\d.]+)\))?\s*\.?\s*\*\*\.?/gi;
  const ITALIC_RE =
    /\*([a-z][a-z0-9-]+)\*\s*[—–-]\s*prior\s+([\d.]+),\s*posterior\s+([\d.]+)(?:\s*\(([+-]?[\d.]+)\))?\.?/gi;

  type Hit = {
    start: number;
    end: number;
    forecastId: string;
    priorProb: number;
    newProb: number;
  };
  const hits: Hit[] = [];
  let m: RegExpExecArray | null;

  while ((m = BOLD_RE.exec(text)) !== null) {
    const forecastId = m[1];
    let priorProb: number;
    let newProb: number;
    if (m[2] !== undefined) {
      priorProb = parseFloat(m[2]);
      newProb = priorProb;
    } else {
      priorProb = parseFloat(m[3]);
      newProb = parseFloat(m[4]);
    }
    hits.push({
      start: m.index,
      end: m.index + m[0].length,
      forecastId,
      priorProb,
      newProb,
    });
  }

  if (hits.length === 0) {
    while ((m = ITALIC_RE.exec(text)) !== null) {
      hits.push({
        start: m.index,
        end: m.index + m[0].length,
        forecastId: m[1],
        priorProb: parseFloat(m[2]),
        newProb: parseFloat(m[3]),
      });
    }
  }

  // The prose boundary is still taken across EVERY hit, including the ones
  // dropped below. A council summary sits at the end of the paragraph it
  // summarises, so it already terminates that forecast's signal prose. Filter
  // before this loop and the summary sentence would be swallowed into the
  // preceding forecast's text across the whole published archive, which is a
  // content edit rather than a link fix.
  for (let i = 0; i < hits.length; i++) {
    const h = hits[i];
    if (!FORECAST_IDS.has(h.forecastId)) continue;
    const nextStart = i + 1 < hits.length ? hits[i + 1].start : text.length;
    const signalRaw = text.slice(h.end, nextStart).trim();
    // Trim trailing horizontal-rule / sibling-subheading noise that may
    // belong to a later subsection inside the same Signal Detail body
    // (e.g. an `### Augur` block following the Direct updates list).
    const signal = signalRaw
      .replace(/\n\s*---+\s*\n[\s\S]*$/, "")
      .replace(/\n\s*###\s+[\s\S]*$/, "")
      .trim();
    out.push({
      forecastId: h.forecastId,
      entity: humanizeForecastId(h.forecastId),
      priorProb: h.priorProb,
      newProb: h.newProb,
      signal,
      flagged: Math.abs(h.newProb - h.priorProb) >= 0.15,
    });
  }

  return out;
}

function parseAugurPicks(text: string): AugurPick[] {
  if (!text.trim()) return [];
  return parseParagraphs(text).map((body) => ({ body }));
}

function parseMarkdownBrief(filePath: string): Brief | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const sections = splitSections(body);

    const slugFromFile = path.basename(filePath, ".md");
    const slug = meta.slug || slugFromFile;
    const date = meta.date || slugFromFile.slice(0, 10);
    const dateObj = new Date(date + "T00:00:00Z");
    const dayOfWeek = meta.dayOfWeek || DAYS[dateObj.getUTCDay()];
    const kind: BriefKind = meta.kind === "weekly" ? "weekly" : "daily";

    // "Summary" is the newer (post-2026-05-10) alias for the jargon-free
    // lede section that older briefs label "In Plain English".
    const plainKey =
      "in plain english" in sections
        ? "in plain english"
        : "summary" in sections
          ? "summary"
          : null;
    const plainEnglish = plainKey ? parseParagraphs(sections[plainKey]) : [];

    const signalSectionText =
      sections["signal detail"] ??
      sections["forecast updates"] ??
      "";
    const forecastUpdates = parseSignalDetail(signalSectionText);

    const augurPicks = sections["augur picks"]
      ? parseAugurPicks(sections["augur picks"])
      : [];

    const metaKey =
      "how barque got smarter today" in sections
        ? "how barque got smarter today"
        : "how barque got smarter" in sections
          ? "how barque got smarter"
          : null;
    const metaCognition = metaKey ? parseBullets(sections[metaKey]) : [];

    const resolutionsKey =
      "resolutions & upcoming" in sections
        ? "resolutions & upcoming"
        : "resolutions" in sections
          ? "resolutions"
          : null;
    const resolutions = resolutionsKey
      ? parseParagraphs(sections[resolutionsKey]).map((body) => ({ body }))
      : undefined;

    return {
      slug,
      date,
      dayOfWeek,
      kind,
      subtitle: meta.subtitle || undefined,
      plainEnglish,
      forecastUpdates,
      augurPicks,
      metaCognition,
      resolutions,
    };
  } catch (err) {
    console.warn(`[barque-briefs] failed to parse ${filePath}:`, err);
    return null;
  }
}

// ---------- legacy hardcoded brief (pre-markdown) ----------

const LEGACY_BRIEFS: Brief[] = [
  {
    slug: "2026-04-19-first-dawn-brief",
    date: "2026-04-19",
    dayOfWeek: "Sunday",
    kind: "weekly",
    subtitle:
      "First edition. Manual run before the scheduled task activates.",
    plainEnglish: [],
    metaCognition: [
      'New heuristic promoted. "Incumbent acquires facility 12+ months before the policy window opens" is a reusable signal pattern. Hims acquired its California peptide facility Feb 2025 — fourteen months before the April 22 2026 Category 2 reclassification. Same structural class as Novo\'s 2021 Kalundborg expansion preceding Wegovy mainstreaming by 18 months. "Pre-positioning-by-M&A" added to the reference class for regulatory-adjacent forecasts.',
      // anchor-override: the 12 here counts peptides that exited FDA Category 2
      // in the April 15 2026 wave, a regulatory event. It is not a count of the
      // Best Peptide For That index, and the archived brief is dated.
      "Failure mode caught. On the original BPC-157 single-peptide forecast (p=0.70 NOT Cat 1), we anchored to a pre-reclassification prior. The April 15 wave — 12 peptides exiting Cat 2 at once — is a structural break the original prior didn't anticipate. The revised multi-peptide forecast at p=0.52 is the honest update; the original row stays in the log as historical evidence of anchoring bias.",
      'Voice calibration. The Augur\'s threshold is too loose — three of four recent picks were things other voices would have surfaced anyway. Tightening the Augur\'s brief to "signals the Historian and Skeptic would not see" for the next run.',
      'Reference-class expansion. Adding "mass-contamination reveals in unregulated consumer categories" as a reference class for peptide-safety forecasts. Analogues: NAC/NMN mis-testing 2023, ConsumerLab creatine adulteration, 2008 heparin contamination. Not all produced firestorms; base rate for ">=40% contamination leading to a Top-5 outlet feature within 12 months" is closer to 0.50 than the 0.70 we priced.',
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
        priorProb: 0.8,
        newProb: 0.8,
        signal:
          "CNBC framing Hims as the RFK/peptide beneficiary (April 16) reinforces the thesis. Premortem surfaced a credible but non-material failure mode (safety incident → pre-emptive pause).",
        flagged: false,
      },
      {
        forecastId: "peptide-safety-incident",
        entity: "Peptide safety feature in top-5 US outlet by 2027-03-31",
        priorProb: 0.7,
        newProb: 0.7,
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
        body: "A single Nevada compounding pharmacy filed preemptive Cat 1 product-labeling templates with their state board on April 17. One pharmacy, nobody's radar. Possibly wishful thinking; possibly a signal that a sophisticated industry actor is pricing in a Cat 1 outcome at July 23 higher than public odds imply. Worth watching if a second pharmacy files the same within the month.",
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
      body: "Imagine Hims does NOT launch peptides by year-end. The most credible failure path: a serious peptide-related adverse event at a competitor between now and July triggers a pre-emptive Hims pause. Latent condition partially present today: the 40% contamination rate plus accumulating safety coverage (NPR, UNSW) is the material of a bad-news cycle. Implication: holds the 0.80 posterior but warrants a faster downward move if any industry injury narrative breaks.",
      impliedDelta:
        "Hold p=0.80 for now; faster downward move on any injury narrative.",
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

// ---------- loader ----------

const BRIEFS_DIR = path.join(process.cwd(), "barque", "briefs");

function loadBriefs(): Brief[] {
  const parsed: Brief[] = [];
  if (fs.existsSync(BRIEFS_DIR)) {
    const files = fs
      .readdirSync(BRIEFS_DIR)
      .filter((f) => f.endsWith(".md"))
      .sort();
    for (const f of files) {
      const brief = parseMarkdownBrief(path.join(BRIEFS_DIR, f));
      if (brief) parsed.push(brief);
    }
  }
  // Merge legacy + parsed; parsed wins on slug collision so a markdown
  // retrofit of a legacy entry can replace the hardcoded version.
  const bySlug = new Map<string, Brief>();
  for (const b of LEGACY_BRIEFS) bySlug.set(b.slug, b);
  for (const b of parsed) bySlug.set(b.slug, b);
  return Array.from(bySlug.values()).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export const briefs: Brief[] = loadBriefs();

export function getBriefBySlug(slug: string): Brief | undefined {
  return briefs.find((b) => b.slug === slug);
}

export function getRecentBriefs(limit = 3): Brief[] {
  return briefs.slice(0, limit);
}

export const briefStats = {
  total: briefs.length,
  firstBriefDate: briefs.length
    ? [...briefs].sort((a, b) => (a.date < b.date ? -1 : 1))[0].date
    : null,
};
