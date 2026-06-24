import { describe, expect, it, vi } from "vitest";

// monaco-editor is aliased to a stub via vitest.config (test.alias); faustwasm
// is a wasm-glue module we don't need here, so stub it too.
vi.mock("@grame/faustwasm", () => ({ LibFaust: class {} }));

// eslint-disable-next-line import/first
import { matchDocKey } from "../monaco-faust/FaustLang";

type Word = { word: string; startColumn: number; endColumn: number };

const makeModel = (line: string, words: Word[]) => ({
    getLineContent: () => line,
    getWordAtPosition: (position: { column: number }) =>
        words.find(w => position.column >= w.startColumn && position.column < w.endColumn) ?? null
}) as any;

describe("matchDocKey", () => {
    it("returns null when there is no word at the position", () => {
        const model = makeModel("  ", []);
        expect(matchDocKey({}, model, { lineNumber: 1, column: 1 } as any)).toBeNull();
    });

    it("matches a bare name", () => {
        const doc = { bus: { path: [], name: "bus", doc: "a bus" } };
        const model = makeModel("bus", [{ word: "bus", startColumn: 1, endColumn: 4 }]);
        const matched = matchDocKey(doc, model, { lineNumber: 1, column: 2 } as any);
        expect(matched?.name).toBe("bus");
        expect(matched?.nameArray).toEqual(["bus"]);
        expect(matched?.doc).toBe(doc.bus);
    });

    it("walks back over a dotted prefix to match a namespaced key", () => {
        const doc = { "os.osc": { path: ["os"], name: "osc", doc: "oscillator" } };
        const model = makeModel("os.osc", [
            { word: "os", startColumn: 1, endColumn: 3 },
            { word: "osc", startColumn: 4, endColumn: 7 }
        ]);
        const matched = matchDocKey(doc, model, { lineNumber: 1, column: 5 } as any);
        expect(matched?.name).toBe("os.osc");
        expect(matched?.nameArray).toEqual(["os", "osc"]);
    });

    it("falls back to the bare name when the namespaced key is unknown", () => {
        const doc = { osc: { path: [], name: "osc", doc: "oscillator" } };
        const model = makeModel("os.osc", [
            { word: "os", startColumn: 1, endColumn: 3 },
            { word: "osc", startColumn: 4, endColumn: 7 }
        ]);
        const matched = matchDocKey(doc, model, { lineNumber: 1, column: 5 } as any);
        expect(matched?.name).toBe("osc");
        expect(matched?.nameArray).toEqual(["osc"]);
    });
});
