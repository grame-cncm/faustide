# Working in this repository (agent guide)

Faust IDE web (`fausteditorweb`): a browser TypeScript app bundled with webpack.
The runtime was refactored from a monolithic `src/index.ts` into layered
modules. This guide tells an LLM agent how to make changes here: how to test,
how to validate, and how to document. Read it before editing.

The single most important rule, applied throughout this codebase:

> **Characterize first, then change in small reversible steps.** Add or confirm
> a test that pins current behavior *before* moving or rewriting code, keep the
> suite green at every step, and prefer behavior-preserving changes.

## Architecture (where code goes)

`src/index.ts` is a **composition root only**: it loads browser dependencies,
constructs stores/services/controllers/views, wires them, runs startup, and
exposes the `window.faustEnv` compatibility bridge. Do not add behavior here.

New behavior belongs in one of:

- **model** (`src/model/`) — pure project/file decision rules (`ProjectModel`).
- **runtime services** (`src/runtime/`) — DOM-free logic: audio graph
  (`AudioEngine`), DSP run (`DspRunner`), diagram/export/share
  (`DiagramService`, `ExportService`, `ShareUrlService`), settings/persistence
  (`EditorSettingsStore`, `ProjectPersistence`), explicit types (`types.ts`),
  owned state (`state/AudioGraphState`, `state/ScopeState`), the action seam
  (`RuntimeActions`).
- **controllers/views** (`src/ui/`) — DOM binding; may use jQuery/selectors,
  but should call services/models rather than own runtime state.

Rules:

- Inject dependencies explicitly through an options object; do not import
  browser globals inside runtime services.
- Services must be DOM-free and jQuery-free; keep DOM in `src/ui/`.
- Mutable audio/scope state is owned by `AudioGraphState`/`ScopeState`
  (they wrap the same `FaustEditor*Env` record). Mutate that state through
  their methods, not by writing env fields directly.
- **Preserve the `window.faustEnv` shape and the `localStorage` keys**
  (`faust_editor_version|params|dsp_params|dsp_table`) — the e2e suite and
  returning users depend on them.

`doc/refactor-plan.md` is the living architecture + phase document. Consult it
for the module map and the current phase status; update it when you change
structure (see Documentation below).

## Test setup (three-layer pyramid)

| Layer | Command | What it covers |
|-------|---------|----------------|
| Lint / style | `npm test` | ESLint (`test-eslint`) + Stylelint (`test-stylelint`) |
| Unit / jsdom | `npm run test:unit` (`:watch`, `test:coverage`) | `src/**/*.test.ts` |
| Browser e2e | `npm run test:e2e` | Playwright against the built `dist/` |

### Unit / integration (Vitest, jsdom)

- Config: `vitest.config.ts` (`jsdom`, `restoreMocks: true`, setup
  `src/tests/setup.ts` which provides jQuery, rAF, `URL.createObjectURL`, Web
  Audio mocks, and resets DOM/`localStorage`).
- Tests live in `src/tests/*.test.ts`, one per module.
- Mock with `vi.mock` (e.g. replace `@grame/faustwasm` with small factory
  doubles); reserve MSW for the few cases that need it. Use an in-memory fake FS
  implementing the `TFileSystem` contract, not real BrowserFS.
- **Coverage is a ratchet, not a target.** `vitest.config.ts` sets global
  thresholds just below current coverage so the suite cannot silently regress.
  When you add tested code, the floor may be raised — never lower it to pass.

### Browser e2e (Playwright)

- Config: `playwright.config.ts` serves the built `dist/` via
  `tests/e2e/serve-dist.cjs` on `127.0.0.1:4173`, so **e2e runs the production
  bundle** — run `npm run dist` (or `build`) before/with it.
- Shared helpers in `tests/e2e/helpers.ts` (`openApp`, `runDsp`,
  `setEditorCode`, `mockFaustService`). Reuse them; don't duplicate.
- Mock external Faust service calls with `page.route`.
- Conventions that keep e2e reliable:
  - assert via `expect.poll` / web-first assertions; avoid fixed `waitForTimeout`
    except when sampling a genuinely time-based signal;
  - drive hidden/overlay elements with `locator.dispatchEvent("click")` rather
    than forcing visibility;
  - read app state through `window.faustEnv` in `page.evaluate`;
  - for audio, **measure signal** (e.g. read `analyserOutput` energy, or decode
    the recorded WAV and check frequency/RMS) instead of trying to hear it.
- What e2e cannot cover stays in the manual checklist in
  `doc/refactor-plan.md`: real speakers/mic, output-device selection, popups,
  production Faust export. Flag these for the human.

## Validation (run before every commit)

Minimum gate for any change:

```sh
npm run test:unit
npm run build
```

Also run e2e when the change touches bootstrap, examples, files, audio, DSP
compilation, diagram, export/share URL, panels, scopes, recording, or startup
ordering — i.e. anything browser-visible or bundle-dependent:

```sh
npm run dist
npm run test:e2e
```

CI (`.github/workflows/ci.yml`) runs the full gate on push/PR — ESLint, Vitest
**with coverage thresholds**, build, and Playwright — on **Node 20**
(Vitest 4 / rolldown needs `node:util` `styleText`, absent on Node 18). Keep CI
green.

Note: **Stylelint currently fails** on the SCSS sources (the config is not
SCSS-aware); it runs **non-blocking** in CI. Don't treat its failure as a
regression you caused, and don't disable other lint to "fix" it.

## Documentation

- **Code:** TSDoc-style comments. Each module gets a file/class-level `/**`
  header: a one-line summary plus a short paragraph on the module's *role in the
  runtime* (its boundary and what it deliberately does not do). Document public
  methods (and non-obvious private ones) with a summary and `@param`/`@returns`.
  Match the surrounding density and idiom.
- **Architecture/process:** update `doc/refactor-plan.md` when you change
  structure or finish a planned step — keep the phase status table, the
  "current status" notes, and the test-strategy counts (file/test totals)
  accurate. When you defer or skip a sub-step, say why.
- Write `doc/refactor-plan.md` and journal-style entries in **English**.

## Commits

- One commit per testable unit (a characterization pass, one extraction, one
  state group, one fix). Keep each commit green (`test:unit` + `build`, plus
  `test:e2e` when relevant).
- Conventional-commit style: `type(scope): summary` (e.g. `refactor(state):`,
  `fix(recorder):`, `test(e2e):`, `docs(refactor-plan):`). Body explains the
  *why* and states the verification result (e.g. "Vitest 243/243, Playwright
  68/68").
- End commit messages with:

  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
- Branch for changes; do not commit to the default branch. Commit/push only when
  asked.

## Quick reference

```sh
npm run serve          # luvi dev server on :8000 (manual listening/QA)
npm run build          # webpack dev build -> dist/
npm run dist           # prebuild (examples index) + production build
npm run test           # lint (eslint + stylelint)
npm run test:unit      # vitest (jsdom)
npm run test:coverage  # vitest + coverage thresholds
npm run test:e2e       # playwright against dist/
```
