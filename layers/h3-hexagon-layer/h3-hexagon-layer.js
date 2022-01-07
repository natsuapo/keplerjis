"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.HexagonIdVisConfigs = exports.defaultCoverage = exports.defaultElevation = exports.hexIdAccessor = exports.hexIdRequiredColumns = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _datasetUtils = require("../../utils/dataset-utils");

var _layers = require("@deck.gl/layers");

var _geoLayers = require("@deck.gl/geo-layers");

var _enhancedColumnLayer = _interopRequireDefault(require("../../deckgl-layers/column-layer/enhanced-column-layer"));

var _h3Utils = require("./h3-utils");

var _h3HexagonLayerIcon = _interopRequireDefault(require("./h3-hexagon-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _tableUtils = require("../../utils/table-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_LINE_SCALE_VALUE = 8;
var hexIdRequiredColumns = ['hex_id'];
exports.hexIdRequiredColumns = hexIdRequiredColumns;

var hexIdAccessor = function hexIdAccessor(_ref) {
  var hex_id = _ref.hex_id;
  return function (dc) {
    return function (d) {
      console.log('hexagon layer create');
      return dc.valueAt(d.index, hex_id.fieldIdx);
    };
  };
};

exports.hexIdAccessor = hexIdAccessor;
var defaultElevation = 500;
exports.defaultElevation = defaultElevation;
var defaultCoverage = 1;
exports.defaultCoverage = defaultCoverage;
var HexagonIdVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  coverage: 'coverage',
  enable3d: 'enable3d',
  sizeRange: 'elevationRange',
  coverageRange: 'coverageRange',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor'
};
exports.HexagonIdVisConfigs = HexagonIdVisConfigs;

var HexagonIdLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(HexagonIdLayer, _Layer);

  var _super = _createSuper(HexagonIdLayer);

  function HexagonIdLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HexagonIdLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(HexagonIdVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return hexIdAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(HexagonIdLayer, [{
    key: "type",
    get: function get() {
      return 'hexagonId';
    }
  }, {
    key: "name",
    get: function get() {
      return 'H3';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return hexIdRequiredColumns;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      // use hexagon layer icon for now
      return _h3HexagonLayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "visualChannels", this);
      return {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getFillColor'
        }),
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          property: 'height',
          accessor: 'getElevation',
          nullValue: 0,
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          defaultValue: defaultElevation
        }),
        coverage: {
          property: 'coverage',
          field: 'coverageField',
          scale: 'coverageScale',
          domain: 'coverageDomain',
          range: 'coverageRange',
          key: 'coverage',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.radius,
          accessor: 'getCoverage',
          nullValue: 0,
          defaultValue: defaultCoverage
        }
      };
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(dataset) {
      console.log('set initial layer config');
      var defaultColorField = (0, _datasetUtils.findDefaultColorField)(dataset);

      if (defaultColorField) {
        this.updateLayerConfig({
          colorField: defaultColorField
        });
        this.updateLayerVisualChannel(dataset, 'color');
      }

      return this;
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add height visual channel
        coverageField: null,
        coverageDomain: [0, 1],
        coverageScale: 'linear'
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getHexId) {
      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var id = getHexId({
          index: index
        });
        var centroid = this.dataToFeature.centroids[index];

        if (centroid) {
          data.push({
            index: index,
            id: id,
            centroid: centroid
          });
        }
      }

      return data;
    } // TODO: fix complexity

    /* eslint-disable complexity */

  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getHexId = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getHexId: getHexId,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      }, accessors);
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getHexId) {
      console.log('update layer meta');
      var centroids = dataContainer.map(function (d, index) {
        var id = getHexId({
          index: index
        });

        if (!(0, _h3Utils.h3IsValid)(id)) {
          return null;
        } // save a reference of centroids to dataToFeature
        // so we don't have to re calculate it again


        return (0, _h3Utils.getCentroid)({
          id: id
        });
      }, true);
      var centroidsDataContainer = (0, _tableUtils.createDataContainer)(centroids);
      var bounds = this.getPointsBounds(centroidsDataContainer, function (d, dc) {
        return [dc.valueAt(d.index, 0), dc.valueAt(d.index, 1)];
      });
      this.dataToFeature = {
        centroids: centroids
      };
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      console.log('render h3layer');
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var config = this.config;
      var visConfig = config.visConfig;
      var updateTriggers = this.getVisualChannelUpdateTriggers();
      var h3HexagonLayerTriggers = {
        getHexagon: this.config.columns,
        getFillColor: updateTriggers.getFillColor,
        getElevation: updateTriggers.getElevation,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      };
      var columnLayerTriggers = {
        getCoverage: updateTriggers.getCoverage
      };
      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _geoLayers.H3HexagonLayer(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), data), {}, {
        wrapLongitude: false,
        getHexagon: function getHexagon(x) {
          return x.id;
        },
        // coverage
        coverage: config.coverageField ? 1 : visConfig.coverage,
        // highlight
        autoHighlight: visConfig.enable3d,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        // render
        updateTriggers: h3HexagonLayerTriggers,
        _subLayerProps: {
          'hexagon-cell': {
            type: _enhancedColumnLayer["default"],
            getCoverage: data.getCoverage,
            updateTriggers: columnLayerTriggers
          }
        }
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !config.sizeField ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        data: [(0, _h3Utils.idToPolygonGeo)(hoveredObject)],
        getLineColor: config.highlightColor,
        lineWidthScale: DEFAULT_LINE_SCALE_VALUE * zoomFactor,
        wrapLongitude: false
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fields = _ref3.fields,
          fields = _ref3$fields === void 0 ? [] : _ref3$fields,
          dataContainer = _ref3.dataContainer;
      var hexFields = (0, _h3Utils.getHexFields)(fields, dataContainer);

      if (!hexFields.length) {
        return {
          props: []
        };
      }

      return {
        props: hexFields.map(function (f) {
          return {
            isVisible: true,
            label: f.displayName || f.name,
            columns: {
              hex_id: {
                value: f.name,
                fieldIdx: fields.findIndex(function (fid) {
                  return fid.name === f.name;
                })
              }
            }
          };
        })
      };
    }
  }]);
  return HexagonIdLayer;
}(_baseLayer["default"]);

