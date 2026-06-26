import { describe, it, expect, beforeEach } from "vitest";
import { ProjectModel } from "../model/ProjectModel";
import { LibraryVolume } from "../runtime/fs/LibraryVolume";

// Minimal in-memory filesystem — reused from ProjectModel.test.ts pattern.
type StoredFile = string | Uint8Array;

class MemoryFs {
    files = new Map<string, StoredFile>();

    constructor(files: Record<string, StoredFile> = {}) {
        Object.entries(files).forEach(([n, c]) => this.files.set(n, c));
    }

    rename(oldPath: string, newPath: string) {
        const from = this.name(oldPath);
        const to = this.name(newPath);
        if (!this.files.has(from) || this.files.has(to)) throw new Error("rename failed");
        const v = this.files.get(from);
        this.files.delete(from);
        this.files.set(to, v);
    }

    unlink(p: string) { this.files.delete(this.name(p)); }
    readdir() { return [".", "..", ...this.files.keys()]; }
    mkdir() { return undefined; }
    isDir(m: number) { return m === 1; }
    isFile(m: number) { return m === 2; }
    stat(p: string) { if (!this.files.has(this.name(p))) throw new Error("not found"); return { mode: 2 }; }
    writeFile(p: string, data: StoredFile) { this.files.set(this.name(p), data); }
    readFile(p: string, opt?: { encoding?: string }) {
        const v = this.files.get(this.name(p));
        if (opt?.encoding === "utf8" && v instanceof Uint8Array) return new TextDecoder().decode(v);
        return v;
    }

    private name(p: string) { return p.replace(/^\.\//, ""); }
}

function makeVolume(files: Record<string, string> = {}) {
    const fs = new MemoryFs(files);
    const model = new ProjectModel({ fs: fs as any, path: "./" });
    return new LibraryVolume(model);
}

describe("LibraryVolume", () => {
    it("state() always resolves to 'ready'", async () => {
        const vol = makeVolume();
        expect(await vol.state()).toBe("ready");
    });

    it("has id='library', kind='library', label='Library'", () => {
        const vol = makeVolume();
        expect(vol.id).toBe("library");
        expect(vol.kind).toBe("library");
        expect(vol.label).toBe("Library");
    });

    describe("list('')", () => {
        let vol: LibraryVolume;
        beforeEach(() => {
            vol = makeVolume({
                "reverb.dsp": "process = _;",
                "filters.lib": "// lib",
                "kick.wav": ""
            });
        });

        it("returns all project files at the root", async () => {
            const entries = await vol.list("");
            const names = entries.map(e => e.name).sort();
            expect(names).toEqual(["filters.lib", "kick.wav", "reverb.dsp"]);
        });

        it("marks .dsp files as native", async () => {
            const entries = await vol.list("");
            const dsp = entries.find(e => e.name === "reverb.dsp");
            expect(dsp?.isNative).toBe(true);
        });

        it("marks .lib files as native", async () => {
            const entries = await vol.list("");
            const lib = entries.find(e => e.name === "filters.lib");
            expect(lib?.isNative).toBe(true);
        });

        it("marks audio files as non-native", async () => {
            const entries = await vol.list("");
            const wav = entries.find(e => e.name === "kick.wav");
            expect(wav?.isNative).toBe(false);
        });

        it("sorts entries: .lib before .wav alphabetically", async () => {
            const entries = await vol.list("");
            const names = entries.map(e => e.name);
            // all files → alphabetical (no dirs)
            expect(names.indexOf("filters.lib")).toBeLessThan(names.indexOf("kick.wav"));
        });

        it("sets path equal to name (flat namespace)", async () => {
            const entries = await vol.list("");
            entries.forEach(e => expect(e.path).toBe(e.name));
        });

        it("sets type='file' for all entries", async () => {
            const entries = await vol.list("");
            entries.forEach(e => expect(e.type).toBe("file"));
        });

        it("returns [] for any non-root path", async () => {
            expect(await vol.list("samples")).toHaveLength(0);
            expect(await vol.list("sub/dir")).toHaveLength(0);
        });
    });

    describe("readText", () => {
        it("returns the file content as a string", async () => {
            const vol = makeVolume({ "main.dsp": "process = +;" });
            expect(await vol.readText("main.dsp")).toBe("process = +;");
        });

        it("rejects for audio (binary) files", async () => {
            const fs = new MemoryFs({ "kick.wav": new Uint8Array([0, 1, 2]) });
            const model = new ProjectModel({ fs: fs as any, path: "./" });
            const vol = new LibraryVolume(model);
            await expect(vol.readText("kick.wav")).rejects.toThrow();
        });
    });
});
