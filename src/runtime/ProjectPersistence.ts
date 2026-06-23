import type { TFileSystem } from "../model/ProjectModel";

type BrowserFsPromises = {
    exists: (path: string) => Promise<boolean>;
    readdir: (path: string) => Promise<string[]>;
    readFile: (path: string) => Promise<Uint8Array | ArrayBufferView>;
    unlink: (path: string) => Promise<any>;
    writeFile: (path: string, data: string | Uint8Array, options?: { encoding?: string }) => Promise<any>;
};

export class ProjectPersistence {
    browserFS: BrowserFsPromises;
    faustFS: TFileSystem;
    projectDir: string;

    constructor(options: { browserFS: BrowserFsPromises; faustFS: TFileSystem; projectDir: string }) {
        this.browserFS = options.browserFS;
        this.faustFS = options.faustFS;
        this.projectDir = options.projectDir;
    }

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

    async saveFile(fileName: string, content: string | Uint8Array) {
        const exist = await this.browserFS.exists(fileName);
        if (exist) await this.browserFS.unlink(fileName);
        await this.browserFS.writeFile(fileName, content, typeof content === "string" ? { encoding: "utf8" } : {});
    }

    async deleteFile(fileName: string) {
        await this.browserFS.unlink(fileName);
    }

    async clearProject(files?: string[]) {
        const fileList = files || (await this.browserFS.readdir("/")).filter(n => n !== "." && n !== "..");
        await Promise.all(fileList.map(filename => this.browserFS.unlink(filename)));
    }
}
