import type { TDrawOptions } from "../../StaticScope";
import { wrap } from "../../utils";
import {
    binIndexToFrequency,
    frequencyToBinIndex,
    getLogFrequencyWindow,
    indexToFrequency
} from "../FrequencyScale";
import { FrequencyScaleMode, StaticScopeMode } from "../ScopeModes";

type StatsToDraw = {
    x?: number;
    y?: number;
    xLabel?: string;
    yLabel?: string;
    values: number[];
};

type EventPayload = { type: string; data: any };

type FrequencyRendererDependencies = {
    /** Fills the canvas before spectra and overlays are drawn. */
    drawBackground: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void;
    /** Draws axes/grid and returns event marker payloads to paint over spectra. */
    drawGrid: (
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        drawStartValue: number,
        drawEndValue: number,
        stabilizationOffset: number,
        verticalScaleFactor: number,
        drawOptions: TDrawOptions,
        mode: StaticScopeMode,
        freqScaleMode?: FrequencyScaleMode
    ) => [number, EventPayload[]][];
    /** Draws one event marker returned by `drawGrid`. */
    drawEvent: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, x: number, eventData: EventPayload[]) => void;
    /** Draws cursor labels and sampled magnitudes. */
    drawStats: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, statsToDraw: StatsToDraw) => void;
};

/**
 * Draws the static scope spectroscope.
 *
 * The renderer supports both linear and logarithmic frequency scales. It keeps
 * the historical pixel-column max aggregation so zoomed-out spectra preserve
 * peaks instead of dropping bins.
 */
