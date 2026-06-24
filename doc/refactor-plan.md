# Refactoring plan for the TypeScript runtime

This plan targets the current `src/index.ts` runtime while preserving the existing behavior. The core rule is: add characterization tests first, then move code in small reversible steps.

## Current state

- `src/index.ts` is the application composition root, but it also contains most runtime logic: bootstrap, persistence, project loading, DSP compilation, audio graph wiring, export, MIDI, recorder controls, plot controls, panel layout, diagram interactions, and global event handlers.
- `src/FileManager.ts` mixes project/file state with DOM rendering and DOM event handlers.
- `src/Recorder.ts`, `src/Key2Midi.ts`, and `src/utils.ts` are already mostly independent and are good first test targets.
- `src/Analyser.ts`, `src/Scope.ts`, `src/StaticScope.ts`, and `src/MeterNode.ts` are UI/audio-adjacent and should be covered after the base test harness works.
- `src/types.d.ts` currently defines `FaustEditorCompileOptions` globally. Runtime types should be made explicit modules before deeper extraction.

## Target architecture

The final shape should keep `src/index.ts` as a small composition root:

- load CSS and browser-only libraries;
- instantiate Faust WASM, BrowserFS, Monaco, stores, services, controllers, and views;
- keep `window.faustEnv` only as a compatibility bridge;
- call `initialize()` methods.

The runtime should be split into:

- model: project files, selected file, main DSP file, compile options, DSP parameter state;
- stores: localStorage settings, BrowserFS project persistence, Faust compiler factory cache;
- services: audio context/graph, DSP compilation, diagram generation, export/share URL generation, device enumeration;
- views/controllers: file manager DOM, settings controls, plot controls, MIDI controls, recorder controls, audio input/output controls, panels, diagram gestures, DSP iframe/popup messaging.

## Test strategy (as implemented)

The plan above is driven by characterization testing: behavior is locked down with tests before any code is moved. The realized test setup is a three-layer pyramid, each layer wired to its own npm script.

| Layer | Tool | Script | Scope |
|-------|------|--------|-------|
| Lint / style | ESLint + Stylelint | `npm test` (`test-eslint`, `test-stylelint`) | static quality gate |
| Unit / jsdom integration | Vitest | `npm run test:unit` (`:watch`, `test:coverage`) | ~42 files, ~168 `it()` blocks |
| Browser end-to-end | Playwright | `npm run test:e2e` | smoke tests against the built `dist/` |

### Unit and integration layer (Vitest)

- Config in `vitest.config.ts`: `jsdom` environment, `restoreMocks: true`, test files matched by `src/**/*.test.ts`, global setup file `src/tests/setup.ts`.
- `src/tests/setup.ts` builds the browser environment jsdom does not provide:
  - jQuery injected into `window` and `globalThis`;
  - `requestAnimationFrame` / `cancelAnimationFrame` and `URL.createObjectURL` / `URL.revokeObjectURL` polyfills;
  - Web Audio mocks (`MockAudioContext`, `MockGainNode`, `MockAudioNode`);
  - DOM (`document.body.innerHTML`) and `localStorage` reset in `beforeEach`.
- Tests live in `src/tests/` and cover each module extracted from the monolith: controllers (`DspCompileController`, `MidiController`, `ExportController`, …), services (`DiagramService`, `ShareUrlService`, `ExportService`), models (`ProjectModel`, `ProjectPersistence`), and utilities (`utils`, `Key2Midi`, `Recorder`).
- Mocking approach: prefer `vi.mock` over network mocking. For example `DspRunner.test.ts` replaces `@grame/faustwasm` with small factory doubles and asserts only the audio-graph effects. MSW is used in only a few tests (`AudioEngine`, `DspRunner`, `Recorder`). For the file system, use an in-memory fake FS implementing the `TFileSystem` contract rather than real BrowserFS.

### End-to-end layer (Playwright)

