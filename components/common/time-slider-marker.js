"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTickFormat = getTickFormat;
exports.getXAxis = getXAxis;
exports.updateAxis = updateAxis;
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

var _d3Axis = require("d3-axis");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _dataUtils = require("../../utils/data-utils");

var _templateObject;

var MIN_TICK_WIDTH_LARGE = 80;
var MIN_TICK_WIDTH_SMALL = 50;
var HEIGHT = 30;

var TimeSliderContainer = _styledComponents["default"].svg(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  overflow: visible;\n  margin-top: 6px;\n\n  .axis text {\n    font-size: ", ";\n    fill: ", ";\n  }\n\n  .axis line,\n  .axis path {\n    fill: none;\n    stroke: ", ";\n    shape-rendering: crispEdges;\n    stroke-width: 2;\n  }\n\n  .axis .domain {\n    display: none;\n  }\n\n  .value {\n    fill: ", ";\n    font-size: ", ";\n\n    &.start {\n      text-anchor: start;\n    }\n\n    &.end {\n      text-anchor: end;\n    }\n  }\n"])), function (props) {
  return props.theme.axisFontSize;
}, function (props) {
  return props.theme.axisFontColor;
}, function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return props.theme.axisFontColor;
}, function (props) {
  return props.theme.axisFontSize;
});

var TICK_FORMATS = {
  millisecond: '.SSS',
  second: ':ss',
  minute: 'HH:ss',
  hour: 'HH A',
  day: 'ddd DD',
  week: 'MMM DD',
  month: 'MMM',
  year: 'YYYY'
}; // timezone sensitive tick formatter based on moment
// adapted based on d3 time scale tick format https://github.com/d3/d3-scale/blob/master/src/time.js#L59

function getTickFormat(timezone) {
  // date is js date object
  var toMoment = timezone ? function (date) {
    return (0, _momentTimezone["default"])(date).tz(timezone);
  } : _momentTimezone["default"];
  var formatter = (0, _dataUtils.datetimeFormatter)(timezone);
  return function (date) {
    return (toMoment(date).startOf('second') < date ? formatter(TICK_FORMATS.millisecond) : toMoment(date).startOf('minute') < date ? formatter(TICK_FORMATS.second) : toMoment(date).startOf('hour') < date ? formatter(TICK_FORMATS.minute) : toMoment(date).startOf('day') < date ? formatter(TICK_FORMATS.hour) : toMoment(date).startOf('month') < date ? toMoment(date).startOf('isoWeek') < date ? formatter(TICK_FORMATS.day) : formatter(TICK_FORMATS.week) : toMoment(date).startOf('year') < date ? formatter(TICK_FORMATS.month) : formatter(TICK_FORMATS.year))(date);
  };
} // create a helper function so we can test it


function getXAxis(domain, width, isEnlarged, timezone) {
  if (!Array.isArray(domain) || !domain.every(Number.isFinite)) {
    return null;
  }

  var scale = (0, _d3Scale.scaleUtc)().domain(domain).range([0, width]);

  if (!scale) {
    return null;
  }

  var ticks = Math.floor(width / (isEnlarged ? MIN_TICK_WIDTH_LARGE : MIN_TICK_WIDTH_SMALL));
  var tickFormat = timezone ? getTickFormat(timezone) : null;
  var xAxis = (0, _d3Axis.axisBottom)(scale).ticks(ticks).tickSize(0).tickPadding(12);

  if (tickFormat) {
    xAxis.tickFormat(tickFormat);
  }

  return xAxis;
}

function updateAxis(xAxisRef, xAxis) {
  if (!xAxis) {
    return;
  }

  (0, _d3Selection.select)(xAxisRef.current).call(xAxis);
}

