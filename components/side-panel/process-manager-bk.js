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

var _reselect = require("reselect");

var _localization = require("../../localization");

var _styledComponents = require("../common/styled-components");

var _icons = require("../common/icons");

var _processPanel = _interopRequireDefault(require("./process-panel/process-panel"));

var _processorUtils = require("../../utils/processor-utils");

var _sourceDataCatalog = _interopRequireDefault(require("./common/source-data-catalog"));

var _filterUtils = require("../../utils/filter-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// import SourceDataSelectorFactory from './common/source-data-selector';
ProcessManagerFactory.deps = [_sourceDataCatalog["default"], _processPanel["default"]];

function ProcessManagerFactory(SourceDataCatalog, ProcessPanel) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(ProcessManager, _Component);

    var _super = _createSuper(ProcessManager);

    function ProcessManager() {
      var _this;

      (0, _classCallCheck2["default"])(this, ProcessManager);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasetsSelector", function (state) {
        return state.datasets;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "defaultDatasetSelector", (0, _reselect.createSelector)(_this.datasetsSelector, function (datasets) {
        return Object.keys(datasets).length && Object.keys(datasets)[0] || null;
      }));
      return _this;
    }

    (0, _createClass2["default"])(ProcessManager, [{
      key: "render",
      value:
      /* actions */
      // _addProcessor = () => {
      //   const defaultDataset = this.defaultDatasetSelector(this.props);
      //   this.props.addProcessor(defaultDataset);
      // };
      function render() {
        console.log('render process manager');
        var _this$props = this.props,
            processor = _this$props.processor,
            filters = _this$props.filters,
            datasets = _this$props.datasets;
        var filter = filters[Object.keys(filters)[0]];
        var exist_processor = processor ? processor : (0, _filterUtils.getDefaultFilter)(Object.keys(datasets)[0]); // const hadEmptyProcessor = processors.some(f => !f.name);

        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "process-manager"
        }, /*#__PURE__*/_react["default"].createElement(SourceDataCatalog, {
          datasets: datasets,
          showDatasetTable: this.props.showDatasetTable
        }), /*#__PURE__*/_react["default"].createElement(_styledComponents.SidePanelDivider, null), /*#__PURE__*/_react["default"].createElement(_styledComponents.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(ProcessPanel, {
          processor: exist_processor // how to set processor here:
          // processor={processor}
          ,
          idx: Object.keys(filters)[0],
          filter: filter ? filter : (0, _filterUtils.getDefaultFilter)(Object.keys(datasets)[0]),
          setFilter: this.props.setFilter,
          setProcessor: this.props.setProcessor,
          datasets: datasets
        })), /*#__PURE__*/_react["default"].createElement(_styledComponents.Button, {
          className: "add-processor-button" // inactive={hadEmptyProcessor || !hadDataset}
          ,
          width: "105px" // onClick={this._addProcessor}
          // onClick={this._geomProcess}

        }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
          id: "Process"
        })));
      }
    }]);
    return ProcessManager;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    datasets: _propTypes["default"].object,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    // addProcessor: PropTypes.func.isRequired,
    // removeProcessor: PropTypes.func.isRequired,
    setProcessor: _propTypes["default"].func.isRequired,
    // processors: PropTypes.arrayOf(PropTypes.any).isRequired,
    showDatasetTable: _propTypes["default"].func,
    // fields can be undefined when dataset is not selected
    fields: _propTypes["default"].arrayOf(_propTypes["default"].any)
  }), _temp;
}

