// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"), require("../clike/clike"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror", "../clike/clike"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    var keywords =
        "process component import library declare with environment waveform"
        .split(" ");
    var blockKeywords = "";
    var builtins = "";
    var atoms =
        "mem prefix int float rdtable rwtable select2 select3 ffunction fconstant fvariable button checkbox vslider hslider nentry vgroup hgroup tgroup vbargraph hbargraph attach acos asin atan atan2 cos sin tan exp log log10 pow sqrt abs min max fmod remainder floor ceil rint"
        .split(" ");

    function set(words) {
        var obj = {};
        for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
        return obj;
    }

    CodeMirror.defineMIME("application/faust", {
        name: "clike",
        keywords: set(keywords),
        multiLineStrings: true,
        blockKeywords: set(blockKeywords),
        builtin: set(builtins),
        atoms: set(atoms),
        hooks: {
            "@": function(stream) {
                return "meta";
            },
            "'": function(stream) {
                return "meta";
            }
        }
    });

    CodeMirror.registerHelper("hintWords", "application/faust", keywords.concat(
        atoms).concat(builtins));

    // This is needed to make loading through meta.js work.
    CodeMirror.defineMode("faust", function(conf) {
        return CodeMirror.getMode(conf, "application/faust");
    }, "clike");
});
