"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jismeshVisConfigs = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

//polygon layer extends original
var jismeshVisConfigs = {
  opacity: 'opacity',
  meshcodeSize: 'meshcodeSize' // worldUnitSize: 'worldUnitSize',
  // colorRange: 'colorRange',
  // coverage: 'coverage',
  // sizeRange: 'elevationRange',
  // percentile: 'percentile',
  // elevationPercentile: 'elevationPercentile',
  // elevationScale: 'elevationScale',
  // enableElevationZoomFactor: 'enableElevationZoomFactor',
  // colorAggregation: 'aggregation',
  // sizeAggregation: 'sizeAggregation',
  // enable3d: 'enable3d'

};
exports.jismeshVisConfigs = jismeshVisConfigs;

var GridLayer = /*#__PURE__*/function (_AggregationLayer) {
  (0, _inherits2["default"])(GridLayer, _AggregationLayer);

  var _super = _createSuper(GridLayer);

  function GridLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, GridLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(jismeshVisConfigs); // this.visConfigSettings.worldUnitSize.label = 'columns.grid.worldUnitSize';


    return _this;
  }

  return GridLayer;
}(_aggregationLayer["default"]);

exports["default"] = GridLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1sYXllci9qaXNtZXNoLXBvbHlnb24tbGF5ZXIuanMiXSwibmFtZXMiOlsiamlzbWVzaFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwibWVzaGNvZGVTaXplIiwiR3JpZExheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsIkFnZ3JlZ2F0aW9uTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7QUFHQTtBQUNPLElBQU1BLGlCQUFpQixHQUFHO0FBQy9CQyxFQUFBQSxPQUFPLEVBQUUsU0FEc0I7QUFFL0JDLEVBQUFBLFlBQVksRUFBQyxjQUZrQixDQUcvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWIrQixDQUExQjs7O0lBZ0JjQyxTOzs7OztBQUVuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLDhCQUFNQSxLQUFOOztBQUVBLFVBQUtDLGlCQUFMLENBQXVCTCxpQkFBdkIsRUFIaUIsQ0FLakI7OztBQUxpQjtBQU1sQjs7O0VBUm9DTSw0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBBZ2dyZWdhdGlvbkxheWVyIGZyb20gJy4uL2FnZ3JlZ2F0aW9uLWxheWVyJztcblxuXG4vL3BvbHlnb24gbGF5ZXIgZXh0ZW5kcyBvcmlnaW5hbFxuZXhwb3J0IGNvbnN0IGppc21lc2hWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIG1lc2hjb2RlU2l6ZTonbWVzaGNvZGVTaXplJyxcbiAgLy8gd29ybGRVbml0U2l6ZTogJ3dvcmxkVW5pdFNpemUnLFxuICAvLyBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIC8vIGNvdmVyYWdlOiAnY292ZXJhZ2UnLFxuICAvLyBzaXplUmFuZ2U6ICdlbGV2YXRpb25SYW5nZScsXG4gIC8vIHBlcmNlbnRpbGU6ICdwZXJjZW50aWxlJyxcbiAgLy8gZWxldmF0aW9uUGVyY2VudGlsZTogJ2VsZXZhdGlvblBlcmNlbnRpbGUnLFxuICAvLyBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgLy8gZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvcjogJ2VuYWJsZUVsZXZhdGlvblpvb21GYWN0b3InLFxuICAvLyBjb2xvckFnZ3JlZ2F0aW9uOiAnYWdncmVnYXRpb24nLFxuICAvLyBzaXplQWdncmVnYXRpb246ICdzaXplQWdncmVnYXRpb24nLFxuICAvLyBlbmFibGUzZDogJ2VuYWJsZTNkJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZExheWVyIGV4dGVuZHMgQWdncmVnYXRpb25MYXllciB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGppc21lc2hWaXNDb25maWdzKTtcblxuICAgIC8vIHRoaXMudmlzQ29uZmlnU2V0dGluZ3Mud29ybGRVbml0U2l6ZS5sYWJlbCA9ICdjb2x1bW5zLmdyaWQud29ybGRVbml0U2l6ZSc7XG4gIH1cblxuXG5cblxuXG59XG4iXX0=