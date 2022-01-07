"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.defaultRadius = exports.defaultLineWidth = exports.defaultElevation = exports.featureAccessor = exports.geoJsonRequiredColumns = exports.geojsonVisConfigs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _typeAnalyzer = require("type-analyzer");

var _baseLayer = _interopRequireWildcard(require("../base-layer"));

var _layers = require("@deck.gl/layers");

var _geojsonUtils = require("./geojson-utils");

var _geojsonLayerIcon = _interopRequireDefault(require("./geojson-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _layerFactory = require("../layer-factory");

var _SUPPORTED_ANALYZER_T;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SUPPORTED_ANALYZER_TYPES = (_SUPPORTED_ANALYZER_T = {}, (0, _defineProperty2["default"])(_SUPPORTED_ANALYZER_T, _typeAnalyzer.DATA_TYPES.GEOMETRY, true), (0, _defineProperty2["default"])(_SUPPORTED_ANALYZER_T, _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING, true), (0, _defineProperty2["default"])(_SUPPORTED_ANALYZER_T, _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING, true), _SUPPORTED_ANALYZER_T);
var geojsonVisConfigs = {
  opacity: 'opacity',
  strokeOpacity: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.opacity), {}, {
    property: 'strokeOpacity'
  }),
  thickness: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.thickness), {}, {
    defaultValue: 0.5
  }),
  strokeColor: 'strokeColor',
  colorRange: 'colorRange',
  strokeColorRange: 'strokeColorRange',
  radius: 'radius',
  sizeRange: 'strokeWidthRange',
  radiusRange: 'radiusRange',
  heightRange: 'elevationRange',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  stroked: 'stroked',
  filled: 'filled',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
};
exports.geojsonVisConfigs = geojsonVisConfigs;
var geoJsonRequiredColumns = ['geojson'];
exports.geoJsonRequiredColumns = geoJsonRequiredColumns;

var featureAccessor = function featureAccessor(_ref) {
  var geojson = _ref.geojson;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, geojson.fieldIdx);
    };
  };
}; // access feature properties from geojson sub layer


exports.featureAccessor = featureAccessor;
var defaultElevation = 500;
exports.defaultElevation = defaultElevation;
var defaultLineWidth = 1;
exports.defaultLineWidth = defaultLineWidth;
var defaultRadius = 1;
exports.defaultRadius = defaultRadius;

var GeoJsonLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(GeoJsonLayer, _Layer);

  var _super = _createSuper(GeoJsonLayer);

  function GeoJsonLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, GeoJsonLayer);
    _this = _super.call(this, props);
    _this.dataToFeature = [];

    _this.registerVisConfig(geojsonVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return featureAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(GeoJsonLayer, [{
    key: "type",
    get: function get() {
      return 'geojson';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Polygon';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _geojsonLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return geoJsonRequiredColumns;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(GeoJsonLayer.prototype), "visualChannels", this);
      return {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getFillColor',
          condition: function condition(config) {
            return config.visConfig.filled;
          },
          nullValue: visualChannels.color.nullValue,
          getAttributeValue: function getAttributeValue(config) {
            return function (d) {
              return d.properties.fillColor || config.color;
            };
          },
          // used this to get updateTriggers
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        }),
        strokeColor: {
          property: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          key: 'strokeColor',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          accessor: 'getLineColor',
          condition: function condition(config) {
            return config.visConfig.stroked;
          },
          nullValue: visualChannels.color.nullValue,
          getAttributeValue: function getAttributeValue(config) {
            return function (d) {
              return d.properties.lineColor || config.visConfig.strokeColor || config.color;
            };
          },
          // used this to get updateTriggers
          defaultValue: function defaultValue(config) {
            return config.visConfig.strokeColor || config.color;
          }
        },
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          property: 'stroke',
          accessor: 'getLineWidth',
          condition: function condition(config) {
            return config.visConfig.stroked;
          },
          nullValue: 0,
          getAttributeValue: function getAttributeValue() {
            return function (d) {
              return d.properties.lineWidth || defaultLineWidth;
            };
          }
        }),
        height: {
          property: 'height',
          field: 'heightField',
          scale: 'heightScale',
          domain: 'heightDomain',
          range: 'heightRange',
          key: 'height',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size,
          accessor: 'getElevation',
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          nullValue: 0,
          getAttributeValue: function getAttributeValue() {
            return function (d) {
              return d.properties.elevation || defaultElevation;
            };
          }
        },
        radius: {
          property: 'radius',
          field: 'radiusField',
          scale: 'radiusScale',
          domain: 'radiusDomain',
          range: 'radiusRange',
          key: 'radius',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.radius,
          accessor: 'getRadius',
          nullValue: 0,
          getAttributeValue: function getAttributeValue() {
            return function (d) {
              return d.properties.radius || defaultRadius;
            };
          }
        }
      };
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(GeoJsonLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',
        // add radius visual channel
        radiusField: null,
        radiusDomain: [0, 1],
        radiusScale: 'linear',
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, dataContainer) {
      // index of dataContainer is saved to feature.properties
      return dataContainer.row(object.properties.index);
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getPosition) {
      var _this2 = this;

      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      return filteredIndex.map(function (i) {
        return _this2.dataToFeature[i];
      }).filter(function (d) {
        return d;
      });
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var customFilterValueAccessor = function customFilterValueAccessor(dc, d, fieldIndex) {
        return dc.valueAt(d.properties.index, fieldIndex);
      };

      var indexAccessor = function indexAccessor(f) {
        return f.properties.index;
      };

      var dataAccessor = function dataAccessor(dc) {
        return function (d) {
          return {
            index: d.properties.index
          };
        };
      };

      var accessors = this.getAttributeAccessors({
        dataAccessor: dataAccessor,
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(indexAccessor, customFilterValueAccessor)
      }, accessors);
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer) {
      var getFeature = this.getPositionAccessor(dataContainer);
      this.dataToFeature = (0, _geojsonUtils.getGeojsonDataMaps)(dataContainer, getFeature); // get bounds from features

      var bounds = (0, _geojsonUtils.getGeojsonBounds)(this.dataToFeature); // if any of the feature has properties.radius set to be true

      var fixedRadius = Boolean(this.dataToFeature.find(function (d) {
        return d && d.properties && d.properties.radius;
      })); // keep a record of what type of geometry the collection has

      var featureTypes = (0, _geojsonUtils.getGeojsonFeatureTypes)(this.dataToFeature);
      this.updateMeta({
        bounds: bounds,
        fixedRadius: fixedRadius,
        featureTypes: featureTypes
      });
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(_ref3) {
      var dataContainer = _ref3.dataContainer;
      this.updateLayerMeta(dataContainer);
      var featureTypes = this.meta.featureTypes; // default settings is stroke: true, filled: false

      if (featureTypes && featureTypes.polygon) {
        // set both fill and stroke to true
        return this.updateLayerVisConfig({
          filled: true,
          stroked: true,
          strokeColor: _baseLayer.colorMaker.next().value
        });
      } else if (featureTypes && featureTypes.point) {
        // set fill to true if detect point
        return this.updateLayerVisConfig({
          filled: true,
          stroked: false
        });
      }

      return this;
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState,
          interactionConfig = opts.interactionConfig;
      var _this$meta = this.meta,
          fixedRadius = _this$meta.fixedRadius,
          featureTypes = _this$meta.featureTypes;
      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var layerProps = {
        lineWidthScale: visConfig.thickness * zoomFactor * 8,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        pointRadiusScale: radiusScale,
        lineMiterLimit: 4
      };

      var updateTriggers = _objectSpread(_objectSpread({}, this.getVisualChannelUpdateTriggers()), {}, {
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      });

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var opaOverwrite = {
        opacity: visConfig.strokeOpacity
      };
      var pickable = interactionConfig.tooltip.enabled;
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _layers.GeoJsonLayer(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), layerProps), data), {}, {
        pickable: pickable,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        autoHighlight: visConfig.enable3d && pickable,
        stroked: visConfig.stroked,
        filled: visConfig.filled,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        wrapLongitude: false,
        lineMiterLimit: 2,
        rounded: true,
        updateTriggers: updateTriggers,
        _subLayerProps: _objectSpread(_objectSpread(_objectSpread({}, featureTypes.polygon ? {
          'polygons-stroke': opaOverwrite
        } : {}), featureTypes.line ? {
          'line-strings': opaOverwrite
        } : {}), featureTypes.point ? {
          points: {
            lineOpacity: visConfig.strokeOpacity
          }
        } : {})
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !visConfig.enable3d ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), layerProps), {}, {
        wrapLongitude: false,
        data: [hoveredObject],
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        // always draw outline
        stroked: true,
        filled: false
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _this3 = this;

      var label = _ref4.label,
          _ref4$fields = _ref4.fields,
          fields = _ref4$fields === void 0 ? [] : _ref4$fields;
      var geojsonColumns = fields.filter(function (f) {
        return f.type === 'geojson' && SUPPORTED_ANALYZER_TYPES[f.analyzerType];
      }).map(function (f) {
        return f.name;
      });
      var defaultColumns = {
        geojson: (0, _lodash["default"])([].concat((0, _toConsumableArray2["default"])(_defaultSettings.GEOJSON_FIELDS.geojson), (0, _toConsumableArray2["default"])(geojsonColumns)))
      };
      var foundColumns = this.findDefaultColumnField(defaultColumns, fields);

      if (!foundColumns || !foundColumns.length) {
        return {
          props: []
        };
      }

      return {
        props: foundColumns.map(function (columns) {
          return {
            label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this3.type,
            columns: columns,
            isVisible: true
          };
        })
      };
    }
  }]);
  return GeoJsonLayer;
}(_baseLayer["default"]);

