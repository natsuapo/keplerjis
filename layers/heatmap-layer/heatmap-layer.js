"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.heatmapVisConfigs = exports.pointColResolver = exports.pointPosAccessor = exports.MAX_ZOOM_LEVEL = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _defaultSettings = require("../../constants/default-settings");

var _colorUtils = require("../../utils/color-utils");

var _mapboxglLayer = _interopRequireDefault(require("../mapboxgl-layer"));

var _heatmapLayerIcon = _interopRequireDefault(require("./heatmap-layer-icon"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var MAX_ZOOM_LEVEL = 18;
exports.MAX_ZOOM_LEVEL = MAX_ZOOM_LEVEL;

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

var pointColResolver = function pointColResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx);
};

exports.pointColResolver = pointColResolver;
var heatmapVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  radius: 'heatmapRadius'
};
/**
 *
 * @param {Object} colorRange
 * @return {Array} [
 *  0, "rgba(33,102,172,0)",
 *  0.2, "rgb(103,169,207)",
 *  0.4, "rgb(209,229,240)",
 *  0.6, "rgb(253,219,199)",
 *  0.8, "rgb(239,138,98)",
 *  1, "rgb(178,24,43)"
 * ]
 */

exports.heatmapVisConfigs = heatmapVisConfigs;

var heatmapDensity = function heatmapDensity(colorRange) {
  var scaleFunction = _defaultSettings.SCALE_FUNC.quantize;
  var colors = ['#000000'].concat((0, _toConsumableArray2["default"])(colorRange.colors));
  var scale = scaleFunction().domain([0, 1]).range(colors);
  var colorDensity = scale.range().reduce(function (bands, level) {
    var invert = scale.invertExtent(level);
    return [].concat((0, _toConsumableArray2["default"])(bands), [invert[0], // first value in the range
    "rgb(".concat((0, _colorUtils.hexToRgb)(level).join(','), ")") // color
    ]);
  }, []);
  colorDensity[1] = 'rgba(0,0,0,0)';
  return colorDensity;
};

