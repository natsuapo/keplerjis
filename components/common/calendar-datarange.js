"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _lodash = _interopRequireDefault(require("lodash.pick"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactDateRange = require("react-date-range");

var _templateObject, _templateObject2;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledDataRangeNew = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n.rdrCalendarWrapper {\n  box-sizing: inherit;\n  background: #ffffff;\n  display: inline-flex;\n  flex-direction: column;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n\n}\n"])));

var DateRangeWithStyle = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n.rdrCalendarWrapper {\n  box-sizing: inherit;\n  background: #ffffff;\n  display: inline-flex;\n  flex-direction: column;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n\n}\n\n.rdrDateDisplay{\n  display: flex;\n  justify-content: space-between;\n}\n\n.rdrDateDisplayItem{\n  flex: 1 1;\n  width: 0;\n  text-align: center;\n  color: inherit;\n}\n\n.rdrDateDisplayItem + .rdrDateDisplayItem{\n    margin-left: 0.833em;\n  }\n\n.rdrDateDisplayItem input{\n    text-align: inherit\n  }\n\n.rdrDateDisplayItem input:disabled{\n      cursor: default;\n    }\n\n.rdrDateDisplayItemActive{}\n\n.rdrMonthAndYearWrapper {\n  box-sizing: inherit;\n  display: flex;\n  justify-content: space-between;\n}\n\n.rdrMonthAndYearPickers{\n  flex: 1 1 auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.rdrMonthPicker{}\n\n.rdrYearPicker{}\n\n.rdrNextPrevButton {\n  box-sizing: inherit;\n  cursor: pointer;\n  outline: none;\n}\n\n.rdrPprevButton {}\n\n.rdrNextButton {}\n\n.rdrMonths{\n  display: flex;\n}\n\n.rdrMonthsVertical{\n  flex-direction: column;\n}\n\n.rdrMonthsHorizontal > div > div > div{\n  display: flex;\n  flex-direction: row;\n}\n\n.rdrMonth{\n  width: 27.667em;\n}\n\n.rdrWeekDays{\n  display: flex;\n}\n\n.rdrWeekDay {\n  flex-basis: calc(100% / 7);\n  box-sizing: inherit;\n  text-align: center;\n}\n\n.rdrDays{\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.rdrDateDisplayWrapper{}\n\n.rdrMonthName{}\n\n.rdrInfiniteMonths{\n  overflow: auto;\n}\n\n.rdrDateRangeWrapper{\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.rdrDateInput {\n  position: relative;\n}\n\n.rdrDateInput input {\n    outline: none;\n  }\n\n.rdrDateInput .rdrWarning {\n    position: absolute;\n    font-size: 1.6em;\n    line-height: 1.6em;\n    top: 0;\n    right: .25em;\n    color: #FF0000;\n  }\n\n.rdrDay {\n  box-sizing: inherit;\n  width: calc(100% / 7);\n  position: relative;\n  font: inherit;\n  cursor: pointer;\n}\n\n.rdrDayNumber {\n  display: block;\n  position: relative;\n}\n\n.rdrDayNumber span{\n    color: #1d2429;\n  }\n\n.rdrDayDisabled {\n  cursor: not-allowed;\n}\n\n@supports (-ms-ime-align: auto) {\n  .rdrDay {\n    flex-basis: 14.285% !important;\n  }\n}\n\n.rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge{\n  pointer-events: none;\n}\n\n.rdrInRange{}\n\n.rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview{\n  pointer-events: none;\n}\n\n.rdrDayHovered{}\n\n.rdrDayActive{}\n\n.rdrDateRangePickerWrapper{\n  display: inline-flex;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.rdrDefinedRangesWrapper{}\n\n.rdrStaticRanges{\n  display: flex;\n  flex-direction: column;\n}\n\n.rdrStaticRange{\n  font-size: inherit;\n}\n\n.rdrStaticRangeLabel{}\n\n.rdrInputRanges{}\n\n.rdrInputRange{\n  display: flex;\n}\n\n.rdrInputRangeInput{}\n"])));

function noop() {}

function dateToString() {}

var StyledDateRange = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(StyledDateRange, _Component);

  var _super = _createSuper(StyledDateRange);

  function StyledDateRange() {
    var _this;

    (0, _classCallCheck2["default"])(this, StyledDateRange);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "domainSelector", _this.props.domain);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rangeSelector", _this.props.range);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSelect", function (args) {
      console.log('change data');
      var _args$selection = args.selection,
          startDate = _args$selection.startDate,
          endDate = _args$selection.endDate;
      _this.selectionRange = args.selection;
      console.log(_this.props.filter);

      _this.props.setFilter([startDate, endDate]);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "minDate", _this.props.domain.date[0]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "maxDate", _this.props.domain.date[1]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "selectionRange", {
      startDate: _this.minDate,
      endDate: _this.maxDate,
      // endDate: null,
      key: 'selection'
    });
    return _this;
  }

  (0, _createClass2["default"])(StyledDateRange, [{
    key: "render",
    value: function render() {
      // console.log('rendering styled daterange')
      return /*#__PURE__*/_react["default"].createElement(StyledDataRangeNew, null, /*#__PURE__*/_react["default"].createElement(_reactDateRange.DateRange, {
        ranges: [this.selectionRange],
        onChange: this.handleSelect,
        minDate: this.minDate,
        maxDate: this.maxDate,
        moveRangeOnFirstSelection: false
      }));
    }
  }]);
  return StyledDateRange;
}(_react.Component);

