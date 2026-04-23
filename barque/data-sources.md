# Barque — Data Sources

The stack, ordered by cost and ROI. Start free. Only add paid sources if a free gap is blocking forecast quality.

---

## Tier 0 — Already owned, use first

| Source | Access | Use for | Notes |
|---|---|---|---|
| **Firehose.com** | `FIREHOSE_MANAGEMENT_KEY` + `FIREHOSE_TAP_TOKEN` in env | Real-time Lucene-filtered crawl of newly-published pages | Already configured. Set up per-domain taps: GLP-1 brand terms, HRT actors, peptide names. Stream via SSE. |
| **Ahrefs** (via MCP) | `mcp__b7fd552b-...` tools | Keyword velocity, Top Pages deltas, competitor content gap | Use derivatives (week-over-week change), not snapshots. |
| **Google Search Console** (via Ahrefs MCP) | Same | Real query data for owned sites (GLP-1 Picks, Crown Years) — ground truth for demand | Owned sites = owned signal. |
| **NotebookLM** (if applicable) | `blog-notebooklm` skill | Synthesize across large source document sets | Good for regulatory PDF digestion. |

---

## Tier 1 — Free, authoritative, must-haves

### Regulatory & scientific
- **ClinicalTrials.gov API** — `https://clinicaltrials.gov/api/v2/studies` — trial registrations, 2–5yr leading indicator. Free, well-documented.
- **FDA openFDA API** — `https://open.fda.gov/` — approvals, warning letters, recalls, shortage list. Essential for glp1-metabolic and peptides-longevity.
- **FDA Drug Shortage List** — `https://www.accessdata.fda.gov/scripts/drugshortages/` — <30-day leading indicator for DTC shifts. Scrape weekly.
- **PubMed E-utilities API** — `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/` — publication velocity on specific compounds/conditions. Weekly delta.
- **NIH RePORTER** — `https://api.reporter.nih.gov/` — federal grant flows as research momentum proxy.
- **USPTO PatentsView API** — `https://api.patentsview.org/` — patent filings by assignee. 1–5yr leading indicator for pipeline.
- **SEC EDGAR** — `https://www.sec.gov/cgi-bin/browse-edgar` — 10-K/10-Q/8-K filings. Free. Novo, Lilly, Pfizer, Bayer all file; mine for guidance shifts.

### Search & demand
- **Google Trends** — pytrends library (unofficial) or manual pulls. Weekly granularity, 5-year history. Free.
- **Reddit API** (PRAW) — subreddit activity curves, vocabulary shifts ("new words appearing"), sentiment. Free tier sufficient.
- **Wayback Machine** — `https://web.archive.org/web/timemap/` — retroactive signal detection for backtest cases. Free.

### Capital & culture
- **Crunchbase News RSS** — free news feed (not full DB). Funding round headlines.
- **Hacker News Algolia API** — `https://hn.algolia.com/api` — front page history, story+comment data. Free.
- **ProductHunt API** — launch velocity, community response. Free tier.
- **GitHub Trending** (scrape) — dev/tool adoption proxy. Free.
- **TikTok Creative Center** — `https://ads.tiktok.com/business/creativecenter/` — public trending sounds/hashtags by region. Free, underused.
- **Podcast RSS + Whisper** — grab RSS of top 10 podcasts per domain, transcribe with local Whisper, search transcripts. Free + compute cost.

### App/consumer signal
- **App Store / Play Store rank history** — RapidAPI ~$10/mo cheap endpoints. Cross-checks DTC uptake.

---

## Tier 2 — Paid, high ROI if committed

| Source | Approx cost | Unlocks | Worth it when |
|---|---|---|---|
| **AlphaSense** or **Sentieo** | $3–5k/yr | Every public-company earnings call transcript, searchable with semantic queries | Once 50+ forecasts are calibrated and you want to tighten incumbent tracking |
| **Crunchbase Pro** | $2–3k/yr | Full funding DB, velocity by stage + category | Once you're consistently citing capital flow as a signal |
| **IQVIA public reports** | varies | Rx volume by drug/region — the real demand ground truth | If Brier scores on demand predictions are consistently off |

