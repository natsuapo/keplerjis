"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.gridVisConfigs = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _layers = require("@deck.gl/layers");

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _gridLayerIcon = _interopRequireDefault(require("../grid-layer/grid-layer-icon"));

var _enhancedCpuGridLayer = _interopRequireDefault(require("../../deckgl-layers/grid-layer/enhanced-cpu-grid-layer"));

var _gridUtils = require("../grid-layer/grid-utils");

var _jismeshAggLayerIcon = _interopRequireDefault(require("./jismesh-agg-layer-icon"));

var _jismeshLayerUtils = require("../jismesh-layer/jismesh-layer-utils");

var _layerFactory = require("../layer-factory");

var _deckJismeshAggLayer = _interopRequireDefault(require("./deck-jismesh-agg-layer"));

var _keplerEnhancedJismeshAggLayer = _interopRequireDefault(require("./kepler-enhanced-jismesh-agg-layer"));

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// import {pointToPolygonGeo} from './grid-utils';
// import GridLayerIcon from './grid-layer-icon';
var gridVisConfigs = {
  opacity: 'opacity',
  meshLevel: {
    type: 'number',
    defaultValue: 3,
    range: [1, 6],
    step: 1,
    isRanged: false,
    label: 'layerVisConfigs.level',
    group: _layerFactory.PROPERTY_GROUPS.cell,
    property: 'meshLevel'
  },
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  colorAggregation: {
    type: 'select',
    defaultValue: 'count',
    label: 'layerVisConfigs.colorAggregation',
    // aggregation options are based on color field types
    options: Object.keys(_constants.AGGREGATION_TYPES),
    group: _layerFactory.PROPERTY_GROUPS.color,
    property: 'colorAggregation',
    condition: function condition(config) {
      console.log(config);
      return config.colorField;
    }
  },
  //   colorAggregation:'count',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
};
exports.gridVisConfigs = gridVisConfigs;

var JISMeshAggLayer = /*#__PURE__*/function (_AggregationLayer) {
  (0, _inherits2["default"])(JISMeshAggLayer, _AggregationLayer);

  var _super = _createSuper(JISMeshAggLayer);

  function JISMeshAggLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, JISMeshAggLayer);
    _this = _super.call(this, props);
    console.log('jismesh constructor');

    _this.registerVisConfig(gridVisConfigs); // this.visConfigSettings.meshLevel.label = 'columns.meshcode.meshlevelSize';


    return _this;
  }

  (0, _createClass2["default"])(JISMeshAggLayer, [{
    key: "type",
    get: function get() {
      return 'meshagg';
    }
  }, {
    key: "name",
    get: function get() {
      return 'JIS(agg)';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _jismeshAggLayerIcon["default"];
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      console.log('render layer');
      var data = opts.data,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState;
      var zoomFactor = this.getZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var meshSize = visConfig.meshLevel;
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _keplerEnhancedJismeshAggLayer["default"](_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultAggregationLayerProp(opts)), data), {}, {
        wrapLongitude: false,
        cellSize: meshSize
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !visConfig.enable3d ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        wrapLongitude: false,
        data: [(0, _jismeshLayerUtils.meshToPolygonGeo)(hoveredObject, null, 'meshcode')].filter(function (d) {
          return d;
        }),
        getLineColor: this.config.highlightColor,
        lineWidthScale: 8 * zoomFactor
      }))] : []));
    }
  }]);
  return JISMeshAggLayer;
}(_aggregationLayer["default"]);