exports["default"] = StyledDateRange;
(0, _defineProperty2["default"])(StyledDateRange, "defaultProps", {
  domain: null,
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9jYWxlbmRhci1kYXRhcmFuZ2UuanMiXSwibmFtZXMiOlsiU3R5bGVkRGF0YVJhbmdlTmV3Iiwic3R5bGVkIiwiZGl2IiwiRGF0ZVJhbmdlV2l0aFN0eWxlIiwibm9vcCIsImRhdGVUb1N0cmluZyIsIlN0eWxlZERhdGVSYW5nZSIsInByb3BzIiwiZG9tYWluIiwicmFuZ2UiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsInNlbGVjdGlvbiIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJzZWxlY3Rpb25SYW5nZSIsImZpbHRlciIsInNldEZpbHRlciIsImRhdGUiLCJtaW5EYXRlIiwibWF4RGF0ZSIsImtleSIsImhhbmRsZVNlbGVjdCIsIkNvbXBvbmVudCIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxrQkFBa0IsR0FBR0MsNkJBQU9DLEdBQVYsZ1ZBQXhCOztBQWNBLElBQU1DLGtCQUFrQixHQUFHRiw2QkFBT0MsR0FBViw4aEdBQXhCOztBQXlNQSxTQUFTRSxJQUFULEdBQWdCLENBQUU7O0FBRWxCLFNBQVNDLFlBQVQsR0FBdUIsQ0FFdEI7O0lBRW9CQyxlOzs7Ozs7Ozs7Ozs7Ozs7dUdBU0YsTUFBS0MsS0FBTCxDQUFXQyxNO3NHQUNaLE1BQUtELEtBQUwsQ0FBV0UsSztxR0FFWixVQUFBQyxJQUFJLEVBQUk7QUFDckJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7QUFEcUIsNEJBRVFGLElBQUksQ0FBQ0csU0FGYjtBQUFBLFVBRWRDLFNBRmMsbUJBRWRBLFNBRmM7QUFBQSxVQUVKQyxPQUZJLG1CQUVKQSxPQUZJO0FBR3JCLFlBQUtDLGNBQUwsR0FBc0JOLElBQUksQ0FBQ0csU0FBM0I7QUFDQUYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBS0wsS0FBTCxDQUFXVSxNQUF2Qjs7QUFDQSxZQUFLVixLQUFMLENBQVdXLFNBQVgsQ0FBcUIsQ0FBQ0osU0FBRCxFQUFXQyxPQUFYLENBQXJCO0FBRUQsSztnR0FFUyxNQUFLUixLQUFMLENBQVdDLE1BQVgsQ0FBa0JXLElBQWxCLENBQXVCLENBQXZCLEM7Z0dBQ0EsTUFBS1osS0FBTCxDQUFXQyxNQUFYLENBQWtCVyxJQUFsQixDQUF1QixDQUF2QixDO3VHQUVPO0FBQ2ZMLE1BQUFBLFNBQVMsRUFBRSxNQUFLTSxPQUREO0FBRWZMLE1BQUFBLE9BQU8sRUFBRSxNQUFLTSxPQUZDO0FBR2Y7QUFDQUMsTUFBQUEsR0FBRyxFQUFFO0FBSlUsSzs7Ozs7O1dBT2pCLGtCQUFRO0FBQ047QUFDQSwwQkFDRSxnQ0FBQyxrQkFBRCxxQkFDRSxnQ0FBQyx5QkFBRDtBQUNFLFFBQUEsTUFBTSxFQUFFLENBQUMsS0FBS04sY0FBTixDQURWO0FBRUUsUUFBQSxRQUFRLEVBQUUsS0FBS08sWUFGakI7QUFHRSxRQUFBLE9BQU8sRUFBRSxLQUFLSCxPQUhoQjtBQUlFLFFBQUEsT0FBTyxFQUFFLEtBQUtDLE9BSmhCO0FBS0UsUUFBQSx5QkFBeUIsRUFBRTtBQUw3QixRQURGLENBREY7QUFXRDs7O0VBNUMwQ0csZ0I7OztpQ0FBeEJsQixlLGtCQUVHO0FBQ3BCRSxFQUFBQSxNQUFNLEVBQUUsSUFEWTtBQUVwQk0sRUFBQUEsU0FBUyxFQUFFLElBQUlXLElBQUosRUFGUztBQUdwQlYsRUFBQUEsT0FBTyxFQUFFLElBQUlVLElBQUosRUFIVztBQUlwQkgsRUFBQUEsR0FBRyxFQUFDO0FBSmdCLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHtEYXRlUmFuZ2V9IGZyb20gJ3JlYWN0LWRhdGUtcmFuZ2UnO1xuXG5jb25zdCBTdHlsZWREYXRhUmFuZ2VOZXcgPSBzdHlsZWQuZGl2YFxuLnJkckNhbGVuZGFyV3JhcHBlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG59XG5gO1xuXG5jb25zdCBEYXRlUmFuZ2VXaXRoU3R5bGUgPSBzdHlsZWQuZGl2YFxuLnJkckNhbGVuZGFyV3JhcHBlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG59XG5cbi5yZHJEYXRlRGlzcGxheXtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4ucmRyRGF0ZURpc3BsYXlJdGVte1xuICBmbGV4OiAxIDE7XG4gIHdpZHRoOiAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG4ucmRyRGF0ZURpc3BsYXlJdGVtICsgLnJkckRhdGVEaXNwbGF5SXRlbXtcbiAgICBtYXJnaW4tbGVmdDogMC44MzNlbTtcbiAgfVxuXG4ucmRyRGF0ZURpc3BsYXlJdGVtIGlucHV0e1xuICAgIHRleHQtYWxpZ246IGluaGVyaXRcbiAgfVxuXG4ucmRyRGF0ZURpc3BsYXlJdGVtIGlucHV0OmRpc2FibGVke1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIH1cblxuLnJkckRhdGVEaXNwbGF5SXRlbUFjdGl2ZXt9XG5cbi5yZHJNb250aEFuZFllYXJXcmFwcGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4ucmRyTW9udGhBbmRZZWFyUGlja2Vyc3tcbiAgZmxleDogMSAxIGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucmRyTW9udGhQaWNrZXJ7fVxuXG4ucmRyWWVhclBpY2tlcnt9XG5cbi5yZHJOZXh0UHJldkJ1dHRvbiB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLnJkclBwcmV2QnV0dG9uIHt9XG5cbi5yZHJOZXh0QnV0dG9uIHt9XG5cbi5yZHJNb250aHN7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5yZHJNb250aHNWZXJ0aWNhbHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnJkck1vbnRoc0hvcml6b250YWwgPiBkaXYgPiBkaXYgPiBkaXZ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5yZHJNb250aHtcbiAgd2lkdGg6IDI3LjY2N2VtO1xufVxuXG4ucmRyV2Vla0RheXN7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5yZHJXZWVrRGF5IHtcbiAgZmxleC1iYXNpczogY2FsYygxMDAlIC8gNyk7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnJkckRheXN7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnJkckRhdGVEaXNwbGF5V3JhcHBlcnt9XG5cbi5yZHJNb250aE5hbWV7fVxuXG4ucmRySW5maW5pdGVNb250aHN7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4ucmRyRGF0ZVJhbmdlV3JhcHBlcntcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLnJkckRhdGVJbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnJkckRhdGVJbnB1dCBpbnB1dCB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4ucmRyRGF0ZUlucHV0IC5yZHJXYXJuaW5nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICBsaW5lLWhlaWdodDogMS42ZW07XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAuMjVlbTtcbiAgICBjb2xvcjogI0ZGMDAwMDtcbiAgfVxuXG4ucmRyRGF5IHtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgd2lkdGg6IGNhbGMoMTAwJSAvIDcpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnJkckRheU51bWJlciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5yZHJEYXlOdW1iZXIgc3BhbntcbiAgICBjb2xvcjogIzFkMjQyOTtcbiAgfVxuXG4ucmRyRGF5RGlzYWJsZWQge1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG5Ac3VwcG9ydHMgKC1tcy1pbWUtYWxpZ246IGF1dG8pIHtcbiAgLnJkckRheSB7XG4gICAgZmxleC1iYXNpczogMTQuMjg1JSAhaW1wb3J0YW50O1xuICB9XG59XG5cbi5yZHJTZWxlY3RlZCwgLnJkckluUmFuZ2UsIC5yZHJTdGFydEVkZ2UsIC5yZHJFbmRFZGdle1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnJkckluUmFuZ2V7fVxuXG4ucmRyRGF5U3RhcnRQcmV2aWV3LCAucmRyRGF5SW5QcmV2aWV3LCAucmRyRGF5RW5kUHJldmlld3tcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5yZHJEYXlIb3ZlcmVke31cblxuLnJkckRheUFjdGl2ZXt9XG5cbi5yZHJEYXRlUmFuZ2VQaWNrZXJXcmFwcGVye1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLnJkckRlZmluZWRSYW5nZXNXcmFwcGVye31cblxuLnJkclN0YXRpY1Jhbmdlc3tcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnJkclN0YXRpY1Jhbmdle1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbi5yZHJTdGF0aWNSYW5nZUxhYmVse31cblxuLnJkcklucHV0UmFuZ2Vze31cblxuLnJkcklucHV0UmFuZ2V7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5yZHJJbnB1dFJhbmdlSW5wdXR7fVxuYFxuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gZGF0ZVRvU3RyaW5nKCl7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVkRGF0ZVJhbmdlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGRvbWFpbjogbnVsbCxcbiAgICBzdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgZW5kRGF0ZTogbmV3IERhdGUoKSxcbiAgICBrZXk6J3NlbGVjdGlvbidcbiAgfTtcblxuICBkb21haW5TZWxlY3RvciA9IHRoaXMucHJvcHMuZG9tYWluO1xuICByYW5nZVNlbGVjdG9yID0gdGhpcy5wcm9wcy5yYW5nZTtcblxuICBoYW5kbGVTZWxlY3QgPSBhcmdzID0+IHtcbiAgICBjb25zb2xlLmxvZygnY2hhbmdlIGRhdGEnKTtcbiAgICBjb25zdCB7c3RhcnREYXRlLGVuZERhdGV9ICA9IGFyZ3Muc2VsZWN0aW9uO1xuICAgIHRoaXMuc2VsZWN0aW9uUmFuZ2UgPSBhcmdzLnNlbGVjdGlvbjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmZpbHRlcilcbiAgICB0aGlzLnByb3BzLnNldEZpbHRlcihbc3RhcnREYXRlLGVuZERhdGVdKTtcblxuICB9XG5cbiAgbWluRGF0ZSA9IHRoaXMucHJvcHMuZG9tYWluLmRhdGVbMF1cbiAgbWF4RGF0ZSA9IHRoaXMucHJvcHMuZG9tYWluLmRhdGVbMV1cblxuICBzZWxlY3Rpb25SYW5nZSA9IHtcbiAgICBzdGFydERhdGU6IHRoaXMubWluRGF0ZSxcbiAgICBlbmREYXRlOiB0aGlzLm1heERhdGUsXG4gICAgLy8gZW5kRGF0ZTogbnVsbCxcbiAgICBrZXk6ICdzZWxlY3Rpb24nLFxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBzdHlsZWQgZGF0ZXJhbmdlJylcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZERhdGFSYW5nZU5ldz5cbiAgICAgICAgPERhdGVSYW5nZVxuICAgICAgICAgIHJhbmdlcz17W3RoaXMuc2VsZWN0aW9uUmFuZ2VdfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgICBtaW5EYXRlPXt0aGlzLm1pbkRhdGV9XG4gICAgICAgICAgbWF4RGF0ZT17dGhpcy5tYXhEYXRlfVxuICAgICAgICAgIG1vdmVSYW5nZU9uRmlyc3RTZWxlY3Rpb249e2ZhbHNlfVxuICAgICAgICAvPlxuICAgICAgPC9TdHlsZWREYXRhUmFuZ2VOZXc+XG4gICAgKVxuICB9XG5cbn1cbiJdfQ==