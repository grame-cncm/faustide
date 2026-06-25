# Testing

The project has two distinct levels of tests, with three styles within the first level.

---

## Level 1 — Unit / integration tests (`src/tests/`) — Vitest + jsdom

These 68 files run in Node.js with a simulated DOM (jsdom). They cover three styles:

### a) Pure logic tests

No external dependency, no mocks required. Verify mathematical functions or data transformations.

**Examples:** `FrequencyScale.test.ts`, `ProjectModel.test.ts`, `utils.test.ts`

```
indexToFrequency(256, 512, 48000) → 12000 Hz ✓
logarithmicPositionToFrequency(0.5, 100, 10000) ≈ 1000 Hz ✓
```

### b) Tests with Web Audio API mocks

Classes that depend on `AudioContext`, `AudioWorklet`, `faustwasm`, etc. receive injected doubles via `vi.mock()`. Observable behaviour is asserted (audio graph built, methods called) without touching a real browser.

**Examples:** `AudioEngine.test.ts`, `DspRunner.test.ts`, `MeterNode.test.ts`

`src/tests/setup.ts` installs shared global mocks (`MockAudioContext`, `URL.createObjectURL`, `requestAnimationFrame`) before every test file.

### c) DOM controller tests

UI controllers are tested by injecting a real jsdom DOM. The test creates the required HTML elements, invokes the controller, then asserts DOM mutations.

**Examples:** `AlertController.test.ts`, `DspCompileController.test.ts`, `ScopeDrawLoop.test.ts`

Helpers in `src/tests/helpers/` provide reusable doubles:

| Helper | Provided double |
|---|---|
| `canvasContext.ts` | Spy-capable `CanvasRenderingContext2D` |
| `audioAnalyser.ts` | `AnalyserNode` + `ChannelSplitterNode` |
| `animationFrame.ts` | Manual `requestAnimationFrame` tick control |
| `scopeDom.ts` | Pre-mounted DOM containers for scope tests |

`src/tests/stubs/monaco-editor.ts` replaces the browser-only Monaco package with an empty stub so modules that import it statically remain unit-testable.

---

## Level 2 — E2E tests (`tests/e2e/`) — Playwright

These tests run the compiled app in a real Chromium browser. They are the **only layer that exercises the full integration**: Faust WebAssembly compiler, real Web Audio, real DOM.

| File | What it verifies |
|---|---|
| `app-smoke.spec.ts` | App boots, Monaco loads, FileManager initialises |
| `dsp.spec.ts` | Faust compilation → active DSP node in the audio graph |
| `audio-graph.spec.ts` | Audio routing (input/output connections) |
| `diagram.spec.ts` | Faust SVG diagram generation |
| `examples.spec.ts` | Loading and running bundled examples |
| `export.spec.ts` | Export to the Faust Service platform |
| `scopes.spec.ts` | Oscilloscope and spectrum analyser views |
| `panels.spec.ts` | Panel resize behaviour |
| `files.spec.ts` | File manager operations (add, rename, delete) |
| `midi.spec.ts` | MIDI input wiring |
| `plot.spec.ts` | Plot panel rendering |
| `recorder.spec.ts` | Audio recorder workflow |
| `settings.spec.ts` | Settings panel persistence |

`tests/e2e/helpers.ts` intercepts the network (`faustservice.inria.fr`) so tests remain deterministic without external dependencies.

---

## Summary

```
┌─────────────────────────────────────────────────────────┐
│  E2E (Playwright)  — real browser, real WASM            │
│  Verifies: complete user flows                          │
├─────────────────────────────────────────────────────────┤
│  Controller tests (Vitest + jsdom)                      │
│  Verifies: UI logic, DOM mutations, interactions        │
├─────────────────────────────────────────────────────────┤
│  Mock-based tests (Vitest + vi.mock)                    │
│  Verifies: orchestration, audio graph, DSP compilation  │
├─────────────────────────────────────────────────────────┤
│  Pure tests (Vitest)                                    │
│  Verifies: algorithms, maths, data transformations      │
└─────────────────────────────────────────────────────────┘
```

## Coverage gaps

Files at 0% or low coverage require the E2E level to be exercised — `index.ts`, `FaustEditorFactory.ts`, `BootstrapLoaders.ts` — they are out of reach for jsdom by design, as they depend on a real browser environment (AudioWorklet, full DOM lifecycle, network asset loading).

Coverage thresholds are configured in `vitest.config.ts` as anti-regression floors (currently statements ≥ 73%, branches ≥ 58%, functions ≥ 72%, lines ≥ 76%). They sit just below the current measured values so the suite cannot silently backslide; raise them whenever coverage improves.
