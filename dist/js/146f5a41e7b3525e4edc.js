(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[51],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/st/st.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/st/st.js ***!
  \********************************************************************/
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
        blockComment: ['(*', '*)'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
        ['var', 'end_var'],
        ['var_input', 'end_var'],
        ['var_output', 'end_var'],
        ['var_in_out', 'end_var'],
        ['var_temp', 'end_var'],
        ['var_global', 'end_var'],
        ['var_access', 'end_var'],
        ['var_external', 'end_var'],
        ['type', 'end_type'],
        ['struct', 'end_struct'],
        ['program', 'end_program'],
        ['function', 'end_function'],
        ['function_block', 'end_function_block'],
        ['action', 'end_action'],
        ['step', 'end_step'],
        ['initial_step', 'end_step'],
        ['transaction', 'end_transaction'],
        ['configuration', 'end_configuration'],
        ['tcp', 'end_tcp'],
        ['recource', 'end_recource'],
        ['channel', 'end_channel'],
        ['library', 'end_library'],
        ['folder', 'end_folder'],
        ['binaries', 'end_binaries'],
        ['includes', 'end_includes'],
        ['sources', 'end_sources']
    ],
    autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '/*', close: '*/' },
        { open: '\'', close: '\'', notIn: ['string_sq'] },
        { open: '"', close: '"', notIn: ['string_dq'] },
        { open: 'var', close: 'end_var' },
        { open: 'var_input', close: 'end_var' },
        { open: 'var_output', close: 'end_var' },
        { open: 'var_in_out', close: 'end_var' },
        { open: 'var_temp', close: 'end_var' },
        { open: 'var_global', close: 'end_var' },
        { open: 'var_access', close: 'end_var' },
        { open: 'var_external', close: 'end_var' },
        { open: 'type', close: 'end_type' },
        { open: 'struct', close: 'end_struct' },
        { open: 'program', close: 'end_program' },
        { open: 'function', close: 'end_function' },
        { open: 'function_block', close: 'end_function_block' },
        { open: 'action', close: 'end_action' },
        { open: 'step', close: 'end_step' },
        { open: 'initial_step', close: 'end_step' },
        { open: 'transaction', close: 'end_transaction' },
        { open: 'configuration', close: 'end_configuration' },
        { open: 'tcp', close: 'end_tcp' },
        { open: 'recource', close: 'end_recource' },
        { open: 'channel', close: 'end_channel' },
        { open: 'library', close: 'end_library' },
        { open: 'folder', close: 'end_folder' },
        { open: 'binaries', close: 'end_binaries' },
        { open: 'includes', close: 'end_includes' },
        { open: 'sources', close: 'end_sources' }
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: 'var', close: 'end_var' },
        { open: 'var_input', close: 'end_var' },
        { open: 'var_output', close: 'end_var' },
        { open: 'var_in_out', close: 'end_var' },
        { open: 'var_temp', close: 'end_var' },
        { open: 'var_global', close: 'end_var' },
        { open: 'var_access', close: 'end_var' },
        { open: 'var_external', close: 'end_var' },
        { open: 'type', close: 'end_type' },
        { open: 'struct', close: 'end_struct' },
        { open: 'program', close: 'end_program' },
        { open: 'function', close: 'end_function' },
        { open: 'function_block', close: 'end_function_block' },
        { open: 'action', close: 'end_action' },
        { open: 'step', close: 'end_step' },
        { open: 'initial_step', close: 'end_step' },
        { open: 'transaction', close: 'end_transaction' },
        { open: 'configuration', close: 'end_configuration' },
        { open: 'tcp', close: 'end_tcp' },
        { open: 'recource', close: 'end_recource' },
        { open: 'channel', close: 'end_channel' },
        { open: 'library', close: 'end_library' },
        { open: 'folder', close: 'end_folder' },
        { open: 'binaries', close: 'end_binaries' },
        { open: 'includes', close: 'end_includes' },
        { open: 'sources', close: 'end_sources' }
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
    tokenPostfix: '.st',
    ignoreCase: true,
    brackets: [
        { token: 'delimiter.curly', open: '{', close: '}' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.square', open: '[', close: ']' }
    ],
    keywords: ['if', 'end_if', 'elsif', 'else', 'case', 'of', 'to',
        'do', 'with', 'by', 'while', 'repeat', 'end_while', 'end_repeat', 'end_case',
        'for', 'end_for', 'task', 'retain', 'non_retain', 'constant', 'with', 'at',
        'exit', 'return', 'interval', 'priority', 'address', 'port', 'on_channel',
        'then', 'iec', 'file', 'uses', 'version', 'packagetype', 'displayname',
        'copyright', 'summary', 'vendor', 'common_source', 'from'],
    constant: ['false', 'true', 'null'],
    defineKeywords: [
        'var', 'var_input', 'var_output', 'var_in_out', 'var_temp', 'var_global',
        'var_access', 'var_external', 'end_var',
        'type', 'end_type', 'struct', 'end_struct', 'program', 'end_program',
        'function', 'end_function', 'function_block', 'end_function_block',
        'configuration', 'end_configuration', 'tcp', 'end_tcp', 'recource',
        'end_recource', 'channel', 'end_channel', 'library', 'end_library',
        'folder', 'end_folder', 'binaries', 'end_binaries', 'includes',
        'end_includes', 'sources', 'end_sources',
        'action', 'end_action', 'step', 'initial_step', 'end_step', 'transaction', 'end_transaction'
    ],
    typeKeywords: ['int', 'sint', 'dint', 'lint', 'usint', 'uint', 'udint', 'ulint',
        'real', 'lreal', 'time', 'date', 'time_of_day', 'date_and_time', 'string',
        'bool', 'byte', 'world', 'dworld', 'array', 'pointer', 'lworld'],
    operators: ['=', '>', '<', ':', ':=', '<=', '>=', '<>', '&', '+', '-', '*', '**',
        'MOD', '^', 'or', 'and', 'not', 'xor', 'abs', 'acos', 'asin', 'atan', 'cos',
        'exp', 'expt', 'ln', 'log', 'sin', 'sqrt', 'tan', 'sel', 'max', 'min', 'limit',
        'mux', 'shl', 'shr', 'rol', 'ror', 'indexof', 'sizeof', 'adr', 'adrinst',
        'bitadr', 'is_valid'],
    builtinVariables: [],
    builtinFunctions: ['sr', 'rs', 'tp', 'ton', 'tof', 'eq', 'ge', 'le', 'lt',
        'ne', 'round', 'trunc', 'ctd', 'сtu', 'ctud', 'r_trig', 'f_trig',
        'move', 'concat', 'delete', 'find', 'insert', 'left', 'len', 'replace',
        'right', 'rtc'],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/(T|DT|TOD)#[0-9:-_shmyd]*/, 'tag'],
            [/[A-Za-z]{1,6}#[0-9]*/, 'tag'],
            [/\%(I|Q|M)(X|B|W|D|L)[0-9\.]*/, 'tag'],
            [/\%(I|Q|M)[0-9\.]*/, 'tag'],
            [/(TO_|CTU_|CTD_|CTUD_|MUX_|SEL_)[A_Za-z]*/, 'predefined'],
            [/[A_Za-z]*(_TO_)[A_Za-z]*/, 'predefined'],
            // identifiers and keywords
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@operators': 'operators',
                        '@keywords': 'keyword',
                        '@typeKeywords': 'type',
                        '@defineKeywords': 'variable',
                        '@constant': 'constant',
                        '@builtinVariables': 'predefined',
                        '@builtinFunctions': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            { include: '@whitespace' },
            [/[;.]/, 'delimiter'],
            [/[{}()\[\]]/, '@brackets'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/16#[0-9a-fA-F]+/, 'number.hex'],
            [/2#[0-9_]+/, 'number.binary'],
            [/\d+/, 'number'],
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string_dq' }],
            [/'/, { token: 'string.quote', bracket: '@open', next: '@string_sq' }],
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ["\\*/", 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        comment2: [
            [/[^\(*]+/, 'comment'],
            [/\(\*/, 'comment', '@push'],
            ["\\*\\)", 'comment', '@pop'],
            [/[\(*]/, 'comment']
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\/.*$/, 'comment'],
            [/\/\*/, 'comment', '@comment'],
            [/\(\*/, 'comment', '@comment2'],
        ],
        string_dq: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        string_sq: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3N0L3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNhO0FBQ047QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLGdEQUFnRDtBQUN6RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLGdDQUFnQztBQUN6QyxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHFDQUFxQztBQUM5QyxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLHlDQUF5QztBQUNsRCxTQUFTLGtDQUFrQztBQUMzQyxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLHdDQUF3QztBQUNqRCxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLHNEQUFzRDtBQUMvRCxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLGtDQUFrQztBQUMzQyxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLGdEQUFnRDtBQUN6RCxTQUFTLG9EQUFvRDtBQUM3RCxTQUFTLGdDQUFnQztBQUN6QyxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLHdDQUF3QztBQUNqRCxTQUFTLHdDQUF3QztBQUNqRCxTQUFTLHNDQUFzQztBQUMvQyxTQUFTLDBDQUEwQztBQUNuRCxTQUFTLDBDQUEwQztBQUNuRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxnQ0FBZ0M7QUFDekMsU0FBUyxzQ0FBc0M7QUFDL0MsU0FBUyx1Q0FBdUM7QUFDaEQsU0FBUyx1Q0FBdUM7QUFDaEQsU0FBUyxxQ0FBcUM7QUFDOUMsU0FBUyx1Q0FBdUM7QUFDaEQsU0FBUyx1Q0FBdUM7QUFDaEQsU0FBUyx5Q0FBeUM7QUFDbEQsU0FBUyxrQ0FBa0M7QUFDM0MsU0FBUyxzQ0FBc0M7QUFDL0MsU0FBUyx3Q0FBd0M7QUFDakQsU0FBUywwQ0FBMEM7QUFDbkQsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyxzQ0FBc0M7QUFDL0MsU0FBUyxrQ0FBa0M7QUFDM0MsU0FBUywwQ0FBMEM7QUFDbkQsU0FBUyxnREFBZ0Q7QUFDekQsU0FBUyxvREFBb0Q7QUFDN0QsU0FBUyxnQ0FBZ0M7QUFDekMsU0FBUywwQ0FBMEM7QUFDbkQsU0FBUyx3Q0FBd0M7QUFDakQsU0FBUyx3Q0FBd0M7QUFDakQsU0FBUyxzQ0FBc0M7QUFDL0MsU0FBUywwQ0FBMEM7QUFDbkQsU0FBUywwQ0FBMEM7QUFDbkQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtQ0FBbUMsWUFBWSxHQUFHO0FBQzNELFNBQVMsd0RBQXdEO0FBQ2pFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWEseUJBQXlCO0FBQ3RDLGdCQUFnQjtBQUNoQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw4REFBOEQ7QUFDakYsbUJBQW1CLDhEQUE4RDtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlEQUF5RDtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlEQUF5RDtBQUM1RTtBQUNBO0FBQ0EiLCJmaWxlIjoianMvMTQ2ZjVhNDFlN2IzNTI1ZTRlZGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJygqJywgJyopJ10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddLFxuICAgICAgICBbJ3ZhcicsICdlbmRfdmFyJ10sXG4gICAgICAgIFsndmFyX2lucHV0JywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfb3V0cHV0JywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfaW5fb3V0JywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd2YXJfdGVtcCcsICdlbmRfdmFyJ10sXG4gICAgICAgIFsndmFyX2dsb2JhbCcsICdlbmRfdmFyJ10sXG4gICAgICAgIFsndmFyX2FjY2VzcycsICdlbmRfdmFyJ10sXG4gICAgICAgIFsndmFyX2V4dGVybmFsJywgJ2VuZF92YXInXSxcbiAgICAgICAgWyd0eXBlJywgJ2VuZF90eXBlJ10sXG4gICAgICAgIFsnc3RydWN0JywgJ2VuZF9zdHJ1Y3QnXSxcbiAgICAgICAgWydwcm9ncmFtJywgJ2VuZF9wcm9ncmFtJ10sXG4gICAgICAgIFsnZnVuY3Rpb24nLCAnZW5kX2Z1bmN0aW9uJ10sXG4gICAgICAgIFsnZnVuY3Rpb25fYmxvY2snLCAnZW5kX2Z1bmN0aW9uX2Jsb2NrJ10sXG4gICAgICAgIFsnYWN0aW9uJywgJ2VuZF9hY3Rpb24nXSxcbiAgICAgICAgWydzdGVwJywgJ2VuZF9zdGVwJ10sXG4gICAgICAgIFsnaW5pdGlhbF9zdGVwJywgJ2VuZF9zdGVwJ10sXG4gICAgICAgIFsndHJhbnNhY3Rpb24nLCAnZW5kX3RyYW5zYWN0aW9uJ10sXG4gICAgICAgIFsnY29uZmlndXJhdGlvbicsICdlbmRfY29uZmlndXJhdGlvbiddLFxuICAgICAgICBbJ3RjcCcsICdlbmRfdGNwJ10sXG4gICAgICAgIFsncmVjb3VyY2UnLCAnZW5kX3JlY291cmNlJ10sXG4gICAgICAgIFsnY2hhbm5lbCcsICdlbmRfY2hhbm5lbCddLFxuICAgICAgICBbJ2xpYnJhcnknLCAnZW5kX2xpYnJhcnknXSxcbiAgICAgICAgWydmb2xkZXInLCAnZW5kX2ZvbGRlciddLFxuICAgICAgICBbJ2JpbmFyaWVzJywgJ2VuZF9iaW5hcmllcyddLFxuICAgICAgICBbJ2luY2x1ZGVzJywgJ2VuZF9pbmNsdWRlcyddLFxuICAgICAgICBbJ3NvdXJjZXMnLCAnZW5kX3NvdXJjZXMnXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICcvKicsIGNsb3NlOiAnKi8nIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJywgbm90SW46IFsnc3RyaW5nX3NxJ10gfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFsnc3RyaW5nX2RxJ10gfSxcbiAgICAgICAgeyBvcGVuOiAndmFyJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfaW5wdXQnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9vdXRwdXQnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9pbl9vdXQnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl90ZW1wJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfZ2xvYmFsJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfYWNjZXNzJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfZXh0ZXJuYWwnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3R5cGUnLCBjbG9zZTogJ2VuZF90eXBlJyB9LFxuICAgICAgICB7IG9wZW46ICdzdHJ1Y3QnLCBjbG9zZTogJ2VuZF9zdHJ1Y3QnIH0sXG4gICAgICAgIHsgb3BlbjogJ3Byb2dyYW0nLCBjbG9zZTogJ2VuZF9wcm9ncmFtJyB9LFxuICAgICAgICB7IG9wZW46ICdmdW5jdGlvbicsIGNsb3NlOiAnZW5kX2Z1bmN0aW9uJyB9LFxuICAgICAgICB7IG9wZW46ICdmdW5jdGlvbl9ibG9jaycsIGNsb3NlOiAnZW5kX2Z1bmN0aW9uX2Jsb2NrJyB9LFxuICAgICAgICB7IG9wZW46ICdhY3Rpb24nLCBjbG9zZTogJ2VuZF9hY3Rpb24nIH0sXG4gICAgICAgIHsgb3BlbjogJ3N0ZXAnLCBjbG9zZTogJ2VuZF9zdGVwJyB9LFxuICAgICAgICB7IG9wZW46ICdpbml0aWFsX3N0ZXAnLCBjbG9zZTogJ2VuZF9zdGVwJyB9LFxuICAgICAgICB7IG9wZW46ICd0cmFuc2FjdGlvbicsIGNsb3NlOiAnZW5kX3RyYW5zYWN0aW9uJyB9LFxuICAgICAgICB7IG9wZW46ICdjb25maWd1cmF0aW9uJywgY2xvc2U6ICdlbmRfY29uZmlndXJhdGlvbicgfSxcbiAgICAgICAgeyBvcGVuOiAndGNwJywgY2xvc2U6ICdlbmRfdGNwJyB9LFxuICAgICAgICB7IG9wZW46ICdyZWNvdXJjZScsIGNsb3NlOiAnZW5kX3JlY291cmNlJyB9LFxuICAgICAgICB7IG9wZW46ICdjaGFubmVsJywgY2xvc2U6ICdlbmRfY2hhbm5lbCcgfSxcbiAgICAgICAgeyBvcGVuOiAnbGlicmFyeScsIGNsb3NlOiAnZW5kX2xpYnJhcnknIH0sXG4gICAgICAgIHsgb3BlbjogJ2ZvbGRlcicsIGNsb3NlOiAnZW5kX2ZvbGRlcicgfSxcbiAgICAgICAgeyBvcGVuOiAnYmluYXJpZXMnLCBjbG9zZTogJ2VuZF9iaW5hcmllcycgfSxcbiAgICAgICAgeyBvcGVuOiAnaW5jbHVkZXMnLCBjbG9zZTogJ2VuZF9pbmNsdWRlcycgfSxcbiAgICAgICAgeyBvcGVuOiAnc291cmNlcycsIGNsb3NlOiAnZW5kX3NvdXJjZXMnIH1cbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfSxcbiAgICAgICAgeyBvcGVuOiAndmFyJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfaW5wdXQnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9vdXRwdXQnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl9pbl9vdXQnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3Zhcl90ZW1wJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfZ2xvYmFsJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfYWNjZXNzJywgY2xvc2U6ICdlbmRfdmFyJyB9LFxuICAgICAgICB7IG9wZW46ICd2YXJfZXh0ZXJuYWwnLCBjbG9zZTogJ2VuZF92YXInIH0sXG4gICAgICAgIHsgb3BlbjogJ3R5cGUnLCBjbG9zZTogJ2VuZF90eXBlJyB9LFxuICAgICAgICB7IG9wZW46ICdzdHJ1Y3QnLCBjbG9zZTogJ2VuZF9zdHJ1Y3QnIH0sXG4gICAgICAgIHsgb3BlbjogJ3Byb2dyYW0nLCBjbG9zZTogJ2VuZF9wcm9ncmFtJyB9LFxuICAgICAgICB7IG9wZW46ICdmdW5jdGlvbicsIGNsb3NlOiAnZW5kX2Z1bmN0aW9uJyB9LFxuICAgICAgICB7IG9wZW46ICdmdW5jdGlvbl9ibG9jaycsIGNsb3NlOiAnZW5kX2Z1bmN0aW9uX2Jsb2NrJyB9LFxuICAgICAgICB7IG9wZW46ICdhY3Rpb24nLCBjbG9zZTogJ2VuZF9hY3Rpb24nIH0sXG4gICAgICAgIHsgb3BlbjogJ3N0ZXAnLCBjbG9zZTogJ2VuZF9zdGVwJyB9LFxuICAgICAgICB7IG9wZW46ICdpbml0aWFsX3N0ZXAnLCBjbG9zZTogJ2VuZF9zdGVwJyB9LFxuICAgICAgICB7IG9wZW46ICd0cmFuc2FjdGlvbicsIGNsb3NlOiAnZW5kX3RyYW5zYWN0aW9uJyB9LFxuICAgICAgICB7IG9wZW46ICdjb25maWd1cmF0aW9uJywgY2xvc2U6ICdlbmRfY29uZmlndXJhdGlvbicgfSxcbiAgICAgICAgeyBvcGVuOiAndGNwJywgY2xvc2U6ICdlbmRfdGNwJyB9LFxuICAgICAgICB7IG9wZW46ICdyZWNvdXJjZScsIGNsb3NlOiAnZW5kX3JlY291cmNlJyB9LFxuICAgICAgICB7IG9wZW46ICdjaGFubmVsJywgY2xvc2U6ICdlbmRfY2hhbm5lbCcgfSxcbiAgICAgICAgeyBvcGVuOiAnbGlicmFyeScsIGNsb3NlOiAnZW5kX2xpYnJhcnknIH0sXG4gICAgICAgIHsgb3BlbjogJ2ZvbGRlcicsIGNsb3NlOiAnZW5kX2ZvbGRlcicgfSxcbiAgICAgICAgeyBvcGVuOiAnYmluYXJpZXMnLCBjbG9zZTogJ2VuZF9iaW5hcmllcycgfSxcbiAgICAgICAgeyBvcGVuOiAnaW5jbHVkZXMnLCBjbG9zZTogJ2VuZF9pbmNsdWRlcycgfSxcbiAgICAgICAgeyBvcGVuOiAnc291cmNlcycsIGNsb3NlOiAnZW5kX3NvdXJjZXMnIH1cbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3ByYWdtYVxcXFxzK3JlZ2lvblxcXFxiXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNwcmFnbWFcXFxccytlbmRyZWdpb25cXFxcYlwiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcuc3QnLFxuICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5jdXJseScsIG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJywgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJywgb3BlbjogJ1snLCBjbG9zZTogJ10nIH1cbiAgICBdLFxuICAgIGtleXdvcmRzOiBbJ2lmJywgJ2VuZF9pZicsICdlbHNpZicsICdlbHNlJywgJ2Nhc2UnLCAnb2YnLCAndG8nLFxuICAgICAgICAnZG8nLCAnd2l0aCcsICdieScsICd3aGlsZScsICdyZXBlYXQnLCAnZW5kX3doaWxlJywgJ2VuZF9yZXBlYXQnLCAnZW5kX2Nhc2UnLFxuICAgICAgICAnZm9yJywgJ2VuZF9mb3InLCAndGFzaycsICdyZXRhaW4nLCAnbm9uX3JldGFpbicsICdjb25zdGFudCcsICd3aXRoJywgJ2F0JyxcbiAgICAgICAgJ2V4aXQnLCAncmV0dXJuJywgJ2ludGVydmFsJywgJ3ByaW9yaXR5JywgJ2FkZHJlc3MnLCAncG9ydCcsICdvbl9jaGFubmVsJyxcbiAgICAgICAgJ3RoZW4nLCAnaWVjJywgJ2ZpbGUnLCAndXNlcycsICd2ZXJzaW9uJywgJ3BhY2thZ2V0eXBlJywgJ2Rpc3BsYXluYW1lJyxcbiAgICAgICAgJ2NvcHlyaWdodCcsICdzdW1tYXJ5JywgJ3ZlbmRvcicsICdjb21tb25fc291cmNlJywgJ2Zyb20nXSxcbiAgICBjb25zdGFudDogWydmYWxzZScsICd0cnVlJywgJ251bGwnXSxcbiAgICBkZWZpbmVLZXl3b3JkczogW1xuICAgICAgICAndmFyJywgJ3Zhcl9pbnB1dCcsICd2YXJfb3V0cHV0JywgJ3Zhcl9pbl9vdXQnLCAndmFyX3RlbXAnLCAndmFyX2dsb2JhbCcsXG4gICAgICAgICd2YXJfYWNjZXNzJywgJ3Zhcl9leHRlcm5hbCcsICdlbmRfdmFyJyxcbiAgICAgICAgJ3R5cGUnLCAnZW5kX3R5cGUnLCAnc3RydWN0JywgJ2VuZF9zdHJ1Y3QnLCAncHJvZ3JhbScsICdlbmRfcHJvZ3JhbScsXG4gICAgICAgICdmdW5jdGlvbicsICdlbmRfZnVuY3Rpb24nLCAnZnVuY3Rpb25fYmxvY2snLCAnZW5kX2Z1bmN0aW9uX2Jsb2NrJyxcbiAgICAgICAgJ2NvbmZpZ3VyYXRpb24nLCAnZW5kX2NvbmZpZ3VyYXRpb24nLCAndGNwJywgJ2VuZF90Y3AnLCAncmVjb3VyY2UnLFxuICAgICAgICAnZW5kX3JlY291cmNlJywgJ2NoYW5uZWwnLCAnZW5kX2NoYW5uZWwnLCAnbGlicmFyeScsICdlbmRfbGlicmFyeScsXG4gICAgICAgICdmb2xkZXInLCAnZW5kX2ZvbGRlcicsICdiaW5hcmllcycsICdlbmRfYmluYXJpZXMnLCAnaW5jbHVkZXMnLFxuICAgICAgICAnZW5kX2luY2x1ZGVzJywgJ3NvdXJjZXMnLCAnZW5kX3NvdXJjZXMnLFxuICAgICAgICAnYWN0aW9uJywgJ2VuZF9hY3Rpb24nLCAnc3RlcCcsICdpbml0aWFsX3N0ZXAnLCAnZW5kX3N0ZXAnLCAndHJhbnNhY3Rpb24nLCAnZW5kX3RyYW5zYWN0aW9uJ1xuICAgIF0sXG4gICAgdHlwZUtleXdvcmRzOiBbJ2ludCcsICdzaW50JywgJ2RpbnQnLCAnbGludCcsICd1c2ludCcsICd1aW50JywgJ3VkaW50JywgJ3VsaW50JyxcbiAgICAgICAgJ3JlYWwnLCAnbHJlYWwnLCAndGltZScsICdkYXRlJywgJ3RpbWVfb2ZfZGF5JywgJ2RhdGVfYW5kX3RpbWUnLCAnc3RyaW5nJyxcbiAgICAgICAgJ2Jvb2wnLCAnYnl0ZScsICd3b3JsZCcsICdkd29ybGQnLCAnYXJyYXknLCAncG9pbnRlcicsICdsd29ybGQnXSxcbiAgICBvcGVyYXRvcnM6IFsnPScsICc+JywgJzwnLCAnOicsICc6PScsICc8PScsICc+PScsICc8PicsICcmJywgJysnLCAnLScsICcqJywgJyoqJyxcbiAgICAgICAgJ01PRCcsICdeJywgJ29yJywgJ2FuZCcsICdub3QnLCAneG9yJywgJ2FicycsICdhY29zJywgJ2FzaW4nLCAnYXRhbicsICdjb3MnLFxuICAgICAgICAnZXhwJywgJ2V4cHQnLCAnbG4nLCAnbG9nJywgJ3NpbicsICdzcXJ0JywgJ3RhbicsICdzZWwnLCAnbWF4JywgJ21pbicsICdsaW1pdCcsXG4gICAgICAgICdtdXgnLCAnc2hsJywgJ3NocicsICdyb2wnLCAncm9yJywgJ2luZGV4b2YnLCAnc2l6ZW9mJywgJ2FkcicsICdhZHJpbnN0JyxcbiAgICAgICAgJ2JpdGFkcicsICdpc192YWxpZCddLFxuICAgIGJ1aWx0aW5WYXJpYWJsZXM6IFtdLFxuICAgIGJ1aWx0aW5GdW5jdGlvbnM6IFsnc3InLCAncnMnLCAndHAnLCAndG9uJywgJ3RvZicsICdlcScsICdnZScsICdsZScsICdsdCcsXG4gICAgICAgICduZScsICdyb3VuZCcsICd0cnVuYycsICdjdGQnLCAn0YF0dScsICdjdHVkJywgJ3JfdHJpZycsICdmX3RyaWcnLFxuICAgICAgICAnbW92ZScsICdjb25jYXQnLCAnZGVsZXRlJywgJ2ZpbmQnLCAnaW5zZXJ0JywgJ2xlZnQnLCAnbGVuJywgJ3JlcGxhY2UnLFxuICAgICAgICAncmlnaHQnLCAncnRjJ10sXG4gICAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICAgIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9cXF4lXSsvLFxuICAgIC8vIEMjIHN0eWxlIHN0cmluZ3NcbiAgICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICBbLyhUfERUfFRPRCkjWzAtOTotX3NobXlkXSovLCAndGFnJ10sXG4gICAgICAgICAgICBbL1tBLVphLXpdezEsNn0jWzAtOV0qLywgJ3RhZyddLFxuICAgICAgICAgICAgWy9cXCUoSXxRfE0pKFh8QnxXfER8TClbMC05XFwuXSovLCAndGFnJ10sXG4gICAgICAgICAgICBbL1xcJShJfFF8TSlbMC05XFwuXSovLCAndGFnJ10sXG4gICAgICAgICAgICBbLyhUT198Q1RVX3xDVERffENUVURffE1VWF98U0VMXylbQV9aYS16XSovLCAncHJlZGVmaW5lZCddLFxuICAgICAgICAgICAgWy9bQV9aYS16XSooX1RPXylbQV9aYS16XSovLCAncHJlZGVmaW5lZCddLFxuICAgICAgICAgICAgLy8gaWRlbnRpZmllcnMgYW5kIGtleXdvcmRzXG4gICAgICAgICAgICBbL1thLXpBLVpfXVxcdyovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdvcGVyYXRvcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAdHlwZUtleXdvcmRzJzogJ3R5cGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZpbmVLZXl3b3Jkcyc6ICd2YXJpYWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGNvbnN0YW50JzogJ2NvbnN0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAYnVpbHRpblZhcmlhYmxlcyc6ICdwcmVkZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAYnVpbHRpbkZ1bmN0aW9ucyc6ICdwcmVkZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIFsvWzsuXS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvW3t9KClcXFtcXF1dLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPy8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvMTYjWzAtOWEtZkEtRl0rLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvMiNbMC05X10rLywgJ251bWJlci5iaW5hcnknXSxcbiAgICAgICAgICAgIFsvXFxkKy8sICdudW1iZXInXSxcbiAgICAgICAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgJ3N0cmluZy5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIGJyYWNrZXQ6ICdAb3BlbicsIG5leHQ6ICdAc3RyaW5nX2RxJyB9XSxcbiAgICAgICAgICAgIFsvJy8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQG9wZW4nLCBuZXh0OiAnQHN0cmluZ19zcScgfV0sXG4gICAgICAgICAgICBbLydbXlxcXFwnXScvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbJ3N0cmluZycsICdzdHJpbmcuZXNjYXBlJywgJ3N0cmluZyddXSxcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcuaW52YWxpZCddXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAcHVzaCddLFxuICAgICAgICAgICAgW1wiXFxcXCovXCIsICdjb21tZW50JywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcLypdLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50MjogW1xuICAgICAgICAgICAgWy9bXlxcKCpdKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcKFxcKi8sICdjb21tZW50JywgJ0BwdXNoJ10sXG4gICAgICAgICAgICBbXCJcXFxcKlxcXFwpXCIsICdjb21tZW50JywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcKCpdLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnd2hpdGUnXSxcbiAgICAgICAgICAgIFsvXFwvXFwvLiokLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwvXFwqLywgJ2NvbW1lbnQnLCAnQGNvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwoXFwqLywgJ2NvbW1lbnQnLCAnQGNvbW1lbnQyJ10sXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZ19kcTogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQGNsb3NlJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZ19zcTogW1xuICAgICAgICAgICAgWy9bXlxcXFwnXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbLycvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgYnJhY2tldDogJ0BjbG9zZScsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=