function TimeSliderMarkerFactory() {
  var TimeSliderMarker = function TimeSliderMarker(_ref) {
    var width = _ref.width,
        domain = _ref.domain,
        _ref$isEnlarged = _ref.isEnlarged,
        isEnlarged = _ref$isEnlarged === void 0 ? true : _ref$isEnlarged,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? HEIGHT : _ref$height,
        timezone = _ref.timezone;
    var xAxisRef = (0, _react.useRef)(null);
    var xAxis = (0, _react.useMemo)(function () {
      return getXAxis(domain, width, isEnlarged, timezone);
    }, [domain, width, isEnlarged, timezone]);
    (0, _react.useEffect)(function () {
      updateAxis(xAxisRef, xAxis);
    }, [xAxisRef, xAxis]);
    return /*#__PURE__*/_react["default"].createElement(TimeSliderContainer, {
      className: "time-slider-marker",
      width: width,
      height: height
    }, /*#__PURE__*/_react["default"].createElement("g", {
      className: "x axis",
      ref: xAxisRef,
      transform: "translate(0, 0)"
    }));
  };

  TimeSliderMarker.propTypes = {
    domain: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    width: _propTypes["default"].number.isRequired
  };
  return /*#__PURE__*/_react["default"].memo(TimeSliderMarker);
}

