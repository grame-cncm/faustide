(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/apex/apex.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/apex/apex.js ***!
  \************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var conf = {
    // the default separators except `@$`
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: '<', close: '>' },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
            end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")
        }
    }
};
var keywords = [
    'abstract',
    'activate',
    'and',
    'any',
    'array',
    'as',
    'asc',
    'assert',
    'autonomous',
    'begin',
    'bigdecimal',
    'blob',
    'boolean',
    'break',
    'bulk',
    'by',
    'case',
    'cast',
    'catch',
    'char',
    'class',
    'collect',
    'commit',
    'const',
    'continue',
    'convertcurrency',
    'decimal',
    'default',
    'delete',
    'desc',
    'do',
    'double',
    'else',
    'end',
    'enum',
    'exception',
    'exit',
    'export',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'from',
    'future',
    'get',
    'global',
    'goto',
    'group',
    'having',
    'hint',
    'if',
    'implements',
    'import',
    'in',
    'inner',
    'insert',
    'instanceof',
    'int',
    'interface',
    'into',
    'join',
    'last_90_days',
    'last_month',
    'last_n_days',
    'last_week',
    'like',
    'limit',
    'list',
    'long',
    'loop',
    'map',
    'merge',
    'native',
    'new',
    'next_90_days',
    'next_month',
    'next_n_days',
    'next_week',
    'not',
    'null',
    'nulls',
    'number',
    'object',
    'of',
    'on',
    'or',
    'outer',
    'override',
    'package',
    'parallel',
    'pragma',
    'private',
    'protected',
    'public',
    'retrieve',
    'return',
    'returning',
    'rollback',
    'savepoint',
    'search',
    'select',
    'set',
    'short',
    'sort',
    'stat',
    'static',
    'strictfp',
    'super',
    'switch',
    'synchronized',
    'system',
    'testmethod',
    'then',
    'this',
    'this_month',
    'this_week',
    'throw',
    'throws',
    'today',
    'tolabel',
    'tomorrow',
    'transaction',
    'transient',
    'trigger',
    'true',
    'try',
    'type',
    'undelete',
    'update',
    'upsert',
    'using',
    'virtual',
    'void',
    'volatile',
    'webservice',
    'when',
    'where',
    'while',
    'yesterday'
];
// create case variations of the keywords - apex is case insensitive, but we can't make the highlighter case insensitive
// because we use a heuristic to assume that identifiers starting with an upper case letter are types.
var uppercaseFirstLetter = function (lowercase) { return lowercase.charAt(0).toUpperCase() + lowercase.substr(1); };
var keywordsWithCaseVariations = [];
keywords.forEach(function (lowercase) {
    keywordsWithCaseVariations.push(lowercase);
    keywordsWithCaseVariations.push(lowercase.toUpperCase());
    keywordsWithCaseVariations.push(uppercaseFirstLetter(lowercase));
});
var language = {
    defaultToken: '',
    tokenPostfix: '.apex',
    keywords: keywordsWithCaseVariations,
    operators: [
        '=', '>', '<', '!', '~', '?', ':',
        '==', '<=', '>=', '!=', '&&', '||', '++', '--',
        '+', '-', '*', '/', '&', '|', '^', '%', '<<',
        '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
        '^=', '%=', '<<=', '>>=', '>>>='
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-z_$][\w$]*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }],
            // assume that identifiers starting with an uppercase letter are types
            [/[A-Z][\w\$]*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'type.identifier'
                    }
                }],
            // whitespace
            { include: '@whitespace' },
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, {
                    cases: {
                        '@operators': 'delimiter',
                        '@default': ''
                    }
                }],
            // @ annotations.
            [/@\s*[a-zA-Z_\$][\w\$]*/, 'annotation'],
            // numbers
            [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'],
            [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'],
            [/(@digits)[fFdD]/, 'number.float'],
            [/(@digits)[lL]?/, 'number'],
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/'([^'\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string."'],
            [/'/, 'string', '@string.\''],
            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\/\*\*(?!\/)/, 'comment.doc', '@apexdoc'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
            // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        //Identical copy of comment above, except for the addition of .doc
        apexdoc: [
            [/[^\/*]+/, 'comment.doc'],
            [/\*\//, 'comment.doc', '@pop'],
            [/[\/*]/, 'comment.doc']
        ],
        string: [
            [/[^\\"']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/["']/, { cases: { '$#==$S2': { token: 'string', next: '@pop' },
                        '@default': 'string' } }]
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2FwZXgvYXBleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDYTtBQUNOO0FBQ1A7QUFDQSxrRUFBa0UsSUFBSSxNQUFNO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx3QkFBd0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGdFQUFnRTtBQUNqSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsU0FBUyxhQUFhLGdDQUFnQztBQUM1RSw4Q0FBOEMsRUFBRTtBQUNoRDtBQUNBLEtBQUs7QUFDTCIsImZpbGUiOiJqcy85MTRkNmUyYWJjNDJhYjQ1N2M3My5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIC8vIHRoZSBkZWZhdWx0IHNlcGFyYXRvcnMgZXhjZXB0IGBAJGBcbiAgICB3b3JkUGF0dGVybjogLygtP1xcZCpcXC5cXGRcXHcqKXwoW15cXGBcXH5cXCFcXCNcXCVcXF5cXCZcXCpcXChcXClcXC1cXD1cXCtcXFtcXHtcXF1cXH1cXFxcXFx8XFw7XFw6XFwnXFxcIlxcLFxcLlxcPFxcPlxcL1xcP1xcc10rKS9nLFxuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnLyonLCAnKi8nXSxcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ10sXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgICAgIHsgb3BlbjogJzwnLCBjbG9zZTogJz4nIH0sXG4gICAgXSxcbiAgICBmb2xkaW5nOiB7XG4gICAgICAgIG1hcmtlcnM6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKi8vXFxcXHMqKD86KD86Iz9yZWdpb25cXFxcYil8KD86PGVkaXRvci1mb2xkXFxcXGIpKVwiKSxcbiAgICAgICAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccyovL1xcXFxzKig/Oig/OiM/ZW5kcmVnaW9uXFxcXGIpfCg/OjwvZWRpdG9yLWZvbGQ+KSlcIilcbiAgICAgICAgfVxuICAgIH1cbn07XG52YXIga2V5d29yZHMgPSBbXG4gICAgJ2Fic3RyYWN0JyxcbiAgICAnYWN0aXZhdGUnLFxuICAgICdhbmQnLFxuICAgICdhbnknLFxuICAgICdhcnJheScsXG4gICAgJ2FzJyxcbiAgICAnYXNjJyxcbiAgICAnYXNzZXJ0JyxcbiAgICAnYXV0b25vbW91cycsXG4gICAgJ2JlZ2luJyxcbiAgICAnYmlnZGVjaW1hbCcsXG4gICAgJ2Jsb2InLFxuICAgICdib29sZWFuJyxcbiAgICAnYnJlYWsnLFxuICAgICdidWxrJyxcbiAgICAnYnknLFxuICAgICdjYXNlJyxcbiAgICAnY2FzdCcsXG4gICAgJ2NhdGNoJyxcbiAgICAnY2hhcicsXG4gICAgJ2NsYXNzJyxcbiAgICAnY29sbGVjdCcsXG4gICAgJ2NvbW1pdCcsXG4gICAgJ2NvbnN0JyxcbiAgICAnY29udGludWUnLFxuICAgICdjb252ZXJ0Y3VycmVuY3knLFxuICAgICdkZWNpbWFsJyxcbiAgICAnZGVmYXVsdCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2Rlc2MnLFxuICAgICdkbycsXG4gICAgJ2RvdWJsZScsXG4gICAgJ2Vsc2UnLFxuICAgICdlbmQnLFxuICAgICdlbnVtJyxcbiAgICAnZXhjZXB0aW9uJyxcbiAgICAnZXhpdCcsXG4gICAgJ2V4cG9ydCcsXG4gICAgJ2V4dGVuZHMnLFxuICAgICdmYWxzZScsXG4gICAgJ2ZpbmFsJyxcbiAgICAnZmluYWxseScsXG4gICAgJ2Zsb2F0JyxcbiAgICAnZm9yJyxcbiAgICAnZnJvbScsXG4gICAgJ2Z1dHVyZScsXG4gICAgJ2dldCcsXG4gICAgJ2dsb2JhbCcsXG4gICAgJ2dvdG8nLFxuICAgICdncm91cCcsXG4gICAgJ2hhdmluZycsXG4gICAgJ2hpbnQnLFxuICAgICdpZicsXG4gICAgJ2ltcGxlbWVudHMnLFxuICAgICdpbXBvcnQnLFxuICAgICdpbicsXG4gICAgJ2lubmVyJyxcbiAgICAnaW5zZXJ0JyxcbiAgICAnaW5zdGFuY2VvZicsXG4gICAgJ2ludCcsXG4gICAgJ2ludGVyZmFjZScsXG4gICAgJ2ludG8nLFxuICAgICdqb2luJyxcbiAgICAnbGFzdF85MF9kYXlzJyxcbiAgICAnbGFzdF9tb250aCcsXG4gICAgJ2xhc3Rfbl9kYXlzJyxcbiAgICAnbGFzdF93ZWVrJyxcbiAgICAnbGlrZScsXG4gICAgJ2xpbWl0JyxcbiAgICAnbGlzdCcsXG4gICAgJ2xvbmcnLFxuICAgICdsb29wJyxcbiAgICAnbWFwJyxcbiAgICAnbWVyZ2UnLFxuICAgICduYXRpdmUnLFxuICAgICduZXcnLFxuICAgICduZXh0XzkwX2RheXMnLFxuICAgICduZXh0X21vbnRoJyxcbiAgICAnbmV4dF9uX2RheXMnLFxuICAgICduZXh0X3dlZWsnLFxuICAgICdub3QnLFxuICAgICdudWxsJyxcbiAgICAnbnVsbHMnLFxuICAgICdudW1iZXInLFxuICAgICdvYmplY3QnLFxuICAgICdvZicsXG4gICAgJ29uJyxcbiAgICAnb3InLFxuICAgICdvdXRlcicsXG4gICAgJ292ZXJyaWRlJyxcbiAgICAncGFja2FnZScsXG4gICAgJ3BhcmFsbGVsJyxcbiAgICAncHJhZ21hJyxcbiAgICAncHJpdmF0ZScsXG4gICAgJ3Byb3RlY3RlZCcsXG4gICAgJ3B1YmxpYycsXG4gICAgJ3JldHJpZXZlJyxcbiAgICAncmV0dXJuJyxcbiAgICAncmV0dXJuaW5nJyxcbiAgICAncm9sbGJhY2snLFxuICAgICdzYXZlcG9pbnQnLFxuICAgICdzZWFyY2gnLFxuICAgICdzZWxlY3QnLFxuICAgICdzZXQnLFxuICAgICdzaG9ydCcsXG4gICAgJ3NvcnQnLFxuICAgICdzdGF0JyxcbiAgICAnc3RhdGljJyxcbiAgICAnc3RyaWN0ZnAnLFxuICAgICdzdXBlcicsXG4gICAgJ3N3aXRjaCcsXG4gICAgJ3N5bmNocm9uaXplZCcsXG4gICAgJ3N5c3RlbScsXG4gICAgJ3Rlc3RtZXRob2QnLFxuICAgICd0aGVuJyxcbiAgICAndGhpcycsXG4gICAgJ3RoaXNfbW9udGgnLFxuICAgICd0aGlzX3dlZWsnLFxuICAgICd0aHJvdycsXG4gICAgJ3Rocm93cycsXG4gICAgJ3RvZGF5JyxcbiAgICAndG9sYWJlbCcsXG4gICAgJ3RvbW9ycm93JyxcbiAgICAndHJhbnNhY3Rpb24nLFxuICAgICd0cmFuc2llbnQnLFxuICAgICd0cmlnZ2VyJyxcbiAgICAndHJ1ZScsXG4gICAgJ3RyeScsXG4gICAgJ3R5cGUnLFxuICAgICd1bmRlbGV0ZScsXG4gICAgJ3VwZGF0ZScsXG4gICAgJ3Vwc2VydCcsXG4gICAgJ3VzaW5nJyxcbiAgICAndmlydHVhbCcsXG4gICAgJ3ZvaWQnLFxuICAgICd2b2xhdGlsZScsXG4gICAgJ3dlYnNlcnZpY2UnLFxuICAgICd3aGVuJyxcbiAgICAnd2hlcmUnLFxuICAgICd3aGlsZScsXG4gICAgJ3llc3RlcmRheSdcbl07XG4vLyBjcmVhdGUgY2FzZSB2YXJpYXRpb25zIG9mIHRoZSBrZXl3b3JkcyAtIGFwZXggaXMgY2FzZSBpbnNlbnNpdGl2ZSwgYnV0IHdlIGNhbid0IG1ha2UgdGhlIGhpZ2hsaWdodGVyIGNhc2UgaW5zZW5zaXRpdmVcbi8vIGJlY2F1c2Ugd2UgdXNlIGEgaGV1cmlzdGljIHRvIGFzc3VtZSB0aGF0IGlkZW50aWZpZXJzIHN0YXJ0aW5nIHdpdGggYW4gdXBwZXIgY2FzZSBsZXR0ZXIgYXJlIHR5cGVzLlxudmFyIHVwcGVyY2FzZUZpcnN0TGV0dGVyID0gZnVuY3Rpb24gKGxvd2VyY2FzZSkgeyByZXR1cm4gbG93ZXJjYXNlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbG93ZXJjYXNlLnN1YnN0cigxKTsgfTtcbnZhciBrZXl3b3Jkc1dpdGhDYXNlVmFyaWF0aW9ucyA9IFtdO1xua2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbiAobG93ZXJjYXNlKSB7XG4gICAga2V5d29yZHNXaXRoQ2FzZVZhcmlhdGlvbnMucHVzaChsb3dlcmNhc2UpO1xuICAgIGtleXdvcmRzV2l0aENhc2VWYXJpYXRpb25zLnB1c2gobG93ZXJjYXNlLnRvVXBwZXJDYXNlKCkpO1xuICAgIGtleXdvcmRzV2l0aENhc2VWYXJpYXRpb25zLnB1c2godXBwZXJjYXNlRmlyc3RMZXR0ZXIobG93ZXJjYXNlKSk7XG59KTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcuYXBleCcsXG4gICAga2V5d29yZHM6IGtleXdvcmRzV2l0aENhc2VWYXJpYXRpb25zLFxuICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnPScsICc+JywgJzwnLCAnIScsICd+JywgJz8nLCAnOicsXG4gICAgICAgICc9PScsICc8PScsICc+PScsICchPScsICcmJicsICd8fCcsICcrKycsICctLScsXG4gICAgICAgICcrJywgJy0nLCAnKicsICcvJywgJyYnLCAnfCcsICdeJywgJyUnLCAnPDwnLFxuICAgICAgICAnPj4nLCAnPj4+JywgJys9JywgJy09JywgJyo9JywgJy89JywgJyY9JywgJ3w9JyxcbiAgICAgICAgJ149JywgJyU9JywgJzw8PScsICc+Pj0nLCAnPj4+PSdcbiAgICBdLFxuICAgIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFwvXFxeJV0rLyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICAgIGRpZ2l0czogL1xcZCsoXytcXGQrKSovLFxuICAgIG9jdGFsZGlnaXRzOiAvWzAtN10rKF8rWzAtN10rKSovLFxuICAgIGJpbmFyeWRpZ2l0czogL1swLTFdKyhfK1swLTFdKykqLyxcbiAgICBoZXhkaWdpdHM6IC9bWzAtOWEtZkEtRl0rKF8rWzAtOWEtZkEtRl0rKSovLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2Etel8kXVtcXHckXSovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQuJDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gYXNzdW1lIHRoYXQgaWRlbnRpZmllcnMgc3RhcnRpbmcgd2l0aCBhbiB1cHBlcmNhc2UgbGV0dGVyIGFyZSB0eXBlc1xuICAgICAgICAgICAgWy9bQS1aXVtcXHdcXCRdKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC4kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICd0eXBlLmlkZW50aWZpZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIHdoaXRlc3BhY2VcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdXS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvWzw+XSg/IUBzeW1ib2xzKS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvQHN5bWJvbHMvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdkZWxpbWl0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gQCBhbm5vdGF0aW9ucy5cbiAgICAgICAgICAgIFsvQFxccypbYS16QS1aX1xcJF1bXFx3XFwkXSovLCAnYW5ub3RhdGlvbiddLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy8oQGRpZ2l0cylbZUVdKFtcXC0rXT8oQGRpZ2l0cykpP1tmRmREXT8vLCAnbnVtYmVyLmZsb2F0J10sXG4gICAgICAgICAgICBbLyhAZGlnaXRzKVxcLihAZGlnaXRzKShbZUVdW1xcLStdPyhAZGlnaXRzKSk/W2ZGZERdPy8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvKEBkaWdpdHMpW2ZGZERdLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8oQGRpZ2l0cylbbExdPy8sICdudW1iZXInXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcjogYWZ0ZXIgbnVtYmVyIGJlY2F1c2Ugb2YgLlxcZCBmbG9hdHNcbiAgICAgICAgICAgIFsvWzssLl0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICAvLyBzdHJpbmdzXG4gICAgICAgICAgICBbL1wiKFteXCJcXFxcXXxcXFxcLikqJC8sICdzdHJpbmcuaW52YWxpZCddLFxuICAgICAgICAgICAgWy8nKFteJ1xcXFxdfFxcXFwuKSokLywgJ3N0cmluZy5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAc3RyaW5nLlwiJ10sXG4gICAgICAgICAgICBbLycvLCAnc3RyaW5nJywgJ0BzdHJpbmcuXFwnJ10sXG4gICAgICAgICAgICAvLyBjaGFyYWN0ZXJzXG4gICAgICAgICAgICBbLydbXlxcXFwnXScvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbJ3N0cmluZycsICdzdHJpbmcuZXNjYXBlJywgJ3N0cmluZyddXSxcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcuaW52YWxpZCddXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICcnXSxcbiAgICAgICAgICAgIFsvXFwvXFwqXFwqKD8hXFwvKS8sICdjb21tZW50LmRvYycsICdAYXBleGRvYyddLFxuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXC8uKiQvLCAnY29tbWVudCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1teXFwvKl0rLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIC8vIFsvXFwvXFwqLywgJ2NvbW1lbnQnLCAnQHB1c2gnIF0sICAgIC8vIG5lc3RlZCBjb21tZW50IG5vdCBhbGxvd2VkIDotKFxuICAgICAgICAgICAgLy8gWy9cXC9cXCovLCAgICAnY29tbWVudC5pbnZhbGlkJyBdLCAgICAvLyB0aGlzIGJyZWFrcyBibG9jayBjb21tZW50cyBpbiB0aGUgc2hhcGUgb2YgLyogLy8qL1xuICAgICAgICAgICAgWy9cXCpcXC8vLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1tcXC8qXS8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgLy9JZGVudGljYWwgY29weSBvZiBjb21tZW50IGFib3ZlLCBleGNlcHQgZm9yIHRoZSBhZGRpdGlvbiBvZiAuZG9jXG4gICAgICAgIGFwZXhkb2M6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudC5kb2MnXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQuZG9jJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcLypdLywgJ2NvbW1lbnQuZG9jJ11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiJ10rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9bXCInXS8sIHsgY2FzZXM6IHsgJyQjPT0kUzInOiB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJyB9IH1dXG4gICAgICAgIF0sXG4gICAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9