import { describe, expect, it, beforeEach } from "vitest";
import { DEFAULT_DSP_CODE, ProjectModel, TRASH_DIR } from "../model/ProjectModel";
import { LibraryVolume } from "../runtime/fs/LibraryVolume";

// ── NestedMemoryFs ─────────────────────────────────────────────────────────
// Full-fidelity fake that handles directory hierarchies so trash tests can
// exercise readdir per-directory and stat returning dir vs file modes.

type StoredFile = string | Uint8Array;

class NestedMemoryFs {
    private files = new Map<string, StoredFile>();
    private dirs = new Set<string>(["."]);

    constructor(initial: Record<string, StoredFile> = {}) {
        Object.entries(initial).forEach(([name, content]) => { this.files.set(name, content); });
    }

    rename(oldPath: string, newPath: string) {
        const oldKey = this.key(oldPath);
        const newKey = this.key(newPath);
        if (!this.files.has(oldKey)) throw new Error(`rename: not found: ${oldKey}`);
        const value = this.files.get(oldKey);
        this.files.delete(oldKey);
        this.files.set(newKey, value);
    }

    unlink(path: string) { this.files.delete(this.key(path)); }

    mkdir(path: string) { this.dirs.add(this.key(path)); }

    readdir(path: string): string[] {
        const prefix = this.key(path);
        const result: string[] = [".", ".."];
        this.files.forEach((_, k) => {
            const rel = prefix === "." ? k : (k.startsWith(`${prefix}/`) ? k.slice(prefix.length + 1) : null);
            if (rel && !rel.includes("/")) result.push(rel);
        });
        this.dirs.forEach((d) => {
            if (d === prefix || d === ".") return;
            const rel = prefix === "." ? d : (d.startsWith(`${prefix}/`) ? d.slice(prefix.length + 1) : null);
            if (rel && !rel.includes("/") && !result.includes(rel)) result.push(rel);
        });
        return result;
    }

    isDir(mode: number) { return mode === 1; }

    isFile(mode: number) { return mode === 2; }

    stat(path: string): { mode: number } {
        const k = this.key(path);
        if (this.files.has(k)) return { mode: 2 };
        if (this.dirs.has(k)) return { mode: 1 };
        throw new Error(`stat: not found: ${path}`);
    }

    writeFile(path: string, data: StoredFile) { this.files.set(this.key(path), data); }

    readFile(path: string, opt?: { encoding?: string }): StoredFile {
        const value = this.files.get(this.key(path));
        if (value === undefined) throw new Error(`readFile: not found: ${path}`);
        if (opt && opt.encoding === "utf8" && value instanceof Uint8Array) return new TextDecoder().decode(value);
        return value;
    }

