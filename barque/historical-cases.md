# Barque — Historical Case Library

The protocol's calibration rests entirely on backtesting against known past events. This is the test set.

**Rules.**

1. Every case is a real event that resolved. No hypotheticals.
2. For each case, document what **public signals existed before the event** and how many months in advance a disciplined aggregator could have flagged it.
3. Before the protocol is trusted on new forecasts, it must backtest against ≥ 15 cases and catch ≥ 70% with ≥ 3 months lead time.
4. Add new cases continuously as the world produces them. The library is an asset; stale test sets overfit.

---

## glp1-metabolic

### Case 1 — Wegovy mainstream inflection (2022–2023)

**Event.** Wegovy (semaglutide for obesity) goes from niche prescription to cultural phenomenon. Novo Nordisk becomes Europe's most valuable company by Sept 2023.

**Resolution signal.** Novo market cap surpasses LVMH, September 2023. Widely reported.

**Public leading signals available before.**
- **Jun 2021:** FDA approves Wegovy for chronic weight management. Public. +27 months lead.
- **Oct 2022:** Elon Musk tweet crediting Wegovy + fasting for weight loss. Free, public. +11 months lead.
- **Q2 2022:** Novo earnings call mentions obesity TAM inflection. Public. +12 months.
- **May 2022:** Kardashian Met Gala / "16-pound weight loss for dress" — media. +16 months.
- **Late 2022:** Wegovy added to FDA shortage list — public. +9 months.
- **2022 Google Trends:** "Ozempic weight loss" searches up 400% year-over-year. +12 months.

**Expected Barque output.** By Q3 2022, a Barque cross-domain cluster should have: (a) FDA approval + shortage combo, (b) celebrity-seeded search spike, (c) Novo guidance revision, (d) DTC inflows (Hims/Ro weight loss funding mentions). Prediction: "Semaglutide-class drugs will be the #1 US weight loss intervention by 2024-12-31 (p=0.75)."

**Lead time achievable:** 9–12 months.

---

### Case 2 — Compounded semaglutide boom and bust (2023–2025)

**Event.** FDA shortage list enables compounding pharmacies under 503A/B to produce semaglutide. Market explodes ($B+ revenue across compounders by 2024). Then shortage resolves (Oct 2024), FDA gives compounders wind-down period, most compounded GLP-1 market collapses by late 2025.

**Resolution signal.** FDA removes semaglutide from shortage list Oct 2024; enforcement deadlines published Feb 2025.

**Public leading signals available before each leg.**

*Boom leg (predict Q3 2023):*
- FDA shortage list entries (Aug 2022 onward)
- Compounding pharmacy website additions of semaglutide
- DTC brands (Henry Meds, Eden, Mochi) adding compounded GLP-1 offerings
- Reddit r/Semaglutide mentions of specific compounders

*Bust leg (predict Q1 2024):*
- Lilly and Novo actively filing lawsuits against specific compounders (2023)
- Supply chain easing signals — Novo Kalundborg capacity expansions, earnings call mentions
- FDA position statements on compounding safety
- 503A vs 503B regulatory drift

**Expected Barque output.** Boom leg predictable ~6 months in advance; bust leg predictable ~4 months in advance from capacity signals + lawsuit velocity.

**Lead time achievable:** 4–6 months on each leg.

---

### Case 3 — Tirzepatide (Zepbound) US approval for obesity (Nov 2023)

**Event.** FDA approves Zepbound for chronic weight management, Nov 8 2023.

**Public leading signals available before.**
- SURMOUNT-1 Phase 3 trial results published NEJM Jun 2022 (~17 months lead)
- FDA PDUFA date public (6+ months lead)
- Eli Lilly guidance (multiple earnings calls)
- Trial design and endpoints publicly registered years earlier

**Expected Barque output.** Prediction: "FDA approves tirzepatide for obesity before 2023-12-31 (p=0.85)." Signal strength high, calibration should be strong.

**Lead time achievable:** 6+ months at very high confidence.

---

## menopause-queenager

