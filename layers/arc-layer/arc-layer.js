"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.arcVisConfigs = exports.arcColumnLabels = exports.arcRequiredColumns = exports.arcPosAccessor = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _extensions = require("@deck.gl/extensions");

var _layers = require("@deck.gl/layers");

var _colorUtils = require("../../utils/color-utils");

var _arcLayerIcon = _interopRequireDefault(require("./arc-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var arcPosAccessor = function arcPosAccessor(_ref) {
  var lat0 = _ref.lat0,
      lng0 = _ref.lng0,
      lat1 = _ref.lat1,
      lng1 = _ref.lng1;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng0.fieldIdx), dc.valueAt(d.index, lat0.fieldIdx), 0, dc.valueAt(d.index, lng1.fieldIdx), dc.valueAt(d.index, lat1.fieldIdx), 0];
    };
  };
};

exports.arcPosAccessor = arcPosAccessor;
var arcRequiredColumns = ['lat0', 'lng0', 'lat1', 'lng1'];
exports.arcRequiredColumns = arcRequiredColumns;
var arcColumnLabels = {
  lat0: 'arc.lat0',
  lng0: 'arc.lng0',
  lat1: 'arc.lat1',
  lng1: 'arc.lng1'
};
exports.arcColumnLabels = arcColumnLabels;
var arcVisConfigs = {
  opacity: 'opacity',
  thickness: 'thickness',
  colorRange: 'colorRange',
  sizeRange: 'strokeWidthRange',
  targetColor: 'targetColor'
};
exports.arcVisConfigs = arcVisConfigs;

var ArcLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(ArcLayer, _Layer);

  var _super = _createSuper(ArcLayer);

  function ArcLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ArcLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(arcVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return arcPosAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(ArcLayer, [{
    key: "type",
    get: function get() {
      return 'arc';
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _arcLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return arcRequiredColumns;
    }
  }, {
    key: "columnLabels",
    get: function get() {
      return arcColumnLabels;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultLinkColumnPairs;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        sourceColor: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcLayer.prototype), "visualChannels", this).color), {}, {
          property: 'color',
          key: 'sourceColor',
          accessor: 'getSourceColor',
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        }),
        targetColor: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcLayer.prototype), "visualChannels", this).color), {}, {
          property: 'targetColor',
          key: 'targetColor',
          accessor: 'getTargetColor',
          defaultValue: function defaultValue(config) {
            return config.visConfig.targetColor || config.color;
          }
        }),
        size: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcLayer.prototype), "visualChannels", this).size), {}, {
          accessor: 'getWidth',
          property: 'stroke'
        })
      };
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getPosition) {
      var dataContainer = _ref2.dataContainer,
          filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var pos = getPosition({
          index: index
        }); // if doesn't have point lat or lng, do not add the point
        // deck.gl can't handle position = null

        if (pos.every(Number.isFinite)) {
          data.push({
            index: index,
            sourcePosition: [pos[0], pos[1], pos[2]],
            targetPosition: [pos[3], pos[4], pos[5]]
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

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      }, accessors);
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer) {
      // get bounds from arcs
      var getPosition = this.getPositionAccessor(dataContainer);
      var sBounds = this.getPointsBounds(dataContainer, function (d, i) {
        var pos = getPosition(d);
        return [pos[0], pos[1]];
      });
      var tBounds = this.getPointsBounds(dataContainer, function (d, i) {
        var pos = getPosition(d);
        return [pos[3], pos[4]];
      });
      var bounds = tBounds && sBounds ? [Math.min(sBounds[0], tBounds[0]), Math.min(sBounds[1], tBounds[1]), Math.max(sBounds[2], tBounds[2]), Math.max(sBounds[3], tBounds[3])] : sBounds || tBounds;
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          interactionConfig = opts.interactionConfig;

      var updateTriggers = _objectSpread({
        getPosition: this.config.columns,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      }, this.getVisualChannelUpdateTriggers());

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _layers.ArcLayer(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), this.getBrushingExtensionProps(interactionConfig, 'source_target')), data), {}, {
        widthScale: this.config.visConfig.thickness,
        updateTriggers: updateTriggers,
        extensions: [].concat((0, _toConsumableArray2["default"])(defaultLayerProps.extensions), [new _extensions.BrushingExtension()])
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject ? [new _layers.ArcLayer(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), {}, {
        data: [hoveredObject],
        widthScale: this.config.visConfig.thickness,
        getSourceColor: this.config.highlightColor,
        getTargetColor: this.config.highlightColor,
        getWidth: data.getWidth
      }))] : []));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fieldPairs = _ref3.fieldPairs,
          fieldPairs = _ref3$fieldPairs === void 0 ? [] : _ref3$fieldPairs;

      if (fieldPairs.length < 2) {
        return {
          props: []
        };
      }

      var props = {
        color: (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR.tripArc)
      }; // connect the first two point layer with arc

      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = "".concat(fieldPairs[0].defaultName, " -> ").concat(fieldPairs[1].defaultName, " arc");
      return {
        props: [props]
      };
    }
  }]);
  return ArcLayer;
}(_baseLayer["default"]);