var _default = ProcessManagerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcHJvY2Vzcy1tYW5hZ2VyLWJrLmpzIl0sIm5hbWVzIjpbIlByb2Nlc3NNYW5hZ2VyRmFjdG9yeSIsImRlcHMiLCJTb3VyY2VEYXRhQ2F0YWxvZ0ZhY3RvcnkiLCJQcm9jZXNzUGFuZWxGYWN0b3J5IiwiU291cmNlRGF0YUNhdGFsb2ciLCJQcm9jZXNzUGFuZWwiLCJzdGF0ZSIsImRhdGFzZXRzIiwiZGF0YXNldHNTZWxlY3RvciIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwicHJvcHMiLCJwcm9jZXNzb3IiLCJmaWx0ZXJzIiwiZmlsdGVyIiwiZXhpc3RfcHJvY2Vzc29yIiwic2hvd0RhdGFzZXRUYWJsZSIsInNldEZpbHRlciIsInNldFByb2Nlc3NvciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImxheWVycyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImZpZWxkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBQ0E7QUFFQUEscUJBQXFCLENBQUNDLElBQXRCLEdBQTZCLENBQUNDLDZCQUFELEVBQTJCQyx3QkFBM0IsQ0FBN0I7O0FBRUEsU0FBU0gscUJBQVQsQ0FBK0JJLGlCQUEvQixFQUFrREMsWUFBbEQsRUFBZ0U7QUFBQTs7QUFFOUQ7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDJHQWNxQixVQUFBQyxLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDQyxRQUFWO0FBQUEsT0FkMUI7QUFBQSxpSEFnQjJCLDhCQUN2QixNQUFLQyxnQkFEa0IsRUFFdkIsVUFBQUQsUUFBUTtBQUFBLGVBQUtFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxRQUFaLEVBQXNCSSxNQUF0QixJQUFnQ0YsTUFBTSxDQUFDQyxJQUFQLENBQVlILFFBQVosRUFBc0IsQ0FBdEIsQ0FBakMsSUFBOEQsSUFBbEU7QUFBQSxPQUZlLENBaEIzQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBcUJFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSx3QkFBUztBQUNQSyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWjtBQURPLDBCQUU4QixLQUFLQyxLQUZuQztBQUFBLFlBRUFDLFNBRkEsZUFFQUEsU0FGQTtBQUFBLFlBRVVDLE9BRlYsZUFFVUEsT0FGVjtBQUFBLFlBRWtCVCxRQUZsQixlQUVrQkEsUUFGbEI7QUFJUCxZQUFNVSxNQUFNLEdBQUdELE9BQU8sQ0FBQ1AsTUFBTSxDQUFDQyxJQUFQLENBQVlNLE9BQVosRUFBcUIsQ0FBckIsQ0FBRCxDQUF0QjtBQUVBLFlBQU1FLGVBQWUsR0FBR0gsU0FBUyxHQUFDQSxTQUFELEdBQVcsbUNBQWlCTixNQUFNLENBQUNDLElBQVAsQ0FBWUgsUUFBWixFQUFzQixDQUF0QixDQUFqQixDQUE1QyxDQU5PLENBUVA7O0FBQ0EsNEJBQ0U7QUFBSyxVQUFBLFNBQVMsRUFBQztBQUFmLHdCQUNFLGdDQUFDLGlCQUFEO0FBQW1CLFVBQUEsUUFBUSxFQUFFQSxRQUE3QjtBQUF1QyxVQUFBLGdCQUFnQixFQUFFLEtBQUtPLEtBQUwsQ0FBV0s7QUFBcEUsVUFERixlQUVFLGdDQUFDLGtDQUFELE9BRkYsZUFHRSxnQ0FBQyxrQ0FBRCxxQkFDSSxnQ0FBQyxZQUFEO0FBQ0UsVUFBQSxTQUFTLEVBQUVELGVBRGIsQ0FFRTtBQUNBO0FBSEY7QUFJRSxVQUFBLEdBQUcsRUFBSVQsTUFBTSxDQUFDQyxJQUFQLENBQVlNLE9BQVosRUFBcUIsQ0FBckIsQ0FKVDtBQUtFLFVBQUEsTUFBTSxFQUFFQyxNQUFNLEdBQUNBLE1BQUQsR0FBUSxtQ0FBaUJSLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxRQUFaLEVBQXNCLENBQXRCLENBQWpCLENBTHhCO0FBTUUsVUFBQSxTQUFTLEVBQUcsS0FBS08sS0FBTCxDQUFXTSxTQU56QjtBQU9FLFVBQUEsWUFBWSxFQUFFLEtBQUtOLEtBQUwsQ0FBV08sWUFQM0I7QUFRRSxVQUFBLFFBQVEsRUFBRWQ7QUFSWixVQURKLENBSEYsZUFnQkUsZ0NBQUMsd0JBQUQ7QUFDRSxVQUFBLFNBQVMsRUFBQyxzQkFEWixDQUVFO0FBRkY7QUFHRSxVQUFBLEtBQUssRUFBQyxPQUhSLENBSUU7QUFDQTs7QUFMRix3QkFRRSxnQ0FBQyw4QkFBRDtBQUFrQixVQUFBLEVBQUUsRUFBQztBQUFyQixVQVJGLENBaEJGLENBREY7QUE2QkQ7QUFqRUg7QUFBQTtBQUFBLElBQW9DZSxnQkFBcEMseURBQ3FCO0FBQ2pCZixJQUFBQSxRQUFRLEVBQUVnQixzQkFBVUMsTUFESDtBQUVqQkMsSUFBQUEsTUFBTSxFQUFFRixzQkFBVUcsT0FBVixDQUFrQkgsc0JBQVVJLEdBQTVCLEVBQWlDQyxVQUZ4QjtBQUdqQjtBQUNBO0FBQ0FQLElBQUFBLFlBQVksRUFBRUUsc0JBQVVNLElBQVYsQ0FBZUQsVUFMWjtBQU1qQjtBQUNBVCxJQUFBQSxnQkFBZ0IsRUFBRUksc0JBQVVNLElBUFg7QUFRakI7QUFDQUMsSUFBQUEsTUFBTSxFQUFFUCxzQkFBVUcsT0FBVixDQUFrQkgsc0JBQVVJLEdBQTVCO0FBVFMsR0FEckI7QUFtRUQ7O2VBRWMzQixxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnbG9jYWxpemF0aW9uJztcbmltcG9ydCB7QnV0dG9uLCBTaWRlUGFuZWxEaXZpZGVyLCBTaWRlUGFuZWxTZWN0aW9ufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge0FkZH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuLy8gaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi9jb21tb24vc291cmNlLWRhdGEtc2VsZWN0b3InO1xuaW1wb3J0IFByb2Nlc3NQYW5lbEZhY3RvcnkgZnJvbSAnLi9wcm9jZXNzLXBhbmVsL3Byb2Nlc3MtcGFuZWwnO1xuaW1wb3J0IHtERUZBVUxUX1BST0NFU1NPUl9TVFJVQ1RVUkUsIGdldERlZmF1bHRQcm9jZXNzb3J9IGZyb20gJy4uLy4uL3V0aWxzL3Byb2Nlc3Nvci11dGlscyc7XG5pbXBvcnQgU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5IGZyb20gJy4vY29tbW9uL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuaW1wb3J0IHtnZXREZWZhdWx0RmlsdGVyfSBmcm9tICcuLi8uLi91dGlscy9maWx0ZXItdXRpbHMnO1xuLy8gaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi9jb21tb24vc291cmNlLWRhdGEtc2VsZWN0b3InO1xuXG5Qcm9jZXNzTWFuYWdlckZhY3RvcnkuZGVwcyA9IFtTb3VyY2VEYXRhQ2F0YWxvZ0ZhY3RvcnksIFByb2Nlc3NQYW5lbEZhY3RvcnldO1xuXG5mdW5jdGlvbiBQcm9jZXNzTWFuYWdlckZhY3RvcnkoU291cmNlRGF0YUNhdGFsb2csIFByb2Nlc3NQYW5lbCkge1xuXG4gIHJldHVybiBjbGFzcyBQcm9jZXNzTWFuYWdlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgLy8gYWRkUHJvY2Vzc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgLy8gcmVtb3ZlUHJvY2Vzc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0UHJvY2Vzc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgLy8gcHJvY2Vzc29yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIHNob3dEYXRhc2V0VGFibGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgLy8gZmllbGRzIGNhbiBiZSB1bmRlZmluZWQgd2hlbiBkYXRhc2V0IGlzIG5vdCBzZWxlY3RlZFxuICAgICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICAgIH07XG5cbiAgICAvKiBzZWxlY3RvcnMgKi9cbiAgICBkYXRhc2V0c1NlbGVjdG9yID0gc3RhdGUgPT4gc3RhdGUuZGF0YXNldHM7XG5cbiAgICBkZWZhdWx0RGF0YXNldFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmRhdGFzZXRzU2VsZWN0b3IsXG4gICAgICBkYXRhc2V0cyA9PiAoT2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhkYXRhc2V0cylbMF0pIHx8IG51bGxcbiAgICApO1xuXG4gICAgLyogYWN0aW9ucyAqL1xuICAgIC8vIF9hZGRQcm9jZXNzb3IgPSAoKSA9PiB7XG4gICAgLy8gICBjb25zdCBkZWZhdWx0RGF0YXNldCA9IHRoaXMuZGVmYXVsdERhdGFzZXRTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAvLyAgIHRoaXMucHJvcHMuYWRkUHJvY2Vzc29yKGRlZmF1bHREYXRhc2V0KTtcbiAgICAvLyB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc29sZS5sb2coJ3JlbmRlciBwcm9jZXNzIG1hbmFnZXInKVxuICAgICAgY29uc3Qge3Byb2Nlc3NvcixmaWx0ZXJzLGRhdGFzZXRzfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IGZpbHRlciA9IGZpbHRlcnNbT2JqZWN0LmtleXMoZmlsdGVycylbMF1dXG5cbiAgICAgIGNvbnN0IGV4aXN0X3Byb2Nlc3NvciA9IHByb2Nlc3Nvcj9wcm9jZXNzb3I6Z2V0RGVmYXVsdEZpbHRlcihPYmplY3Qua2V5cyhkYXRhc2V0cylbMF0pXG5cbiAgICAgIC8vIGNvbnN0IGhhZEVtcHR5UHJvY2Vzc29yID0gcHJvY2Vzc29ycy5zb21lKGYgPT4gIWYubmFtZSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2Nlc3MtbWFuYWdlclwiPlxuICAgICAgICAgIDxTb3VyY2VEYXRhQ2F0YWxvZyBkYXRhc2V0cz17ZGF0YXNldHN9IHNob3dEYXRhc2V0VGFibGU9e3RoaXMucHJvcHMuc2hvd0RhdGFzZXRUYWJsZX0gLz5cbiAgICAgICAgICA8U2lkZVBhbmVsRGl2aWRlciAvPlxuICAgICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAgICA8UHJvY2Vzc1BhbmVsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc29yPXtleGlzdF9wcm9jZXNzb3J9XG4gICAgICAgICAgICAgICAgLy8gaG93IHRvIHNldCBwcm9jZXNzb3IgaGVyZTpcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzb3I9e3Byb2Nlc3Nvcn1cbiAgICAgICAgICAgICAgICBpZHggPSB7T2JqZWN0LmtleXMoZmlsdGVycylbMF19XG4gICAgICAgICAgICAgICAgZmlsdGVyPXtmaWx0ZXI/ZmlsdGVyOmdldERlZmF1bHRGaWx0ZXIoT2JqZWN0LmtleXMoZGF0YXNldHMpWzBdKX1cbiAgICAgICAgICAgICAgICBzZXRGaWx0ZXIgPXt0aGlzLnByb3BzLnNldEZpbHRlcn1cbiAgICAgICAgICAgICAgICBzZXRQcm9jZXNzb3I9e3RoaXMucHJvcHMuc2V0UHJvY2Vzc29yfVxuICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhZGQtcHJvY2Vzc29yLWJ1dHRvblwiXG4gICAgICAgICAgICAvLyBpbmFjdGl2ZT17aGFkRW1wdHlQcm9jZXNzb3IgfHwgIWhhZERhdGFzZXR9XG4gICAgICAgICAgICB3aWR0aD1cIjEwNXB4XCJcbiAgICAgICAgICAgIC8vIG9uQ2xpY2s9e3RoaXMuX2FkZFByb2Nlc3Nvcn1cbiAgICAgICAgICAgIC8vIG9uQ2xpY2s9e3RoaXMuX2dlb21Qcm9jZXNzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsvKjxBZGQgaGVpZ2h0PVwiMTJweFwiIC8+Ki99XG4gICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD0nUHJvY2VzcycgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc01hbmFnZXJGYWN0b3J5O1xuXG5cbiJdfQ==