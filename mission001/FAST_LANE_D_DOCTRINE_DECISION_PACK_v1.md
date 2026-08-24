# MISSION 001 — FAST-LANE D DOCTRINE DECISION PACK v1

Status: ORIGINAL DOCTRINE UNRECOVERABLE from currently materialized verified sources.
Purpose: Owner doctrine decision for a CONTROLLED NEW DOCTRINE used only by Fast-Lane D Demo Candidate. This does not change Track A, Track B, BASELINE-001, P1/P2 gates, or Champion/Edge status.

## Evidence boundary

Accessible source audit completed across current GitHub tree, repository commit history, GitHub code search for `strategy.entry` and `CT Long`, Google Drive searches for Zone06/baseline/spec, Gmail attachment search for CT-W2/Zone06, and prior verified conversation context. No materialized source contains the exact CT/W2 `strategy.entry/strategy.exit` implementation needed to recover the original executable transition state machine.

Recovered high-confidence doctrine/components:
- Setup-A-style reversal chain previously accepted as Context -> Displacement -> Extreme -> Failure -> Trigger -> Entry, with a liquidity event required and fake reversals/spikes/poor-spread/over-tested zones rejected.
- CT Long must not be triggered merely because an EA sell-like/opposite signal appears; EA placement must be interpreted inside structure/context.
- Donchian 65/129/234/468 are core structure; DC468 provides regime/port authority, DC234 retest/holding structure, DC129 timing.
- Zone06/W2 is the end-Wave2/start-Wave3 trap region with Donchian confluence.
- EA confirmation is valid on the sweep candle or within <=9 closed bars after the structural event; no-lookahead required.
- Setup C verified sequence exists separately: BUY Upper468 break -> P1 Origin Low -> Expansion/P2 High -> Lower468 break -> regime -> Zone3 -> QQE negative + B65/EA BUY; SELL mirrored. This is evidence that the system uses ordered structural state transitions rather than name-only signals, but it is not proof of the CT/W2 transitions below.
- STOP/GO/SCALE, risk sizing shell, daily-loss protection, max-DD kill, force-flat, one-position/flat-position gate concepts are available.

## Rule classification by leg

### CT LONG

| Field | Rule | Classification | Provenance |
|---|---|---|---|
| ARM | A reversal candidate is armed only after structural context + displacement/extreme/liquidity event; EA alone is insufficient. | STRONG INFERENCE | Accepted Setup A state chain plus explicit CT Long correction that EA location/context matters. No CT-specific code artifact is materialized. |
| ENTER | Enter only after Failure -> Trigger confirmation on a closed bar, with execution/risk gates passing and no conflicting open position. | STRONG INFERENCE | Accepted Setup A chain and prior execution-layer facts; exact CT predicate names are unrecovered. |
| EXIT | Structural stop at the setup invalidation boundary; target toward the next verified opposing structure/Donchian objective. | UNRESOLVED | Existing doctrine supports structure-based invalidation/Donchian objectives, but exact CT stop/target formula is not materialized. |
| INVALIDATE | Failure of the reversal structure before entry; after entry, breach of the structural invalidation boundary or kill-switch. | STRONG INFERENCE | Setup invalidation logging/doctrine plus risk shell; exact CT boundary unrecovered. |
| NEXT-LEG ENABLE | W2 Long can only be considered after a valid same-direction W2/Zone06 structure exists. Whether CT must first exit is unrecovered. | UNRESOLVED | W2/Zone06 role is verified; sequencing relation to CT exit is not. |
| MUTUAL-EXCLUSION PRIORITY | CT Long should not coexist with another strategy position; exact priority over W2 Long when both are simultaneously valid is unrecovered. | UNRESOLVED | Flat-position/one-position concepts are supported; CT-vs-W2 precedence is not. |

### W2 LONG

| Field | Rule | Classification | Provenance |
|---|---|---|---|
| ARM | Arm when a valid W2/Zone06 same-direction structure exists with Donchian confluence and the relevant sweep/liquidity event. | STRONG INFERENCE | Zone06/W2 doctrine is verified; exact W2 Long executable predicate is unrecovered. |
| ENTER | Closed-bar entry when EA/B65 confirmation occurs on the sweep candle or <=9 bars after, with structural validation and risk/flat-position gates passing. | STRONG INFERENCE | EA <=9 relationship and Setup C style validation are verified; exact W2 Long branch code is unrecovered. |
| EXIT | Stop beyond W2/Zone06 structural invalidation; target toward next Donchian/W2 objective. | UNRESOLVED | Dynamic structural objective doctrine exists, exact W2 Long exit formula does not. |
| INVALIDATE | W2/Zone06 is invalidated by a full structural failure/sweep through its protected boundary or opposite regime validation before entry. | STRONG INFERENCE | Intact/Touched/Fully-Swept and regime validation doctrine; exact threshold predicate unrecovered. |
| NEXT-LEG ENABLE | W2 Short can be considered only after an opposite-side valid W2/Zone06 structure exists; whether W2 Long must exit first is unrecovered. | UNRESOLVED | Opposite-side symmetry is verified; sequencing is not. |
| MUTUAL-EXCLUSION PRIORITY | No simultaneous W2 Long and W2 Short positions. Priority against CT Long is unrecovered. | STRONG INFERENCE for opposite exclusion / UNRESOLVED for CT-vs-W2 priority | One-position concept + buy/sell symmetry. |