exports["default"] = ArcLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvYXJjLWxheWVyL2FyYy1sYXllci5qcyJdLCJuYW1lcyI6WyJhcmNQb3NBY2Nlc3NvciIsImxhdDAiLCJsbmcwIiwibGF0MSIsImxuZzEiLCJkYyIsImQiLCJ2YWx1ZUF0IiwiaW5kZXgiLCJmaWVsZElkeCIsImFyY1JlcXVpcmVkQ29sdW1ucyIsImFyY0NvbHVtbkxhYmVscyIsImFyY1Zpc0NvbmZpZ3MiLCJvcGFjaXR5IiwidGhpY2tuZXNzIiwiY29sb3JSYW5nZSIsInNpemVSYW5nZSIsInRhcmdldENvbG9yIiwiQXJjTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiQXJjTGF5ZXJJY29uIiwiZGVmYXVsdExpbmtDb2x1bW5QYWlycyIsInNvdXJjZUNvbG9yIiwiY29sb3IiLCJwcm9wZXJ0eSIsImtleSIsImFjY2Vzc29yIiwiZGVmYXVsdFZhbHVlIiwidmlzQ29uZmlnIiwic2l6ZSIsImdldFBvc2l0aW9uIiwiZmlsdGVyZWRJbmRleCIsImRhdGEiLCJpIiwibGVuZ3RoIiwicG9zIiwiZXZlcnkiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInB1c2giLCJzb3VyY2VQb3NpdGlvbiIsInRhcmdldFBvc2l0aW9uIiwiZGF0YXNldHMiLCJvbGRMYXllckRhdGEiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJ1cGRhdGVEYXRhIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwic0JvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsInRCb3VuZHMiLCJib3VuZHMiLCJNYXRoIiwibWluIiwibWF4IiwidXBkYXRlTWV0YSIsIm9wdHMiLCJvYmplY3RIb3ZlcmVkIiwiaW50ZXJhY3Rpb25Db25maWciLCJ1cGRhdGVUcmlnZ2VycyIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJnZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMiLCJkZWZhdWx0TGF5ZXJQcm9wcyIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsImhvdmVyZWRPYmplY3QiLCJoYXNIb3ZlcmVkT2JqZWN0IiwiRGVja0FyY0xheWVyIiwiZ2V0QnJ1c2hpbmdFeHRlbnNpb25Qcm9wcyIsIndpZHRoU2NhbGUiLCJleHRlbnNpb25zIiwiQnJ1c2hpbmdFeHRlbnNpb24iLCJnZXREZWZhdWx0SG92ZXJMYXllclByb3BzIiwiZ2V0U291cmNlQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsImdldFRhcmdldENvbG9yIiwiZ2V0V2lkdGgiLCJmaWVsZFBhaXJzIiwiREVGQVVMVF9MQVlFUl9DT0xPUiIsInRyaXBBcmMiLCJwYWlyIiwibGF0IiwibG5nIiwibGFiZWwiLCJkZWZhdWx0TmFtZSIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRU8sSUFBTUEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBLE1BQUVDLElBQUYsUUFBRUEsSUFBRjtBQUFBLE1BQVFDLElBQVIsUUFBUUEsSUFBUjtBQUFBLE1BQWNDLElBQWQsUUFBY0EsSUFBZDtBQUFBLE1BQW9CQyxJQUFwQixRQUFvQkEsSUFBcEI7QUFBQSxTQUE4QixVQUFBQyxFQUFFO0FBQUEsV0FBSSxVQUFBQyxDQUFDO0FBQUEsYUFBSSxDQUNyRUQsRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQk4sSUFBSSxDQUFDTyxRQUF6QixDQURxRSxFQUVyRUosRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQlAsSUFBSSxDQUFDUSxRQUF6QixDQUZxRSxFQUdyRSxDQUhxRSxFQUlyRUosRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FB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RSxDQUFDQSxLQUFEO0FBQVIsT0FBUDtBQUNEOzs7RUExRW1DeUUscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQge0JydXNoaW5nRXh0ZW5zaW9ufSBmcm9tICdAZGVjay5nbC9leHRlbnNpb25zJztcbmltcG9ydCB7QXJjTGF5ZXIgYXMgRGVja0FyY0xheWVyfSBmcm9tICdAZGVjay5nbC9sYXllcnMnO1xuXG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgQXJjTGF5ZXJJY29uIGZyb20gJy4vYXJjLWxheWVyLWljb24nO1xuaW1wb3J0IHtERUZBVUxUX0xBWUVSX0NPTE9SfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBhcmNQb3NBY2Nlc3NvciA9ICh7bGF0MCwgbG5nMCwgbGF0MSwgbG5nMX0pID0+IGRjID0+IGQgPT4gW1xuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxuZzAuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdDAuZmllbGRJZHgpLFxuICAwLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxuZzEuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdDEuZmllbGRJZHgpLFxuICAwXG5dO1xuXG5leHBvcnQgY29uc3QgYXJjUmVxdWlyZWRDb2x1bW5zID0gWydsYXQwJywgJ2xuZzAnLCAnbGF0MScsICdsbmcxJ107XG5leHBvcnQgY29uc3QgYXJjQ29sdW1uTGFiZWxzID0ge1xuICBsYXQwOiAnYXJjLmxhdDAnLFxuICBsbmcwOiAnYXJjLmxuZzAnLFxuICBsYXQxOiAnYXJjLmxhdDEnLFxuICBsbmcxOiAnYXJjLmxuZzEnXG59O1xuXG5leHBvcnQgY29uc3QgYXJjVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICB0aGlja25lc3M6ICd0aGlja25lc3MnLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHNpemVSYW5nZTogJ3N0cm9rZVdpZHRoUmFuZ2UnLFxuICB0YXJnZXRDb2xvcjogJ3RhcmdldENvbG9yJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJjTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhhcmNWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+IGFyY1Bvc0FjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdhcmMnO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBBcmNMYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGFyY1JlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5MYWJlbHMoKSB7XG4gICAgcmV0dXJuIGFyY0NvbHVtbkxhYmVscztcbiAgfVxuICBnZXQgY29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdExpbmtDb2x1bW5QYWlycztcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc291cmNlQ29sb3I6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuY29sb3IsXG4gICAgICAgIHByb3BlcnR5OiAnY29sb3InLFxuICAgICAgICBrZXk6ICdzb3VyY2VDb2xvcicsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0U291cmNlQ29sb3InLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcuY29sb3JcbiAgICAgIH0sXG4gICAgICB0YXJnZXRDb2xvcjoge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgcHJvcGVydHk6ICd0YXJnZXRDb2xvcicsXG4gICAgICAgIGtleTogJ3RhcmdldENvbG9yJyxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRUYXJnZXRDb2xvcicsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcudGFyZ2V0Q29sb3IgfHwgY29uZmlnLmNvbG9yXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldFdpZHRoJyxcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2UnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkUGFpcnMgPSBbXX0pIHtcbiAgICBpZiAoZmllbGRQYWlycy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4ge3Byb3BzOiBbXX07XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBjb2xvcjogaGV4VG9SZ2IoREVGQVVMVF9MQVlFUl9DT0xPUi50cmlwQXJjKVxuICAgIH07XG5cbiAgICAvLyBjb25uZWN0IHRoZSBmaXJzdCB0d28gcG9pbnQgbGF5ZXIgd2l0aCBhcmNcbiAgICBwcm9wcy5jb2x1bW5zID0ge1xuICAgICAgbGF0MDogZmllbGRQYWlyc1swXS5wYWlyLmxhdCxcbiAgICAgIGxuZzA6IGZpZWxkUGFpcnNbMF0ucGFpci5sbmcsXG4gICAgICBsYXQxOiBmaWVsZFBhaXJzWzFdLnBhaXIubGF0LFxuICAgICAgbG5nMTogZmllbGRQYWlyc1sxXS5wYWlyLmxuZ1xuICAgIH07XG4gICAgcHJvcHMubGFiZWwgPSBgJHtmaWVsZFBhaXJzWzBdLmRlZmF1bHROYW1lfSAtPiAke2ZpZWxkUGFpcnNbMV0uZGVmYXVsdE5hbWV9IGFyY2A7XG5cbiAgICByZXR1cm4ge3Byb3BzOiBbcHJvcHNdfTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtpbmRleH0pO1xuXG4gICAgICAvLyBpZiBkb2Vzbid0IGhhdmUgcG9pbnQgbGF0IG9yIGxuZywgZG8gbm90IGFkZCB0aGUgcG9pbnRcbiAgICAgIC8vIGRlY2suZ2wgY2FuJ3QgaGFuZGxlIHBvc2l0aW9uID0gbnVsbFxuICAgICAgaWYgKHBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKSB7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgc291cmNlUG9zaXRpb246IFtwb3NbMF0sIHBvc1sxXSwgcG9zWzJdXSxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogW3Bvc1szXSwgcG9zWzRdLCBwb3NbNV1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpIHtcbiAgICBjb25zdCB7Z3B1RmlsdGVyLCBkYXRhQ29udGFpbmVyfSA9IGRhdGFzZXRzW3RoaXMuY29uZmlnLmRhdGFJZF07XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuICAgIGNvbnN0IGFjY2Vzc29ycyA9IHRoaXMuZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQ29udGFpbmVyfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZ3B1RmlsdGVyLmZpbHRlclZhbHVlQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikoKSxcbiAgICAgIC4uLmFjY2Vzc29yc1xuICAgIH07XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIpIHtcbiAgICAvLyBnZXQgYm91bmRzIGZyb20gYXJjc1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuXG4gICAgY29uc3Qgc0JvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGRhdGFDb250YWluZXIsIChkLCBpKSA9PiB7XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbihkKTtcbiAgICAgIHJldHVybiBbcG9zWzBdLCBwb3NbMV1dO1xuICAgIH0pO1xuICAgIGNvbnN0IHRCb3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhkYXRhQ29udGFpbmVyLCAoZCwgaSkgPT4ge1xuICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oZCk7XG4gICAgICByZXR1cm4gW3Bvc1szXSwgcG9zWzRdXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJvdW5kcyA9XG4gICAgICB0Qm91bmRzICYmIHNCb3VuZHNcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBNYXRoLm1pbihzQm91bmRzWzBdLCB0Qm91bmRzWzBdKSxcbiAgICAgICAgICAgIE1hdGgubWluKHNCb3VuZHNbMV0sIHRCb3VuZHNbMV0pLFxuICAgICAgICAgICAgTWF0aC5tYXgoc0JvdW5kc1syXSwgdEJvdW5kc1syXSksXG4gICAgICAgICAgICBNYXRoLm1heChzQm91bmRzWzNdLCB0Qm91bmRzWzNdKVxuICAgICAgICAgIF1cbiAgICAgICAgOiBzQm91bmRzIHx8IHRCb3VuZHM7XG5cbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kc30pO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBncHVGaWx0ZXIsIG9iamVjdEhvdmVyZWQsIGludGVyYWN0aW9uQ29uZmlnfSA9IG9wdHM7XG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRQb3NpdGlvbjogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyxcbiAgICAgIC4uLnRoaXMuZ2V0VmlzdWFsQ2hhbm5lbFVwZGF0ZVRyaWdnZXJzKClcbiAgICB9O1xuICAgIGNvbnN0IGRlZmF1bHRMYXllclByb3BzID0gdGhpcy5nZXREZWZhdWx0RGVja0xheWVyUHJvcHMob3B0cyk7XG4gICAgY29uc3QgaG92ZXJlZE9iamVjdCA9IHRoaXMuaGFzSG92ZXJlZE9iamVjdChvYmplY3RIb3ZlcmVkKTtcbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tBcmNMYXllcih7XG4gICAgICAgIC4uLmRlZmF1bHRMYXllclByb3BzLFxuICAgICAgICAuLi50aGlzLmdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMoaW50ZXJhY3Rpb25Db25maWcsICdzb3VyY2VfdGFyZ2V0JyksXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIHdpZHRoU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuICAgICAgICBleHRlbnNpb25zOiBbLi4uZGVmYXVsdExheWVyUHJvcHMuZXh0ZW5zaW9ucywgbmV3IEJydXNoaW5nRXh0ZW5zaW9uKCldXG4gICAgICB9KSxcbiAgICAgIC8vIGhvdmVyIGxheWVyXG4gICAgICAuLi4oaG92ZXJlZE9iamVjdFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBEZWNrQXJjTGF5ZXIoe1xuICAgICAgICAgICAgICAuLi50aGlzLmdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMoKSxcbiAgICAgICAgICAgICAgZGF0YTogW2hvdmVyZWRPYmplY3RdLFxuICAgICAgICAgICAgICB3aWR0aFNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcudGhpY2tuZXNzLFxuICAgICAgICAgICAgICBnZXRTb3VyY2VDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICAgIGdldFRhcmdldENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0V2lkdGg6IGRhdGEuZ2V0V2lkdGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==