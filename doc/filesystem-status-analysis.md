# Filesystem status analysis — mounted origin, delete, restore, reload

This document is a **characterization** (not a plan, not an implementation) of how
a file's *status* — in particular whether it is tracked back to a mounted disk
folder — behaves across its lifecycle: create, open from a volume, soft-delete to
the trash, restore, and page reload.

It exists to make the current behavior and its gaps explicit before any further
change, per [`AGENTS.md`](../AGENTS.md): characterize first. Companion documents:
[`doc/filesystem-plan.md`](filesystem-plan.md) (the *what/why* of the target
model) and [`doc/filesystem-porting-plan.md`](filesystem-porting-plan.md) (the
commit-by-commit *how*).

> Scope: the **status / delete / restore / reload** axis only. It does not
> re-describe the volume browser, Save-As, or permission flows except where they
> bear on file status.

---

## 1. The five storage layers

A file's state is spread across five backing stores — two **transient** (rebuilt
from scratch on every page load) and three **durable** — plus the DOM as the
visible projection. Most of the subtle behavior below comes from this split.

| Layer | Durable? | Holds | Rebuilt on reload from |
|---|---|---|---|
| **faustFS** (`libFaust.fs()`) | ❌ transient | project files `${DIR}<name>` **and the trash** `${DIR}__trash__/<name>` | populated by `loadProject` |
| **browserFS** (ZenFS / IndexedDB) | ✅ durable | project files only, **flat** root `/<name>` (no trash, no sub-dirs) | — |
| **localStorage** `faust:fs:origins` | ✅ durable | `Map<name, {volumeId, path}>` — disk origins | — |
| **IndexedDB** `faust-volumes` | ✅ durable | mounted directory handles | — |
| **`DiskOriginTracker.origins`** | ❌ transient (in-memory) | active origins → drives write-back | partially from localStorage at startup |
| **DOM** `filemanager-file--disk` | ❌ (view) | the green "mounted" indicator | re-applied by the startup wiring |

