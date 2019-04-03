(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/scss/scss.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/scss/scss.js ***!
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
    wordPattern: /(#?-?\d*\.\d\w*%?)|([@$#!.:]?[\w-?]+%?)|[@#!.]/g,
    comments: {
        blockComment: ['/*', '*/'],
        lineComment: '//'
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
        { open: '(', close: ')', notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string', 'comment'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
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
            start: new RegExp("^\\s*\\/\\*\\s*#region\\b\\s*(.*?)\\s*\\*\\/"),
            end: new RegExp("^\\s*\\/\\*\\s*#endregion\\b.*\\*\\/")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.scss',
    ws: '[ \t\n\r\f]*',
    identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
    brackets: [
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.bracket' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
        { open: '<', close: '>', token: 'delimiter.angle' }
    ],
    tokenizer: {
        root: [
            { include: '@selector' },
        ],
        selector: [
            { include: '@comments' },
            { include: '@import' },
            { include: '@variabledeclaration' },
            { include: '@warndebug' },
            ['[@](include)', { token: 'keyword', next: '@includedeclaration' }],
            ['[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)', { token: 'keyword', next: '@keyframedeclaration' }],
            ['[@](page|content|font-face|-moz-document)', { token: 'keyword' }],
            ['[@](charset|namespace)', { token: 'keyword', next: '@declarationbody' }],
            ['[@](function)', { token: 'keyword', next: '@functiondeclaration' }],
            ['[@](mixin)', { token: 'keyword', next: '@mixindeclaration' }],
            ['url(\\-prefix)?\\(', { token: 'meta', next: '@urldeclaration' }],
            { include: '@controlstatement' },
            { include: '@selectorname' },
            ['[&\\*]', 'tag'],
            ['[>\\+,]', 'delimiter'],
            ['\\[', { token: 'delimiter.bracket', next: '@selectorattribute' }],
            ['{', { token: 'delimiter.curly', next: '@selectorbody' }],
        ],
        selectorbody: [
            ['[*_]?@identifier@ws:(?=(\\s|\\d|[^{;}]*[;}]))', 'attribute.name', '@rulevalue'],
            { include: '@selector' },
            ['[@](extend)', { token: 'keyword', next: '@extendbody' }],
            ['[@](return)', { token: 'keyword', next: '@declarationbody' }],
            ['}', { token: 'delimiter.curly', next: '@pop' }],
        ],
        selectorname: [
            ['#{', { token: 'meta', next: '@variableinterpolation' }],
            ['(\\.|#(?=[^{])|%|(@identifier)|:)+', 'tag'],
        ],
        selectorattribute: [
            { include: '@term' },
            [']', { token: 'delimiter.bracket', next: '@pop' }],
        ],
        term: [
            { include: '@comments' },
            ['url(\\-prefix)?\\(', { token: 'meta', next: '@urldeclaration' }],
            { include: '@functioninvocation' },
            { include: '@numbers' },
            { include: '@strings' },
            { include: '@variablereference' },
            ['(and\\b|or\\b|not\\b)', 'operator'],
            { include: '@name' },
            ['([<>=\\+\\-\\*\\/\\^\\|\\~,])', 'operator'],
            [',', 'delimiter'],
            ['!default', 'literal'],
            ['\\(', { token: 'delimiter.parenthesis', next: '@parenthizedterm' }],
        ],
        rulevalue: [
            { include: '@term' },
            ['!important', 'literal'],
            [';', 'delimiter', '@pop'],
            ['{', { token: 'delimiter.curly', switchTo: '@nestedproperty' }],
            ['(?=})', { token: '', next: '@pop' }],
        ],
        nestedproperty: [
            ['[*_]?@identifier@ws:', 'attribute.name', '@rulevalue'],
            { include: '@comments' },
            ['}', { token: 'delimiter.curly', next: '@pop' }],
        ],
        warndebug: [
            ['[@](warn|debug)', { token: 'keyword', next: '@declarationbody' }],
        ],
        import: [
            ['[@](import)', { token: 'keyword', next: '@declarationbody' }],
        ],
        variabledeclaration: [
            ['\\$@identifier@ws:', 'variable.decl', '@declarationbody'],
        ],
        urldeclaration: [
            { include: '@strings' },
            ['[^)\r\n]+', 'string'],
            ['\\)', { token: 'meta', next: '@pop' }],
        ],
        parenthizedterm: [
            { include: '@term' },
            ['\\)', { token: 'delimiter.parenthesis', next: '@pop' }],
        ],
        declarationbody: [
            { include: '@term' },
            [';', 'delimiter', '@pop'],
            ['(?=})', { token: '', next: '@pop' }],
        ],
        extendbody: [
            { include: '@selectorname' },
            ['!optional', 'literal'],
            [';', 'delimiter', '@pop'],
            ['(?=})', { token: '', next: '@pop' }],
        ],
        variablereference: [
            ['\\$@identifier', 'variable.ref'],
            ['\\.\\.\\.', 'operator'],
            ['#{', { token: 'meta', next: '@variableinterpolation' }],
        ],
        variableinterpolation: [
            { include: '@variablereference' },
            ['}', { token: 'meta', next: '@pop' }],
        ],
        comments: [
            ['\\/\\*', 'comment', '@comment'],
            ['\\/\\/+.*', 'comment'],
        ],
        comment: [
            ['\\*\\/', 'comment', '@pop'],
            ['.', 'comment'],
        ],
        name: [
            ['@identifier', 'attribute.value'],
        ],
        numbers: [
            ['(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', { token: 'number', next: '@units' }],
            ['#[0-9a-fA-F_]+(?!\\w)', 'number.hex'],
        ],
        units: [
            ['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'number', '@pop']
        ],
        functiondeclaration: [
            ['@identifier@ws\\(', { token: 'meta', next: '@parameterdeclaration' }],
            ['{', { token: 'delimiter.curly', switchTo: '@functionbody' }],
        ],
        mixindeclaration: [
            // mixin with parameters
            ['@identifier@ws\\(', { token: 'meta', next: '@parameterdeclaration' }],
            // mixin without parameters
            ['@identifier', 'meta'],
            ['{', { token: 'delimiter.curly', switchTo: '@selectorbody' }],
        ],
        parameterdeclaration: [
            ['\\$@identifier@ws:', 'variable.decl'],
            ['\\.\\.\\.', 'operator'],
            [',', 'delimiter'],
            { include: '@term' },
            ['\\)', { token: 'meta', next: '@pop' }],
        ],
        includedeclaration: [
            { include: '@functioninvocation' },
            ['@identifier', 'meta'],
            [';', 'delimiter', '@pop'],
            ['(?=})', { token: '', next: '@pop' }],
            ['{', { token: 'delimiter.curly', switchTo: '@selectorbody' }],
        ],
        keyframedeclaration: [
            ['@identifier', 'meta'],
            ['{', { token: 'delimiter.curly', switchTo: '@keyframebody' }],
        ],
        keyframebody: [
            { include: '@term' },
            ['{', { token: 'delimiter.curly', next: '@selectorbody' }],
            ['}', { token: 'delimiter.curly', next: '@pop' }],
        ],
        controlstatement: [
            ['[@](if|else|for|while|each|media)', { token: 'keyword.flow', next: '@controlstatementdeclaration' }],
        ],
        controlstatementdeclaration: [
            ['(in|from|through|if|to)\\b', { token: 'keyword.flow' }],
            { include: '@term' },
            ['{', { token: 'delimiter.curly', switchTo: '@selectorbody' }],
        ],
        functionbody: [
            ['[@](return)', { token: 'keyword' }],
            { include: '@variabledeclaration' },
            { include: '@term' },
            { include: '@controlstatement' },
            [';', 'delimiter'],
            ['}', { token: 'delimiter.curly', next: '@pop' }],
        ],
        functioninvocation: [
            ['@identifier\\(', { token: 'meta', next: '@functionarguments' }],
        ],
        functionarguments: [
            ['\\$@identifier@ws:', 'attribute.name'],
            ['[,]', 'delimiter'],
            { include: '@term' },
            ['\\)', { token: 'meta', next: '@pop' }],
        ],
        strings: [
            ['~?"', { token: 'string.delimiter', next: '@stringenddoublequote' }],
            ['~?\'', { token: 'string.delimiter', next: '@stringendquote' }]
        ],
        stringenddoublequote: [
            ['\\\\.', 'string'],
            ['"', { token: 'string.delimiter', next: '@pop' }],
            ['.', 'string']
        ],
        stringendquote: [
            ['\\\\.', 'string'],
            ['\'', { token: 'string.delimiter', next: '@pop' }],
            ['.', 'string']
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Njc3Mvc2Nzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDYTtBQUNOO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxpQ0FBaUM7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyx3REFBd0Q7QUFDakU7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELElBQUksbURBQW1ELElBQUk7QUFDN0c7QUFDQSxTQUFTLFNBQVMsWUFBWSw2QkFBNkI7QUFDM0QsU0FBUyxvREFBb0Q7QUFDN0QsU0FBUyx3REFBd0Q7QUFDakUsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLGtDQUFrQztBQUMvQyxhQUFhLHdCQUF3QjtBQUNyQyw4QkFBOEIsZ0RBQWdEO0FBQzlFLDhFQUE4RSxpREFBaUQ7QUFDL0gsMkRBQTJELG1CQUFtQjtBQUM5RSx3Q0FBd0MsNkNBQTZDO0FBQ3JGLCtCQUErQixpREFBaUQ7QUFDaEYsNEJBQTRCLDhDQUE4QztBQUMxRSxvQ0FBb0MseUNBQXlDO0FBQzdFLGFBQWEsK0JBQStC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OEI7QUFDbkQ7QUFDQTtBQUNBLHFCQUFxQiwyREFBMkQ7QUFDaEYsc0JBQXNCLHFEQUFxRDtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMENBQTBDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBDQUEwQztBQUM5RDtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy83MTk0MjZmOTE4ZmU0NTI5ZDY4Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIHdvcmRQYXR0ZXJuOiAvKCM/LT9cXGQqXFwuXFxkXFx3KiU/KXwoW0AkIyEuOl0/W1xcdy0/XSslPyl8W0AjIS5dL2csXG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJy8qJywgJyovJ10sXG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXSxcbiAgICBmb2xkaW5nOiB7XG4gICAgICAgIG1hcmtlcnM6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKlxcXFwvXFxcXCpcXFxccyojcmVnaW9uXFxcXGJcXFxccyooLio/KVxcXFxzKlxcXFwqXFxcXC9cIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqXFxcXC9cXFxcKlxcXFxzKiNlbmRyZWdpb25cXFxcYi4qXFxcXCpcXFxcL1wiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcuc2NzcycsXG4gICAgd3M6ICdbIFxcdFxcblxcclxcZl0qJyxcbiAgICBpZGVudGlmaWVyOiAnLT8tPyhbYS16QS1aXXwoXFxcXFxcXFwoKFswLTlhLWZBLUZdezEsNn1cXFxccz8pfFteWzAtOWEtZkEtRl0pKSkoW1xcXFx3XFxcXC1dfChcXFxcXFxcXCgoWzAtOWEtZkEtRl17MSw2fVxcXFxzPyl8W15bMC05YS1mQS1GXSkpKSonLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCB0b2tlbjogJ2RlbGltaXRlci5jdXJseScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIHRva2VuOiAnZGVsaW1pdGVyLmJyYWNrZXQnIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfSxcbiAgICAgICAgeyBvcGVuOiAnPCcsIGNsb3NlOiAnPicsIHRva2VuOiAnZGVsaW1pdGVyLmFuZ2xlJyB9XG4gICAgXSxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHNlbGVjdG9yJyB9LFxuICAgICAgICBdLFxuICAgICAgICBzZWxlY3RvcjogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnRzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGltcG9ydCcgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B2YXJpYWJsZWRlY2xhcmF0aW9uJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdhcm5kZWJ1ZycgfSxcbiAgICAgICAgICAgIFsnW0BdKGluY2x1ZGUpJywgeyB0b2tlbjogJ2tleXdvcmQnLCBuZXh0OiAnQGluY2x1ZGVkZWNsYXJhdGlvbicgfV0sXG4gICAgICAgICAgICBbJ1tAXShrZXlmcmFtZXN8LXdlYmtpdC1rZXlmcmFtZXN8LW1vei1rZXlmcmFtZXN8LW8ta2V5ZnJhbWVzKScsIHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BrZXlmcmFtZWRlY2xhcmF0aW9uJyB9XSxcbiAgICAgICAgICAgIFsnW0BdKHBhZ2V8Y29udGVudHxmb250LWZhY2V8LW1vei1kb2N1bWVudCknLCB7IHRva2VuOiAna2V5d29yZCcgfV0sXG4gICAgICAgICAgICBbJ1tAXShjaGFyc2V0fG5hbWVzcGFjZSknLCB7IHRva2VuOiAna2V5d29yZCcsIG5leHQ6ICdAZGVjbGFyYXRpb25ib2R5JyB9XSxcbiAgICAgICAgICAgIFsnW0BdKGZ1bmN0aW9uKScsIHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BmdW5jdGlvbmRlY2xhcmF0aW9uJyB9XSxcbiAgICAgICAgICAgIFsnW0BdKG1peGluKScsIHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BtaXhpbmRlY2xhcmF0aW9uJyB9XSxcbiAgICAgICAgICAgIFsndXJsKFxcXFwtcHJlZml4KT9cXFxcKCcsIHsgdG9rZW46ICdtZXRhJywgbmV4dDogJ0B1cmxkZWNsYXJhdGlvbicgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29udHJvbHN0YXRlbWVudCcgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BzZWxlY3Rvcm5hbWUnIH0sXG4gICAgICAgICAgICBbJ1smXFxcXCpdJywgJ3RhZyddLFxuICAgICAgICAgICAgWydbPlxcXFwrLF0nLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbJ1xcXFxbJywgeyB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0JywgbmV4dDogJ0BzZWxlY3RvcmF0dHJpYnV0ZScgfV0sXG4gICAgICAgICAgICBbJ3snLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JywgbmV4dDogJ0BzZWxlY3RvcmJvZHknIH1dLFxuICAgICAgICBdLFxuICAgICAgICBzZWxlY3RvcmJvZHk6IFtcbiAgICAgICAgICAgIFsnWypfXT9AaWRlbnRpZmllckB3czooPz0oXFxcXHN8XFxcXGR8W157O31dKls7fV0pKScsICdhdHRyaWJ1dGUubmFtZScsICdAcnVsZXZhbHVlJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAc2VsZWN0b3InIH0sXG4gICAgICAgICAgICBbJ1tAXShleHRlbmQpJywgeyB0b2tlbjogJ2tleXdvcmQnLCBuZXh0OiAnQGV4dGVuZGJvZHknIH1dLFxuICAgICAgICAgICAgWydbQF0ocmV0dXJuKScsIHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BkZWNsYXJhdGlvbmJvZHknIH1dLFxuICAgICAgICAgICAgWyd9JywgeyB0b2tlbjogJ2RlbGltaXRlci5jdXJseScsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgc2VsZWN0b3JuYW1lOiBbXG4gICAgICAgICAgICBbJyN7JywgeyB0b2tlbjogJ21ldGEnLCBuZXh0OiAnQHZhcmlhYmxlaW50ZXJwb2xhdGlvbicgfV0sXG4gICAgICAgICAgICBbJyhcXFxcLnwjKD89W157XSl8JXwoQGlkZW50aWZpZXIpfDopKycsICd0YWcnXSxcbiAgICAgICAgXSxcbiAgICAgICAgc2VsZWN0b3JhdHRyaWJ1dGU6IFtcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B0ZXJtJyB9LFxuICAgICAgICAgICAgWyddJywgeyB0b2tlbjogJ2RlbGltaXRlci5icmFja2V0JywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICB0ZXJtOiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tbWVudHMnIH0sXG4gICAgICAgICAgICBbJ3VybChcXFxcLXByZWZpeCk/XFxcXCgnLCB7IHRva2VuOiAnbWV0YScsIG5leHQ6ICdAdXJsZGVjbGFyYXRpb24nIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZ1bmN0aW9uaW52b2NhdGlvbicgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BudW1iZXJzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHN0cmluZ3MnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdmFyaWFibGVyZWZlcmVuY2UnIH0sXG4gICAgICAgICAgICBbJyhhbmRcXFxcYnxvclxcXFxifG5vdFxcXFxiKScsICdvcGVyYXRvciddLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQG5hbWUnIH0sXG4gICAgICAgICAgICBbJyhbPD49XFxcXCtcXFxcLVxcXFwqXFxcXC9cXFxcXlxcXFx8XFxcXH4sXSknLCAnb3BlcmF0b3InXSxcbiAgICAgICAgICAgIFsnLCcsICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsnIWRlZmF1bHQnLCAnbGl0ZXJhbCddLFxuICAgICAgICAgICAgWydcXFxcKCcsIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBuZXh0OiAnQHBhcmVudGhpemVkdGVybScgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHJ1bGV2YWx1ZTogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHRlcm0nIH0sXG4gICAgICAgICAgICBbJyFpbXBvcnRhbnQnLCAnbGl0ZXJhbCddLFxuICAgICAgICAgICAgWyc7JywgJ2RlbGltaXRlcicsICdAcG9wJ10sXG4gICAgICAgICAgICBbJ3snLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgc3dpdGNoVG86ICdAbmVzdGVkcHJvcGVydHknIH1dLFxuICAgICAgICAgICAgWycoPz19KScsIHsgdG9rZW46ICcnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIG5lc3RlZHByb3BlcnR5OiBbXG4gICAgICAgICAgICBbJ1sqX10/QGlkZW50aWZpZXJAd3M6JywgJ2F0dHJpYnV0ZS5uYW1lJywgJ0BydWxldmFsdWUnXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0Bjb21tZW50cycgfSxcbiAgICAgICAgICAgIFsnfScsIHsgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHdhcm5kZWJ1ZzogW1xuICAgICAgICAgICAgWydbQF0od2FybnxkZWJ1ZyknLCB7IHRva2VuOiAna2V5d29yZCcsIG5leHQ6ICdAZGVjbGFyYXRpb25ib2R5JyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgaW1wb3J0OiBbXG4gICAgICAgICAgICBbJ1tAXShpbXBvcnQpJywgeyB0b2tlbjogJ2tleXdvcmQnLCBuZXh0OiAnQGRlY2xhcmF0aW9uYm9keScgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHZhcmlhYmxlZGVjbGFyYXRpb246IFtcbiAgICAgICAgICAgIFsnXFxcXCRAaWRlbnRpZmllckB3czonLCAndmFyaWFibGUuZGVjbCcsICdAZGVjbGFyYXRpb25ib2R5J10sXG4gICAgICAgIF0sXG4gICAgICAgIHVybGRlY2xhcmF0aW9uOiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAc3RyaW5ncycgfSxcbiAgICAgICAgICAgIFsnW14pXFxyXFxuXSsnLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbJ1xcXFwpJywgeyB0b2tlbjogJ21ldGEnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmVudGhpemVkdGVybTogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHRlcm0nIH0sXG4gICAgICAgICAgICBbJ1xcXFwpJywgeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgZGVjbGFyYXRpb25ib2R5OiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGVybScgfSxcbiAgICAgICAgICAgIFsnOycsICdkZWxpbWl0ZXInLCAnQHBvcCddLFxuICAgICAgICAgICAgWycoPz19KScsIHsgdG9rZW46ICcnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIGV4dGVuZGJvZHk6IFtcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BzZWxlY3Rvcm5hbWUnIH0sXG4gICAgICAgICAgICBbJyFvcHRpb25hbCcsICdsaXRlcmFsJ10sXG4gICAgICAgICAgICBbJzsnLCAnZGVsaW1pdGVyJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsnKD89fSknLCB7IHRva2VuOiAnJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICB2YXJpYWJsZXJlZmVyZW5jZTogW1xuICAgICAgICAgICAgWydcXFxcJEBpZGVudGlmaWVyJywgJ3ZhcmlhYmxlLnJlZiddLFxuICAgICAgICAgICAgWydcXFxcLlxcXFwuXFxcXC4nLCAnb3BlcmF0b3InXSxcbiAgICAgICAgICAgIFsnI3snLCB7IHRva2VuOiAnbWV0YScsIG5leHQ6ICdAdmFyaWFibGVpbnRlcnBvbGF0aW9uJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgdmFyaWFibGVpbnRlcnBvbGF0aW9uOiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdmFyaWFibGVyZWZlcmVuY2UnIH0sXG4gICAgICAgICAgICBbJ30nLCB7IHRva2VuOiAnbWV0YScsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgY29tbWVudHM6IFtcbiAgICAgICAgICAgIFsnXFxcXC9cXFxcKicsICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbJ1xcXFwvXFxcXC8rLionLCAnY29tbWVudCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbJ1xcXFwqXFxcXC8nLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbJy4nLCAnY29tbWVudCddLFxuICAgICAgICBdLFxuICAgICAgICBuYW1lOiBbXG4gICAgICAgICAgICBbJ0BpZGVudGlmaWVyJywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICBdLFxuICAgICAgICBudW1iZXJzOiBbXG4gICAgICAgICAgICBbJyhcXFxcZCpcXFxcLik/XFxcXGQrKFtlRV1bXFxcXC0rXT9cXFxcZCspPycsIHsgdG9rZW46ICdudW1iZXInLCBuZXh0OiAnQHVuaXRzJyB9XSxcbiAgICAgICAgICAgIFsnI1swLTlhLWZBLUZfXSsoPyFcXFxcdyknLCAnbnVtYmVyLmhleCddLFxuICAgICAgICBdLFxuICAgICAgICB1bml0czogW1xuICAgICAgICAgICAgWycoZW18ZXh8Y2h8cmVtfHZtaW58dm1heHx2d3x2aHx2bXxjbXxtbXxpbnxweHxwdHxwY3xkZWd8Z3JhZHxyYWR8dHVybnxzfG1zfEh6fGtIenwlKT8nLCAnbnVtYmVyJywgJ0Bwb3AnXVxuICAgICAgICBdLFxuICAgICAgICBmdW5jdGlvbmRlY2xhcmF0aW9uOiBbXG4gICAgICAgICAgICBbJ0BpZGVudGlmaWVyQHdzXFxcXCgnLCB7IHRva2VuOiAnbWV0YScsIG5leHQ6ICdAcGFyYW1ldGVyZGVjbGFyYXRpb24nIH1dLFxuICAgICAgICAgICAgWyd7JywgeyB0b2tlbjogJ2RlbGltaXRlci5jdXJseScsIHN3aXRjaFRvOiAnQGZ1bmN0aW9uYm9keScgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIG1peGluZGVjbGFyYXRpb246IFtcbiAgICAgICAgICAgIC8vIG1peGluIHdpdGggcGFyYW1ldGVyc1xuICAgICAgICAgICAgWydAaWRlbnRpZmllckB3c1xcXFwoJywgeyB0b2tlbjogJ21ldGEnLCBuZXh0OiAnQHBhcmFtZXRlcmRlY2xhcmF0aW9uJyB9XSxcbiAgICAgICAgICAgIC8vIG1peGluIHdpdGhvdXQgcGFyYW1ldGVyc1xuICAgICAgICAgICAgWydAaWRlbnRpZmllcicsICdtZXRhJ10sXG4gICAgICAgICAgICBbJ3snLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgc3dpdGNoVG86ICdAc2VsZWN0b3Jib2R5JyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgcGFyYW1ldGVyZGVjbGFyYXRpb246IFtcbiAgICAgICAgICAgIFsnXFxcXCRAaWRlbnRpZmllckB3czonLCAndmFyaWFibGUuZGVjbCddLFxuICAgICAgICAgICAgWydcXFxcLlxcXFwuXFxcXC4nLCAnb3BlcmF0b3InXSxcbiAgICAgICAgICAgIFsnLCcsICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B0ZXJtJyB9LFxuICAgICAgICAgICAgWydcXFxcKScsIHsgdG9rZW46ICdtZXRhJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICBpbmNsdWRlZGVjbGFyYXRpb246IFtcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmdW5jdGlvbmludm9jYXRpb24nIH0sXG4gICAgICAgICAgICBbJ0BpZGVudGlmaWVyJywgJ21ldGEnXSxcbiAgICAgICAgICAgIFsnOycsICdkZWxpbWl0ZXInLCAnQHBvcCddLFxuICAgICAgICAgICAgWycoPz19KScsIHsgdG9rZW46ICcnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICBbJ3snLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgc3dpdGNoVG86ICdAc2VsZWN0b3Jib2R5JyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAga2V5ZnJhbWVkZWNsYXJhdGlvbjogW1xuICAgICAgICAgICAgWydAaWRlbnRpZmllcicsICdtZXRhJ10sXG4gICAgICAgICAgICBbJ3snLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgc3dpdGNoVG86ICdAa2V5ZnJhbWVib2R5JyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAga2V5ZnJhbWVib2R5OiBbXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGVybScgfSxcbiAgICAgICAgICAgIFsneycsIHsgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknLCBuZXh0OiAnQHNlbGVjdG9yYm9keScgfV0sXG4gICAgICAgICAgICBbJ30nLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICBjb250cm9sc3RhdGVtZW50OiBbXG4gICAgICAgICAgICBbJ1tAXShpZnxlbHNlfGZvcnx3aGlsZXxlYWNofG1lZGlhKScsIHsgdG9rZW46ICdrZXl3b3JkLmZsb3cnLCBuZXh0OiAnQGNvbnRyb2xzdGF0ZW1lbnRkZWNsYXJhdGlvbicgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbnRyb2xzdGF0ZW1lbnRkZWNsYXJhdGlvbjogW1xuICAgICAgICAgICAgWycoaW58ZnJvbXx0aHJvdWdofGlmfHRvKVxcXFxiJywgeyB0b2tlbjogJ2tleXdvcmQuZmxvdycgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGVybScgfSxcbiAgICAgICAgICAgIFsneycsIHsgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknLCBzd2l0Y2hUbzogJ0BzZWxlY3RvcmJvZHknIH1dLFxuICAgICAgICBdLFxuICAgICAgICBmdW5jdGlvbmJvZHk6IFtcbiAgICAgICAgICAgIFsnW0BdKHJldHVybiknLCB7IHRva2VuOiAna2V5d29yZCcgfV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdmFyaWFibGVkZWNsYXJhdGlvbicgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B0ZXJtJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbnRyb2xzdGF0ZW1lbnQnIH0sXG4gICAgICAgICAgICBbJzsnLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbJ30nLCB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICBmdW5jdGlvbmludm9jYXRpb246IFtcbiAgICAgICAgICAgIFsnQGlkZW50aWZpZXJcXFxcKCcsIHsgdG9rZW46ICdtZXRhJywgbmV4dDogJ0BmdW5jdGlvbmFyZ3VtZW50cycgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIGZ1bmN0aW9uYXJndW1lbnRzOiBbXG4gICAgICAgICAgICBbJ1xcXFwkQGlkZW50aWZpZXJAd3M6JywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbJ1ssXScsICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B0ZXJtJyB9LFxuICAgICAgICAgICAgWydcXFxcKScsIHsgdG9rZW46ICdtZXRhJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICBdLFxuICAgICAgICBzdHJpbmdzOiBbXG4gICAgICAgICAgICBbJ34/XCInLCB7IHRva2VuOiAnc3RyaW5nLmRlbGltaXRlcicsIG5leHQ6ICdAc3RyaW5nZW5kZG91YmxlcXVvdGUnIH1dLFxuICAgICAgICAgICAgWyd+P1xcJycsIHsgdG9rZW46ICdzdHJpbmcuZGVsaW1pdGVyJywgbmV4dDogJ0BzdHJpbmdlbmRxdW90ZScgfV1cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nZW5kZG91YmxlcXVvdGU6IFtcbiAgICAgICAgICAgIFsnXFxcXFxcXFwuJywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWydcIicsIHsgdG9rZW46ICdzdHJpbmcuZGVsaW1pdGVyJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWycuJywgJ3N0cmluZyddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZ2VuZHF1b3RlOiBbXG4gICAgICAgICAgICBbJ1xcXFxcXFxcLicsICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsnXFwnJywgeyB0b2tlbjogJ3N0cmluZy5kZWxpbWl0ZXInLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICBbJy4nLCAnc3RyaW5nJ11cbiAgICAgICAgXVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9