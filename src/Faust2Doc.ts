import { Faust2MD } from "./Faust2MD";
/*
Retrive faust2md doc by parsing .dsp file

The format of a title is :
	//############# Title Name #################
	//  markdown text....
	//  markdown text....
	//##########################################

The format of a section is :
	//============== Section Name ==============
	//  markdown text....
	//  markdown text....
	//==========================================

The format of a comment is :
	//-------------- foo(x,y) ------------------
	//  markdown text....
	//  markdown text....
	//------------------------------------------
everything else is considered Faust code.
--------------------------------------------------------
*/
type FaustDoc = { [key: string]: { path: string[], name: string, doc: string } };
/**
 *
 * @class Faust2Doc
 */
export class Faust2Doc {
    private static readonly REGEX_DEF_LIB = /\b(\w+)\s*=\s*library\("(.+)"\);/;
    private static readonly REGEX_DEF_IMP = /\bimport\("(.+)"\);/;
    private static readonly REGEX_FUNC_NAME = /`.*?(\w+)`/;
    /**
     * Retrive a library definition
     *
     * @static
     * @param {string} line
     * @returns {{ namespace: string, fileName: string }[]}
     * @memberof Faust2Doc
     */
    static matchLibrary(line: string): { namespace: string, fileName: string }[] {
        const libs = [] as { namespace: string, fileName: string }[];
        const exps = line.match(new RegExp(this.REGEX_DEF_LIB, "g"));
        if (exps) {
            exps.forEach((exp) => {
                const matched = exp.match(this.REGEX_DEF_LIB);
                if (matched) libs.push({ namespace: matched[1], fileName: matched[2] });
            });
        }
        return libs;
    }
    /**
     * Retrive an import expression
     *
     * @static
     * @param {string} line
     * @returns {string[]}
     * @memberof Faust2Doc
     */
    static matchImport(line: string): string[] {
        const imps = [] as string[];
        const exps = line.match(new RegExp(this.REGEX_DEF_IMP, "g"));
        if (exps) {
            exps.forEach((exp) => {
                const matched = exp.match(this.REGEX_DEF_IMP);
                if (matched) imps.push(matched[1]);
            });
        }
        return imps;
    }
    /**
     * Retrieve true function name from string in comments
     * `(si.)bus`
     *
     * @static
     * @param {string} str
     * @returns {string}
     * @memberof Faust2MD
     */
    static matchFuncName(str: string): string {
        const matched = str.match(this.REGEX_FUNC_NAME);
        return matched ? matched[1] : null;
    }
    /**
     * Process the file
     *
     * @static
     * @param {string} fileName fileName to be fetch using getFile
     * @param {string} getFile callback used for import and library expressions
     * @param {string[]} [depthIn] current Depth, stop when 0;
     * @param {string[]} [pathIn] path of current namespace
     * @param {string} [docIn] recursive accum object for output
     * @returns {Promise<FaustDoc>}
     * @memberof Faust2MD
     */
    static async parse(fileName: string, getFile: (fileName: string) => Promise<string>, depthIn?: number, pathIn?: string[], docIn?: FaustDoc): Promise<FaustDoc> {
        if (depthIn === 0) return docIn;
        const depth = depthIn || 2;
        const strIn = await getFile(fileName);
        const doc = docIn || {} as FaustDoc;
        const path = pathIn || [];
        let inComment = false; // false: in code; true: in md-comment
        let idt = 0; // indentation retained to outdent comment lines
        let curName = ""; // current function name
        let strBuffer = ""; // current function doc
        const lines = strIn.split("\n");
        for (const line of lines) {
            if (!Faust2MD.isComment(line)) {
                if (inComment) inComment = false; // we are closing a md-comment
                const libs = this.matchLibrary(line);
                const imps = this.matchImport(line);
                for (const lib of libs) {
                    await this.parse(lib.fileName, getFile, depth - 1, [...path, lib.namespace], doc);
                }
                for (const imp of imps) {
                    await this.parse(imp, getFile, depth - 1, path, doc);
                }
                continue;
            }
            if (inComment) { // we are in a md-comment (not first line)
                if (idt === 0) idt = Faust2MD.indentation(line); // we have to measure the indentation
                // check end of md-comment
                const { endC, endS, endT } = { endC: Faust2MD.matchEndComment(line), endS: Faust2MD.matchEndSection(line), endT: Faust2MD.matchEndTitle(line) };
                if (endC || endS || endT) inComment = false; // end of md-comment switch back to mode O
                else strBuffer += Faust2MD.outdent(line, idt) + "\n";
                if (endC) { // pop buffer
                    if (curName) doc[path.join(".") + "." + curName] = { path: [...path], name: curName, doc: strBuffer };
                    curName = "";
                    strBuffer = "";
                }
                continue;
            }
            // check begin of md-comment
            const { c, s, t } = { c: Faust2MD.matchBeginComment(line), s: Faust2MD.matchBeginSection(line), t: Faust2MD.matchBeginTitle(line) };
            if (c) curName = this.matchFuncName(c);
            if (c || s || t) {
                inComment = true;
                idt = 0;
            }
        }
        return doc;
    }
}
