(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/shell/shell.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/shell/shell.js ***!
  \**************************************************************************/
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
        lineComment: '#',
    },
    brackets: [['{', '}'], ['[', ']'], ['(', ')']],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: '`', close: '`' },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: '`', close: '`' },
    ],
};
var language = {
    defaultToken: '',
    ignoreCase: true,
    tokenPostfix: '.shell',
    brackets: [
        { token: 'delimiter.bracket', open: '{', close: '}' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.square', open: '[', close: ']' },
    ],
    keywords: [
        'if',
        'then',
        'do',
        'else',
        'elif',
        'while',
        'until',
        'for',
        'in',
        'esac',
        'fi',
        'fin',
        'fil',
        'done',
        'exit',
        'set',
        'unset',
        'export',
        'function',
    ],
    builtins: [
        'ab',
        'awk',
        'bash',
        'beep',
        'cat',
        'cc',
        'cd',
        'chown',
        'chmod',
        'chroot',
        'clear',
        'cp',
        'curl',
        'cut',
        'diff',
        'echo',
        'find',
        'gawk',
        'gcc',
        'get',
        'git',
        'grep',
        'hg',
        'kill',
        'killall',
        'ln',
        'ls',
        'make',
        'mkdir',
        'openssl',
        'mv',
        'nc',
        'node',
        'npm',
        'ping',
        'ps',
        'restart',
        'rm',
        'rmdir',
        'sed',
        'service',
        'sh',
        'shopt',
        'shred',
        'source',
        'sort',
        'sleep',
        'ssh',
        'start',
        'stop',
        'su',
        'sudo',
        'svn',
        'tee',
        'telnet',
        'top',
        'touch',
        'vi',
        'vim',
        'wall',
        'wc',
        'wget',
        'who',
        'write',
        'yes',
        'zsh',
    ],
    // we include these common regular expressions
    symbols: /[=><!~?&|+\-*\/\^;\.,]+/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            { include: '@whitespace' },
            [
                /[a-zA-Z]\w*/,
                {
                    cases: {
                        '@keywords': 'keyword',
                        '@builtins': 'type.identifier',
                        '@default': ''
                    },
                },
            ],
            { include: '@strings' },
            { include: '@parameters' },
            { include: '@heredoc' },
            [/[{}\[\]()]/, '@brackets'],
            [/-+\w+/, 'attribute.name'],
            [/@symbols/, 'delimiter'],
            { include: '@numbers' },
            [/[,;]/, 'delimiter'],
        ],
        whitespace: [
            [/\s+/, 'white'],
            [/(^#!.*$)/, 'metatag'],
            [/(^#.*$)/, 'comment'],
        ],
        numbers: [
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
            [/\d+/, 'number'],
        ],
        // Recognize strings, including those broken across lines
        strings: [
            [/'/, 'string', '@stringBody'],
            [/"/, 'string', '@dblStringBody']
        ],
        stringBody: [
            [/'/, 'string', '@popall'],
            [/./, 'string'],
        ],
        dblStringBody: [
            [/"/, 'string', '@popall'],
            [/./, 'string'],
        ],
        heredoc: [
            [/(<<[-<]?)(\s*)(['"`]?)([\w\-]+)(['"`]?)/, ['constants', 'white', 'string.heredoc.delimiter', 'string.heredoc', 'string.heredoc.delimiter']]
        ],
        parameters: [
            [/\$\d+/, 'variable.predefined'],
            [/\$\w+/, 'variable'],
            [/\$[*@#?\-$!0_]/, 'variable'],
            [/\$'/, 'variable', '@parameterBodyQuote'],
            [/\$"/, 'variable', '@parameterBodyDoubleQuote'],
            [/\$\(/, 'variable', '@parameterBodyParen'],
            [/\$\{/, 'variable', '@parameterBodyCurlyBrace'],
        ],
        parameterBodyQuote: [
            [/[^#:%*@\-!_']+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/[']/, 'variable', '@pop'],
        ],
        parameterBodyDoubleQuote: [
            [/[^#:%*@\-!_"]+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/["]/, 'variable', '@pop'],
        ],
        parameterBodyParen: [
            [/[^#:%*@\-!_)]+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/[)]/, 'variable', '@pop'],
        ],
        parameterBodyCurlyBrace: [
            [/[^#:%*@\-!_}]+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/[}]/, 'variable', '@pop'],
        ],
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3NoZWxsL3NoZWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNhO0FBQ047QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMscUNBQXFDLFlBQVksR0FBRztBQUM3RCxTQUFTLHdEQUF3RDtBQUNqRSxTQUFTLG1EQUFtRDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHNCQUFzQjtBQUNuQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9mZjZiYjViNmMzNGNkOTcyYjA2Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnIycsXG4gICAgfSxcbiAgICBicmFja2V0czogW1sneycsICd9J10sIFsnWycsICddJ10sIFsnKCcsICcpJ11dLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfSxcbiAgICAgICAgeyBvcGVuOiAnYCcsIGNsb3NlOiAnYCcgfSxcbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfSxcbiAgICAgICAgeyBvcGVuOiAnYCcsIGNsb3NlOiAnYCcgfSxcbiAgICBdLFxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgIHRva2VuUG9zdGZpeDogJy5zaGVsbCcsXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0Jywgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5zcXVhcmUnLCBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICBdLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdpZicsXG4gICAgICAgICd0aGVuJyxcbiAgICAgICAgJ2RvJyxcbiAgICAgICAgJ2Vsc2UnLFxuICAgICAgICAnZWxpZicsXG4gICAgICAgICd3aGlsZScsXG4gICAgICAgICd1bnRpbCcsXG4gICAgICAgICdmb3InLFxuICAgICAgICAnaW4nLFxuICAgICAgICAnZXNhYycsXG4gICAgICAgICdmaScsXG4gICAgICAgICdmaW4nLFxuICAgICAgICAnZmlsJyxcbiAgICAgICAgJ2RvbmUnLFxuICAgICAgICAnZXhpdCcsXG4gICAgICAgICdzZXQnLFxuICAgICAgICAndW5zZXQnLFxuICAgICAgICAnZXhwb3J0JyxcbiAgICAgICAgJ2Z1bmN0aW9uJyxcbiAgICBdLFxuICAgIGJ1aWx0aW5zOiBbXG4gICAgICAgICdhYicsXG4gICAgICAgICdhd2snLFxuICAgICAgICAnYmFzaCcsXG4gICAgICAgICdiZWVwJyxcbiAgICAgICAgJ2NhdCcsXG4gICAgICAgICdjYycsXG4gICAgICAgICdjZCcsXG4gICAgICAgICdjaG93bicsXG4gICAgICAgICdjaG1vZCcsXG4gICAgICAgICdjaHJvb3QnLFxuICAgICAgICAnY2xlYXInLFxuICAgICAgICAnY3AnLFxuICAgICAgICAnY3VybCcsXG4gICAgICAgICdjdXQnLFxuICAgICAgICAnZGlmZicsXG4gICAgICAgICdlY2hvJyxcbiAgICAgICAgJ2ZpbmQnLFxuICAgICAgICAnZ2F3aycsXG4gICAgICAgICdnY2MnLFxuICAgICAgICAnZ2V0JyxcbiAgICAgICAgJ2dpdCcsXG4gICAgICAgICdncmVwJyxcbiAgICAgICAgJ2hnJyxcbiAgICAgICAgJ2tpbGwnLFxuICAgICAgICAna2lsbGFsbCcsXG4gICAgICAgICdsbicsXG4gICAgICAgICdscycsXG4gICAgICAgICdtYWtlJyxcbiAgICAgICAgJ21rZGlyJyxcbiAgICAgICAgJ29wZW5zc2wnLFxuICAgICAgICAnbXYnLFxuICAgICAgICAnbmMnLFxuICAgICAgICAnbm9kZScsXG4gICAgICAgICducG0nLFxuICAgICAgICAncGluZycsXG4gICAgICAgICdwcycsXG4gICAgICAgICdyZXN0YXJ0JyxcbiAgICAgICAgJ3JtJyxcbiAgICAgICAgJ3JtZGlyJyxcbiAgICAgICAgJ3NlZCcsXG4gICAgICAgICdzZXJ2aWNlJyxcbiAgICAgICAgJ3NoJyxcbiAgICAgICAgJ3Nob3B0JyxcbiAgICAgICAgJ3NocmVkJyxcbiAgICAgICAgJ3NvdXJjZScsXG4gICAgICAgICdzb3J0JyxcbiAgICAgICAgJ3NsZWVwJyxcbiAgICAgICAgJ3NzaCcsXG4gICAgICAgICdzdGFydCcsXG4gICAgICAgICdzdG9wJyxcbiAgICAgICAgJ3N1JyxcbiAgICAgICAgJ3N1ZG8nLFxuICAgICAgICAnc3ZuJyxcbiAgICAgICAgJ3RlZScsXG4gICAgICAgICd0ZWxuZXQnLFxuICAgICAgICAndG9wJyxcbiAgICAgICAgJ3RvdWNoJyxcbiAgICAgICAgJ3ZpJyxcbiAgICAgICAgJ3ZpbScsXG4gICAgICAgICd3YWxsJyxcbiAgICAgICAgJ3djJyxcbiAgICAgICAgJ3dnZXQnLFxuICAgICAgICAnd2hvJyxcbiAgICAgICAgJ3dyaXRlJyxcbiAgICAgICAgJ3llcycsXG4gICAgICAgICd6c2gnLFxuICAgIF0sXG4gICAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICAgIHN5bWJvbHM6IC9bPT48IX4/JnwrXFwtKlxcL1xcXjtcXC4sXSsvLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvW2EtekEtWl1cXHcqLyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGlucyc6ICd0eXBlLmlkZW50aWZpZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BzdHJpbmdzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHBhcmFtZXRlcnMnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAaGVyZWRvYycgfSxcbiAgICAgICAgICAgIFsvW3t9XFxbXFxdKCldLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy8tK1xcdysvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvQHN5bWJvbHMvLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAbnVtYmVycycgfSxcbiAgICAgICAgICAgIFsvWyw7XS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9cXHMrLywgJ3doaXRlJ10sXG4gICAgICAgICAgICBbLyheIyEuKiQpLywgJ21ldGF0YWcnXSxcbiAgICAgICAgICAgIFsvKF4jLiokKS8sICdjb21tZW50J10sXG4gICAgICAgIF0sXG4gICAgICAgIG51bWJlcnM6IFtcbiAgICAgICAgICAgIFsvXFxkKlxcLlxcZCsoW2VFXVtcXC0rXT9cXGQrKT8vLCAnbnVtYmVyLmZsb2F0J10sXG4gICAgICAgICAgICBbLzBbeFhdWzAtOWEtZkEtRl9dKlswLTlhLWZBLUZdLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvXFxkKy8sICdudW1iZXInXSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gUmVjb2duaXplIHN0cmluZ3MsIGluY2x1ZGluZyB0aG9zZSBicm9rZW4gYWNyb3NzIGxpbmVzXG4gICAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcnLCAnQHN0cmluZ0JvZHknXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0BkYmxTdHJpbmdCb2R5J11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nQm9keTogW1xuICAgICAgICAgICAgWy8nLywgJ3N0cmluZycsICdAcG9wYWxsJ10sXG4gICAgICAgICAgICBbLy4vLCAnc3RyaW5nJ10sXG4gICAgICAgIF0sXG4gICAgICAgIGRibFN0cmluZ0JvZHk6IFtcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0Bwb3BhbGwnXSxcbiAgICAgICAgICAgIFsvLi8sICdzdHJpbmcnXSxcbiAgICAgICAgXSxcbiAgICAgICAgaGVyZWRvYzogW1xuICAgICAgICAgICAgWy8oPDxbLTxdPykoXFxzKikoWydcImBdPykoW1xcd1xcLV0rKShbJ1wiYF0/KS8sIFsnY29uc3RhbnRzJywgJ3doaXRlJywgJ3N0cmluZy5oZXJlZG9jLmRlbGltaXRlcicsICdzdHJpbmcuaGVyZWRvYycsICdzdHJpbmcuaGVyZWRvYy5kZWxpbWl0ZXInXV1cbiAgICAgICAgXSxcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgICAgWy9cXCRcXGQrLywgJ3ZhcmlhYmxlLnByZWRlZmluZWQnXSxcbiAgICAgICAgICAgIFsvXFwkXFx3Ky8sICd2YXJpYWJsZSddLFxuICAgICAgICAgICAgWy9cXCRbKkAjP1xcLSQhMF9dLywgJ3ZhcmlhYmxlJ10sXG4gICAgICAgICAgICBbL1xcJCcvLCAndmFyaWFibGUnLCAnQHBhcmFtZXRlckJvZHlRdW90ZSddLFxuICAgICAgICAgICAgWy9cXCRcIi8sICd2YXJpYWJsZScsICdAcGFyYW1ldGVyQm9keURvdWJsZVF1b3RlJ10sXG4gICAgICAgICAgICBbL1xcJFxcKC8sICd2YXJpYWJsZScsICdAcGFyYW1ldGVyQm9keVBhcmVuJ10sXG4gICAgICAgICAgICBbL1xcJFxcey8sICd2YXJpYWJsZScsICdAcGFyYW1ldGVyQm9keUN1cmx5QnJhY2UnXSxcbiAgICAgICAgXSxcbiAgICAgICAgcGFyYW1ldGVyQm9keVF1b3RlOiBbXG4gICAgICAgICAgICBbL1teIzolKkBcXC0hXyddKy8sICd2YXJpYWJsZSddLFxuICAgICAgICAgICAgWy9bIzolKkBcXC0hX10vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbL1snXS8sICd2YXJpYWJsZScsICdAcG9wJ10sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtZXRlckJvZHlEb3VibGVRdW90ZTogW1xuICAgICAgICAgICAgWy9bXiM6JSpAXFwtIV9cIl0rLywgJ3ZhcmlhYmxlJ10sXG4gICAgICAgICAgICBbL1sjOiUqQFxcLSFfXS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvW1wiXS8sICd2YXJpYWJsZScsICdAcG9wJ10sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtZXRlckJvZHlQYXJlbjogW1xuICAgICAgICAgICAgWy9bXiM6JSpAXFwtIV8pXSsvLCAndmFyaWFibGUnXSxcbiAgICAgICAgICAgIFsvWyM6JSpAXFwtIV9dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bKV0vLCAndmFyaWFibGUnLCAnQHBvcCddLFxuICAgICAgICBdLFxuICAgICAgICBwYXJhbWV0ZXJCb2R5Q3VybHlCcmFjZTogW1xuICAgICAgICAgICAgWy9bXiM6JSpAXFwtIV99XSsvLCAndmFyaWFibGUnXSxcbiAgICAgICAgICAgIFsvWyM6JSpAXFwtIV9dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bfV0vLCAndmFyaWFibGUnLCAnQHBvcCddLFxuICAgICAgICBdLFxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9