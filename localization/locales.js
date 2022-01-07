"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_CODES = exports.LOCALES = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var LOCALES = {
  en: 'English',
  fi: 'Suomi',
  pt: 'Português',
  es: 'Español',
  ca: 'Català',
  ja: '日本語',
  cn: '简体中文',
  ru: 'Русский'
};
/**
 * Localization can be passed to `KeplerGl` via uiState `locale`.
 * Available languages are `en` and `fi`. Default language is `en`
 * @constant
 * @public
 * @example
 * ```js
 * import {combineReducers} from 'redux';
 * import {LOCALE_CODES} from 'kepler.gl/localization/locales';
 *
 * const customizedKeplerGlReducer = keplerGlReducer
 *   .initialState({
 *     uiState: {
 *       // use Finnish locale
 *       locale: LOCALE_CODES.fi
 *     }
 *   });
 *
 * ```
 */

exports.LOCALES = LOCALES;
var LOCALE_CODES = Object.keys(LOCALES).reduce(function (acc, key) {
  return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, key, key));
}, {});
exports.LOCALE_CODES = LOCALE_CODES;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2NhbGl6YXRpb24vbG9jYWxlcy5qcyJdLCJuYW1lcyI6WyJMT0NBTEVTIiwiZW4iLCJmaSIsInB0IiwiZXMiLCJjYSIsImphIiwiY24iLCJydSIsIkxPQ0FMRV9DT0RFUyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBTUEsT0FBTyxHQUFHO0FBQ3JCQyxFQUFBQSxFQUFFLEVBQUUsU0FEaUI7QUFFckJDLEVBQUFBLEVBQUUsRUFBRSxPQUZpQjtBQUdyQkMsRUFBQUEsRUFBRSxFQUFFLFdBSGlCO0FBSXJCQyxFQUFBQSxFQUFFLEVBQUUsU0FKaUI7QUFLckJDLEVBQUFBLEVBQUUsRUFBRSxRQUxpQjtBQU1yQkMsRUFBQUEsRUFBRSxFQUFFLEtBTmlCO0FBT3JCQyxFQUFBQSxFQUFFLEVBQUUsTUFQaUI7QUFRckJDLEVBQUFBLEVBQUUsRUFBRTtBQVJpQixDQUFoQjtBQVdQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVPLElBQU1DLFlBQVksR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlYLE9BQVosRUFBcUJZLE1BQXJCLENBQTRCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTjtBQUFBLHlDQUFtQkQsR0FBbkIsNENBQXlCQyxHQUF6QixFQUErQkEsR0FBL0I7QUFBQSxDQUE1QixFQUFrRSxFQUFsRSxDQUFyQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBjb25zdCBMT0NBTEVTID0ge1xuICBlbjogJ0VuZ2xpc2gnLFxuICBmaTogJ1N1b21pJyxcbiAgcHQ6ICdQb3J0dWd1w6pzJyxcbiAgZXM6ICdFc3Bhw7FvbCcsXG4gIGNhOiAnQ2F0YWzDoCcsXG4gIGphOiAn5pel5pys6KqeJyxcbiAgY246ICfnroDkvZPkuK3mlocnLFxuICBydTogJ9Cg0YPRgdGB0LrQuNC5J1xufTtcblxuLyoqXG4gKiBMb2NhbGl6YXRpb24gY2FuIGJlIHBhc3NlZCB0byBgS2VwbGVyR2xgIHZpYSB1aVN0YXRlIGBsb2NhbGVgLlxuICogQXZhaWxhYmxlIGxhbmd1YWdlcyBhcmUgYGVuYCBhbmQgYGZpYC4gRGVmYXVsdCBsYW5ndWFnZSBpcyBgZW5gXG4gKiBAY29uc3RhbnRcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4JztcbiAqIGltcG9ydCB7TE9DQUxFX0NPREVTfSBmcm9tICdrZXBsZXIuZ2wvbG9jYWxpemF0aW9uL2xvY2FsZXMnO1xuICpcbiAqIGNvbnN0IGN1c3RvbWl6ZWRLZXBsZXJHbFJlZHVjZXIgPSBrZXBsZXJHbFJlZHVjZXJcbiAqICAgLmluaXRpYWxTdGF0ZSh7XG4gKiAgICAgdWlTdGF0ZToge1xuICogICAgICAgLy8gdXNlIEZpbm5pc2ggbG9jYWxlXG4gKiAgICAgICBsb2NhbGU6IExPQ0FMRV9DT0RFUy5maVxuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogYGBgXG4gKi9cblxuZXhwb3J0IGNvbnN0IExPQ0FMRV9DT0RFUyA9IE9iamVjdC5rZXlzKExPQ0FMRVMpLnJlZHVjZSgoYWNjLCBrZXkpID0+ICh7Li4uYWNjLCBba2V5XToga2V5fSksIHt9KTtcbiJdfQ==