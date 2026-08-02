/**
 * The editorial layer for /numbers: who each property is, what it is for, and
 * what counts as a conversion on it.
 *
 * IT HOLDS NO NUMBERS, AND THAT IS THE POINT. This file was
 * `lib/portfolio-metrics.ts` and it carried metric values, a portfolio
 * aggregate and a refresh date, all hand-held or rewritten in place by a
 * script. It was one of several surfaces stating portfolio scale, each with
 * its own vintage, and reconciling them was a standing tax.
 *
 * Every number on /numbers now comes from `lib/generated/ledger.ts`, which is
 * generated daily by barque/scripts/generate-ledger.py where the private repos
 * are visible. Every product FACT comes from `lib/generated/anchors.ts`. What
 * is left here is prose, which is the only thing a human should be typing.
 *
 * If you find yourself wanting to add a number to this file, that is the
 * signal to add it to the ledger generator instead.
 */

export type PortfolioStatus = "live" | "in-development" | "planned";

export type PortfolioProperty = {
  num: string;
  /** Matches the key used by the ledger sections, so the page can join them. */
  slug: string;
  ledgerKey: string;
  name: string;
  domain: string;
  url: string;
  status: PortfolioStatus;
  oneLiner: string;
  conversionEvent: string;
  note?: string;
};

export const portfolioProperties: PortfolioProperty[] = [
  {
    num: "I",
    slug: "glp1-picks",
    ledgerKey: "glp1picks",
    name: "GLP-1 Picks",
    domain: "glp1picks.com",
    url: "https://glp1picks.com",
    status: "live",
    oneLiner:
      "Independent comparison of GLP-1 telehealth programs, ranked on what a year actually costs. Live since early 2026 and the only property in the portfolio earning money.",
    conversionEvent: "Affiliate sign-up at a partner provider",
    note: "First conversion 23 April 2026, at Eden Health, for $300. The click economics work. What does not yet work is organic visibility on the queries where people are ready to buy, which is why the click count is the number to watch here rather than the payout.",
  },
  {
    num: "II",
    slug: "hrt-picks",
    ledgerKey: "hrtpicks",
    name: "HRT Picks",
    domain: "hrtpicks.com",
    url: "https://hrtpicks.com",
    status: "live",
    oneLiner:
      "Hormone telehealth comparison with two front doors, menopause HRT for women and TRT for men, and a price transparency grade on every provider.",
    conversionEvent: "Affiliate sign-up at a partner provider",
    note: "Relaunched on the purchased domain on 6 July 2026. Affiliate partners are live and the per-site revenue split shipped on 1 August, but nothing yet writes a revenue reading for this property into a file the ledger can read. The revenue row therefore says not connected rather than zero.",
  },
  {
    num: "III",
    slug: "glp1-pets",
    ledgerKey: "glp1pets",
    name: "GLP-1 Pets",
    domain: "glp1pets.com",
    url: "https://glp1pets.com",
    status: "live",
    oneLiner:
      "Veterinary GLP-1 tracker, positioned ahead of the first approval in the category rather than after it.",
    conversionEvent: "Email sign-up for pipeline readout notifications",
    note: "There is no veterinary GLP-1 anyone can buy yet. The entire site is a bet that being the reference before the readout is worth more than arriving after it.",
  },
  {
    num: "IV",
    slug: "best-peptide-for-that",
    ledgerKey: "bestpeptideforthat",
    name: "Best Peptide For That",
    domain: "bestpeptideforthat.com",
    url: "https://bestpeptideforthat.com",
    status: "live",
    oneLiner:
      "Peptide directory graded A to F by the strength of published human evidence, not by popularity, plus the FDA compounding-docket record.",
    conversionEvent: "Not yet monetised",
    note: "No affiliate partner is live here and no tracking links exist in the data, so revenue for this property is unsized rather than zero. It was live and absent from this page entirely until 2 August 2026, which is the sort of gap the ledger exists to stop.",
  },
  {
    num: "V",
    slug: "titrate",
    ledgerKey: "titrate",
    name: "Titrate",
    domain: "titrate.health",
    url: "https://titrate.health",
    status: "live",
    oneLiner:
      "Peptide and GLP-1 multi-compound tracker for iOS, built around the decisions a patient actually repeats: dose, reconstitution, stack, refill.",
    conversionEvent: "App Store install and subscription",
    note: "Install and subscription figures come from App Store Connect, and no export of it is committed anywhere the ledger can read. Until that changes this property reports search performance only.",
  },
  {
    num: "VI",
    slug: "revolume",
    ledgerKey: "revolume",
    name: "Revolume",
    domain: "revolume.app",
    url: "https://revolume.app",
    status: "in-development",
    oneLiner:
      "Private on-device skin scan for the facial change that follows rapid weight loss. Web scan first, iOS after.",
    conversionEvent: "Waitlist sign-up",
    note: "Marketing site live, product in build. It has no source-of-truth file yet, which is why nothing on this site states a number about it.",
  },
];

/**
 * How the ledger is put together, in the operator's own terms. Prose, so it
 * lives here rather than in the generated file.
 */
export const ledgerMethodology: string[] = [
  "Affiliate revenue, conversions, clicks and per-partner earnings come from the Katalys network reading committed daily into the GLP-1 Picks repository. The window is the 30 days ending on the date stamped on the section.",
  "Search performance comes from Google Search Console, read straight from the API by a service account and committed as a dated snapshot per property. Click and impression totals are summed over the pages that report returns, and each row says how many pages that was out of how many exist, because the report stores the top pages rather than all of them.",
  "Forecast accuracy is scored with the Brier score, where zero is perfect, 0.25 is what a coin flip earns, and 1.0 is confidently wrong. Every resolved forecast appears, including the one that cost the most to get wrong.",
  "Work-order throughput counts the queue Barque writes into and the status rows that close it. An order with no status row is counted as still open, never as done.",
  "The incident record is written by hand and every row names the commit that fixed it, so the duration is checkable rather than asserted. Where the start date cannot be evidenced, the row says the number is a floor and not a measurement.",
  "AI citation share is read per engine and never blended, because the engines cite different domains. It is a floor rather than a total: a large share of sessions that begin in an assistant arrive with no referrer and land in direct traffic.",
  "Product facts, meaning provider counts, prices, grades and readout windows, are generated from each product's own source-of-truth file and checked by an audit before this site can build. They are not typed into a page.",
  "Nothing on this page is rounded to flatter it. Where a number would identify one individual reader, it is not published at all rather than fuzzed.",
];
