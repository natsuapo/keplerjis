"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _entry = _interopRequireDefault(require("@wojtekmaj/react-daterange-picker/dist/entry.nostyle"));

var _reactDropdownTreeSelect = _interopRequireDefault(require("react-dropdown-tree-select"));

var _defaultSettings = require("../../constants/default-settings");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledDropdownTreeSelect = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n\n"]))); // z-index: ${props => props.theme.dropdownWrapperZ};
// position: absolute;
// bottom: ${props => (props.placement === 'top' ? props.theme.inputBoxHeight : 'auto')};
// margin-top: ${props =>
//   props.placement === 'bottom' ? `${props.theme.dropdownWapperMargin}px` : 'auto'};
//   margin-bottom: ${props =>
//   props.placement === 'top' ? `${props.theme.dropdownWapperMargin}px` : 'auto'};


var StyledDropDownSelector = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(StyledDropDownSelector, _Component);

  var _super = _createSuper(StyledDropDownSelector);

  function StyledDropDownSelector() {
    (0, _classCallCheck2["default"])(this, StyledDropDownSelector);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(StyledDropDownSelector, [{
    key: "render",
    value: // domainSelector = this.props.domain;
    // rangeSelector = this.props.range;
    function render() {
      // console.log('rendering styled daterange')
      return /*#__PURE__*/_react["default"].createElement(StyledDropdownTreeSelect, {
        "class": "item-selector"
      }, /*#__PURE__*/_react["default"].createElement(_reactDropdownTreeSelect["default"], {
        data: this.props.data,
        onChange: this.props.onChange
      }));
    }
  }]);
  return StyledDropDownSelector;
}(_react.Component);

exports["default"] = StyledDropDownSelector;
(0, _defineProperty2["default"])(StyledDropDownSelector, "defaultProps", {});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9kcm9wZG93bi10cmVlLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZERyb3Bkb3duVHJlZVNlbGVjdCIsInN0eWxlZCIsImRpdiIsIlN0eWxlZERyb3BEb3duU2VsZWN0b3IiLCJwcm9wcyIsImRhdGEiLCJvbkNoYW5nZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFHQSxJQUFNQSx3QkFBd0IsR0FBR0MsNkJBQU9DLEdBQVYsMEZBQTlCLEMsQ0FJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0lBR3FCQyxzQjs7Ozs7Ozs7Ozs7O1dBS25CO0FBQ0E7QUFFQSxzQkFBUztBQUNQO0FBQ0EsMEJBQ0UsZ0NBQUMsd0JBQUQ7QUFBMEIsaUJBQU07QUFBaEMsc0JBQ0UsZ0NBQUMsbUNBQUQ7QUFBb0IsUUFBQSxJQUFJLEVBQUUsS0FBS0MsS0FBTCxDQUFXQyxJQUFyQztBQUEyQyxRQUFBLFFBQVEsRUFBRSxLQUFLRCxLQUFMLENBQVdFO0FBQWhFLFFBREYsQ0FERjtBQUtEOzs7RUFmaURDLGdCOzs7aUNBQS9CSixzQixrQkFFRyxFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRGF0ZVJhbmdlUGlja2VyIGZyb20gJ0B3b2p0ZWttYWovcmVhY3QtZGF0ZXJhbmdlLXBpY2tlci9kaXN0L2VudHJ5Lm5vc3R5bGUnO1xuaW1wb3J0IERyb3Bkb3duVHJlZVNlbGVjdCBmcm9tICdyZWFjdC1kcm9wZG93bi10cmVlLXNlbGVjdCdcbmltcG9ydCB7SkFQQU5fUFJFRl9ESUNUfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuXG5jb25zdCBTdHlsZWREcm9wZG93blRyZWVTZWxlY3QgPSBzdHlsZWQuZGl2YFxuXG5gO1xuXG4vLyB6LWluZGV4OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duV3JhcHBlclp9O1xuLy8gcG9zaXRpb246IGFic29sdXRlO1xuLy8gYm90dG9tOiAke3Byb3BzID0+IChwcm9wcy5wbGFjZW1lbnQgPT09ICd0b3AnID8gcHJvcHMudGhlbWUuaW5wdXRCb3hIZWlnaHQgOiAnYXV0bycpfTtcbi8vIG1hcmdpbi10b3A6ICR7cHJvcHMgPT5cbi8vICAgcHJvcHMucGxhY2VtZW50ID09PSAnYm90dG9tJyA/IGAke3Byb3BzLnRoZW1lLmRyb3Bkb3duV2FwcGVyTWFyZ2lufXB4YCA6ICdhdXRvJ307XG4vLyAgIG1hcmdpbi1ib3R0b206ICR7cHJvcHMgPT5cbi8vICAgcHJvcHMucGxhY2VtZW50ID09PSAndG9wJyA/IGAke3Byb3BzLnRoZW1lLmRyb3Bkb3duV2FwcGVyTWFyZ2lufXB4YCA6ICdhdXRvJ307XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVkRHJvcERvd25TZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgfTtcblxuICAvLyBkb21haW5TZWxlY3RvciA9IHRoaXMucHJvcHMuZG9tYWluO1xuICAvLyByYW5nZVNlbGVjdG9yID0gdGhpcy5wcm9wcy5yYW5nZTtcblxuICByZW5kZXIoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBzdHlsZWQgZGF0ZXJhbmdlJylcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZERyb3Bkb3duVHJlZVNlbGVjdCBjbGFzcz0naXRlbS1zZWxlY3Rvcic+XG4gICAgICAgIDxEcm9wZG93blRyZWVTZWxlY3QgZGF0YT17dGhpcy5wcm9wcy5kYXRhfSBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX0vPlxuICAgICAgPC9TdHlsZWREcm9wZG93blRyZWVTZWxlY3Q+XG4gICAgKVxuICB9XG5cbn1cblxuIl19