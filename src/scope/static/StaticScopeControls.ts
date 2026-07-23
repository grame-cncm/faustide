import {
    FrequencyScaleMode,
    MagnitudeScaleMode,
    StaticScopeMode,
    getStaticScopeIconClassName,
    getStaticScopeModeName
} from "../ScopeModes";

export type StaticScopeControls = {
    /** Main drawing canvas displayed for all non-data modes. */
    canvas: HTMLCanvasElement;
    /** Two-dimensional drawing context for the main canvas. */
    ctx: CanvasRenderingContext2D;
    /** Offscreen context used as the persistent spectrogram image cache. */
    spectTempCtx: CanvasRenderingContext2D;
    /** Raw-data surface displayed in Data mode. */
    divData: HTMLDivElement;
    /** Default message surface displayed when no samples are available. */
    divDefault: HTMLDivElement;
    /** Mode cycling button. */
    btnSwitch: HTMLButtonElement;
    /** Horizontal zoom-out button. */
    btnZoomOut: HTMLButtonElement;
    /** Zoom reset/label button. */
    btnZoom: HTMLButtonElement;
    /** Horizontal zoom-in button. */
    btnZoomIn: HTMLButtonElement;
    /** Frequency scale toggle button. */
    btnScale: HTMLButtonElement;
    /** Magnitude scale toggle button. */
    btnMagnitude: HTMLButtonElement;
    /** Container for explicit dB-axis limits. */
    divMagnitudeDbRange: HTMLDivElement;
    /** Lower dB-axis limit input. */
    inputMagnitudeDbMin: HTMLInputElement;
    /** Upper dB-axis limit input. */
    inputMagnitudeDbMax: HTMLInputElement;
    /** CSV download button. */
    btnDownload: HTMLButtonElement;
    /** Icon inside the mode cycling button. */
    iSwitch: HTMLElement;
    /** Label inside the mode cycling button. */
    spanSwitch: HTMLSpanElement;
    /** Icon inside the frequency scale button. */
    iScale: HTMLElement;
};

type ModeControlUpdate = {
    mode: StaticScopeMode;
    inFrequencyDomain: boolean;
    iSwitch: HTMLElement;
    spanSwitch: HTMLSpanElement;
    divData: HTMLDivElement;
    canvas: HTMLCanvasElement;
    btnZoom: HTMLButtonElement;
    btnZoomIn: HTMLButtonElement;
    btnZoomOut: HTMLButtonElement;
    btnScale: HTMLButtonElement;
    btnMagnitude: HTMLButtonElement;
    divMagnitudeDbRange: HTMLDivElement;
    magnitudeScaleMode: MagnitudeScaleMode;
};

const enableTooltip = (element: HTMLElement) => {
    try {
        $(element).tooltip({ trigger: "hover", boundary: "viewport" });
    } catch (e) { } // eslint-disable-line no-empty
};

const refreshTooltip = (element: HTMLElement) => {
    try {
        $(element).tooltip("hide").tooltip("dispose").tooltip({ trigger: "hover", boundary: "viewport" });
    } catch (e) { } // eslint-disable-line no-empty
};

const createTooltipButton = (
    className: string,
    title: string,
    controllerDiv: HTMLDivElement,
    innerHTML = ""
) => {
    const button = document.createElement("button");
    button.className = className;
    button.setAttribute("data-toggle", "tooltip");
    button.setAttribute("data-placement", "top");
    if (title) button.setAttribute("title", title);
    if (innerHTML) button.innerHTML = innerHTML;
    controllerDiv.appendChild(button);
    enableTooltip(button);
    return button;
};

const createMagnitudeDbInput = (
    rangeContainer: HTMLDivElement,
    className: string,
    labelText: string,
    defaultValue: number
) => {
    const label = document.createElement("label");
    label.className = "static-scope-ui-db-label";
    label.append(`${labelText} `);
    const input = document.createElement("input");
    input.className = className;
    input.type = "number";
    input.step = "1";
    input.value = `${defaultValue}`;
    input.setAttribute("aria-label", `${labelText} magnitude in dB`);
    label.appendChild(input);
    rangeContainer.appendChild(label);
    return input;
};

/**
 * Finds or creates every DOM node owned by `StaticScope`.
 *
 * Existing markup is reused so tests and host pages can provide their own
 * surfaces. Missing controls are created with the same Bootstrap/FortAwesome
 * classes and tooltip attributes as the historical inline implementation.
 */
