# Testing Strategy

This document captures the proposed testing approach for the FaustIDE runtime while the application code remains largely concentrated in `src/index.ts` and the supporting modules under `src/`.

## Goals
- Increase confidence in refactors by covering computational logic, BrowserFS persistence, and WebAudio interactions with automated tests.
- Provide guardrails for the UI-heavy orchestration code without tying tests to jQuery implementation details.
- Surface manual verification points that automation cannot reliably exercise (hardware, perceptual quality, popup flows).

## Tooling Stack
- **Test runner**: [`Vitest`](https://vitest.dev) with the `jsdom` environment for fast TypeScript-first authoring.
- **DOM helpers**: [`@testing-library/dom`](https://testing-library.com/docs/dom-testing-library/intro/) to drive UI components without depending on jQuery internals.
- **WebAudio mocks**: [`web-audio-test-api`](https://github.com/mohayonao/web-audio-test-api) to stub `AudioContext`, nodes, and connections.
- **Filesystem mocks**: [`BrowserFS`](https://github.com/jvilk/BrowserFS) configured with `InMemory` or `IndexedDB` backends plus [`fake-indexeddb`](https://github.com/dumbmatter/fakeIndexedDB) for persistence tests.
- **Network stubbing**: [`msw`](https://mswjs.io/) to intercept Faust service requests (`/compile`, `/export`, `/precompile`).
- **End-to-end**: [`Playwright`](https://playwright.dev/) headless browser runs against the build output with mocked Faust services and fake media streams.

## Automated Coverage

### Unit Tests
- `utils.ts`: cover `mod`, `wrap`, `sliceWrap`, `setWrap`, FFT helpers (`getFrequencyDomainData`, `estimateFreq`), and `safeStorage`.
- `Recorder.ts`: verify append/reset behaviour, elapsed time calculation, multi-channel encoding, and WAV payloads via `wav-encoder`.
- `Key2Midi.ts`: exercise QWERTY/AZERTY maps, octave shifts, velocity ramps, and flush semantics.
- `Analyser.ts`: validate buffer caching, FFT overlap logic, frequency estimation, and draw-mode transitions with mocked draw handlers.
- `MeterNode.ts` and other pure modules: assert gain metering math and parameter validation.

These suites rely on Vitest spies and synthetic buffers to avoid DOM or audio device requirements.

### Integration Tests (jsdom)
- Instantiate `FileManager.ts` against a mocked BrowserFS tree to cover file creation, renames, deletions, main-file selection, and callback wiring.
- Exercise `src/controller/RecorderController.ts`: simulate button clicks, ensure recorder state toggles, download links populate, and timer scheduling throttles updates.
- Cover `src/view/PanelToggleView.ts`: verify panel visibility toggles, responsive resize handling, and Monaco `layout()` calls.

Each test mounts minimal HTML snippets and uses Testing Library queries, keeping assertions UI-focused while remaining implementation-agnostic.

### Runtime Service Tests
- Extract orchestration helpers from `index.ts` into testable modules (e.g., DSP compilation adapters, export pipeline helpers, audio graph wiring).
- Drive these modules with mocked Faust WASM factories (`FaustMonoDspGenerator`, `FaustPolyDspGenerator`), BrowserFS stubs, and `msw` handlers for REST endpoints.
- Assert on promise resolution paths, error handling (compile failures, network timeouts), and persisted state updates (`load/saveEditorParams`).

### End-to-End Smoke Tests
- Build the app and run Playwright scenarios with mocked Faust endpoints to:
  - Load a bundled example, trigger compilation, and confirm diagram rendering appears.
  - Toggle plot modes and verify analyser UI updates.
  - Save/load project files and observe persistence across reloads.
  - Walk through the export modal ensuring success and error surfaces display correctly.
- Use Playwright’s emulate features to inject fake media streams and bypass hardware prompts where possible.

## Manual Verification
- Audio device routing, latency, gain staging, and real DSP playback (`initAudioCtx` paths) across browsers and operating systems.
- Subjective audio quality checks when recording, exporting, and replaying rendered DSPs.
- Popup window workflows (DSP UI pop-out, cross-window `postMessage` synchronisation) under real browser popup-blocker behaviour.
- Full export and QR-code flows against the production Faust service, including large project uploads and server-side errors.
- Responsive layout, drag-and-drop interactions, accessibility affordances, and keyboard shortcuts in real browsers and assistive technologies.

## Setup Steps
1. **Verify prerequisites**
   - Ensure Node.js ≥ 18 and the project package manager (e.g. `pnpm`, `npm`, or `yarn`) are available.
   - Confirm TypeScript builds are green (`pnpm build` or equivalent) before introducing tests.
2. **Install dev dependencies**
   - Core test stack: `vitest`, `jsdom`, `@testing-library/dom`, `@testing-library/user-event`, `@testing-library/jest-dom`, `@types/testing-library__jest-dom`.
   - Runtime mocks: `web-audio-test-api`, `fake-indexeddb`, `msw`, `whatwg-fetch`.
   - Coverage & tooling: `@vitest/coverage-v8`, `ts-node` (if missing), `happy-dom` (optional lightweight alt to jsdom).
   - End-to-end: `@playwright/test`, plus `playwright` browsers (`npx playwright install`).
   - Example with pnpm:
     ```
     pnpm add -D vitest @vitest/coverage-v8 jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom @types/testing-library__jest-dom web-audio-test-api fake-indexeddb msw whatwg-fetch @playwright/test playwright
     ```
3. **Create configuration scaffold**
   - Add `vitest.config.ts` with:
     - `environment: "jsdom"`.
     - `setupFiles` pointing to `tests/setup/vitest.setup.ts`.
     - `coverage` block (e.g. `provider: "v8"`).
     - Alias reuse from `tsconfig` (use `vite-tsconfig-paths` or manual `resolve.alias`).
   - Add `tests/setup/vitest.setup.ts` to:
     - Polyfill `TextEncoder/TextDecoder` (Node 18 already has them, guard anyway).
     - Register `@testing-library/jest-dom` matchers.
     - Attach `fake-indexeddb` and `IDBKeyRange`.
     - Patch `globalThis.AudioContext`/`OfflineAudioContext` from `web-audio-test-api`.
     - Start `msw` server in test mode (import `./msw-server`).
   - Add `tests/setup/msw-server.ts` exporting `setupServer`, default handlers, and lifecycle hooks (`beforeAll`, `afterEach`, `afterAll`).
4. **Wire package scripts**
   - Add scripts to `package.json`:
     - `"test": "vitest run"`
     - `"test:watch": "vitest"`
     - `"test:coverage": "vitest run --coverage"`
     - `"test:e2e": "playwright test"`
   - Optionally add `"pretest": "npm run build"` gate or lint step.
5. **Stabilise TypeScript support**
   - Ensure `tsconfig.json` includes `"types": ["vitest/globals", "@testing-library/jest-dom"]` in the appropriate `tsconfig` (or create `tsconfig.test.json` that extends the base).
   - If using path aliases, configure `vitest.config.ts` and Playwright config to honour them.
6. **Lay down directory structure**
   - Create `tests/unit`, `tests/integration`, `tests/runtime`, `tests/e2e`.
   - Co-locate fixtures under `tests/fixtures` (Faust code samples, BrowserFS JSON seeds, mocked API payloads).
   - For modules needing injection (e.g. `index.ts` helpers), add shims under `src/runtime` and export them for testing.
7. **Author seed tests**
   - Unit: add `tests/unit/utils.test.ts` and `tests/unit/recorder.test.ts`.
   - Integration: add `tests/integration/file-manager.test.ts` with jsdom-rendered HTML snippet.
   - Runtime: add `tests/runtime/export-service.test.ts` using `msw` to simulate Faust endpoints.
   - Ensure each suite uses the new setup utilities rather than duplicating mocks.
8. **Configure Playwright**
   - Add `playwright.config.ts` with Chromium-only runs initially, custom `storageState` for persisted settings, and `webServer` command pointing to the dev server or static build.
   - Implement fixtures for mocking Faust endpoints (either via service worker in app or Playwright’s `page.route`).
   - Create first scenario under `tests/e2e/basic.spec.ts` exercising compile + diagram flow.
9. **CI integration**
   - Update CI workflow to run `pnpm test`, `pnpm test:coverage`, `pnpm test:e2e` (Playwright can run in headed=false mode with `CI=1`).
   - Cache Playwright browsers and pnpm store for faster runs.
   - Fail the pipeline on coverage regressions (set `coverage.thresholds` in Vitest).
10. **Document manual playbook**
    - Capture manual steps (audio routing, popup flow, hardware checks) in `docs/manual-testing.md` linked from this strategy.
    - Reference them in release checklist templates.

## Implementation Roadmap
1. Add Vitest configuration with jsdom, tsconfig path support, and setup files for BrowserFS, WebAudio mocks, and `msw`.
2. Land initial unit suites for `utils.ts` and `Recorder.ts` to validate the harness and establish patterns.
3. Introduce integration fixtures for `FileManager` and `RecorderController`, refactoring `index.ts` utilities into injectable modules where needed.
4. Automate build-time smoke tests with Playwright using mocked Faust endpoints; cache fixtures to keep runs fast.
5. Document manual test scripts covering audio device verification, popup flows, and end-to-end export checks, keeping them in sync with release checklists.
