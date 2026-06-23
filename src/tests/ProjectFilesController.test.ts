import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectFilesController } from "../ui/ProjectFilesController";

const createFileManager = () => ({
    _fileList: ["main.dsp", "lib.lib"],
    mainFileNameWithoutSuffix: "main",
    mainCode: "process = _;",
    newFile: vi.fn(),
    getValue: vi.fn((name: string) => name === "main.dsp" ? "process = _;" : "foo = _;")
});

const createZip = () => ({
    file: vi.fn(),
    generateAsync: vi.fn(async () => new Blob(["zip"], { type: "application/zip" }))
});

const setupDom = () => {
    document.body.innerHTML = `
        <button id="btn-upload"></button>
        <input id="input-upload" type="file" />
        <button id="btn-save"></button>
        <a id="a-save"></a>
        <a id="a-docs"></a>
        <div id="top"></div>
        <div id="editor-overlay"></div>
    `;
};

describe("ProjectFilesController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.stubGlobal("URL", {
            createObjectURL: vi.fn(() => "blob:project"),
            revokeObjectURL: vi.fn()
        });
        setupDom();
    });

    it("forwards the upload button to the hidden file input", () => {
        const click = vi.fn();
        $("#input-upload")[0].click = click;
        new ProjectFilesController({
            fileManager: createFileManager() as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            createZip: createZip as any,
            readFileAsText: vi.fn(),
            runDsp: vi.fn(),
            updateDiagram: vi.fn()
        }).bind();

        $("#btn-upload").trigger("click");

        expect(click).toHaveBeenCalledTimes(1);
    });

    it("imports uploaded files with sanitized names and updates the diagram in realtime mode", async () => {
        const fileManager = createFileManager();
        const updateDiagram = vi.fn();
        new ProjectFilesController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: true } as any,
            audioEnv: { dsp: undefined } as any,
            createZip: createZip as any,
            readFileAsText: vi.fn(async () => "imported = _;"),
            runDsp: vi.fn(),
            updateDiagram
        }).bind();
        const file = new File(["ignored"], "bad name!.dsp");
        Object.defineProperty($<HTMLInputElement>("#input-upload")[0], "files", { value: [file] });

        $("#input-upload").trigger("input");
        await Promise.resolve();

        expect(fileManager.newFile).toHaveBeenCalledWith("badname.dsp", "imported = _;");
        expect(updateDiagram).toHaveBeenCalledWith("process = _;");
    });

    it("runs DSP after importing when realtime mode has an active DSP", async () => {
        const runDsp = vi.fn();
        new ProjectFilesController({
            fileManager: createFileManager() as any,
            compileOptions: { realtimeCompile: true } as any,
            audioEnv: { dsp: {} } as any,
            createZip: createZip as any,
            readFileAsText: vi.fn(async () => "process = 1;"),
            runDsp,
            updateDiagram: vi.fn()
        }).bind();
        Object.defineProperty($<HTMLInputElement>("#input-upload")[0], "files", { value: [new File([""], "main.dsp")] });

        $("#input-upload").trigger("input");
        await Promise.resolve();

        expect(runDsp).toHaveBeenCalledWith("process = _;");
    });

    it("saves all project files to a ZIP download", async () => {
        const fileManager = createFileManager();
        const zip = createZip();
        const click = vi.fn();
        $("#a-save")[0].click = click;
        new ProjectFilesController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            createZip: () => zip as any,
            readFileAsText: vi.fn(),
            runDsp: vi.fn(),
            updateDiagram: vi.fn()
        }).bind();

        $("#btn-save").trigger("click");
        await Promise.resolve();

        expect(zip.file).toHaveBeenCalledWith("main.dsp", "process = _;");
        expect(zip.file).toHaveBeenCalledWith("lib.lib", "foo = _;");
        expect(zip.generateAsync).toHaveBeenCalledWith({ type: "blob" });
        expect($("#a-save").attr("href")).toBe("blob:project");
        expect($("#a-save").attr("download")).toBe("main.zip");
        expect(click).toHaveBeenCalledTimes(1);
    });

    it("imports dropped files through the editor overlay", async () => {
        const fileManager = createFileManager();
        new ProjectFilesController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            createZip: createZip as any,
            readFileAsText: vi.fn(async () => "dropped = _;"),
            runDsp: vi.fn(),
            updateDiagram: vi.fn()
        }).bind();
        const event = $.Event("drop");
        event.originalEvent = {
            dataTransfer: { files: [new File([""], "drop file.dsp")] },
            preventDefault: vi.fn(),
            stopPropagation: vi.fn()
        } as any;

        $("#editor-overlay").trigger(event);
        await Promise.resolve();

        expect(fileManager.newFile).toHaveBeenCalledWith("dropfile.dsp", "dropped = _;");
    });
});
