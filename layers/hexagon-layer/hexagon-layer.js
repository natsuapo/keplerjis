"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.hexagonVisConfigs = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _layers = require("@deck.gl/layers");

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _enhancedHexagonLayer = _interopRequireDefault(require("../../deckgl-layers/hexagon-layer/enhanced-hexagon-layer"));

var _hexagonUtils = require("./hexagon-utils");

var _hexagonLayerIcon = _interopRequireDefault(require("./hexagon-layer-icon"));

var _dataUtils = require("../../utils/data-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var hexagonVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
  resolution: 'resolution',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  enableElevationZoomFactor: 'enableElevationZoomFactor',
  colorAggregation: 'aggregation',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
};
exports.hexagonVisConfigs = hexagonVisConfigs;

var HexagonLayer = /*#__PURE__*/function (_AggregationLayer) {
  (0, _inherits2["default"])(HexagonLayer, _AggregationLayer);

  var _super = _createSuper(HexagonLayer);

  function HexagonLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HexagonLayer);
    _this = _super.call(this, props); // console.log('hexagon layer vis config check')

    _this.registerVisConfig(hexagonVisConfigs);

    _this.visConfigSettings.worldUnitSize.label = 'columns.hexagon.worldUnitSize';
    return _this;
  }

  (0, _createClass2["default"])(HexagonLayer, [{
    key: "type",
    get: function get() {
      return 'hexagon';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Hexbin';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _hexagonLayerIcon["default"];
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState;
      var zoomFactor = this.getZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var radius = visConfig.worldUnitSize * 1000;
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _enhancedHexagonLayer["default"](_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultAggregationLayerProp(opts)), data), {}, {
        wrapLongitude: false,
        radius: radius
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject && !visConfig.enable3d ? [new _layers.GeoJsonLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        wrapLongitude: false,
        data: [(0, _hexagonUtils.hexagonToPolygonGeo)(hoveredObject, {}, radius * visConfig.coverage, mapState)].filter(function (d) {
          return d;
        }),
        getLineColor: this.config.highlightColor,
        lineWidthScale: (0, _dataUtils.clamp)([1, 100], radius * 0.1 * zoomFactor)
      }))] : []));
    }
  }]);
  return HexagonLayer;
}(_aggregationLayer["default"]);

