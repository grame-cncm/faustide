import { beforeEach, describe, expect, it, vi } from "vitest";
import { GlobalShortcutsController } from "../ui/GlobalShortcutsController";
import { PanelToggleView } from "../ui/PanelToggleView";
import { ResizablePanelsController } from "../ui/ResizablePanelsController";

// These controllers are intentionally DOM-bound. The tests assert the legacy
// selector/class behavior while the runtime services remain outside the setup.
describe("panel and shortcut controllers", () => {
    beforeEach(() => {
        $(document).off();
        $(window).off();
        document.body.innerHTML = "";
    });

    it("dispatches Ctrl+D and Ctrl+R to injected actions", () => {
        const docs = vi.fn();
        const run = vi.fn();
        new GlobalShortcutsController({ docs, run }).bind();

        $(document).trigger($.Event("keydown", { ctrlKey: true, key: "d" }));
        $(document).trigger($.Event("keydown", { ctrlKey: true, key: "r" }));
        $(document).trigger($.Event("keydown", { ctrlKey: false, key: "r" }));

        expect(docs).toHaveBeenCalledTimes(1);
        expect(run).toHaveBeenCalledTimes(1);
    });

    it("toggles side panels and applies responsive state", () => {
        document.body.innerHTML = `
            <button class="btn-show-left active btn-primary"></button>
            <button class="btn-show-right active btn-primary"></button>
            <div id="left"></div>
            <div id="right"></div>
        `;
        const editor = { layout: vi.fn() };
        new PanelToggleView(editor).bind();

        $(".btn-show-left").trigger("click");
        expect($("#left").css("display")).toBe("none");
        expect($(".btn-show-left").hasClass("btn-outline-secondary")).toBe(true);
        expect(editor.layout).toHaveBeenCalledTimes(1);

        Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 });
        $(window).trigger("resize");
        expect($("#left").css("display")).not.toBe("none");
        expect($("#right").css("display")).not.toBe("none");
        expect($(".btn-show-right").hasClass("active")).toBe(true);

        Object.defineProperty(window, "innerWidth", { configurable: true, value: 800 });
        $(window).trigger("resize");
        expect($("#left").css("display")).toBe("none");
        expect($("#right").css("display")).toBe("none");
        expect($(".btn-show-left").hasClass("btn-outline-secondary")).toBe(true);
    });

    it("resizes panels and refreshes dependent layouts", () => {
        document.body.innerHTML = `
            <iframe id="iframe-faust-ui"></iframe>
            <div id="panel" style="width: 100px; height: 80px;">
                <div class="resizable resizable-right resizable-bottom"></div>
            </div>
        `;
        const editor = { layout: vi.fn() };
        const wavesurfer = {
            isReady: true,
            drawer: {
                containerWidth: 50,
                container: { clientWidth: 90 }
            },
            drawBuffer: vi.fn()
        };
        new ResizablePanelsController(editor, () => wavesurfer).bind();

        $(".resizable").trigger($.Event("mousedown", { pageX: 10, pageY: 20 }));
        expect($("#iframe-faust-ui").css("pointer-events")).toBe("none");
        $(document).trigger($.Event("mousemove", { pageX: 30, pageY: 55 }));
        $(document).trigger($.Event("mouseup"));

        expect($("#panel").width()).toBe(120);
        expect($("#panel").height()).toBe(115);
        expect(editor.layout).toHaveBeenCalledTimes(1);
        expect(wavesurfer.drawer.containerWidth).toBe(90);
        expect(wavesurfer.drawBuffer).toHaveBeenCalledTimes(1);
        expect($("#iframe-faust-ui").css("pointer-events")).not.toBe("none");
    });

    it("resizes without throwing when the wavesurfer has not been created yet", () => {
        // Regression: the wavesurfer is built lazily on first audio-input
        // selection, so it is undefined while the user resizes panels. The
        // controller must read it through the late-bound accessor and guard.
        document.body.innerHTML = `
            <iframe id="iframe-faust-ui"></iframe>
            <div id="panel" style="width: 100px; height: 80px;">
                <div class="resizable resizable-right"></div>
            </div>
        `;
        const editor = { layout: vi.fn() };
        new ResizablePanelsController(editor, () => undefined).bind();

        $(".resizable").trigger($.Event("mousedown", { pageX: 10, pageY: 20 }));
        expect(() => $(document).trigger($.Event("mousemove", { pageX: 30, pageY: 20 }))).not.toThrow();
        $(document).trigger($.Event("mouseup"));
        expect(editor.layout).toHaveBeenCalled();
    });
});
