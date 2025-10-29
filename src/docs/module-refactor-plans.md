# Module Refactor Plans

Date: 2025-10-29

This document outlines the proposed refactors for the large TypeScript modules that make up FaustIDE’s runtime. The goals mirror the index refactor plan: smaller responsibilities, better typing, easier testing.

## Analyser.ts
- **Current state**: monolithic class mixing signal processing, state caching, and draw-handler orchestration.
- **Refactor direction**
  - Extract pure DSP utilities (`computeFFT`, `estimateFrequency`) into `services/dsp/AnalyserMath.ts`.
  - Create `AnalyserBuffer` (manages circular buffers) and `AnalyserController` (wires draw handlers, events).
  - Inject dependencies (FFT factory, window function) to make unit tests deterministic.
- **Testing**
  - Vitest unit tests for maths helpers and buffer rotation.
  - jsdom integration test that feeds mock audio buffers and asserts emitted draw options.
  - Playwright: keep existing analyser UI coverage; no additional work once services expose observability hooks.

## FileManager.ts
- **Current state**: large class mixing DOM creation, state persistence, BrowserFS operations.
- **Refactor direction**
  - Split into `FileManagerView` (DOM manipulation), `FileManagerStore` (BrowserFS + LibFaust sync), and `FileManagerController` (events).
  - Expose callbacks/events instead of direct UI mutation.
  - Centralise BrowserFS interactions for easier mocking.
- **Testing**
  - Unit tests for `FileManagerStore` using BrowserFS in-memory backend.
  - jsdom integration covering drag/drop, selection, deletion.
  - Playwright already exercises creation/rename; extend to new flows once deterministic.

## Scope.ts / StaticScope.ts
- **Current state**: classes handling canvas drawing plus stateful configuration.
- **Refactor direction**
  - Extract rendering primitives into `services/rendering/ScopeRenderer.ts`.
  - Split config/state (e.g., `ScopeSettings`, `StaticScopeSettings`) from drawing loops.
  - Consider using Composition over inheritance (shared base interface with plug-in renderers).
- **Testing**
  - Unit tests on renderer functions using mocked canvas contexts.
  - jsdom integration to ensure DOM attributes (classes, mode toggles) still work.

## Recorder.ts
- **Current state**: simple class but couples encoding (wav-encoder) with state.
- **Refactor direction**
  - Keep `Recorder` as lightweight data collector.
  - Move encoding to `services/audio/RecorderEncoder.ts` with pluggable backends (WAV, future formats).
- **Testing**
  - Unit tests verifying buffer accumulation and encoding call contract (using mocked encoder).

## MeterNode.ts
- **Current state**: includes custom WebAudio node creation and UI bindings.
- **Refactor direction**
  - Separate WebAudio node factory (`createMeterNode`, `createGainUI`) from DOM wiring.
  - Provide TypeScript interfaces for meter readings to simplify tests.
- **Testing**
  - Unit tests using WebAudio test API.
  - jsdom integration to assert UI gauge updates with fake audio data.

## Key2Midi.ts
- **Current state**: map of keyboard events to MIDI note messages.
- **Refactor direction**
  - Convert to functional module with injected `handler` to ease testing.
  - Provide configuration objects for key maps; expose builder for custom layouts.
- **Testing**
  - Unit tests covering state transitions (offsets, velocity updates, flush).

## documentation.ts
- **Current state**: static data with doc URL mapping.
- **Refactor direction**
  - Move to JSON + helper loader to decouple data from logic.
  - Provide TypeScript type definitions for doc sections.
- **Testing**
  - Unit test verifying helpers return expected URLs for key prefixes.

## utils.ts
- **Current state**: mixed collection of DSP and DOM utilities.
- **Refactor direction**
  - Split into domain-specific files (`dsp/fftUtils.ts`, `canvas/canvasWrap.ts`, `storage/safeStorage.ts`).
  - Deprecate unused helpers; document each exported function.
- **Testing**
  - Vitest suites already cover maths; ensure new files maintain coverage.

## Supporting Infrastructure
- Update `docs/testing-strategy.md` with module-specific testing guidance once refactor milestones complete.
- Maintain a changelog entry per module to track API changes for IDE integrators.
- Use the existing “testing implementation step” docs to record progress after each milestone.

## runtime/exportService.ts
- **Current state**: Implements upload and precompile orchestration inline with bare `fetch` calls, embeds URL building logic, and leaks low-level response parsing to callers. Error handling is string-based and difficult to exercise in isolation.
- **Refactor direction**
  - Extract an `ExportApiClient` responsible for upload/precompile HTTP calls with configurable base URL and injected `fetch`.
  - Promote `resolveExportTarget` into a pure helper module shared by client and UI so that path logic is unit-tested once.
  - Introduce an `ExportWorkflow` service that exposes `submitExport()` and emits progress events/cancellable tokens for UI.
  - Surface typed error classes (upload failure, invalid hash, precompile pending) to simplify UI messaging and retries.
