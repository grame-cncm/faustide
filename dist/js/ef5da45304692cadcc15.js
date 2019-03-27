(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/edit.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/edit.js ***!
  \*****************************************************************************************/
/*! exports provided: removeProperty, setProperty, applyEdit, isWS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeProperty", function() { return removeProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProperty", function() { return setProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEdit", function() { return applyEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWS", function() { return isWS; });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js");
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



function removeProperty(text, path, formattingOptions) {
    return setProperty(text, path, void 0, formattingOptions);
}
function setProperty(text, originalPath, value, formattingOptions, getInsertionIndex) {
    var _a;
    var path = originalPath.slice();
    var errors = [];
    var root = Object(_parser_js__WEBPACK_IMPORTED_MODULE_1__["parseTree"])(text, errors);
    var parent = void 0;
    var lastSegment = void 0;
    while (path.length > 0) {
        lastSegment = path.pop();
        parent = Object(_parser_js__WEBPACK_IMPORTED_MODULE_1__["findNodeAtLocation"])(root, path);
        if (parent === void 0 && value !== void 0) {
            if (typeof lastSegment === 'string') {
                value = (_a = {}, _a[lastSegment] = value, _a);
            }
            else {
                value = [value];
            }
        }
        else {
            break;
        }
    }
    if (!parent) {
        // empty document
        if (value === void 0) { // delete
            throw new Error('Can not delete in empty document');
        }
        return withFormatting(text, { offset: root ? root.offset : 0, length: root ? root.length : 0, content: JSON.stringify(value) }, formattingOptions);
    }
    else if (parent.type === 'object' && typeof lastSegment === 'string' && Array.isArray(parent.children)) {
        var existing = Object(_parser_js__WEBPACK_IMPORTED_MODULE_1__["findNodeAtLocation"])(parent, [lastSegment]);
        if (existing !== void 0) {
            if (value === void 0) { // delete
                if (!existing.parent) {
                    throw new Error('Malformed AST');
                }
                var propertyIndex = parent.children.indexOf(existing.parent);
                var removeBegin = void 0;
                var removeEnd = existing.parent.offset + existing.parent.length;
                if (propertyIndex > 0) {
                    // remove the comma of the previous node
                    var previous = parent.children[propertyIndex - 1];
                    removeBegin = previous.offset + previous.length;
                }
                else {
                    removeBegin = parent.offset + 1;
                    if (parent.children.length > 1) {
                        // remove the comma of the next node
                        var next = parent.children[1];
                        removeEnd = next.offset;
                    }
                }
                return withFormatting(text, { offset: removeBegin, length: removeEnd - removeBegin, content: '' }, formattingOptions);
            }
            else {
                // set value of existing property
                return withFormatting(text, { offset: existing.offset, length: existing.length, content: JSON.stringify(value) }, formattingOptions);
            }
        }
        else {
            if (value === void 0) { // delete
                return []; // property does not exist, nothing to do
            }
            var newProperty = JSON.stringify(lastSegment) + ": " + JSON.stringify(value);
            var index = getInsertionIndex ? getInsertionIndex(parent.children.map(function (p) { return p.children[0].value; })) : parent.children.length;
            var edit = void 0;
            if (index > 0) {
                var previous = parent.children[index - 1];
                edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
            }
            else if (parent.children.length === 0) {
                edit = { offset: parent.offset + 1, length: 0, content: newProperty };
            }
            else {
                edit = { offset: parent.offset + 1, length: 0, content: newProperty + ',' };
            }
            return withFormatting(text, edit, formattingOptions);
        }
    }
    else if (parent.type === 'array' && typeof lastSegment === 'number' && Array.isArray(parent.children)) {
        var insertIndex = lastSegment;
        if (insertIndex === -1) {
            // Insert
            var newProperty = "" + JSON.stringify(value);
            var edit = void 0;
            if (parent.children.length === 0) {
                edit = { offset: parent.offset + 1, length: 0, content: newProperty };
            }
            else {
                var previous = parent.children[parent.children.length - 1];
                edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
            }
            return withFormatting(text, edit, formattingOptions);
        }
        else {
            if (value === void 0 && parent.children.length >= 0) {
                //Removal
                var removalIndex = lastSegment;
                var toRemove = parent.children[removalIndex];
                var edit = void 0;
                if (parent.children.length === 1) {
                    // only item
                    edit = { offset: parent.offset + 1, length: parent.length - 2, content: '' };
                }
                else if (parent.children.length - 1 === removalIndex) {
                    // last item
                    var previous = parent.children[removalIndex - 1];
                    var offset = previous.offset + previous.length;
                    var parentEndOffset = parent.offset + parent.length;
                    edit = { offset: offset, length: parentEndOffset - 2 - offset, content: '' };
                }
                else {
                    edit = { offset: toRemove.offset, length: parent.children[removalIndex + 1].offset - toRemove.offset, content: '' };
                }
                return withFormatting(text, edit, formattingOptions);
            }
            else {
                throw new Error('Array modification not supported yet');
            }
        }
    }
    else {
        throw new Error("Can not add " + (typeof lastSegment !== 'number' ? 'index' : 'property') + " to parent of type " + parent.type);
    }
}
function withFormatting(text, edit, formattingOptions) {
    // apply the edit
    var newText = applyEdit(text, edit);
    // format the new text
    var begin = edit.offset;
    var end = edit.offset + edit.content.length;
    if (edit.length === 0 || edit.content.length === 0) { // insert or remove
        while (begin > 0 && !Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["isEOL"])(newText, begin - 1)) {
            begin--;
        }
        while (end < newText.length && !Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["isEOL"])(newText, end)) {
            end++;
        }
    }
    var edits = Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["format"])(newText, { offset: begin, length: end - begin }, formattingOptions);
    // apply the formatting edits and track the begin and end offsets of the changes
    for (var i = edits.length - 1; i >= 0; i--) {
        var edit_1 = edits[i];
        newText = applyEdit(newText, edit_1);
        begin = Math.min(begin, edit_1.offset);
        end = Math.max(end, edit_1.offset + edit_1.length);
        end += edit_1.content.length - edit_1.length;
    }
    // create a single edit with all changes
    var editLength = text.length - (newText.length - end) - begin;
    return [{ offset: begin, length: editLength, content: newText.substring(begin, end) }];
}
function applyEdit(text, edit) {
    return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
}
function isWS(text, offset) {
    return '\r\n \t'.indexOf(text.charAt(offset)) !== -1;
}
//# sourceMappingURL=edit.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js ***!
  \*******************************************************************************************/
/*! exports provided: format, isEOL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEOL", function() { return isEOL; });
/* harmony import */ var _scanner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scanner.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


function format(documentText, range, options) {
    var initialIndentLevel;
    var formatText;
    var formatTextStart;
    var rangeStart;
    var rangeEnd;
    if (range) {
        rangeStart = range.offset;
        rangeEnd = rangeStart + range.length;
        formatTextStart = rangeStart;
        while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
            formatTextStart--;
        }
        var endOffset = rangeEnd;
        while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
            endOffset++;
        }
        formatText = documentText.substring(formatTextStart, endOffset);
        initialIndentLevel = computeIndentLevel(formatText, options);
    }
    else {
        formatText = documentText;
        initialIndentLevel = 0;
        formatTextStart = 0;
        rangeStart = 0;
        rangeEnd = documentText.length;
    }
    var eol = getEOL(options, documentText);
    var lineBreak = false;
    var indentLevel = 0;
    var indentValue;
    if (options.insertSpaces) {
        indentValue = repeat(' ', options.tabSize || 4);
    }
    else {
        indentValue = '\t';
    }
    var scanner = Object(_scanner_js__WEBPACK_IMPORTED_MODULE_0__["createScanner"])(formatText, false);
    var hasError = false;
    function newLineAndIndent() {
        return eol + repeat(indentValue, initialIndentLevel + indentLevel);
    }
    function scanNext() {
        var token = scanner.scan();
        lineBreak = false;
        while (token === 15 /* Trivia */ || token === 14 /* LineBreakTrivia */) {
            lineBreak = lineBreak || (token === 14 /* LineBreakTrivia */);
            token = scanner.scan();
        }
        hasError = token === 16 /* Unknown */ || scanner.getTokenError() !== 0 /* None */;
        return token;
    }
    var editOperations = [];
    function addEdit(text, startOffset, endOffset) {
        if (!hasError && startOffset < rangeEnd && endOffset > rangeStart && documentText.substring(startOffset, endOffset) !== text) {
            editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
        }
    }
    var firstToken = scanNext();
    if (firstToken !== 17 /* EOF */) {
        var firstTokenStart = scanner.getTokenOffset() + formatTextStart;
        var initialIndent = repeat(indentValue, initialIndentLevel);
        addEdit(initialIndent, formatTextStart, firstTokenStart);
    }
    while (firstToken !== 17 /* EOF */) {
        var firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
        var secondToken = scanNext();
        var replaceContent = '';
        while (!lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
            // comments on the same line: keep them on the same line, but ignore them otherwise
            var commentTokenStart = scanner.getTokenOffset() + formatTextStart;
            addEdit(' ', firstTokenEnd, commentTokenStart);
            firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
            replaceContent = secondToken === 12 /* LineCommentTrivia */ ? newLineAndIndent() : '';
            secondToken = scanNext();
        }
        if (secondToken === 2 /* CloseBraceToken */) {
            if (firstToken !== 1 /* OpenBraceToken */) {
                indentLevel--;
                replaceContent = newLineAndIndent();
            }
        }
        else if (secondToken === 4 /* CloseBracketToken */) {
            if (firstToken !== 3 /* OpenBracketToken */) {
                indentLevel--;
                replaceContent = newLineAndIndent();
            }
        }
        else {
            switch (firstToken) {
                case 3 /* OpenBracketToken */:
                case 1 /* OpenBraceToken */:
                    indentLevel++;
                    replaceContent = newLineAndIndent();
                    break;
                case 5 /* CommaToken */:
                case 12 /* LineCommentTrivia */:
                    replaceContent = newLineAndIndent();
                    break;
                case 13 /* BlockCommentTrivia */:
                    if (lineBreak) {
                        replaceContent = newLineAndIndent();
                    }
                    else {
                        // symbol following comment on the same line: keep on same line, separate with ' '
                        replaceContent = ' ';
                    }
                    break;
                case 6 /* ColonToken */:
                    replaceContent = ' ';
                    break;
                case 10 /* StringLiteral */:
                    if (secondToken === 6 /* ColonToken */) {
                        replaceContent = '';
                        break;
                    }
                // fall through
                case 7 /* NullKeyword */:
                case 8 /* TrueKeyword */:
                case 9 /* FalseKeyword */:
                case 11 /* NumericLiteral */:
                case 2 /* CloseBraceToken */:
                case 4 /* CloseBracketToken */:
                    if (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */) {
                        replaceContent = ' ';
                    }
                    else if (secondToken !== 5 /* CommaToken */ && secondToken !== 17 /* EOF */) {
                        hasError = true;
                    }
                    break;
                case 16 /* Unknown */:
                    hasError = true;
                    break;
            }
            if (lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
                replaceContent = newLineAndIndent();
            }
        }
        var secondTokenStart = scanner.getTokenOffset() + formatTextStart;
        addEdit(replaceContent, firstTokenEnd, secondTokenStart);
        firstToken = secondToken;
    }
    return editOperations;
}
function repeat(s, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += s;
    }
    return result;
}
function computeIndentLevel(content, options) {
    var i = 0;
    var nChars = 0;
    var tabSize = options.tabSize || 4;
    while (i < content.length) {
        var ch = content.charAt(i);
        if (ch === ' ') {
            nChars++;
        }
        else if (ch === '\t') {
            nChars += tabSize;
        }
        else {
            break;
        }
        i++;
    }
    return Math.floor(nChars / tabSize);
}
function getEOL(options, text) {
    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch === '\r') {
            if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
                return '\r\n';
            }
            return '\r';
        }
        else if (ch === '\n') {
            return '\n';
        }
    }
    return (options && options.eol) || '\n';
}
function isEOL(text, offset) {
    return '\r\n'.indexOf(text.charAt(offset)) !== -1;
}
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js ***!
  \*******************************************************************************************/
/*! exports provided: getLocation, parse, parseTree, findNodeAtLocation, getNodePath, getNodeValue, contains, findNodeAtOffset, visit, stripComments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTree", function() { return parseTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtLocation", function() { return findNodeAtLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodePath", function() { return getNodePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeValue", function() { return getNodeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtOffset", function() { return findNodeAtOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visit", function() { return visit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripComments", function() { return stripComments; });
/* harmony import */ var _scanner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scanner.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var ParseOptions;
(function (ParseOptions) {
    ParseOptions.DEFAULT = {
        allowTrailingComma: false
    };
})(ParseOptions || (ParseOptions = {}));
/**
 * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
 */
function getLocation(text, position) {
    var segments = []; // strings or numbers
    var earlyReturnException = new Object();
    var previousNode = void 0;
    var previousNodeInst = {
        value: {},
        offset: 0,
        length: 0,
        type: 'object',
        parent: void 0
    };
    var isAtPropertyKey = false;
    function setPreviousNode(value, offset, length, type) {
        previousNodeInst.value = value;
        previousNodeInst.offset = offset;
        previousNodeInst.length = length;
        previousNodeInst.type = type;
        previousNodeInst.colonOffset = void 0;
        previousNode = previousNodeInst;
    }
    try {
        visit(text, {
            onObjectBegin: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                isAtPropertyKey = position > offset;
                segments.push(''); // push a placeholder (will be replaced)
            },
            onObjectProperty: function (name, offset, length) {
                if (position < offset) {
                    throw earlyReturnException;
                }
                setPreviousNode(name, offset, length, 'property');
                segments[segments.length - 1] = name;
                if (position <= offset + length) {
                    throw earlyReturnException;
                }
            },
            onObjectEnd: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                segments.pop();
            },
            onArrayBegin: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                segments.push(0);
            },
            onArrayEnd: function (offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                previousNode = void 0;
                segments.pop();
            },
            onLiteralValue: function (value, offset, length) {
                if (position < offset) {
                    throw earlyReturnException;
                }
                setPreviousNode(value, offset, length, getLiteralNodeType(value));
                if (position <= offset + length) {
                    throw earlyReturnException;
                }
            },
            onSeparator: function (sep, offset, length) {
                if (position <= offset) {
                    throw earlyReturnException;
                }
                if (sep === ':' && previousNode && previousNode.type === 'property') {
                    previousNode.colonOffset = offset;
                    isAtPropertyKey = false;
                    previousNode = void 0;
                }
                else if (sep === ',') {
                    var last = segments[segments.length - 1];
                    if (typeof last === 'number') {
                        segments[segments.length - 1] = last + 1;
                    }
                    else {
                        isAtPropertyKey = true;
                        segments[segments.length - 1] = '';
                    }
                    previousNode = void 0;
                }
            }
        });
    }
    catch (e) {
        if (e !== earlyReturnException) {
            throw e;
        }
    }
    return {
        path: segments,
        previousNode: previousNode,
        isAtPropertyKey: isAtPropertyKey,
        matches: function (pattern) {
            var k = 0;
            for (var i = 0; k < pattern.length && i < segments.length; i++) {
                if (pattern[k] === segments[i] || pattern[k] === '*') {
                    k++;
                }
                else if (pattern[k] !== '**') {
                    return false;
                }
            }
            return k === pattern.length;
        }
    };
}
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */
function parse(text, errors, options) {
    if (errors === void 0) { errors = []; }
    if (options === void 0) { options = ParseOptions.DEFAULT; }
    var currentProperty = null;
    var currentParent = [];
    var previousParents = [];
    function onValue(value) {
        if (Array.isArray(currentParent)) {
            currentParent.push(value);
        }
        else if (currentProperty) {
            currentParent[currentProperty] = value;
        }
    }
    var visitor = {
        onObjectBegin: function () {
            var object = {};
            onValue(object);
            previousParents.push(currentParent);
            currentParent = object;
            currentProperty = null;
        },
        onObjectProperty: function (name) {
            currentProperty = name;
        },
        onObjectEnd: function () {
            currentParent = previousParents.pop();
        },
        onArrayBegin: function () {
            var array = [];
            onValue(array);
            previousParents.push(currentParent);
            currentParent = array;
            currentProperty = null;
        },
        onArrayEnd: function () {
            currentParent = previousParents.pop();
        },
        onLiteralValue: onValue,
        onError: function (error, offset, length) {
            errors.push({ error: error, offset: offset, length: length });
        }
    };
    visit(text, visitor, options);
    return currentParent[0];
}
/**
 * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 */
function parseTree(text, errors, options) {
    if (errors === void 0) { errors = []; }
    if (options === void 0) { options = ParseOptions.DEFAULT; }
    var currentParent = { type: 'array', offset: -1, length: -1, children: [], parent: void 0 }; // artificial root
    function ensurePropertyComplete(endOffset) {
        if (currentParent.type === 'property') {
            currentParent.length = endOffset - currentParent.offset;
            currentParent = currentParent.parent;
        }
    }
    function onValue(valueNode) {
        currentParent.children.push(valueNode);
        return valueNode;
    }
    var visitor = {
        onObjectBegin: function (offset) {
            currentParent = onValue({ type: 'object', offset: offset, length: -1, parent: currentParent, children: [] });
        },
        onObjectProperty: function (name, offset, length) {
            currentParent = onValue({ type: 'property', offset: offset, length: -1, parent: currentParent, children: [] });
            currentParent.children.push({ type: 'string', value: name, offset: offset, length: length, parent: currentParent });
        },
        onObjectEnd: function (offset, length) {
            currentParent.length = offset + length - currentParent.offset;
            currentParent = currentParent.parent;
            ensurePropertyComplete(offset + length);
        },
        onArrayBegin: function (offset, length) {
            currentParent = onValue({ type: 'array', offset: offset, length: -1, parent: currentParent, children: [] });
        },
        onArrayEnd: function (offset, length) {
            currentParent.length = offset + length - currentParent.offset;
            currentParent = currentParent.parent;
            ensurePropertyComplete(offset + length);
        },
        onLiteralValue: function (value, offset, length) {
            onValue({ type: getLiteralNodeType(value), offset: offset, length: length, parent: currentParent, value: value });
            ensurePropertyComplete(offset + length);
        },
        onSeparator: function (sep, offset, length) {
            if (currentParent.type === 'property') {
                if (sep === ':') {
                    currentParent.colonOffset = offset;
                }
                else if (sep === ',') {
                    ensurePropertyComplete(offset);
                }
            }
        },
        onError: function (error, offset, length) {
            errors.push({ error: error, offset: offset, length: length });
        }
    };
    visit(text, visitor, options);
    var result = currentParent.children[0];
    if (result) {
        delete result.parent;
    }
    return result;
}
/**
 * Finds the node at the given path in a JSON DOM.
 */
function findNodeAtLocation(root, path) {
    if (!root) {
        return void 0;
    }
    var node = root;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var segment = path_1[_i];
        if (typeof segment === 'string') {
            if (node.type !== 'object' || !Array.isArray(node.children)) {
                return void 0;
            }
            var found = false;
            for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
                var propertyNode = _b[_a];
                if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
                    node = propertyNode.children[1];
                    found = true;
                    break;
                }
            }
            if (!found) {
                return void 0;
            }
        }
        else {
            var index = segment;
            if (node.type !== 'array' || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
                return void 0;
            }
            node = node.children[index];
        }
    }
    return node;
}
/**
 * Gets the JSON path of the given JSON DOM node
 */
function getNodePath(node) {
    if (!node.parent || !node.parent.children) {
        return [];
    }
    var path = getNodePath(node.parent);
    if (node.parent.type === 'property') {
        var key = node.parent.children[0].value;
        path.push(key);
    }
    else if (node.parent.type === 'array') {
        var index = node.parent.children.indexOf(node);
        if (index !== -1) {
            path.push(index);
        }
    }
    return path;
}
/**
 * Evaluates the JavaScript object of the given JSON DOM node
 */
function getNodeValue(node) {
    switch (node.type) {
        case 'array':
            return node.children.map(getNodeValue);
        case 'object':
            var obj = Object.create(null);
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var prop = _a[_i];
                var valueNode = prop.children[1];
                if (valueNode) {
                    obj[prop.children[0].value] = getNodeValue(valueNode);
                }
            }
            return obj;
        case 'null':
        case 'string':
        case 'number':
        case 'boolean':
            return node.value;
        default:
            return void 0;
    }
}
function contains(node, offset, includeRightBound) {
    if (includeRightBound === void 0) { includeRightBound = false; }
    return (offset >= node.offset && offset < (node.offset + node.length)) || includeRightBound && (offset === (node.offset + node.length));
}
/**
 * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
 */
