import type { TDrawOptions } from "../../StaticScope";
import {
    FrequencyScaleMode as EFreqScaleMode,
    StaticScopeMode as EScopeMode
} from "../ScopeModes";
import { indexToFrequency } from "../FrequencyScale";
import {
    STATIC_SCOPE_BOTTOM_MARGIN,
    STATIC_SCOPE_LEFT_MARGIN
} from "./StaticScopeLayout";

/**
 * Grid, event-marker, and cursor-statistics overlays shared by the static scope
 * mode renderers.
 *
 * These primitives were previously inline static methods on `StaticScope`; they
 * are pure (given a canvas context and draw options) and are consumed by the
 * time-domain, frequency, and spectrogram renderers through `StaticScope`'s
 * thin compatibility wrappers. Extracting them keeps `StaticScope` focused on
 * the widget lifecycle.
 */

const log = Math.log10;
const pow = Math.pow;

/** Cursor statistics payload drawn over the scope. */
type StatsToDraw = {
    x?: number;
    y?: number;
    xLabel?: string;
    yLabel?: string;
    values: number[];
};

/**
 * Draws the grid lines and axis labels, returning the event markers (with their
 * x positions) that the caller should paint over the waveform.
 */
export const drawStaticScopeGrid = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    drawStartValue: number,
    drawEndValue: number,
    stabilizationOffset: number,
    verticalScaleFactor: number,
    drawOptions: TDrawOptions,
    mode: EScopeMode,
    freqScaleMode?: EFreqScaleMode
): [number, { type: string; data: any }[]][] => {
    ctx.save();
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    const { events, bufferSize, fftSize, fftOverlap, sampleRate } = drawOptions;
    const isFrequencyDomain = mode === EScopeMode.Spectrogram || mode === EScopeMode.Spectroscope;
    const frequencyBinCount = fftSize / 2;
    const channelCount = mode === EScopeMode.Oscilloscope ? 1 : isFrequencyDomain ? drawOptions.freqDomainData.length : drawOptions.timeDomainData.length;
    const unit = mode === EScopeMode.Spectrogram ? "Hz/frame" : mode === EScopeMode.Spectroscope ? "dB/Hz" : "lvl/samp";
    const eventsToDraw: [number, { type: string; data: any }[]][] = [];

    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    const eventStrokeStyle = "#ff8800";
    const bufferStrokeStyle = "#004000";
    const normalStrokeStyle = "#404040";
    ctx.fillStyle = "#DDDD99";
    ctx.font = "10px Consolas, monospace";

    // Main axes
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(unit, 45, canvasHeight - 10, 40);
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(leftMargin, 0);
    ctx.lineTo(leftMargin, canvasHeight - bottomMargin);
    ctx.lineTo(canvasWidth, canvasHeight - bottomMargin);
    ctx.stroke();

    // X-Axis Grid
    if (mode === EScopeMode.Spectroscope && freqScaleMode === EFreqScaleMode.Logarithmic) {
        const startFreq = drawStartValue;
        const endFreq = drawEndValue;
        if (startFreq > 0) {
            const logStartFreq = log(startFreq);
            const logEndFreq = log(endFreq);
            const magnitude = Math.floor(logStartFreq);
            for (let powerOf10 = magnitude; powerOf10 < logEndFreq + 1; powerOf10++) {
                for (let multiplier = 1; multiplier < 10; multiplier++) {
                    const freq = multiplier * pow(10, powerOf10);
                    if (freq < startFreq) continue;
                    if (freq > endFreq) break;
                    const x = leftMargin + (canvasWidth - leftMargin) * (log(freq) - logStartFreq) / (logEndFreq - logStartFreq);
                    const isMajor = multiplier === 1;
                    ctx.strokeStyle = (isMajor || multiplier === 5) ? bufferStrokeStyle : normalStrokeStyle;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvasHeight - bottomMargin);
                    ctx.stroke();
                    if (isMajor || multiplier === 5 || (logEndFreq - logStartFreq < 3 && (multiplier === 2 || multiplier === 7))) {
                        ctx.fillText(freq >= 1000 ? `${(freq / 1000).toFixed(1)}k` : freq.toFixed(0), Math.min(x, canvasWidth - 20), canvasHeight - 10);
                    }
                }
            }
        }
    } else { // Linear X-Axis (Time-based for Osc/Spectrogram, Freq-based for linear Spectroscope)
        let rangeStart = drawStartValue;
        let rangeEnd = drawEndValue;
        if (mode === EScopeMode.Spectroscope) { // linear spectroscope uses bin indices
            rangeStart = 0;
            rangeEnd = frequencyBinCount;
        }
        const samplesPerPixel = isFrequencyDomain ? fftOverlap / 2 : 1;
        let startBuffer = rangeStart / bufferSize / samplesPerPixel;
        let endBuffer = rangeEnd / bufferSize / samplesPerPixel;
        const horizontalGridStep = 2 ** Math.ceil(Math.log2(endBuffer - startBuffer)) / 8;
        startBuffer -= startBuffer % horizontalGridStep;
        endBuffer -= endBuffer % horizontalGridStep;
        let currentBufferIndex = (drawOptions.startBufferIndex || 0) + Math.round(stabilizationOffset / bufferSize / samplesPerPixel);
        if (isFrequencyDomain) currentBufferIndex -= currentBufferIndex % (frequencyBinCount / bufferSize / fftOverlap / 2);

        for (let gridLineIndex = startBuffer; gridLineIndex < endBuffer; gridLineIndex += horizontalGridStep) {
            const x = (gridLineIndex * bufferSize * samplesPerPixel - rangeStart) / (rangeEnd - rangeStart - 1) * (canvasWidth - leftMargin) + leftMargin;
            if (x < leftMargin) continue;
            ctx.strokeStyle = gridLineIndex % 1 === 0 ? bufferStrokeStyle : normalStrokeStyle;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight - bottomMargin);
            ctx.stroke();
            if (mode === EScopeMode.Spectrogram) {
                const fftFrameIndex = gridLineIndex / (frequencyBinCount / bufferSize) * fftOverlap / 2;
                if (fftFrameIndex % 1 === 0) ctx.fillText(fftFrameIndex.toFixed(), Math.min(x, canvasWidth - 20), canvasHeight - 10);
            } else if (mode === EScopeMode.Spectroscope) {
                const freq = indexToFrequency(gridLineIndex * bufferSize, frequencyBinCount, sampleRate);
                ctx.fillText(freq.toFixed(0), Math.min(x, canvasWidth - 20), canvasHeight - 10);
            } else {
                ctx.fillText((gridLineIndex * bufferSize).toFixed(), Math.min(x, canvasWidth - 20), canvasHeight - 10);
            }
        }
        if (events && mode !== EScopeMode.Spectroscope) {
            ctx.strokeStyle = eventStrokeStyle;
            for (let j = Math.ceil(startBuffer); j < endBuffer; j++) {
                if (events[currentBufferIndex + j] && events[currentBufferIndex + j].length) {
                    const x = (j * bufferSize * samplesPerPixel - rangeStart) / (rangeEnd - rangeStart - 1) * (canvasWidth - leftMargin) + leftMargin;
                    if (x < leftMargin) continue;
                    eventsToDraw.push([x, events[currentBufferIndex + j]]);
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvasHeight - bottomMargin);
                    ctx.stroke();
                }
            }
        }
    }

    // Y-Axis Grid
    const heightPerChannel = (canvasHeight - bottomMargin) / channelCount;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    if (mode === EScopeMode.Spectrogram && freqScaleMode === EFreqScaleMode.Logarithmic) {
        const minFrequency = sampleRate / fftSize;
        const maxFrequency = sampleRate / 2;
        if (minFrequency > 0) {
            const logMinFreq = log(minFrequency);
            const logMaxFreq = log(maxFrequency);
            for (let i = 0; i < channelCount; i++) {
                const magnitude = Math.floor(logMinFreq);
                for (let powerOf10 = magnitude; powerOf10 < logMaxFreq + 1; powerOf10++) {
                    for (let multiplier = 1; multiplier < 10; multiplier++) {
                        const freq = multiplier * pow(10, powerOf10);
                        if (freq < minFrequency) continue;
                        if (freq > maxFrequency) break;
                        const logPosition = (log(freq) - logMinFreq) / (logMaxFreq - logMinFreq);
                        const y = i * heightPerChannel + (1 - logPosition) * heightPerChannel;
                        if (y < i * heightPerChannel || y > (i + 1) * heightPerChannel) continue;
                        const isMajor = multiplier === 1;
                        const isMedium = multiplier === 5;
                        ctx.strokeStyle = (isMajor || isMedium) ? bufferStrokeStyle : normalStrokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(leftMargin, y);
                        ctx.lineTo(canvasWidth, y);
                        ctx.stroke();
                        if (isMajor || isMedium) {
                            ctx.fillText(freq.toFixed(0), 45, Math.max(y, 10));
                        }
                    }
                }
            }
        }
    } else { // Linear Y-Axis
        ctx.strokeStyle = normalStrokeStyle;
        ctx.beginPath();
        let verticalGridStep = verticalScaleFactor === 1 && isFrequencyDomain ? frequencyBinCount / 4 : 0.25;
        if (!isFrequencyDomain) {
            while (verticalScaleFactor / verticalGridStep > 2) verticalGridStep *= 2;
        }
        const drawHLine = (y: number, yLabel: string) => {
            ctx.moveTo(leftMargin, y);
            ctx.lineTo(canvasWidth, y);
            ctx.fillText(yLabel, 45, Math.max(y, 10));
        };
        for (let i = 0; i < (mode === EScopeMode.Oscilloscope ? 1 : channelCount); i++) {
            let y = (i + 0.5) * heightPerChannel;
            let positionRatio = 0.5;
            const getYLabel = () => {
                if (mode === EScopeMode.Spectrogram) return indexToFrequency(frequencyBinCount * positionRatio, frequencyBinCount, sampleRate).toFixed(0);
                if (mode === EScopeMode.Spectroscope) return (-100 + 100 * positionRatio).toFixed(0);
                return (-verticalScaleFactor + 2 * verticalScaleFactor * positionRatio).toFixed(2);
            };
            let yLabel = getYLabel();
            drawHLine(y, yLabel);
            const verticalRange = isFrequencyDomain ? frequencyBinCount / 2 : verticalScaleFactor;
            for (let j = verticalGridStep; j < verticalRange; j += verticalGridStep) {
                const vFactor = isFrequencyDomain ? frequencyBinCount / 2 : verticalScaleFactor;
                positionRatio = 0.5 - j / vFactor / 2; // (isFrequencyDomain ? 1 : 2);
                y = (i + 0.5 + j / vFactor / 2) * heightPerChannel;
                yLabel = getYLabel();
                drawHLine(y, yLabel);
                // if (isFrequencyDomain) continue;
                positionRatio = 0.5 + j / vFactor / 2;
                y = (i + 0.5 - j / vFactor / 2) * heightPerChannel;
                yLabel = getYLabel();
                drawHLine(y, yLabel);
            }
        }
        ctx.stroke();
    }

    // Draw separators for interleaved channels
    ctx.beginPath();
    ctx.setLineDash([4, 2]);
    ctx.strokeStyle = "white";
    for (let i = 1; i < channelCount; i++) {
        ctx.moveTo(0, i * heightPerChannel);
        ctx.lineTo(canvasWidth, i * heightPerChannel);
    }
    ctx.stroke();
    ctx.restore();
    return eventsToDraw;
};

