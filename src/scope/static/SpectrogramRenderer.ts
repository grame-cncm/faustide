/**
 * Static-scope spectrogram renderer: maintains the offscreen cache canvas of
 * the full history and blits the visible (possibly wrapped) range, on a linear
 * or logarithmic frequency scale. Extracted from StaticScope.
 */
import type { TDrawOptions } from "../../StaticScope";
import { wrap } from "../../utils";
import {
    frequencyToBinIndex,
    indexToFrequency,
    logarithmicPositionToFrequency
} from "../FrequencyScale";
import { FrequencyScaleMode, StaticScopeMode } from "../ScopeModes";
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

type SpectrogramRendererDependencies = {
    /** Fills the visible canvas before the cached spectrogram image is drawn. */
    drawBackground: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void;
    /** Draws axes/grid and returns event marker payloads to paint over the cache image. */
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
 * Draws the visible spectrogram viewport from the offscreen cache.
 *
 * The offscreen cache is indexed by FFT frame. This renderer maps the current
 * zoom window onto that circular cache, splitting the draw when the visible
 * frame range wraps around the cache end.
 */
export const drawStaticSpectrogram = (
    dependencies: SpectrogramRendererDependencies,
    ctx: CanvasRenderingContext2D,
    spectrogramCacheContext: CanvasRenderingContext2D,
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

    const frameCount = freqDomainData[0].length / frequencyBinCount;
    const startFrameIndex = Math.floor(frameCount * horizontalZoomOffset);
    const endFrameIndex = Math.ceil(frameCount / horizontalZoom + frameCount * horizontalZoomOffset);
    const startDataIndex = startFrameIndex * frequencyBinCount;
    const endDataIndex = endFrameIndex * frequencyBinCount;
    const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, startDataIndex, endDataIndex, 0, 1, drawOptions, StaticScopeMode.Spectrogram, freqScaleMode);

    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.imageSmoothingEnabled = false;

    const sourceStartX = wrap(startFrameIndex, startFreqDataIndex / frequencyBinCount, frameCount);
    const sourceEndX = sourceStartX + (endFrameIndex - startFrameIndex);
    if (sourceEndX > frameCount) {
        const splitPoint = frameCount - sourceStartX;
        const destWidth1 = splitPoint / (sourceEndX - sourceStartX) * (canvasWidth - leftMargin);
        const destWidth2 = (1 - splitPoint / (sourceEndX - sourceStartX)) * (canvasWidth - leftMargin);
        ctx.drawImage(spectrogramCacheContext.canvas, sourceStartX, 0, splitPoint, spectrogramCacheContext.canvas.height, leftMargin, 0, destWidth1, canvasHeight - bottomMargin);
        ctx.drawImage(spectrogramCacheContext.canvas, 0, 0, sourceEndX - frameCount - 0.01, spectrogramCacheContext.canvas.height, destWidth1 + leftMargin, 0, destWidth2, canvasHeight - bottomMargin);
    } else {
        ctx.drawImage(spectrogramCacheContext.canvas, sourceStartX, 0, sourceEndX - sourceStartX, spectrogramCacheContext.canvas.height, leftMargin, 0, canvasWidth - leftMargin, canvasHeight - bottomMargin);
    }

    ctx.restore();
    eventsToDraw.forEach(params => dependencies.drawEvent(ctx, canvasWidth, canvasHeight, ...params));

    if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
        const statsToDraw: StatsToDraw = { values: [] };
        const pixelsPerFrame = (canvasWidth - leftMargin) / (endFrameIndex - startFrameIndex);
        const cursorFrameIndex = startFrameIndex + Math.floor((cursor.x - leftMargin) / pixelsPerFrame);
        const cursorChannelIndex = Math.floor(cursor.y / ((canvasHeight - bottomMargin) / freqDomainData.length));
        let cursorBinIndex: number;
        let cursorFrequency: number;

        if (freqScaleMode === FrequencyScaleMode.Logarithmic) {
            const heightPerChannel = (canvasHeight - bottomMargin) / freqDomainData.length;
            const yInChannel = cursor.y - cursorChannelIndex * heightPerChannel;
            const minFrequency = sampleRate / fftSize;
            const maxFrequency = sampleRate / 2;
            if (minFrequency > 0) {
                const logPosition = (heightPerChannel - yInChannel) / heightPerChannel;
                cursorFrequency = logarithmicPositionToFrequency(logPosition, minFrequency, maxFrequency);
                cursorBinIndex = Math.floor(frequencyToBinIndex(cursorFrequency, maxFrequency, frequencyBinCount));
            }
        } else {
            const pixelsPerBin = (canvasHeight - bottomMargin) / freqDomainData.length / frequencyBinCount;
            const yInChannelView = (cursorChannelIndex + 1) * (canvasHeight - bottomMargin) / freqDomainData.length - cursor.y;
            cursorBinIndex = Math.floor(yInChannelView / pixelsPerBin);
            cursorFrequency = indexToFrequency(cursorBinIndex, frequencyBinCount, sampleRate);
        }

        if (typeof cursorFrequency === "number") {
            const dataIndex = cursorFrameIndex * frequencyBinCount + cursorBinIndex;
            const wrappedDataIndex = wrap(dataIndex, startFreqDataIndex, freqDomainData[0].length);
            const magnitude = freqDomainData[cursorChannelIndex][wrappedDataIndex];
            if (typeof magnitude === "number") statsToDraw.values = [magnitude];
            statsToDraw.x = (cursorFrameIndex - startFrameIndex + 0.5) * pixelsPerFrame + leftMargin;
            statsToDraw.y = cursor.y;
            statsToDraw.xLabel = cursorFrameIndex.toFixed(0);
            statsToDraw.yLabel = cursorFrequency.toFixed(0);
            dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
        }
    }
};