exports["default"] = GeoJsonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIlNVUFBPUlRFRF9BTkFMWVpFUl9UWVBFUyIsIkRBVEFfVFlQRVMiLCJHRU9NRVRSWSIsIkdFT01FVFJZX0ZST01fU1RSSU5HIiwiUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORyIsImdlb2pzb25WaXNDb25maWdzIiwib3BhY2l0eSIsInN0cm9rZU9wYWNpdHkiLCJMQVlFUl9WSVNfQ09ORklHUyIsInByb3BlcnR5IiwidGhpY2tuZXNzIiwiZGVmYXVsdFZhbHVlIiwic3Ryb2tlQ29sb3IiLCJjb2xvclJhbmdlIiwic3Ryb2tlQ29sb3JSYW5nZSIsInJhZGl1cyIsInNpemVSYW5nZSIsInJhZGl1c1JhbmdlIiwiaGVpZ2h0UmFuZ2UiLCJlbGV2YXRpb25TY2FsZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJzdHJva2VkIiwiZmlsbGVkIiwiZW5hYmxlM2QiLCJ3aXJlZnJhbWUiLCJnZW9Kc29uUmVxdWlyZWRDb2x1bW5zIiwiZmVhdHVyZUFjY2Vzc29yIiwiZ2VvanNvbiIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwiZGVmYXVsdEVsZXZhdGlvbiIsImRlZmF1bHRMaW5lV2lkdGgiLCJkZWZhdWx0UmFkaXVzIiwiR2VvSnNvbkxheWVyIiwicHJvcHMiLCJkYXRhVG9GZWF0dXJlIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbkFjY2Vzc29yIiwiZGF0YUNvbnRhaW5lciIsImNvbmZpZyIsImNvbHVtbnMiLCJHZW9qc29uTGF5ZXJJY29uIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsImFjY2Vzc29yIiwiY29uZGl0aW9uIiwidmlzQ29uZmlnIiwibnVsbFZhbHVlIiwiZ2V0QXR0cmlidXRlVmFsdWUiLCJwcm9wZXJ0aWVzIiwiZmlsbENvbG9yIiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwia2V5IiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwibGluZUNvbG9yIiwic2l6ZSIsImxpbmVXaWR0aCIsImhlaWdodCIsImVsZXZhdGlvbiIsImhlaWdodEZpZWxkIiwiaGVpZ2h0RG9tYWluIiwiaGVpZ2h0U2NhbGUiLCJyYWRpdXNGaWVsZCIsInJhZGl1c0RvbWFpbiIsInJhZGl1c1NjYWxlIiwic3Ryb2tlQ29sb3JGaWVsZCIsInN0cm9rZUNvbG9yRG9tYWluIiwic3Ryb2tlQ29sb3JTY2FsZSIsIm9iamVjdCIsInJvdyIsImdldFBvc2l0aW9uIiwiZmlsdGVyZWRJbmRleCIsIm1hcCIsImkiLCJmaWx0ZXIiLCJkYXRhc2V0cyIsIm9sZExheWVyRGF0YSIsImRhdGFJZCIsImdwdUZpbHRlciIsInVwZGF0ZURhdGEiLCJkYXRhIiwiY3VzdG9tRmlsdGVyVmFsdWVBY2Nlc3NvciIsImZpZWxkSW5kZXgiLCJpbmRleEFjY2Vzc29yIiwiZiIsImRhdGFBY2Nlc3NvciIsImFjY2Vzc29ycyIsImdldEF0dHJpYnV0ZUFjY2Vzc29ycyIsImdldEZpbHRlclZhbHVlIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsImdldEZlYXR1cmUiLCJib3VuZHMiLCJmaXhlZFJhZGl1cyIsIkJvb2xlYW4iLCJmaW5kIiwiZmVhdHVyZVR5cGVzIiwidXBkYXRlTWV0YSIsInVwZGF0ZUxheWVyTWV0YSIsIm1ldGEiLCJwb2x5Z29uIiwidXBkYXRlTGF5ZXJWaXNDb25maWciLCJjb2xvck1ha2VyIiwibmV4dCIsInZhbHVlIiwicG9pbnQiLCJvcHRzIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJnZXRSYWRpdXNTY2FsZUJ5Wm9vbSIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwiZWxlWm9vbUZhY3RvciIsImdldEVsZXZhdGlvblpvb21GYWN0b3IiLCJsYXllclByb3BzIiwibGluZVdpZHRoU2NhbGUiLCJwb2ludFJhZGl1c1NjYWxlIiwibGluZU1pdGVyTGltaXQiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsIm9wYU92ZXJ3cml0ZSIsInBpY2thYmxlIiwidG9vbHRpcCIsImVuYWJsZWQiLCJob3ZlcmVkT2JqZWN0IiwiaGFzSG92ZXJlZE9iamVjdCIsIkRlY2tHTEdlb0pzb25MYXllciIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJhdXRvSGlnaGxpZ2h0IiwiZXh0cnVkZWQiLCJ3cmFwTG9uZ2l0dWRlIiwicm91bmRlZCIsIl9zdWJMYXllclByb3BzIiwibGluZSIsInBvaW50cyIsImxpbmVPcGFjaXR5IiwiZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcyIsImdldExpbmVXaWR0aCIsImdldFJhZGl1cyIsImdldEVsZXZhdGlvbiIsImdldExpbmVDb2xvciIsImdldEZpbGxDb2xvciIsImxhYmVsIiwiZmllbGRzIiwiZ2VvanNvbkNvbHVtbnMiLCJ0eXBlIiwiYW5hbHl6ZXJUeXBlIiwibmFtZSIsImRlZmF1bHRDb2x1bW5zIiwiR0VPSlNPTl9GSUVMRFMiLCJmb3VuZENvbHVtbnMiLCJmaW5kRGVmYXVsdENvbHVtbkZpZWxkIiwibGVuZ3RoIiwicmVwbGFjZSIsImlzVmlzaWJsZSIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLHdCQUF3Qix3RkFDM0JDLHlCQUFXQyxRQURnQixFQUNMLElBREssMkRBRTNCRCx5QkFBV0Usb0JBRmdCLEVBRU8sSUFGUCwyREFHM0JGLHlCQUFXRyx5QkFIZ0IsRUFHWSxJQUhaLHlCQUE5QjtBQU1PLElBQU1DLGlCQUFpQixHQUFHO0FBQy9C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QUFJQSxDQUFDLENBQUNpRSxJQUFGLEtBQVcsU0FBWCxJQUF3QjVKLHdCQUF3QixDQUFDMkYsQ0FBQyxDQUFDa0UsWUFBSCxDQUFwRDtBQUFBLE9BRFksRUFFcEI5RSxHQUZvQixDQUVoQixVQUFBWSxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDbUUsSUFBTjtBQUFBLE9BRmUsQ0FBdkI7QUFJQSxVQUFNQyxjQUFjLEdBQUc7QUFDckJwSSxRQUFBQSxPQUFPLEVBQUUsc0VBQVNxSSxnQ0FBZXJJLE9BQXhCLHVDQUFvQ2dJLGNBQXBDO0FBRFksT0FBdkI7QUFJQSxVQUFNTSxZQUFZLEdBQUcsS0FBS0Msc0JBQUwsQ0FBNEJILGNBQTVCLEVBQTRDTCxNQUE1QyxDQUFyQjs7QUFDQSxVQUFJLENBQUNPLFlBQUQsSUFBaUIsQ0FBQ0EsWUFBWSxDQUFDRSxNQUFuQyxFQUEyQztBQUN6QyxlQUFPO0FBQUM5SCxVQUFBQSxLQUFLLEVBQUU7QUFBUixTQUFQO0FBQ0Q7O0FBRUQsYUFBTztBQUNMQSxRQUFBQSxLQUFLLEVBQUU0SCxZQUFZLENBQUNsRixHQUFiLENBQWlCLFVBQUFwQyxPQUFPO0FBQUEsaUJBQUs7QUFDbEM4RyxZQUFBQSxLQUFLLEVBQUcsT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsS0FBSyxDQUFDVyxPQUFOLENBQWMsV0FBZCxFQUEyQixFQUEzQixDQUE5QixJQUFpRSxNQUFJLENBQUNSLElBRDNDO0FBRWxDakgsWUFBQUEsT0FBTyxFQUFQQSxPQUZrQztBQUdsQzBILFlBQUFBLFNBQVMsRUFBRTtBQUh1QixXQUFMO0FBQUEsU0FBeEI7QUFERixPQUFQO0FBT0Q7OztFQTlHdUNDLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IHtEQVRBX1RZUEVTfSBmcm9tICd0eXBlLWFuYWx5emVyJztcblxuaW1wb3J0IExheWVyLCB7Y29sb3JNYWtlcn0gZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQge0dlb0pzb25MYXllciBhcyBEZWNrR0xHZW9Kc29uTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5pbXBvcnQge2dldEdlb2pzb25EYXRhTWFwcywgZ2V0R2VvanNvbkJvdW5kcywgZ2V0R2VvanNvbkZlYXR1cmVUeXBlc30gZnJvbSAnLi9nZW9qc29uLXV0aWxzJztcbmltcG9ydCBHZW9qc29uTGF5ZXJJY29uIGZyb20gJy4vZ2VvanNvbi1sYXllci1pY29uJztcbmltcG9ydCB7R0VPSlNPTl9GSUVMRFMsIEhJR0hMSUdIX0NPTE9SXzNELCBDSEFOTkVMX1NDQUxFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuXG5jb25zdCBTVVBQT1JURURfQU5BTFlaRVJfVFlQRVMgPSB7XG4gIFtEQVRBX1RZUEVTLkdFT01FVFJZXTogdHJ1ZSxcbiAgW0RBVEFfVFlQRVMuR0VPTUVUUllfRlJPTV9TVFJJTkddOiB0cnVlLFxuICBbREFUQV9UWVBFUy5QQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HXTogdHJ1ZVxufTtcblxuZXhwb3J0IGNvbnN0IGdlb2pzb25WaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHN0cm9rZU9wYWNpdHk6IHtcbiAgICAuLi5MQVlFUl9WSVNfQ09ORklHUy5vcGFjaXR5LFxuICAgIHByb3BlcnR5OiAnc3Ryb2tlT3BhY2l0eSdcbiAgfSxcbiAgdGhpY2tuZXNzOiB7XG4gICAgLi4uTEFZRVJfVklTX0NPTkZJR1MudGhpY2tuZXNzLFxuICAgIGRlZmF1bHRWYWx1ZTogMC41XG4gIH0sXG4gIHN0cm9rZUNvbG9yOiAnc3Ryb2tlQ29sb3InLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHN0cm9rZUNvbG9yUmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgcmFkaXVzOiAncmFkaXVzJyxcblxuICBzaXplUmFuZ2U6ICdzdHJva2VXaWR0aFJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gIGhlaWdodFJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcjogJ2VuYWJsZUVsZXZhdGlvblpvb21GYWN0b3InLFxuICBzdHJva2VkOiAnc3Ryb2tlZCcsXG4gIGZpbGxlZDogJ2ZpbGxlZCcsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnLFxuICB3aXJlZnJhbWU6ICd3aXJlZnJhbWUnXG59O1xuXG5leHBvcnQgY29uc3QgZ2VvSnNvblJlcXVpcmVkQ29sdW1ucyA9IFsnZ2VvanNvbiddO1xuZXhwb3J0IGNvbnN0IGZlYXR1cmVBY2Nlc3NvciA9ICh7Z2VvanNvbn0pID0+IGRjID0+IGQgPT4gZGMudmFsdWVBdChkLmluZGV4LCBnZW9qc29uLmZpZWxkSWR4KTtcblxuLy8gYWNjZXNzIGZlYXR1cmUgcHJvcGVydGllcyBmcm9tIGdlb2pzb24gc3ViIGxheWVyXG5leHBvcnQgY29uc3QgZGVmYXVsdEVsZXZhdGlvbiA9IDUwMDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0TGluZVdpZHRoID0gMTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0UmFkaXVzID0gMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VvSnNvbkxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IFtdO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoZ2VvanNvblZpc0NvbmZpZ3MpO1xuICAgIHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvciA9IGRhdGFDb250YWluZXIgPT4gZmVhdHVyZUFjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdnZW9qc29uJztcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnUG9seWdvbic7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBHZW9qc29uTGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBnZW9Kc29uUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWxzID0gc3VwZXIudmlzdWFsQ2hhbm5lbHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIC4uLnZpc3VhbENoYW5uZWxzLmNvbG9yLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldEZpbGxDb2xvcicsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuZmlsbGVkLFxuICAgICAgICBudWxsVmFsdWU6IHZpc3VhbENoYW5uZWxzLmNvbG9yLm51bGxWYWx1ZSxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6IGNvbmZpZyA9PiBkID0+IGQucHJvcGVydGllcy5maWxsQ29sb3IgfHwgY29uZmlnLmNvbG9yLFxuICAgICAgICAvLyB1c2VkIHRoaXMgdG8gZ2V0IHVwZGF0ZVRyaWdnZXJzXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogY29uZmlnID0+IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBmaWVsZDogJ3N0cm9rZUNvbG9yRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3N0cm9rZUNvbG9yU2NhbGUnLFxuICAgICAgICBkb21haW46ICdzdHJva2VDb2xvckRvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnc3Ryb2tlQ29sb3JSYW5nZScsXG4gICAgICAgIGtleTogJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0TGluZUNvbG9yJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5zdHJva2VkLFxuICAgICAgICBudWxsVmFsdWU6IHZpc3VhbENoYW5uZWxzLmNvbG9yLm51bGxWYWx1ZSxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6IGNvbmZpZyA9PiBkID0+XG4gICAgICAgICAgZC5wcm9wZXJ0aWVzLmxpbmVDb2xvciB8fCBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvcixcbiAgICAgICAgLy8gdXNlZCB0aGlzIHRvIGdldCB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4udmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2UnLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldExpbmVXaWR0aCcsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZCxcbiAgICAgICAgbnVsbFZhbHVlOiAwLFxuICAgICAgICBnZXRBdHRyaWJ1dGVWYWx1ZTogKCkgPT4gZCA9PiBkLnByb3BlcnRpZXMubGluZVdpZHRoIHx8IGRlZmF1bHRMaW5lV2lkdGhcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICBmaWVsZDogJ2hlaWdodEZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdoZWlnaHRTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2hlaWdodERvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnaGVpZ2h0UmFuZ2UnLFxuICAgICAgICBrZXk6ICdoZWlnaHQnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldEVsZXZhdGlvbicsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6ICgpID0+IGQgPT4gZC5wcm9wZXJ0aWVzLmVsZXZhdGlvbiB8fCBkZWZhdWx0RWxldmF0aW9uXG4gICAgICB9LFxuICAgICAgcmFkaXVzOiB7XG4gICAgICAgIHByb3BlcnR5OiAncmFkaXVzJyxcbiAgICAgICAgZmllbGQ6ICdyYWRpdXNGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAncmFkaXVzU2NhbGUnLFxuICAgICAgICBkb21haW46ICdyYWRpdXNEb21haW4nLFxuICAgICAgICByYW5nZTogJ3JhZGl1c1JhbmdlJyxcbiAgICAgICAga2V5OiAncmFkaXVzJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMucmFkaXVzLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldFJhZGl1cycsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6ICgpID0+IGQgPT4gZC5wcm9wZXJ0aWVzLnJhZGl1cyB8fCBkZWZhdWx0UmFkaXVzXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2xhYmVsLCBmaWVsZHMgPSBbXX0pIHtcbiAgICBjb25zdCBnZW9qc29uQ29sdW1ucyA9IGZpZWxkc1xuICAgICAgLmZpbHRlcihmID0+IGYudHlwZSA9PT0gJ2dlb2pzb24nICYmIFNVUFBPUlRFRF9BTkFMWVpFUl9UWVBFU1tmLmFuYWx5emVyVHlwZV0pXG4gICAgICAubWFwKGYgPT4gZi5uYW1lKTtcblxuICAgIGNvbnN0IGRlZmF1bHRDb2x1bW5zID0ge1xuICAgICAgZ2VvanNvbjogdW5pcShbLi4uR0VPSlNPTl9GSUVMRFMuZ2VvanNvbiwgLi4uZ2VvanNvbkNvbHVtbnNdKVxuICAgIH07XG5cbiAgICBjb25zdCBmb3VuZENvbHVtbnMgPSB0aGlzLmZpbmREZWZhdWx0Q29sdW1uRmllbGQoZGVmYXVsdENvbHVtbnMsIGZpZWxkcyk7XG4gICAgaWYgKCFmb3VuZENvbHVtbnMgfHwgIWZvdW5kQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7cHJvcHM6IFtdfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IGZvdW5kQ29sdW1ucy5tYXAoY29sdW1ucyA9PiAoe1xuICAgICAgICBsYWJlbDogKHR5cGVvZiBsYWJlbCA9PT0gJ3N0cmluZycgJiYgbGFiZWwucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKSkgfHwgdGhpcy50eXBlLFxuICAgICAgICBjb2x1bW5zLFxuICAgICAgICBpc1Zpc2libGU6IHRydWVcbiAgICAgIH0pKVxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgaGVpZ2h0IHZpc3VhbCBjaGFubmVsXG4gICAgICBoZWlnaHRGaWVsZDogbnVsbCxcbiAgICAgIGhlaWdodERvbWFpbjogWzAsIDFdLFxuICAgICAgaGVpZ2h0U2NhbGU6ICdsaW5lYXInLFxuXG4gICAgICAvLyBhZGQgcmFkaXVzIHZpc3VhbCBjaGFubmVsXG4gICAgICByYWRpdXNGaWVsZDogbnVsbCxcbiAgICAgIHJhZGl1c0RvbWFpbjogWzAsIDFdLFxuICAgICAgcmFkaXVzU2NhbGU6ICdsaW5lYXInLFxuXG4gICAgICAvLyBhZGQgc3Ryb2tlIGNvbG9yIHZpc3VhbCBjaGFubmVsXG4gICAgICBzdHJva2VDb2xvckZpZWxkOiBudWxsLFxuICAgICAgc3Ryb2tlQ29sb3JEb21haW46IFswLCAxXSxcbiAgICAgIHN0cm9rZUNvbG9yU2NhbGU6ICdxdWFudGlsZSdcbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCwgZGF0YUNvbnRhaW5lcikge1xuICAgIC8vIGluZGV4IG9mIGRhdGFDb250YWluZXIgaXMgc2F2ZWQgdG8gZmVhdHVyZS5wcm9wZXJ0aWVzXG4gICAgcmV0dXJuIGRhdGFDb250YWluZXIucm93KG9iamVjdC5wcm9wZXJ0aWVzLmluZGV4KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRQb3NpdGlvbikge1xuICAgIHJldHVybiBmaWx0ZXJlZEluZGV4Lm1hcChpID0+IHRoaXMuZGF0YVRvRmVhdHVyZVtpXSkuZmlsdGVyKGQgPT4gZCk7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSkge1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnVwZGF0ZURhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSk7XG5cbiAgICBjb25zdCBjdXN0b21GaWx0ZXJWYWx1ZUFjY2Vzc29yID0gKGRjLCBkLCBmaWVsZEluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gZGMudmFsdWVBdChkLnByb3BlcnRpZXMuaW5kZXgsIGZpZWxkSW5kZXgpO1xuICAgIH07XG4gICAgY29uc3QgaW5kZXhBY2Nlc3NvciA9IGYgPT4gZi5wcm9wZXJ0aWVzLmluZGV4O1xuXG4gICAgY29uc3QgZGF0YUFjY2Vzc29yID0gZGMgPT4gZCA9PiAoe2luZGV4OiBkLnByb3BlcnRpZXMuaW5kZXh9KTtcbiAgICBjb25zdCBhY2Nlc3NvcnMgPSB0aGlzLmdldEF0dHJpYnV0ZUFjY2Vzc29ycyh7ZGF0YUFjY2Vzc29yLCBkYXRhQ29udGFpbmVyfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKShcbiAgICAgICAgaW5kZXhBY2Nlc3NvcixcbiAgICAgICAgY3VzdG9tRmlsdGVyVmFsdWVBY2Nlc3NvclxuICAgICAgKSxcbiAgICAgIC4uLmFjY2Vzc29yc1xuICAgIH07XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGdldEZlYXR1cmUgPSB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcik7XG4gICAgdGhpcy5kYXRhVG9GZWF0dXJlID0gZ2V0R2VvanNvbkRhdGFNYXBzKGRhdGFDb250YWluZXIsIGdldEZlYXR1cmUpO1xuXG4gICAgLy8gZ2V0IGJvdW5kcyBmcm9tIGZlYXR1cmVzXG4gICAgY29uc3QgYm91bmRzID0gZ2V0R2VvanNvbkJvdW5kcyh0aGlzLmRhdGFUb0ZlYXR1cmUpO1xuICAgIC8vIGlmIGFueSBvZiB0aGUgZmVhdHVyZSBoYXMgcHJvcGVydGllcy5yYWRpdXMgc2V0IHRvIGJlIHRydWVcbiAgICBjb25zdCBmaXhlZFJhZGl1cyA9IEJvb2xlYW4oXG4gICAgICB0aGlzLmRhdGFUb0ZlYXR1cmUuZmluZChkID0+IGQgJiYgZC5wcm9wZXJ0aWVzICYmIGQucHJvcGVydGllcy5yYWRpdXMpXG4gICAgKTtcblxuICAgIC8vIGtlZXAgYSByZWNvcmQgb2Ygd2hhdCB0eXBlIG9mIGdlb21ldHJ5IHRoZSBjb2xsZWN0aW9uIGhhc1xuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGdldEdlb2pzb25GZWF0dXJlVHlwZXModGhpcy5kYXRhVG9GZWF0dXJlKTtcblxuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzLCBmaXhlZFJhZGl1cywgZmVhdHVyZVR5cGVzfSk7XG4gIH1cblxuICBzZXRJbml0aWFsTGF5ZXJDb25maWcoe2RhdGFDb250YWluZXJ9KSB7XG4gICAgdGhpcy51cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lcik7XG5cbiAgICBjb25zdCB7ZmVhdHVyZVR5cGVzfSA9IHRoaXMubWV0YTtcbiAgICAvLyBkZWZhdWx0IHNldHRpbmdzIGlzIHN0cm9rZTogdHJ1ZSwgZmlsbGVkOiBmYWxzZVxuICAgIGlmIChmZWF0dXJlVHlwZXMgJiYgZmVhdHVyZVR5cGVzLnBvbHlnb24pIHtcbiAgICAgIC8vIHNldCBib3RoIGZpbGwgYW5kIHN0cm9rZSB0byB0cnVlXG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVMYXllclZpc0NvbmZpZyh7XG4gICAgICAgIGZpbGxlZDogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlZDogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IGNvbG9yTWFrZXIubmV4dCgpLnZhbHVlXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGZlYXR1cmVUeXBlcyAmJiBmZWF0dXJlVHlwZXMucG9pbnQpIHtcbiAgICAgIC8vIHNldCBmaWxsIHRvIHRydWUgaWYgZGV0ZWN0IHBvaW50XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVMYXllclZpc0NvbmZpZyh7ZmlsbGVkOiB0cnVlLCBzdHJva2VkOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBncHVGaWx0ZXIsIG9iamVjdEhvdmVyZWQsIG1hcFN0YXRlLCBpbnRlcmFjdGlvbkNvbmZpZ30gPSBvcHRzO1xuXG4gICAgY29uc3Qge2ZpeGVkUmFkaXVzLCBmZWF0dXJlVHlwZXN9ID0gdGhpcy5tZXRhO1xuICAgIGNvbnN0IHJhZGl1c1NjYWxlID0gdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSwgZml4ZWRSYWRpdXMpO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IGVsZVpvb21GYWN0b3IgPSB0aGlzLmdldEVsZXZhdGlvblpvb21GYWN0b3IobWFwU3RhdGUpO1xuXG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcblxuICAgIGNvbnN0IGxheWVyUHJvcHMgPSB7XG4gICAgICBsaW5lV2lkdGhTY2FsZTogdmlzQ29uZmlnLnRoaWNrbmVzcyAqIHpvb21GYWN0b3IgKiA4LFxuICAgICAgZWxldmF0aW9uU2NhbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25TY2FsZSAqIGVsZVpvb21GYWN0b3IsXG4gICAgICBwb2ludFJhZGl1c1NjYWxlOiByYWRpdXNTY2FsZSxcbiAgICAgIGxpbmVNaXRlckxpbWl0OiA0XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgLi4udGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKSxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2Vyc1xuICAgIH07XG5cbiAgICBjb25zdCBkZWZhdWx0TGF5ZXJQcm9wcyA9IHRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpO1xuICAgIGNvbnN0IG9wYU92ZXJ3cml0ZSA9IHtcbiAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5zdHJva2VPcGFjaXR5XG4gICAgfTtcblxuICAgIGNvbnN0IHBpY2thYmxlID0gaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5lbmFibGVkO1xuICAgIGNvbnN0IGhvdmVyZWRPYmplY3QgPSB0aGlzLmhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SG92ZXJlZCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgIC4uLmRlZmF1bHRMYXllclByb3BzLFxuICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBwaWNrYWJsZSxcbiAgICAgICAgaGlnaGxpZ2h0Q29sb3I6IEhJR0hMSUdIX0NPTE9SXzNELFxuICAgICAgICBhdXRvSGlnaGxpZ2h0OiB2aXNDb25maWcuZW5hYmxlM2QgJiYgcGlja2FibGUsXG4gICAgICAgIHN0cm9rZWQ6IHZpc0NvbmZpZy5zdHJva2VkLFxuICAgICAgICBmaWxsZWQ6IHZpc0NvbmZpZy5maWxsZWQsXG4gICAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIHdpcmVmcmFtZTogdmlzQ29uZmlnLndpcmVmcmFtZSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG4gICAgICAgIGxpbmVNaXRlckxpbWl0OiAyLFxuICAgICAgICByb3VuZGVkOiB0cnVlLFxuICAgICAgICB1cGRhdGVUcmlnZ2VycyxcbiAgICAgICAgX3N1YkxheWVyUHJvcHM6IHtcbiAgICAgICAgICAuLi4oZmVhdHVyZVR5cGVzLnBvbHlnb24gPyB7J3BvbHlnb25zLXN0cm9rZSc6IG9wYU92ZXJ3cml0ZX0gOiB7fSksXG4gICAgICAgICAgLi4uKGZlYXR1cmVUeXBlcy5saW5lID8geydsaW5lLXN0cmluZ3MnOiBvcGFPdmVyd3JpdGV9IDoge30pLFxuICAgICAgICAgIC4uLihmZWF0dXJlVHlwZXMucG9pbnRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgbGluZU9wYWNpdHk6IHZpc0NvbmZpZy5zdHJva2VPcGFjaXR5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHt9KVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIC4uLihob3ZlcmVkT2JqZWN0ICYmICF2aXNDb25maWcuZW5hYmxlM2RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgRGVja0dMR2VvSnNvbkxheWVyKHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXREZWZhdWx0SG92ZXJMYXllclByb3BzKCksXG4gICAgICAgICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlLFxuICAgICAgICAgICAgICBkYXRhOiBbaG92ZXJlZE9iamVjdF0sXG4gICAgICAgICAgICAgIGdldExpbmVXaWR0aDogZGF0YS5nZXRMaW5lV2lkdGgsXG4gICAgICAgICAgICAgIGdldFJhZGl1czogZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICAgIGdldEVsZXZhdGlvbjogZGF0YS5nZXRFbGV2YXRpb24sXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIC8vIGFsd2F5cyBkcmF3IG91dGxpbmVcbiAgICAgICAgICAgICAgc3Ryb2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgZmlsbGVkOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19