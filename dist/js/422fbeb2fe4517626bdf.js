(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js ***!
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
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string'] },
        { open: '[', close: ']', notIn: ['string'] },
        { open: '(', close: ')', notIn: ['string'] },
        { open: '"', close: '"', notIn: ['string'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] }
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*(#|\/\/)region\\b"),
            end: new RegExp("^\\s*(#|\/\/)endregion\\b")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '',
    // ignoreCase: true,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.root' }],
            [/<!DOCTYPE/, 'metatag.html', '@doctype'],
            [/<!--/, 'comment.html', '@comment'],
            [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],
            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],
            [/(<)([:\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
            [/(<\/)(\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
            [/</, 'delimiter.html'],
            [/[^<]+/] // text
        ],
        doctype: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.comment' }],
            [/[^>]+/, 'metatag.content.html'],
            [/>/, 'metatag.html', '@pop'],
        ],
        comment: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.comment' }],
            [/-->/, 'comment.html', '@pop'],
            [/[^-]+/, 'comment.content.html'],
            [/./, 'comment.content.html']
        ],
        otherTag: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.otherTag' }],
            [/\/?>/, 'delimiter.html', '@pop'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
        ],
        // -- BEGIN <script> tags handling
        // After <script
        script: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.script' }],
            [/type/, 'attribute.name', '@scriptAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
            [/[ \t\r\n]+/],
            [/(<\/)(script\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]
        ],
        // After <script ... type
        scriptAfterType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptAfterType' }],
            [/=/, 'delimiter', '@scriptAfterTypeEquals'],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <script ... type =
        scriptAfterTypeEquals: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptAfterTypeEquals' }],
            [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <script ... type = $S2
        scriptWithCustomType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptWithCustomType.$S2' }],
            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        scriptEmbedded: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],
            [/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
        ],
        // -- END <script> tags handling
        // -- BEGIN <style> tags handling
        // After <style
        style: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.style' }],
            [/type/, 'attribute.name', '@styleAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
            [/[ \t\r\n]+/],
            [/(<\/)(style\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]
        ],
        // After <style ... type
        styleAfterType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleAfterType' }],
            [/=/, 'delimiter', '@styleAfterTypeEquals'],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <style ... type =
        styleAfterTypeEquals: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleAfterTypeEquals' }],
            [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        // After <style ... type = $S2
        styleWithCustomType: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleWithCustomType.$S2' }],
            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        styleEmbedded: [
            [/<\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],
            [/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
        ],
        // -- END <style> tags handling
        phpInSimpleState: [
            [/<\?((php)|=)?/, 'metatag.php'],
            [/\?>/, { token: 'metatag.php', switchTo: '@$S2.$S3' }],
            { include: 'phpRoot' }
        ],
        phpInEmbeddedState: [
            [/<\?((php)|=)?/, 'metatag.php'],
            [/\?>/, { token: 'metatag.php', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],
            { include: 'phpRoot' }
        ],
        phpRoot: [
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@phpKeywords': { token: 'keyword.php' },
                        '@phpCompileTimeConstants': { token: 'constant.php' },
                        '@default': 'identifier.php'
                    }
                }],
            [/[$a-zA-Z_]\w*/, {
                    cases: {
                        '@phpPreDefinedVariables': { token: 'variable.predefined.php' },
                        '@default': 'variable.php'
                    }
                }],
            // brackets
            [/[{}]/, 'delimiter.bracket.php'],
            [/[\[\]]/, 'delimiter.array.php'],
            [/[()]/, 'delimiter.parenthesis.php'],
            // whitespace
            [/[ \t\r\n]+/],
            // comments
            [/(#|\/\/)$/, 'comment.php'],
            [/(#|\/\/)/, 'comment.php', '@phpLineComment'],
            // block comments
            [/\/\*/, 'comment.php', '@phpComment'],
            // strings
            [/"/, 'string.php', '@phpDoubleQuoteString'],
            [/'/, 'string.php', '@phpSingleQuoteString'],
            // delimiters
            [/[\+\-\*\%\&\|\^\~\!\=\<\>\/\?\;\:\.\,\@]/, 'delimiter.php'],
            // numbers
            [/\d*\d+[eE]([\-+]?\d+)?/, 'number.float.php'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float.php'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.php'],
            [/0[0-7']*[0-7]/, 'number.octal.php'],
            [/0[bB][0-1']*[0-1]/, 'number.binary.php'],
            [/\d[\d']*/, 'number.php'],
            [/\d/, 'number.php'],
        ],
        phpComment: [
            [/\*\//, 'comment.php', '@pop'],
            [/[^*]+/, 'comment.php'],
            [/./, 'comment.php']
        ],
        phpLineComment: [
            [/\?>/, { token: '@rematch', next: '@pop' }],
            [/.$/, 'comment.php', '@pop'],
            [/[^?]+$/, 'comment.php', '@pop'],
            [/[^?]+/, 'comment.php'],
            [/./, 'comment.php']
        ],
        phpDoubleQuoteString: [
            [/[^\\"]+/, 'string.php'],
            [/@escapes/, 'string.escape.php'],
            [/\\./, 'string.escape.invalid.php'],
            [/"/, 'string.php', '@pop']
        ],
        phpSingleQuoteString: [
            [/[^\\']+/, 'string.php'],
            [/@escapes/, 'string.escape.php'],
            [/\\./, 'string.escape.invalid.php'],
            [/'/, 'string.php', '@pop']
        ],
    },
    phpKeywords: [
        'abstract', 'and', 'array', 'as', 'break',
        'callable', 'case', 'catch', 'cfunction', 'class', 'clone',
        'const', 'continue', 'declare', 'default', 'do',
        'else', 'elseif', 'enddeclare', 'endfor', 'endforeach',
        'endif', 'endswitch', 'endwhile', 'extends', 'false', 'final',
        'for', 'foreach', 'function', 'global', 'goto',
        'if', 'implements', 'interface', 'instanceof', 'insteadof',
        'namespace', 'new', 'null', 'object', 'old_function', 'or', 'private',
        'protected', 'public', 'resource', 'static', 'switch', 'throw', 'trait',
        'try', 'true', 'use', 'var', 'while', 'xor',
        'die', 'echo', 'empty', 'exit', 'eval',
        'include', 'include_once', 'isset', 'list', 'require',
        'require_once', 'return', 'print', 'unset', 'yield',
        '__construct'
    ],
    phpCompileTimeConstants: [
        '__CLASS__',
        '__DIR__',
        '__FILE__',
        '__LINE__',
        '__NAMESPACE__',
        '__METHOD__',
        '__FUNCTION__',
        '__TRAIT__'
    ],
    phpPreDefinedVariables: [
        '$GLOBALS',
        '$_SERVER',
        '$_GET',
        '$_POST',
        '$_FILES',
        '$_REQUEST',
        '$_SESSION',
        '$_ENV',
        '$_COOKIE',
        '$php_errormsg',
        '$HTTP_RAW_POST_DATA',
        '$http_response_header',
        '$argc',
        '$argv'
    ],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3BocC9waHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQLG9FQUFvRSxJQUFJLE1BQU07QUFDOUU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksc0JBQXNCO0FBQ3BELFNBQVMsMkNBQTJDO0FBQ3BELFNBQVMsMkNBQTJDO0FBQ3BELFNBQVMsMkNBQTJDO0FBQ3BELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isd0RBQXdEO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxxQ0FBcUM7QUFDckYsK0NBQStDLG9DQUFvQztBQUNuRixnREFBZ0QsdUNBQXVDO0FBQ3ZGLCtDQUErQyx1Q0FBdUM7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMkRBQTJEO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDJEQUEyRDtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDREQUE0RDtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBMEQ7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvR0FBb0c7QUFDdkg7QUFDQSxvRUFBb0Usd0NBQXdDO0FBQzVHO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtRUFBbUU7QUFDbEc7QUFDQSxtQkFBbUIsb0dBQW9HO0FBQ3ZIO0FBQ0EsK0JBQStCLGtDQUFrQztBQUNqRTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IseUVBQXlFO0FBQ3hHLDJCQUEyQixpRUFBaUU7QUFDNUYsMkJBQTJCLGlFQUFpRTtBQUM1RixtQkFBbUIsb0dBQW9HO0FBQ3ZIO0FBQ0EsK0JBQStCLGtDQUFrQztBQUNqRTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNEVBQTRFO0FBQzNHLG1CQUFtQiw0RUFBNEU7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQ0FBa0M7QUFDakU7QUFDQTtBQUNBLCtCQUErQiw4RkFBOEY7QUFDN0gsMkJBQTJCLHdEQUF3RDtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHlEQUF5RDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFGQUFxRjtBQUN4RztBQUNBLG1FQUFtRSx3Q0FBd0M7QUFDM0c7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtFQUFrRTtBQUNqRztBQUNBLG1CQUFtQixxRkFBcUY7QUFDeEc7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3RUFBd0U7QUFDdkcsMkJBQTJCLGdFQUFnRTtBQUMzRiwyQkFBMkIsZ0VBQWdFO0FBQzNGLG1CQUFtQixxRkFBcUY7QUFDeEc7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwyRUFBMkU7QUFDMUcsbUJBQW1CLDJFQUEyRTtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtDQUFrQztBQUNoRTtBQUNBO0FBQ0EsK0JBQStCLDZGQUE2RjtBQUM1SCwwQkFBMEIsd0RBQXdEO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZDQUE2QztBQUNsRSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtFQUFrRTtBQUN2RixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsdUJBQXVCO0FBQ2hFLHFEQUFxRCx3QkFBd0I7QUFDN0U7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0RBQW9ELG1DQUFtQztBQUN2RjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQ0FBa0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsSUFBSSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQ2xGIiwiZmlsZSI6ImpzLzQyMmZiZWIyZmU0NTE3NjI2YmRmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgd29yZFBhdHRlcm46IC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxgXFx+XFwhXFxAXFwjXFwlXFxeXFwmXFwqXFwoXFwpXFwtXFw9XFwrXFxbXFx7XFxdXFx9XFxcXFxcfFxcO1xcOlxcJ1xcXCJcXCxcXC5cXDxcXD5cXC9cXD9cXHNdKykvZyxcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJy8qJywgJyovJ11cbiAgICB9LFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnWycsICddJ10sXG4gICAgICAgIFsnKCcsICcpJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIG5vdEluOiBbJ3N0cmluZyddIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH1cbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqKCN8XFwvXFwvKXJlZ2lvblxcXFxiXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKigjfFxcL1xcLyllbmRyZWdpb25cXFxcYlwiKVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcnLFxuICAgIC8vIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnJvb3QnIH1dLFxuICAgICAgICAgICAgWy88IURPQ1RZUEUvLCAnbWV0YXRhZy5odG1sJywgJ0Bkb2N0eXBlJ10sXG4gICAgICAgICAgICBbLzwhLS0vLCAnY29tbWVudC5odG1sJywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbLyg8KShcXHcrKShcXC8+KS8sIFsnZGVsaW1pdGVyLmh0bWwnLCAndGFnLmh0bWwnLCAnZGVsaW1pdGVyLmh0bWwnXV0sXG4gICAgICAgICAgICBbLyg8KShzY3JpcHQpLywgWydkZWxpbWl0ZXIuaHRtbCcsIHsgdG9rZW46ICd0YWcuaHRtbCcsIG5leHQ6ICdAc2NyaXB0JyB9XV0sXG4gICAgICAgICAgICBbLyg8KShzdHlsZSkvLCBbJ2RlbGltaXRlci5odG1sJywgeyB0b2tlbjogJ3RhZy5odG1sJywgbmV4dDogJ0BzdHlsZScgfV1dLFxuICAgICAgICAgICAgWy8oPCkoWzpcXHddKykvLCBbJ2RlbGltaXRlci5odG1sJywgeyB0b2tlbjogJ3RhZy5odG1sJywgbmV4dDogJ0BvdGhlclRhZycgfV1dLFxuICAgICAgICAgICAgWy8oPFxcLykoXFx3KykvLCBbJ2RlbGltaXRlci5odG1sJywgeyB0b2tlbjogJ3RhZy5odG1sJywgbmV4dDogJ0BvdGhlclRhZycgfV1dLFxuICAgICAgICAgICAgWy88LywgJ2RlbGltaXRlci5odG1sJ10sXG4gICAgICAgICAgICBbL1tePF0rL10gLy8gdGV4dFxuICAgICAgICBdLFxuICAgICAgICBkb2N0eXBlOiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5jb21tZW50JyB9XSxcbiAgICAgICAgICAgIFsvW14+XSsvLCAnbWV0YXRhZy5jb250ZW50Lmh0bWwnXSxcbiAgICAgICAgICAgIFsvPi8sICdtZXRhdGFnLmh0bWwnLCAnQHBvcCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5jb21tZW50JyB9XSxcbiAgICAgICAgICAgIFsvLS0+LywgJ2NvbW1lbnQuaHRtbCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1teLV0rLywgJ2NvbW1lbnQuY29udGVudC5odG1sJ10sXG4gICAgICAgICAgICBbLy4vLCAnY29tbWVudC5jb250ZW50Lmh0bWwnXVxuICAgICAgICBdLFxuICAgICAgICBvdGhlclRhZzogW1xuICAgICAgICAgICAgWy88XFw/KChwaHApfD0pPy8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHBocEluU2ltcGxlU3RhdGUub3RoZXJUYWcnIH1dLFxuICAgICAgICAgICAgWy9cXC8/Pi8sICdkZWxpbWl0ZXIuaHRtbCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy9bXFx3XFwtXSsvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICBdLFxuICAgICAgICAvLyAtLSBCRUdJTiA8c2NyaXB0PiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHRcbiAgICAgICAgc2NyaXB0OiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5zY3JpcHQnIH1dLFxuICAgICAgICAgICAgWy90eXBlLywgJ2F0dHJpYnV0ZS5uYW1lJywgJ0BzY3JpcHRBZnRlclR5cGUnXSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzY3JpcHRFbWJlZGRlZC50ZXh0L2phdmFzY3JpcHQnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2phdmFzY3JpcHQnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLyg8XFwvKShzY3JpcHRcXHMqKSg+KS8sIFsnZGVsaW1pdGVyLmh0bWwnLCAndGFnLmh0bWwnLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHBvcCcgfV1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHQgLi4uIHR5cGVcbiAgICAgICAgc2NyaXB0QWZ0ZXJUeXBlOiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5zY3JpcHRBZnRlclR5cGUnIH1dLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlcicsICdAc2NyaXB0QWZ0ZXJUeXBlRXF1YWxzJ10sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLnRleHQvamF2YXNjcmlwdCcsIG5leHRFbWJlZGRlZDogJ3RleHQvamF2YXNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3NjcmlwdFxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHQgLi4uIHR5cGUgPVxuICAgICAgICBzY3JpcHRBZnRlclR5cGVFcXVhbHM6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnNjcmlwdEFmdGVyVHlwZUVxdWFscycgfV0sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sIHsgdG9rZW46ICdhdHRyaWJ1dGUudmFsdWUnLCBzd2l0Y2hUbzogJ0BzY3JpcHRXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sIHsgdG9rZW46ICdhdHRyaWJ1dGUudmFsdWUnLCBzd2l0Y2hUbzogJ0BzY3JpcHRXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLnRleHQvamF2YXNjcmlwdCcsIG5leHRFbWJlZGRlZDogJ3RleHQvamF2YXNjcmlwdCcgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3NjcmlwdFxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHQgLi4uIHR5cGUgPSAkUzJcbiAgICAgICAgc2NyaXB0V2l0aEN1c3RvbVR5cGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnNjcmlwdFdpdGhDdXN0b21UeXBlLiRTMicgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLiRTMicsIG5leHRFbWJlZGRlZDogJyRTMicgfV0sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy9bXFx3XFwtXSsvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgc2NyaXB0RW1iZWRkZWQ6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJbkVtYmVkZGVkU3RhdGUuc2NyaXB0RW1iZWRkZWQuJFMyJywgbmV4dEVtYmVkZGVkOiAnQHBvcCcgfV0sXG4gICAgICAgICAgICBbLzxcXC9zY3JpcHQvLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcsIG5leHRFbWJlZGRlZDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIC0tIEVORCA8c2NyaXB0PiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIC8vIC0tIEJFR0lOIDxzdHlsZT4gdGFncyBoYW5kbGluZ1xuICAgICAgICAvLyBBZnRlciA8c3R5bGVcbiAgICAgICAgc3R5bGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJblNpbXBsZVN0YXRlLnN0eWxlJyB9XSxcbiAgICAgICAgICAgIFsvdHlwZS8sICdhdHRyaWJ1dGUubmFtZScsICdAc3R5bGVBZnRlclR5cGUnXSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzdHlsZUVtYmVkZGVkLnRleHQvY3NzJywgbmV4dEVtYmVkZGVkOiAndGV4dC9jc3MnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLyg8XFwvKShzdHlsZVxccyopKD4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAcG9wJyB9XV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlIC4uLiB0eXBlXG4gICAgICAgIHN0eWxlQWZ0ZXJUeXBlOiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5zdHlsZUFmdGVyVHlwZScgfV0sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJywgJ0BzdHlsZUFmdGVyVHlwZUVxdWFscyddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzdHlsZUVtYmVkZGVkLnRleHQvY3NzJywgbmV4dEVtYmVkZGVkOiAndGV4dC9jc3MnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zdHlsZVxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzdHlsZSAuLi4gdHlwZSA9XG4gICAgICAgIHN0eWxlQWZ0ZXJUeXBlRXF1YWxzOiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5zdHlsZUFmdGVyVHlwZUVxdWFscycgfV0sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sIHsgdG9rZW46ICdhdHRyaWJ1dGUudmFsdWUnLCBzd2l0Y2hUbzogJ0BzdHlsZVdpdGhDdXN0b21UeXBlLiQxJyB9XSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIHN3aXRjaFRvOiAnQHN0eWxlV2l0aEN1c3RvbVR5cGUuJDEnIH1dLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzdHlsZUVtYmVkZGVkLnRleHQvY3NzJywgbmV4dEVtYmVkZGVkOiAndGV4dC9jc3MnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zdHlsZVxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzdHlsZSAuLi4gdHlwZSA9ICRTMlxuICAgICAgICBzdHlsZVdpdGhDdXN0b21UeXBlOiBbXG4gICAgICAgICAgICBbLzxcXD8oKHBocCl8PSk/LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcGhwSW5TaW1wbGVTdGF0ZS5zdHlsZVdpdGhDdXN0b21UeXBlLiRTMicgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQuJFMyJywgbmV4dEVtYmVkZGVkOiAnJFMyJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zdHlsZVxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHN0eWxlRW1iZWRkZWQ6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0BwaHBJbkVtYmVkZGVkU3RhdGUuc3R5bGVFbWJlZGRlZC4kUzInLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyAtLSBFTkQgPHN0eWxlPiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIHBocEluU2ltcGxlU3RhdGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCAnbWV0YXRhZy5waHAnXSxcbiAgICAgICAgICAgIFsvXFw/Pi8sIHsgdG9rZW46ICdtZXRhdGFnLnBocCcsIHN3aXRjaFRvOiAnQCRTMi4kUzMnIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAncGhwUm9vdCcgfVxuICAgICAgICBdLFxuICAgICAgICBwaHBJbkVtYmVkZGVkU3RhdGU6IFtcbiAgICAgICAgICAgIFsvPFxcPygocGhwKXw9KT8vLCAnbWV0YXRhZy5waHAnXSxcbiAgICAgICAgICAgIFsvXFw/Pi8sIHsgdG9rZW46ICdtZXRhdGFnLnBocCcsIHN3aXRjaFRvOiAnQCRTMi4kUzMnLCBuZXh0RW1iZWRkZWQ6ICckUzMnIH1dLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAncGhwUm9vdCcgfVxuICAgICAgICBdLFxuICAgICAgICBwaHBSb290OiBbXG4gICAgICAgICAgICBbL1thLXpBLVpfXVxcdyovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQHBocEtleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQucGhwJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BwaHBDb21waWxlVGltZUNvbnN0YW50cyc6IHsgdG9rZW46ICdjb25zdGFudC5waHAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllci5waHAnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvWyRhLXpBLVpfXVxcdyovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQHBocFByZURlZmluZWRWYXJpYWJsZXMnOiB7IHRva2VuOiAndmFyaWFibGUucHJlZGVmaW5lZC5waHAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAndmFyaWFibGUucGhwJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBicmFja2V0c1xuICAgICAgICAgICAgWy9be31dLywgJ2RlbGltaXRlci5icmFja2V0LnBocCddLFxuICAgICAgICAgICAgWy9bXFxbXFxdXS8sICdkZWxpbWl0ZXIuYXJyYXkucGhwJ10sXG4gICAgICAgICAgICBbL1soKV0vLCAnZGVsaW1pdGVyLnBhcmVudGhlc2lzLnBocCddLFxuICAgICAgICAgICAgLy8gd2hpdGVzcGFjZVxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICAvLyBjb21tZW50c1xuICAgICAgICAgICAgWy8oI3xcXC9cXC8pJC8sICdjb21tZW50LnBocCddLFxuICAgICAgICAgICAgWy8oI3xcXC9cXC8pLywgJ2NvbW1lbnQucGhwJywgJ0BwaHBMaW5lQ29tbWVudCddLFxuICAgICAgICAgICAgLy8gYmxvY2sgY29tbWVudHNcbiAgICAgICAgICAgIFsvXFwvXFwqLywgJ2NvbW1lbnQucGhwJywgJ0BwaHBDb21tZW50J10sXG4gICAgICAgICAgICAvLyBzdHJpbmdzXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZy5waHAnLCAnQHBocERvdWJsZVF1b3RlU3RyaW5nJ10sXG4gICAgICAgICAgICBbLycvLCAnc3RyaW5nLnBocCcsICdAcGhwU2luZ2xlUXVvdGVTdHJpbmcnXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcnNcbiAgICAgICAgICAgIFsvW1xcK1xcLVxcKlxcJVxcJlxcfFxcXlxcflxcIVxcPVxcPFxcPlxcL1xcP1xcO1xcOlxcLlxcLFxcQF0vLCAnZGVsaW1pdGVyLnBocCddLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQqXFxkK1tlRV0oW1xcLStdP1xcZCspPy8sICdudW1iZXIuZmxvYXQucGhwJ10sXG4gICAgICAgICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdC5waHAnXSxcbiAgICAgICAgICAgIFsvMFt4WF1bMC05YS1mQS1GJ10qWzAtOWEtZkEtRl0vLCAnbnVtYmVyLmhleC5waHAnXSxcbiAgICAgICAgICAgIFsvMFswLTcnXSpbMC03XS8sICdudW1iZXIub2N0YWwucGhwJ10sXG4gICAgICAgICAgICBbLzBbYkJdWzAtMSddKlswLTFdLywgJ251bWJlci5iaW5hcnkucGhwJ10sXG4gICAgICAgICAgICBbL1xcZFtcXGQnXSovLCAnbnVtYmVyLnBocCddLFxuICAgICAgICAgICAgWy9cXGQvLCAnbnVtYmVyLnBocCddLFxuICAgICAgICBdLFxuICAgICAgICBwaHBDb21tZW50OiBbXG4gICAgICAgICAgICBbL1xcKlxcLy8sICdjb21tZW50LnBocCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1teKl0rLywgJ2NvbW1lbnQucGhwJ10sXG4gICAgICAgICAgICBbLy4vLCAnY29tbWVudC5waHAnXVxuICAgICAgICBdLFxuICAgICAgICBwaHBMaW5lQ29tbWVudDogW1xuICAgICAgICAgICAgWy9cXD8+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy8uJC8sICdjb21tZW50LnBocCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1teP10rJC8sICdjb21tZW50LnBocCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1teP10rLywgJ2NvbW1lbnQucGhwJ10sXG4gICAgICAgICAgICBbLy4vLCAnY29tbWVudC5waHAnXVxuICAgICAgICBdLFxuICAgICAgICBwaHBEb3VibGVRdW90ZVN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZy5waHAnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZS5waHAnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkLnBocCddLFxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcucGhwJywgJ0Bwb3AnXVxuICAgICAgICBdLFxuICAgICAgICBwaHBTaW5nbGVRdW90ZVN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFwnXSsvLCAnc3RyaW5nLnBocCddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlLnBocCddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuZXNjYXBlLmludmFsaWQucGhwJ10sXG4gICAgICAgICAgICBbLycvLCAnc3RyaW5nLnBocCcsICdAcG9wJ11cbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHBocEtleXdvcmRzOiBbXG4gICAgICAgICdhYnN0cmFjdCcsICdhbmQnLCAnYXJyYXknLCAnYXMnLCAnYnJlYWsnLFxuICAgICAgICAnY2FsbGFibGUnLCAnY2FzZScsICdjYXRjaCcsICdjZnVuY3Rpb24nLCAnY2xhc3MnLCAnY2xvbmUnLFxuICAgICAgICAnY29uc3QnLCAnY29udGludWUnLCAnZGVjbGFyZScsICdkZWZhdWx0JywgJ2RvJyxcbiAgICAgICAgJ2Vsc2UnLCAnZWxzZWlmJywgJ2VuZGRlY2xhcmUnLCAnZW5kZm9yJywgJ2VuZGZvcmVhY2gnLFxuICAgICAgICAnZW5kaWYnLCAnZW5kc3dpdGNoJywgJ2VuZHdoaWxlJywgJ2V4dGVuZHMnLCAnZmFsc2UnLCAnZmluYWwnLFxuICAgICAgICAnZm9yJywgJ2ZvcmVhY2gnLCAnZnVuY3Rpb24nLCAnZ2xvYmFsJywgJ2dvdG8nLFxuICAgICAgICAnaWYnLCAnaW1wbGVtZW50cycsICdpbnRlcmZhY2UnLCAnaW5zdGFuY2VvZicsICdpbnN0ZWFkb2YnLFxuICAgICAgICAnbmFtZXNwYWNlJywgJ25ldycsICdudWxsJywgJ29iamVjdCcsICdvbGRfZnVuY3Rpb24nLCAnb3InLCAncHJpdmF0ZScsXG4gICAgICAgICdwcm90ZWN0ZWQnLCAncHVibGljJywgJ3Jlc291cmNlJywgJ3N0YXRpYycsICdzd2l0Y2gnLCAndGhyb3cnLCAndHJhaXQnLFxuICAgICAgICAndHJ5JywgJ3RydWUnLCAndXNlJywgJ3ZhcicsICd3aGlsZScsICd4b3InLFxuICAgICAgICAnZGllJywgJ2VjaG8nLCAnZW1wdHknLCAnZXhpdCcsICdldmFsJyxcbiAgICAgICAgJ2luY2x1ZGUnLCAnaW5jbHVkZV9vbmNlJywgJ2lzc2V0JywgJ2xpc3QnLCAncmVxdWlyZScsXG4gICAgICAgICdyZXF1aXJlX29uY2UnLCAncmV0dXJuJywgJ3ByaW50JywgJ3Vuc2V0JywgJ3lpZWxkJyxcbiAgICAgICAgJ19fY29uc3RydWN0J1xuICAgIF0sXG4gICAgcGhwQ29tcGlsZVRpbWVDb25zdGFudHM6IFtcbiAgICAgICAgJ19fQ0xBU1NfXycsXG4gICAgICAgICdfX0RJUl9fJyxcbiAgICAgICAgJ19fRklMRV9fJyxcbiAgICAgICAgJ19fTElORV9fJyxcbiAgICAgICAgJ19fTkFNRVNQQUNFX18nLFxuICAgICAgICAnX19NRVRIT0RfXycsXG4gICAgICAgICdfX0ZVTkNUSU9OX18nLFxuICAgICAgICAnX19UUkFJVF9fJ1xuICAgIF0sXG4gICAgcGhwUHJlRGVmaW5lZFZhcmlhYmxlczogW1xuICAgICAgICAnJEdMT0JBTFMnLFxuICAgICAgICAnJF9TRVJWRVInLFxuICAgICAgICAnJF9HRVQnLFxuICAgICAgICAnJF9QT1NUJyxcbiAgICAgICAgJyRfRklMRVMnLFxuICAgICAgICAnJF9SRVFVRVNUJyxcbiAgICAgICAgJyRfU0VTU0lPTicsXG4gICAgICAgICckX0VOVicsXG4gICAgICAgICckX0NPT0tJRScsXG4gICAgICAgICckcGhwX2Vycm9ybXNnJyxcbiAgICAgICAgJyRIVFRQX1JBV19QT1NUX0RBVEEnLFxuICAgICAgICAnJGh0dHBfcmVzcG9uc2VfaGVhZGVyJyxcbiAgICAgICAgJyRhcmdjJyxcbiAgICAgICAgJyRhcmd2J1xuICAgIF0sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9