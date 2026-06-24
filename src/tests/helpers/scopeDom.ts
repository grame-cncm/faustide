import { createMockCanvasContext } from "./canvasContext";

type ScopeContainerOptions = {
    withController?: boolean;
    withCanvas?: boolean;
    visible?: boolean;
    width?: number;
    height?: number;
};

type StaticScopeContainerOptions = ScopeContainerOptions & {
    withData?: boolean;
    withDefault?: boolean;
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
    Object.defineProperty(container, "clientWidth", { configurable: true, value: options.width || 320 });
    Object.defineProperty(container, "clientHeight", { configurable: true, value: options.height || 180 });
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

/**
 * Creates the static analyser container shape used by `StaticScope`.
 *
 * `StaticScope` uses `static-scope-*` class names and manages both a canvas
 * surface and a raw-data surface. Keeping this factory separate from
 * `createScopeContainer` makes tests explicit about which widget they exercise.
 */
export const createStaticScopeContainer = (options: StaticScopeContainerOptions = {}) => {
    const container = document.createElement("div");
    container.className = "static-scope-container";
    Object.defineProperty(container, "clientWidth", { configurable: true, value: options.width || 320 });
    Object.defineProperty(container, "clientHeight", { configurable: true, value: options.height || 180 });
    document.body.appendChild(container);

    let controller: HTMLDivElement;
    if (options.withController) {
        controller = document.createElement("div");
        controller.className = "static-scope-ui-controller";
        container.appendChild(controller);
    }

    let canvas: HTMLCanvasElement;
    if (options.withCanvas) {
        const created = createMockCanvasContext({ width: options.width, height: options.height });
        canvas = created.canvas;
        canvas.className = "static-scope-canvas";
        container.appendChild(canvas);
        setElementVisible(canvas, options.visible !== false);
    }

    let data: HTMLDivElement;
    if (options.withData) {
        data = document.createElement("div");
        data.className = "static-scope-data";
        container.appendChild(data);
    }

    let defaultMessage: HTMLDivElement;
    if (options.withDefault) {
        defaultMessage = document.createElement("div");
        defaultMessage.className = "static-scope-default";
        container.appendChild(defaultMessage);
    }

    return { container, controller, canvas, data, defaultMessage };
};
