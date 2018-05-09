(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.larkplayerUi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],3:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":1}],4:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _classNames = require('./class-names');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 播放器各状态 className 管理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/5/4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://www.w3.org/TR/html5/semantics-embedded-content.html#media-elements-event-summary
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    * status 分为以下几种：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *        * play: PLAYING
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *        * pause: PAUSED
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *        * loading: LOADSTART, SEEKING, WAITING
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *        * end: ENDED
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *        * error: ERROR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var toTitleCase = _larkplayer.util.toTitleCase,
    featureDetector = _larkplayer.util.featureDetector;

var ClassNameManager = function (_Plugin) {
    _inherits(ClassNameManager, _Plugin);

    function ClassNameManager(player, options) {
        _classCallCheck(this, ClassNameManager);

        var _this = _possibleConstructorReturn(this, _Plugin.call(this, player, options));

        _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.handleTouchStart = _this.handleTouchStart.bind(_this);
        _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
        _this.handleFirstplay = _this.handleFirstplay.bind(_this);

        _this.activeTimeoutHandler = null;
        _this.activeTimeout = 3000;
        _this.events = ['loadstart', 'loadedmetadata', 'canplay', 'canplaythrough', 'error', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'play', 'pause'];

        _this.events.forEach(function (event) {
            var callbackName = 'handle' + toTitleCase(event);
            _this[callbackName] = _this[callbackName].bind(_this);
            _this.player.on(event, _this[callbackName]);
        });

        if (featureDetector.touch) {
            _this.player.on('touchstart', _this.handleTouchStart);
            _this.player.on('touchend', _this.handleTouchEnd);
        } else {
            _this.player.on('mouseenter', _this.handleMouseEnter);
            _this.player.on('mousemove', _this.handleMouseMove);
            _this.player.on('mouseleave', _this.handleMouseLeave);
        }
        _this.player.on('firstplay', _this.handleFirstplay);

        _this.player.addClass(_classNames2['default'].PAUSED);
        return _this;
    }

    ClassNameManager.prototype.dispose = function dispose() {
        var _this2 = this;

        if (featureDetector.touch) {
            this.player.off('touchstart', this.handleTouchStart);
            this.player.off('touchend', this.handleTouchEnd);
        } else {
            this.player.off('mouseenter', this.handleMouseEnter);
            this.player.off('mousemove', this.handleMouseMove);
            this.player.off('mouseleave', this.handleMouseLeave);
        }
        this.events.forEach(function (event) {
            _this2.player.off(event, _this2['handle' + toTitleCase(event)]);
        });

        _Plugin.prototype.dispose.call(this);
    };

    ClassNameManager.prototype.handleTouchStart = function handleTouchStart(event) {
        // 当控制条显示并且手指放在控制条上时
        if (this.player.hasClass(_classNames2['default'].ACTIVE)) {
            if (_larkplayer.DOM.parent(event.target, 'lark-play-button') || _larkplayer.DOM.parent(event.target, 'lark-control-bar')) {

                clearTimeout(this.activeTimeoutHandler);
            }
        }
    };

    ClassNameManager.prototype.handleTouchEnd = function handleTouchEnd(event) {
        var _this3 = this;

        clearTimeout(this.activeTimeoutHandler);

        // 点在播放按钮或者控制条上，（继续）展现控制条
        var clickOnControls = false;
        // @todo 处理得不够优雅
        if (_larkplayer.DOM.parent(event.target, 'lark-play-button') || _larkplayer.DOM.parent(event.target, 'lark-control-bar')) {

            clickOnControls = true;
        }

        if (!clickOnControls) {
            this.player.toggleClass(_classNames2['default'].ACTIVE);
        }

        if (this.player.hasClass(_classNames2['default'].ACTIVE)) {
            this.activeTimeoutHandler = setTimeout(function () {
                _this3.player.removeClass(_classNames2['default'].ACTIVE);
            }, this.activeTimeout);
        }
    };

    ClassNameManager.prototype.handleMouseEnter = function handleMouseEnter(event) {
        var _this4 = this;

        clearTimeout(this.activeTimeoutHandler);

        if (!this.player.hasClass(_classNames2['default'].ACTIVE)) {
            this.player.addClass(_classNames2['default'].ACTIVE);
        }

        this.activeTimeoutHandler = setTimeout(function () {
            _this4.player.removeClass(_classNames2['default'].ACTIVE);
        }, this.activeTimeout);
    };

    ClassNameManager.prototype.handleMouseMove = function handleMouseMove(event) {
        this.handleMouseEnter(event);
    };

    ClassNameManager.prototype.handleMouseLeave = function handleMouseLeave(event) {
        clearTimeout(this.activeTimeoutHandler);
        this.player.removeClass(_classNames2['default'].ACTIVE);
    };

    /**
     * 处理 loadstart 事件
     *
     * @private
     * @fires Player#loadstart
     * @listens Html5#loadstart
     * @see https://html.spec.whatwg.org/#mediaevents
     */


    ClassNameManager.prototype.handleLoadstart = function handleLoadstart() {
        this.player.addClass(_classNames2['default'].LOADSTART);
    };

    ClassNameManager.prototype.handleLoadedmetadata = function handleLoadedmetadata() {
        this.player.removeClass(_classNames2['default'].LOADSTART);
    };

    /**
     * 处理 play 事件
     *
     * @private
     * @fires Player#play
     * @see https://html.spec.whatwg.org/#mediaevents
     */


    ClassNameManager.prototype.handlePlay = function handlePlay() {
        var _this5 = this;

        // @todo player.removeClass 支持一次 remove 多个 class
        this.player.removeClass(_classNames2['default'].LOADSTART);
        this.player.removeClass(_classNames2['default'].SEEKING);
        this.player.removeClass(_classNames2['default'].WAITING);
        this.player.removeClass(_classNames2['default'].PAUSED);
        this.player.removeClass(_classNames2['default'].ENDED);
        this.player.removeClass(_classNames2['default'].ERROR);
        this.player.addClass(_classNames2['default'].PLAYING);

        clearTimeout(this.activeTimeoutHandler);
        this.player.addClass(_classNames2['default'].ACTIVE);
        this.activeTimeoutHandler = setTimeout(function () {
            _this5.player.removeClass(_classNames2['default'].ACTIVE);
        }, this.activeTimeout);
    };

    /**
     * 处理 waiting 事件
     *
     * @private
     * @fires Player#waiting
     * @see https://html.spec.whatwg.org/#mediaevents
     */


    ClassNameManager.prototype.handleWaiting = function handleWaiting() {
        this.player.addClass(_classNames2['default'].WAITING);
    };

    /**
     * 处理 canplay 事件
     *
     * @private
     * @fires Player#canplay
     */


    ClassNameManager.prototype.handleCanplay = function handleCanplay() {
        this.player.removeClass(_classNames2['default'].WAITING);
        this.player.removeClass(_classNames2['default'].LOADSTART);

        if (this.player.paused()) {
            this.player.removeClass(_classNames2['default'].PLAYING);
            this.player.addClass(_classNames2['default'].PAUSED);
        }
    };

    /**
     * 处理 canplaythrough 事件
     *
     * @private
     * @fires Player#canplaythrough
     */


    ClassNameManager.prototype.handleCanplaythrough = function handleCanplaythrough() {
        this.player.removeClass(_classNames2['default'].WAITING);
    };

    /**
     * 处理 playing 事件
     *
     * @private
     * @fires Player#playing
     */


    ClassNameManager.prototype.handlePlaying = function handlePlaying() {
        this.player.removeClass(_classNames2['default'].WAITING);
        this.player.removeClass(_classNames2['default'].LOADSTART);
        this.player.removeClass(_classNames2['default'].SEEKING);
        this.player.removeClass(_classNames2['default'].PAUSED);
        this.player.removeClass(_classNames2['default'].ERROR);
        this.player.removeClass(_classNames2['default'].ENDED);
    };

    /**
     * 处理 seeking 事件
     *
     * @private
     * @fires Player#seeking
     */


    ClassNameManager.prototype.handleSeeking = function handleSeeking() {
        this.player.addClass(_classNames2['default'].SEEKING);
    };

    /**
     * 处理 seeked 事件
     *
     * @private
     * @fires Player#seeked
     */


    ClassNameManager.prototype.handleSeeked = function handleSeeked() {
        this.player.removeClass(_classNames2['default'].SEEKING);
        this.player.removeClass(_classNames2['default'].WAITING);
        this.player.removeClass(_classNames2['default'].LOADSTART);
    };

    /**
     * 处理自定义的 firstplay 事件
     * 该事件与 play 事件的不同之处在于 firstplay 只会在第一次播放时触发一次
     *
     * @private
     * @fires Player#firstplay
     */


    ClassNameManager.prototype.handleFirstplay = function handleFirstplay() {
        var _this6 = this;

        // @todo 不清楚有什么用
        this.player.addClass(_classNames2['default'].HAS_START);

        clearTimeout(this.activeTimeoutHandler);
        this.player.addClass(_classNames2['default'].ACTIVE);
        this.activeTimeoutHandler = setTimeout(function () {
            _this6.player.removeClass(_classNames2['default'].ACTIVE);
        }, this.activeTimeout);
    };

    /**
     * 处理 pause 事件
     *
     * @private
     * @fires Player#pause
     */


    ClassNameManager.prototype.handlePause = function handlePause() {
        this.player.removeClass(_classNames2['default'].PLAYING);
        this.player.addClass(_classNames2['default'].PAUSED);
    };

    /**
     * 处理 ended 事件
     *
     * @private
     * @fires Player#ended
     */


    ClassNameManager.prototype.handleEnded = function handleEnded() {
        this.player.removeClass(_classNames2['default'].PLAYING);
        this.player.removeClass(_classNames2['default'].ERROR);
        this.player.addClass(_classNames2['default'].ENDED);
    };

    /**
     * 处理 error 事件
     *
     * @fires Player#error
     * @private
     */


    ClassNameManager.prototype.handleError = function handleError() {
        this.player.removeClass(_classNames2['default'].PLAYING);
        this.player.removeClass(_classNames2['default'].ENDED);
        this.player.removeClass(_classNames2['default'].PAUSED);
        this.player.removeClass(_classNames2['default'].LOADSTART);
        this.player.removeClass(_classNames2['default'].SEEKING);
        this.player.removeClass(_classNames2['default'].WAITING);
        this.player.addClass(_classNames2['default'].ERROR);
    };

    return ClassNameManager;
}(_larkplayer.Plugin);

