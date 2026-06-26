import "./VolumeBrowser.scss";
import type { Volume, VolumeEntry, VolumeState } from "../runtime/fs/Volume";

export type VolumeBrowserOptions = {
    volumes: Volume[];
    onOpen?(volume: Volume, entry: VolumeEntry): void;
    onOpenDeviceFile?(): void;
};

const OVERLAY_ID = "vb-overlay";

const KIND_FA: Record<string, string> = {
    library: "fa-book",
    disk: "fa-folder",
    repo: "fa-github"
};

const STRINGS = {
    title: "Open a File",
    close: "Close",
    root: "Volumes",
    loading: "Loading…",
    empty: "No files",
    listFailed: "Failed to load",
    openDevice: "Open a file from disk…",
    stateNeedsPermission: "needs permission",
    stateOffline: "offline",
    stateError: "error"
};

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
 * Controls the unified volume browser modal (open mode only, P4).
 * Save mode, disk/repo mounts, and trash management are added in P6/P9.
 */
export class VolumeBrowserController {
    private readonly volumes: Volume[];
    private readonly onOpen?: (volume: Volume, entry: VolumeEntry) => void;
    private readonly onOpenDeviceFile?: () => void;

    constructor(options: VolumeBrowserOptions) {
        this.volumes = options.volumes;
        this.onOpen = options.onOpen;
        this.onOpenDeviceFile = options.onOpenDeviceFile;
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

        // ── DOM skeleton ──────────────────────────────────────────────────────
        const overlay = document.createElement("div");
        overlay.id = OVERLAY_ID;
        overlay.className = "vb-overlay";

        const panel = document.createElement("div");
        panel.className = "vb-panel";
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", STRINGS.title);

        // Header
        const header = document.createElement("header");
        header.className = "vb-header";
        const titleEl = document.createElement("h2");
        titleEl.className = "vb-title";
        titleEl.textContent = STRINGS.title;
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

        // Footer
        const footer = document.createElement("footer");
        footer.className = "vb-footer";
        if (this.onOpenDeviceFile) {
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

        panel.append(header, body, footer);
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

        const enterVolume = (v: Volume): void => {
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
                nameBtn.addEventListener("click", () => enterVolume(v));

                v.state().then((s) => {
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

                nameBtn.addEventListener("click", () => {
                    if (entry.type === "dir") {
                        path = entry.path;
                        render(); // eslint-disable-line no-use-before-define
                    } else {
                        close();
                        if (this.onOpen) this.onOpen(vol, entry);
                    }
                });

                row.append(nameBtn);
                listEl.append(row);
            });
        };

        const render = async (): Promise<void> => {
            renderCrumbs();
            await renderList();
        };

        document.body.appendChild(overlay);
        render();
    }
}
