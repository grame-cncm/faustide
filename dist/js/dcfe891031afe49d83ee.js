(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/xml/xml.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/xml/xml.js ***!
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
        blockComment: ['<!--', '-->'],
    },
    brackets: [
        ['<', '>']
    ],
    autoClosingPairs: [
        { open: '<', close: '>' },
        { open: '\'', close: '\'' },
        { open: '"', close: '"' },
    ],
    surroundingPairs: [
        { open: '<', close: '>' },
        { open: '\'', close: '\'' },
        { open: '"', close: '"' },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.xml',
    ignoreCase: true,
    // Useful regular expressions
    qualifiedName: /(?:[\w\.\-]+:)?[\w\.\-]+/,
    tokenizer: {
        root: [
            [/[^<&]+/, ''],
            { include: '@whitespace' },
            // Standard opening tag
            [/(<)(@qualifiedName)/, [
                    { token: 'delimiter' },
                    { token: 'tag', next: '@tag' }
                ]],
            // Standard closing tag
            [/(<\/)(@qualifiedName)(\s*)(>)/, [
                    { token: 'delimiter' },
                    { token: 'tag' },
                    '',
                    { token: 'delimiter' }
                ]],
            // Meta tags - instruction
            [/(<\?)(@qualifiedName)/, [
                    { token: 'delimiter' },
                    { token: 'metatag', next: '@tag' }
                ]],
            // Meta tags - declaration
            [/(<\!)(@qualifiedName)/, [
                    { token: 'delimiter' },
                    { token: 'metatag', next: '@tag' }
                ]],
            // CDATA
            [/<\!\[CDATA\[/, { token: 'delimiter.cdata', next: '@cdata' }],
            [/&\w+;/, 'string.escape'],
        ],
        cdata: [
            [/[^\]]+/, ''],
            [/\]\]>/, { token: 'delimiter.cdata', next: '@pop' }],
            [/\]/, '']
        ],
        tag: [
            [/[ \t\r\n]+/, ''],
            [/(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name', '', 'attribute.value']],
            [/(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/, ['attribute.name', '', 'attribute.value']],
            [/(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/, ['attribute.name', '', 'attribute.value']],
            [/@qualifiedName/, 'attribute.name'],
            [/\?>/, { token: 'delimiter', next: '@pop' }],
            [/(\/)(>)/, [
                    { token: 'tag' },
                    { token: 'delimiter', next: '@pop' }
                ]],
            [/>/, { token: 'delimiter', next: '@pop' }],
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/<!--/, { token: 'comment', next: '@comment' }]
        ],
        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, { token: 'comment', next: '@pop' }],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content']
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3htbC94bWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLHdCQUF3QjtBQUNqQztBQUNBO0FBQ0EsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx3QkFBd0I7QUFDakM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSw4QkFBOEIsMkNBQTJDO0FBQ3pFLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseUNBQXlDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUNBQW1DO0FBQ3hEO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEMscUJBQXFCO0FBQ3JCO0FBQ0EsbUJBQW1CLG1DQUFtQztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUNBQXFDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQ0FBaUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMIiwiZmlsZSI6ImpzL2RjZmU4OTEwMzFhZmU0OWQ4M2VlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJzwhLS0nLCAnLS0+J10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJzwnLCAnPiddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJzwnLCBjbG9zZTogJz4nIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJzwnLCBjbG9zZTogJz4nIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgXVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcueG1sJyxcbiAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgIC8vIFVzZWZ1bCByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgcXVhbGlmaWVkTmFtZTogLyg/OltcXHdcXC5cXC1dKzopP1tcXHdcXC5cXC1dKy8sXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIFsvW148Jl0rLywgJyddLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICAvLyBTdGFuZGFyZCBvcGVuaW5nIHRhZ1xuICAgICAgICAgICAgWy8oPCkoQHF1YWxpZmllZE5hbWUpLywgW1xuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAndGFnJywgbmV4dDogJ0B0YWcnIH1cbiAgICAgICAgICAgICAgICBdXSxcbiAgICAgICAgICAgIC8vIFN0YW5kYXJkIGNsb3NpbmcgdGFnXG4gICAgICAgICAgICBbLyg8XFwvKShAcXVhbGlmaWVkTmFtZSkoXFxzKikoPikvLCBbXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXInIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46ICd0YWcnIH0sXG4gICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyJyB9XG4gICAgICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICAvLyBNZXRhIHRhZ3MgLSBpbnN0cnVjdGlvblxuICAgICAgICAgICAgWy8oPFxcPykoQHF1YWxpZmllZE5hbWUpLywgW1xuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnbWV0YXRhZycsIG5leHQ6ICdAdGFnJyB9XG4gICAgICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICAvLyBNZXRhIHRhZ3MgLSBkZWNsYXJhdGlvblxuICAgICAgICAgICAgWy8oPFxcISkoQHF1YWxpZmllZE5hbWUpLywgW1xuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAnbWV0YXRhZycsIG5leHQ6ICdAdGFnJyB9XG4gICAgICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICAvLyBDREFUQVxuICAgICAgICAgICAgWy88XFwhXFxbQ0RBVEFcXFsvLCB7IHRva2VuOiAnZGVsaW1pdGVyLmNkYXRhJywgbmV4dDogJ0BjZGF0YScgfV0sXG4gICAgICAgICAgICBbLyZcXHcrOy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgIF0sXG4gICAgICAgIGNkYXRhOiBbXG4gICAgICAgICAgICBbL1teXFxdXSsvLCAnJ10sXG4gICAgICAgICAgICBbL1xcXVxcXT4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmNkYXRhJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy9cXF0vLCAnJ11cbiAgICAgICAgXSxcbiAgICAgICAgdGFnOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnJ10sXG4gICAgICAgICAgICBbLyhAcXVhbGlmaWVkTmFtZSkoXFxzKj1cXHMqKShcIlteXCJdKlwifCdbXiddKicpLywgWydhdHRyaWJ1dGUubmFtZScsICcnLCAnYXR0cmlidXRlLnZhbHVlJ11dLFxuICAgICAgICAgICAgWy8oQHF1YWxpZmllZE5hbWUpKFxccyo9XFxzKikoXCJbXlwiPj9cXC9dKnwnW14nPj9cXC9dKikoPz1bXFw/XFwvXVxcPikvLCBbJ2F0dHJpYnV0ZS5uYW1lJywgJycsICdhdHRyaWJ1dGUudmFsdWUnXV0sXG4gICAgICAgICAgICBbLyhAcXVhbGlmaWVkTmFtZSkoXFxzKj1cXHMqKShcIlteXCI+XSp8J1teJz5dKikvLCBbJ2F0dHJpYnV0ZS5uYW1lJywgJycsICdhdHRyaWJ1dGUudmFsdWUnXV0sXG4gICAgICAgICAgICBbL0BxdWFsaWZpZWROYW1lLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbL1xcPz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy8oXFwvKSg+KS8sIFtcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ3RhZycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlcicsIG5leHQ6ICdAcG9wJyB9XG4gICAgICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnJ10sXG4gICAgICAgICAgICBbLzwhLS0vLCB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdAY29tbWVudCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICAgICAgWy9bXjxcXC1dKy8sICdjb21tZW50LmNvbnRlbnQnXSxcbiAgICAgICAgICAgIFsvLS0+LywgeyB0b2tlbjogJ2NvbW1lbnQnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICBbLzwhLS0vLCAnY29tbWVudC5jb250ZW50LmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvWzxcXC1dLywgJ2NvbW1lbnQuY29udGVudCddXG4gICAgICAgIF0sXG4gICAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9