exports["default"] = HexagonIdLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaDMtaGV4YWdvbi1sYXllci9oMy1oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfTElORV9TQ0FMRV9WQUxVRSIsImhleElkUmVxdWlyZWRDb2x1bW5zIiwiaGV4SWRBY2Nlc3NvciIsImhleF9pZCIsImRjIiwiZCIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZUF0IiwiaW5kZXgiLCJmaWVsZElkeCIsImRlZmF1bHRFbGV2YXRpb24iLCJkZWZhdWx0Q292ZXJhZ2UiLCJIZXhhZ29uSWRWaXNDb25maWdzIiwib3BhY2l0eSIsImNvbG9yUmFuZ2UiLCJjb3ZlcmFnZSIsImVuYWJsZTNkIiwic2l6ZVJhbmdlIiwiY292ZXJhZ2VSYW5nZSIsImVsZXZhdGlvblNjYWxlIiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsIkhleGFnb25JZExheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJkYXRhQ29udGFpbmVyIiwiY29uZmlnIiwiY29sdW1ucyIsIkgzSGV4YWdvbkxheWVySWNvbiIsInZpc3VhbENoYW5uZWxzIiwiY29sb3IiLCJhY2Nlc3NvciIsInNpemUiLCJwcm9wZXJ0eSIsIm51bGxWYWx1ZSIsImNvbmRpdGlvbiIsInZpc0NvbmZpZyIsImRlZmF1bHRWYWx1ZSIsImZpZWxkIiwic2NhbGUiLCJkb21haW4iLCJyYW5nZSIsImtleSIsImNoYW5uZWxTY2FsZVR5cGUiLCJDSEFOTkVMX1NDQUxFUyIsInJhZGl1cyIsImRhdGFzZXQiLCJkZWZhdWx0Q29sb3JGaWVsZCIsInVwZGF0ZUxheWVyQ29uZmlnIiwiY29sb3JGaWVsZCIsInVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbCIsImNvdmVyYWdlRmllbGQiLCJjb3ZlcmFnZURvbWFpbiIsImNvdmVyYWdlU2NhbGUiLCJnZXRIZXhJZCIsImZpbHRlcmVkSW5kZXgiLCJkYXRhIiwiaSIsImxlbmd0aCIsImlkIiwiY2VudHJvaWQiLCJkYXRhVG9GZWF0dXJlIiwiY2VudHJvaWRzIiwicHVzaCIsImRhdGFzZXRzIiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiZGF0YUlkIiwiZ3B1RmlsdGVyIiwidXBkYXRlRGF0YSIsImFjY2Vzc29ycyIsImdldEF0dHJpYnV0ZUFjY2Vzc29ycyIsImdldEZpbHRlclZhbHVlIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsIm1hcCIsImNlbnRyb2lkc0RhdGFDb250YWluZXIiLCJib3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ1cGRhdGVNZXRhIiwib3B0cyIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwiZWxlWm9vbUZhY3RvciIsImdldEVsZXZhdGlvblpvb21GYWN0b3IiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImgzSGV4YWdvbkxheWVyVHJpZ2dlcnMiLCJnZXRIZXhhZ29uIiwiZ2V0RmlsbENvbG9yIiwiZ2V0RWxldmF0aW9uIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsImNvbHVtbkxheWVyVHJpZ2dlcnMiLCJnZXRDb3ZlcmFnZSIsImRlZmF1bHRMYXllclByb3BzIiwiZ2V0RGVmYXVsdERlY2tMYXllclByb3BzIiwiaG92ZXJlZE9iamVjdCIsImhhc0hvdmVyZWRPYmplY3QiLCJIM0hleGFnb25MYXllciIsIndyYXBMb25naXR1ZGUiLCJ4IiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJleHRydWRlZCIsIl9zdWJMYXllclByb3BzIiwidHlwZSIsIkVuaGFuY2VkQ29sdW1uTGF5ZXIiLCJzaXplRmllbGQiLCJHZW9Kc29uTGF5ZXIiLCJnZXREZWZhdWx0SG92ZXJMYXllclByb3BzIiwiZ2V0TGluZUNvbG9yIiwibGluZVdpZHRoU2NhbGUiLCJmaWVsZHMiLCJoZXhGaWVsZHMiLCJmIiwiaXNWaXNpYmxlIiwi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QUFTLEVBQUUsSUFEYztBQUV6QkMsWUFBQUEsS0FBSyxFQUFFRixDQUFDLENBQUNHLFdBQUYsSUFBaUJILENBQUMsQ0FBQ0ksSUFGRDtBQUd6QjdGLFlBQUFBLE9BQU8sRUFBRTtBQUNQekIsY0FBQUEsTUFBTSxFQUFFO0FBQ051SCxnQkFBQUEsS0FBSyxFQUFFTCxDQUFDLENBQUNJLElBREg7QUFFTi9HLGdCQUFBQSxRQUFRLEVBQUV5RyxNQUFNLENBQUNRLFNBQVAsQ0FBaUIsVUFBQUMsR0FBRztBQUFBLHlCQUFJQSxHQUFHLENBQUNILElBQUosS0FBYUosQ0FBQyxDQUFDSSxJQUFuQjtBQUFBLGlCQUFwQjtBQUZKO0FBREQ7QUFIZ0IsV0FBTDtBQUFBLFNBQWY7QUFERixPQUFQO0FBWUQ7OztFQXhGeUNJLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtmaW5kRGVmYXVsdENvbG9yRmllbGR9IGZyb20gJ3V0aWxzL2RhdGFzZXQtdXRpbHMnO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5pbXBvcnQge0gzSGV4YWdvbkxheWVyfSBmcm9tICdAZGVjay5nbC9nZW8tbGF5ZXJzJztcbmltcG9ydCBFbmhhbmNlZENvbHVtbkxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvY29sdW1uLWxheWVyL2VuaGFuY2VkLWNvbHVtbi1sYXllcic7XG5pbXBvcnQge2dldENlbnRyb2lkLCBpZFRvUG9seWdvbkdlbywgaDNJc1ZhbGlkLCBnZXRIZXhGaWVsZHN9IGZyb20gJy4vaDMtdXRpbHMnO1xuaW1wb3J0IEgzSGV4YWdvbkxheWVySWNvbiBmcm9tICcuL2gzLWhleGFnb24tbGF5ZXItaWNvbic7XG5pbXBvcnQge0NIQU5ORUxfU0NBTEVTLCBISUdITElHSF9DT0xPUl8zRH0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge2NyZWF0ZURhdGFDb250YWluZXJ9IGZyb20gJ3V0aWxzL3RhYmxlLXV0aWxzJztcblxuY29uc3QgREVGQVVMVF9MSU5FX1NDQUxFX1ZBTFVFID0gODtcblxuZXhwb3J0IGNvbnN0IGhleElkUmVxdWlyZWRDb2x1bW5zID0gWydoZXhfaWQnXTtcbmV4cG9ydCBjb25zdCBoZXhJZEFjY2Vzc29yID0gKHtoZXhfaWR9KSA9PiBkYyA9PiBkID0+IHtcbiAgY29uc29sZS5sb2coJ2hleGFnb24gbGF5ZXIgY3JlYXRlJylcbiAgcmV0dXJuIGRjLnZhbHVlQXQoZC5pbmRleCwgaGV4X2lkLmZpZWxkSWR4KX07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RWxldmF0aW9uID0gNTAwO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb3ZlcmFnZSA9IDE7XG5cbmV4cG9ydCBjb25zdCBIZXhhZ29uSWRWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgY292ZXJhZ2U6ICdjb3ZlcmFnZScsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnLFxuICBzaXplUmFuZ2U6ICdlbGV2YXRpb25SYW5nZScsXG4gIGNvdmVyYWdlUmFuZ2U6ICdjb3ZlcmFnZVJhbmdlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG4gIGVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3I6ICdlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGV4YWdvbklkTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoSGV4YWdvbklkVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yID0gZGF0YUNvbnRhaW5lciA9PiBoZXhJZEFjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdoZXhhZ29uSWQnO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdIMyc7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGhleElkUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICAvLyB1c2UgaGV4YWdvbiBsYXllciBpY29uIGZvciBub3dcbiAgICByZXR1cm4gSDNIZXhhZ29uTGF5ZXJJY29uO1xuICB9XG5cblxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVscyA9IHN1cGVyLnZpc3VhbENoYW5uZWxzO1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRGaWxsQ29sb3InXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RWxldmF0aW9uJyxcbiAgICAgICAgbnVsbFZhbHVlOiAwLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRFbGV2YXRpb25cbiAgICAgIH0sXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm9wZXJ0eTogJ2NvdmVyYWdlJyxcbiAgICAgICAgZmllbGQ6ICdjb3ZlcmFnZUZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdjb3ZlcmFnZVNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnY292ZXJhZ2VEb21haW4nLFxuICAgICAgICByYW5nZTogJ2NvdmVyYWdlUmFuZ2UnLFxuICAgICAgICBrZXk6ICdjb3ZlcmFnZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnJhZGl1cyxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRDb3ZlcmFnZScsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0Q292ZXJhZ2VcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc2V0SW5pdGlhbExheWVyQ29uZmlnKGRhdGFzZXQpIHtcbiAgICBjb25zb2xlLmxvZygnc2V0IGluaXRpYWwgbGF5ZXIgY29uZmlnJylcbiAgICBjb25zdCBkZWZhdWx0Q29sb3JGaWVsZCA9IGZpbmREZWZhdWx0Q29sb3JGaWVsZChkYXRhc2V0KTtcblxuICAgIGlmIChkZWZhdWx0Q29sb3JGaWVsZCkge1xuICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7XG4gICAgICAgIGNvbG9yRmllbGQ6IGRlZmF1bHRDb2xvckZpZWxkXG4gICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKGRhdGFzZXQsICdjb2xvcicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRzID0gW10sIGRhdGFDb250YWluZXJ9KSB7XG4gICAgY29uc3QgaGV4RmllbGRzID0gZ2V0SGV4RmllbGRzKGZpZWxkcywgZGF0YUNvbnRhaW5lcik7XG4gICAgaWYgKCFoZXhGaWVsZHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge3Byb3BzOiBbXX07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiBoZXhGaWVsZHMubWFwKGYgPT4gKHtcbiAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgICBsYWJlbDogZi5kaXNwbGF5TmFtZSB8fCBmLm5hbWUsXG4gICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICBoZXhfaWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmLm5hbWUsXG4gICAgICAgICAgICBmaWVsZElkeDogZmllbGRzLmZpbmRJbmRleChmaWQgPT4gZmlkLm5hbWUgPT09IGYubmFtZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgaGVpZ2h0IHZpc3VhbCBjaGFubmVsXG4gICAgICBjb3ZlcmFnZUZpZWxkOiBudWxsLFxuICAgICAgY292ZXJhZ2VEb21haW46IFswLCAxXSxcbiAgICAgIGNvdmVyYWdlU2NhbGU6ICdsaW5lYXInXG4gICAgfTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRIZXhJZCkge1xuICAgIGNvbnN0IGRhdGEgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5kZXggPSBmaWx0ZXJlZEluZGV4W2ldO1xuICAgICAgY29uc3QgaWQgPSBnZXRIZXhJZCh7aW5kZXh9KTtcbiAgICAgIGNvbnN0IGNlbnRyb2lkID0gdGhpcy5kYXRhVG9GZWF0dXJlLmNlbnRyb2lkc1tpbmRleF07XG5cbiAgICAgIGlmIChjZW50cm9pZCkge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIGNlbnRyb2lkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8vIFRPRE86IGZpeCBjb21wbGV4aXR5XG4gIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEsIG9wdCA9IHt9KSB7XG4gICAgY29uc3Qge2dwdUZpbHRlciwgZGF0YUNvbnRhaW5lcn0gPSBkYXRhc2V0c1t0aGlzLmNvbmZpZy5kYXRhSWRdO1xuICAgIGNvbnN0IGdldEhleElkID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMudXBkYXRlRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKTtcbiAgICBjb25zdCBhY2Nlc3NvcnMgPSB0aGlzLmdldEF0dHJpYnV0ZUFjY2Vzc29ycyh7ZGF0YUNvbnRhaW5lcn0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRIZXhJZCxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKSgpLFxuICAgICAgLi4uYWNjZXNzb3JzXG4gICAgfTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lciwgZ2V0SGV4SWQpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlIGxheWVyIG1ldGEnKVxuICAgIGNvbnN0IGNlbnRyb2lkcyA9IGRhdGFDb250YWluZXIubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBnZXRIZXhJZCh7aW5kZXh9KTtcbiAgICAgIGlmICghaDNJc1ZhbGlkKGlkKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIHNhdmUgYSByZWZlcmVuY2Ugb2YgY2VudHJvaWRzIHRvIGRhdGFUb0ZlYXR1cmVcbiAgICAgIC8vIHNvIHdlIGRvbid0IGhhdmUgdG8gcmUgY2FsY3VsYXRlIGl0IGFnYWluXG4gICAgICByZXR1cm4gZ2V0Q2VudHJvaWQoe2lkfSk7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICBjb25zdCBjZW50cm9pZHNEYXRhQ29udGFpbmVyID0gY3JlYXRlRGF0YUNvbnRhaW5lcihjZW50cm9pZHMpO1xuXG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoY2VudHJvaWRzRGF0YUNvbnRhaW5lciwgKGQsIGRjKSA9PiB7XG4gICAgICByZXR1cm4gW2RjLnZhbHVlQXQoZC5pbmRleCwgMCksIGRjLnZhbHVlQXQoZC5pbmRleCwgMSldO1xuICAgIH0pO1xuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IHtjZW50cm9pZHN9O1xuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzfSk7XG4gIH1cblxuICByZW5kZXJMYXllcihvcHRzKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlciBoM2xheWVyJylcbiAgICBjb25zdCB7ZGF0YSwgZ3B1RmlsdGVyLCBvYmplY3RIb3ZlcmVkLCBtYXBTdGF0ZX0gPSBvcHRzO1xuXG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3QgZWxlWm9vbUZhY3RvciA9IHRoaXMuZ2V0RWxldmF0aW9uWm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qge2NvbmZpZ30gPSB0aGlzO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gY29uZmlnO1xuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0gdGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKTtcblxuICAgIGNvbnN0IGgzSGV4YWdvbkxheWVyVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRIZXhhZ29uOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgZ2V0RmlsbENvbG9yOiB1cGRhdGVUcmlnZ2Vycy5nZXRGaWxsQ29sb3IsXG4gICAgICBnZXRFbGV2YXRpb246IHVwZGF0ZVRyaWdnZXJzLmdldEVsZXZhdGlvbixcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2Vyc1xuICAgIH07XG5cbiAgICBjb25zdCBjb2x1bW5MYXllclRyaWdnZXJzID0ge1xuICAgICAgZ2V0Q292ZXJhZ2U6IHVwZGF0ZVRyaWdnZXJzLmdldENvdmVyYWdlXG4gICAgfTtcblxuICAgIGNvbnN0IGRlZmF1bHRMYXllclByb3BzID0gdGhpcy5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG4gICAgY29uc3QgaG92ZXJlZE9iamVjdCA9IHRoaXMuaGFzSG92ZXJlZE9iamVjdChvYmplY3RIb3ZlcmVkKTtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgSDNIZXhhZ29uTGF5ZXIoe1xuICAgICAgICAuLi5kZWZhdWx0TGF5ZXJQcm9wcyxcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG5cbiAgICAgICAgZ2V0SGV4YWdvbjogeCA9PiB4LmlkLFxuXG4gICAgICAgIC8vIGNvdmVyYWdlXG4gICAgICAgIGNvdmVyYWdlOiBjb25maWcuY292ZXJhZ2VGaWVsZCA/IDEgOiB2aXNDb25maWcuY292ZXJhZ2UsXG5cbiAgICAgICAgLy8gaGlnaGxpZ2h0XG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgaGlnaGxpZ2h0Q29sb3I6IEhJR0hMSUdIX0NPTE9SXzNELFxuXG4gICAgICAgIC8vIGVsZXZhdGlvblxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IGgzSGV4YWdvbkxheWVyVHJpZ2dlcnMsXG4gICAgICAgIF9zdWJMYXllclByb3BzOiB7XG4gICAgICAgICAgJ2hleGFnb24tY2VsbCc6IHtcbiAgICAgICAgICAgIHR5cGU6IEVuaGFuY2VkQ29sdW1uTGF5ZXIsXG4gICAgICAgICAgICBnZXRDb3ZlcmFnZTogZGF0YS5nZXRDb3ZlcmFnZSxcbiAgICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzOiBjb2x1bW5MYXllclRyaWdnZXJzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIC4uLihob3ZlcmVkT2JqZWN0ICYmICFjb25maWcuc2l6ZUZpZWxkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgICBkYXRhOiBbaWRUb1BvbHlnb25HZW8oaG92ZXJlZE9iamVjdCldLFxuICAgICAgICAgICAgICBnZXRMaW5lQ29sb3I6IGNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IERFRkFVTFRfTElORV9TQ0FMRV9WQUxVRSAqIHpvb21GYWN0b3IsXG4gICAgICAgICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=