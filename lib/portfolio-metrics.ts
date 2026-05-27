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
  refreshedOn: "2026-05-27",
  cadence:
    "Refreshed weekly. Numbers are point-in-time and may lag the underlying systems by a day or two depending on data-source freshness.",

  aggregate: [
    { label: "Properties live", value: "4" },
    { label: "In development", value: "1" },
    { label: "Pages indexed", value: "1,800+", context: "across the portfolio" },
    { label: "Email subscribers", value: "~30", context: "all audiences combined" },
    {
      label: "Affiliate revenue (30d)",
      value: "$1,946",
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
      oneLiner:
        "Independent comparison of 48 GLP-1 telehealth programs. Live since early 2026, monetized via the Katalys affiliate network.",
      pages: 960,
      conversionEvent: "Affiliate sign-up at a partner provider",
      metrics: [
        { label: "Providers reviewed", value: "48" },
        { label: "Pages indexed", value: "960+" },
        { label: "Organic impressions", value: "10,740", context: "30-day window" },
        { label: "Organic clicks", value: "59", context: "30-day window" },
        { label: "Affiliate clicks", value: "525", context: "30-day window via Katalys" },
        { label: "Conversions", value: "8", context: "30-day window" },
        { label: "Affiliate payout", value: "$1,946", context: "30-day window" },
        { label: "EPC", value: "$3.71", context: "earnings per click" },
        { label: "Email subscribers", value: "31" },
      ],
      asOf: "2026-05-27",
      note: "First conversion April 23, 2026 (Eden Health, $300). Unit economics are healthy at the click level; the constraint is organic visibility on commercial queries.",
    },
    {
      num: "II",
      slug: "hrt-picks",
      name: "HRT Picks",
      domain: "hrtpicks.com",
      url: "https://hrtpicks.vercel.app",
      status: "live",
      oneLiner:
        "Menopause HRT telehealth comparison. Shipped May 2026 on the back of the FDA black-box removal cascade. Affiliate activation pending.",
      conversionEvent: "Affiliate sign-up at a partner provider (pending network approval)",
      metrics: [
        { label: "Providers reviewed", value: "5", context: "Midi, Alloy, Winona, Evernow, Gennev" },
        { label: "Status", value: "Preview", context: "domain not yet pointed" },
        { label: "Email subscribers", value: "0", context: "newsletter not yet activated" },
        { label: "Affiliate partners", value: "0", context: "applications submitted" },
      ],
      asOf: "2026-05-14",
      note: "On the Vercel preview URL while we line up affiliate relationships. Domain activation gated on the first signed partner.",
    },
    {
      num: "III",
      slug: "glp1-pets",
      name: "GLP-1 Pets",
      domain: "glp1pets.com",
      url: "https://glp1pets.com",
      status: "live",
      oneLiner:
        "Veterinary GLP-1 tracker. Pre-launch positioning ahead of Okava MEOW-1 cat readout (summer 2026) and Akston AKS-562c at Cornell.",
      conversionEvent: "Email sign-up for pipeline readout notifications",
      metrics: [
        { label: "Pipeline drugs tracked", value: "6+" },
        { label: "Email subscribers", value: "Pre-launch" },
        { label: "Status", value: "Authority site (no affiliate yet)" },
      ],
      asOf: "2026-05-14",
      note: "There is no veterinary GLP-1 to compare yet — the entire site is positioning content for when the first approval lands.",
    },
    {
      num: "IV",
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
          value: "$19.99/yr or $2.99/mo",
          context: "7-day trial",
        },
        { label: "Installs", value: "Not yet public" },
      ],
      asOf: "2026-05-14",
      note: "App Store Connect numbers will surface here once they cross a meaningful baseline. The marketing site at titrate.health is the funnel top.",
    },
    {
      num: "V",
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
    "Page-indexed counts are from each site's published sitemap.",
    "We round subscriber counts and aggregate figures to the nearest 5 when individual numbers are small enough to identify a specific reader.",
    "Affiliate partnerships listed in property notes are limited to live, signed agreements — pending applications are described as such.",
  ],
};