export const drawStaticSpectroscope = (
    dependencies: FrequencyRendererDependencies,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    drawOptions: TDrawOptions,
    horizontalZoom: number,
    horizontalZoomOffset: number,
    cursor: { x: number; y: number },
    freqScaleMode: FrequencyScaleMode
) => {
    dependencies.drawBackground(ctx, canvasWidth, canvasHeight);
    if (!drawOptions) return;
    const { startSampleIndex, freqDomainData, fftSize, fftOverlap, sampleRate } = drawOptions;
    if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return;

    const frequencyBinCount = fftSize / 2;
    let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
    startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
    const freqBufferLength = freqDomainData[0].length;

    const leftMargin = 50;
    const bottomMargin = 20;
    const heightPerChannel = (canvasHeight - bottomMargin) / freqDomainData.length;

    if (freqScaleMode === FrequencyScaleMode.Logarithmic) {
        const minFrequency = sampleRate / fftSize;
        const maxFrequency = sampleRate / 2;
        if (minFrequency <= 0) return;

        const { startLog, startFrequency, endFrequency, viewLogRange } = getLogFrequencyWindow(minFrequency, maxFrequency, horizontalZoom, horizontalZoomOffset);
        const startBinIndex = Math.max(1, Math.floor(frequencyToBinIndex(startFrequency, maxFrequency, frequencyBinCount)));
        const endBinIndex = Math.min(frequencyBinCount, Math.ceil(frequencyToBinIndex(endFrequency, maxFrequency, frequencyBinCount)));

        const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, startFrequency, endFrequency, 0, 1, drawOptions, StaticScopeMode.Spectroscope, freqScaleMode);

        for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
            ctx.beginPath();
            ctx.fillStyle = freqDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;

            const getX = (binIdx: number) => leftMargin + (canvasWidth - leftMargin) * (Math.log10(binIndexToFrequency(binIdx, maxFrequency, frequencyBinCount)) - startLog) / viewLogRange;
            const startX = getX(startBinIndex);
            ctx.moveTo(startX, heightPerChannel * (channelIndex + 1));

            let lastPixelX = -1;
            let maxMagnitudeInStep = -Infinity;

            for (let binIndex = startBinIndex; binIndex < endBinIndex; binIndex++) {
                const currentPixelX = Math.round(getX(binIndex));
                const wrappedBinIndex = wrap(binIndex, startFreqDataIndex, freqBufferLength);
                const magnitude = freqDomainData[channelIndex][wrappedBinIndex];

                if (currentPixelX === lastPixelX) {
                    if (magnitude > maxMagnitudeInStep) maxMagnitudeInStep = magnitude;
                } else {
                    if (lastPixelX !== -1) {
                        const y = heightPerChannel * (channelIndex + 1 - Math.min(1, Math.max(0, maxMagnitudeInStep / 100 + 1)));
                        ctx.lineTo(lastPixelX, y);
                    }
                    lastPixelX = currentPixelX;
                    maxMagnitudeInStep = magnitude;
                }
            }

            if (lastPixelX !== -1) {
                const y = heightPerChannel * (channelIndex + 1 - Math.min(1, Math.max(0, maxMagnitudeInStep / 100 + 1)));
                ctx.lineTo(lastPixelX, y);
            }

            const endX = getX(endBinIndex - 1);
            ctx.lineTo(endX, heightPerChannel * (channelIndex + 1));
            ctx.closePath();
            ctx.fill();
        }

        eventsToDraw.forEach(params => dependencies.drawEvent(ctx, canvasWidth, canvasHeight, ...params));
        if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
            const statsToDraw: StatsToDraw = { values: [] };
            const canvasDrawableWidth = canvasWidth - leftMargin;
            const logarithmicCursorFreq = startLog + (cursor.x - leftMargin) / canvasDrawableWidth * viewLogRange;
            const cursorFrequency = 10 ** logarithmicCursorFreq;
            const cursorBinIndex = Math.round(frequencyToBinIndex(cursorFrequency, maxFrequency, frequencyBinCount));
            if (cursorBinIndex >= 0 && cursorBinIndex < frequencyBinCount) {
                statsToDraw.x = cursor.x;
                statsToDraw.xLabel = cursorFrequency.toFixed(0);
                const wrappedCursorBinIndex = wrap(cursorBinIndex, startFreqDataIndex, freqBufferLength);
                for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                    const magnitude = freqDomainData[channelIndex][wrappedCursorBinIndex];
                    if (typeof magnitude === "number") statsToDraw.values.push(magnitude);
                }
                dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
            }
        }
    } else {
        const startBinIndex = freqBufferLength - frequencyBinCount + Math.round(frequencyBinCount * horizontalZoomOffset);
        const endBinIndex = freqBufferLength - frequencyBinCount + Math.round(frequencyBinCount / horizontalZoom + frequencyBinCount * horizontalZoomOffset);
        const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, startBinIndex, endBinIndex, 0, 1, drawOptions, StaticScopeMode.Spectroscope, freqScaleMode);

        const pixelsPerBin = (canvasWidth - leftMargin) / (endBinIndex - startBinIndex - 1);
        const horizontalDrawStep = Math.max(1, Math.round(1 / pixelsPerBin));

        for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
            ctx.beginPath();
            ctx.fillStyle = freqDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;
            let maxMagnitudeInStep: number;
            for (let binIndex = startBinIndex; binIndex < endBinIndex; binIndex++) {
                const wrappedBinIndex = wrap(binIndex, startFreqDataIndex, freqBufferLength);
                const magnitude = freqDomainData[channelIndex][wrappedBinIndex];
                const stepCounter = (binIndex - startBinIndex) % horizontalDrawStep;

                if (stepCounter === 0) maxMagnitudeInStep = magnitude;
                if (stepCounter !== horizontalDrawStep - 1) {
                    if (stepCounter !== 0 && magnitude > maxMagnitudeInStep) maxMagnitudeInStep = magnitude;
                    continue;
                }

                const x = (binIndex - startBinIndex) * pixelsPerBin + leftMargin;
                const y = heightPerChannel * (channelIndex + 1 - Math.min(1, Math.max(0, maxMagnitudeInStep / 100 + 1)));
                if (binIndex === startBinIndex) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.lineTo(canvasWidth, heightPerChannel * (channelIndex + 1));
            ctx.lineTo(leftMargin, heightPerChannel * (channelIndex + 1));
            ctx.closePath();
            ctx.fill();
        }

        eventsToDraw.forEach(params => dependencies.drawEvent(ctx, canvasWidth, canvasHeight, ...params));
        if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
            const statsToDraw: StatsToDraw = { values: [] };
            const cursorBinIndex = startBinIndex + Math.round((cursor.x - leftMargin) / pixelsPerBin);
            statsToDraw.x = (cursorBinIndex - startBinIndex) * pixelsPerBin + leftMargin;
            statsToDraw.xLabel = indexToFrequency(cursorBinIndex, frequencyBinCount, drawOptions.sampleRate).toFixed(0);
            const wrappedCursorBinIndex = wrap(cursorBinIndex, startFreqDataIndex, freqBufferLength);
            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                const magnitude = freqDomainData[channelIndex][wrappedCursorBinIndex];
                if (typeof magnitude === "number") statsToDraw.values.push(magnitude);
            }
            dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
        }
    }
};
