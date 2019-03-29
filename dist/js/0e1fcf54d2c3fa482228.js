(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.js ***!
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
        lineComment: '\'',
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'], ['[', ']'], ['(', ')'], ['<', '>'],
        ['addhandler', 'end addhandler'],
        ['class', 'end class'],
        ['enum', 'end enum'],
        ['event', 'end event'],
        ['function', 'end function'],
        ['get', 'end get'],
        ['if', 'end if'],
        ['interface', 'end interface'],
        ['module', 'end module'],
        ['namespace', 'end namespace'],
        ['operator', 'end operator'],
        ['property', 'end property'],
        ['raiseevent', 'end raiseevent'],
        ['removehandler', 'end removehandler'],
        ['select', 'end select'],
        ['set', 'end set'],
        ['structure', 'end structure'],
        ['sub', 'end sub'],
        ['synclock', 'end synclock'],
        ['try', 'end try'],
        ['while', 'end while'],
        ['with', 'end with'],
        ['using', 'end using'],
        ['do', 'loop'],
        ['for', 'next']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
        { open: '(', close: ')', notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string', 'comment'] },
        { open: '<', close: '>', notIn: ['string', 'comment'] },
    ],
    folding: {
        markers: {
            start: new RegExp("^\\s*#Region\\b"),
            end: new RegExp("^\\s*#End Region\\b")
        }
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.vb',
    ignoreCase: true,
    brackets: [
        { token: 'delimiter.bracket', open: '{', close: '}' },
        { token: 'delimiter.array', open: '[', close: ']' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.angle', open: '<', close: '>' },
        // Special bracket statement pairs
        // according to https://msdn.microsoft.com/en-us/library/tsw2a11z.aspx
        { token: 'keyword.tag-addhandler', open: 'addhandler', close: 'end addhandler' },
        { token: 'keyword.tag-class', open: 'class', close: 'end class' },
        { token: 'keyword.tag-enum', open: 'enum', close: 'end enum' },
        { token: 'keyword.tag-event', open: 'event', close: 'end event' },
        { token: 'keyword.tag-function', open: 'function', close: 'end function' },
        { token: 'keyword.tag-get', open: 'get', close: 'end get' },
        { token: 'keyword.tag-if', open: 'if', close: 'end if' },
        { token: 'keyword.tag-interface', open: 'interface', close: 'end interface' },
        { token: 'keyword.tag-module', open: 'module', close: 'end module' },
        { token: 'keyword.tag-namespace', open: 'namespace', close: 'end namespace' },
        { token: 'keyword.tag-operator', open: 'operator', close: 'end operator' },
        { token: 'keyword.tag-property', open: 'property', close: 'end property' },
        { token: 'keyword.tag-raiseevent', open: 'raiseevent', close: 'end raiseevent' },
        { token: 'keyword.tag-removehandler', open: 'removehandler', close: 'end removehandler' },
        { token: 'keyword.tag-select', open: 'select', close: 'end select' },
        { token: 'keyword.tag-set', open: 'set', close: 'end set' },
        { token: 'keyword.tag-structure', open: 'structure', close: 'end structure' },
        { token: 'keyword.tag-sub', open: 'sub', close: 'end sub' },
        { token: 'keyword.tag-synclock', open: 'synclock', close: 'end synclock' },
        { token: 'keyword.tag-try', open: 'try', close: 'end try' },
        { token: 'keyword.tag-while', open: 'while', close: 'end while' },
        { token: 'keyword.tag-with', open: 'with', close: 'end with' },
        // Other pairs
        { token: 'keyword.tag-using', open: 'using', close: 'end using' },
        { token: 'keyword.tag-do', open: 'do', close: 'loop' },
        { token: 'keyword.tag-for', open: 'for', close: 'next' }
    ],
    keywords: [
        'AddHandler', 'AddressOf', 'Alias', 'And', 'AndAlso', 'As', 'Async', 'Boolean', 'ByRef', 'Byte', 'ByVal', 'Call',
        'Case', 'Catch', 'CBool', 'CByte', 'CChar', 'CDate', 'CDbl', 'CDec', 'Char', 'CInt', 'Class', 'CLng',
        'CObj', 'Const', 'Continue', 'CSByte', 'CShort', 'CSng', 'CStr', 'CType', 'CUInt', 'CULng', 'CUShort',
        'Date', 'Decimal', 'Declare', 'Default', 'Delegate', 'Dim', 'DirectCast', 'Do', 'Double', 'Each', 'Else',
        'ElseIf', 'End', 'EndIf', 'Enum', 'Erase', 'Error', 'Event', 'Exit', 'False', 'Finally', 'For', 'Friend',
        'Function', 'Get', 'GetType', 'GetXMLNamespace', 'Global', 'GoSub', 'GoTo', 'Handles', 'If', 'Implements',
        'Imports', 'In', 'Inherits', 'Integer', 'Interface', 'Is', 'IsNot', 'Let', 'Lib', 'Like', 'Long', 'Loop',
        'Me', 'Mod', 'Module', 'MustInherit', 'MustOverride', 'MyBase', 'MyClass', 'NameOf', 'Namespace', 'Narrowing', 'New',
        'Next', 'Not', 'Nothing', 'NotInheritable', 'NotOverridable', 'Object', 'Of', 'On', 'Operator', 'Option',
        'Optional', 'Or', 'OrElse', 'Out', 'Overloads', 'Overridable', 'Overrides', 'ParamArray', 'Partial',
        'Private', 'Property', 'Protected', 'Public', 'RaiseEvent', 'ReadOnly', 'ReDim', 'RemoveHandler', 'Resume',
        'Return', 'SByte', 'Select', 'Set', 'Shadows', 'Shared', 'Short', 'Single', 'Static', 'Step', 'Stop',
        'String', 'Structure', 'Sub', 'SyncLock', 'Then', 'Throw', 'To', 'True', 'Try', 'TryCast', 'TypeOf',
        'UInteger', 'ULong', 'UShort', 'Using', 'Variant', 'Wend', 'When', 'While', 'Widening', 'With', 'WithEvents',
        'WriteOnly', 'Xor'
    ],
    tagwords: [
        'If', 'Sub', 'Select', 'Try', 'Class', 'Enum',
        'Function', 'Get', 'Interface', 'Module', 'Namespace', 'Operator', 'Set', 'Structure', 'Using', 'While', 'With',
        'Do', 'Loop', 'For', 'Next', 'Property', 'Continue', 'AddHandler', 'RemoveHandler', 'Event', 'RaiseEvent', 'SyncLock'
    ],
    // we include these common regular expressions
    symbols: /[=><!~?;\.,:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /U?[DI%L&S@]?/,
    floatsuffix: /[R#F!]?/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // whitespace
            { include: '@whitespace' },
            // special ending tag-words
            [/next(?!\w)/, { token: 'keyword.tag-for' }],
            [/loop(?!\w)/, { token: 'keyword.tag-do' }],
            // usual ending tags
            [/end\s+(?!for|do)([a-zA-Z_]\w*)/, { token: 'keyword.tag-$1' }],
            // identifiers, tagwords, and keywords
            [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@tagwords': { token: 'keyword.tag-$0' },
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }],
            // Preprocessor directive
            [/^\s*#\w+/, 'keyword'],
            // numbers
            [/\d*\d+e([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/\d*\.\d+(e[\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/&H[0-9a-f]+(@integersuffix)/, 'number.hex'],
            [/&0[0-7]+(@integersuffix)/, 'number.octal'],
            [/\d+(@integersuffix)/, 'number'],
            // date literal
            [/#.*#/, 'number'],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/@symbols/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/(\'|REM(?!\w)).*$/, 'comment'],
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"C?/, 'string', '@pop']
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3ZiL3ZiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNhO0FBQ047QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFlBQVksaUNBQWlDO0FBQy9ELFNBQVMsc0RBQXNEO0FBQy9ELFNBQVMsc0RBQXNEO0FBQy9ELFNBQVMsc0RBQXNEO0FBQy9ELFNBQVMsc0RBQXNEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxxQ0FBcUMsWUFBWSxHQUFHO0FBQzdELFNBQVMsa0RBQWtEO0FBQzNELFNBQVMsd0RBQXdEO0FBQ2pFLFNBQVMsa0RBQWtEO0FBQzNEO0FBQ0E7QUFDQSxTQUFTLCtFQUErRTtBQUN4RixTQUFTLGdFQUFnRTtBQUN6RSxTQUFTLDZEQUE2RDtBQUN0RSxTQUFTLGdFQUFnRTtBQUN6RSxTQUFTLHlFQUF5RTtBQUNsRixTQUFTLDBEQUEwRDtBQUNuRSxTQUFTLHVEQUF1RDtBQUNoRSxTQUFTLDRFQUE0RTtBQUNyRixTQUFTLG1FQUFtRTtBQUM1RSxTQUFTLDRFQUE0RTtBQUNyRixTQUFTLHlFQUF5RTtBQUNsRixTQUFTLHlFQUF5RTtBQUNsRixTQUFTLCtFQUErRTtBQUN4RixTQUFTLHdGQUF3RjtBQUNqRyxTQUFTLG1FQUFtRTtBQUM1RSxTQUFTLDBEQUEwRDtBQUNuRSxTQUFTLDRFQUE0RTtBQUNyRixTQUFTLDBEQUEwRDtBQUNuRSxTQUFTLHlFQUF5RTtBQUNsRixTQUFTLDBEQUEwRDtBQUNuRSxTQUFTLGdFQUFnRTtBQUN6RSxTQUFTLDZEQUE2RDtBQUN0RTtBQUNBLFNBQVMsZ0VBQWdFO0FBQ3pFLFNBQVMscURBQXFEO0FBQzlELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsOENBQThDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBLGdEQUFnRCwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBCQUEwQjtBQUNoRSxzQ0FBc0Msc0JBQXNCO0FBQzVEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoianMvMGUxZmNmNTRkMmMzZmE0ODIyMjguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJ1xcJycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycvKicsICcqLyddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSwgWydbJywgJ10nXSwgWycoJywgJyknXSwgWyc8JywgJz4nXSxcbiAgICAgICAgWydhZGRoYW5kbGVyJywgJ2VuZCBhZGRoYW5kbGVyJ10sXG4gICAgICAgIFsnY2xhc3MnLCAnZW5kIGNsYXNzJ10sXG4gICAgICAgIFsnZW51bScsICdlbmQgZW51bSddLFxuICAgICAgICBbJ2V2ZW50JywgJ2VuZCBldmVudCddLFxuICAgICAgICBbJ2Z1bmN0aW9uJywgJ2VuZCBmdW5jdGlvbiddLFxuICAgICAgICBbJ2dldCcsICdlbmQgZ2V0J10sXG4gICAgICAgIFsnaWYnLCAnZW5kIGlmJ10sXG4gICAgICAgIFsnaW50ZXJmYWNlJywgJ2VuZCBpbnRlcmZhY2UnXSxcbiAgICAgICAgWydtb2R1bGUnLCAnZW5kIG1vZHVsZSddLFxuICAgICAgICBbJ25hbWVzcGFjZScsICdlbmQgbmFtZXNwYWNlJ10sXG4gICAgICAgIFsnb3BlcmF0b3InLCAnZW5kIG9wZXJhdG9yJ10sXG4gICAgICAgIFsncHJvcGVydHknLCAnZW5kIHByb3BlcnR5J10sXG4gICAgICAgIFsncmFpc2VldmVudCcsICdlbmQgcmFpc2VldmVudCddLFxuICAgICAgICBbJ3JlbW92ZWhhbmRsZXInLCAnZW5kIHJlbW92ZWhhbmRsZXInXSxcbiAgICAgICAgWydzZWxlY3QnLCAnZW5kIHNlbGVjdCddLFxuICAgICAgICBbJ3NldCcsICdlbmQgc2V0J10sXG4gICAgICAgIFsnc3RydWN0dXJlJywgJ2VuZCBzdHJ1Y3R1cmUnXSxcbiAgICAgICAgWydzdWInLCAnZW5kIHN1YiddLFxuICAgICAgICBbJ3N5bmNsb2NrJywgJ2VuZCBzeW5jbG9jayddLFxuICAgICAgICBbJ3RyeScsICdlbmQgdHJ5J10sXG4gICAgICAgIFsnd2hpbGUnLCAnZW5kIHdoaWxlJ10sXG4gICAgICAgIFsnd2l0aCcsICdlbmQgd2l0aCddLFxuICAgICAgICBbJ3VzaW5nJywgJ2VuZCB1c2luZyddLFxuICAgICAgICBbJ2RvJywgJ2xvb3AnXSxcbiAgICAgICAgWydmb3InLCAnbmV4dCddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnPCcsIGNsb3NlOiAnPicsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgbWFya2Vyczoge1xuICAgICAgICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI1JlZ2lvblxcXFxiXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNFbmQgUmVnaW9uXFxcXGJcIilcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLnZiJyxcbiAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcsIG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmFycmF5Jywgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5hbmdsZScsIG9wZW46ICc8JywgY2xvc2U6ICc+JyB9LFxuICAgICAgICAvLyBTcGVjaWFsIGJyYWNrZXQgc3RhdGVtZW50IHBhaXJzXG4gICAgICAgIC8vIGFjY29yZGluZyB0byBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3RzdzJhMTF6LmFzcHhcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLWFkZGhhbmRsZXInLCBvcGVuOiAnYWRkaGFuZGxlcicsIGNsb3NlOiAnZW5kIGFkZGhhbmRsZXInIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1jbGFzcycsIG9wZW46ICdjbGFzcycsIGNsb3NlOiAnZW5kIGNsYXNzJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctZW51bScsIG9wZW46ICdlbnVtJywgY2xvc2U6ICdlbmQgZW51bScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLWV2ZW50Jywgb3BlbjogJ2V2ZW50JywgY2xvc2U6ICdlbmQgZXZlbnQnIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1mdW5jdGlvbicsIG9wZW46ICdmdW5jdGlvbicsIGNsb3NlOiAnZW5kIGZ1bmN0aW9uJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctZ2V0Jywgb3BlbjogJ2dldCcsIGNsb3NlOiAnZW5kIGdldCcgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLWlmJywgb3BlbjogJ2lmJywgY2xvc2U6ICdlbmQgaWYnIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1pbnRlcmZhY2UnLCBvcGVuOiAnaW50ZXJmYWNlJywgY2xvc2U6ICdlbmQgaW50ZXJmYWNlJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctbW9kdWxlJywgb3BlbjogJ21vZHVsZScsIGNsb3NlOiAnZW5kIG1vZHVsZScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLW5hbWVzcGFjZScsIG9wZW46ICduYW1lc3BhY2UnLCBjbG9zZTogJ2VuZCBuYW1lc3BhY2UnIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1vcGVyYXRvcicsIG9wZW46ICdvcGVyYXRvcicsIGNsb3NlOiAnZW5kIG9wZXJhdG9yJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctcHJvcGVydHknLCBvcGVuOiAncHJvcGVydHknLCBjbG9zZTogJ2VuZCBwcm9wZXJ0eScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLXJhaXNlZXZlbnQnLCBvcGVuOiAncmFpc2VldmVudCcsIGNsb3NlOiAnZW5kIHJhaXNlZXZlbnQnIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1yZW1vdmVoYW5kbGVyJywgb3BlbjogJ3JlbW92ZWhhbmRsZXInLCBjbG9zZTogJ2VuZCByZW1vdmVoYW5kbGVyJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctc2VsZWN0Jywgb3BlbjogJ3NlbGVjdCcsIGNsb3NlOiAnZW5kIHNlbGVjdCcgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLXNldCcsIG9wZW46ICdzZXQnLCBjbG9zZTogJ2VuZCBzZXQnIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1zdHJ1Y3R1cmUnLCBvcGVuOiAnc3RydWN0dXJlJywgY2xvc2U6ICdlbmQgc3RydWN0dXJlJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctc3ViJywgb3BlbjogJ3N1YicsIGNsb3NlOiAnZW5kIHN1YicgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLXN5bmNsb2NrJywgb3BlbjogJ3N5bmNsb2NrJywgY2xvc2U6ICdlbmQgc3luY2xvY2snIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy10cnknLCBvcGVuOiAndHJ5JywgY2xvc2U6ICdlbmQgdHJ5JyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctd2hpbGUnLCBvcGVuOiAnd2hpbGUnLCBjbG9zZTogJ2VuZCB3aGlsZScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQudGFnLXdpdGgnLCBvcGVuOiAnd2l0aCcsIGNsb3NlOiAnZW5kIHdpdGgnIH0sXG4gICAgICAgIC8vIE90aGVyIHBhaXJzXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy11c2luZycsIG9wZW46ICd1c2luZycsIGNsb3NlOiAnZW5kIHVzaW5nJyB9LFxuICAgICAgICB7IHRva2VuOiAna2V5d29yZC50YWctZG8nLCBvcGVuOiAnZG8nLCBjbG9zZTogJ2xvb3AnIH0sXG4gICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1mb3InLCBvcGVuOiAnZm9yJywgY2xvc2U6ICduZXh0JyB9XG4gICAgXSxcbiAgICBrZXl3b3JkczogW1xuICAgICAgICAnQWRkSGFuZGxlcicsICdBZGRyZXNzT2YnLCAnQWxpYXMnLCAnQW5kJywgJ0FuZEFsc28nLCAnQXMnLCAnQXN5bmMnLCAnQm9vbGVhbicsICdCeVJlZicsICdCeXRlJywgJ0J5VmFsJywgJ0NhbGwnLFxuICAgICAgICAnQ2FzZScsICdDYXRjaCcsICdDQm9vbCcsICdDQnl0ZScsICdDQ2hhcicsICdDRGF0ZScsICdDRGJsJywgJ0NEZWMnLCAnQ2hhcicsICdDSW50JywgJ0NsYXNzJywgJ0NMbmcnLFxuICAgICAgICAnQ09iaicsICdDb25zdCcsICdDb250aW51ZScsICdDU0J5dGUnLCAnQ1Nob3J0JywgJ0NTbmcnLCAnQ1N0cicsICdDVHlwZScsICdDVUludCcsICdDVUxuZycsICdDVVNob3J0JyxcbiAgICAgICAgJ0RhdGUnLCAnRGVjaW1hbCcsICdEZWNsYXJlJywgJ0RlZmF1bHQnLCAnRGVsZWdhdGUnLCAnRGltJywgJ0RpcmVjdENhc3QnLCAnRG8nLCAnRG91YmxlJywgJ0VhY2gnLCAnRWxzZScsXG4gICAgICAgICdFbHNlSWYnLCAnRW5kJywgJ0VuZElmJywgJ0VudW0nLCAnRXJhc2UnLCAnRXJyb3InLCAnRXZlbnQnLCAnRXhpdCcsICdGYWxzZScsICdGaW5hbGx5JywgJ0ZvcicsICdGcmllbmQnLFxuICAgICAgICAnRnVuY3Rpb24nLCAnR2V0JywgJ0dldFR5cGUnLCAnR2V0WE1MTmFtZXNwYWNlJywgJ0dsb2JhbCcsICdHb1N1YicsICdHb1RvJywgJ0hhbmRsZXMnLCAnSWYnLCAnSW1wbGVtZW50cycsXG4gICAgICAgICdJbXBvcnRzJywgJ0luJywgJ0luaGVyaXRzJywgJ0ludGVnZXInLCAnSW50ZXJmYWNlJywgJ0lzJywgJ0lzTm90JywgJ0xldCcsICdMaWInLCAnTGlrZScsICdMb25nJywgJ0xvb3AnLFxuICAgICAgICAnTWUnLCAnTW9kJywgJ01vZHVsZScsICdNdXN0SW5oZXJpdCcsICdNdXN0T3ZlcnJpZGUnLCAnTXlCYXNlJywgJ015Q2xhc3MnLCAnTmFtZU9mJywgJ05hbWVzcGFjZScsICdOYXJyb3dpbmcnLCAnTmV3JyxcbiAgICAgICAgJ05leHQnLCAnTm90JywgJ05vdGhpbmcnLCAnTm90SW5oZXJpdGFibGUnLCAnTm90T3ZlcnJpZGFibGUnLCAnT2JqZWN0JywgJ09mJywgJ09uJywgJ09wZXJhdG9yJywgJ09wdGlvbicsXG4gICAgICAgICdPcHRpb25hbCcsICdPcicsICdPckVsc2UnLCAnT3V0JywgJ092ZXJsb2FkcycsICdPdmVycmlkYWJsZScsICdPdmVycmlkZXMnLCAnUGFyYW1BcnJheScsICdQYXJ0aWFsJyxcbiAgICAgICAgJ1ByaXZhdGUnLCAnUHJvcGVydHknLCAnUHJvdGVjdGVkJywgJ1B1YmxpYycsICdSYWlzZUV2ZW50JywgJ1JlYWRPbmx5JywgJ1JlRGltJywgJ1JlbW92ZUhhbmRsZXInLCAnUmVzdW1lJyxcbiAgICAgICAgJ1JldHVybicsICdTQnl0ZScsICdTZWxlY3QnLCAnU2V0JywgJ1NoYWRvd3MnLCAnU2hhcmVkJywgJ1Nob3J0JywgJ1NpbmdsZScsICdTdGF0aWMnLCAnU3RlcCcsICdTdG9wJyxcbiAgICAgICAgJ1N0cmluZycsICdTdHJ1Y3R1cmUnLCAnU3ViJywgJ1N5bmNMb2NrJywgJ1RoZW4nLCAnVGhyb3cnLCAnVG8nLCAnVHJ1ZScsICdUcnknLCAnVHJ5Q2FzdCcsICdUeXBlT2YnLFxuICAgICAgICAnVUludGVnZXInLCAnVUxvbmcnLCAnVVNob3J0JywgJ1VzaW5nJywgJ1ZhcmlhbnQnLCAnV2VuZCcsICdXaGVuJywgJ1doaWxlJywgJ1dpZGVuaW5nJywgJ1dpdGgnLCAnV2l0aEV2ZW50cycsXG4gICAgICAgICdXcml0ZU9ubHknLCAnWG9yJ1xuICAgIF0sXG4gICAgdGFnd29yZHM6IFtcbiAgICAgICAgJ0lmJywgJ1N1YicsICdTZWxlY3QnLCAnVHJ5JywgJ0NsYXNzJywgJ0VudW0nLFxuICAgICAgICAnRnVuY3Rpb24nLCAnR2V0JywgJ0ludGVyZmFjZScsICdNb2R1bGUnLCAnTmFtZXNwYWNlJywgJ09wZXJhdG9yJywgJ1NldCcsICdTdHJ1Y3R1cmUnLCAnVXNpbmcnLCAnV2hpbGUnLCAnV2l0aCcsXG4gICAgICAgICdEbycsICdMb29wJywgJ0ZvcicsICdOZXh0JywgJ1Byb3BlcnR5JywgJ0NvbnRpbnVlJywgJ0FkZEhhbmRsZXInLCAnUmVtb3ZlSGFuZGxlcicsICdFdmVudCcsICdSYWlzZUV2ZW50JywgJ1N5bmNMb2NrJ1xuICAgIF0sXG4gICAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICAgIHN5bWJvbHM6IC9bPT48IX4/O1xcLiw6JnwrXFwtKlxcL1xcXiVdKy8sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICBpbnRlZ2Vyc3VmZml4OiAvVT9bREklTCZTQF0/LyxcbiAgICBmbG9hdHN1ZmZpeDogL1tSI0YhXT8vLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgZW5kaW5nIHRhZy13b3Jkc1xuICAgICAgICAgICAgWy9uZXh0KD8hXFx3KS8sIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1mb3InIH1dLFxuICAgICAgICAgICAgWy9sb29wKD8hXFx3KS8sIHsgdG9rZW46ICdrZXl3b3JkLnRhZy1kbycgfV0sXG4gICAgICAgICAgICAvLyB1c3VhbCBlbmRpbmcgdGFnc1xuICAgICAgICAgICAgWy9lbmRcXHMrKD8hZm9yfGRvKShbYS16QS1aX11cXHcqKS8sIHsgdG9rZW46ICdrZXl3b3JkLnRhZy0kMScgfV0sXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycywgdGFnd29yZHMsIGFuZCBrZXl3b3Jkc1xuICAgICAgICAgICAgWy9bYS16QS1aX11cXHcqLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0B0YWd3b3Jkcyc6IHsgdG9rZW46ICdrZXl3b3JkLnRhZy0kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC4kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBQcmVwcm9jZXNzb3IgZGlyZWN0aXZlXG4gICAgICAgICAgICBbL15cXHMqI1xcdysvLCAna2V5d29yZCddLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQqXFxkK2UoW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhlW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8mSFswLTlhLWZdKyhAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8mMFswLTddKyhAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLm9jdGFsJ10sXG4gICAgICAgICAgICBbL1xcZCsoQGludGVnZXJzdWZmaXgpLywgJ251bWJlciddLFxuICAgICAgICAgICAgLy8gZGF0ZSBsaXRlcmFsXG4gICAgICAgICAgICBbLyMuKiMvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXJzIGFuZCBvcGVyYXRvcnNcbiAgICAgICAgICAgIFsvW3t9KClcXFtcXF1dLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9Ac3ltYm9scy8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIC8vIHN0cmluZ3NcbiAgICAgICAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgJ3N0cmluZy5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAc3RyaW5nJ10sXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICcnXSxcbiAgICAgICAgICAgIFsvKFxcJ3xSRU0oPyFcXHcpKS4qJC8sICdjb21tZW50J10sXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9cIkM/LywgJ3N0cmluZycsICdAcG9wJ11cbiAgICAgICAgXSxcbiAgICB9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=