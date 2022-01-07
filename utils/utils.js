"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHashId = generateHashId;
exports.isChrome = isChrome;
exports.isPlainObject = isPlainObject;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.camelToTitle = camelToTitle;
exports.getHTMLMapModeTileUrl = getHTMLMapModeTileUrl;
exports.toArray = toArray;
exports.isObject = isObject;
exports.getError = getError;
exports.arrayInsert = arrayInsert;
exports.isTest = isTest;
exports.set = exports.insertValue = exports.camelize = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _window = _interopRequireDefault(require("global/window"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Generate a hash string based on number of character
 * @param {number} count
 * @returns {string} hash string
 */
function generateHashId() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var dataId_list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (dataId_list) {
    var id = Math.random().toString(36).substr(count);
    return dataId_list.includes(id) ? generateHashId(count, dataId_list) : id;
  } else {
    return Math.random().toString(36).substr(count);
  }
}
/**
 * Detect chrome
 * @returns {boolean} - yes or no
 */


function isChrome() {
  // Chrome 1+
  return _window["default"].chrome && _window["default"].chrome.webstore;
}
/**
 * whether is an object
 * @returns {boolean} - yes or no
 */


function isPlainObject(obj) {
  return obj === Object(obj) && typeof obj !== 'function' && !Array.isArray(obj);
}
/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */


function capitalizeFirstLetter(str) {
  return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}
/**
 * Convert camel style names to title
 * strokeColor -> Stroke Color
 * @param {string} str
 * @returns {string}
 */


function camelToTitle(str) {
  var breakWord = str.replace(/([A-Z])/g, ' $1');
  return capitalizeFirstLetter(breakWord);
}
/**
 * Convert names to camel style
 * Stroke Color -> strokeColor
 * @param {string} str
 * @returns {string}
 */


var camelize = function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (Number(match) === 0) return ''; // or if (/\s+/.test(match)) for white spaces

    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};
/**
 * Returns the img url for a given map export option
 * @param mode export option
 * @return {string} url
 */


exports.camelize = camelize;

function getHTMLMapModeTileUrl(mode) {
  return "https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/documentation/map-".concat(mode.toLowerCase(), "-mode.png");
}
/**
 * Converts non-arrays to arrays.  Leaves arrays alone.  Converts
 * undefined values to empty arrays ([] instead of [undefined]).
 * Otherwise, just returns [item] for non-array items.
 *
 * @param {*} item
 * @returns {array} boom! much array. very indexed. so useful.
 */


function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  if (typeof item === 'undefined' || item === null) {
    return [];
  }

  return [item];
}
/**
 * immutably insert value to an Array or Object
 * @param {Array|Object} obj
 * @param {Number|String} key
 * @param {*} value
 * @returns {Array|Object}
 */


var insertValue = function insertValue(obj, key, value) {
  if (Array.isArray(obj) && typeof key === 'number') {
    return [].concat((0, _toConsumableArray2["default"])(obj.slice(0, key)), [value], (0, _toConsumableArray2["default"])(obj.slice(key + 1, obj.length)));
  }

  return _objectSpread(_objectSpread({}, obj), {}, (0, _defineProperty2["default"])({}, key, value));
};
/**
 * check if value is a loose object including a plain object, array, function
 * @param {*} value
 */


exports.insertValue = insertValue;

function isObject(value) {
  return value !== null && ((0, _typeof2["default"])(value) === 'object' || typeof value === 'function');
}

var setPath = function setPath(_ref, value, obj) {
  var _ref2 = (0, _toArray2["default"])(_ref),
      key = _ref2[0],
      next = _ref2.slice(1);

  // is Object allows js object, array and function
  if (!isObject(obj)) {
    return obj;
  }

  if (next.length === 0) {
    return insertValue(obj, key, value);
  } // @ts-ignore


  return insertValue(obj, key, setPath(next, value, obj.hasOwnProperty(key) ? obj[key] : {}));
};
/**
 * Immutable version of _.set
 * @param {Array<String|Number>} path
 * @param {*} value
 * @param {Object} obj
 * @returns {Object}
 */
