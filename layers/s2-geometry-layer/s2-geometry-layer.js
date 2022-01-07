"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.S2VisConfigs = exports.defaultLineWidth = exports.defaultElevation = exports.S2TokenAccessor = exports.s2RequiredColumns = exports.S2_TOKEN_FIELDS = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _geoLayers = require("@deck.gl/geo-layers");

var _defaultSettings = require("../../constants/default-settings");

var _layerFactory = require("../layer-factory");

var _tableUtils = require("../../utils/table-utils");

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _s2LayerIcon = _interopRequireDefault(require("./s2-layer-icon"));

var _s2Utils = require("./s2-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var zoomFactorValue = 8;
var S2_TOKEN_FIELDS = {
  token: ['s2', 's2_token']
};
exports.S2_TOKEN_FIELDS = S2_TOKEN_FIELDS;
var s2RequiredColumns = ['token'];
exports.s2RequiredColumns = s2RequiredColumns;

var S2TokenAccessor = function S2TokenAccessor(_ref) {
  var token = _ref.token;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, token.fieldIdx);
    };
  };
};

exports.S2TokenAccessor = S2TokenAccessor;
var defaultElevation = 500;
exports.defaultElevation = defaultElevation;
var defaultLineWidth = 1;
exports.defaultLineWidth = defaultLineWidth;
var S2VisConfigs = {
  // Filled color
  opacity: 'opacity',
  colorRange: 'colorRange',
  filled: {
    type: 'boolean',
    label: 'Fill Color',
    defaultValue: true,
    property: 'filled'
  },
  // stroke
  thickness: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.thickness), {}, {
    defaultValue: 0.5
  }),
  strokeColor: 'strokeColor',
  strokeColorRange: 'strokeColorRange',
  sizeRange: 'strokeWidthRange',
  stroked: 'stroked',
  // height
  enable3d: 'enable3d',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  heightRange: 'elevationRange',
  // wireframe
  wireframe: 'wireframe'
};
exports.S2VisConfigs = S2VisConfigs;

var S2GeometryLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(S2GeometryLayer, _Layer);

  var _super = _createSuper(S2GeometryLayer);

  function S2GeometryLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, S2GeometryLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(S2VisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return S2TokenAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(S2GeometryLayer, [{
    key: "type",
    get: function get() {
      return 's2';
    }
  }, {
    key: "name",
    get: function get() {
      return 'S2';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return s2RequiredColumns;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _s2LayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(S2GeometryLayer.prototype), "visualChannels", this);
      return {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getFillColor'
        }),
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          property: 'stroke',
          accessor: 'getLineWidth',
          condition: function condition(config) {
            return config.visConfig.stroked;
          },
          defaultValue: defaultLineWidth
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
          defaultValue: function defaultValue(config) {
            return config.visConfig.strokeColor || config.color;
          }
        },
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
          defaultValue: defaultElevation
        }
      };
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(S2GeometryLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getS2Token) {
      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var token = getS2Token({
          index: index
        });

        if (token) {
          data.push({
            index: index,
            token: token
          });
        }
      }

      return data;
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getS2Token) {
      // add safe row flag
      var centroids = dataContainer.reduce(function (acc, entry, index) {
        var s2Token = getS2Token({
          index: index
        });
        return s2Token ? [].concat((0, _toConsumableArray2["default"])(acc), [(0, _s2Utils.getS2Center)(s2Token)]) : acc;
      }, [], true);
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
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getS2Token = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getS2Token: getS2Token,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      }, accessors);
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          interactionConfig = opts.interactionConfig,
          mapState = opts.mapState;
      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var zoomFactor = this.getZoomFactor(mapState);
      var config = this.config;
      var visConfig = config.visConfig;

      var updateTriggers = _objectSpread(_objectSpread({}, this.getVisualChannelUpdateTriggers()), {}, {
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      });

      return [new _geoLayers.S2Layer(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), interactionConfig), data), {}, {
        getS2Token: function getS2Token(d) {
          return d.token;
        },
        autoHighlight: visConfig.enable3d,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // stroke
        lineWidthScale: visConfig.thickness * zoomFactor * zoomFactorValue,
        stroked: visConfig.stroked,
        lineMiterLimit: 2,
        // Filled color
        filled: visConfig.filled,
        opacity: visConfig.opacity,
        wrapLongitude: false,
        // Elevation
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        pickable: true,
        updateTriggers: updateTriggers
      }))];
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fields = _ref3.fields,
          fields = _ref3$fields === void 0 ? [] : _ref3$fields;
      var foundColumns = this.findDefaultColumnField(S2_TOKEN_FIELDS, fields);

      if (!foundColumns || !foundColumns.length) {
        return {
          props: []
        };
      }

      return {
        props: foundColumns.map(function (columns) {
          return {
            isVisible: true,
            label: 'S2',
            columns: columns
          };
        })
      };
    }
  }]);
  return S2GeometryLayer;
}(_baseLayer["default"]);

