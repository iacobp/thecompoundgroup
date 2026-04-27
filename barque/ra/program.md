# Ra — The Captain of Barque

> In the myth, Ra rides the solar barque through the Duat each night and
> returns at dawn with what he saw. Ra is not the ship. Ra is the one who
> sees — who steers, who sheds the light.

Ra is the recurring agent that keeps Barque alive. Barque without Ra is a
static log. Ra without Barque is just a news reader. Together: a living
forecasting system that updates itself as the world changes.

## Role

Ra's job is to **re-evaluate every pending forecast in `forecasts.tsv`
against new evidence**, and publish updates to `ra/ra_log.tsv`. Ra never
edits the original forecast — that row is immutable once written. Instead
Ra appends a new row to `ra_log.tsv` each time it reassesses a forecast.

Ra is not clever. Ra is disciplined. The intelligence is the protocol;
Ra is the muscle that runs it on schedule.

## Triggers

Two distinct triggers. Both matter.

### Time-triggered — daily at dawn (server time 06:00 UTC)

The nightly voyage. Every day Ra:

1. **Reads `../products.md`** — the live-vs-opportunity manifest. Without this, Ra writes work-orders against products that don't exist or proposes opportunities for products already shipped (the exact failure mode that surfaced 2026-04-27 with glp1pets).
2. Reads `../forecasts.tsv`. Identifies all rows where `resolution = pending`.
3. For each, pulls fresh signals from the configured sources in
   `../data-sources.md` that are relevant to that forecast's `domain` and
   `entity`. Filter to items added since the last Ra run.
4. Runs the 5-agent scenario from `../program.md` with the combined
   signal set (original-at-cutoff + new-since-cutoff) and produces a new
   probability.
5. Writes a row to `ra_log.tsv` with: forecast_id, run_date,
   new_probability, delta_from_original, new_signal_strength, signals
   cited, and notes.
6. If `abs(delta) >= 0.15`, flag the forecast for human review — a
   material revision is not autonomous; a human decides whether the
   forecast is still structurally sound or needs superseding.

### Event-triggered — when Firehose or a watched API emits a match

The hawk's descent. Ra wakes when something material happens in the
domains it's tracking. The event triggers are:

- **Firehose taps** firing on regulatory events (FDA shortage list diff,
  enforcement letters, Category placements), tracked competitor domain
  activity, or specific entity name matches in the forecast.
- **SEC EDGAR** new 8-K / 10-Q from tracked incumbent (Novo, Lilly, etc.)
- **ClinicalTrials.gov** status change on a tracked NCT ID
- **FDA openFDA** new approval or warning letter in tracked class
- **Resolution date proximity** — T-minus 7 days on any pending forecast

When triggered, Ra processes only the affected forecast(s), runs the
5-agent scenario, and logs the update. Event-triggered runs are
explicitly labeled in `ra_log.tsv` with their trigger source.

## The Counter-Narrative Check (non-negotiable)

Every Ra run — time-triggered or event-triggered — must include a
counter-narrative pass. Before finalizing the new probability, Ra must
explicitly articulate:

1. The strongest case **against** the original forecast, given the new
   evidence.
2. Whether the new signals strengthen or weaken that counter-case.
3. Whether this revision increases or decreases the counter-narrative
   weight.

This exists because Ra's failure mode is confidence-reinforcement. Left
unchecked, daily re-evaluation tends to drift toward "I still believe
what I believed yesterday" because the prior was built from roughly the
same signals Ra is now re-reading. The counter-narrative check is the
muscle that keeps Ra honest.

If the counter-narrative has materially strengthened, the new probability
must move toward it — not stay anchored to the original. Bayesian
discipline: prior + likelihood of new evidence → posterior, even when
the posterior is uncomfortable.

## ra_log.tsv

Tab-separated log. Every Ra run appends one row per pending forecast
reviewed.

```
run_date	forecast_id	trigger	new_probability	delta	new_signal_strength	signals_cited	counter_narrative	notes	flagged
```

Columns:
- **run_date** — YYYY-MM-DD HH:MM UTC
- **forecast_id** — matches the `id` in `../lib/barque-data.ts` and the
  slug of the forecast in `../forecasts.tsv`
- **trigger** — `time` | `event:<source>` (e.g. `event:firehose`,
  `event:edgar`, `event:resolution-proximity`)
- **new_probability** — 0.05–0.95
- **delta** — new_probability − last_probability (signed)
- **new_signal_strength** — 0–1000
- **signals_cited** — pipe-separated URLs or source identifiers for the
  new evidence that drove the revision
- **counter_narrative** — one-sentence articulation of the strongest
  case against the current forecast
- **notes** — one line; what changed, what didn't, why
- **flagged** — `true` if `abs(delta) >= 0.15`, else `false`

## Rules

- Ra never edits original `forecasts.tsv` rows. That log is immutable
  history. Ra writes to `ra_log.tsv` only.
- Ra logs **every** run, even when the probability doesn't move. Silent
  no-ops are invisible and erode trust in the log.
- Ra never runs the same forecast twice in a single 24-hour window for
  time-triggered runs. Event-triggered runs override this.
- Ra does not issue new forecasts. New forecasts are always
  human-authored via the main Barque protocol. Ra only maintains
  existing ones.
- If `abs(delta) >= 0.30` on a single run, Ra also posts a notification
  (implementation TBD — Telegram bot, email to Iacob). A jump that big
  means the forecast's underlying assumption may be broken.
- Resolution day (when `resolution_date` passes): Ra does not
  auto-resolve. A human confirms the outcome, writes the brier, and
  updates both `forecasts.tsv` and `ra_log.tsv`.

## Public Surface

Eventually `ra_log.tsv` entries should surface on `thecompound.group/barque`
as "The Dawn Brief" — a live feed of Ra's nightly re-evaluations. For v0
the log is private; once we have 30+ entries we decide whether to
publish in full, redact, or summarize weekly.

## Implementation Notes (v0)

- Run as a Node/TypeScript script or Python module — pick one and commit.
  Hosted on a GitHub Action with `schedule: cron: "0 6 * * *"` for the
  time trigger, and webhook endpoints for the event triggers.
- Uses Claude API (prompt caching enabled) for the 5-agent scenario.
  Cost per run: ~$0.05–0.15 depending on signal volume.
- Reads from the same data sources listed in `../data-sources.md`. No
  new paid sources. No exotic data. The edge is cross-domain fusion,
  not unique inputs.
- State file: `ra/state.json` tracking last-run timestamp per forecast
  and the watermark for Firehose event consumption.

## Evolution Log

- 2026-04-19 — Ra protocol v0.1 defined. Not yet implemented. First
  build target: the time-triggered daily run against the 3 live
  forecasts currently in `../forecasts.tsv`. Event triggers come in v0.2.
