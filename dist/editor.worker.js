/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/monaco-editor/esm/vs/editor/editor.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/monaco-editor/esm/vs/base/common/arrays.js":
/*!*****************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/arrays.js ***!
  \*****************************************************************/
/*! exports provided: tail, tail2, equals, binarySearch, findFirstInSorted, mergeSort, groupBy, coalesce, isFalsyOrEmpty, isNonEmptyArray, distinct, firstIndex, first, flatten, range, arrayInsert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tail", function() { return tail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tail2", function() { return tail2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binarySearch", function() { return binarySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFirstInSorted", function() { return findFirstInSorted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeSort", function() { return mergeSort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return groupBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalesce", function() { return coalesce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFalsyOrEmpty", function() { return isFalsyOrEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNonEmptyArray", function() { return isNonEmptyArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distinct", function() { return distinct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstIndex", function() { return firstIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "first", function() { return first; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayInsert", function() { return arrayInsert; });
/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default is zero).
 */
function tail(array, n) {
    if (n === void 0) { n = 0; }
    return array[array.length - (1 + n)];
}
function tail2(arr) {
    if (arr.length === 0) {
        throw new Error('Invalid tail call');
    }
    return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
function equals(one, other, itemEquals) {
    if (itemEquals === void 0) { itemEquals = function (a, b) { return a === b; }; }
    if (one === other) {
        return true;
    }
    if (!one || !other) {
        return false;
    }
    if (one.length !== other.length) {
        return false;
    }
    for (var i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
function binarySearch(array, key, comparator) {
    var low = 0, high = array.length - 1;
    while (low <= high) {
        var mid = ((low + high) / 2) | 0;
        var comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */
function findFirstInSorted(array, p) {
    var low = 0, high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    return low;
}
/**
 * Like `Array#sort` but always stable. Usually runs a little slower `than Array#sort`
 * so only use this when actually needing stable sort.
 */
function mergeSort(data, compare) {
    _sort(data, compare, 0, data.length - 1, []);
    return data;
}
function _merge(a, compare, lo, mid, hi, aux) {
    var leftIdx = lo, rightIdx = mid + 1;
    for (var i = lo; i <= hi; i++) {
        aux[i] = a[i];
    }
    for (var i = lo; i <= hi; i++) {
        if (leftIdx > mid) {
            // left side consumed
            a[i] = aux[rightIdx++];
        }
        else if (rightIdx > hi) {
            // right side consumed
            a[i] = aux[leftIdx++];
        }
        else if (compare(aux[rightIdx], aux[leftIdx]) < 0) {
            // right element is less -> comes first
            a[i] = aux[rightIdx++];
        }
        else {
            // left element comes first (less or equal)
            a[i] = aux[leftIdx++];
        }
    }
}
function _sort(a, compare, lo, hi, aux) {
    if (hi <= lo) {
        return;
    }
    var mid = lo + ((hi - lo) / 2) | 0;
    _sort(a, compare, lo, mid, aux);
    _sort(a, compare, mid + 1, hi, aux);
    if (compare(a[mid], a[mid + 1]) <= 0) {
        // left and right are sorted and if the last-left element is less
        // or equals than the first-right element there is nothing else
        // to do
        return;
    }
    _merge(a, compare, lo, mid, hi, aux);
}
function groupBy(data, compare) {
    var result = [];
    var currentGroup = undefined;
    for (var _i = 0, _a = mergeSort(data.slice(0), compare); _i < _a.length; _i++) {
        var element = _a[_i];
        if (!currentGroup || compare(currentGroup[0], element) !== 0) {
            currentGroup = [element];
            result.push(currentGroup);
        }
        else {
            currentGroup.push(element);
        }
    }
    return result;
}
/**
 * @returns a new array with all falsy values removed. The original array IS NOT modified.
 */
function coalesce(array) {
    if (!array) {
        return array;
    }
    return array.filter(function (e) { return !!e; });
}
/**
 * @returns false if the provided object is an array and not empty.
 */
function isFalsyOrEmpty(obj) {
    return !Array.isArray(obj) || obj.length === 0;
}
/**
 * @returns True if the provided object is an array and has at least one element.
 */
function isNonEmptyArray(obj) {
    return Array.isArray(obj) && obj.length > 0;
}
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */
function distinct(array, keyFn) {
    if (!keyFn) {
        return array.filter(function (element, position) {
            return array.indexOf(element) === position;
        });
    }
    var seen = Object.create(null);
    return array.filter(function (elem) {
        var key = keyFn(elem);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    });
}
function firstIndex(array, fn) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (fn(element)) {
            return i;
        }
    }
    return -1;
}
function first(array, fn, notFoundValue) {
    if (notFoundValue === void 0) { notFoundValue = null; }
    var index = firstIndex(array, fn);
    return index < 0 ? notFoundValue : array[index];
}
function flatten(arr) {
    var _a;
    return (_a = []).concat.apply(_a, arr);
}
function range(arg, to) {
    var from = typeof to === 'number' ? arg : 0;
    if (typeof to === 'number') {
        from = arg;
    }
    else {
        from = 0;
        to = arg;
    }
    var result = [];
    if (from <= to) {
        for (var i = from; i < to; i++) {
            result.push(i);
        }
    }
    else {
        for (var i = from; i > to; i--) {
            result.push(i);
        }
    }
    return result;
}
/**
 * Insert `insertArr` inside `target` at `insertIndex`.
 * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
 */
function arrayInsert(target, insertIndex, insertArr) {
    var before = target.slice(0, insertIndex);
    var after = target.slice(insertIndex);
    return before.concat(insertArr, after);
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/cancellation.js":
/*!***********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/cancellation.js ***!
  \***********************************************************************/
/*! exports provided: CancellationToken, CancellationTokenSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancellationToken", function() { return CancellationToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancellationTokenSource", function() { return CancellationTokenSource; });
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event.js */ "./node_modules/monaco-editor/esm/vs/base/common/event.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var shortcutEvent = Object.freeze(function (callback, context) {
    var handle = setTimeout(callback.bind(context), 0);
    return { dispose: function () { clearTimeout(handle); } };
});
var CancellationToken;
(function (CancellationToken) {
    function isCancellationToken(thing) {
        if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
            return true;
        }
        if (thing instanceof MutableToken) {
            return true;
        }
        if (!thing || typeof thing !== 'object') {
            return false;
        }
        return typeof thing.isCancellationRequested === 'boolean'
            && typeof thing.onCancellationRequested === 'function';
    }
    CancellationToken.isCancellationToken = isCancellationToken;
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: _event_js__WEBPACK_IMPORTED_MODULE_0__["Event"].None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent
    });
})(CancellationToken || (CancellationToken = {}));
var MutableToken = /** @class */ (function () {
    function MutableToken() {
        this._isCancelled = false;
        this._emitter = null;
    }
    MutableToken.prototype.cancel = function () {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    };
    Object.defineProperty(MutableToken.prototype, "isCancellationRequested", {
        get: function () {
            return this._isCancelled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MutableToken.prototype, "onCancellationRequested", {
        get: function () {
            if (this._isCancelled) {
                return shortcutEvent;
            }
            if (!this._emitter) {
                this._emitter = new _event_js__WEBPACK_IMPORTED_MODULE_0__["Emitter"]();
            }
            return this._emitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MutableToken.prototype.dispose = function () {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = null;
        }
    };
    return MutableToken;
}());
var CancellationTokenSource = /** @class */ (function () {
    function CancellationTokenSource() {
    }
    Object.defineProperty(CancellationTokenSource.prototype, "token", {
        get: function () {
            if (!this._token) {
                // be lazy and create the token only when
                // actually needed
                this._token = new MutableToken();
            }
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    CancellationTokenSource.prototype.cancel = function () {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else if (this._token instanceof MutableToken) {
            // actually cancel
            this._token.cancel();
        }
    };
    CancellationTokenSource.prototype.dispose = function () {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    };
    return CancellationTokenSource;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/diff/diff.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/diff/diff.js ***!
  \********************************************************************/
/*! exports provided: stringDiff, Debug, MyArray, LcsDiff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringDiff", function() { return stringDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Debug", function() { return Debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyArray", function() { return MyArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LcsDiff", function() { return LcsDiff; });
/* harmony import */ var _diffChange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diffChange.js */ "./node_modules/monaco-editor/esm/vs/base/common/diff/diffChange.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function createStringSequence(a) {
    return {
        getLength: function () { return a.length; },
        getElementAtIndex: function (pos) { return a.charCodeAt(pos); }
    };
}
function stringDiff(original, modified, pretty) {
    return new LcsDiff(createStringSequence(original), createStringSequence(modified)).ComputeDiff(pretty);
}
//
// The code below has been ported from a C# implementation in VS
//
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.Assert = function (condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    };
    return Debug;
}());

var MyArray = /** @class */ (function () {
    function MyArray() {
    }
    /**
     * Copies a range of elements from an Array starting at the specified source index and pastes
     * them to another Array starting at the specified destination index. The length and the indexes
     * are specified as 64-bit integers.
     * sourceArray:
     *		The Array that contains the data to copy.
     * sourceIndex:
     *		A 64-bit integer that represents the index in the sourceArray at which copying begins.
     * destinationArray:
     *		The Array that receives the data.
     * destinationIndex:
     *		A 64-bit integer that represents the index in the destinationArray at which storing begins.
     * length:
     *		A 64-bit integer that represents the number of elements to copy.
     */
    MyArray.Copy = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        for (var i = 0; i < length; i++) {
            destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
        }
    };
    return MyArray;
}());

//*****************************************************************************
// LcsDiff.cs
//
// An implementation of the difference algorithm described in
// "An O(ND) Difference Algorithm and its variations" by Eugene W. Myers
//
// Copyright (C) 2008 Microsoft Corporation @minifier_do_not_preserve
//*****************************************************************************
// Our total memory usage for storing history is (worst-case):
// 2 * [(MaxDifferencesHistory + 1) * (MaxDifferencesHistory + 1) - 1] * sizeof(int)
// 2 * [1448*1448 - 1] * 4 = 16773624 = 16MB
var MaxDifferencesHistory = 1447;
//let MaxDifferencesHistory = 100;
/**
 * A utility class which helps to create the set of DiffChanges from
 * a difference operation. This class accepts original DiffElements and
 * modified DiffElements that are involved in a particular change. The
 * MarktNextChange() method can be called to mark the separation between
 * distinct changes. At the end, the Changes property can be called to retrieve
 * the constructed changes.
 */
var DiffChangeHelper = /** @class */ (function () {
    /**
     * Constructs a new DiffChangeHelper for the given DiffSequences.
     */
    function DiffChangeHelper() {
        this.m_changes = [];
        this.m_originalStart = Number.MAX_VALUE;
        this.m_modifiedStart = Number.MAX_VALUE;
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
    }
    /**
     * Marks the beginning of the next change in the set of differences.
     */
    DiffChangeHelper.prototype.MarkNextChange = function () {
        // Only add to the list if there is something to add
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
            // Add the new change to our list
            this.m_changes.push(new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount));
        }
        // Reset for the next change
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
        this.m_originalStart = Number.MAX_VALUE;
        this.m_modifiedStart = Number.MAX_VALUE;
    };
    /**
     * Adds the original element at the given position to the elements
     * affected by the current change. The modified index gives context
     * to the change position with respect to the original sequence.
     * @param originalIndex The index of the original element to add.
     * @param modifiedIndex The index of the modified element that provides corresponding position in the modified sequence.
     */
    DiffChangeHelper.prototype.AddOriginalElement = function (originalIndex, modifiedIndex) {
        // The 'true' start index is the smallest of the ones we've seen
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_originalCount++;
    };
    /**
     * Adds the modified element at the given position to the elements
     * affected by the current change. The original index gives context
     * to the change position with respect to the modified sequence.
     * @param originalIndex The index of the original element that provides corresponding position in the original sequence.
     * @param modifiedIndex The index of the modified element to add.
     */
    DiffChangeHelper.prototype.AddModifiedElement = function (originalIndex, modifiedIndex) {
        // The 'true' start index is the smallest of the ones we've seen
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_modifiedCount++;
    };
    /**
     * Retrieves all of the changes marked by the class.
     */
    DiffChangeHelper.prototype.getChanges = function () {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
            // Finish up on whatever is left
            this.MarkNextChange();
        }
        return this.m_changes;
    };
    /**
     * Retrieves all of the changes marked by the class in the reverse order
     */
    DiffChangeHelper.prototype.getReverseChanges = function () {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
            // Finish up on whatever is left
            this.MarkNextChange();
        }
        this.m_changes.reverse();
        return this.m_changes;
    };
    return DiffChangeHelper;
}());
/**
 * An implementation of the difference algorithm described in
 * "An O(ND) Difference Algorithm and its variations" by Eugene W. Myers
 */
var LcsDiff = /** @class */ (function () {
    /**
     * Constructs the DiffFinder
     */
    function LcsDiff(originalSequence, newSequence, continueProcessingPredicate) {
        if (continueProcessingPredicate === void 0) { continueProcessingPredicate = null; }
        this.OriginalSequence = originalSequence;
        this.ModifiedSequence = newSequence;
        this.ContinueProcessingPredicate = continueProcessingPredicate;
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
    }
    LcsDiff.prototype.ElementsAreEqual = function (originalIndex, newIndex) {
        return (this.OriginalSequence.getElementAtIndex(originalIndex) === this.ModifiedSequence.getElementAtIndex(newIndex));
    };
    LcsDiff.prototype.OriginalElementsAreEqual = function (index1, index2) {
        return (this.OriginalSequence.getElementAtIndex(index1) === this.OriginalSequence.getElementAtIndex(index2));
    };
    LcsDiff.prototype.ModifiedElementsAreEqual = function (index1, index2) {
        return (this.ModifiedSequence.getElementAtIndex(index1) === this.ModifiedSequence.getElementAtIndex(index2));
    };
    LcsDiff.prototype.ComputeDiff = function (pretty) {
        return this._ComputeDiff(0, this.OriginalSequence.getLength() - 1, 0, this.ModifiedSequence.getLength() - 1, pretty);
    };
    /**
     * Computes the differences between the original and modified input
     * sequences on the bounded range.
     * @returns An array of the differences between the two input sequences.
     */
    LcsDiff.prototype._ComputeDiff = function (originalStart, originalEnd, modifiedStart, modifiedEnd, pretty) {
        var quitEarlyArr = [false];
        var changes = this.ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr);
        if (pretty) {
            // We have to clean up the computed diff to be more intuitive
            // but it turns out this cannot be done correctly until the entire set
            // of diffs have been computed
            return this.PrettifyChanges(changes);
        }
        return changes;
    };
    /**
     * Private helper method which computes the differences on the bounded range
     * recursively.
     * @returns An array of the differences between the two input sequences.
     */
    LcsDiff.prototype.ComputeDiffRecursive = function (originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr) {
        quitEarlyArr[0] = false;
        // Find the start of the differences
        while (originalStart <= originalEnd && modifiedStart <= modifiedEnd && this.ElementsAreEqual(originalStart, modifiedStart)) {
            originalStart++;
            modifiedStart++;
        }
        // Find the end of the differences
        while (originalEnd >= originalStart && modifiedEnd >= modifiedStart && this.ElementsAreEqual(originalEnd, modifiedEnd)) {
            originalEnd--;
            modifiedEnd--;
        }
        // In the special case where we either have all insertions or all deletions or the sequences are identical
        if (originalStart > originalEnd || modifiedStart > modifiedEnd) {
            var changes = void 0;
            if (modifiedStart <= modifiedEnd) {
                Debug.Assert(originalStart === originalEnd + 1, 'originalStart should only be one more than originalEnd');
                // All insertions
                changes = [
                    new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](originalStart, 0, modifiedStart, modifiedEnd - modifiedStart + 1)
                ];
            }
            else if (originalStart <= originalEnd) {
                Debug.Assert(modifiedStart === modifiedEnd + 1, 'modifiedStart should only be one more than modifiedEnd');
                // All deletions
                changes = [
                    new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](originalStart, originalEnd - originalStart + 1, modifiedStart, 0)
                ];
            }
            else {
                Debug.Assert(originalStart === originalEnd + 1, 'originalStart should only be one more than originalEnd');
                Debug.Assert(modifiedStart === modifiedEnd + 1, 'modifiedStart should only be one more than modifiedEnd');
                // Identical sequences - No differences
                changes = [];
            }
            return changes;
        }
        // This problem can be solved using the Divide-And-Conquer technique.
        var midOriginalArr = [0], midModifiedArr = [0];
        var result = this.ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr);
        var midOriginal = midOriginalArr[0];
        var midModified = midModifiedArr[0];
        if (result !== null) {
            // Result is not-null when there was enough memory to compute the changes while
            // searching for the recursion point
            return result;
        }
        else if (!quitEarlyArr[0]) {
            // We can break the problem down recursively by finding the changes in the
            // First Half:   (originalStart, modifiedStart) to (midOriginal, midModified)
            // Second Half:  (midOriginal + 1, minModified + 1) to (originalEnd, modifiedEnd)
            // NOTE: ComputeDiff() is inclusive, therefore the second range starts on the next point
            var leftChanges = this.ComputeDiffRecursive(originalStart, midOriginal, modifiedStart, midModified, quitEarlyArr);
            var rightChanges = [];
            if (!quitEarlyArr[0]) {
                rightChanges = this.ComputeDiffRecursive(midOriginal + 1, originalEnd, midModified + 1, modifiedEnd, quitEarlyArr);
            }
            else {
                // We did't have time to finish the first half, so we don't have time to compute this half.
                // Consider the entire rest of the sequence different.
                rightChanges = [
                    new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](midOriginal + 1, originalEnd - (midOriginal + 1) + 1, midModified + 1, modifiedEnd - (midModified + 1) + 1)
                ];
            }
            return this.ConcatenateChanges(leftChanges, rightChanges);
        }
        // If we hit here, we quit early, and so can't return anything meaningful
        return [
            new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)
        ];
    };
    LcsDiff.prototype.WALKTRACE = function (diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr) {
        var forwardChanges = null, reverseChanges = null;
        // First, walk backward through the forward diagonals history
        var changeHelper = new DiffChangeHelper();
        var diagonalMin = diagonalForwardStart;
        var diagonalMax = diagonalForwardEnd;
        var diagonalRelative = (midOriginalArr[0] - midModifiedArr[0]) - diagonalForwardOffset;
        var lastOriginalIndex = Number.MIN_VALUE;
        var historyIndex = this.m_forwardHistory.length - 1;
        var diagonal;
        do {
            // Get the diagonal index from the relative diagonal number
            diagonal = diagonalRelative + diagonalForwardBase;
            // Figure out where we came from
            if (diagonal === diagonalMin || (diagonal < diagonalMax && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1])) {
                // Vertical line (the element is an insert)
                originalIndex = forwardPoints[diagonal + 1];
                modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
                if (originalIndex < lastOriginalIndex) {
                    changeHelper.MarkNextChange();
                }
                lastOriginalIndex = originalIndex;
                changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex);
                diagonalRelative = (diagonal + 1) - diagonalForwardBase; //Setup for the next iteration
            }
            else {
                // Horizontal line (the element is a deletion)
                originalIndex = forwardPoints[diagonal - 1] + 1;
                modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
                if (originalIndex < lastOriginalIndex) {
                    changeHelper.MarkNextChange();
                }
                lastOriginalIndex = originalIndex - 1;
                changeHelper.AddOriginalElement(originalIndex, modifiedIndex + 1);
                diagonalRelative = (diagonal - 1) - diagonalForwardBase; //Setup for the next iteration
            }
            if (historyIndex >= 0) {
                forwardPoints = this.m_forwardHistory[historyIndex];
                diagonalForwardBase = forwardPoints[0]; //We stored this in the first spot
                diagonalMin = 1;
                diagonalMax = forwardPoints.length - 1;
            }
        } while (--historyIndex >= -1);
        // Ironically, we get the forward changes as the reverse of the
        // order we added them since we technically added them backwards
        forwardChanges = changeHelper.getReverseChanges();
        if (quitEarlyArr[0]) {
            // TODO: Calculate a partial from the reverse diagonals.
            //       For now, just assume everything after the midOriginal/midModified point is a diff
            var originalStartPoint = midOriginalArr[0] + 1;
            var modifiedStartPoint = midModifiedArr[0] + 1;
            if (forwardChanges !== null && forwardChanges.length > 0) {
                var lastForwardChange = forwardChanges[forwardChanges.length - 1];
                originalStartPoint = Math.max(originalStartPoint, lastForwardChange.getOriginalEnd());
                modifiedStartPoint = Math.max(modifiedStartPoint, lastForwardChange.getModifiedEnd());
            }
            reverseChanges = [
                new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](originalStartPoint, originalEnd - originalStartPoint + 1, modifiedStartPoint, modifiedEnd - modifiedStartPoint + 1)
            ];
        }
        else {
            // Now walk backward through the reverse diagonals history
            changeHelper = new DiffChangeHelper();
            diagonalMin = diagonalReverseStart;
            diagonalMax = diagonalReverseEnd;
            diagonalRelative = (midOriginalArr[0] - midModifiedArr[0]) - diagonalReverseOffset;
            lastOriginalIndex = Number.MAX_VALUE;
            historyIndex = (deltaIsEven) ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
            do {
                // Get the diagonal index from the relative diagonal number
                diagonal = diagonalRelative + diagonalReverseBase;
                // Figure out where we came from
                if (diagonal === diagonalMin || (diagonal < diagonalMax && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1])) {
                    // Horizontal line (the element is a deletion))
                    originalIndex = reversePoints[diagonal + 1] - 1;
                    modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
                    if (originalIndex > lastOriginalIndex) {
                        changeHelper.MarkNextChange();
                    }
                    lastOriginalIndex = originalIndex + 1;
                    changeHelper.AddOriginalElement(originalIndex + 1, modifiedIndex + 1);
                    diagonalRelative = (diagonal + 1) - diagonalReverseBase; //Setup for the next iteration
                }
                else {
                    // Vertical line (the element is an insertion)
                    originalIndex = reversePoints[diagonal - 1];
                    modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
                    if (originalIndex > lastOriginalIndex) {
                        changeHelper.MarkNextChange();
                    }
                    lastOriginalIndex = originalIndex;
                    changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex + 1);
                    diagonalRelative = (diagonal - 1) - diagonalReverseBase; //Setup for the next iteration
                }
                if (historyIndex >= 0) {
                    reversePoints = this.m_reverseHistory[historyIndex];
                    diagonalReverseBase = reversePoints[0]; //We stored this in the first spot
                    diagonalMin = 1;
                    diagonalMax = reversePoints.length - 1;
                }
            } while (--historyIndex >= -1);
            // There are cases where the reverse history will find diffs that
            // are correct, but not intuitive, so we need shift them.
            reverseChanges = changeHelper.getChanges();
        }
        return this.ConcatenateChanges(forwardChanges, reverseChanges);
    };
    /**
     * Given the range to compute the diff on, this method finds the point:
     * (midOriginal, midModified)
     * that exists in the middle of the LCS of the two sequences and
     * is the point at which the LCS problem may be broken down recursively.
     * This method will try to keep the LCS trace in memory. If the LCS recursion
     * point is calculated and the full trace is available in memory, then this method
     * will return the change list.
     * @param originalStart The start bound of the original sequence range
     * @param originalEnd The end bound of the original sequence range
     * @param modifiedStart The start bound of the modified sequence range
     * @param modifiedEnd The end bound of the modified sequence range
     * @param midOriginal The middle point of the original sequence range
     * @param midModified The middle point of the modified sequence range
     * @returns The diff changes, if available, otherwise null
     */
    LcsDiff.prototype.ComputeRecursionPoint = function (originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr) {
        var originalIndex = 0, modifiedIndex = 0;
        var diagonalForwardStart = 0, diagonalForwardEnd = 0;
        var diagonalReverseStart = 0, diagonalReverseEnd = 0;
        var numDifferences;
        // To traverse the edit graph and produce the proper LCS, our actual
        // start position is just outside the given boundary
        originalStart--;
        modifiedStart--;
        // We set these up to make the compiler happy, but they will
        // be replaced before we return with the actual recursion point
        midOriginalArr[0] = 0;
        midModifiedArr[0] = 0;
        // Clear out the history
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
        // Each cell in the two arrays corresponds to a diagonal in the edit graph.
        // The integer value in the cell represents the originalIndex of the furthest
        // reaching point found so far that ends in that diagonal.
        // The modifiedIndex can be computed mathematically from the originalIndex and the diagonal number.
        var maxDifferences = (originalEnd - originalStart) + (modifiedEnd - modifiedStart);
        var numDiagonals = maxDifferences + 1;
        var forwardPoints = new Array(numDiagonals);
        var reversePoints = new Array(numDiagonals);
        // diagonalForwardBase: Index into forwardPoints of the diagonal which passes through (originalStart, modifiedStart)
        // diagonalReverseBase: Index into reversePoints of the diagonal which passes through (originalEnd, modifiedEnd)
        var diagonalForwardBase = (modifiedEnd - modifiedStart);
        var diagonalReverseBase = (originalEnd - originalStart);
        // diagonalForwardOffset: Geometric offset which allows modifiedIndex to be computed from originalIndex and the
        //    diagonal number (relative to diagonalForwardBase)
        // diagonalReverseOffset: Geometric offset which allows modifiedIndex to be computed from originalIndex and the
        //    diagonal number (relative to diagonalReverseBase)
        var diagonalForwardOffset = (originalStart - modifiedStart);
        var diagonalReverseOffset = (originalEnd - modifiedEnd);
        // delta: The difference between the end diagonal and the start diagonal. This is used to relate diagonal numbers
        //   relative to the start diagonal with diagonal numbers relative to the end diagonal.
        // The Even/Oddn-ness of this delta is important for determining when we should check for overlap
        var delta = diagonalReverseBase - diagonalForwardBase;
        var deltaIsEven = (delta % 2 === 0);
        // Here we set up the start and end points as the furthest points found so far
        // in both the forward and reverse directions, respectively
        forwardPoints[diagonalForwardBase] = originalStart;
        reversePoints[diagonalReverseBase] = originalEnd;
        // Remember if we quit early, and thus need to do a best-effort result instead of a real result.
        quitEarlyArr[0] = false;
        // A couple of points:
        // --With this method, we iterate on the number of differences between the two sequences.
        //   The more differences there actually are, the longer this will take.
        // --Also, as the number of differences increases, we have to search on diagonals further
        //   away from the reference diagonal (which is diagonalForwardBase for forward, diagonalReverseBase for reverse).
        // --We extend on even diagonals (relative to the reference diagonal) only when numDifferences
        //   is even and odd diagonals only when numDifferences is odd.
        var diagonal, tempOriginalIndex;
        for (numDifferences = 1; numDifferences <= (maxDifferences / 2) + 1; numDifferences++) {
            var furthestOriginalIndex = 0;
            var furthestModifiedIndex = 0;
            // Run the algorithm in the forward direction
            diagonalForwardStart = this.ClipDiagonalBound(diagonalForwardBase - numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
            diagonalForwardEnd = this.ClipDiagonalBound(diagonalForwardBase + numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
            for (diagonal = diagonalForwardStart; diagonal <= diagonalForwardEnd; diagonal += 2) {
                // STEP 1: We extend the furthest reaching point in the present diagonal
                // by looking at the diagonals above and below and picking the one whose point
                // is further away from the start point (originalStart, modifiedStart)
                if (diagonal === diagonalForwardStart || (diagonal < diagonalForwardEnd && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1])) {
                    originalIndex = forwardPoints[diagonal + 1];
                }
                else {
                    originalIndex = forwardPoints[diagonal - 1] + 1;
                }
                modifiedIndex = originalIndex - (diagonal - diagonalForwardBase) - diagonalForwardOffset;
                // Save the current originalIndex so we can test for false overlap in step 3
                tempOriginalIndex = originalIndex;
                // STEP 2: We can continue to extend the furthest reaching point in the present diagonal
                // so long as the elements are equal.
                while (originalIndex < originalEnd && modifiedIndex < modifiedEnd && this.ElementsAreEqual(originalIndex + 1, modifiedIndex + 1)) {
                    originalIndex++;
                    modifiedIndex++;
                }
                forwardPoints[diagonal] = originalIndex;
                if (originalIndex + modifiedIndex > furthestOriginalIndex + furthestModifiedIndex) {
                    furthestOriginalIndex = originalIndex;
                    furthestModifiedIndex = modifiedIndex;
                }
                // STEP 3: If delta is odd (overlap first happens on forward when delta is odd)
                // and diagonal is in the range of reverse diagonals computed for numDifferences-1
                // (the previous iteration; we haven't computed reverse diagonals for numDifferences yet)
                // then check for overlap.
                if (!deltaIsEven && Math.abs(diagonal - diagonalReverseBase) <= (numDifferences - 1)) {
                    if (originalIndex >= reversePoints[diagonal]) {
                        midOriginalArr[0] = originalIndex;
                        midModifiedArr[0] = modifiedIndex;
                        if (tempOriginalIndex <= reversePoints[diagonal] && MaxDifferencesHistory > 0 && numDifferences <= (MaxDifferencesHistory + 1)) {
                            // BINGO! We overlapped, and we have the full trace in memory!
                            return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                        }
                        else {
                            // Either false overlap, or we didn't have enough memory for the full trace
                            // Just return the recursion point
                            return null;
                        }
                    }
                }
            }
            // Check to see if we should be quitting early, before moving on to the next iteration.
            var matchLengthOfLongest = ((furthestOriginalIndex - originalStart) + (furthestModifiedIndex - modifiedStart) - numDifferences) / 2;
            if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(furthestOriginalIndex, this.OriginalSequence, matchLengthOfLongest)) {
                // We can't finish, so skip ahead to generating a result from what we have.
                quitEarlyArr[0] = true;
                // Use the furthest distance we got in the forward direction.
                midOriginalArr[0] = furthestOriginalIndex;
                midModifiedArr[0] = furthestModifiedIndex;
                if (matchLengthOfLongest > 0 && MaxDifferencesHistory > 0 && numDifferences <= (MaxDifferencesHistory + 1)) {
                    // Enough of the history is in memory to walk it backwards
                    return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                }
                else {
                    // We didn't actually remember enough of the history.
                    //Since we are quiting the diff early, we need to shift back the originalStart and modified start
                    //back into the boundary limits since we decremented their value above beyond the boundary limit.
                    originalStart++;
                    modifiedStart++;
                    return [
                        new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)
                    ];
                }
            }
            // Run the algorithm in the reverse direction
            diagonalReverseStart = this.ClipDiagonalBound(diagonalReverseBase - numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
            diagonalReverseEnd = this.ClipDiagonalBound(diagonalReverseBase + numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
            for (diagonal = diagonalReverseStart; diagonal <= diagonalReverseEnd; diagonal += 2) {
                // STEP 1: We extend the furthest reaching point in the present diagonal
                // by looking at the diagonals above and below and picking the one whose point
                // is further away from the start point (originalEnd, modifiedEnd)
                if (diagonal === diagonalReverseStart || (diagonal < diagonalReverseEnd && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1])) {
                    originalIndex = reversePoints[diagonal + 1] - 1;
                }
                else {
                    originalIndex = reversePoints[diagonal - 1];
                }
                modifiedIndex = originalIndex - (diagonal - diagonalReverseBase) - diagonalReverseOffset;
                // Save the current originalIndex so we can test for false overlap
                tempOriginalIndex = originalIndex;
                // STEP 2: We can continue to extend the furthest reaching point in the present diagonal
                // as long as the elements are equal.
                while (originalIndex > originalStart && modifiedIndex > modifiedStart && this.ElementsAreEqual(originalIndex, modifiedIndex)) {
                    originalIndex--;
                    modifiedIndex--;
                }
                reversePoints[diagonal] = originalIndex;
                // STEP 4: If delta is even (overlap first happens on reverse when delta is even)
                // and diagonal is in the range of forward diagonals computed for numDifferences
                // then check for overlap.
                if (deltaIsEven && Math.abs(diagonal - diagonalForwardBase) <= numDifferences) {
                    if (originalIndex <= forwardPoints[diagonal]) {
                        midOriginalArr[0] = originalIndex;
                        midModifiedArr[0] = modifiedIndex;
                        if (tempOriginalIndex >= forwardPoints[diagonal] && MaxDifferencesHistory > 0 && numDifferences <= (MaxDifferencesHistory + 1)) {
                            // BINGO! We overlapped, and we have the full trace in memory!
                            return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                        }
                        else {
                            // Either false overlap, or we didn't have enough memory for the full trace
                            // Just return the recursion point
                            return null;
                        }
                    }
                }
            }
            // Save current vectors to history before the next iteration
            if (numDifferences <= MaxDifferencesHistory) {
                // We are allocating space for one extra int, which we fill with
                // the index of the diagonal base index
                var temp = new Array(diagonalForwardEnd - diagonalForwardStart + 2);
                temp[0] = diagonalForwardBase - diagonalForwardStart + 1;
                MyArray.Copy(forwardPoints, diagonalForwardStart, temp, 1, diagonalForwardEnd - diagonalForwardStart + 1);
                this.m_forwardHistory.push(temp);
                temp = new Array(diagonalReverseEnd - diagonalReverseStart + 2);
                temp[0] = diagonalReverseBase - diagonalReverseStart + 1;
                MyArray.Copy(reversePoints, diagonalReverseStart, temp, 1, diagonalReverseEnd - diagonalReverseStart + 1);
                this.m_reverseHistory.push(temp);
            }
        }
        // If we got here, then we have the full trace in history. We just have to convert it to a change list
        // NOTE: This part is a bit messy
        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
    };
    /**
     * Shifts the given changes to provide a more intuitive diff.
     * While the first element in a diff matches the first element after the diff,
     * we shift the diff down.
     *
     * @param changes The list of changes to shift
     * @returns The shifted changes
     */
    LcsDiff.prototype.PrettifyChanges = function (changes) {
        // Shift all the changes down first
        for (var i = 0; i < changes.length; i++) {
            var change = changes[i];
            var originalStop = (i < changes.length - 1) ? changes[i + 1].originalStart : this.OriginalSequence.getLength();
            var modifiedStop = (i < changes.length - 1) ? changes[i + 1].modifiedStart : this.ModifiedSequence.getLength();
            var checkOriginal = change.originalLength > 0;
            var checkModified = change.modifiedLength > 0;
            while (change.originalStart + change.originalLength < originalStop &&
                change.modifiedStart + change.modifiedLength < modifiedStop &&
                (!checkOriginal || this.OriginalElementsAreEqual(change.originalStart, change.originalStart + change.originalLength)) &&
                (!checkModified || this.ModifiedElementsAreEqual(change.modifiedStart, change.modifiedStart + change.modifiedLength))) {
                change.originalStart++;
                change.modifiedStart++;
            }
            var mergedChangeArr = [null];
            if (i < changes.length - 1 && this.ChangesOverlap(changes[i], changes[i + 1], mergedChangeArr)) {
                changes[i] = mergedChangeArr[0];
                changes.splice(i + 1, 1);
                i--;
                continue;
            }
        }
        // Shift changes back up until we hit empty or whitespace-only lines
        for (var i = changes.length - 1; i >= 0; i--) {
            var change = changes[i];
            var originalStop = 0;
            var modifiedStop = 0;
            if (i > 0) {
                var prevChange = changes[i - 1];
                if (prevChange.originalLength > 0) {
                    originalStop = prevChange.originalStart + prevChange.originalLength;
                }
                if (prevChange.modifiedLength > 0) {
                    modifiedStop = prevChange.modifiedStart + prevChange.modifiedLength;
                }
            }
            var checkOriginal = change.originalLength > 0;
            var checkModified = change.modifiedLength > 0;
            var bestDelta = 0;
            var bestScore = this._boundaryScore(change.originalStart, change.originalLength, change.modifiedStart, change.modifiedLength);
            for (var delta = 1;; delta++) {
                var originalStart = change.originalStart - delta;
                var modifiedStart = change.modifiedStart - delta;
                if (originalStart < originalStop || modifiedStart < modifiedStop) {
                    break;
                }
                if (checkOriginal && !this.OriginalElementsAreEqual(originalStart, originalStart + change.originalLength)) {
                    break;
                }
                if (checkModified && !this.ModifiedElementsAreEqual(modifiedStart, modifiedStart + change.modifiedLength)) {
                    break;
                }
                var score = this._boundaryScore(originalStart, change.originalLength, modifiedStart, change.modifiedLength);
                if (score > bestScore) {
                    bestScore = score;
                    bestDelta = delta;
                }
            }
            change.originalStart -= bestDelta;
            change.modifiedStart -= bestDelta;
        }
        return changes;
    };
    LcsDiff.prototype._OriginalIsBoundary = function (index) {
        if (index <= 0 || index >= this.OriginalSequence.getLength() - 1) {
            return true;
        }
        var element = this.OriginalSequence.getElementAtIndex(index);
        return (typeof element === 'string' && /^\s*$/.test(element));
    };
    LcsDiff.prototype._OriginalRegionIsBoundary = function (originalStart, originalLength) {
        if (this._OriginalIsBoundary(originalStart) || this._OriginalIsBoundary(originalStart - 1)) {
            return true;
        }
        if (originalLength > 0) {
            var originalEnd = originalStart + originalLength;
            if (this._OriginalIsBoundary(originalEnd - 1) || this._OriginalIsBoundary(originalEnd)) {
                return true;
            }
        }
        return false;
    };
    LcsDiff.prototype._ModifiedIsBoundary = function (index) {
        if (index <= 0 || index >= this.ModifiedSequence.getLength() - 1) {
            return true;
        }
        var element = this.ModifiedSequence.getElementAtIndex(index);
        return (typeof element === 'string' && /^\s*$/.test(element));
    };
    LcsDiff.prototype._ModifiedRegionIsBoundary = function (modifiedStart, modifiedLength) {
        if (this._ModifiedIsBoundary(modifiedStart) || this._ModifiedIsBoundary(modifiedStart - 1)) {
            return true;
        }
        if (modifiedLength > 0) {
            var modifiedEnd = modifiedStart + modifiedLength;
            if (this._ModifiedIsBoundary(modifiedEnd - 1) || this._ModifiedIsBoundary(modifiedEnd)) {
                return true;
            }
        }
        return false;
    };
    LcsDiff.prototype._boundaryScore = function (originalStart, originalLength, modifiedStart, modifiedLength) {
        var originalScore = (this._OriginalRegionIsBoundary(originalStart, originalLength) ? 1 : 0);
        var modifiedScore = (this._ModifiedRegionIsBoundary(modifiedStart, modifiedLength) ? 1 : 0);
        return (originalScore + modifiedScore);
    };
    /**
     * Concatenates the two input DiffChange lists and returns the resulting
     * list.
     * @param The left changes
     * @param The right changes
     * @returns The concatenated list
     */
    LcsDiff.prototype.ConcatenateChanges = function (left, right) {
        var mergedChangeArr = [];
        if (left.length === 0 || right.length === 0) {
            return (right.length > 0) ? right : left;
        }
        else if (this.ChangesOverlap(left[left.length - 1], right[0], mergedChangeArr)) {
            // Since we break the problem down recursively, it is possible that we
            // might recurse in the middle of a change thereby splitting it into
            // two changes. Here in the combining stage, we detect and fuse those
            // changes back together
            var result = new Array(left.length + right.length - 1);
            MyArray.Copy(left, 0, result, 0, left.length - 1);
            result[left.length - 1] = mergedChangeArr[0];
            MyArray.Copy(right, 1, result, left.length, right.length - 1);
            return result;
        }
        else {
            var result = new Array(left.length + right.length);
            MyArray.Copy(left, 0, result, 0, left.length);
            MyArray.Copy(right, 0, result, left.length, right.length);
            return result;
        }
    };
    /**
     * Returns true if the two changes overlap and can be merged into a single
     * change
     * @param left The left change
     * @param right The right change
     * @param mergedChange The merged change if the two overlap, null otherwise
     * @returns True if the two changes overlap
     */
    LcsDiff.prototype.ChangesOverlap = function (left, right, mergedChangeArr) {
        Debug.Assert(left.originalStart <= right.originalStart, 'Left change is not less than or equal to right change');
        Debug.Assert(left.modifiedStart <= right.modifiedStart, 'Left change is not less than or equal to right change');
        if (left.originalStart + left.originalLength >= right.originalStart || left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
            var originalStart = left.originalStart;
            var originalLength = left.originalLength;
            var modifiedStart = left.modifiedStart;
            var modifiedLength = left.modifiedLength;
            if (left.originalStart + left.originalLength >= right.originalStart) {
                originalLength = right.originalStart + right.originalLength - left.originalStart;
            }
            if (left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
                modifiedLength = right.modifiedStart + right.modifiedLength - left.modifiedStart;
            }
            mergedChangeArr[0] = new _diffChange_js__WEBPACK_IMPORTED_MODULE_0__["DiffChange"](originalStart, originalLength, modifiedStart, modifiedLength);
            return true;
        }
        else {
            mergedChangeArr[0] = null;
            return false;
        }
    };
    /**
     * Helper method used to clip a diagonal index to the range of valid
     * diagonals. This also decides whether or not the diagonal index,
     * if it exceeds the boundary, should be clipped to the boundary or clipped
     * one inside the boundary depending on the Even/Odd status of the boundary
     * and numDifferences.
     * @param diagonal The index of the diagonal to clip.
     * @param numDifferences The current number of differences being iterated upon.
     * @param diagonalBaseIndex The base reference diagonal.
     * @param numDiagonals The total number of diagonals.
     * @returns The clipped diagonal index.
     */
    LcsDiff.prototype.ClipDiagonalBound = function (diagonal, numDifferences, diagonalBaseIndex, numDiagonals) {
        if (diagonal >= 0 && diagonal < numDiagonals) {
            // Nothing to clip, its in range
            return diagonal;
        }
        // diagonalsBelow: The number of diagonals below the reference diagonal
        // diagonalsAbove: The number of diagonals above the reference diagonal
        var diagonalsBelow = diagonalBaseIndex;
        var diagonalsAbove = numDiagonals - diagonalBaseIndex - 1;
        var diffEven = (numDifferences % 2 === 0);
        if (diagonal < 0) {
            var lowerBoundEven = (diagonalsBelow % 2 === 0);
            return (diffEven === lowerBoundEven) ? 0 : 1;
        }
        else {
            var upperBoundEven = (diagonalsAbove % 2 === 0);
            return (diffEven === upperBoundEven) ? numDiagonals - 1 : numDiagonals - 2;
        }
    };
    return LcsDiff;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/diff/diffChange.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/diff/diffChange.js ***!
  \**************************************************************************/
/*! exports provided: DiffChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiffChange", function() { return DiffChange; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Represents information about a specific difference between two sequences.
 */
var DiffChange = /** @class */ (function () {
    /**
     * Constructs a new DiffChange with the given sequence information
     * and content.
     */
    function DiffChange(originalStart, originalLength, modifiedStart, modifiedLength) {
        //Debug.Assert(originalLength > 0 || modifiedLength > 0, "originalLength and modifiedLength cannot both be <= 0");
        this.originalStart = originalStart;
        this.originalLength = originalLength;
        this.modifiedStart = modifiedStart;
        this.modifiedLength = modifiedLength;
    }
    /**
     * The end point (exclusive) of the change in the original sequence.
     */
    DiffChange.prototype.getOriginalEnd = function () {
        return this.originalStart + this.originalLength;
    };
    /**
     * The end point (exclusive) of the change in the modified sequence.
     */
    DiffChange.prototype.getModifiedEnd = function () {
        return this.modifiedStart + this.modifiedLength;
    };
    return DiffChange;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/errors.js":
/*!*****************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/errors.js ***!
  \*****************************************************************/
/*! exports provided: ErrorHandler, errorHandler, onUnexpectedError, onUnexpectedExternalError, transformErrorForSerialization, isPromiseCanceledError, canceled, illegalArgument, illegalState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorHandler", function() { return ErrorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onUnexpectedError", function() { return onUnexpectedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onUnexpectedExternalError", function() { return onUnexpectedExternalError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformErrorForSerialization", function() { return transformErrorForSerialization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromiseCanceledError", function() { return isPromiseCanceledError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canceled", function() { return canceled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "illegalArgument", function() { return illegalArgument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "illegalState", function() { return illegalState; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Avoid circular dependency on EventEmitter by implementing a subset of the interface.
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
        this.listeners = [];
        this.unexpectedErrorHandler = function (e) {
            setTimeout(function () {
                if (e.stack) {
                    throw new Error(e.message + '\n\n' + e.stack);
                }
                throw e;
            }, 0);
        };
    }
    ErrorHandler.prototype.emit = function (e) {
        this.listeners.forEach(function (listener) {
            listener(e);
        });
    };
    ErrorHandler.prototype.onUnexpectedError = function (e) {
        this.unexpectedErrorHandler(e);
        this.emit(e);
    };
    // For external errors, we don't want the listeners to be called
    ErrorHandler.prototype.onUnexpectedExternalError = function (e) {
        this.unexpectedErrorHandler(e);
    };
    return ErrorHandler;
}());

var errorHandler = new ErrorHandler();
function onUnexpectedError(e) {
    // ignore errors from cancelled promises
    if (!isPromiseCanceledError(e)) {
        errorHandler.onUnexpectedError(e);
    }
    return undefined;
}
function onUnexpectedExternalError(e) {
    // ignore errors from cancelled promises
    if (!isPromiseCanceledError(e)) {
        errorHandler.onUnexpectedExternalError(e);
    }
    return undefined;
}
function transformErrorForSerialization(error) {
    if (error instanceof Error) {
        var name_1 = error.name, message = error.message;
        var stack = error.stacktrace || error.stack;
        return {
            $isError: true,
            name: name_1,
            message: message,
            stack: stack
        };
    }
    // return as is
    return error;
}
var canceledName = 'Canceled';
/**
 * Checks if the given error is a promise in canceled state
 */
function isPromiseCanceledError(error) {
    return error instanceof Error && error.name === canceledName && error.message === canceledName;
}
/**
 * Returns an error that signals cancellation.
 */
function canceled() {
    var error = new Error(canceledName);
    error.name = error.message;
    return error;
}
function illegalArgument(name) {
    if (name) {
        return new Error("Illegal argument: " + name);
    }
    else {
        return new Error('Illegal argument');
    }
}
function illegalState(name) {
    if (name) {
        return new Error("Illegal state: " + name);
    }
    else {
        return new Error('Illegal state');
    }
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/event.js":
/*!****************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/event.js ***!
  \****************************************************************/
/*! exports provided: Event, Emitter, EventMultiplexer, EventBufferer, Relay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventMultiplexer", function() { return EventMultiplexer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBufferer", function() { return EventBufferer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Relay", function() { return Relay; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./node_modules/monaco-editor/esm/vs/base/common/errors.js");
/* harmony import */ var _functional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functional.js */ "./node_modules/monaco-editor/esm/vs/base/common/functional.js");
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/monaco-editor/esm/vs/base/common/lifecycle.js");
/* harmony import */ var _linkedList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./linkedList.js */ "./node_modules/monaco-editor/esm/vs/base/common/linkedList.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/




var Event;
(function (Event) {
    var _disposable = { dispose: function () { } };
    Event.None = function () { return _disposable; };
    /**
     * Given an event, returns another event which only fires once.
     */
    function once(event) {
        return function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            // we need this, in case the event fires during the listener call
            var didFire = false;
            var result;
            result = event(function (e) {
                if (didFire) {
                    return;
                }
                else if (result) {
                    result.dispose();
                }
                else {
                    didFire = true;
                }
                return listener.call(thisArgs, e);
            }, null, disposables);
            if (didFire) {
                result.dispose();
            }
            return result;
        };
    }
    Event.once = once;
    /**
     * Given an event and a `map` function, returns another event which maps each element
     * throught the mapping function.
     */
    function map(event, map) {
        return snapshot(function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return event(function (i) { return listener.call(thisArgs, map(i)); }, null, disposables);
        });
    }
    Event.map = map;
    /**
     * Given an event and an `each` function, returns another identical event and calls
     * the `each` function per each element.
     */
    function forEach(event, each) {
        return snapshot(function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return event(function (i) { each(i); listener.call(thisArgs, i); }, null, disposables);
        });
    }
    Event.forEach = forEach;
    function filter(event, filter) {
        return snapshot(function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return event(function (e) { return filter(e) && listener.call(thisArgs, e); }, null, disposables);
        });
    }
    Event.filter = filter;
    /**
     * Given an event, returns the same event but typed as `Event<void>`.
     */
    function signal(event) {
        return event;
    }
    Event.signal = signal;
    /**
     * Given a collection of events, returns a single event which emits
     * whenever any of the provided events emit.
     */
    function any() {
        var events = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            events[_i] = arguments[_i];
        }
        return function (listener, thisArgs, disposables) {
            if (thisArgs === void 0) { thisArgs = null; }
            return Object(_lifecycle_js__WEBPACK_IMPORTED_MODULE_2__["combinedDisposable"])(events.map(function (event) { return event(function (e) { return listener.call(thisArgs, e); }, null, disposables); }));
        };
    }
    Event.any = any;
    /**
     * Given an event and a `merge` function, returns another event which maps each element
     * and the cummulative result throught the `merge` function. Similar to `map`, but with memory.
     */
    function reduce(event, merge, initial) {
        var output = initial;
        return map(event, function (e) {
            output = merge(output, e);
            return output;
        });
    }
    Event.reduce = reduce;
    /**
     * Given a chain of event processing functions (filter, map, etc), each
     * function will be invoked per event & per listener. Snapshotting an event
     * chain allows each function to be invoked just once per event.
     */
    function snapshot(event) {
        var listener;
        var emitter = new Emitter({
            onFirstListenerAdd: function () {
                listener = event(emitter.fire, emitter);
            },
            onLastListenerRemove: function () {
                listener.dispose();
            }
        });
        return emitter.event;
    }
    Event.snapshot = snapshot;
    function debounce(event, merge, delay, leading, leakWarningThreshold) {
        if (delay === void 0) { delay = 100; }
        if (leading === void 0) { leading = false; }
        var subscription;
        var output = undefined;
        var handle = undefined;
        var numDebouncedCalls = 0;
        var emitter = new Emitter({
            leakWarningThreshold: leakWarningThreshold,
            onFirstListenerAdd: function () {
                subscription = event(function (cur) {
                    numDebouncedCalls++;
                    output = merge(output, cur);
                    if (leading && !handle) {
                        emitter.fire(output);
                    }
                    clearTimeout(handle);
                    handle = setTimeout(function () {
                        var _output = output;
                        output = undefined;
                        handle = undefined;
                        if (!leading || numDebouncedCalls > 1) {
                            emitter.fire(_output);
                        }
                        numDebouncedCalls = 0;
                    }, delay);
                });
            },
            onLastListenerRemove: function () {
                subscription.dispose();
            }
        });
        return emitter.event;
    }
    Event.debounce = debounce;
    /**
     * Given an event, it returns another event which fires only once and as soon as
     * the input event emits. The event data is the number of millis it took for the
     * event to fire.
     */
    function stopwatch(event) {
        var start = new Date().getTime();
        return map(once(event), function (_) { return new Date().getTime() - start; });
    }
    Event.stopwatch = stopwatch;
    /**
     * Given an event, it returns another event which fires only when the event
     * element changes.
     */
    function latch(event) {
        var firstCall = true;
        var cache;
        return filter(event, function (value) {
            var shouldEmit = firstCall || value !== cache;
            firstCall = false;
            cache = value;
            return shouldEmit;
        });
    }
    Event.latch = latch;
    /**
     * Buffers the provided event until a first listener comes
     * along, at which point fire all the events at once and
     * pipe the event from then on.
     *
     * ```typescript
     * const emitter = new Emitter<number>();
     * const event = emitter.event;
     * const bufferedEvent = buffer(event);
     *
     * emitter.fire(1);
     * emitter.fire(2);
     * emitter.fire(3);
     * // nothing...
     *
     * const listener = bufferedEvent(num => console.log(num));
     * // 1, 2, 3
     *
     * emitter.fire(4);
     * // 4
     * ```
     */
    function buffer(event, nextTick, _buffer) {
        if (nextTick === void 0) { nextTick = false; }
        if (_buffer === void 0) { _buffer = []; }
        var buffer = _buffer.slice();
        var listener = event(function (e) {
            if (buffer) {
                buffer.push(e);
            }
            else {
                emitter.fire(e);
            }
        });
        var flush = function () {
            if (buffer) {
                buffer.forEach(function (e) { return emitter.fire(e); });
            }
            buffer = null;
        };
        var emitter = new Emitter({
            onFirstListenerAdd: function () {
                if (!listener) {
                    listener = event(function (e) { return emitter.fire(e); });
                }
            },
            onFirstListenerDidAdd: function () {
                if (buffer) {
                    if (nextTick) {
                        setTimeout(flush);
                    }
                    else {
                        flush();
                    }
                }
            },
            onLastListenerRemove: function () {
                if (listener) {
                    listener.dispose();
                }
                listener = null;
            }
        });
        return emitter.event;
    }
    Event.buffer = buffer;
    /**
     * Similar to `buffer` but it buffers indefinitely and repeats
     * the buffered events to every new listener.
     */
    function echo(event, nextTick, buffer) {
        if (nextTick === void 0) { nextTick = false; }
        if (buffer === void 0) { buffer = []; }
        buffer = buffer.slice();
        event(function (e) {
            buffer.push(e);
            emitter.fire(e);
        });
        var flush = function (listener, thisArgs) { return buffer.forEach(function (e) { return listener.call(thisArgs, e); }); };
        var emitter = new Emitter({
            onListenerDidAdd: function (emitter, listener, thisArgs) {
                if (nextTick) {
                    setTimeout(function () { return flush(listener, thisArgs); });
                }
                else {
                    flush(listener, thisArgs);
                }
            }
        });
        return emitter.event;
    }
    Event.echo = echo;
    var ChainableEvent = /** @class */ (function () {
        function ChainableEvent(event) {
            this.event = event;
        }
        ChainableEvent.prototype.map = function (fn) {
            return new ChainableEvent(map(this.event, fn));
        };
        ChainableEvent.prototype.forEach = function (fn) {
            return new ChainableEvent(forEach(this.event, fn));
        };
        ChainableEvent.prototype.filter = function (fn) {
            return new ChainableEvent(filter(this.event, fn));
        };
        ChainableEvent.prototype.reduce = function (merge, initial) {
            return new ChainableEvent(reduce(this.event, merge, initial));
        };
        ChainableEvent.prototype.latch = function () {
            return new ChainableEvent(latch(this.event));
        };
        ChainableEvent.prototype.on = function (listener, thisArgs, disposables) {
            return this.event(listener, thisArgs, disposables);
        };
        ChainableEvent.prototype.once = function (listener, thisArgs, disposables) {
            return once(this.event)(listener, thisArgs, disposables);
        };
        return ChainableEvent;
    }());
    function chain(event) {
        return new ChainableEvent(event);
    }
    Event.chain = chain;
    function fromNodeEventEmitter(emitter, eventName, map) {
        if (map === void 0) { map = function (id) { return id; }; }
        var fn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return result.fire(map.apply(void 0, args));
        };
        var onFirstListenerAdd = function () { return emitter.on(eventName, fn); };
        var onLastListenerRemove = function () { return emitter.removeListener(eventName, fn); };
        var result = new Emitter({ onFirstListenerAdd: onFirstListenerAdd, onLastListenerRemove: onLastListenerRemove });
        return result.event;
    }
    Event.fromNodeEventEmitter = fromNodeEventEmitter;
    function fromPromise(promise) {
        var emitter = new Emitter();
        var shouldEmit = false;
        promise
            .then(undefined, function () { return null; })
            .then(function () {
            if (!shouldEmit) {
                setTimeout(function () { return emitter.fire(undefined); }, 0);
            }
            else {
                emitter.fire(undefined);
            }
        });
        shouldEmit = true;
        return emitter.event;
    }
    Event.fromPromise = fromPromise;
    function toPromise(event) {
        return new Promise(function (c) { return once(event)(c); });
    }
    Event.toPromise = toPromise;
})(Event || (Event = {}));
var _globalLeakWarningThreshold = -1;
var LeakageMonitor = /** @class */ (function () {
    function LeakageMonitor(customThreshold, name) {
        if (name === void 0) { name = Math.random().toString(18).slice(2, 5); }
        this.customThreshold = customThreshold;
        this.name = name;
        this._warnCountdown = 0;
    }
    LeakageMonitor.prototype.dispose = function () {
        if (this._stacks) {
            this._stacks.clear();
        }
    };
    LeakageMonitor.prototype.check = function (listenerCount) {
        var _this = this;
        var threshold = _globalLeakWarningThreshold;
        if (typeof this.customThreshold === 'number') {
            threshold = this.customThreshold;
        }
        if (threshold <= 0 || listenerCount < threshold) {
            return undefined;
        }
        if (!this._stacks) {
            this._stacks = new Map();
        }
        var stack = new Error().stack.split('\n').slice(3).join('\n');
        var count = (this._stacks.get(stack) || 0);
        this._stacks.set(stack, count + 1);
        this._warnCountdown -= 1;
        if (this._warnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._warnCountdown = threshold * 0.5;
            // find most frequent listener and print warning
            var topStack_1;
            var topCount_1 = 0;
            this._stacks.forEach(function (count, stack) {
                if (!topStack_1 || topCount_1 < count) {
                    topStack_1 = stack;
                    topCount_1 = count;
                }
            });
            console.warn("[" + this.name + "] potential listener LEAK detected, having " + listenerCount + " listeners already. MOST frequent listener (" + topCount_1 + "):");
            console.warn(topStack_1);
        }
        return function () {
            var count = (_this._stacks.get(stack) || 0);
            _this._stacks.set(stack, count - 1);
        };
    };
    return LeakageMonitor;
}());
/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
    class Document {

        private _onDidChange = new Emitter<(value:string)=>any>();

        public onDidChange = this._onDidChange.event;

        // getter-style
        // get onDidChange(): Event<(value:string)=>any> {
        // 	return this._onDidChange.event;
        // }

        private _doIt() {
            //...
            this._onDidChange.fire(value);
        }
    }
 */
var Emitter = /** @class */ (function () {
    function Emitter(options) {
        this._disposed = false;
        this._options = options;
        this._leakageMon = _globalLeakWarningThreshold > 0
            ? new LeakageMonitor(this._options && this._options.leakWarningThreshold)
            : undefined;
    }
    Object.defineProperty(Emitter.prototype, "event", {
        /**
         * For the public to allow to subscribe
         * to events from this Emitter
         */
        get: function () {
            var _this = this;
            if (!this._event) {
                this._event = function (listener, thisArgs, disposables) {
                    if (!_this._listeners) {
                        _this._listeners = new _linkedList_js__WEBPACK_IMPORTED_MODULE_3__["LinkedList"]();
                    }
                    var firstListener = _this._listeners.isEmpty();
                    if (firstListener && _this._options && _this._options.onFirstListenerAdd) {
                        _this._options.onFirstListenerAdd(_this);
                    }
                    var remove = _this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
                    if (firstListener && _this._options && _this._options.onFirstListenerDidAdd) {
                        _this._options.onFirstListenerDidAdd(_this);
                    }
                    if (_this._options && _this._options.onListenerDidAdd) {
                        _this._options.onListenerDidAdd(_this, listener, thisArgs);
                    }
                    // check and record this emitter for potential leakage
                    var removeMonitor;
                    if (_this._leakageMon) {
                        removeMonitor = _this._leakageMon.check(_this._listeners.size);
                    }
                    var result;
                    result = {
                        dispose: function () {
                            if (removeMonitor) {
                                removeMonitor();
                            }
                            result.dispose = Emitter._noop;
                            if (!_this._disposed) {
                                remove();
                                if (_this._options && _this._options.onLastListenerRemove) {
                                    var hasListeners = (_this._listeners && !_this._listeners.isEmpty());
                                    if (!hasListeners) {
                                        _this._options.onLastListenerRemove(_this);
                                    }
                                }
                            }
                        }
                    };
                    if (Array.isArray(disposables)) {
                        disposables.push(result);
                    }
                    return result;
                };
            }
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    Emitter.prototype.fire = function (event) {
        if (this._listeners) {
            // put all [listener,event]-pairs into delivery queue
            // then emit all event. an inner/nested event might be
            // the driver of this
            if (!this._deliveryQueue) {
                this._deliveryQueue = [];
            }
            for (var iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
                this._deliveryQueue.push([e.value, event]);
            }
            while (this._deliveryQueue.length > 0) {
                var _a = this._deliveryQueue.shift(), listener = _a[0], event_1 = _a[1];
                try {
                    if (typeof listener === 'function') {
                        listener.call(undefined, event_1);
                    }
                    else {
                        listener[0].call(listener[1], event_1);
                    }
                }
                catch (e) {
                    Object(_errors_js__WEBPACK_IMPORTED_MODULE_0__["onUnexpectedError"])(e);
                }
            }
        }
    };
    Emitter.prototype.dispose = function () {
        if (this._listeners) {
            this._listeners = undefined;
        }
        if (this._deliveryQueue) {
            this._deliveryQueue.length = 0;
        }
        if (this._leakageMon) {
            this._leakageMon.dispose();
        }
        this._disposed = true;
    };
    Emitter._noop = function () { };
    return Emitter;
}());

var EventMultiplexer = /** @class */ (function () {
    function EventMultiplexer() {
        var _this = this;
        this.hasListeners = false;
        this.events = [];
        this.emitter = new Emitter({
            onFirstListenerAdd: function () { return _this.onFirstListenerAdd(); },
            onLastListenerRemove: function () { return _this.onLastListenerRemove(); }
        });
    }
    Object.defineProperty(EventMultiplexer.prototype, "event", {
        get: function () {
            return this.emitter.event;
        },
        enumerable: true,
        configurable: true
    });
    EventMultiplexer.prototype.add = function (event) {
        var _this = this;
        var e = { event: event, listener: null };
        this.events.push(e);
        if (this.hasListeners) {
            this.hook(e);
        }
        var dispose = function () {
            if (_this.hasListeners) {
                _this.unhook(e);
            }
            var idx = _this.events.indexOf(e);
            _this.events.splice(idx, 1);
        };
        return Object(_lifecycle_js__WEBPACK_IMPORTED_MODULE_2__["toDisposable"])(Object(_functional_js__WEBPACK_IMPORTED_MODULE_1__["once"])(dispose));
    };
    EventMultiplexer.prototype.onFirstListenerAdd = function () {
        var _this = this;
        this.hasListeners = true;
        this.events.forEach(function (e) { return _this.hook(e); });
    };
    EventMultiplexer.prototype.onLastListenerRemove = function () {
        var _this = this;
        this.hasListeners = false;
        this.events.forEach(function (e) { return _this.unhook(e); });
    };
    EventMultiplexer.prototype.hook = function (e) {
        var _this = this;
        e.listener = e.event(function (r) { return _this.emitter.fire(r); });
    };
    EventMultiplexer.prototype.unhook = function (e) {
        if (e.listener) {
            e.listener.dispose();
        }
        e.listener = null;
    };
    EventMultiplexer.prototype.dispose = function () {
        this.emitter.dispose();
    };
    return EventMultiplexer;
}());

/**
 * The EventBufferer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */
var EventBufferer = /** @class */ (function () {
    function EventBufferer() {
        this.buffers = [];
    }
    EventBufferer.prototype.wrapEvent = function (event) {
        var _this = this;
        return function (listener, thisArgs, disposables) {
            return event(function (i) {
                var buffer = _this.buffers[_this.buffers.length - 1];
                if (buffer) {
                    buffer.push(function () { return listener.call(thisArgs, i); });
                }
                else {
                    listener.call(thisArgs, i);
                }
            }, undefined, disposables);
        };
    };
    EventBufferer.prototype.bufferEvents = function (fn) {
        var buffer = [];
        this.buffers.push(buffer);
        var r = fn();
        this.buffers.pop();
        buffer.forEach(function (flush) { return flush(); });
        return r;
    };
    return EventBufferer;
}());

/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 */
var Relay = /** @class */ (function () {
    function Relay() {
        var _this = this;
        this.listening = false;
        this.inputEvent = Event.None;
        this.inputEventListener = _lifecycle_js__WEBPACK_IMPORTED_MODULE_2__["Disposable"].None;
        this.emitter = new Emitter({
            onFirstListenerDidAdd: function () {
                _this.listening = true;
                _this.inputEventListener = _this.inputEvent(_this.emitter.fire, _this.emitter);
            },
            onLastListenerRemove: function () {
                _this.listening = false;
                _this.inputEventListener.dispose();
            }
        });
        this.event = this.emitter.event;
    }
    Object.defineProperty(Relay.prototype, "input", {
        set: function (event) {
            this.inputEvent = event;
            if (this.listening) {
                this.inputEventListener.dispose();
                this.inputEventListener = event(this.emitter.fire, this.emitter);
            }
        },
        enumerable: true,
        configurable: true
    });
    Relay.prototype.dispose = function () {
        this.inputEventListener.dispose();
        this.emitter.dispose();
    };
    return Relay;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/functional.js":
/*!*********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/functional.js ***!
  \*********************************************************************/
/*! exports provided: once */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function once(fn) {
    var _this = this;
    var didCall = false;
    var result;
    return function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
    };
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/iterator.js ***!
  \*******************************************************************/
/*! exports provided: FIN, Iterator, getSequenceIterator, ArrayIterator, ArrayNavigator, MappedIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIN", function() { return FIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Iterator", function() { return Iterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSequenceIterator", function() { return getSequenceIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayIterator", function() { return ArrayIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayNavigator", function() { return ArrayNavigator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappedIterator", function() { return MappedIterator; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FIN = { done: true, value: undefined };
var Iterator;
(function (Iterator) {
    var _empty = {
        next: function () {
            return FIN;
        }
    };
    function empty() {
        return _empty;
    }
    Iterator.empty = empty;
    function fromArray(array, index, length) {
        if (index === void 0) { index = 0; }
        if (length === void 0) { length = array.length; }
        return {
            next: function () {
                if (index >= length) {
                    return FIN;
                }
                return { done: false, value: array[index++] };
            }
        };
    }
    Iterator.fromArray = fromArray;
    function from(elements) {
        if (!elements) {
            return Iterator.empty();
        }
        else if (Array.isArray(elements)) {
            return Iterator.fromArray(elements);
        }
        else {
            return elements;
        }
    }
    Iterator.from = from;
    function map(iterator, fn) {
        return {
            next: function () {
                var element = iterator.next();
                if (element.done) {
                    return FIN;
                }
                else {
                    return { done: false, value: fn(element.value) };
                }
            }
        };
    }
    Iterator.map = map;
    function filter(iterator, fn) {
        return {
            next: function () {
                while (true) {
                    var element = iterator.next();
                    if (element.done) {
                        return FIN;
                    }
                    if (fn(element.value)) {
                        return { done: false, value: element.value };
                    }
                }
            }
        };
    }
    Iterator.filter = filter;
    function forEach(iterator, fn) {
        for (var next = iterator.next(); !next.done; next = iterator.next()) {
            fn(next.value);
        }
    }
    Iterator.forEach = forEach;
    function collect(iterator) {
        var result = [];
        forEach(iterator, function (value) { return result.push(value); });
        return result;
    }
    Iterator.collect = collect;
})(Iterator || (Iterator = {}));
function getSequenceIterator(arg) {
    if (Array.isArray(arg)) {
        return Iterator.fromArray(arg);
    }
    else {
        return arg;
    }
}
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(items, start, end, index) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = items.length; }
        if (index === void 0) { index = start - 1; }
        this.items = items;
        this.start = start;
        this.end = end;
        this.index = index;
    }
    ArrayIterator.prototype.next = function () {
        this.index = Math.min(this.index + 1, this.end);
        return this.current();
    };
    ArrayIterator.prototype.current = function () {
        if (this.index === this.start - 1 || this.index === this.end) {
            return null;
        }
        return this.items[this.index];
    };
    return ArrayIterator;
}());

var ArrayNavigator = /** @class */ (function (_super) {
    __extends(ArrayNavigator, _super);
    function ArrayNavigator(items, start, end, index) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = items.length; }
        if (index === void 0) { index = start - 1; }
        return _super.call(this, items, start, end, index) || this;
    }
    ArrayNavigator.prototype.current = function () {
        return _super.prototype.current.call(this);
    };
    ArrayNavigator.prototype.previous = function () {
        this.index = Math.max(this.index - 1, this.start - 1);
        return this.current();
    };
    ArrayNavigator.prototype.first = function () {
        this.index = this.start;
        return this.current();
    };
    ArrayNavigator.prototype.last = function () {
        this.index = this.end - 1;
        return this.current();
    };
    ArrayNavigator.prototype.parent = function () {
        return null;
    };
    return ArrayNavigator;
}(ArrayIterator));

var MappedIterator = /** @class */ (function () {
    function MappedIterator(iterator, fn) {
        this.iterator = iterator;
        this.fn = fn;
        // noop
    }
    MappedIterator.prototype.next = function () { return this.fn(this.iterator.next()); };
    return MappedIterator;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/keyCodes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/keyCodes.js ***!
  \*******************************************************************/
/*! exports provided: KeyCodeUtils, KeyChord, createKeybinding, createSimpleKeybinding, SimpleKeybinding, ChordKeybinding, ResolvedKeybindingPart, ResolvedKeybinding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodeUtils", function() { return KeyCodeUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyChord", function() { return KeyChord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createKeybinding", function() { return createKeybinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSimpleKeybinding", function() { return createSimpleKeybinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleKeybinding", function() { return SimpleKeybinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChordKeybinding", function() { return ChordKeybinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolvedKeybindingPart", function() { return ResolvedKeybindingPart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolvedKeybinding", function() { return ResolvedKeybinding; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./node_modules/monaco-editor/esm/vs/base/common/errors.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var KeyCodeStrMap = /** @class */ (function () {
    function KeyCodeStrMap() {
        this._keyCodeToStr = [];
        this._strToKeyCode = Object.create(null);
    }
    KeyCodeStrMap.prototype.define = function (keyCode, str) {
        this._keyCodeToStr[keyCode] = str;
        this._strToKeyCode[str.toLowerCase()] = keyCode;
    };
    KeyCodeStrMap.prototype.keyCodeToStr = function (keyCode) {
        return this._keyCodeToStr[keyCode];
    };
    KeyCodeStrMap.prototype.strToKeyCode = function (str) {
        return this._strToKeyCode[str.toLowerCase()] || 0 /* Unknown */;
    };
    return KeyCodeStrMap;
}());
var uiMap = new KeyCodeStrMap();
var userSettingsUSMap = new KeyCodeStrMap();
var userSettingsGeneralMap = new KeyCodeStrMap();
(function () {
    function define(keyCode, uiLabel, usUserSettingsLabel, generalUserSettingsLabel) {
        if (usUserSettingsLabel === void 0) { usUserSettingsLabel = uiLabel; }
        if (generalUserSettingsLabel === void 0) { generalUserSettingsLabel = usUserSettingsLabel; }
        uiMap.define(keyCode, uiLabel);
        userSettingsUSMap.define(keyCode, usUserSettingsLabel);
        userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel);
    }
    define(0 /* Unknown */, 'unknown');
    define(1 /* Backspace */, 'Backspace');
    define(2 /* Tab */, 'Tab');
    define(3 /* Enter */, 'Enter');
    define(4 /* Shift */, 'Shift');
    define(5 /* Ctrl */, 'Ctrl');
    define(6 /* Alt */, 'Alt');
    define(7 /* PauseBreak */, 'PauseBreak');
    define(8 /* CapsLock */, 'CapsLock');
    define(9 /* Escape */, 'Escape');
    define(10 /* Space */, 'Space');
    define(11 /* PageUp */, 'PageUp');
    define(12 /* PageDown */, 'PageDown');
    define(13 /* End */, 'End');
    define(14 /* Home */, 'Home');
    define(15 /* LeftArrow */, 'LeftArrow', 'Left');
    define(16 /* UpArrow */, 'UpArrow', 'Up');
    define(17 /* RightArrow */, 'RightArrow', 'Right');
    define(18 /* DownArrow */, 'DownArrow', 'Down');
    define(19 /* Insert */, 'Insert');
    define(20 /* Delete */, 'Delete');
    define(21 /* KEY_0 */, '0');
    define(22 /* KEY_1 */, '1');
    define(23 /* KEY_2 */, '2');
    define(24 /* KEY_3 */, '3');
    define(25 /* KEY_4 */, '4');
    define(26 /* KEY_5 */, '5');
    define(27 /* KEY_6 */, '6');
    define(28 /* KEY_7 */, '7');
    define(29 /* KEY_8 */, '8');
    define(30 /* KEY_9 */, '9');
    define(31 /* KEY_A */, 'A');
    define(32 /* KEY_B */, 'B');
    define(33 /* KEY_C */, 'C');
    define(34 /* KEY_D */, 'D');
    define(35 /* KEY_E */, 'E');
    define(36 /* KEY_F */, 'F');
    define(37 /* KEY_G */, 'G');
    define(38 /* KEY_H */, 'H');
    define(39 /* KEY_I */, 'I');
    define(40 /* KEY_J */, 'J');
    define(41 /* KEY_K */, 'K');
    define(42 /* KEY_L */, 'L');
    define(43 /* KEY_M */, 'M');
    define(44 /* KEY_N */, 'N');
    define(45 /* KEY_O */, 'O');
    define(46 /* KEY_P */, 'P');
    define(47 /* KEY_Q */, 'Q');
    define(48 /* KEY_R */, 'R');
    define(49 /* KEY_S */, 'S');
    define(50 /* KEY_T */, 'T');
    define(51 /* KEY_U */, 'U');
    define(52 /* KEY_V */, 'V');
    define(53 /* KEY_W */, 'W');
    define(54 /* KEY_X */, 'X');
    define(55 /* KEY_Y */, 'Y');
    define(56 /* KEY_Z */, 'Z');
    define(57 /* Meta */, 'Meta');
    define(58 /* ContextMenu */, 'ContextMenu');
    define(59 /* F1 */, 'F1');
    define(60 /* F2 */, 'F2');
    define(61 /* F3 */, 'F3');
    define(62 /* F4 */, 'F4');
    define(63 /* F5 */, 'F5');
    define(64 /* F6 */, 'F6');
    define(65 /* F7 */, 'F7');
    define(66 /* F8 */, 'F8');
    define(67 /* F9 */, 'F9');
    define(68 /* F10 */, 'F10');
    define(69 /* F11 */, 'F11');
    define(70 /* F12 */, 'F12');
    define(71 /* F13 */, 'F13');
    define(72 /* F14 */, 'F14');
    define(73 /* F15 */, 'F15');
    define(74 /* F16 */, 'F16');
    define(75 /* F17 */, 'F17');
    define(76 /* F18 */, 'F18');
    define(77 /* F19 */, 'F19');
    define(78 /* NumLock */, 'NumLock');
    define(79 /* ScrollLock */, 'ScrollLock');
    define(80 /* US_SEMICOLON */, ';', ';', 'OEM_1');
    define(81 /* US_EQUAL */, '=', '=', 'OEM_PLUS');
    define(82 /* US_COMMA */, ',', ',', 'OEM_COMMA');
    define(83 /* US_MINUS */, '-', '-', 'OEM_MINUS');
    define(84 /* US_DOT */, '.', '.', 'OEM_PERIOD');
    define(85 /* US_SLASH */, '/', '/', 'OEM_2');
    define(86 /* US_BACKTICK */, '`', '`', 'OEM_3');
    define(110 /* ABNT_C1 */, 'ABNT_C1');
    define(111 /* ABNT_C2 */, 'ABNT_C2');
    define(87 /* US_OPEN_SQUARE_BRACKET */, '[', '[', 'OEM_4');
    define(88 /* US_BACKSLASH */, '\\', '\\', 'OEM_5');
    define(89 /* US_CLOSE_SQUARE_BRACKET */, ']', ']', 'OEM_6');
    define(90 /* US_QUOTE */, '\'', '\'', 'OEM_7');
    define(91 /* OEM_8 */, 'OEM_8');
    define(92 /* OEM_102 */, 'OEM_102');
    define(93 /* NUMPAD_0 */, 'NumPad0');
    define(94 /* NUMPAD_1 */, 'NumPad1');
    define(95 /* NUMPAD_2 */, 'NumPad2');
    define(96 /* NUMPAD_3 */, 'NumPad3');
    define(97 /* NUMPAD_4 */, 'NumPad4');
    define(98 /* NUMPAD_5 */, 'NumPad5');
    define(99 /* NUMPAD_6 */, 'NumPad6');
    define(100 /* NUMPAD_7 */, 'NumPad7');
    define(101 /* NUMPAD_8 */, 'NumPad8');
    define(102 /* NUMPAD_9 */, 'NumPad9');
    define(103 /* NUMPAD_MULTIPLY */, 'NumPad_Multiply');
    define(104 /* NUMPAD_ADD */, 'NumPad_Add');
    define(105 /* NUMPAD_SEPARATOR */, 'NumPad_Separator');
    define(106 /* NUMPAD_SUBTRACT */, 'NumPad_Subtract');
    define(107 /* NUMPAD_DECIMAL */, 'NumPad_Decimal');
    define(108 /* NUMPAD_DIVIDE */, 'NumPad_Divide');
})();
var KeyCodeUtils;
(function (KeyCodeUtils) {
    function toString(keyCode) {
        return uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toString = toString;
    function fromString(key) {
        return uiMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromString = fromString;
    function toUserSettingsUS(keyCode) {
        return userSettingsUSMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsUS = toUserSettingsUS;
    function toUserSettingsGeneral(keyCode) {
        return userSettingsGeneralMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsGeneral = toUserSettingsGeneral;
    function fromUserSettings(key) {
        return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromUserSettings = fromUserSettings;
})(KeyCodeUtils || (KeyCodeUtils = {}));
function KeyChord(firstPart, secondPart) {
    var chordPart = ((secondPart & 0x0000FFFF) << 16) >>> 0;
    return (firstPart | chordPart) >>> 0;
}
function createKeybinding(keybinding, OS) {
    if (keybinding === 0) {
        return null;
    }
    var firstPart = (keybinding & 0x0000FFFF) >>> 0;
    var chordPart = (keybinding & 0xFFFF0000) >>> 16;
    if (chordPart !== 0) {
        return new ChordKeybinding([
            createSimpleKeybinding(firstPart, OS),
            createSimpleKeybinding(chordPart, OS)
        ]);
    }
    return new ChordKeybinding([createSimpleKeybinding(firstPart, OS)]);
}
function createSimpleKeybinding(keybinding, OS) {
    var ctrlCmd = (keybinding & 2048 /* CtrlCmd */ ? true : false);
    var winCtrl = (keybinding & 256 /* WinCtrl */ ? true : false);
    var ctrlKey = (OS === 2 /* Macintosh */ ? winCtrl : ctrlCmd);
    var shiftKey = (keybinding & 1024 /* Shift */ ? true : false);
    var altKey = (keybinding & 512 /* Alt */ ? true : false);
    var metaKey = (OS === 2 /* Macintosh */ ? ctrlCmd : winCtrl);
    var keyCode = (keybinding & 255 /* KeyCode */);
    return new SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode);
}
var SimpleKeybinding = /** @class */ (function () {
    function SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyCode = keyCode;
    }
    SimpleKeybinding.prototype.equals = function (other) {
        return (this.ctrlKey === other.ctrlKey
            && this.shiftKey === other.shiftKey
            && this.altKey === other.altKey
            && this.metaKey === other.metaKey
            && this.keyCode === other.keyCode);
    };
    SimpleKeybinding.prototype.isModifierKey = function () {
        return (this.keyCode === 0 /* Unknown */
            || this.keyCode === 5 /* Ctrl */
            || this.keyCode === 57 /* Meta */
            || this.keyCode === 6 /* Alt */
            || this.keyCode === 4 /* Shift */);
    };
    SimpleKeybinding.prototype.toChord = function () {
        return new ChordKeybinding([this]);
    };
    /**
     * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
     */
    SimpleKeybinding.prototype.isDuplicateModifierCase = function () {
        return ((this.ctrlKey && this.keyCode === 5 /* Ctrl */)
            || (this.shiftKey && this.keyCode === 4 /* Shift */)
            || (this.altKey && this.keyCode === 6 /* Alt */)
            || (this.metaKey && this.keyCode === 57 /* Meta */));
    };
    return SimpleKeybinding;
}());

var ChordKeybinding = /** @class */ (function () {
    function ChordKeybinding(parts) {
        if (parts.length === 0) {
            throw Object(_errors_js__WEBPACK_IMPORTED_MODULE_0__["illegalArgument"])("parts");
        }
        this.parts = parts;
    }
    ChordKeybinding.prototype.equals = function (other) {
        if (other === null) {
            return false;
        }
        if (this.parts.length !== other.parts.length) {
            return false;
        }
        for (var i = 0; i < this.parts.length; i++) {
            if (!this.parts[i].equals(other.parts[i])) {
                return false;
            }
        }
        return true;
    };
    return ChordKeybinding;
}());

var ResolvedKeybindingPart = /** @class */ (function () {
    function ResolvedKeybindingPart(ctrlKey, shiftKey, altKey, metaKey, kbLabel, kbAriaLabel) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyLabel = kbLabel;
        this.keyAriaLabel = kbAriaLabel;
    }
    return ResolvedKeybindingPart;
}());

/**
 * A resolved keybinding. Can be a simple keybinding or a chord keybinding.
 */
var ResolvedKeybinding = /** @class */ (function () {
    function ResolvedKeybinding() {
    }
    return ResolvedKeybinding;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/lifecycle.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/lifecycle.js ***!
  \********************************************************************/
/*! exports provided: isDisposable, dispose, combinedDisposable, toDisposable, Disposable, ImmortalReference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDisposable", function() { return isDisposable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispose", function() { return dispose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combinedDisposable", function() { return combinedDisposable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDisposable", function() { return toDisposable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Disposable", function() { return Disposable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImmortalReference", function() { return ImmortalReference; });
function isDisposable(thing) {
    return typeof thing.dispose === 'function'
        && thing.dispose.length === 0;
}
function dispose(first) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (Array.isArray(first)) {
        first.forEach(function (d) { return d && d.dispose(); });
        return [];
    }
    else if (rest.length === 0) {
        if (first) {
            first.dispose();
            return first;
        }
        return undefined;
    }
    else {
        dispose(first);
        dispose(rest);
        return [];
    }
}
function combinedDisposable(disposables) {
    return { dispose: function () { return dispose(disposables); } };
}
function toDisposable(fn) {
    return { dispose: function () { fn(); } };
}
var Disposable = /** @class */ (function () {
    function Disposable() {
        this._toDispose = [];
        this._lifecycle_disposable_isDisposed = false;
    }
    Disposable.prototype.dispose = function () {
        this._lifecycle_disposable_isDisposed = true;
        this._toDispose = dispose(this._toDispose);
    };
    Disposable.prototype._register = function (t) {
        if (this._lifecycle_disposable_isDisposed) {
            console.warn('Registering disposable on object that has already been disposed.');
            t.dispose();
        }
        else {
            this._toDispose.push(t);
        }
        return t;
    };
    Disposable.None = Object.freeze({ dispose: function () { } });
    return Disposable;
}());

var ImmortalReference = /** @class */ (function () {
    function ImmortalReference(object) {
        this.object = object;
    }
    ImmortalReference.prototype.dispose = function () { };
    return ImmortalReference;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/linkedList.js":
/*!*********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/linkedList.js ***!
  \*********************************************************************/
/*! exports provided: LinkedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedList", function() { return LinkedList; });
/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iterator.js */ "./node_modules/monaco-editor/esm/vs/base/common/iterator.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var Node = /** @class */ (function () {
    function Node(element) {
        this.element = element;
    }
    return Node;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this._size = 0;
    }
    Object.defineProperty(LinkedList.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    LinkedList.prototype.isEmpty = function () {
        return !this._first;
    };
    LinkedList.prototype.unshift = function (element) {
        return this._insert(element, false);
    };
    LinkedList.prototype.push = function (element) {
        return this._insert(element, true);
    };
    LinkedList.prototype._insert = function (element, atTheEnd) {
        var newNode = new Node(element);
        if (!this._first) {
            this._first = newNode;
            this._last = newNode;
        }
        else if (atTheEnd) {
            // push
            var oldLast = this._last;
            this._last = newNode;
            newNode.prev = oldLast;
            oldLast.next = newNode;
        }
        else {
            // unshift
            var oldFirst = this._first;
            this._first = newNode;
            newNode.next = oldFirst;
            oldFirst.prev = newNode;
        }
        this._size += 1;
        return this._remove.bind(this, newNode);
    };
    LinkedList.prototype.shift = function () {
        if (!this._first) {
            return undefined;
        }
        else {
            var res = this._first.element;
            this._remove(this._first);
            return res;
        }
    };
    LinkedList.prototype._remove = function (node) {
        var candidate = this._first;
        while (candidate instanceof Node) {
            if (candidate !== node) {
                candidate = candidate.next;
                continue;
            }
            if (candidate.prev && candidate.next) {
                // middle
                var anchor = candidate.prev;
                anchor.next = candidate.next;
                candidate.next.prev = anchor;
            }
            else if (!candidate.prev && !candidate.next) {
                // only node
                this._first = undefined;
                this._last = undefined;
            }
            else if (!candidate.next) {
                // last
                this._last = this._last.prev;
                this._last.next = undefined;
            }
            else if (!candidate.prev) {
                // first
                this._first = this._first.next;
                this._first.prev = undefined;
            }
            // done
            this._size -= 1;
            break;
        }
    };
    LinkedList.prototype.iterator = function () {
        var element;
        var node = this._first;
        return {
            next: function () {
                if (!node) {
                    return _iterator_js__WEBPACK_IMPORTED_MODULE_0__["FIN"];
                }
                if (!element) {
                    element = { done: false, value: node.element };
                }
                else {
                    element.value = node.element;
                }
                node = node.next;
                return element;
            }
        };
    };
    return LinkedList;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/platform.js":
/*!*******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/platform.js ***!
  \*******************************************************************/
/*! exports provided: LANGUAGE_DEFAULT, isWindows, isMacintosh, isLinux, isNative, isWeb, globals, setImmediate, OS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANGUAGE_DEFAULT", function() { return LANGUAGE_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindows", function() { return isWindows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMacintosh", function() { return isMacintosh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLinux", function() { return isLinux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNative", function() { return isNative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWeb", function() { return isWeb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setImmediate", function() { return setImmediate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OS", function() { return OS; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var LANGUAGE_DEFAULT = 'en';
var _isWindows = false;
var _isMacintosh = false;
var _isLinux = false;
var _isNative = false;
var _isWeb = false;
var _locale = undefined;
var _language = LANGUAGE_DEFAULT;
var _translationsConfigFile = undefined;
var isElectronRenderer = (typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.electron !== 'undefined' && process.type === 'renderer');
// OS detection
if (typeof navigator === 'object' && !isElectronRenderer) {
    var userAgent = navigator.userAgent;
    _isWindows = userAgent.indexOf('Windows') >= 0;
    _isMacintosh = userAgent.indexOf('Macintosh') >= 0;
    _isLinux = userAgent.indexOf('Linux') >= 0;
    _isWeb = true;
    _locale = navigator.language;
    _language = _locale;
}
else if (typeof process === 'object') {
    _isWindows = (process.platform === 'win32');
    _isMacintosh = (process.platform === 'darwin');
    _isLinux = (process.platform === 'linux');
    _locale = LANGUAGE_DEFAULT;
    _language = LANGUAGE_DEFAULT;
    var rawNlsConfig = process.env['VSCODE_NLS_CONFIG'];
    if (rawNlsConfig) {
        try {
            var nlsConfig = JSON.parse(rawNlsConfig);
            var resolved = nlsConfig.availableLanguages['*'];
            _locale = nlsConfig.locale;
            // VSCode's default language is 'en'
            _language = resolved ? resolved : LANGUAGE_DEFAULT;
            _translationsConfigFile = nlsConfig._translationsConfigFile;
        }
        catch (e) {
        }
    }
    _isNative = true;
}
var _platform = 0 /* Web */;
if (_isNative) {
    if (_isMacintosh) {
        _platform = 1 /* Mac */;
    }
    else if (_isWindows) {
        _platform = 3 /* Windows */;
    }
    else if (_isLinux) {
        _platform = 2 /* Linux */;
    }
}
var isWindows = _isWindows;
var isMacintosh = _isMacintosh;
var isLinux = _isLinux;
var isNative = _isNative;
var isWeb = _isWeb;
var _globals = (typeof self === 'object' ? self : typeof global === 'object' ? global : {});
var globals = _globals;
var _setImmediate = null;
function setImmediate(callback) {
    if (_setImmediate === null) {
        if (globals.setImmediate) {
            _setImmediate = globals.setImmediate.bind(globals);
        }
        else if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
            _setImmediate = process.nextTick.bind(process);
        }
        else {
            _setImmediate = globals.setTimeout.bind(globals);
        }
    }
    return _setImmediate(callback);
}
var OS = (_isMacintosh ? 2 /* Macintosh */ : (_isWindows ? 1 /* Windows */ : 3 /* Linux */));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/strings.js":
/*!******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/strings.js ***!
  \******************************************************************/
/*! exports provided: empty, isFalsyOrWhitespace, pad, format, escape, escapeRegExpCharacters, trim, ltrim, rtrim, convertSimple2RegExpPattern, startsWith, endsWith, createRegExp, regExpLeadsToEndlessLoop, regExpFlags, firstNonWhitespaceIndex, getLeadingWhitespace, lastNonWhitespaceIndex, compare, isLowerAsciiLetter, isUpperAsciiLetter, equalsIgnoreCase, startsWithIgnoreCase, commonPrefixLength, commonSuffixLength, isHighSurrogate, isLowSurrogate, containsRTL, containsEmoji, isBasicASCII, containsFullWidthCharacter, isFullWidthCharacter, UTF8_BOM_CHARACTER, startsWithUTF8BOM, safeBtoa, repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFalsyOrWhitespace", function() { return isFalsyOrWhitespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pad", function() { return pad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExpCharacters", function() { return escapeRegExpCharacters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return trim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ltrim", function() { return ltrim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rtrim", function() { return rtrim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertSimple2RegExpPattern", function() { return convertSimple2RegExpPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return endsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRegExp", function() { return createRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regExpLeadsToEndlessLoop", function() { return regExpLeadsToEndlessLoop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regExpFlags", function() { return regExpFlags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstNonWhitespaceIndex", function() { return firstNonWhitespaceIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLeadingWhitespace", function() { return getLeadingWhitespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastNonWhitespaceIndex", function() { return lastNonWhitespaceIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLowerAsciiLetter", function() { return isLowerAsciiLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUpperAsciiLetter", function() { return isUpperAsciiLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalsIgnoreCase", function() { return equalsIgnoreCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWithIgnoreCase", function() { return startsWithIgnoreCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonPrefixLength", function() { return commonPrefixLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonSuffixLength", function() { return commonSuffixLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHighSurrogate", function() { return isHighSurrogate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLowSurrogate", function() { return isLowSurrogate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsRTL", function() { return containsRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsEmoji", function() { return containsEmoji; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBasicASCII", function() { return isBasicASCII; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsFullWidthCharacter", function() { return containsFullWidthCharacter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFullWidthCharacter", function() { return isFullWidthCharacter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UTF8_BOM_CHARACTER", function() { return UTF8_BOM_CHARACTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWithUTF8BOM", function() { return startsWithUTF8BOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeBtoa", function() { return safeBtoa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The empty string.
 */
var empty = '';
function isFalsyOrWhitespace(str) {
    if (!str || typeof str !== 'string') {
        return true;
    }
    return str.trim().length === 0;
}
/**
 * @returns the provided number with the given number of preceding zeros.
 */
function pad(n, l, char) {
    if (char === void 0) { char = '0'; }
    var str = '' + n;
    var r = [str];
    for (var i = str.length; i < l; i++) {
        r.push(char);
    }
    return r.reverse().join('');
}
var _formatRegexp = /{(\d+)}/g;
/**
 * Helper to produce a string with a variable number of arguments. Insert variable segments
 * into the string using the {n} notation where N is the index of the argument following the string.
 * @param value string to which formatting is applied
 * @param args replacements for {n}-entries
 */
function format(value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (args.length === 0) {
        return value;
    }
    return value.replace(_formatRegexp, function (match, group) {
        var idx = parseInt(group, 10);
        return isNaN(idx) || idx < 0 || idx >= args.length ?
            match :
            args[idx];
    });
}
/**
 * Converts HTML characters inside the string to use entities instead. Makes the string safe from
 * being used e.g. in HTMLElement.innerHTML.
 */
function escape(html) {
    return html.replace(/[<>&]/g, function (match) {
        switch (match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            default: return match;
        }
    });
}
/**
 * Escapes regular expression characters in a given string
 */
function escapeRegExpCharacters(value) {
    return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
}
/**
 * Removes all occurrences of needle from the beginning and end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim (default is a blank)
 */
function trim(haystack, needle) {
    if (needle === void 0) { needle = ' '; }
    var trimmed = ltrim(haystack, needle);
    return rtrim(trimmed, needle);
}
/**
 * Removes all occurrences of needle from the beginning of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
function ltrim(haystack, needle) {
    if (!haystack || !needle) {
        return haystack;
    }
    var needleLen = needle.length;
    if (needleLen === 0 || haystack.length === 0) {
        return haystack;
    }
    var offset = 0;
    while (haystack.indexOf(needle, offset) === offset) {
        offset = offset + needleLen;
    }
    return haystack.substring(offset);
}
/**
 * Removes all occurrences of needle from the end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
function rtrim(haystack, needle) {
    if (!haystack || !needle) {
        return haystack;
    }
    var needleLen = needle.length, haystackLen = haystack.length;
    if (needleLen === 0 || haystackLen === 0) {
        return haystack;
    }
    var offset = haystackLen, idx = -1;
    while (true) {
        idx = haystack.lastIndexOf(needle, offset - 1);
        if (idx === -1 || idx + needleLen !== offset) {
            break;
        }
        if (idx === 0) {
            return '';
        }
        offset = idx;
    }
    return haystack.substring(0, offset);
}
function convertSimple2RegExpPattern(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}
/**
 * Determines if haystack starts with needle.
 */
function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
        return false;
    }
    if (haystack === needle) {
        return true;
    }
    for (var i = 0; i < needle.length; i++) {
        if (haystack[i] !== needle[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Determines if haystack ends with needle.
 */
function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
        return haystack.indexOf(needle, diff) === diff;
    }
    else if (diff === 0) {
        return haystack === needle;
    }
    else {
        return false;
    }
}
function createRegExp(searchString, isRegex, options) {
    if (options === void 0) { options = {}; }
    if (!searchString) {
        throw new Error('Cannot create regex from empty string');
    }
    if (!isRegex) {
        searchString = escapeRegExpCharacters(searchString);
    }
    if (options.wholeWord) {
        if (!/\B/.test(searchString.charAt(0))) {
            searchString = '\\b' + searchString;
        }
        if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
            searchString = searchString + '\\b';
        }
    }
    var modifiers = '';
    if (options.global) {
        modifiers += 'g';
    }
    if (!options.matchCase) {
        modifiers += 'i';
    }
    if (options.multiline) {
        modifiers += 'm';
    }
    if (options.unicode) {
        modifiers += 'u';
    }
    return new RegExp(searchString, modifiers);
}
function regExpLeadsToEndlessLoop(regexp) {
    // Exit early if it's one of these special cases which are meant to match
    // against an empty string
    if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') {
        return false;
    }
    // We check against an empty string. If the regular expression doesn't advance
    // (e.g. ends in an endless loop) it will match an empty string.
    var match = regexp.exec('');
    return !!(match && regexp.lastIndex === 0);
}
function regExpFlags(regexp) {
    return (regexp.global ? 'g' : '')
        + (regexp.ignoreCase ? 'i' : '')
        + (regexp.multiline ? 'm' : '')
        + (regexp.unicode ? 'u' : '');
}
/**
 * Returns first index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */
function firstNonWhitespaceIndex(str) {
    for (var i = 0, len = str.length; i < len; i++) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
            return i;
        }
    }
    return -1;
}
/**
 * Returns the leading whitespace of the string.
 * If the string contains only whitespaces, returns entire string
 */
function getLeadingWhitespace(str, start, end) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = str.length; }
    for (var i = start; i < end; i++) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
            return str.substring(start, i);
        }
    }
    return str.substring(start, end);
}
/**
 * Returns last index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */
function lastNonWhitespaceIndex(str, startIndex) {
    if (startIndex === void 0) { startIndex = str.length - 1; }
    for (var i = startIndex; i >= 0; i--) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
            return i;
        }
    }
    return -1;
}
function compare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}
function isLowerAsciiLetter(code) {
    return code >= 97 /* a */ && code <= 122 /* z */;
}
function isUpperAsciiLetter(code) {
    return code >= 65 /* A */ && code <= 90 /* Z */;
}
function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}
function equalsIgnoreCase(a, b) {
    var len1 = a ? a.length : 0;
    var len2 = b ? b.length : 0;
    if (len1 !== len2) {
        return false;
    }
    return doEqualsIgnoreCase(a, b);
}
function doEqualsIgnoreCase(a, b, stopAt) {
    if (stopAt === void 0) { stopAt = a.length; }
    if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
    }
    for (var i = 0; i < stopAt; i++) {
        var codeA = a.charCodeAt(i);
        var codeB = b.charCodeAt(i);
        if (codeA === codeB) {
            continue;
        }
        // a-z A-Z
        if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
            var diff = Math.abs(codeA - codeB);
            if (diff !== 0 && diff !== 32) {
                return false;
            }
        }
        // Any other charcode
        else {
            if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
                return false;
            }
        }
    }
    return true;
}
function startsWithIgnoreCase(str, candidate) {
    var candidateLength = candidate.length;
    if (candidate.length > str.length) {
        return false;
    }
    return doEqualsIgnoreCase(str, candidate, candidateLength);
}
/**
 * @returns the length of the common prefix of the two strings.
 */
function commonPrefixLength(a, b) {
    var i, len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
            return i;
        }
    }
    return len;
}
/**
 * @returns the length of the common suffix of the two strings.
 */
function commonSuffixLength(a, b) {
    var i, len = Math.min(a.length, b.length);
    var aLastIndex = a.length - 1;
    var bLastIndex = b.length - 1;
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
            return i;
        }
    }
    return len;
}
// --- unicode
// http://en.wikipedia.org/wiki/Surrogate_pair
// Returns the code point starting at a specified index in a string
// Code points U+0000 to U+D7FF and U+E000 to U+FFFF are represented on a single character
// Code points U+10000 to U+10FFFF are represented on two consecutive characters
//export function getUnicodePoint(str:string, index:number, len:number):number {
//	let chrCode = str.charCodeAt(index);
//	if (0xD800 <= chrCode && chrCode <= 0xDBFF && index + 1 < len) {
//		let nextChrCode = str.charCodeAt(index + 1);
//		if (0xDC00 <= nextChrCode && nextChrCode <= 0xDFFF) {
//			return (chrCode - 0xD800) << 10 + (nextChrCode - 0xDC00) + 0x10000;
//		}
//	}
//	return chrCode;
//}
function isHighSurrogate(charCode) {
    return (0xD800 <= charCode && charCode <= 0xDBFF);
}
function isLowSurrogate(charCode) {
    return (0xDC00 <= charCode && charCode <= 0xDFFF);
}
/**
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-rtl-test.js
 */
var CONTAINS_RTL = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
/**
 * Returns true if `str` contains any Unicode character that is classified as "R" or "AL".
 */
function containsRTL(str) {
    return CONTAINS_RTL.test(str);
}
/**
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-emoji-test.js
 */
var CONTAINS_EMOJI = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEF8]|\uD83E[\uDD00-\uDDE6])/;
function containsEmoji(str) {
    return CONTAINS_EMOJI.test(str);
}
var IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
/**
 * Returns true if `str` contains only basic ASCII characters in the range 32 - 126 (including 32 and 126) or \n, \r, \t
 */
function isBasicASCII(str) {
    return IS_BASIC_ASCII.test(str);
}
function containsFullWidthCharacter(str) {
    for (var i = 0, len = str.length; i < len; i++) {
        if (isFullWidthCharacter(str.charCodeAt(i))) {
            return true;
        }
    }
    return false;
}
function isFullWidthCharacter(charCode) {
    // Do a cheap trick to better support wrapping of wide characters, treat them as 2 columns
    // http://jrgraphix.net/research/unicode_blocks.php
    //          2E80 — 2EFF   CJK Radicals Supplement
    //          2F00 — 2FDF   Kangxi Radicals
    //          2FF0 — 2FFF   Ideographic Description Characters
    //          3000 — 303F   CJK Symbols and Punctuation
    //          3040 — 309F   Hiragana
    //          30A0 — 30FF   Katakana
    //          3100 — 312F   Bopomofo
    //          3130 — 318F   Hangul Compatibility Jamo
    //          3190 — 319F   Kanbun
    //          31A0 — 31BF   Bopomofo Extended
    //          31F0 — 31FF   Katakana Phonetic Extensions
    //          3200 — 32FF   Enclosed CJK Letters and Months
    //          3300 — 33FF   CJK Compatibility
    //          3400 — 4DBF   CJK Unified Ideographs Extension A
    //          4DC0 — 4DFF   Yijing Hexagram Symbols
    //          4E00 — 9FFF   CJK Unified Ideographs
    //          A000 — A48F   Yi Syllables
    //          A490 — A4CF   Yi Radicals
    //          AC00 — D7AF   Hangul Syllables
    // [IGNORE] D800 — DB7F   High Surrogates
    // [IGNORE] DB80 — DBFF   High Private Use Surrogates
    // [IGNORE] DC00 — DFFF   Low Surrogates
    // [IGNORE] E000 — F8FF   Private Use Area
    //          F900 — FAFF   CJK Compatibility Ideographs
    // [IGNORE] FB00 — FB4F   Alphabetic Presentation Forms
    // [IGNORE] FB50 — FDFF   Arabic Presentation Forms-A
    // [IGNORE] FE00 — FE0F   Variation Selectors
    // [IGNORE] FE20 — FE2F   Combining Half Marks
    // [IGNORE] FE30 — FE4F   CJK Compatibility Forms
    // [IGNORE] FE50 — FE6F   Small Form Variants
    // [IGNORE] FE70 — FEFF   Arabic Presentation Forms-B
    //          FF00 — FFEF   Halfwidth and Fullwidth Forms
    //               [https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms]
    //               of which FF01 - FF5E fullwidth ASCII of 21 to 7E
    // [IGNORE]    and FF65 - FFDC halfwidth of Katakana and Hangul
    // [IGNORE] FFF0 — FFFF   Specials
    charCode = +charCode; // @perf
    return ((charCode >= 0x2E80 && charCode <= 0xD7AF)
        || (charCode >= 0xF900 && charCode <= 0xFAFF)
        || (charCode >= 0xFF01 && charCode <= 0xFF5E));
}
// -- UTF-8 BOM
var UTF8_BOM_CHARACTER = String.fromCharCode(65279 /* UTF8_BOM */);
function startsWithUTF8BOM(str) {
    return !!(str && str.length > 0 && str.charCodeAt(0) === 65279 /* UTF8_BOM */);
}
function safeBtoa(str) {
    return btoa(encodeURIComponent(str)); // we use encodeURIComponent because btoa fails for non Latin 1 values
}
function repeat(s, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += s;
    }
    return result;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/types.js":
/*!****************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/types.js ***!
  \****************************************************************/
/*! exports provided: isArray, isString, isObject, isNumber, isBoolean, isUndefined, isUndefinedOrNull, isEmptyObject, isFunction, validateConstraints, validateConstraint, create, getAllPropertyNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefinedOrNull", function() { return isUndefinedOrNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateConstraints", function() { return validateConstraints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateConstraint", function() { return validateConstraint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPropertyNames", function() { return getAllPropertyNames; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _typeof = {
    number: 'number',
    string: 'string',
    undefined: 'undefined',
    object: 'object',
    function: 'function'
};
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
 */
function isArray(array) {
    if (Array.isArray) {
        return Array.isArray(array);
    }
    if (array && typeof (array.length) === _typeof.number && array.constructor === Array) {
        return true;
    }
    return false;
}
/**
 * @returns whether the provided parameter is a JavaScript String or not.
 */
function isString(str) {
    if (typeof (str) === _typeof.string || str instanceof String) {
        return true;
    }
    return false;
}
/**
 *
 * @returns whether the provided parameter is of type `object` but **not**
 *	`null`, an `array`, a `regexp`, nor a `date`.
 */
function isObject(obj) {
    // The method can't do a type cast since there are type (like strings) which
    // are subclasses of any put not positvely matched by the function. Hence type
    // narrowing results in wrong results.
    return typeof obj === _typeof.object
        && obj !== null
        && !Array.isArray(obj)
        && !(obj instanceof RegExp)
        && !(obj instanceof Date);
}
/**
 * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
 * @returns whether the provided parameter is a JavaScript Number or not.
 */
function isNumber(obj) {
    if ((typeof (obj) === _typeof.number || obj instanceof Number) && !isNaN(obj)) {
        return true;
    }
    return false;
}
/**
 * @returns whether the provided parameter is a JavaScript Boolean or not.
 */
function isBoolean(obj) {
    return obj === true || obj === false;
}
/**
 * @returns whether the provided parameter is undefined.
 */
function isUndefined(obj) {
    return typeof (obj) === _typeof.undefined;
}
/**
 * @returns whether the provided parameter is undefined or null.
 */
function isUndefinedOrNull(obj) {
    return isUndefined(obj) || obj === null;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @returns whether the provided parameter is an empty JavaScript Object or not.
 */
function isEmptyObject(obj) {
    if (!isObject(obj)) {
        return false;
    }
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
/**
 * @returns whether the provided parameter is a JavaScript Function or not.
 */
function isFunction(obj) {
    return typeof obj === _typeof.function;
}
function validateConstraints(args, constraints) {
    var len = Math.min(args.length, constraints.length);
    for (var i = 0; i < len; i++) {
        validateConstraint(args[i], constraints[i]);
    }
}
function validateConstraint(arg, constraint) {
    if (isString(constraint)) {
        if (typeof arg !== constraint) {
            throw new Error("argument does not match constraint: typeof " + constraint);
        }
    }
    else if (isFunction(constraint)) {
        try {
            if (arg instanceof constraint) {
                return;
            }
        }
        catch (_a) {
            // ignore
        }
        if (!isUndefinedOrNull(arg) && arg.constructor === constraint) {
            return;
        }
        if (constraint.length === 1 && constraint.call(undefined, arg) === true) {
            return;
        }
        throw new Error("argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true");
    }
}
/**
 * Creates a new object of the provided class and will call the constructor with
 * any additional argument supplied.
 */
function create(ctor) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _a;
    if (isNativeClass(ctor)) {
        return new ((_a = ctor).bind.apply(_a, [void 0].concat(args)))();
    }
    else {
        var obj = Object.create(ctor.prototype);
        ctor.apply(obj, args);
        return obj;
    }
}
// https://stackoverflow.com/a/32235645/1499159
function isNativeClass(thing) {
    return typeof thing === 'function'
        && thing.hasOwnProperty('prototype')
        && !thing.hasOwnProperty('arguments');
}
/**
 *
 *
 */
function getAllPropertyNames(obj) {
    var res = [];
    var proto = Object.getPrototypeOf(obj);
    while (Object.prototype !== proto) {
        res = res.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return res;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/uri.js":
/*!**************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/uri.js ***!
  \**************************************************************/
/*! exports provided: URI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URI", function() { return URI; });
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.js */ "./node_modules/monaco-editor/esm/vs/base/common/platform.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;

var _schemePattern = /^\w[\w\d+.-]*$/;
var _singleSlashStart = /^\//;
var _doubleSlashStart = /^\/\//;
var _throwOnMissingSchema = true;
function _validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme) {
        if (_strict || _throwOnMissingSchema) {
            throw new Error("[UriError]: Scheme is missing: {scheme: \"\", authority: \"" + ret.authority + "\", path: \"" + ret.path + "\", query: \"" + ret.query + "\", fragment: \"" + ret.fragment + "\"}");
        }
        else {
            console.warn("[UriError]: Scheme is missing: {scheme: \"\", authority: \"" + ret.authority + "\", path: \"" + ret.path + "\", query: \"" + ret.query + "\", fragment: \"" + ret.fragment + "\"}");
        }
    }
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        }
        else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
        case 'https':
        case 'http':
        case 'file':
            if (!path) {
                path = _slash;
            }
            else if (path[0] !== _slash) {
                path = _slash + path;
            }
            break;
    }
    return path;
}
var _empty = '';
var _slash = '/';
var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 */
var URI = /** @class */ (function () {
    /**
     * @internal
     */
    function URI(schemeOrData, authority, path, query, fragment, _strict) {
        if (typeof schemeOrData === 'object') {
            this.scheme = schemeOrData.scheme || _empty;
            this.authority = schemeOrData.authority || _empty;
            this.path = schemeOrData.path || _empty;
            this.query = schemeOrData.query || _empty;
            this.fragment = schemeOrData.fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        }
        else {
            this.scheme = schemeOrData || _empty;
            this.authority = authority || _empty;
            this.path = _referenceResolution(this.scheme, path || _empty);
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this, _strict);
        }
    }
    URI.isUri = function (thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string'
            && typeof thing.fragment === 'string'
            && typeof thing.path === 'string'
            && typeof thing.query === 'string'
            && typeof thing.scheme === 'string'
            && typeof thing.fsPath === 'function'
            && typeof thing.with === 'function'
            && typeof thing.toString === 'function';
    };
    Object.defineProperty(URI.prototype, "fsPath", {
        // ---- filesystem path -----------------------
        /**
         * Returns a string representing the corresponding file system path of this URI.
         * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
         * platform specific path separator.
         *
         * * Will *not* validate the path for invalid characters and semantics.
         * * Will *not* look at the scheme of this URI.
         * * The result shall *not* be used for display purposes but for accessing a file on disk.
         *
         *
         * The *difference* to `URI#path` is the use of the platform specific separator and the handling
         * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
         *
         * ```ts
            const u = URI.parse('file://server/c$/folder/file.txt')
            u.authority === 'server'
            u.path === '/shares/c$/file.txt'
            u.fsPath === '\\server\c$\folder\file.txt'
        ```
         *
         * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
         * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
         * with URIs that represent files on disk (`file` scheme).
         */
        get: function () {
            // if (this.scheme !== 'file') {
            // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
            // }
            return _makeFsPath(this);
        },
        enumerable: true,
        configurable: true
    });
    // ---- modify to new -------------------------
    URI.prototype.with = function (change) {
        if (!change) {
            return this;
        }
        var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
        if (scheme === undefined) {
            scheme = this.scheme;
        }
        else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === undefined) {
            authority = this.authority;
        }
        else if (authority === null) {
            authority = _empty;
        }
        if (path === undefined) {
            path = this.path;
        }
        else if (path === null) {
            path = _empty;
        }
        if (query === undefined) {
            query = this.query;
        }
        else if (query === null) {
            query = _empty;
        }
        if (fragment === undefined) {
            fragment = this.fragment;
        }
        else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme
            && authority === this.authority
            && path === this.path
            && query === this.query
            && fragment === this.fragment) {
            return this;
        }
        return new _URI(scheme, authority, path, query, fragment);
    };
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */
    URI.parse = function (value, _strict) {
        if (_strict === void 0) { _strict = false; }
        var match = _regexp.exec(value);
        if (!match) {
            return new _URI(_empty, _empty, _empty, _empty, _empty);
        }
        return new _URI(match[2] || _empty, decodeURIComponent(match[4] || _empty), decodeURIComponent(match[5] || _empty), decodeURIComponent(match[7] || _empty), decodeURIComponent(match[9] || _empty), _strict);
    };
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';
    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */
    URI.file = function (path) {
        var authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (_platform_js__WEBPACK_IMPORTED_MODULE_0__["isWindows"]) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            var idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            }
            else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        return new _URI('file', authority, path, _empty, _empty);
    };
    URI.from = function (components) {
        return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
    };
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) { skipEncoding = false; }
        return _asFormatted(this, skipEncoding);
    };
    URI.prototype.toJSON = function () {
        return this;
    };
    URI.revive = function (data) {
        if (!data) {
            return data;
        }
        else if (data instanceof URI) {
            return data;
        }
        else {
            var result = new _URI(data);
            result._fsPath = data.fsPath;
            result._formatted = data.external;
            return result;
        }
    };
    return URI;
}());

// tslint:disable-next-line:class-name
var _URI = /** @class */ (function (_super) {
    __extends(_URI, _super);
    function _URI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._formatted = null;
        _this._fsPath = null;
        return _this;
    }
    Object.defineProperty(_URI.prototype, "fsPath", {
        get: function () {
            if (!this._fsPath) {
                this._fsPath = _makeFsPath(this);
            }
            return this._fsPath;
        },
        enumerable: true,
        configurable: true
    });
    _URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) { skipEncoding = false; }
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        }
        else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    };
    _URI.prototype.toJSON = function () {
        var res = {
            $mid: 1
        };
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
        }
        if (this._formatted) {
            res.external = this._formatted;
        }
        // uri components
        if (this.path) {
            res.path = this.path;
        }
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    };
    return _URI;
}(URI));
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
var encodeTable = (_a = {},
    _a[58 /* Colon */] = '%3A',
    _a[47 /* Slash */] = '%2F',
    _a[63 /* QuestionMark */] = '%3F',
    _a[35 /* Hash */] = '%23',
    _a[91 /* OpenSquareBracket */] = '%5B',
    _a[93 /* CloseSquareBracket */] = '%5D',
    _a[64 /* AtSign */] = '%40',
    _a[33 /* ExclamationMark */] = '%21',
    _a[36 /* DollarSign */] = '%24',
    _a[38 /* Ampersand */] = '%26',
    _a[39 /* SingleQuote */] = '%27',
    _a[40 /* OpenParen */] = '%28',
    _a[41 /* CloseParen */] = '%29',
    _a[42 /* Asterisk */] = '%2A',
    _a[43 /* Plus */] = '%2B',
    _a[44 /* Comma */] = '%2C',
    _a[59 /* Semicolon */] = '%3B',
    _a[61 /* Equals */] = '%3D',
    _a[32 /* Space */] = '%20',
    _a);
function encodeURIComponentFast(uriComponent, allowSlash) {
    var res = undefined;
    var nativeEncodePos = -1;
    for (var pos = 0; pos < uriComponent.length; pos++) {
        var code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if ((code >= 97 /* a */ && code <= 122 /* z */)
            || (code >= 65 /* A */ && code <= 90 /* Z */)
            || (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
            || code === 45 /* Dash */
            || code === 46 /* Period */
            || code === 95 /* Underline */
            || code === 126 /* Tilde */
            || (allowSlash && code === 47 /* Slash */)) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) {
                res += uriComponent.charAt(pos);
            }
        }
        else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) {
                res = uriComponent.substr(0, pos);
            }
            // check with default table first
            var escaped = encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            }
            else if (nativeEncodePos === -1) {
                // use native encode only when needed
                nativeEncodePos = pos;
            }
        }
    }
    if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
}
function encodeURIComponentMinimal(path) {
    var res = undefined;
    for (var pos = 0; pos < path.length; pos++) {
        var code = path.charCodeAt(pos);
        if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
            if (res === undefined) {
                res = path.substr(0, pos);
            }
            res += encodeTable[code];
        }
        else {
            if (res !== undefined) {
                res += path[pos];
            }
        }
    }
    return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 */
function _makeFsPath(uri) {
    var value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = "//" + uri.authority + uri.path;
    }
    else if (uri.path.charCodeAt(0) === 47 /* Slash */
        && (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
        && uri.path.charCodeAt(2) === 58 /* Colon */) {
        // windows drive letter: file:///c:/far/boo
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
    }
    else {
        // other path
        value = uri.path;
    }
    if (_platform_js__WEBPACK_IMPORTED_MODULE_0__["isWindows"]) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Create the external version of a uri
 */
function _asFormatted(uri, skipEncoding) {
    var encoder = !skipEncoding
        ? encodeURIComponentFast
        : encodeURIComponentMinimal;
    var res = '';
    var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += _slash;
        res += _slash;
    }
    if (authority) {
        var idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            var userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.indexOf(':');
            if (idx === -1) {
                res += encoder(userinfo, false);
            }
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.indexOf(':');
        if (idx === -1) {
            res += encoder(authority, false);
        }
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
            var code = path.charCodeAt(1);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3); // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
            var code = path.charCodeAt(0);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = String.fromCharCode(code + 32) + ":" + path.substr(2); // "/c:".length === 3
            }
        }
        // encode the rest of the path
        res += encoder(path, true);
    }
    if (query) {
        res += '?';
        res += encoder(query, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/common/worker/simpleWorker.js":
/*!******************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/common/worker/simpleWorker.js ***!
  \******************************************************************************/
/*! exports provided: logOnceWebWorkerWarning, SimpleWorkerClient, SimpleWorkerServer, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOnceWebWorkerWarning", function() { return logOnceWebWorkerWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleWorkerClient", function() { return SimpleWorkerClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleWorkerServer", function() { return SimpleWorkerServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors.js */ "./node_modules/monaco-editor/esm/vs/base/common/errors.js");
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lifecycle.js */ "./node_modules/monaco-editor/esm/vs/base/common/lifecycle.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform.js */ "./node_modules/monaco-editor/esm/vs/base/common/platform.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types.js */ "./node_modules/monaco-editor/esm/vs/base/common/types.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var INITIALIZE = '$initialize';
var webWorkerWarningLogged = false;
function logOnceWebWorkerWarning(err) {
    if (!_platform_js__WEBPACK_IMPORTED_MODULE_2__["isWeb"]) {
        // running tests
        return;
    }
    if (!webWorkerWarningLogged) {
        webWorkerWarningLogged = true;
        console.warn('Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq');
    }
    console.warn(err.message);
}
var SimpleWorkerProtocol = /** @class */ (function () {
    function SimpleWorkerProtocol(handler) {
        this._workerId = -1;
        this._handler = handler;
        this._lastSentReq = 0;
        this._pendingReplies = Object.create(null);
    }
    SimpleWorkerProtocol.prototype.setWorkerId = function (workerId) {
        this._workerId = workerId;
    };
    SimpleWorkerProtocol.prototype.sendMessage = function (method, args) {
        var _this = this;
        var req = String(++this._lastSentReq);
        return new Promise(function (resolve, reject) {
            _this._pendingReplies[req] = {
                resolve: resolve,
                reject: reject
            };
            _this._send({
                vsWorker: _this._workerId,
                req: req,
                method: method,
                args: args
            });
        });
    };
    SimpleWorkerProtocol.prototype.handleMessage = function (serializedMessage) {
        var message;
        try {
            message = JSON.parse(serializedMessage);
        }
        catch (e) {
            // nothing
            return;
        }
        if (!message || !message.vsWorker) {
            return;
        }
        if (this._workerId !== -1 && message.vsWorker !== this._workerId) {
            return;
        }
        this._handleMessage(message);
    };
    SimpleWorkerProtocol.prototype._handleMessage = function (msg) {
        var _this = this;
        if (msg.seq) {
            var replyMessage = msg;
            if (!this._pendingReplies[replyMessage.seq]) {
                console.warn('Got reply to unknown seq');
                return;
            }
            var reply = this._pendingReplies[replyMessage.seq];
            delete this._pendingReplies[replyMessage.seq];
            if (replyMessage.err) {
                var err = replyMessage.err;
                if (replyMessage.err.$isError) {
                    err = new Error();
                    err.name = replyMessage.err.name;
                    err.message = replyMessage.err.message;
                    err.stack = replyMessage.err.stack;
                }
                reply.reject(err);
                return;
            }
            reply.resolve(replyMessage.res);
            return;
        }
        var requestMessage = msg;
        var req = requestMessage.req;
        var result = this._handler.handleMessage(requestMessage.method, requestMessage.args);
        result.then(function (r) {
            _this._send({
                vsWorker: _this._workerId,
                seq: req,
                res: r,
                err: undefined
            });
        }, function (e) {
            if (e.detail instanceof Error) {
                // Loading errors have a detail property that points to the actual error
                e.detail = Object(_errors_js__WEBPACK_IMPORTED_MODULE_0__["transformErrorForSerialization"])(e.detail);
            }
            _this._send({
                vsWorker: _this._workerId,
                seq: req,
                res: undefined,
                err: Object(_errors_js__WEBPACK_IMPORTED_MODULE_0__["transformErrorForSerialization"])(e)
            });
        });
    };
    SimpleWorkerProtocol.prototype._send = function (msg) {
        var strMsg = JSON.stringify(msg);
        // console.log('SENDING: ' + strMsg);
        this._handler.sendMessage(strMsg);
    };
    return SimpleWorkerProtocol;
}());
/**
 * Main thread side
 */
var SimpleWorkerClient = /** @class */ (function (_super) {
    __extends(SimpleWorkerClient, _super);
    function SimpleWorkerClient(workerFactory, moduleId) {
        var _this = _super.call(this) || this;
        var lazyProxyReject = null;
        _this._worker = _this._register(workerFactory.create('vs/base/common/worker/simpleWorker', function (msg) {
            _this._protocol.handleMessage(msg);
        }, function (err) {
            // in Firefox, web workers fail lazily :(
            // we will reject the proxy
            if (lazyProxyReject) {
                lazyProxyReject(err);
            }
        }));
        _this._protocol = new SimpleWorkerProtocol({
            sendMessage: function (msg) {
                _this._worker.postMessage(msg);
            },
            handleMessage: function (method, args) {
                // Intentionally not supporting worker -> main requests
                return Promise.resolve(null);
            }
        });
        _this._protocol.setWorkerId(_this._worker.getId());
        // Gather loader configuration
        var loaderConfiguration = null;
        if (typeof self.require !== 'undefined' && typeof self.require.getConfig === 'function') {
            // Get the configuration from the Monaco AMD Loader
            loaderConfiguration = self.require.getConfig();
        }
        else if (typeof self.requirejs !== 'undefined') {
            // Get the configuration from requirejs
            loaderConfiguration = self.requirejs.s.contexts._.config;
        }
        // Send initialize message
        _this._onModuleLoaded = _this._protocol.sendMessage(INITIALIZE, [
            _this._worker.getId(),
            moduleId,
            loaderConfiguration
        ]);
        _this._lazyProxy = new Promise(function (resolve, reject) {
            lazyProxyReject = reject;
            _this._onModuleLoaded.then(function (availableMethods) {
                var proxy = {};
                for (var _i = 0, availableMethods_1 = availableMethods; _i < availableMethods_1.length; _i++) {
                    var methodName = availableMethods_1[_i];
                    proxy[methodName] = createProxyMethod(methodName, proxyMethodRequest);
                }
                resolve(proxy);
            }, function (e) {
                reject(e);
                _this._onError('Worker failed to load ' + moduleId, e);
            });
        });
        // Create proxy to loaded code
        var proxyMethodRequest = function (method, args) {
            return _this._request(method, args);
        };
        var createProxyMethod = function (method, proxyMethodRequest) {
            return function () {
                var args = Array.prototype.slice.call(arguments, 0);
                return proxyMethodRequest(method, args);
            };
        };
        return _this;
    }
    SimpleWorkerClient.prototype.getProxyObject = function () {
        return this._lazyProxy;
    };
    SimpleWorkerClient.prototype._request = function (method, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._onModuleLoaded.then(function () {
                _this._protocol.sendMessage(method, args).then(resolve, reject);
            }, reject);
        });
    };
    SimpleWorkerClient.prototype._onError = function (message, error) {
        console.error(message);
        console.info(error);
    };
    return SimpleWorkerClient;
}(_lifecycle_js__WEBPACK_IMPORTED_MODULE_1__["Disposable"]));

/**
 * Worker side
 */
var SimpleWorkerServer = /** @class */ (function () {
    function SimpleWorkerServer(postSerializedMessage, requestHandler) {
        var _this = this;
        this._requestHandler = requestHandler;
        this._protocol = new SimpleWorkerProtocol({
            sendMessage: function (msg) {
                postSerializedMessage(msg);
            },
            handleMessage: function (method, args) { return _this._handleMessage(method, args); }
        });
    }
    SimpleWorkerServer.prototype.onmessage = function (msg) {
        this._protocol.handleMessage(msg);
    };
    SimpleWorkerServer.prototype._handleMessage = function (method, args) {
        if (method === INITIALIZE) {
            return this.initialize(args[0], args[1], args[2]);
        }
        if (!this._requestHandler || typeof this._requestHandler[method] !== 'function') {
            return Promise.reject(new Error('Missing requestHandler or method: ' + method));
        }
        try {
            return Promise.resolve(this._requestHandler[method].apply(this._requestHandler, args));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    SimpleWorkerServer.prototype.initialize = function (workerId, moduleId, loaderConfig) {
        var _this = this;
        this._protocol.setWorkerId(workerId);
        if (this._requestHandler) {
            // static request handler
            var methods = [];
            for (var _i = 0, _a = Object(_types_js__WEBPACK_IMPORTED_MODULE_3__["getAllPropertyNames"])(this._requestHandler); _i < _a.length; _i++) {
                var prop = _a[_i];
                if (typeof this._requestHandler[prop] === 'function') {
                    methods.push(prop);
                }
            }
            return Promise.resolve(methods);
        }
        if (loaderConfig) {
            // Remove 'baseUrl', handling it is beyond scope for now
            if (typeof loaderConfig.baseUrl !== 'undefined') {
                delete loaderConfig['baseUrl'];
            }
            if (typeof loaderConfig.paths !== 'undefined') {
                if (typeof loaderConfig.paths.vs !== 'undefined') {
                    delete loaderConfig.paths['vs'];
                }
            }
            // Since this is in a web worker, enable catching errors
            loaderConfig.catchError = true;
            self.require.config(loaderConfig);
        }
        return new Promise(function (resolve, reject) {
            // Use the global require to be sure to get the global config
            self.require([moduleId], function () {
                var result = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    result[_i] = arguments[_i];
                }
                var handlerModule = result[0];
                _this._requestHandler = handlerModule.create();
                if (!_this._requestHandler) {
                    reject(new Error("No RequestHandler!"));
                    return;
                }
                var methods = [];
                for (var _a = 0, _b = Object(_types_js__WEBPACK_IMPORTED_MODULE_3__["getAllPropertyNames"])(_this._requestHandler); _a < _b.length; _a++) {
                    var prop = _b[_a];
                    if (typeof _this._requestHandler[prop] === 'function') {
                        methods.push(prop);
                    }
                }
                resolve(methods);
            }, reject);
        });
    };
    return SimpleWorkerServer;
}());

/**
 * Called on the worker side
 */
function create(postMessage) {
    return new SimpleWorkerServer(postMessage, null);
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/core/characterClassifier.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/core/characterClassifier.js ***!
  \*************************************************************************************/
/*! exports provided: CharacterClassifier, CharacterSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterClassifier", function() { return CharacterClassifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterSet", function() { return CharacterSet; });
/* harmony import */ var _uint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uint.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/uint.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A fast character classifier that uses a compact array for ASCII values.
 */
var CharacterClassifier = /** @class */ (function () {
    function CharacterClassifier(_defaultValue) {
        var defaultValue = Object(_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint8"])(_defaultValue);
        this._defaultValue = defaultValue;
        this._asciiMap = CharacterClassifier._createAsciiMap(defaultValue);
        this._map = new Map();
    }
    CharacterClassifier._createAsciiMap = function (defaultValue) {
        var asciiMap = new Uint8Array(256);
        for (var i = 0; i < 256; i++) {
            asciiMap[i] = defaultValue;
        }
        return asciiMap;
    };
    CharacterClassifier.prototype.set = function (charCode, _value) {
        var value = Object(_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint8"])(_value);
        if (charCode >= 0 && charCode < 256) {
            this._asciiMap[charCode] = value;
        }
        else {
            this._map.set(charCode, value);
        }
    };
    CharacterClassifier.prototype.get = function (charCode) {
        if (charCode >= 0 && charCode < 256) {
            return this._asciiMap[charCode];
        }
        else {
            return (this._map.get(charCode) || this._defaultValue);
        }
    };
    return CharacterClassifier;
}());

var CharacterSet = /** @class */ (function () {
    function CharacterSet() {
        this._actual = new CharacterClassifier(0 /* False */);
    }
    CharacterSet.prototype.add = function (charCode) {
        this._actual.set(charCode, 1 /* True */);
    };
    CharacterSet.prototype.has = function (charCode) {
        return (this._actual.get(charCode) === 1 /* True */);
    };
    return CharacterSet;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/core/position.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/core/position.js ***!
  \**************************************************************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * A position in the editor.
 */
var Position = /** @class */ (function () {
    function Position(lineNumber, column) {
        this.lineNumber = lineNumber;
        this.column = column;
    }
    /**
     * Create a new postion from this position.
     *
     * @param newLineNumber new line number
     * @param newColumn new column
     */
    Position.prototype.with = function (newLineNumber, newColumn) {
        if (newLineNumber === void 0) { newLineNumber = this.lineNumber; }
        if (newColumn === void 0) { newColumn = this.column; }
        if (newLineNumber === this.lineNumber && newColumn === this.column) {
            return this;
        }
        else {
            return new Position(newLineNumber, newColumn);
        }
    };
    /**
     * Derive a new position from this position.
     *
     * @param deltaLineNumber line number delta
     * @param deltaColumn column delta
     */
    Position.prototype.delta = function (deltaLineNumber, deltaColumn) {
        if (deltaLineNumber === void 0) { deltaLineNumber = 0; }
        if (deltaColumn === void 0) { deltaColumn = 0; }
        return this.with(this.lineNumber + deltaLineNumber, this.column + deltaColumn);
    };
    /**
     * Test if this position equals other position
     */
    Position.prototype.equals = function (other) {
        return Position.equals(this, other);
    };
    /**
     * Test if position `a` equals position `b`
     */
    Position.equals = function (a, b) {
        if (!a && !b) {
            return true;
        }
        return (!!a &&
            !!b &&
            a.lineNumber === b.lineNumber &&
            a.column === b.column);
    };
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */
    Position.prototype.isBefore = function (other) {
        return Position.isBefore(this, other);
    };
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */
    Position.isBefore = function (a, b) {
        if (a.lineNumber < b.lineNumber) {
            return true;
        }
        if (b.lineNumber < a.lineNumber) {
            return false;
        }
        return a.column < b.column;
    };
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */
    Position.prototype.isBeforeOrEqual = function (other) {
        return Position.isBeforeOrEqual(this, other);
    };
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */
    Position.isBeforeOrEqual = function (a, b) {
        if (a.lineNumber < b.lineNumber) {
            return true;
        }
        if (b.lineNumber < a.lineNumber) {
            return false;
        }
        return a.column <= b.column;
    };
    /**
     * A function that compares positions, useful for sorting
     */
    Position.compare = function (a, b) {
        var aLineNumber = a.lineNumber | 0;
        var bLineNumber = b.lineNumber | 0;
        if (aLineNumber === bLineNumber) {
            var aColumn = a.column | 0;
            var bColumn = b.column | 0;
            return aColumn - bColumn;
        }
        return aLineNumber - bLineNumber;
    };
    /**
     * Clone this position.
     */
    Position.prototype.clone = function () {
        return new Position(this.lineNumber, this.column);
    };
    /**
     * Convert to a human-readable representation.
     */
    Position.prototype.toString = function () {
        return '(' + this.lineNumber + ',' + this.column + ')';
    };
    // ---
    /**
     * Create a `Position` from an `IPosition`.
     */
    Position.lift = function (pos) {
        return new Position(pos.lineNumber, pos.column);
    };
    /**
     * Test if `obj` is an `IPosition`.
     */
    Position.isIPosition = function (obj) {
        return (obj
            && (typeof obj.lineNumber === 'number')
            && (typeof obj.column === 'number'));
    };
    return Position;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/core/range.js":
/*!***********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/core/range.js ***!
  \***********************************************************************/
/*! exports provided: Range */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony import */ var _position_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/position.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
 */
var Range = /** @class */ (function () {
    function Range(startLineNumber, startColumn, endLineNumber, endColumn) {
        if ((startLineNumber > endLineNumber) || (startLineNumber === endLineNumber && startColumn > endColumn)) {
            this.startLineNumber = endLineNumber;
            this.startColumn = endColumn;
            this.endLineNumber = startLineNumber;
            this.endColumn = startColumn;
        }
        else {
            this.startLineNumber = startLineNumber;
            this.startColumn = startColumn;
            this.endLineNumber = endLineNumber;
            this.endColumn = endColumn;
        }
    }
    /**
     * Test if this range is empty.
     */
    Range.prototype.isEmpty = function () {
        return Range.isEmpty(this);
    };
    /**
     * Test if `range` is empty.
     */
    Range.isEmpty = function (range) {
        return (range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn);
    };
    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */
    Range.prototype.containsPosition = function (position) {
        return Range.containsPosition(this, position);
    };
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return true.
     */
    Range.containsPosition = function (range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
            return false;
        }
        if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
            return false;
        }
        if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
            return false;
        }
        return true;
    };
    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */
    Range.prototype.containsRange = function (range) {
        return Range.containsRange(this, range);
    };
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */
    Range.containsRange = function (range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
            return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
            return false;
        }
        return true;
    };
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    Range.prototype.plusRange = function (range) {
        return Range.plusRange(this, range);
    };
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    Range.plusRange = function (a, b) {
        var startLineNumber;
        var startColumn;
        var endLineNumber;
        var endColumn;
        if (b.startLineNumber < a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = b.startColumn;
        }
        else if (b.startLineNumber === a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = Math.min(b.startColumn, a.startColumn);
        }
        else {
            startLineNumber = a.startLineNumber;
            startColumn = a.startColumn;
        }
        if (b.endLineNumber > a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = b.endColumn;
        }
        else if (b.endLineNumber === a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = Math.max(b.endColumn, a.endColumn);
        }
        else {
            endLineNumber = a.endLineNumber;
            endColumn = a.endColumn;
        }
        return new Range(startLineNumber, startColumn, endLineNumber, endColumn);
    };
    /**
     * A intersection of the two ranges.
     */
    Range.prototype.intersectRanges = function (range) {
        return Range.intersectRanges(this, range);
    };
    /**
     * A intersection of the two ranges.
     */
    Range.intersectRanges = function (a, b) {
        var resultStartLineNumber = a.startLineNumber;
        var resultStartColumn = a.startColumn;
        var resultEndLineNumber = a.endLineNumber;
        var resultEndColumn = a.endColumn;
        var otherStartLineNumber = b.startLineNumber;
        var otherStartColumn = b.startColumn;
        var otherEndLineNumber = b.endLineNumber;
        var otherEndColumn = b.endColumn;
        if (resultStartLineNumber < otherStartLineNumber) {
            resultStartLineNumber = otherStartLineNumber;
            resultStartColumn = otherStartColumn;
        }
        else if (resultStartLineNumber === otherStartLineNumber) {
            resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
        }
        if (resultEndLineNumber > otherEndLineNumber) {
            resultEndLineNumber = otherEndLineNumber;
            resultEndColumn = otherEndColumn;
        }
        else if (resultEndLineNumber === otherEndLineNumber) {
            resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
        }
        // Check if selection is now empty
        if (resultStartLineNumber > resultEndLineNumber) {
            return null;
        }
        if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
            return null;
        }
        return new Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
    };
    /**
     * Test if this range equals other.
     */
    Range.prototype.equalsRange = function (other) {
        return Range.equalsRange(this, other);
    };
    /**
     * Test if range `a` equals `b`.
     */
    Range.equalsRange = function (a, b) {
        return (!!a &&
            !!b &&
            a.startLineNumber === b.startLineNumber &&
            a.startColumn === b.startColumn &&
            a.endLineNumber === b.endLineNumber &&
            a.endColumn === b.endColumn);
    };
    /**
     * Return the end position (which will be after or equal to the start position)
     */
    Range.prototype.getEndPosition = function () {
        return new _position_js__WEBPACK_IMPORTED_MODULE_0__["Position"](this.endLineNumber, this.endColumn);
    };
    /**
     * Return the start position (which will be before or equal to the end position)
     */
    Range.prototype.getStartPosition = function () {
        return new _position_js__WEBPACK_IMPORTED_MODULE_0__["Position"](this.startLineNumber, this.startColumn);
    };
    /**
     * Transform to a user presentable string representation.
     */
    Range.prototype.toString = function () {
        return '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']';
    };
    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */
    Range.prototype.setEndPosition = function (endLineNumber, endColumn) {
        return new Range(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    };
    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */
    Range.prototype.setStartPosition = function (startLineNumber, startColumn) {
        return new Range(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    };
    /**
     * Create a new empty range using this range's start position.
     */
    Range.prototype.collapseToStart = function () {
        return Range.collapseToStart(this);
    };
    /**
     * Create a new empty range using this range's start position.
     */
    Range.collapseToStart = function (range) {
        return new Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
    };
    // ---
    Range.fromPositions = function (start, end) {
        if (end === void 0) { end = start; }
        return new Range(start.lineNumber, start.column, end.lineNumber, end.column);
    };
    Range.lift = function (range) {
        if (!range) {
            return null;
        }
        return new Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    };
    /**
     * Test if `obj` is an `IRange`.
     */
    Range.isIRange = function (obj) {
        return (obj
            && (typeof obj.startLineNumber === 'number')
            && (typeof obj.startColumn === 'number')
            && (typeof obj.endLineNumber === 'number')
            && (typeof obj.endColumn === 'number'));
    };
    /**
     * Test if the two ranges are touching in any way.
     */
    Range.areIntersectingOrTouching = function (a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || (a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn)) {
            return false;
        }
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || (b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn)) {
            return false;
        }
        // These ranges must intersect
        return true;
    };
    /**
     * Test if the two ranges are intersecting. If the ranges are touching it returns true.
     */
    Range.areIntersecting = function (a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || (a.endLineNumber === b.startLineNumber && a.endColumn <= b.startColumn)) {
            return false;
        }
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || (b.endLineNumber === a.startLineNumber && b.endColumn <= a.startColumn)) {
            return false;
        }
        // These ranges must intersect
        return true;
    };
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the startPosition and then on the endPosition
     */
    Range.compareRangesUsingStarts = function (a, b) {
        if (a && b) {
            var aStartLineNumber = a.startLineNumber | 0;
            var bStartLineNumber = b.startLineNumber | 0;
            if (aStartLineNumber === bStartLineNumber) {
                var aStartColumn = a.startColumn | 0;
                var bStartColumn = b.startColumn | 0;
                if (aStartColumn === bStartColumn) {
                    var aEndLineNumber = a.endLineNumber | 0;
                    var bEndLineNumber = b.endLineNumber | 0;
                    if (aEndLineNumber === bEndLineNumber) {
                        var aEndColumn = a.endColumn | 0;
                        var bEndColumn = b.endColumn | 0;
                        return aEndColumn - bEndColumn;
                    }
                    return aEndLineNumber - bEndLineNumber;
                }
                return aStartColumn - bStartColumn;
            }
            return aStartLineNumber - bStartLineNumber;
        }
        var aExists = (a ? 1 : 0);
        var bExists = (b ? 1 : 0);
        return aExists - bExists;
    };
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the endPosition and then on the startPosition
     */
    Range.compareRangesUsingEnds = function (a, b) {
        if (a.endLineNumber === b.endLineNumber) {
            if (a.endColumn === b.endColumn) {
                if (a.startLineNumber === b.startLineNumber) {
                    return a.startColumn - b.startColumn;
                }
                return a.startLineNumber - b.startLineNumber;
            }
            return a.endColumn - b.endColumn;
        }
        return a.endLineNumber - b.endLineNumber;
    };
    /**
     * Test if the range spans multiple lines.
     */
    Range.spansMultipleLines = function (range) {
        return range.endLineNumber > range.startLineNumber;
    };
    return Range;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/core/selection.js":
/*!***************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/core/selection.js ***!
  \***************************************************************************/
/*! exports provided: Selection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return Selection; });
/* harmony import */ var _position_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/position.js");
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/range.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * A selection in the editor.
 * The selection is a range that has an orientation.
 */
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
        var _this = _super.call(this, selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) || this;
        _this.selectionStartLineNumber = selectionStartLineNumber;
        _this.selectionStartColumn = selectionStartColumn;
        _this.positionLineNumber = positionLineNumber;
        _this.positionColumn = positionColumn;
        return _this;
    }
    /**
     * Clone this selection.
     */
    Selection.prototype.clone = function () {
        return new Selection(this.selectionStartLineNumber, this.selectionStartColumn, this.positionLineNumber, this.positionColumn);
    };
    /**
     * Transform to a human-readable representation.
     */
    Selection.prototype.toString = function () {
        return '[' + this.selectionStartLineNumber + ',' + this.selectionStartColumn + ' -> ' + this.positionLineNumber + ',' + this.positionColumn + ']';
    };
    /**
     * Test if equals other selection.
     */
    Selection.prototype.equalsSelection = function (other) {
        return (Selection.selectionsEqual(this, other));
    };
    /**
     * Test if the two selections are equal.
     */
    Selection.selectionsEqual = function (a, b) {
        return (a.selectionStartLineNumber === b.selectionStartLineNumber &&
            a.selectionStartColumn === b.selectionStartColumn &&
            a.positionLineNumber === b.positionLineNumber &&
            a.positionColumn === b.positionColumn);
    };
    /**
     * Get directions (LTR or RTL).
     */
    Selection.prototype.getDirection = function () {
        if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
            return 0 /* LTR */;
        }
        return 1 /* RTL */;
    };
    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */
    Selection.prototype.setEndPosition = function (endLineNumber, endColumn) {
        if (this.getDirection() === 0 /* LTR */) {
            return new Selection(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
        }
        return new Selection(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
    };
    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */
    Selection.prototype.getPosition = function () {
        return new _position_js__WEBPACK_IMPORTED_MODULE_0__["Position"](this.positionLineNumber, this.positionColumn);
    };
    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */
    Selection.prototype.setStartPosition = function (startLineNumber, startColumn) {
        if (this.getDirection() === 0 /* LTR */) {
            return new Selection(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
        }
        return new Selection(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
    };
    // ----
    /**
     * Create a `Selection` from one or two positions
     */
    Selection.fromPositions = function (start, end) {
        if (end === void 0) { end = start; }
        return new Selection(start.lineNumber, start.column, end.lineNumber, end.column);
    };
    /**
     * Create a `Selection` from an `ISelection`.
     */
    Selection.liftSelection = function (sel) {
        return new Selection(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
    };
    /**
     * `a` equals `b`.
     */
    Selection.selectionsArrEqual = function (a, b) {
        if (a && !b || !a && b) {
            return false;
        }
        if (!a && !b) {
            return true;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0, len = a.length; i < len; i++) {
            if (!this.selectionsEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    };
    /**
     * Test if `obj` is an `ISelection`.
     */
    Selection.isISelection = function (obj) {
        return (obj
            && (typeof obj.selectionStartLineNumber === 'number')
            && (typeof obj.selectionStartColumn === 'number')
            && (typeof obj.positionLineNumber === 'number')
            && (typeof obj.positionColumn === 'number'));
    };
    /**
     * Create with a direction.
     */
    Selection.createWithDirection = function (startLineNumber, startColumn, endLineNumber, endColumn, direction) {
        if (direction === 0 /* LTR */) {
            return new Selection(startLineNumber, startColumn, endLineNumber, endColumn);
        }
        return new Selection(endLineNumber, endColumn, startLineNumber, startColumn);
    };
    return Selection;
}(_range_js__WEBPACK_IMPORTED_MODULE_1__["Range"]));



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/core/token.js":
/*!***********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/core/token.js ***!
  \***********************************************************************/
/*! exports provided: Token, TokenizationResult, TokenizationResult2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return Token; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenizationResult", function() { return TokenizationResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenizationResult2", function() { return TokenizationResult2; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var Token = /** @class */ (function () {
    function Token(offset, type, language) {
        this.offset = offset | 0; // @perf
        this.type = type;
        this.language = language;
    }
    Token.prototype.toString = function () {
        return '(' + this.offset + ', ' + this.type + ')';
    };
    return Token;
}());

var TokenizationResult = /** @class */ (function () {
    function TokenizationResult(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
    }
    return TokenizationResult;
}());

var TokenizationResult2 = /** @class */ (function () {
    function TokenizationResult2(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
    }
    return TokenizationResult2;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/core/uint.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/core/uint.js ***!
  \**********************************************************************/
/*! exports provided: Uint8Matrix, toUint8, toUint32, toUint32Array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint8Matrix", function() { return Uint8Matrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint8", function() { return toUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint32", function() { return toUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint32Array", function() { return toUint32Array; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var Uint8Matrix = /** @class */ (function () {
    function Uint8Matrix(rows, cols, defaultValue) {
        var data = new Uint8Array(rows * cols);
        for (var i = 0, len = rows * cols; i < len; i++) {
            data[i] = defaultValue;
        }
        this._data = data;
        this.rows = rows;
        this.cols = cols;
    }
    Uint8Matrix.prototype.get = function (row, col) {
        return this._data[row * this.cols + col];
    };
    Uint8Matrix.prototype.set = function (row, col, value) {
        this._data[row * this.cols + col] = value;
    };
    return Uint8Matrix;
}());

function toUint8(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 255 /* MAX_UINT_8 */) {
        return 255 /* MAX_UINT_8 */;
    }
    return v | 0;
}
function toUint32(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 4294967295 /* MAX_UINT_32 */) {
        return 4294967295 /* MAX_UINT_32 */;
    }
    return v | 0;
}
function toUint32Array(arr) {
    var len = arr.length;
    var r = new Uint32Array(len);
    for (var i = 0; i < len; i++) {
        r[i] = toUint32(arr[i]);
    }
    return r;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/diff/diffComputer.js":
/*!******************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/diff/diffComputer.js ***!
  \******************************************************************************/
/*! exports provided: DiffComputer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiffComputer", function() { return DiffComputer; });
/* harmony import */ var _base_common_diff_diff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../base/common/diff/diff.js */ "./node_modules/monaco-editor/esm/vs/base/common/diff/diff.js");
/* harmony import */ var _base_common_strings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/common/strings.js */ "./node_modules/monaco-editor/esm/vs/base/common/strings.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var MAXIMUM_RUN_TIME = 5000; // 5 seconds
var MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
function computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
    var diffAlgo = new _base_common_diff_diff_js__WEBPACK_IMPORTED_MODULE_0__["LcsDiff"](originalSequence, modifiedSequence, continueProcessingPredicate);
    return diffAlgo.ComputeDiff(pretty);
}
var LineMarkerSequence = /** @class */ (function () {
    function LineMarkerSequence(lines) {
        var startColumns = [];
        var endColumns = [];
        for (var i = 0, length_1 = lines.length; i < length_1; i++) {
            startColumns[i] = LineMarkerSequence._getFirstNonBlankColumn(lines[i], 1);
            endColumns[i] = LineMarkerSequence._getLastNonBlankColumn(lines[i], 1);
        }
        this._lines = lines;
        this._startColumns = startColumns;
        this._endColumns = endColumns;
    }
    LineMarkerSequence.prototype.getLength = function () {
        return this._lines.length;
    };
    LineMarkerSequence.prototype.getElementAtIndex = function (i) {
        return this._lines[i].substring(this._startColumns[i] - 1, this._endColumns[i] - 1);
    };
    LineMarkerSequence.prototype.getStartLineNumber = function (i) {
        return i + 1;
    };
    LineMarkerSequence.prototype.getEndLineNumber = function (i) {
        return i + 1;
    };
    LineMarkerSequence._getFirstNonBlankColumn = function (txt, defaultValue) {
        var r = _base_common_strings_js__WEBPACK_IMPORTED_MODULE_1__["firstNonWhitespaceIndex"](txt);
        if (r === -1) {
            return defaultValue;
        }
        return r + 1;
    };
    LineMarkerSequence._getLastNonBlankColumn = function (txt, defaultValue) {
        var r = _base_common_strings_js__WEBPACK_IMPORTED_MODULE_1__["lastNonWhitespaceIndex"](txt);
        if (r === -1) {
            return defaultValue;
        }
        return r + 2;
    };
    LineMarkerSequence.prototype.getCharSequence = function (shouldIgnoreTrimWhitespace, startIndex, endIndex) {
        var charCodes = [];
        var lineNumbers = [];
        var columns = [];
        var len = 0;
        for (var index = startIndex; index <= endIndex; index++) {
            var lineContent = this._lines[index];
            var startColumn = (shouldIgnoreTrimWhitespace ? this._startColumns[index] : 1);
            var endColumn = (shouldIgnoreTrimWhitespace ? this._endColumns[index] : lineContent.length + 1);
            for (var col = startColumn; col < endColumn; col++) {
                charCodes[len] = lineContent.charCodeAt(col - 1);
                lineNumbers[len] = index + 1;
                columns[len] = col;
                len++;
            }
        }
        return new CharSequence(charCodes, lineNumbers, columns);
    };
    return LineMarkerSequence;
}());
var CharSequence = /** @class */ (function () {
    function CharSequence(charCodes, lineNumbers, columns) {
        this._charCodes = charCodes;
        this._lineNumbers = lineNumbers;
        this._columns = columns;
    }
    CharSequence.prototype.getLength = function () {
        return this._charCodes.length;
    };
    CharSequence.prototype.getElementAtIndex = function (i) {
        return this._charCodes[i];
    };
    CharSequence.prototype.getStartLineNumber = function (i) {
        return this._lineNumbers[i];
    };
    CharSequence.prototype.getStartColumn = function (i) {
        return this._columns[i];
    };
    CharSequence.prototype.getEndLineNumber = function (i) {
        return this._lineNumbers[i];
    };
    CharSequence.prototype.getEndColumn = function (i) {
        return this._columns[i] + 1;
    };
    return CharSequence;
}());
var CharChange = /** @class */ (function () {
    function CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalStartColumn = originalStartColumn;
        this.originalEndLineNumber = originalEndLineNumber;
        this.originalEndColumn = originalEndColumn;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedStartColumn = modifiedStartColumn;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.modifiedEndColumn = modifiedEndColumn;
    }
    CharChange.createFromDiffChange = function (diffChange, originalCharSequence, modifiedCharSequence) {
        var originalStartLineNumber;
        var originalStartColumn;
        var originalEndLineNumber;
        var originalEndColumn;
        var modifiedStartLineNumber;
        var modifiedStartColumn;
        var modifiedEndLineNumber;
        var modifiedEndColumn;
        if (diffChange.originalLength === 0) {
            originalStartLineNumber = 0;
            originalStartColumn = 0;
            originalEndLineNumber = 0;
            originalEndColumn = 0;
        }
        else {
            originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
            originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
            originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
            originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
            modifiedStartLineNumber = 0;
            modifiedStartColumn = 0;
            modifiedEndLineNumber = 0;
            modifiedEndColumn = 0;
        }
        else {
            modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
            modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
            modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
            modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        return new CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
    };
    return CharChange;
}());
function postProcessCharChanges(rawChanges) {
    if (rawChanges.length <= 1) {
        return rawChanges;
    }
    var result = [rawChanges[0]];
    var prevChange = result[0];
    for (var i = 1, len = rawChanges.length; i < len; i++) {
        var currChange = rawChanges[i];
        var originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
        var modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
        // Both of the above should be equal, but the continueProcessingPredicate may prevent this from being true
        var matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
        if (matchingLength < MINIMUM_MATCHING_CHARACTER_LENGTH) {
            // Merge the current change into the previous one
            prevChange.originalLength = (currChange.originalStart + currChange.originalLength) - prevChange.originalStart;
            prevChange.modifiedLength = (currChange.modifiedStart + currChange.modifiedLength) - prevChange.modifiedStart;
        }
        else {
            // Add the current change
            result.push(currChange);
            prevChange = currChange;
        }
    }
    return result;
}
var LineChange = /** @class */ (function () {
    function LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalEndLineNumber = originalEndLineNumber;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.charChanges = charChanges;
    }
    LineChange.createFromDiffResult = function (shouldIgnoreTrimWhitespace, diffChange, originalLineSequence, modifiedLineSequence, continueProcessingPredicate, shouldComputeCharChanges, shouldPostProcessCharChanges) {
        var originalStartLineNumber;
        var originalEndLineNumber;
        var modifiedStartLineNumber;
        var modifiedEndLineNumber;
        var charChanges = undefined;
        if (diffChange.originalLength === 0) {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
            originalEndLineNumber = 0;
        }
        else {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
            originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
            modifiedEndLineNumber = 0;
        }
        else {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
            modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        if (shouldComputeCharChanges && diffChange.originalLength !== 0 && diffChange.modifiedLength !== 0 && continueProcessingPredicate()) {
            var originalCharSequence = originalLineSequence.getCharSequence(shouldIgnoreTrimWhitespace, diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
            var modifiedCharSequence = modifiedLineSequence.getCharSequence(shouldIgnoreTrimWhitespace, diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
            var rawChanges = computeDiff(originalCharSequence, modifiedCharSequence, continueProcessingPredicate, true);
            if (shouldPostProcessCharChanges) {
                rawChanges = postProcessCharChanges(rawChanges);
            }
            charChanges = [];
            for (var i = 0, length_2 = rawChanges.length; i < length_2; i++) {
                charChanges.push(CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
            }
        }
        return new LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
    };
    return LineChange;
}());
var DiffComputer = /** @class */ (function () {
    function DiffComputer(originalLines, modifiedLines, opts) {
        this.shouldComputeCharChanges = opts.shouldComputeCharChanges;
        this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
        this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
        this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
        this.maximumRunTimeMs = MAXIMUM_RUN_TIME;
        this.originalLines = originalLines;
        this.modifiedLines = modifiedLines;
        this.original = new LineMarkerSequence(originalLines);
        this.modified = new LineMarkerSequence(modifiedLines);
    }
    DiffComputer.prototype.computeDiff = function () {
        if (this.original.getLength() === 1 && this.original.getElementAtIndex(0).length === 0) {
            // empty original => fast path
            return [{
                    originalStartLineNumber: 1,
                    originalEndLineNumber: 1,
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: this.modified.getLength(),
                    charChanges: [{
                            modifiedEndColumn: 0,
                            modifiedEndLineNumber: 0,
                            modifiedStartColumn: 0,
                            modifiedStartLineNumber: 0,
                            originalEndColumn: 0,
                            originalEndLineNumber: 0,
                            originalStartColumn: 0,
                            originalStartLineNumber: 0
                        }]
                }];
        }
        if (this.modified.getLength() === 1 && this.modified.getElementAtIndex(0).length === 0) {
            // empty modified => fast path
            return [{
                    originalStartLineNumber: 1,
                    originalEndLineNumber: this.original.getLength(),
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: 1,
                    charChanges: [{
                            modifiedEndColumn: 0,
                            modifiedEndLineNumber: 0,
                            modifiedStartColumn: 0,
                            modifiedStartLineNumber: 0,
                            originalEndColumn: 0,
                            originalEndLineNumber: 0,
                            originalStartColumn: 0,
                            originalStartLineNumber: 0
                        }]
                }];
        }
        this.computationStartTime = (new Date()).getTime();
        var rawChanges = computeDiff(this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldMakePrettyDiff);
        // The diff is always computed with ignoring trim whitespace
        // This ensures we get the prettiest diff
        if (this.shouldIgnoreTrimWhitespace) {
            var lineChanges = [];
            for (var i = 0, length_3 = rawChanges.length; i < length_3; i++) {
                lineChanges.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, rawChanges[i], this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
            }
            return lineChanges;
        }
        // Need to post-process and introduce changes where the trim whitespace is different
        // Note that we are looping starting at -1 to also cover the lines before the first change
        var result = [];
        var originalLineIndex = 0;
        var modifiedLineIndex = 0;
        for (var i = -1 /* !!!! */, len = rawChanges.length; i < len; i++) {
            var nextChange = (i + 1 < len ? rawChanges[i + 1] : null);
            var originalStop = (nextChange ? nextChange.originalStart : this.originalLines.length);
            var modifiedStop = (nextChange ? nextChange.modifiedStart : this.modifiedLines.length);
            while (originalLineIndex < originalStop && modifiedLineIndex < modifiedStop) {
                var originalLine = this.originalLines[originalLineIndex];
                var modifiedLine = this.modifiedLines[modifiedLineIndex];
                if (originalLine !== modifiedLine) {
                    // These lines differ only in trim whitespace
                    // Check the leading whitespace
                    {
                        var originalStartColumn = LineMarkerSequence._getFirstNonBlankColumn(originalLine, 1);
                        var modifiedStartColumn = LineMarkerSequence._getFirstNonBlankColumn(modifiedLine, 1);
                        while (originalStartColumn > 1 && modifiedStartColumn > 1) {
                            var originalChar = originalLine.charCodeAt(originalStartColumn - 2);
                            var modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
                            if (originalChar !== modifiedChar) {
                                break;
                            }
                            originalStartColumn--;
                            modifiedStartColumn--;
                        }
                        if (originalStartColumn > 1 || modifiedStartColumn > 1) {
                            this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
                        }
                    }
                    // Check the trailing whitespace
                    {
                        var originalEndColumn = LineMarkerSequence._getLastNonBlankColumn(originalLine, 1);
                        var modifiedEndColumn = LineMarkerSequence._getLastNonBlankColumn(modifiedLine, 1);
                        var originalMaxColumn = originalLine.length + 1;
                        var modifiedMaxColumn = modifiedLine.length + 1;
                        while (originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn) {
                            var originalChar = originalLine.charCodeAt(originalEndColumn - 1);
                            var modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
                            if (originalChar !== modifiedChar) {
                                break;
                            }
                            originalEndColumn++;
                            modifiedEndColumn++;
                        }
                        if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) {
                            this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
                        }
                    }
                }
                originalLineIndex++;
                modifiedLineIndex++;
            }
            if (nextChange) {
                // Emit the actual change
                result.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, nextChange, this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
                originalLineIndex += nextChange.originalLength;
                modifiedLineIndex += nextChange.modifiedLength;
            }
        }
        return result;
    };
    DiffComputer.prototype._pushTrimWhitespaceCharChange = function (result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) {
            // Merged into previous
            return;
        }
        var charChanges = undefined;
        if (this.shouldComputeCharChanges) {
            charChanges = [new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)];
        }
        result.push(new LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, charChanges));
    };
    DiffComputer.prototype._mergeTrimWhitespaceCharChange = function (result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        var len = result.length;
        if (len === 0) {
            return false;
        }
        var prevChange = result[len - 1];
        if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) {
            // Don't merge with inserts/deletes
            return false;
        }
        if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
            prevChange.originalEndLineNumber = originalLineNumber;
            prevChange.modifiedEndLineNumber = modifiedLineNumber;
            if (this.shouldComputeCharChanges) {
                prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
            }
            return true;
        }
        return false;
    };
    DiffComputer.prototype._continueProcessingPredicate = function () {
        if (this.maximumRunTimeMs === 0) {
            return true;
        }
        var now = (new Date()).getTime();
        return now - this.computationStartTime < this.maximumRunTimeMs;
    };
    return DiffComputer;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/model/mirrorTextModel.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/model/mirrorTextModel.js ***!
  \**********************************************************************************/
/*! exports provided: MirrorTextModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MirrorTextModel", function() { return MirrorTextModel; });
/* harmony import */ var _core_position_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/position.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/position.js");
/* harmony import */ var _viewModel_prefixSumComputer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewModel/prefixSumComputer.js */ "./node_modules/monaco-editor/esm/vs/editor/common/viewModel/prefixSumComputer.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var MirrorTextModel = /** @class */ (function () {
    function MirrorTextModel(uri, lines, eol, versionId) {
        this._uri = uri;
        this._lines = lines;
        this._eol = eol;
        this._versionId = versionId;
        this._lineStarts = null;
    }
    MirrorTextModel.prototype.dispose = function () {
        this._lines.length = 0;
    };
    MirrorTextModel.prototype.getText = function () {
        return this._lines.join(this._eol);
    };
    MirrorTextModel.prototype.onEvents = function (e) {
        if (e.eol && e.eol !== this._eol) {
            this._eol = e.eol;
            this._lineStarts = null;
        }
        // Update my lines
        var changes = e.changes;
        for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
            var change = changes_1[_i];
            this._acceptDeleteRange(change.range);
            this._acceptInsertText(new _core_position_js__WEBPACK_IMPORTED_MODULE_0__["Position"](change.range.startLineNumber, change.range.startColumn), change.text);
        }
        this._versionId = e.versionId;
    };
    MirrorTextModel.prototype._ensureLineStarts = function () {
        if (!this._lineStarts) {
            var eolLength = this._eol.length;
            var linesLength = this._lines.length;
            var lineStartValues = new Uint32Array(linesLength);
            for (var i = 0; i < linesLength; i++) {
                lineStartValues[i] = this._lines[i].length + eolLength;
            }
            this._lineStarts = new _viewModel_prefixSumComputer_js__WEBPACK_IMPORTED_MODULE_1__["PrefixSumComputer"](lineStartValues);
        }
    };
    /**
     * All changes to a line's text go through this method
     */
    MirrorTextModel.prototype._setLineText = function (lineIndex, newValue) {
        this._lines[lineIndex] = newValue;
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.changeValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
        }
    };
    MirrorTextModel.prototype._acceptDeleteRange = function (range) {
        if (range.startLineNumber === range.endLineNumber) {
            if (range.startColumn === range.endColumn) {
                // Nothing to delete
                return;
            }
            // Delete text on the affected line
            this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1)
                + this._lines[range.startLineNumber - 1].substring(range.endColumn - 1));
            return;
        }
        // Take remaining text on last line and append it to remaining text on first line
        this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1)
            + this._lines[range.endLineNumber - 1].substring(range.endColumn - 1));
        // Delete middle lines
        this._lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        }
    };
    MirrorTextModel.prototype._acceptInsertText = function (position, insertText) {
        if (insertText.length === 0) {
            // Nothing to insert
            return;
        }
        var insertLines = insertText.split(/\r\n|\r|\n/);
        if (insertLines.length === 1) {
            // Inserting text on one line
            this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1)
                + insertLines[0]
                + this._lines[position.lineNumber - 1].substring(position.column - 1));
            return;
        }
        // Append overflowing text from first line to the end of text to insert
        insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
        // Delete overflowing text from first line and insert text on first line
        this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1)
            + insertLines[0]);
        // Insert new lines & store lengths
        var newLengths = new Uint32Array(insertLines.length - 1);
        for (var i = 1; i < insertLines.length; i++) {
            this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
            newLengths[i - 1] = insertLines[i].length + this._eol.length;
        }
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.insertValues(position.lineNumber, newLengths);
        }
    };
    return MirrorTextModel;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/model/wordHelper.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/model/wordHelper.js ***!
  \*****************************************************************************/
/*! exports provided: USUAL_WORD_SEPARATORS, DEFAULT_WORD_REGEXP, ensureValidWordDefinition, getWordAtText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USUAL_WORD_SEPARATORS", function() { return USUAL_WORD_SEPARATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WORD_REGEXP", function() { return DEFAULT_WORD_REGEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureValidWordDefinition", function() { return ensureValidWordDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWordAtText", function() { return getWordAtText; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?';
/**
 * Create a word definition regular expression based on default word separators.
 * Optionally provide allowed separators that should be included in words.
 *
 * The default would look like this:
 * /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
 */
function createWordRegExp(allowInWords) {
    if (allowInWords === void 0) { allowInWords = ''; }
    var source = '(-?\\d*\\.\\d\\w*)|([^';
    for (var _i = 0, USUAL_WORD_SEPARATORS_1 = USUAL_WORD_SEPARATORS; _i < USUAL_WORD_SEPARATORS_1.length; _i++) {
        var sep = USUAL_WORD_SEPARATORS_1[_i];
        if (allowInWords.indexOf(sep) >= 0) {
            continue;
        }
        source += '\\' + sep;
    }
    source += '\\s]+)';
    return new RegExp(source, 'g');
}
// catches numbers (including floating numbers) in the first group, and alphanum in the second
var DEFAULT_WORD_REGEXP = createWordRegExp();
function ensureValidWordDefinition(wordDefinition) {
    var result = DEFAULT_WORD_REGEXP;
    if (wordDefinition && (wordDefinition instanceof RegExp)) {
        if (!wordDefinition.global) {
            var flags = 'g';
            if (wordDefinition.ignoreCase) {
                flags += 'i';
            }
            if (wordDefinition.multiline) {
                flags += 'm';
            }
            if (wordDefinition.unicode) {
                flags += 'u';
            }
            result = new RegExp(wordDefinition.source, flags);
        }
        else {
            result = wordDefinition;
        }
    }
    result.lastIndex = 0;
    return result;
}
function getWordAtPosFast(column, wordDefinition, text, textOffset) {
    // find whitespace enclosed text around column and match from there
    var pos = column - 1 - textOffset;
    var start = text.lastIndexOf(' ', pos - 1) + 1;
    wordDefinition.lastIndex = start;
    var match;
    while (match = wordDefinition.exec(text)) {
        var matchIndex = match.index || 0;
        if (matchIndex <= pos && wordDefinition.lastIndex >= pos) {
            return {
                word: match[0],
                startColumn: textOffset + 1 + matchIndex,
                endColumn: textOffset + 1 + wordDefinition.lastIndex
            };
        }
    }
    return null;
}
function getWordAtPosSlow(column, wordDefinition, text, textOffset) {
    // matches all words starting at the beginning
    // of the input until it finds a match that encloses
    // the desired column. slow but correct
    var pos = column - 1 - textOffset;
    wordDefinition.lastIndex = 0;
    var match;
    while (match = wordDefinition.exec(text)) {
        var matchIndex = match.index || 0;
        if (matchIndex > pos) {
            // |nW -> matched only after the pos
            return null;
        }
        else if (wordDefinition.lastIndex >= pos) {
            // W|W -> match encloses pos
            return {
                word: match[0],
                startColumn: textOffset + 1 + matchIndex,
                endColumn: textOffset + 1 + wordDefinition.lastIndex
            };
        }
    }
    return null;
}
function getWordAtText(column, wordDefinition, text, textOffset) {
    // if `words` can contain whitespace character we have to use the slow variant
    // otherwise we use the fast variant of finding a word
    wordDefinition.lastIndex = 0;
    var match = wordDefinition.exec(text);
    if (!match) {
        return null;
    }
    // todo@joh the `match` could already be the (first) word
    var ret = match[0].indexOf(' ') >= 0
        // did match a word which contains a space character -> use slow word find
        ? getWordAtPosSlow(column, wordDefinition, text, textOffset)
        // sane word definition -> use fast word find
        : getWordAtPosFast(column, wordDefinition, text, textOffset);
    // both (getWordAtPosFast and getWordAtPosSlow) leave the wordDefinition-RegExp
    // in an undefined state and to not confuse other users of the wordDefinition
    // we reset the lastIndex
    wordDefinition.lastIndex = 0;
    return ret;
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/modes/linkComputer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/modes/linkComputer.js ***!
  \*******************************************************************************/
/*! exports provided: StateMachine, LinkComputer, computeLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateMachine", function() { return StateMachine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkComputer", function() { return LinkComputer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeLinks", function() { return computeLinks; });
/* harmony import */ var _core_characterClassifier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/characterClassifier.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/characterClassifier.js");
/* harmony import */ var _core_uint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/uint.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/uint.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var StateMachine = /** @class */ (function () {
    function StateMachine(edges) {
        var maxCharCode = 0;
        var maxState = 0 /* Invalid */;
        for (var i = 0, len = edges.length; i < len; i++) {
            var _a = edges[i], from = _a[0], chCode = _a[1], to = _a[2];
            if (chCode > maxCharCode) {
                maxCharCode = chCode;
            }
            if (from > maxState) {
                maxState = from;
            }
            if (to > maxState) {
                maxState = to;
            }
        }
        maxCharCode++;
        maxState++;
        var states = new _core_uint_js__WEBPACK_IMPORTED_MODULE_1__["Uint8Matrix"](maxState, maxCharCode, 0 /* Invalid */);
        for (var i = 0, len = edges.length; i < len; i++) {
            var _b = edges[i], from = _b[0], chCode = _b[1], to = _b[2];
            states.set(from, chCode, to);
        }
        this._states = states;
        this._maxCharCode = maxCharCode;
    }
    StateMachine.prototype.nextState = function (currentState, chCode) {
        if (chCode < 0 || chCode >= this._maxCharCode) {
            return 0 /* Invalid */;
        }
        return this._states.get(currentState, chCode);
    };
    return StateMachine;
}());

// State machine for http:// or https:// or file://
var _stateMachine = null;
function getStateMachine() {
    if (_stateMachine === null) {
        _stateMachine = new StateMachine([
            [1 /* Start */, 104 /* h */, 2 /* H */],
            [1 /* Start */, 72 /* H */, 2 /* H */],
            [1 /* Start */, 102 /* f */, 6 /* F */],
            [1 /* Start */, 70 /* F */, 6 /* F */],
            [2 /* H */, 116 /* t */, 3 /* HT */],
            [2 /* H */, 84 /* T */, 3 /* HT */],
            [3 /* HT */, 116 /* t */, 4 /* HTT */],
            [3 /* HT */, 84 /* T */, 4 /* HTT */],
            [4 /* HTT */, 112 /* p */, 5 /* HTTP */],
            [4 /* HTT */, 80 /* P */, 5 /* HTTP */],
            [5 /* HTTP */, 115 /* s */, 9 /* BeforeColon */],
            [5 /* HTTP */, 83 /* S */, 9 /* BeforeColon */],
            [5 /* HTTP */, 58 /* Colon */, 10 /* AfterColon */],
            [6 /* F */, 105 /* i */, 7 /* FI */],
            [6 /* F */, 73 /* I */, 7 /* FI */],
            [7 /* FI */, 108 /* l */, 8 /* FIL */],
            [7 /* FI */, 76 /* L */, 8 /* FIL */],
            [8 /* FIL */, 101 /* e */, 9 /* BeforeColon */],
            [8 /* FIL */, 69 /* E */, 9 /* BeforeColon */],
            [9 /* BeforeColon */, 58 /* Colon */, 10 /* AfterColon */],
            [10 /* AfterColon */, 47 /* Slash */, 11 /* AlmostThere */],
            [11 /* AlmostThere */, 47 /* Slash */, 12 /* End */],
        ]);
    }
    return _stateMachine;
}
var _classifier = null;
function getClassifier() {
    if (_classifier === null) {
        _classifier = new _core_characterClassifier_js__WEBPACK_IMPORTED_MODULE_0__["CharacterClassifier"](0 /* None */);
        var FORCE_TERMINATION_CHARACTERS = ' \t<>\'\"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…';
        for (var i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++) {
            _classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1 /* ForceTermination */);
        }
        var CANNOT_END_WITH_CHARACTERS = '.,;';
        for (var i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++) {
            _classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2 /* CannotEndIn */);
        }
    }
    return _classifier;
}
var LinkComputer = /** @class */ (function () {
    function LinkComputer() {
    }
    LinkComputer._createLink = function (classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
        // Do not allow to end link in certain characters...
        var lastIncludedCharIndex = linkEndIndex - 1;
        do {
            var chCode = line.charCodeAt(lastIncludedCharIndex);
            var chClass = classifier.get(chCode);
            if (chClass !== 2 /* CannotEndIn */) {
                break;
            }
            lastIncludedCharIndex--;
        } while (lastIncludedCharIndex > linkBeginIndex);
        // Handle links enclosed in parens, square brackets and curlys.
        if (linkBeginIndex > 0) {
            var charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
            var lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
            if ((charCodeBeforeLink === 40 /* OpenParen */ && lastCharCodeInLink === 41 /* CloseParen */)
                || (charCodeBeforeLink === 91 /* OpenSquareBracket */ && lastCharCodeInLink === 93 /* CloseSquareBracket */)
                || (charCodeBeforeLink === 123 /* OpenCurlyBrace */ && lastCharCodeInLink === 125 /* CloseCurlyBrace */)) {
                // Do not end in ) if ( is before the link start
                // Do not end in ] if [ is before the link start
                // Do not end in } if { is before the link start
                lastIncludedCharIndex--;
            }
        }
        return {
            range: {
                startLineNumber: lineNumber,
                startColumn: linkBeginIndex + 1,
                endLineNumber: lineNumber,
                endColumn: lastIncludedCharIndex + 2
            },
            url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
        };
    };
    LinkComputer.computeLinks = function (model, stateMachine) {
        if (stateMachine === void 0) { stateMachine = getStateMachine(); }
        var classifier = getClassifier();
        var result = [];
        for (var i = 1, lineCount = model.getLineCount(); i <= lineCount; i++) {
            var line = model.getLineContent(i);
            var len = line.length;
            var j = 0;
            var linkBeginIndex = 0;
            var linkBeginChCode = 0;
            var state = 1 /* Start */;
            var hasOpenParens = false;
            var hasOpenSquareBracket = false;
            var hasOpenCurlyBracket = false;
            while (j < len) {
                var resetStateMachine = false;
                var chCode = line.charCodeAt(j);
                if (state === 13 /* Accept */) {
                    var chClass = void 0;
                    switch (chCode) {
                        case 40 /* OpenParen */:
                            hasOpenParens = true;
                            chClass = 0 /* None */;
                            break;
                        case 41 /* CloseParen */:
                            chClass = (hasOpenParens ? 0 /* None */ : 1 /* ForceTermination */);
                            break;
                        case 91 /* OpenSquareBracket */:
                            hasOpenSquareBracket = true;
                            chClass = 0 /* None */;
                            break;
                        case 93 /* CloseSquareBracket */:
                            chClass = (hasOpenSquareBracket ? 0 /* None */ : 1 /* ForceTermination */);
                            break;
                        case 123 /* OpenCurlyBrace */:
                            hasOpenCurlyBracket = true;
                            chClass = 0 /* None */;
                            break;
                        case 125 /* CloseCurlyBrace */:
                            chClass = (hasOpenCurlyBracket ? 0 /* None */ : 1 /* ForceTermination */);
                            break;
                        /* The following three rules make it that ' or " or ` are allowed inside links if the link began with a different one */
                        case 39 /* SingleQuote */:
                            chClass = (linkBeginChCode === 34 /* DoubleQuote */ || linkBeginChCode === 96 /* BackTick */) ? 0 /* None */ : 1 /* ForceTermination */;
                            break;
                        case 34 /* DoubleQuote */:
                            chClass = (linkBeginChCode === 39 /* SingleQuote */ || linkBeginChCode === 96 /* BackTick */) ? 0 /* None */ : 1 /* ForceTermination */;
                            break;
                        case 96 /* BackTick */:
                            chClass = (linkBeginChCode === 39 /* SingleQuote */ || linkBeginChCode === 34 /* DoubleQuote */) ? 0 /* None */ : 1 /* ForceTermination */;
                            break;
                        default:
                            chClass = classifier.get(chCode);
                    }
                    // Check if character terminates link
                    if (chClass === 1 /* ForceTermination */) {
                        result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, j));
                        resetStateMachine = true;
                    }
                }
                else if (state === 12 /* End */) {
                    var chClass = void 0;
                    if (chCode === 91 /* OpenSquareBracket */) {
                        // Allow for the authority part to contain ipv6 addresses which contain [ and ]
                        hasOpenSquareBracket = true;
                        chClass = 0 /* None */;
                    }
                    else {
                        chClass = classifier.get(chCode);
                    }
                    // Check if character terminates link
                    if (chClass === 1 /* ForceTermination */) {
                        resetStateMachine = true;
                    }
                    else {
                        state = 13 /* Accept */;
                    }
                }
                else {
                    state = stateMachine.nextState(state, chCode);
                    if (state === 0 /* Invalid */) {
                        resetStateMachine = true;
                    }
                }
                if (resetStateMachine) {
                    state = 1 /* Start */;
                    hasOpenParens = false;
                    hasOpenSquareBracket = false;
                    hasOpenCurlyBracket = false;
                    // Record where the link started
                    linkBeginIndex = j + 1;
                    linkBeginChCode = chCode;
                }
                j++;
            }
            if (state === 13 /* Accept */) {
                result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, len));
            }
        }
        return result;
    };
    return LinkComputer;
}());

/**
 * Returns an array of all links contains in the provided
 * document. *Note* that this operation is computational
 * expensive and should not run in the UI thread.
 */
function computeLinks(model) {
    if (!model || typeof model.getLineCount !== 'function' || typeof model.getLineContent !== 'function') {
        // Unknown caller!
        return [];
    }
    return LinkComputer.computeLinks(model);
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/modes/supports/inplaceReplaceSupport.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/modes/supports/inplaceReplaceSupport.js ***!
  \*************************************************************************************************/
/*! exports provided: BasicInplaceReplace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicInplaceReplace", function() { return BasicInplaceReplace; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var BasicInplaceReplace = /** @class */ (function () {
    function BasicInplaceReplace() {
        this._defaultValueSet = [
            ['true', 'false'],
            ['True', 'False'],
            ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
            ['public', 'protected', 'private'],
        ];
    }
    BasicInplaceReplace.prototype.navigateValueSet = function (range1, text1, range2, text2, up) {
        if (range1 && text1) {
            var result = this.doNavigateValueSet(text1, up);
            if (result) {
                return {
                    range: range1,
                    value: result
                };
            }
        }
        if (range2 && text2) {
            var result = this.doNavigateValueSet(text2, up);
            if (result) {
                return {
                    range: range2,
                    value: result
                };
            }
        }
        return null;
    };
    BasicInplaceReplace.prototype.doNavigateValueSet = function (text, up) {
        var numberResult = this.numberReplace(text, up);
        if (numberResult !== null) {
            return numberResult;
        }
        return this.textReplace(text, up);
    };
    BasicInplaceReplace.prototype.numberReplace = function (value, up) {
        var precision = Math.pow(10, value.length - (value.lastIndexOf('.') + 1));
        var n1 = Number(value);
        var n2 = parseFloat(value);
        if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
            if (n1 === 0 && !up) {
                return null; // don't do negative
                //			} else if(n1 === 9 && up) {
                //				return null; // don't insert 10 into a number
            }
            else {
                n1 = Math.floor(n1 * precision);
                n1 += up ? precision : -precision;
                return String(n1 / precision);
            }
        }
        return null;
    };
    BasicInplaceReplace.prototype.textReplace = function (value, up) {
        return this.valueSetsReplace(this._defaultValueSet, value, up);
    };
    BasicInplaceReplace.prototype.valueSetsReplace = function (valueSets, value, up) {
        var result = null;
        for (var i = 0, len = valueSets.length; result === null && i < len; i++) {
            result = this.valueSetReplace(valueSets[i], value, up);
        }
        return result;
    };
    BasicInplaceReplace.prototype.valueSetReplace = function (valueSet, value, up) {
        var idx = valueSet.indexOf(value);
        if (idx >= 0) {
            idx += up ? +1 : -1;
            if (idx < 0) {
                idx = valueSet.length - 1;
            }
            else {
                idx %= valueSet.length;
            }
            return valueSet[idx];
        }
        return null;
    };
    BasicInplaceReplace.INSTANCE = new BasicInplaceReplace();
    return BasicInplaceReplace;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js ***!
  \****************************************************************************************/
/*! exports provided: BaseEditorSimpleWorker, EditorSimpleWorkerImpl, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseEditorSimpleWorker", function() { return BaseEditorSimpleWorker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorSimpleWorkerImpl", function() { return EditorSimpleWorkerImpl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _base_common_arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../base/common/arrays.js */ "./node_modules/monaco-editor/esm/vs/base/common/arrays.js");
/* harmony import */ var _base_common_diff_diff_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/common/diff/diff.js */ "./node_modules/monaco-editor/esm/vs/base/common/diff/diff.js");
/* harmony import */ var _base_common_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../base/common/iterator.js */ "./node_modules/monaco-editor/esm/vs/base/common/iterator.js");
/* harmony import */ var _base_common_platform_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../base/common/platform.js */ "./node_modules/monaco-editor/esm/vs/base/common/platform.js");
/* harmony import */ var _base_common_uri_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../base/common/uri.js */ "./node_modules/monaco-editor/esm/vs/base/common/uri.js");
/* harmony import */ var _core_position_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/position.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/position.js");
/* harmony import */ var _core_range_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/range.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/range.js");
/* harmony import */ var _diff_diffComputer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../diff/diffComputer.js */ "./node_modules/monaco-editor/esm/vs/editor/common/diff/diffComputer.js");
/* harmony import */ var _model_mirrorTextModel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../model/mirrorTextModel.js */ "./node_modules/monaco-editor/esm/vs/editor/common/model/mirrorTextModel.js");
/* harmony import */ var _model_wordHelper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../model/wordHelper.js */ "./node_modules/monaco-editor/esm/vs/editor/common/model/wordHelper.js");
/* harmony import */ var _modes_linkComputer_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../modes/linkComputer.js */ "./node_modules/monaco-editor/esm/vs/editor/common/modes/linkComputer.js");
/* harmony import */ var _modes_supports_inplaceReplaceSupport_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../modes/supports/inplaceReplaceSupport.js */ "./node_modules/monaco-editor/esm/vs/editor/common/modes/supports/inplaceReplaceSupport.js");
/* harmony import */ var _standalone_standaloneBase_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../standalone/standaloneBase.js */ "./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneBase.js");
/* harmony import */ var _base_common_types_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../base/common/types.js */ "./node_modules/monaco-editor/esm/vs/base/common/types.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();














/**
 * @internal
 */
var MirrorModel = /** @class */ (function (_super) {
    __extends(MirrorModel, _super);
    function MirrorModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MirrorModel.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MirrorModel.prototype, "version", {
        get: function () {
            return this._versionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MirrorModel.prototype, "eol", {
        get: function () {
            return this._eol;
        },
        enumerable: true,
        configurable: true
    });
    MirrorModel.prototype.getValue = function () {
        return this.getText();
    };
    MirrorModel.prototype.getLinesContent = function () {
        return this._lines.slice(0);
    };
    MirrorModel.prototype.getLineCount = function () {
        return this._lines.length;
    };
    MirrorModel.prototype.getLineContent = function (lineNumber) {
        return this._lines[lineNumber - 1];
    };
    MirrorModel.prototype.getWordAtPosition = function (position, wordDefinition) {
        var wordAtText = Object(_model_wordHelper_js__WEBPACK_IMPORTED_MODULE_9__["getWordAtText"])(position.column, Object(_model_wordHelper_js__WEBPACK_IMPORTED_MODULE_9__["ensureValidWordDefinition"])(wordDefinition), this._lines[position.lineNumber - 1], 0);
        if (wordAtText) {
            return new _core_range_js__WEBPACK_IMPORTED_MODULE_6__["Range"](position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
        }
        return null;
    };
    MirrorModel.prototype.getWordUntilPosition = function (position, wordDefinition) {
        var wordAtPosition = this.getWordAtPosition(position, wordDefinition);
        if (!wordAtPosition) {
            return {
                word: '',
                startColumn: position.column,
                endColumn: position.column
            };
        }
        return {
            word: this._lines[position.lineNumber - 1].substring(wordAtPosition.startColumn - 1, position.column - 1),
            startColumn: wordAtPosition.startColumn,
            endColumn: position.column
        };
    };
    MirrorModel.prototype.createWordIterator = function (wordDefinition) {
        var _this = this;
        var obj;
        var lineNumber = 0;
        var lineText;
        var wordRangesIdx = 0;
        var wordRanges = [];
        var next = function () {
            if (wordRangesIdx < wordRanges.length) {
                var value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
                wordRangesIdx += 1;
                if (!obj) {
                    obj = { done: false, value: value };
                }
                else {
                    obj.value = value;
                }
                return obj;
            }
            else if (lineNumber >= _this._lines.length) {
                return _base_common_iterator_js__WEBPACK_IMPORTED_MODULE_2__["FIN"];
            }
            else {
                lineText = _this._lines[lineNumber];
                wordRanges = _this._wordenize(lineText, wordDefinition);
                wordRangesIdx = 0;
                lineNumber += 1;
                return next();
            }
        };
        return { next: next };
    };
    MirrorModel.prototype.getLineWords = function (lineNumber, wordDefinition) {
        var content = this._lines[lineNumber - 1];
        var ranges = this._wordenize(content, wordDefinition);
        var words = [];
        for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
            var range = ranges_1[_i];
            words.push({
                word: content.substring(range.start, range.end),
                startColumn: range.start + 1,
                endColumn: range.end + 1
            });
        }
        return words;
    };
    MirrorModel.prototype._wordenize = function (content, wordDefinition) {
        var result = [];
        var match;
        wordDefinition.lastIndex = 0; // reset lastIndex just to be sure
        while (match = wordDefinition.exec(content)) {
            if (match[0].length === 0) {
                // it did match the empty string
                break;
            }
            result.push({ start: match.index, end: match.index + match[0].length });
        }
        return result;
    };
    MirrorModel.prototype.getValueInRange = function (range) {
        range = this._validateRange(range);
        if (range.startLineNumber === range.endLineNumber) {
            return this._lines[range.startLineNumber - 1].substring(range.startColumn - 1, range.endColumn - 1);
        }
        var lineEnding = this._eol;
        var startLineIndex = range.startLineNumber - 1;
        var endLineIndex = range.endLineNumber - 1;
        var resultLines = [];
        resultLines.push(this._lines[startLineIndex].substring(range.startColumn - 1));
        for (var i = startLineIndex + 1; i < endLineIndex; i++) {
            resultLines.push(this._lines[i]);
        }
        resultLines.push(this._lines[endLineIndex].substring(0, range.endColumn - 1));
        return resultLines.join(lineEnding);
    };
    MirrorModel.prototype.offsetAt = function (position) {
        position = this._validatePosition(position);
        this._ensureLineStarts();
        return this._lineStarts.getAccumulatedValue(position.lineNumber - 2) + (position.column - 1);
    };
    MirrorModel.prototype.positionAt = function (offset) {
        offset = Math.floor(offset);
        offset = Math.max(0, offset);
        this._ensureLineStarts();
        var out = this._lineStarts.getIndexOf(offset);
        var lineLength = this._lines[out.index].length;
        // Ensure we return a valid position
        return {
            lineNumber: 1 + out.index,
            column: 1 + Math.min(out.remainder, lineLength)
        };
    };
    MirrorModel.prototype._validateRange = function (range) {
        var start = this._validatePosition({ lineNumber: range.startLineNumber, column: range.startColumn });
        var end = this._validatePosition({ lineNumber: range.endLineNumber, column: range.endColumn });
        if (start.lineNumber !== range.startLineNumber
            || start.column !== range.startColumn
            || end.lineNumber !== range.endLineNumber
            || end.column !== range.endColumn) {
            return {
                startLineNumber: start.lineNumber,
                startColumn: start.column,
                endLineNumber: end.lineNumber,
                endColumn: end.column
            };
        }
        return range;
    };
    MirrorModel.prototype._validatePosition = function (position) {
        if (!_core_position_js__WEBPACK_IMPORTED_MODULE_5__["Position"].isIPosition(position)) {
            throw new Error('bad position');
        }
        var lineNumber = position.lineNumber, column = position.column;
        var hasChanged = false;
        if (lineNumber < 1) {
            lineNumber = 1;
            column = 1;
            hasChanged = true;
        }
        else if (lineNumber > this._lines.length) {
            lineNumber = this._lines.length;
            column = this._lines[lineNumber - 1].length + 1;
            hasChanged = true;
        }
        else {
            var maxCharacter = this._lines[lineNumber - 1].length + 1;
            if (column < 1) {
                column = 1;
                hasChanged = true;
            }
            else if (column > maxCharacter) {
                column = maxCharacter;
                hasChanged = true;
            }
        }
        if (!hasChanged) {
            return position;
        }
        else {
            return { lineNumber: lineNumber, column: column };
        }
    };
    return MirrorModel;
}(_model_mirrorTextModel_js__WEBPACK_IMPORTED_MODULE_8__["MirrorTextModel"]));
/**
 * @internal
 */
var BaseEditorSimpleWorker = /** @class */ (function () {
    function BaseEditorSimpleWorker(foreignModuleFactory) {
        this._foreignModuleFactory = foreignModuleFactory;
        this._foreignModule = null;
    }
    // ---- BEGIN diff --------------------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.computeDiff = function (originalUrl, modifiedUrl, ignoreTrimWhitespace) {
        var original = this._getModel(originalUrl);
        var modified = this._getModel(modifiedUrl);
        if (!original || !modified) {
            return Promise.resolve(null);
        }
        var originalLines = original.getLinesContent();
        var modifiedLines = modified.getLinesContent();
        var diffComputer = new _diff_diffComputer_js__WEBPACK_IMPORTED_MODULE_7__["DiffComputer"](originalLines, modifiedLines, {
            shouldComputeCharChanges: true,
            shouldPostProcessCharChanges: true,
            shouldIgnoreTrimWhitespace: ignoreTrimWhitespace,
            shouldMakePrettyDiff: true
        });
        var changes = diffComputer.computeDiff();
        var identical = (changes.length > 0 ? false : this._modelsAreIdentical(original, modified));
        return Promise.resolve({
            identical: identical,
            changes: changes
        });
    };
    BaseEditorSimpleWorker.prototype._modelsAreIdentical = function (original, modified) {
        var originalLineCount = original.getLineCount();
        var modifiedLineCount = modified.getLineCount();
        if (originalLineCount !== modifiedLineCount) {
            return false;
        }
        for (var line = 1; line <= originalLineCount; line++) {
            var originalLine = original.getLineContent(line);
            var modifiedLine = modified.getLineContent(line);
            if (originalLine !== modifiedLine) {
                return false;
            }
        }
        return true;
    };
    BaseEditorSimpleWorker.prototype.computeMoreMinimalEdits = function (modelUrl, edits) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return Promise.resolve(edits);
        }
        var result = [];
        var lastEol = undefined;
        edits = Object(_base_common_arrays_js__WEBPACK_IMPORTED_MODULE_0__["mergeSort"])(edits, function (a, b) {
            if (a.range && b.range) {
                return _core_range_js__WEBPACK_IMPORTED_MODULE_6__["Range"].compareRangesUsingStarts(a.range, b.range);
            }
            // eol only changes should go to the end
            var aRng = a.range ? 0 : 1;
            var bRng = b.range ? 0 : 1;
            return aRng - bRng;
        });
        for (var _i = 0, edits_1 = edits; _i < edits_1.length; _i++) {
            var _a = edits_1[_i], range = _a.range, text = _a.text, eol = _a.eol;
            if (typeof eol === 'number') {
                lastEol = eol;
            }
            if (_core_range_js__WEBPACK_IMPORTED_MODULE_6__["Range"].isEmpty(range) && !text) {
                // empty change
                continue;
            }
            var original = model.getValueInRange(range);
            text = text.replace(/\r\n|\n|\r/g, model.eol);
            if (original === text) {
                // noop
                continue;
            }
            // make sure diff won't take too long
            if (Math.max(text.length, original.length) > BaseEditorSimpleWorker._diffLimit) {
                result.push({ range: range, text: text });
                continue;
            }
            // compute diff between original and edit.text
            var changes = Object(_base_common_diff_diff_js__WEBPACK_IMPORTED_MODULE_1__["stringDiff"])(original, text, false);
            var editOffset = model.offsetAt(_core_range_js__WEBPACK_IMPORTED_MODULE_6__["Range"].lift(range).getStartPosition());
            for (var _b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
                var change = changes_1[_b];
                var start = model.positionAt(editOffset + change.originalStart);
                var end = model.positionAt(editOffset + change.originalStart + change.originalLength);
                var newEdit = {
                    text: text.substr(change.modifiedStart, change.modifiedLength),
                    range: { startLineNumber: start.lineNumber, startColumn: start.column, endLineNumber: end.lineNumber, endColumn: end.column }
                };
                if (model.getValueInRange(newEdit.range) !== newEdit.text) {
                    result.push(newEdit);
                }
            }
        }
        if (typeof lastEol === 'number') {
            result.push({ eol: lastEol, text: '', range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } });
        }
        return Promise.resolve(result);
    };
    // ---- END minimal edits ---------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.computeLinks = function (modelUrl) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return Promise.resolve(null);
        }
        return Promise.resolve(Object(_modes_linkComputer_js__WEBPACK_IMPORTED_MODULE_10__["computeLinks"])(model));
    };
    BaseEditorSimpleWorker.prototype.textualSuggest = function (modelUrl, position, wordDef, wordDefFlags) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return Promise.resolve(null);
        }
        var suggestions = [];
        var wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        var currentWord = model.getWordUntilPosition(position, wordDefRegExp);
        var seen = Object.create(null);
        seen[currentWord.word] = true;
        for (var iter = model.createWordIterator(wordDefRegExp), e = iter.next(); !e.done && suggestions.length <= BaseEditorSimpleWorker._suggestionsLimit; e = iter.next()) {
            var word = e.value;
            if (seen[word]) {
                continue;
            }
            seen[word] = true;
            if (!isNaN(Number(word))) {
                continue;
            }
            suggestions.push({
                kind: 18 /* Text */,
                label: word,
                insertText: word,
                range: { startLineNumber: position.lineNumber, startColumn: currentWord.startColumn, endLineNumber: position.lineNumber, endColumn: currentWord.endColumn }
            });
        }
        return Promise.resolve({ suggestions: suggestions });
    };
    // ---- END suggest --------------------------------------------------------------------------
    //#region -- word ranges --
    BaseEditorSimpleWorker.prototype.computeWordRanges = function (modelUrl, range, wordDef, wordDefFlags) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return Promise.resolve(Object.create(null));
        }
        var wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        var result = Object.create(null);
        for (var line = range.startLineNumber; line < range.endLineNumber; line++) {
            var words = model.getLineWords(line, wordDefRegExp);
            for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                var word = words_1[_i];
                if (!isNaN(Number(word.word))) {
                    continue;
                }
                var array = result[word.word];
                if (!array) {
                    array = [];
                    result[word.word] = array;
                }
                array.push({
                    startLineNumber: line,
                    startColumn: word.startColumn,
                    endLineNumber: line,
                    endColumn: word.endColumn
                });
            }
        }
        return Promise.resolve(result);
    };
    //#endregion
    BaseEditorSimpleWorker.prototype.navigateValueSet = function (modelUrl, range, up, wordDef, wordDefFlags) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return Promise.resolve(null);
        }
        var wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        if (range.startColumn === range.endColumn) {
            range = {
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn + 1
            };
        }
        var selectionText = model.getValueInRange(range);
        var wordRange = model.getWordAtPosition({ lineNumber: range.startLineNumber, column: range.startColumn }, wordDefRegExp);
        if (!wordRange) {
            return Promise.resolve(null);
        }
        var word = model.getValueInRange(wordRange);
        var result = _modes_supports_inplaceReplaceSupport_js__WEBPACK_IMPORTED_MODULE_11__["BasicInplaceReplace"].INSTANCE.navigateValueSet(range, selectionText, wordRange, word, up);
        return Promise.resolve(result);
    };
    // ---- BEGIN foreign module support --------------------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.loadForeignModule = function (moduleId, createData) {
        var _this = this;
        var ctx = {
            getMirrorModels: function () {
                return _this._getModels();
            }
        };
        if (this._foreignModuleFactory) {
            this._foreignModule = this._foreignModuleFactory(ctx, createData);
            // static foreing module
            var methods = [];
            for (var _i = 0, _a = Object(_base_common_types_js__WEBPACK_IMPORTED_MODULE_13__["getAllPropertyNames"])(this._foreignModule); _i < _a.length; _i++) {
                var prop = _a[_i];
                if (typeof this._foreignModule[prop] === 'function') {
                    methods.push(prop);
                }
            }
            return Promise.resolve(methods);
        }
        // ESM-comment-begin
        // 		return new Promise<any>((resolve, reject) => {
        // 			require([moduleId], (foreignModule: { create: IForeignModuleFactory }) => {
        // 				this._foreignModule = foreignModule.create(ctx, createData);
        // 
        // 				let methods: string[] = [];
        // 				for (const prop of getAllPropertyNames(this._foreignModule)) {
        // 					if (typeof this._foreignModule[prop] === 'function') {
        // 						methods.push(prop);
        // 					}
        // 				}
        // 
        // 				resolve(methods);
        // 
        // 			}, reject);
        // 		});
        // ESM-comment-end
        // ESM-uncomment-begin
        return Promise.reject(new Error("Unexpected usage"));
        // ESM-uncomment-end
    };
    // foreign method request
    BaseEditorSimpleWorker.prototype.fmr = function (method, args) {
        if (!this._foreignModule || typeof this._foreignModule[method] !== 'function') {
            return Promise.reject(new Error('Missing requestHandler or method: ' + method));
        }
        try {
            return Promise.resolve(this._foreignModule[method].apply(this._foreignModule, args));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    // ---- END diff --------------------------------------------------------------------------
    // ---- BEGIN minimal edits ---------------------------------------------------------------
    BaseEditorSimpleWorker._diffLimit = 10000;
    // ---- BEGIN suggest --------------------------------------------------------------------------
    BaseEditorSimpleWorker._suggestionsLimit = 10000;
    return BaseEditorSimpleWorker;
}());

/**
 * @internal
 */
var EditorSimpleWorkerImpl = /** @class */ (function (_super) {
    __extends(EditorSimpleWorkerImpl, _super);
    function EditorSimpleWorkerImpl(foreignModuleFactory) {
        var _this = _super.call(this, foreignModuleFactory) || this;
        _this._models = Object.create(null);
        return _this;
    }
    EditorSimpleWorkerImpl.prototype.dispose = function () {
        this._models = Object.create(null);
    };
    EditorSimpleWorkerImpl.prototype._getModel = function (uri) {
        return this._models[uri];
    };
    EditorSimpleWorkerImpl.prototype._getModels = function () {
        var _this = this;
        var all = [];
        Object.keys(this._models).forEach(function (key) { return all.push(_this._models[key]); });
        return all;
    };
    EditorSimpleWorkerImpl.prototype.acceptNewModel = function (data) {
        this._models[data.url] = new MirrorModel(_base_common_uri_js__WEBPACK_IMPORTED_MODULE_4__["URI"].parse(data.url), data.lines, data.EOL, data.versionId);
    };
    EditorSimpleWorkerImpl.prototype.acceptModelChanged = function (strURL, e) {
        if (!this._models[strURL]) {
            return;
        }
        var model = this._models[strURL];
        model.onEvents(e);
    };
    EditorSimpleWorkerImpl.prototype.acceptRemovedModel = function (strURL) {
        if (!this._models[strURL]) {
            return;
        }
        delete this._models[strURL];
    };
    return EditorSimpleWorkerImpl;
}(BaseEditorSimpleWorker));

/**
 * Called on the worker side
 * @internal
 */
function create() {
    return new EditorSimpleWorkerImpl(null);
}
if (typeof importScripts === 'function') {
    // Running in a web worker
    _base_common_platform_js__WEBPACK_IMPORTED_MODULE_3__["globals"].monaco = Object(_standalone_standaloneBase_js__WEBPACK_IMPORTED_MODULE_12__["createMonacoBaseAPI"])();
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/standalone/promise-polyfill/polyfill.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/standalone/promise-polyfill/polyfill.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {/*!
Copyright (c) 2014 Taylor Hakes
Copyright (c) 2014 Forbes Lindesay
 */
(function (global, factory) {
	 true ? factory() :
		undefined;
}(this, (function () {
	'use strict';

	/**
	 * @this {Promise}
	 */
	function finallyConstructor(callback) {
		var constructor = this.constructor;
		return this.then(
			function (value) {
				return constructor.resolve(callback()).then(function () {
					return value;
				});
			},
			function (reason) {
				return constructor.resolve(callback()).then(function () {
					return constructor.reject(reason);
				});
			}
		);
	}

	// Store setTimeout reference so promise-polyfill will be unaffected by
	// other code modifying setTimeout (like sinon.useFakeTimers())
	var setTimeoutFunc = setTimeout;

	function noop() { }

	// Polyfill for Function.prototype.bind
	function bind(fn, thisArg) {
		return function () {
			fn.apply(thisArg, arguments);
		};
	}

	/**
	 * @constructor
	 * @param {Function} fn
	 */
	function Promise(fn) {
		if (!(this instanceof Promise))
			throw new TypeError('Promises must be constructed via new');
		if (typeof fn !== 'function') throw new TypeError('not a function');
		/** @type {!number} */
		this._state = 0;
		/** @type {!boolean} */
		this._handled = false;
		/** @type {Promise|undefined} */
		this._value = undefined;
		/** @type {!Array<!Function>} */
		this._deferreds = [];

		doResolve(fn, this);
	}

	function handle(self, deferred) {
		while (self._state === 3) {
			self = self._value;
		}
		if (self._state === 0) {
			self._deferreds.push(deferred);
			return;
		}
		self._handled = true;
		Promise._immediateFn(function () {
			var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
			if (cb === null) {
				(self._state === 1 ? resolve : reject)(deferred.promise, self._value);
				return;
			}
			var ret;
			try {
				ret = cb(self._value);
			} catch (e) {
				reject(deferred.promise, e);
				return;
			}
			resolve(deferred.promise, ret);
		});
	}

	function resolve(self, newValue) {
		try {
			// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
			if (newValue === self)
				throw new TypeError('A promise cannot be resolved with itself.');
			if (
				newValue &&
				(typeof newValue === 'object' || typeof newValue === 'function')
			) {
				var then = newValue.then;
				if (newValue instanceof Promise) {
					self._state = 3;
					self._value = newValue;
					finale(self);
					return;
				} else if (typeof then === 'function') {
					doResolve(bind(then, newValue), self);
					return;
				}
			}
			self._state = 1;
			self._value = newValue;
			finale(self);
		} catch (e) {
			reject(self, e);
		}
	}

	function reject(self, newValue) {
		self._state = 2;
		self._value = newValue;
		finale(self);
	}

	function finale(self) {
		if (self._state === 2 && self._deferreds.length === 0) {
			Promise._immediateFn(function () {
				if (!self._handled) {
					Promise._unhandledRejectionFn(self._value);
				}
			});
		}

		for (var i = 0, len = self._deferreds.length; i < len; i++) {
			handle(self, self._deferreds[i]);
		}
		self._deferreds = null;
	}

	/**
	 * @constructor
	 */
	function Handler(onFulfilled, onRejected, promise) {
		this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, self) {
		var done = false;
		try {
			fn(
				function (value) {
					if (done) return;
					done = true;
					resolve(self, value);
				},
				function (reason) {
					if (done) return;
					done = true;
					reject(self, reason);
				}
			);
		} catch (ex) {
			if (done) return;
			done = true;
			reject(self, ex);
		}
	}

	Promise.prototype['catch'] = function (onRejected) {
		return this.then(null, onRejected);
	};

	Promise.prototype.then = function (onFulfilled, onRejected) {
		// @ts-ignore
		var prom = new this.constructor(noop);

		handle(this, new Handler(onFulfilled, onRejected, prom));
		return prom;
	};

	Promise.prototype['finally'] = finallyConstructor;

	Promise.all = function (arr) {
		return new Promise(function (resolve, reject) {
			if (!arr || typeof arr.length === 'undefined')
				throw new TypeError('Promise.all accepts an array');
			var args = Array.prototype.slice.call(arr);
			if (args.length === 0) return resolve([]);
			var remaining = args.length;

			function res(i, val) {
				try {
					if (val && (typeof val === 'object' || typeof val === 'function')) {
						var then = val.then;
						if (typeof then === 'function') {
							then.call(
								val,
								function (val) {
									res(i, val);
								},
								reject
							);
							return;
						}
					}
					args[i] = val;
					if (--remaining === 0) {
						resolve(args);
					}
				} catch (ex) {
					reject(ex);
				}
			}

			for (var i = 0; i < args.length; i++) {
				res(i, args[i]);
			}
		});
	};

	Promise.resolve = function (value) {
		if (value && typeof value === 'object' && value.constructor === Promise) {
			return value;
		}

		return new Promise(function (resolve) {
			resolve(value);
		});
	};

	Promise.reject = function (value) {
		return new Promise(function (resolve, reject) {
			reject(value);
		});
	};

	Promise.race = function (values) {
		return new Promise(function (resolve, reject) {
			for (var i = 0, len = values.length; i < len; i++) {
				values[i].then(resolve, reject);
			}
		});
	};

	// Use polyfill for setImmediate for performance gains
	Promise._immediateFn =
		(typeof setImmediate === 'function' &&
			function (fn) {
				setImmediate(fn);
			}) ||
		function (fn) {
			setTimeoutFunc(fn, 0);
		};

	Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
		if (typeof console !== 'undefined' && console) {
			console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
		}
	};

	/** @suppress {undefinedVars} */
	var globalNS = (function () {
		// the only reliable means to get the global object is
		// `Function('return this')()`
		// However, this causes CSP violations in Chrome apps.
		if (typeof self !== 'undefined') {
			return self;
		}
		if (typeof window !== 'undefined') {
			return window;
		}
		if (typeof global !== 'undefined') {
			return global;
		}
		throw new Error('unable to locate global object');
	})();

	if (!('Promise' in globalNS)) {
		globalNS['Promise'] = Promise;
	} else if (!globalNS.Promise.prototype['finally']) {
		globalNS.Promise.prototype['finally'] = finallyConstructor;
	}

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneBase.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneBase.js ***!
  \**************************************************************************************/
/*! exports provided: KeyMod, createMonacoBaseAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyMod", function() { return KeyMod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMonacoBaseAPI", function() { return createMonacoBaseAPI; });
/* harmony import */ var _promise_polyfill_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./promise-polyfill/polyfill.js */ "./node_modules/monaco-editor/esm/vs/editor/common/standalone/promise-polyfill/polyfill.js");
/* harmony import */ var _promise_polyfill_polyfill_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_promise_polyfill_polyfill_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_common_cancellation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/common/cancellation.js */ "./node_modules/monaco-editor/esm/vs/base/common/cancellation.js");
/* harmony import */ var _base_common_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../base/common/event.js */ "./node_modules/monaco-editor/esm/vs/base/common/event.js");
/* harmony import */ var _base_common_keyCodes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../base/common/keyCodes.js */ "./node_modules/monaco-editor/esm/vs/base/common/keyCodes.js");
/* harmony import */ var _base_common_uri_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../base/common/uri.js */ "./node_modules/monaco-editor/esm/vs/base/common/uri.js");
/* harmony import */ var _core_position_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/position.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/position.js");
/* harmony import */ var _core_range_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/range.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/range.js");
/* harmony import */ var _core_selection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/selection.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/selection.js");
/* harmony import */ var _core_token_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/token.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/token.js");
/* harmony import */ var _standaloneEnums_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./standaloneEnums.js */ "./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneEnums.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/










var KeyMod = /** @class */ (function () {
    function KeyMod() {
    }
    KeyMod.chord = function (firstPart, secondPart) {
        return Object(_base_common_keyCodes_js__WEBPACK_IMPORTED_MODULE_3__["KeyChord"])(firstPart, secondPart);
    };
    KeyMod.CtrlCmd = 2048 /* CtrlCmd */;
    KeyMod.Shift = 1024 /* Shift */;
    KeyMod.Alt = 512 /* Alt */;
    KeyMod.WinCtrl = 256 /* WinCtrl */;
    return KeyMod;
}());

function createMonacoBaseAPI() {
    return {
        editor: undefined,
        languages: undefined,
        CancellationTokenSource: _base_common_cancellation_js__WEBPACK_IMPORTED_MODULE_1__["CancellationTokenSource"],
        Emitter: _base_common_event_js__WEBPACK_IMPORTED_MODULE_2__["Emitter"],
        KeyCode: _standaloneEnums_js__WEBPACK_IMPORTED_MODULE_9__["KeyCode"],
        KeyMod: KeyMod,
        Position: _core_position_js__WEBPACK_IMPORTED_MODULE_5__["Position"],
        Range: _core_range_js__WEBPACK_IMPORTED_MODULE_6__["Range"],
        Selection: _core_selection_js__WEBPACK_IMPORTED_MODULE_7__["Selection"],
        SelectionDirection: _standaloneEnums_js__WEBPACK_IMPORTED_MODULE_9__["SelectionDirection"],
        MarkerSeverity: _standaloneEnums_js__WEBPACK_IMPORTED_MODULE_9__["MarkerSeverity"],
        MarkerTag: _standaloneEnums_js__WEBPACK_IMPORTED_MODULE_9__["MarkerTag"],
        Uri: _base_common_uri_js__WEBPACK_IMPORTED_MODULE_4__["URI"],
        Token: _core_token_js__WEBPACK_IMPORTED_MODULE_8__["Token"]
    };
}


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneEnums.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneEnums.js ***!
  \***************************************************************************************/
/*! exports provided: MarkerTag, MarkerSeverity, KeyCode, SelectionDirection, ScrollbarVisibility, OverviewRulerLane, EndOfLinePreference, DefaultEndOfLine, EndOfLineSequence, TrackedRangeStickiness, ScrollType, CursorChangeReason, RenderMinimap, WrappingIndent, TextEditorCursorBlinkingStyle, TextEditorCursorStyle, RenderLineNumbersType, ContentWidgetPositionPreference, OverlayWidgetPositionPreference, MouseTargetType, IndentAction, CompletionItemKind, CompletionItemInsertTextRule, CompletionTriggerKind, SignatureHelpTriggerKind, DocumentHighlightKind, SymbolKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkerTag", function() { return MarkerTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkerSeverity", function() { return MarkerSeverity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCode", function() { return KeyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionDirection", function() { return SelectionDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollbarVisibility", function() { return ScrollbarVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewRulerLane", function() { return OverviewRulerLane; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndOfLinePreference", function() { return EndOfLinePreference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultEndOfLine", function() { return DefaultEndOfLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndOfLineSequence", function() { return EndOfLineSequence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackedRangeStickiness", function() { return TrackedRangeStickiness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollType", function() { return ScrollType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CursorChangeReason", function() { return CursorChangeReason; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderMinimap", function() { return RenderMinimap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WrappingIndent", function() { return WrappingIndent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEditorCursorBlinkingStyle", function() { return TextEditorCursorBlinkingStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEditorCursorStyle", function() { return TextEditorCursorStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderLineNumbersType", function() { return RenderLineNumbersType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentWidgetPositionPreference", function() { return ContentWidgetPositionPreference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverlayWidgetPositionPreference", function() { return OverlayWidgetPositionPreference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseTargetType", function() { return MouseTargetType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndentAction", function() { return IndentAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemKind", function() { return CompletionItemKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemInsertTextRule", function() { return CompletionItemInsertTextRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionTriggerKind", function() { return CompletionTriggerKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureHelpTriggerKind", function() { return SignatureHelpTriggerKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlightKind", function() { return DocumentHighlightKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolKind", function() { return SymbolKind; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// THIS IS A GENERATED FILE. DO NOT EDIT DIRECTLY.
var MarkerTag;
(function (MarkerTag) {
    MarkerTag[MarkerTag["Unnecessary"] = 1] = "Unnecessary";
})(MarkerTag || (MarkerTag = {}));
var MarkerSeverity;
(function (MarkerSeverity) {
    MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
    MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
    MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
    MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})(MarkerSeverity || (MarkerSeverity = {}));
/**
 * Virtual Key Codes, the value does not hold any inherent meaning.
 * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
 * But these are "more general", as they should work across browsers & OS`s.
 */
var KeyCode;
(function (KeyCode) {
    /**
     * Placed first to cover the 0 value of the enum.
     */
    KeyCode[KeyCode["Unknown"] = 0] = "Unknown";
    KeyCode[KeyCode["Backspace"] = 1] = "Backspace";
    KeyCode[KeyCode["Tab"] = 2] = "Tab";
    KeyCode[KeyCode["Enter"] = 3] = "Enter";
    KeyCode[KeyCode["Shift"] = 4] = "Shift";
    KeyCode[KeyCode["Ctrl"] = 5] = "Ctrl";
    KeyCode[KeyCode["Alt"] = 6] = "Alt";
    KeyCode[KeyCode["PauseBreak"] = 7] = "PauseBreak";
    KeyCode[KeyCode["CapsLock"] = 8] = "CapsLock";
    KeyCode[KeyCode["Escape"] = 9] = "Escape";
    KeyCode[KeyCode["Space"] = 10] = "Space";
    KeyCode[KeyCode["PageUp"] = 11] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 12] = "PageDown";
    KeyCode[KeyCode["End"] = 13] = "End";
    KeyCode[KeyCode["Home"] = 14] = "Home";
    KeyCode[KeyCode["LeftArrow"] = 15] = "LeftArrow";
    KeyCode[KeyCode["UpArrow"] = 16] = "UpArrow";
    KeyCode[KeyCode["RightArrow"] = 17] = "RightArrow";
    KeyCode[KeyCode["DownArrow"] = 18] = "DownArrow";
    KeyCode[KeyCode["Insert"] = 19] = "Insert";
    KeyCode[KeyCode["Delete"] = 20] = "Delete";
    KeyCode[KeyCode["KEY_0"] = 21] = "KEY_0";
    KeyCode[KeyCode["KEY_1"] = 22] = "KEY_1";
    KeyCode[KeyCode["KEY_2"] = 23] = "KEY_2";
    KeyCode[KeyCode["KEY_3"] = 24] = "KEY_3";
    KeyCode[KeyCode["KEY_4"] = 25] = "KEY_4";
    KeyCode[KeyCode["KEY_5"] = 26] = "KEY_5";
    KeyCode[KeyCode["KEY_6"] = 27] = "KEY_6";
    KeyCode[KeyCode["KEY_7"] = 28] = "KEY_7";
    KeyCode[KeyCode["KEY_8"] = 29] = "KEY_8";
    KeyCode[KeyCode["KEY_9"] = 30] = "KEY_9";
    KeyCode[KeyCode["KEY_A"] = 31] = "KEY_A";
    KeyCode[KeyCode["KEY_B"] = 32] = "KEY_B";
    KeyCode[KeyCode["KEY_C"] = 33] = "KEY_C";
    KeyCode[KeyCode["KEY_D"] = 34] = "KEY_D";
    KeyCode[KeyCode["KEY_E"] = 35] = "KEY_E";
    KeyCode[KeyCode["KEY_F"] = 36] = "KEY_F";
    KeyCode[KeyCode["KEY_G"] = 37] = "KEY_G";
    KeyCode[KeyCode["KEY_H"] = 38] = "KEY_H";
    KeyCode[KeyCode["KEY_I"] = 39] = "KEY_I";
    KeyCode[KeyCode["KEY_J"] = 40] = "KEY_J";
    KeyCode[KeyCode["KEY_K"] = 41] = "KEY_K";
    KeyCode[KeyCode["KEY_L"] = 42] = "KEY_L";
    KeyCode[KeyCode["KEY_M"] = 43] = "KEY_M";
    KeyCode[KeyCode["KEY_N"] = 44] = "KEY_N";
    KeyCode[KeyCode["KEY_O"] = 45] = "KEY_O";
    KeyCode[KeyCode["KEY_P"] = 46] = "KEY_P";
    KeyCode[KeyCode["KEY_Q"] = 47] = "KEY_Q";
    KeyCode[KeyCode["KEY_R"] = 48] = "KEY_R";
    KeyCode[KeyCode["KEY_S"] = 49] = "KEY_S";
    KeyCode[KeyCode["KEY_T"] = 50] = "KEY_T";
    KeyCode[KeyCode["KEY_U"] = 51] = "KEY_U";
    KeyCode[KeyCode["KEY_V"] = 52] = "KEY_V";
    KeyCode[KeyCode["KEY_W"] = 53] = "KEY_W";
    KeyCode[KeyCode["KEY_X"] = 54] = "KEY_X";
    KeyCode[KeyCode["KEY_Y"] = 55] = "KEY_Y";
    KeyCode[KeyCode["KEY_Z"] = 56] = "KEY_Z";
    KeyCode[KeyCode["Meta"] = 57] = "Meta";
    KeyCode[KeyCode["ContextMenu"] = 58] = "ContextMenu";
    KeyCode[KeyCode["F1"] = 59] = "F1";
    KeyCode[KeyCode["F2"] = 60] = "F2";
    KeyCode[KeyCode["F3"] = 61] = "F3";
    KeyCode[KeyCode["F4"] = 62] = "F4";
    KeyCode[KeyCode["F5"] = 63] = "F5";
    KeyCode[KeyCode["F6"] = 64] = "F6";
    KeyCode[KeyCode["F7"] = 65] = "F7";
    KeyCode[KeyCode["F8"] = 66] = "F8";
    KeyCode[KeyCode["F9"] = 67] = "F9";
    KeyCode[KeyCode["F10"] = 68] = "F10";
    KeyCode[KeyCode["F11"] = 69] = "F11";
    KeyCode[KeyCode["F12"] = 70] = "F12";
    KeyCode[KeyCode["F13"] = 71] = "F13";
    KeyCode[KeyCode["F14"] = 72] = "F14";
    KeyCode[KeyCode["F15"] = 73] = "F15";
    KeyCode[KeyCode["F16"] = 74] = "F16";
    KeyCode[KeyCode["F17"] = 75] = "F17";
    KeyCode[KeyCode["F18"] = 76] = "F18";
    KeyCode[KeyCode["F19"] = 77] = "F19";
    KeyCode[KeyCode["NumLock"] = 78] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 79] = "ScrollLock";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ';:' key
     */
    KeyCode[KeyCode["US_SEMICOLON"] = 80] = "US_SEMICOLON";
    /**
     * For any country/region, the '+' key
     * For the US standard keyboard, the '=+' key
     */
    KeyCode[KeyCode["US_EQUAL"] = 81] = "US_EQUAL";
    /**
     * For any country/region, the ',' key
     * For the US standard keyboard, the ',<' key
     */
    KeyCode[KeyCode["US_COMMA"] = 82] = "US_COMMA";
    /**
     * For any country/region, the '-' key
     * For the US standard keyboard, the '-_' key
     */
    KeyCode[KeyCode["US_MINUS"] = 83] = "US_MINUS";
    /**
     * For any country/region, the '.' key
     * For the US standard keyboard, the '.>' key
     */
    KeyCode[KeyCode["US_DOT"] = 84] = "US_DOT";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '/?' key
     */
    KeyCode[KeyCode["US_SLASH"] = 85] = "US_SLASH";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '`~' key
     */
    KeyCode[KeyCode["US_BACKTICK"] = 86] = "US_BACKTICK";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '[{' key
     */
    KeyCode[KeyCode["US_OPEN_SQUARE_BRACKET"] = 87] = "US_OPEN_SQUARE_BRACKET";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '\|' key
     */
    KeyCode[KeyCode["US_BACKSLASH"] = 88] = "US_BACKSLASH";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ']}' key
     */
    KeyCode[KeyCode["US_CLOSE_SQUARE_BRACKET"] = 89] = "US_CLOSE_SQUARE_BRACKET";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ''"' key
     */
    KeyCode[KeyCode["US_QUOTE"] = 90] = "US_QUOTE";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     */
    KeyCode[KeyCode["OEM_8"] = 91] = "OEM_8";
    /**
     * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
     */
    KeyCode[KeyCode["OEM_102"] = 92] = "OEM_102";
    KeyCode[KeyCode["NUMPAD_0"] = 93] = "NUMPAD_0";
    KeyCode[KeyCode["NUMPAD_1"] = 94] = "NUMPAD_1";
    KeyCode[KeyCode["NUMPAD_2"] = 95] = "NUMPAD_2";
    KeyCode[KeyCode["NUMPAD_3"] = 96] = "NUMPAD_3";
    KeyCode[KeyCode["NUMPAD_4"] = 97] = "NUMPAD_4";
    KeyCode[KeyCode["NUMPAD_5"] = 98] = "NUMPAD_5";
    KeyCode[KeyCode["NUMPAD_6"] = 99] = "NUMPAD_6";
    KeyCode[KeyCode["NUMPAD_7"] = 100] = "NUMPAD_7";
    KeyCode[KeyCode["NUMPAD_8"] = 101] = "NUMPAD_8";
    KeyCode[KeyCode["NUMPAD_9"] = 102] = "NUMPAD_9";
    KeyCode[KeyCode["NUMPAD_MULTIPLY"] = 103] = "NUMPAD_MULTIPLY";
    KeyCode[KeyCode["NUMPAD_ADD"] = 104] = "NUMPAD_ADD";
    KeyCode[KeyCode["NUMPAD_SEPARATOR"] = 105] = "NUMPAD_SEPARATOR";
    KeyCode[KeyCode["NUMPAD_SUBTRACT"] = 106] = "NUMPAD_SUBTRACT";
    KeyCode[KeyCode["NUMPAD_DECIMAL"] = 107] = "NUMPAD_DECIMAL";
    KeyCode[KeyCode["NUMPAD_DIVIDE"] = 108] = "NUMPAD_DIVIDE";
    /**
     * Cover all key codes when IME is processing input.
     */
    KeyCode[KeyCode["KEY_IN_COMPOSITION"] = 109] = "KEY_IN_COMPOSITION";
    KeyCode[KeyCode["ABNT_C1"] = 110] = "ABNT_C1";
    KeyCode[KeyCode["ABNT_C2"] = 111] = "ABNT_C2";
    /**
     * Placed last to cover the length of the enum.
     * Please do not depend on this value!
     */
    KeyCode[KeyCode["MAX_VALUE"] = 112] = "MAX_VALUE";
})(KeyCode || (KeyCode = {}));
/**
 * The direction of a selection.
 */
var SelectionDirection;
(function (SelectionDirection) {
    /**
     * The selection starts above where it ends.
     */
    SelectionDirection[SelectionDirection["LTR"] = 0] = "LTR";
    /**
     * The selection starts below where it ends.
     */
    SelectionDirection[SelectionDirection["RTL"] = 1] = "RTL";
})(SelectionDirection || (SelectionDirection = {}));
var ScrollbarVisibility;
(function (ScrollbarVisibility) {
    ScrollbarVisibility[ScrollbarVisibility["Auto"] = 1] = "Auto";
    ScrollbarVisibility[ScrollbarVisibility["Hidden"] = 2] = "Hidden";
    ScrollbarVisibility[ScrollbarVisibility["Visible"] = 3] = "Visible";
})(ScrollbarVisibility || (ScrollbarVisibility = {}));
/**
 * Vertical Lane in the overview ruler of the editor.
 */
var OverviewRulerLane;
(function (OverviewRulerLane) {
    OverviewRulerLane[OverviewRulerLane["Left"] = 1] = "Left";
    OverviewRulerLane[OverviewRulerLane["Center"] = 2] = "Center";
    OverviewRulerLane[OverviewRulerLane["Right"] = 4] = "Right";
    OverviewRulerLane[OverviewRulerLane["Full"] = 7] = "Full";
})(OverviewRulerLane || (OverviewRulerLane = {}));
/**
 * End of line character preference.
 */
var EndOfLinePreference;
(function (EndOfLinePreference) {
    /**
     * Use the end of line character identified in the text buffer.
     */
    EndOfLinePreference[EndOfLinePreference["TextDefined"] = 0] = "TextDefined";
    /**
     * Use line feed (\n) as the end of line character.
     */
    EndOfLinePreference[EndOfLinePreference["LF"] = 1] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    EndOfLinePreference[EndOfLinePreference["CRLF"] = 2] = "CRLF";
})(EndOfLinePreference || (EndOfLinePreference = {}));
/**
 * The default end of line to use when instantiating models.
 */
var DefaultEndOfLine;
(function (DefaultEndOfLine) {
    /**
     * Use line feed (\n) as the end of line character.
     */
    DefaultEndOfLine[DefaultEndOfLine["LF"] = 1] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    DefaultEndOfLine[DefaultEndOfLine["CRLF"] = 2] = "CRLF";
})(DefaultEndOfLine || (DefaultEndOfLine = {}));
/**
 * End of line character preference.
 */
var EndOfLineSequence;
(function (EndOfLineSequence) {
    /**
     * Use line feed (\n) as the end of line character.
     */
    EndOfLineSequence[EndOfLineSequence["LF"] = 0] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    EndOfLineSequence[EndOfLineSequence["CRLF"] = 1] = "CRLF";
})(EndOfLineSequence || (EndOfLineSequence = {}));
/**
 * Describes the behavior of decorations when typing/editing near their edges.
 * Note: Please do not edit the values, as they very carefully match `DecorationRangeBehavior`
 */
var TrackedRangeStickiness;
(function (TrackedRangeStickiness) {
    TrackedRangeStickiness[TrackedRangeStickiness["AlwaysGrowsWhenTypingAtEdges"] = 0] = "AlwaysGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["NeverGrowsWhenTypingAtEdges"] = 1] = "NeverGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingBefore"] = 2] = "GrowsOnlyWhenTypingBefore";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingAfter"] = 3] = "GrowsOnlyWhenTypingAfter";
})(TrackedRangeStickiness || (TrackedRangeStickiness = {}));
var ScrollType;
(function (ScrollType) {
    ScrollType[ScrollType["Smooth"] = 0] = "Smooth";
    ScrollType[ScrollType["Immediate"] = 1] = "Immediate";
})(ScrollType || (ScrollType = {}));
/**
 * Describes the reason the cursor has changed its position.
 */
var CursorChangeReason;
(function (CursorChangeReason) {
    /**
     * Unknown or not set.
     */
    CursorChangeReason[CursorChangeReason["NotSet"] = 0] = "NotSet";
    /**
     * A `model.setValue()` was called.
     */
    CursorChangeReason[CursorChangeReason["ContentFlush"] = 1] = "ContentFlush";
    /**
     * The `model` has been changed outside of this cursor and the cursor recovers its position from associated markers.
     */
    CursorChangeReason[CursorChangeReason["RecoverFromMarkers"] = 2] = "RecoverFromMarkers";
    /**
     * There was an explicit user gesture.
     */
    CursorChangeReason[CursorChangeReason["Explicit"] = 3] = "Explicit";
    /**
     * There was a Paste.
     */
    CursorChangeReason[CursorChangeReason["Paste"] = 4] = "Paste";
    /**
     * There was an Undo.
     */
    CursorChangeReason[CursorChangeReason["Undo"] = 5] = "Undo";
    /**
     * There was a Redo.
     */
    CursorChangeReason[CursorChangeReason["Redo"] = 6] = "Redo";
})(CursorChangeReason || (CursorChangeReason = {}));
var RenderMinimap;
(function (RenderMinimap) {
    RenderMinimap[RenderMinimap["None"] = 0] = "None";
    RenderMinimap[RenderMinimap["Small"] = 1] = "Small";
    RenderMinimap[RenderMinimap["Large"] = 2] = "Large";
    RenderMinimap[RenderMinimap["SmallBlocks"] = 3] = "SmallBlocks";
    RenderMinimap[RenderMinimap["LargeBlocks"] = 4] = "LargeBlocks";
})(RenderMinimap || (RenderMinimap = {}));
/**
 * Describes how to indent wrapped lines.
 */
var WrappingIndent;
(function (WrappingIndent) {
    /**
     * No indentation => wrapped lines begin at column 1.
     */
    WrappingIndent[WrappingIndent["None"] = 0] = "None";
    /**
     * Same => wrapped lines get the same indentation as the parent.
     */
    WrappingIndent[WrappingIndent["Same"] = 1] = "Same";
    /**
     * Indent => wrapped lines get +1 indentation toward the parent.
     */
    WrappingIndent[WrappingIndent["Indent"] = 2] = "Indent";
    /**
     * DeepIndent => wrapped lines get +2 indentation toward the parent.
     */
    WrappingIndent[WrappingIndent["DeepIndent"] = 3] = "DeepIndent";
})(WrappingIndent || (WrappingIndent = {}));
/**
 * The kind of animation in which the editor's cursor should be rendered.
 */
var TextEditorCursorBlinkingStyle;
(function (TextEditorCursorBlinkingStyle) {
    /**
     * Hidden
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Hidden"] = 0] = "Hidden";
    /**
     * Blinking
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Blink"] = 1] = "Blink";
    /**
     * Blinking with smooth fading
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Smooth"] = 2] = "Smooth";
    /**
     * Blinking with prolonged filled state and smooth fading
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Phase"] = 3] = "Phase";
    /**
     * Expand collapse animation on the y axis
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Expand"] = 4] = "Expand";
    /**
     * No-Blinking
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Solid"] = 5] = "Solid";
})(TextEditorCursorBlinkingStyle || (TextEditorCursorBlinkingStyle = {}));
/**
 * The style in which the editor's cursor should be rendered.
 */
var TextEditorCursorStyle;
(function (TextEditorCursorStyle) {
    /**
     * As a vertical line (sitting between two characters).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["Line"] = 1] = "Line";
    /**
     * As a block (sitting on top of a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["Block"] = 2] = "Block";
    /**
     * As a horizontal line (sitting under a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["Underline"] = 3] = "Underline";
    /**
     * As a thin vertical line (sitting between two characters).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["LineThin"] = 4] = "LineThin";
    /**
     * As an outlined block (sitting on top of a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["BlockOutline"] = 5] = "BlockOutline";
    /**
     * As a thin horizontal line (sitting under a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["UnderlineThin"] = 6] = "UnderlineThin";
})(TextEditorCursorStyle || (TextEditorCursorStyle = {}));
var RenderLineNumbersType;
(function (RenderLineNumbersType) {
    RenderLineNumbersType[RenderLineNumbersType["Off"] = 0] = "Off";
    RenderLineNumbersType[RenderLineNumbersType["On"] = 1] = "On";
    RenderLineNumbersType[RenderLineNumbersType["Relative"] = 2] = "Relative";
    RenderLineNumbersType[RenderLineNumbersType["Interval"] = 3] = "Interval";
    RenderLineNumbersType[RenderLineNumbersType["Custom"] = 4] = "Custom";
})(RenderLineNumbersType || (RenderLineNumbersType = {}));
/**
 * A positioning preference for rendering content widgets.
 */
var ContentWidgetPositionPreference;
(function (ContentWidgetPositionPreference) {
    /**
     * Place the content widget exactly at a position
     */
    ContentWidgetPositionPreference[ContentWidgetPositionPreference["EXACT"] = 0] = "EXACT";
    /**
     * Place the content widget above a position
     */
    ContentWidgetPositionPreference[ContentWidgetPositionPreference["ABOVE"] = 1] = "ABOVE";
    /**
     * Place the content widget below a position
     */
    ContentWidgetPositionPreference[ContentWidgetPositionPreference["BELOW"] = 2] = "BELOW";
})(ContentWidgetPositionPreference || (ContentWidgetPositionPreference = {}));
/**
 * A positioning preference for rendering overlay widgets.
 */
var OverlayWidgetPositionPreference;
(function (OverlayWidgetPositionPreference) {
    /**
     * Position the overlay widget in the top right corner
     */
    OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["TOP_RIGHT_CORNER"] = 0] = "TOP_RIGHT_CORNER";
    /**
     * Position the overlay widget in the bottom right corner
     */
    OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["BOTTOM_RIGHT_CORNER"] = 1] = "BOTTOM_RIGHT_CORNER";
    /**
     * Position the overlay widget in the top center
     */
    OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["TOP_CENTER"] = 2] = "TOP_CENTER";
})(OverlayWidgetPositionPreference || (OverlayWidgetPositionPreference = {}));
/**
 * Type of hit element with the mouse in the editor.
 */
var MouseTargetType;
(function (MouseTargetType) {
    /**
     * Mouse is on top of an unknown element.
     */
    MouseTargetType[MouseTargetType["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * Mouse is on top of the textarea used for input.
     */
    MouseTargetType[MouseTargetType["TEXTAREA"] = 1] = "TEXTAREA";
    /**
     * Mouse is on top of the glyph margin
     */
    MouseTargetType[MouseTargetType["GUTTER_GLYPH_MARGIN"] = 2] = "GUTTER_GLYPH_MARGIN";
    /**
     * Mouse is on top of the line numbers
     */
    MouseTargetType[MouseTargetType["GUTTER_LINE_NUMBERS"] = 3] = "GUTTER_LINE_NUMBERS";
    /**
     * Mouse is on top of the line decorations
     */
    MouseTargetType[MouseTargetType["GUTTER_LINE_DECORATIONS"] = 4] = "GUTTER_LINE_DECORATIONS";
    /**
     * Mouse is on top of the whitespace left in the gutter by a view zone.
     */
    MouseTargetType[MouseTargetType["GUTTER_VIEW_ZONE"] = 5] = "GUTTER_VIEW_ZONE";
    /**
     * Mouse is on top of text in the content.
     */
    MouseTargetType[MouseTargetType["CONTENT_TEXT"] = 6] = "CONTENT_TEXT";
    /**
     * Mouse is on top of empty space in the content (e.g. after line text or below last line)
     */
    MouseTargetType[MouseTargetType["CONTENT_EMPTY"] = 7] = "CONTENT_EMPTY";
    /**
     * Mouse is on top of a view zone in the content.
     */
    MouseTargetType[MouseTargetType["CONTENT_VIEW_ZONE"] = 8] = "CONTENT_VIEW_ZONE";
    /**
     * Mouse is on top of a content widget.
     */
    MouseTargetType[MouseTargetType["CONTENT_WIDGET"] = 9] = "CONTENT_WIDGET";
    /**
     * Mouse is on top of the decorations overview ruler.
     */
    MouseTargetType[MouseTargetType["OVERVIEW_RULER"] = 10] = "OVERVIEW_RULER";
    /**
     * Mouse is on top of a scrollbar.
     */
    MouseTargetType[MouseTargetType["SCROLLBAR"] = 11] = "SCROLLBAR";
    /**
     * Mouse is on top of an overlay widget.
     */
    MouseTargetType[MouseTargetType["OVERLAY_WIDGET"] = 12] = "OVERLAY_WIDGET";
    /**
     * Mouse is outside of the editor.
     */
    MouseTargetType[MouseTargetType["OUTSIDE_EDITOR"] = 13] = "OUTSIDE_EDITOR";
})(MouseTargetType || (MouseTargetType = {}));
/**
 * Describes what to do with the indentation when pressing Enter.
 */
var IndentAction;
(function (IndentAction) {
    /**
     * Insert new line and copy the previous line's indentation.
     */
    IndentAction[IndentAction["None"] = 0] = "None";
    /**
     * Insert new line and indent once (relative to the previous line's indentation).
     */
    IndentAction[IndentAction["Indent"] = 1] = "Indent";
    /**
     * Insert two new lines:
     *  - the first one indented which will hold the cursor
     *  - the second one at the same indentation level
     */
    IndentAction[IndentAction["IndentOutdent"] = 2] = "IndentOutdent";
    /**
     * Insert new line and outdent once (relative to the previous line's indentation).
     */
    IndentAction[IndentAction["Outdent"] = 3] = "Outdent";
})(IndentAction || (IndentAction = {}));
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind[CompletionItemKind["Method"] = 0] = "Method";
    CompletionItemKind[CompletionItemKind["Function"] = 1] = "Function";
    CompletionItemKind[CompletionItemKind["Constructor"] = 2] = "Constructor";
    CompletionItemKind[CompletionItemKind["Field"] = 3] = "Field";
    CompletionItemKind[CompletionItemKind["Variable"] = 4] = "Variable";
    CompletionItemKind[CompletionItemKind["Class"] = 5] = "Class";
    CompletionItemKind[CompletionItemKind["Struct"] = 6] = "Struct";
    CompletionItemKind[CompletionItemKind["Interface"] = 7] = "Interface";
    CompletionItemKind[CompletionItemKind["Module"] = 8] = "Module";
    CompletionItemKind[CompletionItemKind["Property"] = 9] = "Property";
    CompletionItemKind[CompletionItemKind["Event"] = 10] = "Event";
    CompletionItemKind[CompletionItemKind["Operator"] = 11] = "Operator";
    CompletionItemKind[CompletionItemKind["Unit"] = 12] = "Unit";
    CompletionItemKind[CompletionItemKind["Value"] = 13] = "Value";
    CompletionItemKind[CompletionItemKind["Constant"] = 14] = "Constant";
    CompletionItemKind[CompletionItemKind["Enum"] = 15] = "Enum";
    CompletionItemKind[CompletionItemKind["EnumMember"] = 16] = "EnumMember";
    CompletionItemKind[CompletionItemKind["Keyword"] = 17] = "Keyword";
    CompletionItemKind[CompletionItemKind["Text"] = 18] = "Text";
    CompletionItemKind[CompletionItemKind["Color"] = 19] = "Color";
    CompletionItemKind[CompletionItemKind["File"] = 20] = "File";
    CompletionItemKind[CompletionItemKind["Reference"] = 21] = "Reference";
    CompletionItemKind[CompletionItemKind["Customcolor"] = 22] = "Customcolor";
    CompletionItemKind[CompletionItemKind["Folder"] = 23] = "Folder";
    CompletionItemKind[CompletionItemKind["TypeParameter"] = 24] = "TypeParameter";
    CompletionItemKind[CompletionItemKind["Snippet"] = 25] = "Snippet";
})(CompletionItemKind || (CompletionItemKind = {}));
var CompletionItemInsertTextRule;
(function (CompletionItemInsertTextRule) {
    /**
     * Adjust whitespace/indentation of multiline insert texts to
     * match the current line indentation.
     */
    CompletionItemInsertTextRule[CompletionItemInsertTextRule["KeepWhitespace"] = 1] = "KeepWhitespace";
    /**
     * `insertText` is a snippet.
     */
    CompletionItemInsertTextRule[CompletionItemInsertTextRule["InsertAsSnippet"] = 4] = "InsertAsSnippet";
})(CompletionItemInsertTextRule || (CompletionItemInsertTextRule = {}));
/**
 * How a suggest provider was triggered.
 */
var CompletionTriggerKind;
(function (CompletionTriggerKind) {
    CompletionTriggerKind[CompletionTriggerKind["Invoke"] = 0] = "Invoke";
    CompletionTriggerKind[CompletionTriggerKind["TriggerCharacter"] = 1] = "TriggerCharacter";
    CompletionTriggerKind[CompletionTriggerKind["TriggerForIncompleteCompletions"] = 2] = "TriggerForIncompleteCompletions";
})(CompletionTriggerKind || (CompletionTriggerKind = {}));
var SignatureHelpTriggerKind;
(function (SignatureHelpTriggerKind) {
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})(SignatureHelpTriggerKind || (SignatureHelpTriggerKind = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind[SymbolKind["File"] = 0] = "File";
    SymbolKind[SymbolKind["Module"] = 1] = "Module";
    SymbolKind[SymbolKind["Namespace"] = 2] = "Namespace";
    SymbolKind[SymbolKind["Package"] = 3] = "Package";
    SymbolKind[SymbolKind["Class"] = 4] = "Class";
    SymbolKind[SymbolKind["Method"] = 5] = "Method";
    SymbolKind[SymbolKind["Property"] = 6] = "Property";
    SymbolKind[SymbolKind["Field"] = 7] = "Field";
    SymbolKind[SymbolKind["Constructor"] = 8] = "Constructor";
    SymbolKind[SymbolKind["Enum"] = 9] = "Enum";
    SymbolKind[SymbolKind["Interface"] = 10] = "Interface";
    SymbolKind[SymbolKind["Function"] = 11] = "Function";
    SymbolKind[SymbolKind["Variable"] = 12] = "Variable";
    SymbolKind[SymbolKind["Constant"] = 13] = "Constant";
    SymbolKind[SymbolKind["String"] = 14] = "String";
    SymbolKind[SymbolKind["Number"] = 15] = "Number";
    SymbolKind[SymbolKind["Boolean"] = 16] = "Boolean";
    SymbolKind[SymbolKind["Array"] = 17] = "Array";
    SymbolKind[SymbolKind["Object"] = 18] = "Object";
    SymbolKind[SymbolKind["Key"] = 19] = "Key";
    SymbolKind[SymbolKind["Null"] = 20] = "Null";
    SymbolKind[SymbolKind["EnumMember"] = 21] = "EnumMember";
    SymbolKind[SymbolKind["Struct"] = 22] = "Struct";
    SymbolKind[SymbolKind["Event"] = 23] = "Event";
    SymbolKind[SymbolKind["Operator"] = 24] = "Operator";
    SymbolKind[SymbolKind["TypeParameter"] = 25] = "TypeParameter";
})(SymbolKind || (SymbolKind = {}));


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/common/viewModel/prefixSumComputer.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/common/viewModel/prefixSumComputer.js ***!
  \****************************************************************************************/
/*! exports provided: PrefixSumIndexOfResult, PrefixSumComputer, PrefixSumComputerWithCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrefixSumIndexOfResult", function() { return PrefixSumIndexOfResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrefixSumComputer", function() { return PrefixSumComputer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrefixSumComputerWithCache", function() { return PrefixSumComputerWithCache; });
/* harmony import */ var _core_uint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/uint.js */ "./node_modules/monaco-editor/esm/vs/editor/common/core/uint.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var PrefixSumIndexOfResult = /** @class */ (function () {
    function PrefixSumIndexOfResult(index, remainder) {
        this.index = index;
        this.remainder = remainder;
    }
    return PrefixSumIndexOfResult;
}());

var PrefixSumComputer = /** @class */ (function () {
    function PrefixSumComputer(values) {
        this.values = values;
        this.prefixSum = new Uint32Array(values.length);
        this.prefixSumValidIndex = new Int32Array(1);
        this.prefixSumValidIndex[0] = -1;
    }
    PrefixSumComputer.prototype.getCount = function () {
        return this.values.length;
    };
    PrefixSumComputer.prototype.insertValues = function (insertIndex, insertValues) {
        insertIndex = Object(_core_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint32"])(insertIndex);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        var insertValuesLen = insertValues.length;
        if (insertValuesLen === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length + insertValuesLen);
        this.values.set(oldValues.subarray(0, insertIndex), 0);
        this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
        this.values.set(insertValues, insertIndex);
        if (insertIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = insertIndex - 1;
        }
        this.prefixSum = new Uint32Array(this.values.length);
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    };
    PrefixSumComputer.prototype.changeValue = function (index, value) {
        index = Object(_core_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint32"])(index);
        value = Object(_core_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint32"])(value);
        if (this.values[index] === value) {
            return false;
        }
        this.values[index] = value;
        if (index - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = index - 1;
        }
        return true;
    };
    PrefixSumComputer.prototype.removeValues = function (startIndex, cnt) {
        startIndex = Object(_core_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint32"])(startIndex);
        cnt = Object(_core_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint32"])(cnt);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        if (startIndex >= oldValues.length) {
            return false;
        }
        var maxCnt = oldValues.length - startIndex;
        if (cnt >= maxCnt) {
            cnt = maxCnt;
        }
        if (cnt === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length - cnt);
        this.values.set(oldValues.subarray(0, startIndex), 0);
        this.values.set(oldValues.subarray(startIndex + cnt), startIndex);
        this.prefixSum = new Uint32Array(this.values.length);
        if (startIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = startIndex - 1;
        }
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    };
    PrefixSumComputer.prototype.getTotalValue = function () {
        if (this.values.length === 0) {
            return 0;
        }
        return this._getAccumulatedValue(this.values.length - 1);
    };
    PrefixSumComputer.prototype.getAccumulatedValue = function (index) {
        if (index < 0) {
            return 0;
        }
        index = Object(_core_uint_js__WEBPACK_IMPORTED_MODULE_0__["toUint32"])(index);
        return this._getAccumulatedValue(index);
    };
    PrefixSumComputer.prototype._getAccumulatedValue = function (index) {
        if (index <= this.prefixSumValidIndex[0]) {
            return this.prefixSum[index];
        }
        var startIndex = this.prefixSumValidIndex[0] + 1;
        if (startIndex === 0) {
            this.prefixSum[0] = this.values[0];
            startIndex++;
        }
        if (index >= this.values.length) {
            index = this.values.length - 1;
        }
        for (var i = startIndex; i <= index; i++) {
            this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
        }
        this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
        return this.prefixSum[index];
    };
    PrefixSumComputer.prototype.getIndexOf = function (accumulatedValue) {
        accumulatedValue = Math.floor(accumulatedValue); //@perf
        // Compute all sums (to get a fully valid prefixSum)
        this.getTotalValue();
        var low = 0;
        var high = this.values.length - 1;
        var mid = 0;
        var midStop = 0;
        var midStart = 0;
        while (low <= high) {
            mid = low + ((high - low) / 2) | 0;
            midStop = this.prefixSum[mid];
            midStart = midStop - this.values[mid];
            if (accumulatedValue < midStart) {
                high = mid - 1;
            }
            else if (accumulatedValue >= midStop) {
                low = mid + 1;
            }
            else {
                break;
            }
        }
        return new PrefixSumIndexOfResult(mid, accumulatedValue - midStart);
    };
    return PrefixSumComputer;
}());

var PrefixSumComputerWithCache = /** @class */ (function () {
    function PrefixSumComputerWithCache(values) {
        this._cacheAccumulatedValueStart = 0;
        this._cache = null;
        this._actual = new PrefixSumComputer(values);
        this._bustCache();
    }
    PrefixSumComputerWithCache.prototype._bustCache = function () {
        this._cacheAccumulatedValueStart = 0;
        this._cache = null;
    };
    PrefixSumComputerWithCache.prototype.insertValues = function (insertIndex, insertValues) {
        if (this._actual.insertValues(insertIndex, insertValues)) {
            this._bustCache();
        }
    };
    PrefixSumComputerWithCache.prototype.changeValue = function (index, value) {
        if (this._actual.changeValue(index, value)) {
            this._bustCache();
        }
    };
    PrefixSumComputerWithCache.prototype.removeValues = function (startIndex, cnt) {
        if (this._actual.removeValues(startIndex, cnt)) {
            this._bustCache();
        }
    };
    PrefixSumComputerWithCache.prototype.getTotalValue = function () {
        return this._actual.getTotalValue();
    };
    PrefixSumComputerWithCache.prototype.getAccumulatedValue = function (index) {
        return this._actual.getAccumulatedValue(index);
    };
    PrefixSumComputerWithCache.prototype.getIndexOf = function (accumulatedValue) {
        accumulatedValue = Math.floor(accumulatedValue); //@perf
        if (this._cache !== null) {
            var cacheIndex = accumulatedValue - this._cacheAccumulatedValueStart;
            if (cacheIndex >= 0 && cacheIndex < this._cache.length) {
                // Cache hit!
                return this._cache[cacheIndex];
            }
        }
        // Cache miss!
        return this._actual.getIndexOf(accumulatedValue);
    };
    /**
     * Gives a hint that a lot of requests are about to come in for these accumulated values.
     */
    PrefixSumComputerWithCache.prototype.warmUpCache = function (accumulatedValueStart, accumulatedValueEnd) {
        var newCache = [];
        for (var accumulatedValue = accumulatedValueStart; accumulatedValue <= accumulatedValueEnd; accumulatedValue++) {
            newCache[accumulatedValue - accumulatedValueStart] = this.getIndexOf(accumulatedValue);
        }
        this._cache = newCache;
        this._cacheAccumulatedValueStart = accumulatedValueStart;
    };
    return PrefixSumComputerWithCache;
}());



/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/editor.worker.js":
/*!*******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/editor.worker.js ***!
  \*******************************************************************/
/*! exports provided: initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var _base_common_worker_simpleWorker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/common/worker/simpleWorker.js */ "./node_modules/monaco-editor/esm/vs/base/common/worker/simpleWorker.js");
/* harmony import */ var _common_services_editorSimpleWorker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/services/editorSimpleWorker.js */ "./node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var initialized = false;
function initialize(foreignModule) {
    if (initialized) {
        return;
    }
    initialized = true;
    var editorWorker = new _common_services_editorSimpleWorker_js__WEBPACK_IMPORTED_MODULE_1__["EditorSimpleWorkerImpl"](foreignModule);
    var simpleWorker = new _base_common_worker_simpleWorker_js__WEBPACK_IMPORTED_MODULE_0__["SimpleWorkerServer"](function (msg) {
        self.postMessage(msg);
    }, editorWorker);
    self.onmessage = function (e) {
        simpleWorker.onmessage(e.data);
    };
}
self.onmessage = function (e) {
    // Ignore first message in this case and initialize if not yet initialized
    if (!initialized) {
        initialize(null);
    }
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2FycmF5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vY2FuY2VsbGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9kaWZmL2RpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2RpZmYvZGlmZkNoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2tleUNvZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9saWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2xpbmtlZExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL3BsYXRmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vdXJpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi93b3JrZXIvc2ltcGxlV29ya2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL2NvcmUvY2hhcmFjdGVyQ2xhc3NpZmllci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9jb3JlL3Bvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL2NvcmUvcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vY29yZS9zZWxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vY29yZS90b2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9jb3JlL3VpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vZGlmZi9kaWZmQ29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vbW9kZWwvbWlycm9yVGV4dE1vZGVsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL21vZGVsL3dvcmRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vbW9kZXMvbGlua0NvbXB1dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL21vZGVzL3N1cHBvcnRzL2lucGxhY2VSZXBsYWNlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9zZXJ2aWNlcy9lZGl0b3JTaW1wbGVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vc3RhbmRhbG9uZS9wcm9taXNlLXBvbHlmaWxsL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL3N0YW5kYWxvbmUvc3RhbmRhbG9uZUJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vc3RhbmRhbG9uZS9zdGFuZGFsb25lRW51bXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vdmlld01vZGVsL3ByZWZpeFN1bUNvbXB1dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvZWRpdG9yLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNP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QUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNENBQTRDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0NBQWdDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5REFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0NBQWdDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHlEQUFVO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDa0I7Ozs7Ozs7Ozs7Ozs7QUNueEJuQjtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUM5QjtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQzJCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrRUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQzBCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNpQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDNkI7Ozs7Ozs7Ozs7Ozs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUCxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ087QUFDUCx5Q0FBeUM7QUFDekM7QUFDTztBQUNQO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbktBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGlKQUFpSjtBQUM5TTtBQUNBO0FBQ0EsMERBQTBELGlKQUFpSjtBQUMzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxZQUFZO0FBQ2xGO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDYztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1CQUFtQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxREFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxTQUFTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsY0FBYztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsY0FBYztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsU0FBUztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3VCOzs7Ozs7Ozs7Ozs7O0FDNVh4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQytDO0FBQ3VCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6Qyw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0I7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdEQUFnRDtBQUMxQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrREFBa0Q7QUFDbkQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4Q0FBOEM7QUFDL0M7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0RBQWtEO0FBQ25EO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0Q0FBNEM7QUFDN0M7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhDQUE4QztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0RBQXdEO0FBQ2xEO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnREFBZ0Q7QUFDMUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QztBQUN6QztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzRUFBc0U7QUFDdkU7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0RBQXNEO0FBQ2hEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzREFBc0Q7QUFDdkQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEVBQTBFO0FBQzNFO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBFQUEwRTtBQUMzRTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMENBQTBDO0FBQzNDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUM5QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0RBQWdEO0FBQzFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9FQUFvRTtBQUNyRTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzREFBc0Q7QUFDaEQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNERBQTREO0FBQzdEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNEQUFzRDtBQUN2RDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDOzs7Ozs7Ozs7Ozs7O0FDeG9CakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDaUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4REFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhEQUFRO0FBQ3hCLGdCQUFnQiw4REFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4REFBUTtBQUM3QixjQUFjLDhEQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhEQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUM0QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELHlDQUF5QztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3FDOzs7Ozs7Ozs7Ozs7O0FDdk10QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzJFO0FBQ007QUFDakY7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZGQUFzQjtBQUNqRCwyQkFBMkIsc0ZBQWtCO0FBQzdDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6TEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLG1CQUFPLENBQUMsaUVBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJlZGl0b3Iud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2VkaXRvci53b3JrZXIuanNcIik7XG4iLCIvKipcbiAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiBhbiBhcnJheS5cbiAqIEBwYXJhbSBhcnJheSBUaGUgYXJyYXkuXG4gKiBAcGFyYW0gbiBXaGljaCBlbGVtZW50IGZyb20gdGhlIGVuZCAoZGVmYXVsdCBpcyB6ZXJvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhaWwoYXJyYXksIG4pIHtcbiAgICBpZiAobiA9PT0gdm9pZCAwKSB7IG4gPSAwOyB9XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtICgxICsgbildO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRhaWwyKGFycikge1xuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWlsIGNhbGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIFthcnIuc2xpY2UoMCwgYXJyLmxlbmd0aCAtIDEpLCBhcnJbYXJyLmxlbmd0aCAtIDFdXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMob25lLCBvdGhlciwgaXRlbUVxdWFscykge1xuICAgIGlmIChpdGVtRXF1YWxzID09PSB2b2lkIDApIHsgaXRlbUVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhID09PSBiOyB9OyB9XG4gICAgaWYgKG9uZSA9PT0gb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghb25lIHx8ICFvdGhlcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChvbmUubGVuZ3RoICE9PSBvdGhlci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb25lLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghaXRlbUVxdWFscyhvbmVbaV0sIG90aGVyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVNlYXJjaChhcnJheSwga2V5LCBjb21wYXJhdG9yKSB7XG4gICAgdmFyIGxvdyA9IDAsIGhpZ2ggPSBhcnJheS5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChsb3cgPD0gaGlnaCkge1xuICAgICAgICB2YXIgbWlkID0gKChsb3cgKyBoaWdoKSAvIDIpIHwgMDtcbiAgICAgICAgdmFyIGNvbXAgPSBjb21wYXJhdG9yKGFycmF5W21pZF0sIGtleSk7XG4gICAgICAgIGlmIChjb21wIDwgMCkge1xuICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb21wID4gMCkge1xuICAgICAgICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWlkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtKGxvdyArIDEpO1xufVxuLyoqXG4gKiBUYWtlcyBhIHNvcnRlZCBhcnJheSBhbmQgYSBmdW5jdGlvbiBwLiBUaGUgYXJyYXkgaXMgc29ydGVkIGluIHN1Y2ggYSB3YXkgdGhhdCBhbGwgZWxlbWVudHMgd2hlcmUgcCh4KSBpcyBmYWxzZVxuICogYXJlIGxvY2F0ZWQgYmVmb3JlIGFsbCBlbGVtZW50cyB3aGVyZSBwKHgpIGlzIHRydWUuXG4gKiBAcmV0dXJucyB0aGUgbGVhc3QgeCBmb3Igd2hpY2ggcCh4KSBpcyB0cnVlIG9yIGFycmF5Lmxlbmd0aCBpZiBubyBlbGVtZW50IGZ1bGxmaWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRmlyc3RJblNvcnRlZChhcnJheSwgcCkge1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChoaWdoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwOyAvLyBubyBjaGlsZHJlblxuICAgIH1cbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgICB2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcbiAgICAgICAgaWYgKHAoYXJyYXlbbWlkXSkpIHtcbiAgICAgICAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG59XG4vKipcbiAqIExpa2UgYEFycmF5I3NvcnRgIGJ1dCBhbHdheXMgc3RhYmxlLiBVc3VhbGx5IHJ1bnMgYSBsaXR0bGUgc2xvd2VyIGB0aGFuIEFycmF5I3NvcnRgXG4gKiBzbyBvbmx5IHVzZSB0aGlzIHdoZW4gYWN0dWFsbHkgbmVlZGluZyBzdGFibGUgc29ydC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU29ydChkYXRhLCBjb21wYXJlKSB7XG4gICAgX3NvcnQoZGF0YSwgY29tcGFyZSwgMCwgZGF0YS5sZW5ndGggLSAxLCBbXSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5mdW5jdGlvbiBfbWVyZ2UoYSwgY29tcGFyZSwgbG8sIG1pZCwgaGksIGF1eCkge1xuICAgIHZhciBsZWZ0SWR4ID0gbG8sIHJpZ2h0SWR4ID0gbWlkICsgMTtcbiAgICBmb3IgKHZhciBpID0gbG87IGkgPD0gaGk7IGkrKykge1xuICAgICAgICBhdXhbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gbG87IGkgPD0gaGk7IGkrKykge1xuICAgICAgICBpZiAobGVmdElkeCA+IG1pZCkge1xuICAgICAgICAgICAgLy8gbGVmdCBzaWRlIGNvbnN1bWVkXG4gICAgICAgICAgICBhW2ldID0gYXV4W3JpZ2h0SWR4KytdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJpZ2h0SWR4ID4gaGkpIHtcbiAgICAgICAgICAgIC8vIHJpZ2h0IHNpZGUgY29uc3VtZWRcbiAgICAgICAgICAgIGFbaV0gPSBhdXhbbGVmdElkeCsrXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb21wYXJlKGF1eFtyaWdodElkeF0sIGF1eFtsZWZ0SWR4XSkgPCAwKSB7XG4gICAgICAgICAgICAvLyByaWdodCBlbGVtZW50IGlzIGxlc3MgLT4gY29tZXMgZmlyc3RcbiAgICAgICAgICAgIGFbaV0gPSBhdXhbcmlnaHRJZHgrK107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBsZWZ0IGVsZW1lbnQgY29tZXMgZmlyc3QgKGxlc3Mgb3IgZXF1YWwpXG4gICAgICAgICAgICBhW2ldID0gYXV4W2xlZnRJZHgrK107XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfc29ydChhLCBjb21wYXJlLCBsbywgaGksIGF1eCkge1xuICAgIGlmIChoaSA8PSBsbykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBtaWQgPSBsbyArICgoaGkgLSBsbykgLyAyKSB8IDA7XG4gICAgX3NvcnQoYSwgY29tcGFyZSwgbG8sIG1pZCwgYXV4KTtcbiAgICBfc29ydChhLCBjb21wYXJlLCBtaWQgKyAxLCBoaSwgYXV4KTtcbiAgICBpZiAoY29tcGFyZShhW21pZF0sIGFbbWlkICsgMV0pIDw9IDApIHtcbiAgICAgICAgLy8gbGVmdCBhbmQgcmlnaHQgYXJlIHNvcnRlZCBhbmQgaWYgdGhlIGxhc3QtbGVmdCBlbGVtZW50IGlzIGxlc3NcbiAgICAgICAgLy8gb3IgZXF1YWxzIHRoYW4gdGhlIGZpcnN0LXJpZ2h0IGVsZW1lbnQgdGhlcmUgaXMgbm90aGluZyBlbHNlXG4gICAgICAgIC8vIHRvIGRvXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgX21lcmdlKGEsIGNvbXBhcmUsIGxvLCBtaWQsIGhpLCBhdXgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnkoZGF0YSwgY29tcGFyZSkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgY3VycmVudEdyb3VwID0gdW5kZWZpbmVkO1xuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBtZXJnZVNvcnQoZGF0YS5zbGljZSgwKSwgY29tcGFyZSk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gX2FbX2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRHcm91cCB8fCBjb21wYXJlKGN1cnJlbnRHcm91cFswXSwgZWxlbWVudCkgIT09IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cCA9IFtlbGVtZW50XTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRHcm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50R3JvdXAucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBAcmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGFsbCBmYWxzeSB2YWx1ZXMgcmVtb3ZlZC4gVGhlIG9yaWdpbmFsIGFycmF5IElTIE5PVCBtb2RpZmllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvYWxlc2NlKGFycmF5KSB7XG4gICAgaWYgKCFhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuICEhZTsgfSk7XG59XG4vKipcbiAqIEByZXR1cm5zIGZhbHNlIGlmIHRoZSBwcm92aWRlZCBvYmplY3QgaXMgYW4gYXJyYXkgYW5kIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRmFsc3lPckVtcHR5KG9iaikge1xuICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShvYmopIHx8IG9iai5sZW5ndGggPT09IDA7XG59XG4vKipcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHByb3ZpZGVkIG9iamVjdCBpcyBhbiBhcnJheSBhbmQgaGFzIGF0IGxlYXN0IG9uZSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOb25FbXB0eUFycmF5KG9iaikge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaikgJiYgb2JqLmxlbmd0aCA+IDA7XG59XG4vKipcbiAqIFJlbW92ZXMgZHVwbGljYXRlcyBmcm9tIHRoZSBnaXZlbiBhcnJheS4gVGhlIG9wdGlvbmFsIGtleUZuIGFsbG93cyB0byBzcGVjaWZ5XG4gKiBob3cgZWxlbWVudHMgYXJlIGNoZWNrZWQgZm9yIGVxdWFsbmVzcyBieSByZXR1cm5pbmcgYSB1bmlxdWUgc3RyaW5nIGZvciBlYWNoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3QoYXJyYXksIGtleUZuKSB7XG4gICAgaWYgKCFrZXlGbikge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50LCBwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YoZWxlbWVudCkgPT09IHBvc2l0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHNlZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgdmFyIGtleSA9IGtleUZuKGVsZW0pO1xuICAgICAgICBpZiAoc2VlbltrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VlbltrZXldID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmlyc3RJbmRleChhcnJheSwgZm4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gYXJyYXlbaV07XG4gICAgICAgIGlmIChmbihlbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0KGFycmF5LCBmbiwgbm90Rm91bmRWYWx1ZSkge1xuICAgIGlmIChub3RGb3VuZFZhbHVlID09PSB2b2lkIDApIHsgbm90Rm91bmRWYWx1ZSA9IG51bGw7IH1cbiAgICB2YXIgaW5kZXggPSBmaXJzdEluZGV4KGFycmF5LCBmbik7XG4gICAgcmV0dXJuIGluZGV4IDwgMCA/IG5vdEZvdW5kVmFsdWUgOiBhcnJheVtpbmRleF07XG59XG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChfYSA9IFtdKS5jb25jYXQuYXBwbHkoX2EsIGFycik7XG59XG5leHBvcnQgZnVuY3Rpb24gcmFuZ2UoYXJnLCB0bykge1xuICAgIHZhciBmcm9tID0gdHlwZW9mIHRvID09PSAnbnVtYmVyJyA/IGFyZyA6IDA7XG4gICAgaWYgKHR5cGVvZiB0byA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgZnJvbSA9IGFyZztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZyb20gPSAwO1xuICAgICAgICB0byA9IGFyZztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmIChmcm9tIDw9IHRvKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBmcm9tOyBpIDwgdG87IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBmcm9tOyBpID4gdG87IGktLSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogSW5zZXJ0IGBpbnNlcnRBcnJgIGluc2lkZSBgdGFyZ2V0YCBhdCBgaW5zZXJ0SW5kZXhgLlxuICogUGxlYXNlIGRvbid0IHRvdWNoIHVubGVzcyB5b3UgdW5kZXJzdGFuZCBodHRwczovL2pzcGVyZi5jb20vaW5zZXJ0aW5nLWFuLWFycmF5LXdpdGhpbi1hbi1hcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlJbnNlcnQodGFyZ2V0LCBpbnNlcnRJbmRleCwgaW5zZXJ0QXJyKSB7XG4gICAgdmFyIGJlZm9yZSA9IHRhcmdldC5zbGljZSgwLCBpbnNlcnRJbmRleCk7XG4gICAgdmFyIGFmdGVyID0gdGFyZ2V0LnNsaWNlKGluc2VydEluZGV4KTtcbiAgICByZXR1cm4gYmVmb3JlLmNvbmNhdChpbnNlcnRBcnIsIGFmdGVyKTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRW1pdHRlciwgRXZlbnQgfSBmcm9tICcuL2V2ZW50LmpzJztcbnZhciBzaG9ydGN1dEV2ZW50ID0gT2JqZWN0LmZyZWV6ZShmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgaGFuZGxlID0gc2V0VGltZW91dChjYWxsYmFjay5iaW5kKGNvbnRleHQpLCAwKTtcbiAgICByZXR1cm4geyBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7IGNsZWFyVGltZW91dChoYW5kbGUpOyB9IH07XG59KTtcbmV4cG9ydCB2YXIgQ2FuY2VsbGF0aW9uVG9rZW47XG4oZnVuY3Rpb24gKENhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgZnVuY3Rpb24gaXNDYW5jZWxsYXRpb25Ub2tlbih0aGluZykge1xuICAgICAgICBpZiAodGhpbmcgPT09IENhbmNlbGxhdGlvblRva2VuLk5vbmUgfHwgdGhpbmcgPT09IENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaW5nIGluc3RhbmNlb2YgTXV0YWJsZVRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaW5nIHx8IHR5cGVvZiB0aGluZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaW5nLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICYmIHR5cGVvZiB0aGluZy5vbkNhbmNlbGxhdGlvblJlcXVlc3RlZCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG4gICAgQ2FuY2VsbGF0aW9uVG9rZW4uaXNDYW5jZWxsYXRpb25Ub2tlbiA9IGlzQ2FuY2VsbGF0aW9uVG9rZW47XG4gICAgQ2FuY2VsbGF0aW9uVG9rZW4uTm9uZSA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZDogZmFsc2UsXG4gICAgICAgIG9uQ2FuY2VsbGF0aW9uUmVxdWVzdGVkOiBFdmVudC5Ob25lXG4gICAgfSk7XG4gICAgQ2FuY2VsbGF0aW9uVG9rZW4uQ2FuY2VsbGVkID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkOiB0cnVlLFxuICAgICAgICBvbkNhbmNlbGxhdGlvblJlcXVlc3RlZDogc2hvcnRjdXRFdmVudFxuICAgIH0pO1xufSkoQ2FuY2VsbGF0aW9uVG9rZW4gfHwgKENhbmNlbGxhdGlvblRva2VuID0ge30pKTtcbnZhciBNdXRhYmxlVG9rZW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTXV0YWJsZVRva2VuKCkge1xuICAgICAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbWl0dGVyID0gbnVsbDtcbiAgICB9XG4gICAgTXV0YWJsZVRva2VuLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdHRlci5maXJlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNdXRhYmxlVG9rZW4ucHJvdG90eXBlLCBcImlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNDYW5jZWxsZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNdXRhYmxlVG9rZW4ucHJvdG90eXBlLCBcIm9uQ2FuY2VsbGF0aW9uUmVxdWVzdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvcnRjdXRFdmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fZW1pdHRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VtaXR0ZXIuZXZlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE11dGFibGVUb2tlbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdHRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNdXRhYmxlVG9rZW47XG59KCkpO1xudmFyIENhbmNlbGxhdGlvblRva2VuU291cmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbmNlbGxhdGlvblRva2VuU291cmNlKCkge1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UucHJvdG90eXBlLCBcInRva2VuXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgLy8gYmUgbGF6eSBhbmQgY3JlYXRlIHRoZSB0b2tlbiBvbmx5IHdoZW5cbiAgICAgICAgICAgICAgICAvLyBhY3R1YWxseSBuZWVkZWRcbiAgICAgICAgICAgICAgICB0aGlzLl90b2tlbiA9IG5ldyBNdXRhYmxlVG9rZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2tlbikge1xuICAgICAgICAgICAgLy8gc2F2ZSBhbiBvYmplY3QgYnkgcmV0dXJuaW5nIHRoZSBkZWZhdWx0XG4gICAgICAgICAgICAvLyBjYW5jZWxsZWQgdG9rZW4gd2hlbiBjYW5jZWxsYXRpb24gaGFwcGVuc1xuICAgICAgICAgICAgLy8gYmVmb3JlIHNvbWVvbmUgYXNrcyBmb3IgdGhlIHRva2VuXG4gICAgICAgICAgICB0aGlzLl90b2tlbiA9IENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl90b2tlbiBpbnN0YW5jZW9mIE11dGFibGVUb2tlbikge1xuICAgICAgICAgICAgLy8gYWN0dWFsbHkgY2FuY2VsXG4gICAgICAgICAgICB0aGlzLl90b2tlbi5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdG9rZW4pIHtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0byBpbml0aWFsaXplIHdpdGggYW4gZW1wdHkgdG9rZW4gaWYgd2UgaGFkIG5vbmVcbiAgICAgICAgICAgIHRoaXMuX3Rva2VuID0gQ2FuY2VsbGF0aW9uVG9rZW4uTm9uZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl90b2tlbiBpbnN0YW5jZW9mIE11dGFibGVUb2tlbikge1xuICAgICAgICAgICAgLy8gYWN0dWFsbHkgZGlzcG9zZVxuICAgICAgICAgICAgdGhpcy5fdG9rZW4uZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2U7XG59KCkpO1xuZXhwb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRGlmZkNoYW5nZSB9IGZyb20gJy4vZGlmZkNoYW5nZS5qcyc7XG5mdW5jdGlvbiBjcmVhdGVTdHJpbmdTZXF1ZW5jZShhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0TGVuZ3RoOiBmdW5jdGlvbiAoKSB7IHJldHVybiBhLmxlbmd0aDsgfSxcbiAgICAgICAgZ2V0RWxlbWVudEF0SW5kZXg6IGZ1bmN0aW9uIChwb3MpIHsgcmV0dXJuIGEuY2hhckNvZGVBdChwb3MpOyB9XG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdEaWZmKG9yaWdpbmFsLCBtb2RpZmllZCwgcHJldHR5KSB7XG4gICAgcmV0dXJuIG5ldyBMY3NEaWZmKGNyZWF0ZVN0cmluZ1NlcXVlbmNlKG9yaWdpbmFsKSwgY3JlYXRlU3RyaW5nU2VxdWVuY2UobW9kaWZpZWQpKS5Db21wdXRlRGlmZihwcmV0dHkpO1xufVxuLy9cbi8vIFRoZSBjb2RlIGJlbG93IGhhcyBiZWVuIHBvcnRlZCBmcm9tIGEgQyMgaW1wbGVtZW50YXRpb24gaW4gVlNcbi8vXG52YXIgRGVidWcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVidWcoKSB7XG4gICAgfVxuICAgIERlYnVnLkFzc2VydCA9IGZ1bmN0aW9uIChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERlYnVnO1xufSgpKTtcbmV4cG9ydCB7IERlYnVnIH07XG52YXIgTXlBcnJheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNeUFycmF5KCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYSByYW5nZSBvZiBlbGVtZW50cyBmcm9tIGFuIEFycmF5IHN0YXJ0aW5nIGF0IHRoZSBzcGVjaWZpZWQgc291cmNlIGluZGV4IGFuZCBwYXN0ZXNcbiAgICAgKiB0aGVtIHRvIGFub3RoZXIgQXJyYXkgc3RhcnRpbmcgYXQgdGhlIHNwZWNpZmllZCBkZXN0aW5hdGlvbiBpbmRleC4gVGhlIGxlbmd0aCBhbmQgdGhlIGluZGV4ZXNcbiAgICAgKiBhcmUgc3BlY2lmaWVkIGFzIDY0LWJpdCBpbnRlZ2Vycy5cbiAgICAgKiBzb3VyY2VBcnJheTpcbiAgICAgKlx0XHRUaGUgQXJyYXkgdGhhdCBjb250YWlucyB0aGUgZGF0YSB0byBjb3B5LlxuICAgICAqIHNvdXJjZUluZGV4OlxuICAgICAqXHRcdEEgNjQtYml0IGludGVnZXIgdGhhdCByZXByZXNlbnRzIHRoZSBpbmRleCBpbiB0aGUgc291cmNlQXJyYXkgYXQgd2hpY2ggY29weWluZyBiZWdpbnMuXG4gICAgICogZGVzdGluYXRpb25BcnJheTpcbiAgICAgKlx0XHRUaGUgQXJyYXkgdGhhdCByZWNlaXZlcyB0aGUgZGF0YS5cbiAgICAgKiBkZXN0aW5hdGlvbkluZGV4OlxuICAgICAqXHRcdEEgNjQtYml0IGludGVnZXIgdGhhdCByZXByZXNlbnRzIHRoZSBpbmRleCBpbiB0aGUgZGVzdGluYXRpb25BcnJheSBhdCB3aGljaCBzdG9yaW5nIGJlZ2lucy5cbiAgICAgKiBsZW5ndGg6XG4gICAgICpcdFx0QSA2NC1iaXQgaW50ZWdlciB0aGF0IHJlcHJlc2VudHMgdGhlIG51bWJlciBvZiBlbGVtZW50cyB0byBjb3B5LlxuICAgICAqL1xuICAgIE15QXJyYXkuQ29weSA9IGZ1bmN0aW9uIChzb3VyY2VBcnJheSwgc291cmNlSW5kZXgsIGRlc3RpbmF0aW9uQXJyYXksIGRlc3RpbmF0aW9uSW5kZXgsIGxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbkFycmF5W2Rlc3RpbmF0aW9uSW5kZXggKyBpXSA9IHNvdXJjZUFycmF5W3NvdXJjZUluZGV4ICsgaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNeUFycmF5O1xufSgpKTtcbmV4cG9ydCB7IE15QXJyYXkgfTtcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIExjc0RpZmYuY3Ncbi8vXG4vLyBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgZGlmZmVyZW5jZSBhbGdvcml0aG0gZGVzY3JpYmVkIGluXG4vLyBcIkFuIE8oTkQpIERpZmZlcmVuY2UgQWxnb3JpdGhtIGFuZCBpdHMgdmFyaWF0aW9uc1wiIGJ5IEV1Z2VuZSBXLiBNeWVyc1xuLy9cbi8vIENvcHlyaWdodCAoQykgMjAwOCBNaWNyb3NvZnQgQ29ycG9yYXRpb24gQG1pbmlmaWVyX2RvX25vdF9wcmVzZXJ2ZVxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gT3VyIHRvdGFsIG1lbW9yeSB1c2FnZSBmb3Igc3RvcmluZyBoaXN0b3J5IGlzICh3b3JzdC1jYXNlKTpcbi8vIDIgKiBbKE1heERpZmZlcmVuY2VzSGlzdG9yeSArIDEpICogKE1heERpZmZlcmVuY2VzSGlzdG9yeSArIDEpIC0gMV0gKiBzaXplb2YoaW50KVxuLy8gMiAqIFsxNDQ4KjE0NDggLSAxXSAqIDQgPSAxNjc3MzYyNCA9IDE2TUJcbnZhciBNYXhEaWZmZXJlbmNlc0hpc3RvcnkgPSAxNDQ3O1xuLy9sZXQgTWF4RGlmZmVyZW5jZXNIaXN0b3J5ID0gMTAwO1xuLyoqXG4gKiBBIHV0aWxpdHkgY2xhc3Mgd2hpY2ggaGVscHMgdG8gY3JlYXRlIHRoZSBzZXQgb2YgRGlmZkNoYW5nZXMgZnJvbVxuICogYSBkaWZmZXJlbmNlIG9wZXJhdGlvbi4gVGhpcyBjbGFzcyBhY2NlcHRzIG9yaWdpbmFsIERpZmZFbGVtZW50cyBhbmRcbiAqIG1vZGlmaWVkIERpZmZFbGVtZW50cyB0aGF0IGFyZSBpbnZvbHZlZCBpbiBhIHBhcnRpY3VsYXIgY2hhbmdlLiBUaGVcbiAqIE1hcmt0TmV4dENoYW5nZSgpIG1ldGhvZCBjYW4gYmUgY2FsbGVkIHRvIG1hcmsgdGhlIHNlcGFyYXRpb24gYmV0d2VlblxuICogZGlzdGluY3QgY2hhbmdlcy4gQXQgdGhlIGVuZCwgdGhlIENoYW5nZXMgcHJvcGVydHkgY2FuIGJlIGNhbGxlZCB0byByZXRyaWV2ZVxuICogdGhlIGNvbnN0cnVjdGVkIGNoYW5nZXMuXG4gKi9cbnZhciBEaWZmQ2hhbmdlSGVscGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgRGlmZkNoYW5nZUhlbHBlciBmb3IgdGhlIGdpdmVuIERpZmZTZXF1ZW5jZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGlmZkNoYW5nZUhlbHBlcigpIHtcbiAgICAgICAgdGhpcy5tX2NoYW5nZXMgPSBbXTtcbiAgICAgICAgdGhpcy5tX29yaWdpbmFsU3RhcnQgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLm1fbW9kaWZpZWRTdGFydCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIHRoaXMubV9vcmlnaW5hbENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5tX21vZGlmaWVkQ291bnQgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXJrcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBuZXh0IGNoYW5nZSBpbiB0aGUgc2V0IG9mIGRpZmZlcmVuY2VzLlxuICAgICAqL1xuICAgIERpZmZDaGFuZ2VIZWxwZXIucHJvdG90eXBlLk1hcmtOZXh0Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBPbmx5IGFkZCB0byB0aGUgbGlzdCBpZiB0aGVyZSBpcyBzb21ldGhpbmcgdG8gYWRkXG4gICAgICAgIGlmICh0aGlzLm1fb3JpZ2luYWxDb3VudCA+IDAgfHwgdGhpcy5tX21vZGlmaWVkQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIG5ldyBjaGFuZ2UgdG8gb3VyIGxpc3RcbiAgICAgICAgICAgIHRoaXMubV9jaGFuZ2VzLnB1c2gobmV3IERpZmZDaGFuZ2UodGhpcy5tX29yaWdpbmFsU3RhcnQsIHRoaXMubV9vcmlnaW5hbENvdW50LCB0aGlzLm1fbW9kaWZpZWRTdGFydCwgdGhpcy5tX21vZGlmaWVkQ291bnQpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBmb3IgdGhlIG5leHQgY2hhbmdlXG4gICAgICAgIHRoaXMubV9vcmlnaW5hbENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5tX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICB0aGlzLm1fb3JpZ2luYWxTdGFydCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIHRoaXMubV9tb2RpZmllZFN0YXJ0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIG9yaWdpbmFsIGVsZW1lbnQgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIHRvIHRoZSBlbGVtZW50c1xuICAgICAqIGFmZmVjdGVkIGJ5IHRoZSBjdXJyZW50IGNoYW5nZS4gVGhlIG1vZGlmaWVkIGluZGV4IGdpdmVzIGNvbnRleHRcbiAgICAgKiB0byB0aGUgY2hhbmdlIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgb3JpZ2luYWwgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIG9yaWdpbmFsSW5kZXggVGhlIGluZGV4IG9mIHRoZSBvcmlnaW5hbCBlbGVtZW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0gbW9kaWZpZWRJbmRleCBUaGUgaW5kZXggb2YgdGhlIG1vZGlmaWVkIGVsZW1lbnQgdGhhdCBwcm92aWRlcyBjb3JyZXNwb25kaW5nIHBvc2l0aW9uIGluIHRoZSBtb2RpZmllZCBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBEaWZmQ2hhbmdlSGVscGVyLnByb3RvdHlwZS5BZGRPcmlnaW5hbEVsZW1lbnQgPSBmdW5jdGlvbiAob3JpZ2luYWxJbmRleCwgbW9kaWZpZWRJbmRleCkge1xuICAgICAgICAvLyBUaGUgJ3RydWUnIHN0YXJ0IGluZGV4IGlzIHRoZSBzbWFsbGVzdCBvZiB0aGUgb25lcyB3ZSd2ZSBzZWVuXG4gICAgICAgIHRoaXMubV9vcmlnaW5hbFN0YXJ0ID0gTWF0aC5taW4odGhpcy5tX29yaWdpbmFsU3RhcnQsIG9yaWdpbmFsSW5kZXgpO1xuICAgICAgICB0aGlzLm1fbW9kaWZpZWRTdGFydCA9IE1hdGgubWluKHRoaXMubV9tb2RpZmllZFN0YXJ0LCBtb2RpZmllZEluZGV4KTtcbiAgICAgICAgdGhpcy5tX29yaWdpbmFsQ291bnQrKztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIG1vZGlmaWVkIGVsZW1lbnQgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIHRvIHRoZSBlbGVtZW50c1xuICAgICAqIGFmZmVjdGVkIGJ5IHRoZSBjdXJyZW50IGNoYW5nZS4gVGhlIG9yaWdpbmFsIGluZGV4IGdpdmVzIGNvbnRleHRcbiAgICAgKiB0byB0aGUgY2hhbmdlIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgbW9kaWZpZWQgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIG9yaWdpbmFsSW5kZXggVGhlIGluZGV4IG9mIHRoZSBvcmlnaW5hbCBlbGVtZW50IHRoYXQgcHJvdmlkZXMgY29ycmVzcG9uZGluZyBwb3NpdGlvbiBpbiB0aGUgb3JpZ2luYWwgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIG1vZGlmaWVkSW5kZXggVGhlIGluZGV4IG9mIHRoZSBtb2RpZmllZCBlbGVtZW50IHRvIGFkZC5cbiAgICAgKi9cbiAgICBEaWZmQ2hhbmdlSGVscGVyLnByb3RvdHlwZS5BZGRNb2RpZmllZEVsZW1lbnQgPSBmdW5jdGlvbiAob3JpZ2luYWxJbmRleCwgbW9kaWZpZWRJbmRleCkge1xuICAgICAgICAvLyBUaGUgJ3RydWUnIHN0YXJ0IGluZGV4IGlzIHRoZSBzbWFsbGVzdCBvZiB0aGUgb25lcyB3ZSd2ZSBzZWVuXG4gICAgICAgIHRoaXMubV9vcmlnaW5hbFN0YXJ0ID0gTWF0aC5taW4odGhpcy5tX29yaWdpbmFsU3RhcnQsIG9yaWdpbmFsSW5kZXgpO1xuICAgICAgICB0aGlzLm1fbW9kaWZpZWRTdGFydCA9IE1hdGgubWluKHRoaXMubV9tb2RpZmllZFN0YXJ0LCBtb2RpZmllZEluZGV4KTtcbiAgICAgICAgdGhpcy5tX21vZGlmaWVkQ291bnQrKztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbGwgb2YgdGhlIGNoYW5nZXMgbWFya2VkIGJ5IHRoZSBjbGFzcy5cbiAgICAgKi9cbiAgICBEaWZmQ2hhbmdlSGVscGVyLnByb3RvdHlwZS5nZXRDaGFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5tX29yaWdpbmFsQ291bnQgPiAwIHx8IHRoaXMubV9tb2RpZmllZENvdW50ID4gMCkge1xuICAgICAgICAgICAgLy8gRmluaXNoIHVwIG9uIHdoYXRldmVyIGlzIGxlZnRcbiAgICAgICAgICAgIHRoaXMuTWFya05leHRDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tX2NoYW5nZXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYWxsIG9mIHRoZSBjaGFuZ2VzIG1hcmtlZCBieSB0aGUgY2xhc3MgaW4gdGhlIHJldmVyc2Ugb3JkZXJcbiAgICAgKi9cbiAgICBEaWZmQ2hhbmdlSGVscGVyLnByb3RvdHlwZS5nZXRSZXZlcnNlQ2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubV9vcmlnaW5hbENvdW50ID4gMCB8fCB0aGlzLm1fbW9kaWZpZWRDb3VudCA+IDApIHtcbiAgICAgICAgICAgIC8vIEZpbmlzaCB1cCBvbiB3aGF0ZXZlciBpcyBsZWZ0XG4gICAgICAgICAgICB0aGlzLk1hcmtOZXh0Q2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX2NoYW5nZXMucmV2ZXJzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5tX2NoYW5nZXM7XG4gICAgfTtcbiAgICByZXR1cm4gRGlmZkNoYW5nZUhlbHBlcjtcbn0oKSk7XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBkaWZmZXJlbmNlIGFsZ29yaXRobSBkZXNjcmliZWQgaW5cbiAqIFwiQW4gTyhORCkgRGlmZmVyZW5jZSBBbGdvcml0aG0gYW5kIGl0cyB2YXJpYXRpb25zXCIgYnkgRXVnZW5lIFcuIE15ZXJzXG4gKi9cbnZhciBMY3NEaWZmID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgdGhlIERpZmZGaW5kZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMY3NEaWZmKG9yaWdpbmFsU2VxdWVuY2UsIG5ld1NlcXVlbmNlLCBjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSA9PT0gdm9pZCAwKSB7IGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSA9IG51bGw7IH1cbiAgICAgICAgdGhpcy5PcmlnaW5hbFNlcXVlbmNlID0gb3JpZ2luYWxTZXF1ZW5jZTtcbiAgICAgICAgdGhpcy5Nb2RpZmllZFNlcXVlbmNlID0gbmV3U2VxdWVuY2U7XG4gICAgICAgIHRoaXMuQ29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlID0gY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlO1xuICAgICAgICB0aGlzLm1fZm9yd2FyZEhpc3RvcnkgPSBbXTtcbiAgICAgICAgdGhpcy5tX3JldmVyc2VIaXN0b3J5ID0gW107XG4gICAgfVxuICAgIExjc0RpZmYucHJvdG90eXBlLkVsZW1lbnRzQXJlRXF1YWwgPSBmdW5jdGlvbiAob3JpZ2luYWxJbmRleCwgbmV3SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLk9yaWdpbmFsU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgob3JpZ2luYWxJbmRleCkgPT09IHRoaXMuTW9kaWZpZWRTZXF1ZW5jZS5nZXRFbGVtZW50QXRJbmRleChuZXdJbmRleCkpO1xuICAgIH07XG4gICAgTGNzRGlmZi5wcm90b3R5cGUuT3JpZ2luYWxFbGVtZW50c0FyZUVxdWFsID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5PcmlnaW5hbFNlcXVlbmNlLmdldEVsZW1lbnRBdEluZGV4KGluZGV4MSkgPT09IHRoaXMuT3JpZ2luYWxTZXF1ZW5jZS5nZXRFbGVtZW50QXRJbmRleChpbmRleDIpKTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLk1vZGlmaWVkRWxlbWVudHNBcmVFcXVhbCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xuICAgICAgICByZXR1cm4gKHRoaXMuTW9kaWZpZWRTZXF1ZW5jZS5nZXRFbGVtZW50QXRJbmRleChpbmRleDEpID09PSB0aGlzLk1vZGlmaWVkU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgoaW5kZXgyKSk7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5Db21wdXRlRGlmZiA9IGZ1bmN0aW9uIChwcmV0dHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX0NvbXB1dGVEaWZmKDAsIHRoaXMuT3JpZ2luYWxTZXF1ZW5jZS5nZXRMZW5ndGgoKSAtIDEsIDAsIHRoaXMuTW9kaWZpZWRTZXF1ZW5jZS5nZXRMZW5ndGgoKSAtIDEsIHByZXR0eSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlcyB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0aGUgb3JpZ2luYWwgYW5kIG1vZGlmaWVkIGlucHV0XG4gICAgICogc2VxdWVuY2VzIG9uIHRoZSBib3VuZGVkIHJhbmdlLlxuICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHRoZSB0d28gaW5wdXQgc2VxdWVuY2VzLlxuICAgICAqL1xuICAgIExjc0RpZmYucHJvdG90eXBlLl9Db21wdXRlRGlmZiA9IGZ1bmN0aW9uIChvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEVuZCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRFbmQsIHByZXR0eSkge1xuICAgICAgICB2YXIgcXVpdEVhcmx5QXJyID0gW2ZhbHNlXTtcbiAgICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLkNvbXB1dGVEaWZmUmVjdXJzaXZlKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsRW5kLCBtb2RpZmllZFN0YXJ0LCBtb2RpZmllZEVuZCwgcXVpdEVhcmx5QXJyKTtcbiAgICAgICAgaWYgKHByZXR0eSkge1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBjbGVhbiB1cCB0aGUgY29tcHV0ZWQgZGlmZiB0byBiZSBtb3JlIGludHVpdGl2ZVxuICAgICAgICAgICAgLy8gYnV0IGl0IHR1cm5zIG91dCB0aGlzIGNhbm5vdCBiZSBkb25lIGNvcnJlY3RseSB1bnRpbCB0aGUgZW50aXJlIHNldFxuICAgICAgICAgICAgLy8gb2YgZGlmZnMgaGF2ZSBiZWVuIGNvbXB1dGVkXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5QcmV0dGlmeUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGhlbHBlciBtZXRob2Qgd2hpY2ggY29tcHV0ZXMgdGhlIGRpZmZlcmVuY2VzIG9uIHRoZSBib3VuZGVkIHJhbmdlXG4gICAgICogcmVjdXJzaXZlbHkuXG4gICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdGhlIHR3byBpbnB1dCBzZXF1ZW5jZXMuXG4gICAgICovXG4gICAgTGNzRGlmZi5wcm90b3R5cGUuQ29tcHV0ZURpZmZSZWN1cnNpdmUgPSBmdW5jdGlvbiAob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxFbmQsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkRW5kLCBxdWl0RWFybHlBcnIpIHtcbiAgICAgICAgcXVpdEVhcmx5QXJyWzBdID0gZmFsc2U7XG4gICAgICAgIC8vIEZpbmQgdGhlIHN0YXJ0IG9mIHRoZSBkaWZmZXJlbmNlc1xuICAgICAgICB3aGlsZSAob3JpZ2luYWxTdGFydCA8PSBvcmlnaW5hbEVuZCAmJiBtb2RpZmllZFN0YXJ0IDw9IG1vZGlmaWVkRW5kICYmIHRoaXMuRWxlbWVudHNBcmVFcXVhbChvcmlnaW5hbFN0YXJ0LCBtb2RpZmllZFN0YXJ0KSkge1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydCsrO1xuICAgICAgICAgICAgbW9kaWZpZWRTdGFydCsrO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmQgdGhlIGVuZCBvZiB0aGUgZGlmZmVyZW5jZXNcbiAgICAgICAgd2hpbGUgKG9yaWdpbmFsRW5kID49IG9yaWdpbmFsU3RhcnQgJiYgbW9kaWZpZWRFbmQgPj0gbW9kaWZpZWRTdGFydCAmJiB0aGlzLkVsZW1lbnRzQXJlRXF1YWwob3JpZ2luYWxFbmQsIG1vZGlmaWVkRW5kKSkge1xuICAgICAgICAgICAgb3JpZ2luYWxFbmQtLTtcbiAgICAgICAgICAgIG1vZGlmaWVkRW5kLS07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW4gdGhlIHNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBlaXRoZXIgaGF2ZSBhbGwgaW5zZXJ0aW9ucyBvciBhbGwgZGVsZXRpb25zIG9yIHRoZSBzZXF1ZW5jZXMgYXJlIGlkZW50aWNhbFxuICAgICAgICBpZiAob3JpZ2luYWxTdGFydCA+IG9yaWdpbmFsRW5kIHx8IG1vZGlmaWVkU3RhcnQgPiBtb2RpZmllZEVuZCkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZXMgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAobW9kaWZpZWRTdGFydCA8PSBtb2RpZmllZEVuZCkge1xuICAgICAgICAgICAgICAgIERlYnVnLkFzc2VydChvcmlnaW5hbFN0YXJ0ID09PSBvcmlnaW5hbEVuZCArIDEsICdvcmlnaW5hbFN0YXJ0IHNob3VsZCBvbmx5IGJlIG9uZSBtb3JlIHRoYW4gb3JpZ2luYWxFbmQnKTtcbiAgICAgICAgICAgICAgICAvLyBBbGwgaW5zZXJ0aW9uc1xuICAgICAgICAgICAgICAgIGNoYW5nZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEaWZmQ2hhbmdlKG9yaWdpbmFsU3RhcnQsIDAsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkRW5kIC0gbW9kaWZpZWRTdGFydCArIDEpXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsU3RhcnQgPD0gb3JpZ2luYWxFbmQpIHtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5Bc3NlcnQobW9kaWZpZWRTdGFydCA9PT0gbW9kaWZpZWRFbmQgKyAxLCAnbW9kaWZpZWRTdGFydCBzaG91bGQgb25seSBiZSBvbmUgbW9yZSB0aGFuIG1vZGlmaWVkRW5kJyk7XG4gICAgICAgICAgICAgICAgLy8gQWxsIGRlbGV0aW9uc1xuICAgICAgICAgICAgICAgIGNoYW5nZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEaWZmQ2hhbmdlKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsRW5kIC0gb3JpZ2luYWxTdGFydCArIDEsIG1vZGlmaWVkU3RhcnQsIDApXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIERlYnVnLkFzc2VydChvcmlnaW5hbFN0YXJ0ID09PSBvcmlnaW5hbEVuZCArIDEsICdvcmlnaW5hbFN0YXJ0IHNob3VsZCBvbmx5IGJlIG9uZSBtb3JlIHRoYW4gb3JpZ2luYWxFbmQnKTtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5Bc3NlcnQobW9kaWZpZWRTdGFydCA9PT0gbW9kaWZpZWRFbmQgKyAxLCAnbW9kaWZpZWRTdGFydCBzaG91bGQgb25seSBiZSBvbmUgbW9yZSB0aGFuIG1vZGlmaWVkRW5kJyk7XG4gICAgICAgICAgICAgICAgLy8gSWRlbnRpY2FsIHNlcXVlbmNlcyAtIE5vIGRpZmZlcmVuY2VzXG4gICAgICAgICAgICAgICAgY2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBwcm9ibGVtIGNhbiBiZSBzb2x2ZWQgdXNpbmcgdGhlIERpdmlkZS1BbmQtQ29ucXVlciB0ZWNobmlxdWUuXG4gICAgICAgIHZhciBtaWRPcmlnaW5hbEFyciA9IFswXSwgbWlkTW9kaWZpZWRBcnIgPSBbMF07XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLkNvbXB1dGVSZWN1cnNpb25Qb2ludChvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEVuZCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRFbmQsIG1pZE9yaWdpbmFsQXJyLCBtaWRNb2RpZmllZEFyciwgcXVpdEVhcmx5QXJyKTtcbiAgICAgICAgdmFyIG1pZE9yaWdpbmFsID0gbWlkT3JpZ2luYWxBcnJbMF07XG4gICAgICAgIHZhciBtaWRNb2RpZmllZCA9IG1pZE1vZGlmaWVkQXJyWzBdO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBSZXN1bHQgaXMgbm90LW51bGwgd2hlbiB0aGVyZSB3YXMgZW5vdWdoIG1lbW9yeSB0byBjb21wdXRlIHRoZSBjaGFuZ2VzIHdoaWxlXG4gICAgICAgICAgICAvLyBzZWFyY2hpbmcgZm9yIHRoZSByZWN1cnNpb24gcG9pbnRcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXF1aXRFYXJseUFyclswXSkge1xuICAgICAgICAgICAgLy8gV2UgY2FuIGJyZWFrIHRoZSBwcm9ibGVtIGRvd24gcmVjdXJzaXZlbHkgYnkgZmluZGluZyB0aGUgY2hhbmdlcyBpbiB0aGVcbiAgICAgICAgICAgIC8vIEZpcnN0IEhhbGY6ICAgKG9yaWdpbmFsU3RhcnQsIG1vZGlmaWVkU3RhcnQpIHRvIChtaWRPcmlnaW5hbCwgbWlkTW9kaWZpZWQpXG4gICAgICAgICAgICAvLyBTZWNvbmQgSGFsZjogIChtaWRPcmlnaW5hbCArIDEsIG1pbk1vZGlmaWVkICsgMSkgdG8gKG9yaWdpbmFsRW5kLCBtb2RpZmllZEVuZClcbiAgICAgICAgICAgIC8vIE5PVEU6IENvbXB1dGVEaWZmKCkgaXMgaW5jbHVzaXZlLCB0aGVyZWZvcmUgdGhlIHNlY29uZCByYW5nZSBzdGFydHMgb24gdGhlIG5leHQgcG9pbnRcbiAgICAgICAgICAgIHZhciBsZWZ0Q2hhbmdlcyA9IHRoaXMuQ29tcHV0ZURpZmZSZWN1cnNpdmUob3JpZ2luYWxTdGFydCwgbWlkT3JpZ2luYWwsIG1vZGlmaWVkU3RhcnQsIG1pZE1vZGlmaWVkLCBxdWl0RWFybHlBcnIpO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKCFxdWl0RWFybHlBcnJbMF0pIHtcbiAgICAgICAgICAgICAgICByaWdodENoYW5nZXMgPSB0aGlzLkNvbXB1dGVEaWZmUmVjdXJzaXZlKG1pZE9yaWdpbmFsICsgMSwgb3JpZ2luYWxFbmQsIG1pZE1vZGlmaWVkICsgMSwgbW9kaWZpZWRFbmQsIHF1aXRFYXJseUFycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBkaWQndCBoYXZlIHRpbWUgdG8gZmluaXNoIHRoZSBmaXJzdCBoYWxmLCBzbyB3ZSBkb24ndCBoYXZlIHRpbWUgdG8gY29tcHV0ZSB0aGlzIGhhbGYuXG4gICAgICAgICAgICAgICAgLy8gQ29uc2lkZXIgdGhlIGVudGlyZSByZXN0IG9mIHRoZSBzZXF1ZW5jZSBkaWZmZXJlbnQuXG4gICAgICAgICAgICAgICAgcmlnaHRDaGFuZ2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGlmZkNoYW5nZShtaWRPcmlnaW5hbCArIDEsIG9yaWdpbmFsRW5kIC0gKG1pZE9yaWdpbmFsICsgMSkgKyAxLCBtaWRNb2RpZmllZCArIDEsIG1vZGlmaWVkRW5kIC0gKG1pZE1vZGlmaWVkICsgMSkgKyAxKVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Db25jYXRlbmF0ZUNoYW5nZXMobGVmdENoYW5nZXMsIHJpZ2h0Q2hhbmdlcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgaGl0IGhlcmUsIHdlIHF1aXQgZWFybHksIGFuZCBzbyBjYW4ndCByZXR1cm4gYW55dGhpbmcgbWVhbmluZ2Z1bFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgbmV3IERpZmZDaGFuZ2Uob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxFbmQgLSBvcmlnaW5hbFN0YXJ0ICsgMSwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRFbmQgLSBtb2RpZmllZFN0YXJ0ICsgMSlcbiAgICAgICAgXTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLldBTEtUUkFDRSA9IGZ1bmN0aW9uIChkaWFnb25hbEZvcndhcmRCYXNlLCBkaWFnb25hbEZvcndhcmRTdGFydCwgZGlhZ29uYWxGb3J3YXJkRW5kLCBkaWFnb25hbEZvcndhcmRPZmZzZXQsIGRpYWdvbmFsUmV2ZXJzZUJhc2UsIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0LCBkaWFnb25hbFJldmVyc2VFbmQsIGRpYWdvbmFsUmV2ZXJzZU9mZnNldCwgZm9yd2FyZFBvaW50cywgcmV2ZXJzZVBvaW50cywgb3JpZ2luYWxJbmRleCwgb3JpZ2luYWxFbmQsIG1pZE9yaWdpbmFsQXJyLCBtb2RpZmllZEluZGV4LCBtb2RpZmllZEVuZCwgbWlkTW9kaWZpZWRBcnIsIGRlbHRhSXNFdmVuLCBxdWl0RWFybHlBcnIpIHtcbiAgICAgICAgdmFyIGZvcndhcmRDaGFuZ2VzID0gbnVsbCwgcmV2ZXJzZUNoYW5nZXMgPSBudWxsO1xuICAgICAgICAvLyBGaXJzdCwgd2FsayBiYWNrd2FyZCB0aHJvdWdoIHRoZSBmb3J3YXJkIGRpYWdvbmFscyBoaXN0b3J5XG4gICAgICAgIHZhciBjaGFuZ2VIZWxwZXIgPSBuZXcgRGlmZkNoYW5nZUhlbHBlcigpO1xuICAgICAgICB2YXIgZGlhZ29uYWxNaW4gPSBkaWFnb25hbEZvcndhcmRTdGFydDtcbiAgICAgICAgdmFyIGRpYWdvbmFsTWF4ID0gZGlhZ29uYWxGb3J3YXJkRW5kO1xuICAgICAgICB2YXIgZGlhZ29uYWxSZWxhdGl2ZSA9IChtaWRPcmlnaW5hbEFyclswXSAtIG1pZE1vZGlmaWVkQXJyWzBdKSAtIGRpYWdvbmFsRm9yd2FyZE9mZnNldDtcbiAgICAgICAgdmFyIGxhc3RPcmlnaW5hbEluZGV4ID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgdmFyIGhpc3RvcnlJbmRleCA9IHRoaXMubV9mb3J3YXJkSGlzdG9yeS5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgZGlhZ29uYWw7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZGlhZ29uYWwgaW5kZXggZnJvbSB0aGUgcmVsYXRpdmUgZGlhZ29uYWwgbnVtYmVyXG4gICAgICAgICAgICBkaWFnb25hbCA9IGRpYWdvbmFsUmVsYXRpdmUgKyBkaWFnb25hbEZvcndhcmRCYXNlO1xuICAgICAgICAgICAgLy8gRmlndXJlIG91dCB3aGVyZSB3ZSBjYW1lIGZyb21cbiAgICAgICAgICAgIGlmIChkaWFnb25hbCA9PT0gZGlhZ29uYWxNaW4gfHwgKGRpYWdvbmFsIDwgZGlhZ29uYWxNYXggJiYgZm9yd2FyZFBvaW50c1tkaWFnb25hbCAtIDFdIDwgZm9yd2FyZFBvaW50c1tkaWFnb25hbCArIDFdKSkge1xuICAgICAgICAgICAgICAgIC8vIFZlcnRpY2FsIGxpbmUgKHRoZSBlbGVtZW50IGlzIGFuIGluc2VydClcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEluZGV4ID0gZm9yd2FyZFBvaW50c1tkaWFnb25hbCArIDFdO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkSW5kZXggPSBvcmlnaW5hbEluZGV4IC0gZGlhZ29uYWxSZWxhdGl2ZSAtIGRpYWdvbmFsRm9yd2FyZE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJbmRleCA8IGxhc3RPcmlnaW5hbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5NYXJrTmV4dENoYW5nZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0T3JpZ2luYWxJbmRleCA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgY2hhbmdlSGVscGVyLkFkZE1vZGlmaWVkRWxlbWVudChvcmlnaW5hbEluZGV4ICsgMSwgbW9kaWZpZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgZGlhZ29uYWxSZWxhdGl2ZSA9IChkaWFnb25hbCArIDEpIC0gZGlhZ29uYWxGb3J3YXJkQmFzZTsgLy9TZXR1cCBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBIb3Jpem9udGFsIGxpbmUgKHRoZSBlbGVtZW50IGlzIGEgZGVsZXRpb24pXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IGZvcndhcmRQb2ludHNbZGlhZ29uYWwgLSAxXSArIDE7XG4gICAgICAgICAgICAgICAgbW9kaWZpZWRJbmRleCA9IG9yaWdpbmFsSW5kZXggLSBkaWFnb25hbFJlbGF0aXZlIC0gZGlhZ29uYWxGb3J3YXJkT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEluZGV4IDwgbGFzdE9yaWdpbmFsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGVscGVyLk1hcmtOZXh0Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RPcmlnaW5hbEluZGV4ID0gb3JpZ2luYWxJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgY2hhbmdlSGVscGVyLkFkZE9yaWdpbmFsRWxlbWVudChvcmlnaW5hbEluZGV4LCBtb2RpZmllZEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgZGlhZ29uYWxSZWxhdGl2ZSA9IChkaWFnb25hbCAtIDEpIC0gZGlhZ29uYWxGb3J3YXJkQmFzZTsgLy9TZXR1cCBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGlzdG9yeUluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkUG9pbnRzID0gdGhpcy5tX2ZvcndhcmRIaXN0b3J5W2hpc3RvcnlJbmRleF07XG4gICAgICAgICAgICAgICAgZGlhZ29uYWxGb3J3YXJkQmFzZSA9IGZvcndhcmRQb2ludHNbMF07IC8vV2Ugc3RvcmVkIHRoaXMgaW4gdGhlIGZpcnN0IHNwb3RcbiAgICAgICAgICAgICAgICBkaWFnb25hbE1pbiA9IDE7XG4gICAgICAgICAgICAgICAgZGlhZ29uYWxNYXggPSBmb3J3YXJkUG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKC0taGlzdG9yeUluZGV4ID49IC0xKTtcbiAgICAgICAgLy8gSXJvbmljYWxseSwgd2UgZ2V0IHRoZSBmb3J3YXJkIGNoYW5nZXMgYXMgdGhlIHJldmVyc2Ugb2YgdGhlXG4gICAgICAgIC8vIG9yZGVyIHdlIGFkZGVkIHRoZW0gc2luY2Ugd2UgdGVjaG5pY2FsbHkgYWRkZWQgdGhlbSBiYWNrd2FyZHNcbiAgICAgICAgZm9yd2FyZENoYW5nZXMgPSBjaGFuZ2VIZWxwZXIuZ2V0UmV2ZXJzZUNoYW5nZXMoKTtcbiAgICAgICAgaWYgKHF1aXRFYXJseUFyclswXSkge1xuICAgICAgICAgICAgLy8gVE9ETzogQ2FsY3VsYXRlIGEgcGFydGlhbCBmcm9tIHRoZSByZXZlcnNlIGRpYWdvbmFscy5cbiAgICAgICAgICAgIC8vICAgICAgIEZvciBub3csIGp1c3QgYXNzdW1lIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIG1pZE9yaWdpbmFsL21pZE1vZGlmaWVkIHBvaW50IGlzIGEgZGlmZlxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsU3RhcnRQb2ludCA9IG1pZE9yaWdpbmFsQXJyWzBdICsgMTtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZFN0YXJ0UG9pbnQgPSBtaWRNb2RpZmllZEFyclswXSArIDE7XG4gICAgICAgICAgICBpZiAoZm9yd2FyZENoYW5nZXMgIT09IG51bGwgJiYgZm9yd2FyZENoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0Rm9yd2FyZENoYW5nZSA9IGZvcndhcmRDaGFuZ2VzW2ZvcndhcmRDaGFuZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRQb2ludCA9IE1hdGgubWF4KG9yaWdpbmFsU3RhcnRQb2ludCwgbGFzdEZvcndhcmRDaGFuZ2UuZ2V0T3JpZ2luYWxFbmQoKSk7XG4gICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydFBvaW50ID0gTWF0aC5tYXgobW9kaWZpZWRTdGFydFBvaW50LCBsYXN0Rm9yd2FyZENoYW5nZS5nZXRNb2RpZmllZEVuZCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldmVyc2VDaGFuZ2VzID0gW1xuICAgICAgICAgICAgICAgIG5ldyBEaWZmQ2hhbmdlKG9yaWdpbmFsU3RhcnRQb2ludCwgb3JpZ2luYWxFbmQgLSBvcmlnaW5hbFN0YXJ0UG9pbnQgKyAxLCBtb2RpZmllZFN0YXJ0UG9pbnQsIG1vZGlmaWVkRW5kIC0gbW9kaWZpZWRTdGFydFBvaW50ICsgMSlcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3cgd2FsayBiYWNrd2FyZCB0aHJvdWdoIHRoZSByZXZlcnNlIGRpYWdvbmFscyBoaXN0b3J5XG4gICAgICAgICAgICBjaGFuZ2VIZWxwZXIgPSBuZXcgRGlmZkNoYW5nZUhlbHBlcigpO1xuICAgICAgICAgICAgZGlhZ29uYWxNaW4gPSBkaWFnb25hbFJldmVyc2VTdGFydDtcbiAgICAgICAgICAgIGRpYWdvbmFsTWF4ID0gZGlhZ29uYWxSZXZlcnNlRW5kO1xuICAgICAgICAgICAgZGlhZ29uYWxSZWxhdGl2ZSA9IChtaWRPcmlnaW5hbEFyclswXSAtIG1pZE1vZGlmaWVkQXJyWzBdKSAtIGRpYWdvbmFsUmV2ZXJzZU9mZnNldDtcbiAgICAgICAgICAgIGxhc3RPcmlnaW5hbEluZGV4ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIGhpc3RvcnlJbmRleCA9IChkZWx0YUlzRXZlbikgPyB0aGlzLm1fcmV2ZXJzZUhpc3RvcnkubGVuZ3RoIC0gMSA6IHRoaXMubV9yZXZlcnNlSGlzdG9yeS5sZW5ndGggLSAyO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZGlhZ29uYWwgaW5kZXggZnJvbSB0aGUgcmVsYXRpdmUgZGlhZ29uYWwgbnVtYmVyXG4gICAgICAgICAgICAgICAgZGlhZ29uYWwgPSBkaWFnb25hbFJlbGF0aXZlICsgZGlhZ29uYWxSZXZlcnNlQmFzZTtcbiAgICAgICAgICAgICAgICAvLyBGaWd1cmUgb3V0IHdoZXJlIHdlIGNhbWUgZnJvbVxuICAgICAgICAgICAgICAgIGlmIChkaWFnb25hbCA9PT0gZGlhZ29uYWxNaW4gfHwgKGRpYWdvbmFsIDwgZGlhZ29uYWxNYXggJiYgcmV2ZXJzZVBvaW50c1tkaWFnb25hbCAtIDFdID49IHJldmVyc2VQb2ludHNbZGlhZ29uYWwgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSG9yaXpvbnRhbCBsaW5lICh0aGUgZWxlbWVudCBpcyBhIGRlbGV0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IHJldmVyc2VQb2ludHNbZGlhZ29uYWwgKyAxXSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkSW5kZXggPSBvcmlnaW5hbEluZGV4IC0gZGlhZ29uYWxSZWxhdGl2ZSAtIGRpYWdvbmFsUmV2ZXJzZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSW5kZXggPiBsYXN0T3JpZ2luYWxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGVscGVyLk1hcmtOZXh0Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFzdE9yaWdpbmFsSW5kZXggPSBvcmlnaW5hbEluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGVscGVyLkFkZE9yaWdpbmFsRWxlbWVudChvcmlnaW5hbEluZGV4ICsgMSwgbW9kaWZpZWRJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaWFnb25hbFJlbGF0aXZlID0gKGRpYWdvbmFsICsgMSkgLSBkaWFnb25hbFJldmVyc2VCYXNlOyAvL1NldHVwIGZvciB0aGUgbmV4dCBpdGVyYXRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZlcnRpY2FsIGxpbmUgKHRoZSBlbGVtZW50IGlzIGFuIGluc2VydGlvbilcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IHJldmVyc2VQb2ludHNbZGlhZ29uYWwgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRJbmRleCA9IG9yaWdpbmFsSW5kZXggLSBkaWFnb25hbFJlbGF0aXZlIC0gZGlhZ29uYWxSZXZlcnNlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJbmRleCA+IGxhc3RPcmlnaW5hbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIZWxwZXIuTWFya05leHRDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0T3JpZ2luYWxJbmRleCA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5BZGRNb2RpZmllZEVsZW1lbnQob3JpZ2luYWxJbmRleCArIDEsIG1vZGlmaWVkSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxSZWxhdGl2ZSA9IChkaWFnb25hbCAtIDEpIC0gZGlhZ29uYWxSZXZlcnNlQmFzZTsgLy9TZXR1cCBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChoaXN0b3J5SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnNlUG9pbnRzID0gdGhpcy5tX3JldmVyc2VIaXN0b3J5W2hpc3RvcnlJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGRpYWdvbmFsUmV2ZXJzZUJhc2UgPSByZXZlcnNlUG9pbnRzWzBdOyAvL1dlIHN0b3JlZCB0aGlzIGluIHRoZSBmaXJzdCBzcG90XG4gICAgICAgICAgICAgICAgICAgIGRpYWdvbmFsTWluID0gMTtcbiAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxNYXggPSByZXZlcnNlUG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoLS1oaXN0b3J5SW5kZXggPj0gLTEpO1xuICAgICAgICAgICAgLy8gVGhlcmUgYXJlIGNhc2VzIHdoZXJlIHRoZSByZXZlcnNlIGhpc3Rvcnkgd2lsbCBmaW5kIGRpZmZzIHRoYXRcbiAgICAgICAgICAgIC8vIGFyZSBjb3JyZWN0LCBidXQgbm90IGludHVpdGl2ZSwgc28gd2UgbmVlZCBzaGlmdCB0aGVtLlxuICAgICAgICAgICAgcmV2ZXJzZUNoYW5nZXMgPSBjaGFuZ2VIZWxwZXIuZ2V0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLkNvbmNhdGVuYXRlQ2hhbmdlcyhmb3J3YXJkQ2hhbmdlcywgcmV2ZXJzZUNoYW5nZXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIHJhbmdlIHRvIGNvbXB1dGUgdGhlIGRpZmYgb24sIHRoaXMgbWV0aG9kIGZpbmRzIHRoZSBwb2ludDpcbiAgICAgKiAobWlkT3JpZ2luYWwsIG1pZE1vZGlmaWVkKVxuICAgICAqIHRoYXQgZXhpc3RzIGluIHRoZSBtaWRkbGUgb2YgdGhlIExDUyBvZiB0aGUgdHdvIHNlcXVlbmNlcyBhbmRcbiAgICAgKiBpcyB0aGUgcG9pbnQgYXQgd2hpY2ggdGhlIExDUyBwcm9ibGVtIG1heSBiZSBicm9rZW4gZG93biByZWN1cnNpdmVseS5cbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIHRyeSB0byBrZWVwIHRoZSBMQ1MgdHJhY2UgaW4gbWVtb3J5LiBJZiB0aGUgTENTIHJlY3Vyc2lvblxuICAgICAqIHBvaW50IGlzIGNhbGN1bGF0ZWQgYW5kIHRoZSBmdWxsIHRyYWNlIGlzIGF2YWlsYWJsZSBpbiBtZW1vcnksIHRoZW4gdGhpcyBtZXRob2RcbiAgICAgKiB3aWxsIHJldHVybiB0aGUgY2hhbmdlIGxpc3QuXG4gICAgICogQHBhcmFtIG9yaWdpbmFsU3RhcnQgVGhlIHN0YXJ0IGJvdW5kIG9mIHRoZSBvcmlnaW5hbCBzZXF1ZW5jZSByYW5nZVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbEVuZCBUaGUgZW5kIGJvdW5kIG9mIHRoZSBvcmlnaW5hbCBzZXF1ZW5jZSByYW5nZVxuICAgICAqIEBwYXJhbSBtb2RpZmllZFN0YXJ0IFRoZSBzdGFydCBib3VuZCBvZiB0aGUgbW9kaWZpZWQgc2VxdWVuY2UgcmFuZ2VcbiAgICAgKiBAcGFyYW0gbW9kaWZpZWRFbmQgVGhlIGVuZCBib3VuZCBvZiB0aGUgbW9kaWZpZWQgc2VxdWVuY2UgcmFuZ2VcbiAgICAgKiBAcGFyYW0gbWlkT3JpZ2luYWwgVGhlIG1pZGRsZSBwb2ludCBvZiB0aGUgb3JpZ2luYWwgc2VxdWVuY2UgcmFuZ2VcbiAgICAgKiBAcGFyYW0gbWlkTW9kaWZpZWQgVGhlIG1pZGRsZSBwb2ludCBvZiB0aGUgbW9kaWZpZWQgc2VxdWVuY2UgcmFuZ2VcbiAgICAgKiBAcmV0dXJucyBUaGUgZGlmZiBjaGFuZ2VzLCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBudWxsXG4gICAgICovXG4gICAgTGNzRGlmZi5wcm90b3R5cGUuQ29tcHV0ZVJlY3Vyc2lvblBvaW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsRW5kLCBtb2RpZmllZFN0YXJ0LCBtb2RpZmllZEVuZCwgbWlkT3JpZ2luYWxBcnIsIG1pZE1vZGlmaWVkQXJyLCBxdWl0RWFybHlBcnIpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsSW5kZXggPSAwLCBtb2RpZmllZEluZGV4ID0gMDtcbiAgICAgICAgdmFyIGRpYWdvbmFsRm9yd2FyZFN0YXJ0ID0gMCwgZGlhZ29uYWxGb3J3YXJkRW5kID0gMDtcbiAgICAgICAgdmFyIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0ID0gMCwgZGlhZ29uYWxSZXZlcnNlRW5kID0gMDtcbiAgICAgICAgdmFyIG51bURpZmZlcmVuY2VzO1xuICAgICAgICAvLyBUbyB0cmF2ZXJzZSB0aGUgZWRpdCBncmFwaCBhbmQgcHJvZHVjZSB0aGUgcHJvcGVyIExDUywgb3VyIGFjdHVhbFxuICAgICAgICAvLyBzdGFydCBwb3NpdGlvbiBpcyBqdXN0IG91dHNpZGUgdGhlIGdpdmVuIGJvdW5kYXJ5XG4gICAgICAgIG9yaWdpbmFsU3RhcnQtLTtcbiAgICAgICAgbW9kaWZpZWRTdGFydC0tO1xuICAgICAgICAvLyBXZSBzZXQgdGhlc2UgdXAgdG8gbWFrZSB0aGUgY29tcGlsZXIgaGFwcHksIGJ1dCB0aGV5IHdpbGxcbiAgICAgICAgLy8gYmUgcmVwbGFjZWQgYmVmb3JlIHdlIHJldHVybiB3aXRoIHRoZSBhY3R1YWwgcmVjdXJzaW9uIHBvaW50XG4gICAgICAgIG1pZE9yaWdpbmFsQXJyWzBdID0gMDtcbiAgICAgICAgbWlkTW9kaWZpZWRBcnJbMF0gPSAwO1xuICAgICAgICAvLyBDbGVhciBvdXQgdGhlIGhpc3RvcnlcbiAgICAgICAgdGhpcy5tX2ZvcndhcmRIaXN0b3J5ID0gW107XG4gICAgICAgIHRoaXMubV9yZXZlcnNlSGlzdG9yeSA9IFtdO1xuICAgICAgICAvLyBFYWNoIGNlbGwgaW4gdGhlIHR3byBhcnJheXMgY29ycmVzcG9uZHMgdG8gYSBkaWFnb25hbCBpbiB0aGUgZWRpdCBncmFwaC5cbiAgICAgICAgLy8gVGhlIGludGVnZXIgdmFsdWUgaW4gdGhlIGNlbGwgcmVwcmVzZW50cyB0aGUgb3JpZ2luYWxJbmRleCBvZiB0aGUgZnVydGhlc3RcbiAgICAgICAgLy8gcmVhY2hpbmcgcG9pbnQgZm91bmQgc28gZmFyIHRoYXQgZW5kcyBpbiB0aGF0IGRpYWdvbmFsLlxuICAgICAgICAvLyBUaGUgbW9kaWZpZWRJbmRleCBjYW4gYmUgY29tcHV0ZWQgbWF0aGVtYXRpY2FsbHkgZnJvbSB0aGUgb3JpZ2luYWxJbmRleCBhbmQgdGhlIGRpYWdvbmFsIG51bWJlci5cbiAgICAgICAgdmFyIG1heERpZmZlcmVuY2VzID0gKG9yaWdpbmFsRW5kIC0gb3JpZ2luYWxTdGFydCkgKyAobW9kaWZpZWRFbmQgLSBtb2RpZmllZFN0YXJ0KTtcbiAgICAgICAgdmFyIG51bURpYWdvbmFscyA9IG1heERpZmZlcmVuY2VzICsgMTtcbiAgICAgICAgdmFyIGZvcndhcmRQb2ludHMgPSBuZXcgQXJyYXkobnVtRGlhZ29uYWxzKTtcbiAgICAgICAgdmFyIHJldmVyc2VQb2ludHMgPSBuZXcgQXJyYXkobnVtRGlhZ29uYWxzKTtcbiAgICAgICAgLy8gZGlhZ29uYWxGb3J3YXJkQmFzZTogSW5kZXggaW50byBmb3J3YXJkUG9pbnRzIG9mIHRoZSBkaWFnb25hbCB3aGljaCBwYXNzZXMgdGhyb3VnaCAob3JpZ2luYWxTdGFydCwgbW9kaWZpZWRTdGFydClcbiAgICAgICAgLy8gZGlhZ29uYWxSZXZlcnNlQmFzZTogSW5kZXggaW50byByZXZlcnNlUG9pbnRzIG9mIHRoZSBkaWFnb25hbCB3aGljaCBwYXNzZXMgdGhyb3VnaCAob3JpZ2luYWxFbmQsIG1vZGlmaWVkRW5kKVxuICAgICAgICB2YXIgZGlhZ29uYWxGb3J3YXJkQmFzZSA9IChtb2RpZmllZEVuZCAtIG1vZGlmaWVkU3RhcnQpO1xuICAgICAgICB2YXIgZGlhZ29uYWxSZXZlcnNlQmFzZSA9IChvcmlnaW5hbEVuZCAtIG9yaWdpbmFsU3RhcnQpO1xuICAgICAgICAvLyBkaWFnb25hbEZvcndhcmRPZmZzZXQ6IEdlb21ldHJpYyBvZmZzZXQgd2hpY2ggYWxsb3dzIG1vZGlmaWVkSW5kZXggdG8gYmUgY29tcHV0ZWQgZnJvbSBvcmlnaW5hbEluZGV4IGFuZCB0aGVcbiAgICAgICAgLy8gICAgZGlhZ29uYWwgbnVtYmVyIChyZWxhdGl2ZSB0byBkaWFnb25hbEZvcndhcmRCYXNlKVxuICAgICAgICAvLyBkaWFnb25hbFJldmVyc2VPZmZzZXQ6IEdlb21ldHJpYyBvZmZzZXQgd2hpY2ggYWxsb3dzIG1vZGlmaWVkSW5kZXggdG8gYmUgY29tcHV0ZWQgZnJvbSBvcmlnaW5hbEluZGV4IGFuZCB0aGVcbiAgICAgICAgLy8gICAgZGlhZ29uYWwgbnVtYmVyIChyZWxhdGl2ZSB0byBkaWFnb25hbFJldmVyc2VCYXNlKVxuICAgICAgICB2YXIgZGlhZ29uYWxGb3J3YXJkT2Zmc2V0ID0gKG9yaWdpbmFsU3RhcnQgLSBtb2RpZmllZFN0YXJ0KTtcbiAgICAgICAgdmFyIGRpYWdvbmFsUmV2ZXJzZU9mZnNldCA9IChvcmlnaW5hbEVuZCAtIG1vZGlmaWVkRW5kKTtcbiAgICAgICAgLy8gZGVsdGE6IFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGVuZCBkaWFnb25hbCBhbmQgdGhlIHN0YXJ0IGRpYWdvbmFsLiBUaGlzIGlzIHVzZWQgdG8gcmVsYXRlIGRpYWdvbmFsIG51bWJlcnNcbiAgICAgICAgLy8gICByZWxhdGl2ZSB0byB0aGUgc3RhcnQgZGlhZ29uYWwgd2l0aCBkaWFnb25hbCBudW1iZXJzIHJlbGF0aXZlIHRvIHRoZSBlbmQgZGlhZ29uYWwuXG4gICAgICAgIC8vIFRoZSBFdmVuL09kZG4tbmVzcyBvZiB0aGlzIGRlbHRhIGlzIGltcG9ydGFudCBmb3IgZGV0ZXJtaW5pbmcgd2hlbiB3ZSBzaG91bGQgY2hlY2sgZm9yIG92ZXJsYXBcbiAgICAgICAgdmFyIGRlbHRhID0gZGlhZ29uYWxSZXZlcnNlQmFzZSAtIGRpYWdvbmFsRm9yd2FyZEJhc2U7XG4gICAgICAgIHZhciBkZWx0YUlzRXZlbiA9IChkZWx0YSAlIDIgPT09IDApO1xuICAgICAgICAvLyBIZXJlIHdlIHNldCB1cCB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludHMgYXMgdGhlIGZ1cnRoZXN0IHBvaW50cyBmb3VuZCBzbyBmYXJcbiAgICAgICAgLy8gaW4gYm90aCB0aGUgZm9yd2FyZCBhbmQgcmV2ZXJzZSBkaXJlY3Rpb25zLCByZXNwZWN0aXZlbHlcbiAgICAgICAgZm9yd2FyZFBvaW50c1tkaWFnb25hbEZvcndhcmRCYXNlXSA9IG9yaWdpbmFsU3RhcnQ7XG4gICAgICAgIHJldmVyc2VQb2ludHNbZGlhZ29uYWxSZXZlcnNlQmFzZV0gPSBvcmlnaW5hbEVuZDtcbiAgICAgICAgLy8gUmVtZW1iZXIgaWYgd2UgcXVpdCBlYXJseSwgYW5kIHRodXMgbmVlZCB0byBkbyBhIGJlc3QtZWZmb3J0IHJlc3VsdCBpbnN0ZWFkIG9mIGEgcmVhbCByZXN1bHQuXG4gICAgICAgIHF1aXRFYXJseUFyclswXSA9IGZhbHNlO1xuICAgICAgICAvLyBBIGNvdXBsZSBvZiBwb2ludHM6XG4gICAgICAgIC8vIC0tV2l0aCB0aGlzIG1ldGhvZCwgd2UgaXRlcmF0ZSBvbiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzIGJldHdlZW4gdGhlIHR3byBzZXF1ZW5jZXMuXG4gICAgICAgIC8vICAgVGhlIG1vcmUgZGlmZmVyZW5jZXMgdGhlcmUgYWN0dWFsbHkgYXJlLCB0aGUgbG9uZ2VyIHRoaXMgd2lsbCB0YWtlLlxuICAgICAgICAvLyAtLUFsc28sIGFzIHRoZSBudW1iZXIgb2YgZGlmZmVyZW5jZXMgaW5jcmVhc2VzLCB3ZSBoYXZlIHRvIHNlYXJjaCBvbiBkaWFnb25hbHMgZnVydGhlclxuICAgICAgICAvLyAgIGF3YXkgZnJvbSB0aGUgcmVmZXJlbmNlIGRpYWdvbmFsICh3aGljaCBpcyBkaWFnb25hbEZvcndhcmRCYXNlIGZvciBmb3J3YXJkLCBkaWFnb25hbFJldmVyc2VCYXNlIGZvciByZXZlcnNlKS5cbiAgICAgICAgLy8gLS1XZSBleHRlbmQgb24gZXZlbiBkaWFnb25hbHMgKHJlbGF0aXZlIHRvIHRoZSByZWZlcmVuY2UgZGlhZ29uYWwpIG9ubHkgd2hlbiBudW1EaWZmZXJlbmNlc1xuICAgICAgICAvLyAgIGlzIGV2ZW4gYW5kIG9kZCBkaWFnb25hbHMgb25seSB3aGVuIG51bURpZmZlcmVuY2VzIGlzIG9kZC5cbiAgICAgICAgdmFyIGRpYWdvbmFsLCB0ZW1wT3JpZ2luYWxJbmRleDtcbiAgICAgICAgZm9yIChudW1EaWZmZXJlbmNlcyA9IDE7IG51bURpZmZlcmVuY2VzIDw9IChtYXhEaWZmZXJlbmNlcyAvIDIpICsgMTsgbnVtRGlmZmVyZW5jZXMrKykge1xuICAgICAgICAgICAgdmFyIGZ1cnRoZXN0T3JpZ2luYWxJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgZnVydGhlc3RNb2RpZmllZEluZGV4ID0gMDtcbiAgICAgICAgICAgIC8vIFJ1biB0aGUgYWxnb3JpdGhtIGluIHRoZSBmb3J3YXJkIGRpcmVjdGlvblxuICAgICAgICAgICAgZGlhZ29uYWxGb3J3YXJkU3RhcnQgPSB0aGlzLkNsaXBEaWFnb25hbEJvdW5kKGRpYWdvbmFsRm9yd2FyZEJhc2UgLSBudW1EaWZmZXJlbmNlcywgbnVtRGlmZmVyZW5jZXMsIGRpYWdvbmFsRm9yd2FyZEJhc2UsIG51bURpYWdvbmFscyk7XG4gICAgICAgICAgICBkaWFnb25hbEZvcndhcmRFbmQgPSB0aGlzLkNsaXBEaWFnb25hbEJvdW5kKGRpYWdvbmFsRm9yd2FyZEJhc2UgKyBudW1EaWZmZXJlbmNlcywgbnVtRGlmZmVyZW5jZXMsIGRpYWdvbmFsRm9yd2FyZEJhc2UsIG51bURpYWdvbmFscyk7XG4gICAgICAgICAgICBmb3IgKGRpYWdvbmFsID0gZGlhZ29uYWxGb3J3YXJkU3RhcnQ7IGRpYWdvbmFsIDw9IGRpYWdvbmFsRm9yd2FyZEVuZDsgZGlhZ29uYWwgKz0gMikge1xuICAgICAgICAgICAgICAgIC8vIFNURVAgMTogV2UgZXh0ZW5kIHRoZSBmdXJ0aGVzdCByZWFjaGluZyBwb2ludCBpbiB0aGUgcHJlc2VudCBkaWFnb25hbFxuICAgICAgICAgICAgICAgIC8vIGJ5IGxvb2tpbmcgYXQgdGhlIGRpYWdvbmFscyBhYm92ZSBhbmQgYmVsb3cgYW5kIHBpY2tpbmcgdGhlIG9uZSB3aG9zZSBwb2ludFxuICAgICAgICAgICAgICAgIC8vIGlzIGZ1cnRoZXIgYXdheSBmcm9tIHRoZSBzdGFydCBwb2ludCAob3JpZ2luYWxTdGFydCwgbW9kaWZpZWRTdGFydClcbiAgICAgICAgICAgICAgICBpZiAoZGlhZ29uYWwgPT09IGRpYWdvbmFsRm9yd2FyZFN0YXJ0IHx8IChkaWFnb25hbCA8IGRpYWdvbmFsRm9yd2FyZEVuZCAmJiBmb3J3YXJkUG9pbnRzW2RpYWdvbmFsIC0gMV0gPCBmb3J3YXJkUG9pbnRzW2RpYWdvbmFsICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXggPSBmb3J3YXJkUG9pbnRzW2RpYWdvbmFsICsgMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEluZGV4ID0gZm9yd2FyZFBvaW50c1tkaWFnb25hbCAtIDFdICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kaWZpZWRJbmRleCA9IG9yaWdpbmFsSW5kZXggLSAoZGlhZ29uYWwgLSBkaWFnb25hbEZvcndhcmRCYXNlKSAtIGRpYWdvbmFsRm9yd2FyZE9mZnNldDtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IG9yaWdpbmFsSW5kZXggc28gd2UgY2FuIHRlc3QgZm9yIGZhbHNlIG92ZXJsYXAgaW4gc3RlcCAzXG4gICAgICAgICAgICAgICAgdGVtcE9yaWdpbmFsSW5kZXggPSBvcmlnaW5hbEluZGV4O1xuICAgICAgICAgICAgICAgIC8vIFNURVAgMjogV2UgY2FuIGNvbnRpbnVlIHRvIGV4dGVuZCB0aGUgZnVydGhlc3QgcmVhY2hpbmcgcG9pbnQgaW4gdGhlIHByZXNlbnQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAvLyBzbyBsb25nIGFzIHRoZSBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICAgICAgICAgICAgd2hpbGUgKG9yaWdpbmFsSW5kZXggPCBvcmlnaW5hbEVuZCAmJiBtb2RpZmllZEluZGV4IDwgbW9kaWZpZWRFbmQgJiYgdGhpcy5FbGVtZW50c0FyZUVxdWFsKG9yaWdpbmFsSW5kZXggKyAxLCBtb2RpZmllZEluZGV4ICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcndhcmRQb2ludHNbZGlhZ29uYWxdID0gb3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJbmRleCArIG1vZGlmaWVkSW5kZXggPiBmdXJ0aGVzdE9yaWdpbmFsSW5kZXggKyBmdXJ0aGVzdE1vZGlmaWVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVydGhlc3RPcmlnaW5hbEluZGV4ID0gb3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgZnVydGhlc3RNb2RpZmllZEluZGV4ID0gbW9kaWZpZWRJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU1RFUCAzOiBJZiBkZWx0YSBpcyBvZGQgKG92ZXJsYXAgZmlyc3QgaGFwcGVucyBvbiBmb3J3YXJkIHdoZW4gZGVsdGEgaXMgb2RkKVxuICAgICAgICAgICAgICAgIC8vIGFuZCBkaWFnb25hbCBpcyBpbiB0aGUgcmFuZ2Ugb2YgcmV2ZXJzZSBkaWFnb25hbHMgY29tcHV0ZWQgZm9yIG51bURpZmZlcmVuY2VzLTFcbiAgICAgICAgICAgICAgICAvLyAodGhlIHByZXZpb3VzIGl0ZXJhdGlvbjsgd2UgaGF2ZW4ndCBjb21wdXRlZCByZXZlcnNlIGRpYWdvbmFscyBmb3IgbnVtRGlmZmVyZW5jZXMgeWV0KVxuICAgICAgICAgICAgICAgIC8vIHRoZW4gY2hlY2sgZm9yIG92ZXJsYXAuXG4gICAgICAgICAgICAgICAgaWYgKCFkZWx0YUlzRXZlbiAmJiBNYXRoLmFicyhkaWFnb25hbCAtIGRpYWdvbmFsUmV2ZXJzZUJhc2UpIDw9IChudW1EaWZmZXJlbmNlcyAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEluZGV4ID49IHJldmVyc2VQb2ludHNbZGlhZ29uYWxdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRPcmlnaW5hbEFyclswXSA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRNb2RpZmllZEFyclswXSA9IG1vZGlmaWVkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcE9yaWdpbmFsSW5kZXggPD0gcmV2ZXJzZVBvaW50c1tkaWFnb25hbF0gJiYgTWF4RGlmZmVyZW5jZXNIaXN0b3J5ID4gMCAmJiBudW1EaWZmZXJlbmNlcyA8PSAoTWF4RGlmZmVyZW5jZXNIaXN0b3J5ICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCSU5HTyEgV2Ugb3ZlcmxhcHBlZCwgYW5kIHdlIGhhdmUgdGhlIGZ1bGwgdHJhY2UgaW4gbWVtb3J5IVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLldBTEtUUkFDRShkaWFnb25hbEZvcndhcmRCYXNlLCBkaWFnb25hbEZvcndhcmRTdGFydCwgZGlhZ29uYWxGb3J3YXJkRW5kLCBkaWFnb25hbEZvcndhcmRPZmZzZXQsIGRpYWdvbmFsUmV2ZXJzZUJhc2UsIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0LCBkaWFnb25hbFJldmVyc2VFbmQsIGRpYWdvbmFsUmV2ZXJzZU9mZnNldCwgZm9yd2FyZFBvaW50cywgcmV2ZXJzZVBvaW50cywgb3JpZ2luYWxJbmRleCwgb3JpZ2luYWxFbmQsIG1pZE9yaWdpbmFsQXJyLCBtb2RpZmllZEluZGV4LCBtb2RpZmllZEVuZCwgbWlkTW9kaWZpZWRBcnIsIGRlbHRhSXNFdmVuLCBxdWl0RWFybHlBcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWl0aGVyIGZhbHNlIG92ZXJsYXAsIG9yIHdlIGRpZG4ndCBoYXZlIGVub3VnaCBtZW1vcnkgZm9yIHRoZSBmdWxsIHRyYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSnVzdCByZXR1cm4gdGhlIHJlY3Vyc2lvbiBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIHNob3VsZCBiZSBxdWl0dGluZyBlYXJseSwgYmVmb3JlIG1vdmluZyBvbiB0byB0aGUgbmV4dCBpdGVyYXRpb24uXG4gICAgICAgICAgICB2YXIgbWF0Y2hMZW5ndGhPZkxvbmdlc3QgPSAoKGZ1cnRoZXN0T3JpZ2luYWxJbmRleCAtIG9yaWdpbmFsU3RhcnQpICsgKGZ1cnRoZXN0TW9kaWZpZWRJbmRleCAtIG1vZGlmaWVkU3RhcnQpIC0gbnVtRGlmZmVyZW5jZXMpIC8gMjtcbiAgICAgICAgICAgIGlmICh0aGlzLkNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSAhPT0gbnVsbCAmJiAhdGhpcy5Db250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUoZnVydGhlc3RPcmlnaW5hbEluZGV4LCB0aGlzLk9yaWdpbmFsU2VxdWVuY2UsIG1hdGNoTGVuZ3RoT2ZMb25nZXN0KSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IGZpbmlzaCwgc28gc2tpcCBhaGVhZCB0byBnZW5lcmF0aW5nIGEgcmVzdWx0IGZyb20gd2hhdCB3ZSBoYXZlLlxuICAgICAgICAgICAgICAgIHF1aXRFYXJseUFyclswXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBmdXJ0aGVzdCBkaXN0YW5jZSB3ZSBnb3QgaW4gdGhlIGZvcndhcmQgZGlyZWN0aW9uLlxuICAgICAgICAgICAgICAgIG1pZE9yaWdpbmFsQXJyWzBdID0gZnVydGhlc3RPcmlnaW5hbEluZGV4O1xuICAgICAgICAgICAgICAgIG1pZE1vZGlmaWVkQXJyWzBdID0gZnVydGhlc3RNb2RpZmllZEluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaExlbmd0aE9mTG9uZ2VzdCA+IDAgJiYgTWF4RGlmZmVyZW5jZXNIaXN0b3J5ID4gMCAmJiBudW1EaWZmZXJlbmNlcyA8PSAoTWF4RGlmZmVyZW5jZXNIaXN0b3J5ICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRW5vdWdoIG9mIHRoZSBoaXN0b3J5IGlzIGluIG1lbW9yeSB0byB3YWxrIGl0IGJhY2t3YXJkc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5XQUxLVFJBQ0UoZGlhZ29uYWxGb3J3YXJkQmFzZSwgZGlhZ29uYWxGb3J3YXJkU3RhcnQsIGRpYWdvbmFsRm9yd2FyZEVuZCwgZGlhZ29uYWxGb3J3YXJkT2Zmc2V0LCBkaWFnb25hbFJldmVyc2VCYXNlLCBkaWFnb25hbFJldmVyc2VTdGFydCwgZGlhZ29uYWxSZXZlcnNlRW5kLCBkaWFnb25hbFJldmVyc2VPZmZzZXQsIGZvcndhcmRQb2ludHMsIHJldmVyc2VQb2ludHMsIG9yaWdpbmFsSW5kZXgsIG9yaWdpbmFsRW5kLCBtaWRPcmlnaW5hbEFyciwgbW9kaWZpZWRJbmRleCwgbW9kaWZpZWRFbmQsIG1pZE1vZGlmaWVkQXJyLCBkZWx0YUlzRXZlbiwgcXVpdEVhcmx5QXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGRpZG4ndCBhY3R1YWxseSByZW1lbWJlciBlbm91Z2ggb2YgdGhlIGhpc3RvcnkuXG4gICAgICAgICAgICAgICAgICAgIC8vU2luY2Ugd2UgYXJlIHF1aXRpbmcgdGhlIGRpZmYgZWFybHksIHdlIG5lZWQgdG8gc2hpZnQgYmFjayB0aGUgb3JpZ2luYWxTdGFydCBhbmQgbW9kaWZpZWQgc3RhcnRcbiAgICAgICAgICAgICAgICAgICAgLy9iYWNrIGludG8gdGhlIGJvdW5kYXJ5IGxpbWl0cyBzaW5jZSB3ZSBkZWNyZW1lbnRlZCB0aGVpciB2YWx1ZSBhYm92ZSBiZXlvbmQgdGhlIGJvdW5kYXJ5IGxpbWl0LlxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFN0YXJ0Kys7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnQrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEaWZmQ2hhbmdlKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsRW5kIC0gb3JpZ2luYWxTdGFydCArIDEsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkRW5kIC0gbW9kaWZpZWRTdGFydCArIDEpXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUnVuIHRoZSBhbGdvcml0aG0gaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uXG4gICAgICAgICAgICBkaWFnb25hbFJldmVyc2VTdGFydCA9IHRoaXMuQ2xpcERpYWdvbmFsQm91bmQoZGlhZ29uYWxSZXZlcnNlQmFzZSAtIG51bURpZmZlcmVuY2VzLCBudW1EaWZmZXJlbmNlcywgZGlhZ29uYWxSZXZlcnNlQmFzZSwgbnVtRGlhZ29uYWxzKTtcbiAgICAgICAgICAgIGRpYWdvbmFsUmV2ZXJzZUVuZCA9IHRoaXMuQ2xpcERpYWdvbmFsQm91bmQoZGlhZ29uYWxSZXZlcnNlQmFzZSArIG51bURpZmZlcmVuY2VzLCBudW1EaWZmZXJlbmNlcywgZGlhZ29uYWxSZXZlcnNlQmFzZSwgbnVtRGlhZ29uYWxzKTtcbiAgICAgICAgICAgIGZvciAoZGlhZ29uYWwgPSBkaWFnb25hbFJldmVyc2VTdGFydDsgZGlhZ29uYWwgPD0gZGlhZ29uYWxSZXZlcnNlRW5kOyBkaWFnb25hbCArPSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gU1RFUCAxOiBXZSBleHRlbmQgdGhlIGZ1cnRoZXN0IHJlYWNoaW5nIHBvaW50IGluIHRoZSBwcmVzZW50IGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgLy8gYnkgbG9va2luZyBhdCB0aGUgZGlhZ29uYWxzIGFib3ZlIGFuZCBiZWxvdyBhbmQgcGlja2luZyB0aGUgb25lIHdob3NlIHBvaW50XG4gICAgICAgICAgICAgICAgLy8gaXMgZnVydGhlciBhd2F5IGZyb20gdGhlIHN0YXJ0IHBvaW50IChvcmlnaW5hbEVuZCwgbW9kaWZpZWRFbmQpXG4gICAgICAgICAgICAgICAgaWYgKGRpYWdvbmFsID09PSBkaWFnb25hbFJldmVyc2VTdGFydCB8fCAoZGlhZ29uYWwgPCBkaWFnb25hbFJldmVyc2VFbmQgJiYgcmV2ZXJzZVBvaW50c1tkaWFnb25hbCAtIDFdID49IHJldmVyc2VQb2ludHNbZGlhZ29uYWwgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IHJldmVyc2VQb2ludHNbZGlhZ29uYWwgKyAxXSAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEluZGV4ID0gcmV2ZXJzZVBvaW50c1tkaWFnb25hbCAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2RpZmllZEluZGV4ID0gb3JpZ2luYWxJbmRleCAtIChkaWFnb25hbCAtIGRpYWdvbmFsUmV2ZXJzZUJhc2UpIC0gZGlhZ29uYWxSZXZlcnNlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhlIGN1cnJlbnQgb3JpZ2luYWxJbmRleCBzbyB3ZSBjYW4gdGVzdCBmb3IgZmFsc2Ugb3ZlcmxhcFxuICAgICAgICAgICAgICAgIHRlbXBPcmlnaW5hbEluZGV4ID0gb3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICAvLyBTVEVQIDI6IFdlIGNhbiBjb250aW51ZSB0byBleHRlbmQgdGhlIGZ1cnRoZXN0IHJlYWNoaW5nIHBvaW50IGluIHRoZSBwcmVzZW50IGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgLy8gYXMgbG9uZyBhcyB0aGUgZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAgICAgICAgICAgIHdoaWxlIChvcmlnaW5hbEluZGV4ID4gb3JpZ2luYWxTdGFydCAmJiBtb2RpZmllZEluZGV4ID4gbW9kaWZpZWRTdGFydCAmJiB0aGlzLkVsZW1lbnRzQXJlRXF1YWwob3JpZ2luYWxJbmRleCwgbW9kaWZpZWRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleC0tO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEluZGV4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldmVyc2VQb2ludHNbZGlhZ29uYWxdID0gb3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICAvLyBTVEVQIDQ6IElmIGRlbHRhIGlzIGV2ZW4gKG92ZXJsYXAgZmlyc3QgaGFwcGVucyBvbiByZXZlcnNlIHdoZW4gZGVsdGEgaXMgZXZlbilcbiAgICAgICAgICAgICAgICAvLyBhbmQgZGlhZ29uYWwgaXMgaW4gdGhlIHJhbmdlIG9mIGZvcndhcmQgZGlhZ29uYWxzIGNvbXB1dGVkIGZvciBudW1EaWZmZXJlbmNlc1xuICAgICAgICAgICAgICAgIC8vIHRoZW4gY2hlY2sgZm9yIG92ZXJsYXAuXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhSXNFdmVuICYmIE1hdGguYWJzKGRpYWdvbmFsIC0gZGlhZ29uYWxGb3J3YXJkQmFzZSkgPD0gbnVtRGlmZmVyZW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSW5kZXggPD0gZm9yd2FyZFBvaW50c1tkaWFnb25hbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZE9yaWdpbmFsQXJyWzBdID0gb3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZE1vZGlmaWVkQXJyWzBdID0gbW9kaWZpZWRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wT3JpZ2luYWxJbmRleCA+PSBmb3J3YXJkUG9pbnRzW2RpYWdvbmFsXSAmJiBNYXhEaWZmZXJlbmNlc0hpc3RvcnkgPiAwICYmIG51bURpZmZlcmVuY2VzIDw9IChNYXhEaWZmZXJlbmNlc0hpc3RvcnkgKyAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJJTkdPISBXZSBvdmVybGFwcGVkLCBhbmQgd2UgaGF2ZSB0aGUgZnVsbCB0cmFjZSBpbiBtZW1vcnkhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuV0FMS1RSQUNFKGRpYWdvbmFsRm9yd2FyZEJhc2UsIGRpYWdvbmFsRm9yd2FyZFN0YXJ0LCBkaWFnb25hbEZvcndhcmRFbmQsIGRpYWdvbmFsRm9yd2FyZE9mZnNldCwgZGlhZ29uYWxSZXZlcnNlQmFzZSwgZGlhZ29uYWxSZXZlcnNlU3RhcnQsIGRpYWdvbmFsUmV2ZXJzZUVuZCwgZGlhZ29uYWxSZXZlcnNlT2Zmc2V0LCBmb3J3YXJkUG9pbnRzLCByZXZlcnNlUG9pbnRzLCBvcmlnaW5hbEluZGV4LCBvcmlnaW5hbEVuZCwgbWlkT3JpZ2luYWxBcnIsIG1vZGlmaWVkSW5kZXgsIG1vZGlmaWVkRW5kLCBtaWRNb2RpZmllZEFyciwgZGVsdGFJc0V2ZW4sIHF1aXRFYXJseUFycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFaXRoZXIgZmFsc2Ugb3ZlcmxhcCwgb3Igd2UgZGlkbid0IGhhdmUgZW5vdWdoIG1lbW9yeSBmb3IgdGhlIGZ1bGwgdHJhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBKdXN0IHJldHVybiB0aGUgcmVjdXJzaW9uIHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTYXZlIGN1cnJlbnQgdmVjdG9ycyB0byBoaXN0b3J5IGJlZm9yZSB0aGUgbmV4dCBpdGVyYXRpb25cbiAgICAgICAgICAgIGlmIChudW1EaWZmZXJlbmNlcyA8PSBNYXhEaWZmZXJlbmNlc0hpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBhcmUgYWxsb2NhdGluZyBzcGFjZSBmb3Igb25lIGV4dHJhIGludCwgd2hpY2ggd2UgZmlsbCB3aXRoXG4gICAgICAgICAgICAgICAgLy8gdGhlIGluZGV4IG9mIHRoZSBkaWFnb25hbCBiYXNlIGluZGV4XG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBuZXcgQXJyYXkoZGlhZ29uYWxGb3J3YXJkRW5kIC0gZGlhZ29uYWxGb3J3YXJkU3RhcnQgKyAyKTtcbiAgICAgICAgICAgICAgICB0ZW1wWzBdID0gZGlhZ29uYWxGb3J3YXJkQmFzZSAtIGRpYWdvbmFsRm9yd2FyZFN0YXJ0ICsgMTtcbiAgICAgICAgICAgICAgICBNeUFycmF5LkNvcHkoZm9yd2FyZFBvaW50cywgZGlhZ29uYWxGb3J3YXJkU3RhcnQsIHRlbXAsIDEsIGRpYWdvbmFsRm9yd2FyZEVuZCAtIGRpYWdvbmFsRm9yd2FyZFN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2ZvcndhcmRIaXN0b3J5LnB1c2godGVtcCk7XG4gICAgICAgICAgICAgICAgdGVtcCA9IG5ldyBBcnJheShkaWFnb25hbFJldmVyc2VFbmQgLSBkaWFnb25hbFJldmVyc2VTdGFydCArIDIpO1xuICAgICAgICAgICAgICAgIHRlbXBbMF0gPSBkaWFnb25hbFJldmVyc2VCYXNlIC0gZGlhZ29uYWxSZXZlcnNlU3RhcnQgKyAxO1xuICAgICAgICAgICAgICAgIE15QXJyYXkuQ29weShyZXZlcnNlUG9pbnRzLCBkaWFnb25hbFJldmVyc2VTdGFydCwgdGVtcCwgMSwgZGlhZ29uYWxSZXZlcnNlRW5kIC0gZGlhZ29uYWxSZXZlcnNlU3RhcnQgKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fcmV2ZXJzZUhpc3RvcnkucHVzaCh0ZW1wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBnb3QgaGVyZSwgdGhlbiB3ZSBoYXZlIHRoZSBmdWxsIHRyYWNlIGluIGhpc3RvcnkuIFdlIGp1c3QgaGF2ZSB0byBjb252ZXJ0IGl0IHRvIGEgY2hhbmdlIGxpc3RcbiAgICAgICAgLy8gTk9URTogVGhpcyBwYXJ0IGlzIGEgYml0IG1lc3N5XG4gICAgICAgIHJldHVybiB0aGlzLldBTEtUUkFDRShkaWFnb25hbEZvcndhcmRCYXNlLCBkaWFnb25hbEZvcndhcmRTdGFydCwgZGlhZ29uYWxGb3J3YXJkRW5kLCBkaWFnb25hbEZvcndhcmRPZmZzZXQsIGRpYWdvbmFsUmV2ZXJzZUJhc2UsIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0LCBkaWFnb25hbFJldmVyc2VFbmQsIGRpYWdvbmFsUmV2ZXJzZU9mZnNldCwgZm9yd2FyZFBvaW50cywgcmV2ZXJzZVBvaW50cywgb3JpZ2luYWxJbmRleCwgb3JpZ2luYWxFbmQsIG1pZE9yaWdpbmFsQXJyLCBtb2RpZmllZEluZGV4LCBtb2RpZmllZEVuZCwgbWlkTW9kaWZpZWRBcnIsIGRlbHRhSXNFdmVuLCBxdWl0RWFybHlBcnIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2hpZnRzIHRoZSBnaXZlbiBjaGFuZ2VzIHRvIHByb3ZpZGUgYSBtb3JlIGludHVpdGl2ZSBkaWZmLlxuICAgICAqIFdoaWxlIHRoZSBmaXJzdCBlbGVtZW50IGluIGEgZGlmZiBtYXRjaGVzIHRoZSBmaXJzdCBlbGVtZW50IGFmdGVyIHRoZSBkaWZmLFxuICAgICAqIHdlIHNoaWZ0IHRoZSBkaWZmIGRvd24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyBUaGUgbGlzdCBvZiBjaGFuZ2VzIHRvIHNoaWZ0XG4gICAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgY2hhbmdlc1xuICAgICAqL1xuICAgIExjc0RpZmYucHJvdG90eXBlLlByZXR0aWZ5Q2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIC8vIFNoaWZ0IGFsbCB0aGUgY2hhbmdlcyBkb3duIGZpcnN0XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbaV07XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxTdG9wID0gKGkgPCBjaGFuZ2VzLmxlbmd0aCAtIDEpID8gY2hhbmdlc1tpICsgMV0ub3JpZ2luYWxTdGFydCA6IHRoaXMuT3JpZ2luYWxTZXF1ZW5jZS5nZXRMZW5ndGgoKTtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZFN0b3AgPSAoaSA8IGNoYW5nZXMubGVuZ3RoIC0gMSkgPyBjaGFuZ2VzW2kgKyAxXS5tb2RpZmllZFN0YXJ0IDogdGhpcy5Nb2RpZmllZFNlcXVlbmNlLmdldExlbmd0aCgpO1xuICAgICAgICAgICAgdmFyIGNoZWNrT3JpZ2luYWwgPSBjaGFuZ2Uub3JpZ2luYWxMZW5ndGggPiAwO1xuICAgICAgICAgICAgdmFyIGNoZWNrTW9kaWZpZWQgPSBjaGFuZ2UubW9kaWZpZWRMZW5ndGggPiAwO1xuICAgICAgICAgICAgd2hpbGUgKGNoYW5nZS5vcmlnaW5hbFN0YXJ0ICsgY2hhbmdlLm9yaWdpbmFsTGVuZ3RoIDwgb3JpZ2luYWxTdG9wICYmXG4gICAgICAgICAgICAgICAgY2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBjaGFuZ2UubW9kaWZpZWRMZW5ndGggPCBtb2RpZmllZFN0b3AgJiZcbiAgICAgICAgICAgICAgICAoIWNoZWNrT3JpZ2luYWwgfHwgdGhpcy5PcmlnaW5hbEVsZW1lbnRzQXJlRXF1YWwoY2hhbmdlLm9yaWdpbmFsU3RhcnQsIGNoYW5nZS5vcmlnaW5hbFN0YXJ0ICsgY2hhbmdlLm9yaWdpbmFsTGVuZ3RoKSkgJiZcbiAgICAgICAgICAgICAgICAoIWNoZWNrTW9kaWZpZWQgfHwgdGhpcy5Nb2RpZmllZEVsZW1lbnRzQXJlRXF1YWwoY2hhbmdlLm1vZGlmaWVkU3RhcnQsIGNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgY2hhbmdlLm1vZGlmaWVkTGVuZ3RoKSkpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2Uub3JpZ2luYWxTdGFydCsrO1xuICAgICAgICAgICAgICAgIGNoYW5nZS5tb2RpZmllZFN0YXJ0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWVyZ2VkQ2hhbmdlQXJyID0gW251bGxdO1xuICAgICAgICAgICAgaWYgKGkgPCBjaGFuZ2VzLmxlbmd0aCAtIDEgJiYgdGhpcy5DaGFuZ2VzT3ZlcmxhcChjaGFuZ2VzW2ldLCBjaGFuZ2VzW2kgKyAxXSwgbWVyZ2VkQ2hhbmdlQXJyKSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZXNbaV0gPSBtZXJnZWRDaGFuZ2VBcnJbMF07XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5zcGxpY2UoaSArIDEsIDEpO1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTaGlmdCBjaGFuZ2VzIGJhY2sgdXAgdW50aWwgd2UgaGl0IGVtcHR5IG9yIHdoaXRlc3BhY2Utb25seSBsaW5lc1xuICAgICAgICBmb3IgKHZhciBpID0gY2hhbmdlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbaV07XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxTdG9wID0gMDtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZFN0b3AgPSAwO1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZDaGFuZ2UgPSBjaGFuZ2VzW2kgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkNoYW5nZS5vcmlnaW5hbExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdG9wID0gcHJldkNoYW5nZS5vcmlnaW5hbFN0YXJ0ICsgcHJldkNoYW5nZS5vcmlnaW5hbExlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDaGFuZ2UubW9kaWZpZWRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RvcCA9IHByZXZDaGFuZ2UubW9kaWZpZWRTdGFydCArIHByZXZDaGFuZ2UubW9kaWZpZWRMZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoZWNrT3JpZ2luYWwgPSBjaGFuZ2Uub3JpZ2luYWxMZW5ndGggPiAwO1xuICAgICAgICAgICAgdmFyIGNoZWNrTW9kaWZpZWQgPSBjaGFuZ2UubW9kaWZpZWRMZW5ndGggPiAwO1xuICAgICAgICAgICAgdmFyIGJlc3REZWx0YSA9IDA7XG4gICAgICAgICAgICB2YXIgYmVzdFNjb3JlID0gdGhpcy5fYm91bmRhcnlTY29yZShjaGFuZ2Uub3JpZ2luYWxTdGFydCwgY2hhbmdlLm9yaWdpbmFsTGVuZ3RoLCBjaGFuZ2UubW9kaWZpZWRTdGFydCwgY2hhbmdlLm1vZGlmaWVkTGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGRlbHRhID0gMTs7IGRlbHRhKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxTdGFydCA9IGNoYW5nZS5vcmlnaW5hbFN0YXJ0IC0gZGVsdGE7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGlmaWVkU3RhcnQgPSBjaGFuZ2UubW9kaWZpZWRTdGFydCAtIGRlbHRhO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFN0YXJ0IDwgb3JpZ2luYWxTdG9wIHx8IG1vZGlmaWVkU3RhcnQgPCBtb2RpZmllZFN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGVja09yaWdpbmFsICYmICF0aGlzLk9yaWdpbmFsRWxlbWVudHNBcmVFcXVhbChvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbFN0YXJ0ICsgY2hhbmdlLm9yaWdpbmFsTGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrTW9kaWZpZWQgJiYgIXRoaXMuTW9kaWZpZWRFbGVtZW50c0FyZUVxdWFsKG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkU3RhcnQgKyBjaGFuZ2UubW9kaWZpZWRMZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSB0aGlzLl9ib3VuZGFyeVNjb3JlKG9yaWdpbmFsU3RhcnQsIGNoYW5nZS5vcmlnaW5hbExlbmd0aCwgbW9kaWZpZWRTdGFydCwgY2hhbmdlLm1vZGlmaWVkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYmVzdFNjb3JlID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIGJlc3REZWx0YSA9IGRlbHRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoYW5nZS5vcmlnaW5hbFN0YXJ0IC09IGJlc3REZWx0YTtcbiAgICAgICAgICAgIGNoYW5nZS5tb2RpZmllZFN0YXJ0IC09IGJlc3REZWx0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLl9PcmlnaW5hbElzQm91bmRhcnkgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDw9IDAgfHwgaW5kZXggPj0gdGhpcy5PcmlnaW5hbFNlcXVlbmNlLmdldExlbmd0aCgpIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLk9yaWdpbmFsU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgoaW5kZXgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyAmJiAvXlxccyokLy50ZXN0KGVsZW1lbnQpKTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLl9PcmlnaW5hbFJlZ2lvbklzQm91bmRhcnkgPSBmdW5jdGlvbiAob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxMZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMuX09yaWdpbmFsSXNCb3VuZGFyeShvcmlnaW5hbFN0YXJ0KSB8fCB0aGlzLl9PcmlnaW5hbElzQm91bmRhcnkob3JpZ2luYWxTdGFydCAtIDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JpZ2luYWxMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFbmQgPSBvcmlnaW5hbFN0YXJ0ICsgb3JpZ2luYWxMZW5ndGg7XG4gICAgICAgICAgICBpZiAodGhpcy5fT3JpZ2luYWxJc0JvdW5kYXJ5KG9yaWdpbmFsRW5kIC0gMSkgfHwgdGhpcy5fT3JpZ2luYWxJc0JvdW5kYXJ5KG9yaWdpbmFsRW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLl9Nb2RpZmllZElzQm91bmRhcnkgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDw9IDAgfHwgaW5kZXggPj0gdGhpcy5Nb2RpZmllZFNlcXVlbmNlLmdldExlbmd0aCgpIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLk1vZGlmaWVkU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgoaW5kZXgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyAmJiAvXlxccyokLy50ZXN0KGVsZW1lbnQpKTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLl9Nb2RpZmllZFJlZ2lvbklzQm91bmRhcnkgPSBmdW5jdGlvbiAobW9kaWZpZWRTdGFydCwgbW9kaWZpZWRMZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMuX01vZGlmaWVkSXNCb3VuZGFyeShtb2RpZmllZFN0YXJ0KSB8fCB0aGlzLl9Nb2RpZmllZElzQm91bmRhcnkobW9kaWZpZWRTdGFydCAtIDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9kaWZpZWRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRFbmQgPSBtb2RpZmllZFN0YXJ0ICsgbW9kaWZpZWRMZW5ndGg7XG4gICAgICAgICAgICBpZiAodGhpcy5fTW9kaWZpZWRJc0JvdW5kYXJ5KG1vZGlmaWVkRW5kIC0gMSkgfHwgdGhpcy5fTW9kaWZpZWRJc0JvdW5kYXJ5KG1vZGlmaWVkRW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLl9ib3VuZGFyeVNjb3JlID0gZnVuY3Rpb24gKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsTGVuZ3RoLCBtb2RpZmllZFN0YXJ0LCBtb2RpZmllZExlbmd0aCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxTY29yZSA9ICh0aGlzLl9PcmlnaW5hbFJlZ2lvbklzQm91bmRhcnkob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxMZW5ndGgpID8gMSA6IDApO1xuICAgICAgICB2YXIgbW9kaWZpZWRTY29yZSA9ICh0aGlzLl9Nb2RpZmllZFJlZ2lvbklzQm91bmRhcnkobW9kaWZpZWRTdGFydCwgbW9kaWZpZWRMZW5ndGgpID8gMSA6IDApO1xuICAgICAgICByZXR1cm4gKG9yaWdpbmFsU2NvcmUgKyBtb2RpZmllZFNjb3JlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbmNhdGVuYXRlcyB0aGUgdHdvIGlucHV0IERpZmZDaGFuZ2UgbGlzdHMgYW5kIHJldHVybnMgdGhlIHJlc3VsdGluZ1xuICAgICAqIGxpc3QuXG4gICAgICogQHBhcmFtIFRoZSBsZWZ0IGNoYW5nZXNcbiAgICAgKiBAcGFyYW0gVGhlIHJpZ2h0IGNoYW5nZXNcbiAgICAgKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIGxpc3RcbiAgICAgKi9cbiAgICBMY3NEaWZmLnByb3RvdHlwZS5Db25jYXRlbmF0ZUNoYW5nZXMgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgdmFyIG1lcmdlZENoYW5nZUFyciA9IFtdO1xuICAgICAgICBpZiAobGVmdC5sZW5ndGggPT09IDAgfHwgcmlnaHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gKHJpZ2h0Lmxlbmd0aCA+IDApID8gcmlnaHQgOiBsZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuQ2hhbmdlc092ZXJsYXAobGVmdFtsZWZ0Lmxlbmd0aCAtIDFdLCByaWdodFswXSwgbWVyZ2VkQ2hhbmdlQXJyKSkge1xuICAgICAgICAgICAgLy8gU2luY2Ugd2UgYnJlYWsgdGhlIHByb2JsZW0gZG93biByZWN1cnNpdmVseSwgaXQgaXMgcG9zc2libGUgdGhhdCB3ZVxuICAgICAgICAgICAgLy8gbWlnaHQgcmVjdXJzZSBpbiB0aGUgbWlkZGxlIG9mIGEgY2hhbmdlIHRoZXJlYnkgc3BsaXR0aW5nIGl0IGludG9cbiAgICAgICAgICAgIC8vIHR3byBjaGFuZ2VzLiBIZXJlIGluIHRoZSBjb21iaW5pbmcgc3RhZ2UsIHdlIGRldGVjdCBhbmQgZnVzZSB0aG9zZVxuICAgICAgICAgICAgLy8gY2hhbmdlcyBiYWNrIHRvZ2V0aGVyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGxlZnQubGVuZ3RoICsgcmlnaHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBNeUFycmF5LkNvcHkobGVmdCwgMCwgcmVzdWx0LCAwLCBsZWZ0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgcmVzdWx0W2xlZnQubGVuZ3RoIC0gMV0gPSBtZXJnZWRDaGFuZ2VBcnJbMF07XG4gICAgICAgICAgICBNeUFycmF5LkNvcHkocmlnaHQsIDEsIHJlc3VsdCwgbGVmdC5sZW5ndGgsIHJpZ2h0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobGVmdC5sZW5ndGggKyByaWdodC5sZW5ndGgpO1xuICAgICAgICAgICAgTXlBcnJheS5Db3B5KGxlZnQsIDAsIHJlc3VsdCwgMCwgbGVmdC5sZW5ndGgpO1xuICAgICAgICAgICAgTXlBcnJheS5Db3B5KHJpZ2h0LCAwLCByZXN1bHQsIGxlZnQubGVuZ3RoLCByaWdodC5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gY2hhbmdlcyBvdmVybGFwIGFuZCBjYW4gYmUgbWVyZ2VkIGludG8gYSBzaW5nbGVcbiAgICAgKiBjaGFuZ2VcbiAgICAgKiBAcGFyYW0gbGVmdCBUaGUgbGVmdCBjaGFuZ2VcbiAgICAgKiBAcGFyYW0gcmlnaHQgVGhlIHJpZ2h0IGNoYW5nZVxuICAgICAqIEBwYXJhbSBtZXJnZWRDaGFuZ2UgVGhlIG1lcmdlZCBjaGFuZ2UgaWYgdGhlIHR3byBvdmVybGFwLCBudWxsIG90aGVyd2lzZVxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHR3byBjaGFuZ2VzIG92ZXJsYXBcbiAgICAgKi9cbiAgICBMY3NEaWZmLnByb3RvdHlwZS5DaGFuZ2VzT3ZlcmxhcCA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCwgbWVyZ2VkQ2hhbmdlQXJyKSB7XG4gICAgICAgIERlYnVnLkFzc2VydChsZWZ0Lm9yaWdpbmFsU3RhcnQgPD0gcmlnaHQub3JpZ2luYWxTdGFydCwgJ0xlZnQgY2hhbmdlIGlzIG5vdCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gcmlnaHQgY2hhbmdlJyk7XG4gICAgICAgIERlYnVnLkFzc2VydChsZWZ0Lm1vZGlmaWVkU3RhcnQgPD0gcmlnaHQubW9kaWZpZWRTdGFydCwgJ0xlZnQgY2hhbmdlIGlzIG5vdCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gcmlnaHQgY2hhbmdlJyk7XG4gICAgICAgIGlmIChsZWZ0Lm9yaWdpbmFsU3RhcnQgKyBsZWZ0Lm9yaWdpbmFsTGVuZ3RoID49IHJpZ2h0Lm9yaWdpbmFsU3RhcnQgfHwgbGVmdC5tb2RpZmllZFN0YXJ0ICsgbGVmdC5tb2RpZmllZExlbmd0aCA+PSByaWdodC5tb2RpZmllZFN0YXJ0KSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxTdGFydCA9IGxlZnQub3JpZ2luYWxTdGFydDtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbExlbmd0aCA9IGxlZnQub3JpZ2luYWxMZW5ndGg7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRTdGFydCA9IGxlZnQubW9kaWZpZWRTdGFydDtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZExlbmd0aCA9IGxlZnQubW9kaWZpZWRMZW5ndGg7XG4gICAgICAgICAgICBpZiAobGVmdC5vcmlnaW5hbFN0YXJ0ICsgbGVmdC5vcmlnaW5hbExlbmd0aCA+PSByaWdodC5vcmlnaW5hbFN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxMZW5ndGggPSByaWdodC5vcmlnaW5hbFN0YXJ0ICsgcmlnaHQub3JpZ2luYWxMZW5ndGggLSBsZWZ0Lm9yaWdpbmFsU3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVmdC5tb2RpZmllZFN0YXJ0ICsgbGVmdC5tb2RpZmllZExlbmd0aCA+PSByaWdodC5tb2RpZmllZFN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZWRMZW5ndGggPSByaWdodC5tb2RpZmllZFN0YXJ0ICsgcmlnaHQubW9kaWZpZWRMZW5ndGggLSBsZWZ0Lm1vZGlmaWVkU3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXJnZWRDaGFuZ2VBcnJbMF0gPSBuZXcgRGlmZkNoYW5nZShvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbExlbmd0aCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRMZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtZXJnZWRDaGFuZ2VBcnJbMF0gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIHVzZWQgdG8gY2xpcCBhIGRpYWdvbmFsIGluZGV4IHRvIHRoZSByYW5nZSBvZiB2YWxpZFxuICAgICAqIGRpYWdvbmFscy4gVGhpcyBhbHNvIGRlY2lkZXMgd2hldGhlciBvciBub3QgdGhlIGRpYWdvbmFsIGluZGV4LFxuICAgICAqIGlmIGl0IGV4Y2VlZHMgdGhlIGJvdW5kYXJ5LCBzaG91bGQgYmUgY2xpcHBlZCB0byB0aGUgYm91bmRhcnkgb3IgY2xpcHBlZFxuICAgICAqIG9uZSBpbnNpZGUgdGhlIGJvdW5kYXJ5IGRlcGVuZGluZyBvbiB0aGUgRXZlbi9PZGQgc3RhdHVzIG9mIHRoZSBib3VuZGFyeVxuICAgICAqIGFuZCBudW1EaWZmZXJlbmNlcy5cbiAgICAgKiBAcGFyYW0gZGlhZ29uYWwgVGhlIGluZGV4IG9mIHRoZSBkaWFnb25hbCB0byBjbGlwLlxuICAgICAqIEBwYXJhbSBudW1EaWZmZXJlbmNlcyBUaGUgY3VycmVudCBudW1iZXIgb2YgZGlmZmVyZW5jZXMgYmVpbmcgaXRlcmF0ZWQgdXBvbi5cbiAgICAgKiBAcGFyYW0gZGlhZ29uYWxCYXNlSW5kZXggVGhlIGJhc2UgcmVmZXJlbmNlIGRpYWdvbmFsLlxuICAgICAqIEBwYXJhbSBudW1EaWFnb25hbHMgVGhlIHRvdGFsIG51bWJlciBvZiBkaWFnb25hbHMuXG4gICAgICogQHJldHVybnMgVGhlIGNsaXBwZWQgZGlhZ29uYWwgaW5kZXguXG4gICAgICovXG4gICAgTGNzRGlmZi5wcm90b3R5cGUuQ2xpcERpYWdvbmFsQm91bmQgPSBmdW5jdGlvbiAoZGlhZ29uYWwsIG51bURpZmZlcmVuY2VzLCBkaWFnb25hbEJhc2VJbmRleCwgbnVtRGlhZ29uYWxzKSB7XG4gICAgICAgIGlmIChkaWFnb25hbCA+PSAwICYmIGRpYWdvbmFsIDwgbnVtRGlhZ29uYWxzKSB7XG4gICAgICAgICAgICAvLyBOb3RoaW5nIHRvIGNsaXAsIGl0cyBpbiByYW5nZVxuICAgICAgICAgICAgcmV0dXJuIGRpYWdvbmFsO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpYWdvbmFsc0JlbG93OiBUaGUgbnVtYmVyIG9mIGRpYWdvbmFscyBiZWxvdyB0aGUgcmVmZXJlbmNlIGRpYWdvbmFsXG4gICAgICAgIC8vIGRpYWdvbmFsc0Fib3ZlOiBUaGUgbnVtYmVyIG9mIGRpYWdvbmFscyBhYm92ZSB0aGUgcmVmZXJlbmNlIGRpYWdvbmFsXG4gICAgICAgIHZhciBkaWFnb25hbHNCZWxvdyA9IGRpYWdvbmFsQmFzZUluZGV4O1xuICAgICAgICB2YXIgZGlhZ29uYWxzQWJvdmUgPSBudW1EaWFnb25hbHMgLSBkaWFnb25hbEJhc2VJbmRleCAtIDE7XG4gICAgICAgIHZhciBkaWZmRXZlbiA9IChudW1EaWZmZXJlbmNlcyAlIDIgPT09IDApO1xuICAgICAgICBpZiAoZGlhZ29uYWwgPCAwKSB7XG4gICAgICAgICAgICB2YXIgbG93ZXJCb3VuZEV2ZW4gPSAoZGlhZ29uYWxzQmVsb3cgJSAyID09PSAwKTtcbiAgICAgICAgICAgIHJldHVybiAoZGlmZkV2ZW4gPT09IGxvd2VyQm91bmRFdmVuKSA/IDAgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHVwcGVyQm91bmRFdmVuID0gKGRpYWdvbmFsc0Fib3ZlICUgMiA9PT0gMCk7XG4gICAgICAgICAgICByZXR1cm4gKGRpZmZFdmVuID09PSB1cHBlckJvdW5kRXZlbikgPyBudW1EaWFnb25hbHMgLSAxIDogbnVtRGlhZ29uYWxzIC0gMjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExjc0RpZmY7XG59KCkpO1xuZXhwb3J0IHsgTGNzRGlmZiB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIFJlcHJlc2VudHMgaW5mb3JtYXRpb24gYWJvdXQgYSBzcGVjaWZpYyBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIHNlcXVlbmNlcy5cbiAqL1xudmFyIERpZmZDaGFuZ2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBEaWZmQ2hhbmdlIHdpdGggdGhlIGdpdmVuIHNlcXVlbmNlIGluZm9ybWF0aW9uXG4gICAgICogYW5kIGNvbnRlbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGlmZkNoYW5nZShvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbExlbmd0aCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRMZW5ndGgpIHtcbiAgICAgICAgLy9EZWJ1Zy5Bc3NlcnQob3JpZ2luYWxMZW5ndGggPiAwIHx8IG1vZGlmaWVkTGVuZ3RoID4gMCwgXCJvcmlnaW5hbExlbmd0aCBhbmQgbW9kaWZpZWRMZW5ndGggY2Fubm90IGJvdGggYmUgPD0gMFwiKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFN0YXJ0ID0gb3JpZ2luYWxTdGFydDtcbiAgICAgICAgdGhpcy5vcmlnaW5hbExlbmd0aCA9IG9yaWdpbmFsTGVuZ3RoO1xuICAgICAgICB0aGlzLm1vZGlmaWVkU3RhcnQgPSBtb2RpZmllZFN0YXJ0O1xuICAgICAgICB0aGlzLm1vZGlmaWVkTGVuZ3RoID0gbW9kaWZpZWRMZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBlbmQgcG9pbnQgKGV4Y2x1c2l2ZSkgb2YgdGhlIGNoYW5nZSBpbiB0aGUgb3JpZ2luYWwgc2VxdWVuY2UuXG4gICAgICovXG4gICAgRGlmZkNoYW5nZS5wcm90b3R5cGUuZ2V0T3JpZ2luYWxFbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhcnQgKyB0aGlzLm9yaWdpbmFsTGVuZ3RoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGVuZCBwb2ludCAoZXhjbHVzaXZlKSBvZiB0aGUgY2hhbmdlIGluIHRoZSBtb2RpZmllZCBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBEaWZmQ2hhbmdlLnByb3RvdHlwZS5nZXRNb2RpZmllZEVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kaWZpZWRTdGFydCArIHRoaXMubW9kaWZpZWRMZW5ndGg7XG4gICAgfTtcbiAgICByZXR1cm4gRGlmZkNoYW5nZTtcbn0oKSk7XG5leHBvcnQgeyBEaWZmQ2hhbmdlIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vIEF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3kgb24gRXZlbnRFbWl0dGVyIGJ5IGltcGxlbWVudGluZyBhIHN1YnNldCBvZiB0aGUgaW50ZXJmYWNlLlxudmFyIEVycm9ySGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFcnJvckhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMudW5leHBlY3RlZEVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZS5tZXNzYWdlICsgJ1xcblxcbicgKyBlLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXIoZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXJyb3JIYW5kbGVyLnByb3RvdHlwZS5vblVuZXhwZWN0ZWRFcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMudW5leHBlY3RlZEVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgdGhpcy5lbWl0KGUpO1xuICAgIH07XG4gICAgLy8gRm9yIGV4dGVybmFsIGVycm9ycywgd2UgZG9uJ3Qgd2FudCB0aGUgbGlzdGVuZXJzIHRvIGJlIGNhbGxlZFxuICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUub25VbmV4cGVjdGVkRXh0ZXJuYWxFcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMudW5leHBlY3RlZEVycm9ySGFuZGxlcihlKTtcbiAgICB9O1xuICAgIHJldHVybiBFcnJvckhhbmRsZXI7XG59KCkpO1xuZXhwb3J0IHsgRXJyb3JIYW5kbGVyIH07XG5leHBvcnQgdmFyIGVycm9ySGFuZGxlciA9IG5ldyBFcnJvckhhbmRsZXIoKTtcbmV4cG9ydCBmdW5jdGlvbiBvblVuZXhwZWN0ZWRFcnJvcihlKSB7XG4gICAgLy8gaWdub3JlIGVycm9ycyBmcm9tIGNhbmNlbGxlZCBwcm9taXNlc1xuICAgIGlmICghaXNQcm9taXNlQ2FuY2VsZWRFcnJvcihlKSkge1xuICAgICAgICBlcnJvckhhbmRsZXIub25VbmV4cGVjdGVkRXJyb3IoZSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gb25VbmV4cGVjdGVkRXh0ZXJuYWxFcnJvcihlKSB7XG4gICAgLy8gaWdub3JlIGVycm9ycyBmcm9tIGNhbmNlbGxlZCBwcm9taXNlc1xuICAgIGlmICghaXNQcm9taXNlQ2FuY2VsZWRFcnJvcihlKSkge1xuICAgICAgICBlcnJvckhhbmRsZXIub25VbmV4cGVjdGVkRXh0ZXJuYWxFcnJvcihlKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1FcnJvckZvclNlcmlhbGl6YXRpb24oZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB2YXIgbmFtZV8xID0gZXJyb3IubmFtZSwgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrdHJhY2UgfHwgZXJyb3Iuc3RhY2s7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkaXNFcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWVfMSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICBzdGFjazogc3RhY2tcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGFzIGlzXG4gICAgcmV0dXJuIGVycm9yO1xufVxudmFyIGNhbmNlbGVkTmFtZSA9ICdDYW5jZWxlZCc7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gZXJyb3IgaXMgYSBwcm9taXNlIGluIGNhbmNlbGVkIHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2VDYW5jZWxlZEVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubmFtZSA9PT0gY2FuY2VsZWROYW1lICYmIGVycm9yLm1lc3NhZ2UgPT09IGNhbmNlbGVkTmFtZTtcbn1cbi8qKlxuICogUmV0dXJucyBhbiBlcnJvciB0aGF0IHNpZ25hbHMgY2FuY2VsbGF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsZWQoKSB7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGNhbmNlbGVkTmFtZSk7XG4gICAgZXJyb3IubmFtZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgcmV0dXJuIGVycm9yO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlsbGVnYWxBcmd1bWVudChuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIklsbGVnYWwgYXJndW1lbnQ6IFwiICsgbmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdJbGxlZ2FsIGFyZ3VtZW50Jyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlsbGVnYWxTdGF0ZShuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIklsbGVnYWwgc3RhdGU6IFwiICsgbmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdJbGxlZ2FsIHN0YXRlJyk7XG4gICAgfVxufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBvblVuZXhwZWN0ZWRFcnJvciB9IGZyb20gJy4vZXJyb3JzLmpzJztcbmltcG9ydCB7IG9uY2UgYXMgb25jZUZuIH0gZnJvbSAnLi9mdW5jdGlvbmFsLmpzJztcbmltcG9ydCB7IGNvbWJpbmVkRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSwgdG9EaXNwb3NhYmxlIH0gZnJvbSAnLi9saWZlY3ljbGUuanMnO1xuaW1wb3J0IHsgTGlua2VkTGlzdCB9IGZyb20gJy4vbGlua2VkTGlzdC5qcyc7XG5leHBvcnQgdmFyIEV2ZW50O1xuKGZ1bmN0aW9uIChFdmVudCkge1xuICAgIHZhciBfZGlzcG9zYWJsZSA9IHsgZGlzcG9zZTogZnVuY3Rpb24gKCkgeyB9IH07XG4gICAgRXZlbnQuTm9uZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9kaXNwb3NhYmxlOyB9O1xuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIGV2ZW50LCByZXR1cm5zIGFub3RoZXIgZXZlbnQgd2hpY2ggb25seSBmaXJlcyBvbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uY2UoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpc0FyZ3MgPT09IHZvaWQgMCkgeyB0aGlzQXJncyA9IG51bGw7IH1cbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhpcywgaW4gY2FzZSB0aGUgZXZlbnQgZmlyZXMgZHVyaW5nIHRoZSBsaXN0ZW5lciBjYWxsXG4gICAgICAgICAgICB2YXIgZGlkRmlyZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdCA9IGV2ZW50KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZEZpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZEZpcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzQXJncywgZSk7XG4gICAgICAgICAgICB9LCBudWxsLCBkaXNwb3NhYmxlcyk7XG4gICAgICAgICAgICBpZiAoZGlkRmlyZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBFdmVudC5vbmNlID0gb25jZTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBldmVudCBhbmQgYSBgbWFwYCBmdW5jdGlvbiwgcmV0dXJucyBhbm90aGVyIGV2ZW50IHdoaWNoIG1hcHMgZWFjaCBlbGVtZW50XG4gICAgICogdGhyb3VnaHQgdGhlIG1hcHBpbmcgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwKGV2ZW50LCBtYXApIHtcbiAgICAgICAgcmV0dXJuIHNuYXBzaG90KGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpc0FyZ3MgPT09IHZvaWQgMCkgeyB0aGlzQXJncyA9IG51bGw7IH1cbiAgICAgICAgICAgIHJldHVybiBldmVudChmdW5jdGlvbiAoaSkgeyByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzQXJncywgbWFwKGkpKTsgfSwgbnVsbCwgZGlzcG9zYWJsZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRXZlbnQubWFwID0gbWFwO1xuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIGV2ZW50IGFuZCBhbiBgZWFjaGAgZnVuY3Rpb24sIHJldHVybnMgYW5vdGhlciBpZGVudGljYWwgZXZlbnQgYW5kIGNhbGxzXG4gICAgICogdGhlIGBlYWNoYCBmdW5jdGlvbiBwZXIgZWFjaCBlbGVtZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZvckVhY2goZXZlbnQsIGVhY2gpIHtcbiAgICAgICAgcmV0dXJuIHNuYXBzaG90KGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpc0FyZ3MgPT09IHZvaWQgMCkgeyB0aGlzQXJncyA9IG51bGw7IH1cbiAgICAgICAgICAgIHJldHVybiBldmVudChmdW5jdGlvbiAoaSkgeyBlYWNoKGkpOyBsaXN0ZW5lci5jYWxsKHRoaXNBcmdzLCBpKTsgfSwgbnVsbCwgZGlzcG9zYWJsZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRXZlbnQuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gZmlsdGVyKGV2ZW50LCBmaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHNuYXBzaG90KGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpc0FyZ3MgPT09IHZvaWQgMCkgeyB0aGlzQXJncyA9IG51bGw7IH1cbiAgICAgICAgICAgIHJldHVybiBldmVudChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZmlsdGVyKGUpICYmIGxpc3RlbmVyLmNhbGwodGhpc0FyZ3MsIGUpOyB9LCBudWxsLCBkaXNwb3NhYmxlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFdmVudC5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gZXZlbnQsIHJldHVybnMgdGhlIHNhbWUgZXZlbnQgYnV0IHR5cGVkIGFzIGBFdmVudDx2b2lkPmAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2lnbmFsKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gICAgRXZlbnQuc2lnbmFsID0gc2lnbmFsO1xuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgY29sbGVjdGlvbiBvZiBldmVudHMsIHJldHVybnMgYSBzaW5nbGUgZXZlbnQgd2hpY2ggZW1pdHNcbiAgICAgKiB3aGVuZXZlciBhbnkgb2YgdGhlIHByb3ZpZGVkIGV2ZW50cyBlbWl0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFueSgpIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgZXZlbnRzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpc0FyZ3MgPT09IHZvaWQgMCkgeyB0aGlzQXJncyA9IG51bGw7IH1cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lZERpc3Bvc2FibGUoZXZlbnRzLm1hcChmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIGV2ZW50KGZ1bmN0aW9uIChlKSB7IHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXNBcmdzLCBlKTsgfSwgbnVsbCwgZGlzcG9zYWJsZXMpOyB9KSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIEV2ZW50LmFueSA9IGFueTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBldmVudCBhbmQgYSBgbWVyZ2VgIGZ1bmN0aW9uLCByZXR1cm5zIGFub3RoZXIgZXZlbnQgd2hpY2ggbWFwcyBlYWNoIGVsZW1lbnRcbiAgICAgKiBhbmQgdGhlIGN1bW11bGF0aXZlIHJlc3VsdCB0aHJvdWdodCB0aGUgYG1lcmdlYCBmdW5jdGlvbi4gU2ltaWxhciB0byBgbWFwYCwgYnV0IHdpdGggbWVtb3J5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZHVjZShldmVudCwgbWVyZ2UsIGluaXRpYWwpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IGluaXRpYWw7XG4gICAgICAgIHJldHVybiBtYXAoZXZlbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBtZXJnZShvdXRwdXQsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEV2ZW50LnJlZHVjZSA9IHJlZHVjZTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIGNoYWluIG9mIGV2ZW50IHByb2Nlc3NpbmcgZnVuY3Rpb25zIChmaWx0ZXIsIG1hcCwgZXRjKSwgZWFjaFxuICAgICAqIGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCBwZXIgZXZlbnQgJiBwZXIgbGlzdGVuZXIuIFNuYXBzaG90dGluZyBhbiBldmVudFxuICAgICAqIGNoYWluIGFsbG93cyBlYWNoIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQganVzdCBvbmNlIHBlciBldmVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzbmFwc2hvdChldmVudCkge1xuICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgIHZhciBlbWl0dGVyID0gbmV3IEVtaXR0ZXIoe1xuICAgICAgICAgICAgb25GaXJzdExpc3RlbmVyQWRkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBldmVudChlbWl0dGVyLmZpcmUsIGVtaXR0ZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTGFzdExpc3RlbmVyUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIEV2ZW50LnNuYXBzaG90ID0gc25hcHNob3Q7XG4gICAgZnVuY3Rpb24gZGVib3VuY2UoZXZlbnQsIG1lcmdlLCBkZWxheSwgbGVhZGluZywgbGVha1dhcm5pbmdUaHJlc2hvbGQpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAxMDA7IH1cbiAgICAgICAgaWYgKGxlYWRpbmcgPT09IHZvaWQgMCkgeyBsZWFkaW5nID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgdmFyIG91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGhhbmRsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIG51bURlYm91bmNlZENhbGxzID0gMDtcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSBuZXcgRW1pdHRlcih7XG4gICAgICAgICAgICBsZWFrV2FybmluZ1RocmVzaG9sZDogbGVha1dhcm5pbmdUaHJlc2hvbGQsXG4gICAgICAgICAgICBvbkZpcnN0TGlzdGVuZXJBZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBldmVudChmdW5jdGlvbiAoY3VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bURlYm91bmNlZENhbGxzKys7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1lcmdlKG91dHB1dCwgY3VyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlYWRpbmcgJiYgIWhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5maXJlKG91dHB1dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9vdXRwdXQgPSBvdXRwdXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlYWRpbmcgfHwgbnVtRGVib3VuY2VkQ2FsbHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5maXJlKF9vdXRwdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtRGVib3VuY2VkQ2FsbHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25MYXN0TGlzdGVuZXJSZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIEV2ZW50LmRlYm91bmNlID0gZGVib3VuY2U7XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gZXZlbnQsIGl0IHJldHVybnMgYW5vdGhlciBldmVudCB3aGljaCBmaXJlcyBvbmx5IG9uY2UgYW5kIGFzIHNvb24gYXNcbiAgICAgKiB0aGUgaW5wdXQgZXZlbnQgZW1pdHMuIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgb2YgbWlsbGlzIGl0IHRvb2sgZm9yIHRoZVxuICAgICAqIGV2ZW50IHRvIGZpcmUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RvcHdhdGNoKGV2ZW50KSB7XG4gICAgICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gbWFwKG9uY2UoZXZlbnQpLCBmdW5jdGlvbiAoXykgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydDsgfSk7XG4gICAgfVxuICAgIEV2ZW50LnN0b3B3YXRjaCA9IHN0b3B3YXRjaDtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBldmVudCwgaXQgcmV0dXJucyBhbm90aGVyIGV2ZW50IHdoaWNoIGZpcmVzIG9ubHkgd2hlbiB0aGUgZXZlbnRcbiAgICAgKiBlbGVtZW50IGNoYW5nZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGF0Y2goZXZlbnQpIHtcbiAgICAgICAgdmFyIGZpcnN0Q2FsbCA9IHRydWU7XG4gICAgICAgIHZhciBjYWNoZTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihldmVudCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgc2hvdWxkRW1pdCA9IGZpcnN0Q2FsbCB8fCB2YWx1ZSAhPT0gY2FjaGU7XG4gICAgICAgICAgICBmaXJzdENhbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhY2hlID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2hvdWxkRW1pdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEV2ZW50LmxhdGNoID0gbGF0Y2g7XG4gICAgLyoqXG4gICAgICogQnVmZmVycyB0aGUgcHJvdmlkZWQgZXZlbnQgdW50aWwgYSBmaXJzdCBsaXN0ZW5lciBjb21lc1xuICAgICAqIGFsb25nLCBhdCB3aGljaCBwb2ludCBmaXJlIGFsbCB0aGUgZXZlbnRzIGF0IG9uY2UgYW5kXG4gICAgICogcGlwZSB0aGUgZXZlbnQgZnJvbSB0aGVuIG9uLlxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRW1pdHRlcjxudW1iZXI+KCk7XG4gICAgICogY29uc3QgZXZlbnQgPSBlbWl0dGVyLmV2ZW50O1xuICAgICAqIGNvbnN0IGJ1ZmZlcmVkRXZlbnQgPSBidWZmZXIoZXZlbnQpO1xuICAgICAqXG4gICAgICogZW1pdHRlci5maXJlKDEpO1xuICAgICAqIGVtaXR0ZXIuZmlyZSgyKTtcbiAgICAgKiBlbWl0dGVyLmZpcmUoMyk7XG4gICAgICogLy8gbm90aGluZy4uLlxuICAgICAqXG4gICAgICogY29uc3QgbGlzdGVuZXIgPSBidWZmZXJlZEV2ZW50KG51bSA9PiBjb25zb2xlLmxvZyhudW0pKTtcbiAgICAgKiAvLyAxLCAyLCAzXG4gICAgICpcbiAgICAgKiBlbWl0dGVyLmZpcmUoNCk7XG4gICAgICogLy8gNFxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJ1ZmZlcihldmVudCwgbmV4dFRpY2ssIF9idWZmZXIpIHtcbiAgICAgICAgaWYgKG5leHRUaWNrID09PSB2b2lkIDApIHsgbmV4dFRpY2sgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoX2J1ZmZlciA9PT0gdm9pZCAwKSB7IF9idWZmZXIgPSBbXTsgfVxuICAgICAgICB2YXIgYnVmZmVyID0gX2J1ZmZlci5zbGljZSgpO1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSBldmVudChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5maXJlKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlbWl0dGVyLmZpcmUoZSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSBuZXcgRW1pdHRlcih7XG4gICAgICAgICAgICBvbkZpcnN0TGlzdGVuZXJBZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gZXZlbnQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGVtaXR0ZXIuZmlyZShlKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmlyc3RMaXN0ZW5lckRpZEFkZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRUaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZsdXNoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25MYXN0TGlzdGVuZXJSZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZW1pdHRlci5ldmVudDtcbiAgICB9XG4gICAgRXZlbnQuYnVmZmVyID0gYnVmZmVyO1xuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gYGJ1ZmZlcmAgYnV0IGl0IGJ1ZmZlcnMgaW5kZWZpbml0ZWx5IGFuZCByZXBlYXRzXG4gICAgICogdGhlIGJ1ZmZlcmVkIGV2ZW50cyB0byBldmVyeSBuZXcgbGlzdGVuZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZWNobyhldmVudCwgbmV4dFRpY2ssIGJ1ZmZlcikge1xuICAgICAgICBpZiAobmV4dFRpY2sgPT09IHZvaWQgMCkgeyBuZXh0VGljayA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChidWZmZXIgPT09IHZvaWQgMCkgeyBidWZmZXIgPSBbXTsgfVxuICAgICAgICBidWZmZXIgPSBidWZmZXIuc2xpY2UoKTtcbiAgICAgICAgZXZlbnQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGUpO1xuICAgICAgICAgICAgZW1pdHRlci5maXJlKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKGxpc3RlbmVyLCB0aGlzQXJncykgeyByZXR1cm4gYnVmZmVyLmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpc0FyZ3MsIGUpOyB9KTsgfTtcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSBuZXcgRW1pdHRlcih7XG4gICAgICAgICAgICBvbkxpc3RlbmVyRGlkQWRkOiBmdW5jdGlvbiAoZW1pdHRlciwgbGlzdGVuZXIsIHRoaXNBcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRUaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZmx1c2gobGlzdGVuZXIsIHRoaXNBcmdzKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmbHVzaChsaXN0ZW5lciwgdGhpc0FyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBFdmVudC5lY2hvID0gZWNobztcbiAgICB2YXIgQ2hhaW5hYmxlRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENoYWluYWJsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFpbmFibGVFdmVudChtYXAodGhpcy5ldmVudCwgZm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhaW5hYmxlRXZlbnQoZm9yRWFjaCh0aGlzLmV2ZW50LCBmbikpO1xuICAgICAgICB9O1xuICAgICAgICBDaGFpbmFibGVFdmVudC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENoYWluYWJsZUV2ZW50KGZpbHRlcih0aGlzLmV2ZW50LCBmbikpO1xuICAgICAgICB9O1xuICAgICAgICBDaGFpbmFibGVFdmVudC5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKG1lcmdlLCBpbml0aWFsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENoYWluYWJsZUV2ZW50KHJlZHVjZSh0aGlzLmV2ZW50LCBtZXJnZSwgaW5pdGlhbCkpO1xuICAgICAgICB9O1xuICAgICAgICBDaGFpbmFibGVFdmVudC5wcm90b3R5cGUubGF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENoYWluYWJsZUV2ZW50KGxhdGNoKHRoaXMuZXZlbnQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGxpc3RlbmVyLCB0aGlzQXJncywgZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50KGxpc3RlbmVyLCB0aGlzQXJncywgZGlzcG9zYWJsZXMpO1xuICAgICAgICB9O1xuICAgICAgICBDaGFpbmFibGVFdmVudC5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gb25jZSh0aGlzLmV2ZW50KShsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENoYWluYWJsZUV2ZW50O1xuICAgIH0oKSk7XG4gICAgZnVuY3Rpb24gY2hhaW4oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFpbmFibGVFdmVudChldmVudCk7XG4gICAgfVxuICAgIEV2ZW50LmNoYWluID0gY2hhaW47XG4gICAgZnVuY3Rpb24gZnJvbU5vZGVFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXZlbnROYW1lLCBtYXApIHtcbiAgICAgICAgaWYgKG1hcCA9PT0gdm9pZCAwKSB7IG1hcCA9IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gaWQ7IH07IH1cbiAgICAgICAgdmFyIGZuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5maXJlKG1hcC5hcHBseSh2b2lkIDAsIGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9uRmlyc3RMaXN0ZW5lckFkZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtaXR0ZXIub24oZXZlbnROYW1lLCBmbik7IH07XG4gICAgICAgIHZhciBvbkxhc3RMaXN0ZW5lclJlbW92ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7IH07XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgRW1pdHRlcih7IG9uRmlyc3RMaXN0ZW5lckFkZDogb25GaXJzdExpc3RlbmVyQWRkLCBvbkxhc3RMaXN0ZW5lclJlbW92ZTogb25MYXN0TGlzdGVuZXJSZW1vdmUgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZXZlbnQ7XG4gICAgfVxuICAgIEV2ZW50LmZyb21Ob2RlRXZlbnRFbWl0dGVyID0gZnJvbU5vZGVFdmVudEVtaXR0ZXI7XG4gICAgZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuICAgICAgICB2YXIgZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHZhciBzaG91bGRFbWl0ID0gZmFsc2U7XG4gICAgICAgIHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc2hvdWxkRW1pdCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1pdHRlci5maXJlKHVuZGVmaW5lZCk7IH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5maXJlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzaG91bGRFbWl0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIEV2ZW50LmZyb21Qcm9taXNlID0gZnJvbVByb21pc2U7XG4gICAgZnVuY3Rpb24gdG9Qcm9taXNlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYykgeyByZXR1cm4gb25jZShldmVudCkoYyk7IH0pO1xuICAgIH1cbiAgICBFdmVudC50b1Byb21pc2UgPSB0b1Byb21pc2U7XG59KShFdmVudCB8fCAoRXZlbnQgPSB7fSkpO1xudmFyIF9nbG9iYWxMZWFrV2FybmluZ1RocmVzaG9sZCA9IC0xO1xudmFyIExlYWthZ2VNb25pdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExlYWthZ2VNb25pdG9yKGN1c3RvbVRocmVzaG9sZCwgbmFtZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE4KS5zbGljZSgyLCA1KTsgfVxuICAgICAgICB0aGlzLmN1c3RvbVRocmVzaG9sZCA9IGN1c3RvbVRocmVzaG9sZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fd2FybkNvdW50ZG93biA9IDA7XG4gICAgfVxuICAgIExlYWthZ2VNb25pdG9yLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fc3RhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFja3MuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGVha2FnZU1vbml0b3IucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24gKGxpc3RlbmVyQ291bnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRocmVzaG9sZCA9IF9nbG9iYWxMZWFrV2FybmluZ1RocmVzaG9sZDtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1c3RvbVRocmVzaG9sZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IHRoaXMuY3VzdG9tVGhyZXNob2xkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aHJlc2hvbGQgPD0gMCB8fCBsaXN0ZW5lckNvdW50IDwgdGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fc3RhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFja3MgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoJ1xcbicpLnNsaWNlKDMpLmpvaW4oJ1xcbicpO1xuICAgICAgICB2YXIgY291bnQgPSAodGhpcy5fc3RhY2tzLmdldChzdGFjaykgfHwgMCk7XG4gICAgICAgIHRoaXMuX3N0YWNrcy5zZXQoc3RhY2ssIGNvdW50ICsgMSk7XG4gICAgICAgIHRoaXMuX3dhcm5Db3VudGRvd24gLT0gMTtcbiAgICAgICAgaWYgKHRoaXMuX3dhcm5Db3VudGRvd24gPD0gMCkge1xuICAgICAgICAgICAgLy8gb25seSB3YXJuIG9uIGZpcnN0IGV4Y2VlZCBhbmQgdGhlbiBldmVyeSB0aW1lIHRoZSBsaW1pdFxuICAgICAgICAgICAgLy8gaXMgZXhjZWVkZWQgYnkgNTAlIGFnYWluXG4gICAgICAgICAgICB0aGlzLl93YXJuQ291bnRkb3duID0gdGhyZXNob2xkICogMC41O1xuICAgICAgICAgICAgLy8gZmluZCBtb3N0IGZyZXF1ZW50IGxpc3RlbmVyIGFuZCBwcmludCB3YXJuaW5nXG4gICAgICAgICAgICB2YXIgdG9wU3RhY2tfMTtcbiAgICAgICAgICAgIHZhciB0b3BDb3VudF8xID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3N0YWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjb3VudCwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRvcFN0YWNrXzEgfHwgdG9wQ291bnRfMSA8IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcFN0YWNrXzEgPSBzdGFjaztcbiAgICAgICAgICAgICAgICAgICAgdG9wQ291bnRfMSA9IGNvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW1wiICsgdGhpcy5uYW1lICsgXCJdIHBvdGVudGlhbCBsaXN0ZW5lciBMRUFLIGRldGVjdGVkLCBoYXZpbmcgXCIgKyBsaXN0ZW5lckNvdW50ICsgXCIgbGlzdGVuZXJzIGFscmVhZHkuIE1PU1QgZnJlcXVlbnQgbGlzdGVuZXIgKFwiICsgdG9wQ291bnRfMSArIFwiKTpcIik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4odG9wU3RhY2tfMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IChfdGhpcy5fc3RhY2tzLmdldChzdGFjaykgfHwgMCk7XG4gICAgICAgICAgICBfdGhpcy5fc3RhY2tzLnNldChzdGFjaywgY291bnQgLSAxKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMZWFrYWdlTW9uaXRvcjtcbn0oKSk7XG4vKipcbiAqIFRoZSBFbWl0dGVyIGNhbiBiZSB1c2VkIHRvIGV4cG9zZSBhbiBFdmVudCB0byB0aGUgcHVibGljXG4gKiB0byBmaXJlIGl0IGZyb20gdGhlIGluc2lkZXMuXG4gKiBTYW1wbGU6XG4gICAgY2xhc3MgRG9jdW1lbnQge1xuXG4gICAgICAgIHByaXZhdGUgX29uRGlkQ2hhbmdlID0gbmV3IEVtaXR0ZXI8KHZhbHVlOnN0cmluZyk9PmFueT4oKTtcblxuICAgICAgICBwdWJsaWMgb25EaWRDaGFuZ2UgPSB0aGlzLl9vbkRpZENoYW5nZS5ldmVudDtcblxuICAgICAgICAvLyBnZXR0ZXItc3R5bGVcbiAgICAgICAgLy8gZ2V0IG9uRGlkQ2hhbmdlKCk6IEV2ZW50PCh2YWx1ZTpzdHJpbmcpPT5hbnk+IHtcbiAgICAgICAgLy8gXHRyZXR1cm4gdGhpcy5fb25EaWRDaGFuZ2UuZXZlbnQ7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBwcml2YXRlIF9kb0l0KCkge1xuICAgICAgICAgICAgLy8uLi5cbiAgICAgICAgICAgIHRoaXMuX29uRGlkQ2hhbmdlLmZpcmUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICovXG52YXIgRW1pdHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFbWl0dGVyKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuX2xlYWthZ2VNb24gPSBfZ2xvYmFsTGVha1dhcm5pbmdUaHJlc2hvbGQgPiAwXG4gICAgICAgICAgICA/IG5ldyBMZWFrYWdlTW9uaXRvcih0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMubGVha1dhcm5pbmdUaHJlc2hvbGQpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVtaXR0ZXIucHJvdG90eXBlLCBcImV2ZW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvciB0aGUgcHVibGljIHRvIGFsbG93IHRvIHN1YnNjcmliZVxuICAgICAgICAgKiB0byBldmVudHMgZnJvbSB0aGlzIEVtaXR0ZXJcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmICghdGhpcy5fZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudCA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX2xpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2xpc3RlbmVycyA9IG5ldyBMaW5rZWRMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0TGlzdGVuZXIgPSBfdGhpcy5fbGlzdGVuZXJzLmlzRW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0TGlzdGVuZXIgJiYgX3RoaXMuX29wdGlvbnMgJiYgX3RoaXMuX29wdGlvbnMub25GaXJzdExpc3RlbmVyQWRkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb3B0aW9ucy5vbkZpcnN0TGlzdGVuZXJBZGQoX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByZW1vdmUgPSBfdGhpcy5fbGlzdGVuZXJzLnB1c2goIXRoaXNBcmdzID8gbGlzdGVuZXIgOiBbbGlzdGVuZXIsIHRoaXNBcmdzXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdExpc3RlbmVyICYmIF90aGlzLl9vcHRpb25zICYmIF90aGlzLl9vcHRpb25zLm9uRmlyc3RMaXN0ZW5lckRpZEFkZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29wdGlvbnMub25GaXJzdExpc3RlbmVyRGlkQWRkKF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29wdGlvbnMgJiYgX3RoaXMuX29wdGlvbnMub25MaXN0ZW5lckRpZEFkZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29wdGlvbnMub25MaXN0ZW5lckRpZEFkZChfdGhpcywgbGlzdGVuZXIsIHRoaXNBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBhbmQgcmVjb3JkIHRoaXMgZW1pdHRlciBmb3IgcG90ZW50aWFsIGxlYWthZ2VcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlbW92ZU1vbml0b3I7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fbGVha2FnZU1vbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTW9uaXRvciA9IF90aGlzLl9sZWFrYWdlTW9uLmNoZWNrKF90aGlzLl9saXN0ZW5lcnMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmVNb25pdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU1vbml0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRpc3Bvc2UgPSBFbWl0dGVyLl9ub29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX2Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29wdGlvbnMgJiYgX3RoaXMuX29wdGlvbnMub25MYXN0TGlzdGVuZXJSZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXNMaXN0ZW5lcnMgPSAoX3RoaXMuX2xpc3RlbmVycyAmJiAhX3RoaXMuX2xpc3RlbmVycy5pc0VtcHR5KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb3B0aW9ucy5vbkxhc3RMaXN0ZW5lclJlbW92ZShfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRpc3Bvc2FibGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcG9zYWJsZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVG8gYmUga2VwdCBwcml2YXRlIHRvIGZpcmUgYW4gZXZlbnQgdG9cbiAgICAgKiBzdWJzY3JpYmVyc1xuICAgICAqL1xuICAgIEVtaXR0ZXIucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgICAgICAgLy8gcHV0IGFsbCBbbGlzdGVuZXIsZXZlbnRdLXBhaXJzIGludG8gZGVsaXZlcnkgcXVldWVcbiAgICAgICAgICAgIC8vIHRoZW4gZW1pdCBhbGwgZXZlbnQuIGFuIGlubmVyL25lc3RlZCBldmVudCBtaWdodCBiZVxuICAgICAgICAgICAgLy8gdGhlIGRyaXZlciBvZiB0aGlzXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RlbGl2ZXJ5UXVldWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxpdmVyeVF1ZXVlID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVyID0gdGhpcy5fbGlzdGVuZXJzLml0ZXJhdG9yKCksIGUgPSBpdGVyLm5leHQoKTsgIWUuZG9uZTsgZSA9IGl0ZXIubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVsaXZlcnlRdWV1ZS5wdXNoKFtlLnZhbHVlLCBldmVudF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2RlbGl2ZXJ5UXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuX2RlbGl2ZXJ5UXVldWUuc2hpZnQoKSwgbGlzdGVuZXIgPSBfYVswXSwgZXZlbnRfMSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwodW5kZWZpbmVkLCBldmVudF8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyWzBdLmNhbGwobGlzdGVuZXJbMV0sIGV2ZW50XzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uVW5leHBlY3RlZEVycm9yKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgRW1pdHRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9kZWxpdmVyeVF1ZXVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWxpdmVyeVF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xlYWthZ2VNb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlYWthZ2VNb24uZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9O1xuICAgIEVtaXR0ZXIuX25vb3AgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIEVtaXR0ZXI7XG59KCkpO1xuZXhwb3J0IHsgRW1pdHRlciB9O1xudmFyIEV2ZW50TXVsdGlwbGV4ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRNdWx0aXBsZXhlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5oYXNMaXN0ZW5lcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoe1xuICAgICAgICAgICAgb25GaXJzdExpc3RlbmVyQWRkOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5vbkZpcnN0TGlzdGVuZXJBZGQoKTsgfSxcbiAgICAgICAgICAgIG9uTGFzdExpc3RlbmVyUmVtb3ZlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5vbkxhc3RMaXN0ZW5lclJlbW92ZSgpOyB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRNdWx0aXBsZXhlci5wcm90b3R5cGUsIFwiZXZlbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXIuZXZlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZSA9IHsgZXZlbnQ6IGV2ZW50LCBsaXN0ZW5lcjogbnVsbCB9O1xuICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKGUpO1xuICAgICAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuaG9vayhlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5oYXNMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy51bmhvb2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaWR4ID0gX3RoaXMuZXZlbnRzLmluZGV4T2YoZSk7XG4gICAgICAgICAgICBfdGhpcy5ldmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0b0Rpc3Bvc2FibGUob25jZUZuKGRpc3Bvc2UpKTtcbiAgICB9O1xuICAgIEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLm9uRmlyc3RMaXN0ZW5lckFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5oYXNMaXN0ZW5lcnMgPSB0cnVlO1xuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5ob29rKGUpOyB9KTtcbiAgICB9O1xuICAgIEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLm9uTGFzdExpc3RlbmVyUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmhhc0xpc3RlbmVycyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy51bmhvb2soZSk7IH0pO1xuICAgIH07XG4gICAgRXZlbnRNdWx0aXBsZXhlci5wcm90b3R5cGUuaG9vayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGUubGlzdGVuZXIgPSBlLmV2ZW50KGZ1bmN0aW9uIChyKSB7IHJldHVybiBfdGhpcy5lbWl0dGVyLmZpcmUocik7IH0pO1xuICAgIH07XG4gICAgRXZlbnRNdWx0aXBsZXhlci5wcm90b3R5cGUudW5ob29rID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUubGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGUubGlzdGVuZXIuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGUubGlzdGVuZXIgPSBudWxsO1xuICAgIH07XG4gICAgRXZlbnRNdWx0aXBsZXhlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudE11bHRpcGxleGVyO1xufSgpKTtcbmV4cG9ydCB7IEV2ZW50TXVsdGlwbGV4ZXIgfTtcbi8qKlxuICogVGhlIEV2ZW50QnVmZmVyZXIgaXMgdXNlZnVsIGluIHNpdHVhdGlvbnMgaW4gd2hpY2ggeW91IHdhbnRcbiAqIHRvIGRlbGF5IGZpcmluZyB5b3VyIGV2ZW50cyBkdXJpbmcgc29tZSBjb2RlLlxuICogWW91IGNhbiB3cmFwIHRoYXQgY29kZSBhbmQgYmUgc3VyZSB0aGF0IHRoZSBldmVudCB3aWxsIG5vdFxuICogYmUgZmlyZWQgZHVyaW5nIHRoYXQgd3JhcC5cbiAqXG4gKiBgYGBcbiAqIGNvbnN0IGVtaXR0ZXI6IEVtaXR0ZXI7XG4gKiBjb25zdCBkZWxheWVyID0gbmV3IEV2ZW50RGVsYXllcigpO1xuICogY29uc3QgZGVsYXllZEV2ZW50ID0gZGVsYXllci53cmFwRXZlbnQoZW1pdHRlci5ldmVudCk7XG4gKlxuICogZGVsYXllZEV2ZW50KGNvbnNvbGUubG9nKTtcbiAqXG4gKiBkZWxheWVyLmJ1ZmZlckV2ZW50cygoKSA9PiB7XG4gKiAgIGVtaXR0ZXIuZmlyZSgpOyAvLyBldmVudCB3aWxsIG5vdCBiZSBmaXJlZCB5ZXRcbiAqIH0pO1xuICpcbiAqIC8vIGV2ZW50IHdpbGwgb25seSBiZSBmaXJlZCBhdCB0aGlzIHBvaW50XG4gKiBgYGBcbiAqL1xudmFyIEV2ZW50QnVmZmVyZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRCdWZmZXJlcigpIHtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgfVxuICAgIEV2ZW50QnVmZmVyZXIucHJvdG90eXBlLndyYXBFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGxpc3RlbmVyLCB0aGlzQXJncywgZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBfdGhpcy5idWZmZXJzW190aGlzLmJ1ZmZlcnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaChmdW5jdGlvbiAoKSB7IHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXNBcmdzLCBpKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXNBcmdzLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB1bmRlZmluZWQsIGRpc3Bvc2FibGVzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEV2ZW50QnVmZmVyZXIucHJvdG90eXBlLmJ1ZmZlckV2ZW50cyA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB2YXIgYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJ1ZmZlcik7XG4gICAgICAgIHZhciByID0gZm4oKTtcbiAgICAgICAgdGhpcy5idWZmZXJzLnBvcCgpO1xuICAgICAgICBidWZmZXIuZm9yRWFjaChmdW5jdGlvbiAoZmx1c2gpIHsgcmV0dXJuIGZsdXNoKCk7IH0pO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudEJ1ZmZlcmVyO1xufSgpKTtcbmV4cG9ydCB7IEV2ZW50QnVmZmVyZXIgfTtcbi8qKlxuICogQSBSZWxheSBpcyBhbiBldmVudCBmb3J3YXJkZXIgd2hpY2ggZnVuY3Rpb25zIGFzIGEgcmVwbHVnYWJibGUgZXZlbnQgcGlwZS5cbiAqIE9uY2UgY3JlYXRlZCwgeW91IGNhbiBjb25uZWN0IGFuIGlucHV0IGV2ZW50IHRvIGl0IGFuZCBpdCB3aWxsIHNpbXBseSBmb3J3YXJkXG4gKiBldmVudHMgZnJvbSB0aGF0IGlucHV0IGV2ZW50IHRocm91Z2ggaXRzIG93biBgZXZlbnRgIHByb3BlcnR5LiBUaGUgYGlucHV0YFxuICogY2FuIGJlIGNoYW5nZWQgYXQgYW55IHBvaW50IGluIHRpbWUuXG4gKi9cbnZhciBSZWxheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWxheSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5saXN0ZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gRXZlbnQuTm9uZTtcbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50TGlzdGVuZXIgPSBEaXNwb3NhYmxlLk5vbmU7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKHtcbiAgICAgICAgICAgIG9uRmlyc3RMaXN0ZW5lckRpZEFkZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmxpc3RlbmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5wdXRFdmVudExpc3RlbmVyID0gX3RoaXMuaW5wdXRFdmVudChfdGhpcy5lbWl0dGVyLmZpcmUsIF90aGlzLmVtaXR0ZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTGFzdExpc3RlbmVyUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubGlzdGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5wdXRFdmVudExpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0aGlzLmVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWxheS5wcm90b3R5cGUsIFwiaW5wdXRcIiwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5pbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50TGlzdGVuZXIgPSBldmVudCh0aGlzLmVtaXR0ZXIuZmlyZSwgdGhpcy5lbWl0dGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgUmVsYXkucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRFdmVudExpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB9O1xuICAgIHJldHVybiBSZWxheTtcbn0oKSk7XG5leHBvcnQgeyBSZWxheSB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gb25jZShmbikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGRpZENhbGwgPSBmYWxzZTtcbiAgICB2YXIgcmVzdWx0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChkaWRDYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGRpZENhbGwgPSB0cnVlO1xuICAgICAgICByZXN1bHQgPSBmbi5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmV4cG9ydCB2YXIgRklOID0geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG5leHBvcnQgdmFyIEl0ZXJhdG9yO1xuKGZ1bmN0aW9uIChJdGVyYXRvcikge1xuICAgIHZhciBfZW1wdHkgPSB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBGSU47XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICByZXR1cm4gX2VtcHR5O1xuICAgIH1cbiAgICBJdGVyYXRvci5lbXB0eSA9IGVtcHR5O1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSwgaW5kZXgsIGxlbmd0aCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IDA7IH1cbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gdm9pZCAwKSB7IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZJTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBhcnJheVtpbmRleCsrXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBJdGVyYXRvci5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbShlbGVtZW50cykge1xuICAgICAgICBpZiAoIWVsZW1lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gSXRlcmF0b3IuZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmZyb21BcnJheShlbGVtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSXRlcmF0b3IuZnJvbSA9IGZyb207XG4gICAgZnVuY3Rpb24gbWFwKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZJTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogZm4oZWxlbWVudC52YWx1ZSkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIEl0ZXJhdG9yLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIoaXRlcmF0b3IsIGZuKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGSU47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuKGVsZW1lbnQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IGVsZW1lbnQudmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgSXRlcmF0b3IuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goaXRlcmF0b3IsIGZuKSB7XG4gICAgICAgIGZvciAodmFyIG5leHQgPSBpdGVyYXRvci5uZXh0KCk7ICFuZXh0LmRvbmU7IG5leHQgPSBpdGVyYXRvci5uZXh0KCkpIHtcbiAgICAgICAgICAgIGZuKG5leHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEl0ZXJhdG9yLmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIGNvbGxlY3QoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3JFYWNoKGl0ZXJhdG9yLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHJlc3VsdC5wdXNoKHZhbHVlKTsgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEl0ZXJhdG9yLmNvbGxlY3QgPSBjb2xsZWN0O1xufSkoSXRlcmF0b3IgfHwgKEl0ZXJhdG9yID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXF1ZW5jZUl0ZXJhdG9yKGFyZykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmZyb21BcnJheShhcmcpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFyZztcbiAgICB9XG59XG52YXIgQXJyYXlJdGVyYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcnJheUl0ZXJhdG9yKGl0ZW1zLCBzdGFydCwgZW5kLCBpbmRleCkge1xuICAgICAgICBpZiAoc3RhcnQgPT09IHZvaWQgMCkgeyBzdGFydCA9IDA7IH1cbiAgICAgICAgaWYgKGVuZCA9PT0gdm9pZCAwKSB7IGVuZCA9IGl0ZW1zLmxlbmd0aDsgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHN0YXJ0IC0gMTsgfVxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB9XG4gICAgQXJyYXlJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGgubWluKHRoaXMuaW5kZXggKyAxLCB0aGlzLmVuZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQoKTtcbiAgICB9O1xuICAgIEFycmF5SXRlcmF0b3IucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnN0YXJ0IC0gMSB8fCB0aGlzLmluZGV4ID09PSB0aGlzLmVuZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbdGhpcy5pbmRleF07XG4gICAgfTtcbiAgICByZXR1cm4gQXJyYXlJdGVyYXRvcjtcbn0oKSk7XG5leHBvcnQgeyBBcnJheUl0ZXJhdG9yIH07XG52YXIgQXJyYXlOYXZpZ2F0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFycmF5TmF2aWdhdG9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFycmF5TmF2aWdhdG9yKGl0ZW1zLCBzdGFydCwgZW5kLCBpbmRleCkge1xuICAgICAgICBpZiAoc3RhcnQgPT09IHZvaWQgMCkgeyBzdGFydCA9IDA7IH1cbiAgICAgICAgaWYgKGVuZCA9PT0gdm9pZCAwKSB7IGVuZCA9IGl0ZW1zLmxlbmd0aDsgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHN0YXJ0IC0gMTsgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgaXRlbXMsIHN0YXJ0LCBlbmQsIGluZGV4KSB8fCB0aGlzO1xuICAgIH1cbiAgICBBcnJheU5hdmlnYXRvci5wcm90b3R5cGUuY3VycmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuY3VycmVudC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgQXJyYXlOYXZpZ2F0b3IucHJvdG90eXBlLnByZXZpb3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gTWF0aC5tYXgodGhpcy5pbmRleCAtIDEsIHRoaXMuc3RhcnQgLSAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudCgpO1xuICAgIH07XG4gICAgQXJyYXlOYXZpZ2F0b3IucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5zdGFydDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudCgpO1xuICAgIH07XG4gICAgQXJyYXlOYXZpZ2F0b3IucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmVuZCAtIDE7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQoKTtcbiAgICB9O1xuICAgIEFycmF5TmF2aWdhdG9yLnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIEFycmF5TmF2aWdhdG9yO1xufShBcnJheUl0ZXJhdG9yKSk7XG5leHBvcnQgeyBBcnJheU5hdmlnYXRvciB9O1xudmFyIE1hcHBlZEl0ZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hcHBlZEl0ZXJhdG9yKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICB0aGlzLml0ZXJhdG9yID0gaXRlcmF0b3I7XG4gICAgICAgIHRoaXMuZm4gPSBmbjtcbiAgICAgICAgLy8gbm9vcFxuICAgIH1cbiAgICBNYXBwZWRJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZm4odGhpcy5pdGVyYXRvci5uZXh0KCkpOyB9O1xuICAgIHJldHVybiBNYXBwZWRJdGVyYXRvcjtcbn0oKSk7XG5leHBvcnQgeyBNYXBwZWRJdGVyYXRvciB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBpbGxlZ2FsQXJndW1lbnQgfSBmcm9tICcuL2Vycm9ycy5qcyc7XG52YXIgS2V5Q29kZVN0ck1hcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBLZXlDb2RlU3RyTWFwKCkge1xuICAgICAgICB0aGlzLl9rZXlDb2RlVG9TdHIgPSBbXTtcbiAgICAgICAgdGhpcy5fc3RyVG9LZXlDb2RlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgS2V5Q29kZVN0ck1hcC5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24gKGtleUNvZGUsIHN0cikge1xuICAgICAgICB0aGlzLl9rZXlDb2RlVG9TdHJba2V5Q29kZV0gPSBzdHI7XG4gICAgICAgIHRoaXMuX3N0clRvS2V5Q29kZVtzdHIudG9Mb3dlckNhc2UoKV0gPSBrZXlDb2RlO1xuICAgIH07XG4gICAgS2V5Q29kZVN0ck1hcC5wcm90b3R5cGUua2V5Q29kZVRvU3RyID0gZnVuY3Rpb24gKGtleUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleUNvZGVUb1N0cltrZXlDb2RlXTtcbiAgICB9O1xuICAgIEtleUNvZGVTdHJNYXAucHJvdG90eXBlLnN0clRvS2V5Q29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0clRvS2V5Q29kZVtzdHIudG9Mb3dlckNhc2UoKV0gfHwgMCAvKiBVbmtub3duICovO1xuICAgIH07XG4gICAgcmV0dXJuIEtleUNvZGVTdHJNYXA7XG59KCkpO1xudmFyIHVpTWFwID0gbmV3IEtleUNvZGVTdHJNYXAoKTtcbnZhciB1c2VyU2V0dGluZ3NVU01hcCA9IG5ldyBLZXlDb2RlU3RyTWFwKCk7XG52YXIgdXNlclNldHRpbmdzR2VuZXJhbE1hcCA9IG5ldyBLZXlDb2RlU3RyTWFwKCk7XG4oZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGRlZmluZShrZXlDb2RlLCB1aUxhYmVsLCB1c1VzZXJTZXR0aW5nc0xhYmVsLCBnZW5lcmFsVXNlclNldHRpbmdzTGFiZWwpIHtcbiAgICAgICAgaWYgKHVzVXNlclNldHRpbmdzTGFiZWwgPT09IHZvaWQgMCkgeyB1c1VzZXJTZXR0aW5nc0xhYmVsID0gdWlMYWJlbDsgfVxuICAgICAgICBpZiAoZ2VuZXJhbFVzZXJTZXR0aW5nc0xhYmVsID09PSB2b2lkIDApIHsgZ2VuZXJhbFVzZXJTZXR0aW5nc0xhYmVsID0gdXNVc2VyU2V0dGluZ3NMYWJlbDsgfVxuICAgICAgICB1aU1hcC5kZWZpbmUoa2V5Q29kZSwgdWlMYWJlbCk7XG4gICAgICAgIHVzZXJTZXR0aW5nc1VTTWFwLmRlZmluZShrZXlDb2RlLCB1c1VzZXJTZXR0aW5nc0xhYmVsKTtcbiAgICAgICAgdXNlclNldHRpbmdzR2VuZXJhbE1hcC5kZWZpbmUoa2V5Q29kZSwgZ2VuZXJhbFVzZXJTZXR0aW5nc0xhYmVsKTtcbiAgICB9XG4gICAgZGVmaW5lKDAgLyogVW5rbm93biAqLywgJ3Vua25vd24nKTtcbiAgICBkZWZpbmUoMSAvKiBCYWNrc3BhY2UgKi8sICdCYWNrc3BhY2UnKTtcbiAgICBkZWZpbmUoMiAvKiBUYWIgKi8sICdUYWInKTtcbiAgICBkZWZpbmUoMyAvKiBFbnRlciAqLywgJ0VudGVyJyk7XG4gICAgZGVmaW5lKDQgLyogU2hpZnQgKi8sICdTaGlmdCcpO1xuICAgIGRlZmluZSg1IC8qIEN0cmwgKi8sICdDdHJsJyk7XG4gICAgZGVmaW5lKDYgLyogQWx0ICovLCAnQWx0Jyk7XG4gICAgZGVmaW5lKDcgLyogUGF1c2VCcmVhayAqLywgJ1BhdXNlQnJlYWsnKTtcbiAgICBkZWZpbmUoOCAvKiBDYXBzTG9jayAqLywgJ0NhcHNMb2NrJyk7XG4gICAgZGVmaW5lKDkgLyogRXNjYXBlICovLCAnRXNjYXBlJyk7XG4gICAgZGVmaW5lKDEwIC8qIFNwYWNlICovLCAnU3BhY2UnKTtcbiAgICBkZWZpbmUoMTEgLyogUGFnZVVwICovLCAnUGFnZVVwJyk7XG4gICAgZGVmaW5lKDEyIC8qIFBhZ2VEb3duICovLCAnUGFnZURvd24nKTtcbiAgICBkZWZpbmUoMTMgLyogRW5kICovLCAnRW5kJyk7XG4gICAgZGVmaW5lKDE0IC8qIEhvbWUgKi8sICdIb21lJyk7XG4gICAgZGVmaW5lKDE1IC8qIExlZnRBcnJvdyAqLywgJ0xlZnRBcnJvdycsICdMZWZ0Jyk7XG4gICAgZGVmaW5lKDE2IC8qIFVwQXJyb3cgKi8sICdVcEFycm93JywgJ1VwJyk7XG4gICAgZGVmaW5lKDE3IC8qIFJpZ2h0QXJyb3cgKi8sICdSaWdodEFycm93JywgJ1JpZ2h0Jyk7XG4gICAgZGVmaW5lKDE4IC8qIERvd25BcnJvdyAqLywgJ0Rvd25BcnJvdycsICdEb3duJyk7XG4gICAgZGVmaW5lKDE5IC8qIEluc2VydCAqLywgJ0luc2VydCcpO1xuICAgIGRlZmluZSgyMCAvKiBEZWxldGUgKi8sICdEZWxldGUnKTtcbiAgICBkZWZpbmUoMjEgLyogS0VZXzAgKi8sICcwJyk7XG4gICAgZGVmaW5lKDIyIC8qIEtFWV8xICovLCAnMScpO1xuICAgIGRlZmluZSgyMyAvKiBLRVlfMiAqLywgJzInKTtcbiAgICBkZWZpbmUoMjQgLyogS0VZXzMgKi8sICczJyk7XG4gICAgZGVmaW5lKDI1IC8qIEtFWV80ICovLCAnNCcpO1xuICAgIGRlZmluZSgyNiAvKiBLRVlfNSAqLywgJzUnKTtcbiAgICBkZWZpbmUoMjcgLyogS0VZXzYgKi8sICc2Jyk7XG4gICAgZGVmaW5lKDI4IC8qIEtFWV83ICovLCAnNycpO1xuICAgIGRlZmluZSgyOSAvKiBLRVlfOCAqLywgJzgnKTtcbiAgICBkZWZpbmUoMzAgLyogS0VZXzkgKi8sICc5Jyk7XG4gICAgZGVmaW5lKDMxIC8qIEtFWV9BICovLCAnQScpO1xuICAgIGRlZmluZSgzMiAvKiBLRVlfQiAqLywgJ0InKTtcbiAgICBkZWZpbmUoMzMgLyogS0VZX0MgKi8sICdDJyk7XG4gICAgZGVmaW5lKDM0IC8qIEtFWV9EICovLCAnRCcpO1xuICAgIGRlZmluZSgzNSAvKiBLRVlfRSAqLywgJ0UnKTtcbiAgICBkZWZpbmUoMzYgLyogS0VZX0YgKi8sICdGJyk7XG4gICAgZGVmaW5lKDM3IC8qIEtFWV9HICovLCAnRycpO1xuICAgIGRlZmluZSgzOCAvKiBLRVlfSCAqLywgJ0gnKTtcbiAgICBkZWZpbmUoMzkgLyogS0VZX0kgKi8sICdJJyk7XG4gICAgZGVmaW5lKDQwIC8qIEtFWV9KICovLCAnSicpO1xuICAgIGRlZmluZSg0MSAvKiBLRVlfSyAqLywgJ0snKTtcbiAgICBkZWZpbmUoNDIgLyogS0VZX0wgKi8sICdMJyk7XG4gICAgZGVmaW5lKDQzIC8qIEtFWV9NICovLCAnTScpO1xuICAgIGRlZmluZSg0NCAvKiBLRVlfTiAqLywgJ04nKTtcbiAgICBkZWZpbmUoNDUgLyogS0VZX08gKi8sICdPJyk7XG4gICAgZGVmaW5lKDQ2IC8qIEtFWV9QICovLCAnUCcpO1xuICAgIGRlZmluZSg0NyAvKiBLRVlfUSAqLywgJ1EnKTtcbiAgICBkZWZpbmUoNDggLyogS0VZX1IgKi8sICdSJyk7XG4gICAgZGVmaW5lKDQ5IC8qIEtFWV9TICovLCAnUycpO1xuICAgIGRlZmluZSg1MCAvKiBLRVlfVCAqLywgJ1QnKTtcbiAgICBkZWZpbmUoNTEgLyogS0VZX1UgKi8sICdVJyk7XG4gICAgZGVmaW5lKDUyIC8qIEtFWV9WICovLCAnVicpO1xuICAgIGRlZmluZSg1MyAvKiBLRVlfVyAqLywgJ1cnKTtcbiAgICBkZWZpbmUoNTQgLyogS0VZX1ggKi8sICdYJyk7XG4gICAgZGVmaW5lKDU1IC8qIEtFWV9ZICovLCAnWScpO1xuICAgIGRlZmluZSg1NiAvKiBLRVlfWiAqLywgJ1onKTtcbiAgICBkZWZpbmUoNTcgLyogTWV0YSAqLywgJ01ldGEnKTtcbiAgICBkZWZpbmUoNTggLyogQ29udGV4dE1lbnUgKi8sICdDb250ZXh0TWVudScpO1xuICAgIGRlZmluZSg1OSAvKiBGMSAqLywgJ0YxJyk7XG4gICAgZGVmaW5lKDYwIC8qIEYyICovLCAnRjInKTtcbiAgICBkZWZpbmUoNjEgLyogRjMgKi8sICdGMycpO1xuICAgIGRlZmluZSg2MiAvKiBGNCAqLywgJ0Y0Jyk7XG4gICAgZGVmaW5lKDYzIC8qIEY1ICovLCAnRjUnKTtcbiAgICBkZWZpbmUoNjQgLyogRjYgKi8sICdGNicpO1xuICAgIGRlZmluZSg2NSAvKiBGNyAqLywgJ0Y3Jyk7XG4gICAgZGVmaW5lKDY2IC8qIEY4ICovLCAnRjgnKTtcbiAgICBkZWZpbmUoNjcgLyogRjkgKi8sICdGOScpO1xuICAgIGRlZmluZSg2OCAvKiBGMTAgKi8sICdGMTAnKTtcbiAgICBkZWZpbmUoNjkgLyogRjExICovLCAnRjExJyk7XG4gICAgZGVmaW5lKDcwIC8qIEYxMiAqLywgJ0YxMicpO1xuICAgIGRlZmluZSg3MSAvKiBGMTMgKi8sICdGMTMnKTtcbiAgICBkZWZpbmUoNzIgLyogRjE0ICovLCAnRjE0Jyk7XG4gICAgZGVmaW5lKDczIC8qIEYxNSAqLywgJ0YxNScpO1xuICAgIGRlZmluZSg3NCAvKiBGMTYgKi8sICdGMTYnKTtcbiAgICBkZWZpbmUoNzUgLyogRjE3ICovLCAnRjE3Jyk7XG4gICAgZGVmaW5lKDc2IC8qIEYxOCAqLywgJ0YxOCcpO1xuICAgIGRlZmluZSg3NyAvKiBGMTkgKi8sICdGMTknKTtcbiAgICBkZWZpbmUoNzggLyogTnVtTG9jayAqLywgJ051bUxvY2snKTtcbiAgICBkZWZpbmUoNzkgLyogU2Nyb2xsTG9jayAqLywgJ1Njcm9sbExvY2snKTtcbiAgICBkZWZpbmUoODAgLyogVVNfU0VNSUNPTE9OICovLCAnOycsICc7JywgJ09FTV8xJyk7XG4gICAgZGVmaW5lKDgxIC8qIFVTX0VRVUFMICovLCAnPScsICc9JywgJ09FTV9QTFVTJyk7XG4gICAgZGVmaW5lKDgyIC8qIFVTX0NPTU1BICovLCAnLCcsICcsJywgJ09FTV9DT01NQScpO1xuICAgIGRlZmluZSg4MyAvKiBVU19NSU5VUyAqLywgJy0nLCAnLScsICdPRU1fTUlOVVMnKTtcbiAgICBkZWZpbmUoODQgLyogVVNfRE9UICovLCAnLicsICcuJywgJ09FTV9QRVJJT0QnKTtcbiAgICBkZWZpbmUoODUgLyogVVNfU0xBU0ggKi8sICcvJywgJy8nLCAnT0VNXzInKTtcbiAgICBkZWZpbmUoODYgLyogVVNfQkFDS1RJQ0sgKi8sICdgJywgJ2AnLCAnT0VNXzMnKTtcbiAgICBkZWZpbmUoMTEwIC8qIEFCTlRfQzEgKi8sICdBQk5UX0MxJyk7XG4gICAgZGVmaW5lKDExMSAvKiBBQk5UX0MyICovLCAnQUJOVF9DMicpO1xuICAgIGRlZmluZSg4NyAvKiBVU19PUEVOX1NRVUFSRV9CUkFDS0VUICovLCAnWycsICdbJywgJ09FTV80Jyk7XG4gICAgZGVmaW5lKDg4IC8qIFVTX0JBQ0tTTEFTSCAqLywgJ1xcXFwnLCAnXFxcXCcsICdPRU1fNScpO1xuICAgIGRlZmluZSg4OSAvKiBVU19DTE9TRV9TUVVBUkVfQlJBQ0tFVCAqLywgJ10nLCAnXScsICdPRU1fNicpO1xuICAgIGRlZmluZSg5MCAvKiBVU19RVU9URSAqLywgJ1xcJycsICdcXCcnLCAnT0VNXzcnKTtcbiAgICBkZWZpbmUoOTEgLyogT0VNXzggKi8sICdPRU1fOCcpO1xuICAgIGRlZmluZSg5MiAvKiBPRU1fMTAyICovLCAnT0VNXzEwMicpO1xuICAgIGRlZmluZSg5MyAvKiBOVU1QQURfMCAqLywgJ051bVBhZDAnKTtcbiAgICBkZWZpbmUoOTQgLyogTlVNUEFEXzEgKi8sICdOdW1QYWQxJyk7XG4gICAgZGVmaW5lKDk1IC8qIE5VTVBBRF8yICovLCAnTnVtUGFkMicpO1xuICAgIGRlZmluZSg5NiAvKiBOVU1QQURfMyAqLywgJ051bVBhZDMnKTtcbiAgICBkZWZpbmUoOTcgLyogTlVNUEFEXzQgKi8sICdOdW1QYWQ0Jyk7XG4gICAgZGVmaW5lKDk4IC8qIE5VTVBBRF81ICovLCAnTnVtUGFkNScpO1xuICAgIGRlZmluZSg5OSAvKiBOVU1QQURfNiAqLywgJ051bVBhZDYnKTtcbiAgICBkZWZpbmUoMTAwIC8qIE5VTVBBRF83ICovLCAnTnVtUGFkNycpO1xuICAgIGRlZmluZSgxMDEgLyogTlVNUEFEXzggKi8sICdOdW1QYWQ4Jyk7XG4gICAgZGVmaW5lKDEwMiAvKiBOVU1QQURfOSAqLywgJ051bVBhZDknKTtcbiAgICBkZWZpbmUoMTAzIC8qIE5VTVBBRF9NVUxUSVBMWSAqLywgJ051bVBhZF9NdWx0aXBseScpO1xuICAgIGRlZmluZSgxMDQgLyogTlVNUEFEX0FERCAqLywgJ051bVBhZF9BZGQnKTtcbiAgICBkZWZpbmUoMTA1IC8qIE5VTVBBRF9TRVBBUkFUT1IgKi8sICdOdW1QYWRfU2VwYXJhdG9yJyk7XG4gICAgZGVmaW5lKDEwNiAvKiBOVU1QQURfU1VCVFJBQ1QgKi8sICdOdW1QYWRfU3VidHJhY3QnKTtcbiAgICBkZWZpbmUoMTA3IC8qIE5VTVBBRF9ERUNJTUFMICovLCAnTnVtUGFkX0RlY2ltYWwnKTtcbiAgICBkZWZpbmUoMTA4IC8qIE5VTVBBRF9ESVZJREUgKi8sICdOdW1QYWRfRGl2aWRlJyk7XG59KSgpO1xuZXhwb3J0IHZhciBLZXlDb2RlVXRpbHM7XG4oZnVuY3Rpb24gKEtleUNvZGVVdGlscykge1xuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKGtleUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHVpTWFwLmtleUNvZGVUb1N0cihrZXlDb2RlKTtcbiAgICB9XG4gICAgS2V5Q29kZVV0aWxzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gICAgZnVuY3Rpb24gZnJvbVN0cmluZyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHVpTWFwLnN0clRvS2V5Q29kZShrZXkpO1xuICAgIH1cbiAgICBLZXlDb2RlVXRpbHMuZnJvbVN0cmluZyA9IGZyb21TdHJpbmc7XG4gICAgZnVuY3Rpb24gdG9Vc2VyU2V0dGluZ3NVUyhrZXlDb2RlKSB7XG4gICAgICAgIHJldHVybiB1c2VyU2V0dGluZ3NVU01hcC5rZXlDb2RlVG9TdHIoa2V5Q29kZSk7XG4gICAgfVxuICAgIEtleUNvZGVVdGlscy50b1VzZXJTZXR0aW5nc1VTID0gdG9Vc2VyU2V0dGluZ3NVUztcbiAgICBmdW5jdGlvbiB0b1VzZXJTZXR0aW5nc0dlbmVyYWwoa2V5Q29kZSkge1xuICAgICAgICByZXR1cm4gdXNlclNldHRpbmdzR2VuZXJhbE1hcC5rZXlDb2RlVG9TdHIoa2V5Q29kZSk7XG4gICAgfVxuICAgIEtleUNvZGVVdGlscy50b1VzZXJTZXR0aW5nc0dlbmVyYWwgPSB0b1VzZXJTZXR0aW5nc0dlbmVyYWw7XG4gICAgZnVuY3Rpb24gZnJvbVVzZXJTZXR0aW5ncyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJTZXR0aW5nc1VTTWFwLnN0clRvS2V5Q29kZShrZXkpIHx8IHVzZXJTZXR0aW5nc0dlbmVyYWxNYXAuc3RyVG9LZXlDb2RlKGtleSk7XG4gICAgfVxuICAgIEtleUNvZGVVdGlscy5mcm9tVXNlclNldHRpbmdzID0gZnJvbVVzZXJTZXR0aW5ncztcbn0pKEtleUNvZGVVdGlscyB8fCAoS2V5Q29kZVV0aWxzID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBLZXlDaG9yZChmaXJzdFBhcnQsIHNlY29uZFBhcnQpIHtcbiAgICB2YXIgY2hvcmRQYXJ0ID0gKChzZWNvbmRQYXJ0ICYgMHgwMDAwRkZGRikgPDwgMTYpID4+PiAwO1xuICAgIHJldHVybiAoZmlyc3RQYXJ0IHwgY2hvcmRQYXJ0KSA+Pj4gMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXliaW5kaW5nKGtleWJpbmRpbmcsIE9TKSB7XG4gICAgaWYgKGtleWJpbmRpbmcgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBmaXJzdFBhcnQgPSAoa2V5YmluZGluZyAmIDB4MDAwMEZGRkYpID4+PiAwO1xuICAgIHZhciBjaG9yZFBhcnQgPSAoa2V5YmluZGluZyAmIDB4RkZGRjAwMDApID4+PiAxNjtcbiAgICBpZiAoY2hvcmRQYXJ0ICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2hvcmRLZXliaW5kaW5nKFtcbiAgICAgICAgICAgIGNyZWF0ZVNpbXBsZUtleWJpbmRpbmcoZmlyc3RQYXJ0LCBPUyksXG4gICAgICAgICAgICBjcmVhdGVTaW1wbGVLZXliaW5kaW5nKGNob3JkUGFydCwgT1MpXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENob3JkS2V5YmluZGluZyhbY3JlYXRlU2ltcGxlS2V5YmluZGluZyhmaXJzdFBhcnQsIE9TKV0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpbXBsZUtleWJpbmRpbmcoa2V5YmluZGluZywgT1MpIHtcbiAgICB2YXIgY3RybENtZCA9IChrZXliaW5kaW5nICYgMjA0OCAvKiBDdHJsQ21kICovID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICB2YXIgd2luQ3RybCA9IChrZXliaW5kaW5nICYgMjU2IC8qIFdpbkN0cmwgKi8gPyB0cnVlIDogZmFsc2UpO1xuICAgIHZhciBjdHJsS2V5ID0gKE9TID09PSAyIC8qIE1hY2ludG9zaCAqLyA/IHdpbkN0cmwgOiBjdHJsQ21kKTtcbiAgICB2YXIgc2hpZnRLZXkgPSAoa2V5YmluZGluZyAmIDEwMjQgLyogU2hpZnQgKi8gPyB0cnVlIDogZmFsc2UpO1xuICAgIHZhciBhbHRLZXkgPSAoa2V5YmluZGluZyAmIDUxMiAvKiBBbHQgKi8gPyB0cnVlIDogZmFsc2UpO1xuICAgIHZhciBtZXRhS2V5ID0gKE9TID09PSAyIC8qIE1hY2ludG9zaCAqLyA/IGN0cmxDbWQgOiB3aW5DdHJsKTtcbiAgICB2YXIga2V5Q29kZSA9IChrZXliaW5kaW5nICYgMjU1IC8qIEtleUNvZGUgKi8pO1xuICAgIHJldHVybiBuZXcgU2ltcGxlS2V5YmluZGluZyhjdHJsS2V5LCBzaGlmdEtleSwgYWx0S2V5LCBtZXRhS2V5LCBrZXlDb2RlKTtcbn1cbnZhciBTaW1wbGVLZXliaW5kaW5nID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbXBsZUtleWJpbmRpbmcoY3RybEtleSwgc2hpZnRLZXksIGFsdEtleSwgbWV0YUtleSwga2V5Q29kZSkge1xuICAgICAgICB0aGlzLmN0cmxLZXkgPSBjdHJsS2V5O1xuICAgICAgICB0aGlzLnNoaWZ0S2V5ID0gc2hpZnRLZXk7XG4gICAgICAgIHRoaXMuYWx0S2V5ID0gYWx0S2V5O1xuICAgICAgICB0aGlzLm1ldGFLZXkgPSBtZXRhS2V5O1xuICAgICAgICB0aGlzLmtleUNvZGUgPSBrZXlDb2RlO1xuICAgIH1cbiAgICBTaW1wbGVLZXliaW5kaW5nLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmN0cmxLZXkgPT09IG90aGVyLmN0cmxLZXlcbiAgICAgICAgICAgICYmIHRoaXMuc2hpZnRLZXkgPT09IG90aGVyLnNoaWZ0S2V5XG4gICAgICAgICAgICAmJiB0aGlzLmFsdEtleSA9PT0gb3RoZXIuYWx0S2V5XG4gICAgICAgICAgICAmJiB0aGlzLm1ldGFLZXkgPT09IG90aGVyLm1ldGFLZXlcbiAgICAgICAgICAgICYmIHRoaXMua2V5Q29kZSA9PT0gb3RoZXIua2V5Q29kZSk7XG4gICAgfTtcbiAgICBTaW1wbGVLZXliaW5kaW5nLnByb3RvdHlwZS5pc01vZGlmaWVyS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMua2V5Q29kZSA9PT0gMCAvKiBVbmtub3duICovXG4gICAgICAgICAgICB8fCB0aGlzLmtleUNvZGUgPT09IDUgLyogQ3RybCAqL1xuICAgICAgICAgICAgfHwgdGhpcy5rZXlDb2RlID09PSA1NyAvKiBNZXRhICovXG4gICAgICAgICAgICB8fCB0aGlzLmtleUNvZGUgPT09IDYgLyogQWx0ICovXG4gICAgICAgICAgICB8fCB0aGlzLmtleUNvZGUgPT09IDQgLyogU2hpZnQgKi8pO1xuICAgIH07XG4gICAgU2ltcGxlS2V5YmluZGluZy5wcm90b3R5cGUudG9DaG9yZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDaG9yZEtleWJpbmRpbmcoW3RoaXNdKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERvZXMgdGhpcyBrZXliaW5kaW5nIHJlZmVyIHRvIHRoZSBrZXkgY29kZSBvZiBhIG1vZGlmaWVyIGFuZCBpdCBhbHNvIGhhcyB0aGUgbW9kaWZpZXIgZmxhZz9cbiAgICAgKi9cbiAgICBTaW1wbGVLZXliaW5kaW5nLnByb3RvdHlwZS5pc0R1cGxpY2F0ZU1vZGlmaWVyQ2FzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICgodGhpcy5jdHJsS2V5ICYmIHRoaXMua2V5Q29kZSA9PT0gNSAvKiBDdHJsICovKVxuICAgICAgICAgICAgfHwgKHRoaXMuc2hpZnRLZXkgJiYgdGhpcy5rZXlDb2RlID09PSA0IC8qIFNoaWZ0ICovKVxuICAgICAgICAgICAgfHwgKHRoaXMuYWx0S2V5ICYmIHRoaXMua2V5Q29kZSA9PT0gNiAvKiBBbHQgKi8pXG4gICAgICAgICAgICB8fCAodGhpcy5tZXRhS2V5ICYmIHRoaXMua2V5Q29kZSA9PT0gNTcgLyogTWV0YSAqLykpO1xuICAgIH07XG4gICAgcmV0dXJuIFNpbXBsZUtleWJpbmRpbmc7XG59KCkpO1xuZXhwb3J0IHsgU2ltcGxlS2V5YmluZGluZyB9O1xudmFyIENob3JkS2V5YmluZGluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaG9yZEtleWJpbmRpbmcocGFydHMpIHtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbEFyZ3VtZW50KFwicGFydHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJ0cyA9IHBhcnRzO1xuICAgIH1cbiAgICBDaG9yZEtleWJpbmRpbmcucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICBpZiAob3RoZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXJ0cy5sZW5ndGggIT09IG90aGVyLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcnRzW2ldLmVxdWFscyhvdGhlci5wYXJ0c1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2hvcmRLZXliaW5kaW5nO1xufSgpKTtcbmV4cG9ydCB7IENob3JkS2V5YmluZGluZyB9O1xudmFyIFJlc29sdmVkS2V5YmluZGluZ1BhcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVzb2x2ZWRLZXliaW5kaW5nUGFydChjdHJsS2V5LCBzaGlmdEtleSwgYWx0S2V5LCBtZXRhS2V5LCBrYkxhYmVsLCBrYkFyaWFMYWJlbCkge1xuICAgICAgICB0aGlzLmN0cmxLZXkgPSBjdHJsS2V5O1xuICAgICAgICB0aGlzLnNoaWZ0S2V5ID0gc2hpZnRLZXk7XG4gICAgICAgIHRoaXMuYWx0S2V5ID0gYWx0S2V5O1xuICAgICAgICB0aGlzLm1ldGFLZXkgPSBtZXRhS2V5O1xuICAgICAgICB0aGlzLmtleUxhYmVsID0ga2JMYWJlbDtcbiAgICAgICAgdGhpcy5rZXlBcmlhTGFiZWwgPSBrYkFyaWFMYWJlbDtcbiAgICB9XG4gICAgcmV0dXJuIFJlc29sdmVkS2V5YmluZGluZ1BhcnQ7XG59KCkpO1xuZXhwb3J0IHsgUmVzb2x2ZWRLZXliaW5kaW5nUGFydCB9O1xuLyoqXG4gKiBBIHJlc29sdmVkIGtleWJpbmRpbmcuIENhbiBiZSBhIHNpbXBsZSBrZXliaW5kaW5nIG9yIGEgY2hvcmQga2V5YmluZGluZy5cbiAqL1xudmFyIFJlc29sdmVkS2V5YmluZGluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZXNvbHZlZEtleWJpbmRpbmcoKSB7XG4gICAgfVxuICAgIHJldHVybiBSZXNvbHZlZEtleWJpbmRpbmc7XG59KCkpO1xuZXhwb3J0IHsgUmVzb2x2ZWRLZXliaW5kaW5nIH07XG4iLCJleHBvcnQgZnVuY3Rpb24gaXNEaXNwb3NhYmxlKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZy5kaXNwb3NlID09PSAnZnVuY3Rpb24nXG4gICAgICAgICYmIHRoaW5nLmRpc3Bvc2UubGVuZ3RoID09PSAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRpc3Bvc2UoZmlyc3QpIHtcbiAgICB2YXIgcmVzdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHJlc3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpcnN0KSkge1xuICAgICAgICBmaXJzdC5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkICYmIGQuZGlzcG9zZSgpOyB9KTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGlzcG9zZShmaXJzdCk7XG4gICAgICAgIGRpc3Bvc2UocmVzdCk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZWREaXNwb3NhYmxlKGRpc3Bvc2FibGVzKSB7XG4gICAgcmV0dXJuIHsgZGlzcG9zZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzcG9zZShkaXNwb3NhYmxlcyk7IH0gfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0Rpc3Bvc2FibGUoZm4pIHtcbiAgICByZXR1cm4geyBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7IGZuKCk7IH0gfTtcbn1cbnZhciBEaXNwb3NhYmxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpc3Bvc2FibGUoKSB7XG4gICAgICAgIHRoaXMuX3RvRGlzcG9zZSA9IFtdO1xuICAgICAgICB0aGlzLl9saWZlY3ljbGVfZGlzcG9zYWJsZV9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIERpc3Bvc2FibGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2xpZmVjeWNsZV9kaXNwb3NhYmxlX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl90b0Rpc3Bvc2UgPSBkaXNwb3NlKHRoaXMuX3RvRGlzcG9zZSk7XG4gICAgfTtcbiAgICBEaXNwb3NhYmxlLnByb3RvdHlwZS5fcmVnaXN0ZXIgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodGhpcy5fbGlmZWN5Y2xlX2Rpc3Bvc2FibGVfaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdSZWdpc3RlcmluZyBkaXNwb3NhYmxlIG9uIG9iamVjdCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gZGlzcG9zZWQuJyk7XG4gICAgICAgICAgICB0LmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RvRGlzcG9zZS5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgRGlzcG9zYWJsZS5Ob25lID0gT2JqZWN0LmZyZWV6ZSh7IGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHsgfSB9KTtcbiAgICByZXR1cm4gRGlzcG9zYWJsZTtcbn0oKSk7XG5leHBvcnQgeyBEaXNwb3NhYmxlIH07XG52YXIgSW1tb3J0YWxSZWZlcmVuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW1tb3J0YWxSZWZlcmVuY2Uob2JqZWN0KSB7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cbiAgICBJbW1vcnRhbFJlZmVyZW5jZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4gSW1tb3J0YWxSZWZlcmVuY2U7XG59KCkpO1xuZXhwb3J0IHsgSW1tb3J0YWxSZWZlcmVuY2UgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRklOIH0gZnJvbSAnLi9pdGVyYXRvci5qcyc7XG52YXIgTm9kZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOb2RlKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIE5vZGU7XG59KCkpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaW5rZWRMaXN0LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9maXJzdDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zZXJ0KGVsZW1lbnQsIGZhbHNlKTtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zZXJ0KGVsZW1lbnQsIHRydWUpO1xuICAgIH07XG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuX2luc2VydCA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdFRoZUVuZCkge1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLl9sYXN0ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdFRoZUVuZCkge1xuICAgICAgICAgICAgLy8gcHVzaFxuICAgICAgICAgICAgdmFyIG9sZExhc3QgPSB0aGlzLl9sYXN0O1xuICAgICAgICAgICAgdGhpcy5fbGFzdCA9IG5ld05vZGU7XG4gICAgICAgICAgICBuZXdOb2RlLnByZXYgPSBvbGRMYXN0O1xuICAgICAgICAgICAgb2xkTGFzdC5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVuc2hpZnRcbiAgICAgICAgICAgIHZhciBvbGRGaXJzdCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSBuZXdOb2RlO1xuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gb2xkRmlyc3Q7XG4gICAgICAgICAgICBvbGRGaXJzdC5wcmV2ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplICs9IDE7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmUuYmluZCh0aGlzLCBuZXdOb2RlKTtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZpcnN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuX2ZpcnN0LmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmUodGhpcy5fZmlyc3QpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuX3JlbW92ZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgd2hpbGUgKGNhbmRpZGF0ZSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUgIT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBjYW5kaWRhdGUubmV4dDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUucHJldiAmJiBjYW5kaWRhdGUubmV4dCkge1xuICAgICAgICAgICAgICAgIC8vIG1pZGRsZVxuICAgICAgICAgICAgICAgIHZhciBhbmNob3IgPSBjYW5kaWRhdGUucHJldjtcbiAgICAgICAgICAgICAgICBhbmNob3IubmV4dCA9IGNhbmRpZGF0ZS5uZXh0O1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZS5uZXh0LnByZXYgPSBhbmNob3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2FuZGlkYXRlLnByZXYgJiYgIWNhbmRpZGF0ZS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBub2RlXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjYW5kaWRhdGUubmV4dCkge1xuICAgICAgICAgICAgICAgIC8vIGxhc3RcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0ID0gdGhpcy5fbGFzdC5wcmV2O1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3QubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjYW5kaWRhdGUucHJldikge1xuICAgICAgICAgICAgICAgIC8vIGZpcnN0XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSB0aGlzLl9maXJzdC5uZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0LnByZXYgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb25lXG4gICAgICAgICAgICB0aGlzLl9zaXplIC09IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXRlcmF0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRklOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHsgZG9uZTogZmFsc2UsIHZhbHVlOiBub2RlLmVsZW1lbnQgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBub2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcbn0oKSk7XG5leHBvcnQgeyBMaW5rZWRMaXN0IH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCB2YXIgTEFOR1VBR0VfREVGQVVMVCA9ICdlbic7XG52YXIgX2lzV2luZG93cyA9IGZhbHNlO1xudmFyIF9pc01hY2ludG9zaCA9IGZhbHNlO1xudmFyIF9pc0xpbnV4ID0gZmFsc2U7XG52YXIgX2lzTmF0aXZlID0gZmFsc2U7XG52YXIgX2lzV2ViID0gZmFsc2U7XG52YXIgX2xvY2FsZSA9IHVuZGVmaW5lZDtcbnZhciBfbGFuZ3VhZ2UgPSBMQU5HVUFHRV9ERUZBVUxUO1xudmFyIF90cmFuc2xhdGlvbnNDb25maWdGaWxlID0gdW5kZWZpbmVkO1xudmFyIGlzRWxlY3Ryb25SZW5kZXJlciA9ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MudmVyc2lvbnMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9uICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpO1xuLy8gT1MgZGV0ZWN0aW9uXG5pZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgIWlzRWxlY3Ryb25SZW5kZXJlcikge1xuICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIF9pc1dpbmRvd3MgPSB1c2VyQWdlbnQuaW5kZXhPZignV2luZG93cycpID49IDA7XG4gICAgX2lzTWFjaW50b3NoID0gdXNlckFnZW50LmluZGV4T2YoJ01hY2ludG9zaCcpID49IDA7XG4gICAgX2lzTGludXggPSB1c2VyQWdlbnQuaW5kZXhPZignTGludXgnKSA+PSAwO1xuICAgIF9pc1dlYiA9IHRydWU7XG4gICAgX2xvY2FsZSA9IG5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICBfbGFuZ3VhZ2UgPSBfbG9jYWxlO1xufVxuZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnKSB7XG4gICAgX2lzV2luZG93cyA9IChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKTtcbiAgICBfaXNNYWNpbnRvc2ggPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpO1xuICAgIF9pc0xpbnV4ID0gKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpO1xuICAgIF9sb2NhbGUgPSBMQU5HVUFHRV9ERUZBVUxUO1xuICAgIF9sYW5ndWFnZSA9IExBTkdVQUdFX0RFRkFVTFQ7XG4gICAgdmFyIHJhd05sc0NvbmZpZyA9IHByb2Nlc3MuZW52WydWU0NPREVfTkxTX0NPTkZJRyddO1xuICAgIGlmIChyYXdObHNDb25maWcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBubHNDb25maWcgPSBKU09OLnBhcnNlKHJhd05sc0NvbmZpZyk7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZWQgPSBubHNDb25maWcuYXZhaWxhYmxlTGFuZ3VhZ2VzWycqJ107XG4gICAgICAgICAgICBfbG9jYWxlID0gbmxzQ29uZmlnLmxvY2FsZTtcbiAgICAgICAgICAgIC8vIFZTQ29kZSdzIGRlZmF1bHQgbGFuZ3VhZ2UgaXMgJ2VuJ1xuICAgICAgICAgICAgX2xhbmd1YWdlID0gcmVzb2x2ZWQgPyByZXNvbHZlZCA6IExBTkdVQUdFX0RFRkFVTFQ7XG4gICAgICAgICAgICBfdHJhbnNsYXRpb25zQ29uZmlnRmlsZSA9IG5sc0NvbmZpZy5fdHJhbnNsYXRpb25zQ29uZmlnRmlsZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc05hdGl2ZSA9IHRydWU7XG59XG52YXIgX3BsYXRmb3JtID0gMCAvKiBXZWIgKi87XG5pZiAoX2lzTmF0aXZlKSB7XG4gICAgaWYgKF9pc01hY2ludG9zaCkge1xuICAgICAgICBfcGxhdGZvcm0gPSAxIC8qIE1hYyAqLztcbiAgICB9XG4gICAgZWxzZSBpZiAoX2lzV2luZG93cykge1xuICAgICAgICBfcGxhdGZvcm0gPSAzIC8qIFdpbmRvd3MgKi87XG4gICAgfVxuICAgIGVsc2UgaWYgKF9pc0xpbnV4KSB7XG4gICAgICAgIF9wbGF0Zm9ybSA9IDIgLyogTGludXggKi87XG4gICAgfVxufVxuZXhwb3J0IHZhciBpc1dpbmRvd3MgPSBfaXNXaW5kb3dzO1xuZXhwb3J0IHZhciBpc01hY2ludG9zaCA9IF9pc01hY2ludG9zaDtcbmV4cG9ydCB2YXIgaXNMaW51eCA9IF9pc0xpbnV4O1xuZXhwb3J0IHZhciBpc05hdGl2ZSA9IF9pc05hdGl2ZTtcbmV4cG9ydCB2YXIgaXNXZWIgPSBfaXNXZWI7XG52YXIgX2dsb2JhbHMgPSAodHlwZW9mIHNlbGYgPT09ICdvYmplY3QnID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnID8gZ2xvYmFsIDoge30pO1xuZXhwb3J0IHZhciBnbG9iYWxzID0gX2dsb2JhbHM7XG52YXIgX3NldEltbWVkaWF0ZSA9IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgaWYgKF9zZXRJbW1lZGlhdGUgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGdsb2JhbHMuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgICAgICBfc2V0SW1tZWRpYXRlID0gZ2xvYmFscy5zZXRJbW1lZGlhdGUuYmluZChnbG9iYWxzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIF9zZXRJbW1lZGlhdGUgPSBwcm9jZXNzLm5leHRUaWNrLmJpbmQocHJvY2Vzcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfc2V0SW1tZWRpYXRlID0gZ2xvYmFscy5zZXRUaW1lb3V0LmJpbmQoZ2xvYmFscyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9zZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xufVxuZXhwb3J0IHZhciBPUyA9IChfaXNNYWNpbnRvc2ggPyAyIC8qIE1hY2ludG9zaCAqLyA6IChfaXNXaW5kb3dzID8gMSAvKiBXaW5kb3dzICovIDogMyAvKiBMaW51eCAqLykpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIFRoZSBlbXB0eSBzdHJpbmcuXG4gKi9cbmV4cG9ydCB2YXIgZW1wdHkgPSAnJztcbmV4cG9ydCBmdW5jdGlvbiBpc0ZhbHN5T3JXaGl0ZXNwYWNlKHN0cikge1xuICAgIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnRyaW0oKS5sZW5ndGggPT09IDA7XG59XG4vKipcbiAqIEByZXR1cm5zIHRoZSBwcm92aWRlZCBudW1iZXIgd2l0aCB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHByZWNlZGluZyB6ZXJvcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhZChuLCBsLCBjaGFyKSB7XG4gICAgaWYgKGNoYXIgPT09IHZvaWQgMCkgeyBjaGFyID0gJzAnOyB9XG4gICAgdmFyIHN0ciA9ICcnICsgbjtcbiAgICB2YXIgciA9IFtzdHJdO1xuICAgIGZvciAodmFyIGkgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHIucHVzaChjaGFyKTtcbiAgICB9XG4gICAgcmV0dXJuIHIucmV2ZXJzZSgpLmpvaW4oJycpO1xufVxudmFyIF9mb3JtYXRSZWdleHAgPSAveyhcXGQrKX0vZztcbi8qKlxuICogSGVscGVyIHRvIHByb2R1Y2UgYSBzdHJpbmcgd2l0aCBhIHZhcmlhYmxlIG51bWJlciBvZiBhcmd1bWVudHMuIEluc2VydCB2YXJpYWJsZSBzZWdtZW50c1xuICogaW50byB0aGUgc3RyaW5nIHVzaW5nIHRoZSB7bn0gbm90YXRpb24gd2hlcmUgTiBpcyB0aGUgaW5kZXggb2YgdGhlIGFyZ3VtZW50IGZvbGxvd2luZyB0aGUgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIHN0cmluZyB0byB3aGljaCBmb3JtYXR0aW5nIGlzIGFwcGxpZWRcbiAqIEBwYXJhbSBhcmdzIHJlcGxhY2VtZW50cyBmb3Ige259LWVudHJpZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh2YWx1ZSkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoX2Zvcm1hdFJlZ2V4cCwgZnVuY3Rpb24gKG1hdGNoLCBncm91cCkge1xuICAgICAgICB2YXIgaWR4ID0gcGFyc2VJbnQoZ3JvdXAsIDEwKTtcbiAgICAgICAgcmV0dXJuIGlzTmFOKGlkeCkgfHwgaWR4IDwgMCB8fCBpZHggPj0gYXJncy5sZW5ndGggP1xuICAgICAgICAgICAgbWF0Y2ggOlxuICAgICAgICAgICAgYXJnc1tpZHhdO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBIVE1MIGNoYXJhY3RlcnMgaW5zaWRlIHRoZSBzdHJpbmcgdG8gdXNlIGVudGl0aWVzIGluc3RlYWQuIE1ha2VzIHRoZSBzdHJpbmcgc2FmZSBmcm9tXG4gKiBiZWluZyB1c2VkIGUuZy4gaW4gSFRNTEVsZW1lbnQuaW5uZXJIVE1MLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC9bPD4mXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgICAgICAgY2FzZSAnPCc6IHJldHVybiAnJmx0Oyc7XG4gICAgICAgICAgICBjYXNlICc+JzogcmV0dXJuICcmZ3Q7JztcbiAgICAgICAgICAgIGNhc2UgJyYnOiByZXR1cm4gJyZhbXA7JztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBFc2NhcGVzIHJlZ3VsYXIgZXhwcmVzc2lvbiBjaGFyYWN0ZXJzIGluIGEgZ2l2ZW4gc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHBDaGFyYWN0ZXJzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1tcXC1cXFxcXFx7XFx9XFwqXFwrXFw/XFx8XFxeXFwkXFwuXFxbXFxdXFwoXFwpXFwjXS9nLCAnXFxcXCQmJyk7XG59XG4vKipcbiAqIFJlbW92ZXMgYWxsIG9jY3VycmVuY2VzIG9mIG5lZWRsZSBmcm9tIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBoYXlzdGFjay5cbiAqIEBwYXJhbSBoYXlzdGFjayBzdHJpbmcgdG8gdHJpbVxuICogQHBhcmFtIG5lZWRsZSB0aGUgdGhpbmcgdG8gdHJpbSAoZGVmYXVsdCBpcyBhIGJsYW5rKVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpbShoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgaWYgKG5lZWRsZSA9PT0gdm9pZCAwKSB7IG5lZWRsZSA9ICcgJzsgfVxuICAgIHZhciB0cmltbWVkID0gbHRyaW0oaGF5c3RhY2ssIG5lZWRsZSk7XG4gICAgcmV0dXJuIHJ0cmltKHRyaW1tZWQsIG5lZWRsZSk7XG59XG4vKipcbiAqIFJlbW92ZXMgYWxsIG9jY3VycmVuY2VzIG9mIG5lZWRsZSBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgaGF5c3RhY2suXG4gKiBAcGFyYW0gaGF5c3RhY2sgc3RyaW5nIHRvIHRyaW1cbiAqIEBwYXJhbSBuZWVkbGUgdGhlIHRoaW5nIHRvIHRyaW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGx0cmltKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICBpZiAoIWhheXN0YWNrIHx8ICFuZWVkbGUpIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrO1xuICAgIH1cbiAgICB2YXIgbmVlZGxlTGVuID0gbmVlZGxlLmxlbmd0aDtcbiAgICBpZiAobmVlZGxlTGVuID09PSAwIHx8IGhheXN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaGF5c3RhY2s7XG4gICAgfVxuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHdoaWxlIChoYXlzdGFjay5pbmRleE9mKG5lZWRsZSwgb2Zmc2V0KSA9PT0gb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCArIG5lZWRsZUxlbjtcbiAgICB9XG4gICAgcmV0dXJuIGhheXN0YWNrLnN1YnN0cmluZyhvZmZzZXQpO1xufVxuLyoqXG4gKiBSZW1vdmVzIGFsbCBvY2N1cnJlbmNlcyBvZiBuZWVkbGUgZnJvbSB0aGUgZW5kIG9mIGhheXN0YWNrLlxuICogQHBhcmFtIGhheXN0YWNrIHN0cmluZyB0byB0cmltXG4gKiBAcGFyYW0gbmVlZGxlIHRoZSB0aGluZyB0byB0cmltXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydHJpbShoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgaWYgKCFoYXlzdGFjayB8fCAhbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjaztcbiAgICB9XG4gICAgdmFyIG5lZWRsZUxlbiA9IG5lZWRsZS5sZW5ndGgsIGhheXN0YWNrTGVuID0gaGF5c3RhY2subGVuZ3RoO1xuICAgIGlmIChuZWVkbGVMZW4gPT09IDAgfHwgaGF5c3RhY2tMZW4gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0ID0gaGF5c3RhY2tMZW4sIGlkeCA9IC0xO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlkeCA9IGhheXN0YWNrLmxhc3RJbmRleE9mKG5lZWRsZSwgb2Zmc2V0IC0gMSk7XG4gICAgICAgIGlmIChpZHggPT09IC0xIHx8IGlkeCArIG5lZWRsZUxlbiAhPT0gb2Zmc2V0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWR4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gaWR4O1xuICAgIH1cbiAgICByZXR1cm4gaGF5c3RhY2suc3Vic3RyaW5nKDAsIG9mZnNldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydFNpbXBsZTJSZWdFeHBQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC9bXFwtXFxcXFxce1xcfVxcK1xcP1xcfFxcXlxcJFxcLlxcLFxcW1xcXVxcKFxcKVxcI1xcc10vZywgJ1xcXFwkJicpLnJlcGxhY2UoL1tcXCpdL2csICcuKicpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGhheXN0YWNrIHN0YXJ0cyB3aXRoIG5lZWRsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgIGlmIChoYXlzdGFjay5sZW5ndGggPCBuZWVkbGUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGhheXN0YWNrID09PSBuZWVkbGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVlZGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChoYXlzdGFja1tpXSAhPT0gbmVlZGxlW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIERldGVybWluZXMgaWYgaGF5c3RhY2sgZW5kcyB3aXRoIG5lZWRsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuZHNXaXRoKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICB2YXIgZGlmZiA9IGhheXN0YWNrLmxlbmd0aCAtIG5lZWRsZS5sZW5ndGg7XG4gICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjay5pbmRleE9mKG5lZWRsZSwgZGlmZikgPT09IGRpZmY7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpZmYgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrID09PSBuZWVkbGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZ0V4cChzZWFyY2hTdHJpbmcsIGlzUmVnZXgsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGlmICghc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSByZWdleCBmcm9tIGVtcHR5IHN0cmluZycpO1xuICAgIH1cbiAgICBpZiAoIWlzUmVnZXgpIHtcbiAgICAgICAgc2VhcmNoU3RyaW5nID0gZXNjYXBlUmVnRXhwQ2hhcmFjdGVycyhzZWFyY2hTdHJpbmcpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53aG9sZVdvcmQpIHtcbiAgICAgICAgaWYgKCEvXFxCLy50ZXN0KHNlYXJjaFN0cmluZy5jaGFyQXQoMCkpKSB7XG4gICAgICAgICAgICBzZWFyY2hTdHJpbmcgPSAnXFxcXGInICsgc2VhcmNoU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL1xcQi8udGVzdChzZWFyY2hTdHJpbmcuY2hhckF0KHNlYXJjaFN0cmluZy5sZW5ndGggLSAxKSkpIHtcbiAgICAgICAgICAgIHNlYXJjaFN0cmluZyA9IHNlYXJjaFN0cmluZyArICdcXFxcYic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG1vZGlmaWVycyA9ICcnO1xuICAgIGlmIChvcHRpb25zLmdsb2JhbCkge1xuICAgICAgICBtb2RpZmllcnMgKz0gJ2cnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMubWF0Y2hDYXNlKSB7XG4gICAgICAgIG1vZGlmaWVycyArPSAnaSc7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm11bHRpbGluZSkge1xuICAgICAgICBtb2RpZmllcnMgKz0gJ20nO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy51bmljb2RlKSB7XG4gICAgICAgIG1vZGlmaWVycyArPSAndSc7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKHNlYXJjaFN0cmluZywgbW9kaWZpZXJzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdFeHBMZWFkc1RvRW5kbGVzc0xvb3AocmVnZXhwKSB7XG4gICAgLy8gRXhpdCBlYXJseSBpZiBpdCdzIG9uZSBvZiB0aGVzZSBzcGVjaWFsIGNhc2VzIHdoaWNoIGFyZSBtZWFudCB0byBtYXRjaFxuICAgIC8vIGFnYWluc3QgYW4gZW1wdHkgc3RyaW5nXG4gICAgaWYgKHJlZ2V4cC5zb3VyY2UgPT09ICdeJyB8fCByZWdleHAuc291cmNlID09PSAnXiQnIHx8IHJlZ2V4cC5zb3VyY2UgPT09ICckJyB8fCByZWdleHAuc291cmNlID09PSAnXlxcXFxzKiQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gV2UgY2hlY2sgYWdhaW5zdCBhbiBlbXB0eSBzdHJpbmcuIElmIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gZG9lc24ndCBhZHZhbmNlXG4gICAgLy8gKGUuZy4gZW5kcyBpbiBhbiBlbmRsZXNzIGxvb3ApIGl0IHdpbGwgbWF0Y2ggYW4gZW1wdHkgc3RyaW5nLlxuICAgIHZhciBtYXRjaCA9IHJlZ2V4cC5leGVjKCcnKTtcbiAgICByZXR1cm4gISEobWF0Y2ggJiYgcmVnZXhwLmxhc3RJbmRleCA9PT0gMCk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnRXhwRmxhZ3MocmVnZXhwKSB7XG4gICAgcmV0dXJuIChyZWdleHAuZ2xvYmFsID8gJ2cnIDogJycpXG4gICAgICAgICsgKHJlZ2V4cC5pZ25vcmVDYXNlID8gJ2knIDogJycpXG4gICAgICAgICsgKHJlZ2V4cC5tdWx0aWxpbmUgPyAnbScgOiAnJylcbiAgICAgICAgKyAocmVnZXhwLnVuaWNvZGUgPyAndScgOiAnJyk7XG59XG4vKipcbiAqIFJldHVybnMgZmlyc3QgaW5kZXggb2YgdGhlIHN0cmluZyB0aGF0IGlzIG5vdCB3aGl0ZXNwYWNlLlxuICogSWYgc3RyaW5nIGlzIGVtcHR5IG9yIGNvbnRhaW5zIG9ubHkgd2hpdGVzcGFjZXMsIHJldHVybnMgLTFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0Tm9uV2hpdGVzcGFjZUluZGV4KHN0cikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGNoQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY2hDb2RlICE9PSAzMiAvKiBTcGFjZSAqLyAmJiBjaENvZGUgIT09IDkgLyogVGFiICovKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGxlYWRpbmcgd2hpdGVzcGFjZSBvZiB0aGUgc3RyaW5nLlxuICogSWYgdGhlIHN0cmluZyBjb250YWlucyBvbmx5IHdoaXRlc3BhY2VzLCByZXR1cm5zIGVudGlyZSBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExlYWRpbmdXaGl0ZXNwYWNlKHN0ciwgc3RhcnQsIGVuZCkge1xuICAgIGlmIChzdGFydCA9PT0gdm9pZCAwKSB7IHN0YXJ0ID0gMDsgfVxuICAgIGlmIChlbmQgPT09IHZvaWQgMCkgeyBlbmQgPSBzdHIubGVuZ3RoOyB9XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgdmFyIGNoQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY2hDb2RlICE9PSAzMiAvKiBTcGFjZSAqLyAmJiBjaENvZGUgIT09IDkgLyogVGFiICovKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG59XG4vKipcbiAqIFJldHVybnMgbGFzdCBpbmRleCBvZiB0aGUgc3RyaW5nIHRoYXQgaXMgbm90IHdoaXRlc3BhY2UuXG4gKiBJZiBzdHJpbmcgaXMgZW1wdHkgb3IgY29udGFpbnMgb25seSB3aGl0ZXNwYWNlcywgcmV0dXJucyAtMVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFzdE5vbldoaXRlc3BhY2VJbmRleChzdHIsIHN0YXJ0SW5kZXgpIHtcbiAgICBpZiAoc3RhcnRJbmRleCA9PT0gdm9pZCAwKSB7IHN0YXJ0SW5kZXggPSBzdHIubGVuZ3RoIC0gMTsgfVxuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgY2hDb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjaENvZGUgIT09IDMyIC8qIFNwYWNlICovICYmIGNoQ29kZSAhPT0gOSAvKiBUYWIgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID4gYikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0xvd2VyQXNjaWlMZXR0ZXIoY29kZSkge1xuICAgIHJldHVybiBjb2RlID49IDk3IC8qIGEgKi8gJiYgY29kZSA8PSAxMjIgLyogeiAqLztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1VwcGVyQXNjaWlMZXR0ZXIoY29kZSkge1xuICAgIHJldHVybiBjb2RlID49IDY1IC8qIEEgKi8gJiYgY29kZSA8PSA5MCAvKiBaICovO1xufVxuZnVuY3Rpb24gaXNBc2NpaUxldHRlcihjb2RlKSB7XG4gICAgcmV0dXJuIGlzTG93ZXJBc2NpaUxldHRlcihjb2RlKSB8fCBpc1VwcGVyQXNjaWlMZXR0ZXIoY29kZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzSWdub3JlQ2FzZShhLCBiKSB7XG4gICAgdmFyIGxlbjEgPSBhID8gYS5sZW5ndGggOiAwO1xuICAgIHZhciBsZW4yID0gYiA/IGIubGVuZ3RoIDogMDtcbiAgICBpZiAobGVuMSAhPT0gbGVuMikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBkb0VxdWFsc0lnbm9yZUNhc2UoYSwgYik7XG59XG5mdW5jdGlvbiBkb0VxdWFsc0lnbm9yZUNhc2UoYSwgYiwgc3RvcEF0KSB7XG4gICAgaWYgKHN0b3BBdCA9PT0gdm9pZCAwKSB7IHN0b3BBdCA9IGEubGVuZ3RoOyB9XG4gICAgaWYgKHR5cGVvZiBhICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3BBdDsgaSsrKSB7XG4gICAgICAgIHZhciBjb2RlQSA9IGEuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIGNvZGVCID0gYi5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY29kZUEgPT09IGNvZGVCKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhLXogQS1aXG4gICAgICAgIGlmIChpc0FzY2lpTGV0dGVyKGNvZGVBKSAmJiBpc0FzY2lpTGV0dGVyKGNvZGVCKSkge1xuICAgICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLmFicyhjb2RlQSAtIGNvZGVCKTtcbiAgICAgICAgICAgIGlmIChkaWZmICE9PSAwICYmIGRpZmYgIT09IDMyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFueSBvdGhlciBjaGFyY29kZVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVBKS50b0xvd2VyQ2FzZSgpICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVCKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0c1dpdGhJZ25vcmVDYXNlKHN0ciwgY2FuZGlkYXRlKSB7XG4gICAgdmFyIGNhbmRpZGF0ZUxlbmd0aCA9IGNhbmRpZGF0ZS5sZW5ndGg7XG4gICAgaWYgKGNhbmRpZGF0ZS5sZW5ndGggPiBzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGRvRXF1YWxzSWdub3JlQ2FzZShzdHIsIGNhbmRpZGF0ZSwgY2FuZGlkYXRlTGVuZ3RoKTtcbn1cbi8qKlxuICogQHJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgY29tbW9uIHByZWZpeCBvZiB0aGUgdHdvIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25QcmVmaXhMZW5ndGgoYSwgYikge1xuICAgIHZhciBpLCBsZW4gPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoYS5jaGFyQ29kZUF0KGkpICE9PSBiLmNoYXJDb2RlQXQoaSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW47XG59XG4vKipcbiAqIEByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIGNvbW1vbiBzdWZmaXggb2YgdGhlIHR3byBzdHJpbmdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uU3VmZml4TGVuZ3RoKGEsIGIpIHtcbiAgICB2YXIgaSwgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgICB2YXIgYUxhc3RJbmRleCA9IGEubGVuZ3RoIC0gMTtcbiAgICB2YXIgYkxhc3RJbmRleCA9IGIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGEuY2hhckNvZGVBdChhTGFzdEluZGV4IC0gaSkgIT09IGIuY2hhckNvZGVBdChiTGFzdEluZGV4IC0gaSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW47XG59XG4vLyAtLS0gdW5pY29kZVxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TdXJyb2dhdGVfcGFpclxuLy8gUmV0dXJucyB0aGUgY29kZSBwb2ludCBzdGFydGluZyBhdCBhIHNwZWNpZmllZCBpbmRleCBpbiBhIHN0cmluZ1xuLy8gQ29kZSBwb2ludHMgVSswMDAwIHRvIFUrRDdGRiBhbmQgVStFMDAwIHRvIFUrRkZGRiBhcmUgcmVwcmVzZW50ZWQgb24gYSBzaW5nbGUgY2hhcmFjdGVyXG4vLyBDb2RlIHBvaW50cyBVKzEwMDAwIHRvIFUrMTBGRkZGIGFyZSByZXByZXNlbnRlZCBvbiB0d28gY29uc2VjdXRpdmUgY2hhcmFjdGVyc1xuLy9leHBvcnQgZnVuY3Rpb24gZ2V0VW5pY29kZVBvaW50KHN0cjpzdHJpbmcsIGluZGV4Om51bWJlciwgbGVuOm51bWJlcik6bnVtYmVyIHtcbi8vXHRsZXQgY2hyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGluZGV4KTtcbi8vXHRpZiAoMHhEODAwIDw9IGNockNvZGUgJiYgY2hyQ29kZSA8PSAweERCRkYgJiYgaW5kZXggKyAxIDwgbGVuKSB7XG4vL1x0XHRsZXQgbmV4dENockNvZGUgPSBzdHIuY2hhckNvZGVBdChpbmRleCArIDEpO1xuLy9cdFx0aWYgKDB4REMwMCA8PSBuZXh0Q2hyQ29kZSAmJiBuZXh0Q2hyQ29kZSA8PSAweERGRkYpIHtcbi8vXHRcdFx0cmV0dXJuIChjaHJDb2RlIC0gMHhEODAwKSA8PCAxMCArIChuZXh0Q2hyQ29kZSAtIDB4REMwMCkgKyAweDEwMDAwO1xuLy9cdFx0fVxuLy9cdH1cbi8vXHRyZXR1cm4gY2hyQ29kZTtcbi8vfVxuZXhwb3J0IGZ1bmN0aW9uIGlzSGlnaFN1cnJvZ2F0ZShjaGFyQ29kZSkge1xuICAgIHJldHVybiAoMHhEODAwIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IDB4REJGRik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNMb3dTdXJyb2dhdGUoY2hhckNvZGUpIHtcbiAgICByZXR1cm4gKDB4REMwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweERGRkYpO1xufVxuLyoqXG4gKiBHZW5lcmF0ZWQgdXNpbmcgaHR0cHM6Ly9naXRodWIuY29tL2FsZXhhbmRydWRpbWEvdW5pY29kZS11dGlscy9ibG9iL21hc3Rlci9nZW5lcmF0ZS1ydGwtdGVzdC5qc1xuICovXG52YXIgQ09OVEFJTlNfUlRMID0gLyg/OltcXHUwNUJFXFx1MDVDMFxcdTA1QzNcXHUwNUM2XFx1MDVEMC1cXHUwNUY0XFx1MDYwOFxcdTA2MEJcXHUwNjBEXFx1MDYxQi1cXHUwNjRBXFx1MDY2RC1cXHUwNjZGXFx1MDY3MS1cXHUwNkQ1XFx1MDZFNVxcdTA2RTZcXHUwNkVFXFx1MDZFRlxcdTA2RkEtXFx1MDcxMFxcdTA3MTItXFx1MDcyRlxcdTA3NEQtXFx1MDdBNVxcdTA3QjEtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQS1cXHUwODE1XFx1MDgxQVxcdTA4MjRcXHUwODI4XFx1MDgzMC1cXHUwODU4XFx1MDg1RS1cXHUwOEJEXFx1MjAwRlxcdUZCMURcXHVGQjFGLVxcdUZCMjhcXHVGQjJBLVxcdUZEM0RcXHVGRDUwLVxcdUZERkNcXHVGRTcwLVxcdUZFRkNdfFxcdUQ4MDJbXFx1REMwMC1cXHVERDFCXFx1REQyMC1cXHVERTAwXFx1REUxMC1cXHVERTMzXFx1REU0MC1cXHVERUU0XFx1REVFQi1cXHVERjM1XFx1REY0MC1cXHVERkZGXXxcXHVEODAzW1xcdURDMDAtXFx1RENGRl18XFx1RDgzQVtcXHVEQzAwLVxcdURDQ0ZcXHVERDAwLVxcdURENDNcXHVERDUwLVxcdURGRkZdfFxcdUQ4M0JbXFx1REMwMC1cXHVERUJCXSkvO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHN0cmAgY29udGFpbnMgYW55IFVuaWNvZGUgY2hhcmFjdGVyIHRoYXQgaXMgY2xhc3NpZmllZCBhcyBcIlJcIiBvciBcIkFMXCIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc1JUTChzdHIpIHtcbiAgICByZXR1cm4gQ09OVEFJTlNfUlRMLnRlc3Qoc3RyKTtcbn1cbi8qKlxuICogR2VuZXJhdGVkIHVzaW5nIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4YW5kcnVkaW1hL3VuaWNvZGUtdXRpbHMvYmxvYi9tYXN0ZXIvZ2VuZXJhdGUtZW1vamktdGVzdC5qc1xuICovXG52YXIgQ09OVEFJTlNfRU1PSkkgPSAvKD86W1xcdTIzMUFcXHUyMzFCXFx1MjNGMFxcdTIzRjNcXHUyNjAwLVxcdTI3QkZcXHUyQjUwXFx1MkI1NV18XFx1RDgzQ1tcXHVEREU2LVxcdURERkZcXHVERjAwLVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVERTRGXFx1REU4MC1cXHVERUY4XXxcXHVEODNFW1xcdUREMDAtXFx1RERFNl0pLztcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc0Vtb2ppKHN0cikge1xuICAgIHJldHVybiBDT05UQUlOU19FTU9KSS50ZXN0KHN0cik7XG59XG52YXIgSVNfQkFTSUNfQVNDSUkgPSAvXltcXHRcXG5cXHJcXHgyMC1cXHg3RV0qJC87XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBgc3RyYCBjb250YWlucyBvbmx5IGJhc2ljIEFTQ0lJIGNoYXJhY3RlcnMgaW4gdGhlIHJhbmdlIDMyIC0gMTI2IChpbmNsdWRpbmcgMzIgYW5kIDEyNikgb3IgXFxuLCBcXHIsIFxcdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCYXNpY0FTQ0lJKHN0cikge1xuICAgIHJldHVybiBJU19CQVNJQ19BU0NJSS50ZXN0KHN0cik7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNGdWxsV2lkdGhDaGFyYWN0ZXIoc3RyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaXNGdWxsV2lkdGhDaGFyYWN0ZXIoc3RyLmNoYXJDb2RlQXQoaSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNGdWxsV2lkdGhDaGFyYWN0ZXIoY2hhckNvZGUpIHtcbiAgICAvLyBEbyBhIGNoZWFwIHRyaWNrIHRvIGJldHRlciBzdXBwb3J0IHdyYXBwaW5nIG9mIHdpZGUgY2hhcmFjdGVycywgdHJlYXQgdGhlbSBhcyAyIGNvbHVtbnNcbiAgICAvLyBodHRwOi8vanJncmFwaGl4Lm5ldC9yZXNlYXJjaC91bmljb2RlX2Jsb2Nrcy5waHBcbiAgICAvLyAgICAgICAgICAyRTgwIOKAlCAyRUZGICAgQ0pLIFJhZGljYWxzIFN1cHBsZW1lbnRcbiAgICAvLyAgICAgICAgICAyRjAwIOKAlCAyRkRGICAgS2FuZ3hpIFJhZGljYWxzXG4gICAgLy8gICAgICAgICAgMkZGMCDigJQgMkZGRiAgIElkZW9ncmFwaGljIERlc2NyaXB0aW9uIENoYXJhY3RlcnNcbiAgICAvLyAgICAgICAgICAzMDAwIOKAlCAzMDNGICAgQ0pLIFN5bWJvbHMgYW5kIFB1bmN0dWF0aW9uXG4gICAgLy8gICAgICAgICAgMzA0MCDigJQgMzA5RiAgIEhpcmFnYW5hXG4gICAgLy8gICAgICAgICAgMzBBMCDigJQgMzBGRiAgIEthdGFrYW5hXG4gICAgLy8gICAgICAgICAgMzEwMCDigJQgMzEyRiAgIEJvcG9tb2ZvXG4gICAgLy8gICAgICAgICAgMzEzMCDigJQgMzE4RiAgIEhhbmd1bCBDb21wYXRpYmlsaXR5IEphbW9cbiAgICAvLyAgICAgICAgICAzMTkwIOKAlCAzMTlGICAgS2FuYnVuXG4gICAgLy8gICAgICAgICAgMzFBMCDigJQgMzFCRiAgIEJvcG9tb2ZvIEV4dGVuZGVkXG4gICAgLy8gICAgICAgICAgMzFGMCDigJQgMzFGRiAgIEthdGFrYW5hIFBob25ldGljIEV4dGVuc2lvbnNcbiAgICAvLyAgICAgICAgICAzMjAwIOKAlCAzMkZGICAgRW5jbG9zZWQgQ0pLIExldHRlcnMgYW5kIE1vbnRoc1xuICAgIC8vICAgICAgICAgIDMzMDAg4oCUIDMzRkYgICBDSksgQ29tcGF0aWJpbGl0eVxuICAgIC8vICAgICAgICAgIDM0MDAg4oCUIDREQkYgICBDSksgVW5pZmllZCBJZGVvZ3JhcGhzIEV4dGVuc2lvbiBBXG4gICAgLy8gICAgICAgICAgNERDMCDigJQgNERGRiAgIFlpamluZyBIZXhhZ3JhbSBTeW1ib2xzXG4gICAgLy8gICAgICAgICAgNEUwMCDigJQgOUZGRiAgIENKSyBVbmlmaWVkIElkZW9ncmFwaHNcbiAgICAvLyAgICAgICAgICBBMDAwIOKAlCBBNDhGICAgWWkgU3lsbGFibGVzXG4gICAgLy8gICAgICAgICAgQTQ5MCDigJQgQTRDRiAgIFlpIFJhZGljYWxzXG4gICAgLy8gICAgICAgICAgQUMwMCDigJQgRDdBRiAgIEhhbmd1bCBTeWxsYWJsZXNcbiAgICAvLyBbSUdOT1JFXSBEODAwIOKAlCBEQjdGICAgSGlnaCBTdXJyb2dhdGVzXG4gICAgLy8gW0lHTk9SRV0gREI4MCDigJQgREJGRiAgIEhpZ2ggUHJpdmF0ZSBVc2UgU3Vycm9nYXRlc1xuICAgIC8vIFtJR05PUkVdIERDMDAg4oCUIERGRkYgICBMb3cgU3Vycm9nYXRlc1xuICAgIC8vIFtJR05PUkVdIEUwMDAg4oCUIEY4RkYgICBQcml2YXRlIFVzZSBBcmVhXG4gICAgLy8gICAgICAgICAgRjkwMCDigJQgRkFGRiAgIENKSyBDb21wYXRpYmlsaXR5IElkZW9ncmFwaHNcbiAgICAvLyBbSUdOT1JFXSBGQjAwIOKAlCBGQjRGICAgQWxwaGFiZXRpYyBQcmVzZW50YXRpb24gRm9ybXNcbiAgICAvLyBbSUdOT1JFXSBGQjUwIOKAlCBGREZGICAgQXJhYmljIFByZXNlbnRhdGlvbiBGb3Jtcy1BXG4gICAgLy8gW0lHTk9SRV0gRkUwMCDigJQgRkUwRiAgIFZhcmlhdGlvbiBTZWxlY3RvcnNcbiAgICAvLyBbSUdOT1JFXSBGRTIwIOKAlCBGRTJGICAgQ29tYmluaW5nIEhhbGYgTWFya3NcbiAgICAvLyBbSUdOT1JFXSBGRTMwIOKAlCBGRTRGICAgQ0pLIENvbXBhdGliaWxpdHkgRm9ybXNcbiAgICAvLyBbSUdOT1JFXSBGRTUwIOKAlCBGRTZGICAgU21hbGwgRm9ybSBWYXJpYW50c1xuICAgIC8vIFtJR05PUkVdIEZFNzAg4oCUIEZFRkYgICBBcmFiaWMgUHJlc2VudGF0aW9uIEZvcm1zLUJcbiAgICAvLyAgICAgICAgICBGRjAwIOKAlCBGRkVGICAgSGFsZndpZHRoIGFuZCBGdWxsd2lkdGggRm9ybXNcbiAgICAvLyAgICAgICAgICAgICAgIFtodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IYWxmd2lkdGhfYW5kX2Z1bGx3aWR0aF9mb3Jtc11cbiAgICAvLyAgICAgICAgICAgICAgIG9mIHdoaWNoIEZGMDEgLSBGRjVFIGZ1bGx3aWR0aCBBU0NJSSBvZiAyMSB0byA3RVxuICAgIC8vIFtJR05PUkVdICAgIGFuZCBGRjY1IC0gRkZEQyBoYWxmd2lkdGggb2YgS2F0YWthbmEgYW5kIEhhbmd1bFxuICAgIC8vIFtJR05PUkVdIEZGRjAg4oCUIEZGRkYgICBTcGVjaWFsc1xuICAgIGNoYXJDb2RlID0gK2NoYXJDb2RlOyAvLyBAcGVyZlxuICAgIHJldHVybiAoKGNoYXJDb2RlID49IDB4MkU4MCAmJiBjaGFyQ29kZSA8PSAweEQ3QUYpXG4gICAgICAgIHx8IChjaGFyQ29kZSA+PSAweEY5MDAgJiYgY2hhckNvZGUgPD0gMHhGQUZGKVxuICAgICAgICB8fCAoY2hhckNvZGUgPj0gMHhGRjAxICYmIGNoYXJDb2RlIDw9IDB4RkY1RSkpO1xufVxuLy8gLS0gVVRGLTggQk9NXG5leHBvcnQgdmFyIFVURjhfQk9NX0NIQVJBQ1RFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUyNzkgLyogVVRGOF9CT00gKi8pO1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0c1dpdGhVVEY4Qk9NKHN0cikge1xuICAgIHJldHVybiAhIShzdHIgJiYgc3RyLmxlbmd0aCA+IDAgJiYgc3RyLmNoYXJDb2RlQXQoMCkgPT09IDY1Mjc5IC8qIFVURjhfQk9NICovKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzYWZlQnRvYShzdHIpIHtcbiAgICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKSk7IC8vIHdlIHVzZSBlbmNvZGVVUklDb21wb25lbnQgYmVjYXVzZSBidG9hIGZhaWxzIGZvciBub24gTGF0aW4gMSB2YWx1ZXNcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQocywgY291bnQpIHtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgX3R5cGVvZiA9IHtcbiAgICBudW1iZXI6ICdudW1iZXInLFxuICAgIHN0cmluZzogJ3N0cmluZycsXG4gICAgdW5kZWZpbmVkOiAndW5kZWZpbmVkJyxcbiAgICBvYmplY3Q6ICdvYmplY3QnLFxuICAgIGZ1bmN0aW9uOiAnZnVuY3Rpb24nXG59O1xuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYSBKYXZhU2NyaXB0IEFycmF5IG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkoYXJyYXkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheSk7XG4gICAgfVxuICAgIGlmIChhcnJheSAmJiB0eXBlb2YgKGFycmF5Lmxlbmd0aCkgPT09IF90eXBlb2YubnVtYmVyICYmIGFycmF5LmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYSBKYXZhU2NyaXB0IFN0cmluZyBvciBub3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhzdHIpIHtcbiAgICBpZiAodHlwZW9mIChzdHIpID09PSBfdHlwZW9mLnN0cmluZyB8fCBzdHIgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICpcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyBvZiB0eXBlIGBvYmplY3RgIGJ1dCAqKm5vdCoqXG4gKlx0YG51bGxgLCBhbiBgYXJyYXlgLCBhIGByZWdleHBgLCBub3IgYSBgZGF0ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICAvLyBUaGUgbWV0aG9kIGNhbid0IGRvIGEgdHlwZSBjYXN0IHNpbmNlIHRoZXJlIGFyZSB0eXBlIChsaWtlIHN0cmluZ3MpIHdoaWNoXG4gICAgLy8gYXJlIHN1YmNsYXNzZXMgb2YgYW55IHB1dCBub3QgcG9zaXR2ZWx5IG1hdGNoZWQgYnkgdGhlIGZ1bmN0aW9uLiBIZW5jZSB0eXBlXG4gICAgLy8gbmFycm93aW5nIHJlc3VsdHMgaW4gd3JvbmcgcmVzdWx0cy5cbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gX3R5cGVvZi5vYmplY3RcbiAgICAgICAgJiYgb2JqICE9PSBudWxsXG4gICAgICAgICYmICFBcnJheS5pc0FycmF5KG9iailcbiAgICAgICAgJiYgIShvYmogaW5zdGFuY2VvZiBSZWdFeHApXG4gICAgICAgICYmICEob2JqIGluc3RhbmNlb2YgRGF0ZSk7XG59XG4vKipcbiAqIEluICoqY29udHJhc3QqKiB0byBqdXN0IGNoZWNraW5nIGB0eXBlb2ZgIHRoaXMgd2lsbCByZXR1cm4gYGZhbHNlYCBmb3IgYE5hTmAuXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYSBKYXZhU2NyaXB0IE51bWJlciBvciBub3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmopIHtcbiAgICBpZiAoKHR5cGVvZiAob2JqKSA9PT0gX3R5cGVvZi5udW1iZXIgfHwgb2JqIGluc3RhbmNlb2YgTnVtYmVyKSAmJiAhaXNOYU4ob2JqKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYSBKYXZhU2NyaXB0IEJvb2xlYW4gb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZTtcbn1cbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICAgIHJldHVybiB0eXBlb2YgKG9iaikgPT09IF90eXBlb2YudW5kZWZpbmVkO1xufVxuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbChvYmopIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQob2JqKSB8fCBvYmogPT09IG51bGw7XG59XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYW4gZW1wdHkgSmF2YVNjcmlwdCBPYmplY3Qgb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmopIHtcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYSBKYXZhU2NyaXB0IEZ1bmN0aW9uIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IF90eXBlb2YuZnVuY3Rpb247XG59XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVDb25zdHJhaW50cyhhcmdzLCBjb25zdHJhaW50cykge1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihhcmdzLmxlbmd0aCwgY29uc3RyYWludHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ29uc3RyYWludChhcmdzW2ldLCBjb25zdHJhaW50c1tpXSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ29uc3RyYWludChhcmcsIGNvbnN0cmFpbnQpIHtcbiAgICBpZiAoaXNTdHJpbmcoY29uc3RyYWludCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgIT09IGNvbnN0cmFpbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFyZ3VtZW50IGRvZXMgbm90IG1hdGNoIGNvbnN0cmFpbnQ6IHR5cGVvZiBcIiArIGNvbnN0cmFpbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24oY29uc3RyYWludCkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBjb25zdHJhaW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZE9yTnVsbChhcmcpICYmIGFyZy5jb25zdHJ1Y3RvciA9PT0gY29uc3RyYWludCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25zdHJhaW50Lmxlbmd0aCA9PT0gMSAmJiBjb25zdHJhaW50LmNhbGwodW5kZWZpbmVkLCBhcmcpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJndW1lbnQgZG9lcyBub3QgbWF0Y2ggb25lIG9mIHRoZXNlIGNvbnN0cmFpbnRzOiBhcmcgaW5zdGFuY2VvZiBjb25zdHJhaW50LCBhcmcuY29uc3RydWN0b3IgPT09IGNvbnN0cmFpbnQsIG5vciBjb25zdHJhaW50KGFyZykgPT09IHRydWVcIik7XG4gICAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCBvZiB0aGUgcHJvdmlkZWQgY2xhc3MgYW5kIHdpbGwgY2FsbCB0aGUgY29uc3RydWN0b3Igd2l0aFxuICogYW55IGFkZGl0aW9uYWwgYXJndW1lbnQgc3VwcGxpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoY3Rvcikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIF9hO1xuICAgIGlmIChpc05hdGl2ZUNsYXNzKGN0b3IpKSB7XG4gICAgICAgIHJldHVybiBuZXcgKChfYSA9IGN0b3IpLmJpbmQuYXBwbHkoX2EsIFt2b2lkIDBdLmNvbmNhdChhcmdzKSkpKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgb2JqID0gT2JqZWN0LmNyZWF0ZShjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgIGN0b3IuYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG59XG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzIyMzU2NDUvMTQ5OTE1OVxuZnVuY3Rpb24gaXNOYXRpdmVDbGFzcyh0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbidcbiAgICAgICAgJiYgdGhpbmcuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpXG4gICAgICAgICYmICF0aGluZy5oYXNPd25Qcm9wZXJ0eSgnYXJndW1lbnRzJyk7XG59XG4vKipcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgd2hpbGUgKE9iamVjdC5wcm90b3R5cGUgIT09IHByb3RvKSB7XG4gICAgICAgIHJlcyA9IHJlcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pKTtcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfYTtcbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gJy4vcGxhdGZvcm0uanMnO1xudmFyIF9zY2hlbWVQYXR0ZXJuID0gL15cXHdbXFx3XFxkKy4tXSokLztcbnZhciBfc2luZ2xlU2xhc2hTdGFydCA9IC9eXFwvLztcbnZhciBfZG91YmxlU2xhc2hTdGFydCA9IC9eXFwvXFwvLztcbnZhciBfdGhyb3dPbk1pc3NpbmdTY2hlbWEgPSB0cnVlO1xuZnVuY3Rpb24gX3ZhbGlkYXRlVXJpKHJldCwgX3N0cmljdCkge1xuICAgIC8vIHNjaGVtZSwgbXVzdCBiZSBzZXRcbiAgICBpZiAoIXJldC5zY2hlbWUpIHtcbiAgICAgICAgaWYgKF9zdHJpY3QgfHwgX3Rocm93T25NaXNzaW5nU2NoZW1hKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbVXJpRXJyb3JdOiBTY2hlbWUgaXMgbWlzc2luZzoge3NjaGVtZTogXFxcIlxcXCIsIGF1dGhvcml0eTogXFxcIlwiICsgcmV0LmF1dGhvcml0eSArIFwiXFxcIiwgcGF0aDogXFxcIlwiICsgcmV0LnBhdGggKyBcIlxcXCIsIHF1ZXJ5OiBcXFwiXCIgKyByZXQucXVlcnkgKyBcIlxcXCIsIGZyYWdtZW50OiBcXFwiXCIgKyByZXQuZnJhZ21lbnQgKyBcIlxcXCJ9XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW1VyaUVycm9yXTogU2NoZW1lIGlzIG1pc3Npbmc6IHtzY2hlbWU6IFxcXCJcXFwiLCBhdXRob3JpdHk6IFxcXCJcIiArIHJldC5hdXRob3JpdHkgKyBcIlxcXCIsIHBhdGg6IFxcXCJcIiArIHJldC5wYXRoICsgXCJcXFwiLCBxdWVyeTogXFxcIlwiICsgcmV0LnF1ZXJ5ICsgXCJcXFwiLCBmcmFnbWVudDogXFxcIlwiICsgcmV0LmZyYWdtZW50ICsgXCJcXFwifVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBzY2hlbWUsIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4xXG4gICAgLy8gQUxQSEEgKiggQUxQSEEgLyBESUdJVCAvIFwiK1wiIC8gXCItXCIgLyBcIi5cIiApXG4gICAgaWYgKHJldC5zY2hlbWUgJiYgIV9zY2hlbWVQYXR0ZXJuLnRlc3QocmV0LnNjaGVtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVXJpRXJyb3JdOiBTY2hlbWUgY29udGFpbnMgaWxsZWdhbCBjaGFyYWN0ZXJzLicpO1xuICAgIH1cbiAgICAvLyBwYXRoLCBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4zXG4gICAgLy8gSWYgYSBVUkkgY29udGFpbnMgYW4gYXV0aG9yaXR5IGNvbXBvbmVudCwgdGhlbiB0aGUgcGF0aCBjb21wb25lbnRcbiAgICAvLyBtdXN0IGVpdGhlciBiZSBlbXB0eSBvciBiZWdpbiB3aXRoIGEgc2xhc2ggKFwiL1wiKSBjaGFyYWN0ZXIuICBJZiBhIFVSSVxuICAgIC8vIGRvZXMgbm90IGNvbnRhaW4gYW4gYXV0aG9yaXR5IGNvbXBvbmVudCwgdGhlbiB0aGUgcGF0aCBjYW5ub3QgYmVnaW5cbiAgICAvLyB3aXRoIHR3byBzbGFzaCBjaGFyYWN0ZXJzIChcIi8vXCIpLlxuICAgIGlmIChyZXQucGF0aCkge1xuICAgICAgICBpZiAocmV0LmF1dGhvcml0eSkge1xuICAgICAgICAgICAgaWYgKCFfc2luZ2xlU2xhc2hTdGFydC50ZXN0KHJldC5wYXRoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1VyaUVycm9yXTogSWYgYSBVUkkgY29udGFpbnMgYW4gYXV0aG9yaXR5IGNvbXBvbmVudCwgdGhlbiB0aGUgcGF0aCBjb21wb25lbnQgbXVzdCBlaXRoZXIgYmUgZW1wdHkgb3IgYmVnaW4gd2l0aCBhIHNsYXNoIChcIi9cIikgY2hhcmFjdGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoX2RvdWJsZVNsYXNoU3RhcnQudGVzdChyZXQucGF0aCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tVcmlFcnJvcl06IElmIGEgVVJJIGRvZXMgbm90IGNvbnRhaW4gYW4gYXV0aG9yaXR5IGNvbXBvbmVudCwgdGhlbiB0aGUgcGF0aCBjYW5ub3QgYmVnaW4gd2l0aCB0d28gc2xhc2ggY2hhcmFjdGVycyAoXCIvL1wiKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLy8gaW1wbGVtZW50cyBhIGJpdCBvZiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTVcbmZ1bmN0aW9uIF9yZWZlcmVuY2VSZXNvbHV0aW9uKHNjaGVtZSwgcGF0aCkge1xuICAgIC8vIHRoZSBzbGFzaC1jaGFyYWN0ZXIgaXMgb3VyICdkZWZhdWx0IGJhc2UnIGFzIHdlIGRvbid0XG4gICAgLy8gc3VwcG9ydCBjb25zdHJ1Y3RpbmcgVVJJcyByZWxhdGl2ZSB0byBvdGhlciBVUklzLiBUaGlzXG4gICAgLy8gYWxzbyBtZWFucyB0aGF0IHdlIGFsdGVyIGFuZCBwb3RlbnRpYWxseSBicmVhayBwYXRocy5cbiAgICAvLyBzZWUgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01LjEuNFxuICAgIHN3aXRjaCAoc2NoZW1lKSB7XG4gICAgICAgIGNhc2UgJ2h0dHBzJzpcbiAgICAgICAgY2FzZSAnaHR0cCc6XG4gICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IF9zbGFzaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhdGhbMF0gIT09IF9zbGFzaCkge1xuICAgICAgICAgICAgICAgIHBhdGggPSBfc2xhc2ggKyBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxudmFyIF9lbXB0eSA9ICcnO1xudmFyIF9zbGFzaCA9ICcvJztcbnZhciBfcmVnZXhwID0gL14oKFteOi8/I10rPyk6KT8oXFwvXFwvKFteLz8jXSopKT8oW14/I10qKShcXD8oW14jXSopKT8oIyguKikpPy87XG4vKipcbiAqIFVuaWZvcm0gUmVzb3VyY2UgSWRlbnRpZmllciAoVVJJKSBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2LlxuICogVGhpcyBjbGFzcyBpcyBhIHNpbXBsZSBwYXJzZXIgd2hpY2ggY3JlYXRlcyB0aGUgYmFzaWMgY29tcG9uZW50IHBhcnRzXG4gKiAoaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMpIHdpdGggbWluaW1hbCB2YWxpZGF0aW9uXG4gKiBhbmQgZW5jb2RpbmcuXG4gKlxuICogICAgICAgZm9vOi8vZXhhbXBsZS5jb206ODA0Mi9vdmVyL3RoZXJlP25hbWU9ZmVycmV0I25vc2VcbiAqICAgICAgIFxcXy8gICBcXF9fX19fX19fX19fX19fL1xcX19fX19fX19fLyBcXF9fX19fX19fXy8gXFxfXy9cbiAqICAgICAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgfCAgICAgICAgICAgIHwgICAgICAgIHxcbiAqICAgICBzY2hlbWUgICAgIGF1dGhvcml0eSAgICAgICBwYXRoICAgICAgICBxdWVyeSAgIGZyYWdtZW50XG4gKiAgICAgICAgfCAgIF9fX19fX19fX19fX19fX19fX19fX3xfX1xuICogICAgICAgLyBcXCAvICAgICAgICAgICAgICAgICAgICAgICAgXFxcbiAqICAgICAgIHVybjpleGFtcGxlOmFuaW1hbDpmZXJyZXQ6bm9zZVxuICovXG52YXIgVVJJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVSSShzY2hlbWVPckRhdGEsIGF1dGhvcml0eSwgcGF0aCwgcXVlcnksIGZyYWdtZW50LCBfc3RyaWN0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1lT3JEYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWUgPSBzY2hlbWVPckRhdGEuc2NoZW1lIHx8IF9lbXB0eTtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXR5ID0gc2NoZW1lT3JEYXRhLmF1dGhvcml0eSB8fCBfZW1wdHk7XG4gICAgICAgICAgICB0aGlzLnBhdGggPSBzY2hlbWVPckRhdGEucGF0aCB8fCBfZW1wdHk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gc2NoZW1lT3JEYXRhLnF1ZXJ5IHx8IF9lbXB0eTtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSBzY2hlbWVPckRhdGEuZnJhZ21lbnQgfHwgX2VtcHR5O1xuICAgICAgICAgICAgLy8gbm8gdmFsaWRhdGlvbiBiZWNhdXNlIGl0J3MgdGhpcyBVUklcbiAgICAgICAgICAgIC8vIHRoYXQgY3JlYXRlcyB1cmkgY29tcG9uZW50cy5cbiAgICAgICAgICAgIC8vIF92YWxpZGF0ZVVyaSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1lID0gc2NoZW1lT3JEYXRhIHx8IF9lbXB0eTtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXR5ID0gYXV0aG9yaXR5IHx8IF9lbXB0eTtcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IF9yZWZlcmVuY2VSZXNvbHV0aW9uKHRoaXMuc2NoZW1lLCBwYXRoIHx8IF9lbXB0eSk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnkgfHwgX2VtcHR5O1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudCA9IGZyYWdtZW50IHx8IF9lbXB0eTtcbiAgICAgICAgICAgIF92YWxpZGF0ZVVyaSh0aGlzLCBfc3RyaWN0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBVUkkuaXNVcmkgPSBmdW5jdGlvbiAodGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nIGluc3RhbmNlb2YgVVJJKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGluZy5hdXRob3JpdHkgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcuZnJhZ21lbnQgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcucGF0aCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICYmIHR5cGVvZiB0aGluZy5xdWVyeSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICYmIHR5cGVvZiB0aGluZy5zY2hlbWUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcuZnNQYXRoID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcud2l0aCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHRoaW5nLnRvU3RyaW5nID09PSAnZnVuY3Rpb24nO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVSSS5wcm90b3R5cGUsIFwiZnNQYXRoXCIsIHtcbiAgICAgICAgLy8gLS0tLSBmaWxlc3lzdGVtIHBhdGggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjb3JyZXNwb25kaW5nIGZpbGUgc3lzdGVtIHBhdGggb2YgdGhpcyBVUkkuXG4gICAgICAgICAqIFdpbGwgaGFuZGxlIFVOQyBwYXRocywgbm9ybWFsaXplcyB3aW5kb3dzIGRyaXZlIGxldHRlcnMgdG8gbG93ZXItY2FzZSwgYW5kIHVzZXMgdGhlXG4gICAgICAgICAqIHBsYXRmb3JtIHNwZWNpZmljIHBhdGggc2VwYXJhdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiAqIFdpbGwgKm5vdCogdmFsaWRhdGUgdGhlIHBhdGggZm9yIGludmFsaWQgY2hhcmFjdGVycyBhbmQgc2VtYW50aWNzLlxuICAgICAgICAgKiAqIFdpbGwgKm5vdCogbG9vayBhdCB0aGUgc2NoZW1lIG9mIHRoaXMgVVJJLlxuICAgICAgICAgKiAqIFRoZSByZXN1bHQgc2hhbGwgKm5vdCogYmUgdXNlZCBmb3IgZGlzcGxheSBwdXJwb3NlcyBidXQgZm9yIGFjY2Vzc2luZyBhIGZpbGUgb24gZGlzay5cbiAgICAgICAgICpcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlICpkaWZmZXJlbmNlKiB0byBgVVJJI3BhdGhgIGlzIHRoZSB1c2Ugb2YgdGhlIHBsYXRmb3JtIHNwZWNpZmljIHNlcGFyYXRvciBhbmQgdGhlIGhhbmRsaW5nXG4gICAgICAgICAqIG9mIFVOQyBwYXRocy4gU2VlIHRoZSBiZWxvdyBzYW1wbGUgb2YgYSBmaWxlLXVyaSB3aXRoIGFuIGF1dGhvcml0eSAoVU5DIHBhdGgpLlxuICAgICAgICAgKlxuICAgICAgICAgKiBgYGB0c1xuICAgICAgICAgICAgY29uc3QgdSA9IFVSSS5wYXJzZSgnZmlsZTovL3NlcnZlci9jJC9mb2xkZXIvZmlsZS50eHQnKVxuICAgICAgICAgICAgdS5hdXRob3JpdHkgPT09ICdzZXJ2ZXInXG4gICAgICAgICAgICB1LnBhdGggPT09ICcvc2hhcmVzL2MkL2ZpbGUudHh0J1xuICAgICAgICAgICAgdS5mc1BhdGggPT09ICdcXFxcc2VydmVyXFxjJFxcZm9sZGVyXFxmaWxlLnR4dCdcbiAgICAgICAgYGBgXG4gICAgICAgICAqXG4gICAgICAgICAqIFVzaW5nIGBVUkkjcGF0aGAgdG8gcmVhZCBhIGZpbGUgKHVzaW5nIGZzLWFwaXMpIHdvdWxkIG5vdCBiZSBlbm91Z2ggYmVjYXVzZSBwYXJ0cyBvZiB0aGUgcGF0aCxcbiAgICAgICAgICogbmFtZWx5IHRoZSBzZXJ2ZXIgbmFtZSwgd291bGQgYmUgbWlzc2luZy4gVGhlcmVmb3JlIGBVUkkjZnNQYXRoYCBleGlzdHMgLSBpdCdzIHN1Z2FyIHRvIGVhc2Ugd29ya2luZ1xuICAgICAgICAgKiB3aXRoIFVSSXMgdGhhdCByZXByZXNlbnQgZmlsZXMgb24gZGlzayAoYGZpbGVgIHNjaGVtZSkuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnNjaGVtZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAvLyBcdGNvbnNvbGUud2FybihgW1VyaUVycm9yXSBjYWxsaW5nIGZzUGF0aCB3aXRoIHNjaGVtZSAke3RoaXMuc2NoZW1lfWApO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIF9tYWtlRnNQYXRoKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvLyAtLS0tIG1vZGlmeSB0byBuZXcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIFVSSS5wcm90b3R5cGUud2l0aCA9IGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY2hlbWUgPSBjaGFuZ2Uuc2NoZW1lLCBhdXRob3JpdHkgPSBjaGFuZ2UuYXV0aG9yaXR5LCBwYXRoID0gY2hhbmdlLnBhdGgsIHF1ZXJ5ID0gY2hhbmdlLnF1ZXJ5LCBmcmFnbWVudCA9IGNoYW5nZS5mcmFnbWVudDtcbiAgICAgICAgaWYgKHNjaGVtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY2hlbWUgPSB0aGlzLnNjaGVtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzY2hlbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNjaGVtZSA9IF9lbXB0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0aG9yaXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF1dGhvcml0eSA9IHRoaXMuYXV0aG9yaXR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF1dGhvcml0eSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYXV0aG9yaXR5ID0gX2VtcHR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhdGggPSB0aGlzLnBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGF0aCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcGF0aCA9IF9lbXB0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnkgPSB0aGlzLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHF1ZXJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICBxdWVyeSA9IF9lbXB0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhZ21lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyYWdtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICBmcmFnbWVudCA9IF9lbXB0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NoZW1lID09PSB0aGlzLnNjaGVtZVxuICAgICAgICAgICAgJiYgYXV0aG9yaXR5ID09PSB0aGlzLmF1dGhvcml0eVxuICAgICAgICAgICAgJiYgcGF0aCA9PT0gdGhpcy5wYXRoXG4gICAgICAgICAgICAmJiBxdWVyeSA9PT0gdGhpcy5xdWVyeVxuICAgICAgICAgICAgJiYgZnJhZ21lbnQgPT09IHRoaXMuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgX1VSSShzY2hlbWUsIGF1dGhvcml0eSwgcGF0aCwgcXVlcnksIGZyYWdtZW50KTtcbiAgICB9O1xuICAgIC8vIC0tLS0gcGFyc2UgJiB2YWxpZGF0ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFVSSSBmcm9tIGEgc3RyaW5nLCBlLmcuIGBodHRwOi8vd3d3Lm1zZnQuY29tL3NvbWUvcGF0aGAsXG4gICAgICogYGZpbGU6Ly8vdXNyL2hvbWVgLCBvciBgc2NoZW1lOndpdGgvcGF0aGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgQSBzdHJpbmcgd2hpY2ggcmVwcmVzZW50cyBhbiBVUkkgKHNlZSBgVVJJI3RvU3RyaW5nYCkuXG4gICAgICovXG4gICAgVVJJLnBhcnNlID0gZnVuY3Rpb24gKHZhbHVlLCBfc3RyaWN0KSB7XG4gICAgICAgIGlmIChfc3RyaWN0ID09PSB2b2lkIDApIHsgX3N0cmljdCA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBtYXRjaCA9IF9yZWdleHAuZXhlYyh2YWx1ZSk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgX1VSSShfZW1wdHksIF9lbXB0eSwgX2VtcHR5LCBfZW1wdHksIF9lbXB0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfVVJJKG1hdGNoWzJdIHx8IF9lbXB0eSwgZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzRdIHx8IF9lbXB0eSksIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFs1XSB8fCBfZW1wdHkpLCBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbN10gfHwgX2VtcHR5KSwgZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzldIHx8IF9lbXB0eSksIF9zdHJpY3QpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBVUkkgZnJvbSBhIGZpbGUgc3lzdGVtIHBhdGgsIGUuZy4gYGM6XFxteVxcZmlsZXNgLFxuICAgICAqIGAvdXNyL2hvbWVgLCBvciBgXFxcXHNlcnZlclxcc2hhcmVcXHNvbWVcXHBhdGhgLlxuICAgICAqXG4gICAgICogVGhlICpkaWZmZXJlbmNlKiBiZXR3ZWVuIGBVUkkjcGFyc2VgIGFuZCBgVVJJI2ZpbGVgIGlzIHRoYXQgdGhlIGxhdHRlciB0cmVhdHMgdGhlIGFyZ3VtZW50XG4gICAgICogYXMgcGF0aCwgbm90IGFzIHN0cmluZ2lmaWVkLXVyaS4gRS5nLiBgVVJJLmZpbGUocGF0aClgIGlzICoqbm90IHRoZSBzYW1lIGFzKipcbiAgICAgKiBgVVJJLnBhcnNlKCdmaWxlOi8vJyArIHBhdGgpYCBiZWNhdXNlIHRoZSBwYXRoIG1pZ2h0IGNvbnRhaW4gY2hhcmFjdGVycyB0aGF0IGFyZVxuICAgICAqIGludGVycHJldGVkICgjIGFuZCA/KS4gU2VlIHRoZSBmb2xsb3dpbmcgc2FtcGxlOlxuICAgICAqIGBgYHRzXG4gICAgY29uc3QgZ29vZCA9IFVSSS5maWxlKCcvY29kaW5nL2MjL3Byb2plY3QxJyk7XG4gICAgZ29vZC5zY2hlbWUgPT09ICdmaWxlJztcbiAgICBnb29kLnBhdGggPT09ICcvY29kaW5nL2MjL3Byb2plY3QxJztcbiAgICBnb29kLmZyYWdtZW50ID09PSAnJztcbiAgICBjb25zdCBiYWQgPSBVUkkucGFyc2UoJ2ZpbGU6Ly8nICsgJy9jb2RpbmcvYyMvcHJvamVjdDEnKTtcbiAgICBiYWQuc2NoZW1lID09PSAnZmlsZSc7XG4gICAgYmFkLnBhdGggPT09ICcvY29kaW5nL2MnOyAvLyBwYXRoIGlzIG5vdyBicm9rZW5cbiAgICBiYWQuZnJhZ21lbnQgPT09ICcvcHJvamVjdDEnO1xuICAgIGBgYFxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggQSBmaWxlIHN5c3RlbSBwYXRoIChzZWUgYFVSSSNmc1BhdGhgKVxuICAgICAqL1xuICAgIFVSSS5maWxlID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGF1dGhvcml0eSA9IF9lbXB0eTtcbiAgICAgICAgLy8gbm9ybWFsaXplIHRvIGZ3ZC1zbGFzaGVzIG9uIHdpbmRvd3MsXG4gICAgICAgIC8vIG9uIG90aGVyIHN5c3RlbXMgYndkLXNsYXNoZXMgYXJlIHZhbGlkXG4gICAgICAgIC8vIGZpbGVuYW1lIGNoYXJhY3RlciwgZWcgL2ZcXG9vL2JhXFxyLnR4dFxuICAgICAgICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csIF9zbGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgZm9yIGF1dGhvcml0eSBhcyB1c2VkIGluIFVOQyBzaGFyZXNcbiAgICAgICAgLy8gb3IgdXNlIHRoZSBwYXRoIGFzIGdpdmVuXG4gICAgICAgIGlmIChwYXRoWzBdID09PSBfc2xhc2ggJiYgcGF0aFsxXSA9PT0gX3NsYXNoKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gcGF0aC5pbmRleE9mKF9zbGFzaCwgMik7XG4gICAgICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGF1dGhvcml0eSA9IHBhdGguc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgICAgIHBhdGggPSBfc2xhc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdXRob3JpdHkgPSBwYXRoLnN1YnN0cmluZygyLCBpZHgpO1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZyhpZHgpIHx8IF9zbGFzaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IF9VUkkoJ2ZpbGUnLCBhdXRob3JpdHksIHBhdGgsIF9lbXB0eSwgX2VtcHR5KTtcbiAgICB9O1xuICAgIFVSSS5mcm9tID0gZnVuY3Rpb24gKGNvbXBvbmVudHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfVVJJKGNvbXBvbmVudHMuc2NoZW1lLCBjb21wb25lbnRzLmF1dGhvcml0eSwgY29tcG9uZW50cy5wYXRoLCBjb21wb25lbnRzLnF1ZXJ5LCBjb21wb25lbnRzLmZyYWdtZW50KTtcbiAgICB9O1xuICAgIC8vIC0tLS0gcHJpbnRpbmcvZXh0ZXJuYWxpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyBVUkkuIEl0J3MgZ3VhcmFudGVlZCB0aGF0IGNhbGxpbmdcbiAgICAgKiBgVVJJLnBhcnNlYCB3aXRoIHRoZSByZXN1bHQgb2YgdGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIFVSSSB3aGljaCBpcyBlcXVhbFxuICAgICAqIHRvIHRoaXMgVVJJLlxuICAgICAqXG4gICAgICogKiBUaGUgcmVzdWx0IHNoYWxsICpub3QqIGJlIHVzZWQgZm9yIGRpc3BsYXkgcHVycG9zZXMgYnV0IGZvciBleHRlcm5hbGl6YXRpb24gb3IgdHJhbnNwb3J0LlxuICAgICAqICogVGhlIHJlc3VsdCB3aWxsIGJlIGVuY29kZWQgdXNpbmcgdGhlIHBlcmNlbnRhZ2UgZW5jb2RpbmcgYW5kIGVuY29kaW5nIGhhcHBlbnMgbW9zdGx5XG4gICAgICogaWdub3JlIHRoZSBzY2hlbWUtc3BlY2lmaWMgZW5jb2RpbmcgcnVsZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2tpcEVuY29kaW5nIERvIG5vdCBlbmNvZGUgdGhlIHJlc3VsdCwgZGVmYXVsdCBpcyBgZmFsc2VgXG4gICAgICovXG4gICAgVVJJLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChza2lwRW5jb2RpbmcpIHtcbiAgICAgICAgaWYgKHNraXBFbmNvZGluZyA9PT0gdm9pZCAwKSB7IHNraXBFbmNvZGluZyA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfYXNGb3JtYXR0ZWQodGhpcywgc2tpcEVuY29kaW5nKTtcbiAgICB9O1xuICAgIFVSSS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFVSSS5yZXZpdmUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBVUkkpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBfVVJJKGRhdGEpO1xuICAgICAgICAgICAgcmVzdWx0Ll9mc1BhdGggPSBkYXRhLmZzUGF0aDtcbiAgICAgICAgICAgIHJlc3VsdC5fZm9ybWF0dGVkID0gZGF0YS5leHRlcm5hbDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBVUkk7XG59KCkpO1xuZXhwb3J0IHsgVVJJIH07XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y2xhc3MtbmFtZVxudmFyIF9VUkkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKF9VUkksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gX1VSSSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9mb3JtYXR0ZWQgPSBudWxsO1xuICAgICAgICBfdGhpcy5fZnNQYXRoID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX1VSSS5wcm90b3R5cGUsIFwiZnNQYXRoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2ZzUGF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZzUGF0aCA9IF9tYWtlRnNQYXRoKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZzUGF0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgX1VSSS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoc2tpcEVuY29kaW5nKSB7XG4gICAgICAgIGlmIChza2lwRW5jb2RpbmcgPT09IHZvaWQgMCkgeyBza2lwRW5jb2RpbmcgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoIXNraXBFbmNvZGluZykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9mb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXR0ZWQgPSBfYXNGb3JtYXR0ZWQodGhpcywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNhY2hlIHRoYXRcbiAgICAgICAgICAgIHJldHVybiBfYXNGb3JtYXR0ZWQodGhpcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIF9VUkkucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgICRtaWQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgLy8gY2FjaGVkIHN0YXRlXG4gICAgICAgIGlmICh0aGlzLl9mc1BhdGgpIHtcbiAgICAgICAgICAgIHJlcy5mc1BhdGggPSB0aGlzLl9mc1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Zvcm1hdHRlZCkge1xuICAgICAgICAgICAgcmVzLmV4dGVybmFsID0gdGhpcy5fZm9ybWF0dGVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVyaSBjb21wb25lbnRzXG4gICAgICAgIGlmICh0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIHJlcy5wYXRoID0gdGhpcy5wYXRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjaGVtZSkge1xuICAgICAgICAgICAgcmVzLnNjaGVtZSA9IHRoaXMuc2NoZW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1dGhvcml0eSkge1xuICAgICAgICAgICAgcmVzLmF1dGhvcml0eSA9IHRoaXMuYXV0aG9yaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXMucXVlcnkgPSB0aGlzLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZyYWdtZW50KSB7XG4gICAgICAgICAgICByZXMuZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICByZXR1cm4gX1VSSTtcbn0oVVJJKSk7XG4vLyByZXNlcnZlZCBjaGFyYWN0ZXJzOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTIuMlxudmFyIGVuY29kZVRhYmxlID0gKF9hID0ge30sXG4gICAgX2FbNTggLyogQ29sb24gKi9dID0gJyUzQScsXG4gICAgX2FbNDcgLyogU2xhc2ggKi9dID0gJyUyRicsXG4gICAgX2FbNjMgLyogUXVlc3Rpb25NYXJrICovXSA9ICclM0YnLFxuICAgIF9hWzM1IC8qIEhhc2ggKi9dID0gJyUyMycsXG4gICAgX2FbOTEgLyogT3BlblNxdWFyZUJyYWNrZXQgKi9dID0gJyU1QicsXG4gICAgX2FbOTMgLyogQ2xvc2VTcXVhcmVCcmFja2V0ICovXSA9ICclNUQnLFxuICAgIF9hWzY0IC8qIEF0U2lnbiAqL10gPSAnJTQwJyxcbiAgICBfYVszMyAvKiBFeGNsYW1hdGlvbk1hcmsgKi9dID0gJyUyMScsXG4gICAgX2FbMzYgLyogRG9sbGFyU2lnbiAqL10gPSAnJTI0JyxcbiAgICBfYVszOCAvKiBBbXBlcnNhbmQgKi9dID0gJyUyNicsXG4gICAgX2FbMzkgLyogU2luZ2xlUXVvdGUgKi9dID0gJyUyNycsXG4gICAgX2FbNDAgLyogT3BlblBhcmVuICovXSA9ICclMjgnLFxuICAgIF9hWzQxIC8qIENsb3NlUGFyZW4gKi9dID0gJyUyOScsXG4gICAgX2FbNDIgLyogQXN0ZXJpc2sgKi9dID0gJyUyQScsXG4gICAgX2FbNDMgLyogUGx1cyAqL10gPSAnJTJCJyxcbiAgICBfYVs0NCAvKiBDb21tYSAqL10gPSAnJTJDJyxcbiAgICBfYVs1OSAvKiBTZW1pY29sb24gKi9dID0gJyUzQicsXG4gICAgX2FbNjEgLyogRXF1YWxzICovXSA9ICclM0QnLFxuICAgIF9hWzMyIC8qIFNwYWNlICovXSA9ICclMjAnLFxuICAgIF9hKTtcbmZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudEZhc3QodXJpQ29tcG9uZW50LCBhbGxvd1NsYXNoKSB7XG4gICAgdmFyIHJlcyA9IHVuZGVmaW5lZDtcbiAgICB2YXIgbmF0aXZlRW5jb2RlUG9zID0gLTE7XG4gICAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwgdXJpQ29tcG9uZW50Lmxlbmd0aDsgcG9zKyspIHtcbiAgICAgICAgdmFyIGNvZGUgPSB1cmlDb21wb25lbnQuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAvLyB1bnJlc2VydmVkIGNoYXJhY3RlcnM6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMi4zXG4gICAgICAgIGlmICgoY29kZSA+PSA5NyAvKiBhICovICYmIGNvZGUgPD0gMTIyIC8qIHogKi8pXG4gICAgICAgICAgICB8fCAoY29kZSA+PSA2NSAvKiBBICovICYmIGNvZGUgPD0gOTAgLyogWiAqLylcbiAgICAgICAgICAgIHx8IChjb2RlID49IDQ4IC8qIERpZ2l0MCAqLyAmJiBjb2RlIDw9IDU3IC8qIERpZ2l0OSAqLylcbiAgICAgICAgICAgIHx8IGNvZGUgPT09IDQ1IC8qIERhc2ggKi9cbiAgICAgICAgICAgIHx8IGNvZGUgPT09IDQ2IC8qIFBlcmlvZCAqL1xuICAgICAgICAgICAgfHwgY29kZSA9PT0gOTUgLyogVW5kZXJsaW5lICovXG4gICAgICAgICAgICB8fCBjb2RlID09PSAxMjYgLyogVGlsZGUgKi9cbiAgICAgICAgICAgIHx8IChhbGxvd1NsYXNoICYmIGNvZGUgPT09IDQ3IC8qIFNsYXNoICovKSkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGRlbGF5aW5nIG5hdGl2ZSBlbmNvZGVcbiAgICAgICAgICAgIGlmIChuYXRpdmVFbmNvZGVQb3MgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVzICs9IGVuY29kZVVSSUNvbXBvbmVudCh1cmlDb21wb25lbnQuc3Vic3RyaW5nKG5hdGl2ZUVuY29kZVBvcywgcG9zKSk7XG4gICAgICAgICAgICAgICAgbmF0aXZlRW5jb2RlUG9zID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSB3cml0ZSBpbnRvIGEgbmV3IHN0cmluZyAoYnkgZGVmYXVsdCB3ZSB0cnkgdG8gcmV0dXJuIHRoZSBwYXJhbSlcbiAgICAgICAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlcyArPSB1cmlDb21wb25lbnQuY2hhckF0KHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGluZyBuZWVkZWQsIHdlIG5lZWQgdG8gYWxsb2NhdGUgYSBuZXcgc3RyaW5nXG4gICAgICAgICAgICBpZiAocmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXMgPSB1cmlDb21wb25lbnQuc3Vic3RyKDAsIHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayB3aXRoIGRlZmF1bHQgdGFibGUgZmlyc3RcbiAgICAgICAgICAgIHZhciBlc2NhcGVkID0gZW5jb2RlVGFibGVbY29kZV07XG4gICAgICAgICAgICBpZiAoZXNjYXBlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGRlbGF5aW5nIG5hdGl2ZSBlbmNvZGVcbiAgICAgICAgICAgICAgICBpZiAobmF0aXZlRW5jb2RlUG9zICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHVyaUNvbXBvbmVudC5zdWJzdHJpbmcobmF0aXZlRW5jb2RlUG9zLCBwb3MpKTtcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlRW5jb2RlUG9zID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBlc2NhcGVkIHZhcmlhbnQgdG8gcmVzdWx0XG4gICAgICAgICAgICAgICAgcmVzICs9IGVzY2FwZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuYXRpdmVFbmNvZGVQb3MgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlIG5hdGl2ZSBlbmNvZGUgb25seSB3aGVuIG5lZWRlZFxuICAgICAgICAgICAgICAgIG5hdGl2ZUVuY29kZVBvcyA9IHBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobmF0aXZlRW5jb2RlUG9zICE9PSAtMSkge1xuICAgICAgICByZXMgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHVyaUNvbXBvbmVudC5zdWJzdHJpbmcobmF0aXZlRW5jb2RlUG9zKSk7XG4gICAgfVxuICAgIHJldHVybiByZXMgIT09IHVuZGVmaW5lZCA/IHJlcyA6IHVyaUNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudE1pbmltYWwocGF0aCkge1xuICAgIHZhciByZXMgPSB1bmRlZmluZWQ7XG4gICAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwgcGF0aC5sZW5ndGg7IHBvcysrKSB7XG4gICAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgIGlmIChjb2RlID09PSAzNSAvKiBIYXNoICovIHx8IGNvZGUgPT09IDYzIC8qIFF1ZXN0aW9uTWFyayAqLykge1xuICAgICAgICAgICAgaWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gcGF0aC5zdWJzdHIoMCwgcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcyArPSBlbmNvZGVUYWJsZVtjb2RlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlcyArPSBwYXRoW3Bvc107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcyAhPT0gdW5kZWZpbmVkID8gcmVzIDogcGF0aDtcbn1cbi8qKlxuICogQ29tcHV0ZSBgZnNQYXRoYCBmb3IgdGhlIGdpdmVuIHVyaVxuICovXG5mdW5jdGlvbiBfbWFrZUZzUGF0aCh1cmkpIHtcbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKHVyaS5hdXRob3JpdHkgJiYgdXJpLnBhdGgubGVuZ3RoID4gMSAmJiB1cmkuc2NoZW1lID09PSAnZmlsZScpIHtcbiAgICAgICAgLy8gdW5jIHBhdGg6IGZpbGU6Ly9zaGFyZXMvYyQvZmFyL2Jvb1xuICAgICAgICB2YWx1ZSA9IFwiLy9cIiArIHVyaS5hdXRob3JpdHkgKyB1cmkucGF0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAodXJpLnBhdGguY2hhckNvZGVBdCgwKSA9PT0gNDcgLyogU2xhc2ggKi9cbiAgICAgICAgJiYgKHVyaS5wYXRoLmNoYXJDb2RlQXQoMSkgPj0gNjUgLyogQSAqLyAmJiB1cmkucGF0aC5jaGFyQ29kZUF0KDEpIDw9IDkwIC8qIFogKi8gfHwgdXJpLnBhdGguY2hhckNvZGVBdCgxKSA+PSA5NyAvKiBhICovICYmIHVyaS5wYXRoLmNoYXJDb2RlQXQoMSkgPD0gMTIyIC8qIHogKi8pXG4gICAgICAgICYmIHVyaS5wYXRoLmNoYXJDb2RlQXQoMikgPT09IDU4IC8qIENvbG9uICovKSB7XG4gICAgICAgIC8vIHdpbmRvd3MgZHJpdmUgbGV0dGVyOiBmaWxlOi8vL2M6L2Zhci9ib29cbiAgICAgICAgdmFsdWUgPSB1cmkucGF0aFsxXS50b0xvd2VyQ2FzZSgpICsgdXJpLnBhdGguc3Vic3RyKDIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gb3RoZXIgcGF0aFxuICAgICAgICB2YWx1ZSA9IHVyaS5wYXRoO1xuICAgIH1cbiAgICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFwvL2csICdcXFxcJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbi8qKlxuICogQ3JlYXRlIHRoZSBleHRlcm5hbCB2ZXJzaW9uIG9mIGEgdXJpXG4gKi9cbmZ1bmN0aW9uIF9hc0Zvcm1hdHRlZCh1cmksIHNraXBFbmNvZGluZykge1xuICAgIHZhciBlbmNvZGVyID0gIXNraXBFbmNvZGluZ1xuICAgICAgICA/IGVuY29kZVVSSUNvbXBvbmVudEZhc3RcbiAgICAgICAgOiBlbmNvZGVVUklDb21wb25lbnRNaW5pbWFsO1xuICAgIHZhciByZXMgPSAnJztcbiAgICB2YXIgc2NoZW1lID0gdXJpLnNjaGVtZSwgYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eSwgcGF0aCA9IHVyaS5wYXRoLCBxdWVyeSA9IHVyaS5xdWVyeSwgZnJhZ21lbnQgPSB1cmkuZnJhZ21lbnQ7XG4gICAgaWYgKHNjaGVtZSkge1xuICAgICAgICByZXMgKz0gc2NoZW1lO1xuICAgICAgICByZXMgKz0gJzonO1xuICAgIH1cbiAgICBpZiAoYXV0aG9yaXR5IHx8IHNjaGVtZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIHJlcyArPSBfc2xhc2g7XG4gICAgICAgIHJlcyArPSBfc2xhc2g7XG4gICAgfVxuICAgIGlmIChhdXRob3JpdHkpIHtcbiAgICAgICAgdmFyIGlkeCA9IGF1dGhvcml0eS5pbmRleE9mKCdAJyk7XG4gICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICAvLyA8dXNlcj5APGF1dGg+XG4gICAgICAgICAgICB2YXIgdXNlcmluZm8gPSBhdXRob3JpdHkuc3Vic3RyKDAsIGlkeCk7XG4gICAgICAgICAgICBhdXRob3JpdHkgPSBhdXRob3JpdHkuc3Vic3RyKGlkeCArIDEpO1xuICAgICAgICAgICAgaWR4ID0gdXNlcmluZm8uaW5kZXhPZignOicpO1xuICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXMgKz0gZW5jb2Rlcih1c2VyaW5mbywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gPHVzZXI+OjxwYXNzPkA8YXV0aD5cbiAgICAgICAgICAgICAgICByZXMgKz0gZW5jb2Rlcih1c2VyaW5mby5zdWJzdHIoMCwgaWR4KSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJlcyArPSAnOic7XG4gICAgICAgICAgICAgICAgcmVzICs9IGVuY29kZXIodXNlcmluZm8uc3Vic3RyKGlkeCArIDEpLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXMgKz0gJ0AnO1xuICAgICAgICB9XG4gICAgICAgIGF1dGhvcml0eSA9IGF1dGhvcml0eS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZHggPSBhdXRob3JpdHkuaW5kZXhPZignOicpO1xuICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgcmVzICs9IGVuY29kZXIoYXV0aG9yaXR5LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyA8YXV0aD46PHBvcnQ+XG4gICAgICAgICAgICByZXMgKz0gZW5jb2RlcihhdXRob3JpdHkuc3Vic3RyKDAsIGlkeCksIGZhbHNlKTtcbiAgICAgICAgICAgIHJlcyArPSBhdXRob3JpdHkuc3Vic3RyKGlkeCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhdGgpIHtcbiAgICAgICAgLy8gbG93ZXItY2FzZSB3aW5kb3dzIGRyaXZlIGxldHRlcnMgaW4gL0M6L2ZmZiBvciBDOi9mZmZcbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID49IDMgJiYgcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKiBTbGFzaCAqLyAmJiBwYXRoLmNoYXJDb2RlQXQoMikgPT09IDU4IC8qIENvbG9uICovKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgxKTtcbiAgICAgICAgICAgIGlmIChjb2RlID49IDY1IC8qIEEgKi8gJiYgY29kZSA8PSA5MCAvKiBaICovKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IFwiL1wiICsgU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgMzIpICsgXCI6XCIgKyBwYXRoLnN1YnN0cigzKTsgLy8gXCIvYzpcIi5sZW5ndGggPT09IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYXRoLmxlbmd0aCA+PSAyICYmIHBhdGguY2hhckNvZGVBdCgxKSA9PT0gNTggLyogQ29sb24gKi8pIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgaWYgKGNvZGUgPj0gNjUgLyogQSAqLyAmJiBjb2RlIDw9IDkwIC8qIFogKi8pIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgMzIpICsgXCI6XCIgKyBwYXRoLnN1YnN0cigyKTsgLy8gXCIvYzpcIi5sZW5ndGggPT09IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBlbmNvZGUgdGhlIHJlc3Qgb2YgdGhlIHBhdGhcbiAgICAgICAgcmVzICs9IGVuY29kZXIocGF0aCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChxdWVyeSkge1xuICAgICAgICByZXMgKz0gJz8nO1xuICAgICAgICByZXMgKz0gZW5jb2RlcihxdWVyeSwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoZnJhZ21lbnQpIHtcbiAgICAgICAgcmVzICs9ICcjJztcbiAgICAgICAgcmVzICs9ICFza2lwRW5jb2RpbmcgPyBlbmNvZGVVUklDb21wb25lbnRGYXN0KGZyYWdtZW50LCBmYWxzZSkgOiBmcmFnbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyB0cmFuc2Zvcm1FcnJvckZvclNlcmlhbGl6YXRpb24gfSBmcm9tICcuLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZSB9IGZyb20gJy4uL2xpZmVjeWNsZS5qcyc7XG5pbXBvcnQgeyBpc1dlYiB9IGZyb20gJy4uL3BsYXRmb3JtLmpzJztcbmltcG9ydCB7IGdldEFsbFByb3BlcnR5TmFtZXMgfSBmcm9tICcuLi90eXBlcy5qcyc7XG52YXIgSU5JVElBTElaRSA9ICckaW5pdGlhbGl6ZSc7XG52YXIgd2ViV29ya2VyV2FybmluZ0xvZ2dlZCA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIGxvZ09uY2VXZWJXb3JrZXJXYXJuaW5nKGVycikge1xuICAgIGlmICghaXNXZWIpIHtcbiAgICAgICAgLy8gcnVubmluZyB0ZXN0c1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghd2ViV29ya2VyV2FybmluZ0xvZ2dlZCkge1xuICAgICAgICB3ZWJXb3JrZXJXYXJuaW5nTG9nZ2VkID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgY3JlYXRlIHdlYiB3b3JrZXIocykuIEZhbGxpbmcgYmFjayB0byBsb2FkaW5nIHdlYiB3b3JrZXIgY29kZSBpbiBtYWluIHRocmVhZCwgd2hpY2ggbWlnaHQgY2F1c2UgVUkgZnJlZXplcy4gUGxlYXNlIHNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L21vbmFjby1lZGl0b3IjZmFxJyk7XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihlcnIubWVzc2FnZSk7XG59XG52YXIgU2ltcGxlV29ya2VyUHJvdG9jb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2ltcGxlV29ya2VyUHJvdG9jb2woaGFuZGxlcikge1xuICAgICAgICB0aGlzLl93b3JrZXJJZCA9IC0xO1xuICAgICAgICB0aGlzLl9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5fbGFzdFNlbnRSZXEgPSAwO1xuICAgICAgICB0aGlzLl9wZW5kaW5nUmVwbGllcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFNpbXBsZVdvcmtlclByb3RvY29sLnByb3RvdHlwZS5zZXRXb3JrZXJJZCA9IGZ1bmN0aW9uICh3b3JrZXJJZCkge1xuICAgICAgICB0aGlzLl93b3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIH07XG4gICAgU2ltcGxlV29ya2VyUHJvdG9jb2wucHJvdG90eXBlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJncykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxID0gU3RyaW5nKCsrdGhpcy5fbGFzdFNlbnRSZXEpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMuX3BlbmRpbmdSZXBsaWVzW3JlcV0gPSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3Q6IHJlamVjdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF90aGlzLl9zZW5kKHtcbiAgICAgICAgICAgICAgICB2c1dvcmtlcjogX3RoaXMuX3dvcmtlcklkLFxuICAgICAgICAgICAgICAgIHJlcTogcmVxLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZVdvcmtlclByb3RvY29sLnByb3RvdHlwZS5oYW5kbGVNZXNzYWdlID0gZnVuY3Rpb24gKHNlcmlhbGl6ZWRNZXNzYWdlKSB7XG4gICAgICAgIHZhciBtZXNzYWdlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2Uoc2VyaWFsaXplZE1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLnZzV29ya2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3dvcmtlcklkICE9PSAtMSAmJiBtZXNzYWdlLnZzV29ya2VyICE9PSB0aGlzLl93b3JrZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfTtcbiAgICBTaW1wbGVXb3JrZXJQcm90b2NvbC5wcm90b3R5cGUuX2hhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChtc2cuc2VxKSB7XG4gICAgICAgICAgICB2YXIgcmVwbHlNZXNzYWdlID0gbXNnO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9wZW5kaW5nUmVwbGllc1tyZXBseU1lc3NhZ2Uuc2VxXSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignR290IHJlcGx5IHRvIHVua25vd24gc2VxJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcGx5ID0gdGhpcy5fcGVuZGluZ1JlcGxpZXNbcmVwbHlNZXNzYWdlLnNlcV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fcGVuZGluZ1JlcGxpZXNbcmVwbHlNZXNzYWdlLnNlcV07XG4gICAgICAgICAgICBpZiAocmVwbHlNZXNzYWdlLmVycikge1xuICAgICAgICAgICAgICAgIHZhciBlcnIgPSByZXBseU1lc3NhZ2UuZXJyO1xuICAgICAgICAgICAgICAgIGlmIChyZXBseU1lc3NhZ2UuZXJyLiRpc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBlcnIubmFtZSA9IHJlcGx5TWVzc2FnZS5lcnIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSByZXBseU1lc3NhZ2UuZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGVyci5zdGFjayA9IHJlcGx5TWVzc2FnZS5lcnIuc3RhY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcGx5LnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcGx5LnJlc29sdmUocmVwbHlNZXNzYWdlLnJlcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcXVlc3RNZXNzYWdlID0gbXNnO1xuICAgICAgICB2YXIgcmVxID0gcmVxdWVzdE1lc3NhZ2UucmVxO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5faGFuZGxlci5oYW5kbGVNZXNzYWdlKHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgcmVxdWVzdE1lc3NhZ2UuYXJncyk7XG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBfdGhpcy5fc2VuZCh7XG4gICAgICAgICAgICAgICAgdnNXb3JrZXI6IF90aGlzLl93b3JrZXJJZCxcbiAgICAgICAgICAgICAgICBzZXE6IHJlcSxcbiAgICAgICAgICAgICAgICByZXM6IHIsXG4gICAgICAgICAgICAgICAgZXJyOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuZGV0YWlsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBMb2FkaW5nIGVycm9ycyBoYXZlIGEgZGV0YWlsIHByb3BlcnR5IHRoYXQgcG9pbnRzIHRvIHRoZSBhY3R1YWwgZXJyb3JcbiAgICAgICAgICAgICAgICBlLmRldGFpbCA9IHRyYW5zZm9ybUVycm9yRm9yU2VyaWFsaXphdGlvbihlLmRldGFpbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5fc2VuZCh7XG4gICAgICAgICAgICAgICAgdnNXb3JrZXI6IF90aGlzLl93b3JrZXJJZCxcbiAgICAgICAgICAgICAgICBzZXE6IHJlcSxcbiAgICAgICAgICAgICAgICByZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBlcnI6IHRyYW5zZm9ybUVycm9yRm9yU2VyaWFsaXphdGlvbihlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlV29ya2VyUHJvdG9jb2wucHJvdG90eXBlLl9zZW5kID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICB2YXIgc3RyTXNnID0gSlNPTi5zdHJpbmdpZnkobXNnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1NFTkRJTkc6ICcgKyBzdHJNc2cpO1xuICAgICAgICB0aGlzLl9oYW5kbGVyLnNlbmRNZXNzYWdlKHN0ck1zZyk7XG4gICAgfTtcbiAgICByZXR1cm4gU2ltcGxlV29ya2VyUHJvdG9jb2w7XG59KCkpO1xuLyoqXG4gKiBNYWluIHRocmVhZCBzaWRlXG4gKi9cbnZhciBTaW1wbGVXb3JrZXJDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNpbXBsZVdvcmtlckNsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaW1wbGVXb3JrZXJDbGllbnQod29ya2VyRmFjdG9yeSwgbW9kdWxlSWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIGxhenlQcm94eVJlamVjdCA9IG51bGw7XG4gICAgICAgIF90aGlzLl93b3JrZXIgPSBfdGhpcy5fcmVnaXN0ZXIod29ya2VyRmFjdG9yeS5jcmVhdGUoJ3ZzL2Jhc2UvY29tbW9uL3dvcmtlci9zaW1wbGVXb3JrZXInLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICBfdGhpcy5fcHJvdG9jb2wuaGFuZGxlTWVzc2FnZShtc2cpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAvLyBpbiBGaXJlZm94LCB3ZWIgd29ya2VycyBmYWlsIGxhemlseSA6KFxuICAgICAgICAgICAgLy8gd2Ugd2lsbCByZWplY3QgdGhlIHByb3h5XG4gICAgICAgICAgICBpZiAobGF6eVByb3h5UmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgbGF6eVByb3h5UmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgX3RoaXMuX3Byb3RvY29sID0gbmV3IFNpbXBsZVdvcmtlclByb3RvY29sKHtcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3dvcmtlci5wb3N0TWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhbmRsZU1lc3NhZ2U6IGZ1bmN0aW9uIChtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAvLyBJbnRlbnRpb25hbGx5IG5vdCBzdXBwb3J0aW5nIHdvcmtlciAtPiBtYWluIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF90aGlzLl9wcm90b2NvbC5zZXRXb3JrZXJJZChfdGhpcy5fd29ya2VyLmdldElkKCkpO1xuICAgICAgICAvLyBHYXRoZXIgbG9hZGVyIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgdmFyIGxvYWRlckNvbmZpZ3VyYXRpb24gPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIHNlbGYucmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHNlbGYucmVxdWlyZS5nZXRDb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBNb25hY28gQU1EIExvYWRlclxuICAgICAgICAgICAgbG9hZGVyQ29uZmlndXJhdGlvbiA9IHNlbGYucmVxdWlyZS5nZXRDb25maWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZi5yZXF1aXJlanMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGNvbmZpZ3VyYXRpb24gZnJvbSByZXF1aXJlanNcbiAgICAgICAgICAgIGxvYWRlckNvbmZpZ3VyYXRpb24gPSBzZWxmLnJlcXVpcmVqcy5zLmNvbnRleHRzLl8uY29uZmlnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlbmQgaW5pdGlhbGl6ZSBtZXNzYWdlXG4gICAgICAgIF90aGlzLl9vbk1vZHVsZUxvYWRlZCA9IF90aGlzLl9wcm90b2NvbC5zZW5kTWVzc2FnZShJTklUSUFMSVpFLCBbXG4gICAgICAgICAgICBfdGhpcy5fd29ya2VyLmdldElkKCksXG4gICAgICAgICAgICBtb2R1bGVJZCxcbiAgICAgICAgICAgIGxvYWRlckNvbmZpZ3VyYXRpb25cbiAgICAgICAgXSk7XG4gICAgICAgIF90aGlzLl9sYXp5UHJveHkgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsYXp5UHJveHlSZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICBfdGhpcy5fb25Nb2R1bGVMb2FkZWQudGhlbihmdW5jdGlvbiAoYXZhaWxhYmxlTWV0aG9kcykge1xuICAgICAgICAgICAgICAgIHZhciBwcm94eSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgYXZhaWxhYmxlTWV0aG9kc18xID0gYXZhaWxhYmxlTWV0aG9kczsgX2kgPCBhdmFpbGFibGVNZXRob2RzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gYXZhaWxhYmxlTWV0aG9kc18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlbbWV0aG9kTmFtZV0gPSBjcmVhdGVQcm94eU1ldGhvZChtZXRob2ROYW1lLCBwcm94eU1ldGhvZFJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb3h5KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9vbkVycm9yKCdXb3JrZXIgZmFpbGVkIHRvIGxvYWQgJyArIG1vZHVsZUlkLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ3JlYXRlIHByb3h5IHRvIGxvYWRlZCBjb2RlXG4gICAgICAgIHZhciBwcm94eU1ldGhvZFJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX3JlcXVlc3QobWV0aG9kLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNyZWF0ZVByb3h5TWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZCwgcHJveHlNZXRob2RSZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJveHlNZXRob2RSZXF1ZXN0KG1ldGhvZCwgYXJncyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNpbXBsZVdvcmtlckNsaWVudC5wcm90b3R5cGUuZ2V0UHJveHlPYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXp5UHJveHk7XG4gICAgfTtcbiAgICBTaW1wbGVXb3JrZXJDbGllbnQucHJvdG90eXBlLl9yZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJncykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMuX29uTW9kdWxlTG9hZGVkLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9wcm90b2NvbC5zZW5kTWVzc2FnZShtZXRob2QsIGFyZ3MpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlV29ya2VyQ2xpZW50LnByb3RvdHlwZS5fb25FcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlLCBlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmluZm8oZXJyb3IpO1xuICAgIH07XG4gICAgcmV0dXJuIFNpbXBsZVdvcmtlckNsaWVudDtcbn0oRGlzcG9zYWJsZSkpO1xuZXhwb3J0IHsgU2ltcGxlV29ya2VyQ2xpZW50IH07XG4vKipcbiAqIFdvcmtlciBzaWRlXG4gKi9cbnZhciBTaW1wbGVXb3JrZXJTZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2ltcGxlV29ya2VyU2VydmVyKHBvc3RTZXJpYWxpemVkTWVzc2FnZSwgcmVxdWVzdEhhbmRsZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVxdWVzdEhhbmRsZXIgPSByZXF1ZXN0SGFuZGxlcjtcbiAgICAgICAgdGhpcy5fcHJvdG9jb2wgPSBuZXcgU2ltcGxlV29ya2VyUHJvdG9jb2woe1xuICAgICAgICAgICAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBwb3N0U2VyaWFsaXplZE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlOiBmdW5jdGlvbiAobWV0aG9kLCBhcmdzKSB7IHJldHVybiBfdGhpcy5faGFuZGxlTWVzc2FnZShtZXRob2QsIGFyZ3MpOyB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTaW1wbGVXb3JrZXJTZXJ2ZXIucHJvdG90eXBlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgdGhpcy5fcHJvdG9jb2wuaGFuZGxlTWVzc2FnZShtc2cpO1xuICAgIH07XG4gICAgU2ltcGxlV29ya2VyU2VydmVyLnByb3RvdHlwZS5faGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gSU5JVElBTElaRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6ZShhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3JlcXVlc3RIYW5kbGVyIHx8IHR5cGVvZiB0aGlzLl9yZXF1ZXN0SGFuZGxlclttZXRob2RdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdNaXNzaW5nIHJlcXVlc3RIYW5kbGVyIG9yIG1ldGhvZDogJyArIG1ldGhvZCkpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3JlcXVlc3RIYW5kbGVyW21ldGhvZF0uYXBwbHkodGhpcy5fcmVxdWVzdEhhbmRsZXIsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVXb3JrZXJTZXJ2ZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAod29ya2VySWQsIG1vZHVsZUlkLCBsb2FkZXJDb25maWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fcHJvdG9jb2wuc2V0V29ya2VySWQod29ya2VySWQpO1xuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdEhhbmRsZXIpIHtcbiAgICAgICAgICAgIC8vIHN0YXRpYyByZXF1ZXN0IGhhbmRsZXJcbiAgICAgICAgICAgIHZhciBtZXRob2RzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gZ2V0QWxsUHJvcGVydHlOYW1lcyh0aGlzLl9yZXF1ZXN0SGFuZGxlcik7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9yZXF1ZXN0SGFuZGxlcltwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2RzLnB1c2gocHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRob2RzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9hZGVyQ29uZmlnKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgJ2Jhc2VVcmwnLCBoYW5kbGluZyBpdCBpcyBiZXlvbmQgc2NvcGUgZm9yIG5vd1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsb2FkZXJDb25maWcuYmFzZVVybCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbG9hZGVyQ29uZmlnWydiYXNlVXJsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxvYWRlckNvbmZpZy5wYXRocyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxvYWRlckNvbmZpZy5wYXRocy52cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvYWRlckNvbmZpZy5wYXRoc1sndnMnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGlzIGlzIGluIGEgd2ViIHdvcmtlciwgZW5hYmxlIGNhdGNoaW5nIGVycm9yc1xuICAgICAgICAgICAgbG9hZGVyQ29uZmlnLmNhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5yZXF1aXJlLmNvbmZpZyhsb2FkZXJDb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGdsb2JhbCByZXF1aXJlIHRvIGJlIHN1cmUgdG8gZ2V0IHRoZSBnbG9iYWwgY29uZmlnXG4gICAgICAgICAgICBzZWxmLnJlcXVpcmUoW21vZHVsZUlkXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZXJNb2R1bGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlcXVlc3RIYW5kbGVyID0gaGFuZGxlck1vZHVsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9yZXF1ZXN0SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTm8gUmVxdWVzdEhhbmRsZXIhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgX2IgPSBnZXRBbGxQcm9wZXJ0eU5hbWVzKF90aGlzLl9yZXF1ZXN0SGFuZGxlcik7IF9hIDwgX2IubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wID0gX2JbX2FdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLl9yZXF1ZXN0SGFuZGxlcltwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKHByb3ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUobWV0aG9kcyk7XG4gICAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTaW1wbGVXb3JrZXJTZXJ2ZXI7XG59KCkpO1xuZXhwb3J0IHsgU2ltcGxlV29ya2VyU2VydmVyIH07XG4vKipcbiAqIENhbGxlZCBvbiB0aGUgd29ya2VyIHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShwb3N0TWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgU2ltcGxlV29ya2VyU2VydmVyKHBvc3RNZXNzYWdlLCBudWxsKTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgdG9VaW50OCB9IGZyb20gJy4vdWludC5qcyc7XG4vKipcbiAqIEEgZmFzdCBjaGFyYWN0ZXIgY2xhc3NpZmllciB0aGF0IHVzZXMgYSBjb21wYWN0IGFycmF5IGZvciBBU0NJSSB2YWx1ZXMuXG4gKi9cbnZhciBDaGFyYWN0ZXJDbGFzc2lmaWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENoYXJhY3RlckNsYXNzaWZpZXIoX2RlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gdG9VaW50OChfZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICB0aGlzLl9hc2NpaU1hcCA9IENoYXJhY3RlckNsYXNzaWZpZXIuX2NyZWF0ZUFzY2lpTWFwKGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgQ2hhcmFjdGVyQ2xhc3NpZmllci5fY3JlYXRlQXNjaWlNYXAgPSBmdW5jdGlvbiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciBhc2NpaU1hcCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgICAgIGFzY2lpTWFwW2ldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhc2NpaU1hcDtcbiAgICB9O1xuICAgIENoYXJhY3RlckNsYXNzaWZpZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChjaGFyQ29kZSwgX3ZhbHVlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRvVWludDgoX3ZhbHVlKTtcbiAgICAgICAgaWYgKGNoYXJDb2RlID49IDAgJiYgY2hhckNvZGUgPCAyNTYpIHtcbiAgICAgICAgICAgIHRoaXMuX2FzY2lpTWFwW2NoYXJDb2RlXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChjaGFyQ29kZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaGFyYWN0ZXJDbGFzc2lmaWVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoY2hhckNvZGUpIHtcbiAgICAgICAgaWYgKGNoYXJDb2RlID49IDAgJiYgY2hhckNvZGUgPCAyNTYpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hc2NpaU1hcFtjaGFyQ29kZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX21hcC5nZXQoY2hhckNvZGUpIHx8IHRoaXMuX2RlZmF1bHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDaGFyYWN0ZXJDbGFzc2lmaWVyO1xufSgpKTtcbmV4cG9ydCB7IENoYXJhY3RlckNsYXNzaWZpZXIgfTtcbnZhciBDaGFyYWN0ZXJTZXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hhcmFjdGVyU2V0KCkge1xuICAgICAgICB0aGlzLl9hY3R1YWwgPSBuZXcgQ2hhcmFjdGVyQ2xhc3NpZmllcigwIC8qIEZhbHNlICovKTtcbiAgICB9XG4gICAgQ2hhcmFjdGVyU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hhckNvZGUpIHtcbiAgICAgICAgdGhpcy5fYWN0dWFsLnNldChjaGFyQ29kZSwgMSAvKiBUcnVlICovKTtcbiAgICB9O1xuICAgIENoYXJhY3RlclNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGNoYXJDb2RlKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fYWN0dWFsLmdldChjaGFyQ29kZSkgPT09IDEgLyogVHJ1ZSAqLyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2hhcmFjdGVyU2V0O1xufSgpKTtcbmV4cG9ydCB7IENoYXJhY3RlclNldCB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEEgcG9zaXRpb24gaW4gdGhlIGVkaXRvci5cbiAqL1xudmFyIFBvc2l0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvc2l0aW9uKGxpbmVOdW1iZXIsIGNvbHVtbikge1xuICAgICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lTnVtYmVyO1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHBvc3Rpb24gZnJvbSB0aGlzIHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5ld0xpbmVOdW1iZXIgbmV3IGxpbmUgbnVtYmVyXG4gICAgICogQHBhcmFtIG5ld0NvbHVtbiBuZXcgY29sdW1uXG4gICAgICovXG4gICAgUG9zaXRpb24ucHJvdG90eXBlLndpdGggPSBmdW5jdGlvbiAobmV3TGluZU51bWJlciwgbmV3Q29sdW1uKSB7XG4gICAgICAgIGlmIChuZXdMaW5lTnVtYmVyID09PSB2b2lkIDApIHsgbmV3TGluZU51bWJlciA9IHRoaXMubGluZU51bWJlcjsgfVxuICAgICAgICBpZiAobmV3Q29sdW1uID09PSB2b2lkIDApIHsgbmV3Q29sdW1uID0gdGhpcy5jb2x1bW47IH1cbiAgICAgICAgaWYgKG5ld0xpbmVOdW1iZXIgPT09IHRoaXMubGluZU51bWJlciAmJiBuZXdDb2x1bW4gPT09IHRoaXMuY29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3TGluZU51bWJlciwgbmV3Q29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVyaXZlIGEgbmV3IHBvc2l0aW9uIGZyb20gdGhpcyBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZWx0YUxpbmVOdW1iZXIgbGluZSBudW1iZXIgZGVsdGFcbiAgICAgKiBAcGFyYW0gZGVsdGFDb2x1bW4gY29sdW1uIGRlbHRhXG4gICAgICovXG4gICAgUG9zaXRpb24ucHJvdG90eXBlLmRlbHRhID0gZnVuY3Rpb24gKGRlbHRhTGluZU51bWJlciwgZGVsdGFDb2x1bW4pIHtcbiAgICAgICAgaWYgKGRlbHRhTGluZU51bWJlciA9PT0gdm9pZCAwKSB7IGRlbHRhTGluZU51bWJlciA9IDA7IH1cbiAgICAgICAgaWYgKGRlbHRhQ29sdW1uID09PSB2b2lkIDApIHsgZGVsdGFDb2x1bW4gPSAwOyB9XG4gICAgICAgIHJldHVybiB0aGlzLndpdGgodGhpcy5saW5lTnVtYmVyICsgZGVsdGFMaW5lTnVtYmVyLCB0aGlzLmNvbHVtbiArIGRlbHRhQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhpcyBwb3NpdGlvbiBlcXVhbHMgb3RoZXIgcG9zaXRpb25cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5lcXVhbHModGhpcywgb3RoZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBwb3NpdGlvbiBgYWAgZXF1YWxzIHBvc2l0aW9uIGBiYFxuICAgICAqL1xuICAgIFBvc2l0aW9uLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmICghYSAmJiAhYikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICghIWEgJiZcbiAgICAgICAgICAgICEhYiAmJlxuICAgICAgICAgICAgYS5saW5lTnVtYmVyID09PSBiLmxpbmVOdW1iZXIgJiZcbiAgICAgICAgICAgIGEuY29sdW1uID09PSBiLmNvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoaXMgcG9zaXRpb24gaXMgYmVmb3JlIG90aGVyIHBvc2l0aW9uLlxuICAgICAqIElmIHRoZSB0d28gcG9zaXRpb25zIGFyZSBlcXVhbCwgdGhlIHJlc3VsdCB3aWxsIGJlIGZhbHNlLlxuICAgICAqL1xuICAgIFBvc2l0aW9uLnByb3RvdHlwZS5pc0JlZm9yZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNCZWZvcmUodGhpcywgb3RoZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBwb3NpdGlvbiBgYWAgaXMgYmVmb3JlIHBvc2l0aW9uIGBiYC5cbiAgICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSBmYWxzZS5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5pc0JlZm9yZSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhLmxpbmVOdW1iZXIgPCBiLmxpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiLmxpbmVOdW1iZXIgPCBhLmxpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5jb2x1bW4gPCBiLmNvbHVtbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhpcyBwb3NpdGlvbiBpcyBiZWZvcmUgb3RoZXIgcG9zaXRpb24uXG4gICAgICogSWYgdGhlIHR3byBwb3NpdGlvbnMgYXJlIGVxdWFsLCB0aGUgcmVzdWx0IHdpbGwgYmUgdHJ1ZS5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5wcm90b3R5cGUuaXNCZWZvcmVPckVxdWFsID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc0JlZm9yZU9yRXF1YWwodGhpcywgb3RoZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBwb3NpdGlvbiBgYWAgaXMgYmVmb3JlIHBvc2l0aW9uIGBiYC5cbiAgICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSB0cnVlLlxuICAgICAqL1xuICAgIFBvc2l0aW9uLmlzQmVmb3JlT3JFcXVhbCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhLmxpbmVOdW1iZXIgPCBiLmxpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiLmxpbmVOdW1iZXIgPCBhLmxpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5jb2x1bW4gPD0gYi5jb2x1bW47XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXMgcG9zaXRpb25zLCB1c2VmdWwgZm9yIHNvcnRpbmdcbiAgICAgKi9cbiAgICBQb3NpdGlvbi5jb21wYXJlID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIGFMaW5lTnVtYmVyID0gYS5saW5lTnVtYmVyIHwgMDtcbiAgICAgICAgdmFyIGJMaW5lTnVtYmVyID0gYi5saW5lTnVtYmVyIHwgMDtcbiAgICAgICAgaWYgKGFMaW5lTnVtYmVyID09PSBiTGluZU51bWJlcikge1xuICAgICAgICAgICAgdmFyIGFDb2x1bW4gPSBhLmNvbHVtbiB8IDA7XG4gICAgICAgICAgICB2YXIgYkNvbHVtbiA9IGIuY29sdW1uIHwgMDtcbiAgICAgICAgICAgIHJldHVybiBhQ29sdW1uIC0gYkNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYUxpbmVOdW1iZXIgLSBiTGluZU51bWJlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsb25lIHRoaXMgcG9zaXRpb24uXG4gICAgICovXG4gICAgUG9zaXRpb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHRoaXMubGluZU51bWJlciwgdGhpcy5jb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29udmVydCB0byBhIGh1bWFuLXJlYWRhYmxlIHJlcHJlc2VudGF0aW9uLlxuICAgICAqL1xuICAgIFBvc2l0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcoJyArIHRoaXMubGluZU51bWJlciArICcsJyArIHRoaXMuY29sdW1uICsgJyknO1xuICAgIH07XG4gICAgLy8gLS0tXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgYFBvc2l0aW9uYCBmcm9tIGFuIGBJUG9zaXRpb25gLlxuICAgICAqL1xuICAgIFBvc2l0aW9uLmxpZnQgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24ocG9zLmxpbmVOdW1iZXIsIHBvcy5jb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBgb2JqYCBpcyBhbiBgSVBvc2l0aW9uYC5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5pc0lQb3NpdGlvbiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIChvYmpcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLmxpbmVOdW1iZXIgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmouY29sdW1uID09PSAnbnVtYmVyJykpO1xuICAgIH07XG4gICAgcmV0dXJuIFBvc2l0aW9uO1xufSgpKTtcbmV4cG9ydCB7IFBvc2l0aW9uIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnLi9wb3NpdGlvbi5qcyc7XG4vKipcbiAqIEEgcmFuZ2UgaW4gdGhlIGVkaXRvci4gKHN0YXJ0TGluZU51bWJlcixzdGFydENvbHVtbikgaXMgPD0gKGVuZExpbmVOdW1iZXIsZW5kQ29sdW1uKVxuICovXG52YXIgUmFuZ2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmFuZ2Uoc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbiwgZW5kTGluZU51bWJlciwgZW5kQ29sdW1uKSB7XG4gICAgICAgIGlmICgoc3RhcnRMaW5lTnVtYmVyID4gZW5kTGluZU51bWJlcikgfHwgKHN0YXJ0TGluZU51bWJlciA9PT0gZW5kTGluZU51bWJlciAmJiBzdGFydENvbHVtbiA+IGVuZENvbHVtbikpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMaW5lTnVtYmVyID0gZW5kTGluZU51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb2x1bW4gPSBlbmRDb2x1bW47XG4gICAgICAgICAgICB0aGlzLmVuZExpbmVOdW1iZXIgPSBzdGFydExpbmVOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLmVuZENvbHVtbiA9IHN0YXJ0Q29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydExpbmVOdW1iZXIgPSBzdGFydExpbmVOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29sdW1uID0gc3RhcnRDb2x1bW47XG4gICAgICAgICAgICB0aGlzLmVuZExpbmVOdW1iZXIgPSBlbmRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgdGhpcy5lbmRDb2x1bW4gPSBlbmRDb2x1bW47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiB0aGlzIHJhbmdlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUmFuZ2UuaXNFbXB0eSh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgYHJhbmdlYCBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBSYW5nZS5pc0VtcHR5ID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiAocmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID09PSByYW5nZS5lbmRMaW5lTnVtYmVyICYmIHJhbmdlLnN0YXJ0Q29sdW1uID09PSByYW5nZS5lbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBwb3NpdGlvbiBpcyBpbiB0aGlzIHJhbmdlLiBJZiB0aGUgcG9zaXRpb24gaXMgYXQgdGhlIGVkZ2VzLCB3aWxsIHJldHVybiB0cnVlLlxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS5jb250YWluc1Bvc2l0aW9uID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5jb250YWluc1Bvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgYHBvc2l0aW9uYCBpcyBpbiBgcmFuZ2VgLiBJZiB0aGUgcG9zaXRpb24gaXMgYXQgdGhlIGVkZ2VzLCB3aWxsIHJldHVybiB0cnVlLlxuICAgICAqL1xuICAgIFJhbmdlLmNvbnRhaW5zUG9zaXRpb24gPSBmdW5jdGlvbiAocmFuZ2UsIHBvc2l0aW9uKSB7XG4gICAgICAgIGlmIChwb3NpdGlvbi5saW5lTnVtYmVyIDwgcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIHx8IHBvc2l0aW9uLmxpbmVOdW1iZXIgPiByYW5nZS5lbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uLmxpbmVOdW1iZXIgPT09IHJhbmdlLnN0YXJ0TGluZU51bWJlciAmJiBwb3NpdGlvbi5jb2x1bW4gPCByYW5nZS5zdGFydENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbi5saW5lTnVtYmVyID09PSByYW5nZS5lbmRMaW5lTnVtYmVyICYmIHBvc2l0aW9uLmNvbHVtbiA+IHJhbmdlLmVuZENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiByYW5nZSBpcyBpbiB0aGlzIHJhbmdlLiBJZiB0aGUgcmFuZ2UgaXMgZXF1YWwgdG8gdGhpcyByYW5nZSwgd2lsbCByZXR1cm4gdHJ1ZS5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuY29udGFpbnNSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICByZXR1cm4gUmFuZ2UuY29udGFpbnNSYW5nZSh0aGlzLCByYW5nZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIGBvdGhlclJhbmdlYCBpcyBpbiBgcmFuZ2VgLiBJZiB0aGUgcmFuZ2VzIGFyZSBlcXVhbCwgd2lsbCByZXR1cm4gdHJ1ZS5cbiAgICAgKi9cbiAgICBSYW5nZS5jb250YWluc1JhbmdlID0gZnVuY3Rpb24gKHJhbmdlLCBvdGhlclJhbmdlKSB7XG4gICAgICAgIGlmIChvdGhlclJhbmdlLnN0YXJ0TGluZU51bWJlciA8IHJhbmdlLnN0YXJ0TGluZU51bWJlciB8fCBvdGhlclJhbmdlLmVuZExpbmVOdW1iZXIgPCByYW5nZS5zdGFydExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXJSYW5nZS5zdGFydExpbmVOdW1iZXIgPiByYW5nZS5lbmRMaW5lTnVtYmVyIHx8IG90aGVyUmFuZ2UuZW5kTGluZU51bWJlciA+IHJhbmdlLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXJSYW5nZS5zdGFydExpbmVOdW1iZXIgPT09IHJhbmdlLnN0YXJ0TGluZU51bWJlciAmJiBvdGhlclJhbmdlLnN0YXJ0Q29sdW1uIDwgcmFuZ2Uuc3RhcnRDb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXJSYW5nZS5lbmRMaW5lTnVtYmVyID09PSByYW5nZS5lbmRMaW5lTnVtYmVyICYmIG90aGVyUmFuZ2UuZW5kQ29sdW1uID4gcmFuZ2UuZW5kQ29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIHJldW5pb24gb2YgdGhlIHR3byByYW5nZXMuXG4gICAgICogVGhlIHNtYWxsZXN0IHBvc2l0aW9uIHdpbGwgYmUgdXNlZCBhcyB0aGUgc3RhcnQgcG9pbnQsIGFuZCB0aGUgbGFyZ2VzdCBvbmUgYXMgdGhlIGVuZCBwb2ludC5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUucGx1c1JhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5wbHVzUmFuZ2UodGhpcywgcmFuZ2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSByZXVuaW9uIG9mIHRoZSB0d28gcmFuZ2VzLlxuICAgICAqIFRoZSBzbWFsbGVzdCBwb3NpdGlvbiB3aWxsIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IHBvaW50LCBhbmQgdGhlIGxhcmdlc3Qgb25lIGFzIHRoZSBlbmQgcG9pbnQuXG4gICAgICovXG4gICAgUmFuZ2UucGx1c1JhbmdlID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIHN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uO1xuICAgICAgICB2YXIgZW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIGVuZENvbHVtbjtcbiAgICAgICAgaWYgKGIuc3RhcnRMaW5lTnVtYmVyIDwgYS5zdGFydExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0TGluZU51bWJlciA9IGIuc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgc3RhcnRDb2x1bW4gPSBiLnN0YXJ0Q29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIuc3RhcnRMaW5lTnVtYmVyID09PSBhLnN0YXJ0TGluZU51bWJlcikge1xuICAgICAgICAgICAgc3RhcnRMaW5lTnVtYmVyID0gYi5zdGFydExpbmVOdW1iZXI7XG4gICAgICAgICAgICBzdGFydENvbHVtbiA9IE1hdGgubWluKGIuc3RhcnRDb2x1bW4sIGEuc3RhcnRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhcnRMaW5lTnVtYmVyID0gYS5zdGFydExpbmVOdW1iZXI7XG4gICAgICAgICAgICBzdGFydENvbHVtbiA9IGEuc3RhcnRDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIuZW5kTGluZU51bWJlciA+IGEuZW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgZW5kTGluZU51bWJlciA9IGIuZW5kTGluZU51bWJlcjtcbiAgICAgICAgICAgIGVuZENvbHVtbiA9IGIuZW5kQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIuZW5kTGluZU51bWJlciA9PT0gYS5lbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICBlbmRMaW5lTnVtYmVyID0gYi5lbmRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgZW5kQ29sdW1uID0gTWF0aC5tYXgoYi5lbmRDb2x1bW4sIGEuZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVuZExpbmVOdW1iZXIgPSBhLmVuZExpbmVOdW1iZXI7XG4gICAgICAgICAgICBlbmRDb2x1bW4gPSBhLmVuZENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIGludGVyc2VjdGlvbiBvZiB0aGUgdHdvIHJhbmdlcy5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuaW50ZXJzZWN0UmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5pbnRlcnNlY3RSYW5nZXModGhpcywgcmFuZ2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBpbnRlcnNlY3Rpb24gb2YgdGhlIHR3byByYW5nZXMuXG4gICAgICovXG4gICAgUmFuZ2UuaW50ZXJzZWN0UmFuZ2VzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIHJlc3VsdFN0YXJ0TGluZU51bWJlciA9IGEuc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgcmVzdWx0U3RhcnRDb2x1bW4gPSBhLnN0YXJ0Q29sdW1uO1xuICAgICAgICB2YXIgcmVzdWx0RW5kTGluZU51bWJlciA9IGEuZW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIHJlc3VsdEVuZENvbHVtbiA9IGEuZW5kQ29sdW1uO1xuICAgICAgICB2YXIgb3RoZXJTdGFydExpbmVOdW1iZXIgPSBiLnN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdmFyIG90aGVyU3RhcnRDb2x1bW4gPSBiLnN0YXJ0Q29sdW1uO1xuICAgICAgICB2YXIgb3RoZXJFbmRMaW5lTnVtYmVyID0gYi5lbmRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgb3RoZXJFbmRDb2x1bW4gPSBiLmVuZENvbHVtbjtcbiAgICAgICAgaWYgKHJlc3VsdFN0YXJ0TGluZU51bWJlciA8IG90aGVyU3RhcnRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXN1bHRTdGFydExpbmVOdW1iZXIgPSBvdGhlclN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgICAgIHJlc3VsdFN0YXJ0Q29sdW1uID0gb3RoZXJTdGFydENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXN1bHRTdGFydExpbmVOdW1iZXIgPT09IG90aGVyU3RhcnRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXN1bHRTdGFydENvbHVtbiA9IE1hdGgubWF4KHJlc3VsdFN0YXJ0Q29sdW1uLCBvdGhlclN0YXJ0Q29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0RW5kTGluZU51bWJlciA+IG90aGVyRW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgcmVzdWx0RW5kTGluZU51bWJlciA9IG90aGVyRW5kTGluZU51bWJlcjtcbiAgICAgICAgICAgIHJlc3VsdEVuZENvbHVtbiA9IG90aGVyRW5kQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdEVuZExpbmVOdW1iZXIgPT09IG90aGVyRW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgcmVzdWx0RW5kQ29sdW1uID0gTWF0aC5taW4ocmVzdWx0RW5kQ29sdW1uLCBvdGhlckVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0aW9uIGlzIG5vdyBlbXB0eVxuICAgICAgICBpZiAocmVzdWx0U3RhcnRMaW5lTnVtYmVyID4gcmVzdWx0RW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFN0YXJ0TGluZU51bWJlciA9PT0gcmVzdWx0RW5kTGluZU51bWJlciAmJiByZXN1bHRTdGFydENvbHVtbiA+IHJlc3VsdEVuZENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyZXN1bHRTdGFydExpbmVOdW1iZXIsIHJlc3VsdFN0YXJ0Q29sdW1uLCByZXN1bHRFbmRMaW5lTnVtYmVyLCByZXN1bHRFbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiB0aGlzIHJhbmdlIGVxdWFscyBvdGhlci5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuZXF1YWxzUmFuZ2UgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIFJhbmdlLmVxdWFsc1JhbmdlKHRoaXMsIG90aGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgcmFuZ2UgYGFgIGVxdWFscyBgYmAuXG4gICAgICovXG4gICAgUmFuZ2UuZXF1YWxzUmFuZ2UgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gKCEhYSAmJlxuICAgICAgICAgICAgISFiICYmXG4gICAgICAgICAgICBhLnN0YXJ0TGluZU51bWJlciA9PT0gYi5zdGFydExpbmVOdW1iZXIgJiZcbiAgICAgICAgICAgIGEuc3RhcnRDb2x1bW4gPT09IGIuc3RhcnRDb2x1bW4gJiZcbiAgICAgICAgICAgIGEuZW5kTGluZU51bWJlciA9PT0gYi5lbmRMaW5lTnVtYmVyICYmXG4gICAgICAgICAgICBhLmVuZENvbHVtbiA9PT0gYi5lbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBlbmQgcG9zaXRpb24gKHdoaWNoIHdpbGwgYmUgYWZ0ZXIgb3IgZXF1YWwgdG8gdGhlIHN0YXJ0IHBvc2l0aW9uKVxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS5nZXRFbmRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbih0aGlzLmVuZExpbmVOdW1iZXIsIHRoaXMuZW5kQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgc3RhcnQgcG9zaXRpb24gKHdoaWNoIHdpbGwgYmUgYmVmb3JlIG9yIGVxdWFsIHRvIHRoZSBlbmQgcG9zaXRpb24pXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLmdldFN0YXJ0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24odGhpcy5zdGFydExpbmVOdW1iZXIsIHRoaXMuc3RhcnRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtIHRvIGEgdXNlciBwcmVzZW50YWJsZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJ1snICsgdGhpcy5zdGFydExpbmVOdW1iZXIgKyAnLCcgKyB0aGlzLnN0YXJ0Q29sdW1uICsgJyAtPiAnICsgdGhpcy5lbmRMaW5lTnVtYmVyICsgJywnICsgdGhpcy5lbmRDb2x1bW4gKyAnXSc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgcmFuZ2UgdXNpbmcgdGhpcyByYW5nZSdzIHN0YXJ0IHBvc2l0aW9uLCBhbmQgdXNpbmcgZW5kTGluZU51bWJlciBhbmQgZW5kQ29sdW1uIGFzIHRoZSBlbmQgcG9zaXRpb24uXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLnNldEVuZFBvc2l0aW9uID0gZnVuY3Rpb24gKGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbikge1xuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHRoaXMuc3RhcnRMaW5lTnVtYmVyLCB0aGlzLnN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHJhbmdlIHVzaW5nIHRoaXMgcmFuZ2UncyBlbmQgcG9zaXRpb24sIGFuZCB1c2luZyBzdGFydExpbmVOdW1iZXIgYW5kIHN0YXJ0Q29sdW1uIGFzIHRoZSBzdGFydCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuc2V0U3RhcnRQb3NpdGlvbiA9IGZ1bmN0aW9uIChzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbiwgdGhpcy5lbmRMaW5lTnVtYmVyLCB0aGlzLmVuZENvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZW1wdHkgcmFuZ2UgdXNpbmcgdGhpcyByYW5nZSdzIHN0YXJ0IHBvc2l0aW9uLlxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS5jb2xsYXBzZVRvU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5jb2xsYXBzZVRvU3RhcnQodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZW1wdHkgcmFuZ2UgdXNpbmcgdGhpcyByYW5nZSdzIHN0YXJ0IHBvc2l0aW9uLlxuICAgICAqL1xuICAgIFJhbmdlLmNvbGxhcHNlVG9TdGFydCA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnN0YXJ0TGluZU51bWJlciwgcmFuZ2Uuc3RhcnRDb2x1bW4sIHJhbmdlLnN0YXJ0TGluZU51bWJlciwgcmFuZ2Uuc3RhcnRDb2x1bW4pO1xuICAgIH07XG4gICAgLy8gLS0tXG4gICAgUmFuZ2UuZnJvbVBvc2l0aW9ucyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIGlmIChlbmQgPT09IHZvaWQgMCkgeyBlbmQgPSBzdGFydDsgfVxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0LmxpbmVOdW1iZXIsIHN0YXJ0LmNvbHVtbiwgZW5kLmxpbmVOdW1iZXIsIGVuZC5jb2x1bW4pO1xuICAgIH07XG4gICAgUmFuZ2UubGlmdCA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnN0YXJ0TGluZU51bWJlciwgcmFuZ2Uuc3RhcnRDb2x1bW4sIHJhbmdlLmVuZExpbmVOdW1iZXIsIHJhbmdlLmVuZENvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIGBvYmpgIGlzIGFuIGBJUmFuZ2VgLlxuICAgICAqL1xuICAgIFJhbmdlLmlzSVJhbmdlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gKG9ialxuICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmouc3RhcnRMaW5lTnVtYmVyID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLnN0YXJ0Q29sdW1uID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLmVuZExpbmVOdW1iZXIgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmouZW5kQ29sdW1uID09PSAnbnVtYmVyJykpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiB0aGUgdHdvIHJhbmdlcyBhcmUgdG91Y2hpbmcgaW4gYW55IHdheS5cbiAgICAgKi9cbiAgICBSYW5nZS5hcmVJbnRlcnNlY3RpbmdPclRvdWNoaW5nID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYGFgIGlzIGJlZm9yZSBgYmBcbiAgICAgICAgaWYgKGEuZW5kTGluZU51bWJlciA8IGIuc3RhcnRMaW5lTnVtYmVyIHx8IChhLmVuZExpbmVOdW1iZXIgPT09IGIuc3RhcnRMaW5lTnVtYmVyICYmIGEuZW5kQ29sdW1uIDwgYi5zdGFydENvbHVtbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBpZiBgYmAgaXMgYmVmb3JlIGBhYFxuICAgICAgICBpZiAoYi5lbmRMaW5lTnVtYmVyIDwgYS5zdGFydExpbmVOdW1iZXIgfHwgKGIuZW5kTGluZU51bWJlciA9PT0gYS5zdGFydExpbmVOdW1iZXIgJiYgYi5lbmRDb2x1bW4gPCBhLnN0YXJ0Q29sdW1uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZXNlIHJhbmdlcyBtdXN0IGludGVyc2VjdFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhlIHR3byByYW5nZXMgYXJlIGludGVyc2VjdGluZy4gSWYgdGhlIHJhbmdlcyBhcmUgdG91Y2hpbmcgaXQgcmV0dXJucyB0cnVlLlxuICAgICAqL1xuICAgIFJhbmdlLmFyZUludGVyc2VjdGluZyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGBhYCBpcyBiZWZvcmUgYGJgXG4gICAgICAgIGlmIChhLmVuZExpbmVOdW1iZXIgPCBiLnN0YXJ0TGluZU51bWJlciB8fCAoYS5lbmRMaW5lTnVtYmVyID09PSBiLnN0YXJ0TGluZU51bWJlciAmJiBhLmVuZENvbHVtbiA8PSBiLnN0YXJ0Q29sdW1uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIGBiYCBpcyBiZWZvcmUgYGFgXG4gICAgICAgIGlmIChiLmVuZExpbmVOdW1iZXIgPCBhLnN0YXJ0TGluZU51bWJlciB8fCAoYi5lbmRMaW5lTnVtYmVyID09PSBhLnN0YXJ0TGluZU51bWJlciAmJiBiLmVuZENvbHVtbiA8PSBhLnN0YXJ0Q29sdW1uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZXNlIHJhbmdlcyBtdXN0IGludGVyc2VjdFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCBjb21wYXJlcyByYW5nZXMsIHVzZWZ1bCBmb3Igc29ydGluZyByYW5nZXNcbiAgICAgKiBJdCB3aWxsIGZpcnN0IGNvbXBhcmUgcmFuZ2VzIG9uIHRoZSBzdGFydFBvc2l0aW9uIGFuZCB0aGVuIG9uIHRoZSBlbmRQb3NpdGlvblxuICAgICAqL1xuICAgIFJhbmdlLmNvbXBhcmVSYW5nZXNVc2luZ1N0YXJ0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhICYmIGIpIHtcbiAgICAgICAgICAgIHZhciBhU3RhcnRMaW5lTnVtYmVyID0gYS5zdGFydExpbmVOdW1iZXIgfCAwO1xuICAgICAgICAgICAgdmFyIGJTdGFydExpbmVOdW1iZXIgPSBiLnN0YXJ0TGluZU51bWJlciB8IDA7XG4gICAgICAgICAgICBpZiAoYVN0YXJ0TGluZU51bWJlciA9PT0gYlN0YXJ0TGluZU51bWJlcikge1xuICAgICAgICAgICAgICAgIHZhciBhU3RhcnRDb2x1bW4gPSBhLnN0YXJ0Q29sdW1uIHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgYlN0YXJ0Q29sdW1uID0gYi5zdGFydENvbHVtbiB8IDA7XG4gICAgICAgICAgICAgICAgaWYgKGFTdGFydENvbHVtbiA9PT0gYlN0YXJ0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhRW5kTGluZU51bWJlciA9IGEuZW5kTGluZU51bWJlciB8IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiRW5kTGluZU51bWJlciA9IGIuZW5kTGluZU51bWJlciB8IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhRW5kTGluZU51bWJlciA9PT0gYkVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhRW5kQ29sdW1uID0gYS5lbmRDb2x1bW4gfCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJFbmRDb2x1bW4gPSBiLmVuZENvbHVtbiB8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYUVuZENvbHVtbiAtIGJFbmRDb2x1bW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFFbmRMaW5lTnVtYmVyIC0gYkVuZExpbmVOdW1iZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhU3RhcnRDb2x1bW4gLSBiU3RhcnRDb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYVN0YXJ0TGluZU51bWJlciAtIGJTdGFydExpbmVOdW1iZXI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFFeGlzdHMgPSAoYSA/IDEgOiAwKTtcbiAgICAgICAgdmFyIGJFeGlzdHMgPSAoYiA/IDEgOiAwKTtcbiAgICAgICAgcmV0dXJuIGFFeGlzdHMgLSBiRXhpc3RzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IGNvbXBhcmVzIHJhbmdlcywgdXNlZnVsIGZvciBzb3J0aW5nIHJhbmdlc1xuICAgICAqIEl0IHdpbGwgZmlyc3QgY29tcGFyZSByYW5nZXMgb24gdGhlIGVuZFBvc2l0aW9uIGFuZCB0aGVuIG9uIHRoZSBzdGFydFBvc2l0aW9uXG4gICAgICovXG4gICAgUmFuZ2UuY29tcGFyZVJhbmdlc1VzaW5nRW5kcyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhLmVuZExpbmVOdW1iZXIgPT09IGIuZW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgaWYgKGEuZW5kQ29sdW1uID09PSBiLmVuZENvbHVtbikge1xuICAgICAgICAgICAgICAgIGlmIChhLnN0YXJ0TGluZU51bWJlciA9PT0gYi5zdGFydExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuc3RhcnRDb2x1bW4gLSBiLnN0YXJ0Q29sdW1uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYS5zdGFydExpbmVOdW1iZXIgLSBiLnN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhLmVuZENvbHVtbiAtIGIuZW5kQ29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhLmVuZExpbmVOdW1iZXIgLSBiLmVuZExpbmVOdW1iZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoZSByYW5nZSBzcGFucyBtdWx0aXBsZSBsaW5lcy5cbiAgICAgKi9cbiAgICBSYW5nZS5zcGFuc011bHRpcGxlTGluZXMgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlLmVuZExpbmVOdW1iZXIgPiByYW5nZS5zdGFydExpbmVOdW1iZXI7XG4gICAgfTtcbiAgICByZXR1cm4gUmFuZ2U7XG59KCkpO1xuZXhwb3J0IHsgUmFuZ2UgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4vcG9zaXRpb24uanMnO1xuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuL3JhbmdlLmpzJztcbi8qKlxuICogQSBzZWxlY3Rpb24gaW4gdGhlIGVkaXRvci5cbiAqIFRoZSBzZWxlY3Rpb24gaXMgYSByYW5nZSB0aGF0IGhhcyBhbiBvcmllbnRhdGlvbi5cbiAqL1xudmFyIFNlbGVjdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlbGVjdGlvbihzZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsIHNlbGVjdGlvblN0YXJ0Q29sdW1uLCBwb3NpdGlvbkxpbmVOdW1iZXIsIHBvc2l0aW9uQ29sdW1uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNlbGVjdGlvblN0YXJ0TGluZU51bWJlciwgc2VsZWN0aW9uU3RhcnRDb2x1bW4sIHBvc2l0aW9uTGluZU51bWJlciwgcG9zaXRpb25Db2x1bW4pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciA9IHNlbGVjdGlvblN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgX3RoaXMuc2VsZWN0aW9uU3RhcnRDb2x1bW4gPSBzZWxlY3Rpb25TdGFydENvbHVtbjtcbiAgICAgICAgX3RoaXMucG9zaXRpb25MaW5lTnVtYmVyID0gcG9zaXRpb25MaW5lTnVtYmVyO1xuICAgICAgICBfdGhpcy5wb3NpdGlvbkNvbHVtbiA9IHBvc2l0aW9uQ29sdW1uO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb25lIHRoaXMgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLCB0aGlzLnNlbGVjdGlvblN0YXJ0Q29sdW1uLCB0aGlzLnBvc2l0aW9uTGluZU51bWJlciwgdGhpcy5wb3NpdGlvbkNvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdG8gYSBodW1hbi1yZWFkYWJsZSByZXByZXNlbnRhdGlvbi5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJ1snICsgdGhpcy5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIgKyAnLCcgKyB0aGlzLnNlbGVjdGlvblN0YXJ0Q29sdW1uICsgJyAtPiAnICsgdGhpcy5wb3NpdGlvbkxpbmVOdW1iZXIgKyAnLCcgKyB0aGlzLnBvc2l0aW9uQ29sdW1uICsgJ10nO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBlcXVhbHMgb3RoZXIgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5wcm90b3R5cGUuZXF1YWxzU2VsZWN0aW9uID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiAoU2VsZWN0aW9uLnNlbGVjdGlvbnNFcXVhbCh0aGlzLCBvdGhlcikpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiB0aGUgdHdvIHNlbGVjdGlvbnMgYXJlIGVxdWFsLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5zZWxlY3Rpb25zRXF1YWwgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gKGEuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyID09PSBiLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciAmJlxuICAgICAgICAgICAgYS5zZWxlY3Rpb25TdGFydENvbHVtbiA9PT0gYi5zZWxlY3Rpb25TdGFydENvbHVtbiAmJlxuICAgICAgICAgICAgYS5wb3NpdGlvbkxpbmVOdW1iZXIgPT09IGIucG9zaXRpb25MaW5lTnVtYmVyICYmXG4gICAgICAgICAgICBhLnBvc2l0aW9uQ29sdW1uID09PSBiLnBvc2l0aW9uQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBkaXJlY3Rpb25zIChMVFIgb3IgUlRMKS5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyID09PSB0aGlzLnN0YXJ0TGluZU51bWJlciAmJiB0aGlzLnNlbGVjdGlvblN0YXJ0Q29sdW1uID09PSB0aGlzLnN0YXJ0Q29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gMCAvKiBMVFIgKi87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDEgLyogUlRMICovO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHNlbGVjdGlvbiB3aXRoIGEgZGlmZmVyZW50IGBwb3NpdGlvbkxpbmVOdW1iZXJgIGFuZCBgcG9zaXRpb25Db2x1bW5gLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5wcm90b3R5cGUuc2V0RW5kUG9zaXRpb24gPSBmdW5jdGlvbiAoZW5kTGluZU51bWJlciwgZW5kQ29sdW1uKSB7XG4gICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbigpID09PSAwIC8qIExUUiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5zdGFydExpbmVOdW1iZXIsIHRoaXMuc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oZW5kTGluZU51bWJlciwgZW5kQ29sdW1uLCB0aGlzLnN0YXJ0TGluZU51bWJlciwgdGhpcy5zdGFydENvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBvc2l0aW9uIGF0IGBwb3NpdGlvbkxpbmVOdW1iZXJgIGFuZCBgcG9zaXRpb25Db2x1bW5gLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24odGhpcy5wb3NpdGlvbkxpbmVOdW1iZXIsIHRoaXMucG9zaXRpb25Db2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHNlbGVjdGlvbiB3aXRoIGEgZGlmZmVyZW50IGBzZWxlY3Rpb25TdGFydExpbmVOdW1iZXJgIGFuZCBgc2VsZWN0aW9uU3RhcnRDb2x1bW5gLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5wcm90b3R5cGUuc2V0U3RhcnRQb3NpdGlvbiA9IGZ1bmN0aW9uIChzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uKSB7XG4gICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbigpID09PSAwIC8qIExUUiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbiwgdGhpcy5lbmRMaW5lTnVtYmVyLCB0aGlzLmVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5lbmRMaW5lTnVtYmVyLCB0aGlzLmVuZENvbHVtbiwgc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbik7XG4gICAgfTtcbiAgICAvLyAtLS0tXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgYFNlbGVjdGlvbmAgZnJvbSBvbmUgb3IgdHdvIHBvc2l0aW9uc1xuICAgICAqL1xuICAgIFNlbGVjdGlvbi5mcm9tUG9zaXRpb25zID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gdm9pZCAwKSB7IGVuZCA9IHN0YXJ0OyB9XG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHN0YXJ0LmxpbmVOdW1iZXIsIHN0YXJ0LmNvbHVtbiwgZW5kLmxpbmVOdW1iZXIsIGVuZC5jb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgYFNlbGVjdGlvbmAgZnJvbSBhbiBgSVNlbGVjdGlvbmAuXG4gICAgICovXG4gICAgU2VsZWN0aW9uLmxpZnRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHNlbC5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsIHNlbC5zZWxlY3Rpb25TdGFydENvbHVtbiwgc2VsLnBvc2l0aW9uTGluZU51bWJlciwgc2VsLnBvc2l0aW9uQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGBhYCBlcXVhbHMgYGJgLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5zZWxlY3Rpb25zQXJyRXF1YWwgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYSAmJiAhYiB8fCAhYSAmJiBiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhICYmICFiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3Rpb25zRXF1YWwoYVtpXSwgYltpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIGBvYmpgIGlzIGFuIGBJU2VsZWN0aW9uYC5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24uaXNJU2VsZWN0aW9uID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gKG9ialxuICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmouc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLnNlbGVjdGlvblN0YXJ0Q29sdW1uID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLnBvc2l0aW9uTGluZU51bWJlciA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9iai5wb3NpdGlvbkNvbHVtbiA9PT0gJ251bWJlcicpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB3aXRoIGEgZGlyZWN0aW9uLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5jcmVhdGVXaXRoRGlyZWN0aW9uID0gZnVuY3Rpb24gKHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbiwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDAgLyogTFRSICovKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbiwgc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbik7XG4gICAgfTtcbiAgICByZXR1cm4gU2VsZWN0aW9uO1xufShSYW5nZSkpO1xuZXhwb3J0IHsgU2VsZWN0aW9uIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBUb2tlbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb2tlbihvZmZzZXQsIHR5cGUsIGxhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0IHwgMDsgLy8gQHBlcmZcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgIH1cbiAgICBUb2tlbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnKCcgKyB0aGlzLm9mZnNldCArICcsICcgKyB0aGlzLnR5cGUgKyAnKSc7XG4gICAgfTtcbiAgICByZXR1cm4gVG9rZW47XG59KCkpO1xuZXhwb3J0IHsgVG9rZW4gfTtcbnZhciBUb2tlbml6YXRpb25SZXN1bHQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVG9rZW5pemF0aW9uUmVzdWx0KHRva2VucywgZW5kU3RhdGUpIHtcbiAgICAgICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XG4gICAgICAgIHRoaXMuZW5kU3RhdGUgPSBlbmRTdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIFRva2VuaXphdGlvblJlc3VsdDtcbn0oKSk7XG5leHBvcnQgeyBUb2tlbml6YXRpb25SZXN1bHQgfTtcbnZhciBUb2tlbml6YXRpb25SZXN1bHQyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRva2VuaXphdGlvblJlc3VsdDIodG9rZW5zLCBlbmRTdGF0ZSkge1xuICAgICAgICB0aGlzLnRva2VucyA9IHRva2VucztcbiAgICAgICAgdGhpcy5lbmRTdGF0ZSA9IGVuZFN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4gVG9rZW5pemF0aW9uUmVzdWx0Mjtcbn0oKSk7XG5leHBvcnQgeyBUb2tlbml6YXRpb25SZXN1bHQyIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBVaW50OE1hdHJpeCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVaW50OE1hdHJpeChyb3dzLCBjb2xzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBuZXcgVWludDhBcnJheShyb3dzICogY29scyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByb3dzICogY29sczsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBkYXRhW2ldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgIH1cbiAgICBVaW50OE1hdHJpeC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHJvdywgY29sKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW3JvdyAqIHRoaXMuY29scyArIGNvbF07XG4gICAgfTtcbiAgICBVaW50OE1hdHJpeC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHJvdywgY29sLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kYXRhW3JvdyAqIHRoaXMuY29scyArIGNvbF0gPSB2YWx1ZTtcbiAgICB9O1xuICAgIHJldHVybiBVaW50OE1hdHJpeDtcbn0oKSk7XG5leHBvcnQgeyBVaW50OE1hdHJpeCB9O1xuZXhwb3J0IGZ1bmN0aW9uIHRvVWludDgodikge1xuICAgIGlmICh2IDwgMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKHYgPiAyNTUgLyogTUFYX1VJTlRfOCAqLykge1xuICAgICAgICByZXR1cm4gMjU1IC8qIE1BWF9VSU5UXzggKi87XG4gICAgfVxuICAgIHJldHVybiB2IHwgMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b1VpbnQzMih2KSB7XG4gICAgaWYgKHYgPCAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAodiA+IDQyOTQ5NjcyOTUgLyogTUFYX1VJTlRfMzIgKi8pIHtcbiAgICAgICAgcmV0dXJuIDQyOTQ5NjcyOTUgLyogTUFYX1VJTlRfMzIgKi87XG4gICAgfVxuICAgIHJldHVybiB2IHwgMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b1VpbnQzMkFycmF5KGFycikge1xuICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIHZhciByID0gbmV3IFVpbnQzMkFycmF5KGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICByW2ldID0gdG9VaW50MzIoYXJyW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHI7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IExjc0RpZmYgfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9kaWZmL2RpZmYuanMnO1xuaW1wb3J0ICogYXMgc3RyaW5ncyBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9zdHJpbmdzLmpzJztcbnZhciBNQVhJTVVNX1JVTl9USU1FID0gNTAwMDsgLy8gNSBzZWNvbmRzXG52YXIgTUlOSU1VTV9NQVRDSElOR19DSEFSQUNURVJfTEVOR1RIID0gMztcbmZ1bmN0aW9uIGNvbXB1dGVEaWZmKG9yaWdpbmFsU2VxdWVuY2UsIG1vZGlmaWVkU2VxdWVuY2UsIGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSwgcHJldHR5KSB7XG4gICAgdmFyIGRpZmZBbGdvID0gbmV3IExjc0RpZmYob3JpZ2luYWxTZXF1ZW5jZSwgbW9kaWZpZWRTZXF1ZW5jZSwgY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlKTtcbiAgICByZXR1cm4gZGlmZkFsZ28uQ29tcHV0ZURpZmYocHJldHR5KTtcbn1cbnZhciBMaW5lTWFya2VyU2VxdWVuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGluZU1hcmtlclNlcXVlbmNlKGxpbmVzKSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbnMgPSBbXTtcbiAgICAgICAgdmFyIGVuZENvbHVtbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aF8xID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuZ3RoXzE7IGkrKykge1xuICAgICAgICAgICAgc3RhcnRDb2x1bW5zW2ldID0gTGluZU1hcmtlclNlcXVlbmNlLl9nZXRGaXJzdE5vbkJsYW5rQ29sdW1uKGxpbmVzW2ldLCAxKTtcbiAgICAgICAgICAgIGVuZENvbHVtbnNbaV0gPSBMaW5lTWFya2VyU2VxdWVuY2UuX2dldExhc3ROb25CbGFua0NvbHVtbihsaW5lc1tpXSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGluZXMgPSBsaW5lcztcbiAgICAgICAgdGhpcy5fc3RhcnRDb2x1bW5zID0gc3RhcnRDb2x1bW5zO1xuICAgICAgICB0aGlzLl9lbmRDb2x1bW5zID0gZW5kQ29sdW1ucztcbiAgICB9XG4gICAgTGluZU1hcmtlclNlcXVlbmNlLnByb3RvdHlwZS5nZXRMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lcy5sZW5ndGg7XG4gICAgfTtcbiAgICBMaW5lTWFya2VyU2VxdWVuY2UucHJvdG90eXBlLmdldEVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzW2ldLnN1YnN0cmluZyh0aGlzLl9zdGFydENvbHVtbnNbaV0gLSAxLCB0aGlzLl9lbmRDb2x1bW5zW2ldIC0gMSk7XG4gICAgfTtcbiAgICBMaW5lTWFya2VyU2VxdWVuY2UucHJvdG90eXBlLmdldFN0YXJ0TGluZU51bWJlciA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiBpICsgMTtcbiAgICB9O1xuICAgIExpbmVNYXJrZXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0RW5kTGluZU51bWJlciA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiBpICsgMTtcbiAgICB9O1xuICAgIExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0Rmlyc3ROb25CbGFua0NvbHVtbiA9IGZ1bmN0aW9uICh0eHQsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgciA9IHN0cmluZ3MuZmlyc3ROb25XaGl0ZXNwYWNlSW5kZXgodHh0KTtcbiAgICAgICAgaWYgKHIgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByICsgMTtcbiAgICB9O1xuICAgIExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0TGFzdE5vbkJsYW5rQ29sdW1uID0gZnVuY3Rpb24gKHR4dCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByID0gc3RyaW5ncy5sYXN0Tm9uV2hpdGVzcGFjZUluZGV4KHR4dCk7XG4gICAgICAgIGlmIChyID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gciArIDI7XG4gICAgfTtcbiAgICBMaW5lTWFya2VyU2VxdWVuY2UucHJvdG90eXBlLmdldENoYXJTZXF1ZW5jZSA9IGZ1bmN0aW9uIChzaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJDb2RlcyA9IFtdO1xuICAgICAgICB2YXIgbGluZU51bWJlcnMgPSBbXTtcbiAgICAgICAgdmFyIGNvbHVtbnMgPSBbXTtcbiAgICAgICAgdmFyIGxlbiA9IDA7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gc3RhcnRJbmRleDsgaW5kZXggPD0gZW5kSW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBsaW5lQ29udGVudCA9IHRoaXMuX2xpbmVzW2luZGV4XTtcbiAgICAgICAgICAgIHZhciBzdGFydENvbHVtbiA9IChzaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSA/IHRoaXMuX3N0YXJ0Q29sdW1uc1tpbmRleF0gOiAxKTtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSAoc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UgPyB0aGlzLl9lbmRDb2x1bW5zW2luZGV4XSA6IGxpbmVDb250ZW50Lmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gc3RhcnRDb2x1bW47IGNvbCA8IGVuZENvbHVtbjsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBjaGFyQ29kZXNbbGVuXSA9IGxpbmVDb250ZW50LmNoYXJDb2RlQXQoY29sIC0gMSk7XG4gICAgICAgICAgICAgICAgbGluZU51bWJlcnNbbGVuXSA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBjb2x1bW5zW2xlbl0gPSBjb2w7XG4gICAgICAgICAgICAgICAgbGVuKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDaGFyU2VxdWVuY2UoY2hhckNvZGVzLCBsaW5lTnVtYmVycywgY29sdW1ucyk7XG4gICAgfTtcbiAgICByZXR1cm4gTGluZU1hcmtlclNlcXVlbmNlO1xufSgpKTtcbnZhciBDaGFyU2VxdWVuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hhclNlcXVlbmNlKGNoYXJDb2RlcywgbGluZU51bWJlcnMsIGNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy5fY2hhckNvZGVzID0gY2hhckNvZGVzO1xuICAgICAgICB0aGlzLl9saW5lTnVtYmVycyA9IGxpbmVOdW1iZXJzO1xuICAgICAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcbiAgICB9XG4gICAgQ2hhclNlcXVlbmNlLnByb3RvdHlwZS5nZXRMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFyQ29kZXMubGVuZ3RoO1xuICAgIH07XG4gICAgQ2hhclNlcXVlbmNlLnByb3RvdHlwZS5nZXRFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFyQ29kZXNbaV07XG4gICAgfTtcbiAgICBDaGFyU2VxdWVuY2UucHJvdG90eXBlLmdldFN0YXJ0TGluZU51bWJlciA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lTnVtYmVyc1tpXTtcbiAgICB9O1xuICAgIENoYXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0U3RhcnRDb2x1bW4gPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1uc1tpXTtcbiAgICB9O1xuICAgIENoYXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0RW5kTGluZU51bWJlciA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lTnVtYmVyc1tpXTtcbiAgICB9O1xuICAgIENoYXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0RW5kQ29sdW1uID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNbaV0gKyAxO1xuICAgIH07XG4gICAgcmV0dXJuIENoYXJTZXF1ZW5jZTtcbn0oKSk7XG52YXIgQ2hhckNoYW5nZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaGFyQ2hhbmdlKG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyLCBvcmlnaW5hbFN0YXJ0Q29sdW1uLCBvcmlnaW5hbEVuZExpbmVOdW1iZXIsIG9yaWdpbmFsRW5kQ29sdW1uLCBtb2RpZmllZFN0YXJ0TGluZU51bWJlciwgbW9kaWZpZWRTdGFydENvbHVtbiwgbW9kaWZpZWRFbmRMaW5lTnVtYmVyLCBtb2RpZmllZEVuZENvbHVtbikge1xuICAgICAgICB0aGlzLm9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyID0gb3JpZ2luYWxTdGFydExpbmVOdW1iZXI7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTdGFydENvbHVtbiA9IG9yaWdpbmFsU3RhcnRDb2x1bW47XG4gICAgICAgIHRoaXMub3JpZ2luYWxFbmRMaW5lTnVtYmVyID0gb3JpZ2luYWxFbmRMaW5lTnVtYmVyO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRW5kQ29sdW1uID0gb3JpZ2luYWxFbmRDb2x1bW47XG4gICAgICAgIHRoaXMubW9kaWZpZWRTdGFydExpbmVOdW1iZXIgPSBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5tb2RpZmllZFN0YXJ0Q29sdW1uID0gbW9kaWZpZWRTdGFydENvbHVtbjtcbiAgICAgICAgdGhpcy5tb2RpZmllZEVuZExpbmVOdW1iZXIgPSBtb2RpZmllZEVuZExpbmVOdW1iZXI7XG4gICAgICAgIHRoaXMubW9kaWZpZWRFbmRDb2x1bW4gPSBtb2RpZmllZEVuZENvbHVtbjtcbiAgICB9XG4gICAgQ2hhckNoYW5nZS5jcmVhdGVGcm9tRGlmZkNoYW5nZSA9IGZ1bmN0aW9uIChkaWZmQ2hhbmdlLCBvcmlnaW5hbENoYXJTZXF1ZW5jZSwgbW9kaWZpZWRDaGFyU2VxdWVuY2UpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgb3JpZ2luYWxTdGFydENvbHVtbjtcbiAgICAgICAgdmFyIG9yaWdpbmFsRW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIG9yaWdpbmFsRW5kQ29sdW1uO1xuICAgICAgICB2YXIgbW9kaWZpZWRTdGFydExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBtb2RpZmllZFN0YXJ0Q29sdW1uO1xuICAgICAgICB2YXIgbW9kaWZpZWRFbmRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgbW9kaWZpZWRFbmRDb2x1bW47XG4gICAgICAgIGlmIChkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFN0YXJ0TGluZU51bWJlciA9IDA7XG4gICAgICAgICAgICBvcmlnaW5hbFN0YXJ0Q29sdW1uID0gMDtcbiAgICAgICAgICAgIG9yaWdpbmFsRW5kTGluZU51bWJlciA9IDA7XG4gICAgICAgICAgICBvcmlnaW5hbEVuZENvbHVtbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcmlnaW5hbFN0YXJ0TGluZU51bWJlciA9IG9yaWdpbmFsQ2hhclNlcXVlbmNlLmdldFN0YXJ0TGluZU51bWJlcihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQpO1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydENvbHVtbiA9IG9yaWdpbmFsQ2hhclNlcXVlbmNlLmdldFN0YXJ0Q29sdW1uKGRpZmZDaGFuZ2Uub3JpZ2luYWxTdGFydCk7XG4gICAgICAgICAgICBvcmlnaW5hbEVuZExpbmVOdW1iZXIgPSBvcmlnaW5hbENoYXJTZXF1ZW5jZS5nZXRFbmRMaW5lTnVtYmVyKGRpZmZDaGFuZ2Uub3JpZ2luYWxTdGFydCArIGRpZmZDaGFuZ2Uub3JpZ2luYWxMZW5ndGggLSAxKTtcbiAgICAgICAgICAgIG9yaWdpbmFsRW5kQ29sdW1uID0gb3JpZ2luYWxDaGFyU2VxdWVuY2UuZ2V0RW5kQ29sdW1uKGRpZmZDaGFuZ2Uub3JpZ2luYWxTdGFydCArIGRpZmZDaGFuZ2Uub3JpZ2luYWxMZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlmZkNoYW5nZS5tb2RpZmllZExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbW9kaWZpZWRTdGFydExpbmVOdW1iZXIgPSAwO1xuICAgICAgICAgICAgbW9kaWZpZWRTdGFydENvbHVtbiA9IDA7XG4gICAgICAgICAgICBtb2RpZmllZEVuZExpbmVOdW1iZXIgPSAwO1xuICAgICAgICAgICAgbW9kaWZpZWRFbmRDb2x1bW4gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW9kaWZpZWRTdGFydExpbmVOdW1iZXIgPSBtb2RpZmllZENoYXJTZXF1ZW5jZS5nZXRTdGFydExpbmVOdW1iZXIoZGlmZkNoYW5nZS5tb2RpZmllZFN0YXJ0KTtcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRDb2x1bW4gPSBtb2RpZmllZENoYXJTZXF1ZW5jZS5nZXRTdGFydENvbHVtbihkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQpO1xuICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyID0gbW9kaWZpZWRDaGFyU2VxdWVuY2UuZ2V0RW5kTGluZU51bWJlcihkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBkaWZmQ2hhbmdlLm1vZGlmaWVkTGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBtb2RpZmllZEVuZENvbHVtbiA9IG1vZGlmaWVkQ2hhclNlcXVlbmNlLmdldEVuZENvbHVtbihkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBkaWZmQ2hhbmdlLm1vZGlmaWVkTGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDaGFyQ2hhbmdlKG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyLCBvcmlnaW5hbFN0YXJ0Q29sdW1uLCBvcmlnaW5hbEVuZExpbmVOdW1iZXIsIG9yaWdpbmFsRW5kQ29sdW1uLCBtb2RpZmllZFN0YXJ0TGluZU51bWJlciwgbW9kaWZpZWRTdGFydENvbHVtbiwgbW9kaWZpZWRFbmRMaW5lTnVtYmVyLCBtb2RpZmllZEVuZENvbHVtbik7XG4gICAgfTtcbiAgICByZXR1cm4gQ2hhckNoYW5nZTtcbn0oKSk7XG5mdW5jdGlvbiBwb3N0UHJvY2Vzc0NoYXJDaGFuZ2VzKHJhd0NoYW5nZXMpIHtcbiAgICBpZiAocmF3Q2hhbmdlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gcmF3Q2hhbmdlcztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IFtyYXdDaGFuZ2VzWzBdXTtcbiAgICB2YXIgcHJldkNoYW5nZSA9IHJlc3VsdFswXTtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gcmF3Q2hhbmdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY3VyckNoYW5nZSA9IHJhd0NoYW5nZXNbaV07XG4gICAgICAgIHZhciBvcmlnaW5hbE1hdGNoaW5nTGVuZ3RoID0gY3VyckNoYW5nZS5vcmlnaW5hbFN0YXJ0IC0gKHByZXZDaGFuZ2Uub3JpZ2luYWxTdGFydCArIHByZXZDaGFuZ2Uub3JpZ2luYWxMZW5ndGgpO1xuICAgICAgICB2YXIgbW9kaWZpZWRNYXRjaGluZ0xlbmd0aCA9IGN1cnJDaGFuZ2UubW9kaWZpZWRTdGFydCAtIChwcmV2Q2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBwcmV2Q2hhbmdlLm1vZGlmaWVkTGVuZ3RoKTtcbiAgICAgICAgLy8gQm90aCBvZiB0aGUgYWJvdmUgc2hvdWxkIGJlIGVxdWFsLCBidXQgdGhlIGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSBtYXkgcHJldmVudCB0aGlzIGZyb20gYmVpbmcgdHJ1ZVxuICAgICAgICB2YXIgbWF0Y2hpbmdMZW5ndGggPSBNYXRoLm1pbihvcmlnaW5hbE1hdGNoaW5nTGVuZ3RoLCBtb2RpZmllZE1hdGNoaW5nTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nTGVuZ3RoIDwgTUlOSU1VTV9NQVRDSElOR19DSEFSQUNURVJfTEVOR1RIKSB7XG4gICAgICAgICAgICAvLyBNZXJnZSB0aGUgY3VycmVudCBjaGFuZ2UgaW50byB0aGUgcHJldmlvdXMgb25lXG4gICAgICAgICAgICBwcmV2Q2hhbmdlLm9yaWdpbmFsTGVuZ3RoID0gKGN1cnJDaGFuZ2Uub3JpZ2luYWxTdGFydCArIGN1cnJDaGFuZ2Uub3JpZ2luYWxMZW5ndGgpIC0gcHJldkNoYW5nZS5vcmlnaW5hbFN0YXJ0O1xuICAgICAgICAgICAgcHJldkNoYW5nZS5tb2RpZmllZExlbmd0aCA9IChjdXJyQ2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBjdXJyQ2hhbmdlLm1vZGlmaWVkTGVuZ3RoKSAtIHByZXZDaGFuZ2UubW9kaWZpZWRTdGFydDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgY3VycmVudCBjaGFuZ2VcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGN1cnJDaGFuZ2UpO1xuICAgICAgICAgICAgcHJldkNoYW5nZSA9IGN1cnJDaGFuZ2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBMaW5lQ2hhbmdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmVDaGFuZ2Uob3JpZ2luYWxTdGFydExpbmVOdW1iZXIsIG9yaWdpbmFsRW5kTGluZU51bWJlciwgbW9kaWZpZWRTdGFydExpbmVOdW1iZXIsIG1vZGlmaWVkRW5kTGluZU51bWJlciwgY2hhckNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFN0YXJ0TGluZU51bWJlciA9IG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRW5kTGluZU51bWJlciA9IG9yaWdpbmFsRW5kTGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5tb2RpZmllZFN0YXJ0TGluZU51bWJlciA9IG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB0aGlzLm1vZGlmaWVkRW5kTGluZU51bWJlciA9IG1vZGlmaWVkRW5kTGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5jaGFyQ2hhbmdlcyA9IGNoYXJDaGFuZ2VzO1xuICAgIH1cbiAgICBMaW5lQ2hhbmdlLmNyZWF0ZUZyb21EaWZmUmVzdWx0ID0gZnVuY3Rpb24gKHNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlLCBkaWZmQ2hhbmdlLCBvcmlnaW5hbExpbmVTZXF1ZW5jZSwgbW9kaWZpZWRMaW5lU2VxdWVuY2UsIGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSwgc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzLCBzaG91bGRQb3N0UHJvY2Vzc0NoYXJDaGFuZ2VzKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbFN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdmFyIG9yaWdpbmFsRW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgbW9kaWZpZWRFbmRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgY2hhckNoYW5nZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFN0YXJ0TGluZU51bWJlciA9IG9yaWdpbmFsTGluZVNlcXVlbmNlLmdldFN0YXJ0TGluZU51bWJlcihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQpIC0gMTtcbiAgICAgICAgICAgIG9yaWdpbmFsRW5kTGluZU51bWJlciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcmlnaW5hbFN0YXJ0TGluZU51bWJlciA9IG9yaWdpbmFsTGluZVNlcXVlbmNlLmdldFN0YXJ0TGluZU51bWJlcihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQpO1xuICAgICAgICAgICAgb3JpZ2luYWxFbmRMaW5lTnVtYmVyID0gb3JpZ2luYWxMaW5lU2VxdWVuY2UuZ2V0RW5kTGluZU51bWJlcihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQgKyBkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpZmZDaGFuZ2UubW9kaWZpZWRMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyID0gbW9kaWZpZWRMaW5lU2VxdWVuY2UuZ2V0U3RhcnRMaW5lTnVtYmVyKGRpZmZDaGFuZ2UubW9kaWZpZWRTdGFydCkgLSAxO1xuICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyID0gbW9kaWZpZWRMaW5lU2VxdWVuY2UuZ2V0U3RhcnRMaW5lTnVtYmVyKGRpZmZDaGFuZ2UubW9kaWZpZWRTdGFydCk7XG4gICAgICAgICAgICBtb2RpZmllZEVuZExpbmVOdW1iZXIgPSBtb2RpZmllZExpbmVTZXF1ZW5jZS5nZXRFbmRMaW5lTnVtYmVyKGRpZmZDaGFuZ2UubW9kaWZpZWRTdGFydCArIGRpZmZDaGFuZ2UubW9kaWZpZWRMZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzICYmIGRpZmZDaGFuZ2Uub3JpZ2luYWxMZW5ndGggIT09IDAgJiYgZGlmZkNoYW5nZS5tb2RpZmllZExlbmd0aCAhPT0gMCAmJiBjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUoKSkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsQ2hhclNlcXVlbmNlID0gb3JpZ2luYWxMaW5lU2VxdWVuY2UuZ2V0Q2hhclNlcXVlbmNlKHNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlLCBkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQsIGRpZmZDaGFuZ2Uub3JpZ2luYWxTdGFydCArIGRpZmZDaGFuZ2Uub3JpZ2luYWxMZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZENoYXJTZXF1ZW5jZSA9IG1vZGlmaWVkTGluZVNlcXVlbmNlLmdldENoYXJTZXF1ZW5jZShzaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSwgZGlmZkNoYW5nZS5tb2RpZmllZFN0YXJ0LCBkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBkaWZmQ2hhbmdlLm1vZGlmaWVkTGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB2YXIgcmF3Q2hhbmdlcyA9IGNvbXB1dGVEaWZmKG9yaWdpbmFsQ2hhclNlcXVlbmNlLCBtb2RpZmllZENoYXJTZXF1ZW5jZSwgY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRQb3N0UHJvY2Vzc0NoYXJDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmF3Q2hhbmdlcyA9IHBvc3RQcm9jZXNzQ2hhckNoYW5nZXMocmF3Q2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFyQ2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aF8yID0gcmF3Q2hhbmdlcy5sZW5ndGg7IGkgPCBsZW5ndGhfMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2hhckNoYW5nZXMucHVzaChDaGFyQ2hhbmdlLmNyZWF0ZUZyb21EaWZmQ2hhbmdlKHJhd0NoYW5nZXNbaV0sIG9yaWdpbmFsQ2hhclNlcXVlbmNlLCBtb2RpZmllZENoYXJTZXF1ZW5jZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgTGluZUNoYW5nZShvcmlnaW5hbFN0YXJ0TGluZU51bWJlciwgb3JpZ2luYWxFbmRMaW5lTnVtYmVyLCBtb2RpZmllZFN0YXJ0TGluZU51bWJlciwgbW9kaWZpZWRFbmRMaW5lTnVtYmVyLCBjaGFyQ2hhbmdlcyk7XG4gICAgfTtcbiAgICByZXR1cm4gTGluZUNoYW5nZTtcbn0oKSk7XG52YXIgRGlmZkNvbXB1dGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpZmZDb21wdXRlcihvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzID0gb3B0cy5zaG91bGRDb21wdXRlQ2hhckNoYW5nZXM7XG4gICAgICAgIHRoaXMuc2hvdWxkUG9zdFByb2Nlc3NDaGFyQ2hhbmdlcyA9IG9wdHMuc2hvdWxkUG9zdFByb2Nlc3NDaGFyQ2hhbmdlcztcbiAgICAgICAgdGhpcy5zaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSA9IG9wdHMuc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2U7XG4gICAgICAgIHRoaXMuc2hvdWxkTWFrZVByZXR0eURpZmYgPSBvcHRzLnNob3VsZE1ha2VQcmV0dHlEaWZmO1xuICAgICAgICB0aGlzLm1heGltdW1SdW5UaW1lTXMgPSBNQVhJTVVNX1JVTl9USU1FO1xuICAgICAgICB0aGlzLm9yaWdpbmFsTGluZXMgPSBvcmlnaW5hbExpbmVzO1xuICAgICAgICB0aGlzLm1vZGlmaWVkTGluZXMgPSBtb2RpZmllZExpbmVzO1xuICAgICAgICB0aGlzLm9yaWdpbmFsID0gbmV3IExpbmVNYXJrZXJTZXF1ZW5jZShvcmlnaW5hbExpbmVzKTtcbiAgICAgICAgdGhpcy5tb2RpZmllZCA9IG5ldyBMaW5lTWFya2VyU2VxdWVuY2UobW9kaWZpZWRMaW5lcyk7XG4gICAgfVxuICAgIERpZmZDb21wdXRlci5wcm90b3R5cGUuY29tcHV0ZURpZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsLmdldExlbmd0aCgpID09PSAxICYmIHRoaXMub3JpZ2luYWwuZ2V0RWxlbWVudEF0SW5kZXgoMCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBlbXB0eSBvcmlnaW5hbCA9PiBmYXN0IHBhdGhcbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFN0YXJ0TGluZU51bWJlcjogMSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFbmRMaW5lTnVtYmVyOiAxLFxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjogMSxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyOiB0aGlzLm1vZGlmaWVkLmdldExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICBjaGFyQ2hhbmdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEVuZENvbHVtbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEVuZExpbmVOdW1iZXI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydENvbHVtbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEVuZENvbHVtbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEVuZExpbmVOdW1iZXI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydENvbHVtbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFN0YXJ0TGluZU51bWJlcjogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb2RpZmllZC5nZXRMZW5ndGgoKSA9PT0gMSAmJiB0aGlzLm1vZGlmaWVkLmdldEVsZW1lbnRBdEluZGV4KDApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gZW1wdHkgbW9kaWZpZWQgPT4gZmFzdCBwYXRoXG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRW5kTGluZU51bWJlcjogdGhpcy5vcmlnaW5hbC5nZXRMZW5ndGgoKSxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydExpbmVOdW1iZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkRW5kTGluZU51bWJlcjogMSxcbiAgICAgICAgICAgICAgICAgICAgY2hhckNoYW5nZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRFbmRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydExpbmVOdW1iZXI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFbmRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFbmRMaW5lTnVtYmVyOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wdXRhdGlvblN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciByYXdDaGFuZ2VzID0gY29tcHV0ZURpZmYodGhpcy5vcmlnaW5hbCwgdGhpcy5tb2RpZmllZCwgdGhpcy5fY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlLmJpbmQodGhpcyksIHRoaXMuc2hvdWxkTWFrZVByZXR0eURpZmYpO1xuICAgICAgICAvLyBUaGUgZGlmZiBpcyBhbHdheXMgY29tcHV0ZWQgd2l0aCBpZ25vcmluZyB0cmltIHdoaXRlc3BhY2VcbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHdlIGdldCB0aGUgcHJldHRpZXN0IGRpZmZcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UpIHtcbiAgICAgICAgICAgIHZhciBsaW5lQ2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aF8zID0gcmF3Q2hhbmdlcy5sZW5ndGg7IGkgPCBsZW5ndGhfMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGluZUNoYW5nZXMucHVzaChMaW5lQ2hhbmdlLmNyZWF0ZUZyb21EaWZmUmVzdWx0KHRoaXMuc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UsIHJhd0NoYW5nZXNbaV0sIHRoaXMub3JpZ2luYWwsIHRoaXMubW9kaWZpZWQsIHRoaXMuX2NvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZS5iaW5kKHRoaXMpLCB0aGlzLnNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcywgdGhpcy5zaG91bGRQb3N0UHJvY2Vzc0NoYXJDaGFuZ2VzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGluZUNoYW5nZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTmVlZCB0byBwb3N0LXByb2Nlc3MgYW5kIGludHJvZHVjZSBjaGFuZ2VzIHdoZXJlIHRoZSB0cmltIHdoaXRlc3BhY2UgaXMgZGlmZmVyZW50XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBhcmUgbG9vcGluZyBzdGFydGluZyBhdCAtMSB0byBhbHNvIGNvdmVyIHRoZSBsaW5lcyBiZWZvcmUgdGhlIGZpcnN0IGNoYW5nZVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBvcmlnaW5hbExpbmVJbmRleCA9IDA7XG4gICAgICAgIHZhciBtb2RpZmllZExpbmVJbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAtMSAvKiAhISEhICovLCBsZW4gPSByYXdDaGFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmV4dENoYW5nZSA9IChpICsgMSA8IGxlbiA/IHJhd0NoYW5nZXNbaSArIDFdIDogbnVsbCk7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxTdG9wID0gKG5leHRDaGFuZ2UgPyBuZXh0Q2hhbmdlLm9yaWdpbmFsU3RhcnQgOiB0aGlzLm9yaWdpbmFsTGluZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZFN0b3AgPSAobmV4dENoYW5nZSA/IG5leHRDaGFuZ2UubW9kaWZpZWRTdGFydCA6IHRoaXMubW9kaWZpZWRMaW5lcy5sZW5ndGgpO1xuICAgICAgICAgICAgd2hpbGUgKG9yaWdpbmFsTGluZUluZGV4IDwgb3JpZ2luYWxTdG9wICYmIG1vZGlmaWVkTGluZUluZGV4IDwgbW9kaWZpZWRTdG9wKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGluZSA9IHRoaXMub3JpZ2luYWxMaW5lc1tvcmlnaW5hbExpbmVJbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIG1vZGlmaWVkTGluZSA9IHRoaXMubW9kaWZpZWRMaW5lc1ttb2RpZmllZExpbmVJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsTGluZSAhPT0gbW9kaWZpZWRMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXNlIGxpbmVzIGRpZmZlciBvbmx5IGluIHRyaW0gd2hpdGVzcGFjZVxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGUgbGVhZGluZyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFN0YXJ0Q29sdW1uID0gTGluZU1hcmtlclNlcXVlbmNlLl9nZXRGaXJzdE5vbkJsYW5rQ29sdW1uKG9yaWdpbmFsTGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kaWZpZWRTdGFydENvbHVtbiA9IExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0Rmlyc3ROb25CbGFua0NvbHVtbihtb2RpZmllZExpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9yaWdpbmFsU3RhcnRDb2x1bW4gPiAxICYmIG1vZGlmaWVkU3RhcnRDb2x1bW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsQ2hhciA9IG9yaWdpbmFsTGluZS5jaGFyQ29kZUF0KG9yaWdpbmFsU3RhcnRDb2x1bW4gLSAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kaWZpZWRDaGFyID0gbW9kaWZpZWRMaW5lLmNoYXJDb2RlQXQobW9kaWZpZWRTdGFydENvbHVtbiAtIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbENoYXIgIT09IG1vZGlmaWVkQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydENvbHVtbi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRDb2x1bW4tLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFN0YXJ0Q29sdW1uID4gMSB8fCBtb2RpZmllZFN0YXJ0Q29sdW1uID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hUcmltV2hpdGVzcGFjZUNoYXJDaGFuZ2UocmVzdWx0LCBvcmlnaW5hbExpbmVJbmRleCArIDEsIDEsIG9yaWdpbmFsU3RhcnRDb2x1bW4sIG1vZGlmaWVkTGluZUluZGV4ICsgMSwgMSwgbW9kaWZpZWRTdGFydENvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHRyYWlsaW5nIHdoaXRlc3BhY2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsRW5kQ29sdW1uID0gTGluZU1hcmtlclNlcXVlbmNlLl9nZXRMYXN0Tm9uQmxhbmtDb2x1bW4ob3JpZ2luYWxMaW5lLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RpZmllZEVuZENvbHVtbiA9IExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0TGFzdE5vbkJsYW5rQ29sdW1uKG1vZGlmaWVkTGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxNYXhDb2x1bW4gPSBvcmlnaW5hbExpbmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RpZmllZE1heENvbHVtbiA9IG1vZGlmaWVkTGluZS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9yaWdpbmFsRW5kQ29sdW1uIDwgb3JpZ2luYWxNYXhDb2x1bW4gJiYgbW9kaWZpZWRFbmRDb2x1bW4gPCBtb2RpZmllZE1heENvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbENoYXIgPSBvcmlnaW5hbExpbmUuY2hhckNvZGVBdChvcmlnaW5hbEVuZENvbHVtbiAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RpZmllZENoYXIgPSBvcmlnaW5hbExpbmUuY2hhckNvZGVBdChtb2RpZmllZEVuZENvbHVtbiAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbENoYXIgIT09IG1vZGlmaWVkQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFbmRDb2x1bW4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEVuZENvbHVtbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsRW5kQ29sdW1uIDwgb3JpZ2luYWxNYXhDb2x1bW4gfHwgbW9kaWZpZWRFbmRDb2x1bW4gPCBtb2RpZmllZE1heENvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hUcmltV2hpdGVzcGFjZUNoYXJDaGFuZ2UocmVzdWx0LCBvcmlnaW5hbExpbmVJbmRleCArIDEsIG9yaWdpbmFsRW5kQ29sdW1uLCBvcmlnaW5hbE1heENvbHVtbiwgbW9kaWZpZWRMaW5lSW5kZXggKyAxLCBtb2RpZmllZEVuZENvbHVtbiwgbW9kaWZpZWRNYXhDb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTGluZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgbW9kaWZpZWRMaW5lSW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0Q2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgLy8gRW1pdCB0aGUgYWN0dWFsIGNoYW5nZVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKExpbmVDaGFuZ2UuY3JlYXRlRnJvbURpZmZSZXN1bHQodGhpcy5zaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSwgbmV4dENoYW5nZSwgdGhpcy5vcmlnaW5hbCwgdGhpcy5tb2RpZmllZCwgdGhpcy5fY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlLmJpbmQodGhpcyksIHRoaXMuc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzLCB0aGlzLnNob3VsZFBvc3RQcm9jZXNzQ2hhckNoYW5nZXMpKTtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbExpbmVJbmRleCArPSBuZXh0Q2hhbmdlLm9yaWdpbmFsTGVuZ3RoO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkTGluZUluZGV4ICs9IG5leHRDaGFuZ2UubW9kaWZpZWRMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIERpZmZDb21wdXRlci5wcm90b3R5cGUuX3B1c2hUcmltV2hpdGVzcGFjZUNoYXJDaGFuZ2UgPSBmdW5jdGlvbiAocmVzdWx0LCBvcmlnaW5hbExpbmVOdW1iZXIsIG9yaWdpbmFsU3RhcnRDb2x1bW4sIG9yaWdpbmFsRW5kQ29sdW1uLCBtb2RpZmllZExpbmVOdW1iZXIsIG1vZGlmaWVkU3RhcnRDb2x1bW4sIG1vZGlmaWVkRW5kQ29sdW1uKSB7XG4gICAgICAgIGlmICh0aGlzLl9tZXJnZVRyaW1XaGl0ZXNwYWNlQ2hhckNoYW5nZShyZXN1bHQsIG9yaWdpbmFsTGluZU51bWJlciwgb3JpZ2luYWxTdGFydENvbHVtbiwgb3JpZ2luYWxFbmRDb2x1bW4sIG1vZGlmaWVkTGluZU51bWJlciwgbW9kaWZpZWRTdGFydENvbHVtbiwgbW9kaWZpZWRFbmRDb2x1bW4pKSB7XG4gICAgICAgICAgICAvLyBNZXJnZWQgaW50byBwcmV2aW91c1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGFyQ2hhbmdlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzKSB7XG4gICAgICAgICAgICBjaGFyQ2hhbmdlcyA9IFtuZXcgQ2hhckNoYW5nZShvcmlnaW5hbExpbmVOdW1iZXIsIG9yaWdpbmFsU3RhcnRDb2x1bW4sIG9yaWdpbmFsTGluZU51bWJlciwgb3JpZ2luYWxFbmRDb2x1bW4sIG1vZGlmaWVkTGluZU51bWJlciwgbW9kaWZpZWRTdGFydENvbHVtbiwgbW9kaWZpZWRMaW5lTnVtYmVyLCBtb2RpZmllZEVuZENvbHVtbildO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKG5ldyBMaW5lQ2hhbmdlKG9yaWdpbmFsTGluZU51bWJlciwgb3JpZ2luYWxMaW5lTnVtYmVyLCBtb2RpZmllZExpbmVOdW1iZXIsIG1vZGlmaWVkTGluZU51bWJlciwgY2hhckNoYW5nZXMpKTtcbiAgICB9O1xuICAgIERpZmZDb21wdXRlci5wcm90b3R5cGUuX21lcmdlVHJpbVdoaXRlc3BhY2VDaGFyQ2hhbmdlID0gZnVuY3Rpb24gKHJlc3VsdCwgb3JpZ2luYWxMaW5lTnVtYmVyLCBvcmlnaW5hbFN0YXJ0Q29sdW1uLCBvcmlnaW5hbEVuZENvbHVtbiwgbW9kaWZpZWRMaW5lTnVtYmVyLCBtb2RpZmllZFN0YXJ0Q29sdW1uLCBtb2RpZmllZEVuZENvbHVtbikge1xuICAgICAgICB2YXIgbGVuID0gcmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2Q2hhbmdlID0gcmVzdWx0W2xlbiAtIDFdO1xuICAgICAgICBpZiAocHJldkNoYW5nZS5vcmlnaW5hbEVuZExpbmVOdW1iZXIgPT09IDAgfHwgcHJldkNoYW5nZS5tb2RpZmllZEVuZExpbmVOdW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIC8vIERvbid0IG1lcmdlIHdpdGggaW5zZXJ0cy9kZWxldGVzXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZDaGFuZ2Uub3JpZ2luYWxFbmRMaW5lTnVtYmVyICsgMSA9PT0gb3JpZ2luYWxMaW5lTnVtYmVyICYmIHByZXZDaGFuZ2UubW9kaWZpZWRFbmRMaW5lTnVtYmVyICsgMSA9PT0gbW9kaWZpZWRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICBwcmV2Q2hhbmdlLm9yaWdpbmFsRW5kTGluZU51bWJlciA9IG9yaWdpbmFsTGluZU51bWJlcjtcbiAgICAgICAgICAgIHByZXZDaGFuZ2UubW9kaWZpZWRFbmRMaW5lTnVtYmVyID0gbW9kaWZpZWRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgcHJldkNoYW5nZS5jaGFyQ2hhbmdlcy5wdXNoKG5ldyBDaGFyQ2hhbmdlKG9yaWdpbmFsTGluZU51bWJlciwgb3JpZ2luYWxTdGFydENvbHVtbiwgb3JpZ2luYWxMaW5lTnVtYmVyLCBvcmlnaW5hbEVuZENvbHVtbiwgbW9kaWZpZWRMaW5lTnVtYmVyLCBtb2RpZmllZFN0YXJ0Q29sdW1uLCBtb2RpZmllZExpbmVOdW1iZXIsIG1vZGlmaWVkRW5kQ29sdW1uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBEaWZmQ29tcHV0ZXIucHJvdG90eXBlLl9jb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm1heGltdW1SdW5UaW1lTXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub3cgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gbm93IC0gdGhpcy5jb21wdXRhdGlvblN0YXJ0VGltZSA8IHRoaXMubWF4aW11bVJ1blRpbWVNcztcbiAgICB9O1xuICAgIHJldHVybiBEaWZmQ29tcHV0ZXI7XG59KCkpO1xuZXhwb3J0IHsgRGlmZkNvbXB1dGVyIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnLi4vY29yZS9wb3NpdGlvbi5qcyc7XG5pbXBvcnQgeyBQcmVmaXhTdW1Db21wdXRlciB9IGZyb20gJy4uL3ZpZXdNb2RlbC9wcmVmaXhTdW1Db21wdXRlci5qcyc7XG52YXIgTWlycm9yVGV4dE1vZGVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1pcnJvclRleHRNb2RlbCh1cmksIGxpbmVzLCBlb2wsIHZlcnNpb25JZCkge1xuICAgICAgICB0aGlzLl91cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuX2xpbmVzID0gbGluZXM7XG4gICAgICAgIHRoaXMuX2VvbCA9IGVvbDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbklkID0gdmVyc2lvbklkO1xuICAgICAgICB0aGlzLl9saW5lU3RhcnRzID0gbnVsbDtcbiAgICB9XG4gICAgTWlycm9yVGV4dE1vZGVsLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9saW5lcy5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgTWlycm9yVGV4dE1vZGVsLnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZXMuam9pbih0aGlzLl9lb2wpO1xuICAgIH07XG4gICAgTWlycm9yVGV4dE1vZGVsLnByb3RvdHlwZS5vbkV2ZW50cyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmVvbCAmJiBlLmVvbCAhPT0gdGhpcy5fZW9sKSB7XG4gICAgICAgICAgICB0aGlzLl9lb2wgPSBlLmVvbDtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVTdGFydHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSBteSBsaW5lc1xuICAgICAgICB2YXIgY2hhbmdlcyA9IGUuY2hhbmdlcztcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGFuZ2VzXzEgPSBjaGFuZ2VzOyBfaSA8IGNoYW5nZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBjaGFuZ2VzXzFbX2ldO1xuICAgICAgICAgICAgdGhpcy5fYWNjZXB0RGVsZXRlUmFuZ2UoY2hhbmdlLnJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMuX2FjY2VwdEluc2VydFRleHQobmV3IFBvc2l0aW9uKGNoYW5nZS5yYW5nZS5zdGFydExpbmVOdW1iZXIsIGNoYW5nZS5yYW5nZS5zdGFydENvbHVtbiksIGNoYW5nZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92ZXJzaW9uSWQgPSBlLnZlcnNpb25JZDtcbiAgICB9O1xuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUuX2Vuc3VyZUxpbmVTdGFydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGluZVN0YXJ0cykge1xuICAgICAgICAgICAgdmFyIGVvbExlbmd0aCA9IHRoaXMuX2VvbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgbGluZXNMZW5ndGggPSB0aGlzLl9saW5lcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgbGluZVN0YXJ0VmFsdWVzID0gbmV3IFVpbnQzMkFycmF5KGxpbmVzTGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxpbmVTdGFydFZhbHVlc1tpXSA9IHRoaXMuX2xpbmVzW2ldLmxlbmd0aCArIGVvbExlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xpbmVTdGFydHMgPSBuZXcgUHJlZml4U3VtQ29tcHV0ZXIobGluZVN0YXJ0VmFsdWVzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQWxsIGNoYW5nZXMgdG8gYSBsaW5lJ3MgdGV4dCBnbyB0aHJvdWdoIHRoaXMgbWV0aG9kXG4gICAgICovXG4gICAgTWlycm9yVGV4dE1vZGVsLnByb3RvdHlwZS5fc2V0TGluZVRleHQgPSBmdW5jdGlvbiAobGluZUluZGV4LCBuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLl9saW5lc1tsaW5lSW5kZXhdID0gbmV3VmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl9saW5lU3RhcnRzKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgcHJlZml4IHN1bVxuICAgICAgICAgICAgdGhpcy5fbGluZVN0YXJ0cy5jaGFuZ2VWYWx1ZShsaW5lSW5kZXgsIHRoaXMuX2xpbmVzW2xpbmVJbmRleF0ubGVuZ3RoICsgdGhpcy5fZW9sLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUuX2FjY2VwdERlbGV0ZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIGlmIChyYW5nZS5zdGFydExpbmVOdW1iZXIgPT09IHJhbmdlLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChyYW5nZS5zdGFydENvbHVtbiA9PT0gcmFuZ2UuZW5kQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZyB0byBkZWxldGVcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZWxldGUgdGV4dCBvbiB0aGUgYWZmZWN0ZWQgbGluZVxuICAgICAgICAgICAgdGhpcy5fc2V0TGluZVRleHQocmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIC0gMSwgdGhpcy5fbGluZXNbcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIC0gMV0uc3Vic3RyaW5nKDAsIHJhbmdlLnN0YXJ0Q29sdW1uIC0gMSlcbiAgICAgICAgICAgICAgICArIHRoaXMuX2xpbmVzW3JhbmdlLnN0YXJ0TGluZU51bWJlciAtIDFdLnN1YnN0cmluZyhyYW5nZS5lbmRDb2x1bW4gLSAxKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGFrZSByZW1haW5pbmcgdGV4dCBvbiBsYXN0IGxpbmUgYW5kIGFwcGVuZCBpdCB0byByZW1haW5pbmcgdGV4dCBvbiBmaXJzdCBsaW5lXG4gICAgICAgIHRoaXMuX3NldExpbmVUZXh0KHJhbmdlLnN0YXJ0TGluZU51bWJlciAtIDEsIHRoaXMuX2xpbmVzW3JhbmdlLnN0YXJ0TGluZU51bWJlciAtIDFdLnN1YnN0cmluZygwLCByYW5nZS5zdGFydENvbHVtbiAtIDEpXG4gICAgICAgICAgICArIHRoaXMuX2xpbmVzW3JhbmdlLmVuZExpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcocmFuZ2UuZW5kQ29sdW1uIC0gMSkpO1xuICAgICAgICAvLyBEZWxldGUgbWlkZGxlIGxpbmVzXG4gICAgICAgIHRoaXMuX2xpbmVzLnNwbGljZShyYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLmVuZExpbmVOdW1iZXIgLSByYW5nZS5zdGFydExpbmVOdW1iZXIpO1xuICAgICAgICBpZiAodGhpcy5fbGluZVN0YXJ0cykge1xuICAgICAgICAgICAgLy8gdXBkYXRlIHByZWZpeCBzdW1cbiAgICAgICAgICAgIHRoaXMuX2xpbmVTdGFydHMucmVtb3ZlVmFsdWVzKHJhbmdlLnN0YXJ0TGluZU51bWJlciwgcmFuZ2UuZW5kTGluZU51bWJlciAtIHJhbmdlLnN0YXJ0TGluZU51bWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUuX2FjY2VwdEluc2VydFRleHQgPSBmdW5jdGlvbiAocG9zaXRpb24sIGluc2VydFRleHQpIHtcbiAgICAgICAgaWYgKGluc2VydFRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBOb3RoaW5nIHRvIGluc2VydFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnNlcnRMaW5lcyA9IGluc2VydFRleHQuc3BsaXQoL1xcclxcbnxcXHJ8XFxuLyk7XG4gICAgICAgIGlmIChpbnNlcnRMaW5lcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIC8vIEluc2VydGluZyB0ZXh0IG9uIG9uZSBsaW5lXG4gICAgICAgICAgICB0aGlzLl9zZXRMaW5lVGV4dChwb3NpdGlvbi5saW5lTnVtYmVyIC0gMSwgdGhpcy5fbGluZXNbcG9zaXRpb24ubGluZU51bWJlciAtIDFdLnN1YnN0cmluZygwLCBwb3NpdGlvbi5jb2x1bW4gLSAxKVxuICAgICAgICAgICAgICAgICsgaW5zZXJ0TGluZXNbMF1cbiAgICAgICAgICAgICAgICArIHRoaXMuX2xpbmVzW3Bvc2l0aW9uLmxpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcocG9zaXRpb24uY29sdW1uIC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFwcGVuZCBvdmVyZmxvd2luZyB0ZXh0IGZyb20gZmlyc3QgbGluZSB0byB0aGUgZW5kIG9mIHRleHQgdG8gaW5zZXJ0XG4gICAgICAgIGluc2VydExpbmVzW2luc2VydExpbmVzLmxlbmd0aCAtIDFdICs9IHRoaXMuX2xpbmVzW3Bvc2l0aW9uLmxpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcocG9zaXRpb24uY29sdW1uIC0gMSk7XG4gICAgICAgIC8vIERlbGV0ZSBvdmVyZmxvd2luZyB0ZXh0IGZyb20gZmlyc3QgbGluZSBhbmQgaW5zZXJ0IHRleHQgb24gZmlyc3QgbGluZVxuICAgICAgICB0aGlzLl9zZXRMaW5lVGV4dChwb3NpdGlvbi5saW5lTnVtYmVyIC0gMSwgdGhpcy5fbGluZXNbcG9zaXRpb24ubGluZU51bWJlciAtIDFdLnN1YnN0cmluZygwLCBwb3NpdGlvbi5jb2x1bW4gLSAxKVxuICAgICAgICAgICAgKyBpbnNlcnRMaW5lc1swXSk7XG4gICAgICAgIC8vIEluc2VydCBuZXcgbGluZXMgJiBzdG9yZSBsZW5ndGhzXG4gICAgICAgIHZhciBuZXdMZW5ndGhzID0gbmV3IFVpbnQzMkFycmF5KGluc2VydExpbmVzLmxlbmd0aCAtIDEpO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydExpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9saW5lcy5zcGxpY2UocG9zaXRpb24ubGluZU51bWJlciArIGkgLSAxLCAwLCBpbnNlcnRMaW5lc1tpXSk7XG4gICAgICAgICAgICBuZXdMZW5ndGhzW2kgLSAxXSA9IGluc2VydExpbmVzW2ldLmxlbmd0aCArIHRoaXMuX2VvbC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xpbmVTdGFydHMpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBwcmVmaXggc3VtXG4gICAgICAgICAgICB0aGlzLl9saW5lU3RhcnRzLmluc2VydFZhbHVlcyhwb3NpdGlvbi5saW5lTnVtYmVyLCBuZXdMZW5ndGhzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE1pcnJvclRleHRNb2RlbDtcbn0oKSk7XG5leHBvcnQgeyBNaXJyb3JUZXh0TW9kZWwgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IHZhciBVU1VBTF9XT1JEX1NFUEFSQVRPUlMgPSAnYH4hQCMkJV4mKigpLT0rW3tdfVxcXFx8OzpcXCdcIiwuPD4vPyc7XG4vKipcbiAqIENyZWF0ZSBhIHdvcmQgZGVmaW5pdGlvbiByZWd1bGFyIGV4cHJlc3Npb24gYmFzZWQgb24gZGVmYXVsdCB3b3JkIHNlcGFyYXRvcnMuXG4gKiBPcHRpb25hbGx5IHByb3ZpZGUgYWxsb3dlZCBzZXBhcmF0b3JzIHRoYXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHdvcmRzLlxuICpcbiAqIFRoZSBkZWZhdWx0IHdvdWxkIGxvb2sgbGlrZSB0aGlzOlxuICogLygtP1xcZCpcXC5cXGRcXHcqKXwoW15cXGBcXH5cXCFcXEBcXCNcXCRcXCVcXF5cXCZcXCpcXChcXClcXC1cXD1cXCtcXFtcXHtcXF1cXH1cXFxcXFx8XFw7XFw6XFwnXFxcIlxcLFxcLlxcPFxcPlxcL1xcP1xcc10rKS9nXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVdvcmRSZWdFeHAoYWxsb3dJbldvcmRzKSB7XG4gICAgaWYgKGFsbG93SW5Xb3JkcyA9PT0gdm9pZCAwKSB7IGFsbG93SW5Xb3JkcyA9ICcnOyB9XG4gICAgdmFyIHNvdXJjZSA9ICcoLT9cXFxcZCpcXFxcLlxcXFxkXFxcXHcqKXwoW14nO1xuICAgIGZvciAodmFyIF9pID0gMCwgVVNVQUxfV09SRF9TRVBBUkFUT1JTXzEgPSBVU1VBTF9XT1JEX1NFUEFSQVRPUlM7IF9pIDwgVVNVQUxfV09SRF9TRVBBUkFUT1JTXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBzZXAgPSBVU1VBTF9XT1JEX1NFUEFSQVRPUlNfMVtfaV07XG4gICAgICAgIGlmIChhbGxvd0luV29yZHMuaW5kZXhPZihzZXApID49IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZSArPSAnXFxcXCcgKyBzZXA7XG4gICAgfVxuICAgIHNvdXJjZSArPSAnXFxcXHNdKyknO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbn1cbi8vIGNhdGNoZXMgbnVtYmVycyAoaW5jbHVkaW5nIGZsb2F0aW5nIG51bWJlcnMpIGluIHRoZSBmaXJzdCBncm91cCwgYW5kIGFscGhhbnVtIGluIHRoZSBzZWNvbmRcbmV4cG9ydCB2YXIgREVGQVVMVF9XT1JEX1JFR0VYUCA9IGNyZWF0ZVdvcmRSZWdFeHAoKTtcbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVWYWxpZFdvcmREZWZpbml0aW9uKHdvcmREZWZpbml0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IERFRkFVTFRfV09SRF9SRUdFWFA7XG4gICAgaWYgKHdvcmREZWZpbml0aW9uICYmICh3b3JkRGVmaW5pdGlvbiBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgaWYgKCF3b3JkRGVmaW5pdGlvbi5nbG9iYWwpIHtcbiAgICAgICAgICAgIHZhciBmbGFncyA9ICdnJztcbiAgICAgICAgICAgIGlmICh3b3JkRGVmaW5pdGlvbi5pZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICAgICAgZmxhZ3MgKz0gJ2knO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdvcmREZWZpbml0aW9uLm11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgIGZsYWdzICs9ICdtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3b3JkRGVmaW5pdGlvbi51bmljb2RlKSB7XG4gICAgICAgICAgICAgICAgZmxhZ3MgKz0gJ3UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFJlZ0V4cCh3b3JkRGVmaW5pdGlvbi5zb3VyY2UsIGZsYWdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHdvcmREZWZpbml0aW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRXb3JkQXRQb3NGYXN0KGNvbHVtbiwgd29yZERlZmluaXRpb24sIHRleHQsIHRleHRPZmZzZXQpIHtcbiAgICAvLyBmaW5kIHdoaXRlc3BhY2UgZW5jbG9zZWQgdGV4dCBhcm91bmQgY29sdW1uIGFuZCBtYXRjaCBmcm9tIHRoZXJlXG4gICAgdmFyIHBvcyA9IGNvbHVtbiAtIDEgLSB0ZXh0T2Zmc2V0O1xuICAgIHZhciBzdGFydCA9IHRleHQubGFzdEluZGV4T2YoJyAnLCBwb3MgLSAxKSArIDE7XG4gICAgd29yZERlZmluaXRpb24ubGFzdEluZGV4ID0gc3RhcnQ7XG4gICAgdmFyIG1hdGNoO1xuICAgIHdoaWxlIChtYXRjaCA9IHdvcmREZWZpbml0aW9uLmV4ZWModGV4dCkpIHtcbiAgICAgICAgdmFyIG1hdGNoSW5kZXggPSBtYXRjaC5pbmRleCB8fCAwO1xuICAgICAgICBpZiAobWF0Y2hJbmRleCA8PSBwb3MgJiYgd29yZERlZmluaXRpb24ubGFzdEluZGV4ID49IHBvcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3b3JkOiBtYXRjaFswXSxcbiAgICAgICAgICAgICAgICBzdGFydENvbHVtbjogdGV4dE9mZnNldCArIDEgKyBtYXRjaEluZGV4LFxuICAgICAgICAgICAgICAgIGVuZENvbHVtbjogdGV4dE9mZnNldCArIDEgKyB3b3JkRGVmaW5pdGlvbi5sYXN0SW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBnZXRXb3JkQXRQb3NTbG93KGNvbHVtbiwgd29yZERlZmluaXRpb24sIHRleHQsIHRleHRPZmZzZXQpIHtcbiAgICAvLyBtYXRjaGVzIGFsbCB3b3JkcyBzdGFydGluZyBhdCB0aGUgYmVnaW5uaW5nXG4gICAgLy8gb2YgdGhlIGlucHV0IHVudGlsIGl0IGZpbmRzIGEgbWF0Y2ggdGhhdCBlbmNsb3Nlc1xuICAgIC8vIHRoZSBkZXNpcmVkIGNvbHVtbi4gc2xvdyBidXQgY29ycmVjdFxuICAgIHZhciBwb3MgPSBjb2x1bW4gLSAxIC0gdGV4dE9mZnNldDtcbiAgICB3b3JkRGVmaW5pdGlvbi5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBtYXRjaDtcbiAgICB3aGlsZSAobWF0Y2ggPSB3b3JkRGVmaW5pdGlvbi5leGVjKHRleHQpKSB7XG4gICAgICAgIHZhciBtYXRjaEluZGV4ID0gbWF0Y2guaW5kZXggfHwgMDtcbiAgICAgICAgaWYgKG1hdGNoSW5kZXggPiBwb3MpIHtcbiAgICAgICAgICAgIC8vIHxuVyAtPiBtYXRjaGVkIG9ubHkgYWZ0ZXIgdGhlIHBvc1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAod29yZERlZmluaXRpb24ubGFzdEluZGV4ID49IHBvcykge1xuICAgICAgICAgICAgLy8gV3xXIC0+IG1hdGNoIGVuY2xvc2VzIHBvc1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3b3JkOiBtYXRjaFswXSxcbiAgICAgICAgICAgICAgICBzdGFydENvbHVtbjogdGV4dE9mZnNldCArIDEgKyBtYXRjaEluZGV4LFxuICAgICAgICAgICAgICAgIGVuZENvbHVtbjogdGV4dE9mZnNldCArIDEgKyB3b3JkRGVmaW5pdGlvbi5sYXN0SW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0V29yZEF0VGV4dChjb2x1bW4sIHdvcmREZWZpbml0aW9uLCB0ZXh0LCB0ZXh0T2Zmc2V0KSB7XG4gICAgLy8gaWYgYHdvcmRzYCBjYW4gY29udGFpbiB3aGl0ZXNwYWNlIGNoYXJhY3RlciB3ZSBoYXZlIHRvIHVzZSB0aGUgc2xvdyB2YXJpYW50XG4gICAgLy8gb3RoZXJ3aXNlIHdlIHVzZSB0aGUgZmFzdCB2YXJpYW50IG9mIGZpbmRpbmcgYSB3b3JkXG4gICAgd29yZERlZmluaXRpb24ubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbWF0Y2ggPSB3b3JkRGVmaW5pdGlvbi5leGVjKHRleHQpO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIHRvZG9Aam9oIHRoZSBgbWF0Y2hgIGNvdWxkIGFscmVhZHkgYmUgdGhlIChmaXJzdCkgd29yZFxuICAgIHZhciByZXQgPSBtYXRjaFswXS5pbmRleE9mKCcgJykgPj0gMFxuICAgICAgICAvLyBkaWQgbWF0Y2ggYSB3b3JkIHdoaWNoIGNvbnRhaW5zIGEgc3BhY2UgY2hhcmFjdGVyIC0+IHVzZSBzbG93IHdvcmQgZmluZFxuICAgICAgICA/IGdldFdvcmRBdFBvc1Nsb3coY29sdW1uLCB3b3JkRGVmaW5pdGlvbiwgdGV4dCwgdGV4dE9mZnNldClcbiAgICAgICAgLy8gc2FuZSB3b3JkIGRlZmluaXRpb24gLT4gdXNlIGZhc3Qgd29yZCBmaW5kXG4gICAgICAgIDogZ2V0V29yZEF0UG9zRmFzdChjb2x1bW4sIHdvcmREZWZpbml0aW9uLCB0ZXh0LCB0ZXh0T2Zmc2V0KTtcbiAgICAvLyBib3RoIChnZXRXb3JkQXRQb3NGYXN0IGFuZCBnZXRXb3JkQXRQb3NTbG93KSBsZWF2ZSB0aGUgd29yZERlZmluaXRpb24tUmVnRXhwXG4gICAgLy8gaW4gYW4gdW5kZWZpbmVkIHN0YXRlIGFuZCB0byBub3QgY29uZnVzZSBvdGhlciB1c2VycyBvZiB0aGUgd29yZERlZmluaXRpb25cbiAgICAvLyB3ZSByZXNldCB0aGUgbGFzdEluZGV4XG4gICAgd29yZERlZmluaXRpb24ubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gcmV0O1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDaGFyYWN0ZXJDbGFzc2lmaWVyIH0gZnJvbSAnLi4vY29yZS9jaGFyYWN0ZXJDbGFzc2lmaWVyLmpzJztcbmltcG9ydCB7IFVpbnQ4TWF0cml4IH0gZnJvbSAnLi4vY29yZS91aW50LmpzJztcbnZhciBTdGF0ZU1hY2hpbmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdGVNYWNoaW5lKGVkZ2VzKSB7XG4gICAgICAgIHZhciBtYXhDaGFyQ29kZSA9IDA7XG4gICAgICAgIHZhciBtYXhTdGF0ZSA9IDAgLyogSW52YWxpZCAqLztcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGVkZ2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBlZGdlc1tpXSwgZnJvbSA9IF9hWzBdLCBjaENvZGUgPSBfYVsxXSwgdG8gPSBfYVsyXTtcbiAgICAgICAgICAgIGlmIChjaENvZGUgPiBtYXhDaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgIG1heENoYXJDb2RlID0gY2hDb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZyb20gPiBtYXhTdGF0ZSkge1xuICAgICAgICAgICAgICAgIG1heFN0YXRlID0gZnJvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0byA+IG1heFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgbWF4U3RhdGUgPSB0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXhDaGFyQ29kZSsrO1xuICAgICAgICBtYXhTdGF0ZSsrO1xuICAgICAgICB2YXIgc3RhdGVzID0gbmV3IFVpbnQ4TWF0cml4KG1heFN0YXRlLCBtYXhDaGFyQ29kZSwgMCAvKiBJbnZhbGlkICovKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGVkZ2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2IgPSBlZGdlc1tpXSwgZnJvbSA9IF9iWzBdLCBjaENvZGUgPSBfYlsxXSwgdG8gPSBfYlsyXTtcbiAgICAgICAgICAgIHN0YXRlcy5zZXQoZnJvbSwgY2hDb2RlLCB0byk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGVzID0gc3RhdGVzO1xuICAgICAgICB0aGlzLl9tYXhDaGFyQ29kZSA9IG1heENoYXJDb2RlO1xuICAgIH1cbiAgICBTdGF0ZU1hY2hpbmUucHJvdG90eXBlLm5leHRTdGF0ZSA9IGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIGNoQ29kZSkge1xuICAgICAgICBpZiAoY2hDb2RlIDwgMCB8fCBjaENvZGUgPj0gdGhpcy5fbWF4Q2hhckNvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAwIC8qIEludmFsaWQgKi87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlcy5nZXQoY3VycmVudFN0YXRlLCBjaENvZGUpO1xuICAgIH07XG4gICAgcmV0dXJuIFN0YXRlTWFjaGluZTtcbn0oKSk7XG5leHBvcnQgeyBTdGF0ZU1hY2hpbmUgfTtcbi8vIFN0YXRlIG1hY2hpbmUgZm9yIGh0dHA6Ly8gb3IgaHR0cHM6Ly8gb3IgZmlsZTovL1xudmFyIF9zdGF0ZU1hY2hpbmUgPSBudWxsO1xuZnVuY3Rpb24gZ2V0U3RhdGVNYWNoaW5lKCkge1xuICAgIGlmIChfc3RhdGVNYWNoaW5lID09PSBudWxsKSB7XG4gICAgICAgIF9zdGF0ZU1hY2hpbmUgPSBuZXcgU3RhdGVNYWNoaW5lKFtcbiAgICAgICAgICAgIFsxIC8qIFN0YXJ0ICovLCAxMDQgLyogaCAqLywgMiAvKiBIICovXSxcbiAgICAgICAgICAgIFsxIC8qIFN0YXJ0ICovLCA3MiAvKiBIICovLCAyIC8qIEggKi9dLFxuICAgICAgICAgICAgWzEgLyogU3RhcnQgKi8sIDEwMiAvKiBmICovLCA2IC8qIEYgKi9dLFxuICAgICAgICAgICAgWzEgLyogU3RhcnQgKi8sIDcwIC8qIEYgKi8sIDYgLyogRiAqL10sXG4gICAgICAgICAgICBbMiAvKiBIICovLCAxMTYgLyogdCAqLywgMyAvKiBIVCAqL10sXG4gICAgICAgICAgICBbMiAvKiBIICovLCA4NCAvKiBUICovLCAzIC8qIEhUICovXSxcbiAgICAgICAgICAgIFszIC8qIEhUICovLCAxMTYgLyogdCAqLywgNCAvKiBIVFQgKi9dLFxuICAgICAgICAgICAgWzMgLyogSFQgKi8sIDg0IC8qIFQgKi8sIDQgLyogSFRUICovXSxcbiAgICAgICAgICAgIFs0IC8qIEhUVCAqLywgMTEyIC8qIHAgKi8sIDUgLyogSFRUUCAqL10sXG4gICAgICAgICAgICBbNCAvKiBIVFQgKi8sIDgwIC8qIFAgKi8sIDUgLyogSFRUUCAqL10sXG4gICAgICAgICAgICBbNSAvKiBIVFRQICovLCAxMTUgLyogcyAqLywgOSAvKiBCZWZvcmVDb2xvbiAqL10sXG4gICAgICAgICAgICBbNSAvKiBIVFRQICovLCA4MyAvKiBTICovLCA5IC8qIEJlZm9yZUNvbG9uICovXSxcbiAgICAgICAgICAgIFs1IC8qIEhUVFAgKi8sIDU4IC8qIENvbG9uICovLCAxMCAvKiBBZnRlckNvbG9uICovXSxcbiAgICAgICAgICAgIFs2IC8qIEYgKi8sIDEwNSAvKiBpICovLCA3IC8qIEZJICovXSxcbiAgICAgICAgICAgIFs2IC8qIEYgKi8sIDczIC8qIEkgKi8sIDcgLyogRkkgKi9dLFxuICAgICAgICAgICAgWzcgLyogRkkgKi8sIDEwOCAvKiBsICovLCA4IC8qIEZJTCAqL10sXG4gICAgICAgICAgICBbNyAvKiBGSSAqLywgNzYgLyogTCAqLywgOCAvKiBGSUwgKi9dLFxuICAgICAgICAgICAgWzggLyogRklMICovLCAxMDEgLyogZSAqLywgOSAvKiBCZWZvcmVDb2xvbiAqL10sXG4gICAgICAgICAgICBbOCAvKiBGSUwgKi8sIDY5IC8qIEUgKi8sIDkgLyogQmVmb3JlQ29sb24gKi9dLFxuICAgICAgICAgICAgWzkgLyogQmVmb3JlQ29sb24gKi8sIDU4IC8qIENvbG9uICovLCAxMCAvKiBBZnRlckNvbG9uICovXSxcbiAgICAgICAgICAgIFsxMCAvKiBBZnRlckNvbG9uICovLCA0NyAvKiBTbGFzaCAqLywgMTEgLyogQWxtb3N0VGhlcmUgKi9dLFxuICAgICAgICAgICAgWzExIC8qIEFsbW9zdFRoZXJlICovLCA0NyAvKiBTbGFzaCAqLywgMTIgLyogRW5kICovXSxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBfc3RhdGVNYWNoaW5lO1xufVxudmFyIF9jbGFzc2lmaWVyID0gbnVsbDtcbmZ1bmN0aW9uIGdldENsYXNzaWZpZXIoKSB7XG4gICAgaWYgKF9jbGFzc2lmaWVyID09PSBudWxsKSB7XG4gICAgICAgIF9jbGFzc2lmaWVyID0gbmV3IENoYXJhY3RlckNsYXNzaWZpZXIoMCAvKiBOb25lICovKTtcbiAgICAgICAgdmFyIEZPUkNFX1RFUk1JTkFUSU9OX0NIQVJBQ1RFUlMgPSAnIFxcdDw+XFwnXFxcIuOAgeOAgu+9oe+9pO+8jO+8ju+8mu+8m++8n++8ge+8oO+8g++8hO+8he+8hu+8iuKAmOKAnOOAiOOAiuOAjOOAjuOAkOOAlO+8iO+8u++9m++9ou+9o++9ne+8ve+8ieOAleOAkeOAj+OAjeOAi+OAieKAneKAme+9gO+9nuKApic7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRk9SQ0VfVEVSTUlOQVRJT05fQ0hBUkFDVEVSUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2NsYXNzaWZpZXIuc2V0KEZPUkNFX1RFUk1JTkFUSU9OX0NIQVJBQ1RFUlMuY2hhckNvZGVBdChpKSwgMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgQ0FOTk9UX0VORF9XSVRIX0NIQVJBQ1RFUlMgPSAnLiw7JztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBDQU5OT1RfRU5EX1dJVEhfQ0hBUkFDVEVSUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2NsYXNzaWZpZXIuc2V0KENBTk5PVF9FTkRfV0lUSF9DSEFSQUNURVJTLmNoYXJDb2RlQXQoaSksIDIgLyogQ2Fubm90RW5kSW4gKi8pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfY2xhc3NpZmllcjtcbn1cbnZhciBMaW5rQ29tcHV0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlua0NvbXB1dGVyKCkge1xuICAgIH1cbiAgICBMaW5rQ29tcHV0ZXIuX2NyZWF0ZUxpbmsgPSBmdW5jdGlvbiAoY2xhc3NpZmllciwgbGluZSwgbGluZU51bWJlciwgbGlua0JlZ2luSW5kZXgsIGxpbmtFbmRJbmRleCkge1xuICAgICAgICAvLyBEbyBub3QgYWxsb3cgdG8gZW5kIGxpbmsgaW4gY2VydGFpbiBjaGFyYWN0ZXJzLi4uXG4gICAgICAgIHZhciBsYXN0SW5jbHVkZWRDaGFySW5kZXggPSBsaW5rRW5kSW5kZXggLSAxO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YXIgY2hDb2RlID0gbGluZS5jaGFyQ29kZUF0KGxhc3RJbmNsdWRlZENoYXJJbmRleCk7XG4gICAgICAgICAgICB2YXIgY2hDbGFzcyA9IGNsYXNzaWZpZXIuZ2V0KGNoQ29kZSk7XG4gICAgICAgICAgICBpZiAoY2hDbGFzcyAhPT0gMiAvKiBDYW5ub3RFbmRJbiAqLykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdEluY2x1ZGVkQ2hhckluZGV4LS07XG4gICAgICAgIH0gd2hpbGUgKGxhc3RJbmNsdWRlZENoYXJJbmRleCA+IGxpbmtCZWdpbkluZGV4KTtcbiAgICAgICAgLy8gSGFuZGxlIGxpbmtzIGVuY2xvc2VkIGluIHBhcmVucywgc3F1YXJlIGJyYWNrZXRzIGFuZCBjdXJseXMuXG4gICAgICAgIGlmIChsaW5rQmVnaW5JbmRleCA+IDApIHtcbiAgICAgICAgICAgIHZhciBjaGFyQ29kZUJlZm9yZUxpbmsgPSBsaW5lLmNoYXJDb2RlQXQobGlua0JlZ2luSW5kZXggLSAxKTtcbiAgICAgICAgICAgIHZhciBsYXN0Q2hhckNvZGVJbkxpbmsgPSBsaW5lLmNoYXJDb2RlQXQobGFzdEluY2x1ZGVkQ2hhckluZGV4KTtcbiAgICAgICAgICAgIGlmICgoY2hhckNvZGVCZWZvcmVMaW5rID09PSA0MCAvKiBPcGVuUGFyZW4gKi8gJiYgbGFzdENoYXJDb2RlSW5MaW5rID09PSA0MSAvKiBDbG9zZVBhcmVuICovKVxuICAgICAgICAgICAgICAgIHx8IChjaGFyQ29kZUJlZm9yZUxpbmsgPT09IDkxIC8qIE9wZW5TcXVhcmVCcmFja2V0ICovICYmIGxhc3RDaGFyQ29kZUluTGluayA9PT0gOTMgLyogQ2xvc2VTcXVhcmVCcmFja2V0ICovKVxuICAgICAgICAgICAgICAgIHx8IChjaGFyQ29kZUJlZm9yZUxpbmsgPT09IDEyMyAvKiBPcGVuQ3VybHlCcmFjZSAqLyAmJiBsYXN0Q2hhckNvZGVJbkxpbmsgPT09IDEyNSAvKiBDbG9zZUN1cmx5QnJhY2UgKi8pKSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGVuZCBpbiApIGlmICggaXMgYmVmb3JlIHRoZSBsaW5rIHN0YXJ0XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGVuZCBpbiBdIGlmIFsgaXMgYmVmb3JlIHRoZSBsaW5rIHN0YXJ0XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGVuZCBpbiB9IGlmIHsgaXMgYmVmb3JlIHRoZSBsaW5rIHN0YXJ0XG4gICAgICAgICAgICAgICAgbGFzdEluY2x1ZGVkQ2hhckluZGV4LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBsaW5lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uOiBsaW5rQmVnaW5JbmRleCArIDEsXG4gICAgICAgICAgICAgICAgZW5kTGluZU51bWJlcjogbGluZU51bWJlcixcbiAgICAgICAgICAgICAgICBlbmRDb2x1bW46IGxhc3RJbmNsdWRlZENoYXJJbmRleCArIDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cmw6IGxpbmUuc3Vic3RyaW5nKGxpbmtCZWdpbkluZGV4LCBsYXN0SW5jbHVkZWRDaGFySW5kZXggKyAxKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTGlua0NvbXB1dGVyLmNvbXB1dGVMaW5rcyA9IGZ1bmN0aW9uIChtb2RlbCwgc3RhdGVNYWNoaW5lKSB7XG4gICAgICAgIGlmIChzdGF0ZU1hY2hpbmUgPT09IHZvaWQgMCkgeyBzdGF0ZU1hY2hpbmUgPSBnZXRTdGF0ZU1hY2hpbmUoKTsgfVxuICAgICAgICB2YXIgY2xhc3NpZmllciA9IGdldENsYXNzaWZpZXIoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgbGluZUNvdW50ID0gbW9kZWwuZ2V0TGluZUNvdW50KCk7IGkgPD0gbGluZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gbW9kZWwuZ2V0TGluZUNvbnRlbnQoaSk7XG4gICAgICAgICAgICB2YXIgbGVuID0gbGluZS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgaiA9IDA7XG4gICAgICAgICAgICB2YXIgbGlua0JlZ2luSW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIGxpbmtCZWdpbkNoQ29kZSA9IDA7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSAxIC8qIFN0YXJ0ICovO1xuICAgICAgICAgICAgdmFyIGhhc09wZW5QYXJlbnMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBoYXNPcGVuU3F1YXJlQnJhY2tldCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGhhc09wZW5DdXJseUJyYWNrZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc2V0U3RhdGVNYWNoaW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGNoQ29kZSA9IGxpbmUuY2hhckNvZGVBdChqKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEzIC8qIEFjY2VwdCAqLykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hDbGFzcyA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaENvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAgLyogT3BlblBhcmVuICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc09wZW5QYXJlbnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAwIC8qIE5vbmUgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQxIC8qIENsb3NlUGFyZW4gKi86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IChoYXNPcGVuUGFyZW5zID8gMCAvKiBOb25lICovIDogMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTEgLyogT3BlblNxdWFyZUJyYWNrZXQgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzT3BlblNxdWFyZUJyYWNrZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAwIC8qIE5vbmUgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDkzIC8qIENsb3NlU3F1YXJlQnJhY2tldCAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gKGhhc09wZW5TcXVhcmVCcmFja2V0ID8gMCAvKiBOb25lICovIDogMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTIzIC8qIE9wZW5DdXJseUJyYWNlICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc09wZW5DdXJseUJyYWNrZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAwIC8qIE5vbmUgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyNSAvKiBDbG9zZUN1cmx5QnJhY2UgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IChoYXNPcGVuQ3VybHlCcmFja2V0ID8gMCAvKiBOb25lICovIDogMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIFRoZSBmb2xsb3dpbmcgdGhyZWUgcnVsZXMgbWFrZSBpdCB0aGF0ICcgb3IgXCIgb3IgYCBhcmUgYWxsb3dlZCBpbnNpZGUgbGlua3MgaWYgdGhlIGxpbmsgYmVnYW4gd2l0aCBhIGRpZmZlcmVudCBvbmUgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzkgLyogU2luZ2xlUXVvdGUgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IChsaW5rQmVnaW5DaENvZGUgPT09IDM0IC8qIERvdWJsZVF1b3RlICovIHx8IGxpbmtCZWdpbkNoQ29kZSA9PT0gOTYgLyogQmFja1RpY2sgKi8pID8gMCAvKiBOb25lICovIDogMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzNCAvKiBEb3VibGVRdW90ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gKGxpbmtCZWdpbkNoQ29kZSA9PT0gMzkgLyogU2luZ2xlUXVvdGUgKi8gfHwgbGlua0JlZ2luQ2hDb2RlID09PSA5NiAvKiBCYWNrVGljayAqLykgPyAwIC8qIE5vbmUgKi8gOiAxIC8qIEZvcmNlVGVybWluYXRpb24gKi87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk2IC8qIEJhY2tUaWNrICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAobGlua0JlZ2luQ2hDb2RlID09PSAzOSAvKiBTaW5nbGVRdW90ZSAqLyB8fCBsaW5rQmVnaW5DaENvZGUgPT09IDM0IC8qIERvdWJsZVF1b3RlICovKSA/IDAgLyogTm9uZSAqLyA6IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IGNsYXNzaWZpZXIuZ2V0KGNoQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY2hhcmFjdGVyIHRlcm1pbmF0ZXMgbGlua1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hDbGFzcyA9PT0gMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChMaW5rQ29tcHV0ZXIuX2NyZWF0ZUxpbmsoY2xhc3NpZmllciwgbGluZSwgaSwgbGlua0JlZ2luSW5kZXgsIGopKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U3RhdGVNYWNoaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF0ZSA9PT0gMTIgLyogRW5kICovKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaENsYXNzID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hDb2RlID09PSA5MSAvKiBPcGVuU3F1YXJlQnJhY2tldCAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgZm9yIHRoZSBhdXRob3JpdHkgcGFydCB0byBjb250YWluIGlwdjYgYWRkcmVzc2VzIHdoaWNoIGNvbnRhaW4gWyBhbmQgXVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzT3BlblNxdWFyZUJyYWNrZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IDAgLyogTm9uZSAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSBjbGFzc2lmaWVyLmdldChjaENvZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGNoYXJhY3RlciB0ZXJtaW5hdGVzIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoQ2xhc3MgPT09IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRTdGF0ZU1hY2hpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAxMyAvKiBBY2NlcHQgKi87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGVNYWNoaW5lLm5leHRTdGF0ZShzdGF0ZSwgY2hDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAwIC8qIEludmFsaWQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U3RhdGVNYWNoaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzZXRTdGF0ZU1hY2hpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAxIC8qIFN0YXJ0ICovO1xuICAgICAgICAgICAgICAgICAgICBoYXNPcGVuUGFyZW5zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGhhc09wZW5TcXVhcmVCcmFja2V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGhhc09wZW5DdXJseUJyYWNrZXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjb3JkIHdoZXJlIHRoZSBsaW5rIHN0YXJ0ZWRcbiAgICAgICAgICAgICAgICAgICAgbGlua0JlZ2luSW5kZXggPSBqICsgMTtcbiAgICAgICAgICAgICAgICAgICAgbGlua0JlZ2luQ2hDb2RlID0gY2hDb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEzIC8qIEFjY2VwdCAqLykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKExpbmtDb21wdXRlci5fY3JlYXRlTGluayhjbGFzc2lmaWVyLCBsaW5lLCBpLCBsaW5rQmVnaW5JbmRleCwgbGVuKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rQ29tcHV0ZXI7XG59KCkpO1xuZXhwb3J0IHsgTGlua0NvbXB1dGVyIH07XG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIGxpbmtzIGNvbnRhaW5zIGluIHRoZSBwcm92aWRlZFxuICogZG9jdW1lbnQuICpOb3RlKiB0aGF0IHRoaXMgb3BlcmF0aW9uIGlzIGNvbXB1dGF0aW9uYWxcbiAqIGV4cGVuc2l2ZSBhbmQgc2hvdWxkIG5vdCBydW4gaW4gdGhlIFVJIHRocmVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVMaW5rcyhtb2RlbCkge1xuICAgIGlmICghbW9kZWwgfHwgdHlwZW9mIG1vZGVsLmdldExpbmVDb3VudCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgbW9kZWwuZ2V0TGluZUNvbnRlbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVW5rbm93biBjYWxsZXIhXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIExpbmtDb21wdXRlci5jb21wdXRlTGlua3MobW9kZWwpO1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgQmFzaWNJbnBsYWNlUmVwbGFjZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNpY0lucGxhY2VSZXBsYWNlKCkge1xuICAgICAgICB0aGlzLl9kZWZhdWx0VmFsdWVTZXQgPSBbXG4gICAgICAgICAgICBbJ3RydWUnLCAnZmFsc2UnXSxcbiAgICAgICAgICAgIFsnVHJ1ZScsICdGYWxzZSddLFxuICAgICAgICAgICAgWydQcml2YXRlJywgJ1B1YmxpYycsICdGcmllbmQnLCAnUmVhZE9ubHknLCAnUGFydGlhbCcsICdQcm90ZWN0ZWQnLCAnV3JpdGVPbmx5J10sXG4gICAgICAgICAgICBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddLFxuICAgICAgICBdO1xuICAgIH1cbiAgICBCYXNpY0lucGxhY2VSZXBsYWNlLnByb3RvdHlwZS5uYXZpZ2F0ZVZhbHVlU2V0ID0gZnVuY3Rpb24gKHJhbmdlMSwgdGV4dDEsIHJhbmdlMiwgdGV4dDIsIHVwKSB7XG4gICAgICAgIGlmIChyYW5nZTEgJiYgdGV4dDEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmRvTmF2aWdhdGVWYWx1ZVNldCh0ZXh0MSwgdXApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZTEsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZTIgJiYgdGV4dDIpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmRvTmF2aWdhdGVWYWx1ZVNldCh0ZXh0MiwgdXApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZTIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgQmFzaWNJbnBsYWNlUmVwbGFjZS5wcm90b3R5cGUuZG9OYXZpZ2F0ZVZhbHVlU2V0ID0gZnVuY3Rpb24gKHRleHQsIHVwKSB7XG4gICAgICAgIHZhciBudW1iZXJSZXN1bHQgPSB0aGlzLm51bWJlclJlcGxhY2UodGV4dCwgdXApO1xuICAgICAgICBpZiAobnVtYmVyUmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRSZXBsYWNlKHRleHQsIHVwKTtcbiAgICB9O1xuICAgIEJhc2ljSW5wbGFjZVJlcGxhY2UucHJvdG90eXBlLm51bWJlclJlcGxhY2UgPSBmdW5jdGlvbiAodmFsdWUsIHVwKSB7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSBNYXRoLnBvdygxMCwgdmFsdWUubGVuZ3RoIC0gKHZhbHVlLmxhc3RJbmRleE9mKCcuJykgKyAxKSk7XG4gICAgICAgIHZhciBuMSA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgIHZhciBuMiA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBpZiAoIWlzTmFOKG4xKSAmJiAhaXNOYU4objIpICYmIG4xID09PSBuMikge1xuICAgICAgICAgICAgaWYgKG4xID09PSAwICYmICF1cCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyAvLyBkb24ndCBkbyBuZWdhdGl2ZVxuICAgICAgICAgICAgICAgIC8vXHRcdFx0fSBlbHNlIGlmKG4xID09PSA5ICYmIHVwKSB7XG4gICAgICAgICAgICAgICAgLy9cdFx0XHRcdHJldHVybiBudWxsOyAvLyBkb24ndCBpbnNlcnQgMTAgaW50byBhIG51bWJlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbjEgPSBNYXRoLmZsb29yKG4xICogcHJlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICBuMSArPSB1cCA/IHByZWNpc2lvbiA6IC1wcmVjaXNpb247XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhuMSAvIHByZWNpc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBCYXNpY0lucGxhY2VSZXBsYWNlLnByb3RvdHlwZS50ZXh0UmVwbGFjZSA9IGZ1bmN0aW9uICh2YWx1ZSwgdXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVTZXRzUmVwbGFjZSh0aGlzLl9kZWZhdWx0VmFsdWVTZXQsIHZhbHVlLCB1cCk7XG4gICAgfTtcbiAgICBCYXNpY0lucGxhY2VSZXBsYWNlLnByb3RvdHlwZS52YWx1ZVNldHNSZXBsYWNlID0gZnVuY3Rpb24gKHZhbHVlU2V0cywgdmFsdWUsIHVwKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVTZXRzLmxlbmd0aDsgcmVzdWx0ID09PSBudWxsICYmIGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy52YWx1ZVNldFJlcGxhY2UodmFsdWVTZXRzW2ldLCB2YWx1ZSwgdXApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBCYXNpY0lucGxhY2VSZXBsYWNlLnByb3RvdHlwZS52YWx1ZVNldFJlcGxhY2UgPSBmdW5jdGlvbiAodmFsdWVTZXQsIHZhbHVlLCB1cCkge1xuICAgICAgICB2YXIgaWR4ID0gdmFsdWVTZXQuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgaWR4ICs9IHVwID8gKzEgOiAtMTtcbiAgICAgICAgICAgIGlmIChpZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gdmFsdWVTZXQubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlkeCAlPSB2YWx1ZVNldC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVTZXRbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIEJhc2ljSW5wbGFjZVJlcGxhY2UuSU5TVEFOQ0UgPSBuZXcgQmFzaWNJbnBsYWNlUmVwbGFjZSgpO1xuICAgIHJldHVybiBCYXNpY0lucGxhY2VSZXBsYWNlO1xufSgpKTtcbmV4cG9ydCB7IEJhc2ljSW5wbGFjZVJlcGxhY2UgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBtZXJnZVNvcnQgfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9hcnJheXMuanMnO1xuaW1wb3J0IHsgc3RyaW5nRGlmZiB9IGZyb20gJy4uLy4uLy4uL2Jhc2UvY29tbW9uL2RpZmYvZGlmZi5qcyc7XG5pbXBvcnQgeyBGSU4gfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9pdGVyYXRvci5qcyc7XG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vcGxhdGZvcm0uanMnO1xuaW1wb3J0IHsgVVJJIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vdXJpLmpzJztcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnLi4vY29yZS9wb3NpdGlvbi5qcyc7XG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJy4uL2NvcmUvcmFuZ2UuanMnO1xuaW1wb3J0IHsgRGlmZkNvbXB1dGVyIH0gZnJvbSAnLi4vZGlmZi9kaWZmQ29tcHV0ZXIuanMnO1xuaW1wb3J0IHsgTWlycm9yVGV4dE1vZGVsIGFzIEJhc2VNaXJyb3JNb2RlbCB9IGZyb20gJy4uL21vZGVsL21pcnJvclRleHRNb2RlbC5qcyc7XG5pbXBvcnQgeyBlbnN1cmVWYWxpZFdvcmREZWZpbml0aW9uLCBnZXRXb3JkQXRUZXh0IH0gZnJvbSAnLi4vbW9kZWwvd29yZEhlbHBlci5qcyc7XG5pbXBvcnQgeyBjb21wdXRlTGlua3MgfSBmcm9tICcuLi9tb2Rlcy9saW5rQ29tcHV0ZXIuanMnO1xuaW1wb3J0IHsgQmFzaWNJbnBsYWNlUmVwbGFjZSB9IGZyb20gJy4uL21vZGVzL3N1cHBvcnRzL2lucGxhY2VSZXBsYWNlU3VwcG9ydC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVNb25hY29CYXNlQVBJIH0gZnJvbSAnLi4vc3RhbmRhbG9uZS9zdGFuZGFsb25lQmFzZS5qcyc7XG5pbXBvcnQgeyBnZXRBbGxQcm9wZXJ0eU5hbWVzIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vdHlwZXMuanMnO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIE1pcnJvck1vZGVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNaXJyb3JNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNaXJyb3JNb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWlycm9yTW9kZWwucHJvdG90eXBlLCBcInVyaVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VyaTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pcnJvck1vZGVsLnByb3RvdHlwZSwgXCJ2ZXJzaW9uXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbklkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWlycm9yTW9kZWwucHJvdG90eXBlLCBcImVvbFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VvbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KCk7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuZ2V0TGluZXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZXMuc2xpY2UoMCk7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuZ2V0TGluZUNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZXMubGVuZ3RoO1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLmdldExpbmVDb250ZW50ID0gZnVuY3Rpb24gKGxpbmVOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzW2xpbmVOdW1iZXIgLSAxXTtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5nZXRXb3JkQXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3NpdGlvbiwgd29yZERlZmluaXRpb24pIHtcbiAgICAgICAgdmFyIHdvcmRBdFRleHQgPSBnZXRXb3JkQXRUZXh0KHBvc2l0aW9uLmNvbHVtbiwgZW5zdXJlVmFsaWRXb3JkRGVmaW5pdGlvbih3b3JkRGVmaW5pdGlvbiksIHRoaXMuX2xpbmVzW3Bvc2l0aW9uLmxpbmVOdW1iZXIgLSAxXSwgMCk7XG4gICAgICAgIGlmICh3b3JkQXRUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHBvc2l0aW9uLmxpbmVOdW1iZXIsIHdvcmRBdFRleHQuc3RhcnRDb2x1bW4sIHBvc2l0aW9uLmxpbmVOdW1iZXIsIHdvcmRBdFRleHQuZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5nZXRXb3JkVW50aWxQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3NpdGlvbiwgd29yZERlZmluaXRpb24pIHtcbiAgICAgICAgdmFyIHdvcmRBdFBvc2l0aW9uID0gdGhpcy5nZXRXb3JkQXRQb3NpdGlvbihwb3NpdGlvbiwgd29yZERlZmluaXRpb24pO1xuICAgICAgICBpZiAoIXdvcmRBdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdvcmQ6ICcnLFxuICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uOiBwb3NpdGlvbi5jb2x1bW4sXG4gICAgICAgICAgICAgICAgZW5kQ29sdW1uOiBwb3NpdGlvbi5jb2x1bW5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdvcmQ6IHRoaXMuX2xpbmVzW3Bvc2l0aW9uLmxpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcod29yZEF0UG9zaXRpb24uc3RhcnRDb2x1bW4gLSAxLCBwb3NpdGlvbi5jb2x1bW4gLSAxKSxcbiAgICAgICAgICAgIHN0YXJ0Q29sdW1uOiB3b3JkQXRQb3NpdGlvbi5zdGFydENvbHVtbixcbiAgICAgICAgICAgIGVuZENvbHVtbjogcG9zaXRpb24uY29sdW1uXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuY3JlYXRlV29yZEl0ZXJhdG9yID0gZnVuY3Rpb24gKHdvcmREZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvYmo7XG4gICAgICAgIHZhciBsaW5lTnVtYmVyID0gMDtcbiAgICAgICAgdmFyIGxpbmVUZXh0O1xuICAgICAgICB2YXIgd29yZFJhbmdlc0lkeCA9IDA7XG4gICAgICAgIHZhciB3b3JkUmFuZ2VzID0gW107XG4gICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHdvcmRSYW5nZXNJZHggPCB3b3JkUmFuZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxpbmVUZXh0LnN1YnN0cmluZyh3b3JkUmFuZ2VzW3dvcmRSYW5nZXNJZHhdLnN0YXJ0LCB3b3JkUmFuZ2VzW3dvcmRSYW5nZXNJZHhdLmVuZCk7XG4gICAgICAgICAgICAgICAgd29yZFJhbmdlc0lkeCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHsgZG9uZTogZmFsc2UsIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsaW5lTnVtYmVyID49IF90aGlzLl9saW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRklOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGluZVRleHQgPSBfdGhpcy5fbGluZXNbbGluZU51bWJlcl07XG4gICAgICAgICAgICAgICAgd29yZFJhbmdlcyA9IF90aGlzLl93b3JkZW5pemUobGluZVRleHQsIHdvcmREZWZpbml0aW9uKTtcbiAgICAgICAgICAgICAgICB3b3JkUmFuZ2VzSWR4ID0gMDtcbiAgICAgICAgICAgICAgICBsaW5lTnVtYmVyICs9IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgbmV4dDogbmV4dCB9O1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLmdldExpbmVXb3JkcyA9IGZ1bmN0aW9uIChsaW5lTnVtYmVyLCB3b3JkRGVmaW5pdGlvbikge1xuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX2xpbmVzW2xpbmVOdW1iZXIgLSAxXTtcbiAgICAgICAgdmFyIHJhbmdlcyA9IHRoaXMuX3dvcmRlbml6ZShjb250ZW50LCB3b3JkRGVmaW5pdGlvbik7XG4gICAgICAgIHZhciB3b3JkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHJhbmdlc18xID0gcmFuZ2VzOyBfaSA8IHJhbmdlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gcmFuZ2VzXzFbX2ldO1xuICAgICAgICAgICAgd29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgd29yZDogY29udGVudC5zdWJzdHJpbmcocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCksXG4gICAgICAgICAgICAgICAgc3RhcnRDb2x1bW46IHJhbmdlLnN0YXJ0ICsgMSxcbiAgICAgICAgICAgICAgICBlbmRDb2x1bW46IHJhbmdlLmVuZCArIDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b3JkcztcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5fd29yZGVuaXplID0gZnVuY3Rpb24gKGNvbnRlbnQsIHdvcmREZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICB3b3JkRGVmaW5pdGlvbi5sYXN0SW5kZXggPSAwOyAvLyByZXNldCBsYXN0SW5kZXgganVzdCB0byBiZSBzdXJlXG4gICAgICAgIHdoaWxlIChtYXRjaCA9IHdvcmREZWZpbml0aW9uLmV4ZWMoY29udGVudCkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFswXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBkaWQgbWF0Y2ggdGhlIGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBzdGFydDogbWF0Y2guaW5kZXgsIGVuZDogbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5nZXRWYWx1ZUluUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSB0aGlzLl92YWxpZGF0ZVJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKHJhbmdlLnN0YXJ0TGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzW3JhbmdlLnN0YXJ0TGluZU51bWJlciAtIDFdLnN1YnN0cmluZyhyYW5nZS5zdGFydENvbHVtbiAtIDEsIHJhbmdlLmVuZENvbHVtbiAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lRW5kaW5nID0gdGhpcy5fZW9sO1xuICAgICAgICB2YXIgc3RhcnRMaW5lSW5kZXggPSByYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxO1xuICAgICAgICB2YXIgZW5kTGluZUluZGV4ID0gcmFuZ2UuZW5kTGluZU51bWJlciAtIDE7XG4gICAgICAgIHZhciByZXN1bHRMaW5lcyA9IFtdO1xuICAgICAgICByZXN1bHRMaW5lcy5wdXNoKHRoaXMuX2xpbmVzW3N0YXJ0TGluZUluZGV4XS5zdWJzdHJpbmcocmFuZ2Uuc3RhcnRDb2x1bW4gLSAxKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydExpbmVJbmRleCArIDE7IGkgPCBlbmRMaW5lSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0TGluZXMucHVzaCh0aGlzLl9saW5lc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0TGluZXMucHVzaCh0aGlzLl9saW5lc1tlbmRMaW5lSW5kZXhdLnN1YnN0cmluZygwLCByYW5nZS5lbmRDb2x1bW4gLSAxKSk7XG4gICAgICAgIHJldHVybiByZXN1bHRMaW5lcy5qb2luKGxpbmVFbmRpbmcpO1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLm9mZnNldEF0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5fdmFsaWRhdGVQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX2Vuc3VyZUxpbmVTdGFydHMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVTdGFydHMuZ2V0QWNjdW11bGF0ZWRWYWx1ZShwb3NpdGlvbi5saW5lTnVtYmVyIC0gMikgKyAocG9zaXRpb24uY29sdW1uIC0gMSk7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUucG9zaXRpb25BdCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5mbG9vcihvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xuICAgICAgICB0aGlzLl9lbnN1cmVMaW5lU3RhcnRzKCk7XG4gICAgICAgIHZhciBvdXQgPSB0aGlzLl9saW5lU3RhcnRzLmdldEluZGV4T2Yob2Zmc2V0KTtcbiAgICAgICAgdmFyIGxpbmVMZW5ndGggPSB0aGlzLl9saW5lc1tvdXQuaW5kZXhdLmxlbmd0aDtcbiAgICAgICAgLy8gRW5zdXJlIHdlIHJldHVybiBhIHZhbGlkIHBvc2l0aW9uXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaW5lTnVtYmVyOiAxICsgb3V0LmluZGV4LFxuICAgICAgICAgICAgY29sdW1uOiAxICsgTWF0aC5taW4ob3V0LnJlbWFpbmRlciwgbGluZUxlbmd0aClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5fdmFsaWRhdGVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLl92YWxpZGF0ZVBvc2l0aW9uKHsgbGluZU51bWJlcjogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLCBjb2x1bW46IHJhbmdlLnN0YXJ0Q29sdW1uIH0pO1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5fdmFsaWRhdGVQb3NpdGlvbih7IGxpbmVOdW1iZXI6IHJhbmdlLmVuZExpbmVOdW1iZXIsIGNvbHVtbjogcmFuZ2UuZW5kQ29sdW1uIH0pO1xuICAgICAgICBpZiAoc3RhcnQubGluZU51bWJlciAhPT0gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyXG4gICAgICAgICAgICB8fCBzdGFydC5jb2x1bW4gIT09IHJhbmdlLnN0YXJ0Q29sdW1uXG4gICAgICAgICAgICB8fCBlbmQubGluZU51bWJlciAhPT0gcmFuZ2UuZW5kTGluZU51bWJlclxuICAgICAgICAgICAgfHwgZW5kLmNvbHVtbiAhPT0gcmFuZ2UuZW5kQ29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0TGluZU51bWJlcjogc3RhcnQubGluZU51bWJlcixcbiAgICAgICAgICAgICAgICBzdGFydENvbHVtbjogc3RhcnQuY29sdW1uLFxuICAgICAgICAgICAgICAgIGVuZExpbmVOdW1iZXI6IGVuZC5saW5lTnVtYmVyLFxuICAgICAgICAgICAgICAgIGVuZENvbHVtbjogZW5kLmNvbHVtblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuX3ZhbGlkYXRlUG9zaXRpb24gPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCFQb3NpdGlvbi5pc0lQb3NpdGlvbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIHBvc2l0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmVOdW1iZXIgPSBwb3NpdGlvbi5saW5lTnVtYmVyLCBjb2x1bW4gPSBwb3NpdGlvbi5jb2x1bW47XG4gICAgICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmIChsaW5lTnVtYmVyIDwgMSkge1xuICAgICAgICAgICAgbGluZU51bWJlciA9IDE7XG4gICAgICAgICAgICBjb2x1bW4gPSAxO1xuICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGluZU51bWJlciA+IHRoaXMuX2xpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGluZU51bWJlciA9IHRoaXMuX2xpbmVzLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbHVtbiA9IHRoaXMuX2xpbmVzW2xpbmVOdW1iZXIgLSAxXS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbWF4Q2hhcmFjdGVyID0gdGhpcy5fbGluZXNbbGluZU51bWJlciAtIDFdLmxlbmd0aCArIDE7XG4gICAgICAgICAgICBpZiAoY29sdW1uIDwgMSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbiA9IDE7XG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2x1bW4gPiBtYXhDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gPSBtYXhDaGFyYWN0ZXI7XG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4geyBsaW5lTnVtYmVyOiBsaW5lTnVtYmVyLCBjb2x1bW46IGNvbHVtbiB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTWlycm9yTW9kZWw7XG59KEJhc2VNaXJyb3JNb2RlbCkpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzZUVkaXRvclNpbXBsZVdvcmtlcihmb3JlaWduTW9kdWxlRmFjdG9yeSkge1xuICAgICAgICB0aGlzLl9mb3JlaWduTW9kdWxlRmFjdG9yeSA9IGZvcmVpZ25Nb2R1bGVGYWN0b3J5O1xuICAgICAgICB0aGlzLl9mb3JlaWduTW9kdWxlID0gbnVsbDtcbiAgICB9XG4gICAgLy8gLS0tLSBCRUdJTiBkaWZmIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUuY29tcHV0ZURpZmYgPSBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIG1vZGlmaWVkVXJsLCBpZ25vcmVUcmltV2hpdGVzcGFjZSkge1xuICAgICAgICB2YXIgb3JpZ2luYWwgPSB0aGlzLl9nZXRNb2RlbChvcmlnaW5hbFVybCk7XG4gICAgICAgIHZhciBtb2RpZmllZCA9IHRoaXMuX2dldE1vZGVsKG1vZGlmaWVkVXJsKTtcbiAgICAgICAgaWYgKCFvcmlnaW5hbCB8fCAhbW9kaWZpZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9yaWdpbmFsTGluZXMgPSBvcmlnaW5hbC5nZXRMaW5lc0NvbnRlbnQoKTtcbiAgICAgICAgdmFyIG1vZGlmaWVkTGluZXMgPSBtb2RpZmllZC5nZXRMaW5lc0NvbnRlbnQoKTtcbiAgICAgICAgdmFyIGRpZmZDb21wdXRlciA9IG5ldyBEaWZmQ29tcHV0ZXIob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywge1xuICAgICAgICAgICAgc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzOiB0cnVlLFxuICAgICAgICAgICAgc2hvdWxkUG9zdFByb2Nlc3NDaGFyQ2hhbmdlczogdHJ1ZSxcbiAgICAgICAgICAgIHNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlOiBpZ25vcmVUcmltV2hpdGVzcGFjZSxcbiAgICAgICAgICAgIHNob3VsZE1ha2VQcmV0dHlEaWZmOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY2hhbmdlcyA9IGRpZmZDb21wdXRlci5jb21wdXRlRGlmZigpO1xuICAgICAgICB2YXIgaWRlbnRpY2FsID0gKGNoYW5nZXMubGVuZ3RoID4gMCA/IGZhbHNlIDogdGhpcy5fbW9kZWxzQXJlSWRlbnRpY2FsKG9yaWdpbmFsLCBtb2RpZmllZCkpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgIGlkZW50aWNhbDogaWRlbnRpY2FsLFxuICAgICAgICAgICAgY2hhbmdlczogY2hhbmdlc1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIucHJvdG90eXBlLl9tb2RlbHNBcmVJZGVudGljYWwgPSBmdW5jdGlvbiAob3JpZ2luYWwsIG1vZGlmaWVkKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbExpbmVDb3VudCA9IG9yaWdpbmFsLmdldExpbmVDb3VudCgpO1xuICAgICAgICB2YXIgbW9kaWZpZWRMaW5lQ291bnQgPSBtb2RpZmllZC5nZXRMaW5lQ291bnQoKTtcbiAgICAgICAgaWYgKG9yaWdpbmFsTGluZUNvdW50ICE9PSBtb2RpZmllZExpbmVDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGxpbmUgPSAxOyBsaW5lIDw9IG9yaWdpbmFsTGluZUNvdW50OyBsaW5lKyspIHtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbExpbmUgPSBvcmlnaW5hbC5nZXRMaW5lQ29udGVudChsaW5lKTtcbiAgICAgICAgICAgIHZhciBtb2RpZmllZExpbmUgPSBtb2RpZmllZC5nZXRMaW5lQ29udGVudChsaW5lKTtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbExpbmUgIT09IG1vZGlmaWVkTGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIucHJvdG90eXBlLmNvbXB1dGVNb3JlTWluaW1hbEVkaXRzID0gZnVuY3Rpb24gKG1vZGVsVXJsLCBlZGl0cykge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLl9nZXRNb2RlbChtb2RlbFVybCk7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZWRpdHMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIGxhc3RFb2wgPSB1bmRlZmluZWQ7XG4gICAgICAgIGVkaXRzID0gbWVyZ2VTb3J0KGVkaXRzLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEucmFuZ2UgJiYgYi5yYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSYW5nZS5jb21wYXJlUmFuZ2VzVXNpbmdTdGFydHMoYS5yYW5nZSwgYi5yYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlb2wgb25seSBjaGFuZ2VzIHNob3VsZCBnbyB0byB0aGUgZW5kXG4gICAgICAgICAgICB2YXIgYVJuZyA9IGEucmFuZ2UgPyAwIDogMTtcbiAgICAgICAgICAgIHZhciBiUm5nID0gYi5yYW5nZSA/IDAgOiAxO1xuICAgICAgICAgICAgcmV0dXJuIGFSbmcgLSBiUm5nO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBlZGl0c18xID0gZWRpdHM7IF9pIDwgZWRpdHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGVkaXRzXzFbX2ldLCByYW5nZSA9IF9hLnJhbmdlLCB0ZXh0ID0gX2EudGV4dCwgZW9sID0gX2EuZW9sO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlb2wgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgbGFzdEVvbCA9IGVvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChSYW5nZS5pc0VtcHR5KHJhbmdlKSAmJiAhdGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGNoYW5nZVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gbW9kZWwuZ2V0VmFsdWVJblJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcclxcbnxcXG58XFxyL2csIG1vZGVsLmVvbCk7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwgPT09IHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyBub29wXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgZGlmZiB3b24ndCB0YWtlIHRvbyBsb25nXG4gICAgICAgICAgICBpZiAoTWF0aC5tYXgodGV4dC5sZW5ndGgsIG9yaWdpbmFsLmxlbmd0aCkgPiBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLl9kaWZmTGltaXQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IHJhbmdlOiByYW5nZSwgdGV4dDogdGV4dCB9KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbXB1dGUgZGlmZiBiZXR3ZWVuIG9yaWdpbmFsIGFuZCBlZGl0LnRleHRcbiAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gc3RyaW5nRGlmZihvcmlnaW5hbCwgdGV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgdmFyIGVkaXRPZmZzZXQgPSBtb2RlbC5vZmZzZXRBdChSYW5nZS5saWZ0KHJhbmdlKS5nZXRTdGFydFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBjaGFuZ2VzXzEgPSBjaGFuZ2VzOyBfYiA8IGNoYW5nZXNfMS5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlID0gY2hhbmdlc18xW19iXTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBtb2RlbC5wb3NpdGlvbkF0KGVkaXRPZmZzZXQgKyBjaGFuZ2Uub3JpZ2luYWxTdGFydCk7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IG1vZGVsLnBvc2l0aW9uQXQoZWRpdE9mZnNldCArIGNoYW5nZS5vcmlnaW5hbFN0YXJ0ICsgY2hhbmdlLm9yaWdpbmFsTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RWRpdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dC5zdWJzdHIoY2hhbmdlLm1vZGlmaWVkU3RhcnQsIGNoYW5nZS5tb2RpZmllZExlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7IHN0YXJ0TGluZU51bWJlcjogc3RhcnQubGluZU51bWJlciwgc3RhcnRDb2x1bW46IHN0YXJ0LmNvbHVtbiwgZW5kTGluZU51bWJlcjogZW5kLmxpbmVOdW1iZXIsIGVuZENvbHVtbjogZW5kLmNvbHVtbiB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuZ2V0VmFsdWVJblJhbmdlKG5ld0VkaXQucmFuZ2UpICE9PSBuZXdFZGl0LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3RWRpdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGFzdEVvbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgZW9sOiBsYXN0RW9sLCB0ZXh0OiAnJywgcmFuZ2U6IHsgc3RhcnRMaW5lTnVtYmVyOiAwLCBzdGFydENvbHVtbjogMCwgZW5kTGluZU51bWJlcjogMCwgZW5kQ29sdW1uOiAwIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgIH07XG4gICAgLy8gLS0tLSBFTkQgbWluaW1hbCBlZGl0cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS5jb21wdXRlTGlua3MgPSBmdW5jdGlvbiAobW9kZWxVcmwpIHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5fZ2V0TW9kZWwobW9kZWxVcmwpO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29tcHV0ZUxpbmtzKG1vZGVsKSk7XG4gICAgfTtcbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS50ZXh0dWFsU3VnZ2VzdCA9IGZ1bmN0aW9uIChtb2RlbFVybCwgcG9zaXRpb24sIHdvcmREZWYsIHdvcmREZWZGbGFncykge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLl9nZXRNb2RlbChtb2RlbFVybCk7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgIHZhciB3b3JkRGVmUmVnRXhwID0gbmV3IFJlZ0V4cCh3b3JkRGVmLCB3b3JkRGVmRmxhZ3MpO1xuICAgICAgICB2YXIgY3VycmVudFdvcmQgPSBtb2RlbC5nZXRXb3JkVW50aWxQb3NpdGlvbihwb3NpdGlvbiwgd29yZERlZlJlZ0V4cCk7XG4gICAgICAgIHZhciBzZWVuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgc2VlbltjdXJyZW50V29yZC53b3JkXSA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGl0ZXIgPSBtb2RlbC5jcmVhdGVXb3JkSXRlcmF0b3Iod29yZERlZlJlZ0V4cCksIGUgPSBpdGVyLm5leHQoKTsgIWUuZG9uZSAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gQmFzZUVkaXRvclNpbXBsZVdvcmtlci5fc3VnZ2VzdGlvbnNMaW1pdDsgZSA9IGl0ZXIubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgd29yZCA9IGUudmFsdWU7XG4gICAgICAgICAgICBpZiAoc2Vlblt3b3JkXSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vlblt3b3JkXSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih3b3JkKSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIGtpbmQ6IDE4IC8qIFRleHQgKi8sXG4gICAgICAgICAgICAgICAgbGFiZWw6IHdvcmQsXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dDogd29yZCxcbiAgICAgICAgICAgICAgICByYW5nZTogeyBzdGFydExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uOiBjdXJyZW50V29yZC5zdGFydENvbHVtbiwgZW5kTGluZU51bWJlcjogcG9zaXRpb24ubGluZU51bWJlciwgZW5kQ29sdW1uOiBjdXJyZW50V29yZC5lbmRDb2x1bW4gfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyB9KTtcbiAgICB9O1xuICAgIC8vIC0tLS0gRU5EIHN1Z2dlc3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyNyZWdpb24gLS0gd29yZCByYW5nZXMgLS1cbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS5jb21wdXRlV29yZFJhbmdlcyA9IGZ1bmN0aW9uIChtb2RlbFVybCwgcmFuZ2UsIHdvcmREZWYsIHdvcmREZWZGbGFncykge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLl9nZXRNb2RlbChtb2RlbFVybCk7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdvcmREZWZSZWdFeHAgPSBuZXcgUmVnRXhwKHdvcmREZWYsIHdvcmREZWZGbGFncyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmb3IgKHZhciBsaW5lID0gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyOyBsaW5lIDwgcmFuZ2UuZW5kTGluZU51bWJlcjsgbGluZSsrKSB7XG4gICAgICAgICAgICB2YXIgd29yZHMgPSBtb2RlbC5nZXRMaW5lV29yZHMobGluZSwgd29yZERlZlJlZ0V4cCk7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHdvcmRzXzEgPSB3b3JkczsgX2kgPCB3b3Jkc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciB3b3JkID0gd29yZHNfMVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIod29yZC53b3JkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IHJlc3VsdFt3b3JkLndvcmRdO1xuICAgICAgICAgICAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3dvcmQud29yZF0gPSBhcnJheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZU51bWJlcjogbGluZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb2x1bW46IHdvcmQuc3RhcnRDb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmVOdW1iZXI6IGxpbmUsXG4gICAgICAgICAgICAgICAgICAgIGVuZENvbHVtbjogd29yZC5lbmRDb2x1bW5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfTtcbiAgICAvLyNlbmRyZWdpb25cbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS5uYXZpZ2F0ZVZhbHVlU2V0ID0gZnVuY3Rpb24gKG1vZGVsVXJsLCByYW5nZSwgdXAsIHdvcmREZWYsIHdvcmREZWZGbGFncykge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLl9nZXRNb2RlbChtb2RlbFVybCk7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdvcmREZWZSZWdFeHAgPSBuZXcgUmVnRXhwKHdvcmREZWYsIHdvcmREZWZGbGFncyk7XG4gICAgICAgIGlmIChyYW5nZS5zdGFydENvbHVtbiA9PT0gcmFuZ2UuZW5kQ29sdW1uKSB7XG4gICAgICAgICAgICByYW5nZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydExpbmVOdW1iZXI6IHJhbmdlLnN0YXJ0TGluZU51bWJlcixcbiAgICAgICAgICAgICAgICBzdGFydENvbHVtbjogcmFuZ2Uuc3RhcnRDb2x1bW4sXG4gICAgICAgICAgICAgICAgZW5kTGluZU51bWJlcjogcmFuZ2UuZW5kTGluZU51bWJlcixcbiAgICAgICAgICAgICAgICBlbmRDb2x1bW46IHJhbmdlLmVuZENvbHVtbiArIDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGVjdGlvblRleHQgPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2UocmFuZ2UpO1xuICAgICAgICB2YXIgd29yZFJhbmdlID0gbW9kZWwuZ2V0V29yZEF0UG9zaXRpb24oeyBsaW5lTnVtYmVyOiByYW5nZS5zdGFydExpbmVOdW1iZXIsIGNvbHVtbjogcmFuZ2Uuc3RhcnRDb2x1bW4gfSwgd29yZERlZlJlZ0V4cCk7XG4gICAgICAgIGlmICghd29yZFJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3b3JkID0gbW9kZWwuZ2V0VmFsdWVJblJhbmdlKHdvcmRSYW5nZSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBCYXNpY0lucGxhY2VSZXBsYWNlLklOU1RBTkNFLm5hdmlnYXRlVmFsdWVTZXQocmFuZ2UsIHNlbGVjdGlvblRleHQsIHdvcmRSYW5nZSwgd29yZCwgdXApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfTtcbiAgICAvLyAtLS0tIEJFR0lOIGZvcmVpZ24gbW9kdWxlIHN1cHBvcnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS5sb2FkRm9yZWlnbk1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgY3JlYXRlRGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY3R4ID0ge1xuICAgICAgICAgICAgZ2V0TWlycm9yTW9kZWxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9nZXRNb2RlbHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuX2ZvcmVpZ25Nb2R1bGVGYWN0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLl9mb3JlaWduTW9kdWxlID0gdGhpcy5fZm9yZWlnbk1vZHVsZUZhY3RvcnkoY3R4LCBjcmVhdGVEYXRhKTtcbiAgICAgICAgICAgIC8vIHN0YXRpYyBmb3JlaW5nIG1vZHVsZVxuICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBnZXRBbGxQcm9wZXJ0eU5hbWVzKHRoaXMuX2ZvcmVpZ25Nb2R1bGUpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fZm9yZWlnbk1vZHVsZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2RzLnB1c2gocHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRob2RzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFU00tY29tbWVudC1iZWdpblxuICAgICAgICAvLyBcdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBcdFx0XHRyZXF1aXJlKFttb2R1bGVJZF0sIChmb3JlaWduTW9kdWxlOiB7IGNyZWF0ZTogSUZvcmVpZ25Nb2R1bGVGYWN0b3J5IH0pID0+IHtcbiAgICAgICAgLy8gXHRcdFx0XHR0aGlzLl9mb3JlaWduTW9kdWxlID0gZm9yZWlnbk1vZHVsZS5jcmVhdGUoY3R4LCBjcmVhdGVEYXRhKTtcbiAgICAgICAgLy8gXG4gICAgICAgIC8vIFx0XHRcdFx0bGV0IG1ldGhvZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIC8vIFx0XHRcdFx0Zm9yIChjb25zdCBwcm9wIG9mIGdldEFsbFByb3BlcnR5TmFtZXModGhpcy5fZm9yZWlnbk1vZHVsZSkpIHtcbiAgICAgICAgLy8gXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fZm9yZWlnbk1vZHVsZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBcdFx0XHRcdFx0XHRtZXRob2RzLnB1c2gocHJvcCk7XG4gICAgICAgIC8vIFx0XHRcdFx0XHR9XG4gICAgICAgIC8vIFx0XHRcdFx0fVxuICAgICAgICAvLyBcbiAgICAgICAgLy8gXHRcdFx0XHRyZXNvbHZlKG1ldGhvZHMpO1xuICAgICAgICAvLyBcbiAgICAgICAgLy8gXHRcdFx0fSwgcmVqZWN0KTtcbiAgICAgICAgLy8gXHRcdH0pO1xuICAgICAgICAvLyBFU00tY29tbWVudC1lbmRcbiAgICAgICAgLy8gRVNNLXVuY29tbWVudC1iZWdpblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCB1c2FnZVwiKSk7XG4gICAgICAgIC8vIEVTTS11bmNvbW1lbnQtZW5kXG4gICAgfTtcbiAgICAvLyBmb3JlaWduIG1ldGhvZCByZXF1ZXN0XG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUuZm1yID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJncykge1xuICAgICAgICBpZiAoIXRoaXMuX2ZvcmVpZ25Nb2R1bGUgfHwgdHlwZW9mIHRoaXMuX2ZvcmVpZ25Nb2R1bGVbbWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTWlzc2luZyByZXF1ZXN0SGFuZGxlciBvciBtZXRob2Q6ICcgKyBtZXRob2QpKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9mb3JlaWduTW9kdWxlW21ldGhvZF0uYXBwbHkodGhpcy5fZm9yZWlnbk1vZHVsZSwgYXJncykpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIC0tLS0gRU5EIGRpZmYgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAtLS0tIEJFR0lOIG1pbmltYWwgZWRpdHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5fZGlmZkxpbWl0ID0gMTAwMDA7XG4gICAgLy8gLS0tLSBCRUdJTiBzdWdnZXN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5fc3VnZ2VzdGlvbnNMaW1pdCA9IDEwMDAwO1xuICAgIHJldHVybiBCYXNlRWRpdG9yU2ltcGxlV29ya2VyO1xufSgpKTtcbmV4cG9ydCB7IEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIgfTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbnZhciBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFZGl0b3JTaW1wbGVXb3JrZXJJbXBsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEVkaXRvclNpbXBsZVdvcmtlckltcGwoZm9yZWlnbk1vZHVsZUZhY3RvcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZm9yZWlnbk1vZHVsZUZhY3RvcnkpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9tb2RlbHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEVkaXRvclNpbXBsZVdvcmtlckltcGwucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21vZGVscyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcbiAgICBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsLnByb3RvdHlwZS5fZ2V0TW9kZWwgPSBmdW5jdGlvbiAodXJpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbHNbdXJpXTtcbiAgICB9O1xuICAgIEVkaXRvclNpbXBsZVdvcmtlckltcGwucHJvdG90eXBlLl9nZXRNb2RlbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhbGwgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fbW9kZWxzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGFsbC5wdXNoKF90aGlzLl9tb2RlbHNba2V5XSk7IH0pO1xuICAgICAgICByZXR1cm4gYWxsO1xuICAgIH07XG4gICAgRWRpdG9yU2ltcGxlV29ya2VySW1wbC5wcm90b3R5cGUuYWNjZXB0TmV3TW9kZWwgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLl9tb2RlbHNbZGF0YS51cmxdID0gbmV3IE1pcnJvck1vZGVsKFVSSS5wYXJzZShkYXRhLnVybCksIGRhdGEubGluZXMsIGRhdGEuRU9MLCBkYXRhLnZlcnNpb25JZCk7XG4gICAgfTtcbiAgICBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsLnByb3RvdHlwZS5hY2NlcHRNb2RlbENoYW5nZWQgPSBmdW5jdGlvbiAoc3RyVVJMLCBlKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWxzW3N0clVSTF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLl9tb2RlbHNbc3RyVVJMXTtcbiAgICAgICAgbW9kZWwub25FdmVudHMoZSk7XG4gICAgfTtcbiAgICBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsLnByb3RvdHlwZS5hY2NlcHRSZW1vdmVkTW9kZWwgPSBmdW5jdGlvbiAoc3RyVVJMKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWxzW3N0clVSTF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5fbW9kZWxzW3N0clVSTF07XG4gICAgfTtcbiAgICByZXR1cm4gRWRpdG9yU2ltcGxlV29ya2VySW1wbDtcbn0oQmFzZUVkaXRvclNpbXBsZVdvcmtlcikpO1xuZXhwb3J0IHsgRWRpdG9yU2ltcGxlV29ya2VySW1wbCB9O1xuLyoqXG4gKiBDYWxsZWQgb24gdGhlIHdvcmtlciBzaWRlXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IEVkaXRvclNpbXBsZVdvcmtlckltcGwobnVsbCk7XG59XG5pZiAodHlwZW9mIGltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBSdW5uaW5nIGluIGEgd2ViIHdvcmtlclxuICAgIGdsb2JhbHMubW9uYWNvID0gY3JlYXRlTW9uYWNvQmFzZUFQSSgpO1xufVxuIiwiLyohXG5Db3B5cmlnaHQgKGMpIDIwMTQgVGF5bG9yIEhha2VzXG5Db3B5cmlnaHQgKGMpIDIwMTQgRm9yYmVzIExpbmRlc2F5XG4gKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoKSA6XG5cdFx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0XHRcdChmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEB0aGlzIHtQcm9taXNlfVxuXHQgKi9cblx0ZnVuY3Rpb24gZmluYWxseUNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG5cdFx0dmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdGhpcy50aGVuKFxuXHRcdFx0ZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0ZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0XHRyZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29uc3RydWN0b3IucmVqZWN0KHJlYXNvbik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBwcm9taXNlLXBvbHlmaWxsIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuXHQvLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcblx0dmFyIHNldFRpbWVvdXRGdW5jID0gc2V0VGltZW91dDtcblxuXHRmdW5jdGlvbiBub29wKCkgeyB9XG5cblx0Ly8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5cdGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0Zm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuXHQgKi9cblx0ZnVuY3Rpb24gUHJvbWlzZShmbikge1xuXHRcdGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xuXHRcdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIGZ1bmN0aW9uJyk7XG5cdFx0LyoqIEB0eXBlIHshbnVtYmVyfSAqL1xuXHRcdHRoaXMuX3N0YXRlID0gMDtcblx0XHQvKiogQHR5cGUgeyFib29sZWFufSAqL1xuXHRcdHRoaXMuX2hhbmRsZWQgPSBmYWxzZTtcblx0XHQvKiogQHR5cGUge1Byb21pc2V8dW5kZWZpbmVkfSAqL1xuXHRcdHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdC8qKiBAdHlwZSB7IUFycmF5PCFGdW5jdGlvbj59ICovXG5cdFx0dGhpcy5fZGVmZXJyZWRzID0gW107XG5cblx0XHRkb1Jlc29sdmUoZm4sIHRoaXMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlKHNlbGYsIGRlZmVycmVkKSB7XG5cdFx0d2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XG5cdFx0XHRzZWxmID0gc2VsZi5fdmFsdWU7XG5cdFx0fVxuXHRcdGlmIChzZWxmLl9zdGF0ZSA9PT0gMCkge1xuXHRcdFx0c2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcblx0XHRQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcblx0XHRcdGlmIChjYiA9PT0gbnVsbCkge1xuXHRcdFx0XHQoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciByZXQ7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXQgPSBjYihzZWxmLl92YWx1ZSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0cmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzb2x2ZShzZWxmLCBuZXdWYWx1ZSkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuXHRcdFx0aWYgKG5ld1ZhbHVlID09PSBzZWxmKVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdWYWx1ZSAmJlxuXHRcdFx0XHQodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpXG5cdFx0XHQpIHtcblx0XHRcdFx0dmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuXHRcdFx0XHRpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdFx0XHRcdFx0c2VsZi5fc3RhdGUgPSAzO1xuXHRcdFx0XHRcdHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0ZmluYWxlKHNlbGYpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZWxmLl9zdGF0ZSA9IDE7XG5cdFx0XHRzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdFx0ZmluYWxlKHNlbGYpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJlamVjdChzZWxmLCBlKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiByZWplY3Qoc2VsZiwgbmV3VmFsdWUpIHtcblx0XHRzZWxmLl9zdGF0ZSA9IDI7XG5cdFx0c2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRmaW5hbGUoc2VsZik7XG5cdH1cblxuXHRmdW5jdGlvbiBmaW5hbGUoc2VsZikge1xuXHRcdGlmIChzZWxmLl9zdGF0ZSA9PT0gMiAmJiBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICghc2VsZi5faGFuZGxlZCkge1xuXHRcdFx0XHRcdFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG5cdFx0fVxuXHRcdHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG5cdFx0dGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcblx0XHR0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuXHRcdHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG5cdH1cblxuXHQvKipcblx0ICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcblx0ICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG5cdCAqXG5cdCAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cblx0ICovXG5cdGZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgc2VsZikge1xuXHRcdHZhciBkb25lID0gZmFsc2U7XG5cdFx0dHJ5IHtcblx0XHRcdGZuKFxuXHRcdFx0XHRmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHRpZiAoZG9uZSkgcmV0dXJuO1xuXHRcdFx0XHRcdGRvbmUgPSB0cnVlO1xuXHRcdFx0XHRcdHJlc29sdmUoc2VsZiwgdmFsdWUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRcdFx0aWYgKGRvbmUpIHJldHVybjtcblx0XHRcdFx0XHRkb25lID0gdHJ1ZTtcblx0XHRcdFx0XHRyZWplY3Qoc2VsZiwgcmVhc29uKTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9IGNhdGNoIChleCkge1xuXHRcdFx0aWYgKGRvbmUpIHJldHVybjtcblx0XHRcdGRvbmUgPSB0cnVlO1xuXHRcdFx0cmVqZWN0KHNlbGYsIGV4KTtcblx0XHR9XG5cdH1cblxuXHRQcm9taXNlLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG5cdFx0cmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcblx0fTtcblxuXHRQcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHZhciBwcm9tID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cblx0XHRoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcblx0XHRyZXR1cm4gcHJvbTtcblx0fTtcblxuXHRQcm9taXNlLnByb3RvdHlwZVsnZmluYWxseSddID0gZmluYWxseUNvbnN0cnVjdG9yO1xuXG5cdFByb21pc2UuYWxsID0gZnVuY3Rpb24gKGFycikge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRpZiAoIWFyciB8fCB0eXBlb2YgYXJyLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2UuYWxsIGFjY2VwdHMgYW4gYXJyYXknKTtcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcblx0XHRcdGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xuXHRcdFx0dmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXG5cdFx0XHRmdW5jdGlvbiByZXMoaSwgdmFsKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0XHRcdHZhciB0aGVuID0gdmFsLnRoZW47XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0dGhlbi5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdHZhbCxcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXMoaSwgdmFsKTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGFyZ3NbaV0gPSB2YWw7XG5cdFx0XHRcdFx0aWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGFyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdFx0XHRyZWplY3QoZXgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyZXMoaSwgYXJnc1tpXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cblx0UHJvbWlzZS5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0XHRcdHJlc29sdmUodmFsdWUpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdFByb21pc2UucmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHJlamVjdCh2YWx1ZSk7XG5cdFx0fSk7XG5cdH07XG5cblx0UHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHZhbHVlcykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHZhbHVlc1tpXS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXG5cdFByb21pc2UuX2ltbWVkaWF0ZUZuID1cblx0XHQodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0ZnVuY3Rpb24gKGZuKSB7XG5cdFx0XHRcdHNldEltbWVkaWF0ZShmbik7XG5cdFx0XHR9KSB8fFxuXHRcdGZ1bmN0aW9uIChmbikge1xuXHRcdFx0c2V0VGltZW91dEZ1bmMoZm4sIDApO1xuXHRcdH07XG5cblx0UHJvbWlzZS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfdW5oYW5kbGVkUmVqZWN0aW9uRm4oZXJyKSB7XG5cdFx0aWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9XG5cdH07XG5cblx0LyoqIEBzdXBwcmVzcyB7dW5kZWZpbmVkVmFyc30gKi9cblx0dmFyIGdsb2JhbE5TID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvLyB0aGUgb25seSByZWxpYWJsZSBtZWFucyB0byBnZXQgdGhlIGdsb2JhbCBvYmplY3QgaXNcblx0XHQvLyBgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKWBcblx0XHQvLyBIb3dldmVyLCB0aGlzIGNhdXNlcyBDU1AgdmlvbGF0aW9ucyBpbiBDaHJvbWUgYXBwcy5cblx0XHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gd2luZG93O1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBnbG9iYWw7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIGxvY2F0ZSBnbG9iYWwgb2JqZWN0Jyk7XG5cdH0pKCk7XG5cblx0aWYgKCEoJ1Byb21pc2UnIGluIGdsb2JhbE5TKSkge1xuXHRcdGdsb2JhbE5TWydQcm9taXNlJ10gPSBQcm9taXNlO1xuXHR9IGVsc2UgaWYgKCFnbG9iYWxOUy5Qcm9taXNlLnByb3RvdHlwZVsnZmluYWxseSddKSB7XG5cdFx0Z2xvYmFsTlMuUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IGZpbmFsbHlDb25zdHJ1Y3Rvcjtcblx0fVxuXG59KSkpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgJy4vcHJvbWlzZS1wb2x5ZmlsbC9wb2x5ZmlsbC5qcyc7XG5pbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2Jhc2UvY29tbW9uL2NhbmNlbGxhdGlvbi5qcyc7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vZXZlbnQuanMnO1xuaW1wb3J0IHsgS2V5Q2hvcmQgfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9rZXlDb2Rlcy5qcyc7XG5pbXBvcnQgeyBVUkkgfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi91cmkuanMnO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tICcuLi9jb3JlL3Bvc2l0aW9uLmpzJztcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAnLi4vY29yZS9yYW5nZS5qcyc7XG5pbXBvcnQgeyBTZWxlY3Rpb24gfSBmcm9tICcuLi9jb3JlL3NlbGVjdGlvbi5qcyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uL2NvcmUvdG9rZW4uanMnO1xuaW1wb3J0ICogYXMgc3RhbmRhbG9uZUVudW1zIGZyb20gJy4vc3RhbmRhbG9uZUVudW1zLmpzJztcbnZhciBLZXlNb2QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gS2V5TW9kKCkge1xuICAgIH1cbiAgICBLZXlNb2QuY2hvcmQgPSBmdW5jdGlvbiAoZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0KSB7XG4gICAgICAgIHJldHVybiBLZXlDaG9yZChmaXJzdFBhcnQsIHNlY29uZFBhcnQpO1xuICAgIH07XG4gICAgS2V5TW9kLkN0cmxDbWQgPSAyMDQ4IC8qIEN0cmxDbWQgKi87XG4gICAgS2V5TW9kLlNoaWZ0ID0gMTAyNCAvKiBTaGlmdCAqLztcbiAgICBLZXlNb2QuQWx0ID0gNTEyIC8qIEFsdCAqLztcbiAgICBLZXlNb2QuV2luQ3RybCA9IDI1NiAvKiBXaW5DdHJsICovO1xuICAgIHJldHVybiBLZXlNb2Q7XG59KCkpO1xuZXhwb3J0IHsgS2V5TW9kIH07XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW9uYWNvQmFzZUFQSSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBlZGl0b3I6IHVuZGVmaW5lZCxcbiAgICAgICAgbGFuZ3VhZ2VzOiB1bmRlZmluZWQsXG4gICAgICAgIENhbmNlbGxhdGlvblRva2VuU291cmNlOiBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSxcbiAgICAgICAgRW1pdHRlcjogRW1pdHRlcixcbiAgICAgICAgS2V5Q29kZTogc3RhbmRhbG9uZUVudW1zLktleUNvZGUsXG4gICAgICAgIEtleU1vZDogS2V5TW9kLFxuICAgICAgICBQb3NpdGlvbjogUG9zaXRpb24sXG4gICAgICAgIFJhbmdlOiBSYW5nZSxcbiAgICAgICAgU2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4gICAgICAgIFNlbGVjdGlvbkRpcmVjdGlvbjogc3RhbmRhbG9uZUVudW1zLlNlbGVjdGlvbkRpcmVjdGlvbixcbiAgICAgICAgTWFya2VyU2V2ZXJpdHk6IHN0YW5kYWxvbmVFbnVtcy5NYXJrZXJTZXZlcml0eSxcbiAgICAgICAgTWFya2VyVGFnOiBzdGFuZGFsb25lRW51bXMuTWFya2VyVGFnLFxuICAgICAgICBVcmk6IFVSSSxcbiAgICAgICAgVG9rZW46IFRva2VuXG4gICAgfTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLy8gVEhJUyBJUyBBIEdFTkVSQVRFRCBGSUxFLiBETyBOT1QgRURJVCBESVJFQ1RMWS5cbmV4cG9ydCB2YXIgTWFya2VyVGFnO1xuKGZ1bmN0aW9uIChNYXJrZXJUYWcpIHtcbiAgICBNYXJrZXJUYWdbTWFya2VyVGFnW1wiVW5uZWNlc3NhcnlcIl0gPSAxXSA9IFwiVW5uZWNlc3NhcnlcIjtcbn0pKE1hcmtlclRhZyB8fCAoTWFya2VyVGFnID0ge30pKTtcbmV4cG9ydCB2YXIgTWFya2VyU2V2ZXJpdHk7XG4oZnVuY3Rpb24gKE1hcmtlclNldmVyaXR5KSB7XG4gICAgTWFya2VyU2V2ZXJpdHlbTWFya2VyU2V2ZXJpdHlbXCJIaW50XCJdID0gMV0gPSBcIkhpbnRcIjtcbiAgICBNYXJrZXJTZXZlcml0eVtNYXJrZXJTZXZlcml0eVtcIkluZm9cIl0gPSAyXSA9IFwiSW5mb1wiO1xuICAgIE1hcmtlclNldmVyaXR5W01hcmtlclNldmVyaXR5W1wiV2FybmluZ1wiXSA9IDRdID0gXCJXYXJuaW5nXCI7XG4gICAgTWFya2VyU2V2ZXJpdHlbTWFya2VyU2V2ZXJpdHlbXCJFcnJvclwiXSA9IDhdID0gXCJFcnJvclwiO1xufSkoTWFya2VyU2V2ZXJpdHkgfHwgKE1hcmtlclNldmVyaXR5ID0ge30pKTtcbi8qKlxuICogVmlydHVhbCBLZXkgQ29kZXMsIHRoZSB2YWx1ZSBkb2VzIG5vdCBob2xkIGFueSBpbmhlcmVudCBtZWFuaW5nLlxuICogSW5zcGlyZWQgc29tZXdoYXQgZnJvbSBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3dpbmRvd3MvZGVza3RvcC9kZDM3NTczMSh2PXZzLjg1KS5hc3B4XG4gKiBCdXQgdGhlc2UgYXJlIFwibW9yZSBnZW5lcmFsXCIsIGFzIHRoZXkgc2hvdWxkIHdvcmsgYWNyb3NzIGJyb3dzZXJzICYgT1Ngcy5cbiAqL1xuZXhwb3J0IHZhciBLZXlDb2RlO1xuKGZ1bmN0aW9uIChLZXlDb2RlKSB7XG4gICAgLyoqXG4gICAgICogUGxhY2VkIGZpcnN0IHRvIGNvdmVyIHRoZSAwIHZhbHVlIG9mIHRoZSBlbnVtLlxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVua25vd25cIl0gPSAwXSA9IFwiVW5rbm93blwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkJhY2tzcGFjZVwiXSA9IDFdID0gXCJCYWNrc3BhY2VcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJUYWJcIl0gPSAyXSA9IFwiVGFiXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRW50ZXJcIl0gPSAzXSA9IFwiRW50ZXJcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJTaGlmdFwiXSA9IDRdID0gXCJTaGlmdFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkN0cmxcIl0gPSA1XSA9IFwiQ3RybFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkFsdFwiXSA9IDZdID0gXCJBbHRcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJQYXVzZUJyZWFrXCJdID0gN10gPSBcIlBhdXNlQnJlYWtcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJDYXBzTG9ja1wiXSA9IDhdID0gXCJDYXBzTG9ja1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkVzY2FwZVwiXSA9IDldID0gXCJFc2NhcGVcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJTcGFjZVwiXSA9IDEwXSA9IFwiU3BhY2VcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJQYWdlVXBcIl0gPSAxMV0gPSBcIlBhZ2VVcFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlBhZ2VEb3duXCJdID0gMTJdID0gXCJQYWdlRG93blwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkVuZFwiXSA9IDEzXSA9IFwiRW5kXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiSG9tZVwiXSA9IDE0XSA9IFwiSG9tZVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkxlZnRBcnJvd1wiXSA9IDE1XSA9IFwiTGVmdEFycm93XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVXBBcnJvd1wiXSA9IDE2XSA9IFwiVXBBcnJvd1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlJpZ2h0QXJyb3dcIl0gPSAxN10gPSBcIlJpZ2h0QXJyb3dcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJEb3duQXJyb3dcIl0gPSAxOF0gPSBcIkRvd25BcnJvd1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkluc2VydFwiXSA9IDE5XSA9IFwiSW5zZXJ0XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRGVsZXRlXCJdID0gMjBdID0gXCJEZWxldGVcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfMFwiXSA9IDIxXSA9IFwiS0VZXzBcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfMVwiXSA9IDIyXSA9IFwiS0VZXzFcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfMlwiXSA9IDIzXSA9IFwiS0VZXzJcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfM1wiXSA9IDI0XSA9IFwiS0VZXzNcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfNFwiXSA9IDI1XSA9IFwiS0VZXzRcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfNVwiXSA9IDI2XSA9IFwiS0VZXzVcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfNlwiXSA9IDI3XSA9IFwiS0VZXzZcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfN1wiXSA9IDI4XSA9IFwiS0VZXzdcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfOFwiXSA9IDI5XSA9IFwiS0VZXzhcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfOVwiXSA9IDMwXSA9IFwiS0VZXzlcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfQVwiXSA9IDMxXSA9IFwiS0VZX0FcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfQlwiXSA9IDMyXSA9IFwiS0VZX0JcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfQ1wiXSA9IDMzXSA9IFwiS0VZX0NcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfRFwiXSA9IDM0XSA9IFwiS0VZX0RcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfRVwiXSA9IDM1XSA9IFwiS0VZX0VcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfRlwiXSA9IDM2XSA9IFwiS0VZX0ZcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfR1wiXSA9IDM3XSA9IFwiS0VZX0dcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfSFwiXSA9IDM4XSA9IFwiS0VZX0hcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfSVwiXSA9IDM5XSA9IFwiS0VZX0lcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfSlwiXSA9IDQwXSA9IFwiS0VZX0pcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfS1wiXSA9IDQxXSA9IFwiS0VZX0tcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfTFwiXSA9IDQyXSA9IFwiS0VZX0xcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfTVwiXSA9IDQzXSA9IFwiS0VZX01cIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfTlwiXSA9IDQ0XSA9IFwiS0VZX05cIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfT1wiXSA9IDQ1XSA9IFwiS0VZX09cIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfUFwiXSA9IDQ2XSA9IFwiS0VZX1BcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfUVwiXSA9IDQ3XSA9IFwiS0VZX1FcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfUlwiXSA9IDQ4XSA9IFwiS0VZX1JcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfU1wiXSA9IDQ5XSA9IFwiS0VZX1NcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfVFwiXSA9IDUwXSA9IFwiS0VZX1RcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfVVwiXSA9IDUxXSA9IFwiS0VZX1VcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfVlwiXSA9IDUyXSA9IFwiS0VZX1ZcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfV1wiXSA9IDUzXSA9IFwiS0VZX1dcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfWFwiXSA9IDU0XSA9IFwiS0VZX1hcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfWVwiXSA9IDU1XSA9IFwiS0VZX1lcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJLRVlfWlwiXSA9IDU2XSA9IFwiS0VZX1pcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJNZXRhXCJdID0gNTddID0gXCJNZXRhXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiQ29udGV4dE1lbnVcIl0gPSA1OF0gPSBcIkNvbnRleHRNZW51XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjFcIl0gPSA1OV0gPSBcIkYxXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjJcIl0gPSA2MF0gPSBcIkYyXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjNcIl0gPSA2MV0gPSBcIkYzXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjRcIl0gPSA2Ml0gPSBcIkY0XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjVcIl0gPSA2M10gPSBcIkY1XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjZcIl0gPSA2NF0gPSBcIkY2XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjdcIl0gPSA2NV0gPSBcIkY3XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjhcIl0gPSA2Nl0gPSBcIkY4XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjlcIl0gPSA2N10gPSBcIkY5XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjEwXCJdID0gNjhdID0gXCJGMTBcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJGMTFcIl0gPSA2OV0gPSBcIkYxMVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxMlwiXSA9IDcwXSA9IFwiRjEyXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjEzXCJdID0gNzFdID0gXCJGMTNcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJGMTRcIl0gPSA3Ml0gPSBcIkYxNFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxNVwiXSA9IDczXSA9IFwiRjE1XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjE2XCJdID0gNzRdID0gXCJGMTZcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJGMTdcIl0gPSA3NV0gPSBcIkYxN1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxOFwiXSA9IDc2XSA9IFwiRjE4XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjE5XCJdID0gNzddID0gXCJGMTlcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOdW1Mb2NrXCJdID0gNzhdID0gXCJOdW1Mb2NrXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiU2Nyb2xsTG9ja1wiXSA9IDc5XSA9IFwiU2Nyb2xsTG9ja1wiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIG1pc2NlbGxhbmVvdXMgY2hhcmFjdGVyczsgaXQgY2FuIHZhcnkgYnkga2V5Ym9hcmQuXG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICc7Oicga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfU0VNSUNPTE9OXCJdID0gODBdID0gXCJVU19TRU1JQ09MT05cIjtcbiAgICAvKipcbiAgICAgKiBGb3IgYW55IGNvdW50cnkvcmVnaW9uLCB0aGUgJysnIGtleVxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnPSsnIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX0VRVUFMXCJdID0gODFdID0gXCJVU19FUVVBTFwiO1xuICAgIC8qKlxuICAgICAqIEZvciBhbnkgY291bnRyeS9yZWdpb24sIHRoZSAnLCcga2V5XG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICcsPCcga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfQ09NTUFcIl0gPSA4Ml0gPSBcIlVTX0NPTU1BXCI7XG4gICAgLyoqXG4gICAgICogRm9yIGFueSBjb3VudHJ5L3JlZ2lvbiwgdGhlICctJyBrZXlcbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJy1fJyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19NSU5VU1wiXSA9IDgzXSA9IFwiVVNfTUlOVVNcIjtcbiAgICAvKipcbiAgICAgKiBGb3IgYW55IGNvdW50cnkvcmVnaW9uLCB0aGUgJy4nIGtleVxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnLj4nIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX0RPVFwiXSA9IDg0XSA9IFwiVVNfRE9UXCI7XG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgbWlzY2VsbGFuZW91cyBjaGFyYWN0ZXJzOyBpdCBjYW4gdmFyeSBieSBrZXlib2FyZC5cbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJy8/JyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19TTEFTSFwiXSA9IDg1XSA9IFwiVVNfU0xBU0hcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBtaXNjZWxsYW5lb3VzIGNoYXJhY3RlcnM7IGl0IGNhbiB2YXJ5IGJ5IGtleWJvYXJkLlxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnYH4nIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX0JBQ0tUSUNLXCJdID0gODZdID0gXCJVU19CQUNLVElDS1wiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIG1pc2NlbGxhbmVvdXMgY2hhcmFjdGVyczsgaXQgY2FuIHZhcnkgYnkga2V5Ym9hcmQuXG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICdbeycga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfT1BFTl9TUVVBUkVfQlJBQ0tFVFwiXSA9IDg3XSA9IFwiVVNfT1BFTl9TUVVBUkVfQlJBQ0tFVFwiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIG1pc2NlbGxhbmVvdXMgY2hhcmFjdGVyczsgaXQgY2FuIHZhcnkgYnkga2V5Ym9hcmQuXG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICdcXHwnIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX0JBQ0tTTEFTSFwiXSA9IDg4XSA9IFwiVVNfQkFDS1NMQVNIXCI7XG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgbWlzY2VsbGFuZW91cyBjaGFyYWN0ZXJzOyBpdCBjYW4gdmFyeSBieSBrZXlib2FyZC5cbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJ119JyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19DTE9TRV9TUVVBUkVfQlJBQ0tFVFwiXSA9IDg5XSA9IFwiVVNfQ0xPU0VfU1FVQVJFX0JSQUNLRVRcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBtaXNjZWxsYW5lb3VzIGNoYXJhY3RlcnM7IGl0IGNhbiB2YXJ5IGJ5IGtleWJvYXJkLlxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnJ1wiJyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19RVU9URVwiXSA9IDkwXSA9IFwiVVNfUVVPVEVcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBtaXNjZWxsYW5lb3VzIGNoYXJhY3RlcnM7IGl0IGNhbiB2YXJ5IGJ5IGtleWJvYXJkLlxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk9FTV84XCJdID0gOTFdID0gXCJPRU1fOFwiO1xuICAgIC8qKlxuICAgICAqIEVpdGhlciB0aGUgYW5nbGUgYnJhY2tldCBrZXkgb3IgdGhlIGJhY2tzbGFzaCBrZXkgb24gdGhlIFJUIDEwMi1rZXkga2V5Ym9hcmQuXG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiT0VNXzEwMlwiXSA9IDkyXSA9IFwiT0VNXzEwMlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF8wXCJdID0gOTNdID0gXCJOVU1QQURfMFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF8xXCJdID0gOTRdID0gXCJOVU1QQURfMVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF8yXCJdID0gOTVdID0gXCJOVU1QQURfMlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF8zXCJdID0gOTZdID0gXCJOVU1QQURfM1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF80XCJdID0gOTddID0gXCJOVU1QQURfNFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF81XCJdID0gOThdID0gXCJOVU1QQURfNVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF82XCJdID0gOTldID0gXCJOVU1QQURfNlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF83XCJdID0gMTAwXSA9IFwiTlVNUEFEXzdcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfOFwiXSA9IDEwMV0gPSBcIk5VTVBBRF84XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTlVNUEFEXzlcIl0gPSAxMDJdID0gXCJOVU1QQURfOVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF9NVUxUSVBMWVwiXSA9IDEwM10gPSBcIk5VTVBBRF9NVUxUSVBMWVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF9BRERcIl0gPSAxMDRdID0gXCJOVU1QQURfQUREXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTlVNUEFEX1NFUEFSQVRPUlwiXSA9IDEwNV0gPSBcIk5VTVBBRF9TRVBBUkFUT1JcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfU1VCVFJBQ1RcIl0gPSAxMDZdID0gXCJOVU1QQURfU1VCVFJBQ1RcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfREVDSU1BTFwiXSA9IDEwN10gPSBcIk5VTVBBRF9ERUNJTUFMXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTlVNUEFEX0RJVklERVwiXSA9IDEwOF0gPSBcIk5VTVBBRF9ESVZJREVcIjtcbiAgICAvKipcbiAgICAgKiBDb3ZlciBhbGwga2V5IGNvZGVzIHdoZW4gSU1FIGlzIHByb2Nlc3NpbmcgaW5wdXQuXG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0lOX0NPTVBPU0lUSU9OXCJdID0gMTA5XSA9IFwiS0VZX0lOX0NPTVBPU0lUSU9OXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiQUJOVF9DMVwiXSA9IDExMF0gPSBcIkFCTlRfQzFcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJBQk5UX0MyXCJdID0gMTExXSA9IFwiQUJOVF9DMlwiO1xuICAgIC8qKlxuICAgICAqIFBsYWNlZCBsYXN0IHRvIGNvdmVyIHRoZSBsZW5ndGggb2YgdGhlIGVudW0uXG4gICAgICogUGxlYXNlIGRvIG5vdCBkZXBlbmQgb24gdGhpcyB2YWx1ZSFcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJNQVhfVkFMVUVcIl0gPSAxMTJdID0gXCJNQVhfVkFMVUVcIjtcbn0pKEtleUNvZGUgfHwgKEtleUNvZGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlyZWN0aW9uIG9mIGEgc2VsZWN0aW9uLlxuICovXG5leHBvcnQgdmFyIFNlbGVjdGlvbkRpcmVjdGlvbjtcbihmdW5jdGlvbiAoU2VsZWN0aW9uRGlyZWN0aW9uKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHNlbGVjdGlvbiBzdGFydHMgYWJvdmUgd2hlcmUgaXQgZW5kcy5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb25EaXJlY3Rpb25bU2VsZWN0aW9uRGlyZWN0aW9uW1wiTFRSXCJdID0gMF0gPSBcIkxUUlwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3Rpb24gc3RhcnRzIGJlbG93IHdoZXJlIGl0IGVuZHMuXG4gICAgICovXG4gICAgU2VsZWN0aW9uRGlyZWN0aW9uW1NlbGVjdGlvbkRpcmVjdGlvbltcIlJUTFwiXSA9IDFdID0gXCJSVExcIjtcbn0pKFNlbGVjdGlvbkRpcmVjdGlvbiB8fCAoU2VsZWN0aW9uRGlyZWN0aW9uID0ge30pKTtcbmV4cG9ydCB2YXIgU2Nyb2xsYmFyVmlzaWJpbGl0eTtcbihmdW5jdGlvbiAoU2Nyb2xsYmFyVmlzaWJpbGl0eSkge1xuICAgIFNjcm9sbGJhclZpc2liaWxpdHlbU2Nyb2xsYmFyVmlzaWJpbGl0eVtcIkF1dG9cIl0gPSAxXSA9IFwiQXV0b1wiO1xuICAgIFNjcm9sbGJhclZpc2liaWxpdHlbU2Nyb2xsYmFyVmlzaWJpbGl0eVtcIkhpZGRlblwiXSA9IDJdID0gXCJIaWRkZW5cIjtcbiAgICBTY3JvbGxiYXJWaXNpYmlsaXR5W1Njcm9sbGJhclZpc2liaWxpdHlbXCJWaXNpYmxlXCJdID0gM10gPSBcIlZpc2libGVcIjtcbn0pKFNjcm9sbGJhclZpc2liaWxpdHkgfHwgKFNjcm9sbGJhclZpc2liaWxpdHkgPSB7fSkpO1xuLyoqXG4gKiBWZXJ0aWNhbCBMYW5lIGluIHRoZSBvdmVydmlldyBydWxlciBvZiB0aGUgZWRpdG9yLlxuICovXG5leHBvcnQgdmFyIE92ZXJ2aWV3UnVsZXJMYW5lO1xuKGZ1bmN0aW9uIChPdmVydmlld1J1bGVyTGFuZSkge1xuICAgIE92ZXJ2aWV3UnVsZXJMYW5lW092ZXJ2aWV3UnVsZXJMYW5lW1wiTGVmdFwiXSA9IDFdID0gXCJMZWZ0XCI7XG4gICAgT3ZlcnZpZXdSdWxlckxhbmVbT3ZlcnZpZXdSdWxlckxhbmVbXCJDZW50ZXJcIl0gPSAyXSA9IFwiQ2VudGVyXCI7XG4gICAgT3ZlcnZpZXdSdWxlckxhbmVbT3ZlcnZpZXdSdWxlckxhbmVbXCJSaWdodFwiXSA9IDRdID0gXCJSaWdodFwiO1xuICAgIE92ZXJ2aWV3UnVsZXJMYW5lW092ZXJ2aWV3UnVsZXJMYW5lW1wiRnVsbFwiXSA9IDddID0gXCJGdWxsXCI7XG59KShPdmVydmlld1J1bGVyTGFuZSB8fCAoT3ZlcnZpZXdSdWxlckxhbmUgPSB7fSkpO1xuLyoqXG4gKiBFbmQgb2YgbGluZSBjaGFyYWN0ZXIgcHJlZmVyZW5jZS5cbiAqL1xuZXhwb3J0IHZhciBFbmRPZkxpbmVQcmVmZXJlbmNlO1xuKGZ1bmN0aW9uIChFbmRPZkxpbmVQcmVmZXJlbmNlKSB7XG4gICAgLyoqXG4gICAgICogVXNlIHRoZSBlbmQgb2YgbGluZSBjaGFyYWN0ZXIgaWRlbnRpZmllZCBpbiB0aGUgdGV4dCBidWZmZXIuXG4gICAgICovXG4gICAgRW5kT2ZMaW5lUHJlZmVyZW5jZVtFbmRPZkxpbmVQcmVmZXJlbmNlW1wiVGV4dERlZmluZWRcIl0gPSAwXSA9IFwiVGV4dERlZmluZWRcIjtcbiAgICAvKipcbiAgICAgKiBVc2UgbGluZSBmZWVkIChcXG4pIGFzIHRoZSBlbmQgb2YgbGluZSBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgRW5kT2ZMaW5lUHJlZmVyZW5jZVtFbmRPZkxpbmVQcmVmZXJlbmNlW1wiTEZcIl0gPSAxXSA9IFwiTEZcIjtcbiAgICAvKipcbiAgICAgKiBVc2UgY2FycmlhZ2UgcmV0dXJuIGFuZCBsaW5lIGZlZWQgKFxcclxcbikgYXMgdGhlIGVuZCBvZiBsaW5lIGNoYXJhY3Rlci5cbiAgICAgKi9cbiAgICBFbmRPZkxpbmVQcmVmZXJlbmNlW0VuZE9mTGluZVByZWZlcmVuY2VbXCJDUkxGXCJdID0gMl0gPSBcIkNSTEZcIjtcbn0pKEVuZE9mTGluZVByZWZlcmVuY2UgfHwgKEVuZE9mTGluZVByZWZlcmVuY2UgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBlbmQgb2YgbGluZSB0byB1c2Ugd2hlbiBpbnN0YW50aWF0aW5nIG1vZGVscy5cbiAqL1xuZXhwb3J0IHZhciBEZWZhdWx0RW5kT2ZMaW5lO1xuKGZ1bmN0aW9uIChEZWZhdWx0RW5kT2ZMaW5lKSB7XG4gICAgLyoqXG4gICAgICogVXNlIGxpbmUgZmVlZCAoXFxuKSBhcyB0aGUgZW5kIG9mIGxpbmUgY2hhcmFjdGVyLlxuICAgICAqL1xuICAgIERlZmF1bHRFbmRPZkxpbmVbRGVmYXVsdEVuZE9mTGluZVtcIkxGXCJdID0gMV0gPSBcIkxGXCI7XG4gICAgLyoqXG4gICAgICogVXNlIGNhcnJpYWdlIHJldHVybiBhbmQgbGluZSBmZWVkIChcXHJcXG4pIGFzIHRoZSBlbmQgb2YgbGluZSBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgRGVmYXVsdEVuZE9mTGluZVtEZWZhdWx0RW5kT2ZMaW5lW1wiQ1JMRlwiXSA9IDJdID0gXCJDUkxGXCI7XG59KShEZWZhdWx0RW5kT2ZMaW5lIHx8IChEZWZhdWx0RW5kT2ZMaW5lID0ge30pKTtcbi8qKlxuICogRW5kIG9mIGxpbmUgY2hhcmFjdGVyIHByZWZlcmVuY2UuXG4gKi9cbmV4cG9ydCB2YXIgRW5kT2ZMaW5lU2VxdWVuY2U7XG4oZnVuY3Rpb24gKEVuZE9mTGluZVNlcXVlbmNlKSB7XG4gICAgLyoqXG4gICAgICogVXNlIGxpbmUgZmVlZCAoXFxuKSBhcyB0aGUgZW5kIG9mIGxpbmUgY2hhcmFjdGVyLlxuICAgICAqL1xuICAgIEVuZE9mTGluZVNlcXVlbmNlW0VuZE9mTGluZVNlcXVlbmNlW1wiTEZcIl0gPSAwXSA9IFwiTEZcIjtcbiAgICAvKipcbiAgICAgKiBVc2UgY2FycmlhZ2UgcmV0dXJuIGFuZCBsaW5lIGZlZWQgKFxcclxcbikgYXMgdGhlIGVuZCBvZiBsaW5lIGNoYXJhY3Rlci5cbiAgICAgKi9cbiAgICBFbmRPZkxpbmVTZXF1ZW5jZVtFbmRPZkxpbmVTZXF1ZW5jZVtcIkNSTEZcIl0gPSAxXSA9IFwiQ1JMRlwiO1xufSkoRW5kT2ZMaW5lU2VxdWVuY2UgfHwgKEVuZE9mTGluZVNlcXVlbmNlID0ge30pKTtcbi8qKlxuICogRGVzY3JpYmVzIHRoZSBiZWhhdmlvciBvZiBkZWNvcmF0aW9ucyB3aGVuIHR5cGluZy9lZGl0aW5nIG5lYXIgdGhlaXIgZWRnZXMuXG4gKiBOb3RlOiBQbGVhc2UgZG8gbm90IGVkaXQgdGhlIHZhbHVlcywgYXMgdGhleSB2ZXJ5IGNhcmVmdWxseSBtYXRjaCBgRGVjb3JhdGlvblJhbmdlQmVoYXZpb3JgXG4gKi9cbmV4cG9ydCB2YXIgVHJhY2tlZFJhbmdlU3RpY2tpbmVzcztcbihmdW5jdGlvbiAoVHJhY2tlZFJhbmdlU3RpY2tpbmVzcykge1xuICAgIFRyYWNrZWRSYW5nZVN0aWNraW5lc3NbVHJhY2tlZFJhbmdlU3RpY2tpbmVzc1tcIkFsd2F5c0dyb3dzV2hlblR5cGluZ0F0RWRnZXNcIl0gPSAwXSA9IFwiQWx3YXlzR3Jvd3NXaGVuVHlwaW5nQXRFZGdlc1wiO1xuICAgIFRyYWNrZWRSYW5nZVN0aWNraW5lc3NbVHJhY2tlZFJhbmdlU3RpY2tpbmVzc1tcIk5ldmVyR3Jvd3NXaGVuVHlwaW5nQXRFZGdlc1wiXSA9IDFdID0gXCJOZXZlckdyb3dzV2hlblR5cGluZ0F0RWRnZXNcIjtcbiAgICBUcmFja2VkUmFuZ2VTdGlja2luZXNzW1RyYWNrZWRSYW5nZVN0aWNraW5lc3NbXCJHcm93c09ubHlXaGVuVHlwaW5nQmVmb3JlXCJdID0gMl0gPSBcIkdyb3dzT25seVdoZW5UeXBpbmdCZWZvcmVcIjtcbiAgICBUcmFja2VkUmFuZ2VTdGlja2luZXNzW1RyYWNrZWRSYW5nZVN0aWNraW5lc3NbXCJHcm93c09ubHlXaGVuVHlwaW5nQWZ0ZXJcIl0gPSAzXSA9IFwiR3Jvd3NPbmx5V2hlblR5cGluZ0FmdGVyXCI7XG59KShUcmFja2VkUmFuZ2VTdGlja2luZXNzIHx8IChUcmFja2VkUmFuZ2VTdGlja2luZXNzID0ge30pKTtcbmV4cG9ydCB2YXIgU2Nyb2xsVHlwZTtcbihmdW5jdGlvbiAoU2Nyb2xsVHlwZSkge1xuICAgIFNjcm9sbFR5cGVbU2Nyb2xsVHlwZVtcIlNtb290aFwiXSA9IDBdID0gXCJTbW9vdGhcIjtcbiAgICBTY3JvbGxUeXBlW1Njcm9sbFR5cGVbXCJJbW1lZGlhdGVcIl0gPSAxXSA9IFwiSW1tZWRpYXRlXCI7XG59KShTY3JvbGxUeXBlIHx8IChTY3JvbGxUeXBlID0ge30pKTtcbi8qKlxuICogRGVzY3JpYmVzIHRoZSByZWFzb24gdGhlIGN1cnNvciBoYXMgY2hhbmdlZCBpdHMgcG9zaXRpb24uXG4gKi9cbmV4cG9ydCB2YXIgQ3Vyc29yQ2hhbmdlUmVhc29uO1xuKGZ1bmN0aW9uIChDdXJzb3JDaGFuZ2VSZWFzb24pIHtcbiAgICAvKipcbiAgICAgKiBVbmtub3duIG9yIG5vdCBzZXQuXG4gICAgICovXG4gICAgQ3Vyc29yQ2hhbmdlUmVhc29uW0N1cnNvckNoYW5nZVJlYXNvbltcIk5vdFNldFwiXSA9IDBdID0gXCJOb3RTZXRcIjtcbiAgICAvKipcbiAgICAgKiBBIGBtb2RlbC5zZXRWYWx1ZSgpYCB3YXMgY2FsbGVkLlxuICAgICAqL1xuICAgIEN1cnNvckNoYW5nZVJlYXNvbltDdXJzb3JDaGFuZ2VSZWFzb25bXCJDb250ZW50Rmx1c2hcIl0gPSAxXSA9IFwiQ29udGVudEZsdXNoXCI7XG4gICAgLyoqXG4gICAgICogVGhlIGBtb2RlbGAgaGFzIGJlZW4gY2hhbmdlZCBvdXRzaWRlIG9mIHRoaXMgY3Vyc29yIGFuZCB0aGUgY3Vyc29yIHJlY292ZXJzIGl0cyBwb3NpdGlvbiBmcm9tIGFzc29jaWF0ZWQgbWFya2Vycy5cbiAgICAgKi9cbiAgICBDdXJzb3JDaGFuZ2VSZWFzb25bQ3Vyc29yQ2hhbmdlUmVhc29uW1wiUmVjb3ZlckZyb21NYXJrZXJzXCJdID0gMl0gPSBcIlJlY292ZXJGcm9tTWFya2Vyc1wiO1xuICAgIC8qKlxuICAgICAqIFRoZXJlIHdhcyBhbiBleHBsaWNpdCB1c2VyIGdlc3R1cmUuXG4gICAgICovXG4gICAgQ3Vyc29yQ2hhbmdlUmVhc29uW0N1cnNvckNoYW5nZVJlYXNvbltcIkV4cGxpY2l0XCJdID0gM10gPSBcIkV4cGxpY2l0XCI7XG4gICAgLyoqXG4gICAgICogVGhlcmUgd2FzIGEgUGFzdGUuXG4gICAgICovXG4gICAgQ3Vyc29yQ2hhbmdlUmVhc29uW0N1cnNvckNoYW5nZVJlYXNvbltcIlBhc3RlXCJdID0gNF0gPSBcIlBhc3RlXCI7XG4gICAgLyoqXG4gICAgICogVGhlcmUgd2FzIGFuIFVuZG8uXG4gICAgICovXG4gICAgQ3Vyc29yQ2hhbmdlUmVhc29uW0N1cnNvckNoYW5nZVJlYXNvbltcIlVuZG9cIl0gPSA1XSA9IFwiVW5kb1wiO1xuICAgIC8qKlxuICAgICAqIFRoZXJlIHdhcyBhIFJlZG8uXG4gICAgICovXG4gICAgQ3Vyc29yQ2hhbmdlUmVhc29uW0N1cnNvckNoYW5nZVJlYXNvbltcIlJlZG9cIl0gPSA2XSA9IFwiUmVkb1wiO1xufSkoQ3Vyc29yQ2hhbmdlUmVhc29uIHx8IChDdXJzb3JDaGFuZ2VSZWFzb24gPSB7fSkpO1xuZXhwb3J0IHZhciBSZW5kZXJNaW5pbWFwO1xuKGZ1bmN0aW9uIChSZW5kZXJNaW5pbWFwKSB7XG4gICAgUmVuZGVyTWluaW1hcFtSZW5kZXJNaW5pbWFwW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XG4gICAgUmVuZGVyTWluaW1hcFtSZW5kZXJNaW5pbWFwW1wiU21hbGxcIl0gPSAxXSA9IFwiU21hbGxcIjtcbiAgICBSZW5kZXJNaW5pbWFwW1JlbmRlck1pbmltYXBbXCJMYXJnZVwiXSA9IDJdID0gXCJMYXJnZVwiO1xuICAgIFJlbmRlck1pbmltYXBbUmVuZGVyTWluaW1hcFtcIlNtYWxsQmxvY2tzXCJdID0gM10gPSBcIlNtYWxsQmxvY2tzXCI7XG4gICAgUmVuZGVyTWluaW1hcFtSZW5kZXJNaW5pbWFwW1wiTGFyZ2VCbG9ja3NcIl0gPSA0XSA9IFwiTGFyZ2VCbG9ja3NcIjtcbn0pKFJlbmRlck1pbmltYXAgfHwgKFJlbmRlck1pbmltYXAgPSB7fSkpO1xuLyoqXG4gKiBEZXNjcmliZXMgaG93IHRvIGluZGVudCB3cmFwcGVkIGxpbmVzLlxuICovXG5leHBvcnQgdmFyIFdyYXBwaW5nSW5kZW50O1xuKGZ1bmN0aW9uIChXcmFwcGluZ0luZGVudCkge1xuICAgIC8qKlxuICAgICAqIE5vIGluZGVudGF0aW9uID0+IHdyYXBwZWQgbGluZXMgYmVnaW4gYXQgY29sdW1uIDEuXG4gICAgICovXG4gICAgV3JhcHBpbmdJbmRlbnRbV3JhcHBpbmdJbmRlbnRbXCJOb25lXCJdID0gMF0gPSBcIk5vbmVcIjtcbiAgICAvKipcbiAgICAgKiBTYW1lID0+IHdyYXBwZWQgbGluZXMgZ2V0IHRoZSBzYW1lIGluZGVudGF0aW9uIGFzIHRoZSBwYXJlbnQuXG4gICAgICovXG4gICAgV3JhcHBpbmdJbmRlbnRbV3JhcHBpbmdJbmRlbnRbXCJTYW1lXCJdID0gMV0gPSBcIlNhbWVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRlbnQgPT4gd3JhcHBlZCBsaW5lcyBnZXQgKzEgaW5kZW50YXRpb24gdG93YXJkIHRoZSBwYXJlbnQuXG4gICAgICovXG4gICAgV3JhcHBpbmdJbmRlbnRbV3JhcHBpbmdJbmRlbnRbXCJJbmRlbnRcIl0gPSAyXSA9IFwiSW5kZW50XCI7XG4gICAgLyoqXG4gICAgICogRGVlcEluZGVudCA9PiB3cmFwcGVkIGxpbmVzIGdldCArMiBpbmRlbnRhdGlvbiB0b3dhcmQgdGhlIHBhcmVudC5cbiAgICAgKi9cbiAgICBXcmFwcGluZ0luZGVudFtXcmFwcGluZ0luZGVudFtcIkRlZXBJbmRlbnRcIl0gPSAzXSA9IFwiRGVlcEluZGVudFwiO1xufSkoV3JhcHBpbmdJbmRlbnQgfHwgKFdyYXBwaW5nSW5kZW50ID0ge30pKTtcbi8qKlxuICogVGhlIGtpbmQgb2YgYW5pbWF0aW9uIGluIHdoaWNoIHRoZSBlZGl0b3IncyBjdXJzb3Igc2hvdWxkIGJlIHJlbmRlcmVkLlxuICovXG5leHBvcnQgdmFyIFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlO1xuKGZ1bmN0aW9uIChUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZSkge1xuICAgIC8qKlxuICAgICAqIEhpZGRlblxuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1RleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1wiSGlkZGVuXCJdID0gMF0gPSBcIkhpZGRlblwiO1xuICAgIC8qKlxuICAgICAqIEJsaW5raW5nXG4gICAgICovXG4gICAgVGV4dEVkaXRvckN1cnNvckJsaW5raW5nU3R5bGVbVGV4dEVkaXRvckN1cnNvckJsaW5raW5nU3R5bGVbXCJCbGlua1wiXSA9IDFdID0gXCJCbGlua1wiO1xuICAgIC8qKlxuICAgICAqIEJsaW5raW5nIHdpdGggc21vb3RoIGZhZGluZ1xuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1RleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1wiU21vb3RoXCJdID0gMl0gPSBcIlNtb290aFwiO1xuICAgIC8qKlxuICAgICAqIEJsaW5raW5nIHdpdGggcHJvbG9uZ2VkIGZpbGxlZCBzdGF0ZSBhbmQgc21vb3RoIGZhZGluZ1xuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1RleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1wiUGhhc2VcIl0gPSAzXSA9IFwiUGhhc2VcIjtcbiAgICAvKipcbiAgICAgKiBFeHBhbmQgY29sbGFwc2UgYW5pbWF0aW9uIG9uIHRoZSB5IGF4aXNcbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtcIkV4cGFuZFwiXSA9IDRdID0gXCJFeHBhbmRcIjtcbiAgICAvKipcbiAgICAgKiBOby1CbGlua2luZ1xuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1RleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1wiU29saWRcIl0gPSA1XSA9IFwiU29saWRcIjtcbn0pKFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlIHx8IChUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZSA9IHt9KSk7XG4vKipcbiAqIFRoZSBzdHlsZSBpbiB3aGljaCB0aGUgZWRpdG9yJ3MgY3Vyc29yIHNob3VsZCBiZSByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RWRpdG9yQ3Vyc29yU3R5bGU7XG4oZnVuY3Rpb24gKFRleHRFZGl0b3JDdXJzb3JTdHlsZSkge1xuICAgIC8qKlxuICAgICAqIEFzIGEgdmVydGljYWwgbGluZSAoc2l0dGluZyBiZXR3ZWVuIHR3byBjaGFyYWN0ZXJzKS5cbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbVGV4dEVkaXRvckN1cnNvclN0eWxlW1wiTGluZVwiXSA9IDFdID0gXCJMaW5lXCI7XG4gICAgLyoqXG4gICAgICogQXMgYSBibG9jayAoc2l0dGluZyBvbiB0b3Agb2YgYSBjaGFyYWN0ZXIpLlxuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbXCJCbG9ja1wiXSA9IDJdID0gXCJCbG9ja1wiO1xuICAgIC8qKlxuICAgICAqIEFzIGEgaG9yaXpvbnRhbCBsaW5lIChzaXR0aW5nIHVuZGVyIGEgY2hhcmFjdGVyKS5cbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbVGV4dEVkaXRvckN1cnNvclN0eWxlW1wiVW5kZXJsaW5lXCJdID0gM10gPSBcIlVuZGVybGluZVwiO1xuICAgIC8qKlxuICAgICAqIEFzIGEgdGhpbiB2ZXJ0aWNhbCBsaW5lIChzaXR0aW5nIGJldHdlZW4gdHdvIGNoYXJhY3RlcnMpLlxuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbXCJMaW5lVGhpblwiXSA9IDRdID0gXCJMaW5lVGhpblwiO1xuICAgIC8qKlxuICAgICAqIEFzIGFuIG91dGxpbmVkIGJsb2NrIChzaXR0aW5nIG9uIHRvcCBvZiBhIGNoYXJhY3RlcikuXG4gICAgICovXG4gICAgVGV4dEVkaXRvckN1cnNvclN0eWxlW1RleHRFZGl0b3JDdXJzb3JTdHlsZVtcIkJsb2NrT3V0bGluZVwiXSA9IDVdID0gXCJCbG9ja091dGxpbmVcIjtcbiAgICAvKipcbiAgICAgKiBBcyBhIHRoaW4gaG9yaXpvbnRhbCBsaW5lIChzaXR0aW5nIHVuZGVyIGEgY2hhcmFjdGVyKS5cbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbVGV4dEVkaXRvckN1cnNvclN0eWxlW1wiVW5kZXJsaW5lVGhpblwiXSA9IDZdID0gXCJVbmRlcmxpbmVUaGluXCI7XG59KShUZXh0RWRpdG9yQ3Vyc29yU3R5bGUgfHwgKFRleHRFZGl0b3JDdXJzb3JTdHlsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFJlbmRlckxpbmVOdW1iZXJzVHlwZTtcbihmdW5jdGlvbiAoUmVuZGVyTGluZU51bWJlcnNUeXBlKSB7XG4gICAgUmVuZGVyTGluZU51bWJlcnNUeXBlW1JlbmRlckxpbmVOdW1iZXJzVHlwZVtcIk9mZlwiXSA9IDBdID0gXCJPZmZcIjtcbiAgICBSZW5kZXJMaW5lTnVtYmVyc1R5cGVbUmVuZGVyTGluZU51bWJlcnNUeXBlW1wiT25cIl0gPSAxXSA9IFwiT25cIjtcbiAgICBSZW5kZXJMaW5lTnVtYmVyc1R5cGVbUmVuZGVyTGluZU51bWJlcnNUeXBlW1wiUmVsYXRpdmVcIl0gPSAyXSA9IFwiUmVsYXRpdmVcIjtcbiAgICBSZW5kZXJMaW5lTnVtYmVyc1R5cGVbUmVuZGVyTGluZU51bWJlcnNUeXBlW1wiSW50ZXJ2YWxcIl0gPSAzXSA9IFwiSW50ZXJ2YWxcIjtcbiAgICBSZW5kZXJMaW5lTnVtYmVyc1R5cGVbUmVuZGVyTGluZU51bWJlcnNUeXBlW1wiQ3VzdG9tXCJdID0gNF0gPSBcIkN1c3RvbVwiO1xufSkoUmVuZGVyTGluZU51bWJlcnNUeXBlIHx8IChSZW5kZXJMaW5lTnVtYmVyc1R5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHBvc2l0aW9uaW5nIHByZWZlcmVuY2UgZm9yIHJlbmRlcmluZyBjb250ZW50IHdpZGdldHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZTtcbihmdW5jdGlvbiAoQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZSkge1xuICAgIC8qKlxuICAgICAqIFBsYWNlIHRoZSBjb250ZW50IHdpZGdldCBleGFjdGx5IGF0IGEgcG9zaXRpb25cbiAgICAgKi9cbiAgICBDb250ZW50V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW0NvbnRlbnRXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbXCJFWEFDVFwiXSA9IDBdID0gXCJFWEFDVFwiO1xuICAgIC8qKlxuICAgICAqIFBsYWNlIHRoZSBjb250ZW50IHdpZGdldCBhYm92ZSBhIHBvc2l0aW9uXG4gICAgICovXG4gICAgQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtDb250ZW50V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW1wiQUJPVkVcIl0gPSAxXSA9IFwiQUJPVkVcIjtcbiAgICAvKipcbiAgICAgKiBQbGFjZSB0aGUgY29udGVudCB3aWRnZXQgYmVsb3cgYSBwb3NpdGlvblxuICAgICAqL1xuICAgIENvbnRlbnRXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtcIkJFTE9XXCJdID0gMl0gPSBcIkJFTE9XXCI7XG59KShDb250ZW50V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlIHx8IChDb250ZW50V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlID0ge30pKTtcbi8qKlxuICogQSBwb3NpdGlvbmluZyBwcmVmZXJlbmNlIGZvciByZW5kZXJpbmcgb3ZlcmxheSB3aWRnZXRzLlxuICovXG5leHBvcnQgdmFyIE92ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2U7XG4oZnVuY3Rpb24gKE92ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2UpIHtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB0aGUgb3ZlcmxheSB3aWRnZXQgaW4gdGhlIHRvcCByaWdodCBjb3JuZXJcbiAgICAgKi9cbiAgICBPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW092ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbXCJUT1BfUklHSFRfQ09STkVSXCJdID0gMF0gPSBcIlRPUF9SSUdIVF9DT1JORVJcIjtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB0aGUgb3ZlcmxheSB3aWRnZXQgaW4gdGhlIGJvdHRvbSByaWdodCBjb3JuZXJcbiAgICAgKi9cbiAgICBPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW092ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbXCJCT1RUT01fUklHSFRfQ09STkVSXCJdID0gMV0gPSBcIkJPVFRPTV9SSUdIVF9DT1JORVJcIjtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB0aGUgb3ZlcmxheSB3aWRnZXQgaW4gdGhlIHRvcCBjZW50ZXJcbiAgICAgKi9cbiAgICBPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW092ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbXCJUT1BfQ0VOVEVSXCJdID0gMl0gPSBcIlRPUF9DRU5URVJcIjtcbn0pKE92ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2UgfHwgKE92ZXJsYXlXaWRnZXRQb3NpdGlvblByZWZlcmVuY2UgPSB7fSkpO1xuLyoqXG4gKiBUeXBlIG9mIGhpdCBlbGVtZW50IHdpdGggdGhlIG1vdXNlIGluIHRoZSBlZGl0b3IuXG4gKi9cbmV4cG9ydCB2YXIgTW91c2VUYXJnZXRUeXBlO1xuKGZ1bmN0aW9uIChNb3VzZVRhcmdldFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgYW4gdW5rbm93biBlbGVtZW50LlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJVTktOT1dOXCJdID0gMF0gPSBcIlVOS05PV05cIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGhlIHRleHRhcmVhIHVzZWQgZm9yIGlucHV0LlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJURVhUQVJFQVwiXSA9IDFdID0gXCJURVhUQVJFQVwiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiB0aGUgZ2x5cGggbWFyZ2luXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIkdVVFRFUl9HTFlQSF9NQVJHSU5cIl0gPSAyXSA9IFwiR1VUVEVSX0dMWVBIX01BUkdJTlwiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiB0aGUgbGluZSBudW1iZXJzXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIkdVVFRFUl9MSU5FX05VTUJFUlNcIl0gPSAzXSA9IFwiR1VUVEVSX0xJTkVfTlVNQkVSU1wiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiB0aGUgbGluZSBkZWNvcmF0aW9uc1xuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJHVVRURVJfTElORV9ERUNPUkFUSU9OU1wiXSA9IDRdID0gXCJHVVRURVJfTElORV9ERUNPUkFUSU9OU1wiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiB0aGUgd2hpdGVzcGFjZSBsZWZ0IGluIHRoZSBndXR0ZXIgYnkgYSB2aWV3IHpvbmUuXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIkdVVFRFUl9WSUVXX1pPTkVcIl0gPSA1XSA9IFwiR1VUVEVSX1ZJRVdfWk9ORVwiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiB0ZXh0IGluIHRoZSBjb250ZW50LlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJDT05URU5UX1RFWFRcIl0gPSA2XSA9IFwiQ09OVEVOVF9URVhUXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIGVtcHR5IHNwYWNlIGluIHRoZSBjb250ZW50IChlLmcuIGFmdGVyIGxpbmUgdGV4dCBvciBiZWxvdyBsYXN0IGxpbmUpXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIkNPTlRFTlRfRU1QVFlcIl0gPSA3XSA9IFwiQ09OVEVOVF9FTVBUWVwiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiBhIHZpZXcgem9uZSBpbiB0aGUgY29udGVudC5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiQ09OVEVOVF9WSUVXX1pPTkVcIl0gPSA4XSA9IFwiQ09OVEVOVF9WSUVXX1pPTkVcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgYSBjb250ZW50IHdpZGdldC5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiQ09OVEVOVF9XSURHRVRcIl0gPSA5XSA9IFwiQ09OVEVOVF9XSURHRVRcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGhlIGRlY29yYXRpb25zIG92ZXJ2aWV3IHJ1bGVyLlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJPVkVSVklFV19SVUxFUlwiXSA9IDEwXSA9IFwiT1ZFUlZJRVdfUlVMRVJcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgYSBzY3JvbGxiYXIuXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIlNDUk9MTEJBUlwiXSA9IDExXSA9IFwiU0NST0xMQkFSXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIGFuIG92ZXJsYXkgd2lkZ2V0LlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJPVkVSTEFZX1dJREdFVFwiXSA9IDEyXSA9IFwiT1ZFUkxBWV9XSURHRVRcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvdXRzaWRlIG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIk9VVFNJREVfRURJVE9SXCJdID0gMTNdID0gXCJPVVRTSURFX0VESVRPUlwiO1xufSkoTW91c2VUYXJnZXRUeXBlIHx8IChNb3VzZVRhcmdldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBEZXNjcmliZXMgd2hhdCB0byBkbyB3aXRoIHRoZSBpbmRlbnRhdGlvbiB3aGVuIHByZXNzaW5nIEVudGVyLlxuICovXG5leHBvcnQgdmFyIEluZGVudEFjdGlvbjtcbihmdW5jdGlvbiAoSW5kZW50QWN0aW9uKSB7XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IG5ldyBsaW5lIGFuZCBjb3B5IHRoZSBwcmV2aW91cyBsaW5lJ3MgaW5kZW50YXRpb24uXG4gICAgICovXG4gICAgSW5kZW50QWN0aW9uW0luZGVudEFjdGlvbltcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xuICAgIC8qKlxuICAgICAqIEluc2VydCBuZXcgbGluZSBhbmQgaW5kZW50IG9uY2UgKHJlbGF0aXZlIHRvIHRoZSBwcmV2aW91cyBsaW5lJ3MgaW5kZW50YXRpb24pLlxuICAgICAqL1xuICAgIEluZGVudEFjdGlvbltJbmRlbnRBY3Rpb25bXCJJbmRlbnRcIl0gPSAxXSA9IFwiSW5kZW50XCI7XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IHR3byBuZXcgbGluZXM6XG4gICAgICogIC0gdGhlIGZpcnN0IG9uZSBpbmRlbnRlZCB3aGljaCB3aWxsIGhvbGQgdGhlIGN1cnNvclxuICAgICAqICAtIHRoZSBzZWNvbmQgb25lIGF0IHRoZSBzYW1lIGluZGVudGF0aW9uIGxldmVsXG4gICAgICovXG4gICAgSW5kZW50QWN0aW9uW0luZGVudEFjdGlvbltcIkluZGVudE91dGRlbnRcIl0gPSAyXSA9IFwiSW5kZW50T3V0ZGVudFwiO1xuICAgIC8qKlxuICAgICAqIEluc2VydCBuZXcgbGluZSBhbmQgb3V0ZGVudCBvbmNlIChyZWxhdGl2ZSB0byB0aGUgcHJldmlvdXMgbGluZSdzIGluZGVudGF0aW9uKS5cbiAgICAgKi9cbiAgICBJbmRlbnRBY3Rpb25bSW5kZW50QWN0aW9uW1wiT3V0ZGVudFwiXSA9IDNdID0gXCJPdXRkZW50XCI7XG59KShJbmRlbnRBY3Rpb24gfHwgKEluZGVudEFjdGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtS2luZDtcbihmdW5jdGlvbiAoQ29tcGxldGlvbkl0ZW1LaW5kKSB7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIk1ldGhvZFwiXSA9IDBdID0gXCJNZXRob2RcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRnVuY3Rpb25cIl0gPSAxXSA9IFwiRnVuY3Rpb25cIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiQ29uc3RydWN0b3JcIl0gPSAyXSA9IFwiQ29uc3RydWN0b3JcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRmllbGRcIl0gPSAzXSA9IFwiRmllbGRcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiVmFyaWFibGVcIl0gPSA0XSA9IFwiVmFyaWFibGVcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiQ2xhc3NcIl0gPSA1XSA9IFwiQ2xhc3NcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiU3RydWN0XCJdID0gNl0gPSBcIlN0cnVjdFwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJJbnRlcmZhY2VcIl0gPSA3XSA9IFwiSW50ZXJmYWNlXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIk1vZHVsZVwiXSA9IDhdID0gXCJNb2R1bGVcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiUHJvcGVydHlcIl0gPSA5XSA9IFwiUHJvcGVydHlcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRXZlbnRcIl0gPSAxMF0gPSBcIkV2ZW50XCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIk9wZXJhdG9yXCJdID0gMTFdID0gXCJPcGVyYXRvclwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJVbml0XCJdID0gMTJdID0gXCJVbml0XCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlZhbHVlXCJdID0gMTNdID0gXCJWYWx1ZVwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJDb25zdGFudFwiXSA9IDE0XSA9IFwiQ29uc3RhbnRcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRW51bVwiXSA9IDE1XSA9IFwiRW51bVwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJFbnVtTWVtYmVyXCJdID0gMTZdID0gXCJFbnVtTWVtYmVyXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIktleXdvcmRcIl0gPSAxN10gPSBcIktleXdvcmRcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiVGV4dFwiXSA9IDE4XSA9IFwiVGV4dFwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJDb2xvclwiXSA9IDE5XSA9IFwiQ29sb3JcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRmlsZVwiXSA9IDIwXSA9IFwiRmlsZVwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJSZWZlcmVuY2VcIl0gPSAyMV0gPSBcIlJlZmVyZW5jZVwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJDdXN0b21jb2xvclwiXSA9IDIyXSA9IFwiQ3VzdG9tY29sb3JcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRm9sZGVyXCJdID0gMjNdID0gXCJGb2xkZXJcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiVHlwZVBhcmFtZXRlclwiXSA9IDI0XSA9IFwiVHlwZVBhcmFtZXRlclwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJTbmlwcGV0XCJdID0gMjVdID0gXCJTbmlwcGV0XCI7XG59KShDb21wbGV0aW9uSXRlbUtpbmQgfHwgKENvbXBsZXRpb25JdGVtS2luZCA9IHt9KSk7XG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGU7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGUpIHtcbiAgICAvKipcbiAgICAgKiBBZGp1c3Qgd2hpdGVzcGFjZS9pbmRlbnRhdGlvbiBvZiBtdWx0aWxpbmUgaW5zZXJ0IHRleHRzIHRvXG4gICAgICogbWF0Y2ggdGhlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvbi5cbiAgICAgKi9cbiAgICBDb21wbGV0aW9uSXRlbUluc2VydFRleHRSdWxlW0NvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGVbXCJLZWVwV2hpdGVzcGFjZVwiXSA9IDFdID0gXCJLZWVwV2hpdGVzcGFjZVwiO1xuICAgIC8qKlxuICAgICAqIGBpbnNlcnRUZXh0YCBpcyBhIHNuaXBwZXQuXG4gICAgICovXG4gICAgQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZVtDb21wbGV0aW9uSXRlbUluc2VydFRleHRSdWxlW1wiSW5zZXJ0QXNTbmlwcGV0XCJdID0gNF0gPSBcIkluc2VydEFzU25pcHBldFwiO1xufSkoQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZSB8fCAoQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZSA9IHt9KSk7XG4vKipcbiAqIEhvdyBhIHN1Z2dlc3QgcHJvdmlkZXIgd2FzIHRyaWdnZXJlZC5cbiAqL1xuZXhwb3J0IHZhciBDb21wbGV0aW9uVHJpZ2dlcktpbmQ7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25UcmlnZ2VyS2luZCkge1xuICAgIENvbXBsZXRpb25UcmlnZ2VyS2luZFtDb21wbGV0aW9uVHJpZ2dlcktpbmRbXCJJbnZva2VcIl0gPSAwXSA9IFwiSW52b2tlXCI7XG4gICAgQ29tcGxldGlvblRyaWdnZXJLaW5kW0NvbXBsZXRpb25UcmlnZ2VyS2luZFtcIlRyaWdnZXJDaGFyYWN0ZXJcIl0gPSAxXSA9IFwiVHJpZ2dlckNoYXJhY3RlclwiO1xuICAgIENvbXBsZXRpb25UcmlnZ2VyS2luZFtDb21wbGV0aW9uVHJpZ2dlcktpbmRbXCJUcmlnZ2VyRm9ySW5jb21wbGV0ZUNvbXBsZXRpb25zXCJdID0gMl0gPSBcIlRyaWdnZXJGb3JJbmNvbXBsZXRlQ29tcGxldGlvbnNcIjtcbn0pKENvbXBsZXRpb25UcmlnZ2VyS2luZCB8fCAoQ29tcGxldGlvblRyaWdnZXJLaW5kID0ge30pKTtcbmV4cG9ydCB2YXIgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kO1xuKGZ1bmN0aW9uIChTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQpIHtcbiAgICBTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmRbU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kW1wiSW52b2tlXCJdID0gMV0gPSBcIkludm9rZVwiO1xuICAgIFNpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZFtTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmRbXCJUcmlnZ2VyQ2hhcmFjdGVyXCJdID0gMl0gPSBcIlRyaWdnZXJDaGFyYWN0ZXJcIjtcbiAgICBTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmRbU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kW1wiQ29udGVudENoYW5nZVwiXSA9IDNdID0gXCJDb250ZW50Q2hhbmdlXCI7XG59KShTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQgfHwgKFNpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZCA9IHt9KSk7XG4vKipcbiAqIEEgZG9jdW1lbnQgaGlnaGxpZ2h0IGtpbmQuXG4gKi9cbmV4cG9ydCB2YXIgRG9jdW1lbnRIaWdobGlnaHRLaW5kO1xuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBBIHRleHR1YWwgb2NjdXJyZW5jZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmRbRG9jdW1lbnRIaWdobGlnaHRLaW5kW1wiVGV4dFwiXSA9IDBdID0gXCJUZXh0XCI7XG4gICAgLyoqXG4gICAgICogUmVhZC1hY2Nlc3Mgb2YgYSBzeW1ib2wsIGxpa2UgcmVhZGluZyBhIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZFtEb2N1bWVudEhpZ2hsaWdodEtpbmRbXCJSZWFkXCJdID0gMV0gPSBcIlJlYWRcIjtcbiAgICAvKipcbiAgICAgKiBXcml0ZS1hY2Nlc3Mgb2YgYSBzeW1ib2wsIGxpa2Ugd3JpdGluZyB0byBhIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZFtEb2N1bWVudEhpZ2hsaWdodEtpbmRbXCJXcml0ZVwiXSA9IDJdID0gXCJXcml0ZVwiO1xufSkoRG9jdW1lbnRIaWdobGlnaHRLaW5kIHx8IChEb2N1bWVudEhpZ2hsaWdodEtpbmQgPSB7fSkpO1xuLyoqXG4gKiBBIHN5bWJvbCBraW5kLlxuICovXG5leHBvcnQgdmFyIFN5bWJvbEtpbmQ7XG4oZnVuY3Rpb24gKFN5bWJvbEtpbmQpIHtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJGaWxlXCJdID0gMF0gPSBcIkZpbGVcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJNb2R1bGVcIl0gPSAxXSA9IFwiTW9kdWxlXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTmFtZXNwYWNlXCJdID0gMl0gPSBcIk5hbWVzcGFjZVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlBhY2thZ2VcIl0gPSAzXSA9IFwiUGFja2FnZVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkNsYXNzXCJdID0gNF0gPSBcIkNsYXNzXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTWV0aG9kXCJdID0gNV0gPSBcIk1ldGhvZFwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlByb3BlcnR5XCJdID0gNl0gPSBcIlByb3BlcnR5XCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiRmllbGRcIl0gPSA3XSA9IFwiRmllbGRcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJDb25zdHJ1Y3RvclwiXSA9IDhdID0gXCJDb25zdHJ1Y3RvclwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkVudW1cIl0gPSA5XSA9IFwiRW51bVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkludGVyZmFjZVwiXSA9IDEwXSA9IFwiSW50ZXJmYWNlXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiRnVuY3Rpb25cIl0gPSAxMV0gPSBcIkZ1bmN0aW9uXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiVmFyaWFibGVcIl0gPSAxMl0gPSBcIlZhcmlhYmxlXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiQ29uc3RhbnRcIl0gPSAxM10gPSBcIkNvbnN0YW50XCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiU3RyaW5nXCJdID0gMTRdID0gXCJTdHJpbmdcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJOdW1iZXJcIl0gPSAxNV0gPSBcIk51bWJlclwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkJvb2xlYW5cIl0gPSAxNl0gPSBcIkJvb2xlYW5cIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJBcnJheVwiXSA9IDE3XSA9IFwiQXJyYXlcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJPYmplY3RcIl0gPSAxOF0gPSBcIk9iamVjdFwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIktleVwiXSA9IDE5XSA9IFwiS2V5XCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTnVsbFwiXSA9IDIwXSA9IFwiTnVsbFwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkVudW1NZW1iZXJcIl0gPSAyMV0gPSBcIkVudW1NZW1iZXJcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJTdHJ1Y3RcIl0gPSAyMl0gPSBcIlN0cnVjdFwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkV2ZW50XCJdID0gMjNdID0gXCJFdmVudFwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIk9wZXJhdG9yXCJdID0gMjRdID0gXCJPcGVyYXRvclwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlR5cGVQYXJhbWV0ZXJcIl0gPSAyNV0gPSBcIlR5cGVQYXJhbWV0ZXJcIjtcbn0pKFN5bWJvbEtpbmQgfHwgKFN5bWJvbEtpbmQgPSB7fSkpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyB0b1VpbnQzMiB9IGZyb20gJy4uL2NvcmUvdWludC5qcyc7XG52YXIgUHJlZml4U3VtSW5kZXhPZlJlc3VsdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmVmaXhTdW1JbmRleE9mUmVzdWx0KGluZGV4LCByZW1haW5kZXIpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnJlbWFpbmRlciA9IHJlbWFpbmRlcjtcbiAgICB9XG4gICAgcmV0dXJuIFByZWZpeFN1bUluZGV4T2ZSZXN1bHQ7XG59KCkpO1xuZXhwb3J0IHsgUHJlZml4U3VtSW5kZXhPZlJlc3VsdCB9O1xudmFyIFByZWZpeFN1bUNvbXB1dGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByZWZpeFN1bUNvbXB1dGVyKHZhbHVlcykge1xuICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgdGhpcy5wcmVmaXhTdW0gPSBuZXcgVWludDMyQXJyYXkodmFsdWVzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleCA9IG5ldyBJbnQzMkFycmF5KDEpO1xuICAgICAgICB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gPSAtMTtcbiAgICB9XG4gICAgUHJlZml4U3VtQ29tcHV0ZXIucHJvdG90eXBlLmdldENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXIucHJvdG90eXBlLmluc2VydFZhbHVlcyA9IGZ1bmN0aW9uIChpbnNlcnRJbmRleCwgaW5zZXJ0VmFsdWVzKSB7XG4gICAgICAgIGluc2VydEluZGV4ID0gdG9VaW50MzIoaW5zZXJ0SW5kZXgpO1xuICAgICAgICB2YXIgb2xkVmFsdWVzID0gdGhpcy52YWx1ZXM7XG4gICAgICAgIHZhciBvbGRQcmVmaXhTdW0gPSB0aGlzLnByZWZpeFN1bTtcbiAgICAgICAgdmFyIGluc2VydFZhbHVlc0xlbiA9IGluc2VydFZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGlmIChpbnNlcnRWYWx1ZXNMZW4gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ldyBVaW50MzJBcnJheShvbGRWYWx1ZXMubGVuZ3RoICsgaW5zZXJ0VmFsdWVzTGVuKTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KG9sZFZhbHVlcy5zdWJhcnJheSgwLCBpbnNlcnRJbmRleCksIDApO1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQob2xkVmFsdWVzLnN1YmFycmF5KGluc2VydEluZGV4KSwgaW5zZXJ0SW5kZXggKyBpbnNlcnRWYWx1ZXNMZW4pO1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQoaW5zZXJ0VmFsdWVzLCBpbnNlcnRJbmRleCk7XG4gICAgICAgIGlmIChpbnNlcnRJbmRleCAtIDEgPCB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSA9IGluc2VydEluZGV4IC0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZWZpeFN1bSA9IG5ldyBVaW50MzJBcnJheSh0aGlzLnZhbHVlcy5sZW5ndGgpO1xuICAgICAgICBpZiAodGhpcy5wcmVmaXhTdW1WYWxpZEluZGV4WzBdID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4U3VtLnNldChvbGRQcmVmaXhTdW0uc3ViYXJyYXkoMCwgdGhpcy5wcmVmaXhTdW1WYWxpZEluZGV4WzBdICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXIucHJvdG90eXBlLmNoYW5nZVZhbHVlID0gZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICBpbmRleCA9IHRvVWludDMyKGluZGV4KTtcbiAgICAgICAgdmFsdWUgPSB0b1VpbnQzMih2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlc1tpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIGlmIChpbmRleCAtIDEgPCB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSA9IGluZGV4IC0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5yZW1vdmVWYWx1ZXMgPSBmdW5jdGlvbiAoc3RhcnRJbmRleCwgY250KSB7XG4gICAgICAgIHN0YXJ0SW5kZXggPSB0b1VpbnQzMihzdGFydEluZGV4KTtcbiAgICAgICAgY250ID0gdG9VaW50MzIoY250KTtcbiAgICAgICAgdmFyIG9sZFZhbHVlcyA9IHRoaXMudmFsdWVzO1xuICAgICAgICB2YXIgb2xkUHJlZml4U3VtID0gdGhpcy5wcmVmaXhTdW07XG4gICAgICAgIGlmIChzdGFydEluZGV4ID49IG9sZFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF4Q250ID0gb2xkVmFsdWVzLmxlbmd0aCAtIHN0YXJ0SW5kZXg7XG4gICAgICAgIGlmIChjbnQgPj0gbWF4Q250KSB7XG4gICAgICAgICAgICBjbnQgPSBtYXhDbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWVzID0gbmV3IFVpbnQzMkFycmF5KG9sZFZhbHVlcy5sZW5ndGggLSBjbnQpO1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQob2xkVmFsdWVzLnN1YmFycmF5KDAsIHN0YXJ0SW5kZXgpLCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KG9sZFZhbHVlcy5zdWJhcnJheShzdGFydEluZGV4ICsgY250KSwgc3RhcnRJbmRleCk7XG4gICAgICAgIHRoaXMucHJlZml4U3VtID0gbmV3IFVpbnQzMkFycmF5KHRoaXMudmFsdWVzLmxlbmd0aCk7XG4gICAgICAgIGlmIChzdGFydEluZGV4IC0gMSA8IHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXhTdW1WYWxpZEluZGV4WzBdID0gc3RhcnRJbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeFN1bS5zZXQob2xkUHJlZml4U3VtLnN1YmFycmF5KDAsIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5nZXRUb3RhbFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWNjdW11bGF0ZWRWYWx1ZSh0aGlzLnZhbHVlcy5sZW5ndGggLSAxKTtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5nZXRBY2N1bXVsYXRlZFZhbHVlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gdG9VaW50MzIoaW5kZXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWNjdW11bGF0ZWRWYWx1ZShpbmRleCk7XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlci5wcm90b3R5cGUuX2dldEFjY3VtdWxhdGVkVmFsdWUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDw9IHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4U3VtW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRJbmRleCA9IHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSArIDE7XG4gICAgICAgIGlmIChzdGFydEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeFN1bVswXSA9IHRoaXMudmFsdWVzWzBdO1xuICAgICAgICAgICAgc3RhcnRJbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy52YWx1ZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8PSBpbmRleDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeFN1bVtpXSA9IHRoaXMucHJlZml4U3VtW2kgLSAxXSArIHRoaXMudmFsdWVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSA9IE1hdGgubWF4KHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXhTdW1baW5kZXhdO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXIucHJvdG90eXBlLmdldEluZGV4T2YgPSBmdW5jdGlvbiAoYWNjdW11bGF0ZWRWYWx1ZSkge1xuICAgICAgICBhY2N1bXVsYXRlZFZhbHVlID0gTWF0aC5mbG9vcihhY2N1bXVsYXRlZFZhbHVlKTsgLy9AcGVyZlxuICAgICAgICAvLyBDb21wdXRlIGFsbCBzdW1zICh0byBnZXQgYSBmdWxseSB2YWxpZCBwcmVmaXhTdW0pXG4gICAgICAgIHRoaXMuZ2V0VG90YWxWYWx1ZSgpO1xuICAgICAgICB2YXIgbG93ID0gMDtcbiAgICAgICAgdmFyIGhpZ2ggPSB0aGlzLnZhbHVlcy5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbWlkID0gMDtcbiAgICAgICAgdmFyIG1pZFN0b3AgPSAwO1xuICAgICAgICB2YXIgbWlkU3RhcnQgPSAwO1xuICAgICAgICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICAgICAgICAgIG1pZCA9IGxvdyArICgoaGlnaCAtIGxvdykgLyAyKSB8IDA7XG4gICAgICAgICAgICBtaWRTdG9wID0gdGhpcy5wcmVmaXhTdW1bbWlkXTtcbiAgICAgICAgICAgIG1pZFN0YXJ0ID0gbWlkU3RvcCAtIHRoaXMudmFsdWVzW21pZF07XG4gICAgICAgICAgICBpZiAoYWNjdW11bGF0ZWRWYWx1ZSA8IG1pZFN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhY2N1bXVsYXRlZFZhbHVlID49IG1pZFN0b3ApIHtcbiAgICAgICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcmVmaXhTdW1JbmRleE9mUmVzdWx0KG1pZCwgYWNjdW11bGF0ZWRWYWx1ZSAtIG1pZFN0YXJ0KTtcbiAgICB9O1xuICAgIHJldHVybiBQcmVmaXhTdW1Db21wdXRlcjtcbn0oKSk7XG5leHBvcnQgeyBQcmVmaXhTdW1Db21wdXRlciB9O1xudmFyIFByZWZpeFN1bUNvbXB1dGVyV2l0aENhY2hlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByZWZpeFN1bUNvbXB1dGVyV2l0aENhY2hlKHZhbHVlcykge1xuICAgICAgICB0aGlzLl9jYWNoZUFjY3VtdWxhdGVkVmFsdWVTdGFydCA9IDA7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYWN0dWFsID0gbmV3IFByZWZpeFN1bUNvbXB1dGVyKHZhbHVlcyk7XG4gICAgICAgIHRoaXMuX2J1c3RDYWNoZSgpO1xuICAgIH1cbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUuX2J1c3RDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVBY2N1bXVsYXRlZFZhbHVlU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLl9jYWNoZSA9IG51bGw7XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUuaW5zZXJ0VmFsdWVzID0gZnVuY3Rpb24gKGluc2VydEluZGV4LCBpbnNlcnRWYWx1ZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdHVhbC5pbnNlcnRWYWx1ZXMoaW5zZXJ0SW5kZXgsIGluc2VydFZhbHVlcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1c3RDYWNoZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUuY2hhbmdlVmFsdWUgPSBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3R1YWwuY2hhbmdlVmFsdWUoaW5kZXgsIHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fYnVzdENhY2hlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyV2l0aENhY2hlLnByb3RvdHlwZS5yZW1vdmVWYWx1ZXMgPSBmdW5jdGlvbiAoc3RhcnRJbmRleCwgY250KSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3R1YWwucmVtb3ZlVmFsdWVzKHN0YXJ0SW5kZXgsIGNudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1c3RDYWNoZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUuZ2V0VG90YWxWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbC5nZXRUb3RhbFZhbHVlKCk7XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUuZ2V0QWNjdW11bGF0ZWRWYWx1ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsLmdldEFjY3VtdWxhdGVkVmFsdWUoaW5kZXgpO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUucHJvdG90eXBlLmdldEluZGV4T2YgPSBmdW5jdGlvbiAoYWNjdW11bGF0ZWRWYWx1ZSkge1xuICAgICAgICBhY2N1bXVsYXRlZFZhbHVlID0gTWF0aC5mbG9vcihhY2N1bXVsYXRlZFZhbHVlKTsgLy9AcGVyZlxuICAgICAgICBpZiAodGhpcy5fY2FjaGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZUluZGV4ID0gYWNjdW11bGF0ZWRWYWx1ZSAtIHRoaXMuX2NhY2hlQWNjdW11bGF0ZWRWYWx1ZVN0YXJ0O1xuICAgICAgICAgICAgaWYgKGNhY2hlSW5kZXggPj0gMCAmJiBjYWNoZUluZGV4IDwgdGhpcy5fY2FjaGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgaGl0IVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZVtjYWNoZUluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDYWNoZSBtaXNzIVxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsLmdldEluZGV4T2YoYWNjdW11bGF0ZWRWYWx1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHaXZlcyBhIGhpbnQgdGhhdCBhIGxvdCBvZiByZXF1ZXN0cyBhcmUgYWJvdXQgdG8gY29tZSBpbiBmb3IgdGhlc2UgYWNjdW11bGF0ZWQgdmFsdWVzLlxuICAgICAqL1xuICAgIFByZWZpeFN1bUNvbXB1dGVyV2l0aENhY2hlLnByb3RvdHlwZS53YXJtVXBDYWNoZSA9IGZ1bmN0aW9uIChhY2N1bXVsYXRlZFZhbHVlU3RhcnQsIGFjY3VtdWxhdGVkVmFsdWVFbmQpIHtcbiAgICAgICAgdmFyIG5ld0NhY2hlID0gW107XG4gICAgICAgIGZvciAodmFyIGFjY3VtdWxhdGVkVmFsdWUgPSBhY2N1bXVsYXRlZFZhbHVlU3RhcnQ7IGFjY3VtdWxhdGVkVmFsdWUgPD0gYWNjdW11bGF0ZWRWYWx1ZUVuZDsgYWNjdW11bGF0ZWRWYWx1ZSsrKSB7XG4gICAgICAgICAgICBuZXdDYWNoZVthY2N1bXVsYXRlZFZhbHVlIC0gYWNjdW11bGF0ZWRWYWx1ZVN0YXJ0XSA9IHRoaXMuZ2V0SW5kZXhPZihhY2N1bXVsYXRlZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYWNoZSA9IG5ld0NhY2hlO1xuICAgICAgICB0aGlzLl9jYWNoZUFjY3VtdWxhdGVkVmFsdWVTdGFydCA9IGFjY3VtdWxhdGVkVmFsdWVTdGFydDtcbiAgICB9O1xuICAgIHJldHVybiBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZTtcbn0oKSk7XG5leHBvcnQgeyBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZSB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBTaW1wbGVXb3JrZXJTZXJ2ZXIgfSBmcm9tICcuLi9iYXNlL2NvbW1vbi93b3JrZXIvc2ltcGxlV29ya2VyLmpzJztcbmltcG9ydCB7IEVkaXRvclNpbXBsZVdvcmtlckltcGwgfSBmcm9tICcuL2NvbW1vbi9zZXJ2aWNlcy9lZGl0b3JTaW1wbGVXb3JrZXIuanMnO1xudmFyIGluaXRpYWxpemVkID0gZmFsc2U7XG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShmb3JlaWduTW9kdWxlKSB7XG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHZhciBlZGl0b3JXb3JrZXIgPSBuZXcgRWRpdG9yU2ltcGxlV29ya2VySW1wbChmb3JlaWduTW9kdWxlKTtcbiAgICB2YXIgc2ltcGxlV29ya2VyID0gbmV3IFNpbXBsZVdvcmtlclNlcnZlcihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UobXNnKTtcbiAgICB9LCBlZGl0b3JXb3JrZXIpO1xuICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgc2ltcGxlV29ya2VyLm9ubWVzc2FnZShlLmRhdGEpO1xuICAgIH07XG59XG5zZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gSWdub3JlIGZpcnN0IG1lc3NhZ2UgaW4gdGhpcyBjYXNlIGFuZCBpbml0aWFsaXplIGlmIG5vdCB5ZXQgaW5pdGlhbGl6ZWRcbiAgICBpZiAoIWluaXRpYWxpemVkKSB7XG4gICAgICAgIGluaXRpYWxpemUobnVsbCk7XG4gICAgfVxufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiJdLCJzb3VyY2VSb290IjoiIn0=