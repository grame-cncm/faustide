(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js ***!
  \**************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*!---------------------------------------------------------------------------------------------
 *  Copyright (C) David Owens II, owensd.io. All rights reserved.
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
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: '`', close: '`' },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: '`', close: '`' },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.swift',
    // TODO(owensd): Support the full range of unicode valid identifiers.
    identifier: /[a-zA-Z_][\w$]*/,
    // TODO(owensd): Support the @availability macro properly.
    attributes: [
        '@autoclosure', '@noescape', '@noreturn', '@NSApplicationMain', '@NSCopying', '@NSManaged',
        '@objc', '@UIApplicationMain', '@noreturn', '@availability', '@IBAction', '@IBDesignable', '@IBInspectable', '@IBOutlet'
    ],
    accessmodifiers: ['public', 'private', 'internal'],
    keywords: [
        '__COLUMN__', '__FILE__', '__FUNCTION__', '__LINE__', 'as', 'as!', 'as?', 'associativity', 'break', 'case', 'catch',
        'class', 'continue', 'convenience', 'default', 'deinit', 'didSet', 'do', 'dynamic', 'dynamicType',
        'else', 'enum', 'extension', 'fallthrough', 'final', 'for', 'func', 'get', 'guard', 'if', 'import', 'in', 'infix',
        'init', 'inout', 'internal', 'is', 'lazy', 'left', 'let', 'mutating', 'nil', 'none', 'nonmutating', 'operator',
        'optional', 'override', 'postfix', 'precedence', 'prefix', 'private', 'protocol', 'Protocol', 'public',
        'repeat', 'required', 'return', 'right', 'self', 'Self', 'set', 'static', 'struct', 'subscript', 'super', 'switch',
        'throw', 'throws', 'try', 'try!', 'Type', 'typealias', 'unowned', 'var', 'weak', 'where', 'while', 'willSet', 'FALSE', 'TRUE'
    ],
    symbols: /[=(){}\[\].,:;@#\_&\-<>`?!+*\\\/]/,
    // Moved . to operatorstart so it can be a delimiter
    operatorstart: /[\/=\-+!*%<>&|^~?\u00A1-\u00A7\u00A9\u00AB\u00AC\u00AE\u00B0-\u00B1\u00B6\u00BB\u00BF\u00D7\u00F7\u2016-\u2017\u2020-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u23FF\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3030]/,
    operatorend: /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE00-\uFE0F\uFE20-\uFE2F\uE0100-\uE01EF]/,
    operators: /(@operatorstart)((@operatorstart)|(@operatorend))*/,
    // TODO(owensd): These are borrowed from C#; need to validate correctness for Swift.
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
        root: [
            { include: '@comment' },
            { include: '@attribute' },
            { include: '@literal' },
            { include: '@keyword' },
            { include: '@invokedmethod' },
            { include: '@symbol' },
        ],
        symbol: [
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/[.]/, 'delimiter'],
            [/@operators/, 'operator'],
            [/@symbols/, 'operator']
        ],
        comment: [
            [/\/\/\/.*$/, 'comment.doc'],
            [/\/\*\*/, 'comment.doc', '@commentdocbody'],
            [/\/\/.*$/, 'comment'],
            [/\/\*/, 'comment', '@commentbody']
        ],
        commentdocbody: [
            [/\/\*/, 'comment', '@commentbody'],
            [/\*\//, 'comment.doc', '@pop'],
            [/\:[a-zA-Z]+\:/, 'comment.doc.param'],
            [/./, 'comment.doc']
        ],
        commentbody: [
            [/\/\*/, 'comment', '@commentbody'],
            [/\*\//, 'comment', '@pop'],
            [/./, 'comment']
        ],
        attribute: [
            [/\@@identifier/, {
                    cases: {
                        '@attributes': 'keyword.control',
                        '@default': ''
                    }
                }]
        ],
        literal: [
            [/"/, { token: 'string.quote', next: '@stringlit' }],
            [/0[b]([01]_?)+/, 'number.binary'],
            [/0[o]([0-7]_?)+/, 'number.octal'],
            [/0[x]([0-9a-fA-F]_?)+([pP][\-+](\d_?)+)?/, 'number.hex'],
            [/(\d_?)*\.(\d_?)+([eE][\-+]?(\d_?)+)?/, 'number.float'],
            [/(\d_?)+/, 'number']
        ],
        stringlit: [
            [/\\\(/, { token: 'operator', next: '@interpolatedexpression' }],
            [/@escapes/, 'string'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', next: '@pop' }],
            [/./, 'string']
        ],
        interpolatedexpression: [
            [/\(/, { token: 'operator', next: '@interpolatedexpression' }],
            [/\)/, { token: 'operator', next: '@pop' }],
            { include: '@literal' },
            { include: '@keyword' },
            { include: '@symbol' }
        ],
        keyword: [
            [/`/, { token: 'operator', next: '@escapedkeyword' }],
            [/@identifier/, {
                    cases: {
                        '@keywords': 'keyword', '[A-Z][\a-zA-Z0-9$]*': 'type.identifier',
                        '@default': 'identifier'
                    }
                }]
        ],
        escapedkeyword: [
            [/`/, { token: 'operator', next: '@pop' }],
            [/./, 'identifier']
        ],
        //		symbol: [
        //			[ /@symbols/, 'operator' ],
        //			[ /@operators/, 'operator' ]
        //		],
        invokedmethod: [
            [/([.])(@identifier)/, {
                    cases: {
                        '$2': ['delimeter', 'type.identifier'],
                        '@default': ''
                    }
                }],
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3N3aWZ0L3N3aWZ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDYTtBQUNOO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELDhDQUE4QyxJQUFJLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDbEY7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsNEJBQTRCO0FBQ3pDLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLG1CQUFtQiw0Q0FBNEM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQXFEO0FBQzNFO0FBQ0E7QUFDQSxtQkFBbUIsc0NBQXNDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBcUQ7QUFDekUsb0JBQW9CLGtDQUFrQztBQUN0RCxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLG1CQUFtQiw2Q0FBNkM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBIiwiZmlsZSI6ImpzLzcwNjdlNzhjMmZiMTcxMDk4NThmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChDKSBEYXZpZCBPd2VucyBJSSwgb3dlbnNkLmlvLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcvLycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycvKicsICcqLyddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICdgJywgY2xvc2U6ICdgJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICdgJywgY2xvc2U6ICdgJyB9LFxuICAgIF1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLnN3aWZ0JyxcbiAgICAvLyBUT0RPKG93ZW5zZCk6IFN1cHBvcnQgdGhlIGZ1bGwgcmFuZ2Ugb2YgdW5pY29kZSB2YWxpZCBpZGVudGlmaWVycy5cbiAgICBpZGVudGlmaWVyOiAvW2EtekEtWl9dW1xcdyRdKi8sXG4gICAgLy8gVE9ETyhvd2Vuc2QpOiBTdXBwb3J0IHRoZSBAYXZhaWxhYmlsaXR5IG1hY3JvIHByb3Blcmx5LlxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgJ0BhdXRvY2xvc3VyZScsICdAbm9lc2NhcGUnLCAnQG5vcmV0dXJuJywgJ0BOU0FwcGxpY2F0aW9uTWFpbicsICdATlNDb3B5aW5nJywgJ0BOU01hbmFnZWQnLFxuICAgICAgICAnQG9iamMnLCAnQFVJQXBwbGljYXRpb25NYWluJywgJ0Bub3JldHVybicsICdAYXZhaWxhYmlsaXR5JywgJ0BJQkFjdGlvbicsICdASUJEZXNpZ25hYmxlJywgJ0BJQkluc3BlY3RhYmxlJywgJ0BJQk91dGxldCdcbiAgICBdLFxuICAgIGFjY2Vzc21vZGlmaWVyczogWydwdWJsaWMnLCAncHJpdmF0ZScsICdpbnRlcm5hbCddLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdfX0NPTFVNTl9fJywgJ19fRklMRV9fJywgJ19fRlVOQ1RJT05fXycsICdfX0xJTkVfXycsICdhcycsICdhcyEnLCAnYXM/JywgJ2Fzc29jaWF0aXZpdHknLCAnYnJlYWsnLCAnY2FzZScsICdjYXRjaCcsXG4gICAgICAgICdjbGFzcycsICdjb250aW51ZScsICdjb252ZW5pZW5jZScsICdkZWZhdWx0JywgJ2RlaW5pdCcsICdkaWRTZXQnLCAnZG8nLCAnZHluYW1pYycsICdkeW5hbWljVHlwZScsXG4gICAgICAgICdlbHNlJywgJ2VudW0nLCAnZXh0ZW5zaW9uJywgJ2ZhbGx0aHJvdWdoJywgJ2ZpbmFsJywgJ2ZvcicsICdmdW5jJywgJ2dldCcsICdndWFyZCcsICdpZicsICdpbXBvcnQnLCAnaW4nLCAnaW5maXgnLFxuICAgICAgICAnaW5pdCcsICdpbm91dCcsICdpbnRlcm5hbCcsICdpcycsICdsYXp5JywgJ2xlZnQnLCAnbGV0JywgJ211dGF0aW5nJywgJ25pbCcsICdub25lJywgJ25vbm11dGF0aW5nJywgJ29wZXJhdG9yJyxcbiAgICAgICAgJ29wdGlvbmFsJywgJ292ZXJyaWRlJywgJ3Bvc3RmaXgnLCAncHJlY2VkZW5jZScsICdwcmVmaXgnLCAncHJpdmF0ZScsICdwcm90b2NvbCcsICdQcm90b2NvbCcsICdwdWJsaWMnLFxuICAgICAgICAncmVwZWF0JywgJ3JlcXVpcmVkJywgJ3JldHVybicsICdyaWdodCcsICdzZWxmJywgJ1NlbGYnLCAnc2V0JywgJ3N0YXRpYycsICdzdHJ1Y3QnLCAnc3Vic2NyaXB0JywgJ3N1cGVyJywgJ3N3aXRjaCcsXG4gICAgICAgICd0aHJvdycsICd0aHJvd3MnLCAndHJ5JywgJ3RyeSEnLCAnVHlwZScsICd0eXBlYWxpYXMnLCAndW5vd25lZCcsICd2YXInLCAnd2VhaycsICd3aGVyZScsICd3aGlsZScsICd3aWxsU2V0JywgJ0ZBTFNFJywgJ1RSVUUnXG4gICAgXSxcbiAgICBzeW1ib2xzOiAvWz0oKXt9XFxbXFxdLiw6O0AjXFxfJlxcLTw+YD8hKypcXFxcXFwvXS8sXG4gICAgLy8gTW92ZWQgLiB0byBvcGVyYXRvcnN0YXJ0IHNvIGl0IGNhbiBiZSBhIGRlbGltaXRlclxuICAgIG9wZXJhdG9yc3RhcnQ6IC9bXFwvPVxcLSshKiU8PiZ8Xn4/XFx1MDBBMS1cXHUwMEE3XFx1MDBBOVxcdTAwQUJcXHUwMEFDXFx1MDBBRVxcdTAwQjAtXFx1MDBCMVxcdTAwQjZcXHUwMEJCXFx1MDBCRlxcdTAwRDdcXHUwMEY3XFx1MjAxNi1cXHUyMDE3XFx1MjAyMC1cXHUyMDI3XFx1MjAzMC1cXHUyMDNFXFx1MjA0MS1cXHUyMDUzXFx1MjA1NS1cXHUyMDVFXFx1MjE5MC1cXHUyM0ZGXFx1MjUwMC1cXHUyNzc1XFx1Mjc5NC1cXHUyQkZGXFx1MkUwMC1cXHUyRTdGXFx1MzAwMS1cXHUzMDAzXFx1MzAwOC1cXHUzMDMwXS8sXG4gICAgb3BlcmF0b3JlbmQ6IC9bXFx1MDMwMC1cXHUwMzZGXFx1MURDMC1cXHUxREZGXFx1MjBEMC1cXHUyMEZGXFx1RkUwMC1cXHVGRTBGXFx1RkUyMC1cXHVGRTJGXFx1RTAxMDAtXFx1RTAxRUZdLyxcbiAgICBvcGVyYXRvcnM6IC8oQG9wZXJhdG9yc3RhcnQpKChAb3BlcmF0b3JzdGFydCl8KEBvcGVyYXRvcmVuZCkpKi8sXG4gICAgLy8gVE9ETyhvd2Vuc2QpOiBUaGVzZSBhcmUgYm9ycm93ZWQgZnJvbSBDIzsgbmVlZCB0byB2YWxpZGF0ZSBjb3JyZWN0bmVzcyBmb3IgU3dpZnQuXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnQnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYXR0cmlidXRlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGxpdGVyYWwnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAa2V5d29yZCcgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BpbnZva2VkbWV0aG9kJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHN5bWJvbCcgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc3ltYm9sOiBbXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdXS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvWzw+XSg/IUBzeW1ib2xzKS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvWy5dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9Ab3BlcmF0b3JzLywgJ29wZXJhdG9yJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywgJ29wZXJhdG9yJ11cbiAgICAgICAgXSxcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICAgICAgWy9cXC9cXC9cXC8uKiQvLCAnY29tbWVudC5kb2MnXSxcbiAgICAgICAgICAgIFsvXFwvXFwqXFwqLywgJ2NvbW1lbnQuZG9jJywgJ0Bjb21tZW50ZG9jYm9keSddLFxuICAgICAgICAgICAgWy9cXC9cXC8uKiQvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudGJvZHknXVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50ZG9jYm9keTogW1xuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudGJvZHknXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQuZG9jJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvXFw6W2EtekEtWl0rXFw6LywgJ2NvbW1lbnQuZG9jLnBhcmFtJ10sXG4gICAgICAgICAgICBbLy4vLCAnY29tbWVudC5kb2MnXVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50Ym9keTogW1xuICAgICAgICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAY29tbWVudGJvZHknXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy8uLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICBhdHRyaWJ1dGU6IFtcbiAgICAgICAgICAgIFsvXFxAQGlkZW50aWZpZXIvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGF0dHJpYnV0ZXMnOiAna2V5d29yZC5jb250cm9sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICBsaXRlcmFsOiBbXG4gICAgICAgICAgICBbL1wiLywgeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIG5leHQ6ICdAc3RyaW5nbGl0JyB9XSxcbiAgICAgICAgICAgIFsvMFtiXShbMDFdXz8pKy8sICdudW1iZXIuYmluYXJ5J10sXG4gICAgICAgICAgICBbLzBbb10oWzAtN11fPykrLywgJ251bWJlci5vY3RhbCddLFxuICAgICAgICAgICAgWy8wW3hdKFswLTlhLWZBLUZdXz8pKyhbcFBdW1xcLStdKFxcZF8/KSspPy8sICdudW1iZXIuaGV4J10sXG4gICAgICAgICAgICBbLyhcXGRfPykqXFwuKFxcZF8/KSsoW2VFXVtcXC0rXT8oXFxkXz8pKyk/LywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8oXFxkXz8pKy8sICdudW1iZXInXVxuICAgICAgICBdLFxuICAgICAgICBzdHJpbmdsaXQ6IFtcbiAgICAgICAgICAgIFsvXFxcXFxcKC8sIHsgdG9rZW46ICdvcGVyYXRvcicsIG5leHQ6ICdAaW50ZXJwb2xhdGVkZXhwcmVzc2lvbicgfV0sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuZXNjYXBlLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCIvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy8uLywgJ3N0cmluZyddXG4gICAgICAgIF0sXG4gICAgICAgIGludGVycG9sYXRlZGV4cHJlc3Npb246IFtcbiAgICAgICAgICAgIFsvXFwoLywgeyB0b2tlbjogJ29wZXJhdG9yJywgbmV4dDogJ0BpbnRlcnBvbGF0ZWRleHByZXNzaW9uJyB9XSxcbiAgICAgICAgICAgIFsvXFwpLywgeyB0b2tlbjogJ29wZXJhdG9yJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGxpdGVyYWwnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAa2V5d29yZCcgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BzeW1ib2wnIH1cbiAgICAgICAgXSxcbiAgICAgICAga2V5d29yZDogW1xuICAgICAgICAgICAgWy9gLywgeyB0b2tlbjogJ29wZXJhdG9yJywgbmV4dDogJ0Blc2NhcGVka2V5d29yZCcgfV0sXG4gICAgICAgICAgICBbL0BpZGVudGlmaWVyLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJywgJ1tBLVpdW1xcYS16QS1aMC05JF0qJzogJ3R5cGUuaWRlbnRpZmllcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIF0sXG4gICAgICAgIGVzY2FwZWRrZXl3b3JkOiBbXG4gICAgICAgICAgICBbL2AvLCB7IHRva2VuOiAnb3BlcmF0b3InLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICBbLy4vLCAnaWRlbnRpZmllciddXG4gICAgICAgIF0sXG4gICAgICAgIC8vXHRcdHN5bWJvbDogW1xuICAgICAgICAvL1x0XHRcdFsgL0BzeW1ib2xzLywgJ29wZXJhdG9yJyBdLFxuICAgICAgICAvL1x0XHRcdFsgL0BvcGVyYXRvcnMvLCAnb3BlcmF0b3InIF1cbiAgICAgICAgLy9cdFx0XSxcbiAgICAgICAgaW52b2tlZG1ldGhvZDogW1xuICAgICAgICAgICAgWy8oWy5dKShAaWRlbnRpZmllcikvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJDInOiBbJ2RlbGltZXRlcicsICd0eXBlLmlkZW50aWZpZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgXVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9