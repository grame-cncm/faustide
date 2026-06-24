# TypeScript runtime refactor plan and final status

This document records the `src/index.ts` refactor plan and the current post-refactor status. The core rule for the work was: add characterization tests first, then move code in small reversible steps.

## Current status

- `src/index.ts` is now a composition root of roughly 320 lines. It loads browser-only dependencies, creates stores/services/controllers/views, wires callbacks, runs startup, and exposes compatibility globals.
- Runtime behavior formerly embedded in `index.ts` has been moved into model, runtime service, and UI controller modules.
- `src/FileManager.ts` delegates project/file decision rules to `src/model/ProjectModel.ts` while preserving the public API used by controllers.
- Runtime types are explicit in `src/runtime/types.ts`; the old hidden global type coupling has been removed for the refactored runtime surface.
- The remaining dense code in `index.ts` is deliberate wiring: cross-controller callback bridges, late-bound controller references, browser globals such as `navigator.mediaDevices`, and compatibility exposure.
- The remaining work is manual validation and normal maintenance, not another large extraction pass.

## Target architecture

The final shape keeps `src/index.ts` as a composition root:

- load CSS and browser-only libraries;
- instantiate Faust WASM, BrowserFS, Monaco, stores, services, controllers, and views;
- keep `window.faustEnv` only as a compatibility bridge;
- call `initialize()` methods.

The runtime is split into:

- model: project files, selected file, main DSP file, compile options, DSP parameter state;
- stores: localStorage settings, BrowserFS project persistence, Faust compiler factory cache;
- services: audio context/graph, DSP compilation, diagram generation, export/share URL generation, device enumeration;
- views/controllers: file manager DOM, settings controls, plot controls, MIDI controls, recorder controls, audio input/output controls, panels, diagram gestures, DSP iframe/popup messaging.

## Implementation map

The refactor split the original runtime responsibilities as follows.

| Responsibility | Main modules |
|----------------|--------------|
| Explicit runtime shape | `src/runtime/types.ts`, `src/runtime/EditorRuntimeEnvironment.ts`, `src/runtime/CompileOptionsFactory.ts` |
| Settings and persistence | `src/runtime/EditorSettingsStore.ts`, `src/runtime/ProjectPersistence.ts` |
| Project/file rules | `src/model/ProjectModel.ts`, `src/FileManager.ts`, `src/ui/ProjectRuntimeController.ts`, `src/ui/ProjectFilesController.ts` |
| Faust runtime loading | `src/runtime/BootstrapLoaders.ts`, `src/runtime/FaustCompatibilityGlobals.ts` |
| Audio graph and DSP execution | `src/runtime/AudioEngine.ts`, `src/runtime/DspRunner.ts`, `src/ui/BrowserAudioEngineBindings.ts` |
| Diagram generation and interaction | `src/runtime/DiagramService.ts`, `src/ui/DiagramController.ts`, `src/ui/DiagramView.ts` |
| Export and sharing | `src/runtime/ExportService.ts`, `src/runtime/ShareUrlService.ts`, `src/ui/ExportController.ts`, `src/ui/ShareModalController.ts`, `src/ui/UrlParamsController.ts` |
| UI controls | `src/ui/SettingsPanelController.ts`, `src/ui/PlotController.ts`, `src/ui/MidiController.ts`, `src/ui/AudioInputController.ts`, `src/ui/AudioOutputController.ts`, `src/ui/AudioDeviceController.ts`, `src/ui/RecorderController.ts`, `src/ui/DspControlsController.ts`, `src/ui/FaustUiController.ts` |
| Layout and startup | `src/ui/PanelToggleView.ts`, `src/ui/ResizablePanelsController.ts`, `src/ui/GlobalShortcutsController.ts`, `src/ui/TooltipController.ts`, `src/ui/ApplicationStartupController.ts`, `src/ui/StartupControlsController.ts` |

## Phase status

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: test harness | Done | Vitest/jsdom setup and Playwright e2e are in place. |
| Phase 2: independent module tests | Done | Utilities, keyboard MIDI, recorder, and related modules are covered. |
| Phase 3: DOM component characterization | Done | File manager behavior is covered with fake filesystem tests. |
| Phase 4: browser smoke tests | Done and expanded | Playwright now covers smoke flows plus examples, DSP, panels, plot, scopes, settings, MIDI, files, export, and diagrams. |
| Phase 5: explicit runtime types | Done | Runtime types live in `src/runtime/types.ts`. |
| Phase 6: project model extraction | Done | `ProjectModel` owns file/project decision rules. |
| Phase 7: persistence extraction | Done | Settings and BrowserFS/Faust FS synchronization are isolated. |
| Phase 8: runtime service extraction | Done | Diagram, audio graph, DSP running, export, and share URL behavior are service-backed. |
| Phase 9: UI controller extraction | Done | The planned controllers/views are extracted and named consistently, including `ExampleLoaderController`. |
| Phase 10: shrink `src/index.ts` | Done for code structure | `index.ts` is a composition root. Remaining work is manual validation. |
| Phase 11: scope rendering factorization | In progress | Characterization tests cover `StaticScope` and `Scope`; shared mode metadata and canvas background drawing are extracted. |

