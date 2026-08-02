/**
 * Portfolio metrics — the public source of truth for /numbers.
 *
 * Updated manually for now (V1); intended to be regenerated weekly by a
 * scheduled task that pulls live data from each property's data layer
 * (Katalys for affiliate revenue, GSC for organic, Resend for audience,
 * App Store Connect for installs, Plausible/GA4 for traffic).
 *
 * The schema below is what the future automation will write into;
 * keeping it stable now means the page doesn't need to change when the
 * cron lands.
 */

import { anchors, anchorValue } from "@/lib/generated/anchors";

/**
 * ANCHOR RULE. Every product fact below (provider counts, partner counts,
 * readout windows, app pricing, programme counts) is interpolated from
 * lib/generated/anchors.ts. The live measurements are the only hand-held
 * strings, and `barque/scripts/refresh-portfolio-metrics.py` rewrites those
 * by matching `{ label: "...", value: "..." }`, so a metric that script owns
 * must stay a plain string literal. The ones it does not own read the anchor.
 *
 * Removed 2026-08-02 rather than corrected: the portfolio "Pages indexed"
 * aggregate and the per-property page counts. Those came from no source the
 * anchor can supply and no source this file measures. The anchor records
 * pagesIndexed and pagesPublished as no-anchor with the reason.
 */
const g = anchors.products.glp1picks.facts;
const petReadouts = anchors.products.glp1pets.facts.readoutWindows
  .value as Record<string, string>;

const glp1picksRouteFamilyPages =
  Number(g.providerCount.value) +
  Number(g.comparisonPageCount.value) +
  Number(g.stateGuideCount.value) +
  Number(g.blogPostCount.value);

export type PortfolioStatus = "live" | "in-development" | "planned";

export type PortfolioMetric = {
  label: string;
  value: string;
  context?: string; // e.g. "30-day window" or "since launch"
};

export type PortfolioProperty = {
  num: string;
  slug: string;
  name: string;
  domain: string;
  url: string;
  status: PortfolioStatus;
  oneLiner: string;
  pages?: number;
  conversionEvent: string;
  metrics: PortfolioMetric[];
  note?: string;
  asOf: string; // ISO date of most recent metric refresh
};

export type PortfolioMetrics = {
  refreshedOn: string;
  cadence: string;
  aggregate: PortfolioMetric[];
  properties: PortfolioProperty[];
  methodology: string[];
};

