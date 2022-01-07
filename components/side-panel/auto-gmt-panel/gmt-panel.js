"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledMessageText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sourceDataSelector = _interopRequireDefault(require("../common/source-data-selector"));

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

var _filterPanelHeader = _interopRequireDefault(require("../filter-panel/filter-panel-header"));

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _defaultSettings = require("../../../constants/default-settings");

var _ = require("../..");

var _localization = require("../../../localization");

var _processorUtils = require("../../../utils/processor-utils");

var _filterUtils = require("../../../utils/filter-utils");

var _datasetExtensionUtils = require("../../../utils/dataset-extension-utils");

var _datePicker = _interopRequireDefault(require("../../common/date-picker"));

var _dropdownTreeSelector = _interopRequireDefault(require("../../common/dropdown-tree-selector"));

var _actions = require("../../../../examples/demo-app/src/actions");

var _dataProcessor = require("../../../processors/data-processor");

var _templateObject, _templateObject2;

GMTPanelFactory.deps = [_sourceDataSelector["default"], _fieldSelector["default"], _filterPanelHeader["default"]];

var StyledGMTPanel = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n"])));

var StyledMessageText = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 12px;\n  color:red;\n"])));

exports.StyledMessageText = StyledMessageText;

function GMTPanelFactory(SourceDataSelector, FieldSelector) {
  var GMTPanel = /*#__PURE__*/_react["default"].memo(function (_ref) {
    var processor = _ref.processor,
        datasets = _ref.datasets,
        setProcessor = _ref.setProcessor,
        allAvailableFields = _ref.allAvailableFields,
        visStateActions = _ref.visStateActions;

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

    var setDowProcessFilter = function setDowProcessFilter(e) {
      console.log('add dow filter');
      var batch = processor.batch;
      batch.temporalFilter.dow = e;
      return setProcessor('batch', batch);
    };

    var onLoadGeometryFilter = function onLoadGeometryFilter(e) {
      var batch = processor.batch;
      console.log('load remote map');

      if (datasets['filter']) {
        visStateActions.removeDataset('filter');
      }

      var dataset = {
        info: {
          id: 'filter',
          label: 'Filter Data'
        },
        data: (0, _dataProcessor.processGeojson)(_defaultSettings.GEOMETRY_RANGE[e])
      };
      visStateActions.updateVisData(dataset);
      batch.spatialFilter.geometryFilter = e;
      return setProcessor('batch', batch);
    };

    var onAddTemporalFilter = function onAddTemporalFilter(e) {
      console.log('add temporal filter');
      var batch = processor.batch;
      batch.temporalFilter = batch.temporalFilter ? null : _processorUtils.DEFAULT_TEMPORAL_PROCESSOR_STRUCTURE;

      if (batch.temporalFilter) {
        if (batch.oddataID) {
          // datasets[filter_dataset].
          var minmax_startdate = (0, _datasetExtensionUtils.get_minmax_by_col_name)(datasets[batch.oddataID], 'activitySegment_duration_startDate');
          var minmax_enddate = (0, _datasetExtensionUtils.get_minmax_by_col_name)(datasets[batch.oddataID], 'activitySegment_duration_endDate');
          batch.temporalFilter.dateRange = [minmax_startdate[0], minmax_enddate[1]];
        } else if (batch.gpsdataID) {
          batch.temporalFilter.dateRange = (0, _datasetExtensionUtils.get_minmax_by_col_name)(datasets[batch.gpsdataID], 'timestamp');
        }
      }

      return setProcessor('batch', batch);
    };

    var onAddSpatialFilter = function onAddSpatialFilter(e) {
      console.log('add spatial filter');
      var batch = processor.batch;
      batch.spatialFilter = batch.spatialFilter ? null : _processorUtils.DEFAULT_SPATIAL_PROCESSOR_STRUCTURE;
      return setProcessor('batch', batch);
    };

    var filterDatasetById = function filterDatasetById(datasets, dataset_type) {
      console.log('filter dataset');
      var target_dataset = Object.keys(datasets).filter(function (x) {
        return datasets[x].label == dataset_type;
      });
      return target_dataset.length > 0 ? target_dataset[0] : null;
    };

    var checkDataset = function checkDataset() {
      console.log('check dataset');
      var out_files = [];
      var filter_info = [['activity information', 'oddataID'], ['visited place information', 'poidataID'], ['GMT raw gps data', 'gpsdataID']];
      var batch = processor.batch;
      filter_info.map(function (x) {
        var filtered_dataset = filterDatasetById(datasets, x[0]);

        if (filtered_dataset) {
          batch[x[1]] = filtered_dataset;
          out_files = out_files.concat(_defaultSettings.EXPORT_FILE_LIST[x[0]]);
        }
      });
      batch.exportSetting.outData = out_files;
      batch.exportSetting.outDataFinal = out_files;
      batch.dbchecked = true;
      return setProcessor('batch', batch);
    }; //here better to use remo:
    // const FilterDataset = (datasets,dataset_type) => {
    //   console.log('filter dataset')
    //
    //   const batch = processor.batch
    //
    //   const target_dataset = Object.keys(datasets).filter((x)=>datasets[x].label==dataset_type)
    //   if(target_dataset.length>=0){
    //     switch(dataset_type){
    //       case 'activity information':
    //         batch.oddataset=target_dataset[0];
    //         setProcessor('batch',batch);
    //         break;
    //       case 'visited place information':
    //         batch.poidataset=target_dataset[0];
    //         setProcessor('batch',batch);
    //         break;
    //     }
    //   }
    //   return target_dataset
    // }
    // const onSourceDataSelector = useCallback(value => setFilter(parseInt(idx), 'dataId', value), [
    //   idx,
    //   setFilter
    // ]);
    // function getODdataset() {
    //   console.log('batch info');
    //   return batchInfo.oddataset
    // }


    var setStartTimeFilter = function setStartTimeFilter(e) {
      var batch = processor.batch;
      batch.temporalFilter.startTime = e;
      return setProcessor('batch', batch);
    };

    var setEndTimeFilter = function setEndTimeFilter(e) {
      var batch = processor.batch;
      batch.temporalFilter.endTime = e;
      return setProcessor('batch', batch);
    };

    function onChangePOIType() {
      var batch = processor.batch;
      batch.spatialFilter.poiType = !batch.spatialFilter.poiType;
      return setProcessor('batch', batch);
    }

    function onChangeCoordsModify() {
      var batch = processor.batch;
      batch.spatialFilter.coordsModify = !batch.spatialFilter.coordsModify;
      return setProcessor('batch', batch);
    }

    function onChangeHoliday() {
      var batch = processor.batch;
      batch.temporalFilter.removeHoliday = !batch.temporalFilter.removeHoliday;
      return setProcessor('batch', batch);
    }

    var onAddAPI = function onAddAPI(e) {
      var batch = processor.batch;
      batch.apikey = e.target.value;
      return setProcessor('batch', batch);
    };

    var setDateRange = function setDateRange(dateArray) {
      console.log('set date range');
      var batch = processor.batch;
      batch.temporalFilter.dateRange = dateArray;
      return setProcessor('batch', batch);
    };

    var onSetPrecison = function onSetPrecison(e) {
      var batch = processor.batch;
      batch.spatialFilter.level = e;
      return setProcessor('batch', batch);
    };

    var onSetOutFiles = function onSetOutFiles(e) {
      var batch = processor.batch;
      batch.exportSetting.outDataFinal = e;
      return setProcessor('batch', batch);
    };

    function onChangeHeader() {
      var batch = processor.batch;
      batch.exportSetting.header = !batch.exportSetting.header;
      return setProcessor('batch', batch);
    }

    function onChangeFloorInt(e) {
      var batch = processor.batch;
      batch.temporalFilter.floor = parseInt(e);
      return setProcessor('batch', batch);
    }

    function onFilterPrefecture(e) {
      var batch = processor.batch;
      batch.spatialFilter.prefFilter = e;
      return setProcessor('batch', batch);
    }

    function onSetOutColumns(e) {
      var batch = processor.batch;
      batch.exportSetting.outColumns = e;
      return setProcessor('batch', batch);
    }

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(StyledGMTPanel, {
      className: "filter-panel"
    }, /*#__PURE__*/_react["default"].createElement("div", null, processor.batch && processor.batch.dbchecked && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.poidataset"
    })), /*#__PURE__*/_react["default"].createElement(_.Input, {
      value: processor.batch.poidataID ? datasets[processor.batch.poidataID].label : null,
      readonly: true
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.oddataset"
    })), /*#__PURE__*/_react["default"].createElement(_.Input, {
      value: processor.batch.oddataID ? datasets[processor.batch.oddataID].label : null,
      readonly: true
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.gpsdataset"
    })), /*#__PURE__*/_react["default"].createElement(_.Input, {
      value: processor.batch.gpsdataID ? datasets[processor.batch.gpsdataID].label : null,
      readonly: true
    }), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_.Button, {
      className: "add-processor-button" // inactive={hadEmptyProcessor || !hadDataset}
      ,
      width: "105px",
      onClick: checkDataset
    }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: processor.batch.dbchecked ? 'Recheck data' : 'Check data'
    })), !processor.batch.dbchecked && /*#__PURE__*/_react["default"].createElement(StyledMessageText, null, "Please first check data integrity")), /*#__PURE__*/_react["default"].createElement(_.SidePanelDivider, null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.addTemporalFilter"
    }), /*#__PURE__*/_react["default"].createElement(_.Checkbox, {
      checked: !processor.batch ? false : !!processor.batch.temporalFilter,
      id: "temporal-check",
      disabled: !processor.batch.dbchecked,
      onChange: onAddTemporalFilter
    })), /*#__PURE__*/_react["default"].createElement("br", null), processor.batch.temporalFilter && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.setDow"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      options: _filterUtils.DOW_LIST,
      selectedItems: processor.batch.temporalFilter ? processor.batch.temporalFilter.dow ? processor.batch.temporalFilter.dow : _filterUtils.DOW_LIST : _filterUtils.DOW_LIST,
      onChange: setDowProcessFilter
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.setStartDate"
    })), /*#__PURE__*/_react["default"].createElement(_datePicker["default"], {
      "class": "typeahead__input",
      domain: processor.batch.temporalFilter.dateRange,
      setDateRange: setDateRange
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.removeHoliday"
    })), /*#__PURE__*/_react["default"].createElement(_.Checkbox, {
      checked: processor.batch ? processor.batch.temporalFilter.removeHoliday : false,
      id: "holiday-remove",
      onChange: onChangeHoliday
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.floor"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      onChange: onChangeFloorInt,
      options: ['1', '5', '10', '15', '20', '30'],
      selectedItems: processor.batch.temporalFilter.floor,
      multiSelect: false
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.startTime"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      onChange: setStartTimeFilter,
      options: _defaultSettings.TIME_LIST,
      selectedItems: processor.batch.temporalFilter.startTime,
      multiSelect: false
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.endTime"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      onChange: setEndTimeFilter,
      options: _defaultSettings.TIME_LIST,
      selectedItems: processor.batch.temporalFilter.endTime,
      multiSelect: false
    })), /*#__PURE__*/_react["default"].createElement(_.SidePanelDivider, null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.addSpatialFilter"
    }), /*#__PURE__*/_react["default"].createElement(_.Checkbox, {
      checked: !processor.batch ? false : !!processor.batch.spatialFilter,
      id: "spatial-check",
      onChange: onAddSpatialFilter,
      disabled: !processor.batch.dbchecked
    })), processor.batch.spatialFilter && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.addPOIConverter"
    })), /*#__PURE__*/_react["default"].createElement(_.Checkbox, {
      checked: processor.batch ? processor.batch.spatialFilter.poiType : false,
      id: "custom-theme",
      onChange: onChangePOIType
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.addCoordsModify"
    })), /*#__PURE__*/_react["default"].createElement(_.Checkbox, {
      checked: processor.batch ? processor.batch.spatialFilter.coordsModify : false,
      id: "custom-coords",
      onChange: onChangeCoordsModify
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.setAddresLevel"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      options: Object.keys(_defaultSettings.ADDRESS_LEVEL_DICT),
      onChange: onSetPrecison,
      selectedItems: processor.batch.spatialFilter ? processor.batch.spatialFilter.level : null,
      multiSelect: false
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.setGeometryFilter"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      options: Object.keys(_defaultSettings.GEOMETRY_RANGE),
      onChange: onLoadGeometryFilter,
      selectedItems: processor.batch.spatialFilter.geometryFilter ? processor.batch.spatialFilter.geometryFilter : null,
      multiSelect: false
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.setGoogleAPIKey"
    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_.Input, {
      type: "password",
      className: "typeahead__input",
      id: "apikey-input",
      placeholder: "please input your Google API here",
      onChange: onAddAPI
    })))), /*#__PURE__*/_react["default"].createElement(_.SidePanelDivider, null), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.exportSetting"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      options: processor.batch.exportSetting.outData,
      selectedItems: processor.batch ? processor.batch.exportSetting.outDataFinal : null,
      multiSelect: true,
      onChange: onSetOutFiles
    }), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.outColumn"
    })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
      options: _defaultSettings.OUTPUT_COL_TYPES,
      selectedItems: processor.batch ? processor.batch.exportSetting.outColumns : null,
      multiSelect: true,
      onChange: onSetOutColumns
    }), /*#__PURE__*/_react["default"].createElement(_.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.header"
    })), /*#__PURE__*/_react["default"].createElement(_.Checkbox, {
      checked: processor.batch ? processor.batch.exportSetting.header : false,
      id: "keep-header",
      onChange: onChangeHeader
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("img", {
      src: "https://developers.google.com/maps/documentation/images/powered_by_google_on_non_white.png",
      alt: "google"
    })));
  });

  GMTPanel.displayName = 'GMTPanel';
  console.log('rendering react panel');
  return GMTPanel;
}

