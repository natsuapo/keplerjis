"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../common/styled-components");

var _filterPanelHeader = _interopRequireDefault(require("../filter-panel/filter-panel-header"));

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

var _sourceDataSelector = _interopRequireDefault(require("../common/source-data-selector"));

var _styledComponents2 = _interopRequireDefault(require("styled-components"));

var _templateObject;

NewProcessPanelFactory.deps = [_sourceDataSelector["default"] // NewProcessPanelFactory
];

var StyledProcessPanel = _styledComponents2["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n"])));

function NewProcessPanelFactory(FilterPanelHeader, SourceDataSelector) {
  var NewProcessPanel = /*#__PURE__*/_react["default"].memo(function (_ref) {
    var processor = _ref.processor,
        datasets = _ref.datasets,
        setProcessor = _ref.setProcessor;

    var onSourceDataSelector = function onSourceDataSelector(value) {
      return setProcessor('dataId', value);
    };

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(StyledProcessPanel, {
      className: "filter-panel"
    }, /*#__PURE__*/_react["default"].createElement(SourceDataSelector, {
      inputTheme: "secondary",
      datasets: datasets,
      dataId: processor ? processor.dataId : null,
      onSelect: function onSelect(x) {
        return onSourceDataSelector(x);
      }
    })));
  });

  NewProcessPanel.displayName = 'NewProcessPanel';
  return NewProcessPanel;
}

var _default = NewProcessPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcHJvY2Vzcy1wYW5lbC9uZXctcHJvY2Vzcy1wYW5lbC5qcyJdLCJuYW1lcyI6WyJOZXdQcm9jZXNzUGFuZWxGYWN0b3J5IiwiZGVwcyIsIlNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkiLCJTdHlsZWRQcm9jZXNzUGFuZWwiLCJzdHlsZWQiLCJkaXYiLCJGaWx0ZXJQYW5lbEhlYWRlciIsIlNvdXJjZURhdGFTZWxlY3RvciIsIk5ld1Byb2Nlc3NQYW5lbCIsIlJlYWN0IiwibWVtbyIsInByb2Nlc3NvciIsImRhdGFzZXRzIiwic2V0UHJvY2Vzc29yIiwib25Tb3VyY2VEYXRhU2VsZWN0b3IiLCJ2YWx1ZSIsImRhdGFJZCIsIngiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxzQkFBc0IsQ0FBQ0MsSUFBdkIsR0FBOEIsQ0FDNUJDLDhCQUQ0QixDQUU1QjtBQUY0QixDQUE5Qjs7QUFLQSxJQUFNQyxrQkFBa0IsR0FBR0MsOEJBQU9DLEdBQVYsZ01BQXhCOztBQVdBLFNBQVNMLHNCQUFULENBQWdDTSxpQkFBaEMsRUFBbURDLGtCQUFuRCxFQUF1RTtBQUNyRSxNQUFNQyxlQUFlLGdCQUFHQyxrQkFBTUMsSUFBTixDQUN0QixnQkFBd0M7QUFBQSxRQUF0Q0MsU0FBc0MsUUFBdENBLFNBQXNDO0FBQUEsUUFBNUJDLFFBQTRCLFFBQTVCQSxRQUE0QjtBQUFBLFFBQWxCQyxZQUFrQixRQUFsQkEsWUFBa0I7O0FBRXRDLFFBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQ0MsS0FBRCxFQUFXO0FBQ3RDLGFBQU9GLFlBQVksQ0FBQyxRQUFELEVBQVdFLEtBQVgsQ0FBbkI7QUFBcUMsS0FEdkM7O0FBR0Esd0JBQ0UsK0VBQ0UsZ0NBQUMsa0JBQUQ7QUFBb0IsTUFBQSxTQUFTLEVBQUM7QUFBOUIsb0JBQ0UsZ0NBQUMsa0JBQUQ7QUFDRSxNQUFBLFVBQVUsRUFBQyxXQURiO0FBRUUsTUFBQSxRQUFRLEVBQUVILFFBRlo7QUFHRSxNQUFBLE1BQU0sRUFBRUQsU0FBUyxHQUFDQSxTQUFTLENBQUNLLE1BQVgsR0FBa0IsSUFIckM7QUFJRSxNQUFBLFFBQVEsRUFBRSxrQkFBQ0MsQ0FBRDtBQUFBLGVBQUtILG9CQUFvQixDQUFDRyxDQUFELENBQXpCO0FBQUE7QUFKWixNQURGLENBREYsQ0FERjtBQVlELEdBbEJxQixDQUF4Qjs7QUFvQkFULEVBQUFBLGVBQWUsQ0FBQ1UsV0FBaEIsR0FBOEIsaUJBQTlCO0FBQ0EsU0FBT1YsZUFBUDtBQUNEOztlQUVjUixzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge3VzZUNhbGxiYWNrfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1N0eWxlZEZpbHRlckNvbnRlbnR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBGaWx0ZXJQYW5lbEhlYWRlckZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL2ZpbHRlci1wYW5lbC9maWx0ZXItcGFuZWwtaGVhZGVyJztcbmltcG9ydCBGaWVsZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCBTb3VyY2VEYXRhU2VsZWN0b3JGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9jb21tb24vc291cmNlLWRhdGEtc2VsZWN0b3InO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbk5ld1Byb2Nlc3NQYW5lbEZhY3RvcnkuZGVwcyA9IFtcbiAgU291cmNlRGF0YVNlbGVjdG9yRmFjdG9yeVxuICAvLyBOZXdQcm9jZXNzUGFuZWxGYWN0b3J5XG5dO1xuXG5jb25zdCBTdHlsZWRQcm9jZXNzUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG5cbiAgLmZpbHRlci1wYW5lbF9fZmlsdGVyIHtcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xuICB9XG5gO1xuXG5cblxuZnVuY3Rpb24gTmV3UHJvY2Vzc1BhbmVsRmFjdG9yeShGaWx0ZXJQYW5lbEhlYWRlciwgU291cmNlRGF0YVNlbGVjdG9yKSB7XG4gIGNvbnN0IE5ld1Byb2Nlc3NQYW5lbCA9IFJlYWN0Lm1lbW8oXG4gICAgKHtwcm9jZXNzb3IsZGF0YXNldHMsIHNldFByb2Nlc3Nvcn0pID0+IHtcblxuICAgICAgY29uc3Qgb25Tb3VyY2VEYXRhU2VsZWN0b3IgPSAodmFsdWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignZGF0YUlkJywgdmFsdWUpfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxTdHlsZWRQcm9jZXNzUGFuZWwgY2xhc3NOYW1lPVwiZmlsdGVyLXBhbmVsXCI+XG4gICAgICAgICAgICA8U291cmNlRGF0YVNlbGVjdG9yXG4gICAgICAgICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGRhdGFJZD17cHJvY2Vzc29yP3Byb2Nlc3Nvci5kYXRhSWQ6bnVsbH1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9eyh4KT0+b25Tb3VyY2VEYXRhU2VsZWN0b3IoeCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvU3R5bGVkUHJvY2Vzc1BhbmVsPlxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgfVxuICApO1xuICBOZXdQcm9jZXNzUGFuZWwuZGlzcGxheU5hbWUgPSAnTmV3UHJvY2Vzc1BhbmVsJztcbiAgcmV0dXJuIE5ld1Byb2Nlc3NQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV3UHJvY2Vzc1BhbmVsRmFjdG9yeTtcbiJdfQ==