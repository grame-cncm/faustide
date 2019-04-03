(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js ***!
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
        lineComment: '//'
    },
    brackets: [['{', '}'], ['[', ']'], ['(', ')']],
    autoClosingPairs: [
        { open: '"', close: '"', notIn: ['string', 'comment'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
        { open: '{', close: '}', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
        { open: '(', close: ')', notIn: ['string', 'comment'] },
    ],
    folding: {
        offSide: true
    }
};
var language = {
    defaultToken: '',
    tokenPostfix: '.pug',
    ignoreCase: true,
    brackets: [
        { token: 'delimiter.curly', open: '{', close: '}' },
        { token: 'delimiter.array', open: '[', close: ']' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' }
    ],
    keywords: ['append', 'block', 'case', 'default', 'doctype', 'each', 'else', 'extends',
        'for', 'if', 'in', 'include', 'mixin', 'typeof', 'unless', 'var', 'when'],
    tags: [
        'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio',
        'b', 'base', 'basefont', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
        'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command',
        'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt',
        'em', 'embed',
        'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
        'i', 'iframe', 'img', 'input', 'ins',
        'keygen', 'kbd',
        'label', 'li', 'link',
        'map', 'mark', 'menu', 'meta', 'meter',
        'nav', 'noframes', 'noscript',
        'object', 'ol', 'optgroup', 'option', 'output',
        'p', 'param', 'pre', 'progress',
        'q',
        'rp', 'rt', 'ruby',
        's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup',
        'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tracks', 'tt',
        'u', 'ul',
        'video',
        'wbr'
    ],
    // we include these common regular expressions
    symbols: /[\+\-\*\%\&\|\!\=\/\.\,\:]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
        root: [
            // Tag or a keyword at start
            [/^(\s*)([a-zA-Z_-][\w-]*)/,
                {
                    cases: {
                        '$2@tags': {
                            cases: {
                                '@eos': ['', 'tag'],
                                '@default': ['', { token: 'tag', next: '@tag.$1' },]
                            }
                        },
                        '$2@keywords': ['', { token: 'keyword.$2' },],
                        '@default': ['', '',]
                    }
                }
            ],
            // id
            [/^(\s*)(#[a-zA-Z_-][\w-]*)/, {
                    cases: {
                        '@eos': ['', 'tag.id'],
                        '@default': ['', { token: 'tag.id', next: '@tag.$1' }]
                    }
                }],
            // class
            [/^(\s*)(\.[a-zA-Z_-][\w-]*)/, {
                    cases: {
                        '@eos': ['', 'tag.class'],
                        '@default': ['', { token: 'tag.class', next: '@tag.$1' }]
                    }
                }],
            // plain text with pipe
            [/^(\s*)(\|.*)$/, ''],
            { include: '@whitespace' },
            // keywords
            [/[a-zA-Z_$][\w$]*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': ''
                    }
                }],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/@symbols/, 'delimiter'],
            // numbers
            [/\d+\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/\d+/, 'number'],
            // strings:
            [/"/, 'string', '@string."'],
            [/'/, 'string', '@string.\''],
        ],
        tag: [
            [/(\.)(\s*$)/, [{ token: 'delimiter', next: '@blockText.$S2.' }, '']],
            [/\s+/, { token: '', next: '@simpleText' }],
            // id
            [/#[a-zA-Z_-][\w-]*/, {
                    cases: {
                        '@eos': { token: 'tag.id', next: '@pop' },
                        '@default': 'tag.id'
                    }
                }],
            // class
            [/\.[a-zA-Z_-][\w-]*/, {
                    cases: {
                        '@eos': { token: 'tag.class', next: '@pop' },
                        '@default': 'tag.class'
                    }
                }],
            // attributes
            [/\(/, { token: 'delimiter.parenthesis', next: '@attributeList' }],
        ],
        simpleText: [
            [/[^#]+$/, { token: '', next: '@popall' }],
            [/[^#]+/, { token: '' }],
            // interpolation
            [/(#{)([^}]*)(})/, {
                    cases: {
                        '@eos': ['interpolation.delimiter', 'interpolation', { token: 'interpolation.delimiter', next: '@popall' }],
                        '@default': ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']
                    }
                }],
            [/#$/, { token: '', next: '@popall' }],
            [/#/, '']
        ],
        attributeList: [
            [/\s+/, ''],
            [/(\w+)(\s*=\s*)("|')/, ['attribute.name', 'delimiter', { token: 'attribute.value', next: '@value.$3' }]],
            [/\w+/, 'attribute.name'],
            [/,/, {
                    cases: {
                        '@eos': { token: 'attribute.delimiter', next: '@popall' },
                        '@default': 'attribute.delimiter'
                    }
                }],
            [/\)$/, { token: 'delimiter.parenthesis', next: '@popall' }],
            [/\)/, { token: 'delimiter.parenthesis', next: '@pop' }],
        ],
        whitespace: [
            [/^(\s*)(\/\/.*)$/, { token: 'comment', next: '@blockText.$1.comment' }],
            [/[ \t\r\n]+/, ''],
            [/<!--/, { token: 'comment', next: '@comment' }],
        ],
        blockText: [
            [/^\s+.*$/, {
                    cases: {
                        '($S2\\s+.*$)': { token: '$S3' },
                        '@default': { token: '@rematch', next: '@popall' }
                    }
                }],
            [/./, { token: '@rematch', next: '@popall' }]
        ],
        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, { token: 'comment', next: '@pop' }],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content']
        ],
        string: [
            [/[^\\"'#]+/, {
                    cases: {
                        '@eos': { token: 'string', next: '@popall' },
                        '@default': 'string'
                    }
                }],
            [/@escapes/, {
                    cases: {
                        '@eos': { token: 'string.escape', next: '@popall' },
                        '@default': 'string.escape'
                    }
                }],
            [/\\./, {
                    cases: {
                        '@eos': { token: 'string.escape.invalid', next: '@popall' },
                        '@default': 'string.escape.invalid'
                    }
                }],
            // interpolation
            [/(#{)([^}]*)(})/, ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']],
            [/#/, 'string'],
            [/["']/, {
                    cases: {
                        '$#==$S2': { token: 'string', next: '@pop' },
                        '@default': { token: 'string' }
                    }
                }],
        ],
        // Almost identical to above, except for escapes and the output token
        value: [
            [/[^\\"']+/, {
                    cases: {
                        '@eos': { token: 'attribute.value', next: '@popall' },
                        '@default': 'attribute.value'
                    }
                }],
            [/\\./, {
                    cases: {
                        '@eos': { token: 'attribute.value', next: '@popall' },
                        '@default': 'attribute.value'
                    }
                }],
            [/["']/, {
                    cases: {
                        '$#==$S2': { token: 'attribute.value', next: '@pop' },
                        '@default': { token: 'attribute.value' }
                    }
                }],
        ],
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3B1Zy9wdWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDTjtBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsa0JBQWtCLEtBQUs7QUFDdkI7QUFDQSxTQUFTLHNEQUFzRDtBQUMvRCxTQUFTLHdEQUF3RDtBQUNqRSxTQUFTLFNBQVMsWUFBWSxpQ0FBaUM7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0QsU0FBUyxzREFBc0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG1DQUFtQyxZQUFZLEdBQUc7QUFDM0QsU0FBUyxrREFBa0Q7QUFDM0QsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsZ0NBQWdDO0FBQ2xGO0FBQ0EseUJBQXlCO0FBQ3pCLDZDQUE2QyxzQkFBc0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxtQ0FBbUM7QUFDN0U7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsc0NBQXNDO0FBQ2hGO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDhDQUE4QztBQUMzRSxxQkFBcUIsaUNBQWlDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQ0FBZ0M7QUFDakU7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxvQkFBb0IseURBQXlEO0FBQzdFO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JELHVCQUF1QixZQUFZO0FBQ25DO0FBQ0EsaUJBQWlCLEtBQUssS0FBSztBQUMzQjtBQUNBLDhFQUE4RSxvREFBb0Q7QUFDbEk7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLDhDQUE4QztBQUNuSDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0RBQWdEO0FBQ2pGO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIscUJBQXFCLGtEQUFrRDtBQUN2RSxvQkFBb0IsK0NBQStDO0FBQ25FO0FBQ0E7QUFDQSxpQ0FBaUMsa0RBQWtEO0FBQ25GO0FBQ0Esc0JBQXNCLHFDQUFxQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxlQUFlO0FBQ3hELHFDQUFxQztBQUNyQztBQUNBLGlCQUFpQjtBQUNqQixtQkFBbUIscUNBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQ0FBaUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQ0FBaUMsMENBQTBDO0FBQzNFO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlDQUFpQyxrREFBa0Q7QUFDbkY7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQixLQUFLLEtBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdDQUFnQztBQUNwRSxxQ0FBcUM7QUFDckM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyw0Q0FBNEM7QUFDN0U7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUNBQWlDLDRDQUE0QztBQUM3RTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQ0FBb0MseUNBQXlDO0FBQzdFLHFDQUFxQztBQUNyQztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLEtBQUs7QUFDTCIsImZpbGUiOiJqcy8zNTYxM2RhNWE4ZGZmZmJiMmRkYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nXG4gICAgfSxcbiAgICBicmFja2V0czogW1sneycsICd9J10sIFsnWycsICddJ10sIFsnKCcsICcpJ11dLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFsnc3RyaW5nJywgJ2NvbW1lbnQnXSB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICBdLFxuICAgIGZvbGRpbmc6IHtcbiAgICAgICAgb2ZmU2lkZTogdHJ1ZVxuICAgIH1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLnB1ZycsXG4gICAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICBicmFja2V0czogW1xuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5Jywgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuYXJyYXknLCBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycsIG9wZW46ICcoJywgY2xvc2U6ICcpJyB9XG4gICAgXSxcbiAgICBrZXl3b3JkczogWydhcHBlbmQnLCAnYmxvY2snLCAnY2FzZScsICdkZWZhdWx0JywgJ2RvY3R5cGUnLCAnZWFjaCcsICdlbHNlJywgJ2V4dGVuZHMnLFxuICAgICAgICAnZm9yJywgJ2lmJywgJ2luJywgJ2luY2x1ZGUnLCAnbWl4aW4nLCAndHlwZW9mJywgJ3VubGVzcycsICd2YXInLCAnd2hlbiddLFxuICAgIHRhZ3M6IFtcbiAgICAgICAgJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJyxcbiAgICAgICAgJ2InLCAnYmFzZScsICdiYXNlZm9udCcsICdiZGknLCAnYmRvJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLFxuICAgICAgICAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29tbWFuZCcsXG4gICAgICAgICdkYXRhbGlzdCcsICdkZCcsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGl2JywgJ2RsJywgJ2R0JyxcbiAgICAgICAgJ2VtJywgJ2VtYmVkJyxcbiAgICAgICAgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnZnJhbWUnLCAnZnJhbWVzZXQnLFxuICAgICAgICAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLFxuICAgICAgICAnaScsICdpZnJhbWUnLCAnaW1nJywgJ2lucHV0JywgJ2lucycsXG4gICAgICAgICdrZXlnZW4nLCAna2JkJyxcbiAgICAgICAgJ2xhYmVsJywgJ2xpJywgJ2xpbmsnLFxuICAgICAgICAnbWFwJywgJ21hcmsnLCAnbWVudScsICdtZXRhJywgJ21ldGVyJyxcbiAgICAgICAgJ25hdicsICdub2ZyYW1lcycsICdub3NjcmlwdCcsXG4gICAgICAgICdvYmplY3QnLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsXG4gICAgICAgICdwJywgJ3BhcmFtJywgJ3ByZScsICdwcm9ncmVzcycsXG4gICAgICAgICdxJyxcbiAgICAgICAgJ3JwJywgJ3J0JywgJ3J1YnknLFxuICAgICAgICAncycsICdzYW1wJywgJ3NjcmlwdCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsXG4gICAgICAgICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RpdGxlJywgJ3RyJywgJ3RyYWNrcycsICd0dCcsXG4gICAgICAgICd1JywgJ3VsJyxcbiAgICAgICAgJ3ZpZGVvJyxcbiAgICAgICAgJ3dicidcbiAgICBdLFxuICAgIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBzeW1ib2xzOiAvW1xcK1xcLVxcKlxcJVxcJlxcfFxcIVxcPVxcL1xcLlxcLFxcOl0rLyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBUYWcgb3IgYSBrZXl3b3JkIGF0IHN0YXJ0XG4gICAgICAgICAgICBbL14oXFxzKikoW2EtekEtWl8tXVtcXHctXSopLyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJDJAdGFncyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6IFsnJywgJ3RhZyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiBbJycsIHsgdG9rZW46ICd0YWcnLCBuZXh0OiAnQHRhZy4kMScgfSxdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICckMkBrZXl3b3Jkcyc6IFsnJywgeyB0b2tlbjogJ2tleXdvcmQuJDInIH0sXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IFsnJywgJycsXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIC8vIGlkXG4gICAgICAgICAgICBbL14oXFxzKikoI1thLXpBLVpfLV1bXFx3LV0qKS8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogWycnLCAndGFnLmlkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiBbJycsIHsgdG9rZW46ICd0YWcuaWQnLCBuZXh0OiAnQHRhZy4kMScgfV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gY2xhc3NcbiAgICAgICAgICAgIFsvXihcXHMqKShcXC5bYS16QS1aXy1dW1xcdy1dKikvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6IFsnJywgJ3RhZy5jbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogWycnLCB7IHRva2VuOiAndGFnLmNsYXNzJywgbmV4dDogJ0B0YWcuJDEnIH1dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIHBsYWluIHRleHQgd2l0aCBwaXBlXG4gICAgICAgICAgICBbL14oXFxzKikoXFx8LiopJC8sICcnXSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgLy8ga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2EtekEtWl8kXVtcXHckXSovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQuJDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXJzIGFuZCBvcGVyYXRvcnNcbiAgICAgICAgICAgIFsvW3t9KClcXFtcXF1dLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9Ac3ltYm9scy8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIC8vIG51bWJlcnNcbiAgICAgICAgICAgIFsvXFxkK1xcLlxcZCsoW2VFXVtcXC0rXT9cXGQrKT8vLCAnbnVtYmVyLmZsb2F0J10sXG4gICAgICAgICAgICBbL1xcZCsvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICAvLyBzdHJpbmdzOlxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcnLCAnQHN0cmluZy5cIiddLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZycsICdAc3RyaW5nLlxcJyddLFxuICAgICAgICBdLFxuICAgICAgICB0YWc6IFtcbiAgICAgICAgICAgIFsvKFxcLikoXFxzKiQpLywgW3sgdG9rZW46ICdkZWxpbWl0ZXInLCBuZXh0OiAnQGJsb2NrVGV4dC4kUzIuJyB9LCAnJ11dLFxuICAgICAgICAgICAgWy9cXHMrLywgeyB0b2tlbjogJycsIG5leHQ6ICdAc2ltcGxlVGV4dCcgfV0sXG4gICAgICAgICAgICAvLyBpZFxuICAgICAgICAgICAgWy8jW2EtekEtWl8tXVtcXHctXSovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6IHsgdG9rZW46ICd0YWcuaWQnLCBuZXh0OiAnQHBvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICd0YWcuaWQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIGNsYXNzXG4gICAgICAgICAgICBbL1xcLlthLXpBLVpfLV1bXFx3LV0qLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAndGFnLmNsYXNzJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAndGFnLmNsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBhdHRyaWJ1dGVzXG4gICAgICAgICAgICBbL1xcKC8sIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBuZXh0OiAnQGF0dHJpYnV0ZUxpc3QnIH1dLFxuICAgICAgICBdLFxuICAgICAgICBzaW1wbGVUZXh0OiBbXG4gICAgICAgICAgICBbL1teI10rJC8sIHsgdG9rZW46ICcnLCBuZXh0OiAnQHBvcGFsbCcgfV0sXG4gICAgICAgICAgICBbL1teI10rLywgeyB0b2tlbjogJycgfV0sXG4gICAgICAgICAgICAvLyBpbnRlcnBvbGF0aW9uXG4gICAgICAgICAgICBbLygjeykoW159XSopKH0pLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiBbJ2ludGVycG9sYXRpb24uZGVsaW1pdGVyJywgJ2ludGVycG9sYXRpb24nLCB7IHRva2VuOiAnaW50ZXJwb2xhdGlvbi5kZWxpbWl0ZXInLCBuZXh0OiAnQHBvcGFsbCcgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiBbJ2ludGVycG9sYXRpb24uZGVsaW1pdGVyJywgJ2ludGVycG9sYXRpb24nLCAnaW50ZXJwb2xhdGlvbi5kZWxpbWl0ZXInXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbLyMkLywgeyB0b2tlbjogJycsIG5leHQ6ICdAcG9wYWxsJyB9XSxcbiAgICAgICAgICAgIFsvIy8sICcnXVxuICAgICAgICBdLFxuICAgICAgICBhdHRyaWJ1dGVMaXN0OiBbXG4gICAgICAgICAgICBbL1xccysvLCAnJ10sXG4gICAgICAgICAgICBbLyhcXHcrKShcXHMqPVxccyopKFwifCcpLywgWydhdHRyaWJ1dGUubmFtZScsICdkZWxpbWl0ZXInLCB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgbmV4dDogJ0B2YWx1ZS4kMycgfV1dLFxuICAgICAgICAgICAgWy9cXHcrLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbLywvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6IHsgdG9rZW46ICdhdHRyaWJ1dGUuZGVsaW1pdGVyJywgbmV4dDogJ0Bwb3BhbGwnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnYXR0cmlidXRlLmRlbGltaXRlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9cXCkkLywgeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycsIG5leHQ6ICdAcG9wYWxsJyB9XSxcbiAgICAgICAgICAgIFsvXFwpLywgeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9eKFxccyopKFxcL1xcLy4qKSQvLCB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdAYmxvY2tUZXh0LiQxLmNvbW1lbnQnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy88IS0tLywgeyB0b2tlbjogJ2NvbW1lbnQnLCBuZXh0OiAnQGNvbW1lbnQnIH1dLFxuICAgICAgICBdLFxuICAgICAgICBibG9ja1RleHQ6IFtcbiAgICAgICAgICAgIFsvXlxccysuKiQvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnKCRTMlxcXFxzKy4qJCknOiB7IHRva2VuOiAnJFMzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3BhbGwnIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy8uLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3BhbGwnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW148XFwtXSsvLCAnY29tbWVudC5jb250ZW50J10sXG4gICAgICAgICAgICBbLy0tPi8sIHsgdG9rZW46ICdjb21tZW50JywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgICAgICAgICAgWy88IS0tLywgJ2NvbW1lbnQuY29udGVudC5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1s8XFwtXS8sICdjb21tZW50LmNvbnRlbnQnXVxuICAgICAgICBdLFxuICAgICAgICBzdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcXCInI10rLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3BhbGwnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnc3RyaW5nLmVzY2FwZScsIG5leHQ6ICdAcG9wYWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3N0cmluZy5lc2NhcGUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6IHsgdG9rZW46ICdzdHJpbmcuZXNjYXBlLmludmFsaWQnLCBuZXh0OiAnQHBvcGFsbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcuZXNjYXBlLmludmFsaWQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIGludGVycG9sYXRpb25cbiAgICAgICAgICAgIFsvKCN7KShbXn1dKikofSkvLCBbJ2ludGVycG9sYXRpb24uZGVsaW1pdGVyJywgJ2ludGVycG9sYXRpb24nLCAnaW50ZXJwb2xhdGlvbi5kZWxpbWl0ZXInXV0sXG4gICAgICAgICAgICBbLyMvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL1tcIiddLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzInOiB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWxtb3N0IGlkZW50aWNhbCB0byBhYm92ZSwgZXhjZXB0IGZvciBlc2NhcGVzIGFuZCB0aGUgb3V0cHV0IHRva2VuXG4gICAgICAgIHZhbHVlOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiJ10rLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgbmV4dDogJ0Bwb3BhbGwnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnYXR0cmlidXRlLnZhbHVlJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1xcXFwuLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgbmV4dDogJ0Bwb3BhbGwnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnYXR0cmlidXRlLnZhbHVlJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1tcIiddLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzInOiB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgXSxcbiAgICB9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=