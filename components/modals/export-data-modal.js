"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _defaultSettings = require("../../constants/default-settings");

var _icons = require("../common/icons");

var _styledComponents = require("../common/styled-components");

var _reactIntl = require("react-intl");

var _localization = require("../../localization");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = {
  datasets: _propTypes["default"].object.isRequired,
  selectedDataset: _propTypes["default"].string,
  dataType: _propTypes["default"].string.isRequired,
  filtered: _propTypes["default"].bool.isRequired,
  // callbacks
  applyCPUFilter: _propTypes["default"].func.isRequired,
  onClose: _propTypes["default"].func.isRequired,
  onChangeExportSelectedDataset: _propTypes["default"].func.isRequired,
  onChangeExportDataType: _propTypes["default"].func.isRequired,
  onChangeExportFiltered: _propTypes["default"].func.isRequired
};

var getDataRowCount = function getDataRowCount(datasets, selectedDataset, filtered, intl) {
  var selectedData = datasets[selectedDataset];

  if (!selectedData) {
    return intl.formatMessage({
      id: 'modal.exportData.fileCount'
    }, {
      fileCount: Object.keys(datasets).length
    });
  }

  var dataContainer = selectedData.dataContainer,
      filteredIdxCPU = selectedData.filteredIdxCPU;

  if (filtered && !filteredIdxCPU) {
    return '-';
  }

  var rowCount = filtered ? filteredIdxCPU.length : dataContainer.numRows();
  return intl.formatMessage({
    id: 'modal.exportData.rowCount'
  }, {
    rowCount: rowCount.toLocaleString()
  });
};

var ExportDataModalFactory = function ExportDataModalFactory() {
  var ExportDataModal = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(ExportDataModal, _Component);

    var _super = _createSuper(ExportDataModal);

    function ExportDataModal() {
      var _this;

      (0, _classCallCheck2["default"])(this, ExportDataModal);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSelectDataset", function (_ref) {
        var value = _ref.target.value;

        _this.props.applyCPUFilter(value);

        _this.props.onChangeExportSelectedDataset(value);
      });
      return _this;
    }

    (0, _createClass2["default"])(ExportDataModal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var toCPUFilter = this.props.selectedDataset || Object.keys(this.props.datasets);
        this.props.applyCPUFilter(toCPUFilter);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            supportedDataTypes = _this$props.supportedDataTypes,
            datasets = _this$props.datasets,
            selectedDataset = _this$props.selectedDataset,
            dataType = _this$props.dataType,
            filtered = _this$props.filtered,
            onChangeExportDataType = _this$props.onChangeExportDataType,
            onChangeExportFiltered = _this$props.onChangeExportFiltered,
            intl = _this$props.intl;
        return /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledModalContent, {
          className: "export-data-modal"
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledExportSection, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: "description"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "title"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.datasetTitle'
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "subtitle"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.datasetSubtitle'
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "selection"
        }, /*#__PURE__*/_react["default"].createElement("select", {
          value: selectedDataset,
          onChange: this._onSelectDataset
        }, [intl.formatMessage({
          id: 'modal.exportData.allDatasets'
        })].concat(Object.keys(datasets)).map(function (d) {
          return /*#__PURE__*/_react["default"].createElement("option", {
            key: d,
            value: d
          }, datasets[d] && datasets[d].label || d);
        })))), /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledExportSection, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: "description"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "title"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.dataTypeTitle'
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "subtitle"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.dataTypeSubtitle'
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "selection"
        }, supportedDataTypes.map(function (op) {
          return /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledType, {
            key: op.id,
            selected: dataType === op.id,
            available: op.available,
            onClick: function onClick() {
              return op.available && onChangeExportDataType(op.id);
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.FileType, {
            ext: op.label,
            height: "80px",
            fontSize: "11px"
          }), dataType === op.id && /*#__PURE__*/_react["default"].createElement(_styledComponents.CheckMark, null));
        }))), /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledExportSection, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: "description"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "title"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.dataTypeTitle'
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "subtitle"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.filterDataSubtitle'
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "selection"
        }, /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledFilteredOption, {
          className: "unfiltered-option",
          selected: !filtered,
          onClick: function onClick() {
            return onChangeExportFiltered(false);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "filter-option-title"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.unfilteredData'
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "filter-option-subtitle"
        }, getDataRowCount(datasets, selectedDataset, false, intl)), !filtered && /*#__PURE__*/_react["default"].createElement(_styledComponents.CheckMark, null)), /*#__PURE__*/_react["default"].createElement(_styledComponents.StyledFilteredOption, {
          className: "filtered-option",
          selected: filtered,
          onClick: function onClick() {
            return onChangeExportFiltered(true);
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "filter-option-title"
        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: 'modal.exportData.filteredData'
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "filter-option-subtitle"
        }, getDataRowCount(datasets, selectedDataset, true, intl)), filtered && /*#__PURE__*/_react["default"].createElement(_styledComponents.CheckMark, null))))));
      }
    }]);
    return ExportDataModal;
  }(_react.Component);

  ExportDataModal.propTypes = propTypes;
  ExportDataModal.defaultProps = {
    supportedDataTypes: _defaultSettings.EXPORT_DATA_TYPE_OPTIONS
  };
  return (0, _reactIntl.injectIntl)(ExportDataModal);
};

