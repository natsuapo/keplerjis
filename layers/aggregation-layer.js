"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.aggregateRequiredColumns = exports.getFilterDataFunc = exports.getValueAggrFunc = exports.pointPosResolver = exports.pointPosAccessor = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _baseLayer = _interopRequireDefault(require("./base-layer"));

var _colorUtils = require("../utils/color-utils");

var _aggregateUtils = require("../utils/aggregate-utils");

var _defaultSettings = require("../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng.fieldIdx), dc.valueAt(d.index, lat.fieldIdx)];
    };
  };
};

exports.pointPosAccessor = pointPosAccessor;

var pointPosResolver = function pointPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx);
};

exports.pointPosResolver = pointPosResolver;

var getValueAggrFunc = function getValueAggrFunc(field, aggregation) {
  return function (points) {
    return field ? (0, _aggregateUtils.aggregate)(points.map(function (p) {
      return field.valueAccessor(p);
    }), aggregation) : points.length;
  };
};

exports.getValueAggrFunc = getValueAggrFunc;

var getFilterDataFunc = function getFilterDataFunc(filterRange, getFilterValue) {
  return function (pt) {
    return getFilterValue(pt).every(function (val, i) {
      return val >= filterRange[i][0] && val <= filterRange[i][1];
    });
  };
};

exports.getFilterDataFunc = getFilterDataFunc;

var getLayerColorRange = function getLayerColorRange(colorRange) {
  return colorRange.colors.map(_colorUtils.hexToRgb);
};

var aggregateRequiredColumns = ['lat', 'lng'];
exports.aggregateRequiredColumns = aggregateRequiredColumns;

var AggregationLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(AggregationLayer, _Layer);

  var _super = _createSuper(AggregationLayer);

  function AggregationLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AggregationLayer);
    _this = _super.call(this, props);

    _this.getPositionAccessor = function (dataContainer) {
      return pointPosAccessor(_this.config.columns)(dataContainer);
    };

    _this.getColorRange = (0, _lodash["default"])(getLayerColorRange);
    return _this;
  }

  (0, _createClass2["default"])(AggregationLayer, [{
    key: "isAggregated",
    get: function get() {
      return true;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return aggregateRequiredColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2["default"])((0, _get2["default"])((0, _getPrototypeOf2["default"])(AggregationLayer.prototype), "noneLayerDataAffectingProps", this)), ['enable3d', 'colorRange', 'colorDomain', 'sizeRange', 'sizeScale', 'sizeDomain', 'percentile', 'coverage', 'elevationPercentile', 'elevationScale', 'enableElevationZoomFactor']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          aggregation: 'colorAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.colorAggr,
          defaultMeasure: 'property.pointCount',
          domain: 'colorDomain',
          field: 'colorField',
          key: 'color',
          property: 'color',
          range: 'colorRange',
          scale: 'colorScale'
        },
        size: {
          aggregation: 'sizeAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.sizeAggr,
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          defaultMeasure: 'property.pointCount',
          domain: 'sizeDomain',
          field: 'sizeField',
          key: 'size',
          property: 'height',
          range: 'sizeRange',
          scale: 'sizeScale'
        }
      };
    }
    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Average of ETA
      console.log('get visual channel description');
      var _this$visualChannels$ = this.visualChannels[key],
          range = _this$visualChannels$.range,
          field = _this$visualChannels$.field,
          defaultMeasure = _this$visualChannels$.defaultMeasure,
          aggregation = _this$visualChannels$.aggregation;
      var fieldConfig = this.config[field];
      return {
        label: this.visConfigSettings[range].label,
        measure: fieldConfig ? "".concat(this.config.visConfig[aggregation], " of ").concat(fieldConfig.displayName || fieldConfig.name) : defaultMeasure
      };
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object) {
      // return aggregated object
      return object;
    }
    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(_ref3, channel) {
      var data = _ref3.data,
          dataContainer = _ref3.dataContainer;
      this.validateVisualChannel(channel);
    }
    /**
     * Validate aggregation type on top of basic layer visual channel validation
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      // field type decides aggregation type decides scale type
      this.validateFieldType(channel);
      this.validateAggregationType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate aggregation type based on selected field
     */

  }, {
    key: "validateAggregationType",
    value: function validateAggregationType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation;
      var aggregationOptions = this.getAggregationOptions(channel);

      if (!aggregation) {
        return;
      }

      if (!aggregationOptions.length) {
        // if field cannot be aggregated, set field to null
        this.updateLayerConfig((0, _defineProperty2["default"])({}, field, null));
      } else if (!aggregationOptions.includes(this.config.visConfig[aggregation])) {
        // current aggregation type is not supported by this field
        // set aggregation to the first supported option
        this.updateLayerVisConfig((0, _defineProperty2["default"])({}, aggregation, aggregationOptions[0]));
      }
    }
  }, {
    key: "getAggregationOptions",
    value: function getAggregationOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType;
      return Object.keys(this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : _defaultSettings.DEFAULT_AGGREGATION[channelScaleType]);
    }
    /**
     * Get scale options based on current field and aggregation type
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation,
          channelScaleType = visualChannel.channelScaleType;
      var aggregationType = this.config.visConfig[aggregation];
      return this.config[field] ? // scale options based on aggregation
      _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType][aggregationType] : // default scale options for point count
      _defaultSettings.DEFAULT_AGGREGATION[channelScaleType][aggregationType];
    }
    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(datasets, newFilter) {
      return this;
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getPosition) {
      // get bounds from points
      var bounds = this.getPointsBounds(dataContainer, getPosition);
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref4, getPosition) {
      var dataContainer = _ref4.dataContainer,
          filteredIndex = _ref4.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var pos = getPosition({
          index: index
        }); // if doesn't have point lat or lng, do not add the point
        // deck.gl can't handle position = null

        if (pos.every(Number.isFinite)) {
          data.push({
            index: index
          });
        }
      }

      return data;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;
      var getPosition = this.getPositionAccessor(dataContainer);
      var getColorValue = getValueAggrFunc(this.config.colorField, this.config.visConfig.colorAggregation);
      var getElevationValue = getValueAggrFunc(this.config.sizeField, this.config.visConfig.sizeAggregation);
      var hasFilter = Object.values(gpuFilter.filterRange).some(function (arr) {
        return arr.some(function (v) {
          return v !== 0;
        });
      });
      var getFilterValue = gpuFilter.filterValueAccessor(dataContainer)();
      var filterData = hasFilter ? getFilterDataFunc(gpuFilter.filterRange, getFilterValue) : undefined;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      return _objectSpread(_objectSpread({
        data: data,
        getPosition: getPosition,
        _filterData: filterData
      }, getColorValue ? {
        getColorValue: getColorValue
      } : {}), getElevationValue ? {
        getElevationValue: getElevationValue
      } : {});
    }
  }, {
    key: "getDefaultDeckLayerProps",
    value: function getDefaultDeckLayerProps(opts) {
      var baseProp = (0, _get2["default"])((0, _getPrototypeOf2["default"])(AggregationLayer.prototype), "getDefaultDeckLayerProps", this).call(this, opts);
      return _objectSpread(_objectSpread({}, baseProp), {}, {
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // gpu data filtering is not supported in aggregation layer
        extensions: [],
        autoHighlight: this.config.visConfig.enable3d
      });
    }
  }, {
    key: "getDefaultAggregationLayerProp",
    value: function getDefaultAggregationLayerProp(opts) {
      var gpuFilter = opts.gpuFilter,
          mapState = opts.mapState,
          _opts$layerCallbacks = opts.layerCallbacks,
          layerCallbacks = _opts$layerCallbacks === void 0 ? {} : _opts$layerCallbacks;
      var visConfig = this.config.visConfig;
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var updateTriggers = {
        getColorValue: {
          colorField: this.config.colorField,
          colorAggregation: this.config.visConfig.colorAggregation
        },
        getElevationValue: {
          sizeField: this.config.sizeField,
          sizeAggregation: this.config.visConfig.sizeAggregation
        },
        _filterData: _objectSpread({
          filterRange: gpuFilter.filterRange
        }, gpuFilter.filterValueUpdateTriggers)
      };
      return _objectSpread(_objectSpread({}, this.getDefaultDeckLayerProps(opts)), {}, {
        coverage: visConfig.coverage,
        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScaleType: this.config.colorScale,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],
        colorAggregation: visConfig.colorAggregation,
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationScaleType: this.config.sizeScale,
        elevationRange: visConfig.sizeRange,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],
        // updateTriggers
        updateTriggers: updateTriggers,
        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      });
    }
  }]);
  return AggregationLayer;
}(_baseLayer["default"]);

exports["default"] = AggregationLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYWdncmVnYXRpb24tbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwicG9pbnRQb3NSZXNvbHZlciIsImdldFZhbHVlQWdnckZ1bmMiLCJmaWVsZCIsImFnZ3JlZ2F0aW9uIiwicG9pbnRzIiwibWFwIiwicCIsInZhbHVlQWNjZXNzb3IiLCJsZW5ndGgiLCJnZXRGaWx0ZXJEYXRhRnVuYyIsImZpbHRlclJhbmdlIiwiZ2V0RmlsdGVyVmFsdWUiLCJwdCIsImV2ZXJ5IiwidmFsIiwiaSIsImdldExheWVyQ29sb3JSYW5nZSIsImNvbG9yUmFuZ2UiLCJjb2xvcnMiLCJoZXhUb1JnYiIsImFnZ3JlZ2F0ZVJlcXVpcmVkQ29sdW1ucyIsIkFnZ3JlZ2F0aW9uTGF5ZXIiLCJwcm9wcyIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJkYXRhQ29udGFpbmVyIiwiY29uZmlnIiwiY29sdW1ucyIsImdldENvbG9yUmFuZ2UiLCJkZWZhdWx0UG9pbnRDb2x1bW5QYWlycyIsImNvbG9yIiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwiY29sb3JBZ2dyIiwiZGVmYXVsdE1lYXN1cmUiLCJkb21haW4iLCJrZXkiLCJwcm9wZXJ0eSIsInJhbmdlIiwic2NhbGUiLCJzaXplIiwic2l6ZUFnZ3IiLCJjb25kaXRpb24iLCJ2aXNDb25maWciLCJlbmFibGUzZCIsImNvbnNvbGUiLCJsb2ciLCJ2aXN1YWxDaGFubmVscyIsImZpZWxkQ29uZmlnIiwibGFiZWwiLCJ2aXNDb25maWdTZXR0aW5ncyIsIm1lYXN1cmUiLCJkaXNwbGF5TmFtZSIsIm5hbWUiLCJvYmplY3QiLCJjaGFubmVsIiwiZGF0YSIsInZhbGlkYXRlVmlzdWFsQ2hhbm5lbCIsInZhbGlkYXRlRmllbGRUeXBlIiwidmFsaWRhdGVBZ2dyZWdhdGlvblR5cGUiLCJ2YWxpZGF0ZVNjYWxlIiwidmlzdWFsQ2hhbm5lbCIsImFnZ3JlZ2F0aW9uT3B0aW9ucyIsImdldEFnZ3JlZ2F0aW9uT3B0aW9ucyIsInVwZGF0ZUxheWVyQ29uZmlnIiwiaW5jbHVkZXMiLCJ1cGRhdGVMYXllclZpc0NvbmZpZyIsIk9iamVjdCIsImtleXMiLCJGSUVMRF9PUFRTIiwidHlwZSIsIkRFRkFVTFRfQUdHUkVHQVRJT04iLCJhZ2dyZWdhdGlvblR5cGUiLCJkYXRhc2V0cyIsIm5ld0ZpbHRlciIsImdldFBvc2l0aW9uIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwidXBkYXRlTWV0YSIsImZpbHRlcmVkSW5kZXgiLCJwb3MiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInB1c2giLCJvbGRMYXllckRhdGEiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJnZXRDb2xvclZhbHVlIiwiY29sb3JGaWVsZCIsImNvbG9yQWdncmVnYXRpb24iLCJnZXRFbGV2YXRpb25WYWx1ZSIsInNpemVGaWVsZCIsInNpemVBZ2dyZWdhdGlvbiIsImhhc0ZpbHRlciIsInZhbHVlcyIsInNvbWUiLCJhcnIiLCJ2IiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsImZpbHRlckRhdGEiLCJ1bmRlZmluZWQiLCJ1cGRhdGVEYXRhIiwiX2ZpbHRlckRhdGEiLCJvcHRzIiwiYmFzZVByb3AiLCJoaWdobGlnaHRDb2xvciIsIkhJR0hMSUdIX0NPTE9SXzNEIiwiZXh0ZW5zaW9ucyIsImF1dG9IaWdobGlnaHQiLCJtYXBTdGF0ZSIsImxheWVyQ2FsbGJhY2tzIiwiZWxlWm9vbUZhY3RvciIsImdldEVsZXZhdGlvblpvb21GYWN0b3IiLCJ1cGRhdGVUcmlnZ2VycyIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJnZXREZWZhdWx0RGVja0xheWVyUHJvcHMiLCJjb3ZlcmFnZSIsImNvbG9yU2NhbGVUeXBlIiwiY29sb3JTY2FsZSIsInVwcGVyUGVyY2VudGlsZSIsInBlcmNlbnRpbGUiLCJsb3dlclBlcmNlbnRpbGUiLCJleHRydWRlZCIsImVsZXZhdGlvblNjYWxlIiwiZWxldmF0aW9uU2NhbGVUeXBlIiwic2l6ZVNjYWxlIiwiZWxldmF0aW9uUmFuZ2UiLCJzaXplUmFuZ2UiLCJlbGV2YXRpb25Mb3dlclBlcmNlbnRpbGUiLCJlbGV2YXRpb25QZXJjZW50aWxlIiwiZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlIiwib25TZXRDb2xvckRvbWFpbiIsIm9uU2V0TGF5ZXJEb21haW4iLCJMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUlPLElBQU1BLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFQyxHQUFGLFFBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFFBQU9BLEdBQVA7QUFBQSxTQUFnQixVQUFBQyxFQUFFO0FBQUEsV0FBSSxVQUFBQyxDQUFDO0FBQUEsYUFBSSxDQUN6REQsRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQkosR0FBRyxDQUFDSyxRQUF4QixDQUR5RCxFQUV6REosRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQkwsR0FBRyxDQUFDTSxRQUF4QixDQUZ5RCxDQUFKO0FBQUEsS0FBTDtBQUFBLEdBQWxCO0FBQUEsQ0FBekI7Ozs7QUFLQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsTUFBRVAsR0FBRixTQUFFQSxHQUFGO0FBQUEsTUFBT0MsR0FBUCxTQUFPQSxHQUFQO0FBQUEsbUJBQW1CRCxHQUFHLENBQUNNLFFBQXZCLGNBQW1DTCxHQUFHLENBQUNLLFFBQXZDO0FBQUEsQ0FBekI7Ozs7QUFFQSxJQUFNRSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNDLEtBQUQsRUFBUUMsV0FBUixFQUF3QjtBQUN0RCxTQUFPLFVBQUFDLE1BQU0sRUFBSTtBQUNmLFdBQU9GLEtBQUssR0FDUiwrQkFDRUUsTUFBTSxD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UUFBQUEsZ0JBQWdCLEVBQUU5QyxTQUFTLENBQUM4QyxnQkFUOUI7QUFXRTtBQUNBaUMsUUFBQUEsUUFBUSxFQUFFL0UsU0FBUyxDQUFDQyxRQVp0QjtBQWFFK0UsUUFBQUEsY0FBYyxFQUFFaEYsU0FBUyxDQUFDZ0YsY0FBVixHQUEyQlosYUFiN0M7QUFjRWEsUUFBQUEsa0JBQWtCLEVBQUUsS0FBS2xHLE1BQUwsQ0FBWW1HLFNBZGxDO0FBZUVDLFFBQUFBLGNBQWMsRUFBRW5GLFNBQVMsQ0FBQ29GLFNBZjVCO0FBZ0JFQyxRQUFBQSx3QkFBd0IsRUFBRXJGLFNBQVMsQ0FBQ3NGLG1CQUFWLENBQThCLENBQTlCLENBaEI1QjtBQWlCRUMsUUFBQUEsd0JBQXdCLEVBQUV2RixTQUFTLENBQUNzRixtQkFBVixDQUE4QixDQUE5QixDQWpCNUI7QUFtQkU7QUFDQWhCLFFBQUFBLGNBQWMsRUFBZEEsY0FwQkY7QUFzQkU7QUFDQWtCLFFBQUFBLGdCQUFnQixFQUFFckIsY0FBYyxDQUFDc0I7QUF2Qm5DO0FBeUJEOzs7RUFwUjJDQyxxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcbmltcG9ydCBMYXllciBmcm9tICcuL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHthZ2dyZWdhdGV9IGZyb20gJ3V0aWxzL2FnZ3JlZ2F0ZS11dGlscyc7XG5pbXBvcnQge0hJR0hMSUdIX0NPTE9SXzNEfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmltcG9ydCB7Q0hBTk5FTF9TQ0FMRVMsIEZJRUxEX09QVFMsIERFRkFVTFRfQUdHUkVHQVRJT059IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IHBvaW50UG9zQWNjZXNzb3IgPSAoe2xhdCwgbG5nfSkgPT4gZGMgPT4gZCA9PiBbXG4gIGRjLnZhbHVlQXQoZC5pbmRleCwgbG5nLmZpZWxkSWR4KSxcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsYXQuZmllbGRJZHgpXG5dO1xuXG5leHBvcnQgY29uc3QgcG9pbnRQb3NSZXNvbHZlciA9ICh7bGF0LCBsbmd9KSA9PiBgJHtsYXQuZmllbGRJZHh9LSR7bG5nLmZpZWxkSWR4fWA7XG5cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZUFnZ3JGdW5jID0gKGZpZWxkLCBhZ2dyZWdhdGlvbikgPT4ge1xuICByZXR1cm4gcG9pbnRzID0+IHtcbiAgICByZXR1cm4gZmllbGRcbiAgICAgID8gYWdncmVnYXRlKFxuICAgICAgICAgIHBvaW50cy5tYXAocCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWVBY2Nlc3NvcihwKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBhZ2dyZWdhdGlvblxuICAgICAgICApXG4gICAgICA6IHBvaW50cy5sZW5ndGg7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsdGVyRGF0YUZ1bmMgPSAoZmlsdGVyUmFuZ2UsIGdldEZpbHRlclZhbHVlKSA9PiBwdCA9PlxuICBnZXRGaWx0ZXJWYWx1ZShwdCkuZXZlcnkoKHZhbCwgaSkgPT4gdmFsID49IGZpbHRlclJhbmdlW2ldWzBdICYmIHZhbCA8PSBmaWx0ZXJSYW5nZVtpXVsxXSk7XG5cbmNvbnN0IGdldExheWVyQ29sb3JSYW5nZSA9IGNvbG9yUmFuZ2UgPT4gY29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKTtcblxuZXhwb3J0IGNvbnN0IGFnZ3JlZ2F0ZVJlcXVpcmVkQ29sdW1ucyA9IFsnbGF0JywgJ2xuZyddO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZ2dyZWdhdGlvbkxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvciA9IGRhdGFDb250YWluZXIgPT5cbiAgICAgIHBvaW50UG9zQWNjZXNzb3IodGhpcy5jb25maWcuY29sdW1ucykoZGF0YUNvbnRhaW5lcik7XG4gICAgdGhpcy5nZXRDb2xvclJhbmdlID0gbWVtb2l6ZShnZXRMYXllckNvbG9yUmFuZ2UpO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gYWdncmVnYXRlUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uc3VwZXIubm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzLFxuICAgICAgJ2VuYWJsZTNkJyxcbiAgICAgICdjb2xvclJhbmdlJyxcbiAgICAgICdjb2xvckRvbWFpbicsXG4gICAgICAnc2l6ZVJhbmdlJyxcbiAgICAgICdzaXplU2NhbGUnLFxuICAgICAgJ3NpemVEb21haW4nLFxuICAgICAgJ3BlcmNlbnRpbGUnLFxuICAgICAgJ2NvdmVyYWdlJyxcbiAgICAgICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgICAgICdlbGV2YXRpb25TY2FsZScsXG4gICAgICAnZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcidcbiAgICBdO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICBhZ2dyZWdhdGlvbjogJ2NvbG9yQWdncmVnYXRpb24nLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3IsXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAncHJvcGVydHkucG9pbnRDb3VudCcsXG4gICAgICAgIGRvbWFpbjogJ2NvbG9yRG9tYWluJyxcbiAgICAgICAgZmllbGQ6ICdjb2xvckZpZWxkJyxcbiAgICAgICAga2V5OiAnY29sb3InLFxuICAgICAgICBwcm9wZXJ0eTogJ2NvbG9yJyxcbiAgICAgICAgcmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgICAgICAgc2NhbGU6ICdjb2xvclNjYWxlJ1xuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgYWdncmVnYXRpb246ICdzaXplQWdncmVnYXRpb24nLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplQWdncixcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgZGVmYXVsdE1lYXN1cmU6ICdwcm9wZXJ0eS5wb2ludENvdW50JyxcbiAgICAgICAgZG9tYWluOiAnc2l6ZURvbWFpbicsXG4gICAgICAgIGZpZWxkOiAnc2l6ZUZpZWxkJyxcbiAgICAgICAga2V5OiAnc2l6ZScsXG4gICAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcbiAgICAgICAgcmFuZ2U6ICdzaXplUmFuZ2UnLFxuICAgICAgICBzY2FsZTogJ3NpemVTY2FsZSdcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVzY3JpcHRpb24gb2YgYSB2aXN1YWxDaGFubmVsIGNvbmZpZ1xuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm5zIHt7bGFiZWw6IHN0cmluZywgbWVhc3VyZTogKHN0cmluZ3xzdHJpbmcpfX1cbiAgICovXG4gIGdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbihrZXkpIHtcbiAgICAvLyBlLmcuIGxhYmVsOiBDb2xvciwgbWVhc3VyZTogQXZlcmFnZSBvZiBFVEFcbiAgICBjb25zb2xlLmxvZygnZ2V0IHZpc3VhbCBjaGFubmVsIGRlc2NyaXB0aW9uJylcbiAgICBjb25zdCB7cmFuZ2UsIGZpZWxkLCBkZWZhdWx0TWVhc3VyZSwgYWdncmVnYXRpb259ID0gdGhpcy52aXN1YWxDaGFubmVsc1trZXldO1xuICAgIGNvbnN0IGZpZWxkQ29uZmlnID0gdGhpcy5jb25maWdbZmllbGRdO1xuICAgIHJldHVybiB7XG4gICAgICBsYWJlbDogdGhpcy52aXNDb25maWdTZXR0aW5nc1tyYW5nZV0ubGFiZWwsXG4gICAgICBtZWFzdXJlOiBmaWVsZENvbmZpZ1xuICAgICAgICA/IGAke3RoaXMuY29uZmlnLnZpc0NvbmZpZ1thZ2dyZWdhdGlvbl19IG9mICR7ZmllbGRDb25maWcuZGlzcGxheU5hbWUgfHwgZmllbGRDb25maWcubmFtZX1gXG4gICAgICAgIDogZGVmYXVsdE1lYXN1cmVcbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCkge1xuICAgIC8vIHJldHVybiBhZ2dyZWdhdGVkIG9iamVjdFxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogQWdncmVnYXRpb24gbGF5ZXIgaGFuZGxlcyB2aXN1YWwgY2hhbm5lbCBhZ2dyZWdhdGlvbiBpbnNpZGUgZGVjay5nbCBsYXllclxuICAgKi9cbiAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKHtkYXRhLCBkYXRhQ29udGFpbmVyfSwgY2hhbm5lbCkge1xuICAgIHRoaXMudmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgb24gdG9wIG9mIGJhc2ljIGxheWVyIHZpc3VhbCBjaGFubmVsIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIGNoYW5uZWxcbiAgICovXG4gIHZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgLy8gZmllbGQgdHlwZSBkZWNpZGVzIGFnZ3JlZ2F0aW9uIHR5cGUgZGVjaWRlcyBzY2FsZSB0eXBlXG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkVHlwZShjaGFubmVsKTtcbiAgICB0aGlzLnZhbGlkYXRlQWdncmVnYXRpb25UeXBlKGNoYW5uZWwpO1xuICAgIHRoaXMudmFsaWRhdGVTY2FsZShjaGFubmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBhZ2dyZWdhdGlvbiB0eXBlIGJhc2VkIG9uIHNlbGVjdGVkIGZpZWxkXG4gICAqL1xuICB2YWxpZGF0ZUFnZ3JlZ2F0aW9uVHlwZShjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBhZ2dyZWdhdGlvbn0gPSB2aXN1YWxDaGFubmVsO1xuICAgIGNvbnN0IGFnZ3JlZ2F0aW9uT3B0aW9ucyA9IHRoaXMuZ2V0QWdncmVnYXRpb25PcHRpb25zKGNoYW5uZWwpO1xuXG4gICAgaWYgKCFhZ2dyZWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghYWdncmVnYXRpb25PcHRpb25zLmxlbmd0aCkge1xuICAgICAgLy8gaWYgZmllbGQgY2Fubm90IGJlIGFnZ3JlZ2F0ZWQsIHNldCBmaWVsZCB0byBudWxsXG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbZmllbGRdOiBudWxsfSk7XG4gICAgfSBlbHNlIGlmICghYWdncmVnYXRpb25PcHRpb25zLmluY2x1ZGVzKHRoaXMuY29uZmlnLnZpc0NvbmZpZ1thZ2dyZWdhdGlvbl0pKSB7XG4gICAgICAvLyBjdXJyZW50IGFnZ3JlZ2F0aW9uIHR5cGUgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGZpZWxkXG4gICAgICAvLyBzZXQgYWdncmVnYXRpb24gdG8gdGhlIGZpcnN0IHN1cHBvcnRlZCBvcHRpb25cbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJWaXNDb25maWcoe1thZ2dyZWdhdGlvbl06IGFnZ3JlZ2F0aW9uT3B0aW9uc1swXX0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEFnZ3JlZ2F0aW9uT3B0aW9ucyhjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF1cbiAgICAgICAgPyBGSUVMRF9PUFRTW3RoaXMuY29uZmlnW2ZpZWxkXS50eXBlXS5zY2FsZVtjaGFubmVsU2NhbGVUeXBlXVxuICAgICAgICA6IERFRkFVTFRfQUdHUkVHQVRJT05bY2hhbm5lbFNjYWxlVHlwZV1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzY2FsZSBvcHRpb25zIGJhc2VkIG9uIGN1cnJlbnQgZmllbGQgYW5kIGFnZ3JlZ2F0aW9uIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWxcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25UeXBlID0gdGhpcy5jb25maWcudmlzQ29uZmlnW2FnZ3JlZ2F0aW9uXTtcbiAgICByZXR1cm4gdGhpcy5jb25maWdbZmllbGRdXG4gICAgICA/IC8vIHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICAgICAgRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV1bYWdncmVnYXRpb25UeXBlXVxuICAgICAgOiAvLyBkZWZhdWx0IHNjYWxlIG9wdGlvbnMgZm9yIHBvaW50IGNvdW50XG4gICAgICAgIERFRkFVTFRfQUdHUkVHQVRJT05bY2hhbm5lbFNjYWxlVHlwZV1bYWdncmVnYXRpb25UeXBlXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZ2dyZWdhdGlvbiBsYXllciBoYW5kbGVzIHZpc3VhbCBjaGFubmVsIGFnZ3JlZ2F0aW9uIGluc2lkZSBkZWNrLmdsIGxheWVyXG4gICAqL1xuICB1cGRhdGVMYXllckRvbWFpbihkYXRhc2V0cywgbmV3RmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lciwgZ2V0UG9zaXRpb24pIHtcbiAgICAvLyBnZXQgYm91bmRzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoZGF0YUNvbnRhaW5lciwgZ2V0UG9zaXRpb24pO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGRhdGEgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5kZXggPSBmaWx0ZXJlZEluZGV4W2ldO1xuICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oe2luZGV4fSk7XG5cbiAgICAgIC8vIGlmIGRvZXNuJ3QgaGF2ZSBwb2ludCBsYXQgb3IgbG5nLCBkbyBub3QgYWRkIHRoZSBwb2ludFxuICAgICAgLy8gZGVjay5nbCBjYW4ndCBoYW5kbGUgcG9zaXRpb24gPSBudWxsXG4gICAgICBpZiAocG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkpIHtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICBpbmRleFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKSB7XG4gICAgY29uc3Qge2dwdUZpbHRlciwgZGF0YUNvbnRhaW5lcn0gPSBkYXRhc2V0c1t0aGlzLmNvbmZpZy5kYXRhSWRdO1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuXG4gICAgY29uc3QgZ2V0Q29sb3JWYWx1ZSA9IGdldFZhbHVlQWdnckZ1bmMoXG4gICAgICB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgdGhpcy5jb25maWcudmlzQ29uZmlnLmNvbG9yQWdncmVnYXRpb25cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0RWxldmF0aW9uVmFsdWUgPSBnZXRWYWx1ZUFnZ3JGdW5jKFxuICAgICAgdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgdGhpcy5jb25maWcudmlzQ29uZmlnLnNpemVBZ2dyZWdhdGlvblxuICAgICk7XG4gICAgY29uc3QgaGFzRmlsdGVyID0gT2JqZWN0LnZhbHVlcyhncHVGaWx0ZXIuZmlsdGVyUmFuZ2UpLnNvbWUoYXJyID0+IGFyci5zb21lKHYgPT4gdiAhPT0gMCkpO1xuXG4gICAgY29uc3QgZ2V0RmlsdGVyVmFsdWUgPSBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKSgpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBoYXNGaWx0ZXJcbiAgICAgID8gZ2V0RmlsdGVyRGF0YUZ1bmMoZ3B1RmlsdGVyLmZpbHRlclJhbmdlLCBnZXRGaWx0ZXJWYWx1ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIF9maWx0ZXJEYXRhOiBmaWx0ZXJEYXRhLFxuICAgICAgLi4uKGdldENvbG9yVmFsdWUgPyB7Z2V0Q29sb3JWYWx1ZX0gOiB7fSksXG4gICAgICAuLi4oZ2V0RWxldmF0aW9uVmFsdWUgPyB7Z2V0RWxldmF0aW9uVmFsdWV9IDoge30pXG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyhvcHRzKSB7XG4gICAgY29uc3QgYmFzZVByb3AgPSBzdXBlci5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2VQcm9wLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IEhJR0hMSUdIX0NPTE9SXzNELFxuICAgICAgLy8gZ3B1IGRhdGEgZmlsdGVyaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWdncmVnYXRpb24gbGF5ZXJcbiAgICAgIGV4dGVuc2lvbnM6IFtdLFxuICAgICAgYXV0b0hpZ2hsaWdodDogdGhpcy5jb25maWcudmlzQ29uZmlnLmVuYWJsZTNkXG4gICAgfTtcbiAgfVxuXG4gIGdldERlZmF1bHRBZ2dyZWdhdGlvbkxheWVyUHJvcChvcHRzKSB7XG4gICAgY29uc3Qge2dwdUZpbHRlciwgbWFwU3RhdGUsIGxheWVyQ2FsbGJhY2tzID0ge319ID0gb3B0cztcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGVsZVpvb21GYWN0b3IgPSB0aGlzLmdldEVsZXZhdGlvblpvb21GYWN0b3IobWFwU3RhdGUpO1xuXG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRDb2xvclZhbHVlOiB7XG4gICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgIGNvbG9yQWdncmVnYXRpb246IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5jb2xvckFnZ3JlZ2F0aW9uXG4gICAgICB9LFxuICAgICAgZ2V0RWxldmF0aW9uVmFsdWU6IHtcbiAgICAgICAgc2l6ZUZpZWxkOiB0aGlzLmNvbmZpZy5zaXplRmllbGQsXG4gICAgICAgIHNpemVBZ2dyZWdhdGlvbjogdGhpcy5jb25maWcudmlzQ29uZmlnLnNpemVBZ2dyZWdhdGlvblxuICAgICAgfSxcbiAgICAgIF9maWx0ZXJEYXRhOiB7XG4gICAgICAgIGZpbHRlclJhbmdlOiBncHVGaWx0ZXIuZmlsdGVyUmFuZ2UsXG4gICAgICAgIC4uLmdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyhvcHRzKSxcbiAgICAgIGNvdmVyYWdlOiB2aXNDb25maWcuY292ZXJhZ2UsXG5cbiAgICAgIC8vIGNvbG9yXG4gICAgICBjb2xvclJhbmdlOiB0aGlzLmdldENvbG9yUmFuZ2UodmlzQ29uZmlnLmNvbG9yUmFuZ2UpLFxuICAgICAgY29sb3JTY2FsZVR5cGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGUsXG4gICAgICB1cHBlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5wZXJjZW50aWxlWzFdLFxuICAgICAgbG93ZXJQZXJjZW50aWxlOiB2aXNDb25maWcucGVyY2VudGlsZVswXSxcbiAgICAgIGNvbG9yQWdncmVnYXRpb246IHZpc0NvbmZpZy5jb2xvckFnZ3JlZ2F0aW9uLFxuXG4gICAgICAvLyBlbGV2YXRpb25cbiAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcbiAgICAgIGVsZXZhdGlvblNjYWxlVHlwZTogdGhpcy5jb25maWcuc2l6ZVNjYWxlLFxuICAgICAgZWxldmF0aW9uUmFuZ2U6IHZpc0NvbmZpZy5zaXplUmFuZ2UsXG4gICAgICBlbGV2YXRpb25Mb3dlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25QZXJjZW50aWxlWzBdLFxuICAgICAgZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlOiB2aXNDb25maWcuZWxldmF0aW9uUGVyY2VudGlsZVsxXSxcblxuICAgICAgLy8gdXBkYXRlVHJpZ2dlcnNcbiAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuXG4gICAgICAvLyBjYWxsYmFja3NcbiAgICAgIG9uU2V0Q29sb3JEb21haW46IGxheWVyQ2FsbGJhY2tzLm9uU2V0TGF5ZXJEb21haW5cbiAgICB9O1xuICB9XG59XG4iXX0=