exports['default'] = ClassNameManager;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./class-names":6}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * @file 播放器各状态 className
 * @author yuhui06
 * @date 2018/5/6
 */

exports['default'] = {
    LOADSTART: 'lark-status-loadstart',
    ENDED: 'lark-status-ended',
    PAUSED: 'lark-status-paused',
    ERROR: 'lark-status-error',
    SEEKING: 'lark-status-seeking',
    WAITING: 'lark-status-waiting',
    PLAYING: 'lark-status-playing',
    ACTIVE: 'lark-status-user-active',
    HAS_START: 'lark-status-has-start',
    CONTROLS: 'lark-custom-controls'
};

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 显示视频已加载的量
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    1) 在视频没开始播放之前，提前下载的视频资源由 preload 属性的值决定
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           - none 什么都没有，所以我们连视频总时长都没法获取到
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           - metadata 可以获取到视频时长、高宽等信息
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           - auto 视浏览器而定，一般 >= metadata
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BufferBar = function (_Component) {
    _inherits(BufferBar, _Component);

    function BufferBar(player, options) {
        _classCallCheck(this, BufferBar);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.line = _larkplayer.DOM.$('.lark-buffer-bar__line', _this.el);
        _this.handleProgress = _this.handleProgress.bind(_this);

        _this.player.on('progress', _this.handleProgress);
        // 对于已经 video 已经初始化完成后才调用 larkplayer 的情况，此时可能已经没有 progress 事件
        // 不过我们会在 player.handleLateInit 中重新触发 canplay 等事件（canplay 时，播放器应该已经有一定的 buffer）
        _this.player.on('canplay', _this.handleProgress);
        _this.handleProgress();
        return _this;
    }

    BufferBar.prototype.handleProgress = function handleProgress() {
        // TimeRanges 对象
        var buffered = this.player.buffered();
        var duration = this.player.duration();
        var currentTime = this.player.currentTime();

        if (duration > 0) {
            for (var i = 0; i < buffered.length; i++) {
                if (buffered.start(i) <= currentTime && buffered.end(i) >= currentTime) {
                    var width = buffered.end(i) / duration * 100 + '%';
                    this.render(width);
                    break;
                }
            }
        }
    };

    BufferBar.prototype.render = function render(width) {
        this.line.style.width = width;
    };

    BufferBar.prototype.reset = function reset() {
        this.render(0);
    };

    BufferBar.prototype.dispose = function dispose() {
        this.player.off('progress', this.handleProgress);
        this.player.off('canplay', this.handleProgress);

        this.line = null;

        _Component.prototype.dispose.call(this);
    };

    BufferBar.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-buffer-bar', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-buffer-bar__line' })
        );
    };

    return BufferBar;
}(_larkplayer.Component);

exports['default'] = BufferBar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 播放完成样式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/4/17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Complete = function (_Component) {
    _inherits(Complete, _Component);

    function Complete() {
        _classCallCheck(this, Complete);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Complete.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-complete', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-complete__replay lark-icon-replay' })
        );
    };

    return Complete;
}(_larkplayer.Component);

exports['default'] = Complete;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],9:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file current-time.js 当前时间 UI
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var timeFormat = _larkplayer.util.timeFormat;

var CurrentTime = function (_Component) {
    _inherits(CurrentTime, _Component);

    function CurrentTime(player, options) {
        _classCallCheck(this, CurrentTime);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleTimeupdate = _this.handleTimeupdate.bind(_this);

        _this.player.on('timeupdate', _this.handleTimeupdate);
        return _this;
    }

    CurrentTime.prototype.handleTimeupdate = function handleTimeupdate(event) {
        this.render(this.player.currentTime());
    };

    CurrentTime.prototype.render = function render(time) {
        _larkplayer.DOM.textContent(this.el, timeFormat(Math.floor(time)));
    };

    CurrentTime.prototype.reset = function reset() {
        this.render(0);
    };

    CurrentTime.prototype.dispose = function dispose() {
        this.player.off('timeupdate', this.handleTimeupdate);

        _Component.prototype.dispose.call(this);
    };

    CurrentTime.prototype.createEl = function createEl() {
        var currentTime = this.player.currentTime();

        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-current-time', this.options.className) },
            timeFormat(Math.floor(currentTime))
        );
    };

    return CurrentTime;
}(_larkplayer.Component);

