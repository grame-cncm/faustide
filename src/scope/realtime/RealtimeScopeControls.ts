export type RealtimeScopeControls = {
    /** Main visible analyser canvas. */
    canvas: HTMLCanvasElement;
    /** Two-dimensional drawing context for the visible canvas. */
    ctx: CanvasRenderingContext2D;
    /** Offscreen rolling spectrogram cache. */
    spectTempCtx: CanvasRenderingContext2D;
    /** Mode cycling button. */
    btnSwitch: HTMLButtonElement;
    /** FFT-size cycling button. */
    btnSize: HTMLButtonElement;
    /** Current analyser channel button. */
    btnCh: HTMLButtonElement;
    /** Icon inside the mode cycling button. */
    iSwitch: HTMLElement;
};

const enableTooltip = (element: HTMLElement) => {
    try {
        $(element).tooltip({ trigger: "hover", boundary: "viewport" });
    } catch (e) {} // eslint-disable-line no-empty
};

const createTooltipButton = (
    className: string,
    title: string,
    controller: HTMLDivElement,
    text = ""
) => {
    const button = document.createElement("button");
    button.className = className;
    button.setAttribute("data-toggle", "tooltip");
    button.setAttribute("data-placement", "top");
    button.setAttribute("title", title);
    if (text) button.innerText = text;
    controller.appendChild(button);
    enableTooltip(button);
    return button;
};

/**
 * Finds or creates the DOM owned by the real-time analyser `Scope`.
 *
 * The helper keeps the original class names, tooltip attributes, default
 * labels, and 1024x1024 spectrogram cache size so existing CSS, tests, and
 * host markup remain compatible while `Scope` becomes a thin coordinator.
 */
export const createRealtimeScopeControls = (
    container: HTMLDivElement,
    fftSize: number,
    channel: number
): RealtimeScopeControls => {
    const spectTempCtx = document.createElement("canvas").getContext("2d");
    spectTempCtx.canvas.height = 1024;
    spectTempCtx.canvas.width = 1024;

    let controller: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    for (let index = 0; index < container.children.length; index++) {
        const element = container.children[index];
        if (element.classList.contains("scope-controller")) controller = element as HTMLDivElement;
        if (element.classList.contains("scope-canvas")) canvas = element as HTMLCanvasElement;
    }

    if (!controller) {
        controller = document.createElement("div");
        controller.classList.add("scope-controller");
        container.appendChild(controller);
    }
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.classList.add("scope-canvas");
        canvas.setAttribute("data-toggle", "tooltip");
        canvas.setAttribute("data-placement", "left");
        canvas.setAttribute("title", "Input analyser");
        container.appendChild(canvas);
        enableTooltip(canvas);
    }

    let btnSwitch: HTMLButtonElement;
    let btnSize: HTMLButtonElement;
    let btnCh: HTMLButtonElement;
    for (let index = 0; index < controller.children.length; index++) {
        const element = controller.children[index];
        if (element.classList.contains("scope-btn-switch")) btnSwitch = element as HTMLButtonElement;
        if (element.classList.contains("scope-btn-size")) btnSize = element as HTMLButtonElement;
        if (element.classList.contains("scope-btn-ch")) btnCh = element as HTMLButtonElement;
    }

    if (!btnSwitch) {
        btnSwitch = createTooltipButton(
            "scope-btn-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon",
            "Oscilloscope / Spectroscope / Spectrogram",
            controller
        );
    }
    if (!btnSize) {
        btnSize = createTooltipButton(
            "scope-btn-size btn btn-outline-light btn-sm btn-overlay",
            "Analyser Size",
            controller,
            fftSize + "samps"
        );
    }
    if (!btnCh) {
        btnCh = createTooltipButton(
            "scope-btn-ch btn btn-outline-light btn-sm btn-overlay",
            "Current Channel",
            controller,
            "ch " + (channel + 1).toString()
        );
    }

    let iSwitch: HTMLElement;
    for (let index = 0; index < btnSwitch.children.length; index++) {
        const element = btnSwitch.children[index];
        if (element.classList.contains("fas")) iSwitch = element as HTMLElement;
    }
    if (!iSwitch) {
        iSwitch = document.createElement("i");
        iSwitch.className = "fas fa-sm fa-wave-square";
        btnSwitch.appendChild(iSwitch);
    }

    return {
        canvas,
        ctx: canvas.getContext("2d"),
        spectTempCtx,
        btnSwitch,
        btnSize,
        btnCh,
        iSwitch
    };
};
