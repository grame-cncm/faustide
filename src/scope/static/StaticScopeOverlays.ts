import type { TDrawOptions } from "./StaticScopeTypes";
import {
    FrequencyScaleMode as EFreqScaleMode,
    MagnitudeScaleMode,
    StaticScopeMode as EScopeMode
} from "../ScopeModes";
import {
    formatFrequency,
    getLinearAxisTicks,
    getLogarithmicAxisTicks
} from "../FrequencyScale";
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

/** Formats a time-axis value with enough decimal places for the active tick step. */
const formatTimeSeconds = (seconds: number, tickStep: number) => {
    const decimalPlaces = Math.min(
        9,
        Math.max(0, Math.ceil(-Math.log10(Math.abs(tickStep))) + 1)
    );
    const rounded = Number(seconds.toFixed(decimalPlaces));
    return `${Object.is(rounded, -0) ? 0 : rounded} s`;
};

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
    freqScaleMode?: EFreqScaleMode,
    magnitudeScaleMode = MagnitudeScaleMode.Decibels
): [number, { type: string; data: any }[]][] => {
    ctx.save();
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    const { events, bufferSize, fftSize, fftOverlap, sampleRate } = drawOptions;
    const isFrequencyDomain = mode === EScopeMode.Spectrogram || mode === EScopeMode.Spectroscope || mode === EScopeMode.Phase;
    const isFrequencyPlot = mode === EScopeMode.Spectroscope || mode === EScopeMode.Phase;
    const frequencyBinCount = fftSize / 2;
    const frequencyChannels = mode === EScopeMode.Phase ? drawOptions.phaseDomainData : drawOptions.freqDomainData;
    const channelCount = mode === EScopeMode.Oscilloscope ? 1 : isFrequencyDomain ? frequencyChannels.length : drawOptions.timeDomainData.length;
    const unit = mode === EScopeMode.Spectrogram
        ? "Hz/frame"
        : mode === EScopeMode.Phase
            ? "rad/Hz"
            : mode === EScopeMode.Spectroscope
                ? magnitudeScaleMode === MagnitudeScaleMode.Decibels ? "dB/Hz" : "amp/Hz"
                : "lvl/s";
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
    if (isFrequencyPlot) {
        const rangeStart = drawStartValue;
        const rangeEnd = drawEndValue;
        const logarithmic = freqScaleMode === EFreqScaleMode.Logarithmic;
        const ticks = logarithmic
            ? getLogarithmicAxisTicks(rangeStart, rangeEnd)
            : getLinearAxisTicks(rangeStart, rangeEnd);
        const logStart = logarithmic ? log(rangeStart) : 0;
        const logRange = logarithmic ? log(rangeEnd) - logStart : 0;
        for (const tick of ticks) {
            const position = logarithmic
                ? (log(tick.value) - logStart) / logRange
                : (tick.value - rangeStart) / (rangeEnd - rangeStart);
            const x = leftMargin + (canvasWidth - leftMargin) * position;
            ctx.strokeStyle = tick.major ? bufferStrokeStyle : normalStrokeStyle;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight - bottomMargin);
            ctx.stroke();
            ctx.fillText(formatFrequency(tick.value), Math.min(x, canvasWidth - 20), canvasHeight - 10);
        }
    } else { // Linear X-Axis (seconds for waveforms and frames for spectrogram)
        const rangeStart = drawStartValue;
        const rangeEnd = drawEndValue;
        const samplesPerPixel = isFrequencyDomain ? fftOverlap / 2 : 1;
        let startBuffer = rangeStart / bufferSize / samplesPerPixel;
        let endBuffer = rangeEnd / bufferSize / samplesPerPixel;
        const horizontalGridStep = 2 ** Math.ceil(Math.log2(endBuffer - startBuffer)) / 8;
        startBuffer -= startBuffer % horizontalGridStep;
        endBuffer -= endBuffer % horizontalGridStep;
        let currentBufferIndex = (drawOptions.startBufferIndex || 0) + Math.round(stabilizationOffset / bufferSize / samplesPerPixel);
        if (isFrequencyDomain) currentBufferIndex -= currentBufferIndex % (frequencyBinCount / bufferSize / fftOverlap / 2);

        if (!isFrequencyDomain && sampleRate && sampleRate > 0) {
            const lastVisibleSample = Math.max(rangeStart, rangeEnd - 1);
            const timeStart = rangeStart / sampleRate;
            const timeEnd = lastVisibleSample / sampleRate;
            const ticks = getLinearAxisTicks(timeStart, timeEnd);
            const tickStep = ticks.length > 1 ? ticks[1].value - ticks[0].value : timeEnd - timeStart;
            const sampleRange = Math.max(1, lastVisibleSample - rangeStart);
            for (const tick of ticks) {
                const x = leftMargin + (tick.value * sampleRate - rangeStart) / sampleRange * (canvasWidth - leftMargin);
                ctx.strokeStyle = normalStrokeStyle;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvasHeight - bottomMargin);
                ctx.stroke();
                ctx.fillText(formatTimeSeconds(tick.value, tickStep || 1), Math.min(x, canvasWidth - 20), canvasHeight - 10);
            }
        } else {
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
                } else {
                    ctx.fillText((gridLineIndex * bufferSize).toFixed(), Math.min(x, canvasWidth - 20), canvasHeight - 10);
                }
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

    if (mode === EScopeMode.Phase) {
        const ticks = [
            { value: -Math.PI, label: "-π" },
            { value: -Math.PI / 2, label: "-π/2" },
            { value: 0, label: "0" },
            { value: Math.PI / 2, label: "π/2" },
            { value: Math.PI, label: "π" }
        ];
        ctx.strokeStyle = normalStrokeStyle;
        ctx.beginPath();
        for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
            for (const tick of ticks) {
                const position = (tick.value + Math.PI) / (2 * Math.PI);
                const y = channelIndex * heightPerChannel + (1 - position) * heightPerChannel;
                ctx.moveTo(leftMargin, y);
                ctx.lineTo(canvasWidth, y);
                ctx.fillText(tick.label, 45, Math.max(y, 10));
            }
        }
        ctx.stroke();
    } else if (mode === EScopeMode.Spectroscope) {
        const tickValues = magnitudeScaleMode === MagnitudeScaleMode.Decibels
            ? [-100, -75, -50, -25, 0]
            : [0, 0.25, 0.5, 0.75, 1];
        ctx.strokeStyle = normalStrokeStyle;
        ctx.beginPath();
        for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
            for (const value of tickValues) {
                const position = magnitudeScaleMode === MagnitudeScaleMode.Decibels ? value / 100 + 1 : value;
                const y = channelIndex * heightPerChannel + (1 - position) * heightPerChannel;
                ctx.moveTo(leftMargin, y);
                ctx.lineTo(canvasWidth, y);
                ctx.fillText(`${value}`, 45, Math.max(y, 10));
            }
        }
        ctx.stroke();
    } else if (mode === EScopeMode.Spectrogram && freqScaleMode === EFreqScaleMode.Logarithmic) {
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
    } else if (mode === EScopeMode.Spectrogram) {
        ctx.strokeStyle = normalStrokeStyle;
        ctx.beginPath();
        const ticks = getLinearAxisTicks(0, sampleRate / 2, 5);
        for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
            for (const tick of ticks) {
                const y = channelIndex * heightPerChannel + (1 - tick.value / (sampleRate / 2)) * heightPerChannel;
                ctx.moveTo(leftMargin, y);
                ctx.lineTo(canvasWidth, y);
                ctx.fillText(formatFrequency(tick.value), 45, Math.max(y, 10));
            }
        }
        ctx.stroke();
    } else { // Time-domain Y axis
        ctx.strokeStyle = normalStrokeStyle;
        ctx.beginPath();
        const ticks = getLinearAxisTicks(-verticalScaleFactor, verticalScaleFactor, 7);
        for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
            for (const tick of ticks) {
                const position = (tick.value + verticalScaleFactor) / (2 * verticalScaleFactor);
                const y = channelIndex * heightPerChannel + (1 - position) * heightPerChannel;
                ctx.moveTo(leftMargin, y);
                ctx.lineTo(canvasWidth, y);
                ctx.fillText(`${Number(tick.value.toPrecision(3))}`, 45, Math.max(y, 10));
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
