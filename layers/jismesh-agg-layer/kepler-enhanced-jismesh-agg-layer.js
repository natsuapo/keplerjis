"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _deckJismeshAggLayer = require("./deck-jismesh-agg-layer");

var _cpuAggregator = _interopRequireDefault(require("../../deckgl-layers/layer-utils/cpu-aggregator"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ScaleEnhancedJISMeshLayer = /*#__PURE__*/function (_DeckJismeshAggLayer) {
  (0, _inherits2["default"])(ScaleEnhancedJISMeshLayer, _DeckJismeshAggLayer);

  var _super = _createSuper(ScaleEnhancedJISMeshLayer);

  function ScaleEnhancedJISMeshLayer() {
    (0, _classCallCheck2["default"])(this, ScaleEnhancedJISMeshLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ScaleEnhancedJISMeshLayer, [{
    key: "initializeState",
    value: function initializeState() {
      console.log('initalize state scaled');
      var cpuAggregator = new _cpuAggregator["default"]({
        aggregation: _deckJismeshAggLayer.jismeshAggregation
      });
      this.state = {
        cpuAggregator: cpuAggregator,
        aggregatorState: cpuAggregator.state
      };
      var attributeManager = this.getAttributeManager();
      attributeManager.add({
        positions: {
          size: 3,
          accessor: 'getPosition'
        }
      });
    }
  }]);
  return ScaleEnhancedJISMeshLayer;
}(_deckJismeshAggLayer.DeckJismeshAggLayer);

exports["default"] = ScaleEnhancedJISMeshLayer;
ScaleEnhancedJISMeshLayer.layerName = 'ScaleEnhancedJISMeshLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1hZ2ctbGF5ZXIva2VwbGVyLWVuaGFuY2VkLWppc21lc2gtYWdnLWxheWVyLmpzIl0sIm5hbWVzIjpbIlNjYWxlRW5oYW5jZWRKSVNNZXNoTGF5ZXIiLCJjb25zb2xlIiwibG9nIiwiY3B1QWdncmVnYXRvciIsIkNQVUFnZ3JlZ2F0b3IiLCJhZ2dyZWdhdGlvbiIsImppc21lc2hBZ2dyZWdhdGlvbiIsInN0YXRlIiwiYWdncmVnYXRvclN0YXRlIiwiYXR0cmlidXRlTWFuYWdlciIsImdldEF0dHJpYnV0ZU1hbmFnZXIiLCJhZGQiLCJwb3NpdGlvbnMiLCJzaXplIiwiYWNjZXNzb3IiLCJEZWNrSmlzbWVzaEFnZ0xheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOzs7Ozs7SUFFcUJBLHlCOzs7Ozs7Ozs7Ozs7V0FDbkIsMkJBQWtCO0FBQ2hCQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLFVBQU1DLGFBQWEsR0FBRyxJQUFJQyx5QkFBSixDQUFrQjtBQUN0Q0MsUUFBQUEsV0FBVyxFQUFFQztBQUR5QixPQUFsQixDQUF0QjtBQUlBLFdBQUtDLEtBQUwsR0FBYTtBQUNYSixRQUFBQSxhQUFhLEVBQWJBLGFBRFc7QUFFWEssUUFBQUEsZUFBZSxFQUFFTCxhQUFhLENBQUNJO0FBRnBCLE9BQWI7QUFJQSxVQUFNRSxnQkFBZ0IsR0FBRyxLQUFLQyxtQkFBTCxFQUF6QjtBQUNBRCxNQUFBQSxnQkFBZ0IsQ0FBQ0UsR0FBakIsQ0FBcUI7QUFDbkJDLFFBQUFBLFNBQVMsRUFBRTtBQUFDQyxVQUFBQSxJQUFJLEVBQUUsQ0FBUDtBQUFVQyxVQUFBQSxRQUFRLEVBQUU7QUFBcEI7QUFEUSxPQUFyQjtBQUdEOzs7RUFmb0RDLHdDOzs7QUFrQnZEZix5QkFBeUIsQ0FBQ2dCLFNBQTFCLEdBQXNDLDJCQUF0QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7RGVja0ppc21lc2hBZ2dMYXllciwgamlzbWVzaEFnZ3JlZ2F0aW9ufSBmcm9tICcuL2RlY2stamlzbWVzaC1hZ2ctbGF5ZXInO1xuaW1wb3J0IENQVUFnZ3JlZ2F0b3IgZnJvbSAnLi4vLi4vZGVja2dsLWxheWVycy9sYXllci11dGlscy9jcHUtYWdncmVnYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlRW5oYW5jZWRKSVNNZXNoTGF5ZXIgZXh0ZW5kcyBEZWNrSmlzbWVzaEFnZ0xheWVyIHtcbiAgaW5pdGlhbGl6ZVN0YXRlKCkge1xuICAgIGNvbnNvbGUubG9nKCdpbml0YWxpemUgc3RhdGUgc2NhbGVkJylcbiAgICBjb25zdCBjcHVBZ2dyZWdhdG9yID0gbmV3IENQVUFnZ3JlZ2F0b3Ioe1xuICAgICAgYWdncmVnYXRpb246IGppc21lc2hBZ2dyZWdhdGlvblxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNwdUFnZ3JlZ2F0b3IsXG4gICAgICBhZ2dyZWdhdG9yU3RhdGU6IGNwdUFnZ3JlZ2F0b3Iuc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IGF0dHJpYnV0ZU1hbmFnZXIgPSB0aGlzLmdldEF0dHJpYnV0ZU1hbmFnZXIoKTtcbiAgICBhdHRyaWJ1dGVNYW5hZ2VyLmFkZCh7XG4gICAgICBwb3NpdGlvbnM6IHtzaXplOiAzLCBhY2Nlc3NvcjogJ2dldFBvc2l0aW9uJ31cbiAgICB9KTtcbiAgfVxuXG59XG5TY2FsZUVuaGFuY2VkSklTTWVzaExheWVyLmxheWVyTmFtZSA9ICdTY2FsZUVuaGFuY2VkSklTTWVzaExheWVyJztcbiJdfQ==