import * as monaco from "monaco-editor";
import { Faust2Doc } from "./Faust2Doc";
export type FaustLanguageProviders = {
    hoverProvider: monaco.languages.HoverProvider,
    tokensProvider: monaco.languages.IMonarchLanguage,
    completionItemProvider: monaco.languages.CompletionItemProvider
};
export const language: monaco.languages.ILanguageExtensionPoint = {
    id: "faust",
    extensions: ["dsp", "lib"],
    mimetypes: ["application/faust"]
};
export const config: monaco.languages.LanguageConfiguration = {
    comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"]
    },
    brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ],
    autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"', notIn: ["string"] },
        { open: "/*", close: "*/", notIn: ["string"] },
        { open: "/**", close: " */", notIn: ["string"] }
    ],
};
export const theme: monaco.editor.IStandaloneThemeData = {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "faustFunctions", foreground: "DDDD99" },
        { token: "faustKeywords", foreground: "4499CC" },
        { token: "faustLib", foreground: "CCCCBB" },
        { token: "faustCompOperators", foreground: "FFDDFF" },
        { token: "identifier", foreground: "77CCFF" }
    ],
    colors: null
};
const faustKeywords = [
    "import", "component", "declare", "library", "environment", "int", "float",
    "letrec", "with", "class", "process", "effect", "inputs", "outputs",
];
const faustFunctions = [
    "mem", "prefix", "rdtable", "rwtable",
    "select2", "select3", "ffunction", "fconstant", "fvariable",
    "button", "checkbox", "vslider", "hslider", "nentry",
    "vgroup", "hgroup", "tgroup", "vbargraph", "hbargraph", "attach",
    "acos", "asin", "atan", "atan2", "cos", "sin", "tan", "exp",
    "log", "log10", "pow", "sqrt", "abs", "min", "max", "fmod",
    "remainder", "floor", "ceil", "rint",
    "seq", "par", "sum", "prod"
];
const getFile = async (fileName: string) => {
    const libPath = "https://faust.grame.fr/tools/editor/libraries/";
    const res = await fetch(libPath + fileName);
    return await res.text();
};
export const getProviders = () => {
    return Faust2Doc.parse("stdfaust.lib", getFile).then((doc) => {
        const faustLib = Object.keys(doc);
        const hoverProvider: monaco.languages.HoverProvider = {
            provideHover: (model, position, token) => {
                const line$ = position.lineNumber;
                const line = model.getLineContent(line$);
                const wordAtPosition = model.getWordAtPosition(position);
                if (!wordAtPosition) return null;
                let column$ = wordAtPosition.startColumn - 1;
                const name = wordAtPosition.word;
                const prefixes = [] as string[];
                while (column$ - 2 >= 0 && line[column$ - 1] === ".") {
                    column$ -= 2;
                    const prefixWord = model.getWordAtPosition(new monaco.Position(line$, column$));
                    prefixes.splice(0, 0, prefixWord.word);
                    column$ = prefixWord.startColumn - 1;
                }
                while (prefixes.length) {
                    const strPrefix = prefixes.join(".");
                    const e = doc[strPrefix + "." + name];
                    if (e) {
                        return {
                            range: new monaco.Range(line$, column$ + 1, line$, wordAtPosition.endColumn),
                            contents: [
                                { value: `(${strPrefix}.)**${e.name}**` },
                                { value: e.doc.replace(/#+/, "######") },
                                { value: `[Detail...](https://faust.grame.fr/tools/editor/libraries/doc/library.html#${strPrefix}.${e.name.replace(/[\[\]\|]/g, "")})` }
                            ]
                        };
                    }
                    prefixes.splice(0, 1);
                }
                return null;
            }
        };
        const tokensProvider: monaco.languages.IMonarchLanguage = {
            faustKeywords,
            faustFunctions,
            faustLib,
            defaultToken: "invalid",
            tokenPostfix: ".dsp",
            faustCompOperators: [
                "~", ",", ":", "<:", ":>"
            ],
            operators: [
                "=",
                "+", "-", "*", "/", "%", "^",
                "&", "|", "xor", "<<", ">>",
                ">", "<", "==", "<=", ">=", "!=",
                "@", "'"
            ],
            // we include these common regular expressions
            symbols:  /[=><!~?:&|+\-*\/\^%]+/,
            // C# style strings
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            // The main tokenizer for our languages
            tokenizer: {
                root: [
                    // identifiers and keywords
                    [/!|_/, "keyword"], // Wire
                    [/[a-z_$]([\w\.$]*[\w$])?/, { cases: {
                        "@faustFunctions": "faustFunctions",
                        "@faustKeywords": "faustKeywords",
                        "@faustLib": "faustLib",
                        "@default": "identifier"
                    } }],
                    [/[A-Z][\w\$]*/, "type.identifier"],  // to show class names nicely
                    // whitespace
                    { include: "@whitespace" },
                    // delimiters and operators
                    [/[{}()\[\]]/, "@brackets"],
                    [/~|,|<:|:>|:/, "faustCompOperators"],
                    [/[<>](?!@symbols)/, "@brackets"],
                    [/=|\+|\-|\*|\/|%|\^|&|\||xor|<<|>>|>|<|==|<=|>=|!=|@|'/, { cases: {
                        "@operators": "operators",
                        "@default"  : ""
                    } }],
                    // numbers
                    [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
                    [/0[xX][0-9a-fA-F]+/, "number.hex"],
                    [/\d+/, "number"],
                    // delimiter: after number because of .\d floats
                    [/[;.]/, "delimiter"],
                    // strings
                    [/"([^"\\]|\\.)*$/, "string.invalid"],  // non-teminated string
                    [/"/,  { token: "string.quote", bracket: "@open", next: "@string" }]
                ],
                comment: [
                    [/[^\/*]+/, "comment"],
                    [/\/\*/, "comment", "@push"],    // nested comment
                    [/\*\//, "comment", "@pop"],
                    [/[\/*]/, "comment"]
                ],
                string: [
                    [/[^\\"]+/, "string"],
                    [/@escapes/, "string.escape"],
                    [/\\./, "string.escape.invalid"],
                    [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]
                ],
                whitespace: [
                    [/[ \t\r\n]+/, "white"],
                    [/\/\*/, "comment", "@comment"],
                    [/\/\/.*$/, "comment"]
                ]
            }
        } as any;
        const completionItemProvider: monaco.languages.CompletionItemProvider = {
            provideCompletionItems: () => {
                const suggestions = [] as monaco.languages.CompletionItem[];
                [...faustKeywords, ...faustFunctions, ...faustLib].forEach((e) => {
                    suggestions.push({
                        label: e,
                        kind: monaco.languages.CompletionItemKind.Text,
                        insertText: e,
                        range: null
                    });
                });
                return { suggestions };
            }
        };
        return { hoverProvider, tokensProvider, completionItemProvider } as FaustLanguageProviders;
    });
};
