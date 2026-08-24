# MISSION 001 — Fast-Lane D v0.5-D1 Provenance / Assumption Ledger

Classification: **CONTROLLED NEW DOCTRINE / NOT RECOVERED ORIGINAL DOCTRINE / DEMO-VALIDATION REQUIRED**

## Approved doctrine
Owner approved Model 1:
`SCAN -> CT_LONG -> WAIT_W2_LONG -> W2_LONG -> WAIT_W2_SHORT -> W2_SHORT -> SCAN`

This sequential state transition is approved for Fast-Lane D only. It is not the recovered original CT/W2 doctrine.

## Verified / high-confidence project components used
- Pine v6 strategy target; XAUUSD M1 Demo observation target.
- Donchian 65/129/234/468.
- W2/Zone06 structural trap/retest concept and Donchian confluence.
- Liquidity/sweep context; confirmation window <=9 closed bars as configurable input.
- Closed-bar/no-lookahead decisions.
- STOP / GO / SCALE; one-position mutual exclusion.
- Risk sizing from stop distance; daily-loss protection; max-DD kill; force-flat.
- BASELINE-001 remains READ-ONLY.
- No claim of Edge / Champion / P1 / P2.

## NEW_ASSUMPTION A1 — CT Long automatic detection
Formula:
- ARM: `low <= prior_DC468_lower - ctSweepTicks*tick` AND `close >= prior_DC468_lower + ctReclaimTicks*tick`.
- ENTER within `maxSignalBars`: confirmed close breaks highest prior high over `ctTriggerLookback` and closes above DC65 midpoint.
Rationale: conservative executable proxy for reversal context + liquidity sweep + reclaim + trigger.
Provenance gap: exact CT `strategy.entry()` predicate was not recovered.
Inputs: `ctSweepTicks`, `ctReclaimTicks`, `ctTriggerLookback`, `maxSignalBars`.

## NEW_ASSUMPTION A2 — W2 Long automatic detection
Formula:
- Only in `WAIT_W2_LONG`.
- Up-regime: `DC129_mid > DC234_mid >= DC468_mid`.
- ARM: low touches configurable DC234-mid band, local downside sweep vs prior low, close back above DC234 midpoint.
- ENTER within `maxSignalBars`: confirmed break above recent high.
Rationale: executable proxy for W2/Zone06 pullback + Donchian confluence + sweep + trigger.
Provenance gap: exact W2 Long branch not recovered.
Inputs: `w2TouchBandPct`, `w2SweepTicks`, `w2TriggerLookback`, `maxSignalBars`.

## NEW_ASSUMPTION A3 — W2 Short automatic detection
Formula:
- Only in `WAIT_W2_SHORT`.
- Down-regime: `DC129_mid < DC234_mid <= DC468_mid`.
- ARM: high touches configurable DC234-mid band, local upside sweep vs prior high, close back below DC234 midpoint.
- ENTER within `maxSignalBars`: confirmed break below recent low.
Rationale: symmetric Demo implementation of W2 short handoff.
Provenance gap: exact W2 Short branch not recovered.
Inputs: `w2TouchBandPct`, `w2SweepTicks`, `w2TriggerLookback`, `maxSignalBars`.

## NEW_ASSUMPTION A4 — Stop / Target
Formula:
- Long SL = arm-structure low - `slBufferTicks * syminfo.mintick`.
- Short SL = arm-structure high + `slBufferTicks * syminfo.mintick`.
- TP = entry +/- `rewardRisk * initialRiskDistance`.
Defaults: `slBufferTicks=10`, `rewardRisk=1.50`.
Rationale: deterministic, conservative, auditable Demo-only exit rule and coherent risk sizing.
Provenance gap: exact original CT/W2 stop and target formulas are unrecovered.
Inputs: `slBufferTicks`, `rewardRisk`.

## NEW_ASSUMPTION A5 — W2 regime filter
- Up-regime: DC129 midpoint > DC234 midpoint >= DC468 midpoint.
- Down-regime: DC129 midpoint < DC234 midpoint <= DC468 midpoint.
Rationale: uses verified Donchian hierarchy while preventing counter-regime W2 entries.
Provenance gap: exact original W2 regime Boolean is unrecovered.

## Approved state transition / mutual exclusion
- Only one active leg.
- CT Long must close before W2 Long can enter.
- W2 Long must close before W2 Short can enter.
- W2 Short close returns to SCAN.
- No auto-reversal/preemption.

## Validation status
- Functional source shipped: YES.
- Automatic entries: YES.
- Native TradingView Compile: NEXT GATE / NOT YET EVIDENCED.
- Demo/Shadow observation: NOT YET OPEN.
- Edge/Champion: NOT CLAIMED.
