(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/kotlin/kotlin.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/kotlin/kotlin.js ***!
  \****************************************************************************/
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
var language = {
    defaultToken: '',
    tokenPostfix: '.kt',
    keywords: [
        'as', 'as?', 'break', 'class', 'continue', 'do', 'else', 'false', 'for', 'fun', 'if',
        'in', '!in', 'interface', 'is', '!is', 'null', 'object', 'package', 'return', 'super',
        'this', 'throw', 'true', 'try', 'typealias', 'val', 'var', 'when', 'while', 'by',
        'catch', 'constructor', 'delegate', 'dynamic', 'field', 'file', 'finally', 'get',
        'import', 'init', 'param', 'property', 'receiver', 'set', 'setparam', 'where', 'actual',
        'abstract', 'annotation', 'companion', 'const', 'crossinline', 'data', 'enum', 'expect',
        'external', 'final', 'infix', 'inline', 'inner', 'internal', 'lateinit', 'noinline',
        'open', 'operator', 'out', 'override', 'private', 'protected', 'public', 'reified',
        'sealed', 'suspend', 'tailrec', 'vararg', 'field', 'it'
    ],
    operators: [
        '+', '-', '*', '/', '%', '=', '+=', '-=', '*=', '/=',
        '%=', '++', '--', '&&', '||', '!', '==', '!=', '===',
        '!==', '>', '<', '<=', '>=', '[', ']', '!!', '?.', '?:',
        '::', '..', ':', '?', '->', '@', ';', '$', '_'
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
            // class name highlighting
            [/[A-Z][\w\$]*/, 'type.identifier'],
            // identifiers and keywords
            [/[a-zA-Z_$][\w$]*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
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
            [/0[xX](@hexdigits)[Ll]?/, 'number.hex'],
            [/0(@octaldigits)[Ll]?/, 'number.octal'],
            [/0[bB](@binarydigits)[Ll]?/, 'number.binary'],
            [/(@digits)[fFdD]/, 'number.float'],
            [/(@digits)[lL]?/, 'number'],
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
            [/\/\*\*(?!\/)/, 'comment.doc', '@javadoc'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        //Identical copy of comment above, except for the addition of .doc
        javadoc: [
            [/[^\/*]+/, 'comment.doc'],
            // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
            [/\/\*/, 'comment.doc.invalid'],
            [/\*\//, 'comment.doc', '@pop'],
            [/[\/*]/, 'comment.doc']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2tvdGxpbi9rb3RsaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQO0FBQ0Esa0VBQWtFLElBQUksTUFBTTtBQUM1RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsd0JBQXdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoianMvZjg3YWMyMjAxNmZhNGEwOTA0OTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICAvLyB0aGUgZGVmYXVsdCBzZXBhcmF0b3JzIGV4Y2VwdCBgQCRgXG4gICAgd29yZFBhdHRlcm46IC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxgXFx+XFwhXFwjXFwlXFxeXFwmXFwqXFwoXFwpXFwtXFw9XFwrXFxbXFx7XFxdXFx9XFxcXFxcfFxcO1xcOlxcJ1xcXCJcXCxcXC5cXDxcXD5cXC9cXD9cXHNdKykvZyxcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJy8qJywgJyovJ10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddLFxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICc8JywgY2xvc2U6ICc+JyB9LFxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyovL1xcXFxzKig/Oig/OiM/cmVnaW9uXFxcXGIpfCg/OjxlZGl0b3ItZm9sZFxcXFxiKSlcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqLy9cXFxccyooPzooPzojP2VuZHJlZ2lvblxcXFxiKXwoPzo8L2VkaXRvci1mb2xkPikpXCIpXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJy5rdCcsXG4gICAga2V5d29yZHM6IFtcbiAgICAgICAgJ2FzJywgJ2FzPycsICdicmVhaycsICdjbGFzcycsICdjb250aW51ZScsICdkbycsICdlbHNlJywgJ2ZhbHNlJywgJ2ZvcicsICdmdW4nLCAnaWYnLFxuICAgICAgICAnaW4nLCAnIWluJywgJ2ludGVyZmFjZScsICdpcycsICchaXMnLCAnbnVsbCcsICdvYmplY3QnLCAncGFja2FnZScsICdyZXR1cm4nLCAnc3VwZXInLFxuICAgICAgICAndGhpcycsICd0aHJvdycsICd0cnVlJywgJ3RyeScsICd0eXBlYWxpYXMnLCAndmFsJywgJ3ZhcicsICd3aGVuJywgJ3doaWxlJywgJ2J5JyxcbiAgICAgICAgJ2NhdGNoJywgJ2NvbnN0cnVjdG9yJywgJ2RlbGVnYXRlJywgJ2R5bmFtaWMnLCAnZmllbGQnLCAnZmlsZScsICdmaW5hbGx5JywgJ2dldCcsXG4gICAgICAgICdpbXBvcnQnLCAnaW5pdCcsICdwYXJhbScsICdwcm9wZXJ0eScsICdyZWNlaXZlcicsICdzZXQnLCAnc2V0cGFyYW0nLCAnd2hlcmUnLCAnYWN0dWFsJyxcbiAgICAgICAgJ2Fic3RyYWN0JywgJ2Fubm90YXRpb24nLCAnY29tcGFuaW9uJywgJ2NvbnN0JywgJ2Nyb3NzaW5saW5lJywgJ2RhdGEnLCAnZW51bScsICdleHBlY3QnLFxuICAgICAgICAnZXh0ZXJuYWwnLCAnZmluYWwnLCAnaW5maXgnLCAnaW5saW5lJywgJ2lubmVyJywgJ2ludGVybmFsJywgJ2xhdGVpbml0JywgJ25vaW5saW5lJyxcbiAgICAgICAgJ29wZW4nLCAnb3BlcmF0b3InLCAnb3V0JywgJ292ZXJyaWRlJywgJ3ByaXZhdGUnLCAncHJvdGVjdGVkJywgJ3B1YmxpYycsICdyZWlmaWVkJyxcbiAgICAgICAgJ3NlYWxlZCcsICdzdXNwZW5kJywgJ3RhaWxyZWMnLCAndmFyYXJnJywgJ2ZpZWxkJywgJ2l0J1xuICAgIF0sXG4gICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICcrJywgJy0nLCAnKicsICcvJywgJyUnLCAnPScsICcrPScsICctPScsICcqPScsICcvPScsXG4gICAgICAgICclPScsICcrKycsICctLScsICcmJicsICd8fCcsICchJywgJz09JywgJyE9JywgJz09PScsXG4gICAgICAgICchPT0nLCAnPicsICc8JywgJzw9JywgJz49JywgJ1snLCAnXScsICchIScsICc/LicsICc/OicsXG4gICAgICAgICc6OicsICcuLicsICc6JywgJz8nLCAnLT4nLCAnQCcsICc7JywgJyQnLCAnXydcbiAgICBdLFxuICAgIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFwvXFxeJV0rLyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICAgIGRpZ2l0czogL1xcZCsoXytcXGQrKSovLFxuICAgIG9jdGFsZGlnaXRzOiAvWzAtN10rKF8rWzAtN10rKSovLFxuICAgIGJpbmFyeWRpZ2l0czogL1swLTFdKyhfK1swLTFdKykqLyxcbiAgICBoZXhkaWdpdHM6IC9bWzAtOWEtZkEtRl0rKF8rWzAtOWEtZkEtRl0rKSovLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBjbGFzcyBuYW1lIGhpZ2hsaWdodGluZ1xuICAgICAgICAgICAgWy9bQS1aXVtcXHdcXCRdKi8sICd0eXBlLmlkZW50aWZpZXInXSxcbiAgICAgICAgICAgIC8vIGlkZW50aWZpZXJzIGFuZCBrZXl3b3Jkc1xuICAgICAgICAgICAgWy9bYS16QS1aXyRdW1xcdyRdKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC4kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcnMgYW5kIG9wZXJhdG9yc1xuICAgICAgICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BvcGVyYXRvcnMnOiAnZGVsaW1pdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIEAgYW5ub3RhdGlvbnMuXG4gICAgICAgICAgICBbL0BcXHMqW2EtekEtWl9cXCRdW1xcd1xcJF0qLywgJ2Fubm90YXRpb24nXSxcbiAgICAgICAgICAgIC8vIG51bWJlcnNcbiAgICAgICAgICAgIFsvKEBkaWdpdHMpW2VFXShbXFwtK10/KEBkaWdpdHMpKT9bZkZkRF0/LywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8oQGRpZ2l0cylcXC4oQGRpZ2l0cykoW2VFXVtcXC0rXT8oQGRpZ2l0cykpP1tmRmREXT8vLCAnbnVtYmVyLmZsb2F0J10sXG4gICAgICAgICAgICBbLzBbeFhdKEBoZXhkaWdpdHMpW0xsXT8vLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8wKEBvY3RhbGRpZ2l0cylbTGxdPy8sICdudW1iZXIub2N0YWwnXSxcbiAgICAgICAgICAgIFsvMFtiQl0oQGJpbmFyeWRpZ2l0cylbTGxdPy8sICdudW1iZXIuYmluYXJ5J10sXG4gICAgICAgICAgICBbLyhAZGlnaXRzKVtmRmREXS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvKEBkaWdpdHMpW2xMXT8vLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXI6IGFmdGVyIG51bWJlciBiZWNhdXNlIG9mIC5cXGQgZmxvYXRzXG4gICAgICAgICAgICBbL1s7LC5dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0BzdHJpbmcnXSxcbiAgICAgICAgICAgIC8vIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIFsvJ1teXFxcXCddJy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5pbnZhbGlkJ11cbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy9cXC9cXCpcXCooPyFcXC8pLywgJ2NvbW1lbnQuZG9jJywgJ0BqYXZhZG9jJ10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcLy4qJC8sICdjb21tZW50J10sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXCpcXC8vLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1tcXC8qXS8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgLy9JZGVudGljYWwgY29weSBvZiBjb21tZW50IGFib3ZlLCBleGNlcHQgZm9yIHRoZSBhZGRpdGlvbiBvZiAuZG9jXG4gICAgICAgIGphdmFkb2M6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudC5kb2MnXSxcbiAgICAgICAgICAgIC8vIFsvXFwvXFwqLywgJ2NvbW1lbnQuZG9jJywgJ0BwdXNoJyBdLCAgICAvLyBuZXN0ZWQgY29tbWVudCBub3QgYWxsb3dlZCA6LShcbiAgICAgICAgICAgIFsvXFwvXFwqLywgJ2NvbW1lbnQuZG9jLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQuZG9jJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcLypdLywgJ2NvbW1lbnQuZG9jJ11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAcG9wJ11cbiAgICAgICAgXSxcbiAgICB9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=