exports['default'] = CurrentTime;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],10:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file duration.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var timeFormat = _larkplayer.util.timeFormat;

var Duration = function (_Component) {
    _inherits(Duration, _Component);

    function Duration(player, options) {
        _classCallCheck(this, Duration);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleLoadedMetaData = _this.handleLoadedMetaData.bind(_this);

        _this.player.on('durationchange', _this.handleLoadedMetaData);
        _this.player.on('loadedmetadata', _this.handleLoadedMetaData);
        return _this;
    }

    Duration.prototype.handleLoadedMetaData = function handleLoadedMetaData(event) {
        _larkplayer.DOM.textContent(this.el, timeFormat(Math.floor(this.player.duration())));
    };

    Duration.prototype.reset = function reset() {
        _larkplayer.DOM.textContent(this.el, '');
    };

    Duration.prototype.dispose = function dispose() {
        this.player.off('durationchange', this.handleLoadedMetaData);
        this.player.off('loadedmetadata', this.handleLoadedMetaData);

        _Component.prototype.dispose.call(this);
    };

    Duration.prototype.createEl = function createEl() {
        // @todo 暂时将 duration 的值写在这，后面需要处理下对于已经发生的事件怎么办
        var durationContent = timeFormat(Math.floor(this.player.duration()));

        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-duration', this.options.className) },
            durationContent
        );
    };

    return Duration;
}(_larkplayer.Component);

exports['default'] = Duration;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],11:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file error.js 播放器出错时显示 pc 版
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhuiyuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/3/8
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ErrorPc = function (_Component) {
    _inherits(ErrorPc, _Component);

    function ErrorPc(player, options) {
        _classCallCheck(this, ErrorPc);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleError = _this.handleError.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);

        _this.player.on('error', _this.handleError);
        _this.on('click', _this.handleClick);

        _this.textEl = _larkplayer.DOM.$('.lark-error-text', _this.el);
        return _this;
    }

    ErrorPc.prototype.handleClick = function handleClick() {
        var _this2 = this;

        var src = this.player.src();
        this.player.reset();
        setTimeout(function () {
            _this2.player.src(src);
            _this2.player.play();
        }, 0);
    };

    ErrorPc.prototype.handleError = function handleError(event) {
        var error = this.player.tech.el.error;
        var text = void 0;
        switch (parseInt(error.code, 10)) {
            // MEDIA_ERR_ABORTED
            case 1:
                text = '加载失败，点击重试(MEDIA_ERR_ABORTED)';
                break;
            // MEDIA_ERR_NETWORK
            case 2:
                text = '加载失败，请检查您的网络(MEDIA_ERR_NETWORK)';
                break;
            // MEDIA_ERR_DECODE
            case 3:
                text = '视频解码失败(MEDIA_ERR_DECODE)';
                break;
            // MEDIA_ERR_SRC_NOT_SUPPORTED
            case 4:
                text = '加载失败，该资源无法访问或者浏览器不支持该视频类型(MEDIA_ERR_SRC_NOT_SUPPORTED)';
                break;
            default:
                text = '加载失败，点击重试';
        }

        _larkplayer.DOM.replaceContent(this.textEl, text);
    };

    ErrorPc.prototype.dispose = function dispose() {
        this.player.off('error', this.handleError);
        this.off('click', this.handleClick);

        this.textEl = null;
        _Component.prototype.dispose.call(this);
    };

    ErrorPc.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-error', 'lark-error--pc', this.options.className)
            },
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-error-cnt' },
                _larkplayer.Component.createElement(
                    'div',
                    { className: 'lark-error-text' },
                    '\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5'
                )
            )
        );
    };

    return ErrorPc;
}(_larkplayer.Component);

exports['default'] = ErrorPc;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],12:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file error.js 播放器出错时显示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Error = function (_Component) {
    _inherits(Error, _Component);

    function Error(player, options) {
        _classCallCheck(this, Error);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleError = _this.handleError.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);

        _this.player.on('error', _this.handleError);
        _this.on('click', _this.handleClick);
        return _this;
    }

    Error.prototype.handleError = function handleError(event) {
        /* eslint-disable no-console */
        console.log(event, event.detail);
        /* eslint-enable no-console */
    };

    Error.prototype.handleClick = function handleClick() {
        var _this2 = this;

        var src = this.player.src();
        this.player.reset();
        setTimeout(function () {
            _this2.player.src(src);
            _this2.player.play();
        }, 0);
    };

    Error.prototype.dispose = function dispose() {
        this.player.off('error', this.handleError);
        this.off('click', this.handleClick);

        _Component.prototype.dispose.call(this);
    };

    Error.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-error', 'lark-error--mobile', this.options.className)
            },
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-error-cnt' },
                _larkplayer.Component.createElement('span', { className: 'lark-error-cnt__spinner lark-icon-loading' }),
                _larkplayer.Component.createElement(
                    'span',
                    { className: 'lark-error-cnt__text' },
                    '\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5'
                )
            )
        );
    };

    return Error;
}(_larkplayer.Component);

exports['default'] = Error;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file fullscreen-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var featureDetector = _larkplayer.util.featureDetector;

var FullscreenButton = function (_Component) {
    _inherits(FullscreenButton, _Component);

    function FullscreenButton(player, options) {
        _classCallCheck(this, FullscreenButton);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);

        _this.on('click', _this.handleClick);

        if (!featureDetector.touch) {
            _this.fullscreenButton = _larkplayer.DOM.$('.lark-request-fullscreen', _this.el);
            _this.exitFullscreenButton = _larkplayer.DOM.$('.lark-exit-fullscreen', _this.el);

            _larkplayer.Events.on(_this.fullscreenButton, 'mouseover', _this.handleMouseOver);
            _larkplayer.Events.on(_this.exitFullscreenButton, 'mouseover', _this.handleMouseOver);

            _this.on('mouseout', _this.handleMouseOut);
        }
        return _this;
    }

    FullscreenButton.prototype.handleClick = function handleClick() {
        if (!this.player.isFullscreen()) {
            this.player.requestFullscreen();
        } else {
            this.player.exitFullscreen();
        }

        _tooltip2['default'].hide();
    };

    FullscreenButton.prototype.handleMouseOver = function handleMouseOver(event) {
        _tooltip2['default'].show({
            hostEl: event.target,
            placement: 'top',
            margin: 16,
            content: event.target.title
        });
    };

    FullscreenButton.prototype.handleMouseOut = function handleMouseOut(event) {
        _tooltip2['default'].hide();
    };

    FullscreenButton.prototype.dispose = function dispose() {
        this.off('click', this.handleClick);

        if (!featureDetector.touch) {
            _larkplayer.Events.off(this.fullscreenButton, 'mouseover', this.handleMouseOver);
            _larkplayer.Events.off(this.exitFullscreenButton, 'mouseover', this.handleMouseOver);
            this.fullscreenButton = null;
            this.exitFullscreenButton = null;

            this.off('mouseout', this.handleMouseOut);
        }

        _Component.prototype.dispose.call(this);
    };

    FullscreenButton.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-fullscreen-button', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-request-fullscreen lark-icon-request-fullscreen', title: '\u5168\u5C4F' }),
            _larkplayer.Component.createElement('div', { className: 'lark-exit-fullscreen', title: '\u9000\u51FA\u5168\u5C4F' })
        );
    };

    return FullscreenButton;
}(_larkplayer.Component);

