(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/rust/rust.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/rust/rust.js ***!
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
    tokenPostfix: '.rust',
    defaultToken: 'invalid',
    keywords: [
        'as', 'box', 'break', 'const', 'continue', 'crate', 'else', 'enum',
        'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop',
        'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self',
        'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use',
        'where', 'while', 'catch', 'default', 'union', 'static', 'abstract',
        'alignof', 'become', 'do', 'final', 'macro', 'offsetof', 'override',
        'priv', 'proc', 'pure', 'sizeof', 'typeof', 'unsized', 'virtual',
        'yield',
    ],
    typeKeywords: [
        'Self', 'm32', 'm64', 'm128', 'f80', 'f16', 'f128', 'int', 'uint',
        'float', 'char', 'bool', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'i8',
        'i16', 'i32', 'i64', 'str', 'Option', 'Either', 'c_float', 'c_double',
        'c_void', 'FILE', 'fpos_t', 'DIR', 'dirent', 'c_char', 'c_schar',
        'c_uchar', 'c_short', 'c_ushort', 'c_int', 'c_uint', 'c_long',
        'c_ulong', 'size_t', 'ptrdiff_t', 'clock_t', 'time_t', 'c_longlong',
        'c_ulonglong', 'intptr_t', 'uintptr_t', 'off_t', 'dev_t', 'ino_t',
        'pid_t', 'mode_t', 'ssize_t',
    ],
    constants: [
        'true', 'false', 'Some', 'None', 'Left', 'Right', 'Ok', 'Err',
    ],
    supportConstants: [
        'EXIT_FAILURE', 'EXIT_SUCCESS', 'RAND_MAX', 'EOF', 'SEEK_SET',
        'SEEK_CUR', 'SEEK_END', '_IOFBF', '_IONBF', '_IOLBF', 'BUFSIZ',
        'FOPEN_MAX', 'FILENAME_MAX', 'L_tmpnam', 'TMP_MAX', 'O_RDONLY',
        'O_WRONLY', 'O_RDWR', 'O_APPEND', 'O_CREAT', 'O_EXCL', 'O_TRUNC',
        'S_IFIFO', 'S_IFCHR', 'S_IFBLK', 'S_IFDIR', 'S_IFREG', 'S_IFMT',
        'S_IEXEC', 'S_IWRITE', 'S_IREAD', 'S_IRWXU', 'S_IXUSR', 'S_IWUSR',
        'S_IRUSR', 'F_OK', 'R_OK', 'W_OK', 'X_OK', 'STDIN_FILENO',
        'STDOUT_FILENO', 'STDERR_FILENO',
    ],
    supportMacros: [
        'format!', 'print!', 'println!', 'panic!', 'format_args!', 'unreachable!',
        'write!', 'writeln!'
    ],
    operators: [
        '!', '!=', '%', '%=', '&', '&=', '&&', '*', '*=', '+', '+=', '-', '-=',
        '->', '.', '..', '...', '/', '/=', ':', ';', '<<', '<<=', '<', '<=', '=',
        '==', '=>', '>', '>=', '>>', '>>=', '@', '^', '^=', '|', '|=', '||', '_',
        '?', '#'
    ],
    escapes: /\\([nrt0\"''\\]|x\h{2}|u\{\h{1,6}\})/,
    delimiters: /[,]/,
    symbols: /[\#\!\%\&\*\+\-\.\/\:\;\<\=\>\@\^\|_\?]+/,
    intSuffixes: /[iu](8|16|32|64|128|size)/,
    floatSuffixes: /f(32|64)/,
    tokenizer: {
        root: [
            [/[a-zA-Z][a-zA-Z0-9_]*!?|_[a-zA-Z0-9_]+/,
                {
                    cases: {
                        '@typeKeywords': 'keyword.type',
                        '@keywords': 'keyword',
                        '@supportConstants': 'keyword',
                        '@supportMacros': 'keyword',
                        '@constants': 'keyword',
                        '@default': 'identifier',
                    }
                }
            ],
            // Designator
            [/\$/, 'identifier'],
            // Lifetime annotations
            [/'[a-zA-Z_][a-zA-Z0-9_]*(?=[^\'])/, 'identifier'],
            // Byte literal
            [/'\S'/, 'string.byteliteral'],
            // Strings
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            { include: '@numbers' },
            // Whitespace + comments
            { include: '@whitespace' },
            [/@delimiters/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'delimiter'
                    }
                }],
            [/[{}()\[\]<>]/, '@brackets'],
            [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ["\\*/", 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        numbers: [
            //Octal
            [/(0o[0-7_]+)(@intSuffixes)?/, { token: 'number' }],
            //Binary
            [/(0b[0-1_]+)(@intSuffixes)?/, { token: 'number' }],
            //Exponent
            [/[\d][\d_]*(\.[\d][\d_]*)?[eE][+-][\d_]+(@floatSuffixes)?/, { token: 'number' }],
            //Float
            [/\b(\d\.?[\d_]*)(@floatSuffixes)?\b/, { token: 'number' }],
            //Hexadecimal
            [/(0x[\da-fA-F]+)_?(@intSuffixes)?/, { token: 'number' }],
            //Integer
            [/[\d][\d_]*(@intSuffixes?)?/, { token: 'number' }],
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3J1c3QvcnVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDYTtBQUNOO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdEQUF3RDtBQUNqRSxTQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUU7QUFDakQ7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyREFBMkQ7QUFDOUUsYUFBYSxzQkFBc0I7QUFDbkM7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQiwwQkFBMEIsU0FBUywyQ0FBMkMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5REFBeUQ7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGtCQUFrQjtBQUM5RDtBQUNBLDRDQUE0QyxrQkFBa0I7QUFDOUQ7QUFDQSwwRUFBMEUsa0JBQWtCO0FBQzVGO0FBQ0Esb0RBQW9ELGtCQUFrQjtBQUN0RTtBQUNBLGtEQUFrRCxrQkFBa0I7QUFDcEU7QUFDQSw0Q0FBNEMsa0JBQWtCO0FBQzlEO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy8zOGNmZTZhOGZkZThkMzA0YzNiZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnLyonLCAnKi8nXSxcbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZyddIH0sXG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXSxcbiAgICBmb2xkaW5nOiB7XG4gICAgICAgIG1hcmtlcnM6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNwcmFnbWFcXFxccytyZWdpb25cXFxcYlwiKSxcbiAgICAgICAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccyojcHJhZ21hXFxcXHMrZW5kcmVnaW9uXFxcXGJcIilcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIHRva2VuUG9zdGZpeDogJy5ydXN0JyxcbiAgICBkZWZhdWx0VG9rZW46ICdpbnZhbGlkJyxcbiAgICBrZXl3b3JkczogW1xuICAgICAgICAnYXMnLCAnYm94JywgJ2JyZWFrJywgJ2NvbnN0JywgJ2NvbnRpbnVlJywgJ2NyYXRlJywgJ2Vsc2UnLCAnZW51bScsXG4gICAgICAgICdleHRlcm4nLCAnZmFsc2UnLCAnZm4nLCAnZm9yJywgJ2lmJywgJ2ltcGwnLCAnaW4nLCAnbGV0JywgJ2xvb3AnLFxuICAgICAgICAnbWF0Y2gnLCAnbW9kJywgJ21vdmUnLCAnbXV0JywgJ3B1YicsICdyZWYnLCAncmV0dXJuJywgJ3NlbGYnLFxuICAgICAgICAnc3RhdGljJywgJ3N0cnVjdCcsICdzdXBlcicsICd0cmFpdCcsICd0cnVlJywgJ3R5cGUnLCAndW5zYWZlJywgJ3VzZScsXG4gICAgICAgICd3aGVyZScsICd3aGlsZScsICdjYXRjaCcsICdkZWZhdWx0JywgJ3VuaW9uJywgJ3N0YXRpYycsICdhYnN0cmFjdCcsXG4gICAgICAgICdhbGlnbm9mJywgJ2JlY29tZScsICdkbycsICdmaW5hbCcsICdtYWNybycsICdvZmZzZXRvZicsICdvdmVycmlkZScsXG4gICAgICAgICdwcml2JywgJ3Byb2MnLCAncHVyZScsICdzaXplb2YnLCAndHlwZW9mJywgJ3Vuc2l6ZWQnLCAndmlydHVhbCcsXG4gICAgICAgICd5aWVsZCcsXG4gICAgXSxcbiAgICB0eXBlS2V5d29yZHM6IFtcbiAgICAgICAgJ1NlbGYnLCAnbTMyJywgJ202NCcsICdtMTI4JywgJ2Y4MCcsICdmMTYnLCAnZjEyOCcsICdpbnQnLCAndWludCcsXG4gICAgICAgICdmbG9hdCcsICdjaGFyJywgJ2Jvb2wnLCAndTgnLCAndTE2JywgJ3UzMicsICd1NjQnLCAnZjMyJywgJ2Y2NCcsICdpOCcsXG4gICAgICAgICdpMTYnLCAnaTMyJywgJ2k2NCcsICdzdHInLCAnT3B0aW9uJywgJ0VpdGhlcicsICdjX2Zsb2F0JywgJ2NfZG91YmxlJyxcbiAgICAgICAgJ2Nfdm9pZCcsICdGSUxFJywgJ2Zwb3NfdCcsICdESVInLCAnZGlyZW50JywgJ2NfY2hhcicsICdjX3NjaGFyJyxcbiAgICAgICAgJ2NfdWNoYXInLCAnY19zaG9ydCcsICdjX3VzaG9ydCcsICdjX2ludCcsICdjX3VpbnQnLCAnY19sb25nJyxcbiAgICAgICAgJ2NfdWxvbmcnLCAnc2l6ZV90JywgJ3B0cmRpZmZfdCcsICdjbG9ja190JywgJ3RpbWVfdCcsICdjX2xvbmdsb25nJyxcbiAgICAgICAgJ2NfdWxvbmdsb25nJywgJ2ludHB0cl90JywgJ3VpbnRwdHJfdCcsICdvZmZfdCcsICdkZXZfdCcsICdpbm9fdCcsXG4gICAgICAgICdwaWRfdCcsICdtb2RlX3QnLCAnc3NpemVfdCcsXG4gICAgXSxcbiAgICBjb25zdGFudHM6IFtcbiAgICAgICAgJ3RydWUnLCAnZmFsc2UnLCAnU29tZScsICdOb25lJywgJ0xlZnQnLCAnUmlnaHQnLCAnT2snLCAnRXJyJyxcbiAgICBdLFxuICAgIHN1cHBvcnRDb25zdGFudHM6IFtcbiAgICAgICAgJ0VYSVRfRkFJTFVSRScsICdFWElUX1NVQ0NFU1MnLCAnUkFORF9NQVgnLCAnRU9GJywgJ1NFRUtfU0VUJyxcbiAgICAgICAgJ1NFRUtfQ1VSJywgJ1NFRUtfRU5EJywgJ19JT0ZCRicsICdfSU9OQkYnLCAnX0lPTEJGJywgJ0JVRlNJWicsXG4gICAgICAgICdGT1BFTl9NQVgnLCAnRklMRU5BTUVfTUFYJywgJ0xfdG1wbmFtJywgJ1RNUF9NQVgnLCAnT19SRE9OTFknLFxuICAgICAgICAnT19XUk9OTFknLCAnT19SRFdSJywgJ09fQVBQRU5EJywgJ09fQ1JFQVQnLCAnT19FWENMJywgJ09fVFJVTkMnLFxuICAgICAgICAnU19JRklGTycsICdTX0lGQ0hSJywgJ1NfSUZCTEsnLCAnU19JRkRJUicsICdTX0lGUkVHJywgJ1NfSUZNVCcsXG4gICAgICAgICdTX0lFWEVDJywgJ1NfSVdSSVRFJywgJ1NfSVJFQUQnLCAnU19JUldYVScsICdTX0lYVVNSJywgJ1NfSVdVU1InLFxuICAgICAgICAnU19JUlVTUicsICdGX09LJywgJ1JfT0snLCAnV19PSycsICdYX09LJywgJ1NURElOX0ZJTEVOTycsXG4gICAgICAgICdTVERPVVRfRklMRU5PJywgJ1NUREVSUl9GSUxFTk8nLFxuICAgIF0sXG4gICAgc3VwcG9ydE1hY3JvczogW1xuICAgICAgICAnZm9ybWF0IScsICdwcmludCEnLCAncHJpbnRsbiEnLCAncGFuaWMhJywgJ2Zvcm1hdF9hcmdzIScsICd1bnJlYWNoYWJsZSEnLFxuICAgICAgICAnd3JpdGUhJywgJ3dyaXRlbG4hJ1xuICAgIF0sXG4gICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICchJywgJyE9JywgJyUnLCAnJT0nLCAnJicsICcmPScsICcmJicsICcqJywgJyo9JywgJysnLCAnKz0nLCAnLScsICctPScsXG4gICAgICAgICctPicsICcuJywgJy4uJywgJy4uLicsICcvJywgJy89JywgJzonLCAnOycsICc8PCcsICc8PD0nLCAnPCcsICc8PScsICc9JyxcbiAgICAgICAgJz09JywgJz0+JywgJz4nLCAnPj0nLCAnPj4nLCAnPj49JywgJ0AnLCAnXicsICdePScsICd8JywgJ3w9JywgJ3x8JywgJ18nLFxuICAgICAgICAnPycsICcjJ1xuICAgIF0sXG4gICAgZXNjYXBlczogL1xcXFwoW25ydDBcXFwiJydcXFxcXXx4XFxoezJ9fHVcXHtcXGh7MSw2fVxcfSkvLFxuICAgIGRlbGltaXRlcnM6IC9bLF0vLFxuICAgIHN5bWJvbHM6IC9bXFwjXFwhXFwlXFwmXFwqXFwrXFwtXFwuXFwvXFw6XFw7XFw8XFw9XFw+XFxAXFxeXFx8X1xcP10rLyxcbiAgICBpbnRTdWZmaXhlczogL1tpdV0oOHwxNnwzMnw2NHwxMjh8c2l6ZSkvLFxuICAgIGZsb2F0U3VmZml4ZXM6IC9mKDMyfDY0KS8sXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIFsvW2EtekEtWl1bYS16QS1aMC05X10qIT98X1thLXpBLVowLTlfXSsvLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAdHlwZUtleXdvcmRzJzogJ2tleXdvcmQudHlwZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BzdXBwb3J0Q29uc3RhbnRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BzdXBwb3J0TWFjcm9zJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Bjb25zdGFudHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcicsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gRGVzaWduYXRvclxuICAgICAgICAgICAgWy9cXCQvLCAnaWRlbnRpZmllciddLFxuICAgICAgICAgICAgLy8gTGlmZXRpbWUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgIFsvJ1thLXpBLVpfXVthLXpBLVowLTlfXSooPz1bXlxcJ10pLywgJ2lkZW50aWZpZXInXSxcbiAgICAgICAgICAgIC8vIEJ5dGUgbGl0ZXJhbFxuICAgICAgICAgICAgWy8nXFxTJy8sICdzdHJpbmcuYnl0ZWxpdGVyYWwnXSxcbiAgICAgICAgICAgIC8vIFN0cmluZ3NcbiAgICAgICAgICAgIFsvXCIvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgYnJhY2tldDogJ0BvcGVuJywgbmV4dDogJ0BzdHJpbmcnIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQG51bWJlcnMnIH0sXG4gICAgICAgICAgICAvLyBXaGl0ZXNwYWNlICsgY29tbWVudHNcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgWy9AZGVsaW1pdGVycy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnZGVsaW1pdGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdPD5dLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9Ac3ltYm9scy8sIHsgY2FzZXM6IHsgJ0BvcGVyYXRvcnMnOiAnb3BlcmF0b3InLCAnQGRlZmF1bHQnOiAnJyB9IH1dLFxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnd2hpdGUnXSxcbiAgICAgICAgICAgIFsvXFwvXFwqLywgJ2NvbW1lbnQnLCAnQGNvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvXFwvXFwvLiokLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgXSxcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICAgICAgWy9bXlxcLypdKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sICdjb21tZW50JywgJ0BwdXNoJ10sXG4gICAgICAgICAgICBbXCJcXFxcKi9cIiwgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9bXFwvKl0vLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQGNsb3NlJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIG51bWJlcnM6IFtcbiAgICAgICAgICAgIC8vT2N0YWxcbiAgICAgICAgICAgIFsvKDBvWzAtN19dKykoQGludFN1ZmZpeGVzKT8vLCB7IHRva2VuOiAnbnVtYmVyJyB9XSxcbiAgICAgICAgICAgIC8vQmluYXJ5XG4gICAgICAgICAgICBbLygwYlswLTFfXSspKEBpbnRTdWZmaXhlcyk/LywgeyB0b2tlbjogJ251bWJlcicgfV0sXG4gICAgICAgICAgICAvL0V4cG9uZW50XG4gICAgICAgICAgICBbL1tcXGRdW1xcZF9dKihcXC5bXFxkXVtcXGRfXSopP1tlRV1bKy1dW1xcZF9dKyhAZmxvYXRTdWZmaXhlcyk/LywgeyB0b2tlbjogJ251bWJlcicgfV0sXG4gICAgICAgICAgICAvL0Zsb2F0XG4gICAgICAgICAgICBbL1xcYihcXGRcXC4/W1xcZF9dKikoQGZsb2F0U3VmZml4ZXMpP1xcYi8sIHsgdG9rZW46ICdudW1iZXInIH1dLFxuICAgICAgICAgICAgLy9IZXhhZGVjaW1hbFxuICAgICAgICAgICAgWy8oMHhbXFxkYS1mQS1GXSspXz8oQGludFN1ZmZpeGVzKT8vLCB7IHRva2VuOiAnbnVtYmVyJyB9XSxcbiAgICAgICAgICAgIC8vSW50ZWdlclxuICAgICAgICAgICAgWy9bXFxkXVtcXGRfXSooQGludFN1ZmZpeGVzPyk/LywgeyB0b2tlbjogJ251bWJlcicgfV0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==