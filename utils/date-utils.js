"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floorTime = exports.timeRangeFilter = exports.timeFilter = exports.dateFilter = exports.strftimeFloat = exports.dataframeFilterWeekday = exports.isWeekday = exports.isDayOff = exports.isJapaneseHoliday = void 0;

var JapaneseHolidays = _interopRequireWildcard(require("japanese-holidays"));

var _dataUtils = require("./data-utils");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

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
// require('japanese-holidays');
var isJapaneseHoliday = function isJapaneseHoliday(date) {
  return JapaneseHolidays.isHoliday(date);
};

exports.isJapaneseHoliday = isJapaneseHoliday;

var isDayOff = function isDayOff(date) {
  var removeHoliday = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return !removeHoliday ? [0, 6].includes(date.getDayOfWeek) : isJapaneseHoliday(date) ? true : [0, 6].includes(date.getDayOfWeek);
};

exports.isDayOff = isDayOff;

var isWeekday = function isWeekday(date) {
  var removeHoliday = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return !isDayOff(date, removeHoliday);
};

exports.isWeekday = isWeekday;

var dataframeFilterWeekday = function dataframeFilterWeekday(df) {
  var removeHoliday = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return df.map();
}; //convert float time to timestring


exports.dataframeFilterWeekday = dataframeFilterWeekday;

var strftimeFloat = function strftimeFloat(date, format) {
  new Date(date);
}; //first filter date:


exports.strftimeFloat = strftimeFloat;

var dateFilter = function dateFilter(date, dow, daterange, removeholidayFlag) {
  date = new Date(date);

  if (daterange) {
    if (date < daterange[0] || date > daterange[1]) {
      return false;
    }
  }

  if (dow) {
    if (!dow.includes(date.getDay())) {
      return false;
    }
  }

  if (removeholidayFlag) {
    if (!isJapaneseHoliday(date)) {
      return false;
    }
  }

  return true;
}; //how to solve time shifting?


exports.dateFilter = dateFilter;

var timeFilter = function timeFilter(time, timeRange) {
  var timeWithoutDate = (0, _momentTimezone["default"])((0, _momentTimezone["default"])(time).format('LTS'), 'HH:mm:ss');
  var startTime = (0, _momentTimezone["default"])(timeRange[0], 'HH:mm:ss');
  var endTime = (0, _momentTimezone["default"])(timeRange[1], 'HH:mm:ss');
  return startTime.isBefore(timeWithoutDate) && endTime.isAfter(timeWithoutDate);
}; // 23:00 ~ 4:00 => 23:55 ~ 3:55 // 4:00 ~ 23:00 => 5:00 ~ 22:00


exports.timeFilter = timeFilter;

var timeRangeFilter = function timeRangeFilter(targetTimeRange, timeRange) {
  console.log('try time range filter');
  return (0, _momentTimezone["default"])((0, _momentTimezone["default"])(targetTimeRange[0]).format('LTS')) >= (0, _momentTimezone["default"])((0, _momentTimezone["default"])(timeRange[0]).format('LTS')) && (0, _momentTimezone["default"])((0, _momentTimezone["default"])(targetTimeRange[1]).format('LTS')) <= (0, _momentTimezone["default"])((0, _momentTimezone["default"])(timeRange[1]).format('LTS'));
};

exports.timeRangeFilter = timeRangeFilter;

var floorTime = function floorTime(date, dateformat, minute_unit) {
  // console.log('datetime formatter')
  date = new Date(date);
  var out_date = Math.floor(date / (1000 * 60 * minute_unit)) * 1000 * 60 * minute_unit;
  return dateformat === 'X' ? out_date : (0, _dataUtils.datetimeFormatter)(null)(dateformat)(out_date);
}; // export const strptime