var _default = TimeSliderMarkerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXNsaWRlci1tYXJrZXIuanMiXSwibmFtZXMiOlsiTUlOX1RJQ0tfV0lEVEhfTEFSR0UiLCJNSU5fVElDS19XSURUSF9TTUFMTCIsIkhFSUdIVCIsIlRpbWVTbGlkZXJDb250YWluZXIiLCJzdHlsZWQiLCJzdmciLCJwcm9wcyIsInRoZW1lIiwiYXhpc0ZvbnRTaXplIiwiYXhpc0ZvbnRDb2xvciIsInNsaWRlckJhckJnZCIsIlRJQ0tfRk9STUFUUyIsIm1pbGxpc2Vjb25kIiwic2Vjb25kIiwibWludXRlIiwiaG91ciIsImRheSIsIndlZWsiLCJtb250aCIsInllYXIiLCJnZXRUaWNrRm9ybWF0IiwidGltZXpvbmUiLCJ0b01vbWVudCIsImRhdGUiLCJ0eiIsIm1vbWVudCIsImZvcm1hdHRlciIsInN0YXJ0T2YiLCJnZXRYQXhpcyIsImRvbWFpbiIsIndpZHRoIiwiaXNFbmxhcmdlZCIsIkFycmF5IiwiaXNBcnJheSIsImV2ZXJ5IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJzY2FsZSIsInJhbmdlIiwidGlja3MiLCJNYXRoIiwiZmxvb3IiLCJ0aWNrRm9ybWF0IiwieEF4aXMiLCJ0aWNrU2l6ZSIsInRpY2tQYWRkaW5nIiwidXBkYXRlQXhpcyIsInhBeGlzUmVmIiwiY3VycmVudCIsImNhbGwiLCJUaW1lU2xpZGVyTWFya2VyRmFjdG9yeSIsIlRpbWVTbGlkZXJNYXJrZXIiLCJoZWlnaHQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiaXNSZXF1aXJlZCIsIm51bWJlciIsIlJlYWN0IiwibWVtbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLG9CQUFvQixHQUFHLEVBQTdCO0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsRUFBN0I7QUFDQSxJQUFNQyxN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aWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7dXNlUmVmLCB1c2VFZmZlY3QsIHVzZU1lbW99IGZyb20gJ3JlYWN0JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge3NjYWxlVXRjfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQge3NlbGVjdH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7YXhpc0JvdHRvbX0gZnJvbSAnZDMtYXhpcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7ZGF0ZXRpbWVGb3JtYXR0ZXJ9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBNSU5fVElDS19XSURUSF9MQVJHRSA9IDgwO1xuY29uc3QgTUlOX1RJQ0tfV0lEVEhfU01BTEwgPSA1MDtcbmNvbnN0IEhFSUdIVCA9IDMwO1xuXG5jb25zdCBUaW1lU2xpZGVyQ29udGFpbmVyID0gc3R5bGVkLnN2Z2BcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgbWFyZ2luLXRvcDogNnB4O1xuXG4gIC5heGlzIHRleHQge1xuICAgIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5heGlzRm9udFNpemV9O1xuICAgIGZpbGw6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuYXhpc0ZvbnRDb2xvcn07XG4gIH1cblxuICAuYXhpcyBsaW5lLFxuICAuYXhpcyBwYXRoIHtcbiAgICBmaWxsOiBub25lO1xuICAgIHN0cm9rZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJCYXJCZ2R9O1xuICAgIHNoYXBlLXJlbmRlcmluZzogY3Jpc3BFZGdlcztcbiAgICBzdHJva2Utd2lkdGg6IDI7XG4gIH1cblxuICAuYXhpcyAuZG9tYWluIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLnZhbHVlIHtcbiAgICBmaWxsOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmF4aXNGb250Q29sb3J9O1xuICAgIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5heGlzRm9udFNpemV9O1xuXG4gICAgJi5zdGFydCB7XG4gICAgICB0ZXh0LWFuY2hvcjogc3RhcnQ7XG4gICAgfVxuXG4gICAgJi5lbmQge1xuICAgICAgdGV4dC1hbmNob3I6IGVuZDtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFRJQ0tfRk9STUFUUyA9IHtcbiAgbWlsbGlzZWNvbmQ6ICcuU1NTJyxcbiAgc2Vjb25kOiAnOnNzJyxcbiAgbWludXRlOiAnSEg6c3MnLFxuICBob3VyOiAnSEggQScsXG4gIGRheTogJ2RkZCBERCcsXG4gIHdlZWs6ICdNTU0gREQnLFxuICBtb250aDogJ01NTScsXG4gIHllYXI6ICdZWVlZJ1xufTtcblxuLy8gdGltZXpvbmUgc2Vuc2l0aXZlIHRpY2sgZm9ybWF0dGVyIGJhc2VkIG9uIG1vbWVudFxuLy8gYWRhcHRlZCBiYXNlZCBvbiBkMyB0aW1lIHNjYWxlIHRpY2sgZm9ybWF0IGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zY2FsZS9ibG9iL21hc3Rlci9zcmMvdGltZS5qcyNMNTlcbmV4cG9ydCBmdW5jdGlvbiBnZXRUaWNrRm9ybWF0KHRpbWV6b25lKSB7XG4gIC8vIGRhdGUgaXMganMgZGF0ZSBvYmplY3RcbiAgY29uc3QgdG9Nb21lbnQgPSB0aW1lem9uZSA/IGRhdGUgPT4gbW9tZW50KGRhdGUpLnR6KHRpbWV6b25lKSA6IG1vbWVudDtcbiAgY29uc3QgZm9ybWF0dGVyID0gZGF0ZXRpbWVGb3JtYXR0ZXIodGltZXpvbmUpO1xuXG4gIHJldHVybiBkYXRlID0+XG4gICAgKHRvTW9tZW50KGRhdGUpLnN0YXJ0T2YoJ3NlY29uZCcpIDwgZGF0ZVxuICAgICAgPyBmb3JtYXR0ZXIoVElDS19GT1JNQVRTLm1pbGxpc2Vjb25kKVxuICAgICAgOiB0b01vbWVudChkYXRlKS5zdGFydE9mKCdtaW51dGUnKSA8IGRhdGVcbiAgICAgID8gZm9ybWF0dGVyKFRJQ0tfRk9STUFUUy5zZWNvbmQpXG4gICAgICA6IHRvTW9tZW50KGRhdGUpLnN0YXJ0T2YoJ2hvdXInKSA8IGRhdGVcbiAgICAgID8gZm9ybWF0dGVyKFRJQ0tfRk9STUFUUy5taW51dGUpXG4gICAgICA6IHRvTW9tZW50KGRhdGUpLnN0YXJ0T2YoJ2RheScpIDwgZGF0ZVxuICAgICAgPyBmb3JtYXR0ZXIoVElDS19GT1JNQVRTLmhvdXIpXG4gICAgICA6IHRvTW9tZW50KGRhdGUpLnN0YXJ0T2YoJ21vbnRoJykgPCBkYXRlXG4gICAgICA/IHRvTW9tZW50KGRhdGUpLnN0YXJ0T2YoJ2lzb1dlZWsnKSA8IGRhdGVcbiAgICAgICAgPyBmb3JtYXR0ZXIoVElDS19GT1JNQVRTLmRheSlcbiAgICAgICAgOiBmb3JtYXR0ZXIoVElDS19GT1JNQVRTLndlZWspXG4gICAgICA6IHRvTW9tZW50KGRhdGUpLnN0YXJ0T2YoJ3llYXInKSA8IGRhdGVcbiAgICAgID8gZm9ybWF0dGVyKFRJQ0tfRk9STUFUUy5tb250aClcbiAgICAgIDogZm9ybWF0dGVyKFRJQ0tfRk9STUFUUy55ZWFyKSkoZGF0ZSk7XG59XG5cbi8vIGNyZWF0ZSBhIGhlbHBlciBmdW5jdGlvbiBzbyB3ZSBjYW4gdGVzdCBpdFxuZXhwb3J0IGZ1bmN0aW9uIGdldFhBeGlzKGRvbWFpbiwgd2lkdGgsIGlzRW5sYXJnZWQsIHRpbWV6b25lKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb21haW4pIHx8ICFkb21haW4uZXZlcnkoTnVtYmVyLmlzRmluaXRlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHNjYWxlID0gc2NhbGVVdGMoKVxuICAgIC5kb21haW4oZG9tYWluKVxuICAgIC5yYW5nZShbMCwgd2lkdGhdKTtcbiAgaWYgKCFzY2FsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdGlja3MgPSBNYXRoLmZsb29yKHdpZHRoIC8gKGlzRW5sYXJnZWQgPyBNSU5fVElDS19XSURUSF9MQVJHRSA6IE1JTl9USUNLX1dJRFRIX1NNQUxMKSk7XG4gIGNvbnN0IHRpY2tGb3JtYXQgPSB0aW1lem9uZSA/IGdldFRpY2tGb3JtYXQodGltZXpvbmUpIDogbnVsbDtcbiAgY29uc3QgeEF4aXMgPSBheGlzQm90dG9tKHNjYWxlKVxuICAgIC50aWNrcyh0aWNrcylcbiAgICAudGlja1NpemUoMClcbiAgICAudGlja1BhZGRpbmcoMTIpO1xuICBpZiAodGlja0Zvcm1hdCkge1xuICAgIHhBeGlzLnRpY2tGb3JtYXQodGlja0Zvcm1hdCk7XG4gIH1cblxuICByZXR1cm4geEF4aXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBeGlzKHhBeGlzUmVmLCB4QXhpcykge1xuICBpZiAoIXhBeGlzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc2VsZWN0KHhBeGlzUmVmLmN1cnJlbnQpLmNhbGwoeEF4aXMpO1xufVxuXG5mdW5jdGlvbiBUaW1lU2xpZGVyTWFya2VyRmFjdG9yeSgpIHtcbiAgY29uc3QgVGltZVNsaWRlck1hcmtlciA9ICh7d2lkdGgsIGRvbWFpbiwgaXNFbmxhcmdlZCA9IHRydWUsIGhlaWdodCA9IEhFSUdIVCwgdGltZXpvbmV9KSA9PiB7XG4gICAgY29uc3QgeEF4aXNSZWYgPSB1c2VSZWYobnVsbCk7XG4gICAgY29uc3QgeEF4aXMgPSB1c2VNZW1vKCgpID0+IGdldFhBeGlzKGRvbWFpbiwgd2lkdGgsIGlzRW5sYXJnZWQsIHRpbWV6b25lKSwgW1xuICAgICAgZG9tYWluLFxuICAgICAgd2lkdGgsXG4gICAgICBpc0VubGFyZ2VkLFxuICAgICAgdGltZXpvbmVcbiAgICBdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgdXBkYXRlQXhpcyh4QXhpc1JlZiwgeEF4aXMpO1xuICAgIH0sIFt4QXhpc1JlZiwgeEF4aXNdKTtcbiAgICByZXR1cm4gKFxuICAgICAgPFRpbWVTbGlkZXJDb250YWluZXIgY2xhc3NOYW1lPVwidGltZS1zbGlkZXItbWFya2VyXCIgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxnIGNsYXNzTmFtZT1cInggYXhpc1wiIHJlZj17eEF4aXNSZWZ9IHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCAwKVwiIC8+XG4gICAgICA8L1RpbWVTbGlkZXJDb250YWluZXI+XG4gICAgKTtcbiAgfTtcblxuICBUaW1lU2xpZGVyTWFya2VyLnByb3BUeXBlcyA9IHtcbiAgICBkb21haW46IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHJldHVybiBSZWFjdC5tZW1vKFRpbWVTbGlkZXJNYXJrZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUaW1lU2xpZGVyTWFya2VyRmFjdG9yeTtcbiJdfQ==