import type { TDrawOptions, TWaveformSelection } from "./StaticScopeTypes";
import { StaticScopeMode } from "../ScopeModes";
import { getVisibleTimeDomainWindow } from "./TimeDomainRenderer";
import {
    STATIC_SCOPE_BOTTOM_MARGIN,
    STATIC_SCOPE_LEFT_MARGIN
} from "./StaticScopeLayout";

export type StaticScopeInteractionTarget = {
    /** Latest draw payload used to determine whether pointer interaction is meaningful. */
    data: TDrawOptions;
    /** Current display mode. Data mode ignores canvas pointer interaction. */
    mode: StaticScopeMode;
    /** Root element whose client dimensions define pointer clamping bounds. */
    container: HTMLDivElement;
    /** Canvas that receives pointer events and exposes the rendered width. */
    canvas: HTMLCanvasElement;
    /** Current cursor position sampled by renderers. */
    cursor?: { x: number; y: number };
    /** Selected logical sample range in a non-continuous waveform. */
    selection?: TWaveformSelection;
    /** True while a pointer drag is panning or selecting the visible window. */
    dragging: boolean;
    /** Active horizontal zoom for the current mode. */
    zoom: number;
    /** Active horizontal zoom offset for the current mode. */
    zoomOffset: number;
    /** Active vertical zoom for the current mode. */
    vzoom: number;
    /** Schedules or performs a redraw after interaction changes state. */
    draw: () => void;
};

const canInteractWithCanvas = (target: StaticScopeInteractionTarget) =>
    target.data
    && target.data.timeDomainData
    && target.data.timeDomainData.length
    && target.data.timeDomainData[0].length
    && target.mode !== StaticScopeMode.Data;

const getPageX = (event: MouseEvent | TouchEvent) =>
    event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;

const getCanvasPoint = (
    target: StaticScopeInteractionTarget,
    event: MouseEvent | TouchEvent,
    preferCanvasOffset = false
) => {
    const rect = target.canvas.getBoundingClientRect();
    if (event instanceof MouseEvent) {
        return preferCanvasOffset
            ? { x: event.offsetX, y: event.offsetY }
            : { x: event.pageX - rect.left, y: event.pageY - rect.top };
    }
    return {
        x: event.touches[0].pageX - rect.left,
        y: event.touches[0].pageY - rect.top
    };
};

const isWaveformMode = (mode: StaticScopeMode) =>
    mode === StaticScopeMode.Oscilloscope || mode === StaticScopeMode.Interleaved;

const getSelectionSampleIndex = (
    target: StaticScopeInteractionTarget,
    canvasX: number
) => {
    const bufferLength = target.data.timeDomainData[0].length;
    const { drawStartIndex, drawEndIndex } = getVisibleTimeDomainWindow(
        target.data,
        target.zoom,
        target.zoomOffset
    );
    const drawableWidth = Math.max(1, target.canvas.width - STATIC_SCOPE_LEFT_MARGIN);
    const position = Math.max(0, Math.min(1, (canvasX - STATIC_SCOPE_LEFT_MARGIN) / drawableWidth));
    return Math.max(
        0,
        Math.min(bufferLength, Math.round(drawStartIndex + position * (drawEndIndex - drawStartIndex)))
    );
};

/**
 * Updates the renderer cursor from a mouse or touch event.
 *
 * Positions are clamped to the current container size so downstream renderers
 * can assume the cursor remains inside the visible canvas bounds.
 */
export const handleStaticScopePointerMove = (
    target: StaticScopeInteractionTarget,
    event: MouseEvent | TouchEvent
) => {
    if (!canInteractWithCanvas(target)) return;
    const canvasWidth = target.container.clientWidth;
    const canvasHeight = target.container.clientHeight;
    const rect = target.canvas.getBoundingClientRect();
    let x = event instanceof MouseEvent ? event.offsetX : event.touches[0].pageX - rect.left;
    x = Math.max(0, Math.min(canvasWidth, x));
    let y = event instanceof MouseEvent ? event.offsetY : event.touches[0].pageY - rect.top;
    y = Math.max(0, Math.min(canvasHeight, y));
    target.cursor = { x, y };
    target.draw();
};

/**
 * Clears cursor state when the pointer leaves the canvas.
 */
export const handleStaticScopePointerLeave = (target: StaticScopeInteractionTarget) => {
    if (!canInteractWithCanvas(target)) return;
    target.cursor = undefined;
    target.draw();
};

/**
 * Starts a drag-to-pan interaction and installs temporary document listeners.
 *
 * The panning math is intentionally unchanged from the original implementation:
 * horizontal movement updates `zoomOffset` relative to current zoom and canvas
 * width, while release removes all transient listeners.
 */