exports['default'] = FullscreenButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./tooltip":20,"classnames":2,"global/document":3}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 播放器 UI loading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GradientBottom = function (_Component) {
    _inherits(GradientBottom, _Component);

    function GradientBottom() {
        _classCallCheck(this, GradientBottom);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    GradientBottom.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement('div', { className: (0, _classnames2['default'])('lark-gradient-bottom', this.options.className) });
    };

    return GradientBottom;
}(_larkplayer.Component);

exports['default'] = GradientBottom;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],15:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 播放器 UI loading pc 版
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/3/8
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoadingPc = function (_Component) {
    _inherits(LoadingPc, _Component);

    function LoadingPc() {
        _classCallCheck(this, LoadingPc);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LoadingPc.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-loading', 'lark-loading--pc', this.options.className)
            },
            _larkplayer.Component.createElement('div', { className: 'lark-loading-spinner' })
        );
    };

    return LoadingPc;
}(_larkplayer.Component);

exports['default'] = LoadingPc;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],16:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 播放器 UI loading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Loading.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-loading', 'lark-loading--mobile', this.options.className)
            },
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-loading-cnt' },
                _larkplayer.Component.createElement('span', { className: 'lark-loading-cnt__spinner lark-icon-loading' }),
                _larkplayer.Component.createElement(
                    'span',
                    { className: 'lark-loading-cnt__text' },
                    '\u6B63\u5728\u52A0\u8F7D'
                )
            )
        );
    };

    return Loading;
}(_larkplayer.Component);

exports['default'] = Loading;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],17:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file not-support.js 不支持 html5 video 标签时提示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/3/29
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var NotSupport = function (_Component) {
    _inherits(NotSupport, _Component);

    function NotSupport() {
        _classCallCheck(this, NotSupport);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    NotSupport.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-not-support-notice', this.options.className) },
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-not-support-notice__text' },
                '\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 html5 \u89C6\u9891\u64AD\u653E\uFF0C\u8BF7\u5347\u7EA7\u6D4F\u89C8\u5668\u7248\u672C\u6216\u66F4\u6362\u4E3A chrome \u6D4F\u89C8\u5668'
            )
        );
    };

    return NotSupport;
}(_larkplayer.Component);

exports['default'] = NotSupport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file playButton.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/7
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var featureDetector = _larkplayer.util.featureDetector;

var PlayButton = function (_Component) {
    _inherits(PlayButton, _Component);

    function PlayButton(player, options) {
        _classCallCheck(this, PlayButton);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.togglePlay = _this.togglePlay.bind(_this);

        // 注意 这里需要将 context（第二个参数） 设置为 this.el，因为这时 DOM 元素还没有插入到 document 里，所以在 document 里是查不到这个元素的
        _this.playBtn = _larkplayer.DOM.$('.lark-play-button__play', _this.el);
        _this.pauseBtn = _larkplayer.DOM.$('.lark-play-button__pause', _this.el);
        _this.eventName = featureDetector.touch ? 'touchend' : 'click';

        _larkplayer.Events.on(_this.playBtn, _this.eventName, _this.togglePlay);
        _larkplayer.Events.on(_this.pauseBtn, _this.eventName, _this.togglePlay);
        return _this;
    }

    PlayButton.prototype.togglePlay = function togglePlay(event, isPlay) {
        if (this.player.paused()) {
            this.player.play();
        } else {
            this.player.pause();
        }
    };

    PlayButton.prototype.dispose = function dispose() {
        _larkplayer.Events.off(this.playBtn, this.eventName, this.togglePlay);
        _larkplayer.Events.off(this.pauseBtn, this.eventName, this.togglePlay);
        this.playBtn = null;
        this.pauseBtn = null;

        _Component.prototype.dispose.call(this);
    };

    PlayButton.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-play-button', this.options.className, {
                    'lark-play-button--mobile': !this.options.className
                }) },
            _larkplayer.Component.createElement('div', { className: 'lark-play-button__play lark-icon-play', title: 'play' }),
            _larkplayer.Component.createElement('div', { className: 'lark-play-button__pause lark-icon-pause', title: 'pause' })
        );
    };

    return PlayButton;
}(_larkplayer.Component);

exports['default'] = PlayButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":2}],19:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file slide.js 所有需要拖动的元素的父类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/3/15
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(player, options) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleSlideStart = _this.handleSlideStart.bind(_this);
        _this.handleSlideMove = _this.handleSlideMove.bind(_this);
        _this.handleSlideEnd = _this.handleSlideEnd.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.onSlideStart = _this.onSlideStart.bind(_this);
        _this.onSlideMove = _this.onSlideMove.bind(_this);
        _this.onSlideEnd = _this.onSlideEnd.bind(_this);
        return _this;
    }

    Slider.prototype.onClick = function onClick(event) {};

    Slider.prototype.onSlideStart = function onSlideStart(event) {};

    Slider.prototype.onSlideMove = function onSlideMove(event) {};

    Slider.prototype.onSlideEnd = function onSlideEnd(event) {};

    Slider.prototype.handleClick = function handleClick(event) {
        this.onClick(event);
    };

    Slider.prototype.handleSlideStart = function handleSlideStart(event) {
        this.onSlideStart(event);

        _larkplayer.DOM.addClass(this.el, 'lark-sliding');

        _larkplayer.Events.on(document, 'touchmove', this.handleSlideMove);
        _larkplayer.Events.on(document, 'touchend', this.handleSlideEnd);
        _larkplayer.Events.on(document, 'mousemove', this.handleSlideMove);
        _larkplayer.Events.on(document, 'mouseup', this.handleSlideEnd);
    };

    Slider.prototype.handleSlideMove = function handleSlideMove(event) {
        this.onSlideMove(event);
    };

    Slider.prototype.handleSlideEnd = function handleSlideEnd(event) {
        this.onSlideEnd(event);

        _larkplayer.DOM.removeClass(this.el, 'lark-sliding');

        _larkplayer.Events.off(document, 'touchmove', this.handleSlideMove);
        _larkplayer.Events.off(document, 'touchend', this.handleSlideEnd);
        _larkplayer.Events.off(document, 'mousemove', this.handleSlideMove);
        _larkplayer.Events.off(document, 'mouseup', this.handleSlideEnd);
    };

    return Slider;
}(_larkplayer.Component);

exports['default'] = Slider;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file tooltip.js 用于展示提示性文字
 * @author yuhui06
 * @date 2018/3/22
 * @todo 多个播放器实例并存时有点鸡肋
 */

