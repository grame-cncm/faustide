(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/postiats/postiats.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/postiats/postiats.js ***!
  \********************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Artyom Shalkhakov. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *
 *  Based on the ATS/Postiats lexer by Hongwei Xi.
 *--------------------------------------------------------------------------------------------*/

var conf = {
    comments: {
        lineComment: '//',
        blockComment: ['(*', '*)'],
    },
    brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
    autoClosingPairs: [
        { open: '"', close: '"', notIn: ['string', 'comment'] },
        { open: '{', close: '}', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
        { open: '(', close: ')', notIn: ['string', 'comment'] },
    ]
};
var language = {
    tokenPostfix: '.pats',
    // TODO: staload and dynload are followed by a special kind of string literals
    // with {$IDENTIFER} variables, and it also may make sense to highlight
    // the punctuation (. and / and \) differently.
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    // keyword reference: https://github.com/githwxi/ATS-Postiats/blob/master/src/pats_lexing_token.dats
    keywords: [
        //
        "abstype",
        "abst0ype",
        "absprop",
        "absview",
        "absvtype",
        "absviewtype",
        "absvt0ype",
        "absviewt0ype",
        //
        "as",
        //
        "and",
        //
        "assume",
        //
        "begin",
        //
        /*
                "case", // CASE
        */
        //
        "classdec",
        //
        "datasort",
        //
        "datatype",
        "dataprop",
        "dataview",
        "datavtype",
        "dataviewtype",
        //
        "do",
        //
        "end",
        //
        "extern",
        "extype",
        "extvar",
        //
        "exception",
        //
        "fn",
        "fnx",
        "fun",
        //
        "prfn",
        "prfun",
        //
        "praxi",
        "castfn",
        //
        "if",
        "then",
        "else",
        //
        "ifcase",
        //
        "in",
        //
        "infix",
        "infixl",
        "infixr",
        "prefix",
        "postfix",
        //
        "implmnt",
        "implement",
        //
        "primplmnt",
        "primplement",
        //
        "import",
        //
        /*
                "lam", // LAM
                "llam", // LLAM
                "fix", // FIX
        */
        //
        "let",
        //
        "local",
        //
        "macdef",
        "macrodef",
        //
        "nonfix",
        //
        "symelim",
        "symintr",
        "overload",
        //
        "of",
        "op",
        //
        "rec",
        //
        "sif",
        "scase",
        //
        "sortdef",
        /*
        // HX: [sta] is now deprecated
        */
        "sta",
        "stacst",
        "stadef",
        "static",
        /*
                "stavar", // T_STAVAR
        */
        //
        "staload",
        "dynload",
        //
        "try",
        //
        "tkindef",
        //
        /*
                "type", // TYPE
        */
        "typedef",
        "propdef",
        "viewdef",
        "vtypedef",
        "viewtypedef",
        //
        /*
                "val", // VAL
        */
        "prval",
        //
        "var",
        "prvar",
        //
        "when",
        "where",
        //
        /*
                "for", // T_FOR
                "while", // T_WHILE
        */
        //
        "with",
        //
        "withtype",
        "withprop",
        "withview",
        "withvtype",
        "withviewtype",
    ],
    keywords_dlr: [
        "$delay",
        "$ldelay",
        //
        "$arrpsz",
        "$arrptrsize",
        //
        "$d2ctype",
        //
        "$effmask",
        "$effmask_ntm",
        "$effmask_exn",
        "$effmask_ref",
        "$effmask_wrt",
        "$effmask_all",
        //
        "$extern",
        "$extkind",
        "$extype",
        "$extype_struct",
        //
        "$extval",
        "$extfcall",
        "$extmcall",
        //
        "$literal",
        //
        "$myfilename",
        "$mylocation",
        "$myfunction",
        //
        "$lst",
        "$lst_t",
        "$lst_vt",
        "$list",
        "$list_t",
        "$list_vt",
        //
        "$rec",
        "$rec_t",
        "$rec_vt",
        "$record",
        "$record_t",
        "$record_vt",
        //
        "$tup",
        "$tup_t",
        "$tup_vt",
        "$tuple",
        "$tuple_t",
        "$tuple_vt",
        //
        "$break",
        "$continue",
        //
        "$raise",
        //
        "$showtype",
        //
        "$vcopyenv_v",
        "$vcopyenv_vt",
        //
        "$tempenver",
        //
        "$solver_assert",
        "$solver_verify",
    ],
    keywords_srp: [
        //
        "#if",
        "#ifdef",
        "#ifndef",
        //
        "#then",
        //
        "#elif",
        "#elifdef",
        "#elifndef",
        //
        "#else",
        "#endif",
        //
        "#error",
        //
        "#prerr",
        "#print",
        //
        "#assert",
        //
        "#undef",
        "#define",
        //
        "#include",
        "#require",
        //
        "#pragma",
        "#codegen2",
        "#codegen3",
    ],
    irregular_keyword_list: [
        "val+",
        "val-",
        "val",
        "case+",
        "case-",
        "case",
        "addr@",
        "addr",
        "fold@",
        "free@",
        "fix@",
        "fix",
        "lam@",
        "lam",
        "llam@",
        "llam",
        "viewt@ype+",
        "viewt@ype-",
        "viewt@ype",
        "viewtype+",
        "viewtype-",
        "viewtype",
        "view+",
        "view-",
        "view@",
        "view",
        "type+",
        "type-",
        "type",
        "vtype+",
        "vtype-",
        "vtype",
        "vt@ype+",
        "vt@ype-",
        "vt@ype",
        "viewt@ype+",
        "viewt@ype-",
        "viewt@ype",
        "viewtype+",
        "viewtype-",
        "viewtype",
        "prop+",
        "prop-",
        "prop",
        "type+",
        "type-",
        "type",
        "t@ype",
        "t@ype+",
        "t@ype-",
        "abst@ype",
        "abstype",
        "absviewt@ype",
        "absvt@ype",
        "for*",
        "for",
        "while*",
        "while"
    ],
    keywords_types: [
        'bool',
        'double',
        'byte',
        'int',
        'short',
        'char',
        'void',
        'unit',
        'long',
        'float',
        'string',
        'strptr'
    ],
    // TODO: reference for this?
    keywords_effects: [
        "0",
        "fun",
        "clo",
        "prf",
        "funclo",
        "cloptr",
        "cloref",
        "ref",
        "ntm",
        "1" // all effects
    ],
    operators: [
        "@",
        "!",
        "|",
        "`",
        ":",
        "$",
        ".",
        "=",
        "#",
        "~",
        //
        "..",
        "...",
        //
        "=>",
        // "=<", // T_EQLT
        "=<>",
        "=/=>",
        "=>>",
        "=/=>>",
        //
        "<",
        ">",
        //
        "><",
        //
        ".<",
        ">.",
        //
        ".<>.",
        //
        "->",
        //"-<", // T_MINUSLT
        "-<>",
    ],
    brackets: [
        { open: ',(', close: ')', token: 'delimiter.parenthesis' },
        { open: '`(', close: ')', token: 'delimiter.parenthesis' },
        { open: '%(', close: ')', token: 'delimiter.parenthesis' },
        { open: '\'(', close: ')', token: 'delimiter.parenthesis' },
        { open: '\'{', close: '}', token: 'delimiter.parenthesis' },
        { open: '@(', close: ')', token: 'delimiter.parenthesis' },
        { open: '@{', close: '}', token: 'delimiter.brace' },
        { open: '@[', close: ']', token: 'delimiter.square' },
        { open: '#[', close: ']', token: 'delimiter.square' },
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
        { open: '<', close: '>', token: 'delimiter.angle' }
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    IDENTFST: /[a-zA-Z_]/,
    IDENTRST: /[a-zA-Z0-9_'$]/,
    symbolic: /[%&+-./:=@~`^|*!$#?<>]/,
    digit: /[0-9]/,
    digitseq0: /@digit*/,
    xdigit: /[0-9A-Za-z]/,
    xdigitseq0: /@xdigit*/,
    INTSP: /[lLuU]/,
    FLOATSP: /[fFlL]/,
    fexponent: /[eE][+-]?[0-9]+/,
    fexponent_bin: /[pP][+-]?[0-9]+/,
    deciexp: /\.[0-9]*@fexponent?/,
    hexiexp: /\.[0-9a-zA-Z]*@fexponent_bin?/,
    irregular_keywords: /val[+-]?|case[+-]?|addr\@?|fold\@|free\@|fix\@?|lam\@?|llam\@?|prop[+-]?|type[+-]?|view[+-@]?|viewt@?ype[+-]?|t@?ype[+-]?|v(iew)?t@?ype[+-]?|abst@?ype|absv(iew)?t@?ype|for\*?|while\*?/,
    ESCHAR: /[ntvbrfa\\\?'"\(\[\{]/,
    start: 'root',
    // The main tokenizer for ATS/Postiats
    // reference: https://github.com/githwxi/ATS-Postiats/blob/master/src/pats_lexing.dats
    tokenizer: {
        root: [
            // lexing_blankseq0
            { regex: /[ \t\r\n]+/, action: { token: '' } },
            // NOTE: (*) is an invalid ML-like comment!
            { regex: /\(\*\)/, action: { token: 'invalid' } },
            { regex: /\(\*/, action: { token: 'comment', next: 'lexing_COMMENT_block_ml' } },
            { regex: /\(/, action: '@brackets' /*{ token: 'delimiter.parenthesis' }*/ },
            { regex: /\)/, action: '@brackets' /*{ token: 'delimiter.parenthesis' }*/ },
            { regex: /\[/, action: '@brackets' /*{ token: 'delimiter.bracket' }*/ },
            { regex: /\]/, action: '@brackets' /*{ token: 'delimiter.bracket' }*/ },
            { regex: /\{/, action: '@brackets' /*{ token: 'delimiter.brace' }*/ },
            { regex: /\}/, action: '@brackets' /*{ token: 'delimiter.brace' }*/ },
            // lexing_COMMA
            { regex: /,\(/, action: '@brackets' /*{ token: 'delimiter.parenthesis' }*/ },
            { regex: /,/, action: { token: 'delimiter.comma' } },
            { regex: /;/, action: { token: 'delimiter.semicolon' } },
            // lexing_AT
            { regex: /@\(/, action: '@brackets' /* { token: 'delimiter.parenthesis' }*/ },
            { regex: /@\[/, action: '@brackets' /* { token: 'delimiter.bracket' }*/ },
            { regex: /@\{/, action: '@brackets' /*{ token: 'delimiter.brace' }*/ },
            // lexing_COLON
            { regex: /:</, action: { token: 'keyword', next: '@lexing_EFFECT_commaseq0' } },
            /*
            lexing_DOT:

            . // SYMBOLIC => lexing_IDENT_sym
            . FLOATDOT => lexing_FLOAT_deciexp
            . DIGIT => T_DOTINT
            */
            { regex: /\.@symbolic+/, action: { token: 'identifier.sym' } },
            // FLOATDOT case
            { regex: /\.@digit*@fexponent@FLOATSP*/, action: { token: 'number.float' } },
            { regex: /\.@digit+/, action: { token: 'number.float' } },
            // lexing_DOLLAR:
            // '$' IDENTFST IDENTRST* => lexing_IDENT_dlr, _ => lexing_IDENT_sym
            {
                regex: /\$@IDENTFST@IDENTRST*/,
                action: {
                    cases: {
                        '@keywords_dlr': { token: 'keyword.dlr' },
                        '@default': { token: 'namespace' },
                    }
                }
            },
            // lexing_SHARP:
            // '#' IDENTFST IDENTRST* => lexing_ident_srp, _ => lexing_IDENT_sym
            {
                regex: /\#@IDENTFST@IDENTRST*/,
                action: {
                    cases: {
                        '@keywords_srp': { token: 'keyword.srp' },
                        '@default': { token: 'identifier' },
                    }
                }
            },
            // lexing_PERCENT:
            { regex: /%\(/, action: { token: 'delimiter.parenthesis' } },
            { regex: /^%{(#|\^|\$)?/, action: { token: 'keyword', next: '@lexing_EXTCODE', nextEmbedded: 'text/javascript' } },
            { regex: /^%}/, action: { token: 'keyword' } },
            // lexing_QUOTE
            { regex: /'\(/, action: { token: 'delimiter.parenthesis' } },
            { regex: /'\[/, action: { token: 'delimiter.bracket' } },
            { regex: /'\{/, action: { token: 'delimiter.brace' } },
            [/(')(\\@ESCHAR|\\[xX]@xdigit+|\\@digit+)(')/, ['string', 'string.escape', 'string']],
            [/'[^\\']'/, 'string'],
            // lexing_DQUOTE
            [/"/, 'string.quote', '@lexing_DQUOTE'],
            // lexing_BQUOTE
            { regex: /`\(/, action: '@brackets' /* { token: 'delimiter.parenthesis' }*/ },
            // TODO: otherwise, try lexing_IDENT_sym
            { regex: /\\/, action: { token: 'punctuation' } },
            // lexing_IDENT_alp:
            // NOTE: (?!regex) is syntax for "not-followed-by" regex
            // to resolve ambiguity such as foreach$fwork being incorrectly lexed as [for] [each$fwork]!
            { regex: /@irregular_keywords(?!@IDENTRST)/, action: { token: 'keyword' } },
            {
                regex: /@IDENTFST@IDENTRST*[<!\[]?/,
                action: {
                    cases: {
                        // TODO: dynload and staload should be specially parsed
                        // dynload whitespace+ "special_string"
                        // this special string is really:
                        //  '/' '\\' '.' => punctuation
                        // ({\$)([a-zA-Z_][a-zA-Z_0-9]*)(}) => punctuation,keyword,punctuation
                        // [^"] => identifier/literal
                        '@keywords': { token: 'keyword' },
                        '@keywords_types': { token: 'type' },
                        '@default': { token: 'identifier' }
                    }
                }
            },
            // lexing_IDENT_sym:
            { regex: /\/\/\/\//, action: { token: 'comment', next: '@lexing_COMMENT_rest' } },
            { regex: /\/\/.*$/, action: { token: 'comment' } },
            { regex: /\/\*/, action: { token: 'comment', next: '@lexing_COMMENT_block_c' } },
            // AS-20160627: specifically for effect annotations
            { regex: /-<|=</, action: { token: 'keyword', next: '@lexing_EFFECT_commaseq0' } },
            {
                regex: /@symbolic+/,
                action: {
                    cases: {
                        '@operators': 'keyword',
                        '@default': 'operator'
                    }
                }
            },
            // lexing_ZERO:
            // FIXME: this one is quite messy/unfinished yet
            // TODO: lexing_INT_hex
            // - testing_hexiexp => lexing_FLOAT_hexiexp
            // - testing_fexponent_bin => lexing_FLOAT_hexiexp
            // - testing_intspseq0 => T_INT_hex
            // lexing_INT_hex:
            { regex: /0[xX]@xdigit+(@hexiexp|@fexponent_bin)@FLOATSP*/, action: { token: 'number.float' } },
            { regex: /0[xX]@xdigit+@INTSP*/, action: { token: 'number.hex' } },
            { regex: /0[0-7]+(?![0-9])@INTSP*/, action: { token: 'number.octal' } },
            //{regex: /0/, action: { token: 'number' } }, // INTZERO
            // lexing_INT_dec:
            // - testing_deciexp => lexing_FLOAT_deciexp
            // - testing_fexponent => lexing_FLOAT_deciexp
            // - otherwise => intspseq0 ([0-9]*[lLuU]?)
            { regex: /@digit+(@fexponent|@deciexp)@FLOATSP*/, action: { token: 'number.float' } },
            { regex: /@digit@digitseq0@INTSP*/, action: { token: 'number.decimal' } },
            // DIGIT, if followed by digitseq0, is lexing_INT_dec
            { regex: /@digit+@INTSP*/, action: { token: 'number' } },
        ],
        lexing_COMMENT_block_ml: [
            [/[^\(\*]+/, 'comment'],
            [/\(\*/, 'comment', '@push'],
            [/\(\*/, 'comment.invalid'],
            [/\*\)/, 'comment', '@pop'],
            [/\*/, 'comment']
        ],
        lexing_COMMENT_block_c: [
            [/[^\/*]+/, 'comment'],
            // [/\/\*/, 'comment', '@push' ],    // nested C-style block comments not allowed
            // [/\/\*/,    'comment.invalid' ],	// NOTE: this breaks block comments in the shape of /* //*/
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        lexing_COMMENT_rest: [
            [/$/, 'comment', '@pop'],
            [/.*/, 'comment']
        ],
        // NOTE: added by AS, specifically for highlighting
        lexing_EFFECT_commaseq0: [
            {
                regex: /@IDENTFST@IDENTRST+|@digit+/,
                action: {
                    cases: {
                        '@keywords_effects': { token: 'type.effect' },
                        '@default': { token: 'identifier' }
                    }
                }
            },
            { regex: /,/, action: { token: 'punctuation' } },
            { regex: />/, action: { token: '@rematch', next: '@pop' } },
        ],
        lexing_EXTCODE: [
            { regex: /^%}/, action: { token: '@rematch', next: '@pop', nextEmbedded: '@pop' } },
            { regex: /[^%]+/, action: '' },
        ],
        lexing_DQUOTE: [
            { regex: /"/, action: { token: 'string.quote', next: '@pop' } },
            // AS-20160628: additional hi-lighting for variables in staload/dynload strings
            { regex: /(\{\$)(@IDENTFST@IDENTRST*)(\})/, action: [{ token: 'string.escape' }, { token: 'identifier' }, { token: 'string.escape' }] },
            { regex: /\\$/, action: { token: 'string.escape' } },
            { regex: /\\(@ESCHAR|[xX]@xdigit+|@digit+)/, action: { token: 'string.escape' } },
            { regex: /[^\\"]+/, action: { token: 'string' } }
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Bvc3RpYXRzL3Bvc3RpYXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTtBQUNOO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0EsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyxTQUFTLFlBQVksaUNBQWlDO0FBQy9ELFNBQVMsc0RBQXNEO0FBQy9ELFNBQVMsc0RBQXNEO0FBQy9EO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsdUJBQXVCO0FBQ3JFLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsYUFBYTtBQUNiLGFBQWEsc0JBQXNCLHVCQUF1QixFQUFFO0FBQzVELGFBQWEsc0JBQXNCLGtDQUFrQyxFQUFFO0FBQ3ZFO0FBQ0E7QUFDQSxhQUFhLFlBQVksWUFBWSx3REFBd0QsRUFBRTtBQUMvRixhQUFhLDZCQUE2QjtBQUMxQztBQUNBO0FBQ0EsYUFBYSxzQkFBc0Isc0NBQXNDLEVBQUU7QUFDM0U7QUFDQSxhQUFhLFlBQVksMkJBQTJCLGNBQWMseUJBQXlCLEdBQUcsc0JBQXNCLEdBQUcseUJBQXlCLEdBQUc7QUFDbkosYUFBYSx3QkFBd0IseUJBQXlCLEVBQUU7QUFDaEUsYUFBYSxxREFBcUQseUJBQXlCLEVBQUU7QUFDN0YsYUFBYSw0QkFBNEIsa0JBQWtCO0FBQzNEO0FBQ0EsS0FBSztBQUNMIiwiZmlsZSI6ImpzLzliZTY5ZGY1M2Y5YzQwMWU4YjkxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIEFydHlvbSBTaGFsa2hha292LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKlxuICogIEJhc2VkIG9uIHRoZSBBVFMvUG9zdGlhdHMgbGV4ZXIgYnkgSG9uZ3dlaSBYaS5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnKConLCAnKiknXSxcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbWyd7JywgJ30nXSwgWydbJywgJ10nXSwgWycoJywgJyknXSwgWyc8JywgJz4nXV0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgXVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgdG9rZW5Qb3N0Zml4OiAnLnBhdHMnLFxuICAgIC8vIFRPRE86IHN0YWxvYWQgYW5kIGR5bmxvYWQgYXJlIGZvbGxvd2VkIGJ5IGEgc3BlY2lhbCBraW5kIG9mIHN0cmluZyBsaXRlcmFsc1xuICAgIC8vIHdpdGggeyRJREVOVElGRVJ9IHZhcmlhYmxlcywgYW5kIGl0IGFsc28gbWF5IG1ha2Ugc2Vuc2UgdG8gaGlnaGxpZ2h0XG4gICAgLy8gdGhlIHB1bmN0dWF0aW9uICguIGFuZCAvIGFuZCBcXCkgZGlmZmVyZW50bHkuXG4gICAgLy8gU2V0IGRlZmF1bHRUb2tlbiB0byBpbnZhbGlkIHRvIHNlZSB3aGF0IHlvdSBkbyBub3QgdG9rZW5pemUgeWV0XG4gICAgZGVmYXVsdFRva2VuOiAnaW52YWxpZCcsXG4gICAgLy8ga2V5d29yZCByZWZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9naXRod3hpL0FUUy1Qb3N0aWF0cy9ibG9iL21hc3Rlci9zcmMvcGF0c19sZXhpbmdfdG9rZW4uZGF0c1xuICAgIGtleXdvcmRzOiBbXG4gICAgICAgIC8vXG4gICAgICAgIFwiYWJzdHlwZVwiLFxuICAgICAgICBcImFic3QweXBlXCIsXG4gICAgICAgIFwiYWJzcHJvcFwiLFxuICAgICAgICBcImFic3ZpZXdcIixcbiAgICAgICAgXCJhYnN2dHlwZVwiLFxuICAgICAgICBcImFic3ZpZXd0eXBlXCIsXG4gICAgICAgIFwiYWJzdnQweXBlXCIsXG4gICAgICAgIFwiYWJzdmlld3QweXBlXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiYXNcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJhbmRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJhc3N1bWVcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJiZWdpblwiLFxuICAgICAgICAvL1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFwiY2FzZVwiLCAvLyBDQVNFXG4gICAgICAgICovXG4gICAgICAgIC8vXG4gICAgICAgIFwiY2xhc3NkZWNcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJkYXRhc29ydFwiLFxuICAgICAgICAvL1xuICAgICAgICBcImRhdGF0eXBlXCIsXG4gICAgICAgIFwiZGF0YXByb3BcIixcbiAgICAgICAgXCJkYXRhdmlld1wiLFxuICAgICAgICBcImRhdGF2dHlwZVwiLFxuICAgICAgICBcImRhdGF2aWV3dHlwZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcImRvXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiZW5kXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiZXh0ZXJuXCIsXG4gICAgICAgIFwiZXh0eXBlXCIsXG4gICAgICAgIFwiZXh0dmFyXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiZXhjZXB0aW9uXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiZm5cIixcbiAgICAgICAgXCJmbnhcIixcbiAgICAgICAgXCJmdW5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJwcmZuXCIsXG4gICAgICAgIFwicHJmdW5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJwcmF4aVwiLFxuICAgICAgICBcImNhc3RmblwiLFxuICAgICAgICAvL1xuICAgICAgICBcImlmXCIsXG4gICAgICAgIFwidGhlblwiLFxuICAgICAgICBcImVsc2VcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJpZmNhc2VcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJpblwiLFxuICAgICAgICAvL1xuICAgICAgICBcImluZml4XCIsXG4gICAgICAgIFwiaW5maXhsXCIsXG4gICAgICAgIFwiaW5maXhyXCIsXG4gICAgICAgIFwicHJlZml4XCIsXG4gICAgICAgIFwicG9zdGZpeFwiLFxuICAgICAgICAvL1xuICAgICAgICBcImltcGxtbnRcIixcbiAgICAgICAgXCJpbXBsZW1lbnRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJwcmltcGxtbnRcIixcbiAgICAgICAgXCJwcmltcGxlbWVudFwiLFxuICAgICAgICAvL1xuICAgICAgICBcImltcG9ydFwiLFxuICAgICAgICAvL1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFwibGFtXCIsIC8vIExBTVxuICAgICAgICAgICAgICAgIFwibGxhbVwiLCAvLyBMTEFNXG4gICAgICAgICAgICAgICAgXCJmaXhcIiwgLy8gRklYXG4gICAgICAgICovXG4gICAgICAgIC8vXG4gICAgICAgIFwibGV0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwibG9jYWxcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJtYWNkZWZcIixcbiAgICAgICAgXCJtYWNyb2RlZlwiLFxuICAgICAgICAvL1xuICAgICAgICBcIm5vbmZpeFwiLFxuICAgICAgICAvL1xuICAgICAgICBcInN5bWVsaW1cIixcbiAgICAgICAgXCJzeW1pbnRyXCIsXG4gICAgICAgIFwib3ZlcmxvYWRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJvZlwiLFxuICAgICAgICBcIm9wXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwicmVjXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwic2lmXCIsXG4gICAgICAgIFwic2Nhc2VcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJzb3J0ZGVmXCIsXG4gICAgICAgIC8qXG4gICAgICAgIC8vIEhYOiBbc3RhXSBpcyBub3cgZGVwcmVjYXRlZFxuICAgICAgICAqL1xuICAgICAgICBcInN0YVwiLFxuICAgICAgICBcInN0YWNzdFwiLFxuICAgICAgICBcInN0YWRlZlwiLFxuICAgICAgICBcInN0YXRpY1wiLFxuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFwic3RhdmFyXCIsIC8vIFRfU1RBVkFSXG4gICAgICAgICovXG4gICAgICAgIC8vXG4gICAgICAgIFwic3RhbG9hZFwiLFxuICAgICAgICBcImR5bmxvYWRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJ0cnlcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJ0a2luZGVmXCIsXG4gICAgICAgIC8vXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIsIC8vIFRZUEVcbiAgICAgICAgKi9cbiAgICAgICAgXCJ0eXBlZGVmXCIsXG4gICAgICAgIFwicHJvcGRlZlwiLFxuICAgICAgICBcInZpZXdkZWZcIixcbiAgICAgICAgXCJ2dHlwZWRlZlwiLFxuICAgICAgICBcInZpZXd0eXBlZGVmXCIsXG4gICAgICAgIC8vXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgXCJ2YWxcIiwgLy8gVkFMXG4gICAgICAgICovXG4gICAgICAgIFwicHJ2YWxcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCJ2YXJcIixcbiAgICAgICAgXCJwcnZhclwiLFxuICAgICAgICAvL1xuICAgICAgICBcIndoZW5cIixcbiAgICAgICAgXCJ3aGVyZVwiLFxuICAgICAgICAvL1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFwiZm9yXCIsIC8vIFRfRk9SXG4gICAgICAgICAgICAgICAgXCJ3aGlsZVwiLCAvLyBUX1dISUxFXG4gICAgICAgICovXG4gICAgICAgIC8vXG4gICAgICAgIFwid2l0aFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIndpdGh0eXBlXCIsXG4gICAgICAgIFwid2l0aHByb3BcIixcbiAgICAgICAgXCJ3aXRodmlld1wiLFxuICAgICAgICBcIndpdGh2dHlwZVwiLFxuICAgICAgICBcIndpdGh2aWV3dHlwZVwiLFxuICAgIF0sXG4gICAga2V5d29yZHNfZGxyOiBbXG4gICAgICAgIFwiJGRlbGF5XCIsXG4gICAgICAgIFwiJGxkZWxheVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRhcnJwc3pcIixcbiAgICAgICAgXCIkYXJycHRyc2l6ZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiRkMmN0eXBlXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJGVmZm1hc2tcIixcbiAgICAgICAgXCIkZWZmbWFza19udG1cIixcbiAgICAgICAgXCIkZWZmbWFza19leG5cIixcbiAgICAgICAgXCIkZWZmbWFza19yZWZcIixcbiAgICAgICAgXCIkZWZmbWFza193cnRcIixcbiAgICAgICAgXCIkZWZmbWFza19hbGxcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkZXh0ZXJuXCIsXG4gICAgICAgIFwiJGV4dGtpbmRcIixcbiAgICAgICAgXCIkZXh0eXBlXCIsXG4gICAgICAgIFwiJGV4dHlwZV9zdHJ1Y3RcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkZXh0dmFsXCIsXG4gICAgICAgIFwiJGV4dGZjYWxsXCIsXG4gICAgICAgIFwiJGV4dG1jYWxsXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJGxpdGVyYWxcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkbXlmaWxlbmFtZVwiLFxuICAgICAgICBcIiRteWxvY2F0aW9uXCIsXG4gICAgICAgIFwiJG15ZnVuY3Rpb25cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkbHN0XCIsXG4gICAgICAgIFwiJGxzdF90XCIsXG4gICAgICAgIFwiJGxzdF92dFwiLFxuICAgICAgICBcIiRsaXN0XCIsXG4gICAgICAgIFwiJGxpc3RfdFwiLFxuICAgICAgICBcIiRsaXN0X3Z0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiJHJlY1wiLFxuICAgICAgICBcIiRyZWNfdFwiLFxuICAgICAgICBcIiRyZWNfdnRcIixcbiAgICAgICAgXCIkcmVjb3JkXCIsXG4gICAgICAgIFwiJHJlY29yZF90XCIsXG4gICAgICAgIFwiJHJlY29yZF92dFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiR0dXBcIixcbiAgICAgICAgXCIkdHVwX3RcIixcbiAgICAgICAgXCIkdHVwX3Z0XCIsXG4gICAgICAgIFwiJHR1cGxlXCIsXG4gICAgICAgIFwiJHR1cGxlX3RcIixcbiAgICAgICAgXCIkdHVwbGVfdnRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkYnJlYWtcIixcbiAgICAgICAgXCIkY29udGludWVcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkcmFpc2VcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkc2hvd3R5cGVcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkdmNvcHllbnZfdlwiLFxuICAgICAgICBcIiR2Y29weWVudl92dFwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiR0ZW1wZW52ZXJcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIkc29sdmVyX2Fzc2VydFwiLFxuICAgICAgICBcIiRzb2x2ZXJfdmVyaWZ5XCIsXG4gICAgXSxcbiAgICBrZXl3b3Jkc19zcnA6IFtcbiAgICAgICAgLy9cbiAgICAgICAgXCIjaWZcIixcbiAgICAgICAgXCIjaWZkZWZcIixcbiAgICAgICAgXCIjaWZuZGVmXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiI3RoZW5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjZWxpZlwiLFxuICAgICAgICBcIiNlbGlmZGVmXCIsXG4gICAgICAgIFwiI2VsaWZuZGVmXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiI2Vsc2VcIixcbiAgICAgICAgXCIjZW5kaWZcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjZXJyb3JcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjcHJlcnJcIixcbiAgICAgICAgXCIjcHJpbnRcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjYXNzZXJ0XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiI3VuZGVmXCIsXG4gICAgICAgIFwiI2RlZmluZVwiLFxuICAgICAgICAvL1xuICAgICAgICBcIiNpbmNsdWRlXCIsXG4gICAgICAgIFwiI3JlcXVpcmVcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIjcHJhZ21hXCIsXG4gICAgICAgIFwiI2NvZGVnZW4yXCIsXG4gICAgICAgIFwiI2NvZGVnZW4zXCIsXG4gICAgXSxcbiAgICBpcnJlZ3VsYXJfa2V5d29yZF9saXN0OiBbXG4gICAgICAgIFwidmFsK1wiLFxuICAgICAgICBcInZhbC1cIixcbiAgICAgICAgXCJ2YWxcIixcbiAgICAgICAgXCJjYXNlK1wiLFxuICAgICAgICBcImNhc2UtXCIsXG4gICAgICAgIFwiY2FzZVwiLFxuICAgICAgICBcImFkZHJAXCIsXG4gICAgICAgIFwiYWRkclwiLFxuICAgICAgICBcImZvbGRAXCIsXG4gICAgICAgIFwiZnJlZUBcIixcbiAgICAgICAgXCJmaXhAXCIsXG4gICAgICAgIFwiZml4XCIsXG4gICAgICAgIFwibGFtQFwiLFxuICAgICAgICBcImxhbVwiLFxuICAgICAgICBcImxsYW1AXCIsXG4gICAgICAgIFwibGxhbVwiLFxuICAgICAgICBcInZpZXd0QHlwZStcIixcbiAgICAgICAgXCJ2aWV3dEB5cGUtXCIsXG4gICAgICAgIFwidmlld3RAeXBlXCIsXG4gICAgICAgIFwidmlld3R5cGUrXCIsXG4gICAgICAgIFwidmlld3R5cGUtXCIsXG4gICAgICAgIFwidmlld3R5cGVcIixcbiAgICAgICAgXCJ2aWV3K1wiLFxuICAgICAgICBcInZpZXctXCIsXG4gICAgICAgIFwidmlld0BcIixcbiAgICAgICAgXCJ2aWV3XCIsXG4gICAgICAgIFwidHlwZStcIixcbiAgICAgICAgXCJ0eXBlLVwiLFxuICAgICAgICBcInR5cGVcIixcbiAgICAgICAgXCJ2dHlwZStcIixcbiAgICAgICAgXCJ2dHlwZS1cIixcbiAgICAgICAgXCJ2dHlwZVwiLFxuICAgICAgICBcInZ0QHlwZStcIixcbiAgICAgICAgXCJ2dEB5cGUtXCIsXG4gICAgICAgIFwidnRAeXBlXCIsXG4gICAgICAgIFwidmlld3RAeXBlK1wiLFxuICAgICAgICBcInZpZXd0QHlwZS1cIixcbiAgICAgICAgXCJ2aWV3dEB5cGVcIixcbiAgICAgICAgXCJ2aWV3dHlwZStcIixcbiAgICAgICAgXCJ2aWV3dHlwZS1cIixcbiAgICAgICAgXCJ2aWV3dHlwZVwiLFxuICAgICAgICBcInByb3ArXCIsXG4gICAgICAgIFwicHJvcC1cIixcbiAgICAgICAgXCJwcm9wXCIsXG4gICAgICAgIFwidHlwZStcIixcbiAgICAgICAgXCJ0eXBlLVwiLFxuICAgICAgICBcInR5cGVcIixcbiAgICAgICAgXCJ0QHlwZVwiLFxuICAgICAgICBcInRAeXBlK1wiLFxuICAgICAgICBcInRAeXBlLVwiLFxuICAgICAgICBcImFic3RAeXBlXCIsXG4gICAgICAgIFwiYWJzdHlwZVwiLFxuICAgICAgICBcImFic3ZpZXd0QHlwZVwiLFxuICAgICAgICBcImFic3Z0QHlwZVwiLFxuICAgICAgICBcImZvcipcIixcbiAgICAgICAgXCJmb3JcIixcbiAgICAgICAgXCJ3aGlsZSpcIixcbiAgICAgICAgXCJ3aGlsZVwiXG4gICAgXSxcbiAgICBrZXl3b3Jkc190eXBlczogW1xuICAgICAgICAnYm9vbCcsXG4gICAgICAgICdkb3VibGUnLFxuICAgICAgICAnYnl0ZScsXG4gICAgICAgICdpbnQnLFxuICAgICAgICAnc2hvcnQnLFxuICAgICAgICAnY2hhcicsXG4gICAgICAgICd2b2lkJyxcbiAgICAgICAgJ3VuaXQnLFxuICAgICAgICAnbG9uZycsXG4gICAgICAgICdmbG9hdCcsXG4gICAgICAgICdzdHJpbmcnLFxuICAgICAgICAnc3RycHRyJ1xuICAgIF0sXG4gICAgLy8gVE9ETzogcmVmZXJlbmNlIGZvciB0aGlzP1xuICAgIGtleXdvcmRzX2VmZmVjdHM6IFtcbiAgICAgICAgXCIwXCIsXG4gICAgICAgIFwiZnVuXCIsXG4gICAgICAgIFwiY2xvXCIsXG4gICAgICAgIFwicHJmXCIsXG4gICAgICAgIFwiZnVuY2xvXCIsXG4gICAgICAgIFwiY2xvcHRyXCIsXG4gICAgICAgIFwiY2xvcmVmXCIsXG4gICAgICAgIFwicmVmXCIsXG4gICAgICAgIFwibnRtXCIsXG4gICAgICAgIFwiMVwiIC8vIGFsbCBlZmZlY3RzXG4gICAgXSxcbiAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgXCJAXCIsXG4gICAgICAgIFwiIVwiLFxuICAgICAgICBcInxcIixcbiAgICAgICAgXCJgXCIsXG4gICAgICAgIFwiOlwiLFxuICAgICAgICBcIiRcIixcbiAgICAgICAgXCIuXCIsXG4gICAgICAgIFwiPVwiLFxuICAgICAgICBcIiNcIixcbiAgICAgICAgXCJ+XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiLi5cIixcbiAgICAgICAgXCIuLi5cIixcbiAgICAgICAgLy9cbiAgICAgICAgXCI9PlwiLFxuICAgICAgICAvLyBcIj08XCIsIC8vIFRfRVFMVFxuICAgICAgICBcIj08PlwiLFxuICAgICAgICBcIj0vPT5cIixcbiAgICAgICAgXCI9Pj5cIixcbiAgICAgICAgXCI9Lz0+PlwiLFxuICAgICAgICAvL1xuICAgICAgICBcIjxcIixcbiAgICAgICAgXCI+XCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiPjxcIixcbiAgICAgICAgLy9cbiAgICAgICAgXCIuPFwiLFxuICAgICAgICBcIj4uXCIsXG4gICAgICAgIC8vXG4gICAgICAgIFwiLjw+LlwiLFxuICAgICAgICAvL1xuICAgICAgICBcIi0+XCIsXG4gICAgICAgIC8vXCItPFwiLCAvLyBUX01JTlVTTFRcbiAgICAgICAgXCItPD5cIixcbiAgICBdLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgb3BlbjogJywoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJ2AoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJyUoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJygnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwneycsIGNsb3NlOiAnfScsIHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9LFxuICAgICAgICB7IG9wZW46ICdAKCcsIGNsb3NlOiAnKScsIHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9LFxuICAgICAgICB7IG9wZW46ICdAeycsIGNsb3NlOiAnfScsIHRva2VuOiAnZGVsaW1pdGVyLmJyYWNlJyB9LFxuICAgICAgICB7IG9wZW46ICdAWycsIGNsb3NlOiAnXScsIHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScgfSxcbiAgICAgICAgeyBvcGVuOiAnI1snLCBjbG9zZTogJ10nLCB0b2tlbjogJ2RlbGltaXRlci5zcXVhcmUnIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCB0b2tlbjogJ2RlbGltaXRlci5jdXJseScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScsIHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9LFxuICAgICAgICB7IG9wZW46ICc8JywgY2xvc2U6ICc+JywgdG9rZW46ICdkZWxpbWl0ZXIuYW5nbGUnIH1cbiAgICBdLFxuICAgIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFwvXFxeJV0rLyxcbiAgICBJREVOVEZTVDogL1thLXpBLVpfXS8sXG4gICAgSURFTlRSU1Q6IC9bYS16QS1aMC05XyckXS8sXG4gICAgc3ltYm9saWM6IC9bJSYrLS4vOj1AfmBefCohJCM/PD5dLyxcbiAgICBkaWdpdDogL1swLTldLyxcbiAgICBkaWdpdHNlcTA6IC9AZGlnaXQqLyxcbiAgICB4ZGlnaXQ6IC9bMC05QS1aYS16XS8sXG4gICAgeGRpZ2l0c2VxMDogL0B4ZGlnaXQqLyxcbiAgICBJTlRTUDogL1tsTHVVXS8sXG4gICAgRkxPQVRTUDogL1tmRmxMXS8sXG4gICAgZmV4cG9uZW50OiAvW2VFXVsrLV0/WzAtOV0rLyxcbiAgICBmZXhwb25lbnRfYmluOiAvW3BQXVsrLV0/WzAtOV0rLyxcbiAgICBkZWNpZXhwOiAvXFwuWzAtOV0qQGZleHBvbmVudD8vLFxuICAgIGhleGlleHA6IC9cXC5bMC05YS16QS1aXSpAZmV4cG9uZW50X2Jpbj8vLFxuICAgIGlycmVndWxhcl9rZXl3b3JkczogL3ZhbFsrLV0/fGNhc2VbKy1dP3xhZGRyXFxAP3xmb2xkXFxAfGZyZWVcXEB8Zml4XFxAP3xsYW1cXEA/fGxsYW1cXEA/fHByb3BbKy1dP3x0eXBlWystXT98dmlld1srLUBdP3x2aWV3dEA/eXBlWystXT98dEA/eXBlWystXT98dihpZXcpP3RAP3lwZVsrLV0/fGFic3RAP3lwZXxhYnN2KGlldyk/dEA/eXBlfGZvclxcKj98d2hpbGVcXCo/LyxcbiAgICBFU0NIQVI6IC9bbnR2YnJmYVxcXFxcXD8nXCJcXChcXFtcXHtdLyxcbiAgICBzdGFydDogJ3Jvb3QnLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3IgQVRTL1Bvc3RpYXRzXG4gICAgLy8gcmVmZXJlbmNlOiBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHd4aS9BVFMtUG9zdGlhdHMvYmxvYi9tYXN0ZXIvc3JjL3BhdHNfbGV4aW5nLmRhdHNcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgLy8gbGV4aW5nX2JsYW5rc2VxMFxuICAgICAgICAgICAgeyByZWdleDogL1sgXFx0XFxyXFxuXSsvLCBhY3Rpb246IHsgdG9rZW46ICcnIH0gfSxcbiAgICAgICAgICAgIC8vIE5PVEU6ICgqKSBpcyBhbiBpbnZhbGlkIE1MLWxpa2UgY29tbWVudCFcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXChcXCpcXCkvLCBhY3Rpb246IHsgdG9rZW46ICdpbnZhbGlkJyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwoXFwqLywgYWN0aW9uOiB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdsZXhpbmdfQ09NTUVOVF9ibG9ja19tbCcgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogL1xcKC8sIGFjdGlvbjogJ0BicmFja2V0cycgLyp7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9Ki8gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXCkvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSovIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFxbLywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKnsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcgfSovIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFxdLywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKnsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcgfSovIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFx7LywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKnsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2UnIH0qLyB9LFxuICAgICAgICAgICAgeyByZWdleDogL1xcfS8sIGFjdGlvbjogJ0BicmFja2V0cycgLyp7IHRva2VuOiAnZGVsaW1pdGVyLmJyYWNlJyB9Ki8gfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19DT01NQVxuICAgICAgICAgICAgeyByZWdleDogLyxcXCgvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSovIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvLC8sIGFjdGlvbjogeyB0b2tlbjogJ2RlbGltaXRlci5jb21tYScgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogLzsvLCBhY3Rpb246IHsgdG9rZW46ICdkZWxpbWl0ZXIuc2VtaWNvbG9uJyB9IH0sXG4gICAgICAgICAgICAvLyBsZXhpbmdfQVRcbiAgICAgICAgICAgIHsgcmVnZXg6IC9AXFwoLywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKiB7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9Ki8gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9AXFxbLywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKiB7IHRva2VuOiAnZGVsaW1pdGVyLmJyYWNrZXQnIH0qLyB9LFxuICAgICAgICAgICAgeyByZWdleDogL0BcXHsvLCBhY3Rpb246ICdAYnJhY2tldHMnIC8qeyB0b2tlbjogJ2RlbGltaXRlci5icmFjZScgfSovIH0sXG4gICAgICAgICAgICAvLyBsZXhpbmdfQ09MT05cbiAgICAgICAgICAgIHsgcmVnZXg6IC86PC8sIGFjdGlvbjogeyB0b2tlbjogJ2tleXdvcmQnLCBuZXh0OiAnQGxleGluZ19FRkZFQ1RfY29tbWFzZXEwJyB9IH0sXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgbGV4aW5nX0RPVDpcblxuICAgICAgICAgICAgLiAvLyBTWU1CT0xJQyA9PiBsZXhpbmdfSURFTlRfc3ltXG4gICAgICAgICAgICAuIEZMT0FURE9UID0+IGxleGluZ19GTE9BVF9kZWNpZXhwXG4gICAgICAgICAgICAuIERJR0lUID0+IFRfRE9USU5UXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgeyByZWdleDogL1xcLkBzeW1ib2xpYysvLCBhY3Rpb246IHsgdG9rZW46ICdpZGVudGlmaWVyLnN5bScgfSB9LFxuICAgICAgICAgICAgLy8gRkxPQVRET1QgY2FzZVxuICAgICAgICAgICAgeyByZWdleDogL1xcLkBkaWdpdCpAZmV4cG9uZW50QEZMT0FUU1AqLywgYWN0aW9uOiB7IHRva2VuOiAnbnVtYmVyLmZsb2F0JyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwuQGRpZ2l0Ky8sIGFjdGlvbjogeyB0b2tlbjogJ251bWJlci5mbG9hdCcgfSB9LFxuICAgICAgICAgICAgLy8gbGV4aW5nX0RPTExBUjpcbiAgICAgICAgICAgIC8vICckJyBJREVOVEZTVCBJREVOVFJTVCogPT4gbGV4aW5nX0lERU5UX2RsciwgXyA9PiBsZXhpbmdfSURFTlRfc3ltXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCRASURFTlRGU1RASURFTlRSU1QqLyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHNfZGxyJzogeyB0b2tlbjogJ2tleXdvcmQuZGxyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ25hbWVzcGFjZScgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBsZXhpbmdfU0hBUlA6XG4gICAgICAgICAgICAvLyAnIycgSURFTlRGU1QgSURFTlRSU1QqID0+IGxleGluZ19pZGVudF9zcnAsIF8gPT4gbGV4aW5nX0lERU5UX3N5bVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwjQElERU5URlNUQElERU5UUlNUKi8sXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzX3NycCc6IHsgdG9rZW46ICdrZXl3b3JkLnNycCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46ICdpZGVudGlmaWVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19QRVJDRU5UOlxuICAgICAgICAgICAgeyByZWdleDogLyVcXCgvLCBhY3Rpb246IHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9eJXsoI3xcXF58XFwkKT8vLCBhY3Rpb246IHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BsZXhpbmdfRVhUQ09ERScsIG5leHRFbWJlZGRlZDogJ3RleHQvamF2YXNjcmlwdCcgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogL14lfS8sIGFjdGlvbjogeyB0b2tlbjogJ2tleXdvcmQnIH0gfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19RVU9URVxuICAgICAgICAgICAgeyByZWdleDogLydcXCgvLCBhY3Rpb246IHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8nXFxbLywgYWN0aW9uOiB7IHRva2VuOiAnZGVsaW1pdGVyLmJyYWNrZXQnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8nXFx7LywgYWN0aW9uOiB7IHRva2VuOiAnZGVsaW1pdGVyLmJyYWNlJyB9IH0sXG4gICAgICAgICAgICBbLygnKShcXFxcQEVTQ0hBUnxcXFxcW3hYXUB4ZGlnaXQrfFxcXFxAZGlnaXQrKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgICAgICAgWy8nW15cXFxcJ10nLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgLy8gbGV4aW5nX0RRVU9URVxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcucXVvdGUnLCAnQGxleGluZ19EUVVPVEUnXSxcbiAgICAgICAgICAgIC8vIGxleGluZ19CUVVPVEVcbiAgICAgICAgICAgIHsgcmVnZXg6IC9gXFwoLywgYWN0aW9uOiAnQGJyYWNrZXRzJyAvKiB7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9Ki8gfSxcbiAgICAgICAgICAgIC8vIFRPRE86IG90aGVyd2lzZSwgdHJ5IGxleGluZ19JREVOVF9zeW1cbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXFxcLywgYWN0aW9uOiB7IHRva2VuOiAncHVuY3R1YXRpb24nIH0gfSxcbiAgICAgICAgICAgIC8vIGxleGluZ19JREVOVF9hbHA6XG4gICAgICAgICAgICAvLyBOT1RFOiAoPyFyZWdleCkgaXMgc3ludGF4IGZvciBcIm5vdC1mb2xsb3dlZC1ieVwiIHJlZ2V4XG4gICAgICAgICAgICAvLyB0byByZXNvbHZlIGFtYmlndWl0eSBzdWNoIGFzIGZvcmVhY2gkZndvcmsgYmVpbmcgaW5jb3JyZWN0bHkgbGV4ZWQgYXMgW2Zvcl0gW2VhY2gkZndvcmtdIVxuICAgICAgICAgICAgeyByZWdleDogL0BpcnJlZ3VsYXJfa2V5d29yZHMoPyFASURFTlRSU1QpLywgYWN0aW9uOiB7IHRva2VuOiAna2V5d29yZCcgfSB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvQElERU5URlNUQElERU5UUlNUKls8IVxcW10/LyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGR5bmxvYWQgYW5kIHN0YWxvYWQgc2hvdWxkIGJlIHNwZWNpYWxseSBwYXJzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGR5bmxvYWQgd2hpdGVzcGFjZSsgXCJzcGVjaWFsX3N0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHNwZWNpYWwgc3RyaW5nIGlzIHJlYWxseTpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAnLycgJ1xcXFwnICcuJyA9PiBwdW5jdHVhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKHtcXCQpKFthLXpBLVpfXVthLXpBLVpfMC05XSopKH0pID0+IHB1bmN0dWF0aW9uLGtleXdvcmQscHVuY3R1YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFteXCJdID0+IGlkZW50aWZpZXIvbGl0ZXJhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6IHsgdG9rZW46ICdrZXl3b3JkJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkc190eXBlcyc6IHsgdG9rZW46ICd0eXBlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ2lkZW50aWZpZXInIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBsZXhpbmdfSURFTlRfc3ltOlxuICAgICAgICAgICAgeyByZWdleDogL1xcL1xcL1xcL1xcLy8sIGFjdGlvbjogeyB0b2tlbjogJ2NvbW1lbnQnLCBuZXh0OiAnQGxleGluZ19DT01NRU5UX3Jlc3QnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cXC9cXC8uKiQvLCBhY3Rpb246IHsgdG9rZW46ICdjb21tZW50JyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFwvXFwqLywgYWN0aW9uOiB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdAbGV4aW5nX0NPTU1FTlRfYmxvY2tfYycgfSB9LFxuICAgICAgICAgICAgLy8gQVMtMjAxNjA2Mjc6IHNwZWNpZmljYWxseSBmb3IgZWZmZWN0IGFubm90YXRpb25zXG4gICAgICAgICAgICB7IHJlZ2V4OiAvLTx8PTwvLCBhY3Rpb246IHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BsZXhpbmdfRUZGRUNUX2NvbW1hc2VxMCcgfSB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvQHN5bWJvbGljKy8sXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdvcGVyYXRvcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBsZXhpbmdfWkVSTzpcbiAgICAgICAgICAgIC8vIEZJWE1FOiB0aGlzIG9uZSBpcyBxdWl0ZSBtZXNzeS91bmZpbmlzaGVkIHlldFxuICAgICAgICAgICAgLy8gVE9ETzogbGV4aW5nX0lOVF9oZXhcbiAgICAgICAgICAgIC8vIC0gdGVzdGluZ19oZXhpZXhwID0+IGxleGluZ19GTE9BVF9oZXhpZXhwXG4gICAgICAgICAgICAvLyAtIHRlc3RpbmdfZmV4cG9uZW50X2JpbiA9PiBsZXhpbmdfRkxPQVRfaGV4aWV4cFxuICAgICAgICAgICAgLy8gLSB0ZXN0aW5nX2ludHNwc2VxMCA9PiBUX0lOVF9oZXhcbiAgICAgICAgICAgIC8vIGxleGluZ19JTlRfaGV4OlxuICAgICAgICAgICAgeyByZWdleDogLzBbeFhdQHhkaWdpdCsoQGhleGlleHB8QGZleHBvbmVudF9iaW4pQEZMT0FUU1AqLywgYWN0aW9uOiB7IHRva2VuOiAnbnVtYmVyLmZsb2F0JyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvMFt4WF1AeGRpZ2l0K0BJTlRTUCovLCBhY3Rpb246IHsgdG9rZW46ICdudW1iZXIuaGV4JyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvMFswLTddKyg/IVswLTldKUBJTlRTUCovLCBhY3Rpb246IHsgdG9rZW46ICdudW1iZXIub2N0YWwnIH0gfSxcbiAgICAgICAgICAgIC8ve3JlZ2V4OiAvMC8sIGFjdGlvbjogeyB0b2tlbjogJ251bWJlcicgfSB9LCAvLyBJTlRaRVJPXG4gICAgICAgICAgICAvLyBsZXhpbmdfSU5UX2RlYzpcbiAgICAgICAgICAgIC8vIC0gdGVzdGluZ19kZWNpZXhwID0+IGxleGluZ19GTE9BVF9kZWNpZXhwXG4gICAgICAgICAgICAvLyAtIHRlc3RpbmdfZmV4cG9uZW50ID0+IGxleGluZ19GTE9BVF9kZWNpZXhwXG4gICAgICAgICAgICAvLyAtIG90aGVyd2lzZSA9PiBpbnRzcHNlcTAgKFswLTldKltsTHVVXT8pXG4gICAgICAgICAgICB7IHJlZ2V4OiAvQGRpZ2l0KyhAZmV4cG9uZW50fEBkZWNpZXhwKUBGTE9BVFNQKi8sIGFjdGlvbjogeyB0b2tlbjogJ251bWJlci5mbG9hdCcgfSB9LFxuICAgICAgICAgICAgeyByZWdleDogL0BkaWdpdEBkaWdpdHNlcTBASU5UU1AqLywgYWN0aW9uOiB7IHRva2VuOiAnbnVtYmVyLmRlY2ltYWwnIH0gfSxcbiAgICAgICAgICAgIC8vIERJR0lULCBpZiBmb2xsb3dlZCBieSBkaWdpdHNlcTAsIGlzIGxleGluZ19JTlRfZGVjXG4gICAgICAgICAgICB7IHJlZ2V4OiAvQGRpZ2l0K0BJTlRTUCovLCBhY3Rpb246IHsgdG9rZW46ICdudW1iZXInIH0gfSxcbiAgICAgICAgXSxcbiAgICAgICAgbGV4aW5nX0NPTU1FTlRfYmxvY2tfbWw6IFtcbiAgICAgICAgICAgIFsvW15cXChcXCpdKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcKFxcKi8sICdjb21tZW50JywgJ0BwdXNoJ10sXG4gICAgICAgICAgICBbL1xcKFxcKi8sICdjb21tZW50LmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXFwqXFwpLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9cXCovLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIGxleGluZ19DT01NRU5UX2Jsb2NrX2M6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgLy8gWy9cXC9cXCovLCAnY29tbWVudCcsICdAcHVzaCcgXSwgICAgLy8gbmVzdGVkIEMtc3R5bGUgYmxvY2sgY29tbWVudHMgbm90IGFsbG93ZWRcbiAgICAgICAgICAgIC8vIFsvXFwvXFwqLywgICAgJ2NvbW1lbnQuaW52YWxpZCcgXSxcdC8vIE5PVEU6IHRoaXMgYnJlYWtzIGJsb2NrIGNvbW1lbnRzIGluIHRoZSBzaGFwZSBvZiAvKiAvLyovXG4gICAgICAgICAgICBbL1xcKlxcLy8sICdjb21tZW50JywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcLypdLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICBsZXhpbmdfQ09NTUVOVF9yZXN0OiBbXG4gICAgICAgICAgICBbLyQvLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbLy4qLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICAvLyBOT1RFOiBhZGRlZCBieSBBUywgc3BlY2lmaWNhbGx5IGZvciBoaWdobGlnaHRpbmdcbiAgICAgICAgbGV4aW5nX0VGRkVDVF9jb21tYXNlcTA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWdleDogL0BJREVOVEZTVEBJREVOVFJTVCt8QGRpZ2l0Ky8sXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzX2VmZmVjdHMnOiB7IHRva2VuOiAndHlwZS5lZmZlY3QnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiAnaWRlbnRpZmllcicgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8sLywgYWN0aW9uOiB7IHRva2VuOiAncHVuY3R1YXRpb24nIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC8+LywgYWN0aW9uOiB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfSB9LFxuICAgICAgICBdLFxuICAgICAgICBsZXhpbmdfRVhUQ09ERTogW1xuICAgICAgICAgICAgeyByZWdleDogL14lfS8sIGFjdGlvbjogeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvW14lXSsvLCBhY3Rpb246ICcnIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGxleGluZ19EUVVPVEU6IFtcbiAgICAgICAgICAgIHsgcmVnZXg6IC9cIi8sIGFjdGlvbjogeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIG5leHQ6ICdAcG9wJyB9IH0sXG4gICAgICAgICAgICAvLyBBUy0yMDE2MDYyODogYWRkaXRpb25hbCBoaS1saWdodGluZyBmb3IgdmFyaWFibGVzIGluIHN0YWxvYWQvZHlubG9hZCBzdHJpbmdzXG4gICAgICAgICAgICB7IHJlZ2V4OiAvKFxce1xcJCkoQElERU5URlNUQElERU5UUlNUKikoXFx9KS8sIGFjdGlvbjogW3sgdG9rZW46ICdzdHJpbmcuZXNjYXBlJyB9LCB7IHRva2VuOiAnaWRlbnRpZmllcicgfSwgeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUnIH1dIH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFxcXCQvLCBhY3Rpb246IHsgdG9rZW46ICdzdHJpbmcuZXNjYXBlJyB9IH0sXG4gICAgICAgICAgICB7IHJlZ2V4OiAvXFxcXChARVNDSEFSfFt4WF1AeGRpZ2l0K3xAZGlnaXQrKS8sIGFjdGlvbjogeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUnIH0gfSxcbiAgICAgICAgICAgIHsgcmVnZXg6IC9bXlxcXFxcIl0rLywgYWN0aW9uOiB7IHRva2VuOiAnc3RyaW5nJyB9IH1cbiAgICAgICAgXSxcbiAgICB9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=