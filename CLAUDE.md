# The Compound mother site (thecompoundgroup.com)

Anchor: lib/generated/anchors.ts
Ledger: lib/generated/ledger.ts

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

### Where the numbers actually come from now

Reference for the next session, so nobody re-derives it:

| Surface | Reads |
|---|---|
| `components/PricingAudit.tsx` | `providerPrices` against `providerPriceCeiling`, every program with a tier table. The ones without are named, never plotted on the parity line |
| `components/Portfolio.tsx`, `PortfolioGraph.tsx`, `Atlas.tsx` | provider, peptide and readout-window facts interpolated into the copy |
| `components/thumbnails/GLP1PicksThumb.tsx` | top five by anchored `rank`, with anchored name, price and score |
| `components/thumbnails/HRTPicksThumb.tsx` | top three by anchored `score`, with anchored name and transparency grade |
| `components/thumbnails/BestPeptideForThatThumb.tsx` | editorial choice of which peptides appear, anchored grade for each. `anchorFact` throws at build if one leaves the index |
| `components/LedgerCallout.tsx` | nothing. It replaced the homepage metrics board on 2026-08-02 and states no number at all, only the ledger's generated date |
| `public/llms.txt` | static literals that the audit forces to equal the anchor. It cannot import, so the gate is what keeps it honest |

`components/CountUp.tsx` initialises to the target rather than to zero, so the
server-rendered HTML carries the real figure. Before 2026-08-02 every animated
tile served a zero to anything that did not run JavaScript. It is now used only
by the ledger headline on `/numbers`.

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

**Baseline as of 2026-08-02: EMPTY.** It opened that morning at 38 findings and
was purged the same day. The run now prints PASS rather than PASS WITH DEBT,
and that is the state to hold: any future entry is a regression, and the only
legitimate reason to add one is a number this site cannot yet source, declared
out loud with the reason.

What the 38 were, so the classes are recognisable if they come back: an HRT
provider count five places behind the anchor; a trial readout published a year
early in four places; Revolume marker counts in eight places with no anchor
behind any of them; twelve of sixteen prices in `PricingAudit` no longer
matching their source, on a second axis that had never had a source at all;
`Metrics` publishing portfolio figures "as of April" that were well under the
anchored ones; Titrate priced on `/numbers` at roughly a third of its real
subscription.

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

## The ledger, and the one-surface rule

**`/numbers` is the only page on this site permitted to state an operating
number, and every number it states is read out of `lib/generated/ledger.ts`.**

That file is GENERATED, by `barque/scripts/generate-ledger.py`, on the same
principle as the anchor: every figure is a fact about a private repo, this repo
is public and cannot import from them, so a script runs where they are visible
and writes one committed bridge file. Workflow
`barque/.github/workflows/portfolio-ledger.yml`, daily at 11:52 UTC, after the
Search Console snapshot at 06:11 and the glp1picks data snapshot at about 11:05.

Eight sections: revenue and conversions, search performance per property,
forecast accuracy, work-order throughput, what broke, content published and
whether it ranked after 30 days, AI citation share, and spend. It grows by
gaining a section. It does not spawn a route, because a number that lives in two
places eventually disagrees with itself, and this site was in exactly that state
until 2026-08-02 with portfolio scale stated across four surfaces on four dates.

### Anchor or ledger, which one

| | Anchor | Ledger |
|---|---|---|
| Carries | what a product IS: counts, prices, grades, readout windows | how the portfolio PERFORMED: dated readings |
| Moves | when product data changes | every day |
| Missing source | the generator refuses to write anything | the section is written as an absence and the page says so |
| Read by | every component on the site | `/numbers` only |

### The six states, which are the whole point

`OK`, `EMPTY`, `NOT_FETCHED`, `NOT_CONNECTED`, `NOT_TRACKED`, `WITHHELD`. They
exist so that "we did not look" can never render the same as "we looked and it
was zero". Every reading carries one plus the file it came from and the date it
was taken. `components/ledger/Primitives.tsx` renders an absent state as words,
never as a figure, and there is no code path from a missing source to a zero.

When you add a section, add its absent branches with the same key set as its
success branch. The generated file declares a type, so a section that drops keys
when its source disappears would break the mother-site build on the day a source
disappears, which is the worst possible moment.

### Partner-level EPC is published on purpose

Per-partner clicks, conversions, payout and earnings per click are on the page.
The operator decided this on 2026-08-01, having been told first that partner EPC
is the single field a competitor could act on directly and that the closest
competitor is run by a business partner.

It is on a flag so reversing it is one edit rather than an excavation:
`LEDGER_PUBLISH_PARTNER_EPC` in the generator, set in the workflow, default `1`.
Set it to `0` and the very next run strips the rows from the public file. The
section then renders `WITHHELD` with the reason, deliberately, because a section
that disappears reads as a section that had nothing in it.

### Where the ledger reads from

| Section | Source |
|---|---|
| Revenue, partners | `glp1picks/docs/seo-snapshot.json` → `revenue_leverage`. Other properties have no committed reading and say so |
| Search | `barque/data/gsc/<site>.json`, five properties. The mother site has no Search Console property and renders `NOT_CONNECTED` until `thecompound.json` appears, at which point it fills in with no code change |
| Forecasts | `barque/forecasts.tsv` + `barque/resolutions.tsv`, wrong calls included with their write-ups |
| Throughput | `barque/work-orders.tsv` + `barque/work-order-status.tsv`. Products this site does not name publicly are counted under "not yet announced" |
| What broke | `barque/incidents.tsv`, hand-maintained, every row naming the fixing commit |
| Content | `glp1picks/src/data/posts.ts` joined to the 28-day pages report |
| AI citations | `glp1picks/docs/seo-snapshot.json` → GA4, folded per engine, never blended, with the known measurement defect published alongside |
| Spend | `barque/spend.tsv`. One line measured, four declared untracked |

`lib/portfolio-properties.ts` is the only hand-written half of `/numbers`, and it
holds NO numbers: property names, one-liners, conversion events, notes and the
methodology prose. If you want to add a number to it, that is the signal to add
it to the generator instead.

### The audit and the ledger

`lib/generated/ledger.ts` sits in `ARCHIVE_PREFIXES` in the audit script, so
findings inside it are WARN rather than ERROR. It quotes forecast resolution
notes and incident write-ups verbatim, and those are dated documents: one of
them says "all four peptides reviewed on 2026-07-23", a fact about an FDA
meeting that reads to the matcher as a claim about our index size. Editing a
record to satisfy a check is falsification. The cost is that a real
contradiction inside the ledger warns rather than fails, which is tolerable only
because the ledger's own figures are revenue, sessions, clicks and durations,
none of which are anchor subjects. If a ledger section ever states a provider or
peptide count as a figure, give it its own generated file rather than widening
that list.

## The operating-system canvas

`components/OperatingSystem.tsx` is the homepage explanation of how the
portfolio runs: Signal → Decision → Publish → Learn. It is deliberately
server-rendered, static markup with no API calls, counters, or live dashboard
logic. Its job is to make the operating model legible to a prospective
acquirer without creating a second numbers surface.

The division is strict:

- `OperatingSystem` explains the repeatable loop and the human control points.
- `/numbers` is the only public surface for operating figures and links to the
  evidence trail.
- Any new loop must be described here first, then get a generated measurement
  in the ledger only when a private source exists. Never invent a live metric
  for the canvas.

This section shipped on 2026-08-02 in the `Add public operating system canvas`
commit. Keep it lightweight. The public promise is an inspectable operating
model, not a black-box automation claim.

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
8. `lib/portfolio-properties.ts` (prose only, never a number)

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