function findNodeAtOffset(node, offset, includeRightBound) {
    if (includeRightBound === void 0) { includeRightBound = false; }
    if (contains(node, offset, includeRightBound)) {
        var children = node.children;
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length && children[i].offset <= offset; i++) {
                var item = findNodeAtOffset(children[i], offset, includeRightBound);
                if (item) {
                    return item;
                }
            }
        }
        return node;
    }
    return void 0;
}
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */
function visit(text, visitor, options) {
    if (options === void 0) { options = ParseOptions.DEFAULT; }
    var _scanner = Object(_scanner_js__WEBPACK_IMPORTED_MODULE_0__["createScanner"])(text, false);
    function toNoArgVisit(visitFunction) {
        return visitFunction ? function () { return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
    }
    function toOneArgVisit(visitFunction) {
        return visitFunction ? function (arg) { return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
    }
    var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
    var disallowComments = options && options.disallowComments;
    var allowTrailingComma = options && options.allowTrailingComma;
    function scanNext() {
        while (true) {
            var token = _scanner.scan();
            switch (_scanner.getTokenError()) {
                case 4 /* InvalidUnicode */:
                    handleError(14 /* InvalidUnicode */);
                    break;
                case 5 /* InvalidEscapeCharacter */:
                    handleError(15 /* InvalidEscapeCharacter */);
                    break;
                case 3 /* UnexpectedEndOfNumber */:
                    handleError(13 /* UnexpectedEndOfNumber */);
                    break;
                case 1 /* UnexpectedEndOfComment */:
                    if (!disallowComments) {
                        handleError(11 /* UnexpectedEndOfComment */);
                    }
                    break;
                case 2 /* UnexpectedEndOfString */:
                    handleError(12 /* UnexpectedEndOfString */);
                    break;
                case 6 /* InvalidCharacter */:
                    handleError(16 /* InvalidCharacter */);
                    break;
            }
            switch (token) {
                case 12 /* LineCommentTrivia */:
                case 13 /* BlockCommentTrivia */:
                    if (disallowComments) {
                        handleError(10 /* InvalidCommentToken */);
                    }
                    else {
                        onComment();
                    }
                    break;
                case 16 /* Unknown */:
                    handleError(1 /* InvalidSymbol */);
                    break;
                case 15 /* Trivia */:
                case 14 /* LineBreakTrivia */:
                    break;
                default:
                    return token;
            }
        }
    }
    function handleError(error, skipUntilAfter, skipUntil) {
        if (skipUntilAfter === void 0) { skipUntilAfter = []; }
        if (skipUntil === void 0) { skipUntil = []; }
        onError(error);
        if (skipUntilAfter.length + skipUntil.length > 0) {
            var token = _scanner.getToken();
            while (token !== 17 /* EOF */) {
                if (skipUntilAfter.indexOf(token) !== -1) {
                    scanNext();
                    break;
                }
                else if (skipUntil.indexOf(token) !== -1) {
                    break;
                }
                token = scanNext();
            }
        }
    }
    function parseString(isValue) {
        var value = _scanner.getTokenValue();
        if (isValue) {
            onLiteralValue(value);
        }
        else {
            onObjectProperty(value);
        }
        scanNext();
        return true;
    }
    function parseLiteral() {
        switch (_scanner.getToken()) {
            case 11 /* NumericLiteral */:
                var value = 0;
                try {
                    value = JSON.parse(_scanner.getTokenValue());
                    if (typeof value !== 'number') {
                        handleError(2 /* InvalidNumberFormat */);
                        value = 0;
                    }
                }
                catch (e) {
                    handleError(2 /* InvalidNumberFormat */);
                }
                onLiteralValue(value);
                break;
            case 7 /* NullKeyword */:
                onLiteralValue(null);
                break;
            case 8 /* TrueKeyword */:
                onLiteralValue(true);
                break;
            case 9 /* FalseKeyword */:
                onLiteralValue(false);
                break;
            default:
                return false;
        }
        scanNext();
        return true;
    }
    function parseProperty() {
        if (_scanner.getToken() !== 10 /* StringLiteral */) {
            handleError(3 /* PropertyNameExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            return false;
        }
        parseString(false);
        if (_scanner.getToken() === 6 /* ColonToken */) {
            onSeparator(':');
            scanNext(); // consume colon
            if (!parseValue()) {
                handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
        }
        else {
            handleError(5 /* ColonExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        }
        return true;
    }
    function parseObject() {
        onObjectBegin();
        scanNext(); // consume open brace
        var needsComma = false;
        while (_scanner.getToken() !== 2 /* CloseBraceToken */ && _scanner.getToken() !== 17 /* EOF */) {
            if (_scanner.getToken() === 5 /* CommaToken */) {
                if (!needsComma) {
                    handleError(4 /* ValueExpected */, [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 2 /* CloseBraceToken */ && allowTrailingComma) {
                    break;
                }
            }
            else if (needsComma) {
                handleError(6 /* CommaExpected */, [], []);
            }
            if (!parseProperty()) {
                handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
            needsComma = true;
        }
        onObjectEnd();
        if (_scanner.getToken() !== 2 /* CloseBraceToken */) {
            handleError(7 /* CloseBraceExpected */, [2 /* CloseBraceToken */], []);
        }
        else {
            scanNext(); // consume close brace
        }
        return true;
    }
    function parseArray() {
        onArrayBegin();
        scanNext(); // consume open bracket
        var needsComma = false;
        while (_scanner.getToken() !== 4 /* CloseBracketToken */ && _scanner.getToken() !== 17 /* EOF */) {
            if (_scanner.getToken() === 5 /* CommaToken */) {
                if (!needsComma) {
                    handleError(4 /* ValueExpected */, [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 4 /* CloseBracketToken */ && allowTrailingComma) {
                    break;
                }
            }
            else if (needsComma) {
                handleError(6 /* CommaExpected */, [], []);
            }
            if (!parseValue()) {
                handleError(4 /* ValueExpected */, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
            }
            needsComma = true;
        }
        onArrayEnd();
        if (_scanner.getToken() !== 4 /* CloseBracketToken */) {
            handleError(8 /* CloseBracketExpected */, [4 /* CloseBracketToken */], []);
        }
        else {
            scanNext(); // consume close bracket
        }
        return true;
    }
    function parseValue() {
        switch (_scanner.getToken()) {
            case 3 /* OpenBracketToken */:
                return parseArray();
            case 1 /* OpenBraceToken */:
                return parseObject();
            case 10 /* StringLiteral */:
                return parseString(true);
            default:
                return parseLiteral();
        }
    }
    scanNext();
    if (_scanner.getToken() === 17 /* EOF */) {
        return true;
    }
    if (!parseValue()) {
        handleError(4 /* ValueExpected */, [], []);
        return false;
    }
    if (_scanner.getToken() !== 17 /* EOF */) {
        handleError(9 /* EndOfFileExpected */, [], []);
    }
    return true;
}
/**
 * Takes JSON with JavaScript-style comments and remove
 * them. Optionally replaces every none-newline character
 * of comments with a replaceCharacter
 */
function stripComments(text, replaceCh) {
    var _scanner = Object(_scanner_js__WEBPACK_IMPORTED_MODULE_0__["createScanner"])(text), parts = [], kind, offset = 0, pos;
    do {
        pos = _scanner.getPosition();
        kind = _scanner.scan();
        switch (kind) {
            case 12 /* LineCommentTrivia */:
            case 13 /* BlockCommentTrivia */:
            case 17 /* EOF */:
                if (offset !== pos) {
                    parts.push(text.substring(offset, pos));
                }
                if (replaceCh !== void 0) {
                    parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
                }
                offset = _scanner.getPosition();
                break;
        }
    } while (kind !== 17 /* EOF */);
    return parts.join('');
}
function getLiteralNodeType(value) {
    switch (typeof value) {
        case 'boolean': return 'boolean';
        case 'number': return 'number';
        case 'string': return 'string';
        default: return 'null';
    }
}
//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js ***!
  \********************************************************************************************/
/*! exports provided: createScanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScanner", function() { return createScanner; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */
function createScanner(text, ignoreTrivia) {
    if (ignoreTrivia === void 0) { ignoreTrivia = false; }
    var pos = 0, len = text.length, value = '', tokenOffset = 0, token = 16 /* Unknown */, scanError = 0 /* None */;
    function scanHexDigits(count, exact) {
        var digits = 0;
        var value = 0;
        while (digits < count || !exact) {
            var ch = text.charCodeAt(pos);
            if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
                value = value * 16 + ch - 48 /* _0 */;
            }
            else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
                value = value * 16 + ch - 65 /* A */ + 10;
            }
            else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
                value = value * 16 + ch - 97 /* a */ + 10;
            }
            else {
                break;
            }
            pos++;
            digits++;
        }
        if (digits < count) {
            value = -1;
        }
        return value;
    }
    function setPosition(newPosition) {
        pos = newPosition;
        value = '';
        tokenOffset = 0;
        token = 16 /* Unknown */;
        scanError = 0 /* None */;
    }
    function scanNumber() {
        var start = pos;
        if (text.charCodeAt(pos) === 48 /* _0 */) {
            pos++;
        }
        else {
            pos++;
            while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
            }
        }
        if (pos < text.length && text.charCodeAt(pos) === 46 /* dot */) {
            pos++;
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
            }
            else {
                scanError = 3 /* UnexpectedEndOfNumber */;
                return text.substring(start, pos);
            }
        }
        var end = pos;
        if (pos < text.length && (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */)) {
            pos++;
            if (pos < text.length && text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */) {
                pos++;
            }
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
                end = pos;
            }
            else {
                scanError = 3 /* UnexpectedEndOfNumber */;
            }
        }
        return text.substring(start, end);
    }
    function scanString() {
        var result = '', start = pos;
        while (true) {
            if (pos >= len) {
                result += text.substring(start, pos);
                scanError = 2 /* UnexpectedEndOfString */;
                break;
            }
            var ch = text.charCodeAt(pos);
            if (ch === 34 /* doubleQuote */) {
                result += text.substring(start, pos);
                pos++;
                break;
            }
            if (ch === 92 /* backslash */) {
                result += text.substring(start, pos);
                pos++;
                if (pos >= len) {
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                ch = text.charCodeAt(pos++);
                switch (ch) {
                    case 34 /* doubleQuote */:
                        result += '\"';
                        break;
                    case 92 /* backslash */:
                        result += '\\';
                        break;
                    case 47 /* slash */:
                        result += '/';
                        break;
                    case 98 /* b */:
                        result += '\b';
                        break;
                    case 102 /* f */:
                        result += '\f';
                        break;
                    case 110 /* n */:
                        result += '\n';
                        break;
                    case 114 /* r */:
                        result += '\r';
                        break;
                    case 116 /* t */:
                        result += '\t';
                        break;
                    case 117 /* u */:
                        var ch_1 = scanHexDigits(4, true);
                        if (ch_1 >= 0) {
                            result += String.fromCharCode(ch_1);
                        }
                        else {
                            scanError = 4 /* InvalidUnicode */;
                        }
                        break;
                    default:
                        scanError = 5 /* InvalidEscapeCharacter */;
                }
                start = pos;
                continue;
            }
            if (ch >= 0 && ch <= 0x1f) {
                if (isLineBreak(ch)) {
                    result += text.substring(start, pos);
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                else {
                    scanError = 6 /* InvalidCharacter */;
                    // mark as error but continue with string
                }
            }
            pos++;
        }
        return result;
    }
    function scanNext() {
        value = '';
        scanError = 0 /* None */;
        tokenOffset = pos;
        if (pos >= len) {
            // at the end
            tokenOffset = len;
            return token = 17 /* EOF */;
        }
        var code = text.charCodeAt(pos);
        // trivia: whitespace
        if (isWhiteSpace(code)) {
            do {
                pos++;
                value += String.fromCharCode(code);
                code = text.charCodeAt(pos);
            } while (isWhiteSpace(code));
            return token = 15 /* Trivia */;
        }
        // trivia: newlines
        if (isLineBreak(code)) {
            pos++;
            value += String.fromCharCode(code);
            if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
                pos++;
                value += '\n';
            }
            return token = 14 /* LineBreakTrivia */;
        }
        switch (code) {
            // tokens: []{}:,
            case 123 /* openBrace */:
                pos++;
                return token = 1 /* OpenBraceToken */;
            case 125 /* closeBrace */:
                pos++;
                return token = 2 /* CloseBraceToken */;
            case 91 /* openBracket */:
                pos++;
                return token = 3 /* OpenBracketToken */;
            case 93 /* closeBracket */:
                pos++;
                return token = 4 /* CloseBracketToken */;
            case 58 /* colon */:
                pos++;
                return token = 6 /* ColonToken */;
            case 44 /* comma */:
                pos++;
                return token = 5 /* CommaToken */;
            // strings
            case 34 /* doubleQuote */:
                pos++;
                value = scanString();
                return token = 10 /* StringLiteral */;
            // comments
            case 47 /* slash */:
                var start = pos - 1;
                // Single-line comment
                if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                    pos += 2;
                    while (pos < len) {
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    value = text.substring(start, pos);
                    return token = 12 /* LineCommentTrivia */;
                }
                // Multi-line comment
                if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                    pos += 2;
                    var safeLength = len - 1; // For lookahead.
                    var commentClosed = false;
                    while (pos < safeLength) {
                        var ch = text.charCodeAt(pos);
                        if (ch === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                            pos += 2;
                            commentClosed = true;
                            break;
                        }
                        pos++;
                    }
                    if (!commentClosed) {
                        pos++;
                        scanError = 1 /* UnexpectedEndOfComment */;
                    }
                    value = text.substring(start, pos);
                    return token = 13 /* BlockCommentTrivia */;
                }
                // just a single slash
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* Unknown */;
            // numbers
            case 45 /* minus */:
                value += String.fromCharCode(code);
                pos++;
                if (pos === len || !isDigit(text.charCodeAt(pos))) {
                    return token = 16 /* Unknown */;
                }
            // found a minus, followed by a number so
            // we fall through to proceed with scanning
            // numbers
            case 48 /* _0 */:
            case 49 /* _1 */:
            case 50 /* _2 */:
            case 51 /* _3 */:
            case 52 /* _4 */:
            case 53 /* _5 */:
            case 54 /* _6 */:
            case 55 /* _7 */:
            case 56 /* _8 */:
            case 57 /* _9 */:
                value += scanNumber();
                return token = 11 /* NumericLiteral */;
            // literals and unknown symbols
            default:
                // is a literal? Read the full word.
                while (pos < len && isUnknownContentCharacter(code)) {
                    pos++;
                    code = text.charCodeAt(pos);
                }
                if (tokenOffset !== pos) {
                    value = text.substring(tokenOffset, pos);
                    // keywords: true, false, null
                    switch (value) {
                        case 'true': return token = 8 /* TrueKeyword */;
                        case 'false': return token = 9 /* FalseKeyword */;
                        case 'null': return token = 7 /* NullKeyword */;
                    }
                    return token = 16 /* Unknown */;
                }
                // some
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* Unknown */;
        }
    }
    function isUnknownContentCharacter(code) {
        if (isWhiteSpace(code) || isLineBreak(code)) {
            return false;
        }
        switch (code) {
            case 125 /* closeBrace */:
            case 93 /* closeBracket */:
            case 123 /* openBrace */:
            case 91 /* openBracket */:
            case 34 /* doubleQuote */:
            case 58 /* colon */:
            case 44 /* comma */:
            case 47 /* slash */:
                return false;
        }
        return true;
    }
    function scanNextNonTrivia() {
        var result;
        do {
            result = scanNext();
        } while (result >= 12 /* LineCommentTrivia */ && result <= 15 /* Trivia */);
        return result;
    }
    return {
        setPosition: setPosition,
        getPosition: function () { return pos; },
        scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
        getToken: function () { return token; },
        getTokenValue: function () { return value; },
        getTokenOffset: function () { return tokenOffset; },
        getTokenLength: function () { return pos - tokenOffset; },
        getTokenError: function () { return scanError; }
    };
}
function isWhiteSpace(ch) {
    return ch === 32 /* space */ || ch === 9 /* tab */ || ch === 11 /* verticalTab */ || ch === 12 /* formFeed */ ||
        ch === 160 /* nonBreakingSpace */ || ch === 5760 /* ogham */ || ch >= 8192 /* enQuad */ && ch <= 8203 /* zeroWidthSpace */ ||
        ch === 8239 /* narrowNoBreakSpace */ || ch === 8287 /* mathematicalSpace */ || ch === 12288 /* ideographicSpace */ || ch === 65279 /* byteOrderMark */;
}
function isLineBreak(ch) {
    return ch === 10 /* lineFeed */ || ch === 13 /* carriageReturn */ || ch === 8232 /* lineSeparator */ || ch === 8233 /* paragraphSeparator */;
}
function isDigit(ch) {
    return ch >= 48 /* _0 */ && ch <= 57 /* _9 */;
}
//# sourceMappingURL=scanner.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/main.js":
/*!************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/main.js ***!
  \************************************************************************************/
/*! exports provided: createScanner, getLocation, parse, parseTree, findNodeAtLocation, findNodeAtOffset, getNodePath, getNodeValue, visit, stripComments, printParseErrorCode, format, modify, applyEdits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScanner", function() { return createScanner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTree", function() { return parseTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtLocation", function() { return findNodeAtLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtOffset", function() { return findNodeAtOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodePath", function() { return getNodePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeValue", function() { return getNodeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visit", function() { return visit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripComments", function() { return stripComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printParseErrorCode", function() { return printParseErrorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modify", function() { return modify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEdits", function() { return applyEdits; });
/* harmony import */ var _impl_format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./impl/format.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/format.js");
/* harmony import */ var _impl_edit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./impl/edit.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/edit.js");
/* harmony import */ var _impl_scanner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impl/scanner.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/scanner.js");
/* harmony import */ var _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./impl/parser.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/impl/parser.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */
var createScanner = _impl_scanner_js__WEBPACK_IMPORTED_MODULE_2__["createScanner"];
/**
 * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
 */
var getLocation = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["getLocation"];
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */
var parse = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["parse"];
/**
 * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 */
var parseTree = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["parseTree"];
/**
 * Finds the node at the given path in a JSON DOM.
 */
var findNodeAtLocation = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["findNodeAtLocation"];
/**
 * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
 */
var findNodeAtOffset = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["findNodeAtOffset"];
/**
 * Gets the JSON path of the given JSON DOM node
 */
var getNodePath = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["getNodePath"];
/**
 * Evaluates the JavaScript object of the given JSON DOM node
 */
var getNodeValue = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["getNodeValue"];
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */
var visit = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["visit"];
/**
 * Takes JSON with JavaScript-style comments and remove
 * them. Optionally replaces every none-newline character
 * of comments with a replaceCharacter
 */
var stripComments = _impl_parser_js__WEBPACK_IMPORTED_MODULE_3__["stripComments"];
function printParseErrorCode(code) {
    switch (code) {
        case 1 /* InvalidSymbol */: return 'InvalidSymbol';
        case 2 /* InvalidNumberFormat */: return 'InvalidNumberFormat';
        case 3 /* PropertyNameExpected */: return 'PropertyNameExpected';
        case 4 /* ValueExpected */: return 'ValueExpected';
        case 5 /* ColonExpected */: return 'ColonExpected';
        case 6 /* CommaExpected */: return 'CommaExpected';
        case 7 /* CloseBraceExpected */: return 'CloseBraceExpected';
        case 8 /* CloseBracketExpected */: return 'CloseBracketExpected';
        case 9 /* EndOfFileExpected */: return 'EndOfFileExpected';
        case 10 /* InvalidCommentToken */: return 'InvalidCommentToken';
        case 11 /* UnexpectedEndOfComment */: return 'UnexpectedEndOfComment';
        case 12 /* UnexpectedEndOfString */: return 'UnexpectedEndOfString';
        case 13 /* UnexpectedEndOfNumber */: return 'UnexpectedEndOfNumber';
        case 14 /* InvalidUnicode */: return 'InvalidUnicode';
        case 15 /* InvalidEscapeCharacter */: return 'InvalidEscapeCharacter';
        case 16 /* InvalidCharacter */: return 'InvalidCharacter';
    }
    return '<unknown ParseErrorCode>';
}
/**
 * Computes the edits needed to format a JSON document.
 *
 * @param documentText The input text
 * @param range The range to format or `undefined` to format the full content
 * @param options The formatting options
 * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
 * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
 * text in the original document. However, multiple edits can have
 * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
 * To apply edits to an input, you can use `applyEdits`
 */
function format(documentText, range, options) {
    return _impl_format_js__WEBPACK_IMPORTED_MODULE_0__["format"](documentText, range, options);
}
/**
 * Computes the edits needed to modify a value in the JSON document.
 *
 * @param documentText The input text
 * @param path The path of the value to change. The path represents either to the document root, a property or an array item.
 * If the path points to an non-existing property or item, it will be created.
 * @param value The new value for the specified property or item. If the value is undefined,
 * the property or item will be removed.
 * @param options Options
 * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
 * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
 * text in the original document. However, multiple edits can have
 * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
 * To apply edits to an input, you can use `applyEdits`
 */
function modify(text, path, value, options) {
    return _impl_edit_js__WEBPACK_IMPORTED_MODULE_1__["setProperty"](text, path, value, options.formattingOptions, options.getInsertionIndex);
}
/**
 * Applies edits to a input string.
 */
function applyEdits(text, edits) {
    for (var i = edits.length - 1; i >= 0; i--) {
        text = _impl_edit_js__WEBPACK_IMPORTED_MODULE_1__["applyEdit"](text, edits[i]);
    }
    return text;
}
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/_deps/vscode-languageserver-types/main.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/_deps/vscode-languageserver-types/main.js ***!
  \***************************************************************************************************/
/*! exports provided: Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity, Diagnostic, Command, TextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, MarkupContent, CompletionItemKind, InsertTextFormat, CompletionItem, CompletionList, MarkedString, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolInformation, DocumentSymbol, CodeActionKind, CodeActionContext, CodeAction, CodeLens, FormattingOptions, DocumentLink, EOL, TextDocument, TextDocumentSaveReason */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationLink", function() { return LocationLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorInformation", function() { return ColorInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPresentation", function() { return ColorPresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeKind", function() { return FoldingRangeKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRange", function() { return FoldingRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticRelatedInformation", function() { return DiagnosticRelatedInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticSeverity", function() { return DiagnosticSeverity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diagnostic", function() { return Diagnostic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEdit", function() { return TextEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentEdit", function() { return TextDocumentEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFile", function() { return CreateFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenameFile", function() { return RenameFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteFile", function() { return DeleteFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceEdit", function() { return WorkspaceEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceChange", function() { return WorkspaceChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentIdentifier", function() { return TextDocumentIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VersionedTextDocumentIdentifier", function() { return VersionedTextDocumentIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentItem", function() { return TextDocumentItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupKind", function() { return MarkupKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupContent", function() { return MarkupContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemKind", function() { return CompletionItemKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertTextFormat", function() { return InsertTextFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItem", function() { return CompletionItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionList", function() { return CompletionList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkedString", function() { return MarkedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hover", function() { return Hover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterInformation", function() { return ParameterInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureInformation", function() { return SignatureInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlightKind", function() { return DocumentHighlightKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlight", function() { return DocumentHighlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolKind", function() { return SymbolKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInformation", function() { return SymbolInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSymbol", function() { return DocumentSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionKind", function() { return CodeActionKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionContext", function() { return CodeActionContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeAction", function() { return CodeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeLens", function() { return CodeLens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattingOptions", function() { return FormattingOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentLink", function() { return DocumentLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOL", function() { return EOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocument", function() { return TextDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentSaveReason", function() { return TextDocumentSaveReason; });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange))
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.number(candidate.red)
            && Is.number(candidate.green)
            && Is.number(candidate.blue)
            && Is.number(candidate.alpha);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * Enum of known range kinds
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
        var result = {
            startLine: startLine,
            endLine: endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.number(candidate.startLine) && Is.number(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && VersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options) {
        var result = {
            kind: 'create',
            uri: uri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) &&
            (candidate.options === void 0 ||
                ((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) &&
            (candidate.options === void 0 ||
                ((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options) {
        var result = {
            kind: 'delete',
            uri: uri
        };
        if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) &&
            (candidate.options === void 0 ||
                ((candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
            (candidate.documentChanges === void 0 || candidate.documentChanges.every(function (change) {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits) {
        this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
        this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
        this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
        this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            return this._workspaceEdit;
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (VersionedTextDocumentIdentifier.is(key)) {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    documentChanges: []
                };
            }
            if (!this._workspaceEdit.documentChanges) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = key;
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    changes: Object.create(null)
                };
            }
            if (!this._workspaceEdit.changes) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
    };
    WorkspaceChange.prototype.deleteFile = function (uri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
    };
    WorkspaceChange.prototype.checkDocumentChanges = function () {
        if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
    };
    return WorkspaceChange;
}());

/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
(function (MarkupKind) {
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
        var candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
    ;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
/**
 * Represents programming constructs like variables, classes, interfaces etc.
 * that appear in a document. Document symbols can be hierarchical and they
 * have two ranges: one that encloses its definition and one that points to
 * its most interesting range, e.g. the range of an identifier.
 */
var DocumentSymbol = /** @class */ (function () {
    function DocumentSymbol() {
    }
    return DocumentSymbol;
}());

(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
        };
        if (children !== void 0) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === void 0 || Is.string(candidate.detail)) &&
            (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) &&
            (candidate.children === void 0 || Array.isArray(candidate.children));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only) {
        var result = { diagnostics: diagnostics };
        if (only !== void 0 && only !== null) {
            result.only = only;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, commandOrEdit, kind) {
        var result = { title: title };
        if (Command.is(commandOrEdit)) {
            result.command = commandOrEdit;
        }
        else {
            result.edit = commandOrEdit;
        }
        if (kind !== void null) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === void 0 || Is.string(candidate.kind)) &&
            (candidate.edit !== void 0 || candidate.command !== void 0) &&
            (candidate.command === void 0 || Command.is(candidate.command)) &&
            (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data))
            result.data = data;
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */
var DocumentLink = /** @class */ (function () {
    function DocumentLink() {
    }
    return DocumentLink;
}());

/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
var EOL = ['\n', '\r\n', '\r'];
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason || (TextDocumentSaveReason = {}));
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = null;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = null;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === null) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/jsonMode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/jsonMode.js ***!
  \*********************************************************************/
/*! exports provided: setupMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupMode", function() { return setupMode; });
/* harmony import */ var _workerManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workerManager.js */ "./node_modules/monaco-editor/esm/vs/language/json/workerManager.js");
/* harmony import */ var _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languageFeatures.js */ "./node_modules/monaco-editor/esm/vs/language/json/languageFeatures.js");
/* harmony import */ var _tokenization_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokenization.js */ "./node_modules/monaco-editor/esm/vs/language/json/tokenization.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/




function setupMode(defaults) {
    var disposables = [];
    var client = new _workerManager_js__WEBPACK_IMPORTED_MODULE_0__["WorkerManager"](defaults);
    disposables.push(client);
    var worker = function () {
        var uris = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uris[_i] = arguments[_i];
        }
        return client.getLanguageServiceWorker.apply(client, uris);
    };
    var languageId = defaults.languageId;
    disposables.push(monaco.languages.registerCompletionItemProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["CompletionAdapter"](worker)));
    disposables.push(monaco.languages.registerHoverProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["HoverAdapter"](worker)));
    disposables.push(monaco.languages.registerDocumentSymbolProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["DocumentSymbolAdapter"](worker)));
    disposables.push(monaco.languages.registerDocumentFormattingEditProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["DocumentFormattingEditProvider"](worker)));
    disposables.push(monaco.languages.registerDocumentRangeFormattingEditProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["DocumentRangeFormattingEditProvider"](worker)));
    disposables.push(new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["DiagnosticsAdapter"](languageId, worker, defaults));
    disposables.push(monaco.languages.setTokensProvider(languageId, Object(_tokenization_js__WEBPACK_IMPORTED_MODULE_2__["createTokenizationSupport"])(true)));
    disposables.push(monaco.languages.setLanguageConfiguration(languageId, richEditConfiguration));
    disposables.push(monaco.languages.registerColorProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["DocumentColorAdapter"](worker)));
    disposables.push(monaco.languages.registerFoldingRangeProvider(languageId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__["FoldingRangeAdapter"](worker)));
}
var richEditConfiguration = {
    wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string'] },
        { open: '[', close: ']', notIn: ['string'] },
        { open: '"', close: '"', notIn: ['string'] }
    ]
};


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/languageFeatures.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/languageFeatures.js ***!
  \*****************************************************************************/
/*! exports provided: DiagnosticsAdapter, CompletionAdapter, HoverAdapter, DocumentSymbolAdapter, DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider, DocumentColorAdapter, FoldingRangeAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticsAdapter", function() { return DiagnosticsAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionAdapter", function() { return CompletionAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoverAdapter", function() { return HoverAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSymbolAdapter", function() { return DocumentSymbolAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentFormattingEditProvider", function() { return DocumentFormattingEditProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentRangeFormattingEditProvider", function() { return DocumentRangeFormattingEditProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentColorAdapter", function() { return DocumentColorAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeAdapter", function() { return FoldingRangeAdapter; });
/* harmony import */ var _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_deps/vscode-languageserver-types/main.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/vscode-languageserver-types/main.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var Uri = monaco.Uri;
var Range = monaco.Range;
// --- diagnostics --- ---
var DiagnosticsAdapter = /** @class */ (function () {
    function DiagnosticsAdapter(_languageId, _worker, defaults) {
        var _this = this;
        this._languageId = _languageId;
        this._worker = _worker;
        this._disposables = [];
        this._listener = Object.create(null);
        var onModelAdd = function (model) {
            var modeId = model.getModeId();
            if (modeId !== _this._languageId) {
                return;
            }
            var handle;
            _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
                clearTimeout(handle);
                handle = setTimeout(function () { return _this._doValidate(model.uri, modeId); }, 500);
            });
            _this._doValidate(model.uri, modeId);
        };
        var onModelRemoved = function (model) {
            monaco.editor.setModelMarkers(model, _this._languageId, []);
            var uriStr = model.uri.toString();
            var listener = _this._listener[uriStr];
            if (listener) {
                listener.dispose();
                delete _this._listener[uriStr];
            }
        };
        this._disposables.push(monaco.editor.onDidCreateModel(onModelAdd));
        this._disposables.push(monaco.editor.onWillDisposeModel(function (model) {
            onModelRemoved(model);
            _this._resetSchema(model.uri);
        }));
        this._disposables.push(monaco.editor.onDidChangeModelLanguage(function (event) {
            onModelRemoved(event.model);
            onModelAdd(event.model);
            _this._resetSchema(event.model.uri);
        }));
        this._disposables.push(defaults.onDidChange(function (_) {
            monaco.editor.getModels().forEach(function (model) {
                if (model.getModeId() === _this._languageId) {
                    onModelRemoved(model);
                    onModelAdd(model);
                }
            });
        }));
        this._disposables.push({
            dispose: function () {
                monaco.editor.getModels().forEach(onModelRemoved);
                for (var key in _this._listener) {
                    _this._listener[key].dispose();
                }
            }
        });
        monaco.editor.getModels().forEach(onModelAdd);
    }
    DiagnosticsAdapter.prototype.dispose = function () {
        this._disposables.forEach(function (d) { return d && d.dispose(); });
        this._disposables = [];
    };
    DiagnosticsAdapter.prototype._resetSchema = function (resource) {
        this._worker().then(function (worker) {
            worker.resetSchema(resource.toString());
        });
    };
    DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
        this._worker(resource).then(function (worker) {
            return worker.doValidation(resource.toString()).then(function (diagnostics) {
                var markers = diagnostics.map(function (d) { return toDiagnostics(resource, d); });
                var model = monaco.editor.getModel(resource);
                if (model && model.getModeId() === languageId) {
                    monaco.editor.setModelMarkers(model, languageId, markers);
                }
            });
        }).then(undefined, function (err) {
            console.error(err);
        });
    };
    return DiagnosticsAdapter;
}());

function toSeverity(lsSeverity) {
    switch (lsSeverity) {
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["DiagnosticSeverity"].Error: return monaco.MarkerSeverity.Error;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["DiagnosticSeverity"].Warning: return monaco.MarkerSeverity.Warning;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["DiagnosticSeverity"].Information: return monaco.MarkerSeverity.Info;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["DiagnosticSeverity"].Hint: return monaco.MarkerSeverity.Hint;
        default:
            return monaco.MarkerSeverity.Info;
    }
}
function toDiagnostics(resource, diag) {
    var code = typeof diag.code === 'number' ? String(diag.code) : diag.code;
    return {
        severity: toSeverity(diag.severity),
        startLineNumber: diag.range.start.line + 1,
        startColumn: diag.range.start.character + 1,
        endLineNumber: diag.range.end.line + 1,
        endColumn: diag.range.end.character + 1,
        message: diag.message,
        code: code,
        source: diag.source
    };
}
// --- completion ------
function fromPosition(position) {
    if (!position) {
        return void 0;
    }
    return { character: position.column - 1, line: position.lineNumber - 1 };
}
function fromRange(range) {
    if (!range) {
        return void 0;
    }
    return { start: { line: range.startLineNumber - 1, character: range.startColumn - 1 }, end: { line: range.endLineNumber - 1, character: range.endColumn - 1 } };
}
function toRange(range) {
    if (!range) {
        return void 0;
    }
    return new Range(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}
function toCompletionItemKind(kind) {
    var mItemKind = monaco.languages.CompletionItemKind;
    switch (kind) {
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Text: return mItemKind.Text;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Method: return mItemKind.Method;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Function: return mItemKind.Function;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Constructor: return mItemKind.Constructor;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Field: return mItemKind.Field;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Variable: return mItemKind.Variable;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Class: return mItemKind.Class;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Interface: return mItemKind.Interface;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Module: return mItemKind.Module;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Property: return mItemKind.Property;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Unit: return mItemKind.Unit;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Value: return mItemKind.Value;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Enum: return mItemKind.Enum;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Keyword: return mItemKind.Keyword;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Snippet: return mItemKind.Snippet;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Color: return mItemKind.Color;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].File: return mItemKind.File;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Reference: return mItemKind.Reference;
    }
    return mItemKind.Property;
}
function fromCompletionItemKind(kind) {
    var mItemKind = monaco.languages.CompletionItemKind;
    switch (kind) {
        case mItemKind.Text: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Text;
        case mItemKind.Method: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Method;
        case mItemKind.Function: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Function;
        case mItemKind.Constructor: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Constructor;
        case mItemKind.Field: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Field;
        case mItemKind.Variable: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Variable;
        case mItemKind.Class: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Class;
        case mItemKind.Interface: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Interface;
        case mItemKind.Module: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Module;
        case mItemKind.Property: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Property;
        case mItemKind.Unit: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Unit;
        case mItemKind.Value: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Value;
        case mItemKind.Enum: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Enum;
        case mItemKind.Keyword: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Keyword;
        case mItemKind.Snippet: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Snippet;
        case mItemKind.Color: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Color;
        case mItemKind.File: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].File;
        case mItemKind.Reference: return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Reference;
    }
    return _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["CompletionItemKind"].Property;
}
function toTextEdit(textEdit) {
    if (!textEdit) {
        return void 0;
    }
    return {
        range: toRange(textEdit.range),
        text: textEdit.newText
    };
}
var CompletionAdapter = /** @class */ (function () {
    function CompletionAdapter(_worker) {
        this._worker = _worker;
    }
    Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
        get: function () {
            return [' ', ':'];
        },
        enumerable: true,
        configurable: true
    });
    CompletionAdapter.prototype.provideCompletionItems = function (model, position, context, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) {
            return worker.doComplete(resource.toString(), fromPosition(position));
        }).then(function (info) {
            if (!info) {
                return;
            }
            var wordInfo = model.getWordUntilPosition(position);
            var wordRange = new Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
            var items = info.items.map(function (entry) {
                var item = {
                    label: entry.label,
                    insertText: entry.insertText || entry.label,
                    sortText: entry.sortText,
                    filterText: entry.filterText,
                    documentation: entry.documentation,
                    detail: entry.detail,
                    range: wordRange,
                    kind: toCompletionItemKind(entry.kind),
                };
                if (entry.textEdit) {
                    item.range = toRange(entry.textEdit.range);
                    item.insertText = entry.textEdit.newText;
                }
                if (entry.additionalTextEdits) {
                    item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
                }
                if (entry.insertTextFormat === _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["InsertTextFormat"].Snippet) {
                    item.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
                }
                return item;
            });
            return {
                isIncomplete: info.isIncomplete,
                suggestions: items
            };
        });
    };
    return CompletionAdapter;
}());

function isMarkupContent(thing) {
    return thing && typeof thing === 'object' && typeof thing.kind === 'string';
}
function toMarkdownString(entry) {
    if (typeof entry === 'string') {
        return {
            value: entry
        };
    }
    if (isMarkupContent(entry)) {
        if (entry.kind === 'plaintext') {
            return {
                value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
            };
        }
        return {
            value: entry.value
        };
    }
    return { value: '```' + entry.language + '\n' + entry.value + '\n```\n' };
}
function toMarkedStringArray(contents) {
    if (!contents) {
        return void 0;
    }
    if (Array.isArray(contents)) {
        return contents.map(toMarkdownString);
    }
    return [toMarkdownString(contents)];
}
// --- hover ------
var HoverAdapter = /** @class */ (function () {
    function HoverAdapter(_worker) {
        this._worker = _worker;
    }
    HoverAdapter.prototype.provideHover = function (model, position, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) {
            return worker.doHover(resource.toString(), fromPosition(position));
        }).then(function (info) {
            if (!info) {
                return;
            }
            return {
                range: toRange(info.range),
                contents: toMarkedStringArray(info.contents)
            };
        });
    };
    return HoverAdapter;
}());

// --- definition ------
function toLocation(location) {
    return {
        uri: Uri.parse(location.uri),
        range: toRange(location.range)
    };
}
// --- document symbols ------
function toSymbolKind(kind) {
    var mKind = monaco.languages.SymbolKind;
    switch (kind) {
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].File: return mKind.Array;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Module: return mKind.Module;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Namespace: return mKind.Namespace;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Package: return mKind.Package;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Class: return mKind.Class;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Method: return mKind.Method;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Property: return mKind.Property;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Field: return mKind.Field;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Constructor: return mKind.Constructor;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Enum: return mKind.Enum;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Interface: return mKind.Interface;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Function: return mKind.Function;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Variable: return mKind.Variable;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Constant: return mKind.Constant;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].String: return mKind.String;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Number: return mKind.Number;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Boolean: return mKind.Boolean;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["SymbolKind"].Array: return mKind.Array;
    }
    return mKind.Function;
}
var DocumentSymbolAdapter = /** @class */ (function () {
    function DocumentSymbolAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentSymbolAdapter.prototype.provideDocumentSymbols = function (model, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) { return worker.findDocumentSymbols(resource.toString()); }).then(function (items) {
            if (!items) {
                return;
            }
            return items.map(function (item) { return ({
                name: item.name,
                detail: '',
                containerName: item.containerName,
                kind: toSymbolKind(item.kind),
                range: toRange(item.location.range),
                selectionRange: toRange(item.location.range)
            }); });
        });
    };
    return DocumentSymbolAdapter;
}());

function fromFormattingOptions(options) {
    return {
        tabSize: options.tabSize,
        insertSpaces: options.insertSpaces
    };
}
var DocumentFormattingEditProvider = /** @class */ (function () {
    function DocumentFormattingEditProvider(_worker) {
        this._worker = _worker;
    }
    DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (model, options, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) {
            return worker.format(resource.toString(), null, fromFormattingOptions(options)).then(function (edits) {
                if (!edits || edits.length === 0) {
                    return;
                }
                return edits.map(toTextEdit);
            });
        });
    };
    return DocumentFormattingEditProvider;
}());

var DocumentRangeFormattingEditProvider = /** @class */ (function () {
    function DocumentRangeFormattingEditProvider(_worker) {
        this._worker = _worker;
    }
    DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) {
            return worker.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then(function (edits) {
                if (!edits || edits.length === 0) {
                    return;
                }
                return edits.map(toTextEdit);
            });
        });
    };
    return DocumentRangeFormattingEditProvider;
}());

var DocumentColorAdapter = /** @class */ (function () {
    function DocumentColorAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentColorAdapter.prototype.provideDocumentColors = function (model, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) { return worker.findDocumentColors(resource.toString()); }).then(function (infos) {
            if (!infos) {
                return;
            }
            return infos.map(function (item) { return ({
                color: item.color,
                range: toRange(item.range)
            }); });
        });
    };
    DocumentColorAdapter.prototype.provideColorPresentations = function (model, info, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) { return worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range)); }).then(function (presentations) {
            if (!presentations) {
                return;
            }
            return presentations.map(function (presentation) {
                var item = {
                    label: presentation.label,
                };
                if (presentation.textEdit) {
                    item.textEdit = toTextEdit(presentation.textEdit);
                }
                if (presentation.additionalTextEdits) {
                    item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
                }
                return item;
            });
        });
    };
    return DocumentColorAdapter;
}());

var FoldingRangeAdapter = /** @class */ (function () {
    function FoldingRangeAdapter(_worker) {
        this._worker = _worker;
    }
    FoldingRangeAdapter.prototype.provideFoldingRanges = function (model, context, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) { return worker.provideFoldingRanges(resource.toString(), context); }).then(function (ranges) {
            if (!ranges) {
                return;
            }
            return ranges.map(function (range) {
                var result = {
                    start: range.startLine + 1,
                    end: range.endLine + 1
                };
                if (typeof range.kind !== 'undefined') {
                    result.kind = toFoldingRangeKind(range.kind);
                }
                return result;
            });
        });
    };
    return FoldingRangeAdapter;
}());

