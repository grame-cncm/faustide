import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipController } from "../ui/TooltipController";

const setupDom = () => {
    document.body.innerHTML = `
        <button id="generic" data-toggle="tooltip"></button>
        <button id="btn-export"></button>
        <button id="btn-share"></button>
        <button id="btn-tab-setting"></button>
    `;
};

describe("TooltipController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("initializes all bootstrap tooltip targets with hover viewport options", () => {
        const tooltip = vi.fn(function tooltip() {
            return this;
        });
        ($.fn as any).tooltip = tooltip;

        new TooltipController().bind();

        expect(tooltip).toHaveBeenCalledTimes(4);
        expect(tooltip).toHaveBeenCalledWith({ trigger: "hover", boundary: "viewport" });
    });
});