exports['default'] = {
    id: 'lark-tooltip',
    el: null,
    timeoutHandler: null,
    initial: function initial(container) {
        // if (this.el) {
        //     return;
        // }

        if (!_larkplayer.DOM.isEl(container)) {
            return;
        }

        var el = _larkplayer.DOM.createElement('div', {
            className: this.id
        });
        _larkplayer.DOM.appendContent(container, el);

        this.el = el;
        this.container = container;
    },
    normalize: function normalize(options) {
        return (0, _lodash2['default'])({
            timeout: 0,
            content: '',
            top: 0,
            left: 0,
            margin: 0,
            hostEl: null,
            placement: 'top',
            isFollowMouse: false,
            // 这个 event 有点鸡肋，但要获取鼠标位置的时候（即 isFollowMouse: true），必须得从 event 参数里获取
            event: null
        }, options);
    },
    getCoordinate: function getCoordinate(options) {
        var coordinate = void 0;

        switch (options.placement) {
            case 'top':
                // @todo 可以 cache
                var hostElRect = _larkplayer.DOM.getBoundingClientRect(options.hostEl);
                var containerRect = _larkplayer.DOM.getBoundingClientRect(this.container);

                var left = void 0;
                if (options.isFollowMouse) {
                    var pointerPos = _larkplayer.DOM.getPointerPosition(options.hostEl, options.event);
                    left = hostElRect.left - containerRect.left + hostElRect.width * pointerPos.x - this.el.offsetWidth / 2;
                } else {
                    left = hostElRect.left - containerRect.left + (hostElRect.width - this.el.offsetWidth) / 2;
                }

                var outOfBounds = left + this.el.offsetWidth - this.container.offsetWidth;
                if (outOfBounds > 0) {
                    left = left - outOfBounds;
                }

                var top = hostElRect.top - containerRect.top - this.el.offsetHeight - options.margin;
                coordinate = { left: left, top: top };
                break;
        }

        return coordinate;
    },
    show: function show(options) {
        var _this = this;

        clearTimeout(this.timeoutHandler);

        options = this.normalize(options);

        if (!_larkplayer.DOM.isEl(options.hostEl)) {
            return;
        }

        var container = _larkplayer.DOM.parent(options.hostEl, 'larkplayer');
        var el = _larkplayer.DOM.$('.lark-tooltip', container);

        // 多个播放器实例并存时需要不断切换 this.el 和 this.container
        if (el) {
            this.el = el;
            this.container = container;
        } else {
            this.initial(container);
        }

        // if (!this.el) {
        //     const container = DOM.parent(options.hostEl, 'larkplayer');
        //     this.initial(container);
        // }

        _larkplayer.DOM.replaceContent(this.el, options.content);

        setTimeout(function () {
            // 元素 display none 时获取到的 offsetHeight 和 offsetWidth 是 0
            // 所以先以 visibility: hidden 的方式“显示”元素，以获取正确的高宽
            _this.el.style.visibility = 'hidden';
            _this.el.style.display = 'block';
            var coordinate = _this.getCoordinate(options);
            _this.el.style.top = coordinate.top + 'px';
            _this.el.style.left = coordinate.left + 'px';
            _this.el.style.visibility = 'visible';
        }, 0);
    },
    hide: function hide() {
        var _this2 = this;

        if (!this.el) {
            return;
        }

        this.timeoutHandler = setTimeout(function () {
            _this2.el.style.display = 'none';
        });
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash.assign":4}],21:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _slider = require('./slider');

var _slider2 = _interopRequireDefault(_slider);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 音量 UI 组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/3/9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/4/25 现在通过 js 修改音量也会触发 UI 改变（yuhui06）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

var Volume = function (_Slider) {
    _inherits(Volume, _Slider);

    function Volume(player, options) {
        _classCallCheck(this, Volume);

        var _this = _possibleConstructorReturn(this, _Slider.call(this, player, options));

        _this.volumeRecord = {
            last: _this.player.volume(),
            current: _this.player.volume()
        };

        _this.onSlideStart = _this.onSlideStart.bind(_this);
        _this.onSlideMove = _this.onSlideMove.bind(_this);
        _this.onSlideEnd = _this.onSlideEnd.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.iconClick = _this.iconClick.bind(_this);
        _this.handleIconMouseOver = _this.handleIconMouseOver.bind(_this);
        _this.handleIconMouseOut = _this.handleIconMouseOut.bind(_this);
        _this.switchStatus = _this.switchStatus.bind(_this);
        _this.clearStatus = _this.clearStatus.bind(_this);
        _this.handleVolumeChange = _this.handleVolumeChange.bind(_this);

        _this.line = _larkplayer.DOM.$('.lark-volume-line__line', _this.el);
        _this.ball = _larkplayer.DOM.$('.lark-volume-line__ball', _this.el);
        _this.icon = _larkplayer.DOM.$('.lark-volume-icon', _this.el);

        _larkplayer.Events.on(_this.icon, 'click', _this.iconClick);
        _larkplayer.Events.on(_this.icon, 'mouseover', _this.handleIconMouseOver);
        _larkplayer.Events.on(_this.icon, 'mouseout', _this.handleIconMouseOut);
        _larkplayer.Events.on(_this.line, 'click', _this.handleClick);
        _larkplayer.Events.on(_this.ball, 'mousedown', _this.handleSlideStart);
        _larkplayer.Events.on(_this.ball, 'touchstart', _this.handleSlideStart);

        _this.player.on('volumechange', _this.handleVolumeChange);
        return _this;
    }

    Volume.prototype.onSlideStart = function onSlideStart(event) {
        this.isSliding = true;
    };

    Volume.prototype.onSlideMove = function onSlideMove(event) {
        event.preventDefault();
        var pos = _larkplayer.DOM.getPointerPosition(this.line, event);
        // this.update(pos.x);
        this.player.volume(pos.x);

        if (this.player.volume() !== 0) {
            this.player.muted(false);
        }
    };

    Volume.prototype.onSlideEnd = function onSlideEnd(event) {
        this.isSliding = false;
        this.updateVolumeRecord();
    };

    Volume.prototype.updateVolumeRecord = function updateVolumeRecord() {
        this.volumeRecord = {
            last: this.volumeRecord.current,
            current: this.player.volume()
        };
    };

    Volume.prototype.handleVolumeChange = function handleVolumeChange() {
        if (this.player.muted()) {
            this.update(0);
        } else {
            this.update(this.player.volume());
        }

        if (!this.isSliding) {
            this.updateVolumeRecord();
        }
    };

    Volume.prototype.onClick = function onClick(event) {
        var pos = _larkplayer.DOM.getPointerPosition(this.line, event);
        this.player.volume(pos.x);

        if (this.player.volume() !== 0) {
            this.player.muted(false);
        }
    };

    Volume.prototype.update = function update(percent) {
        var lineWidth = this.line.offsetWidth;

        this.ball.style.left = percent * lineWidth + 'px';
        this.switchStatus(percent);
    };

    Volume.prototype.iconClick = function iconClick(event) {
        if (this.player.volume() && !this.player.muted()) {
            this.player.volume(0);
        } else {
            this.player.volume(this.volumeRecord.last);
            this.player.muted(false);
        }

        this.showTooltip();
    };

    Volume.prototype.showTooltip = function showTooltip() {
        _tooltip2['default'].show({
            hostEl: this.icon,
            margin: 16,
            content: this.player.volume() && !this.player.muted() ? '静音' : '取消静音'
        });
    };

    Volume.prototype.handleIconMouseOver = function handleIconMouseOver() {
        this.showTooltip();
    };

    Volume.prototype.handleIconMouseOut = function handleIconMouseOut(event) {
        _tooltip2['default'].hide();
    };

    Volume.prototype.switchStatus = function switchStatus(volume) {
        this.clearStatus();

        var status = void 0;
        if (volume === 0) {
            status = 'small';
        } else if (volume <= 0.6 && volume > 0) {
            status = 'middle';
        } else if (volume > 0.6) {
            status = 'large';
        }

        _larkplayer.DOM.addClass(this.icon, 'lark-icon-sound-' + status);
    };

    Volume.prototype.clearStatus = function clearStatus() {
        var _this2 = this;

        var statusClass = ['lark-icon-sound-small', 'lark-icon-sound-middle', 'lark-icon-sound-large'];
        statusClass.forEach(function (className) {
            _larkplayer.DOM.removeClass(_this2.icon, className);
        });
    };

    Volume.prototype.dispose = function dispose() {
        _larkplayer.Events.off(this.icon, 'click', this.iconClick);
        _larkplayer.Events.off(this.icon, 'mouseover', this.handleIconMouseOver);
        _larkplayer.Events.off(this.icon, 'mouseout', this.handleIconMouseOut);
        _larkplayer.Events.off(this.line, 'click', this.handleClick);
        _larkplayer.Events.off(this.ball, 'mousedown', this.handleSlideStart);
        _larkplayer.Events.off(this.ball, 'touchstart', this.handleSlideStart);

        this.icon = null;
        this.line = null;
        this.ball = null;

        this.player.off('volumechange', this.handleVolumeChange);

        _Slider.prototype.dispose.call(this);
    };

    Volume.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-volume', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-volume-icon lark-icon-sound-large' }),
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-volume-line' },
                _larkplayer.Component.createElement(
                    'div',
                    { className: 'lark-volume-line__line' },
                    _larkplayer.Component.createElement('div', { className: 'lark-volume-line__line-padding' })
                ),
                _larkplayer.Component.createElement('div', { className: 'lark-volume-line__ball' })
            )
        );
    };

    return Volume;
}(_slider2['default']);

