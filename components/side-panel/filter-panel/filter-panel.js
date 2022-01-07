"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _defaultSettings = require("../../../constants/default-settings");

var _filterPanelHeader = _interopRequireDefault(require("./filter-panel-header"));

var _newFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/new-filter-panel"));

var _timeRangeFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/time-range-filter-panel"));

var _singleSelectFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/single-select-filter-panel"));

var _multiSelectFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/multi-select-filter-panel"));

var _rangeFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/range-filter-panel"));

var _polygonFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/polygon-filter-panel"));

var _dateSelectFilterPanel = _interopRequireDefault(require("../../filters/filter-panels/date-select-filter-panel"));

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledFilterPanel = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n"])));

FilterPanelFactory.deps = [_filterPanelHeader["default"], _newFilterPanel["default"], _timeRangeFilterPanel["default"], _singleSelectFilterPanel["default"], _multiSelectFilterPanel["default"], _rangeFilterPanel["default"], _polygonFilterPanel["default"], _dateSelectFilterPanel["default"]];

function FilterPanelFactory(FilterPanelHeader, NewFilterPanel, TimeRangeFilterPanel, SingleSelectFilterPanel, MultiSelectFilterPanel, RangeFilterPanel, PolygonFilterPanel, DateSelectFilterPanel) {
  var _FilterPanelComponent, _class, _temp;

  var FilterPanelComponents = (_FilterPanelComponent = {
    "default": NewFilterPanel
  }, (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.timeRange, TimeRangeFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.select, SingleSelectFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.multiSelect, MultiSelectFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.range, RangeFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.polygon, PolygonFilterPanel), (0, _defineProperty2["default"])(_FilterPanelComponent, _defaultSettings.FILTER_TYPES.dateSelect, DateSelectFilterPanel), _FilterPanelComponent);
  return _temp = _class = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(FilterPanel, _Component);

    var _super = _createSuper(FilterPanel);

    function FilterPanel() {
      var _this;

      (0, _classCallCheck2["default"])(this, FilterPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldsSelector", function (props) {
        var datasetId = props.filter.dataId[0];

        if (!datasetId) {
          return [];
        }

        return (0, _lodash["default"])(props, ['datasets', datasetId, 'fields'], []);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filterSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "nameSelector", function (props) {
        return props.filter.name;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataIdSelector", function (props) {
        return props.filter.dataId[0];
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableFieldsSelector", (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterSelector, _this.nameSelector, _this.dataIdSelector, function (fields, filters, name, dataId) {
        return fields.filter(function (f) {
          return f.type && f.type !== _defaultSettings.ALL_FIELD_TYPES.geojson && (f.name === name || !filters.find(function (d) {
            return d.name === f.name && d.dataId === dataId;
          }));
        });
      }));
      return _this;
    }

    (0, _createClass2["default"])(FilterPanel, [{
      key: "render",
      value: function render() {
        var filter = this.props.filter;
        console.log(filter);
        var type = filter.type;
        var FilterFilterComponent = type && FilterPanelComponents[type] || FilterPanelComponents["default"];
        var allAvailableFields = this.availableFieldsSelector(this.props);
        return /*#__PURE__*/_react["default"].createElement(StyledFilterPanel, {
          className: "filter-panel"
        }, /*#__PURE__*/_react["default"].createElement(FilterFilterComponent, (0, _extends2["default"])({
          allAvailableFields: allAvailableFields
        }, this.props)));
      }
    }]);
    return FilterPanel;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    idx: _propTypes["default"].number,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    filter: _propTypes["default"].object.isRequired,
    setFilter: _propTypes["default"].func.isRequired,
    removeFilter: _propTypes["default"].func.isRequired,
    enlargeFilter: _propTypes["default"].func.isRequired,
    toggleAnimation: _propTypes["default"].func.isRequired,
    toggleFilterFeature: _propTypes["default"].func.isRequired,
    datasets: _propTypes["default"].object,
    showDatasetTable: _propTypes["default"].func,
    isAnyFilterAnimating: _propTypes["default"].bool
  }), _temp;
}

