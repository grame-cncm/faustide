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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2FycmF5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vY2FuY2VsbGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9kaWZmL2RpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2RpZmYvZGlmZkNoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2tleUNvZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9saWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL2xpbmtlZExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2UvY29tbW9uL3BsYXRmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzZS9jb21tb24vdXJpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNlL2NvbW1vbi93b3JrZXIvc2ltcGxlV29ya2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL2NvcmUvY2hhcmFjdGVyQ2xhc3NpZmllci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9jb3JlL3Bvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL2NvcmUvcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vY29yZS9zZWxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vY29yZS90b2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9jb3JlL3VpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vZGlmZi9kaWZmQ29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vbW9kZWwvbWlycm9yVGV4dE1vZGVsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL21vZGVsL3dvcmRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vbW9kZXMvbGlua0NvbXB1dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL21vZGVzL3N1cHBvcnRzL2lucGxhY2VSZXBsYWNlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9zZXJ2aWNlcy9lZGl0b3JTaW1wbGVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vc3RhbmRhbG9uZS9wcm9taXNlLXBvbHlmaWxsL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvY29tbW9uL3N0YW5kYWxvbmUvc3RhbmRhbG9uZUJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vc3RhbmRhbG9uZS9zdGFuZGFsb25lRW51bXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vdmlld01vZGVsL3ByZWZpeFN1bUNvbXB1dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvZWRpdG9yLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNP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QUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNENBQTRDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0NBQWdDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5REFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0NBQWdDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHlEQUFVO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDa0I7Ozs7Ozs7Ozs7Ozs7QUNueEJuQjtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUM5QjtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQzJCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrRUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQzBCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNpQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDNkI7Ozs7Ozs7Ozs7Ozs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUCxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ087QUFDUCx5Q0FBeUM7QUFDekM7QUFDTztBQUNQO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbktBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGlKQUFpSjtBQUM5TTtBQUNBO0FBQ0EsMERBQTBELGlKQUFpSjtBQUMzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxZQUFZO0FBQ2xGO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDYztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1CQUFtQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxREFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxTQUFTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsY0FBYztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsY0FBYztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsU0FBUztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3VCOzs7Ozs7Ozs7Ozs7O0FDNVh4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQytDO0FBQ3VCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6Qyw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0I7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdEQUFnRDtBQUMxQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrREFBa0Q7QUFDbkQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4Q0FBOEM7QUFDL0M7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0RBQWtEO0FBQ25EO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0Q0FBNEM7QUFDN0M7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhDQUE4QztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0RBQXdEO0FBQ2xEO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnREFBZ0Q7QUFDMUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QztBQUN6QztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzRUFBc0U7QUFDdkU7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0RBQXNEO0FBQ2hEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzREFBc0Q7QUFDdkQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEVBQTBFO0FBQzNFO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBFQUEwRTtBQUMzRTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMENBQTBDO0FBQzNDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUM5QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0RBQWdEO0FBQzFDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9FQUFvRTtBQUNyRTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzREFBc0Q7QUFDaEQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNERBQTREO0FBQzdEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNEQUFzRDtBQUN2RDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDOzs7Ozs7Ozs7Ozs7O0FDeG9CakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDaUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4REFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhEQUFRO0FBQ3hCLGdCQUFnQiw4REFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4REFBUTtBQUM3QixjQUFjLDhEQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhEQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUM0QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELHlDQUF5QztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3FDOzs7Ozs7Ozs7Ozs7O0FDdk10QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzJFO0FBQ007QUFDakY7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZGQUFzQjtBQUNqRCwyQkFBMkIsc0ZBQWtCO0FBQzdDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6TEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLG1CQUFPLENBQUMsaUVBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJqc1xcZWRpdG9yLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9lZGl0b3Iud29ya2VyLmpzXCIpO1xuIiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuXG4gKiBAcGFyYW0gYXJyYXkgVGhlIGFycmF5LlxuICogQHBhcmFtIG4gV2hpY2ggZWxlbWVudCBmcm9tIHRoZSBlbmQgKGRlZmF1bHQgaXMgemVybykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YWlsKGFycmF5LCBuKSB7XG4gICAgaWYgKG4gPT09IHZvaWQgMCkgeyBuID0gMDsgfVxuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAoMSArIG4pXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0YWlsMihhcnIpIHtcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFpbCBjYWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBbYXJyLnNsaWNlKDAsIGFyci5sZW5ndGggLSAxKSwgYXJyW2Fyci5sZW5ndGggLSAxXV07XG59XG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKG9uZSwgb3RoZXIsIGl0ZW1FcXVhbHMpIHtcbiAgICBpZiAoaXRlbUVxdWFscyA9PT0gdm9pZCAwKSB7IGl0ZW1FcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSA9PT0gYjsgfTsgfVxuICAgIGlmIChvbmUgPT09IG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIW9uZSB8fCAhb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAob25lLmxlbmd0aCAhPT0gb3RoZXIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9uZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoIWl0ZW1FcXVhbHMob25lW2ldLCBvdGhlcltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlTZWFyY2goYXJyYXksIGtleSwgY29tcGFyYXRvcikge1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gYXJyYXkubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICAgICAgdmFyIG1pZCA9ICgobG93ICsgaGlnaCkgLyAyKSB8IDA7XG4gICAgICAgIHZhciBjb21wID0gY29tcGFyYXRvcihhcnJheVttaWRdLCBrZXkpO1xuICAgICAgICBpZiAoY29tcCA8IDApIHtcbiAgICAgICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29tcCA+IDApIHtcbiAgICAgICAgICAgIGhpZ2ggPSBtaWQgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLShsb3cgKyAxKTtcbn1cbi8qKlxuICogVGFrZXMgYSBzb3J0ZWQgYXJyYXkgYW5kIGEgZnVuY3Rpb24gcC4gVGhlIGFycmF5IGlzIHNvcnRlZCBpbiBzdWNoIGEgd2F5IHRoYXQgYWxsIGVsZW1lbnRzIHdoZXJlIHAoeCkgaXMgZmFsc2VcbiAqIGFyZSBsb2NhdGVkIGJlZm9yZSBhbGwgZWxlbWVudHMgd2hlcmUgcCh4KSBpcyB0cnVlLlxuICogQHJldHVybnMgdGhlIGxlYXN0IHggZm9yIHdoaWNoIHAoeCkgaXMgdHJ1ZSBvciBhcnJheS5sZW5ndGggaWYgbm8gZWxlbWVudCBmdWxsZmlsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEZpcnN0SW5Tb3J0ZWQoYXJyYXksIHApIHtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoaGlnaCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDsgLy8gbm8gY2hpbGRyZW5cbiAgICB9XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XG4gICAgICAgIGlmIChwKGFycmF5W21pZF0pKSB7XG4gICAgICAgICAgICBoaWdoID0gbWlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG93O1xufVxuLyoqXG4gKiBMaWtlIGBBcnJheSNzb3J0YCBidXQgYWx3YXlzIHN0YWJsZS4gVXN1YWxseSBydW5zIGEgbGl0dGxlIHNsb3dlciBgdGhhbiBBcnJheSNzb3J0YFxuICogc28gb25seSB1c2UgdGhpcyB3aGVuIGFjdHVhbGx5IG5lZWRpbmcgc3RhYmxlIHNvcnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVNvcnQoZGF0YSwgY29tcGFyZSkge1xuICAgIF9zb3J0KGRhdGEsIGNvbXBhcmUsIDAsIGRhdGEubGVuZ3RoIC0gMSwgW10pO1xuICAgIHJldHVybiBkYXRhO1xufVxuZnVuY3Rpb24gX21lcmdlKGEsIGNvbXBhcmUsIGxvLCBtaWQsIGhpLCBhdXgpIHtcbiAgICB2YXIgbGVmdElkeCA9IGxvLCByaWdodElkeCA9IG1pZCArIDE7XG4gICAgZm9yICh2YXIgaSA9IGxvOyBpIDw9IGhpOyBpKyspIHtcbiAgICAgICAgYXV4W2ldID0gYVtpXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IGxvOyBpIDw9IGhpOyBpKyspIHtcbiAgICAgICAgaWYgKGxlZnRJZHggPiBtaWQpIHtcbiAgICAgICAgICAgIC8vIGxlZnQgc2lkZSBjb25zdW1lZFxuICAgICAgICAgICAgYVtpXSA9IGF1eFtyaWdodElkeCsrXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyaWdodElkeCA+IGhpKSB7XG4gICAgICAgICAgICAvLyByaWdodCBzaWRlIGNvbnN1bWVkXG4gICAgICAgICAgICBhW2ldID0gYXV4W2xlZnRJZHgrK107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29tcGFyZShhdXhbcmlnaHRJZHhdLCBhdXhbbGVmdElkeF0pIDwgMCkge1xuICAgICAgICAgICAgLy8gcmlnaHQgZWxlbWVudCBpcyBsZXNzIC0+IGNvbWVzIGZpcnN0XG4gICAgICAgICAgICBhW2ldID0gYXV4W3JpZ2h0SWR4KytdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gbGVmdCBlbGVtZW50IGNvbWVzIGZpcnN0IChsZXNzIG9yIGVxdWFsKVxuICAgICAgICAgICAgYVtpXSA9IGF1eFtsZWZ0SWR4KytdO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gX3NvcnQoYSwgY29tcGFyZSwgbG8sIGhpLCBhdXgpIHtcbiAgICBpZiAoaGkgPD0gbG8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbWlkID0gbG8gKyAoKGhpIC0gbG8pIC8gMikgfCAwO1xuICAgIF9zb3J0KGEsIGNvbXBhcmUsIGxvLCBtaWQsIGF1eCk7XG4gICAgX3NvcnQoYSwgY29tcGFyZSwgbWlkICsgMSwgaGksIGF1eCk7XG4gICAgaWYgKGNvbXBhcmUoYVttaWRdLCBhW21pZCArIDFdKSA8PSAwKSB7XG4gICAgICAgIC8vIGxlZnQgYW5kIHJpZ2h0IGFyZSBzb3J0ZWQgYW5kIGlmIHRoZSBsYXN0LWxlZnQgZWxlbWVudCBpcyBsZXNzXG4gICAgICAgIC8vIG9yIGVxdWFscyB0aGFuIHRoZSBmaXJzdC1yaWdodCBlbGVtZW50IHRoZXJlIGlzIG5vdGhpbmcgZWxzZVxuICAgICAgICAvLyB0byBkb1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIF9tZXJnZShhLCBjb21wYXJlLCBsbywgbWlkLCBoaSwgYXV4KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5KGRhdGEsIGNvbXBhcmUpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGN1cnJlbnRHcm91cCA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gbWVyZ2VTb3J0KGRhdGEuc2xpY2UoMCksIGNvbXBhcmUpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hW19pXTtcbiAgICAgICAgaWYgKCFjdXJyZW50R3JvdXAgfHwgY29tcGFyZShjdXJyZW50R3JvdXBbMF0sIGVsZW1lbnQpICE9PSAwKSB7XG4gICAgICAgICAgICBjdXJyZW50R3JvdXAgPSBbZWxlbWVudF07XG4gICAgICAgICAgICByZXN1bHQucHVzaChjdXJyZW50R3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEdyb3VwLnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQHJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBhbGwgZmFsc3kgdmFsdWVzIHJlbW92ZWQuIFRoZSBvcmlnaW5hbCBhcnJheSBJUyBOT1QgbW9kaWZpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2FsZXNjZShhcnJheSkge1xuICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiAhIWU7IH0pO1xufVxuLyoqXG4gKiBAcmV0dXJucyBmYWxzZSBpZiB0aGUgcHJvdmlkZWQgb2JqZWN0IGlzIGFuIGFycmF5IGFuZCBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ZhbHN5T3JFbXB0eShvYmopIHtcbiAgICByZXR1cm4gIUFycmF5LmlzQXJyYXkob2JqKSB8fCBvYmoubGVuZ3RoID09PSAwO1xufVxuLyoqXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBwcm92aWRlZCBvYmplY3QgaXMgYW4gYXJyYXkgYW5kIGhhcyBhdCBsZWFzdCBvbmUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTm9uRW1wdHlBcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopICYmIG9iai5sZW5ndGggPiAwO1xufVxuLyoqXG4gKiBSZW1vdmVzIGR1cGxpY2F0ZXMgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuIFRoZSBvcHRpb25hbCBrZXlGbiBhbGxvd3MgdG8gc3BlY2lmeVxuICogaG93IGVsZW1lbnRzIGFyZSBjaGVja2VkIGZvciBlcXVhbG5lc3MgYnkgcmV0dXJuaW5nIGEgdW5pcXVlIHN0cmluZyBmb3IgZWFjaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3RpbmN0KGFycmF5LCBrZXlGbikge1xuICAgIGlmICgha2V5Rm4pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKGVsZW1lbnQpID09PSBwb3NpdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBzZWVuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlGbihlbGVtKTtcbiAgICAgICAgaWYgKHNlZW5ba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNlZW5ba2V5XSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0SW5kZXgoYXJyYXksIGZuKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICBpZiAoZm4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdChhcnJheSwgZm4sIG5vdEZvdW5kVmFsdWUpIHtcbiAgICBpZiAobm90Rm91bmRWYWx1ZSA9PT0gdm9pZCAwKSB7IG5vdEZvdW5kVmFsdWUgPSBudWxsOyB9XG4gICAgdmFyIGluZGV4ID0gZmlyc3RJbmRleChhcnJheSwgZm4pO1xuICAgIHJldHVybiBpbmRleCA8IDAgPyBub3RGb3VuZFZhbHVlIDogYXJyYXlbaW5kZXhdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBbXSkuY29uY2F0LmFwcGx5KF9hLCBhcnIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKGFyZywgdG8pIHtcbiAgICB2YXIgZnJvbSA9IHR5cGVvZiB0byA9PT0gJ251bWJlcicgPyBhcmcgOiAwO1xuICAgIGlmICh0eXBlb2YgdG8gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGZyb20gPSBhcmc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmcm9tID0gMDtcbiAgICAgICAgdG8gPSBhcmc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBpZiAoZnJvbSA8PSB0bykge1xuICAgICAgICBmb3IgKHZhciBpID0gZnJvbTsgaSA8IHRvOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gZnJvbTsgaSA+IHRvOyBpLS0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEluc2VydCBgaW5zZXJ0QXJyYCBpbnNpZGUgYHRhcmdldGAgYXQgYGluc2VydEluZGV4YC5cbiAqIFBsZWFzZSBkb24ndCB0b3VjaCB1bmxlc3MgeW91IHVuZGVyc3RhbmQgaHR0cHM6Ly9qc3BlcmYuY29tL2luc2VydGluZy1hbi1hcnJheS13aXRoaW4tYW4tYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5SW5zZXJ0KHRhcmdldCwgaW5zZXJ0SW5kZXgsIGluc2VydEFycikge1xuICAgIHZhciBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoMCwgaW5zZXJ0SW5kZXgpO1xuICAgIHZhciBhZnRlciA9IHRhcmdldC5zbGljZShpbnNlcnRJbmRleCk7XG4gICAgcmV0dXJuIGJlZm9yZS5jb25jYXQoaW5zZXJ0QXJyLCBhZnRlcik7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEVtaXR0ZXIsIEV2ZW50IH0gZnJvbSAnLi9ldmVudC5qcyc7XG52YXIgc2hvcnRjdXRFdmVudCA9IE9iamVjdC5mcmVlemUoZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIGhhbmRsZSA9IHNldFRpbWVvdXQoY2FsbGJhY2suYmluZChjb250ZXh0KSwgMCk7XG4gICAgcmV0dXJuIHsgZGlzcG9zZTogZnVuY3Rpb24gKCkgeyBjbGVhclRpbWVvdXQoaGFuZGxlKTsgfSB9O1xufSk7XG5leHBvcnQgdmFyIENhbmNlbGxhdGlvblRva2VuO1xuKGZ1bmN0aW9uIChDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIGZ1bmN0aW9uIGlzQ2FuY2VsbGF0aW9uVG9rZW4odGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nID09PSBDYW5jZWxsYXRpb25Ub2tlbi5Ob25lIHx8IHRoaW5nID09PSBDYW5jZWxsYXRpb25Ub2tlbi5DYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGluZyBpbnN0YW5jZW9mIE11dGFibGVUb2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGluZyB8fCB0eXBlb2YgdGhpbmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGluZy5pc0NhbmNlbGxhdGlvblJlcXVlc3RlZCA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcub25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQgPT09ICdmdW5jdGlvbic7XG4gICAgfVxuICAgIENhbmNlbGxhdGlvblRva2VuLmlzQ2FuY2VsbGF0aW9uVG9rZW4gPSBpc0NhbmNlbGxhdGlvblRva2VuO1xuICAgIENhbmNlbGxhdGlvblRva2VuLk5vbmUgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQ6IGZhbHNlLFxuICAgICAgICBvbkNhbmNlbGxhdGlvblJlcXVlc3RlZDogRXZlbnQuTm9uZVxuICAgIH0pO1xuICAgIENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZCA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZDogdHJ1ZSxcbiAgICAgICAgb25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQ6IHNob3J0Y3V0RXZlbnRcbiAgICB9KTtcbn0pKENhbmNlbGxhdGlvblRva2VuIHx8IChDYW5jZWxsYXRpb25Ub2tlbiA9IHt9KSk7XG52YXIgTXV0YWJsZVRva2VuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE11dGFibGVUb2tlbigpIHtcbiAgICAgICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZW1pdHRlciA9IG51bGw7XG4gICAgfVxuICAgIE11dGFibGVUb2tlbi5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5fZW1pdHRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIuZmlyZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTXV0YWJsZVRva2VuLnByb3RvdHlwZSwgXCJpc0NhbmNlbGxhdGlvblJlcXVlc3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzQ2FuY2VsbGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTXV0YWJsZVRva2VuLnByb3RvdHlwZSwgXCJvbkNhbmNlbGxhdGlvblJlcXVlc3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3J0Y3V0RXZlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbWl0dGVyLmV2ZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNdXRhYmxlVG9rZW4ucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTXV0YWJsZVRva2VuO1xufSgpKTtcbnZhciBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSgpIHtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENhbmNlbGxhdGlvblRva2VuU291cmNlLnByb3RvdHlwZSwgXCJ0b2tlblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl90b2tlbikge1xuICAgICAgICAgICAgICAgIC8vIGJlIGxhenkgYW5kIGNyZWF0ZSB0aGUgdG9rZW4gb25seSB3aGVuXG4gICAgICAgICAgICAgICAgLy8gYWN0dWFsbHkgbmVlZGVkXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9rZW4gPSBuZXcgTXV0YWJsZVRva2VuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIENhbmNlbGxhdGlvblRva2VuU291cmNlLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdG9rZW4pIHtcbiAgICAgICAgICAgIC8vIHNhdmUgYW4gb2JqZWN0IGJ5IHJldHVybmluZyB0aGUgZGVmYXVsdFxuICAgICAgICAgICAgLy8gY2FuY2VsbGVkIHRva2VuIHdoZW4gY2FuY2VsbGF0aW9uIGhhcHBlbnNcbiAgICAgICAgICAgIC8vIGJlZm9yZSBzb21lb25lIGFza3MgZm9yIHRoZSB0b2tlblxuICAgICAgICAgICAgdGhpcy5fdG9rZW4gPSBDYW5jZWxsYXRpb25Ub2tlbi5DYW5jZWxsZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fdG9rZW4gaW5zdGFuY2VvZiBNdXRhYmxlVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIGFjdHVhbGx5IGNhbmNlbFxuICAgICAgICAgICAgdGhpcy5fdG9rZW4uY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENhbmNlbGxhdGlvblRva2VuU291cmNlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Rva2VuKSB7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdG8gaW5pdGlhbGl6ZSB3aXRoIGFuIGVtcHR5IHRva2VuIGlmIHdlIGhhZCBub25lXG4gICAgICAgICAgICB0aGlzLl90b2tlbiA9IENhbmNlbGxhdGlvblRva2VuLk5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fdG9rZW4gaW5zdGFuY2VvZiBNdXRhYmxlVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIGFjdHVhbGx5IGRpc3Bvc2VcbiAgICAgICAgICAgIHRoaXMuX3Rva2VuLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENhbmNlbGxhdGlvblRva2VuU291cmNlO1xufSgpKTtcbmV4cG9ydCB7IENhbmNlbGxhdGlvblRva2VuU291cmNlIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IERpZmZDaGFuZ2UgfSBmcm9tICcuL2RpZmZDaGFuZ2UuanMnO1xuZnVuY3Rpb24gY3JlYXRlU3RyaW5nU2VxdWVuY2UoYSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldExlbmd0aDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYS5sZW5ndGg7IH0sXG4gICAgICAgIGdldEVsZW1lbnRBdEluZGV4OiBmdW5jdGlvbiAocG9zKSB7IHJldHVybiBhLmNoYXJDb2RlQXQocG9zKTsgfVxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nRGlmZihvcmlnaW5hbCwgbW9kaWZpZWQsIHByZXR0eSkge1xuICAgIHJldHVybiBuZXcgTGNzRGlmZihjcmVhdGVTdHJpbmdTZXF1ZW5jZShvcmlnaW5hbCksIGNyZWF0ZVN0cmluZ1NlcXVlbmNlKG1vZGlmaWVkKSkuQ29tcHV0ZURpZmYocHJldHR5KTtcbn1cbi8vXG4vLyBUaGUgY29kZSBiZWxvdyBoYXMgYmVlbiBwb3J0ZWQgZnJvbSBhIEMjIGltcGxlbWVudGF0aW9uIGluIFZTXG4vL1xudmFyIERlYnVnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlYnVnKCkge1xuICAgIH1cbiAgICBEZWJ1Zy5Bc3NlcnQgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEZWJ1Zztcbn0oKSk7XG5leHBvcnQgeyBEZWJ1ZyB9O1xudmFyIE15QXJyYXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTXlBcnJheSgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29waWVzIGEgcmFuZ2Ugb2YgZWxlbWVudHMgZnJvbSBhbiBBcnJheSBzdGFydGluZyBhdCB0aGUgc3BlY2lmaWVkIHNvdXJjZSBpbmRleCBhbmQgcGFzdGVzXG4gICAgICogdGhlbSB0byBhbm90aGVyIEFycmF5IHN0YXJ0aW5nIGF0IHRoZSBzcGVjaWZpZWQgZGVzdGluYXRpb24gaW5kZXguIFRoZSBsZW5ndGggYW5kIHRoZSBpbmRleGVzXG4gICAgICogYXJlIHNwZWNpZmllZCBhcyA2NC1iaXQgaW50ZWdlcnMuXG4gICAgICogc291cmNlQXJyYXk6XG4gICAgICpcdFx0VGhlIEFycmF5IHRoYXQgY29udGFpbnMgdGhlIGRhdGEgdG8gY29weS5cbiAgICAgKiBzb3VyY2VJbmRleDpcbiAgICAgKlx0XHRBIDY0LWJpdCBpbnRlZ2VyIHRoYXQgcmVwcmVzZW50cyB0aGUgaW5kZXggaW4gdGhlIHNvdXJjZUFycmF5IGF0IHdoaWNoIGNvcHlpbmcgYmVnaW5zLlxuICAgICAqIGRlc3RpbmF0aW9uQXJyYXk6XG4gICAgICpcdFx0VGhlIEFycmF5IHRoYXQgcmVjZWl2ZXMgdGhlIGRhdGEuXG4gICAgICogZGVzdGluYXRpb25JbmRleDpcbiAgICAgKlx0XHRBIDY0LWJpdCBpbnRlZ2VyIHRoYXQgcmVwcmVzZW50cyB0aGUgaW5kZXggaW4gdGhlIGRlc3RpbmF0aW9uQXJyYXkgYXQgd2hpY2ggc3RvcmluZyBiZWdpbnMuXG4gICAgICogbGVuZ3RoOlxuICAgICAqXHRcdEEgNjQtYml0IGludGVnZXIgdGhhdCByZXByZXNlbnRzIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gY29weS5cbiAgICAgKi9cbiAgICBNeUFycmF5LkNvcHkgPSBmdW5jdGlvbiAoc291cmNlQXJyYXksIHNvdXJjZUluZGV4LCBkZXN0aW5hdGlvbkFycmF5LCBkZXN0aW5hdGlvbkluZGV4LCBsZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGVzdGluYXRpb25BcnJheVtkZXN0aW5hdGlvbkluZGV4ICsgaV0gPSBzb3VyY2VBcnJheVtzb3VyY2VJbmRleCArIGldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTXlBcnJheTtcbn0oKSk7XG5leHBvcnQgeyBNeUFycmF5IH07XG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBMY3NEaWZmLmNzXG4vL1xuLy8gQW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIGRpZmZlcmVuY2UgYWxnb3JpdGhtIGRlc2NyaWJlZCBpblxuLy8gXCJBbiBPKE5EKSBEaWZmZXJlbmNlIEFsZ29yaXRobSBhbmQgaXRzIHZhcmlhdGlvbnNcIiBieSBFdWdlbmUgVy4gTXllcnNcbi8vXG4vLyBDb3B5cmlnaHQgKEMpIDIwMDggTWljcm9zb2Z0IENvcnBvcmF0aW9uIEBtaW5pZmllcl9kb19ub3RfcHJlc2VydmVcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIE91ciB0b3RhbCBtZW1vcnkgdXNhZ2UgZm9yIHN0b3JpbmcgaGlzdG9yeSBpcyAod29yc3QtY2FzZSk6XG4vLyAyICogWyhNYXhEaWZmZXJlbmNlc0hpc3RvcnkgKyAxKSAqIChNYXhEaWZmZXJlbmNlc0hpc3RvcnkgKyAxKSAtIDFdICogc2l6ZW9mKGludClcbi8vIDIgKiBbMTQ0OCoxNDQ4IC0gMV0gKiA0ID0gMTY3NzM2MjQgPSAxNk1CXG52YXIgTWF4RGlmZmVyZW5jZXNIaXN0b3J5ID0gMTQ0Nztcbi8vbGV0IE1heERpZmZlcmVuY2VzSGlzdG9yeSA9IDEwMDtcbi8qKlxuICogQSB1dGlsaXR5IGNsYXNzIHdoaWNoIGhlbHBzIHRvIGNyZWF0ZSB0aGUgc2V0IG9mIERpZmZDaGFuZ2VzIGZyb21cbiAqIGEgZGlmZmVyZW5jZSBvcGVyYXRpb24uIFRoaXMgY2xhc3MgYWNjZXB0cyBvcmlnaW5hbCBEaWZmRWxlbWVudHMgYW5kXG4gKiBtb2RpZmllZCBEaWZmRWxlbWVudHMgdGhhdCBhcmUgaW52b2x2ZWQgaW4gYSBwYXJ0aWN1bGFyIGNoYW5nZS4gVGhlXG4gKiBNYXJrdE5leHRDaGFuZ2UoKSBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byBtYXJrIHRoZSBzZXBhcmF0aW9uIGJldHdlZW5cbiAqIGRpc3RpbmN0IGNoYW5nZXMuIEF0IHRoZSBlbmQsIHRoZSBDaGFuZ2VzIHByb3BlcnR5IGNhbiBiZSBjYWxsZWQgdG8gcmV0cmlldmVcbiAqIHRoZSBjb25zdHJ1Y3RlZCBjaGFuZ2VzLlxuICovXG52YXIgRGlmZkNoYW5nZUhlbHBlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IERpZmZDaGFuZ2VIZWxwZXIgZm9yIHRoZSBnaXZlbiBEaWZmU2VxdWVuY2VzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERpZmZDaGFuZ2VIZWxwZXIoKSB7XG4gICAgICAgIHRoaXMubV9jaGFuZ2VzID0gW107XG4gICAgICAgIHRoaXMubV9vcmlnaW5hbFN0YXJ0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgdGhpcy5tX21vZGlmaWVkU3RhcnQgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLm1fb3JpZ2luYWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMubV9tb2RpZmllZENvdW50ID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFya3MgdGhlIGJlZ2lubmluZyBvZiB0aGUgbmV4dCBjaGFuZ2UgaW4gdGhlIHNldCBvZiBkaWZmZXJlbmNlcy5cbiAgICAgKi9cbiAgICBEaWZmQ2hhbmdlSGVscGVyLnByb3RvdHlwZS5NYXJrTmV4dENoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gT25seSBhZGQgdG8gdGhlIGxpc3QgaWYgdGhlcmUgaXMgc29tZXRoaW5nIHRvIGFkZFxuICAgICAgICBpZiAodGhpcy5tX29yaWdpbmFsQ291bnQgPiAwIHx8IHRoaXMubV9tb2RpZmllZENvdW50ID4gMCkge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXcgY2hhbmdlIHRvIG91ciBsaXN0XG4gICAgICAgICAgICB0aGlzLm1fY2hhbmdlcy5wdXNoKG5ldyBEaWZmQ2hhbmdlKHRoaXMubV9vcmlnaW5hbFN0YXJ0LCB0aGlzLm1fb3JpZ2luYWxDb3VudCwgdGhpcy5tX21vZGlmaWVkU3RhcnQsIHRoaXMubV9tb2RpZmllZENvdW50KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzZXQgZm9yIHRoZSBuZXh0IGNoYW5nZVxuICAgICAgICB0aGlzLm1fb3JpZ2luYWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMubV9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5tX29yaWdpbmFsU3RhcnQgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLm1fbW9kaWZpZWRTdGFydCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBvcmlnaW5hbCBlbGVtZW50IGF0IHRoZSBnaXZlbiBwb3NpdGlvbiB0byB0aGUgZWxlbWVudHNcbiAgICAgKiBhZmZlY3RlZCBieSB0aGUgY3VycmVudCBjaGFuZ2UuIFRoZSBtb2RpZmllZCBpbmRleCBnaXZlcyBjb250ZXh0XG4gICAgICogdG8gdGhlIGNoYW5nZSBwb3NpdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG9yaWdpbmFsIHNlcXVlbmNlLlxuICAgICAqIEBwYXJhbSBvcmlnaW5hbEluZGV4IFRoZSBpbmRleCBvZiB0aGUgb3JpZ2luYWwgZWxlbWVudCB0byBhZGQuXG4gICAgICogQHBhcmFtIG1vZGlmaWVkSW5kZXggVGhlIGluZGV4IG9mIHRoZSBtb2RpZmllZCBlbGVtZW50IHRoYXQgcHJvdmlkZXMgY29ycmVzcG9uZGluZyBwb3NpdGlvbiBpbiB0aGUgbW9kaWZpZWQgc2VxdWVuY2UuXG4gICAgICovXG4gICAgRGlmZkNoYW5nZUhlbHBlci5wcm90b3R5cGUuQWRkT3JpZ2luYWxFbGVtZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsSW5kZXgsIG1vZGlmaWVkSW5kZXgpIHtcbiAgICAgICAgLy8gVGhlICd0cnVlJyBzdGFydCBpbmRleCBpcyB0aGUgc21hbGxlc3Qgb2YgdGhlIG9uZXMgd2UndmUgc2VlblxuICAgICAgICB0aGlzLm1fb3JpZ2luYWxTdGFydCA9IE1hdGgubWluKHRoaXMubV9vcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEluZGV4KTtcbiAgICAgICAgdGhpcy5tX21vZGlmaWVkU3RhcnQgPSBNYXRoLm1pbih0aGlzLm1fbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRJbmRleCk7XG4gICAgICAgIHRoaXMubV9vcmlnaW5hbENvdW50Kys7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBtb2RpZmllZCBlbGVtZW50IGF0IHRoZSBnaXZlbiBwb3NpdGlvbiB0byB0aGUgZWxlbWVudHNcbiAgICAgKiBhZmZlY3RlZCBieSB0aGUgY3VycmVudCBjaGFuZ2UuIFRoZSBvcmlnaW5hbCBpbmRleCBnaXZlcyBjb250ZXh0XG4gICAgICogdG8gdGhlIGNoYW5nZSBwb3NpdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG1vZGlmaWVkIHNlcXVlbmNlLlxuICAgICAqIEBwYXJhbSBvcmlnaW5hbEluZGV4IFRoZSBpbmRleCBvZiB0aGUgb3JpZ2luYWwgZWxlbWVudCB0aGF0IHByb3ZpZGVzIGNvcnJlc3BvbmRpbmcgcG9zaXRpb24gaW4gdGhlIG9yaWdpbmFsIHNlcXVlbmNlLlxuICAgICAqIEBwYXJhbSBtb2RpZmllZEluZGV4IFRoZSBpbmRleCBvZiB0aGUgbW9kaWZpZWQgZWxlbWVudCB0byBhZGQuXG4gICAgICovXG4gICAgRGlmZkNoYW5nZUhlbHBlci5wcm90b3R5cGUuQWRkTW9kaWZpZWRFbGVtZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsSW5kZXgsIG1vZGlmaWVkSW5kZXgpIHtcbiAgICAgICAgLy8gVGhlICd0cnVlJyBzdGFydCBpbmRleCBpcyB0aGUgc21hbGxlc3Qgb2YgdGhlIG9uZXMgd2UndmUgc2VlblxuICAgICAgICB0aGlzLm1fb3JpZ2luYWxTdGFydCA9IE1hdGgubWluKHRoaXMubV9vcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEluZGV4KTtcbiAgICAgICAgdGhpcy5tX21vZGlmaWVkU3RhcnQgPSBNYXRoLm1pbih0aGlzLm1fbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRJbmRleCk7XG4gICAgICAgIHRoaXMubV9tb2RpZmllZENvdW50Kys7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYWxsIG9mIHRoZSBjaGFuZ2VzIG1hcmtlZCBieSB0aGUgY2xhc3MuXG4gICAgICovXG4gICAgRGlmZkNoYW5nZUhlbHBlci5wcm90b3R5cGUuZ2V0Q2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubV9vcmlnaW5hbENvdW50ID4gMCB8fCB0aGlzLm1fbW9kaWZpZWRDb3VudCA+IDApIHtcbiAgICAgICAgICAgIC8vIEZpbmlzaCB1cCBvbiB3aGF0ZXZlciBpcyBsZWZ0XG4gICAgICAgICAgICB0aGlzLk1hcmtOZXh0Q2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubV9jaGFuZ2VzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFsbCBvZiB0aGUgY2hhbmdlcyBtYXJrZWQgYnkgdGhlIGNsYXNzIGluIHRoZSByZXZlcnNlIG9yZGVyXG4gICAgICovXG4gICAgRGlmZkNoYW5nZUhlbHBlci5wcm90b3R5cGUuZ2V0UmV2ZXJzZUNoYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm1fb3JpZ2luYWxDb3VudCA+IDAgfHwgdGhpcy5tX21vZGlmaWVkQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAvLyBGaW5pc2ggdXAgb24gd2hhdGV2ZXIgaXMgbGVmdFxuICAgICAgICAgICAgdGhpcy5NYXJrTmV4dENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9jaGFuZ2VzLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubV9jaGFuZ2VzO1xuICAgIH07XG4gICAgcmV0dXJuIERpZmZDaGFuZ2VIZWxwZXI7XG59KCkpO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgZGlmZmVyZW5jZSBhbGdvcml0aG0gZGVzY3JpYmVkIGluXG4gKiBcIkFuIE8oTkQpIERpZmZlcmVuY2UgQWxnb3JpdGhtIGFuZCBpdHMgdmFyaWF0aW9uc1wiIGJ5IEV1Z2VuZSBXLiBNeWVyc1xuICovXG52YXIgTGNzRGlmZiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIHRoZSBEaWZmRmluZGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gTGNzRGlmZihvcmlnaW5hbFNlcXVlbmNlLCBuZXdTZXF1ZW5jZSwgY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlKSB7XG4gICAgICAgIGlmIChjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUgPT09IHZvaWQgMCkgeyBjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUgPSBudWxsOyB9XG4gICAgICAgIHRoaXMuT3JpZ2luYWxTZXF1ZW5jZSA9IG9yaWdpbmFsU2VxdWVuY2U7XG4gICAgICAgIHRoaXMuTW9kaWZpZWRTZXF1ZW5jZSA9IG5ld1NlcXVlbmNlO1xuICAgICAgICB0aGlzLkNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSA9IGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZTtcbiAgICAgICAgdGhpcy5tX2ZvcndhcmRIaXN0b3J5ID0gW107XG4gICAgICAgIHRoaXMubV9yZXZlcnNlSGlzdG9yeSA9IFtdO1xuICAgIH1cbiAgICBMY3NEaWZmLnByb3RvdHlwZS5FbGVtZW50c0FyZUVxdWFsID0gZnVuY3Rpb24gKG9yaWdpbmFsSW5kZXgsIG5ld0luZGV4KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5PcmlnaW5hbFNlcXVlbmNlLmdldEVsZW1lbnRBdEluZGV4KG9yaWdpbmFsSW5kZXgpID09PSB0aGlzLk1vZGlmaWVkU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgobmV3SW5kZXgpKTtcbiAgICB9O1xuICAgIExjc0RpZmYucHJvdG90eXBlLk9yaWdpbmFsRWxlbWVudHNBcmVFcXVhbCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xuICAgICAgICByZXR1cm4gKHRoaXMuT3JpZ2luYWxTZXF1ZW5jZS5nZXRFbGVtZW50QXRJbmRleChpbmRleDEpID09PSB0aGlzLk9yaWdpbmFsU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgoaW5kZXgyKSk7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5Nb2RpZmllZEVsZW1lbnRzQXJlRXF1YWwgPSBmdW5jdGlvbiAoaW5kZXgxLCBpbmRleDIpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLk1vZGlmaWVkU2VxdWVuY2UuZ2V0RWxlbWVudEF0SW5kZXgoaW5kZXgxKSA9PT0gdGhpcy5Nb2RpZmllZFNlcXVlbmNlLmdldEVsZW1lbnRBdEluZGV4KGluZGV4MikpO1xuICAgIH07XG4gICAgTGNzRGlmZi5wcm90b3R5cGUuQ29tcHV0ZURpZmYgPSBmdW5jdGlvbiAocHJldHR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9Db21wdXRlRGlmZigwLCB0aGlzLk9yaWdpbmFsU2VxdWVuY2UuZ2V0TGVuZ3RoKCkgLSAxLCAwLCB0aGlzLk1vZGlmaWVkU2VxdWVuY2UuZ2V0TGVuZ3RoKCkgLSAxLCBwcmV0dHkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdGhlIG9yaWdpbmFsIGFuZCBtb2RpZmllZCBpbnB1dFxuICAgICAqIHNlcXVlbmNlcyBvbiB0aGUgYm91bmRlZCByYW5nZS5cbiAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0aGUgdHdvIGlucHV0IHNlcXVlbmNlcy5cbiAgICAgKi9cbiAgICBMY3NEaWZmLnByb3RvdHlwZS5fQ29tcHV0ZURpZmYgPSBmdW5jdGlvbiAob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxFbmQsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkRW5kLCBwcmV0dHkpIHtcbiAgICAgICAgdmFyIHF1aXRFYXJseUFyciA9IFtmYWxzZV07XG4gICAgICAgIHZhciBjaGFuZ2VzID0gdGhpcy5Db21wdXRlRGlmZlJlY3Vyc2l2ZShvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEVuZCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRFbmQsIHF1aXRFYXJseUFycik7XG4gICAgICAgIGlmIChwcmV0dHkpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gY2xlYW4gdXAgdGhlIGNvbXB1dGVkIGRpZmYgdG8gYmUgbW9yZSBpbnR1aXRpdmVcbiAgICAgICAgICAgIC8vIGJ1dCBpdCB0dXJucyBvdXQgdGhpcyBjYW5ub3QgYmUgZG9uZSBjb3JyZWN0bHkgdW50aWwgdGhlIGVudGlyZSBzZXRcbiAgICAgICAgICAgIC8vIG9mIGRpZmZzIGhhdmUgYmVlbiBjb21wdXRlZFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUHJldHRpZnlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBoZWxwZXIgbWV0aG9kIHdoaWNoIGNvbXB1dGVzIHRoZSBkaWZmZXJlbmNlcyBvbiB0aGUgYm91bmRlZCByYW5nZVxuICAgICAqIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHRoZSB0d28gaW5wdXQgc2VxdWVuY2VzLlxuICAgICAqL1xuICAgIExjc0RpZmYucHJvdG90eXBlLkNvbXB1dGVEaWZmUmVjdXJzaXZlID0gZnVuY3Rpb24gKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsRW5kLCBtb2RpZmllZFN0YXJ0LCBtb2RpZmllZEVuZCwgcXVpdEVhcmx5QXJyKSB7XG4gICAgICAgIHF1aXRFYXJseUFyclswXSA9IGZhbHNlO1xuICAgICAgICAvLyBGaW5kIHRoZSBzdGFydCBvZiB0aGUgZGlmZmVyZW5jZXNcbiAgICAgICAgd2hpbGUgKG9yaWdpbmFsU3RhcnQgPD0gb3JpZ2luYWxFbmQgJiYgbW9kaWZpZWRTdGFydCA8PSBtb2RpZmllZEVuZCAmJiB0aGlzLkVsZW1lbnRzQXJlRXF1YWwob3JpZ2luYWxTdGFydCwgbW9kaWZpZWRTdGFydCkpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsU3RhcnQrKztcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnQrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5kIHRoZSBlbmQgb2YgdGhlIGRpZmZlcmVuY2VzXG4gICAgICAgIHdoaWxlIChvcmlnaW5hbEVuZCA+PSBvcmlnaW5hbFN0YXJ0ICYmIG1vZGlmaWVkRW5kID49IG1vZGlmaWVkU3RhcnQgJiYgdGhpcy5FbGVtZW50c0FyZUVxdWFsKG9yaWdpbmFsRW5kLCBtb2RpZmllZEVuZCkpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsRW5kLS07XG4gICAgICAgICAgICBtb2RpZmllZEVuZC0tO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluIHRoZSBzcGVjaWFsIGNhc2Ugd2hlcmUgd2UgZWl0aGVyIGhhdmUgYWxsIGluc2VydGlvbnMgb3IgYWxsIGRlbGV0aW9ucyBvciB0aGUgc2VxdWVuY2VzIGFyZSBpZGVudGljYWxcbiAgICAgICAgaWYgKG9yaWdpbmFsU3RhcnQgPiBvcmlnaW5hbEVuZCB8fCBtb2RpZmllZFN0YXJ0ID4gbW9kaWZpZWRFbmQpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKG1vZGlmaWVkU3RhcnQgPD0gbW9kaWZpZWRFbmQpIHtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5Bc3NlcnQob3JpZ2luYWxTdGFydCA9PT0gb3JpZ2luYWxFbmQgKyAxLCAnb3JpZ2luYWxTdGFydCBzaG91bGQgb25seSBiZSBvbmUgbW9yZSB0aGFuIG9yaWdpbmFsRW5kJyk7XG4gICAgICAgICAgICAgICAgLy8gQWxsIGluc2VydGlvbnNcbiAgICAgICAgICAgICAgICBjaGFuZ2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGlmZkNoYW5nZShvcmlnaW5hbFN0YXJ0LCAwLCBtb2RpZmllZFN0YXJ0LCBtb2RpZmllZEVuZCAtIG1vZGlmaWVkU3RhcnQgKyAxKVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbFN0YXJ0IDw9IG9yaWdpbmFsRW5kKSB7XG4gICAgICAgICAgICAgICAgRGVidWcuQXNzZXJ0KG1vZGlmaWVkU3RhcnQgPT09IG1vZGlmaWVkRW5kICsgMSwgJ21vZGlmaWVkU3RhcnQgc2hvdWxkIG9ubHkgYmUgb25lIG1vcmUgdGhhbiBtb2RpZmllZEVuZCcpO1xuICAgICAgICAgICAgICAgIC8vIEFsbCBkZWxldGlvbnNcbiAgICAgICAgICAgICAgICBjaGFuZ2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGlmZkNoYW5nZShvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEVuZCAtIG9yaWdpbmFsU3RhcnQgKyAxLCBtb2RpZmllZFN0YXJ0LCAwKVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5Bc3NlcnQob3JpZ2luYWxTdGFydCA9PT0gb3JpZ2luYWxFbmQgKyAxLCAnb3JpZ2luYWxTdGFydCBzaG91bGQgb25seSBiZSBvbmUgbW9yZSB0aGFuIG9yaWdpbmFsRW5kJyk7XG4gICAgICAgICAgICAgICAgRGVidWcuQXNzZXJ0KG1vZGlmaWVkU3RhcnQgPT09IG1vZGlmaWVkRW5kICsgMSwgJ21vZGlmaWVkU3RhcnQgc2hvdWxkIG9ubHkgYmUgb25lIG1vcmUgdGhhbiBtb2RpZmllZEVuZCcpO1xuICAgICAgICAgICAgICAgIC8vIElkZW50aWNhbCBzZXF1ZW5jZXMgLSBObyBkaWZmZXJlbmNlc1xuICAgICAgICAgICAgICAgIGNoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgcHJvYmxlbSBjYW4gYmUgc29sdmVkIHVzaW5nIHRoZSBEaXZpZGUtQW5kLUNvbnF1ZXIgdGVjaG5pcXVlLlxuICAgICAgICB2YXIgbWlkT3JpZ2luYWxBcnIgPSBbMF0sIG1pZE1vZGlmaWVkQXJyID0gWzBdO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5Db21wdXRlUmVjdXJzaW9uUG9pbnQob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxFbmQsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkRW5kLCBtaWRPcmlnaW5hbEFyciwgbWlkTW9kaWZpZWRBcnIsIHF1aXRFYXJseUFycik7XG4gICAgICAgIHZhciBtaWRPcmlnaW5hbCA9IG1pZE9yaWdpbmFsQXJyWzBdO1xuICAgICAgICB2YXIgbWlkTW9kaWZpZWQgPSBtaWRNb2RpZmllZEFyclswXTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gUmVzdWx0IGlzIG5vdC1udWxsIHdoZW4gdGhlcmUgd2FzIGVub3VnaCBtZW1vcnkgdG8gY29tcHV0ZSB0aGUgY2hhbmdlcyB3aGlsZVxuICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciB0aGUgcmVjdXJzaW9uIHBvaW50XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFxdWl0RWFybHlBcnJbMF0pIHtcbiAgICAgICAgICAgIC8vIFdlIGNhbiBicmVhayB0aGUgcHJvYmxlbSBkb3duIHJlY3Vyc2l2ZWx5IGJ5IGZpbmRpbmcgdGhlIGNoYW5nZXMgaW4gdGhlXG4gICAgICAgICAgICAvLyBGaXJzdCBIYWxmOiAgIChvcmlnaW5hbFN0YXJ0LCBtb2RpZmllZFN0YXJ0KSB0byAobWlkT3JpZ2luYWwsIG1pZE1vZGlmaWVkKVxuICAgICAgICAgICAgLy8gU2Vjb25kIEhhbGY6ICAobWlkT3JpZ2luYWwgKyAxLCBtaW5Nb2RpZmllZCArIDEpIHRvIChvcmlnaW5hbEVuZCwgbW9kaWZpZWRFbmQpXG4gICAgICAgICAgICAvLyBOT1RFOiBDb21wdXRlRGlmZigpIGlzIGluY2x1c2l2ZSwgdGhlcmVmb3JlIHRoZSBzZWNvbmQgcmFuZ2Ugc3RhcnRzIG9uIHRoZSBuZXh0IHBvaW50XG4gICAgICAgICAgICB2YXIgbGVmdENoYW5nZXMgPSB0aGlzLkNvbXB1dGVEaWZmUmVjdXJzaXZlKG9yaWdpbmFsU3RhcnQsIG1pZE9yaWdpbmFsLCBtb2RpZmllZFN0YXJ0LCBtaWRNb2RpZmllZCwgcXVpdEVhcmx5QXJyKTtcbiAgICAgICAgICAgIHZhciByaWdodENoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIGlmICghcXVpdEVhcmx5QXJyWzBdKSB7XG4gICAgICAgICAgICAgICAgcmlnaHRDaGFuZ2VzID0gdGhpcy5Db21wdXRlRGlmZlJlY3Vyc2l2ZShtaWRPcmlnaW5hbCArIDEsIG9yaWdpbmFsRW5kLCBtaWRNb2RpZmllZCArIDEsIG1vZGlmaWVkRW5kLCBxdWl0RWFybHlBcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgZGlkJ3QgaGF2ZSB0aW1lIHRvIGZpbmlzaCB0aGUgZmlyc3QgaGFsZiwgc28gd2UgZG9uJ3QgaGF2ZSB0aW1lIHRvIGNvbXB1dGUgdGhpcyBoYWxmLlxuICAgICAgICAgICAgICAgIC8vIENvbnNpZGVyIHRoZSBlbnRpcmUgcmVzdCBvZiB0aGUgc2VxdWVuY2UgZGlmZmVyZW50LlxuICAgICAgICAgICAgICAgIHJpZ2h0Q2hhbmdlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IERpZmZDaGFuZ2UobWlkT3JpZ2luYWwgKyAxLCBvcmlnaW5hbEVuZCAtIChtaWRPcmlnaW5hbCArIDEpICsgMSwgbWlkTW9kaWZpZWQgKyAxLCBtb2RpZmllZEVuZCAtIChtaWRNb2RpZmllZCArIDEpICsgMSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuQ29uY2F0ZW5hdGVDaGFuZ2VzKGxlZnRDaGFuZ2VzLCByaWdodENoYW5nZXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGhpdCBoZXJlLCB3ZSBxdWl0IGVhcmx5LCBhbmQgc28gY2FuJ3QgcmV0dXJuIGFueXRoaW5nIG1lYW5pbmdmdWxcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG5ldyBEaWZmQ2hhbmdlKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsRW5kIC0gb3JpZ2luYWxTdGFydCArIDEsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkRW5kIC0gbW9kaWZpZWRTdGFydCArIDEpXG4gICAgICAgIF07XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5XQUxLVFJBQ0UgPSBmdW5jdGlvbiAoZGlhZ29uYWxGb3J3YXJkQmFzZSwgZGlhZ29uYWxGb3J3YXJkU3RhcnQsIGRpYWdvbmFsRm9yd2FyZEVuZCwgZGlhZ29uYWxGb3J3YXJkT2Zmc2V0LCBkaWFnb25hbFJldmVyc2VCYXNlLCBkaWFnb25hbFJldmVyc2VTdGFydCwgZGlhZ29uYWxSZXZlcnNlRW5kLCBkaWFnb25hbFJldmVyc2VPZmZzZXQsIGZvcndhcmRQb2ludHMsIHJldmVyc2VQb2ludHMsIG9yaWdpbmFsSW5kZXgsIG9yaWdpbmFsRW5kLCBtaWRPcmlnaW5hbEFyciwgbW9kaWZpZWRJbmRleCwgbW9kaWZpZWRFbmQsIG1pZE1vZGlmaWVkQXJyLCBkZWx0YUlzRXZlbiwgcXVpdEVhcmx5QXJyKSB7XG4gICAgICAgIHZhciBmb3J3YXJkQ2hhbmdlcyA9IG51bGwsIHJldmVyc2VDaGFuZ2VzID0gbnVsbDtcbiAgICAgICAgLy8gRmlyc3QsIHdhbGsgYmFja3dhcmQgdGhyb3VnaCB0aGUgZm9yd2FyZCBkaWFnb25hbHMgaGlzdG9yeVxuICAgICAgICB2YXIgY2hhbmdlSGVscGVyID0gbmV3IERpZmZDaGFuZ2VIZWxwZXIoKTtcbiAgICAgICAgdmFyIGRpYWdvbmFsTWluID0gZGlhZ29uYWxGb3J3YXJkU3RhcnQ7XG4gICAgICAgIHZhciBkaWFnb25hbE1heCA9IGRpYWdvbmFsRm9yd2FyZEVuZDtcbiAgICAgICAgdmFyIGRpYWdvbmFsUmVsYXRpdmUgPSAobWlkT3JpZ2luYWxBcnJbMF0gLSBtaWRNb2RpZmllZEFyclswXSkgLSBkaWFnb25hbEZvcndhcmRPZmZzZXQ7XG4gICAgICAgIHZhciBsYXN0T3JpZ2luYWxJbmRleCA9IE51bWJlci5NSU5fVkFMVUU7XG4gICAgICAgIHZhciBoaXN0b3J5SW5kZXggPSB0aGlzLm1fZm9yd2FyZEhpc3RvcnkubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGRpYWdvbmFsO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGRpYWdvbmFsIGluZGV4IGZyb20gdGhlIHJlbGF0aXZlIGRpYWdvbmFsIG51bWJlclxuICAgICAgICAgICAgZGlhZ29uYWwgPSBkaWFnb25hbFJlbGF0aXZlICsgZGlhZ29uYWxGb3J3YXJkQmFzZTtcbiAgICAgICAgICAgIC8vIEZpZ3VyZSBvdXQgd2hlcmUgd2UgY2FtZSBmcm9tXG4gICAgICAgICAgICBpZiAoZGlhZ29uYWwgPT09IGRpYWdvbmFsTWluIHx8IChkaWFnb25hbCA8IGRpYWdvbmFsTWF4ICYmIGZvcndhcmRQb2ludHNbZGlhZ29uYWwgLSAxXSA8IGZvcndhcmRQb2ludHNbZGlhZ29uYWwgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBWZXJ0aWNhbCBsaW5lICh0aGUgZWxlbWVudCBpcyBhbiBpbnNlcnQpXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IGZvcndhcmRQb2ludHNbZGlhZ29uYWwgKyAxXTtcbiAgICAgICAgICAgICAgICBtb2RpZmllZEluZGV4ID0gb3JpZ2luYWxJbmRleCAtIGRpYWdvbmFsUmVsYXRpdmUgLSBkaWFnb25hbEZvcndhcmRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSW5kZXggPCBsYXN0T3JpZ2luYWxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIZWxwZXIuTWFya05leHRDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdE9yaWdpbmFsSW5kZXggPSBvcmlnaW5hbEluZGV4O1xuICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5BZGRNb2RpZmllZEVsZW1lbnQob3JpZ2luYWxJbmRleCArIDEsIG1vZGlmaWVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIGRpYWdvbmFsUmVsYXRpdmUgPSAoZGlhZ29uYWwgKyAxKSAtIGRpYWdvbmFsRm9yd2FyZEJhc2U7IC8vU2V0dXAgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSG9yaXpvbnRhbCBsaW5lICh0aGUgZWxlbWVudCBpcyBhIGRlbGV0aW9uKVxuICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXggPSBmb3J3YXJkUG9pbnRzW2RpYWdvbmFsIC0gMV0gKyAxO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkSW5kZXggPSBvcmlnaW5hbEluZGV4IC0gZGlhZ29uYWxSZWxhdGl2ZSAtIGRpYWdvbmFsRm9yd2FyZE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJbmRleCA8IGxhc3RPcmlnaW5hbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5NYXJrTmV4dENoYW5nZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0T3JpZ2luYWxJbmRleCA9IG9yaWdpbmFsSW5kZXggLSAxO1xuICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5BZGRPcmlnaW5hbEVsZW1lbnQob3JpZ2luYWxJbmRleCwgbW9kaWZpZWRJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIGRpYWdvbmFsUmVsYXRpdmUgPSAoZGlhZ29uYWwgLSAxKSAtIGRpYWdvbmFsRm9yd2FyZEJhc2U7IC8vU2V0dXAgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhpc3RvcnlJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgZm9yd2FyZFBvaW50cyA9IHRoaXMubV9mb3J3YXJkSGlzdG9yeVtoaXN0b3J5SW5kZXhdO1xuICAgICAgICAgICAgICAgIGRpYWdvbmFsRm9yd2FyZEJhc2UgPSBmb3J3YXJkUG9pbnRzWzBdOyAvL1dlIHN0b3JlZCB0aGlzIGluIHRoZSBmaXJzdCBzcG90XG4gICAgICAgICAgICAgICAgZGlhZ29uYWxNaW4gPSAxO1xuICAgICAgICAgICAgICAgIGRpYWdvbmFsTWF4ID0gZm9yd2FyZFBvaW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgtLWhpc3RvcnlJbmRleCA+PSAtMSk7XG4gICAgICAgIC8vIElyb25pY2FsbHksIHdlIGdldCB0aGUgZm9yd2FyZCBjaGFuZ2VzIGFzIHRoZSByZXZlcnNlIG9mIHRoZVxuICAgICAgICAvLyBvcmRlciB3ZSBhZGRlZCB0aGVtIHNpbmNlIHdlIHRlY2huaWNhbGx5IGFkZGVkIHRoZW0gYmFja3dhcmRzXG4gICAgICAgIGZvcndhcmRDaGFuZ2VzID0gY2hhbmdlSGVscGVyLmdldFJldmVyc2VDaGFuZ2VzKCk7XG4gICAgICAgIGlmIChxdWl0RWFybHlBcnJbMF0pIHtcbiAgICAgICAgICAgIC8vIFRPRE86IENhbGN1bGF0ZSBhIHBhcnRpYWwgZnJvbSB0aGUgcmV2ZXJzZSBkaWFnb25hbHMuXG4gICAgICAgICAgICAvLyAgICAgICBGb3Igbm93LCBqdXN0IGFzc3VtZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBtaWRPcmlnaW5hbC9taWRNb2RpZmllZCBwb2ludCBpcyBhIGRpZmZcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFN0YXJ0UG9pbnQgPSBtaWRPcmlnaW5hbEFyclswXSArIDE7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRTdGFydFBvaW50ID0gbWlkTW9kaWZpZWRBcnJbMF0gKyAxO1xuICAgICAgICAgICAgaWYgKGZvcndhcmRDaGFuZ2VzICE9PSBudWxsICYmIGZvcndhcmRDaGFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdEZvcndhcmRDaGFuZ2UgPSBmb3J3YXJkQ2hhbmdlc1tmb3J3YXJkQ2hhbmdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFN0YXJ0UG9pbnQgPSBNYXRoLm1heChvcmlnaW5hbFN0YXJ0UG9pbnQsIGxhc3RGb3J3YXJkQ2hhbmdlLmdldE9yaWdpbmFsRW5kKCkpO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRQb2ludCA9IE1hdGgubWF4KG1vZGlmaWVkU3RhcnRQb2ludCwgbGFzdEZvcndhcmRDaGFuZ2UuZ2V0TW9kaWZpZWRFbmQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXZlcnNlQ2hhbmdlcyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgRGlmZkNoYW5nZShvcmlnaW5hbFN0YXJ0UG9pbnQsIG9yaWdpbmFsRW5kIC0gb3JpZ2luYWxTdGFydFBvaW50ICsgMSwgbW9kaWZpZWRTdGFydFBvaW50LCBtb2RpZmllZEVuZCAtIG1vZGlmaWVkU3RhcnRQb2ludCArIDEpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gTm93IHdhbGsgYmFja3dhcmQgdGhyb3VnaCB0aGUgcmV2ZXJzZSBkaWFnb25hbHMgaGlzdG9yeVxuICAgICAgICAgICAgY2hhbmdlSGVscGVyID0gbmV3IERpZmZDaGFuZ2VIZWxwZXIoKTtcbiAgICAgICAgICAgIGRpYWdvbmFsTWluID0gZGlhZ29uYWxSZXZlcnNlU3RhcnQ7XG4gICAgICAgICAgICBkaWFnb25hbE1heCA9IGRpYWdvbmFsUmV2ZXJzZUVuZDtcbiAgICAgICAgICAgIGRpYWdvbmFsUmVsYXRpdmUgPSAobWlkT3JpZ2luYWxBcnJbMF0gLSBtaWRNb2RpZmllZEFyclswXSkgLSBkaWFnb25hbFJldmVyc2VPZmZzZXQ7XG4gICAgICAgICAgICBsYXN0T3JpZ2luYWxJbmRleCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICBoaXN0b3J5SW5kZXggPSAoZGVsdGFJc0V2ZW4pID8gdGhpcy5tX3JldmVyc2VIaXN0b3J5Lmxlbmd0aCAtIDEgOiB0aGlzLm1fcmV2ZXJzZUhpc3RvcnkubGVuZ3RoIC0gMjtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGRpYWdvbmFsIGluZGV4IGZyb20gdGhlIHJlbGF0aXZlIGRpYWdvbmFsIG51bWJlclxuICAgICAgICAgICAgICAgIGRpYWdvbmFsID0gZGlhZ29uYWxSZWxhdGl2ZSArIGRpYWdvbmFsUmV2ZXJzZUJhc2U7XG4gICAgICAgICAgICAgICAgLy8gRmlndXJlIG91dCB3aGVyZSB3ZSBjYW1lIGZyb21cbiAgICAgICAgICAgICAgICBpZiAoZGlhZ29uYWwgPT09IGRpYWdvbmFsTWluIHx8IChkaWFnb25hbCA8IGRpYWdvbmFsTWF4ICYmIHJldmVyc2VQb2ludHNbZGlhZ29uYWwgLSAxXSA+PSByZXZlcnNlUG9pbnRzW2RpYWdvbmFsICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhvcml6b250YWwgbGluZSAodGhlIGVsZW1lbnQgaXMgYSBkZWxldGlvbikpXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXggPSByZXZlcnNlUG9pbnRzW2RpYWdvbmFsICsgMV0gLSAxO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEluZGV4ID0gb3JpZ2luYWxJbmRleCAtIGRpYWdvbmFsUmVsYXRpdmUgLSBkaWFnb25hbFJldmVyc2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEluZGV4ID4gbGFzdE9yaWdpbmFsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5NYXJrTmV4dENoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RPcmlnaW5hbEluZGV4ID0gb3JpZ2luYWxJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUhlbHBlci5BZGRPcmlnaW5hbEVsZW1lbnQob3JpZ2luYWxJbmRleCArIDEsIG1vZGlmaWVkSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxSZWxhdGl2ZSA9IChkaWFnb25hbCArIDEpIC0gZGlhZ29uYWxSZXZlcnNlQmFzZTsgLy9TZXR1cCBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBWZXJ0aWNhbCBsaW5lICh0aGUgZWxlbWVudCBpcyBhbiBpbnNlcnRpb24pXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXggPSByZXZlcnNlUG9pbnRzW2RpYWdvbmFsIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkSW5kZXggPSBvcmlnaW5hbEluZGV4IC0gZGlhZ29uYWxSZWxhdGl2ZSAtIGRpYWdvbmFsUmV2ZXJzZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSW5kZXggPiBsYXN0T3JpZ2luYWxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGVscGVyLk1hcmtOZXh0Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFzdE9yaWdpbmFsSW5kZXggPSBvcmlnaW5hbEluZGV4O1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIZWxwZXIuQWRkTW9kaWZpZWRFbGVtZW50KG9yaWdpbmFsSW5kZXggKyAxLCBtb2RpZmllZEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWdvbmFsUmVsYXRpdmUgPSAoZGlhZ29uYWwgLSAxKSAtIGRpYWdvbmFsUmV2ZXJzZUJhc2U7IC8vU2V0dXAgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaGlzdG9yeUluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZVBvaW50cyA9IHRoaXMubV9yZXZlcnNlSGlzdG9yeVtoaXN0b3J5SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBkaWFnb25hbFJldmVyc2VCYXNlID0gcmV2ZXJzZVBvaW50c1swXTsgLy9XZSBzdG9yZWQgdGhpcyBpbiB0aGUgZmlyc3Qgc3BvdFxuICAgICAgICAgICAgICAgICAgICBkaWFnb25hbE1pbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRpYWdvbmFsTWF4ID0gcmV2ZXJzZVBvaW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKC0taGlzdG9yeUluZGV4ID49IC0xKTtcbiAgICAgICAgICAgIC8vIFRoZXJlIGFyZSBjYXNlcyB3aGVyZSB0aGUgcmV2ZXJzZSBoaXN0b3J5IHdpbGwgZmluZCBkaWZmcyB0aGF0XG4gICAgICAgICAgICAvLyBhcmUgY29ycmVjdCwgYnV0IG5vdCBpbnR1aXRpdmUsIHNvIHdlIG5lZWQgc2hpZnQgdGhlbS5cbiAgICAgICAgICAgIHJldmVyc2VDaGFuZ2VzID0gY2hhbmdlSGVscGVyLmdldENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5Db25jYXRlbmF0ZUNoYW5nZXMoZm9yd2FyZENoYW5nZXMsIHJldmVyc2VDaGFuZ2VzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSByYW5nZSB0byBjb21wdXRlIHRoZSBkaWZmIG9uLCB0aGlzIG1ldGhvZCBmaW5kcyB0aGUgcG9pbnQ6XG4gICAgICogKG1pZE9yaWdpbmFsLCBtaWRNb2RpZmllZClcbiAgICAgKiB0aGF0IGV4aXN0cyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBMQ1Mgb2YgdGhlIHR3byBzZXF1ZW5jZXMgYW5kXG4gICAgICogaXMgdGhlIHBvaW50IGF0IHdoaWNoIHRoZSBMQ1MgcHJvYmxlbSBtYXkgYmUgYnJva2VuIGRvd24gcmVjdXJzaXZlbHkuXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCB0cnkgdG8ga2VlcCB0aGUgTENTIHRyYWNlIGluIG1lbW9yeS4gSWYgdGhlIExDUyByZWN1cnNpb25cbiAgICAgKiBwb2ludCBpcyBjYWxjdWxhdGVkIGFuZCB0aGUgZnVsbCB0cmFjZSBpcyBhdmFpbGFibGUgaW4gbWVtb3J5LCB0aGVuIHRoaXMgbWV0aG9kXG4gICAgICogd2lsbCByZXR1cm4gdGhlIGNoYW5nZSBsaXN0LlxuICAgICAqIEBwYXJhbSBvcmlnaW5hbFN0YXJ0IFRoZSBzdGFydCBib3VuZCBvZiB0aGUgb3JpZ2luYWwgc2VxdWVuY2UgcmFuZ2VcbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxFbmQgVGhlIGVuZCBib3VuZCBvZiB0aGUgb3JpZ2luYWwgc2VxdWVuY2UgcmFuZ2VcbiAgICAgKiBAcGFyYW0gbW9kaWZpZWRTdGFydCBUaGUgc3RhcnQgYm91bmQgb2YgdGhlIG1vZGlmaWVkIHNlcXVlbmNlIHJhbmdlXG4gICAgICogQHBhcmFtIG1vZGlmaWVkRW5kIFRoZSBlbmQgYm91bmQgb2YgdGhlIG1vZGlmaWVkIHNlcXVlbmNlIHJhbmdlXG4gICAgICogQHBhcmFtIG1pZE9yaWdpbmFsIFRoZSBtaWRkbGUgcG9pbnQgb2YgdGhlIG9yaWdpbmFsIHNlcXVlbmNlIHJhbmdlXG4gICAgICogQHBhcmFtIG1pZE1vZGlmaWVkIFRoZSBtaWRkbGUgcG9pbnQgb2YgdGhlIG1vZGlmaWVkIHNlcXVlbmNlIHJhbmdlXG4gICAgICogQHJldHVybnMgVGhlIGRpZmYgY2hhbmdlcywgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgbnVsbFxuICAgICAqL1xuICAgIExjc0RpZmYucHJvdG90eXBlLkNvbXB1dGVSZWN1cnNpb25Qb2ludCA9IGZ1bmN0aW9uIChvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEVuZCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRFbmQsIG1pZE9yaWdpbmFsQXJyLCBtaWRNb2RpZmllZEFyciwgcXVpdEVhcmx5QXJyKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbEluZGV4ID0gMCwgbW9kaWZpZWRJbmRleCA9IDA7XG4gICAgICAgIHZhciBkaWFnb25hbEZvcndhcmRTdGFydCA9IDAsIGRpYWdvbmFsRm9yd2FyZEVuZCA9IDA7XG4gICAgICAgIHZhciBkaWFnb25hbFJldmVyc2VTdGFydCA9IDAsIGRpYWdvbmFsUmV2ZXJzZUVuZCA9IDA7XG4gICAgICAgIHZhciBudW1EaWZmZXJlbmNlcztcbiAgICAgICAgLy8gVG8gdHJhdmVyc2UgdGhlIGVkaXQgZ3JhcGggYW5kIHByb2R1Y2UgdGhlIHByb3BlciBMQ1MsIG91ciBhY3R1YWxcbiAgICAgICAgLy8gc3RhcnQgcG9zaXRpb24gaXMganVzdCBvdXRzaWRlIHRoZSBnaXZlbiBib3VuZGFyeVxuICAgICAgICBvcmlnaW5hbFN0YXJ0LS07XG4gICAgICAgIG1vZGlmaWVkU3RhcnQtLTtcbiAgICAgICAgLy8gV2Ugc2V0IHRoZXNlIHVwIHRvIG1ha2UgdGhlIGNvbXBpbGVyIGhhcHB5LCBidXQgdGhleSB3aWxsXG4gICAgICAgIC8vIGJlIHJlcGxhY2VkIGJlZm9yZSB3ZSByZXR1cm4gd2l0aCB0aGUgYWN0dWFsIHJlY3Vyc2lvbiBwb2ludFxuICAgICAgICBtaWRPcmlnaW5hbEFyclswXSA9IDA7XG4gICAgICAgIG1pZE1vZGlmaWVkQXJyWzBdID0gMDtcbiAgICAgICAgLy8gQ2xlYXIgb3V0IHRoZSBoaXN0b3J5XG4gICAgICAgIHRoaXMubV9mb3J3YXJkSGlzdG9yeSA9IFtdO1xuICAgICAgICB0aGlzLm1fcmV2ZXJzZUhpc3RvcnkgPSBbXTtcbiAgICAgICAgLy8gRWFjaCBjZWxsIGluIHRoZSB0d28gYXJyYXlzIGNvcnJlc3BvbmRzIHRvIGEgZGlhZ29uYWwgaW4gdGhlIGVkaXQgZ3JhcGguXG4gICAgICAgIC8vIFRoZSBpbnRlZ2VyIHZhbHVlIGluIHRoZSBjZWxsIHJlcHJlc2VudHMgdGhlIG9yaWdpbmFsSW5kZXggb2YgdGhlIGZ1cnRoZXN0XG4gICAgICAgIC8vIHJlYWNoaW5nIHBvaW50IGZvdW5kIHNvIGZhciB0aGF0IGVuZHMgaW4gdGhhdCBkaWFnb25hbC5cbiAgICAgICAgLy8gVGhlIG1vZGlmaWVkSW5kZXggY2FuIGJlIGNvbXB1dGVkIG1hdGhlbWF0aWNhbGx5IGZyb20gdGhlIG9yaWdpbmFsSW5kZXggYW5kIHRoZSBkaWFnb25hbCBudW1iZXIuXG4gICAgICAgIHZhciBtYXhEaWZmZXJlbmNlcyA9IChvcmlnaW5hbEVuZCAtIG9yaWdpbmFsU3RhcnQpICsgKG1vZGlmaWVkRW5kIC0gbW9kaWZpZWRTdGFydCk7XG4gICAgICAgIHZhciBudW1EaWFnb25hbHMgPSBtYXhEaWZmZXJlbmNlcyArIDE7XG4gICAgICAgIHZhciBmb3J3YXJkUG9pbnRzID0gbmV3IEFycmF5KG51bURpYWdvbmFscyk7XG4gICAgICAgIHZhciByZXZlcnNlUG9pbnRzID0gbmV3IEFycmF5KG51bURpYWdvbmFscyk7XG4gICAgICAgIC8vIGRpYWdvbmFsRm9yd2FyZEJhc2U6IEluZGV4IGludG8gZm9yd2FyZFBvaW50cyBvZiB0aGUgZGlhZ29uYWwgd2hpY2ggcGFzc2VzIHRocm91Z2ggKG9yaWdpbmFsU3RhcnQsIG1vZGlmaWVkU3RhcnQpXG4gICAgICAgIC8vIGRpYWdvbmFsUmV2ZXJzZUJhc2U6IEluZGV4IGludG8gcmV2ZXJzZVBvaW50cyBvZiB0aGUgZGlhZ29uYWwgd2hpY2ggcGFzc2VzIHRocm91Z2ggKG9yaWdpbmFsRW5kLCBtb2RpZmllZEVuZClcbiAgICAgICAgdmFyIGRpYWdvbmFsRm9yd2FyZEJhc2UgPSAobW9kaWZpZWRFbmQgLSBtb2RpZmllZFN0YXJ0KTtcbiAgICAgICAgdmFyIGRpYWdvbmFsUmV2ZXJzZUJhc2UgPSAob3JpZ2luYWxFbmQgLSBvcmlnaW5hbFN0YXJ0KTtcbiAgICAgICAgLy8gZGlhZ29uYWxGb3J3YXJkT2Zmc2V0OiBHZW9tZXRyaWMgb2Zmc2V0IHdoaWNoIGFsbG93cyBtb2RpZmllZEluZGV4IHRvIGJlIGNvbXB1dGVkIGZyb20gb3JpZ2luYWxJbmRleCBhbmQgdGhlXG4gICAgICAgIC8vICAgIGRpYWdvbmFsIG51bWJlciAocmVsYXRpdmUgdG8gZGlhZ29uYWxGb3J3YXJkQmFzZSlcbiAgICAgICAgLy8gZGlhZ29uYWxSZXZlcnNlT2Zmc2V0OiBHZW9tZXRyaWMgb2Zmc2V0IHdoaWNoIGFsbG93cyBtb2RpZmllZEluZGV4IHRvIGJlIGNvbXB1dGVkIGZyb20gb3JpZ2luYWxJbmRleCBhbmQgdGhlXG4gICAgICAgIC8vICAgIGRpYWdvbmFsIG51bWJlciAocmVsYXRpdmUgdG8gZGlhZ29uYWxSZXZlcnNlQmFzZSlcbiAgICAgICAgdmFyIGRpYWdvbmFsRm9yd2FyZE9mZnNldCA9IChvcmlnaW5hbFN0YXJ0IC0gbW9kaWZpZWRTdGFydCk7XG4gICAgICAgIHZhciBkaWFnb25hbFJldmVyc2VPZmZzZXQgPSAob3JpZ2luYWxFbmQgLSBtb2RpZmllZEVuZCk7XG4gICAgICAgIC8vIGRlbHRhOiBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBlbmQgZGlhZ29uYWwgYW5kIHRoZSBzdGFydCBkaWFnb25hbC4gVGhpcyBpcyB1c2VkIHRvIHJlbGF0ZSBkaWFnb25hbCBudW1iZXJzXG4gICAgICAgIC8vICAgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IGRpYWdvbmFsIHdpdGggZGlhZ29uYWwgbnVtYmVycyByZWxhdGl2ZSB0byB0aGUgZW5kIGRpYWdvbmFsLlxuICAgICAgICAvLyBUaGUgRXZlbi9PZGRuLW5lc3Mgb2YgdGhpcyBkZWx0YSBpcyBpbXBvcnRhbnQgZm9yIGRldGVybWluaW5nIHdoZW4gd2Ugc2hvdWxkIGNoZWNrIGZvciBvdmVybGFwXG4gICAgICAgIHZhciBkZWx0YSA9IGRpYWdvbmFsUmV2ZXJzZUJhc2UgLSBkaWFnb25hbEZvcndhcmRCYXNlO1xuICAgICAgICB2YXIgZGVsdGFJc0V2ZW4gPSAoZGVsdGEgJSAyID09PSAwKTtcbiAgICAgICAgLy8gSGVyZSB3ZSBzZXQgdXAgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRzIGFzIHRoZSBmdXJ0aGVzdCBwb2ludHMgZm91bmQgc28gZmFyXG4gICAgICAgIC8vIGluIGJvdGggdGhlIGZvcndhcmQgYW5kIHJldmVyc2UgZGlyZWN0aW9ucywgcmVzcGVjdGl2ZWx5XG4gICAgICAgIGZvcndhcmRQb2ludHNbZGlhZ29uYWxGb3J3YXJkQmFzZV0gPSBvcmlnaW5hbFN0YXJ0O1xuICAgICAgICByZXZlcnNlUG9pbnRzW2RpYWdvbmFsUmV2ZXJzZUJhc2VdID0gb3JpZ2luYWxFbmQ7XG4gICAgICAgIC8vIFJlbWVtYmVyIGlmIHdlIHF1aXQgZWFybHksIGFuZCB0aHVzIG5lZWQgdG8gZG8gYSBiZXN0LWVmZm9ydCByZXN1bHQgaW5zdGVhZCBvZiBhIHJlYWwgcmVzdWx0LlxuICAgICAgICBxdWl0RWFybHlBcnJbMF0gPSBmYWxzZTtcbiAgICAgICAgLy8gQSBjb3VwbGUgb2YgcG9pbnRzOlxuICAgICAgICAvLyAtLVdpdGggdGhpcyBtZXRob2QsIHdlIGl0ZXJhdGUgb24gdGhlIG51bWJlciBvZiBkaWZmZXJlbmNlcyBiZXR3ZWVuIHRoZSB0d28gc2VxdWVuY2VzLlxuICAgICAgICAvLyAgIFRoZSBtb3JlIGRpZmZlcmVuY2VzIHRoZXJlIGFjdHVhbGx5IGFyZSwgdGhlIGxvbmdlciB0aGlzIHdpbGwgdGFrZS5cbiAgICAgICAgLy8gLS1BbHNvLCBhcyB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzIGluY3JlYXNlcywgd2UgaGF2ZSB0byBzZWFyY2ggb24gZGlhZ29uYWxzIGZ1cnRoZXJcbiAgICAgICAgLy8gICBhd2F5IGZyb20gdGhlIHJlZmVyZW5jZSBkaWFnb25hbCAod2hpY2ggaXMgZGlhZ29uYWxGb3J3YXJkQmFzZSBmb3IgZm9yd2FyZCwgZGlhZ29uYWxSZXZlcnNlQmFzZSBmb3IgcmV2ZXJzZSkuXG4gICAgICAgIC8vIC0tV2UgZXh0ZW5kIG9uIGV2ZW4gZGlhZ29uYWxzIChyZWxhdGl2ZSB0byB0aGUgcmVmZXJlbmNlIGRpYWdvbmFsKSBvbmx5IHdoZW4gbnVtRGlmZmVyZW5jZXNcbiAgICAgICAgLy8gICBpcyBldmVuIGFuZCBvZGQgZGlhZ29uYWxzIG9ubHkgd2hlbiBudW1EaWZmZXJlbmNlcyBpcyBvZGQuXG4gICAgICAgIHZhciBkaWFnb25hbCwgdGVtcE9yaWdpbmFsSW5kZXg7XG4gICAgICAgIGZvciAobnVtRGlmZmVyZW5jZXMgPSAxOyBudW1EaWZmZXJlbmNlcyA8PSAobWF4RGlmZmVyZW5jZXMgLyAyKSArIDE7IG51bURpZmZlcmVuY2VzKyspIHtcbiAgICAgICAgICAgIHZhciBmdXJ0aGVzdE9yaWdpbmFsSW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIGZ1cnRoZXN0TW9kaWZpZWRJbmRleCA9IDA7XG4gICAgICAgICAgICAvLyBSdW4gdGhlIGFsZ29yaXRobSBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb25cbiAgICAgICAgICAgIGRpYWdvbmFsRm9yd2FyZFN0YXJ0ID0gdGhpcy5DbGlwRGlhZ29uYWxCb3VuZChkaWFnb25hbEZvcndhcmRCYXNlIC0gbnVtRGlmZmVyZW5jZXMsIG51bURpZmZlcmVuY2VzLCBkaWFnb25hbEZvcndhcmRCYXNlLCBudW1EaWFnb25hbHMpO1xuICAgICAgICAgICAgZGlhZ29uYWxGb3J3YXJkRW5kID0gdGhpcy5DbGlwRGlhZ29uYWxCb3VuZChkaWFnb25hbEZvcndhcmRCYXNlICsgbnVtRGlmZmVyZW5jZXMsIG51bURpZmZlcmVuY2VzLCBkaWFnb25hbEZvcndhcmRCYXNlLCBudW1EaWFnb25hbHMpO1xuICAgICAgICAgICAgZm9yIChkaWFnb25hbCA9IGRpYWdvbmFsRm9yd2FyZFN0YXJ0OyBkaWFnb25hbCA8PSBkaWFnb25hbEZvcndhcmRFbmQ7IGRpYWdvbmFsICs9IDIpIHtcbiAgICAgICAgICAgICAgICAvLyBTVEVQIDE6IFdlIGV4dGVuZCB0aGUgZnVydGhlc3QgcmVhY2hpbmcgcG9pbnQgaW4gdGhlIHByZXNlbnQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAvLyBieSBsb29raW5nIGF0IHRoZSBkaWFnb25hbHMgYWJvdmUgYW5kIGJlbG93IGFuZCBwaWNraW5nIHRoZSBvbmUgd2hvc2UgcG9pbnRcbiAgICAgICAgICAgICAgICAvLyBpcyBmdXJ0aGVyIGF3YXkgZnJvbSB0aGUgc3RhcnQgcG9pbnQgKG9yaWdpbmFsU3RhcnQsIG1vZGlmaWVkU3RhcnQpXG4gICAgICAgICAgICAgICAgaWYgKGRpYWdvbmFsID09PSBkaWFnb25hbEZvcndhcmRTdGFydCB8fCAoZGlhZ29uYWwgPCBkaWFnb25hbEZvcndhcmRFbmQgJiYgZm9yd2FyZFBvaW50c1tkaWFnb25hbCAtIDFdIDwgZm9yd2FyZFBvaW50c1tkaWFnb25hbCArIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEluZGV4ID0gZm9yd2FyZFBvaW50c1tkaWFnb25hbCArIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IGZvcndhcmRQb2ludHNbZGlhZ29uYWwgLSAxXSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZGlmaWVkSW5kZXggPSBvcmlnaW5hbEluZGV4IC0gKGRpYWdvbmFsIC0gZGlhZ29uYWxGb3J3YXJkQmFzZSkgLSBkaWFnb25hbEZvcndhcmRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBvcmlnaW5hbEluZGV4IHNvIHdlIGNhbiB0ZXN0IGZvciBmYWxzZSBvdmVybGFwIGluIHN0ZXAgM1xuICAgICAgICAgICAgICAgIHRlbXBPcmlnaW5hbEluZGV4ID0gb3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICAvLyBTVEVQIDI6IFdlIGNhbiBjb250aW51ZSB0byBleHRlbmQgdGhlIGZ1cnRoZXN0IHJlYWNoaW5nIHBvaW50IGluIHRoZSBwcmVzZW50IGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgLy8gc28gbG9uZyBhcyB0aGUgZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAgICAgICAgICAgIHdoaWxlIChvcmlnaW5hbEluZGV4IDwgb3JpZ2luYWxFbmQgJiYgbW9kaWZpZWRJbmRleCA8IG1vZGlmaWVkRW5kICYmIHRoaXMuRWxlbWVudHNBcmVFcXVhbChvcmlnaW5hbEluZGV4ICsgMSwgbW9kaWZpZWRJbmRleCArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRJbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3J3YXJkUG9pbnRzW2RpYWdvbmFsXSA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSW5kZXggKyBtb2RpZmllZEluZGV4ID4gZnVydGhlc3RPcmlnaW5hbEluZGV4ICsgZnVydGhlc3RNb2RpZmllZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1cnRoZXN0T3JpZ2luYWxJbmRleCA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGZ1cnRoZXN0TW9kaWZpZWRJbmRleCA9IG1vZGlmaWVkSW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNURVAgMzogSWYgZGVsdGEgaXMgb2RkIChvdmVybGFwIGZpcnN0IGhhcHBlbnMgb24gZm9yd2FyZCB3aGVuIGRlbHRhIGlzIG9kZClcbiAgICAgICAgICAgICAgICAvLyBhbmQgZGlhZ29uYWwgaXMgaW4gdGhlIHJhbmdlIG9mIHJldmVyc2UgZGlhZ29uYWxzIGNvbXB1dGVkIGZvciBudW1EaWZmZXJlbmNlcy0xXG4gICAgICAgICAgICAgICAgLy8gKHRoZSBwcmV2aW91cyBpdGVyYXRpb247IHdlIGhhdmVuJ3QgY29tcHV0ZWQgcmV2ZXJzZSBkaWFnb25hbHMgZm9yIG51bURpZmZlcmVuY2VzIHlldClcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGNoZWNrIGZvciBvdmVybGFwLlxuICAgICAgICAgICAgICAgIGlmICghZGVsdGFJc0V2ZW4gJiYgTWF0aC5hYnMoZGlhZ29uYWwgLSBkaWFnb25hbFJldmVyc2VCYXNlKSA8PSAobnVtRGlmZmVyZW5jZXMgLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJbmRleCA+PSByZXZlcnNlUG9pbnRzW2RpYWdvbmFsXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWlkT3JpZ2luYWxBcnJbMF0gPSBvcmlnaW5hbEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWlkTW9kaWZpZWRBcnJbMF0gPSBtb2RpZmllZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBPcmlnaW5hbEluZGV4IDw9IHJldmVyc2VQb2ludHNbZGlhZ29uYWxdICYmIE1heERpZmZlcmVuY2VzSGlzdG9yeSA+IDAgJiYgbnVtRGlmZmVyZW5jZXMgPD0gKE1heERpZmZlcmVuY2VzSGlzdG9yeSArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQklOR08hIFdlIG92ZXJsYXBwZWQsIGFuZCB3ZSBoYXZlIHRoZSBmdWxsIHRyYWNlIGluIG1lbW9yeSFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5XQUxLVFJBQ0UoZGlhZ29uYWxGb3J3YXJkQmFzZSwgZGlhZ29uYWxGb3J3YXJkU3RhcnQsIGRpYWdvbmFsRm9yd2FyZEVuZCwgZGlhZ29uYWxGb3J3YXJkT2Zmc2V0LCBkaWFnb25hbFJldmVyc2VCYXNlLCBkaWFnb25hbFJldmVyc2VTdGFydCwgZGlhZ29uYWxSZXZlcnNlRW5kLCBkaWFnb25hbFJldmVyc2VPZmZzZXQsIGZvcndhcmRQb2ludHMsIHJldmVyc2VQb2ludHMsIG9yaWdpbmFsSW5kZXgsIG9yaWdpbmFsRW5kLCBtaWRPcmlnaW5hbEFyciwgbW9kaWZpZWRJbmRleCwgbW9kaWZpZWRFbmQsIG1pZE1vZGlmaWVkQXJyLCBkZWx0YUlzRXZlbiwgcXVpdEVhcmx5QXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVpdGhlciBmYWxzZSBvdmVybGFwLCBvciB3ZSBkaWRuJ3QgaGF2ZSBlbm91Z2ggbWVtb3J5IGZvciB0aGUgZnVsbCB0cmFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEp1c3QgcmV0dXJuIHRoZSByZWN1cnNpb24gcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBzaG91bGQgYmUgcXVpdHRpbmcgZWFybHksIGJlZm9yZSBtb3Zpbmcgb24gdG8gdGhlIG5leHQgaXRlcmF0aW9uLlxuICAgICAgICAgICAgdmFyIG1hdGNoTGVuZ3RoT2ZMb25nZXN0ID0gKChmdXJ0aGVzdE9yaWdpbmFsSW5kZXggLSBvcmlnaW5hbFN0YXJ0KSArIChmdXJ0aGVzdE1vZGlmaWVkSW5kZXggLSBtb2RpZmllZFN0YXJ0KSAtIG51bURpZmZlcmVuY2VzKSAvIDI7XG4gICAgICAgICAgICBpZiAodGhpcy5Db250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUgIT09IG51bGwgJiYgIXRoaXMuQ29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlKGZ1cnRoZXN0T3JpZ2luYWxJbmRleCwgdGhpcy5PcmlnaW5hbFNlcXVlbmNlLCBtYXRjaExlbmd0aE9mTG9uZ2VzdCkpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBmaW5pc2gsIHNvIHNraXAgYWhlYWQgdG8gZ2VuZXJhdGluZyBhIHJlc3VsdCBmcm9tIHdoYXQgd2UgaGF2ZS5cbiAgICAgICAgICAgICAgICBxdWl0RWFybHlBcnJbMF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZnVydGhlc3QgZGlzdGFuY2Ugd2UgZ290IGluIHRoZSBmb3J3YXJkIGRpcmVjdGlvbi5cbiAgICAgICAgICAgICAgICBtaWRPcmlnaW5hbEFyclswXSA9IGZ1cnRoZXN0T3JpZ2luYWxJbmRleDtcbiAgICAgICAgICAgICAgICBtaWRNb2RpZmllZEFyclswXSA9IGZ1cnRoZXN0TW9kaWZpZWRJbmRleDtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hMZW5ndGhPZkxvbmdlc3QgPiAwICYmIE1heERpZmZlcmVuY2VzSGlzdG9yeSA+IDAgJiYgbnVtRGlmZmVyZW5jZXMgPD0gKE1heERpZmZlcmVuY2VzSGlzdG9yeSArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVub3VnaCBvZiB0aGUgaGlzdG9yeSBpcyBpbiBtZW1vcnkgdG8gd2FsayBpdCBiYWNrd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuV0FMS1RSQUNFKGRpYWdvbmFsRm9yd2FyZEJhc2UsIGRpYWdvbmFsRm9yd2FyZFN0YXJ0LCBkaWFnb25hbEZvcndhcmRFbmQsIGRpYWdvbmFsRm9yd2FyZE9mZnNldCwgZGlhZ29uYWxSZXZlcnNlQmFzZSwgZGlhZ29uYWxSZXZlcnNlU3RhcnQsIGRpYWdvbmFsUmV2ZXJzZUVuZCwgZGlhZ29uYWxSZXZlcnNlT2Zmc2V0LCBmb3J3YXJkUG9pbnRzLCByZXZlcnNlUG9pbnRzLCBvcmlnaW5hbEluZGV4LCBvcmlnaW5hbEVuZCwgbWlkT3JpZ2luYWxBcnIsIG1vZGlmaWVkSW5kZXgsIG1vZGlmaWVkRW5kLCBtaWRNb2RpZmllZEFyciwgZGVsdGFJc0V2ZW4sIHF1aXRFYXJseUFycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBkaWRuJ3QgYWN0dWFsbHkgcmVtZW1iZXIgZW5vdWdoIG9mIHRoZSBoaXN0b3J5LlxuICAgICAgICAgICAgICAgICAgICAvL1NpbmNlIHdlIGFyZSBxdWl0aW5nIHRoZSBkaWZmIGVhcmx5LCB3ZSBuZWVkIHRvIHNoaWZ0IGJhY2sgdGhlIG9yaWdpbmFsU3RhcnQgYW5kIG1vZGlmaWVkIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIC8vYmFjayBpbnRvIHRoZSBib3VuZGFyeSBsaW1pdHMgc2luY2Ugd2UgZGVjcmVtZW50ZWQgdGhlaXIgdmFsdWUgYWJvdmUgYmV5b25kIHRoZSBib3VuZGFyeSBsaW1pdC5cbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydCsrO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZFN0YXJ0Kys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGlmZkNoYW5nZShvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbEVuZCAtIG9yaWdpbmFsU3RhcnQgKyAxLCBtb2RpZmllZFN0YXJ0LCBtb2RpZmllZEVuZCAtIG1vZGlmaWVkU3RhcnQgKyAxKVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJ1biB0aGUgYWxnb3JpdGhtIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvblxuICAgICAgICAgICAgZGlhZ29uYWxSZXZlcnNlU3RhcnQgPSB0aGlzLkNsaXBEaWFnb25hbEJvdW5kKGRpYWdvbmFsUmV2ZXJzZUJhc2UgLSBudW1EaWZmZXJlbmNlcywgbnVtRGlmZmVyZW5jZXMsIGRpYWdvbmFsUmV2ZXJzZUJhc2UsIG51bURpYWdvbmFscyk7XG4gICAgICAgICAgICBkaWFnb25hbFJldmVyc2VFbmQgPSB0aGlzLkNsaXBEaWFnb25hbEJvdW5kKGRpYWdvbmFsUmV2ZXJzZUJhc2UgKyBudW1EaWZmZXJlbmNlcywgbnVtRGlmZmVyZW5jZXMsIGRpYWdvbmFsUmV2ZXJzZUJhc2UsIG51bURpYWdvbmFscyk7XG4gICAgICAgICAgICBmb3IgKGRpYWdvbmFsID0gZGlhZ29uYWxSZXZlcnNlU3RhcnQ7IGRpYWdvbmFsIDw9IGRpYWdvbmFsUmV2ZXJzZUVuZDsgZGlhZ29uYWwgKz0gMikge1xuICAgICAgICAgICAgICAgIC8vIFNURVAgMTogV2UgZXh0ZW5kIHRoZSBmdXJ0aGVzdCByZWFjaGluZyBwb2ludCBpbiB0aGUgcHJlc2VudCBkaWFnb25hbFxuICAgICAgICAgICAgICAgIC8vIGJ5IGxvb2tpbmcgYXQgdGhlIGRpYWdvbmFscyBhYm92ZSBhbmQgYmVsb3cgYW5kIHBpY2tpbmcgdGhlIG9uZSB3aG9zZSBwb2ludFxuICAgICAgICAgICAgICAgIC8vIGlzIGZ1cnRoZXIgYXdheSBmcm9tIHRoZSBzdGFydCBwb2ludCAob3JpZ2luYWxFbmQsIG1vZGlmaWVkRW5kKVxuICAgICAgICAgICAgICAgIGlmIChkaWFnb25hbCA9PT0gZGlhZ29uYWxSZXZlcnNlU3RhcnQgfHwgKGRpYWdvbmFsIDwgZGlhZ29uYWxSZXZlcnNlRW5kICYmIHJldmVyc2VQb2ludHNbZGlhZ29uYWwgLSAxXSA+PSByZXZlcnNlUG9pbnRzW2RpYWdvbmFsICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXggPSByZXZlcnNlUG9pbnRzW2RpYWdvbmFsICsgMV0gLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxJbmRleCA9IHJldmVyc2VQb2ludHNbZGlhZ29uYWwgLSAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kaWZpZWRJbmRleCA9IG9yaWdpbmFsSW5kZXggLSAoZGlhZ29uYWwgLSBkaWFnb25hbFJldmVyc2VCYXNlKSAtIGRpYWdvbmFsUmV2ZXJzZU9mZnNldDtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IG9yaWdpbmFsSW5kZXggc28gd2UgY2FuIHRlc3QgZm9yIGZhbHNlIG92ZXJsYXBcbiAgICAgICAgICAgICAgICB0ZW1wT3JpZ2luYWxJbmRleCA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgLy8gU1RFUCAyOiBXZSBjYW4gY29udGludWUgdG8gZXh0ZW5kIHRoZSBmdXJ0aGVzdCByZWFjaGluZyBwb2ludCBpbiB0aGUgcHJlc2VudCBkaWFnb25hbFxuICAgICAgICAgICAgICAgIC8vIGFzIGxvbmcgYXMgdGhlIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgICAgICAgICAgICB3aGlsZSAob3JpZ2luYWxJbmRleCA+IG9yaWdpbmFsU3RhcnQgJiYgbW9kaWZpZWRJbmRleCA+IG1vZGlmaWVkU3RhcnQgJiYgdGhpcy5FbGVtZW50c0FyZUVxdWFsKG9yaWdpbmFsSW5kZXgsIG1vZGlmaWVkSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRJbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXZlcnNlUG9pbnRzW2RpYWdvbmFsXSA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgLy8gU1RFUCA0OiBJZiBkZWx0YSBpcyBldmVuIChvdmVybGFwIGZpcnN0IGhhcHBlbnMgb24gcmV2ZXJzZSB3aGVuIGRlbHRhIGlzIGV2ZW4pXG4gICAgICAgICAgICAgICAgLy8gYW5kIGRpYWdvbmFsIGlzIGluIHRoZSByYW5nZSBvZiBmb3J3YXJkIGRpYWdvbmFscyBjb21wdXRlZCBmb3IgbnVtRGlmZmVyZW5jZXNcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGNoZWNrIGZvciBvdmVybGFwLlxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUlzRXZlbiAmJiBNYXRoLmFicyhkaWFnb25hbCAtIGRpYWdvbmFsRm9yd2FyZEJhc2UpIDw9IG51bURpZmZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEluZGV4IDw9IGZvcndhcmRQb2ludHNbZGlhZ29uYWxdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRPcmlnaW5hbEFyclswXSA9IG9yaWdpbmFsSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRNb2RpZmllZEFyclswXSA9IG1vZGlmaWVkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcE9yaWdpbmFsSW5kZXggPj0gZm9yd2FyZFBvaW50c1tkaWFnb25hbF0gJiYgTWF4RGlmZmVyZW5jZXNIaXN0b3J5ID4gMCAmJiBudW1EaWZmZXJlbmNlcyA8PSAoTWF4RGlmZmVyZW5jZXNIaXN0b3J5ICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCSU5HTyEgV2Ugb3ZlcmxhcHBlZCwgYW5kIHdlIGhhdmUgdGhlIGZ1bGwgdHJhY2UgaW4gbWVtb3J5IVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLldBTEtUUkFDRShkaWFnb25hbEZvcndhcmRCYXNlLCBkaWFnb25hbEZvcndhcmRTdGFydCwgZGlhZ29uYWxGb3J3YXJkRW5kLCBkaWFnb25hbEZvcndhcmRPZmZzZXQsIGRpYWdvbmFsUmV2ZXJzZUJhc2UsIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0LCBkaWFnb25hbFJldmVyc2VFbmQsIGRpYWdvbmFsUmV2ZXJzZU9mZnNldCwgZm9yd2FyZFBvaW50cywgcmV2ZXJzZVBvaW50cywgb3JpZ2luYWxJbmRleCwgb3JpZ2luYWxFbmQsIG1pZE9yaWdpbmFsQXJyLCBtb2RpZmllZEluZGV4LCBtb2RpZmllZEVuZCwgbWlkTW9kaWZpZWRBcnIsIGRlbHRhSXNFdmVuLCBxdWl0RWFybHlBcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWl0aGVyIGZhbHNlIG92ZXJsYXAsIG9yIHdlIGRpZG4ndCBoYXZlIGVub3VnaCBtZW1vcnkgZm9yIHRoZSBmdWxsIHRyYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSnVzdCByZXR1cm4gdGhlIHJlY3Vyc2lvbiBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2F2ZSBjdXJyZW50IHZlY3RvcnMgdG8gaGlzdG9yeSBiZWZvcmUgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICBpZiAobnVtRGlmZmVyZW5jZXMgPD0gTWF4RGlmZmVyZW5jZXNIaXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIGFsbG9jYXRpbmcgc3BhY2UgZm9yIG9uZSBleHRyYSBpbnQsIHdoaWNoIHdlIGZpbGwgd2l0aFxuICAgICAgICAgICAgICAgIC8vIHRoZSBpbmRleCBvZiB0aGUgZGlhZ29uYWwgYmFzZSBpbmRleFxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gbmV3IEFycmF5KGRpYWdvbmFsRm9yd2FyZEVuZCAtIGRpYWdvbmFsRm9yd2FyZFN0YXJ0ICsgMik7XG4gICAgICAgICAgICAgICAgdGVtcFswXSA9IGRpYWdvbmFsRm9yd2FyZEJhc2UgLSBkaWFnb25hbEZvcndhcmRTdGFydCArIDE7XG4gICAgICAgICAgICAgICAgTXlBcnJheS5Db3B5KGZvcndhcmRQb2ludHMsIGRpYWdvbmFsRm9yd2FyZFN0YXJ0LCB0ZW1wLCAxLCBkaWFnb25hbEZvcndhcmRFbmQgLSBkaWFnb25hbEZvcndhcmRTdGFydCArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMubV9mb3J3YXJkSGlzdG9yeS5wdXNoKHRlbXApO1xuICAgICAgICAgICAgICAgIHRlbXAgPSBuZXcgQXJyYXkoZGlhZ29uYWxSZXZlcnNlRW5kIC0gZGlhZ29uYWxSZXZlcnNlU3RhcnQgKyAyKTtcbiAgICAgICAgICAgICAgICB0ZW1wWzBdID0gZGlhZ29uYWxSZXZlcnNlQmFzZSAtIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0ICsgMTtcbiAgICAgICAgICAgICAgICBNeUFycmF5LkNvcHkocmV2ZXJzZVBvaW50cywgZGlhZ29uYWxSZXZlcnNlU3RhcnQsIHRlbXAsIDEsIGRpYWdvbmFsUmV2ZXJzZUVuZCAtIGRpYWdvbmFsUmV2ZXJzZVN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tX3JldmVyc2VIaXN0b3J5LnB1c2godGVtcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgZ290IGhlcmUsIHRoZW4gd2UgaGF2ZSB0aGUgZnVsbCB0cmFjZSBpbiBoaXN0b3J5LiBXZSBqdXN0IGhhdmUgdG8gY29udmVydCBpdCB0byBhIGNoYW5nZSBsaXN0XG4gICAgICAgIC8vIE5PVEU6IFRoaXMgcGFydCBpcyBhIGJpdCBtZXNzeVxuICAgICAgICByZXR1cm4gdGhpcy5XQUxLVFJBQ0UoZGlhZ29uYWxGb3J3YXJkQmFzZSwgZGlhZ29uYWxGb3J3YXJkU3RhcnQsIGRpYWdvbmFsRm9yd2FyZEVuZCwgZGlhZ29uYWxGb3J3YXJkT2Zmc2V0LCBkaWFnb25hbFJldmVyc2VCYXNlLCBkaWFnb25hbFJldmVyc2VTdGFydCwgZGlhZ29uYWxSZXZlcnNlRW5kLCBkaWFnb25hbFJldmVyc2VPZmZzZXQsIGZvcndhcmRQb2ludHMsIHJldmVyc2VQb2ludHMsIG9yaWdpbmFsSW5kZXgsIG9yaWdpbmFsRW5kLCBtaWRPcmlnaW5hbEFyciwgbW9kaWZpZWRJbmRleCwgbW9kaWZpZWRFbmQsIG1pZE1vZGlmaWVkQXJyLCBkZWx0YUlzRXZlbiwgcXVpdEVhcmx5QXJyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNoaWZ0cyB0aGUgZ2l2ZW4gY2hhbmdlcyB0byBwcm92aWRlIGEgbW9yZSBpbnR1aXRpdmUgZGlmZi5cbiAgICAgKiBXaGlsZSB0aGUgZmlyc3QgZWxlbWVudCBpbiBhIGRpZmYgbWF0Y2hlcyB0aGUgZmlyc3QgZWxlbWVudCBhZnRlciB0aGUgZGlmZixcbiAgICAgKiB3ZSBzaGlmdCB0aGUgZGlmZiBkb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5nZXMgVGhlIGxpc3Qgb2YgY2hhbmdlcyB0byBzaGlmdFxuICAgICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGNoYW5nZXNcbiAgICAgKi9cbiAgICBMY3NEaWZmLnByb3RvdHlwZS5QcmV0dGlmeUNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICAvLyBTaGlmdCBhbGwgdGhlIGNoYW5nZXMgZG93biBmaXJzdFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBjaGFuZ2VzW2ldO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsU3RvcCA9IChpIDwgY2hhbmdlcy5sZW5ndGggLSAxKSA/IGNoYW5nZXNbaSArIDFdLm9yaWdpbmFsU3RhcnQgOiB0aGlzLk9yaWdpbmFsU2VxdWVuY2UuZ2V0TGVuZ3RoKCk7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRTdG9wID0gKGkgPCBjaGFuZ2VzLmxlbmd0aCAtIDEpID8gY2hhbmdlc1tpICsgMV0ubW9kaWZpZWRTdGFydCA6IHRoaXMuTW9kaWZpZWRTZXF1ZW5jZS5nZXRMZW5ndGgoKTtcbiAgICAgICAgICAgIHZhciBjaGVja09yaWdpbmFsID0gY2hhbmdlLm9yaWdpbmFsTGVuZ3RoID4gMDtcbiAgICAgICAgICAgIHZhciBjaGVja01vZGlmaWVkID0gY2hhbmdlLm1vZGlmaWVkTGVuZ3RoID4gMDtcbiAgICAgICAgICAgIHdoaWxlIChjaGFuZ2Uub3JpZ2luYWxTdGFydCArIGNoYW5nZS5vcmlnaW5hbExlbmd0aCA8IG9yaWdpbmFsU3RvcCAmJlxuICAgICAgICAgICAgICAgIGNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgY2hhbmdlLm1vZGlmaWVkTGVuZ3RoIDwgbW9kaWZpZWRTdG9wICYmXG4gICAgICAgICAgICAgICAgKCFjaGVja09yaWdpbmFsIHx8IHRoaXMuT3JpZ2luYWxFbGVtZW50c0FyZUVxdWFsKGNoYW5nZS5vcmlnaW5hbFN0YXJ0LCBjaGFuZ2Uub3JpZ2luYWxTdGFydCArIGNoYW5nZS5vcmlnaW5hbExlbmd0aCkpICYmXG4gICAgICAgICAgICAgICAgKCFjaGVja01vZGlmaWVkIHx8IHRoaXMuTW9kaWZpZWRFbGVtZW50c0FyZUVxdWFsKGNoYW5nZS5tb2RpZmllZFN0YXJ0LCBjaGFuZ2UubW9kaWZpZWRTdGFydCArIGNoYW5nZS5tb2RpZmllZExlbmd0aCkpKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlLm9yaWdpbmFsU3RhcnQrKztcbiAgICAgICAgICAgICAgICBjaGFuZ2UubW9kaWZpZWRTdGFydCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1lcmdlZENoYW5nZUFyciA9IFtudWxsXTtcbiAgICAgICAgICAgIGlmIChpIDwgY2hhbmdlcy5sZW5ndGggLSAxICYmIHRoaXMuQ2hhbmdlc092ZXJsYXAoY2hhbmdlc1tpXSwgY2hhbmdlc1tpICsgMV0sIG1lcmdlZENoYW5nZUFycikpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzW2ldID0gbWVyZ2VkQ2hhbmdlQXJyWzBdO1xuICAgICAgICAgICAgICAgIGNoYW5nZXMuc3BsaWNlKGkgKyAxLCAxKTtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2hpZnQgY2hhbmdlcyBiYWNrIHVwIHVudGlsIHdlIGhpdCBlbXB0eSBvciB3aGl0ZXNwYWNlLW9ubHkgbGluZXNcbiAgICAgICAgZm9yICh2YXIgaSA9IGNoYW5nZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBjaGFuZ2VzW2ldO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsU3RvcCA9IDA7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRTdG9wID0gMDtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2Q2hhbmdlID0gY2hhbmdlc1tpIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDaGFuZ2Uub3JpZ2luYWxMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RvcCA9IHByZXZDaGFuZ2Uub3JpZ2luYWxTdGFydCArIHByZXZDaGFuZ2Uub3JpZ2luYWxMZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcmV2Q2hhbmdlLm1vZGlmaWVkTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZFN0b3AgPSBwcmV2Q2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBwcmV2Q2hhbmdlLm1vZGlmaWVkTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaGVja09yaWdpbmFsID0gY2hhbmdlLm9yaWdpbmFsTGVuZ3RoID4gMDtcbiAgICAgICAgICAgIHZhciBjaGVja01vZGlmaWVkID0gY2hhbmdlLm1vZGlmaWVkTGVuZ3RoID4gMDtcbiAgICAgICAgICAgIHZhciBiZXN0RGVsdGEgPSAwO1xuICAgICAgICAgICAgdmFyIGJlc3RTY29yZSA9IHRoaXMuX2JvdW5kYXJ5U2NvcmUoY2hhbmdlLm9yaWdpbmFsU3RhcnQsIGNoYW5nZS5vcmlnaW5hbExlbmd0aCwgY2hhbmdlLm1vZGlmaWVkU3RhcnQsIGNoYW5nZS5tb2RpZmllZExlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBkZWx0YSA9IDE7OyBkZWx0YSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsU3RhcnQgPSBjaGFuZ2Uub3JpZ2luYWxTdGFydCAtIGRlbHRhO1xuICAgICAgICAgICAgICAgIHZhciBtb2RpZmllZFN0YXJ0ID0gY2hhbmdlLm1vZGlmaWVkU3RhcnQgLSBkZWx0YTtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTdGFydCA8IG9yaWdpbmFsU3RvcCB8fCBtb2RpZmllZFN0YXJ0IDwgbW9kaWZpZWRTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tPcmlnaW5hbCAmJiAhdGhpcy5PcmlnaW5hbEVsZW1lbnRzQXJlRXF1YWwob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxTdGFydCArIGNoYW5nZS5vcmlnaW5hbExlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGVja01vZGlmaWVkICYmICF0aGlzLk1vZGlmaWVkRWxlbWVudHNBcmVFcXVhbChtb2RpZmllZFN0YXJ0LCBtb2RpZmllZFN0YXJ0ICsgY2hhbmdlLm1vZGlmaWVkTGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gdGhpcy5fYm91bmRhcnlTY29yZShvcmlnaW5hbFN0YXJ0LCBjaGFuZ2Uub3JpZ2luYWxMZW5ndGgsIG1vZGlmaWVkU3RhcnQsIGNoYW5nZS5tb2RpZmllZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBiZXN0RGVsdGEgPSBkZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2Uub3JpZ2luYWxTdGFydCAtPSBiZXN0RGVsdGE7XG4gICAgICAgICAgICBjaGFuZ2UubW9kaWZpZWRTdGFydCAtPSBiZXN0RGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5fT3JpZ2luYWxJc0JvdW5kYXJ5ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8PSAwIHx8IGluZGV4ID49IHRoaXMuT3JpZ2luYWxTZXF1ZW5jZS5nZXRMZW5ndGgoKSAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5PcmlnaW5hbFNlcXVlbmNlLmdldEVsZW1lbnRBdEluZGV4KGluZGV4KTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgJiYgL15cXHMqJC8udGVzdChlbGVtZW50KSk7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5fT3JpZ2luYWxSZWdpb25Jc0JvdW5kYXJ5ID0gZnVuY3Rpb24gKG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsTGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl9PcmlnaW5hbElzQm91bmRhcnkob3JpZ2luYWxTdGFydCkgfHwgdGhpcy5fT3JpZ2luYWxJc0JvdW5kYXJ5KG9yaWdpbmFsU3RhcnQgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yaWdpbmFsTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsRW5kID0gb3JpZ2luYWxTdGFydCArIG9yaWdpbmFsTGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHRoaXMuX09yaWdpbmFsSXNCb3VuZGFyeShvcmlnaW5hbEVuZCAtIDEpIHx8IHRoaXMuX09yaWdpbmFsSXNCb3VuZGFyeShvcmlnaW5hbEVuZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5fTW9kaWZpZWRJc0JvdW5kYXJ5ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8PSAwIHx8IGluZGV4ID49IHRoaXMuTW9kaWZpZWRTZXF1ZW5jZS5nZXRMZW5ndGgoKSAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5Nb2RpZmllZFNlcXVlbmNlLmdldEVsZW1lbnRBdEluZGV4KGluZGV4KTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgJiYgL15cXHMqJC8udGVzdChlbGVtZW50KSk7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5fTW9kaWZpZWRSZWdpb25Jc0JvdW5kYXJ5ID0gZnVuY3Rpb24gKG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkTGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl9Nb2RpZmllZElzQm91bmRhcnkobW9kaWZpZWRTdGFydCkgfHwgdGhpcy5fTW9kaWZpZWRJc0JvdW5kYXJ5KG1vZGlmaWVkU3RhcnQgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGlmaWVkTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG1vZGlmaWVkRW5kID0gbW9kaWZpZWRTdGFydCArIG1vZGlmaWVkTGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHRoaXMuX01vZGlmaWVkSXNCb3VuZGFyeShtb2RpZmllZEVuZCAtIDEpIHx8IHRoaXMuX01vZGlmaWVkSXNCb3VuZGFyeShtb2RpZmllZEVuZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBMY3NEaWZmLnByb3RvdHlwZS5fYm91bmRhcnlTY29yZSA9IGZ1bmN0aW9uIChvcmlnaW5hbFN0YXJ0LCBvcmlnaW5hbExlbmd0aCwgbW9kaWZpZWRTdGFydCwgbW9kaWZpZWRMZW5ndGgpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsU2NvcmUgPSAodGhpcy5fT3JpZ2luYWxSZWdpb25Jc0JvdW5kYXJ5KG9yaWdpbmFsU3RhcnQsIG9yaWdpbmFsTGVuZ3RoKSA/IDEgOiAwKTtcbiAgICAgICAgdmFyIG1vZGlmaWVkU2NvcmUgPSAodGhpcy5fTW9kaWZpZWRSZWdpb25Jc0JvdW5kYXJ5KG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkTGVuZ3RoKSA/IDEgOiAwKTtcbiAgICAgICAgcmV0dXJuIChvcmlnaW5hbFNjb3JlICsgbW9kaWZpZWRTY29yZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb25jYXRlbmF0ZXMgdGhlIHR3byBpbnB1dCBEaWZmQ2hhbmdlIGxpc3RzIGFuZCByZXR1cm5zIHRoZSByZXN1bHRpbmdcbiAgICAgKiBsaXN0LlxuICAgICAqIEBwYXJhbSBUaGUgbGVmdCBjaGFuZ2VzXG4gICAgICogQHBhcmFtIFRoZSByaWdodCBjaGFuZ2VzXG4gICAgICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBsaXN0XG4gICAgICovXG4gICAgTGNzRGlmZi5wcm90b3R5cGUuQ29uY2F0ZW5hdGVDaGFuZ2VzID0gZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHZhciBtZXJnZWRDaGFuZ2VBcnIgPSBbXTtcbiAgICAgICAgaWYgKGxlZnQubGVuZ3RoID09PSAwIHx8IHJpZ2h0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIChyaWdodC5sZW5ndGggPiAwKSA/IHJpZ2h0IDogbGVmdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLkNoYW5nZXNPdmVybGFwKGxlZnRbbGVmdC5sZW5ndGggLSAxXSwgcmlnaHRbMF0sIG1lcmdlZENoYW5nZUFycikpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHdlIGJyZWFrIHRoZSBwcm9ibGVtIGRvd24gcmVjdXJzaXZlbHksIGl0IGlzIHBvc3NpYmxlIHRoYXQgd2VcbiAgICAgICAgICAgIC8vIG1pZ2h0IHJlY3Vyc2UgaW4gdGhlIG1pZGRsZSBvZiBhIGNoYW5nZSB0aGVyZWJ5IHNwbGl0dGluZyBpdCBpbnRvXG4gICAgICAgICAgICAvLyB0d28gY2hhbmdlcy4gSGVyZSBpbiB0aGUgY29tYmluaW5nIHN0YWdlLCB3ZSBkZXRlY3QgYW5kIGZ1c2UgdGhvc2VcbiAgICAgICAgICAgIC8vIGNoYW5nZXMgYmFjayB0b2dldGhlclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShsZWZ0Lmxlbmd0aCArIHJpZ2h0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgTXlBcnJheS5Db3B5KGxlZnQsIDAsIHJlc3VsdCwgMCwgbGVmdC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHJlc3VsdFtsZWZ0Lmxlbmd0aCAtIDFdID0gbWVyZ2VkQ2hhbmdlQXJyWzBdO1xuICAgICAgICAgICAgTXlBcnJheS5Db3B5KHJpZ2h0LCAxLCByZXN1bHQsIGxlZnQubGVuZ3RoLCByaWdodC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGxlZnQubGVuZ3RoICsgcmlnaHQubGVuZ3RoKTtcbiAgICAgICAgICAgIE15QXJyYXkuQ29weShsZWZ0LCAwLCByZXN1bHQsIDAsIGxlZnQubGVuZ3RoKTtcbiAgICAgICAgICAgIE15QXJyYXkuQ29weShyaWdodCwgMCwgcmVzdWx0LCBsZWZ0Lmxlbmd0aCwgcmlnaHQubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIGNoYW5nZXMgb3ZlcmxhcCBhbmQgY2FuIGJlIG1lcmdlZCBpbnRvIGEgc2luZ2xlXG4gICAgICogY2hhbmdlXG4gICAgICogQHBhcmFtIGxlZnQgVGhlIGxlZnQgY2hhbmdlXG4gICAgICogQHBhcmFtIHJpZ2h0IFRoZSByaWdodCBjaGFuZ2VcbiAgICAgKiBAcGFyYW0gbWVyZ2VkQ2hhbmdlIFRoZSBtZXJnZWQgY2hhbmdlIGlmIHRoZSB0d28gb3ZlcmxhcCwgbnVsbCBvdGhlcndpc2VcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB0d28gY2hhbmdlcyBvdmVybGFwXG4gICAgICovXG4gICAgTGNzRGlmZi5wcm90b3R5cGUuQ2hhbmdlc092ZXJsYXAgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQsIG1lcmdlZENoYW5nZUFycikge1xuICAgICAgICBEZWJ1Zy5Bc3NlcnQobGVmdC5vcmlnaW5hbFN0YXJ0IDw9IHJpZ2h0Lm9yaWdpbmFsU3RhcnQsICdMZWZ0IGNoYW5nZSBpcyBub3QgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHJpZ2h0IGNoYW5nZScpO1xuICAgICAgICBEZWJ1Zy5Bc3NlcnQobGVmdC5tb2RpZmllZFN0YXJ0IDw9IHJpZ2h0Lm1vZGlmaWVkU3RhcnQsICdMZWZ0IGNoYW5nZSBpcyBub3QgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHJpZ2h0IGNoYW5nZScpO1xuICAgICAgICBpZiAobGVmdC5vcmlnaW5hbFN0YXJ0ICsgbGVmdC5vcmlnaW5hbExlbmd0aCA+PSByaWdodC5vcmlnaW5hbFN0YXJ0IHx8IGxlZnQubW9kaWZpZWRTdGFydCArIGxlZnQubW9kaWZpZWRMZW5ndGggPj0gcmlnaHQubW9kaWZpZWRTdGFydCkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsU3RhcnQgPSBsZWZ0Lm9yaWdpbmFsU3RhcnQ7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMZW5ndGggPSBsZWZ0Lm9yaWdpbmFsTGVuZ3RoO1xuICAgICAgICAgICAgdmFyIG1vZGlmaWVkU3RhcnQgPSBsZWZ0Lm1vZGlmaWVkU3RhcnQ7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRMZW5ndGggPSBsZWZ0Lm1vZGlmaWVkTGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlZnQub3JpZ2luYWxTdGFydCArIGxlZnQub3JpZ2luYWxMZW5ndGggPj0gcmlnaHQub3JpZ2luYWxTdGFydCkge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsTGVuZ3RoID0gcmlnaHQub3JpZ2luYWxTdGFydCArIHJpZ2h0Lm9yaWdpbmFsTGVuZ3RoIC0gbGVmdC5vcmlnaW5hbFN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxlZnQubW9kaWZpZWRTdGFydCArIGxlZnQubW9kaWZpZWRMZW5ndGggPj0gcmlnaHQubW9kaWZpZWRTdGFydCkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkTGVuZ3RoID0gcmlnaHQubW9kaWZpZWRTdGFydCArIHJpZ2h0Lm1vZGlmaWVkTGVuZ3RoIC0gbGVmdC5tb2RpZmllZFN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVyZ2VkQ2hhbmdlQXJyWzBdID0gbmV3IERpZmZDaGFuZ2Uob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxMZW5ndGgsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkTGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWVyZ2VkQ2hhbmdlQXJyWzBdID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGVscGVyIG1ldGhvZCB1c2VkIHRvIGNsaXAgYSBkaWFnb25hbCBpbmRleCB0byB0aGUgcmFuZ2Ugb2YgdmFsaWRcbiAgICAgKiBkaWFnb25hbHMuIFRoaXMgYWxzbyBkZWNpZGVzIHdoZXRoZXIgb3Igbm90IHRoZSBkaWFnb25hbCBpbmRleCxcbiAgICAgKiBpZiBpdCBleGNlZWRzIHRoZSBib3VuZGFyeSwgc2hvdWxkIGJlIGNsaXBwZWQgdG8gdGhlIGJvdW5kYXJ5IG9yIGNsaXBwZWRcbiAgICAgKiBvbmUgaW5zaWRlIHRoZSBib3VuZGFyeSBkZXBlbmRpbmcgb24gdGhlIEV2ZW4vT2RkIHN0YXR1cyBvZiB0aGUgYm91bmRhcnlcbiAgICAgKiBhbmQgbnVtRGlmZmVyZW5jZXMuXG4gICAgICogQHBhcmFtIGRpYWdvbmFsIFRoZSBpbmRleCBvZiB0aGUgZGlhZ29uYWwgdG8gY2xpcC5cbiAgICAgKiBAcGFyYW0gbnVtRGlmZmVyZW5jZXMgVGhlIGN1cnJlbnQgbnVtYmVyIG9mIGRpZmZlcmVuY2VzIGJlaW5nIGl0ZXJhdGVkIHVwb24uXG4gICAgICogQHBhcmFtIGRpYWdvbmFsQmFzZUluZGV4IFRoZSBiYXNlIHJlZmVyZW5jZSBkaWFnb25hbC5cbiAgICAgKiBAcGFyYW0gbnVtRGlhZ29uYWxzIFRoZSB0b3RhbCBudW1iZXIgb2YgZGlhZ29uYWxzLlxuICAgICAqIEByZXR1cm5zIFRoZSBjbGlwcGVkIGRpYWdvbmFsIGluZGV4LlxuICAgICAqL1xuICAgIExjc0RpZmYucHJvdG90eXBlLkNsaXBEaWFnb25hbEJvdW5kID0gZnVuY3Rpb24gKGRpYWdvbmFsLCBudW1EaWZmZXJlbmNlcywgZGlhZ29uYWxCYXNlSW5kZXgsIG51bURpYWdvbmFscykge1xuICAgICAgICBpZiAoZGlhZ29uYWwgPj0gMCAmJiBkaWFnb25hbCA8IG51bURpYWdvbmFscykge1xuICAgICAgICAgICAgLy8gTm90aGluZyB0byBjbGlwLCBpdHMgaW4gcmFuZ2VcbiAgICAgICAgICAgIHJldHVybiBkaWFnb25hbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaWFnb25hbHNCZWxvdzogVGhlIG51bWJlciBvZiBkaWFnb25hbHMgYmVsb3cgdGhlIHJlZmVyZW5jZSBkaWFnb25hbFxuICAgICAgICAvLyBkaWFnb25hbHNBYm92ZTogVGhlIG51bWJlciBvZiBkaWFnb25hbHMgYWJvdmUgdGhlIHJlZmVyZW5jZSBkaWFnb25hbFxuICAgICAgICB2YXIgZGlhZ29uYWxzQmVsb3cgPSBkaWFnb25hbEJhc2VJbmRleDtcbiAgICAgICAgdmFyIGRpYWdvbmFsc0Fib3ZlID0gbnVtRGlhZ29uYWxzIC0gZGlhZ29uYWxCYXNlSW5kZXggLSAxO1xuICAgICAgICB2YXIgZGlmZkV2ZW4gPSAobnVtRGlmZmVyZW5jZXMgJSAyID09PSAwKTtcbiAgICAgICAgaWYgKGRpYWdvbmFsIDwgMCkge1xuICAgICAgICAgICAgdmFyIGxvd2VyQm91bmRFdmVuID0gKGRpYWdvbmFsc0JlbG93ICUgMiA9PT0gMCk7XG4gICAgICAgICAgICByZXR1cm4gKGRpZmZFdmVuID09PSBsb3dlckJvdW5kRXZlbikgPyAwIDogMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciB1cHBlckJvdW5kRXZlbiA9IChkaWFnb25hbHNBYm92ZSAlIDIgPT09IDApO1xuICAgICAgICAgICAgcmV0dXJuIChkaWZmRXZlbiA9PT0gdXBwZXJCb3VuZEV2ZW4pID8gbnVtRGlhZ29uYWxzIC0gMSA6IG51bURpYWdvbmFscyAtIDI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMY3NEaWZmO1xufSgpKTtcbmV4cG9ydCB7IExjc0RpZmYgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBSZXByZXNlbnRzIGluZm9ybWF0aW9uIGFib3V0IGEgc3BlY2lmaWMgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBzZXF1ZW5jZXMuXG4gKi9cbnZhciBEaWZmQ2hhbmdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgRGlmZkNoYW5nZSB3aXRoIHRoZSBnaXZlbiBzZXF1ZW5jZSBpbmZvcm1hdGlvblxuICAgICAqIGFuZCBjb250ZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERpZmZDaGFuZ2Uob3JpZ2luYWxTdGFydCwgb3JpZ2luYWxMZW5ndGgsIG1vZGlmaWVkU3RhcnQsIG1vZGlmaWVkTGVuZ3RoKSB7XG4gICAgICAgIC8vRGVidWcuQXNzZXJ0KG9yaWdpbmFsTGVuZ3RoID4gMCB8fCBtb2RpZmllZExlbmd0aCA+IDAsIFwib3JpZ2luYWxMZW5ndGggYW5kIG1vZGlmaWVkTGVuZ3RoIGNhbm5vdCBib3RoIGJlIDw9IDBcIik7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTdGFydCA9IG9yaWdpbmFsU3RhcnQ7XG4gICAgICAgIHRoaXMub3JpZ2luYWxMZW5ndGggPSBvcmlnaW5hbExlbmd0aDtcbiAgICAgICAgdGhpcy5tb2RpZmllZFN0YXJ0ID0gbW9kaWZpZWRTdGFydDtcbiAgICAgICAgdGhpcy5tb2RpZmllZExlbmd0aCA9IG1vZGlmaWVkTGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZW5kIHBvaW50IChleGNsdXNpdmUpIG9mIHRoZSBjaGFuZ2UgaW4gdGhlIG9yaWdpbmFsIHNlcXVlbmNlLlxuICAgICAqL1xuICAgIERpZmZDaGFuZ2UucHJvdG90eXBlLmdldE9yaWdpbmFsRW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXJ0ICsgdGhpcy5vcmlnaW5hbExlbmd0aDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBlbmQgcG9pbnQgKGV4Y2x1c2l2ZSkgb2YgdGhlIGNoYW5nZSBpbiB0aGUgbW9kaWZpZWQgc2VxdWVuY2UuXG4gICAgICovXG4gICAgRGlmZkNoYW5nZS5wcm90b3R5cGUuZ2V0TW9kaWZpZWRFbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGlmaWVkU3RhcnQgKyB0aGlzLm1vZGlmaWVkTGVuZ3RoO1xuICAgIH07XG4gICAgcmV0dXJuIERpZmZDaGFuZ2U7XG59KCkpO1xuZXhwb3J0IHsgRGlmZkNoYW5nZSB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vLyBBdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5IG9uIEV2ZW50RW1pdHRlciBieSBpbXBsZW1lbnRpbmcgYSBzdWJzZXQgb2YgdGhlIGludGVyZmFjZS5cbnZhciBFcnJvckhhbmRsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXJyb3JIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLnVuZXhwZWN0ZWRFcnJvckhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUubWVzc2FnZSArICdcXG5cXG4nICsgZS5zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRXJyb3JIYW5kbGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKGUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUub25VbmV4cGVjdGVkRXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnVuZXhwZWN0ZWRFcnJvckhhbmRsZXIoZSk7XG4gICAgICAgIHRoaXMuZW1pdChlKTtcbiAgICB9O1xuICAgIC8vIEZvciBleHRlcm5hbCBlcnJvcnMsIHdlIGRvbid0IHdhbnQgdGhlIGxpc3RlbmVycyB0byBiZSBjYWxsZWRcbiAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLm9uVW5leHBlY3RlZEV4dGVybmFsRXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnVuZXhwZWN0ZWRFcnJvckhhbmRsZXIoZSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXJyb3JIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCB7IEVycm9ySGFuZGxlciB9O1xuZXhwb3J0IHZhciBlcnJvckhhbmRsZXIgPSBuZXcgRXJyb3JIYW5kbGVyKCk7XG5leHBvcnQgZnVuY3Rpb24gb25VbmV4cGVjdGVkRXJyb3IoZSkge1xuICAgIC8vIGlnbm9yZSBlcnJvcnMgZnJvbSBjYW5jZWxsZWQgcHJvbWlzZXNcbiAgICBpZiAoIWlzUHJvbWlzZUNhbmNlbGVkRXJyb3IoZSkpIHtcbiAgICAgICAgZXJyb3JIYW5kbGVyLm9uVW5leHBlY3RlZEVycm9yKGUpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9uVW5leHBlY3RlZEV4dGVybmFsRXJyb3IoZSkge1xuICAgIC8vIGlnbm9yZSBlcnJvcnMgZnJvbSBjYW5jZWxsZWQgcHJvbWlzZXNcbiAgICBpZiAoIWlzUHJvbWlzZUNhbmNlbGVkRXJyb3IoZSkpIHtcbiAgICAgICAgZXJyb3JIYW5kbGVyLm9uVW5leHBlY3RlZEV4dGVybmFsRXJyb3IoZSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtRXJyb3JGb3JTZXJpYWxpemF0aW9uKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdmFyIG5hbWVfMSA9IGVycm9yLm5hbWUsIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICB2YXIgc3RhY2sgPSBlcnJvci5zdGFja3RyYWNlIHx8IGVycm9yLnN0YWNrO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJGlzRXJyb3I6IHRydWUsXG4gICAgICAgICAgICBuYW1lOiBuYW1lXzEsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IHN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIHJldHVybiBhcyBpc1xuICAgIHJldHVybiBlcnJvcjtcbn1cbnZhciBjYW5jZWxlZE5hbWUgPSAnQ2FuY2VsZWQnO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGVycm9yIGlzIGEgcHJvbWlzZSBpbiBjYW5jZWxlZCBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlQ2FuY2VsZWRFcnJvcihlcnJvcikge1xuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm5hbWUgPT09IGNhbmNlbGVkTmFtZSAmJiBlcnJvci5tZXNzYWdlID09PSBjYW5jZWxlZE5hbWU7XG59XG4vKipcbiAqIFJldHVybnMgYW4gZXJyb3IgdGhhdCBzaWduYWxzIGNhbmNlbGxhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbGVkKCkge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihjYW5jZWxlZE5hbWUpO1xuICAgIGVycm9yLm5hbWUgPSBlcnJvci5tZXNzYWdlO1xuICAgIHJldHVybiBlcnJvcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbGxlZ2FsQXJndW1lbnQobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJJbGxlZ2FsIGFyZ3VtZW50OiBcIiArIG5hbWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignSWxsZWdhbCBhcmd1bWVudCcpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpbGxlZ2FsU3RhdGUobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJJbGxlZ2FsIHN0YXRlOiBcIiArIG5hbWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignSWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgb25VbmV4cGVjdGVkRXJyb3IgfSBmcm9tICcuL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBvbmNlIGFzIG9uY2VGbiB9IGZyb20gJy4vZnVuY3Rpb25hbC5qcyc7XG5pbXBvcnQgeyBjb21iaW5lZERpc3Bvc2FibGUsIERpc3Bvc2FibGUsIHRvRGlzcG9zYWJsZSB9IGZyb20gJy4vbGlmZWN5Y2xlLmpzJztcbmltcG9ydCB7IExpbmtlZExpc3QgfSBmcm9tICcuL2xpbmtlZExpc3QuanMnO1xuZXhwb3J0IHZhciBFdmVudDtcbihmdW5jdGlvbiAoRXZlbnQpIHtcbiAgICB2YXIgX2Rpc3Bvc2FibGUgPSB7IGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHsgfSB9O1xuICAgIEV2ZW50Lk5vbmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfZGlzcG9zYWJsZTsgfTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBldmVudCwgcmV0dXJucyBhbm90aGVyIGV2ZW50IHdoaWNoIG9ubHkgZmlyZXMgb25jZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbmNlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmdzID09PSB2b2lkIDApIHsgdGhpc0FyZ3MgPSBudWxsOyB9XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMsIGluIGNhc2UgdGhlIGV2ZW50IGZpcmVzIGR1cmluZyB0aGUgbGlzdGVuZXIgY2FsbFxuICAgICAgICAgICAgdmFyIGRpZEZpcmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQgPSBldmVudChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChkaWRGaXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaWRGaXJlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpc0FyZ3MsIGUpO1xuICAgICAgICAgICAgfSwgbnVsbCwgZGlzcG9zYWJsZXMpO1xuICAgICAgICAgICAgaWYgKGRpZEZpcmUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRXZlbnQub25jZSA9IG9uY2U7XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gZXZlbnQgYW5kIGEgYG1hcGAgZnVuY3Rpb24sIHJldHVybnMgYW5vdGhlciBldmVudCB3aGljaCBtYXBzIGVhY2ggZWxlbWVudFxuICAgICAqIHRocm91Z2h0IHRoZSBtYXBwaW5nIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hcChldmVudCwgbWFwKSB7XG4gICAgICAgIHJldHVybiBzbmFwc2hvdChmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmdzID09PSB2b2lkIDApIHsgdGhpc0FyZ3MgPSBudWxsOyB9XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpc0FyZ3MsIG1hcChpKSk7IH0sIG51bGwsIGRpc3Bvc2FibGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEV2ZW50Lm1hcCA9IG1hcDtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBldmVudCBhbmQgYW4gYGVhY2hgIGZ1bmN0aW9uLCByZXR1cm5zIGFub3RoZXIgaWRlbnRpY2FsIGV2ZW50IGFuZCBjYWxsc1xuICAgICAqIHRoZSBgZWFjaGAgZnVuY3Rpb24gcGVyIGVhY2ggZWxlbWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmb3JFYWNoKGV2ZW50LCBlYWNoKSB7XG4gICAgICAgIHJldHVybiBzbmFwc2hvdChmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmdzID09PSB2b2lkIDApIHsgdGhpc0FyZ3MgPSBudWxsOyB9XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQoZnVuY3Rpb24gKGkpIHsgZWFjaChpKTsgbGlzdGVuZXIuY2FsbCh0aGlzQXJncywgaSk7IH0sIG51bGwsIGRpc3Bvc2FibGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEV2ZW50LmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihldmVudCwgZmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBzbmFwc2hvdChmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmdzID09PSB2b2lkIDApIHsgdGhpc0FyZ3MgPSBudWxsOyB9XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGZpbHRlcihlKSAmJiBsaXN0ZW5lci5jYWxsKHRoaXNBcmdzLCBlKTsgfSwgbnVsbCwgZGlzcG9zYWJsZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRXZlbnQuZmlsdGVyID0gZmlsdGVyO1xuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIGV2ZW50LCByZXR1cm5zIHRoZSBzYW1lIGV2ZW50IGJ1dCB0eXBlZCBhcyBgRXZlbnQ8dm9pZD5gLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNpZ25hbChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICAgIEV2ZW50LnNpZ25hbCA9IHNpZ25hbDtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIGNvbGxlY3Rpb24gb2YgZXZlbnRzLCByZXR1cm5zIGEgc2luZ2xlIGV2ZW50IHdoaWNoIGVtaXRzXG4gICAgICogd2hlbmV2ZXIgYW55IG9mIHRoZSBwcm92aWRlZCBldmVudHMgZW1pdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbnkoKSB7XG4gICAgICAgIHZhciBldmVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGV2ZW50c1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmdzID09PSB2b2lkIDApIHsgdGhpc0FyZ3MgPSBudWxsOyB9XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZWREaXNwb3NhYmxlKGV2ZW50cy5tYXAoZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBldmVudChmdW5jdGlvbiAoZSkgeyByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzQXJncywgZSk7IH0sIG51bGwsIGRpc3Bvc2FibGVzKTsgfSkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBFdmVudC5hbnkgPSBhbnk7XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gZXZlbnQgYW5kIGEgYG1lcmdlYCBmdW5jdGlvbiwgcmV0dXJucyBhbm90aGVyIGV2ZW50IHdoaWNoIG1hcHMgZWFjaCBlbGVtZW50XG4gICAgICogYW5kIHRoZSBjdW1tdWxhdGl2ZSByZXN1bHQgdGhyb3VnaHQgdGhlIGBtZXJnZWAgZnVuY3Rpb24uIFNpbWlsYXIgdG8gYG1hcGAsIGJ1dCB3aXRoIG1lbW9yeS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWR1Y2UoZXZlbnQsIG1lcmdlLCBpbml0aWFsKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSBpbml0aWFsO1xuICAgICAgICByZXR1cm4gbWFwKGV2ZW50LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgb3V0cHV0ID0gbWVyZ2Uob3V0cHV0LCBlKTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFdmVudC5yZWR1Y2UgPSByZWR1Y2U7XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBjaGFpbiBvZiBldmVudCBwcm9jZXNzaW5nIGZ1bmN0aW9ucyAoZmlsdGVyLCBtYXAsIGV0YyksIGVhY2hcbiAgICAgKiBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgcGVyIGV2ZW50ICYgcGVyIGxpc3RlbmVyLiBTbmFwc2hvdHRpbmcgYW4gZXZlbnRcbiAgICAgKiBjaGFpbiBhbGxvd3MgZWFjaCBmdW5jdGlvbiB0byBiZSBpbnZva2VkIGp1c3Qgb25jZSBwZXIgZXZlbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc25hcHNob3QoZXZlbnQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgZW1pdHRlciA9IG5ldyBFbWl0dGVyKHtcbiAgICAgICAgICAgIG9uRmlyc3RMaXN0ZW5lckFkZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gZXZlbnQoZW1pdHRlci5maXJlLCBlbWl0dGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxhc3RMaXN0ZW5lclJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBFdmVudC5zbmFwc2hvdCA9IHNuYXBzaG90O1xuICAgIGZ1bmN0aW9uIGRlYm91bmNlKGV2ZW50LCBtZXJnZSwgZGVsYXksIGxlYWRpbmcsIGxlYWtXYXJuaW5nVGhyZXNob2xkKSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMTAwOyB9XG4gICAgICAgIGlmIChsZWFkaW5nID09PSB2b2lkIDApIHsgbGVhZGluZyA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICAgIHZhciBvdXRwdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBoYW5kbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBudW1EZWJvdW5jZWRDYWxscyA9IDA7XG4gICAgICAgIHZhciBlbWl0dGVyID0gbmV3IEVtaXR0ZXIoe1xuICAgICAgICAgICAgbGVha1dhcm5pbmdUaHJlc2hvbGQ6IGxlYWtXYXJuaW5nVGhyZXNob2xkLFxuICAgICAgICAgICAgb25GaXJzdExpc3RlbmVyQWRkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gZXZlbnQoZnVuY3Rpb24gKGN1cikge1xuICAgICAgICAgICAgICAgICAgICBudW1EZWJvdW5jZWRDYWxscysrO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtZXJnZShvdXRwdXQsIGN1cik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWFkaW5nICYmICFoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZmlyZShvdXRwdXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfb3V0cHV0ID0gb3V0cHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZWFkaW5nIHx8IG51bURlYm91bmNlZENhbGxzID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZmlyZShfb3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG51bURlYm91bmNlZENhbGxzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTGFzdExpc3RlbmVyUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBFdmVudC5kZWJvdW5jZSA9IGRlYm91bmNlO1xuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIGV2ZW50LCBpdCByZXR1cm5zIGFub3RoZXIgZXZlbnQgd2hpY2ggZmlyZXMgb25seSBvbmNlIGFuZCBhcyBzb29uIGFzXG4gICAgICogdGhlIGlucHV0IGV2ZW50IGVtaXRzLiBUaGUgZXZlbnQgZGF0YSBpcyB0aGUgbnVtYmVyIG9mIG1pbGxpcyBpdCB0b29rIGZvciB0aGVcbiAgICAgKiBldmVudCB0byBmaXJlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0b3B3YXRjaChldmVudCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIG1hcChvbmNlKGV2ZW50KSwgZnVuY3Rpb24gKF8pIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnQ7IH0pO1xuICAgIH1cbiAgICBFdmVudC5zdG9wd2F0Y2ggPSBzdG9wd2F0Y2g7XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gZXZlbnQsIGl0IHJldHVybnMgYW5vdGhlciBldmVudCB3aGljaCBmaXJlcyBvbmx5IHdoZW4gdGhlIGV2ZW50XG4gICAgICogZWxlbWVudCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxhdGNoKGV2ZW50KSB7XG4gICAgICAgIHZhciBmaXJzdENhbGwgPSB0cnVlO1xuICAgICAgICB2YXIgY2FjaGU7XG4gICAgICAgIHJldHVybiBmaWx0ZXIoZXZlbnQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHNob3VsZEVtaXQgPSBmaXJzdENhbGwgfHwgdmFsdWUgIT09IGNhY2hlO1xuICAgICAgICAgICAgZmlyc3RDYWxsID0gZmFsc2U7XG4gICAgICAgICAgICBjYWNoZSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHNob3VsZEVtaXQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFdmVudC5sYXRjaCA9IGxhdGNoO1xuICAgIC8qKlxuICAgICAqIEJ1ZmZlcnMgdGhlIHByb3ZpZGVkIGV2ZW50IHVudGlsIGEgZmlyc3QgbGlzdGVuZXIgY29tZXNcbiAgICAgKiBhbG9uZywgYXQgd2hpY2ggcG9pbnQgZmlyZSBhbGwgdGhlIGV2ZW50cyBhdCBvbmNlIGFuZFxuICAgICAqIHBpcGUgdGhlIGV2ZW50IGZyb20gdGhlbiBvbi5cbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBjb25zdCBlbWl0dGVyID0gbmV3IEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgICAqIGNvbnN0IGV2ZW50ID0gZW1pdHRlci5ldmVudDtcbiAgICAgKiBjb25zdCBidWZmZXJlZEV2ZW50ID0gYnVmZmVyKGV2ZW50KTtcbiAgICAgKlxuICAgICAqIGVtaXR0ZXIuZmlyZSgxKTtcbiAgICAgKiBlbWl0dGVyLmZpcmUoMik7XG4gICAgICogZW1pdHRlci5maXJlKDMpO1xuICAgICAqIC8vIG5vdGhpbmcuLi5cbiAgICAgKlxuICAgICAqIGNvbnN0IGxpc3RlbmVyID0gYnVmZmVyZWRFdmVudChudW0gPT4gY29uc29sZS5sb2cobnVtKSk7XG4gICAgICogLy8gMSwgMiwgM1xuICAgICAqXG4gICAgICogZW1pdHRlci5maXJlKDQpO1xuICAgICAqIC8vIDRcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBidWZmZXIoZXZlbnQsIG5leHRUaWNrLCBfYnVmZmVyKSB7XG4gICAgICAgIGlmIChuZXh0VGljayA9PT0gdm9pZCAwKSB7IG5leHRUaWNrID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKF9idWZmZXIgPT09IHZvaWQgMCkgeyBfYnVmZmVyID0gW107IH1cbiAgICAgICAgdmFyIGJ1ZmZlciA9IF9idWZmZXIuc2xpY2UoKTtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZXZlbnQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZmlyZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZW1pdHRlci5maXJlKGUpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBlbWl0dGVyID0gbmV3IEVtaXR0ZXIoe1xuICAgICAgICAgICAgb25GaXJzdExpc3RlbmVyQWRkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGV2ZW50KGZ1bmN0aW9uIChlKSB7IHJldHVybiBlbWl0dGVyLmZpcmUoZSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZpcnN0TGlzdGVuZXJEaWRBZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0VGljaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmbHVzaCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTGFzdExpc3RlbmVyUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIEV2ZW50LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAvKipcbiAgICAgKiBTaW1pbGFyIHRvIGBidWZmZXJgIGJ1dCBpdCBidWZmZXJzIGluZGVmaW5pdGVseSBhbmQgcmVwZWF0c1xuICAgICAqIHRoZSBidWZmZXJlZCBldmVudHMgdG8gZXZlcnkgbmV3IGxpc3RlbmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVjaG8oZXZlbnQsIG5leHRUaWNrLCBidWZmZXIpIHtcbiAgICAgICAgaWYgKG5leHRUaWNrID09PSB2b2lkIDApIHsgbmV4dFRpY2sgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoYnVmZmVyID09PSB2b2lkIDApIHsgYnVmZmVyID0gW107IH1cbiAgICAgICAgYnVmZmVyID0gYnVmZmVyLnNsaWNlKCk7XG4gICAgICAgIGV2ZW50KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBidWZmZXIucHVzaChlKTtcbiAgICAgICAgICAgIGVtaXR0ZXIuZmlyZShlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBmbHVzaCA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MpIHsgcmV0dXJuIGJ1ZmZlci5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXNBcmdzLCBlKTsgfSk7IH07XG4gICAgICAgIHZhciBlbWl0dGVyID0gbmV3IEVtaXR0ZXIoe1xuICAgICAgICAgICAgb25MaXN0ZW5lckRpZEFkZDogZnVuY3Rpb24gKGVtaXR0ZXIsIGxpc3RlbmVyLCB0aGlzQXJncykge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0VGljaykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZsdXNoKGxpc3RlbmVyLCB0aGlzQXJncyk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmx1c2gobGlzdGVuZXIsIHRoaXNBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZW1pdHRlci5ldmVudDtcbiAgICB9XG4gICAgRXZlbnQuZWNobyA9IGVjaG87XG4gICAgdmFyIENoYWluYWJsZUV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDaGFpbmFibGVFdmVudChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIENoYWluYWJsZUV2ZW50LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhaW5hYmxlRXZlbnQobWFwKHRoaXMuZXZlbnQsIGZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIENoYWluYWJsZUV2ZW50LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENoYWluYWJsZUV2ZW50KGZvckVhY2godGhpcy5ldmVudCwgZm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFpbmFibGVFdmVudChmaWx0ZXIodGhpcy5ldmVudCwgZm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChtZXJnZSwgaW5pdGlhbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFpbmFibGVFdmVudChyZWR1Y2UodGhpcy5ldmVudCwgbWVyZ2UsIGluaXRpYWwpKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLmxhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFpbmFibGVFdmVudChsYXRjaCh0aGlzLmV2ZW50KSk7XG4gICAgICAgIH07XG4gICAgICAgIENoYWluYWJsZUV2ZW50LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2hhaW5hYmxlRXZlbnQucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgcmV0dXJuIG9uY2UodGhpcy5ldmVudCkobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDaGFpbmFibGVFdmVudDtcbiAgICB9KCkpO1xuICAgIGZ1bmN0aW9uIGNoYWluKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2hhaW5hYmxlRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgICBFdmVudC5jaGFpbiA9IGNoYWluO1xuICAgIGZ1bmN0aW9uIGZyb21Ob2RlRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGV2ZW50TmFtZSwgbWFwKSB7XG4gICAgICAgIGlmIChtYXAgPT09IHZvaWQgMCkgeyBtYXAgPSBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIGlkOyB9OyB9XG4gICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZmlyZShtYXAuYXBwbHkodm9pZCAwLCBhcmdzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvbkZpcnN0TGlzdGVuZXJBZGQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBlbWl0dGVyLm9uKGV2ZW50TmFtZSwgZm4pOyB9O1xuICAgICAgICB2YXIgb25MYXN0TGlzdGVuZXJSZW1vdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgZm4pOyB9O1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEVtaXR0ZXIoeyBvbkZpcnN0TGlzdGVuZXJBZGQ6IG9uRmlyc3RMaXN0ZW5lckFkZCwgb25MYXN0TGlzdGVuZXJSZW1vdmU6IG9uTGFzdExpc3RlbmVyUmVtb3ZlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmV2ZW50O1xuICAgIH1cbiAgICBFdmVudC5mcm9tTm9kZUV2ZW50RW1pdHRlciA9IGZyb21Ob2RlRXZlbnRFbWl0dGVyO1xuICAgIGZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB2YXIgc2hvdWxkRW1pdCA9IGZhbHNlO1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNob3VsZEVtaXQpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtaXR0ZXIuZmlyZSh1bmRlZmluZWQpOyB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZmlyZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2hvdWxkRW1pdCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBFdmVudC5mcm9tUHJvbWlzZSA9IGZyb21Qcm9taXNlO1xuICAgIGZ1bmN0aW9uIHRvUHJvbWlzZShldmVudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIG9uY2UoZXZlbnQpKGMpOyB9KTtcbiAgICB9XG4gICAgRXZlbnQudG9Qcm9taXNlID0gdG9Qcm9taXNlO1xufSkoRXZlbnQgfHwgKEV2ZW50ID0ge30pKTtcbnZhciBfZ2xvYmFsTGVha1dhcm5pbmdUaHJlc2hvbGQgPSAtMTtcbnZhciBMZWFrYWdlTW9uaXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMZWFrYWdlTW9uaXRvcihjdXN0b21UaHJlc2hvbGQsIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxOCkuc2xpY2UoMiwgNSk7IH1cbiAgICAgICAgdGhpcy5jdXN0b21UaHJlc2hvbGQgPSBjdXN0b21UaHJlc2hvbGQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX3dhcm5Db3VudGRvd24gPSAwO1xuICAgIH1cbiAgICBMZWFrYWdlTW9uaXRvci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YWNrcykge1xuICAgICAgICAgICAgdGhpcy5fc3RhY2tzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExlYWthZ2VNb25pdG9yLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uIChsaXN0ZW5lckNvdW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB0aHJlc2hvbGQgPSBfZ2xvYmFsTGVha1dhcm5pbmdUaHJlc2hvbGQ7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXN0b21UaHJlc2hvbGQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQgPSB0aGlzLmN1c3RvbVRocmVzaG9sZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhyZXNob2xkIDw9IDAgfHwgbGlzdGVuZXJDb3VudCA8IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3N0YWNrcykge1xuICAgICAgICAgICAgdGhpcy5fc3RhY2tzID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrLnNwbGl0KCdcXG4nKS5zbGljZSgzKS5qb2luKCdcXG4nKTtcbiAgICAgICAgdmFyIGNvdW50ID0gKHRoaXMuX3N0YWNrcy5nZXQoc3RhY2spIHx8IDApO1xuICAgICAgICB0aGlzLl9zdGFja3Muc2V0KHN0YWNrLCBjb3VudCArIDEpO1xuICAgICAgICB0aGlzLl93YXJuQ291bnRkb3duIC09IDE7XG4gICAgICAgIGlmICh0aGlzLl93YXJuQ291bnRkb3duIDw9IDApIHtcbiAgICAgICAgICAgIC8vIG9ubHkgd2FybiBvbiBmaXJzdCBleGNlZWQgYW5kIHRoZW4gZXZlcnkgdGltZSB0aGUgbGltaXRcbiAgICAgICAgICAgIC8vIGlzIGV4Y2VlZGVkIGJ5IDUwJSBhZ2FpblxuICAgICAgICAgICAgdGhpcy5fd2FybkNvdW50ZG93biA9IHRocmVzaG9sZCAqIDAuNTtcbiAgICAgICAgICAgIC8vIGZpbmQgbW9zdCBmcmVxdWVudCBsaXN0ZW5lciBhbmQgcHJpbnQgd2FybmluZ1xuICAgICAgICAgICAgdmFyIHRvcFN0YWNrXzE7XG4gICAgICAgICAgICB2YXIgdG9wQ291bnRfMSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9zdGFja3MuZm9yRWFjaChmdW5jdGlvbiAoY291bnQsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b3BTdGFja18xIHx8IHRvcENvdW50XzEgPCBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB0b3BTdGFja18xID0gc3RhY2s7XG4gICAgICAgICAgICAgICAgICAgIHRvcENvdW50XzEgPSBjb3VudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltcIiArIHRoaXMubmFtZSArIFwiXSBwb3RlbnRpYWwgbGlzdGVuZXIgTEVBSyBkZXRlY3RlZCwgaGF2aW5nIFwiICsgbGlzdGVuZXJDb3VudCArIFwiIGxpc3RlbmVycyBhbHJlYWR5LiBNT1NUIGZyZXF1ZW50IGxpc3RlbmVyIChcIiArIHRvcENvdW50XzEgKyBcIik6XCIpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKHRvcFN0YWNrXzEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAoX3RoaXMuX3N0YWNrcy5nZXQoc3RhY2spIHx8IDApO1xuICAgICAgICAgICAgX3RoaXMuX3N0YWNrcy5zZXQoc3RhY2ssIGNvdW50IC0gMSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gTGVha2FnZU1vbml0b3I7XG59KCkpO1xuLyoqXG4gKiBUaGUgRW1pdHRlciBjYW4gYmUgdXNlZCB0byBleHBvc2UgYW4gRXZlbnQgdG8gdGhlIHB1YmxpY1xuICogdG8gZmlyZSBpdCBmcm9tIHRoZSBpbnNpZGVzLlxuICogU2FtcGxlOlxuICAgIGNsYXNzIERvY3VtZW50IHtcblxuICAgICAgICBwcml2YXRlIF9vbkRpZENoYW5nZSA9IG5ldyBFbWl0dGVyPCh2YWx1ZTpzdHJpbmcpPT5hbnk+KCk7XG5cbiAgICAgICAgcHVibGljIG9uRGlkQ2hhbmdlID0gdGhpcy5fb25EaWRDaGFuZ2UuZXZlbnQ7XG5cbiAgICAgICAgLy8gZ2V0dGVyLXN0eWxlXG4gICAgICAgIC8vIGdldCBvbkRpZENoYW5nZSgpOiBFdmVudDwodmFsdWU6c3RyaW5nKT0+YW55PiB7XG4gICAgICAgIC8vIFx0cmV0dXJuIHRoaXMuX29uRGlkQ2hhbmdlLmV2ZW50O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZG9JdCgpIHtcbiAgICAgICAgICAgIC8vLi4uXG4gICAgICAgICAgICB0aGlzLl9vbkRpZENoYW5nZS5maXJlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAqL1xudmFyIEVtaXR0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW1pdHRlcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLl9sZWFrYWdlTW9uID0gX2dsb2JhbExlYWtXYXJuaW5nVGhyZXNob2xkID4gMFxuICAgICAgICAgICAgPyBuZXcgTGVha2FnZU1vbml0b3IodGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLmxlYWtXYXJuaW5nVGhyZXNob2xkKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbWl0dGVyLnByb3RvdHlwZSwgXCJldmVudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGb3IgdGhlIHB1YmxpYyB0byBhbGxvdyB0byBzdWJzY3JpYmVcbiAgICAgICAgICogdG8gZXZlbnRzIGZyb20gdGhpcyBFbWl0dGVyXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2V2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSBmdW5jdGlvbiAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9saXN0ZW5lcnMgPSBuZXcgTGlua2VkTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdExpc3RlbmVyID0gX3RoaXMuX2xpc3RlbmVycy5pc0VtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdExpc3RlbmVyICYmIF90aGlzLl9vcHRpb25zICYmIF90aGlzLl9vcHRpb25zLm9uRmlyc3RMaXN0ZW5lckFkZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29wdGlvbnMub25GaXJzdExpc3RlbmVyQWRkKF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlID0gX3RoaXMuX2xpc3RlbmVycy5wdXNoKCF0aGlzQXJncyA/IGxpc3RlbmVyIDogW2xpc3RlbmVyLCB0aGlzQXJnc10pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RMaXN0ZW5lciAmJiBfdGhpcy5fb3B0aW9ucyAmJiBfdGhpcy5fb3B0aW9ucy5vbkZpcnN0TGlzdGVuZXJEaWRBZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vcHRpb25zLm9uRmlyc3RMaXN0ZW5lckRpZEFkZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9vcHRpb25zICYmIF90aGlzLl9vcHRpb25zLm9uTGlzdGVuZXJEaWRBZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vcHRpb25zLm9uTGlzdGVuZXJEaWRBZGQoX3RoaXMsIGxpc3RlbmVyLCB0aGlzQXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgYW5kIHJlY29yZCB0aGlzIGVtaXR0ZXIgZm9yIHBvdGVudGlhbCBsZWFrYWdlXG4gICAgICAgICAgICAgICAgICAgIHZhciByZW1vdmVNb25pdG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2xlYWthZ2VNb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU1vbml0b3IgPSBfdGhpcy5fbGVha2FnZU1vbi5jaGVjayhfdGhpcy5fbGlzdGVuZXJzLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlTW9uaXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVNb25pdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwb3NlID0gRW1pdHRlci5fbm9vcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9kaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9vcHRpb25zICYmIF90aGlzLl9vcHRpb25zLm9uTGFzdExpc3RlbmVyUmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFzTGlzdGVuZXJzID0gKF90aGlzLl9saXN0ZW5lcnMgJiYgIV90aGlzLl9saXN0ZW5lcnMuaXNFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29wdGlvbnMub25MYXN0TGlzdGVuZXJSZW1vdmUoX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkaXNwb3NhYmxlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRvIGJlIGtlcHQgcHJpdmF0ZSB0byBmaXJlIGFuIGV2ZW50IHRvXG4gICAgICogc3Vic2NyaWJlcnNcbiAgICAgKi9cbiAgICBFbWl0dGVyLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vIHB1dCBhbGwgW2xpc3RlbmVyLGV2ZW50XS1wYWlycyBpbnRvIGRlbGl2ZXJ5IHF1ZXVlXG4gICAgICAgICAgICAvLyB0aGVuIGVtaXQgYWxsIGV2ZW50LiBhbiBpbm5lci9uZXN0ZWQgZXZlbnQgbWlnaHQgYmVcbiAgICAgICAgICAgIC8vIHRoZSBkcml2ZXIgb2YgdGhpc1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kZWxpdmVyeVF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVsaXZlcnlRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaXRlciA9IHRoaXMuX2xpc3RlbmVycy5pdGVyYXRvcigpLCBlID0gaXRlci5uZXh0KCk7ICFlLmRvbmU7IGUgPSBpdGVyLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlbGl2ZXJ5UXVldWUucHVzaChbZS52YWx1ZSwgZXZlbnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9kZWxpdmVyeVF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLl9kZWxpdmVyeVF1ZXVlLnNoaWZ0KCksIGxpc3RlbmVyID0gX2FbMF0sIGV2ZW50XzEgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHVuZGVmaW5lZCwgZXZlbnRfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lclswXS5jYWxsKGxpc3RlbmVyWzFdLCBldmVudF8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBvblVuZXhwZWN0ZWRFcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVtaXR0ZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZGVsaXZlcnlRdWV1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGVsaXZlcnlRdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sZWFrYWdlTW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWFrYWdlTW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XG4gICAgfTtcbiAgICBFbWl0dGVyLl9ub29wID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiBFbWl0dGVyO1xufSgpKTtcbmV4cG9ydCB7IEVtaXR0ZXIgfTtcbnZhciBFdmVudE11bHRpcGxleGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TXVsdGlwbGV4ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaGFzTGlzdGVuZXJzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gW107XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKHtcbiAgICAgICAgICAgIG9uRmlyc3RMaXN0ZW5lckFkZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMub25GaXJzdExpc3RlbmVyQWRkKCk7IH0sXG4gICAgICAgICAgICBvbkxhc3RMaXN0ZW5lclJlbW92ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMub25MYXN0TGlzdGVuZXJSZW1vdmUoKTsgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLCBcImV2ZW50XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0dGVyLmV2ZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBFdmVudE11bHRpcGxleGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGUgPSB7IGV2ZW50OiBldmVudCwgbGlzdGVuZXI6IG51bGwgfTtcbiAgICAgICAgdGhpcy5ldmVudHMucHVzaChlKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmhvb2soZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaGFzTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudW5ob29rKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGlkeCA9IF90aGlzLmV2ZW50cy5pbmRleE9mKGUpO1xuICAgICAgICAgICAgX3RoaXMuZXZlbnRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdG9EaXNwb3NhYmxlKG9uY2VGbihkaXNwb3NlKSk7XG4gICAgfTtcbiAgICBFdmVudE11bHRpcGxleGVyLnByb3RvdHlwZS5vbkZpcnN0TGlzdGVuZXJBZGQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaGFzTGlzdGVuZXJzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuaG9vayhlKTsgfSk7XG4gICAgfTtcbiAgICBFdmVudE11bHRpcGxleGVyLnByb3RvdHlwZS5vbkxhc3RMaXN0ZW5lclJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5oYXNMaXN0ZW5lcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMudW5ob29rKGUpOyB9KTtcbiAgICB9O1xuICAgIEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLmhvb2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlLmxpc3RlbmVyID0gZS5ldmVudChmdW5jdGlvbiAocikgeyByZXR1cm4gX3RoaXMuZW1pdHRlci5maXJlKHIpOyB9KTtcbiAgICB9O1xuICAgIEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLnVuaG9vayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmxpc3RlbmVyKSB7XG4gICAgICAgICAgICBlLmxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlLmxpc3RlbmVyID0gbnVsbDtcbiAgICB9O1xuICAgIEV2ZW50TXVsdGlwbGV4ZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRNdWx0aXBsZXhlcjtcbn0oKSk7XG5leHBvcnQgeyBFdmVudE11bHRpcGxleGVyIH07XG4vKipcbiAqIFRoZSBFdmVudEJ1ZmZlcmVyIGlzIHVzZWZ1bCBpbiBzaXR1YXRpb25zIGluIHdoaWNoIHlvdSB3YW50XG4gKiB0byBkZWxheSBmaXJpbmcgeW91ciBldmVudHMgZHVyaW5nIHNvbWUgY29kZS5cbiAqIFlvdSBjYW4gd3JhcCB0aGF0IGNvZGUgYW5kIGJlIHN1cmUgdGhhdCB0aGUgZXZlbnQgd2lsbCBub3RcbiAqIGJlIGZpcmVkIGR1cmluZyB0aGF0IHdyYXAuXG4gKlxuICogYGBgXG4gKiBjb25zdCBlbWl0dGVyOiBFbWl0dGVyO1xuICogY29uc3QgZGVsYXllciA9IG5ldyBFdmVudERlbGF5ZXIoKTtcbiAqIGNvbnN0IGRlbGF5ZWRFdmVudCA9IGRlbGF5ZXIud3JhcEV2ZW50KGVtaXR0ZXIuZXZlbnQpO1xuICpcbiAqIGRlbGF5ZWRFdmVudChjb25zb2xlLmxvZyk7XG4gKlxuICogZGVsYXllci5idWZmZXJFdmVudHMoKCkgPT4ge1xuICogICBlbWl0dGVyLmZpcmUoKTsgLy8gZXZlbnQgd2lsbCBub3QgYmUgZmlyZWQgeWV0XG4gKiB9KTtcbiAqXG4gKiAvLyBldmVudCB3aWxsIG9ubHkgYmUgZmlyZWQgYXQgdGhpcyBwb2ludFxuICogYGBgXG4gKi9cbnZhciBFdmVudEJ1ZmZlcmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50QnVmZmVyZXIoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbiAgICBFdmVudEJ1ZmZlcmVyLnByb3RvdHlwZS53cmFwRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0ZW5lciwgdGhpc0FyZ3MsIGRpc3Bvc2FibGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gX3RoaXMuYnVmZmVyc1tfdGhpcy5idWZmZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZnVuY3Rpb24gKCkgeyByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzQXJncywgaSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzQXJncywgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdW5kZWZpbmVkLCBkaXNwb3NhYmxlcyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBFdmVudEJ1ZmZlcmVyLnByb3RvdHlwZS5idWZmZXJFdmVudHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLmJ1ZmZlcnMucHVzaChidWZmZXIpO1xuICAgICAgICB2YXIgciA9IGZuKCk7XG4gICAgICAgIHRoaXMuYnVmZmVycy5wb3AoKTtcbiAgICAgICAgYnVmZmVyLmZvckVhY2goZnVuY3Rpb24gKGZsdXNoKSB7IHJldHVybiBmbHVzaCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRCdWZmZXJlcjtcbn0oKSk7XG5leHBvcnQgeyBFdmVudEJ1ZmZlcmVyIH07XG4vKipcbiAqIEEgUmVsYXkgaXMgYW4gZXZlbnQgZm9yd2FyZGVyIHdoaWNoIGZ1bmN0aW9ucyBhcyBhIHJlcGx1Z2FiYmxlIGV2ZW50IHBpcGUuXG4gKiBPbmNlIGNyZWF0ZWQsIHlvdSBjYW4gY29ubmVjdCBhbiBpbnB1dCBldmVudCB0byBpdCBhbmQgaXQgd2lsbCBzaW1wbHkgZm9yd2FyZFxuICogZXZlbnRzIGZyb20gdGhhdCBpbnB1dCBldmVudCB0aHJvdWdoIGl0cyBvd24gYGV2ZW50YCBwcm9wZXJ0eS4gVGhlIGBpbnB1dGBcbiAqIGNhbiBiZSBjaGFuZ2VkIGF0IGFueSBwb2ludCBpbiB0aW1lLlxuICovXG52YXIgUmVsYXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVsYXkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMubGlzdGVuaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5wdXRFdmVudCA9IEV2ZW50Lk5vbmU7XG4gICAgICAgIHRoaXMuaW5wdXRFdmVudExpc3RlbmVyID0gRGlzcG9zYWJsZS5Ob25lO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcih7XG4gICAgICAgICAgICBvbkZpcnN0TGlzdGVuZXJEaWRBZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5saXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF90aGlzLmlucHV0RXZlbnRMaXN0ZW5lciA9IF90aGlzLmlucHV0RXZlbnQoX3RoaXMuZW1pdHRlci5maXJlLCBfdGhpcy5lbWl0dGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxhc3RMaXN0ZW5lclJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmxpc3RlbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLmlucHV0RXZlbnRMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50ID0gdGhpcy5lbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVsYXkucHJvdG90eXBlLCBcImlucHV0XCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudCA9IGV2ZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50TGlzdGVuZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudExpc3RlbmVyID0gZXZlbnQodGhpcy5lbWl0dGVyLmZpcmUsIHRoaXMuZW1pdHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFJlbGF5LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlucHV0RXZlbnRMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVsYXk7XG59KCkpO1xuZXhwb3J0IHsgUmVsYXkgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBkaWRDYWxsID0gZmFsc2U7XG4gICAgdmFyIHJlc3VsdDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZGlkQ2FsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBkaWRDYWxsID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0ID0gZm4uYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5leHBvcnQgdmFyIEZJTiA9IHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuZXhwb3J0IHZhciBJdGVyYXRvcjtcbihmdW5jdGlvbiAoSXRlcmF0b3IpIHtcbiAgICB2YXIgX2VtcHR5ID0ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gRklOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIF9lbXB0eTtcbiAgICB9XG4gICAgSXRlcmF0b3IuZW1wdHkgPSBlbXB0eTtcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXksIGluZGV4LCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSAwOyB9XG4gICAgICAgIGlmIChsZW5ndGggPT09IHZvaWQgMCkgeyBsZW5ndGggPSBhcnJheS5sZW5ndGg7IH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGSU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogYXJyYXlbaW5kZXgrK10gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb20oZWxlbWVudHMpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybiBJdGVyYXRvci5mcm9tQXJyYXkoZWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9XG4gICAgfVxuICAgIEl0ZXJhdG9yLmZyb20gPSBmcm9tO1xuICAgIGZ1bmN0aW9uIG1hcChpdGVyYXRvciwgZm4pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGSU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IGZuKGVsZW1lbnQudmFsdWUpIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBJdGVyYXRvci5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRklOO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmbihlbGVtZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBlbGVtZW50LnZhbHVlIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIEl0ZXJhdG9yLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICBmb3IgKHZhciBuZXh0ID0gaXRlcmF0b3IubmV4dCgpOyAhbmV4dC5kb25lOyBuZXh0ID0gaXRlcmF0b3IubmV4dCgpKSB7XG4gICAgICAgICAgICBmbihuZXh0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiBjb2xsZWN0KGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yRWFjaChpdGVyYXRvciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiByZXN1bHQucHVzaCh2YWx1ZSk7IH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBJdGVyYXRvci5jb2xsZWN0ID0gY29sbGVjdDtcbn0pKEl0ZXJhdG9yIHx8IChJdGVyYXRvciA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VxdWVuY2VJdGVyYXRvcihhcmcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIHJldHVybiBJdGVyYXRvci5mcm9tQXJyYXkoYXJnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhcmc7XG4gICAgfVxufVxudmFyIEFycmF5SXRlcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXJyYXlJdGVyYXRvcihpdGVtcywgc3RhcnQsIGVuZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSB2b2lkIDApIHsgc3RhcnQgPSAwOyB9XG4gICAgICAgIGlmIChlbmQgPT09IHZvaWQgMCkgeyBlbmQgPSBpdGVtcy5sZW5ndGg7IH1cbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSBzdGFydCAtIDE7IH1cbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuICAgIEFycmF5SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBNYXRoLm1pbih0aGlzLmluZGV4ICsgMSwgdGhpcy5lbmQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50KCk7XG4gICAgfTtcbiAgICBBcnJheUl0ZXJhdG9yLnByb3RvdHlwZS5jdXJyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5zdGFydCAtIDEgfHwgdGhpcy5pbmRleCA9PT0gdGhpcy5lbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuaW5kZXhdO1xuICAgIH07XG4gICAgcmV0dXJuIEFycmF5SXRlcmF0b3I7XG59KCkpO1xuZXhwb3J0IHsgQXJyYXlJdGVyYXRvciB9O1xudmFyIEFycmF5TmF2aWdhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBcnJheU5hdmlnYXRvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBcnJheU5hdmlnYXRvcihpdGVtcywgc3RhcnQsIGVuZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSB2b2lkIDApIHsgc3RhcnQgPSAwOyB9XG4gICAgICAgIGlmIChlbmQgPT09IHZvaWQgMCkgeyBlbmQgPSBpdGVtcy5sZW5ndGg7IH1cbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSBzdGFydCAtIDE7IH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGl0ZW1zLCBzdGFydCwgZW5kLCBpbmRleCkgfHwgdGhpcztcbiAgICB9XG4gICAgQXJyYXlOYXZpZ2F0b3IucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmN1cnJlbnQuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIEFycmF5TmF2aWdhdG9yLnByb3RvdHlwZS5wcmV2aW91cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGgubWF4KHRoaXMuaW5kZXggLSAxLCB0aGlzLnN0YXJ0IC0gMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQoKTtcbiAgICB9O1xuICAgIEFycmF5TmF2aWdhdG9yLnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuc3RhcnQ7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQoKTtcbiAgICB9O1xuICAgIEFycmF5TmF2aWdhdG9yLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5lbmQgLSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50KCk7XG4gICAgfTtcbiAgICBBcnJheU5hdmlnYXRvci5wcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBBcnJheU5hdmlnYXRvcjtcbn0oQXJyYXlJdGVyYXRvcikpO1xuZXhwb3J0IHsgQXJyYXlOYXZpZ2F0b3IgfTtcbnZhciBNYXBwZWRJdGVyYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYXBwZWRJdGVyYXRvcihpdGVyYXRvciwgZm4pIHtcbiAgICAgICAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yO1xuICAgICAgICB0aGlzLmZuID0gZm47XG4gICAgICAgIC8vIG5vb3BcbiAgICB9XG4gICAgTWFwcGVkSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmZuKHRoaXMuaXRlcmF0b3IubmV4dCgpKTsgfTtcbiAgICByZXR1cm4gTWFwcGVkSXRlcmF0b3I7XG59KCkpO1xuZXhwb3J0IHsgTWFwcGVkSXRlcmF0b3IgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgaWxsZWdhbEFyZ3VtZW50IH0gZnJvbSAnLi9lcnJvcnMuanMnO1xudmFyIEtleUNvZGVTdHJNYXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gS2V5Q29kZVN0ck1hcCgpIHtcbiAgICAgICAgdGhpcy5fa2V5Q29kZVRvU3RyID0gW107XG4gICAgICAgIHRoaXMuX3N0clRvS2V5Q29kZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIEtleUNvZGVTdHJNYXAucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uIChrZXlDb2RlLCBzdHIpIHtcbiAgICAgICAgdGhpcy5fa2V5Q29kZVRvU3RyW2tleUNvZGVdID0gc3RyO1xuICAgICAgICB0aGlzLl9zdHJUb0tleUNvZGVbc3RyLnRvTG93ZXJDYXNlKCldID0ga2V5Q29kZTtcbiAgICB9O1xuICAgIEtleUNvZGVTdHJNYXAucHJvdG90eXBlLmtleUNvZGVUb1N0ciA9IGZ1bmN0aW9uIChrZXlDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlDb2RlVG9TdHJba2V5Q29kZV07XG4gICAgfTtcbiAgICBLZXlDb2RlU3RyTWFwLnByb3RvdHlwZS5zdHJUb0tleUNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJUb0tleUNvZGVbc3RyLnRvTG93ZXJDYXNlKCldIHx8IDAgLyogVW5rbm93biAqLztcbiAgICB9O1xuICAgIHJldHVybiBLZXlDb2RlU3RyTWFwO1xufSgpKTtcbnZhciB1aU1hcCA9IG5ldyBLZXlDb2RlU3RyTWFwKCk7XG52YXIgdXNlclNldHRpbmdzVVNNYXAgPSBuZXcgS2V5Q29kZVN0ck1hcCgpO1xudmFyIHVzZXJTZXR0aW5nc0dlbmVyYWxNYXAgPSBuZXcgS2V5Q29kZVN0ck1hcCgpO1xuKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBkZWZpbmUoa2V5Q29kZSwgdWlMYWJlbCwgdXNVc2VyU2V0dGluZ3NMYWJlbCwgZ2VuZXJhbFVzZXJTZXR0aW5nc0xhYmVsKSB7XG4gICAgICAgIGlmICh1c1VzZXJTZXR0aW5nc0xhYmVsID09PSB2b2lkIDApIHsgdXNVc2VyU2V0dGluZ3NMYWJlbCA9IHVpTGFiZWw7IH1cbiAgICAgICAgaWYgKGdlbmVyYWxVc2VyU2V0dGluZ3NMYWJlbCA9PT0gdm9pZCAwKSB7IGdlbmVyYWxVc2VyU2V0dGluZ3NMYWJlbCA9IHVzVXNlclNldHRpbmdzTGFiZWw7IH1cbiAgICAgICAgdWlNYXAuZGVmaW5lKGtleUNvZGUsIHVpTGFiZWwpO1xuICAgICAgICB1c2VyU2V0dGluZ3NVU01hcC5kZWZpbmUoa2V5Q29kZSwgdXNVc2VyU2V0dGluZ3NMYWJlbCk7XG4gICAgICAgIHVzZXJTZXR0aW5nc0dlbmVyYWxNYXAuZGVmaW5lKGtleUNvZGUsIGdlbmVyYWxVc2VyU2V0dGluZ3NMYWJlbCk7XG4gICAgfVxuICAgIGRlZmluZSgwIC8qIFVua25vd24gKi8sICd1bmtub3duJyk7XG4gICAgZGVmaW5lKDEgLyogQmFja3NwYWNlICovLCAnQmFja3NwYWNlJyk7XG4gICAgZGVmaW5lKDIgLyogVGFiICovLCAnVGFiJyk7XG4gICAgZGVmaW5lKDMgLyogRW50ZXIgKi8sICdFbnRlcicpO1xuICAgIGRlZmluZSg0IC8qIFNoaWZ0ICovLCAnU2hpZnQnKTtcbiAgICBkZWZpbmUoNSAvKiBDdHJsICovLCAnQ3RybCcpO1xuICAgIGRlZmluZSg2IC8qIEFsdCAqLywgJ0FsdCcpO1xuICAgIGRlZmluZSg3IC8qIFBhdXNlQnJlYWsgKi8sICdQYXVzZUJyZWFrJyk7XG4gICAgZGVmaW5lKDggLyogQ2Fwc0xvY2sgKi8sICdDYXBzTG9jaycpO1xuICAgIGRlZmluZSg5IC8qIEVzY2FwZSAqLywgJ0VzY2FwZScpO1xuICAgIGRlZmluZSgxMCAvKiBTcGFjZSAqLywgJ1NwYWNlJyk7XG4gICAgZGVmaW5lKDExIC8qIFBhZ2VVcCAqLywgJ1BhZ2VVcCcpO1xuICAgIGRlZmluZSgxMiAvKiBQYWdlRG93biAqLywgJ1BhZ2VEb3duJyk7XG4gICAgZGVmaW5lKDEzIC8qIEVuZCAqLywgJ0VuZCcpO1xuICAgIGRlZmluZSgxNCAvKiBIb21lICovLCAnSG9tZScpO1xuICAgIGRlZmluZSgxNSAvKiBMZWZ0QXJyb3cgKi8sICdMZWZ0QXJyb3cnLCAnTGVmdCcpO1xuICAgIGRlZmluZSgxNiAvKiBVcEFycm93ICovLCAnVXBBcnJvdycsICdVcCcpO1xuICAgIGRlZmluZSgxNyAvKiBSaWdodEFycm93ICovLCAnUmlnaHRBcnJvdycsICdSaWdodCcpO1xuICAgIGRlZmluZSgxOCAvKiBEb3duQXJyb3cgKi8sICdEb3duQXJyb3cnLCAnRG93bicpO1xuICAgIGRlZmluZSgxOSAvKiBJbnNlcnQgKi8sICdJbnNlcnQnKTtcbiAgICBkZWZpbmUoMjAgLyogRGVsZXRlICovLCAnRGVsZXRlJyk7XG4gICAgZGVmaW5lKDIxIC8qIEtFWV8wICovLCAnMCcpO1xuICAgIGRlZmluZSgyMiAvKiBLRVlfMSAqLywgJzEnKTtcbiAgICBkZWZpbmUoMjMgLyogS0VZXzIgKi8sICcyJyk7XG4gICAgZGVmaW5lKDI0IC8qIEtFWV8zICovLCAnMycpO1xuICAgIGRlZmluZSgyNSAvKiBLRVlfNCAqLywgJzQnKTtcbiAgICBkZWZpbmUoMjYgLyogS0VZXzUgKi8sICc1Jyk7XG4gICAgZGVmaW5lKDI3IC8qIEtFWV82ICovLCAnNicpO1xuICAgIGRlZmluZSgyOCAvKiBLRVlfNyAqLywgJzcnKTtcbiAgICBkZWZpbmUoMjkgLyogS0VZXzggKi8sICc4Jyk7XG4gICAgZGVmaW5lKDMwIC8qIEtFWV85ICovLCAnOScpO1xuICAgIGRlZmluZSgzMSAvKiBLRVlfQSAqLywgJ0EnKTtcbiAgICBkZWZpbmUoMzIgLyogS0VZX0IgKi8sICdCJyk7XG4gICAgZGVmaW5lKDMzIC8qIEtFWV9DICovLCAnQycpO1xuICAgIGRlZmluZSgzNCAvKiBLRVlfRCAqLywgJ0QnKTtcbiAgICBkZWZpbmUoMzUgLyogS0VZX0UgKi8sICdFJyk7XG4gICAgZGVmaW5lKDM2IC8qIEtFWV9GICovLCAnRicpO1xuICAgIGRlZmluZSgzNyAvKiBLRVlfRyAqLywgJ0cnKTtcbiAgICBkZWZpbmUoMzggLyogS0VZX0ggKi8sICdIJyk7XG4gICAgZGVmaW5lKDM5IC8qIEtFWV9JICovLCAnSScpO1xuICAgIGRlZmluZSg0MCAvKiBLRVlfSiAqLywgJ0onKTtcbiAgICBkZWZpbmUoNDEgLyogS0VZX0sgKi8sICdLJyk7XG4gICAgZGVmaW5lKDQyIC8qIEtFWV9MICovLCAnTCcpO1xuICAgIGRlZmluZSg0MyAvKiBLRVlfTSAqLywgJ00nKTtcbiAgICBkZWZpbmUoNDQgLyogS0VZX04gKi8sICdOJyk7XG4gICAgZGVmaW5lKDQ1IC8qIEtFWV9PICovLCAnTycpO1xuICAgIGRlZmluZSg0NiAvKiBLRVlfUCAqLywgJ1AnKTtcbiAgICBkZWZpbmUoNDcgLyogS0VZX1EgKi8sICdRJyk7XG4gICAgZGVmaW5lKDQ4IC8qIEtFWV9SICovLCAnUicpO1xuICAgIGRlZmluZSg0OSAvKiBLRVlfUyAqLywgJ1MnKTtcbiAgICBkZWZpbmUoNTAgLyogS0VZX1QgKi8sICdUJyk7XG4gICAgZGVmaW5lKDUxIC8qIEtFWV9VICovLCAnVScpO1xuICAgIGRlZmluZSg1MiAvKiBLRVlfViAqLywgJ1YnKTtcbiAgICBkZWZpbmUoNTMgLyogS0VZX1cgKi8sICdXJyk7XG4gICAgZGVmaW5lKDU0IC8qIEtFWV9YICovLCAnWCcpO1xuICAgIGRlZmluZSg1NSAvKiBLRVlfWSAqLywgJ1knKTtcbiAgICBkZWZpbmUoNTYgLyogS0VZX1ogKi8sICdaJyk7XG4gICAgZGVmaW5lKDU3IC8qIE1ldGEgKi8sICdNZXRhJyk7XG4gICAgZGVmaW5lKDU4IC8qIENvbnRleHRNZW51ICovLCAnQ29udGV4dE1lbnUnKTtcbiAgICBkZWZpbmUoNTkgLyogRjEgKi8sICdGMScpO1xuICAgIGRlZmluZSg2MCAvKiBGMiAqLywgJ0YyJyk7XG4gICAgZGVmaW5lKDYxIC8qIEYzICovLCAnRjMnKTtcbiAgICBkZWZpbmUoNjIgLyogRjQgKi8sICdGNCcpO1xuICAgIGRlZmluZSg2MyAvKiBGNSAqLywgJ0Y1Jyk7XG4gICAgZGVmaW5lKDY0IC8qIEY2ICovLCAnRjYnKTtcbiAgICBkZWZpbmUoNjUgLyogRjcgKi8sICdGNycpO1xuICAgIGRlZmluZSg2NiAvKiBGOCAqLywgJ0Y4Jyk7XG4gICAgZGVmaW5lKDY3IC8qIEY5ICovLCAnRjknKTtcbiAgICBkZWZpbmUoNjggLyogRjEwICovLCAnRjEwJyk7XG4gICAgZGVmaW5lKDY5IC8qIEYxMSAqLywgJ0YxMScpO1xuICAgIGRlZmluZSg3MCAvKiBGMTIgKi8sICdGMTInKTtcbiAgICBkZWZpbmUoNzEgLyogRjEzICovLCAnRjEzJyk7XG4gICAgZGVmaW5lKDcyIC8qIEYxNCAqLywgJ0YxNCcpO1xuICAgIGRlZmluZSg3MyAvKiBGMTUgKi8sICdGMTUnKTtcbiAgICBkZWZpbmUoNzQgLyogRjE2ICovLCAnRjE2Jyk7XG4gICAgZGVmaW5lKDc1IC8qIEYxNyAqLywgJ0YxNycpO1xuICAgIGRlZmluZSg3NiAvKiBGMTggKi8sICdGMTgnKTtcbiAgICBkZWZpbmUoNzcgLyogRjE5ICovLCAnRjE5Jyk7XG4gICAgZGVmaW5lKDc4IC8qIE51bUxvY2sgKi8sICdOdW1Mb2NrJyk7XG4gICAgZGVmaW5lKDc5IC8qIFNjcm9sbExvY2sgKi8sICdTY3JvbGxMb2NrJyk7XG4gICAgZGVmaW5lKDgwIC8qIFVTX1NFTUlDT0xPTiAqLywgJzsnLCAnOycsICdPRU1fMScpO1xuICAgIGRlZmluZSg4MSAvKiBVU19FUVVBTCAqLywgJz0nLCAnPScsICdPRU1fUExVUycpO1xuICAgIGRlZmluZSg4MiAvKiBVU19DT01NQSAqLywgJywnLCAnLCcsICdPRU1fQ09NTUEnKTtcbiAgICBkZWZpbmUoODMgLyogVVNfTUlOVVMgKi8sICctJywgJy0nLCAnT0VNX01JTlVTJyk7XG4gICAgZGVmaW5lKDg0IC8qIFVTX0RPVCAqLywgJy4nLCAnLicsICdPRU1fUEVSSU9EJyk7XG4gICAgZGVmaW5lKDg1IC8qIFVTX1NMQVNIICovLCAnLycsICcvJywgJ09FTV8yJyk7XG4gICAgZGVmaW5lKDg2IC8qIFVTX0JBQ0tUSUNLICovLCAnYCcsICdgJywgJ09FTV8zJyk7XG4gICAgZGVmaW5lKDExMCAvKiBBQk5UX0MxICovLCAnQUJOVF9DMScpO1xuICAgIGRlZmluZSgxMTEgLyogQUJOVF9DMiAqLywgJ0FCTlRfQzInKTtcbiAgICBkZWZpbmUoODcgLyogVVNfT1BFTl9TUVVBUkVfQlJBQ0tFVCAqLywgJ1snLCAnWycsICdPRU1fNCcpO1xuICAgIGRlZmluZSg4OCAvKiBVU19CQUNLU0xBU0ggKi8sICdcXFxcJywgJ1xcXFwnLCAnT0VNXzUnKTtcbiAgICBkZWZpbmUoODkgLyogVVNfQ0xPU0VfU1FVQVJFX0JSQUNLRVQgKi8sICddJywgJ10nLCAnT0VNXzYnKTtcbiAgICBkZWZpbmUoOTAgLyogVVNfUVVPVEUgKi8sICdcXCcnLCAnXFwnJywgJ09FTV83Jyk7XG4gICAgZGVmaW5lKDkxIC8qIE9FTV84ICovLCAnT0VNXzgnKTtcbiAgICBkZWZpbmUoOTIgLyogT0VNXzEwMiAqLywgJ09FTV8xMDInKTtcbiAgICBkZWZpbmUoOTMgLyogTlVNUEFEXzAgKi8sICdOdW1QYWQwJyk7XG4gICAgZGVmaW5lKDk0IC8qIE5VTVBBRF8xICovLCAnTnVtUGFkMScpO1xuICAgIGRlZmluZSg5NSAvKiBOVU1QQURfMiAqLywgJ051bVBhZDInKTtcbiAgICBkZWZpbmUoOTYgLyogTlVNUEFEXzMgKi8sICdOdW1QYWQzJyk7XG4gICAgZGVmaW5lKDk3IC8qIE5VTVBBRF80ICovLCAnTnVtUGFkNCcpO1xuICAgIGRlZmluZSg5OCAvKiBOVU1QQURfNSAqLywgJ051bVBhZDUnKTtcbiAgICBkZWZpbmUoOTkgLyogTlVNUEFEXzYgKi8sICdOdW1QYWQ2Jyk7XG4gICAgZGVmaW5lKDEwMCAvKiBOVU1QQURfNyAqLywgJ051bVBhZDcnKTtcbiAgICBkZWZpbmUoMTAxIC8qIE5VTVBBRF84ICovLCAnTnVtUGFkOCcpO1xuICAgIGRlZmluZSgxMDIgLyogTlVNUEFEXzkgKi8sICdOdW1QYWQ5Jyk7XG4gICAgZGVmaW5lKDEwMyAvKiBOVU1QQURfTVVMVElQTFkgKi8sICdOdW1QYWRfTXVsdGlwbHknKTtcbiAgICBkZWZpbmUoMTA0IC8qIE5VTVBBRF9BREQgKi8sICdOdW1QYWRfQWRkJyk7XG4gICAgZGVmaW5lKDEwNSAvKiBOVU1QQURfU0VQQVJBVE9SICovLCAnTnVtUGFkX1NlcGFyYXRvcicpO1xuICAgIGRlZmluZSgxMDYgLyogTlVNUEFEX1NVQlRSQUNUICovLCAnTnVtUGFkX1N1YnRyYWN0Jyk7XG4gICAgZGVmaW5lKDEwNyAvKiBOVU1QQURfREVDSU1BTCAqLywgJ051bVBhZF9EZWNpbWFsJyk7XG4gICAgZGVmaW5lKDEwOCAvKiBOVU1QQURfRElWSURFICovLCAnTnVtUGFkX0RpdmlkZScpO1xufSkoKTtcbmV4cG9ydCB2YXIgS2V5Q29kZVV0aWxzO1xuKGZ1bmN0aW9uIChLZXlDb2RlVXRpbHMpIHtcbiAgICBmdW5jdGlvbiB0b1N0cmluZyhrZXlDb2RlKSB7XG4gICAgICAgIHJldHVybiB1aU1hcC5rZXlDb2RlVG9TdHIoa2V5Q29kZSk7XG4gICAgfVxuICAgIEtleUNvZGVVdGlscy50b1N0cmluZyA9IHRvU3RyaW5nO1xuICAgIGZ1bmN0aW9uIGZyb21TdHJpbmcoa2V5KSB7XG4gICAgICAgIHJldHVybiB1aU1hcC5zdHJUb0tleUNvZGUoa2V5KTtcbiAgICB9XG4gICAgS2V5Q29kZVV0aWxzLmZyb21TdHJpbmcgPSBmcm9tU3RyaW5nO1xuICAgIGZ1bmN0aW9uIHRvVXNlclNldHRpbmdzVVMoa2V5Q29kZSkge1xuICAgICAgICByZXR1cm4gdXNlclNldHRpbmdzVVNNYXAua2V5Q29kZVRvU3RyKGtleUNvZGUpO1xuICAgIH1cbiAgICBLZXlDb2RlVXRpbHMudG9Vc2VyU2V0dGluZ3NVUyA9IHRvVXNlclNldHRpbmdzVVM7XG4gICAgZnVuY3Rpb24gdG9Vc2VyU2V0dGluZ3NHZW5lcmFsKGtleUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJTZXR0aW5nc0dlbmVyYWxNYXAua2V5Q29kZVRvU3RyKGtleUNvZGUpO1xuICAgIH1cbiAgICBLZXlDb2RlVXRpbHMudG9Vc2VyU2V0dGluZ3NHZW5lcmFsID0gdG9Vc2VyU2V0dGluZ3NHZW5lcmFsO1xuICAgIGZ1bmN0aW9uIGZyb21Vc2VyU2V0dGluZ3Moa2V5KSB7XG4gICAgICAgIHJldHVybiB1c2VyU2V0dGluZ3NVU01hcC5zdHJUb0tleUNvZGUoa2V5KSB8fCB1c2VyU2V0dGluZ3NHZW5lcmFsTWFwLnN0clRvS2V5Q29kZShrZXkpO1xuICAgIH1cbiAgICBLZXlDb2RlVXRpbHMuZnJvbVVzZXJTZXR0aW5ncyA9IGZyb21Vc2VyU2V0dGluZ3M7XG59KShLZXlDb2RlVXRpbHMgfHwgKEtleUNvZGVVdGlscyA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gS2V5Q2hvcmQoZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0KSB7XG4gICAgdmFyIGNob3JkUGFydCA9ICgoc2Vjb25kUGFydCAmIDB4MDAwMEZGRkYpIDw8IDE2KSA+Pj4gMDtcbiAgICByZXR1cm4gKGZpcnN0UGFydCB8IGNob3JkUGFydCkgPj4+IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlS2V5YmluZGluZyhrZXliaW5kaW5nLCBPUykge1xuICAgIGlmIChrZXliaW5kaW5nID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZmlyc3RQYXJ0ID0gKGtleWJpbmRpbmcgJiAweDAwMDBGRkZGKSA+Pj4gMDtcbiAgICB2YXIgY2hvcmRQYXJ0ID0gKGtleWJpbmRpbmcgJiAweEZGRkYwMDAwKSA+Pj4gMTY7XG4gICAgaWYgKGNob3JkUGFydCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IENob3JkS2V5YmluZGluZyhbXG4gICAgICAgICAgICBjcmVhdGVTaW1wbGVLZXliaW5kaW5nKGZpcnN0UGFydCwgT1MpLFxuICAgICAgICAgICAgY3JlYXRlU2ltcGxlS2V5YmluZGluZyhjaG9yZFBhcnQsIE9TKVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDaG9yZEtleWJpbmRpbmcoW2NyZWF0ZVNpbXBsZUtleWJpbmRpbmcoZmlyc3RQYXJ0LCBPUyldKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaW1wbGVLZXliaW5kaW5nKGtleWJpbmRpbmcsIE9TKSB7XG4gICAgdmFyIGN0cmxDbWQgPSAoa2V5YmluZGluZyAmIDIwNDggLyogQ3RybENtZCAqLyA/IHRydWUgOiBmYWxzZSk7XG4gICAgdmFyIHdpbkN0cmwgPSAoa2V5YmluZGluZyAmIDI1NiAvKiBXaW5DdHJsICovID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICB2YXIgY3RybEtleSA9IChPUyA9PT0gMiAvKiBNYWNpbnRvc2ggKi8gPyB3aW5DdHJsIDogY3RybENtZCk7XG4gICAgdmFyIHNoaWZ0S2V5ID0gKGtleWJpbmRpbmcgJiAxMDI0IC8qIFNoaWZ0ICovID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICB2YXIgYWx0S2V5ID0gKGtleWJpbmRpbmcgJiA1MTIgLyogQWx0ICovID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICB2YXIgbWV0YUtleSA9IChPUyA9PT0gMiAvKiBNYWNpbnRvc2ggKi8gPyBjdHJsQ21kIDogd2luQ3RybCk7XG4gICAgdmFyIGtleUNvZGUgPSAoa2V5YmluZGluZyAmIDI1NSAvKiBLZXlDb2RlICovKTtcbiAgICByZXR1cm4gbmV3IFNpbXBsZUtleWJpbmRpbmcoY3RybEtleSwgc2hpZnRLZXksIGFsdEtleSwgbWV0YUtleSwga2V5Q29kZSk7XG59XG52YXIgU2ltcGxlS2V5YmluZGluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaW1wbGVLZXliaW5kaW5nKGN0cmxLZXksIHNoaWZ0S2V5LCBhbHRLZXksIG1ldGFLZXksIGtleUNvZGUpIHtcbiAgICAgICAgdGhpcy5jdHJsS2V5ID0gY3RybEtleTtcbiAgICAgICAgdGhpcy5zaGlmdEtleSA9IHNoaWZ0S2V5O1xuICAgICAgICB0aGlzLmFsdEtleSA9IGFsdEtleTtcbiAgICAgICAgdGhpcy5tZXRhS2V5ID0gbWV0YUtleTtcbiAgICAgICAgdGhpcy5rZXlDb2RlID0ga2V5Q29kZTtcbiAgICB9XG4gICAgU2ltcGxlS2V5YmluZGluZy5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5jdHJsS2V5ID09PSBvdGhlci5jdHJsS2V5XG4gICAgICAgICAgICAmJiB0aGlzLnNoaWZ0S2V5ID09PSBvdGhlci5zaGlmdEtleVxuICAgICAgICAgICAgJiYgdGhpcy5hbHRLZXkgPT09IG90aGVyLmFsdEtleVxuICAgICAgICAgICAgJiYgdGhpcy5tZXRhS2V5ID09PSBvdGhlci5tZXRhS2V5XG4gICAgICAgICAgICAmJiB0aGlzLmtleUNvZGUgPT09IG90aGVyLmtleUNvZGUpO1xuICAgIH07XG4gICAgU2ltcGxlS2V5YmluZGluZy5wcm90b3R5cGUuaXNNb2RpZmllcktleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmtleUNvZGUgPT09IDAgLyogVW5rbm93biAqL1xuICAgICAgICAgICAgfHwgdGhpcy5rZXlDb2RlID09PSA1IC8qIEN0cmwgKi9cbiAgICAgICAgICAgIHx8IHRoaXMua2V5Q29kZSA9PT0gNTcgLyogTWV0YSAqL1xuICAgICAgICAgICAgfHwgdGhpcy5rZXlDb2RlID09PSA2IC8qIEFsdCAqL1xuICAgICAgICAgICAgfHwgdGhpcy5rZXlDb2RlID09PSA0IC8qIFNoaWZ0ICovKTtcbiAgICB9O1xuICAgIFNpbXBsZUtleWJpbmRpbmcucHJvdG90eXBlLnRvQ2hvcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2hvcmRLZXliaW5kaW5nKFt0aGlzXSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEb2VzIHRoaXMga2V5YmluZGluZyByZWZlciB0byB0aGUga2V5IGNvZGUgb2YgYSBtb2RpZmllciBhbmQgaXQgYWxzbyBoYXMgdGhlIG1vZGlmaWVyIGZsYWc/XG4gICAgICovXG4gICAgU2ltcGxlS2V5YmluZGluZy5wcm90b3R5cGUuaXNEdXBsaWNhdGVNb2RpZmllckNhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoKHRoaXMuY3RybEtleSAmJiB0aGlzLmtleUNvZGUgPT09IDUgLyogQ3RybCAqLylcbiAgICAgICAgICAgIHx8ICh0aGlzLnNoaWZ0S2V5ICYmIHRoaXMua2V5Q29kZSA9PT0gNCAvKiBTaGlmdCAqLylcbiAgICAgICAgICAgIHx8ICh0aGlzLmFsdEtleSAmJiB0aGlzLmtleUNvZGUgPT09IDYgLyogQWx0ICovKVxuICAgICAgICAgICAgfHwgKHRoaXMubWV0YUtleSAmJiB0aGlzLmtleUNvZGUgPT09IDU3IC8qIE1ldGEgKi8pKTtcbiAgICB9O1xuICAgIHJldHVybiBTaW1wbGVLZXliaW5kaW5nO1xufSgpKTtcbmV4cG9ydCB7IFNpbXBsZUtleWJpbmRpbmcgfTtcbnZhciBDaG9yZEtleWJpbmRpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvcmRLZXliaW5kaW5nKHBhcnRzKSB7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWxBcmd1bWVudChcInBhcnRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFydHMgPSBwYXJ0cztcbiAgICB9XG4gICAgQ2hvcmRLZXliaW5kaW5nLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgaWYgKG90aGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGFydHMubGVuZ3RoICE9PSBvdGhlci5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJ0c1tpXS5lcXVhbHMob3RoZXIucGFydHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIENob3JkS2V5YmluZGluZztcbn0oKSk7XG5leHBvcnQgeyBDaG9yZEtleWJpbmRpbmcgfTtcbnZhciBSZXNvbHZlZEtleWJpbmRpbmdQYXJ0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlc29sdmVkS2V5YmluZGluZ1BhcnQoY3RybEtleSwgc2hpZnRLZXksIGFsdEtleSwgbWV0YUtleSwga2JMYWJlbCwga2JBcmlhTGFiZWwpIHtcbiAgICAgICAgdGhpcy5jdHJsS2V5ID0gY3RybEtleTtcbiAgICAgICAgdGhpcy5zaGlmdEtleSA9IHNoaWZ0S2V5O1xuICAgICAgICB0aGlzLmFsdEtleSA9IGFsdEtleTtcbiAgICAgICAgdGhpcy5tZXRhS2V5ID0gbWV0YUtleTtcbiAgICAgICAgdGhpcy5rZXlMYWJlbCA9IGtiTGFiZWw7XG4gICAgICAgIHRoaXMua2V5QXJpYUxhYmVsID0ga2JBcmlhTGFiZWw7XG4gICAgfVxuICAgIHJldHVybiBSZXNvbHZlZEtleWJpbmRpbmdQYXJ0O1xufSgpKTtcbmV4cG9ydCB7IFJlc29sdmVkS2V5YmluZGluZ1BhcnQgfTtcbi8qKlxuICogQSByZXNvbHZlZCBrZXliaW5kaW5nLiBDYW4gYmUgYSBzaW1wbGUga2V5YmluZGluZyBvciBhIGNob3JkIGtleWJpbmRpbmcuXG4gKi9cbnZhciBSZXNvbHZlZEtleWJpbmRpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVzb2x2ZWRLZXliaW5kaW5nKCkge1xuICAgIH1cbiAgICByZXR1cm4gUmVzb2x2ZWRLZXliaW5kaW5nO1xufSgpKTtcbmV4cG9ydCB7IFJlc29sdmVkS2V5YmluZGluZyB9O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRGlzcG9zYWJsZSh0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcuZGlzcG9zZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAmJiB0aGluZy5kaXNwb3NlLmxlbmd0aCA9PT0gMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXNwb3NlKGZpcnN0KSB7XG4gICAgdmFyIHJlc3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICByZXN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaXJzdCkpIHtcbiAgICAgICAgZmlyc3QuZm9yRWFjaChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZCAmJiBkLmRpc3Bvc2UoKTsgfSk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdC5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpc3Bvc2UoZmlyc3QpO1xuICAgICAgICBkaXNwb3NlKHJlc3QpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVkRGlzcG9zYWJsZShkaXNwb3NhYmxlcykge1xuICAgIHJldHVybiB7IGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3Bvc2UoZGlzcG9zYWJsZXMpOyB9IH07XG59XG5leHBvcnQgZnVuY3Rpb24gdG9EaXNwb3NhYmxlKGZuKSB7XG4gICAgcmV0dXJuIHsgZGlzcG9zZTogZnVuY3Rpb24gKCkgeyBmbigpOyB9IH07XG59XG52YXIgRGlzcG9zYWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNwb3NhYmxlKCkge1xuICAgICAgICB0aGlzLl90b0Rpc3Bvc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fbGlmZWN5Y2xlX2Rpc3Bvc2FibGVfaXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBEaXNwb3NhYmxlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9saWZlY3ljbGVfZGlzcG9zYWJsZV9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdG9EaXNwb3NlID0gZGlzcG9zZSh0aGlzLl90b0Rpc3Bvc2UpO1xuICAgIH07XG4gICAgRGlzcG9zYWJsZS5wcm90b3R5cGUuX3JlZ2lzdGVyID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpZmVjeWNsZV9kaXNwb3NhYmxlX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignUmVnaXN0ZXJpbmcgZGlzcG9zYWJsZSBvbiBvYmplY3QgdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGRpc3Bvc2VkLicpO1xuICAgICAgICAgICAgdC5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90b0Rpc3Bvc2UucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIERpc3Bvc2FibGUuTm9uZSA9IE9iamVjdC5mcmVlemUoeyBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7IH0gfSk7XG4gICAgcmV0dXJuIERpc3Bvc2FibGU7XG59KCkpO1xuZXhwb3J0IHsgRGlzcG9zYWJsZSB9O1xudmFyIEltbW9ydGFsUmVmZXJlbmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEltbW9ydGFsUmVmZXJlbmNlKG9iamVjdCkge1xuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICB9XG4gICAgSW1tb3J0YWxSZWZlcmVuY2UucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIEltbW9ydGFsUmVmZXJlbmNlO1xufSgpKTtcbmV4cG9ydCB7IEltbW9ydGFsUmVmZXJlbmNlIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZJTiB9IGZyb20gJy4vaXRlcmF0b3IuanMnO1xudmFyIE5vZGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm9kZShlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBOb2RlO1xufSgpKTtcbnZhciBMaW5rZWRMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlua2VkTGlzdC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZmlyc3Q7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc2VydChlbGVtZW50LCBmYWxzZSk7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc2VydChlbGVtZW50LCB0cnVlKTtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLl9pbnNlcnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXRUaGVFbmQpIHtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgTm9kZShlbGVtZW50KTtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJzdCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5fbGFzdCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXRUaGVFbmQpIHtcbiAgICAgICAgICAgIC8vIHB1c2hcbiAgICAgICAgICAgIHZhciBvbGRMYXN0ID0gdGhpcy5fbGFzdDtcbiAgICAgICAgICAgIHRoaXMuX2xhc3QgPSBuZXdOb2RlO1xuICAgICAgICAgICAgbmV3Tm9kZS5wcmV2ID0gb2xkTGFzdDtcbiAgICAgICAgICAgIG9sZExhc3QubmV4dCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB1bnNoaWZ0XG4gICAgICAgICAgICB2YXIgb2xkRmlyc3QgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IG9sZEZpcnN0O1xuICAgICAgICAgICAgb2xkRmlyc3QucHJldiA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2l6ZSArPSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlLmJpbmQodGhpcywgbmV3Tm9kZSk7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maXJzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLl9maXJzdC5lbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlKHRoaXMuX2ZpcnN0KTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLl9yZW1vdmUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIHdoaWxlIChjYW5kaWRhdGUgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlICE9PSBub2RlKSB7XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gY2FuZGlkYXRlLm5leHQ7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlLnByZXYgJiYgY2FuZGlkYXRlLm5leHQpIHtcbiAgICAgICAgICAgICAgICAvLyBtaWRkbGVcbiAgICAgICAgICAgICAgICB2YXIgYW5jaG9yID0gY2FuZGlkYXRlLnByZXY7XG4gICAgICAgICAgICAgICAgYW5jaG9yLm5leHQgPSBjYW5kaWRhdGUubmV4dDtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGUubmV4dC5wcmV2ID0gYW5jaG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWNhbmRpZGF0ZS5wcmV2ICYmICFjYW5kaWRhdGUubmV4dCkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgbm9kZVxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2FuZGlkYXRlLm5leHQpIHtcbiAgICAgICAgICAgICAgICAvLyBsYXN0XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdCA9IHRoaXMuX2xhc3QucHJldjtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0Lm5leHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2FuZGlkYXRlLnByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBmaXJzdFxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gdGhpcy5fZmlyc3QubmV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJzdC5wcmV2ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZG9uZVxuICAgICAgICAgICAgdGhpcy5fc2l6ZSAtPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLml0ZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZJTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogbm9kZS5lbGVtZW50IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gbm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XG59KCkpO1xuZXhwb3J0IHsgTGlua2VkTGlzdCB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgdmFyIExBTkdVQUdFX0RFRkFVTFQgPSAnZW4nO1xudmFyIF9pc1dpbmRvd3MgPSBmYWxzZTtcbnZhciBfaXNNYWNpbnRvc2ggPSBmYWxzZTtcbnZhciBfaXNMaW51eCA9IGZhbHNlO1xudmFyIF9pc05hdGl2ZSA9IGZhbHNlO1xudmFyIF9pc1dlYiA9IGZhbHNlO1xudmFyIF9sb2NhbGUgPSB1bmRlZmluZWQ7XG52YXIgX2xhbmd1YWdlID0gTEFOR1VBR0VfREVGQVVMVDtcbnZhciBfdHJhbnNsYXRpb25zQ29uZmlnRmlsZSA9IHVuZGVmaW5lZDtcbnZhciBpc0VsZWN0cm9uUmVuZGVyZXIgPSAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucy5lbGVjdHJvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKTtcbi8vIE9TIGRldGVjdGlvblxuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmICFpc0VsZWN0cm9uUmVuZGVyZXIpIHtcbiAgICB2YXIgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBfaXNXaW5kb3dzID0gdXNlckFnZW50LmluZGV4T2YoJ1dpbmRvd3MnKSA+PSAwO1xuICAgIF9pc01hY2ludG9zaCA9IHVzZXJBZ2VudC5pbmRleE9mKCdNYWNpbnRvc2gnKSA+PSAwO1xuICAgIF9pc0xpbnV4ID0gdXNlckFnZW50LmluZGV4T2YoJ0xpbnV4JykgPj0gMDtcbiAgICBfaXNXZWIgPSB0cnVlO1xuICAgIF9sb2NhbGUgPSBuYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gICAgX2xhbmd1YWdlID0gX2xvY2FsZTtcbn1cbmVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0Jykge1xuICAgIF9pc1dpbmRvd3MgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyk7XG4gICAgX2lzTWFjaW50b3NoID0gKHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nKTtcbiAgICBfaXNMaW51eCA9IChwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnKTtcbiAgICBfbG9jYWxlID0gTEFOR1VBR0VfREVGQVVMVDtcbiAgICBfbGFuZ3VhZ2UgPSBMQU5HVUFHRV9ERUZBVUxUO1xuICAgIHZhciByYXdObHNDb25maWcgPSBwcm9jZXNzLmVudlsnVlNDT0RFX05MU19DT05GSUcnXTtcbiAgICBpZiAocmF3TmxzQ29uZmlnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbmxzQ29uZmlnID0gSlNPTi5wYXJzZShyYXdObHNDb25maWcpO1xuICAgICAgICAgICAgdmFyIHJlc29sdmVkID0gbmxzQ29uZmlnLmF2YWlsYWJsZUxhbmd1YWdlc1snKiddO1xuICAgICAgICAgICAgX2xvY2FsZSA9IG5sc0NvbmZpZy5sb2NhbGU7XG4gICAgICAgICAgICAvLyBWU0NvZGUncyBkZWZhdWx0IGxhbmd1YWdlIGlzICdlbidcbiAgICAgICAgICAgIF9sYW5ndWFnZSA9IHJlc29sdmVkID8gcmVzb2x2ZWQgOiBMQU5HVUFHRV9ERUZBVUxUO1xuICAgICAgICAgICAgX3RyYW5zbGF0aW9uc0NvbmZpZ0ZpbGUgPSBubHNDb25maWcuX3RyYW5zbGF0aW9uc0NvbmZpZ0ZpbGU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNOYXRpdmUgPSB0cnVlO1xufVxudmFyIF9wbGF0Zm9ybSA9IDAgLyogV2ViICovO1xuaWYgKF9pc05hdGl2ZSkge1xuICAgIGlmIChfaXNNYWNpbnRvc2gpIHtcbiAgICAgICAgX3BsYXRmb3JtID0gMSAvKiBNYWMgKi87XG4gICAgfVxuICAgIGVsc2UgaWYgKF9pc1dpbmRvd3MpIHtcbiAgICAgICAgX3BsYXRmb3JtID0gMyAvKiBXaW5kb3dzICovO1xuICAgIH1cbiAgICBlbHNlIGlmIChfaXNMaW51eCkge1xuICAgICAgICBfcGxhdGZvcm0gPSAyIC8qIExpbnV4ICovO1xuICAgIH1cbn1cbmV4cG9ydCB2YXIgaXNXaW5kb3dzID0gX2lzV2luZG93cztcbmV4cG9ydCB2YXIgaXNNYWNpbnRvc2ggPSBfaXNNYWNpbnRvc2g7XG5leHBvcnQgdmFyIGlzTGludXggPSBfaXNMaW51eDtcbmV4cG9ydCB2YXIgaXNOYXRpdmUgPSBfaXNOYXRpdmU7XG5leHBvcnQgdmFyIGlzV2ViID0gX2lzV2ViO1xudmFyIF9nbG9iYWxzID0gKHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JyA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyA/IGdsb2JhbCA6IHt9KTtcbmV4cG9ydCB2YXIgZ2xvYmFscyA9IF9nbG9iYWxzO1xudmFyIF9zZXRJbW1lZGlhdGUgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgIGlmIChfc2V0SW1tZWRpYXRlID09PSBudWxsKSB7XG4gICAgICAgIGlmIChnbG9iYWxzLnNldEltbWVkaWF0ZSkge1xuICAgICAgICAgICAgX3NldEltbWVkaWF0ZSA9IGdsb2JhbHMuc2V0SW1tZWRpYXRlLmJpbmQoZ2xvYmFscyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLm5leHRUaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBfc2V0SW1tZWRpYXRlID0gcHJvY2Vzcy5uZXh0VGljay5iaW5kKHByb2Nlc3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3NldEltbWVkaWF0ZSA9IGdsb2JhbHMuc2V0VGltZW91dC5iaW5kKGdsb2JhbHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfc2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcbn1cbmV4cG9ydCB2YXIgT1MgPSAoX2lzTWFjaW50b3NoID8gMiAvKiBNYWNpbnRvc2ggKi8gOiAoX2lzV2luZG93cyA/IDEgLyogV2luZG93cyAqLyA6IDMgLyogTGludXggKi8pKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBUaGUgZW1wdHkgc3RyaW5nLlxuICovXG5leHBvcnQgdmFyIGVtcHR5ID0gJyc7XG5leHBvcnQgZnVuY3Rpb24gaXNGYWxzeU9yV2hpdGVzcGFjZShzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci50cmltKCkubGVuZ3RoID09PSAwO1xufVxuLyoqXG4gKiBAcmV0dXJucyB0aGUgcHJvdmlkZWQgbnVtYmVyIHdpdGggdGhlIGdpdmVuIG51bWJlciBvZiBwcmVjZWRpbmcgemVyb3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWQobiwgbCwgY2hhcikge1xuICAgIGlmIChjaGFyID09PSB2b2lkIDApIHsgY2hhciA9ICcwJzsgfVxuICAgIHZhciBzdHIgPSAnJyArIG47XG4gICAgdmFyIHIgPSBbc3RyXTtcbiAgICBmb3IgKHZhciBpID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICByLnB1c2goY2hhcik7XG4gICAgfVxuICAgIHJldHVybiByLnJldmVyc2UoKS5qb2luKCcnKTtcbn1cbnZhciBfZm9ybWF0UmVnZXhwID0gL3soXFxkKyl9L2c7XG4vKipcbiAqIEhlbHBlciB0byBwcm9kdWNlIGEgc3RyaW5nIHdpdGggYSB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLiBJbnNlcnQgdmFyaWFibGUgc2VnbWVudHNcbiAqIGludG8gdGhlIHN0cmluZyB1c2luZyB0aGUge259IG5vdGF0aW9uIHdoZXJlIE4gaXMgdGhlIGluZGV4IG9mIHRoZSBhcmd1bWVudCBmb2xsb3dpbmcgdGhlIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBzdHJpbmcgdG8gd2hpY2ggZm9ybWF0dGluZyBpcyBhcHBsaWVkXG4gKiBAcGFyYW0gYXJncyByZXBsYWNlbWVudHMgZm9yIHtufS1lbnRyaWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQodmFsdWUpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKF9mb3JtYXRSZWdleHAsIGZ1bmN0aW9uIChtYXRjaCwgZ3JvdXApIHtcbiAgICAgICAgdmFyIGlkeCA9IHBhcnNlSW50KGdyb3VwLCAxMCk7XG4gICAgICAgIHJldHVybiBpc05hTihpZHgpIHx8IGlkeCA8IDAgfHwgaWR4ID49IGFyZ3MubGVuZ3RoID9cbiAgICAgICAgICAgIG1hdGNoIDpcbiAgICAgICAgICAgIGFyZ3NbaWR4XTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ29udmVydHMgSFRNTCBjaGFyYWN0ZXJzIGluc2lkZSB0aGUgc3RyaW5nIHRvIHVzZSBlbnRpdGllcyBpbnN0ZWFkLiBNYWtlcyB0aGUgc3RyaW5nIHNhZmUgZnJvbVxuICogYmVpbmcgdXNlZCBlLmcuIGluIEhUTUxFbGVtZW50LmlubmVySFRNTC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvWzw+Jl0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHN3aXRjaCAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNhc2UgJzwnOiByZXR1cm4gJyZsdDsnO1xuICAgICAgICAgICAgY2FzZSAnPic6IHJldHVybiAnJmd0Oyc7XG4gICAgICAgICAgICBjYXNlICcmJzogcmV0dXJuICcmYW1wOyc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogRXNjYXBlcyByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVycyBpbiBhIGdpdmVuIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUmVnRXhwQ2hhcmFjdGVycyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXFwtXFxcXFxce1xcfVxcKlxcK1xcP1xcfFxcXlxcJFxcLlxcW1xcXVxcKFxcKVxcI10vZywgJ1xcXFwkJicpO1xufVxuLyoqXG4gKiBSZW1vdmVzIGFsbCBvY2N1cnJlbmNlcyBvZiBuZWVkbGUgZnJvbSB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgaGF5c3RhY2suXG4gKiBAcGFyYW0gaGF5c3RhY2sgc3RyaW5nIHRvIHRyaW1cbiAqIEBwYXJhbSBuZWVkbGUgdGhlIHRoaW5nIHRvIHRyaW0gKGRlZmF1bHQgaXMgYSBibGFuaylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgIGlmIChuZWVkbGUgPT09IHZvaWQgMCkgeyBuZWVkbGUgPSAnICc7IH1cbiAgICB2YXIgdHJpbW1lZCA9IGx0cmltKGhheXN0YWNrLCBuZWVkbGUpO1xuICAgIHJldHVybiBydHJpbSh0cmltbWVkLCBuZWVkbGUpO1xufVxuLyoqXG4gKiBSZW1vdmVzIGFsbCBvY2N1cnJlbmNlcyBvZiBuZWVkbGUgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIGhheXN0YWNrLlxuICogQHBhcmFtIGhheXN0YWNrIHN0cmluZyB0byB0cmltXG4gKiBAcGFyYW0gbmVlZGxlIHRoZSB0aGluZyB0byB0cmltXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsdHJpbShoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgaWYgKCFoYXlzdGFjayB8fCAhbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjaztcbiAgICB9XG4gICAgdmFyIG5lZWRsZUxlbiA9IG5lZWRsZS5sZW5ndGg7XG4gICAgaWYgKG5lZWRsZUxlbiA9PT0gMCB8fCBoYXlzdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB3aGlsZSAoaGF5c3RhY2suaW5kZXhPZihuZWVkbGUsIG9mZnNldCkgPT09IG9mZnNldCkge1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKyBuZWVkbGVMZW47XG4gICAgfVxuICAgIHJldHVybiBoYXlzdGFjay5zdWJzdHJpbmcob2Zmc2V0KTtcbn1cbi8qKlxuICogUmVtb3ZlcyBhbGwgb2NjdXJyZW5jZXMgb2YgbmVlZGxlIGZyb20gdGhlIGVuZCBvZiBoYXlzdGFjay5cbiAqIEBwYXJhbSBoYXlzdGFjayBzdHJpbmcgdG8gdHJpbVxuICogQHBhcmFtIG5lZWRsZSB0aGUgdGhpbmcgdG8gdHJpbVxuICovXG5leHBvcnQgZnVuY3Rpb24gcnRyaW0oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgIGlmICghaGF5c3RhY2sgfHwgIW5lZWRsZSkge1xuICAgICAgICByZXR1cm4gaGF5c3RhY2s7XG4gICAgfVxuICAgIHZhciBuZWVkbGVMZW4gPSBuZWVkbGUubGVuZ3RoLCBoYXlzdGFja0xlbiA9IGhheXN0YWNrLmxlbmd0aDtcbiAgICBpZiAobmVlZGxlTGVuID09PSAwIHx8IGhheXN0YWNrTGVuID09PSAwKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjaztcbiAgICB9XG4gICAgdmFyIG9mZnNldCA9IGhheXN0YWNrTGVuLCBpZHggPSAtMTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZHggPSBoYXlzdGFjay5sYXN0SW5kZXhPZihuZWVkbGUsIG9mZnNldCAtIDEpO1xuICAgICAgICBpZiAoaWR4ID09PSAtMSB8fCBpZHggKyBuZWVkbGVMZW4gIT09IG9mZnNldCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkeCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IGlkeDtcbiAgICB9XG4gICAgcmV0dXJuIGhheXN0YWNrLnN1YnN0cmluZygwLCBvZmZzZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRTaW1wbGUyUmVnRXhwUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvW1xcLVxcXFxcXHtcXH1cXCtcXD9cXHxcXF5cXCRcXC5cXCxcXFtcXF1cXChcXClcXCNcXHNdL2csICdcXFxcJCYnKS5yZXBsYWNlKC9bXFwqXS9nLCAnLionKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBoYXlzdGFjayBzdGFydHMgd2l0aCBuZWVkbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICBpZiAoaGF5c3RhY2subGVuZ3RoIDwgbmVlZGxlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChoYXlzdGFjayA9PT0gbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5lZWRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGF5c3RhY2tbaV0gIT09IG5lZWRsZVtpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGhheXN0YWNrIGVuZHMgd2l0aCBuZWVkbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmRzV2l0aChoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgdmFyIGRpZmYgPSBoYXlzdGFjay5sZW5ndGggLSBuZWVkbGUubGVuZ3RoO1xuICAgIGlmIChkaWZmID4gMCkge1xuICAgICAgICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihuZWVkbGUsIGRpZmYpID09PSBkaWZmO1xuICAgIH1cbiAgICBlbHNlIGlmIChkaWZmID09PSAwKSB7XG4gICAgICAgIHJldHVybiBoYXlzdGFjayA9PT0gbmVlZGxlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWdFeHAoc2VhcmNoU3RyaW5nLCBpc1JlZ2V4LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBpZiAoIXNlYXJjaFN0cmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgcmVnZXggZnJvbSBlbXB0eSBzdHJpbmcnKTtcbiAgICB9XG4gICAgaWYgKCFpc1JlZ2V4KSB7XG4gICAgICAgIHNlYXJjaFN0cmluZyA9IGVzY2FwZVJlZ0V4cENoYXJhY3RlcnMoc2VhcmNoU3RyaW5nKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMud2hvbGVXb3JkKSB7XG4gICAgICAgIGlmICghL1xcQi8udGVzdChzZWFyY2hTdHJpbmcuY2hhckF0KDApKSkge1xuICAgICAgICAgICAgc2VhcmNoU3RyaW5nID0gJ1xcXFxiJyArIHNlYXJjaFN0cmluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9cXEIvLnRlc3Qoc2VhcmNoU3RyaW5nLmNoYXJBdChzZWFyY2hTdHJpbmcubGVuZ3RoIC0gMSkpKSB7XG4gICAgICAgICAgICBzZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcgKyAnXFxcXGInO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBtb2RpZmllcnMgPSAnJztcbiAgICBpZiAob3B0aW9ucy5nbG9iYWwpIHtcbiAgICAgICAgbW9kaWZpZXJzICs9ICdnJztcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLm1hdGNoQ2FzZSkge1xuICAgICAgICBtb2RpZmllcnMgKz0gJ2knO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5tdWx0aWxpbmUpIHtcbiAgICAgICAgbW9kaWZpZXJzICs9ICdtJztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudW5pY29kZSkge1xuICAgICAgICBtb2RpZmllcnMgKz0gJ3UnO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzZWFyY2hTdHJpbmcsIG1vZGlmaWVycyk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnRXhwTGVhZHNUb0VuZGxlc3NMb29wKHJlZ2V4cCkge1xuICAgIC8vIEV4aXQgZWFybHkgaWYgaXQncyBvbmUgb2YgdGhlc2Ugc3BlY2lhbCBjYXNlcyB3aGljaCBhcmUgbWVhbnQgdG8gbWF0Y2hcbiAgICAvLyBhZ2FpbnN0IGFuIGVtcHR5IHN0cmluZ1xuICAgIGlmIChyZWdleHAuc291cmNlID09PSAnXicgfHwgcmVnZXhwLnNvdXJjZSA9PT0gJ14kJyB8fCByZWdleHAuc291cmNlID09PSAnJCcgfHwgcmVnZXhwLnNvdXJjZSA9PT0gJ15cXFxccyokJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFdlIGNoZWNrIGFnYWluc3QgYW4gZW1wdHkgc3RyaW5nLiBJZiB0aGUgcmVndWxhciBleHByZXNzaW9uIGRvZXNuJ3QgYWR2YW5jZVxuICAgIC8vIChlLmcuIGVuZHMgaW4gYW4gZW5kbGVzcyBsb29wKSBpdCB3aWxsIG1hdGNoIGFuIGVtcHR5IHN0cmluZy5cbiAgICB2YXIgbWF0Y2ggPSByZWdleHAuZXhlYygnJyk7XG4gICAgcmV0dXJuICEhKG1hdGNoICYmIHJlZ2V4cC5sYXN0SW5kZXggPT09IDApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ0V4cEZsYWdzKHJlZ2V4cCkge1xuICAgIHJldHVybiAocmVnZXhwLmdsb2JhbCA/ICdnJyA6ICcnKVxuICAgICAgICArIChyZWdleHAuaWdub3JlQ2FzZSA/ICdpJyA6ICcnKVxuICAgICAgICArIChyZWdleHAubXVsdGlsaW5lID8gJ20nIDogJycpXG4gICAgICAgICsgKHJlZ2V4cC51bmljb2RlID8gJ3UnIDogJycpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGZpcnN0IGluZGV4IG9mIHRoZSBzdHJpbmcgdGhhdCBpcyBub3Qgd2hpdGVzcGFjZS5cbiAqIElmIHN0cmluZyBpcyBlbXB0eSBvciBjb250YWlucyBvbmx5IHdoaXRlc3BhY2VzLCByZXR1cm5zIC0xXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdE5vbldoaXRlc3BhY2VJbmRleChzdHIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBjaENvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNoQ29kZSAhPT0gMzIgLyogU3BhY2UgKi8gJiYgY2hDb2RlICE9PSA5IC8qIFRhYiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsZWFkaW5nIHdoaXRlc3BhY2Ugb2YgdGhlIHN0cmluZy5cbiAqIElmIHRoZSBzdHJpbmcgY29udGFpbnMgb25seSB3aGl0ZXNwYWNlcywgcmV0dXJucyBlbnRpcmUgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMZWFkaW5nV2hpdGVzcGFjZShzdHIsIHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoc3RhcnQgPT09IHZvaWQgMCkgeyBzdGFydCA9IDA7IH1cbiAgICBpZiAoZW5kID09PSB2b2lkIDApIHsgZW5kID0gc3RyLmxlbmd0aDsgfVxuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIHZhciBjaENvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNoQ29kZSAhPT0gMzIgLyogU3BhY2UgKi8gJiYgY2hDb2RlICE9PSA5IC8qIFRhYiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGxhc3QgaW5kZXggb2YgdGhlIHN0cmluZyB0aGF0IGlzIG5vdCB3aGl0ZXNwYWNlLlxuICogSWYgc3RyaW5nIGlzIGVtcHR5IG9yIGNvbnRhaW5zIG9ubHkgd2hpdGVzcGFjZXMsIHJldHVybnMgLTFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3ROb25XaGl0ZXNwYWNlSW5kZXgoc3RyLCBzdGFydEluZGV4KSB7XG4gICAgaWYgKHN0YXJ0SW5kZXggPT09IHZvaWQgMCkgeyBzdGFydEluZGV4ID0gc3RyLmxlbmd0aCAtIDE7IH1cbiAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIGNoQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY2hDb2RlICE9PSAzMiAvKiBTcGFjZSAqLyAmJiBjaENvZGUgIT09IDkgLyogVGFiICovKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gICAgaWYgKGEgPCBiKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNMb3dlckFzY2lpTGV0dGVyKGNvZGUpIHtcbiAgICByZXR1cm4gY29kZSA+PSA5NyAvKiBhICovICYmIGNvZGUgPD0gMTIyIC8qIHogKi87XG59XG5leHBvcnQgZnVuY3Rpb24gaXNVcHBlckFzY2lpTGV0dGVyKGNvZGUpIHtcbiAgICByZXR1cm4gY29kZSA+PSA2NSAvKiBBICovICYmIGNvZGUgPD0gOTAgLyogWiAqLztcbn1cbmZ1bmN0aW9uIGlzQXNjaWlMZXR0ZXIoY29kZSkge1xuICAgIHJldHVybiBpc0xvd2VyQXNjaWlMZXR0ZXIoY29kZSkgfHwgaXNVcHBlckFzY2lpTGV0dGVyKGNvZGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsc0lnbm9yZUNhc2UoYSwgYikge1xuICAgIHZhciBsZW4xID0gYSA/IGEubGVuZ3RoIDogMDtcbiAgICB2YXIgbGVuMiA9IGIgPyBiLmxlbmd0aCA6IDA7XG4gICAgaWYgKGxlbjEgIT09IGxlbjIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZG9FcXVhbHNJZ25vcmVDYXNlKGEsIGIpO1xufVxuZnVuY3Rpb24gZG9FcXVhbHNJZ25vcmVDYXNlKGEsIGIsIHN0b3BBdCkge1xuICAgIGlmIChzdG9wQXQgPT09IHZvaWQgMCkgeyBzdG9wQXQgPSBhLmxlbmd0aDsgfVxuICAgIGlmICh0eXBlb2YgYSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9wQXQ7IGkrKykge1xuICAgICAgICB2YXIgY29kZUEgPSBhLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHZhciBjb2RlQiA9IGIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNvZGVBID09PSBjb2RlQikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYS16IEEtWlxuICAgICAgICBpZiAoaXNBc2NpaUxldHRlcihjb2RlQSkgJiYgaXNBc2NpaUxldHRlcihjb2RlQikpIHtcbiAgICAgICAgICAgIHZhciBkaWZmID0gTWF0aC5hYnMoY29kZUEgLSBjb2RlQik7XG4gICAgICAgICAgICBpZiAoZGlmZiAhPT0gMCAmJiBkaWZmICE9PSAzMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBbnkgb3RoZXIgY2hhcmNvZGVcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlQSkudG9Mb3dlckNhc2UoKSAhPT0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlQikudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoSWdub3JlQ2FzZShzdHIsIGNhbmRpZGF0ZSkge1xuICAgIHZhciBjYW5kaWRhdGVMZW5ndGggPSBjYW5kaWRhdGUubGVuZ3RoO1xuICAgIGlmIChjYW5kaWRhdGUubGVuZ3RoID4gc3RyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBkb0VxdWFsc0lnbm9yZUNhc2Uoc3RyLCBjYW5kaWRhdGUsIGNhbmRpZGF0ZUxlbmd0aCk7XG59XG4vKipcbiAqIEByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIGNvbW1vbiBwcmVmaXggb2YgdGhlIHR3byBzdHJpbmdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uUHJlZml4TGVuZ3RoKGEsIGIpIHtcbiAgICB2YXIgaSwgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGEuY2hhckNvZGVBdChpKSAhPT0gYi5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuO1xufVxuLyoqXG4gKiBAcmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSBjb21tb24gc3VmZml4IG9mIHRoZSB0d28gc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vblN1ZmZpeExlbmd0aChhLCBiKSB7XG4gICAgdmFyIGksIGxlbiA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgdmFyIGFMYXN0SW5kZXggPSBhLmxlbmd0aCAtIDE7XG4gICAgdmFyIGJMYXN0SW5kZXggPSBiLmxlbmd0aCAtIDE7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChhLmNoYXJDb2RlQXQoYUxhc3RJbmRleCAtIGkpICE9PSBiLmNoYXJDb2RlQXQoYkxhc3RJbmRleCAtIGkpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuO1xufVxuLy8gLS0tIHVuaWNvZGVcbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU3Vycm9nYXRlX3BhaXJcbi8vIFJldHVybnMgdGhlIGNvZGUgcG9pbnQgc3RhcnRpbmcgYXQgYSBzcGVjaWZpZWQgaW5kZXggaW4gYSBzdHJpbmdcbi8vIENvZGUgcG9pbnRzIFUrMDAwMCB0byBVK0Q3RkYgYW5kIFUrRTAwMCB0byBVK0ZGRkYgYXJlIHJlcHJlc2VudGVkIG9uIGEgc2luZ2xlIGNoYXJhY3RlclxuLy8gQ29kZSBwb2ludHMgVSsxMDAwMCB0byBVKzEwRkZGRiBhcmUgcmVwcmVzZW50ZWQgb24gdHdvIGNvbnNlY3V0aXZlIGNoYXJhY3RlcnNcbi8vZXhwb3J0IGZ1bmN0aW9uIGdldFVuaWNvZGVQb2ludChzdHI6c3RyaW5nLCBpbmRleDpudW1iZXIsIGxlbjpudW1iZXIpOm51bWJlciB7XG4vL1x0bGV0IGNockNvZGUgPSBzdHIuY2hhckNvZGVBdChpbmRleCk7XG4vL1x0aWYgKDB4RDgwMCA8PSBjaHJDb2RlICYmIGNockNvZGUgPD0gMHhEQkZGICYmIGluZGV4ICsgMSA8IGxlbikge1xuLy9cdFx0bGV0IG5leHRDaHJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbi8vXHRcdGlmICgweERDMDAgPD0gbmV4dENockNvZGUgJiYgbmV4dENockNvZGUgPD0gMHhERkZGKSB7XG4vL1x0XHRcdHJldHVybiAoY2hyQ29kZSAtIDB4RDgwMCkgPDwgMTAgKyAobmV4dENockNvZGUgLSAweERDMDApICsgMHgxMDAwMDtcbi8vXHRcdH1cbi8vXHR9XG4vL1x0cmV0dXJuIGNockNvZGU7XG4vL31cbmV4cG9ydCBmdW5jdGlvbiBpc0hpZ2hTdXJyb2dhdGUoY2hhckNvZGUpIHtcbiAgICByZXR1cm4gKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweERCRkYpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzTG93U3Vycm9nYXRlKGNoYXJDb2RlKSB7XG4gICAgcmV0dXJuICgweERDMDAgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gMHhERkZGKTtcbn1cbi8qKlxuICogR2VuZXJhdGVkIHVzaW5nIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4YW5kcnVkaW1hL3VuaWNvZGUtdXRpbHMvYmxvYi9tYXN0ZXIvZ2VuZXJhdGUtcnRsLXRlc3QuanNcbiAqL1xudmFyIENPTlRBSU5TX1JUTCA9IC8oPzpbXFx1MDVCRVxcdTA1QzBcXHUwNUMzXFx1MDVDNlxcdTA1RDAtXFx1MDVGNFxcdTA2MDhcXHUwNjBCXFx1MDYwRFxcdTA2MUItXFx1MDY0QVxcdTA2NkQtXFx1MDY2RlxcdTA2NzEtXFx1MDZENVxcdTA2RTVcXHUwNkU2XFx1MDZFRVxcdTA2RUZcXHUwNkZBLVxcdTA3MTBcXHUwNzEyLVxcdTA3MkZcXHUwNzRELVxcdTA3QTVcXHUwN0IxLVxcdTA3RUFcXHUwN0Y0XFx1MDdGNVxcdTA3RkEtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4MzAtXFx1MDg1OFxcdTA4NUUtXFx1MDhCRFxcdTIwMEZcXHVGQjFEXFx1RkIxRi1cXHVGQjI4XFx1RkIyQS1cXHVGRDNEXFx1RkQ1MC1cXHVGREZDXFx1RkU3MC1cXHVGRUZDXXxcXHVEODAyW1xcdURDMDAtXFx1REQxQlxcdUREMjAtXFx1REUwMFxcdURFMTAtXFx1REUzM1xcdURFNDAtXFx1REVFNFxcdURFRUItXFx1REYzNVxcdURGNDAtXFx1REZGRl18XFx1RDgwM1tcXHVEQzAwLVxcdURDRkZdfFxcdUQ4M0FbXFx1REMwMC1cXHVEQ0NGXFx1REQwMC1cXHVERDQzXFx1REQ1MC1cXHVERkZGXXxcXHVEODNCW1xcdURDMDAtXFx1REVCQl0pLztcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGBzdHJgIGNvbnRhaW5zIGFueSBVbmljb2RlIGNoYXJhY3RlciB0aGF0IGlzIGNsYXNzaWZpZWQgYXMgXCJSXCIgb3IgXCJBTFwiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNSVEwoc3RyKSB7XG4gICAgcmV0dXJuIENPTlRBSU5TX1JUTC50ZXN0KHN0cik7XG59XG4vKipcbiAqIEdlbmVyYXRlZCB1c2luZyBodHRwczovL2dpdGh1Yi5jb20vYWxleGFuZHJ1ZGltYS91bmljb2RlLXV0aWxzL2Jsb2IvbWFzdGVyL2dlbmVyYXRlLWVtb2ppLXRlc3QuanNcbiAqL1xudmFyIENPTlRBSU5TX0VNT0pJID0gLyg/OltcXHUyMzFBXFx1MjMxQlxcdTIzRjBcXHUyM0YzXFx1MjYwMC1cXHUyN0JGXFx1MkI1MFxcdTJCNTVdfFxcdUQ4M0NbXFx1RERFNi1cXHVEREZGXFx1REYwMC1cXHVERkZGXXxcXHVEODNEW1xcdURDMDAtXFx1REU0RlxcdURFODAtXFx1REVGOF18XFx1RDgzRVtcXHVERDAwLVxcdURERTZdKS87XG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNFbW9qaShzdHIpIHtcbiAgICByZXR1cm4gQ09OVEFJTlNfRU1PSkkudGVzdChzdHIpO1xufVxudmFyIElTX0JBU0lDX0FTQ0lJID0gL15bXFx0XFxuXFxyXFx4MjAtXFx4N0VdKiQvO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHN0cmAgY29udGFpbnMgb25seSBiYXNpYyBBU0NJSSBjaGFyYWN0ZXJzIGluIHRoZSByYW5nZSAzMiAtIDEyNiAoaW5jbHVkaW5nIDMyIGFuZCAxMjYpIG9yIFxcbiwgXFxyLCBcXHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmFzaWNBU0NJSShzdHIpIHtcbiAgICByZXR1cm4gSVNfQkFTSUNfQVNDSUkudGVzdChzdHIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zRnVsbFdpZHRoQ2hhcmFjdGVyKHN0cikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGlzRnVsbFdpZHRoQ2hhcmFjdGVyKHN0ci5jaGFyQ29kZUF0KGkpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVsbFdpZHRoQ2hhcmFjdGVyKGNoYXJDb2RlKSB7XG4gICAgLy8gRG8gYSBjaGVhcCB0cmljayB0byBiZXR0ZXIgc3VwcG9ydCB3cmFwcGluZyBvZiB3aWRlIGNoYXJhY3RlcnMsIHRyZWF0IHRoZW0gYXMgMiBjb2x1bW5zXG4gICAgLy8gaHR0cDovL2pyZ3JhcGhpeC5uZXQvcmVzZWFyY2gvdW5pY29kZV9ibG9ja3MucGhwXG4gICAgLy8gICAgICAgICAgMkU4MCDigJQgMkVGRiAgIENKSyBSYWRpY2FscyBTdXBwbGVtZW50XG4gICAgLy8gICAgICAgICAgMkYwMCDigJQgMkZERiAgIEthbmd4aSBSYWRpY2Fsc1xuICAgIC8vICAgICAgICAgIDJGRjAg4oCUIDJGRkYgICBJZGVvZ3JhcGhpYyBEZXNjcmlwdGlvbiBDaGFyYWN0ZXJzXG4gICAgLy8gICAgICAgICAgMzAwMCDigJQgMzAzRiAgIENKSyBTeW1ib2xzIGFuZCBQdW5jdHVhdGlvblxuICAgIC8vICAgICAgICAgIDMwNDAg4oCUIDMwOUYgICBIaXJhZ2FuYVxuICAgIC8vICAgICAgICAgIDMwQTAg4oCUIDMwRkYgICBLYXRha2FuYVxuICAgIC8vICAgICAgICAgIDMxMDAg4oCUIDMxMkYgICBCb3BvbW9mb1xuICAgIC8vICAgICAgICAgIDMxMzAg4oCUIDMxOEYgICBIYW5ndWwgQ29tcGF0aWJpbGl0eSBKYW1vXG4gICAgLy8gICAgICAgICAgMzE5MCDigJQgMzE5RiAgIEthbmJ1blxuICAgIC8vICAgICAgICAgIDMxQTAg4oCUIDMxQkYgICBCb3BvbW9mbyBFeHRlbmRlZFxuICAgIC8vICAgICAgICAgIDMxRjAg4oCUIDMxRkYgICBLYXRha2FuYSBQaG9uZXRpYyBFeHRlbnNpb25zXG4gICAgLy8gICAgICAgICAgMzIwMCDigJQgMzJGRiAgIEVuY2xvc2VkIENKSyBMZXR0ZXJzIGFuZCBNb250aHNcbiAgICAvLyAgICAgICAgICAzMzAwIOKAlCAzM0ZGICAgQ0pLIENvbXBhdGliaWxpdHlcbiAgICAvLyAgICAgICAgICAzNDAwIOKAlCA0REJGICAgQ0pLIFVuaWZpZWQgSWRlb2dyYXBocyBFeHRlbnNpb24gQVxuICAgIC8vICAgICAgICAgIDREQzAg4oCUIDRERkYgICBZaWppbmcgSGV4YWdyYW0gU3ltYm9sc1xuICAgIC8vICAgICAgICAgIDRFMDAg4oCUIDlGRkYgICBDSksgVW5pZmllZCBJZGVvZ3JhcGhzXG4gICAgLy8gICAgICAgICAgQTAwMCDigJQgQTQ4RiAgIFlpIFN5bGxhYmxlc1xuICAgIC8vICAgICAgICAgIEE0OTAg4oCUIEE0Q0YgICBZaSBSYWRpY2Fsc1xuICAgIC8vICAgICAgICAgIEFDMDAg4oCUIEQ3QUYgICBIYW5ndWwgU3lsbGFibGVzXG4gICAgLy8gW0lHTk9SRV0gRDgwMCDigJQgREI3RiAgIEhpZ2ggU3Vycm9nYXRlc1xuICAgIC8vIFtJR05PUkVdIERCODAg4oCUIERCRkYgICBIaWdoIFByaXZhdGUgVXNlIFN1cnJvZ2F0ZXNcbiAgICAvLyBbSUdOT1JFXSBEQzAwIOKAlCBERkZGICAgTG93IFN1cnJvZ2F0ZXNcbiAgICAvLyBbSUdOT1JFXSBFMDAwIOKAlCBGOEZGICAgUHJpdmF0ZSBVc2UgQXJlYVxuICAgIC8vICAgICAgICAgIEY5MDAg4oCUIEZBRkYgICBDSksgQ29tcGF0aWJpbGl0eSBJZGVvZ3JhcGhzXG4gICAgLy8gW0lHTk9SRV0gRkIwMCDigJQgRkI0RiAgIEFscGhhYmV0aWMgUHJlc2VudGF0aW9uIEZvcm1zXG4gICAgLy8gW0lHTk9SRV0gRkI1MCDigJQgRkRGRiAgIEFyYWJpYyBQcmVzZW50YXRpb24gRm9ybXMtQVxuICAgIC8vIFtJR05PUkVdIEZFMDAg4oCUIEZFMEYgICBWYXJpYXRpb24gU2VsZWN0b3JzXG4gICAgLy8gW0lHTk9SRV0gRkUyMCDigJQgRkUyRiAgIENvbWJpbmluZyBIYWxmIE1hcmtzXG4gICAgLy8gW0lHTk9SRV0gRkUzMCDigJQgRkU0RiAgIENKSyBDb21wYXRpYmlsaXR5IEZvcm1zXG4gICAgLy8gW0lHTk9SRV0gRkU1MCDigJQgRkU2RiAgIFNtYWxsIEZvcm0gVmFyaWFudHNcbiAgICAvLyBbSUdOT1JFXSBGRTcwIOKAlCBGRUZGICAgQXJhYmljIFByZXNlbnRhdGlvbiBGb3Jtcy1CXG4gICAgLy8gICAgICAgICAgRkYwMCDigJQgRkZFRiAgIEhhbGZ3aWR0aCBhbmQgRnVsbHdpZHRoIEZvcm1zXG4gICAgLy8gICAgICAgICAgICAgICBbaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSGFsZndpZHRoX2FuZF9mdWxsd2lkdGhfZm9ybXNdXG4gICAgLy8gICAgICAgICAgICAgICBvZiB3aGljaCBGRjAxIC0gRkY1RSBmdWxsd2lkdGggQVNDSUkgb2YgMjEgdG8gN0VcbiAgICAvLyBbSUdOT1JFXSAgICBhbmQgRkY2NSAtIEZGREMgaGFsZndpZHRoIG9mIEthdGFrYW5hIGFuZCBIYW5ndWxcbiAgICAvLyBbSUdOT1JFXSBGRkYwIOKAlCBGRkZGICAgU3BlY2lhbHNcbiAgICBjaGFyQ29kZSA9ICtjaGFyQ29kZTsgLy8gQHBlcmZcbiAgICByZXR1cm4gKChjaGFyQ29kZSA+PSAweDJFODAgJiYgY2hhckNvZGUgPD0gMHhEN0FGKVxuICAgICAgICB8fCAoY2hhckNvZGUgPj0gMHhGOTAwICYmIGNoYXJDb2RlIDw9IDB4RkFGRilcbiAgICAgICAgfHwgKGNoYXJDb2RlID49IDB4RkYwMSAmJiBjaGFyQ29kZSA8PSAweEZGNUUpKTtcbn1cbi8vIC0tIFVURi04IEJPTVxuZXhwb3J0IHZhciBVVEY4X0JPTV9DSEFSQUNURVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1Mjc5IC8qIFVURjhfQk9NICovKTtcbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoVVRGOEJPTShzdHIpIHtcbiAgICByZXR1cm4gISEoc3RyICYmIHN0ci5sZW5ndGggPiAwICYmIHN0ci5jaGFyQ29kZUF0KDApID09PSA2NTI3OSAvKiBVVEY4X0JPTSAqLyk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2FmZUJ0b2Eoc3RyKSB7XG4gICAgcmV0dXJuIGJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyB3ZSB1c2UgZW5jb2RlVVJJQ29tcG9uZW50IGJlY2F1c2UgYnRvYSBmYWlscyBmb3Igbm9uIExhdGluIDEgdmFsdWVzXG59XG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KHMsIGNvdW50KSB7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gcztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF90eXBlb2YgPSB7XG4gICAgbnVtYmVyOiAnbnVtYmVyJyxcbiAgICBzdHJpbmc6ICdzdHJpbmcnLFxuICAgIHVuZGVmaW5lZDogJ3VuZGVmaW5lZCcsXG4gICAgb2JqZWN0OiAnb2JqZWN0JyxcbiAgICBmdW5jdGlvbjogJ2Z1bmN0aW9uJ1xufTtcbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBBcnJheSBvciBub3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KGFycmF5KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyYXkpO1xuICAgIH1cbiAgICBpZiAoYXJyYXkgJiYgdHlwZW9mIChhcnJheS5sZW5ndGgpID09PSBfdHlwZW9mLm51bWJlciAmJiBhcnJheS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBTdHJpbmcgb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcoc3RyKSB7XG4gICAgaWYgKHR5cGVvZiAoc3RyKSA9PT0gX3R5cGVvZi5zdHJpbmcgfHwgc3RyIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgb2YgdHlwZSBgb2JqZWN0YCBidXQgKipub3QqKlxuICpcdGBudWxsYCwgYW4gYGFycmF5YCwgYSBgcmVnZXhwYCwgbm9yIGEgYGRhdGVgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgLy8gVGhlIG1ldGhvZCBjYW4ndCBkbyBhIHR5cGUgY2FzdCBzaW5jZSB0aGVyZSBhcmUgdHlwZSAobGlrZSBzdHJpbmdzKSB3aGljaFxuICAgIC8vIGFyZSBzdWJjbGFzc2VzIG9mIGFueSBwdXQgbm90IHBvc2l0dmVseSBtYXRjaGVkIGJ5IHRoZSBmdW5jdGlvbi4gSGVuY2UgdHlwZVxuICAgIC8vIG5hcnJvd2luZyByZXN1bHRzIGluIHdyb25nIHJlc3VsdHMuXG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IF90eXBlb2Yub2JqZWN0XG4gICAgICAgICYmIG9iaiAhPT0gbnVsbFxuICAgICAgICAmJiAhQXJyYXkuaXNBcnJheShvYmopXG4gICAgICAgICYmICEob2JqIGluc3RhbmNlb2YgUmVnRXhwKVxuICAgICAgICAmJiAhKG9iaiBpbnN0YW5jZW9mIERhdGUpO1xufVxuLyoqXG4gKiBJbiAqKmNvbnRyYXN0KiogdG8ganVzdCBjaGVja2luZyBgdHlwZW9mYCB0aGlzIHdpbGwgcmV0dXJuIGBmYWxzZWAgZm9yIGBOYU5gLlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBOdW1iZXIgb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgKG9iaikgPT09IF90eXBlb2YubnVtYmVyIHx8IG9iaiBpbnN0YW5jZW9mIE51bWJlcikgJiYgIWlzTmFOKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBCb29sZWFuIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2U7XG59XG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIChvYmopID09PSBfdHlwZW9mLnVuZGVmaW5lZDtcbn1cbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwob2JqKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKG9iaikgfHwgb2JqID09PSBudWxsO1xufVxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGFuIGVtcHR5IEphdmFTY3JpcHQgT2JqZWN0IG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlPYmplY3Qob2JqKSB7XG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBGdW5jdGlvbiBvciBub3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBfdHlwZW9mLmZ1bmN0aW9uO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ29uc3RyYWludHMoYXJncywgY29uc3RyYWludHMpIHtcbiAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJncy5sZW5ndGgsIGNvbnN0cmFpbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNvbnN0cmFpbnQoYXJnc1tpXSwgY29uc3RyYWludHNbaV0pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUNvbnN0cmFpbnQoYXJnLCBjb25zdHJhaW50KSB7XG4gICAgaWYgKGlzU3RyaW5nKGNvbnN0cmFpbnQpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnICE9PSBjb25zdHJhaW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmd1bWVudCBkb2VzIG5vdCBtYXRjaCBjb25zdHJhaW50OiB0eXBlb2YgXCIgKyBjb25zdHJhaW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKGNvbnN0cmFpbnQpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgY29uc3RyYWludCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZVxuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWRPck51bGwoYXJnKSAmJiBhcmcuY29uc3RydWN0b3IgPT09IGNvbnN0cmFpbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uc3RyYWludC5sZW5ndGggPT09IDEgJiYgY29uc3RyYWludC5jYWxsKHVuZGVmaW5lZCwgYXJnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFyZ3VtZW50IGRvZXMgbm90IG1hdGNoIG9uZSBvZiB0aGVzZSBjb25zdHJhaW50czogYXJnIGluc3RhbmNlb2YgY29uc3RyYWludCwgYXJnLmNvbnN0cnVjdG9yID09PSBjb25zdHJhaW50LCBub3IgY29uc3RyYWludChhcmcpID09PSB0cnVlXCIpO1xuICAgIH1cbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgb2YgdGhlIHByb3ZpZGVkIGNsYXNzIGFuZCB3aWxsIGNhbGwgdGhlIGNvbnN0cnVjdG9yIHdpdGhcbiAqIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50IHN1cHBsaWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKGN0b3IpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBfYTtcbiAgICBpZiAoaXNOYXRpdmVDbGFzcyhjdG9yKSkge1xuICAgICAgICByZXR1cm4gbmV3ICgoX2EgPSBjdG9yKS5iaW5kLmFwcGx5KF9hLCBbdm9pZCAwXS5jb25jYXQoYXJncykpKSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUoY3Rvci5wcm90b3R5cGUpO1xuICAgICAgICBjdG9yLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxufVxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMyMjM1NjQ1LzE0OTkxNTlcbmZ1bmN0aW9uIGlzTmF0aXZlQ2xhc3ModGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nXG4gICAgICAgICYmIHRoaW5nLmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKVxuICAgICAgICAmJiAhdGhpbmcuaGFzT3duUHJvcGVydHkoJ2FyZ3VtZW50cycpO1xufVxuLyoqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbFByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIHdoaWxlIChPYmplY3QucHJvdG90eXBlICE9PSBwcm90bykge1xuICAgICAgICByZXMgPSByZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKSk7XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX2E7XG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcbnZhciBfc2NoZW1lUGF0dGVybiA9IC9eXFx3W1xcd1xcZCsuLV0qJC87XG52YXIgX3NpbmdsZVNsYXNoU3RhcnQgPSAvXlxcLy87XG52YXIgX2RvdWJsZVNsYXNoU3RhcnQgPSAvXlxcL1xcLy87XG52YXIgX3Rocm93T25NaXNzaW5nU2NoZW1hID0gdHJ1ZTtcbmZ1bmN0aW9uIF92YWxpZGF0ZVVyaShyZXQsIF9zdHJpY3QpIHtcbiAgICAvLyBzY2hlbWUsIG11c3QgYmUgc2V0XG4gICAgaWYgKCFyZXQuc2NoZW1lKSB7XG4gICAgICAgIGlmIChfc3RyaWN0IHx8IF90aHJvd09uTWlzc2luZ1NjaGVtYSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1VyaUVycm9yXTogU2NoZW1lIGlzIG1pc3Npbmc6IHtzY2hlbWU6IFxcXCJcXFwiLCBhdXRob3JpdHk6IFxcXCJcIiArIHJldC5hdXRob3JpdHkgKyBcIlxcXCIsIHBhdGg6IFxcXCJcIiArIHJldC5wYXRoICsgXCJcXFwiLCBxdWVyeTogXFxcIlwiICsgcmV0LnF1ZXJ5ICsgXCJcXFwiLCBmcmFnbWVudDogXFxcIlwiICsgcmV0LmZyYWdtZW50ICsgXCJcXFwifVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltVcmlFcnJvcl06IFNjaGVtZSBpcyBtaXNzaW5nOiB7c2NoZW1lOiBcXFwiXFxcIiwgYXV0aG9yaXR5OiBcXFwiXCIgKyByZXQuYXV0aG9yaXR5ICsgXCJcXFwiLCBwYXRoOiBcXFwiXCIgKyByZXQucGF0aCArIFwiXFxcIiwgcXVlcnk6IFxcXCJcIiArIHJldC5xdWVyeSArIFwiXFxcIiwgZnJhZ21lbnQ6IFxcXCJcIiArIHJldC5mcmFnbWVudCArIFwiXFxcIn1cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gc2NoZW1lLCBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMVxuICAgIC8vIEFMUEhBICooIEFMUEhBIC8gRElHSVQgLyBcIitcIiAvIFwiLVwiIC8gXCIuXCIgKVxuICAgIGlmIChyZXQuc2NoZW1lICYmICFfc2NoZW1lUGF0dGVybi50ZXN0KHJldC5zY2hlbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1VyaUVycm9yXTogU2NoZW1lIGNvbnRhaW5zIGlsbGVnYWwgY2hhcmFjdGVycy4nKTtcbiAgICB9XG4gICAgLy8gcGF0aCwgaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuM1xuICAgIC8vIElmIGEgVVJJIGNvbnRhaW5zIGFuIGF1dGhvcml0eSBjb21wb25lbnQsIHRoZW4gdGhlIHBhdGggY29tcG9uZW50XG4gICAgLy8gbXVzdCBlaXRoZXIgYmUgZW1wdHkgb3IgYmVnaW4gd2l0aCBhIHNsYXNoIChcIi9cIikgY2hhcmFjdGVyLiAgSWYgYSBVUklcbiAgICAvLyBkb2VzIG5vdCBjb250YWluIGFuIGF1dGhvcml0eSBjb21wb25lbnQsIHRoZW4gdGhlIHBhdGggY2Fubm90IGJlZ2luXG4gICAgLy8gd2l0aCB0d28gc2xhc2ggY2hhcmFjdGVycyAoXCIvL1wiKS5cbiAgICBpZiAocmV0LnBhdGgpIHtcbiAgICAgICAgaWYgKHJldC5hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIGlmICghX3NpbmdsZVNsYXNoU3RhcnQudGVzdChyZXQucGF0aCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tVcmlFcnJvcl06IElmIGEgVVJJIGNvbnRhaW5zIGFuIGF1dGhvcml0eSBjb21wb25lbnQsIHRoZW4gdGhlIHBhdGggY29tcG9uZW50IG11c3QgZWl0aGVyIGJlIGVtcHR5IG9yIGJlZ2luIHdpdGggYSBzbGFzaCAoXCIvXCIpIGNoYXJhY3RlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKF9kb3VibGVTbGFzaFN0YXJ0LnRlc3QocmV0LnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVXJpRXJyb3JdOiBJZiBhIFVSSSBkb2VzIG5vdCBjb250YWluIGFuIGF1dGhvcml0eSBjb21wb25lbnQsIHRoZW4gdGhlIHBhdGggY2Fubm90IGJlZ2luIHdpdGggdHdvIHNsYXNoIGNoYXJhY3RlcnMgKFwiLy9cIiknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIGltcGxlbWVudHMgYSBiaXQgb2YgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01XG5mdW5jdGlvbiBfcmVmZXJlbmNlUmVzb2x1dGlvbihzY2hlbWUsIHBhdGgpIHtcbiAgICAvLyB0aGUgc2xhc2gtY2hhcmFjdGVyIGlzIG91ciAnZGVmYXVsdCBiYXNlJyBhcyB3ZSBkb24ndFxuICAgIC8vIHN1cHBvcnQgY29uc3RydWN0aW5nIFVSSXMgcmVsYXRpdmUgdG8gb3RoZXIgVVJJcy4gVGhpc1xuICAgIC8vIGFsc28gbWVhbnMgdGhhdCB3ZSBhbHRlciBhbmQgcG90ZW50aWFsbHkgYnJlYWsgcGF0aHMuXG4gICAgLy8gc2VlIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4xLjRcbiAgICBzd2l0Y2ggKHNjaGVtZSkge1xuICAgICAgICBjYXNlICdodHRwcyc6XG4gICAgICAgIGNhc2UgJ2h0dHAnOlxuICAgICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgICAgICAgIHBhdGggPSBfc2xhc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXRoWzBdICE9PSBfc2xhc2gpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gX3NsYXNoICsgcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbnZhciBfZW1wdHkgPSAnJztcbnZhciBfc2xhc2ggPSAnLyc7XG52YXIgX3JlZ2V4cCA9IC9eKChbXjovPyNdKz8pOik/KFxcL1xcLyhbXi8/I10qKSk/KFtePyNdKikoXFw/KFteI10qKSk/KCMoLiopKT8vO1xuLyoqXG4gKiBVbmlmb3JtIFJlc291cmNlIElkZW50aWZpZXIgKFVSSSkgaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4Ni5cbiAqIFRoaXMgY2xhc3MgaXMgYSBzaW1wbGUgcGFyc2VyIHdoaWNoIGNyZWF0ZXMgdGhlIGJhc2ljIGNvbXBvbmVudCBwYXJ0c1xuICogKGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zKSB3aXRoIG1pbmltYWwgdmFsaWRhdGlvblxuICogYW5kIGVuY29kaW5nLlxuICpcbiAqICAgICAgIGZvbzovL2V4YW1wbGUuY29tOjgwNDIvb3Zlci90aGVyZT9uYW1lPWZlcnJldCNub3NlXG4gKiAgICAgICBcXF8vICAgXFxfX19fX19fX19fX19fXy9cXF9fX19fX19fXy8gXFxfX19fX19fX18vIFxcX18vXG4gKiAgICAgICAgfCAgICAgICAgICAgfCAgICAgICAgICAgIHwgICAgICAgICAgICB8ICAgICAgICB8XG4gKiAgICAgc2NoZW1lICAgICBhdXRob3JpdHkgICAgICAgcGF0aCAgICAgICAgcXVlcnkgICBmcmFnbWVudFxuICogICAgICAgIHwgICBfX19fX19fX19fX19fX19fX19fX198X19cbiAqICAgICAgIC8gXFwgLyAgICAgICAgICAgICAgICAgICAgICAgIFxcXG4gKiAgICAgICB1cm46ZXhhbXBsZTphbmltYWw6ZmVycmV0Om5vc2VcbiAqL1xudmFyIFVSSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVUkkoc2NoZW1lT3JEYXRhLCBhdXRob3JpdHksIHBhdGgsIHF1ZXJ5LCBmcmFnbWVudCwgX3N0cmljdCkge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtZU9yRGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1lID0gc2NoZW1lT3JEYXRhLnNjaGVtZSB8fCBfZW1wdHk7XG4gICAgICAgICAgICB0aGlzLmF1dGhvcml0eSA9IHNjaGVtZU9yRGF0YS5hdXRob3JpdHkgfHwgX2VtcHR5O1xuICAgICAgICAgICAgdGhpcy5wYXRoID0gc2NoZW1lT3JEYXRhLnBhdGggfHwgX2VtcHR5O1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHNjaGVtZU9yRGF0YS5xdWVyeSB8fCBfZW1wdHk7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50ID0gc2NoZW1lT3JEYXRhLmZyYWdtZW50IHx8IF9lbXB0eTtcbiAgICAgICAgICAgIC8vIG5vIHZhbGlkYXRpb24gYmVjYXVzZSBpdCdzIHRoaXMgVVJJXG4gICAgICAgICAgICAvLyB0aGF0IGNyZWF0ZXMgdXJpIGNvbXBvbmVudHMuXG4gICAgICAgICAgICAvLyBfdmFsaWRhdGVVcmkodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtZSA9IHNjaGVtZU9yRGF0YSB8fCBfZW1wdHk7XG4gICAgICAgICAgICB0aGlzLmF1dGhvcml0eSA9IGF1dGhvcml0eSB8fCBfZW1wdHk7XG4gICAgICAgICAgICB0aGlzLnBhdGggPSBfcmVmZXJlbmNlUmVzb2x1dGlvbih0aGlzLnNjaGVtZSwgcGF0aCB8fCBfZW1wdHkpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5IHx8IF9lbXB0eTtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSBmcmFnbWVudCB8fCBfZW1wdHk7XG4gICAgICAgICAgICBfdmFsaWRhdGVVcmkodGhpcywgX3N0cmljdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgVVJJLmlzVXJpID0gZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgIGlmICh0aGluZyBpbnN0YW5jZW9mIFVSSSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpbmcuYXV0aG9yaXR5ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHRoaW5nLmZyYWdtZW50ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHRoaW5nLnBhdGggPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcucXVlcnkgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAmJiB0eXBlb2YgdGhpbmcuc2NoZW1lID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHRoaW5nLmZzUGF0aCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHRoaW5nLndpdGggPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICYmIHR5cGVvZiB0aGluZy50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVUkkucHJvdG90eXBlLCBcImZzUGF0aFwiLCB7XG4gICAgICAgIC8vIC0tLS0gZmlsZXN5c3RlbSBwYXRoIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY29ycmVzcG9uZGluZyBmaWxlIHN5c3RlbSBwYXRoIG9mIHRoaXMgVVJJLlxuICAgICAgICAgKiBXaWxsIGhhbmRsZSBVTkMgcGF0aHMsIG5vcm1hbGl6ZXMgd2luZG93cyBkcml2ZSBsZXR0ZXJzIHRvIGxvd2VyLWNhc2UsIGFuZCB1c2VzIHRoZVxuICAgICAgICAgKiBwbGF0Zm9ybSBzcGVjaWZpYyBwYXRoIHNlcGFyYXRvci5cbiAgICAgICAgICpcbiAgICAgICAgICogKiBXaWxsICpub3QqIHZhbGlkYXRlIHRoZSBwYXRoIGZvciBpbnZhbGlkIGNoYXJhY3RlcnMgYW5kIHNlbWFudGljcy5cbiAgICAgICAgICogKiBXaWxsICpub3QqIGxvb2sgYXQgdGhlIHNjaGVtZSBvZiB0aGlzIFVSSS5cbiAgICAgICAgICogKiBUaGUgcmVzdWx0IHNoYWxsICpub3QqIGJlIHVzZWQgZm9yIGRpc3BsYXkgcHVycG9zZXMgYnV0IGZvciBhY2Nlc3NpbmcgYSBmaWxlIG9uIGRpc2suXG4gICAgICAgICAqXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSAqZGlmZmVyZW5jZSogdG8gYFVSSSNwYXRoYCBpcyB0aGUgdXNlIG9mIHRoZSBwbGF0Zm9ybSBzcGVjaWZpYyBzZXBhcmF0b3IgYW5kIHRoZSBoYW5kbGluZ1xuICAgICAgICAgKiBvZiBVTkMgcGF0aHMuIFNlZSB0aGUgYmVsb3cgc2FtcGxlIG9mIGEgZmlsZS11cmkgd2l0aCBhbiBhdXRob3JpdHkgKFVOQyBwYXRoKS5cbiAgICAgICAgICpcbiAgICAgICAgICogYGBgdHNcbiAgICAgICAgICAgIGNvbnN0IHUgPSBVUkkucGFyc2UoJ2ZpbGU6Ly9zZXJ2ZXIvYyQvZm9sZGVyL2ZpbGUudHh0JylcbiAgICAgICAgICAgIHUuYXV0aG9yaXR5ID09PSAnc2VydmVyJ1xuICAgICAgICAgICAgdS5wYXRoID09PSAnL3NoYXJlcy9jJC9maWxlLnR4dCdcbiAgICAgICAgICAgIHUuZnNQYXRoID09PSAnXFxcXHNlcnZlclxcYyRcXGZvbGRlclxcZmlsZS50eHQnXG4gICAgICAgIGBgYFxuICAgICAgICAgKlxuICAgICAgICAgKiBVc2luZyBgVVJJI3BhdGhgIHRvIHJlYWQgYSBmaWxlICh1c2luZyBmcy1hcGlzKSB3b3VsZCBub3QgYmUgZW5vdWdoIGJlY2F1c2UgcGFydHMgb2YgdGhlIHBhdGgsXG4gICAgICAgICAqIG5hbWVseSB0aGUgc2VydmVyIG5hbWUsIHdvdWxkIGJlIG1pc3NpbmcuIFRoZXJlZm9yZSBgVVJJI2ZzUGF0aGAgZXhpc3RzIC0gaXQncyBzdWdhciB0byBlYXNlIHdvcmtpbmdcbiAgICAgICAgICogd2l0aCBVUklzIHRoYXQgcmVwcmVzZW50IGZpbGVzIG9uIGRpc2sgKGBmaWxlYCBzY2hlbWUpLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5zY2hlbWUgIT09ICdmaWxlJykge1xuICAgICAgICAgICAgLy8gXHRjb25zb2xlLndhcm4oYFtVcmlFcnJvcl0gY2FsbGluZyBmc1BhdGggd2l0aCBzY2hlbWUgJHt0aGlzLnNjaGVtZX1gKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHJldHVybiBfbWFrZUZzUGF0aCh0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLy8gLS0tLSBtb2RpZnkgdG8gbmV3IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBVUkkucHJvdG90eXBlLndpdGggPSBmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2NoZW1lID0gY2hhbmdlLnNjaGVtZSwgYXV0aG9yaXR5ID0gY2hhbmdlLmF1dGhvcml0eSwgcGF0aCA9IGNoYW5nZS5wYXRoLCBxdWVyeSA9IGNoYW5nZS5xdWVyeSwgZnJhZ21lbnQgPSBjaGFuZ2UuZnJhZ21lbnQ7XG4gICAgICAgIGlmIChzY2hlbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NoZW1lID0gdGhpcy5zY2hlbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2NoZW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICBzY2hlbWUgPSBfZW1wdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF1dGhvcml0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdXRob3JpdHkgPSB0aGlzLmF1dGhvcml0eTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdXRob3JpdHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGF1dGhvcml0eSA9IF9lbXB0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXRoID0gdGhpcy5wYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhdGggPT09IG51bGwpIHtcbiAgICAgICAgICAgIHBhdGggPSBfZW1wdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1ZXJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5xdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChxdWVyeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcXVlcnkgPSBfZW1wdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYWdtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZyYWdtZW50ID0gdGhpcy5mcmFnbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcmFnbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSBfZW1wdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtZSA9PT0gdGhpcy5zY2hlbWVcbiAgICAgICAgICAgICYmIGF1dGhvcml0eSA9PT0gdGhpcy5hdXRob3JpdHlcbiAgICAgICAgICAgICYmIHBhdGggPT09IHRoaXMucGF0aFxuICAgICAgICAgICAgJiYgcXVlcnkgPT09IHRoaXMucXVlcnlcbiAgICAgICAgICAgICYmIGZyYWdtZW50ID09PSB0aGlzLmZyYWdtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IF9VUkkoc2NoZW1lLCBhdXRob3JpdHksIHBhdGgsIHF1ZXJ5LCBmcmFnbWVudCk7XG4gICAgfTtcbiAgICAvLyAtLS0tIHBhcnNlICYgdmFsaWRhdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBVUkkgZnJvbSBhIHN0cmluZywgZS5nLiBgaHR0cDovL3d3dy5tc2Z0LmNvbS9zb21lL3BhdGhgLFxuICAgICAqIGBmaWxlOi8vL3Vzci9ob21lYCwgb3IgYHNjaGVtZTp3aXRoL3BhdGhgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIEEgc3RyaW5nIHdoaWNoIHJlcHJlc2VudHMgYW4gVVJJIChzZWUgYFVSSSN0b1N0cmluZ2ApLlxuICAgICAqL1xuICAgIFVSSS5wYXJzZSA9IGZ1bmN0aW9uICh2YWx1ZSwgX3N0cmljdCkge1xuICAgICAgICBpZiAoX3N0cmljdCA9PT0gdm9pZCAwKSB7IF9zdHJpY3QgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgbWF0Y2ggPSBfcmVnZXhwLmV4ZWModmFsdWUpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IF9VUkkoX2VtcHR5LCBfZW1wdHksIF9lbXB0eSwgX2VtcHR5LCBfZW1wdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgX1VSSShtYXRjaFsyXSB8fCBfZW1wdHksIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFs0XSB8fCBfZW1wdHkpLCBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbNV0gfHwgX2VtcHR5KSwgZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzddIHx8IF9lbXB0eSksIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFs5XSB8fCBfZW1wdHkpLCBfc3RyaWN0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgVVJJIGZyb20gYSBmaWxlIHN5c3RlbSBwYXRoLCBlLmcuIGBjOlxcbXlcXGZpbGVzYCxcbiAgICAgKiBgL3Vzci9ob21lYCwgb3IgYFxcXFxzZXJ2ZXJcXHNoYXJlXFxzb21lXFxwYXRoYC5cbiAgICAgKlxuICAgICAqIFRoZSAqZGlmZmVyZW5jZSogYmV0d2VlbiBgVVJJI3BhcnNlYCBhbmQgYFVSSSNmaWxlYCBpcyB0aGF0IHRoZSBsYXR0ZXIgdHJlYXRzIHRoZSBhcmd1bWVudFxuICAgICAqIGFzIHBhdGgsIG5vdCBhcyBzdHJpbmdpZmllZC11cmkuIEUuZy4gYFVSSS5maWxlKHBhdGgpYCBpcyAqKm5vdCB0aGUgc2FtZSBhcyoqXG4gICAgICogYFVSSS5wYXJzZSgnZmlsZTovLycgKyBwYXRoKWAgYmVjYXVzZSB0aGUgcGF0aCBtaWdodCBjb250YWluIGNoYXJhY3RlcnMgdGhhdCBhcmVcbiAgICAgKiBpbnRlcnByZXRlZCAoIyBhbmQgPykuIFNlZSB0aGUgZm9sbG93aW5nIHNhbXBsZTpcbiAgICAgKiBgYGB0c1xuICAgIGNvbnN0IGdvb2QgPSBVUkkuZmlsZSgnL2NvZGluZy9jIy9wcm9qZWN0MScpO1xuICAgIGdvb2Quc2NoZW1lID09PSAnZmlsZSc7XG4gICAgZ29vZC5wYXRoID09PSAnL2NvZGluZy9jIy9wcm9qZWN0MSc7XG4gICAgZ29vZC5mcmFnbWVudCA9PT0gJyc7XG4gICAgY29uc3QgYmFkID0gVVJJLnBhcnNlKCdmaWxlOi8vJyArICcvY29kaW5nL2MjL3Byb2plY3QxJyk7XG4gICAgYmFkLnNjaGVtZSA9PT0gJ2ZpbGUnO1xuICAgIGJhZC5wYXRoID09PSAnL2NvZGluZy9jJzsgLy8gcGF0aCBpcyBub3cgYnJva2VuXG4gICAgYmFkLmZyYWdtZW50ID09PSAnL3Byb2plY3QxJztcbiAgICBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIEEgZmlsZSBzeXN0ZW0gcGF0aCAoc2VlIGBVUkkjZnNQYXRoYClcbiAgICAgKi9cbiAgICBVUkkuZmlsZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBhdXRob3JpdHkgPSBfZW1wdHk7XG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0byBmd2Qtc2xhc2hlcyBvbiB3aW5kb3dzLFxuICAgICAgICAvLyBvbiBvdGhlciBzeXN0ZW1zIGJ3ZC1zbGFzaGVzIGFyZSB2YWxpZFxuICAgICAgICAvLyBmaWxlbmFtZSBjaGFyYWN0ZXIsIGVnIC9mXFxvby9iYVxcci50eHRcbiAgICAgICAgaWYgKGlzV2luZG93cykge1xuICAgICAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFxcXC9nLCBfc2xhc2gpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGZvciBhdXRob3JpdHkgYXMgdXNlZCBpbiBVTkMgc2hhcmVzXG4gICAgICAgIC8vIG9yIHVzZSB0aGUgcGF0aCBhcyBnaXZlblxuICAgICAgICBpZiAocGF0aFswXSA9PT0gX3NsYXNoICYmIHBhdGhbMV0gPT09IF9zbGFzaCkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IHBhdGguaW5kZXhPZihfc2xhc2gsIDIpO1xuICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBhdXRob3JpdHkgPSBwYXRoLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgICAgICBwYXRoID0gX3NsYXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXR5ID0gcGF0aC5zdWJzdHJpbmcoMiwgaWR4KTtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoaWR4KSB8fCBfc2xhc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfVVJJKCdmaWxlJywgYXV0aG9yaXR5LCBwYXRoLCBfZW1wdHksIF9lbXB0eSk7XG4gICAgfTtcbiAgICBVUkkuZnJvbSA9IGZ1bmN0aW9uIChjb21wb25lbnRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgX1VSSShjb21wb25lbnRzLnNjaGVtZSwgY29tcG9uZW50cy5hdXRob3JpdHksIGNvbXBvbmVudHMucGF0aCwgY29tcG9uZW50cy5xdWVyeSwgY29tcG9uZW50cy5mcmFnbWVudCk7XG4gICAgfTtcbiAgICAvLyAtLS0tIHByaW50aW5nL2V4dGVybmFsaXplIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgVVJJLiBJdCdzIGd1YXJhbnRlZWQgdGhhdCBjYWxsaW5nXG4gICAgICogYFVSSS5wYXJzZWAgd2l0aCB0aGUgcmVzdWx0IG9mIHRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhbiBVUkkgd2hpY2ggaXMgZXF1YWxcbiAgICAgKiB0byB0aGlzIFVSSS5cbiAgICAgKlxuICAgICAqICogVGhlIHJlc3VsdCBzaGFsbCAqbm90KiBiZSB1c2VkIGZvciBkaXNwbGF5IHB1cnBvc2VzIGJ1dCBmb3IgZXh0ZXJuYWxpemF0aW9uIG9yIHRyYW5zcG9ydC5cbiAgICAgKiAqIFRoZSByZXN1bHQgd2lsbCBiZSBlbmNvZGVkIHVzaW5nIHRoZSBwZXJjZW50YWdlIGVuY29kaW5nIGFuZCBlbmNvZGluZyBoYXBwZW5zIG1vc3RseVxuICAgICAqIGlnbm9yZSB0aGUgc2NoZW1lLXNwZWNpZmljIGVuY29kaW5nIHJ1bGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNraXBFbmNvZGluZyBEbyBub3QgZW5jb2RlIHRoZSByZXN1bHQsIGRlZmF1bHQgaXMgYGZhbHNlYFxuICAgICAqL1xuICAgIFVSSS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoc2tpcEVuY29kaW5nKSB7XG4gICAgICAgIGlmIChza2lwRW5jb2RpbmcgPT09IHZvaWQgMCkgeyBza2lwRW5jb2RpbmcgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gX2FzRm9ybWF0dGVkKHRoaXMsIHNraXBFbmNvZGluZyk7XG4gICAgfTtcbiAgICBVUkkucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBVUkkucmV2aXZlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgVVJJKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgX1VSSShkYXRhKTtcbiAgICAgICAgICAgIHJlc3VsdC5fZnNQYXRoID0gZGF0YS5mc1BhdGg7XG4gICAgICAgICAgICByZXN1bHQuX2Zvcm1hdHRlZCA9IGRhdGEuZXh0ZXJuYWw7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVVJJO1xufSgpKTtcbmV4cG9ydCB7IFVSSSB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNsYXNzLW5hbWVcbnZhciBfVVJJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhfVVJJLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIF9VUkkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fZm9ybWF0dGVkID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2ZzUGF0aCA9IG51bGw7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9VUkkucHJvdG90eXBlLCBcImZzUGF0aFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9mc1BhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mc1BhdGggPSBfbWFrZUZzUGF0aCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mc1BhdGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF9VUkkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKHNraXBFbmNvZGluZykge1xuICAgICAgICBpZiAoc2tpcEVuY29kaW5nID09PSB2b2lkIDApIHsgc2tpcEVuY29kaW5nID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKCFza2lwRW5jb2RpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZm9ybWF0dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0dGVkID0gX2FzRm9ybWF0dGVkKHRoaXMsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXR0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBjYWNoZSB0aGF0XG4gICAgICAgICAgICByZXR1cm4gX2FzRm9ybWF0dGVkKHRoaXMsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBfVVJJLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICAkbWlkOiAxXG4gICAgICAgIH07XG4gICAgICAgIC8vIGNhY2hlZCBzdGF0ZVxuICAgICAgICBpZiAodGhpcy5fZnNQYXRoKSB7XG4gICAgICAgICAgICByZXMuZnNQYXRoID0gdGhpcy5fZnNQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9mb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgIHJlcy5leHRlcm5hbCA9IHRoaXMuX2Zvcm1hdHRlZDtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cmkgY29tcG9uZW50c1xuICAgICAgICBpZiAodGhpcy5wYXRoKSB7XG4gICAgICAgICAgICByZXMucGF0aCA9IHRoaXMucGF0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY2hlbWUpIHtcbiAgICAgICAgICAgIHJlcy5zY2hlbWUgPSB0aGlzLnNjaGVtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIHJlcy5hdXRob3JpdHkgPSB0aGlzLmF1dGhvcml0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgcmVzLnF1ZXJ5ID0gdGhpcy5xdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgcmVzLmZyYWdtZW50ID0gdGhpcy5mcmFnbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgcmV0dXJuIF9VUkk7XG59KFVSSSkpO1xuLy8gcmVzZXJ2ZWQgY2hhcmFjdGVyczogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0yLjJcbnZhciBlbmNvZGVUYWJsZSA9IChfYSA9IHt9LFxuICAgIF9hWzU4IC8qIENvbG9uICovXSA9ICclM0EnLFxuICAgIF9hWzQ3IC8qIFNsYXNoICovXSA9ICclMkYnLFxuICAgIF9hWzYzIC8qIFF1ZXN0aW9uTWFyayAqL10gPSAnJTNGJyxcbiAgICBfYVszNSAvKiBIYXNoICovXSA9ICclMjMnLFxuICAgIF9hWzkxIC8qIE9wZW5TcXVhcmVCcmFja2V0ICovXSA9ICclNUInLFxuICAgIF9hWzkzIC8qIENsb3NlU3F1YXJlQnJhY2tldCAqL10gPSAnJTVEJyxcbiAgICBfYVs2NCAvKiBBdFNpZ24gKi9dID0gJyU0MCcsXG4gICAgX2FbMzMgLyogRXhjbGFtYXRpb25NYXJrICovXSA9ICclMjEnLFxuICAgIF9hWzM2IC8qIERvbGxhclNpZ24gKi9dID0gJyUyNCcsXG4gICAgX2FbMzggLyogQW1wZXJzYW5kICovXSA9ICclMjYnLFxuICAgIF9hWzM5IC8qIFNpbmdsZVF1b3RlICovXSA9ICclMjcnLFxuICAgIF9hWzQwIC8qIE9wZW5QYXJlbiAqL10gPSAnJTI4JyxcbiAgICBfYVs0MSAvKiBDbG9zZVBhcmVuICovXSA9ICclMjknLFxuICAgIF9hWzQyIC8qIEFzdGVyaXNrICovXSA9ICclMkEnLFxuICAgIF9hWzQzIC8qIFBsdXMgKi9dID0gJyUyQicsXG4gICAgX2FbNDQgLyogQ29tbWEgKi9dID0gJyUyQycsXG4gICAgX2FbNTkgLyogU2VtaWNvbG9uICovXSA9ICclM0InLFxuICAgIF9hWzYxIC8qIEVxdWFscyAqL10gPSAnJTNEJyxcbiAgICBfYVszMiAvKiBTcGFjZSAqL10gPSAnJTIwJyxcbiAgICBfYSk7XG5mdW5jdGlvbiBlbmNvZGVVUklDb21wb25lbnRGYXN0KHVyaUNvbXBvbmVudCwgYWxsb3dTbGFzaCkge1xuICAgIHZhciByZXMgPSB1bmRlZmluZWQ7XG4gICAgdmFyIG5hdGl2ZUVuY29kZVBvcyA9IC0xO1xuICAgIGZvciAodmFyIHBvcyA9IDA7IHBvcyA8IHVyaUNvbXBvbmVudC5sZW5ndGg7IHBvcysrKSB7XG4gICAgICAgIHZhciBjb2RlID0gdXJpQ29tcG9uZW50LmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgLy8gdW5yZXNlcnZlZCBjaGFyYWN0ZXJzOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTIuM1xuICAgICAgICBpZiAoKGNvZGUgPj0gOTcgLyogYSAqLyAmJiBjb2RlIDw9IDEyMiAvKiB6ICovKVxuICAgICAgICAgICAgfHwgKGNvZGUgPj0gNjUgLyogQSAqLyAmJiBjb2RlIDw9IDkwIC8qIFogKi8pXG4gICAgICAgICAgICB8fCAoY29kZSA+PSA0OCAvKiBEaWdpdDAgKi8gJiYgY29kZSA8PSA1NyAvKiBEaWdpdDkgKi8pXG4gICAgICAgICAgICB8fCBjb2RlID09PSA0NSAvKiBEYXNoICovXG4gICAgICAgICAgICB8fCBjb2RlID09PSA0NiAvKiBQZXJpb2QgKi9cbiAgICAgICAgICAgIHx8IGNvZGUgPT09IDk1IC8qIFVuZGVybGluZSAqL1xuICAgICAgICAgICAgfHwgY29kZSA9PT0gMTI2IC8qIFRpbGRlICovXG4gICAgICAgICAgICB8fCAoYWxsb3dTbGFzaCAmJiBjb2RlID09PSA0NyAvKiBTbGFzaCAqLykpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBkZWxheWluZyBuYXRpdmUgZW5jb2RlXG4gICAgICAgICAgICBpZiAobmF0aXZlRW5jb2RlUG9zICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlcyArPSBlbmNvZGVVUklDb21wb25lbnQodXJpQ29tcG9uZW50LnN1YnN0cmluZyhuYXRpdmVFbmNvZGVQb3MsIHBvcykpO1xuICAgICAgICAgICAgICAgIG5hdGl2ZUVuY29kZVBvcyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2Ugd3JpdGUgaW50byBhIG5ldyBzdHJpbmcgKGJ5IGRlZmF1bHQgd2UgdHJ5IHRvIHJldHVybiB0aGUgcGFyYW0pXG4gICAgICAgICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXMgKz0gdXJpQ29tcG9uZW50LmNoYXJBdChwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RpbmcgbmVlZGVkLCB3ZSBuZWVkIHRvIGFsbG9jYXRlIGEgbmV3IHN0cmluZ1xuICAgICAgICAgICAgaWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gdXJpQ29tcG9uZW50LnN1YnN0cigwLCBwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgd2l0aCBkZWZhdWx0IHRhYmxlIGZpcnN0XG4gICAgICAgICAgICB2YXIgZXNjYXBlZCA9IGVuY29kZVRhYmxlW2NvZGVdO1xuICAgICAgICAgICAgaWYgKGVzY2FwZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBkZWxheWluZyBuYXRpdmUgZW5jb2RlXG4gICAgICAgICAgICAgICAgaWYgKG5hdGl2ZUVuY29kZVBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IGVuY29kZVVSSUNvbXBvbmVudCh1cmlDb21wb25lbnQuc3Vic3RyaW5nKG5hdGl2ZUVuY29kZVBvcywgcG9zKSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUVuY29kZVBvcyA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZXNjYXBlZCB2YXJpYW50IHRvIHJlc3VsdFxuICAgICAgICAgICAgICAgIHJlcyArPSBlc2NhcGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmF0aXZlRW5jb2RlUG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIHVzZSBuYXRpdmUgZW5jb2RlIG9ubHkgd2hlbiBuZWVkZWRcbiAgICAgICAgICAgICAgICBuYXRpdmVFbmNvZGVQb3MgPSBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5hdGl2ZUVuY29kZVBvcyAhPT0gLTEpIHtcbiAgICAgICAgcmVzICs9IGVuY29kZVVSSUNvbXBvbmVudCh1cmlDb21wb25lbnQuc3Vic3RyaW5nKG5hdGl2ZUVuY29kZVBvcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzICE9PSB1bmRlZmluZWQgPyByZXMgOiB1cmlDb21wb25lbnQ7XG59XG5mdW5jdGlvbiBlbmNvZGVVUklDb21wb25lbnRNaW5pbWFsKHBhdGgpIHtcbiAgICB2YXIgcmVzID0gdW5kZWZpbmVkO1xuICAgIGZvciAodmFyIHBvcyA9IDA7IHBvcyA8IHBhdGgubGVuZ3RoOyBwb3MrKykge1xuICAgICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChwb3MpO1xuICAgICAgICBpZiAoY29kZSA9PT0gMzUgLyogSGFzaCAqLyB8fCBjb2RlID09PSA2MyAvKiBRdWVzdGlvbk1hcmsgKi8pIHtcbiAgICAgICAgICAgIGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHBhdGguc3Vic3RyKDAsIHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXMgKz0gZW5jb2RlVGFibGVbY29kZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXMgKz0gcGF0aFtwb3NdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXMgIT09IHVuZGVmaW5lZCA/IHJlcyA6IHBhdGg7XG59XG4vKipcbiAqIENvbXB1dGUgYGZzUGF0aGAgZm9yIHRoZSBnaXZlbiB1cmlcbiAqL1xuZnVuY3Rpb24gX21ha2VGc1BhdGgodXJpKSB7XG4gICAgdmFyIHZhbHVlO1xuICAgIGlmICh1cmkuYXV0aG9yaXR5ICYmIHVyaS5wYXRoLmxlbmd0aCA+IDEgJiYgdXJpLnNjaGVtZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIC8vIHVuYyBwYXRoOiBmaWxlOi8vc2hhcmVzL2MkL2Zhci9ib29cbiAgICAgICAgdmFsdWUgPSBcIi8vXCIgKyB1cmkuYXV0aG9yaXR5ICsgdXJpLnBhdGg7XG4gICAgfVxuICAgIGVsc2UgaWYgKHVyaS5wYXRoLmNoYXJDb2RlQXQoMCkgPT09IDQ3IC8qIFNsYXNoICovXG4gICAgICAgICYmICh1cmkucGF0aC5jaGFyQ29kZUF0KDEpID49IDY1IC8qIEEgKi8gJiYgdXJpLnBhdGguY2hhckNvZGVBdCgxKSA8PSA5MCAvKiBaICovIHx8IHVyaS5wYXRoLmNoYXJDb2RlQXQoMSkgPj0gOTcgLyogYSAqLyAmJiB1cmkucGF0aC5jaGFyQ29kZUF0KDEpIDw9IDEyMiAvKiB6ICovKVxuICAgICAgICAmJiB1cmkucGF0aC5jaGFyQ29kZUF0KDIpID09PSA1OCAvKiBDb2xvbiAqLykge1xuICAgICAgICAvLyB3aW5kb3dzIGRyaXZlIGxldHRlcjogZmlsZTovLy9jOi9mYXIvYm9vXG4gICAgICAgIHZhbHVlID0gdXJpLnBhdGhbMV0udG9Mb3dlckNhc2UoKSArIHVyaS5wYXRoLnN1YnN0cigyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIG90aGVyIHBhdGhcbiAgICAgICAgdmFsdWUgPSB1cmkucGF0aDtcbiAgICB9XG4gICAgaWYgKGlzV2luZG93cykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcLy9nLCAnXFxcXCcpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4vKipcbiAqIENyZWF0ZSB0aGUgZXh0ZXJuYWwgdmVyc2lvbiBvZiBhIHVyaVxuICovXG5mdW5jdGlvbiBfYXNGb3JtYXR0ZWQodXJpLCBza2lwRW5jb2RpbmcpIHtcbiAgICB2YXIgZW5jb2RlciA9ICFza2lwRW5jb2RpbmdcbiAgICAgICAgPyBlbmNvZGVVUklDb21wb25lbnRGYXN0XG4gICAgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50TWluaW1hbDtcbiAgICB2YXIgcmVzID0gJyc7XG4gICAgdmFyIHNjaGVtZSA9IHVyaS5zY2hlbWUsIGF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHksIHBhdGggPSB1cmkucGF0aCwgcXVlcnkgPSB1cmkucXVlcnksIGZyYWdtZW50ID0gdXJpLmZyYWdtZW50O1xuICAgIGlmIChzY2hlbWUpIHtcbiAgICAgICAgcmVzICs9IHNjaGVtZTtcbiAgICAgICAgcmVzICs9ICc6JztcbiAgICB9XG4gICAgaWYgKGF1dGhvcml0eSB8fCBzY2hlbWUgPT09ICdmaWxlJykge1xuICAgICAgICByZXMgKz0gX3NsYXNoO1xuICAgICAgICByZXMgKz0gX3NsYXNoO1xuICAgIH1cbiAgICBpZiAoYXV0aG9yaXR5KSB7XG4gICAgICAgIHZhciBpZHggPSBhdXRob3JpdHkuaW5kZXhPZignQCcpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gPHVzZXI+QDxhdXRoPlxuICAgICAgICAgICAgdmFyIHVzZXJpbmZvID0gYXV0aG9yaXR5LnN1YnN0cigwLCBpZHgpO1xuICAgICAgICAgICAgYXV0aG9yaXR5ID0gYXV0aG9yaXR5LnN1YnN0cihpZHggKyAxKTtcbiAgICAgICAgICAgIGlkeCA9IHVzZXJpbmZvLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVzICs9IGVuY29kZXIodXNlcmluZm8sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIDx1c2VyPjo8cGFzcz5APGF1dGg+XG4gICAgICAgICAgICAgICAgcmVzICs9IGVuY29kZXIodXNlcmluZm8uc3Vic3RyKDAsIGlkeCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXMgKz0gJzonO1xuICAgICAgICAgICAgICAgIHJlcyArPSBlbmNvZGVyKHVzZXJpbmZvLnN1YnN0cihpZHggKyAxKSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzICs9ICdAJztcbiAgICAgICAgfVxuICAgICAgICBhdXRob3JpdHkgPSBhdXRob3JpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWR4ID0gYXV0aG9yaXR5LmluZGV4T2YoJzonKTtcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJlcyArPSBlbmNvZGVyKGF1dGhvcml0eSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gPGF1dGg+Ojxwb3J0PlxuICAgICAgICAgICAgcmVzICs9IGVuY29kZXIoYXV0aG9yaXR5LnN1YnN0cigwLCBpZHgpLCBmYWxzZSk7XG4gICAgICAgICAgICByZXMgKz0gYXV0aG9yaXR5LnN1YnN0cihpZHgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwYXRoKSB7XG4gICAgICAgIC8vIGxvd2VyLWNhc2Ugd2luZG93cyBkcml2ZSBsZXR0ZXJzIGluIC9DOi9mZmYgb3IgQzovZmZmXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+PSAzICYmIHBhdGguY2hhckNvZGVBdCgwKSA9PT0gNDcgLyogU2xhc2ggKi8gJiYgcGF0aC5jaGFyQ29kZUF0KDIpID09PSA1OCAvKiBDb2xvbiAqLykge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoMSk7XG4gICAgICAgICAgICBpZiAoY29kZSA+PSA2NSAvKiBBICovICYmIGNvZGUgPD0gOTAgLyogWiAqLykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBcIi9cIiArIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIDMyKSArIFwiOlwiICsgcGF0aC5zdWJzdHIoMyk7IC8vIFwiL2M6XCIubGVuZ3RoID09PSAzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGF0aC5sZW5ndGggPj0gMiAmJiBwYXRoLmNoYXJDb2RlQXQoMSkgPT09IDU4IC8qIENvbG9uICovKSB7XG4gICAgICAgICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIGlmIChjb2RlID49IDY1IC8qIEEgKi8gJiYgY29kZSA8PSA5MCAvKiBaICovKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIDMyKSArIFwiOlwiICsgcGF0aC5zdWJzdHIoMik7IC8vIFwiL2M6XCIubGVuZ3RoID09PSAzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5jb2RlIHRoZSByZXN0IG9mIHRoZSBwYXRoXG4gICAgICAgIHJlcyArPSBlbmNvZGVyKHBhdGgsIHRydWUpO1xuICAgIH1cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgcmVzICs9ICc/JztcbiAgICAgICAgcmVzICs9IGVuY29kZXIocXVlcnksIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGZyYWdtZW50KSB7XG4gICAgICAgIHJlcyArPSAnIyc7XG4gICAgICAgIHJlcyArPSAhc2tpcEVuY29kaW5nID8gZW5jb2RlVVJJQ29tcG9uZW50RmFzdChmcmFnbWVudCwgZmFsc2UpIDogZnJhZ21lbnQ7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgdHJhbnNmb3JtRXJyb3JGb3JTZXJpYWxpemF0aW9uIH0gZnJvbSAnLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IERpc3Bvc2FibGUgfSBmcm9tICcuLi9saWZlY3ljbGUuanMnO1xuaW1wb3J0IHsgaXNXZWIgfSBmcm9tICcuLi9wbGF0Zm9ybS5qcyc7XG5pbXBvcnQgeyBnZXRBbGxQcm9wZXJ0eU5hbWVzIH0gZnJvbSAnLi4vdHlwZXMuanMnO1xudmFyIElOSVRJQUxJWkUgPSAnJGluaXRpYWxpemUnO1xudmFyIHdlYldvcmtlcldhcm5pbmdMb2dnZWQgPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBsb2dPbmNlV2ViV29ya2VyV2FybmluZyhlcnIpIHtcbiAgICBpZiAoIWlzV2ViKSB7XG4gICAgICAgIC8vIHJ1bm5pbmcgdGVzdHNcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXdlYldvcmtlcldhcm5pbmdMb2dnZWQpIHtcbiAgICAgICAgd2ViV29ya2VyV2FybmluZ0xvZ2dlZCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGNyZWF0ZSB3ZWIgd29ya2VyKHMpLiBGYWxsaW5nIGJhY2sgdG8gbG9hZGluZyB3ZWIgd29ya2VyIGNvZGUgaW4gbWFpbiB0aHJlYWQsIHdoaWNoIG1pZ2h0IGNhdXNlIFVJIGZyZWV6ZXMuIFBsZWFzZSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9tb25hY28tZWRpdG9yI2ZhcScpO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4oZXJyLm1lc3NhZ2UpO1xufVxudmFyIFNpbXBsZVdvcmtlclByb3RvY29sID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbXBsZVdvcmtlclByb3RvY29sKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fd29ya2VySWQgPSAtMTtcbiAgICAgICAgdGhpcy5faGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIHRoaXMuX2xhc3RTZW50UmVxID0gMDtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1JlcGxpZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBTaW1wbGVXb3JrZXJQcm90b2NvbC5wcm90b3R5cGUuc2V0V29ya2VySWQgPSBmdW5jdGlvbiAod29ya2VySWQpIHtcbiAgICAgICAgdGhpcy5fd29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICB9O1xuICAgIFNpbXBsZVdvcmtlclByb3RvY29sLnByb3RvdHlwZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlcSA9IFN0cmluZygrK3RoaXMuX2xhc3RTZW50UmVxKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLl9wZW5kaW5nUmVwbGllc1tyZXFdID0ge1xuICAgICAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0OiByZWplY3RcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy5fc2VuZCh7XG4gICAgICAgICAgICAgICAgdnNXb3JrZXI6IF90aGlzLl93b3JrZXJJZCxcbiAgICAgICAgICAgICAgICByZXE6IHJlcSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW1wbGVXb3JrZXJQcm90b2NvbC5wcm90b3R5cGUuaGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uIChzZXJpYWxpemVkTWVzc2FnZSkge1xuICAgICAgICB2YXIgbWVzc2FnZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKHNlcmlhbGl6ZWRNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gbm90aGluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZSB8fCAhbWVzc2FnZS52c1dvcmtlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl93b3JrZXJJZCAhPT0gLTEgJiYgbWVzc2FnZS52c1dvcmtlciAhPT0gdGhpcy5fd29ya2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgU2ltcGxlV29ya2VyUHJvdG9jb2wucHJvdG90eXBlLl9oYW5kbGVNZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAobXNnLnNlcSkge1xuICAgICAgICAgICAgdmFyIHJlcGx5TWVzc2FnZSA9IG1zZztcbiAgICAgICAgICAgIGlmICghdGhpcy5fcGVuZGluZ1JlcGxpZXNbcmVwbHlNZXNzYWdlLnNlcV0pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0dvdCByZXBseSB0byB1bmtub3duIHNlcScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXBseSA9IHRoaXMuX3BlbmRpbmdSZXBsaWVzW3JlcGx5TWVzc2FnZS5zZXFdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3BlbmRpbmdSZXBsaWVzW3JlcGx5TWVzc2FnZS5zZXFdO1xuICAgICAgICAgICAgaWYgKHJlcGx5TWVzc2FnZS5lcnIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyID0gcmVwbHlNZXNzYWdlLmVycjtcbiAgICAgICAgICAgICAgICBpZiAocmVwbHlNZXNzYWdlLmVyci4kaXNFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZXJyLm5hbWUgPSByZXBseU1lc3NhZ2UuZXJyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gcmVwbHlNZXNzYWdlLmVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3RhY2sgPSByZXBseU1lc3NhZ2UuZXJyLnN0YWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXBseS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBseS5yZXNvbHZlKHJlcGx5TWVzc2FnZS5yZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXF1ZXN0TWVzc2FnZSA9IG1zZztcbiAgICAgICAgdmFyIHJlcSA9IHJlcXVlc3RNZXNzYWdlLnJlcTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2hhbmRsZXIuaGFuZGxlTWVzc2FnZShyZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHJlcXVlc3RNZXNzYWdlLmFyZ3MpO1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgX3RoaXMuX3NlbmQoe1xuICAgICAgICAgICAgICAgIHZzV29ya2VyOiBfdGhpcy5fd29ya2VySWQsXG4gICAgICAgICAgICAgICAgc2VxOiByZXEsXG4gICAgICAgICAgICAgICAgcmVzOiByLFxuICAgICAgICAgICAgICAgIGVycjogdW5kZWZpbmVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmRldGFpbCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gTG9hZGluZyBlcnJvcnMgaGF2ZSBhIGRldGFpbCBwcm9wZXJ0eSB0aGF0IHBvaW50cyB0byB0aGUgYWN0dWFsIGVycm9yXG4gICAgICAgICAgICAgICAgZS5kZXRhaWwgPSB0cmFuc2Zvcm1FcnJvckZvclNlcmlhbGl6YXRpb24oZS5kZXRhaWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuX3NlbmQoe1xuICAgICAgICAgICAgICAgIHZzV29ya2VyOiBfdGhpcy5fd29ya2VySWQsXG4gICAgICAgICAgICAgICAgc2VxOiByZXEsXG4gICAgICAgICAgICAgICAgcmVzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgZXJyOiB0cmFuc2Zvcm1FcnJvckZvclNlcmlhbGl6YXRpb24oZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZVdvcmtlclByb3RvY29sLnByb3RvdHlwZS5fc2VuZCA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgdmFyIHN0ck1zZyA9IEpTT04uc3RyaW5naWZ5KG1zZyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTRU5ESU5HOiAnICsgc3RyTXNnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlci5zZW5kTWVzc2FnZShzdHJNc2cpO1xuICAgIH07XG4gICAgcmV0dXJuIFNpbXBsZVdvcmtlclByb3RvY29sO1xufSgpKTtcbi8qKlxuICogTWFpbiB0aHJlYWQgc2lkZVxuICovXG52YXIgU2ltcGxlV29ya2VyQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaW1wbGVXb3JrZXJDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2ltcGxlV29ya2VyQ2xpZW50KHdvcmtlckZhY3RvcnksIG1vZHVsZUlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIHZhciBsYXp5UHJveHlSZWplY3QgPSBudWxsO1xuICAgICAgICBfdGhpcy5fd29ya2VyID0gX3RoaXMuX3JlZ2lzdGVyKHdvcmtlckZhY3RvcnkuY3JlYXRlKCd2cy9iYXNlL2NvbW1vbi93b3JrZXIvc2ltcGxlV29ya2VyJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgX3RoaXMuX3Byb3RvY29sLmhhbmRsZU1lc3NhZ2UobXNnKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgLy8gaW4gRmlyZWZveCwgd2ViIHdvcmtlcnMgZmFpbCBsYXppbHkgOihcbiAgICAgICAgICAgIC8vIHdlIHdpbGwgcmVqZWN0IHRoZSBwcm94eVxuICAgICAgICAgICAgaWYgKGxhenlQcm94eVJlamVjdCkge1xuICAgICAgICAgICAgICAgIGxhenlQcm94eVJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIF90aGlzLl9wcm90b2NvbCA9IG5ldyBTaW1wbGVXb3JrZXJQcm90b2NvbCh7XG4gICAgICAgICAgICBzZW5kTWVzc2FnZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIF90aGlzLl93b3JrZXIucG9zdE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlOiBmdW5jdGlvbiAobWV0aG9kLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgLy8gSW50ZW50aW9uYWxseSBub3Qgc3VwcG9ydGluZyB3b3JrZXIgLT4gbWFpbiByZXF1ZXN0c1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfdGhpcy5fcHJvdG9jb2wuc2V0V29ya2VySWQoX3RoaXMuX3dvcmtlci5nZXRJZCgpKTtcbiAgICAgICAgLy8gR2F0aGVyIGxvYWRlciBjb25maWd1cmF0aW9uXG4gICAgICAgIHZhciBsb2FkZXJDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLnJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzZWxmLnJlcXVpcmUuZ2V0Q29uZmlnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgTW9uYWNvIEFNRCBMb2FkZXJcbiAgICAgICAgICAgIGxvYWRlckNvbmZpZ3VyYXRpb24gPSBzZWxmLnJlcXVpcmUuZ2V0Q29uZmlnKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbGYucmVxdWlyZWpzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBjb25maWd1cmF0aW9uIGZyb20gcmVxdWlyZWpzXG4gICAgICAgICAgICBsb2FkZXJDb25maWd1cmF0aW9uID0gc2VsZi5yZXF1aXJlanMucy5jb250ZXh0cy5fLmNvbmZpZztcbiAgICAgICAgfVxuICAgICAgICAvLyBTZW5kIGluaXRpYWxpemUgbWVzc2FnZVxuICAgICAgICBfdGhpcy5fb25Nb2R1bGVMb2FkZWQgPSBfdGhpcy5fcHJvdG9jb2wuc2VuZE1lc3NhZ2UoSU5JVElBTElaRSwgW1xuICAgICAgICAgICAgX3RoaXMuX3dvcmtlci5nZXRJZCgpLFxuICAgICAgICAgICAgbW9kdWxlSWQsXG4gICAgICAgICAgICBsb2FkZXJDb25maWd1cmF0aW9uXG4gICAgICAgIF0pO1xuICAgICAgICBfdGhpcy5fbGF6eVByb3h5ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGF6eVByb3h5UmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgX3RoaXMuX29uTW9kdWxlTG9hZGVkLnRoZW4oZnVuY3Rpb24gKGF2YWlsYWJsZU1ldGhvZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJveHkgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGF2YWlsYWJsZU1ldGhvZHNfMSA9IGF2YWlsYWJsZU1ldGhvZHM7IF9pIDwgYXZhaWxhYmxlTWV0aG9kc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IGF2YWlsYWJsZU1ldGhvZHNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHByb3h5W21ldGhvZE5hbWVdID0gY3JlYXRlUHJveHlNZXRob2QobWV0aG9kTmFtZSwgcHJveHlNZXRob2RSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm94eSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fb25FcnJvcignV29ya2VyIGZhaWxlZCB0byBsb2FkICcgKyBtb2R1bGVJZCwgZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIENyZWF0ZSBwcm94eSB0byBsb2FkZWQgY29kZVxuICAgICAgICB2YXIgcHJveHlNZXRob2RSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9yZXF1ZXN0KG1ldGhvZCwgYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjcmVhdGVQcm94eU1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2QsIHByb3h5TWV0aG9kUmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3h5TWV0aG9kUmVxdWVzdChtZXRob2QsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTaW1wbGVXb3JrZXJDbGllbnQucHJvdG90eXBlLmdldFByb3h5T2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF6eVByb3h5O1xuICAgIH07XG4gICAgU2ltcGxlV29ya2VyQ2xpZW50LnByb3RvdHlwZS5fcmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLl9vbk1vZHVsZUxvYWRlZC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcHJvdG9jb2wuc2VuZE1lc3NhZ2UobWV0aG9kLCBhcmdzKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZVdvcmtlckNsaWVudC5wcm90b3R5cGUuX29uRXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSwgZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgY29uc29sZS5pbmZvKGVycm9yKTtcbiAgICB9O1xuICAgIHJldHVybiBTaW1wbGVXb3JrZXJDbGllbnQ7XG59KERpc3Bvc2FibGUpKTtcbmV4cG9ydCB7IFNpbXBsZVdvcmtlckNsaWVudCB9O1xuLyoqXG4gKiBXb3JrZXIgc2lkZVxuICovXG52YXIgU2ltcGxlV29ya2VyU2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbXBsZVdvcmtlclNlcnZlcihwb3N0U2VyaWFsaXplZE1lc3NhZ2UsIHJlcXVlc3RIYW5kbGVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RIYW5kbGVyID0gcmVxdWVzdEhhbmRsZXI7XG4gICAgICAgIHRoaXMuX3Byb3RvY29sID0gbmV3IFNpbXBsZVdvcmtlclByb3RvY29sKHtcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgcG9zdFNlcmlhbGl6ZWRNZXNzYWdlKG1zZyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFuZGxlTWVzc2FnZTogZnVuY3Rpb24gKG1ldGhvZCwgYXJncykgeyByZXR1cm4gX3RoaXMuX2hhbmRsZU1lc3NhZ2UobWV0aG9kLCBhcmdzKTsgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU2ltcGxlV29ya2VyU2VydmVyLnByb3RvdHlwZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIHRoaXMuX3Byb3RvY29sLmhhbmRsZU1lc3NhZ2UobXNnKTtcbiAgICB9O1xuICAgIFNpbXBsZVdvcmtlclNlcnZlci5wcm90b3R5cGUuX2hhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbiAobWV0aG9kLCBhcmdzKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IElOSVRJQUxJWkUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxpemUoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0SGFuZGxlciB8fCB0eXBlb2YgdGhpcy5fcmVxdWVzdEhhbmRsZXJbbWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTWlzc2luZyByZXF1ZXN0SGFuZGxlciBvciBtZXRob2Q6ICcgKyBtZXRob2QpKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9yZXF1ZXN0SGFuZGxlclttZXRob2RdLmFwcGx5KHRoaXMuX3JlcXVlc3RIYW5kbGVyLCBhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlV29ya2VyU2VydmVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKHdvcmtlcklkLCBtb2R1bGVJZCwgbG9hZGVyQ29uZmlnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3Byb3RvY29sLnNldFdvcmtlcklkKHdvcmtlcklkKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RIYW5kbGVyKSB7XG4gICAgICAgICAgICAvLyBzdGF0aWMgcmVxdWVzdCBoYW5kbGVyXG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGdldEFsbFByb3BlcnR5TmFtZXModGhpcy5fcmVxdWVzdEhhbmRsZXIpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcmVxdWVzdEhhbmRsZXJbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKHByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWV0aG9kcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvYWRlckNvbmZpZykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlICdiYXNlVXJsJywgaGFuZGxpbmcgaXQgaXMgYmV5b25kIHNjb3BlIGZvciBub3dcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbG9hZGVyQ29uZmlnLmJhc2VVcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGxvYWRlckNvbmZpZ1snYmFzZVVybCddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsb2FkZXJDb25maWcucGF0aHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsb2FkZXJDb25maWcucGF0aHMudnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2FkZXJDb25maWcucGF0aHNbJ3ZzJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2luY2UgdGhpcyBpcyBpbiBhIHdlYiB3b3JrZXIsIGVuYWJsZSBjYXRjaGluZyBlcnJvcnNcbiAgICAgICAgICAgIGxvYWRlckNvbmZpZy5jYXRjaEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYucmVxdWlyZS5jb25maWcobG9hZGVyQ29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBnbG9iYWwgcmVxdWlyZSB0byBiZSBzdXJlIHRvIGdldCB0aGUgZ2xvYmFsIGNvbmZpZ1xuICAgICAgICAgICAgc2VsZi5yZXF1aXJlKFttb2R1bGVJZF0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyTW9kdWxlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgICAgIF90aGlzLl9yZXF1ZXN0SGFuZGxlciA9IGhhbmRsZXJNb2R1bGUuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fcmVxdWVzdEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk5vIFJlcXVlc3RIYW5kbGVyIVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIF9iID0gZ2V0QWxsUHJvcGVydHlOYW1lcyhfdGhpcy5fcmVxdWVzdEhhbmRsZXIpOyBfYSA8IF9iLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IF9iW19hXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5fcmVxdWVzdEhhbmRsZXJbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZHMucHVzaChwcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKG1ldGhvZHMpO1xuICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2ltcGxlV29ya2VyU2VydmVyO1xufSgpKTtcbmV4cG9ydCB7IFNpbXBsZVdvcmtlclNlcnZlciB9O1xuLyoqXG4gKiBDYWxsZWQgb24gdGhlIHdvcmtlciBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUocG9zdE1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFNpbXBsZVdvcmtlclNlcnZlcihwb3N0TWVzc2FnZSwgbnVsbCk7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IHRvVWludDggfSBmcm9tICcuL3VpbnQuanMnO1xuLyoqXG4gKiBBIGZhc3QgY2hhcmFjdGVyIGNsYXNzaWZpZXIgdGhhdCB1c2VzIGEgY29tcGFjdCBhcnJheSBmb3IgQVNDSUkgdmFsdWVzLlxuICovXG52YXIgQ2hhcmFjdGVyQ2xhc3NpZmllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaGFyYWN0ZXJDbGFzc2lmaWVyKF9kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHRvVWludDgoX2RlZmF1bHRWYWx1ZSk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgdGhpcy5fYXNjaWlNYXAgPSBDaGFyYWN0ZXJDbGFzc2lmaWVyLl9jcmVhdGVBc2NpaU1hcChkZWZhdWx0VmFsdWUpO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIENoYXJhY3RlckNsYXNzaWZpZXIuX2NyZWF0ZUFzY2lpTWFwID0gZnVuY3Rpb24gKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgYXNjaWlNYXAgPSBuZXcgVWludDhBcnJheSgyNTYpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICAgICAgICBhc2NpaU1hcFtpXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXNjaWlNYXA7XG4gICAgfTtcbiAgICBDaGFyYWN0ZXJDbGFzc2lmaWVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoY2hhckNvZGUsIF92YWx1ZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0b1VpbnQ4KF92YWx1ZSk7XG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAwICYmIGNoYXJDb2RlIDwgMjU2KSB7XG4gICAgICAgICAgICB0aGlzLl9hc2NpaU1hcFtjaGFyQ29kZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5zZXQoY2hhckNvZGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hhcmFjdGVyQ2xhc3NpZmllci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGNoYXJDb2RlKSB7XG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAwICYmIGNoYXJDb2RlIDwgMjU2KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXNjaWlNYXBbY2hhckNvZGVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9tYXAuZ2V0KGNoYXJDb2RlKSB8fCB0aGlzLl9kZWZhdWx0VmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2hhcmFjdGVyQ2xhc3NpZmllcjtcbn0oKSk7XG5leHBvcnQgeyBDaGFyYWN0ZXJDbGFzc2lmaWVyIH07XG52YXIgQ2hhcmFjdGVyU2V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENoYXJhY3RlclNldCgpIHtcbiAgICAgICAgdGhpcy5fYWN0dWFsID0gbmV3IENoYXJhY3RlckNsYXNzaWZpZXIoMCAvKiBGYWxzZSAqLyk7XG4gICAgfVxuICAgIENoYXJhY3RlclNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNoYXJDb2RlKSB7XG4gICAgICAgIHRoaXMuX2FjdHVhbC5zZXQoY2hhckNvZGUsIDEgLyogVHJ1ZSAqLyk7XG4gICAgfTtcbiAgICBDaGFyYWN0ZXJTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChjaGFyQ29kZSkge1xuICAgICAgICByZXR1cm4gKHRoaXMuX2FjdHVhbC5nZXQoY2hhckNvZGUpID09PSAxIC8qIFRydWUgKi8pO1xuICAgIH07XG4gICAgcmV0dXJuIENoYXJhY3RlclNldDtcbn0oKSk7XG5leHBvcnQgeyBDaGFyYWN0ZXJTZXQgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBBIHBvc2l0aW9uIGluIHRoZSBlZGl0b3IuXG4gKi9cbnZhciBQb3NpdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb3NpdGlvbihsaW5lTnVtYmVyLCBjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBwb3N0aW9uIGZyb20gdGhpcyBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuZXdMaW5lTnVtYmVyIG5ldyBsaW5lIG51bWJlclxuICAgICAqIEBwYXJhbSBuZXdDb2x1bW4gbmV3IGNvbHVtblxuICAgICAqL1xuICAgIFBvc2l0aW9uLnByb3RvdHlwZS53aXRoID0gZnVuY3Rpb24gKG5ld0xpbmVOdW1iZXIsIG5ld0NvbHVtbikge1xuICAgICAgICBpZiAobmV3TGluZU51bWJlciA9PT0gdm9pZCAwKSB7IG5ld0xpbmVOdW1iZXIgPSB0aGlzLmxpbmVOdW1iZXI7IH1cbiAgICAgICAgaWYgKG5ld0NvbHVtbiA9PT0gdm9pZCAwKSB7IG5ld0NvbHVtbiA9IHRoaXMuY29sdW1uOyB9XG4gICAgICAgIGlmIChuZXdMaW5lTnVtYmVyID09PSB0aGlzLmxpbmVOdW1iZXIgJiYgbmV3Q29sdW1uID09PSB0aGlzLmNvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKG5ld0xpbmVOdW1iZXIsIG5ld0NvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERlcml2ZSBhIG5ldyBwb3NpdGlvbiBmcm9tIHRoaXMgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGVsdGFMaW5lTnVtYmVyIGxpbmUgbnVtYmVyIGRlbHRhXG4gICAgICogQHBhcmFtIGRlbHRhQ29sdW1uIGNvbHVtbiBkZWx0YVxuICAgICAqL1xuICAgIFBvc2l0aW9uLnByb3RvdHlwZS5kZWx0YSA9IGZ1bmN0aW9uIChkZWx0YUxpbmVOdW1iZXIsIGRlbHRhQ29sdW1uKSB7XG4gICAgICAgIGlmIChkZWx0YUxpbmVOdW1iZXIgPT09IHZvaWQgMCkgeyBkZWx0YUxpbmVOdW1iZXIgPSAwOyB9XG4gICAgICAgIGlmIChkZWx0YUNvbHVtbiA9PT0gdm9pZCAwKSB7IGRlbHRhQ29sdW1uID0gMDsgfVxuICAgICAgICByZXR1cm4gdGhpcy53aXRoKHRoaXMubGluZU51bWJlciArIGRlbHRhTGluZU51bWJlciwgdGhpcy5jb2x1bW4gKyBkZWx0YUNvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoaXMgcG9zaXRpb24gZXF1YWxzIG90aGVyIHBvc2l0aW9uXG4gICAgICovXG4gICAgUG9zaXRpb24ucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uZXF1YWxzKHRoaXMsIG90aGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgcG9zaXRpb24gYGFgIGVxdWFscyBwb3NpdGlvbiBgYmBcbiAgICAgKi9cbiAgICBQb3NpdGlvbi5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoIWEgJiYgIWIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoISFhICYmXG4gICAgICAgICAgICAhIWIgJiZcbiAgICAgICAgICAgIGEubGluZU51bWJlciA9PT0gYi5saW5lTnVtYmVyICYmXG4gICAgICAgICAgICBhLmNvbHVtbiA9PT0gYi5jb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiB0aGlzIHBvc2l0aW9uIGlzIGJlZm9yZSBvdGhlciBwb3NpdGlvbi5cbiAgICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSBmYWxzZS5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5wcm90b3R5cGUuaXNCZWZvcmUgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzQmVmb3JlKHRoaXMsIG90aGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgcG9zaXRpb24gYGFgIGlzIGJlZm9yZSBwb3NpdGlvbiBgYmAuXG4gICAgICogSWYgdGhlIHR3byBwb3NpdGlvbnMgYXJlIGVxdWFsLCB0aGUgcmVzdWx0IHdpbGwgYmUgZmFsc2UuXG4gICAgICovXG4gICAgUG9zaXRpb24uaXNCZWZvcmUgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5saW5lTnVtYmVyIDwgYi5saW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYi5saW5lTnVtYmVyIDwgYS5saW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEuY29sdW1uIDwgYi5jb2x1bW47XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoaXMgcG9zaXRpb24gaXMgYmVmb3JlIG90aGVyIHBvc2l0aW9uLlxuICAgICAqIElmIHRoZSB0d28gcG9zaXRpb25zIGFyZSBlcXVhbCwgdGhlIHJlc3VsdCB3aWxsIGJlIHRydWUuXG4gICAgICovXG4gICAgUG9zaXRpb24ucHJvdG90eXBlLmlzQmVmb3JlT3JFcXVhbCA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNCZWZvcmVPckVxdWFsKHRoaXMsIG90aGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgcG9zaXRpb24gYGFgIGlzIGJlZm9yZSBwb3NpdGlvbiBgYmAuXG4gICAgICogSWYgdGhlIHR3byBwb3NpdGlvbnMgYXJlIGVxdWFsLCB0aGUgcmVzdWx0IHdpbGwgYmUgdHJ1ZS5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5pc0JlZm9yZU9yRXF1YWwgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5saW5lTnVtYmVyIDwgYi5saW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYi5saW5lTnVtYmVyIDwgYS5saW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEuY29sdW1uIDw9IGIuY29sdW1uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IGNvbXBhcmVzIHBvc2l0aW9ucywgdXNlZnVsIGZvciBzb3J0aW5nXG4gICAgICovXG4gICAgUG9zaXRpb24uY29tcGFyZSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBhTGluZU51bWJlciA9IGEubGluZU51bWJlciB8IDA7XG4gICAgICAgIHZhciBiTGluZU51bWJlciA9IGIubGluZU51bWJlciB8IDA7XG4gICAgICAgIGlmIChhTGluZU51bWJlciA9PT0gYkxpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBhQ29sdW1uID0gYS5jb2x1bW4gfCAwO1xuICAgICAgICAgICAgdmFyIGJDb2x1bW4gPSBiLmNvbHVtbiB8IDA7XG4gICAgICAgICAgICByZXR1cm4gYUNvbHVtbiAtIGJDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFMaW5lTnVtYmVyIC0gYkxpbmVOdW1iZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGlzIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIFBvc2l0aW9uLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbih0aGlzLmxpbmVOdW1iZXIsIHRoaXMuY29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnQgdG8gYSBodW1hbi1yZWFkYWJsZSByZXByZXNlbnRhdGlvbi5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnKCcgKyB0aGlzLmxpbmVOdW1iZXIgKyAnLCcgKyB0aGlzLmNvbHVtbiArICcpJztcbiAgICB9O1xuICAgIC8vIC0tLVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGBQb3NpdGlvbmAgZnJvbSBhbiBgSVBvc2l0aW9uYC5cbiAgICAgKi9cbiAgICBQb3NpdGlvbi5saWZ0ID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHBvcy5saW5lTnVtYmVyLCBwb3MuY29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgYG9iamAgaXMgYW4gYElQb3NpdGlvbmAuXG4gICAgICovXG4gICAgUG9zaXRpb24uaXNJUG9zaXRpb24gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAob2JqXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9iai5saW5lTnVtYmVyID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLmNvbHVtbiA9PT0gJ251bWJlcicpKTtcbiAgICB9O1xuICAgIHJldHVybiBQb3NpdGlvbjtcbn0oKSk7XG5leHBvcnQgeyBQb3NpdGlvbiB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4vcG9zaXRpb24uanMnO1xuLyoqXG4gKiBBIHJhbmdlIGluIHRoZSBlZGl0b3IuIChzdGFydExpbmVOdW1iZXIsc3RhcnRDb2x1bW4pIGlzIDw9IChlbmRMaW5lTnVtYmVyLGVuZENvbHVtbilcbiAqL1xudmFyIFJhbmdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJhbmdlKHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbikge1xuICAgICAgICBpZiAoKHN0YXJ0TGluZU51bWJlciA+IGVuZExpbmVOdW1iZXIpIHx8IChzdGFydExpbmVOdW1iZXIgPT09IGVuZExpbmVOdW1iZXIgJiYgc3RhcnRDb2x1bW4gPiBlbmRDb2x1bW4pKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGluZU51bWJlciA9IGVuZExpbmVOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29sdW1uID0gZW5kQ29sdW1uO1xuICAgICAgICAgICAgdGhpcy5lbmRMaW5lTnVtYmVyID0gc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgdGhpcy5lbmRDb2x1bW4gPSBzdGFydENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMaW5lTnVtYmVyID0gc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgdGhpcy5zdGFydENvbHVtbiA9IHN0YXJ0Q29sdW1uO1xuICAgICAgICAgICAgdGhpcy5lbmRMaW5lTnVtYmVyID0gZW5kTGluZU51bWJlcjtcbiAgICAgICAgICAgIHRoaXMuZW5kQ29sdW1uID0gZW5kQ29sdW1uO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhpcyByYW5nZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFJhbmdlLmlzRW1wdHkodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIGByYW5nZWAgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUmFuZ2UuaXNFbXB0eSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICByZXR1cm4gKHJhbmdlLnN0YXJ0TGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlciAmJiByYW5nZS5zdGFydENvbHVtbiA9PT0gcmFuZ2UuZW5kQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgcG9zaXRpb24gaXMgaW4gdGhpcyByYW5nZS4gSWYgdGhlIHBvc2l0aW9uIGlzIGF0IHRoZSBlZGdlcywgd2lsbCByZXR1cm4gdHJ1ZS5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuY29udGFpbnNQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gUmFuZ2UuY29udGFpbnNQb3NpdGlvbih0aGlzLCBwb3NpdGlvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIGBwb3NpdGlvbmAgaXMgaW4gYHJhbmdlYC4gSWYgdGhlIHBvc2l0aW9uIGlzIGF0IHRoZSBlZGdlcywgd2lsbCByZXR1cm4gdHJ1ZS5cbiAgICAgKi9cbiAgICBSYW5nZS5jb250YWluc1Bvc2l0aW9uID0gZnVuY3Rpb24gKHJhbmdlLCBwb3NpdGlvbikge1xuICAgICAgICBpZiAocG9zaXRpb24ubGluZU51bWJlciA8IHJhbmdlLnN0YXJ0TGluZU51bWJlciB8fCBwb3NpdGlvbi5saW5lTnVtYmVyID4gcmFuZ2UuZW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbi5saW5lTnVtYmVyID09PSByYW5nZS5zdGFydExpbmVOdW1iZXIgJiYgcG9zaXRpb24uY29sdW1uIDwgcmFuZ2Uuc3RhcnRDb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24ubGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlciAmJiBwb3NpdGlvbi5jb2x1bW4gPiByYW5nZS5lbmRDb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgcmFuZ2UgaXMgaW4gdGhpcyByYW5nZS4gSWYgdGhlIHJhbmdlIGlzIGVxdWFsIHRvIHRoaXMgcmFuZ2UsIHdpbGwgcmV0dXJuIHRydWUuXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLmNvbnRhaW5zUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIFJhbmdlLmNvbnRhaW5zUmFuZ2UodGhpcywgcmFuZ2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBgb3RoZXJSYW5nZWAgaXMgaW4gYHJhbmdlYC4gSWYgdGhlIHJhbmdlcyBhcmUgZXF1YWwsIHdpbGwgcmV0dXJuIHRydWUuXG4gICAgICovXG4gICAgUmFuZ2UuY29udGFpbnNSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSwgb3RoZXJSYW5nZSkge1xuICAgICAgICBpZiAob3RoZXJSYW5nZS5zdGFydExpbmVOdW1iZXIgPCByYW5nZS5zdGFydExpbmVOdW1iZXIgfHwgb3RoZXJSYW5nZS5lbmRMaW5lTnVtYmVyIDwgcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID4gcmFuZ2UuZW5kTGluZU51bWJlciB8fCBvdGhlclJhbmdlLmVuZExpbmVOdW1iZXIgPiByYW5nZS5lbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID09PSByYW5nZS5zdGFydExpbmVOdW1iZXIgJiYgb3RoZXJSYW5nZS5zdGFydENvbHVtbiA8IHJhbmdlLnN0YXJ0Q29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyUmFuZ2UuZW5kTGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlciAmJiBvdGhlclJhbmdlLmVuZENvbHVtbiA+IHJhbmdlLmVuZENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSByZXVuaW9uIG9mIHRoZSB0d28gcmFuZ2VzLlxuICAgICAqIFRoZSBzbWFsbGVzdCBwb3NpdGlvbiB3aWxsIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IHBvaW50LCBhbmQgdGhlIGxhcmdlc3Qgb25lIGFzIHRoZSBlbmQgcG9pbnQuXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLnBsdXNSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICByZXR1cm4gUmFuZ2UucGx1c1JhbmdlKHRoaXMsIHJhbmdlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEEgcmV1bmlvbiBvZiB0aGUgdHdvIHJhbmdlcy5cbiAgICAgKiBUaGUgc21hbGxlc3QgcG9zaXRpb24gd2lsbCBiZSB1c2VkIGFzIHRoZSBzdGFydCBwb2ludCwgYW5kIHRoZSBsYXJnZXN0IG9uZSBhcyB0aGUgZW5kIHBvaW50LlxuICAgICAqL1xuICAgIFJhbmdlLnBsdXNSYW5nZSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBzdGFydExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBzdGFydENvbHVtbjtcbiAgICAgICAgdmFyIGVuZExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBlbmRDb2x1bW47XG4gICAgICAgIGlmIChiLnN0YXJ0TGluZU51bWJlciA8IGEuc3RhcnRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICBzdGFydExpbmVOdW1iZXIgPSBiLnN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgICAgIHN0YXJ0Q29sdW1uID0gYi5zdGFydENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiLnN0YXJ0TGluZU51bWJlciA9PT0gYS5zdGFydExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0TGluZU51bWJlciA9IGIuc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgc3RhcnRDb2x1bW4gPSBNYXRoLm1pbihiLnN0YXJ0Q29sdW1uLCBhLnN0YXJ0Q29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0TGluZU51bWJlciA9IGEuc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgc3RhcnRDb2x1bW4gPSBhLnN0YXJ0Q29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiLmVuZExpbmVOdW1iZXIgPiBhLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIGVuZExpbmVOdW1iZXIgPSBiLmVuZExpbmVOdW1iZXI7XG4gICAgICAgICAgICBlbmRDb2x1bW4gPSBiLmVuZENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiLmVuZExpbmVOdW1iZXIgPT09IGEuZW5kTGluZU51bWJlcikge1xuICAgICAgICAgICAgZW5kTGluZU51bWJlciA9IGIuZW5kTGluZU51bWJlcjtcbiAgICAgICAgICAgIGVuZENvbHVtbiA9IE1hdGgubWF4KGIuZW5kQ29sdW1uLCBhLmVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbmRMaW5lTnVtYmVyID0gYS5lbmRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgZW5kQ29sdW1uID0gYS5lbmRDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBpbnRlcnNlY3Rpb24gb2YgdGhlIHR3byByYW5nZXMuXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLmludGVyc2VjdFJhbmdlcyA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICByZXR1cm4gUmFuZ2UuaW50ZXJzZWN0UmFuZ2VzKHRoaXMsIHJhbmdlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEEgaW50ZXJzZWN0aW9uIG9mIHRoZSB0d28gcmFuZ2VzLlxuICAgICAqL1xuICAgIFJhbmdlLmludGVyc2VjdFJhbmdlcyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciByZXN1bHRTdGFydExpbmVOdW1iZXIgPSBhLnN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdmFyIHJlc3VsdFN0YXJ0Q29sdW1uID0gYS5zdGFydENvbHVtbjtcbiAgICAgICAgdmFyIHJlc3VsdEVuZExpbmVOdW1iZXIgPSBhLmVuZExpbmVOdW1iZXI7XG4gICAgICAgIHZhciByZXN1bHRFbmRDb2x1bW4gPSBhLmVuZENvbHVtbjtcbiAgICAgICAgdmFyIG90aGVyU3RhcnRMaW5lTnVtYmVyID0gYi5zdGFydExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBvdGhlclN0YXJ0Q29sdW1uID0gYi5zdGFydENvbHVtbjtcbiAgICAgICAgdmFyIG90aGVyRW5kTGluZU51bWJlciA9IGIuZW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIG90aGVyRW5kQ29sdW1uID0gYi5lbmRDb2x1bW47XG4gICAgICAgIGlmIChyZXN1bHRTdGFydExpbmVOdW1iZXIgPCBvdGhlclN0YXJ0TGluZU51bWJlcikge1xuICAgICAgICAgICAgcmVzdWx0U3RhcnRMaW5lTnVtYmVyID0gb3RoZXJTdGFydExpbmVOdW1iZXI7XG4gICAgICAgICAgICByZXN1bHRTdGFydENvbHVtbiA9IG90aGVyU3RhcnRDb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzdWx0U3RhcnRMaW5lTnVtYmVyID09PSBvdGhlclN0YXJ0TGluZU51bWJlcikge1xuICAgICAgICAgICAgcmVzdWx0U3RhcnRDb2x1bW4gPSBNYXRoLm1heChyZXN1bHRTdGFydENvbHVtbiwgb3RoZXJTdGFydENvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdEVuZExpbmVOdW1iZXIgPiBvdGhlckVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJlc3VsdEVuZExpbmVOdW1iZXIgPSBvdGhlckVuZExpbmVOdW1iZXI7XG4gICAgICAgICAgICByZXN1bHRFbmRDb2x1bW4gPSBvdGhlckVuZENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXN1bHRFbmRMaW5lTnVtYmVyID09PSBvdGhlckVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJlc3VsdEVuZENvbHVtbiA9IE1hdGgubWluKHJlc3VsdEVuZENvbHVtbiwgb3RoZXJFbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGlvbiBpcyBub3cgZW1wdHlcbiAgICAgICAgaWYgKHJlc3VsdFN0YXJ0TGluZU51bWJlciA+IHJlc3VsdEVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRTdGFydExpbmVOdW1iZXIgPT09IHJlc3VsdEVuZExpbmVOdW1iZXIgJiYgcmVzdWx0U3RhcnRDb2x1bW4gPiByZXN1bHRFbmRDb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2UocmVzdWx0U3RhcnRMaW5lTnVtYmVyLCByZXN1bHRTdGFydENvbHVtbiwgcmVzdWx0RW5kTGluZU51bWJlciwgcmVzdWx0RW5kQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhpcyByYW5nZSBlcXVhbHMgb3RoZXIuXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLmVxdWFsc1JhbmdlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5lcXVhbHNSYW5nZSh0aGlzLCBvdGhlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHJhbmdlIGBhYCBlcXVhbHMgYGJgLlxuICAgICAqL1xuICAgIFJhbmdlLmVxdWFsc1JhbmdlID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuICghIWEgJiZcbiAgICAgICAgICAgICEhYiAmJlxuICAgICAgICAgICAgYS5zdGFydExpbmVOdW1iZXIgPT09IGIuc3RhcnRMaW5lTnVtYmVyICYmXG4gICAgICAgICAgICBhLnN0YXJ0Q29sdW1uID09PSBiLnN0YXJ0Q29sdW1uICYmXG4gICAgICAgICAgICBhLmVuZExpbmVOdW1iZXIgPT09IGIuZW5kTGluZU51bWJlciAmJlxuICAgICAgICAgICAgYS5lbmRDb2x1bW4gPT09IGIuZW5kQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZW5kIHBvc2l0aW9uICh3aGljaCB3aWxsIGJlIGFmdGVyIG9yIGVxdWFsIHRvIHRoZSBzdGFydCBwb3NpdGlvbilcbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuZ2V0RW5kUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24odGhpcy5lbmRMaW5lTnVtYmVyLCB0aGlzLmVuZENvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHN0YXJ0IHBvc2l0aW9uICh3aGljaCB3aWxsIGJlIGJlZm9yZSBvciBlcXVhbCB0byB0aGUgZW5kIHBvc2l0aW9uKVxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS5nZXRTdGFydFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHRoaXMuc3RhcnRMaW5lTnVtYmVyLCB0aGlzLnN0YXJ0Q29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSB0byBhIHVzZXIgcHJlc2VudGFibGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICdbJyArIHRoaXMuc3RhcnRMaW5lTnVtYmVyICsgJywnICsgdGhpcy5zdGFydENvbHVtbiArICcgLT4gJyArIHRoaXMuZW5kTGluZU51bWJlciArICcsJyArIHRoaXMuZW5kQ29sdW1uICsgJ10nO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHJhbmdlIHVzaW5nIHRoaXMgcmFuZ2UncyBzdGFydCBwb3NpdGlvbiwgYW5kIHVzaW5nIGVuZExpbmVOdW1iZXIgYW5kIGVuZENvbHVtbiBhcyB0aGUgZW5kIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIFJhbmdlLnByb3RvdHlwZS5zZXRFbmRQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZSh0aGlzLnN0YXJ0TGluZU51bWJlciwgdGhpcy5zdGFydENvbHVtbiwgZW5kTGluZU51bWJlciwgZW5kQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyByYW5nZSB1c2luZyB0aGlzIHJhbmdlJ3MgZW5kIHBvc2l0aW9uLCBhbmQgdXNpbmcgc3RhcnRMaW5lTnVtYmVyIGFuZCBzdGFydENvbHVtbiBhcyB0aGUgc3RhcnQgcG9zaXRpb24uXG4gICAgICovXG4gICAgUmFuZ2UucHJvdG90eXBlLnNldFN0YXJ0UG9zaXRpb24gPSBmdW5jdGlvbiAoc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbikge1xuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4sIHRoaXMuZW5kTGluZU51bWJlciwgdGhpcy5lbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGVtcHR5IHJhbmdlIHVzaW5nIHRoaXMgcmFuZ2UncyBzdGFydCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBSYW5nZS5wcm90b3R5cGUuY29sbGFwc2VUb1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUmFuZ2UuY29sbGFwc2VUb1N0YXJ0KHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGVtcHR5IHJhbmdlIHVzaW5nIHRoaXMgcmFuZ2UncyBzdGFydCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBSYW5nZS5jb2xsYXBzZVRvU3RhcnQgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLnN0YXJ0Q29sdW1uLCByYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLnN0YXJ0Q29sdW1uKTtcbiAgICB9O1xuICAgIC8vIC0tLVxuICAgIFJhbmdlLmZyb21Qb3NpdGlvbnMgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoZW5kID09PSB2b2lkIDApIHsgZW5kID0gc3RhcnQ7IH1cbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydC5saW5lTnVtYmVyLCBzdGFydC5jb2x1bW4sIGVuZC5saW5lTnVtYmVyLCBlbmQuY29sdW1uKTtcbiAgICB9O1xuICAgIFJhbmdlLmxpZnQgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgaWYgKCFyYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLnN0YXJ0Q29sdW1uLCByYW5nZS5lbmRMaW5lTnVtYmVyLCByYW5nZS5lbmRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBgb2JqYCBpcyBhbiBgSVJhbmdlYC5cbiAgICAgKi9cbiAgICBSYW5nZS5pc0lSYW5nZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIChvYmpcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLnN0YXJ0TGluZU51bWJlciA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9iai5zdGFydENvbHVtbiA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9iai5lbmRMaW5lTnVtYmVyID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLmVuZENvbHVtbiA9PT0gJ251bWJlcicpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhlIHR3byByYW5nZXMgYXJlIHRvdWNoaW5nIGluIGFueSB3YXkuXG4gICAgICovXG4gICAgUmFuZ2UuYXJlSW50ZXJzZWN0aW5nT3JUb3VjaGluZyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGBhYCBpcyBiZWZvcmUgYGJgXG4gICAgICAgIGlmIChhLmVuZExpbmVOdW1iZXIgPCBiLnN0YXJ0TGluZU51bWJlciB8fCAoYS5lbmRMaW5lTnVtYmVyID09PSBiLnN0YXJ0TGluZU51bWJlciAmJiBhLmVuZENvbHVtbiA8IGIuc3RhcnRDb2x1bW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgYGJgIGlzIGJlZm9yZSBgYWBcbiAgICAgICAgaWYgKGIuZW5kTGluZU51bWJlciA8IGEuc3RhcnRMaW5lTnVtYmVyIHx8IChiLmVuZExpbmVOdW1iZXIgPT09IGEuc3RhcnRMaW5lTnVtYmVyICYmIGIuZW5kQ29sdW1uIDwgYS5zdGFydENvbHVtbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGVzZSByYW5nZXMgbXVzdCBpbnRlcnNlY3RcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoZSB0d28gcmFuZ2VzIGFyZSBpbnRlcnNlY3RpbmcuIElmIHRoZSByYW5nZXMgYXJlIHRvdWNoaW5nIGl0IHJldHVybnMgdHJ1ZS5cbiAgICAgKi9cbiAgICBSYW5nZS5hcmVJbnRlcnNlY3RpbmcgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAvLyBDaGVjayBpZiBgYWAgaXMgYmVmb3JlIGBiYFxuICAgICAgICBpZiAoYS5lbmRMaW5lTnVtYmVyIDwgYi5zdGFydExpbmVOdW1iZXIgfHwgKGEuZW5kTGluZU51bWJlciA9PT0gYi5zdGFydExpbmVOdW1iZXIgJiYgYS5lbmRDb2x1bW4gPD0gYi5zdGFydENvbHVtbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBpZiBgYmAgaXMgYmVmb3JlIGBhYFxuICAgICAgICBpZiAoYi5lbmRMaW5lTnVtYmVyIDwgYS5zdGFydExpbmVOdW1iZXIgfHwgKGIuZW5kTGluZU51bWJlciA9PT0gYS5zdGFydExpbmVOdW1iZXIgJiYgYi5lbmRDb2x1bW4gPD0gYS5zdGFydENvbHVtbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGVzZSByYW5nZXMgbXVzdCBpbnRlcnNlY3RcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXMgcmFuZ2VzLCB1c2VmdWwgZm9yIHNvcnRpbmcgcmFuZ2VzXG4gICAgICogSXQgd2lsbCBmaXJzdCBjb21wYXJlIHJhbmdlcyBvbiB0aGUgc3RhcnRQb3NpdGlvbiBhbmQgdGhlbiBvbiB0aGUgZW5kUG9zaXRpb25cbiAgICAgKi9cbiAgICBSYW5nZS5jb21wYXJlUmFuZ2VzVXNpbmdTdGFydHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYSAmJiBiKSB7XG4gICAgICAgICAgICB2YXIgYVN0YXJ0TGluZU51bWJlciA9IGEuc3RhcnRMaW5lTnVtYmVyIHwgMDtcbiAgICAgICAgICAgIHZhciBiU3RhcnRMaW5lTnVtYmVyID0gYi5zdGFydExpbmVOdW1iZXIgfCAwO1xuICAgICAgICAgICAgaWYgKGFTdGFydExpbmVOdW1iZXIgPT09IGJTdGFydExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYVN0YXJ0Q29sdW1uID0gYS5zdGFydENvbHVtbiB8IDA7XG4gICAgICAgICAgICAgICAgdmFyIGJTdGFydENvbHVtbiA9IGIuc3RhcnRDb2x1bW4gfCAwO1xuICAgICAgICAgICAgICAgIGlmIChhU3RhcnRDb2x1bW4gPT09IGJTdGFydENvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYUVuZExpbmVOdW1iZXIgPSBhLmVuZExpbmVOdW1iZXIgfCAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYkVuZExpbmVOdW1iZXIgPSBiLmVuZExpbmVOdW1iZXIgfCAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYUVuZExpbmVOdW1iZXIgPT09IGJFbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYUVuZENvbHVtbiA9IGEuZW5kQ29sdW1uIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiRW5kQ29sdW1uID0gYi5lbmRDb2x1bW4gfCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFFbmRDb2x1bW4gLSBiRW5kQ29sdW1uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhRW5kTGluZU51bWJlciAtIGJFbmRMaW5lTnVtYmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYVN0YXJ0Q29sdW1uIC0gYlN0YXJ0Q29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFTdGFydExpbmVOdW1iZXIgLSBiU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhRXhpc3RzID0gKGEgPyAxIDogMCk7XG4gICAgICAgIHZhciBiRXhpc3RzID0gKGIgPyAxIDogMCk7XG4gICAgICAgIHJldHVybiBhRXhpc3RzIC0gYkV4aXN0cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCBjb21wYXJlcyByYW5nZXMsIHVzZWZ1bCBmb3Igc29ydGluZyByYW5nZXNcbiAgICAgKiBJdCB3aWxsIGZpcnN0IGNvbXBhcmUgcmFuZ2VzIG9uIHRoZSBlbmRQb3NpdGlvbiBhbmQgdGhlbiBvbiB0aGUgc3RhcnRQb3NpdGlvblxuICAgICAqL1xuICAgIFJhbmdlLmNvbXBhcmVSYW5nZXNVc2luZ0VuZHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5lbmRMaW5lTnVtYmVyID09PSBiLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChhLmVuZENvbHVtbiA9PT0gYi5lbmRDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoYS5zdGFydExpbmVOdW1iZXIgPT09IGIuc3RhcnRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnN0YXJ0Q29sdW1uIC0gYi5zdGFydENvbHVtbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuc3RhcnRMaW5lTnVtYmVyIC0gYi5zdGFydExpbmVOdW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYS5lbmRDb2x1bW4gLSBiLmVuZENvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5lbmRMaW5lTnVtYmVyIC0gYi5lbmRMaW5lTnVtYmVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiB0aGUgcmFuZ2Ugc3BhbnMgbXVsdGlwbGUgbGluZXMuXG4gICAgICovXG4gICAgUmFuZ2Uuc3BhbnNNdWx0aXBsZUxpbmVzID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiByYW5nZS5lbmRMaW5lTnVtYmVyID4gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyO1xuICAgIH07XG4gICAgcmV0dXJuIFJhbmdlO1xufSgpKTtcbmV4cG9ydCB7IFJhbmdlIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tICcuL3Bvc2l0aW9uLmpzJztcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9yYW5nZS5qcyc7XG4vKipcbiAqIEEgc2VsZWN0aW9uIGluIHRoZSBlZGl0b3IuXG4gKiBUaGUgc2VsZWN0aW9uIGlzIGEgcmFuZ2UgdGhhdCBoYXMgYW4gb3JpZW50YXRpb24uXG4gKi9cbnZhciBTZWxlY3Rpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlbGVjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLCBzZWxlY3Rpb25TdGFydENvbHVtbiwgcG9zaXRpb25MaW5lTnVtYmVyLCBwb3NpdGlvbkNvbHVtbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsIHNlbGVjdGlvblN0YXJ0Q29sdW1uLCBwb3NpdGlvbkxpbmVOdW1iZXIsIHBvc2l0aW9uQ29sdW1uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIgPSBzZWxlY3Rpb25TdGFydExpbmVOdW1iZXI7XG4gICAgICAgIF90aGlzLnNlbGVjdGlvblN0YXJ0Q29sdW1uID0gc2VsZWN0aW9uU3RhcnRDb2x1bW47XG4gICAgICAgIF90aGlzLnBvc2l0aW9uTGluZU51bWJlciA9IHBvc2l0aW9uTGluZU51bWJlcjtcbiAgICAgICAgX3RoaXMucG9zaXRpb25Db2x1bW4gPSBwb3NpdGlvbkNvbHVtbjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGlzIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciwgdGhpcy5zZWxlY3Rpb25TdGFydENvbHVtbiwgdGhpcy5wb3NpdGlvbkxpbmVOdW1iZXIsIHRoaXMucG9zaXRpb25Db2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtIHRvIGEgaHVtYW4tcmVhZGFibGUgcmVwcmVzZW50YXRpb24uXG4gICAgICovXG4gICAgU2VsZWN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICdbJyArIHRoaXMuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyICsgJywnICsgdGhpcy5zZWxlY3Rpb25TdGFydENvbHVtbiArICcgLT4gJyArIHRoaXMucG9zaXRpb25MaW5lTnVtYmVyICsgJywnICsgdGhpcy5wb3NpdGlvbkNvbHVtbiArICddJztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgZXF1YWxzIG90aGVyIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLmVxdWFsc1NlbGVjdGlvbiA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICByZXR1cm4gKFNlbGVjdGlvbi5zZWxlY3Rpb25zRXF1YWwodGhpcywgb3RoZXIpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgdGhlIHR3byBzZWxlY3Rpb25zIGFyZSBlcXVhbC5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24uc2VsZWN0aW9uc0VxdWFsID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciA9PT0gYi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIgJiZcbiAgICAgICAgICAgIGEuc2VsZWN0aW9uU3RhcnRDb2x1bW4gPT09IGIuc2VsZWN0aW9uU3RhcnRDb2x1bW4gJiZcbiAgICAgICAgICAgIGEucG9zaXRpb25MaW5lTnVtYmVyID09PSBiLnBvc2l0aW9uTGluZU51bWJlciAmJlxuICAgICAgICAgICAgYS5wb3NpdGlvbkNvbHVtbiA9PT0gYi5wb3NpdGlvbkNvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZGlyZWN0aW9ucyAoTFRSIG9yIFJUTCkuXG4gICAgICovXG4gICAgU2VsZWN0aW9uLnByb3RvdHlwZS5nZXREaXJlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciA9PT0gdGhpcy5zdGFydExpbmVOdW1iZXIgJiYgdGhpcy5zZWxlY3Rpb25TdGFydENvbHVtbiA9PT0gdGhpcy5zdGFydENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIDAgLyogTFRSICovO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxIC8qIFJUTCAqLztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzZWxlY3Rpb24gd2l0aCBhIGRpZmZlcmVudCBgcG9zaXRpb25MaW5lTnVtYmVyYCBhbmQgYHBvc2l0aW9uQ29sdW1uYC5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLnNldEVuZFBvc2l0aW9uID0gZnVuY3Rpb24gKGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbikge1xuICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24oKSA9PT0gMCAvKiBMVFIgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuc3RhcnRMaW5lTnVtYmVyLCB0aGlzLnN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbiwgdGhpcy5zdGFydExpbmVOdW1iZXIsIHRoaXMuc3RhcnRDb2x1bW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwb3NpdGlvbiBhdCBgcG9zaXRpb25MaW5lTnVtYmVyYCBhbmQgYHBvc2l0aW9uQ29sdW1uYC5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHRoaXMucG9zaXRpb25MaW5lTnVtYmVyLCB0aGlzLnBvc2l0aW9uQ29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzZWxlY3Rpb24gd2l0aCBhIGRpZmZlcmVudCBgc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyYCBhbmQgYHNlbGVjdGlvblN0YXJ0Q29sdW1uYC5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24ucHJvdG90eXBlLnNldFN0YXJ0UG9zaXRpb24gPSBmdW5jdGlvbiAoc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbikge1xuICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24oKSA9PT0gMCAvKiBMVFIgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4sIHRoaXMuZW5kTGluZU51bWJlciwgdGhpcy5lbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuZW5kTGluZU51bWJlciwgdGhpcy5lbmRDb2x1bW4sIHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4pO1xuICAgIH07XG4gICAgLy8gLS0tLVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGBTZWxlY3Rpb25gIGZyb20gb25lIG9yIHR3byBwb3NpdGlvbnNcbiAgICAgKi9cbiAgICBTZWxlY3Rpb24uZnJvbVBvc2l0aW9ucyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIGlmIChlbmQgPT09IHZvaWQgMCkgeyBlbmQgPSBzdGFydDsgfVxuICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdGFydC5saW5lTnVtYmVyLCBzdGFydC5jb2x1bW4sIGVuZC5saW5lTnVtYmVyLCBlbmQuY29sdW1uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGBTZWxlY3Rpb25gIGZyb20gYW4gYElTZWxlY3Rpb25gLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbi5saWZ0U2VsZWN0aW9uID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihzZWwuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLCBzZWwuc2VsZWN0aW9uU3RhcnRDb2x1bW4sIHNlbC5wb3NpdGlvbkxpbmVOdW1iZXIsIHNlbC5wb3NpdGlvbkNvbHVtbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBgYWAgZXF1YWxzIGBiYC5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24uc2VsZWN0aW9uc0FyckVxdWFsID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgaWYgKGEgJiYgIWIgfHwgIWEgJiYgYikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSAmJiAhYikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0aW9uc0VxdWFsKGFbaV0sIGJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGVzdCBpZiBgb2JqYCBpcyBhbiBgSVNlbGVjdGlvbmAuXG4gICAgICovXG4gICAgU2VsZWN0aW9uLmlzSVNlbGVjdGlvbiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIChvYmpcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9iai5zZWxlY3Rpb25TdGFydENvbHVtbiA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9iai5wb3NpdGlvbkxpbmVOdW1iZXIgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmoucG9zaXRpb25Db2x1bW4gPT09ICdudW1iZXInKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgd2l0aCBhIGRpcmVjdGlvbi5cbiAgICAgKi9cbiAgICBTZWxlY3Rpb24uY3JlYXRlV2l0aERpcmVjdGlvbiA9IGZ1bmN0aW9uIChzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4sIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAwIC8qIExUUiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbiwgZW5kTGluZU51bWJlciwgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4sIHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlbGVjdGlvbjtcbn0oUmFuZ2UpKTtcbmV4cG9ydCB7IFNlbGVjdGlvbiB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgVG9rZW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVG9rZW4ob2Zmc2V0LCB0eXBlLCBsYW5ndWFnZSkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8IDA7IC8vIEBwZXJmXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICB9XG4gICAgVG9rZW4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJygnICsgdGhpcy5vZmZzZXQgKyAnLCAnICsgdGhpcy50eXBlICsgJyknO1xuICAgIH07XG4gICAgcmV0dXJuIFRva2VuO1xufSgpKTtcbmV4cG9ydCB7IFRva2VuIH07XG52YXIgVG9rZW5pemF0aW9uUmVzdWx0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRva2VuaXphdGlvblJlc3VsdCh0b2tlbnMsIGVuZFN0YXRlKSB7XG4gICAgICAgIHRoaXMudG9rZW5zID0gdG9rZW5zO1xuICAgICAgICB0aGlzLmVuZFN0YXRlID0gZW5kU3RhdGU7XG4gICAgfVxuICAgIHJldHVybiBUb2tlbml6YXRpb25SZXN1bHQ7XG59KCkpO1xuZXhwb3J0IHsgVG9rZW5pemF0aW9uUmVzdWx0IH07XG52YXIgVG9rZW5pemF0aW9uUmVzdWx0MiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb2tlbml6YXRpb25SZXN1bHQyKHRva2VucywgZW5kU3RhdGUpIHtcbiAgICAgICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XG4gICAgICAgIHRoaXMuZW5kU3RhdGUgPSBlbmRTdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIFRva2VuaXphdGlvblJlc3VsdDI7XG59KCkpO1xuZXhwb3J0IHsgVG9rZW5pemF0aW9uUmVzdWx0MiB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgVWludDhNYXRyaXggPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVWludDhNYXRyaXgocm93cywgY29scywgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQ4QXJyYXkocm93cyAqIGNvbHMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcm93cyAqIGNvbHM7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgZGF0YVtpXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcbiAgICB9XG4gICAgVWludDhNYXRyaXgucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChyb3csIGNvbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtyb3cgKiB0aGlzLmNvbHMgKyBjb2xdO1xuICAgIH07XG4gICAgVWludDhNYXRyaXgucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChyb3csIGNvbCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGF0YVtyb3cgKiB0aGlzLmNvbHMgKyBjb2xdID0gdmFsdWU7XG4gICAgfTtcbiAgICByZXR1cm4gVWludDhNYXRyaXg7XG59KCkpO1xuZXhwb3J0IHsgVWludDhNYXRyaXggfTtcbmV4cG9ydCBmdW5jdGlvbiB0b1VpbnQ4KHYpIHtcbiAgICBpZiAodiA8IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmICh2ID4gMjU1IC8qIE1BWF9VSU5UXzggKi8pIHtcbiAgICAgICAgcmV0dXJuIDI1NSAvKiBNQVhfVUlOVF84ICovO1xuICAgIH1cbiAgICByZXR1cm4gdiB8IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gdG9VaW50MzIodikge1xuICAgIGlmICh2IDwgMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKHYgPiA0Mjk0OTY3Mjk1IC8qIE1BWF9VSU5UXzMyICovKSB7XG4gICAgICAgIHJldHVybiA0Mjk0OTY3Mjk1IC8qIE1BWF9VSU5UXzMyICovO1xuICAgIH1cbiAgICByZXR1cm4gdiB8IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gdG9VaW50MzJBcnJheShhcnIpIHtcbiAgICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgICB2YXIgciA9IG5ldyBVaW50MzJBcnJheShsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgcltpXSA9IHRvVWludDMyKGFycltpXSk7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBMY3NEaWZmIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vZGlmZi9kaWZmLmpzJztcbmltcG9ydCAqIGFzIHN0cmluZ3MgZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vc3RyaW5ncy5qcyc7XG52YXIgTUFYSU1VTV9SVU5fVElNRSA9IDUwMDA7IC8vIDUgc2Vjb25kc1xudmFyIE1JTklNVU1fTUFUQ0hJTkdfQ0hBUkFDVEVSX0xFTkdUSCA9IDM7XG5mdW5jdGlvbiBjb21wdXRlRGlmZihvcmlnaW5hbFNlcXVlbmNlLCBtb2RpZmllZFNlcXVlbmNlLCBjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUsIHByZXR0eSkge1xuICAgIHZhciBkaWZmQWxnbyA9IG5ldyBMY3NEaWZmKG9yaWdpbmFsU2VxdWVuY2UsIG1vZGlmaWVkU2VxdWVuY2UsIGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIGRpZmZBbGdvLkNvbXB1dGVEaWZmKHByZXR0eSk7XG59XG52YXIgTGluZU1hcmtlclNlcXVlbmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmVNYXJrZXJTZXF1ZW5jZShsaW5lcykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW5zID0gW107XG4gICAgICAgIHZhciBlbmRDb2x1bW5zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGhfMSA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbmd0aF8xOyBpKyspIHtcbiAgICAgICAgICAgIHN0YXJ0Q29sdW1uc1tpXSA9IExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0Rmlyc3ROb25CbGFua0NvbHVtbihsaW5lc1tpXSwgMSk7XG4gICAgICAgICAgICBlbmRDb2x1bW5zW2ldID0gTGluZU1hcmtlclNlcXVlbmNlLl9nZXRMYXN0Tm9uQmxhbmtDb2x1bW4obGluZXNbaV0sIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpbmVzID0gbGluZXM7XG4gICAgICAgIHRoaXMuX3N0YXJ0Q29sdW1ucyA9IHN0YXJ0Q29sdW1ucztcbiAgICAgICAgdGhpcy5fZW5kQ29sdW1ucyA9IGVuZENvbHVtbnM7XG4gICAgfVxuICAgIExpbmVNYXJrZXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZXMubGVuZ3RoO1xuICAgIH07XG4gICAgTGluZU1hcmtlclNlcXVlbmNlLnByb3RvdHlwZS5nZXRFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lc1tpXS5zdWJzdHJpbmcodGhpcy5fc3RhcnRDb2x1bW5zW2ldIC0gMSwgdGhpcy5fZW5kQ29sdW1uc1tpXSAtIDEpO1xuICAgIH07XG4gICAgTGluZU1hcmtlclNlcXVlbmNlLnByb3RvdHlwZS5nZXRTdGFydExpbmVOdW1iZXIgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gaSArIDE7XG4gICAgfTtcbiAgICBMaW5lTWFya2VyU2VxdWVuY2UucHJvdG90eXBlLmdldEVuZExpbmVOdW1iZXIgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gaSArIDE7XG4gICAgfTtcbiAgICBMaW5lTWFya2VyU2VxdWVuY2UuX2dldEZpcnN0Tm9uQmxhbmtDb2x1bW4gPSBmdW5jdGlvbiAodHh0LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHIgPSBzdHJpbmdzLmZpcnN0Tm9uV2hpdGVzcGFjZUluZGV4KHR4dCk7XG4gICAgICAgIGlmIChyID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gciArIDE7XG4gICAgfTtcbiAgICBMaW5lTWFya2VyU2VxdWVuY2UuX2dldExhc3ROb25CbGFua0NvbHVtbiA9IGZ1bmN0aW9uICh0eHQsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgciA9IHN0cmluZ3MubGFzdE5vbldoaXRlc3BhY2VJbmRleCh0eHQpO1xuICAgICAgICBpZiAociA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHIgKyAyO1xuICAgIH07XG4gICAgTGluZU1hcmtlclNlcXVlbmNlLnByb3RvdHlwZS5nZXRDaGFyU2VxdWVuY2UgPSBmdW5jdGlvbiAoc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UsIHN0YXJ0SW5kZXgsIGVuZEluZGV4KSB7XG4gICAgICAgIHZhciBjaGFyQ29kZXMgPSBbXTtcbiAgICAgICAgdmFyIGxpbmVOdW1iZXJzID0gW107XG4gICAgICAgIHZhciBjb2x1bW5zID0gW107XG4gICAgICAgIHZhciBsZW4gPSAwO1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IHN0YXJ0SW5kZXg7IGluZGV4IDw9IGVuZEluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgbGluZUNvbnRlbnQgPSB0aGlzLl9saW5lc1tpbmRleF07XG4gICAgICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSAoc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UgPyB0aGlzLl9zdGFydENvbHVtbnNbaW5kZXhdIDogMSk7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gKHNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlID8gdGhpcy5fZW5kQ29sdW1uc1tpbmRleF0gOiBsaW5lQ29udGVudC5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IHN0YXJ0Q29sdW1uOyBjb2wgPCBlbmRDb2x1bW47IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgY2hhckNvZGVzW2xlbl0gPSBsaW5lQ29udGVudC5jaGFyQ29kZUF0KGNvbCAtIDEpO1xuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXJzW2xlbl0gPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgY29sdW1uc1tsZW5dID0gY29sO1xuICAgICAgICAgICAgICAgIGxlbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ2hhclNlcXVlbmNlKGNoYXJDb2RlcywgbGluZU51bWJlcnMsIGNvbHVtbnMpO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmVNYXJrZXJTZXF1ZW5jZTtcbn0oKSk7XG52YXIgQ2hhclNlcXVlbmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENoYXJTZXF1ZW5jZShjaGFyQ29kZXMsIGxpbmVOdW1iZXJzLCBjb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuX2NoYXJDb2RlcyA9IGNoYXJDb2RlcztcbiAgICAgICAgdGhpcy5fbGluZU51bWJlcnMgPSBsaW5lTnVtYmVycztcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IGNvbHVtbnM7XG4gICAgfVxuICAgIENoYXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhckNvZGVzLmxlbmd0aDtcbiAgICB9O1xuICAgIENoYXJTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0RWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhckNvZGVzW2ldO1xuICAgIH07XG4gICAgQ2hhclNlcXVlbmNlLnByb3RvdHlwZS5nZXRTdGFydExpbmVOdW1iZXIgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZU51bWJlcnNbaV07XG4gICAgfTtcbiAgICBDaGFyU2VxdWVuY2UucHJvdG90eXBlLmdldFN0YXJ0Q29sdW1uID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNbaV07XG4gICAgfTtcbiAgICBDaGFyU2VxdWVuY2UucHJvdG90eXBlLmdldEVuZExpbmVOdW1iZXIgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZU51bWJlcnNbaV07XG4gICAgfTtcbiAgICBDaGFyU2VxdWVuY2UucHJvdG90eXBlLmdldEVuZENvbHVtbiA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zW2ldICsgMTtcbiAgICB9O1xuICAgIHJldHVybiBDaGFyU2VxdWVuY2U7XG59KCkpO1xudmFyIENoYXJDaGFuZ2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hhckNoYW5nZShvcmlnaW5hbFN0YXJ0TGluZU51bWJlciwgb3JpZ2luYWxTdGFydENvbHVtbiwgb3JpZ2luYWxFbmRMaW5lTnVtYmVyLCBvcmlnaW5hbEVuZENvbHVtbiwgbW9kaWZpZWRTdGFydExpbmVOdW1iZXIsIG1vZGlmaWVkU3RhcnRDb2x1bW4sIG1vZGlmaWVkRW5kTGluZU51bWJlciwgbW9kaWZpZWRFbmRDb2x1bW4pIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFN0YXJ0TGluZU51bWJlciA9IG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB0aGlzLm9yaWdpbmFsU3RhcnRDb2x1bW4gPSBvcmlnaW5hbFN0YXJ0Q29sdW1uO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRW5kTGluZU51bWJlciA9IG9yaWdpbmFsRW5kTGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVuZENvbHVtbiA9IG9yaWdpbmFsRW5kQ29sdW1uO1xuICAgICAgICB0aGlzLm1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyID0gbW9kaWZpZWRTdGFydExpbmVOdW1iZXI7XG4gICAgICAgIHRoaXMubW9kaWZpZWRTdGFydENvbHVtbiA9IG1vZGlmaWVkU3RhcnRDb2x1bW47XG4gICAgICAgIHRoaXMubW9kaWZpZWRFbmRMaW5lTnVtYmVyID0gbW9kaWZpZWRFbmRMaW5lTnVtYmVyO1xuICAgICAgICB0aGlzLm1vZGlmaWVkRW5kQ29sdW1uID0gbW9kaWZpZWRFbmRDb2x1bW47XG4gICAgfVxuICAgIENoYXJDaGFuZ2UuY3JlYXRlRnJvbURpZmZDaGFuZ2UgPSBmdW5jdGlvbiAoZGlmZkNoYW5nZSwgb3JpZ2luYWxDaGFyU2VxdWVuY2UsIG1vZGlmaWVkQ2hhclNlcXVlbmNlKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbFN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdmFyIG9yaWdpbmFsU3RhcnRDb2x1bW47XG4gICAgICAgIHZhciBvcmlnaW5hbEVuZExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBvcmlnaW5hbEVuZENvbHVtbjtcbiAgICAgICAgdmFyIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgICB2YXIgbW9kaWZpZWRTdGFydENvbHVtbjtcbiAgICAgICAgdmFyIG1vZGlmaWVkRW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIG1vZGlmaWVkRW5kQ29sdW1uO1xuICAgICAgICBpZiAoZGlmZkNoYW5nZS5vcmlnaW5hbExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXIgPSAwO1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydENvbHVtbiA9IDA7XG4gICAgICAgICAgICBvcmlnaW5hbEVuZExpbmVOdW1iZXIgPSAwO1xuICAgICAgICAgICAgb3JpZ2luYWxFbmRDb2x1bW4gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXIgPSBvcmlnaW5hbENoYXJTZXF1ZW5jZS5nZXRTdGFydExpbmVOdW1iZXIoZGlmZkNoYW5nZS5vcmlnaW5hbFN0YXJ0KTtcbiAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRDb2x1bW4gPSBvcmlnaW5hbENoYXJTZXF1ZW5jZS5nZXRTdGFydENvbHVtbihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQpO1xuICAgICAgICAgICAgb3JpZ2luYWxFbmRMaW5lTnVtYmVyID0gb3JpZ2luYWxDaGFyU2VxdWVuY2UuZ2V0RW5kTGluZU51bWJlcihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQgKyBkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBvcmlnaW5hbEVuZENvbHVtbiA9IG9yaWdpbmFsQ2hhclNlcXVlbmNlLmdldEVuZENvbHVtbihkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQgKyBkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpZmZDaGFuZ2UubW9kaWZpZWRMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyID0gMDtcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRDb2x1bW4gPSAwO1xuICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyID0gMDtcbiAgICAgICAgICAgIG1vZGlmaWVkRW5kQ29sdW1uID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyID0gbW9kaWZpZWRDaGFyU2VxdWVuY2UuZ2V0U3RhcnRMaW5lTnVtYmVyKGRpZmZDaGFuZ2UubW9kaWZpZWRTdGFydCk7XG4gICAgICAgICAgICBtb2RpZmllZFN0YXJ0Q29sdW1uID0gbW9kaWZpZWRDaGFyU2VxdWVuY2UuZ2V0U3RhcnRDb2x1bW4oZGlmZkNoYW5nZS5tb2RpZmllZFN0YXJ0KTtcbiAgICAgICAgICAgIG1vZGlmaWVkRW5kTGluZU51bWJlciA9IG1vZGlmaWVkQ2hhclNlcXVlbmNlLmdldEVuZExpbmVOdW1iZXIoZGlmZkNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgZGlmZkNoYW5nZS5tb2RpZmllZExlbmd0aCAtIDEpO1xuICAgICAgICAgICAgbW9kaWZpZWRFbmRDb2x1bW4gPSBtb2RpZmllZENoYXJTZXF1ZW5jZS5nZXRFbmRDb2x1bW4oZGlmZkNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgZGlmZkNoYW5nZS5tb2RpZmllZExlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ2hhckNoYW5nZShvcmlnaW5hbFN0YXJ0TGluZU51bWJlciwgb3JpZ2luYWxTdGFydENvbHVtbiwgb3JpZ2luYWxFbmRMaW5lTnVtYmVyLCBvcmlnaW5hbEVuZENvbHVtbiwgbW9kaWZpZWRTdGFydExpbmVOdW1iZXIsIG1vZGlmaWVkU3RhcnRDb2x1bW4sIG1vZGlmaWVkRW5kTGluZU51bWJlciwgbW9kaWZpZWRFbmRDb2x1bW4pO1xuICAgIH07XG4gICAgcmV0dXJuIENoYXJDaGFuZ2U7XG59KCkpO1xuZnVuY3Rpb24gcG9zdFByb2Nlc3NDaGFyQ2hhbmdlcyhyYXdDaGFuZ2VzKSB7XG4gICAgaWYgKHJhd0NoYW5nZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIHJhd0NoYW5nZXM7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbcmF3Q2hhbmdlc1swXV07XG4gICAgdmFyIHByZXZDaGFuZ2UgPSByZXN1bHRbMF07XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHJhd0NoYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGN1cnJDaGFuZ2UgPSByYXdDaGFuZ2VzW2ldO1xuICAgICAgICB2YXIgb3JpZ2luYWxNYXRjaGluZ0xlbmd0aCA9IGN1cnJDaGFuZ2Uub3JpZ2luYWxTdGFydCAtIChwcmV2Q2hhbmdlLm9yaWdpbmFsU3RhcnQgKyBwcmV2Q2hhbmdlLm9yaWdpbmFsTGVuZ3RoKTtcbiAgICAgICAgdmFyIG1vZGlmaWVkTWF0Y2hpbmdMZW5ndGggPSBjdXJyQ2hhbmdlLm1vZGlmaWVkU3RhcnQgLSAocHJldkNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgcHJldkNoYW5nZS5tb2RpZmllZExlbmd0aCk7XG4gICAgICAgIC8vIEJvdGggb2YgdGhlIGFib3ZlIHNob3VsZCBiZSBlcXVhbCwgYnV0IHRoZSBjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUgbWF5IHByZXZlbnQgdGhpcyBmcm9tIGJlaW5nIHRydWVcbiAgICAgICAgdmFyIG1hdGNoaW5nTGVuZ3RoID0gTWF0aC5taW4ob3JpZ2luYWxNYXRjaGluZ0xlbmd0aCwgbW9kaWZpZWRNYXRjaGluZ0xlbmd0aCk7XG4gICAgICAgIGlmIChtYXRjaGluZ0xlbmd0aCA8IE1JTklNVU1fTUFUQ0hJTkdfQ0hBUkFDVEVSX0xFTkdUSCkge1xuICAgICAgICAgICAgLy8gTWVyZ2UgdGhlIGN1cnJlbnQgY2hhbmdlIGludG8gdGhlIHByZXZpb3VzIG9uZVxuICAgICAgICAgICAgcHJldkNoYW5nZS5vcmlnaW5hbExlbmd0aCA9IChjdXJyQ2hhbmdlLm9yaWdpbmFsU3RhcnQgKyBjdXJyQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoKSAtIHByZXZDaGFuZ2Uub3JpZ2luYWxTdGFydDtcbiAgICAgICAgICAgIHByZXZDaGFuZ2UubW9kaWZpZWRMZW5ndGggPSAoY3VyckNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgY3VyckNoYW5nZS5tb2RpZmllZExlbmd0aCkgLSBwcmV2Q2hhbmdlLm1vZGlmaWVkU3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGN1cnJlbnQgY2hhbmdlXG4gICAgICAgICAgICByZXN1bHQucHVzaChjdXJyQ2hhbmdlKTtcbiAgICAgICAgICAgIHByZXZDaGFuZ2UgPSBjdXJyQ2hhbmdlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG52YXIgTGluZUNoYW5nZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaW5lQ2hhbmdlKG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyLCBvcmlnaW5hbEVuZExpbmVOdW1iZXIsIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyLCBtb2RpZmllZEVuZExpbmVOdW1iZXIsIGNoYXJDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTdGFydExpbmVOdW1iZXIgPSBvcmlnaW5hbFN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVuZExpbmVOdW1iZXIgPSBvcmlnaW5hbEVuZExpbmVOdW1iZXI7XG4gICAgICAgIHRoaXMubW9kaWZpZWRTdGFydExpbmVOdW1iZXIgPSBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdGhpcy5tb2RpZmllZEVuZExpbmVOdW1iZXIgPSBtb2RpZmllZEVuZExpbmVOdW1iZXI7XG4gICAgICAgIHRoaXMuY2hhckNoYW5nZXMgPSBjaGFyQ2hhbmdlcztcbiAgICB9XG4gICAgTGluZUNoYW5nZS5jcmVhdGVGcm9tRGlmZlJlc3VsdCA9IGZ1bmN0aW9uIChzaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSwgZGlmZkNoYW5nZSwgb3JpZ2luYWxMaW5lU2VxdWVuY2UsIG1vZGlmaWVkTGluZVNlcXVlbmNlLCBjb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUsIHNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcywgc2hvdWxkUG9zdFByb2Nlc3NDaGFyQ2hhbmdlcykge1xuICAgICAgICB2YXIgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBvcmlnaW5hbEVuZExpbmVOdW1iZXI7XG4gICAgICAgIHZhciBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjtcbiAgICAgICAgdmFyIG1vZGlmaWVkRW5kTGluZU51bWJlcjtcbiAgICAgICAgdmFyIGNoYXJDaGFuZ2VzID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoZGlmZkNoYW5nZS5vcmlnaW5hbExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXIgPSBvcmlnaW5hbExpbmVTZXF1ZW5jZS5nZXRTdGFydExpbmVOdW1iZXIoZGlmZkNoYW5nZS5vcmlnaW5hbFN0YXJ0KSAtIDE7XG4gICAgICAgICAgICBvcmlnaW5hbEVuZExpbmVOdW1iZXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXIgPSBvcmlnaW5hbExpbmVTZXF1ZW5jZS5nZXRTdGFydExpbmVOdW1iZXIoZGlmZkNoYW5nZS5vcmlnaW5hbFN0YXJ0KTtcbiAgICAgICAgICAgIG9yaWdpbmFsRW5kTGluZU51bWJlciA9IG9yaWdpbmFsTGluZVNlcXVlbmNlLmdldEVuZExpbmVOdW1iZXIoZGlmZkNoYW5nZS5vcmlnaW5hbFN0YXJ0ICsgZGlmZkNoYW5nZS5vcmlnaW5hbExlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaWZmQ2hhbmdlLm1vZGlmaWVkTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBtb2RpZmllZFN0YXJ0TGluZU51bWJlciA9IG1vZGlmaWVkTGluZVNlcXVlbmNlLmdldFN0YXJ0TGluZU51bWJlcihkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQpIC0gMTtcbiAgICAgICAgICAgIG1vZGlmaWVkRW5kTGluZU51bWJlciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb2RpZmllZFN0YXJ0TGluZU51bWJlciA9IG1vZGlmaWVkTGluZVNlcXVlbmNlLmdldFN0YXJ0TGluZU51bWJlcihkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQpO1xuICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyID0gbW9kaWZpZWRMaW5lU2VxdWVuY2UuZ2V0RW5kTGluZU51bWJlcihkaWZmQ2hhbmdlLm1vZGlmaWVkU3RhcnQgKyBkaWZmQ2hhbmdlLm1vZGlmaWVkTGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcyAmJiBkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoICE9PSAwICYmIGRpZmZDaGFuZ2UubW9kaWZpZWRMZW5ndGggIT09IDAgJiYgY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlKCkpIHtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbENoYXJTZXF1ZW5jZSA9IG9yaWdpbmFsTGluZVNlcXVlbmNlLmdldENoYXJTZXF1ZW5jZShzaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZSwgZGlmZkNoYW5nZS5vcmlnaW5hbFN0YXJ0LCBkaWZmQ2hhbmdlLm9yaWdpbmFsU3RhcnQgKyBkaWZmQ2hhbmdlLm9yaWdpbmFsTGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRDaGFyU2VxdWVuY2UgPSBtb2RpZmllZExpbmVTZXF1ZW5jZS5nZXRDaGFyU2VxdWVuY2Uoc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UsIGRpZmZDaGFuZ2UubW9kaWZpZWRTdGFydCwgZGlmZkNoYW5nZS5tb2RpZmllZFN0YXJ0ICsgZGlmZkNoYW5nZS5tb2RpZmllZExlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHJhd0NoYW5nZXMgPSBjb21wdXRlRGlmZihvcmlnaW5hbENoYXJTZXF1ZW5jZSwgbW9kaWZpZWRDaGFyU2VxdWVuY2UsIGNvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkUG9zdFByb2Nlc3NDaGFyQ2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHJhd0NoYW5nZXMgPSBwb3N0UHJvY2Vzc0NoYXJDaGFuZ2VzKHJhd0NoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhckNoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGhfMiA9IHJhd0NoYW5nZXMubGVuZ3RoOyBpIDwgbGVuZ3RoXzI7IGkrKykge1xuICAgICAgICAgICAgICAgIGNoYXJDaGFuZ2VzLnB1c2goQ2hhckNoYW5nZS5jcmVhdGVGcm9tRGlmZkNoYW5nZShyYXdDaGFuZ2VzW2ldLCBvcmlnaW5hbENoYXJTZXF1ZW5jZSwgbW9kaWZpZWRDaGFyU2VxdWVuY2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IExpbmVDaGFuZ2Uob3JpZ2luYWxTdGFydExpbmVOdW1iZXIsIG9yaWdpbmFsRW5kTGluZU51bWJlciwgbW9kaWZpZWRTdGFydExpbmVOdW1iZXIsIG1vZGlmaWVkRW5kTGluZU51bWJlciwgY2hhckNoYW5nZXMpO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmVDaGFuZ2U7XG59KCkpO1xudmFyIERpZmZDb21wdXRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWZmQ29tcHV0ZXIob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgb3B0cykge1xuICAgICAgICB0aGlzLnNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcyA9IG9wdHMuc2hvdWxkQ29tcHV0ZUNoYXJDaGFuZ2VzO1xuICAgICAgICB0aGlzLnNob3VsZFBvc3RQcm9jZXNzQ2hhckNoYW5nZXMgPSBvcHRzLnNob3VsZFBvc3RQcm9jZXNzQ2hhckNoYW5nZXM7XG4gICAgICAgIHRoaXMuc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UgPSBvcHRzLnNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlO1xuICAgICAgICB0aGlzLnNob3VsZE1ha2VQcmV0dHlEaWZmID0gb3B0cy5zaG91bGRNYWtlUHJldHR5RGlmZjtcbiAgICAgICAgdGhpcy5tYXhpbXVtUnVuVGltZU1zID0gTUFYSU1VTV9SVU5fVElNRTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbExpbmVzID0gb3JpZ2luYWxMaW5lcztcbiAgICAgICAgdGhpcy5tb2RpZmllZExpbmVzID0gbW9kaWZpZWRMaW5lcztcbiAgICAgICAgdGhpcy5vcmlnaW5hbCA9IG5ldyBMaW5lTWFya2VyU2VxdWVuY2Uob3JpZ2luYWxMaW5lcyk7XG4gICAgICAgIHRoaXMubW9kaWZpZWQgPSBuZXcgTGluZU1hcmtlclNlcXVlbmNlKG1vZGlmaWVkTGluZXMpO1xuICAgIH1cbiAgICBEaWZmQ29tcHV0ZXIucHJvdG90eXBlLmNvbXB1dGVEaWZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vcmlnaW5hbC5nZXRMZW5ndGgoKSA9PT0gMSAmJiB0aGlzLm9yaWdpbmFsLmdldEVsZW1lbnRBdEluZGV4KDApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gZW1wdHkgb3JpZ2luYWwgPT4gZmFzdCBwYXRoXG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRW5kTGluZU51bWJlcjogMSxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydExpbmVOdW1iZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkRW5kTGluZU51bWJlcjogdGhpcy5tb2RpZmllZC5nZXRMZW5ndGgoKSxcbiAgICAgICAgICAgICAgICAgICAgY2hhckNoYW5nZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRFbmRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRFbmRMaW5lTnVtYmVyOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydExpbmVOdW1iZXI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFbmRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFbmRMaW5lTnVtYmVyOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRDb2x1bW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW9kaWZpZWQuZ2V0TGVuZ3RoKCkgPT09IDEgJiYgdGhpcy5tb2RpZmllZC5nZXRFbGVtZW50QXRJbmRleCgwKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIGVtcHR5IG1vZGlmaWVkID0+IGZhc3QgcGF0aFxuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyOiAxLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEVuZExpbmVOdW1iZXI6IHRoaXMub3JpZ2luYWwuZ2V0TGVuZ3RoKCksXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyOiAxLFxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZEVuZExpbmVOdW1iZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIGNoYXJDaGFuZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkRW5kQ29sdW1uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkRW5kTGluZU51bWJlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZFN0YXJ0Q29sdW1uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRMaW5lTnVtYmVyOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRW5kQ29sdW1uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRW5kTGluZU51bWJlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFN0YXJ0Q29sdW1uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcHV0YXRpb25TdGFydFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgcmF3Q2hhbmdlcyA9IGNvbXB1dGVEaWZmKHRoaXMub3JpZ2luYWwsIHRoaXMubW9kaWZpZWQsIHRoaXMuX2NvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZS5iaW5kKHRoaXMpLCB0aGlzLnNob3VsZE1ha2VQcmV0dHlEaWZmKTtcbiAgICAgICAgLy8gVGhlIGRpZmYgaXMgYWx3YXlzIGNvbXB1dGVkIHdpdGggaWdub3JpbmcgdHJpbSB3aGl0ZXNwYWNlXG4gICAgICAgIC8vIFRoaXMgZW5zdXJlcyB3ZSBnZXQgdGhlIHByZXR0aWVzdCBkaWZmXG4gICAgICAgIGlmICh0aGlzLnNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICB2YXIgbGluZUNoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGhfMyA9IHJhd0NoYW5nZXMubGVuZ3RoOyBpIDwgbGVuZ3RoXzM7IGkrKykge1xuICAgICAgICAgICAgICAgIGxpbmVDaGFuZ2VzLnB1c2goTGluZUNoYW5nZS5jcmVhdGVGcm9tRGlmZlJlc3VsdCh0aGlzLnNob3VsZElnbm9yZVRyaW1XaGl0ZXNwYWNlLCByYXdDaGFuZ2VzW2ldLCB0aGlzLm9yaWdpbmFsLCB0aGlzLm1vZGlmaWVkLCB0aGlzLl9jb250aW51ZVByb2Nlc3NpbmdQcmVkaWNhdGUuYmluZCh0aGlzKSwgdGhpcy5zaG91bGRDb21wdXRlQ2hhckNoYW5nZXMsIHRoaXMuc2hvdWxkUG9zdFByb2Nlc3NDaGFyQ2hhbmdlcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbmVDaGFuZ2VzO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5lZWQgdG8gcG9zdC1wcm9jZXNzIGFuZCBpbnRyb2R1Y2UgY2hhbmdlcyB3aGVyZSB0aGUgdHJpbSB3aGl0ZXNwYWNlIGlzIGRpZmZlcmVudFxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgYXJlIGxvb3Bpbmcgc3RhcnRpbmcgYXQgLTEgdG8gYWxzbyBjb3ZlciB0aGUgbGluZXMgYmVmb3JlIHRoZSBmaXJzdCBjaGFuZ2VcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgb3JpZ2luYWxMaW5lSW5kZXggPSAwO1xuICAgICAgICB2YXIgbW9kaWZpZWRMaW5lSW5kZXggPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gLTEgLyogISEhISAqLywgbGVuID0gcmF3Q2hhbmdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIG5leHRDaGFuZ2UgPSAoaSArIDEgPCBsZW4gPyByYXdDaGFuZ2VzW2kgKyAxXSA6IG51bGwpO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsU3RvcCA9IChuZXh0Q2hhbmdlID8gbmV4dENoYW5nZS5vcmlnaW5hbFN0YXJ0IDogdGhpcy5vcmlnaW5hbExpbmVzLmxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRTdG9wID0gKG5leHRDaGFuZ2UgPyBuZXh0Q2hhbmdlLm1vZGlmaWVkU3RhcnQgOiB0aGlzLm1vZGlmaWVkTGluZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHdoaWxlIChvcmlnaW5hbExpbmVJbmRleCA8IG9yaWdpbmFsU3RvcCAmJiBtb2RpZmllZExpbmVJbmRleCA8IG1vZGlmaWVkU3RvcCkge1xuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbExpbmUgPSB0aGlzLm9yaWdpbmFsTGluZXNbb3JpZ2luYWxMaW5lSW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBtb2RpZmllZExpbmUgPSB0aGlzLm1vZGlmaWVkTGluZXNbbW9kaWZpZWRMaW5lSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbExpbmUgIT09IG1vZGlmaWVkTGluZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGVzZSBsaW5lcyBkaWZmZXIgb25seSBpbiB0cmltIHdoaXRlc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGxlYWRpbmcgd2hpdGVzcGFjZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxTdGFydENvbHVtbiA9IExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0Rmlyc3ROb25CbGFua0NvbHVtbihvcmlnaW5hbExpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGlmaWVkU3RhcnRDb2x1bW4gPSBMaW5lTWFya2VyU2VxdWVuY2UuX2dldEZpcnN0Tm9uQmxhbmtDb2x1bW4obW9kaWZpZWRMaW5lLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChvcmlnaW5hbFN0YXJ0Q29sdW1uID4gMSAmJiBtb2RpZmllZFN0YXJ0Q29sdW1uID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbENoYXIgPSBvcmlnaW5hbExpbmUuY2hhckNvZGVBdChvcmlnaW5hbFN0YXJ0Q29sdW1uIC0gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGlmaWVkQ2hhciA9IG1vZGlmaWVkTGluZS5jaGFyQ29kZUF0KG1vZGlmaWVkU3RhcnRDb2x1bW4gLSAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxDaGFyICE9PSBtb2RpZmllZENoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RhcnRDb2x1bW4tLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZFN0YXJ0Q29sdW1uLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTdGFydENvbHVtbiA+IDEgfHwgbW9kaWZpZWRTdGFydENvbHVtbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdXNoVHJpbVdoaXRlc3BhY2VDaGFyQ2hhbmdlKHJlc3VsdCwgb3JpZ2luYWxMaW5lSW5kZXggKyAxLCAxLCBvcmlnaW5hbFN0YXJ0Q29sdW1uLCBtb2RpZmllZExpbmVJbmRleCArIDEsIDEsIG1vZGlmaWVkU3RhcnRDb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoZSB0cmFpbGluZyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbEVuZENvbHVtbiA9IExpbmVNYXJrZXJTZXF1ZW5jZS5fZ2V0TGFzdE5vbkJsYW5rQ29sdW1uKG9yaWdpbmFsTGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kaWZpZWRFbmRDb2x1bW4gPSBMaW5lTWFya2VyU2VxdWVuY2UuX2dldExhc3ROb25CbGFua0NvbHVtbihtb2RpZmllZExpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsTWF4Q29sdW1uID0gb3JpZ2luYWxMaW5lLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kaWZpZWRNYXhDb2x1bW4gPSBtb2RpZmllZExpbmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChvcmlnaW5hbEVuZENvbHVtbiA8IG9yaWdpbmFsTWF4Q29sdW1uICYmIG1vZGlmaWVkRW5kQ29sdW1uIDwgbW9kaWZpZWRNYXhDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxDaGFyID0gb3JpZ2luYWxMaW5lLmNoYXJDb2RlQXQob3JpZ2luYWxFbmRDb2x1bW4gLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kaWZpZWRDaGFyID0gb3JpZ2luYWxMaW5lLmNoYXJDb2RlQXQobW9kaWZpZWRFbmRDb2x1bW4gLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxDaGFyICE9PSBtb2RpZmllZENoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRW5kQ29sdW1uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRFbmRDb2x1bW4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEVuZENvbHVtbiA8IG9yaWdpbmFsTWF4Q29sdW1uIHx8IG1vZGlmaWVkRW5kQ29sdW1uIDwgbW9kaWZpZWRNYXhDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdXNoVHJpbVdoaXRlc3BhY2VDaGFyQ2hhbmdlKHJlc3VsdCwgb3JpZ2luYWxMaW5lSW5kZXggKyAxLCBvcmlnaW5hbEVuZENvbHVtbiwgb3JpZ2luYWxNYXhDb2x1bW4sIG1vZGlmaWVkTGluZUluZGV4ICsgMSwgbW9kaWZpZWRFbmRDb2x1bW4sIG1vZGlmaWVkTWF4Q29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcmlnaW5hbExpbmVJbmRleCsrO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkTGluZUluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dENoYW5nZSkge1xuICAgICAgICAgICAgICAgIC8vIEVtaXQgdGhlIGFjdHVhbCBjaGFuZ2VcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChMaW5lQ2hhbmdlLmNyZWF0ZUZyb21EaWZmUmVzdWx0KHRoaXMuc2hvdWxkSWdub3JlVHJpbVdoaXRlc3BhY2UsIG5leHRDaGFuZ2UsIHRoaXMub3JpZ2luYWwsIHRoaXMubW9kaWZpZWQsIHRoaXMuX2NvbnRpbnVlUHJvY2Vzc2luZ1ByZWRpY2F0ZS5iaW5kKHRoaXMpLCB0aGlzLnNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcywgdGhpcy5zaG91bGRQb3N0UHJvY2Vzc0NoYXJDaGFuZ2VzKSk7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxMaW5lSW5kZXggKz0gbmV4dENoYW5nZS5vcmlnaW5hbExlbmd0aDtcbiAgICAgICAgICAgICAgICBtb2RpZmllZExpbmVJbmRleCArPSBuZXh0Q2hhbmdlLm1vZGlmaWVkTGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEaWZmQ29tcHV0ZXIucHJvdG90eXBlLl9wdXNoVHJpbVdoaXRlc3BhY2VDaGFyQ2hhbmdlID0gZnVuY3Rpb24gKHJlc3VsdCwgb3JpZ2luYWxMaW5lTnVtYmVyLCBvcmlnaW5hbFN0YXJ0Q29sdW1uLCBvcmlnaW5hbEVuZENvbHVtbiwgbW9kaWZpZWRMaW5lTnVtYmVyLCBtb2RpZmllZFN0YXJ0Q29sdW1uLCBtb2RpZmllZEVuZENvbHVtbikge1xuICAgICAgICBpZiAodGhpcy5fbWVyZ2VUcmltV2hpdGVzcGFjZUNoYXJDaGFuZ2UocmVzdWx0LCBvcmlnaW5hbExpbmVOdW1iZXIsIG9yaWdpbmFsU3RhcnRDb2x1bW4sIG9yaWdpbmFsRW5kQ29sdW1uLCBtb2RpZmllZExpbmVOdW1iZXIsIG1vZGlmaWVkU3RhcnRDb2x1bW4sIG1vZGlmaWVkRW5kQ29sdW1uKSkge1xuICAgICAgICAgICAgLy8gTWVyZ2VkIGludG8gcHJldmlvdXNcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hhckNoYW5nZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcykge1xuICAgICAgICAgICAgY2hhckNoYW5nZXMgPSBbbmV3IENoYXJDaGFuZ2Uob3JpZ2luYWxMaW5lTnVtYmVyLCBvcmlnaW5hbFN0YXJ0Q29sdW1uLCBvcmlnaW5hbExpbmVOdW1iZXIsIG9yaWdpbmFsRW5kQ29sdW1uLCBtb2RpZmllZExpbmVOdW1iZXIsIG1vZGlmaWVkU3RhcnRDb2x1bW4sIG1vZGlmaWVkTGluZU51bWJlciwgbW9kaWZpZWRFbmRDb2x1bW4pXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChuZXcgTGluZUNoYW5nZShvcmlnaW5hbExpbmVOdW1iZXIsIG9yaWdpbmFsTGluZU51bWJlciwgbW9kaWZpZWRMaW5lTnVtYmVyLCBtb2RpZmllZExpbmVOdW1iZXIsIGNoYXJDaGFuZ2VzKSk7XG4gICAgfTtcbiAgICBEaWZmQ29tcHV0ZXIucHJvdG90eXBlLl9tZXJnZVRyaW1XaGl0ZXNwYWNlQ2hhckNoYW5nZSA9IGZ1bmN0aW9uIChyZXN1bHQsIG9yaWdpbmFsTGluZU51bWJlciwgb3JpZ2luYWxTdGFydENvbHVtbiwgb3JpZ2luYWxFbmRDb2x1bW4sIG1vZGlmaWVkTGluZU51bWJlciwgbW9kaWZpZWRTdGFydENvbHVtbiwgbW9kaWZpZWRFbmRDb2x1bW4pIHtcbiAgICAgICAgdmFyIGxlbiA9IHJlc3VsdC5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldkNoYW5nZSA9IHJlc3VsdFtsZW4gLSAxXTtcbiAgICAgICAgaWYgKHByZXZDaGFuZ2Uub3JpZ2luYWxFbmRMaW5lTnVtYmVyID09PSAwIHx8IHByZXZDaGFuZ2UubW9kaWZpZWRFbmRMaW5lTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICAvLyBEb24ndCBtZXJnZSB3aXRoIGluc2VydHMvZGVsZXRlc1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2Q2hhbmdlLm9yaWdpbmFsRW5kTGluZU51bWJlciArIDEgPT09IG9yaWdpbmFsTGluZU51bWJlciAmJiBwcmV2Q2hhbmdlLm1vZGlmaWVkRW5kTGluZU51bWJlciArIDEgPT09IG1vZGlmaWVkTGluZU51bWJlcikge1xuICAgICAgICAgICAgcHJldkNoYW5nZS5vcmlnaW5hbEVuZExpbmVOdW1iZXIgPSBvcmlnaW5hbExpbmVOdW1iZXI7XG4gICAgICAgICAgICBwcmV2Q2hhbmdlLm1vZGlmaWVkRW5kTGluZU51bWJlciA9IG1vZGlmaWVkTGluZU51bWJlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZENvbXB1dGVDaGFyQ2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHByZXZDaGFuZ2UuY2hhckNoYW5nZXMucHVzaChuZXcgQ2hhckNoYW5nZShvcmlnaW5hbExpbmVOdW1iZXIsIG9yaWdpbmFsU3RhcnRDb2x1bW4sIG9yaWdpbmFsTGluZU51bWJlciwgb3JpZ2luYWxFbmRDb2x1bW4sIG1vZGlmaWVkTGluZU51bWJlciwgbW9kaWZpZWRTdGFydENvbHVtbiwgbW9kaWZpZWRMaW5lTnVtYmVyLCBtb2RpZmllZEVuZENvbHVtbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgRGlmZkNvbXB1dGVyLnByb3RvdHlwZS5fY29udGludWVQcm9jZXNzaW5nUHJlZGljYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5tYXhpbXVtUnVuVGltZU1zID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm93ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIG5vdyAtIHRoaXMuY29tcHV0YXRpb25TdGFydFRpbWUgPCB0aGlzLm1heGltdW1SdW5UaW1lTXM7XG4gICAgfTtcbiAgICByZXR1cm4gRGlmZkNvbXB1dGVyO1xufSgpKTtcbmV4cG9ydCB7IERpZmZDb21wdXRlciB9O1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4uL2NvcmUvcG9zaXRpb24uanMnO1xuaW1wb3J0IHsgUHJlZml4U3VtQ29tcHV0ZXIgfSBmcm9tICcuLi92aWV3TW9kZWwvcHJlZml4U3VtQ29tcHV0ZXIuanMnO1xudmFyIE1pcnJvclRleHRNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNaXJyb3JUZXh0TW9kZWwodXJpLCBsaW5lcywgZW9sLCB2ZXJzaW9uSWQpIHtcbiAgICAgICAgdGhpcy5fdXJpID0gdXJpO1xuICAgICAgICB0aGlzLl9saW5lcyA9IGxpbmVzO1xuICAgICAgICB0aGlzLl9lb2wgPSBlb2w7XG4gICAgICAgIHRoaXMuX3ZlcnNpb25JZCA9IHZlcnNpb25JZDtcbiAgICAgICAgdGhpcy5fbGluZVN0YXJ0cyA9IG51bGw7XG4gICAgfVxuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbGluZXMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzLmpvaW4odGhpcy5fZW9sKTtcbiAgICB9O1xuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUub25FdmVudHMgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5lb2wgJiYgZS5lb2wgIT09IHRoaXMuX2VvbCkge1xuICAgICAgICAgICAgdGhpcy5fZW9sID0gZS5lb2w7XG4gICAgICAgICAgICB0aGlzLl9saW5lU3RhcnRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBVcGRhdGUgbXkgbGluZXNcbiAgICAgICAgdmFyIGNoYW5nZXMgPSBlLmNoYW5nZXM7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgY2hhbmdlc18xID0gY2hhbmdlczsgX2kgPCBjaGFuZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gY2hhbmdlc18xW19pXTtcbiAgICAgICAgICAgIHRoaXMuX2FjY2VwdERlbGV0ZVJhbmdlKGNoYW5nZS5yYW5nZSk7XG4gICAgICAgICAgICB0aGlzLl9hY2NlcHRJbnNlcnRUZXh0KG5ldyBQb3NpdGlvbihjaGFuZ2UucmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLCBjaGFuZ2UucmFuZ2Uuc3RhcnRDb2x1bW4pLCBjaGFuZ2UudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmVyc2lvbklkID0gZS52ZXJzaW9uSWQ7XG4gICAgfTtcbiAgICBNaXJyb3JUZXh0TW9kZWwucHJvdG90eXBlLl9lbnN1cmVMaW5lU3RhcnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xpbmVTdGFydHMpIHtcbiAgICAgICAgICAgIHZhciBlb2xMZW5ndGggPSB0aGlzLl9lb2wubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGxpbmVzTGVuZ3RoID0gdGhpcy5fbGluZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGxpbmVTdGFydFZhbHVlcyA9IG5ldyBVaW50MzJBcnJheShsaW5lc0xlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsaW5lU3RhcnRWYWx1ZXNbaV0gPSB0aGlzLl9saW5lc1tpXS5sZW5ndGggKyBlb2xMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saW5lU3RhcnRzID0gbmV3IFByZWZpeFN1bUNvbXB1dGVyKGxpbmVTdGFydFZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFsbCBjaGFuZ2VzIHRvIGEgbGluZSdzIHRleHQgZ28gdGhyb3VnaCB0aGlzIG1ldGhvZFxuICAgICAqL1xuICAgIE1pcnJvclRleHRNb2RlbC5wcm90b3R5cGUuX3NldExpbmVUZXh0ID0gZnVuY3Rpb24gKGxpbmVJbmRleCwgbmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGluZXNbbGluZUluZGV4XSA9IG5ld1ZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fbGluZVN0YXJ0cykge1xuICAgICAgICAgICAgLy8gdXBkYXRlIHByZWZpeCBzdW1cbiAgICAgICAgICAgIHRoaXMuX2xpbmVTdGFydHMuY2hhbmdlVmFsdWUobGluZUluZGV4LCB0aGlzLl9saW5lc1tsaW5lSW5kZXhdLmxlbmd0aCArIHRoaXMuX2VvbC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNaXJyb3JUZXh0TW9kZWwucHJvdG90eXBlLl9hY2NlcHREZWxldGVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICBpZiAocmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID09PSByYW5nZS5lbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRDb2x1bW4gPT09IHJhbmdlLmVuZENvbHVtbikge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcgdG8gZGVsZXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGVsZXRlIHRleHQgb24gdGhlIGFmZmVjdGVkIGxpbmVcbiAgICAgICAgICAgIHRoaXMuX3NldExpbmVUZXh0KHJhbmdlLnN0YXJ0TGluZU51bWJlciAtIDEsIHRoaXMuX2xpbmVzW3JhbmdlLnN0YXJ0TGluZU51bWJlciAtIDFdLnN1YnN0cmluZygwLCByYW5nZS5zdGFydENvbHVtbiAtIDEpXG4gICAgICAgICAgICAgICAgKyB0aGlzLl9saW5lc1tyYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcocmFuZ2UuZW5kQ29sdW1uIC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRha2UgcmVtYWluaW5nIHRleHQgb24gbGFzdCBsaW5lIGFuZCBhcHBlbmQgaXQgdG8gcmVtYWluaW5nIHRleHQgb24gZmlyc3QgbGluZVxuICAgICAgICB0aGlzLl9zZXRMaW5lVGV4dChyYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxLCB0aGlzLl9saW5lc1tyYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcoMCwgcmFuZ2Uuc3RhcnRDb2x1bW4gLSAxKVxuICAgICAgICAgICAgKyB0aGlzLl9saW5lc1tyYW5nZS5lbmRMaW5lTnVtYmVyIC0gMV0uc3Vic3RyaW5nKHJhbmdlLmVuZENvbHVtbiAtIDEpKTtcbiAgICAgICAgLy8gRGVsZXRlIG1pZGRsZSBsaW5lc1xuICAgICAgICB0aGlzLl9saW5lcy5zcGxpY2UocmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLCByYW5nZS5lbmRMaW5lTnVtYmVyIC0gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2xpbmVTdGFydHMpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBwcmVmaXggc3VtXG4gICAgICAgICAgICB0aGlzLl9saW5lU3RhcnRzLnJlbW92ZVZhbHVlcyhyYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLmVuZExpbmVOdW1iZXIgLSByYW5nZS5zdGFydExpbmVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNaXJyb3JUZXh0TW9kZWwucHJvdG90eXBlLl9hY2NlcHRJbnNlcnRUZXh0ID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBpbnNlcnRUZXh0KSB7XG4gICAgICAgIGlmIChpbnNlcnRUZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gTm90aGluZyB0byBpbnNlcnRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5zZXJ0TGluZXMgPSBpbnNlcnRUZXh0LnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pO1xuICAgICAgICBpZiAoaW5zZXJ0TGluZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnRpbmcgdGV4dCBvbiBvbmUgbGluZVxuICAgICAgICAgICAgdGhpcy5fc2V0TGluZVRleHQocG9zaXRpb24ubGluZU51bWJlciAtIDEsIHRoaXMuX2xpbmVzW3Bvc2l0aW9uLmxpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcoMCwgcG9zaXRpb24uY29sdW1uIC0gMSlcbiAgICAgICAgICAgICAgICArIGluc2VydExpbmVzWzBdXG4gICAgICAgICAgICAgICAgKyB0aGlzLl9saW5lc1twb3NpdGlvbi5saW5lTnVtYmVyIC0gMV0uc3Vic3RyaW5nKHBvc2l0aW9uLmNvbHVtbiAtIDEpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcHBlbmQgb3ZlcmZsb3dpbmcgdGV4dCBmcm9tIGZpcnN0IGxpbmUgdG8gdGhlIGVuZCBvZiB0ZXh0IHRvIGluc2VydFxuICAgICAgICBpbnNlcnRMaW5lc1tpbnNlcnRMaW5lcy5sZW5ndGggLSAxXSArPSB0aGlzLl9saW5lc1twb3NpdGlvbi5saW5lTnVtYmVyIC0gMV0uc3Vic3RyaW5nKHBvc2l0aW9uLmNvbHVtbiAtIDEpO1xuICAgICAgICAvLyBEZWxldGUgb3ZlcmZsb3dpbmcgdGV4dCBmcm9tIGZpcnN0IGxpbmUgYW5kIGluc2VydCB0ZXh0IG9uIGZpcnN0IGxpbmVcbiAgICAgICAgdGhpcy5fc2V0TGluZVRleHQocG9zaXRpb24ubGluZU51bWJlciAtIDEsIHRoaXMuX2xpbmVzW3Bvc2l0aW9uLmxpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcoMCwgcG9zaXRpb24uY29sdW1uIC0gMSlcbiAgICAgICAgICAgICsgaW5zZXJ0TGluZXNbMF0pO1xuICAgICAgICAvLyBJbnNlcnQgbmV3IGxpbmVzICYgc3RvcmUgbGVuZ3Roc1xuICAgICAgICB2YXIgbmV3TGVuZ3RocyA9IG5ldyBVaW50MzJBcnJheShpbnNlcnRMaW5lcy5sZW5ndGggLSAxKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbnNlcnRMaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbGluZXMuc3BsaWNlKHBvc2l0aW9uLmxpbmVOdW1iZXIgKyBpIC0gMSwgMCwgaW5zZXJ0TGluZXNbaV0pO1xuICAgICAgICAgICAgbmV3TGVuZ3Roc1tpIC0gMV0gPSBpbnNlcnRMaW5lc1tpXS5sZW5ndGggKyB0aGlzLl9lb2wubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9saW5lU3RhcnRzKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgcHJlZml4IHN1bVxuICAgICAgICAgICAgdGhpcy5fbGluZVN0YXJ0cy5pbnNlcnRWYWx1ZXMocG9zaXRpb24ubGluZU51bWJlciwgbmV3TGVuZ3Rocyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNaXJyb3JUZXh0TW9kZWw7XG59KCkpO1xuZXhwb3J0IHsgTWlycm9yVGV4dE1vZGVsIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCB2YXIgVVNVQUxfV09SRF9TRVBBUkFUT1JTID0gJ2B+IUAjJCVeJiooKS09K1t7XX1cXFxcfDs6XFwnXCIsLjw+Lz8nO1xuLyoqXG4gKiBDcmVhdGUgYSB3b3JkIGRlZmluaXRpb24gcmVndWxhciBleHByZXNzaW9uIGJhc2VkIG9uIGRlZmF1bHQgd29yZCBzZXBhcmF0b3JzLlxuICogT3B0aW9uYWxseSBwcm92aWRlIGFsbG93ZWQgc2VwYXJhdG9ycyB0aGF0IHNob3VsZCBiZSBpbmNsdWRlZCBpbiB3b3Jkcy5cbiAqXG4gKiBUaGUgZGVmYXVsdCB3b3VsZCBsb29rIGxpa2UgdGhpczpcbiAqIC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxgXFx+XFwhXFxAXFwjXFwkXFwlXFxeXFwmXFwqXFwoXFwpXFwtXFw9XFwrXFxbXFx7XFxdXFx9XFxcXFxcfFxcO1xcOlxcJ1xcXCJcXCxcXC5cXDxcXD5cXC9cXD9cXHNdKykvZ1xuICovXG5mdW5jdGlvbiBjcmVhdGVXb3JkUmVnRXhwKGFsbG93SW5Xb3Jkcykge1xuICAgIGlmIChhbGxvd0luV29yZHMgPT09IHZvaWQgMCkgeyBhbGxvd0luV29yZHMgPSAnJzsgfVxuICAgIHZhciBzb3VyY2UgPSAnKC0/XFxcXGQqXFxcXC5cXFxcZFxcXFx3Kil8KFteJztcbiAgICBmb3IgKHZhciBfaSA9IDAsIFVTVUFMX1dPUkRfU0VQQVJBVE9SU18xID0gVVNVQUxfV09SRF9TRVBBUkFUT1JTOyBfaSA8IFVTVUFMX1dPUkRfU0VQQVJBVE9SU18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgc2VwID0gVVNVQUxfV09SRF9TRVBBUkFUT1JTXzFbX2ldO1xuICAgICAgICBpZiAoYWxsb3dJbldvcmRzLmluZGV4T2Yoc2VwKSA+PSAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2UgKz0gJ1xcXFwnICsgc2VwO1xuICAgIH1cbiAgICBzb3VyY2UgKz0gJ1xcXFxzXSspJztcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzb3VyY2UsICdnJyk7XG59XG4vLyBjYXRjaGVzIG51bWJlcnMgKGluY2x1ZGluZyBmbG9hdGluZyBudW1iZXJzKSBpbiB0aGUgZmlyc3QgZ3JvdXAsIGFuZCBhbHBoYW51bSBpbiB0aGUgc2Vjb25kXG5leHBvcnQgdmFyIERFRkFVTFRfV09SRF9SRUdFWFAgPSBjcmVhdGVXb3JkUmVnRXhwKCk7XG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlVmFsaWRXb3JkRGVmaW5pdGlvbih3b3JkRGVmaW5pdGlvbikge1xuICAgIHZhciByZXN1bHQgPSBERUZBVUxUX1dPUkRfUkVHRVhQO1xuICAgIGlmICh3b3JkRGVmaW5pdGlvbiAmJiAod29yZERlZmluaXRpb24gaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgIGlmICghd29yZERlZmluaXRpb24uZ2xvYmFsKSB7XG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSAnZyc7XG4gICAgICAgICAgICBpZiAod29yZERlZmluaXRpb24uaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgICAgIGZsYWdzICs9ICdpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3b3JkRGVmaW5pdGlvbi5tdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICBmbGFncyArPSAnbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod29yZERlZmluaXRpb24udW5pY29kZSkge1xuICAgICAgICAgICAgICAgIGZsYWdzICs9ICd1JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBSZWdFeHAod29yZERlZmluaXRpb24uc291cmNlLCBmbGFncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB3b3JkRGVmaW5pdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0V29yZEF0UG9zRmFzdChjb2x1bW4sIHdvcmREZWZpbml0aW9uLCB0ZXh0LCB0ZXh0T2Zmc2V0KSB7XG4gICAgLy8gZmluZCB3aGl0ZXNwYWNlIGVuY2xvc2VkIHRleHQgYXJvdW5kIGNvbHVtbiBhbmQgbWF0Y2ggZnJvbSB0aGVyZVxuICAgIHZhciBwb3MgPSBjb2x1bW4gLSAxIC0gdGV4dE9mZnNldDtcbiAgICB2YXIgc3RhcnQgPSB0ZXh0Lmxhc3RJbmRleE9mKCcgJywgcG9zIC0gMSkgKyAxO1xuICAgIHdvcmREZWZpbml0aW9uLmxhc3RJbmRleCA9IHN0YXJ0O1xuICAgIHZhciBtYXRjaDtcbiAgICB3aGlsZSAobWF0Y2ggPSB3b3JkRGVmaW5pdGlvbi5leGVjKHRleHQpKSB7XG4gICAgICAgIHZhciBtYXRjaEluZGV4ID0gbWF0Y2guaW5kZXggfHwgMDtcbiAgICAgICAgaWYgKG1hdGNoSW5kZXggPD0gcG9zICYmIHdvcmREZWZpbml0aW9uLmxhc3RJbmRleCA+PSBwb3MpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd29yZDogbWF0Y2hbMF0sXG4gICAgICAgICAgICAgICAgc3RhcnRDb2x1bW46IHRleHRPZmZzZXQgKyAxICsgbWF0Y2hJbmRleCxcbiAgICAgICAgICAgICAgICBlbmRDb2x1bW46IHRleHRPZmZzZXQgKyAxICsgd29yZERlZmluaXRpb24ubGFzdEluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0V29yZEF0UG9zU2xvdyhjb2x1bW4sIHdvcmREZWZpbml0aW9uLCB0ZXh0LCB0ZXh0T2Zmc2V0KSB7XG4gICAgLy8gbWF0Y2hlcyBhbGwgd29yZHMgc3RhcnRpbmcgYXQgdGhlIGJlZ2lubmluZ1xuICAgIC8vIG9mIHRoZSBpbnB1dCB1bnRpbCBpdCBmaW5kcyBhIG1hdGNoIHRoYXQgZW5jbG9zZXNcbiAgICAvLyB0aGUgZGVzaXJlZCBjb2x1bW4uIHNsb3cgYnV0IGNvcnJlY3RcbiAgICB2YXIgcG9zID0gY29sdW1uIC0gMSAtIHRleHRPZmZzZXQ7XG4gICAgd29yZERlZmluaXRpb24ubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbWF0Y2g7XG4gICAgd2hpbGUgKG1hdGNoID0gd29yZERlZmluaXRpb24uZXhlYyh0ZXh0KSkge1xuICAgICAgICB2YXIgbWF0Y2hJbmRleCA9IG1hdGNoLmluZGV4IHx8IDA7XG4gICAgICAgIGlmIChtYXRjaEluZGV4ID4gcG9zKSB7XG4gICAgICAgICAgICAvLyB8blcgLT4gbWF0Y2hlZCBvbmx5IGFmdGVyIHRoZSBwb3NcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdvcmREZWZpbml0aW9uLmxhc3RJbmRleCA+PSBwb3MpIHtcbiAgICAgICAgICAgIC8vIFd8VyAtPiBtYXRjaCBlbmNsb3NlcyBwb3NcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd29yZDogbWF0Y2hbMF0sXG4gICAgICAgICAgICAgICAgc3RhcnRDb2x1bW46IHRleHRPZmZzZXQgKyAxICsgbWF0Y2hJbmRleCxcbiAgICAgICAgICAgICAgICBlbmRDb2x1bW46IHRleHRPZmZzZXQgKyAxICsgd29yZERlZmluaXRpb24ubGFzdEluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmRBdFRleHQoY29sdW1uLCB3b3JkRGVmaW5pdGlvbiwgdGV4dCwgdGV4dE9mZnNldCkge1xuICAgIC8vIGlmIGB3b3Jkc2AgY2FuIGNvbnRhaW4gd2hpdGVzcGFjZSBjaGFyYWN0ZXIgd2UgaGF2ZSB0byB1c2UgdGhlIHNsb3cgdmFyaWFudFxuICAgIC8vIG90aGVyd2lzZSB3ZSB1c2UgdGhlIGZhc3QgdmFyaWFudCBvZiBmaW5kaW5nIGEgd29yZFxuICAgIHdvcmREZWZpbml0aW9uLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG1hdGNoID0gd29yZERlZmluaXRpb24uZXhlYyh0ZXh0KTtcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyB0b2RvQGpvaCB0aGUgYG1hdGNoYCBjb3VsZCBhbHJlYWR5IGJlIHRoZSAoZmlyc3QpIHdvcmRcbiAgICB2YXIgcmV0ID0gbWF0Y2hbMF0uaW5kZXhPZignICcpID49IDBcbiAgICAgICAgLy8gZGlkIG1hdGNoIGEgd29yZCB3aGljaCBjb250YWlucyBhIHNwYWNlIGNoYXJhY3RlciAtPiB1c2Ugc2xvdyB3b3JkIGZpbmRcbiAgICAgICAgPyBnZXRXb3JkQXRQb3NTbG93KGNvbHVtbiwgd29yZERlZmluaXRpb24sIHRleHQsIHRleHRPZmZzZXQpXG4gICAgICAgIC8vIHNhbmUgd29yZCBkZWZpbml0aW9uIC0+IHVzZSBmYXN0IHdvcmQgZmluZFxuICAgICAgICA6IGdldFdvcmRBdFBvc0Zhc3QoY29sdW1uLCB3b3JkRGVmaW5pdGlvbiwgdGV4dCwgdGV4dE9mZnNldCk7XG4gICAgLy8gYm90aCAoZ2V0V29yZEF0UG9zRmFzdCBhbmQgZ2V0V29yZEF0UG9zU2xvdykgbGVhdmUgdGhlIHdvcmREZWZpbml0aW9uLVJlZ0V4cFxuICAgIC8vIGluIGFuIHVuZGVmaW5lZCBzdGF0ZSBhbmQgdG8gbm90IGNvbmZ1c2Ugb3RoZXIgdXNlcnMgb2YgdGhlIHdvcmREZWZpbml0aW9uXG4gICAgLy8gd2UgcmVzZXQgdGhlIGxhc3RJbmRleFxuICAgIHdvcmREZWZpbml0aW9uLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIHJldDtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ2hhcmFjdGVyQ2xhc3NpZmllciB9IGZyb20gJy4uL2NvcmUvY2hhcmFjdGVyQ2xhc3NpZmllci5qcyc7XG5pbXBvcnQgeyBVaW50OE1hdHJpeCB9IGZyb20gJy4uL2NvcmUvdWludC5qcyc7XG52YXIgU3RhdGVNYWNoaW5lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0YXRlTWFjaGluZShlZGdlcykge1xuICAgICAgICB2YXIgbWF4Q2hhckNvZGUgPSAwO1xuICAgICAgICB2YXIgbWF4U3RhdGUgPSAwIC8qIEludmFsaWQgKi87XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBlZGdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIF9hID0gZWRnZXNbaV0sIGZyb20gPSBfYVswXSwgY2hDb2RlID0gX2FbMV0sIHRvID0gX2FbMl07XG4gICAgICAgICAgICBpZiAoY2hDb2RlID4gbWF4Q2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICBtYXhDaGFyQ29kZSA9IGNoQ29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmcm9tID4gbWF4U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBtYXhTdGF0ZSA9IGZyb207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG8gPiBtYXhTdGF0ZSkge1xuICAgICAgICAgICAgICAgIG1heFN0YXRlID0gdG87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWF4Q2hhckNvZGUrKztcbiAgICAgICAgbWF4U3RhdGUrKztcbiAgICAgICAgdmFyIHN0YXRlcyA9IG5ldyBVaW50OE1hdHJpeChtYXhTdGF0ZSwgbWF4Q2hhckNvZGUsIDAgLyogSW52YWxpZCAqLyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBlZGdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIF9iID0gZWRnZXNbaV0sIGZyb20gPSBfYlswXSwgY2hDb2RlID0gX2JbMV0sIHRvID0gX2JbMl07XG4gICAgICAgICAgICBzdGF0ZXMuc2V0KGZyb20sIGNoQ29kZSwgdG8pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IHN0YXRlcztcbiAgICAgICAgdGhpcy5fbWF4Q2hhckNvZGUgPSBtYXhDaGFyQ29kZTtcbiAgICB9XG4gICAgU3RhdGVNYWNoaW5lLnByb3RvdHlwZS5uZXh0U3RhdGUgPSBmdW5jdGlvbiAoY3VycmVudFN0YXRlLCBjaENvZGUpIHtcbiAgICAgICAgaWYgKGNoQ29kZSA8IDAgfHwgY2hDb2RlID49IHRoaXMuX21heENoYXJDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gMCAvKiBJbnZhbGlkICovO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZXMuZ2V0KGN1cnJlbnRTdGF0ZSwgY2hDb2RlKTtcbiAgICB9O1xuICAgIHJldHVybiBTdGF0ZU1hY2hpbmU7XG59KCkpO1xuZXhwb3J0IHsgU3RhdGVNYWNoaW5lIH07XG4vLyBTdGF0ZSBtYWNoaW5lIGZvciBodHRwOi8vIG9yIGh0dHBzOi8vIG9yIGZpbGU6Ly9cbnZhciBfc3RhdGVNYWNoaW5lID0gbnVsbDtcbmZ1bmN0aW9uIGdldFN0YXRlTWFjaGluZSgpIHtcbiAgICBpZiAoX3N0YXRlTWFjaGluZSA9PT0gbnVsbCkge1xuICAgICAgICBfc3RhdGVNYWNoaW5lID0gbmV3IFN0YXRlTWFjaGluZShbXG4gICAgICAgICAgICBbMSAvKiBTdGFydCAqLywgMTA0IC8qIGggKi8sIDIgLyogSCAqL10sXG4gICAgICAgICAgICBbMSAvKiBTdGFydCAqLywgNzIgLyogSCAqLywgMiAvKiBIICovXSxcbiAgICAgICAgICAgIFsxIC8qIFN0YXJ0ICovLCAxMDIgLyogZiAqLywgNiAvKiBGICovXSxcbiAgICAgICAgICAgIFsxIC8qIFN0YXJ0ICovLCA3MCAvKiBGICovLCA2IC8qIEYgKi9dLFxuICAgICAgICAgICAgWzIgLyogSCAqLywgMTE2IC8qIHQgKi8sIDMgLyogSFQgKi9dLFxuICAgICAgICAgICAgWzIgLyogSCAqLywgODQgLyogVCAqLywgMyAvKiBIVCAqL10sXG4gICAgICAgICAgICBbMyAvKiBIVCAqLywgMTE2IC8qIHQgKi8sIDQgLyogSFRUICovXSxcbiAgICAgICAgICAgIFszIC8qIEhUICovLCA4NCAvKiBUICovLCA0IC8qIEhUVCAqL10sXG4gICAgICAgICAgICBbNCAvKiBIVFQgKi8sIDExMiAvKiBwICovLCA1IC8qIEhUVFAgKi9dLFxuICAgICAgICAgICAgWzQgLyogSFRUICovLCA4MCAvKiBQICovLCA1IC8qIEhUVFAgKi9dLFxuICAgICAgICAgICAgWzUgLyogSFRUUCAqLywgMTE1IC8qIHMgKi8sIDkgLyogQmVmb3JlQ29sb24gKi9dLFxuICAgICAgICAgICAgWzUgLyogSFRUUCAqLywgODMgLyogUyAqLywgOSAvKiBCZWZvcmVDb2xvbiAqL10sXG4gICAgICAgICAgICBbNSAvKiBIVFRQICovLCA1OCAvKiBDb2xvbiAqLywgMTAgLyogQWZ0ZXJDb2xvbiAqL10sXG4gICAgICAgICAgICBbNiAvKiBGICovLCAxMDUgLyogaSAqLywgNyAvKiBGSSAqL10sXG4gICAgICAgICAgICBbNiAvKiBGICovLCA3MyAvKiBJICovLCA3IC8qIEZJICovXSxcbiAgICAgICAgICAgIFs3IC8qIEZJICovLCAxMDggLyogbCAqLywgOCAvKiBGSUwgKi9dLFxuICAgICAgICAgICAgWzcgLyogRkkgKi8sIDc2IC8qIEwgKi8sIDggLyogRklMICovXSxcbiAgICAgICAgICAgIFs4IC8qIEZJTCAqLywgMTAxIC8qIGUgKi8sIDkgLyogQmVmb3JlQ29sb24gKi9dLFxuICAgICAgICAgICAgWzggLyogRklMICovLCA2OSAvKiBFICovLCA5IC8qIEJlZm9yZUNvbG9uICovXSxcbiAgICAgICAgICAgIFs5IC8qIEJlZm9yZUNvbG9uICovLCA1OCAvKiBDb2xvbiAqLywgMTAgLyogQWZ0ZXJDb2xvbiAqL10sXG4gICAgICAgICAgICBbMTAgLyogQWZ0ZXJDb2xvbiAqLywgNDcgLyogU2xhc2ggKi8sIDExIC8qIEFsbW9zdFRoZXJlICovXSxcbiAgICAgICAgICAgIFsxMSAvKiBBbG1vc3RUaGVyZSAqLywgNDcgLyogU2xhc2ggKi8sIDEyIC8qIEVuZCAqL10sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICByZXR1cm4gX3N0YXRlTWFjaGluZTtcbn1cbnZhciBfY2xhc3NpZmllciA9IG51bGw7XG5mdW5jdGlvbiBnZXRDbGFzc2lmaWVyKCkge1xuICAgIGlmIChfY2xhc3NpZmllciA9PT0gbnVsbCkge1xuICAgICAgICBfY2xhc3NpZmllciA9IG5ldyBDaGFyYWN0ZXJDbGFzc2lmaWVyKDAgLyogTm9uZSAqLyk7XG4gICAgICAgIHZhciBGT1JDRV9URVJNSU5BVElPTl9DSEFSQUNURVJTID0gJyBcXHQ8PlxcJ1xcXCLjgIHjgILvvaHvvaTvvIzvvI7vvJrvvJvvvJ/vvIHvvKDvvIPvvITvvIXvvIbvvIrigJjigJzjgIjjgIrjgIzjgI7jgJDjgJTvvIjvvLvvvZvvvaLvvaPvvZ3vvL3vvInjgJXjgJHjgI/jgI3jgIvjgInigJ3igJnvvYDvvZ7igKYnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEZPUkNFX1RFUk1JTkFUSU9OX0NIQVJBQ1RFUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIF9jbGFzc2lmaWVyLnNldChGT1JDRV9URVJNSU5BVElPTl9DSEFSQUNURVJTLmNoYXJDb2RlQXQoaSksIDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIENBTk5PVF9FTkRfV0lUSF9DSEFSQUNURVJTID0gJy4sOyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ0FOTk9UX0VORF9XSVRIX0NIQVJBQ1RFUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIF9jbGFzc2lmaWVyLnNldChDQU5OT1RfRU5EX1dJVEhfQ0hBUkFDVEVSUy5jaGFyQ29kZUF0KGkpLCAyIC8qIENhbm5vdEVuZEluICovKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2NsYXNzaWZpZXI7XG59XG52YXIgTGlua0NvbXB1dGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtDb21wdXRlcigpIHtcbiAgICB9XG4gICAgTGlua0NvbXB1dGVyLl9jcmVhdGVMaW5rID0gZnVuY3Rpb24gKGNsYXNzaWZpZXIsIGxpbmUsIGxpbmVOdW1iZXIsIGxpbmtCZWdpbkluZGV4LCBsaW5rRW5kSW5kZXgpIHtcbiAgICAgICAgLy8gRG8gbm90IGFsbG93IHRvIGVuZCBsaW5rIGluIGNlcnRhaW4gY2hhcmFjdGVycy4uLlxuICAgICAgICB2YXIgbGFzdEluY2x1ZGVkQ2hhckluZGV4ID0gbGlua0VuZEluZGV4IC0gMTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmFyIGNoQ29kZSA9IGxpbmUuY2hhckNvZGVBdChsYXN0SW5jbHVkZWRDaGFySW5kZXgpO1xuICAgICAgICAgICAgdmFyIGNoQ2xhc3MgPSBjbGFzc2lmaWVyLmdldChjaENvZGUpO1xuICAgICAgICAgICAgaWYgKGNoQ2xhc3MgIT09IDIgLyogQ2Fubm90RW5kSW4gKi8pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RJbmNsdWRlZENoYXJJbmRleC0tO1xuICAgICAgICB9IHdoaWxlIChsYXN0SW5jbHVkZWRDaGFySW5kZXggPiBsaW5rQmVnaW5JbmRleCk7XG4gICAgICAgIC8vIEhhbmRsZSBsaW5rcyBlbmNsb3NlZCBpbiBwYXJlbnMsIHNxdWFyZSBicmFja2V0cyBhbmQgY3VybHlzLlxuICAgICAgICBpZiAobGlua0JlZ2luSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB2YXIgY2hhckNvZGVCZWZvcmVMaW5rID0gbGluZS5jaGFyQ29kZUF0KGxpbmtCZWdpbkluZGV4IC0gMSk7XG4gICAgICAgICAgICB2YXIgbGFzdENoYXJDb2RlSW5MaW5rID0gbGluZS5jaGFyQ29kZUF0KGxhc3RJbmNsdWRlZENoYXJJbmRleCk7XG4gICAgICAgICAgICBpZiAoKGNoYXJDb2RlQmVmb3JlTGluayA9PT0gNDAgLyogT3BlblBhcmVuICovICYmIGxhc3RDaGFyQ29kZUluTGluayA9PT0gNDEgLyogQ2xvc2VQYXJlbiAqLylcbiAgICAgICAgICAgICAgICB8fCAoY2hhckNvZGVCZWZvcmVMaW5rID09PSA5MSAvKiBPcGVuU3F1YXJlQnJhY2tldCAqLyAmJiBsYXN0Q2hhckNvZGVJbkxpbmsgPT09IDkzIC8qIENsb3NlU3F1YXJlQnJhY2tldCAqLylcbiAgICAgICAgICAgICAgICB8fCAoY2hhckNvZGVCZWZvcmVMaW5rID09PSAxMjMgLyogT3BlbkN1cmx5QnJhY2UgKi8gJiYgbGFzdENoYXJDb2RlSW5MaW5rID09PSAxMjUgLyogQ2xvc2VDdXJseUJyYWNlICovKSkge1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBlbmQgaW4gKSBpZiAoIGlzIGJlZm9yZSB0aGUgbGluayBzdGFydFxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBlbmQgaW4gXSBpZiBbIGlzIGJlZm9yZSB0aGUgbGluayBzdGFydFxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBlbmQgaW4gfSBpZiB7IGlzIGJlZm9yZSB0aGUgbGluayBzdGFydFxuICAgICAgICAgICAgICAgIGxhc3RJbmNsdWRlZENoYXJJbmRleC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIHN0YXJ0TGluZU51bWJlcjogbGluZU51bWJlcixcbiAgICAgICAgICAgICAgICBzdGFydENvbHVtbjogbGlua0JlZ2luSW5kZXggKyAxLFxuICAgICAgICAgICAgICAgIGVuZExpbmVOdW1iZXI6IGxpbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgZW5kQ29sdW1uOiBsYXN0SW5jbHVkZWRDaGFySW5kZXggKyAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXJsOiBsaW5lLnN1YnN0cmluZyhsaW5rQmVnaW5JbmRleCwgbGFzdEluY2x1ZGVkQ2hhckluZGV4ICsgMSlcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIExpbmtDb21wdXRlci5jb21wdXRlTGlua3MgPSBmdW5jdGlvbiAobW9kZWwsIHN0YXRlTWFjaGluZSkge1xuICAgICAgICBpZiAoc3RhdGVNYWNoaW5lID09PSB2b2lkIDApIHsgc3RhdGVNYWNoaW5lID0gZ2V0U3RhdGVNYWNoaW5lKCk7IH1cbiAgICAgICAgdmFyIGNsYXNzaWZpZXIgPSBnZXRDbGFzc2lmaWVyKCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGxpbmVDb3VudCA9IG1vZGVsLmdldExpbmVDb3VudCgpOyBpIDw9IGxpbmVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IG1vZGVsLmdldExpbmVDb250ZW50KGkpO1xuICAgICAgICAgICAgdmFyIGxlbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgdmFyIGxpbmtCZWdpbkluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBsaW5rQmVnaW5DaENvZGUgPSAwO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gMSAvKiBTdGFydCAqLztcbiAgICAgICAgICAgIHZhciBoYXNPcGVuUGFyZW5zID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgaGFzT3BlblNxdWFyZUJyYWNrZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBoYXNPcGVuQ3VybHlCcmFja2V0ID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoaiA8IGxlbikge1xuICAgICAgICAgICAgICAgIHZhciByZXNldFN0YXRlTWFjaGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBjaENvZGUgPSBsaW5lLmNoYXJDb2RlQXQoaik7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMyAvKiBBY2NlcHQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoQ2xhc3MgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwIC8qIE9wZW5QYXJlbiAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNPcGVuUGFyZW5zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gMCAvKiBOb25lICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MSAvKiBDbG9zZVBhcmVuICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAoaGFzT3BlblBhcmVucyA/IDAgLyogTm9uZSAqLyA6IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDkxIC8qIE9wZW5TcXVhcmVCcmFja2V0ICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc09wZW5TcXVhcmVCcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gMCAvKiBOb25lICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5MyAvKiBDbG9zZVNxdWFyZUJyYWNrZXQgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IChoYXNPcGVuU3F1YXJlQnJhY2tldCA/IDAgLyogTm9uZSAqLyA6IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyMyAvKiBPcGVuQ3VybHlCcmFjZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNPcGVuQ3VybHlCcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gMCAvKiBOb25lICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjUgLyogQ2xvc2VDdXJseUJyYWNlICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAoaGFzT3BlbkN1cmx5QnJhY2tldCA/IDAgLyogTm9uZSAqLyA6IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBUaGUgZm9sbG93aW5nIHRocmVlIHJ1bGVzIG1ha2UgaXQgdGhhdCAnIG9yIFwiIG9yIGAgYXJlIGFsbG93ZWQgaW5zaWRlIGxpbmtzIGlmIHRoZSBsaW5rIGJlZ2FuIHdpdGggYSBkaWZmZXJlbnQgb25lICovXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM5IC8qIFNpbmdsZVF1b3RlICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAobGlua0JlZ2luQ2hDb2RlID09PSAzNCAvKiBEb3VibGVRdW90ZSAqLyB8fCBsaW5rQmVnaW5DaENvZGUgPT09IDk2IC8qIEJhY2tUaWNrICovKSA/IDAgLyogTm9uZSAqLyA6IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzQgLyogRG91YmxlUXVvdGUgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hDbGFzcyA9IChsaW5rQmVnaW5DaENvZGUgPT09IDM5IC8qIFNpbmdsZVF1b3RlICovIHx8IGxpbmtCZWdpbkNoQ29kZSA9PT0gOTYgLyogQmFja1RpY2sgKi8pID8gMCAvKiBOb25lICovIDogMSAvKiBGb3JjZVRlcm1pbmF0aW9uICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5NiAvKiBCYWNrVGljayAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gKGxpbmtCZWdpbkNoQ29kZSA9PT0gMzkgLyogU2luZ2xlUXVvdGUgKi8gfHwgbGlua0JlZ2luQ2hDb2RlID09PSAzNCAvKiBEb3VibGVRdW90ZSAqLykgPyAwIC8qIE5vbmUgKi8gOiAxIC8qIEZvcmNlVGVybWluYXRpb24gKi87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSBjbGFzc2lmaWVyLmdldChjaENvZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGNoYXJhY3RlciB0ZXJtaW5hdGVzIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoQ2xhc3MgPT09IDEgLyogRm9yY2VUZXJtaW5hdGlvbiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goTGlua0NvbXB1dGVyLl9jcmVhdGVMaW5rKGNsYXNzaWZpZXIsIGxpbmUsIGksIGxpbmtCZWdpbkluZGV4LCBqKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFN0YXRlTWFjaGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT09IDEyIC8qIEVuZCAqLykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hDbGFzcyA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoQ29kZSA9PT0gOTEgLyogT3BlblNxdWFyZUJyYWNrZXQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbG93IGZvciB0aGUgYXV0aG9yaXR5IHBhcnQgdG8gY29udGFpbiBpcHY2IGFkZHJlc3NlcyB3aGljaCBjb250YWluIFsgYW5kIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc09wZW5TcXVhcmVCcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoQ2xhc3MgPSAwIC8qIE5vbmUgKi87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaENsYXNzID0gY2xhc3NpZmllci5nZXQoY2hDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBjaGFyYWN0ZXIgdGVybWluYXRlcyBsaW5rXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaENsYXNzID09PSAxIC8qIEZvcmNlVGVybWluYXRpb24gKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U3RhdGVNYWNoaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTMgLyogQWNjZXB0ICovO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlTWFjaGluZS5uZXh0U3RhdGUoc3RhdGUsIGNoQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMCAvKiBJbnZhbGlkICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFN0YXRlTWFjaGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc2V0U3RhdGVNYWNoaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMSAvKiBTdGFydCAqLztcbiAgICAgICAgICAgICAgICAgICAgaGFzT3BlblBhcmVucyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBoYXNPcGVuU3F1YXJlQnJhY2tldCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBoYXNPcGVuQ3VybHlCcmFja2V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY29yZCB3aGVyZSB0aGUgbGluayBzdGFydGVkXG4gICAgICAgICAgICAgICAgICAgIGxpbmtCZWdpbkluZGV4ID0gaiArIDE7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtCZWdpbkNoQ29kZSA9IGNoQ29kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMyAvKiBBY2NlcHQgKi8pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChMaW5rQ29tcHV0ZXIuX2NyZWF0ZUxpbmsoY2xhc3NpZmllciwgbGluZSwgaSwgbGlua0JlZ2luSW5kZXgsIGxlbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gTGlua0NvbXB1dGVyO1xufSgpKTtcbmV4cG9ydCB7IExpbmtDb21wdXRlciB9O1xuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBsaW5rcyBjb250YWlucyBpbiB0aGUgcHJvdmlkZWRcbiAqIGRvY3VtZW50LiAqTm90ZSogdGhhdCB0aGlzIG9wZXJhdGlvbiBpcyBjb21wdXRhdGlvbmFsXG4gKiBleHBlbnNpdmUgYW5kIHNob3VsZCBub3QgcnVuIGluIHRoZSBVSSB0aHJlYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlTGlua3MobW9kZWwpIHtcbiAgICBpZiAoIW1vZGVsIHx8IHR5cGVvZiBtb2RlbC5nZXRMaW5lQ291bnQgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG1vZGVsLmdldExpbmVDb250ZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFVua25vd24gY2FsbGVyIVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBMaW5rQ29tcHV0ZXIuY29tcHV0ZUxpbmtzKG1vZGVsKTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIEJhc2ljSW5wbGFjZVJlcGxhY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzaWNJbnBsYWNlUmVwbGFjZSgpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFZhbHVlU2V0ID0gW1xuICAgICAgICAgICAgWyd0cnVlJywgJ2ZhbHNlJ10sXG4gICAgICAgICAgICBbJ1RydWUnLCAnRmFsc2UnXSxcbiAgICAgICAgICAgIFsnUHJpdmF0ZScsICdQdWJsaWMnLCAnRnJpZW5kJywgJ1JlYWRPbmx5JywgJ1BhcnRpYWwnLCAnUHJvdGVjdGVkJywgJ1dyaXRlT25seSddLFxuICAgICAgICAgICAgWydwdWJsaWMnLCAncHJvdGVjdGVkJywgJ3ByaXZhdGUnXSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgQmFzaWNJbnBsYWNlUmVwbGFjZS5wcm90b3R5cGUubmF2aWdhdGVWYWx1ZVNldCA9IGZ1bmN0aW9uIChyYW5nZTEsIHRleHQxLCByYW5nZTIsIHRleHQyLCB1cCkge1xuICAgICAgICBpZiAocmFuZ2UxICYmIHRleHQxKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5kb05hdmlnYXRlVmFsdWVTZXQodGV4dDEsIHVwKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UxLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UyICYmIHRleHQyKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5kb05hdmlnYXRlVmFsdWVTZXQodGV4dDIsIHVwKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UyLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIEJhc2ljSW5wbGFjZVJlcGxhY2UucHJvdG90eXBlLmRvTmF2aWdhdGVWYWx1ZVNldCA9IGZ1bmN0aW9uICh0ZXh0LCB1cCkge1xuICAgICAgICB2YXIgbnVtYmVyUmVzdWx0ID0gdGhpcy5udW1iZXJSZXBsYWNlKHRleHQsIHVwKTtcbiAgICAgICAgaWYgKG51bWJlclJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlclJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0UmVwbGFjZSh0ZXh0LCB1cCk7XG4gICAgfTtcbiAgICBCYXNpY0lucGxhY2VSZXBsYWNlLnByb3RvdHlwZS5udW1iZXJSZXBsYWNlID0gZnVuY3Rpb24gKHZhbHVlLCB1cCkge1xuICAgICAgICB2YXIgcHJlY2lzaW9uID0gTWF0aC5wb3coMTAsIHZhbHVlLmxlbmd0aCAtICh2YWx1ZS5sYXN0SW5kZXhPZignLicpICsgMSkpO1xuICAgICAgICB2YXIgbjEgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICB2YXIgbjIgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYgKCFpc05hTihuMSkgJiYgIWlzTmFOKG4yKSAmJiBuMSA9PT0gbjIpIHtcbiAgICAgICAgICAgIGlmIChuMSA9PT0gMCAmJiAhdXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gZG9uJ3QgZG8gbmVnYXRpdmVcbiAgICAgICAgICAgICAgICAvL1x0XHRcdH0gZWxzZSBpZihuMSA9PT0gOSAmJiB1cCkge1xuICAgICAgICAgICAgICAgIC8vXHRcdFx0XHRyZXR1cm4gbnVsbDsgLy8gZG9uJ3QgaW5zZXJ0IDEwIGludG8gYSBudW1iZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG4xID0gTWF0aC5mbG9vcihuMSAqIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgbjEgKz0gdXAgPyBwcmVjaXNpb24gOiAtcHJlY2lzaW9uO1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcobjEgLyBwcmVjaXNpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgQmFzaWNJbnBsYWNlUmVwbGFjZS5wcm90b3R5cGUudGV4dFJlcGxhY2UgPSBmdW5jdGlvbiAodmFsdWUsIHVwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlU2V0c1JlcGxhY2UodGhpcy5fZGVmYXVsdFZhbHVlU2V0LCB2YWx1ZSwgdXApO1xuICAgIH07XG4gICAgQmFzaWNJbnBsYWNlUmVwbGFjZS5wcm90b3R5cGUudmFsdWVTZXRzUmVwbGFjZSA9IGZ1bmN0aW9uICh2YWx1ZVNldHMsIHZhbHVlLCB1cCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlU2V0cy5sZW5ndGg7IHJlc3VsdCA9PT0gbnVsbCAmJiBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMudmFsdWVTZXRSZXBsYWNlKHZhbHVlU2V0c1tpXSwgdmFsdWUsIHVwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQmFzaWNJbnBsYWNlUmVwbGFjZS5wcm90b3R5cGUudmFsdWVTZXRSZXBsYWNlID0gZnVuY3Rpb24gKHZhbHVlU2V0LCB2YWx1ZSwgdXApIHtcbiAgICAgICAgdmFyIGlkeCA9IHZhbHVlU2V0LmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIGlkeCArPSB1cCA/ICsxIDogLTE7XG4gICAgICAgICAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IHZhbHVlU2V0Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZHggJT0gdmFsdWVTZXQubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0W2lkeF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBCYXNpY0lucGxhY2VSZXBsYWNlLklOU1RBTkNFID0gbmV3IEJhc2ljSW5wbGFjZVJlcGxhY2UoKTtcbiAgICByZXR1cm4gQmFzaWNJbnBsYWNlUmVwbGFjZTtcbn0oKSk7XG5leHBvcnQgeyBCYXNpY0lucGxhY2VSZXBsYWNlIH07XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgbWVyZ2VTb3J0IH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vYXJyYXlzLmpzJztcbmltcG9ydCB7IHN0cmluZ0RpZmYgfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9kaWZmL2RpZmYuanMnO1xuaW1wb3J0IHsgRklOIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vaXRlcmF0b3IuanMnO1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uLy4uL2Jhc2UvY29tbW9uL3BsYXRmb3JtLmpzJztcbmltcG9ydCB7IFVSSSB9IGZyb20gJy4uLy4uLy4uL2Jhc2UvY29tbW9uL3VyaS5qcyc7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4uL2NvcmUvcG9zaXRpb24uanMnO1xuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuLi9jb3JlL3JhbmdlLmpzJztcbmltcG9ydCB7IERpZmZDb21wdXRlciB9IGZyb20gJy4uL2RpZmYvZGlmZkNvbXB1dGVyLmpzJztcbmltcG9ydCB7IE1pcnJvclRleHRNb2RlbCBhcyBCYXNlTWlycm9yTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9taXJyb3JUZXh0TW9kZWwuanMnO1xuaW1wb3J0IHsgZW5zdXJlVmFsaWRXb3JkRGVmaW5pdGlvbiwgZ2V0V29yZEF0VGV4dCB9IGZyb20gJy4uL21vZGVsL3dvcmRIZWxwZXIuanMnO1xuaW1wb3J0IHsgY29tcHV0ZUxpbmtzIH0gZnJvbSAnLi4vbW9kZXMvbGlua0NvbXB1dGVyLmpzJztcbmltcG9ydCB7IEJhc2ljSW5wbGFjZVJlcGxhY2UgfSBmcm9tICcuLi9tb2Rlcy9zdXBwb3J0cy9pbnBsYWNlUmVwbGFjZVN1cHBvcnQuanMnO1xuaW1wb3J0IHsgY3JlYXRlTW9uYWNvQmFzZUFQSSB9IGZyb20gJy4uL3N0YW5kYWxvbmUvc3RhbmRhbG9uZUJhc2UuanMnO1xuaW1wb3J0IHsgZ2V0QWxsUHJvcGVydHlOYW1lcyB9IGZyb20gJy4uLy4uLy4uL2Jhc2UvY29tbW9uL3R5cGVzLmpzJztcbi8qKlxuICogQGludGVybmFsXG4gKi9cbnZhciBNaXJyb3JNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWlycm9yTW9kZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWlycm9yTW9kZWwoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pcnJvck1vZGVsLnByb3RvdHlwZSwgXCJ1cmlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNaXJyb3JNb2RlbC5wcm90b3R5cGUsIFwidmVyc2lvblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb25JZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1pcnJvck1vZGVsLnByb3RvdHlwZSwgXCJlb2xcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lb2w7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgpO1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLmdldExpbmVzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzLnNsaWNlKDApO1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLmdldExpbmVDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzLmxlbmd0aDtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5nZXRMaW5lQ29udGVudCA9IGZ1bmN0aW9uIChsaW5lTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lc1tsaW5lTnVtYmVyIC0gMV07XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuZ2V0V29yZEF0UG9zaXRpb24gPSBmdW5jdGlvbiAocG9zaXRpb24sIHdvcmREZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciB3b3JkQXRUZXh0ID0gZ2V0V29yZEF0VGV4dChwb3NpdGlvbi5jb2x1bW4sIGVuc3VyZVZhbGlkV29yZERlZmluaXRpb24od29yZERlZmluaXRpb24pLCB0aGlzLl9saW5lc1twb3NpdGlvbi5saW5lTnVtYmVyIC0gMV0sIDApO1xuICAgICAgICBpZiAod29yZEF0VGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShwb3NpdGlvbi5saW5lTnVtYmVyLCB3b3JkQXRUZXh0LnN0YXJ0Q29sdW1uLCBwb3NpdGlvbi5saW5lTnVtYmVyLCB3b3JkQXRUZXh0LmVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuZ2V0V29yZFVudGlsUG9zaXRpb24gPSBmdW5jdGlvbiAocG9zaXRpb24sIHdvcmREZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciB3b3JkQXRQb3NpdGlvbiA9IHRoaXMuZ2V0V29yZEF0UG9zaXRpb24ocG9zaXRpb24sIHdvcmREZWZpbml0aW9uKTtcbiAgICAgICAgaWYgKCF3b3JkQXRQb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBzdGFydENvbHVtbjogcG9zaXRpb24uY29sdW1uLFxuICAgICAgICAgICAgICAgIGVuZENvbHVtbjogcG9zaXRpb24uY29sdW1uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3b3JkOiB0aGlzLl9saW5lc1twb3NpdGlvbi5saW5lTnVtYmVyIC0gMV0uc3Vic3RyaW5nKHdvcmRBdFBvc2l0aW9uLnN0YXJ0Q29sdW1uIC0gMSwgcG9zaXRpb24uY29sdW1uIC0gMSksXG4gICAgICAgICAgICBzdGFydENvbHVtbjogd29yZEF0UG9zaXRpb24uc3RhcnRDb2x1bW4sXG4gICAgICAgICAgICBlbmRDb2x1bW46IHBvc2l0aW9uLmNvbHVtblxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLmNyZWF0ZVdvcmRJdGVyYXRvciA9IGZ1bmN0aW9uICh3b3JkRGVmaW5pdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgbGluZU51bWJlciA9IDA7XG4gICAgICAgIHZhciBsaW5lVGV4dDtcbiAgICAgICAgdmFyIHdvcmRSYW5nZXNJZHggPSAwO1xuICAgICAgICB2YXIgd29yZFJhbmdlcyA9IFtdO1xuICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3b3JkUmFuZ2VzSWR4IDwgd29yZFJhbmdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBsaW5lVGV4dC5zdWJzdHJpbmcod29yZFJhbmdlc1t3b3JkUmFuZ2VzSWR4XS5zdGFydCwgd29yZFJhbmdlc1t3b3JkUmFuZ2VzSWR4XS5lbmQpO1xuICAgICAgICAgICAgICAgIHdvcmRSYW5nZXNJZHggKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmogPSB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGluZU51bWJlciA+PSBfdGhpcy5fbGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEZJTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpbmVUZXh0ID0gX3RoaXMuX2xpbmVzW2xpbmVOdW1iZXJdO1xuICAgICAgICAgICAgICAgIHdvcmRSYW5nZXMgPSBfdGhpcy5fd29yZGVuaXplKGxpbmVUZXh0LCB3b3JkRGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgd29yZFJhbmdlc0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgbGluZU51bWJlciArPSAxO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IG5leHQ6IG5leHQgfTtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5nZXRMaW5lV29yZHMgPSBmdW5jdGlvbiAobGluZU51bWJlciwgd29yZERlZmluaXRpb24pIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9saW5lc1tsaW5lTnVtYmVyIC0gMV07XG4gICAgICAgIHZhciByYW5nZXMgPSB0aGlzLl93b3JkZW5pemUoY29udGVudCwgd29yZERlZmluaXRpb24pO1xuICAgICAgICB2YXIgd29yZHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCByYW5nZXNfMSA9IHJhbmdlczsgX2kgPCByYW5nZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHJhbmdlc18xW19pXTtcbiAgICAgICAgICAgIHdvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHdvcmQ6IGNvbnRlbnQuc3Vic3RyaW5nKHJhbmdlLnN0YXJ0LCByYW5nZS5lbmQpLFxuICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uOiByYW5nZS5zdGFydCArIDEsXG4gICAgICAgICAgICAgICAgZW5kQ29sdW1uOiByYW5nZS5lbmQgKyAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29yZHM7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuX3dvcmRlbml6ZSA9IGZ1bmN0aW9uIChjb250ZW50LCB3b3JkRGVmaW5pdGlvbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgd29yZERlZmluaXRpb24ubGFzdEluZGV4ID0gMDsgLy8gcmVzZXQgbGFzdEluZGV4IGp1c3QgdG8gYmUgc3VyZVxuICAgICAgICB3aGlsZSAobWF0Y2ggPSB3b3JkRGVmaW5pdGlvbi5leGVjKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMF0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gaXQgZGlkIG1hdGNoIHRoZSBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgc3RhcnQ6IG1hdGNoLmluZGV4LCBlbmQ6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuZ2V0VmFsdWVJblJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gdGhpcy5fdmFsaWRhdGVSYW5nZShyYW5nZSk7XG4gICAgICAgIGlmIChyYW5nZS5zdGFydExpbmVOdW1iZXIgPT09IHJhbmdlLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW5lc1tyYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxXS5zdWJzdHJpbmcocmFuZ2Uuc3RhcnRDb2x1bW4gLSAxLCByYW5nZS5lbmRDb2x1bW4gLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZUVuZGluZyA9IHRoaXMuX2VvbDtcbiAgICAgICAgdmFyIHN0YXJ0TGluZUluZGV4ID0gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIC0gMTtcbiAgICAgICAgdmFyIGVuZExpbmVJbmRleCA9IHJhbmdlLmVuZExpbmVOdW1iZXIgLSAxO1xuICAgICAgICB2YXIgcmVzdWx0TGluZXMgPSBbXTtcbiAgICAgICAgcmVzdWx0TGluZXMucHVzaCh0aGlzLl9saW5lc1tzdGFydExpbmVJbmRleF0uc3Vic3RyaW5nKHJhbmdlLnN0YXJ0Q29sdW1uIC0gMSkpO1xuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRMaW5lSW5kZXggKyAxOyBpIDwgZW5kTGluZUluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdExpbmVzLnB1c2godGhpcy5fbGluZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdExpbmVzLnB1c2godGhpcy5fbGluZXNbZW5kTGluZUluZGV4XS5zdWJzdHJpbmcoMCwgcmFuZ2UuZW5kQ29sdW1uIC0gMSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0TGluZXMuam9pbihsaW5lRW5kaW5nKTtcbiAgICB9O1xuICAgIE1pcnJvck1vZGVsLnByb3RvdHlwZS5vZmZzZXRBdCA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICBwb3NpdGlvbiA9IHRoaXMuX3ZhbGlkYXRlUG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLl9lbnN1cmVMaW5lU3RhcnRzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lU3RhcnRzLmdldEFjY3VtdWxhdGVkVmFsdWUocG9zaXRpb24ubGluZU51bWJlciAtIDIpICsgKHBvc2l0aW9uLmNvbHVtbiAtIDEpO1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLnBvc2l0aW9uQXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IE1hdGguZmxvb3Iob2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5fZW5zdXJlTGluZVN0YXJ0cygpO1xuICAgICAgICB2YXIgb3V0ID0gdGhpcy5fbGluZVN0YXJ0cy5nZXRJbmRleE9mKG9mZnNldCk7XG4gICAgICAgIHZhciBsaW5lTGVuZ3RoID0gdGhpcy5fbGluZXNbb3V0LmluZGV4XS5sZW5ndGg7XG4gICAgICAgIC8vIEVuc3VyZSB3ZSByZXR1cm4gYSB2YWxpZCBwb3NpdGlvblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGluZU51bWJlcjogMSArIG91dC5pbmRleCxcbiAgICAgICAgICAgIGNvbHVtbjogMSArIE1hdGgubWluKG91dC5yZW1haW5kZXIsIGxpbmVMZW5ndGgpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNaXJyb3JNb2RlbC5wcm90b3R5cGUuX3ZhbGlkYXRlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5fdmFsaWRhdGVQb3NpdGlvbih7IGxpbmVOdW1iZXI6IHJhbmdlLnN0YXJ0TGluZU51bWJlciwgY29sdW1uOiByYW5nZS5zdGFydENvbHVtbiB9KTtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuX3ZhbGlkYXRlUG9zaXRpb24oeyBsaW5lTnVtYmVyOiByYW5nZS5lbmRMaW5lTnVtYmVyLCBjb2x1bW46IHJhbmdlLmVuZENvbHVtbiB9KTtcbiAgICAgICAgaWYgKHN0YXJ0LmxpbmVOdW1iZXIgIT09IHJhbmdlLnN0YXJ0TGluZU51bWJlclxuICAgICAgICAgICAgfHwgc3RhcnQuY29sdW1uICE9PSByYW5nZS5zdGFydENvbHVtblxuICAgICAgICAgICAgfHwgZW5kLmxpbmVOdW1iZXIgIT09IHJhbmdlLmVuZExpbmVOdW1iZXJcbiAgICAgICAgICAgIHx8IGVuZC5jb2x1bW4gIT09IHJhbmdlLmVuZENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydExpbmVOdW1iZXI6IHN0YXJ0LmxpbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgc3RhcnRDb2x1bW46IHN0YXJ0LmNvbHVtbixcbiAgICAgICAgICAgICAgICBlbmRMaW5lTnVtYmVyOiBlbmQubGluZU51bWJlcixcbiAgICAgICAgICAgICAgICBlbmRDb2x1bW46IGVuZC5jb2x1bW5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG4gICAgTWlycm9yTW9kZWwucHJvdG90eXBlLl92YWxpZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmICghUG9zaXRpb24uaXNJUG9zaXRpb24ocG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBwb3NpdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lTnVtYmVyID0gcG9zaXRpb24ubGluZU51bWJlciwgY29sdW1uID0gcG9zaXRpb24uY29sdW1uO1xuICAgICAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAobGluZU51bWJlciA8IDEpIHtcbiAgICAgICAgICAgIGxpbmVOdW1iZXIgPSAxO1xuICAgICAgICAgICAgY29sdW1uID0gMTtcbiAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxpbmVOdW1iZXIgPiB0aGlzLl9saW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpbmVOdW1iZXIgPSB0aGlzLl9saW5lcy5sZW5ndGg7XG4gICAgICAgICAgICBjb2x1bW4gPSB0aGlzLl9saW5lc1tsaW5lTnVtYmVyIC0gMV0ubGVuZ3RoICsgMTtcbiAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG1heENoYXJhY3RlciA9IHRoaXMuX2xpbmVzW2xpbmVOdW1iZXIgLSAxXS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiA8IDEpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gPSAxO1xuICAgICAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uID4gbWF4Q2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uID0gbWF4Q2hhcmFjdGVyO1xuICAgICAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzQ2hhbmdlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgbGluZU51bWJlcjogbGluZU51bWJlciwgY29sdW1uOiBjb2x1bW4gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE1pcnJvck1vZGVsO1xufShCYXNlTWlycm9yTW9kZWwpKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbnZhciBCYXNlRWRpdG9yU2ltcGxlV29ya2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIoZm9yZWlnbk1vZHVsZUZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5fZm9yZWlnbk1vZHVsZUZhY3RvcnkgPSBmb3JlaWduTW9kdWxlRmFjdG9yeTtcbiAgICAgICAgdGhpcy5fZm9yZWlnbk1vZHVsZSA9IG51bGw7XG4gICAgfVxuICAgIC8vIC0tLS0gQkVHSU4gZGlmZiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIucHJvdG90eXBlLmNvbXB1dGVEaWZmID0gZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBtb2RpZmllZFVybCwgaWdub3JlVHJpbVdoaXRlc3BhY2UpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsID0gdGhpcy5fZ2V0TW9kZWwob3JpZ2luYWxVcmwpO1xuICAgICAgICB2YXIgbW9kaWZpZWQgPSB0aGlzLl9nZXRNb2RlbChtb2RpZmllZFVybCk7XG4gICAgICAgIGlmICghb3JpZ2luYWwgfHwgIW1vZGlmaWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcmlnaW5hbExpbmVzID0gb3JpZ2luYWwuZ2V0TGluZXNDb250ZW50KCk7XG4gICAgICAgIHZhciBtb2RpZmllZExpbmVzID0gbW9kaWZpZWQuZ2V0TGluZXNDb250ZW50KCk7XG4gICAgICAgIHZhciBkaWZmQ29tcHV0ZXIgPSBuZXcgRGlmZkNvbXB1dGVyKG9yaWdpbmFsTGluZXMsIG1vZGlmaWVkTGluZXMsIHtcbiAgICAgICAgICAgIHNob3VsZENvbXB1dGVDaGFyQ2hhbmdlczogdHJ1ZSxcbiAgICAgICAgICAgIHNob3VsZFBvc3RQcm9jZXNzQ2hhckNoYW5nZXM6IHRydWUsXG4gICAgICAgICAgICBzaG91bGRJZ25vcmVUcmltV2hpdGVzcGFjZTogaWdub3JlVHJpbVdoaXRlc3BhY2UsXG4gICAgICAgICAgICBzaG91bGRNYWtlUHJldHR5RGlmZjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNoYW5nZXMgPSBkaWZmQ29tcHV0ZXIuY29tcHV0ZURpZmYoKTtcbiAgICAgICAgdmFyIGlkZW50aWNhbCA9IChjaGFuZ2VzLmxlbmd0aCA+IDAgPyBmYWxzZSA6IHRoaXMuX21vZGVsc0FyZUlkZW50aWNhbChvcmlnaW5hbCwgbW9kaWZpZWQpKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgICBpZGVudGljYWw6IGlkZW50aWNhbCxcbiAgICAgICAgICAgIGNoYW5nZXM6IGNoYW5nZXNcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS5fbW9kZWxzQXJlSWRlbnRpY2FsID0gZnVuY3Rpb24gKG9yaWdpbmFsLCBtb2RpZmllZCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxMaW5lQ291bnQgPSBvcmlnaW5hbC5nZXRMaW5lQ291bnQoKTtcbiAgICAgICAgdmFyIG1vZGlmaWVkTGluZUNvdW50ID0gbW9kaWZpZWQuZ2V0TGluZUNvdW50KCk7XG4gICAgICAgIGlmIChvcmlnaW5hbExpbmVDb3VudCAhPT0gbW9kaWZpZWRMaW5lQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBsaW5lID0gMTsgbGluZSA8PSBvcmlnaW5hbExpbmVDb3VudDsgbGluZSsrKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMaW5lID0gb3JpZ2luYWwuZ2V0TGluZUNvbnRlbnQobGluZSk7XG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRMaW5lID0gbW9kaWZpZWQuZ2V0TGluZUNvbnRlbnQobGluZSk7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxMaW5lICE9PSBtb2RpZmllZExpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBCYXNlRWRpdG9yU2ltcGxlV29ya2VyLnByb3RvdHlwZS5jb21wdXRlTW9yZU1pbmltYWxFZGl0cyA9IGZ1bmN0aW9uIChtb2RlbFVybCwgZWRpdHMpIHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5fZ2V0TW9kZWwobW9kZWxVcmwpO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVkaXRzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBsYXN0RW9sID0gdW5kZWZpbmVkO1xuICAgICAgICBlZGl0cyA9IG1lcmdlU29ydChlZGl0cywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhLnJhbmdlICYmIGIucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmFuZ2UuY29tcGFyZVJhbmdlc1VzaW5nU3RhcnRzKGEucmFuZ2UsIGIucmFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZW9sIG9ubHkgY2hhbmdlcyBzaG91bGQgZ28gdG8gdGhlIGVuZFxuICAgICAgICAgICAgdmFyIGFSbmcgPSBhLnJhbmdlID8gMCA6IDE7XG4gICAgICAgICAgICB2YXIgYlJuZyA9IGIucmFuZ2UgPyAwIDogMTtcbiAgICAgICAgICAgIHJldHVybiBhUm5nIC0gYlJuZztcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgZWRpdHNfMSA9IGVkaXRzOyBfaSA8IGVkaXRzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBlZGl0c18xW19pXSwgcmFuZ2UgPSBfYS5yYW5nZSwgdGV4dCA9IF9hLnRleHQsIGVvbCA9IF9hLmVvbDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW9sID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGxhc3RFb2wgPSBlb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoUmFuZ2UuaXNFbXB0eShyYW5nZSkgJiYgIXRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBjaGFuZ2VcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcmlnaW5hbCA9IG1vZGVsLmdldFZhbHVlSW5SYW5nZShyYW5nZSk7XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHJcXG58XFxufFxcci9nLCBtb2RlbC5lb2wpO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsID09PSB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gbm9vcFxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGRpZmYgd29uJ3QgdGFrZSB0b28gbG9uZ1xuICAgICAgICAgICAgaWYgKE1hdGgubWF4KHRleHQubGVuZ3RoLCBvcmlnaW5hbC5sZW5ndGgpID4gQmFzZUVkaXRvclNpbXBsZVdvcmtlci5fZGlmZkxpbWl0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyByYW5nZTogcmFuZ2UsIHRleHQ6IHRleHQgfSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb21wdXRlIGRpZmYgYmV0d2VlbiBvcmlnaW5hbCBhbmQgZWRpdC50ZXh0XG4gICAgICAgICAgICB2YXIgY2hhbmdlcyA9IHN0cmluZ0RpZmYob3JpZ2luYWwsIHRleHQsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBlZGl0T2Zmc2V0ID0gbW9kZWwub2Zmc2V0QXQoUmFuZ2UubGlmdChyYW5nZSkuZ2V0U3RhcnRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gMCwgY2hhbmdlc18xID0gY2hhbmdlczsgX2IgPCBjaGFuZ2VzXzEubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNfMVtfYl07XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbW9kZWwucG9zaXRpb25BdChlZGl0T2Zmc2V0ICsgY2hhbmdlLm9yaWdpbmFsU3RhcnQpO1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSBtb2RlbC5wb3NpdGlvbkF0KGVkaXRPZmZzZXQgKyBjaGFuZ2Uub3JpZ2luYWxTdGFydCArIGNoYW5nZS5vcmlnaW5hbExlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0VkaXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQuc3Vic3RyKGNoYW5nZS5tb2RpZmllZFN0YXJ0LCBjaGFuZ2UubW9kaWZpZWRMZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogeyBzdGFydExpbmVOdW1iZXI6IHN0YXJ0LmxpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uOiBzdGFydC5jb2x1bW4sIGVuZExpbmVOdW1iZXI6IGVuZC5saW5lTnVtYmVyLCBlbmRDb2x1bW46IGVuZC5jb2x1bW4gfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmdldFZhbHVlSW5SYW5nZShuZXdFZGl0LnJhbmdlKSAhPT0gbmV3RWRpdC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld0VkaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxhc3RFb2wgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IGVvbDogbGFzdEVvbCwgdGV4dDogJycsIHJhbmdlOiB7IHN0YXJ0TGluZU51bWJlcjogMCwgc3RhcnRDb2x1bW46IDAsIGVuZExpbmVOdW1iZXI6IDAsIGVuZENvbHVtbjogMCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICB9O1xuICAgIC8vIC0tLS0gRU5EIG1pbmltYWwgZWRpdHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUuY29tcHV0ZUxpbmtzID0gZnVuY3Rpb24gKG1vZGVsVXJsKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuX2dldE1vZGVsKG1vZGVsVXJsKTtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbXB1dGVMaW5rcyhtb2RlbCkpO1xuICAgIH07XG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUudGV4dHVhbFN1Z2dlc3QgPSBmdW5jdGlvbiAobW9kZWxVcmwsIHBvc2l0aW9uLCB3b3JkRGVmLCB3b3JkRGVmRmxhZ3MpIHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5fZ2V0TW9kZWwobW9kZWxVcmwpO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICB2YXIgd29yZERlZlJlZ0V4cCA9IG5ldyBSZWdFeHAod29yZERlZiwgd29yZERlZkZsYWdzKTtcbiAgICAgICAgdmFyIGN1cnJlbnRXb3JkID0gbW9kZWwuZ2V0V29yZFVudGlsUG9zaXRpb24ocG9zaXRpb24sIHdvcmREZWZSZWdFeHApO1xuICAgICAgICB2YXIgc2VlbiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHNlZW5bY3VycmVudFdvcmQud29yZF0gPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBpdGVyID0gbW9kZWwuY3JlYXRlV29yZEl0ZXJhdG9yKHdvcmREZWZSZWdFeHApLCBlID0gaXRlci5uZXh0KCk7ICFlLmRvbmUgJiYgc3VnZ2VzdGlvbnMubGVuZ3RoIDw9IEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIuX3N1Z2dlc3Rpb25zTGltaXQ7IGUgPSBpdGVyLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIHdvcmQgPSBlLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHNlZW5bd29yZF0pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW5bd29yZF0gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIod29yZCkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBraW5kOiAxOCAvKiBUZXh0ICovLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB3b3JkLFxuICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IHdvcmQsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHsgc3RhcnRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLCBzdGFydENvbHVtbjogY3VycmVudFdvcmQuc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsIGVuZENvbHVtbjogY3VycmVudFdvcmQuZW5kQ29sdW1uIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMgfSk7XG4gICAgfTtcbiAgICAvLyAtLS0tIEVORCBzdWdnZXN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8jcmVnaW9uIC0tIHdvcmQgcmFuZ2VzIC0tXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUuY29tcHV0ZVdvcmRSYW5nZXMgPSBmdW5jdGlvbiAobW9kZWxVcmwsIHJhbmdlLCB3b3JkRGVmLCB3b3JkRGVmRmxhZ3MpIHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5fZ2V0TW9kZWwobW9kZWxVcmwpO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3b3JkRGVmUmVnRXhwID0gbmV3IFJlZ0V4cCh3b3JkRGVmLCB3b3JkRGVmRmxhZ3MpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZm9yICh2YXIgbGluZSA9IHJhbmdlLnN0YXJ0TGluZU51bWJlcjsgbGluZSA8IHJhbmdlLmVuZExpbmVOdW1iZXI7IGxpbmUrKykge1xuICAgICAgICAgICAgdmFyIHdvcmRzID0gbW9kZWwuZ2V0TGluZVdvcmRzKGxpbmUsIHdvcmREZWZSZWdFeHApO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCB3b3Jkc18xID0gd29yZHM7IF9pIDwgd29yZHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzXzFbX2ldO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oTnVtYmVyKHdvcmQud29yZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSByZXN1bHRbd29yZC53b3JkXTtcbiAgICAgICAgICAgICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFt3b3JkLndvcmRdID0gYXJyYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmVOdW1iZXI6IGxpbmUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uOiB3b3JkLnN0YXJ0Q29sdW1uLFxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lTnVtYmVyOiBsaW5lLFxuICAgICAgICAgICAgICAgICAgICBlbmRDb2x1bW46IHdvcmQuZW5kQ29sdW1uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgIH07XG4gICAgLy8jZW5kcmVnaW9uXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUubmF2aWdhdGVWYWx1ZVNldCA9IGZ1bmN0aW9uIChtb2RlbFVybCwgcmFuZ2UsIHVwLCB3b3JkRGVmLCB3b3JkRGVmRmxhZ3MpIHtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5fZ2V0TW9kZWwobW9kZWxVcmwpO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3b3JkRGVmUmVnRXhwID0gbmV3IFJlZ0V4cCh3b3JkRGVmLCB3b3JkRGVmRmxhZ3MpO1xuICAgICAgICBpZiAocmFuZ2Uuc3RhcnRDb2x1bW4gPT09IHJhbmdlLmVuZENvbHVtbikge1xuICAgICAgICAgICAgcmFuZ2UgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiByYW5nZS5zdGFydExpbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgc3RhcnRDb2x1bW46IHJhbmdlLnN0YXJ0Q29sdW1uLFxuICAgICAgICAgICAgICAgIGVuZExpbmVOdW1iZXI6IHJhbmdlLmVuZExpbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgZW5kQ29sdW1uOiByYW5nZS5lbmRDb2x1bW4gKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxlY3Rpb25UZXh0ID0gbW9kZWwuZ2V0VmFsdWVJblJhbmdlKHJhbmdlKTtcbiAgICAgICAgdmFyIHdvcmRSYW5nZSA9IG1vZGVsLmdldFdvcmRBdFBvc2l0aW9uKHsgbGluZU51bWJlcjogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLCBjb2x1bW46IHJhbmdlLnN0YXJ0Q29sdW1uIH0sIHdvcmREZWZSZWdFeHApO1xuICAgICAgICBpZiAoIXdvcmRSYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd29yZCA9IG1vZGVsLmdldFZhbHVlSW5SYW5nZSh3b3JkUmFuZ2UpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gQmFzaWNJbnBsYWNlUmVwbGFjZS5JTlNUQU5DRS5uYXZpZ2F0ZVZhbHVlU2V0KHJhbmdlLCBzZWxlY3Rpb25UZXh0LCB3b3JkUmFuZ2UsIHdvcmQsIHVwKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgIH07XG4gICAgLy8gLS0tLSBCRUdJTiBmb3JlaWduIG1vZHVsZSBzdXBwb3J0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQmFzZUVkaXRvclNpbXBsZVdvcmtlci5wcm90b3R5cGUubG9hZEZvcmVpZ25Nb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlSWQsIGNyZWF0ZURhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGN0eCA9IHtcbiAgICAgICAgICAgIGdldE1pcnJvck1vZGVsczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fZ2V0TW9kZWxzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9mb3JlaWduTW9kdWxlRmFjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fZm9yZWlnbk1vZHVsZSA9IHRoaXMuX2ZvcmVpZ25Nb2R1bGVGYWN0b3J5KGN0eCwgY3JlYXRlRGF0YSk7XG4gICAgICAgICAgICAvLyBzdGF0aWMgZm9yZWluZyBtb2R1bGVcbiAgICAgICAgICAgIHZhciBtZXRob2RzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gZ2V0QWxsUHJvcGVydHlOYW1lcyh0aGlzLl9mb3JlaWduTW9kdWxlKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2ZvcmVpZ25Nb2R1bGVbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKHByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWV0aG9kcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRVNNLWNvbW1lbnQtYmVnaW5cbiAgICAgICAgLy8gXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gXHRcdFx0cmVxdWlyZShbbW9kdWxlSWRdLCAoZm9yZWlnbk1vZHVsZTogeyBjcmVhdGU6IElGb3JlaWduTW9kdWxlRmFjdG9yeSB9KSA9PiB7XG4gICAgICAgIC8vIFx0XHRcdFx0dGhpcy5fZm9yZWlnbk1vZHVsZSA9IGZvcmVpZ25Nb2R1bGUuY3JlYXRlKGN0eCwgY3JlYXRlRGF0YSk7XG4gICAgICAgIC8vIFxuICAgICAgICAvLyBcdFx0XHRcdGxldCBtZXRob2RzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAvLyBcdFx0XHRcdGZvciAoY29uc3QgcHJvcCBvZiBnZXRBbGxQcm9wZXJ0eU5hbWVzKHRoaXMuX2ZvcmVpZ25Nb2R1bGUpKSB7XG4gICAgICAgIC8vIFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX2ZvcmVpZ25Nb2R1bGVbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gXHRcdFx0XHRcdFx0bWV0aG9kcy5wdXNoKHByb3ApO1xuICAgICAgICAvLyBcdFx0XHRcdFx0fVxuICAgICAgICAvLyBcdFx0XHRcdH1cbiAgICAgICAgLy8gXG4gICAgICAgIC8vIFx0XHRcdFx0cmVzb2x2ZShtZXRob2RzKTtcbiAgICAgICAgLy8gXG4gICAgICAgIC8vIFx0XHRcdH0sIHJlamVjdCk7XG4gICAgICAgIC8vIFx0XHR9KTtcbiAgICAgICAgLy8gRVNNLWNvbW1lbnQtZW5kXG4gICAgICAgIC8vIEVTTS11bmNvbW1lbnQtYmVnaW5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgdXNhZ2VcIikpO1xuICAgICAgICAvLyBFU00tdW5jb21tZW50LWVuZFxuICAgIH07XG4gICAgLy8gZm9yZWlnbiBtZXRob2QgcmVxdWVzdFxuICAgIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIucHJvdG90eXBlLmZtciA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9mb3JlaWduTW9kdWxlIHx8IHR5cGVvZiB0aGlzLl9mb3JlaWduTW9kdWxlW21ldGhvZF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWVzdEhhbmRsZXIgb3IgbWV0aG9kOiAnICsgbWV0aG9kKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fZm9yZWlnbk1vZHVsZVttZXRob2RdLmFwcGx5KHRoaXMuX2ZvcmVpZ25Nb2R1bGUsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyAtLS0tIEVORCBkaWZmIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gLS0tLSBCRUdJTiBtaW5pbWFsIGVkaXRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIuX2RpZmZMaW1pdCA9IDEwMDAwO1xuICAgIC8vIC0tLS0gQkVHSU4gc3VnZ2VzdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIuX3N1Z2dlc3Rpb25zTGltaXQgPSAxMDAwMDtcbiAgICByZXR1cm4gQmFzZUVkaXRvclNpbXBsZVdvcmtlcjtcbn0oKSk7XG5leHBvcnQgeyBCYXNlRWRpdG9yU2ltcGxlV29ya2VyIH07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgRWRpdG9yU2ltcGxlV29ya2VySW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRWRpdG9yU2ltcGxlV29ya2VySW1wbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsKGZvcmVpZ25Nb2R1bGVGYWN0b3J5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGZvcmVpZ25Nb2R1bGVGYWN0b3J5KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fbW9kZWxzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tb2RlbHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH07XG4gICAgRWRpdG9yU2ltcGxlV29ya2VySW1wbC5wcm90b3R5cGUuX2dldE1vZGVsID0gZnVuY3Rpb24gKHVyaSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWxzW3VyaV07XG4gICAgfTtcbiAgICBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsLnByb3RvdHlwZS5fZ2V0TW9kZWxzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYWxsID0gW107XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX21vZGVscykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBhbGwucHVzaChfdGhpcy5fbW9kZWxzW2tleV0pOyB9KTtcbiAgICAgICAgcmV0dXJuIGFsbDtcbiAgICB9O1xuICAgIEVkaXRvclNpbXBsZVdvcmtlckltcGwucHJvdG90eXBlLmFjY2VwdE5ld01vZGVsID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fbW9kZWxzW2RhdGEudXJsXSA9IG5ldyBNaXJyb3JNb2RlbChVUkkucGFyc2UoZGF0YS51cmwpLCBkYXRhLmxpbmVzLCBkYXRhLkVPTCwgZGF0YS52ZXJzaW9uSWQpO1xuICAgIH07XG4gICAgRWRpdG9yU2ltcGxlV29ya2VySW1wbC5wcm90b3R5cGUuYWNjZXB0TW9kZWxDaGFuZ2VkID0gZnVuY3Rpb24gKHN0clVSTCwgZSkge1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVsc1tzdHJVUkxdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5fbW9kZWxzW3N0clVSTF07XG4gICAgICAgIG1vZGVsLm9uRXZlbnRzKGUpO1xuICAgIH07XG4gICAgRWRpdG9yU2ltcGxlV29ya2VySW1wbC5wcm90b3R5cGUuYWNjZXB0UmVtb3ZlZE1vZGVsID0gZnVuY3Rpb24gKHN0clVSTCkge1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVsc1tzdHJVUkxdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMuX21vZGVsc1tzdHJVUkxdO1xuICAgIH07XG4gICAgcmV0dXJuIEVkaXRvclNpbXBsZVdvcmtlckltcGw7XG59KEJhc2VFZGl0b3JTaW1wbGVXb3JrZXIpKTtcbmV4cG9ydCB7IEVkaXRvclNpbXBsZVdvcmtlckltcGwgfTtcbi8qKlxuICogQ2FsbGVkIG9uIHRoZSB3b3JrZXIgc2lkZVxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsKG51bGwpO1xufVxuaWYgKHR5cGVvZiBpbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gUnVubmluZyBpbiBhIHdlYiB3b3JrZXJcbiAgICBnbG9iYWxzLm1vbmFjbyA9IGNyZWF0ZU1vbmFjb0Jhc2VBUEkoKTtcbn1cbiIsIi8qIVxuQ29weXJpZ2h0IChjKSAyMDE0IFRheWxvciBIYWtlc1xuQ29weXJpZ2h0IChjKSAyMDE0IEZvcmJlcyBMaW5kZXNheVxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KCkgOlxuXHRcdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdFx0XHQoZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBAdGhpcyB7UHJvbWlzZX1cblx0ICovXG5cdGZ1bmN0aW9uIGZpbmFsbHlDb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuXHRcdHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIHRoaXMudGhlbihcblx0XHRcdGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0Ly8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcblx0Ly8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG5cdHZhciBzZXRUaW1lb3V0RnVuYyA9IHNldFRpbWVvdXQ7XG5cblx0ZnVuY3Rpb24gbm9vcCgpIHsgfVxuXG5cdC8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuXHRmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cblx0ICovXG5cdGZ1bmN0aW9uIFByb21pc2UoZm4pIHtcblx0XHRpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSkpXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcblx0XHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuXHRcdC8qKiBAdHlwZSB7IW51bWJlcn0gKi9cblx0XHR0aGlzLl9zdGF0ZSA9IDA7XG5cdFx0LyoqIEB0eXBlIHshYm9vbGVhbn0gKi9cblx0XHR0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG5cdFx0LyoqIEB0eXBlIHtQcm9taXNlfHVuZGVmaW5lZH0gKi9cblx0XHR0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHQvKiogQHR5cGUgeyFBcnJheTwhRnVuY3Rpb24+fSAqL1xuXHRcdHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG5cdFx0ZG9SZXNvbHZlKGZuLCB0aGlzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuXHRcdHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuXHRcdFx0c2VsZiA9IHNlbGYuX3ZhbHVlO1xuXHRcdH1cblx0XHRpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcblx0XHRcdHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0c2VsZi5faGFuZGxlZCA9IHRydWU7XG5cdFx0UHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG5cdFx0XHRpZiAoY2IgPT09IG51bGwpIHtcblx0XHRcdFx0KHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgcmV0O1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcblx0XHRcdGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3VmFsdWUgJiZcblx0XHRcdFx0KHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcblx0XHRcdFx0aWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0XHRcdHNlbGYuX3N0YXRlID0gMztcblx0XHRcdFx0XHRzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdGZpbmFsZShzZWxmKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2VsZi5fc3RhdGUgPSAxO1xuXHRcdFx0c2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdGZpbmFsZShzZWxmKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZWplY3Qoc2VsZiwgZSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG5cdFx0c2VsZi5fc3RhdGUgPSAyO1xuXHRcdHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdFx0ZmluYWxlKHNlbGYpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcblx0XHRpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0UHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoIXNlbGYuX2hhbmRsZWQpIHtcblx0XHRcdFx0XHRQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbihzZWxmLl92YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGhhbmRsZShzZWxmLCBzZWxmLl9kZWZlcnJlZHNbaV0pO1xuXHRcdH1cblx0XHRzZWxmLl9kZWZlcnJlZHMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0ZnVuY3Rpb24gSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSkge1xuXHRcdHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG5cdFx0dGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcblx0XHR0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXG5cdCAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxuXHQgKlxuXHQgKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXG5cdCAqL1xuXHRmdW5jdGlvbiBkb1Jlc29sdmUoZm4sIHNlbGYpIHtcblx0XHR2YXIgZG9uZSA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRmbihcblx0XHRcdFx0ZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKGRvbmUpIHJldHVybjtcblx0XHRcdFx0XHRkb25lID0gdHJ1ZTtcblx0XHRcdFx0XHRyZXNvbHZlKHNlbGYsIHZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0XHRcdGlmIChkb25lKSByZXR1cm47XG5cdFx0XHRcdFx0ZG9uZSA9IHRydWU7XG5cdFx0XHRcdFx0cmVqZWN0KHNlbGYsIHJlYXNvbik7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdGlmIChkb25lKSByZXR1cm47XG5cdFx0XHRkb25lID0gdHJ1ZTtcblx0XHRcdHJlamVjdChzZWxmLCBleCk7XG5cdFx0fVxuXHR9XG5cblx0UHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuXHRcdHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG5cdH07XG5cblx0UHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR2YXIgcHJvbSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG5cdFx0aGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG5cdFx0cmV0dXJuIHByb207XG5cdH07XG5cblx0UHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IGZpbmFsbHlDb25zdHJ1Y3RvcjtcblxuXHRQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0aWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlLmFsbCBhY2NlcHRzIGFuIGFycmF5Jyk7XG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cdFx0XHRpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcblx0XHRcdHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcblxuXHRcdFx0ZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdFx0XHR2YXIgdGhlbiA9IHZhbC50aGVuO1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHR2YWwsXG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzKGksIHZhbCk7XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRyZWplY3Rcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhcmdzW2ldID0gdmFsO1xuXHRcdFx0XHRcdGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShhcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGV4KSB7XG5cdFx0XHRcdFx0cmVqZWN0KGV4KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cmVzKGksIGFyZ3NbaV0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdFByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdFx0XHRyZXNvbHZlKHZhbHVlKTtcblx0XHR9KTtcblx0fTtcblxuXHRQcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRyZWplY3QodmFsdWUpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdFByb21pc2UucmFjZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHR2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuXHRQcm9taXNlLl9pbW1lZGlhdGVGbiA9XG5cdFx0KHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdGZ1bmN0aW9uIChmbikge1xuXHRcdFx0XHRzZXRJbW1lZGlhdGUoZm4pO1xuXHRcdFx0fSkgfHxcblx0XHRmdW5jdGlvbiAoZm4pIHtcblx0XHRcdHNldFRpbWVvdXRGdW5jKGZuLCAwKTtcblx0XHR9O1xuXG5cdFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuXHRcdGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuXHRcdFx0Y29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdFx0fVxuXHR9O1xuXG5cdC8qKiBAc3VwcHJlc3Mge3VuZGVmaW5lZFZhcnN9ICovXG5cdHZhciBnbG9iYWxOUyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gdGhlIG9ubHkgcmVsaWFibGUgbWVhbnMgdG8gZ2V0IHRoZSBnbG9iYWwgb2JqZWN0IGlzXG5cdFx0Ly8gYEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKClgXG5cdFx0Ly8gSG93ZXZlciwgdGhpcyBjYXVzZXMgQ1NQIHZpb2xhdGlvbnMgaW4gQ2hyb21lIGFwcHMuXG5cdFx0aWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHdpbmRvdztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsO1xuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBsb2NhdGUgZ2xvYmFsIG9iamVjdCcpO1xuXHR9KSgpO1xuXG5cdGlmICghKCdQcm9taXNlJyBpbiBnbG9iYWxOUykpIHtcblx0XHRnbG9iYWxOU1snUHJvbWlzZSddID0gUHJvbWlzZTtcblx0fSBlbHNlIGlmICghZ2xvYmFsTlMuUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSkge1xuXHRcdGdsb2JhbE5TLlByb21pc2UucHJvdG90eXBlWydmaW5hbGx5J10gPSBmaW5hbGx5Q29uc3RydWN0b3I7XG5cdH1cblxufSkpKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0ICcuL3Byb21pc2UtcG9seWZpbGwvcG9seWZpbGwuanMnO1xuaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9iYXNlL2NvbW1vbi9jYW5jZWxsYXRpb24uanMnO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gJy4uLy4uLy4uL2Jhc2UvY29tbW9uL2V2ZW50LmpzJztcbmltcG9ydCB7IEtleUNob3JkIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24va2V5Q29kZXMuanMnO1xuaW1wb3J0IHsgVVJJIH0gZnJvbSAnLi4vLi4vLi4vYmFzZS9jb21tb24vdXJpLmpzJztcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnLi4vY29yZS9wb3NpdGlvbi5qcyc7XG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJy4uL2NvcmUvcmFuZ2UuanMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi4vY29yZS9zZWxlY3Rpb24uanMnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi9jb3JlL3Rva2VuLmpzJztcbmltcG9ydCAqIGFzIHN0YW5kYWxvbmVFbnVtcyBmcm9tICcuL3N0YW5kYWxvbmVFbnVtcy5qcyc7XG52YXIgS2V5TW9kID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEtleU1vZCgpIHtcbiAgICB9XG4gICAgS2V5TW9kLmNob3JkID0gZnVuY3Rpb24gKGZpcnN0UGFydCwgc2Vjb25kUGFydCkge1xuICAgICAgICByZXR1cm4gS2V5Q2hvcmQoZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0KTtcbiAgICB9O1xuICAgIEtleU1vZC5DdHJsQ21kID0gMjA0OCAvKiBDdHJsQ21kICovO1xuICAgIEtleU1vZC5TaGlmdCA9IDEwMjQgLyogU2hpZnQgKi87XG4gICAgS2V5TW9kLkFsdCA9IDUxMiAvKiBBbHQgKi87XG4gICAgS2V5TW9kLldpbkN0cmwgPSAyNTYgLyogV2luQ3RybCAqLztcbiAgICByZXR1cm4gS2V5TW9kO1xufSgpKTtcbmV4cG9ydCB7IEtleU1vZCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vbmFjb0Jhc2VBUEkoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZWRpdG9yOiB1bmRlZmluZWQsXG4gICAgICAgIGxhbmd1YWdlczogdW5kZWZpbmVkLFxuICAgICAgICBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZTogQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UsXG4gICAgICAgIEVtaXR0ZXI6IEVtaXR0ZXIsXG4gICAgICAgIEtleUNvZGU6IHN0YW5kYWxvbmVFbnVtcy5LZXlDb2RlLFxuICAgICAgICBLZXlNb2Q6IEtleU1vZCxcbiAgICAgICAgUG9zaXRpb246IFBvc2l0aW9uLFxuICAgICAgICBSYW5nZTogUmFuZ2UsXG4gICAgICAgIFNlbGVjdGlvbjogU2VsZWN0aW9uLFxuICAgICAgICBTZWxlY3Rpb25EaXJlY3Rpb246IHN0YW5kYWxvbmVFbnVtcy5TZWxlY3Rpb25EaXJlY3Rpb24sXG4gICAgICAgIE1hcmtlclNldmVyaXR5OiBzdGFuZGFsb25lRW51bXMuTWFya2VyU2V2ZXJpdHksXG4gICAgICAgIE1hcmtlclRhZzogc3RhbmRhbG9uZUVudW1zLk1hcmtlclRhZyxcbiAgICAgICAgVXJpOiBVUkksXG4gICAgICAgIFRva2VuOiBUb2tlblxuICAgIH07XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vIFRISVMgSVMgQSBHRU5FUkFURUQgRklMRS4gRE8gTk9UIEVESVQgRElSRUNUTFkuXG5leHBvcnQgdmFyIE1hcmtlclRhZztcbihmdW5jdGlvbiAoTWFya2VyVGFnKSB7XG4gICAgTWFya2VyVGFnW01hcmtlclRhZ1tcIlVubmVjZXNzYXJ5XCJdID0gMV0gPSBcIlVubmVjZXNzYXJ5XCI7XG59KShNYXJrZXJUYWcgfHwgKE1hcmtlclRhZyA9IHt9KSk7XG5leHBvcnQgdmFyIE1hcmtlclNldmVyaXR5O1xuKGZ1bmN0aW9uIChNYXJrZXJTZXZlcml0eSkge1xuICAgIE1hcmtlclNldmVyaXR5W01hcmtlclNldmVyaXR5W1wiSGludFwiXSA9IDFdID0gXCJIaW50XCI7XG4gICAgTWFya2VyU2V2ZXJpdHlbTWFya2VyU2V2ZXJpdHlbXCJJbmZvXCJdID0gMl0gPSBcIkluZm9cIjtcbiAgICBNYXJrZXJTZXZlcml0eVtNYXJrZXJTZXZlcml0eVtcIldhcm5pbmdcIl0gPSA0XSA9IFwiV2FybmluZ1wiO1xuICAgIE1hcmtlclNldmVyaXR5W01hcmtlclNldmVyaXR5W1wiRXJyb3JcIl0gPSA4XSA9IFwiRXJyb3JcIjtcbn0pKE1hcmtlclNldmVyaXR5IHx8IChNYXJrZXJTZXZlcml0eSA9IHt9KSk7XG4vKipcbiAqIFZpcnR1YWwgS2V5IENvZGVzLCB0aGUgdmFsdWUgZG9lcyBub3QgaG9sZCBhbnkgaW5oZXJlbnQgbWVhbmluZy5cbiAqIEluc3BpcmVkIHNvbWV3aGF0IGZyb20gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS93aW5kb3dzL2Rlc2t0b3AvZGQzNzU3MzEodj12cy44NSkuYXNweFxuICogQnV0IHRoZXNlIGFyZSBcIm1vcmUgZ2VuZXJhbFwiLCBhcyB0aGV5IHNob3VsZCB3b3JrIGFjcm9zcyBicm93c2VycyAmIE9TYHMuXG4gKi9cbmV4cG9ydCB2YXIgS2V5Q29kZTtcbihmdW5jdGlvbiAoS2V5Q29kZSkge1xuICAgIC8qKlxuICAgICAqIFBsYWNlZCBmaXJzdCB0byBjb3ZlciB0aGUgMCB2YWx1ZSBvZiB0aGUgZW51bS5cbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVbmtub3duXCJdID0gMF0gPSBcIlVua25vd25cIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJCYWNrc3BhY2VcIl0gPSAxXSA9IFwiQmFja3NwYWNlXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVGFiXCJdID0gMl0gPSBcIlRhYlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkVudGVyXCJdID0gM10gPSBcIkVudGVyXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiU2hpZnRcIl0gPSA0XSA9IFwiU2hpZnRcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJDdHJsXCJdID0gNV0gPSBcIkN0cmxcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJBbHRcIl0gPSA2XSA9IFwiQWx0XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiUGF1c2VCcmVha1wiXSA9IDddID0gXCJQYXVzZUJyZWFrXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiQ2Fwc0xvY2tcIl0gPSA4XSA9IFwiQ2Fwc0xvY2tcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJFc2NhcGVcIl0gPSA5XSA9IFwiRXNjYXBlXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiU3BhY2VcIl0gPSAxMF0gPSBcIlNwYWNlXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiUGFnZVVwXCJdID0gMTFdID0gXCJQYWdlVXBcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJQYWdlRG93blwiXSA9IDEyXSA9IFwiUGFnZURvd25cIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJFbmRcIl0gPSAxM10gPSBcIkVuZFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkhvbWVcIl0gPSAxNF0gPSBcIkhvbWVcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJMZWZ0QXJyb3dcIl0gPSAxNV0gPSBcIkxlZnRBcnJvd1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVwQXJyb3dcIl0gPSAxNl0gPSBcIlVwQXJyb3dcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJSaWdodEFycm93XCJdID0gMTddID0gXCJSaWdodEFycm93XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRG93bkFycm93XCJdID0gMThdID0gXCJEb3duQXJyb3dcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJJbnNlcnRcIl0gPSAxOV0gPSBcIkluc2VydFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkRlbGV0ZVwiXSA9IDIwXSA9IFwiRGVsZXRlXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzBcIl0gPSAyMV0gPSBcIktFWV8wXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzFcIl0gPSAyMl0gPSBcIktFWV8xXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzJcIl0gPSAyM10gPSBcIktFWV8yXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzNcIl0gPSAyNF0gPSBcIktFWV8zXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzRcIl0gPSAyNV0gPSBcIktFWV80XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzVcIl0gPSAyNl0gPSBcIktFWV81XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzZcIl0gPSAyN10gPSBcIktFWV82XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzdcIl0gPSAyOF0gPSBcIktFWV83XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzhcIl0gPSAyOV0gPSBcIktFWV84XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZXzlcIl0gPSAzMF0gPSBcIktFWV85XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0FcIl0gPSAzMV0gPSBcIktFWV9BXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0JcIl0gPSAzMl0gPSBcIktFWV9CXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0NcIl0gPSAzM10gPSBcIktFWV9DXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0RcIl0gPSAzNF0gPSBcIktFWV9EXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0VcIl0gPSAzNV0gPSBcIktFWV9FXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0ZcIl0gPSAzNl0gPSBcIktFWV9GXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0dcIl0gPSAzN10gPSBcIktFWV9HXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0hcIl0gPSAzOF0gPSBcIktFWV9IXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0lcIl0gPSAzOV0gPSBcIktFWV9JXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0pcIl0gPSA0MF0gPSBcIktFWV9KXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0tcIl0gPSA0MV0gPSBcIktFWV9LXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX0xcIl0gPSA0Ml0gPSBcIktFWV9MXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX01cIl0gPSA0M10gPSBcIktFWV9NXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX05cIl0gPSA0NF0gPSBcIktFWV9OXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX09cIl0gPSA0NV0gPSBcIktFWV9PXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1BcIl0gPSA0Nl0gPSBcIktFWV9QXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1FcIl0gPSA0N10gPSBcIktFWV9RXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1JcIl0gPSA0OF0gPSBcIktFWV9SXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1NcIl0gPSA0OV0gPSBcIktFWV9TXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1RcIl0gPSA1MF0gPSBcIktFWV9UXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1VcIl0gPSA1MV0gPSBcIktFWV9VXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1ZcIl0gPSA1Ml0gPSBcIktFWV9WXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1dcIl0gPSA1M10gPSBcIktFWV9XXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1hcIl0gPSA1NF0gPSBcIktFWV9YXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1lcIl0gPSA1NV0gPSBcIktFWV9ZXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiS0VZX1pcIl0gPSA1Nl0gPSBcIktFWV9aXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTWV0YVwiXSA9IDU3XSA9IFwiTWV0YVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkNvbnRleHRNZW51XCJdID0gNThdID0gXCJDb250ZXh0TWVudVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxXCJdID0gNTldID0gXCJGMVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYyXCJdID0gNjBdID0gXCJGMlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYzXCJdID0gNjFdID0gXCJGM1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkY0XCJdID0gNjJdID0gXCJGNFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkY1XCJdID0gNjNdID0gXCJGNVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkY2XCJdID0gNjRdID0gXCJGNlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkY3XCJdID0gNjVdID0gXCJGN1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkY4XCJdID0gNjZdID0gXCJGOFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkY5XCJdID0gNjddID0gXCJGOVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxMFwiXSA9IDY4XSA9IFwiRjEwXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjExXCJdID0gNjldID0gXCJGMTFcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJGMTJcIl0gPSA3MF0gPSBcIkYxMlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxM1wiXSA9IDcxXSA9IFwiRjEzXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjE0XCJdID0gNzJdID0gXCJGMTRcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJGMTVcIl0gPSA3M10gPSBcIkYxNVwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxNlwiXSA9IDc0XSA9IFwiRjE2XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiRjE3XCJdID0gNzVdID0gXCJGMTdcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJGMThcIl0gPSA3Nl0gPSBcIkYxOFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkYxOVwiXSA9IDc3XSA9IFwiRjE5XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTnVtTG9ja1wiXSA9IDc4XSA9IFwiTnVtTG9ja1wiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlNjcm9sbExvY2tcIl0gPSA3OV0gPSBcIlNjcm9sbExvY2tcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBtaXNjZWxsYW5lb3VzIGNoYXJhY3RlcnM7IGl0IGNhbiB2YXJ5IGJ5IGtleWJvYXJkLlxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnOzonIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX1NFTUlDT0xPTlwiXSA9IDgwXSA9IFwiVVNfU0VNSUNPTE9OXCI7XG4gICAgLyoqXG4gICAgICogRm9yIGFueSBjb3VudHJ5L3JlZ2lvbiwgdGhlICcrJyBrZXlcbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJz0rJyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19FUVVBTFwiXSA9IDgxXSA9IFwiVVNfRVFVQUxcIjtcbiAgICAvKipcbiAgICAgKiBGb3IgYW55IGNvdW50cnkvcmVnaW9uLCB0aGUgJywnIGtleVxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnLDwnIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX0NPTU1BXCJdID0gODJdID0gXCJVU19DT01NQVwiO1xuICAgIC8qKlxuICAgICAqIEZvciBhbnkgY291bnRyeS9yZWdpb24sIHRoZSAnLScga2V5XG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICctXycga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfTUlOVVNcIl0gPSA4M10gPSBcIlVTX01JTlVTXCI7XG4gICAgLyoqXG4gICAgICogRm9yIGFueSBjb3VudHJ5L3JlZ2lvbiwgdGhlICcuJyBrZXlcbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJy4+JyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19ET1RcIl0gPSA4NF0gPSBcIlVTX0RPVFwiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIG1pc2NlbGxhbmVvdXMgY2hhcmFjdGVyczsgaXQgY2FuIHZhcnkgYnkga2V5Ym9hcmQuXG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICcvPycga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfU0xBU0hcIl0gPSA4NV0gPSBcIlVTX1NMQVNIXCI7XG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgbWlzY2VsbGFuZW91cyBjaGFyYWN0ZXJzOyBpdCBjYW4gdmFyeSBieSBrZXlib2FyZC5cbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJ2B+JyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19CQUNLVElDS1wiXSA9IDg2XSA9IFwiVVNfQkFDS1RJQ0tcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBtaXNjZWxsYW5lb3VzIGNoYXJhY3RlcnM7IGl0IGNhbiB2YXJ5IGJ5IGtleWJvYXJkLlxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnW3snIGtleVxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIlVTX09QRU5fU1FVQVJFX0JSQUNLRVRcIl0gPSA4N10gPSBcIlVTX09QRU5fU1FVQVJFX0JSQUNLRVRcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBtaXNjZWxsYW5lb3VzIGNoYXJhY3RlcnM7IGl0IGNhbiB2YXJ5IGJ5IGtleWJvYXJkLlxuICAgICAqIEZvciB0aGUgVVMgc3RhbmRhcmQga2V5Ym9hcmQsIHRoZSAnXFx8JyBrZXlcbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJVU19CQUNLU0xBU0hcIl0gPSA4OF0gPSBcIlVTX0JBQ0tTTEFTSFwiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIG1pc2NlbGxhbmVvdXMgY2hhcmFjdGVyczsgaXQgY2FuIHZhcnkgYnkga2V5Ym9hcmQuXG4gICAgICogRm9yIHRoZSBVUyBzdGFuZGFyZCBrZXlib2FyZCwgdGhlICddfScga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfQ0xPU0VfU1FVQVJFX0JSQUNLRVRcIl0gPSA4OV0gPSBcIlVTX0NMT1NFX1NRVUFSRV9CUkFDS0VUXCI7XG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgbWlzY2VsbGFuZW91cyBjaGFyYWN0ZXJzOyBpdCBjYW4gdmFyeSBieSBrZXlib2FyZC5cbiAgICAgKiBGb3IgdGhlIFVTIHN0YW5kYXJkIGtleWJvYXJkLCB0aGUgJydcIicga2V5XG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiVVNfUVVPVEVcIl0gPSA5MF0gPSBcIlVTX1FVT1RFXCI7XG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgbWlzY2VsbGFuZW91cyBjaGFyYWN0ZXJzOyBpdCBjYW4gdmFyeSBieSBrZXlib2FyZC5cbiAgICAgKi9cbiAgICBLZXlDb2RlW0tleUNvZGVbXCJPRU1fOFwiXSA9IDkxXSA9IFwiT0VNXzhcIjtcbiAgICAvKipcbiAgICAgKiBFaXRoZXIgdGhlIGFuZ2xlIGJyYWNrZXQga2V5IG9yIHRoZSBiYWNrc2xhc2gga2V5IG9uIHRoZSBSVCAxMDIta2V5IGtleWJvYXJkLlxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk9FTV8xMDJcIl0gPSA5Ml0gPSBcIk9FTV8xMDJcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfMFwiXSA9IDkzXSA9IFwiTlVNUEFEXzBcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfMVwiXSA9IDk0XSA9IFwiTlVNUEFEXzFcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfMlwiXSA9IDk1XSA9IFwiTlVNUEFEXzJcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfM1wiXSA9IDk2XSA9IFwiTlVNUEFEXzNcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfNFwiXSA9IDk3XSA9IFwiTlVNUEFEXzRcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfNVwiXSA9IDk4XSA9IFwiTlVNUEFEXzVcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfNlwiXSA9IDk5XSA9IFwiTlVNUEFEXzZcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfN1wiXSA9IDEwMF0gPSBcIk5VTVBBRF83XCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTlVNUEFEXzhcIl0gPSAxMDFdID0gXCJOVU1QQURfOFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF85XCJdID0gMTAyXSA9IFwiTlVNUEFEXzlcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfTVVMVElQTFlcIl0gPSAxMDNdID0gXCJOVU1QQURfTVVMVElQTFlcIjtcbiAgICBLZXlDb2RlW0tleUNvZGVbXCJOVU1QQURfQUREXCJdID0gMTA0XSA9IFwiTlVNUEFEX0FERFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF9TRVBBUkFUT1JcIl0gPSAxMDVdID0gXCJOVU1QQURfU0VQQVJBVE9SXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTlVNUEFEX1NVQlRSQUNUXCJdID0gMTA2XSA9IFwiTlVNUEFEX1NVQlRSQUNUXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTlVNUEFEX0RFQ0lNQUxcIl0gPSAxMDddID0gXCJOVU1QQURfREVDSU1BTFwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIk5VTVBBRF9ESVZJREVcIl0gPSAxMDhdID0gXCJOVU1QQURfRElWSURFXCI7XG4gICAgLyoqXG4gICAgICogQ292ZXIgYWxsIGtleSBjb2RlcyB3aGVuIElNRSBpcyBwcm9jZXNzaW5nIGlucHV0LlxuICAgICAqL1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIktFWV9JTl9DT01QT1NJVElPTlwiXSA9IDEwOV0gPSBcIktFWV9JTl9DT01QT1NJVElPTlwiO1xuICAgIEtleUNvZGVbS2V5Q29kZVtcIkFCTlRfQzFcIl0gPSAxMTBdID0gXCJBQk5UX0MxXCI7XG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiQUJOVF9DMlwiXSA9IDExMV0gPSBcIkFCTlRfQzJcIjtcbiAgICAvKipcbiAgICAgKiBQbGFjZWQgbGFzdCB0byBjb3ZlciB0aGUgbGVuZ3RoIG9mIHRoZSBlbnVtLlxuICAgICAqIFBsZWFzZSBkbyBub3QgZGVwZW5kIG9uIHRoaXMgdmFsdWUhXG4gICAgICovXG4gICAgS2V5Q29kZVtLZXlDb2RlW1wiTUFYX1ZBTFVFXCJdID0gMTEyXSA9IFwiTUFYX1ZBTFVFXCI7XG59KShLZXlDb2RlIHx8IChLZXlDb2RlID0ge30pKTtcbi8qKlxuICogVGhlIGRpcmVjdGlvbiBvZiBhIHNlbGVjdGlvbi5cbiAqL1xuZXhwb3J0IHZhciBTZWxlY3Rpb25EaXJlY3Rpb247XG4oZnVuY3Rpb24gKFNlbGVjdGlvbkRpcmVjdGlvbikge1xuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3Rpb24gc3RhcnRzIGFib3ZlIHdoZXJlIGl0IGVuZHMuXG4gICAgICovXG4gICAgU2VsZWN0aW9uRGlyZWN0aW9uW1NlbGVjdGlvbkRpcmVjdGlvbltcIkxUUlwiXSA9IDBdID0gXCJMVFJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgc2VsZWN0aW9uIHN0YXJ0cyBiZWxvdyB3aGVyZSBpdCBlbmRzLlxuICAgICAqL1xuICAgIFNlbGVjdGlvbkRpcmVjdGlvbltTZWxlY3Rpb25EaXJlY3Rpb25bXCJSVExcIl0gPSAxXSA9IFwiUlRMXCI7XG59KShTZWxlY3Rpb25EaXJlY3Rpb24gfHwgKFNlbGVjdGlvbkRpcmVjdGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIFNjcm9sbGJhclZpc2liaWxpdHk7XG4oZnVuY3Rpb24gKFNjcm9sbGJhclZpc2liaWxpdHkpIHtcbiAgICBTY3JvbGxiYXJWaXNpYmlsaXR5W1Njcm9sbGJhclZpc2liaWxpdHlbXCJBdXRvXCJdID0gMV0gPSBcIkF1dG9cIjtcbiAgICBTY3JvbGxiYXJWaXNpYmlsaXR5W1Njcm9sbGJhclZpc2liaWxpdHlbXCJIaWRkZW5cIl0gPSAyXSA9IFwiSGlkZGVuXCI7XG4gICAgU2Nyb2xsYmFyVmlzaWJpbGl0eVtTY3JvbGxiYXJWaXNpYmlsaXR5W1wiVmlzaWJsZVwiXSA9IDNdID0gXCJWaXNpYmxlXCI7XG59KShTY3JvbGxiYXJWaXNpYmlsaXR5IHx8IChTY3JvbGxiYXJWaXNpYmlsaXR5ID0ge30pKTtcbi8qKlxuICogVmVydGljYWwgTGFuZSBpbiB0aGUgb3ZlcnZpZXcgcnVsZXIgb2YgdGhlIGVkaXRvci5cbiAqL1xuZXhwb3J0IHZhciBPdmVydmlld1J1bGVyTGFuZTtcbihmdW5jdGlvbiAoT3ZlcnZpZXdSdWxlckxhbmUpIHtcbiAgICBPdmVydmlld1J1bGVyTGFuZVtPdmVydmlld1J1bGVyTGFuZVtcIkxlZnRcIl0gPSAxXSA9IFwiTGVmdFwiO1xuICAgIE92ZXJ2aWV3UnVsZXJMYW5lW092ZXJ2aWV3UnVsZXJMYW5lW1wiQ2VudGVyXCJdID0gMl0gPSBcIkNlbnRlclwiO1xuICAgIE92ZXJ2aWV3UnVsZXJMYW5lW092ZXJ2aWV3UnVsZXJMYW5lW1wiUmlnaHRcIl0gPSA0XSA9IFwiUmlnaHRcIjtcbiAgICBPdmVydmlld1J1bGVyTGFuZVtPdmVydmlld1J1bGVyTGFuZVtcIkZ1bGxcIl0gPSA3XSA9IFwiRnVsbFwiO1xufSkoT3ZlcnZpZXdSdWxlckxhbmUgfHwgKE92ZXJ2aWV3UnVsZXJMYW5lID0ge30pKTtcbi8qKlxuICogRW5kIG9mIGxpbmUgY2hhcmFjdGVyIHByZWZlcmVuY2UuXG4gKi9cbmV4cG9ydCB2YXIgRW5kT2ZMaW5lUHJlZmVyZW5jZTtcbihmdW5jdGlvbiAoRW5kT2ZMaW5lUHJlZmVyZW5jZSkge1xuICAgIC8qKlxuICAgICAqIFVzZSB0aGUgZW5kIG9mIGxpbmUgY2hhcmFjdGVyIGlkZW50aWZpZWQgaW4gdGhlIHRleHQgYnVmZmVyLlxuICAgICAqL1xuICAgIEVuZE9mTGluZVByZWZlcmVuY2VbRW5kT2ZMaW5lUHJlZmVyZW5jZVtcIlRleHREZWZpbmVkXCJdID0gMF0gPSBcIlRleHREZWZpbmVkXCI7XG4gICAgLyoqXG4gICAgICogVXNlIGxpbmUgZmVlZCAoXFxuKSBhcyB0aGUgZW5kIG9mIGxpbmUgY2hhcmFjdGVyLlxuICAgICAqL1xuICAgIEVuZE9mTGluZVByZWZlcmVuY2VbRW5kT2ZMaW5lUHJlZmVyZW5jZVtcIkxGXCJdID0gMV0gPSBcIkxGXCI7XG4gICAgLyoqXG4gICAgICogVXNlIGNhcnJpYWdlIHJldHVybiBhbmQgbGluZSBmZWVkIChcXHJcXG4pIGFzIHRoZSBlbmQgb2YgbGluZSBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgRW5kT2ZMaW5lUHJlZmVyZW5jZVtFbmRPZkxpbmVQcmVmZXJlbmNlW1wiQ1JMRlwiXSA9IDJdID0gXCJDUkxGXCI7XG59KShFbmRPZkxpbmVQcmVmZXJlbmNlIHx8IChFbmRPZkxpbmVQcmVmZXJlbmNlID0ge30pKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgZW5kIG9mIGxpbmUgdG8gdXNlIHdoZW4gaW5zdGFudGlhdGluZyBtb2RlbHMuXG4gKi9cbmV4cG9ydCB2YXIgRGVmYXVsdEVuZE9mTGluZTtcbihmdW5jdGlvbiAoRGVmYXVsdEVuZE9mTGluZSkge1xuICAgIC8qKlxuICAgICAqIFVzZSBsaW5lIGZlZWQgKFxcbikgYXMgdGhlIGVuZCBvZiBsaW5lIGNoYXJhY3Rlci5cbiAgICAgKi9cbiAgICBEZWZhdWx0RW5kT2ZMaW5lW0RlZmF1bHRFbmRPZkxpbmVbXCJMRlwiXSA9IDFdID0gXCJMRlwiO1xuICAgIC8qKlxuICAgICAqIFVzZSBjYXJyaWFnZSByZXR1cm4gYW5kIGxpbmUgZmVlZCAoXFxyXFxuKSBhcyB0aGUgZW5kIG9mIGxpbmUgY2hhcmFjdGVyLlxuICAgICAqL1xuICAgIERlZmF1bHRFbmRPZkxpbmVbRGVmYXVsdEVuZE9mTGluZVtcIkNSTEZcIl0gPSAyXSA9IFwiQ1JMRlwiO1xufSkoRGVmYXVsdEVuZE9mTGluZSB8fCAoRGVmYXVsdEVuZE9mTGluZSA9IHt9KSk7XG4vKipcbiAqIEVuZCBvZiBsaW5lIGNoYXJhY3RlciBwcmVmZXJlbmNlLlxuICovXG5leHBvcnQgdmFyIEVuZE9mTGluZVNlcXVlbmNlO1xuKGZ1bmN0aW9uIChFbmRPZkxpbmVTZXF1ZW5jZSkge1xuICAgIC8qKlxuICAgICAqIFVzZSBsaW5lIGZlZWQgKFxcbikgYXMgdGhlIGVuZCBvZiBsaW5lIGNoYXJhY3Rlci5cbiAgICAgKi9cbiAgICBFbmRPZkxpbmVTZXF1ZW5jZVtFbmRPZkxpbmVTZXF1ZW5jZVtcIkxGXCJdID0gMF0gPSBcIkxGXCI7XG4gICAgLyoqXG4gICAgICogVXNlIGNhcnJpYWdlIHJldHVybiBhbmQgbGluZSBmZWVkIChcXHJcXG4pIGFzIHRoZSBlbmQgb2YgbGluZSBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgRW5kT2ZMaW5lU2VxdWVuY2VbRW5kT2ZMaW5lU2VxdWVuY2VbXCJDUkxGXCJdID0gMV0gPSBcIkNSTEZcIjtcbn0pKEVuZE9mTGluZVNlcXVlbmNlIHx8IChFbmRPZkxpbmVTZXF1ZW5jZSA9IHt9KSk7XG4vKipcbiAqIERlc2NyaWJlcyB0aGUgYmVoYXZpb3Igb2YgZGVjb3JhdGlvbnMgd2hlbiB0eXBpbmcvZWRpdGluZyBuZWFyIHRoZWlyIGVkZ2VzLlxuICogTm90ZTogUGxlYXNlIGRvIG5vdCBlZGl0IHRoZSB2YWx1ZXMsIGFzIHRoZXkgdmVyeSBjYXJlZnVsbHkgbWF0Y2ggYERlY29yYXRpb25SYW5nZUJlaGF2aW9yYFxuICovXG5leHBvcnQgdmFyIFRyYWNrZWRSYW5nZVN0aWNraW5lc3M7XG4oZnVuY3Rpb24gKFRyYWNrZWRSYW5nZVN0aWNraW5lc3MpIHtcbiAgICBUcmFja2VkUmFuZ2VTdGlja2luZXNzW1RyYWNrZWRSYW5nZVN0aWNraW5lc3NbXCJBbHdheXNHcm93c1doZW5UeXBpbmdBdEVkZ2VzXCJdID0gMF0gPSBcIkFsd2F5c0dyb3dzV2hlblR5cGluZ0F0RWRnZXNcIjtcbiAgICBUcmFja2VkUmFuZ2VTdGlja2luZXNzW1RyYWNrZWRSYW5nZVN0aWNraW5lc3NbXCJOZXZlckdyb3dzV2hlblR5cGluZ0F0RWRnZXNcIl0gPSAxXSA9IFwiTmV2ZXJHcm93c1doZW5UeXBpbmdBdEVkZ2VzXCI7XG4gICAgVHJhY2tlZFJhbmdlU3RpY2tpbmVzc1tUcmFja2VkUmFuZ2VTdGlja2luZXNzW1wiR3Jvd3NPbmx5V2hlblR5cGluZ0JlZm9yZVwiXSA9IDJdID0gXCJHcm93c09ubHlXaGVuVHlwaW5nQmVmb3JlXCI7XG4gICAgVHJhY2tlZFJhbmdlU3RpY2tpbmVzc1tUcmFja2VkUmFuZ2VTdGlja2luZXNzW1wiR3Jvd3NPbmx5V2hlblR5cGluZ0FmdGVyXCJdID0gM10gPSBcIkdyb3dzT25seVdoZW5UeXBpbmdBZnRlclwiO1xufSkoVHJhY2tlZFJhbmdlU3RpY2tpbmVzcyB8fCAoVHJhY2tlZFJhbmdlU3RpY2tpbmVzcyA9IHt9KSk7XG5leHBvcnQgdmFyIFNjcm9sbFR5cGU7XG4oZnVuY3Rpb24gKFNjcm9sbFR5cGUpIHtcbiAgICBTY3JvbGxUeXBlW1Njcm9sbFR5cGVbXCJTbW9vdGhcIl0gPSAwXSA9IFwiU21vb3RoXCI7XG4gICAgU2Nyb2xsVHlwZVtTY3JvbGxUeXBlW1wiSW1tZWRpYXRlXCJdID0gMV0gPSBcIkltbWVkaWF0ZVwiO1xufSkoU2Nyb2xsVHlwZSB8fCAoU2Nyb2xsVHlwZSA9IHt9KSk7XG4vKipcbiAqIERlc2NyaWJlcyB0aGUgcmVhc29uIHRoZSBjdXJzb3IgaGFzIGNoYW5nZWQgaXRzIHBvc2l0aW9uLlxuICovXG5leHBvcnQgdmFyIEN1cnNvckNoYW5nZVJlYXNvbjtcbihmdW5jdGlvbiAoQ3Vyc29yQ2hhbmdlUmVhc29uKSB7XG4gICAgLyoqXG4gICAgICogVW5rbm93biBvciBub3Qgc2V0LlxuICAgICAqL1xuICAgIEN1cnNvckNoYW5nZVJlYXNvbltDdXJzb3JDaGFuZ2VSZWFzb25bXCJOb3RTZXRcIl0gPSAwXSA9IFwiTm90U2V0XCI7XG4gICAgLyoqXG4gICAgICogQSBgbW9kZWwuc2V0VmFsdWUoKWAgd2FzIGNhbGxlZC5cbiAgICAgKi9cbiAgICBDdXJzb3JDaGFuZ2VSZWFzb25bQ3Vyc29yQ2hhbmdlUmVhc29uW1wiQ29udGVudEZsdXNoXCJdID0gMV0gPSBcIkNvbnRlbnRGbHVzaFwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBgbW9kZWxgIGhhcyBiZWVuIGNoYW5nZWQgb3V0c2lkZSBvZiB0aGlzIGN1cnNvciBhbmQgdGhlIGN1cnNvciByZWNvdmVycyBpdHMgcG9zaXRpb24gZnJvbSBhc3NvY2lhdGVkIG1hcmtlcnMuXG4gICAgICovXG4gICAgQ3Vyc29yQ2hhbmdlUmVhc29uW0N1cnNvckNoYW5nZVJlYXNvbltcIlJlY292ZXJGcm9tTWFya2Vyc1wiXSA9IDJdID0gXCJSZWNvdmVyRnJvbU1hcmtlcnNcIjtcbiAgICAvKipcbiAgICAgKiBUaGVyZSB3YXMgYW4gZXhwbGljaXQgdXNlciBnZXN0dXJlLlxuICAgICAqL1xuICAgIEN1cnNvckNoYW5nZVJlYXNvbltDdXJzb3JDaGFuZ2VSZWFzb25bXCJFeHBsaWNpdFwiXSA9IDNdID0gXCJFeHBsaWNpdFwiO1xuICAgIC8qKlxuICAgICAqIFRoZXJlIHdhcyBhIFBhc3RlLlxuICAgICAqL1xuICAgIEN1cnNvckNoYW5nZVJlYXNvbltDdXJzb3JDaGFuZ2VSZWFzb25bXCJQYXN0ZVwiXSA9IDRdID0gXCJQYXN0ZVwiO1xuICAgIC8qKlxuICAgICAqIFRoZXJlIHdhcyBhbiBVbmRvLlxuICAgICAqL1xuICAgIEN1cnNvckNoYW5nZVJlYXNvbltDdXJzb3JDaGFuZ2VSZWFzb25bXCJVbmRvXCJdID0gNV0gPSBcIlVuZG9cIjtcbiAgICAvKipcbiAgICAgKiBUaGVyZSB3YXMgYSBSZWRvLlxuICAgICAqL1xuICAgIEN1cnNvckNoYW5nZVJlYXNvbltDdXJzb3JDaGFuZ2VSZWFzb25bXCJSZWRvXCJdID0gNl0gPSBcIlJlZG9cIjtcbn0pKEN1cnNvckNoYW5nZVJlYXNvbiB8fCAoQ3Vyc29yQ2hhbmdlUmVhc29uID0ge30pKTtcbmV4cG9ydCB2YXIgUmVuZGVyTWluaW1hcDtcbihmdW5jdGlvbiAoUmVuZGVyTWluaW1hcCkge1xuICAgIFJlbmRlck1pbmltYXBbUmVuZGVyTWluaW1hcFtcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xuICAgIFJlbmRlck1pbmltYXBbUmVuZGVyTWluaW1hcFtcIlNtYWxsXCJdID0gMV0gPSBcIlNtYWxsXCI7XG4gICAgUmVuZGVyTWluaW1hcFtSZW5kZXJNaW5pbWFwW1wiTGFyZ2VcIl0gPSAyXSA9IFwiTGFyZ2VcIjtcbiAgICBSZW5kZXJNaW5pbWFwW1JlbmRlck1pbmltYXBbXCJTbWFsbEJsb2Nrc1wiXSA9IDNdID0gXCJTbWFsbEJsb2Nrc1wiO1xuICAgIFJlbmRlck1pbmltYXBbUmVuZGVyTWluaW1hcFtcIkxhcmdlQmxvY2tzXCJdID0gNF0gPSBcIkxhcmdlQmxvY2tzXCI7XG59KShSZW5kZXJNaW5pbWFwIHx8IChSZW5kZXJNaW5pbWFwID0ge30pKTtcbi8qKlxuICogRGVzY3JpYmVzIGhvdyB0byBpbmRlbnQgd3JhcHBlZCBsaW5lcy5cbiAqL1xuZXhwb3J0IHZhciBXcmFwcGluZ0luZGVudDtcbihmdW5jdGlvbiAoV3JhcHBpbmdJbmRlbnQpIHtcbiAgICAvKipcbiAgICAgKiBObyBpbmRlbnRhdGlvbiA9PiB3cmFwcGVkIGxpbmVzIGJlZ2luIGF0IGNvbHVtbiAxLlxuICAgICAqL1xuICAgIFdyYXBwaW5nSW5kZW50W1dyYXBwaW5nSW5kZW50W1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XG4gICAgLyoqXG4gICAgICogU2FtZSA9PiB3cmFwcGVkIGxpbmVzIGdldCB0aGUgc2FtZSBpbmRlbnRhdGlvbiBhcyB0aGUgcGFyZW50LlxuICAgICAqL1xuICAgIFdyYXBwaW5nSW5kZW50W1dyYXBwaW5nSW5kZW50W1wiU2FtZVwiXSA9IDFdID0gXCJTYW1lXCI7XG4gICAgLyoqXG4gICAgICogSW5kZW50ID0+IHdyYXBwZWQgbGluZXMgZ2V0ICsxIGluZGVudGF0aW9uIHRvd2FyZCB0aGUgcGFyZW50LlxuICAgICAqL1xuICAgIFdyYXBwaW5nSW5kZW50W1dyYXBwaW5nSW5kZW50W1wiSW5kZW50XCJdID0gMl0gPSBcIkluZGVudFwiO1xuICAgIC8qKlxuICAgICAqIERlZXBJbmRlbnQgPT4gd3JhcHBlZCBsaW5lcyBnZXQgKzIgaW5kZW50YXRpb24gdG93YXJkIHRoZSBwYXJlbnQuXG4gICAgICovXG4gICAgV3JhcHBpbmdJbmRlbnRbV3JhcHBpbmdJbmRlbnRbXCJEZWVwSW5kZW50XCJdID0gM10gPSBcIkRlZXBJbmRlbnRcIjtcbn0pKFdyYXBwaW5nSW5kZW50IHx8IChXcmFwcGluZ0luZGVudCA9IHt9KSk7XG4vKipcbiAqIFRoZSBraW5kIG9mIGFuaW1hdGlvbiBpbiB3aGljaCB0aGUgZWRpdG9yJ3MgY3Vyc29yIHNob3VsZCBiZSByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZTtcbihmdW5jdGlvbiAoVGV4dEVkaXRvckN1cnNvckJsaW5raW5nU3R5bGUpIHtcbiAgICAvKipcbiAgICAgKiBIaWRkZW5cbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtcIkhpZGRlblwiXSA9IDBdID0gXCJIaWRkZW5cIjtcbiAgICAvKipcbiAgICAgKiBCbGlua2luZ1xuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1RleHRFZGl0b3JDdXJzb3JCbGlua2luZ1N0eWxlW1wiQmxpbmtcIl0gPSAxXSA9IFwiQmxpbmtcIjtcbiAgICAvKipcbiAgICAgKiBCbGlua2luZyB3aXRoIHNtb290aCBmYWRpbmdcbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtcIlNtb290aFwiXSA9IDJdID0gXCJTbW9vdGhcIjtcbiAgICAvKipcbiAgICAgKiBCbGlua2luZyB3aXRoIHByb2xvbmdlZCBmaWxsZWQgc3RhdGUgYW5kIHNtb290aCBmYWRpbmdcbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtcIlBoYXNlXCJdID0gM10gPSBcIlBoYXNlXCI7XG4gICAgLyoqXG4gICAgICogRXhwYW5kIGNvbGxhcHNlIGFuaW1hdGlvbiBvbiB0aGUgeSBheGlzXG4gICAgICovXG4gICAgVGV4dEVkaXRvckN1cnNvckJsaW5raW5nU3R5bGVbVGV4dEVkaXRvckN1cnNvckJsaW5raW5nU3R5bGVbXCJFeHBhbmRcIl0gPSA0XSA9IFwiRXhwYW5kXCI7XG4gICAgLyoqXG4gICAgICogTm8tQmxpbmtpbmdcbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZVtcIlNvbGlkXCJdID0gNV0gPSBcIlNvbGlkXCI7XG59KShUZXh0RWRpdG9yQ3Vyc29yQmxpbmtpbmdTdHlsZSB8fCAoVGV4dEVkaXRvckN1cnNvckJsaW5raW5nU3R5bGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgc3R5bGUgaW4gd2hpY2ggdGhlIGVkaXRvcidzIGN1cnNvciBzaG91bGQgYmUgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dEVkaXRvckN1cnNvclN0eWxlO1xuKGZ1bmN0aW9uIChUZXh0RWRpdG9yQ3Vyc29yU3R5bGUpIHtcbiAgICAvKipcbiAgICAgKiBBcyBhIHZlcnRpY2FsIGxpbmUgKHNpdHRpbmcgYmV0d2VlbiB0d28gY2hhcmFjdGVycykuXG4gICAgICovXG4gICAgVGV4dEVkaXRvckN1cnNvclN0eWxlW1RleHRFZGl0b3JDdXJzb3JTdHlsZVtcIkxpbmVcIl0gPSAxXSA9IFwiTGluZVwiO1xuICAgIC8qKlxuICAgICAqIEFzIGEgYmxvY2sgKHNpdHRpbmcgb24gdG9wIG9mIGEgY2hhcmFjdGVyKS5cbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbVGV4dEVkaXRvckN1cnNvclN0eWxlW1wiQmxvY2tcIl0gPSAyXSA9IFwiQmxvY2tcIjtcbiAgICAvKipcbiAgICAgKiBBcyBhIGhvcml6b250YWwgbGluZSAoc2l0dGluZyB1bmRlciBhIGNoYXJhY3RlcikuXG4gICAgICovXG4gICAgVGV4dEVkaXRvckN1cnNvclN0eWxlW1RleHRFZGl0b3JDdXJzb3JTdHlsZVtcIlVuZGVybGluZVwiXSA9IDNdID0gXCJVbmRlcmxpbmVcIjtcbiAgICAvKipcbiAgICAgKiBBcyBhIHRoaW4gdmVydGljYWwgbGluZSAoc2l0dGluZyBiZXR3ZWVuIHR3byBjaGFyYWN0ZXJzKS5cbiAgICAgKi9cbiAgICBUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbVGV4dEVkaXRvckN1cnNvclN0eWxlW1wiTGluZVRoaW5cIl0gPSA0XSA9IFwiTGluZVRoaW5cIjtcbiAgICAvKipcbiAgICAgKiBBcyBhbiBvdXRsaW5lZCBibG9jayAoc2l0dGluZyBvbiB0b3Agb2YgYSBjaGFyYWN0ZXIpLlxuICAgICAqL1xuICAgIFRleHRFZGl0b3JDdXJzb3JTdHlsZVtUZXh0RWRpdG9yQ3Vyc29yU3R5bGVbXCJCbG9ja091dGxpbmVcIl0gPSA1XSA9IFwiQmxvY2tPdXRsaW5lXCI7XG4gICAgLyoqXG4gICAgICogQXMgYSB0aGluIGhvcml6b250YWwgbGluZSAoc2l0dGluZyB1bmRlciBhIGNoYXJhY3RlcikuXG4gICAgICovXG4gICAgVGV4dEVkaXRvckN1cnNvclN0eWxlW1RleHRFZGl0b3JDdXJzb3JTdHlsZVtcIlVuZGVybGluZVRoaW5cIl0gPSA2XSA9IFwiVW5kZXJsaW5lVGhpblwiO1xufSkoVGV4dEVkaXRvckN1cnNvclN0eWxlIHx8IChUZXh0RWRpdG9yQ3Vyc29yU3R5bGUgPSB7fSkpO1xuZXhwb3J0IHZhciBSZW5kZXJMaW5lTnVtYmVyc1R5cGU7XG4oZnVuY3Rpb24gKFJlbmRlckxpbmVOdW1iZXJzVHlwZSkge1xuICAgIFJlbmRlckxpbmVOdW1iZXJzVHlwZVtSZW5kZXJMaW5lTnVtYmVyc1R5cGVbXCJPZmZcIl0gPSAwXSA9IFwiT2ZmXCI7XG4gICAgUmVuZGVyTGluZU51bWJlcnNUeXBlW1JlbmRlckxpbmVOdW1iZXJzVHlwZVtcIk9uXCJdID0gMV0gPSBcIk9uXCI7XG4gICAgUmVuZGVyTGluZU51bWJlcnNUeXBlW1JlbmRlckxpbmVOdW1iZXJzVHlwZVtcIlJlbGF0aXZlXCJdID0gMl0gPSBcIlJlbGF0aXZlXCI7XG4gICAgUmVuZGVyTGluZU51bWJlcnNUeXBlW1JlbmRlckxpbmVOdW1iZXJzVHlwZVtcIkludGVydmFsXCJdID0gM10gPSBcIkludGVydmFsXCI7XG4gICAgUmVuZGVyTGluZU51bWJlcnNUeXBlW1JlbmRlckxpbmVOdW1iZXJzVHlwZVtcIkN1c3RvbVwiXSA9IDRdID0gXCJDdXN0b21cIjtcbn0pKFJlbmRlckxpbmVOdW1iZXJzVHlwZSB8fCAoUmVuZGVyTGluZU51bWJlcnNUeXBlID0ge30pKTtcbi8qKlxuICogQSBwb3NpdGlvbmluZyBwcmVmZXJlbmNlIGZvciByZW5kZXJpbmcgY29udGVudCB3aWRnZXRzLlxuICovXG5leHBvcnQgdmFyIENvbnRlbnRXaWRnZXRQb3NpdGlvblByZWZlcmVuY2U7XG4oZnVuY3Rpb24gKENvbnRlbnRXaWRnZXRQb3NpdGlvblByZWZlcmVuY2UpIHtcbiAgICAvKipcbiAgICAgKiBQbGFjZSB0aGUgY29udGVudCB3aWRnZXQgZXhhY3RseSBhdCBhIHBvc2l0aW9uXG4gICAgICovXG4gICAgQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtDb250ZW50V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW1wiRVhBQ1RcIl0gPSAwXSA9IFwiRVhBQ1RcIjtcbiAgICAvKipcbiAgICAgKiBQbGFjZSB0aGUgY29udGVudCB3aWRnZXQgYWJvdmUgYSBwb3NpdGlvblxuICAgICAqL1xuICAgIENvbnRlbnRXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtcIkFCT1ZFXCJdID0gMV0gPSBcIkFCT1ZFXCI7XG4gICAgLyoqXG4gICAgICogUGxhY2UgdGhlIGNvbnRlbnQgd2lkZ2V0IGJlbG93IGEgcG9zaXRpb25cbiAgICAgKi9cbiAgICBDb250ZW50V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW0NvbnRlbnRXaWRnZXRQb3NpdGlvblByZWZlcmVuY2VbXCJCRUxPV1wiXSA9IDJdID0gXCJCRUxPV1wiO1xufSkoQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZSB8fCAoQ29udGVudFdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZSA9IHt9KSk7XG4vKipcbiAqIEEgcG9zaXRpb25pbmcgcHJlZmVyZW5jZSBmb3IgcmVuZGVyaW5nIG92ZXJsYXkgd2lkZ2V0cy5cbiAqL1xuZXhwb3J0IHZhciBPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlO1xuKGZ1bmN0aW9uIChPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlKSB7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gdGhlIG92ZXJsYXkgd2lkZ2V0IGluIHRoZSB0b3AgcmlnaHQgY29ybmVyXG4gICAgICovXG4gICAgT3ZlcmxheVdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW1wiVE9QX1JJR0hUX0NPUk5FUlwiXSA9IDBdID0gXCJUT1BfUklHSFRfQ09STkVSXCI7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gdGhlIG92ZXJsYXkgd2lkZ2V0IGluIHRoZSBib3R0b20gcmlnaHQgY29ybmVyXG4gICAgICovXG4gICAgT3ZlcmxheVdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW1wiQk9UVE9NX1JJR0hUX0NPUk5FUlwiXSA9IDFdID0gXCJCT1RUT01fUklHSFRfQ09STkVSXCI7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gdGhlIG92ZXJsYXkgd2lkZ2V0IGluIHRoZSB0b3AgY2VudGVyXG4gICAgICovXG4gICAgT3ZlcmxheVdpZGdldFBvc2l0aW9uUHJlZmVyZW5jZVtPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlW1wiVE9QX0NFTlRFUlwiXSA9IDJdID0gXCJUT1BfQ0VOVEVSXCI7XG59KShPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlIHx8IChPdmVybGF5V2lkZ2V0UG9zaXRpb25QcmVmZXJlbmNlID0ge30pKTtcbi8qKlxuICogVHlwZSBvZiBoaXQgZWxlbWVudCB3aXRoIHRoZSBtb3VzZSBpbiB0aGUgZWRpdG9yLlxuICovXG5leHBvcnQgdmFyIE1vdXNlVGFyZ2V0VHlwZTtcbihmdW5jdGlvbiAoTW91c2VUYXJnZXRUeXBlKSB7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIGFuIHVua25vd24gZWxlbWVudC5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiVU5LTk9XTlwiXSA9IDBdID0gXCJVTktOT1dOXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIHRoZSB0ZXh0YXJlYSB1c2VkIGZvciBpbnB1dC5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiVEVYVEFSRUFcIl0gPSAxXSA9IFwiVEVYVEFSRUFcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGhlIGdseXBoIG1hcmdpblxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJHVVRURVJfR0xZUEhfTUFSR0lOXCJdID0gMl0gPSBcIkdVVFRFUl9HTFlQSF9NQVJHSU5cIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGhlIGxpbmUgbnVtYmVyc1xuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJHVVRURVJfTElORV9OVU1CRVJTXCJdID0gM10gPSBcIkdVVFRFUl9MSU5FX05VTUJFUlNcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGhlIGxpbmUgZGVjb3JhdGlvbnNcbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiR1VUVEVSX0xJTkVfREVDT1JBVElPTlNcIl0gPSA0XSA9IFwiR1VUVEVSX0xJTkVfREVDT1JBVElPTlNcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGhlIHdoaXRlc3BhY2UgbGVmdCBpbiB0aGUgZ3V0dGVyIGJ5IGEgdmlldyB6b25lLlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJHVVRURVJfVklFV19aT05FXCJdID0gNV0gPSBcIkdVVFRFUl9WSUVXX1pPTkVcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgdGV4dCBpbiB0aGUgY29udGVudC5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiQ09OVEVOVF9URVhUXCJdID0gNl0gPSBcIkNPTlRFTlRfVEVYVFwiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiBlbXB0eSBzcGFjZSBpbiB0aGUgY29udGVudCAoZS5nLiBhZnRlciBsaW5lIHRleHQgb3IgYmVsb3cgbGFzdCBsaW5lKVxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJDT05URU5UX0VNUFRZXCJdID0gN10gPSBcIkNPTlRFTlRfRU1QVFlcIjtcbiAgICAvKipcbiAgICAgKiBNb3VzZSBpcyBvbiB0b3Agb2YgYSB2aWV3IHpvbmUgaW4gdGhlIGNvbnRlbnQuXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIkNPTlRFTlRfVklFV19aT05FXCJdID0gOF0gPSBcIkNPTlRFTlRfVklFV19aT05FXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIGEgY29udGVudCB3aWRnZXQuXG4gICAgICovXG4gICAgTW91c2VUYXJnZXRUeXBlW01vdXNlVGFyZ2V0VHlwZVtcIkNPTlRFTlRfV0lER0VUXCJdID0gOV0gPSBcIkNPTlRFTlRfV0lER0VUXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIHRoZSBkZWNvcmF0aW9ucyBvdmVydmlldyBydWxlci5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiT1ZFUlZJRVdfUlVMRVJcIl0gPSAxMF0gPSBcIk9WRVJWSUVXX1JVTEVSXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb24gdG9wIG9mIGEgc2Nyb2xsYmFyLlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJTQ1JPTExCQVJcIl0gPSAxMV0gPSBcIlNDUk9MTEJBUlwiO1xuICAgIC8qKlxuICAgICAqIE1vdXNlIGlzIG9uIHRvcCBvZiBhbiBvdmVybGF5IHdpZGdldC5cbiAgICAgKi9cbiAgICBNb3VzZVRhcmdldFR5cGVbTW91c2VUYXJnZXRUeXBlW1wiT1ZFUkxBWV9XSURHRVRcIl0gPSAxMl0gPSBcIk9WRVJMQVlfV0lER0VUXCI7XG4gICAgLyoqXG4gICAgICogTW91c2UgaXMgb3V0c2lkZSBvZiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIE1vdXNlVGFyZ2V0VHlwZVtNb3VzZVRhcmdldFR5cGVbXCJPVVRTSURFX0VESVRPUlwiXSA9IDEzXSA9IFwiT1VUU0lERV9FRElUT1JcIjtcbn0pKE1vdXNlVGFyZ2V0VHlwZSB8fCAoTW91c2VUYXJnZXRUeXBlID0ge30pKTtcbi8qKlxuICogRGVzY3JpYmVzIHdoYXQgdG8gZG8gd2l0aCB0aGUgaW5kZW50YXRpb24gd2hlbiBwcmVzc2luZyBFbnRlci5cbiAqL1xuZXhwb3J0IHZhciBJbmRlbnRBY3Rpb247XG4oZnVuY3Rpb24gKEluZGVudEFjdGlvbikge1xuICAgIC8qKlxuICAgICAqIEluc2VydCBuZXcgbGluZSBhbmQgY29weSB0aGUgcHJldmlvdXMgbGluZSdzIGluZGVudGF0aW9uLlxuICAgICAqL1xuICAgIEluZGVudEFjdGlvbltJbmRlbnRBY3Rpb25bXCJOb25lXCJdID0gMF0gPSBcIk5vbmVcIjtcbiAgICAvKipcbiAgICAgKiBJbnNlcnQgbmV3IGxpbmUgYW5kIGluZGVudCBvbmNlIChyZWxhdGl2ZSB0byB0aGUgcHJldmlvdXMgbGluZSdzIGluZGVudGF0aW9uKS5cbiAgICAgKi9cbiAgICBJbmRlbnRBY3Rpb25bSW5kZW50QWN0aW9uW1wiSW5kZW50XCJdID0gMV0gPSBcIkluZGVudFwiO1xuICAgIC8qKlxuICAgICAqIEluc2VydCB0d28gbmV3IGxpbmVzOlxuICAgICAqICAtIHRoZSBmaXJzdCBvbmUgaW5kZW50ZWQgd2hpY2ggd2lsbCBob2xkIHRoZSBjdXJzb3JcbiAgICAgKiAgLSB0aGUgc2Vjb25kIG9uZSBhdCB0aGUgc2FtZSBpbmRlbnRhdGlvbiBsZXZlbFxuICAgICAqL1xuICAgIEluZGVudEFjdGlvbltJbmRlbnRBY3Rpb25bXCJJbmRlbnRPdXRkZW50XCJdID0gMl0gPSBcIkluZGVudE91dGRlbnRcIjtcbiAgICAvKipcbiAgICAgKiBJbnNlcnQgbmV3IGxpbmUgYW5kIG91dGRlbnQgb25jZSAocmVsYXRpdmUgdG8gdGhlIHByZXZpb3VzIGxpbmUncyBpbmRlbnRhdGlvbikuXG4gICAgICovXG4gICAgSW5kZW50QWN0aW9uW0luZGVudEFjdGlvbltcIk91dGRlbnRcIl0gPSAzXSA9IFwiT3V0ZGVudFwiO1xufSkoSW5kZW50QWN0aW9uIHx8IChJbmRlbnRBY3Rpb24gPSB7fSkpO1xuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbUtpbmQ7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtS2luZCkge1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJNZXRob2RcIl0gPSAwXSA9IFwiTWV0aG9kXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkZ1bmN0aW9uXCJdID0gMV0gPSBcIkZ1bmN0aW9uXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkNvbnN0cnVjdG9yXCJdID0gMl0gPSBcIkNvbnN0cnVjdG9yXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkZpZWxkXCJdID0gM10gPSBcIkZpZWxkXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlZhcmlhYmxlXCJdID0gNF0gPSBcIlZhcmlhYmxlXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkNsYXNzXCJdID0gNV0gPSBcIkNsYXNzXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlN0cnVjdFwiXSA9IDZdID0gXCJTdHJ1Y3RcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiSW50ZXJmYWNlXCJdID0gN10gPSBcIkludGVyZmFjZVwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJNb2R1bGVcIl0gPSA4XSA9IFwiTW9kdWxlXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlByb3BlcnR5XCJdID0gOV0gPSBcIlByb3BlcnR5XCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkV2ZW50XCJdID0gMTBdID0gXCJFdmVudFwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJPcGVyYXRvclwiXSA9IDExXSA9IFwiT3BlcmF0b3JcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiVW5pdFwiXSA9IDEyXSA9IFwiVW5pdFwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJWYWx1ZVwiXSA9IDEzXSA9IFwiVmFsdWVcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiQ29uc3RhbnRcIl0gPSAxNF0gPSBcIkNvbnN0YW50XCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkVudW1cIl0gPSAxNV0gPSBcIkVudW1cIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRW51bU1lbWJlclwiXSA9IDE2XSA9IFwiRW51bU1lbWJlclwiO1xuICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJLZXl3b3JkXCJdID0gMTddID0gXCJLZXl3b3JkXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlRleHRcIl0gPSAxOF0gPSBcIlRleHRcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiQ29sb3JcIl0gPSAxOV0gPSBcIkNvbG9yXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkZpbGVcIl0gPSAyMF0gPSBcIkZpbGVcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiUmVmZXJlbmNlXCJdID0gMjFdID0gXCJSZWZlcmVuY2VcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiQ3VzdG9tY29sb3JcIl0gPSAyMl0gPSBcIkN1c3RvbWNvbG9yXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkZvbGRlclwiXSA9IDIzXSA9IFwiRm9sZGVyXCI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlR5cGVQYXJhbWV0ZXJcIl0gPSAyNF0gPSBcIlR5cGVQYXJhbWV0ZXJcIjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiU25pcHBldFwiXSA9IDI1XSA9IFwiU25pcHBldFwiO1xufSkoQ29tcGxldGlvbkl0ZW1LaW5kIHx8IChDb21wbGV0aW9uSXRlbUtpbmQgPSB7fSkpO1xuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbUluc2VydFRleHRSdWxlO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbUluc2VydFRleHRSdWxlKSB7XG4gICAgLyoqXG4gICAgICogQWRqdXN0IHdoaXRlc3BhY2UvaW5kZW50YXRpb24gb2YgbXVsdGlsaW5lIGluc2VydCB0ZXh0cyB0b1xuICAgICAqIG1hdGNoIHRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb24uXG4gICAgICovXG4gICAgQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZVtDb21wbGV0aW9uSXRlbUluc2VydFRleHRSdWxlW1wiS2VlcFdoaXRlc3BhY2VcIl0gPSAxXSA9IFwiS2VlcFdoaXRlc3BhY2VcIjtcbiAgICAvKipcbiAgICAgKiBgaW5zZXJ0VGV4dGAgaXMgYSBzbmlwcGV0LlxuICAgICAqL1xuICAgIENvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGVbQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZVtcIkluc2VydEFzU25pcHBldFwiXSA9IDRdID0gXCJJbnNlcnRBc1NuaXBwZXRcIjtcbn0pKENvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGUgfHwgKENvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGUgPSB7fSkpO1xuLyoqXG4gKiBIb3cgYSBzdWdnZXN0IHByb3ZpZGVyIHdhcyB0cmlnZ2VyZWQuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvblRyaWdnZXJLaW5kO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uVHJpZ2dlcktpbmQpIHtcbiAgICBDb21wbGV0aW9uVHJpZ2dlcktpbmRbQ29tcGxldGlvblRyaWdnZXJLaW5kW1wiSW52b2tlXCJdID0gMF0gPSBcIkludm9rZVwiO1xuICAgIENvbXBsZXRpb25UcmlnZ2VyS2luZFtDb21wbGV0aW9uVHJpZ2dlcktpbmRbXCJUcmlnZ2VyQ2hhcmFjdGVyXCJdID0gMV0gPSBcIlRyaWdnZXJDaGFyYWN0ZXJcIjtcbiAgICBDb21wbGV0aW9uVHJpZ2dlcktpbmRbQ29tcGxldGlvblRyaWdnZXJLaW5kW1wiVHJpZ2dlckZvckluY29tcGxldGVDb21wbGV0aW9uc1wiXSA9IDJdID0gXCJUcmlnZ2VyRm9ySW5jb21wbGV0ZUNvbXBsZXRpb25zXCI7XG59KShDb21wbGV0aW9uVHJpZ2dlcktpbmQgfHwgKENvbXBsZXRpb25UcmlnZ2VyS2luZCA9IHt9KSk7XG5leHBvcnQgdmFyIFNpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZDtcbihmdW5jdGlvbiAoU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kKSB7XG4gICAgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kW1NpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZFtcIkludm9rZVwiXSA9IDFdID0gXCJJbnZva2VcIjtcbiAgICBTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmRbU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kW1wiVHJpZ2dlckNoYXJhY3RlclwiXSA9IDJdID0gXCJUcmlnZ2VyQ2hhcmFjdGVyXCI7XG4gICAgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kW1NpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZFtcIkNvbnRlbnRDaGFuZ2VcIl0gPSAzXSA9IFwiQ29udGVudENoYW5nZVwiO1xufSkoU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kIHx8IChTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQgPSB7fSkpO1xuLyoqXG4gKiBBIGRvY3VtZW50IGhpZ2hsaWdodCBraW5kLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50SGlnaGxpZ2h0S2luZDtcbihmdW5jdGlvbiAoRG9jdW1lbnRIaWdobGlnaHRLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQSB0ZXh0dWFsIG9jY3VycmVuY2UuXG4gICAgICovXG4gICAgRG9jdW1lbnRIaWdobGlnaHRLaW5kW0RvY3VtZW50SGlnaGxpZ2h0S2luZFtcIlRleHRcIl0gPSAwXSA9IFwiVGV4dFwiO1xuICAgIC8qKlxuICAgICAqIFJlYWQtYWNjZXNzIG9mIGEgc3ltYm9sLCBsaWtlIHJlYWRpbmcgYSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmRbRG9jdW1lbnRIaWdobGlnaHRLaW5kW1wiUmVhZFwiXSA9IDFdID0gXCJSZWFkXCI7XG4gICAgLyoqXG4gICAgICogV3JpdGUtYWNjZXNzIG9mIGEgc3ltYm9sLCBsaWtlIHdyaXRpbmcgdG8gYSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmRbRG9jdW1lbnRIaWdobGlnaHRLaW5kW1wiV3JpdGVcIl0gPSAyXSA9IFwiV3JpdGVcIjtcbn0pKERvY3VtZW50SGlnaGxpZ2h0S2luZCB8fCAoRG9jdW1lbnRIaWdobGlnaHRLaW5kID0ge30pKTtcbi8qKlxuICogQSBzeW1ib2wga2luZC5cbiAqL1xuZXhwb3J0IHZhciBTeW1ib2xLaW5kO1xuKGZ1bmN0aW9uIChTeW1ib2xLaW5kKSB7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiRmlsZVwiXSA9IDBdID0gXCJGaWxlXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTW9kdWxlXCJdID0gMV0gPSBcIk1vZHVsZVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIk5hbWVzcGFjZVwiXSA9IDJdID0gXCJOYW1lc3BhY2VcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJQYWNrYWdlXCJdID0gM10gPSBcIlBhY2thZ2VcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJDbGFzc1wiXSA9IDRdID0gXCJDbGFzc1wiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIk1ldGhvZFwiXSA9IDVdID0gXCJNZXRob2RcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJQcm9wZXJ0eVwiXSA9IDZdID0gXCJQcm9wZXJ0eVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkZpZWxkXCJdID0gN10gPSBcIkZpZWxkXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiQ29uc3RydWN0b3JcIl0gPSA4XSA9IFwiQ29uc3RydWN0b3JcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJFbnVtXCJdID0gOV0gPSBcIkVudW1cIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJJbnRlcmZhY2VcIl0gPSAxMF0gPSBcIkludGVyZmFjZVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkZ1bmN0aW9uXCJdID0gMTFdID0gXCJGdW5jdGlvblwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlZhcmlhYmxlXCJdID0gMTJdID0gXCJWYXJpYWJsZVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkNvbnN0YW50XCJdID0gMTNdID0gXCJDb25zdGFudFwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlN0cmluZ1wiXSA9IDE0XSA9IFwiU3RyaW5nXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTnVtYmVyXCJdID0gMTVdID0gXCJOdW1iZXJcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJCb29sZWFuXCJdID0gMTZdID0gXCJCb29sZWFuXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiQXJyYXlcIl0gPSAxN10gPSBcIkFycmF5XCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiT2JqZWN0XCJdID0gMThdID0gXCJPYmplY3RcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJLZXlcIl0gPSAxOV0gPSBcIktleVwiO1xuICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIk51bGxcIl0gPSAyMF0gPSBcIk51bGxcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJFbnVtTWVtYmVyXCJdID0gMjFdID0gXCJFbnVtTWVtYmVyXCI7XG4gICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiU3RydWN0XCJdID0gMjJdID0gXCJTdHJ1Y3RcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJFdmVudFwiXSA9IDIzXSA9IFwiRXZlbnRcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJPcGVyYXRvclwiXSA9IDI0XSA9IFwiT3BlcmF0b3JcIjtcbiAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJUeXBlUGFyYW1ldGVyXCJdID0gMjVdID0gXCJUeXBlUGFyYW1ldGVyXCI7XG59KShTeW1ib2xLaW5kIHx8IChTeW1ib2xLaW5kID0ge30pKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgdG9VaW50MzIgfSBmcm9tICcuLi9jb3JlL3VpbnQuanMnO1xudmFyIFByZWZpeFN1bUluZGV4T2ZSZXN1bHQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJlZml4U3VtSW5kZXhPZlJlc3VsdChpbmRleCwgcmVtYWluZGVyKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5yZW1haW5kZXIgPSByZW1haW5kZXI7XG4gICAgfVxuICAgIHJldHVybiBQcmVmaXhTdW1JbmRleE9mUmVzdWx0O1xufSgpKTtcbmV4cG9ydCB7IFByZWZpeFN1bUluZGV4T2ZSZXN1bHQgfTtcbnZhciBQcmVmaXhTdW1Db21wdXRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmVmaXhTdW1Db21wdXRlcih2YWx1ZXMpIHtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIHRoaXMucHJlZml4U3VtID0gbmV3IFVpbnQzMkFycmF5KHZhbHVlcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXggPSBuZXcgSW50MzJBcnJheSgxKTtcbiAgICAgICAgdGhpcy5wcmVmaXhTdW1WYWxpZEluZGV4WzBdID0gLTE7XG4gICAgfVxuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5nZXRDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5pbnNlcnRWYWx1ZXMgPSBmdW5jdGlvbiAoaW5zZXJ0SW5kZXgsIGluc2VydFZhbHVlcykge1xuICAgICAgICBpbnNlcnRJbmRleCA9IHRvVWludDMyKGluc2VydEluZGV4KTtcbiAgICAgICAgdmFyIG9sZFZhbHVlcyA9IHRoaXMudmFsdWVzO1xuICAgICAgICB2YXIgb2xkUHJlZml4U3VtID0gdGhpcy5wcmVmaXhTdW07XG4gICAgICAgIHZhciBpbnNlcnRWYWx1ZXNMZW4gPSBpbnNlcnRWYWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAoaW5zZXJ0VmFsdWVzTGVuID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXcgVWludDMyQXJyYXkob2xkVmFsdWVzLmxlbmd0aCArIGluc2VydFZhbHVlc0xlbik7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChvbGRWYWx1ZXMuc3ViYXJyYXkoMCwgaW5zZXJ0SW5kZXgpLCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KG9sZFZhbHVlcy5zdWJhcnJheShpbnNlcnRJbmRleCksIGluc2VydEluZGV4ICsgaW5zZXJ0VmFsdWVzTGVuKTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KGluc2VydFZhbHVlcywgaW5zZXJ0SW5kZXgpO1xuICAgICAgICBpZiAoaW5zZXJ0SW5kZXggLSAxIDwgdGhpcy5wcmVmaXhTdW1WYWxpZEluZGV4WzBdKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gPSBpbnNlcnRJbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVmaXhTdW0gPSBuZXcgVWludDMyQXJyYXkodGhpcy52YWx1ZXMubGVuZ3RoKTtcbiAgICAgICAgaWYgKHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeFN1bS5zZXQob2xkUHJlZml4U3VtLnN1YmFycmF5KDAsIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5jaGFuZ2VWYWx1ZSA9IGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgaW5kZXggPSB0b1VpbnQzMihpbmRleCk7XG4gICAgICAgIHZhbHVlID0gdG9VaW50MzIodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy52YWx1ZXNbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICBpZiAoaW5kZXggLSAxIDwgdGhpcy5wcmVmaXhTdW1WYWxpZEluZGV4WzBdKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gPSBpbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlci5wcm90b3R5cGUucmVtb3ZlVmFsdWVzID0gZnVuY3Rpb24gKHN0YXJ0SW5kZXgsIGNudCkge1xuICAgICAgICBzdGFydEluZGV4ID0gdG9VaW50MzIoc3RhcnRJbmRleCk7XG4gICAgICAgIGNudCA9IHRvVWludDMyKGNudCk7XG4gICAgICAgIHZhciBvbGRWYWx1ZXMgPSB0aGlzLnZhbHVlcztcbiAgICAgICAgdmFyIG9sZFByZWZpeFN1bSA9IHRoaXMucHJlZml4U3VtO1xuICAgICAgICBpZiAoc3RhcnRJbmRleCA+PSBvbGRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heENudCA9IG9sZFZhbHVlcy5sZW5ndGggLSBzdGFydEluZGV4O1xuICAgICAgICBpZiAoY250ID49IG1heENudCkge1xuICAgICAgICAgICAgY250ID0gbWF4Q250O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ldyBVaW50MzJBcnJheShvbGRWYWx1ZXMubGVuZ3RoIC0gY250KTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KG9sZFZhbHVlcy5zdWJhcnJheSgwLCBzdGFydEluZGV4KSwgMCk7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChvbGRWYWx1ZXMuc3ViYXJyYXkoc3RhcnRJbmRleCArIGNudCksIHN0YXJ0SW5kZXgpO1xuICAgICAgICB0aGlzLnByZWZpeFN1bSA9IG5ldyBVaW50MzJBcnJheSh0aGlzLnZhbHVlcy5sZW5ndGgpO1xuICAgICAgICBpZiAoc3RhcnRJbmRleCAtIDEgPCB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0pIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4U3VtVmFsaWRJbmRleFswXSA9IHN0YXJ0SW5kZXggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXhTdW0uc2V0KG9sZFByZWZpeFN1bS5zdWJhcnJheSgwLCB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlci5wcm90b3R5cGUuZ2V0VG90YWxWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFjY3VtdWxhdGVkVmFsdWUodGhpcy52YWx1ZXMubGVuZ3RoIC0gMSk7XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlci5wcm90b3R5cGUuZ2V0QWNjdW11bGF0ZWRWYWx1ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IHRvVWludDMyKGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFjY3VtdWxhdGVkVmFsdWUoaW5kZXgpO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXIucHJvdG90eXBlLl9nZXRBY2N1bXVsYXRlZFZhbHVlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8PSB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZWZpeFN1bVtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gKyAxO1xuICAgICAgICBpZiAoc3RhcnRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXhTdW1bMF0gPSB0aGlzLnZhbHVlc1swXTtcbiAgICAgICAgICAgIHN0YXJ0SW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMudmFsdWVzLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPD0gaW5kZXg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXhTdW1baV0gPSB0aGlzLnByZWZpeFN1bVtpIC0gMV0gKyB0aGlzLnZhbHVlc1tpXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0gPSBNYXRoLm1heCh0aGlzLnByZWZpeFN1bVZhbGlkSW5kZXhbMF0sIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4U3VtW2luZGV4XTtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyLnByb3RvdHlwZS5nZXRJbmRleE9mID0gZnVuY3Rpb24gKGFjY3VtdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgYWNjdW11bGF0ZWRWYWx1ZSA9IE1hdGguZmxvb3IoYWNjdW11bGF0ZWRWYWx1ZSk7IC8vQHBlcmZcbiAgICAgICAgLy8gQ29tcHV0ZSBhbGwgc3VtcyAodG8gZ2V0IGEgZnVsbHkgdmFsaWQgcHJlZml4U3VtKVxuICAgICAgICB0aGlzLmdldFRvdGFsVmFsdWUoKTtcbiAgICAgICAgdmFyIGxvdyA9IDA7XG4gICAgICAgIHZhciBoaWdoID0gdGhpcy52YWx1ZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG1pZCA9IDA7XG4gICAgICAgIHZhciBtaWRTdG9wID0gMDtcbiAgICAgICAgdmFyIG1pZFN0YXJ0ID0gMDtcbiAgICAgICAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XG4gICAgICAgICAgICBtaWQgPSBsb3cgKyAoKGhpZ2ggLSBsb3cpIC8gMikgfCAwO1xuICAgICAgICAgICAgbWlkU3RvcCA9IHRoaXMucHJlZml4U3VtW21pZF07XG4gICAgICAgICAgICBtaWRTdGFydCA9IG1pZFN0b3AgLSB0aGlzLnZhbHVlc1ttaWRdO1xuICAgICAgICAgICAgaWYgKGFjY3VtdWxhdGVkVmFsdWUgPCBtaWRTdGFydCkge1xuICAgICAgICAgICAgICAgIGhpZ2ggPSBtaWQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWNjdW11bGF0ZWRWYWx1ZSA+PSBtaWRTdG9wKSB7XG4gICAgICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJlZml4U3VtSW5kZXhPZlJlc3VsdChtaWQsIGFjY3VtdWxhdGVkVmFsdWUgLSBtaWRTdGFydCk7XG4gICAgfTtcbiAgICByZXR1cm4gUHJlZml4U3VtQ29tcHV0ZXI7XG59KCkpO1xuZXhwb3J0IHsgUHJlZml4U3VtQ29tcHV0ZXIgfTtcbnZhciBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZSh2YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVBY2N1bXVsYXRlZFZhbHVlU3RhcnQgPSAwO1xuICAgICAgICB0aGlzLl9jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdHVhbCA9IG5ldyBQcmVmaXhTdW1Db21wdXRlcih2YWx1ZXMpO1xuICAgICAgICB0aGlzLl9idXN0Q2FjaGUoKTtcbiAgICB9XG4gICAgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUucHJvdG90eXBlLl9idXN0Q2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlQWNjdW11bGF0ZWRWYWx1ZVN0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSBudWxsO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUucHJvdG90eXBlLmluc2VydFZhbHVlcyA9IGZ1bmN0aW9uIChpbnNlcnRJbmRleCwgaW5zZXJ0VmFsdWVzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3R1YWwuaW5zZXJ0VmFsdWVzKGluc2VydEluZGV4LCBpbnNlcnRWYWx1ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9idXN0Q2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUucHJvdG90eXBlLmNoYW5nZVZhbHVlID0gZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fYWN0dWFsLmNoYW5nZVZhbHVlKGluZGV4LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1c3RDYWNoZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUucmVtb3ZlVmFsdWVzID0gZnVuY3Rpb24gKHN0YXJ0SW5kZXgsIGNudCkge1xuICAgICAgICBpZiAodGhpcy5fYWN0dWFsLnJlbW92ZVZhbHVlcyhzdGFydEluZGV4LCBjbnQpKSB7XG4gICAgICAgICAgICB0aGlzLl9idXN0Q2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUucHJvdG90eXBlLmdldFRvdGFsVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3R1YWwuZ2V0VG90YWxWYWx1ZSgpO1xuICAgIH07XG4gICAgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUucHJvdG90eXBlLmdldEFjY3VtdWxhdGVkVmFsdWUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbC5nZXRBY2N1bXVsYXRlZFZhbHVlKGluZGV4KTtcbiAgICB9O1xuICAgIFByZWZpeFN1bUNvbXB1dGVyV2l0aENhY2hlLnByb3RvdHlwZS5nZXRJbmRleE9mID0gZnVuY3Rpb24gKGFjY3VtdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgYWNjdW11bGF0ZWRWYWx1ZSA9IE1hdGguZmxvb3IoYWNjdW11bGF0ZWRWYWx1ZSk7IC8vQHBlcmZcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVJbmRleCA9IGFjY3VtdWxhdGVkVmFsdWUgLSB0aGlzLl9jYWNoZUFjY3VtdWxhdGVkVmFsdWVTdGFydDtcbiAgICAgICAgICAgIGlmIChjYWNoZUluZGV4ID49IDAgJiYgY2FjaGVJbmRleCA8IHRoaXMuX2NhY2hlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIENhY2hlIGhpdCFcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVbY2FjaGVJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FjaGUgbWlzcyFcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbC5nZXRJbmRleE9mKGFjY3VtdWxhdGVkVmFsdWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2l2ZXMgYSBoaW50IHRoYXQgYSBsb3Qgb2YgcmVxdWVzdHMgYXJlIGFib3V0IHRvIGNvbWUgaW4gZm9yIHRoZXNlIGFjY3VtdWxhdGVkIHZhbHVlcy5cbiAgICAgKi9cbiAgICBQcmVmaXhTdW1Db21wdXRlcldpdGhDYWNoZS5wcm90b3R5cGUud2FybVVwQ2FjaGUgPSBmdW5jdGlvbiAoYWNjdW11bGF0ZWRWYWx1ZVN0YXJ0LCBhY2N1bXVsYXRlZFZhbHVlRW5kKSB7XG4gICAgICAgIHZhciBuZXdDYWNoZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBhY2N1bXVsYXRlZFZhbHVlID0gYWNjdW11bGF0ZWRWYWx1ZVN0YXJ0OyBhY2N1bXVsYXRlZFZhbHVlIDw9IGFjY3VtdWxhdGVkVmFsdWVFbmQ7IGFjY3VtdWxhdGVkVmFsdWUrKykge1xuICAgICAgICAgICAgbmV3Q2FjaGVbYWNjdW11bGF0ZWRWYWx1ZSAtIGFjY3VtdWxhdGVkVmFsdWVTdGFydF0gPSB0aGlzLmdldEluZGV4T2YoYWNjdW11bGF0ZWRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2FjaGUgPSBuZXdDYWNoZTtcbiAgICAgICAgdGhpcy5fY2FjaGVBY2N1bXVsYXRlZFZhbHVlU3RhcnQgPSBhY2N1bXVsYXRlZFZhbHVlU3RhcnQ7XG4gICAgfTtcbiAgICByZXR1cm4gUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGU7XG59KCkpO1xuZXhwb3J0IHsgUHJlZml4U3VtQ29tcHV0ZXJXaXRoQ2FjaGUgfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgU2ltcGxlV29ya2VyU2VydmVyIH0gZnJvbSAnLi4vYmFzZS9jb21tb24vd29ya2VyL3NpbXBsZVdvcmtlci5qcyc7XG5pbXBvcnQgeyBFZGl0b3JTaW1wbGVXb3JrZXJJbXBsIH0gZnJvbSAnLi9jb21tb24vc2VydmljZXMvZWRpdG9yU2ltcGxlV29ya2VyLmpzJztcbnZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoZm9yZWlnbk1vZHVsZSkge1xuICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB2YXIgZWRpdG9yV29ya2VyID0gbmV3IEVkaXRvclNpbXBsZVdvcmtlckltcGwoZm9yZWlnbk1vZHVsZSk7XG4gICAgdmFyIHNpbXBsZVdvcmtlciA9IG5ldyBTaW1wbGVXb3JrZXJTZXJ2ZXIoZnVuY3Rpb24gKG1zZykge1xuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKG1zZyk7XG4gICAgfSwgZWRpdG9yV29ya2VyKTtcbiAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHNpbXBsZVdvcmtlci5vbm1lc3NhZ2UoZS5kYXRhKTtcbiAgICB9O1xufVxuc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIC8vIElnbm9yZSBmaXJzdCBtZXNzYWdlIGluIHRoaXMgY2FzZSBhbmQgaW5pdGlhbGl6ZSBpZiBub3QgeWV0IGluaXRpYWxpemVkXG4gICAgaWYgKCFpbml0aWFsaXplZCkge1xuICAgICAgICBpbml0aWFsaXplKG51bGwpO1xuICAgIH1cbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwic291cmNlUm9vdCI6IiJ9