"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MeshCodeVisConfigs = exports.defaultCoverage = exports.defaultElevation = exports.meshCodeAccessor = exports.meshCodeRequiredColumns = void 0;

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

var _enhancedColumnLayer = _interopRequireDefault(require("../../deckgl-layers/column-layer/enhanced-column-layer"));

var _keplerJismeshLayerIcon = _interopRequireDefault(require("./kepler-jismesh-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _tableUtils = require("../../utils/table-utils");

var _jismeshLayerUtils = require("./jismesh-layer-utils");

var _jismeshUtils = require("../../utils/jismesh-utils");

var _deckJismeshLayer = _interopRequireDefault(require("./deck-jismesh-layer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_LINE_SCALE_VALUE = 8;
var meshCodeRequiredColumns = ['meshcode'];
exports.meshCodeRequiredColumns = meshCodeRequiredColumns;

var meshCodeAccessor = function meshCodeAccessor(x) {
  return function (dc) {
    return function (d) {
      console.log('meshCode accessor');
      var meshcode = x.meshcode;
      return dc.valueAt(d.index, meshcode.fieldIdx);
    };
  };
};

exports.meshCodeAccessor = meshCodeAccessor;
var defaultElevation = 500;
exports.defaultElevation = defaultElevation;
var defaultCoverage = 1;
exports.defaultCoverage = defaultCoverage;
var MeshCodeVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  coverage: 'coverage',
  enable3d: 'enable3d',
  sizeRange: 'elevationRange',
  coverageRange: 'coverageRange',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor'
};
exports.MeshCodeVisConfigs = MeshCodeVisConfigs;

var MeshcodeLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(MeshcodeLayer, _Layer);

  var _super = _createSuper(MeshcodeLayer);

  function MeshcodeLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MeshcodeLayer);
    console.log('meshcode layer create');
    _this = _super.call(this, props);

    _this.registerVisConfig(MeshCodeVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return meshCodeAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(MeshcodeLayer, [{
    key: "type",
    get: function get() {
      return 'meshcode';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Meshcode';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return ['meshcode'];
    }
  }, {
    key: "layerIcon",
    get: function get() {
      // use hexagon layer icon for now
      return _keplerJismeshLayerIcon["default"];
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref, getMeshCode) {
      var dataContainer = _ref.dataContainer,
          filteredIndex = _ref.filteredIndex;
      console.log('calculate layer');
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var id = getMeshCode({
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
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(MeshcodeLayer.prototype), "visualChannels", this);
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
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(MeshcodeLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add height visual channel
        coverageField: null,
        coverageDomain: [0, 1],
        coverageScale: 'linear'
      });
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      console.log('format layer data here');
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getMeshCode = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getMeshCode: getMeshCode,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      }, accessors);
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getMeshCode) {
      var centroids = dataContainer.map(function (d, index) {
        console.log('data to feature example');
        var id = getMeshCode({
          index: index
        });

        if (!(0, _jismeshUtils.meshIsValid)(id)) {
          return null;
        }

        console.log('centroid generation'); // save a reference of centroids to dataToFeature
        // so we don't have to re calculate it again

        return (0, _jismeshUtils.getCentroid)({
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
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var config = this.config;
      var visConfig = config.visConfig;
      var updateTriggers = this.getVisualChannelUpdateTriggers();
      var meshCodeLayerTriggers = {
        getMeshCode: this.config.columns,
        getFillColor: updateTriggers.getFillColor,
        getElevation: updateTriggers.getElevation,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      }; //if to include coverage or not;

      var columnLayerTriggers = {
        getCoverage: updateTriggers.getCoverage
      };
      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _deckJismeshLayer["default"](_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), data), {}, {
        wrapLongitude: false,
        getMeshCode: function getMeshCode(x) {
          return x.id;
        },
        lineWidth: 1,
        // coverage
        coverage: config.coverageField ? 1 : visConfig.coverage,
        // highlight
        autoHighlight: visConfig.enable3d,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        // render
        updateTriggers: meshCodeLayerTriggers,
        _subLayerProps: {
          'meshcode-cell': {
            type: _enhancedColumnLayer["default"],
            getCoverage: data.getCoverage,
            updateTriggers: columnLayerTriggers
          }
        }
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !config.sizeField ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        data: [(0, _jismeshLayerUtils.meshToPolygonGeo)(hoveredObject)],
        getLineColor: config.highlightColor,
        lineWidthScale: DEFAULT_LINE_SCALE_VALUE * zoomFactor,
        wrapLongitude: false
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref2) {
      var _ref2$fields = _ref2.fields,
          fields = _ref2$fields === void 0 ? [] : _ref2$fields,
          dataContainer = _ref2.dataContainer;
      var meshFields = (0, _jismeshLayerUtils.getJISMeshFields)(fields, dataContainer);

      if (!meshFields.length) {
        return {
          props: []
        };
      }

      return {
        props: meshFields.map(function (f) {
          return {
            isVisible: true,
            label: f.displayName || f.name,
            columns: {
              meshcode: {
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
  return MeshcodeLayer;
}(_baseLayer["default"]); //idToPolygonGeo
// import {getCentroid, idToPolygonGeo, h3IsValid, getHexFields} from './h3-utils';


exports["default"] = MeshcodeLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1sYXllci9rZXBsZXItamlzbWVzaC1sYXllci5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0xJTkVfU0NBTEVfVkFMVUUiLCJtZXNoQ29kZVJlcXVpcmVkQ29sdW1ucyIsIm1lc2hDb2RlQWNjZXNzb3IiLCJ4IiwiZGMiLCJkIiwiY29uc29sZSIsImxvZyIsIm1lc2hjb2RlIiwidmFsdWVBdCIsImluZGV4IiwiZmllbGRJZHgiLCJkZWZhdWx0RWxldmF0aW9uIiwiZGVmYXVsdENvdmVyYWdlIiwiTWVzaENvZGVWaXNDb25maWdzIiwib3BhY2l0eSIsImNvbG9yUmFuZ2UiLCJjb3ZlcmFnZSIsImVuYWJsZTNkIiwic2l6ZVJhbmdlIiwiY292ZXJhZ2VSYW5nZSIsImVsZXZhdGlvblNjYWxlIiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsIk1lc2hjb2RlTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiS2VwbGVySmlzbWVzaExheWVySWNvbiIsImdldE1lc2hDb2RlIiwiZmlsdGVyZWRJbmRleCIsImRhdGEiLCJpIiwibGVuZ3RoIiwiaWQiLCJjZW50cm9pZCIsImRhdGFUb0ZlYXR1cmUiLCJjZW50cm9pZHMiLCJwdXNoIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsImFjY2Vzc29yIiwic2l6ZSIsInByb3BlcnR5IiwibnVsbFZhbHVlIiwiY29uZGl0aW9uIiwidmlzQ29uZmlnIiwiZGVmYXVsdFZhbHVlIiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwia2V5IiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwicmFkaXVzIiwiZGF0YXNldCIsImRlZmF1bHRDb2xvckZpZWxkIiwidXBkYXRlTGF5ZXJDb25maWciLCJjb2xvckZpZWxkIiwidXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsIiwiY292ZXJhZ2VGaWVsZCIsImNvdmVyYWdlRG9tYWluIiwiY292ZXJhZ2VTY2FsZSIsImRhdGFzZXRzIiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiZGF0YUlkIiwiZ3B1RmlsdGVyIiwidXBkYXRlRGF0YSIsImFjY2Vzc29ycyIsImdldEF0dHJpYnV0ZUFjY2Vzc29ycyIsImdldEZpbHRlclZhbHVlIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsIm1hcCIsImNlbnRyb2lkc0RhdGFDb250YWluZXIiLCJib3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ1cGRhdGVNZXRhIiwib3B0cyIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwiZWxlWm9vbUZhY3RvciIsImdldEVsZXZhdGlvblpvb21GYWN0b3IiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsIm1lc2hDb2RlTGF5ZXJUcmlnZ2VycyIsImdldEZpbGxDb2xvciIsImdldEVsZXZhdGlvbiIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJjb2x1bW5MYXllclRyaWdnZXJzIiwiZ2V0Q292ZXJhZ2UiLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsImhvdmVyZWRPYmplY3QiLCJoYXNIb3ZlcmVkT2JqZWN0IiwiRGVja0ppc21lc2hMYXllciIsIndyYXBMb25naXR1ZGUiLCJsaW5lV2lkdGgiLCJhdXRvSGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q29sb3IiLCJISUdITElHSF9DT0xPUl8zRCIsImV4dHJ1ZGVkIiwiX3N1YkxheWVyUHJvcHMiLCJ0eXBlIiwiRW5oYW5jZWRDb2x1bW5MYXllciIsInNpemVGaWVsZCIsIkdlb0pzb25MYXllciIsImdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMiLCJnZXRMaW5lQ29sb3IiLCJsaW5lV2lkdGhTY2FsZSIsImZpZWxkcyIsIm1lc2hGaWVsZHMiLCJmIiwiaXNWaXNpYmxlIiwibGFiZWwiLCJkaXNwbGF5TmFtZSIsIm5hbWUiLCJ2YWx1ZSIsImZpbmRJbmRleCIsImZpZCIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUlBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBR0EsSUFBTUEsd0JBQXdCLEdBQUcsQ0FBakM7QUFHTyxJQUFNQyx1QkFBdUIsR0FBRyxDQUFDLFVBQUQsQ0FBaEM7OztBQUVBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsQ0FBRDtBQUFBLFNBQU8sVUFBQUMsRUFBRTtBQUFBLFdBQUksVUFBQUMsQ0FBQyxFQUFJO0FBQ2hEQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBLFVBQU1DLFFBQVEsR0FBR0wsQ0FBQyxDQUFDSyxRQUFuQjtBQUNBLGFBQU9KLEVBQUUsQ0FBQ0ssT0FBSCxDQUFXSixDQUFDLENBQUNLLEtBQWIsRUFBb0JGLFFBQVEsQ0FBQ0csUUFBN0IsQ0FBUDtBQUE4QyxLQUhQO0FBQUEsR0FBVDtBQUFBLENBQXpCOzs7QUFLQSxJQUFNQyxnQkFBZ0IsR0FBRyxHQUF6Qjs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsQ0FBeEI7O0FBR0EsSUFBTUMsa0JBQWtCLEdBQUc7QUFDaENDLEVBQUFBLE9BQU8sRUFBRSxTQUR1QjtBQUVoQ0MsRUFBQUEsVUFBVSxFQUFFLFlBRm9CO0FBR2hDQyxFQUFBQSxRQUFRLEVBQUUsVUFIc0I7QUFJaENDLEVBQUFBLFFBQVEsRUFBRSxVQUpzQjtBQUtoQ0MsRUFBQUEsU0FBUyxFQUFFLGdCQUxxQjtBQU1oQ0MsRUFBQUEsYUFBYSxFQUFFLGVBTmlCO0FBT2hDQyxFQUFBQSxjQUFjLEVBQUUsZ0JBUGdCO0FBUWhDQyxFQUFBQSx5QkFBeUIsRUFBRTtBQVJLLENBQTNCOzs7SUFXY0MsYTs7Ozs7QUFDbkIseUJBQVlDLEtBQVosRUFBbUI7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LEVBQXlCeEYsYUFBekIsQ0FBbkI7O0FBQ0EsVUFBSSxDQUFDeUYsVUFBVSxDQUFDakYsTUFBaEIsRUFBd0I7QUFDdEIsZUFBTztBQUFDWCxVQUFBQSxLQUFLLEVBQUU7QUFBUixTQUFQO0FBQ0Q7O0FBRUQsYUFBTztBQUNMQSxRQUFBQSxLQUFLLEVBQUU0RixVQUFVLENBQUN4QyxHQUFYLENBQWUsVUFBQXlDLENBQUM7QUFBQSxpQkFBSztBQUMxQkMsWUFBQUEsU0FBUyxFQUFFLElBRGU7QUFFMUJDLFlBQUFBLEtBQUssRUFBRUYsQ0FBQyxDQUFDRyxXQUFGLElBQWlCSCxDQUFDLENBQUNJLElBRkE7QUFHMUI1RixZQUFBQSxPQUFPLEVBQUU7QUFDUHJCLGNBQUFBLFFBQVEsRUFBRTtBQUNSa0gsZ0JBQUFBLEtBQUssRUFBRUwsQ0FBQyxDQUFDSSxJQUREO0FBRVI5RyxnQkFBQUEsUUFBUSxFQUFFd0csTUFBTSxDQUFDUSxTQUFQLENBQWlCLFVBQUFDLEdBQUc7QUFBQSx5QkFBSUEsR0FBRyxDQUFDSCxJQUFKLEtBQWFKLENBQUMsQ0FBQ0ksSUFBbkI7QUFBQSxpQkFBcEI7QUFGRjtBQURIO0FBSGlCLFdBQUw7QUFBQSxTQUFoQjtBQURGLE9BQVA7QUFZRDs7O0VBNUd3Q0kscUIsR0FrUDNDO0FBSUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQge2ZpbmREZWZhdWx0Q29sb3JGaWVsZH0gZnJvbSAndXRpbHMvZGF0YXNldC11dGlscyc7XG5pbXBvcnQge0dlb0pzb25MYXllcn0gZnJvbSAnQGRlY2suZ2wvbGF5ZXJzJztcblxuaW1wb3J0IEVuaGFuY2VkQ29sdW1uTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9jb2x1bW4tbGF5ZXIvZW5oYW5jZWQtY29sdW1uLWxheWVyJztcblxuLy8gaW1wb3J0IHtnZXRDZW50cm9pZCwgaWRUb1BvbHlnb25HZW8sIGgzSXNWYWxpZCwgZ2V0SGV4RmllbGRzfSBmcm9tICcuL2gzLXV0aWxzJztcblxuaW1wb3J0IEtlcGxlckppc21lc2hMYXllckljb24gZnJvbSAnLi9rZXBsZXItamlzbWVzaC1sYXllci1pY29uJztcbmltcG9ydCB7Q0hBTk5FTF9TQ0FMRVMsIEhJR0hMSUdIX0NPTE9SXzNEfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmltcG9ydCB7Y3JlYXRlRGF0YUNvbnRhaW5lcn0gZnJvbSAndXRpbHMvdGFibGUtdXRpbHMnO1xuaW1wb3J0IHtnZXRKSVNNZXNoRmllbGRzLCBtZXNoVG9Qb2x5Z29uR2VvfSBmcm9tICcuL2ppc21lc2gtbGF5ZXItdXRpbHMnO1xuaW1wb3J0IHtnZXRDZW50cm9pZCwgbWVzaElzVmFsaWR9IGZyb20gJy4uLy4uL3V0aWxzL2ppc21lc2gtdXRpbHMnO1xuaW1wb3J0IERlY2tKaXNtZXNoTGF5ZXIgZnJvbSAnLi9kZWNrLWppc21lc2gtbGF5ZXInO1xuXG5cbmNvbnN0IERFRkFVTFRfTElORV9TQ0FMRV9WQUxVRSA9IDg7XG5cblxuZXhwb3J0IGNvbnN0IG1lc2hDb2RlUmVxdWlyZWRDb2x1bW5zID0gWydtZXNoY29kZSddO1xuXG5leHBvcnQgY29uc3QgbWVzaENvZGVBY2Nlc3NvciA9ICh4KSA9PiBkYyA9PiBkID0+IHtcbiAgY29uc29sZS5sb2coJ21lc2hDb2RlIGFjY2Vzc29yJyk7XG4gIGNvbnN0IG1lc2hjb2RlID0geC5tZXNoY29kZVxuICByZXR1cm4gZGMudmFsdWVBdChkLmluZGV4LCBtZXNoY29kZS5maWVsZElkeCl9O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEVsZXZhdGlvbiA9IDUwMDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0Q292ZXJhZ2UgPSAxO1xuXG5cbmV4cG9ydCBjb25zdCBNZXNoQ29kZVZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgZW5hYmxlM2Q6ICdlbmFibGUzZCcsXG4gIHNpemVSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgY292ZXJhZ2VSYW5nZTogJ2NvdmVyYWdlUmFuZ2UnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcjogJ2VuYWJsZUVsZXZhdGlvblpvb21GYWN0b3InXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNoY29kZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdtZXNoY29kZSBsYXllciBjcmVhdGUnKVxuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKE1lc2hDb2RlVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yID0gZGF0YUNvbnRhaW5lciA9PiBtZXNoQ29kZUFjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdtZXNoY29kZSc7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ01lc2hjb2RlJztcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpe1xuICAgIHJldHVybiBbJ21lc2hjb2RlJ11cbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgLy8gdXNlIGhleGFnb24gbGF5ZXIgaWNvbiBmb3Igbm93XG4gICAgcmV0dXJuIEtlcGxlckppc21lc2hMYXllckljb247XG4gIH1cblxuICBjYWxjdWxhdGVEYXRhQXR0cmlidXRlKHtkYXRhQ29udGFpbmVyLCBmaWx0ZXJlZEluZGV4fSwgZ2V0TWVzaENvZGUpIHtcblxuICAgIGNvbnNvbGUubG9nKCdjYWxjdWxhdGUgbGF5ZXInKVxuICAgIGNvbnN0IGRhdGEgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5kZXggPSBmaWx0ZXJlZEluZGV4W2ldO1xuICAgICAgY29uc3QgaWQgPSBnZXRNZXNoQ29kZSh7aW5kZXh9KTtcbiAgICAgIGNvbnN0IGNlbnRyb2lkID0gdGhpcy5kYXRhVG9GZWF0dXJlLmNlbnRyb2lkc1tpbmRleF07XG5cbiAgICAgIGlmIChjZW50cm9pZCkge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIGNlbnRyb2lkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVscyA9IHN1cGVyLnZpc3VhbENoYW5uZWxzO1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRGaWxsQ29sb3InXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RWxldmF0aW9uJyxcbiAgICAgICAgbnVsbFZhbHVlOiAwLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRFbGV2YXRpb25cbiAgICAgIH0sXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm9wZXJ0eTogJ2NvdmVyYWdlJyxcbiAgICAgICAgZmllbGQ6ICdjb3ZlcmFnZUZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdjb3ZlcmFnZVNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnY292ZXJhZ2VEb21haW4nLFxuICAgICAgICByYW5nZTogJ2NvdmVyYWdlUmFuZ2UnLFxuICAgICAgICBrZXk6ICdjb3ZlcmFnZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnJhZGl1cyxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRDb3ZlcmFnZScsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0Q292ZXJhZ2VcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc2V0SW5pdGlhbExheWVyQ29uZmlnKGRhdGFzZXQpIHtcbiAgICBjb25zb2xlLmxvZygnc2V0IGluaXRpYWwgbGF5ZXIgY29uZmlnJylcbiAgICBjb25zdCBkZWZhdWx0Q29sb3JGaWVsZCA9IGZpbmREZWZhdWx0Q29sb3JGaWVsZChkYXRhc2V0KTtcblxuICAgIGlmIChkZWZhdWx0Q29sb3JGaWVsZCkge1xuICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7XG4gICAgICAgIGNvbG9yRmllbGQ6IGRlZmF1bHRDb2xvckZpZWxkXG4gICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKGRhdGFzZXQsICdjb2xvcicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRzID0gW10sIGRhdGFDb250YWluZXJ9KSB7XG4gICAgY29uc3QgbWVzaEZpZWxkcyA9IGdldEpJU01lc2hGaWVsZHMoZmllbGRzLCBkYXRhQ29udGFpbmVyKTtcbiAgICBpZiAoIW1lc2hGaWVsZHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge3Byb3BzOiBbXX07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiBtZXNoRmllbGRzLm1hcChmID0+ICh7XG4gICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgbGFiZWw6IGYuZGlzcGxheU5hbWUgfHwgZi5uYW1lLFxuICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgbWVzaGNvZGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmLm5hbWUsXG4gICAgICAgICAgICBmaWVsZElkeDogZmllbGRzLmZpbmRJbmRleChmaWQgPT4gZmlkLm5hbWUgPT09IGYubmFtZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgaGVpZ2h0IHZpc3VhbCBjaGFubmVsXG4gICAgICBjb3ZlcmFnZUZpZWxkOiBudWxsLFxuICAgICAgY292ZXJhZ2VEb21haW46IFswLCAxXSxcbiAgICAgIGNvdmVyYWdlU2NhbGU6ICdsaW5lYXInXG4gICAgfTtcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnNvbGUubG9nKCdmb3JtYXQgbGF5ZXIgZGF0YSBoZXJlJylcbiAgICBjb25zdCB7Z3B1RmlsdGVyLCBkYXRhQ29udGFpbmVyfSA9IGRhdGFzZXRzW3RoaXMuY29uZmlnLmRhdGFJZF07XG4gICAgY29uc3QgZ2V0TWVzaENvZGUgPSB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcik7XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuICAgIGNvbnN0IGFjY2Vzc29ycyA9IHRoaXMuZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQ29udGFpbmVyfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldE1lc2hDb2RlLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZUFjY2Vzc29yKGRhdGFDb250YWluZXIpKCksXG4gICAgICAuLi5hY2Nlc3NvcnNcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIsIGdldE1lc2hDb2RlKSB7XG4gICAgY29uc3QgY2VudHJvaWRzID0gZGF0YUNvbnRhaW5lci5tYXAoKGQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZGF0YSB0byBmZWF0dXJlIGV4YW1wbGUnKVxuICAgICAgY29uc3QgaWQgPSBnZXRNZXNoQ29kZSh7aW5kZXh9KTtcbiAgICAgIGlmICghbWVzaElzVmFsaWQoaWQpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygnY2VudHJvaWQgZ2VuZXJhdGlvbicpXG4gICAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIG9mIGNlbnRyb2lkcyB0byBkYXRhVG9GZWF0dXJlXG4gICAgICAvLyBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlIGNhbGN1bGF0ZSBpdCBhZ2FpblxuICAgICAgcmV0dXJuIGdldENlbnRyb2lkKHtpZH0pO1xuICAgIH0sIHRydWUpO1xuXG4gICAgY29uc3QgY2VudHJvaWRzRGF0YUNvbnRhaW5lciA9IGNyZWF0ZURhdGFDb250YWluZXIoY2VudHJvaWRzKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGNlbnRyb2lkc0RhdGFDb250YWluZXIsIChkLCBkYykgPT4ge1xuICAgICAgcmV0dXJuIFtkYy52YWx1ZUF0KGQuaW5kZXgsIDApLCBkYy52YWx1ZUF0KGQuaW5kZXgsIDEpXTtcbiAgICB9KTtcbiAgICB0aGlzLmRhdGFUb0ZlYXR1cmUgPSB7Y2VudHJvaWRzfTtcbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kc30pO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cyl7XG4gICAgY29uc3Qge2RhdGEsIGdwdUZpbHRlciwgb2JqZWN0SG92ZXJlZCwgbWFwU3RhdGV9ID0gb3B0cztcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCBlbGVab29tRmFjdG9yID0gdGhpcy5nZXRFbGV2YXRpb25ab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB7Y29uZmlnfSA9IHRoaXM7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSBjb25maWc7XG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB0aGlzLmdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycygpO1xuXG4gICAgY29uc3QgbWVzaENvZGVMYXllclRyaWdnZXJzID0ge1xuICAgICAgZ2V0TWVzaENvZGU6IHRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICBnZXRGaWxsQ29sb3I6IHVwZGF0ZVRyaWdnZXJzLmdldEZpbGxDb2xvcixcbiAgICAgIGdldEVsZXZhdGlvbjogdXBkYXRlVHJpZ2dlcnMuZ2V0RWxldmF0aW9uLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzXG4gICAgfTtcblxuICAgIC8vaWYgdG8gaW5jbHVkZSBjb3ZlcmFnZSBvciBub3Q7XG4gICAgY29uc3QgY29sdW1uTGF5ZXJUcmlnZ2VycyA9IHtcbiAgICAgIGdldENvdmVyYWdlOiB1cGRhdGVUcmlnZ2Vycy5nZXRDb3ZlcmFnZVxuICAgIH07XG5cbiAgICBjb25zdCBkZWZhdWx0TGF5ZXJQcm9wcyA9IHRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpO1xuICAgIGNvbnN0IGhvdmVyZWRPYmplY3QgPSB0aGlzLmhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SG92ZXJlZCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tKaXNtZXNoTGF5ZXIoe1xuICAgICAgICAuLi5kZWZhdWx0TGF5ZXJQcm9wcyxcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG5cbiAgICAgICAgZ2V0TWVzaENvZGU6IHggPT4geC5pZCxcblxuICAgICAgICBsaW5lV2lkdGg6IDEsXG5cbiAgICAgICAgLy8gY292ZXJhZ2VcbiAgICAgICAgY292ZXJhZ2U6IGNvbmZpZy5jb3ZlcmFnZUZpZWxkID8gMSA6IHZpc0NvbmZpZy5jb3ZlcmFnZSxcblxuICAgICAgICAvLyBoaWdobGlnaHRcbiAgICAgICAgYXV0b0hpZ2hsaWdodDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogSElHSExJR0hfQ09MT1JfM0QsXG5cbiAgICAgICAgLy8gZWxldmF0aW9uXG4gICAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIGVsZXZhdGlvblNjYWxlOiB2aXNDb25maWcuZWxldmF0aW9uU2NhbGUgKiBlbGVab29tRmFjdG9yLFxuXG4gICAgICAgIC8vIHJlbmRlclxuICAgICAgICB1cGRhdGVUcmlnZ2VyczogbWVzaENvZGVMYXllclRyaWdnZXJzLFxuICAgICAgICBfc3ViTGF5ZXJQcm9wczoge1xuICAgICAgICAgICdtZXNoY29kZS1jZWxsJzoge1xuICAgICAgICAgICAgdHlwZTogRW5oYW5jZWRDb2x1bW5MYXllcixcbiAgICAgICAgICAgIGdldENvdmVyYWdlOiBkYXRhLmdldENvdmVyYWdlLFxuICAgICAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IGNvbHVtbkxheWVyVHJpZ2dlcnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgLi4uKGhvdmVyZWRPYmplY3QgJiYgIWNvbmZpZy5zaXplRmllbGRcbiAgICAgICAgPyBbXG4gICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAuLi50aGlzLmdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMoKSxcbiAgICAgICAgICAgIGRhdGE6IFttZXNoVG9Qb2x5Z29uR2VvKGhvdmVyZWRPYmplY3QpXSxcbiAgICAgICAgICAgIGdldExpbmVDb2xvcjogY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IERFRkFVTFRfTElORV9TQ0FMRV9WQUxVRSAqIHpvb21GYWN0b3IsXG4gICAgICAgICAgICB3cmFwTG9uZ2l0dWRlOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgICAgOiBbXSlcblxuXG4gICAgXVxuXG5cblxuXG5cbiAgfVxuXG5cblxuXG59XG5cblxuXG5cbi8vaWRUb1BvbHlnb25HZW9cblxuXG5cbi8vIGltcG9ydCB7Z2V0Q2VudHJvaWQsIGlkVG9Qb2x5Z29uR2VvLCBoM0lzVmFsaWQsIGdldEhleEZpZWxkc30gZnJvbSAnLi9oMy11dGlscyc7XG5cbiJdfQ==