/**
 * Writes newly available FFT frames into the offscreen spectrogram cache.
 *
 * Linear mode groups bins when there are more bins than vertical pixels. Log
 * mode samples the source FFT data by logarithmic pixel position. Both modes
 * preserve the historical HSL magnitude mapping used by `StaticScope`.
 */
export const drawStaticOfflineSpectrogram = (
    spectrogramCacheContext: CanvasRenderingContext2D,
    drawOptions: TDrawOptions,
    lastDrawnSampleIndex: number,
    freqScaleMode: FrequencyScaleMode
) => {
    if (!drawOptions) return lastDrawnSampleIndex;
    const { startSampleIndex, freqDomainData, fftSize, fftOverlap, sampleRate } = drawOptions;
    if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return lastDrawnSampleIndex;

    const frequencyBinCount = fftSize / 2;
    let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
    startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;

    const { width: canvasWidth, height: canvasHeight } = spectrogramCacheContext.canvas;
    const freqBufferLength = freqDomainData[0].length;
    const startDrawIndex = wrap(lastDrawnSampleIndex, 0, freqBufferLength);
    const endDrawIndex = startDrawIndex >= startFreqDataIndex ? startFreqDataIndex + freqBufferLength : startFreqDataIndex;
    if (endDrawIndex - startDrawIndex < 0) return lastDrawnSampleIndex;

    const startFrameIndex = Math.floor(startDrawIndex / frequencyBinCount);
    const endFrameIndex = Math.ceil(endDrawIndex / frequencyBinCount);
    const heightPerChannel = canvasHeight / freqDomainData.length;
    const spectrogramWidthInFrames = freqBufferLength / frequencyBinCount;

    if (canvasWidth !== spectrogramWidthInFrames) spectrogramCacheContext.canvas.width = spectrogramWidthInFrames;

    if (freqScaleMode === FrequencyScaleMode.Logarithmic) {
        const minFrequency = sampleRate / fftSize;
        const maxFrequency = sampleRate / 2;
        if (minFrequency <= 0) return lastDrawnSampleIndex;
        for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
            for (let frameIndex = startFrameIndex; frameIndex < endFrameIndex; frameIndex++) {
                for (let yPixel = 0; yPixel < heightPerChannel; yPixel++) {
                    const logPosition = (heightPerChannel - yPixel - 1) / heightPerChannel;
                    const frequency = logarithmicPositionToFrequency(logPosition, minFrequency, maxFrequency);
                    const binIndex = Math.floor(frequencyToBinIndex(frequency, maxFrequency, frequencyBinCount));
                    if (binIndex >= frequencyBinCount || binIndex < 0) continue;

                    const magnitude = freqDomainData[channelIndex][wrap(binIndex, frameIndex * frequencyBinCount, freqBufferLength)];
                    const normalizedMagnitude = Math.min(1, Math.max(0, (magnitude + 10) / 100 + 1));
                    if (normalizedMagnitude === 0) continue;

                    const hue = (normalizedMagnitude * 180 + 240) % 360;
                    const luminosity = normalizedMagnitude * 50;
                    spectrogramCacheContext.fillStyle = `hsl(${hue}, 100%, ${luminosity}%)`;
                    spectrogramCacheContext.fillRect(frameIndex % spectrogramWidthInFrames, channelIndex * heightPerChannel + yPixel, 1, 1);
                }
            }
        }
    } else {
        const pixelsPerBin = heightPerChannel / frequencyBinCount;
        const step = Math.max(1, Math.round(frequencyBinCount / heightPerChannel));
        for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
            for (let frameIndex = startFrameIndex; frameIndex < endFrameIndex; frameIndex++) {
                let maxMagnitudeInStep: number;
                spectrogramCacheContext.fillStyle = "black";
                spectrogramCacheContext.fillRect(frameIndex % spectrogramWidthInFrames, channelIndex * heightPerChannel, 1, heightPerChannel);
                for (let binIndex = 0; binIndex < frequencyBinCount; binIndex++) {
                    const magnitude = freqDomainData[channelIndex][wrap(binIndex, frameIndex * frequencyBinCount, freqBufferLength)];
                    const stepCounter = binIndex % step;
                    if (stepCounter === 0) maxMagnitudeInStep = magnitude;
                    if (stepCounter !== step - 1) {
                        if (stepCounter !== 0 && magnitude > maxMagnitudeInStep) maxMagnitudeInStep = magnitude;
                        continue;
                    }

                    const normalizedMagnitude = Math.min(1, Math.max(0, (maxMagnitudeInStep + 10) / 100 + 1));
                    if (normalizedMagnitude === 0) continue;

                    const hue = (normalizedMagnitude * 180 + 240) % 360;
                    const luminosity = normalizedMagnitude * 50;
                    spectrogramCacheContext.fillStyle = `hsl(${hue}, 100%, ${luminosity}%)`;
                    spectrogramCacheContext.fillRect(frameIndex % spectrogramWidthInFrames, (frequencyBinCount - binIndex - 1) * pixelsPerBin + channelIndex * heightPerChannel, 1, Math.max(1, pixelsPerBin));
                }
            }
        }
    }

    return wrap(endDrawIndex, 0, freqBufferLength);
};
