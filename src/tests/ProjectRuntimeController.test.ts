import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectRuntimeController } from "../ui/ProjectRuntimeController";

const bindController = (overrides: any = {}) => {
    const options = {
        compileOptions: {
            realtimeCompile: false,
            mainFile: "main.dsp",
            ...overrides.compileOptions
        },
        audioEnv: {
            ...overrides.audioEnv
        },
        projectPersistence: {
            saveFile: vi.fn(async () => undefined),
            deleteFile: vi.fn(async () => undefined)
        },
        alertController: { show: vi.fn() },
        saveEditorParams: vi.fn(),
        runDsp: vi.fn(async () => ({ success: true })),
        updateDiagram: vi.fn(() => ({ success: true })),
        ...overrides.options
    };
    const controller = new ProjectRuntimeController(options as any);
    const handlers = controller.createFileManagerHandlers(vi.fn());
    return { controller, handlers, options };
};

describe("ProjectRuntimeController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.useFakeTimers();
    });

    it("debounces file persistence from FileManager save callbacks", async () => {
        const { handlers, options } = bindController();

        handlers.saveHandler("main.dsp", "process = _;", "main code");
        handlers.saveHandler("main.dsp", "process = 1;", "main code");
        vi.advanceTimersByTime(1000);
        await Promise.resolve();

        expect(options.projectPersistence.saveFile).toHaveBeenCalledTimes(1);
        expect(options.projectPersistence.saveFile).toHaveBeenCalledWith("main.dsp", "process = 1;");
    });

    it("keeps independent pending saves for different files", async () => {
        const { handlers, options } = bindController();

        handlers.saveHandler("first.dsp", "process = _;", "main code");
        handlers.saveHandler("second.lib", "foo = _;", "main code");
        vi.advanceTimersByTime(1000);
        await Promise.resolve();

        expect(options.projectPersistence.saveFile).toHaveBeenCalledTimes(2);
        expect(options.projectPersistence.saveFile).toHaveBeenCalledWith("first.dsp", "process = _;");
        expect(options.projectPersistence.saveFile).toHaveBeenCalledWith("second.lib", "foo = _;");
    });

    it("shows persistence errors through the alert controller", async () => {
        const error = new Error("storage failed");
        const { handlers, options } = bindController({
            options: {
                projectPersistence: {
                    saveFile: vi.fn(async () => { throw error; }),
                    deleteFile: vi.fn(async () => undefined)
                }
            }
        });

        handlers.saveHandler("main.dsp", "process = _;", "main code");
        vi.advanceTimersByTime(1000);
        await Promise.resolve();

        expect(options.alertController.show).toHaveBeenCalledWith(error);
    });

    it("schedules realtime diagram refresh when no DSP is active", () => {
        const { handlers, options } = bindController({
            compileOptions: { realtimeCompile: true }
        });

        handlers.saveHandler("main.dsp", "process = _;", "main code");
        vi.advanceTimersByTime(1000);

        expect(options.updateDiagram).toHaveBeenCalledWith("main code");
        expect(options.runDsp).not.toHaveBeenCalled();
    });

    it("schedules realtime DSP recompilation when a DSP is active", () => {
        const { handlers, options } = bindController({
            compileOptions: { realtimeCompile: true },
            audioEnv: { dsp: {} }
        });

        handlers.saveHandler("main.dsp", "process = _;", "main code");
        vi.advanceTimersByTime(1000);

        expect(options.runDsp).toHaveBeenCalledWith("main code");
        expect(options.updateDiagram).not.toHaveBeenCalled();
    });

    it("persists main file changes and schedules realtime refresh quickly", () => {
        const { handlers, options } = bindController({
            compileOptions: { realtimeCompile: true }
        });

        handlers.mainFileChangeHandler("other.dsp", "other code");
        vi.advanceTimersByTime(100);

        expect(options.compileOptions.mainFile).toBe("other.dsp");
        expect(options.saveEditorParams).toHaveBeenCalled();
        expect(options.updateDiagram).toHaveBeenCalledWith("other code");
    });

    it("deletes persisted files through ProjectPersistence", async () => {
        const { handlers, options } = bindController();

        await handlers.deleteHandler("old.dsp");

        expect(options.projectPersistence.deleteFile).toHaveBeenCalledWith("old.dsp");
    });

    it("notifies after a file is deleted so disk origins can be forgotten", async () => {
        const onFileDelete = vi.fn();
        const { handlers } = bindController({ options: { onFileDelete } });

        await handlers.deleteHandler("old.dsp");

        expect(onFileDelete).toHaveBeenCalledWith("old.dsp");
    });

    it("cancels a pending save when the same file is deleted", async () => {
        const { handlers, options } = bindController();

        handlers.saveHandler("doomed.dsp", "process = _;", "main code");
        await handlers.deleteHandler("doomed.dsp");
        vi.advanceTimersByTime(1000);
        await Promise.resolve();

        expect(options.projectPersistence.deleteFile).toHaveBeenCalledWith("doomed.dsp");
        expect(options.projectPersistence.saveFile).not.toHaveBeenCalled();
    });

    it("keeps a pending save for a different file when another file is deleted", async () => {
        const { handlers, options } = bindController();

        handlers.saveHandler("kept.dsp", "process = _;", "main code");
        await handlers.deleteHandler("other.dsp");
        vi.advanceTimersByTime(1000);
        await Promise.resolve();

        expect(options.projectPersistence.deleteFile).toHaveBeenCalledWith("other.dsp");
        expect(options.projectPersistence.saveFile).toHaveBeenCalledWith("kept.dsp", "process = _;");
    });

    it("binds editor content changes back into FileManager", () => {
        const { controller } = bindController();
        let listener!: () => void;
        const editor = {
            getValue: vi.fn(() => "edited code"),
            getModel: vi.fn(() => ({ onDidChangeContent: vi.fn((handler) => { listener = handler; }) }))
        };
        const fileManager = { setValue: vi.fn() };

        controller.bindEditorContent(editor as any, fileManager as any);
        listener();

        expect(fileManager.setValue).toHaveBeenCalledWith("edited code", false);
    });
});
