# Barque — Session Instructions

You are working on **Barque**, the cross-signal forecasting protocol. Before doing anything else in this folder, follow this ritual.

## Session Start (non-negotiable)

1. Query mempalace for prior learnings:
   ```
   mcp__mempalace__mempalace_search query:"barque"
   mcp__mempalace__mempalace_list_rooms wing:"thecompound"
   ```
2. Read `program.md` top to bottom. The protocol evolves — don't assume you remember it.
3. Read `forecasts.tsv`. Two things to check:
   - Which predictions have passed their `resolution_date` and still show `pending`? Resolve them now before making new ones.
   - What's the rolling Brier score by domain? If it's drifting above 0.25, the protocol is miscalibrated.
4. Read `domains.md` to confirm which domains are active this session.

## During Session

- Follow the OBSERVE → ENCODE → CLUSTER → SITUATE → SIMULATE → SCORE → PREDICT → LOG → REVIEW loop in `program.md`.
- Save learnings immediately to mempalace wing `barque` as they happen (the wing split on Apr 19 — prior drawers still live in `thecompound/decisions` for historical search). Do not batch.
- Every prediction must be appended to `forecasts.tsv` with all columns filled. No exceptions.
- Token budget: 8–12 web searches per session. Breadth first. Never run autonomous loops.

## Session End

- Resolve any predictions whose horizon has passed.
- Save key learnings to mempalace.
- If the protocol itself needs adjusting (new source, new domain, scoring weight change), update `program.md` and add a dated entry to the Evolution Log at the bottom.

## Relationship to Other Projects

Barque is the intelligence/research layer of The Compound. The public surface is live at `thecompound.com/barque` (code under `../website/app/barque/`). The log is the product; forecasts feed decisions across every other Compound project.

**Protocol vs instance.** Barque is a protocol kernel (Ra, 5-agent sim, 4-axis scoring, ring discipline, calibration log) that is domain-agnostic. The current instance is consumer-health — Ring 1 scope lives in `domains.md`. A second instance for a different niche would fork this repo, redefine Ring 1, and start its own `forecasts.tsv`; the kernel (`program.md`, `ra/program.md`, scoring axes) stays shared across forks.

Never modify sibling Compound folders (`../glp1picks/`, `../glp1tracker/`, `../website/`, `../revolume/`, `../skin-analysis/`, `../titrate-ios/`, etc.) from within a Barque session. If a Barque prediction suggests action in a sibling project, note it in `forecasts.tsv` notes column and escalate to the user.

Crown Years is a separate portfolio (lives at `~/Documents/crownyears/`, not under The Compound) and does not consume this Barque instance. Barque can still track menopause/HRT signals if they touch Ring 1, but no Crown Years routine feeds off Barque. If Crown Years ever needs forecasting, it gets its own forked instance with its own Ring 1 — not a branch of this log.

## Trigger Words

The user invokes Barque with: "Barque", "forecast", "predict", "what's about to happen", "signals", "early warning", "run the protocol". When these appear in the context of The Compound or the tracked domains, default to opening this folder.