var _default = GMTPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvYXV0by1nbXQtcGFuZWwvZ210LXBhbmVsLmpzIl0sIm5hbWVzIjpbIkdNVFBhbmVsRmFjdG9yeSIsImRlcHMiLCJTb3VyY2VEYXRhU2VsZWN0b3JGYWN0b3J5IiwiRmllbGRTZWxlY3RvckZhY3RvcnkiLCJGaWx0ZXJQYW5lbEhlYWRlckZhY3RvcnkiLCJTdHlsZWRHTVRQYW5lbCIsInN0eWxlZCIsImRpdiIsIlN0eWxlZE1lc3NhZ2VUZXh0IiwiU291cmNlRGF0YVNlbGVjdG9yIiwiRmllbGRTZWxlY3RvciIsIkdNVFBhbmVsIiwiUmVhY3QiLCJtZW1vIiwicHJvY2Vzc29yIiwiZGF0YXNldHMiLCJzZXRQcm9jZXNzb3IiLCJhbGxBdmFpbGFibGVGaWVsZHMiLCJ2aXNTdGF0ZUFjdGlvbnMiLCJvblNwYXRpYWxJbnRlcmFjdFR5cGVTZWxlY3QiLCJ2YWx1ZSIsImF0dHJzIiwic2ludGVyIiwiam9pbkZpZWxkc1NlbGVjdG9yIiwiZGF0YXNldElkIiwiam9pbkRhdGEiLCJ1bmRlZmluZWQiLCJzZXREb3dQcm9jZXNzRmlsdGVyIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJiYXRjaCIsInRlbXBvcmFsRmlsdGVyIiwiZG93Iiwib25Mb2FkR2VvbWV0cnlGaWx0ZXIiLCJyZW1vdmVEYXRhc2V0IiwiZGF0YXNldCIsImluZm8iLCJpZCIsImxhYmVsIiwiZGF0YSIsIkdFT01FVFJZX1JBTkdFIiwidXBkYXRlVmlzRGF0YSIsInNwYXRpYWxGaWx0ZXIiLCJnZW9tZXRyeUZpbHRlciIsIm9uQWRkVGVtcG9yYWxGaWx0ZXIiLCJERUZBVUxUX1RFTVBPUkFMX1BST0NFU1NPUl9TVFJVQ1RVUkUiLCJvZGRhdGFJRCIsIm1pbm1heF9zdGFydGRhdGUiLCJtaW5tYXhfZW5kZGF0ZSIsImRhdGVSYW5nZSIsImdwc2RhdGFJRCIsIm9uQWRkU3BhdGlhbEZpbHRlciIsIkRFRkFVTFRfU1BBVElBTF9QUk9DRVNTT1JfU1RSVUNUVVJFIiwiZmlsdGVyRGF0YXNldEJ5SWQiLCJkYXRhc2V0X3R5cGUiLCJ0YXJnZXRfZGF0YXNldCIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJ4IiwibGVuZ3RoIiwiY2hlY2tEYXRhc2V0Iiwib3V0X2ZpbGVzIiwiZmlsdGVyX2luZm8iLCJtYXAiLCJmaWx0ZXJlZF9kYXRhc2V0IiwiY29uY2F0IiwiRVhQT1JUX0ZJTEVfTElTVCIsImV4cG9ydFNldHRpbmciLCJvdXREYXRhIiwib3V0RGF0YUZpbmFsIiwiZGJjaGVja2VkIiwic2V0U3RhcnRUaW1lRmlsdGVyIiwic3RhcnRUaW1lIiwic2V0RW5kVGltZUZpbHRlciIsImVuZFRpbWUiLCJvbkNoYW5nZVBPSVR5cGUiLCJwb2lUeXBlIiwib25DaGFuZ2VDb29yZHNNb2RpZnkiLCJjb29yZHNNb2RpZnkiLCJvbkNoYW5nZUhvbGlkYXkiLCJyZW1vdmVIb2xpZGF5Iiwib25BZGRBUEkiLCJhcGlrZXkiLCJ0YXJnZXQiLCJzZXREYXRlUmFuZ2UiLCJkYXRlQXJyYXkiLCJvblNldFByZWNpc29uIiwibGV2ZWwiLCJvblNldE91dEZpbGVzIiwib25DaGFuZ2VIZWFkZXIiLCJoZWFkZXIiLCJvbkNoYW5nZUZsb29ySW50IiwiZmxvb3IiLCJwYXJzZUludCIsIm9uRmlsdGVyUHJlZmVjdHVyZSIsInByZWZGaWx0ZXIiLCJvblNldE91dENvbHVtbnMiLCJvdXRDb2x1bW5zIiwicG9pZGF0YUlEIiwiRE9XX0xJU1QiLCJUSU1FX0xJU1QiLCJBRERSRVNTX0xFVkVMX0RJQ1QiLCJPVVRQVVRfQ09MX1RZUEVTIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQU9BOztBQUNBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUFBLGVBQWUsQ0FBQ0MsSUFBaEIsR0FBdUIsQ0FDckJDLDhCQURxQixF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Rkw7QUFHRSxNQUFBLFFBQVEsRUFBRUQ7QUFIWixNQXBNRixlQTBNRSwyQ0ExTUYsZUEyTUU7QUFBSyxNQUFBLEdBQUcsRUFBQyw0RkFBVDtBQUF1RyxNQUFBLEdBQUcsRUFBQztBQUEzRyxNQTNNRixDQURGLENBREY7QUFvTkQsR0FoYWMsQ0FBakI7O0FBa2FBaEYsRUFBQUEsUUFBUSxDQUFDOEYsV0FBVCxHQUF1QixVQUF2QjtBQUNBNUUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVo7QUFDQSxTQUFPbkIsUUFBUDtBQUNEOztlQUVjWCxlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoLmdldCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL2NvbW1vbi9zb3VyY2UtZGF0YS1zZWxlY3Rvcic7XG5pbXBvcnQgRmllbGRTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi4vLi4vY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCBGaWx0ZXJQYW5lbEhlYWRlckZhY3RvcnkgZnJvbSAnLi4vZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbC1oZWFkZXInO1xuaW1wb3J0IEl0ZW1TZWxlY3RvciBmcm9tICcuLi8uLi9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcbmltcG9ydCB7XG4gIEFERFJFU1NfTEVWRUxfRElDVCxcbiAgRVhQT1JUX0ZJTEVfTElTVCwgR0VPTUVUUllfUkFOR0UsXG4gIEpBUEFOX1BSRUZfRElDVCxcbiAgSkFQQU5fUFJFRl9ESUNUX0JLLCBPVVRQVVRfQ09MX1RZUEVTLFxuICBUSU1FX0xJU1Rcbn0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtCdXR0b24sIENoZWNrYm94LCBJbnB1dCwgUGFuZWxMYWJlbCwgU2lkZVBhbmVsRGl2aWRlcn0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9TUEFUSUFMX1BST0NFU1NPUl9TVFJVQ1RVUkUsXG4gIERFRkFVTFRfVEVNUE9SQUxfUFJPQ0VTU09SX1NUUlVDVFVSRVxufSBmcm9tICcuLi8uLi8uLi91dGlscy9wcm9jZXNzb3ItdXRpbHMnO1xuaW1wb3J0IHtET1dfTElTVH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7Z2V0X21pbm1heF9ieV9jb2xfbmFtZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGF0YXNldC1leHRlbnNpb24tdXRpbHMnO1xuaW1wb3J0IFN0eWxlZERhdGVQaWNrZXIgZnJvbSAnLi4vLi4vY29tbW9uL2RhdGUtcGlja2VyJztcbmltcG9ydCBTdHlsZWREcm9wRG93blNlbGVjdG9yIGZyb20gJy4uLy4uL2NvbW1vbi9kcm9wZG93bi10cmVlLXNlbGVjdG9yJztcbmltcG9ydCB7bG9hZFJlbW90ZU1hcH0gZnJvbSAnLi4vLi4vLi4vLi4vZXhhbXBsZXMvZGVtby1hcHAvc3JjL2FjdGlvbnMnO1xuaW1wb3J0IHtwcm9jZXNzQ3N2RGF0YSwgcHJvY2Vzc0dlb2pzb259IGZyb20gJy4uLy4uLy4uL3Byb2Nlc3NvcnMvZGF0YS1wcm9jZXNzb3InO1xuXG5HTVRQYW5lbEZhY3RvcnkuZGVwcyA9IFtcbiAgU291cmNlRGF0YVNlbGVjdG9yRmFjdG9yeSxcbiAgRmllbGRTZWxlY3RvckZhY3RvcnksXG4gIEZpbHRlclBhbmVsSGVhZGVyRmFjdG9yeVxuXTtcblxuY29uc3QgU3R5bGVkR01UUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG5cbiAgLmZpbHRlci1wYW5lbF9fZmlsdGVyIHtcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTWVzc2FnZVRleHQgPSBzdHlsZWQuZGl2YFxuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOnJlZDtcbmA7XG5cblxuZnVuY3Rpb24gR01UUGFuZWxGYWN0b3J5KFNvdXJjZURhdGFTZWxlY3RvcixGaWVsZFNlbGVjdG9yKSB7XG4gIGNvbnN0IEdNVFBhbmVsID0gUmVhY3QubWVtbyhcbiAgICAoe3Byb2Nlc3NvcixkYXRhc2V0cywgc2V0UHJvY2Vzc29yLGFsbEF2YWlsYWJsZUZpZWxkcyx2aXNTdGF0ZUFjdGlvbnN9KSA9PiB7XG5cbiAgICAgIGNvbnN0IG9uU3BhdGlhbEludGVyYWN0VHlwZVNlbGVjdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRycyA9IHByb2Nlc3Nvci5hdHRyc1xuICAgICAgICBhdHRycy5zaW50ZXIgPSB2YWx1ZVxuICAgICAgICBzZXRQcm9jZXNzb3IoJ2F0dHJzJyxhdHRycylcbiAgICAgIH1cblxuICAgICAgY29uc3Qgam9pbkZpZWxkc1NlbGVjdG9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhc2V0SWQgPSBwcm9jZXNzb3IuYXR0cnMuam9pbkRhdGE/cHJvY2Vzc29yLmF0dHJzLmpvaW5EYXRhOnVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFkYXRhc2V0SWQpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldChkYXRhc2V0cywgWyBkYXRhc2V0SWQsICdmaWVsZHMnXSwgW10pO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0RG93UHJvY2Vzc0ZpbHRlciA9IChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGQgZG93IGZpbHRlcicpXG4gICAgICAgIGNvbnN0IGJhdGNoID0gcHJvY2Vzc29yLmJhdGNoXG4gICAgICAgIGJhdGNoLnRlbXBvcmFsRmlsdGVyLmRvdyA9IGVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb25Mb2FkR2VvbWV0cnlGaWx0ZXIgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBiYXRjaCA9IHByb2Nlc3Nvci5iYXRjaFxuICAgICAgICBjb25zb2xlLmxvZygnbG9hZCByZW1vdGUgbWFwJylcbiAgICAgICAgaWYoZGF0YXNldHNbJ2ZpbHRlciddKXtcbiAgICAgICAgICB2aXNTdGF0ZUFjdGlvbnMucmVtb3ZlRGF0YXNldCgnZmlsdGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YXNldCA9IHtcbiAgICAgICAgICAgICBpbmZvOiB7aWQ6ICdmaWx0ZXInLCBsYWJlbDogJ0ZpbHRlciBEYXRhJ30sXG4gICAgICAgICAgICAgZGF0YTogcHJvY2Vzc0dlb2pzb24oR0VPTUVUUllfUkFOR0VbZV0pXG4gICAgICAgICAgfTtcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLnVwZGF0ZVZpc0RhdGEoZGF0YXNldClcbiAgICAgICAgYmF0Y2guc3BhdGlhbEZpbHRlci5nZW9tZXRyeUZpbHRlciA9IGVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKTtcbiAgICAgIH1cblxuXG4gICAgICBjb25zdCBvbkFkZFRlbXBvcmFsRmlsdGVyID0gKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCB0ZW1wb3JhbCBmaWx0ZXInKVxuICAgICAgICBjb25zdCBiYXRjaCA9IHByb2Nlc3Nvci5iYXRjaFxuICAgICAgICBiYXRjaC50ZW1wb3JhbEZpbHRlciA9IGJhdGNoLnRlbXBvcmFsRmlsdGVyP251bGw6REVGQVVMVF9URU1QT1JBTF9QUk9DRVNTT1JfU1RSVUNUVVJFXG4gICAgICAgIGlmKGJhdGNoLnRlbXBvcmFsRmlsdGVyKSB7XG4gICAgICAgICAgaWYgKGJhdGNoLm9kZGF0YUlEKSB7XG4gICAgICAgICAgICAvLyBkYXRhc2V0c1tmaWx0ZXJfZGF0YXNldF0uXG4gICAgICAgICAgICBjb25zdCBtaW5tYXhfc3RhcnRkYXRlID0gZ2V0X21pbm1heF9ieV9jb2xfbmFtZShkYXRhc2V0c1tiYXRjaC5vZGRhdGFJRF0sICdhY3Rpdml0eVNlZ21lbnRfZHVyYXRpb25fc3RhcnREYXRlJylcbiAgICAgICAgICAgIGNvbnN0IG1pbm1heF9lbmRkYXRlID0gZ2V0X21pbm1heF9ieV9jb2xfbmFtZShkYXRhc2V0c1tiYXRjaC5vZGRhdGFJRF0sICdhY3Rpdml0eVNlZ21lbnRfZHVyYXRpb25fZW5kRGF0ZScpXG4gICAgICAgICAgICBiYXRjaC50ZW1wb3JhbEZpbHRlci5kYXRlUmFuZ2UgPSBbbWlubWF4X3N0YXJ0ZGF0ZVswXSwgbWlubWF4X2VuZGRhdGVbMV1dXG4gICAgICAgICAgfSBlbHNlIGlmIChiYXRjaC5ncHNkYXRhSUQpIHtcbiAgICAgICAgICAgIGJhdGNoLnRlbXBvcmFsRmlsdGVyLmRhdGVSYW5nZSA9IGdldF9taW5tYXhfYnlfY29sX25hbWUoZGF0YXNldHNbYmF0Y2guZ3BzZGF0YUlEXSwgJ3RpbWVzdGFtcCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb25BZGRTcGF0aWFsRmlsdGVyID0gKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCBzcGF0aWFsIGZpbHRlcicpO1xuICAgICAgICBjb25zdCBiYXRjaCA9IHByb2Nlc3Nvci5iYXRjaFxuICAgICAgICBiYXRjaC5zcGF0aWFsRmlsdGVyID0gYmF0Y2guc3BhdGlhbEZpbHRlcj9udWxsOkRFRkFVTFRfU1BBVElBTF9QUk9DRVNTT1JfU1RSVUNUVVJFXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2JhdGNoJyxiYXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbHRlckRhdGFzZXRCeUlkID0gKGRhdGFzZXRzLGRhdGFzZXRfdHlwZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZmlsdGVyIGRhdGFzZXQnKVxuICAgICAgICBjb25zdCB0YXJnZXRfZGF0YXNldCA9IE9iamVjdC5rZXlzKGRhdGFzZXRzKS5maWx0ZXIoKHgpPT5kYXRhc2V0c1t4XS5sYWJlbD09ZGF0YXNldF90eXBlKVxuICAgICAgICByZXR1cm4gdGFyZ2V0X2RhdGFzZXQubGVuZ3RoPjA/dGFyZ2V0X2RhdGFzZXRbMF06bnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGVja0RhdGFzZXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrIGRhdGFzZXQnKVxuICAgICAgICAgIGxldCBvdXRfZmlsZXMgPSBbXVxuICAgICAgICAgIGNvbnN0IGZpbHRlcl9pbmZvID0gW1snYWN0aXZpdHkgaW5mb3JtYXRpb24nLCdvZGRhdGFJRCddLFsndmlzaXRlZCBwbGFjZSBpbmZvcm1hdGlvbicsJ3BvaWRhdGFJRCddLFsnR01UIHJhdyBncHMgZGF0YScsJ2dwc2RhdGFJRCddXVxuICAgICAgICAgIGxldCBiYXRjaCA9IHByb2Nlc3Nvci5iYXRjaFxuICAgICAgICAgIGZpbHRlcl9pbmZvLm1hcCgoeCk9PntcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkX2RhdGFzZXQgPSBmaWx0ZXJEYXRhc2V0QnlJZChkYXRhc2V0cyx4WzBdKVxuICAgICAgICAgICAgaWYoZmlsdGVyZWRfZGF0YXNldCl7XG4gICAgICAgICAgICAgIGJhdGNoW3hbMV1dID0gZmlsdGVyZWRfZGF0YXNldFxuICAgICAgICAgICAgICBvdXRfZmlsZXMgPSBvdXRfZmlsZXMuY29uY2F0KEVYUE9SVF9GSUxFX0xJU1RbeFswXV0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBiYXRjaC5leHBvcnRTZXR0aW5nLm91dERhdGEgPSBvdXRfZmlsZXNcbiAgICAgICAgICBiYXRjaC5leHBvcnRTZXR0aW5nLm91dERhdGFGaW5hbCA9IG91dF9maWxlc1xuICAgICAgICAgIGJhdGNoLmRiY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdiYXRjaCcsYmF0Y2gpXG4gICAgICB9XG5cblxuXG5cbiAgICAgIC8vaGVyZSBiZXR0ZXIgdG8gdXNlIHJlbW86XG4gICAgICAvLyBjb25zdCBGaWx0ZXJEYXRhc2V0ID0gKGRhdGFzZXRzLGRhdGFzZXRfdHlwZSkgPT4ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygnZmlsdGVyIGRhdGFzZXQnKVxuICAgICAgLy9cbiAgICAgIC8vICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgIC8vXG4gICAgICAvLyAgIGNvbnN0IHRhcmdldF9kYXRhc2V0ID0gT2JqZWN0LmtleXMoZGF0YXNldHMpLmZpbHRlcigoeCk9PmRhdGFzZXRzW3hdLmxhYmVsPT1kYXRhc2V0X3R5cGUpXG4gICAgICAvLyAgIGlmKHRhcmdldF9kYXRhc2V0Lmxlbmd0aD49MCl7XG4gICAgICAvLyAgICAgc3dpdGNoKGRhdGFzZXRfdHlwZSl7XG4gICAgICAvLyAgICAgICBjYXNlICdhY3Rpdml0eSBpbmZvcm1hdGlvbic6XG4gICAgICAvLyAgICAgICAgIGJhdGNoLm9kZGF0YXNldD10YXJnZXRfZGF0YXNldFswXTtcbiAgICAgIC8vICAgICAgICAgc2V0UHJvY2Vzc29yKCdiYXRjaCcsYmF0Y2gpO1xuICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgIC8vICAgICAgIGNhc2UgJ3Zpc2l0ZWQgcGxhY2UgaW5mb3JtYXRpb24nOlxuICAgICAgLy8gICAgICAgICBiYXRjaC5wb2lkYXRhc2V0PXRhcmdldF9kYXRhc2V0WzBdO1xuICAgICAgLy8gICAgICAgICBzZXRQcm9jZXNzb3IoJ2JhdGNoJyxiYXRjaCk7XG4gICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gICByZXR1cm4gdGFyZ2V0X2RhdGFzZXRcbiAgICAgIC8vIH1cbiAgICAgIC8vIGNvbnN0IG9uU291cmNlRGF0YVNlbGVjdG9yID0gdXNlQ2FsbGJhY2sodmFsdWUgPT4gc2V0RmlsdGVyKHBhcnNlSW50KGlkeCksICdkYXRhSWQnLCB2YWx1ZSksIFtcbiAgICAgIC8vICAgaWR4LFxuICAgICAgLy8gICBzZXRGaWx0ZXJcbiAgICAgIC8vIF0pO1xuXG4gICAgICAvLyBmdW5jdGlvbiBnZXRPRGRhdGFzZXQoKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdiYXRjaCBpbmZvJyk7XG4gICAgICAvLyAgIHJldHVybiBiYXRjaEluZm8ub2RkYXRhc2V0XG4gICAgICAvLyB9XG5cblxuICAgICAgY29uc3Qgc2V0U3RhcnRUaW1lRmlsdGVyID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgICAgYmF0Y2gudGVtcG9yYWxGaWx0ZXIuc3RhcnRUaW1lID0gZVxuICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdiYXRjaCcsYmF0Y2gpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZXRFbmRUaW1lRmlsdGVyID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgICAgYmF0Y2gudGVtcG9yYWxGaWx0ZXIuZW5kVGltZSA9IGVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKTtcbiAgICAgIH1cblxuXG4gICAgICBmdW5jdGlvbiBvbkNoYW5nZVBPSVR5cGUoKSB7XG4gICAgICAgIGNvbnN0IGJhdGNoID0gcHJvY2Vzc29yLmJhdGNoXG4gICAgICAgIGJhdGNoLnNwYXRpYWxGaWx0ZXIucG9pVHlwZSA9ICFiYXRjaC5zcGF0aWFsRmlsdGVyLnBvaVR5cGVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkNoYW5nZUNvb3Jkc01vZGlmeSgpIHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgICAgYmF0Y2guc3BhdGlhbEZpbHRlci5jb29yZHNNb2RpZnkgPSAhYmF0Y2guc3BhdGlhbEZpbHRlci5jb29yZHNNb2RpZnlcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkNoYW5nZUhvbGlkYXkoKSB7XG4gICAgICAgIGNvbnN0IGJhdGNoID0gcHJvY2Vzc29yLmJhdGNoXG4gICAgICAgIGJhdGNoLnRlbXBvcmFsRmlsdGVyLnJlbW92ZUhvbGlkYXkgPSAhYmF0Y2gudGVtcG9yYWxGaWx0ZXIucmVtb3ZlSG9saWRheVxuICAgICAgICByZXR1cm4gc2V0UHJvY2Vzc29yKCdiYXRjaCcsYmF0Y2gpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9uQWRkQVBJID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgICAgYmF0Y2guYXBpa2V5ID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzZXREYXRlUmFuZ2UgPSAoZGF0ZUFycmF5KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXQgZGF0ZSByYW5nZScpO1xuICAgICAgICBjb25zdCBiYXRjaCA9IHByb2Nlc3Nvci5iYXRjaFxuICAgICAgICBiYXRjaC50ZW1wb3JhbEZpbHRlci5kYXRlUmFuZ2UgPSBkYXRlQXJyYXlcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvblNldFByZWNpc29uID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgICAgYmF0Y2guc3BhdGlhbEZpbHRlci5sZXZlbCA9IGVcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvblNldE91dEZpbGVzID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBwcm9jZXNzb3IuYmF0Y2hcbiAgICAgICAgYmF0Y2guZXhwb3J0U2V0dGluZy5vdXREYXRhRmluYWwgPSBlXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2JhdGNoJyxiYXRjaClcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25DaGFuZ2VIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IGJhdGNoID0gcHJvY2Vzc29yLmJhdGNoXG4gICAgICAgIGJhdGNoLmV4cG9ydFNldHRpbmcuaGVhZGVyID0gIWJhdGNoLmV4cG9ydFNldHRpbmcuaGVhZGVyXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2JhdGNoJyxiYXRjaClcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25DaGFuZ2VGbG9vckludChlKSB7XG4gICAgICAgIGNvbnN0IGJhdGNoID0gcHJvY2Vzc29yLmJhdGNoXG4gICAgICAgIGJhdGNoLnRlbXBvcmFsRmlsdGVyLmZsb29yID0gcGFyc2VJbnQoZSlcbiAgICAgICAgcmV0dXJuIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkZpbHRlclByZWZlY3R1cmUoZSl7XG4gICAgICAgIGNvbnN0IGJhdGNoID0gcHJvY2Vzc29yLmJhdGNoXG4gICAgICAgIGJhdGNoLnNwYXRpYWxGaWx0ZXIucHJlZkZpbHRlciA9IGU7XG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2JhdGNoJyxiYXRjaClcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25TZXRPdXRDb2x1bW5zKGUpe1xuICAgICAgICBjb25zdCBiYXRjaCA9IHByb2Nlc3Nvci5iYXRjaFxuICAgICAgICBiYXRjaC5leHBvcnRTZXR0aW5nLm91dENvbHVtbnMgPSBlXG4gICAgICAgIHJldHVybiBzZXRQcm9jZXNzb3IoJ2JhdGNoJyxiYXRjaClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8U3R5bGVkR01UUGFuZWwgY2xhc3NOYW1lPVwiZmlsdGVyLXBhbmVsXCI+XG4gICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgIHsocHJvY2Vzc29yLmJhdGNoICYmIHByb2Nlc3Nvci5iYXRjaC5kYmNoZWNrZWQpICYmXG4gICAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICA8UGFuZWxMYWJlbD48Rm9ybWF0dGVkTWVzc2FnZSBpZD0ncHJvY2Vzc29yLnBvaWRhdGFzZXQnIC8+PC9QYW5lbExhYmVsPlxuICAgICAgICAgICAgICAgPElucHV0IHZhbHVlPXtwcm9jZXNzb3IuYmF0Y2gucG9pZGF0YUlEP2RhdGFzZXRzW3Byb2Nlc3Nvci5iYXRjaC5wb2lkYXRhSURdLmxhYmVsOm51bGx9IHJlYWRvbmx5PXt0cnVlfS8+XG4gICAgICAgICAgICAgICAgPGJyLz5cblxuICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPSdwcm9jZXNzb3Iub2RkYXRhc2V0JyAvPjwvUGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXQgdmFsdWU9e3Byb2Nlc3Nvci5iYXRjaC5vZGRhdGFJRD9kYXRhc2V0c1twcm9jZXNzb3IuYmF0Y2gub2RkYXRhSURdLmxhYmVsOm51bGx9IHJlYWRvbmx5PXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPSdwcm9jZXNzb3IuZ3BzZGF0YXNldCcgLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0IHZhbHVlPXtwcm9jZXNzb3IuYmF0Y2guZ3BzZGF0YUlEP2RhdGFzZXRzW3Byb2Nlc3Nvci5iYXRjaC5ncHNkYXRhSURdLmxhYmVsOm51bGx9IHJlYWRvbmx5PXt0cnVlfS8+XG4gICAgICAgICAgICAgICAgPGJyLz5cblxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkZC1wcm9jZXNzb3ItYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIC8vIGluYWN0aXZlPXtoYWRFbXB0eVByb2Nlc3NvciB8fCAhaGFkRGF0YXNldH1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTA1cHhcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2hlY2tEYXRhc2V0fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtwcm9jZXNzb3IuYmF0Y2guZGJjaGVja2VkPydSZWNoZWNrIGRhdGEnOidDaGVjayBkYXRhJ30gLz5cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICAgICAgICAgIHshcHJvY2Vzc29yLmJhdGNoLmRiY2hlY2tlZCAmJiA8U3R5bGVkTWVzc2FnZVRleHQ+UGxlYXNlIGZpcnN0IGNoZWNrIGRhdGEgaW50ZWdyaXR5PC9TdHlsZWRNZXNzYWdlVGV4dD59XG5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPFNpZGVQYW5lbERpdmlkZXIgLz5cblxuICAgICAgICAgICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17XCJwcm9jZXNzb3IuYWRkVGVtcG9yYWxGaWx0ZXJcIn0gLz5cbiAgICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9eyFwcm9jZXNzb3IuYmF0Y2g/ZmFsc2U6ISFwcm9jZXNzb3IuYmF0Y2gudGVtcG9yYWxGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICBpZD1cInRlbXBvcmFsLWNoZWNrXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcHJvY2Vzc29yLmJhdGNoLmRiY2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkFkZFRlbXBvcmFsRmlsdGVyfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgPC9QYW5lbExhYmVsPlxuXG4gICAgICAgICAgICAgIDxici8+XG5cbiAgICAgICAgICAgICAge3Byb2Nlc3Nvci5iYXRjaC50ZW1wb3JhbEZpbHRlciAmJlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8UGFuZWxMYWJlbD48Rm9ybWF0dGVkTWVzc2FnZSBpZD0ncHJvY2Vzc29yLnNldERvdycgLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8SXRlbVNlbGVjdG9yIG9wdGlvbnM9e0RPV19MSVNUfSBzZWxlY3RlZEl0ZW1zPXtwcm9jZXNzb3IuYmF0Y2gudGVtcG9yYWxGaWx0ZXI/KHByb2Nlc3Nvci5iYXRjaC50ZW1wb3JhbEZpbHRlci5kb3c/cHJvY2Vzc29yLmJhdGNoLnRlbXBvcmFsRmlsdGVyLmRvdzpET1dfTElTVCk6RE9XX0xJU1R9IG9uQ2hhbmdlPXtzZXREb3dQcm9jZXNzRmlsdGVyfSAvPlxuXG4gICAgICAgICAgICAgICAgICA8YnIvPlxuXG4gICAgICAgICAgICAgICAgICA8UGFuZWxMYWJlbD48Rm9ybWF0dGVkTWVzc2FnZSBpZD0ncHJvY2Vzc29yLnNldFN0YXJ0RGF0ZScgLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8U3R5bGVkRGF0ZVBpY2tlciBjbGFzcz0ndHlwZWFoZWFkX19pbnB1dCcgZG9tYWluPXtwcm9jZXNzb3IuYmF0Y2gudGVtcG9yYWxGaWx0ZXIuZGF0ZVJhbmdlfSBzZXREYXRlUmFuZ2U9e3NldERhdGVSYW5nZX0gLz5cbiAgICAgICAgICAgICAgICAgIHsvKjxTdHlsZWREYXRlUGlja2VyLz4qL31cbiAgICAgICAgICAgICAgICAgIDxici8+XG5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPSdwcm9jZXNzb3IucmVtb3ZlSG9saWRheScgLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17cHJvY2Vzc29yLmJhdGNoP3Byb2Nlc3Nvci5iYXRjaC50ZW1wb3JhbEZpbHRlci5yZW1vdmVIb2xpZGF5OmZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBpZD1cImhvbGlkYXktcmVtb3ZlXCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlSG9saWRheX1cbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIDxici8+XG5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17XCJwcm9jZXNzb3IuZmxvb3JcIn0gLz5cbiAgICAgICAgICAgICAgICAgIDwvUGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxJdGVtU2VsZWN0b3Igb25DaGFuZ2U9e29uQ2hhbmdlRmxvb3JJbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1snMScsJzUnLCcxMCcsJzE1JywnMjAnLCczMCddfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtwcm9jZXNzb3IuYmF0Y2gudGVtcG9yYWxGaWx0ZXIuZmxvb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIDxici8+XG5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17XCJwcm9jZXNzb3Iuc3RhcnRUaW1lXCJ9IC8+XG4gICAgICAgICAgICAgICAgICA8L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8SXRlbVNlbGVjdG9yIG9uQ2hhbmdlPXtzZXRTdGFydFRpbWVGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1RJTUVfTElTVH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17cHJvY2Vzc29yLmJhdGNoLnRlbXBvcmFsRmlsdGVyLnN0YXJ0VGltZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgPGJyLz5cblxuICAgICAgICAgICAgICAgICAgPFBhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5lbmRUaW1lXCJ9IC8+XG4gICAgICAgICAgICAgICAgICA8L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8SXRlbVNlbGVjdG9yIG9uQ2hhbmdlPXtzZXRFbmRUaW1lRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtUSU1FX0xJU1R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3Byb2Nlc3Nvci5iYXRjaC50ZW1wb3JhbEZpbHRlci5lbmRUaW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAvPlxuXG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgPFNpZGVQYW5lbERpdmlkZXIgLz5cblxuICAgICAgICAgICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17XCJwcm9jZXNzb3IuYWRkU3BhdGlhbEZpbHRlclwifSAvPlxuICAgICAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17IXByb2Nlc3Nvci5iYXRjaD9mYWxzZTohIXByb2Nlc3Nvci5iYXRjaC5zcGF0aWFsRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgaWQ9XCJzcGF0aWFsLWNoZWNrXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkFkZFNwYXRpYWxGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXByb2Nlc3Nvci5iYXRjaC5kYmNoZWNrZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9QYW5lbExhYmVsPlxuXG4gICAgICAgICAgICAgIHtwcm9jZXNzb3IuYmF0Y2guc3BhdGlhbEZpbHRlciAmJlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5hZGRQT0lDb252ZXJ0ZXJcIn0gLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtwcm9jZXNzb3IuYmF0Y2g/cHJvY2Vzc29yLmJhdGNoLnNwYXRpYWxGaWx0ZXIucG9pVHlwZTpmYWxzZX1cbiAgICAgICAgICAgICAgICAgIGlkPVwiY3VzdG9tLXRoZW1lXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZVBPSVR5cGV9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5hZGRDb29yZHNNb2RpZnlcIn0gLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17cHJvY2Vzc29yLmJhdGNoP3Byb2Nlc3Nvci5iYXRjaC5zcGF0aWFsRmlsdGVyLmNvb3Jkc01vZGlmeTpmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJjdXN0b20tY29vcmRzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlQ29vcmRzTW9kaWZ5fVxuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxici8+XG5cbiAgICAgICAgICAgICAgICA8UGFuZWxMYWJlbD48Rm9ybWF0dGVkTWVzc2FnZSBpZD0ncHJvY2Vzc29yLnNldEFkZHJlc0xldmVsJyAvPjwvUGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICA8SXRlbVNlbGVjdG9yIG9wdGlvbnM9e09iamVjdC5rZXlzKEFERFJFU1NfTEVWRUxfRElDVCl9IG9uQ2hhbmdlPXtvblNldFByZWNpc29ufSAgc2VsZWN0ZWRJdGVtcz17cHJvY2Vzc29yLmJhdGNoLnNwYXRpYWxGaWx0ZXI/cHJvY2Vzc29yLmJhdGNoLnNwYXRpYWxGaWx0ZXIubGV2ZWw6bnVsbH0gbXVsdGlTZWxlY3Q9e2ZhbHNlfS8+XG5cbiAgICAgICAgICAgICAgICAgIDxici8+XG5cblxuXG4gICAgICAgICAgICAgICAgICA8UGFuZWxMYWJlbD48Rm9ybWF0dGVkTWVzc2FnZSBpZD0ncHJvY2Vzc29yLnNldEdlb21ldHJ5RmlsdGVyJyAvPjwvUGFuZWxMYWJlbD5cblxuICAgICAgICAgICAgICAgICAgPEl0ZW1TZWxlY3RvciBvcHRpb25zPXtPYmplY3Qua2V5cyhHRU9NRVRSWV9SQU5HRSl9IG9uQ2hhbmdlPXtvbkxvYWRHZW9tZXRyeUZpbHRlcn0gIHNlbGVjdGVkSXRlbXM9e3Byb2Nlc3Nvci5iYXRjaC5zcGF0aWFsRmlsdGVyLmdlb21ldHJ5RmlsdGVyP3Byb2Nlc3Nvci5iYXRjaC5zcGF0aWFsRmlsdGVyLmdlb21ldHJ5RmlsdGVyOm51bGx9IG11bHRpU2VsZWN0PXtmYWxzZX0vPlxuICAgICAgICAgICAgICAgICAgey8qPEJ1dHRvbiBvbkNsaWNrPXtvbkxvYWRHZW9tZXRyeUZpbHRlcn0+TG9hZCBGaWx0ZXIgRGF0YTwvQnV0dG9uPiovfVxuXG4gICAgICAgICAgICAgICAgey8qPFBhbmVsTGFiZWw+PEZvcm1hdHRlZE1lc3NhZ2UgaWQ9J3Byb2Nlc3Nvci5zZXRQZWZlY3R1cmVGaWx0ZXInIC8+PC9QYW5lbExhYmVsPiovfVxuICAgICAgICAgICAgICAgIHsvKiAgPFN0eWxlZERyb3BEb3duU2VsZWN0b3IgZGF0YT17SkFQQU5fUFJFRl9ESUNUX0JLfSBvbkNoYW5nZT17b25GaWx0ZXJQcmVmZWN0dXJlfT48L1N0eWxlZERyb3BEb3duU2VsZWN0b3I+Ki99XG5cbiAgICAgICAgICAgICAgICAgIDxici8+XG5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPSdwcm9jZXNzb3Iuc2V0R29vZ2xlQVBJS2V5JyAvPjwvUGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIHsvKjxpbnB1dCBjbGFzc05hbWU9XCJ0eXBlYWhlYWRfX2lucHV0XCIgbmFtZT1cImFkbWluXCIgdmFsdWU9XCJcIiBzdHlsZT17e1wiaGVpZ2h0XCI6MCxcIndpZHRoXCI6MCxcInZpc2liaWxpdHlcIjpcImhpZGRlblwifX0gLz4qL31cbiAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0eXBlYWhlYWRfX2lucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICBpZD1cImFwaWtleS1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJwbGVhc2UgaW5wdXQgeW91ciBHb29nbGUgQVBJIGhlcmVcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkFkZEFQSX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgIDxTaWRlUGFuZWxEaXZpZGVyIC8+XG5cblxuICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5leHBvcnRTZXR0aW5nXCJ9IC8+PC9QYW5lbExhYmVsPlxuICAgICAgICAgIDxJdGVtU2VsZWN0b3Igb3B0aW9ucz17cHJvY2Vzc29yLmJhdGNoLmV4cG9ydFNldHRpbmcub3V0RGF0YX0gc2VsZWN0ZWRJdGVtcz17cHJvY2Vzc29yLmJhdGNoP3Byb2Nlc3Nvci5iYXRjaC5leHBvcnRTZXR0aW5nLm91dERhdGFGaW5hbDpudWxsfSBtdWx0aVNlbGVjdD17dHJ1ZX0gb25DaGFuZ2U9e29uU2V0T3V0RmlsZXN9Lz5cblxuXG5cbiAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5vdXRDb2x1bW5cIn0gLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgPEl0ZW1TZWxlY3RvciBvcHRpb25zPXtPVVRQVVRfQ09MX1RZUEVTfSBzZWxlY3RlZEl0ZW1zPXtwcm9jZXNzb3IuYmF0Y2g/cHJvY2Vzc29yLmJhdGNoLmV4cG9ydFNldHRpbmcub3V0Q29sdW1uczpudWxsfSBtdWx0aVNlbGVjdD17dHJ1ZX0gb25DaGFuZ2U9e29uU2V0T3V0Q29sdW1uc30vPlxuXG5cbiAgICAgICAgICAgIDxQYW5lbExhYmVsPjxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtcInByb2Nlc3Nvci5oZWFkZXJcIn0gLz48L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgY2hlY2tlZD17cHJvY2Vzc29yLmJhdGNoP3Byb2Nlc3Nvci5iYXRjaC5leHBvcnRTZXR0aW5nLmhlYWRlcjpmYWxzZX1cbiAgICAgICAgICAgICAgaWQ9XCJrZWVwLWhlYWRlclwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUhlYWRlcn1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9pbWFnZXMvcG93ZXJlZF9ieV9nb29nbGVfb25fbm9uX3doaXRlLnBuZ1wiICBhbHQ9XCJnb29nbGVcIi8+XG5cblxuXG4gICAgICAgICAgPC9TdHlsZWRHTVRQYW5lbD5cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgIH1cbiAgKTtcbiAgR01UUGFuZWwuZGlzcGxheU5hbWUgPSAnR01UUGFuZWwnO1xuICBjb25zb2xlLmxvZygncmVuZGVyaW5nIHJlYWN0IHBhbmVsJyk7XG4gIHJldHVybiBHTVRQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR01UUGFuZWxGYWN0b3J5O1xuXG5cblxuXG4iXX0=