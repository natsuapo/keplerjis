"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.lineVisConfigs = exports.lineColumnLabels = exports.lineOptionalColumns = exports.lineRequiredColumns = exports.linePosAccessor = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extensions = require("@deck.gl/extensions");

var _layerFactory = require("../layer-factory");

var _lineLayerIcon = _interopRequireDefault(require("./line-layer-icon"));

var _arcLayer = _interopRequireDefault(require("../arc-layer/arc-layer"));

var _lineLayer = _interopRequireDefault(require("../../deckgl-layers/line-layer/line-layer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var linePosAccessor = function linePosAccessor(_ref) {
  var lat0 = _ref.lat0,
      lng0 = _ref.lng0,
      lat1 = _ref.lat1,
      lng1 = _ref.lng1,
      alt0 = _ref.alt0,
      alt1 = _ref.alt1;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng0.fieldIdx), dc.valueAt(d.index, lat0.fieldIdx), (alt0 === null || alt0 === void 0 ? void 0 : alt0.fieldIdx) > -1 ? dc.valueAt(d.index, alt0.fieldIdx) : 0, dc.valueAt(d.index, lng1.fieldIdx), dc.valueAt(d.index, lat1.fieldIdx), (alt1 === null || alt1 === void 0 ? void 0 : alt1.fieldIdx) > -1 ? dc.valueAt(d.index, alt1.fieldIdx) : 0];
    };
  };
};

exports.linePosAccessor = linePosAccessor;
var lineRequiredColumns = ['lat0', 'lng0', 'lat1', 'lng1'];
exports.lineRequiredColumns = lineRequiredColumns;
var lineOptionalColumns = ['alt0', 'alt1'];
exports.lineOptionalColumns = lineOptionalColumns;
var lineColumnLabels = {
  lat0: 'arc.lat0',
  lng0: 'arc.lng0',
  lat1: 'arc.lat1',
  lng1: 'arc.lng1',
  alt0: 'line.alt0',
  alt1: 'line.alt1'
};
exports.lineColumnLabels = lineColumnLabels;
var lineVisConfigs = {
  opacity: 'opacity',
  thickness: 'thickness',
  colorRange: 'colorRange',
  sizeRange: 'strokeWidthRange',
  targetColor: 'targetColor',
  elevationScale: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.elevationScale), {}, {
    defaultValue: 1
  })
};
exports.lineVisConfigs = lineVisConfigs;

