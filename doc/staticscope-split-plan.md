# StaticScope split plan — operational, step-by-step

Execution plan to finish decomposing `src/StaticScope.ts` (652 lines), the last
large file flagged by the TS-runtime refactor quality review.

`StaticScope` is **already largely decomposed**: the heavy rendering lives in
`src/scope/static/` (`TimeDomainRenderer`, `FrequencyRenderer`,
`SpectrogramRenderer`, `StaticScopeOverlays`, `StaticScopeControls`,
`StaticScopeInteractions`, `DataTableRenderer`). What remains in the file is the
**orchestrator class plus four still-monolithic blocks**:

| Block | Lines (approx) | Nature |
|-------|----------------|--------|
| CSV export (`btnDownload` handler) | ~395–453 (~55) | Pure logic, inline, **untested** |
| Static `draw*` wrappers | ~182–345 (~160) | Pass-through delegations (mostly JSDoc) |
| Zoom/mode state machine (getters/setters) | ~530–651 (~120) | View state |
| Type definitions (`TDrawOptions`…) | ~36–85 (~50) | Types |

## Constraints (verified)

- **The public facade must stay.** The `StaticScope` class is imported by
  `runtime/types.ts`, `runtime/state/ScopeState.ts`,
  `ui/AnalyserScopeController.ts`; the `TDrawOptions` type by `Analyser.ts`.
- **The static `draw*` methods are tested.** `StaticScopeRendering.test.ts` calls
  `StaticScope.drawOscilloscope`, `.drawGrid`, `.getModeName`, etc. They cannot be
  removed without rewriting those tests — the facade stays.
- The goal is therefore **"extract the internals, keep the facade"**, not
  dismantle the class.

## How to drive this plan

- **One concern per commit, each commit green.** Conventional commits
  (`refactor(scope):`, `test(scope):`, `docs(scope):`). Body states the
  verification result.
- **The gate, every commit:** `npm run test:unit` (vitest) is the primary safety
  net — the scope suite is dense (~10 files). Also run `eslint -c .eslintrc.json
  src`. Note: `tsconfig.fs.json` does **not** cover `src/StaticScope.ts` or
  `src/scope/`; their type-check rides on the webpack build, so vitest is the real
  guard here.
- **Characterize before you change.** Phase 1 adds tests for the CSV logic that
  currently has none; write them against the extracted function as it is moved.

---

## Phase 1 — CSV export → `scope/static/ScopeCsvExport.ts` (recommended first)

Best value/risk ratio. The `btnDownload` handler holds ~55 lines of pure
per-mode serialization (time-domain / spectroscope / spectrogram) currently
buried in a closure and untested.

- Extract `buildScopeCsv(mode: EScopeMode, data: TDrawOptions): string` (pure;
  moves the `wrap` import). Returns `""` when there is nothing to export.
- Extract `downloadTextFile(content: string, filename: string): void` (Blob/URL/
  `<a>` DOM glue) into a small `scope/DownloadFile.ts` helper.
- The `bind()` handler becomes:
  `const csv = buildScopeCsv(this.mode, this.data); if (csv) downloadTextFile(csv, "data.csv");`
- **Tests:** new `ScopeCsvExport.test.ts` — per-mode headers, index wrapping,
  empty data → `""`.
- **Impact:** −~55 lines from StaticScope, + coverage where there was none.
  Risk **low**.

## Phase 2 — Types → `scope/static/StaticScopeTypes.ts`

- Move `TDrawOptions`, `TStatsToDraw`, `TOptions`.
- **Compat:** re-export `TDrawOptions` from `StaticScope.ts`
  (`export type { TDrawOptions } from "./scope/static/StaticScopeTypes"`) so
  `Analyser.ts`'s existing import path is untouched — zero blast radius.
- **Impact:** −~50 lines. Risk **very low** (mechanical).

## Phase 3 — Static-wrapper overlay dedup

The four `draw*` static methods each rebuild the
`{ drawBackground, drawGrid, drawEvent, drawStats }` bundle.

- Extract a `private static overlayCallbacks()` returning the bundle once.
- The public statics stay (tests depend on them) but shrink from ~6 to ~2 lines.
- **Impact:** −~15 lines, removes the 4× repetition. Risk **low**.

## Phase 4 — Zoom state → `scope/static/ScopeViewState.ts` (most delicate)

Group `_zoom/_vzoom/_zoomOffset`, `zoomType`, `resetZoom`, and the pure clamping
of the setters into a small `ScopeViewState` class.

- Subtlety: the `zoom` setter reads `cursor`, `canvas.width`, `data` and writes
  `btnZoom.innerHTML`. `ScopeViewState` holds the numeric state + bounds;
  `StaticScope` keeps the cursor-aware orchestration and the DOM write.
- **Tests:** `ScopeViewState.test.ts` — vzoom bounds 1–16, offset clamp, reset,
  `zoomType` per mode.
- **Impact:** −~40 net lines. Risk **medium** (coupling must be split carefully).
  Do last, or defer.

---

## Expected result

- Phases 1–3 (low risk): **652 → ~530 lines** + one new tested module.
- Including Phase 4: **~480 lines**, zoom machine isolated and tested.

## Recommended order

Phases **1 → 2 → 3** as a safe, mechanical block (immediate CSV testability gain),
then decide on Phase 4 separately depending on appetite for the zoom refactor.
One commit per phase.