- Config in `playwright.config.ts`: a minimal static server (`tests/e2e/serve-dist.cjs`) serves the built `dist/` on `http://127.0.0.1:4173`, so e2e exercises the production artifact, not the source.
- `tests/e2e/app-smoke.spec.ts` validates high-level behavior that jsdom cannot cover reliably: app load + `window.faustEnv` exposure, default `untitled.dsp` project, Monaco editing updating the selected file, deleting the last file recreating the default DSP, export targets populated from a mocked `faustservice.inria.fr/targets` route, and the share URL containing name/voices/autorun/inline code.
- External Faust service requests are mocked via `page.route`. Real audio hardware, popup blockers, and production Faust service export stay in the manual checklist.

## Phase 1: test harness before refactoring

Goal: make behavior observable before moving code.

1. Add `vitest.config.ts` with `jsdom`.
2. Add `src/tests/setup.ts` for browser globals:
   - `localStorage`;
   - `requestAnimationFrame` and `cancelAnimationFrame`;
   - `URL.createObjectURL` and `URL.revokeObjectURL`;
   - basic Web Audio mocks where needed;
   - jQuery setup for jsdom.
3. Keep Playwright for browser-level smoke tests.
4. Add package scripts only if the existing scripts do not already cover the new config.

Validation:

```sh
npm run test:unit
npm run build
```

## Phase 2: characterization tests for independent modules

Goal: lock down behavior that is already separated from `index.ts`.

Add unit tests for:

- `src/utils.ts`
  - `mod` with positive and negative values;
  - `wrap`;
  - `sliceWrap`;
  - `setWrap`;
  - `getRms`;
  - `safeStorage` when `localStorage` works and when it throws.
- `src/Key2Midi.ts`
  - note on/off;
  - repeated keydown does not retrigger;
  - octave up/down flushes active notes;
  - velocity up/down clamps;
  - disabled mode emits nothing.
- `src/Recorder.ts`
  - disabled recorder does not append;
  - continuous buffer indices append;
  - discontinuous indices reset;
  - `totalSec` uses sample rate, buffer count, and buffer size;
  - multi-channel data is passed to the WAV encoder.

Validation:

```sh
npm run test:unit
```

## Phase 3: characterization tests for DOM components

Goal: protect the current DOM-visible behavior before extracting models.

Add jsdom integration tests for `src/FileManager.ts`:

- creates `untitled.dsp` when the FS is empty;
- selects the default file;
- creates unique `untitledN.dsp` names;
- sanitizes file names on rename/new file;
- does not select audio files as editable code files;
- updates the main DSP file only for non-audio files;
- deleting the last file recreates the default DSP;
- calls `selectHandler`, `saveHandler`, `deleteHandler`, and `mainFileChangeHandler` with current behavior.

Use a small in-memory fake FS that implements the current `TFileSystem` contract. Do not use real BrowserFS for these tests unless a behavior specifically depends on it.

Validation:

```sh
npm run test:unit
```

## Phase 4: browser smoke tests

Goal: preserve high-level behavior that jsdom cannot cover reliably.

Add or expand Playwright tests for:

- app loads and exposes `window.faustEnv`;
- default project appears in the file manager;
- editing Monaco updates the selected file;
- deleting the last file recreates the default DSP;
- Faust service target discovery is populated with mocked `/targets`;
- share URL contains current name, voices, autorun, and inline code.

Keep real audio hardware, popup blockers, and production Faust service export as manual validation.

Validation:

```sh
npm run build
npm run test:e2e
```

## Phase 5: explicit runtime types

Goal: remove hidden global type coupling.

Create `src/runtime/types.ts` and move or export:

- `FaustEditorEnv`;
- `FaustEditorAudioEnv`;
- `FaustEditorMIDIEnv`;
- `FaustEditorUIEnv`;
- `FaustExportTargets`;
- `LegacyWaveSurferBackend`;
- `FaustEditorCompileOptions`, replacing the global declaration if practical.

Update imports without changing behavior.

Validation:

```sh
npm run test:unit
npm run build
```

## Phase 6: project model extraction

Goal: separate file/project decisions from DOM rendering.

Create `src/model/ProjectModel.ts` with behavior currently embedded in `FileManager`:

- file list;
- selected file;
- main DSP file;
- filename sanitization;
- unique fallback names;
- audio-file detection;
- default DSP creation;
- file create, rename, delete, select, set-main rules.

