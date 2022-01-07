"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckJismeshAggLayer = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _columnLayer = _interopRequireDefault(require("@deck.gl/layers/src/column-layer/column-layer"));

var _colorUtils = require("@deck.gl/aggregation-layers/src/utils/color-utils");

var _aggregationLayer = _interopRequireDefault(require("@deck.gl/aggregation-layers/src/aggregation-layer"));

var _jismeshAggUtils = require("./jismesh-agg-utils");

var _jismeshCellLayer = _interopRequireDefault(require("./jismesh-cell-layer"));

var _cpuAggregator = _interopRequireDefault(require("@deck.gl/aggregation-layers/src/utils/cpu-aggregator"));

var _jismeshUtils = require("../../utils/jismesh-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function nop() {} // export const jismeshAggregation = {
//   key: 'position',
//   updateSteps:[
//     {
//       key: 'aggregate',
//       triggers: {
//         cellSize: {
//           prop: 'meshLevel'
//         },
//         position: {
//           prop: 'getPosition',
//           updateTrigger: 'getPosition'
//         },
//         aggregator: {
//           prop: 'jismeshAggregator'
//         }
//     },
//       updater: getAggregatedData
//     }
//   ]
//
// }


var defaultProps = {
  colorDomain: null,
  colorRange: _colorUtils.defaultColorRange,
  getColorValue: {
    type: 'accessor',
    value: null
  },
  // getColorWeight: {
  //   type: 'accessor',
  //   value: x => 1
  // },
  colorAggregation: 'SUM',
  lowerPercentile: {
    type: 'number',
    value: 0,
    min: 0,
    max: 100
  },
  upperPercentile: {
    type: 'number',
    value: 100,
    min: 0,
    max: 100
  },
  colorScaleType: 'quantize',
  onSetColorDomain: nop,
  elevationDomain: null,
  elevationRange: [0, 1000],
  coverage: {
    type: 'number',
    min: 0,
    max: 1,
    value: 1
  },
  extruded: false,
  gridAggregator: _jismeshAggUtils.pointToJISMesh,
  getElevationValue: {
    type: 'accessor',
    value: null
  },
  getElevationWeight: {
    type: 'accessor',
    value: function value(x) {
      return 1;
    }
  },
  elevationLowerPercentile: {
    type: 'number',
    value: 0,
    min: 0,
    max: 100
  },
  elevationUpperPercentile: {
    type: 'number',
    value: 100,
    min: 0,
    max: 100
  },
  elevationScale: {
    type: 'number',
    min: 0,
    value: 1
  },
  elevationScaleType: 'linear',
  onSetElevationDomain: nop,
  meshLevel: {
    type: 'number',
    min: 1,
    max: 6,
    value: 3
  },
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  material: true,
  _filterData: {
    type: 'function',
    value: null,
    optional: true
  }
};

function getMeshCodeCentroid(getMeshCode, object, objectInfo) {
  console.log('get meshcode');
  var meshCode = getMeshCode(object, objectInfo); // const [lat, lng] = getCentroid(meshCode);

  return (0, _jismeshUtils.getCentroid)({
    id: meshCode
  });
}

var DeckJismeshAggLayer = /*#__PURE__*/function (_AggregationLayer) {
  (0, _inherits2["default"])(DeckJismeshAggLayer, _AggregationLayer);

  var _super = _createSuper(DeckJismeshAggLayer);

  function DeckJismeshAggLayer() {
    (0, _classCallCheck2["default"])(this, DeckJismeshAggLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DeckJismeshAggLayer, [{
    key: "_updateVertices",
    value: function _updateVertices(cellSize, viewport) {
      // console.log('update vertices')
      var centerMesh = this.state.centerMesh; //
      // const {
      //   cellSize
      // } = opts.props;
      // if (resolution < 0) {
      //   return;
      // }

      var meshcode = this.props.centerMeshCode || (0, _jismeshUtils.geom_to_meshcode)(cellSize, viewport.latitude, viewport.longitude);

      if (centerMesh === meshcode) {
        return;
      } //here the original way to set mesh vertices is not so good, need to be changed;


      if (centerMesh) {//if distance is within a threshold, not change the center meshcode;
      } //here also in common scale, no necessary?


      var unitsPerMeter = viewport.distanceScales.unitsPerMeter;
      var vertices = (0, _jismeshUtils.meshToGeoBoundary)(meshcode).slice(0, 4);

      var _getCentroid = (0, _jismeshUtils.getCentroid)({
        id: meshcode
      }),
          _getCentroid2 = (0, _slicedToArray2["default"])(_getCentroid, 2),
          centerLng = _getCentroid2[0],
          centerLat = _getCentroid2[1]; //here centerX and centerY is in common scale;


      var _viewport$projectFlat = viewport.projectFlat([centerLng, centerLat]),
          _viewport$projectFlat2 = (0, _slicedToArray2["default"])(_viewport$projectFlat, 2),
          centerX = _viewport$projectFlat2[0],
          centerY = _viewport$projectFlat2[1];

      vertices = vertices.map(function (p) {
        var worldPosition = viewport.projectFlat(p);
        return [(worldPosition[0] - centerX) / unitsPerMeter[0], (worldPosition[1] - centerY) / unitsPerMeter[1]]; // return [(worldPosition[0] - centerX), (worldPosition[1] - centerY)];
      });
      this.setState({
        centerMesh: meshcode,
        vertices: vertices
      });
    }
  }, {
    key: "shouldUpdateState",
    value: function shouldUpdateState(_ref) {
      var changeFlags = _ref.changeFlags;
      return changeFlags.somethingChanged;
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      console.log('initalize state');
      var cpuAggregator = new _cpuAggregator["default"]({
        getAggregator: function getAggregator(props) {
          return props.jismeshAggregator;
        },
        getCellSize: function getCellSize(props) {
          return props.cellSize;
        }
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
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(_ref2) {
      var info = _ref2.info;
      return this.state.cpuAggregator.getPickingInfo({
        info: info
      });
    }
  }, {
    key: "_onGetSublayerColor",
    value: function _onGetSublayerColor(cell) {
      console.log('get sublayer color');
      return this.state.cpuAggregator.getAccessor('fillColor')(cell);
    } // create a method for testing

  }, {
    key: "_onGetSublayerElevation",
    value: function _onGetSublayerElevation(cell) {
      return this.state.cpuAggregator.getAccessor('elevation')(cell);
    }
  }, {
    key: "_getSublayerUpdateTriggers",
    value: function _getSublayerUpdateTriggers() {
      return this.state.cpuAggregator.getUpdateTriggers(this.props);
    }
  }, {
    key: "updateState",
    value: function updateState(opts) {
      console.log('update state agg layer');
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(DeckJismeshAggLayer.prototype), "updateState", this).call(this, opts);
      var cpuAggregator = this.state.cpuAggregator;
      var cellSize = this.props.cellSize;

      if (opts.changeFlags.propsOrDataChanged) {
        this.setState({
          aggregatorState: cpuAggregator.updateState(opts, {
            viewport: this.context.viewport,
            attributes: this.getAttributes()
          })
        });
      }

      this._updateVertices(opts.props.cellSize, this.context.viewport);
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      console.log('render layers');
      var _this$props = this.props,
          elevationScale = _this$props.elevationScale,
          extruded = _this$props.extruded,
          coverage = _this$props.coverage,
          material = _this$props.material,
          transitions = _this$props.transitions;
      var SubLayerClass = this.getSubLayerClass('jismesh-agg', _columnLayer["default"]);

      var updateTriggers = this._getSublayerUpdateTriggers();

      var cpuAggregator = this.state.cpuAggregator;
      var sublayer_example = new SubLayerClass(this.getSubLayerProps({
        id: 'jismesh-agg',
        updateTriggers: updateTriggers
      }), {
        data: cpuAggregator.state.layerData.data,
        diskResolution: 4,
        // elevationScale,
        // extruded,
        // coverage,
        // material,
        radiusUnits: 'meters',
        radius: 1,
        vertices: this.state.vertices,
        getFillColor: this._onGetSublayerColor.bind(this),
        getElevation: this._onGetSublayerElevation.bind(this),
        // transitions: transitions && {
        //   getFillColor: transitions.getColorValue || transitions.getColorWeight,
        //   getElevation: transitions.getElevationValue || transitions.getElevationWeight
        // },
        getPosition: function getPosition(x) {
          console.log('get position here');
          return x.position[0];
        }
      });
      return sublayer_example; // const geometry = vertices && vertices.length ? {vertuces, radius:1}
    }
  }]);
  return DeckJismeshAggLayer;
}(_aggregationLayer["default"]);

exports.DeckJismeshAggLayer = DeckJismeshAggLayer;
DeckJismeshAggLayer.layerName = 'JISMeshAggLayer';
DeckJismeshAggLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1hZ2ctbGF5ZXIvZGVjay1qaXNtZXNoLWFnZy1sYXllci5qcyJdLCJuYW1lcyI6WyJub3AiLCJkZWZhdWx0UHJvcHMiLCJjb2xvckRvbWFpbiIsImNvbG9yUmFuZ2UiLCJkZWZhdWx0Q29sb3JSYW5nZSIsImdldENvbG9yVmFsdWUiLCJ0eXBlIiwidmFsdWUiLCJjb2xvckFnZ3JlZ2F0aW9uIiwibG93ZXJQZXJjZW50aWxlIiwibWluIiwibWF4IiwidXBwZXJQZXJjZW50aWxlIiwiY29sb3JTY2FsZVR5cGUiLCJvblNldENvbG9yRG9tYWluIiwiZWxldmF0aW9uRG9tYWluIiwiZWxldmF0aW9uUmFuZ2UiLCJjb3ZlcmFnZSIsImV4dHJ1ZGVkIiwiZ3JpZEFnZ3JlZ2F0b3IiLCJwb2ludFRvSklTTWVzaCIsImdldEVsZXZhdGlvblZhbHVlIiwiZ2V0RWxldmF0aW9uV2VpZ2h0IiwieCIsImVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZSIsImVsZXZhdGlvblVwcGVyUGVyY2VudGlsZSIsImVsZXZhdGlvblNjYWxlIiwiZWxldmF0aW9uU2NhbGVUeXBlIiwib25TZXRFbGV2YXRpb25Eb21haW4iLCJtZXNoTGV2ZWwiLCJnZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwibWF0ZXJpYWwiLCJfZmlsdGVyRGF0YSIsIm9wdGlvbmFsIiwiZ2V0TWVzaENvZGVDZW50cm9pZCIsImdldE1lc2hDb2RlIiwib2JqZWN0Iiwib2JqZWN0SW5mbyIsImNvbnNvbGUiLCJsb2ciLCJtZXNoQ29kZSIsImlkIiwiRGVja0ppc21lc2hBZ2dMYXllciIsImNlbGxTaXplIiwidmlld3BvcnQiLCJjZW50ZXJNZXNoIiwic3RhdGUiLCJtZXNoY29kZSIsInByb3BzIiwiY2VudGVyTWVzaENvZGUiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInVuaXRzUGVyTWV0ZXIiLCJkaXN0YW5jZVNjYWxlcyIsInZlcnRpY2VzIiwic2xpY2UiLCJjZW50ZXJMbmciLCJjZW50ZXJMYXQiLCJwcm9qZWN0RmxhdCIsImNlbnRlclgiLCJjZW50ZXJZIiwibWFwIiwicCIsIndvcmxkUG9zaXRpb24iLCJzZXRTdGF0ZSIsImNoYW5nZUZsYWdzIiwic29tZXRoaW5nQ2hhbmdlZCIsImNwdUFnZ3JlZ2F0b3IiLCJDUFVBZ2dyZWdhdG9yIiwiZ2V0QWdncmVnYXRvciIsImppc21lc2hBZ2dyZWdhdG9yIiwiZ2V0Q2VsbFNpemUiLCJhZ2dyZWdhdG9yU3RhdGUiLCJhdHRyaWJ1dGVNYW5hZ2VyIiwiZ2V0QXR0cmlidXRlTWFuYWdlciIsImFkZCIsInBvc2l0aW9ucyIsInNpemUiLCJhY2Nlc3NvciIsImluZm8iLCJnZXRQaWNraW5nSW5mbyIsImNlbGwiLCJnZXRBY2Nlc3NvciIsImdldFVwZGF0ZVRyaWdnZXJzIiwib3B0cyIsInByb3BzT3JEYXRhQ2hhbmdlZCIsInVwZGF0ZVN0YXRlIiwiY29udGV4dCIsImF0dHJpYnV0ZXMiLCJnZXRBdHRyaWJ1dGVzIiwiX3VwZGF0ZVZlcnRpY2VzIiwidHJhbnNpdGlvbnMiLCJTdWJMYXllckNsYXNzIiwiZ2V0U3ViTGF5ZXJDbGFzcyIsIkNvbHVtbkxheWVyIiwidXBkYXRlVHJpZ2dlcnMiLCJfZ2V0U3VibGF5ZXJVcGRhdGVUcmlnZ2VycyIsInN1YmxheWVyX2V4YW1wbGUiLCJnZXRTdWJMYXllclByb3BzIiwiZGF0YSIsImxheWVyRGF0YSIsImRpc2tSZXNvbHV0aW9uIiwicmFkaXVzVW5pdHMiLCJyYWRpdXMiLCJnZXRGaWxsQ29sb3IiLCJfb25HZXRTdWJsYXllckNvbG9yIiwiYmluZCIsImdldEVsZXZhdGlvbiIsIl9vbkdldFN1YmxheWVyRWxldmF0aW9uIiwiQWdncmVnYXRpb25MYXllciIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUdBLFNBQVNBLEdBQVQsR0FBZSxDQUFFLEMsQ0FHakI7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Tk07QUFRYixVQUFNOEIsZ0JBQWdCLEdBQUcsSUFBSUwsYUFBSixDQUFrQixLQUFLTSxnQkFBTCxDQUFzQjtBQUMvRHpELFFBQUFBLEVBQUUsRUFBRSxhQUQyRDtBQUUvRHNELFFBQUFBLGNBQWMsRUFBZEE7QUFGK0QsT0FBdEIsQ0FBbEIsRUFJdkI7QUFDRUksUUFBQUEsSUFBSSxFQUFFaEMsYUFBYSxDQUFDckIsS0FBZCxDQUFvQnNELFNBQXBCLENBQThCRCxJQUR0QztBQUVFRSxRQUFBQSxjQUFjLEVBQUUsQ0FGbEI7QUFHRTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxRQUFBQSxXQUFXLEVBQUUsUUFQZjtBQVFFQyxRQUFBQSxNQUFNLEVBQUMsQ0FSVDtBQVNFakQsUUFBQUEsUUFBUSxFQUFDLEtBQUtSLEtBQUwsQ0FBV1EsUUFUdEI7QUFVRWtELFFBQUFBLFlBQVksRUFBRSxLQUFLQyxtQkFBTCxDQUF5QkMsSUFBekIsQ0FBOEIsSUFBOUIsQ0FWaEI7QUFXRUMsUUFBQUEsWUFBWSxFQUFFLEtBQUtDLHVCQUFMLENBQTZCRixJQUE3QixDQUFrQyxJQUFsQyxDQVhoQjtBQVlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E3RSxRQUFBQSxXQUFXLEVBQUMscUJBQUNQLENBQUQsRUFBTztBQUNqQmdCLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaO0FBQ0EsaUJBQU9qQixDQUFDLENBQUNRLFFBQUYsQ0FBVyxDQUFYLENBQVA7QUFBcUI7QUFsQnpCLE9BSnVCLENBQXpCO0FBMEJBLGFBQU9tRSxnQkFBUCxDQWxDYSxDQW9DYjtBQUNEOzs7RUF0SnNDWSw0Qjs7O0FBeUp6Q25FLG1CQUFtQixDQUFDb0UsU0FBcEIsR0FBZ0MsaUJBQWhDO0FBQ0FwRSxtQkFBbUIsQ0FBQzFDLFlBQXBCLEdBQW1DQSxZQUFuQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBDb2x1bW5MYXllciBmcm9tICdAZGVjay5nbC9sYXllcnMvc3JjL2NvbHVtbi1sYXllci9jb2x1bW4tbGF5ZXInO1xuaW1wb3J0IHtkZWZhdWx0Q29sb3JSYW5nZX0gZnJvbSAnQGRlY2suZ2wvYWdncmVnYXRpb24tbGF5ZXJzL3NyYy91dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgQWdncmVnYXRpb25MYXllciBmcm9tICdAZGVjay5nbC9hZ2dyZWdhdGlvbi1sYXllcnMvc3JjL2FnZ3JlZ2F0aW9uLWxheWVyJztcbmltcG9ydCB7cG9pbnRUb0pJU01lc2h9IGZyb20gJy4vamlzbWVzaC1hZ2ctdXRpbHMnO1xuaW1wb3J0IEpJU01lc2hDZWxsTGF5ZXIgZnJvbSAnLi9qaXNtZXNoLWNlbGwtbGF5ZXInO1xuaW1wb3J0IENQVUFnZ3JlZ2F0b3IgZnJvbSAnQGRlY2suZ2wvYWdncmVnYXRpb24tbGF5ZXJzL3NyYy91dGlscy9jcHUtYWdncmVnYXRvcic7XG5pbXBvcnQge2dlb21fdG9fbWVzaGNvZGUsIGdldENlbnRyb2lkLCBtZXNoVG9HZW9Cb3VuZGFyeX0gZnJvbSAnLi4vLi4vdXRpbHMvamlzbWVzaC11dGlscyc7XG5cblxuZnVuY3Rpb24gbm9wKCkge31cblxuXG4vLyBleHBvcnQgY29uc3QgamlzbWVzaEFnZ3JlZ2F0aW9uID0ge1xuLy8gICBrZXk6ICdwb3NpdGlvbicsXG4vLyAgIHVwZGF0ZVN0ZXBzOltcbi8vICAgICB7XG4vLyAgICAgICBrZXk6ICdhZ2dyZWdhdGUnLFxuLy8gICAgICAgdHJpZ2dlcnM6IHtcbi8vICAgICAgICAgY2VsbFNpemU6IHtcbi8vICAgICAgICAgICBwcm9wOiAnbWVzaExldmVsJ1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBwb3NpdGlvbjoge1xuLy8gICAgICAgICAgIHByb3A6ICdnZXRQb3NpdGlvbicsXG4vLyAgICAgICAgICAgdXBkYXRlVHJpZ2dlcjogJ2dldFBvc2l0aW9uJ1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBhZ2dyZWdhdG9yOiB7XG4vLyAgICAgICAgICAgcHJvcDogJ2ppc21lc2hBZ2dyZWdhdG9yJ1xuLy8gICAgICAgICB9XG4vLyAgICAgfSxcbi8vICAgICAgIHVwZGF0ZXI6IGdldEFnZ3JlZ2F0ZWREYXRhXG4vLyAgICAgfVxuLy8gICBdXG4vL1xuLy8gfVxuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIGNvbG9yRG9tYWluOm51bGwsXG4gIGNvbG9yUmFuZ2U6IGRlZmF1bHRDb2xvclJhbmdlLFxuICBnZXRDb2xvclZhbHVlOiB7XG4gICAgdHlwZTogJ2FjY2Vzc29yJyxcbiAgICB2YWx1ZTogbnVsbFxuICB9LFxuICAvLyBnZXRDb2xvcldlaWdodDoge1xuICAvLyAgIHR5cGU6ICdhY2Nlc3NvcicsXG4gIC8vICAgdmFsdWU6IHggPT4gMVxuICAvLyB9LFxuICBjb2xvckFnZ3JlZ2F0aW9uOiAnU1VNJyxcblxuICBsb3dlclBlcmNlbnRpbGU6IHtcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICB2YWx1ZTogMCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxMDBcbiAgfSxcbiAgdXBwZXJQZXJjZW50aWxlOiB7XG4gICAgdHlwZTogJ251bWJlcicsXG4gICAgdmFsdWU6IDEwMCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxMDBcbiAgfSxcblxuICBjb2xvclNjYWxlVHlwZTogJ3F1YW50aXplJyxcbiAgb25TZXRDb2xvckRvbWFpbjogbm9wLFxuICBlbGV2YXRpb25Eb21haW46IG51bGwsXG4gIGVsZXZhdGlvblJhbmdlOiBbMCwgMTAwMF0sXG5cbiAgY292ZXJhZ2U6IHtcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxLFxuICAgIHZhbHVlOiAxXG4gIH0sXG5cbiAgZXh0cnVkZWQ6IGZhbHNlLFxuXG4gIGdyaWRBZ2dyZWdhdG9yOnBvaW50VG9KSVNNZXNoLFxuXG4gIGdldEVsZXZhdGlvblZhbHVlOiB7XG4gICAgdHlwZTogJ2FjY2Vzc29yJyxcbiAgICB2YWx1ZTogbnVsbFxuICB9LFxuXG4gIGdldEVsZXZhdGlvbldlaWdodDoge1xuICAgIHR5cGU6ICdhY2Nlc3NvcicsXG4gICAgdmFsdWU6IHggPT4gMVxuICB9LFxuXG4gIGVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZToge1xuICAgIHR5cGU6ICdudW1iZXInLFxuICAgIHZhbHVlOiAwLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDEwMFxuICB9LFxuXG4gIGVsZXZhdGlvblVwcGVyUGVyY2VudGlsZToge1xuICAgIHR5cGU6ICdudW1iZXInLFxuICAgIHZhbHVlOiAxMDAsXG4gICAgbWluOiAwLFxuICAgIG1heDogMTAwXG4gIH0sXG5cbiAgZWxldmF0aW9uU2NhbGU6IHtcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICBtaW46IDAsXG4gICAgdmFsdWU6IDFcbiAgfSxcblxuICBlbGV2YXRpb25TY2FsZVR5cGU6J2xpbmVhcicsXG4gIG9uU2V0RWxldmF0aW9uRG9tYWluOm5vcCxcblxuICBtZXNoTGV2ZWw6IHtcbiAgICB0eXBlOidudW1iZXInLFxuICAgIG1pbjogMSxcbiAgICBtYXg6NixcbiAgICB2YWx1ZTozXG4gIH0sXG5cbiAgZ2V0UG9zaXRpb246IHtcbiAgICB0eXBlOiAnYWNjZXNzb3InLFxuICAgIHZhbHVlOiB4ID0+IHgucG9zaXRpb25cbiAgfSxcbiAgbWF0ZXJpYWw6IHRydWUsXG4gIF9maWx0ZXJEYXRhOiB7XG4gICAgdHlwZTogJ2Z1bmN0aW9uJyxcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBvcHRpb25hbDogdHJ1ZVxuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRNZXNoQ29kZUNlbnRyb2lkKGdldE1lc2hDb2RlLCBvYmplY3QsIG9iamVjdEluZm8pIHtcbiAgY29uc29sZS5sb2coJ2dldCBtZXNoY29kZScpO1xuICBjb25zdCBtZXNoQ29kZSA9IGdldE1lc2hDb2RlKG9iamVjdCwgb2JqZWN0SW5mbyk7XG4gIC8vIGNvbnN0IFtsYXQsIGxuZ10gPSBnZXRDZW50cm9pZChtZXNoQ29kZSk7XG4gIHJldHVybiBnZXRDZW50cm9pZCh7aWQ6bWVzaENvZGV9KTtcbn1cblxuXG5leHBvcnQgY2xhc3MgRGVja0ppc21lc2hBZ2dMYXllciBleHRlbmRzIEFnZ3JlZ2F0aW9uTGF5ZXIge1xuXG4gIF91cGRhdGVWZXJ0aWNlcyhjZWxsU2l6ZSx2aWV3cG9ydCl7XG4gICAgLy8gY29uc29sZS5sb2coJ3VwZGF0ZSB2ZXJ0aWNlcycpXG5cblxuICAgIGNvbnN0IHtcbiAgICAgIGNlbnRlck1lc2hcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICAvL1xuICAgIC8vIGNvbnN0IHtcbiAgICAvLyAgIGNlbGxTaXplXG4gICAgLy8gfSA9IG9wdHMucHJvcHM7XG5cbiAgICAvLyBpZiAocmVzb2x1dGlvbiA8IDApIHtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG5cbiAgICBjb25zdCBtZXNoY29kZSA9IHRoaXMucHJvcHMuY2VudGVyTWVzaENvZGUgfHwgZ2VvbV90b19tZXNoY29kZShjZWxsU2l6ZSx2aWV3cG9ydC5sYXRpdHVkZSx2aWV3cG9ydC5sb25naXR1ZGUpXG5cbiAgICBpZihjZW50ZXJNZXNoID09PSBtZXNoY29kZSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9oZXJlIHRoZSBvcmlnaW5hbCB3YXkgdG8gc2V0IG1lc2ggdmVydGljZXMgaXMgbm90IHNvIGdvb2QsIG5lZWQgdG8gYmUgY2hhbmdlZDtcbiAgICBpZihjZW50ZXJNZXNoKXtcblxuICAgICAgLy9pZiBkaXN0YW5jZSBpcyB3aXRoaW4gYSB0aHJlc2hvbGQsIG5vdCBjaGFuZ2UgdGhlIGNlbnRlciBtZXNoY29kZTtcbiAgICB9XG4gICAgLy9oZXJlIGFsc28gaW4gY29tbW9uIHNjYWxlLCBubyBuZWNlc3Nhcnk/XG4gICAgY29uc3Qge3VuaXRzUGVyTWV0ZXJ9ID0gdmlld3BvcnQuZGlzdGFuY2VTY2FsZXM7XG4gICAgbGV0IHZlcnRpY2VzID0gbWVzaFRvR2VvQm91bmRhcnkobWVzaGNvZGUpLnNsaWNlKDAsNCk7XG4gICAgY29uc3QgW2NlbnRlckxuZywgY2VudGVyTGF0XSA9IGdldENlbnRyb2lkKHtpZDptZXNoY29kZX0pO1xuXG4gICAgLy9oZXJlIGNlbnRlclggYW5kIGNlbnRlclkgaXMgaW4gY29tbW9uIHNjYWxlO1xuICAgIGNvbnN0IFtjZW50ZXJYLCBjZW50ZXJZXSA9IHZpZXdwb3J0LnByb2plY3RGbGF0KFtjZW50ZXJMbmcsIGNlbnRlckxhdF0pO1xuXG4gICAgdmVydGljZXMgPSB2ZXJ0aWNlcy5tYXAocCA9PiB7XG4gICAgICBjb25zdCB3b3JsZFBvc2l0aW9uID0gdmlld3BvcnQucHJvamVjdEZsYXQocCk7XG4gICAgICByZXR1cm4gWyh3b3JsZFBvc2l0aW9uWzBdIC0gY2VudGVyWCkgLyB1bml0c1Blck1ldGVyWzBdLCAod29ybGRQb3NpdGlvblsxXSAtIGNlbnRlclkpIC8gdW5pdHNQZXJNZXRlclsxXV07XG4gICAgICAvLyByZXR1cm4gWyh3b3JsZFBvc2l0aW9uWzBdIC0gY2VudGVyWCksICh3b3JsZFBvc2l0aW9uWzFdIC0gY2VudGVyWSldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjZW50ZXJNZXNoOm1lc2hjb2RlLFxuICAgICAgdmVydGljZXNcbiAgICB9KVxuXG4gIH1cblxuXG4gIHNob3VsZFVwZGF0ZVN0YXRlKHtjaGFuZ2VGbGFnc30pe1xuICAgIHJldHVybiBjaGFuZ2VGbGFncy5zb21ldGhpbmdDaGFuZ2VkXG4gIH1cblxuICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgY29uc29sZS5sb2coJ2luaXRhbGl6ZSBzdGF0ZScpXG4gICAgY29uc3QgY3B1QWdncmVnYXRvciA9IG5ldyBDUFVBZ2dyZWdhdG9yKHtcbiAgICAgIGdldEFnZ3JlZ2F0b3I6IHByb3BzID0+IHByb3BzLmppc21lc2hBZ2dyZWdhdG9yLFxuICAgICAgZ2V0Q2VsbFNpemU6IHByb3BzID0+IHByb3BzLmNlbGxTaXplXG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNwdUFnZ3JlZ2F0b3IsXG4gICAgICBhZ2dyZWdhdG9yU3RhdGU6IGNwdUFnZ3JlZ2F0b3Iuc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IGF0dHJpYnV0ZU1hbmFnZXIgPSB0aGlzLmdldEF0dHJpYnV0ZU1hbmFnZXIoKTtcbiAgICBhdHRyaWJ1dGVNYW5hZ2VyLmFkZCh7XG4gICAgICBwb3NpdGlvbnM6IHtzaXplOiAzLCBhY2Nlc3NvcjogJ2dldFBvc2l0aW9uJ31cbiAgICB9KTtcbiAgfVxuXG4gIGdldFBpY2tpbmdJbmZvKHtpbmZvfSl7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3B1QWdncmVnYXRvci5nZXRQaWNraW5nSW5mbyh7aW5mb30pO1xuICB9XG5cbiAgX29uR2V0U3VibGF5ZXJDb2xvcihjZWxsKSB7XG4gICAgY29uc29sZS5sb2coJ2dldCBzdWJsYXllciBjb2xvcicpXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3B1QWdncmVnYXRvci5nZXRBY2Nlc3NvcignZmlsbENvbG9yJykoY2VsbCk7XG4gIH1cblxuICAvLyBjcmVhdGUgYSBtZXRob2QgZm9yIHRlc3RpbmdcbiAgX29uR2V0U3VibGF5ZXJFbGV2YXRpb24oY2VsbCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmNwdUFnZ3JlZ2F0b3IuZ2V0QWNjZXNzb3IoJ2VsZXZhdGlvbicpKGNlbGwpO1xuICB9XG5cbiAgX2dldFN1YmxheWVyVXBkYXRlVHJpZ2dlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3B1QWdncmVnYXRvci5nZXRVcGRhdGVUcmlnZ2Vycyh0aGlzLnByb3BzKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKG9wdHMpe1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgc3RhdGUgYWdnIGxheWVyJylcbiAgICBzdXBlci51cGRhdGVTdGF0ZShvcHRzKTtcbiAgICBjb25zdCB7XG4gICAgICBjcHVBZ2dyZWdhdG9yXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCB7XG4gICAgICBjZWxsU2l6ZVxuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICBpZihvcHRzLmNoYW5nZUZsYWdzLnByb3BzT3JEYXRhQ2hhbmdlZCl7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYWdncmVnYXRvclN0YXRlOiBjcHVBZ2dyZWdhdG9yLnVwZGF0ZVN0YXRlKG9wdHMsIHtcbiAgICAgICAgICB2aWV3cG9ydDogdGhpcy5jb250ZXh0LnZpZXdwb3J0LFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuZ2V0QXR0cmlidXRlcygpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVZlcnRpY2VzKG9wdHMucHJvcHMuY2VsbFNpemUsdGhpcy5jb250ZXh0LnZpZXdwb3J0KTtcblxuICB9XG5cbiAgcmVuZGVyTGF5ZXJzKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXIgbGF5ZXJzJyk7XG4gICAgY29uc3Qge2VsZXZhdGlvblNjYWxlLCBleHRydWRlZCwgY292ZXJhZ2UsIG1hdGVyaWFsLCB0cmFuc2l0aW9uc30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IFN1YkxheWVyQ2xhc3MgPSB0aGlzLmdldFN1YkxheWVyQ2xhc3MoJ2ppc21lc2gtYWdnJyxDb2x1bW5MYXllcilcbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHRoaXMuX2dldFN1YmxheWVyVXBkYXRlVHJpZ2dlcnMoKTtcblxuICAgIGNvbnN0IHtjcHVBZ2dyZWdhdG9yfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBzdWJsYXllcl9leGFtcGxlID0gbmV3IFN1YkxheWVyQ2xhc3ModGhpcy5nZXRTdWJMYXllclByb3BzKHtcbiAgICAgIGlkOiAnamlzbWVzaC1hZ2cnLFxuICAgICAgdXBkYXRlVHJpZ2dlcnNcbiAgICB9KSxcbiAgICAgIHtcbiAgICAgICAgZGF0YTogY3B1QWdncmVnYXRvci5zdGF0ZS5sYXllckRhdGEuZGF0YSxcbiAgICAgICAgZGlza1Jlc29sdXRpb246IDQsXG4gICAgICAgIC8vIGVsZXZhdGlvblNjYWxlLFxuICAgICAgICAvLyBleHRydWRlZCxcbiAgICAgICAgLy8gY292ZXJhZ2UsXG4gICAgICAgIC8vIG1hdGVyaWFsLFxuICAgICAgICByYWRpdXNVbml0czogJ21ldGVycycsXG4gICAgICAgIHJhZGl1czoxLFxuICAgICAgICB2ZXJ0aWNlczp0aGlzLnN0YXRlLnZlcnRpY2VzLFxuICAgICAgICBnZXRGaWxsQ29sb3I6IHRoaXMuX29uR2V0U3VibGF5ZXJDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgICBnZXRFbGV2YXRpb246IHRoaXMuX29uR2V0U3VibGF5ZXJFbGV2YXRpb24uYmluZCh0aGlzKSxcbiAgICAgICAgLy8gdHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zICYmIHtcbiAgICAgICAgLy8gICBnZXRGaWxsQ29sb3I6IHRyYW5zaXRpb25zLmdldENvbG9yVmFsdWUgfHwgdHJhbnNpdGlvbnMuZ2V0Q29sb3JXZWlnaHQsXG4gICAgICAgIC8vICAgZ2V0RWxldmF0aW9uOiB0cmFuc2l0aW9ucy5nZXRFbGV2YXRpb25WYWx1ZSB8fCB0cmFuc2l0aW9ucy5nZXRFbGV2YXRpb25XZWlnaHRcbiAgICAgICAgLy8gfSxcbiAgICAgICAgZ2V0UG9zaXRpb246KHgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0IHBvc2l0aW9uIGhlcmUnKTtcbiAgICAgICAgICByZXR1cm4geC5wb3NpdGlvblswXX1cbiAgICAgIH1cbiAgICApXG5cbiAgICByZXR1cm4gc3VibGF5ZXJfZXhhbXBsZVxuXG4gICAgLy8gY29uc3QgZ2VvbWV0cnkgPSB2ZXJ0aWNlcyAmJiB2ZXJ0aWNlcy5sZW5ndGggPyB7dmVydHVjZXMsIHJhZGl1czoxfVxuICB9XG59XG5cbkRlY2tKaXNtZXNoQWdnTGF5ZXIubGF5ZXJOYW1lID0gJ0pJU01lc2hBZ2dMYXllcic7XG5EZWNrSmlzbWVzaEFnZ0xheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuIl19