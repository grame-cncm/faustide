# Filesystem status analysis - mounted origin, delete, reload

This document is a **characterization** (not an implementation) of how a file's
*status* behaves across create, open from a mounted volume, delete, rename, and
page reload.

It updates the earlier trash-oriented analysis with the current design decision:
the Faust IDE does **not** need a trash model. Delete should be a permanent
project delete. The remaining correctness issue is the status of mounted files
(the green disk indicator and write-back origin), especially across reload.

Companion documents: [`doc/filesystem-plan.md`](filesystem-plan.md) (target
model) and [`doc/filesystem-porting-plan.md`](filesystem-porting-plan.md)
(commit-by-commit work plan).

> Scope: the **status / delete / reload** axis only. It does not re-describe the
> volume browser, Save-As, or permission flows except where they bear on file
> status.

---

## 1. Storage layers

A file's state is spread across two transient stores, three durable stores, and
the DOM projection. Most fragile behavior comes from these stores drifting apart.

| Layer | Durable? | Holds | Rebuilt on reload from |
|---|---|---|---|
| **faustFS** (`libFaust.fs()`) | No | live project files `${DIR}<name>` | populated by `loadProject` |
| **browserFS** (ZenFS / IndexedDB) | Yes | durable project files, flat root `/<name>` | source of `loadProject` |
| **localStorage** `faust:fs:origins` | Yes | `Map<name, {volumeId, path}>` disk origins | read by startup wiring |
| **IndexedDB** `faust-volumes` | Yes | mounted directory handles | read by `MountRegistry` |
| **`DiskOriginTracker.origins`** | No | active origins for write-back | partially restored at startup |
| **DOM** `filemanager-file--disk` | No | the green "mounted" indicator | re-applied by startup wiring |

The earlier implementation at this point also had a transient `__trash__`
directory in faustFS. That directory is deliberately excluded from the target
model here: browserFS is flat, `loadProject` only restores project files, and a
non-durable trash creates a misleading recovery promise.

### A file's mounted status is two coupled facts

1. **Functional** - an entry in `DiskOriginTracker.origins` means saves write
   back to the original disk file.
2. **Visual** - the `filemanager-file--disk` CSS class means the row is shown in
   green as disk-backed.

These facts must stay in lockstep. Today this is a call-site convention, not a
structural invariant.

---

## 2. Lifecycle with no trash requirement

Reads as: after the operation, is the project copy durable? is its disk origin
durable? is it green and write-back-active after a reload?

| Operation | In browserFS? | Origin in localStorage? | Green after reload? | Target behavior |
|---|---|---|---|---|
| Open from mounted folder | Yes | Yes, via `track()` | Yes | keep |
| Drop from mounted folder | Yes | Yes, via `track()` | Yes | keep |
| New file / local drop | Yes | No | No | keep |
| Delete | No | No, via `forget()` | No | hard delete |
| Rename local file | Yes, under new name | No | No | keep |
| Rename mounted file | Yes, under new name | Either moved or forgotten explicitly | consistent with origin policy | fix |

The important change is the delete row: deleting a file should not move it into a
recoverable lifecycle. It should remove the project copy from faustFS and
browserFS, clear selection/main-file state as today, and drop any disk origin for
that project name immediately.

---

## 3. Why removing trash is safer

The removed trash implementation was a local UI/runtime feature, not a durable
storage concept:

- `ProjectModel.softDeleteFile` moves the file inside faustFS.
- `FileManager` then calls `deleteHandler`, which removes the durable browserFS
  project copy.
- `loadProject` rebuilds faustFS from browserFS on reload, so the transient trash
  disappears.
- Disk origins are keyed by project filename in localStorage, so a deleted file's
  origin can outlive the file unless every delete path calls `forget()`.

Persisting the trash would require adding a second durable namespace, restore
semantics, name collision policy, origin quarantine, purge/empty behavior, and
new reload invariants. That extra lifecycle is not needed for the current goal,
and it has already made mounted-file status harder to reason about.

The simpler invariant is:

> If a project filename is absent from browserFS after delete, no durable origin
> for that same project filename may remain.

That invariant directly protects mounted disk files from stale-origin write-back
after a reload.

---

## 4. Bugs and risks to fix under the no-trash model

Severity: high = data loss/corruption risk; medium = silent feature loss; low =
UX/debt.

### High - stale origins can overwrite unrelated disk files

`DiskOriginTracker.forget()` exists, but the current delete and rename flows do
not consistently call it. A stale localStorage origin can be restored on startup
for a later local file with the same name:

1. Open `synth.dsp` from a mounted folder.
2. Delete `synth.dsp`.
3. Create a new local `synth.dsp`.
4. Reload.
5. Startup finds the old origin for `synth.dsp`, marks the new local file green,
   and writes future saves to the old disk path.

Common names such as `main.dsp` and `untitled.dsp` make this plausible.

Target fix: every permanent delete must call `diskTracker.forget(name)`, and
startup should prune persisted origins whose project file is not present.

### Medium - renaming a mounted file loses or stales mounted status

`FileManager.rename` saves the new name and deletes the old durable copy, but the
disk origin remains keyed by the old name. The renamed row is no longer green or
write-back-active, while the old origin can later collide with a new file.

Target fix: choose one explicit rename policy and implement it consistently:

- **unlink-on-rename**: `forget(oldName)` and the renamed file becomes a local
  Library file; or
- **move-origin-on-rename**: move the origin key from `oldName` to `newName`,
  keeping the same disk path and green status.

The first policy is simpler and avoids writing a renamed Library file back to a
disk path with a different basename. The second policy is closer to "same
document, new project name" but needs clearer UI language.

### Medium - mounted-file reload behavior still needs characterization

Startup restores a green row by matching `localStorage` origins with restored
disk mounts and project filenames. The analysis still needs a focused pass on
what should happen when, after reload:

- the mounted directory handle exists but read-write permission is not granted;
- the mounted disk file was moved or deleted externally;
- the Library copy exists but the origin file changed externally;
- the origin volume cannot be restored.

This is the next useful analysis target once the trash lifecycle is removed from
the problem space.

### Low - duplicate delete paths

The row delete button and public delete helper should share one hard-delete path
so persistence, selection repair, main-file repair, DOM refresh, and origin
cleanup cannot drift.

---

## 5. Recommendations

1. Remove the trash requirement from the filesystem target model and stop adding
   fixes whose only purpose is to make trash durable.
2. Convert delete semantics back to one permanent delete path:
   `ProjectModel.deleteFile` + durable `deleteHandler` + `diskTracker.forget`.
3. Add startup pruning for persisted origins that no longer have a corresponding
   project file.
4. Decide and document the mounted-file rename policy before changing code.
5. Follow with a dedicated reload analysis for mounted files shown in green.

---

## 6. Source map

| Concern | Location |
|---|---|
| Project create / rename / hard delete rules | [`ProjectModel.ts`](../src/model/ProjectModel.ts) |
| Durable load / save / delete | [`ProjectPersistence.ts`](../src/runtime/ProjectPersistence.ts) |
| FileManager delete / rename / selection repair | [`FileManager.ts`](../src/FileManager.ts) |
| Disk origin tracker (`track`/`restore`/`forget`/`writeToDisk`) | [`DiskOriginTracker.ts`](../src/runtime/fs/DiskOriginTracker.ts) |
| Startup re-tracking / open-in-place wiring | [`index.ts`](../src/index.ts) |
| Disk volume handle resolution / write-back path | [`DiskVolume.ts`](../src/runtime/fs/DiskVolume.ts) |
