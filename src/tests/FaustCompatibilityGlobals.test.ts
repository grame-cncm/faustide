import { describe, expect, it } from "vitest";
import {
    exposeFaustCompilerGlobal,
    exposeFaustEnvironmentGlobal
} from "../runtime/FaustCompatibilityGlobals";

describe("Faust compatibility globals", () => {
    it("exposes the Faust compiler on the provided window", () => {
        const browserWindow = {};
        const faustCompiler = {};

        exposeFaustCompilerGlobal(faustCompiler as any, browserWindow as any);

        expect(browserWindow).toEqual({ faustCompiler });
    });

    it("exposes the Faust editor environment on the provided window", () => {
        const browserWindow = {};
        const faustEnv = { compileOptions: { voices: 0 } };

        exposeFaustEnvironmentGlobal(faustEnv as any, browserWindow as any);

        expect(browserWindow).toEqual({ faustEnv });
    });
});
