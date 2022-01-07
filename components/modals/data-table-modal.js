"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DatasetTabs = exports.DatasetModalTab = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _datasetLabel = _interopRequireDefault(require("../common/dataset-label"));

var _dataTable = _interopRequireDefault(require("../common/data-table"));

var _reselect = require("reselect");

var _cellSize = require("../common/data-table/cell-size");

var _canvas = _interopRequireDefault(require("../common/data-table/canvas"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var dgSettings = {
  sidePadding: '38px',
  verticalPadding: '16px',
  height: '36px'
};

var StyledModal = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  min-height: 70vh;\n  overflow: hidden;\n  display: flex;\n"])));

var DatasetCatalog = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  padding: ", " ", " 0;\n"])), dgSettings.verticalPadding, dgSettings.sidePadding);

var DatasetModalTab = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  border-bottom: 3px solid ", ";\n  cursor: pointer;\n  display: flex;\n  height: 35px;\n  margin: 0 3px;\n  padding: 0 5px;\n\n  :first-child {\n    margin-left: 0;\n    padding-left: 0;\n  }\n"])), function (props) {
  return props.active ? 'black' : 'transparent';
});

exports.DatasetModalTab = DatasetModalTab;

var DatasetTabsUnmemoized = function DatasetTabsUnmemoized(_ref) {
  var activeDataset = _ref.activeDataset,
      datasets = _ref.datasets,
      showDatasetTable = _ref.showDatasetTable;
  return /*#__PURE__*/_react["default"].createElement(DatasetCatalog, {
    className: "dataset-modal-catalog"
  }, Object.values(datasets).map(function (dataset) {
    return /*#__PURE__*/_react["default"].createElement(DatasetModalTab, {
      className: "dataset-modal-tab",
      active: dataset === activeDataset,
      key: dataset.id,
      onClick: function onClick() {
        return showDatasetTable(dataset.id);
      }
    }, /*#__PURE__*/_react["default"].createElement(_datasetLabel["default"], {
      dataset: dataset
    }));
  }));
};

var DatasetTabs = /*#__PURE__*/_react["default"].memo(DatasetTabsUnmemoized);

exports.DatasetTabs = DatasetTabs;
DatasetTabs.displayName = 'DatasetTabs';
DataTableModalFactory.deps = [_dataTable["default"]];

var TableContainer = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  min-height: 100%;\n  max-height: 100%;\n"])));

