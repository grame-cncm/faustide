# Index.ts Refactor Plan

Date: 2025-10-29

## Current Situation
`src/index.ts` has become the monolithic entry point that owns:
- DOM bootstrap & dependency loading (Monaco, BrowserFS, JSZip, Faust WASM).
- Global environment management (`faustEnv`, `audioEnv`, `uiEnv`, etc.).
- Event wiring for every UI control across the IDE.
- Runtime logic for compilation, audio graph management, exports, sharing, etc.

The file is difficult to reason about, hard to unit-test, and makes incremental changes risky.

## Refactor Objectives
1. **Improve separation of concerns** by splitting UI wiring, runtime orchestration, and service logic into well-defined modules/classes.
2. **Enable targeted testing** (unit, integration, and Playwright) on smaller modules.
3. **Preserve existing functionality** while structuring the code for future features.

## Proposed Architecture

### Core Modules

| Module | Responsibility | Key Types/Methods |
|--------|----------------|-------------------|
| `bootstrap/appBootstrap.ts` | Startup sequence (DOM ready, async imports, dependency preloading). | `runApp()`, `loadDependencies()` |
| `environment/FaustEnvironment.ts` | Owns `faustEnv` shape, exposes typed access to sub-envs. | `FaustEnvironment`, `AudioEnv`, `UIEnv`, `CompileOptions` |
| `services/CompilationService.ts` | Compiles DSP, handles run/diagram exceptions. | `compileSource(code)`, `updateDiagram(code)` |
| `services/ExportService.ts` | Share/export logic (currently `runtime/exportService.ts`). | `submitExport(opts)`, `makeShareUrl(opts)` |
| `services/AudioGraphService.ts` | AudioCtx init, graph updates, MIDI routing. | `initAudioCtx()`, `connectGraph()`, `toggleDAC()` |
| `ui/controls/*` | Self-contained event wiring modules (FileManager, Recorder, Plot, Settings). | `registerFileManagerHandlers(env)`, etc. |
| `ui/modals/*` | Modal-specific controllers (Share, Settings, Export). | `ShareModalController`, `SettingsModalController` |
| `ui/examples/ExamplesMenu.ts` | Handles examples dropdown population/loading. | `initExamplesMenu(env)` |

### Entry Point (`src/index.ts`)
- Will be reduced to:
  1. `import { runApp } from "./bootstrap/appBootstrap";`
  2. `runApp();`

### Testing Integration

#### Unit / Vitest
- Each service (CompilationService, ExportService, AudioGraphService) exposes pure or mockable methods.
- Add targeted unit tests under `tests/unit/services/*`.
- Use existing setup (`tests/setup/vitest.setup.ts`) to stub WebAudio, indexedDB, fetch, etc.

#### Playwright
- Settings modal, share modal, export flows remain covered.
- New modules should expose hooks (e.g., `env.getService`) so Playwright can assert state without digging into DOM internals.
- Continue marking complex flows (examples dropdown, drag resize) as `test.fixme` until deterministic.

#### Integration (jsdom)
- For UI controllers (FileManager, SettingsModalController), add jsdom-based integration tests in `tests/integration/ui/*`.
- Reuse `stubFaustRoutes` helper concept inside integration tests by mocking network calls and BrowserFS operations.

## Refactor Milestones
1. **Environment Extraction**:
   - Create `environment/FaustEnvironment.ts`.
   - Move type definitions & init logic from `index.ts`.
   - Replace global `faustEnv` mutation with `FaustEnvironment` instance.
   - Update unit tests referencing compile options.

2. **Service Layer**:
   - Migrate compile/export/audio helpers into dedicated classes.
   - Inject services into controllers (constructor injection).
   - Update Vitest suites to target new service methods.

3. **UI Controllers**:
   - File manager, share modal, settings modal, recorder controller modules already exist; align init pattern (`register(env)`).
   - Extract remaining inline event handlers into modules under `src/ui`.
   - Ensure each module exports a default `init(env, services)` method.

4. **Bootstrap Simplification**:
   - New `appBootstrap.ts` wires dependencies, instantiates environment + services, initializes UI modules.
   - `index.ts` becomes a thin runner.

5. **Testing Updates**:
   - Add/adjust unit tests per module.
   - Convert existing Playwright tests to target new selectors if needed.
   - Update `docs/testing-implementation-step-XX.md` with refactor milestone & test coverage.

## Testing Infrastructure Usage
- **Unit Tests**: Use Vitest + jsdom + MSW; check services and controllers via dependency injection. For example, `CompilationService` tests can stub `FaustCompiler`.
- **Integration Tests**: Keep jsdom-based tests to cover DOM controllers without a browser; e.g., `SettingsModalController` can be tested with minimal DOM markup.
- **Playwright**: Continue to exercise end-to-end flows. Refactor should make tests more stable by reducing global side-effects. Document any new selectors or hooks in `docs/testing-strategy.md`.

## Next Steps
1. Align team on module naming & folder structure.
2. Create `environment` & `services` folders with scaffolding.
3. Incrementally move logic from `index.ts`, ensuring tests stay green after each step.
4. Keep documentation (refactor plan + testing strategy) up to date per milestone.

