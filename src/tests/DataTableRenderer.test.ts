import { describe, expect, it } from "vitest";
import type { TDrawOptions } from "../StaticScope";
import { fillStaticScopeDataTable } from "../scope/static/DataTableRenderer";

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 1,
    startBufferIndex: 0,
    timeDomainData: [new Float32Array([0, 0.25, -0.25, 0.5])],
    events: [[{ type: "bang", data: 1 }]],
    bufferSize: 2,
    fftSize: 8,
    fftOverlap: 2,
    sampleRate: 48000,
    ...overrides
});

describe("DataTableRenderer", () => {
    it("renders wrapped samples and event highlights", () => {
        const container = document.createElement("div");

        fillStaticScopeDataTable(container, createDrawOptions());

        const cells = Array.from(container.querySelectorAll(".static-scope-cell"));
        expect(container.querySelectorAll(".static-scope-channel")).toHaveLength(1);
        expect(cells).toHaveLength(4);
        expect(cells[0]).toHaveClass("highlight");
        expect(cells[0].querySelectorAll("span")[1].innerText).toBe("0.2500000");
        expect(cells[3].querySelectorAll("span")[1].innerText).toBe("0.0000000");
    });

    it("clears stale content and caps long channels with an ellipsis row", () => {
        const container = document.createElement("div");
        container.innerHTML = "<div>stale</div>";

        fillStaticScopeDataTable(container, createDrawOptions({
            timeDomainData: [new Float32Array(2050).fill(0.5)]
        }));

        const cells = Array.from(container.querySelectorAll(".static-scope-cell"));
        expect(container).not.toHaveTextContent("stale");
        expect(cells).toHaveLength(2049);
        expect(Array.from(cells.at(-1).querySelectorAll("span")).map(span => span.innerText)).toEqual(["...", "..."]);
    });
});
