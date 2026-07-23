/**
 * Static-scope "Data" mode renderer: fills a DOM table with the raw sample
 * values (and event markers) for the current buffer. Extracted from StaticScope.
 */
import type { TDrawOptions, TWaveformSelection } from "./StaticScopeTypes";
import { wrap } from "../../utils";

const DATA_CELL_HEIGHT = 20;

/**
 * Serializes the selected chronological waveform range as a row-oriented CSV table.
 *
 * Sample indices refer to the displayed buffer order; values are resolved through
 * the circular-buffer start index so copied data matches the waveform on screen.
 */
export const getSelectedWaveformCsv = (
    drawOptions: TDrawOptions,
    selection: TWaveformSelection
) => {
    const { timeDomainData, startSampleIndex, sampleRate } = drawOptions;
    if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return "";
    const bufferLength = timeDomainData[0].length;
    const selectionStart = Math.max(0, Math.min(bufferLength, selection.startSampleIndex));
    const selectionEnd = Math.max(selectionStart, Math.min(bufferLength, selection.endSampleIndex));
    if (selectionStart === selectionEnd) return "";

    const rows = [
        ["sample", "time_seconds", ...timeDomainData.map((_, index) => `channel${index + 1}`)].join(",")
    ];
    for (let sampleIndex = selectionStart; sampleIndex < selectionEnd; sampleIndex++) {
        const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
        const timeSeconds = sampleRate && sampleRate > 0 ? sampleIndex / sampleRate : "";
        rows.push([
            sampleIndex,
            timeSeconds,
            ...timeDomainData.map(channel => channel[wrappedSampleIndex])
        ].join(","));
    }
    return `${rows.join("\n")}\n`;
};

/**
 * Renders the static scope raw sample table.
 *
 * The table view is the non-canvas representation used by `StaticScope` in
 * Data mode. It preserves the historical 2048-sample display cap, channel
 * coloring, circular-buffer sample wrapping, and per-buffer event highlighting.
 */
export const fillStaticScopeDataTable = (container: HTMLDivElement, drawOptions: TDrawOptions) => {
    container.innerHTML = "";
    if (!drawOptions) return;
    const { startSampleIndex, timeDomainData, events, startBufferIndex, bufferSize } = drawOptions;
    if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;
    const bufferLength = timeDomainData[0].length;
    const rowsPerColumn = Math.max(
        1,
        Math.floor(container.clientHeight / timeDomainData.length / DATA_CELL_HEIGHT)
    );

    for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
        const channelData = timeDomainData[channelIndex];
        const divChannel = document.createElement("div");
        divChannel.classList.add("static-scope-channel");
        divChannel.style.backgroundColor = timeDomainData.length === 1 ? "#181818" : `hsl(${channelIndex * 60}, 100%, 10%)`;
        divChannel.style.gridTemplateRows = `repeat(${rowsPerColumn}, ${DATA_CELL_HEIGHT}px)`;
        divChannel.style.gridAutoFlow = "column";

        for (let sampleIndex = 0; sampleIndex < Math.min(channelData.length, 2048); sampleIndex++) {
            const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
            const divCell = document.createElement("div");
            divCell.classList.add("static-scope-cell");

            const bufferIndex = (startBufferIndex || 0) + Math.floor(sampleIndex / bufferSize);
            if (events && events[bufferIndex] && events[bufferIndex].length && sampleIndex % bufferSize === 0) {
                divCell.classList.add("highlight");
            }

            const spanIndex = document.createElement("span");
            spanIndex.innerText = sampleIndex.toString();
            const spanSample = document.createElement("span");
            spanSample.innerText = channelData[wrappedSampleIndex].toFixed(7);

            divCell.appendChild(spanIndex);
            divCell.appendChild(spanSample);
            divChannel.appendChild(divCell);
        }

        if (channelData.length > 2048) {
            const divCell = document.createElement("div");
            divCell.classList.add("static-scope-cell");
            const spanIndex = document.createElement("span");
            spanIndex.innerText = "...";
            const spanSample = document.createElement("span");
            spanSample.innerText = "...";
            divCell.appendChild(spanIndex);
            divCell.appendChild(spanSample);
            divChannel.appendChild(divCell);
        }
        container.appendChild(divChannel);
    }
};