var LineLayer = /*#__PURE__*/function (_ArcLayer) {
  (0, _inherits2["default"])(LineLayer, _ArcLayer);

  var _super = _createSuper(LineLayer);

  function LineLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, LineLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(lineVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return linePosAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(LineLayer, [{
    key: "type",
    get: function get() {
      return 'line';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _lineLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return lineRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return lineOptionalColumns;
    }
  }, {
    key: "columnLabels",
    get: function get() {
      return lineColumnLabels;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(LineLayer.prototype), "visualChannels", this);
      return _objectSpread(_objectSpread({}, visualChannels), {}, {
        sourceColor: _objectSpread(_objectSpread({}, visualChannels.sourceColor), {}, {
          accessor: 'getColor'
        })
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          interactionConfig = opts.interactionConfig;
      var layerProps = {
        widthScale: this.config.visConfig.thickness,
        elevationScale: this.config.visConfig.elevationScale
      };

      var updateTriggers = _objectSpread({
        getPosition: this.config.columns,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      }, this.getVisualChannelUpdateTriggers());

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [// base layer
      new _lineLayer["default"](_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), this.getBrushingExtensionProps(interactionConfig, 'source_target')), data), layerProps), {}, {
        updateTriggers: updateTriggers,
        extensions: [].concat((0, _toConsumableArray2["default"])(defaultLayerProps.extensions), [new _extensions.BrushingExtension()])
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject ? [new _lineLayer["default"](_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), layerProps), {}, {
        data: [hoveredObject],
        getColor: this.config.highlightColor,
        getTargetColor: this.config.highlightColor,
        getWidth: data.getWidth
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref2) {
      var _ref2$fieldPairs = _ref2.fieldPairs,
          fieldPairs = _ref2$fieldPairs === void 0 ? [] : _ref2$fieldPairs;

      if (fieldPairs.length < 2) {
        return {
          props: []
        };
      }

      var props = {}; // connect the first two point layer with line

      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        alt0: {
          value: null,
          fieldIdx: -1,
          optional: true
        },
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng,
        alt1: {
          value: null,
          fieldIdx: -1,
          optional: true
        }
      };
      props.label = "".concat(fieldPairs[0].defaultName, " -> ").concat(fieldPairs[1].defaultName, " line");
      return {
        props: [props]
      };
    }
  }]);
  return LineLayer;
}(_arcLayer["default"]);

exports["default"] = LineLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyLmpzIl0sIm5hbWVzIjpbImxpbmVQb3NBY2Nlc3NvciIsImxhdDAiLCJsbmcwIiwibGF0MSIsImxuZzEiLCJhbHQwIiwiYWx0MSIsImRjIiwiZCIsInZhbHVlQXQiLCJpbmRleCIsImZpZWxkSWR4IiwibGluZVJlcXVpcmVkQ29sdW1ucyIsImxpbmVPcHRpb25hbENvbHVtbnMiLCJsaW5lQ29sdW1uTGFiZWxzIiwibGluZVZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwidGhpY2tuZXNzIiwiY29sb3JSYW5nZSIsInNpemVSYW5nZSIsInRhcmdldENvbG9yIiwiZWxldmF0aW9uU2NhbGUiLCJMQVlFUl9WSVNfQ09ORklHUyIsImRlZmF1bHRWYWx1ZSIsIkxpbmVMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbkFjY2Vzc29yIiwiZGF0YUNvbnRhaW5lciIsImNvbmZpZyIsImNvbHVtbnMiLCJMaW5lTGF5ZXJJY29uIiwidmlzdWFsQ2hhbm5lbHMiLCJzb3VyY2VDb2xvciIsImFjY2Vzc29yIiwib3B0cyIsImRhdGEiLCJncHVGaWx0ZXIiLCJvYmplY3RIb3ZlcmVkIiwiaW50ZXJhY3Rpb25Db25maWciLCJsYXllclByb3BzIiwid2lkdGhTY2FsZSIsInZpc0NvbmZpZyIsInVwZGF0ZVRyaWdnZXJzIiwiZ2V0UG9zaXRpb24iLCJnZXRGaWx0ZXJWYWx1ZSIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJnZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMiLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsImhvdmVyZWRPYmplY3QiLCJoYXNIb3ZlcmVkT2JqZWN0IiwiRW5oYW5jZWRMaW5lTGF5ZXIiLCJnZXRCcnVzaGluZ0V4dGVuc2lvblByb3BzIiwiZXh0ZW5zaW9ucyIsIkJydXNoaW5nRXh0ZW5zaW9uIiwiZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcyIsImdldENvbG9yIiwiaGlnaGxpZ2h0Q29sb3IiLCJnZXRUYXJnZXRDb2xvciIsImdldFdpZHRoIiwiZmllbGRQYWlycyIsImxlbmd0aCIsInBhaXIiLCJsYXQiLCJsbmciLCJ2YWx1ZSIsIm9wdGlvbmFsIiwibGFiZWwiLCJkZWZhdWx0TmFtZSIsIkFyY0xheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRU8sSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUVDLElBQUYsUUFBRUEsSUFBRjtBQUFBLE1BQVFDLElBQVIsUUFBUUEsSUFBUjtBQUFBLE1BQWNDLElBQWQsUUFBY0EsSUFBZDtBQUFBLE1BQW9CQyxJQUFwQixRQUFvQkEsSUFBcEI7QUFBQSxNQUEwQkMsSUFBMUIsUUFBMEJBLElBQTFCO0FBQUEsTUFBZ0NDLElBQWhDLFFBQWdDQSxJQUFoQztBQUFBLFNBQTBDLFVBQUFDLEVBQUU7QUFBQSxXQUFJLFVBQUFDLENBQUM7QUFBQSxhQUFJLENBQ2xGRCxFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CUixJQUFJLENBQUNTLFFBQXpCLENBRGtGLEVBRWxGSixFQUFFLENBQUNFLE9BQUgsQ0FBV0QsQ0FBQyxDQUFDRSxLQUFiLEVBQW9CVCxJQUFJLENBQUNVLFFBQXpCLENBRmtGLEVBR2xGLENBQUFOLElBQUksU0FBSixJQUFBQSxJQUFJLFdBQUosWUFBQUEsSUFBSSxDQUFFTSxRQUFOLElBQWlCLENBQUMsQ0FBbEIsR0FBc0JKLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JMLElBQUksQ0FBQ00sUUFBekIsQ0FBdEIsR0FBMkQsQ0FIdUIsRUFJbEZKLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JOLElBQUksQ0FBQ08sUUFBekIsQ0FK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RTRELFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0UsSUFBZCxDQUFtQkMsR0FEWDtBQUVkOUQsUUFBQUEsSUFBSSxFQUFFMkQsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjRSxJQUFkLENBQW1CRSxHQUZYO0FBR2Q1RCxRQUFBQSxJQUFJLEVBQUU7QUFBQzZELFVBQUFBLEtBQUssRUFBRSxJQUFSO0FBQWN2RCxVQUFBQSxRQUFRLEVBQUUsQ0FBQyxDQUF6QjtBQUE0QndELFVBQUFBLFFBQVEsRUFBRTtBQUF0QyxTQUhRO0FBSWRoRSxRQUFBQSxJQUFJLEVBQUUwRCxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNFLElBQWQsQ0FBbUJDLEdBSlg7QUFLZDVELFFBQUFBLElBQUksRUFBRXlELFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0UsSUFBZCxDQUFtQkUsR0FMWDtBQU1kM0QsUUFBQUEsSUFBSSxFQUFFO0FBQUM0RCxVQUFBQSxLQUFLLEVBQUUsSUFBUjtBQUFjdkQsVUFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBekI7QUFBNEJ3RCxVQUFBQSxRQUFRLEVBQUU7QUFBdEM7QUFOUSxPQUFoQjtBQVFBMUMsTUFBQUEsS0FBSyxDQUFDMkMsS0FBTixhQUFpQlAsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjUSxXQUEvQixpQkFBaURSLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY1EsV0FBL0Q7QUFFQSxhQUFPO0FBQUM1QyxRQUFBQSxLQUFLLEVBQUUsQ0FBQ0EsS0FBRDtBQUFSLE9BQVA7QUFDRDs7O0VBekRvQzZDLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtCcnVzaGluZ0V4dGVuc2lvbn0gZnJvbSAnQGRlY2suZ2wvZXh0ZW5zaW9ucyc7XG5cbmltcG9ydCB7TEFZRVJfVklTX0NPTkZJR1N9IGZyb20gJ2xheWVycy9sYXllci1mYWN0b3J5JztcbmltcG9ydCBMaW5lTGF5ZXJJY29uIGZyb20gJy4vbGluZS1sYXllci1pY29uJztcbmltcG9ydCBBcmNMYXllciBmcm9tICcuLi9hcmMtbGF5ZXIvYXJjLWxheWVyJztcbmltcG9ydCBFbmhhbmNlZExpbmVMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2xpbmUtbGF5ZXIvbGluZS1sYXllcic7XG5cbmV4cG9ydCBjb25zdCBsaW5lUG9zQWNjZXNzb3IgPSAoe2xhdDAsIGxuZzAsIGxhdDEsIGxuZzEsIGFsdDAsIGFsdDF9KSA9PiBkYyA9PiBkID0+IFtcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsbmcwLmZpZWxkSWR4KSxcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsYXQwLmZpZWxkSWR4KSxcbiAgYWx0MD8uZmllbGRJZHggPiAtMSA/IGRjLnZhbHVlQXQoZC5pbmRleCwgYWx0MC5maWVsZElkeCkgOiAwLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxuZzEuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdDEuZmllbGRJZHgpLFxuICBhbHQxPy5maWVsZElkeCA+IC0xID8gZGMudmFsdWVBdChkLmluZGV4LCBhbHQxLmZpZWxkSWR4KSA6IDBcbl07XG5cbmV4cG9ydCBjb25zdCBsaW5lUmVxdWlyZWRDb2x1bW5zID0gWydsYXQwJywgJ2xuZzAnLCAnbGF0MScsICdsbmcxJ107XG5leHBvcnQgY29uc3QgbGluZU9wdGlvbmFsQ29sdW1ucyA9IFsnYWx0MCcsICdhbHQxJ107XG5cbmV4cG9ydCBjb25zdCBsaW5lQ29sdW1uTGFiZWxzID0ge1xuICBsYXQwOiAnYXJjLmxhdDAnLFxuICBsbmcwOiAnYXJjLmxuZzAnLFxuICBsYXQxOiAnYXJjLmxhdDEnLFxuICBsbmcxOiAnYXJjLmxuZzEnLFxuICBhbHQwOiAnbGluZS5hbHQwJyxcbiAgYWx0MTogJ2xpbmUuYWx0MSdcbn07XG5cbmV4cG9ydCBjb25zdCBsaW5lVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICB0aGlja25lc3M6ICd0aGlja25lc3MnLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHNpemVSYW5nZTogJ3N0cm9rZVdpZHRoUmFuZ2UnLFxuICB0YXJnZXRDb2xvcjogJ3RhcmdldENvbG9yJyxcbiAgZWxldmF0aW9uU2NhbGU6IHtcbiAgICAuLi5MQVlFUl9WSVNfQ09ORklHUy5lbGV2YXRpb25TY2FsZSxcbiAgICBkZWZhdWx0VmFsdWU6IDFcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUxheWVyIGV4dGVuZHMgQXJjTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcobGluZVZpc0NvbmZpZ3MpO1xuICAgIHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvciA9IGRhdGFDb250YWluZXIgPT4gbGluZVBvc0FjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdsaW5lJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIExpbmVMYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGxpbmVSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgb3B0aW9uYWxDb2x1bW5zKCkge1xuICAgIHJldHVybiBsaW5lT3B0aW9uYWxDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtbkxhYmVscygpIHtcbiAgICByZXR1cm4gbGluZUNvbHVtbkxhYmVscztcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVscyA9IHN1cGVyLnZpc3VhbENoYW5uZWxzO1xuICAgIHJldHVybiB7XG4gICAgICAuLi52aXN1YWxDaGFubmVscyxcbiAgICAgIHNvdXJjZUNvbG9yOiB7XG4gICAgICAgIC4uLnZpc3VhbENoYW5uZWxzLnNvdXJjZUNvbG9yLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldENvbG9yJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZFBhaXJzID0gW119KSB7XG4gICAgaWYgKGZpZWxkUGFpcnMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuIHtwcm9wczogW119O1xuICAgIH1cbiAgICBjb25zdCBwcm9wcyA9IHt9O1xuXG4gICAgLy8gY29ubmVjdCB0aGUgZmlyc3QgdHdvIHBvaW50IGxheWVyIHdpdGggbGluZVxuICAgIHByb3BzLmNvbHVtbnMgPSB7XG4gICAgICBsYXQwOiBmaWVsZFBhaXJzWzBdLnBhaXIubGF0LFxuICAgICAgbG5nMDogZmllbGRQYWlyc1swXS5wYWlyLmxuZyxcbiAgICAgIGFsdDA6IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX0sXG4gICAgICBsYXQxOiBmaWVsZFBhaXJzWzFdLnBhaXIubGF0LFxuICAgICAgbG5nMTogZmllbGRQYWlyc1sxXS5wYWlyLmxuZyxcbiAgICAgIGFsdDE6IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX1cbiAgICB9O1xuICAgIHByb3BzLmxhYmVsID0gYCR7ZmllbGRQYWlyc1swXS5kZWZhdWx0TmFtZX0gLT4gJHtmaWVsZFBhaXJzWzFdLmRlZmF1bHROYW1lfSBsaW5lYDtcblxuICAgIHJldHVybiB7cHJvcHM6IFtwcm9wc119O1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBncHVGaWx0ZXIsIG9iamVjdEhvdmVyZWQsIGludGVyYWN0aW9uQ29uZmlnfSA9IG9wdHM7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgd2lkdGhTY2FsZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnRoaWNrbmVzcyxcbiAgICAgIGVsZXZhdGlvblNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuZWxldmF0aW9uU2NhbGVcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRQb3NpdGlvbjogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyxcbiAgICAgIC4uLnRoaXMuZ2V0VmlzdWFsQ2hhbm5lbFVwZGF0ZVRyaWdnZXJzKClcbiAgICB9O1xuICAgIGNvbnN0IGRlZmF1bHRMYXllclByb3BzID0gdGhpcy5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG4gICAgY29uc3QgaG92ZXJlZE9iamVjdCA9IHRoaXMuaGFzSG92ZXJlZE9iamVjdChvYmplY3RIb3ZlcmVkKTtcblxuICAgIHJldHVybiBbXG4gICAgICAvLyBiYXNlIGxheWVyXG4gICAgICBuZXcgRW5oYW5jZWRMaW5lTGF5ZXIoe1xuICAgICAgICAuLi5kZWZhdWx0TGF5ZXJQcm9wcyxcbiAgICAgICAgLi4udGhpcy5nZXRCcnVzaGluZ0V4dGVuc2lvblByb3BzKGludGVyYWN0aW9uQ29uZmlnLCAnc291cmNlX3RhcmdldCcpLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICB1cGRhdGVUcmlnZ2VycyxcbiAgICAgICAgZXh0ZW5zaW9uczogWy4uLmRlZmF1bHRMYXllclByb3BzLmV4dGVuc2lvbnMsIG5ldyBCcnVzaGluZ0V4dGVuc2lvbigpXVxuICAgICAgfSksXG4gICAgICAvLyBob3ZlciBsYXllclxuICAgICAgLi4uKGhvdmVyZWRPYmplY3RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgRW5oYW5jZWRMaW5lTGF5ZXIoe1xuICAgICAgICAgICAgICAuLi50aGlzLmdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMoKSxcbiAgICAgICAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgICAgICAgZGF0YTogW2hvdmVyZWRPYmplY3RdLFxuICAgICAgICAgICAgICBnZXRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldFRhcmdldENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0V2lkdGg6IGRhdGEuZ2V0V2lkdGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==