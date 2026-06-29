# Mounted file coherence analysis

This document analyzes whether Faust IDE can keep a mounted disk file coherent
when the same file is edited concurrently by another tool, such as VS Code,
Vim, or a terminal command. It also records the first implemented safety
increment: pre-write divergence detection for mounted disk files.

Companion documents: [`filesystem-plan.md`](filesystem-plan.md) for the target
volume/origin model and [`filesystem-status-analysis.md`](filesystem-status-analysis.md)
for mounted-file status, delete, rename, and reload behavior.

## 1. Current behavior

Faust IDE already supports a one-way open-in-place flow for mounted disk files:

1. A native Faust file (`.dsp` or `.lib`) is opened from a mounted
   `DiskVolume`.
2. `DiskOriginTracker.track()` records the origin as
   `Library file name -> { volume id, path }`.
3. Monaco edits update `FileManager`.
4. `ProjectRuntimeController` debounces the save.
5. The save first updates BrowserFS, then calls `DiskOriginTracker.writeToDisk()`
   so the mounted disk file is overwritten with Faust IDE's current content.

That protects the "Faust IDE writes back to disk" direction. It does not protect
the opposite direction: if another editor changes the disk file, Faust IDE does
not currently detect the incoming change before its next debounced save.

Relevant code:

| Concern                            | Location                                                               |
| ---------------------------------- | ---------------------------------------------------------------------- |
| Editor-to-project save debounce    | [`ProjectRuntimeController.ts`](../src/ui/ProjectRuntimeController.ts) |
| Pre-write disk divergence guard    | [`DiskCoherenceService.ts`](../src/runtime/fs/DiskCoherenceService.ts) |
| Disk-origin mapping and write-back | [`DiskOriginTracker.ts`](../src/runtime/fs/DiskOriginTracker.ts)       |
| Mounted directory/file access      | [`DiskVolume.ts`](../src/runtime/fs/DiskVolume.ts)                     |
| Startup restore of mounted origins | [`index.ts`](../src/index.ts)                                          |

## 2. Data-loss risk

The risky sequence is:

1. `main.dsp` is opened from a mounted disk folder and shown as disk-backed.
2. Faust IDE and an external editor both have the file open.
3. The external editor saves a new version on disk.
4. Faust IDE still has the old buffer and performs a debounced save.
5. `DiskOriginTracker.writeToDisk()` writes Faust IDE's stale buffer over the
   external editor's newer content.

This is a real coherence problem. It is not solved by persisting the origin in
localStorage, because origin persistence answers "where should Faust IDE save?",
not "has that destination changed since Faust IDE last read it?".

Status: the direct silent-overwrite path is now guarded. Faust IDE captures an
accepted snapshot when a mounted file is opened, dropped, or restored from a
persisted origin. Before write-back, `DiskCoherenceService.checkBeforeWrite()`
compares the current disk text with that accepted base and reports a conflict if
another tool changed the file first.

## 3. Browser constraints

The web platform does not give Faust IDE a portable, reliable native filesystem
watcher for mounted directories. The practical mechanism is controlled polling
through the File System Access API:

- read the current file via `FileSystemFileHandle.getFile()`;
- inspect metadata such as `lastModified` and `size`;
- read text and compare content or a hash when metadata changed;
- handle normal failure states: permission lost, file deleted, folder
  unavailable, or browser without File System Access support.

This means Faust IDE can implement strong conflict detection, but not perfect
real-time synchronization across all browsers. The correct product model is
"detect divergence and ask for resolution", not "silently merge all editors".

## 4. Recommended model

For every disk-backed text file, Faust IDE should maintain a small coherence
snapshot:

| Field                           | Meaning                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `libraryName`                   | The flat project name used by `FileManager`.                                 |
| `volumeId` and `path`           | The mounted origin already tracked by `DiskOriginTracker`.                   |
| `diskLastModified` / `diskSize` | Metadata from the last known disk version.                                   |
| `diskHash` or `diskText`        | Optional stronger identity for changed metadata or ambiguous cases.          |
| `baseText`                      | The content Faust IDE last accepted from disk or successfully wrote to disk. |
| `localDirty`                    | Whether Monaco/FileManager content differs from `baseText`.                  |

With that state, a disk poll has three important outcomes:

| Disk changed? | Local dirty? | Action                                                                   |
| ------------- | ------------ | ------------------------------------------------------------------------ |
| no            | no or yes    | Continue normally.                                                       |
| yes           | no           | Reload automatically from disk, update BrowserFS and Monaco if selected. |
| yes           | yes          | Mark a conflict and block automatic write-back.                          |

The conflict UI should offer explicit actions:

- **Reload from disk**: discard Faust IDE's local buffer and accept the external
  editor's content.
- **Overwrite disk**: keep Faust IDE's buffer and write it to the mounted file.
- **Keep local copy**: unlink the disk origin and save the Faust IDE buffer as a
  local Library file, ideally with a collision-free name.

Automatic line-based merge should not be the first implementation. Faust files
can be merged textually, but the data-loss risk is better reduced by simple,
predictable conflict handling first.