## Test strategy (as implemented)

The plan above is driven by characterization testing: behavior is locked down with tests before any code is moved. The realized test setup is a three-layer pyramid, each layer wired to its own npm script.

| Layer | Tool | Script | Scope |
|-------|------|--------|-------|
| Lint / style | ESLint + Stylelint | `npm test` (`test-eslint`, `test-stylelint`) | static quality gate |
| Unit / jsdom integration | Vitest | `npm run test:unit` (`:watch`, `test:coverage`) | 50 files, 217 tests at the latest Phase 11 pass |
| Browser end-to-end | Playwright | `npm run test:e2e` | 62 tests against the built `dist/` at the last documentation pass |

### Unit and integration layer (Vitest)

- Config in `vitest.config.ts`: `jsdom` environment, `restoreMocks: true`, test files matched by `src/**/*.test.ts`, global setup file `src/tests/setup.ts`.
- `src/tests/setup.ts` builds the browser environment jsdom does not provide:
  - jQuery injected into `window` and `globalThis`;
  - `requestAnimationFrame` / `cancelAnimationFrame` and `URL.createObjectURL` / `URL.revokeObjectURL` polyfills;
  - Web Audio mocks (`MockAudioContext`, `MockGainNode`, `MockAudioNode`);
  - DOM (`document.body.innerHTML`) and `localStorage` reset in `beforeEach`.
- Tests live in `src/tests/` and cover each module extracted from the monolith: controllers (`DspCompileController`, `MidiController`, `ExportController`, etc.), services (`DiagramService`, `ShareUrlService`, `ExportService`), models (`ProjectModel`, `ProjectPersistence`), and utilities (`utils`, `Key2Midi`, `Recorder`).
- Mocking approach: prefer `vi.mock` over network mocking. For example `DspRunner.test.ts` replaces `@grame/faustwasm` with small factory doubles and asserts only the audio-graph effects. MSW is used in only a few tests (`AudioEngine`, `DspRunner`, `Recorder`). For the file system, use an in-memory fake FS implementing the `TFileSystem` contract rather than real BrowserFS.

### End-to-end layer (Playwright)

- Config in `playwright.config.ts`: a minimal static server (`tests/e2e/serve-dist.cjs`) serves the built `dist/` on `http://127.0.0.1:4173`, so e2e exercises the production artifact, not the source.
- `tests/e2e/app-smoke.spec.ts` validates high-level behavior that jsdom cannot cover reliably: app load plus `window.faustEnv` exposure, default `untitled.dsp` project, Monaco editing updating the selected file, deleting the last file recreating the default DSP, export targets populated from a mocked `faustservice.inria.fr/targets` route, and the share URL containing name/voices/autorun/inline code.
- Additional e2e specs cover real example compilation, DSP replacement, diagram navigation and zoom, plot/scopes, panels, settings, MIDI, file manager behavior, and export modal wiring.
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
- `FaustUiController`;
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

## Phase 11: factor `StaticScope.ts` and `Scope.ts`

Goal: make analyser and plot rendering maintainable without changing visual or interaction behavior.

Current risks:

- `src/StaticScope.ts` is a large mixed module: data-mode rendering, oscilloscope rendering, interleaved rendering, spectroscope rendering, spectrogram cache rendering, grid/event/stat overlays, mode UI, zoom state, pointer interactions, and requestAnimationFrame scheduling live together.
- `src/Scope.ts` mixes real-time analyser node reads, channel/FFT controls, canvas drawing, spectrogram cache updates, zoom, pause/disable state, and DOM construction.
- Existing tests mostly cover `AnalyserScopeController` wiring. They do not directly characterize the rendering helpers, DOM controls, zoom math, analyser polling, or mode transitions.
- Canvas output is visual, so tests should assert deterministic drawing calls and state transitions rather than fragile pixel-perfect full-canvas snapshots.

Current Phase 11 progress:

- Phase 11.1 through Phase 11.5 are implemented with Vitest characterization coverage for canvas/DOM helpers, `StaticScope`, and `Scope`.
- Phase 11.6 has started with `src/scope/ScopeModes.ts` and `src/scope/CanvasDrawing.ts`; public static wrapper methods still delegate to the extracted helpers for compatibility.
- The latest validation pass ran `npm run test:unit`, `npm run build`, and `npm run test:e2e` after the `Scope` instance characterization; subsequent 11.6 extraction commits ran unit tests and build.

### Phase 11.1: canvas and DOM test harness

Add reusable test helpers before moving code:

- `src/tests/helpers/canvasContext.ts`
  - fake `CanvasRenderingContext2D` with spies for `save`, `restore`, `beginPath`, `moveTo`, `lineTo`, `stroke`, `fill`, `fillRect`, `clearRect`, `drawImage`, `fillText`, `putImageData`, `getImageData`, `createImageData`;
  - fake `canvas` dimensions and `getBoundingClientRect`;
  - mutable drawing properties such as `fillStyle`, `strokeStyle`, `font`, `lineWidth`, `globalCompositeOperation`.
- `src/tests/helpers/scopeDom.ts`
  - factory for a scope container with `.scope-controller`, `.scope-canvas`, and optional pre-existing children;
  - helper to install deterministic `HTMLCanvasElement.prototype.getContext`;
  - helper to make `offsetParent` visible or hidden.
- `src/tests/helpers/audioAnalyser.ts`
  - fake `AnalyserNode` implementing `fftSize`, `frequencyBinCount`, `minDecibels`, `maxDecibels`, `getFloatFrequencyData`, `getFloatTimeDomainData`, and `getByteTimeDomainData`;
  - fake `ChannelSplitterNode` with connect/disconnect spies.
- `src/tests/helpers/animationFrame.ts`
  - deterministic `requestAnimationFrame` / `cancelAnimationFrame` queue so scope draw loops can be stepped manually.

Validation:

```sh
npm run test:unit
```

### Phase 11.2: characterize `StaticScope` pure helpers

Add `src/tests/StaticScopeRendering.test.ts` before extraction.

Cover mode metadata:

- `getIconClassName` returns the current Font Awesome classes for all `EScopeMode` values;
- `getModeName` returns the current display labels for all `EScopeMode` values.

Cover shared drawing primitives:

- `drawBackground` fills the full canvas in black;
- `drawStats` draws the stats panel, zoom labels, sample label, frequency label, RMS label, and respects optional min/max labels;
- `drawEvent` groups simultaneous event payloads at the same x position and draws stable labels;
- `drawGrid` draws expected grid lines for time-domain modes;
- `drawGrid` draws expected frequency labels for linear and logarithmic spectroscope/spectrogram modes.

Cover data rendering:

- `fillDivData` renders sample rows for single and multi-channel data;
- `fillDivData` includes event markers at the expected sample or buffer positions;
- `fillDivData` clears stale rows when called with shorter data.

Cover time-domain rendering:

- `drawOscilloscope` uses the stabilization/zero-crossing window when frequency estimation is present;
- `drawOscilloscope` falls back to full-buffer drawing when the period is not finite;
- `drawInterleaved` separates channels into horizontal lanes;
- both time-domain renderers group min/max values when many samples map to the same x pixel;
- cursor stats identify the expected sample/channel/value.

Cover frequency-domain rendering:

- `drawSpectroscope` draws one filled spectrum per channel in linear mode;
- `drawSpectroscope` maps logarithmic cursor position to frequency and dB stats;
- `drawSpectrogram` renders the wrapped cache split when the visible source range crosses the cache end;
- `drawSpectrogram` renders a contiguous cache range when no wrap is needed;
- `drawOfflineSpectrogram` initializes/resizes the cache canvas to the expected frame count;
- `drawOfflineSpectrogram` returns an unchanged last-sample index when no new frames are available;
- `drawOfflineSpectrogram` draws expected columns for linear and logarithmic frequency scales.

Validation:

```sh
npm run test:unit
npm run build
```

### Phase 11.3: characterize `StaticScope` instance behavior

Add `src/tests/StaticScope.test.ts` before extraction.

Cover construction:

- creates missing controller and canvas DOM when the container is empty;
- reuses existing `.scope-controller` and `.scope-canvas` when provided;
- creates the offscreen spectrogram cache canvas;
- initializes the default mode, frequency scale, zoom, vertical zoom, cursor, and draw data.

Cover mode controls:

- mode button cycles Data -> Interleaved -> Oscilloscope -> Spectroscope -> Spectrogram when spectrogram drawing is enabled;
- Spectrogram is skipped when `drawSpectrogram` is false;
- Data mode is skipped during continuous drawing;
- mode setter updates icon, label, container classes, visibility of data/canvas surfaces, and triggers redraw.

