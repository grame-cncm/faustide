import type { TDrawOptions } from "../../StaticScope";
import { StaticScopeMode } from "../ScopeModes";

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
    /** True while a pointer drag is panning the visible window. */
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
    eventDown.preventDefault();
    eventDown.stopPropagation();
    target.dragging = true;
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
 * Applies wheel interaction for vertical zoom, horizontal zoom, and trackpad pan.
 */
export const handleStaticScopeWheel = (
    target: StaticScopeInteractionTarget,
    event: WheelEvent
) => {
    const leftMargin = 50;
    const bottomMargin = 20;
    const multiplier = 1.5 ** (event.deltaY > 0 ? -1 : 1);

    if (event.offsetX < leftMargin && event.offsetY < target.canvas.height - bottomMargin) {
        if (multiplier !== 1) target.vzoom *= 1 / multiplier;
        target.draw();
        return;
    }

    if (multiplier !== 1) target.zoom *= multiplier;
    if (event.deltaX !== 0) target.zoomOffset += (event.deltaX > 0 ? 1 : -1) * 0.1;
    handleStaticScopePointerMove(target, event);
};