var HeatmapLayer = /*#__PURE__*/function (_MapboxGLLayer) {
  (0, _inherits2["default"])(HeatmapLayer, _MapboxGLLayer);

  var _super = _createSuper(HeatmapLayer);

  function HeatmapLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HeatmapLayer);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "columnsSelector", function (config) {
      return pointColResolver(config.columns);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "visConfigSelector", function (config) {
      return config.visConfig;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "weightFieldSelector", function (config) {
      return config.weightField ? config.weightField.name : null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "weightDomainSelector", function (config) {
      return config.weightDomain;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "paintSelector", (0, _reselect.createSelector)(_this.visConfigSelector, _this.weightFieldSelector, _this.weightDomainSelector, function (visConfig, weightField, weightDomain) {
      return {
        'heatmap-weight': weightField ? ['interpolate', ['linear'], ['get', weightField], weightDomain[0], 0, weightDomain[1], 1] : 1,
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
        'heatmap-color': ['interpolate', ['linear'], ['heatmap-density']].concat((0, _toConsumableArray2["default"])(heatmapDensity(visConfig.colorRange))),
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, visConfig.radius // radius
        ],
        'heatmap-opacity': visConfig.opacity
      };
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "computeHeatmapConfiguration", (0, _reselect.createSelector)(_this.sourceSelector, _this.filterSelector, _this.paintSelector, function (source, filter, paint) {
      return _objectSpread({
        type: 'heatmap',
        id: _this.id,
        source: source,
        layout: {
          visibility: 'visible'
        },
        maxzoom: MAX_ZOOM_LEVEL,
        paint: paint
      }, _this.isValidFilter(filter) ? {
        filter: filter
      } : {});
    }));

    _this.registerVisConfig(heatmapVisConfigs);

    _this.getPosition = (0, _lodash["default"])(pointPosAccessor, pointColResolver);
    return _this;
  }

  (0, _createClass2["default"])(HeatmapLayer, [{
    key: "type",
    get: function get() {
      return 'heatmap';
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        weight: {
          property: 'weight',
          field: 'weightField',
          scale: 'weightScale',
          domain: 'weightDomain',
          key: 'weight',
          // supportedFieldTypes can be determined by channelScaleType
          // or specified here
          defaultMeasure: 'property.density',
          supportedFieldTypes: [_defaultSettings.ALL_FIELD_TYPES.real, _defaultSettings.ALL_FIELD_TYPES.integer],
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _heatmapLayerIcon["default"];
    }
  }, {
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(channel) {
      return channel === 'color' ? {
        label: 'property.color',
        measure: 'property.density'
      } : {
        label: 'property.weight',
        measure: this.config.weightField ? this.config.weightField.name : 'property.density'
      };
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // mapbox heatmap layer color is always based on density
      // no need to set colorField, colorDomain and colorScale

      /* eslint-disable no-unused-vars */
      var _get$call$weightField = _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HeatmapLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        weightField: null,
        weightDomain: [0, 1],
        weightScale: 'linear'
      }),
          colorField = _get$call$weightField.colorField,
          colorDomain = _get$call$weightField.colorDomain,
          colorScale = _get$call$weightField.colorScale,
          layerConfig = (0, _objectWithoutProperties2["default"])(_get$call$weightField, ["colorField", "colorDomain", "colorScale"]);
      /* eslint-enable no-unused-vars */


      return layerConfig;
    }
  }, {
    key: "getPositionAccessor",
    value: function getPositionAccessor(dataContainer) {
      return this.getPosition(this.config.columns)(dataContainer);
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer) {
      var getPosition = this.getPositionAccessor(dataContainer);
      var bounds = this.getPointsBounds(dataContainer, getPosition);
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "getGeometry",
    value: function getGeometry(position) {
      return position.every(Number.isFinite) ? {
        type: 'Point',
        coordinates: position
      } : null;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var weightField = this.config.weightField;
      var dataContainer = datasets[this.config.dataId].dataContainer;
      var getPosition = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var newConfig = this.computeHeatmapConfiguration(this.config, datasets);
      newConfig.id = this.id;
      return {
        columns: this.config.columns,
        config: newConfig,
        data: data,
        weightField: weightField,
        getPosition: getPosition
      };
    }
  }]);
  return HeatmapLayer;
}(_mapboxglLayer["default"]);

var _default = HeatmapLayer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGVhdG1hcC1sYXllci9oZWF0bWFwLWxheWVyLmpzIl0sIm5hbWVzIjpbIk1BWF9aT09NX0xFVkVMIiwicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwicG9pbnRDb2xSZXNvbHZlciIsImhlYXRtYXBWaXNDb25maWdzIiwib3BhY2l0eSIsImNvbG9yUmFuZ2UiLCJyYWRpdXMiLCJoZWF0bWFwRGVuc2l0eSIsInNjYWxlRnVuY3Rpb24iLCJTQ0FMRV9GVU5DIiwicXVhbnRpemUiLCJjb2xvcnMiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwiY29sb3JEZW5zaXR5IiwicmVkdWNlIiwiYmFuZHMiLCJsZXZlbCIsImludmVydCIsImludmVydEV4dGVudCIsImpvaW4iLCJIZWF0bWFwTGF5ZXIiLCJwcm9wcyIsImNvbmZpZyIsImNvbHVtbnMiLCJ2aXNDb25maWciLCJ3ZWlnaHRGaWVsZCIsIm5hbWUiLCJ3ZWlnaHREb21haW4iLCJ2aXNDb25maWdTZWxlY3RvciIsIndlaWdodEZpZWxkU2VsZWN0b3IiLCJ3ZWlnaHREb21haW5TZWxlY3RvciIsInNvdXJjZVNlbGVjdG9yIiwiZmlsdGVyU2VsZWN0b3IiLCJwYWludFNlbGVjdG9yIiwic291cmNlIiwiZmlsdGVyIiwicGFpbnQiLCJ0eXBlIiwiaWQiLCJsYXlvdXQiLCJ2aXNpYmlsaXR5IiwibWF4em9vbSIsImlzVmFsaWRGaWx0ZXIiLCJyZWdpc3RlclZpc0NvbmZpZyIsImdldFBvc2l0aW9uIiwid2VpZ2h0IiwicHJvcGVydHkiLCJmaWVsZCIsImtleSIsImRlZmF1bHRNZWFzdXJlIiwic3VwcG9ydGVkRmllbGRUeXBlcyIsIkFMTF9GSUVMRF9UWVBFUyIsInJlYWwiLCJpbnRlZ2VyIiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwic2l6ZSIsIkhlYXRtYXBMYXllckljb24iLCJjaGFubmVsIiwibGFiZWwiLCJtZWFzdXJlIiwid2VpZ2h0U2NhbGUiLCJjb2xvckZpZWxkIiwiY29sb3JEb21haW4iLCJjb2xvclNjYWxlIiwibGF5ZXJDb25maWciLCJkYXRhQ29udGFpbmVyIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsInVwZGF0ZU1ldGEiLCJwb3NpdGlvbiIsImV2ZXJ5IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJjb29yZGluYXRlcyIsImRhdGFzZXRzIiwib2xkTGF5ZXJEYXRhIiwiZGF0YUlkIiwidXBkYXRlRGF0YSIsImRhdGEiLCJuZXdDb25maWciLCJjb21wdXRlSGVhdG1hcENvbmZpZ3VyYXRpb24iLCJNYXBib3hHTExheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVPLElBQU1BLGNBQWMsR0FBRyxFQUF2Qjs7O0FBRUEsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLE1BQUVDLEdBQUYsUUFBRUEsR0FBRjtBQUFBLE1BQU9DLEdBQVAsUUFBT0EsR0FBUDtBQUFBLFNBQWdCLFVBQUFDLEVBQUU7QUFBQSxXQUFJLFVBQUFDLENBQUM7QUFBQSxhQUFJLENBQ3pERCxFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CSixHQUFHLENBQUNLLFFBQXhCLENBRHlELEVBRXpESixFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CTCxHQUFHLENBQUNNLFFBQXhCLENBRnlELENBQUo7QUFBQSxLQUFMO0FBQUEsR0FBbEI7QUFBQSxDQUF6Qjs7OztBQUtBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFUCxHQUFGLFNBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFNBQU9BLEdBQVA7QUFBQSxtQkFBbUJELEdBQUcs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QUFBLFdBQVcsRUFBWEE7QUFMSyxPQUFQO0FBT0Q7OztFQW5Kd0J1Qyx5Qjs7ZUFzSlovRCxZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IHtDSEFOTkVMX1NDQUxFUywgU0NBTEVfRlVOQywgQUxMX0ZJRUxEX1RZUEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgTWFwYm94R0xMYXllciBmcm9tICcuLi9tYXBib3hnbC1sYXllcic7XG5pbXBvcnQgSGVhdG1hcExheWVySWNvbiBmcm9tICcuL2hlYXRtYXAtbGF5ZXItaWNvbic7XG5cbmV4cG9ydCBjb25zdCBNQVhfWk9PTV9MRVZFTCA9IDE4O1xuXG5leHBvcnQgY29uc3QgcG9pbnRQb3NBY2Nlc3NvciA9ICh7bGF0LCBsbmd9KSA9PiBkYyA9PiBkID0+IFtcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsbmcuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdC5maWVsZElkeClcbl07XG5cbmV4cG9ydCBjb25zdCBwb2ludENvbFJlc29sdmVyID0gKHtsYXQsIGxuZ30pID0+IGAke2xhdC5maWVsZElkeH0tJHtsbmcuZmllbGRJZHh9YDtcblxuZXhwb3J0IGNvbnN0IGhlYXRtYXBWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzOiAnaGVhdG1hcFJhZGl1cydcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvclJhbmdlXG4gKiBAcmV0dXJuIHtBcnJheX0gW1xuICogIDAsIFwicmdiYSgzMywxMDIsMTcyLDApXCIsXG4gKiAgMC4yLCBcInJnYigxMDMsMTY5LDIwNylcIixcbiAqICAwLjQsIFwicmdiKDIwOSwyMjksMjQwKVwiLFxuICogIDAuNiwgXCJyZ2IoMjUzLDIxOSwxOTkpXCIsXG4gKiAgMC44LCBcInJnYigyMzksMTM4LDk4KVwiLFxuICogIDEsIFwicmdiKDE3OCwyNCw0MylcIlxuICogXVxuICovXG5jb25zdCBoZWF0bWFwRGVuc2l0eSA9IGNvbG9yUmFuZ2UgPT4ge1xuICBjb25zdCBzY2FsZUZ1bmN0aW9uID0gU0NBTEVfRlVOQy5xdWFudGl6ZTtcblxuICBjb25zdCBjb2xvcnMgPSBbJyMwMDAwMDAnLCAuLi5jb2xvclJhbmdlLmNvbG9yc107XG5cbiAgY29uc3Qgc2NhbGUgPSBzY2FsZUZ1bmN0aW9uKClcbiAgICAuZG9tYWluKFswLCAxXSlcbiAgICAucmFuZ2UoY29sb3JzKTtcblxuICBjb25zdCBjb2xvckRlbnNpdHkgPSBzY2FsZS5yYW5nZSgpLnJlZHVjZSgoYmFuZHMsIGxldmVsKSA9PiB7XG4gICAgY29uc3QgaW52ZXJ0ID0gc2NhbGUuaW52ZXJ0RXh0ZW50KGxldmVsKTtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uYmFuZHMsXG4gICAgICBpbnZlcnRbMF0sIC8vIGZpcnN0IHZhbHVlIGluIHRoZSByYW5nZVxuICAgICAgYHJnYigke2hleFRvUmdiKGxldmVsKS5qb2luKCcsJyl9KWAgLy8gY29sb3JcbiAgICBdO1xuICB9LCBbXSk7XG4gIGNvbG9yRGVuc2l0eVsxXSA9ICdyZ2JhKDAsMCwwLDApJztcbiAgcmV0dXJuIGNvbG9yRGVuc2l0eTtcbn07XG5cbmNsYXNzIEhlYXRtYXBMYXllciBleHRlbmRzIE1hcGJveEdMTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGhlYXRtYXBWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uID0gbWVtb2l6ZShwb2ludFBvc0FjY2Vzc29yLCBwb2ludENvbFJlc29sdmVyKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaGVhdG1hcCc7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ3dlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnd2VpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ3dlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnd2VpZ2h0RG9tYWluJyxcbiAgICAgICAga2V5OiAnd2VpZ2h0JyxcbiAgICAgICAgLy8gc3VwcG9ydGVkRmllbGRUeXBlcyBjYW4gYmUgZGV0ZXJtaW5lZCBieSBjaGFubmVsU2NhbGVUeXBlXG4gICAgICAgIC8vIG9yIHNwZWNpZmllZCBoZXJlXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAncHJvcGVydHkuZGVuc2l0eScsXG4gICAgICAgIHN1cHBvcnRlZEZpZWxkVHlwZXM6IFtBTExfRklFTERfVFlQRVMucmVhbCwgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEhlYXRtYXBMYXllckljb247XG4gIH1cblxuICBnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsID09PSAnY29sb3InXG4gICAgICA/IHtcbiAgICAgICAgICBsYWJlbDogJ3Byb3BlcnR5LmNvbG9yJyxcbiAgICAgICAgICBtZWFzdXJlOiAncHJvcGVydHkuZGVuc2l0eSdcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgbGFiZWw6ICdwcm9wZXJ0eS53ZWlnaHQnLFxuICAgICAgICAgIG1lYXN1cmU6IHRoaXMuY29uZmlnLndlaWdodEZpZWxkID8gdGhpcy5jb25maWcud2VpZ2h0RmllbGQubmFtZSA6ICdwcm9wZXJ0eS5kZW5zaXR5J1xuICAgICAgICB9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcbiAgICAvLyBtYXBib3ggaGVhdG1hcCBsYXllciBjb2xvciBpcyBhbHdheXMgYmFzZWQgb24gZGVuc2l0eVxuICAgIC8vIG5vIG5lZWQgdG8gc2V0IGNvbG9yRmllbGQsIGNvbG9yRG9tYWluIGFuZCBjb2xvclNjYWxlXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBjb25zdCB7Y29sb3JGaWVsZCwgY29sb3JEb21haW4sIGNvbG9yU2NhbGUsIC4uLmxheWVyQ29uZmlnfSA9IHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIHdlaWdodEZpZWxkOiBudWxsLFxuICAgICAgd2VpZ2h0RG9tYWluOiBbMCwgMV0sXG4gICAgICB3ZWlnaHRTY2FsZTogJ2xpbmVhcidcbiAgICB9O1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuICAgIHJldHVybiBsYXllckNvbmZpZztcbiAgfVxuXG4gIGdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikge1xuICAgIHJldHVybiB0aGlzLmdldFBvc2l0aW9uKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIpIHtcbiAgICBjb25zdCBnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvcihkYXRhQ29udGFpbmVyKTtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhkYXRhQ29udGFpbmVyLCBnZXRQb3NpdGlvbik7XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIGNvbHVtbnNTZWxlY3RvciA9IGNvbmZpZyA9PiBwb2ludENvbFJlc29sdmVyKGNvbmZpZy5jb2x1bW5zKTtcbiAgdmlzQ29uZmlnU2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZztcbiAgd2VpZ2h0RmllbGRTZWxlY3RvciA9IGNvbmZpZyA9PiAoY29uZmlnLndlaWdodEZpZWxkID8gY29uZmlnLndlaWdodEZpZWxkLm5hbWUgOiBudWxsKTtcbiAgd2VpZ2h0RG9tYWluU2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLndlaWdodERvbWFpbjtcblxuICBwYWludFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy52aXNDb25maWdTZWxlY3RvcixcbiAgICB0aGlzLndlaWdodEZpZWxkU2VsZWN0b3IsXG4gICAgdGhpcy53ZWlnaHREb21haW5TZWxlY3RvcixcbiAgICAodmlzQ29uZmlnLCB3ZWlnaHRGaWVsZCwgd2VpZ2h0RG9tYWluKSA9PiAoe1xuICAgICAgJ2hlYXRtYXAtd2VpZ2h0Jzogd2VpZ2h0RmllbGRcbiAgICAgICAgPyBbJ2ludGVycG9sYXRlJywgWydsaW5lYXInXSwgWydnZXQnLCB3ZWlnaHRGaWVsZF0sIHdlaWdodERvbWFpblswXSwgMCwgd2VpZ2h0RG9tYWluWzFdLCAxXVxuICAgICAgICA6IDEsXG4gICAgICAnaGVhdG1hcC1pbnRlbnNpdHknOiBbJ2ludGVycG9sYXRlJywgWydsaW5lYXInXSwgWyd6b29tJ10sIDAsIDEsIE1BWF9aT09NX0xFVkVMLCAzXSxcbiAgICAgICdoZWF0bWFwLWNvbG9yJzogW1xuICAgICAgICAnaW50ZXJwb2xhdGUnLFxuICAgICAgICBbJ2xpbmVhciddLFxuICAgICAgICBbJ2hlYXRtYXAtZGVuc2l0eSddLFxuICAgICAgICAuLi5oZWF0bWFwRGVuc2l0eSh2aXNDb25maWcuY29sb3JSYW5nZSlcbiAgICAgIF0sXG4gICAgICAnaGVhdG1hcC1yYWRpdXMnOiBbXG4gICAgICAgICdpbnRlcnBvbGF0ZScsXG4gICAgICAgIFsnbGluZWFyJ10sXG4gICAgICAgIFsnem9vbSddLFxuICAgICAgICAwLFxuICAgICAgICAyLFxuICAgICAgICBNQVhfWk9PTV9MRVZFTCxcbiAgICAgICAgdmlzQ29uZmlnLnJhZGl1cyAvLyByYWRpdXNcbiAgICAgIF0sXG4gICAgICAnaGVhdG1hcC1vcGFjaXR5JzogdmlzQ29uZmlnLm9wYWNpdHlcbiAgICB9KVxuICApO1xuXG4gIGNvbXB1dGVIZWF0bWFwQ29uZmlndXJhdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgIHRoaXMuc291cmNlU2VsZWN0b3IsXG4gICAgdGhpcy5maWx0ZXJTZWxlY3RvcixcbiAgICB0aGlzLnBhaW50U2VsZWN0b3IsXG4gICAgKHNvdXJjZSwgZmlsdGVyLCBwYWludCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2hlYXRtYXAnLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgICAgICAgfSxcbiAgICAgICAgbWF4em9vbTogTUFYX1pPT01fTEVWRUwsXG4gICAgICAgIHBhaW50LFxuICAgICAgICAuLi4odGhpcy5pc1ZhbGlkRmlsdGVyKGZpbHRlcikgPyB7ZmlsdGVyfSA6IHt9KVxuICAgICAgfTtcbiAgICB9XG4gICk7XG5cbiAgZ2V0R2VvbWV0cnkocG9zaXRpb24pIHtcbiAgICByZXR1cm4gcG9zaXRpb24uZXZlcnkoTnVtYmVyLmlzRmluaXRlKVxuICAgICAgPyB7XG4gICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICBjb29yZGluYXRlczogcG9zaXRpb25cbiAgICAgICAgfVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpIHtcbiAgICBjb25zdCB7d2VpZ2h0RmllbGR9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3Qge2RhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCBnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvcihkYXRhQ29udGFpbmVyKTtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnVwZGF0ZURhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSk7XG5cbiAgICBjb25zdCBuZXdDb25maWcgPSB0aGlzLmNvbXB1dGVIZWF0bWFwQ29uZmlndXJhdGlvbih0aGlzLmNvbmZpZywgZGF0YXNldHMpO1xuICAgIG5ld0NvbmZpZy5pZCA9IHRoaXMuaWQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uczogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIGNvbmZpZzogbmV3Q29uZmlnLFxuICAgICAgZGF0YSxcbiAgICAgIHdlaWdodEZpZWxkLFxuICAgICAgZ2V0UG9zaXRpb25cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYXRtYXBMYXllcjtcbiJdfQ==