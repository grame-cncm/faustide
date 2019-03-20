(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js ***!
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
    brackets: [],
    autoClosingPairs: [],
    surroundingPairs: []
};
var language = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',
    keywords: [],
    typeKeywords: [],
    tokenPostfix: '.csp',
    operators: [],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
        root: [
            [/child-src/, 'string.quote'],
            [/connect-src/, 'string.quote'],
            [/default-src/, 'string.quote'],
            [/font-src/, 'string.quote'],
            [/frame-src/, 'string.quote'],
            [/img-src/, 'string.quote'],
            [/manifest-src/, 'string.quote'],
            [/media-src/, 'string.quote'],
            [/object-src/, 'string.quote'],
            [/script-src/, 'string.quote'],
            [/style-src/, 'string.quote'],
            [/worker-src/, 'string.quote'],
            [/base-uri/, 'string.quote'],
            [/plugin-types/, 'string.quote'],
            [/sandbox/, 'string.quote'],
            [/disown-opener/, 'string.quote'],
            [/form-action/, 'string.quote'],
            [/frame-ancestors/, 'string.quote'],
            [/report-uri/, 'string.quote'],
            [/report-to/, 'string.quote'],
            [/upgrade-insecure-requests/, 'string.quote'],
            [/block-all-mixed-content/, 'string.quote'],
            [/require-sri-for/, 'string.quote'],
            [/reflected-xss/, 'string.quote'],
            [/referrer/, 'string.quote'],
            [/policy-uri/, 'string.quote'],
            [/'self'/, 'string.quote'],
            [/'unsafe-inline'/, 'string.quote'],
            [/'unsafe-eval'/, 'string.quote'],
            [/'strict-dynamic'/, 'string.quote'],
            [/'unsafe-hashed-attributes'/, 'string.quote']
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NzcC9jc3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxJQUFJLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzLzBlYTQwODZiM2Q4ZjZlYTBmNmIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgYnJhY2tldHM6IFtdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtdXG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICAvLyBTZXQgZGVmYXVsdFRva2VuIHRvIGludmFsaWQgdG8gc2VlIHdoYXQgeW91IGRvIG5vdCB0b2tlbml6ZSB5ZXRcbiAgICAvLyBkZWZhdWx0VG9rZW46ICdpbnZhbGlkJyxcbiAgICBrZXl3b3JkczogW10sXG4gICAgdHlwZUtleXdvcmRzOiBbXSxcbiAgICB0b2tlblBvc3RmaXg6ICcuY3NwJyxcbiAgICBvcGVyYXRvcnM6IFtdLFxuICAgIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9cXF4lXSsvLFxuICAgIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIFsvY2hpbGQtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9jb25uZWN0LXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvZGVmYXVsdC1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2ZvbnQtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9mcmFtZS1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2ltZy1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL21hbmlmZXN0LXNyYy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvbWVkaWEtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9vYmplY3Qtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9zY3JpcHQtc3JjLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9zdHlsZS1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3dvcmtlci1zcmMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2Jhc2UtdXJpLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9wbHVnaW4tdHlwZXMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3NhbmRib3gvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2Rpc293bi1vcGVuZXIvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL2Zvcm0tYWN0aW9uLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy9mcmFtZS1hbmNlc3RvcnMvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3JlcG9ydC11cmkvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3JlcG9ydC10by8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvdXBncmFkZS1pbnNlY3VyZS1yZXF1ZXN0cy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvYmxvY2stYWxsLW1peGVkLWNvbnRlbnQvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3JlcXVpcmUtc3JpLWZvci8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvcmVmbGVjdGVkLXhzcy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvcmVmZXJyZXIvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbL3BvbGljeS11cmkvLCAnc3RyaW5nLnF1b3RlJ10sXG4gICAgICAgICAgICBbLydzZWxmJy8sICdzdHJpbmcucXVvdGUnXSxcbiAgICAgICAgICAgIFsvJ3Vuc2FmZS1pbmxpbmUnLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy8ndW5zYWZlLWV2YWwnLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy8nc3RyaWN0LWR5bmFtaWMnLywgJ3N0cmluZy5xdW90ZSddLFxuICAgICAgICAgICAgWy8ndW5zYWZlLWhhc2hlZC1hdHRyaWJ1dGVzJy8sICdzdHJpbmcucXVvdGUnXVxuICAgICAgICBdXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=