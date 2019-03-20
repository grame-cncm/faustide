(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js ***!
  \**********************************************************************/
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
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string'] },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*#pragma\\s+region\\b"),
            end: new RegExp("^\\s*#pragma\\s+endregion\\b")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.cpp',
    brackets: [
        { token: 'delimiter.curly', open: '{', close: '}' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.square', open: '[', close: ']' },
        { token: 'delimiter.angle', open: '<', close: '>' }
    ],
    keywords: [
        'abstract',
        'amp',
        'array',
        'auto',
        'bool',
        'break',
        'case',
        'catch',
        'char',
        'class',
        'const',
        'constexpr',
        'const_cast',
        'continue',
        'cpu',
        'decltype',
        'default',
        'delegate',
        'delete',
        'do',
        'double',
        'dynamic_cast',
        'each',
        'else',
        'enum',
        'event',
        'explicit',
        'export',
        'extern',
        'false',
        'final',
        'finally',
        'float',
        'for',
        'friend',
        'gcnew',
        'generic',
        'goto',
        'if',
        'in',
        'initonly',
        'inline',
        'int',
        'interface',
        'interior_ptr',
        'internal',
        'literal',
        'long',
        'mutable',
        'namespace',
        'new',
        'noexcept',
        'nullptr',
        '__nullptr',
        'operator',
        'override',
        'partial',
        'pascal',
        'pin_ptr',
        'private',
        'property',
        'protected',
        'public',
        'ref',
        'register',
        'reinterpret_cast',
        'restrict',
        'return',
        'safe_cast',
        'sealed',
        'short',
        'signed',
        'sizeof',
        'static',
        'static_assert',
        'static_cast',
        'struct',
        'switch',
        'template',
        'this',
        'thread_local',
        'throw',
        'tile_static',
        'true',
        'try',
        'typedef',
        'typeid',
        'typename',
        'union',
        'unsigned',
        'using',
        'virtual',
        'void',
        'volatile',
        'wchar_t',
        'where',
        'while',
        '_asm',
        '_based',
        '_cdecl',
        '_declspec',
        '_fastcall',
        '_if_exists',
        '_if_not_exists',
        '_inline',
        '_multiple_inheritance',
        '_pascal',
        '_single_inheritance',
        '_stdcall',
        '_virtual_inheritance',
        '_w64',
        '__abstract',
        '__alignof',
        '__asm',
        '__assume',
        '__based',
        '__box',
        '__builtin_alignof',
        '__cdecl',
        '__clrcall',
        '__declspec',
        '__delegate',
        '__event',
        '__except',
        '__fastcall',
        '__finally',
        '__forceinline',
        '__gc',
        '__hook',
        '__identifier',
        '__if_exists',
        '__if_not_exists',
        '__inline',
        '__int128',
        '__int16',
        '__int32',
        '__int64',
        '__int8',
        '__interface',
        '__leave',
        '__m128',
        '__m128d',
        '__m128i',
        '__m256',
        '__m256d',
        '__m256i',
        '__m64',
        '__multiple_inheritance',
        '__newslot',
        '__nogc',
        '__noop',
        '__nounwind',
        '__novtordisp',
        '__pascal',
        '__pin',
        '__pragma',
        '__property',
        '__ptr32',
        '__ptr64',
        '__raise',
        '__restrict',
        '__resume',
        '__sealed',
        '__single_inheritance',
        '__stdcall',
        '__super',
        '__thiscall',
        '__try',
        '__try_cast',
        '__typeof',
        '__unaligned',
        '__unhook',
        '__uuidof',
        '__value',
        '__virtual_inheritance',
        '__w64',
        '__wchar_t'
    ],
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
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,
    encoding: /u|u8|U|L/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // C++ 11 Raw String
            [/@encoding?R\"(?:([^ ()\\\t]*))\(/, { token: 'string.raw.begin', next: '@raw.$1' }],
            // identifiers and keywords
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }],
            // whitespace
            { include: '@whitespace' },
            // [[ attributes ]].
            [/\[\[.*\]\]/, 'annotation'],
            [/^\s*#include/, { token: 'keyword.directive.include', next: '@include' }],
            // Preprocessor directive
            [/^\s*#\s*\w+/, 'keyword'],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, {
                    cases: {
                        '@operators': 'delimiter',
                        '@default': ''
                    }
                }],
            // numbers
            [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
            [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
            [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
            [/\d[\d']*\d(@integersuffix)/, 'number'],
            [/\d(@integersuffix)/, 'number'],
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        //Identical copy of comment above, except for the addition of .doc
        doccomment: [
            [/[^\/*]+/, 'comment.doc'],
            [/\*\//, 'comment.doc', '@pop'],
            [/[\/*]/, 'comment.doc']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
        raw: [
            [/(.*)(\))(?:([^ ()\\\t]*))(\")/, {
                    cases: {
                        '$3==$S2': ['string.raw', 'string.raw.end', 'string.raw.end', { token: 'string.raw.end', next: '@pop' }],
                        '@default': ['string.raw', 'string.raw', 'string.raw', 'string.raw']
                    }
                }
            ],
            [/.*/, 'string.raw']
        ],
        include: [
            [/(\s*)(<)([^<>]*)(>)/, ['', 'keyword.directive.include.begin', 'string.include.identifier', { token: 'keyword.directive.include.end', next: '@pop' }]],
            [/(\s*)(")([^"]*)(")/, ['', 'keyword.directive.include.begin', 'string.include.identifier', { token: 'keyword.directive.include.end', next: '@pop' }]]
        ]
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NwcC9jcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3REFBd0Q7QUFDakUsU0FBUywyQ0FBMkM7QUFDcEQ7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtQ0FBbUMsWUFBWSxHQUFHO0FBQzNELFNBQVMsd0RBQXdEO0FBQ2pFLFNBQVMsbURBQW1EO0FBQzVELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsSUFBSSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDZDQUE2QztBQUMvRjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0EsOEJBQThCLHVEQUF1RDtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1Rix3Q0FBd0M7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwR0FBMEcsdURBQXVEO0FBQ2pLLHlHQUF5Ryx1REFBdUQ7QUFDaEs7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoianMvN2U4MWUyYTFhY2EwZGUzN2FkNTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJy8qJywgJyovJ10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJywgbm90SW46IFsnc3RyaW5nJywgJ2NvbW1lbnQnXSB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyojcHJhZ21hXFxcXHMrcmVnaW9uXFxcXGJcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3ByYWdtYVxcXFxzK2VuZHJlZ2lvblxcXFxiXCIpXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJy5jcHAnLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknLCBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycsIG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScsIG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmFuZ2xlJywgb3BlbjogJzwnLCBjbG9zZTogJz4nIH1cbiAgICBdLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdhYnN0cmFjdCcsXG4gICAgICAgICdhbXAnLFxuICAgICAgICAnYXJyYXknLFxuICAgICAgICAnYXV0bycsXG4gICAgICAgICdib29sJyxcbiAgICAgICAgJ2JyZWFrJyxcbiAgICAgICAgJ2Nhc2UnLFxuICAgICAgICAnY2F0Y2gnLFxuICAgICAgICAnY2hhcicsXG4gICAgICAgICdjbGFzcycsXG4gICAgICAgICdjb25zdCcsXG4gICAgICAgICdjb25zdGV4cHInLFxuICAgICAgICAnY29uc3RfY2FzdCcsXG4gICAgICAgICdjb250aW51ZScsXG4gICAgICAgICdjcHUnLFxuICAgICAgICAnZGVjbHR5cGUnLFxuICAgICAgICAnZGVmYXVsdCcsXG4gICAgICAgICdkZWxlZ2F0ZScsXG4gICAgICAgICdkZWxldGUnLFxuICAgICAgICAnZG8nLFxuICAgICAgICAnZG91YmxlJyxcbiAgICAgICAgJ2R5bmFtaWNfY2FzdCcsXG4gICAgICAgICdlYWNoJyxcbiAgICAgICAgJ2Vsc2UnLFxuICAgICAgICAnZW51bScsXG4gICAgICAgICdldmVudCcsXG4gICAgICAgICdleHBsaWNpdCcsXG4gICAgICAgICdleHBvcnQnLFxuICAgICAgICAnZXh0ZXJuJyxcbiAgICAgICAgJ2ZhbHNlJyxcbiAgICAgICAgJ2ZpbmFsJyxcbiAgICAgICAgJ2ZpbmFsbHknLFxuICAgICAgICAnZmxvYXQnLFxuICAgICAgICAnZm9yJyxcbiAgICAgICAgJ2ZyaWVuZCcsXG4gICAgICAgICdnY25ldycsXG4gICAgICAgICdnZW5lcmljJyxcbiAgICAgICAgJ2dvdG8nLFxuICAgICAgICAnaWYnLFxuICAgICAgICAnaW4nLFxuICAgICAgICAnaW5pdG9ubHknLFxuICAgICAgICAnaW5saW5lJyxcbiAgICAgICAgJ2ludCcsXG4gICAgICAgICdpbnRlcmZhY2UnLFxuICAgICAgICAnaW50ZXJpb3JfcHRyJyxcbiAgICAgICAgJ2ludGVybmFsJyxcbiAgICAgICAgJ2xpdGVyYWwnLFxuICAgICAgICAnbG9uZycsXG4gICAgICAgICdtdXRhYmxlJyxcbiAgICAgICAgJ25hbWVzcGFjZScsXG4gICAgICAgICduZXcnLFxuICAgICAgICAnbm9leGNlcHQnLFxuICAgICAgICAnbnVsbHB0cicsXG4gICAgICAgICdfX251bGxwdHInLFxuICAgICAgICAnb3BlcmF0b3InLFxuICAgICAgICAnb3ZlcnJpZGUnLFxuICAgICAgICAncGFydGlhbCcsXG4gICAgICAgICdwYXNjYWwnLFxuICAgICAgICAncGluX3B0cicsXG4gICAgICAgICdwcml2YXRlJyxcbiAgICAgICAgJ3Byb3BlcnR5JyxcbiAgICAgICAgJ3Byb3RlY3RlZCcsXG4gICAgICAgICdwdWJsaWMnLFxuICAgICAgICAncmVmJyxcbiAgICAgICAgJ3JlZ2lzdGVyJyxcbiAgICAgICAgJ3JlaW50ZXJwcmV0X2Nhc3QnLFxuICAgICAgICAncmVzdHJpY3QnLFxuICAgICAgICAncmV0dXJuJyxcbiAgICAgICAgJ3NhZmVfY2FzdCcsXG4gICAgICAgICdzZWFsZWQnLFxuICAgICAgICAnc2hvcnQnLFxuICAgICAgICAnc2lnbmVkJyxcbiAgICAgICAgJ3NpemVvZicsXG4gICAgICAgICdzdGF0aWMnLFxuICAgICAgICAnc3RhdGljX2Fzc2VydCcsXG4gICAgICAgICdzdGF0aWNfY2FzdCcsXG4gICAgICAgICdzdHJ1Y3QnLFxuICAgICAgICAnc3dpdGNoJyxcbiAgICAgICAgJ3RlbXBsYXRlJyxcbiAgICAgICAgJ3RoaXMnLFxuICAgICAgICAndGhyZWFkX2xvY2FsJyxcbiAgICAgICAgJ3Rocm93JyxcbiAgICAgICAgJ3RpbGVfc3RhdGljJyxcbiAgICAgICAgJ3RydWUnLFxuICAgICAgICAndHJ5JyxcbiAgICAgICAgJ3R5cGVkZWYnLFxuICAgICAgICAndHlwZWlkJyxcbiAgICAgICAgJ3R5cGVuYW1lJyxcbiAgICAgICAgJ3VuaW9uJyxcbiAgICAgICAgJ3Vuc2lnbmVkJyxcbiAgICAgICAgJ3VzaW5nJyxcbiAgICAgICAgJ3ZpcnR1YWwnLFxuICAgICAgICAndm9pZCcsXG4gICAgICAgICd2b2xhdGlsZScsXG4gICAgICAgICd3Y2hhcl90JyxcbiAgICAgICAgJ3doZXJlJyxcbiAgICAgICAgJ3doaWxlJyxcbiAgICAgICAgJ19hc20nLFxuICAgICAgICAnX2Jhc2VkJyxcbiAgICAgICAgJ19jZGVjbCcsXG4gICAgICAgICdfZGVjbHNwZWMnLFxuICAgICAgICAnX2Zhc3RjYWxsJyxcbiAgICAgICAgJ19pZl9leGlzdHMnLFxuICAgICAgICAnX2lmX25vdF9leGlzdHMnLFxuICAgICAgICAnX2lubGluZScsXG4gICAgICAgICdfbXVsdGlwbGVfaW5oZXJpdGFuY2UnLFxuICAgICAgICAnX3Bhc2NhbCcsXG4gICAgICAgICdfc2luZ2xlX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ19zdGRjYWxsJyxcbiAgICAgICAgJ192aXJ0dWFsX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ193NjQnLFxuICAgICAgICAnX19hYnN0cmFjdCcsXG4gICAgICAgICdfX2FsaWdub2YnLFxuICAgICAgICAnX19hc20nLFxuICAgICAgICAnX19hc3N1bWUnLFxuICAgICAgICAnX19iYXNlZCcsXG4gICAgICAgICdfX2JveCcsXG4gICAgICAgICdfX2J1aWx0aW5fYWxpZ25vZicsXG4gICAgICAgICdfX2NkZWNsJyxcbiAgICAgICAgJ19fY2xyY2FsbCcsXG4gICAgICAgICdfX2RlY2xzcGVjJyxcbiAgICAgICAgJ19fZGVsZWdhdGUnLFxuICAgICAgICAnX19ldmVudCcsXG4gICAgICAgICdfX2V4Y2VwdCcsXG4gICAgICAgICdfX2Zhc3RjYWxsJyxcbiAgICAgICAgJ19fZmluYWxseScsXG4gICAgICAgICdfX2ZvcmNlaW5saW5lJyxcbiAgICAgICAgJ19fZ2MnLFxuICAgICAgICAnX19ob29rJyxcbiAgICAgICAgJ19faWRlbnRpZmllcicsXG4gICAgICAgICdfX2lmX2V4aXN0cycsXG4gICAgICAgICdfX2lmX25vdF9leGlzdHMnLFxuICAgICAgICAnX19pbmxpbmUnLFxuICAgICAgICAnX19pbnQxMjgnLFxuICAgICAgICAnX19pbnQxNicsXG4gICAgICAgICdfX2ludDMyJyxcbiAgICAgICAgJ19faW50NjQnLFxuICAgICAgICAnX19pbnQ4JyxcbiAgICAgICAgJ19faW50ZXJmYWNlJyxcbiAgICAgICAgJ19fbGVhdmUnLFxuICAgICAgICAnX19tMTI4JyxcbiAgICAgICAgJ19fbTEyOGQnLFxuICAgICAgICAnX19tMTI4aScsXG4gICAgICAgICdfX20yNTYnLFxuICAgICAgICAnX19tMjU2ZCcsXG4gICAgICAgICdfX20yNTZpJyxcbiAgICAgICAgJ19fbTY0JyxcbiAgICAgICAgJ19fbXVsdGlwbGVfaW5oZXJpdGFuY2UnLFxuICAgICAgICAnX19uZXdzbG90JyxcbiAgICAgICAgJ19fbm9nYycsXG4gICAgICAgICdfX25vb3AnLFxuICAgICAgICAnX19ub3Vud2luZCcsXG4gICAgICAgICdfX25vdnRvcmRpc3AnLFxuICAgICAgICAnX19wYXNjYWwnLFxuICAgICAgICAnX19waW4nLFxuICAgICAgICAnX19wcmFnbWEnLFxuICAgICAgICAnX19wcm9wZXJ0eScsXG4gICAgICAgICdfX3B0cjMyJyxcbiAgICAgICAgJ19fcHRyNjQnLFxuICAgICAgICAnX19yYWlzZScsXG4gICAgICAgICdfX3Jlc3RyaWN0JyxcbiAgICAgICAgJ19fcmVzdW1lJyxcbiAgICAgICAgJ19fc2VhbGVkJyxcbiAgICAgICAgJ19fc2luZ2xlX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ19fc3RkY2FsbCcsXG4gICAgICAgICdfX3N1cGVyJyxcbiAgICAgICAgJ19fdGhpc2NhbGwnLFxuICAgICAgICAnX190cnknLFxuICAgICAgICAnX190cnlfY2FzdCcsXG4gICAgICAgICdfX3R5cGVvZicsXG4gICAgICAgICdfX3VuYWxpZ25lZCcsXG4gICAgICAgICdfX3VuaG9vaycsXG4gICAgICAgICdfX3V1aWRvZicsXG4gICAgICAgICdfX3ZhbHVlJyxcbiAgICAgICAgJ19fdmlydHVhbF9pbmhlcml0YW5jZScsXG4gICAgICAgICdfX3c2NCcsXG4gICAgICAgICdfX3djaGFyX3QnXG4gICAgXSxcbiAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgJz0nLCAnPicsICc8JywgJyEnLCAnficsICc/JywgJzonLFxuICAgICAgICAnPT0nLCAnPD0nLCAnPj0nLCAnIT0nLCAnJiYnLCAnfHwnLCAnKysnLCAnLS0nLFxuICAgICAgICAnKycsICctJywgJyonLCAnLycsICcmJywgJ3wnLCAnXicsICclJywgJzw8JyxcbiAgICAgICAgJz4+JywgJz4+PicsICcrPScsICctPScsICcqPScsICcvPScsICcmPScsICd8PScsXG4gICAgICAgICdePScsICclPScsICc8PD0nLCAnPj49JywgJz4+Pj0nXG4gICAgXSxcbiAgICAvLyB3ZSBpbmNsdWRlIHRoZXNlIGNvbW1vbiByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgc3ltYm9sczogL1s9Pjwhfj86JnwrXFwtKlxcL1xcXiVdKy8sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICBpbnRlZ2Vyc3VmZml4OiAvKGxsfExMfHV8VXxsfEwpPyhsbHxMTHx1fFV8bHxMKT8vLFxuICAgIGZsb2F0c3VmZml4OiAvW2ZGbExdPy8sXG4gICAgZW5jb2Rpbmc6IC91fHU4fFV8TC8sXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIC8vIEMrKyAxMSBSYXcgU3RyaW5nXG4gICAgICAgICAgICBbL0BlbmNvZGluZz9SXFxcIig/OihbXiAoKVxcXFxcXHRdKikpXFwoLywgeyB0b2tlbjogJ3N0cmluZy5yYXcuYmVnaW4nLCBuZXh0OiAnQHJhdy4kMScgfV0sXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC4kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIFtbIGF0dHJpYnV0ZXMgXV0uXG4gICAgICAgICAgICBbL1xcW1xcWy4qXFxdXFxdLywgJ2Fubm90YXRpb24nXSxcbiAgICAgICAgICAgIFsvXlxccyojaW5jbHVkZS8sIHsgdG9rZW46ICdrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlJywgbmV4dDogJ0BpbmNsdWRlJyB9XSxcbiAgICAgICAgICAgIC8vIFByZXByb2Nlc3NvciBkaXJlY3RpdmVcbiAgICAgICAgICAgIFsvXlxccyojXFxzKlxcdysvLCAna2V5d29yZCddLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdXS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvWzw+XSg/IUBzeW1ib2xzKS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvQHN5bWJvbHMvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdkZWxpbWl0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQqXFxkK1tlRV0oW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8wW3hYXVswLTlhLWZBLUYnXSpbMC05YS1mQS1GXShAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8wWzAtNyddKlswLTddKEBpbnRlZ2Vyc3VmZml4KS8sICdudW1iZXIub2N0YWwnXSxcbiAgICAgICAgICAgIFsvMFtiQl1bMC0xJ10qWzAtMV0oQGludGVnZXJzdWZmaXgpLywgJ251bWJlci5iaW5hcnknXSxcbiAgICAgICAgICAgIFsvXFxkW1xcZCddKlxcZChAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbL1xcZChAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXI6IGFmdGVyIG51bWJlciBiZWNhdXNlIG9mIC5cXGQgZmxvYXRzXG4gICAgICAgICAgICBbL1s7LC5dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0BzdHJpbmcnXSxcbiAgICAgICAgICAgIC8vIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIFsvJ1teXFxcXCddJy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5pbnZhbGlkJ11cbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy9cXC9cXCpcXCooPyFcXC8pLywgJ2NvbW1lbnQuZG9jJywgJ0Bkb2Njb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcLy4qJC8sICdjb21tZW50J10sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXCpcXC8vLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1tcXC8qXS8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgLy9JZGVudGljYWwgY29weSBvZiBjb21tZW50IGFib3ZlLCBleGNlcHQgZm9yIHRoZSBhZGRpdGlvbiBvZiAuZG9jXG4gICAgICAgIGRvY2NvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudC5kb2MnXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQuZG9jJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcLypdLywgJ2NvbW1lbnQuZG9jJ11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAcG9wJ11cbiAgICAgICAgXSxcbiAgICAgICAgcmF3OiBbXG4gICAgICAgICAgICBbLyguKikoXFwpKSg/OihbXiAoKVxcXFxcXHRdKikpKFxcXCIpLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQzPT0kUzInOiBbJ3N0cmluZy5yYXcnLCAnc3RyaW5nLnJhdy5lbmQnLCAnc3RyaW5nLnJhdy5lbmQnLCB7IHRva2VuOiAnc3RyaW5nLnJhdy5lbmQnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiBbJ3N0cmluZy5yYXcnLCAnc3RyaW5nLnJhdycsICdzdHJpbmcucmF3JywgJ3N0cmluZy5yYXcnXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFsvLiovLCAnc3RyaW5nLnJhdyddXG4gICAgICAgIF0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIFsvKFxccyopKDwpKFtePD5dKikoPikvLCBbJycsICdrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlLmJlZ2luJywgJ3N0cmluZy5pbmNsdWRlLmlkZW50aWZpZXInLCB7IHRva2VuOiAna2V5d29yZC5kaXJlY3RpdmUuaW5jbHVkZS5lbmQnLCBuZXh0OiAnQHBvcCcgfV1dLFxuICAgICAgICAgICAgWy8oXFxzKikoXCIpKFteXCJdKikoXCIpLywgWycnLCAna2V5d29yZC5kaXJlY3RpdmUuaW5jbHVkZS5iZWdpbicsICdzdHJpbmcuaW5jbHVkZS5pZGVudGlmaWVyJywgeyB0b2tlbjogJ2tleXdvcmQuZGlyZWN0aXZlLmluY2x1ZGUuZW5kJywgbmV4dDogJ0Bwb3AnIH1dXVxuICAgICAgICBdXG4gICAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9