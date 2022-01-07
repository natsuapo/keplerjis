"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledDateRangePicker = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _entry = _interopRequireDefault(require("@wojtekmaj/react-daterange-picker/dist/entry.nostyle"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledDateRangePicker = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n.react-daterange-picker {\n  display: inline-flex;\n  position: relative;\n  z-index: 100;\n}\n.react-daterange-picker, .react-daterange-picker *, .react-daterange-picker *:before, .react-daterange-picker *:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.react-daterange-picker--disabled {\n  background-color: #f0f0f0;\n  color: #6d6d6d;\n}\n.react-daterange-picker__wrapper {\n  display: flex;\n  flex-grow: 1;\n  flex-shrink: 0;\n  align-items: center;\n  border: thin solid gray;\n}\n.react-daterange-picker__month-view {\n  background-color: #f0f0f0;\n}\n.react-daterange-picker__inputGroup {\n  color: white !important;\n  min-width: calc((4px * 3) + 4.32em + 0.434em);\n  height: 100%;\n  flex-grow: 1;\n  padding: 0 2px;\n  box-sizing: content-box;\n}\n\n.react-daterange-picker__range-divider {\n  padding: 1px 0;\n  white-space: pre;\n  color: white !important;\n}\n\n.react-daterange-picker__inputGroup__divider {\n  padding: 1px 0;\n  white-space: pre;\n  color: white !important;\n}\n\n\n\n.react-daterange-picker__inputGroup__input {\n  min-width: .54em;\n  height: 100%;\n  position: relative;\n  padding: 0 1px;\n  border: 0;\n  color: white !important;\n  background: none;\n  font: inherit;\n  box-sizing: content-box;\n  -moz-appearance: textfield;\n}\n.react-daterange-picker__inputGroup__input::-webkit-outer-spin-button, .react-daterange-picker__inputGroup__input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.react-daterange-picker__inputGroup__input:invalid {\n  background: rgba(255,0,0,0.1);\n}\n.react-daterange-picker__inputGroup__input--hasLeadingZero {\n  margin-left: -0.54em;\n  padding-left: calc(1px + .54em);\n}\n.react-daterange-picker__button {\n  border: 0;\n  background: transparent;\n  padding: 4px 6px;\n}\n.react-daterange-picker__button:enabled {\n  cursor: pointer;\n}\n.react-daterange-picker__button:enabled:hover .react-daterange-picker__button__icon, .react-daterange-picker__button:enabled:focus .react-daterange-picker__button__icon {\n  stroke: #0078d7;\n}\n.react-daterange-picker__button:disabled .react-daterange-picker__button__icon {\n  stroke: #6d6d6d;\n}\n.react-daterange-picker__button svg {\n  display: inherit;\n  stroke:#6d6d6d;\n}\n.react-daterange-picker__calendar {\n  max-width: 100vw;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #f1f3f9;\n}\n.react-daterange-picker__calendar--closed {\n  display: none;\n}\n.react-daterange-picker__calendar .react-calendar {\n  border-width: thin;\n}\n.react-calendar__tile--active {\n  background-color: #006edc;\n}\n;"]))); // export const StyledDateRangePicker = styled.div`
// .react-daterange-picker {
//   display: inline-flex;
//   position: relative;
//   z-index: 100;
//
//   &, & *, & *:before, & *:after {
//     -moz-box-sizing: border-box;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//   }
//
//   &--disabled {
//     background-color: rgb(240, 240, 240);
//     color: rgb(109, 109, 109);
//   }
//
//   &__wrapper {
//     display: flex;
//     flex-grow: 1;
//     flex-shrink: 0;
//     align-items: center;
//     border: thin solid gray;
//   }
//
//   &__inputGroup {
//     @digit-width: .54em;
//     @dot-width: .217em;
//     color:white !important;
//     // own padding + inputs padding + digits width + dots width
//     min-width: calc(~"(4px * 3) + " @digit-width * 8 ~" + " @dot-width * 2);
//     height: 100%;
//     flex-grow: 1;
//     padding: 0 2px;
//     box-sizing: content-box;
//
//     &__divider {
//       padding: 1px 0;
//       white-space: pre;
//     }
//
//     &__input {
//       min-width: @digit-width;
//       height: 100%;
//       position: relative;
//       padding: 0 1px;
//       border: 0;
//       color:white !important;
//       background: none;
//       font: inherit;
//       box-sizing: content-box;
//       -moz-appearance: textfield;
//
//       &::-webkit-outer-spin-button,
//       &::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//       }
//
//       &:invalid {
//         background: fade(red, 10%);
//       }
//
//       &--hasLeadingZero {
//         margin-left: -@digit-width;
//         padding-left: calc(~"1px + " @digit-width);
//       }
//     }
//   }
//
//   &__button {
//     border: 0;
//     background: transparent;
//     padding: 4px 6px;
//
//     &:enabled {
//       cursor: pointer;
//
//       &:hover, &:focus {
//         .react-daterange-picker__button__icon {
//           stroke: rgb(0, 120, 215);
//         }
//       }
//     }
//
//     &:disabled {
//       .react-daterange-picker__button__icon {
//         stroke: rgb(109, 109, 109);
//       }
//     }
//
//     svg {
//       display: inherit;
//     }
//   }
//
//   &__calendar {
//     width: 350px;
//     max-width: 100vw;
//     position: absolute;
//     top: 100%;
//     left: 0;
//     background-color:white;
//
//     &--closed {
//       display: none;
//     }
//
//     .react-calendar {
//       border-width: thin;
//
//     }
//   }
// }
// `


