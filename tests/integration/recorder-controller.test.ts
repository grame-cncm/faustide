import { beforeEach, describe, expect, it, vi } from "vitest";
import $ from "jquery";
import { RecorderController } from "../../src/src/controller/RecorderController";

const assignJQuery = () => {
    (globalThis as any).$ = $;
    (globalThis as any).jQuery = $;
};

describe("RecorderController integration", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="recorder-aim" class="btn btn-light"></button>
            <button id="recorder-save" class="btn"></button>
            <a id="a-recorder-save"></a>
            <span id="recorder-time"></span>
        `;
        assignJQuery();
    });

    it("toggles recorder arm button state", () => {
        const recorder = { enabled: false, totalSec: 0, encode: vi.fn() };
        const controller = new RecorderController({
            recorder: recorder as any,
            uiEnv: { fileManager: { mainFileNameWithoutSuffix: "main" } } as any,
            timeElement: document.querySelector("#recorder-time") as HTMLSpanElement
        });

        controller.initialize();

        const armButton = document.querySelector("#recorder-aim") as HTMLButtonElement;
        expect(armButton.classList.contains("btn-light")).toBe(true);

        armButton.click();
        expect(recorder.enabled).toBe(true);
        expect(armButton.classList.contains("btn-danger")).toBe(true);
        expect(armButton.classList.contains("btn-light")).toBe(false);

        armButton.click();
        expect(recorder.enabled).toBe(false);
        expect(armButton.classList.contains("btn-light")).toBe(true);
        expect(armButton.classList.contains("btn-danger")).toBe(false);
    });

    it("saves recording and populates download link", async () => {
        const blobData = new Uint8Array([1, 2, 3]).buffer;
        const recorder = {
            enabled: true,
            totalSec: 1,
            encode: vi.fn().mockResolvedValue(blobData)
        };

        const createObjectURL = vi.fn().mockReturnValue("blob:url");
        const originalCreateObjectURL = globalThis.URL.createObjectURL;
        globalThis.URL.createObjectURL = createObjectURL;

        const anchor = document.querySelector("#a-recorder-save") as HTMLAnchorElement;
        const clickSpy = vi.spyOn(anchor, "click");

        try {
            const controller = new RecorderController({
                recorder: recorder as any,
                uiEnv: { fileManager: { mainFileNameWithoutSuffix: "main" } } as any,
                timeElement: document.querySelector("#recorder-time") as HTMLSpanElement
            });

            controller.initialize();

            const saveButton = document.querySelector("#recorder-save") as HTMLButtonElement;
            saveButton.click();
            await Promise.resolve();

            expect(recorder.encode).toHaveBeenCalledTimes(1);
            expect(createObjectURL).toHaveBeenCalled();
            expect(anchor.getAttribute("href")).toBe("blob:url");
            expect(anchor.getAttribute("download")).toBe("main.wav");
            expect(clickSpy).toHaveBeenCalled();
        } finally {
            globalThis.URL.createObjectURL = originalCreateObjectURL;
        }
    });
});