export const createStaticScopeControls = (container: HTMLDivElement): StaticScopeControls => {
    const spectTempCtx = document.createElement("canvas").getContext("2d");
    spectTempCtx.canvas.height = 1024;
    let controllerDiv: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let divData: HTMLDivElement;
    let divDefault: HTMLDivElement;

    for (let index = 0; index < container.children.length; index++) {
        const element = container.children[index];
        if (element.classList.contains("static-scope-ui-controller")) controllerDiv = element as HTMLDivElement;
        if (element.classList.contains("static-scope-canvas")) canvas = element as HTMLCanvasElement;
        if (element.classList.contains("static-scope-data")) divData = element as HTMLDivElement;
        if (element.classList.contains("static-scope-default")) divDefault = element as HTMLDivElement;
    }

    if (!controllerDiv) {
        controllerDiv = document.createElement("div");
        controllerDiv.classList.add("static-scope-ui-controller");
        container.appendChild(controllerDiv);
    }
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.classList.add("static-scope-canvas");
        container.appendChild(canvas);
    }
    canvas.tabIndex = 0;
    canvas.title = "Double-click an axis to reset it when adjustable; wheel over it to zoom. Set magnitude dB limits in the toolbar. Drag a waveform to select samples, Alt-drag to pan, then copy the selection as CSV.";
    if (!divData) {
        divData = document.createElement("div");
        divData.classList.add("static-scope-data");
        container.appendChild(divData);
    }
    if (!divDefault) {
        divDefault = document.createElement("div");
        divDefault.classList.add("static-scope-default", "alert", "alert-info");
        divDefault.setAttribute("role", "alert");
        divDefault.innerHTML = "<h5>No Data</h5>";
        container.appendChild(divDefault);
    }

    let btnSwitch: HTMLButtonElement;
    let btnZoomOut: HTMLButtonElement;
    let btnZoom: HTMLButtonElement;
    let btnZoomIn: HTMLButtonElement;
    let btnScale: HTMLButtonElement;
    let btnMagnitude: HTMLButtonElement;
    let divMagnitudeDbRange: HTMLDivElement;
    let btnDownload: HTMLButtonElement;

    for (let index = 0; index < controllerDiv.children.length; index++) {
        const element = controllerDiv.children[index];
        if (element.classList.contains("static-scope-ui-switch")) btnSwitch = element as HTMLButtonElement;
        if (element.classList.contains("static-scope-ui-zoomout")) btnZoomOut = element as HTMLButtonElement;
        if (element.classList.contains("static-scope-ui-zoom")) btnZoom = element as HTMLButtonElement;
        if (element.classList.contains("static-scope-ui-zoomin")) btnZoomIn = element as HTMLButtonElement;
        if (element.classList.contains("static-scope-ui-scale")) btnScale = element as HTMLButtonElement;
        if (element.classList.contains("static-scope-ui-magnitude")) btnMagnitude = element as HTMLButtonElement;
        if (element.classList.contains("static-scope-ui-db-range")) divMagnitudeDbRange = element as HTMLDivElement;
        if (element.classList.contains("static-scope-ui-download")) btnDownload = element as HTMLButtonElement;
    }

    if (!btnSwitch) btnSwitch = createTooltipButton("static-scope-ui-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon", "Interleaved Scope / Stacked Scope / Data", controllerDiv);
    if (!btnZoomOut) btnZoomOut = createTooltipButton("static-scope-ui-zoomout btn btn-outline-light btn-sm btn-overlay btn-overlay-icon", "Zoom Out", controllerDiv, '<i class="fas fa-minus"></i>');
    if (!btnZoom) {
        btnZoom = createTooltipButton("static-scope-ui-zoom btn btn-outline-light btn-sm btn-overlay", "Reset Zoom", controllerDiv);
        btnZoom.innerText = "1.0x";
    }
    if (!btnZoomIn) btnZoomIn = createTooltipButton("static-scope-ui-zoomin btn btn-outline-light btn-sm btn-overlay btn-overlay-icon", "Zoom In", controllerDiv, '<i class="fas fa-plus"></i>');
    if (!btnScale) btnScale = createTooltipButton("static-scope-ui-scale btn btn-outline-light btn-sm btn-overlay btn-overlay-icon", "", controllerDiv);
    if (!btnMagnitude) btnMagnitude = createTooltipButton("static-scope-ui-magnitude btn btn-outline-light btn-sm btn-overlay", "Switch to Linear Amplitude", controllerDiv, "dB");
    if (!divMagnitudeDbRange) {
        divMagnitudeDbRange = document.createElement("div");
        divMagnitudeDbRange.className = "static-scope-ui-db-range";
        controllerDiv.appendChild(divMagnitudeDbRange);
    }
    let inputMagnitudeDbMin = divMagnitudeDbRange.querySelector<HTMLInputElement>(".static-scope-ui-db-min");
    let inputMagnitudeDbMax = divMagnitudeDbRange.querySelector<HTMLInputElement>(".static-scope-ui-db-max");
    if (!inputMagnitudeDbMin) inputMagnitudeDbMin = createMagnitudeDbInput(divMagnitudeDbRange, "static-scope-ui-db-min", "Bottom", -100);
    if (!inputMagnitudeDbMax) inputMagnitudeDbMax = createMagnitudeDbInput(divMagnitudeDbRange, "static-scope-ui-db-max", "Top", 0);
    if (!btnDownload) btnDownload = createTooltipButton("static-scope-ui-download btn btn-outline-light btn-sm btn-overlay btn-overlay-icon", "Download Data", controllerDiv, '<i class="fas fa-download"></i>');

    let iSwitch: HTMLElement;
    let spanSwitch: HTMLSpanElement;
    for (let index = 0; index < btnSwitch.children.length; index++) {
        const element = btnSwitch.children[index];
        if (element.classList.contains("fas")) iSwitch = element as HTMLElement;
        if (element instanceof HTMLSpanElement) spanSwitch = element;
    }
    if (!iSwitch) {
        iSwitch = document.createElement("i");
        iSwitch.className = "fas fa-sm fa-wave-square";
        btnSwitch.appendChild(iSwitch);
    }
    if (!spanSwitch) {
        spanSwitch = document.createElement("span");
        spanSwitch.innerText = "Oscilloscope";
        btnSwitch.appendChild(spanSwitch);
    }

    let iScale: HTMLElement;
    for (let index = 0; index < btnScale.children.length; index++) {
        const element = btnScale.children[index];
        if (element.classList.contains("fas")) iScale = element as HTMLElement;
    }
    if (!iScale) {
        iScale = document.createElement("i");
        btnScale.appendChild(iScale);
    }

    return {
        canvas,
        ctx: canvas.getContext("2d"),
        spectTempCtx,
        divData,
        divDefault,
        btnSwitch,
        btnZoomOut,
        btnZoom,
        btnZoomIn,
        btnScale,
        btnMagnitude,
        divMagnitudeDbRange,
        inputMagnitudeDbMin,
        inputMagnitudeDbMax,
        btnDownload,
        iSwitch,
        spanSwitch,
        iScale
    };
};