exports['default'] = Volume;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./slider":19,"./tooltip":20,"classnames":2}],22:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _progressBar = require('./progress-bar');

var _progressBar2 = _interopRequireDefault(_progressBar);

var _currentTime = require('../component/current-time');

var _currentTime2 = _interopRequireDefault(_currentTime);

var _duration = require('../component/duration');

var _duration2 = _interopRequireDefault(_duration);

var _playButton = require('../component/play-button');

var _playButton2 = _interopRequireDefault(_playButton);

var _fullscreenButton = require('../component/fullscreen-button');

var _fullscreenButton2 = _interopRequireDefault(_fullscreenButton);

var _gradientBottom = require('../component/gradient-bottom');

var _gradientBottom2 = _interopRequireDefault(_gradientBottom);

var _volume = require('../component/volume');

var _volume2 = _interopRequireDefault(_volume);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file ControlBarPc 播放器操作按钮
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ControlBarPc = function (_Component) {
    _inherits(ControlBarPc, _Component);

    function ControlBarPc() {
        _classCallCheck(this, ControlBarPc);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ControlBarPc.prototype.reset = function reset() {
        this.children.forEach(function (child) {
            child && child.reset && child.reset();
        });
    };

    ControlBarPc.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-control-bar-pc', this.options.className) },
            _larkplayer.Component.createElement(_gradientBottom2['default'], null),
            _larkplayer.Component.createElement(_progressBar2['default'], { className: 'lark-progress-bar-pc' }),
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-control__left' },
                _larkplayer.Component.createElement(_playButton2['default'], { className: 'lark-play-button-pc' }),
                _larkplayer.Component.createElement(_volume2['default'], null),
                _larkplayer.Component.createElement(
                    'div',
                    { className: 'lark-time' },
                    _larkplayer.Component.createElement(_currentTime2['default'], null),
                    _larkplayer.Component.createElement(
                        'span',
                        { className: 'lark-time-separator' },
                        '/'
                    ),
                    _larkplayer.Component.createElement(_duration2['default'], null)
                )
            ),
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-control__right' },
                _larkplayer.Component.createElement(_fullscreenButton2['default'], null)
            )
        );
    };

    return ControlBarPc;
}(_larkplayer.Component);

exports['default'] = ControlBarPc;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/current-time":9,"../component/duration":10,"../component/fullscreen-button":13,"../component/gradient-bottom":14,"../component/play-button":18,"../component/volume":21,"./progress-bar":28,"classnames":2}],23:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _currentTime = require('../component/current-time');

var _currentTime2 = _interopRequireDefault(_currentTime);

var _duration = require('../component/duration');

var _duration2 = _interopRequireDefault(_duration);

var _fullscreenButton = require('../component/fullscreen-button');

var _fullscreenButton2 = _interopRequireDefault(_fullscreenButton);

var _progressBar = require('./progress-bar');

var _progressBar2 = _interopRequireDefault(_progressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file ControlsBar 播放器控制条
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ControlBar = function (_Component) {
    _inherits(ControlBar, _Component);

    function ControlBar() {
        _classCallCheck(this, ControlBar);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ControlBar.prototype.reset = function reset() {
        this.children.forEach(function (child) {
            child && child.reset && child.reset();
        });
    };

    ControlBar.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-control-bar', this.options.className) },
            _larkplayer.Component.createElement(_currentTime2['default'], null),
            _larkplayer.Component.createElement(_progressBar2['default'], null),
            _larkplayer.Component.createElement(_duration2['default'], null),
            _larkplayer.Component.createElement(_fullscreenButton2['default'], null)
        );
    };

    return ControlBar;
}(_larkplayer.Component);

exports['default'] = ControlBar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/current-time":9,"../component/duration":10,"../component/fullscreen-button":13,"./progress-bar":28,"classnames":2}],24:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _controlBar = require('./control-bar');

var _controlBar2 = _interopRequireDefault(_controlBar);

var _progressBarSimple = require('./progress-bar-simple');

var _progressBarSimple2 = _interopRequireDefault(_progressBarSimple);

var _loading = require('../component/loading');

var _loading2 = _interopRequireDefault(_loading);

var _playButton = require('../component/play-button');

var _playButton2 = _interopRequireDefault(_playButton);

var _notSupport = require('../component/not-support');

var _notSupport2 = _interopRequireDefault(_notSupport);

var _error = require('../component/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlsMobile = function (_Component) {
    _inherits(ControlsMobile, _Component);

    function ControlsMobile() {
        _classCallCheck(this, ControlsMobile);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ControlsMobile.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-custom-controls', 'lark-custom-controls--mobile', this.options.className)
            },
            _larkplayer.Component.createElement(_controlBar2['default'], null),
            _larkplayer.Component.createElement(_playButton2['default'], null),
            _larkplayer.Component.createElement(_loading2['default'], null),
            _larkplayer.Component.createElement(_error2['default'], null),
            _larkplayer.Component.createElement(_progressBarSimple2['default'], null),
            _larkplayer.Component.createElement(_notSupport2['default'], null)
        );
    };

    return ControlsMobile;
}(_larkplayer.Component);

