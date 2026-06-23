import { beforeEach, describe, expect, it, vi } from "vitest";
import { AlertController } from "../ui/AlertController";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="alert-faust-code" class="alert alert-faust-code" style="visibility: hidden">
            <button class="close"></button>
            <a class="a-alert-faust-code-detail"></a>
            <span></span>
        </div>
        <div id="modal-alert-faust-code-detail">
            <div class="modal-body"></div>
        </div>
    `;
};

describe("AlertController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("shows string errors in the Faust alert", () => {
        vi.spyOn(console, "error").mockImplementation(() => undefined);
        const controller = new AlertController();

        controller.show("compile failed");

        expect($(".alert-faust-code>span").text()).toBe("compile failed");
        expect($("#alert-faust-code").css("visibility")).toBe("visible");
        expect(console.error).toHaveBeenCalledWith("compile failed");
    });

    it("shows Error messages without stringifying the object", () => {
        vi.spyOn(console, "error").mockImplementation(() => undefined);
        const controller = new AlertController();
        const error = new Error("bad syntax");

        controller.show(error);

        expect($(".alert-faust-code>span").text()).toBe("bad syntax");
        expect(console.error).toHaveBeenCalledWith(error);
    });

    it("clears the Faust alert visibility", () => {
        const controller = new AlertController();
        $("#alert-faust-code").css("visibility", "visible");

        controller.clear();

        expect($("#alert-faust-code").css("visibility")).toBe("hidden");
    });

    it("binds close and detail controls", () => {
        const controller = new AlertController();
        $(".alert-faust-code>span").text("details");
        $("#alert-faust-code").css("visibility", "visible");

        controller.bind();
        $(".a-alert-faust-code-detail").trigger("click");
        $(".alert>.close").trigger("click");

        expect($("#modal-alert-faust-code-detail .modal-body").text()).toBe("details");
        expect($("#alert-faust-code").css("visibility")).toBe("hidden");
    });
});