exports["default"] = S2GeometryLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvczItZ2VvbWV0cnktbGF5ZXIvczItZ2VvbWV0cnktbGF5ZXIuanMiXSwibmFtZXMiOlsiem9vbUZhY3RvclZhbHVlIiwiUzJfVE9LRU5fRklFTERTIiwidG9rZW4iLCJzMlJlcXVpcmVkQ29sdW1ucyIsIlMyVG9rZW5BY2Nlc3NvciIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwiZGVmYXVsdEVsZXZhdGlvbiIsImRlZmF1bHRMaW5lV2lkdGgiLCJTMlZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsImZpbGxlZCIsInR5cGUiLCJsYWJlbCIsImRlZmF1bHRWYWx1ZSIsInByb3BlcnR5IiwidGhpY2tuZXNzIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJzdHJva2VDb2xvciIsInN0cm9rZUNvbG9yUmFuZ2UiLCJzaXplUmFuZ2UiLCJzdHJva2VkIiwiZW5hYmxlM2QiLCJlbGV2YXRpb25TY2FsZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJoZWlnaHRSYW5nZSIsIndpcmVmcmFtZSIsIlMyR2VvbWV0cnlMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbkFjY2Vzc29yIiwiZGF0YUNvbnRhaW5lciIsImNvbmZpZyIsImNvbHVtbnMiLCJTMkxheWVySWNvbiIsInZpc3VhbENoYW5uZWxzIiwiY29sb3IiLCJhY2Nlc3NvciIsInNpemUiLCJjb25kaXRpb24iLCJ2aXNDb25maWciLCJmaWVsZCIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJrZXkiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJudWxsVmFsdWUiLCJoZWlnaHQiLCJoZWlnaHRGaWVsZCIsImhlaWdodERvbWFpbiIsImhlaWdodFNjYWxlIiwic3Ryb2tlQ29sb3JGaWVsZCIsInN0cm9rZUNvbG9yRG9tYWluIiwic3Ryb2tlQ29sb3JTY2FsZSIsImdldFMyVG9rZW4iLCJmaWx0ZXJlZEluZGV4IiwiZGF0YSIsImkiLCJsZW5ndGgiLCJwdXNoIiwiY2VudHJvaWRzIiwicmVkdWNlIiwiYWNjIiwiZW50cnkiLCJzMlRva2VuIiwiY2VudHJvaWRzRGF0YUNvbnRhaW5lciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsImRhdGFUb0ZlYXR1cmUiLCJ1cGRhdGVNZXRhIiwiZGF0YXNldHMiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJ1cGRhdGVEYXRhIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwib3B0cyIsImludGVyYWN0aW9uQ29uZmlnIiwibWFwU3RhdGUiLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwiem9vbUZhY3RvciIsImdldFpvb21GYWN0b3IiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJTMkxheWVyIiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJsaW5lV2lkdGhTY2FsZSIsImxpbmVNaXRlckxpbWl0Iiwid3JhcExvbmdpdHVkZSIsImV4dHJ1ZGVkIiwicGlja2FibGUiLCJmaWVsZHMiLCJmb3VuZENvbHVtbnMiLCJmaW5kRGVmYXVsdENvbHVtbkZpZWxkIiwibWFwIiwiaXNWaXNpYmxlIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlLEdBQUcsQ0FBeEI7QUFFTyxJQUFNQyxlQUFlLEdBQUc7QUFDN0JD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IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7UzJMYXllcn0gZnJvbSAnQGRlY2suZ2wvZ2VvLWxheWVycyc7XG5pbXBvcnQge0hJR0hMSUdIX0NPTE9SXzNELCBDSEFOTkVMX1NDQUxFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuaW1wb3J0IHtjcmVhdGVEYXRhQ29udGFpbmVyfSBmcm9tICd1dGlscy90YWJsZS11dGlscyc7XG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQgUzJMYXllckljb24gZnJvbSAnLi9zMi1sYXllci1pY29uJztcbmltcG9ydCB7Z2V0UzJDZW50ZXJ9IGZyb20gJy4vczItdXRpbHMnO1xuXG5jb25zdCB6b29tRmFjdG9yVmFsdWUgPSA4O1xuXG5leHBvcnQgY29uc3QgUzJfVE9LRU5fRklFTERTID0ge1xuICB0b2tlbjogWydzMicsICdzMl90b2tlbiddXG59O1xuXG5leHBvcnQgY29uc3QgczJSZXF1aXJlZENvbHVtbnMgPSBbJ3Rva2VuJ107XG5leHBvcnQgY29uc3QgUzJUb2tlbkFjY2Vzc29yID0gKHt0b2tlbn0pID0+IGRjID0+IGQgPT4gZGMudmFsdWVBdChkLmluZGV4LCB0b2tlbi5maWVsZElkeCk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RWxldmF0aW9uID0gNTAwO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRMaW5lV2lkdGggPSAxO1xuXG5leHBvcnQgY29uc3QgUzJWaXNDb25maWdzID0ge1xuICAvLyBGaWxsZWQgY29sb3JcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIGZpbGxlZDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBsYWJlbDogJ0ZpbGwgQ29sb3InLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBwcm9wZXJ0eTogJ2ZpbGxlZCdcbiAgfSxcblxuICAvLyBzdHJva2VcbiAgdGhpY2tuZXNzOiB7XG4gICAgLi4uTEFZRVJfVklTX0NPTkZJR1MudGhpY2tuZXNzLFxuICAgIGRlZmF1bHRWYWx1ZTogMC41XG4gIH0sXG4gIHN0cm9rZUNvbG9yOiAnc3Ryb2tlQ29sb3InLFxuICBzdHJva2VDb2xvclJhbmdlOiAnc3Ryb2tlQ29sb3JSYW5nZScsXG4gIHNpemVSYW5nZTogJ3N0cm9rZVdpZHRoUmFuZ2UnLFxuICBzdHJva2VkOiAnc3Ryb2tlZCcsXG5cbiAgLy8gaGVpZ2h0XG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcjogJ2VuYWJsZUVsZXZhdGlvblpvb21GYWN0b3InLFxuICBoZWlnaHRSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcblxuICAvLyB3aXJlZnJhbWVcbiAgd2lyZWZyYW1lOiAnd2lyZWZyYW1lJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUzJHZW9tZXRyeUxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKFMyVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yID0gZGF0YUNvbnRhaW5lciA9PiBTMlRva2VuQWNjZXNzb3IodGhpcy5jb25maWcuY29sdW1ucykoZGF0YUNvbnRhaW5lcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ3MyJztcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnUzInO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBzMlJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIFMyTGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWxzID0gc3VwZXIudmlzdWFsQ2hhbm5lbHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIC4uLnZpc3VhbENoYW5uZWxzLmNvbG9yLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldEZpbGxDb2xvcidcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIC4uLnZpc3VhbENoYW5uZWxzLnNpemUsXG4gICAgICAgIHByb3BlcnR5OiAnc3Ryb2tlJyxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRMaW5lV2lkdGgnLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZWQsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdExpbmVXaWR0aFxuICAgICAgfSxcbiAgICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBmaWVsZDogJ3N0cm9rZUNvbG9yRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3N0cm9rZUNvbG9yU2NhbGUnLFxuICAgICAgICBkb21haW46ICdzdHJva2VDb2xvckRvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnc3Ryb2tlQ29sb3JSYW5nZScsXG4gICAgICAgIGtleTogJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0TGluZUNvbG9yJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5zdHJva2VkLFxuICAgICAgICBudWxsVmFsdWU6IHZpc3VhbENoYW5uZWxzLmNvbG9yLm51bGxWYWx1ZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5zdHJva2VDb2xvciB8fCBjb25maWcuY29sb3JcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICBmaWVsZDogJ2hlaWdodEZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdoZWlnaHRTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2hlaWdodERvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnaGVpZ2h0UmFuZ2UnLFxuICAgICAgICBrZXk6ICdoZWlnaHQnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldEVsZXZhdGlvbicsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0RWxldmF0aW9uXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIC8vIGFkZCBoZWlnaHQgdmlzdWFsIGNoYW5uZWxcbiAgICAgIGhlaWdodEZpZWxkOiBudWxsLFxuICAgICAgaGVpZ2h0RG9tYWluOiBbMCwgMV0sXG4gICAgICBoZWlnaHRTY2FsZTogJ2xpbmVhcicsXG5cbiAgICAgIC8vIGFkZCBzdHJva2UgY29sb3IgdmlzdWFsIGNoYW5uZWxcbiAgICAgIHN0cm9rZUNvbG9yRmllbGQ6IG51bGwsXG4gICAgICBzdHJva2VDb2xvckRvbWFpbjogWzAsIDFdLFxuICAgICAgc3Ryb2tlQ29sb3JTY2FsZTogJ3F1YW50aWxlJ1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZHMgPSBbXX0pIHtcbiAgICBjb25zdCBmb3VuZENvbHVtbnMgPSB0aGlzLmZpbmREZWZhdWx0Q29sdW1uRmllbGQoUzJfVE9LRU5fRklFTERTLCBmaWVsZHMpO1xuICAgIGlmICghZm91bmRDb2x1bW5zIHx8ICFmb3VuZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge3Byb3BzOiBbXX07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiBmb3VuZENvbHVtbnMubWFwKGNvbHVtbnMgPT4gKHtcbiAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgICBsYWJlbDogJ1MyJyxcbiAgICAgICAgY29sdW1uc1xuICAgICAgfSkpXG4gICAgfTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRTMlRva2VuKSB7XG4gICAgY29uc3QgZGF0YSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5kZXggPSBmaWx0ZXJlZEluZGV4W2ldO1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRTMlRva2VuKHtpbmRleH0pO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICB0b2tlblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lciwgZ2V0UzJUb2tlbikge1xuICAgIC8vIGFkZCBzYWZlIHJvdyBmbGFnXG4gICAgY29uc3QgY2VudHJvaWRzID0gZGF0YUNvbnRhaW5lci5yZWR1Y2UoXG4gICAgICAoYWNjLCBlbnRyeSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgczJUb2tlbiA9IGdldFMyVG9rZW4oe2luZGV4fSk7XG4gICAgICAgIHJldHVybiBzMlRva2VuID8gWy4uLmFjYywgZ2V0UzJDZW50ZXIoczJUb2tlbildIDogYWNjO1xuICAgICAgfSxcbiAgICAgIFtdLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBjZW50cm9pZHNEYXRhQ29udGFpbmVyID0gY3JlYXRlRGF0YUNvbnRhaW5lcihjZW50cm9pZHMpO1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGNlbnRyb2lkc0RhdGFDb250YWluZXIsIChkLCBkYykgPT4gW1xuICAgICAgZGMudmFsdWVBdChkLmluZGV4LCAwKSxcbiAgICAgIGRjLnZhbHVlQXQoZC5pbmRleCwgMSlcbiAgICBdKTtcbiAgICB0aGlzLmRhdGFUb0ZlYXR1cmUgPSB7Y2VudHJvaWRzfTtcbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kc30pO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEsIG9wdCA9IHt9KSB7XG4gICAgY29uc3Qge2dwdUZpbHRlciwgZGF0YUNvbnRhaW5lcn0gPSBkYXRhc2V0c1t0aGlzLmNvbmZpZy5kYXRhSWRdO1xuICAgIGNvbnN0IGdldFMyVG9rZW4gPSB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcik7XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gdGhpcy5nZXRBdHRyaWJ1dGVBY2Nlc3NvcnMoe2RhdGFDb250YWluZXJ9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhLFxuICAgICAgZ2V0UzJUb2tlbixcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKSgpLFxuICAgICAgLi4uYWNjZXNzb3JzXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKG9wdHMpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ3B1RmlsdGVyLCBpbnRlcmFjdGlvbkNvbmZpZywgbWFwU3RhdGV9ID0gb3B0cztcblxuICAgIGNvbnN0IGRlZmF1bHRMYXllclByb3BzID0gdGhpcy5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG5cbiAgICBjb25zdCBlbGVab29tRmFjdG9yID0gdGhpcy5nZXRFbGV2YXRpb25ab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB7Y29uZmlnfSA9IHRoaXM7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSBjb25maWc7XG5cbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0VmlzdWFsQ2hhbm5lbFVwZGF0ZVRyaWdnZXJzKCksXG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZ3B1RmlsdGVyLmZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnNcbiAgICB9O1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBTMkxheWVyKHtcbiAgICAgICAgLi4uZGVmYXVsdExheWVyUHJvcHMsXG4gICAgICAgIC4uLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBnZXRTMlRva2VuOiBkID0+IGQudG9rZW4sXG5cbiAgICAgICAgYXV0b0hpZ2hsaWdodDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogSElHSExJR0hfQ09MT1JfM0QsXG5cbiAgICAgICAgLy8gc3Ryb2tlXG4gICAgICAgIGxpbmVXaWR0aFNjYWxlOiB2aXNDb25maWcudGhpY2tuZXNzICogem9vbUZhY3RvciAqIHpvb21GYWN0b3JWYWx1ZSxcbiAgICAgICAgc3Ryb2tlZDogdmlzQ29uZmlnLnN0cm9rZWQsXG4gICAgICAgIGxpbmVNaXRlckxpbWl0OiAyLFxuXG4gICAgICAgIC8vIEZpbGxlZCBjb2xvclxuICAgICAgICBmaWxsZWQ6IHZpc0NvbmZpZy5maWxsZWQsXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICB3cmFwTG9uZ2l0dWRlOiBmYWxzZSxcblxuICAgICAgICAvLyBFbGV2YXRpb25cbiAgICAgICAgZWxldmF0aW9uU2NhbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25TY2FsZSAqIGVsZVpvb21GYWN0b3IsXG4gICAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG5cbiAgICAgICAgd2lyZWZyYW1lOiB2aXNDb25maWcud2lyZWZyYW1lLFxuXG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzXG4gICAgICB9KVxuICAgIF07XG4gIH1cbn1cbiJdfQ==