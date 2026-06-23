import type { TFileSystem } from "../model/ProjectModel";

type FaustSvgDiagramsLike = {
    from: (name: string, code: string, args: string) => { [filename: string]: string };
};

export type DiagramResult = {
    success: boolean;
    svg?: string;
    error?: Error;
    errorLine?: number;
};

export class DiagramService {
    diagrams: FaustSvgDiagramsLike;
    fs: TFileSystem;

    constructor(diagrams: FaustSvgDiagramsLike, fs: TFileSystem) {
        this.diagrams = diagrams;
        this.fs = fs;
    }

    static argsWithPrecision(argsIn: string[], useDouble: boolean) {
        const args = argsIn.slice();
        if (useDouble) args.push("-double");
        return args;
    }

    static parseErrorLine(error: Error) {
        const matchLine = error.message.match(/FaustDSP : (\d+)/);
        if (!matchLine) return null;
        return Number(matchLine[1]);
    }

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

    readGeneratedSvg(fileName: string) {
        return this.fs.readFile("main-svg/" + fileName, { encoding: "utf8" }) as string;
    }
}