export const handleStaticScopePointerDown = (
    target: StaticScopeInteractionTarget,
    eventDown: MouseEvent | TouchEvent
) => {
    if (!canInteractWithCanvas(target)) return;
    const point = getCanvasPoint(target, eventDown, true);
    if (
        point.x < STATIC_SCOPE_LEFT_MARGIN
        || point.y >= target.canvas.height - STATIC_SCOPE_BOTTOM_MARGIN
    ) return;
    eventDown.preventDefault();
    eventDown.stopPropagation();
    target.dragging = true;
    target.canvas.focus();

    const selecting = eventDown instanceof MouseEvent
        && !eventDown.altKey
        && target.data.drawMode !== "continuous"
        && isWaveformMode(target.mode);

    if (selecting) {
        const anchorSampleIndex = getSelectionSampleIndex(target, point.x);
        target.selection = {
            startSampleIndex: anchorSampleIndex,
            endSampleIndex: anchorSampleIndex
        };
        target.canvas.style.cursor = "crosshair";
        target.draw();

        const handleSelectionMove = (moveEvent: MouseEvent | TouchEvent) => {
            const currentPoint = getCanvasPoint(target, moveEvent);
            const currentSampleIndex = getSelectionSampleIndex(target, currentPoint.x);
            target.selection = {
                startSampleIndex: Math.min(anchorSampleIndex, currentSampleIndex),
                endSampleIndex: Math.max(anchorSampleIndex, currentSampleIndex)
            };
            target.draw();
        };

        const handleSelectionEnd = () => {
            target.dragging = false;
            target.canvas.style.cursor = "";
            if (target.selection.startSampleIndex === target.selection.endSampleIndex) {
                target.selection = undefined;
                target.draw();
            }
            document.removeEventListener("mousemove", handleSelectionMove);
            document.removeEventListener("touchmove", handleSelectionMove);
            document.removeEventListener("mouseup", handleSelectionEnd);
            document.removeEventListener("touchend", handleSelectionEnd);
        };

        document.addEventListener("mousemove", handleSelectionMove);
        document.addEventListener("touchmove", handleSelectionMove);
        document.addEventListener("mouseup", handleSelectionEnd);
        document.addEventListener("touchend", handleSelectionEnd);
        return;
    }

    target.canvas.style.cursor = "grab";
    const originalZoom = target.zoom;
    const originalOffset = target.zoomOffset;
    let previousX = getPageX(eventDown);

    const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
        const currentX = getPageX(moveEvent);
        const deltaX = currentX - previousX;
        previousX = currentX;
        const offsetChange = -deltaX / target.zoom / target.canvas.width;
        if (offsetChange !== 0) target.zoomOffset += offsetChange;
        if (target.zoom !== originalZoom || target.zoomOffset !== originalOffset) target.draw();
    };

    const handleMouseUp = () => {
        target.dragging = false;
        target.canvas.style.cursor = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchend", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
};

/**
 * Resets only the axis whose gutter receives a double-click.
 */
export const handleStaticScopeDoubleClick = (
    target: StaticScopeInteractionTarget,
    event: MouseEvent
) => {
    if (!canInteractWithCanvas(target)) return;
    const x = event.offsetX;
    const y = event.offsetY;

    if (x < STATIC_SCOPE_LEFT_MARGIN && y < target.canvas.height - STATIC_SCOPE_BOTTOM_MARGIN) {
        event.preventDefault();
        target.vzoom = 1;
        target.draw();
        return;
    }

    if (x >= STATIC_SCOPE_LEFT_MARGIN && y >= target.canvas.height - STATIC_SCOPE_BOTTOM_MARGIN) {
        event.preventDefault();
        target.zoom = 1;
        target.zoomOffset = 0;
        target.draw();
    }
};

/**
 * Applies wheel interaction for vertical zoom, horizontal zoom, and trackpad pan.
 */
export const handleStaticScopeWheel = (
    target: StaticScopeInteractionTarget,
    event: WheelEvent
) => {
    event.preventDefault();
    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    const multiplier = event.deltaY === 0 ? 1 : 1.5 ** (event.deltaY > 0 ? -1 : 1);

    // Update the cursor before changing zoom. StaticScope's zoom setter uses
    // this position to keep the sample/frequency under the pointer fixed.
    handleStaticScopePointerMove(target, event);

    if (event.offsetX < leftMargin && event.offsetY < target.canvas.height - bottomMargin) {
        if (multiplier !== 1) target.vzoom *= 1 / multiplier;
        target.draw();
        return;
    }

    if (multiplier !== 1) target.zoom *= multiplier;
    if (event.deltaX !== 0) target.zoomOffset += (event.deltaX > 0 ? 1 : -1) * 0.1;
    target.draw();
};
