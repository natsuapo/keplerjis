"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _constants = require("../../../constants");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sourceDataSelector = _interopRequireDefault(require("../common/source-data-selector"));

var _filterPanelWithFieldSelect = _interopRequireDefault(require("../../filters/filter-panels/filter-panel-with-field-select"));

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

var _filterPanelHeader = _interopRequireDefault(require("../filter-panel/filter-panel-header"));

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _defaultSettings = require("../../../constants/default-settings");

var _2 = require("../..");

var _localization = require("../../../localization");

var _processorUtils = require("../../../utils/processor-utils");

var _lodash2 = _interopRequireDefault(require("lodash"));

var _templateObject;

ProcessPanelFactory.deps = [_sourceDataSelector["default"], _fieldSelector["default"], _filterPanelHeader["default"] // NewProcessPanelFactory
];

var StyledProcessPanel = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n"])));

function ProcessPanelFactory(SourceDataSelector, FieldSelector) {
  var ProcessPanel = /*#__PURE__*/_react["default"].memo(function (_ref) {
    var processor = _ref.processor,
        datasets = _ref.datasets,
        setProcessor = _ref.setProcessor,
        allAvailableFields = _ref.allAvailableFields;
    console.log('render all available fields');
    var allFields = allAvailableFields(true);

    var onSourceDataSelector = function onSourceDataSelector(value) {
      console.log(value);
      return setProcessor('dataId', value);
    };

    var onFieldSelector = function onFieldSelector(value) {
      console.log('process field selected', value);
      return setProcessor('name', value);
    };

    var onJoinTypeSelect = function onJoinTypeSelect(value) {
      var attrs = processor.attrs;
      attrs.how = value;
      setProcessor('attrs', attrs);
    };

    var onSpatialInteractTypeSelect = function onSpatialInteractTypeSelect(value) {
      var attrs = processor.attrs;
      attrs.sinter = value;
      setProcessor('attrs', attrs);
    };

    var joinFieldsSelector = function joinFieldsSelector() {
      var datasetId = processor.attrs.joinData ? processor.attrs.joinData : undefined;

      if (!datasetId) {
        return [];
      }

      return (0, _lodash["default"])(datasets, [datasetId, 'fields'], []);
    };

    var onProcessSelector = function onProcessSelector(value) {
      console.log('processorSelector', value);
      var attrs = processor.attrs; // const attrs = {}

      attrs.outColumn = _processorUtils.PROCESS_NEW_COLS[_lodash2["default"].invert(_defaultSettings.PROCESS_ITEMS)[value]];
      attrs.replace = false;
      setProcessor('method', value);
      return setProcessor('attrs', attrs);
    };

    var onJoinSourceDataSelector = function onJoinSourceDataSelector(value) {
      console.log('processorSelector', value);
      var attrs = processor.attrs;
      attrs.joinData = value;
      return setProcessor('attrs', attrs);
    };

    var onJoinFieldSelector = function onJoinFieldSelector(value) {
      var attrs = processor.attrs;

      if (Array.isArray(attrs.joinField)) {
        attrs.joinField[0] = value;
      } else {
        attrs.joinField = value;
      }

      return setProcessor('attrs', attrs);
    };

    var onSecondJoinFieldSelector = function onSecondJoinFieldSelector(value) {
      var attrs = processor.attrs;

      if (Array.isArray(attrs.joinField)) {
        attrs.joinField[1] = value;
      } else {
        attrs.joinField = [attrs.joinField, value];
      }

      return setProcessor('attrs', attrs);
    };

    var onAddAPI = function onAddAPI(e) {
      var attrs = processor.attrs;
      attrs['key'] = e.target.value;
      return setProcessor('attrs', attrs);
    };

    var onSetPrecison = function onSetPrecison(e) {
      var attrs = processor.attrs;
      attrs['precision'] = e;
      return setProcessor('attrs', attrs);
    };

    var onSetOutColumn = function onSetOutColumn(e) {
      var attrs = processor.attrs;
      attrs['outColumn'] = e.target.value;
      return setProcessor('attrs', attrs);
    };

    var onSetDigit = function onSetDigit(e) {
      var digitValue = e.target.value;
      var attrs = processor.attrs;
      attrs.digit = digitValue.split(',').map(function (x) {
        return parseFloat(x);
      });
      return setProcessor('attrs', attrs);
    };

    var onChangeFloorInt = function onChangeFloorInt(e) {
      console.log('change floor int');
      var attrs = processor.attrs;
      attrs.minute_unit = parseInt(e);
      return setProcessor('attrs', attrs);
    };

    var onSetLatColumn = function onSetLatColumn(e) {
      var attrs = processor.attrs;
      attrs['outColumn'][0] = e.target.value;
      return setProcessor('attrs', attrs);
    };

    var onCheckReplace = function onCheckReplace(e) {
      console.log('check replace example');
      var attrs = processor.attrs;
      attrs['replace'] = e.target.checked;
      return setProcessor('attrs', attrs);
    };

    var setOptions = function setOptions() {
      console.log('set options');
      var options = processor && (Array.isArray(processor.name) ? processor.name.length > 0 : processor.name) ? _defaultSettings.PROCESS_LIST[processor.name.type] ? _defaultSettings.PROCESS_LIST[processor.name.type] : [] : [];
      return options;
    };

    var onSetLngColumn = function onSetLngColumn(e) {
      var attrs = processor.attrs;
      attrs['outColumn'][1] = e.target.value;
      return setProcessor('attrs', attrs);
    }; // const onSourceDataSelector = useCallback(value => setFilter(parseInt(idx), 'dataId', value), [
    //   idx,
    //   setFilter
    // ]);


    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(StyledProcessPanel, {
      className: "filter-panel"
    }, /*#__PURE__*/_react["default"].createElement(FieldSelector, {
      inputTheme: "secondary" // suggested={allFields?allFields.suggested:[]}
      ,
      fields: allFields ? allFields : [],
      value: Array.isArray(processor.name) ? processor.name[0] : processor.name,
      erasable: false,
      onSelect: onFieldSelector
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.choosepro"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      onChange: onProcessSelector,
      options: setOptions(),
      selectedItems: processor.method,
      multiSelect: false
    }), processor.method && (processor.method.includes('GeoCoding') || processor.method.includes('Google')) && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_2.Input, {
      type: "password",
      className: "typeahead__input",
      placeholder: "please input your Google API here",
      id: "apikey-input",
      onChange: onAddAPI
    })), processor.method && (processor.method.includes('address') || processor.method.includes('Google API Query with id')) && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      placeholder: 'Select the query address level',
      options: Object.keys(_defaultSettings.ADDRESS_LEVEL_DICT),
      onChange: onSetPrecison,
      selectedItems: processor.attrs.precision,
      multiSelect: false
    })), processor.method && !processor.method.includes('GeoCoding') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: /[Jj]oin|[Mm]ask/.test(processor.method) ? "processor.outTableName" : "processor.outColumnName"
    })), /*#__PURE__*/_react["default"].createElement(_2.Input, {
      value: processor.attrs.outColumn,
      onChange: onSetOutColumn
    })), processor.method && processor.method.includes('GeoCoding') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.outlat"
    })), /*#__PURE__*/_react["default"].createElement(_2.Input, {
      placeholder: _processorUtils.PROCESS_NEW_COLS[_lodash2["default"].invert(_defaultSettings.PROCESS_ITEMS)[processor.method]][0],
      onChange: onSetLatColumn
    }), /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.outlng"
    })), /*#__PURE__*/_react["default"].createElement(_2.Input, {
      placeholder: _processorUtils.PROCESS_NEW_COLS[_lodash2["default"].invert(_defaultSettings.PROCESS_ITEMS)[processor.method]][1],
      onChange: onSetLngColumn
    })), processor.method && !processor.method.includes('GeoCoding') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: /[Jj]oin|[Mm]ask/.test(processor.method) ? "processor.replaceDs" : "processor.replaceCol"
    })), /*#__PURE__*/_react["default"].createElement(_2.Checkbox, {
      checked: processor.attrs.replace ? processor.attrs.replace : false,
      id: "custom-theme",
      onChange: onCheckReplace
    })), processor.method && processor.method.includes('digit') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.slice"
    })), /*#__PURE__*/_react["default"].createElement(_2.Input, {
      placeholder: 'set the digit to slice,input array or int,int',
      onChange: onSetDigit
    })), processor.method && processor.method.includes('floor') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.floor"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      onChange: onChangeFloorInt,
      options: ['1', '5', '10', '15', '20', '30'],
      selectedItems: processor.attrs.minute_unit,
      multiSelect: false
    })), Object.keys(datasets).length > 1 && /*#__PURE__*/_react["default"].createElement(SourceDataSelector, {
      inputTheme: "secondary",
      datasets: datasets // dataId={filter.dataId}
      ,
      dataId: processor ? processor.dataId : [],
      onSelect: onSourceDataSelector
    }), Object.keys(datasets).length > 1 && processor.method && /masking|[Jj]oin/.test(processor.method) && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_2.SidePanelDivider, null), /*#__PURE__*/_react["default"].createElement(_2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.joininfo"
    })), /*#__PURE__*/_react["default"].createElement(FieldSelector, {
      inputTheme: "secondary",
      fields: joinFieldsSelector() ? joinFieldsSelector() : [],
      value: Array.isArray(processor.attrs.joinField) ? processor.attrs.joinField[0] : processor.attrs.joinField ? processor.attrs.joinField : null,
      erasable: false,
      onSelect: onJoinFieldSelector
    }), /[tT]imespan/.test(processor.method) && /*#__PURE__*/_react["default"].createElement(FieldSelector, {
      inputTheme: "secondary",
      fields: joinFieldsSelector() ? joinFieldsSelector() : [],
      value: Array.isArray(processor.attrs.joinField) ? processor.attrs.joinField[1] : null,
      erasable: false,
      onSelect: onSecondJoinFieldSelector
    }), /*#__PURE__*/_react["default"].createElement(SourceDataSelector, {
      inputTheme: "secondary",
      datasets: datasets // dataId={filter.dataId}
      ,
      dataId: processor && processor.attrs.joinData ? processor.attrs.joinData : [],
      onSelect: onJoinSourceDataSelector
    }), /[Jj]oin/.test(processor.method) && !/[tT]imespan/.test(processor.method) && /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      onChange: onJoinTypeSelect,
      options: Object.keys(_defaultSettings.JOIN_METHOD),
      selectedItems: processor.attrs.how ? processor.attrs.how : 'inner',
      multiSelect: false
    }), /[Ss]patial/.test(processor.method) && /*#__PURE__*/_react["default"].createElement("a", {
      className: "google-ctrl-logo",
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://www.mapbox.com/",
      "aria-label": "Mapbox logo"
    })), /[Gg]oogle/.test(processor.method) && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
      src: "https://developers.google.com/maps/documentation/images/powered_by_google_on_non_white.png",
      alt: "google"
    }))));
  });

  ProcessPanel.displayName = 'ProcessPanel';
  console.log('rendering react panel');
  return ProcessPanel;
}

