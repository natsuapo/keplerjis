"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SourceDataSelectorFactory;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reselect = require("reselect");

var _styledComponents = require("../../common/styled-components");

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _datasetTag = _interopRequireDefault(require("./dataset-tag"));

var _localization = require("../../../localization");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultPlaceHolder = 'Select A Data Source';
SourceDataSelectorFactory.deps = [_datasetTag["default"]];

function SourceDataSelectorFactory(DatasetTag) {
  var DatasetItem = function DatasetItem(_ref) {
    var value = _ref.value;
    return /*#__PURE__*/_react["default"].createElement(DatasetTag, {
      dataset: value
    });
  };

  var SourceDataSelector = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(SourceDataSelector, _Component);

    var _super = _createSuper(SourceDataSelector);

    function SourceDataSelector() {
      var _this;

      (0, _classCallCheck2["default"])(this, SourceDataSelector);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasetsSelector", function (props) {
        return props.datasets;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dsOptionsSelector", (0, _reselect.createSelector)(_this.datasetsSelector, function (datasets) {
        return Object.values(datasets).map(function (ds) {
          return {
            label: ds.label,
            value: ds.id,
            color: ds.color
          };
        });
      }));
      return _this;
    }

    (0, _createClass2["default"])(SourceDataSelector, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            dataId = _this$props.dataId,
            disabled = _this$props.disabled,
            onSelect = _this$props.onSelect,
            defaultValue = _this$props.defaultValue,
            inputTheme = _this$props.inputTheme,
            header = _this$props.header;
        var dsOptions = this.dsOptionsSelector(this.props);
        return /*#__PURE__*/_react["default"].createElement(_styledComponents.SidePanelSection, {
          className: "data-source-selector"
        }, /*#__PURE__*/_react["default"].createElement(_styledComponents.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: header ? header : 'misc.dataSource'
        })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
          inputTheme: inputTheme,
          selectedItems: dataId ? this.props.datasets[dataId] : null,
          options: dsOptions,
          getOptionValue: 'value',
          filterOption: 'label',
          multiSelect: false,
          onChange: onSelect,
          placeholder: defaultValue,
          disabled: Boolean(disabled),
          displayOption: 'label',
          DropDownLineItemRenderComponent: DatasetItem
        }));
      }
    }]);
    return SourceDataSelector;
  }(_react.Component);

  SourceDataSelector.defaultProps = {
    defaultValue: defaultPlaceHolder
  };
  return SourceDataSelector;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvY29tbW9uL3NvdXJjZS1kYXRhLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRQbGFjZUhvbGRlciIsIlNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkiLCJkZXBzIiwiRGF0YXNldFRhZ0ZhY3RvcnkiLCJEYXRhc2V0VGFnIiwiRGF0YXNldEl0ZW0iLCJ2YWx1ZSIsIlNvdXJjZURhdGFTZWxlY3RvciIsInByb3BzIiwiZGF0YXNldHMiLCJkYXRhc2V0c1NlbGVjdG9yIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwiZHMiLCJsYWJlbCIsImlkIiwiY29sb3IiLCJkYXRhSWQiLCJkaXNhYmxlZCIsIm9uU2VsZWN0IiwiZGVmYXVsdFZhbHVlIiwiaW5wdXRUaGVtZSIsImhlYWRlciIsImRzT3B0aW9ucyIsImRzT3B0aW9uc1NlbGVjdG9yIiwiQm9vbGVhbiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLEdBQUcsc0JBQTNCO0FBRUFDLHlCQUF5QixDQUFDQyxJQUExQixHQUFpQyxDQUFDQyxzQkFBRCxDQUFqQzs7QUFFZSxTQUFTRix5QkFBVCxDQUFtQ0csVUFBbkMsRUFBK0M7QUFDNUQsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxRQUFFQyxLQUFGLFFBQUVBLEtBQUY7QUFBQSx3QkFBYSxnQ0FBQyxVQUFEO0FBQVksTUFBQSxPQUFPLEVBQUVBO0FBQXJCLE1BQWI7QUFBQSxHQUFwQjs7QUFENEQsTUFHdERDLGtCQUhzRDtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsMkdBTXZDLFVBQUFDLEtBQUs7QUFBQSxlQUFJQSxLQUFLLENBQUNDLFFBQVY7QUFBQSxPQU5rQztBQUFBLDRHQU90Qyw4QkFBZSxNQUFLQyxnQkFBcEIsRUFBc0MsVUFBQUQsUUFBUTtBQUFBLGVBQ2hFRSxNQUFNLENBQUNDLE1BQVAsQ0FBY0gsUUFBZCxFQUF3QkksR0FBeEIsQ0FBNEIsVUFBQUMsRUFBRTtBQUFBLGlCQUFLO0FBQ2pDQyxZQUFBQSxLQUFLLEVBQUVELEVBQUUsQ0FBQ0MsS0FEdUI7QUFFakNULFlBQUFBLEtBQUssRUFBRVEsRUFBRSxDQUFDRSxFQUZ1QjtBQUdqQ0MsWUFBQUEsS0FBSyxFQUFFSCxFQUFFLENBQUNHO0FBSHVCLFdBQUw7QUFBQSxTQUE5QixDQURnRTtBQUFBLE9BQTlDLENBUHNDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsYUFlMUQsa0JBQVM7QUFBQSwwQkFDK0QsS0FBS1QsS0FEcEU7QUFBQSxZQUNBVSxNQURBLGVBQ0FBLE1BREE7QUFBQSxZQUNRQyxRQURSLGVBQ1FBLFFBRFI7QUFBQSxZQUNrQkMsUUFEbEIsZUFDa0JBLFFBRGxCO0FBQUEsWUFDNEJDLFlBRDVCLGVBQzRCQSxZQUQ1QjtBQUFBLFlBQzBDQyxVQUQxQyxlQUMwQ0EsVUFEMUM7QUFBQSxZQUNxREMsTUFEckQsZUFDcURBLE1BRHJEO0FBRVAsWUFBTUMsU0FBUyxHQUFHLEtBQUtDLGlCQUFMLENBQXVCLEtBQUtqQixLQUE1QixDQUFsQjtBQUVBLDRCQUNFLGdDQUFDLGtDQUFEO0FBQWtCLFVBQUEsU0FBUyxFQUFDO0FBQTVCLHdCQUNFLGdDQUFDLDRCQUFELHFCQUNFLGdDQUFDLDhCQUFEO0FBQWtCLFVBQUEsRUFBRSxFQUFFZSxNQUFNLEdBQUNBLE1BQUQsR0FBUTtBQUFwQyxVQURGLENBREYsZUFJRSxnQ0FBQyx3QkFBRDtBQUNFLFVBQUEsVUFBVSxFQUFFRCxVQURkO0FBRUUsVUFBQSxhQUFhLEVBQUVKLE1BQU0sR0FBRyxLQUFLVixLQUFMLENBQVdDLFFBQVgsQ0FBb0JTLE1BQXBCLENBQUgsR0FBaUMsSUFGeEQ7QUFHRSxVQUFBLE9BQU8sRUFBRU0sU0FIWDtBQUlFLFVBQUEsY0FBYyxFQUFFLE9BSmxCO0FBS0UsVUFBQSxZQUFZLEVBQUUsT0FMaEI7QUFNRSxVQUFBLFdBQVcsRUFBRSxLQU5mO0FBT0UsVUFBQSxRQUFRLEVBQUVKLFFBUFo7QUFRRSxVQUFBLFdBQVcsRUFBRUMsWUFSZjtBQVNFLFVBQUEsUUFBUSxFQUFFSyxPQUFPLENBQUNQLFFBQUQsQ0FUbkI7QUFVRSxVQUFBLGFBQWEsRUFBRSxPQVZqQjtBQVdFLFVBQUEsK0JBQStCLEVBQUVkO0FBWG5DLFVBSkYsQ0FERjtBQW9CRDtBQXZDeUQ7QUFBQTtBQUFBLElBRzNCc0IsZ0JBSDJCOztBQTBDNURwQixFQUFBQSxrQkFBa0IsQ0FBQ3FCLFlBQW5CLEdBQWtDO0FBQ2hDUCxJQUFBQSxZQUFZLEVBQUVyQjtBQURrQixHQUFsQztBQUdBLFNBQU9PLGtCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHtQYW5lbExhYmVsLCBTaWRlUGFuZWxTZWN0aW9ufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQgRGF0YXNldFRhZ0ZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL2NvbW1vbi9kYXRhc2V0LXRhZyc7XG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2xvY2FsaXphdGlvbic7XG5cbmNvbnN0IGRlZmF1bHRQbGFjZUhvbGRlciA9ICdTZWxlY3QgQSBEYXRhIFNvdXJjZSc7XG5cblNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkuZGVwcyA9IFtEYXRhc2V0VGFnRmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkoRGF0YXNldFRhZykge1xuICBjb25zdCBEYXRhc2V0SXRlbSA9ICh7dmFsdWV9KSA9PiA8RGF0YXNldFRhZyBkYXRhc2V0PXt2YWx1ZX0gLz47XG5cbiAgY2xhc3MgU291cmNlRGF0YVNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKiBzZWxlY3RvcnMgKi9cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cbiAgICBkYXRhc2V0c1NlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZGF0YXNldHM7XG4gICAgZHNPcHRpb25zU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmRhdGFzZXRzU2VsZWN0b3IsIGRhdGFzZXRzID0+XG4gICAgICBPYmplY3QudmFsdWVzKGRhdGFzZXRzKS5tYXAoZHMgPT4gKHtcbiAgICAgICAgbGFiZWw6IGRzLmxhYmVsLFxuICAgICAgICB2YWx1ZTogZHMuaWQsXG4gICAgICAgIGNvbG9yOiBkcy5jb2xvclxuICAgICAgfSkpXG4gICAgKTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtkYXRhSWQsIGRpc2FibGVkLCBvblNlbGVjdCwgZGVmYXVsdFZhbHVlLCBpbnB1dFRoZW1lLGhlYWRlcn0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZHNPcHRpb25zID0gdGhpcy5kc09wdGlvbnNTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNpZGVQYW5lbFNlY3Rpb24gY2xhc3NOYW1lPVwiZGF0YS1zb3VyY2Utc2VsZWN0b3JcIj5cbiAgICAgICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtoZWFkZXI/aGVhZGVyOidtaXNjLmRhdGFTb3VyY2UnfSAvPlxuICAgICAgICAgIDwvUGFuZWxMYWJlbD5cbiAgICAgICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgICAgICBpbnB1dFRoZW1lPXtpbnB1dFRoZW1lfVxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17ZGF0YUlkID8gdGhpcy5wcm9wcy5kYXRhc2V0c1tkYXRhSWRdIDogbnVsbH1cbiAgICAgICAgICAgIG9wdGlvbnM9e2RzT3B0aW9uc31cbiAgICAgICAgICAgIGdldE9wdGlvblZhbHVlPXsndmFsdWUnfVxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uPXsnbGFiZWwnfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKGRpc2FibGVkKX1cbiAgICAgICAgICAgIGRpc3BsYXlPcHRpb249eydsYWJlbCd9XG4gICAgICAgICAgICBEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50PXtEYXRhc2V0SXRlbX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIFNvdXJjZURhdGFTZWxlY3Rvci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0UGxhY2VIb2xkZXJcbiAgfTtcbiAgcmV0dXJuIFNvdXJjZURhdGFTZWxlY3Rvcjtcbn1cbiJdfQ==