Cover frequency-scale controls:

- frequency scale toggle switches linear/logarithmic modes;
- switching scale resets spectrogram cache state and redraws;
- toggle is visible only for frequency-domain modes.

Cover zoom and cursor:

- wheel zoom clamps to the mode-specific zoom range;
- wheel panning clamps `zoomOffset` between 0 and the maximum allowed offset;
- vertical zoom updates only the active mode;
- double-click or equivalent reset path restores zoom and offset defaults;
- mouse/touch move updates cursor and redraws outside Data mode;
- mouse leave clears cursor and redraws.

Cover draw scheduling:

- `draw(data)` stores new data, marks new spectrogram data, and schedules exactly one animation frame;
- repeated `draw()` calls before the frame do not schedule duplicate frames;
- draw callback chooses `fillDivData`, `drawInterleaved`, `drawOscilloscope`, `drawSpectroscope`, or `drawSpectrogram` according to current mode;
- continuous mode does not draw when the canvas is hidden;
- changing data shape resets the spectrogram cache index.

Validation:

```sh
npm run test:unit
npm run build
npm run test:e2e
```

Run Playwright because plot and scope UI are browser-visible.

### Phase 11.4: characterize `Scope` pure helpers

Add `src/tests/ScopeRendering.test.ts` before extraction.

Cover:

- `drawBackground` and `drawGrid` call the expected canvas primitives;
- `drawStats` renders sample, frequency, RMS, zoom, min, and max labels;
- `getIconClassName` returns stable icons for Oscilloscope, Spectroscope, and Spectrogram;
- `drawOscilloscope` computes the zero-crossing start and draws the expected visible window;
- `drawOscilloscope` falls back when estimated frequency is invalid;
- `drawSpectroscope` draws a filled spectrum using the current zoom window;
- `drawOfflineSpectrogram` writes one cache column and advances through frequency bins deterministically;
- `drawSpectrogram` draws a wrapped cache range and a non-wrapped cache range.

Validation:

```sh
npm run test:unit
npm run build
```

### Phase 11.5: characterize `Scope` instance behavior

Add `src/tests/Scope.test.ts` before extraction.

Cover construction:

- creates or reuses controller/canvas children;
- initializes analyser buffers from `fftSize` and `frequencyBinCount`;
- pauses by default when `window.AudioWorklet` is unavailable;
- respects explicit `paused` option.

Cover analyser polling and rendering:

- visible, running scopes read frequency and time-domain analyser data every third frame;
- byte time-domain fallback is used when `getFloatTimeDomainData` is unavailable;
- oscilloscope mode calls `drawOscilloscope` and `drawStats`;
- spectroscope mode calls `drawSpectroscope` and `drawStats`;
- spectrogram mode updates the offline cache, calls `drawSpectrogram`, and draws stats;
- hidden scopes skip analyser reads and rendering;
- disabled scopes do not schedule active drawing.

Cover controls:

- mode button cycles through available modes and respects `drawSpectrogram`;
- FFT-size button cycles through `Scope.sizes`, updates analyser `fftSize`, and reallocates buffers;
- channel button cycles through channels and reconnects the splitter in the documented order;
- pause toggle switches between active draw loop and pause loop;
- wheel zoom updates `zoom` and `zoomOffset` with clamping.

Validation:

```sh
npm run test:unit
npm run build
npm run test:e2e
```

Run Playwright because analyser scopes are browser-visible.

### Phase 11.6: extract shared rendering primitives

After the tests above are green, move low-risk helpers first:

- create `src/scope/CanvasDrawing.ts`
  - `drawBackground`;
  - common grid line helpers;
  - stats panel helpers;
  - text label helpers.
- create `src/scope/ScopeModes.ts`
  - mode enums and display/icon metadata for `Scope` and `StaticScope`;
  - keep exported aliases if existing imports need compatibility.
- create `src/scope/FrequencyScale.ts`
  - linear/logarithmic frequency mapping;
  - index/frequency conversion;
  - clamp helpers for zoom windows.

Migration rules:

- move one helper group per commit;
- keep old static methods as delegating wrappers until all callers are migrated;
- avoid changing numeric constants or labels in the same commit as a move;
- keep tests green after each move.

Validation after each commit:

```sh
npm run test:unit
npm run build
```

### Phase 11.7: extract `StaticScope` renderers

Split rendering by mode while keeping `StaticScope` as the public widget:

- `src/scope/static/DataTableRenderer.ts`
  - data table rendering and event row placement.
