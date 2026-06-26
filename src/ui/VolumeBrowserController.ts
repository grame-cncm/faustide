import "./VolumeBrowser.scss";
import type { Volume, VolumeEntry, VolumeState } from "../runtime/fs/Volume";

export type VolumeBrowserOptions = {
    volumes: Volume[];
    /** "open" (default): pick a file; "save": pick a folder and provide a name. */
    mode?: "open" | "save";
    /** Pre-filled name in save mode. */
    defaultName?: string;
    onOpen?(volume: Volume, entry: VolumeEntry): void;
    onOpenDeviceFile?(): void;
    /** Save target chosen: volume + current folder + name (save mode). */
    onSave?(volume: Volume, folderPath: string, name: string): void;
    /**
     * Mount a disk folder (Chromium only).  Caller gates on fsAccessAvailable()
     * before providing this callback — the button is shown iff the hook is set.
     */
    onMountDisk?(): void;
    /** Re-grant RW permission on a lapsed Disk volume (requires a user gesture). */
    onReauthorize?(volume: Volume): Promise<boolean>;
    /** Soft-delete a file from the Library (move to trash).  Library open mode only. */
    onDelete?(volume: Volume, entry: VolumeEntry): void;
    /** Restore a trashed file back into the Library. */
    onRestore?(volume: Volume, entry: VolumeEntry): void;
    /** Permanently delete a file from the trash. */
    onPurge?(volume: Volume, entry: VolumeEntry): void;
    /** Permanently delete all files in the trash. */
    onEmptyTrash?(volume: Volume): void;
};

const OVERLAY_ID = "vb-overlay";

const KIND_FA: Record<string, string> = {
    library: "fa-book",
    disk: "fa-folder",
    repo: "fa-github"
};

const STRINGS = {
    titleOpen: "Open a File",
    titleSave: "Save As",
    close: "Close",
    root: "Volumes",
    loading: "Loading…",
    empty: "No files",
    listFailed: "Failed to load",
    openDevice: "Open a file from disk…",
    mountDisk: "Mount a disk folder…",
    saveHere: "Save here",
    namePlaceholder: "filename.dsp",
    stateNeedsPermission: "needs permission",
    stateOffline: "offline",
    stateError: "error",
    delete: "Delete",
    restore: "Restore",
    purgePermanently: "Delete permanently",
    emptyTrash: "Empty Trash"
};

// Path used by LibraryVolume for its virtual trash folder.
const LIBRARY_TRASH_PATH = "__trash__";

const stateLabel = (s: VolumeState): string => {
    if (s === "needs-permission") return STRINGS.stateNeedsPermission;
    if (s === "offline") return STRINGS.stateOffline;
    if (s === "error") return STRINGS.stateError;
    return "";
};

const faIcon = (faClass: string): HTMLElement => {
    const i = document.createElement("i");
    i.className = `fas ${faClass}`;
    return i;
};

/**
 * Controls the unified volume browser modal.
 * Open mode: pick a file from a volume.
 * Save mode (P6): pick a folder and provide a name, then call onSave.
 * Disk mount + trash management deferred to P6.3/P9.
 */
export class VolumeBrowserController {
    private readonly volumes: Volume[];
    private readonly mode: "open" | "save";
    private readonly defaultName: string;
    private readonly onOpen?: (volume: Volume, entry: VolumeEntry) => void;
    private readonly onOpenDeviceFile?: () => void;
    private readonly onSave?: (volume: Volume, folderPath: string, name: string) => void;
    private readonly onMountDisk?: () => void;
    private readonly onReauthorize?: (volume: Volume) => Promise<boolean>;
    private readonly onDelete?: (volume: Volume, entry: VolumeEntry) => void;
    private readonly onRestore?: (volume: Volume, entry: VolumeEntry) => void;
    private readonly onPurge?: (volume: Volume, entry: VolumeEntry) => void;
    private readonly onEmptyTrash?: (volume: Volume) => void;

