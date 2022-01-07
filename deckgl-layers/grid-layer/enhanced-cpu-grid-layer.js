"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.gridAggregation = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _aggregationLayers = require("@deck.gl/aggregation-layers");

var _cpuAggregator = _interopRequireWildcard(require("../layer-utils/cpu-aggregator"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var gridAggregation = {
  key: 'position',
  updateSteps: [{
    key: 'aggregate',
    triggers: {
      cellSize: {
        prop: 'meshLevel'
      },
      position: {
        prop: 'getPosition',
        updateTrigger: 'getPosition'
      },
      aggregator: {
        prop: 'gridAggregator'
      }
    },
    updater: _cpuAggregator.getAggregatedData
  }]
};
exports.gridAggregation = gridAggregation;

var ScaleEnhancedGridLayer = /*#__PURE__*/function (_CPUGridLayer) {
  (0, _inherits2["default"])(ScaleEnhancedGridLayer, _CPUGridLayer);

  var _super = _createSuper(ScaleEnhancedGridLayer);

  function ScaleEnhancedGridLayer() {
    (0, _classCallCheck2["default"])(this, ScaleEnhancedGridLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ScaleEnhancedGridLayer, [{
    key: "initializeState",
    value: function initializeState() {
      var cpuAggregator = new _cpuAggregator["default"]({
        aggregation: gridAggregation
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
  return ScaleEnhancedGridLayer;
}(_aggregationLayers.CPUGridLayer);

exports["default"] = ScaleEnhancedGridLayer;
ScaleEnhancedGridLayer.layerName = 'ScaleEnhancedGridLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2dyaWQtbGF5ZXIvZW5oYW5jZWQtY3B1LWdyaWQtbGF5ZXIuanMiXSwibmFtZXMiOlsiZ3JpZEFnZ3JlZ2F0aW9uIiwia2V5IiwidXBkYXRlU3RlcHMiLCJ0cmlnZ2VycyIsImNlbGxTaXplIiwicHJvcCIsInBvc2l0aW9uIiwidXBkYXRlVHJpZ2dlciIsImFnZ3JlZ2F0b3IiLCJ1cGRhdGVyIiwiZ2V0QWdncmVnYXRlZERhdGEiLCJTY2FsZUVuaGFuY2VkR3JpZExheWVyIiwiY3B1QWdncmVnYXRvciIsIkNQVUFnZ3JlZ2F0b3IiLCJhZ2dyZWdhdGlvbiIsInN0YXRlIiwiYWdncmVnYXRvclN0YXRlIiwiYXR0cmlidXRlTWFuYWdlciIsImdldEF0dHJpYnV0ZU1hbmFnZXIiLCJhZGQiLCJwb3NpdGlvbnMiLCJzaXplIiwiYWNjZXNzb3IiLCJDUFVHcmlkTGF5ZXIiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsZUFBZSxHQUFHO0FBQzdCQyxFQUFBQSxHQUFHLEVBQUUsVUFEd0I7QUFFN0JDLEVBQUFBLFdBQVcsRUFBRSxDQUNYO0FBQ0VELElBQUFBLEdBQUcsRUFBRSxXQURQO0FBRUVFLElBQUFBLFFBQVEsRUFBRTtBQUNSQyxNQUFBQSxRQUFRLEVBQUU7QUFDUkMsUUFBQUEsSUFBSSxFQUFFO0FBREUsT0FERjtBQUlSQyxNQUFBQSxRQUFRLEVBQUU7QUFDUkQsUUFBQUEsSUFBSSxFQUFFLGFBREU7QUFFUkUsUUFBQUEsYUFBYSxFQUFFO0FBRlAsT0FKRjtBQVFSQyxNQUFBQSxVQUFVLEVBQUU7QUFDVkgsUUFBQUEsSUFBSSxFQUFFO0FBREk7QUFSSixLQUZaO0FBY0VJLElBQUFBLE9BQU8sRUFBRUM7QUFkWCxHQURXO0FBRmdCLENBQXhCOzs7SUFzQmNDLHNCOzs7Ozs7Ozs7Ozs7V0FDbkIsMkJBQWtCO0FBQ2hCLFVBQU1DLGFBQWEsR0FBRyxJQUFJQyx5QkFBSixDQUFrQjtBQUN0Q0MsUUFBQUEsV0FBVyxFQUFFZDtBQUR5QixPQUFsQixDQUF0QjtBQUlBLFdBQUtlLEtBQUwsR0FBYTtBQUNYSCxRQUFBQSxhQUFhLEVBQWJBLGFBRFc7QUFFWEksUUFBQUEsZUFBZSxFQUFFSixhQUFhLENBQUNHO0FBRnBCLE9BQWI7QUFJQSxVQUFNRSxnQkFBZ0IsR0FBRyxLQUFLQyxtQkFBTCxFQUF6QjtBQUNBRCxNQUFBQSxnQkFBZ0IsQ0FBQ0UsR0FBakIsQ0FBcUI7QUFDbkJDLFFBQUFBLFNBQVMsRUFBRTtBQUFDQyxVQUFBQSxJQUFJLEVBQUUsQ0FBUDtBQUFVQyxVQUFBQSxRQUFRLEVBQUU7QUFBcEI7QUFEUSxPQUFyQjtBQUdEOzs7RUFkaURDLCtCOzs7QUFpQnBEWixzQkFBc0IsQ0FBQ2EsU0FBdkIsR0FBbUMsd0JBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtDUFVHcmlkTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2FnZ3JlZ2F0aW9uLWxheWVycyc7XG5pbXBvcnQgQ1BVQWdncmVnYXRvciwge2dldEFnZ3JlZ2F0ZWREYXRhfSBmcm9tICcuLi9sYXllci11dGlscy9jcHUtYWdncmVnYXRvcic7XG5cbmV4cG9ydCBjb25zdCBncmlkQWdncmVnYXRpb24gPSB7XG4gIGtleTogJ3Bvc2l0aW9uJyxcbiAgdXBkYXRlU3RlcHM6IFtcbiAgICB7XG4gICAgICBrZXk6ICdhZ2dyZWdhdGUnLFxuICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgY2VsbFNpemU6IHtcbiAgICAgICAgICBwcm9wOiAnbWVzaExldmVsJ1xuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgIHByb3A6ICdnZXRQb3NpdGlvbicsXG4gICAgICAgICAgdXBkYXRlVHJpZ2dlcjogJ2dldFBvc2l0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICBhZ2dyZWdhdG9yOiB7XG4gICAgICAgICAgcHJvcDogJ2dyaWRBZ2dyZWdhdG9yJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlcjogZ2V0QWdncmVnYXRlZERhdGFcbiAgICB9XG4gIF1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlRW5oYW5jZWRHcmlkTGF5ZXIgZXh0ZW5kcyBDUFVHcmlkTGF5ZXIge1xuICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgY29uc3QgY3B1QWdncmVnYXRvciA9IG5ldyBDUFVBZ2dyZWdhdG9yKHtcbiAgICAgIGFnZ3JlZ2F0aW9uOiBncmlkQWdncmVnYXRpb25cbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjcHVBZ2dyZWdhdG9yLFxuICAgICAgYWdncmVnYXRvclN0YXRlOiBjcHVBZ2dyZWdhdG9yLnN0YXRlXG4gICAgfTtcbiAgICBjb25zdCBhdHRyaWJ1dGVNYW5hZ2VyID0gdGhpcy5nZXRBdHRyaWJ1dGVNYW5hZ2VyKCk7XG4gICAgYXR0cmlidXRlTWFuYWdlci5hZGQoe1xuICAgICAgcG9zaXRpb25zOiB7c2l6ZTogMywgYWNjZXNzb3I6ICdnZXRQb3NpdGlvbid9XG4gICAgfSk7XG4gIH1cbn1cblxuU2NhbGVFbmhhbmNlZEdyaWRMYXllci5sYXllck5hbWUgPSAnU2NhbGVFbmhhbmNlZEdyaWRMYXllcic7XG4iXX0=