exports["default"] = HexagonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGV4YWdvbi1sYXllci9oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImhleGFnb25WaXNDb25maWdzIiwib3BhY2l0eSIsIndvcmxkVW5pdFNpemUiLCJyZXNvbHV0aW9uIiwiY29sb3JSYW5nZSIsImNvdmVyYWdlIiwic2l6ZVJhbmdlIiwicGVyY2VudGlsZSIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJlbGV2YXRpb25TY2FsZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJjb2xvckFnZ3JlZ2F0aW9uIiwic2l6ZUFnZ3JlZ2F0aW9uIiwiZW5hYmxlM2QiLCJIZXhhZ29uTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJsYWJlbCIsIkhleGFnb25MYXllckljb24iLCJvcHRzIiwiZGF0YSIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwidmlzQ29uZmlnIiwiY29uZmlnIiwicmFkaXVzIiwiaG92ZXJlZE9iamVjdCIsImhhc0hvdmVyZWRPYmplY3QiLCJFbmhhbmNlZEhleGFnb25MYXllciIsImdldERlZmF1bHRBZ2dyZWdhdGlvbkxheWVyUHJvcCIsIndyYXBMb25naXR1ZGUiLCJHZW9Kc29uTGF5ZXIiLCJnZXREZWZhdWx0SG92ZXJMYXllclByb3BzIiwiZmlsdGVyIiwiZCIsImdldExpbmVDb2xvciIsImhpZ2hsaWdodENvbG9yIiwibGluZVdpZHRoU2NhbGUiLCJBZ2dyZWdhdGlvbkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVPLElBQU1BLGlCQUFpQixHQUFHO0FBQy9CQyxFQUFBQSxPQUFPLEVBQUUsU0FEc0I7QUFFL0JDLEVBQUFBLGFBQWEsRUFBRSxlQUZnQjtBQUcvQkMsRUFBQUEsVUFBVSxFQUFFLFlBSG1CO0FBSS9CQyxFQUFBQSxVQUFVLEVBQUUsWUFKbUI7QUFLL0JDLEVBQUFBLFFBQVEsRUFBRSxVQUxxQjtBQU0vQkMsRUFBQUEsU0FBUyxFQUFFLGdCQU5vQjtBQU8vQkMsRUFBQUEsVUFBVSxFQUFFLFlBUG1CO0FBUS9CQyxFQUFBQSxtQkFBbUIsRUFBRSxxQkFSVTtBQVMvQkMsRUFBQUEsY0FBYyxFQUFFLGdCQVRlO0FBVS9CQyxFQUFBQSx5QkFBeUIsRUFBRSwyQkFWSTtBQVcvQkMsRUFBQUEsZ0JBQWdCLEVBQUUsYUFYYTtBQVkvQkMsRUFBQUEsZUFBZSxFQUFFLGlCQVpjO0FBYS9CQyxFQUFBQSxRQUFRLEVBQUU7QUFicUIsQ0FBMUI7OztJQWdCY0MsWTs7Ozs7QUFDbkIsd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQiw4QkFBTUEsS0FBTixFQURpQixDQUVqQjs7QUFDQSxVQUFLQyxpQkFBTCxDQUF1QmhCLGlCQUF2Qjs7QUFDQSxVQUFLaUIsaUJBQUwsQ0FBdUJmLGFBQXZCLENBQXFDZ0IsS0FBckMsR0FBNkMsK0JBQTdDO0FBSmlCO0FBS2xCOzs7O1NBRUQsZUFBVztBQUNULGFBQU8sU0FBUDtBQUNEOzs7U0FFRCxlQUFXO0FBQ1QsYUFBTyxRQUFQO0FBQ0Q7OztTQUVELGVBQWdCO0FBQ2QsYUFBT0MsNEJBQVA7QUFDRDs7O1dBRUQscUJBQVlDLElBQVosRUFBa0I7QUFBQSxVQUNUQyxJQURTLEdBQ3dCRCxJQUR4QixDQUNUQyxJQURTO0FBQUEsVUFDSEMsYUFERyxHQUN3QkYsSUFEeEIsQ0FDSEUsYUFERztBQUFBLFVBQ1lDLFFBRFosR0FDd0JILElBRHhCLENBQ1lHLFFBRFo7QUFFaEIsVUFBTUMsVUFBVSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJGLFFBQW5CLENBQW5CO0FBRmdCLFVBR1RHLFNBSFMsR0FHSSxLQUFLQyxNQUhULENBR1RELFNBSFM7QUFJaEIsVUFBTUUsTUFBTSxHQUFHRixTQUFTLENBQUN4QixhQUFWLEdBQTBCLElBQXpDO0FBQ0EsVUFBTTJCLGFBQWEsR0FBRyxLQUFLQyxnQkFBTCxDQUFzQlIsYUFBdEIsQ0FBdEI7QUFFQSxjQUNFLElBQUlTLGdDQUFKLCtDQUNLLEtBQUtDLDhCQUFMLENBQW9DWixJQUFwQyxDQURMLEdBRUtDLElBRkw7QUFHRVksUUFBQUEsYUFBYSxFQUFFLEtBSGpCO0FBSUVMLFFBQUFBLE1BQU0sRUFBTkE7QUFKRixTQURGLDZDQVNNQyxhQUFhLElBQUksQ0FBQ0gsU0FBUyxDQUFDYixRQUE1QixHQUNBLENBQ0UsSUFBSXFCLG9CQUFKLGlDQUNLLEtBQUtDLHlCQUFMLEVBREw7QUFFRUYsUUFBQUEsYUFBYSxFQUFFLEtBRmpCO0FBR0VaLFFBQUFBLElBQUksRUFBRSxDQUNKLHVDQUFvQlEsYUFBcEIsRUFBbUMsRUFBbkMsRUFBdUNELE1BQU0sR0FBR0YsU0FBUyxDQUFDckIsUUFBMUQsRUFBb0VrQixRQUFwRSxDQURJLEVBRUphLE1BRkksQ0FFRyxVQUFBQyxDQUFDO0FBQUEsaUJBQUlBLENBQUo7QUFBQSxTQUZKLENBSFI7QUFNRUMsUUFBQUEsWUFBWSxFQUFFLEtBQUtYLE1BQUwsQ0FBWVksY0FONUI7QUFPRUMsUUFBQUEsY0FBYyxFQUFFLHNCQUFNLENBQUMsQ0FBRCxFQUFJLEdBQUosQ0FBTixFQUFnQlosTUFBTSxHQUFHLEdBQVQsR0FBZUosVUFBL0I7QUFQbEIsU0FERixDQURBLEdBWUEsRUFyQk47QUF1QkQ7OztFQWxEdUNpQiw0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7R2VvSnNvbkxheWVyfSBmcm9tICdAZGVjay5nbC9sYXllcnMnO1xuaW1wb3J0IEFnZ3JlZ2F0aW9uTGF5ZXIgZnJvbSAnLi4vYWdncmVnYXRpb24tbGF5ZXInO1xuaW1wb3J0IEVuaGFuY2VkSGV4YWdvbkxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvaGV4YWdvbi1sYXllci9lbmhhbmNlZC1oZXhhZ29uLWxheWVyJztcbmltcG9ydCB7aGV4YWdvblRvUG9seWdvbkdlb30gZnJvbSAnLi9oZXhhZ29uLXV0aWxzJztcbmltcG9ydCBIZXhhZ29uTGF5ZXJJY29uIGZyb20gJy4vaGV4YWdvbi1sYXllci1pY29uJztcbmltcG9ydCB7Y2xhbXB9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgaGV4YWdvblZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgd29ybGRVbml0U2l6ZTogJ3dvcmxkVW5pdFNpemUnLFxuICByZXNvbHV0aW9uOiAncmVzb2x1dGlvbicsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgY292ZXJhZ2U6ICdjb3ZlcmFnZScsXG4gIHNpemVSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgcGVyY2VudGlsZTogJ3BlcmNlbnRpbGUnLFxuICBlbGV2YXRpb25QZXJjZW50aWxlOiAnZWxldmF0aW9uUGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblNjYWxlOiAnZWxldmF0aW9uU2NhbGUnLFxuICBlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yOiAnZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcicsXG4gIGNvbG9yQWdncmVnYXRpb246ICdhZ2dyZWdhdGlvbicsXG4gIHNpemVBZ2dyZWdhdGlvbjogJ3NpemVBZ2dyZWdhdGlvbicsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXhhZ29uTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgLy8gY29uc29sZS5sb2coJ2hleGFnb24gbGF5ZXIgdmlzIGNvbmZpZyBjaGVjaycpXG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhoZXhhZ29uVmlzQ29uZmlncyk7XG4gICAgdGhpcy52aXNDb25maWdTZXR0aW5ncy53b3JsZFVuaXRTaXplLmxhYmVsID0gJ2NvbHVtbnMuaGV4YWdvbi53b3JsZFVuaXRTaXplJztcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaGV4YWdvbic7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ0hleGJpbic7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBIZXhhZ29uTGF5ZXJJY29uO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBvYmplY3RIb3ZlcmVkLCBtYXBTdGF0ZX0gPSBvcHRzO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgcmFkaXVzID0gdmlzQ29uZmlnLndvcmxkVW5pdFNpemUgKiAxMDAwO1xuICAgIGNvbnN0IGhvdmVyZWRPYmplY3QgPSB0aGlzLmhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SG92ZXJlZCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVuaGFuY2VkSGV4YWdvbkxheWVyKHtcbiAgICAgICAgLi4udGhpcy5nZXREZWZhdWx0QWdncmVnYXRpb25MYXllclByb3Aob3B0cyksXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlLFxuICAgICAgICByYWRpdXNcbiAgICAgIH0pLFxuXG4gICAgICAvLyByZW5kZXIgYW4gb3V0bGluZSBvZiBlYWNoIGhleGFnb24gaWYgbm90IGV4dHJ1ZGVkXG4gICAgICAuLi4oaG92ZXJlZE9iamVjdCAmJiAhdmlzQ29uZmlnLmVuYWJsZTNkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgICB3cmFwTG9uZ2l0dWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIGhleGFnb25Ub1BvbHlnb25HZW8oaG92ZXJlZE9iamVjdCwge30sIHJhZGl1cyAqIHZpc0NvbmZpZy5jb3ZlcmFnZSwgbWFwU3RhdGUpXG4gICAgICAgICAgICAgIF0uZmlsdGVyKGQgPT4gZCksXG4gICAgICAgICAgICAgIGdldExpbmVDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aFNjYWxlOiBjbGFtcChbMSwgMTAwXSwgcmFkaXVzICogMC4xICogem9vbUZhY3RvcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==