    private key(path: string): string {
        const n = path.replace(/^\.\//, "").replace(/\/$/, "");
        return n === "" ? "." : n;
    }
}

// ── helpers ────────────────────────────────────────────────────────────────

function makeModel(files: Record<string, StoredFile> = { "main.dsp": "process = _;" }): ProjectModel {
    const fs = new NestedMemoryFs(files);
    const model = new ProjectModel({ fs: fs as any });
    model.listFiles();
    return model;
}

// ── softDeleteFile ─────────────────────────────────────────────────────────

describe("ProjectModel.softDeleteFile", () => {
    it("returns false for an unknown file", () => {
        expect(makeModel().softDeleteFile("missing.dsp")).toBe(false);
    });

    it("removes the file from fileList", () => {
        const model = makeModel({ "main.dsp": "a", "helper.lib": "b" });
        model.softDeleteFile("helper.lib");
        expect(model.fileList).not.toContain("helper.lib");
    });

    it("clears selectedFile when the deleted file was selected", () => {
        const model = makeModel();
        model.selectFile("main.dsp");
        model.softDeleteFile("main.dsp");
        expect(model.selectedFile).toBeNull();
    });

    it("soft-deleted file appears in listTrash()", () => {
        const model = makeModel();
        model.softDeleteFile("main.dsp");
        expect(model.listTrash()).toContain("main.dsp");
    });

    it("overwrites an existing trash entry (last delete wins)", () => {
        const model = makeModel({ "a.dsp": "v1", "b.dsp": "other" });
        model.softDeleteFile("a.dsp");
        // Restore so we can re-create and delete again with new content.
        model.restoreFile("a.dsp");
        model.fileList.push("a.dsp"); // already added by restoreFile
        // Create a new version and soft-delete again.
        const fs = (model as any).fs as NestedMemoryFs;
        fs.writeFile("./a.dsp", "v2");
        model.softDeleteFile("a.dsp");
        expect(model.listTrash()).toContain("a.dsp");
        expect(model.listTrash().filter(n => n === "a.dsp")).toHaveLength(1);
    });
});

// ── listTrash ──────────────────────────────────────────────────────────────

describe("ProjectModel.listTrash", () => {
    it("returns [] when nothing has been deleted", () => {
        expect(makeModel().listTrash()).toEqual([]);
    });

    it("lists only trashed files, not project files", () => {
        const model = makeModel({ "main.dsp": "a", "helper.lib": "b" });
        model.softDeleteFile("helper.lib");
        expect(model.listTrash()).toEqual(["helper.lib"]);
        expect(model.listTrash()).not.toContain("main.dsp");
    });
});

// ── restoreFile ────────────────────────────────────────────────────────────

describe("ProjectModel.restoreFile", () => {
    it("returns false when file is not in trash", () => {
        expect(makeModel().restoreFile("ghost.dsp")).toBe(false);
    });

    it("returns false when a same-named file already exists in the project", () => {
        const model = makeModel({ "main.dsp": "a", "other.dsp": "b" });
        model.softDeleteFile("other.dsp");
        // Now add another file named other.dsp directly.
        const fs = (model as any).fs as NestedMemoryFs;
        fs.writeFile("./other.dsp", "new");
        model.fileList.push("other.dsp");
        expect(model.restoreFile("other.dsp")).toBe(false);
    });

    it("round-trips: soft-delete then restore brings the file back", () => {
        const model = makeModel({ "main.dsp": "a", "helper.lib": "b" });
        model.softDeleteFile("helper.lib");
        model.restoreFile("helper.lib");
        expect(model.fileList).toContain("helper.lib");
        expect(model.listTrash()).not.toContain("helper.lib");
    });
});

// ── purgeFile ─────────────────────────────────────────────────────────────

describe("ProjectModel.purgeFile", () => {
    it("returns false when file is not in trash", () => {
        expect(makeModel().purgeFile("ghost.dsp")).toBe(false);
    });

    it("permanently removes a file from the trash", () => {
        const model = makeModel();
        model.softDeleteFile("main.dsp");
        model.purgeFile("main.dsp");
        expect(model.listTrash()).not.toContain("main.dsp");
    });

    it("purged file cannot be restored", () => {
        const model = makeModel();
        model.softDeleteFile("main.dsp");
        model.purgeFile("main.dsp");
        expect(model.restoreFile("main.dsp")).toBe(false);
    });
});

// ── emptyTrash ────────────────────────────────────────────────────────────

describe("ProjectModel.emptyTrash", () => {
    it("removes all files from the trash", () => {
        const model = makeModel({ "a.dsp": "a", "b.lib": "b" });
        model.softDeleteFile("a.dsp");
        model.softDeleteFile("b.lib");
        model.emptyTrash();
        expect(model.listTrash()).toEqual([]);
    });

    it("is a no-op on an empty trash", () => {
        expect(() => makeModel().emptyTrash()).not.toThrow();
    });
});

// ── recreate default on empty project ─────────────────────────────────────

describe("ProjectModel soft-delete preserves 'recreate default' invariant", () => {
    it("ensureSelectionAfterDelete still creates a default file when fileList empties", () => {
        const model = makeModel({ "main.dsp": "process = _;", "other.dsp": "process = 1;" });
        model.softDeleteFile("main.dsp");
        model.softDeleteFile("other.dsp");
        const { fileName, createdDefaultFile } = model.ensureSelectionAfterDelete();
        expect(createdDefaultFile).toBe(true);
        expect(fileName).toBe("untitled.dsp");
        // Default DSP code written to the FS.
        const value = (model as any).fs.readFile("./untitled.dsp", { encoding: "utf8" });
        expect(value).toBe(DEFAULT_DSP_CODE);
    });
});

// ── LibraryVolume trash listing ────────────────────────────────────────────

describe("LibraryVolume trash listing", () => {
    let model: ProjectModel;
    let vol: LibraryVolume;

    beforeEach(() => {
        model = makeModel({ "main.dsp": "a", "helper.lib": "b" });
        vol = new LibraryVolume(model);
    });

    it("root listing does NOT include a Trash entry when trash is empty", async () => {
        const entries = await vol.list("");
        expect(entries.find(e => e.name === "Trash")).toBeUndefined();
    });

    it("root listing includes a Trash dir entry when trash is non-empty", async () => {
        model.softDeleteFile("helper.lib");
        const entries = await vol.list("");
        const trash = entries.find(e => e.name === "Trash");
        expect(trash).toBeDefined();
        expect(trash?.type).toBe("dir");
        expect(trash?.path).toBe(TRASH_DIR);
    });

    it("listing TRASH_DIR path returns trashed files", async () => {
        model.softDeleteFile("helper.lib");
        const entries = await vol.list(TRASH_DIR);
        expect(entries).toHaveLength(1);
        expect(entries[0].name).toBe("helper.lib");
        expect(entries[0].type).toBe("file");
    });

    it("trashed file does NOT appear in root listing", async () => {
        model.softDeleteFile("helper.lib");
        const entries = await vol.list("");
        expect(entries.find(e => e.name === "helper.lib")).toBeUndefined();
    });

    it("Trash entry disappears after emptyTrash()", async () => {
        model.softDeleteFile("helper.lib");
        model.emptyTrash();
        const entries = await vol.list("");
        expect(entries.find(e => e.name === "Trash")).toBeUndefined();
    });
});