/** Updates the magnitude scale button text and target tooltip. */
export const updateStaticScopeMagnitudeButton = (
    btnMagnitude: HTMLButtonElement,
    mode: MagnitudeScaleMode
) => {
    if (mode === MagnitudeScaleMode.Decibels) {
        btnMagnitude.innerText = "dB";
        btnMagnitude.setAttribute("title", "Switch to Linear Amplitude");
    } else {
        btnMagnitude.innerText = "amp";
        btnMagnitude.setAttribute("title", "Switch to Decibels");
    }
    refreshTooltip(btnMagnitude);
};

/**
 * Updates the frequency scale toggle icon and tooltip title.
 */
export const updateStaticScopeScaleButton = (
    btnScale: HTMLButtonElement,
    iScale: HTMLElement,
    mode: FrequencyScaleMode
) => {
    if (mode === FrequencyScaleMode.Linear) {
        iScale.className = "fas fa-ruler-horizontal";
        btnScale.setAttribute("title", "Switch to Logarithmic Scale");
    } else {
        iScale.className = "fas fa-chart-line";
        btnScale.setAttribute("title", "Switch to Linear Scale");
    }
    refreshTooltip(btnScale);
};

/**
 * Synchronizes the visible surface and toolbar buttons for the current mode.
 */
export const updateStaticScopeModeControls = ({
    mode,
    inFrequencyDomain,
    iSwitch,
    spanSwitch,
    divData,
    canvas,
    btnZoom,
    btnZoomIn,
    btnZoomOut,
    btnScale,
    btnMagnitude,
    divMagnitudeDbRange,
    magnitudeScaleMode
}: ModeControlUpdate) => {
    iSwitch.className = getStaticScopeIconClassName(mode);
    spanSwitch.innerText = getStaticScopeModeName(mode);

    if (mode === StaticScopeMode.Data) {
        divData.style.display = "block";
        canvas.style.display = "none";
        [btnZoom, btnZoomIn, btnZoomOut, btnScale, btnMagnitude, divMagnitudeDbRange].forEach(control => control.style.display = "none");
        return;
    }

    divData.style.display = "none";
    canvas.style.display = "block";
    [btnZoom, btnZoomIn, btnZoomOut].forEach(button => button.style.display = "");
    btnScale.style.display = inFrequencyDomain ? "" : "none";
    btnMagnitude.style.display = mode === StaticScopeMode.Spectroscope ? "" : "none";
    divMagnitudeDbRange.style.display = mode === StaticScopeMode.Spectroscope
        && magnitudeScaleMode === MagnitudeScaleMode.Decibels
        ? ""
        : "none";
};
