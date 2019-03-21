// import { Faust } from "faust2webaudio";
import * as $ from "jquery";
import * as monaco from "monaco-editor";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
        AudioWorklet?: typeof AudioWorklet;
    }
}
$(document).ready(async () => {
    const editor = initEditor();
    $(window).on("resize", () => editor.layout());
    // $(window).on("resize", console.log);
    const { Faust } = await import("faust2webaudio");
    const faust = new Faust();
    await faust.ready;
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

});
const initEditor = () => {
    const code =
`import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;
    const polycode =
`import("stdfaust.lib");
process = ba.pulsen(1, ba.hz2midikey(freq) * 1000) : pm.marimba(freq, 0, 7000, 0.5, 0.8) * gate * gain with {
    freq = hslider("freq", 440, 40, 8000, 1);
    gain = hslider("gain", 0.5, 0, 1, 0.01);
    gate = button("gate");
};
effect = dm.freeverb_demo;`;
    monaco.languages.register({
        id: "faust",
        extensions: ["dsp", "lib"],
        mimetypes: ["application/faust"]
    });
    monaco.languages.setMonarchTokensProvider("faust", {
        defaultToken: "invalid",
        tokenPostfix: ".dsp",
        keywords: [
            "import", "component", "declare", "library", "environment", "int", "float",
            "letrec", "with", "class", "process", "effect", "inputs", "outputs"
        ],
        sysFunctions: [
            "mem", "prefix", "rdtable", "rwtable",
            "select2", "select3", "ffunction", "fconstant", "fvariable",
            "button", "checkbox", "vslider", "hslider", "nentry",
            "vgroup", "hgroup", "tgroup", "vbargraph", "hbargraph", "attach",
            "acos", "asin", "atan", "atan2", "cos", "sin", "tan", "exp",
            "log", "log10", "pow", "sqrt", "abs", "min", "max", "fmod",
            "remainder", "floor", "ceil", "rint",
            "seq", "par", "sum", "prod"
        ],
        compOperators: [
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
                [/[a-z_$][\w$]*/, { cases: {
                    "@sysFunctions": "constant",
                    "@keywords": "keyword",
                    "@default": "identifier"
                } }],
                [/[A-Z][\w\$]*/, "type.identifier"],  // to show class names nicely
                // whitespace
                { include: "@whitespace" },
                // delimiters and operators
                [/[{}()\[\]]/, "@brackets"],
                [/~|,|<:|:>|:/, "delimiter"],
                [/[<>](?!@symbols)/, "@brackets"],
                [/=|\+|\-|\*|\/|%|\^|&|\||xor|<<|>>|>|<|==|<=|>=|!=|@|'/, { cases: {
                    "@operators": "delimiter",
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
                [/\/\*/,    "comment", "@push"],    // nested comment
                ["\\*/",    "comment", "@pop"],
                [/[\/*]/,   "comment"]
            ],

            string: [
                [/[^\\"]+/,  "string"],
                [/@escapes/, "string.escape"],
                [/\\./,      "string.escape.invalid"],
                [/"/,        { token: "string.quote", bracket: "@close", next: "@pop" }]
            ],
            whitespace: [
                [/[ \t\r\n]+/, "white"],
                [/\/\*/,       "comment", "@comment"],
                [/\/\/.*$/,    "comment"]
            ]
        }
    } as any);
    const editor = monaco.editor.create($("#editor")[0], {
        value: code,
        language: "faust",
        theme: "vs-dark",
        dragAndDrop: true
    });
    return editor;
};
