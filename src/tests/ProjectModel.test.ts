import { describe, expect, it } from "vitest";
import { DEFAULT_DSP_CODE, ProjectModel } from "../model/ProjectModel";

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

describe("ProjectModel", () => {
    it("loads file list from the filesystem", () => {
        const model = new ProjectModel({ fs: new MemoryFs({ "main.dsp": "", "sound.wav": new Uint8Array([1]) }) as any });

        expect(model.listFiles()).toEqual(["main.dsp", "sound.wav"]);
    });

    it("sanitizes names and creates unique fallback names", () => {
        const model = new ProjectModel({ fs: new MemoryFs({ "badname.dsp": "", "untitled1.dsp": "" }) as any });
        model.listFiles();

        expect(ProjectModel.sanitizeFileName("bad name!.dsp")).toBe("badname.dsp");
        expect(model.createFile("bad name!.dsp", "")).toBe("untitled2.dsp");
    });

    it("creates the default DSP file", () => {
        const fs = new MemoryFs();
        const model = new ProjectModel({ fs: fs as any });

        expect(model.createDefaultFile()).toBe("untitled.dsp");
        expect(fs.files.get("untitled.dsp")).toBe(DEFAULT_DSP_CODE);
    });

    it("loads project files and creates a default DSP for empty projects", () => {
        const fs = new MemoryFs();
        const model = new ProjectModel({ fs: fs as any });

        expect(model.loadProjectFiles()).toEqual({
            fileList: ["untitled.dsp"],
            createdDefaultFile: true
        });
        expect(fs.files.get("untitled.dsp")).toBe(DEFAULT_DSP_CODE);
    });

    it("selects and sets main files only for non-audio files", () => {
        const model = new ProjectModel({ fs: new MemoryFs({ "main.dsp": "process = _;", "sound.wav": new Uint8Array([1]) }) as any });
        model.listFiles();

        expect(model.selectFile("sound.wav")).toBe(false);
        expect(model.selectedFile).toBeNull();
        expect(model.selectFile("main.dsp")).toBe(true);
        expect(model.selectedFile).toBe("main.dsp");

        expect(model.setMainFile(1)).toBe(false);
        expect(model.mainFileName).toBe("main.dsp");
    });

    it("sets the main file by saved name with a fallback to the first project file", () => {
        const model = new ProjectModel({ fs: new MemoryFs({ "main.dsp": "process = _;", "helper.lib": "foo = _;" }) as any });
        model.listFiles();

        expect(model.setMainFileByName("helper.lib")).toBe(true);
        expect(model.mainFileName).toBe("helper.lib");
        expect(model.setMainFileByName("missing.dsp")).toBe(true);
        expect(model.mainFileName).toBe("main.dsp");
    });

    it("renames, deletes, saves, and reads project files", () => {
        const fs = new MemoryFs({ "main.dsp": "process = _;" });
        const model = new ProjectModel({ fs: fs as any });
        model.listFiles();
        model.selectFile("main.dsp");

        expect(model.renameFile("main.dsp", "next.dsp")).toBe("next.dsp");
        expect(model.selectedFile).toBe("next.dsp");
        expect(model.saveFile("next.dsp", "process = 1;")).toBe(true);
        expect(model.getValue("next.dsp")).toBe("process = 1;");
        expect(model.deleteFile("next.dsp")).toBe(true);
        expect(model.fileList).toEqual([]);
        expect(fs.files.has("next.dsp")).toBe(false);
        expect(fs.files.has("__trash__/next.dsp")).toBe(false);
    });

    it("deleteFile is permanent and cannot restore from a secondary lifecycle", () => {
        const fs = new MemoryFs({ "main.dsp": "process = _;", "other.dsp": "process = 1;" });
        const model = new ProjectModel({ fs: fs as any });
        model.listFiles();

        expect(model.deleteFile("other.dsp")).toBe(true);

        expect(model.fileList).toEqual(["main.dsp"]);
        expect(fs.files.has("other.dsp")).toBe(false);
        expect(fs.files.has("__trash__/other.dsp")).toBe(false);
    });

    it("chooses the next selection after deletion and recreates defaults when empty", () => {
        const fs = new MemoryFs({ "main.dsp": "process = _;", "other.dsp": "process = 1;" });
        const model = new ProjectModel({ fs: fs as any });
        model.listFiles();
        model.deleteFile("main.dsp");

        expect(model.ensureSelectionAfterDelete()).toEqual({
            fileName: "other.dsp",
            createdDefaultFile: false
        });

        model.deleteFile("other.dsp");
        expect(model.ensureSelectionAfterDelete()).toEqual({
            fileName: "untitled.dsp",
            createdDefaultFile: true
        });
        expect(fs.files.get("untitled.dsp")).toBe(DEFAULT_DSP_CODE);
    });
});