- **Testing**
  - Vitest unit tests using `MSW`/`fetch-mock` to cover happy path, non-hex responses, HTTP failures, and retry fallbacks.
  - Integration tests exercising the workflow service to assert progress events and cancellation behaviour.
  - Re-enable the Playwright export flow once service hooks exist so the UI can await workflow completion deterministically.

## Monaco language support

### monaco-faust/FaustLang.ts
- **Current state**: Single file mixes Monarch config, doc retrieval, providers, and network I/O. Hard-coded keyword arrays live alongside runtime logic, and error handling is side-effectful.
- **Refactor direction**
  - Split static metadata (keywords, functions, operators, theme) into `language/faust/constants.ts`.
  - Create a `FaustDocRepository` that accepts `libFaust`/`fetch` and caches parsed docs; inject it into a `createFaustProviders` factory.
  - Move `matchDocKey` and related helpers into a focused utility module with explicit types.
  - Expose a typed `FaustLanguageBundle` (config, theme, providers) consumed by the registration step.
- **Testing**
  - Vitest unit tests for `matchDocKey`, provider creation with stubbed docs, and doc caching behaviour.
  - jsdom integration tests using `monaco-editor/esm` to ensure hover/completion wiring still resolves doc URLs.
  - Playwright smoke to confirm Monaco still loads language configuration in the browser.

### monaco-faust/Faust2Doc.ts & monaco-faust/Faust2MD.ts
- **Current state**: Recursive static classes with intertwined parsing responsibilities and implicit state. Lacks caching, streaming safeguards, and fine-grained tests.
- **Refactor direction**
  - Convert to composable parsers: `DocTokenizer` (line classification), `DocAssembler` (builds tree), and `LibraryResolver`.
  - Add depth guards and memoisation to prevent repeated library fetches.
  - Normalise outputs around typed DTOs (`DocSection`, `DocFunction`) to simplify downstream consumption.
- **Testing**
  - Vitest suites for each helper (library/import matching, condition expansion, Markdown generation).
  - Fixture-based integration tests covering nested library imports and conditional doc expansion.

### monaco-faust/register.ts
- **Current state**: Performs asynchronous registration but returns raw providers without lifecycle management. No way to unregister or swap providers for tests.
- **Refactor direction**
  - Introduce `registerFaustLanguage({ monaco, libFaust, bundle })` that returns a disposable handle.
  - Allow passing a pre-created language bundle from `FaustLang` to decouple IO from registration.
  - Ensure repeated registration is idempotent and logs through the shared logger instead of `console`.
- **Testing**
  - Vitest test double for Monaco `languages` APIs validating handler registration and disposal.
  - Integration test that registers/unregisters twice to confirm idempotency.

## Controllers (`src/controller`)

### src/controller/AudioOutputController.ts
- **Current state**: Relies on jQuery selectors, mutates DOM directly, and depends on yet-to-be-extracted `runtime/types`. Device switching and DAC toggling mix view updates with audio graph orchestration.
- **Refactor direction**
  - Replace raw selectors with injected element handles or a thin `DomBinder` to enable deterministic tests.
  - Delegate audio graph operations to the upcoming `AudioGraphService`, keeping the controller focused on UI state.
  - Expose `initialize()` returning an unsubscribe/cleanup function so bootstrap can dispose handlers on teardown.
  - Wire compile options via the new environment types (`FaustEnvironment`), removing ad-hoc dependency objects.
- **Testing**
  - jsdom integration tests using fake audio envs to assert `initAudioCtx` invocations, button class toggles, and recorder sample-rate updates.
  - Playwright coverage for DAC toggling once service orchestration is in place.

### src/controller/RecorderController.ts
- **Current state**: Couples UI events, recorder state, and timing display logic with global selectors. Uses animation frame loops that are hard to unit-test.
- **Refactor direction**
  - Isolate time-display scheduling into a pure helper with injectable scheduler (`requestAnimationFrame`) for tests.
  - Accept dependencies through constructor (recorder, uiEnv, elements) and return cleanup hooks after `initialize()`.
  - Coordinate with a dedicated `RecorderService` for encoding/upload to keep controller focused on DOM events.
- **Testing**
  - Vitest unit tests for the scheduler helper (advance frames, cancel).
  - jsdom integration verifying button toggles, enabled state, and that encode/download flows use injected recorder mock.
  - Playwright scenario to assert record/save buttons operate once audio graph mocks land.

## Panel toggle view (`src/view/PanelToggleView.ts`)
- **Current state**: Duplicate implementations live under `view/` and `src/view/`, both binding jQuery handlers directly and depending on global `window` resize side-effects.
- **Refactor direction**
  - Consolidate to a single `PanelToggleController` exporting `initPanelToggles({ editor, layoutSwitch })`.
  - Replace `$(window).on("resize")` with `matchMedia`/`ResizeObserver` abstraction to ease testing and avoid redundant layouts.
  - Inject button and panel elements so the controller is decoupled from hard-coded selectors.
- **Testing**
  - jsdom integration to assert class toggles and `editor.layout()` invocations for left/right toggle scenarios.
  - Playwright regression covering responsive breakpoint behaviour (already partially covered by `responsive.spec.ts`).