var _default = FilterPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRGaWx0ZXJQYW5lbCIsInN0eWxlZCIsImRpdiIsIkZpbHRlclBhbmVsRmFjdG9yeSIsImRlcHMiLCJGaWx0ZXJQYW5lbEhlYWRlckZhY3RvcnkiLCJOZXdGaWx0ZXJQYW5lbEZhY3RvcnkiLCJUaW1lUmFuZ2VGaWx0ZXJQYW5lbEZhY3RvcnkiLCJTaW5nbGVTZWxlY3RGaWx0ZXJQYW5lbEZhY3RvcnkiLCJNdWx0aVNlbGVjdEZpbHRlclBhbmVsRmFjdG9yeSIsIlJhbmdlRmlsdGVyUGFuZWxGYWN0b3J5IiwiUG9seWdvbkZpbHRlclBhbmVsRmFjdG9yeSIsIkRhdGVTZWxlY3RGaWx0ZXJQYW5lbEZhY3RvcnkiLCJGaWx0ZXJQYW5lbEhlYWRlciIsIk5ld0ZpbHRlclBhbmVsIiwiVGltZVJhbmdlRmlsdGVyUGFuZWwiLCJTaW5nbGVTZWxlY3RGaWx0ZXJQYW5lbCIsIk11bHRpU2VsZWN0RmlsdGVyUGFuZWwiLCJSYW5nZUZpbHRlclBhbmVsIiwiUG9seWdvbkZpbHRlclBhbmVsIiwiRGF0ZVNlbGVjdEZpbHRlclBhbmVsIiwiRmlsdGVyUGFuZWxDb21wb25lbnRzIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwic2VsZWN0IiwibXVsdGlTZWxlY3QiLCJyYW5nZSIsInBvbHlnb24iLCJkYXRlU2VsZWN0IiwicHJvcHMiLCJkYXRhc2V0SWQiLCJmaWx0ZXIiLCJkYXRhSWQiLCJmaWx0ZXJzIiwibmFtZSIsImZpZWxkc1NlbGVjdG9yIiwiZmlsdGVyU2VsZWN0b3IiLCJuYW1lU2VsZWN0b3IiLCJkYXRhSWRTZWxlY3RvciIsImZpZWxkcyIsImYiLCJ0eXBlIiwiQUxMX0ZJRUxEX1RZUEVTIiwiZ2VvanNvbiIsImZpbmQiLCJkIiwiY29uc29sZSIsImxvZyIsIkZpbHRlckZpbHRlckNvbXBvbmVudCIsImFsbEF2YWlsYWJsZUZpZWxkcyIsImF2YWlsYWJsZUZpZWxkc1NlbGVjdG9yIiwiQ29tcG9uZW50IiwiaWR4IiwiUHJvcFR5cGVzIiwibnVtYmVyIiwiYXJyYXlPZiIsImFueSIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJzZXRGaWx0ZXIiLCJmdW5jIiwicmVtb3ZlRmlsdGVyIiwiZW5sYXJnZUZpbHRlciIsInRvZ2dsZUFuaW1hdGlvbiIsInRvZ2dsZUZpbHRlckZlYXR1cmUiLCJkYXRhc2V0cyIsInNob3dEYXRhc2V0VGFibGUiLCJpc0FueUZpbHRlckFuaW1hdGluZyIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixHQUFHQyw2QkFBT0MsR0FBVix1SUFBdkI7O0FBS0FDLGtCQUFrQixDQUFDQyxJQUFuQixHQUEwQixDQUN4QkMsNkJBRHdCLEVBRXhCQywwQkFGd0IsRUFHeEJDLGdDQUh3QixFQUl4QkMsbUNBSndCLEVBS3hCQyxrQ0FMd0IsRUFNeEJDLDRCQU53QixFQU94QkMsOEJBUHdCLEVBUXhCQyxpQ0FSd0IsQ0FBMUI7O0FBV0EsU0FBU1Qsa0JBQVQsQ0FDRVUsaUJBREYsRUFFRUMsY0FGRixFQUdFQyxvQkFIRixFQUlFQyx1QkFKRixFQUtFQyxzQkFMRixFQU1FQyxnQkFORixFQU9FQyxrQkFQRixFQVFFQyxxQkFSRixFQVNFO0FBQUE7O0FBQ0EsTUFBTUMscUJBQXFCO0FBQ3pCLGVBQVNQO0FBRGdCLDZEQUV4QlEsOEJBQWFDLFNBRlcsRUFFQ1Isb0JBRkQsMkRBR3hCTyw4QkFBYUUsTUFIVyxFQUdGUix1QkFIRSwyREFJeEJNLDhCQUFhRyxXQUpXLEVBSUdSLHNCQUpILDJEQUt4QkssOEJBQWFJLEtBTFcsRUFLSFIsZ0JBTEcsMkRBTXhCSSw4QkFBYUss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QUFVTyxJQUFWLENBQWVILFVBTmI7QUFPakJNLElBQUFBLGVBQWUsRUFBRVYsc0JBQVVPLElBQVYsQ0FBZUgsVUFQZjtBQVFqQk8sSUFBQUEsbUJBQW1CLEVBQUVYLHNCQUFVTyxJQUFWLENBQWVILFVBUm5CO0FBU2pCUSxJQUFBQSxRQUFRLEVBQUVaLHNCQUFVSyxNQVRIO0FBVWpCUSxJQUFBQSxnQkFBZ0IsRUFBRWIsc0JBQVVPLElBVlg7QUFXakJPLElBQUFBLG9CQUFvQixFQUFFZCxzQkFBVWU7QUFYZixHQURyQjtBQTBERDs7ZUFFY2pFLGtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIEZJTFRFUl9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQgRmlsdGVyUGFuZWxIZWFkZXJGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9maWx0ZXItcGFuZWwvZmlsdGVyLXBhbmVsLWhlYWRlcic7XG5pbXBvcnQgTmV3RmlsdGVyUGFuZWxGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItcGFuZWxzL25ldy1maWx0ZXItcGFuZWwnO1xuaW1wb3J0IFRpbWVSYW5nZUZpbHRlclBhbmVsRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLXBhbmVscy90aW1lLXJhbmdlLWZpbHRlci1wYW5lbCc7XG5pbXBvcnQgU2luZ2xlU2VsZWN0RmlsdGVyUGFuZWxGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItcGFuZWxzL3NpbmdsZS1zZWxlY3QtZmlsdGVyLXBhbmVsJztcbmltcG9ydCBNdWx0aVNlbGVjdEZpbHRlclBhbmVsRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLXBhbmVscy9tdWx0aS1zZWxlY3QtZmlsdGVyLXBhbmVsJztcbmltcG9ydCBSYW5nZUZpbHRlclBhbmVsRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLXBhbmVscy9yYW5nZS1maWx0ZXItcGFuZWwnO1xuaW1wb3J0IFBvbHlnb25GaWx0ZXJQYW5lbEZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1wYW5lbHMvcG9seWdvbi1maWx0ZXItcGFuZWwnO1xuaW1wb3J0IERhdGVTZWxlY3RGaWx0ZXJQYW5lbEZhY3RvcnkgZnJvbSAnLi4vLi4vZmlsdGVycy9maWx0ZXItcGFuZWxzL2RhdGUtc2VsZWN0LWZpbHRlci1wYW5lbCc7XG5cbmNvbnN0IFN0eWxlZEZpbHRlclBhbmVsID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xuYDtcblxuRmlsdGVyUGFuZWxGYWN0b3J5LmRlcHMgPSBbXG4gIEZpbHRlclBhbmVsSGVhZGVyRmFjdG9yeSxcbiAgTmV3RmlsdGVyUGFuZWxGYWN0b3J5LFxuICBUaW1lUmFuZ2VGaWx0ZXJQYW5lbEZhY3RvcnksXG4gIFNpbmdsZVNlbGVjdEZpbHRlclBhbmVsRmFjdG9yeSxcbiAgTXVsdGlTZWxlY3RGaWx0ZXJQYW5lbEZhY3RvcnksXG4gIFJhbmdlRmlsdGVyUGFuZWxGYWN0b3J5LFxuICBQb2x5Z29uRmlsdGVyUGFuZWxGYWN0b3J5LFxuICBEYXRlU2VsZWN0RmlsdGVyUGFuZWxGYWN0b3J5XG5dO1xuXG5mdW5jdGlvbiBGaWx0ZXJQYW5lbEZhY3RvcnkoXG4gIEZpbHRlclBhbmVsSGVhZGVyLFxuICBOZXdGaWx0ZXJQYW5lbCxcbiAgVGltZVJhbmdlRmlsdGVyUGFuZWwsXG4gIFNpbmdsZVNlbGVjdEZpbHRlclBhbmVsLFxuICBNdWx0aVNlbGVjdEZpbHRlclBhbmVsLFxuICBSYW5nZUZpbHRlclBhbmVsLFxuICBQb2x5Z29uRmlsdGVyUGFuZWwsXG4gIERhdGVTZWxlY3RGaWx0ZXJQYW5lbFxuKSB7XG4gIGNvbnN0IEZpbHRlclBhbmVsQ29tcG9uZW50cyA9IHtcbiAgICBkZWZhdWx0OiBOZXdGaWx0ZXJQYW5lbCxcbiAgICBbRklMVEVSX1RZUEVTLnRpbWVSYW5nZV06IFRpbWVSYW5nZUZpbHRlclBhbmVsLFxuICAgIFtGSUxURVJfVFlQRVMuc2VsZWN0XTogU2luZ2xlU2VsZWN0RmlsdGVyUGFuZWwsXG4gICAgW0ZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdF06IE11bHRpU2VsZWN0RmlsdGVyUGFuZWwsXG4gICAgW0ZJTFRFUl9UWVBFUy5yYW5nZV06IFJhbmdlRmlsdGVyUGFuZWwsXG4gICAgW0ZJTFRFUl9UWVBFUy5wb2x5Z29uXTogUG9seWdvbkZpbHRlclBhbmVsLFxuICAgIFtGSUxURVJfVFlQRVMuZGF0ZVNlbGVjdF06RGF0ZVNlbGVjdEZpbHRlclBhbmVsXG4gIH07XG5cbiAgcmV0dXJuIGNsYXNzIEZpbHRlclBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgaWR4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgZmlsdGVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgc2V0RmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcmVtb3ZlRmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZW5sYXJnZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHRvZ2dsZUFuaW1hdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHRvZ2dsZUZpbHRlckZlYXR1cmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIHNob3dEYXRhc2V0VGFibGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmc6IFByb3BUeXBlcy5ib29sXG4gICAgfTtcblxuICAgIC8qIHNlbGVjdG9ycyAqL1xuICAgIGZpZWxkc1NlbGVjdG9yID0gcHJvcHMgPT4ge1xuICAgICAgY29uc3QgZGF0YXNldElkID0gcHJvcHMuZmlsdGVyLmRhdGFJZFswXTtcbiAgICAgIGlmICghZGF0YXNldElkKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXQocHJvcHMsIFsnZGF0YXNldHMnLCBkYXRhc2V0SWQsICdmaWVsZHMnXSwgW10pO1xuICAgIH07XG5cbiAgICBmaWx0ZXJTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlcnM7XG4gICAgbmFtZVNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVyLm5hbWU7XG4gICAgZGF0YUlkU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXIuZGF0YUlkWzBdO1xuXG4gICAgLy8gb25seSBzaG93IGN1cnJlbnQgZmllbGQgYW5kIGZpZWxkIHRoYXQncyBub3QgYWxyZWFkeSBiZWVuIHVzZWQgYXMgYSBmaWx0ZXJcbiAgICBhdmFpbGFibGVGaWVsZHNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy5maWVsZHNTZWxlY3RvcixcbiAgICAgIHRoaXMuZmlsdGVyU2VsZWN0b3IsXG4gICAgICB0aGlzLm5hbWVTZWxlY3RvcixcbiAgICAgIHRoaXMuZGF0YUlkU2VsZWN0b3IsXG4gICAgICAoZmllbGRzLCBmaWx0ZXJzLCBuYW1lLCBkYXRhSWQpID0+XG4gICAgICAgIGZpZWxkcy5maWx0ZXIoXG4gICAgICAgICAgZiA9PlxuICAgICAgICAgICAgZi50eXBlICYmXG4gICAgICAgICAgICBmLnR5cGUgIT09IEFMTF9GSUVMRF9UWVBFUy5nZW9qc29uICYmXG4gICAgICAgICAgICAoZi5uYW1lID09PSBuYW1lIHx8ICFmaWx0ZXJzLmZpbmQoZCA9PiBkLm5hbWUgPT09IGYubmFtZSAmJiBkLmRhdGFJZCA9PT0gZGF0YUlkKSlcbiAgICAgICAgKVxuICAgICk7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7ZmlsdGVyfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zb2xlLmxvZyhmaWx0ZXIpO1xuICAgICAgY29uc3Qge3R5cGV9ID0gZmlsdGVyO1xuICAgICAgY29uc3QgRmlsdGVyRmlsdGVyQ29tcG9uZW50ID1cbiAgICAgICAgKHR5cGUgJiYgRmlsdGVyUGFuZWxDb21wb25lbnRzW3R5cGVdKSB8fCBGaWx0ZXJQYW5lbENvbXBvbmVudHMuZGVmYXVsdDtcbiAgICAgIGNvbnN0IGFsbEF2YWlsYWJsZUZpZWxkcyA9IHRoaXMuYXZhaWxhYmxlRmllbGRzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRGaWx0ZXJQYW5lbCBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxcIj5cbiAgICAgICAgICA8RmlsdGVyRmlsdGVyQ29tcG9uZW50IGFsbEF2YWlsYWJsZUZpZWxkcz17YWxsQXZhaWxhYmxlRmllbGRzfSB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgPC9TdHlsZWRGaWx0ZXJQYW5lbD5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJQYW5lbEZhY3Rvcnk7XG4iXX0=