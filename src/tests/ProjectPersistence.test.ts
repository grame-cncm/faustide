import { describe, expect, it } from "vitest";
import { ProjectPersistence } from "../runtime/ProjectPersistence";

class BrowserFs {
    files = new Map<string, string | Uint8Array>();

    constructor(files: Record<string, string | Uint8Array> = {}) {
        Object.entries(files).forEach(([key, value]) => this.files.set(key, value));
    }

    async exists(path: string) {
        return this.files.has(path);
    }

    async readdir() {
        return [".", "..", ...this.files.keys()];
    }

    async readFile(path: string) {
        const value = this.files.get(path);
        return typeof value === "string" ? new TextEncoder().encode(value) : value;
    }

    async unlink(path: string) {
        this.files.delete(path);
    }

    async writeFile(path: string, data: string | Uint8Array) {
        this.files.set(path, data);
    }
}

class FaustFs {
    files = new Map<string, string | Uint8Array>();
    dirs: string[] = [];

    mkdir(path: string) {
        this.dirs.push(path);
    }

    writeFile(path: string, data: string | Uint8Array) {
        this.files.set(path, data);
    }

    rename() {
        return undefined;
    }

    unlink() {
        return undefined;
    }

    readdir() {
        return [];
    }

    isDir() {
        return false;
    }

    isFile() {
        return true;
    }

    stat() {
        return { mode: 2 };
    }

    readFile() {
        return "";
    }
}

describe("ProjectPersistence", () => {
    it("syncs BrowserFS files into the Faust FS when saveCode is enabled", async () => {
        const browserFS = new BrowserFs({ "main.dsp": "process = _;" });
        const faustFS = new FaustFs();
        const persistence = new ProjectPersistence({ browserFS: browserFS as any, faustFS: faustFS as any, projectDir: "/project/" });

        await persistence.loadProject(true);

        expect(faustFS.dirs).toEqual(["/project/"]);
        expect(Array.from(faustFS.files.keys())).toEqual(["/project/main.dsp"]);
        expect(Array.from(faustFS.files.get("/project/main.dsp") as Uint8Array)).toEqual(Array.from(new TextEncoder().encode("process = _;")));
    });

    it("leaves BrowserFS untouched when saveCode is disabled", async () => {
        const browserFS = new BrowserFs({ "main.dsp": "process = _;" });
        const faustFS = new FaustFs();
        const persistence = new ProjectPersistence({ browserFS: browserFS as any, faustFS: faustFS as any, projectDir: "/project/" });

        await persistence.loadProject(false);

        expect(browserFS.files.get("main.dsp")).toBe("process = _;");
        expect(faustFS.files.size).toBe(0);
    });

    it("saves by replacing existing BrowserFS files", async () => {
        const browserFS = new BrowserFs({ "main.dsp": "old" });
        const persistence = new ProjectPersistence({ browserFS: browserFS as any, faustFS: new FaustFs() as any, projectDir: "/project/" });

        await persistence.saveFile("main.dsp", "new");

        expect(browserFS.files.get("main.dsp")).toBe("new");
    });

    it("deletes BrowserFS files", async () => {
        const browserFS = new BrowserFs({ "main.dsp": "old" });
        const persistence = new ProjectPersistence({ browserFS: browserFS as any, faustFS: new FaustFs() as any, projectDir: "/project/" });

        await persistence.deleteFile("main.dsp");

        expect(browserFS.files.has("main.dsp")).toBe(false);
    });
});