### W2 SHORT

| Field | Rule | Classification | Provenance |
|---|---|---|---|
| ARM | Arm on opposite-side W2/Zone06 structure with Donchian confluence and a valid sweep/liquidity event. | STRONG INFERENCE | Symmetric W2/Zone06 doctrine. |
| ENTER | Closed-bar entry when opposite EA/S65 confirmation occurs on the sweep candle or <=9 bars after, with validation and risk/flat gates passing. | STRONG INFERENCE | EA window + symmetry; exact branch code unrecovered. |
| EXIT | Stop beyond opposite W2/Zone06 invalidation; target toward next structural Donchian/W2 objective. | UNRESOLVED | Structural exit philosophy present, exact formula unrecovered. |
| INVALIDATE | Opposite W2/Zone06 fails structurally or regime validation contradicts the short before entry. | STRONG INFERENCE | Symmetry + regime validation doctrine. |
| NEXT-LEG ENABLE | End of three-leg chain or return to neutral/scanning state after exit. | UNRESOLVED | No original terminal-state code recovered. |
| MUTUAL-EXCLUSION PRIORITY | Short cannot coexist with W2 Long/CT Long position. Whether short can preempt/close a long on opposite validation is unrecovered. | UNRESOLVED | One-position concept supports exclusion, not preemption semantics. |

## Candidate transition models

### MODEL 1 — STRUCTURE-GATED SEQUENTIAL (RECOMMENDED CONTROLLED NEW DOCTRINE)

Exact state-machine logic:

```text
STATE = SCAN
GLOBAL_ENTRY_OK = bar_confirmed AND risk_gate_pass AND NOT kill_switch AND position_flat

CT_ARM = reversal_context AND liquidity_event AND extreme AND failure_candidate
CT_ENTER = STATE==SCAN AND GLOBAL_ENTRY_OK AND CT_ARM AND trigger_confirmed

on CT_ENTER: STATE=CT_LONG_ACTIVE
on CT_LONG_EXIT: STATE=WAIT_W2_LONG

W2L_ARM = valid_w2_zone06_long AND donchian_long_confluence AND sweep_long
W2L_ENTER = STATE==WAIT_W2_LONG AND GLOBAL_ENTRY_OK AND W2L_ARM AND ea_long_within_0_9

on W2L_ENTER: STATE=W2_LONG_ACTIVE
on W2_LONG_EXIT: STATE=WAIT_W2_SHORT

W2S_ARM = valid_w2_zone06_short AND donchian_short_confluence AND sweep_short
W2S_ENTER = STATE==WAIT_W2_SHORT AND GLOBAL_ENTRY_OK AND W2S_ARM AND ea_short_within_0_9

on W2S_ENTER: STATE=W2_SHORT_ACTIVE
on W2_SHORT_EXIT: STATE=SCAN

MUTUAL EXCLUSION: only one active leg; next leg cannot enter until prior leg has exited and position is flat.
```

Evidence supporting it:
- Best match to the project's repeatedly verified ordered-state philosophy (Context -> ... -> Entry; Setup C ordered transitions; W2/Zone06 + EA window).
- Honors the owner's explicit sequence name `CT Long -> W2 Long -> W2 Short` literally as a state progression.
- Lowest risk of overlapping contradictory legs.

Assumptions introduced:
- CT must exit before W2 Long may enter.
- W2 Long must exit before W2 Short may enter.
- The three-leg sequence is a true execution chain rather than three independent setup families.
- Exact structural stop/target formulas still require controlled-new-doctrine definitions in the implementation ledger.

Expected behavior on XAUUSD M1:
- Lowest trade count of the candidates.
- Later W2 entries because a valid signal is ignored while the prior leg is still active.
- Cleaner causal sequencing and easiest audit trail.

Trades added/removed/changed:
- Removes overlapping/simultaneous CT/W2 opportunities.
- Removes W2 Longs that occur before CT exit and W2 Shorts that occur before W2 Long exit.
- Entry price may be later than independent-signal models.

Risk of doctrine drift: MEDIUM. Sequentiality is plausible and strongly aligned with naming/state-machine evidence, but original exit-to-enable linkage is not recovered.

### MODEL 2 — STRUCTURE-GATED PRIORITY, INDEPENDENT SETUPS

Exact state-machine logic:

```text
GLOBAL_ENTRY_OK = bar_confirmed AND risk_gate_pass AND NOT kill_switch AND position_flat

CT_VALID  = CT_ARM AND trigger_confirmed
W2L_VALID = valid_w2_zone06_long  AND sweep_long  AND ea_long_within_0_9
W2S_VALID = valid_w2_zone06_short AND sweep_short AND ea_short_within_0_9

if GLOBAL_ENTRY_OK:
    if CT_VALID: enter CT_LONG
    else if W2L_VALID: enter W2_LONG
    else if W2S_VALID: enter W2_SHORT

After any exit, return immediately to SCAN. No prior-leg completion is required to arm a different setup; only flat-position gating prevents overlap.

PRIORITY: CT_LONG > W2_LONG > W2_SHORT when multiple predicates become valid on the same confirmed bar.
```

Evidence supporting it:
- Compatible with historical project architecture where setup families can be independently validated and execution chooses among candidate layers.
- Flat-position gating is consistent with prior execution-layer facts.

Assumptions introduced:
- CT/W2 are independent setup families, not a mandatory three-leg chain.
- Priority order CT > W2L > W2S is new and not recovered from source.

Expected behavior on XAUUSD M1:
- More trades than Model 1.
- Faster participation in W2 structures after any prior position closes.
- Same-bar collisions are resolved deterministically by priority.

Trades added/removed/changed:
- Adds W2 Long/Short trades that Model 1 would reject because the expected prior leg was never completed.
- Can change which trade is taken when CT and W2 become valid together.

Risk of doctrine drift: HIGH. Independence and the priority order are not proven for the original CT/W2 chain.

### MODEL 3 — LIQUIDITY-LIFECYCLE HANDOFF

Exact state-machine logic:

```text
GLOBAL_ENTRY_OK = bar_confirmed AND risk_gate_pass AND NOT kill_switch AND position_flat

CT_ENTER  = GLOBAL_ENTRY_OK AND reversal_context AND liquidity_event AND extreme AND failure AND trigger_confirmed
W2L_ENTER = GLOBAL_ENTRY_OK AND valid_w2_zone06_long  AND sweep_long  AND ea_long_within_0_9
W2S_ENTER = GLOBAL_ENTRY_OK AND valid_w2_zone06_short AND sweep_short AND ea_short_within_0_9

NEXT-LEG ENABLE is not tied to prior trade exit history. It is tied to the emergence of the next structural liquidity lifecycle state:
- CT context expires when a same-direction W2/Zone06 long becomes valid.
- W2 Long context expires when an opposite W2/Zone06 short becomes valid.
- Existing position is never auto-reversed; a new leg still requires position_flat.
```

Evidence supporting it:
- Strongly aligned with the user's doctrine that EA only matters in the correct structural/liquidity context.
- Strongly aligned with W2/Zone06 lifecycle, sweep, and <=9-bar EA confirmation.

Assumptions introduced:
- Structural lifecycle, not realized trade completion, determines logical handoff.
- Context may advance while an earlier position is still active, causing the later leg to become stale before flatness occurs.

Expected behavior on XAUUSD M1:
- Fewer artificial waits than Model 1 but still structure-driven.
- Some next-leg opportunities can expire while prior position remains open.
- More sensitive to exact W2 lifecycle definitions.

Trades added/removed/changed:
- Adds opportunities where the prior leg never traded but the market structure progressed.
- Removes opportunities whose EA window expires before the prior position becomes flat.

Risk of doctrine drift: MEDIUM-HIGH. Structural handoff is well supported conceptually, but exact handoff semantics are not recovered.

## Same-evidence replay status

A valid candidate replay cannot yet be performed without manufacturing state. The available GR-001/002/003 canonical records do not yet contain the full BAR-STATE-EVENT vector (Donchian, W2 lifecycle, EA state, filter vector, exact identity). Development cases cannot be promoted as canonical or used as a parity oracle. Therefore no candidate is ranked by P&L or historical outcome.

## Recommendation

RECOMMENDED DOCTRINE: MODEL 1 — STRUCTURE-GATED SEQUENTIAL, but explicitly as a CONTROLLED NEW DOCTRINE, not recovered original doctrine.

Reason:
1. It best preserves the literal sequence `CT Long -> W2 Long -> W2 Short`.
2. It is most consistent with the system's verified state-machine philosophy and one-position safety boundary.
3. It introduces the fewest unverified arbitration rules.
4. It has the lowest execution ambiguity and easiest provenance/audit trail for a Demo candidate.
5. It does not claim Edge, Champion, P1, or P2.

Required Owner decision: APPROVE / REJECT / REQUEST DIFFERENT DOCTRINE.

If APPROVED, implementation begins immediately with explicit `CONTROLLED NEW DOCTRINE` labels for every assumption and unresolved stop/target detail; native TradingView Compile is the next gate.