- `src/scope/static/TimeDomainRenderer.ts`
  - oscilloscope/interleaved windowing, stabilization, min/max grouping, cursor stats.
- `src/scope/static/FrequencyRenderer.ts`
  - spectroscope linear/logarithmic drawing and cursor stats.
- `src/scope/static/SpectrogramRenderer.ts`
  - offline cache update, wrapped cache drawing, linear/logarithmic bin rendering.
- `src/scope/static/StaticScopeInteractions.ts`
  - cursor, wheel zoom, drag/pan, mouse/touch event normalization.
- `src/scope/static/StaticScopeControls.ts`
  - DOM control creation, mode button, scale button, label/icon updates.

Migration rules:

- keep `StaticScope.drawOscilloscope`, `StaticScope.drawInterleaved`, `StaticScope.drawSpectroscope`, `StaticScope.drawSpectrogram`, `StaticScope.drawOfflineSpectrogram`, and `StaticScope.fillDivData` as compatibility wrappers at first;
- move instance event handlers only after renderer extraction is complete;
- remove wrappers only if no external imports use them, otherwise keep them documented as compatibility API.

Validation after each renderer extraction:

```sh
npm run test:unit
npm run build
```

Run:

```sh
npm run test:e2e
```

after `SpectrogramRenderer`, `StaticScopeInteractions`, and `StaticScopeControls`.

### Phase 11.8: extract `Scope` real-time analyser widget

Split real-time analyser concerns while keeping `Scope` as the public widget:

- `src/scope/realtime/RealtimeScopeRenderer.ts`
  - oscilloscope, spectroscope, spectrogram rendering wrappers around shared drawing helpers.
- `src/scope/realtime/RealtimeScopeControls.ts`
  - DOM control creation, icon updates, FFT-size button, channel button, pause button.
- `src/scope/realtime/AnalyserFrameReader.ts`
  - reads float/byte time-domain data and frequency data from `AnalyserNode`;
  - owns buffer allocation when `fftSize` changes.
- `src/scope/realtime/ScopeChannelRouter.ts`
  - channel cycling and splitter reconnect/disconnect order.
- `src/scope/realtime/ScopeDrawLoop.ts`
  - requestAnimationFrame scheduling, every-third-frame throttling, hidden/disabled/paused handling.

Migration rules:

- keep constructor behavior and public properties stable while extracting;
- prefer injected collaborators in tests, but keep default collaborators wired in `Scope`;
- preserve the Chrome graph ordering comment around splitter/analyser reconnects.

Validation after each extraction:

```sh
npm run test:unit
npm run build
```

Run:

```sh
npm run test:e2e
```

after `AnalyserFrameReader`, `ScopeChannelRouter`, and `ScopeDrawLoop`.

### Phase 11.9: final cleanup and manual validation

After both widgets are split:

- remove duplicate constants between `Scope` and `StaticScope`;
- ensure public exported types are documented;
- ensure wrapper methods either have tests or are removed with a compatibility note;
- update this document's phase status from Planned to Done;
- run the full automated suite.

Final automated validation:

```sh
npm run test:unit
npm run build
npm run test:e2e
```

Manual validation specific to scopes:

- run a DSP and verify input/output analyser canvases render;
- cycle oscilloscope, spectroscope, and spectrogram modes;
- change FFT size and channel on multi-output DSPs;
- verify pause/disable behavior for output scope before and after running a DSP;
- run offline plot and verify Data, Interleaved, Oscilloscope, Spectroscope, and Spectrogram modes;
- test wheel zoom, drag pan, cursor stats, and frequency scale switching;
- verify spectrogram cache behavior after changing plot data shape and frequency scale;
- verify narrow and wide layouts do not break scope controls.

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

## Maintenance notes

- Keep `src/index.ts` as a composition root. New behavior should generally live in a model, runtime service, controller, or view, with `index.ts` only constructing and wiring it.
- Prefer explicit dependencies over importing browser globals inside runtime services. Browser-specific DOM adapters belong in `src/ui/` or a small bootstrap module.
- Add or update a unit test for each extracted module before moving behavior. Add Playwright coverage when the behavior is browser-visible or depends on the built bundle.
- Run `npm run test:unit` and `npm run build` before every refactor commit. Run `npm run test:e2e` after changes that touch bootstrap, examples, files, audio, DSP compilation, diagram, export/share URL, panels, or startup sequencing.
- The last known automated validation during the final documentation pass was `npm run test:unit` and `npm run build` passing, with the previous Phase 10 pass also running `npm run test:e2e` successfully over 62 tests.

## Commit strategy

The refactor used one commit per testable phase or extraction target. Keep that pattern for future cleanup:

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
