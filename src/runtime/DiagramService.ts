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
     * Reads linked SVG files produced by Faust under `main-svg/`.
     */
    readGeneratedSvg(fileName: string) {
        return this.fs.readFile("main-svg/" + fileName, { encoding: "utf8" }) as string;
    }
}
