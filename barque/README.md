# Barque

Cross-signal forecasting protocol operated by [The Compound Group](https://thecompound.group).
The public site: [thecompound.group/barque](https://thecompound.group/barque).
The public log: [thecompound.group/barque/log](https://thecompound.group/barque/log).

## What is this repo?

Barque is a research protocol that produces **falsifiable, Brier-scored
forecasts** about events in consumer health and the signals that move
consumer health. This repo is the canonical state of the protocol — its
rules, its data, its log. The log is public from day one because the
track record is the whole point.

## Layout

- [`program.md`](program.md) — the protocol itself. Philosophy, loop,
  scoring, scope (three concentric rings), and evolution history.
- [`domains.md`](domains.md) — the Ring 1 / Ring 2 / Ring 3 scope with
  actors and leading indicators per domain.
- [`data-sources.md`](data-sources.md) — the signal stack Barque reads
  from, organised by cost tier.
- [`historical-cases.md`](historical-cases.md) — the backtest library.
  Real past events with their expected signals at cutoff, used to
  calibrate the protocol before trusting live forecasts.
- [`forecasts.tsv`](forecasts.tsv) — the forecast log. Every prediction
  with a probability, a resolution date, and a Brier score once resolved.
- [`ra/`](ra/) — Ra, the recurring re-evaluation agent. Council prompt,
  protocol spec, and the run log.

## Ra

Ra is Barque's recurring agent. Named for the solar deity who rode the
solar barque through the Duat each night and returned at dawn. Ra re-
evaluates every pending forecast against new evidence each day through
a seven-voice council drawn from philosophy, history, and the forecasting
literature.

- [`ra/program.md`](ra/program.md) — Ra's protocol: triggers, rules,
  output formats.
- [`ra/council-prompt.md`](ra/council-prompt.md) — the full system
  prompt that instantiates the seven voices (Historian, Skeptic,
  Bayesian, Augur, Stoic, Premortem, Curator).
- [`ra/ra_log.tsv`](ra/ra_log.tsv) — every Ra run, logged.

## Commitments

- **Falsifiability over confidence.** Every probability is floored at
  0.05 and ceilinged at 0.95. Never 0, never 100.
- **Calibration over cleverness.** Brier is the arbiter.
- **Public by default.** The log is public because the track record is
  the moat. Misses are published alongside hits.
- **Cultural signals as inputs.** Memes, celebrity adoption, TikTok
  velocity, Reddit vocabulary shifts are first-class inputs to
  scorable forecasts. Memes move markets.

## License

Creative Commons Attribution 4.0 (CC BY 4.0) for documentation.
The data (forecasts, log entries, backtests) is published in the public
interest — cite freely; a link back to
[thecompound.group/barque](https://thecompound.group/barque) is appreciated.
