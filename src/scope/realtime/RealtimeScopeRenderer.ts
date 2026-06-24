import { drawCanvasBackground } from "../CanvasDrawing";

/**
 * Draws the real-time analyser canvas background.
 */
export const drawRealtimeBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    drawCanvasBackground(ctx, width, height, "#000000");
};

/**
 * Draws the simple quarter-division grid shared by real-time scope modes.
 */
export const drawRealtimeGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#404040";
    for (let ratio = 0.25; ratio < 1; ratio += 0.25) {
        ctx.moveTo(width * ratio, 0);
        ctx.lineTo(width * ratio, height);
        ctx.moveTo(0, height * ratio);
        ctx.lineTo(width, height * ratio);
    }
    ctx.stroke();
    ctx.restore();
};

/**
 * Draws the real-time oscilloscope waveform.
 *
 * The waveform is stabilized by searching a zero crossing near the estimated
 * period, matching the historical `Scope` implementation. Invalid frequency
 * estimates fall back to drawing the complete available buffer.
 */
export const drawRealtimeOscilloscope = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: Float32Array,
    frequency: number,
    sampleRate: number,
    zoom: number,
    zoomOffset: number
) => {
    drawRealtimeBackground(ctx, width, height);
    drawRealtimeGrid(ctx, width, height);
    const dataLength = data.length;
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();

    let min = data[0];
    let max = data[0];
    let index = data.length;
    while (index--) {
        const sample = data[index];
        if (sample < min) min = sample;
        else if (sample > max) max = sample;
    }

    let zeroCrossingIndex = 0;
    const threshold = (min + max) * 0.5 + 0.001;
    const period = sampleRate / frequency;
    const periodsToDisplay = Math.floor(dataLength / period) - 1;
    while (data[zeroCrossingIndex++] > threshold && zeroCrossingIndex < dataLength);
    if (zeroCrossingIndex >= dataLength - 1) {
        zeroCrossingIndex = 0;
    } else {
        while (data[zeroCrossingIndex++] < threshold && zeroCrossingIndex < dataLength);
        if (zeroCrossingIndex >= dataLength - 1) zeroCrossingIndex = 0;
    }

    const drawableLength = periodsToDisplay > 0 && isFinite(period)
        ? Math.min(period * periodsToDisplay, dataLength - zeroCrossingIndex)
        : dataLength - zeroCrossingIndex;
    const startIndex = Math.round(zeroCrossingIndex + drawableLength * zoomOffset);
    const endIndex = Math.round(zeroCrossingIndex + drawableLength / zoom + drawableLength * zoomOffset);
    for (let sampleIndex = startIndex; sampleIndex < endIndex; sampleIndex++) {
        const x = width * (sampleIndex - startIndex) / (endIndex - startIndex - 1);
        const y = height - (data[sampleIndex] * 0.5 + 0.5) * height;
        if (sampleIndex === startIndex) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
};

/**
 * Draws the real-time spectroscope filled frequency curve for the zoom window.
 */
export const drawRealtimeSpectroscope = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: Float32Array,
    zoom: number,
    zoomOffset: number
) => {
    drawRealtimeBackground(ctx, width, height);
    drawRealtimeGrid(ctx, width, height);
    const dataLength = data.length;
    const startIndex = Math.round(dataLength * zoomOffset);
    const endIndex = Math.round(dataLength / zoom + dataLength * zoomOffset);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    for (let index = startIndex; index < endIndex; index++) {
        const x = width * (index - startIndex) / (endIndex - startIndex);
        const y = ((data[index] + 10) / 100 + 1) * height;
        if (index === startIndex) ctx.moveTo(x, height - y);
        else ctx.lineTo(x, height - y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
};

/**
 * Writes one frequency-data column into the rolling spectrogram cache.
 */
export const drawRealtimeOfflineSpectrogram = (
    ctx: CanvasRenderingContext2D,
    data: Float32Array,
    columnIndex: number
) => {
    const dataLength = data.length;
    const height = ctx.canvas.height;
    const step = Math.max(1, Math.round(dataLength / height));
    let maxInStep: number;
    ctx.fillStyle = "black";
    ctx.fillRect(columnIndex, 0, 1, height);
    const pixelsPerBin = height / dataLength;
    for (let index = 0; index < dataLength; index++) {
        const sample = data[index];
        const stepIndex = index % step;
        if (stepIndex === 0) maxInStep = sample;
        if (stepIndex !== step - 1) {
            if (stepIndex !== 0 && sample > maxInStep) maxInStep = sample;
            continue;
        }
        const normalized = Math.min(1, Math.max(0, (maxInStep + 10) / 100 + 1));
        if (normalized === 0) continue;
        const hue = (normalized * 180 + 240) % 360;
        const luminosity = normalized * 50;
        ctx.fillStyle = `hsl(${hue}, 100%, ${luminosity}%)`;
        ctx.fillRect(columnIndex, (1 - index / dataLength) * height, 1, Math.max(1, pixelsPerBin));
    }
};

/**
 * Draws the rolling spectrogram cache onto the visible analyser canvas.
 */
export const drawRealtimeSpectrogram = (
    ctx: CanvasRenderingContext2D,
    tempCtx: CanvasRenderingContext2D,
    columnIndex: number,
    width: number,
    height: number,
    data: Float32Array,
    zoom: number
) => {
    drawRealtimeBackground(ctx, width, height);
    drawRealtimeGrid(ctx, width, height);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    if (columnIndex + 1 < tempCtx.canvas.width) {
        const destinationSplit = Math.round(columnIndex / tempCtx.canvas.width * width * zoom);
        if (destinationSplit < width) {
            ctx.drawImage(tempCtx.canvas, columnIndex + 1, 0, tempCtx.canvas.width - columnIndex - 1, tempCtx.canvas.height, width - width * zoom, 0, width * zoom - destinationSplit, height);
        }
        if (destinationSplit) {
            ctx.drawImage(tempCtx.canvas, 0, 0, columnIndex + 1, tempCtx.canvas.height, width - destinationSplit, 0, destinationSplit, height);
        }
    } else {
        ctx.drawImage(tempCtx.canvas, 0, 0, tempCtx.canvas.width, tempCtx.canvas.height, width - width * zoom, 0, width * zoom, height);
    }
    ctx.restore();
};

/**
 * Draws sample/frequency/RMS labels plus optional zoom range indicators.
 */
export const drawRealtimeStats = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    frequency: number,
    sample: number,
    rms: number,
    zoom?: number,
    zoomMin?: number,
    zoomMax?: number
) => {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(width - 50, 0, 50, 50);
    if (typeof zoomMin === "number") ctx.fillRect(0, height - 16, 40, 16);
    if (typeof zoomMax === "number") ctx.fillRect(width - 40, height - 16, 40, 16);
    if (typeof zoom === "number") ctx.fillRect(width / 2 - 20, height - 16, 40, 16);
    ctx.fillStyle = "#DDDD99";
    ctx.font = "bold 12px Consolas, monospace";
    if (typeof zoom === "number") {
        ctx.textAlign = "center";
        ctx.fillText(zoom.toFixed(1) + "x", width / 2, height - 2, 40);
    }
    if (typeof zoomMin === "number") {
        ctx.textAlign = "left";
        ctx.fillText(zoomMin.toFixed(0), 2, height - 2, 40);
    }
    ctx.textAlign = "right";
    if (typeof zoomMax === "number") ctx.fillText(zoomMax.toFixed(0), width - 2, height - 2, 40);
    ctx.fillText((sample >= 0 ? "@+" : "@") + sample.toFixed(3), width - 2, 15, 50);
    ctx.fillText(frequency.toFixed(0) + "Hz", width - 2, 30, 50);
    ctx.fillText("x\u0304:" + rms.toFixed(3), width - 2, 45, 50);
    ctx.restore();
};
