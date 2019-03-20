(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[53],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.js ***!
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
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
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
    ]
};
var language = {
    tokenPostfix: '.tcl',
    specialFunctions: [
        'set', 'unset', 'rename', 'variable', 'proc', 'coroutine',
        'foreach',
        'incr', 'append',
        'lappend', 'linsert', 'lreplace'
    ],
    mainFunctions: [
        'if', 'then', 'elseif', 'else', 'case', 'switch', 'while', 'for',
        'break', 'continue', 'return',
        'package', 'namespace',
        'catch', 'exit',
        'eval', 'expr', 'uplevel', 'upvar'
    ],
    builtinFunctions: [
        'file', 'info', 'concat', 'join', 'lindex',
        'list', 'llength', 'lrange', 'lsearch', 'lsort', 'split',
        'array', 'parray', 'binary', 'format', 'regexp', 'regsub', 'scan', 'string',
        'subst', 'dict', 'cd', 'clock', 'exec', 'glob', 'pid', 'pwd', 'close', 'eof', 'fblocked',
        'fconfigure', 'fcopy', 'fileevent', 'flush', 'gets', 'open', 'puts', 'read', 'seek',
        'socket', 'tell', 'interp', 'after', 'auto_execok',
        'auto_load', 'auto_mkindex', 'auto_reset', 'bgerror', 'error',
        'global', 'history', 'load', 'source', 'time', 'trace',
        'unknown', 'unset', 'update', 'vwait', 'winfo', 'wm', 'bind', 'event',
        'pack', 'place', 'grid', 'font', 'bell', 'clipboard', 'destroy', 'focus', 'grab', 'lower',
        'option', 'raise', 'selection', 'send', 'tk', 'tkwait', 'tk_bisque', 'tk_focusNext',
        'tk_focusPrev', 'tk_focusFollowsMouse', 'tk_popup', 'tk_setPalette'
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    brackets: [
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.square' }
    ],
    escapes: /\\(?:[abfnrtv\\"'\[\]\{\};\$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    variables: /(?:\$+(?:(?:\:\:?)?[a-zA-Z_]\w*)+)/,
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-zA-Z_]\w*/, { cases: {
                        '@specialFunctions': { token: 'keyword.flow', next: '@specialFunc' },
                        '@mainFunctions': 'keyword',
                        '@builtinFunctions': 'variable',
                        '@default': 'operator.scss'
                    } }],
            [/\s+\-+(?!\d|\.)\w*|{\*}/, 'metatag'],
            // whitespace
            { include: '@whitespace' },
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/@symbols/, 'operator'],
            [/\$+(?:\:\:)?\{/, { token: 'identifier', next: '@nestedVariable' }],
            [/@variables/, 'type.identifier'],
            [/\.(?!\d|\.)[\w\-]*/, 'operator.sql'],
            // numbers
            [/\d+(\.\d+)?/, 'number'],
            [/\d+/, 'number'],
            // delimiter
            [/;/, 'delimiter'],
            // strings
            [/"/, { token: 'string.quote', bracket: '@open', next: '@dstring' }],
            [/'/, { token: 'string.quote', bracket: '@open', next: '@sstring' }]
        ],
        dstring: [
            [/\[/, { token: '@brackets', next: '@nestedCall' }],
            [/\$+(?:\:\:)?\{/, { token: 'identifier', next: '@nestedVariable' }],
            [/@variables/, 'type.identifier'],
            [/[^\\$\[\]"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        ],
        sstring: [
            [/\[/, { token: '@brackets', next: '@nestedCall' }],
            [/\$+(?:\:\:)?\{/, { token: 'identifier', next: '@nestedVariable' }],
            [/@variables/, 'type.identifier'],
            [/[^\\$\[\]']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/#.*\\$/, { token: 'comment', next: '@newlineComment' }],
            [/#.*(?!\\)$/, 'comment']
        ],
        newlineComment: [
            [/.*\\$/, 'comment'],
            [/.*(?!\\)$/, { token: 'comment', next: '@pop' }]
        ],
        nestedVariable: [
            [/[^\{\}\$]+/, 'type.identifier'],
            [/\}/, { token: 'identifier', next: '@pop' }]
        ],
        nestedCall: [
            [/\[/, { token: '@brackets', next: '@nestedCall' }],
            [/\]/, { token: '@brackets', next: '@pop' }],
            { include: 'root' }
        ],
        specialFunc: [
            [/"/, { token: 'string', next: '@dstring' }],
            [/'/, { token: 'string', next: '@sstring' }],
            [/(?:(?:\:\:?)?[a-zA-Z_]\w*)+/, { token: 'type', next: '@pop' }],
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3RjbC90Y2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHdEQUF3RDtBQUNqRSxTQUFTLFNBQVMsWUFBWSw2QkFBNkI7QUFDM0QsU0FBUztBQUNUO0FBQ0EscUNBQXFDLEdBQUcsaUJBQWlCLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qiw4Q0FBOEMsOENBQThDO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCLGtDQUFrQyxHQUFHO0FBQ3JDO0FBQ0EsYUFBYSx5QkFBeUI7QUFDdEM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSw0QkFBNEIsSUFBSSwrQ0FBK0M7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsbUJBQW1CLDREQUE0RDtBQUMvRSxtQkFBbUIsNERBQTREO0FBQy9FO0FBQ0E7QUFDQSxvQkFBb0IsMENBQTBDO0FBQzlELDRCQUE0QixJQUFJLCtDQUErQztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseURBQXlEO0FBQzVFO0FBQ0E7QUFDQSxvQkFBb0IsMENBQTBDO0FBQzlELDRCQUE0QixJQUFJLCtDQUErQztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseURBQXlEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0Q0FBNEM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUNBQWlDO0FBQzVEO0FBQ0E7QUFDQSxrQkFBa0IsRUFBRTtBQUNwQixnQkFBZ0IsSUFBSSxvQ0FBb0M7QUFDeEQ7QUFDQTtBQUNBLG9CQUFvQiwwQ0FBMEM7QUFDOUQsb0JBQW9CLG1DQUFtQztBQUN2RCxhQUFhO0FBQ2I7QUFDQTtBQUNBLG1CQUFtQixvQ0FBb0M7QUFDdkQsbUJBQW1CLG9DQUFvQztBQUN2RCw2Q0FBNkMsOEJBQThCO0FBQzNFO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy85ZjJmMTIwNGJjYTRhOWQyMzU0NC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICBdXG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICB0b2tlblBvc3RmaXg6ICcudGNsJyxcbiAgICBzcGVjaWFsRnVuY3Rpb25zOiBbXG4gICAgICAgICdzZXQnLCAndW5zZXQnLCAncmVuYW1lJywgJ3ZhcmlhYmxlJywgJ3Byb2MnLCAnY29yb3V0aW5lJyxcbiAgICAgICAgJ2ZvcmVhY2gnLFxuICAgICAgICAnaW5jcicsICdhcHBlbmQnLFxuICAgICAgICAnbGFwcGVuZCcsICdsaW5zZXJ0JywgJ2xyZXBsYWNlJ1xuICAgIF0sXG4gICAgbWFpbkZ1bmN0aW9uczogW1xuICAgICAgICAnaWYnLCAndGhlbicsICdlbHNlaWYnLCAnZWxzZScsICdjYXNlJywgJ3N3aXRjaCcsICd3aGlsZScsICdmb3InLFxuICAgICAgICAnYnJlYWsnLCAnY29udGludWUnLCAncmV0dXJuJyxcbiAgICAgICAgJ3BhY2thZ2UnLCAnbmFtZXNwYWNlJyxcbiAgICAgICAgJ2NhdGNoJywgJ2V4aXQnLFxuICAgICAgICAnZXZhbCcsICdleHByJywgJ3VwbGV2ZWwnLCAndXB2YXInXG4gICAgXSxcbiAgICBidWlsdGluRnVuY3Rpb25zOiBbXG4gICAgICAgICdmaWxlJywgJ2luZm8nLCAnY29uY2F0JywgJ2pvaW4nLCAnbGluZGV4JyxcbiAgICAgICAgJ2xpc3QnLCAnbGxlbmd0aCcsICdscmFuZ2UnLCAnbHNlYXJjaCcsICdsc29ydCcsICdzcGxpdCcsXG4gICAgICAgICdhcnJheScsICdwYXJyYXknLCAnYmluYXJ5JywgJ2Zvcm1hdCcsICdyZWdleHAnLCAncmVnc3ViJywgJ3NjYW4nLCAnc3RyaW5nJyxcbiAgICAgICAgJ3N1YnN0JywgJ2RpY3QnLCAnY2QnLCAnY2xvY2snLCAnZXhlYycsICdnbG9iJywgJ3BpZCcsICdwd2QnLCAnY2xvc2UnLCAnZW9mJywgJ2ZibG9ja2VkJyxcbiAgICAgICAgJ2Zjb25maWd1cmUnLCAnZmNvcHknLCAnZmlsZWV2ZW50JywgJ2ZsdXNoJywgJ2dldHMnLCAnb3BlbicsICdwdXRzJywgJ3JlYWQnLCAnc2VlaycsXG4gICAgICAgICdzb2NrZXQnLCAndGVsbCcsICdpbnRlcnAnLCAnYWZ0ZXInLCAnYXV0b19leGVjb2snLFxuICAgICAgICAnYXV0b19sb2FkJywgJ2F1dG9fbWtpbmRleCcsICdhdXRvX3Jlc2V0JywgJ2JnZXJyb3InLCAnZXJyb3InLFxuICAgICAgICAnZ2xvYmFsJywgJ2hpc3RvcnknLCAnbG9hZCcsICdzb3VyY2UnLCAndGltZScsICd0cmFjZScsXG4gICAgICAgICd1bmtub3duJywgJ3Vuc2V0JywgJ3VwZGF0ZScsICd2d2FpdCcsICd3aW5mbycsICd3bScsICdiaW5kJywgJ2V2ZW50JyxcbiAgICAgICAgJ3BhY2snLCAncGxhY2UnLCAnZ3JpZCcsICdmb250JywgJ2JlbGwnLCAnY2xpcGJvYXJkJywgJ2Rlc3Ryb3knLCAnZm9jdXMnLCAnZ3JhYicsICdsb3dlcicsXG4gICAgICAgICdvcHRpb24nLCAncmFpc2UnLCAnc2VsZWN0aW9uJywgJ3NlbmQnLCAndGsnLCAndGt3YWl0JywgJ3RrX2Jpc3F1ZScsICd0a19mb2N1c05leHQnLFxuICAgICAgICAndGtfZm9jdXNQcmV2JywgJ3RrX2ZvY3VzRm9sbG93c01vdXNlJywgJ3RrX3BvcHVwJywgJ3RrX3NldFBhbGV0dGUnXG4gICAgXSxcbiAgICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFwvXFxeJV0rLyxcbiAgICBicmFja2V0czogW1xuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCB0b2tlbjogJ2RlbGltaXRlci5jdXJseScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScgfVxuICAgIF0sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIidcXFtcXF1cXHtcXH07XFwkXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gICAgdmFyaWFibGVzOiAvKD86XFwkKyg/Oig/OlxcOlxcOj8pP1thLXpBLVpfXVxcdyopKykvLFxuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHsgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAc3BlY2lhbEZ1bmN0aW9ucyc6IHsgdG9rZW46ICdrZXl3b3JkLmZsb3cnLCBuZXh0OiAnQHNwZWNpYWxGdW5jJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BtYWluRnVuY3Rpb25zJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BidWlsdGluRnVuY3Rpb25zJzogJ3ZhcmlhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdvcGVyYXRvci5zY3NzJ1xuICAgICAgICAgICAgICAgICAgICB9IH1dLFxuICAgICAgICAgICAgWy9cXHMrXFwtKyg/IVxcZHxcXC4pXFx3Knx7XFwqfS8sICdtZXRhdGFnJ10sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcnMgYW5kIG9wZXJhdG9yc1xuICAgICAgICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywgJ29wZXJhdG9yJ10sXG4gICAgICAgICAgICBbL1xcJCsoPzpcXDpcXDopP1xcey8sIHsgdG9rZW46ICdpZGVudGlmaWVyJywgbmV4dDogJ0BuZXN0ZWRWYXJpYWJsZScgfV0sXG4gICAgICAgICAgICBbL0B2YXJpYWJsZXMvLCAndHlwZS5pZGVudGlmaWVyJ10sXG4gICAgICAgICAgICBbL1xcLig/IVxcZHxcXC4pW1xcd1xcLV0qLywgJ29wZXJhdG9yLnNxbCddLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQrKFxcLlxcZCspPy8sICdudW1iZXInXSxcbiAgICAgICAgICAgIFsvXFxkKy8sICdudW1iZXInXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlclxuICAgICAgICAgICAgWy87LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQG9wZW4nLCBuZXh0OiAnQGRzdHJpbmcnIH1dLFxuICAgICAgICAgICAgWy8nLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIGJyYWNrZXQ6ICdAb3BlbicsIG5leHQ6ICdAc3N0cmluZycgfV1cbiAgICAgICAgXSxcbiAgICAgICAgZHN0cmluZzogW1xuICAgICAgICAgICAgWy9cXFsvLCB7IHRva2VuOiAnQGJyYWNrZXRzJywgbmV4dDogJ0BuZXN0ZWRDYWxsJyB9XSxcbiAgICAgICAgICAgIFsvXFwkKyg/OlxcOlxcOik/XFx7LywgeyB0b2tlbjogJ2lkZW50aWZpZXInLCBuZXh0OiAnQG5lc3RlZFZhcmlhYmxlJyB9XSxcbiAgICAgICAgICAgIFsvQHZhcmlhYmxlcy8sICd0eXBlLmlkZW50aWZpZXInXSxcbiAgICAgICAgICAgIFsvW15cXFxcJFxcW1xcXVwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXCIvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgYnJhY2tldDogJ0BjbG9zZScsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgc3N0cmluZzogW1xuICAgICAgICAgICAgWy9cXFsvLCB7IHRva2VuOiAnQGJyYWNrZXRzJywgbmV4dDogJ0BuZXN0ZWRDYWxsJyB9XSxcbiAgICAgICAgICAgIFsvXFwkKyg/OlxcOlxcOik/XFx7LywgeyB0b2tlbjogJ2lkZW50aWZpZXInLCBuZXh0OiAnQG5lc3RlZFZhcmlhYmxlJyB9XSxcbiAgICAgICAgICAgIFsvQHZhcmlhYmxlcy8sICd0eXBlLmlkZW50aWZpZXInXSxcbiAgICAgICAgICAgIFsvW15cXFxcJFxcW1xcXSddKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy8nLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIGJyYWNrZXQ6ICdAY2xvc2UnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJ3doaXRlJ10sXG4gICAgICAgICAgICBbLyMuKlxcXFwkLywgeyB0b2tlbjogJ2NvbW1lbnQnLCBuZXh0OiAnQG5ld2xpbmVDb21tZW50JyB9XSxcbiAgICAgICAgICAgIFsvIy4qKD8hXFxcXCkkLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICBuZXdsaW5lQ29tbWVudDogW1xuICAgICAgICAgICAgWy8uKlxcXFwkLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvLiooPyFcXFxcKSQvLCB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICBuZXN0ZWRWYXJpYWJsZTogW1xuICAgICAgICAgICAgWy9bXlxce1xcfVxcJF0rLywgJ3R5cGUuaWRlbnRpZmllciddLFxuICAgICAgICAgICAgWy9cXH0vLCB7IHRva2VuOiAnaWRlbnRpZmllcicsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICBuZXN0ZWRDYWxsOiBbXG4gICAgICAgICAgICBbL1xcWy8sIHsgdG9rZW46ICdAYnJhY2tldHMnLCBuZXh0OiAnQG5lc3RlZENhbGwnIH1dLFxuICAgICAgICAgICAgWy9cXF0vLCB7IHRva2VuOiAnQGJyYWNrZXRzJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAncm9vdCcgfVxuICAgICAgICBdLFxuICAgICAgICBzcGVjaWFsRnVuYzogW1xuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcnLCBuZXh0OiAnQGRzdHJpbmcnIH1dLFxuICAgICAgICAgICAgWy8nLywgeyB0b2tlbjogJ3N0cmluZycsIG5leHQ6ICdAc3N0cmluZycgfV0sXG4gICAgICAgICAgICBbLyg/Oig/OlxcOlxcOj8pP1thLXpBLVpfXVxcdyopKy8sIHsgdG9rZW46ICd0eXBlJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=