### Case 4 — Veozah (fezolinetant) FDA approval for VMS (May 2023)

**Event.** Astellas's Veozah becomes first non-hormonal therapy for menopausal vasomotor symptoms, approved May 12 2023.

**Public leading signals available before.**
- SKYLIGHT Phase 3 trial results — ESHRE 2022
- FDA PDUFA date Feb 2023 (public)
- Astellas investor guidance
- Medical society (NAMS) statements preparing for approval

**Expected Barque output.** Prediction: "FDA approves fezolinetant for VMS before 2023-06-30 (p=0.85)." Should resolve true.

**Lead time achievable:** 6–9 months.

---

### Case 5 — Naomi Watts / Halle Berry menopause brand launches (2023–2024)

**Event.** Celebrity-led menopause DTC brands (Stripes / Respin) launch; Oprah menopause special (Mar 2024) drives mass awareness inflection.

**Public leading signals available before.**
- Celebrity public statements about menopause (each had a year+ of media buildup)
- FemTech VC funding announcements citing menopause
- DTC funding rounds (Alloy, Midi, Evernow) preceding the celebrity wave
- Google Trends for "perimenopause" growing 2021–2023

**Expected Barque output.** Prediction: "A top-5 US broadcast outlet airs a prime-time menopause feature before 2024-06-30 (p=0.7)."

**Lead time achievable:** 6–12 months.

---

## peptides-longevity

### Case 6 — FDA 503A Category 2 placement of BPC-157 (2023)

**Event.** FDA places BPC-157 in Category 2 of the 503A bulk drug substances list (2023), indicating significant safety risk, limiting compounding pharmacy availability.

**Public leading signals available before.**
- FDA Pharmacy Compounding Advisory Committee (PCAC) meeting minutes — public, typically 6–12 months before decisions
- FDA inspection reports on specific compounders
- Reddit chatter about BPC-157 availability shifting at specific pharmacies
- Legal trade press on compounding regulation

**Expected Barque output.** Prediction: "FDA restricts or Category-2s BPC-157 for 503A compounding before 2023-12-31 (p=0.65)."

**Lead time achievable:** 4–8 months with access to PCAC minutes.

---

### Case 7 — Bryan Johnson "Don't Die" cultural tipping (2023–2024)

**Event.** Bryan Johnson's Blueprint protocol goes from niche biohacker curiosity to mainstream cultural reference (Netflix doc Jan 2025, covered by Time, WSJ, multiple podcasts).

**Public leading signals available before.**
- Early podcast appearances (Rogan, Huberman) — Q1–Q2 2023
- Blueprint product launch and eCommerce traffic trajectory
- Press coverage velocity (Bloomberg, Wired)
- Follower/subscriber growth across platforms

**Expected Barque output.** Prediction: "Bryan Johnson receives coverage in ≥ 3 top-tier mainstream outlets (NYT/WSJ/Bloomberg/Time/Netflix) before 2024-06-30 (p=0.75)."

**Lead time achievable:** 4–8 months.

---

## Meta-Cases (Failure Modes to Backtest Against)

These are cases where a naive signal-aggregator **would have been wrong**. Good calibration requires catching these failure patterns.

### Failure case F1 — Google Flu Trends (2013)

**Event.** Google Flu Trends, which used search query aggregation to nowcast flu, systematically overestimated flu prevalence starting 2011–2013 and was eventually discontinued.

**Lesson for Barque.** Search queries drift with media coverage, not disease. "More people search X" ≠ "more X is happening." Every Barque prediction relying heavily on search-trend signals must have at least one non-search confirming source (regulatory, financial, Rx volume).

---

### Failure case F2 — "Year of Clubhouse" (2021)

**Event.** Clubhouse — audio social app — hit cultural inflection Q1 2021 with Elon + Mark Zuckerberg appearances. Valuations implied mainstream takeover. By end of 2022, collapsed to near-zero relevance.

**Lesson for Barque.** Celebrity-driven signal without distribution fundamentals is a false positive. Barque must weigh "cultural virality" below "distribution + habit formation." If the 5-agent scenario has "The Consumer" bail after week 2, it's a Clubhouse.

