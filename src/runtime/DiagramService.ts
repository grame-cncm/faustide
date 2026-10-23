import type { TFileSystem } from "../model/ProjectModel";

/**
 * Narrow facade over FaustSvgDiagrams. The concrete class is created at runtime
 * after the Faust WASM module loads, so the service depends only on this shape.
 */
type FaustSvgDiagramsLike = {
    from: (name: string, code: string, args: string) => { [filename: string]: string };
};

/**
 * Result object used by callers to update UI and Monaco decorations without
 * letting the service touch DOM or editor APIs directly.
 */
export type DiagramResult = {
    success: boolean;
    svg?: string;
    error?: Error;
    errorLine?: number;
};

/**
 * Name of a generated diagram set: `main` for `process`, `effect` for the
 * polyphonic effect. Faust writes each set under `<name>-svg/`.
 */
export type DiagramName = "main" | "effect";

/**
 * Generates Faust SVG diagrams and reads linked generated SVG files.
 *
 * The service is intentionally UI-free: it returns SVG strings and parsed error
 * line numbers, while `index.ts` remains responsible for jQuery DOM updates and
 * Monaco line decorations.
 */
export class DiagramService {
    diagrams: FaustSvgDiagramsLike;
    fs: TFileSystem;

    constructor(diagrams: FaustSvgDiagramsLike, fs: TFileSystem) {
        this.diagrams = diagrams;
        this.fs = fs;
    }

    /**
     * Mirrors the compile path's precision flag handling for diagram creation.
     */
    static argsWithPrecision(argsIn: string[], useDouble: boolean) {
        const args = argsIn.slice();
        if (useDouble) args.push("-double");
        return args;
    }

    /**
     * Extracts Faust's source line number from generated error messages.
     */
    static parseErrorLine(error: Error) {
        const matchLine = error.message.match(/FaustDSP : (\d+)/);
        if (!matchLine) return null;
        return Number(matchLine[1]);
    }

    /**
     * Generates the main process SVG and returns a structured error on failure.
     */
    generateProcessSvg(code: string, argsIn: string[], useDouble: boolean): DiagramResult {
        const args = DiagramService.argsWithPrecision(argsIn, useDouble);
        try {
            return {
                success: true,
                svg: this.diagrams.from("main", code, args.join(" "))["process.svg"]
            };
        } catch (error) {
            const e = error as Error;
            return {
                success: false,
                error: e,
                errorLine: DiagramService.parseErrorLine(e)
            };
        }
    }

    /**
     * Tells whether the source visibly defines a top-level `effect`, the
     * polyphonic effect convention. Used to skip a failing effect compile for
     * the common no-effect case.
     */
    static definesEffect(code: string) {
        return /^\s*effect\s*=/m.test(code);
    }

    /**
     * Generates the polyphonic `effect` SVG, wrapping the source in an
     * environment the same way faustwasm compiles the effect. The wrapper keeps
     * the user code on line 1 so error line numbers stay valid.
     *
     * @returns the diagram result, or `null` when the code defines no effect
     */
    generateEffectSvg(code: string, argsIn: string[], useDouble: boolean): DiagramResult | null {
        if (!DiagramService.definesEffect(code)) return null;
        const args = DiagramService.argsWithPrecision(argsIn, useDouble);
        const effectCode = `dsp_code = environment{${code}\n};\nprocess = dsp_code.effect;`;
        try {
            return {
                success: true,
                svg: this.diagrams.from("effect", effectCode, args.join(" "))["process.svg"]
            };
        } catch (error) {
            const e = error as Error;
            if (e.message.includes("undefined symbol : effect")) return null;
            return {
                success: false,
                error: e,
                errorLine: DiagramService.parseErrorLine(e)
            };
        }
    }

    /**
     * Reads linked SVG files produced by Faust under `<diagramName>-svg/`.
     *
     * @param fileName linked file name found in a generated SVG
     * @param diagramName diagram set the link belongs to
     */
    readGeneratedSvg(fileName: string, diagramName: DiagramName = "main") {
        return this.fs.readFile(`${diagramName}-svg/` + fileName, { encoding: "utf8" }) as string;
    }
}
