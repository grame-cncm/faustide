import { beforeEach, describe, expect, it, vi } from "vitest";
import { FileManager } from "../../src/FileManager";

type FileContent = string | Uint8Array;

const createFs = (initial: Record<string, FileContent>) => {
    const files = new Map<string, FileContent>(Object.entries(initial));

    const normalisePath = (path: string = "./") => (path.startsWith("./") ? path : `./${path}`);

    return {
        rename: vi.fn((oldName: string, newName: string) => {
            const oldPath = normalisePath(oldName);
            const newPath = normalisePath(newName);
            if (!files.has(oldPath)) throw new Error(`Missing file ${oldPath}`);
            const content = files.get(oldPath);
            files.delete(oldPath);
            files.set(newPath, content);
        }),
        unlink: vi.fn((name: string) => {
            const key = normalisePath(name);
            files.delete(key);
        }),
        readdir: vi.fn((path: string) => {
            const prefix = normalisePath(path);
            return Array.from(files.keys())
                .filter(key => key.startsWith(prefix))
                .map(key => key.slice(prefix.length));
        }),
        mkdir: vi.fn(),
        isDir: vi.fn(() => false),
        isFile: vi.fn(() => true),
        stat: vi.fn((path: string) => ({ mode: 0, path })),
        writeFile: vi.fn((path: string, data: string | ArrayBufferView) => {
            const key = normalisePath(path);
            if (typeof data === "string") {
                files.set(key, data);
            } else if (data instanceof Uint8Array) {
                files.set(key, new Uint8Array(data));
            } else {
                files.set(key, new Uint8Array(data.buffer));
            }
        }),
        readFile: vi.fn((path: string, options?: { encoding?: string }) => {
            const key = normalisePath(path);
            const content = files.get(key);
            if (typeof content === "string") return content;
            if (content instanceof Uint8Array) {
                if (options?.encoding === "utf8") return new TextDecoder().decode(content);
                return content;
            }
            return "";
        })
    };
};

describe("FileManager integration", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        document.body.innerHTML = "";
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    it("initialises from filesystem and selects the main DSP", () => {
        const selectHandler = vi.fn();
        const saveHandler = vi.fn();
        const mainFileChangeHandler = vi.fn();

        const fs = createFs({
            "./main.dsp": "process = 1;",
            "./aux.dsp": "process = 2;",
            "./notes.txt": "Notes"
        });

        const manager = new FileManager({
            container,
            fs,
            path: "./",
            mainFile: "main.dsp",
            selectHandler,
            saveHandler,
            mainFileChangeHandler
        });

        expect(selectHandler).toHaveBeenCalled();
        const [selectedName, selectedContent] = selectHandler.mock.calls.at(-1) ?? [];
        expect(selectedName).toBe("main.dsp");
        expect(selectedContent).toBe("process = 1;");

        expect(mainFileChangeHandler).toHaveBeenCalledWith("main.dsp", "process = 1;");

        const mainRow = container.querySelector('[data-filename="main.dsp"]');
        expect(mainRow).toBeTruthy();
        expect(mainRow?.classList.contains("selected")).toBe(true);
        const mainButton = mainRow?.querySelector(".filemanager-btn-main");
        expect(mainButton?.classList.contains("active")).toBe(true);

        expect(manager.mainFileNameWithoutSuffix).toBe("main");
    });

    it("creates a new DSP file and promotes it as main", () => {
        const selectHandler = vi.fn();
        const saveHandler = vi.fn();

        const fs = createFs({
            "./main.dsp": "process = 1;"
        });

        const manager = new FileManager({
            container,
            fs,
            path: "./",
            mainFile: "main.dsp",
            selectHandler,
            saveHandler
        });

        selectHandler.mockClear();
        saveHandler.mockClear();

        const created = manager.newFile("custom.dsp", "content");

        expect(created).toBe("custom.dsp");
        expect(fs.writeFile).toHaveBeenCalledWith("./custom.dsp", "content");
        expect(saveHandler).toHaveBeenCalledWith("custom.dsp", "content", "process = 1;");
        expect(manager.mainFileName).toBe("custom.dsp");
        expect(manager.mainFileNameWithoutSuffix).toBe("custom");

        const lastSelect = selectHandler.mock.calls.at(-1) ?? [];
        expect(lastSelect[0]).toBe("custom.dsp");
        expect(lastSelect[1]).toBe("content");
    });
});
