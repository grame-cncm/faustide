import { fireEvent } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { FileManager } from "../FileManager";

type StoredFile = string | Uint8Array;

class MemoryFs {
    files = new Map<string, StoredFile>();

    constructor(files: Record<string, StoredFile> = {}) {
        Object.entries(files).forEach(([name, content]) => this.files.set(name, content));
    }

    rename(oldPath: string, newPath: string) {
        const oldName = this.nameFromPath(oldPath);
        const newName = this.nameFromPath(newPath);
        if (!this.files.has(oldName) || this.files.has(newName)) throw new Error("rename failed");
        const value = this.files.get(oldName);
        this.files.delete(oldName);
        this.files.set(newName, value);
    }

    unlink(path: string) {
        this.files.delete(this.nameFromPath(path));
    }

    readdir() {
        return [".", "..", ...this.files.keys()];
    }

    mkdir() {
        return undefined;
    }

    isDir(mode: number) {
        return mode === 1;
    }

    isFile(mode: number) {
        return mode === 2;
    }

    stat(path: string) {
        if (!this.files.has(this.nameFromPath(path))) throw new Error("not found");
        return { mode: 2 };
    }

    writeFile(path: string, data: StoredFile) {
        this.files.set(this.nameFromPath(path), data);
    }

    readFile(path: string, opt?: { encoding?: string }) {
        const value = this.files.get(this.nameFromPath(path));
        if (opt && opt.encoding === "utf8" && value instanceof Uint8Array) return new TextDecoder().decode(value);
        return value;
    }

    private nameFromPath(path: string) {
        return path.replace(/^\.\//, "");
    }
}

const createContainer = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    return container;
};

const createManager = (files: Record<string, StoredFile> = {}, options: Partial<ConstructorParameters<typeof FileManager>[0]> = {}) => {
    const handlers = {
        selectHandler: vi.fn(),
        saveHandler: vi.fn(),
        deleteHandler: vi.fn(),
        mainFileChangeHandler: vi.fn()
    };
    const fs = new MemoryFs(files);
    const manager = new FileManager({
        container: createContainer(),
        fs: fs as any,
        path: "./",
        ...handlers,
        ...options
    });
    return { fs, handlers, manager };
};

const fileNames = (manager: FileManager) => Array.from(manager.divFiles.querySelectorAll(".filemanager-file")).map(element => (element as HTMLDivElement).dataset.filename);

