# The Compound mother site (thecompoundgroup.com)

Anchor: lib/generated/anchors.ts

<!-- GATE W1 (thecompound/CLAUDE.md, Model Split canon 2026-08-01): a writing
     brief may only be issued for this product while the line above names an
     existing file AND `python3 scripts/audit-provider-anchors.py` exits 0.
     Every number this site states about a Compound product traces to that
     file, and the file is generated, never typed. -->

## What this is

The portfolio showcase for The Compound, plus the public Barque log. Next.js
App Router, Tailwind, GSAP, deployed on Vercel. **The default branch is
`master`, not `main`.** Repo `iacobp/thecompoundgroup`.

It sells nothing and ranks for nothing commercial. Its job is to be the honest
public face of the portfolio: what exists, how it is built, what the numbers
actually are. That makes accuracy the entire product. A page that describes a
methodology and then misstates the count it is describing has destroyed the
only thing it was for.

## THIS REPO IS PUBLIC

The only public repo in the portfolio. Everything committed here is readable by
anyone, immediately, forever, including in the git history after a revert.

Never commit: API keys, tokens, service-account JSON, Katalys or affiliate
credentials, GSC or GA4 secrets, revenue figures that are not already published
on `/numbers`, internal work orders, private strategy memos, or any file copied
out of a private product repo.

Never name a legal entity. No company name, no registration number, no
jurisdiction, in copy, in JSON-LD, in `public/llms.txt`, in the OpenGraph image
or in this file. The brand is its own publisher. This was published in
`llms.txt` and burned into the OG image until 2026-08; do not reintroduce it.

## The anchor rule (hard, no exceptions)

**No component, no metadata string, no JSON-LD block and no line of
`public/llms.txt` may state a number about a Compound product except by reading
a value out of `lib/generated/anchors.ts`.**

That covers provider counts, peptide counts, page counts, affiliate-partner
counts, trial readout windows, provider prices and app pricing. It does not
cover market statistics from third parties (APOP obesity rates, GLP-1 category
revenue), studio operating figures, or layout constants.

### Why the file is generated

Every number on this site is a fact about a DIFFERENT product, and those
products live in private repos while this one is public. This repo cannot
import from them. So `barque/scripts/generate-portfolio-anchors.py` runs where
the private repos are visible, reads each product's own declared anchor, and
writes `lib/generated/anchors.ts` here. The workflow is
`barque/.github/workflows/portfolio-anchors.yml`.

The generator fails loudly rather than writing a partial file. If a product
repo cannot be cloned or an anchor cannot be parsed, the run exits 2 and
touches nothing, because a half-written anchor would let the gate certify the
missing half as correct.

### Reading a value

```tsx
import { anchors, anchorValue } from "@/lib/generated/anchors";

// scalar
const providers = anchorValue("glp1picks", "providerCount");

// map
const prices = anchors.products.glp1picks.facts.providerPrices.value;
```

`anchorValue` throws when the key is absent. That is deliberate: a build that
asks for a number the anchor does not carry must fail at build time rather
than render a stale literal.

### `unanchored` is not a gap to paper over

The generated file also carries an `unanchored` block per product: facts this
site has historically stated that **no anchor can supply**. Today that is
glp1picks page counts (a property of the rendered sitemap, which needs a build)
and Revolume's facial-marker count (Revolume has no anchor at all, and its own
copy says both fifteen and sixteen). Each entry carries a reason, never a
number.

Stating one of those on a page fails the audit. The fix is to remove the claim
or to give the product an anchor. It is not to type the number back in.

## The gate

```
python3 scripts/audit-provider-anchors.py            # report, exit 0 or 1
python3 scripts/audit-provider-anchors.py --strict   # ignore the baseline
python3 scripts/audit-provider-anchors.py --json     # machine-readable
python3 scripts/audit-provider-anchors.py --ratchet  # tighten the baseline
```

Run it before any push that touches copy, data or metadata. It scans `app/`,
`components/`, `lib/` and `public/` and fails when a file states a product
number that disagrees with the anchor, names a subject the anchor carries no
value for, or states a product number with no product attributable to it whose
value matches nothing anchored.

