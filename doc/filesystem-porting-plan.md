# Filesystem porting plan — operational, step-by-step

This is the **execution companion** to [`doc/filesystem-plan.md`](filesystem-plan.md)
(the *what/why*). Here is the *how*: the exact order of commits, the files to add,
the markpage code to lift, the tests to write, the docs to update, and the risks
to evaluate at each step — so the work can be driven (by a contributor or an AI
agent) one green commit at a time under [`AGENTS.md`](../AGENTS.md).

**Read `filesystem-plan.md` first.** This file assumes its vocabulary (Root /
Volume / Mount / Document / Origin / Perimeter), its invariants (I1–I6), its
phase numbering (P1–P9), and its reuse map (§5b). Section numbers like *(plan
§5b)* refer back to it.

## How to drive this plan

- **One concern per commit, each commit green.** A step lists 1–3 commits; never
  bundle two. Conventional-commit messages (`feat(fs):`, `test(fs):`,
  `docs(fs):`, `refactor(fs):`). Body states the verification result (e.g.
  "Vitest 312/312, eslint clean, build OK").
- **The gate, every commit:** `npm test` (eslint + stylelint + the scoped
  `tsc --noEmit`, see 0.6) + `npm run test:unit` + `npm run build`; add
  `npm run dist && npm run test:e2e` when the step is browser-visible. Never claim
  a result you did not run (AGENTS).
- **Characterize before you change.** Before touching `FileManager`,
  `ProjectModel`, `ProjectFilesController`, or `ExportService`, confirm/extend
  their existing tests so behavior is pinned, *then* change.
- **Behavior stays invisible until wired.** P1–P3 add a parallel `src/runtime/fs/`
  layer with **no UI and no behavior change**. The user-visible switch happens at
  P4+ and stays additive (plan §4b "continuity guarantee").
- **Never break the contract surface:** the `window.faustEnv` shape and the
  `faust_editor_{version,params,dsp_params,dsp_table}` localStorage keys. New
  storage uses a **distinct** namespace (`faust:fs:*`, IndexedDB `faust-volumes`),
  so it cannot collide with the reserved keys.

---

## Step 0 — Pre-flight: de-risk the environment (do this first)

markpage is a **Vite / modern-TS / strict-ESLint** app; faustide is
**webpack + Babel / `target es2015` / airbnb-base ESLint**. The filesystem code is
portable, but four mechanical incompatibilities will bite on *every* ported file
if not settled up front. Resolve them once, here, on a throwaway spike branch,
before any product commit.

### 0.0 Modernization stance — adapt now, modernize in-stream

A fair question before starting: should faustide's toolchain be **modernized
first**, to look like markpage? Measured state of the repo:

- TypeScript **4.9.5** (2022) · ESLint **6.8.0** (2020, EOL) + airbnb-base **14**
  — the genuinely dated parts, and the source of the friction.
- webpack **5** and Vitest **4** — already modern. The stack is *hybrid*, not
  uniformly old.
- **No real type-check in the gate:** the build strips types via Babel; only
  ESLint sees a little typing. (`npm run` has no `tsc` step.)

**Decision: do not front-load a big-bang modernization as a prerequisite.** The
friction a broad modernization would remove is mostly **mechanical and already
scoped** (rewrite `for…of`, drop one generic, add test shims); the friction it
**can't** remove (jsdom lacks IndexedDB / WebCrypto / FS-Access) is
toolchain-independent — markpage shims them too. A whole-tree toolchain change
delivers **no user value**, lands a large diff right after the codebase stabilized
from the 12-phase refactor, and is exactly the scope-creep `AGENTS.md` warns
against. So we **adapt** the ported code to the current toolchain and **modernize
in-stream** — small green commits, the day a change pays for itself — never as a
speculative gate.

| Candidate | Port benefit | Standalone value | Cost / blast radius | Verdict |
| :-- | :-- | :-- | :-- | :-- |
| **Type-check gate (`tsc --noEmit`) scoped to `src/runtime/fs/`** | High (fs layer is type-heavy) | High (there is none today) | Low if scoped | **Do first** (0.6) |
| Test-harness shims (`fake-indexeddb` + WebCrypto) | High | Low | Low | **Do first** (0.4) |
| Bump TS 4.9 → 5.x | Med (keep markpage's modern type idioms) | Med | Med (new warnings; no tsc gate today so build is unaffected) | **Optional**, pairs with 0.6 |
| ESLint 6→9 / replace airbnb / lift the `for…of` ban | Med (kills R1) | Med (ESLint 6 is EOL) | **High** (airbnb is woven through; flat-config migration) | **Defer** — the `for await` disable costs 3 lines |
| `target es2015 → es2020` | Low (native async-iter, no downlevel) | Low | Low, but depends on browser targets | **Opportunistic** |
| webpack+Babel → Vite | ~Zero (fs code is bundler-agnostic) | Med (DX) | **Very high** (monaco plugin, workbox, code-split, e2e dist serving) | **No** |

> **Caveat that can flip this.** If there is an **independent** driver — converging
> faustide and markpage onto shared modules/tooling, or existing pain with
> webpack/ESLint-6 — then modernize, but as its **own** justified project with its
> own characterization and green steps, decided *independently* of this work. The
> trap is disguising it as a "porting prerequisite"; it is not one.

### 0.1 Spike (throwaway, not merged)

Port exactly two things into a scratch file and run the gate:

1. `gitBlobSha(bytes)` (from `github.ts`) — exercises `crypto.subtle` under jsdom.
2. one `for await (const h of dir.values())` listing loop — exercises the ESLint
   `for-of` ban and the async-iterator handle typing.

The spike answers: does `crypto.subtle` exist in the jsdom test env? does the
`for-of` disable policy hold? does `target es2015` accept the handle shims?
Capture the answers as a short "Resolved" note at the bottom of this file, then
delete the spike.

### 0.2 ESLint friction — the #1 porting risk

`.eslintrc.json` extends **airbnb-base**, which is materially stricter than
markpage's config. Confirmed offenders in the code we lift:

| Rule | Status here | Hits | Policy |
| :-- | :-- | :-- | :-- |
| `no-restricted-syntax` → **`ForOfStatement`** | **error** | `volumes.ts`, `volume-registry.ts`, `disk-link.ts`, `github*.ts`, `resource-mapping.ts`, `ui/volume-browser.ts` all use `for…of` / `for await…of` | Rewrite plain `for…of` to `Array.prototype` iteration (`map`/`filter`/`reduce`/`forEach`). For **`for await…of` over directory handles** (no array equivalent), add a one-line justified `// eslint-disable-next-line no-restricted-syntax` (AGENTS allows a justified disable). Collect handle entries into an array in one small helper so the disable appears **once per file**, not scattered. |
| `no-await-in-loop` | inherited **error** (airbnb) | bundle write loops, github-sync image loop | Prefer `Promise.all(map(...))` where order is irrelevant (markpage already does this in `commitChanges`); where order matters (write resources *before* the main file), keep the loop with a justified disable. |
| `import/no-cycle` | inherited **error** | `Volume` types ↔ adapters ↔ registry | Keep the `Volume`/`VolumeEntry` **types** in their own `Volume.ts` with no imports back to adapters (markpage's split already respects this). Registry imports adapters, adapters import types — a DAG. |
| `no-restricted-syntax` → `LabeledStatement`/`WithStatement` | error | none in our set | n/a |

Rules that are **off here** and so *reduce* friction: `no-plusplus`,
`no-bitwise` (base64 helpers are fine), `no-continue`, `no-underscore-dangle`,
`max-len`, `prefer-destructuring`, `@typescript-eslint/no-explicit-any`,
`no-use-before-define`. Do **not** rely on `any` regardless (AGENTS).

### 0.3 TypeScript / lib differences

- `tsconfig` is `target es2015`, `lib: es2015,dom,dom.iterable`. Drop markpage's
  TS-5.7 `Uint8Array<ArrayBuffer>` generic argument → plain `Uint8Array`. Keep the
  **interface shims** markpage already declares for async-iterable directory
  handles and FS-Access permission methods (they exist precisely because the DOM
  lib lacks them) — they port as-is.
- `crypto.randomUUID()` and `crypto.subtle` are runtime globals; typing is fine
  under `lib dom`. Availability in tests is a *harness* concern (0.4), not a TS one.
- Type-checking note: the gate runs **Babel/esbuild** (which strip types without
  checking) and **ESLint**; there is no `tsc --noEmit` step. Type errors therefore
  surface mainly through ESLint/`@typescript-eslint`. Keep types honest anyway;
  consider adding a `tsc --noEmit` check for the new `fs/` tree if drift appears.

### 0.4 Test-harness gaps to fill (one small setup commit)

`src/tests/setup.ts` provides jQuery, rAF, `URL.createObjectURL`, and Web-Audio
mocks — **not** IndexedDB, `crypto.subtle`, or File System Access. Before P3:

- **IndexedDB:** `fake-indexeddb` is already a devDependency. Add
  `import "fake-indexeddb/auto";` (in `setup.ts`, or per-test for isolation) and
  reset stores in `beforeEach`. Needed by `MountRegistry`, the disk-handle store,
  and the GitHub token store.
- **`crypto.subtle`:** jsdom does not implement WebCrypto. On Node 20
  `globalThis.crypto` (WebCrypto) exists; shim it into the jsdom `window` in
  `setup.ts` (`if (!window.crypto?.subtle) Object.assign(window, { crypto: require("node:crypto").webcrypto })`). Needed by `gitBlobSha` and any SHA-256.
- **File System Access:** **not available in jsdom and not shimmable meaningfully.**
  Unit tests cover only the **pure** parts (path resolution, bundle file-list
  computation, perimeter closure, listing/sort helpers, feature gating). The
  pick → write → read flows are **manual, Chromium-only** (plan §6 caveat) — record
  them in the `doc/refactor-plan.md` manual checklist; an agent must not claim to
  have tested them.

### 0.5 Module layout & namespacing (decide once)

- New code lands under `src/runtime/fs/` (DOM-free: `Volume.ts`, `LibraryVolume.ts`,
  `DiskVolume.ts`, `RepoVolume.ts`, `MountRegistry.ts`, `RemoteSync.ts`),
  `src/model/Perimeter.ts` (pure), `src/runtime/state/OriginState.ts`, and
  `src/ui/VolumeBrowserController.ts` (+ `.scss`). Respects AGENTS boundaries.
- Storage namespace: IndexedDB DBs `faust-volumes` (disk handles) and
  `faust-github` (token); localStorage `faust:fs:repos`. **Never** the reserved
  `faust_editor_*` keys. Persist handles via **structured clone** (IndexedDB),
  never JSON.

### 0.6 Type-check gate for the new code (`tsc --noEmit`)

The one modernization worth doing **before** porting (0.0): there is no real
type-check today, and the fs layer is the most type-heavy code in the repo
(directory handles, async iterators, byte buffers, the `Volume` discriminated
union). A scoped `tsc --noEmit` catches a whole class of port bugs that Babel and
ESLint silently pass.

**Keep it scoped to the new tree** so it does not surface latent issues across the
whole (currently un-type-checked) codebase — that would be its own project.

- Add `tsconfig.fs.json` extending the root config, narrowing `include` to the new
  modules:

  ```jsonc
  // tsconfig.fs.json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": { "noEmit": true, "skipLibCheck": true },
    "include": [
      "src/runtime/fs/**/*",
      "src/model/Perimeter.ts",
      "src/runtime/state/OriginState.ts",
      "src/ui/VolumeBrowserController.ts"
    ]
  }
  ```

- Add a script and fold it into the gate:

  ```jsonc
  // package.json scripts
  "type-check:fs": "tsc -p tsconfig.fs.json"
  // and add it to: "test": "run-s -s test-eslint test-stylelint type-check:fs"
  ```

- **TS-version note (0.0):** under TS **4.9** keep the §0.3 adaptations (drop the
  `Uint8Array<ArrayBuffer>` generic; keep the interface shims). If TS is bumped to
  5.x in the same hardening commit (optional), those modern idioms can be kept
  verbatim instead — decide once, record it in the "Resolved" note.
- Grow the `include` as each phase adds modules; the gate then type-checks the fs
  layer on every commit without touching the rest of the build.

**Definition of done for Step 0:** harness commit landed (IndexedDB + WebCrypto
shims, `setup.ts`); the scoped `tsc --noEmit` gate (`tsconfig.fs.json` +
`type-check:fs` in `npm test`) landed and green; ESLint `for…of` policy decided
and written here; modernization stance (0.0) recorded; spike deleted; the
"Resolved" note below filled in (crypto OK? for-of policy? TS bumped or adapted?).

---

## P1 — Volume interface + Library adapter (non-behavioral seam)

*Goal:* a typed, tested `Volume` layer that re-presents today's project, with **no
UI and no behavior change**. *(plan P1, §5b `volumes.ts`.)*

**Commit 1.1 — types + pure helpers.** `src/runtime/fs/Volume.ts`: `Volume`,
`VolumeEntry`, `VolumeState`, `VolumeKind`; lift `sortEntries` and
`childrenFromTree` (rewrite their `for…of` to `reduce`/`filter`). Rename markpage's
`isMarkdown` → `isNative` (`.dsp`/`.lib`).
- *Tests* `src/tests/Volume.test.ts`: `sortEntries` (folders-first, locale order);
  `childrenFromTree` (immediate children only, `''` root, nested path, blob vs
  tree). Pure → 100% coverage easy; raise the ratchet.
- *Docs:* add the module to `doc/refactor-plan.md` map; note the new test file in
  `doc/testing.md`.
- *Risk:* `import/no-cycle` — keep this file types+helpers only, no adapter import.

**Commit 1.2 — `LibraryVolume`.** `src/runtime/fs/LibraryVolume.ts`, backed by
`ProjectModel`/`ProjectPersistence` (not OPFS): `state()→'ready'`, `list('')` maps
project files to `VolumeEntry` (`isNative = .dsp|.lib`), `readText(path)`.
- *Tests* `LibraryVolume.test.ts` with the in-repo `MemoryFs` pattern (copy from
  `ProjectModel.test.ts`): listing, native flagging, audio files non-native,
  `readText` round-trips.
- *Decision #5 (plan §9):* v1 lists the **current single project's files**;
  multi-project Library is deferred (note it in the file header).
- *Gate:* eslint + unit + build. No e2e (no UI).

---

## P2 — Origin as session state (still invisible)

*Goal:* introduce `OriginState` without changing observable behavior. *(plan P2.)*

**Commit 2.1.** `src/runtime/state/OriginState.ts`: holds `{ volumeId, path } |
null`; `set/get/reset`; documents the **content-addressed** rule (origin lives in
session state, reset on Open/New) for the faustservice/`inline=` cases.
- *Tests:* `OriginState.test.ts` — set/get/reset; reset-on-new semantics.
- *Wiring (characterize first):* before editing `FileManager`, confirm
  `FileManager.test.ts` pins selection behavior. Add an **optional**
  `onOriginChange?` option that defaults to a no-op, set from `select()`; default
  path is byte-identical to today. Assert in a test that omitting the option
  leaves behavior unchanged.
- *Risk:* accidental behavior change in `FileManager` — mitigated by the
  default-noop option and the pinned characterization test.

---

## P3 — Mount registry (persistence, still invisible)

*Goal:* mount/unmount + persistence + `listVolumes()`. *(plan P3, §5b
`volume-registry.ts` — port near-verbatim.)*

**Commit 3.0 — harness (Step 0.4 if not already done).** Add `fake-indexeddb` +
`crypto.subtle` shims to `setup.ts`; one commit, all existing tests still green.

**Commit 3.1 — `MountRegistry`.** `src/runtime/fs/MountRegistry.ts`: port
`mountDisk`/`unmountDisk`/`loadDiskMounts` (IndexedDB `faust-volumes`/`disk`, with
the `isSameEntry` idempotency check and the `disk:<uuid>` id scheme), repo mounts
(localStorage `faust:fs:repos`), and `listVolumes()` (Library always; disk mounts;
repos only when a token is present — P8). Plus a pure guard
`canUnmount(volumeId, openOrigin)` for **I2** (forbid unmounting a volume with an
open document).
- *Tests* `MountRegistry.test.ts` (`import "fake-indexeddb/auto"`): mount returns
  an id; re-mounting the **same** handle (fake `isSameEntry`) reuses the id
  (idempotency); a second registry instance reading the same IDB sees the mount
  (**survives reload**); unmount removes it; repo mount/unmount via localStorage;
  `canUnmount` false when origin is on that volume. Assert handles are **not**
  JSON-stringified.
- *Risks:* jsdom IndexedDB quirks (use `fake-indexeddb`); structured-clone of the
  fake handle; ensure the `isSameEntry`-unsupported `catch` path is covered.
- *Gate:* unit + build. The "survives a real tab reload" e2e is deferred to P6
  (needs the mount UI).

---

## P4 — Unified browser, open mode, Library only

*Goal:* the modal that lists the root → Library tree. *(plan P4, §5b
`ui/volume-browser.ts`.)*

**Commit 4.1 — `VolumeBrowserController`.** Port the render/navigation logic from
`ui/volume-browser.ts` into `src/ui/VolumeBrowserController.ts` + `VolumeBrowser.scss`.
Re-skin the chrome to faustide's Bootstrap-modal idiom (decision #6: *port the
logic, re-skin the chrome*); replace `t()` i18n and `makeIcon` with faustide
strings/FontAwesome icons. Open mode only; `onOpen`/`onOpenDeviceFile` hooks;
breadcrumb; loading/empty/error; Esc + backdrop close. Add an **Open** button to
the `#filemanager` header (plan §4b.4) that launches it.
- *Tests (jsdom)* `VolumeBrowserController.test.ts`: root renders one row per
  volume (fake `Volume[]`); entering a volume lists its entries; breadcrumb
  navigation; Esc and backdrop close; loading→list and list-failed→error
  transitions (resolve/reject a fake `list()`; `await` microtasks).
- *Tests (e2e)* extend `tests/e2e/files.spec.ts`: clicking **Open** shows the
  modal, the Library row is present, navigation works, Esc closes. Drive overlay
  elements with `dispatchEvent("click")` per AGENTS e2e conventions.
- *Risks:* async render races in tests (flush promises); focus/Esc handling;
  Bootstrap modal stacking vs the existing share/export modals.

---

## P5 — Format-driven open + "Open a file…"

*Goal:* native opens in place, foreign copies in; one ungated "Open a file…".
*(plan P5/I4, §5b `disk-link.ts` `fsAccessAvailable`/`pickImportableFileHandle`.)*

**Commit 5.1 — routing (pure).** `isNativeFaustFile(name)` and the open-decision
helper (`'open-in-place' | 'import-copy'`) in `src/model/Perimeter.ts` or a small
`fileKinds.ts`. Unit-tested exhaustively (`.dsp`/`.lib` native; `.wav`/`.txt`/…
foreign; case-insensitive; no-extension).

**Commit 5.2 — wire it.** In `VolumeBrowserController` footer + `ProjectFilesController`:
"Open a file…" → `pickImportableFileHandle()` on Chromium (writable handle → may
open a single file **in place**), else the existing `<input type=file>` reader →
**copy** into the Library. **Do not gate** the button on `fsAccessAvailable()`.
- *Tests:* unit for routing; e2e — drive `<input>` with `setInputFiles`, assert a
  foreign file appears as a Library copy and a `.dsp` opens/selects. *Manual
  (Chromium):* in-place single-file open via the native picker.
- *Risks:* gating the button (regression for Safari/Firefox); writable-handle
  persistence for single files (defer if not needed); sanitization parity with
  `ProjectModel.sanitizeFileName`.

---

## P7 — Perimeter closure *(do before P6's bundle)*

*Goal:* compute the file set that travels with a `.dsp`. *(plan P7/I6 + §7, §5b
adapts `resource-mapping.ts`.)* Sequenced **before** P6's bundle so disk/zip share
one correct closure.

**Commit 7.1 — parser (pure).** `src/model/Perimeter.ts`:
- `maskFaustCode(src)` — adapt `opaqueCodeRanges`: mask `//` line comments,
  `/* */` block comments, and string literals **except** the import/soundfile
  argument, so refs inside comments/strings aren't collected.
- `extractFileRefs(src)` — match Faust's file-pulling primitives: `import("x.lib")`,
  `library("x.lib")`, `component("x.dsp")`, and `soundfile("name", n)`.
- `computeClosure(mainFile, readText, isProjectLocal)` — transitive over imports;
  **exclude** built-in stdfaust libs (resolved from the compiler's own dir), keep
  only project-local files; returns the unique file set.
- *Tests* `Perimeter.test.ts`: single import; nested/transitive imports; cycle
  safety; ref inside a `//` comment / `/* */` / string is ignored; missing file is
  reported not thrown; soundfile + audio file; stdfaust excluded; duplicates
  collapsed. This is the highest-value pure test surface — aim high, raise the
  ratchet.

**Commit 7.2 — route exports through it (characterize first).** Pin current
behavior of `ExportService.buildProjectZip` and `ProjectFilesController.saveZip`
with a golden test, then switch both (and the future disk bundle) to
`computeClosure`, updating the goldens to the tighter set **with a one-line
justification** in the test.
- *Risks:* Faust import semantics (which primitives actually pull a file; relative
  vs library-path resolution); over/under-collection changing export contents — the
  golden-test characterization makes the change reviewable; soundfile URL vs
  filename mapping; `declare` statements are not imports.

---

## P6 — Disk volume + Save As (Chromium; manual-verified)

*Goal:* mount a real folder; edit in place; Save As `(volume, folder, name)`.
*(plan P6/I5, §5b `volumes.ts DiskVolume`, `disk-link.ts`, `volume-registry
mountDisk`.)* **Executes after P7** — the bundle writer (6.2) needs
`computeClosure` from P7.

**Commit 6.1 — `DiskVolume` adapter.** Port `DiskVolume` (`list`/`readText`/`state`/
`requestPermission`/`fileHandle`/`createFileHandle`) and the `disk-link.ts`
helpers (`fsAccessAvailable`, `pickDirectory`, `ensureRwPermission`,
**`queryRwGranted`**, handle persistence, `saveSyncedMtime`/`loadSyncedMtime`).
Drop the `Uint8Array<ArrayBuffer>` generics; keep the handle shims.
- *Tests:* pure parts only — the `dirAt`/path-segment logic and `state()` mapping
  against a **fake** directory handle (hand-rolled object implementing
  `getDirectoryHandle`/`getFileHandle`/`values`/`queryPermission`). FS-Access I/O is
  **manual**.

**Commit 6.2 — bundle writer/reader (uses P7).** Re-skin `writeBundleToDir`/
`readBundleFromDir` from `content.md`+`assets/<sha>.<ext>` to a **Faust perimeter
written under real filenames** (`main.dsp` + its `.lib`s + soundfiles), computed by
`computeClosure`. **Write order:** resources first, main `.dsp` **last**, so an
external reader never sees a main referencing a not-yet-written lib (poor-man's
atomicity — there is no disk transaction).
- *Tests:* `bundleFileList(content, closure)` is pure → unit-tested; the write
  itself is manual.

**Commit 6.3 — Save As + mount UI.** Browser **save mode** (name field + "Save
here"); footer **"Mount a disk folder…"** (Chromium only — absent elsewhere, with
a one-line hint); on save, write the bundle, persist the handle (`mountDisk`),
record synced mtime, set origin. Implement the **needs-permission** re-grant: a
lapsed Disk volume shows "needs permission" and re-authorizes on the click (the
gesture); the (future) poller only `queryRwGranted` silently.
- *Tests (e2e):* the "Mount a disk folder…" button is **absent** when
  `showDirectoryPicker` is undefined (stub it off) and present when stubbed on.
  *Manual (Chromium):* create in Library → Save As to a folder → verify files in
  Finder/Explorer; reload → re-grant flow; external edit → next save sees the new
  mtime.
- *Risks:* permission lifecycle (the #1 UX risk — model `needs-permission`
  explicitly); write atomicity (mitigated by write-order); filename collisions in
  the target folder (prompt/overwrite policy); large soundfiles.

---

## P8 — Remote repo + sync engine *(optional / advanced)*

*Goal:* a versioned origin with loss-free conflicts. *(plan P8/I6, §5b `github.ts`
+ `github-sync.ts` — port near-verbatim, swap the perimeter.)* Pick up **only** if
a remote story is wanted (decision #2).

**Commit 8.1 — git client.** Port `github.ts` (REST + Git Data API; `gitBlobSha`
on **raw bytes**; token in IndexedDB `faust-github`). Drop `Uint8Array<ArrayBuffer>`
generics.
- *Tests:* mock `globalThis.fetch` (`vi.stubGlobal` or msw); cover read, blob
  fallback, `getTreeRecursive`, blob/tree/commit/ref writes, `updateRef` 422→false,
  and **`gitBlobSha` on non-ASCII** (the `"é"` = 1 char / 2 bytes case — a
  regression test that fails if hashing the string instead of bytes).

**Commit 8.2 — sync engine.** Port `github-sync.ts`: `saveToGithub` 2×2 machine
(No-op/Reload/Fast-forward/**Fork**), the **422-retry that re-evaluates**, fork-path
hash-lengthening; swap markpage's image perimeter (`extractExternalRefs`/
`resolveRepoPath`) for P7's `computeClosure`.
- *Tests:* drive each 2×2 cell by mocking the git layer's head/tree/blob shas:
  noop (L=B,R=B), reload (L=B,R≠B), fast-forward (L≠B,R=B), fork (L≠B,R≠B), plus a
  422→retry→re-evaluate path and idempotent re-fork. Pure logic, fully unit-testable.

**Commit 8.3 — RepoVolume + UI + polling.** Adapter + repo mounts + "Add a
repository…" + origin/diverged indicators + poll sha on focus/interval (no
file-watching).
- *Risks (evaluate carefully):* **token security** — a browser-held PAT
  (IndexedDB *or* localStorage) is XSS-exposed; require a **fine-grained,
  single-repo, short-lived** token and say so in the UI. CORS (api.github.com is
  CORS-enabled). Rate limits. **Truncated** recursive trees on big repos. Branch
  absent. Verbatim/non-ASCII (covered by 8.1). *Manual:* two tabs editing one
  origin → divergence must produce a fork, never an overwrite.

---

## P9 — Trash (soft delete)

*Goal:* delete becomes restorable. *(plan P9, §5b the trash UX already in
`ui/volume-browser.ts`.)*

**Commit 9.1 — model (characterize first).** `ProjectModel.deleteFile` currently
hard-`unlink`s, and `FileManager`'s "delete last file recreates default" is pinned
by an e2e test — confirm it, then change. Add a **Trash subtree** in BrowserFS;
soft-delete (move), `restore`, `purge`, `emptyTrash`. `LibraryVolume.list` surfaces
a virtual Trash folder when non-empty (mirror markpage's `TRASH_DIR`).
- *Tests:* unit — soft-delete then restore round-trips; purge removes; name
  collision on restore is handled; the "recreate default on empty project" behavior
  is preserved.

**Commit 9.2 — UI.** Wire `onDelete`/`onRestore`/`onPurge`/`onEmptyTrash` in the
browser (Library, open mode) and route the file-manager `×` to soft-delete.
- *Tests (e2e):* delete a file → it leaves the list and appears under Trash →
  restore brings it back; empty-trash purges.
- *Risks:* changing a long-standing destructive behavior — the characterization
  test is the guard; Trash storage growth (offer empty-trash).

---

## Consolidated risk register

| # | Risk | Phase | Likelihood | Impact | Mitigation |
| :-- | :-- | :-- | :-- | :-- | :-- |
| R1 | ESLint `for-of` ban forces rewrites; `for await` needs justified disables | All ports | High | Low–Med | Settle policy in Step 0.2; one disable per file for handle iteration |
| R2 | jsdom lacks IndexedDB / `crypto.subtle` / FS-Access | P3,P6,P8 | High | Med | `fake-indexeddb` + WebCrypto shim in `setup.ts`; FS-Access stays manual |
| R3 | Disk RW permission lapses after reload; silent poller must not prompt | P6 | High | Med | Explicit `needs-permission` state; `queryRwGranted` (query-only) vs click re-grant |
| R4 | Perimeter over/under-collection changes export contents | P7 | Med | Med | Golden characterization test before the switch; exhaustive parser tests |
| R5 | Behavior regression in `FileManager`/`ProjectModel`/export while wiring | P2,P5,P7,P9 | Med | High | Characterize-first; default-noop options; minimal diffs |
| R6 | `import/no-cycle` between volume types/adapters/registry | P1,P3 | Med | Low | Types-only `Volume.ts`; adapters→types, registry→adapters DAG |
| R7 | PAT stored in the browser is XSS-exposed | P8 | Med | High | Fine-grained single-repo short-lived token; document the exposure |
| R8 | Disk write non-atomic (partial bundle) | P6 | Low | Med | Write resources first, main `.dsp` last |
| R9 | Coverage ratchet drops as DOM/manual code is added uncovered | All | Med | Low | Keep logic pure & tested; raise floors on gains; the manual FS-Access I/O is thin |
| R10 | Multi-project Library scope creep (decision #5) | P1,P4,P9 | Med | Med | v1 single-project; defer multi-project behind the same `Volume` API |
| R11 | TS lib mismatch (`Uint8Array<ArrayBuffer>`, async-iter types) | All ports | High | Low | Drop the generic arg; keep markpage's interface shims |

---

## Test strategy (layered, per AGENTS)

- **Unit (Vitest/jsdom)** — the bulk. Pure modules get near-total coverage:
  `Volume` helpers, `LibraryVolume`, `OriginState`, `MountRegistry` (with
  `fake-indexeddb`), `Perimeter`, the open-routing helper, `github.ts` /
  `github-sync.ts` (fetch mocked), `DiskVolume` path logic (fake handle).
- **New fakes/helpers to add** under `src/tests/helpers/`: a `FakeDirectoryHandle`
  /`FakeFileHandle` (implements `getDirectoryHandle`/`getFileHandle`/`values`/
  `createWritable`/`queryPermission`) for Disk path-logic tests; reuse the existing
  `MemoryFs` (copy from `ProjectModel.test.ts`) for Library. Document them in
  `doc/testing.md`.
- **E2E (Playwright vs built `dist/`)** — only the browser-visible, non-picker
  parts: the volume-browser modal (open/navigate/Esc), `<input>` import as a Library
  copy, Trash delete→restore, and the Chromium-gating of "Mount a disk folder…"
  (stub `showDirectoryPicker` on/off). Reuse `openApp`/`runDsp`/`setEditorCode`.
- **Manual (Chromium, human)** — every File-System-Access pick→write→read flow:
  Save As to a folder, reload re-grant, external-edit mtime, two-tab git divergence.
  Add each to the manual checklist in `doc/refactor-plan.md`; an agent must not
  claim to have run them.
- **Coverage ratchet** — each phase adds tests and **raises** the `vitest.config.ts`
  floors on the gains; never lower them to pass (AGENTS). Pure FS modules should
  push statements/lines up, offsetting the thin manual-only DOM glue.

---

## Documentation cadence (update *with* the code, never "later")

Every commit that changes structure or status updates docs in the **same** diff:

- `doc/refactor-plan.md` — add each new module to the implementation map; add the
  filesystem phases to the phase-status table with Done/In-progress/Deferred; keep
  the test counts current; **append manual FS-Access checks** to its manual
  checklist as P5/P6/P8 land.
- `doc/testing.md` — register new test files, the `FakeDirectoryHandle` helper, the
  `fake-indexeddb`/WebCrypto setup additions, and any new e2e spec pattern.
- `doc/filesystem-plan.md` — when an **open decision** (§9) is resolved, record the
  choice inline (e.g. decision #1 BrowserFS-kept, #2 git-in/out, #5 single vs
  multi-project, #6 modal chrome). Keep §5b accurate if a lifted module is renamed.
- This file — fill the Step 0 "Resolved" note; tick the per-phase DoD; adjust
  sequencing if reality diverges (say why).
- Commit trailer for AI-assisted work: `Co-Authored-By: Claude Opus 4.8
  <noreply@anthropic.com>` (AGENTS).

---

## Global acceptance — invariants as the final gate

The work is "done" (for the shipped slice) when each invariant is demonstrably
true, with the evidence noted:

- **I1 one Open** — a single browser lists volumes; no separate import command
  (P4/P5). *e2e + manual.*
- **I2 mount persisted, no orphan** — mounts survive reload; unmount blocked with
  an open doc (P3/P6). *unit (`canUnmount`) + manual reload.*
- **I3 single origin, edit in place** — Save rewrites the origin; content-addressed
  origin resets on Open/New (P2/P6). *unit + manual.*
- **I4 open by format** — native in place, foreign copied; "Open a file…" ungated
  (P5). *unit + e2e (`<input>`) + manual (Chromium in-place).*
- **I5 Save = (volume, path)** — Save As picks a target; "link" is just saving
  elsewhere (P6). *manual.*
- **I6 no data loss** — verbatim bytes, closed perimeter, divergence→fork never
  overwrite (P7/P8). *unit (state machine, `gitBlobSha` non-ASCII, perimeter) +
  manual (two-tab fork).*

A phase that cannot show its invariant evidence is not done — re-open it rather
than claim it.

---

## Resolved (Step 0) — filled after the spike (2026-06-26)

- **`crypto.subtle` in jsdom:** ✅ — Node 22 exposes `globalThis.crypto`
  (WebCrypto); shimming it into `window` in a `beforeAll` in `setup.ts` makes
  `gitBlobSha` and SHA-256 runnable in unit tests. `gitBlobSha("hello")` matches
  the expected git SHA-1. Non-ASCII `"é"` encodes to 2 UTF-8 bytes as expected.
- **`for…of` policy:** ✅ — Airbnb `no-restricted-syntax` bans `ForOfStatement`
  as an error. Policy: rewrite sync `for…of` to array methods (`map`/`filter`/
  `forEach`/`reduce`). For `for await…of` over directory handles (no equivalent),
  add one justified `// eslint-disable-next-line no-restricted-syntax` per file.
- **TypeScript:** ✅ — **kept at 4.9.5** (no bump). The only adaptation needed
  per §0.3: drop `Uint8Array<ArrayBuffer>` generic argument when it appears in
  lifted code (use plain `Uint8Array`). markpage's interface shims for async-iter
  directory handles port as-is.
- **Type-check gate:** ✅ — `tsconfig.fs.json` added; `type-check:fs` script
  wired into `npm test`. Scoped `include`: `src/runtime/fs/**/*`,
  `src/model/Perimeter.ts`, `src/runtime/state/OriginState.ts`,
  `src/ui/VolumeBrowserController.ts`, `src/tests/helpers/FakeDirectoryHandle.ts`.
  Grows with each phase.
- **Harness:** ✅ — `fake-indexeddb/auto` + WebCrypto shim added to `setup.ts`.
  Extra finding: `fake-indexeddb`'s `deleteDatabase` hangs in jsdom; workaround
  is to reset by patching `window.indexedDB = new IDBFactory()` in `beforeEach`.
  All 288 pre-existing tests still pass; 56 new tests added through P3.

## References

- [`doc/filesystem-plan.md`](filesystem-plan.md) — the design (what/why), §5b reuse
  map, §9 open decisions.
- markpage source `/Users/letz/Developpements/markpage/src` — the code to lift.
- [`doc/refactor-plan.md`](refactor-plan.md) · [`doc/testing.md`](testing.md) ·
  [`AGENTS.md`](../AGENTS.md).