export const portfolioMetrics: PortfolioMetrics = {
  refreshedOn: "2026-08-02",
  cadence:
    "Refreshed weekly. Numbers are point-in-time and may lag the underlying systems by a day or two depending on data-source freshness.",

  aggregate: [
    { label: "Properties live", value: "5" },
    { label: "In development", value: "1" },
    { label: "Email subscribers", value: "~65", context: "all audiences combined" },
    {
      label: "Affiliate revenue (30d)",
      value: "$3,849",
      context: "verified payouts, GLP-1 Picks only — other properties pre-monetization",
    },
  ],

  properties: [
    {
      num: "I",
      slug: "glp1-picks",
      name: "GLP-1 Picks",
      domain: "glp1picks.com",
      url: "https://glp1picks.com",
      status: "live",
      oneLiner: `Independent comparison of ${anchorValue(
        "glp1picks",
        "providerCount",
      )} GLP-1 telehealth programs. Live since early 2026, monetized via the Katalys affiliate network.`,
      conversionEvent: "Affiliate sign-up at a partner provider",
      metrics: [
        { label: "Providers reviewed", value: `${g.providerCount.value}` },
        {
          label: "Pages in four route families",
          value: glp1picksRouteFamilyPages.toLocaleString("en-US"),
          context: "reviews, comparisons, state guides, articles",
        },
        { label: "Organic impressions", value: "45,615", context: "30-day window" },
        { label: "Organic clicks", value: "788", context: "30-day window" },
        { label: "Affiliate clicks", value: "3917", context: "30-day window via Katalys" },
        { label: "Conversions", value: "15", context: "30-day window" },
        { label: "Affiliate payout", value: "$3,849", context: "30-day window" },
        { label: "EPC", value: "$0.98", context: "earnings per click" },
        { label: "Email subscribers", value: "63" },
        {
          label: "Affiliate partners",
          value: `${g.affiliatePartnerCount.value}`,
          context: "disclosed on every relevant page",
        },
      ],
      asOf: "2026-08-02",
      note: "First conversion April 23, 2026 (Eden Health, $300). Unit economics are healthy at the click level; the constraint is organic visibility on commercial queries.",
    },
    {
      num: "II",
      slug: "hrt-picks",
      name: "HRT Picks",
      domain: "hrtpicks.com",
      url: "https://hrtpicks.com",
      status: "live",
      oneLiner:
        "Hormone telehealth comparison — women's menopause HRT front door, men's TRT wing. Relaunched July 2026 at hrtpicks.com with a Price Transparency Grade on every provider.",
      conversionEvent: "Affiliate sign-up at a partner provider",
      metrics: [
        {
          label: "Providers reviewed",
          value: `${anchorValue("hrtpicks", "providerCount")}`,
          context: "5-dimension methodology",
        },
        {
          label: "Transparency grades",
          value: "A to F",
          context: "published for every provider",
        },
        { label: "Email subscribers", value: "0", context: "newsletter not yet activated" },
        {
          label: "Affiliate partners",
          value: `${anchorValue("hrtpicks", "affiliatePartnerCount")}`,
          context: "live Katalys partners",
        },
      ],
      asOf: "2026-08-02",
      note: "Relaunched on the purchased domain July 6, 2026, two wings live (HRT and TRT). Traffic and revenue are not yet measured here: no GSC or Katalys reading for this property has been published to this page.",
    },
    {
      num: "III",
      slug: "glp1-pets",
      name: "GLP-1 Pets",
      domain: "glp1pets.com",
      url: "https://glp1pets.com",
      status: "live",
      oneLiner: `Veterinary GLP-1 tracker. Pre-launch positioning ahead of the Okava MEOW-1 cat readout (${petReadouts["okv-119"]}) and Akston AKS-562c at Cornell (${petReadouts["aks-562c"]}).`,
      conversionEvent: "Email sign-up for pipeline readout notifications",
      metrics: [
        {
          label: "Pipeline programmes tracked",
          value: `${anchorValue("glp1pets", "programmeCount")}`,
        },
        { label: "Email subscribers", value: "Pre-launch" },
        { label: "Status", value: "Authority site (no affiliate yet)" },
      ],
      asOf: "2026-05-14",
      note: "There is no veterinary GLP-1 to compare yet — the entire site is positioning content for when the first approval lands.",
    },
    {
      num: "IV",
      slug: "best-peptide-for-that",
      name: "Best Peptide For That",
      domain: "bestpeptideforthat.com",
      url: "https://bestpeptideforthat.com",
      status: "live",
      oneLiner: `Evidence-graded peptide directory, A to F by the strength of published human proof, plus the FDA compounding-docket tracker.`,
      conversionEvent: "Affiliate sign-up at a partner provider (pre-monetization)",
      metrics: [
        {
          label: "Peptides graded",
          value: `${anchorValue("bestpeptideforthat", "peptideCount")}`,
        },
        {
          label: "On the FDA compounding docket",
          value: `${anchorValue("bestpeptideforthat", "pcacDocketCount")}`,
          context: "peptides carrying a PCAC vote record",
        },
      ],
      asOf: "2026-08-02",
      note: "Pre-monetization: no affiliate partner is live on this property, and the anchor carries no partner count for it, so this page states none. Live and absent from this page until 2026-08-02, which is the gap this ledger exists to not have. Traffic is not reported here yet: no Search Console reading for this property has been published to this page.",
    },
    {
      num: "V",
      slug: "titrate",
      name: "Titrate",
      domain: "titrate.health",
      url: "https://titrate.health",
      status: "live",
      oneLiner:
        "Peptide and GLP-1 multi-compound tracker for iOS. Shipped May 9, 2026.",
      conversionEvent: "App Store install, subscription via StoreKit",
      metrics: [
        { label: "App Store status", value: "Live", context: "since 2026-05-09" },
        { label: "Version", value: "1.0" },
        { label: "Bundle", value: "com.thecompound.Titrate" },
        {
          label: "Pricing",
          value: `$${anchorValue("titrate", "priceYearlyUsd")}/yr or $${anchorValue(
            "titrate",
            "priceMonthlyUsd",
          )}/mo`,
          context: `${anchorValue("titrate", "trialDays")}-day trial`,
        },
        {
          label: "Compounds preloaded",
          value: `${anchorValue("titrate", "compoundCount")}`,
        },
        { label: "Installs", value: "Not yet public" },
      ],
      asOf: "2026-05-14",
      note: "App Store Connect numbers will surface here once they cross a meaningful baseline. The marketing site at titrate.health is the funnel top.",
    },
    {
      num: "VI",
      slug: "revolume",
      name: "Revolume",
      domain: "revolume.app",
      url: "https://revolume.app",
      status: "in-development",
      oneLiner:
        "Private on-device skin scan for post-GLP-1 facial change. Web scan + iOS app.",
      conversionEvent: "Waitlist sign-up; later, affiliate referral to procedures",
      metrics: [
        { label: "Status", value: "Pre-launch" },
        { label: "Waitlist signups", value: "Tracked" },
      ],
      asOf: "2026-05-14",
      note: "Marketing site live; product in build. Targeting late 2026 for public scan tool.",
    },
  ],

  methodology: [
    "Affiliate revenue is reported as Katalys-recorded payouts in the 30-day window ending on the refresh date. Conversions and clicks come from the same source.",
    "Organic impressions and clicks come from Google Search Console for the canonical property of each site, on a sc-domain property where applicable.",
    "Email subscriber counts come from Resend audience APIs.",
    "Product facts (provider counts, partner counts, peptide counts, trial readout windows, app pricing) are read from lib/generated/anchors.ts, which is generated from each product's own source-of-truth file. They are not typed into this page.",
    "We no longer publish a portfolio page count. It had no source, and the one number we could derive, a sum of route families, is not the same thing as pages indexed.",
    "We round subscriber counts and aggregate figures to the nearest 5 when individual numbers are small enough to identify a specific reader.",
    "Affiliate partnerships listed in property notes are limited to live, signed agreements — pending applications are described as such.",
  ],
};
