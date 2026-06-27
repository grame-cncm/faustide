import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectFilesController } from "../ui/ProjectFilesController";

const createFileManager = () => ({
    fileNames: ["main.dsp", "lib.lib"],
    mainFileName: "main.dsp",
    mainFileNameWithoutSuffix: "main",
    mainCode: "process = _;",
    newFile: vi.fn((name: string) => name),
    getValue: vi.fn((name: string) => name === "main.dsp" ? "process = _;" : "foo = _;")
});

const createZip = () => ({
    file: vi.fn(),
    generateAsync: vi.fn(async () => new Blob(["zip"], { type: "application/zip" }))
});

const setupDom = () => {
    document.body.innerHTML = `
        <button id="btn-save"></button>
        <a id="a-save"></a>
        <a id="a-docs"></a>
        <div id="top"></div>
        <div id="editor-overlay"></div>
    `;
};

const flush = async () => {
    await Promise.resolve();
    await Promise.resolve();
    await new Promise(resolve => setTimeout(resolve, 0));
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
        await flush();

        expect(fileManager.newFile).toHaveBeenCalledWith("dropfile.dsp", "dropped = _;");
    });

    it("imports every file dropped through the editor overlay", async () => {
        const fileManager = createFileManager();
        const readFileAsText = vi.fn(async (file: File) => `${file.name} content`);
        new ProjectFilesController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            createZip: createZip as any,
            readFileAsText,
            runDsp: vi.fn(),
            updateDiagram: vi.fn()
        }).bind();
        const event = $.Event("drop");
        event.originalEvent = {
            dataTransfer: {
                files: [
                    new File([""], "first file.dsp"),
                    new File([""], "second.lib")
                ]
            },
            preventDefault: vi.fn(),
            stopPropagation: vi.fn()
        } as any;

        $("#editor-overlay").trigger(event);
        await flush();

        expect(fileManager.newFile).toHaveBeenCalledWith("firstfile.dsp", "first file.dsp content");
        expect(fileManager.newFile).toHaveBeenCalledWith("second.lib", "second.lib content");
    });

    it("passes each dropped file handle to disk tracking after import", async () => {
        const fileManager = createFileManager();
        const onDroppedFileHandle = vi.fn();
        const handleA = { kind: "file", name: "first.dsp" } as FileSystemFileHandle;
        const handleB = { kind: "file", name: "second.lib" } as FileSystemFileHandle;
        new ProjectFilesController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            createZip: createZip as any,
            readFileAsText: vi.fn(async () => "content"),
            runDsp: vi.fn(),
            updateDiagram: vi.fn(),
            onDroppedFileHandle
        }).bind();
        const event = $.Event("drop");
        event.originalEvent = {
            dataTransfer: {
                files: [
                    new File([""], "first file.dsp"),
                    new File([""], "second.lib")
                ],
                items: [
                    { kind: "file", getAsFileSystemHandle: vi.fn().mockResolvedValue(handleA) },
                    { kind: "file", getAsFileSystemHandle: vi.fn().mockResolvedValue(handleB) }
                ]
            },
            preventDefault: vi.fn(),
            stopPropagation: vi.fn()
        } as any;

        $("#editor-overlay").trigger(event);
        await flush();

        expect(onDroppedFileHandle).toHaveBeenCalledWith("firstfile.dsp", handleA);
        expect(onDroppedFileHandle).toHaveBeenCalledWith("second.lib", handleB);
    });

    it("runs DSP after importing a dropped file when realtime mode has an active DSP", async () => {
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
        const event = $.Event("drop");
        event.originalEvent = {
            dataTransfer: { files: [new File([""], "main.dsp")] },
            preventDefault: vi.fn(),
            stopPropagation: vi.fn()
        } as any;

        $("#editor-overlay").trigger(event);
        await flush();

        expect(runDsp).toHaveBeenCalledWith("process = _;");
    });

    it("updates diagram after importing a dropped file in realtime mode without active DSP", async () => {
        const updateDiagram = vi.fn();
        const fileManager = createFileManager();
        new ProjectFilesController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: true } as any,
            audioEnv: { dsp: undefined } as any,
            createZip: createZip as any,
            readFileAsText: vi.fn(async () => "imported = _;"),
            runDsp: vi.fn(),
            updateDiagram
        }).bind();
        const event = $.Event("drop");
        event.originalEvent = {
            dataTransfer: { files: [new File([""], "bad name!.dsp")] },
            preventDefault: vi.fn(),
            stopPropagation: vi.fn()
        } as any;

        $("#editor-overlay").trigger(event);
        await flush();

        expect(fileManager.newFile).toHaveBeenCalledWith("badname.dsp", "imported = _;");
        expect(updateDiagram).toHaveBeenCalledWith("process = _;");
    });
});