exports.StyledDateRangePicker = StyledDateRangePicker;

var StyledDatePicker = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(StyledDatePicker, _Component);

  var _super = _createSuper(StyledDatePicker);

  function StyledDatePicker() {
    var _this;

    (0, _classCallCheck2["default"])(this, StyledDatePicker);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSelect", function (args) {
      console.log('change data');

      _this.props.setDateRange(args); // const {startDate,endDate}  = args.selection;
      // console.log(this.props.filter)
      // this.props.setDateRange([startDate,endDate]);

    });
    return _this;
  }

  (0, _createClass2["default"])(StyledDatePicker, [{
    key: "render",
    value: // minDate = this.props.domain.date[0]
    // maxDate = this.props.domain.date[1]
    function render() {
      // console.log('rendering styled daterange')
      return /*#__PURE__*/_react["default"].createElement(StyledDateRangePicker, null, /*#__PURE__*/_react["default"].createElement(_entry["default"], {
        onChange: this.handleSelect,
        value: this.props.domain
      }));
    }
  }]);
  return StyledDatePicker;
}(_react.Component);

exports["default"] = StyledDatePicker;
(0, _defineProperty2["default"])(StyledDatePicker, "defaultProps", {
  domain: null,
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9kYXRlLXBpY2tlci5qcyJdLCJuYW1lcyI6WyJTdHlsZWREYXRlUmFuZ2VQaWNrZXIiLCJzdHlsZWQiLCJkaXYiLCJTdHlsZWREYXRlUGlja2VyIiwiYXJncyIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsInNldERhdGVSYW5nZSIsImhhbmRsZVNlbGVjdCIsImRvbWFpbiIsIkNvbXBvbmVudCIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJlbmREYXRlIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBS08sSUFBTUEscUJBQXFCLEdBQUdDLDZCQUFPQyxHQUFWLHVxRkFBM0IsQyxDQTRHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7SUFFcUJDLGdCOzs7Ozs7Ozs7Ozs7Ozs7cUdBWUosVUFBQUMsSUFBSSxFQUFJO0FBQ3JCQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaOztBQUNBLFlBQUtDLEtBQUwsQ0FBV0MsWUFBWCxDQUF3QkosSUFBeEIsRUFGcUIsQ0FHckI7QUFDQTtBQUNBOztBQUVELEs7Ozs7OztXQUVEO0FBQ0E7QUFFQSxzQkFBUTtBQUNOO0FBQ0EsMEJBQ0UsZ0NBQUMscUJBQUQscUJBQ0UsZ0NBQUMsaUJBQUQ7QUFDRSxRQUFBLFFBQVEsRUFBRSxLQUFLSyxZQURqQjtBQUVFLFFBQUEsS0FBSyxFQUFFLEtBQUtGLEtBQUwsQ0FBV0c7QUFGcEIsUUFERixDQURGO0FBUUQ7OztFQWxDMkNDLGdCOzs7aUNBQXpCUixnQixrQkFFRztBQUNwQk8sRUFBQUEsTUFBTSxFQUFFLElBRFk7QUFFcEJFLEVBQUFBLFNBQVMsRUFBRSxJQUFJQyxJQUFKLEVBRlM7QUFHcEJDLEVBQUFBLE9BQU8sRUFBRSxJQUFJRCxJQUFKLEVBSFc7QUFJcEJFLEVBQUFBLEdBQUcsRUFBQztBQUpnQixDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEYXRlUmFuZ2VQaWNrZXIgZnJvbSAnQHdvanRla21hai9yZWFjdC1kYXRlcmFuZ2UtcGlja2VyL2Rpc3QvZW50cnkubm9zdHlsZSdcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5cblxuXG5leHBvcnQgY29uc3QgU3R5bGVkRGF0ZVJhbmdlUGlja2VyID0gc3R5bGVkLmRpdmBcbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTAwO1xufVxuLnJlYWN0LWRhdGVyYW5nZS1waWNrZXIsIC5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyICosIC5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyICo6YmVmb3JlLCAucmVhY3QtZGF0ZXJhbmdlLXBpY2tlciAqOmFmdGVyIHtcbiAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlci0tZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICBjb2xvcjogIzZkNmQ2ZDtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX193cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LXNocmluazogMDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyOiB0aGluIHNvbGlkIGdyYXk7XG59XG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9fbW9udGgtdmlldyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG59XG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9faW5wdXRHcm91cCB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IGNhbGMoKDRweCAqIDMpICsgNC4zMmVtICsgMC40MzRlbSk7XG4gIGhlaWdodDogMTAwJTtcbiAgZmxleC1ncm93OiAxO1xuICBwYWRkaW5nOiAwIDJweDtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG5cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19yYW5nZS1kaXZpZGVyIHtcbiAgcGFkZGluZzogMXB4IDA7XG4gIHdoaXRlLXNwYWNlOiBwcmU7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9faW5wdXRHcm91cF9fZGl2aWRlciB7XG4gIHBhZGRpbmc6IDFweCAwO1xuICB3aGl0ZS1zcGFjZTogcHJlO1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuXG5cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19pbnB1dEdyb3VwX19pbnB1dCB7XG4gIG1pbi13aWR0aDogLjU0ZW07XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwIDFweDtcbiAgYm9yZGVyOiAwO1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgZm9udDogaW5oZXJpdDtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuLnJlYWN0LWRhdGVyYW5nZS1waWNrZXJfX2lucHV0R3JvdXBfX2lucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLCAucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9faW5wdXRHcm91cF9faW5wdXQ6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIG1hcmdpbjogMDtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19pbnB1dEdyb3VwX19pbnB1dDppbnZhbGlkIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMCwwLDAuMSk7XG59XG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9faW5wdXRHcm91cF9faW5wdXQtLWhhc0xlYWRpbmdaZXJvIHtcbiAgbWFyZ2luLWxlZnQ6IC0wLjU0ZW07XG4gIHBhZGRpbmctbGVmdDogY2FsYygxcHggKyAuNTRlbSk7XG59XG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9fYnV0dG9uIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogNHB4IDZweDtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19idXR0b246ZW5hYmxlZCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19idXR0b246ZW5hYmxlZDpob3ZlciAucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9fYnV0dG9uX19pY29uLCAucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9fYnV0dG9uOmVuYWJsZWQ6Zm9jdXMgLnJlYWN0LWRhdGVyYW5nZS1waWNrZXJfX2J1dHRvbl9faWNvbiB7XG4gIHN0cm9rZTogIzAwNzhkNztcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19idXR0b246ZGlzYWJsZWQgLnJlYWN0LWRhdGVyYW5nZS1waWNrZXJfX2J1dHRvbl9faWNvbiB7XG4gIHN0cm9rZTogIzZkNmQ2ZDtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19idXR0b24gc3ZnIHtcbiAgZGlzcGxheTogaW5oZXJpdDtcbiAgc3Ryb2tlOiM2ZDZkNmQ7XG59XG4ucmVhY3QtZGF0ZXJhbmdlLXBpY2tlcl9fY2FsZW5kYXIge1xuICBtYXgtd2lkdGg6IDEwMHZ3O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAwJTtcbiAgbGVmdDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjNmOTtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19jYWxlbmRhci0tY2xvc2VkIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19jYWxlbmRhciAucmVhY3QtY2FsZW5kYXIge1xuICBib3JkZXItd2lkdGg6IHRoaW47XG59XG4ucmVhY3QtY2FsZW5kYXJfX3RpbGUtLWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDZlZGM7XG59XG47YFxuXG5cbi8vIGV4cG9ydCBjb25zdCBTdHlsZWREYXRlUmFuZ2VQaWNrZXIgPSBzdHlsZWQuZGl2YFxuLy8gLnJlYWN0LWRhdGVyYW5nZS1waWNrZXIge1xuLy8gICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbi8vICAgcG9zaXRpb246IHJlbGF0aXZlO1xuLy8gICB6LWluZGV4OiAxMDA7XG4vL1xuLy8gICAmLCAmICosICYgKjpiZWZvcmUsICYgKjphZnRlciB7XG4vLyAgICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuLy8gICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcbi8vICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuLy8gICB9XG4vL1xuLy8gICAmLS1kaXNhYmxlZCB7XG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQwLCAyNDApO1xuLy8gICAgIGNvbG9yOiByZ2IoMTA5LCAxMDksIDEwOSk7XG4vLyAgIH1cbi8vXG4vLyAgICZfX3dyYXBwZXIge1xuLy8gICAgIGRpc3BsYXk6IGZsZXg7XG4vLyAgICAgZmxleC1ncm93OiAxO1xuLy8gICAgIGZsZXgtc2hyaW5rOiAwO1xuLy8gICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4vLyAgICAgYm9yZGVyOiB0aGluIHNvbGlkIGdyYXk7XG4vLyAgIH1cbi8vXG4vLyAgICZfX2lucHV0R3JvdXAge1xuLy8gICAgIEBkaWdpdC13aWR0aDogLjU0ZW07XG4vLyAgICAgQGRvdC13aWR0aDogLjIxN2VtO1xuLy8gICAgIGNvbG9yOndoaXRlICFpbXBvcnRhbnQ7XG4vLyAgICAgLy8gb3duIHBhZGRpbmcgKyBpbnB1dHMgcGFkZGluZyArIGRpZ2l0cyB3aWR0aCArIGRvdHMgd2lkdGhcbi8vICAgICBtaW4td2lkdGg6IGNhbGMoflwiKDRweCAqIDMpICsgXCIgQGRpZ2l0LXdpZHRoICogOCB+XCIgKyBcIiBAZG90LXdpZHRoICogMik7XG4vLyAgICAgaGVpZ2h0OiAxMDAlO1xuLy8gICAgIGZsZXgtZ3JvdzogMTtcbi8vICAgICBwYWRkaW5nOiAwIDJweDtcbi8vICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbi8vXG4vLyAgICAgJl9fZGl2aWRlciB7XG4vLyAgICAgICBwYWRkaW5nOiAxcHggMDtcbi8vICAgICAgIHdoaXRlLXNwYWNlOiBwcmU7XG4vLyAgICAgfVxuLy9cbi8vICAgICAmX19pbnB1dCB7XG4vLyAgICAgICBtaW4td2lkdGg6IEBkaWdpdC13aWR0aDtcbi8vICAgICAgIGhlaWdodDogMTAwJTtcbi8vICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbi8vICAgICAgIHBhZGRpbmc6IDAgMXB4O1xuLy8gICAgICAgYm9yZGVyOiAwO1xuLy8gICAgICAgY29sb3I6d2hpdGUgIWltcG9ydGFudDtcbi8vICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4vLyAgICAgICBmb250OiBpbmhlcml0O1xuLy8gICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4vLyAgICAgICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcbi8vXG4vLyAgICAgICAmOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxuLy8gICAgICAgJjo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4vLyAgICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbi8vICAgICAgICAgbWFyZ2luOiAwO1xuLy8gICAgICAgfVxuLy9cbi8vICAgICAgICY6aW52YWxpZCB7XG4vLyAgICAgICAgIGJhY2tncm91bmQ6IGZhZGUocmVkLCAxMCUpO1xuLy8gICAgICAgfVxuLy9cbi8vICAgICAgICYtLWhhc0xlYWRpbmdaZXJvIHtcbi8vICAgICAgICAgbWFyZ2luLWxlZnQ6IC1AZGlnaXQtd2lkdGg7XG4vLyAgICAgICAgIHBhZGRpbmctbGVmdDogY2FsYyh+XCIxcHggKyBcIiBAZGlnaXQtd2lkdGgpO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuLy9cbi8vICAgJl9fYnV0dG9uIHtcbi8vICAgICBib3JkZXI6IDA7XG4vLyAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4vLyAgICAgcGFkZGluZzogNHB4IDZweDtcbi8vXG4vLyAgICAgJjplbmFibGVkIHtcbi8vICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbi8vXG4vLyAgICAgICAmOmhvdmVyLCAmOmZvY3VzIHtcbi8vICAgICAgICAgLnJlYWN0LWRhdGVyYW5nZS1waWNrZXJfX2J1dHRvbl9faWNvbiB7XG4vLyAgICAgICAgICAgc3Ryb2tlOiByZ2IoMCwgMTIwLCAyMTUpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICAmOmRpc2FibGVkIHtcbi8vICAgICAgIC5yZWFjdC1kYXRlcmFuZ2UtcGlja2VyX19idXR0b25fX2ljb24ge1xuLy8gICAgICAgICBzdHJva2U6IHJnYigxMDksIDEwOSwgMTA5KTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN2ZyB7XG4vLyAgICAgICBkaXNwbGF5OiBpbmhlcml0O1xuLy8gICAgIH1cbi8vICAgfVxuLy9cbi8vICAgJl9fY2FsZW5kYXIge1xuLy8gICAgIHdpZHRoOiAzNTBweDtcbi8vICAgICBtYXgtd2lkdGg6IDEwMHZ3O1xuLy8gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbi8vICAgICB0b3A6IDEwMCU7XG4vLyAgICAgbGVmdDogMDtcbi8vICAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xuLy9cbi8vICAgICAmLS1jbG9zZWQge1xuLy8gICAgICAgZGlzcGxheTogbm9uZTtcbi8vICAgICB9XG4vL1xuLy8gICAgIC5yZWFjdC1jYWxlbmRhciB7XG4vLyAgICAgICBib3JkZXItd2lkdGg6IHRoaW47XG4vL1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuLy8gYFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZWREYXRlUGlja2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGRvbWFpbjogbnVsbCxcbiAgICBzdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgZW5kRGF0ZTogbmV3IERhdGUoKSxcbiAgICBrZXk6J3NlbGVjdGlvbidcbiAgfTtcblxuICAvLyBkb21haW5TZWxlY3RvciA9IHRoaXMucHJvcHMuZG9tYWluO1xuICAvLyByYW5nZVNlbGVjdG9yID0gdGhpcy5wcm9wcy5yYW5nZTtcblxuICBoYW5kbGVTZWxlY3QgPSBhcmdzID0+IHtcbiAgICBjb25zb2xlLmxvZygnY2hhbmdlIGRhdGEnKTtcbiAgICB0aGlzLnByb3BzLnNldERhdGVSYW5nZShhcmdzKVxuICAgIC8vIGNvbnN0IHtzdGFydERhdGUsZW5kRGF0ZX0gID0gYXJncy5zZWxlY3Rpb247XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcy5maWx0ZXIpXG4gICAgLy8gdGhpcy5wcm9wcy5zZXREYXRlUmFuZ2UoW3N0YXJ0RGF0ZSxlbmREYXRlXSk7XG5cbiAgfVxuXG4gIC8vIG1pbkRhdGUgPSB0aGlzLnByb3BzLmRvbWFpbi5kYXRlWzBdXG4gIC8vIG1heERhdGUgPSB0aGlzLnByb3BzLmRvbWFpbi5kYXRlWzFdXG5cbiAgcmVuZGVyKCl7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBzdHlsZWQgZGF0ZXJhbmdlJylcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZERhdGVSYW5nZVBpY2tlcj5cbiAgICAgICAgPERhdGVSYW5nZVBpY2tlclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5kb21haW59XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZERhdGVSYW5nZVBpY2tlcj5cbiAgICApXG4gIH1cblxufVxuIl19