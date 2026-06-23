import { beforeEach, describe, expect, it, vi } from "vitest";
import { RecorderController } from "../ui/RecorderController";

// RecorderController is a DOM binding around Recorder. The tests mock the
// encoder and URL APIs so no real audio data is needed.
describe("RecorderController", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="recorder-aim" class="btn-light"></button>
            <button id="recorder-save"></button>
            <a id="a-recorder-save"></a>
        `;
        vi.restoreAllMocks();
        vi.stubGlobal("URL", {
            createObjectURL: vi.fn(() => "blob:recorder"),
            revokeObjectURL: vi.fn()
        });
    });

    it("toggles recorder enabled state and button classes", () => {
        const recorder = { enabled: false, totalSec: 0, encode: vi.fn() };
        new RecorderController({ recorder: recorder as any, fileNameProvider: () => "main" }).bind();

        $("#recorder-aim").trigger("click");
        expect(recorder.enabled).toBe(true);
        expect($("#recorder-aim").hasClass("btn-danger")).toBe(true);

        $("#recorder-aim").trigger("click");
        expect(recorder.enabled).toBe(false);
        expect($("#recorder-aim").hasClass("btn-light")).toBe(true);
    });

    it("does not encode or download when the recorder is empty", async () => {
        const recorder = { enabled: false, totalSec: 0, encode: vi.fn() };
        new RecorderController({ recorder: recorder as any, fileNameProvider: () => "main" }).bind();

        $("#recorder-save").trigger("click");
        await Promise.resolve();

        expect(recorder.encode).not.toHaveBeenCalled();
        expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it("downloads encoded WAV data with the current project name", async () => {
        const recorder = {
            enabled: false,
            totalSec: 1,
            encode: vi.fn(async () => new ArrayBuffer(4))
        };
        const click = vi.fn();
        $("#a-recorder-save")[0].click = click;
        new RecorderController({ recorder: recorder as any, fileNameProvider: () => "patch" }).bind();

        $("#recorder-save").trigger("click");
        await Promise.resolve();
        await Promise.resolve();

        expect(recorder.encode).toHaveBeenCalledTimes(1);
        expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
        expect($("#a-recorder-save").attr("href")).toBe("blob:recorder");
        expect($("#a-recorder-save").attr("download")).toBe("patch.wav");
        expect(click).toHaveBeenCalledTimes(1);
    });
});
