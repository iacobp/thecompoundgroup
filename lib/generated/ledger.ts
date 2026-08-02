/**
 * GENERATED FILE. DO NOT EDIT BY HAND. Your edit will be overwritten and, in
 * the meantime, it will be a number on a public page with no source behind it.
 *
 * Written by barque/scripts/generate-ledger.py, which runs where the private
 * product repos are visible. This repo is PUBLIC and cannot import from them,
 * so this committed file is the only bridge.
 *
 * THE RULE (website/CLAUDE.md): /numbers is the only page that states an
 * operating number, and every number it states comes from here. If a figure is
 * not in this file, the page does not get to claim it. Add it to the generator
 * or drop the claim.
 *
 * THE SIX STATES exist so that "we did not look" can never render the same as
 * "we looked and it was zero":
 *
 *   OK             measured, has data
 *   EMPTY          measured, and the answer is genuinely nothing
 *   NOT_FETCHED    the read did not happen or the source is absent. Never zero
 *   NOT_CONNECTED  the property or channel is not instrumented yet. Never zero
 *   NOT_TRACKED    we do not record this anywhere at all
 *   WITHHELD       measured, deliberately not published
 */

export type LedgerState =
  | "OK"
  | "EMPTY"
  | "NOT_FETCHED"
  | "NOT_CONNECTED"
  | "NOT_TRACKED"
  | "WITHHELD";

export type LedgerMeta = {
  /** Which of the six states this reading is in. Never inferred from a value. */
  state: LedgerState;
  /** The file the value was read out of, relative to the portfolio root. */
  source: string;
  /** ISO date of the reading, not of the render. */
  asOf: string;
  /** Why it is EMPTY, NOT_FETCHED, NOT_CONNECTED, NOT_TRACKED or WITHHELD. */
  note?: string;
};

export type LedgerFigure = {
  label: string;
  value: string;
  context?: string;
};

export type RevenueTotals = {
  payout: number;
  conversions: number;
  clicks: number;
  window: string;
  asOf: string;
} | null;

export type RevenuePartner = {
  partner: string;
  clicks: number;
  conversions: number;
  payout: number;
  /** null when the partner has sent clicks and converted none of them. */
  epc: number | null;
  tier: string;
};

export type LedgerPropertyRow = {
  key: string;
  name: string;
  meta: LedgerMeta;
  figures: LedgerFigure[];
};

export type RevenueSection = {
  meta: LedgerMeta;
  totals: RevenueTotals;
  properties: LedgerPropertyRow[];
  partners: { meta: LedgerMeta; rows: RevenuePartner[] };
};

export type SearchSection = {
  meta: LedgerMeta;
  properties: LedgerPropertyRow[];
};

export type ResolvedForecast = {
  id: string;
  resolvedOn: string;
  probability: string;
  outcome: string;
  /** Brier score. 0 is perfect, 0.25 is a coin flip, 1 is confidently wrong. */
  brier: number | null;
  /** True when the side the forecast leaned on is the side that happened. */
  called: boolean | null;
  leadTimeDays: string;
  contrarian: boolean;
  notes: string;
};

export type ForecastSection = {
  meta: LedgerMeta;
  resolved: ResolvedForecast[];
  resolvedCount: number;
  rightCount: number;
  wrongCount: number;
  openCount: number;
  openIds: string[];
  brier: number | null;
  brierBasis: string;
};

export type WorkOrderSection = {
  meta: LedgerMeta;
  raised: number;
  counts: { status: string; count: number }[];
  medianDaysToDone: number | null;
  medianBasis: string;
  byProduct: { product: string; raised: number; done: number; open: number }[];
};

export type Incident = {
  id: string;
  title: string;
  surface: string;
  whatBroke: string;
  howItLookedGreen: string;
  firstBroken: string;
  firstBrokenState: string;
  firstBrokenBasis: string;
  fixed: string;
  fixEvidence: string;
  hiding: string;
  daysBroken: number | null;
  /** True when the start date is the earliest provable one, not the real one. */
  daysBrokenIsFloor: boolean;
};

export type IncidentSection = { meta: LedgerMeta; rows: Incident[] };

export type ContentRow = {
  slug: string;
  published: string;
  ageDays: number;
  ranked: boolean;
  clicks: number | null;
  impressions: number | null;
};