Exit 2 means the anchor itself could not be read. That is never a pass and
never an empty result: regenerate the file.

**Coverage is defined by the `SUBJECTS` table in the script.** Numbers outside
that vocabulary are not checked, and every run prints how many claims were in
scope so the boundary is visible instead of implied. Widen coverage by adding a
subject, never by loosening a matcher.

### Declared debt

`scripts/anchor-drift-baseline.json` freezes drift that predates the anchor,
the same mechanism bestpeptideforthat and glp1pets use. **It may shrink and
never grow.** Every entry is a wrong number currently live on the public site.
Baselined findings print in every run under DECLARED DEBT, and the run says
PASS WITH DEBT rather than PASS, because a gate that prints an unqualified pass
over live contradictions is the phantom-green failure this whole layer exists
to end.

Baseline as of 2026-08-02: 38 findings. hrtpicks published as 15 providers in
five places against an anchor of 16; the MEOW-1 readout published as summer
2026 in four places against an anchor of Summer 2027; Revolume marker counts in
eight places with no anchor behind any of them; twelve of the sixteen prices in
`PricingAudit` no longer matching `glp1picks/src/data/providers.ts`; `Metrics`
publishing 40 providers, 20 affiliate partners and 960+ pages; Titrate priced
at $19.99/yr and $2.99/mo on `/numbers` against an anchor of $49.99 and $9.99.

After removing a hardcoded number, run `--ratchet` in the same commit. It
rewrites the baseline down to what is currently found and refuses to add or
raise anything.

### Override

`// anchor-override: <reason>` within two lines above a claim suppresses it.
Use it only when a number genuinely is not the anchored fact, and always give
the reason. An override with no reason is a lie with a comment on it.

## Regenerating the anchor

Locally, with the sibling product checkouts present:

```bash
python3 ../barque/scripts/generate-portfolio-anchors.py
python3 scripts/audit-provider-anchors.py
```

On a runner: `gh workflow run portfolio-anchors.yml -R iacobp/barque`, then
read the run log. `gh` is not guaranteed to exist in a CCR container (measured
missing 2026-07-29). Without it, say so and mark the anchor state UNVERIFIED
rather than assuming it is current.

## Other generated data

`lib/portfolio-metrics.ts` powers `/numbers` and is refreshed by
`barque/scripts/refresh-portfolio-metrics.py` inside `morning-sources.yml`. It
carries live measurements: Katalys 30-day payouts, GSC 30-day organic, Resend
audience sizes. Those are dated readings, not anchored facts, and the refresh
only touches fields with a live source; hand-curated copy survives.

Product facts inside that file (provider counts, readout windows, app pricing)
are NOT live measurements and are covered by the anchor rule like everything
else. Several of them are in the debt baseline right now.

## The portfolio sync rule

When a Compound product is created, renamed or materially changed, this site
updates in the same session. Grep the product name across all of:

1. `components/Portfolio.tsx` (main items list plus the upcoming list)
2. `components/Footer.tsx` (footer product links)
3. `components/PortfolioGraph.tsx` (animated network graph, nodes plus links)
4. `components/Atlas.tsx` (the district map)
5. `app/layout.tsx` (SEO description plus JSON-LD subOrganization)
6. `components/thumbnails/<ProductName>Thumb.tsx`
7. `public/llms.txt`
8. `lib/portfolio-metrics.ts`

Thumbnails are editorial replicas of the real product hero, built in Tailwind.
Browser-chrome mockup for web products, phone frame for mobile. Never stock
visuals.

## Build gates

```
npx tsc --noEmit
npm run build
python3 scripts/audit-provider-anchors.py
```

All three before any push. Push to `master`, not `main`.

## House style

No em dashes anywhere, in code comments, copy, data files or commit messages.
Run the humanizing pass on any reader-facing copy before it ships. Under the
Model Split canon, Opus plans and verifies and gates, and reader-facing prose
is written by the second model against a brief whose every fact carries a
`file:line` from the anchor above.
