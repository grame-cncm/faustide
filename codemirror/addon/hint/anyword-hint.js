// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var WORD = /[\w$]+/, RANGE = 500;

  CodeMirror.registerHelper("hint", "anyword", function(editor, options) {

    var word = options && options.word || WORD;
    var range = options && options.range || RANGE;
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
    var end = cur.ch, start = end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    var curWord = start != end && curLine.slice(start, end);
    var list = options && options.list || [], seen = {};


    // ajout YO =================================================

    for (var i = 0; i < gFaustKeyWords.length; i++) {
      const w = gFaustKeyWords[i];
      if (!curWord || w.lastIndexOf(curWord, 0) == 0) {
        list.push(w);
      }
    }

    // Search for faust std librairies snippets,
    // the first 3 characters are the library prefix and are skipped.
    if (curWord.length>0) {
      let snippets = gFaustLibSnippetsArray[curWord.charCodeAt(0)];
      let n = snippets.length;
      for (var i = 0; i < n; i++) {
        const w = snippets[i];
        if (!curWord || w.lastIndexOf(curWord, 3) == 3) {
          list.push(w);
        }
      }
    }

    // fin ajout  YO ============================================

    if (list.length == 0) {
      // we failed with primitives, check
      var re = new RegExp(word.source, "g");
      for (var dir = -1; dir <= 1; dir += 2) {
        var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
        for (; line != endLine; line += dir) {
          var text = editor.getLine(line), m;
          while (m = re.exec(text)) {
            if (line == cur.line && m[0] === curWord) continue;
            if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
              seen[m[0]] = true;
              list.push(m[0]);
            }
          }
        }
      }
    }

    return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
  });
});
