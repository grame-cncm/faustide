import type { TFileSystem } from "../model/ProjectModel";

/**
 * Promise-based BrowserFS/ZenFS subset used for durable project storage.
 */
type BrowserFsPromises = {
    exists: (path: string) => Promise<boolean>;
    readdir: (path: string) => Promise<string[]>;
    readFile: (path: string) => Promise<Uint8Array | ArrayBufferView>;
    unlink: (path: string) => Promise<any>;
    writeFile: (path: string, data: string | Uint8Array, options?: { encoding?: string }) => Promise<any>;
};

/**
 * Synchronizes project files between durable BrowserFS storage and the Faust
 * compiler virtual filesystem.
 *
 * BrowserFS stores the user's project across sessions; Faust's filesystem is
 * the transient runtime view used by compilation. This service keeps those
 * concerns out of the file manager and index orchestration code.
 */
export class ProjectPersistence {
    browserFS: BrowserFsPromises;
    faustFS: TFileSystem;
    projectDir: string;

    constructor(options: { browserFS: BrowserFsPromises; faustFS: TFileSystem; projectDir: string }) {
        this.browserFS = options.browserFS;
        this.faustFS = options.faustFS;
        this.projectDir = options.projectDir;
    }

    /**
     * Loads all persisted project files into Faust FS when code saving is
     * enabled. When saving is disabled, it clears BrowserFS to preserve the
     * previous runtime behavior.
     */
    async loadProject(saveCode: boolean) {
        this.faustFS.mkdir(this.projectDir);
        let files = await this.browserFS.readdir("/");
        files = files.filter(n => n !== "." && n !== "..");
        if (!saveCode) {
            await this.clearProject(files);
            return;
        }
        await Promise.all(files.map(async (filename) => {
            const data = await this.browserFS.readFile(filename);
            this.faustFS.writeFile(this.projectDir + filename, new Uint8Array(data.buffer));
        }));
    }

    /**
     * Replaces a persisted project file. BrowserFS is updated via unlink/write
     * to match the old persistence path and avoid append/overwrite ambiguity.
     */
    async saveFile(fileName: string, content: string | Uint8Array) {
        const exist = await this.browserFS.exists(fileName);
        if (exist) await this.browserFS.unlink(fileName);
        await this.browserFS.writeFile(fileName, content, typeof content === "string" ? { encoding: "utf8" } : {});
    }

    /**
     * Removes a persisted project file from BrowserFS.
     */
    async deleteFile(fileName: string) {
        if (await this.browserFS.exists(fileName)) await this.browserFS.unlink(fileName);
    }

    /**
     * Clears BrowserFS project files, optionally using a precomputed directory
     * listing to avoid a second `readdir` during startup.
     */
    async clearProject(files?: string[]) {
        const fileList = files || (await this.browserFS.readdir("/")).filter(n => n !== "." && n !== "..");
        await Promise.all(fileList.map(filename => this.browserFS.unlink(filename)));
    }
}
