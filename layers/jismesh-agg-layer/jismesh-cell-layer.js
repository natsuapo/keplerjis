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

var _core = require("@luma.gl/core");

var _colorUtils = require("@deck.gl/aggregation-layers/dist/es5/utils/color-utils");

var _columnLayer = _interopRequireDefault(require("@deck.gl/layers/src/column-layer/column-layer"));

var _jismeshAggUtils = require("./jismesh-agg-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function nop() {}

var defaultProps = {
  colorDomain: null,
  colorRange: _colorUtils.defaultColorRange,
  getColorValue: {
    type: 'accessor',
    value: null
  },
  getColorWeight: {
    type: 'accessor',
    value: function value(x) {
      return 1;
    }
  },
  colorAggregation: 'SUM',
  gridAggregator: _jismeshAggUtils.pointToJISMesh,
  onSetElevationDomain: nop,
  cellSize: {
    type: 'number',
    min: 1,
    max: 6,
    value: 3
  },
  offset: {}
}; //the trick of it is to get the centroid of meshcode cell

var JISMeshCellLayer = /*#__PURE__*/function (_ColumnLayer) {
  (0, _inherits2["default"])(JISMeshCellLayer, _ColumnLayer);

  var _super = _createSuper(JISMeshCellLayer);

  function JISMeshCellLayer() {
    (0, _classCallCheck2["default"])(this, JISMeshCellLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(JISMeshCellLayer, [{
    key: "getGeometry",
    value: function getGeometry(diskResolution) {
      return new _core.CubeGeometry();
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _this$props = this.props,
          elevationScale = _this$props.elevationScale,
          extruded = _this$props.extruded,
          offset = _this$props.offset,
          coverage = _this$props.coverage,
          cellSize = _this$props.cellSize,
          angle = _this$props.angle;
      console.log('jismesh-cell-layer example');
      this.state.model.setUniforms(Object.assign({}, uniforms, {
        radius: cellSize / 2,
        angle: angle,
        offset: offset,
        extruded: extruded,
        coverage: coverage,
        elevationScale: elevationScale,
        edgeDistance: 1,
        isWireframe: false
      })).draw();
    }
  }]);
  return JISMeshCellLayer;
}(_columnLayer["default"]);

exports["default"] = JISMeshCellLayer;
JISMeshCellLayer.layerName = 'GridCellLayer';
JISMeshCellLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1hZ2ctbGF5ZXIvamlzbWVzaC1jZWxsLWxheWVyLmpzIl0sIm5hbWVzIjpbIm5vcCIsImRlZmF1bHRQcm9wcyIsImNvbG9yRG9tYWluIiwiY29sb3JSYW5nZSIsImRlZmF1bHRDb2xvclJhbmdlIiwiZ2V0Q29sb3JWYWx1ZSIsInR5cGUiLCJ2YWx1ZSIsImdldENvbG9yV2VpZ2h0IiwieCIsImNvbG9yQWdncmVnYXRpb24iLCJncmlkQWdncmVnYXRvciIsInBvaW50VG9KSVNNZXNoIiwib25TZXRFbGV2YXRpb25Eb21haW4iLCJjZWxsU2l6ZSIsIm1pbiIsIm1heCIsIm9mZnNldCIsIkpJU01lc2hDZWxsTGF5ZXIiLCJkaXNrUmVzb2x1dGlvbiIsIkN1YmVHZW9tZXRyeSIsInVuaWZvcm1zIiwicHJvcHMiLCJlbGV2YXRpb25TY2FsZSIsImV4dHJ1ZGVkIiwiY292ZXJhZ2UiLCJhbmdsZSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0ZSIsIm1vZGVsIiwic2V0VW5pZm9ybXMiLCJPYmplY3QiLCJhc3NpZ24iLCJyYWRpdXMiLCJlZGdlRGlzdGFuY2UiLCJpc1dpcmVmcmFtZSIsImRyYXciLCJDb2x1bW5MYXllciIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsR0FBVCxHQUFjLENBQUU7O0FBRWhCLElBQU1DLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsV0FBVyxFQUFDLElBRE87QUFFbkJDLEVBQUFBLFVBQVUsRUFBRUMsNkJBRk87QUFHbkJDLEVBQUFBLGFBQWEsRUFBRTtBQUNiQyxJQUFBQSxJQUFJLEVBQUUsVUFETztBQUViQyxJQUFBQSxLQUFLLEVBQUU7QUFGTSxHQUhJO0FBT25CQyxFQUFBQSxjQUFjLEVBQUU7QUFDZEYsSUFBQUEsSUFBSSxFQUFFLFVBRFE7QUFFZEMsSUFBQUEsS0FBSyxFQUFFLGVBQUFFLENBQUM7QUFBQSxhQUFJLENBQUo7QUFBQTtBQUZNLEdBUEc7QUFXbkJDLEVBQUFBLGdCQUFnQixFQUFFLEtBWEM7QUFZbkJDLEVBQUFBLGNBQWMsRUFBQ0MsK0JBWkk7QUFjbkJDLEVBQUFBLG9CQUFvQixFQUFDYixHQWRGO0FBZ0JuQmMsRUFBQUEsUUFBUSxFQUFFO0FBQ1JSLElBQUFBLElBQUksRUFBQyxRQURHO0FBRVJTLElBQUFBLEdBQUcsRUFBRSxDQUZHO0FBR1JDLElBQUFBLEdBQUcsRUFBQyxDQUhJO0FBSVJULElBQUFBLEtBQUssRUFBQztBQUpFLEdBaEJTO0FBdUJuQlUsRUFBQUEsTUFBTSxFQUFDO0FBdkJZLENBQXJCLEMsQ0E0QkE7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O1dBQ25CLHFCQUFZQyxjQUFaLEVBQTRCO0FBQzFCLGFBQU8sSUFBSUMsa0JBQUosRUFBUDtBQUNEOzs7V0FDRCxvQkFFUTtBQUFBLFVBRERDLFFBQ0MsUUFEREEsUUFDQztBQUFBLHdCQVFGLEtBQUtDLEtBUkg7QUFBQSxVQUVKQyxjQUZJLGVBRUpBLGNBRkk7QUFBQSxVQUdKQyxRQUhJLGVBR0pBLFFBSEk7QUFBQSxVQUlKUCxNQUpJLGVBSUpBLE1BSkk7QUFBQSxVQUtKUSxRQUxJLGVBS0pBLFFBTEk7QUFBQSxVQU1KWCxRQU5JLGVBTUpBLFFBTkk7QUFBQSxVQU9KWSxLQVBJLGVBT0pBLEtBUEk7QUFTTkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNEJBQVo7QUFDQSxXQUFLQyxLQUFMLENBQVdDLEtBQVgsQ0FBaUJDLFdBQWpCLENBQTZCQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCWixRQUFsQixFQUE0QjtBQUN2RGEsUUFBQUEsTUFBTSxFQUFFcEIsUUFBUSxHQUFHLENBRG9DO0FBRXZEWSxRQUFBQSxLQUFLLEVBQUxBLEtBRnVEO0FBR3ZEVCxRQUFBQSxNQUFNLEVBQU5BLE1BSHVEO0FBSXZETyxRQUFBQSxRQUFRLEVBQVJBLFFBSnVEO0FBS3ZEQyxRQUFBQSxRQUFRLEVBQVJBLFFBTHVEO0FBTXZERixRQUFBQSxjQUFjLEVBQWRBLGNBTnVEO0FBT3ZEWSxRQUFBQSxZQUFZLEVBQUUsQ0FQeUM7QUFRdkRDLFFBQUFBLFdBQVcsRUFBRTtBQVIwQyxPQUE1QixDQUE3QixFQVNJQyxJQVRKO0FBVUQ7OztFQTFCMkNDLHVCOzs7QUE2QjlDcEIsZ0JBQWdCLENBQUNxQixTQUFqQixHQUE2QixlQUE3QjtBQUNBckIsZ0JBQWdCLENBQUNqQixZQUFqQixHQUFnQ0EsWUFBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgeyBDdWJlR2VvbWV0cnkgfSBmcm9tICdAbHVtYS5nbC9jb3JlJztcbmltcG9ydCB7ZGVmYXVsdENvbG9yUmFuZ2V9IGZyb20gJ0BkZWNrLmdsL2FnZ3JlZ2F0aW9uLWxheWVycy9kaXN0L2VzNS91dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgQ29sdW1uTGF5ZXIgZnJvbSAnQGRlY2suZ2wvbGF5ZXJzL3NyYy9jb2x1bW4tbGF5ZXIvY29sdW1uLWxheWVyJztcbmltcG9ydCB7cG9pbnRUb0pJU01lc2h9IGZyb20gJy4vamlzbWVzaC1hZ2ctdXRpbHMnO1xuXG5mdW5jdGlvbiBub3AoKXt9XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgY29sb3JEb21haW46bnVsbCxcbiAgY29sb3JSYW5nZTogZGVmYXVsdENvbG9yUmFuZ2UsXG4gIGdldENvbG9yVmFsdWU6IHtcbiAgICB0eXBlOiAnYWNjZXNzb3InLFxuICAgIHZhbHVlOiBudWxsXG4gIH0sXG4gIGdldENvbG9yV2VpZ2h0OiB7XG4gICAgdHlwZTogJ2FjY2Vzc29yJyxcbiAgICB2YWx1ZTogeCA9PiAxXG4gIH0sXG4gIGNvbG9yQWdncmVnYXRpb246ICdTVU0nLFxuICBncmlkQWdncmVnYXRvcjpwb2ludFRvSklTTWVzaCxcblxuICBvblNldEVsZXZhdGlvbkRvbWFpbjpub3AsXG5cbiAgY2VsbFNpemU6IHtcbiAgICB0eXBlOidudW1iZXInLFxuICAgIG1pbjogMSxcbiAgICBtYXg6NixcbiAgICB2YWx1ZTozXG4gIH0sXG5cbiAgb2Zmc2V0OntcblxuICB9XG59O1xuXG4vL3RoZSB0cmljayBvZiBpdCBpcyB0byBnZXQgdGhlIGNlbnRyb2lkIG9mIG1lc2hjb2RlIGNlbGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSklTTWVzaENlbGxMYXllciBleHRlbmRzIENvbHVtbkxheWVyIHtcbiAgZ2V0R2VvbWV0cnkoZGlza1Jlc29sdXRpb24pIHtcbiAgICByZXR1cm4gbmV3IEN1YmVHZW9tZXRyeSgpO1xuICB9XG4gIGRyYXcoe1xuICAgICAgICAgdW5pZm9ybXNcbiAgICAgICB9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZWxldmF0aW9uU2NhbGUsXG4gICAgICBleHRydWRlZCxcbiAgICAgIG9mZnNldCxcbiAgICAgIGNvdmVyYWdlLFxuICAgICAgY2VsbFNpemUsXG4gICAgICBhbmdsZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnNvbGUubG9nKCdqaXNtZXNoLWNlbGwtbGF5ZXIgZXhhbXBsZScpXG4gICAgdGhpcy5zdGF0ZS5tb2RlbC5zZXRVbmlmb3JtcyhPYmplY3QuYXNzaWduKHt9LCB1bmlmb3Jtcywge1xuICAgICAgcmFkaXVzOiBjZWxsU2l6ZSAvIDIsXG4gICAgICBhbmdsZSxcbiAgICAgIG9mZnNldCxcbiAgICAgIGV4dHJ1ZGVkLFxuICAgICAgY292ZXJhZ2UsXG4gICAgICBlbGV2YXRpb25TY2FsZSxcbiAgICAgIGVkZ2VEaXN0YW5jZTogMSxcbiAgICAgIGlzV2lyZWZyYW1lOiBmYWxzZVxuICAgIH0pKS5kcmF3KCk7XG4gIH1cblxufVxuSklTTWVzaENlbGxMYXllci5sYXllck5hbWUgPSAnR3JpZENlbGxMYXllcic7XG5KSVNNZXNoQ2VsbExheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuIl19