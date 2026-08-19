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
  "generatedAt": "2026-08-19",
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
        "asOf": "2026-08-19"
      },
      "totals": {
        "payout": 8748,
        "conversions": 53,
        "clicks": 4436,
        "window": "30-day window",
        "asOf": "2026-08-19"
      },
      "properties": [
        {
          "key": "glp1picks",
          "name": "GLP-1 Picks",
          "meta": {
            "state": "OK",
            "source": "glp1picks/docs/seo-snapshot.json",
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Affiliate payout",
              "value": "$8,748",
              "context": "30-day window"
            },
            {
              "label": "Conversions",
              "value": "53",
              "context": "30-day window"
            },
            {
              "label": "Affiliate clicks",
              "value": "4,436",
              "context": "30-day window"
            },
            {
              "label": "Conversion rate",
              "value": "1.19%",
              "context": "clicks to a partner that became a paid conversion"
            },
            {
              "label": "Pages sending clicks",
              "value": "32",
              "context": "of which 5 produced a conversion"
            },
            {
              "label": "Lifetime payout",
              "value": "$14,492",
              "context": "since the first conversion"
            },
            {
              "label": "Lifetime conversions",
              "value": "72",
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
            "asOf": "2026-08-19",
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
            "asOf": "2026-08-19",
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
            "asOf": "2026-08-19",
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
            "asOf": "2026-08-19",
            "note": "Not an affiliate surface. Revenue is App Store subscription revenue, and no App Store Connect export is committed to any repo this generator can read."
          },
          "figures": []
        }
      ],
      "partners": {
        "meta": {
          "state": "OK",
          "source": "glp1picks/docs/seo-snapshot.json",
          "asOf": "2026-08-19"
        },
        "rows": [
          {
            "partner": "Embody GLP1",
            "clicks": 524,
            "conversions": 48,
            "payout": 7200.0,
            "epc": 13.74,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Gala Health",
            "clicks": 276,
            "conversions": 2,
            "payout": 698.0,
            "epc": 2.53,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Bodybuilding.com GLP-1 & Longevity",
            "clicks": 39,
            "conversions": 1,
            "payout": 400.0,
            "epc": 10.26,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Trim Rx",
            "clicks": 561,
            "conversions": 1,
            "payout": 300.0,
            "epc": 0.53,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "bmiMD Personalized Health RX",
            "clicks": 191,
            "conversions": 1,
            "payout": 150.0,
            "epc": 0.79,
            "tier": "REVENUE_SCALE"
          },
          {
            "partner": "Sesame Care",
            "clicks": 329,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Yucca Health Affiliate Program",
            "clicks": 215,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "SkinnyRx - #1 GLP Weight Loss Provider",
            "clicks": 208,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Strut Health",
            "clicks": 185,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Found Health",
            "clicks": 175,
            "conversions": 0,
            "payout": 0.0,
            "epc": 0.0,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Hers, Inc.",
            "clicks": 154,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Maximus",
            "clicks": 148,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "telos rx",
            "clicks": 117,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Enhance MD",
            "clicks": 112,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Oak Weight Loss Program",
            "clicks": 108,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Wellorithm GLP 1",
            "clicks": 106,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Ageless ",
            "clicks": 98,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Direct Meds GLP-1 Offers Top Funnels ",
            "clicks": 83,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "MEDVi",
            "clicks": 79,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "TMates GLP1 Prescription Weight Loss",
            "clicks": 78,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "HealthRX Affiliate Program",
            "clicks": 77,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Sprout Health",
            "clicks": 73,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "MangoRx",
            "clicks": 68,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "SHED",
            "clicks": 67,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Peter MD",
            "clicks": 42,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "Trimi GLP-1 ",
            "clicks": 39,
            "conversions": 0,
            "payout": 0.0,
            "epc": null,
            "tier": "REVENUE_LEAK"
          },
          {
            "partner": "SnagRX",
            "clicks": 25,
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
        "asOf": "2026-08-19"
      },
      "properties": [
        {
          "key": "glp1picks",
          "name": "GLP-1 Picks",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/glp1picks.json",
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "2,293",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "1,149",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "1,237",
              "context": "summed over the top 250 pages of 1,149"
            },
            {
              "label": "Impressions",
              "value": "76,094",
              "context": "summed over the top 250 pages of 1,149"
            },
            {
              "label": "Strike-zone pairs",
              "value": "623",
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
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "141",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "38",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "3",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "468",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "19",
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
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "28",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "52",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "0",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "181",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "5",
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
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "191",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "12",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "10",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "1,632",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "26",
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
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "109",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "9",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "3",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "487",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "2",
              "context": "query and page pairs ranking 8 to 20, the cheapest wins available"
            }
          ]
        },
        {
          "key": "thecompound",
          "name": "The Compound (this site)",
          "meta": {
            "state": "OK",
            "source": "barque/data/gsc/thecompound.json",
            "asOf": "2026-08-19"
          },
          "figures": [
            {
              "label": "Queries with impressions",
              "value": "1",
              "context": "28-day window"
            },
            {
              "label": "Pages with impressions",
              "value": "24",
              "context": "28-day window"
            },
            {
              "label": "Clicks",
              "value": "0",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Impressions",
              "value": "52",
              "context": "summed over every page the report returned"
            },
            {
              "label": "Strike-zone pairs",
              "value": "0",
              "context": "checked, and nothing on this property ranks 8 to 20 yet"
            }
          ]
        }
      ]
    },
    "forecasts": {
      "meta": {
        "state": "OK",
        "source": "barque/forecasts.tsv, barque/resolutions.tsv",
        "asOf": "2026-08-19"
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
        "asOf": "2026-08-19"
      },
      "raised": 113,
      "counts": [
        {
          "status": "done",
          "count": 80
        },
        {
          "status": "still open",
          "count": 23
        },
        {
          "status": "killed",
          "count": 8
        },
        {
          "status": "killed-migrated-to-probe",
          "count": 1
        },
        {
          "status": "blocked-verification",
          "count": 1
        }
      ],
      "medianDaysToDone": 1,
      "medianBasis": "median of 80 closed orders that carry both a raised date and a done date.",
      "byProduct": [
        {
          "product": "glp1picks",
          "raised": 56,
          "done": 43,
          "open": 7
        },
        {
          "product": "bestpeptideforthat",
          "raised": 22,
          "done": 12,
          "open": 8
        },
        {
          "product": "glp1pets",
          "raised": 19,
          "done": 17,
          "open": 1
        },
        {
          "product": "hrtpicks",
          "raised": 13,
          "done": 7,
          "open": 5
        },
        {
          "product": "not yet announced",
          "raised": 3,
          "done": 1,
          "open": 2
        }
      ]
    },
    "incidents": {
      "meta": {
        "state": "OK",
        "source": "barque/incidents.tsv",
        "asOf": "2026-08-19"
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
        "asOf": "2026-08-19"
      },
      "rows": [
        {
          "slug": "semaglutide-before-and-after",
          "published": "2026-07-17",
          "ageDays": 33,
          "ranked": true,
          "clicks": 0,
          "impressions": 3
        },
        {
          "slug": "foundayo-vs-wegovy-pill",
          "published": "2026-07-16",
          "ageDays": 34,
          "ranked": true,
          "clicks": 0,
          "impressions": 257
        },
        {
          "slug": "semaglutide-vs-tirzepatide",
          "published": "2026-07-15",
          "ageDays": 35,
          "ranked": true,
          "clicks": 0,
          "impressions": 40
        },
        {
          "slug": "oral-glp1-weight-loss-pill",
          "published": "2026-07-09",
          "ageDays": 41,
          "ranked": true,
          "clicks": 0,
          "impressions": 229
        },
        {
          "slug": "wegovy-vs-zepbound",
          "published": "2026-07-07",
          "ageDays": 43,
          "ranked": true,
          "clicks": 0,
          "impressions": 12
        },
        {
          "slug": "glp1-cost-guide-2026",
          "published": "2026-07-06",
          "ageDays": 44,
          "ranked": true,
          "clicks": 0,
          "impressions": 259
        },
        {
          "slug": "medicare-part-d-glp1-coverage-2026-complete-guide",
          "published": "2026-07-06",
          "ageDays": 44,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "medicare-glp1-coverage-july-2026",
          "published": "2026-07-03",
          "ageDays": 47,
          "ranked": true,
          "clicks": 0,
          "impressions": 3
        },
        {
          "slug": "ozempic-vs-wegovy",
          "published": "2026-07-02",
          "ageDays": 48,
          "ranked": true,
          "clicks": 0,
          "impressions": 19
        },
        {
          "slug": "compounded-semaglutide-crackdown",
          "published": "2026-06-19",
          "ageDays": 61,
          "ranked": true,
          "clicks": 0,
          "impressions": 3
        },
        {
          "slug": "cagrisema-weight-loss-drug",
          "published": "2026-06-16",
          "ageDays": 64,
          "ranked": true,
          "clicks": 0,
          "impressions": 88
        },
        {
          "slug": "medicare-glp1-bridge-enrollment-guide",
          "published": "2026-06-11",
          "ageDays": 69,
          "ranked": true,
          "clicks": 0,
          "impressions": 196
        },
        {
          "slug": "ivyrx-glp1-review-2026",
          "published": "2026-05-12",
          "ageDays": 99,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "fda-503b-permanent-compounding-ban-2026",
          "published": "2026-05-08",
          "ageDays": 103,
          "ranked": true,
          "clicks": 0,
          "impressions": 6
        },
        {
          "slug": "tirzepatide-dosage-chart",
          "published": "2026-05-07",
          "ageDays": 104,
          "ranked": true,
          "clicks": 0,
          "impressions": 16
        },
        {
          "slug": "next-weight-loss-drugs-pipeline-2026",
          "published": "2026-05-05",
          "ageDays": 106,
          "ranked": true,
          "clicks": 0,
          "impressions": 2
        },
        {
          "slug": "foundayo-guide-2026",
          "published": "2026-04-29",
          "ageDays": 112,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "zepbound-vs-mounjaro",
          "published": "2026-04-22",
          "ageDays": 119,
          "ranked": true,
          "clicks": 0,
          "impressions": 32
        },
        {
          "slug": "zepbound-side-effects",
          "published": "2026-04-20",
          "ageDays": 121,
          "ranked": true,
          "clicks": 1,
          "impressions": 5
        },
        {
          "slug": "rfk-medicare-glp1-framework-april-2026",
          "published": "2026-04-16",
          "ageDays": 125,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "glp1-beginners-guide-2026",
          "published": "2026-04-13",
          "ageDays": 128,
          "ranked": true,
          "clicks": 1,
          "impressions": 58
        },
        {
          "slug": "brand-vs-compounded-glp1",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "first-month-glp1-what-to-expect",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "wegovy-pill-vs-injection",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 110
        },
        {
          "slug": "foods-to-avoid-on-glp1",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 25
        },
        {
          "slug": "glp1-side-effects-management-guide",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "tirzepatide-cost",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": false,
          "clicks": null,
          "impressions": null
        },
        {
          "slug": "compounded-tirzepatide",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "zepbound-mounjaro-savings-card",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 1
        },
        {
          "slug": "foundayo-ships-how-to-order-april-2026",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 2
        },
        {
          "slug": "fda-glp1-warning-letters-march-april-2026",
          "published": "2026-04-11",
          "ageDays": 130,
          "ranked": true,
          "clicks": 0,
          "impressions": 7
        },
        {
          "slug": "glp1-patches",
          "published": "2026-04-08",
          "ageDays": 133,
          "ranked": true,
          "clicks": 0,
          "impressions": 2
        },
        {
          "slug": "ro-vs-hims-glp1-comparison",
          "published": "2026-04-03",
          "ageDays": 138,
          "ranked": true,
          "clicks": 0,
          "impressions": 29
        },
        {
          "slug": "foundayo-orforglipron-fda-approved",
          "published": "2026-04-02",
          "ageDays": 139,
          "ranked": true,
          "clicks": 0,
          "impressions": 26
        }
      ],
      "eligible": 34,
      "ranked": 27,
      "notRanked": 7,
      "scope": "Every article on GLP-1 Picks published at least 30 days ago, checked against the 28-day pages report. Ranked means the article's own URL appears in that report, which stores the top 250 pages by clicks out of 1,149. An article missing from it may still have a handful of impressions in the tail; what this counts is whether it earned a place in the measured set."
    },
    "aiCitations": {
      "meta": {
        "state": "OK",
        "source": "glp1picks/docs/seo-snapshot.json",
        "asOf": "2026-08-19"
      },
      "engines": [
        {
          "engine": "chatgpt",
          "sessions": 52,
          "rawSources": [
            "chatgpt.com"
          ],
          "shareOfAllSessions": 2.29
        }
      ],
      "aiSessions": 52,
      "allSessions": 2266,
      "aiShare": 2.29,
      "windowDays": 30,
      "landings": [
        {
          "path": "/states/california",
          "engine": "chatgpt.com",
          "sessions": 9,
          "avgSeconds": 31
        },
        {
          "path": "/states/texas",
          "engine": "chatgpt.com",
          "sessions": 6,
          "avgSeconds": 148
        }
      ],
      "floorCaveat": "Read this as a floor, not a total. Somewhere between a third and two thirds of sessions that begin inside an AI assistant arrive with no referrer at all, so they land in direct traffic and are invisible here.",
      "knownDefect": "This is one measurement covering two sites. GLP-1 Picks and GLP-1 Pets fire the same analytics measurement ID and the read applies no hostname filter, so every figure in this section blends both properties. Recorded as a known defect in the dependency registry on 2026-08-01 and not yet fixed. Publishing it while it is wrong is the point: the alternative is publishing it as though it were clean.",
      "otherProperties": {
        "state": "NOT_CONNECTED",
        "source": "barque/registry.yml",
        "asOf": "2026-08-19",
        "note": "HRT Picks, Best Peptide For That and Titrate have no analytics property at all, so their AI citation share is unsized. Not zero."
      }
    },
    "spend": {
      "meta": {
        "state": "OK",
        "source": "barque/spend.tsv",
        "asOf": "2026-08-19"
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