var _default = ExportDataModalFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtZGF0YS1tb2RhbC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJkYXRhc2V0cyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJzZWxlY3RlZERhdGFzZXQiLCJzdHJpbmciLCJkYXRhVHlwZSIsImZpbHRlcmVkIiwiYm9vbCIsImFwcGx5Q1BVRmlsdGVyIiwiZnVuYyIsIm9uQ2xvc2UiLCJvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldCIsIm9uQ2hhbmdlRXhwb3J0RGF0YVR5cGUiLCJvbkNoYW5nZUV4cG9ydEZpbHRlcmVkIiwiZ2V0RGF0YVJvd0NvdW50IiwiaW50bCIsInNlbGVjdGVkRGF0YSIsImZvcm1hdE1lc3NhZ2UiLCJpZCIsImZpbGVDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJkYXRhQ29udGFpbmVyIiwiZmlsdGVyZWRJZHhDUFUiLCJyb3dDb3VudCIsIm51bVJvd3MiLCJ0b0xvY2FsZVN0cmluZyIsIkV4cG9ydERhdGFNb2RhbEZhY3RvcnkiLCJFeHBvcnREYXRhTW9kYWwiLCJ2YWx1ZSIsInRhcmdldCIsInByb3BzIiwidG9DUFVGaWx0ZXIiLCJzdXBwb3J0ZWREYXRhVHlwZXMiLCJfb25TZWxlY3REYXRhc2V0IiwiY29uY2F0IiwibWFwIiwiZCIsImxhYmVsIiwib3AiLCJhdmFpbGFibGUiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJFWFBPUlRfREFUQV9UWVBFX09QVElPTlMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBT0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsUUFBUSxFQUFFQyxzQkFBVUMsTUFBVixDQUFpQkMsVUFEWDtBQUVoQkMsRUFBQUEsZUFBZSxFQUFFSCxzQkFBVUksTUFGWDtBQUdo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aWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge0VYUE9SVF9EQVRBX1RZUEVfT1BUSU9OU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtGaWxlVHlwZX0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IHtcbiAgU3R5bGVkRXhwb3J0U2VjdGlvbixcbiAgU3R5bGVkRmlsdGVyZWRPcHRpb24sXG4gIFN0eWxlZE1vZGFsQ29udGVudCxcbiAgU3R5bGVkVHlwZSxcbiAgQ2hlY2tNYXJrXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7aW5qZWN0SW50bH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2xvY2FsaXphdGlvbic7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWREYXRhc2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhVHlwZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBmaWx0ZXJlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgLy8gY2FsbGJhY2tzXG4gIGFwcGx5Q1BVRmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2VFeHBvcnREYXRhVHlwZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgZ2V0RGF0YVJvd0NvdW50ID0gKGRhdGFzZXRzLCBzZWxlY3RlZERhdGFzZXQsIGZpbHRlcmVkLCBpbnRsKSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGFzZXRzW3NlbGVjdGVkRGF0YXNldF07XG4gIGlmICghc2VsZWN0ZWREYXRhKSB7XG4gICAgcmV0dXJuIGludGwuZm9ybWF0TWVzc2FnZShcbiAgICAgIHtpZDogJ21vZGFsLmV4cG9ydERhdGEuZmlsZUNvdW50J30sXG4gICAgICB7ZmlsZUNvdW50OiBPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RofVxuICAgICk7XG4gIH1cbiAgY29uc3Qge2RhdGFDb250YWluZXIsIGZpbHRlcmVkSWR4Q1BVfSA9IHNlbGVjdGVkRGF0YTtcblxuICBpZiAoZmlsdGVyZWQgJiYgIWZpbHRlcmVkSWR4Q1BVKSB7XG4gICAgcmV0dXJuICctJztcbiAgfVxuXG4gIGNvbnN0IHJvd0NvdW50ID0gZmlsdGVyZWQgPyBmaWx0ZXJlZElkeENQVS5sZW5ndGggOiBkYXRhQ29udGFpbmVyLm51bVJvd3MoKTtcblxuICByZXR1cm4gaW50bC5mb3JtYXRNZXNzYWdlKFxuICAgIHtpZDogJ21vZGFsLmV4cG9ydERhdGEucm93Q291bnQnfSxcbiAgICB7cm93Q291bnQ6IHJvd0NvdW50LnRvTG9jYWxlU3RyaW5nKCl9XG4gICk7XG59O1xuXG5jb25zdCBFeHBvcnREYXRhTW9kYWxGYWN0b3J5ID0gKCkgPT4ge1xuICBjbGFzcyBFeHBvcnREYXRhTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgY29uc3QgdG9DUFVGaWx0ZXIgPSB0aGlzLnByb3BzLnNlbGVjdGVkRGF0YXNldCB8fCBPYmplY3Qua2V5cyh0aGlzLnByb3BzLmRhdGFzZXRzKTtcbiAgICAgIHRoaXMucHJvcHMuYXBwbHlDUFVGaWx0ZXIodG9DUFVGaWx0ZXIpO1xuICAgIH1cblxuICAgIF9vblNlbGVjdERhdGFzZXQgPSAoe3RhcmdldDoge3ZhbHVlfX0pID0+IHtcbiAgICAgIHRoaXMucHJvcHMuYXBwbHlDUFVGaWx0ZXIodmFsdWUpO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3VwcG9ydGVkRGF0YVR5cGVzLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgc2VsZWN0ZWREYXRhc2V0LFxuICAgICAgICBkYXRhVHlwZSxcbiAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgIG9uQ2hhbmdlRXhwb3J0RGF0YVR5cGUsXG4gICAgICAgIG9uQ2hhbmdlRXhwb3J0RmlsdGVyZWQsXG4gICAgICAgIGludGxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTW9kYWxDb250ZW50IGNsYXNzTmFtZT1cImV4cG9ydC1kYXRhLW1vZGFsXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxTdHlsZWRFeHBvcnRTZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eydtb2RhbC5leHBvcnREYXRhLmRhdGFzZXRUaXRsZSd9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eydtb2RhbC5leHBvcnREYXRhLmRhdGFzZXRTdWJ0aXRsZSd9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3NlbGVjdGVkRGF0YXNldH0gb25DaGFuZ2U9e3RoaXMuX29uU2VsZWN0RGF0YXNldH0+XG4gICAgICAgICAgICAgICAgICB7W2ludGwuZm9ybWF0TWVzc2FnZSh7aWQ6ICdtb2RhbC5leHBvcnREYXRhLmFsbERhdGFzZXRzJ30pXVxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KE9iamVjdC5rZXlzKGRhdGFzZXRzKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChkID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17ZH0gdmFsdWU9e2R9PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhkYXRhc2V0c1tkXSAmJiBkYXRhc2V0c1tkXS5sYWJlbCkgfHwgZH1cbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9TdHlsZWRFeHBvcnRTZWN0aW9uPlxuICAgICAgICAgICAgPFN0eWxlZEV4cG9ydFNlY3Rpb24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17J21vZGFsLmV4cG9ydERhdGEuZGF0YVR5cGVUaXRsZSd9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eydtb2RhbC5leHBvcnREYXRhLmRhdGFUeXBlU3VidGl0bGUnfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICB7c3VwcG9ydGVkRGF0YVR5cGVzLm1hcChvcCA9PiAoXG4gICAgICAgICAgICAgICAgICA8U3R5bGVkVHlwZVxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wLmlkfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17ZGF0YVR5cGUgPT09IG9wLmlkfVxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGU9e29wLmF2YWlsYWJsZX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb3AuYXZhaWxhYmxlICYmIG9uQ2hhbmdlRXhwb3J0RGF0YVR5cGUob3AuaWQpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RmlsZVR5cGUgZXh0PXtvcC5sYWJlbH0gaGVpZ2h0PVwiODBweFwiIGZvbnRTaXplPVwiMTFweFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIHtkYXRhVHlwZSA9PT0gb3AuaWQgJiYgPENoZWNrTWFyayAvPn1cbiAgICAgICAgICAgICAgICAgIDwvU3R5bGVkVHlwZT5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1N0eWxlZEV4cG9ydFNlY3Rpb24+XG4gICAgICAgICAgICA8U3R5bGVkRXhwb3J0U2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsnbW9kYWwuZXhwb3J0RGF0YS5kYXRhVHlwZVRpdGxlJ30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17J21vZGFsLmV4cG9ydERhdGEuZmlsdGVyRGF0YVN1YnRpdGxlJ30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPFN0eWxlZEZpbHRlcmVkT3B0aW9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ1bmZpbHRlcmVkLW9wdGlvblwiXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZD17IWZpbHRlcmVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZChmYWxzZSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItb3B0aW9uLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsnbW9kYWwuZXhwb3J0RGF0YS51bmZpbHRlcmVkRGF0YSd9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLW9wdGlvbi1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0RGF0YVJvd0NvdW50KGRhdGFzZXRzLCBzZWxlY3RlZERhdGFzZXQsIGZhbHNlLCBpbnRsKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgeyFmaWx0ZXJlZCAmJiA8Q2hlY2tNYXJrIC8+fVxuICAgICAgICAgICAgICAgIDwvU3R5bGVkRmlsdGVyZWRPcHRpb24+XG4gICAgICAgICAgICAgICAgPFN0eWxlZEZpbHRlcmVkT3B0aW9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaWx0ZXJlZC1vcHRpb25cIlxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2ZpbHRlcmVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZCh0cnVlKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1vcHRpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eydtb2RhbC5leHBvcnREYXRhLmZpbHRlcmVkRGF0YSd9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLW9wdGlvbi1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0RGF0YVJvd0NvdW50KGRhdGFzZXRzLCBzZWxlY3RlZERhdGFzZXQsIHRydWUsIGludGwpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7ZmlsdGVyZWQgJiYgPENoZWNrTWFyayAvPn1cbiAgICAgICAgICAgICAgICA8L1N0eWxlZEZpbHRlcmVkT3B0aW9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvU3R5bGVkRXhwb3J0U2VjdGlvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9TdHlsZWRNb2RhbENvbnRlbnQ+XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBFeHBvcnREYXRhTW9kYWwucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBFeHBvcnREYXRhTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICAgIHN1cHBvcnRlZERhdGFUeXBlczogRVhQT1JUX0RBVEFfVFlQRV9PUFRJT05TXG4gIH07XG5cbiAgcmV0dXJuIGluamVjdEludGwoRXhwb3J0RGF0YU1vZGFsKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cG9ydERhdGFNb2RhbEZhY3Rvcnk7XG4iXX0=