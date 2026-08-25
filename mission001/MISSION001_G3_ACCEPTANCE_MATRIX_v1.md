# MISSION 001 — G3 ACCEPTANCE MATRIX v1

Authority: Owner verified G2 closure package + standing Mission governance.
Product trunk: immutable P0 `MISSION001_TrackA_BotV1_FullDerivative_v0.3.pine`
P0 SHA-256: `9b8eca4c8cf2e151083020f4b3c2812b0ba3f04502c33fb6af892f0371712137`
G2 status: `PASS`
P0 modification: `PROHIBITED`
Patch on discovery: `NOT AUTHORIZED`

## Acceptance rule
G3 validates implementation/strategy behavior. Visual similarity is insufficient. Every row requires scenario-level evidence or an explicitly bounded static-source conformance result. A static-source PASS does not substitute for runtime scenario evidence where runtime behavior is material.

| ID | REQUIREMENT / DOCTRINE | IMPLEMENTATION LOCATION / CURRENT TRACE | EXPECTED BEHAVIOR | TEST SCENARIO | OBSERVED RESULT | EVIDENCE | PASS / FAIL |
|---|---|---|---|---|---|---|---|
| G3-01 | Arbitration / precedence | Exact-P0 alignment audit records priority/exclusion `CT Long -> W2 Long -> W2 Short` while flat. P0 exact source-line locations are not currently repository-addressable; prior aligned audit is authoritative evidence. | If multiple independent setups are ready on same confirmed flat bar, exactly one entry path is eligible by priority: CT first, else W2L, else W2S. No mandatory sequential trade lifecycle. | Bounded source-topology conformance: trace readiness/exclusion predicates and order-path independence from prior exact-P0 audit; runtime collision scenario remains separately required. | Static topology conforms to independent readiness + Boolean priority. | State Package exact-source alignment audit: execution arbitration `CORE_VERIFIED`; Challenger map retained only as corroborating research, not SoT. | `STATIC_PASS / RUNTIME_PENDING` |
| G3-02 | W2 touch-memory / EA window | Exact-P0 audit: input `ew_w2PullEAWindow` default 5 bars; BUY/SELL symmetric final signal structure. | A W2 touch arms memory for bounded window; EA must occur within allowed window and all context/confluence/room/confirmed-bar gates must pass. | Positive boundary, negative just-outside-window, BUY/SELL symmetry. | NOT YET EXECUTED | — | `PENDING` |
| G3-03 | Structural SL/TP | Exact-P0 audit: CT sequence-low stop + nearest W2 target; W2L support invalidation stop + nearest W2 above; W2S resistance invalidation stop + nearest W2 below. | Entry stores structural stop/target from relevant setup; no arbitrary fixed-R substitution. | One CT, one W2L, one W2S scenario with exact source values and expected stop/target derivation. | NOT YET EXECUTED | — | `PENDING` |
| G3-04 | Risk overlay | Exact-P0 audit: equity/stop-distance/pointvalue sizing, daily-loss latch, max-DD kill latch, trade cap, GO/SCALE/STOP, force `close_all` on STOP while positioned. | Risk gate blocks/forces behavior deterministically; engineering validation only, not economic acceptance. | Trigger each latch/gate in isolation and verify readiness/close behavior. | NOT YET EXECUTED | — | `PENDING` |
| G3-05 | State transitions | Exact-P0 implementation trace required. | State changes occur only on specified confirmed conditions; no retroactive/future activation. | Arm -> active -> consumed/expired/invalidated sequences for CT/W2 event memories. | NOT YET EXECUTED | — | `PENDING` |
| G3-06 | Conflicting-signal handling | Arbitration trace + setup-specific readiness. | Conflicts resolve deterministically without duplicate entry or contradictory simultaneous execution. | Force CT+W2L, CT+W2S, W2L+W2S readiness collisions while flat. | NOT YET EXECUTED | — | `PENDING` |
| G3-07 | Invalidation / timeout behavior | Exact-P0 trace required for setup/event expiry and touch memory. | Stale/invalid conditions cannot fire later; timeout boundary is deterministic. | Last-valid-bar vs first-invalid-bar cases; invalidation before EA; expiry after touch. | NOT YET EXECUTED | — | `PENDING` |
| G3-08 | Execution safeguards | Exact-P0 audit notes `barstate.isconfirmed` on relevant final signals and flat/risk gating. | No entry on unconfirmed bar; no duplicate same-position entry; risk STOP prevents/forces execution as designed. | Realtime/unconfirmed simulation where possible + confirmed replay comparison + position-state guard cases. | NOT YET EXECUTED | — | `PENDING` |

## Freeze status
`G3_ACCEPTANCE_MATRIX = FROZEN_V1`

Changes to acceptance rows require new verified evidence or explicit governance reason. Discovery of a defect records FAIL evidence first; it does not authorize a P0 patch.

## First bounded validation case
`G3-01_ARBITRATION_PRECEDENCE_STATIC_CONFORMANCE`

Question: Does the already verified exact-P0 implementation topology encode independent CT/W2L/W2S readiness with deterministic same-bar priority while flat, rather than a mandatory sequential trade lifecycle?

Evidence basis:
1. Authoritative State Package exact-source alignment audit records `CORE_VERIFIED` arbitration `CT Long -> W2 Long -> W2 Short` with exclusion predicates while flat.
2. It explicitly states the setups are independent readiness branches, not a mandatory sequential trade lifecycle.
3. Challenger promotion map is non-SoT but independently corroborates the same topology and remains research-only.

Result:
`STATIC_SOURCE_CONFORMANCE = PASS`

Limit:
This closes only the static-topology subcase of G3-01. Runtime collision behavior remains `RUNTIME_PENDING` and must be proven before G3-01 is fully closed.
