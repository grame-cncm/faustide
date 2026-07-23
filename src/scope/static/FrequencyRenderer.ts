/**
 * Static-scope frequency renderers for magnitude and wrapped phase.
 *
 * Magnitude supports dBFS and normalized linear amplitude; both views support
 * linear/log frequency mapping and cursor statistics. Extracted from StaticScope.
 */
import type { TDrawOptions } from "./StaticScopeTypes";
import { wrap } from "../../utils";
import {
    binIndexToFrequency,
    frequencyToBinIndex,
    getLogFrequencyWindow
} from "../FrequencyScale";
import { FrequencyScaleMode, MagnitudeScaleMode, StaticScopeMode } from "../ScopeModes";
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
        freqScaleMode?: FrequencyScaleMode,
        magnitudeScaleMode?: MagnitudeScaleMode
    ) => [number, EventPayload[]][];
    /** Draws one event marker returned by `drawGrid`. */
    drawEvent: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, x: number, eventData: EventPayload[]) => void;
    /** Draws cursor labels and sampled magnitudes. */
    drawStats: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, statsToDraw: StatsToDraw) => void;
};

const dbToLinearAmplitude = (magnitudeDb: number) => 10 ** (magnitudeDb / 20);

const getMagnitudeDisplayValue = (magnitudeDb: number, mode: MagnitudeScaleMode) =>
    mode === MagnitudeScaleMode.Decibels ? magnitudeDb : dbToLinearAmplitude(magnitudeDb);

const getMagnitudePosition = (magnitudeDb: number, mode: MagnitudeScaleMode) =>
    mode === MagnitudeScaleMode.Decibels
        ? Math.min(1, Math.max(0, magnitudeDb / 100 + 1))
        : Math.min(1, Math.max(0, dbToLinearAmplitude(magnitudeDb)));

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
    freqScaleMode: FrequencyScaleMode,
    magnitudeScaleMode = MagnitudeScaleMode.Decibels
) => {
    dependencies.drawBackground(ctx, canvasWidth, canvasHeight);
    if (!drawOptions) return;
    const { startSampleIndex, freqDomainData, fftSize, fftOverlap, sampleRate } = drawOptions;
    if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return;

    const frequencyBinCount = fftSize / 2;
    let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
    startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
    const freqBufferLength = freqDomainData[0].length;

    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    const heightPerChannel = (canvasHeight - bottomMargin) / freqDomainData.length;

    if (freqScaleMode === FrequencyScaleMode.Logarithmic) {
        const minFrequency = sampleRate / fftSize;
        const maxFrequency = sampleRate / 2;
        if (minFrequency <= 0) return;

        const { startLog, startFrequency, endFrequency, viewLogRange } = getLogFrequencyWindow(minFrequency, maxFrequency, horizontalZoom, horizontalZoomOffset);
        const startBinIndex = Math.max(1, Math.floor(frequencyToBinIndex(startFrequency, maxFrequency, frequencyBinCount)));
        const endBinIndex = Math.min(frequencyBinCount, Math.ceil(frequencyToBinIndex(endFrequency, maxFrequency, frequencyBinCount)));

        const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, startFrequency, endFrequency, 0, 1, drawOptions, StaticScopeMode.Spectroscope, freqScaleMode, magnitudeScaleMode);

        for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
            ctx.beginPath();
            ctx.fillStyle = freqDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;

            const drawableWidth = Math.max(1, Math.floor(canvasWidth - leftMargin));
            ctx.moveTo(leftMargin, heightPerChannel * (channelIndex + 1));

            // Project pixel boundaries back to FFT bins. This scans the bins
            // once per pixel column without calling log10 for every bin, which
            // keeps large logarithmic FFT plots responsive during cursor moves.
            for (let pixel = 0; pixel <= drawableWidth; pixel++) {
                const columnStartLog = startLog + pixel / drawableWidth * viewLogRange;
                const columnEndLog = startLog + Math.min(1, (pixel + 1) / drawableWidth) * viewLogRange;
                const columnStartBin = Math.max(startBinIndex, Math.floor(frequencyToBinIndex(10 ** columnStartLog, maxFrequency, frequencyBinCount)));
                const columnEndBin = Math.min(endBinIndex, Math.max(columnStartBin + 1, Math.ceil(frequencyToBinIndex(10 ** columnEndLog, maxFrequency, frequencyBinCount))));
                let maxMagnitude = -Infinity;
                for (let binIndex = columnStartBin; binIndex < columnEndBin; binIndex++) {
                    const wrappedBinIndex = wrap(binIndex, startFreqDataIndex, freqBufferLength);
                    const magnitude = freqDomainData[channelIndex][wrappedBinIndex];
                    if (magnitude > maxMagnitude) maxMagnitude = magnitude;
                }
                const y = heightPerChannel * (channelIndex + 1 - getMagnitudePosition(maxMagnitude, magnitudeScaleMode));
                ctx.lineTo(leftMargin + pixel, y);
            }

            ctx.lineTo(canvasWidth, heightPerChannel * (channelIndex + 1));
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
                    if (typeof magnitude === "number") statsToDraw.values.push(getMagnitudeDisplayValue(magnitude, magnitudeScaleMode));
                }
                dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
            }
        }
    } else {
        const frameStartBinIndex = freqBufferLength - frequencyBinCount;
        const visibleStartBinIndex = Math.round(frequencyBinCount * horizontalZoomOffset);
        const visibleEndBinIndex = Math.round(frequencyBinCount / horizontalZoom + frequencyBinCount * horizontalZoomOffset);
        const startBinIndex = frameStartBinIndex + visibleStartBinIndex;
        const endBinIndex = frameStartBinIndex + visibleEndBinIndex;
        const startFrequency = binIndexToFrequency(visibleStartBinIndex, sampleRate / 2, frequencyBinCount);
        const endFrequency = binIndexToFrequency(visibleEndBinIndex, sampleRate / 2, frequencyBinCount);
        const eventsToDraw = dependencies.drawGrid(ctx, canvasWidth, canvasHeight, startFrequency, endFrequency, 0, 1, drawOptions, StaticScopeMode.Spectroscope, freqScaleMode, magnitudeScaleMode);

        const pixelsPerBin = (canvasWidth - leftMargin) / Math.max(1, endBinIndex - startBinIndex - 1);
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
                const y = heightPerChannel * (channelIndex + 1 - getMagnitudePosition(maxMagnitudeInStep, magnitudeScaleMode));
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
            statsToDraw.xLabel = binIndexToFrequency(cursorBinIndex - frameStartBinIndex, sampleRate / 2, frequencyBinCount).toFixed(0);
            const wrappedCursorBinIndex = wrap(cursorBinIndex, startFreqDataIndex, freqBufferLength);
            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                const magnitude = freqDomainData[channelIndex][wrappedCursorBinIndex];
                if (typeof magnitude === "number") statsToDraw.values.push(getMagnitudeDisplayValue(magnitude, magnitudeScaleMode));
            }
            dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
        }
    }
};