var _default = ProcessPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcHJvY2Vzcy1wYW5lbC9wcm9jZXNzLXBhbmVsLmpzIl0sIm5hbWVzIjpbIlByb2Nlc3NQYW5lbEZhY3RvcnkiLCJkZXBzIiwiU291cmNlRGF0YVNlbGVjdG9yRmFjdG9yeSIsIkZpZWxkU2VsZWN0b3JGYWN0b3J5IiwiRmlsdGVyUGFuZWxIZWFkZXJGYWN0b3J5IiwiU3R5bGVkUHJvY2Vzc1BhbmVsIiwic3R5bGVkIiwiZGl2IiwiU291cmNlRGF0YVNlbGVjdG9yIiwiRmllbGRTZWxlY3RvciIsIlByb2Nlc3NQYW5lbCIsIlJlYWN0IiwibWVtbyIsInByb2Nlc3NvciIsImRhdGFzZXRzIiwic2V0UHJvY2Vzc29yIiwiYWxsQXZhaWxhYmxlRmllbGRzIiwiY29uc29sZSIsImxvZyIsImFsbEZpZWxkcyIsIm9uU291cmNlRGF0YVNlbGVjdG9yIiwidmFsdWUiLCJvbkZpZWxkU2VsZWN0b3IiLCJvbkpvaW5UeXBlU2VsZWN0IiwiYXR0cnMiLCJob3ciLCJvblNwYXRpYWxJbnRlcmFjdFR5cGVTZWxlY3QiLCJzaW50ZXIiLCJqb2luRmllbGRzU2VsZWN0b3IiLCJkYXRhc2V0SWQiLCJqb2luRGF0YSIsInVuZGVmaW5lZCIsIm9uUHJvY2Vzc1NlbGVjdG9yIiwib3V0Q29sdW1uIiwiUFJPQ0VTU19ORVdfQ09MUyIsIl8iLCJpbnZlcnQiLCJQUk9DRVNTX0lURU1TIiwicmVwbGFjZSIsIm9uSm9pblNvdXJjZURhdGFTZWxlY3RvciIsIm9uSm9pbkZpZWxkU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJqb2luRmllbGQiLCJvblNlY29uZEpvaW5GaWVsZFNlbGVjdG9yIiwib25BZGRBUEkiLCJlIiwidGFyZ2V0Iiwib25TZXRQcmVjaXNvbiIsIm9uU2V0T3V0Q29sdW1uIiwib25TZXREaWdpdCIsImRpZ2l0VmFsdWUiLCJkaWdpdCIsInNwbGl0IiwibWFwIiwieCIsInBhcnNlRmxvYXQiLCJvbkNoYW5nZUZsb29ySW50IiwibWludXRlX3VuaXQiLCJwYXJzZUludCIsIm9uU2V0TGF0Q29sdW1uIiwib25DaGVja1JlcGxhY2UiLCJjaGVja2VkIiwic2V0T3B0aW9ucyIsIm9wdGlvbnMiLCJuYW1lIiwibGVuZ3RoIiwiUFJPQ0VTU19MSVNUIiwidHlwZSIsIm9uU2V0TG5nQ29sdW1uIiwibWV0aG9kIiwiaW5jbHVkZXMiLCJPYmplY3QiLCJrZXlzIiwiQUREUkVTU19MRVZFTF9ESUNUIiwicHJlY2lzaW9uIiwidGVzdCIsImRhdGFJZCIsIkpPSU5fTUVUSE9EIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHQUEsbUJBQW1CLENBQUNDLElBQXBCLEdBQTJCLENBQ3pCQyw4QkFEeUIsRUFFekJDLHlCQUZ5QixFQUd6QkMsNkJBSHlCLENBSXpCO0FBSnlCLENBQTNCOztBQU9BLElBQU1DLGtCQUFrQixHQUFHQyw2QkFBT0MsR0FBVixnTUFBeEI7O0FBV0EsU0FBU1AsbUJBQVQsQ0FBNkJRLGtCQUE3QixFQUFnREMsYUFBaEQsRUFBK0Q7QUFDN0QsTUFBTUMsWUFBWSxnQkFBR0Msa0JBQU1DLElBQU4sQ0FDbkIsZ0JBQTJEO0FBQUEsUUFBekRDLFNBQXlELFFBQXpEQSxTQUF5RDtBQUFBLFFBQS9DQyxRQUErQyxRQUEvQ0EsUUFBK0M7QUFBQSxRQUFyQ0MsWUFBcUMsUUFBckNBLFlBQXFDO0FBQUEsUUFBeEJDLGtCQUF3QixRQUF4QkEsa0JBQXdCO0FBRXpEQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWjtBQUVBLFFBQU1DLFNBQVMsR0FBR0gsa0JBQWtCLENBQUMsSUFBRCxDQUFwQzs7QUFFQSxRQUFNSSxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUNDLEtBQUQsRUFBVztBQUN0Q0osTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlHLEtBQVo7QUFDQSxhQUFPTixZQUFZLENBQUMsUUFBRCxFQUFXTSxLQUFYLENBQW5CO0FBQXFDLEtBRnZDOztBQUlBLFFBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0QsS0FBRCxFQUFXO0FBQ2pDSixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWixFQUFxQ0csS0FBckM7QUFDQSxhQUFPTixZQUFZLENBQUMsTUFBRCxFQUFRTSxLQUFSLENBQW5CO0FBQ0QsS0FIRDs7QUFPQSxRQUFNRSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNGLEtBQUQsRUFBVztBQUNsQyxVQUFNRyxLQUFLLEdBQUdYLFNBQVMsQ0FBQ1csS0FBeEI7QUFDQUEsTUFBQUEsS0FBSyxDQUFDQyxHQUFOLEdBQVlKLEtBQVo7QUFDQU4sTUFBQUEsWUFBWSxDQUFDLE9BQUQsRUFBU1MsS0FBVCxDQUFaO0FBQ0QsS0FKRDs7QUFPQSxRQUFNRSwyQkFBMkIsR0FBRyxTQUE5QkEsMkJBQThCLENBQUNMLEtBQUQsRUFBVztBQUM3QyxVQUFNRyxLQUFLLEdBQUdYLFNBQVMsQ0FBQ1csS0FBeEI7QUFDQUEsTUFBQUEsS0FBSyxDQUFDRyxNQUFOLEdBQWVOLEtBQWY7QUFDQU4sTUFBQUEsWUFBWSxDQUFDLE9BQUQsRUFBU1MsS0FBVCxDQUFaO0FBQ0QsS0FKRDs7QUFNQSxRQUFNSSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLEdBQU07QUFDL0IsVUFBTUMsU0FBUyxHQUFHaEIsU0FBUyxDQUFDVyxLQUFWLENBQWdCTSxRQUFoQixHQUF5QmpCLFNBQVMsQ0FBQ1csS0FBVixDQUFnQk0sUUFBekMsR0FBa0RDLFNBQXBFOztBQUNBLFVBQUksQ0FBQ0YsU0FBTCxFQUFnQjtBQUNkLGVBQU8sRUFBUDtBQUNEOztBQUNELGFBQU8sd0JBQUlmLFFBQUosRUFBYyxDQUFFZSxTQUFGLEVBQWEsUUFBYixDQUFkLEVBQXNDLEVBQXRDLENBQVA7QUFDRCxLQU5EOztBQVFBLFFBQU1HLGlCQUFpQixHQUFDLFNBQWxCQSxpQkFBa0IsQ0FBQ1gsS0FBRCxFQUFTO0FBQy9CSixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFnQ0csS0FBaEM7QUFDQSxVQUFNRyxLQUFLLEdBQUdYLFNBQVMsQ0FBQ1csS0FBeEIsQ0FGK0IsQ0FHL0I7O0FBQ0FBLE1BQUFBLEtBQUssQ0FBQ1MsU0FBTixHQUFrQkMsaUNBQWlCQyxvQkFBRUMsTUFBRixDQUFTQyw4QkFBVCxFQUF3QmhCLEtBQXhCLENBQWpCLENBQWxCO0FBQ0FHLE1BQUFBLEtBQUssQ0FBQ2MsT0FBTixHQUFnQixLQUFoQjtBQUNBdkIsTUFBQUEsWUFBWSxDQUFDLFFBQUQsRUFBVU0sS0FBVixDQUFaO0FBQ0EsYUFBT04sWUFBWSxDQUFDLE9BQUQsRUFBU1MsS0FBVCxDQUFuQjtBQUNELEtBUkQ7O0FBVUEsUUFBTWUsd0JBQXdCLEdBQUMsU0FBekJBLHdCQUF5QixDQUFDbEIsS0FBRCxFQUFTO0FBQ3RDSixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFnQ0csS0FBaEM7QUFDQSxVQUFNRyxLQUFLLEdBQUdYLFNBQVMsQ0FBQ1csS0FBeEI7QUFDQUEsTUFBQUEsS0FBSyxDQUFDTSxRQUFOLEdBQWlCVCxLQUFqQjtBQUNBLGFBQU9OLFlBQVksQ0FBQyxPQUFELEVBQVNTLEtBQVQsQ0FBbkI7QUFDRCxLQUxEOztBQU9BLFFBQU1nQixtQkFBbUIsR0FBQyxTQUFwQkEsbUJBQW9CLENBQUNuQixLQUFELEVBQVM7QUFDakMsVUFBTUcsS0FBSyxHQUFHWCxTQUFTLENBQUNXLEtBQXhCOztBQUNBLFVBQUdpQixLQUFLLENBQUNDLE9BQU4sQ0FBY2xCLEtBQUssQ0FBQ21CLFNBQXBCLENBQUgsRUFBa0M7QUFDaENuQixRQUFBQSxLQUFLLENBQUNtQixTQUFOLENBQWdCLENBQWhCLElBQXFCdEIsS0FBckI7QUFDRCxPQUZELE1BRUs7QUFDSEcsUUFBQUEsS0FBSyxDQUFDbUIsU0FBTixHQUFtQnRCLEtBQW5CO0FBQ0Q7O0FBQ0QsYUFBT04sWUFBWSxDQUFDLE9BQUQsRUFBU1MsS0FBVCxDQUFuQjtBQUNELEtBUkQ7O0FBVUEsUUFBTW9CLHlCQUF5QixHQUFDLFNBQTFCQSx5QkFBMEIsQ0FBQ3ZCLEtBQUQsRUFBUztBQUN2QyxVQUFNRyxLQUFLLEdBQUdYLFNBQVMsQ0FBQ1csS0FBeEI7O0FBQ0EsVUFBR2lCLEtBQUssQ0FBQ0MsT0FBTixDQUFjbEIsS0FBSyxDQUFDbUIsU0FBcEIsQ0FBSCxFQUFrQztBQUNoQ25CLFFBQUFBLEtBQUssQ0FBQ21CLFNBQU4sQ0FBZ0IsQ0FBaEIsSUFBcUJ0QixLQUFyQjtBQUNELE9BRkQsTUFFSztBQUNIRyxRQUFBQSxLQUFLLENBQUNtQixTQUFOLEdBQWtCLENBQUNuQixLQUFLLENBQUNtQixTQUFQLEVBQWlCdEIsS0FBakIsQ0FBbEI7QUFDRDs7QUFDRCxhQUFPTixZQUFZLENBQUMsT0FBRCxFQUFTUyxLQUFULENBQW5CO0FBQ0QsS0FSRDs7QUFZQSxRQUFNcUIsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ3RCLFVBQU10QixLQUFLLEdBQUdYLFNBQVMsQ0FBQ1csS0FBeEI7QUFDQUEsTUFBQUEsS0FBSyxDQUFDLEtBQUQsQ0FBTCxHQUFlc0IsQ0FBQyxDQUFDQyxNQUFGLENBQVMxQixLQUF4QjtBQUNBLGFBQU9OLFlBQVksQ0FBQyxPQUFELEVBQVNTLEtBQVQsQ0FBbkI7QUFDRCxLQUpEOztBQU1BLFFBQU13QixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNGLENBQUQsRUFBTztBQUMzQixVQUFNdEIsS0FBSyxHQUFHWCxTQUFTLENBQUNXLEtBQXhCO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQyxXQUFELENBQUwsR0FBcUJzQixDQUFyQjtBQUNBLGFBQU8vQixZQUFZLENBQUMsT0FBRCxFQUFTUyxLQUFULENBQW5CO0FBQ0QsS0FKRDs7QUFNQSxRQUFNeUIsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDSCxDQUFELEVBQU87QUFFNUIsVUFBTXRCLEtBQUssR0FBR1gsU0FBUyxDQUFDVyxLQUF4QjtBQUNBQSxNQUFBQSxLQUFLLENBQUMsV0FBRCxDQUFMLEdBQXFCc0IsQ0FBQyxDQUFDQyxNQUFGLENBQVMxQixLQUE5QjtBQUNBLGFBQU9OLFlBQVksQ0FBQyxPQUFELEVBQVNTLEtBQVQsQ0FBbkI7QUFDRCxLQUxEOztBQU9BLFFBQU0wQixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDSixDQUFELEVBQU87QUFDeEIsVUFBTUssVUFBVSxHQUFHTCxDQUFDLENBQUNDLE1BQUYsQ0FBUzFCLEtBQTVCO0FBQ0EsVUFBTUcsS0FBSyxHQUFHWCxTQUFTLENBQUNXLEtBQXhCO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQzRCLEtBQU4sR0FBY0QsVUFBVSxDQUFDRSxLQUFYLENBQWlCLEdBQWpCLEVBQXNCQyxHQUF0QixDQUEwQixVQUFDQyxDQUFEO0FBQUEsZUFBS0MsVUFBVSxDQUFDRCxDQUFELENBQWY7QUFBQSxPQUExQixDQUFkO0FBQ0EsYUFBT3hDLFlBQVksQ0FBQyxPQUFELEVBQVNTLEtBQVQsQ0FBbkI7QUFDRCxLQUxEOztBQU9BLFFBQU1pQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNYLENBQUQsRUFBTztBQUM5QjdCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0EsVUFBTU0sS0FBSyxHQUFHWCxTQUFTLENBQUNXLEtBQXhCO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQ2tDLFdBQU4sR0FBb0JDLFFBQVEsQ0FBQ2IsQ0FBRCxDQUE1QjtBQUNBLGFBQU8vQixZQUFZLENBQUMsT0FBRCxFQUFTUyxLQUFULENBQW5CO0FBQ0QsS0FMRDs7QUFPQSxRQUFNb0MsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDZCxDQUFELEVBQU87QUFDNUIsVUFBTXRCLEtBQUssR0FBR1gsU0FBUyxDQUFDVyxLQUF4QjtBQUNBQSxNQUFBQSxLQUFLLENBQUMsV0FBRCxDQUFMLENBQW1CLENBQW5CLElBQXdCc0IsQ0FBQyxDQUFDQyxNQUFGLENBQVMxQixLQUFqQztBQUNBLGFBQU9OLFlBQVksQ0FBQyxPQUFELEVBQVNTLEtBQVQsQ0FBbkI7QUFDRCxLQUpEOztBQU1BLFFBQU1xQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNmLENBQUQsRUFBTztBQUM1QjdCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaO0FBQ0EsVUFBTU0sS0FBSyxHQUFHWCxTQUFTLENBQUNXLEtBQXhCO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQyxTQUFELENBQUwsR0FBbUJzQixDQUFDLENBQUNDLE1BQUYsQ0FBU2UsT0FBNUI7QUFDQSxhQUFPL0MsWUFBWSxDQUFDLE9BQUQsRUFBU1MsS0FBVCxDQUFuQjtBQUNELEtBTEQ7O0FBT0EsUUFBTXVDLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07QUFDdkI5QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsVUFBTThDLE9BQU8sR0FBR25ELFNBQVMsS0FBSzRCLEtBQUssQ0FBQ0MsT0FBTixDQUFjN0IsU0FBUyxDQUFDb0QsSUFBeEIsSUFBOEJwRCxTQUFTLENBQUNvRCxJQUFWLENBQWVDLE1BQWYsR0FBc0IsQ0FBcEQsR0FBc0RyRCxTQUFTLENBQUNvRCxJQUFyRSxDQUFULEdBQXFGRSw4QkFBYXRELFNBQVMsQ0FBQ29ELElBQVYsQ0FBZUcsSUFBNUIsSUFBa0NELDhCQUFhdEQsU0FBUyxDQUFDb0QsSUFBVixDQUFlRyxJQUE1QixDQUFsQyxHQUFvRSxFQUF6SixHQUE2SixFQUE3SztBQUNBLGFBQU9KLE9BQVA7QUFDRCxLQUpEOztBQU1BLFFBQU1LLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ3ZCLENBQUQsRUFBTztBQUM1QixVQUFNdEIsS0FBSyxHQUFHWCxTQUFTLENBQUNXLEtBQXhCO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQyxXQUFELENBQUwsQ0FBbUIsQ0FBbkIsSUFBd0JzQixDQUFDLENBQUNDLE1BQUYsQ0FBUzFCLEtBQWpDO0FBQ0EsYUFBT04sWUFBWSxDQUFDLE9BQUQsRUFBU1MsS0FBVCxDQUFuQjtBQUNELEtBSkQsQ0FqSXlELENBc0l6RDtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsd0JBQ0UsK0VBQ0UsZ0NBQUMsa0JBQUQ7QUFBb0IsTUFBQSxTQUFTLEVBQUM7QUFBOUIsb0JBQ0ksZ0NBQUMsYUFBRDtBQUNFLE1BQUEsVUFBVSxFQUFDLFdBRGIsQ0FFRTtBQUZGO0FBR0UsTUFBQSxNQUFNLEVBQUVMLFNBQVMsR0FBQ0EsU0FBRCxHQUFXLEVBSDlCO0FBSUUsTUFBQSxLQUFLLEVBQUVzQixLQUFLLENBQUNDLE9BQU4sQ0FBYzdCLFNBQVMsQ0FBQ29ELElBQXhCLElBQWdDcEQsU0FBUyxDQUFDb0QsSUFBVixDQUFlLENBQWYsQ0FBaEMsR0FBb0RwRCxTQUFTLENBQUNvRCxJQUp2RTtBQUtFLE1BQUEsUUFBUSxFQUFFLEtBTFo7QUFNRSxNQUFBLFFBQVEsRUFBRTNDO0FBTlosTUFESixlQVNJLDJDQVRKLGVBV0UsZ0NBQUMsYUFBRCxxQkFDRSxnQ0FBQyw4QkFBRDtBQUFrQixNQUFBLEVBQUUsRUFBQztBQUFyQixNQURGLENBWEYsZUFnQkUsZ0NBQUMsd0JBQUQ7QUFBYyxNQUFBLFFBQVEsRUFBRVUsaUJBQXhCO0FBQ2MsTUFBQSxPQUFPLEVBQUUrQixVQUFVLEVBRGpDO0FBRUcsTUFBQSxhQUFhLEVBQUVsRCxTQUFTLENBQUN5RCxNQUY1QjtBQUdHLE1BQUEsV0FBVyxFQUFFO0FBSGhCLE1BaEJGLEVBd0JHekQsU0FBUyxDQUFDeUQsTUFBVixLQUFxQnpELFNBQVMsQ0FBQ3lELE1BQVYsQ0FBaUJDLFFBQWpCLENBQTBCLFdBQTFCLEtBQTBDMUQsU0FBUyxDQUFDeUQsTUFBVixDQUFpQkMsUUFBakIsQ0FBMEIsUUFBMUIsQ0FBL0Qsa0JBQ0QsMERBQ0UsMkNBREYsZUFFYyxnQ0FBQyxRQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsVUFEUDtBQUVFLE1BQUEsU0FBUyxFQUFDLGtCQUZaO0FBR0UsTUFBQSxXQUFXLEVBQUMsbUNBSGQ7QUFJRSxNQUFBLEVBQUUsRUFBQyxjQUpMO0FBS0UsTUFBQSxRQUFRLEVBQUUxQjtBQUxaLE1BRmQsQ0F6QkYsRUF5Q0doQyxTQUFTLENBQUN5RCxNQUFWLEtBQXFCekQsU0FBUyxDQUFDeUQsTUFBVixDQUFpQkMsUUFBakIsQ0FBMEIsU0FBMUIsS0FBd0MxRCxTQUFTLENBQUN5RCxNQUFWLENBQWlCQyxRQUFqQixDQUEwQiwwQkFBMUIsQ0FBN0Qsa0JBQ0QsMERBQ0UsMkNBREYsZUFFRSxnQ0FBQyx3QkFBRDtBQUFjLE1BQUEsV0FBVyxFQUFFLGdDQUEzQjtBQUE2RCxNQUFBLE9BQU8sRUFBRUMsTUFBTSxDQUFDQyxJQUFQLENBQVlDLG1DQUFaLENBQXRFO0FBQXVHLE1BQUEsUUFBUSxFQUFFMUIsYUFBakg7QUFBaUksTUFBQSxhQUFhLEVBQUVuQyxTQUFTLENBQUNXLEtBQVYsQ0FBZ0JtRCxTQUFoSztBQUEySyxNQUFBLFdBQVcsRUFBRTtBQUF4TCxNQUZGLENBMUNGLEVBK0NHOUQsU0FBUyxDQUFDeUQsTUFBVixJQUFvQixDQUFDekQsU0FBUyxDQUFDeUQsTUFBVixDQUFpQkMsUUFBakIsQ0FBMEIsV0FBMUIsQ0FBckIsaUJBQ0QsMERBQ0UsZ0NBQUMsYUFBRCxxQkFDRSxnQ0FBQyw4QkFBRDtBQUFrQixNQUFBLEVBQUUsRUFBRSxrQkFBa0JLLElBQWxCLENBQXVCL0QsU0FBUyxDQUFDeUQsTUFBakMsSUFBeUMsd0JBQXpDLEdBQWtFO0FBQXhGLE1BREYsQ0FERixlQU1FLGdDQUFDLFFBQUQ7QUFBTyxNQUFBLEtBQUssRUFBRXpELFNBQVMsQ0FBQ1csS0FBVixDQUFnQlMsU0FBOUI7QUFBeUMsTUFBQSxRQUFRLEVBQUVnQjtBQUFuRCxNQU5GLENBaERGLEVBMERHcEMsU0FBUyxDQUFDeUQsTUFBVixJQUFvQnpELFNBQVMsQ0FBQ3lELE1BQVYsQ0FBaUJDLFFBQWpCLENBQTBCLFdBQTFCLENBQXBCLGlCQUNELDBEQUNFLGdDQUFDLGFBQUQscUJBQ0UsZ0NBQUMsOEJBQUQ7QUFBa0IsTUFBQSxFQUFFLEVBQUM7QUFBckIsTUFERixDQURGLGVBS0UsZ0NBQUMsUUFBRDtBQUFPLE1BQUEsV0FBVyxFQUFFckMsaUNBQWlCQyxvQkFBRUMsTUFBRixDQUFTQyw4QkFBVCxFQUF3QnhCLFNBQVMsQ0FBQ3lELE1BQWxDLENBQWpCLEVBQTRELENBQTVELENBQXBCO0FBQW9GLE1BQUEsUUFBUSxFQUFFVjtBQUE5RixNQUxGLGVBT0UsZ0NBQUMsYUFBRCxxQkFDRSxnQ0FBQyw4QkFBRDtBQUFrQixNQUFBLEVBQUUsRUFBQztBQUFyQixNQURGLENBUEYsZUFVRSxnQ0FBQyxRQUFEO0FBQU8sTUFBQSxXQUFXLEVBQUUxQixpQ0FBaUJDLG9CQUFFQyxNQUFGLENBQVNDLDhCQUFULEVBQXdCeEIsU0FBUyxDQUFDeUQsTUFBbEMsQ0FBakIsRUFBNEQsQ0FBNUQsQ0FBcEI7QUFBb0YsTUFBQSxRQUFRLEVBQUVEO0FBQTlGLE1BVkYsQ0EzREYsRUF3RUd4RCxTQUFTLENBQUN5RCxNQUFWLElBQW9CLENBQUN6RCxTQUFTLENBQUN5RCxNQUFWLENBQWlCQyxRQUFqQixDQUEwQixXQUExQixDQUFyQixpQkFDRCwwREFDRSxnQ0FBQyxhQUFELHFCQUNFLGdDQUFDLDhCQUFEO0FBQWtCLE1BQUEsRUFBRSxFQUFFLGtCQUFrQkssSUFBbEIsQ0FBdUIvRCxTQUFTLENBQUN5RCxNQUFqQyxJQUF5QyxxQkFBekMsR0FBK0Q7QUFBckYsTUFERixDQURGLGVBS0UsZ0NBQUMsV0FBRDtBQUNFLE1BQUEsT0FBTyxFQUFFekQsU0FBUyxDQUFDVyxLQUFWLENBQWdCYyxPQUFoQixHQUF3QnpCLFNBQVMsQ0FBQ1csS0FBVixDQUFnQmMsT0FBeEMsR0FBZ0QsS0FEM0Q7QUFFRSxNQUFBLEVBQUUsRUFBQyxjQUZMO0FBR0UsTUFBQSxRQUFRLEVBQUV1QjtBQUhaLE1BTEYsQ0F6RUYsRUFxRkdoRCxTQUFTLENBQUN5RCxNQUFWLElBQW9CekQsU0FBUyxDQUFDeUQsTUFBVixDQUFpQkMsUUFBakIsQ0FBMEIsT0FBMUIsQ0FBcEIsaUJBQ0QsMERBQ0UsZ0NBQUMsYUFBRCxxQkFDRSxnQ0FBQyw4QkFBRDtBQUFrQixNQUFBLEVBQUUsRUFBRTtBQUF0QixNQURGLENBREYsZUFJRSxnQ0FBQyxRQUFEO0FBQU8sTUFBQSxXQUFXLEVBQUUsK0NBQXBCO0FBQXFFLE1BQUEsUUFBUSxFQUFFckI7QUFBL0UsTUFKRixDQXRGRixFQTZGR3JDLFNBQVMsQ0FBQ3lELE1BQVYsSUFBb0J6RCxTQUFTLENBQUN5RCxNQUFWLENBQWlCQyxRQUFqQixDQUEwQixPQUExQixDQUFwQixpQkFDRCwwREFDRSxnQ0FBQyxhQUFELHFCQUNFLGdDQUFDLDhCQUFEO0FBQWtCLE1BQUEsRUFBRSxFQUFFO0FBQXRCLE1BREYsQ0FERixlQUlFLGdDQUFDLHdCQUFEO0FBQWMsTUFBQSxRQUFRLEVBQUVkLGdCQUF4QjtBQUNjLE1BQUEsT0FBTyxFQUFFLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxJQUFULEVBQWMsSUFBZCxFQUFtQixJQUFuQixFQUF3QixJQUF4QixDQUR2QjtBQUVjLE1BQUEsYUFBYSxFQUFFNUMsU0FBUyxDQUFDVyxLQUFWLENBQWdCa0MsV0FGN0M7QUFHYyxNQUFBLFdBQVcsRUFBRTtBQUgzQixNQUpGLENBOUZGLEVBNEdHYyxNQUFNLENBQUNDLElBQVAsQ0FBWTNELFFBQVosRUFBc0JvRCxNQUF0QixHQUErQixDQUEvQixpQkFDRCxnQ0FBQyxrQkFBRDtBQUNFLE1BQUEsVUFBVSxFQUFDLFdBRGI7QUFFRSxNQUFBLFFBQVEsRUFBRXBELFFBRlosQ0FHRTtBQUhGO0FBSUUsTUFBQSxNQUFNLEVBQUVELFNBQVMsR0FBQ0EsU0FBUyxDQUFDZ0UsTUFBWCxHQUFrQixFQUpyQztBQUtFLE1BQUEsUUFBUSxFQUFFekQ7QUFMWixNQTdHRixFQXFIR29ELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZM0QsUUFBWixFQUFzQm9ELE1BQXRCLEdBQStCLENBQS9CLElBQW9DckQsU0FBUyxDQUFDeUQsTUFBOUMsSUFBd0Qsa0JBQWtCTSxJQUFsQixDQUF1Qi9ELFNBQVMsQ0FBQ3lELE1BQWpDLENBQXhELGlCQUNDLDBEQUNFLGdDQUFDLG1CQUFELE9BREYsZUFFRSxnQ0FBQyxhQUFELHFCQUNFLGdDQUFDLDhCQUFEO0FBQWtCLE1BQUEsRUFBRSxFQUFDO0FBQXJCLE1BREYsQ0FGRixlQU1FLGdDQUFDLGFBQUQ7QUFDRSxNQUFBLFVBQVUsRUFBQyxXQURiO0FBRUUsTUFBQSxNQUFNLEVBQUUxQyxrQkFBa0IsS0FBR0Esa0JBQWtCLEVBQXJCLEdBQXdCLEVBRnBEO0FBR0UsTUFBQSxLQUFLLEVBQUVhLEtBQUssQ0FBQ0MsT0FBTixDQUFjN0IsU0FBUyxDQUFDVyxLQUFWLENBQWdCbUIsU0FBOUIsSUFBeUM5QixTQUFTLENBQUNXLEtBQVYsQ0FBZ0JtQixTQUFoQixDQUEwQixDQUExQixDQUF6QyxHQUF1RTlCLFNBQVMsQ0FBQ1csS0FBVixDQUFnQm1CLFNBQWhCLEdBQTBCOUIsU0FBUyxDQUFDVyxLQUFWLENBQWdCbUIsU0FBMUMsR0FBcUQsSUFIckk7QUFJRSxNQUFBLFFBQVEsRUFBRSxLQUpaO0FBS0UsTUFBQSxRQUFRLEVBQUVIO0FBTFosTUFORixFQWNHLGNBQWNvQyxJQUFkLENBQW1CL0QsU0FBUyxDQUFDeUQsTUFBN0Isa0JBQXdDLGdDQUFDLGFBQUQ7QUFDdkMsTUFBQSxVQUFVLEVBQUMsV0FENEI7QUFFdkMsTUFBQSxNQUFNLEVBQUUxQyxrQkFBa0IsS0FBR0Esa0JBQWtCLEVBQXJCLEdBQXdCLEVBRlg7QUFHdkMsTUFBQSxLQUFLLEVBQUVhLEtBQUssQ0FBQ0MsT0FBTixDQUFjN0IsU0FBUyxDQUFDVyxLQUFWLENBQWdCbUIsU0FBOUIsSUFBMEM5QixTQUFTLENBQUNXLEtBQVYsQ0FBZ0JtQixTQUFoQixDQUEwQixDQUExQixDQUExQyxHQUF3RSxJQUh4QztBQUl2QyxNQUFBLFFBQVEsRUFBRSxLQUo2QjtBQUt2QyxNQUFBLFFBQVEsRUFBRUM7QUFMNkIsTUFkM0MsZUFzQkUsZ0NBQUMsa0JBQUQ7QUFDRSxNQUFBLFVBQVUsRUFBQyxXQURiO0FBRUUsTUFBQSxRQUFRLEVBQUU5QixRQUZaLENBR0U7QUFIRjtBQUlFLE1BQUEsTUFBTSxFQUFHRCxTQUFTLElBQUlBLFNBQVMsQ0FBQ1csS0FBVixDQUFnQk0sUUFBOUIsR0FBd0NqQixTQUFTLENBQUNXLEtBQVYsQ0FBZ0JNLFFBQXhELEdBQWlFLEVBSjNFO0FBS0UsTUFBQSxRQUFRLEVBQUVTO0FBTFosTUF0QkYsRUE4QkcsVUFBVXFDLElBQVYsQ0FBZS9ELFNBQVMsQ0FBQ3lELE1BQXpCLEtBQW9DLENBQUMsY0FBY00sSUFBZCxDQUFtQi9ELFNBQVMsQ0FBQ3lELE1BQTdCLENBQXJDLGlCQUE2RSxnQ0FBQyx3QkFBRDtBQUFjLE1BQUEsUUFBUSxFQUFFL0MsZ0JBQXhCO0FBQ2hFLE1BQUEsT0FBTyxFQUFFaUQsTUFBTSxDQUFDQyxJQUFQLENBQVlLLDRCQUFaLENBRHVEO0FBRWhFLE1BQUEsYUFBYSxFQUFFakUsU0FBUyxDQUFDVyxLQUFWLENBQWdCQyxHQUFoQixHQUFvQlosU0FBUyxDQUFDVyxLQUFWLENBQWdCQyxHQUFwQyxHQUF3QyxPQUZTO0FBR2hFLE1BQUEsV0FBVyxFQUFFO0FBSG1ELE1BOUJoRixFQW9DRyxhQUFhbUQsSUFBYixDQUFrQi9ELFNBQVMsQ0FBQ3lELE1BQTVCLGtCQUNEO0FBQUcsTUFBQSxTQUFTLEVBQUMsa0JBQWI7QUFBZ0MsTUFBQSxNQUFNLEVBQUMsUUFBdkM7QUFDQSxNQUFBLEdBQUcsRUFBQyxxQkFESjtBQUMwQixNQUFBLElBQUksRUFBQyx5QkFEL0I7QUFFQSxvQkFBVztBQUZYLE1BckNGLENBdEhKLEVBbUtHLFlBQVlNLElBQVosQ0FBaUIvRCxTQUFTLENBQUN5RCxNQUEzQixrQkFBc0MsMERBQ3JDO0FBQUssTUFBQSxHQUFHLEVBQUMsNEZBQVQ7QUFBdUcsTUFBQSxHQUFHLEVBQUM7QUFBM0csTUFEcUMsQ0FuS3pDLENBREYsQ0FERjtBQStLRCxHQTNUa0IsQ0FBckI7O0FBNlRBNUQsRUFBQUEsWUFBWSxDQUFDcUUsV0FBYixHQUEyQixjQUEzQjtBQUNBOUQsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVo7QUFDQSxTQUFPUixZQUFQO0FBQ0Q7O2VBRWNWLG1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIEZJTFRFUl9UWVBFU30gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0JztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgU291cmNlRGF0YVNlbGVjdG9yRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvY29tbW9uL3NvdXJjZS1kYXRhLXNlbGVjdG9yJztcbmltcG9ydCBGaWVsZFBhbmVsV2l0aEZpZWxkU2VsZWN0RmFjdG9yeSBmcm9tICcuLi8uLi9maWx0ZXJzL2ZpbHRlci1wYW5lbHMvZmlsdGVyLXBhbmVsLXdpdGgtZmllbGQtc2VsZWN0JztcbmltcG9ydCBGaWVsZFNlbGVjdG9yRmFjdG9yeSBmcm9tICcuLi8uLi9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IEZpbHRlclBhbmVsSGVhZGVyRmFjdG9yeSBmcm9tICcuLi9maWx0ZXItcGFuZWwvZmlsdGVyLXBhbmVsLWhlYWRlcic7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3InO1xuaW1wb3J0IHtcbiAgQUREUkVTU19MRVZFTF9ESUNULFxuICBKT0lOX01FVEhPRCxcbiAgUFJPQ0VTU19JVEVNUyxcbiAgUFJPQ0VTU19MSVNULFxuICBTUEFUSUFMX0lOVEVSQUNUSU9OX01FVEhPRFxufSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge0lucHV0LCBQYW5lbExhYmVsLCBTaWRlUGFuZWxEaXZpZGVyLCBTaWRlUGFuZWxTZWN0aW9uLCBUZXh0QXJlYSxDaGVja2JveH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHtQUk9DRVNTX05FV19DT0xTfSBmcm9tICcuLi8uLi8uLi91dGlscy9wcm9jZXNzb3ItdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG5Qcm9jZXNzUGFuZWxGYWN0b3J5LmRlcHMgPSBbXG4gIFNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnksXG4gIEZpZWxkU2VsZWN0b3JGYWN0b3J5LFxuICBGaWx0ZXJQYW5lbEhlYWRlckZhY3RvcnlcbiAgLy8gTmV3UHJvY2Vzc1BhbmVsRmFjdG9yeVxuXTtcblxuY29uc3QgU3R5bGVkUHJvY2Vzc1BhbmVsID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xuXG4gIC5maWx0ZXItcGFuZWxfX2ZpbHRlciB7XG4gICAgbWFyZ2luLXRvcDogMjRweDtcbiAgfVxuYDtcblxuXG5cbmZ1bmN0aW9uIFByb2Nlc3NQYW5lbEZhY3RvcnkoU291cmNlRGF0YVNlbGVjdG9yLEZpZWxkU2VsZWN0b3IpIHtcbiAgY29uc3QgUHJvY2Vzc1BhbmVsID0gUmVhY3QubWVtbyhcbiAgICAoe3Byb2Nlc3NvcixkYXRhc2V0cywgc2V0UHJvY2Vzc29yLGFsbEF2YWlsYWJsZUZpZWxkc30pID0+IHtcblxuICAgICAgY29uc29sZS5sb2coJ3JlbmRlciBhbGwgYXZhaWxhYmxlIGZpZWxkcycpXG5cbiAgICAgIGNvbnN0IGFsbEZpZWxkcyA9IGFsbEF2YWlsYWJsZUZpZWxkcyh0cnVlKTtcblxuICAgICAgY29uc3Qgb25Tb3VyY2VEYXRhU2VsZWN0b3IgPSAodmFsdWUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2RhdGFJZCcsIHZhbHVlKX1cblxuICAgICAgY29uc3Qgb25GaWVsZFNlbGVjdG9yID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzIGZpZWxkIHNlbGVjdGVkJyx2YWx1ZSlcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignbmFtZScsdmFsdWUpXG4gICAgICB9XG5cblxuXG4gICAgICBjb25zdCBvbkpvaW5UeXBlU2VsZWN0ID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzLmhvdyA9IHZhbHVlXG4gICAgICAgIHNldFByb2Nlc3NvcignYXR0cnMnLGF0dHJzKVxuICAgICAgfVxuXG5cbiAgICAgIGNvbnN0IG9uU3BhdGlhbEludGVyYWN0VHlwZVNlbGVjdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICBhdHRycy5zaW50ZXIgPSB2YWx1ZVxuICAgICAgICBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cblxuICAgICAgY29uc3Qgam9pbkZpZWxkc1NlbGVjdG9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhc2V0SWQgPSBwcm9jZXNzb3IuYXR0cnMuam9pbkRhdGE/cHJvY2Vzc29yLmF0dHJzLmpvaW5EYXRhOnVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFkYXRhc2V0SWQpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldChkYXRhc2V0cywgWyBkYXRhc2V0SWQsICdmaWVsZHMnXSwgW10pO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25Qcm9jZXNzU2VsZWN0b3I9KHZhbHVlKT0+e1xuICAgICAgICBjb25zb2xlLmxvZygncHJvY2Vzc29yU2VsZWN0b3InLHZhbHVlKVxuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICAvLyBjb25zdCBhdHRycyA9IHt9XG4gICAgICAgIGF0dHJzLm91dENvbHVtbiA9IFBST0NFU1NfTkVXX0NPTFNbXy5pbnZlcnQoUFJPQ0VTU19JVEVNUylbdmFsdWVdXVxuICAgICAgICBhdHRycy5yZXBsYWNlID0gZmFsc2VcbiAgICAgICAgc2V0UHJvY2Vzc29yKCdtZXRob2QnLHZhbHVlKVxuICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdhdHRycycsYXR0cnMpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9uSm9pblNvdXJjZURhdGFTZWxlY3Rvcj0odmFsdWUpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzb3JTZWxlY3RvcicsdmFsdWUpXG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzLmpvaW5EYXRhID0gdmFsdWVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYXR0cnMnLGF0dHJzKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvbkpvaW5GaWVsZFNlbGVjdG9yPSh2YWx1ZSk9PntcbiAgICAgICAgY29uc3QgYXR0cnMgPSBwcm9jZXNzb3IuYXR0cnNcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShhdHRycy5qb2luRmllbGQpKXtcbiAgICAgICAgICBhdHRycy5qb2luRmllbGRbMF0gPSB2YWx1ZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBhdHRycy5qb2luRmllbGQgID0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdhdHRycycsYXR0cnMpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9uU2Vjb25kSm9pbkZpZWxkU2VsZWN0b3I9KHZhbHVlKT0+e1xuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGF0dHJzLmpvaW5GaWVsZCkpe1xuICAgICAgICAgIGF0dHJzLmpvaW5GaWVsZFsxXSA9IHZhbHVlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGF0dHJzLmpvaW5GaWVsZCA9IFthdHRycy5qb2luRmllbGQsdmFsdWVdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYXR0cnMnLGF0dHJzKVxuICAgICAgfVxuXG5cblxuICAgICAgY29uc3Qgb25BZGRBUEkgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICBhdHRyc1sna2V5J10gPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdhdHRycycsYXR0cnMpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9uU2V0UHJlY2lzb24gPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICBhdHRyc1sncHJlY2lzaW9uJ10gPSBlXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb25TZXRPdXRDb2x1bW4gPSAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzWydvdXRDb2x1bW4nXSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb25TZXREaWdpdCA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpZ2l0VmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICBhdHRycy5kaWdpdCA9IGRpZ2l0VmFsdWUuc3BsaXQoJywnKS5tYXAoKHgpPT5wYXJzZUZsb2F0KHgpKVxuICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdhdHRycycsYXR0cnMpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9uQ2hhbmdlRmxvb3JJbnQgPSAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIGZsb29yIGludCcpXG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzLm1pbnV0ZV91bml0ID0gcGFyc2VJbnQoZSlcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYXR0cnMnLGF0dHJzKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvblNldExhdENvbHVtbiA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzWydvdXRDb2x1bW4nXVswXSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb25DaGVja1JlcGxhY2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2sgcmVwbGFjZSBleGFtcGxlJyk7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzWydyZXBsYWNlJ10gPSBlLnRhcmdldC5jaGVja2VkXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2V0T3B0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCBvcHRpb25zJylcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHByb2Nlc3NvciAmJiAoQXJyYXkuaXNBcnJheShwcm9jZXNzb3IubmFtZSk/cHJvY2Vzc29yLm5hbWUubGVuZ3RoPjA6cHJvY2Vzc29yLm5hbWUpPyhQUk9DRVNTX0xJU1RbcHJvY2Vzc29yLm5hbWUudHlwZV0/UFJPQ0VTU19MSVNUW3Byb2Nlc3Nvci5uYW1lLnR5cGVdOltdKTpbXVxuICAgICAgICByZXR1cm4gb3B0aW9uc1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvblNldExuZ0NvbHVtbiA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvY2Vzc29yLmF0dHJzXG4gICAgICAgIGF0dHJzWydvdXRDb2x1bW4nXVsxXSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cbiAgICAgIC8vIGNvbnN0IG9uU291cmNlRGF0YVNlbGVjdG9yID0gdXNlQ2FsbGJhY2sodmFsdWUgPT4gc2V0RmlsdGVyKHBhcnNlSW50KGlkeCksICdkYXRhSWQnLCB2YWx1ZSksIFtcbiAgICAgIC8vICAgaWR4LFxuICAgICAgLy8gICBzZXRGaWx0ZXJcbiAgICAgIC8vIF0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxTdHlsZWRQcm9jZXNzUGFuZWwgY2xhc3NOYW1lPVwiZmlsdGVyLXBhbmVsXCI+XG4gICAgICAgICAgICAgIDxGaWVsZFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgaW5wdXRUaGVtZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgLy8gc3VnZ2VzdGVkPXthbGxGaWVsZHM/YWxsRmllbGRzLnN1Z2dlc3RlZDpbXX1cbiAgICAgICAgICAgICAgICBmaWVsZHM9e2FsbEZpZWxkcz9hbGxGaWVsZHM6W119XG4gICAgICAgICAgICAgICAgdmFsdWU9e0FycmF5LmlzQXJyYXkocHJvY2Vzc29yLm5hbWUpID8gcHJvY2Vzc29yLm5hbWVbMF0gOiBwcm9jZXNzb3IubmFtZX1cbiAgICAgICAgICAgICAgICBlcmFzYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uRmllbGRTZWxlY3Rvcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJyLz5cblxuICAgICAgICAgICAgPFBhbmVsTGFiZWw+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicHJvY2Vzc29yLmNob29zZXByb1wiIC8+XG4gICAgICAgICAgICA8L1BhbmVsTGFiZWw+XG5cblxuICAgICAgICAgICAgPEl0ZW1TZWxlY3RvciBvbkNoYW5nZT17b25Qcm9jZXNzU2VsZWN0b3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NldE9wdGlvbnMoKX1cbiAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3Byb2Nlc3Nvci5tZXRob2R9XG4gICAgICAgICAgICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG5cblxuICAgICAgICAgICAgey8qICB0aGlzIGlucHV0IGlzIGZvciBhcGkga2V5ICovfVxuICAgICAgICAgICAge3Byb2Nlc3Nvci5tZXRob2QgJiYgKHByb2Nlc3Nvci5tZXRob2QuaW5jbHVkZXMoJ0dlb0NvZGluZycpIHx8IHByb2Nlc3Nvci5tZXRob2QuaW5jbHVkZXMoJ0dvb2dsZScpKSAmJlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0eXBlYWhlYWRfX2lucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInBsZWFzZSBpbnB1dCB5b3VyIEdvb2dsZSBBUEkgaGVyZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJhcGlrZXktaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkFkZEFQSX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgIHtwcm9jZXNzb3IubWV0aG9kICYmIChwcm9jZXNzb3IubWV0aG9kLmluY2x1ZGVzKCdhZGRyZXNzJykgfHwgcHJvY2Vzc29yLm1ldGhvZC5pbmNsdWRlcygnR29vZ2xlIEFQSSBRdWVyeSB3aXRoIGlkJykpICYmXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICA8SXRlbVNlbGVjdG9yIHBsYWNlaG9sZGVyPXsnU2VsZWN0IHRoZSBxdWVyeSBhZGRyZXNzIGxldmVsJ30gb3B0aW9ucz17T2JqZWN0LmtleXMoQUREUkVTU19MRVZFTF9ESUNUKX0gb25DaGFuZ2U9e29uU2V0UHJlY2lzb259ICBzZWxlY3RlZEl0ZW1zPXtwcm9jZXNzb3IuYXR0cnMucHJlY2lzaW9ufSBtdWx0aVNlbGVjdD17ZmFsc2V9Lz5cbiAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAge3Byb2Nlc3Nvci5tZXRob2QgJiYgIXByb2Nlc3Nvci5tZXRob2QuaW5jbHVkZXMoJ0dlb0NvZGluZycpICYmXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17L1tKal1vaW58W01tXWFzay8udGVzdChwcm9jZXNzb3IubWV0aG9kKT9cInByb2Nlc3Nvci5vdXRUYWJsZU5hbWVcIjpcInByb2Nlc3Nvci5vdXRDb2x1bW5OYW1lXCJ9IC8+XG4gICAgICAgICAgICAgIDwvUGFuZWxMYWJlbD5cblxuICAgICAgICAgICAgICB7Lyo8SW5wdXQgcGxhY2Vob2xkZXI9e18uaW52ZXJ0KFBST0NFU1NfTkVXX0NPTFMpW3Byb2Nlc3Nvci5tZXRob2RdfT48L0lucHV0PiovfVxuICAgICAgICAgICAgICA8SW5wdXQgdmFsdWU9e3Byb2Nlc3Nvci5hdHRycy5vdXRDb2x1bW59IG9uQ2hhbmdlPXtvblNldE91dENvbHVtbn0+PC9JbnB1dD5cbiAgICAgICAgICAgIDwvZGl2Pn1cblxuXG4gICAgICAgICAgICB7cHJvY2Vzc29yLm1ldGhvZCAmJiBwcm9jZXNzb3IubWV0aG9kLmluY2x1ZGVzKCdHZW9Db2RpbmcnKSAmJlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFBhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwcm9jZXNzb3Iub3V0bGF0XCIgLz5cbiAgICAgICAgICAgICAgPC9QYW5lbExhYmVsPlxuICAgICAgICAgICAgICB7Lyo8SW5wdXQgcGxhY2Vob2xkZXI9e18uaW52ZXJ0KFBST0NFU1NfTkVXX0NPTFMpW3Byb2Nlc3Nvci5tZXRob2RdfT48L0lucHV0PiovfVxuICAgICAgICAgICAgICA8SW5wdXQgcGxhY2Vob2xkZXI9e1BST0NFU1NfTkVXX0NPTFNbXy5pbnZlcnQoUFJPQ0VTU19JVEVNUylbcHJvY2Vzc29yLm1ldGhvZF1dWzBdfSBvbkNoYW5nZT17b25TZXRMYXRDb2x1bW59PjwvSW5wdXQ+XG5cbiAgICAgICAgICAgICAgPFBhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwcm9jZXNzb3Iub3V0bG5nXCIgLz5cbiAgICAgICAgICAgICAgPC9QYW5lbExhYmVsPlxuICAgICAgICAgICAgICA8SW5wdXQgcGxhY2Vob2xkZXI9e1BST0NFU1NfTkVXX0NPTFNbXy5pbnZlcnQoUFJPQ0VTU19JVEVNUylbcHJvY2Vzc29yLm1ldGhvZF1dWzFdfSBvbkNoYW5nZT17b25TZXRMbmdDb2x1bW59PjwvSW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj59XG5cbiAgICAgICAgICAgIHtwcm9jZXNzb3IubWV0aG9kICYmICFwcm9jZXNzb3IubWV0aG9kLmluY2x1ZGVzKCdHZW9Db2RpbmcnKSAmJlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFBhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9ey9bSmpdb2lufFtNbV1hc2svLnRlc3QocHJvY2Vzc29yLm1ldGhvZCk/XCJwcm9jZXNzb3IucmVwbGFjZURzXCI6XCJwcm9jZXNzb3IucmVwbGFjZUNvbFwifSAvPlxuICAgICAgICAgICAgICA8L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgIHsvKjxJbnB1dCBwbGFjZWhvbGRlcj17Xy5pbnZlcnQoUFJPQ0VTU19ORVdfQ09MUylbcHJvY2Vzc29yLm1ldGhvZF19PjwvSW5wdXQ+Ki99XG4gICAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3Byb2Nlc3Nvci5hdHRycy5yZXBsYWNlP3Byb2Nlc3Nvci5hdHRycy5yZXBsYWNlOmZhbHNlfVxuICAgICAgICAgICAgICAgIGlkPVwiY3VzdG9tLXRoZW1lXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGVja1JlcGxhY2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj59XG5cbiAgICAgICAgICAgIHtwcm9jZXNzb3IubWV0aG9kICYmIHByb2Nlc3Nvci5tZXRob2QuaW5jbHVkZXMoJ2RpZ2l0JykgJiZcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxQYW5lbExhYmVsPlxuICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5zbGljZVwifSAvPlxuICAgICAgICAgICAgICA8L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgIDxJbnB1dCBwbGFjZWhvbGRlcj17J3NldCB0aGUgZGlnaXQgdG8gc2xpY2UsaW5wdXQgYXJyYXkgb3IgaW50LGludCd9IG9uQ2hhbmdlPXtvblNldERpZ2l0fT48L0lucHV0PlxuICAgICAgICAgICAgPC9kaXY+fVxuXG4gICAgICAgICAgICB7cHJvY2Vzc29yLm1ldGhvZCAmJiBwcm9jZXNzb3IubWV0aG9kLmluY2x1ZGVzKCdmbG9vcicpICYmXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17XCJwcm9jZXNzb3IuZmxvb3JcIn0gLz5cbiAgICAgICAgICAgICAgPC9QYW5lbExhYmVsPlxuICAgICAgICAgICAgICA8SXRlbVNlbGVjdG9yIG9uQ2hhbmdlPXtvbkNoYW5nZUZsb29ySW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1snMScsJzUnLCcxMCcsJzE1JywnMjAnLCczMCddfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3Byb2Nlc3Nvci5hdHRycy5taW51dGVfdW5pdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgey8qe3Byb2Nlc3Nvci5tZXRob2QgJiYgKHByb2Nlc3Nvci5tZXRob2QuaW5jbHVkZXMoJ2FkZHJlc3MnKSl9Ki99XG5cbiAgICAgICAgICAgIHtPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICA8U291cmNlRGF0YVNlbGVjdG9yXG4gICAgICAgICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIC8vIGRhdGFJZD17ZmlsdGVyLmRhdGFJZH1cbiAgICAgICAgICAgICAgZGF0YUlkPXtwcm9jZXNzb3I/cHJvY2Vzc29yLmRhdGFJZDpbXX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU291cmNlRGF0YVNlbGVjdG9yfVxuICAgICAgICAgICAgLz4pfVxuXG4gICAgICAgICAgICB7T2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aCA+IDEgJiYgcHJvY2Vzc29yLm1ldGhvZCAmJiAvbWFza2luZ3xbSmpdb2luLy50ZXN0KHByb2Nlc3Nvci5tZXRob2QpICYmIChcbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8U2lkZVBhbmVsRGl2aWRlciAvPlxuICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPlxuICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwcm9jZXNzb3Iuam9pbmluZm9cIiAvPlxuICAgICAgICAgICAgICAgIDwvUGFuZWxMYWJlbD5cblxuICAgICAgICAgICAgICAgIDxGaWVsZFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgIGZpZWxkcz17am9pbkZpZWxkc1NlbGVjdG9yKCk/am9pbkZpZWxkc1NlbGVjdG9yKCk6W119XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17QXJyYXkuaXNBcnJheShwcm9jZXNzb3IuYXR0cnMuam9pbkZpZWxkKT9wcm9jZXNzb3IuYXR0cnMuam9pbkZpZWxkWzBdOihwcm9jZXNzb3IuYXR0cnMuam9pbkZpZWxkP3Byb2Nlc3Nvci5hdHRycy5qb2luRmllbGQ6IG51bGwpfVxuICAgICAgICAgICAgICAgICAgZXJhc2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uSm9pbkZpZWxkU2VsZWN0b3J9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIHsvW3RUXWltZXNwYW4vLnRlc3QocHJvY2Vzc29yLm1ldGhvZCkgJiYgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgZmllbGRzPXtqb2luRmllbGRzU2VsZWN0b3IoKT9qb2luRmllbGRzU2VsZWN0b3IoKTpbXX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtBcnJheS5pc0FycmF5KHByb2Nlc3Nvci5hdHRycy5qb2luRmllbGQpPyBwcm9jZXNzb3IuYXR0cnMuam9pbkZpZWxkWzFdOiBudWxsfVxuICAgICAgICAgICAgICAgICAgZXJhc2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2Vjb25kSm9pbkZpZWxkU2VsZWN0b3J9XG4gICAgICAgICAgICAgICAgLz59XG5cbiAgICAgICAgICAgICAgICA8U291cmNlRGF0YVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICAgIC8vIGRhdGFJZD17ZmlsdGVyLmRhdGFJZH1cbiAgICAgICAgICAgICAgICAgIGRhdGFJZD17KHByb2Nlc3NvciAmJiBwcm9jZXNzb3IuYXR0cnMuam9pbkRhdGEpP3Byb2Nlc3Nvci5hdHRycy5qb2luRGF0YTpbXX1cbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvbkpvaW5Tb3VyY2VEYXRhU2VsZWN0b3J9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIHsvW0pqXW9pbi8udGVzdChwcm9jZXNzb3IubWV0aG9kKSAmJiAhL1t0VF1pbWVzcGFuLy50ZXN0KHByb2Nlc3Nvci5tZXRob2QpICYmIDxJdGVtU2VsZWN0b3Igb25DaGFuZ2U9e29uSm9pblR5cGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtPYmplY3Qua2V5cyhKT0lOX01FVEhPRCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtwcm9jZXNzb3IuYXR0cnMuaG93P3Byb2Nlc3Nvci5hdHRycy5ob3c6J2lubmVyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAvPn1cblxuICAgICAgICAgICAgICAgIHsvW1NzXXBhdGlhbC8udGVzdChwcm9jZXNzb3IubWV0aG9kKSAmJlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImdvb2dsZS1jdHJsLWxvZ29cIiB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJNYXBib3ggbG9nb1wiLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7L1tHZ11vb2dsZS8udGVzdChwcm9jZXNzb3IubWV0aG9kKSAmJiA8ZGl2PlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9pbWFnZXMvcG93ZXJlZF9ieV9nb29nbGVfb25fbm9uX3doaXRlLnBuZ1wiICBhbHQ9XCJnb29nbGVcIi8+XG4gICAgICAgICAgICA8L2Rpdj59XG5cblxuXG5cbiAgICAgICAgICA8L1N0eWxlZFByb2Nlc3NQYW5lbD5cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgIH1cbiAgKTtcbiAgUHJvY2Vzc1BhbmVsLmRpc3BsYXlOYW1lID0gJ1Byb2Nlc3NQYW5lbCc7XG4gIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgcmVhY3QgcGFuZWwnKTtcbiAgcmV0dXJuIFByb2Nlc3NQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc1BhbmVsRmFjdG9yeTtcblxuXG5cblxuIl19