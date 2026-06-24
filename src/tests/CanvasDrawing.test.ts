import { describe, expect, it } from "vitest";
import { drawCanvasBackground } from "../scope/CanvasDrawing";
import { createMockCanvasContext } from "./helpers/canvasContext";

describe("CanvasDrawing", () => {
    it("fills the full viewport while preserving the canvas state", () => {
        const { context } = createMockCanvasContext();

        drawCanvasBackground(context, 320, 180, "#181818");

        expect(context.save).toHaveBeenCalled();
        expect(context.fillStyle).toBe("#181818");
        expect(context.fillRect).toHaveBeenCalledWith(0, 0, 320, 180);
        expect(context.restore).toHaveBeenCalled();
    });
});
