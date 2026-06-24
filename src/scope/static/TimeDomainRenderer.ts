/**
 * Static-scope time-domain renderers (oscilloscope and interleaved modes):
 * zero-crossing stabilization, min/max grouping per pixel, and cursor stats.
 * Extracted from StaticScope.
 */
import type { TDrawOptions } from "../../StaticScope";
import { StaticScopeMode } from "../ScopeModes";
import { wrap } from "../../utils";
import {
    STATIC_SCOPE_BOTTOM_MARGIN,
    STATIC_SCOPE_LEFT_MARGIN
} from "./StaticScopeLayout";

type StatsToDraw = {
    x?: number;
    y?: number;
    xLabel?: string;
    yLabel?: string;
    values: number[];
};

type EventPayload = { type: string; data: any };

type TimeDomainRendererDependencies = {
    /** Fills the scope canvas before the waveform and overlays are drawn. */
    drawBackground: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void;
    /** Draws axes/grid and returns event marker payloads to paint over waveforms. */
    drawGrid: (
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        drawStartValue: number,
        drawEndValue: number,
        stabilizationOffset: number,
        verticalScaleFactor: number,
        drawOptions: TDrawOptions,
        mode: StaticScopeMode
    ) => [number, EventPayload[]][];
    /** Draws one event marker returned by `drawGrid`. */
    drawEvent: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, x: number, eventData: EventPayload[]) => void;
    /** Draws cursor labels and sampled values. */
    drawStats: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, statsToDraw: StatsToDraw) => void;
};

/**
 * Calculates the visible sample window shared by oscilloscope and interleaved modes.
 *
 * The historical implementation stabilizes continuous buffers shorter than one
 * second by finding a zero crossing on channel 0, then applies the horizontal
 * zoom window relative to that stabilized region.
 */
const getTimeDomainWindow = (
    drawOptions: TDrawOptions,
    minSampleValue: number,
    maxSampleValue: number,
    horizontalZoom: number,
    horizontalZoomOffset: number
) => {
    const { startSampleIndex, timeDomainData, estimatedFundamentalFrequency, sampleRate, drawMode } = drawOptions;
    const bufferLength = timeDomainData[0].length;
    let drawStartIndex = 0;
    let drawEndIndex = bufferLength - 1;
    let stabilizationOffset = 0;

    if (drawMode === "continuous" && bufferLength < sampleRate) {
        const zeroCrossingThreshold = (minSampleValue + maxSampleValue) * 0.5 + 0.001;
        const estimatedPeriod = sampleRate / estimatedFundamentalFrequency;
        const periodsToDisplay = Math.floor(bufferLength / estimatedPeriod) - 1;

        while (timeDomainData[0][wrap(stabilizationOffset++, startSampleIndex, bufferLength)] > zeroCrossingThreshold && stabilizationOffset < bufferLength);
        if (stabilizationOffset >= bufferLength - 1) {
            stabilizationOffset = 0;
        } else {
            while (timeDomainData[0][wrap(stabilizationOffset++, startSampleIndex, bufferLength)] < zeroCrossingThreshold && stabilizationOffset < bufferLength);
            if (stabilizationOffset >= bufferLength - 1) {
                stabilizationOffset = 0;
            }
        }

        const drawableLength = periodsToDisplay > 0 && isFinite(estimatedPeriod)
            ? Math.min(estimatedPeriod * periodsToDisplay, bufferLength - stabilizationOffset)
            : bufferLength - stabilizationOffset;
        drawStartIndex = Math.round(stabilizationOffset + drawableLength * horizontalZoomOffset);
        drawEndIndex = Math.round(stabilizationOffset + drawableLength / horizontalZoom + drawableLength * horizontalZoomOffset);
    } else {
        drawStartIndex = Math.round(bufferLength * horizontalZoomOffset);
        drawEndIndex = Math.round(bufferLength / horizontalZoom + bufferLength * horizontalZoomOffset);
    }

    return { drawStartIndex, drawEndIndex, stabilizationOffset };
};

const getTimeDomainRange = (timeDomainData: Float32Array[]) => {
    const bufferLength = timeDomainData[0].length;
    let minSampleValue = timeDomainData[0][0];
    let maxSampleValue = timeDomainData[0][0];

    for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
        for (let sampleIndex = 0; sampleIndex < bufferLength; sampleIndex++) {
            const sampleValue = timeDomainData[channelIndex][sampleIndex];
            if (sampleValue < minSampleValue) minSampleValue = sampleValue;
            else if (sampleValue > maxSampleValue) maxSampleValue = sampleValue;
        }
    }

    return { minSampleValue, maxSampleValue };
};

/**
 * Draws each time-domain channel in its own horizontal lane.
 */