function DataTableModalFactory(DataTable) {
  var DataTableModal = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(DataTableModal, _React$Component);

    var _super = _createSuper(DataTableModal);

    function DataTableModal() {
      var _this;

      (0, _classCallCheck2["default"])(this, DataTableModal);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasetCellSizeCache", {});
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataId", function (props) {
        return props.dataId;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasets", function (props) {
        return props.datasets;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fields", function (props) {
        return (props.datasets[props.dataId] || {}).fields;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "columns", (0, _reselect.createSelector)(_this.fields, function (fields) {
        return fields.map(function (f) {
          return f.name;
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "colMeta", (0, _reselect.createSelector)(_this.fields, function (fields) {
        return fields.reduce(function (acc, _ref2) {
          var name = _ref2.name,
              displayName = _ref2.displayName,
              type = _ref2.type;
          return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, name, {
            name: displayName || name,
            type: type
          }));
        }, {});
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cellSizeCache", (0, _reselect.createSelector)(_this.dataId, _this.datasets, function (dataId, datasets) {
        if (!datasets[dataId]) {
          return {};
        }

        var _datasets$dataId = datasets[dataId],
            fields = _datasets$dataId.fields,
            dataContainer = _datasets$dataId.dataContainer;
        var showCalculate = null;

        if (!_this.datasetCellSizeCache[dataId]) {
          showCalculate = true;
        } else if (_this.datasetCellSizeCache[dataId].fields !== fields || _this.datasetCellSizeCache[dataId].dataContainer !== dataContainer) {
          showCalculate = true;
        }

        if (!showCalculate) {
          return _this.datasetCellSizeCache[dataId].cellSizeCache;
        }

        var cellSizeCache = fields.reduce(function (acc, field, colIdx) {
          return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, field.name, (0, _cellSize.renderedSize)({
            text: {
              dataContainer: dataContainer,
              column: field.name
            },
            colIdx: colIdx,
            type: field.type,
            fontSize: _this.props.theme.cellFontSize,
            font: _this.props.theme.fontFamily
          })));
        }, {}); // save it to cache

        _this.datasetCellSizeCache[dataId] = {
          cellSizeCache: cellSizeCache,
          fields: fields,
          dataContainer: dataContainer
        };
        return cellSizeCache;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "copyTableColumn", function (column) {
        var _this$props = _this.props,
            dataId = _this$props.dataId,
            copyTableColumn = _this$props.copyTableColumn;
        copyTableColumn(dataId, column);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pinTableColumn", function (column) {
        var _this$props2 = _this.props,
            dataId = _this$props2.dataId,
            pinTableColumn = _this$props2.pinTableColumn;
        pinTableColumn(dataId, column);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "deleteTableColumn", function (column) {
        console.log('start delete table');
        var _this$props3 = _this.props,
            dataId = _this$props3.dataId,
            deleteTableColumn = _this$props3.deleteTableColumn;
        deleteTableColumn(dataId, column);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "sortTableColumn", function (column, mode) {
        var _this$props4 = _this.props,
            dataId = _this$props4.dataId,
            sortTableColumn = _this$props4.sortTableColumn;
        sortTableColumn(dataId, column, mode);
      });
      return _this;
    }

    (0, _createClass2["default"])(DataTableModal, [{
      key: "render",
      value: function render() {
        var _this$props5 = this.props,
            datasets = _this$props5.datasets,
            dataId = _this$props5.dataId,
            showDatasetTable = _this$props5.showDatasetTable,
            showTab = _this$props5.showTab;

        if (!datasets || !dataId) {
          return null;
        }

        var activeDataset = datasets[dataId];
        var columns = this.columns(this.props);
        var colMeta = this.colMeta(this.props);
        var cellSizeCache = this.cellSizeCache(this.props);
        return /*#__PURE__*/_react["default"].createElement(StyledModal, {
          className: "dataset-modal",
          id: "dataset-modal"
        }, /*#__PURE__*/_react["default"].createElement(_canvas["default"], null), /*#__PURE__*/_react["default"].createElement(TableContainer, null, showTab ? /*#__PURE__*/_react["default"].createElement(DatasetTabs, {
          activeDataset: activeDataset,
          datasets: datasets,
          showDatasetTable: showDatasetTable
        }) : null, datasets[dataId] ? /*#__PURE__*/_react["default"].createElement(DataTable, {
          key: dataId,
          columns: columns,
          colMeta: colMeta,
          cellSizeCache: cellSizeCache,
          dataContainer: activeDataset.dataContainer,
          pinnedColumns: activeDataset.pinnedColumns,
          sortOrder: activeDataset.sortOrder,
          sortColumn: activeDataset.sortColumn,
          copyTableColumn: this.copyTableColumn,
          pinTableColumn: this.pinTableColumn,
          sortTableColumn: this.sortTableColumn,
          deleteTableColumn: this.deleteTableColumn
        }) : null));
      }
    }]);
    return DataTableModal;
  }(_react["default"].Component);

  DataTableModal.defaultProps = {
    showTab: true
  };
  return (0, _styledComponents.withTheme)(DataTableModal);
}

var _default = DataTableModalFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9kYXRhLXRhYmxlLW1vZGFsLmpzIl0sIm5hbWVzIjpbImRnU2V0dGluZ3MiLCJzaWRlUGFkZGluZyIsInZlcnRpY2FsUGFkZGluZyIsImhlaWdodCIsIlN0eWxlZE1vZGFsIiwic3R5bGVkIiwiZGl2IiwiRGF0YXNldENhdGFsb2ciLCJEYXRhc2V0TW9kYWxUYWIiLCJwcm9wcyIsImFjdGl2ZSIsIkRhdGFzZXRUYWJzVW5tZW1vaXplZCIsImFjdGl2ZURhdGFzZXQiLCJkYXRhc2V0cyIsInNob3dEYXRhc2V0VGFibGUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJkYXRhc2V0IiwiaWQiLCJEYXRhc2V0VGFicyIsIlJlYWN0IiwibWVtbyIsImRpc3BsYXlOYW1lIiwiRGF0YVRhYmxlTW9kYWxGYWN0b3J5IiwiZGVwcyIsIkRhdGFUYWJsZUZhY3RvcnkiLCJUYWJsZUNvbnRhaW5lciIsIkRhdGFUYWJsZSIsIkRhdGFUYWJsZU1vZGFsIiwiZGF0YUlkIiwiZmllbGRzIiwiZiIsIm5hbWUiLCJyZWR1Y2UiLCJhY2MiLCJ0eXBlIiwiZGF0YUNvbnRhaW5lciIsInNob3dDYWxjdWxhdGUiLCJkYXRhc2V0Q2VsbFNpemVDYWNoZSIsImNlbGxTaXplQ2FjaGUiLCJmaWVsZCIsImNvbElkeCIsInRleHQiLCJjb2x1bW4iLCJmb250U2l6ZSIsInRoZW1lIiwiY2VsbEZvbnRTaXplIiwiZm9udCIsImZvbnRGYW1pbHkiLCJjb3B5VGFibGVDb2x1bW4iLCJwaW5UYWJsZUNvbHVtbiIsImNvbnNvbGUiLCJsb2ciLCJkZWxldGVUYWJsZUNvbHVtbiIsIm1vZGUiLCJzb3J0VGFibGVDb2x1bW4iLCJzaG93VGFiIiwiY29sdW1ucyIsImNvbE1ldGEiLCJwaW5uZWRDb2x1bW5zIiwic29ydE9yZGVyIiwic29ydENvbHVtbiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVLEdBQUc7QUFDakJDLEVBQUFBLFdBQVcsRUFBRSxNQURJO0FBRWpCQyxFQUFBQSxlQUFlLEVBQUUsTUFGQTtBQUdqQkMsRUFBQUEsTUFBTSxFQUFFO0FBSFMsQ0FBbkI7O0FBTUEsSUFBTUMsV0FBVyxHQUFHQyw2QkFBT0MsR0FBVixvSkFBakI7O0FBTUEsSUFBTUMsY0FBYyxHQUFHRiw2QkFBT0MsR0FBVixzSUFFUE4sVUFBVSxDQUFDRSxlQUZKLEVBRXVCRixVQUFVLENBQUNDLFdBRmxDLENBQXBCOztBQUtPLElBQU1PLGVBQWUsR0FBR0gsNkJBQU9DLEdBQVYscVRBRUMsVUFBQUcsS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ0MsTUFBTixHQUFlLE9BQWYsR0FBeUIsYUFBOUI7QUFBQSxDQUZOLENBQXJCOzs7O0FBZVAsSUFBTUMscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QjtBQUFBLE1BQUVDLGFBQUYsUUFBRUEsYUFBRjtBQUFBLE1BQWlCQyxRQUFqQixRQUFpQkEsUUFBakI7QUFBQSxNQUEyQkMsZ0JBQTNCLFFBQTJCQSxnQkFBM0I7QUFBQSxzQkFDNUIsZ0NBQUMsY0FBRDtBQUFnQixJQUFBLFNBQVMsRUFBQztBQUExQixLQUNHQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0gsUUFBZCxFQUF3QkksR0FBeEIsQ0FBNEIsVUFBQUMsT0FBTztBQUFBLHdCQUNsQyxnQ0FBQyxlQUFEO0FBQ0UsTUFBQSxTQUFTLEVBQUMsbUJBRFo7QUFFRSxNQUFBLE1BQU0sRUFBRUEsT0FBTyxLQUFLTixhQUZ0QjtBQUdFLE1BQUEsR0FBRyxFQUFFTSxPQUFPLENBQUNDLEVBSGY7QUFJRSxNQUFBLE9BQU8sRUFBRTtBQUFBLGVBQU1MLGdCQUFnQixDQUFDSSxPQUFPLENBQUNDLEVBQVQsQ0FBdEI7QUFBQTtBQUpYLG9CQU1FLGdDQUFDLHdCQUFEO0FBQWMsTUFBQSxPQUFPLEVBQUVEO0FBQXZCLE1BTkYsQ0FEa0M7QUFBQSxHQUFuQyxDQURILENBRDRCO0FBQUEsQ0FBOUI7O0FBZU8sSUFBTUUsV0FBVyxnQkFBR0Msa0JBQU1DLElBQU4sQ0FBV1gscUJBQVgsQ0FBcEI7OztBQUVQUyxXQUFXLENBQUNHLFdBQVosR0FBMEIsYUFBMUI7QUFFQUMscUJBQXFCLENBQUNDLElBQXRCLEdBQTZCLENBQUNDLHFCQUFELENBQTdCOztBQUVBLElBQU1DLGNBQWMsR0FBR3RCLDZCQUFPQyxHQUFWLGtNQUFwQjs7QUFRQSxTQUFTa0IscUJBQVQsQ0FBK0JJLFNBQS9CLEVBQTBDO0FBQUEsTUFDbENDLGNBRGtDO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSwrR0FFZixFQUZlO0FBQUEsaUdBRzdCLFVBQUFwQixLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDcUIsTUFBVjtBQUFBLE9BSHdCO0FBQUEsbUdBSTNCLFVBQUFyQixLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDSSxRQUFWO0FBQUEsT0FKc0I7QUFBQSxpR0FLN0IsVUFBQUosS0FBSztBQUFBLGVBQUksQ0FBQ0EsS0FBSyxDQUFDSSxRQUFOLENBQWVKLEtBQUssQ0FBQ3FCLE1BQXJCLEtBQWdDLEVBQWpDLEVBQXFDQyxNQUF6QztBQUFBLE9BTHdCO0FBQUEsa0dBTTVCLDhCQUFlLE1BQUtBLE1BQXBCLEVBQTRCLFVBQUFBLE1BQU07QUFBQSxlQUFJQSxNQUFNLENBQUNkLEdBQVAsQ0FBVyxVQUFBZSxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ0MsSUFBTjtBQUFBLFNBQVosQ0FBSjtBQUFBLE9BQWxDLENBTjRCO0FBQUEsa0dBTzVCLDhCQUFlLE1BQUtGLE1BQXBCLEVBQTRCLFVBQUFBLE1BQU07QUFBQSxlQUMxQ0EsTUFBTSxDQUFDRyxNQUFQLENBQ0UsVUFBQ0MsR0FBRDtBQUFBLGNBQU9GLElBQVAsU0FBT0EsSUFBUDtBQUFBLGNBQWFWLFdBQWIsU0FBYUEsV0FBYjtBQUFBLGNBQTBCYSxJQUExQixTQUEwQkEsSUFBMUI7QUFBQSxpREFDS0QsR0FETCw0Q0FFR0YsSUFGSCxFQUVVO0FBQ05BLFlBQUFBLElBQUksRUFBRVYsV0FBVyxJQUFJVSxJQURmO0FBRU5HLFlBQUFBLElBQUksRUFBSkE7QUFGTSxXQUZWO0FBQUEsU0FERixFQVFFLEVBUkYsQ0FEMEM7QUFBQSxPQUFsQyxDQVA0QjtBQUFBLHdHQW9CdEIsOEJBQWUsTUFBS04sTUFBcEIsRUFBNEIsTUFBS2pCLFFBQWpDLEVBQTJDLFVBQUNpQixNQUFELEVBQVNqQixRQUFULEVBQXNCO0FBQy9FLFlBQUksQ0FBQ0EsUUFBUSxDQUFDaUIsTUFBRCxDQUFiLEVBQXVCO0FBQ3JCLGlCQUFPLEVBQVA7QUFDRDs7QUFIOEUsK0JBSS9DakIsUUFBUSxDQUFDaUIsTUFBRCxDQUp1QztBQUFBLFlBSXhFQyxNQUp3RSxvQkFJeEVBLE1BSndFO0FBQUEsWUFJaEVNLGFBSmdFLG9CQUloRUEsYUFKZ0U7QUFNL0UsWUFBSUMsYUFBYSxHQUFHLElBQXBCOztBQUNBLFlBQUksQ0FBQyxNQUFLQyxvQkFBTCxDQUEwQlQsTUFBMUIsQ0FBTCxFQUF3QztBQUN0Q1EsVUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0QsU0FGRCxNQUVPLElBQ0wsTUFBS0Msb0JBQUwsQ0FBMEJULE1BQTFCLEVBQWtDQyxNQUFsQyxLQUE2Q0EsTUFBN0MsSUFDQSxNQUFLUSxvQkFBTCxDQUEwQlQsTUFBMUIsRUFBa0NPLGFBQWxDLEtBQW9EQSxhQUYvQyxFQUdMO0FBQ0FDLFVBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNEOztBQUVELFlBQUksQ0FBQ0EsYUFBTCxFQUFvQjtBQUNsQixpQkFBTyxNQUFLQyxvQkFBTCxDQUEwQlQsTUFBMUIsRUFBa0NVLGFBQXpDO0FBQ0Q7O0FBRUQsWUFBTUEsYUFBYSxHQUFHVCxNQUFNLENBQUNHLE1BQVAsQ0FDcEIsVUFBQ0MsR0FBRCxFQUFNTSxLQUFOLEVBQWFDLE1BQWI7QUFBQSxpREFDS1AsR0FETCw0Q0FFR00sS0FBSyxDQUFDUixJQUZULEVBRWdCLDRCQUFhO0FBQ3pCVSxZQUFBQSxJQUFJLEVBQUU7QUFDSk4sY0FBQUEsYUFBYSxFQUFiQSxhQURJO0FBRUpPLGNBQUFBLE1BQU0sRUFBRUgsS0FBSyxDQUFDUjtBQUZWLGFBRG1CO0FBS3pCUyxZQUFBQSxNQUFNLEVBQU5BLE1BTHlCO0FBTXpCTixZQUFBQSxJQUFJLEVBQUVLLEtBQUssQ0FBQ0wsSUFOYTtBQU96QlMsWUFBQUEsUUFBUSxFQUFFLE1BQUtwQyxLQUFMLENBQVdxQyxLQUFYLENBQWlCQyxZQVBGO0FBUXpCQyxZQUFBQSxJQUFJLEVBQUUsTUFBS3ZDLEtBQUwsQ0FBV3FDLEtBQVgsQ0FBaUJHO0FBUkUsV0FBYixDQUZoQjtBQUFBLFNBRG9CLEVBY3BCLEVBZG9CLENBQXRCLENBcEIrRSxDQW9DL0U7O0FBQ0EsY0FBS1Ysb0JBQUwsQ0FBMEJULE1BQTFCLElBQW9DO0FBQ2xDVSxVQUFBQSxhQUFhLEVBQWJBLGFBRGtDO0FBRWxDVCxVQUFBQSxNQUFNLEVBQU5BLE1BRmtDO0FBR2xDTSxVQUFBQSxhQUFhLEVBQWJBO0FBSGtDLFNBQXBDO0FBS0EsZUFBT0csYUFBUDtBQUNELE9BM0NlLENBcEJzQjtBQUFBLDBHQWlFcEIsVUFBQUksTUFBTSxFQUFJO0FBQUEsMEJBQ1EsTUFBS25DLEtBRGI7QUFBQSxZQUNuQnFCLE1BRG1CLGVBQ25CQSxNQURtQjtBQUFBLFlBQ1hvQixlQURXLGVBQ1hBLGVBRFc7QUFFMUJBLFFBQUFBLGVBQWUsQ0FBQ3BCLE1BQUQsRUFBU2MsTUFBVCxDQUFmO0FBQ0QsT0FwRXFDO0FBQUEseUdBc0VyQixVQUFBQSxNQUFNLEVBQUk7QUFBQSwyQkFDUSxNQUFLbkMsS0FEYjtBQUFBLFlBQ2xCcUIsTUFEa0IsZ0JBQ2xCQSxNQURrQjtBQUFBLFlBQ1ZxQixjQURVLGdCQUNWQSxjQURVO0FBRXpCQSxRQUFBQSxjQUFjLENBQUNyQixNQUFELEVBQVNjLE1BQVQsQ0FBZDtBQUNELE9BekVxQztBQUFBLDRHQTJFbEIsVUFBQUEsTUFBTSxFQUFJO0FBQzVCUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUQ0QiwyQkFFTyxNQUFLNUMsS0FGWjtBQUFBLFlBRXJCcUIsTUFGcUIsZ0JBRXJCQSxNQUZxQjtBQUFBLFlBRWR3QixpQkFGYyxnQkFFZEEsaUJBRmM7QUFHNUJBLFFBQUFBLGlCQUFpQixDQUFDeEIsTUFBRCxFQUFRYyxNQUFSLENBQWpCO0FBQ0QsT0EvRXFDO0FBQUEsMEdBaUZwQixVQUFDQSxNQUFELEVBQVNXLElBQVQsRUFBa0I7QUFBQSwyQkFDQSxNQUFLOUMsS0FETDtBQUFBLFlBQzNCcUIsTUFEMkIsZ0JBQzNCQSxNQUQyQjtBQUFBLFlBQ25CMEIsZUFEbUIsZ0JBQ25CQSxlQURtQjtBQUVsQ0EsUUFBQUEsZUFBZSxDQUFDMUIsTUFBRCxFQUFTYyxNQUFULEVBQWlCVyxJQUFqQixDQUFmO0FBQ0QsT0FwRnFDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsYUFzRnRDLGtCQUFTO0FBQUEsMkJBQytDLEtBQUs5QyxLQURwRDtBQUFBLFlBQ0FJLFFBREEsZ0JBQ0FBLFFBREE7QUFBQSxZQUNVaUIsTUFEVixnQkFDVUEsTUFEVjtBQUFBLFlBQ2tCaEIsZ0JBRGxCLGdCQUNrQkEsZ0JBRGxCO0FBQUEsWUFDb0MyQyxPQURwQyxnQkFDb0NBLE9BRHBDOztBQUVQLFlBQUksQ0FBQzVDLFFBQUQsSUFBYSxDQUFDaUIsTUFBbEIsRUFBMEI7QUFDeEIsaUJBQU8sSUFBUDtBQUNEOztBQUNELFlBQU1sQixhQUFhLEdBQUdDLFFBQVEsQ0FBQ2lCLE1BQUQsQ0FBOUI7QUFDQSxZQUFNNEIsT0FBTyxHQUFHLEtBQUtBLE9BQUwsQ0FBYSxLQUFLakQsS0FBbEIsQ0FBaEI7QUFDQSxZQUFNa0QsT0FBTyxHQUFHLEtBQUtBLE9BQUwsQ0FBYSxLQUFLbEQsS0FBbEIsQ0FBaEI7QUFDQSxZQUFNK0IsYUFBYSxHQUFHLEtBQUtBLGFBQUwsQ0FBbUIsS0FBSy9CLEtBQXhCLENBQXRCO0FBRUEsNEJBQ0UsZ0NBQUMsV0FBRDtBQUFhLFVBQUEsU0FBUyxFQUFDLGVBQXZCO0FBQXVDLFVBQUEsRUFBRSxFQUFDO0FBQTFDLHdCQUNFLGdDQUFDLGtCQUFELE9BREYsZUFFRSxnQ0FBQyxjQUFELFFBQ0dnRCxPQUFPLGdCQUNOLGdDQUFDLFdBQUQ7QUFDRSxVQUFBLGFBQWEsRUFBRTdDLGFBRGpCO0FBRUUsVUFBQSxRQUFRLEVBQUVDLFFBRlo7QUFHRSxVQUFBLGdCQUFnQixFQUFFQztBQUhwQixVQURNLEdBTUosSUFQTixFQVFHRCxRQUFRLENBQUNpQixNQUFELENBQVIsZ0JBQ0MsZ0NBQUMsU0FBRDtBQUNFLFVBQUEsR0FBRyxFQUFFQSxNQURQO0FBRUUsVUFBQSxPQUFPLEVBQUU0QixPQUZYO0FBR0UsVUFBQSxPQUFPLEVBQUVDLE9BSFg7QUFJRSxVQUFBLGFBQWEsRUFBRW5CLGFBSmpCO0FBS0UsVUFBQSxhQUFhLEVBQUU1QixhQUFhLENBQUN5QixhQUwvQjtBQU1FLFVBQUEsYUFBYSxFQUFFekIsYUFBYSxDQUFDZ0QsYUFOL0I7QUFPRSxVQUFBLFNBQVMsRUFBRWhELGFBQWEsQ0FBQ2lELFNBUDNCO0FBUUUsVUFBQSxVQUFVLEVBQUVqRCxhQUFhLENBQUNrRCxVQVI1QjtBQVNFLFVBQUEsZUFBZSxFQUFFLEtBQUtaLGVBVHhCO0FBVUUsVUFBQSxjQUFjLEVBQUUsS0FBS0MsY0FWdkI7QUFXRSxVQUFBLGVBQWUsRUFBRSxLQUFLSyxlQVh4QjtBQVlFLFVBQUEsaUJBQWlCLEVBQUUsS0FBS0Y7QUFaMUIsVUFERCxHQWVHLElBdkJOLENBRkYsQ0FERjtBQThCRDtBQTlIcUM7QUFBQTtBQUFBLElBQ1hqQyxrQkFBTTBDLFNBREs7O0FBZ0l4Q2xDLEVBQUFBLGNBQWMsQ0FBQ21DLFlBQWYsR0FBOEI7QUFDNUJQLElBQUFBLE9BQU8sRUFBRTtBQURtQixHQUE5QjtBQUdBLFNBQU8saUNBQVU1QixjQUFWLENBQVA7QUFDRDs7ZUFFY0wscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCwge3dpdGhUaGVtZX0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IERhdGFzZXRMYWJlbCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9kYXRhc2V0LWxhYmVsJztcbmltcG9ydCBEYXRhVGFibGVGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2RhdGEtdGFibGUnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtyZW5kZXJlZFNpemV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2RhdGEtdGFibGUvY2VsbC1zaXplJztcbmltcG9ydCBDYW52YXNIYWNrIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2RhdGEtdGFibGUvY2FudmFzJztcblxuY29uc3QgZGdTZXR0aW5ncyA9IHtcbiAgc2lkZVBhZGRpbmc6ICczOHB4JyxcbiAgdmVydGljYWxQYWRkaW5nOiAnMTZweCcsXG4gIGhlaWdodDogJzM2cHgnXG59O1xuXG5jb25zdCBTdHlsZWRNb2RhbCA9IHN0eWxlZC5kaXZgXG4gIG1pbi1oZWlnaHQ6IDcwdmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5jb25zdCBEYXRhc2V0Q2F0YWxvZyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6ICR7ZGdTZXR0aW5ncy52ZXJ0aWNhbFBhZGRpbmd9ICR7ZGdTZXR0aW5ncy5zaWRlUGFkZGluZ30gMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBEYXRhc2V0TW9kYWxUYWIgPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgJHtwcm9wcyA9PiAocHJvcHMuYWN0aXZlID8gJ2JsYWNrJyA6ICd0cmFuc3BhcmVudCcpfTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDM1cHg7XG4gIG1hcmdpbjogMCAzcHg7XG4gIHBhZGRpbmc6IDAgNXB4O1xuXG4gIDpmaXJzdC1jaGlsZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICB9XG5gO1xuXG5jb25zdCBEYXRhc2V0VGFic1VubWVtb2l6ZWQgPSAoe2FjdGl2ZURhdGFzZXQsIGRhdGFzZXRzLCBzaG93RGF0YXNldFRhYmxlfSkgPT4gKFxuICA8RGF0YXNldENhdGFsb2cgY2xhc3NOYW1lPVwiZGF0YXNldC1tb2RhbC1jYXRhbG9nXCI+XG4gICAge09iamVjdC52YWx1ZXMoZGF0YXNldHMpLm1hcChkYXRhc2V0ID0+IChcbiAgICAgIDxEYXRhc2V0TW9kYWxUYWJcbiAgICAgICAgY2xhc3NOYW1lPVwiZGF0YXNldC1tb2RhbC10YWJcIlxuICAgICAgICBhY3RpdmU9e2RhdGFzZXQgPT09IGFjdGl2ZURhdGFzZXR9XG4gICAgICAgIGtleT17ZGF0YXNldC5pZH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd0RhdGFzZXRUYWJsZShkYXRhc2V0LmlkKX1cbiAgICAgID5cbiAgICAgICAgPERhdGFzZXRMYWJlbCBkYXRhc2V0PXtkYXRhc2V0fSAvPlxuICAgICAgPC9EYXRhc2V0TW9kYWxUYWI+XG4gICAgKSl9XG4gIDwvRGF0YXNldENhdGFsb2c+XG4pO1xuXG5leHBvcnQgY29uc3QgRGF0YXNldFRhYnMgPSBSZWFjdC5tZW1vKERhdGFzZXRUYWJzVW5tZW1vaXplZCk7XG5cbkRhdGFzZXRUYWJzLmRpc3BsYXlOYW1lID0gJ0RhdGFzZXRUYWJzJztcblxuRGF0YVRhYmxlTW9kYWxGYWN0b3J5LmRlcHMgPSBbRGF0YVRhYmxlRmFjdG9yeV07XG5cbmNvbnN0IFRhYmxlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleC1ncm93OiAxO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuYDtcblxuZnVuY3Rpb24gRGF0YVRhYmxlTW9kYWxGYWN0b3J5KERhdGFUYWJsZSkge1xuICBjbGFzcyBEYXRhVGFibGVNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgZGF0YXNldENlbGxTaXplQ2FjaGUgPSB7fTtcbiAgICBkYXRhSWQgPSBwcm9wcyA9PiBwcm9wcy5kYXRhSWQ7XG4gICAgZGF0YXNldHMgPSBwcm9wcyA9PiBwcm9wcy5kYXRhc2V0cztcbiAgICBmaWVsZHMgPSBwcm9wcyA9PiAocHJvcHMuZGF0YXNldHNbcHJvcHMuZGF0YUlkXSB8fCB7fSkuZmllbGRzO1xuICAgIGNvbHVtbnMgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmZpZWxkcywgZmllbGRzID0+IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpKTtcbiAgICBjb2xNZXRhID0gY3JlYXRlU2VsZWN0b3IodGhpcy5maWVsZHMsIGZpZWxkcyA9PlxuICAgICAgZmllbGRzLnJlZHVjZShcbiAgICAgICAgKGFjYywge25hbWUsIGRpc3BsYXlOYW1lLCB0eXBlfSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICBuYW1lOiBkaXNwbGF5TmFtZSB8fCBuYW1lLFxuICAgICAgICAgICAgdHlwZVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgKTtcblxuICAgIGNlbGxTaXplQ2FjaGUgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmRhdGFJZCwgdGhpcy5kYXRhc2V0cywgKGRhdGFJZCwgZGF0YXNldHMpID0+IHtcbiAgICAgIGlmICghZGF0YXNldHNbZGF0YUlkXSkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgICBjb25zdCB7ZmllbGRzLCBkYXRhQ29udGFpbmVyfSA9IGRhdGFzZXRzW2RhdGFJZF07XG5cbiAgICAgIGxldCBzaG93Q2FsY3VsYXRlID0gbnVsbDtcbiAgICAgIGlmICghdGhpcy5kYXRhc2V0Q2VsbFNpemVDYWNoZVtkYXRhSWRdKSB7XG4gICAgICAgIHNob3dDYWxjdWxhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5kYXRhc2V0Q2VsbFNpemVDYWNoZVtkYXRhSWRdLmZpZWxkcyAhPT0gZmllbGRzIHx8XG4gICAgICAgIHRoaXMuZGF0YXNldENlbGxTaXplQ2FjaGVbZGF0YUlkXS5kYXRhQ29udGFpbmVyICE9PSBkYXRhQ29udGFpbmVyXG4gICAgICApIHtcbiAgICAgICAgc2hvd0NhbGN1bGF0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hvd0NhbGN1bGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0Q2VsbFNpemVDYWNoZVtkYXRhSWRdLmNlbGxTaXplQ2FjaGU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbGxTaXplQ2FjaGUgPSBmaWVsZHMucmVkdWNlKFxuICAgICAgICAoYWNjLCBmaWVsZCwgY29sSWR4KSA9PiAoe1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICBbZmllbGQubmFtZV06IHJlbmRlcmVkU2l6ZSh7XG4gICAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICAgIGRhdGFDb250YWluZXIsXG4gICAgICAgICAgICAgIGNvbHVtbjogZmllbGQubmFtZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbElkeCxcbiAgICAgICAgICAgIHR5cGU6IGZpZWxkLnR5cGUsXG4gICAgICAgICAgICBmb250U2l6ZTogdGhpcy5wcm9wcy50aGVtZS5jZWxsRm9udFNpemUsXG4gICAgICAgICAgICBmb250OiB0aGlzLnByb3BzLnRoZW1lLmZvbnRGYW1pbHlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSxcbiAgICAgICAge31cbiAgICAgICk7XG4gICAgICAvLyBzYXZlIGl0IHRvIGNhY2hlXG4gICAgICB0aGlzLmRhdGFzZXRDZWxsU2l6ZUNhY2hlW2RhdGFJZF0gPSB7XG4gICAgICAgIGNlbGxTaXplQ2FjaGUsXG4gICAgICAgIGZpZWxkcyxcbiAgICAgICAgZGF0YUNvbnRhaW5lclxuICAgICAgfTtcbiAgICAgIHJldHVybiBjZWxsU2l6ZUNhY2hlO1xuICAgIH0pO1xuXG4gICAgY29weVRhYmxlQ29sdW1uID0gY29sdW1uID0+IHtcbiAgICAgIGNvbnN0IHtkYXRhSWQsIGNvcHlUYWJsZUNvbHVtbn0gPSB0aGlzLnByb3BzO1xuICAgICAgY29weVRhYmxlQ29sdW1uKGRhdGFJZCwgY29sdW1uKTtcbiAgICB9O1xuXG4gICAgcGluVGFibGVDb2x1bW4gPSBjb2x1bW4gPT4ge1xuICAgICAgY29uc3Qge2RhdGFJZCwgcGluVGFibGVDb2x1bW59ID0gdGhpcy5wcm9wcztcbiAgICAgIHBpblRhYmxlQ29sdW1uKGRhdGFJZCwgY29sdW1uKTtcbiAgICB9O1xuXG4gICAgZGVsZXRlVGFibGVDb2x1bW4gPSBjb2x1bW4gPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3N0YXJ0IGRlbGV0ZSB0YWJsZScpXG4gICAgICBjb25zdCB7ZGF0YUlkLGRlbGV0ZVRhYmxlQ29sdW1ufSA9IHRoaXMucHJvcHM7XG4gICAgICBkZWxldGVUYWJsZUNvbHVtbihkYXRhSWQsY29sdW1uKTtcbiAgICB9XG5cbiAgICBzb3J0VGFibGVDb2x1bW4gPSAoY29sdW1uLCBtb2RlKSA9PiB7XG4gICAgICBjb25zdCB7ZGF0YUlkLCBzb3J0VGFibGVDb2x1bW59ID0gdGhpcy5wcm9wcztcbiAgICAgIHNvcnRUYWJsZUNvbHVtbihkYXRhSWQsIGNvbHVtbiwgbW9kZSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtkYXRhc2V0cywgZGF0YUlkLCBzaG93RGF0YXNldFRhYmxlLCBzaG93VGFifSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoIWRhdGFzZXRzIHx8ICFkYXRhSWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBhY3RpdmVEYXRhc2V0ID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmNvbHVtbnModGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBjb2xNZXRhID0gdGhpcy5jb2xNZXRhKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3QgY2VsbFNpemVDYWNoZSA9IHRoaXMuY2VsbFNpemVDYWNoZSh0aGlzLnByb3BzKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZE1vZGFsIGNsYXNzTmFtZT1cImRhdGFzZXQtbW9kYWxcIiBpZD1cImRhdGFzZXQtbW9kYWxcIj5cbiAgICAgICAgICA8Q2FudmFzSGFjayAvPlxuICAgICAgICAgIDxUYWJsZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIHtzaG93VGFiID8gKFxuICAgICAgICAgICAgICA8RGF0YXNldFRhYnNcbiAgICAgICAgICAgICAgICBhY3RpdmVEYXRhc2V0PXthY3RpdmVEYXRhc2V0fVxuICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICBzaG93RGF0YXNldFRhYmxlPXtzaG93RGF0YXNldFRhYmxlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICB7ZGF0YXNldHNbZGF0YUlkXSA/IChcbiAgICAgICAgICAgICAgPERhdGFUYWJsZVxuICAgICAgICAgICAgICAgIGtleT17ZGF0YUlkfVxuICAgICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgICAgY29sTWV0YT17Y29sTWV0YX1cbiAgICAgICAgICAgICAgICBjZWxsU2l6ZUNhY2hlPXtjZWxsU2l6ZUNhY2hlfVxuICAgICAgICAgICAgICAgIGRhdGFDb250YWluZXI9e2FjdGl2ZURhdGFzZXQuZGF0YUNvbnRhaW5lcn1cbiAgICAgICAgICAgICAgICBwaW5uZWRDb2x1bW5zPXthY3RpdmVEYXRhc2V0LnBpbm5lZENvbHVtbnN9XG4gICAgICAgICAgICAgICAgc29ydE9yZGVyPXthY3RpdmVEYXRhc2V0LnNvcnRPcmRlcn1cbiAgICAgICAgICAgICAgICBzb3J0Q29sdW1uPXthY3RpdmVEYXRhc2V0LnNvcnRDb2x1bW59XG4gICAgICAgICAgICAgICAgY29weVRhYmxlQ29sdW1uPXt0aGlzLmNvcHlUYWJsZUNvbHVtbn1cbiAgICAgICAgICAgICAgICBwaW5UYWJsZUNvbHVtbj17dGhpcy5waW5UYWJsZUNvbHVtbn1cbiAgICAgICAgICAgICAgICBzb3J0VGFibGVDb2x1bW49e3RoaXMuc29ydFRhYmxlQ29sdW1ufVxuICAgICAgICAgICAgICAgIGRlbGV0ZVRhYmxlQ29sdW1uPXt0aGlzLmRlbGV0ZVRhYmxlQ29sdW1ufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9UYWJsZUNvbnRhaW5lcj5cbiAgICAgICAgPC9TdHlsZWRNb2RhbD5cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIERhdGFUYWJsZU1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBzaG93VGFiOiB0cnVlXG4gIH07XG4gIHJldHVybiB3aXRoVGhlbWUoRGF0YVRhYmxlTW9kYWwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhVGFibGVNb2RhbEZhY3Rvcnk7XG4iXX0=