exports["default"] = JISMeshAggLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1hZ2ctbGF5ZXIva2VwbGVyLWppc21lc2gtYWdnLWxheWVyLmpzIl0sIm5hbWVzIjpbImdyaWRWaXNDb25maWdzIiwib3BhY2l0eSIsIm1lc2hMZXZlbCIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJyYW5nZSIsInN0ZXAiLCJpc1JhbmdlZCIsImxhYmVsIiwiZ3JvdXAiLCJQUk9QRVJUWV9HUk9VUFMiLCJjZWxsIiwicHJvcGVydHkiLCJjb2xvclJhbmdlIiwiY292ZXJhZ2UiLCJzaXplUmFuZ2UiLCJwZXJjZW50aWxlIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImVsZXZhdGlvblNjYWxlIiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsImNvbG9yQWdncmVnYXRpb24iLCJvcHRpb25zIiwiT2JqZWN0Iiwia2V5cyIsIkFHR1JFR0FUSU9OX1RZUEVTIiwiY29sb3IiLCJjb25kaXRpb24iLCJjb25maWciLCJjb25zb2xlIiwibG9nIiwiY29sb3JGaWVsZCIsInNpemVBZ2dyZWdhdGlvbiIsImVuYWJsZTNkIiwiSklTTWVzaEFnZ0xheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsIkppc21lc2hBZ2dMYXllckljb24iLCJvcHRzIiwiZGF0YSIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwidmlzQ29uZmlnIiwibWVzaFNpemUiLCJob3ZlcmVkT2JqZWN0IiwiaGFzSG92ZXJlZE9iamVjdCIsIlNjYWxlRW5oYW5jZWRKSVNNZXNoTGF5ZXIiLCJnZXREZWZhdWx0QWdncmVnYXRpb25MYXllclByb3AiLCJ3cmFwTG9uZ2l0dWRlIiwiY2VsbFNpemUiLCJHZW9Kc29uTGF5ZXIiLCJnZXREZWZhdWx0SG92ZXJMYXllclByb3BzIiwiZmlsdGVyIiwiZCIsImdldExpbmVDb2xvciIsImhpZ2hsaWdodENvbG9yIiwibGluZVdpZHRoU2NhbGUiLCJB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LENBREwsR0FFS0MsSUFGTDtBQUdFVyxRQUFBQSxhQUFhLEVBQUUsS0FIakI7QUFJRUMsUUFBQUEsUUFBUSxFQUFDTjtBQUpYLFNBREYsNkNBU01DLGFBQWEsSUFBSSxDQUFDRixTQUFTLENBQUNYLFFBQTVCLEdBQ0EsQ0FDQSxJQUFJbUIsb0JBQUosaUNBQ0ssS0FBS0MseUJBQUwsRUFETDtBQUVFSCxRQUFBQSxhQUFhLEVBQUUsS0FGakI7QUFHRVgsUUFBQUEsSUFBSSxFQUFFLENBQ0oseUNBQWlCTyxhQUFqQixFQUErQixJQUEvQixFQUFvQyxVQUFwQyxDQURJLEVBRUpRLE1BRkksQ0FFRyxVQUFBQyxDQUFDO0FBQUEsaUJBQUlBLENBQUo7QUFBQSxTQUZKLENBSFI7QUFNRUMsUUFBQUEsWUFBWSxFQUFFLEtBQUs1QixNQUFMLENBQVk2QixjQU41QjtBQU9FQyxRQUFBQSxjQUFjLEVBQUUsSUFBSWhCO0FBUHRCLFNBREEsQ0FEQSxHQVlBLEVBckJOO0FBdUJEOzs7RUFwRDBDaUIsNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0dlb0pzb25MYXllcn0gZnJvbSAnQGRlY2suZ2wvbGF5ZXJzJztcbi8vIGltcG9ydCBFbmhhbmNlZEdyaWRMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2dyaWQtbGF5ZXIvZW5oYW5jZWQtY3B1LWdyaWQtbGF5ZXInO1xuaW1wb3J0IEFnZ3JlZ2F0aW9uTGF5ZXIgZnJvbSAnLi4vYWdncmVnYXRpb24tbGF5ZXInO1xuaW1wb3J0IEdyaWRMYXllckljb24gZnJvbSAnLi4vZ3JpZC1sYXllci9ncmlkLWxheWVyLWljb24nO1xuaW1wb3J0IEVuaGFuY2VkR3JpZExheWVyIGZyb20gJy4uLy4uL2RlY2tnbC1sYXllcnMvZ3JpZC1sYXllci9lbmhhbmNlZC1jcHUtZ3JpZC1sYXllcic7XG5pbXBvcnQge3BvaW50VG9Qb2x5Z29uR2VvfSBmcm9tICcuLi9ncmlkLWxheWVyL2dyaWQtdXRpbHMnO1xuaW1wb3J0IEppc21lc2hBZ2dMYXllckljb24gZnJvbSAnLi9qaXNtZXNoLWFnZy1sYXllci1pY29uJztcbmltcG9ydCB7bWVzaFRvUG9seWdvbkdlb30gZnJvbSAnLi4vamlzbWVzaC1sYXllci9qaXNtZXNoLWxheWVyLXV0aWxzJztcbmltcG9ydCB7UFJPUEVSVFlfR1JPVVBTfSBmcm9tICcuLi9sYXllci1mYWN0b3J5JztcbmltcG9ydCBEZWNrSmlzbWVzaEFnZ0xheWVyIGZyb20gJy4vZGVjay1qaXNtZXNoLWFnZy1sYXllcic7XG5pbXBvcnQgU2NhbGVFbmhhbmNlZEpJU01lc2hMYXllciBmcm9tICcuL2tlcGxlci1lbmhhbmNlZC1qaXNtZXNoLWFnZy1sYXllcic7XG5pbXBvcnQge0FHR1JFR0FUSU9OX1RZUEVTfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xuLy8gaW1wb3J0IHtwb2ludFRvUG9seWdvbkdlb30gZnJvbSAnLi9ncmlkLXV0aWxzJztcbi8vIGltcG9ydCBHcmlkTGF5ZXJJY29uIGZyb20gJy4vZ3JpZC1sYXllci1pY29uJztcblxuZXhwb3J0IGNvbnN0IGdyaWRWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIG1lc2hMZXZlbDoge3R5cGU6J251bWJlcicsXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTozLFxuICAgICAgICAgICAgICByYW5nZTpbMSw2XSxcbiAgICAgICAgICAgICAgc3RlcDoxLFxuICAgICAgICAgICAgICBpc1JhbmdlZDpmYWxzZSxcbiAgICAgICAgICAgICAgbGFiZWw6J2xheWVyVmlzQ29uZmlncy5sZXZlbCcsXG4gICAgICAgICAgICAgIGdyb3VwOiBQUk9QRVJUWV9HUk9VUFMuY2VsbCxcbiAgICAgICAgICAgICAgcHJvcGVydHk6ICdtZXNoTGV2ZWwnfSxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgc2l6ZVJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBwZXJjZW50aWxlOiAncGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblBlcmNlbnRpbGU6ICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG4gIGVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3I6ICdlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yJyxcbiAgY29sb3JBZ2dyZWdhdGlvbjp7XG4gIHR5cGU6ICdzZWxlY3QnLFxuICAgIGRlZmF1bHRWYWx1ZTogJ2NvdW50JyxcbiAgICBsYWJlbDogJ2xheWVyVmlzQ29uZmlncy5jb2xvckFnZ3JlZ2F0aW9uJyxcbiAgICAvLyBhZ2dyZWdhdGlvbiBvcHRpb25zIGFyZSBiYXNlZCBvbiBjb2xvciBmaWVsZCB0eXBlc1xuICAgIG9wdGlvbnM6IE9iamVjdC5rZXlzKEFHR1JFR0FUSU9OX1RZUEVTKSxcbiAgICBncm91cDogUFJPUEVSVFlfR1JPVVBTLmNvbG9yLFxuICAgIHByb3BlcnR5OiAnY29sb3JBZ2dyZWdhdGlvbicsXG4gICAgY29uZGl0aW9uOiBjb25maWcgPT4ge1xuICAgIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmZpZy5jb2xvckZpZWxkXG4gIH1cblxufSxcbi8vICAgY29sb3JBZ2dyZWdhdGlvbjonY291bnQnLFxuICBzaXplQWdncmVnYXRpb246ICdzaXplQWdncmVnYXRpb24nLFxuICBlbmFibGUzZDogJ2VuYWJsZTNkJyxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSklTTWVzaEFnZ0xheWVyIGV4dGVuZHMgQWdncmVnYXRpb25MYXllciB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc29sZS5sb2coJ2ppc21lc2ggY29uc3RydWN0b3InKVxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoZ3JpZFZpc0NvbmZpZ3MpO1xuICAgIC8vIHRoaXMudmlzQ29uZmlnU2V0dGluZ3MubWVzaExldmVsLmxhYmVsID0gJ2NvbHVtbnMubWVzaGNvZGUubWVzaGxldmVsU2l6ZSc7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ21lc2hhZ2cnO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdKSVMoYWdnKSdcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEppc21lc2hBZ2dMYXllckljb247XG4gIH1cblxuICByZW5kZXJMYXllcihvcHRzKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlciBsYXllcicpO1xuICAgIGNvbnN0IHtkYXRhLCBvYmplY3RIb3ZlcmVkLCBtYXBTdGF0ZX0gPSBvcHRzO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgbWVzaFNpemUgPSB2aXNDb25maWcubWVzaExldmVsO1xuICAgIGNvbnN0IGhvdmVyZWRPYmplY3QgPSB0aGlzLmhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SG92ZXJlZCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IFNjYWxlRW5oYW5jZWRKSVNNZXNoTGF5ZXIoe1xuICAgICAgICAuLi50aGlzLmdldERlZmF1bHRBZ2dyZWdhdGlvbkxheWVyUHJvcChvcHRzKSxcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG4gICAgICAgIGNlbGxTaXplOm1lc2hTaXplXG4gICAgICB9KSxcblxuICAgICAgLy8gcmVuZGVyIGFuIG91dGxpbmUgb2YgZWFjaCBjZWxsIGlmIG5vdCBleHRydWRlZFxuICAgICAgLi4uKGhvdmVyZWRPYmplY3QgJiYgIXZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgICA/IFtcbiAgICAgICAgICBuZXcgR2VvSnNvbkxheWVyKHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgd3JhcExvbmdpdHVkZTogZmFsc2UsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIG1lc2hUb1BvbHlnb25HZW8oaG92ZXJlZE9iamVjdCxudWxsLCdtZXNoY29kZScpXG4gICAgICAgICAgICBdLmZpbHRlcihkID0+IGQpLFxuICAgICAgICAgICAgZ2V0TGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgIGxpbmVXaWR0aFNjYWxlOiA4ICogem9vbUZhY3RvclxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=