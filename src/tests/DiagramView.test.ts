import { beforeEach, describe, expect, it, vi } from "vitest";
import { DiagramView } from "../ui/DiagramView";

// DiagramView tests focus on DOM interaction only; SVG generation stays covered
// by DiagramService tests.
const originalEvent = (extra: Record<string, any> = {}) => ({
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    ...extra
});

describe("DiagramView", () => {
    beforeEach(() => {
        $(document).off();
        document.body.innerHTML = `
            <div id="diagram" style="width: 400px; height: 200px;">
                <div id="diagram-svg" style="width: 400px; height: 200px; overflow: auto;">
                    <svg width="100" height="100"><a href="nested.svg"><rect width="10" height="10"></rect></a></svg>
                </div>
            </div>
        `;
    });

    it("replaces the current SVG when a diagram link is followed", () => {
        const source = {
            readGeneratedSvg: vi.fn(() => '<svg width="200" height="100"><text>nested</text></svg>')
        };
        new DiagramView(source).bind();

        $("#diagram-svg a").trigger("click");

        expect(source.readGeneratedSvg).toHaveBeenCalledWith("nested.svg");
        expect($("#diagram-svg svg text").text()).toBe("nested");
        expect($("#diagram-svg svg").width()).toBe(400);
    });

    it("zooms the displayed SVG only with ctrl wheel", () => {
        new DiagramView({ readGeneratedSvg: vi.fn() }).bind();
        $("#diagram-svg svg").width(100);

        $("#diagram").trigger($.Event("wheel", { ctrlKey: false, originalEvent: originalEvent({ deltaY: -1 }) }));
        expect($("#diagram-svg svg").width()).toBe(100);

        $("#diagram").trigger($.Event("wheel", { ctrlKey: true, originalEvent: originalEvent({ deltaY: -1 }) }));
        expect($("#diagram-svg svg").width()).toBe(125);
    });

    it("pans the diagram during SVG drag", () => {
        new DiagramView({ readGeneratedSvg: vi.fn() }).bind();
        $("#diagram-svg").scrollLeft(40).scrollTop(50);

        $("#diagram-svg svg").trigger($.Event("mousedown", { pageX: 20, pageY: 30 }));
        $(document).trigger($.Event("mousemove", {
            pageX: 30,
            pageY: 45,
            originalEvent: originalEvent({ movementX: 10, movementY: 15 })
        }));
        $(document).trigger($.Event("mouseup", { originalEvent: originalEvent() }));

        expect($("#diagram-svg").scrollLeft()).toBe(30);
        expect($("#diagram-svg").scrollTop()).toBe(35);
    });
});