---

### Failure case F3 — NMN consumer supplement ban speculation (2022–2023)

**Event.** In late 2022, FDA signals that NMN is excluded from being marketed as a dietary supplement. Supplement industry predicts imminent enforcement. **Enforcement never materialized meaningfully.** NMN remained sold widely.

**Lesson for Barque.** FDA signals != FDA enforcement. Regulatory warnings often stay warnings for years. Forecasts of "X gets banned" need base-rate pessimism — most don't resolve as dramatically as signals suggest.

---

## How to Use This Library

1. **Baseline backtest before first live forecast.** Run the protocol mentally/via Claude against Cases 1–7. Does it flag each with ≥ 3 months lead time? If not, adjust scoring or sources.
2. **Add a new case every time you resolve a real forecast.** Success or failure, both are training data.
3. **Review failure cases (F1–F3) before every session.** They prevent the specific failure modes that kill forecasting systems.
4. **Never retroactively rewrite cases** to make the protocol look good. That's overfitting the test set and destroys calibration.

## Backtest Performance Log

Track how the current version of the protocol performs against this library. Append dated rows — protocol drift itself is data.

| Date | Cases tested | Hits (≥3mo lead) | Misses | Notes |
|---|---|---|---|---|
| 2026-04-18 | Case 1 (Wegovy mainstreaming, cutoff 2022-08-31) | 1 hit, ~28mo lead | 0 | Protocol output: p=0.80 that GLP-1s become #1 US weight-loss Rx by 2024-12-31. Outcome: true. Brier=0.04. All 5 agents' narratives rhymed. Signal strength=450/1000. Key insight: supply-constrained demand under Novo guidance raise was the cardinal signal — visible 28 months before resolution. Reddit vocabulary shift and Mounjaro approval were confirming, not necessary. |
| 2026-04-18 | Case F2 (Clubhouse hype, cutoff 2021-03-31) | 1 hit (correct negative prediction, ~27mo lead) | 0 | Protocol output: p=0.75 Clubhouse does NOT become top-3 audio platform by 2023-06-30. Outcome: true. Brier=0.0625. Signal strength=5.04 on positive prediction (far below 20 threshold) → flipped to negative prediction. Three generalizable insights: (1) agent divergence is the anti-hype shield — 3/5 negative agents override 2/5 loud positive agents; (2) peak media coverage INVERTS novelty score (saturation = low novelty, not high); (3) incumbent distribution timing is a kill signal — Twitter Spaces Android expanded March 2 2021, *during* Clubhouse's peak hype. These three patterns are reusable across any "hyped single-purpose app vs FAANG clones" template. |
| 2026-04-18 | Case F3 (NMN non-ban, cutoff 2022-12-31) | 1 hit (correct contra-panic prediction, ~24mo lead) | 0 | Protocol output: p=0.80 NMN remains widely available despite Nov 2022 FDA exclusion letter. Outcome: true (FDA reversed Sept 2025; NMN never removed from market). Brier=0.04. Signal strength=207. Generalizable pattern: FDA dietary supplement enforcement via drug-preclusion letters historically does NOT lead to market removal within 24mo — base rate overwhelming. Industry (NPA/CRN) is organized; FDA enforcement is resource-limited; consumer demand is durable. Template: when regulator issues letter/warning but lacks injunction/court action, predict status quo unless multi-agent confirms otherwise. |
| 2026-04-18 | Case 6 (BPC-157 Category 2, cutoff 2023-03-31) | 1 hit (~6mo lead) | 0 | Protocol output: p=0.65 FDA places BPC-157 in Cat 2 by end of 2023. Outcome: true (Sept 2023 placement). Brier=0.1225. Signal strength=48 — weak backtest, flagged as data-sparse (pre-decision PCAC minutes not publicly indexed for BPC-157 specifically). Protocol correctly expressed lower confidence via probability. Self-calibration working — weaker signal → wider error bars → higher Brier but still within acceptable range. |