exports['default'] = ControlsMobile;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/error":12,"../component/loading":16,"../component/not-support":17,"../component/play-button":18,"./control-bar":23,"./progress-bar-simple":27,"classnames":2}],25:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _controlBarPc = require('./control-bar-pc');

var _controlBarPc2 = _interopRequireDefault(_controlBarPc);

var _complete = require('../component/complete');

var _complete2 = _interopRequireDefault(_complete);

var _loadingPc = require('../component/loading-pc');

var _loadingPc2 = _interopRequireDefault(_loadingPc);

var _notSupport = require('../component/not-support');

var _notSupport2 = _interopRequireDefault(_notSupport);

var _errorPc = require('../component/error-pc');

var _errorPc2 = _interopRequireDefault(_errorPc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlsPc = function (_Component) {
    _inherits(ControlsPc, _Component);

    function ControlsPc() {
        _classCallCheck(this, ControlsPc);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ControlsPc.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-custom-controls', 'lark-custom-controls--pc', this.options.className)
            },
            _larkplayer.Component.createElement(_controlBarPc2['default'], null),
            _larkplayer.Component.createElement(_loadingPc2['default'], null),
            _larkplayer.Component.createElement(_errorPc2['default'], null),
            _larkplayer.Component.createElement(_complete2['default'], null),
            _larkplayer.Component.createElement(_notSupport2['default'], null)
        );
    };

    return ControlsPc;
}(_larkplayer.Component);

exports['default'] = ControlsPc;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/complete":8,"../component/error-pc":11,"../component/loading-pc":15,"../component/not-support":17,"./control-bar-pc":22,"classnames":2}],26:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _bufferBar = require('../component/buffer-bar');

var _bufferBar2 = _interopRequireDefault(_bufferBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file progress-bar.js 视频进度条
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    1) 写这个类主要是为了 DOM 结构，把 bufferBar 放到 progressBarExceptFill，这样才能方便地使用 flex 布局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           => progressBar 的高度等于整个 controlBar 的高度，方便用户点击
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           => progressBar 中包含 progressBarExceptFill，这是 progressBar 的主体，使用 relative，方便子元素相对于他定位
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           => progressBarExceptFill 中包含 bufferBar。之所以把 bufferBar 放到里面，是因为定位方便。我之前试过将 bufferBar 放到跟 progressBarExceptFill
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              同级然后通过 position: absolute 定位。但在 ios 和 安卓下是有问题的（奇怪的是 chrome 模拟器没问题）。绝对定位的元素被排挤到了父元素之外的空间
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              可以自己做下实验外带参考下 https://www.w3.org/TR/css-flexbox-1/#abspos-items
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProgressBarExceptFill = function (_Component) {
    _inherits(ProgressBarExceptFill, _Component);

    function ProgressBarExceptFill() {
        _classCallCheck(this, ProgressBarExceptFill);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ProgressBarExceptFill.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-progress-bar-except-fill', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-progress-bar__background' }),
            _larkplayer.Component.createElement(
                'div',
                { className: 'lark-progress-bar__line' },
                _larkplayer.Component.createElement(
                    'div',
                    { className: 'lark-progress-bar__line__handle' },
                    _larkplayer.Component.createElement('div', { className: 'lark-progress-bar__line__handle-except-fill' })
                )
            ),
            _larkplayer.Component.createElement(_bufferBar2['default'], null)
        );
    };

    return ProgressBarExceptFill;
}(_larkplayer.Component);

exports['default'] = ProgressBarExceptFill;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/buffer-bar":7,"classnames":2}],27:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _bufferBar = require('../component/buffer-bar');

var _bufferBar2 = _interopRequireDefault(_bufferBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file progress-bar-simple.js 简易版的进度条，当控制条消失时在视频底部显示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProgressBarSimple = function (_Component) {
    _inherits(ProgressBarSimple, _Component);

    function ProgressBarSimple(player, options) {
        _classCallCheck(this, ProgressBarSimple);

        var _this = _possibleConstructorReturn(this, _Component.call(this, player, options));

        _this.handleTimeUpdate = _this.handleTimeUpdate.bind(_this);
        _this.line = _larkplayer.DOM.$('.lark-progress-bar__line', _this.el);
        player.on('timeupdate', _this.handleTimeUpdate);
        return _this;
    }

    ProgressBarSimple.prototype.handleTimeUpdate = function handleTimeUpdate() {
        // 进度条
        var percent = 0;
        var duration = this.player.duration();
        var currentTime = this.player.currentTime();
        if (duration && currentTime) {
            // 保留两位小数四舍五入
            percent = Math.round(currentTime / duration * 100) / 100;
            // 转换为百分数
            percent = percent * 100 + '%';
        }

        this.line.style.width = percent;
    };

    ProgressBarSimple.prototype.reset = function reset() {
        this.line.style.width = 0;
        this.children.forEach(function (child) {
            child && child.reset && child.reset();
        });
    };

    ProgressBarSimple.prototype.dispose = function dispose() {
        player.off('timeupdate', this.handleTimeUpdate);
        this.line = null;
        _Component.prototype.dispose.call(this);
    };

    ProgressBarSimple.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-progress-bar--simple', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-progress-bar__background' }),
            _larkplayer.Component.createElement('div', { className: 'lark-progress-bar__line' }),
            _larkplayer.Component.createElement(_bufferBar2['default'], null)
        );
    };

    return ProgressBarSimple;
}(_larkplayer.Component);

exports['default'] = ProgressBarSimple;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/buffer-bar":7,"classnames":2}],28:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _slider = require('../component/slider');

var _slider2 = _interopRequireDefault(_slider);