/** Draws the label box for the events occurring at a grid position. */
export const drawStaticScopeEvent = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    x: number,
    eventData: { type: string; data: any }[]
) => {
    ctx.save();
    ctx.font = "bold 12px Consolas, monospace";
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    const eventStrings = eventData.map(event => (event.data.path ? `${event.data.path}: ${event.data.value}` : `${event.type}: ${event.data.join(",")}`));
    const textWidth = Math.max(...eventStrings.map(s => ctx.measureText(s).width)) + 5;
    if (canvasWidth - x >= textWidth) { // Draw on the right of the line
        ctx.fillRect(x, 0, textWidth, eventData.length * 15 + 2);
        ctx.textAlign = "left";
    } else { // Draw on the left
        ctx.fillRect(x - textWidth, 0, textWidth, eventData.length * 15 + 2);
        ctx.textAlign = "right";
    }
    ctx.fillStyle = "#DDDD99";
    eventStrings.forEach((s, i) => ctx.fillText(s, x, (i + 1) * 15, textWidth));
    ctx.restore();
};

/** Draws the cursor crosshair, axis labels, and the sampled values panel. */
export const drawStaticScopeStats = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    statsToDraw: StatsToDraw
) => {
    const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
    const bottomMargin = STATIC_SCOPE_BOTTOM_MARGIN;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#b0b0b0";
    ctx.beginPath();
    const { x, y, xLabel, yLabel, values } = statsToDraw;
    // Draw cursor lines
    if (x) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight - bottomMargin);
    }
    if (y) {
        ctx.moveTo(leftMargin, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();

    // Draw labels with background
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    if (xLabel) ctx.fillRect(Math.min(x - 20, canvasWidth - 40), canvasHeight - 18, 40, 16);
    if (yLabel) ctx.fillRect(5, Math.max(0, y - 8), 45, 16);

    ctx.fillStyle = "#DDDD99";
    ctx.font = "bold 12px Consolas, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (xLabel) ctx.fillText(xLabel, Math.min(x, canvasWidth - 20), canvasHeight - 10, 40);

    ctx.textAlign = "right";
    if (yLabel) ctx.fillText(yLabel, 40, Math.max(10, y), 40);

    // Draw values panel
    ctx.textBaseline = "bottom";
    const valueStrings: string[] = [];
    values.forEach(v => valueStrings.push(v.toFixed(7)));
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(canvasWidth - 70, 0, 80, valueStrings.length * 15 + 5);
    ctx.fillStyle = "#DDDD99";
    valueStrings.forEach((s, i) => ctx.fillText(s, canvasWidth - 2, (i + 1) * 15, 70));
    ctx.restore();
};
