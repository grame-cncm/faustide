import { beforeEach, describe, expect, it, vi } from "vitest";
import { VolumeBrowserController } from "../ui/VolumeBrowserController";
import type { Volume, VolumeEntry } from "../runtime/fs/Volume";

// Flush the microtask queue so async rendering completes in jsdom.
const flush = () => Promise.resolve().then(() => Promise.resolve());

const fakeVolume = (overrides: Partial<Volume> = {}): Volume => ({
    id: "library",
    kind: "library",
    label: "Library",
    state: () => Promise.resolve("ready"),
    list: () => Promise.resolve([]),
    readText: () => Promise.resolve(""),
    ...overrides
});

const fakeEntry = (name: string, type: "file" | "dir" = "file", isNative = true): VolumeEntry => ({
    name,
    path: name,
    type,
    isNative
});

const setupDom = () => {
    document.body.innerHTML = '<div class="filemanager"><div class="filemanager-label"></div></div>';
};

const removeOverlay = () => {
    const el = document.getElementById("vb-overlay");
    if (el) el.remove();
};

describe("VolumeBrowserController", () => {
    beforeEach(() => {
        setupDom();
        removeOverlay();
    });

    // ── bindSave ───────────────────────────────────────────────────────────────

    it("bindSave adds a #btn-save-to-disk button to the filemanager-label", () => {
        const ctrl = new VolumeBrowserController({ volumes: [], mode: "save" });
        ctrl.bindSave();
        expect(document.getElementById("btn-save-to-disk")).not.toBeNull();
    });

    it("bindSave button opens the volume browser on click", async () => {
        const ctrl = new VolumeBrowserController({ volumes: [], mode: "save" });
        ctrl.bindSave();
        (document.getElementById("btn-save-to-disk") as HTMLButtonElement).click();
        await flush();
        expect(document.getElementById("vb-overlay")).not.toBeNull();
    });

    it("bindSave does nothing when filemanager-label is absent", () => {
        document.body.innerHTML = "<div></div>"; // no .filemanager-label
        const ctrl = new VolumeBrowserController({ volumes: [], mode: "save" });
        expect(() => ctrl.bindSave()).not.toThrow();
    });

    // ── bind ───────────────────────────────────────────────────────────────────

    it("bind() adds an Open button to the filemanager header", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.bind();
        expect(document.getElementById("btn-open-volume")).toBeTruthy();
    });

    it("bind() does nothing when the filemanager header is absent", () => {
        document.body.innerHTML = "";
        const ctrl = new VolumeBrowserController({ volumes: [] });
        expect(() => ctrl.bind()).not.toThrow();
    });

    it("bind() clicking the Open button launches the overlay", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.bind();
        const btn = document.getElementById("btn-open-volume");
        if (btn) btn.click();
        expect(document.getElementById("vb-overlay")).toBeTruthy();
    });

    it("bind() a second click is a no-op while overlay is open", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.bind();
        const btn = document.getElementById("btn-open-volume");
        if (btn) { btn.click(); btn.click(); }
        expect(document.querySelectorAll("#vb-overlay").length).toBe(1);
    });

    // ── open / close ───────────────────────────────────────────────────────────

    it("open() inserts the overlay into the document body", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        expect(document.getElementById("vb-overlay")).toBeTruthy();
    });

    it("the panel has role=dialog", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        const panel = document.querySelector(".vb-panel");
        expect(panel && panel.getAttribute("role")).toBe("dialog");
    });

    it("close button removes the overlay", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        const closeBtn = document.querySelector(".vb-close") as HTMLButtonElement;
        if (closeBtn) closeBtn.click();
        expect(document.getElementById("vb-overlay")).toBeNull();
    });

    it("Esc key removes the overlay", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        expect(document.getElementById("vb-overlay")).toBeNull();
    });

    it("clicking the backdrop (overlay itself) removes the overlay", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        const overlay = document.getElementById("vb-overlay");
        if (overlay) overlay.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(document.getElementById("vb-overlay")).toBeNull();
    });

    it("clicking inside the panel does not close the overlay", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        const panel = document.querySelector(".vb-panel") as HTMLElement;
        if (panel) panel.click();
        expect(document.getElementById("vb-overlay")).toBeTruthy();
    });

    it("open() is a no-op while overlay is already open", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        ctrl.open();
        expect(document.querySelectorAll("#vb-overlay").length).toBe(1);
    });

    // ── root rendering ─────────────────────────────────────────────────────────

    it("renders one row per volume at the root", async () => {
        const ctrl = new VolumeBrowserController({
            volumes: [
                fakeVolume({ id: "library", label: "Library" }),
                fakeVolume({ id: "disk:1", kind: "disk", label: "My Folder" })
            ]
        });
        ctrl.open();
        await flush();
        expect(document.querySelectorAll(".vb-vol-row").length).toBe(2);
    });

    it("each volume row shows the volume label", async () => {
        const ctrl = new VolumeBrowserController({
            volumes: [fakeVolume({ label: "My Library" })]
        });
        ctrl.open();
        await flush();
        const name = document.querySelector(".vb-row-name");
        expect(name && name.textContent).toBe("My Library");
    });

    it("root breadcrumb shows Volumes", async () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        await flush();
        const firstCrumb = document.querySelector(".vb-crumb");
        expect(firstCrumb && firstCrumb.textContent).toBe("Volumes");
    });

    // ── entering a volume ──────────────────────────────────────────────────────

    it("clicking a volume row navigates into it and shows its entries", async () => {
        const entries = [fakeEntry("main.dsp"), fakeEntry("filter.lib")];
        const vol = fakeVolume({ list: () => Promise.resolve(entries) });
        const ctrl = new VolumeBrowserController({ volumes: [vol] });
        ctrl.open();
        await flush(); // render root
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush(); // start renderList + await vol.list
        await flush(); // entries rendered
        expect(document.querySelectorAll(".vb-row:not(.vb-vol-row)").length).toBe(2);
        const firstEntryName = document.querySelectorAll(".vb-row .vb-row-name")[0];
        expect(firstEntryName && firstEntryName.textContent).toBe("main.dsp");
    });

    it("shows a loading indicator while the list is pending", async () => {
        let resolve!: (entries: VolumeEntry[]) => void;
        const vol = fakeVolume({ list: () => new Promise((r) => { resolve = r; }) });
        const ctrl = new VolumeBrowserController({ volumes: [vol] });
        ctrl.open();
        await flush(); // root
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush(); // renderList starts, shows loading
        expect(document.querySelector(".vb-loading")).toBeTruthy();
        resolve([]);
        await flush();
        expect(document.querySelector(".vb-loading")).toBeNull();
    });

    it("shows an empty state when the volume is empty", async () => {
        const vol = fakeVolume({ list: () => Promise.resolve([]) });
        const ctrl = new VolumeBrowserController({ volumes: [vol] });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        expect(document.querySelector(".vb-empty")).toBeTruthy();
    });

    it("shows an error when list() rejects", async () => {
        const vol = fakeVolume({ list: () => Promise.reject(new Error("disk error")) });
        const ctrl = new VolumeBrowserController({ volumes: [vol] });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        expect(document.querySelector(".vb-error")).toBeTruthy();
    });

    // ── breadcrumb navigation ──────────────────────────────────────────────────

    it("breadcrumb shows volume name after entering", async () => {
        const vol = fakeVolume({ label: "Library" });
        const ctrl = new VolumeBrowserController({ volumes: [vol] });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        const crumbs = document.querySelectorAll(".vb-crumb");
        expect(crumbs.length).toBeGreaterThanOrEqual(2);
        expect(crumbs[1] && crumbs[1].textContent).toBe("Library");
    });

    it("clicking the root crumb returns to the volume list", async () => {
        const vol = fakeVolume({ list: () => Promise.resolve([fakeEntry("main.dsp")]) });
        const ctrl = new VolumeBrowserController({ volumes: [vol] });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        // Click root crumb (first .vb-crumb)
        const rootCrumb = document.querySelector(".vb-crumb") as HTMLButtonElement;
        if (rootCrumb) rootCrumb.click();
        await flush();
        expect(document.querySelectorAll(".vb-vol-row").length).toBe(1);
    });

    // ── onOpen callback ────────────────────────────────────────────────────────

    it("clicking a file entry calls onOpen and closes the overlay", async () => {
        const onOpen = vi.fn();
        const entry = fakeEntry("main.dsp");
        const vol = fakeVolume({ list: () => Promise.resolve([entry]) });
        const ctrl = new VolumeBrowserController({ volumes: [vol], onOpen });
        ctrl.open();
        await flush();
        const volBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (volBtn) volBtn.click();
        await flush();
        await flush();
        const fileBtn = document.querySelector(".vb-row:not(.vb-vol-row) .vb-row-name-btn") as HTMLButtonElement;
        if (fileBtn) fileBtn.click();
        expect(onOpen).toHaveBeenCalledWith(vol, entry);
        expect(document.getElementById("vb-overlay")).toBeNull();
    });

    // ── onOpenDeviceFile ───────────────────────────────────────────────────────

    it("shows the Open-from-disk footer button when onOpenDeviceFile is provided", () => {
        const ctrl = new VolumeBrowserController({
            volumes: [],
            onOpenDeviceFile: vi.fn()
        });
        ctrl.open();
        expect(document.querySelector(".vb-open-device")).toBeTruthy();
    });

    it("Open-from-disk button calls callback and closes the overlay", () => {
        const onOpenDeviceFile = vi.fn();
        const ctrl = new VolumeBrowserController({ volumes: [], onOpenDeviceFile });
        ctrl.open();
        const deviceBtn = document.querySelector(".vb-open-device") as HTMLButtonElement;
        if (deviceBtn) deviceBtn.click();
        expect(onOpenDeviceFile).toHaveBeenCalledTimes(1);
        expect(document.getElementById("vb-overlay")).toBeNull();
    });

    it("does not show the Open-from-disk footer button without the callback", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        expect(document.querySelector(".vb-open-device")).toBeNull();
    });

    // ── save mode ──────────────────────────────────────────────────────────────

    it("save mode shows the 'Save As' title", () => {
        const ctrl = new VolumeBrowserController({ volumes: [], mode: "save" });
        ctrl.open();
        const title = document.querySelector(".vb-title");
        expect(title && title.textContent).toBe("Save As");
    });

    it("save mode hides the save bar at the root", async () => {
        const ctrl = new VolumeBrowserController({ volumes: [], mode: "save" });
        ctrl.open();
        await flush();
        const bar = document.querySelector(".vb-savebar") as HTMLElement;
        expect(bar && bar.hidden).toBe(true);
    });

    it("save mode shows the save bar when inside a volume", async () => {
        const vol = fakeVolume({ list: () => Promise.resolve([]) });
        const ctrl = new VolumeBrowserController({ volumes: [vol], mode: "save" });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        const bar = document.querySelector(".vb-savebar") as HTMLElement;
        expect(bar && bar.hidden).toBe(false);
    });

    it("save mode pre-fills the name input with defaultName", () => {
        const ctrl = new VolumeBrowserController({ volumes: [], mode: "save", defaultName: "reverb.dsp" });
        ctrl.open();
        const input = document.querySelector(".vb-name") as HTMLInputElement;
        expect(input && input.value).toBe("reverb.dsp");
    });

    it("'Save here' calls onSave with current volume, folder, and name", async () => {
        const onSave = vi.fn();
        const vol = fakeVolume({ list: () => Promise.resolve([]) });
        const ctrl = new VolumeBrowserController({
            volumes: [vol], mode: "save", defaultName: "main.dsp", onSave
        });
        ctrl.open();
        await flush();
        // Enter the volume
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        // Click "Save here"
        const saveBtn = document.querySelector(".vb-save") as HTMLButtonElement;
        if (saveBtn) saveBtn.click();
        expect(onSave).toHaveBeenCalledWith(vol, "", "main.dsp");
        expect(document.getElementById("vb-overlay")).toBeNull();
    });

    it("Enter key in name input triggers save", async () => {
        const onSave = vi.fn();
        const vol = fakeVolume({ list: () => Promise.resolve([]) });
        const ctrl = new VolumeBrowserController({
            volumes: [vol], mode: "save", defaultName: "test.dsp", onSave
        });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        const input = document.querySelector(".vb-name") as HTMLInputElement;
        if (input) input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        expect(onSave).toHaveBeenCalledWith(vol, "", "test.dsp");
    });

    it("'Save here' is a no-op when name is empty", async () => {
        const onSave = vi.fn();
        const vol = fakeVolume({ list: () => Promise.resolve([]) });
        const ctrl = new VolumeBrowserController({ volumes: [vol], mode: "save", onSave });
        ctrl.open();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        await flush();
        const input = document.querySelector(".vb-name") as HTMLInputElement;
        if (input) input.value = "";
        const saveBtn = document.querySelector(".vb-save") as HTMLButtonElement;
        if (saveBtn) saveBtn.click();
        expect(onSave).not.toHaveBeenCalled();
        expect(document.getElementById("vb-overlay")).toBeTruthy();
    });

    it("clicking a file in save mode pre-fills the name input", async () => {
        const entry = fakeEntry("existing.dsp");
        const vol = fakeVolume({ list: () => Promise.resolve([entry]) });
        const ctrl = new VolumeBrowserController({ volumes: [vol], mode: "save" });
        ctrl.open();
        await flush();
        const volBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (volBtn) volBtn.click();
        await flush();
        await flush();
        const fileBtn = document.querySelector(".vb-row:not(.vb-vol-row) .vb-row-name-btn") as HTMLButtonElement;
        if (fileBtn) fileBtn.click();
        const input = document.querySelector(".vb-name") as HTMLInputElement;
        expect(input && input.value).toBe("existing.dsp");
        // Overlay stays open
        expect(document.getElementById("vb-overlay")).toBeTruthy();
    });

    // ── onMountDisk ────────────────────────────────────────────────────────────

    it("shows Mount button when onMountDisk is provided", () => {
        const ctrl = new VolumeBrowserController({ volumes: [], onMountDisk: vi.fn() });
        ctrl.open();
        expect(document.querySelector(".vb-mount-disk")).toBeTruthy();
    });

    it("Mount button calls onMountDisk", () => {
        const onMountDisk = vi.fn();
        const ctrl = new VolumeBrowserController({ volumes: [], onMountDisk });
        ctrl.open();
        const btn = document.querySelector(".vb-mount-disk") as HTMLButtonElement;
        if (btn) btn.click();
        expect(onMountDisk).toHaveBeenCalledTimes(1);
    });

    it("Mount button re-renders the root volume list after mounting", async () => {
        const volumes: ReturnType<typeof fakeVolume>[] = [];
        const onMountDisk = vi.fn(async () => {
            volumes.push(fakeVolume({ id: "disk:1", kind: "disk", label: "Patches" }));
        });
        const ctrl = new VolumeBrowserController({ volumes, onMountDisk, onUnmountDisk: vi.fn() });
        ctrl.open();
        const btn = document.querySelector(".vb-mount-disk") as HTMLButtonElement;
        if (btn) btn.click();
        await flush();
        await flush();
        expect(document.querySelector(".vb-row-unmount")).toBeTruthy();
    });

    it("does not show Mount button without the callback", () => {
        const ctrl = new VolumeBrowserController({ volumes: [] });
        ctrl.open();
        expect(document.querySelector(".vb-mount-disk")).toBeNull();
    });

    // ── onUnmountDisk ──────────────────────────────────────────────────────────

    it("shows an Unmount button for disk volumes when onUnmountDisk is provided", async () => {
        const disk = fakeVolume({ id: "disk:1", kind: "disk", label: "Patches" });
        const ctrl = new VolumeBrowserController({ volumes: [disk], onUnmountDisk: vi.fn() });
        ctrl.open();
        await flush();
        expect(document.querySelector(".vb-row-unmount")).toBeTruthy();
    });

    it("does not show an Unmount button for the Library volume", async () => {
        const ctrl = new VolumeBrowserController({ volumes: [fakeVolume()], onUnmountDisk: vi.fn() });
        ctrl.open();
        await flush();
        expect(document.querySelector(".vb-row-unmount")).toBeNull();
    });

    it("Unmount button calls onUnmountDisk with the disk volume", async () => {
        const onUnmountDisk = vi.fn();
        const disk = fakeVolume({ id: "disk:1", kind: "disk", label: "Patches" });
        const ctrl = new VolumeBrowserController({ volumes: [disk], onUnmountDisk });
        ctrl.open();
        await flush();
        const btn = document.querySelector(".vb-row-unmount") as HTMLButtonElement;
        if (btn) btn.click();
        expect(onUnmountDisk).toHaveBeenCalledWith(disk);
    });

    // ── onReauthorize ──────────────────────────────────────────────────────────

    it("clicking a needs-permission volume calls onReauthorize", async () => {
        const onReauthorize = vi.fn().mockResolvedValue(true);
        const vol = fakeVolume({ state: () => Promise.resolve("needs-permission") });
        const ctrl = new VolumeBrowserController({ volumes: [vol], onReauthorize });
        ctrl.open();
        await flush(); // render root + state badge
        await flush(); // state resolved
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        expect(onReauthorize).toHaveBeenCalledWith(vol);
    });

    it("navigates into volume after reauthorize resolves true", async () => {
        const onReauthorize = vi.fn().mockResolvedValue(true);
        const vol = fakeVolume({
            state: () => Promise.resolve("needs-permission"),
            list: () => Promise.resolve([fakeEntry("main.dsp")])
        });
        const ctrl = new VolumeBrowserController({ volumes: [vol], onReauthorize });
        ctrl.open();
        await flush();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush(); // onReauthorize resolves
        await flush(); // render enters volume, renderList runs
        await flush(); // vol.list resolves
        const crumbs = document.querySelectorAll(".vb-crumb");
        expect(crumbs.length).toBeGreaterThanOrEqual(2);
    });

    it("does not navigate when reauthorize resolves false", async () => {
        const onReauthorize = vi.fn().mockResolvedValue(false);
        const vol = fakeVolume({ state: () => Promise.resolve("needs-permission") });
        const ctrl = new VolumeBrowserController({ volumes: [vol], onReauthorize });
        ctrl.open();
        await flush();
        await flush();
        const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
        if (nameBtn) nameBtn.click();
        await flush();
        // Still at root (vol-rows visible)
        expect(document.querySelectorAll(".vb-vol-row").length).toBe(1);
    });

    describe("delete: onDelete on Library file rows", () => {
        it("shows a delete button on library file rows when onDelete is provided", async () => {
            const onDelete = vi.fn();
            const entry = fakeEntry("main.dsp");
            const vol = fakeVolume({ list: () => Promise.resolve([entry]) });
            const ctrl = new VolumeBrowserController({ volumes: [vol], onDelete });
            ctrl.open();
            await flush();
            // enter the library volume
            const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
            nameBtn.click();
            await flush();
            await flush();
            expect(document.querySelector(".vb-row-delete")).not.toBeNull();
        });

        it("does NOT show a delete button for non-library volumes", async () => {
            const onDelete = vi.fn();
            const entry = fakeEntry("notes.dsp");
            const vol = fakeVolume({ kind: "disk" as any, list: () => Promise.resolve([entry]) });
            const ctrl = new VolumeBrowserController({ volumes: [vol], onDelete });
            ctrl.open();
            await flush();
            const nameBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
            nameBtn.click();
            await flush();
            await flush();
            expect(document.querySelector(".vb-row-delete")).toBeNull();
        });

        it("calls onDelete with the volume and entry when the delete button is clicked", async () => {
            const onDelete = vi.fn();
            const entry = fakeEntry("main.dsp");
            const vol = fakeVolume({ list: () => Promise.resolve([entry]) });
            const ctrl = new VolumeBrowserController({ volumes: [vol], onDelete });
            ctrl.open();
            await flush();
            const rootBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
            rootBtn.click();
            await flush();
            await flush();
            const deleteBtn = document.querySelector(".vb-row-delete") as HTMLButtonElement;
            deleteBtn.click();
            await flush();
            await flush();
            expect(onDelete).toHaveBeenCalledWith(vol, entry);
        });

        it("re-renders after delete (re-calls vol.list)", async () => {
            const onDelete = vi.fn();
            const list = vi.fn().mockResolvedValue([fakeEntry("main.dsp")]);
            const vol = fakeVolume({ list });
            const ctrl = new VolumeBrowserController({ volumes: [vol], onDelete });
            ctrl.open();
            await flush();
            const rootBtn = document.querySelector(".vb-row-name-btn") as HTMLButtonElement;
            rootBtn.click();
            await flush();
            await flush();
            const listCallsBefore = list.mock.calls.length;
            const deleteBtn = document.querySelector(".vb-row-delete") as HTMLButtonElement;
            deleteBtn.click();
            await flush();
            await flush();
            expect(list.mock.calls.length).toBeGreaterThan(listCallsBefore);
        });
    });

});
