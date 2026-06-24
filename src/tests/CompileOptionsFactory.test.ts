import { describe, expect, it } from "vitest";
import { createCompileOptions } from "../runtime/CompileOptionsFactory";

describe("createCompileOptions", () => {
    it("builds default compile options with detected audio worklet support", () => {
        const compileOptions = createCompileOptions({
            projectDir: "/usr/share/project/",
            supportAudioWorklet: true
        });

        expect(compileOptions.useWorklet).toBe(true);
        expect(compileOptions.useDouble).toBe(false);
        expect(compileOptions.bufferSize).toBe(1024);
        expect(compileOptions.exportPlatform).toBe("source");
        expect(compileOptions.exportArch).toBe("cplusplus");
        expect(compileOptions.args).toEqual(["-f", "10", "-I", "/usr/share/project/"]);
    });

    it("lets saved options override defaults while keeping startup-only values fresh", () => {
        const compileOptions = createCompileOptions({
            projectDir: "/tmp/project/",
            supportAudioWorklet: false,
            savedOptions: {
                useWorklet: true,
                voices: 8,
                realtimeCompile: true,
                args: ["-bad"],
                mainFile: "main.dsp"
            } as any
        });

        expect(compileOptions.useWorklet).toBe(true);
        expect(compileOptions.voices).toBe(8);
        expect(compileOptions.mainFile).toBe("main.dsp");
        expect(compileOptions.realtimeCompile).toBe(false);
        expect(compileOptions.args).toEqual(["-f", "10", "-I", "/tmp/project/"]);
    });
});
