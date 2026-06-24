import type { TDrawOptions } from "../../StaticScope";
import { wrap } from "../../utils";

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

    for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
        const channelData = timeDomainData[channelIndex];
        const divChannel = document.createElement("div");
        divChannel.classList.add("static-scope-channel");
        divChannel.style.backgroundColor = timeDomainData.length === 1 ? "#181818" : `hsl(${channelIndex * 60}, 100%, 10%)`;

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