Then refactor `FileManager` to render the model and emit model operations. Keep its public API initially unchanged so `index.ts` does not move at the same time.

Validation:

```sh
npm run test:unit
npm run build
npm run test:e2e
```

## Phase 7: persistence extraction

Goal: isolate storage from UI and runtime orchestration.

Create:

- `src/runtime/EditorSettingsStore.ts`
  - `loadCompileOptions`;
  - `saveCompileOptions`;
  - `loadDspParams`;
  - `saveDspParams`;
  - `loadDspFactoryCache`;
  - `saveDspFactoryCache`.
- `src/runtime/ProjectPersistence.ts`
  - BrowserFS to LibFaust FS synchronization;
  - save/delete file persistence;
  - clear project when `saveCode` is disabled.

Keep storage keys exactly the same:

- `faust_editor_version`;
- `faust_editor_params`;
- `faust_editor_dsp_params`;
- `faust_editor_dsp_table`.

Validation:

```sh
npm run test:unit
npm run build
```

## Phase 8: runtime service extraction

Goal: remove non-UI behavior from `index.ts`.

Extract in this order:

1. `DiagramService`
   - Faust SVG generation;
   - error line parsing;
   - returns data and errors instead of directly touching Monaco/DOM.
2. `AudioEngine`
   - `AudioContext` creation/resume;
   - gain/meter/splitter/analyser graph;
   - input source cache;
   - destination setup.
3. `DspRunner`
   - mono/poly generator selection;
   - soundfile loading;
   - node replacement;
   - parameter restore;
   - input/output connection flags.
4. `ExportService`
   - `/targets`;
   - ZIP construction;
   - `filepost`;
   - `precompile`;
   - returned download URL and QR payload.
5. `ShareUrlService`
   - encode/decode share URL options.

Each service should receive dependencies explicitly. Avoid direct use of jQuery inside services.

Validation after each service:

```sh
npm run test:unit
npm run build
```

Run Playwright after `DspRunner`, `ExportService`, and `ShareUrlService`.

## Phase 9: UI controller extraction

Goal: keep DOM manipulation in focused controllers.

Extract controllers with narrow dependencies:

- `SettingsPanelController`;
- `PlotController`;
- `MidiController`;
- `AudioInputController`;
- `AudioOutputController`;
- `RecorderController`;
- `DspUiController`;
- `DiagramView`;
- `PanelToggleView`;
- `ResizablePanelsController`;
- `ExampleLoaderController`;
- `GlobalShortcutsController`.

Controllers may use jQuery and DOM selectors. They should call services/models rather than own runtime state.

Validation:

```sh
npm run test:unit
npm run build
npm run test:e2e
```

## Phase 10: shrink `src/index.ts`

Goal: make `src/index.ts` a composition root.

After the previous phases, `index.ts` should only:

- load browser-only dependencies;
- create the model, stores, services, and controllers;
- wire callbacks;
- initialize the runtime;
- expose compatibility globals.

No new behavior should be introduced in this phase. It should be mostly deletion and wiring.

Validation:

```sh
npm run test:unit
npm run build
npm run test:e2e
```

Then run the manual checklist.

## Manual validation checklist

Run these manually after phases touching audio, DSP, export, or cross-window messaging:

- compile and run the default DSP;
- switch ScriptProcessor/AudioWorklet mode where available;
- test audio input from microphone and sample player;
- test output toggle and output device selection;
- record audio and download WAV;
- open DSP UI popup and verify parameter sync both ways;
- use keyboard MIDI and a real MIDI input when available;
- drag/drop a source audio file;
- generate a diagram, zoom, pan, and follow SVG links;
- export via the production Faust service;
- verify layout on narrow and wide windows.

## Commit strategy

Use one commit per testable phase. For larger phases, split by extraction target:

1. test harness;
2. independent module tests;
3. FileManager characterization tests;
4. Playwright smoke coverage;
5. runtime types;
6. ProjectModel extraction;
7. persistence extraction;
8. each runtime service;
9. each UI controller group;
10. final `index.ts` cleanup.

Each commit should keep:

```sh
npm run test:unit
npm run build
```

green, and should run Playwright when browser-visible behavior changes.