function toFoldingRangeKind(kind) {
    switch (kind) {
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["FoldingRangeKind"].Comment: return monaco.languages.FoldingRangeKind.Comment;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["FoldingRangeKind"].Imports: return monaco.languages.FoldingRangeKind.Imports;
        case _deps_vscode_languageserver_types_main_js__WEBPACK_IMPORTED_MODULE_0__["FoldingRangeKind"].Region: return monaco.languages.FoldingRangeKind.Region;
    }
    return void 0;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/tokenization.js":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/tokenization.js ***!
  \*************************************************************************/
/*! exports provided: createTokenizationSupport, TOKEN_DELIM_OBJECT, TOKEN_DELIM_ARRAY, TOKEN_DELIM_COLON, TOKEN_DELIM_COMMA, TOKEN_VALUE_BOOLEAN, TOKEN_VALUE_NULL, TOKEN_VALUE_STRING, TOKEN_VALUE_NUMBER, TOKEN_PROPERTY_NAME, TOKEN_COMMENT_BLOCK, TOKEN_COMMENT_LINE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTokenizationSupport", function() { return createTokenizationSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_DELIM_OBJECT", function() { return TOKEN_DELIM_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_DELIM_ARRAY", function() { return TOKEN_DELIM_ARRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_DELIM_COLON", function() { return TOKEN_DELIM_COLON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_DELIM_COMMA", function() { return TOKEN_DELIM_COMMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_VALUE_BOOLEAN", function() { return TOKEN_VALUE_BOOLEAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_VALUE_NULL", function() { return TOKEN_VALUE_NULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_VALUE_STRING", function() { return TOKEN_VALUE_STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_VALUE_NUMBER", function() { return TOKEN_VALUE_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_PROPERTY_NAME", function() { return TOKEN_PROPERTY_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_COMMENT_BLOCK", function() { return TOKEN_COMMENT_BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOKEN_COMMENT_LINE", function() { return TOKEN_COMMENT_LINE; });
/* harmony import */ var _deps_jsonc_parser_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_deps/jsonc-parser/main.js */ "./node_modules/monaco-editor/esm/vs/language/json/_deps/jsonc-parser/main.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


function createTokenizationSupport(supportComments) {
    return {
        getInitialState: function () { return new JSONState(null, null, false); },
        tokenize: function (line, state, offsetDelta, stopAtOffset) { return tokenize(supportComments, line, state, offsetDelta, stopAtOffset); }
    };
}
var TOKEN_DELIM_OBJECT = 'delimiter.bracket.json';
var TOKEN_DELIM_ARRAY = 'delimiter.array.json';
var TOKEN_DELIM_COLON = 'delimiter.colon.json';
var TOKEN_DELIM_COMMA = 'delimiter.comma.json';
var TOKEN_VALUE_BOOLEAN = 'keyword.json';
var TOKEN_VALUE_NULL = 'keyword.json';
var TOKEN_VALUE_STRING = 'string.value.json';
var TOKEN_VALUE_NUMBER = 'number.json';
var TOKEN_PROPERTY_NAME = 'string.key.json';
var TOKEN_COMMENT_BLOCK = 'comment.block.json';
var TOKEN_COMMENT_LINE = 'comment.line.json';
var JSONState = /** @class */ (function () {
    function JSONState(state, scanError, lastWasColon) {
        this._state = state;
        this.scanError = scanError;
        this.lastWasColon = lastWasColon;
    }
    JSONState.prototype.clone = function () {
        return new JSONState(this._state, this.scanError, this.lastWasColon);
    };
    JSONState.prototype.equals = function (other) {
        if (other === this) {
            return true;
        }
        if (!other || !(other instanceof JSONState)) {
            return false;
        }
        return this.scanError === other.scanError &&
            this.lastWasColon === other.lastWasColon;
    };
    JSONState.prototype.getStateData = function () {
        return this._state;
    };
    JSONState.prototype.setStateData = function (state) {
        this._state = state;
    };
    return JSONState;
}());
function tokenize(comments, line, state, offsetDelta, stopAtOffset) {
    if (offsetDelta === void 0) { offsetDelta = 0; }
    // handle multiline strings and block comments
    var numberOfInsertedCharacters = 0, adjustOffset = false;
    switch (state.scanError) {
        case 2 /* UnexpectedEndOfString */:
            line = '"' + line;
            numberOfInsertedCharacters = 1;
            break;
        case 1 /* UnexpectedEndOfComment */:
            line = '/*' + line;
            numberOfInsertedCharacters = 2;
            break;
    }
    var scanner = _deps_jsonc_parser_main_js__WEBPACK_IMPORTED_MODULE_0__["createScanner"](line), kind, ret, lastWasColon = state.lastWasColon;
    ret = {
        tokens: [],
        endState: state.clone()
    };
    while (true) {
        var offset = offsetDelta + scanner.getPosition(), type = '';
        kind = scanner.scan();
        if (kind === 17 /* EOF */) {
            break;
        }
        // Check that the scanner has advanced
        if (offset === offsetDelta + scanner.getPosition()) {
            throw new Error('Scanner did not advance, next 3 characters are: ' + line.substr(scanner.getPosition(), 3));
        }
        // In case we inserted /* or " character, we need to
        // adjust the offset of all tokens (except the first)
        if (adjustOffset) {
            offset -= numberOfInsertedCharacters;
        }
        adjustOffset = numberOfInsertedCharacters > 0;
        // brackets and type
        switch (kind) {
            case 1 /* OpenBraceToken */:
                type = TOKEN_DELIM_OBJECT;
                lastWasColon = false;
                break;
            case 2 /* CloseBraceToken */:
                type = TOKEN_DELIM_OBJECT;
                lastWasColon = false;
                break;
            case 3 /* OpenBracketToken */:
                type = TOKEN_DELIM_ARRAY;
                lastWasColon = false;
                break;
            case 4 /* CloseBracketToken */:
                type = TOKEN_DELIM_ARRAY;
                lastWasColon = false;
                break;
            case 6 /* ColonToken */:
                type = TOKEN_DELIM_COLON;
                lastWasColon = true;
                break;
            case 5 /* CommaToken */:
                type = TOKEN_DELIM_COMMA;
                lastWasColon = false;
                break;
            case 8 /* TrueKeyword */:
            case 9 /* FalseKeyword */:
                type = TOKEN_VALUE_BOOLEAN;
                lastWasColon = false;
                break;
            case 7 /* NullKeyword */:
                type = TOKEN_VALUE_NULL;
                lastWasColon = false;
                break;
            case 10 /* StringLiteral */:
                type = lastWasColon ? TOKEN_VALUE_STRING : TOKEN_PROPERTY_NAME;
                lastWasColon = false;
                break;
            case 11 /* NumericLiteral */:
                type = TOKEN_VALUE_NUMBER;
                lastWasColon = false;
                break;
        }
        // comments, iff enabled
        if (comments) {
            switch (kind) {
                case 12 /* LineCommentTrivia */:
                    type = TOKEN_COMMENT_LINE;
                    break;
                case 13 /* BlockCommentTrivia */:
                    type = TOKEN_COMMENT_BLOCK;
                    break;
            }
        }
        ret.endState = new JSONState(state.getStateData(), scanner.getTokenError(), lastWasColon);
        ret.tokens.push({
            startIndex: offset,
            scopes: type
        });
    }
    return ret;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/json/workerManager.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/workerManager.js ***!
  \**************************************************************************/
/*! exports provided: WorkerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerManager", function() { return WorkerManager; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var STOP_WHEN_IDLE_FOR = 2 * 60 * 1000; // 2min
var WorkerManager = /** @class */ (function () {
    function WorkerManager(defaults) {
        var _this = this;
        this._defaults = defaults;
        this._worker = null;
        this._idleCheckInterval = setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);
        this._lastUsedTime = 0;
        this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });
    }
    WorkerManager.prototype._stopWorker = function () {
        if (this._worker) {
            this._worker.dispose();
            this._worker = null;
        }
        this._client = null;
    };
    WorkerManager.prototype.dispose = function () {
        clearInterval(this._idleCheckInterval);
        this._configChangeListener.dispose();
        this._stopWorker();
    };
    WorkerManager.prototype._checkIfIdle = function () {
        if (!this._worker) {
            return;
        }
        var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
        if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
            this._stopWorker();
        }
    };
    WorkerManager.prototype._getClient = function () {
        this._lastUsedTime = Date.now();
        if (!this._client) {
            this._worker = monaco.editor.createWebWorker({
                // module that exports the create() method and returns a `JSONWorker` instance
                moduleId: 'vs/language/json/jsonWorker',
                label: this._defaults.languageId,
                // passed in to the create() method
                createData: {
                    languageSettings: this._defaults.diagnosticsOptions,
                    languageId: this._defaults.languageId,
                    enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest
                }
            });
            this._client = this._worker.getProxy();
        }
        return this._client;
    };
    WorkerManager.prototype.getLanguageServiceWorker = function () {
        var _this = this;
        var resources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            resources[_i] = arguments[_i];
        }
        var _client;
        return this._getClient().then(function (client) {
            _client = client;
        }).then(function (_) {
            return _this._worker.withSyncedResources(resources);
        }).then(function (_) { return _client; });
    };
    return WorkerManager;
}());



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9lZGl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL2pzb25jLXBhcnNlci9pbXBsL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvanNvbmMtcGFyc2VyL2ltcGwvc2Nhbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdHlwZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uTW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9sYW5ndWFnZUZlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL3Rva2VuaXphdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2Uv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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBLENBQUMsc0JBQXNCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNENBQTRDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOENBQThDO0FBQy9DO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0VBQW9FO0FBQ3JFO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0RBQWdEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixTQUFTLGlDQUFpQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRCQUE0QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUN0QztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQzFCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxDQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBGQUFtQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDNEI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUN1QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvRkFBYTtBQUMxQixhQUFhLG9GQUFhO0FBQzFCLGFBQWEsb0ZBQWE7QUFDMUIsYUFBYSxvRkFBYTtBQUMxQixhQUFhLG9GQUFhO0FBQzFCLGFBQWEsb0ZBQWE7QUFDMUIsYUFBYSxvRkFBYTtBQUMxQixhQUFhLG9GQUFhO0FBQzFCLGFBQWEsb0ZBQWE7QUFDMUIsYUFBYSxvRkFBYTtBQUMxQixhQUFhLG9GQUFhO0FBQzFCLGFBQWEsb0ZBQWE7QUFDMUIsYUFBYSxvRkFBYTtBQUMxQixh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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25KQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDYTtBQUNiLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELDZCQUE2QixFQUFFO0FBQzFGO0FBQ0EsNkVBQTZFLDRCQUE0QixFQUFFO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTLHFCQUFxQixnQkFBZ0IsRUFBRTtBQUNoRDtBQUNBO0FBQ0EsQ0FBQztBQUN3QiIsImZpbGUiOiJqcy9lZjVkYTQ1MzA0NjkyY2FkY2MxNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHsgZm9ybWF0LCBpc0VPTCB9IGZyb20gJy4vZm9ybWF0LmpzJztcbmltcG9ydCB7IHBhcnNlVHJlZSwgZmluZE5vZGVBdExvY2F0aW9uIH0gZnJvbSAnLi9wYXJzZXIuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByb3BlcnR5KHRleHQsIHBhdGgsIGZvcm1hdHRpbmdPcHRpb25zKSB7XG4gICAgcmV0dXJuIHNldFByb3BlcnR5KHRleHQsIHBhdGgsIHZvaWQgMCwgZm9ybWF0dGluZ09wdGlvbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldFByb3BlcnR5KHRleHQsIG9yaWdpbmFsUGF0aCwgdmFsdWUsIGZvcm1hdHRpbmdPcHRpb25zLCBnZXRJbnNlcnRpb25JbmRleCkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgcGF0aCA9IG9yaWdpbmFsUGF0aC5zbGljZSgpO1xuICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICB2YXIgcm9vdCA9IHBhcnNlVHJlZSh0ZXh0LCBlcnJvcnMpO1xuICAgIHZhciBwYXJlbnQgPSB2b2lkIDA7XG4gICAgdmFyIGxhc3RTZWdtZW50ID0gdm9pZCAwO1xuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGFzdFNlZ21lbnQgPSBwYXRoLnBvcCgpO1xuICAgICAgICBwYXJlbnQgPSBmaW5kTm9kZUF0TG9jYXRpb24ocm9vdCwgcGF0aCk7XG4gICAgICAgIGlmIChwYXJlbnQgPT09IHZvaWQgMCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxhc3RTZWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKF9hID0ge30sIF9hW2xhc3RTZWdtZW50XSA9IHZhbHVlLCBfYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAvLyBlbXB0eSBkb2N1bWVudFxuICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkgeyAvLyBkZWxldGVcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBkZWxldGUgaW4gZW1wdHkgZG9jdW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2l0aEZvcm1hdHRpbmcodGV4dCwgeyBvZmZzZXQ6IHJvb3QgPyByb290Lm9mZnNldCA6IDAsIGxlbmd0aDogcm9vdCA/IHJvb3QubGVuZ3RoIDogMCwgY29udGVudDogSlNPTi5zdHJpbmdpZnkodmFsdWUpIH0sIGZvcm1hdHRpbmdPcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBsYXN0U2VnbWVudCA9PT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShwYXJlbnQuY2hpbGRyZW4pKSB7XG4gICAgICAgIHZhciBleGlzdGluZyA9IGZpbmROb2RlQXRMb2NhdGlvbihwYXJlbnQsIFtsYXN0U2VnbWVudF0pO1xuICAgICAgICBpZiAoZXhpc3RpbmcgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDApIHsgLy8gZGVsZXRlXG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgQVNUJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eUluZGV4ID0gcGFyZW50LmNoaWxkcmVuLmluZGV4T2YoZXhpc3RpbmcucGFyZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlQmVnaW4gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZUVuZCA9IGV4aXN0aW5nLnBhcmVudC5vZmZzZXQgKyBleGlzdGluZy5wYXJlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNvbW1hIG9mIHRoZSBwcmV2aW91cyBub2RlXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHBhcmVudC5jaGlsZHJlbltwcm9wZXJ0eUluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJlZ2luID0gcHJldmlvdXMub2Zmc2V0ICsgcHJldmlvdXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQmVnaW4gPSBwYXJlbnQub2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNvbW1hIG9mIHRoZSBuZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gcGFyZW50LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW5kID0gbmV4dC5vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpdGhGb3JtYXR0aW5nKHRleHQsIHsgb2Zmc2V0OiByZW1vdmVCZWdpbiwgbGVuZ3RoOiByZW1vdmVFbmQgLSByZW1vdmVCZWdpbiwgY29udGVudDogJycgfSwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHZhbHVlIG9mIGV4aXN0aW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpdGhGb3JtYXR0aW5nKHRleHQsIHsgb2Zmc2V0OiBleGlzdGluZy5vZmZzZXQsIGxlbmd0aDogZXhpc3RpbmcubGVuZ3RoLCBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgfSwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDApIHsgLy8gZGVsZXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBwcm9wZXJ0eSBkb2VzIG5vdCBleGlzdCwgbm90aGluZyB0byBkb1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1Byb3BlcnR5ID0gSlNPTi5zdHJpbmdpZnkobGFzdFNlZ21lbnQpICsgXCI6IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5zZXJ0aW9uSW5kZXggPyBnZXRJbnNlcnRpb25JbmRleChwYXJlbnQuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChwKSB7IHJldHVybiBwLmNoaWxkcmVuWzBdLnZhbHVlOyB9KSkgOiBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGVkaXQgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gcGFyZW50LmNoaWxkcmVuW2luZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgZWRpdCA9IHsgb2Zmc2V0OiBwcmV2aW91cy5vZmZzZXQgKyBwcmV2aW91cy5sZW5ndGgsIGxlbmd0aDogMCwgY29udGVudDogJywnICsgbmV3UHJvcGVydHkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHBhcmVudC5vZmZzZXQgKyAxLCBsZW5ndGg6IDAsIGNvbnRlbnQ6IG5ld1Byb3BlcnR5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHBhcmVudC5vZmZzZXQgKyAxLCBsZW5ndGg6IDAsIGNvbnRlbnQ6IG5ld1Byb3BlcnR5ICsgJywnIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2l0aEZvcm1hdHRpbmcodGV4dCwgZWRpdCwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnYXJyYXknICYmIHR5cGVvZiBsYXN0U2VnbWVudCA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShwYXJlbnQuY2hpbGRyZW4pKSB7XG4gICAgICAgIHZhciBpbnNlcnRJbmRleCA9IGxhc3RTZWdtZW50O1xuICAgICAgICBpZiAoaW5zZXJ0SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnRcbiAgICAgICAgICAgIHZhciBuZXdQcm9wZXJ0eSA9IFwiXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgZWRpdCA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZWRpdCA9IHsgb2Zmc2V0OiBwYXJlbnQub2Zmc2V0ICsgMSwgbGVuZ3RoOiAwLCBjb250ZW50OiBuZXdQcm9wZXJ0eSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHByZXZpb3VzLm9mZnNldCArIHByZXZpb3VzLmxlbmd0aCwgbGVuZ3RoOiAwLCBjb250ZW50OiAnLCcgKyBuZXdQcm9wZXJ0eSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdpdGhGb3JtYXR0aW5nKHRleHQsIGVkaXQsIGZvcm1hdHRpbmdPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwICYmIHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPj0gMCkge1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZhbFxuICAgICAgICAgICAgICAgIHZhciByZW1vdmFsSW5kZXggPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW5bcmVtb3ZhbEluZGV4XTtcbiAgICAgICAgICAgICAgICB2YXIgZWRpdCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgZWRpdCA9IHsgb2Zmc2V0OiBwYXJlbnQub2Zmc2V0ICsgMSwgbGVuZ3RoOiBwYXJlbnQubGVuZ3RoIC0gMiwgY29udGVudDogJycgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDEgPT09IHJlbW92YWxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsYXN0IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gcGFyZW50LmNoaWxkcmVuW3JlbW92YWxJbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gcHJldmlvdXMub2Zmc2V0ICsgcHJldmlvdXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50RW5kT2Zmc2V0ID0gcGFyZW50Lm9mZnNldCArIHBhcmVudC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGVkaXQgPSB7IG9mZnNldDogb2Zmc2V0LCBsZW5ndGg6IHBhcmVudEVuZE9mZnNldCAtIDIgLSBvZmZzZXQsIGNvbnRlbnQ6ICcnIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZGl0ID0geyBvZmZzZXQ6IHRvUmVtb3ZlLm9mZnNldCwgbGVuZ3RoOiBwYXJlbnQuY2hpbGRyZW5bcmVtb3ZhbEluZGV4ICsgMV0ub2Zmc2V0IC0gdG9SZW1vdmUub2Zmc2V0LCBjb250ZW50OiAnJyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gd2l0aEZvcm1hdHRpbmcodGV4dCwgZWRpdCwgZm9ybWF0dGluZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcnJheSBtb2RpZmljYXRpb24gbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBhZGQgXCIgKyAodHlwZW9mIGxhc3RTZWdtZW50ICE9PSAnbnVtYmVyJyA/ICdpbmRleCcgOiAncHJvcGVydHknKSArIFwiIHRvIHBhcmVudCBvZiB0eXBlIFwiICsgcGFyZW50LnR5cGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHdpdGhGb3JtYXR0aW5nKHRleHQsIGVkaXQsIGZvcm1hdHRpbmdPcHRpb25zKSB7XG4gICAgLy8gYXBwbHkgdGhlIGVkaXRcbiAgICB2YXIgbmV3VGV4dCA9IGFwcGx5RWRpdCh0ZXh0LCBlZGl0KTtcbiAgICAvLyBmb3JtYXQgdGhlIG5ldyB0ZXh0XG4gICAgdmFyIGJlZ2luID0gZWRpdC5vZmZzZXQ7XG4gICAgdmFyIGVuZCA9IGVkaXQub2Zmc2V0ICsgZWRpdC5jb250ZW50Lmxlbmd0aDtcbiAgICBpZiAoZWRpdC5sZW5ndGggPT09IDAgfHwgZWRpdC5jb250ZW50Lmxlbmd0aCA9PT0gMCkgeyAvLyBpbnNlcnQgb3IgcmVtb3ZlXG4gICAgICAgIHdoaWxlIChiZWdpbiA+IDAgJiYgIWlzRU9MKG5ld1RleHQsIGJlZ2luIC0gMSkpIHtcbiAgICAgICAgICAgIGJlZ2luLS07XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGVuZCA8IG5ld1RleHQubGVuZ3RoICYmICFpc0VPTChuZXdUZXh0LCBlbmQpKSB7XG4gICAgICAgICAgICBlbmQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZWRpdHMgPSBmb3JtYXQobmV3VGV4dCwgeyBvZmZzZXQ6IGJlZ2luLCBsZW5ndGg6IGVuZCAtIGJlZ2luIH0sIGZvcm1hdHRpbmdPcHRpb25zKTtcbiAgICAvLyBhcHBseSB0aGUgZm9ybWF0dGluZyBlZGl0cyBhbmQgdHJhY2sgdGhlIGJlZ2luIGFuZCBlbmQgb2Zmc2V0cyBvZiB0aGUgY2hhbmdlc1xuICAgIGZvciAodmFyIGkgPSBlZGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgZWRpdF8xID0gZWRpdHNbaV07XG4gICAgICAgIG5ld1RleHQgPSBhcHBseUVkaXQobmV3VGV4dCwgZWRpdF8xKTtcbiAgICAgICAgYmVnaW4gPSBNYXRoLm1pbihiZWdpbiwgZWRpdF8xLm9mZnNldCk7XG4gICAgICAgIGVuZCA9IE1hdGgubWF4KGVuZCwgZWRpdF8xLm9mZnNldCArIGVkaXRfMS5sZW5ndGgpO1xuICAgICAgICBlbmQgKz0gZWRpdF8xLmNvbnRlbnQubGVuZ3RoIC0gZWRpdF8xLmxlbmd0aDtcbiAgICB9XG4gICAgLy8gY3JlYXRlIGEgc2luZ2xlIGVkaXQgd2l0aCBhbGwgY2hhbmdlc1xuICAgIHZhciBlZGl0TGVuZ3RoID0gdGV4dC5sZW5ndGggLSAobmV3VGV4dC5sZW5ndGggLSBlbmQpIC0gYmVnaW47XG4gICAgcmV0dXJuIFt7IG9mZnNldDogYmVnaW4sIGxlbmd0aDogZWRpdExlbmd0aCwgY29udGVudDogbmV3VGV4dC5zdWJzdHJpbmcoYmVnaW4sIGVuZCkgfV07XG59XG5leHBvcnQgZnVuY3Rpb24gYXBwbHlFZGl0KHRleHQsIGVkaXQpIHtcbiAgICByZXR1cm4gdGV4dC5zdWJzdHJpbmcoMCwgZWRpdC5vZmZzZXQpICsgZWRpdC5jb250ZW50ICsgdGV4dC5zdWJzdHJpbmcoZWRpdC5vZmZzZXQgKyBlZGl0Lmxlbmd0aCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNXUyh0ZXh0LCBvZmZzZXQpIHtcbiAgICByZXR1cm4gJ1xcclxcbiBcXHQnLmluZGV4T2YodGV4dC5jaGFyQXQob2Zmc2V0KSkgIT09IC0xO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZWRpdC5qcy5tYXAiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7IGNyZWF0ZVNjYW5uZXIgfSBmcm9tICcuL3NjYW5uZXIuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkb2N1bWVudFRleHQsIHJhbmdlLCBvcHRpb25zKSB7XG4gICAgdmFyIGluaXRpYWxJbmRlbnRMZXZlbDtcbiAgICB2YXIgZm9ybWF0VGV4dDtcbiAgICB2YXIgZm9ybWF0VGV4dFN0YXJ0O1xuICAgIHZhciByYW5nZVN0YXJ0O1xuICAgIHZhciByYW5nZUVuZDtcbiAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgcmFuZ2VTdGFydCA9IHJhbmdlLm9mZnNldDtcbiAgICAgICAgcmFuZ2VFbmQgPSByYW5nZVN0YXJ0ICsgcmFuZ2UubGVuZ3RoO1xuICAgICAgICBmb3JtYXRUZXh0U3RhcnQgPSByYW5nZVN0YXJ0O1xuICAgICAgICB3aGlsZSAoZm9ybWF0VGV4dFN0YXJ0ID4gMCAmJiAhaXNFT0woZG9jdW1lbnRUZXh0LCBmb3JtYXRUZXh0U3RhcnQgLSAxKSkge1xuICAgICAgICAgICAgZm9ybWF0VGV4dFN0YXJ0LS07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVuZE9mZnNldCA9IHJhbmdlRW5kO1xuICAgICAgICB3aGlsZSAoZW5kT2Zmc2V0IDwgZG9jdW1lbnRUZXh0Lmxlbmd0aCAmJiAhaXNFT0woZG9jdW1lbnRUZXh0LCBlbmRPZmZzZXQpKSB7XG4gICAgICAgICAgICBlbmRPZmZzZXQrKztcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXRUZXh0ID0gZG9jdW1lbnRUZXh0LnN1YnN0cmluZyhmb3JtYXRUZXh0U3RhcnQsIGVuZE9mZnNldCk7XG4gICAgICAgIGluaXRpYWxJbmRlbnRMZXZlbCA9IGNvbXB1dGVJbmRlbnRMZXZlbChmb3JtYXRUZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvcm1hdFRleHQgPSBkb2N1bWVudFRleHQ7XG4gICAgICAgIGluaXRpYWxJbmRlbnRMZXZlbCA9IDA7XG4gICAgICAgIGZvcm1hdFRleHRTdGFydCA9IDA7XG4gICAgICAgIHJhbmdlU3RhcnQgPSAwO1xuICAgICAgICByYW5nZUVuZCA9IGRvY3VtZW50VGV4dC5sZW5ndGg7XG4gICAgfVxuICAgIHZhciBlb2wgPSBnZXRFT0wob3B0aW9ucywgZG9jdW1lbnRUZXh0KTtcbiAgICB2YXIgbGluZUJyZWFrID0gZmFsc2U7XG4gICAgdmFyIGluZGVudExldmVsID0gMDtcbiAgICB2YXIgaW5kZW50VmFsdWU7XG4gICAgaWYgKG9wdGlvbnMuaW5zZXJ0U3BhY2VzKSB7XG4gICAgICAgIGluZGVudFZhbHVlID0gcmVwZWF0KCcgJywgb3B0aW9ucy50YWJTaXplIHx8IDQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5kZW50VmFsdWUgPSAnXFx0JztcbiAgICB9XG4gICAgdmFyIHNjYW5uZXIgPSBjcmVhdGVTY2FubmVyKGZvcm1hdFRleHQsIGZhbHNlKTtcbiAgICB2YXIgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBuZXdMaW5lQW5kSW5kZW50KCkge1xuICAgICAgICByZXR1cm4gZW9sICsgcmVwZWF0KGluZGVudFZhbHVlLCBpbml0aWFsSW5kZW50TGV2ZWwgKyBpbmRlbnRMZXZlbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYW5OZXh0KCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBzY2FubmVyLnNjYW4oKTtcbiAgICAgICAgbGluZUJyZWFrID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICh0b2tlbiA9PT0gMTUgLyogVHJpdmlhICovIHx8IHRva2VuID09PSAxNCAvKiBMaW5lQnJlYWtUcml2aWEgKi8pIHtcbiAgICAgICAgICAgIGxpbmVCcmVhayA9IGxpbmVCcmVhayB8fCAodG9rZW4gPT09IDE0IC8qIExpbmVCcmVha1RyaXZpYSAqLyk7XG4gICAgICAgICAgICB0b2tlbiA9IHNjYW5uZXIuc2NhbigpO1xuICAgICAgICB9XG4gICAgICAgIGhhc0Vycm9yID0gdG9rZW4gPT09IDE2IC8qIFVua25vd24gKi8gfHwgc2Nhbm5lci5nZXRUb2tlbkVycm9yKCkgIT09IDAgLyogTm9uZSAqLztcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgICB2YXIgZWRpdE9wZXJhdGlvbnMgPSBbXTtcbiAgICBmdW5jdGlvbiBhZGRFZGl0KHRleHQsIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpIHtcbiAgICAgICAgaWYgKCFoYXNFcnJvciAmJiBzdGFydE9mZnNldCA8IHJhbmdlRW5kICYmIGVuZE9mZnNldCA+IHJhbmdlU3RhcnQgJiYgZG9jdW1lbnRUZXh0LnN1YnN0cmluZyhzdGFydE9mZnNldCwgZW5kT2Zmc2V0KSAhPT0gdGV4dCkge1xuICAgICAgICAgICAgZWRpdE9wZXJhdGlvbnMucHVzaCh7IG9mZnNldDogc3RhcnRPZmZzZXQsIGxlbmd0aDogZW5kT2Zmc2V0IC0gc3RhcnRPZmZzZXQsIGNvbnRlbnQ6IHRleHQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZpcnN0VG9rZW4gPSBzY2FuTmV4dCgpO1xuICAgIGlmIChmaXJzdFRva2VuICE9PSAxNyAvKiBFT0YgKi8pIHtcbiAgICAgICAgdmFyIGZpcnN0VG9rZW5TdGFydCA9IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSArIGZvcm1hdFRleHRTdGFydDtcbiAgICAgICAgdmFyIGluaXRpYWxJbmRlbnQgPSByZXBlYXQoaW5kZW50VmFsdWUsIGluaXRpYWxJbmRlbnRMZXZlbCk7XG4gICAgICAgIGFkZEVkaXQoaW5pdGlhbEluZGVudCwgZm9ybWF0VGV4dFN0YXJ0LCBmaXJzdFRva2VuU3RhcnQpO1xuICAgIH1cbiAgICB3aGlsZSAoZmlyc3RUb2tlbiAhPT0gMTcgLyogRU9GICovKSB7XG4gICAgICAgIHZhciBmaXJzdFRva2VuRW5kID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpICsgc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpICsgZm9ybWF0VGV4dFN0YXJ0O1xuICAgICAgICB2YXIgc2Vjb25kVG9rZW4gPSBzY2FuTmV4dCgpO1xuICAgICAgICB2YXIgcmVwbGFjZUNvbnRlbnQgPSAnJztcbiAgICAgICAgd2hpbGUgKCFsaW5lQnJlYWsgJiYgKHNlY29uZFRva2VuID09PSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLyB8fCBzZWNvbmRUb2tlbiA9PT0gMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovKSkge1xuICAgICAgICAgICAgLy8gY29tbWVudHMgb24gdGhlIHNhbWUgbGluZToga2VlcCB0aGVtIG9uIHRoZSBzYW1lIGxpbmUsIGJ1dCBpZ25vcmUgdGhlbSBvdGhlcndpc2VcbiAgICAgICAgICAgIHZhciBjb21tZW50VG9rZW5TdGFydCA9IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSArIGZvcm1hdFRleHRTdGFydDtcbiAgICAgICAgICAgIGFkZEVkaXQoJyAnLCBmaXJzdFRva2VuRW5kLCBjb21tZW50VG9rZW5TdGFydCk7XG4gICAgICAgICAgICBmaXJzdFRva2VuRW5kID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpICsgc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpICsgZm9ybWF0VGV4dFN0YXJ0O1xuICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSBzZWNvbmRUb2tlbiA9PT0gMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi8gPyBuZXdMaW5lQW5kSW5kZW50KCkgOiAnJztcbiAgICAgICAgICAgIHNlY29uZFRva2VuID0gc2Nhbk5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Vjb25kVG9rZW4gPT09IDIgLyogQ2xvc2VCcmFjZVRva2VuICovKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RUb2tlbiAhPT0gMSAvKiBPcGVuQnJhY2VUb2tlbiAqLykge1xuICAgICAgICAgICAgICAgIGluZGVudExldmVsLS07XG4gICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSBuZXdMaW5lQW5kSW5kZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2Vjb25kVG9rZW4gPT09IDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi8pIHtcbiAgICAgICAgICAgIGlmIChmaXJzdFRva2VuICE9PSAzIC8qIE9wZW5CcmFja2V0VG9rZW4gKi8pIHtcbiAgICAgICAgICAgICAgICBpbmRlbnRMZXZlbC0tO1xuICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gbmV3TGluZUFuZEluZGVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChmaXJzdFRva2VuKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIE9wZW5CcmFja2V0VG9rZW4gKi86XG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIE9wZW5CcmFjZVRva2VuICovOlxuICAgICAgICAgICAgICAgICAgICBpbmRlbnRMZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ29udGVudCA9IG5ld0xpbmVBbmRJbmRlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1IC8qIENvbW1hVG9rZW4gKi86XG4gICAgICAgICAgICAgICAgY2FzZSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSBuZXdMaW5lQW5kSW5kZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ29udGVudCA9IG5ld0xpbmVBbmRJbmRlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN5bWJvbCBmb2xsb3dpbmcgY29tbWVudCBvbiB0aGUgc2FtZSBsaW5lOiBrZWVwIG9uIHNhbWUgbGluZSwgc2VwYXJhdGUgd2l0aCAnICdcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VDb250ZW50ID0gJyAnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNiAvKiBDb2xvblRva2VuICovOlxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ29udGVudCA9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMCAvKiBTdHJpbmdMaXRlcmFsICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kVG9rZW4gPT09IDYgLyogQ29sb25Ub2tlbiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSA3IC8qIE51bGxLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIGNhc2UgOCAvKiBUcnVlS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDkgLyogRmFsc2VLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMTEgLyogTnVtZXJpY0xpdGVyYWwgKi86XG4gICAgICAgICAgICAgICAgY2FzZSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi86XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRUb2tlbiA9PT0gMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi8gfHwgc2Vjb25kVG9rZW4gPT09IDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSAnICc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2Vjb25kVG9rZW4gIT09IDUgLyogQ29tbWFUb2tlbiAqLyAmJiBzZWNvbmRUb2tlbiAhPT0gMTcgLyogRU9GICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNiAvKiBVbmtub3duICovOlxuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmVCcmVhayAmJiAoc2Vjb25kVG9rZW4gPT09IDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovIHx8IHNlY29uZFRva2VuID09PSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi8pKSB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZUNvbnRlbnQgPSBuZXdMaW5lQW5kSW5kZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlY29uZFRva2VuU3RhcnQgPSBzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkgKyBmb3JtYXRUZXh0U3RhcnQ7XG4gICAgICAgIGFkZEVkaXQocmVwbGFjZUNvbnRlbnQsIGZpcnN0VG9rZW5FbmQsIHNlY29uZFRva2VuU3RhcnQpO1xuICAgICAgICBmaXJzdFRva2VuID0gc2Vjb25kVG9rZW47XG4gICAgfVxuICAgIHJldHVybiBlZGl0T3BlcmF0aW9ucztcbn1cbmZ1bmN0aW9uIHJlcGVhdChzLCBjb3VudCkge1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlSW5kZW50TGV2ZWwoY29udGVudCwgb3B0aW9ucykge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbkNoYXJzID0gMDtcbiAgICB2YXIgdGFiU2l6ZSA9IG9wdGlvbnMudGFiU2l6ZSB8fCA0O1xuICAgIHdoaWxlIChpIDwgY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoID0gY29udGVudC5jaGFyQXQoaSk7XG4gICAgICAgIGlmIChjaCA9PT0gJyAnKSB7XG4gICAgICAgICAgICBuQ2hhcnMrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIG5DaGFycyArPSB0YWJTaXplO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5mbG9vcihuQ2hhcnMgLyB0YWJTaXplKTtcbn1cbmZ1bmN0aW9uIGdldEVPTChvcHRpb25zLCB0ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaCA9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICBpZiAoY2ggPT09ICdcXHInKSB7XG4gICAgICAgICAgICBpZiAoaSArIDEgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJBdChpICsgMSkgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdcXHJcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdcXHInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgICAgICAgcmV0dXJuICdcXG4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAob3B0aW9ucyAmJiBvcHRpb25zLmVvbCkgfHwgJ1xcbic7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFT0wodGV4dCwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuICdcXHJcXG4nLmluZGV4T2YodGV4dC5jaGFyQXQob2Zmc2V0KSkgIT09IC0xO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ybWF0LmpzLm1hcCIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHsgY3JlYXRlU2Nhbm5lciB9IGZyb20gJy4vc2Nhbm5lci5qcyc7XG52YXIgUGFyc2VPcHRpb25zO1xuKGZ1bmN0aW9uIChQYXJzZU9wdGlvbnMpIHtcbiAgICBQYXJzZU9wdGlvbnMuREVGQVVMVCA9IHtcbiAgICAgICAgYWxsb3dUcmFpbGluZ0NvbW1hOiBmYWxzZVxuICAgIH07XG59KShQYXJzZU9wdGlvbnMgfHwgKFBhcnNlT3B0aW9ucyA9IHt9KSk7XG4vKipcbiAqIEZvciBhIGdpdmVuIG9mZnNldCwgZXZhbHVhdGUgdGhlIGxvY2F0aW9uIGluIHRoZSBKU09OIGRvY3VtZW50LiBFYWNoIHNlZ21lbnQgaW4gdGhlIGxvY2F0aW9uIHBhdGggaXMgZWl0aGVyIGEgcHJvcGVydHkgbmFtZSBvciBhbiBhcnJheSBpbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2F0aW9uKHRleHQsIHBvc2l0aW9uKSB7XG4gICAgdmFyIHNlZ21lbnRzID0gW107IC8vIHN0cmluZ3Mgb3IgbnVtYmVyc1xuICAgIHZhciBlYXJseVJldHVybkV4Y2VwdGlvbiA9IG5ldyBPYmplY3QoKTtcbiAgICB2YXIgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgIHZhciBwcmV2aW91c05vZGVJbnN0ID0ge1xuICAgICAgICB2YWx1ZToge30sXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcGFyZW50OiB2b2lkIDBcbiAgICB9O1xuICAgIHZhciBpc0F0UHJvcGVydHlLZXkgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBzZXRQcmV2aW91c05vZGUodmFsdWUsIG9mZnNldCwgbGVuZ3RoLCB0eXBlKSB7XG4gICAgICAgIHByZXZpb3VzTm9kZUluc3QudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcHJldmlvdXNOb2RlSW5zdC5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHByZXZpb3VzTm9kZUluc3QubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBwcmV2aW91c05vZGVJbnN0LnR5cGUgPSB0eXBlO1xuICAgICAgICBwcmV2aW91c05vZGVJbnN0LmNvbG9uT2Zmc2V0ID0gdm9pZCAwO1xuICAgICAgICBwcmV2aW91c05vZGUgPSBwcmV2aW91c05vZGVJbnN0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2aXNpdCh0ZXh0LCB7XG4gICAgICAgICAgICBvbk9iamVjdEJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaXNBdFByb3BlcnR5S2V5ID0gcG9zaXRpb24gPiBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaCgnJyk7IC8vIHB1c2ggYSBwbGFjZWhvbGRlciAod2lsbCBiZSByZXBsYWNlZClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFByZXZpb3VzTm9kZShuYW1lLCBvZmZzZXQsIGxlbmd0aCwgJ3Byb3BlcnR5Jyk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV0gPSBuYW1lO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBvZmZzZXQgKyBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uT2JqZWN0RW5kOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucG9wKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BcnJheUJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaCgwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFycmF5RW5kOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucG9wKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25MaXRlcmFsVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFByZXZpb3VzTm9kZSh2YWx1ZSwgb2Zmc2V0LCBsZW5ndGgsIGdldExpdGVyYWxOb2RlVHlwZSh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBvZmZzZXQgKyBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU2VwYXJhdG9yOiBmdW5jdGlvbiAoc2VwLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXAgPT09ICc6JyAmJiBwcmV2aW91c05vZGUgJiYgcHJldmlvdXNOb2RlLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlLmNvbG9uT2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBpc0F0UHJvcGVydHlLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZXAgPT09ICcsJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdCA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXSA9IGxhc3QgKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNBdFByb3BlcnR5S2V5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlICE9PSBlYXJseVJldHVybkV4Y2VwdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXRoOiBzZWdtZW50cyxcbiAgICAgICAgcHJldmlvdXNOb2RlOiBwcmV2aW91c05vZGUsXG4gICAgICAgIGlzQXRQcm9wZXJ0eUtleTogaXNBdFByb3BlcnR5S2V5LFxuICAgICAgICBtYXRjaGVzOiBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgICAgICAgdmFyIGsgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGsgPCBwYXR0ZXJuLmxlbmd0aCAmJiBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybltrXSA9PT0gc2VnbWVudHNbaV0gfHwgcGF0dGVybltrXSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGF0dGVybltrXSAhPT0gJyoqJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGsgPT09IHBhdHRlcm4ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiB0ZXh0IGFuZCByZXR1cm5zIHRoZSBvYmplY3QgdGhlIEpTT04gY29udGVudCByZXByZXNlbnRzLiBPbiBpbnZhbGlkIGlucHV0LCB0aGUgcGFyc2VyIHRyaWVzIHRvIGJlIGFzIGZhdWx0IHRvbGVyYW50IGFzIHBvc3NpYmxlLCBidXQgc3RpbGwgcmV0dXJuIGEgcmVzdWx0LlxuICogVGhlcmVmb3JlIGFsd2F5cyBjaGVjayB0aGUgZXJyb3JzIGxpc3QgdG8gZmluZCBvdXQgaWYgdGhlIGlucHV0IHdhcyB2YWxpZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHRleHQsIGVycm9ycywgb3B0aW9ucykge1xuICAgIGlmIChlcnJvcnMgPT09IHZvaWQgMCkgeyBlcnJvcnMgPSBbXTsgfVxuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IFBhcnNlT3B0aW9ucy5ERUZBVUxUOyB9XG4gICAgdmFyIGN1cnJlbnRQcm9wZXJ0eSA9IG51bGw7XG4gICAgdmFyIGN1cnJlbnRQYXJlbnQgPSBbXTtcbiAgICB2YXIgcHJldmlvdXNQYXJlbnRzID0gW107XG4gICAgZnVuY3Rpb24gb25WYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50UGFyZW50KSkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXJyZW50UHJvcGVydHkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnRbY3VycmVudFByb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciB2aXNpdG9yID0ge1xuICAgICAgICBvbk9iamVjdEJlZ2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgICAgICBvblZhbHVlKG9iamVjdCk7XG4gICAgICAgICAgICBwcmV2aW91c1BhcmVudHMucHVzaChjdXJyZW50UGFyZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBvYmplY3Q7XG4gICAgICAgICAgICBjdXJyZW50UHJvcGVydHkgPSBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBvbk9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgY3VycmVudFByb3BlcnR5ID0gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PYmplY3RFbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBwcmV2aW91c1BhcmVudHMucG9wKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXJyYXlCZWdpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgICBvblZhbHVlKGFycmF5KTtcbiAgICAgICAgICAgIHByZXZpb3VzUGFyZW50cy5wdXNoKGN1cnJlbnRQYXJlbnQpO1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IGFycmF5O1xuICAgICAgICAgICAgY3VycmVudFByb3BlcnR5ID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcnJheUVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IHByZXZpb3VzUGFyZW50cy5wb3AoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25MaXRlcmFsVmFsdWU6IG9uVmFsdWUsXG4gICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHsgZXJyb3I6IGVycm9yLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiBsZW5ndGggfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZpc2l0KHRleHQsIHZpc2l0b3IsIG9wdGlvbnMpO1xuICAgIHJldHVybiBjdXJyZW50UGFyZW50WzBdO1xufVxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHRleHQgYW5kIHJldHVybnMgYSB0cmVlIHJlcHJlc2VudGF0aW9uIHRoZSBKU09OIGNvbnRlbnQuIE9uIGludmFsaWQgaW5wdXQsIHRoZSBwYXJzZXIgdHJpZXMgdG8gYmUgYXMgZmF1bHQgdG9sZXJhbnQgYXMgcG9zc2libGUsIGJ1dCBzdGlsbCByZXR1cm4gYSByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRyZWUodGV4dCwgZXJyb3JzLCBvcHRpb25zKSB7XG4gICAgaWYgKGVycm9ycyA9PT0gdm9pZCAwKSB7IGVycm9ycyA9IFtdOyB9XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gUGFyc2VPcHRpb25zLkRFRkFVTFQ7IH1cbiAgICB2YXIgY3VycmVudFBhcmVudCA9IHsgdHlwZTogJ2FycmF5Jywgb2Zmc2V0OiAtMSwgbGVuZ3RoOiAtMSwgY2hpbGRyZW46IFtdLCBwYXJlbnQ6IHZvaWQgMCB9OyAvLyBhcnRpZmljaWFsIHJvb3RcbiAgICBmdW5jdGlvbiBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKGVuZE9mZnNldCkge1xuICAgICAgICBpZiAoY3VycmVudFBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50Lmxlbmd0aCA9IGVuZE9mZnNldCAtIGN1cnJlbnRQYXJlbnQub2Zmc2V0O1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVmFsdWUodmFsdWVOb2RlKSB7XG4gICAgICAgIGN1cnJlbnRQYXJlbnQuY2hpbGRyZW4ucHVzaCh2YWx1ZU5vZGUpO1xuICAgICAgICByZXR1cm4gdmFsdWVOb2RlO1xuICAgIH1cbiAgICB2YXIgdmlzaXRvciA9IHtcbiAgICAgICAgb25PYmplY3RCZWdpbjogZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IG9uVmFsdWUoeyB0eXBlOiAnb2JqZWN0Jywgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogLTEsIHBhcmVudDogY3VycmVudFBhcmVudCwgY2hpbGRyZW46IFtdIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBvblZhbHVlKHsgdHlwZTogJ3Byb3BlcnR5Jywgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogLTEsIHBhcmVudDogY3VycmVudFBhcmVudCwgY2hpbGRyZW46IFtdIH0pO1xuICAgICAgICAgICAgY3VycmVudFBhcmVudC5jaGlsZHJlbi5wdXNoKHsgdHlwZTogJ3N0cmluZycsIHZhbHVlOiBuYW1lLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiBsZW5ndGgsIHBhcmVudDogY3VycmVudFBhcmVudCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PYmplY3RFbmQ6IGZ1bmN0aW9uIChvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudC5sZW5ndGggPSBvZmZzZXQgKyBsZW5ndGggLSBjdXJyZW50UGFyZW50Lm9mZnNldDtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcnJheUJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQgPSBvblZhbHVlKHsgdHlwZTogJ2FycmF5Jywgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogLTEsIHBhcmVudDogY3VycmVudFBhcmVudCwgY2hpbGRyZW46IFtdIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkFycmF5RW5kOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQubGVuZ3RoID0gb2Zmc2V0ICsgbGVuZ3RoIC0gY3VycmVudFBhcmVudC5vZmZzZXQ7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKG9mZnNldCArIGxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTGl0ZXJhbFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBvblZhbHVlKHsgdHlwZTogZ2V0TGl0ZXJhbE5vZGVUeXBlKHZhbHVlKSwgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogbGVuZ3RoLCBwYXJlbnQ6IGN1cnJlbnRQYXJlbnQsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXBhcmF0b3I6IGZ1bmN0aW9uIChzZXAsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlcCA9PT0gJzonKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQuY29sb25PZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlcCA9PT0gJywnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHsgZXJyb3I6IGVycm9yLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiBsZW5ndGggfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZpc2l0KHRleHQsIHZpc2l0b3IsIG9wdGlvbnMpO1xuICAgIHZhciByZXN1bHQgPSBjdXJyZW50UGFyZW50LmNoaWxkcmVuWzBdO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEZpbmRzIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBwYXRoIGluIGEgSlNPTiBET00uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZUF0TG9jYXRpb24ocm9vdCwgcGF0aCkge1xuICAgIGlmICghcm9vdCkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICB2YXIgbm9kZSA9IHJvb3Q7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBwYXRoXzEgPSBwYXRoOyBfaSA8IHBhdGhfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHNlZ21lbnQgPSBwYXRoXzFbX2ldO1xuICAgICAgICBpZiAodHlwZW9mIHNlZ21lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnb2JqZWN0JyB8fCAhQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgX2IgPSBub2RlLmNoaWxkcmVuOyBfYSA8IF9iLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5vZGUgPSBfYltfYV07XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydHlOb2RlLmNoaWxkcmVuKSAmJiBwcm9wZXJ0eU5vZGUuY2hpbGRyZW5bMF0udmFsdWUgPT09IHNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHByb3BlcnR5Tm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHNlZ21lbnQ7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnYXJyYXknIHx8IGluZGV4IDwgMCB8fCAhQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKSB8fCBpbmRleCA+PSBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG4vKipcbiAqIEdldHMgdGhlIEpTT04gcGF0aCBvZiB0aGUgZ2l2ZW4gSlNPTiBET00gbm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVBhdGgobm9kZSkge1xuICAgIGlmICghbm9kZS5wYXJlbnQgfHwgIW5vZGUucGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIHBhdGggPSBnZXROb2RlUGF0aChub2RlLnBhcmVudCk7XG4gICAgaWYgKG5vZGUucGFyZW50LnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgdmFyIGtleSA9IG5vZGUucGFyZW50LmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgICAgICBwYXRoLnB1c2goa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICB2YXIgaW5kZXggPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBwYXRoLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIEphdmFTY3JpcHQgb2JqZWN0IG9mIHRoZSBnaXZlbiBKU09OIERPTSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlVmFsdWUobm9kZSkge1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcChnZXROb2RlVmFsdWUpO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gbm9kZS5jaGlsZHJlbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVOb2RlID0gcHJvcC5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wLmNoaWxkcmVuWzBdLnZhbHVlXSA9IGdldE5vZGVWYWx1ZSh2YWx1ZU5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMobm9kZSwgb2Zmc2V0LCBpbmNsdWRlUmlnaHRCb3VuZCkge1xuICAgIGlmIChpbmNsdWRlUmlnaHRCb3VuZCA9PT0gdm9pZCAwKSB7IGluY2x1ZGVSaWdodEJvdW5kID0gZmFsc2U7IH1cbiAgICByZXR1cm4gKG9mZnNldCA+PSBub2RlLm9mZnNldCAmJiBvZmZzZXQgPCAobm9kZS5vZmZzZXQgKyBub2RlLmxlbmd0aCkpIHx8IGluY2x1ZGVSaWdodEJvdW5kICYmIChvZmZzZXQgPT09IChub2RlLm9mZnNldCArIG5vZGUubGVuZ3RoKSk7XG59XG4vKipcbiAqIEZpbmRzIHRoZSBtb3N0IGlubmVyIG5vZGUgYXQgdGhlIGdpdmVuIG9mZnNldC4gSWYgaW5jbHVkZVJpZ2h0Qm91bmQgaXMgc2V0LCBhbHNvIGZpbmRzIG5vZGVzIHRoYXQgZW5kIGF0IHRoZSBnaXZlbiBvZmZzZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZUF0T2Zmc2V0KG5vZGUsIG9mZnNldCwgaW5jbHVkZVJpZ2h0Qm91bmQpIHtcbiAgICBpZiAoaW5jbHVkZVJpZ2h0Qm91bmQgPT09IHZvaWQgMCkgeyBpbmNsdWRlUmlnaHRCb3VuZCA9IGZhbHNlOyB9XG4gICAgaWYgKGNvbnRhaW5zKG5vZGUsIG9mZnNldCwgaW5jbHVkZVJpZ2h0Qm91bmQpKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGggJiYgY2hpbGRyZW5baV0ub2Zmc2V0IDw9IG9mZnNldDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kTm9kZUF0T2Zmc2V0KGNoaWxkcmVuW2ldLCBvZmZzZXQsIGluY2x1ZGVSaWdodEJvdW5kKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG59XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW52b2tlcyB0aGUgdmlzaXRvciBmdW5jdGlvbnMgZm9yIGVhY2ggb2JqZWN0LCBhcnJheSBhbmQgbGl0ZXJhbCByZWFjaGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaXQodGV4dCwgdmlzaXRvciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IFBhcnNlT3B0aW9ucy5ERUZBVUxUOyB9XG4gICAgdmFyIF9zY2FubmVyID0gY3JlYXRlU2Nhbm5lcih0ZXh0LCBmYWxzZSk7XG4gICAgZnVuY3Rpb24gdG9Ob0FyZ1Zpc2l0KHZpc2l0RnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHZpc2l0RnVuY3Rpb24gPyBmdW5jdGlvbiAoKSB7IHJldHVybiB2aXNpdEZ1bmN0aW9uKF9zY2FubmVyLmdldFRva2VuT2Zmc2V0KCksIF9zY2FubmVyLmdldFRva2VuTGVuZ3RoKCkpOyB9IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9PbmVBcmdWaXNpdCh2aXNpdEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB2aXNpdEZ1bmN0aW9uID8gZnVuY3Rpb24gKGFyZykgeyByZXR1cm4gdmlzaXRGdW5jdGlvbihhcmcsIF9zY2FubmVyLmdldFRva2VuT2Zmc2V0KCksIF9zY2FubmVyLmdldFRva2VuTGVuZ3RoKCkpOyB9IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICB9XG4gICAgdmFyIG9uT2JqZWN0QmVnaW4gPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbk9iamVjdEJlZ2luKSwgb25PYmplY3RQcm9wZXJ0eSA9IHRvT25lQXJnVmlzaXQodmlzaXRvci5vbk9iamVjdFByb3BlcnR5KSwgb25PYmplY3RFbmQgPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbk9iamVjdEVuZCksIG9uQXJyYXlCZWdpbiA9IHRvTm9BcmdWaXNpdCh2aXNpdG9yLm9uQXJyYXlCZWdpbiksIG9uQXJyYXlFbmQgPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbkFycmF5RW5kKSwgb25MaXRlcmFsVmFsdWUgPSB0b09uZUFyZ1Zpc2l0KHZpc2l0b3Iub25MaXRlcmFsVmFsdWUpLCBvblNlcGFyYXRvciA9IHRvT25lQXJnVmlzaXQodmlzaXRvci5vblNlcGFyYXRvciksIG9uQ29tbWVudCA9IHRvTm9BcmdWaXNpdCh2aXNpdG9yLm9uQ29tbWVudCksIG9uRXJyb3IgPSB0b09uZUFyZ1Zpc2l0KHZpc2l0b3Iub25FcnJvcik7XG4gICAgdmFyIGRpc2FsbG93Q29tbWVudHMgPSBvcHRpb25zICYmIG9wdGlvbnMuZGlzYWxsb3dDb21tZW50cztcbiAgICB2YXIgYWxsb3dUcmFpbGluZ0NvbW1hID0gb3B0aW9ucyAmJiBvcHRpb25zLmFsbG93VHJhaWxpbmdDb21tYTtcbiAgICBmdW5jdGlvbiBzY2FuTmV4dCgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IF9zY2FubmVyLnNjYW4oKTtcbiAgICAgICAgICAgIHN3aXRjaCAoX3NjYW5uZXIuZ2V0VG9rZW5FcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIEludmFsaWRVbmljb2RlICovOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigxNCAvKiBJbnZhbGlkVW5pY29kZSAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBJbnZhbGlkRXNjYXBlQ2hhcmFjdGVyICovOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigxNSAvKiBJbnZhbGlkRXNjYXBlQ2hhcmFjdGVyICovKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFVuZXhwZWN0ZWRFbmRPZk51bWJlciAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTMgLyogVW5leHBlY3RlZEVuZE9mTnVtYmVyICovKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIFVuZXhwZWN0ZWRFbmRPZkNvbW1lbnQgKi86XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlzYWxsb3dDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2IC8qIEludmFsaWRDaGFyYWN0ZXIgKi86XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDE2IC8qIEludmFsaWRDaGFyYWN0ZXIgKi8pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWxsb3dDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTAgLyogSW52YWxpZENvbW1lbnRUb2tlbiAqLyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE2IC8qIFVua25vd24gKi86XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEgLyogSW52YWxpZFN5bWJvbCAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTUgLyogVHJpdmlhICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMTQgLyogTGluZUJyZWFrVHJpdmlhICovOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3IsIHNraXBVbnRpbEFmdGVyLCBza2lwVW50aWwpIHtcbiAgICAgICAgaWYgKHNraXBVbnRpbEFmdGVyID09PSB2b2lkIDApIHsgc2tpcFVudGlsQWZ0ZXIgPSBbXTsgfVxuICAgICAgICBpZiAoc2tpcFVudGlsID09PSB2b2lkIDApIHsgc2tpcFVudGlsID0gW107IH1cbiAgICAgICAgb25FcnJvcihlcnJvcik7XG4gICAgICAgIGlmIChza2lwVW50aWxBZnRlci5sZW5ndGggKyBza2lwVW50aWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gX3NjYW5uZXIuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbiAhPT0gMTcgLyogRU9GICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNraXBVbnRpbEFmdGVyLmluZGV4T2YodG9rZW4pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzY2FuTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2tpcFVudGlsLmluZGV4T2YodG9rZW4pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBzY2FuTmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlU3RyaW5nKGlzVmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gX3NjYW5uZXIuZ2V0VG9rZW5WYWx1ZSgpO1xuICAgICAgICBpZiAoaXNWYWx1ZSkge1xuICAgICAgICAgICAgb25MaXRlcmFsVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb25PYmplY3RQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2Nhbk5leHQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTGl0ZXJhbCgpIHtcbiAgICAgICAgc3dpdGNoIChfc2Nhbm5lci5nZXRUb2tlbigpKSB7XG4gICAgICAgICAgICBjYXNlIDExIC8qIE51bWVyaWNMaXRlcmFsICovOlxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKF9zY2FubmVyLmdldFRva2VuVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigyIC8qIEludmFsaWROdW1iZXJGb3JtYXQgKi8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDIgLyogSW52YWxpZE51bWJlckZvcm1hdCAqLyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uTGl0ZXJhbFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNyAvKiBOdWxsS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBvbkxpdGVyYWxWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOCAvKiBUcnVlS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBvbkxpdGVyYWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOSAvKiBGYWxzZUtleXdvcmQgKi86XG4gICAgICAgICAgICAgICAgb25MaXRlcmFsVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2Nhbk5leHQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUHJvcGVydHkoKSB7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxMCAvKiBTdHJpbmdMaXRlcmFsICovKSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcigzIC8qIFByb3BlcnR5TmFtZUV4cGVjdGVkICovLCBbXSwgWzIgLyogQ2xvc2VCcmFjZVRva2VuICovLCA1IC8qIENvbW1hVG9rZW4gKi9dKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZVN0cmluZyhmYWxzZSk7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSA2IC8qIENvbG9uVG9rZW4gKi8pIHtcbiAgICAgICAgICAgIG9uU2VwYXJhdG9yKCc6Jyk7XG4gICAgICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIGNvbG9uXG4gICAgICAgICAgICBpZiAoIXBhcnNlVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDQgLyogVmFsdWVFeHBlY3RlZCAqLywgW10sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcig1IC8qIENvbG9uRXhwZWN0ZWQgKi8sIFtdLCBbMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi8sIDUgLyogQ29tbWFUb2tlbiAqL10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZU9iamVjdCgpIHtcbiAgICAgICAgb25PYmplY3RCZWdpbigpO1xuICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIG9wZW4gYnJhY2VcbiAgICAgICAgdmFyIG5lZWRzQ29tbWEgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKF9zY2FubmVyLmdldFRva2VuKCkgIT09IDIgLyogQ2xvc2VCcmFjZVRva2VuICovICYmIF9zY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgaWYgKF9zY2FubmVyLmdldFRva2VuKCkgPT09IDUgLyogQ29tbWFUb2tlbiAqLykge1xuICAgICAgICAgICAgICAgIGlmICghbmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uU2VwYXJhdG9yKCcsJyk7XG4gICAgICAgICAgICAgICAgc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb21tYVxuICAgICAgICAgICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLyAmJiBhbGxvd1RyYWlsaW5nQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDYgLyogQ29tbWFFeHBlY3RlZCAqLywgW10sIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFyc2VQcm9wZXJ0eSgpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgWzIgLyogQ2xvc2VCcmFjZVRva2VuICovLCA1IC8qIENvbW1hVG9rZW4gKi9dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5lZWRzQ29tbWEgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG9uT2JqZWN0RW5kKCk7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLykge1xuICAgICAgICAgICAgaGFuZGxlRXJyb3IoNyAvKiBDbG9zZUJyYWNlRXhwZWN0ZWQgKi8sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqL10sIFtdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgY2xvc2UgYnJhY2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VBcnJheSgpIHtcbiAgICAgICAgb25BcnJheUJlZ2luKCk7XG4gICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgb3BlbiBicmFja2V0XG4gICAgICAgIHZhciBuZWVkc0NvbW1hID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovICYmIF9zY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgaWYgKF9zY2FubmVyLmdldFRva2VuKCkgPT09IDUgLyogQ29tbWFUb2tlbiAqLykge1xuICAgICAgICAgICAgICAgIGlmICghbmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uU2VwYXJhdG9yKCcsJyk7XG4gICAgICAgICAgICAgICAgc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb21tYVxuICAgICAgICAgICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovICYmIGFsbG93VHJhaWxpbmdDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZWVkc0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNiAvKiBDb21tYUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJzZVZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZWVkc0NvbW1hID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBvbkFycmF5RW5kKCk7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovKSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcig4IC8qIENsb3NlQnJhY2tldEV4cGVjdGVkICovLCBbNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqL10sIFtdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgY2xvc2UgYnJhY2tldFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVZhbHVlKCkge1xuICAgICAgICBzd2l0Y2ggKF9zY2FubmVyLmdldFRva2VuKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMyAvKiBPcGVuQnJhY2tldFRva2VuICovOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUFycmF5KCk7XG4gICAgICAgICAgICBjYXNlIDEgLyogT3BlbkJyYWNlVG9rZW4gKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0KCk7XG4gICAgICAgICAgICBjYXNlIDEwIC8qIFN0cmluZ0xpdGVyYWwgKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlU3RyaW5nKHRydWUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VMaXRlcmFsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2Nhbk5leHQoKTtcbiAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gMTcgLyogRU9GICovKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXBhcnNlVmFsdWUoKSkge1xuICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKF9zY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICBoYW5kbGVFcnJvcig5IC8qIEVuZE9mRmlsZUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogVGFrZXMgSlNPTiB3aXRoIEphdmFTY3JpcHQtc3R5bGUgY29tbWVudHMgYW5kIHJlbW92ZVxuICogdGhlbS4gT3B0aW9uYWxseSByZXBsYWNlcyBldmVyeSBub25lLW5ld2xpbmUgY2hhcmFjdGVyXG4gKiBvZiBjb21tZW50cyB3aXRoIGEgcmVwbGFjZUNoYXJhY3RlclxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaXBDb21tZW50cyh0ZXh0LCByZXBsYWNlQ2gpIHtcbiAgICB2YXIgX3NjYW5uZXIgPSBjcmVhdGVTY2FubmVyKHRleHQpLCBwYXJ0cyA9IFtdLCBraW5kLCBvZmZzZXQgPSAwLCBwb3M7XG4gICAgZG8ge1xuICAgICAgICBwb3MgPSBfc2Nhbm5lci5nZXRQb3NpdGlvbigpO1xuICAgICAgICBraW5kID0gX3NjYW5uZXIuc2NhbigpO1xuICAgICAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgICBjYXNlIDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgIGNhc2UgMTcgLyogRU9GICovOlxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IHBvcykge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHRleHQuc3Vic3RyaW5nKG9mZnNldCwgcG9zKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlQ2ggIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKF9zY2FubmVyLmdldFRva2VuVmFsdWUoKS5yZXBsYWNlKC9bXlxcclxcbl0vZywgcmVwbGFjZUNoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9mZnNldCA9IF9zY2FubmVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChraW5kICE9PSAxNyAvKiBFT0YgKi8pO1xuICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIGdldExpdGVyYWxOb2RlVHlwZSh2YWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gJ2Jvb2xlYW4nO1xuICAgICAgICBjYXNlICdudW1iZXInOiByZXR1cm4gJ251bWJlcic7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6IHJldHVybiAnc3RyaW5nJztcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuICdudWxsJztcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJzZXIuanMubWFwIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG4vKipcbiAqIENyZWF0ZXMgYSBKU09OIHNjYW5uZXIgb24gdGhlIGdpdmVuIHRleHQuXG4gKiBJZiBpZ25vcmVUcml2aWEgaXMgc2V0LCB3aGl0ZXNwYWNlcyBvciBjb21tZW50cyBhcmUgaWdub3JlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjYW5uZXIodGV4dCwgaWdub3JlVHJpdmlhKSB7XG4gICAgaWYgKGlnbm9yZVRyaXZpYSA9PT0gdm9pZCAwKSB7IGlnbm9yZVRyaXZpYSA9IGZhbHNlOyB9XG4gICAgdmFyIHBvcyA9IDAsIGxlbiA9IHRleHQubGVuZ3RoLCB2YWx1ZSA9ICcnLCB0b2tlbk9mZnNldCA9IDAsIHRva2VuID0gMTYgLyogVW5rbm93biAqLywgc2NhbkVycm9yID0gMCAvKiBOb25lICovO1xuICAgIGZ1bmN0aW9uIHNjYW5IZXhEaWdpdHMoY291bnQsIGV4YWN0KSB7XG4gICAgICAgIHZhciBkaWdpdHMgPSAwO1xuICAgICAgICB2YXIgdmFsdWUgPSAwO1xuICAgICAgICB3aGlsZSAoZGlnaXRzIDwgY291bnQgfHwgIWV4YWN0KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB0ZXh0LmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgICAgIGlmIChjaCA+PSA0OCAvKiBfMCAqLyAmJiBjaCA8PSA1NyAvKiBfOSAqLykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKiAxNiArIGNoIC0gNDggLyogXzAgKi87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA+PSA2NSAvKiBBICovICYmIGNoIDw9IDcwIC8qIEYgKi8pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICogMTYgKyBjaCAtIDY1IC8qIEEgKi8gKyAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID49IDk3IC8qIGEgKi8gJiYgY2ggPD0gMTAyIC8qIGYgKi8pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICogMTYgKyBjaCAtIDk3IC8qIGEgKi8gKyAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICBkaWdpdHMrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlnaXRzIDwgY291bnQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQb3NpdGlvbihuZXdQb3NpdGlvbikge1xuICAgICAgICBwb3MgPSBuZXdQb3NpdGlvbjtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgICAgdG9rZW5PZmZzZXQgPSAwO1xuICAgICAgICB0b2tlbiA9IDE2IC8qIFVua25vd24gKi87XG4gICAgICAgIHNjYW5FcnJvciA9IDAgLyogTm9uZSAqLztcbiAgICB9XG4gICAgZnVuY3Rpb24gc2Nhbk51bWJlcigpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gcG9zO1xuICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDQ4IC8qIF8wICovKSB7XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA8IHRleHQubGVuZ3RoICYmIHRleHQuY2hhckNvZGVBdChwb3MpID09PSA0NiAvKiBkb3QgKi8pIHtcbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgaWYgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDMgLyogVW5leHBlY3RlZEVuZE9mTnVtYmVyICovO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZW5kID0gcG9zO1xuICAgICAgICBpZiAocG9zIDwgdGV4dC5sZW5ndGggJiYgKHRleHQuY2hhckNvZGVBdChwb3MpID09PSA2OSAvKiBFICovIHx8IHRleHQuY2hhckNvZGVBdChwb3MpID09PSAxMDEgLyogZSAqLykpIHtcbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgaWYgKHBvcyA8IHRleHQubGVuZ3RoICYmIHRleHQuY2hhckNvZGVBdChwb3MpID09PSA0MyAvKiBwbHVzICovIHx8IHRleHQuY2hhckNvZGVBdChwb3MpID09PSA0NSAvKiBtaW51cyAqLykge1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA8IHRleHQubGVuZ3RoICYmIGlzRGlnaXQodGV4dC5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbmQgPSBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSAzIC8qIFVuZXhwZWN0ZWRFbmRPZk51bWJlciAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYW5TdHJpbmcoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJywgc3RhcnQgPSBwb3M7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAocG9zID49IGxlbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSAyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaCA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAzNCAvKiBkb3VibGVRdW90ZSAqLykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaCA9PT0gOTIgLyogYmFja3NsYXNoICovKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIGlmIChwb3MgPj0gbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2ggPSB0ZXh0LmNoYXJDb2RlQXQocG9zKyspO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNCAvKiBkb3VibGVRdW90ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5MiAvKiBiYWNrc2xhc2ggKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcXFwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDcgLyogc2xhc2ggKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJy8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTggLyogYiAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxiJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMiAvKiBmICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXGYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTEwIC8qIG4gKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTQgLyogciAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExNiAvKiB0ICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXHQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE3IC8qIHUgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hfMSA9IHNjYW5IZXhEaWdpdHMoNCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hfMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSA0IC8qIEludmFsaWRVbmljb2RlICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSA1IC8qIEludmFsaWRFc2NhcGVDaGFyYWN0ZXIgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoID49IDAgJiYgY2ggPD0gMHgxZikge1xuICAgICAgICAgICAgICAgIGlmIChpc0xpbmVCcmVhayhjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSAyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSA2IC8qIEludmFsaWRDaGFyYWN0ZXIgKi87XG4gICAgICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgZXJyb3IgYnV0IGNvbnRpbnVlIHdpdGggc3RyaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2Nhbk5leHQoKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgIHNjYW5FcnJvciA9IDAgLyogTm9uZSAqLztcbiAgICAgICAgdG9rZW5PZmZzZXQgPSBwb3M7XG4gICAgICAgIGlmIChwb3MgPj0gbGVuKSB7XG4gICAgICAgICAgICAvLyBhdCB0aGUgZW5kXG4gICAgICAgICAgICB0b2tlbk9mZnNldCA9IGxlbjtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE3IC8qIEVPRiAqLztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29kZSA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAvLyB0cml2aWE6IHdoaXRlc3BhY2VcbiAgICAgICAgaWYgKGlzV2hpdGVTcGFjZShjb2RlKSkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICAgICAgY29kZSA9IHRleHQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgfSB3aGlsZSAoaXNXaGl0ZVNwYWNlKGNvZGUpKTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE1IC8qIFRyaXZpYSAqLztcbiAgICAgICAgfVxuICAgICAgICAvLyB0cml2aWE6IG5ld2xpbmVzXG4gICAgICAgIGlmIChpc0xpbmVCcmVhayhjb2RlKSkge1xuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDEzIC8qIGNhcnJpYWdlUmV0dXJuICovICYmIHRleHQuY2hhckNvZGVBdChwb3MpID09PSAxMCAvKiBsaW5lRmVlZCAqLykge1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHZhbHVlICs9ICdcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTQgLyogTGluZUJyZWFrVHJpdmlhICovO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICAgICAgLy8gdG9rZW5zOiBbXXt9OixcbiAgICAgICAgICAgIGNhc2UgMTIzIC8qIG9wZW5CcmFjZSAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxIC8qIE9wZW5CcmFjZVRva2VuICovO1xuICAgICAgICAgICAgY2FzZSAxMjUgLyogY2xvc2VCcmFjZSAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLztcbiAgICAgICAgICAgIGNhc2UgOTEgLyogb3BlbkJyYWNrZXQgKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMyAvKiBPcGVuQnJhY2tldFRva2VuICovO1xuICAgICAgICAgICAgY2FzZSA5MyAvKiBjbG9zZUJyYWNrZXQgKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLztcbiAgICAgICAgICAgIGNhc2UgNTggLyogY29sb24gKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gNiAvKiBDb2xvblRva2VuICovO1xuICAgICAgICAgICAgY2FzZSA0NCAvKiBjb21tYSAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSA1IC8qIENvbW1hVG9rZW4gKi87XG4gICAgICAgICAgICAvLyBzdHJpbmdzXG4gICAgICAgICAgICBjYXNlIDM0IC8qIGRvdWJsZVF1b3RlICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc2NhblN0cmluZygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDEwIC8qIFN0cmluZ0xpdGVyYWwgKi87XG4gICAgICAgICAgICAvLyBjb21tZW50c1xuICAgICAgICAgICAgY2FzZSA0NyAvKiBzbGFzaCAqLzpcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBwb3MgLSAxO1xuICAgICAgICAgICAgICAgIC8vIFNpbmdsZS1saW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KHBvcyArIDEpID09PSA0NyAvKiBzbGFzaCAqLykge1xuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTGluZUJyZWFrKHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE11bHRpLWxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQocG9zICsgMSkgPT09IDQyIC8qIGFzdGVyaXNrICovKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2FmZUxlbmd0aCA9IGxlbiAtIDE7IC8vIEZvciBsb29rYWhlYWQuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50Q2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwb3MgPCBzYWZlTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSB0ZXh0LmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gNDIgLyogYXN0ZXJpc2sgKi8gJiYgdGV4dC5jaGFyQ29kZUF0KHBvcyArIDEpID09PSA0NyAvKiBzbGFzaCAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRDbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21tZW50Q2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGp1c3QgYSBzaW5nbGUgc2xhc2hcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE2IC8qIFVua25vd24gKi87XG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBjYXNlIDQ1IC8qIG1pbnVzICovOlxuICAgICAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gbGVuIHx8ICFpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvdW5kIGEgbWludXMsIGZvbGxvd2VkIGJ5IGEgbnVtYmVyIHNvXG4gICAgICAgICAgICAvLyB3ZSBmYWxsIHRocm91Z2ggdG8gcHJvY2VlZCB3aXRoIHNjYW5uaW5nXG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBjYXNlIDQ4IC8qIF8wICovOlxuICAgICAgICAgICAgY2FzZSA0OSAvKiBfMSAqLzpcbiAgICAgICAgICAgIGNhc2UgNTAgLyogXzIgKi86XG4gICAgICAgICAgICBjYXNlIDUxIC8qIF8zICovOlxuICAgICAgICAgICAgY2FzZSA1MiAvKiBfNCAqLzpcbiAgICAgICAgICAgIGNhc2UgNTMgLyogXzUgKi86XG4gICAgICAgICAgICBjYXNlIDU0IC8qIF82ICovOlxuICAgICAgICAgICAgY2FzZSA1NSAvKiBfNyAqLzpcbiAgICAgICAgICAgIGNhc2UgNTYgLyogXzggKi86XG4gICAgICAgICAgICBjYXNlIDU3IC8qIF85ICovOlxuICAgICAgICAgICAgICAgIHZhbHVlICs9IHNjYW5OdW1iZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLztcbiAgICAgICAgICAgIC8vIGxpdGVyYWxzIGFuZCB1bmtub3duIHN5bWJvbHNcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gaXMgYSBsaXRlcmFsPyBSZWFkIHRoZSBmdWxsIHdvcmQuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGxlbiAmJiBpc1Vua25vd25Db250ZW50Q2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbk9mZnNldCAhPT0gcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGV4dC5zdWJzdHJpbmcodG9rZW5PZmZzZXQsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtleXdvcmRzOiB0cnVlLCBmYWxzZSwgbnVsbFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0cnVlJzogcmV0dXJuIHRva2VuID0gOCAvKiBUcnVlS2V5d29yZCAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzogcmV0dXJuIHRva2VuID0gOSAvKiBGYWxzZUtleXdvcmQgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudWxsJzogcmV0dXJuIHRva2VuID0gNyAvKiBOdWxsS2V5d29yZCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzVW5rbm93bkNvbnRlbnRDaGFyYWN0ZXIoY29kZSkge1xuICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlKGNvZGUpIHx8IGlzTGluZUJyZWFrKGNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDEyNSAvKiBjbG9zZUJyYWNlICovOlxuICAgICAgICAgICAgY2FzZSA5MyAvKiBjbG9zZUJyYWNrZXQgKi86XG4gICAgICAgICAgICBjYXNlIDEyMyAvKiBvcGVuQnJhY2UgKi86XG4gICAgICAgICAgICBjYXNlIDkxIC8qIG9wZW5CcmFja2V0ICovOlxuICAgICAgICAgICAgY2FzZSAzNCAvKiBkb3VibGVRdW90ZSAqLzpcbiAgICAgICAgICAgIGNhc2UgNTggLyogY29sb24gKi86XG4gICAgICAgICAgICBjYXNlIDQ0IC8qIGNvbW1hICovOlxuICAgICAgICAgICAgY2FzZSA0NyAvKiBzbGFzaCAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYW5OZXh0Tm9uVHJpdmlhKCkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByZXN1bHQgPSBzY2FuTmV4dCgpO1xuICAgICAgICB9IHdoaWxlIChyZXN1bHQgPj0gMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi8gJiYgcmVzdWx0IDw9IDE1IC8qIFRyaXZpYSAqLyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFBvc2l0aW9uOiBzZXRQb3NpdGlvbixcbiAgICAgICAgZ2V0UG9zaXRpb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvczsgfSxcbiAgICAgICAgc2NhbjogaWdub3JlVHJpdmlhID8gc2Nhbk5leHROb25Ucml2aWEgOiBzY2FuTmV4dCxcbiAgICAgICAgZ2V0VG9rZW46IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRva2VuOyB9LFxuICAgICAgICBnZXRUb2tlblZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSxcbiAgICAgICAgZ2V0VG9rZW5PZmZzZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRva2VuT2Zmc2V0OyB9LFxuICAgICAgICBnZXRUb2tlbkxlbmd0aDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zIC0gdG9rZW5PZmZzZXQ7IH0sXG4gICAgICAgIGdldFRva2VuRXJyb3I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjYW5FcnJvcjsgfVxuICAgIH07XG59XG5mdW5jdGlvbiBpc1doaXRlU3BhY2UoY2gpIHtcbiAgICByZXR1cm4gY2ggPT09IDMyIC8qIHNwYWNlICovIHx8IGNoID09PSA5IC8qIHRhYiAqLyB8fCBjaCA9PT0gMTEgLyogdmVydGljYWxUYWIgKi8gfHwgY2ggPT09IDEyIC8qIGZvcm1GZWVkICovIHx8XG4gICAgICAgIGNoID09PSAxNjAgLyogbm9uQnJlYWtpbmdTcGFjZSAqLyB8fCBjaCA9PT0gNTc2MCAvKiBvZ2hhbSAqLyB8fCBjaCA+PSA4MTkyIC8qIGVuUXVhZCAqLyAmJiBjaCA8PSA4MjAzIC8qIHplcm9XaWR0aFNwYWNlICovIHx8XG4gICAgICAgIGNoID09PSA4MjM5IC8qIG5hcnJvd05vQnJlYWtTcGFjZSAqLyB8fCBjaCA9PT0gODI4NyAvKiBtYXRoZW1hdGljYWxTcGFjZSAqLyB8fCBjaCA9PT0gMTIyODggLyogaWRlb2dyYXBoaWNTcGFjZSAqLyB8fCBjaCA9PT0gNjUyNzkgLyogYnl0ZU9yZGVyTWFyayAqLztcbn1cbmZ1bmN0aW9uIGlzTGluZUJyZWFrKGNoKSB7XG4gICAgcmV0dXJuIGNoID09PSAxMCAvKiBsaW5lRmVlZCAqLyB8fCBjaCA9PT0gMTMgLyogY2FycmlhZ2VSZXR1cm4gKi8gfHwgY2ggPT09IDgyMzIgLyogbGluZVNlcGFyYXRvciAqLyB8fCBjaCA9PT0gODIzMyAvKiBwYXJhZ3JhcGhTZXBhcmF0b3IgKi87XG59XG5mdW5jdGlvbiBpc0RpZ2l0KGNoKSB7XG4gICAgcmV0dXJuIGNoID49IDQ4IC8qIF8wICovICYmIGNoIDw9IDU3IC8qIF85ICovO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Nhbm5lci5qcy5tYXAiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCAqIGFzIGZvcm1hdHRlciBmcm9tICcuL2ltcGwvZm9ybWF0LmpzJztcbmltcG9ydCAqIGFzIGVkaXQgZnJvbSAnLi9pbXBsL2VkaXQuanMnO1xuaW1wb3J0ICogYXMgc2Nhbm5lciBmcm9tICcuL2ltcGwvc2Nhbm5lci5qcyc7XG5pbXBvcnQgKiBhcyBwYXJzZXIgZnJvbSAnLi9pbXBsL3BhcnNlci5qcyc7XG4vKipcbiAqIENyZWF0ZXMgYSBKU09OIHNjYW5uZXIgb24gdGhlIGdpdmVuIHRleHQuXG4gKiBJZiBpZ25vcmVUcml2aWEgaXMgc2V0LCB3aGl0ZXNwYWNlcyBvciBjb21tZW50cyBhcmUgaWdub3JlZC5cbiAqL1xuZXhwb3J0IHZhciBjcmVhdGVTY2FubmVyID0gc2Nhbm5lci5jcmVhdGVTY2FubmVyO1xuLyoqXG4gKiBGb3IgYSBnaXZlbiBvZmZzZXQsIGV2YWx1YXRlIHRoZSBsb2NhdGlvbiBpbiB0aGUgSlNPTiBkb2N1bWVudC4gRWFjaCBzZWdtZW50IGluIHRoZSBsb2NhdGlvbiBwYXRoIGlzIGVpdGhlciBhIHByb3BlcnR5IG5hbWUgb3IgYW4gYXJyYXkgaW5kZXguXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TG9jYXRpb24gPSBwYXJzZXIuZ2V0TG9jYXRpb247XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgcmV0dXJucyB0aGUgb2JqZWN0IHRoZSBKU09OIGNvbnRlbnQgcmVwcmVzZW50cy4gT24gaW52YWxpZCBpbnB1dCwgdGhlIHBhcnNlciB0cmllcyB0byBiZSBhcyBmYXVsdCB0b2xlcmFudCBhcyBwb3NzaWJsZSwgYnV0IHN0aWxsIHJldHVybiBhIHJlc3VsdC5cbiAqIFRoZXJlZm9yZSBhbHdheXMgY2hlY2sgdGhlIGVycm9ycyBsaXN0IHRvIGZpbmQgb3V0IGlmIHRoZSBpbnB1dCB3YXMgdmFsaWQuXG4gKi9cbmV4cG9ydCB2YXIgcGFyc2UgPSBwYXJzZXIucGFyc2U7XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgcmV0dXJucyBhIHRyZWUgcmVwcmVzZW50YXRpb24gdGhlIEpTT04gY29udGVudC4gT24gaW52YWxpZCBpbnB1dCwgdGhlIHBhcnNlciB0cmllcyB0byBiZSBhcyBmYXVsdCB0b2xlcmFudCBhcyBwb3NzaWJsZSwgYnV0IHN0aWxsIHJldHVybiBhIHJlc3VsdC5cbiAqL1xuZXhwb3J0IHZhciBwYXJzZVRyZWUgPSBwYXJzZXIucGFyc2VUcmVlO1xuLyoqXG4gKiBGaW5kcyB0aGUgbm9kZSBhdCB0aGUgZ2l2ZW4gcGF0aCBpbiBhIEpTT04gRE9NLlxuICovXG5leHBvcnQgdmFyIGZpbmROb2RlQXRMb2NhdGlvbiA9IHBhcnNlci5maW5kTm9kZUF0TG9jYXRpb247XG4vKipcbiAqIEZpbmRzIHRoZSBtb3N0IGlubmVyIG5vZGUgYXQgdGhlIGdpdmVuIG9mZnNldC4gSWYgaW5jbHVkZVJpZ2h0Qm91bmQgaXMgc2V0LCBhbHNvIGZpbmRzIG5vZGVzIHRoYXQgZW5kIGF0IHRoZSBnaXZlbiBvZmZzZXQuXG4gKi9cbmV4cG9ydCB2YXIgZmluZE5vZGVBdE9mZnNldCA9IHBhcnNlci5maW5kTm9kZUF0T2Zmc2V0O1xuLyoqXG4gKiBHZXRzIHRoZSBKU09OIHBhdGggb2YgdGhlIGdpdmVuIEpTT04gRE9NIG5vZGVcbiAqL1xuZXhwb3J0IHZhciBnZXROb2RlUGF0aCA9IHBhcnNlci5nZXROb2RlUGF0aDtcbi8qKlxuICogRXZhbHVhdGVzIHRoZSBKYXZhU2NyaXB0IG9iamVjdCBvZiB0aGUgZ2l2ZW4gSlNPTiBET00gbm9kZVxuICovXG5leHBvcnQgdmFyIGdldE5vZGVWYWx1ZSA9IHBhcnNlci5nZXROb2RlVmFsdWU7XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW52b2tlcyB0aGUgdmlzaXRvciBmdW5jdGlvbnMgZm9yIGVhY2ggb2JqZWN0LCBhcnJheSBhbmQgbGl0ZXJhbCByZWFjaGVkLlxuICovXG5leHBvcnQgdmFyIHZpc2l0ID0gcGFyc2VyLnZpc2l0O1xuLyoqXG4gKiBUYWtlcyBKU09OIHdpdGggSmF2YVNjcmlwdC1zdHlsZSBjb21tZW50cyBhbmQgcmVtb3ZlXG4gKiB0aGVtLiBPcHRpb25hbGx5IHJlcGxhY2VzIGV2ZXJ5IG5vbmUtbmV3bGluZSBjaGFyYWN0ZXJcbiAqIG9mIGNvbW1lbnRzIHdpdGggYSByZXBsYWNlQ2hhcmFjdGVyXG4gKi9cbmV4cG9ydCB2YXIgc3RyaXBDb21tZW50cyA9IHBhcnNlci5zdHJpcENvbW1lbnRzO1xuZXhwb3J0IGZ1bmN0aW9uIHByaW50UGFyc2VFcnJvckNvZGUoY29kZSkge1xuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDEgLyogSW52YWxpZFN5bWJvbCAqLzogcmV0dXJuICdJbnZhbGlkU3ltYm9sJztcbiAgICAgICAgY2FzZSAyIC8qIEludmFsaWROdW1iZXJGb3JtYXQgKi86IHJldHVybiAnSW52YWxpZE51bWJlckZvcm1hdCc7XG4gICAgICAgIGNhc2UgMyAvKiBQcm9wZXJ0eU5hbWVFeHBlY3RlZCAqLzogcmV0dXJuICdQcm9wZXJ0eU5hbWVFeHBlY3RlZCc7XG4gICAgICAgIGNhc2UgNCAvKiBWYWx1ZUV4cGVjdGVkICovOiByZXR1cm4gJ1ZhbHVlRXhwZWN0ZWQnO1xuICAgICAgICBjYXNlIDUgLyogQ29sb25FeHBlY3RlZCAqLzogcmV0dXJuICdDb2xvbkV4cGVjdGVkJztcbiAgICAgICAgY2FzZSA2IC8qIENvbW1hRXhwZWN0ZWQgKi86IHJldHVybiAnQ29tbWFFeHBlY3RlZCc7XG4gICAgICAgIGNhc2UgNyAvKiBDbG9zZUJyYWNlRXhwZWN0ZWQgKi86IHJldHVybiAnQ2xvc2VCcmFjZUV4cGVjdGVkJztcbiAgICAgICAgY2FzZSA4IC8qIENsb3NlQnJhY2tldEV4cGVjdGVkICovOiByZXR1cm4gJ0Nsb3NlQnJhY2tldEV4cGVjdGVkJztcbiAgICAgICAgY2FzZSA5IC8qIEVuZE9mRmlsZUV4cGVjdGVkICovOiByZXR1cm4gJ0VuZE9mRmlsZUV4cGVjdGVkJztcbiAgICAgICAgY2FzZSAxMCAvKiBJbnZhbGlkQ29tbWVudFRva2VuICovOiByZXR1cm4gJ0ludmFsaWRDb21tZW50VG9rZW4nO1xuICAgICAgICBjYXNlIDExIC8qIFVuZXhwZWN0ZWRFbmRPZkNvbW1lbnQgKi86IHJldHVybiAnVW5leHBlY3RlZEVuZE9mQ29tbWVudCc7XG4gICAgICAgIGNhc2UgMTIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovOiByZXR1cm4gJ1VuZXhwZWN0ZWRFbmRPZlN0cmluZyc7XG4gICAgICAgIGNhc2UgMTMgLyogVW5leHBlY3RlZEVuZE9mTnVtYmVyICovOiByZXR1cm4gJ1VuZXhwZWN0ZWRFbmRPZk51bWJlcic7XG4gICAgICAgIGNhc2UgMTQgLyogSW52YWxpZFVuaWNvZGUgKi86IHJldHVybiAnSW52YWxpZFVuaWNvZGUnO1xuICAgICAgICBjYXNlIDE1IC8qIEludmFsaWRFc2NhcGVDaGFyYWN0ZXIgKi86IHJldHVybiAnSW52YWxpZEVzY2FwZUNoYXJhY3Rlcic7XG4gICAgICAgIGNhc2UgMTYgLyogSW52YWxpZENoYXJhY3RlciAqLzogcmV0dXJuICdJbnZhbGlkQ2hhcmFjdGVyJztcbiAgICB9XG4gICAgcmV0dXJuICc8dW5rbm93biBQYXJzZUVycm9yQ29kZT4nO1xufVxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZWRpdHMgbmVlZGVkIHRvIGZvcm1hdCBhIEpTT04gZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50VGV4dCBUaGUgaW5wdXQgdGV4dFxuICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0byBmb3JtYXQgb3IgYHVuZGVmaW5lZGAgdG8gZm9ybWF0IHRoZSBmdWxsIGNvbnRlbnRcbiAqIEBwYXJhbSBvcHRpb25zIFRoZSBmb3JtYXR0aW5nIG9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBlZGl0IG9wZXJhdGlvbnMgZGVzY3JpYmluZyB0aGUgZm9ybWF0dGluZyBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBkb2N1bWVudC4gRWRpdHMgY2FuIGJlIGVpdGhlciBpbnNlcnRzLCByZXBsYWNlbWVudHMgb3JcbiAqIHJlbW92YWxzIG9mIHRleHQgc2VnbWVudHMuIEFsbCBvZmZzZXRzIHJlZmVyIHRvIHRoZSBvcmlnaW5hbCBzdGF0ZSBvZiB0aGUgZG9jdW1lbnQuIE5vIHR3byBlZGl0cyBtdXN0IGNoYW5nZSBvciByZW1vdmUgdGhlIHNhbWUgcmFuZ2Ugb2ZcbiAqIHRleHQgaW4gdGhlIG9yaWdpbmFsIGRvY3VtZW50LiBIb3dldmVyLCBtdWx0aXBsZSBlZGl0cyBjYW4gaGF2ZVxuICogdGhlIHNhbWUgb2Zmc2V0LCBmb3IgZXhhbXBsZSBtdWx0aXBsZSBpbnNlcnRzLCBvciBhbiBpbnNlcnQgZm9sbG93ZWQgYnkgYSByZW1vdmUgb3IgcmVwbGFjZS4gVGhlIG9yZGVyIGluIHRoZSBhcnJheSBkZWZpbmVzIHdoaWNoIGVkaXQgaXMgYXBwbGllZCBmaXJzdC5cbiAqIFRvIGFwcGx5IGVkaXRzIHRvIGFuIGlucHV0LCB5b3UgY2FuIHVzZSBgYXBwbHlFZGl0c2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkb2N1bWVudFRleHQsIHJhbmdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXQoZG9jdW1lbnRUZXh0LCByYW5nZSwgb3B0aW9ucyk7XG59XG4vKipcbiAqIENvbXB1dGVzIHRoZSBlZGl0cyBuZWVkZWQgdG8gbW9kaWZ5IGEgdmFsdWUgaW4gdGhlIEpTT04gZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50VGV4dCBUaGUgaW5wdXQgdGV4dFxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggb2YgdGhlIHZhbHVlIHRvIGNoYW5nZS4gVGhlIHBhdGggcmVwcmVzZW50cyBlaXRoZXIgdG8gdGhlIGRvY3VtZW50IHJvb3QsIGEgcHJvcGVydHkgb3IgYW4gYXJyYXkgaXRlbS5cbiAqIElmIHRoZSBwYXRoIHBvaW50cyB0byBhbiBub24tZXhpc3RpbmcgcHJvcGVydHkgb3IgaXRlbSwgaXQgd2lsbCBiZSBjcmVhdGVkLlxuICogQHBhcmFtIHZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb3IgaXRlbS4gSWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCxcbiAqIHRoZSBwcm9wZXJ0eSBvciBpdGVtIHdpbGwgYmUgcmVtb3ZlZC5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBlZGl0IG9wZXJhdGlvbnMgZGVzY3JpYmluZyB0aGUgZm9ybWF0dGluZyBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBkb2N1bWVudC4gRWRpdHMgY2FuIGJlIGVpdGhlciBpbnNlcnRzLCByZXBsYWNlbWVudHMgb3JcbiAqIHJlbW92YWxzIG9mIHRleHQgc2VnbWVudHMuIEFsbCBvZmZzZXRzIHJlZmVyIHRvIHRoZSBvcmlnaW5hbCBzdGF0ZSBvZiB0aGUgZG9jdW1lbnQuIE5vIHR3byBlZGl0cyBtdXN0IGNoYW5nZSBvciByZW1vdmUgdGhlIHNhbWUgcmFuZ2Ugb2ZcbiAqIHRleHQgaW4gdGhlIG9yaWdpbmFsIGRvY3VtZW50LiBIb3dldmVyLCBtdWx0aXBsZSBlZGl0cyBjYW4gaGF2ZVxuICogdGhlIHNhbWUgb2Zmc2V0LCBmb3IgZXhhbXBsZSBtdWx0aXBsZSBpbnNlcnRzLCBvciBhbiBpbnNlcnQgZm9sbG93ZWQgYnkgYSByZW1vdmUgb3IgcmVwbGFjZS4gVGhlIG9yZGVyIGluIHRoZSBhcnJheSBkZWZpbmVzIHdoaWNoIGVkaXQgaXMgYXBwbGllZCBmaXJzdC5cbiAqIFRvIGFwcGx5IGVkaXRzIHRvIGFuIGlucHV0LCB5b3UgY2FuIHVzZSBgYXBwbHlFZGl0c2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZGlmeSh0ZXh0LCBwYXRoLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBlZGl0LnNldFByb3BlcnR5KHRleHQsIHBhdGgsIHZhbHVlLCBvcHRpb25zLmZvcm1hdHRpbmdPcHRpb25zLCBvcHRpb25zLmdldEluc2VydGlvbkluZGV4KTtcbn1cbi8qKlxuICogQXBwbGllcyBlZGl0cyB0byBhIGlucHV0IHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RWRpdHModGV4dCwgZWRpdHMpIHtcbiAgICBmb3IgKHZhciBpID0gZWRpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdGV4dCA9IGVkaXQuYXBwbHlFZGl0KHRleHQsIGVkaXRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG4vKipcclxuICogVGhlIFBvc2l0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbUG9zaXRpb25dKCNQb3NpdGlvbikgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFBvc2l0aW9uO1xyXG4oZnVuY3Rpb24gKFBvc2l0aW9uKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgUG9zaXRpb24gbGl0ZXJhbCBmcm9tIHRoZSBnaXZlbiBsaW5lIGFuZCBjaGFyYWN0ZXIuXHJcbiAgICAgKiBAcGFyYW0gbGluZSBUaGUgcG9zaXRpb24ncyBsaW5lLlxyXG4gICAgICogQHBhcmFtIGNoYXJhY3RlciBUaGUgcG9zaXRpb24ncyBjaGFyYWN0ZXIuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZShsaW5lLCBjaGFyYWN0ZXIpIHtcclxuICAgICAgICByZXR1cm4geyBsaW5lOiBsaW5lLCBjaGFyYWN0ZXI6IGNoYXJhY3RlciB9O1xyXG4gICAgfVxyXG4gICAgUG9zaXRpb24uY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJuYWwgY29uZm9ybXMgdG8gdGhlIFtQb3NpdGlvbl0oI1Bvc2l0aW9uKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS5saW5lKSAmJiBJcy5udW1iZXIoY2FuZGlkYXRlLmNoYXJhY3Rlcik7XHJcbiAgICB9XHJcbiAgICBQb3NpdGlvbi5pcyA9IGlzO1xyXG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogVGhlIFJhbmdlIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbUmFuZ2VdKCNSYW5nZSkgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFJhbmdlO1xyXG4oZnVuY3Rpb24gKFJhbmdlKSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGUob25lLCB0d28sIHRocmVlLCBmb3VyKSB7XHJcbiAgICAgICAgaWYgKElzLm51bWJlcihvbmUpICYmIElzLm51bWJlcih0d28pICYmIElzLm51bWJlcih0aHJlZSkgJiYgSXMubnVtYmVyKGZvdXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0OiBQb3NpdGlvbi5jcmVhdGUob25lLCB0d28pLCBlbmQ6IFBvc2l0aW9uLmNyZWF0ZSh0aHJlZSwgZm91cikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoUG9zaXRpb24uaXMob25lKSAmJiBQb3NpdGlvbi5pcyh0d28pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0OiBvbmUsIGVuZDogdHdvIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSYW5nZSNjcmVhdGUgY2FsbGVkIHdpdGggaW52YWxpZCBhcmd1bWVudHNbXCIgKyBvbmUgKyBcIiwgXCIgKyB0d28gKyBcIiwgXCIgKyB0aHJlZSArIFwiLCBcIiArIGZvdXIgKyBcIl1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUmFuZ2UuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW1JhbmdlXSgjUmFuZ2UpIGludGVyZmFjZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcclxuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBQb3NpdGlvbi5pcyhjYW5kaWRhdGUuc3RhcnQpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5lbmQpO1xyXG4gICAgfVxyXG4gICAgUmFuZ2UuaXMgPSBpcztcclxufSkoUmFuZ2UgfHwgKFJhbmdlID0ge30pKTtcclxuLyoqXHJcbiAqIFRoZSBMb2NhdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0xvY2F0aW9uXSgjTG9jYXRpb24pIGxpdGVyYWxzLlxyXG4gKi9cclxuZXhwb3J0IHZhciBMb2NhdGlvbjtcclxuKGZ1bmN0aW9uIChMb2NhdGlvbikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgTG9jYXRpb24gbGl0ZXJhbC5cclxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGxvY2F0aW9uJ3MgdXJpLlxyXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSBsb2NhdGlvbidzIHJhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCByYW5nZSkge1xyXG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCByYW5nZTogcmFuZ2UgfTtcclxuICAgIH1cclxuICAgIExvY2F0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtMb2NhdGlvbl0oI0xvY2F0aW9uKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUudXJpKSk7XHJcbiAgICB9XHJcbiAgICBMb2NhdGlvbi5pcyA9IGlzO1xyXG59KShMb2NhdGlvbiB8fCAoTG9jYXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogVGhlIExvY2F0aW9uTGluayBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0xvY2F0aW9uTGlua10oI0xvY2F0aW9uTGluaykgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIExvY2F0aW9uTGluaztcclxuKGZ1bmN0aW9uIChMb2NhdGlvbkxpbmspIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIExvY2F0aW9uTGluayBsaXRlcmFsLlxyXG4gICAgICogQHBhcmFtIHRhcmdldFVyaSBUaGUgZGVmaW5pdGlvbidzIHVyaS5cclxuICAgICAqIEBwYXJhbSB0YXJnZXRSYW5nZSBUaGUgZnVsbCByYW5nZSBvZiB0aGUgZGVmaW5pdGlvbi5cclxuICAgICAqIEBwYXJhbSB0YXJnZXRTZWxlY3Rpb25SYW5nZSBUaGUgc3BhbiBvZiB0aGUgc3ltYm9sIGRlZmluaXRpb24gYXQgdGhlIHRhcmdldC5cclxuICAgICAqIEBwYXJhbSBvcmlnaW5TZWxlY3Rpb25SYW5nZSBUaGUgc3BhbiBvZiB0aGUgc3ltYm9sIGJlaW5nIGRlZmluZWQgaW4gdGhlIG9yaWdpbmF0aW5nIHNvdXJjZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUodGFyZ2V0VXJpLCB0YXJnZXRSYW5nZSwgdGFyZ2V0U2VsZWN0aW9uUmFuZ2UsIG9yaWdpblNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdGFyZ2V0VXJpOiB0YXJnZXRVcmksIHRhcmdldFJhbmdlOiB0YXJnZXRSYW5nZSwgdGFyZ2V0U2VsZWN0aW9uUmFuZ2U6IHRhcmdldFNlbGVjdGlvblJhbmdlLCBvcmlnaW5TZWxlY3Rpb25SYW5nZTogb3JpZ2luU2VsZWN0aW9uUmFuZ2UgfTtcclxuICAgIH1cclxuICAgIExvY2F0aW9uTGluay5jcmVhdGUgPSBjcmVhdGU7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbTG9jYXRpb25MaW5rXSgjTG9jYXRpb25MaW5rKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnRhcmdldFJhbmdlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldFVyaSlcclxuICAgICAgICAgICAgJiYgKFJhbmdlLmlzKGNhbmRpZGF0ZS50YXJnZXRTZWxlY3Rpb25SYW5nZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS50YXJnZXRTZWxlY3Rpb25SYW5nZSkpXHJcbiAgICAgICAgICAgICYmIChSYW5nZS5pcyhjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpKTtcclxuICAgIH1cclxuICAgIExvY2F0aW9uTGluay5pcyA9IGlzO1xyXG59KShMb2NhdGlvbkxpbmsgfHwgKExvY2F0aW9uTGluayA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgQ29sb3IgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXHJcbiAqIFtDb2xvcl0oI0NvbG9yKSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgQ29sb3I7XHJcbihmdW5jdGlvbiAoQ29sb3IpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2xvciBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZWQ6IHJlZCxcclxuICAgICAgICAgICAgZ3JlZW46IGdyZWVuLFxyXG4gICAgICAgICAgICBibHVlOiBibHVlLFxyXG4gICAgICAgICAgICBhbHBoYTogYWxwaGEsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIENvbG9yLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtDb2xvcl0oI0NvbG9yKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5udW1iZXIoY2FuZGlkYXRlLnJlZClcclxuICAgICAgICAgICAgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS5ncmVlbilcclxuICAgICAgICAgICAgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS5ibHVlKVxyXG4gICAgICAgICAgICAmJiBJcy5udW1iZXIoY2FuZGlkYXRlLmFscGhhKTtcclxuICAgIH1cclxuICAgIENvbG9yLmlzID0gaXM7XHJcbn0pKENvbG9yIHx8IChDb2xvciA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgQ29sb3JJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0NvbG9ySW5mb3JtYXRpb25dKCNDb2xvckluZm9ybWF0aW9uKSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgQ29sb3JJbmZvcm1hdGlvbjtcclxuKGZ1bmN0aW9uIChDb2xvckluZm9ybWF0aW9uKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29sb3JJbmZvcm1hdGlvbiBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGNvbG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxyXG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIENvbG9ySW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0NvbG9ySW5mb3JtYXRpb25dKCNDb2xvckluZm9ybWF0aW9uKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIENvbG9yLmlzKGNhbmRpZGF0ZS5jb2xvcik7XHJcbiAgICB9XHJcbiAgICBDb2xvckluZm9ybWF0aW9uLmlzID0gaXM7XHJcbn0pKENvbG9ySW5mb3JtYXRpb24gfHwgKENvbG9ySW5mb3JtYXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogVGhlIENvbG9yIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbQ29sb3JQcmVzZW50YXRpb25dKCNDb2xvclByZXNlbnRhdGlvbikgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIENvbG9yUHJlc2VudGF0aW9uO1xyXG4oZnVuY3Rpb24gKENvbG9yUHJlc2VudGF0aW9uKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29sb3JJbmZvcm1hdGlvbiBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIHRleHRFZGl0LCBhZGRpdGlvbmFsVGV4dEVkaXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxyXG4gICAgICAgICAgICB0ZXh0RWRpdDogdGV4dEVkaXQsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxUZXh0RWRpdHM6IGFkZGl0aW9uYWxUZXh0RWRpdHMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIENvbG9yUHJlc2VudGF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtDb2xvckluZm9ybWF0aW9uXSgjQ29sb3JJbmZvcm1hdGlvbikgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYWJlbClcclxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGV4dEVkaXQpIHx8IFRleHRFZGl0LmlzKGNhbmRpZGF0ZSkpXHJcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmFkZGl0aW9uYWxUZXh0RWRpdHMpIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmFkZGl0aW9uYWxUZXh0RWRpdHMsIFRleHRFZGl0LmlzKSk7XHJcbiAgICB9XHJcbiAgICBDb2xvclByZXNlbnRhdGlvbi5pcyA9IGlzO1xyXG59KShDb2xvclByZXNlbnRhdGlvbiB8fCAoQ29sb3JQcmVzZW50YXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogRW51bSBvZiBrbm93biByYW5nZSBraW5kc1xyXG4gKi9cclxuZXhwb3J0IHZhciBGb2xkaW5nUmFuZ2VLaW5kO1xyXG4oZnVuY3Rpb24gKEZvbGRpbmdSYW5nZUtpbmQpIHtcclxuICAgIC8qKlxyXG4gICAgICogRm9sZGluZyByYW5nZSBmb3IgYSBjb21tZW50XHJcbiAgICAgKi9cclxuICAgIEZvbGRpbmdSYW5nZUtpbmRbXCJDb21tZW50XCJdID0gXCJjb21tZW50XCI7XHJcbiAgICAvKipcclxuICAgICAqIEZvbGRpbmcgcmFuZ2UgZm9yIGEgaW1wb3J0cyBvciBpbmNsdWRlc1xyXG4gICAgICovXHJcbiAgICBGb2xkaW5nUmFuZ2VLaW5kW1wiSW1wb3J0c1wiXSA9IFwiaW1wb3J0c1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBGb2xkaW5nIHJhbmdlIGZvciBhIHJlZ2lvbiAoZS5nLiBgI3JlZ2lvbmApXHJcbiAgICAgKi9cclxuICAgIEZvbGRpbmdSYW5nZUtpbmRbXCJSZWdpb25cIl0gPSBcInJlZ2lvblwiO1xyXG59KShGb2xkaW5nUmFuZ2VLaW5kIHx8IChGb2xkaW5nUmFuZ2VLaW5kID0ge30pKTtcclxuLyoqXHJcbiAqIFRoZSBmb2xkaW5nIHJhbmdlIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbRm9sZGluZ1JhbmdlXSgjRm9sZGluZ1JhbmdlKSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgRm9sZGluZ1JhbmdlO1xyXG4oZnVuY3Rpb24gKEZvbGRpbmdSYW5nZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEZvbGRpbmdSYW5nZSBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhcnRMaW5lLCBlbmRMaW5lLCBzdGFydENoYXJhY3RlciwgZW5kQ2hhcmFjdGVyLCBraW5kKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgc3RhcnRMaW5lOiBzdGFydExpbmUsXHJcbiAgICAgICAgICAgIGVuZExpbmU6IGVuZExpbmVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHN0YXJ0Q2hhcmFjdGVyKSkge1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnRDaGFyYWN0ZXIgPSBzdGFydENoYXJhY3RlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKElzLmRlZmluZWQoZW5kQ2hhcmFjdGVyKSkge1xyXG4gICAgICAgICAgICByZXN1bHQuZW5kQ2hhcmFjdGVyID0gZW5kQ2hhcmFjdGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoSXMuZGVmaW5lZChraW5kKSkge1xyXG4gICAgICAgICAgICByZXN1bHQua2luZCA9IGtpbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBGb2xkaW5nUmFuZ2UuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0ZvbGRpbmdSYW5nZV0oI0ZvbGRpbmdSYW5nZSkgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMubnVtYmVyKGNhbmRpZGF0ZS5zdGFydExpbmUpICYmIElzLm51bWJlcihjYW5kaWRhdGUuc3RhcnRMaW5lKVxyXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5zdGFydENoYXJhY3RlcikgfHwgSXMubnVtYmVyKGNhbmRpZGF0ZS5zdGFydENoYXJhY3RlcikpXHJcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmVuZENoYXJhY3RlcikgfHwgSXMubnVtYmVyKGNhbmRpZGF0ZS5lbmRDaGFyYWN0ZXIpKVxyXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5raW5kKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmtpbmQpKTtcclxuICAgIH1cclxuICAgIEZvbGRpbmdSYW5nZS5pcyA9IGlzO1xyXG59KShGb2xkaW5nUmFuZ2UgfHwgKEZvbGRpbmdSYW5nZSA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0RpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb25dKCNEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uKSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbjtcclxuKGZ1bmN0aW9uIChEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobG9jYXRpb24sIG1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbl0oI0RpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24pIGludGVyZmFjZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcclxuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBMb2NhdGlvbi5pcyhjYW5kaWRhdGUubG9jYXRpb24pICYmIElzLnN0cmluZyhjYW5kaWRhdGUubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uLmlzID0gaXM7XHJcbn0pKERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gfHwgKERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogVGhlIGRpYWdub3N0aWMncyBzZXZlcml0eS5cclxuICovXHJcbmV4cG9ydCB2YXIgRGlhZ25vc3RpY1NldmVyaXR5O1xyXG4oZnVuY3Rpb24gKERpYWdub3N0aWNTZXZlcml0eSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBvcnRzIGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuRXJyb3IgPSAxO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBvcnRzIGEgd2FybmluZy5cclxuICAgICAqL1xyXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5Lldhcm5pbmcgPSAyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBvcnRzIGFuIGluZm9ybWF0aW9uLlxyXG4gICAgICovXHJcbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuSW5mb3JtYXRpb24gPSAzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBvcnRzIGEgaGludC5cclxuICAgICAqL1xyXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5LkhpbnQgPSA0O1xyXG59KShEaWFnbm9zdGljU2V2ZXJpdHkgfHwgKERpYWdub3N0aWNTZXZlcml0eSA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgRGlhZ25vc3RpYyBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0RpYWdub3N0aWNdKCNEaWFnbm9zdGljKSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgRGlhZ25vc3RpYztcclxuKGZ1bmN0aW9uIChEaWFnbm9zdGljKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgRGlhZ25vc3RpYyBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCBzb3VyY2UsIHJlbGF0ZWRJbmZvcm1hdGlvbikge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7IHJhbmdlOiByYW5nZSwgbWVzc2FnZTogbWVzc2FnZSB9O1xyXG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHNldmVyaXR5KSkge1xyXG4gICAgICAgICAgICByZXN1bHQuc2V2ZXJpdHkgPSBzZXZlcml0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKElzLmRlZmluZWQoY29kZSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoSXMuZGVmaW5lZChzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHJlbGF0ZWRJbmZvcm1hdGlvbikpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnJlbGF0ZWRJbmZvcm1hdGlvbiA9IHJlbGF0ZWRJbmZvcm1hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIERpYWdub3N0aWMuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0RpYWdub3N0aWNdKCNEaWFnbm9zdGljKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSlcclxuICAgICAgICAgICAgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKVxyXG4gICAgICAgICAgICAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICYmIChJcy5udW1iZXIoY2FuZGlkYXRlLnNldmVyaXR5KSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnNldmVyaXR5KSlcclxuICAgICAgICAgICAgJiYgKElzLm51bWJlcihjYW5kaWRhdGUuY29kZSkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5jb2RlKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLmNvZGUpKVxyXG4gICAgICAgICAgICAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5zb3VyY2UpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUuc291cmNlKSlcclxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUucmVsYXRlZEluZm9ybWF0aW9uKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5yZWxhdGVkSW5mb3JtYXRpb24sIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24uaXMpKTtcclxuICAgIH1cclxuICAgIERpYWdub3N0aWMuaXMgPSBpcztcclxufSkoRGlhZ25vc3RpYyB8fCAoRGlhZ25vc3RpYyA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgQ29tbWFuZCBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0NvbW1hbmRdKCNDb21tYW5kKSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgQ29tbWFuZDtcclxuKGZ1bmN0aW9uIChDb21tYW5kKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29tbWFuZCBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUodGl0bGUsIGNvbW1hbmQpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSB7IHRpdGxlOiB0aXRsZSwgY29tbWFuZDogY29tbWFuZCB9O1xyXG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGFyZ3MpICYmIGFyZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXN1bHQuYXJndW1lbnRzID0gYXJncztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIENvbW1hbmQuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0NvbW1hbmRdKCNDb21tYW5kKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50aXRsZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5jb21tYW5kKTtcclxuICAgIH1cclxuICAgIENvbW1hbmQuaXMgPSBpcztcclxufSkoQ29tbWFuZCB8fCAoQ29tbWFuZCA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgVGV4dEVkaXQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgcmVwbGFjZSxcclxuICogaW5zZXJ0IGFuZCBkZWxldGUgZWRpdHMgbW9yZSBlYXNpbHkuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFRleHRFZGl0O1xyXG4oZnVuY3Rpb24gKFRleHRFZGl0KSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSByZXBsYWNlIHRleHQgZWRpdC5cclxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSByZXBsYWNlZC5cclxuICAgICAqIEBwYXJhbSBuZXdUZXh0IFRoZSBuZXcgdGV4dC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVwbGFjZShyYW5nZSwgbmV3VGV4dCkge1xyXG4gICAgICAgIHJldHVybiB7IHJhbmdlOiByYW5nZSwgbmV3VGV4dDogbmV3VGV4dCB9O1xyXG4gICAgfVxyXG4gICAgVGV4dEVkaXQucmVwbGFjZSA9IHJlcGxhY2U7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBpbnNlcnQgdGV4dCBlZGl0LlxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIHRleHQgYXQuXHJcbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgdGV4dCB0byBiZSBpbnNlcnRlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHsgc3RhcnQ6IHBvc2l0aW9uLCBlbmQ6IHBvc2l0aW9uIH0sIG5ld1RleHQ6IG5ld1RleHQgfTtcclxuICAgIH1cclxuICAgIFRleHRFZGl0Lmluc2VydCA9IGluc2VydDtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGRlbGV0ZSB0ZXh0IGVkaXQuXHJcbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRleHQgdG8gYmUgZGVsZXRlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGVsKHJhbmdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCBuZXdUZXh0OiAnJyB9O1xyXG4gICAgfVxyXG4gICAgVGV4dEVkaXQuZGVsID0gZGVsO1xyXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcclxuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKVxyXG4gICAgICAgICAgICAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1RleHQpXHJcbiAgICAgICAgICAgICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSk7XHJcbiAgICB9XHJcbiAgICBUZXh0RWRpdC5pcyA9IGlzO1xyXG59KShUZXh0RWRpdCB8fCAoVGV4dEVkaXQgPSB7fSkpO1xyXG4vKipcclxuICogVGhlIFRleHREb2N1bWVudEVkaXQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGVcclxuICogYW4gZWRpdCB0aGF0IG1hbmlwdWxhdGVzIGEgdGV4dCBkb2N1bWVudC5cclxuICovXHJcbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50RWRpdDtcclxuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRFZGl0KSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgYFRleHREb2N1bWVudEVkaXRgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0ZXh0RG9jdW1lbnQsIGVkaXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdGV4dERvY3VtZW50OiB0ZXh0RG9jdW1lbnQsIGVkaXRzOiBlZGl0cyB9O1xyXG4gICAgfVxyXG4gICAgVGV4dERvY3VtZW50RWRpdC5jcmVhdGUgPSBjcmVhdGU7XHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpXHJcbiAgICAgICAgICAgICYmIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMoY2FuZGlkYXRlLnRleHREb2N1bWVudClcclxuICAgICAgICAgICAgJiYgQXJyYXkuaXNBcnJheShjYW5kaWRhdGUuZWRpdHMpO1xyXG4gICAgfVxyXG4gICAgVGV4dERvY3VtZW50RWRpdC5pcyA9IGlzO1xyXG59KShUZXh0RG9jdW1lbnRFZGl0IHx8IChUZXh0RG9jdW1lbnRFZGl0ID0ge30pKTtcclxuZXhwb3J0IHZhciBDcmVhdGVGaWxlO1xyXG4oZnVuY3Rpb24gKENyZWF0ZUZpbGUpIHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICBraW5kOiAnY3JlYXRlJyxcclxuICAgICAgICAgICAgdXJpOiB1cmlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvcHRpb25zICE9PSB2b2lkIDAgJiYgKG9wdGlvbnMub3ZlcndyaXRlICE9PSB2b2lkIDAgfHwgb3B0aW9ucy5pZ25vcmVJZkV4aXN0cyAhPT0gdm9pZCAwKSkge1xyXG4gICAgICAgICAgICByZXN1bHQub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBDcmVhdGVGaWxlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLmtpbmQgPT09ICdjcmVhdGUnICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJlxyXG4gICAgICAgICAgICAoY2FuZGlkYXRlLm9wdGlvbnMgPT09IHZvaWQgMCB8fFxyXG4gICAgICAgICAgICAgICAgKChjYW5kaWRhdGUub3B0aW9ucy5vdmVyd3JpdGUgPT09IHZvaWQgMCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLm92ZXJ3cml0ZSkpICYmIChjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZkV4aXN0cyA9PT0gdm9pZCAwIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZFeGlzdHMpKSkpO1xyXG4gICAgfVxyXG4gICAgQ3JlYXRlRmlsZS5pcyA9IGlzO1xyXG59KShDcmVhdGVGaWxlIHx8IChDcmVhdGVGaWxlID0ge30pKTtcclxuZXhwb3J0IHZhciBSZW5hbWVGaWxlO1xyXG4oZnVuY3Rpb24gKFJlbmFtZUZpbGUpIHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZShvbGRVcmksIG5ld1VyaSwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgIGtpbmQ6ICdyZW5hbWUnLFxyXG4gICAgICAgICAgICBvbGRVcmk6IG9sZFVyaSxcclxuICAgICAgICAgICAgbmV3VXJpOiBuZXdVcmlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvcHRpb25zICE9PSB2b2lkIDAgJiYgKG9wdGlvbnMub3ZlcndyaXRlICE9PSB2b2lkIDAgfHwgb3B0aW9ucy5pZ25vcmVJZkV4aXN0cyAhPT0gdm9pZCAwKSkge1xyXG4gICAgICAgICAgICByZXN1bHQub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBSZW5hbWVGaWxlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLmtpbmQgPT09ICdyZW5hbWUnICYmIElzLnN0cmluZyhjYW5kaWRhdGUub2xkVXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1VyaSkgJiZcclxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5vcHRpb25zID09PSB2b2lkIDAgfHxcclxuICAgICAgICAgICAgICAgICgoY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlID09PSB2b2lkIDAgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5vdmVyd3JpdGUpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZFeGlzdHMgPT09IHZvaWQgMCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzKSkpKTtcclxuICAgIH1cclxuICAgIFJlbmFtZUZpbGUuaXMgPSBpcztcclxufSkoUmVuYW1lRmlsZSB8fCAoUmVuYW1lRmlsZSA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgRGVsZXRlRmlsZTtcclxuKGZ1bmN0aW9uIChEZWxldGVGaWxlKSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAga2luZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIHVyaTogdXJpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAob3B0aW9ucyAhPT0gdm9pZCAwICYmIChvcHRpb25zLnJlY3Vyc2l2ZSAhPT0gdm9pZCAwIHx8IG9wdGlvbnMuaWdub3JlSWZOb3RFeGlzdHMgIT09IHZvaWQgMCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgRGVsZXRlRmlsZS5jcmVhdGUgPSBjcmVhdGU7XHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAnZGVsZXRlJyAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiZcclxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5vcHRpb25zID09PSB2b2lkIDAgfHxcclxuICAgICAgICAgICAgICAgICgoY2FuZGlkYXRlLm9wdGlvbnMucmVjdXJzaXZlID09PSB2b2lkIDAgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5yZWN1cnNpdmUpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZOb3RFeGlzdHMgPT09IHZvaWQgMCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmTm90RXhpc3RzKSkpKTtcclxuICAgIH1cclxuICAgIERlbGV0ZUZpbGUuaXMgPSBpcztcclxufSkoRGVsZXRlRmlsZSB8fCAoRGVsZXRlRmlsZSA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgV29ya3NwYWNlRWRpdDtcclxuKGZ1bmN0aW9uIChXb3Jrc3BhY2VFZGl0KSB7XHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmXHJcbiAgICAgICAgICAgIChjYW5kaWRhdGUuY2hhbmdlcyAhPT0gdm9pZCAwIHx8IGNhbmRpZGF0ZS5kb2N1bWVudENoYW5nZXMgIT09IHZvaWQgMCkgJiZcclxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kb2N1bWVudENoYW5nZXMgPT09IHZvaWQgMCB8fCBjYW5kaWRhdGUuZG9jdW1lbnRDaGFuZ2VzLmV2ZXJ5KGZ1bmN0aW9uIChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChJcy5zdHJpbmcoY2hhbmdlLmtpbmQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENyZWF0ZUZpbGUuaXMoY2hhbmdlKSB8fCBSZW5hbWVGaWxlLmlzKGNoYW5nZSkgfHwgRGVsZXRlRmlsZS5pcyhjaGFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRleHREb2N1bWVudEVkaXQuaXMoY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgV29ya3NwYWNlRWRpdC5pcyA9IGlzO1xyXG59KShXb3Jrc3BhY2VFZGl0IHx8IChXb3Jrc3BhY2VFZGl0ID0ge30pKTtcclxudmFyIFRleHRFZGl0Q2hhbmdlSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cykge1xyXG4gICAgICAgIHRoaXMuZWRpdHMgPSBlZGl0cztcclxuICAgIH1cclxuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBuZXdUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5lZGl0cy5wdXNoKFRleHRFZGl0Lmluc2VydChwb3NpdGlvbiwgbmV3VGV4dCkpO1xyXG4gICAgfTtcclxuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChyYW5nZSwgbmV3VGV4dCkge1xyXG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChUZXh0RWRpdC5yZXBsYWNlKHJhbmdlLCBuZXdUZXh0KSk7XHJcbiAgICB9O1xyXG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAocmFuZ2UpIHtcclxuICAgICAgICB0aGlzLmVkaXRzLnB1c2goVGV4dEVkaXQuZGVsKHJhbmdlKSk7XHJcbiAgICB9O1xyXG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWRpdCkge1xyXG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChlZGl0KTtcclxuICAgIH07XHJcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0cztcclxuICAgIH07XHJcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZWRpdHMuc3BsaWNlKDAsIHRoaXMuZWRpdHMubGVuZ3RoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGV4dEVkaXRDaGFuZ2VJbXBsO1xyXG59KCkpO1xyXG4vKipcclxuICogQSB3b3Jrc3BhY2UgY2hhbmdlIGhlbHBzIGNvbnN0cnVjdGluZyBjaGFuZ2VzIHRvIGEgd29ya3NwYWNlLlxyXG4gKi9cclxudmFyIFdvcmtzcGFjZUNoYW5nZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdvcmtzcGFjZUNoYW5nZSh3b3Jrc3BhY2VFZGl0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgIGlmICh3b3Jrc3BhY2VFZGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQgPSB3b3Jrc3BhY2VFZGl0O1xyXG4gICAgICAgICAgICBpZiAod29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMpIHtcclxuICAgICAgICAgICAgICAgIHdvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUZXh0RG9jdW1lbnRFZGl0LmlzKGNoYW5nZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRFZGl0Q2hhbmdlID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChjaGFuZ2UuZWRpdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW2NoYW5nZS50ZXh0RG9jdW1lbnQudXJpXSA9IHRleHRFZGl0Q2hhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHdvcmtzcGFjZUVkaXQuY2hhbmdlcykge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMod29ya3NwYWNlRWRpdC5jaGFuZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dEVkaXRDaGFuZ2UgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKHdvcmtzcGFjZUVkaXQuY2hhbmdlc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW2tleV0gPSB0ZXh0RWRpdENoYW5nZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUsIFwiZWRpdFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyB0aGUgdW5kZXJseWluZyBbV29ya3NwYWNlRWRpdF0oI1dvcmtzcGFjZUVkaXQpIGxpdGVyYWxcclxuICAgICAgICAgKiB1c2UgdG8gYmUgcmV0dXJuZWQgZnJvbSBhIHdvcmtzcGFjZSBlZGl0IG9wZXJhdGlvbiBsaWtlIHJlbmFtZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtzcGFjZUVkaXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmdldFRleHRFZGl0Q2hhbmdlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzKGtleSkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl93b3Jrc3BhY2VFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Q2hhbmdlczogW11cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXb3Jrc3BhY2UgZWRpdCBpcyBub3QgY29uZmlndXJlZCBmb3IgZG9jdW1lbnQgY2hhbmdlcy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGV4dERvY3VtZW50ID0ga2V5O1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW3RleHREb2N1bWVudC51cmldO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVkaXRzID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dERvY3VtZW50RWRpdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0RG9jdW1lbnQ6IHRleHREb2N1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0czogZWRpdHNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5wdXNoKHRleHREb2N1bWVudEVkaXQpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXNbdGV4dERvY3VtZW50LnVyaV0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fd29ya3NwYWNlRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzOiBPYmplY3QuY3JlYXRlKG51bGwpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBub3JtYWwgdGV4dCBlZGl0IGNoYW5nZXMuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVkaXRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXNba2V5XSA9IGVkaXRzO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmNyZWF0ZUZpbGUgPSBmdW5jdGlvbiAodXJpLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja0RvY3VtZW50Q2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2goQ3JlYXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zKSk7XHJcbiAgICB9O1xyXG4gICAgV29ya3NwYWNlQ2hhbmdlLnByb3RvdHlwZS5yZW5hbWVGaWxlID0gZnVuY3Rpb24gKG9sZFVyaSwgbmV3VXJpLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja0RvY3VtZW50Q2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2goUmVuYW1lRmlsZS5jcmVhdGUob2xkVXJpLCBuZXdVcmksIG9wdGlvbnMpKTtcclxuICAgIH07XHJcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmRlbGV0ZUZpbGUgPSBmdW5jdGlvbiAodXJpLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja0RvY3VtZW50Q2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2goRGVsZXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zKSk7XHJcbiAgICB9O1xyXG4gICAgV29ya3NwYWNlQ2hhbmdlLnByb3RvdHlwZS5jaGVja0RvY3VtZW50Q2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3dvcmtzcGFjZUVkaXQgfHwgIXRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIGRvY3VtZW50IGNoYW5nZXMuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBXb3Jrc3BhY2VDaGFuZ2U7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFdvcmtzcGFjZUNoYW5nZSB9O1xyXG4vKipcclxuICogVGhlIFRleHREb2N1bWVudElkZW50aWZpZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXHJcbiAqIFtUZXh0RG9jdW1lbnRJZGVudGlmaWVyXSgjVGV4dERvY3VtZW50SWRlbnRpZmllcikgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFRleHREb2N1bWVudElkZW50aWZpZXI7XHJcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50SWRlbnRpZmllcikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFRleHREb2N1bWVudElkZW50aWZpZXIgbGl0ZXJhbC5cclxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdXJpOiB1cmkgfTtcclxuICAgIH1cclxuICAgIFRleHREb2N1bWVudElkZW50aWZpZXIuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW1RleHREb2N1bWVudElkZW50aWZpZXJdKCNUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpO1xyXG4gICAgfVxyXG4gICAgVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xyXG59KShUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChUZXh0RG9jdW1lbnRJZGVudGlmaWVyID0ge30pKTtcclxuLyoqXHJcbiAqIFRoZSBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcl0oI1ZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIGxpdGVyYWxzLlxyXG4gKi9cclxuZXhwb3J0IHZhciBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xyXG4oZnVuY3Rpb24gKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIGxpdGVyYWwuXHJcbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cclxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdGV4dC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgdmVyc2lvbikge1xyXG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCB2ZXJzaW9uOiB2ZXJzaW9uIH07XHJcbiAgICB9XHJcbiAgICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyXSgjVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcikgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiAoY2FuZGlkYXRlLnZlcnNpb24gPT09IG51bGwgfHwgSXMubnVtYmVyKGNhbmRpZGF0ZS52ZXJzaW9uKSk7XHJcbiAgICB9XHJcbiAgICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzID0gaXM7XHJcbn0pKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgfHwgKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xyXG4vKipcclxuICogVGhlIFRleHREb2N1bWVudEl0ZW0gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXHJcbiAqIFtUZXh0RG9jdW1lbnRJdGVtXSgjVGV4dERvY3VtZW50SXRlbSkgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFRleHREb2N1bWVudEl0ZW07XHJcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50SXRlbSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFRleHREb2N1bWVudEl0ZW0gbGl0ZXJhbC5cclxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlSWQgVGhlIGRvY3VtZW50J3MgbGFuZ3VhZ2UgaWRlbnRpZmllci5cclxuICAgICAqIEBwYXJhbSB2ZXJzaW9uIFRoZSBkb2N1bWVudCdzIHZlcnNpb24gbnVtYmVyLlxyXG4gICAgICogQHBhcmFtIHRleHQgVGhlIGRvY3VtZW50J3MgdGV4dC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgdGV4dCkge1xyXG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCBsYW5ndWFnZUlkOiBsYW5ndWFnZUlkLCB2ZXJzaW9uOiB2ZXJzaW9uLCB0ZXh0OiB0ZXh0IH07XHJcbiAgICB9XHJcbiAgICBUZXh0RG9jdW1lbnRJdGVtLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtUZXh0RG9jdW1lbnRJdGVtXSgjVGV4dERvY3VtZW50SXRlbSkgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlSWQpICYmIElzLm51bWJlcihjYW5kaWRhdGUudmVyc2lvbikgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50ZXh0KTtcclxuICAgIH1cclxuICAgIFRleHREb2N1bWVudEl0ZW0uaXMgPSBpcztcclxufSkoVGV4dERvY3VtZW50SXRlbSB8fCAoVGV4dERvY3VtZW50SXRlbSA9IHt9KSk7XHJcbi8qKlxyXG4gKiBEZXNjcmliZXMgdGhlIGNvbnRlbnQgdHlwZSB0aGF0IGEgY2xpZW50IHN1cHBvcnRzIGluIHZhcmlvdXNcclxuICogcmVzdWx0IGxpdGVyYWxzIGxpa2UgYEhvdmVyYCwgYFBhcmFtZXRlckluZm9gIG9yIGBDb21wbGV0aW9uSXRlbWAuXHJcbiAqXHJcbiAqIFBsZWFzZSBub3RlIHRoYXQgYE1hcmt1cEtpbmRzYCBtdXN0IG5vdCBzdGFydCB3aXRoIGEgYCRgLiBUaGlzIGtpbmRzXHJcbiAqIGFyZSByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNhZ2UuXHJcbiAqL1xyXG5leHBvcnQgdmFyIE1hcmt1cEtpbmQ7XHJcbihmdW5jdGlvbiAoTWFya3VwS2luZCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQbGFpbiB0ZXh0IGlzIHN1cHBvcnRlZCBhcyBhIGNvbnRlbnQgZm9ybWF0XHJcbiAgICAgKi9cclxuICAgIE1hcmt1cEtpbmQuUGxhaW5UZXh0ID0gJ3BsYWludGV4dCc7XHJcbiAgICAvKipcclxuICAgICAqIE1hcmtkb3duIGlzIHN1cHBvcnRlZCBhcyBhIGNvbnRlbnQgZm9ybWF0XHJcbiAgICAgKi9cclxuICAgIE1hcmt1cEtpbmQuTWFya2Rvd24gPSAnbWFya2Rvd24nO1xyXG59KShNYXJrdXBLaW5kIHx8IChNYXJrdXBLaW5kID0ge30pKTtcclxuKGZ1bmN0aW9uIChNYXJrdXBLaW5kKSB7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHZhbHVlIG9mIHRoZSBbTWFya3VwS2luZF0oI01hcmt1cEtpbmQpIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgPT09IE1hcmt1cEtpbmQuUGxhaW5UZXh0IHx8IGNhbmRpZGF0ZSA9PT0gTWFya3VwS2luZC5NYXJrZG93bjtcclxuICAgIH1cclxuICAgIE1hcmt1cEtpbmQuaXMgPSBpcztcclxufSkoTWFya3VwS2luZCB8fCAoTWFya3VwS2luZCA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgTWFya3VwQ29udGVudDtcclxuKGZ1bmN0aW9uIChNYXJrdXBDb250ZW50KSB7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBjb25mb3JtcyB0byB0aGUgW01hcmt1cENvbnRlbnRdKCNNYXJrdXBDb250ZW50KSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKHZhbHVlKSAmJiBNYXJrdXBLaW5kLmlzKGNhbmRpZGF0ZS5raW5kKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnZhbHVlKTtcclxuICAgIH1cclxuICAgIE1hcmt1cENvbnRlbnQuaXMgPSBpcztcclxufSkoTWFya3VwQ29udGVudCB8fCAoTWFya3VwQ29udGVudCA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUga2luZCBvZiBhIGNvbXBsZXRpb24gZW50cnkuXHJcbiAqL1xyXG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtS2luZDtcclxuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbUtpbmQpIHtcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5UZXh0ID0gMTtcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5NZXRob2QgPSAyO1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uID0gMztcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5Db25zdHJ1Y3RvciA9IDQ7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRmllbGQgPSA1O1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlZhcmlhYmxlID0gNjtcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5DbGFzcyA9IDc7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuSW50ZXJmYWNlID0gODtcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGUgPSA5O1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlByb3BlcnR5ID0gMTA7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVW5pdCA9IDExO1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlID0gMTI7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRW51bSA9IDEzO1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQgPSAxNDtcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0ID0gMTU7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ29sb3IgPSAxNjtcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5GaWxlID0gMTc7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuUmVmZXJlbmNlID0gMTg7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRm9sZGVyID0gMTk7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRW51bU1lbWJlciA9IDIwO1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0YW50ID0gMjE7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuU3RydWN0ID0gMjI7XHJcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRXZlbnQgPSAyMztcclxuICAgIENvbXBsZXRpb25JdGVtS2luZC5PcGVyYXRvciA9IDI0O1xyXG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlR5cGVQYXJhbWV0ZXIgPSAyNTtcclxufSkoQ29tcGxldGlvbkl0ZW1LaW5kIHx8IChDb21wbGV0aW9uSXRlbUtpbmQgPSB7fSkpO1xyXG4vKipcclxuICogRGVmaW5lcyB3aGV0aGVyIHRoZSBpbnNlcnQgdGV4dCBpbiBhIGNvbXBsZXRpb24gaXRlbSBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXNcclxuICogcGxhaW4gdGV4dCBvciBhIHNuaXBwZXQuXHJcbiAqL1xyXG5leHBvcnQgdmFyIEluc2VydFRleHRGb3JtYXQ7XHJcbihmdW5jdGlvbiAoSW5zZXJ0VGV4dEZvcm1hdCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcHJpbWFyeSB0ZXh0IHRvIGJlIGluc2VydGVkIGlzIHRyZWF0ZWQgYXMgYSBwbGFpbiBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIEluc2VydFRleHRGb3JtYXQuUGxhaW5UZXh0ID0gMTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHByaW1hcnkgdGV4dCB0byBiZSBpbnNlcnRlZCBpcyB0cmVhdGVkIGFzIGEgc25pcHBldC5cclxuICAgICAqXHJcbiAgICAgKiBBIHNuaXBwZXQgY2FuIGRlZmluZSB0YWIgc3RvcHMgYW5kIHBsYWNlaG9sZGVycyB3aXRoIGAkMWAsIGAkMmBcclxuICAgICAqIGFuZCBgJHszOmZvb31gLiBgJDBgIGRlZmluZXMgdGhlIGZpbmFsIHRhYiBzdG9wLCBpdCBkZWZhdWx0cyB0b1xyXG4gICAgICogdGhlIGVuZCBvZiB0aGUgc25pcHBldC4gUGxhY2Vob2xkZXJzIHdpdGggZXF1YWwgaWRlbnRpZmllcnMgYXJlIGxpbmtlZCxcclxuICAgICAqIHRoYXQgaXMgdHlwaW5nIGluIG9uZSB3aWxsIHVwZGF0ZSBvdGhlcnMgdG9vLlxyXG4gICAgICpcclxuICAgICAqIFNlZSBhbHNvOiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L3ZzY29kZS9ibG9iL21hc3Rlci9zcmMvdnMvZWRpdG9yL2NvbnRyaWIvc25pcHBldC9jb21tb24vc25pcHBldC5tZFxyXG4gICAgICovXHJcbiAgICBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQgPSAyO1xyXG59KShJbnNlcnRUZXh0Rm9ybWF0IHx8IChJbnNlcnRUZXh0Rm9ybWF0ID0ge30pKTtcclxuLyoqXHJcbiAqIFRoZSBDb21wbGV0aW9uSXRlbSBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aFxyXG4gKiBjb21wbGV0aW9uIGl0ZW1zLlxyXG4gKi9cclxuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbTtcclxuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjb21wbGV0aW9uIGl0ZW0gYW5kIHNlZWQgaXQgd2l0aCBhIGxhYmVsLlxyXG4gICAgICogQHBhcmFtIGxhYmVsIFRoZSBjb21wbGV0aW9uIGl0ZW0ncyBsYWJlbFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwpIHtcclxuICAgICAgICByZXR1cm4geyBsYWJlbDogbGFiZWwgfTtcclxuICAgIH1cclxuICAgIENvbXBsZXRpb25JdGVtLmNyZWF0ZSA9IGNyZWF0ZTtcclxufSkoQ29tcGxldGlvbkl0ZW0gfHwgKENvbXBsZXRpb25JdGVtID0ge30pKTtcclxuLyoqXHJcbiAqIFRoZSBDb21wbGV0aW9uTGlzdCBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aFxyXG4gKiBjb21wbGV0aW9uIGxpc3RzLlxyXG4gKi9cclxuZXhwb3J0IHZhciBDb21wbGV0aW9uTGlzdDtcclxuKGZ1bmN0aW9uIChDb21wbGV0aW9uTGlzdCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGNvbXBsZXRpb24gbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaXRlbXMgVGhlIGNvbXBsZXRpb24gaXRlbXMuXHJcbiAgICAgKiBAcGFyYW0gaXNJbmNvbXBsZXRlIFRoZSBsaXN0IGlzIG5vdCBjb21wbGV0ZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlKGl0ZW1zLCBpc0luY29tcGxldGUpIHtcclxuICAgICAgICByZXR1cm4geyBpdGVtczogaXRlbXMgPyBpdGVtcyA6IFtdLCBpc0luY29tcGxldGU6ICEhaXNJbmNvbXBsZXRlIH07XHJcbiAgICB9XHJcbiAgICBDb21wbGV0aW9uTGlzdC5jcmVhdGUgPSBjcmVhdGU7XHJcbn0pKENvbXBsZXRpb25MaXN0IHx8IChDb21wbGV0aW9uTGlzdCA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgTWFya2VkU3RyaW5nO1xyXG4oZnVuY3Rpb24gKE1hcmtlZFN0cmluZykge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFya2VkIHN0cmluZyBmcm9tIHBsYWluIHRleHQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBsYWluVGV4dCBUaGUgcGxhaW4gdGV4dC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZnJvbVBsYWluVGV4dChwbGFpblRleHQpIHtcclxuICAgICAgICByZXR1cm4gcGxhaW5UZXh0LnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCBcIlxcXFwkJlwiKTsgLy8gZXNjYXBlIG1hcmtkb3duIHN5bnRheCB0b2tlbnM6IGh0dHA6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvcHJvamVjdHMvbWFya2Rvd24vc3ludGF4I2JhY2tzbGFzaFxyXG4gICAgfVxyXG4gICAgTWFya2VkU3RyaW5nLmZyb21QbGFpblRleHQgPSBmcm9tUGxhaW5UZXh0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIFtNYXJrZWRTdHJpbmddKCNNYXJrZWRTdHJpbmcpIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5zdHJpbmcoY2FuZGlkYXRlKSB8fCAoSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2UpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudmFsdWUpKTtcclxuICAgIH1cclxuICAgIE1hcmtlZFN0cmluZy5pcyA9IGlzO1xyXG59KShNYXJrZWRTdHJpbmcgfHwgKE1hcmtlZFN0cmluZyA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgSG92ZXI7XHJcbihmdW5jdGlvbiAoSG92ZXIpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGNvbmZvcm1zIHRvIHRoZSBbSG92ZXJdKCNIb3ZlcikgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gISFjYW5kaWRhdGUgJiYgSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIChNYXJrdXBDb250ZW50LmlzKGNhbmRpZGF0ZS5jb250ZW50cykgfHxcclxuICAgICAgICAgICAgTWFya2VkU3RyaW5nLmlzKGNhbmRpZGF0ZS5jb250ZW50cykgfHxcclxuICAgICAgICAgICAgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuY29udGVudHMsIE1hcmtlZFN0cmluZy5pcykpICYmICh2YWx1ZS5yYW5nZSA9PT0gdm9pZCAwIHx8IFJhbmdlLmlzKHZhbHVlLnJhbmdlKSk7XHJcbiAgICB9XHJcbiAgICBIb3Zlci5pcyA9IGlzO1xyXG59KShIb3ZlciB8fCAoSG92ZXIgPSB7fSkpO1xyXG4vKipcclxuICogVGhlIFBhcmFtZXRlckluZm9ybWF0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbUGFyYW1ldGVySW5mb3JtYXRpb25dKCNQYXJhbWV0ZXJJbmZvcm1hdGlvbikgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFBhcmFtZXRlckluZm9ybWF0aW9uO1xyXG4oZnVuY3Rpb24gKFBhcmFtZXRlckluZm9ybWF0aW9uKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgcGFyYW1ldGVyIGluZm9ybWF0aW9uIGxpdGVyYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhYmVsIEEgbGFiZWwgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIGRvY3VtZW50YXRpb24gQSBkb2Mgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIGRvY3VtZW50YXRpb24pIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnRhdGlvbiA/IHsgbGFiZWw6IGxhYmVsLCBkb2N1bWVudGF0aW9uOiBkb2N1bWVudGF0aW9uIH0gOiB7IGxhYmVsOiBsYWJlbCB9O1xyXG4gICAgfVxyXG4gICAgUGFyYW1ldGVySW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgO1xyXG59KShQYXJhbWV0ZXJJbmZvcm1hdGlvbiB8fCAoUGFyYW1ldGVySW5mb3JtYXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogVGhlIFNpZ25hdHVyZUluZm9ybWF0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbU2lnbmF0dXJlSW5mb3JtYXRpb25dKCNTaWduYXR1cmVJbmZvcm1hdGlvbikgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFNpZ25hdHVyZUluZm9ybWF0aW9uO1xyXG4oZnVuY3Rpb24gKFNpZ25hdHVyZUluZm9ybWF0aW9uKSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIGRvY3VtZW50YXRpb24pIHtcclxuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnNbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSB7IGxhYmVsOiBsYWJlbCB9O1xyXG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGRvY3VtZW50YXRpb24pKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5kb2N1bWVudGF0aW9uID0gZG9jdW1lbnRhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKElzLmRlZmluZWQocGFyYW1ldGVycykpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIFNpZ25hdHVyZUluZm9ybWF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcclxufSkoU2lnbmF0dXJlSW5mb3JtYXRpb24gfHwgKFNpZ25hdHVyZUluZm9ybWF0aW9uID0ge30pKTtcclxuLyoqXHJcbiAqIEEgZG9jdW1lbnQgaGlnaGxpZ2h0IGtpbmQuXHJcbiAqL1xyXG5leHBvcnQgdmFyIERvY3VtZW50SGlnaGxpZ2h0S2luZDtcclxuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodEtpbmQpIHtcclxuICAgIC8qKlxyXG4gICAgICogQSB0ZXh0dWFsIG9jY3VycmVuY2UuXHJcbiAgICAgKi9cclxuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZC5UZXh0ID0gMTtcclxuICAgIC8qKlxyXG4gICAgICogUmVhZC1hY2Nlc3Mgb2YgYSBzeW1ib2wsIGxpa2UgcmVhZGluZyBhIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmQuUmVhZCA9IDI7XHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlLWFjY2VzcyBvZiBhIHN5bWJvbCwgbGlrZSB3cml0aW5nIHRvIGEgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZC5Xcml0ZSA9IDM7XHJcbn0pKERvY3VtZW50SGlnaGxpZ2h0S2luZCB8fCAoRG9jdW1lbnRIaWdobGlnaHRLaW5kID0ge30pKTtcclxuLyoqXHJcbiAqIERvY3VtZW50SGlnaGxpZ2h0IG5hbWVzcGFjZSB0byBwcm92aWRlIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXHJcbiAqIFtEb2N1bWVudEhpZ2hsaWdodF0oI0RvY3VtZW50SGlnaGxpZ2h0KSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgRG9jdW1lbnRIaWdobGlnaHQ7XHJcbihmdW5jdGlvbiAoRG9jdW1lbnRIaWdobGlnaHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgRG9jdW1lbnRIaWdobGlnaHQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0aGUgaGlnaGxpZ2h0IGFwcGxpZXMgdG8uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwga2luZCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7IHJhbmdlOiByYW5nZSB9O1xyXG4gICAgICAgIGlmIChJcy5udW1iZXIoa2luZCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgRG9jdW1lbnRIaWdobGlnaHQuY3JlYXRlID0gY3JlYXRlO1xyXG59KShEb2N1bWVudEhpZ2hsaWdodCB8fCAoRG9jdW1lbnRIaWdobGlnaHQgPSB7fSkpO1xyXG4vKipcclxuICogQSBzeW1ib2wga2luZC5cclxuICovXHJcbmV4cG9ydCB2YXIgU3ltYm9sS2luZDtcclxuKGZ1bmN0aW9uIChTeW1ib2xLaW5kKSB7XHJcbiAgICBTeW1ib2xLaW5kLkZpbGUgPSAxO1xyXG4gICAgU3ltYm9sS2luZC5Nb2R1bGUgPSAyO1xyXG4gICAgU3ltYm9sS2luZC5OYW1lc3BhY2UgPSAzO1xyXG4gICAgU3ltYm9sS2luZC5QYWNrYWdlID0gNDtcclxuICAgIFN5bWJvbEtpbmQuQ2xhc3MgPSA1O1xyXG4gICAgU3ltYm9sS2luZC5NZXRob2QgPSA2O1xyXG4gICAgU3ltYm9sS2luZC5Qcm9wZXJ0eSA9IDc7XHJcbiAgICBTeW1ib2xLaW5kLkZpZWxkID0gODtcclxuICAgIFN5bWJvbEtpbmQuQ29uc3RydWN0b3IgPSA5O1xyXG4gICAgU3ltYm9sS2luZC5FbnVtID0gMTA7XHJcbiAgICBTeW1ib2xLaW5kLkludGVyZmFjZSA9IDExO1xyXG4gICAgU3ltYm9sS2luZC5GdW5jdGlvbiA9IDEyO1xyXG4gICAgU3ltYm9sS2luZC5WYXJpYWJsZSA9IDEzO1xyXG4gICAgU3ltYm9sS2luZC5Db25zdGFudCA9IDE0O1xyXG4gICAgU3ltYm9sS2luZC5TdHJpbmcgPSAxNTtcclxuICAgIFN5bWJvbEtpbmQuTnVtYmVyID0gMTY7XHJcbiAgICBTeW1ib2xLaW5kLkJvb2xlYW4gPSAxNztcclxuICAgIFN5bWJvbEtpbmQuQXJyYXkgPSAxODtcclxuICAgIFN5bWJvbEtpbmQuT2JqZWN0ID0gMTk7XHJcbiAgICBTeW1ib2xLaW5kLktleSA9IDIwO1xyXG4gICAgU3ltYm9sS2luZC5OdWxsID0gMjE7XHJcbiAgICBTeW1ib2xLaW5kLkVudW1NZW1iZXIgPSAyMjtcclxuICAgIFN5bWJvbEtpbmQuU3RydWN0ID0gMjM7XHJcbiAgICBTeW1ib2xLaW5kLkV2ZW50ID0gMjQ7XHJcbiAgICBTeW1ib2xLaW5kLk9wZXJhdG9yID0gMjU7XHJcbiAgICBTeW1ib2xLaW5kLlR5cGVQYXJhbWV0ZXIgPSAyNjtcclxufSkoU3ltYm9sS2luZCB8fCAoU3ltYm9sS2luZCA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgU3ltYm9sSW5mb3JtYXRpb247XHJcbihmdW5jdGlvbiAoU3ltYm9sSW5mb3JtYXRpb24pIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzeW1ib2wgaW5mb3JtYXRpb24gbGl0ZXJhbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgc3ltYm9sLlxyXG4gICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIHN5bWJvbC5cclxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGhlIGxvY2F0aW9uIG9mIHRoZSBzeW1ib2wuXHJcbiAgICAgKiBAcGFyYW0gdXJpIFRoZSByZXNvdXJjZSBvZiB0aGUgbG9jYXRpb24gb2Ygc3ltYm9sLCBkZWZhdWx0cyB0byB0aGUgY3VycmVudCBkb2N1bWVudC5cclxuICAgICAqIEBwYXJhbSBjb250YWluZXJOYW1lIFRoZSBuYW1lIG9mIHRoZSBzeW1ib2wgY29udGFpbmluZyB0aGUgc3ltYm9sLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobmFtZSwga2luZCwgcmFuZ2UsIHVyaSwgY29udGFpbmVyTmFtZSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7IHVyaTogdXJpLCByYW5nZTogcmFuZ2UgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lck5hbWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmNvbnRhaW5lck5hbWUgPSBjb250YWluZXJOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgU3ltYm9sSW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xyXG59KShTeW1ib2xJbmZvcm1hdGlvbiB8fCAoU3ltYm9sSW5mb3JtYXRpb24gPSB7fSkpO1xyXG4vKipcclxuICogUmVwcmVzZW50cyBwcm9ncmFtbWluZyBjb25zdHJ1Y3RzIGxpa2UgdmFyaWFibGVzLCBjbGFzc2VzLCBpbnRlcmZhY2VzIGV0Yy5cclxuICogdGhhdCBhcHBlYXIgaW4gYSBkb2N1bWVudC4gRG9jdW1lbnQgc3ltYm9scyBjYW4gYmUgaGllcmFyY2hpY2FsIGFuZCB0aGV5XHJcbiAqIGhhdmUgdHdvIHJhbmdlczogb25lIHRoYXQgZW5jbG9zZXMgaXRzIGRlZmluaXRpb24gYW5kIG9uZSB0aGF0IHBvaW50cyB0b1xyXG4gKiBpdHMgbW9zdCBpbnRlcmVzdGluZyByYW5nZSwgZS5nLiB0aGUgcmFuZ2Ugb2YgYW4gaWRlbnRpZmllci5cclxuICovXHJcbnZhciBEb2N1bWVudFN5bWJvbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERvY3VtZW50U3ltYm9sKCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERvY3VtZW50U3ltYm9sO1xyXG59KCkpO1xyXG5leHBvcnQgeyBEb2N1bWVudFN5bWJvbCB9O1xyXG4oZnVuY3Rpb24gKERvY3VtZW50U3ltYm9sKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgc3ltYm9sIGluZm9ybWF0aW9uIGxpdGVyYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHN5bWJvbC5cclxuICAgICAqIEBwYXJhbSBkZXRhaWwgVGhlIGRldGFpbCBvZiB0aGUgc3ltYm9sLlxyXG4gICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIHN5bWJvbC5cclxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGhlIHN5bWJvbC5cclxuICAgICAqIEBwYXJhbSBzZWxlY3Rpb25SYW5nZSBUaGUgc2VsZWN0aW9uUmFuZ2Ugb2YgdGhlIHN5bWJvbC5cclxuICAgICAqIEBwYXJhbSBjaGlsZHJlbiBDaGlsZHJlbiBvZiB0aGUgc3ltYm9sLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUobmFtZSwgZGV0YWlsLCBraW5kLCByYW5nZSwgc2VsZWN0aW9uUmFuZ2UsIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWwsXHJcbiAgICAgICAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2U6IHNlbGVjdGlvblJhbmdlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoY2hpbGRyZW4gIT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICByZXN1bHQuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIERvY3VtZW50U3ltYm9sLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtEb2N1bWVudFN5bWJvbF0oI0RvY3VtZW50U3ltYm9sKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiZcclxuICAgICAgICAgICAgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uYW1lKSAmJiBJcy5udW1iZXIoY2FuZGlkYXRlLmtpbmQpICYmXHJcbiAgICAgICAgICAgIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnNlbGVjdGlvblJhbmdlKSAmJlxyXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRldGFpbCA9PT0gdm9pZCAwIHx8IElzLnN0cmluZyhjYW5kaWRhdGUuZGV0YWlsKSkgJiZcclxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kZXByZWNhdGVkID09PSB2b2lkIDAgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUuZGVwcmVjYXRlZCkpICYmXHJcbiAgICAgICAgICAgIChjYW5kaWRhdGUuY2hpbGRyZW4gPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS5jaGlsZHJlbikpO1xyXG4gICAgfVxyXG4gICAgRG9jdW1lbnRTeW1ib2wuaXMgPSBpcztcclxufSkoRG9jdW1lbnRTeW1ib2wgfHwgKERvY3VtZW50U3ltYm9sID0ge30pKTtcclxuLyoqXHJcbiAqIEEgc2V0IG9mIHByZWRlZmluZWQgY29kZSBhY3Rpb24ga2luZHNcclxuICovXHJcbmV4cG9ydCB2YXIgQ29kZUFjdGlvbktpbmQ7XHJcbihmdW5jdGlvbiAoQ29kZUFjdGlvbktpbmQpIHtcclxuICAgIC8qKlxyXG4gICAgICogQmFzZSBraW5kIGZvciBxdWlja2ZpeCBhY3Rpb25zOiAncXVpY2tmaXgnXHJcbiAgICAgKi9cclxuICAgIENvZGVBY3Rpb25LaW5kLlF1aWNrRml4ID0gJ3F1aWNrZml4JztcclxuICAgIC8qKlxyXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBhY3Rpb25zOiAncmVmYWN0b3InXHJcbiAgICAgKi9cclxuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9yID0gJ3JlZmFjdG9yJztcclxuICAgIC8qKlxyXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBleHRyYWN0aW9uIGFjdGlvbnM6ICdyZWZhY3Rvci5leHRyYWN0J1xyXG4gICAgICpcclxuICAgICAqIEV4YW1wbGUgZXh0cmFjdCBhY3Rpb25zOlxyXG4gICAgICpcclxuICAgICAqIC0gRXh0cmFjdCBtZXRob2RcclxuICAgICAqIC0gRXh0cmFjdCBmdW5jdGlvblxyXG4gICAgICogLSBFeHRyYWN0IHZhcmlhYmxlXHJcbiAgICAgKiAtIEV4dHJhY3QgaW50ZXJmYWNlIGZyb20gY2xhc3NcclxuICAgICAqIC0gLi4uXHJcbiAgICAgKi9cclxuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9yRXh0cmFjdCA9ICdyZWZhY3Rvci5leHRyYWN0JztcclxuICAgIC8qKlxyXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBpbmxpbmUgYWN0aW9uczogJ3JlZmFjdG9yLmlubGluZSdcclxuICAgICAqXHJcbiAgICAgKiBFeGFtcGxlIGlubGluZSBhY3Rpb25zOlxyXG4gICAgICpcclxuICAgICAqIC0gSW5saW5lIGZ1bmN0aW9uXHJcbiAgICAgKiAtIElubGluZSB2YXJpYWJsZVxyXG4gICAgICogLSBJbmxpbmUgY29uc3RhbnRcclxuICAgICAqIC0gLi4uXHJcbiAgICAgKi9cclxuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9ySW5saW5lID0gJ3JlZmFjdG9yLmlubGluZSc7XHJcbiAgICAvKipcclxuICAgICAqIEJhc2Uga2luZCBmb3IgcmVmYWN0b3JpbmcgcmV3cml0ZSBhY3Rpb25zOiAncmVmYWN0b3IucmV3cml0ZSdcclxuICAgICAqXHJcbiAgICAgKiBFeGFtcGxlIHJld3JpdGUgYWN0aW9uczpcclxuICAgICAqXHJcbiAgICAgKiAtIENvbnZlcnQgSmF2YVNjcmlwdCBmdW5jdGlvbiB0byBjbGFzc1xyXG4gICAgICogLSBBZGQgb3IgcmVtb3ZlIHBhcmFtZXRlclxyXG4gICAgICogLSBFbmNhcHN1bGF0ZSBmaWVsZFxyXG4gICAgICogLSBNYWtlIG1ldGhvZCBzdGF0aWNcclxuICAgICAqIC0gTW92ZSBtZXRob2QgdG8gYmFzZSBjbGFzc1xyXG4gICAgICogLSAuLi5cclxuICAgICAqL1xyXG4gICAgQ29kZUFjdGlvbktpbmQuUmVmYWN0b3JSZXdyaXRlID0gJ3JlZmFjdG9yLnJld3JpdGUnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHNvdXJjZSBhY3Rpb25zOiBgc291cmNlYFxyXG4gICAgICpcclxuICAgICAqIFNvdXJjZSBjb2RlIGFjdGlvbnMgYXBwbHkgdG8gdGhlIGVudGlyZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBDb2RlQWN0aW9uS2luZC5Tb3VyY2UgPSAnc291cmNlJztcclxuICAgIC8qKlxyXG4gICAgICogQmFzZSBraW5kIGZvciBhbiBvcmdhbml6ZSBpbXBvcnRzIHNvdXJjZSBhY3Rpb246IGBzb3VyY2Uub3JnYW5pemVJbXBvcnRzYFxyXG4gICAgICovXHJcbiAgICBDb2RlQWN0aW9uS2luZC5Tb3VyY2VPcmdhbml6ZUltcG9ydHMgPSAnc291cmNlLm9yZ2FuaXplSW1wb3J0cyc7XHJcbn0pKENvZGVBY3Rpb25LaW5kIHx8IChDb2RlQWN0aW9uS2luZCA9IHt9KSk7XHJcbi8qKlxyXG4gKiBUaGUgQ29kZUFjdGlvbkNvbnRleHQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXHJcbiAqIFtDb2RlQWN0aW9uQ29udGV4dF0oI0NvZGVBY3Rpb25Db250ZXh0KSBsaXRlcmFscy5cclxuICovXHJcbmV4cG9ydCB2YXIgQ29kZUFjdGlvbkNvbnRleHQ7XHJcbihmdW5jdGlvbiAoQ29kZUFjdGlvbkNvbnRleHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2RlQWN0aW9uQ29udGV4dCBsaXRlcmFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUoZGlhZ25vc3RpY3MsIG9ubHkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0geyBkaWFnbm9zdGljczogZGlhZ25vc3RpY3MgfTtcclxuICAgICAgICBpZiAob25seSAhPT0gdm9pZCAwICYmIG9ubHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm9ubHkgPSBvbmx5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgQ29kZUFjdGlvbkNvbnRleHQuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0NvZGVBY3Rpb25Db250ZXh0XSgjQ29kZUFjdGlvbkNvbnRleHQpIGludGVyZmFjZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcclxuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5kaWFnbm9zdGljcywgRGlhZ25vc3RpYy5pcykgJiYgKGNhbmRpZGF0ZS5vbmx5ID09PSB2b2lkIDAgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUub25seSwgSXMuc3RyaW5nKSk7XHJcbiAgICB9XHJcbiAgICBDb2RlQWN0aW9uQ29udGV4dC5pcyA9IGlzO1xyXG59KShDb2RlQWN0aW9uQ29udGV4dCB8fCAoQ29kZUFjdGlvbkNvbnRleHQgPSB7fSkpO1xyXG5leHBvcnQgdmFyIENvZGVBY3Rpb247XHJcbihmdW5jdGlvbiAoQ29kZUFjdGlvbikge1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlLCBjb21tYW5kT3JFZGl0LCBraW5kKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgdGl0bGU6IHRpdGxlIH07XHJcbiAgICAgICAgaWYgKENvbW1hbmQuaXMoY29tbWFuZE9yRWRpdCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmNvbW1hbmQgPSBjb21tYW5kT3JFZGl0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVkaXQgPSBjb21tYW5kT3JFZGl0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2luZCAhPT0gdm9pZCBudWxsKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIENvZGVBY3Rpb24uY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcclxuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRpdGxlKSAmJlxyXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRpYWdub3N0aWNzID09PSB2b2lkIDAgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuZGlhZ25vc3RpY3MsIERpYWdub3N0aWMuaXMpKSAmJlxyXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmtpbmQgPT09IHZvaWQgMCB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmtpbmQpKSAmJlxyXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmVkaXQgIT09IHZvaWQgMCB8fCBjYW5kaWRhdGUuY29tbWFuZCAhPT0gdm9pZCAwKSAmJlxyXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmNvbW1hbmQgPT09IHZvaWQgMCB8fCBDb21tYW5kLmlzKGNhbmRpZGF0ZS5jb21tYW5kKSkgJiZcclxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5lZGl0ID09PSB2b2lkIDAgfHwgV29ya3NwYWNlRWRpdC5pcyhjYW5kaWRhdGUuZWRpdCkpO1xyXG4gICAgfVxyXG4gICAgQ29kZUFjdGlvbi5pcyA9IGlzO1xyXG59KShDb2RlQWN0aW9uIHx8IChDb2RlQWN0aW9uID0ge30pKTtcclxuLyoqXHJcbiAqIFRoZSBDb2RlTGVucyBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcclxuICogW0NvZGVMZW5zXSgjQ29kZUxlbnMpIGxpdGVyYWxzLlxyXG4gKi9cclxuZXhwb3J0IHZhciBDb2RlTGVucztcclxuKGZ1bmN0aW9uIChDb2RlTGVucykge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENvZGVMZW5zIGxpdGVyYWwuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgZGF0YSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7IHJhbmdlOiByYW5nZSB9O1xyXG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGRhdGEpKVxyXG4gICAgICAgICAgICByZXN1bHQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIENvZGVMZW5zLmNyZWF0ZSA9IGNyZWF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtDb2RlTGVuc10oI0NvZGVMZW5zKSBpbnRlcmZhY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5jb21tYW5kKSB8fCBDb21tYW5kLmlzKGNhbmRpZGF0ZS5jb21tYW5kKSk7XHJcbiAgICB9XHJcbiAgICBDb2RlTGVucy5pcyA9IGlzO1xyXG59KShDb2RlTGVucyB8fCAoQ29kZUxlbnMgPSB7fSkpO1xyXG4vKipcclxuICogVGhlIEZvcm1hdHRpbmdPcHRpb25zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxyXG4gKiBbRm9ybWF0dGluZ09wdGlvbnNdKCNGb3JtYXR0aW5nT3B0aW9ucykgbGl0ZXJhbHMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIEZvcm1hdHRpbmdPcHRpb25zO1xyXG4oZnVuY3Rpb24gKEZvcm1hdHRpbmdPcHRpb25zKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgRm9ybWF0dGluZ09wdGlvbnMgbGl0ZXJhbC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRhYlNpemUsIGluc2VydFNwYWNlcykge1xyXG4gICAgICAgIHJldHVybiB7IHRhYlNpemU6IHRhYlNpemUsIGluc2VydFNwYWNlczogaW5zZXJ0U3BhY2VzIH07XHJcbiAgICB9XHJcbiAgICBGb3JtYXR0aW5nT3B0aW9ucy5jcmVhdGUgPSBjcmVhdGU7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbRm9ybWF0dGluZ09wdGlvbnNdKCNGb3JtYXR0aW5nT3B0aW9ucykgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLm51bWJlcihjYW5kaWRhdGUudGFiU2l6ZSkgJiYgSXMuYm9vbGVhbihjYW5kaWRhdGUuaW5zZXJ0U3BhY2VzKTtcclxuICAgIH1cclxuICAgIEZvcm1hdHRpbmdPcHRpb25zLmlzID0gaXM7XHJcbn0pKEZvcm1hdHRpbmdPcHRpb25zIHx8IChGb3JtYXR0aW5nT3B0aW9ucyA9IHt9KSk7XHJcbi8qKlxyXG4gKiBBIGRvY3VtZW50IGxpbmsgaXMgYSByYW5nZSBpbiBhIHRleHQgZG9jdW1lbnQgdGhhdCBsaW5rcyB0byBhbiBpbnRlcm5hbCBvciBleHRlcm5hbCByZXNvdXJjZSwgbGlrZSBhbm90aGVyXHJcbiAqIHRleHQgZG9jdW1lbnQgb3IgYSB3ZWIgc2l0ZS5cclxuICovXHJcbnZhciBEb2N1bWVudExpbmsgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEb2N1bWVudExpbmsoKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRG9jdW1lbnRMaW5rO1xyXG59KCkpO1xyXG5leHBvcnQgeyBEb2N1bWVudExpbmsgfTtcclxuLyoqXHJcbiAqIFRoZSBEb2N1bWVudExpbmsgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXHJcbiAqIFtEb2N1bWVudExpbmtdKCNEb2N1bWVudExpbmspIGxpdGVyYWxzLlxyXG4gKi9cclxuKGZ1bmN0aW9uIChEb2N1bWVudExpbmspIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEb2N1bWVudExpbmsgbGl0ZXJhbC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCB0YXJnZXQsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIHRhcmdldDogdGFyZ2V0LCBkYXRhOiBkYXRhIH07XHJcbiAgICB9XHJcbiAgICBEb2N1bWVudExpbmsuY3JlYXRlID0gY3JlYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0RvY3VtZW50TGlua10oI0RvY3VtZW50TGluaykgaW50ZXJmYWNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGFyZ2V0KSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldCkpO1xyXG4gICAgfVxyXG4gICAgRG9jdW1lbnRMaW5rLmlzID0gaXM7XHJcbn0pKERvY3VtZW50TGluayB8fCAoRG9jdW1lbnRMaW5rID0ge30pKTtcclxuZXhwb3J0IHZhciBFT0wgPSBbJ1xcbicsICdcXHJcXG4nLCAnXFxyJ107XHJcbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50O1xyXG4oZnVuY3Rpb24gKFRleHREb2N1bWVudCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IElUZXh0RG9jdW1lbnQgbGl0ZXJhbCBmcm9tIHRoZSBnaXZlbiB1cmkgYW5kIGNvbnRlbnQuXHJcbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZUlkICBUaGUgZG9jdW1lbnQncyBsYW5ndWFnZSBJZC5cclxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkb2N1bWVudCdzIGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEZ1bGxUZXh0RG9jdW1lbnQodXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCBjb250ZW50KTtcclxuICAgIH1cclxuICAgIFRleHREb2N1bWVudC5jcmVhdGUgPSBjcmVhdGU7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbSVRleHREb2N1bWVudF0oI0lUZXh0RG9jdW1lbnQpIGludGVyZmFjZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcclxuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUubGFuZ3VhZ2VJZCkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYW5ndWFnZUlkKSkgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS5saW5lQ291bnQpXHJcbiAgICAgICAgICAgICYmIElzLmZ1bmMoY2FuZGlkYXRlLmdldFRleHQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLnBvc2l0aW9uQXQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLm9mZnNldEF0KSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIFRleHREb2N1bWVudC5pcyA9IGlzO1xyXG4gICAgZnVuY3Rpb24gYXBwbHlFZGl0cyhkb2N1bWVudCwgZWRpdHMpIHtcclxuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmdldFRleHQoKTtcclxuICAgICAgICB2YXIgc29ydGVkRWRpdHMgPSBtZXJnZVNvcnQoZWRpdHMsIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBkaWZmID0gYS5yYW5nZS5zdGFydC5saW5lIC0gYi5yYW5nZS5zdGFydC5saW5lO1xyXG4gICAgICAgICAgICBpZiAoZGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyIC0gYi5yYW5nZS5zdGFydC5jaGFyYWN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRpZmY7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGxhc3RNb2RpZmllZE9mZnNldCA9IHRleHQubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBzb3J0ZWRFZGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IHNvcnRlZEVkaXRzW2ldO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRPZmZzZXQgPSBkb2N1bWVudC5vZmZzZXRBdChlLnJhbmdlLnN0YXJ0KTtcclxuICAgICAgICAgICAgdmFyIGVuZE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2UuZW5kKTtcclxuICAgICAgICAgICAgaWYgKGVuZE9mZnNldCA8PSBsYXN0TW9kaWZpZWRPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBzdGFydE9mZnNldCkgKyBlLm5ld1RleHQgKyB0ZXh0LnN1YnN0cmluZyhlbmRPZmZzZXQsIHRleHQubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcmxhcHBpbmcgZWRpdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhc3RNb2RpZmllZE9mZnNldCA9IHN0YXJ0T2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIFRleHREb2N1bWVudC5hcHBseUVkaXRzID0gYXBwbHlFZGl0cztcclxuICAgIGZ1bmN0aW9uIG1lcmdlU29ydChkYXRhLCBjb21wYXJlKSB7XHJcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgLy8gc29ydGVkXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcCA9IChkYXRhLmxlbmd0aCAvIDIpIHwgMDtcclxuICAgICAgICB2YXIgbGVmdCA9IGRhdGEuc2xpY2UoMCwgcCk7XHJcbiAgICAgICAgdmFyIHJpZ2h0ID0gZGF0YS5zbGljZShwKTtcclxuICAgICAgICBtZXJnZVNvcnQobGVmdCwgY29tcGFyZSk7XHJcbiAgICAgICAgbWVyZ2VTb3J0KHJpZ2h0LCBjb21wYXJlKTtcclxuICAgICAgICB2YXIgbGVmdElkeCA9IDA7XHJcbiAgICAgICAgdmFyIHJpZ2h0SWR4ID0gMDtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCAmJiByaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgcmV0ID0gY29tcGFyZShsZWZ0W2xlZnRJZHhdLCByaWdodFtyaWdodElkeF0pO1xyXG4gICAgICAgICAgICBpZiAocmV0IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIHNtYWxsZXJfZXF1YWwgLT4gdGFrZSBsZWZ0IHRvIHByZXNlcnZlIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBkYXRhW2krK10gPSBsZWZ0W2xlZnRJZHgrK107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBncmVhdGVyIC0+IHRha2UgcmlnaHRcclxuICAgICAgICAgICAgICAgIGRhdGFbaSsrXSA9IHJpZ2h0W3JpZ2h0SWR4KytdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChsZWZ0SWR4IDwgbGVmdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGF0YVtpKytdID0gbGVmdFtsZWZ0SWR4KytdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAocmlnaHRJZHggPCByaWdodC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGF0YVtpKytdID0gcmlnaHRbcmlnaHRJZHgrK107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG59KShUZXh0RG9jdW1lbnQgfHwgKFRleHREb2N1bWVudCA9IHt9KSk7XHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHJlYXNvbnMgd2h5IGEgdGV4dCBkb2N1bWVudCBpcyBzYXZlZC5cclxuICovXHJcbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50U2F2ZVJlYXNvbjtcclxuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRTYXZlUmVhc29uKSB7XHJcbiAgICAvKipcclxuICAgICAqIE1hbnVhbGx5IHRyaWdnZXJlZCwgZS5nLiBieSB0aGUgdXNlciBwcmVzc2luZyBzYXZlLCBieSBzdGFydGluZyBkZWJ1Z2dpbmcsXHJcbiAgICAgKiBvciBieSBhbiBBUEkgY2FsbC5cclxuICAgICAqL1xyXG4gICAgVGV4dERvY3VtZW50U2F2ZVJlYXNvbi5NYW51YWwgPSAxO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRvbWF0aWMgYWZ0ZXIgYSBkZWxheS5cclxuICAgICAqL1xyXG4gICAgVGV4dERvY3VtZW50U2F2ZVJlYXNvbi5BZnRlckRlbGF5ID0gMjtcclxuICAgIC8qKlxyXG4gICAgICogV2hlbiB0aGUgZWRpdG9yIGxvc3QgZm9jdXMuXHJcbiAgICAgKi9cclxuICAgIFRleHREb2N1bWVudFNhdmVSZWFzb24uRm9jdXNPdXQgPSAzO1xyXG59KShUZXh0RG9jdW1lbnRTYXZlUmVhc29uIHx8IChUZXh0RG9jdW1lbnRTYXZlUmVhc29uID0ge30pKTtcclxudmFyIEZ1bGxUZXh0RG9jdW1lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBGdWxsVGV4dERvY3VtZW50KHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCkge1xyXG4gICAgICAgIHRoaXMuX3VyaSA9IHVyaTtcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZUlkID0gbGFuZ3VhZ2VJZDtcclxuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUsIFwidXJpXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VyaTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZSwgXCJsYW5ndWFnZUlkXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlSWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUsIFwidmVyc2lvblwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uIChyYW5nZSkge1xyXG4gICAgICAgIGlmIChyYW5nZSkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLnN0YXJ0KTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMub2Zmc2V0QXQocmFuZ2UuZW5kKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcclxuICAgIH07XHJcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZXZlbnQsIHZlcnNpb24pIHtcclxuICAgICAgICB0aGlzLl9jb250ZW50ID0gZXZlbnQudGV4dDtcclxuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUuZ2V0TGluZU9mZnNldHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpbmVPZmZzZXRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lT2Zmc2V0cyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgdGV4dCA9IHRoaXMuX2NvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciBpc0xpbmVTdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGluZVN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldHMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0xpbmVTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgICAgICBpc0xpbmVTdGFydCA9IChjaCA9PT0gJ1xccicgfHwgY2ggPT09ICdcXG4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgaSArIDEgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJBdChpICsgMSkgPT09ICdcXG4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0xpbmVTdGFydCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRzLnB1c2godGV4dC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gbGluZU9mZnNldHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lT2Zmc2V0cztcclxuICAgIH07XHJcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS5wb3NpdGlvbkF0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICAgIG9mZnNldCA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCwgdGhpcy5fY29udGVudC5sZW5ndGgpLCAwKTtcclxuICAgICAgICB2YXIgbGluZU9mZnNldHMgPSB0aGlzLmdldExpbmVPZmZzZXRzKCk7XHJcbiAgICAgICAgdmFyIGxvdyA9IDAsIGhpZ2ggPSBsaW5lT2Zmc2V0cy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGhpZ2ggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZSgwLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAobG93IDwgaGlnaCkge1xyXG4gICAgICAgICAgICB2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcclxuICAgICAgICAgICAgaWYgKGxpbmVPZmZzZXRzW21pZF0gPiBvZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIGhpZ2ggPSBtaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxvdyBpcyB0aGUgbGVhc3QgeCBmb3Igd2hpY2ggdGhlIGxpbmUgb2Zmc2V0IGlzIGxhcmdlciB0aGFuIHRoZSBjdXJyZW50IG9mZnNldFxyXG4gICAgICAgIC8vIG9yIGFycmF5Lmxlbmd0aCBpZiBubyBsaW5lIG9mZnNldCBpcyBsYXJnZXIgdGhhbiB0aGUgY3VycmVudCBvZmZzZXRcclxuICAgICAgICB2YXIgbGluZSA9IGxvdyAtIDE7XHJcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZShsaW5lLCBvZmZzZXQgLSBsaW5lT2Zmc2V0c1tsaW5lXSk7XHJcbiAgICB9O1xyXG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUub2Zmc2V0QXQgPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgbGluZU9mZnNldHMgPSB0aGlzLmdldExpbmVPZmZzZXRzKCk7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uLmxpbmUgPj0gbGluZU9mZnNldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocG9zaXRpb24ubGluZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsaW5lT2Zmc2V0ID0gbGluZU9mZnNldHNbcG9zaXRpb24ubGluZV07XHJcbiAgICAgICAgdmFyIG5leHRMaW5lT2Zmc2V0ID0gKHBvc2l0aW9uLmxpbmUgKyAxIDwgbGluZU9mZnNldHMubGVuZ3RoKSA/IGxpbmVPZmZzZXRzW3Bvc2l0aW9uLmxpbmUgKyAxXSA6IHRoaXMuX2NvbnRlbnQubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihsaW5lT2Zmc2V0ICsgcG9zaXRpb24uY2hhcmFjdGVyLCBuZXh0TGluZU9mZnNldCksIGxpbmVPZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZSwgXCJsaW5lQ291bnRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lT2Zmc2V0cygpLmxlbmd0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBGdWxsVGV4dERvY3VtZW50O1xyXG59KCkpO1xyXG52YXIgSXM7XHJcbihmdW5jdGlvbiAoSXMpIHtcclxuICAgIHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICBmdW5jdGlvbiBkZWZpbmVkKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9XHJcbiAgICBJcy5kZWZpbmVkID0gZGVmaW5lZDtcclxuICAgIGZ1bmN0aW9uIHVuZGVmaW5lZCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG4gICAgfVxyXG4gICAgSXMudW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgZnVuY3Rpb24gYm9vbGVhbih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBJcy5ib29sZWFuID0gYm9vbGVhbjtcclxuICAgIGZ1bmN0aW9uIHN0cmluZyh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbiAgICB9XHJcbiAgICBJcy5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICBmdW5jdGlvbiBudW1iZXIodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xyXG4gICAgfVxyXG4gICAgSXMubnVtYmVyID0gbnVtYmVyO1xyXG4gICAgZnVuY3Rpb24gZnVuYyh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH1cclxuICAgIElzLmZ1bmMgPSBmdW5jO1xyXG4gICAgZnVuY3Rpb24gb2JqZWN0TGl0ZXJhbCh2YWx1ZSkge1xyXG4gICAgICAgIC8vIFN0cmljdGx5IHNwZWFraW5nIGNsYXNzIGluc3RhbmNlcyBwYXNzIHRoaXMgY2hlY2sgYXMgd2VsbC4gU2luY2UgdGhlIExTUFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgdXNlIGNsYXNzZXMgd2UgaWdub3JlIHRoaXMgZm9yIG5vdy4gSWYgd2UgZG8gd2UgbmVlZCB0byBhZGQgc29tZXRoaW5nXHJcbiAgICAgICAgLy8gbGlrZSB0aGlzOiBgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSkgPT09IG51bGxgXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XHJcbiAgICB9XHJcbiAgICBJcy5vYmplY3RMaXRlcmFsID0gb2JqZWN0TGl0ZXJhbDtcclxuICAgIGZ1bmN0aW9uIHR5cGVkQXJyYXkodmFsdWUsIGNoZWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KGNoZWNrKTtcclxuICAgIH1cclxuICAgIElzLnR5cGVkQXJyYXkgPSB0eXBlZEFycmF5O1xyXG59KShJcyB8fCAoSXMgPSB7fSkpO1xyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7IFdvcmtlck1hbmFnZXIgfSBmcm9tICcuL3dvcmtlck1hbmFnZXIuanMnO1xuaW1wb3J0ICogYXMgbGFuZ3VhZ2VGZWF0dXJlcyBmcm9tICcuL2xhbmd1YWdlRmVhdHVyZXMuanMnO1xuaW1wb3J0IHsgY3JlYXRlVG9rZW5pemF0aW9uU3VwcG9ydCB9IGZyb20gJy4vdG9rZW5pemF0aW9uLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cE1vZGUoZGVmYXVsdHMpIHtcbiAgICB2YXIgZGlzcG9zYWJsZXMgPSBbXTtcbiAgICB2YXIgY2xpZW50ID0gbmV3IFdvcmtlck1hbmFnZXIoZGVmYXVsdHMpO1xuICAgIGRpc3Bvc2FibGVzLnB1c2goY2xpZW50KTtcbiAgICB2YXIgd29ya2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdXJpcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdXJpc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGllbnQuZ2V0TGFuZ3VhZ2VTZXJ2aWNlV29ya2VyLmFwcGx5KGNsaWVudCwgdXJpcyk7XG4gICAgfTtcbiAgICB2YXIgbGFuZ3VhZ2VJZCA9IGRlZmF1bHRzLmxhbmd1YWdlSWQ7XG4gICAgZGlzcG9zYWJsZXMucHVzaChtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Db21wbGV0aW9uQWRhcHRlcih3b3JrZXIpKSk7XG4gICAgZGlzcG9zYWJsZXMucHVzaChtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVySG92ZXJQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Ib3ZlckFkYXB0ZXIod29ya2VyKSkpO1xuICAgIGRpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckRvY3VtZW50U3ltYm9sUHJvdmlkZXIobGFuZ3VhZ2VJZCwgbmV3IGxhbmd1YWdlRmVhdHVyZXMuRG9jdW1lbnRTeW1ib2xBZGFwdGVyKHdvcmtlcikpKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJEb2N1bWVudEZvcm1hdHRpbmdFZGl0UHJvdmlkZXIobGFuZ3VhZ2VJZCwgbmV3IGxhbmd1YWdlRmVhdHVyZXMuRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKHdvcmtlcikpKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Eb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlcih3b3JrZXIpKSk7XG4gICAgZGlzcG9zYWJsZXMucHVzaChuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5EaWFnbm9zdGljc0FkYXB0ZXIobGFuZ3VhZ2VJZCwgd29ya2VyLCBkZWZhdWx0cykpO1xuICAgIGRpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmxhbmd1YWdlcy5zZXRUb2tlbnNQcm92aWRlcihsYW5ndWFnZUlkLCBjcmVhdGVUb2tlbml6YXRpb25TdXBwb3J0KHRydWUpKSk7XG4gICAgZGlzcG9zYWJsZXMucHVzaChtb25hY28ubGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbihsYW5ndWFnZUlkLCByaWNoRWRpdENvbmZpZ3VyYXRpb24pKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJDb2xvclByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkRvY3VtZW50Q29sb3JBZGFwdGVyKHdvcmtlcikpKTtcbiAgICBkaXNwb3NhYmxlcy5wdXNoKG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJGb2xkaW5nUmFuZ2VQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Gb2xkaW5nUmFuZ2VBZGFwdGVyKHdvcmtlcikpKTtcbn1cbnZhciByaWNoRWRpdENvbmZpZ3VyYXRpb24gPSB7XG4gICAgd29yZFBhdHRlcm46IC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxbXFx7XFxdXFx9XFw6XFxcIlxcLFxcc10rKS9nLFxuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnLy8nLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnLyonLCAnKi8nXVxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9Jywgbm90SW46IFsnc3RyaW5nJ10gfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScsIG5vdEluOiBbJ3N0cmluZyddIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZyddIH1cbiAgICBdXG59O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQgKiBhcyBscyBmcm9tICcuL19kZXBzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlcy9tYWluLmpzJztcbnZhciBVcmkgPSBtb25hY28uVXJpO1xudmFyIFJhbmdlID0gbW9uYWNvLlJhbmdlO1xuLy8gLS0tIGRpYWdub3N0aWNzIC0tLSAtLS1cbnZhciBEaWFnbm9zdGljc0FkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhZ25vc3RpY3NBZGFwdGVyKF9sYW5ndWFnZUlkLCBfd29ya2VyLCBkZWZhdWx0cykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sYW5ndWFnZUlkID0gX2xhbmd1YWdlSWQ7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzID0gW107XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIG9uTW9kZWxBZGQgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIHZhciBtb2RlSWQgPSBtb2RlbC5nZXRNb2RlSWQoKTtcbiAgICAgICAgICAgIGlmIChtb2RlSWQgIT09IF90aGlzLl9sYW5ndWFnZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhhbmRsZTtcbiAgICAgICAgICAgIF90aGlzLl9saXN0ZW5lclttb2RlbC51cmkudG9TdHJpbmcoKV0gPSBtb2RlbC5vbkRpZENoYW5nZUNvbnRlbnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIGhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2RvVmFsaWRhdGUobW9kZWwudXJpLCBtb2RlSWQpOyB9LCA1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5fZG9WYWxpZGF0ZShtb2RlbC51cmksIG1vZGVJZCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvbk1vZGVsUmVtb3ZlZCA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgbW9uYWNvLmVkaXRvci5zZXRNb2RlbE1hcmtlcnMobW9kZWwsIF90aGlzLl9sYW5ndWFnZUlkLCBbXSk7XG4gICAgICAgICAgICB2YXIgdXJpU3RyID0gbW9kZWwudXJpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBfdGhpcy5fbGlzdGVuZXJbdXJpU3RyXTtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMuX2xpc3RlbmVyW3VyaVN0cl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmVkaXRvci5vbkRpZENyZWF0ZU1vZGVsKG9uTW9kZWxBZGQpKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaChtb25hY28uZWRpdG9yLm9uV2lsbERpc3Bvc2VNb2RlbChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsKTtcbiAgICAgICAgICAgIF90aGlzLl9yZXNldFNjaGVtYShtb2RlbC51cmkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2gobW9uYWNvLmVkaXRvci5vbkRpZENoYW5nZU1vZGVsTGFuZ3VhZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBvbk1vZGVsUmVtb3ZlZChldmVudC5tb2RlbCk7XG4gICAgICAgICAgICBvbk1vZGVsQWRkKGV2ZW50Lm1vZGVsKTtcbiAgICAgICAgICAgIF90aGlzLl9yZXNldFNjaGVtYShldmVudC5tb2RlbC51cmkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2goZGVmYXVsdHMub25EaWRDaGFuZ2UoZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgICAgIG1vbmFjby5lZGl0b3IuZ2V0TW9kZWxzKCkuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuZ2V0TW9kZUlkKCkgPT09IF90aGlzLl9sYW5ndWFnZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgb25Nb2RlbEFkZChtb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaCh7XG4gICAgICAgICAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9uYWNvLmVkaXRvci5nZXRNb2RlbHMoKS5mb3JFYWNoKG9uTW9kZWxSZW1vdmVkKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX3RoaXMuX2xpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9saXN0ZW5lcltrZXldLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtb25hY28uZWRpdG9yLmdldE1vZGVscygpLmZvckVhY2gob25Nb2RlbEFkZCk7XG4gICAgfVxuICAgIERpYWdub3N0aWNzQWRhcHRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZCAmJiBkLmRpc3Bvc2UoKTsgfSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzID0gW107XG4gICAgfTtcbiAgICBEaWFnbm9zdGljc0FkYXB0ZXIucHJvdG90eXBlLl9yZXNldFNjaGVtYSA9IGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICB0aGlzLl93b3JrZXIoKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHdvcmtlci5yZXNldFNjaGVtYShyZXNvdXJjZS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEaWFnbm9zdGljc0FkYXB0ZXIucHJvdG90eXBlLl9kb1ZhbGlkYXRlID0gZnVuY3Rpb24gKHJlc291cmNlLCBsYW5ndWFnZUlkKSB7XG4gICAgICAgIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gd29ya2VyLmRvVmFsaWRhdGlvbihyZXNvdXJjZS50b1N0cmluZygpKS50aGVuKGZ1bmN0aW9uIChkaWFnbm9zdGljcykge1xuICAgICAgICAgICAgICAgIHZhciBtYXJrZXJzID0gZGlhZ25vc3RpY3MubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB0b0RpYWdub3N0aWNzKHJlc291cmNlLCBkKTsgfSk7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gbW9uYWNvLmVkaXRvci5nZXRNb2RlbChyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmdldE1vZGVJZCgpID09PSBsYW5ndWFnZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbmFjby5lZGl0b3Iuc2V0TW9kZWxNYXJrZXJzKG1vZGVsLCBsYW5ndWFnZUlkLCBtYXJrZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGlhZ25vc3RpY3NBZGFwdGVyO1xufSgpKTtcbmV4cG9ydCB7IERpYWdub3N0aWNzQWRhcHRlciB9O1xuZnVuY3Rpb24gdG9TZXZlcml0eShsc1NldmVyaXR5KSB7XG4gICAgc3dpdGNoIChsc1NldmVyaXR5KSB7XG4gICAgICAgIGNhc2UgbHMuRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yOiByZXR1cm4gbW9uYWNvLk1hcmtlclNldmVyaXR5LkVycm9yO1xuICAgICAgICBjYXNlIGxzLkRpYWdub3N0aWNTZXZlcml0eS5XYXJuaW5nOiByZXR1cm4gbW9uYWNvLk1hcmtlclNldmVyaXR5Lldhcm5pbmc7XG4gICAgICAgIGNhc2UgbHMuRGlhZ25vc3RpY1NldmVyaXR5LkluZm9ybWF0aW9uOiByZXR1cm4gbW9uYWNvLk1hcmtlclNldmVyaXR5LkluZm87XG4gICAgICAgIGNhc2UgbHMuRGlhZ25vc3RpY1NldmVyaXR5LkhpbnQ6IHJldHVybiBtb25hY28uTWFya2VyU2V2ZXJpdHkuSGludDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBtb25hY28uTWFya2VyU2V2ZXJpdHkuSW5mbztcbiAgICB9XG59XG5mdW5jdGlvbiB0b0RpYWdub3N0aWNzKHJlc291cmNlLCBkaWFnKSB7XG4gICAgdmFyIGNvZGUgPSB0eXBlb2YgZGlhZy5jb2RlID09PSAnbnVtYmVyJyA/IFN0cmluZyhkaWFnLmNvZGUpIDogZGlhZy5jb2RlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldmVyaXR5OiB0b1NldmVyaXR5KGRpYWcuc2V2ZXJpdHkpLFxuICAgICAgICBzdGFydExpbmVOdW1iZXI6IGRpYWcucmFuZ2Uuc3RhcnQubGluZSArIDEsXG4gICAgICAgIHN0YXJ0Q29sdW1uOiBkaWFnLnJhbmdlLnN0YXJ0LmNoYXJhY3RlciArIDEsXG4gICAgICAgIGVuZExpbmVOdW1iZXI6IGRpYWcucmFuZ2UuZW5kLmxpbmUgKyAxLFxuICAgICAgICBlbmRDb2x1bW46IGRpYWcucmFuZ2UuZW5kLmNoYXJhY3RlciArIDEsXG4gICAgICAgIG1lc3NhZ2U6IGRpYWcubWVzc2FnZSxcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgc291cmNlOiBkaWFnLnNvdXJjZVxuICAgIH07XG59XG4vLyAtLS0gY29tcGxldGlvbiAtLS0tLS1cbmZ1bmN0aW9uIGZyb21Qb3NpdGlvbihwb3NpdGlvbikge1xuICAgIGlmICghcG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIHsgY2hhcmFjdGVyOiBwb3NpdGlvbi5jb2x1bW4gLSAxLCBsaW5lOiBwb3NpdGlvbi5saW5lTnVtYmVyIC0gMSB9O1xufVxuZnVuY3Rpb24gZnJvbVJhbmdlKHJhbmdlKSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogeyBsaW5lOiByYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxLCBjaGFyYWN0ZXI6IHJhbmdlLnN0YXJ0Q29sdW1uIC0gMSB9LCBlbmQ6IHsgbGluZTogcmFuZ2UuZW5kTGluZU51bWJlciAtIDEsIGNoYXJhY3RlcjogcmFuZ2UuZW5kQ29sdW1uIC0gMSB9IH07XG59XG5mdW5jdGlvbiB0b1JhbmdlKHJhbmdlKSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnN0YXJ0LmxpbmUgKyAxLCByYW5nZS5zdGFydC5jaGFyYWN0ZXIgKyAxLCByYW5nZS5lbmQubGluZSArIDEsIHJhbmdlLmVuZC5jaGFyYWN0ZXIgKyAxKTtcbn1cbmZ1bmN0aW9uIHRvQ29tcGxldGlvbkl0ZW1LaW5kKGtpbmQpIHtcbiAgICB2YXIgbUl0ZW1LaW5kID0gbW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQ7XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlRleHQ6IHJldHVybiBtSXRlbUtpbmQuVGV4dDtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuTWV0aG9kOiByZXR1cm4gbUl0ZW1LaW5kLk1ldGhvZDtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb246IHJldHVybiBtSXRlbUtpbmQuRnVuY3Rpb247XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0cnVjdG9yOiByZXR1cm4gbUl0ZW1LaW5kLkNvbnN0cnVjdG9yO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5GaWVsZDogcmV0dXJuIG1JdGVtS2luZC5GaWVsZDtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuVmFyaWFibGU6IHJldHVybiBtSXRlbUtpbmQuVmFyaWFibGU7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkNsYXNzOiByZXR1cm4gbUl0ZW1LaW5kLkNsYXNzO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5JbnRlcmZhY2U6IHJldHVybiBtSXRlbUtpbmQuSW50ZXJmYWNlO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGU6IHJldHVybiBtSXRlbUtpbmQuTW9kdWxlO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eTogcmV0dXJuIG1JdGVtS2luZC5Qcm9wZXJ0eTtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuVW5pdDogcmV0dXJuIG1JdGVtS2luZC5Vbml0O1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5WYWx1ZTogcmV0dXJuIG1JdGVtS2luZC5WYWx1ZTtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuRW51bTogcmV0dXJuIG1JdGVtS2luZC5FbnVtO1xuICAgICAgICBjYXNlIGxzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkOiByZXR1cm4gbUl0ZW1LaW5kLktleXdvcmQ7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQ6IHJldHVybiBtSXRlbUtpbmQuU25pcHBldDtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuQ29sb3I6IHJldHVybiBtSXRlbUtpbmQuQ29sb3I7XG4gICAgICAgIGNhc2UgbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkZpbGU6IHJldHVybiBtSXRlbUtpbmQuRmlsZTtcbiAgICAgICAgY2FzZSBscy5Db21wbGV0aW9uSXRlbUtpbmQuUmVmZXJlbmNlOiByZXR1cm4gbUl0ZW1LaW5kLlJlZmVyZW5jZTtcbiAgICB9XG4gICAgcmV0dXJuIG1JdGVtS2luZC5Qcm9wZXJ0eTtcbn1cbmZ1bmN0aW9uIGZyb21Db21wbGV0aW9uSXRlbUtpbmQoa2luZCkge1xuICAgIHZhciBtSXRlbUtpbmQgPSBtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZDtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuVGV4dDogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5UZXh0O1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5NZXRob2Q6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuTWV0aG9kO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5GdW5jdGlvbjogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbjtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuQ29uc3RydWN0b3I6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuQ29uc3RydWN0b3I7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkZpZWxkOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5WYXJpYWJsZTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5WYXJpYWJsZTtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuQ2xhc3M6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuQ2xhc3M7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkludGVyZmFjZTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5JbnRlcmZhY2U7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLk1vZHVsZTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGU7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLlByb3BlcnR5OiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlByb3BlcnR5O1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5Vbml0OiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlVuaXQ7XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLlZhbHVlOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5FbnVtOiByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLkVudW07XG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLktleXdvcmQ6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZDtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuU25pcHBldDogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0O1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5Db2xvcjogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5Db2xvcjtcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuRmlsZTogcmV0dXJuIGxzLkNvbXBsZXRpb25JdGVtS2luZC5GaWxlO1xuICAgICAgICBjYXNlIG1JdGVtS2luZC5SZWZlcmVuY2U6IHJldHVybiBscy5Db21wbGV0aW9uSXRlbUtpbmQuUmVmZXJlbmNlO1xuICAgIH1cbiAgICByZXR1cm4gbHMuQ29tcGxldGlvbkl0ZW1LaW5kLlByb3BlcnR5O1xufVxuZnVuY3Rpb24gdG9UZXh0RWRpdCh0ZXh0RWRpdCkge1xuICAgIGlmICghdGV4dEVkaXQpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2U6IHRvUmFuZ2UodGV4dEVkaXQucmFuZ2UpLFxuICAgICAgICB0ZXh0OiB0ZXh0RWRpdC5uZXdUZXh0XG4gICAgfTtcbn1cbnZhciBDb21wbGV0aW9uQWRhcHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21wbGV0aW9uQWRhcHRlcihfd29ya2VyKSB7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wbGV0aW9uQWRhcHRlci5wcm90b3R5cGUsIFwidHJpZ2dlckNoYXJhY3RlcnNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBbJyAnLCAnOiddO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDb21wbGV0aW9uQWRhcHRlci5wcm90b3R5cGUucHJvdmlkZUNvbXBsZXRpb25JdGVtcyA9IGZ1bmN0aW9uIChtb2RlbCwgcG9zaXRpb24sIGNvbnRleHQsIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gd29ya2VyLmRvQ29tcGxldGUocmVzb3VyY2UudG9TdHJpbmcoKSwgZnJvbVBvc2l0aW9uKHBvc2l0aW9uKSk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB3b3JkSW5mbyA9IG1vZGVsLmdldFdvcmRVbnRpbFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIHZhciB3b3JkUmFuZ2UgPSBuZXcgUmFuZ2UocG9zaXRpb24ubGluZU51bWJlciwgd29yZEluZm8uc3RhcnRDb2x1bW4sIHBvc2l0aW9uLmxpbmVOdW1iZXIsIHdvcmRJbmZvLmVuZENvbHVtbik7XG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBpbmZvLml0ZW1zLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGVudHJ5LmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiBlbnRyeS5pbnNlcnRUZXh0IHx8IGVudHJ5LmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBzb3J0VGV4dDogZW50cnkuc29ydFRleHQsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclRleHQ6IGVudHJ5LmZpbHRlclRleHQsXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50YXRpb246IGVudHJ5LmRvY3VtZW50YXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogZW50cnkuZGV0YWlsLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogd29yZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBraW5kOiB0b0NvbXBsZXRpb25JdGVtS2luZChlbnRyeS5raW5kKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50ZXh0RWRpdCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJhbmdlID0gdG9SYW5nZShlbnRyeS50ZXh0RWRpdC5yYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5zZXJ0VGV4dCA9IGVudHJ5LnRleHRFZGl0Lm5ld1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5hZGRpdGlvbmFsVGV4dEVkaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkaXRpb25hbFRleHRFZGl0cyA9IGVudHJ5LmFkZGl0aW9uYWxUZXh0RWRpdHMubWFwKHRvVGV4dEVkaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaW5zZXJ0VGV4dEZvcm1hdCA9PT0gbHMuSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5zZXJ0VGV4dFJ1bGVzID0gbW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUluc2VydFRleHRSdWxlLkluc2VydEFzU25pcHBldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXNJbmNvbXBsZXRlOiBpbmZvLmlzSW5jb21wbGV0ZSxcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogaXRlbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbXBsZXRpb25BZGFwdGVyO1xufSgpKTtcbmV4cG9ydCB7IENvbXBsZXRpb25BZGFwdGVyIH07XG5mdW5jdGlvbiBpc01hcmt1cENvbnRlbnQodGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGhpbmcua2luZCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiB0b01hcmtkb3duU3RyaW5nKGVudHJ5KSB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRyeVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoaXNNYXJrdXBDb250ZW50KGVudHJ5KSkge1xuICAgICAgICBpZiAoZW50cnkua2luZCA9PT0gJ3BsYWludGV4dCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRyeS52YWx1ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogJ2BgYCcgKyBlbnRyeS5sYW5ndWFnZSArICdcXG4nICsgZW50cnkudmFsdWUgKyAnXFxuYGBgXFxuJyB9O1xufVxuZnVuY3Rpb24gdG9NYXJrZWRTdHJpbmdBcnJheShjb250ZW50cykge1xuICAgIGlmICghY29udGVudHMpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudHMpKSB7XG4gICAgICAgIHJldHVybiBjb250ZW50cy5tYXAodG9NYXJrZG93blN0cmluZyk7XG4gICAgfVxuICAgIHJldHVybiBbdG9NYXJrZG93blN0cmluZyhjb250ZW50cyldO1xufVxuLy8gLS0tIGhvdmVyIC0tLS0tLVxudmFyIEhvdmVyQWRhcHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIb3ZlckFkYXB0ZXIoX3dvcmtlcikge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIH1cbiAgICBIb3ZlckFkYXB0ZXIucHJvdG90eXBlLnByb3ZpZGVIb3ZlciA9IGZ1bmN0aW9uIChtb2RlbCwgcG9zaXRpb24sIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gd29ya2VyLmRvSG92ZXIocmVzb3VyY2UudG9TdHJpbmcoKSwgZnJvbVBvc2l0aW9uKHBvc2l0aW9uKSk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaW5mby5yYW5nZSksXG4gICAgICAgICAgICAgICAgY29udGVudHM6IHRvTWFya2VkU3RyaW5nQXJyYXkoaW5mby5jb250ZW50cylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEhvdmVyQWRhcHRlcjtcbn0oKSk7XG5leHBvcnQgeyBIb3ZlckFkYXB0ZXIgfTtcbi8vIC0tLSBkZWZpbml0aW9uIC0tLS0tLVxuZnVuY3Rpb24gdG9Mb2NhdGlvbihsb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVyaTogVXJpLnBhcnNlKGxvY2F0aW9uLnVyaSksXG4gICAgICAgIHJhbmdlOiB0b1JhbmdlKGxvY2F0aW9uLnJhbmdlKVxuICAgIH07XG59XG4vLyAtLS0gZG9jdW1lbnQgc3ltYm9scyAtLS0tLS1cbmZ1bmN0aW9uIHRvU3ltYm9sS2luZChraW5kKSB7XG4gICAgdmFyIG1LaW5kID0gbW9uYWNvLmxhbmd1YWdlcy5TeW1ib2xLaW5kO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuRmlsZTogcmV0dXJuIG1LaW5kLkFycmF5O1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuTW9kdWxlOiByZXR1cm4gbUtpbmQuTW9kdWxlO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuTmFtZXNwYWNlOiByZXR1cm4gbUtpbmQuTmFtZXNwYWNlO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuUGFja2FnZTogcmV0dXJuIG1LaW5kLlBhY2thZ2U7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5DbGFzczogcmV0dXJuIG1LaW5kLkNsYXNzO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuTWV0aG9kOiByZXR1cm4gbUtpbmQuTWV0aG9kO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuUHJvcGVydHk6IHJldHVybiBtS2luZC5Qcm9wZXJ0eTtcbiAgICAgICAgY2FzZSBscy5TeW1ib2xLaW5kLkZpZWxkOiByZXR1cm4gbUtpbmQuRmllbGQ7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5Db25zdHJ1Y3RvcjogcmV0dXJuIG1LaW5kLkNvbnN0cnVjdG9yO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuRW51bTogcmV0dXJuIG1LaW5kLkVudW07XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5JbnRlcmZhY2U6IHJldHVybiBtS2luZC5JbnRlcmZhY2U7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5GdW5jdGlvbjogcmV0dXJuIG1LaW5kLkZ1bmN0aW9uO1xuICAgICAgICBjYXNlIGxzLlN5bWJvbEtpbmQuVmFyaWFibGU6IHJldHVybiBtS2luZC5WYXJpYWJsZTtcbiAgICAgICAgY2FzZSBscy5TeW1ib2xLaW5kLkNvbnN0YW50OiByZXR1cm4gbUtpbmQuQ29uc3RhbnQ7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5TdHJpbmc6IHJldHVybiBtS2luZC5TdHJpbmc7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5OdW1iZXI6IHJldHVybiBtS2luZC5OdW1iZXI7XG4gICAgICAgIGNhc2UgbHMuU3ltYm9sS2luZC5Cb29sZWFuOiByZXR1cm4gbUtpbmQuQm9vbGVhbjtcbiAgICAgICAgY2FzZSBscy5TeW1ib2xLaW5kLkFycmF5OiByZXR1cm4gbUtpbmQuQXJyYXk7XG4gICAgfVxuICAgIHJldHVybiBtS2luZC5GdW5jdGlvbjtcbn1cbnZhciBEb2N1bWVudFN5bWJvbEFkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnRTeW1ib2xBZGFwdGVyKF93b3JrZXIpIHtcbiAgICAgICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgICB9XG4gICAgRG9jdW1lbnRTeW1ib2xBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlRG9jdW1lbnRTeW1ib2xzID0gZnVuY3Rpb24gKG1vZGVsLCB0b2tlbikge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XG4gICAgICAgIHJldHVybiB0aGlzLl93b3JrZXIocmVzb3VyY2UpLnRoZW4oZnVuY3Rpb24gKHdvcmtlcikgeyByZXR1cm4gd29ya2VyLmZpbmREb2N1bWVudFN5bWJvbHMocmVzb3VyY2UudG9TdHJpbmcoKSk7IH0pLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiAnJyxcbiAgICAgICAgICAgICAgICBjb250YWluZXJOYW1lOiBpdGVtLmNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICAgICAga2luZDogdG9TeW1ib2xLaW5kKGl0ZW0ua2luZCksXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaXRlbS5sb2NhdGlvbi5yYW5nZSksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2U6IHRvUmFuZ2UoaXRlbS5sb2NhdGlvbi5yYW5nZSlcbiAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9jdW1lbnRTeW1ib2xBZGFwdGVyO1xufSgpKTtcbmV4cG9ydCB7IERvY3VtZW50U3ltYm9sQWRhcHRlciB9O1xuZnVuY3Rpb24gZnJvbUZvcm1hdHRpbmdPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0YWJTaXplOiBvcHRpb25zLnRhYlNpemUsXG4gICAgICAgIGluc2VydFNwYWNlczogb3B0aW9ucy5pbnNlcnRTcGFjZXNcbiAgICB9O1xufVxudmFyIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb2N1bWVudEZvcm1hdHRpbmdFZGl0UHJvdmlkZXIoX3dvcmtlcikge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIH1cbiAgICBEb2N1bWVudEZvcm1hdHRpbmdFZGl0UHJvdmlkZXIucHJvdG90eXBlLnByb3ZpZGVEb2N1bWVudEZvcm1hdHRpbmdFZGl0cyA9IGZ1bmN0aW9uIChtb2RlbCwgb3B0aW9ucywgdG9rZW4pIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZm9ybWF0KHJlc291cmNlLnRvU3RyaW5nKCksIG51bGwsIGZyb21Gb3JtYXR0aW5nT3B0aW9ucyhvcHRpb25zKSkudGhlbihmdW5jdGlvbiAoZWRpdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRzIHx8IGVkaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0cy5tYXAodG9UZXh0RWRpdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyO1xufSgpKTtcbmV4cG9ydCB7IERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlciB9O1xudmFyIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKF93b3JrZXIpIHtcbiAgICAgICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcbiAgICB9XG4gICAgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIucHJvdG90eXBlLnByb3ZpZGVEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRzID0gZnVuY3Rpb24gKG1vZGVsLCByYW5nZSwgb3B0aW9ucywgdG9rZW4pIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZm9ybWF0KHJlc291cmNlLnRvU3RyaW5nKCksIGZyb21SYW5nZShyYW5nZSksIGZyb21Gb3JtYXR0aW5nT3B0aW9ucyhvcHRpb25zKSkudGhlbihmdW5jdGlvbiAoZWRpdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRzIHx8IGVkaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0cy5tYXAodG9UZXh0RWRpdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXI7XG59KCkpO1xuZXhwb3J0IHsgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIgfTtcbnZhciBEb2N1bWVudENvbG9yQWRhcHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb2N1bWVudENvbG9yQWRhcHRlcihfd29ya2VyKSB7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XG4gICAgfVxuICAgIERvY3VtZW50Q29sb3JBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlRG9jdW1lbnRDb2xvcnMgPSBmdW5jdGlvbiAobW9kZWwsIHRva2VuKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7IHJldHVybiB3b3JrZXIuZmluZERvY3VtZW50Q29sb3JzKHJlc291cmNlLnRvU3RyaW5nKCkpOyB9KS50aGVuKGZ1bmN0aW9uIChpbmZvcykge1xuICAgICAgICAgICAgaWYgKCFpbmZvcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmZvcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgY29sb3I6IGl0ZW0uY29sb3IsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaXRlbS5yYW5nZSlcbiAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb2N1bWVudENvbG9yQWRhcHRlci5wcm90b3R5cGUucHJvdmlkZUNvbG9yUHJlc2VudGF0aW9ucyA9IGZ1bmN0aW9uIChtb2RlbCwgaW5mbywgdG9rZW4pIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHsgcmV0dXJuIHdvcmtlci5nZXRDb2xvclByZXNlbnRhdGlvbnMocmVzb3VyY2UudG9TdHJpbmcoKSwgaW5mby5jb2xvciwgZnJvbVJhbmdlKGluZm8ucmFuZ2UpKTsgfSkudGhlbihmdW5jdGlvbiAocHJlc2VudGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFwcmVzZW50YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXNlbnRhdGlvbnMubWFwKGZ1bmN0aW9uIChwcmVzZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXNlbnRhdGlvbi5sYWJlbCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChwcmVzZW50YXRpb24udGV4dEVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50ZXh0RWRpdCA9IHRvVGV4dEVkaXQocHJlc2VudGF0aW9uLnRleHRFZGl0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByZXNlbnRhdGlvbi5hZGRpdGlvbmFsVGV4dEVkaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkaXRpb25hbFRleHRFZGl0cyA9IHByZXNlbnRhdGlvbi5hZGRpdGlvbmFsVGV4dEVkaXRzLm1hcCh0b1RleHRFZGl0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9jdW1lbnRDb2xvckFkYXB0ZXI7XG59KCkpO1xuZXhwb3J0IHsgRG9jdW1lbnRDb2xvckFkYXB0ZXIgfTtcbnZhciBGb2xkaW5nUmFuZ2VBZGFwdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvbGRpbmdSYW5nZUFkYXB0ZXIoX3dvcmtlcikge1xuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xuICAgIH1cbiAgICBGb2xkaW5nUmFuZ2VBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlRm9sZGluZ1JhbmdlcyA9IGZ1bmN0aW9uIChtb2RlbCwgY29udGV4dCwgdG9rZW4pIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbW9kZWwudXJpO1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHsgcmV0dXJuIHdvcmtlci5wcm92aWRlRm9sZGluZ1JhbmdlcyhyZXNvdXJjZS50b1N0cmluZygpLCBjb250ZXh0KTsgfSkudGhlbihmdW5jdGlvbiAocmFuZ2VzKSB7XG4gICAgICAgICAgICBpZiAoIXJhbmdlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByYW5nZXMubWFwKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiByYW5nZS5zdGFydExpbmUgKyAxLFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHJhbmdlLmVuZExpbmUgKyAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhbmdlLmtpbmQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5raW5kID0gdG9Gb2xkaW5nUmFuZ2VLaW5kKHJhbmdlLmtpbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEZvbGRpbmdSYW5nZUFkYXB0ZXI7XG59KCkpO1xuZXhwb3J0IHsgRm9sZGluZ1JhbmdlQWRhcHRlciB9O1xuZnVuY3Rpb24gdG9Gb2xkaW5nUmFuZ2VLaW5kKGtpbmQpIHtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgY2FzZSBscy5Gb2xkaW5nUmFuZ2VLaW5kLkNvbW1lbnQ6IHJldHVybiBtb25hY28ubGFuZ3VhZ2VzLkZvbGRpbmdSYW5nZUtpbmQuQ29tbWVudDtcbiAgICAgICAgY2FzZSBscy5Gb2xkaW5nUmFuZ2VLaW5kLkltcG9ydHM6IHJldHVybiBtb25hY28ubGFuZ3VhZ2VzLkZvbGRpbmdSYW5nZUtpbmQuSW1wb3J0cztcbiAgICAgICAgY2FzZSBscy5Gb2xkaW5nUmFuZ2VLaW5kLlJlZ2lvbjogcmV0dXJuIG1vbmFjby5sYW5ndWFnZXMuRm9sZGluZ1JhbmdlS2luZC5SZWdpb247XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCAqIGFzIGpzb24gZnJvbSAnLi9fZGVwcy9qc29uYy1wYXJzZXIvbWFpbi5qcyc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG9rZW5pemF0aW9uU3VwcG9ydChzdXBwb3J0Q29tbWVudHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBKU09OU3RhdGUobnVsbCwgbnVsbCwgZmFsc2UpOyB9LFxuICAgICAgICB0b2tlbml6ZTogZnVuY3Rpb24gKGxpbmUsIHN0YXRlLCBvZmZzZXREZWx0YSwgc3RvcEF0T2Zmc2V0KSB7IHJldHVybiB0b2tlbml6ZShzdXBwb3J0Q29tbWVudHMsIGxpbmUsIHN0YXRlLCBvZmZzZXREZWx0YSwgc3RvcEF0T2Zmc2V0KTsgfVxuICAgIH07XG59XG5leHBvcnQgdmFyIFRPS0VOX0RFTElNX09CSkVDVCA9ICdkZWxpbWl0ZXIuYnJhY2tldC5qc29uJztcbmV4cG9ydCB2YXIgVE9LRU5fREVMSU1fQVJSQVkgPSAnZGVsaW1pdGVyLmFycmF5Lmpzb24nO1xuZXhwb3J0IHZhciBUT0tFTl9ERUxJTV9DT0xPTiA9ICdkZWxpbWl0ZXIuY29sb24uanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX0RFTElNX0NPTU1BID0gJ2RlbGltaXRlci5jb21tYS5qc29uJztcbmV4cG9ydCB2YXIgVE9LRU5fVkFMVUVfQk9PTEVBTiA9ICdrZXl3b3JkLmpzb24nO1xuZXhwb3J0IHZhciBUT0tFTl9WQUxVRV9OVUxMID0gJ2tleXdvcmQuanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX1ZBTFVFX1NUUklORyA9ICdzdHJpbmcudmFsdWUuanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX1ZBTFVFX05VTUJFUiA9ICdudW1iZXIuanNvbic7XG5leHBvcnQgdmFyIFRPS0VOX1BST1BFUlRZX05BTUUgPSAnc3RyaW5nLmtleS5qc29uJztcbmV4cG9ydCB2YXIgVE9LRU5fQ09NTUVOVF9CTE9DSyA9ICdjb21tZW50LmJsb2NrLmpzb24nO1xuZXhwb3J0IHZhciBUT0tFTl9DT01NRU5UX0xJTkUgPSAnY29tbWVudC5saW5lLmpzb24nO1xudmFyIEpTT05TdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBKU09OU3RhdGUoc3RhdGUsIHNjYW5FcnJvciwgbGFzdFdhc0NvbG9uKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2NhbkVycm9yID0gc2NhbkVycm9yO1xuICAgICAgICB0aGlzLmxhc3RXYXNDb2xvbiA9IGxhc3RXYXNDb2xvbjtcbiAgICB9XG4gICAgSlNPTlN0YXRlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBKU09OU3RhdGUodGhpcy5fc3RhdGUsIHRoaXMuc2NhbkVycm9yLCB0aGlzLmxhc3RXYXNDb2xvbik7XG4gICAgfTtcbiAgICBKU09OU3RhdGUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICBpZiAob3RoZXIgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3RoZXIgfHwgIShvdGhlciBpbnN0YW5jZW9mIEpTT05TdGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuRXJyb3IgPT09IG90aGVyLnNjYW5FcnJvciAmJlxuICAgICAgICAgICAgdGhpcy5sYXN0V2FzQ29sb24gPT09IG90aGVyLmxhc3RXYXNDb2xvbjtcbiAgICB9O1xuICAgIEpTT05TdGF0ZS5wcm90b3R5cGUuZ2V0U3RhdGVEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfTtcbiAgICBKU09OU3RhdGUucHJvdG90eXBlLnNldFN0YXRlRGF0YSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgIH07XG4gICAgcmV0dXJuIEpTT05TdGF0ZTtcbn0oKSk7XG5mdW5jdGlvbiB0b2tlbml6ZShjb21tZW50cywgbGluZSwgc3RhdGUsIG9mZnNldERlbHRhLCBzdG9wQXRPZmZzZXQpIHtcbiAgICBpZiAob2Zmc2V0RGVsdGEgPT09IHZvaWQgMCkgeyBvZmZzZXREZWx0YSA9IDA7IH1cbiAgICAvLyBoYW5kbGUgbXVsdGlsaW5lIHN0cmluZ3MgYW5kIGJsb2NrIGNvbW1lbnRzXG4gICAgdmFyIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMCwgYWRqdXN0T2Zmc2V0ID0gZmFsc2U7XG4gICAgc3dpdGNoIChzdGF0ZS5zY2FuRXJyb3IpIHtcbiAgICAgICAgY2FzZSAyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLzpcbiAgICAgICAgICAgIGxpbmUgPSAnXCInICsgbGluZTtcbiAgICAgICAgICAgIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLzpcbiAgICAgICAgICAgIGxpbmUgPSAnLyonICsgbGluZTtcbiAgICAgICAgICAgIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgc2Nhbm5lciA9IGpzb24uY3JlYXRlU2Nhbm5lcihsaW5lKSwga2luZCwgcmV0LCBsYXN0V2FzQ29sb24gPSBzdGF0ZS5sYXN0V2FzQ29sb247XG4gICAgcmV0ID0ge1xuICAgICAgICB0b2tlbnM6IFtdLFxuICAgICAgICBlbmRTdGF0ZTogc3RhdGUuY2xvbmUoKVxuICAgIH07XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldERlbHRhICsgc2Nhbm5lci5nZXRQb3NpdGlvbigpLCB0eXBlID0gJyc7XG4gICAgICAgIGtpbmQgPSBzY2FubmVyLnNjYW4oKTtcbiAgICAgICAgaWYgKGtpbmQgPT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgc2Nhbm5lciBoYXMgYWR2YW5jZWRcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gb2Zmc2V0RGVsdGEgKyBzY2FubmVyLmdldFBvc2l0aW9uKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkaWQgbm90IGFkdmFuY2UsIG5leHQgMyBjaGFyYWN0ZXJzIGFyZTogJyArIGxpbmUuc3Vic3RyKHNjYW5uZXIuZ2V0UG9zaXRpb24oKSwgMykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluIGNhc2Ugd2UgaW5zZXJ0ZWQgLyogb3IgXCIgY2hhcmFjdGVyLCB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIGFkanVzdCB0aGUgb2Zmc2V0IG9mIGFsbCB0b2tlbnMgKGV4Y2VwdCB0aGUgZmlyc3QpXG4gICAgICAgIGlmIChhZGp1c3RPZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCAtPSBudW1iZXJPZkluc2VydGVkQ2hhcmFjdGVycztcbiAgICAgICAgfVxuICAgICAgICBhZGp1c3RPZmZzZXQgPSBudW1iZXJPZkluc2VydGVkQ2hhcmFjdGVycyA+IDA7XG4gICAgICAgIC8vIGJyYWNrZXRzIGFuZCB0eXBlXG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICAgICAgY2FzZSAxIC8qIE9wZW5CcmFjZVRva2VuICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9PQkpFQ1Q7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIgLyogQ2xvc2VCcmFjZVRva2VuICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9PQkpFQ1Q7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDMgLyogT3BlbkJyYWNrZXRUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fREVMSU1fQVJSQVk7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi86XG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0FSUkFZO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2IC8qIENvbG9uVG9rZW4gKi86XG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0NPTE9OO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogQ29tbWFUb2tlbiAqLzpcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fREVMSU1fQ09NTUE7XG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDggLyogVHJ1ZUtleXdvcmQgKi86XG4gICAgICAgICAgICBjYXNlIDkgLyogRmFsc2VLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9CT09MRUFOO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3IC8qIE51bGxLZXl3b3JkICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9OVUxMO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMCAvKiBTdHJpbmdMaXRlcmFsICovOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBsYXN0V2FzQ29sb24gPyBUT0tFTl9WQUxVRV9TVFJJTkcgOiBUT0tFTl9QUk9QRVJUWV9OQU1FO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fVkFMVUVfTlVNQkVSO1xuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbW1lbnRzLCBpZmYgZW5hYmxlZFxuICAgICAgICBpZiAoY29tbWVudHMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9DT01NRU5UX0xJTkU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fQ09NTUVOVF9CTE9DSztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0LmVuZFN0YXRlID0gbmV3IEpTT05TdGF0ZShzdGF0ZS5nZXRTdGF0ZURhdGEoKSwgc2Nhbm5lci5nZXRUb2tlbkVycm9yKCksIGxhc3RXYXNDb2xvbik7XG4gICAgICAgIHJldC50b2tlbnMucHVzaCh7XG4gICAgICAgICAgICBzdGFydEluZGV4OiBvZmZzZXQsXG4gICAgICAgICAgICBzY29wZXM6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbnZhciBTVE9QX1dIRU5fSURMRV9GT1IgPSAyICogNjAgKiAxMDAwOyAvLyAybWluXG52YXIgV29ya2VyTWFuYWdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXb3JrZXJNYW5hZ2VyKGRlZmF1bHRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lkbGVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2NoZWNrSWZJZGxlKCk7IH0sIDMwICogMTAwMCk7XG4gICAgICAgIHRoaXMuX2xhc3RVc2VkVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2NvbmZpZ0NoYW5nZUxpc3RlbmVyID0gdGhpcy5fZGVmYXVsdHMub25EaWRDaGFuZ2UoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3N0b3BXb3JrZXIoKTsgfSk7XG4gICAgfVxuICAgIFdvcmtlck1hbmFnZXIucHJvdG90eXBlLl9zdG9wV29ya2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fd29ya2VyKSB7XG4gICAgICAgICAgICB0aGlzLl93b3JrZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fd29ya2VyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGllbnQgPSBudWxsO1xuICAgIH07XG4gICAgV29ya2VyTWFuYWdlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pZGxlQ2hlY2tJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZ0NoYW5nZUxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fc3RvcFdvcmtlcigpO1xuICAgIH07XG4gICAgV29ya2VyTWFuYWdlci5wcm90b3R5cGUuX2NoZWNrSWZJZGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3dvcmtlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0aW1lUGFzc2VkU2luY2VMYXN0VXNlZCA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0VXNlZFRpbWU7XG4gICAgICAgIGlmICh0aW1lUGFzc2VkU2luY2VMYXN0VXNlZCA+IFNUT1BfV0hFTl9JRExFX0ZPUikge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFdvcmtlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXb3JrZXJNYW5hZ2VyLnByb3RvdHlwZS5fZ2V0Q2xpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9sYXN0VXNlZFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIXRoaXMuX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5fd29ya2VyID0gbW9uYWNvLmVkaXRvci5jcmVhdGVXZWJXb3JrZXIoe1xuICAgICAgICAgICAgICAgIC8vIG1vZHVsZSB0aGF0IGV4cG9ydHMgdGhlIGNyZWF0ZSgpIG1ldGhvZCBhbmQgcmV0dXJucyBhIGBKU09OV29ya2VyYCBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAndnMvbGFuZ3VhZ2UvanNvbi9qc29uV29ya2VyJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5fZGVmYXVsdHMubGFuZ3VhZ2VJZCxcbiAgICAgICAgICAgICAgICAvLyBwYXNzZWQgaW4gdG8gdGhlIGNyZWF0ZSgpIG1ldGhvZFxuICAgICAgICAgICAgICAgIGNyZWF0ZURhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VTZXR0aW5nczogdGhpcy5fZGVmYXVsdHMuZGlhZ25vc3RpY3NPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUlkOiB0aGlzLl9kZWZhdWx0cy5sYW5ndWFnZUlkLFxuICAgICAgICAgICAgICAgICAgICBlbmFibGVTY2hlbWFSZXF1ZXN0OiB0aGlzLl9kZWZhdWx0cy5kaWFnbm9zdGljc09wdGlvbnMuZW5hYmxlU2NoZW1hUmVxdWVzdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fY2xpZW50ID0gdGhpcy5fd29ya2VyLmdldFByb3h5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudDtcbiAgICB9O1xuICAgIFdvcmtlck1hbmFnZXIucHJvdG90eXBlLmdldExhbmd1YWdlU2VydmljZVdvcmtlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlc291cmNlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgcmVzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9jbGllbnQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDbGllbnQoKS50aGVuKGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgICAgICAgICAgIF9jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fd29ya2VyLndpdGhTeW5jZWRSZXNvdXJjZXMocmVzb3VyY2VzKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoXykgeyByZXR1cm4gX2NsaWVudDsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gV29ya2VyTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBXb3JrZXJNYW5hZ2VyIH07XG4iXSwic291cmNlUm9vdCI6IiJ9