## 5. Implemented first checkpoint

The first safety improvement is implemented immediately before disk write-back:

1. `DiskCoherenceService` records accepted mounted-file content.
2. `ProjectRuntimeController` still saves to BrowserFS first.
3. Before `DiskOriginTracker.writeToDisk()` writes to the mounted file, the
   coherence service reads the current disk file via the tracked origin.
4. If the disk text differs from both the accepted base and Faust IDE's pending
   content, write-back is blocked with `DiskCoherenceConflictError`.
5. After a successful write, the pending Faust IDE content becomes the new
   accepted base.

This prevents the most direct data-loss case: Faust IDE no longer silently
overwrites an externally edited mounted file with a stale Monaco buffer.

Remaining limitation: the check is not a true atomic compare-and-swap. A file
could still change between the check and the browser write stream. The web
platform does not currently provide the conditional write primitive needed to
close that final race for local files.

## 6. Where to check for external changes next

The next safety improvements should reuse the same service and add more
checkpoints around the pre-write guard:

Recommended checkpoints:

1. **Before disk write-back**: implemented; prevents silent overwrite of
   external edits.
2. **On window focus / `visibilitychange`**: still useful; catches changes made while
   the user was in another editor.
3. **Before compile/run for disk-backed main files**: useful; avoids compiling a
   stale buffer when the disk file changed externally.
4. **Periodic polling while visible**: optional; keep it conservative, for
   example every few seconds and only for mounted text files.

The save debounce in `ProjectRuntimeController` is the critical race point. A
file can change externally during the debounce window, so the coherence check
must be performed at the time of the actual disk write, not only when the user
types.

## 7. Suggested implementation shape

The new behavior stays out of `index.ts` except for composition wiring. The
runtime service is:

```text
src/runtime/fs/DiskCoherenceService.ts
```

Current responsibilities:

- register and unregister disk-backed files when `DiskOriginTracker` tracks or
  forgets an origin through explicit composition callbacks;
- capture the initial disk snapshot when a file is opened, dropped, or restored;
- expose `checkBeforeWrite(libraryName, content)`;
- record successful writes as the next accepted base.

Future responsibilities:

- expose `poll(libraryName)` or `pollAll()`;
- report reload/conflict outcomes as structured results, not DOM actions.

The UI/controller layer can then decide how to present reload and conflict
actions. This keeps disk metadata and File System Access calls in runtime code,
while DOM and Monaco updates stay in controllers/views.

## 8. Incremental plan

### Step 1 - Characterize the current risk

Add unit tests around the save pipeline proving the current write-back path can
be intercepted. These should use fake `DiskVolume` / file handles, not the real
browser filesystem.

Status: done with `DiskCoherenceService.test.ts` plus callback coverage in
`VolumeFileActions.test.ts` and `DroppedDiskFileTracking.test.ts`.

### Step 2 - Add pre-write divergence detection

Before `writeToDisk()` writes, compare the current disk snapshot with the stored
snapshot. If the disk changed and Faust IDE's content is not the accepted base,
return a conflict instead of writing.

This is the highest-value change because it directly prevents silent overwrite.

Status: done.

### Step 3 - Add focus-time refresh

When the tab becomes active again, poll disk-backed files. If a selected file is
clean and changed on disk, reload it into `FileManager`, BrowserFS, and Monaco.
If it is dirty, surface a conflict state.

### Step 4 - Add conflict UI

Add explicit actions for reload, overwrite, and keep-local-copy. The conflict
state should be visible in the file row and should block automatic write-back
until resolved.

### Step 5 - Add browser e2e coverage where possible

Playwright can exercise the controller behavior with mocked handles. Real
external-editor interaction remains a manual Chrome test because it depends on
native file picker permissions and a real directory handle.

## 9. Testing requirements

Minimum unit coverage:

- initial snapshot capture for a mounted `.dsp` / `.lib`;
- no conflict when disk metadata is unchanged;
- automatic reload decision when disk changed and local buffer is clean;
- conflict decision when disk changed and local buffer is dirty;
- write allowed after Faust IDE updates the snapshot;
- file deleted externally;
- permission lost externally;
- binary/audio files ignored by coherence tracking.

Status: these cases are covered at the service level, except the deleted and
permission-lost cases which currently surface as read errors and still need
dedicated UX policy.

E2E or integration coverage should focus on user-visible behavior:

- disk-backed file marked as conflicted;
- automatic save does not overwrite after conflict;
- reload-from-disk updates the selected Monaco content;
- overwrite-disk clears the conflict and updates the snapshot;
- keep-local-copy removes the green disk-backed origin.

## 10. Feasibility conclusion

Maintaining coherence between Faust IDE and other editors is feasible, but the
right goal is divergence detection plus explicit conflict resolution. Browser
APIs do not provide a cross-browser real-time watcher suitable for invisible
merge behavior.

The first milestone is implemented: a pre-write disk-version check now protects
the mounted-file save path. Faust IDE stops before silently overwriting external
edits with a stale Monaco buffer. The remaining work is user-facing conflict
resolution, focus-time polling, and manual Chrome validation with real mounted
folders.