exports.floorTime = floorTime;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIl0sIm5hbWVzIjpbImlzSmFwYW5lc2VIb2xpZGF5IiwiZGF0ZSIsIkphcGFuZXNlSG9saWRheXMiLCJpc0hvbGlkYXkiLCJpc0RheU9mZiIsInJlbW92ZUhvbGlkYXkiLCJpbmNsdWRlcyIsImdldERheU9mV2VlayIsImlzV2Vla2RheSIsImRhdGFmcmFtZUZpbHRlcldlZWtkYXkiLCJkZiIsIm1hcCIsInN0cmZ0aW1lRmxvYXQiLCJmb3JtYXQiLCJEYXRlIiwiZGF0ZUZpbHRlciIsImRvdyIsImRhdGVyYW5nZSIsInJlbW92ZWhvbGlkYXlGbGFnIiwiZ2V0RGF5IiwidGltZUZpbHRlciIsInRpbWUiLCJ0aW1lUmFuZ2UiLCJ0aW1lV2l0aG91dERhdGUiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiaXNCZWZvcmUiLCJpc0FmdGVyIiwidGltZVJhbmdlRmlsdGVyIiwidGFyZ2V0VGltZVJhbmdlIiwiY29uc29sZSIsImxvZyIsImZsb29yVGltZSIsImRhdGVmb3JtYXQiLCJtaW51dGVfdW5pdCIsIm91dF9kYXRlIiwiTWF0aCIsImZsb29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQXNCQTs7QUFDQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQU1PLElBQU1BLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRDtBQUFBLFNBQVVDLGdCQUFnQixDQUFDQyxTQUFqQixDQUEyQkYsSUFBM0IsQ0FBVjtBQUFBLENBQTFCOzs7O0FBRUEsSUFBTUcsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0gsSUFBRDtBQUFBLE1BQU9JLGFBQVAsdUVBQXFCLElBQXJCO0FBQUEsU0FBOEIsQ0FBQ0EsYUFBRCxHQUFpQixDQUFDLENBQUQsRUFBSSxDQUFK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Z0NBQU9TLFNBQVMsQ0FBQyxDQUFELENBQWhCLEVBQXFCVCxNQUFyQixDQUE0QixLQUE1QixDQUFQLENBQTdKO0FBQ0QsQ0FITTs7OztBQUtBLElBQU1tQixTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDL0IsSUFBRCxFQUFNZ0MsVUFBTixFQUFpQkMsV0FBakIsRUFBaUM7QUFDeEQ7QUFDQWpDLEVBQUFBLElBQUksR0FBRyxJQUFJYSxJQUFKLENBQVNiLElBQVQsQ0FBUDtBQUNBLE1BQU1rQyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFZcEMsSUFBSSxJQUFJLE9BQU8sRUFBUCxHQUFZaUMsV0FBaEIsQ0FBaEIsSUFBZ0QsSUFBaEQsR0FBdUQsRUFBdkQsR0FBNERBLFdBQTdFO0FBQ0EsU0FBT0QsVUFBVSxLQUFLLEdBQWYsR0FBbUJFLFFBQW5CLEdBQTRCLGtDQUFrQixJQUFsQixFQUF3QkYsVUFBeEIsRUFBb0NFLFFBQXBDLENBQW5DO0FBQ0QsQ0FMTSxDLENBYVAiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXF1aXJlKCdqYXBhbmVzZS1ob2xpZGF5cycpO1xuXG5pbXBvcnQgKiBhcyBKYXBhbmVzZUhvbGlkYXlzIGZyb20gJ2phcGFuZXNlLWhvbGlkYXlzJ1xuaW1wb3J0IHtkYXRldGltZUZvcm1hdHRlcn0gZnJvbSAnLi9kYXRhLXV0aWxzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcblxuZXhwb3J0IGNvbnN0IGlzSmFwYW5lc2VIb2xpZGF5ID0gKGRhdGUpID0+IEphcGFuZXNlSG9saWRheXMuaXNIb2xpZGF5KGRhdGUpO1xuXG5leHBvcnQgY29uc3QgaXNEYXlPZmYgPSAoZGF0ZSwgcmVtb3ZlSG9saWRheT10cnVlKSA9PiAhcmVtb3ZlSG9saWRheSA/IFswLCA2XS5pbmNsdWRlcyhkYXRlLmdldERheU9mV2VlaykgOiAoaXNKYXBhbmVzZUhvbGlkYXkoZGF0ZSkgPyB0cnVlIDogWzAsIDZdLmluY2x1ZGVzKGRhdGUuZ2V0RGF5T2ZXZWVrKSk7XG5cbmV4cG9ydCBjb25zdCBpc1dlZWtkYXkgPSAoZGF0ZSxyZW1vdmVIb2xpZGF5PXRydWUpID0+ICFpc0RheU9mZihkYXRlLHJlbW92ZUhvbGlkYXkpXG5cbmV4cG9ydCBjb25zdCBkYXRhZnJhbWVGaWx0ZXJXZWVrZGF5ID0gKGRmLHJlbW92ZUhvbGlkYXk9dHJ1ZSkgPT4gZGYubWFwKClcblxuLy9jb252ZXJ0IGZsb2F0IHRpbWUgdG8gdGltZXN0cmluZ1xuZXhwb3J0IGNvbnN0IHN0cmZ0aW1lRmxvYXQgPSAoZGF0ZSxmb3JtYXQpID0+XG57XG4gIG5ldyBEYXRlKGRhdGUpXG59XG5cbi8vZmlyc3QgZmlsdGVyIGRhdGU6XG5leHBvcnQgY29uc3QgZGF0ZUZpbHRlciA9IChkYXRlLGRvdyxkYXRlcmFuZ2UscmVtb3ZlaG9saWRheUZsYWcpID0+IHtcbiAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpXG5cbiAgaWYoZGF0ZXJhbmdlKXtcbiAgICBpZihkYXRlPGRhdGVyYW5nZVswXSB8fCBkYXRlPmRhdGVyYW5nZVsxXSl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZihkb3cpe1xuICAgIGlmKCFkb3cuaW5jbHVkZXMoZGF0ZS5nZXREYXkoKSkpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYocmVtb3ZlaG9saWRheUZsYWcpe1xuICAgIGlmKCFpc0phcGFuZXNlSG9saWRheShkYXRlKSl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vL2hvdyB0byBzb2x2ZSB0aW1lIHNoaWZ0aW5nP1xuZXhwb3J0IGNvbnN0IHRpbWVGaWx0ZXIgPSAodGltZSx0aW1lUmFuZ2UpID0+IHtcbiAgY29uc3QgdGltZVdpdGhvdXREYXRlID0gbW9tZW50KG1vbWVudCh0aW1lKS5mb3JtYXQoJ0xUUycpLCdISDptbTpzcycpXG4gIGNvbnN0IHN0YXJ0VGltZSA9IG1vbWVudCh0aW1lUmFuZ2VbMF0sJ0hIOm1tOnNzJylcbiAgY29uc3QgZW5kVGltZSA9IG1vbWVudCh0aW1lUmFuZ2VbMV0sJ0hIOm1tOnNzJylcbiAgcmV0dXJuIHN0YXJ0VGltZS5pc0JlZm9yZSh0aW1lV2l0aG91dERhdGUpICYmIGVuZFRpbWUuaXNBZnRlcih0aW1lV2l0aG91dERhdGUpXG59XG5cblxuLy8gMjM6MDAgfiA0OjAwID0+IDIzOjU1IH4gMzo1NSAvLyA0OjAwIH4gMjM6MDAgPT4gNTowMCB+IDIyOjAwXG5leHBvcnQgY29uc3QgdGltZVJhbmdlRmlsdGVyID0gKHRhcmdldFRpbWVSYW5nZSx0aW1lUmFuZ2UpID0+IHtcbiAgY29uc29sZS5sb2coJ3RyeSB0aW1lIHJhbmdlIGZpbHRlcicpXG4gIHJldHVybiBtb21lbnQobW9tZW50KHRhcmdldFRpbWVSYW5nZVswXSkuZm9ybWF0KCdMVFMnKSkgPj0gbW9tZW50KG1vbWVudCh0aW1lUmFuZ2VbMF0pLmZvcm1hdCgnTFRTJykpICYmIG1vbWVudChtb21lbnQodGFyZ2V0VGltZVJhbmdlWzFdKS5mb3JtYXQoJ0xUUycpKSA8PSBtb21lbnQobW9tZW50KHRpbWVSYW5nZVsxXSkuZm9ybWF0KCdMVFMnKSlcbn1cblxuZXhwb3J0IGNvbnN0IGZsb29yVGltZSA9IChkYXRlLGRhdGVmb3JtYXQsbWludXRlX3VuaXQpID0+IHtcbiAgLy8gY29uc29sZS5sb2coJ2RhdGV0aW1lIGZvcm1hdHRlcicpXG4gIGRhdGUgPSBuZXcgRGF0ZShkYXRlKVxuICBjb25zdCBvdXRfZGF0ZSA9IE1hdGguZmxvb3IoIGRhdGUgLyAoMTAwMCAqIDYwICogbWludXRlX3VuaXQpKSAqIDEwMDAgKiA2MCAqIG1pbnV0ZV91bml0XG4gIHJldHVybiBkYXRlZm9ybWF0ID09PSAnWCc/b3V0X2RhdGU6ZGF0ZXRpbWVGb3JtYXR0ZXIobnVsbCkoZGF0ZWZvcm1hdCkob3V0X2RhdGUpXG59XG5cblxuXG5cblxuXG5cbi8vIGV4cG9ydCBjb25zdCBzdHJwdGltZVxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=