---

## Tier 3 — Skip for now

- **Bloomberg Terminal** — $24k/yr. Overkill. Skip.
- **Brandwatch / Talkwalker / Meltwater** — $30k+/yr. Free Reddit + Firehose covers the social listening use case at your stage.
- **Nielsen / Ipsos** — enterprise research, not signal.
- **Sentiment platforms sold as "AI"** — most are LLM wrappers on the same free Reddit/Twitter data. Build your own.

---

## Ingestion Architecture (v0, pragmatic)

- **Storage**: local SQLite at `~/Documents/barque/signals.db`. Three tables: `signals`, `clusters`, `predictions` (mirror forecasts.tsv for query convenience).
- **Scheduler**: cron via `mcp__scheduled-tasks__` or simple macOS launchd plist. Run pulls daily (Firehose continuous via SSE).
- **Pipeline language**: Python. Each source = one module in `ingest/` returning a standard `Signal` dataclass.
- **LLM orchestration**: Claude via API for encode → cluster → simulate → predict steps. Keep prompts in `prompts/` so the protocol can evolve as prompts evolve.
- **Output**: append to `forecasts.tsv` as text-first truth; SQLite is just a query cache.

**Explicit non-goals for v0:**
- No web dashboard. Markdown + TSV is the interface.
- No multi-user. Solo tool.
- No realtime streaming UI. Daily batch is fine.
- No fancy ML. Claude + SQL + TSV. Upgrade later only if calibration demands it.

---

## Per-Domain Source Allocation

### glp1-metabolic (priority — start here)
- ClinicalTrials.gov: filter conditions="Obesity" OR "Type 2 Diabetes" AND status="Recruiting|Active"
- FDA Drug Shortage List: weekly pull, diff against last week
- Firehose tap: `("semaglutide" OR "tirzepatide" OR "Wegovy" OR "Ozempic" OR "Mounjaro" OR "Zepbound" OR "retatrutide") AND site:*.com`
- Reddit PRAW: r/Semaglutide, r/Mounjaro, r/Zepbound, r/tirzepatidecompound, r/GLP1 — daily post count + top 20 posts
- SEC EDGAR: track NVO, LLY, PFE 8-Ks
- Google Trends: tracked terms weekly

### menopause-queenager
- FDA: fezolinetant (Veozah) label, HRT label revisions
- Reddit PRAW: r/Menopause, r/Perimenopause, r/HRT
- PubMed: query "menopause" OR "HRT" OR "hormone replacement" — weekly new publications
- Firehose tap: `("HRT" OR "menopause" OR "perimenopause" OR "estrogen") AND site:*.com`
- DTC brand watch: domain traffic deltas via Ahrefs for Alloy, Midi, Evernow, Winona

### peptides-longevity
- FDA 503A bulk substances list: monthly diff (critical)
- Firehose tap: `("BPC-157" OR "TB-500" OR "rapamycin" OR "NAD+" OR "peptide therapy")`
- Reddit PRAW: r/Peptides, r/LongevityPlus, r/Biohackers
- Bryan Johnson signal: scrape blueprint.bryanjohnson.com protocol page weekly (one-man moving indicator)

---

## Source Quality Rules

- **Prefer primary over secondary.** SEC filing > news article about the filing.
- **Prefer velocity over level.** "Reddit activity up 40% week-over-week" > "Reddit subreddit has 120k members."
- **Triangulate.** A signal from one source is rumor. Three independent sources is a pattern. Five is a trend.
- **Date-stamp everything.** Signal without a date is unscorable.
- **Kill dead sources.** Every quarter, audit which sources actually contributed to high-signal-strength forecasts. Drop the ones that didn't.