var _tooltip = require('../component/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _progressBarExceptFill = require('./progress-bar-except-fill');

var _progressBarExceptFill2 = _interopRequireDefault(_progressBarExceptFill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file progress-bar.js 视频进度条
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui<yuhui06@baidu.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/11/6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/3/15 支持 pc 端拖拽和 tooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

var featureDetector = _larkplayer.util.featureDetector,
    timeFormat = _larkplayer.util.timeFormat;

var ProgressBar = function (_Slider) {
    _inherits(ProgressBar, _Slider);

    function ProgressBar(player, options) {
        _classCallCheck(this, ProgressBar);

        var _this = _possibleConstructorReturn(this, _Slider.call(this, player, options));

        _this.handleTimeUpdate = _this.handleTimeUpdate.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.onSlideStart = _this.onSlideStart.bind(_this);
        _this.onSlideMove = _this.onSlideMove.bind(_this);
        _this.onSlideEnd = _this.onSlideEnd.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);

        _this.line = _larkplayer.DOM.$('.lark-progress-bar__line', _this.el);
        _this.lineHandle = _larkplayer.DOM.$('.lark-progress-bar__line__handle', _this.el);
        _this.hoverLight = _larkplayer.DOM.$('.lark-progress-bar-hover-light', _this.el);
        _this.paddingEl = _larkplayer.DOM.$('.lark-progress-bar-padding', _this.el);

        _this.player.on('timeupdate', _this.handleTimeUpdate);
        _this.on('click', _this.handleClick);
        _this.on('touchstart', _this.handleSlideStart);

        if (!featureDetector.touch) {
            _this.on('mousedown', _this.handleSlideStart);
            _this.on('mouseover', _this.handleMouseOver);
            _this.on('mousemove', _this.handleMouseMove);
            _this.on('mouseout', _this.handleMouseOut);
        }
        return _this;
    }

    ProgressBar.prototype.handleTimeUpdate = function handleTimeUpdate() {
        // 进度条
        var percent = 0;
        var duration = this.player.duration();
        var currentTime = this.player.currentTime();
        if (duration && currentTime) {
            percent = currentTime / duration * 100 + '%';
        }

        this.line.style.width = percent;
    };

    ProgressBar.prototype.onClick = function onClick(event) {
        this.update(event);
    };

    ProgressBar.prototype.onSlideStart = function onSlideStart(event) {
        this.originalPaused = this.player.paused();
    };

    ProgressBar.prototype.onSlideMove = function onSlideMove(event) {
        event.preventDefault();

        if (!this.player.paused()) {
            this.player.pause();
        }

        this.update(event);
    };

    ProgressBar.prototype.onSlideEnd = function onSlideEnd(event) {
        // 如果播放器在拖动进度条前不是处于暂停状态，那么拖动完了之后继续播放
        if (this.player.paused && !this.originalPaused && this.originalPaused !== undefined) {
            this.player.play();
        }
    };

    ProgressBar.prototype.update = function update(event) {
        var pos = _larkplayer.DOM.getPointerPosition(this.el, event);
        var percent = pos.x * 100 + '%';
        var currentTime = this.player.duration() * pos.x;

        this.player.currentTime(currentTime);
        this.line.style.width = percent;
    };

    ProgressBar.prototype.reset = function reset() {
        this.line.style.width = 0;
        this.children.forEach(function (child) {
            child && child.reset && child.reset();
        });
    };

    ProgressBar.prototype.showToolTip = function showToolTip(event) {
        var duration = this.player.duration();
        if (duration) {
            var pointerPos = _larkplayer.DOM.getPointerPosition(this.el, event);
            // const elPos = DOM.findPosition(this.el);

            // const top = elPos.top - (this.paddingEl.offsetHeight - this.line.offsetHeight);
            // const left = elPos.left + this.el.offsetWidth * pointerPos.x;
            var currentTime = parseInt(duration * pointerPos.x, 10);

            if (!isNaN(currentTime)) {
                _tooltip2['default'].show({
                    // top: top,
                    // left: left,
                    hostEl: this.el,
                    margin: 13,
                    placement: 'top',
                    isFollowMouse: true,
                    event: event,
                    content: timeFormat(Math.floor(currentTime))
                });
            }
        }
    };

    ProgressBar.prototype.showHoverLine = function showHoverLine(event) {
        var pointerPos = _larkplayer.DOM.getPointerPosition(this.el, event);
        var left = this.el.offsetWidth * pointerPos.x;

        this.hoverLight.style.width = left + 'px';
    };

    ProgressBar.prototype.hideHoverLine = function hideHoverLine(event) {
        this.hoverLight.style.width = 0;
    };

    ProgressBar.prototype.handleMouseOver = function handleMouseOver(event) {
        this.showToolTip(event);
        this.showHoverLine(event);
    };

    ProgressBar.prototype.handleMouseMove = function handleMouseMove(event) {
        this.showToolTip(event);
        this.showHoverLine(event);
    };

    ProgressBar.prototype.handleMouseOut = function handleMouseOut(event) {
        _tooltip2['default'].hide();
        this.hideHoverLine(event);
    };

    ProgressBar.prototype.dispose = function dispose() {
        this.player.off('timeupdate', this.handleTimeUpdate);
        this.off('click', this.handleClick);
        this.off('touchstart', this.handleSlideStart);
        if (!featureDetector.touch) {
            this.off('mousedown', this.handleSlideStart);
            this.off('mouseover', this.handleMouseOver);
            this.off('mousemove', this.handleMouseMove);
            this.off('mouseout', this.handleMouseOut);
        }

        this.line = null;
        this.lineHandle = null;
        this.hoverLight = null;
        this.paddingEl = null;

        _Slider.prototype.dispose.call(this);
    };

    ProgressBar.prototype.createEl = function createEl() {
        return _larkplayer.Component.createElement(
            'div',
            { className: (0, _classnames2['default'])('lark-progress-bar', this.options.className) },
            _larkplayer.Component.createElement('div', { className: 'lark-progress-bar-padding' }),
            _larkplayer.Component.createElement('div', { className: 'lark-progress-bar-hover-light' }),
            _larkplayer.Component.createElement(_progressBarExceptFill2['default'], null)
        );
    };

    return ProgressBar;
}(_slider2['default']);

exports['default'] = ProgressBar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../component/slider":19,"../component/tooltip":20,"./progress-bar-except-fill":26,"classnames":2}],29:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _classNames = require('./class-names');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 代理 player.controls 方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuhui06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2018/5/6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ControlsProxy = function (_Plugin) {
    _inherits(ControlsProxy, _Plugin);

    function ControlsProxy(player, options) {
        _classCallCheck(this, ControlsProxy);

        var _this = _possibleConstructorReturn(this, _Plugin.call(this, player, options));

        _this.controls = _this.controls.bind(_this);
        _this.player.addClass(_classNames2['default'].CONTROLS);

        _this.player.tech.el.removeAttribute('controls');
        _this.player.controls = _this.controls;
        return _this;
    }

    ControlsProxy.prototype.controls = function controls(bool) {
        if (bool !== undefined) {
            if (bool) {
                this.player.addClass(_classNames2['default'].CONTROLS);
            } else {
                this.player.removeClass(_classNames2['default'].CONTROLS);
            }
        }

        return this.player.hasClass(_classNames2['default'].CONTROLS);
    };

    return ControlsProxy;
}(_larkplayer.Plugin);

exports['default'] = ControlsProxy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./class-names":6}],30:[function(require,module,exports){
(function (global){
'use strict';

var _larkplayer = (typeof window !== "undefined" ? window['larkplayer'] : typeof global !== "undefined" ? global['larkplayer'] : null);

var _classNameManager = require('./class-name-manager');

var _classNameManager2 = _interopRequireDefault(_classNameManager);

var _controlsProxy = require('./controls-proxy');

var _controlsProxy2 = _interopRequireDefault(_controlsProxy);

var _controlsMobile = require('./container/controls-mobile');

var _controlsMobile2 = _interopRequireDefault(_controlsMobile);

var _controlsPc = require('./container/controls-pc');

var _controlsPc2 = _interopRequireDefault(_controlsPc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_larkplayer.Plugin.register(_classNameManager2['default'], { name: 'classNameManager' }); /**
                                                                                           * @file larkplayer custom style
                                                                                           * @author yuhui06
                                                                                           * @date 2018/5/4
                                                                                           */

_larkplayer.Plugin.register(_controlsProxy2['default'], { name: 'controlsProxy' });

_larkplayer.util.featureDetector.touch ? _larkplayer.Component.register(_controlsMobile2['default'], { name: 'controlsMobile' }) : _larkplayer.Component.register(_controlsPc2['default'], { name: 'controlsPc' });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./class-name-manager":5,"./container/controls-mobile":24,"./container/controls-pc":25,"./controls-proxy":29}]},{},[30])(30)
});
