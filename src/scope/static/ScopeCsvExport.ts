/**
 * CSV serialization of the static scope's current buffer.
 *
 * Extracted from StaticScope's `btnDownload` click handler (which was inline and
 * untested). Pure — produces the CSV text; the caller handles the download. The
 * per-mode layouts and circular-buffer index wrapping match the original
 * behavior exactly.
 */

import { wrap } from "../../utils";
import { StaticScopeMode as EScopeMode } from "../ScopeModes";
import type { TDrawOptions } from "./StaticScopeTypes";

/**
 * Builds the CSV text for the given scope mode and buffer.
 * Returns "" when there is nothing to export (no data, or an unknown mode).
 */
export function buildScopeCsv(mode: EScopeMode, drawOptions: TDrawOptions): string {
    if (mode === EScopeMode.Data || mode === EScopeMode.Interleaved || mode === EScopeMode.Oscilloscope) {
        return buildTimeDomainCsv(drawOptions);
    }
    if (mode === EScopeMode.Spectroscope || mode === EScopeMode.Phase) {
        return buildFrequencyDomainCsv(
            drawOptions,
            mode === EScopeMode.Phase
                ? drawOptions.phaseDomainData
                : drawOptions.freqDomainData
        );
    }
    if (mode === EScopeMode.Spectrogram) return buildSpectrogramCsv(drawOptions);
    return "";
}

/** One column per channel, one row per sample (Data / Interleaved / Oscilloscope). */
function buildTimeDomainCsv(drawOptions: TDrawOptions): string {
    const { timeDomainData, startSampleIndex } = drawOptions;
    if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return "";
    const bufferLength = timeDomainData[0].length;
    let data = new Array(timeDomainData.length).fill(null).map((v, i) => `channel${i + 1}`).join(",") + "\n";
    for (let j = 0; j < bufferLength; j++) {
        for (let i = 0; i < timeDomainData.length; i++) {
            const wrappedSampleIndex = wrap(j, startSampleIndex, bufferLength);
            const sampleValue = timeDomainData[i][wrappedSampleIndex];
            data += sampleValue + (i === timeDomainData.length - 1 ? "\n" : ",");
        }
    }
    return data;
}

/** One column per channel, one row per bin of the selected FFT-domain frame. */
function buildFrequencyDomainCsv(
    drawOptions: TDrawOptions,
    domainData?: Float32Array[]
): string {
    const { startSampleIndex, fftSize, fftOverlap } = drawOptions;
    if (!domainData || !domainData.length || !domainData[0].length) return "";
    const frequencyBinCount = fftSize / 2;
    let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
    startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
    const freqBufferLength = domainData[0].length;
    let data = new Array(domainData.length).fill(null).map((v, i) => `channel${i + 1}`).join(",") + "\n";
    for (let j = freqBufferLength - frequencyBinCount; j < freqBufferLength; j++) {
        for (let i = 0; i < domainData.length; i++) {
            const wrappedBinIndex = wrap(j, startFreqDataIndex, freqBufferLength);
            const value = domainData[i][wrappedBinIndex];
            data += value + (i === domainData.length - 1 ? "\n" : ",");
        }
    }
    return data;
}

/** One row per frequency bin, columns grouped by FFT frame then channel. */
function buildSpectrogramCsv(drawOptions: TDrawOptions): string {
    const { startSampleIndex, freqDomainData, fftSize, fftOverlap } = drawOptions;
    if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return "";
    const frequencyBinCount = fftSize / 2;
    let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
    startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
    const freqBufferLength = freqDomainData[0].length;
    const frameCount = freqBufferLength / frequencyBinCount;
    let data = new Array(frameCount).fill(null).map((v, i) => new Array(freqDomainData.length).fill(null).map((v, j) => `frame${i + 1}_channel${j + 1}`).join(",")).join(",") + "\n";
    for (let binIndex = 0; binIndex < frequencyBinCount; binIndex++) {
        for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                const dataIndex = wrap(frameIndex * frequencyBinCount + binIndex, startFreqDataIndex, freqBufferLength);
                const magnitude = freqDomainData[channelIndex][dataIndex];
                data += magnitude + (channelIndex === freqDomainData.length - 1 && frameIndex === frameCount - 1 ? "\n" : ",");
            }
        }
    }
    return data;
}