    constructor(options: VolumeBrowserOptions) {
        this.volumes = options.volumes;
        this.mode = options.mode ?? "open";
        this.defaultName = options.defaultName ?? "";
        this.onOpen = options.onOpen;
        this.onOpenDeviceFile = options.onOpenDeviceFile;
        this.onSave = options.onSave;
        this.onMountDisk = options.onMountDisk;
        this.onReauthorize = options.onReauthorize;
        this.onDelete = options.onDelete;
        this.onRestore = options.onRestore;
        this.onPurge = options.onPurge;
        this.onEmptyTrash = options.onEmptyTrash;
    }

    /** Adds the "Open…" button to the `.filemanager-label` header. */
    bind(): void {
        const header = document.querySelector(".filemanager-label");
        if (!header) return;
        const btn = document.createElement("button");
        btn.id = "btn-open-volume";
        btn.type = "button";
        btn.className = "filemanager-btn-icon vb-open-btn";
        btn.title = "Open a file…";
        btn.appendChild(faIcon("fa-folder-open"));
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.open();
        });
        header.appendChild(btn);
    }

    /**
     * Opens the volume browser. A second call while already open is a no-op.
     * Navigation state resets to the root on every open.
     */
    open(): void {
        if (document.getElementById(OVERLAY_ID)) return;

        // Mutable navigation state captured by the render closure.
        let current: Volume | null = null;
        let path = "";

        const mode = this.mode;

        // ── DOM skeleton ──────────────────────────────────────────────────────
        const overlay = document.createElement("div");
        overlay.id = OVERLAY_ID;
        overlay.className = "vb-overlay";

        const panel = document.createElement("div");
        panel.className = "vb-panel";
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", mode === "save" ? STRINGS.titleSave : STRINGS.titleOpen);

        // Header
        const header = document.createElement("header");
        header.className = "vb-header";
        const titleEl = document.createElement("h2");
        titleEl.className = "vb-title";
        titleEl.textContent = mode === "save" ? STRINGS.titleSave : STRINGS.titleOpen;
        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "vb-close";
        closeBtn.textContent = STRINGS.close;
        header.append(titleEl, closeBtn);

        // Body = breadcrumb + list
        const body = document.createElement("div");
        body.className = "vb-body";
        const crumbs = document.createElement("div");
        crumbs.className = "vb-crumbs";
        const listEl = document.createElement("div");
        listEl.className = "vb-list";
        body.append(crumbs, listEl);

        // Save bar (save mode only)
        const saveBar = document.createElement("div");
        saveBar.className = "vb-savebar";
        saveBar.hidden = true;
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "vb-name";
        nameInput.value = this.defaultName;
        nameInput.placeholder = STRINGS.namePlaceholder;
        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.className = "vb-save";
        saveBtn.textContent = STRINGS.saveHere;
        saveBar.append(nameInput, saveBtn);

        // Footer
        const footer = document.createElement("footer");
        footer.className = "vb-footer";
        if (mode === "open" && this.onOpenDeviceFile) {
            const onDevice = this.onOpenDeviceFile;
            const b = document.createElement("button");
            b.type = "button";
            b.className = "vb-open-device";
            b.append(faIcon("fa-file"), document.createTextNode(` ${STRINGS.openDevice}`));
            b.addEventListener("click", () => {
                close(); // eslint-disable-line no-use-before-define
                onDevice();
            });
            footer.append(b);
        }
        if (this.onMountDisk) {
            const onMount = this.onMountDisk;
            const b = document.createElement("button");
            b.type = "button";
            b.className = "vb-mount-disk";
            b.append(faIcon("fa-hard-drive"), document.createTextNode(` ${STRINGS.mountDisk}`));
            b.addEventListener("click", () => onMount());
            footer.append(b);
        }

        // Empty Trash button — shown only when viewing the Library trash folder.
        let emptyTrashBtn: HTMLButtonElement | null = null;
        if (mode === "open" && this.onEmptyTrash) {
            const onEmpty = this.onEmptyTrash;
            emptyTrashBtn = document.createElement("button");
            emptyTrashBtn.type = "button";
            emptyTrashBtn.className = "vb-empty-trash";
            emptyTrashBtn.hidden = true;
            emptyTrashBtn.append(faIcon("fa-trash-can"), document.createTextNode(` ${STRINGS.emptyTrash}`));
            emptyTrashBtn.addEventListener("click", () => {
                if (!current) return;
                onEmpty(current);
                render(); // eslint-disable-line no-use-before-define
            });
            footer.append(emptyTrashBtn);
        }

        if (mode === "save") panel.append(header, body, saveBar, footer);
        else panel.append(header, body, footer);
        overlay.appendChild(panel);

        // ── Lifecycle ─────────────────────────────────────────────────────────
        const close = (): void => {
            overlay.remove();
            document.removeEventListener("keydown", onKey);
        };
        const onKey = (e: KeyboardEvent): void => {
            if (e.key === "Escape") close();
        };

        closeBtn.addEventListener("click", close);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
        });
        document.addEventListener("keydown", onKey);

        // ── Save bar wiring ───────────────────────────────────────────────────
        const confirmSave = (): void => {
            const name = nameInput.value.trim();
            if (name === "" || !current) return;
            close();
            if (this.onSave) this.onSave(current, path, name);
        };
        saveBtn.addEventListener("click", confirmSave);
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") confirmSave();
        });

        // ── Rendering ─────────────────────────────────────────────────────────
        const crumb = (label: string, go: () => void): HTMLElement => {
            const c = document.createElement("button");
            c.type = "button";
            c.className = "vb-crumb";
            c.textContent = label;
            c.addEventListener("click", go);
            return c;
        };
        const sep = (): HTMLElement => {
            const s = document.createElement("span");
            s.className = "vb-crumb-sep";
            s.textContent = "›";
            return s;
        };

        const renderCrumbs = (): void => {
            crumbs.replaceChildren();
            crumbs.append(
                crumb(STRINGS.root, () => {
                    current = null;
                    path = "";
                    render(); // eslint-disable-line no-use-before-define
                })
            );
            if (current) {
                const vol = current;
                crumbs.append(
                    sep(),
                    crumb(vol.label, () => {
                        path = "";
                        render(); // eslint-disable-line no-use-before-define
                    })
                );
                let acc = "";
                path.split("/").filter(s => s !== "").forEach((seg) => {
                    acc = acc === "" ? seg : `${acc}/${seg}`;
                    const target = acc;
                    crumbs.append(
                        sep(),
                        crumb(seg, () => {
                            path = target;
                            render(); // eslint-disable-line no-use-before-define
                        })
                    );
                });
            }
        };

        const enterVolume = (v: Volume, st: VolumeState): void => {
            if (st === "needs-permission" && this.onReauthorize) {
                this.onReauthorize(v).then((ok) => {
                    if (ok) {
                        current = v;
                        path = "";
                        render(); // eslint-disable-line no-use-before-define
                    }
                });
                return;
            }
            current = v;
            path = "";
            render(); // eslint-disable-line no-use-before-define
        };

        const renderRoot = (): void => {
            listEl.replaceChildren();
            this.volumes.forEach((v) => {
                const row = document.createElement("div");
                row.className = "vb-row vb-vol-row";
                row.dataset.kind = v.kind;

                const nameBtn = document.createElement("button");
                nameBtn.type = "button";
                nameBtn.className = "vb-row-name-btn";
                const iconEl = document.createElement("span");
                iconEl.className = "vb-row-icon";
                iconEl.appendChild(faIcon(KIND_FA[v.kind] || "fa-folder"));
                const nameSpan = document.createElement("span");
                nameSpan.className = "vb-row-name";
                nameSpan.textContent = v.label;
                const stEl = document.createElement("span");
                stEl.className = "vb-vol-state";
                nameBtn.append(iconEl, nameSpan, stEl);

                let cachedState: VolumeState = "ready";
                nameBtn.addEventListener("click", () => enterVolume(v, cachedState));

                v.state().then((s) => {
                    cachedState = s;
                    if (s === "ready") return;
                    stEl.textContent = stateLabel(s);
                });

                row.append(nameBtn);
                listEl.append(row);
            });
        };

        const renderList = async (): Promise<void> => {
            if (!current) {
                renderRoot();
                return;
            }
            const vol = current;
            listEl.replaceChildren();
            const loadingEl = document.createElement("div");
            loadingEl.className = "vb-loading";
            loadingEl.textContent = STRINGS.loading;
            listEl.append(loadingEl);

            let entries: VolumeEntry[];
            try {
                entries = await vol.list(path);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("volume list failed", err);
                listEl.replaceChildren();
                const errEl = document.createElement("div");
                errEl.className = "vb-error";
                errEl.textContent = STRINGS.listFailed;
                listEl.append(errEl);
                return;
            }
            listEl.replaceChildren();

            if (entries.length === 0) {
                const emptyEl = document.createElement("div");
                emptyEl.className = "vb-empty";
                emptyEl.textContent = STRINGS.empty;
                listEl.append(emptyEl);
                return;
            }

            entries.forEach((entry) => {
                const row = document.createElement("div");
                row.className = "vb-row";
                row.dataset.type = entry.type;
                if (entry.type === "file" && !entry.isNative) row.classList.add("vb-row-foreign");

                const nameBtn = document.createElement("button");
                nameBtn.type = "button";
                nameBtn.className = "vb-row-name-btn";
                const iconEl = document.createElement("span");
                iconEl.className = "vb-row-icon";
                let faClass = "fa-file";
                if (entry.type === "dir") faClass = "fa-folder";
                else if (entry.isNative) faClass = "fa-file-code";
                iconEl.appendChild(faIcon(faClass));
                const nameSpan = document.createElement("span");
                nameSpan.className = "vb-row-name";
                nameSpan.textContent = entry.name;
                nameBtn.append(iconEl, nameSpan);

                const inTrash = vol.kind === "library" && path === LIBRARY_TRASH_PATH;

                nameBtn.addEventListener("click", () => {
                    if (entry.type === "dir") {
                        path = entry.path;
                        render(); // eslint-disable-line no-use-before-define
                    } else if (inTrash) {
                        // clicking a trash file name is a no-op — use action buttons
                    } else if (mode === "save") {
                        nameInput.value = entry.name;
                    } else {
                        close();
                        if (this.onOpen) this.onOpen(vol, entry);
                    }
                });

                row.append(nameBtn);

                // Row action buttons (open mode only, files only).
                if (mode === "open" && entry.type === "file") {
                    const actions = document.createElement("div");
                    actions.className = "vb-row-actions";

                    if (inTrash) {
                        if (this.onRestore) {
                            const onRst = this.onRestore;
                            const btn = document.createElement("button");
                            btn.type = "button";
                            btn.className = "vb-row-restore";
                            btn.title = STRINGS.restore;
                            btn.textContent = STRINGS.restore;
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                onRst(vol, entry);
                                render(); // eslint-disable-line no-use-before-define
                            });
                            actions.append(btn);
                        }
                        if (this.onPurge) {
                            const onPg = this.onPurge;
                            const btn = document.createElement("button");
                            btn.type = "button";
                            btn.className = "vb-row-purge";
                            btn.title = STRINGS.purgePermanently;
                            btn.textContent = STRINGS.purgePermanently;
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                onPg(vol, entry);
                                render(); // eslint-disable-line no-use-before-define
                            });
                            actions.append(btn);
                        }
                    } else if (vol.kind === "library" && this.onDelete) {
                        const onDel = this.onDelete;
                        const btn = document.createElement("button");
                        btn.type = "button";
                        btn.className = "vb-row-delete";
                        btn.title = STRINGS.delete;
                        btn.append(faIcon("fa-xmark"));
                        btn.addEventListener("click", (e) => {
                            e.stopPropagation();
                            onDel(vol, entry);
                            render(); // eslint-disable-line no-use-before-define
                        });
                        actions.append(btn);
                    }

                    if (actions.childElementCount > 0) row.append(actions);
                }

                listEl.append(row);
            });
        };

        const render = async (): Promise<void> => {
            renderCrumbs();
            // Save bar is visible only when navigated inside a volume.
            if (mode === "save") saveBar.hidden = current === null;
            // Empty Trash button shown only when viewing the Library trash folder.
            if (emptyTrashBtn) emptyTrashBtn.hidden = !(current?.kind === "library" && path === LIBRARY_TRASH_PATH);
            await renderList();
        };

        document.body.appendChild(overlay);
        render();
        if (mode === "save") nameInput.focus();
    }
}
