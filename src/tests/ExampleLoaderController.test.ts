import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExampleLoaderController } from "../ui/ExampleLoaderController";

const setupDom = () => {
    document.body.innerHTML = `<div id="tab-examples"></div>`;
    ($.fn as any).dropdown = vi.fn(function dropdown() {
        return this;
    });
};

const createFileManager = () => ({
    mainCode: "process = _;",
    newFile: vi.fn()
});

const createFetch = () => vi.fn(async (path: string) => {
    if (path === "./examples.json") {
        return {
            json: async () => ({
                type: "directory",
                name: "root",
                path: "",
                size: 0,
                children: [
                    { type: "file", name: "basic.dsp", path: "examples/basic.dsp", size: 1 },
                    {
                        type: "directory",
                        name: "synths",
                        path: "examples/synths",
                        size: 0,
                        children: [{ type: "file", name: "bad name!.dsp", path: "examples/synths/bad.dsp", size: 1 }]
                    }
                ]
            })
        };
    }
    return {
        text: async () => "imported = _;"
    };
});

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe("ExampleLoaderController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("loads the examples tree into the dropdown menu", async () => {
        const fetchResource = createFetch();
        new ExampleLoaderController({
            fileManager: createFileManager() as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            fetchResource: fetchResource as any,
            runDsp: vi.fn(),
            updateDiagram: vi.fn()
        }).bind();
        await flushPromises();

        expect($("#tab-examples .faust-example").length).toBe(2);
        expect($("#tab-examples .faust-example").eq(0).text()).toBe("basic.dsp");
        expect($("#tab-examples .submenu-toggle").text()).toBe("synths");
        expect(($.fn as any).dropdown).toHaveBeenCalled();
    });

    it("loads an example file and sanitizes the target file name", async () => {
        const fetchResource = createFetch();
        const fileManager = createFileManager();
        new ExampleLoaderController({
            fileManager: fileManager as any,
            compileOptions: { realtimeCompile: false } as any,
            audioEnv: {} as any,
            fetchResource: fetchResource as any,
            runDsp: vi.fn(),
            updateDiagram: vi.fn()
        }).bind();
        await flushPromises();

        $("#tab-examples .faust-example").eq(1).trigger("click");
        await flushPromises();

        expect(fetchResource).toHaveBeenCalledWith("examples/synths/bad.dsp");
        expect(fileManager.newFile).toHaveBeenCalledWith("badname.dsp", "imported = _;");
    });

    it("runs DSP after loading an example when realtime mode has an active DSP", async () => {
        const fetchResource = createFetch();
        const runDsp = vi.fn();
        new ExampleLoaderController({
            fileManager: createFileManager() as any,
            compileOptions: { realtimeCompile: true } as any,
            audioEnv: { dsp: {} } as any,
            fetchResource: fetchResource as any,
            runDsp,
            updateDiagram: vi.fn()
        }).bind();
        await flushPromises();

        $("#tab-examples .faust-example").eq(0).trigger("click");
        await flushPromises();

        expect(runDsp).toHaveBeenCalledWith("process = _;");
    });

    it("updates the diagram after loading an example when no DSP exists", async () => {
        const fetchResource = createFetch();
        const updateDiagram = vi.fn();
        new ExampleLoaderController({
            fileManager: createFileManager() as any,
            compileOptions: { realtimeCompile: true } as any,
            audioEnv: {} as any,
            fetchResource: fetchResource as any,
            runDsp: vi.fn(),
            updateDiagram
        }).bind();
        await flushPromises();

        $("#tab-examples .faust-example").eq(0).trigger("click");
        await flushPromises();

        expect(updateDiagram).toHaveBeenCalledWith("process = _;");
    });
});
