import { createMockCanvasContext } from "./canvasContext";

type ScopeContainerOptions = {
    withController?: boolean;
    withCanvas?: boolean;
    visible?: boolean;
    width?: number;
    height?: number;
};

/**
 * Makes jsdom's visibility signal explicit for scope tests.
 *
 * Scope widgets use `offsetParent === null` to skip hidden canvas rendering.
 * jsdom does not compute layout, so tests set this property directly.
 */
export const setElementVisible = (element: HTMLElement, visible: boolean) => {
    Object.defineProperty(element, "offsetParent", {
        configurable: true,
        get: () => (visible ? document.body : null)
    });
};

/**
 * Creates a scope container matching the DOM shape used by `Scope` and
 * `StaticScope`.
 */
export const createScopeContainer = (options: ScopeContainerOptions = {}) => {
    const container = document.createElement("div");
    container.className = "scope-container";
    document.body.appendChild(container);

    let controller: HTMLDivElement;
    if (options.withController) {
        controller = document.createElement("div");
        controller.className = "scope-controller";
        container.appendChild(controller);
    }

    let canvas: HTMLCanvasElement;
    if (options.withCanvas) {
        const created = createMockCanvasContext({ width: options.width, height: options.height });
        canvas = created.canvas;
        canvas.className = "scope-canvas";
        container.appendChild(canvas);
        setElementVisible(canvas, options.visible !== false);
    }

    return { container, controller, canvas };
};
