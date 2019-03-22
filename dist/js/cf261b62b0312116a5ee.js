(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[58],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.js ***!
  \************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
var conf = {
    comments: {
        lineComment: '#'
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
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    folding: {
        offSide: true
    }
};
var language = {
    tokenPostfix: '.yaml',
    brackets: [
        { token: 'delimiter.bracket', open: '{', close: '}' },
        { token: 'delimiter.square', open: '[', close: ']' }
    ],
    keywords: ['true', 'True', 'TRUE', 'false', 'False', 'FALSE', 'null', 'Null', 'Null', '~'],
    numberInteger: /(?:0|[+-]?[0-9]+)/,
    numberFloat: /(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,
    numberOctal: /0o[0-7]+/,
    numberHex: /0x[0-9a-fA-F]+/,
    numberInfinity: /[+-]?\.(?:inf|Inf|INF)/,
    numberNaN: /\.(?:nan|Nan|NAN)/,
    numberDate: /\d{4}-\d\d-\d\d([Tt ]\d\d:\d\d:\d\d(\.\d+)?(( ?[+-]\d\d?(:\d\d)?)|Z)?)?/,
    escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
    tokenizer: {
        root: [
            { include: '@whitespace' },
            { include: '@comment' },
            // Directive
            [/%[^ ]+.*$/, 'meta.directive'],
            // Document Markers
            [/---/, 'operators.directivesEnd'],
            [/\.{3}/, 'operators.documentEnd'],
            // Block Structure Indicators
            [/[-?:](?= )/, 'operators'],
            { include: '@anchor' },
            { include: '@tagHandle' },
            { include: '@flowCollections' },
            { include: '@blockStyle' },
            // Numbers
            [/@numberInteger(?![ \t]*\S+)/, 'number'],
            [/@numberFloat(?![ \t]*\S+)/, 'number.float'],
            [/@numberOctal(?![ \t]*\S+)/, 'number.octal'],
            [/@numberHex(?![ \t]*\S+)/, 'number.hex'],
            [/@numberInfinity(?![ \t]*\S+)/, 'number.infinity'],
            [/@numberNaN(?![ \t]*\S+)/, 'number.nan'],
            [/@numberDate(?![ \t]*\S+)/, 'number.date'],
            // Key:Value pair
            [/(".*?"|'.*?'|.*?)([ \t]*)(:)( |$)/, ['type', 'white', 'operators', 'white']],
            { include: '@flowScalars' },
            // String nodes
            [/.+$/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'string'
                    }
                }]
        ],
        // Flow Collection: Flow Mapping
        object: [
            { include: '@whitespace' },
            { include: '@comment' },
            // Flow Mapping termination
            [/\}/, '@brackets', '@pop'],
            // Flow Mapping delimiter
            [/,/, 'delimiter.comma'],
            // Flow Mapping Key:Value delimiter
            [/:(?= )/, 'operators'],
            // Flow Mapping Key:Value key
            [/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/, 'type'],
            // Start Flow Style
            { include: '@flowCollections' },
            { include: '@flowScalars' },
            // Scalar Data types
            { include: '@tagHandle' },
            { include: '@anchor' },
            { include: '@flowNumber' },
            // Other value (keyword or string)
            [/[^\},]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'string'
                    }
                }]
        ],
        // Flow Collection: Flow Sequence
        array: [
            { include: '@whitespace' },
            { include: '@comment' },
            // Flow Sequence termination
            [/\]/, '@brackets', '@pop'],
            // Flow Sequence delimiter
            [/,/, 'delimiter.comma'],
            // Start Flow Style
            { include: '@flowCollections' },
            { include: '@flowScalars' },
            // Scalar Data types
            { include: '@tagHandle' },
            { include: '@anchor' },
            { include: '@flowNumber' },
            // Other value (keyword or string)
            [/[^\],]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'string'
                    }
                }]
        ],
        // First line of a Block Style
        multiString: [
            [/^( +).+$/, 'string', '@multiStringContinued.$1']
        ],
        // Further lines of a Block Style
        //   Workaround for indentation detection
        multiStringContinued: [
            [/^( *).+$/, {
                    cases: {
                        '$1==$S2': 'string',
                        '@default': { token: '@rematch', next: '@popall' }
                    }
                }]
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white']
        ],
        // Only line comments
        comment: [
            [/#.*$/, 'comment']
        ],
        // Start Flow Collections
        flowCollections: [
            [/\[/, '@brackets', '@array'],
            [/\{/, '@brackets', '@object']
        ],
        // Start Flow Scalars (quoted strings)
        flowScalars: [
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/'([^'\\]|\\.)*$/, 'string.invalid'],
            [/'[^']*'/, 'string'],
            [/"/, 'string', '@doubleQuotedString']
        ],
        doubleQuotedString: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
        // Start Block Scalar
        blockStyle: [
            [/[>|][0-9]*[+-]?$/, 'operators', '@multiString']
        ],
        // Numbers in Flow Collections (terminate with ,]})
        flowNumber: [
            [/@numberInteger(?=[ \t]*[,\]\}])/, 'number'],
            [/@numberFloat(?=[ \t]*[,\]\}])/, 'number.float'],
            [/@numberOctal(?=[ \t]*[,\]\}])/, 'number.octal'],
            [/@numberHex(?=[ \t]*[,\]\}])/, 'number.hex'],
            [/@numberInfinity(?=[ \t]*[,\]\}])/, 'number.infinity'],
            [/@numberNaN(?=[ \t]*[,\]\}])/, 'number.nan'],
            [/@numberDate(?=[ \t]*[,\]\}])/, 'number.date']
        ],
        tagHandle: [
            [/\![^ ]*/, 'tag']
        ],
        anchor: [
            [/[&*][^ ]+/, 'namespace']
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3lhbWwveWFtbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksR0FBRztBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsU0FBUyxxQ0FBcUMsWUFBWSxHQUFHO0FBQzdELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLEVBQUU7QUFDdEIsc0RBQXNELEVBQUU7QUFDeEQ7QUFDQTtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEVBQUU7QUFDbkI7QUFDQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxhQUFhLDhCQUE4QjtBQUMzQyxhQUFhLDBCQUEwQjtBQUN2QztBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDhCQUE4QjtBQUMzQyxhQUFhLDBCQUEwQjtBQUN2QztBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0EsMkNBQTJDO0FBQzNDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsdUNBQXVDO0FBQ3ZDLDRDQUE0QztBQUM1Qyx1Q0FBdUM7QUFDdkMsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9jZjI2MWI2MmIwMzEyMTE2YTVlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJyMnXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXSxcbiAgICBmb2xkaW5nOiB7XG4gICAgICAgIG9mZlNpZGU6IHRydWVcbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICB0b2tlblBvc3RmaXg6ICcueWFtbCcsXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0Jywgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJywgb3BlbjogJ1snLCBjbG9zZTogJ10nIH1cbiAgICBdLFxuICAgIGtleXdvcmRzOiBbJ3RydWUnLCAnVHJ1ZScsICdUUlVFJywgJ2ZhbHNlJywgJ0ZhbHNlJywgJ0ZBTFNFJywgJ251bGwnLCAnTnVsbCcsICdOdWxsJywgJ34nXSxcbiAgICBudW1iZXJJbnRlZ2VyOiAvKD86MHxbKy1dP1swLTldKykvLFxuICAgIG51bWJlckZsb2F0OiAvKD86MHxbKy1dP1swLTldKykoPzpcXC5bMC05XSspPyg/OmVbLStdWzEtOV1bMC05XSopPy8sXG4gICAgbnVtYmVyT2N0YWw6IC8wb1swLTddKy8sXG4gICAgbnVtYmVySGV4OiAvMHhbMC05YS1mQS1GXSsvLFxuICAgIG51bWJlckluZmluaXR5OiAvWystXT9cXC4oPzppbmZ8SW5mfElORikvLFxuICAgIG51bWJlck5hTjogL1xcLig/Om5hbnxOYW58TkFOKS8sXG4gICAgbnVtYmVyRGF0ZTogL1xcZHs0fS1cXGRcXGQtXFxkXFxkKFtUdCBdXFxkXFxkOlxcZFxcZDpcXGRcXGQoXFwuXFxkKyk/KCggP1srLV1cXGRcXGQ/KDpcXGRcXGQpPyl8Wik/KT8vLFxuICAgIGVzY2FwZXM6IC9cXFxcKD86W2J0bmZyXFxcXFwiJ118WzAtN11bMC03XT98WzAtM11bMC03XXsyfSkvLFxuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0Bjb21tZW50JyB9LFxuICAgICAgICAgICAgLy8gRGlyZWN0aXZlXG4gICAgICAgICAgICBbLyVbXiBdKy4qJC8sICdtZXRhLmRpcmVjdGl2ZSddLFxuICAgICAgICAgICAgLy8gRG9jdW1lbnQgTWFya2Vyc1xuICAgICAgICAgICAgWy8tLS0vLCAnb3BlcmF0b3JzLmRpcmVjdGl2ZXNFbmQnXSxcbiAgICAgICAgICAgIFsvXFwuezN9LywgJ29wZXJhdG9ycy5kb2N1bWVudEVuZCddLFxuICAgICAgICAgICAgLy8gQmxvY2sgU3RydWN0dXJlIEluZGljYXRvcnNcbiAgICAgICAgICAgIFsvWy0/Ol0oPz0gKS8sICdvcGVyYXRvcnMnXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BhbmNob3InIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGFnSGFuZGxlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dDb2xsZWN0aW9ucycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BibG9ja1N0eWxlJyB9LFxuICAgICAgICAgICAgLy8gTnVtYmVyc1xuICAgICAgICAgICAgWy9AbnVtYmVySW50ZWdlcig/IVsgXFx0XSpcXFMrKS8sICdudW1iZXInXSxcbiAgICAgICAgICAgIFsvQG51bWJlckZsb2F0KD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9AbnVtYmVyT2N0YWwoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyLm9jdGFsJ10sXG4gICAgICAgICAgICBbL0BudW1iZXJIZXgoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy9AbnVtYmVySW5maW5pdHkoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyLmluZmluaXR5J10sXG4gICAgICAgICAgICBbL0BudW1iZXJOYU4oPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyLm5hbiddLFxuICAgICAgICAgICAgWy9AbnVtYmVyRGF0ZSg/IVsgXFx0XSpcXFMrKS8sICdudW1iZXIuZGF0ZSddLFxuICAgICAgICAgICAgLy8gS2V5OlZhbHVlIHBhaXJcbiAgICAgICAgICAgIFsvKFwiLio/XCJ8Jy4qPyd8Lio/KShbIFxcdF0qKSg6KSggfCQpLywgWyd0eXBlJywgJ3doaXRlJywgJ29wZXJhdG9ycycsICd3aGl0ZSddXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93U2NhbGFycycgfSxcbiAgICAgICAgICAgIC8vIFN0cmluZyBub2Rlc1xuICAgICAgICAgICAgWy8uKyQvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEZsb3cgQ29sbGVjdGlvbjogRmxvdyBNYXBwaW5nXG4gICAgICAgIG9iamVjdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tbWVudCcgfSxcbiAgICAgICAgICAgIC8vIEZsb3cgTWFwcGluZyB0ZXJtaW5hdGlvblxuICAgICAgICAgICAgWy9cXH0vLCAnQGJyYWNrZXRzJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIC8vIEZsb3cgTWFwcGluZyBkZWxpbWl0ZXJcbiAgICAgICAgICAgIFsvLC8sICdkZWxpbWl0ZXIuY29tbWEnXSxcbiAgICAgICAgICAgIC8vIEZsb3cgTWFwcGluZyBLZXk6VmFsdWUgZGVsaW1pdGVyXG4gICAgICAgICAgICBbLzooPz0gKS8sICdvcGVyYXRvcnMnXSxcbiAgICAgICAgICAgIC8vIEZsb3cgTWFwcGluZyBLZXk6VmFsdWUga2V5XG4gICAgICAgICAgICBbLyg/OlwiLio/XCJ8Jy4qPyd8W14sXFx7XFxbXSs/KSg/PTogKS8sICd0eXBlJ10sXG4gICAgICAgICAgICAvLyBTdGFydCBGbG93IFN0eWxlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAZmxvd0NvbGxlY3Rpb25zJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dTY2FsYXJzJyB9LFxuICAgICAgICAgICAgLy8gU2NhbGFyIERhdGEgdHlwZXNcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B0YWdIYW5kbGUnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYW5jaG9yJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dOdW1iZXInIH0sXG4gICAgICAgICAgICAvLyBPdGhlciB2YWx1ZSAoa2V5d29yZCBvciBzdHJpbmcpXG4gICAgICAgICAgICBbL1teXFx9LF0rLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBGbG93IENvbGxlY3Rpb246IEZsb3cgU2VxdWVuY2VcbiAgICAgICAgYXJyYXk6IFtcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnQnIH0sXG4gICAgICAgICAgICAvLyBGbG93IFNlcXVlbmNlIHRlcm1pbmF0aW9uXG4gICAgICAgICAgICBbL1xcXS8sICdAYnJhY2tldHMnLCAnQHBvcCddLFxuICAgICAgICAgICAgLy8gRmxvdyBTZXF1ZW5jZSBkZWxpbWl0ZXJcbiAgICAgICAgICAgIFsvLC8sICdkZWxpbWl0ZXIuY29tbWEnXSxcbiAgICAgICAgICAgIC8vIFN0YXJ0IEZsb3cgU3R5bGVcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93Q29sbGVjdGlvbnMnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAZmxvd1NjYWxhcnMnIH0sXG4gICAgICAgICAgICAvLyBTY2FsYXIgRGF0YSB0eXBlc1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHRhZ0hhbmRsZScgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BhbmNob3InIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAZmxvd051bWJlcicgfSxcbiAgICAgICAgICAgIC8vIE90aGVyIHZhbHVlIChrZXl3b3JkIG9yIHN0cmluZylcbiAgICAgICAgICAgIFsvW15cXF0sXSsvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogJ2tleXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEZpcnN0IGxpbmUgb2YgYSBCbG9jayBTdHlsZVxuICAgICAgICBtdWx0aVN0cmluZzogW1xuICAgICAgICAgICAgWy9eKCArKS4rJC8sICdzdHJpbmcnLCAnQG11bHRpU3RyaW5nQ29udGludWVkLiQxJ11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gRnVydGhlciBsaW5lcyBvZiBhIEJsb2NrIFN0eWxlXG4gICAgICAgIC8vICAgV29ya2Fyb3VuZCBmb3IgaW5kZW50YXRpb24gZGV0ZWN0aW9uXG4gICAgICAgIG11bHRpU3RyaW5nQ29udGludWVkOiBbXG4gICAgICAgICAgICBbL14oICopLiskLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQxPT0kUzInOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wYWxsJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnd2hpdGUnXVxuICAgICAgICBdLFxuICAgICAgICAvLyBPbmx5IGxpbmUgY29tbWVudHNcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICAgICAgWy8jLiokLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICAvLyBTdGFydCBGbG93IENvbGxlY3Rpb25zXG4gICAgICAgIGZsb3dDb2xsZWN0aW9uczogW1xuICAgICAgICAgICAgWy9cXFsvLCAnQGJyYWNrZXRzJywgJ0BhcnJheSddLFxuICAgICAgICAgICAgWy9cXHsvLCAnQGJyYWNrZXRzJywgJ0BvYmplY3QnXVxuICAgICAgICBdLFxuICAgICAgICAvLyBTdGFydCBGbG93IFNjYWxhcnMgKHF1b3RlZCBzdHJpbmdzKVxuICAgICAgICBmbG93U2NhbGFyczogW1xuICAgICAgICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvJyhbXidcXFxcXXxcXFxcLikqJC8sICdzdHJpbmcuaW52YWxpZCddLFxuICAgICAgICAgICAgWy8nW14nXSonLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcnLCAnQGRvdWJsZVF1b3RlZFN0cmluZyddXG4gICAgICAgIF0sXG4gICAgICAgIGRvdWJsZVF1b3RlZFN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcnLCAnQHBvcCddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIFN0YXJ0IEJsb2NrIFNjYWxhclxuICAgICAgICBibG9ja1N0eWxlOiBbXG4gICAgICAgICAgICBbL1s+fF1bMC05XSpbKy1dPyQvLCAnb3BlcmF0b3JzJywgJ0BtdWx0aVN0cmluZyddXG4gICAgICAgIF0sXG4gICAgICAgIC8vIE51bWJlcnMgaW4gRmxvdyBDb2xsZWN0aW9ucyAodGVybWluYXRlIHdpdGggLF19KVxuICAgICAgICBmbG93TnVtYmVyOiBbXG4gICAgICAgICAgICBbL0BudW1iZXJJbnRlZ2VyKD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbL0BudW1iZXJGbG9hdCg/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9AbnVtYmVyT2N0YWwoPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXIub2N0YWwnXSxcbiAgICAgICAgICAgIFsvQG51bWJlckhleCg/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvQG51bWJlckluZmluaXR5KD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyLmluZmluaXR5J10sXG4gICAgICAgICAgICBbL0BudW1iZXJOYU4oPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXIubmFuJ10sXG4gICAgICAgICAgICBbL0BudW1iZXJEYXRlKD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyLmRhdGUnXVxuICAgICAgICBdLFxuICAgICAgICB0YWdIYW5kbGU6IFtcbiAgICAgICAgICAgIFsvXFwhW14gXSovLCAndGFnJ11cbiAgICAgICAgXSxcbiAgICAgICAgYW5jaG9yOiBbXG4gICAgICAgICAgICBbL1smKl1bXiBdKy8sICduYW1lc3BhY2UnXVxuICAgICAgICBdXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=