export type ContentSection = {
  meta: LedgerMeta;
  rows: ContentRow[];
  eligible: number;
  ranked: number;
  notRanked: number;
  scope: string;
};

export type AiEngine = {
  engine: string;
  sessions: number;
  /** The raw analytics source strings folded into this engine. */
  rawSources: string[];
  shareOfAllSessions: number | null;
};

export type AiLanding = {
  path: string;
  engine: string;
  sessions: number;
  avgSeconds: number;
};

export type AiSection = {
  meta: LedgerMeta;
  engines: AiEngine[];
  aiSessions: number;
  allSessions: number;
  aiShare: number | null;
  windowDays: number;
  landings: AiLanding[];
  floorCaveat: string;
  knownDefect: string;
  otherProperties: LedgerMeta;
};

export type SpendRow = {
  item: string;
  category: string;
  state: LedgerState;
  amount: string | null;
  unit: string;
  asOf: string;
  basis: string;
};

export type SpendSection = {
  meta: LedgerMeta;
  rows: SpendRow[];
  trackedCount: number;
  untrackedCount: number;
};

export type LedgerFile = {
  generatedAt: string;
  generatedBy: string;
  /**
   * Whether per-partner clicks, conversions, payout and EPC crossed into this
   * public file. Set by LEDGER_PUBLISH_PARTNER_EPC in the generator. When it is
   * false the partners block is WITHHELD rather than absent, so the reader can
   * tell a policy from an empty result.
   */
  publishPartnerDetail: boolean;
  sectionTitles: Record<string, string>;
  sections: {
    revenue: RevenueSection;
    search: SearchSection;
    forecasts: ForecastSection;
    workOrders: WorkOrderSection;
    incidents: IncidentSection;
    content: ContentSection;
    aiCitations: AiSection;
    spend: SpendSection;
  };
};

