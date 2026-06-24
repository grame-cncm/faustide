import { vi } from "vitest";

type CanvasContextOptions = {
    width?: number;
    height?: number;
};

/**
 * Canvas 2D context double used by scope rendering tests.
 *
 * jsdom does not implement drawing primitives. This helper provides the subset
 * used by `Scope` and `StaticScope` while keeping every drawing call observable
 * through Vitest spies.
 */
export type MockCanvasContext2D = CanvasRenderingContext2D & {
    canvas: HTMLCanvasElement;
};

/**
 * Creates a real jsdom canvas plus a spy-backed 2D context object.
 */
export const createMockCanvasContext = (options: CanvasContextOptions = {}) => {
    const canvas = document.createElement("canvas");
    canvas.width = options.width || 320;
    canvas.height = options.height || 180;
    Object.defineProperty(canvas, "clientWidth", { configurable: true, value: canvas.width });
    Object.defineProperty(canvas, "clientHeight", { configurable: true, value: canvas.height });
    canvas.getBoundingClientRect = vi.fn(() => ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: canvas.width,
        bottom: canvas.height,
        width: canvas.width,
        height: canvas.height,
        toJSON: () => ({})
    } as DOMRect));

    const context = ({
        canvas,
        fillStyle: "",
        strokeStyle: "",
        font: "",
        lineWidth: 1,
        lineJoin: "",
        textAlign: "start",
        globalCompositeOperation: "source-over",
        save: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        closePath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        drawImage: vi.fn(),
        fillText: vi.fn(),
        putImageData: vi.fn(),
        getImageData: vi.fn((sx: number, sy: number, sw: number, sh: number) => ({
            data: new Uint8ClampedArray(sw * sh * 4),
            width: sw,
            height: sh,
            colorSpace: "srgb"
        })),
        createImageData: vi.fn((sw: number, sh: number) => ({
            data: new Uint8ClampedArray(sw * sh * 4),
            width: sw,
            height: sh,
            colorSpace: "srgb"
        }))
    } as unknown as MockCanvasContext2D);

    return { canvas, context };
};

/**
 * Installs a deterministic `getContext("2d")` implementation.
 *
 * A new context is created per canvas and exposed through `contexts` for tests
 * that need to inspect the drawing calls of canvases created by production
 * constructors.
 */
export const installMockCanvasContext = (options: CanvasContextOptions = {}) => {
    const contexts: MockCanvasContext2D[] = [];
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(function getContext(this: HTMLCanvasElement, type: string) {
        if (type !== "2d") return null;
        const { context } = createMockCanvasContext({
            width: this.width || options.width,
            height: this.height || options.height
        });
        context.canvas = this;
        contexts.push(context);
        return context;
    } as any);

    return {
        contexts,
        restore: () => getContextSpy.mockRestore()
    };
};
