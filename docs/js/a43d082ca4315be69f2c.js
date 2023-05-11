"use strict";
(self["webpackChunkfausteditorweb"] = self["webpackChunkfausteditorweb"] || []).push([["src_monaco-faust_FaustLang_ts-data_image_png_base64_iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8-ee670f"],{

/***/ "./src/monaco-faust/Faust2Doc.ts":
/*!***************************************!*\
  !*** ./src/monaco-faust/Faust2Doc.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Faust2Doc": () => (/* binding */ Faust2Doc)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Faust2MD__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Faust2MD */ "./src/monaco-faust/Faust2MD.ts");



/* eslint-disable no-await-in-loop */

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

/**
 *
 * @class Faust2Doc
 */
class Faust2Doc {
  /**
   * Retrieve a library definition
   *
   * @static
   * @param {string} line
   * @returns {{ namespace: string, fileName: string }[]}
   * @memberof Faust2Doc
   */
  static matchLibrary(line) {
    var libs = [];
    var exps = line.match(new RegExp(this.REGEX_DEF_LIB, "g"));
    if (exps) {
      exps.forEach(exp => {
        var matched = exp.match(this.REGEX_DEF_LIB);
        if (matched) libs.push({
          namespace: matched[1],
          fileName: matched[2]
        });
      });
    }
    return libs;
  }
  /**
   * Retrieve an import expression
   *
   * @static
   * @param {string} line
   * @returns {string[]}
   * @memberof Faust2Doc
   */
  static matchImport(line) {
    var imps = [];
    var exps = line.match(new RegExp(this.REGEX_DEF_IMP, "g"));
    if (exps) {
      exps.forEach(exp => {
        var matched = exp.match(this.REGEX_DEF_IMP);
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
  static matchFuncName(str) {
    var matched = str.match(this.REGEX_FUNC_NAME);
    return matched ? matched[1] : null;
  }
  /**
   * Get all conditions in func name like `[third|half]_octave_[analyzer|filterbank][n]`
   *
   * @static
   * @param {string} str
   * @returns {string[]}
   * @memberof Faust2Doc
   */
  static getAllConditions(str) {
    return this.getCondition([str]);
  }
  /**
   * getAllConditions Recursive body
   *
   * @static
   * @param {string[]} [condsIn]
   * @param {RegExp} [regexp]
   * @returns {string[]}
   * @memberof Faust2Doc
   */
  static getCondition(condsIn) {
    var conds = [];
    condsIn.forEach(cond => {
      var regexp = new RegExp(this.REGEX_FUNC_NAME_COND, "g");
      var result = regexp.exec(cond);
      if (!result) return;
      var found = result[0];
      var index = result.index;
      var subConds = result.splice(1).filter(el => typeof el === "string").map(str => str.replace(/^\|/, ""));
      var before = cond.substring(0, index);
      var after = cond.substring(index + found.length);
      if (subConds.length === 1) {
        conds.push(before + after);
        conds.push(before + subConds + after);
      } else {
        subConds.forEach(subCond => conds.push(before + subCond + after));
      }
    });
    return conds.length ? this.getCondition(conds) : condsIn;
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
   * @returns {Promise<TFaustDocs>}
   * @memberof Faust2MD
   */
  static parse(fileName, getFile, depthIn, pathIn, docIn) {
    var _this = this;
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var depth, strIn, doc, path, inComment, idt, curName, strBuffer, lines, i, line, libs, imps, j, lib, _j, imp, _endC$endS$endT, endC, endS, endT, _c$s$t, c, s, t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(depthIn === 0)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", docIn);
          case 2:
            depth = depthIn || 2;
            _context.next = 5;
            return getFile(fileName);
          case 5:
            strIn = _context.sent;
            doc = docIn || {};
            path = pathIn || [];
            inComment = false; // false: in code; true: in md-comment
            idt = 0; // indentation retained to outdent comment lines
            curName = ""; // current function name
            strBuffer = ""; // current function doc
            lines = strIn.split("\n");
            i = 0;
          case 14:
            if (!(i < lines.length)) {
              _context.next = 51;
              break;
            }
            line = lines[i];
            if (line) {
              _context.next = 18;
              break;
            }
            return _context.abrupt("continue", 48);
          case 18:
            if (_Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.isComment(line)) {
              _context.next = 39;
              break;
            }
            if (inComment) {
              // we are closing a md-comment
              inComment = false;
              if (curName) _this.getAllConditions(curName).forEach(name => doc[path.concat(name).join(".")] = {
                name: curName,
                path: [...path],
                doc: strBuffer
              });
              curName = "";
              strBuffer = "";
            }
            libs = _this.matchLibrary(line);
            imps = _this.matchImport(line);
            j = 0;
          case 23:
            if (!(j < libs.length)) {
              _context.next = 30;
              break;
            }
            lib = libs[j];
            _context.next = 27;
            return _this.parse(lib.fileName, getFile, depth - 1, [...path, lib.namespace], doc);
          case 27:
            j++;
            _context.next = 23;
            break;
          case 30:
            _j = 0;
          case 31:
            if (!(_j < imps.length)) {
              _context.next = 38;
              break;
            }
            imp = imps[_j];
            _context.next = 35;
            return _this.parse(imp, getFile, depth - 1, path, doc);
          case 35:
            _j++;
            _context.next = 31;
            break;
          case 38:
            return _context.abrupt("continue", 48);
          case 39:
            if (!inComment) {
              _context.next = 45;
              break;
            }
            // we are in a md-comment (not first line)
            if (idt === 0) idt = _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.indentation(line); // we have to measure the indentation
            // check end of md-comment
            _endC$endS$endT = {
              endC: _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.matchEndComment(line),
              endS: _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.matchEndSection(line),
              endT: _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.matchEndTitle(line)
            }, endC = _endC$endS$endT.endC, endS = _endC$endS$endT.endS, endT = _endC$endS$endT.endT;
            if (endC || endS || endT) inComment = false; // end of md-comment switch back to mode O
            else strBuffer += _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.outdent(line, idt) + "\n";
            if (endC) {
              // pop buffer
              if (curName) _this.getAllConditions(curName).forEach(name => doc[path.concat(name).join(".")] = {
                name: curName,
                path: [...path],
                doc: strBuffer
              });
              curName = "";
              strBuffer = "";
            }
            return _context.abrupt("continue", 48);
          case 45:
            // check begin of md-comment
            _c$s$t = {
              c: _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.matchBeginComment(line),
              s: _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.matchBeginSection(line),
              t: _Faust2MD__WEBPACK_IMPORTED_MODULE_3__.Faust2MD.matchBeginTitle(line)
            }, c = _c$s$t.c, s = _c$s$t.s, t = _c$s$t.t;
            if (c) curName = _this.matchFuncName(c);
            if (c || s || t) {
              inComment = true;
              idt = 0;
              strBuffer = "";
            }
          case 48:
            i++;
            _context.next = 14;
            break;
          case 51:
            return _context.abrupt("return", doc);
          case 52:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(Faust2Doc, "REGEX_DEF_LIB", /\b(\w+)\s*=\s*library\("(.+)"\);/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(Faust2Doc, "REGEX_DEF_IMP", /\bimport\("(.+)"\);/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(Faust2Doc, "REGEX_FUNC_NAME", /`.*?([\w[\]|]+)`/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(Faust2Doc, "REGEX_FUNC_NAME_COND", /\[(.+?)(\|.+?)*?]/);

/***/ }),

/***/ "./src/monaco-faust/Faust2MD.ts":
/*!**************************************!*\
  !*** ./src/monaco-faust/Faust2MD.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Faust2MD": () => (/* binding */ Faust2MD)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*

Ultra simple automatic documentation system for Faust.
Creates a markdown file by extracting the comments from
a Faust file. The option -t n can be used to change the
default (4) tab setting. The option -c can be used to
include the Faust code itself into the generated doc.
And the option -f can be used to include a YAML front
matter with the name of the file and the date.

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
The translation is the following:
  ## foo(x,y)
    markdown text....
    markdown text....
--------------------------------------------------------
*/

/**
 * faust2md ts port
 *
 * @class Faust2MD
 */
class Faust2MD {
  /**
   * Print the front matter of the file
   *
   * @static
   * @param {string} fileName
   * @returns {string}
   * @memberof Faust2MD
   */
  static frontMatter(fileName) {
    return "---\n" + "file: ".concat(fileName, "\n") + "date: ".concat(new Date().toLocaleDateString(), "\n") + "---\n";
  }
  /**
   * Outdent a comment line by n characters in
   * order to remove the prefix "//   "
   *
   * @static
   * @param {string} line
   * @param {number} idt
   * @returns {string}
   * @memberof Faust2MD
   */
  static outdent(line, idt) {
    return line.length <= idt ? "\n" : line.substr(idt);
  }
  /**
   * Match the first line of a title
   * of type "//#### Title ####"
   * at least 3 # are needed
   *
   * @static
   * @param {string} line
   * @returns {string}
   * @memberof Faust2MD
   */
  static matchBeginTitle(line) {
    var matched = line.match(this.REGEX_BEG_TITLE);
    return matched ? matched[1] : null;
  }
  /**
   * Match the last line of a title
   * of type "//########"
   * or a blank line
   *
   * @static
   * @param {string} line
   * @returns {boolean}
   * @memberof Faust2MD
   */
  static matchEndTitle(line) {
    var matched = line.match(this.REGEX_END_TITLE);
    return !!matched;
  }
  /**
   * Match the first line of a section
   * of type "//==== Section ===="
   * at least 3 = are needed
   *
   * @static
   * @param {string} line
   * @returns {string}
   * @memberof Faust2MD
   */
  static matchBeginSection(line) {
    var matched = line.match(this.REGEX_BEG_SECTION);
    return matched ? matched[1] : null;
  }
  /**
   * Match the last line of a section
   * of type "//======="
   * or a blank line
   *
   * @static
   * @param {string} line
   * @returns {boolean}
   * @memberof Faust2MD
   */
  static matchEndSection(line) {
    var matched = line.match(this.REGEX_END_SECTION);
    return !!matched;
  }
  /**
   * Match the first line of a comment
   * of type "//--- foo(x,y) ----"
   * at least 3 - are needed
   *
   * @static
   * @param {string} line
   * @returns {string}
   * @memberof Faust2MD
   */
  static matchBeginComment(line) {
    var matched = line.match(this.REGEX_BEG_COMMENT);
    return matched ? matched[1] : null;
  }
  /**
   * Match the last line of a comment
   * of type "//-----------------"
   * or a blank line
   *
   * @static
   * @param {string} line
   * @returns {boolean}
   * @memberof Faust2MD
   */
  static matchEndComment(line) {
    var matched = line.match(this.REGEX_END_COMMENT);
    return !!matched;
  }
  /**
   * Measure the indentation of a md-comment line
   * that is the len of the prefix '//   '
   *
   * @static
   * @param {string} line
   * @returns {number}
   * @memberof Faust2MD
   */
  static indentation(line) {
    var matched = line.match(this.REGEX_INDENT);
    return matched ? matched[1].length : 0;
  }
  /**
   * Indicates if a line is a comment
   *
   * @static
   * @param {string} line
   * @returns {boolean}
   * @memberof Faust2MD
   */
  static isComment(line) {
    var matched = line.match(this.REGEX_COMMENT);
    return !!matched;
  }
  /**
   * Process the file
   *
   * @static
   * @param {string} strIn
   * @param {string} [fileName]
   * @param {{ tabsize?: number, code?: boolean, front?: boolean }} [optionsIn]
   * @returns {string}
   * @memberof Faust2MD
   */
  static parse(strIn, fileName, optionsIn) {
    var options = _objectSpread({
      tabsize: 4,
      code: false,
      front: false
    }, optionsIn);
    var strOut = "";
    var inComment = false; // false: in code; true: in md-comment
    var idt = 0; // indentation retained to outdent comment lines
    if (options.front && fileName) strOut += this.frontMatter(fileName);
    strIn.split("\n").forEach(line => {
      if (!this.isComment(line)) {
        if (inComment) {
          // we are closing a md-comment
          strOut += "\n";
          inComment = false;
        }
        if (options.code) strOut += "\t".concat(line, "\n");
        return;
      }
      if (inComment) {
        // we are in a md-comment
        if (idt === 0) idt = this.indentation(line); // we have to measure the indentation
        // check end of md-comment
        var _endC$endS$endT = {
            endC: this.matchEndComment(line),
            endS: this.matchEndSection(line),
            endT: this.matchEndTitle(line)
          },
          endC = _endC$endS$endT.endC,
          endS = _endC$endS$endT.endS,
          endT = _endC$endS$endT.endT;
        if (endC) strOut += "\n---\n\n";
        if (endC || endS || endT) inComment = false; // end of md-comment switch back to mode O
        else strOut += this.outdent(line, idt) + "\n";
        return;
      }
      // check begin of md-comment
      var _c$s$t = {
          c: this.matchBeginComment(line),
          s: this.matchBeginSection(line),
          t: this.matchBeginTitle(line)
        },
        c = _c$s$t.c,
        s = _c$s$t.s,
        t = _c$s$t.t;
      if (c) strOut += "\n### ".concat(c, "\n");else if (s) strOut += "\n## ".concat(s, "\n");else if (t) strOut += "\n# ".concat(t, "\n");
      if (c || s || t) {
        inComment = true;
        idt = 0;
      } else if (options.code) strOut += "\t".concat(line, "\n");
    });
    return strOut;
  }
}
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_BEG_TITLE", /^\s*\/\/#{3,}\s*([^#]*[^#\s])\s*#{3,}$/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_END_TITLE", /^\s*((\/\/#{3,})|(\s*))$/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_BEG_SECTION", /^\s*\/\/={3,}\s*([^=]*[^=\s])\s*={3,}$/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_END_SECTION", /^\s*((\/\/={3,})|(\s*))$/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_BEG_COMMENT", /^\s*\/\/-{3,}\s*([^-]*[^=\s])\s*-{3,}$/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_END_COMMENT", /^\s*((\/\/-{3,})|(\s*))$/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_INDENT", /(^\s*\/\/\s*)[^\s]/);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Faust2MD, "REGEX_COMMENT", /^\s*\/\//);

/***/ }),

/***/ "./src/monaco-faust/FaustLang.ts":
/*!***************************************!*\
  !*** ./src/monaco-faust/FaustLang.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "getProviders": () => (/* binding */ getProviders),
/* harmony export */   "language": () => (/* binding */ language),
/* harmony export */   "matchDocKey": () => (/* binding */ matchDocKey),
/* harmony export */   "theme": () => (/* binding */ theme)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var monaco_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! monaco-editor */ "include-loader!./node_modules/monaco-editor/esm/vs/editor/editor.main.js");
/* harmony import */ var _Faust2Doc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Faust2Doc */ "./src/monaco-faust/Faust2Doc.ts");
/* harmony import */ var _documentation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../documentation */ "./src/documentation.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }




var language = {
  id: "faust",
  extensions: ["dsp", "lib"],
  mimetypes: ["application/faust"]
};
var config = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [["{", "}"], ["[", "]"], ["(", ")"]],
  autoClosingPairs: [{
    open: "{",
    close: "}"
  }, {
    open: "[",
    close: "]"
  }, {
    open: "(",
    close: ")"
  }, {
    open: '"',
    close: '"',
    notIn: ["string"]
  }, {
    open: "/*",
    close: "*/",
    notIn: ["string"]
  }]
};
var theme = {
  base: "vs-dark",
  inherit: true,
  rules: [{
    token: "faustFunctions",
    foreground: "DDDD99"
  }, {
    token: "faustKeywords",
    foreground: "4499CC"
  }, {
    token: "faustLib",
    foreground: "CCCCBB"
  }, {
    token: "faustCompOperators",
    foreground: "FFDDFF"
  }, {
    token: "identifier",
    foreground: "77CCFF"
  }],
  colors: {}
};
var faustKeywords = ["import", "component", "declare", "library", "environment", "int", "float", "letrec", "with", "class", "process", "effect", "inputs", "outputs"];
var faustFunctions = ["mem", "prefix", "rdtable", "rwtable", "select2", "select3", "ffunction", "fconstant", "fvariable", "route", "waveform", "soundfile", "button", "checkbox", "vslider", "hslider", "nentry", "vgroup", "hgroup", "tgroup", "vbargraph", "hbargraph", "attach", "acos", "asin", "atan", "atan2", "cos", "sin", "tan", "exp", "log", "log10", "pow", "sqrt", "abs", "min", "max", "fmod", "remainder", "floor", "ceil", "rint", "seq", "par", "sum", "prod"];
var getFile = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(fileName, faust) {
    var libPath, res;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!faust) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", faust.fs.readFile("libraries/" + fileName, {
            encoding: "utf8"
          }));
        case 2:
          libPath = "https://faustlibraries.grame.fr/libs/";
          _context.next = 5;
          return fetch(libPath + fileName);
        case 5:
          res = _context.sent;
          return _context.abrupt("return", res.text());
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Match an available doc key from monaco editor
 *
 * @param {TFaustDocs} doc
 * @param {editor.ITextModel} model
 * @param {Position} position
 * @returns {TMatchedFaustDoc} full: [...prefixes, name], range: a monaco range object, doc: a FaustDoc object
 */
var matchDocKey = (doc, model, position) => {
  var line$ = position.lineNumber;
  var line = model.getLineContent(line$);
  var wordAtPosition = model.getWordAtPosition(position);
  if (!wordAtPosition) return null;
  var column$ = wordAtPosition.startColumn - 1;
  var name = wordAtPosition.word;
  var prefixes = [];
  while (column$ - 2 >= 0 && line[column$ - 1] === ".") {
    column$ -= 2;
    var prefixWord = model.getWordAtPosition(new monaco_editor__WEBPACK_IMPORTED_MODULE_3__.Position(line$, column$));
    prefixes.splice(0, 0, prefixWord.word);
    column$ = prefixWord.startColumn - 1;
  }
  var nameArray = [...prefixes, name];
  while (nameArray.length) {
    var _name = nameArray.join(".");
    var e = doc[_name];
    if (e) {
      return {
        nameArray,
        name: _name,
        range: new monaco_editor__WEBPACK_IMPORTED_MODULE_3__.Range(line$, column$ + 1, line$, wordAtPosition.endColumn),
        doc: e
      };
    }
    column$ += nameArray.splice(0, 1)[0].length + 1;
  }
  return null;
};
var getProviders = /*#__PURE__*/function () {
  var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4(faust) {
    var libDocs, primDocs, faustLib, hoverProvider, tokensProvider, completionItemProvider;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          libDocs = {};
          primDocs = {};
          _context4.prev = 2;
          _context4.next = 5;
          return _Faust2Doc__WEBPACK_IMPORTED_MODULE_4__.Faust2Doc.parse("stdfaust.lib", /*#__PURE__*/function () {
            var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(fileName) {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", getFile(fileName, faust));
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x4) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 5:
          libDocs = _context4.sent;
          _context4.next = 8;
          return _Faust2Doc__WEBPACK_IMPORTED_MODULE_4__.Faust2Doc.parse("primitives.lib", /*#__PURE__*/function () {
            var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(fileName) {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", getFile(fileName, faust));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x5) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 8:
          primDocs = _context4.sent;
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](2);
          console.error(_context4.t0);
        case 14:
          // eslint-disable-line no-empty, no-console
          faustLib = Object.keys(libDocs);
          hoverProvider = {
            provideHover: (model, position) => {
              var matched = matchDocKey(_objectSpread(_objectSpread({}, primDocs), libDocs), model, position);
              if (matched) {
                var prefix = matched.nameArray.slice();
                var name = prefix.pop();
                var doc = matched.doc;
                return {
                  range: matched.range,
                  contents: [{
                    value: "```\n".concat(prefix.length ? "(" + prefix.join(".") + ".)" : "").concat(name, "\n```")
                  }, {
                    value: doc.doc.replace(/#+/g, "######")
                  }, {
                    value: prefix.length ? "[Detail...](".concat(_documentation__WEBPACK_IMPORTED_MODULE_5__.faustDocURL, "/").concat(_documentation__WEBPACK_IMPORTED_MODULE_5__.docSections[prefix.slice(0, 2)], "/#").concat(prefix.join(".")).concat(doc.name.replace(/[[\]|]/g, "").toLowerCase(), ")") : "[Detail...](https://faustdoc.grame.fr/manual/syntax/index.html#faust-syntax)"
                  }]
                };
              }
              return null;
            }
          };
          tokensProvider = {
            faustKeywords,
            faustFunctions,
            faustLib,
            defaultToken: "invalid",
            tokenPostfix: ".dsp",
            faustCompOperators: ["~", ",", ":", "<:", ":>"],
            operators: ["=", "+", "-", "*", "/", "%", "^", "&", "|", "xor", "<<", ">>", ">", "<", "==", "<=", ">=", "!=", "@", "'"],
            // we include these common regular expressions
            symbols: /[=><!~?:&|+\-*/^%]+/,
            // C# style strings
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            // The main tokenizer for our languages
            tokenizer: {
              root: [
              // identifiers and keywords
              [/!|_/, "keyword"], [/[a-z_$]([\w.$]*[\w$])?/, {
                cases: {
                  "@faustFunctions": "faustFunctions",
                  "@faustKeywords": "faustKeywords",
                  "@faustLib": "faustLib",
                  "@default": "identifier"
                }
              }], [/[A-Z][\w$]*/, "type.identifier"],
              // whitespace
              {
                include: "@whitespace"
              },
              // delimiters and operators
              [/[{}()[\]]/, "@brackets"], [/~|,|<:|:>|:/, "faustCompOperators"], [/[<>](?!@symbols)/, "@brackets"], [/=|\+|-|\*|\/|%|\^|&|\||xor|<<|>>|>|<|==|<=|>=|!=|@|'/, {
                cases: {
                  "@operators": "operators",
                  "@default": ""
                }
              }],
              // numbers
              [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"], [/0[xX][0-9a-fA-F]+/, "number.hex"], [/\d+/, "number"],
              // delimiter: after number because of .\d floats
              [/[;.]/, "delimiter"],
              // strings
              [/"/, {
                token: "string",
                next: "@string"
              }]],
              comment: [[/[^/*]+/, "comment"], [/\/\*/, "comment", "@push"], [/\*\//, "comment", "@pop"], [/[/*]/, "comment"]],
              string: [[/[^\\"$]+/, "string"], [/@escapes/, "string.escape"], [/\\./, "string.escape.invalid"], [/"/, "string", "@pop"]],
              whitespace: [[/[ \t\r\n]+/, "white"], [/\/\*/, "comment", "@comment"], [/\/\/.*$/, "comment"]]
            }
          };
          completionItemProvider = {
            provideCompletionItems: () => {
              var suggestions = [];
              [...faustKeywords, ...faustFunctions, ...faustLib].forEach(e => {
                suggestions.push({
                  label: e,
                  kind: monaco_editor__WEBPACK_IMPORTED_MODULE_3__.languages.CompletionItemKind.Text,
                  insertText: e,
                  range: null
                });
              });
              return {
                suggestions
              };
            }
          };
          return _context4.abrupt("return", {
            hoverProvider,
            tokensProvider,
            completionItemProvider,
            docs: libDocs
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 11]]);
  }));
  return function getProviders(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAHUlEQVQYV2PYvXu3JAi7uLiAMaYAjAGTQBPYLQkAa/0Zef3qRswAAAAASUVORK5CYII=":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAHUlEQVQYV2PYvXu3JAi7uLiAMaYAjAGTQBPYLQkAa/0Zef3qRswAAAAASUVORK5CYII= ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAHUlEQVQYV2PYvXu3JAi7uLiAMaYAjAGTQBPYLQkAa/0Zef3qRswAAAAASUVORK5CYII=";

/***/ }),

/***/ "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjNDI0MjQyIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjNDI0MjQyIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg== ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjNDI0MjQyIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";

/***/ }),

/***/ "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjQzVDNUM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjQzVDNUM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg== ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjQzVDNUM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";

/***/ })

}]);
//# sourceMappingURL=a43d082ca4315be69f2c.js.map