export const ledger: LedgerFile = {
  "generatedAt": "2026-08-02",
  "generatedBy": "barque/scripts/generate-ledger.py",
  "publishPartnerDetail": true,
  "sectionTitles": {
    "revenue": "Revenue and conversions",
    "search": "Search performance",
    "forecasts": "Forecast accuracy",
    "workOrders": "Work-order throughput",
    "incidents": "What broke",
    "content": "Content published, and whether it ranked",
    "aiCitations": "AI citation share",
    "spend": "Spend"
  },
  "sections": {
    "revenue": {
      "meta": {
        "state": "OK",
        "source": "glp1picks/docs/seo-snapshot.json, barque/registry.yml",
        "asOf": "2026-08-02"
      },
      "totals": {
        "payout": 3849,
        "conversions": 15,
        "clicks": 3917,
        "window": "30-day window",
        "asOf": "2026-08-01"
      },
      "properties": [
        {
          "key": "glp1picks",
          "name": "GLP-1 Picks",
          "meta": {
            "state": "OK",
            "source": "glp1picks/docs/seo-snapshot.json",
            "asOf": "2026-08-01"
          },
          "figures": [
            {
              "label": "Affiliate payout",
              "value": "$3,849",
              "context": "30-day window"
            },
            {
              "label": "Conversions",
              "value": "15",
              "context": "30-day window"
            },
            {
              "label": "Affiliate clicks",
              "value": "3,917",
              "context": "30-day window"
            },
            {
              "label": "Conversion rate",
              "value": "0.38%",
              "context": "clicks to a partner that became a paid conversion"
            },
            {
              "label": "Pages sending clicks",
              "value": "31",
              "context": "of which 3 produced a conversion"
            },
            {
              "label": "Lifetime payout",
              "value": "$7,544",
              "context": "since the first conversion"
            },
            {
              "label": "Lifetime conversions",
              "value": "28",
              "context": "since the first conversion"
            }
          ]
        },
        {
          "key": "hrtpicks",
          "name": "HRT Picks",
          "meta": {
            "state": "NOT_CONNECTED",
            "source": "barque/registry.yml",
            "asOf": "2026-08-02",
            "note": "Katalys affiliate ID 12979 serves this property and the per-site split shipped 2026-08-01, but no Katalys reading for it is written to any committed file, so this ledger carries no revenue figure. Unmeasured, not zero."
          },
          "figures": []
        },
        {
          "key": "bestpeptideforthat",
          "name": "Best Peptide For That",
          "meta": {
            "state": "NOT_CONNECTED",
            "source": "barque/registry.yml",
            "asOf": "2026-08-02",
            "note": "No Katalys tracking links exist in this product's data, per barque/registry.yml. Monetisation is unwired, so revenue here is unsized rather than zero."
          },
          "figures": []
        },
        {
          "key": "glp1pets",
          "name": "GLP-1 Pets",
          "meta": {
            "state": "NOT_CONNECTED",
            "source": "barque/registry.yml",
            "asOf": "2026-08-02",
            "note": "No Katalys tracking links in this product's data. It is an authority site with no affiliate layer yet."
          },
          "figures": []
        },
        {
          "key": "titrate",
          "name": "Titrate",
          "meta": {
            "state": "NOT_CONNECTED",
            "source": "barque/registry.yml",
            "asOf": "2026-08-02",
            "note": "Not an affiliate surface. Revenue is App Store subscription revenue, and no App Store Connect export is committed to any repo this generator can read."
          },
          "figures": []
        }
      ],
      "partners": {
        "meta": {
          "state": "OK",
          "source": "glp1picks/docs/seo-snapshot.json",
          "asOf": "2026-08-01"
        },
        "rows": [
          {
            "partner": "Trim Rx",
            "clicks": 600,
            "conversions": 6,
            "payout": 1800.0,
            "epc": 3.0,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Embody GLP1",
            "clicks": 271,
            "conversions": 8,
            "payout": 1700.0,
            "epc": 6.27,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Gala Health",
            "clicks": 255,
            "conversions": 1,
            "payout": 349.0,
            "epc": 1.37,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Sesame Care",
            "clicks": 337,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "SkinnyRx - #1 GLP Weight Loss Provider",
            "clicks": 254,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Yucca Health Affiliate Program",
            "clicks": 234,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Strut Health",
            "clicks": 188,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "bmiMD Personalized Health RX",
            "clicks": 187,
            "conversions": 0,
            "payout": 0.0,
            "epc": 0.0,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Found Health",
            "clicks": 163,
            "conversions": 0,
            "payout": 0.0,
            "epc": 0.0,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Hers, Inc.",
            "clicks": 141,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Maximus",
            "clicks": 115,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "telos rx",
            "clicks": 100,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Enhance MD",
            "clicks": 94,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Wellorithm GLP 1",
            "clicks": 93,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Oak Weight Loss Program",
            "clicks": 90,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Direct Meds GLP-1 Offers Top Funnels ",
            "clicks": 76,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "MangoRx",
            "clicks": 71,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Sprout Health",
            "clicks": 71,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "TMates GLP1 Prescription Weight Loss",
            "clicks": 66,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Ageless ",
            "clicks": 63,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "DudeMeds",
            "clicks": 62,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "MEDVi",
            "clicks": 57,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "SHED",
            "clicks": 57,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Synergy Rx",
            "clicks": 52,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Breeze Meds",
            "clicks": 47,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "HealthRX Affiliate Program",
            "clicks": 38,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Care Bare Rx GLP1",
            "clicks": 36,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Peter MD",
            "clicks": 28,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Liv Body GLP-1",
            "clicks": 26,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Bodybuilding.com GLP-1 & Longevity",
            "clicks": 23,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Trimi GLP-1 ",
            "clicks": 22,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          }
        ]
      }
    },
    "search": {
      "meta": {
        "state": "OK",
        "source": "barque/data/gsc/",
        "asOf": "2026-08-02"
      },
      "properties": [
        {
          "key": "glp1picks",
          "name": "GLP-1 Picks",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/glp1picks.json",
            "asOf": "2026-08-02"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "1,580",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "981",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "785",
              "context": "summed over the top 250 pages of 981"
            },
            {
              "label": "Impressions",
              "value": "42,336",
              "context": "summed over the top 250 pages of 981"
            },
            {
              "label": "Strike-zone pairs",
              "value": "437",
              "context": "query and page pairs ranking 8 to 20, the cheapest wins available"
            }
          ]
        },
        {
          "key": "hrtpicks",
          "name": "HRT Picks",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/hrtpicks.json",
            "asOf": "2026-08-02"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "581",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "40",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "22",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "3,890",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "67",
              "context": "query and page pairs ranking 8 to 20, the cheapest wins available"
            }
          ]
        },
        {
          "key": "bestpeptideforthat",
          "name": "Best Peptide For That",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/bestpeptideforthat.json",
            "asOf": "2026-08-02"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "190",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "71",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "5",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "1,576",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "25",
              "context": "query and page pairs ranking 8 to 20, the cheapest wins available"
            }
          ]
        },
        {
          "key": "glp1pets",
          "name": "GLP-1 Pets",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/glp1pets.json",
            "asOf": "2026-08-02"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "89",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "2",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "2",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "476",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "6",
              "context": "query and page pairs ranking 8 to 20, the cheapest wins available"
            }
          ]
        },
        {
          "key": "titrate",
          "name": "Titrate",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/titrate.json",
            "asOf": "2026-08-02"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "177",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "6",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "4",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "807",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "7",
              "context": "query and page pairs ranking 8 to 20, the cheapest wins available"
            }
          ]
        },
        {
          "key": "thecompound",
          "name": "The Compound (this site)",
          "meta": {
            "state": "NOT_CONNECTED",
            "source": "barque/data/gsc/thecompound.json",
            "asOf": "2026-08-02",
            "note": "No Search Console snapshot is committed for this property, so this ledger has no reading to publish for it. That is a missing file, not a measured zero, and the row says so rather than showing zeros. It fills in on its own the day barque/data/gsc/thecompound.json appears, which needs thecompoundgroup.com added to the SITES table in barque/scripts/gsc-snapshot.py. When it does appear, expect a genuine zero baseline rather than history: this site published exactly one URL in its sitemap until 2026-08-02 while about 112 pages were live and returning 200, the Barque log among them."
          },
          "figures": []
        }
      ]
    },
    "forecasts": {
      "meta": {
        "state": "OK",
        "source": "barque/forecasts.tsv, barque/resolutions.tsv",
        "asOf": "2026-08-02"
      },
      "resolved": [
        {
          "id": "bpc157-pcac-2026",
          "resolvedOn": "2026-07-26",
          "probability": "0.70",
          "outcome": "FALSE",
          "brier": 0.49,
          "called": false,
          "leadTimeDays": "0",
          "contrarian": false,
          "notes": "Resolved FALSE. On 2026-07-23 the PCAC voted 8 to 6 with 1 abstention to RECOMMEND BPC-157 for addition to the 503A bulks list, i.e. the Cat-1-equivalent outcome the forecast said would not happen. KPV and TB-500 carried the same 8-6-1 tally and MOTS-c passed 7-5-2, so all four nominated peptides were recommended. Ground truth verified against bestpeptideforthat/src/data/peptides.ts pcacVote fields, which were primary-sourced at publication. THE LESSON, and it is the expensive one: the forecast reasoned that 'Regulator agent dominates regulatory decisions' and that FDA default on unapproved peptides without a US safety dossier is not-Cat-1. FDA staff DID oppose all seven substances. But the PCAC is an ADVISORY COMMITTEE, not the regulator, and it overrode its own staff. The model conflated the advisory body with the decision-maker. Future regulatory forecasts must model the advisory vote and the agency decision as TWO separate events with different actors and different base rates. The binding FDA decision is still pending and is a separate, unforecast question worth opening."
        },
        {
          "id": "pcac-july-multi-peptide",
          "resolvedOn": "2026-07-26",
          "probability": "0.55",
          "outcome": "TRUE",
          "brier": 0.2025,
          "called": true,
          "leadTimeDays": "0",
          "contrarian": true,
          "notes": "Resolved TRUE. All four peptides reviewed on 2026-07-23 (BPC-157, KPV, TB-500 at 8-6-1; MOTS-c at 7-5-2) were recommended for the 503A list, clearing the 'at least 2 of 4' bar with margin. This forecast was a deliberate upward revision made 2026-04-19 after the 12-peptide Category 2 removal wave, on the reasoning that the reclassification trajectory was more aggressive than first modelled. That revision was correct and it is the one that paid: the same session's BPC-157 forecast, which kept the conservative not-Cat-1 view, resolved FALSE at Brier 0.49. Lesson: when a trajectory signal contradicts a standing institutional prior, weight the trajectory. Resolved 3 days after horizon because the resolution loop had not run since 2026-06-10."
        },
        {
          "id": "compound-peptide-property-live",
          "resolvedOn": "2026-06-10",
          "probability": "0.75",
          "outcome": "TRUE",
          "brier": 0.0625,
          "called": true,
          "leadTimeDays": "51",
          "contrarian": false,
          "notes": "Resolved TRUE on the broader portfolio-ship interpretation per operator clarification 2026-05-15. Within the 103-day window (made 2026-04-19, horizon 2026-07-31): HRT Picks (hrtpicks.vercel.app, shipped 2026-05-12), glp1pets.com (shipped 2026-04-26), and Titrate all live, plus the public /numbers page on the mother site. Two-properties bar cleared with room to spare; functionally true ~51 days before horizon. Flagged for operator resolution 25 consecutive briefs (2026-05-16 through 2026-06-10) before this write. Validates the AI-speed-parallel-build thesis. Brier 0.0625 (forecast 0.75, outcome TRUE)."
        }
      ],
      "resolvedCount": 3,
      "rightCount": 2,
      "wrongCount": 1,
      "openCount": 4,
      "openIds": [
        "medicare-glp1-bridge-uptake",
        "peptide-affiliate-share",
        "hims-peptide-launch",
        "peptide-safety-incident"
      ],
      "brier": 0.2517,
      "brierBasis": "mean of 3 scored resolutions. Zero is perfect, 0.25 is a coin flip, 1.0 is confidently wrong."
    },
    "workOrders": {
      "meta": {
        "state": "OK",
        "source": "barque/work-orders.tsv, barque/work-order-status.tsv",
        "asOf": "2026-08-02"
      },
      "raised": 68,
      "counts": [
        {
          "status": "done",
          "count": 57
        },
        {
          "status": "killed",
          "count": 4
        },
        {
          "status": "still open",
          "count": 4
        },
        {
          "status": "blocked-verification",
          "count": 2
        },
        {
          "status": "killed-migrated-to-probe",
          "count": 1
        }
      ],
      "medianDaysToDone": 1,
      "medianBasis": "median of 57 closed orders that carry both a raised date and a done date.",
      "byProduct": [
        {
          "product": "glp1picks",
          "raised": 39,
          "done": 31,
          "open": 4
        },
        {
          "product": "glp1pets",
          "raised": 16,
          "done": 15,
          "open": 0
        },
        {
          "product": "bestpeptideforthat",
          "raised": 8,
          "done": 6,
          "open": 0
        },
        {
          "product": "hrtpicks",
          "raised": 4,
          "done": 4,
          "open": 0
        },
        {
          "product": "not yet announced",
          "raised": 1,
          "done": 1,
          "open": 0
        }
      ]
    },
    "incidents": {
      "meta": {
        "state": "OK",
        "source": "barque/incidents.tsv",
        "asOf": "2026-08-02"
      },
      "rows": [
        {
          "id": "scoring-gate-could-not-fail",
          "title": "The scoring gate could not fail",
          "surface": "glp1picks, hrtpicks",
          "whatBroke": "recompute-scores --check only ever raises a FAIL on a provider carrying _score_status: verified. Not one record on either site carried that status, so the check had no path to a non-zero exit.",
          "howItLookedGreen": "Exit 0 on every run since the gate shipped, read as no drift.",
          "firstBroken": "2026-04-29",
          "firstBrokenState": "DATED",
          "firstBrokenBasis": "glp1picks commit 707da39 added scripts/recompute-scores.ts with the verified-only fail condition.",
          "fixed": "2026-08-01",
          "fixEvidence": "glp1picks commit 2142d6d. Verified both directions: inflating one displayed score pushes its drift from 3.3 to 5.9 and --check exits 1, restoring it exits 0.",
          "hiding": "17 of 25 scored records sat 2 to 5.9 points above what their own evidence computes, 64 points of drift in total.",
          "daysBroken": 94,
          "daysBrokenIsFloor": false
        },
        {
          "id": "anchor-audit-blind-three-ways",
          "title": "The anchor audit was blind three ways at once",
          "surface": "glp1picks",
          "whatBroke": "The price gate paired a name with a price by adjacency, so it could not see a price written inside a markdown link, which is how this repo writes almost every provider mention. It also scraped prices out of code comments, so a record explaining its own price history registered those old numbers as current and suppressed every stale quote of them. And it downgraded findings on the words compounded, tirzepatide and first month, the three most common words in the corpus.",
          "howItLookedGreen": "Green runs, quoted at the time as evidence the portfolio was clean.",
          "firstBroken": "2026-05-10",
          "firstBrokenState": "DATED",
          "firstBrokenBasis": "glp1picks commit 81ed639 created the audit with the adjacency matcher.",
          "fixed": "2026-08-02",
          "fixEvidence": "glp1picks commits 5a36d1c (coverage: the parser was reading 46 of 53 records) and a0808da (link, comment and soft-context blindness). Proved by injecting a fake price into posts.ts: the old script exited 0 and found nothing, the new one exited 1 and named it.",
          "hiding": "Ten blog passages still sold one provider's expired first-month promotion as its current price, and the audit had suppressed all of them.",
          "daysBroken": 84,
          "daysBrokenIsFloor": false
        },
        {
          "id": "indexing-api-submitting-into-a-void",
          "title": "The indexing job was submitting into a void",
          "surface": "glp1picks",
          "whatBroke": "Google's Indexing API acts on JobPosting and BroadcastEvent only. For every other page type it returns HTTP 200 and does nothing. The daily job recorded that 200 as last_submit_ok true.",
          "howItLookedGreen": "A daily green run and a log full of successful submissions.",
          "firstBroken": "2026-05-16",
          "firstBrokenState": "DATED",
          "firstBrokenBasis": "glp1picks commit d015067 added the daily indexing cron. Two docs in the same repo, what-this-domain-can-rank.md L108-122 and site-atlas.md L114, had already written down that the API ignores these page types. The code kept calling it.",
          "fixed": "2026-08-01",
          "fixEvidence": "glp1picks commit a9230ae removed the call and purged the three false keys from the history file behind a dated marker.",
          "hiding": "897 URLs carried a successful submission on record. 203 of them were NOT_INDEXED, and 165 of those were re-inspected after the submission and were still not indexed.",
          "daysBroken": 77,
          "daysBrokenIsFloor": false
        },
        {
          "id": "three-of-five-gsc-reports-never-existed",
          "title": "Three of the five search reports the briefs demanded did not exist",
          "surface": "portfolio",
          "whatBroke": "The SEO Engine brief names strike-zone, new-queries and page-queries as its mandatory primary analysis. The data bridge produced pages and queries only. A report with no source read as a skip, so the brief's own primary phase could not complete on any run.",
          "howItLookedGreen": "Every run completed and committed.",
          "firstBroken": "2026-07-22",
          "firstBrokenState": "EVIDENCED FLOOR, TRUE START UNDATED",
          "firstBrokenBasis": "glp1picks commit 7ab95ba created the snapshot bridge without those three reports. The brief demanded them before that, but the routine prompts were unversioned SaaS state until barque commit ea6bc94 on 2026-07-28, so no earlier evidence exists. The window below is a floor, not a measurement.",
          "fixed": "2026-08-01",
          "fixEvidence": "barque commit b1abedf added all nine reports across five properties with an explicit three-state field, and glp1picks commit cf99f36 added the missing three to its own bridge.",
          "hiding": "The self-declared primary analysis of a weekday routine, on every run it made.",
          "daysBroken": 10,
          "daysBrokenIsFloor": true
        }
      ]
    },
    "content": {
      "meta": {
        "state": "OK",
        "source": "glp1picks/src/data/posts.ts, barque/data/gsc/glp1picks.json",
        "asOf": "2026-08-02"
      },
      "rows": [
        {
          "slug": "medicare-glp1-coverage-july-2026",
          "published": "2026-07-03",
          "ageDays": 30,
          "ranked": true,
          "clicks": 0,
          "impressions": 2
        },
        {
          "slug": "ozempic-vs-wegovy",
          "published": "2026-07-02",
          "ageDays": 31,
          "ranked": true,
          "clicks": 0,
          "impressions": 50
        },
        {
          "slug": "compounded-semaglutide-crackdown",
          "published": "2026-06-19",
          "ageDays": 44,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "cagrisema-weight-loss-drug",
          "published": "2026-06-16",
          "ageDays": 47,
          "ranked": true,
          "clicks": 0,
          "impressions": 25
        },
        {
          "slug": "medicare-glp1-bridge-enrollment-guide",
          "published": "2026-06-11",
          "ageDays": 52,
          "ranked": true,
          "clicks": 1,
          "impressions": 164
        },
        {
          "slug": "ivyrx-glp1-review-2026",
          "published": "2026-05-12",
          "ageDays": 82,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "fda-503b-permanent-compounding-ban-2026",
          "published": "2026-05-08",
          "ageDays": 86,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "tirzepatide-dosage-chart",
          "published": "2026-05-07",
          "ageDays": 87,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "next-weight-loss-drugs-pipeline-2026",
          "published": "2026-05-05",
          "ageDays": 89,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "foundayo-guide-2026",
          "published": "2026-04-29",
          "ageDays": 95,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "zepbound-vs-mounjaro",
          "published": "2026-04-22",
          "ageDays": 102,
          "ranked": true,
          "clicks": 0,
          "impressions": 56
        },
        {
          "slug": "zepbound-side-effects",
          "published": "2026-04-20",
          "ageDays": 104,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "rfk-medicare-glp1-framework-april-2026",
          "published": "2026-04-16",
          "ageDays": 108,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "glp1-beginners-guide-2026",
          "published": "2026-04-13",
          "ageDays": 111,
          "ranked": true,
          "clicks": 1,
          "impressions": 56
        },
        {
          "slug": "brand-vs-compounded-glp1",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "first-month-glp1-what-to-expect",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "wegovy-pill-vs-injection",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": true,
          "clicks": 0,
          "impressions": 70
        },
        {
          "slug": "foods-to-avoid-on-glp1",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": true,
          "clicks": 0,
          "impressions": 18
        },
        {
          "slug": "glp1-side-effects-management-guide",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": true,
          "clicks": 0,
          "impressions": 2
        },
        {
          "slug": "tirzepatide-cost",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "compounded-tirzepatide",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": true,
          "clicks": 0,
          "impressions": 7
        },
        {
          "slug": "zepbound-mounjaro-savings-card",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": true,
          "clicks": 0,
          "impressions": 4
        },
        {
          "slug": "foundayo-ships-how-to-order-april-2026",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "fda-glp1-warning-letters-march-april-2026",
          "published": "2026-04-11",
          "ageDays": 113,
          "ranked": true,
          "clicks": 0,
          "impressions": 7
        },
        {
          "slug": "glp1-patches",
          "published": "2026-04-08",
          "ageDays": 116,
          "ranked": true,
          "clicks": 0,
          "impressions": 2
        },
        {
          "slug": "ro-vs-hims-glp1-comparison",
          "published": "2026-04-03",
          "ageDays": 121,
          "ranked": true,
          "clicks": 0,
          "impressions": 24
        },
        {
          "slug": "foundayo-orforglipron-fda-approved",
          "published": "2026-04-02",
          "ageDays": 122,
          "ranked": true,
          "clicks": 0,
          "impressions": 30
        }
      ],
      "eligible": 27,
      "ranked": 19,
      "notRanked": 8,
      "scope": "Every article on GLP-1 Picks published at least 30 days ago, checked against the 28-day pages report. Ranked means the article's own URL appears in that report, which stores the top 250 pages by clicks out of 981. An article missing from it may still have a handful of impressions in the tail; what this counts is whether it earned a place in the measured set."
    },
    "aiCitations": {
      "meta": {
        "state": "OK",
        "source": "glp1picks/docs/seo-snapshot.json",
        "asOf": "2026-08-01"
      },
      "engines": [
        {
          "engine": "chatgpt",
          "sessions": 88,
          "rawSources": [
            "chatgpt.com"
          ],
          "shareOfAllSessions": 5.23
        },
        {
          "engine": "copilot",
          "sessions": 10,
          "rawSources": [
            "copilot.com"
          ],
          "shareOfAllSessions": 0.59
        },
        {
          "engine": "perplexity",
          "sessions": 9,
          "rawSources": [
            "perplexity",
            "perplexity.ai"
          ],
          "shareOfAllSessions": 0.54
        }
      ],
      "aiSessions": 107,
      "allSessions": 1681,
      "aiShare": 6.37,
      "windowDays": 30,
      "landings": [
        {
          "path": "/states/california",
          "engine": "chatgpt.com",
          "sessions": 14,
          "avgSeconds": 81
        },
        {
          "path": "/reviews/embody",
          "engine": "chatgpt.com",
          "sessions": 6,
          "avgSeconds": 36
        },
        {
          "path": "/states/texas",
          "engine": "chatgpt.com",
          "sessions": 6,
          "avgSeconds": 139
        },
        {
          "path": "/states/florida",
          "engine": "chatgpt.com",
          "sessions": 5,
          "avgSeconds": 96
        }
      ],
      "floorCaveat": "Read this as a floor, not a total. Somewhere between a third and two thirds of sessions that begin inside an AI assistant arrive with no referrer at all, so they land in direct traffic and are invisible here.",
      "knownDefect": "This is one measurement covering two sites. GLP-1 Picks and GLP-1 Pets fire the same analytics measurement ID and the read applies no hostname filter, so every figure in this section blends both properties. Recorded as a known defect in the dependency registry on 2026-08-01 and not yet fixed. Publishing it while it is wrong is the point: the alternative is publishing it as though it were clean.",
      "otherProperties": {
        "state": "NOT_CONNECTED",
        "source": "barque/registry.yml",
        "asOf": "2026-08-02",
        "note": "HRT Picks, Best Peptide For That and Titrate have no analytics property at all, so their AI citation share is unsized. Not zero."
      }
    },
    "spend": {
      "meta": {
        "state": "OK",
        "source": "barque/spend.tsv",
        "asOf": "2026-08-02"
      },
      "rows": [
        {
          "item": "DataForSEO prepaid balance remaining",
          "category": "data",
          "state": "OK",
          "amount": "$30.65",
          "unit": "balance",
          "asOf": "2026-08-01",
          "basis": "registry.yml services.dataforseo.balance_usd, verified by GET https://api.dataforseo.com/v3/appendix/user_data returning HTTP 200."
        },
        {
          "item": "DataForSEO spend to date",
          "category": "data",
          "state": "NOT_TRACKED",
          "amount": null,
          "unit": "cumulative",
          "asOf": "2026-08-02",
          "basis": "Every DataForSEO response returns a cost field. Nothing logs it. barque/routines/ARCHITECTURE.md section 6 says it should be logged to a ledger and reconciled monthly against the balance, and that is not built yet. Only the remaining balance above is measured."
        },
        {
          "item": "Hosting",
          "category": "infrastructure",
          "state": "NOT_TRACKED",
          "amount": null,
          "unit": "monthly",
          "asOf": "2026-08-02",
          "basis": "Six Vercel projects run the portfolio. No billing export is committed to any repo this generator can read, so no figure is stated."
        },
        {
          "item": "Domains",
          "category": "infrastructure",
          "state": "NOT_TRACKED",
          "amount": null,
          "unit": "annual",
          "asOf": "2026-08-02",
          "basis": "Registrar renewal costs are not recorded in any repo. No figure is stated."
        },
        {
          "item": "Model and API usage",
          "category": "tooling",
          "state": "NOT_TRACKED",
          "amount": null,
          "unit": "monthly",
          "asOf": "2026-08-02",
          "basis": "The routines and the build sessions run against a paid model subscription and several metered APIs. None of it lands in a file, so the ledger carries no number for it."
        }
      ],
      "trackedCount": 1,
      "untrackedCount": 4
    }
  }
};

/**
 * Sections whose state means the reader is looking at an absence rather than a
 * measurement. The page renders these differently on purpose: a missing source
 * that renders as a zero is the failure this whole file exists to prevent.
 */
export const ABSENT_STATES: readonly LedgerState[] = [
  "NOT_FETCHED",
  "NOT_CONNECTED",
  "NOT_TRACKED",
  "WITHHELD",
];

export function isAbsent(state: string): boolean {
  return (ABSENT_STATES as readonly string[]).includes(state);
}

/** Human label for a state, used wherever a figure is missing. */
export const STATE_LABEL: Record<LedgerState, string> = {
  OK: "measured",
  EMPTY: "measured, and genuinely nothing",
  NOT_FETCHED: "not fetched",
  NOT_CONNECTED: "not yet connected",
  NOT_TRACKED: "not tracked",
  WITHHELD: "withheld",
};