export const drawStaticInterleaved = (
    dependencies: TimeDomainRendererDependencies,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    drawOptions: TDrawOptions,
    horizontalZoom: number,
    horizontalZoomOffset: number,
    verticalZoom: number,
    cursor?: { x: number; y: number }
) => {
    dependencies.drawBackground(ctx, canvasWidth, canvasHeight);
    if (!drawOptions) return;
    const { startSampleIndex, timeDomainData } = drawOptions;
    if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;

    const bufferLength = timeDomainData[0].length;
    const { minSampleValue, maxSampleValue } = getTimeDomainRange(timeDomainData);
    const verticalScaleFactor = Math.max(1, Math.abs(minSampleValue), Math.abs(maxSampleValue)) * verticalZoom;
    const { drawStartIndex, drawEndIndex, stabilizationOffset } = getTimeDomainWindow(drawOptions, minSampleValue, maxSampleValue, horizontalZoom, horizontalZoomOffset);

    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    const heightPerChannel = (canvasHeight - bottomMargin) / timeDomainData.length;
    const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, drawStartIndex - stabilizationOffset, drawEndIndex - stabilizationOffset, stabilizationOffset, verticalScaleFactor, drawOptions, StaticScopeMode.Interleaved);

    const pixelsPerSample = (canvasWidth - leftMargin) / (drawEndIndex - drawStartIndex - 1);
    const horizontalDrawStep = Math.max(1, Math.round(1 / pixelsPerSample));

    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${channelIndex * 60}, 100%, 85%)`;
        let maxInStep: number;
        let minInStep: number;

        for (let sampleIndex = drawStartIndex; sampleIndex < drawEndIndex; sampleIndex++) {
            const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
            const sampleValue = timeDomainData[channelIndex][wrappedSampleIndex];
            const stepCounter = (sampleIndex - drawStartIndex) % horizontalDrawStep;

            if (stepCounter === 0) {
                maxInStep = sampleValue;
                minInStep = sampleValue;
            } else {
                if (sampleValue > maxInStep) maxInStep = sampleValue;
                if (sampleValue < minInStep) minInStep = sampleValue;
            }

            if (stepCounter !== horizontalDrawStep - 1) continue;

            const x = (sampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
            let y = heightPerChannel * (channelIndex + 0.5 - maxInStep / verticalScaleFactor * 0.5);

            if (sampleIndex === drawStartIndex) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            if (minInStep !== maxInStep) {
                y = heightPerChannel * (channelIndex + 0.5 - minInStep / verticalScaleFactor * 0.5);
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    eventsToDraw.forEach(params => dependencies.drawEvent(ctx, canvasWidth, canvasHeight, ...params));

    if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
        const statsToDraw: StatsToDraw = { values: [] };
        const cursorSampleIndex = Math.round(drawStartIndex + (cursor.x - leftMargin) / pixelsPerSample);
        statsToDraw.values = [];
        statsToDraw.x = (cursorSampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
        statsToDraw.xLabel = (cursorSampleIndex - stabilizationOffset).toFixed(0);
        const wrappedCursorSampleIndex = wrap(cursorSampleIndex, startSampleIndex, bufferLength);
        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            const sampleValue = timeDomainData[channelIndex][wrappedCursorSampleIndex];
            if (typeof sampleValue === "number") statsToDraw.values.push(sampleValue);
        }
        dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
    }
};

/**
 * Draws all time-domain channels overlaid in one oscilloscope viewport.
 */
export const drawStaticOscilloscope = (
    dependencies: TimeDomainRendererDependencies,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    drawOptions: TDrawOptions,
    horizontalZoom: number,
    horizontalZoomOffset: number,
    verticalZoom: number,
    cursor?: { x: number; y: number }
) => {
    dependencies.drawBackground(ctx, canvasWidth, canvasHeight);
    if (!drawOptions) return;
    const { startSampleIndex, timeDomainData } = drawOptions;
    if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;

    const bufferLength = timeDomainData[0].length;
    const { minSampleValue, maxSampleValue } = getTimeDomainRange(timeDomainData);
    const verticalScaleFactor = Math.max(1, Math.abs(minSampleValue), Math.abs(maxSampleValue)) * verticalZoom;
    const { drawStartIndex, drawEndIndex, stabilizationOffset } = getTimeDomainWindow(drawOptions, minSampleValue, maxSampleValue, horizontalZoom, horizontalZoomOffset);

    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, drawStartIndex - stabilizationOffset, drawEndIndex - stabilizationOffset, stabilizationOffset, verticalScaleFactor, drawOptions, StaticScopeMode.Oscilloscope);
    const pixelsPerSample = (canvasWidth - leftMargin) / (drawEndIndex - drawStartIndex - 1);
    const horizontalDrawStep = Math.max(1, Math.round(1 / pixelsPerSample));

    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
        ctx.beginPath();
        ctx.strokeStyle = timeDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;
        let maxInStep: number;
        let minInStep: number;

        for (let sampleIndex = drawStartIndex; sampleIndex < drawEndIndex; sampleIndex++) {
            const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
            const sampleValue = timeDomainData[channelIndex][wrappedSampleIndex];
            const stepCounter = (sampleIndex - drawStartIndex) % horizontalDrawStep;

            if (stepCounter === 0) {
                maxInStep = sampleValue;
                minInStep = sampleValue;
            } else {
                if (sampleValue > maxInStep) maxInStep = sampleValue;
                if (sampleValue < minInStep) minInStep = sampleValue;
            }

            if (stepCounter !== horizontalDrawStep - 1) continue;

            const x = (sampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
            let y = (canvasHeight - bottomMargin) * (0.5 - maxInStep / verticalScaleFactor * 0.5);

            if (sampleIndex === drawStartIndex) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            if (minInStep !== maxInStep) {
                y = (canvasHeight - bottomMargin) * (0.5 - minInStep / verticalScaleFactor * 0.5);
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    eventsToDraw.forEach(params => dependencies.drawEvent(ctx, canvasWidth, canvasHeight, ...params));

    if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
        const statsToDraw: StatsToDraw = { values: [] };
        const cursorSampleIndex = Math.round(drawStartIndex + (cursor.x - leftMargin) / pixelsPerSample);
        statsToDraw.values = [];
        statsToDraw.x = (cursorSampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
        statsToDraw.xLabel = (cursorSampleIndex - stabilizationOffset).toFixed(0);
        const wrappedCursorSampleIndex = wrap(cursorSampleIndex, startSampleIndex, bufferLength);
        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            const sampleValue = timeDomainData[channelIndex][wrappedCursorSampleIndex];
            if (typeof sampleValue === "number") statsToDraw.values.push(sampleValue);
        }
        dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
    }
};