describe("FileManager", () => {
    it("creates and selects untitled.dsp when the filesystem is empty", () => {
        const { fs, handlers, manager } = createManager();

        expect(fs.files.has("untitled.dsp")).toBe(true);
        expect(manager.selected).toBe("untitled.dsp");
        expect(manager.mainFileName).toBe("untitled.dsp");
        expect(handlers.selectHandler).toHaveBeenLastCalledWith("untitled.dsp", expect.stringContaining("stdfaust.lib"), expect.any(String));
    });

    it("selects the default file from the existing project", () => {
        const { manager } = createManager({ "main.dsp": "process = _;", "helper.lib": "foo = _;" }, { mainFile: "helper.lib" });

        expect(manager.selected).toBe("helper.lib");
        expect(manager.mainFileName).toBe("helper.lib");
    });

    it("creates unique untitledN.dsp names", () => {
        const { manager } = createManager({ "untitled1.dsp": "", "untitled2.dsp": "" });

        fireEvent.click(manager.btnNewFile);

        expect(fileNames(manager)).toContain("untitled3.dsp");
        expect(manager.selected).toBe("untitled3.dsp");
        expect(manager.mainFileName).toBe("untitled3.dsp");
    });

    it("sanitizes file names on rename and new file", () => {
        const { manager } = createManager({ "main.dsp": "process = _;" });

        expect(manager.newFile("bad name!.lib", "foo = _;")).toBe("badname.lib");
        manager.rename("badname.lib", "renamed_file.dsp");

        expect(fileNames(manager)).toContain("renamed_file.dsp");
        expect(manager.selected).toBe("renamed_file.dsp");
    });

    it("does not select audio files as editable code files", () => {
        const { manager } = createManager({ "main.dsp": "process = _;", "sound.wav": new Uint8Array([1, 2]) });

        manager.select("main.dsp");
        manager.select("sound.wav");

        expect(manager.selected).toBe("main.dsp");
    });

    it("updates the main DSP file only for non-audio files", () => {
        const { manager } = createManager({ "main.dsp": "process = _;", "sound.wav": new Uint8Array([1, 2]) });

        const mainBefore = manager.mainFileName;
        manager.setMain(manager.fileNames.indexOf("sound.wav"));
        expect(manager.mainFileName).toBe(mainBefore);

        manager.setMain(manager.fileNames.indexOf("main.dsp"));
        expect(manager.mainFileName).toBe("main.dsp");
    });

    it("deleting the last file recreates the default DSP", () => {
        const { manager } = createManager({ "main.dsp": "process = _;" });
        const deleteButton = manager.divFiles.querySelector(".filemanager-btn-delete") as HTMLButtonElement;

        fireEvent.click(deleteButton);

        expect(fileNames(manager)).toEqual(["untitled.dsp"]);
        expect(manager.selected).toBe("untitled.dsp");
        expect(manager.mainCode).toContain("stdfaust.lib");
    });

    it("calls select, save, delete, and main-file-change handlers with current behavior", () => {
        const { handlers, manager } = createManager({ "main.dsp": "process = _;" });

        manager.setValue("process = 1;");
        manager.renameSelected("next.dsp");
        manager.newFile("other.dsp", "process = 2;");
        manager.setMain(manager.fileNames.indexOf("other.dsp"));
        const deleteButton = manager.divFiles.querySelector("[data-filename='next.dsp'] .filemanager-btn-delete") as HTMLButtonElement;
        fireEvent.click(deleteButton);

        expect(handlers.selectHandler).toHaveBeenCalledWith("main.dsp", "process = 1;", expect.any(String));
        expect(handlers.saveHandler).toHaveBeenCalledWith("main.dsp", "process = 1;", expect.any(String));
        expect(handlers.deleteHandler).toHaveBeenCalledWith("main.dsp", expect.any(String));
        expect(handlers.mainFileChangeHandler).toHaveBeenCalledWith("other.dsp", "process = 2;");
    });

    const diskClass = (manager: FileManager, name: string) => {
        const div = manager.divFiles.querySelector(`[data-filename="${name}"]`) as HTMLDivElement;
        return div.classList.contains("filemanager-file--disk");
    };

    it("invokes onFileRestored with the file name when restoring from the trash", () => {
        const { manager } = createManager({ "main.dsp": "process = _;", "patch.dsp": "process = _;" });
        const onFileRestored = vi.fn();
        manager.onFileRestored = onFileRestored;

        manager.softDelete("patch.dsp");
        manager.restoreFile("patch.dsp");

        expect(onFileRestored).toHaveBeenCalledWith("patch.dsp");
    });

    it("lets onFileRestored re-apply the disk-tracked indicator after a trash round-trip", () => {
        const { manager } = createManager({ "main.dsp": "process = _;", "patch.dsp": "process = _;" });
        manager.setDiskTracked("patch.dsp", true);
        expect(diskClass(manager, "patch.dsp")).toBe(true);

        // Simulate the index.ts wiring: restore tracking for files with an origin.
        const tracked = new Set(["patch.dsp"]);
        manager.onFileRestored = (name) => { if (tracked.has(name)) manager.setDiskTracked(name, true); };

        manager.softDelete("patch.dsp");
        manager.restoreFile("patch.dsp");

        // The restored row is a fresh element, yet keeps its green status.
        expect(diskClass(manager, "patch.dsp")).toBe(true);
    });
});