// @ts-ignore


var set = function set(path, value, obj) {
  return obj === null ? obj : setPath(path, value, obj);
};
/**
 * Get error information of unknown type
 * Extracts as much human readable information as possible
 * Ensure result is an Error object suitable for throw or promise rejection
 *
 * @private
 * @param {*}  err - Unknown error
 * @return {string} - human readable error msg
 */


exports.set = set;

function getError(err) {
  if (!err) {
    return 'Something went wrong';
  }

  if (typeof err === 'string') {
    return err;
  } else if (err instanceof Error) {
    return err.message;
  } else if ((0, _typeof2["default"])(err) === 'object') {
    return err.error ? getError(err.error) : err.err ? getError(err.err) : err.message ? getError(err.message) : JSON.stringify(err);
  } // @ts-ignore


  return null;
}

function arrayInsert(arr, index, val) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return [].concat((0, _toConsumableArray2["default"])(arr.slice(0, index)), [val], (0, _toConsumableArray2["default"])(arr.slice(index)));
}

function isTest() {
  var _process, _process$env;

  return ((_process = process) === null || _process === void 0 ? void 0 : (_process$env = _process.env) === null || _process$env === void 0 ? void 0 : _process$env.NODE_ENV) === 'test';
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUhhc2hJZCIsImNvdW50IiwiZGF0YUlkX2xpc3QiLCJpZCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsImluY2x1ZGVzIiwiaXNDaHJvbWUiLCJ3aW5kb3ciLCJjaHJvbWUiLCJ3ZWJzdG9yZSIsImlzUGxhaW5PYmplY3QiLCJvYmoiLCJPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiY2FtZWxUb1RpdGxlIiwiYnJlYWtXb3JkIiwicmVwbGFjZSIsImNhbWVsaXplIiwibWF0Y2giLCJpbmRleCIsIk51bWJlciIsInRvTG93ZXJDYXNlIiwiZ2V0SFRNTE1hcE1vZGVUaWxlVXJsIiwibW9kZSIsInRvQXJyYXkiLCJpdGVtIiwiaW5zZXJ0VmFsdWUiLCJrZXkiLCJ2YWx1ZSIsImxlbmd0aCIsImlzT2JqZWN0Iiwic2V0UGF0aCIsIm5leHQiLCJoYXNPd25Qcm9wZXJ0eSIsInNldCIsInBhdGgiLCJnZXRFcnJvciIsImVyciIsIkVycm9yIiwibWVzc2FnZSIsImVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsImFycmF5SW5zZXJ0IiwiYXJyIiwidmFsIiwiaXNUZXN0IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0EsY0FBVCxHQUFvRDtBQUFBLE1BQTVCQyxLQUE0Qix1RUFBcEIsQ0FBb0I7QUFBQSxNQUFsQkMsV0FBa0IsdUVBQU4sSUFBTTs7QUFDekQsTUFBR0EsV0FBSCxFQUFlO0FBQ2IsUUFBTUMsRUFBRSxHQUFFQyxJQUFJLENBQUNDLE1BQUwsR0FDUEMsUUFETyxDQUNFLEVBREYsRUFF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QzBCLEdBQWhDLHVDQUF3Q0QsR0FBRyxDQUFDL0IsS0FBSixDQUFVTSxLQUFWLENBQXhDO0FBQ0Q7O0FBRU0sU0FBUzJCLE1BQVQsR0FBa0I7QUFBQTs7QUFDdkIsU0FBTyxhQUFBQyxPQUFPLFVBQVAsNERBQVNDLEdBQVQsOERBQWNDLFFBQWQsTUFBMkIsTUFBbEM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB3aW5kb3cgZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBoYXNoIHN0cmluZyBiYXNlZCBvbiBudW1iZXIgb2YgY2hhcmFjdGVyXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGhhc2ggc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUhhc2hJZChjb3VudCA9IDYsZGF0YUlkX2xpc3Q9bnVsbCkge1xuICBpZihkYXRhSWRfbGlzdCl7XG4gICAgY29uc3QgaWQgPU1hdGgucmFuZG9tKClcbiAgICAgIC50b1N0cmluZygzNilcbiAgICAgIC5zdWJzdHIoY291bnQpXG4gICAgcmV0dXJuIGRhdGFJZF9saXN0LmluY2x1ZGVzKGlkKT9nZW5lcmF0ZUhhc2hJZChjb3VudCxkYXRhSWRfbGlzdCk6aWRcbiAgfVxuICBlbHNle1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpXG4gICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAuc3Vic3RyKGNvdW50KTtcbiAgfVxuXG59XG5cbi8qKlxuICogRGV0ZWN0IGNocm9tZVxuICogQHJldHVybnMge2Jvb2xlYW59IC0geWVzIG9yIG5vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgLy8gQ2hyb21lIDErXG4gIHJldHVybiB3aW5kb3cuY2hyb21lICYmIHdpbmRvdy5jaHJvbWUud2Vic3RvcmU7XG59XG5cbi8qKlxuICogd2hldGhlciBpcyBhbiBvYmplY3RcbiAqIEByZXR1cm5zIHtib29sZWFufSAtIHllcyBvciBub1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaikgJiYgdHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJyAmJiAhQXJyYXkuaXNBcnJheShvYmopO1xufVxuXG4vKipcbiAqIENhcGl0YWxpemUgZmlyc3QgbGV0dGVyIG9mIGEgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cikge1xuICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkgOiBzdHI7XG59XG5cbi8qKlxuICogQ29udmVydCBjYW1lbCBzdHlsZSBuYW1lcyB0byB0aXRsZVxuICogc3Ryb2tlQ29sb3IgLT4gU3Ryb2tlIENvbG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxUb1RpdGxlKHN0cikge1xuICBjb25zdCBicmVha1dvcmQgPSBzdHIucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJyk7XG4gIHJldHVybiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoYnJlYWtXb3JkKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IG5hbWVzIHRvIGNhbWVsIHN0eWxlXG4gKiBTdHJva2UgQ29sb3IgLT4gc3Ryb2tlQ29sb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjYW1lbGl6ZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHd8XFxzKykvZywgKG1hdGNoLCBpbmRleCkgPT4ge1xuICAgIGlmIChOdW1iZXIobWF0Y2gpID09PSAwKSByZXR1cm4gJyc7IC8vIG9yIGlmICgvXFxzKy8udGVzdChtYXRjaCkpIGZvciB3aGl0ZSBzcGFjZXNcbiAgICByZXR1cm4gaW5kZXggPT09IDAgPyBtYXRjaC50b0xvd2VyQ2FzZSgpIDogbWF0Y2gudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGltZyB1cmwgZm9yIGEgZ2l2ZW4gbWFwIGV4cG9ydCBvcHRpb25cbiAqIEBwYXJhbSBtb2RlIGV4cG9ydCBvcHRpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gdXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIVE1MTWFwTW9kZVRpbGVVcmwobW9kZSkge1xuICByZXR1cm4gYGh0dHBzOi8vZDFhM2Y0c3BhenpycDQuY2xvdWRmcm9udC5uZXQva2VwbGVyLmdsL2RvY3VtZW50YXRpb24vbWFwLSR7bW9kZS50b0xvd2VyQ2FzZSgpfS1tb2RlLnBuZ2A7XG59XG5cbi8qKlxuICogQ29udmVydHMgbm9uLWFycmF5cyB0byBhcnJheXMuICBMZWF2ZXMgYXJyYXlzIGFsb25lLiAgQ29udmVydHNcbiAqIHVuZGVmaW5lZCB2YWx1ZXMgdG8gZW1wdHkgYXJyYXlzIChbXSBpbnN0ZWFkIG9mIFt1bmRlZmluZWRdKS5cbiAqIE90aGVyd2lzZSwganVzdCByZXR1cm5zIFtpdGVtXSBmb3Igbm9uLWFycmF5IGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICogQHJldHVybnMge2FycmF5fSBib29tISBtdWNoIGFycmF5LiB2ZXJ5IGluZGV4ZWQuIHNvIHVzZWZ1bC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkoaXRlbSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIFtpdGVtXTtcbn1cblxuLyoqXG4gKiBpbW11dGFibHkgaW5zZXJ0IHZhbHVlIHRvIGFuIEFycmF5IG9yIE9iamVjdFxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IG9ialxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnNlcnRWYWx1ZSA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSAmJiB0eXBlb2Yga2V5ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBbLi4ub2JqLnNsaWNlKDAsIGtleSksIHZhbHVlLCAuLi5vYmouc2xpY2Uoa2V5ICsgMSwgb2JqLmxlbmd0aCldO1xuICB9XG5cbiAgcmV0dXJuIHsuLi5vYmosIFtrZXldOiB2YWx1ZX07XG59O1xuXG4vKipcbiAqIGNoZWNrIGlmIHZhbHVlIGlzIGEgbG9vc2Ugb2JqZWN0IGluY2x1ZGluZyBhIHBsYWluIG9iamVjdCwgYXJyYXksIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKTtcbn1cblxuY29uc3Qgc2V0UGF0aCA9IChba2V5LCAuLi5uZXh0XSwgdmFsdWUsIG9iaikgPT4ge1xuICAvLyBpcyBPYmplY3QgYWxsb3dzIGpzIG9iamVjdCwgYXJyYXkgYW5kIGZ1bmN0aW9uXG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAobmV4dC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gaW5zZXJ0VmFsdWUob2JqLCBrZXksIHZhbHVlKTtcbiAgfVxuXG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIGluc2VydFZhbHVlKG9iaiwga2V5LCBzZXRQYXRoKG5leHQsIHZhbHVlLCBvYmouaGFzT3duUHJvcGVydHkoa2V5KSA/IG9ialtrZXldIDoge30pKTtcbn07XG5cbi8qKlxuICogSW1tdXRhYmxlIHZlcnNpb24gb2YgXy5zZXRcbiAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjb25zdCBzZXQgPSAocGF0aCwgdmFsdWUsIG9iaikgPT4gKG9iaiA9PT0gbnVsbCA/IG9iaiA6IHNldFBhdGgocGF0aCwgdmFsdWUsIG9iaikpO1xuXG4vKipcbiAqIEdldCBlcnJvciBpbmZvcm1hdGlvbiBvZiB1bmtub3duIHR5cGVcbiAqIEV4dHJhY3RzIGFzIG11Y2ggaHVtYW4gcmVhZGFibGUgaW5mb3JtYXRpb24gYXMgcG9zc2libGVcbiAqIEVuc3VyZSByZXN1bHQgaXMgYW4gRXJyb3Igb2JqZWN0IHN1aXRhYmxlIGZvciB0aHJvdyBvciBwcm9taXNlIHJlamVjdGlvblxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9ICBlcnIgLSBVbmtub3duIGVycm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gaHVtYW4gcmVhZGFibGUgZXJyb3IgbXNnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFcnJvcihlcnIpIHtcbiAgaWYgKCFlcnIpIHtcbiAgICByZXR1cm4gJ1NvbWV0aGluZyB3ZW50IHdyb25nJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlcnI7XG4gIH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZXJyLm1lc3NhZ2U7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZXJyLmVycm9yXG4gICAgICA/IGdldEVycm9yKGVyci5lcnJvcilcbiAgICAgIDogZXJyLmVyclxuICAgICAgPyBnZXRFcnJvcihlcnIuZXJyKVxuICAgICAgOiBlcnIubWVzc2FnZVxuICAgICAgPyBnZXRFcnJvcihlcnIubWVzc2FnZSlcbiAgICAgIDogSlNPTi5zdHJpbmdpZnkoZXJyKTtcbiAgfVxuXG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUluc2VydChhcnIsIGluZGV4LCB2YWwpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgcmV0dXJuIFsuLi5hcnIuc2xpY2UoMCwgaW5kZXgpLCB2YWwsIC4uLmFyci5zbGljZShpbmRleCldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUZXN0KCkge1xuICByZXR1cm4gcHJvY2Vzcz8uZW52Py5OT0RFX0VOViA9PT0gJ3Rlc3QnO1xufVxuIl19