**Key fact:** the trash lives **only inside faustFS**
([`ProjectModel.ts:150`](../src/model/ProjectModel.ts#L150)), while
[`loadProject`](../src/runtime/ProjectPersistence.ts#L38) reads only the **flat
root** of browserFS and never writes the trash there.

### A file's "mounted" status is two coupled facts

1. **Functional** — an entry in `DiskOriginTracker.origins` ⇒ every debounced save
   is also written back to the original disk file
   ([`onDiskSave`](../src/index.ts#L217) → `writeToDisk`).
2. **Visual** — the `filemanager-file--disk` CSS class on the file row
   (`setDiskTracked`).

These two must be kept in lockstep by the call sites; nothing enforces it
structurally.

---

## 2. Lifecycle — what actually survives

Reads as: after the operation, is the file in durable storage? is its origin
persisted? is it green and write-back-active after a reload?

| Operation | In browserFS? | Origin in localStorage? | Green after reload? | Survives reload? |
|---|---|---|---|---|
| Open from mounted folder | ✅ | ✅ `track()` | ✅ | ✅ |
| Drop from mounted folder | ✅ | ✅ `track()` | ✅ | ✅ |
| New file / local drop | ✅ | — | — | ✅ |
| **Soft-delete** (to trash) | ❌ `deleteHandler` unlink | ✅ **kept** (`forget` never called) | — | ❌ **trash is lost** |
| **Restore** (after the two recent fixes) | ✅ re-`saveHandler` | re-`restore` / already present | ✅ `onFileRestored` | ✅ |
| Rename a mounted file | ✅ (new name) | ❌ origin stays on the **old** name | ❌ | partial |

The two recent fixes referenced above:

- `restoreFile` re-applies the disk-tracked indicator via the `onFileRestored`
  hook ([`FileManager.ts`](../src/FileManager.ts), wired in
  [`index.ts` `restoreDiskTracking`](../src/index.ts#L335)).
- `restoreFile` re-persists the file via `saveHandler` so it survives a reload
  (symmetric to the `deleteHandler` call in soft-delete).

---

## 3. Bugs and risks

Severity: 🔴 data loss / corruption · 🟠 silent feature loss · 🟡 UX / minor.

### 🔴 B1 — The trash is lost on every reload (silent data loss)

`softDeleteFile` moves the file *within faustFS* and `deleteHandler` removes it
from browserFS. faustFS is rebuilt empty on reload and the trash is never
persisted to browserFS, so **any file soft-deleted and not restored before a
reload is unrecoverable**. The trash effectively empties itself on reload —
inconsistent with the mental model of a trash bin.
([`ProjectModel.ts:169`](../src/model/ProjectModel.ts#L169),
[`ProjectPersistence.ts:38`](../src/runtime/ProjectPersistence.ts#L38))

### 🔴 B2 — localStorage origins are never pruned ⇒ name collision ⇒ overwrite of an unrelated disk file

`DiskOriginTracker.forget()`
([`DiskOriginTracker.ts:55`](../src/runtime/fs/DiskOriginTracker.ts#L55)) is
**never called** (dead code). So `purgeFile`, `emptyTrash`, soft-delete and
rename all leave the origin in localStorage forever. Corruption scenario:

1. Open `synth.dsp` from a mounted folder (origin persisted).
2. Delete it, reload (trash lost — B1 — but the `synth.dsp` origin lingers).
3. Create a new **local** `synth.dsp`.
4. Reload → startup matches the stale origin → marks the file green + write-back
   active → **any edit overwrites the real disk file** (or raises an error alert
   if that disk file is gone, since `writeToDisk` uses `getFileHandle` without
   `create` — [`DiskOriginTracker.ts:72`](../src/runtime/fs/DiskOriginTracker.ts#L72)
   / [`DiskVolume.ts:106`](../src/runtime/fs/DiskVolume.ts#L106)).

Common names (`main.dsp`, `untitled.dsp`) make the collision plausible.

### 🟠 B3 — Renaming a mounted file drops its "mounted" status

[`rename`](../src/FileManager.ts#L336) does `renameFile` + `saveHandler(new)` +
`deleteHandler(old)` but **never touches the tracker**. The origin stays keyed on
the old name: the new name is neither green nor write-back-active, and the old
origin becomes stale (feeds B2).

### 🟠 B4 — Two divergent soft-delete code paths (debt)

Delete logic is duplicated between the inline ✕-button handler
([`FileManager.ts:275-289`](../src/FileManager.ts#L275)) and the public
[`softDelete`](../src/FileManager.ts#L371) method. They are equivalent today but
must be maintained in parallel. The ✕ button should just call
`this.softDelete(fileName)`.

### 🟡 B5 — Restore name-collision fails silently

[`ProjectModel.restoreFile`](../src/model/ProjectModel.ts#L194) returns `false`
when a project file of the same name already exists ("caller should rename
first") — but **no caller handles it**: the Restore button ignores the return,
the row stays in the trash, with no user feedback.

### 🟡 B6 — Soft-delete overwrites a same-named trashed file

`softDeleteFile` silently overwrites a homonym already in the trash
([`ProjectModel.ts:173`](../src/model/ProjectModel.ts#L173)). Documented, but a
possible data loss (no timestamp / unique trash name).

---

## 4. Recommendations (by priority)

1. **Wire `forget()`** (fixes B2/B3 — the most dangerous):
   - `purgeFile` / `emptyTrash` → `diskTracker.forget(name)`;
   - `rename` → `forget(oldName)` (and optionally re-`track` under the new name);
   - plus **startup pruning**: drop any localStorage origin whose file is neither
     in the project nor in the trash.
2. **Decide the trash's fate on reload** (B1): either persist it in browserFS
   (a `__trash__/` prefix, loaded back by `loadProject`), or accept and
   **document** that it is volatile (and at least clear the associated origins).
3. **Factor the soft-delete** (B4): ✕ button → `this.softDelete()`.
4. **Handle restore failure** (B5): restore under a de-duplicated name, or show
   an alert.

---

## 5. Source map (quick reference)

| Concern | Location |
|---|---|
| Trash model (soft-delete / restore / purge / empty) | [`ProjectModel.ts:148-212`](../src/model/ProjectModel.ts#L148) |
| Durable load / save / delete | [`ProjectPersistence.ts`](../src/runtime/ProjectPersistence.ts) |
| FileManager delete (inline ✕) / `softDelete` / `restoreFile` | [`FileManager.ts:275`](../src/FileManager.ts#L275), [`:371`](../src/FileManager.ts#L371), [`:394`](../src/FileManager.ts#L394) |
| FileManager rename | [`FileManager.ts:336`](../src/FileManager.ts#L336) |
| Disk origin tracker (`track`/`restore`/`forget`/`writeToDisk`) | [`DiskOriginTracker.ts`](../src/runtime/fs/DiskOriginTracker.ts) |
| Startup re-tracking / drop-tracking / open-in-place | [`index.ts:327-431`](../src/index.ts#L327) |
| Disk volume handle resolution / write-back path | [`DiskVolume.ts`](../src/runtime/fs/DiskVolume.ts) |
