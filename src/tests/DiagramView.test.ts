import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

        expect(source.readGeneratedSvg).toHaveBeenCalledWith("nested.svg", "main");
        expect($("#diagram-svg svg text").text()).toBe("nested");
        expect($("#diagram-svg svg").width()).toBe(400);
    });

    it("follows links inside the displayed effect diagram set", () => {
        const source = { readGeneratedSvg: vi.fn(() => "<svg></svg>") };
        $("#diagram-svg").attr("data-diagram", "effect");
        new DiagramView(source).bind();

        $("#diagram-svg a").trigger("click");

        expect(source.readGeneratedSvg).toHaveBeenCalledWith("nested.svg", "effect");
    });

    it("follows a link without the part a steppable diagram adds to it", () => {
        const source = { readGeneratedSvg: vi.fn(() => "<svg></svg>") };
        $("#diagram-svg a").attr("href", "nested.svg#c=1&b=0");
        new DiagramView(source).bind();

        $("#diagram-svg a").trigger("click");

        expect(source.readGeneratedSvg).toHaveBeenCalledWith("nested.svg", "main");
    });

    describe("steppable diagrams", () => {
        const steppable = (name: string) =>
            `<svg width="200" height="100"><text>${name}</text><script type="text/javascript" class="faust-svg-step"></script></svg>`;
        const scope = window as unknown as { FaustSvgStep?: ReturnType<typeof vi.fn> };

        afterEach(() => {
            delete scope.FaustSvgStep;
        });

        it("starts the player of the diagram at the given use and sample", () => {
            scope.FaustSvgStep = vi.fn(() => ({ go: vi.fn(), use: vi.fn(), state: vi.fn() }));
            const view = new DiagramView({ readGeneratedSvg: vi.fn() });

            const svg = view.display(steppable("process"), { use: 1, n: 5 });

            // SVG elements are compared by identity: Vitest's deep equality fails on jsdom SVG nodes.
            expect($("#diagram-svg svg")[0] === svg).toBe(true);
            expect($("#diagram-svg svg").width()).toBe(400);
            const [target, options] = scope.FaustSvgStep.mock.calls[0];
            expect(target === svg).toBe(true);
            expect(options).toMatchObject({ use: 1, n: 5 });
        });

        it("opens the target of a player link at its use and sample", () => {
            scope.FaustSvgStep = vi.fn(() => ({ go: vi.fn(), use: vi.fn(), state: vi.fn() }));
            const source = { readGeneratedSvg: vi.fn(() => steppable("nested")) };
            $("#diagram-svg").attr("data-diagram", "effect");
            new DiagramView(source).display(steppable("process"));

            scope.FaustSvgStep.mock.calls[0][1].onNavigate({ file: "nested-3.svg", use: 2, n: 7 });

            expect(source.readGeneratedSvg).toHaveBeenCalledWith("nested-3.svg", "effect");
            expect($("#diagram-svg svg text").text()).toBe("nested");
            const [target, options] = scope.FaustSvgStep.mock.lastCall;
            expect(target === $("#diagram-svg svg")[0]).toBe(true);
            expect(options).toMatchObject({ use: 2, n: 7 });
        });

        it("tells the place shown: file, and use and sample of the player", () => {
            const state = vi.fn(() => ({ use: 1, n: 9 }));
            scope.FaustSvgStep = vi.fn(() => ({ go: vi.fn(), use: vi.fn(), state }));
            const source = { readGeneratedSvg: vi.fn(() => "<svg width=\"10\" height=\"10\"></svg>") };
            const view = new DiagramView(source);
            view.bind();

            expect(view.currentPlace()).toEqual({ file: "process.svg" });
            view.display(steppable("sub"), { file: "sub-1.svg", use: 1, n: 4 });
            expect(view.currentPlace()).toEqual({ file: "sub-1.svg", use: 1, n: 9 });

            // A plain diagram reached by a link has no player.
            $("#diagram-svg").html('<svg width="10" height="10"><a href="sub-2.svg"><rect></rect></a></svg>');
            $("#diagram-svg a").trigger("click");
            expect(view.currentPlace()).toEqual({ file: "sub-2.svg" });
        });

        it("leaves a plain diagram without player", () => {
            scope.FaustSvgStep = vi.fn();
            new DiagramView({ readGeneratedSvg: vi.fn() }).display("<svg width=\"10\" height=\"10\"></svg>");

            expect(scope.FaustSvgStep).not.toHaveBeenCalled();
        });
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