/** Draws wrapped FFT phase as one line per channel. */
export const drawStaticPhase = (
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
    const { startSampleIndex, phaseDomainData, fftSize, fftOverlap } = drawOptions;
    if (!phaseDomainData || !phaseDomainData.length || !phaseDomainData[0].length) return;

    const sampleRate = drawOptions.sampleRate || 48000;
    const frequencyBinCount = fftSize / 2;
    const maxFrequency = sampleRate / 2;
    const phaseBufferLength = phaseDomainData[0].length;
    const frameStartBinIndex = phaseBufferLength - frequencyBinCount;
    let startPhaseDataIndex = startSampleIndex * fftOverlap / 2;
    startPhaseDataIndex -= startPhaseDataIndex % frequencyBinCount;

    let startFrequency: number;
    let endFrequency: number;
    let startLog = 0;
    let viewLogRange = 0;
    if (freqScaleMode === FrequencyScaleMode.Logarithmic) {
        const window = getLogFrequencyWindow(sampleRate / fftSize, maxFrequency, horizontalZoom, horizontalZoomOffset);
        ({ startFrequency, endFrequency, startLog, viewLogRange } = window);
    } else {
        startFrequency = maxFrequency * horizontalZoomOffset;
        endFrequency = maxFrequency * (horizontalZoomOffset + 1 / horizontalZoom);
    }

    dependencies.drawGrid(ctx, canvasWidth, canvasHeight, startFrequency, endFrequency, 0, 1, drawOptions, StaticScopeMode.Phase, freqScaleMode);

    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    const drawableWidth = Math.max(1, Math.floor(canvasWidth - leftMargin));
    const heightPerChannel = (canvasHeight - bottomMargin) / phaseDomainData.length;
    const frequencyAtPosition = (position: number) => freqScaleMode === FrequencyScaleMode.Logarithmic
        ? 10 ** (startLog + position * viewLogRange)
        : startFrequency + position * (endFrequency - startFrequency);

    for (let channelIndex = 0; channelIndex < phaseDomainData.length; channelIndex++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = phaseDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;
        let previousPhase: number;
        for (let pixel = 0; pixel <= drawableWidth; pixel++) {
            const frequency = frequencyAtPosition(pixel / drawableWidth);
            const localBinIndex = Math.min(frequencyBinCount - 1, Math.max(0, Math.round(frequencyToBinIndex(frequency, maxFrequency, frequencyBinCount))));
            const phaseIndex = wrap(frameStartBinIndex + localBinIndex, startPhaseDataIndex, phaseBufferLength);
            const phase = phaseDomainData[channelIndex][phaseIndex];
            const x = leftMargin + pixel;
            const y = heightPerChannel * (channelIndex + (Math.PI - phase) / (2 * Math.PI));
            if (pixel === 0 || (typeof previousPhase === "number" && Math.abs(phase - previousPhase) > Math.PI)) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            previousPhase = phase;
        }
        ctx.stroke();
    }

    if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
        const position = (cursor.x - leftMargin) / drawableWidth;
        const cursorFrequency = frequencyAtPosition(position);
        const localBinIndex = Math.min(frequencyBinCount - 1, Math.max(0, Math.round(frequencyToBinIndex(cursorFrequency, maxFrequency, frequencyBinCount))));
        const phaseIndex = wrap(frameStartBinIndex + localBinIndex, startPhaseDataIndex, phaseBufferLength);
        const statsToDraw: StatsToDraw = {
            x: cursor.x,
            xLabel: cursorFrequency.toFixed(0),
            values: phaseDomainData.map(channel => channel[phaseIndex])
        };
        dependencies.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
    }
};
