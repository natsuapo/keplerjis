"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pointVisConfigs = exports.pointOptionalColumns = exports.pointRequiredColumns = exports.pointPosAccessor = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _extensions = require("@deck.gl/extensions");

var _layers = require("@deck.gl/layers");

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _colorUtils = require("../../utils/color-utils");

var _datasetUtils = require("../../utils/dataset-utils");

var _pointLayerIcon = _interopRequireDefault(require("./point-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _layerTextLabel = require("../layer-text-label");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng,
      altitude = _ref.altitude;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng.fieldIdx), dc.valueAt(d.index, lat.fieldIdx), altitude && altitude.fieldIdx > -1 ? dc.valueAt(d.index, altitude.fieldIdx) : 0];
    };
  };
};

exports.pointPosAccessor = pointPosAccessor;
var pointRequiredColumns = ['lat', 'lng'];
exports.pointRequiredColumns = pointRequiredColumns;
var pointOptionalColumns = ['altitude'];
exports.pointOptionalColumns = pointOptionalColumns;
var brushingExtension = new _extensions.BrushingExtension();
var pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  outline: 'outline',
  thickness: 'thickness',
  strokeColor: 'strokeColor',
  colorRange: 'colorRange',
  strokeColorRange: 'strokeColorRange',
  radiusRange: 'radiusRange',
  filled: {
    type: 'boolean',
    label: 'layer.fillColor',
    defaultValue: true,
    property: 'filled'
  }
};
exports.pointVisConfigs = pointVisConfigs;

var PointLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(PointLayer, _Layer);

  var _super = _createSuper(PointLayer);

  function PointLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PointLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(pointVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return pointPosAccessor(_this.config.columns)(dataContainer);
    };

    return _this;
  }

  (0, _createClass2["default"])(PointLayer, [{
    key: "type",
    get: function get() {
      return 'point';
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _pointLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return pointRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return pointOptionalColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2["default"])((0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "noneLayerDataAffectingProps", this)), ['radius']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "visualChannels", this).color), {}, {
          accessor: 'getFillColor',
          condition: function condition(config) {
            return config.visConfig.filled;
          },
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        }),
        strokeColor: {
          property: 'strokeColor',
          key: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          accessor: 'getLineColor',
          condition: function condition(config) {
            return config.visConfig.outline;
          },
          defaultValue: function defaultValue(config) {
            return config.visConfig.strokeColor || config.color;
          }
        },
        size: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "visualChannels", this).size), {}, {
          property: 'radius',
          range: 'radiusRange',
          fixed: 'fixedRadius',
          channelScaleType: 'radius',
          accessor: 'getRadius',
          defaultValue: 1
        })
      };
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(dataset) {
      var defaultColorField = (0, _datasetUtils.findDefaultColorField)(dataset);

      if (defaultColorField) {
        this.updateLayerConfig({
          colorField: defaultColorField
        });
        this.updateLayerVisualChannel(dataset, 'color');
      }

      return this;
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref2, getPosition) {
      var filteredIndex = _ref2.filteredIndex;
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var pos = getPosition({
          index: index
        }); // if doesn't have point lat or lng, do not add the point
        // deck.gl can't handle position = null

        if (pos.every(Number.isFinite)) {
          data.push({
            position: pos,
            index: index
          });
        }
      }

      return data;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var textLabel = this.config.textLabel;
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data,
          triggerChanged = _this$updateData.triggerChanged;

      var getPosition = this.getPositionAccessor(dataContainer); // get all distinct characters in the text labels

      var textLabels = (0, _layerTextLabel.formatTextLabelData)({
        textLabel: textLabel,
        triggerChanged: triggerChanged,
        oldLayerData: oldLayerData,
        data: data,
        dataContainer: dataContainer
      });
      var accessors = this.getAttributeAccessors({
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getPosition: getPosition,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(),
        textLabels: textLabels
      }, accessors);
    }
    /* eslint-enable complexity */

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
    key: "renderLayer",
    value: function renderLayer(opts) {
      var _this$config$columns$;

      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState,
          interactionConfig = opts.interactionConfig; // if no field size is defined we need to pass fixed radius = false

      var fixedRadius = this.config.visConfig.fixedRadius && Boolean(this.config.sizeField);
      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);

      var layerProps = _objectSpread({
        stroked: this.config.visConfig.outline,
        filled: this.config.visConfig.filled,
        lineWidthScale: this.config.visConfig.thickness,
        radiusScale: radiusScale
      }, this.config.visConfig.fixedRadius ? {} : {
        radiusMaxPixels: 500
      });

      var updateTriggers = _objectSpread({
        getPosition: this.config.columns,
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      }, this.getVisualChannelUpdateTriggers());

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      var brushingProps = this.getBrushingExtensionProps(interactionConfig);
      var getPixelOffset = (0, _layerTextLabel.getTextOffsetByRadius)(radiusScale, data.getRadius, mapState);
      var extensions = [].concat((0, _toConsumableArray2["default"])(defaultLayerProps.extensions), [brushingExtension]);

      var sharedProps = _objectSpread({
        getFilterValue: data.getFilterValue,
        extensions: extensions,
        filterRange: defaultLayerProps.filterRange
      }, brushingProps);

      var hoveredObject = this.hasHoveredObject(objectHovered);
      return [new _layers.ScatterplotLayer(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), brushingProps), layerProps), data), {}, {
        parameters: {
          // circles will be flat on the map when the altitude column is not used
          depthTest: ((_this$config$columns$ = this.config.columns.altitude) === null || _this$config$columns$ === void 0 ? void 0 : _this$config$columns$.fieldIdx) > -1
        },
        lineWidthUnits: 'pixels',
        updateTriggers: updateTriggers,
        extensions: extensions
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject ? [new _layers.ScatterplotLayer(_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), layerProps), {}, {
        data: [hoveredObject],
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        getRadius: data.getRadius,
        getPosition: data.getPosition
      }))] : []), (0, _toConsumableArray2["default"])(this.renderTextLabelLayer({
        getPosition: data.getPosition,
        sharedProps: sharedProps,
        getPixelOffset: getPixelOffset,
        updateTriggers: updateTriggers
      }, opts)));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref3) {
      var _ref3$fieldPairs = _ref3.fieldPairs,
          fieldPairs = _ref3$fieldPairs === void 0 ? [] : _ref3$fieldPairs;
      var props = []; // Make layer for each pair

      fieldPairs.forEach(function (pair) {
        var latField = pair.pair.lat;
        var lngField = pair.pair.lng;
        var layerName = pair.defaultName;
        var prop = {
          label: layerName.length ? layerName : 'Point'
        }; // default layer color for begintrip and dropoff point

        if (latField.value in _defaultSettings.DEFAULT_LAYER_COLOR) {
          prop.color = (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR[latField.value]);
        } // set the first layer to be visible


        if (props.length === 0) {
          prop.isVisible = true;
        }

        prop.columns = {
          lat: latField,
          lng: lngField,
          altitude: {
            value: null,
            fieldIdx: -1,
            optional: true
          }
        };
        props.push(prop);
      });
      return {
        props: props
      };
    }
  }]);
  return PointLayer;
}(_baseLayer["default"]);

exports["default"] = PointLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9pbnQtbGF5ZXIvcG9pbnQtbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImFsdGl0dWRlIiwiZGMiLCJkIiwidmFsdWVBdCIsImluZGV4IiwiZmllbGRJZHgiLCJwb2ludFJlcXVpcmVkQ29sdW1ucyIsInBvaW50T3B0aW9uYWxDb2x1bW5zIiwiYnJ1c2hpbmdFeHRlbnNpb24iLCJCcnVzaGluZ0V4dGVuc2lvbiIsInBvaW50VmlzQ29uZmlncyIsInJhZGl1cyIsImZpeGVkUmFkaXVzIiwib3BhY2l0eSIsIm91dGxpbmUiLCJ0aGlja25lc3MiLCJzdHJva2VDb2xvciIsImNvbG9yUmFuZ2UiLCJzdHJva2VDb2xvclJhbmdlIiwicmFkaXVzUmFuZ2UiLCJmaWxsZWQiLCJ0eXBlIiwibGFiZWwiLCJkZWZhdWx0VmFsdWUiLCJwcm9wZXJ0eSIsIlBvaW50TGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiUG9pbnRMYXllckljb24iLCJkZWZhdWx0UG9pbnRDb2x1bW5QYWlycyIsImNvbG9yIiwiYWNjZXNzb3IiLCJjb25kaXRpb24iLCJ2aXNDb25maWciLCJrZXkiLCJmaWVsZCIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJzaXplIiwiZml4ZWQiLCJkYXRhc2V0IiwiZGVmYXVsdENvbG9yRmllbGQiLCJ1cGRhdGVMYXllckNvbmZpZyIsImNvbG9yRmllbGQiLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWwiLCJzdHJva2VDb2xvckZpZWxkIiwic3Ryb2tlQ29sb3JEb21haW4iLCJzdHJva2VDb2xvclNjYWxlIiwiZ2V0UG9zaXRpb24iLCJmaWx0ZXJlZEluZGV4IiwiZGF0YSIsImkiLCJsZW5ndGgiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwicHVzaCIsInBvc2l0aW9uIiwiZGF0YXNldHMiLCJvbGRMYXllckRhdGEiLCJ0ZXh0TGFiZWwiLCJkYXRhSWQiLCJncHVGaWx0ZXIiLCJ1cGRhdGVEYXRhIiwidHJpZ2dlckNoYW5nZWQiLCJ0ZXh0TGFiZWxzIiwiYWNjZXNzb3JzIiwiZ2V0QXR0cmlidXRlQWNjZXNzb3JzIiwiZ2V0RmlsdGVyVmFsdWUiLCJmaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwidXBkYXRlTWV0YSIsIm9wdHMiLCJvYmplY3RIb3ZlcmVkIiwibWFwU3RhdGUiLCJpbnRlcmFjdGlvbkNvbmZpZyIsIkJvb2xlYW4iLCJzaXplRmllbGQiLCJyYWRpdXNTY2FsZSIsImdldFJhZGl1c1NjYWxlQnlab29tIiwibGF5ZXJQcm9wcyIsInN0cm9rZWQiLCJsaW5lV2lkdGhTY2FsZSIsInJhZGl1c01heFBpeGVscyIsInVwZGF0ZVRyaWdnZXJzIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImRlZmF1bHRMYXllclByb3BzIiwiZ2V0RGVmYXVsdERlY2tMYXllclByb3BzIiwiYnJ1c2hpbmdQcm9wcyIsImdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMiLCJnZXRQaXhlbE9mZnNldCIsImdldFJhZGl1cyIsImV4dGVuc2lvbnMiLCJzaGFyZWRQcm9wcyIsImZpbHRlclJhbmdlIiwiaG92ZXJlZE9iamVjdCIsImhhc0hvdmVyZWRPYmplY3QiLCJTY2F0dGVycGxvdExheWVyIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsImxpbmVXaWR0aFVuaXRzIiwiZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcyIsImdldExpbmVDb2xvciIsImhpZ2hsaWdodENvbG9yIiwiZ2V0RmlsbENvbG9yIiwicmVuZGVyVGV4dExhYmVsTGF5ZXIiLCJmaWVsZFBhaXJzIiwiZm9yRWFjaCIsInBhaXIiLCJsYXRGaWVsZCIsImxuZ0ZpZWxkIiwibGF5ZXJOYW1lIiwiZGVmYXVsdE5hbWUiLCJwcm9wIiwidmFsdWUiLCJERUZBVUxUX0xBWUVSX0NPTE9SIiwiaXNWaXNpYmxlIiwib3B0aW9uYWwiLCJMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQUVPLElBQU1BLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFQyxHQUFGLFFBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFFBQU9BLEdBQVA7QUFBQSxNQUFZQyxRQUFaLFFBQVlBLFFBQVo7QUFBQSxTQUEwQixVQUFBQyxFQUFFO0FBQUEsV0FBSSxVQUFBQyxDQUFDO0FBQUEsYUFBSSxDQUNuRUQsRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQkwsR0FBRyxDQUFDTSxRQUF4QixDQURtRSxFQUVuRUosRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQk4sR0FBRyxDQUFDTyxRQUF4QixDQUZtRSxFQUduRUwsUUFBUSxJQUFJQSxRQUFRLENBQUNLLFFBQVQsR0FBb0IsQ0FBQyxDQUFqQyxHQUFxQ0osRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQkosUUFBUSxDQUFDSyxRQUE3QixDQUFyQyxHQUE4RSxDQUhYLENBQUo7QUFBQSxLQUFMO0FBQUEsR0FBNUI7QUFBQSxDQUF6Qjs7O0FBTUEsSUFBTUMsb0JBQW9CLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUE3Qjs7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxDQUFDLFVBQUQsQ0FBN0I7O0FBRVAsSUFBTUMsaUJBQWlCLEdBQUcsSUFBSUMsNkJBQUosRUFBMUI7QUFFTyxJQUFNQyxlQUFlLEdBQUc7QUFDN0JDLEVBQUFBLE1BQU0sRUFBRSxRQURxQjtBQUU3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QUFrQkMsb0NBQXRCLEVBQTJDO0FBQ3pDRixVQUFBQSxJQUFJLENBQUN6RixLQUFMLEdBQWEsMEJBQVMyRixxQ0FBb0JOLFFBQVEsQ0FBQ0ssS0FBN0IsQ0FBVCxDQUFiO0FBQ0QsU0Fad0IsQ0FjekI7OztBQUNBLFlBQUlsRyxLQUFLLENBQUNpQyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCZ0UsVUFBQUEsSUFBSSxDQUFDRyxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7O0FBRURILFFBQUFBLElBQUksQ0FBQzVGLE9BQUwsR0FBZTtBQUNiakMsVUFBQUEsR0FBRyxFQUFFeUgsUUFEUTtBQUVieEgsVUFBQUEsR0FBRyxFQUFFeUgsUUFGUTtBQUdieEgsVUFBQUEsUUFBUSxFQUFFO0FBQUM0SCxZQUFBQSxLQUFLLEVBQUUsSUFBUjtBQUFjdkgsWUFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBekI7QUFBNEIwSCxZQUFBQSxRQUFRLEVBQUU7QUFBdEM7QUFIRyxTQUFmO0FBTUFyRyxRQUFBQSxLQUFLLENBQUNzQyxJQUFOLENBQVcyRCxJQUFYO0FBQ0QsT0ExQkQ7QUE0QkEsYUFBTztBQUFDakcsUUFBQUEsS0FBSyxFQUFMQTtBQUFELE9BQVA7QUFDRDs7O0VBbEhxQ3NHLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtCcnVzaGluZ0V4dGVuc2lvbn0gZnJvbSAnQGRlY2suZ2wvZXh0ZW5zaW9ucyc7XG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5cbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCB7ZmluZERlZmF1bHRDb2xvckZpZWxkfSBmcm9tICd1dGlscy9kYXRhc2V0LXV0aWxzJztcbmltcG9ydCBQb2ludExheWVySWNvbiBmcm9tICcuL3BvaW50LWxheWVyLWljb24nO1xuaW1wb3J0IHtERUZBVUxUX0xBWUVSX0NPTE9SLCBDSEFOTkVMX1NDQUxFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge2dldFRleHRPZmZzZXRCeVJhZGl1cywgZm9ybWF0VGV4dExhYmVsRGF0YX0gZnJvbSAnLi4vbGF5ZXItdGV4dC1sYWJlbCc7XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc0FjY2Vzc29yID0gKHtsYXQsIGxuZywgYWx0aXR1ZGV9KSA9PiBkYyA9PiBkID0+IFtcbiAgZGMudmFsdWVBdChkLmluZGV4LCBsbmcuZmllbGRJZHgpLFxuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxhdC5maWVsZElkeCksXG4gIGFsdGl0dWRlICYmIGFsdGl0dWRlLmZpZWxkSWR4ID4gLTEgPyBkYy52YWx1ZUF0KGQuaW5kZXgsIGFsdGl0dWRlLmZpZWxkSWR4KSA6IDBcbl07XG5cbmV4cG9ydCBjb25zdCBwb2ludFJlcXVpcmVkQ29sdW1ucyA9IFsnbGF0JywgJ2xuZyddO1xuZXhwb3J0IGNvbnN0IHBvaW50T3B0aW9uYWxDb2x1bW5zID0gWydhbHRpdHVkZSddO1xuXG5jb25zdCBicnVzaGluZ0V4dGVuc2lvbiA9IG5ldyBCcnVzaGluZ0V4dGVuc2lvbigpO1xuXG5leHBvcnQgY29uc3QgcG9pbnRWaXNDb25maWdzID0ge1xuICByYWRpdXM6ICdyYWRpdXMnLFxuICBmaXhlZFJhZGl1czogJ2ZpeGVkUmFkaXVzJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBvdXRsaW5lOiAnb3V0bGluZScsXG4gIHRoaWNrbmVzczogJ3RoaWNrbmVzcycsXG4gIHN0cm9rZUNvbG9yOiAnc3Ryb2tlQ29sb3InLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHN0cm9rZUNvbG9yUmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gIGZpbGxlZDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBsYWJlbDogJ2xheWVyLmZpbGxDb2xvcicsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIHByb3BlcnR5OiAnZmlsbGVkJ1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludExheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcocG9pbnRWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+XG4gICAgICBwb2ludFBvc0FjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdwb2ludCc7XG4gIH1cblxuICBnZXQgaXNBZ2dyZWdhdGVkKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIFBvaW50TGF5ZXJJY29uO1xuICB9XG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gcG9pbnRSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgb3B0aW9uYWxDb2x1bW5zKCkge1xuICAgIHJldHVybiBwb2ludE9wdGlvbmFsQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0UG9pbnRDb2x1bW5QYWlycztcbiAgfVxuXG4gIGdldCBub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMoKSB7XG4gICAgcmV0dXJuIFsuLi5zdXBlci5ub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMsICdyYWRpdXMnXTtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0RmlsbENvbG9yJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5maWxsZWQsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogY29uZmlnID0+IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBrZXk6ICdzdHJva2VDb2xvcicsXG4gICAgICAgIGZpZWxkOiAnc3Ryb2tlQ29sb3JGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnc3Ryb2tlQ29sb3JTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ3N0cm9rZUNvbG9yRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3IsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0TGluZUNvbG9yJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5vdXRsaW5lLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZUNvbG9yIHx8IGNvbmZpZy5jb2xvclxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdyYWRpdXMnLFxuICAgICAgICByYW5nZTogJ3JhZGl1c1JhbmdlJyxcbiAgICAgICAgZml4ZWQ6ICdmaXhlZFJhZGl1cycsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldFJhZGl1cycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzZXRJbml0aWFsTGF5ZXJDb25maWcoZGF0YXNldCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb2xvckZpZWxkID0gZmluZERlZmF1bHRDb2xvckZpZWxkKGRhdGFzZXQpO1xuXG4gICAgaWYgKGRlZmF1bHRDb2xvckZpZWxkKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICAgICAgY29sb3JGaWVsZDogZGVmYXVsdENvbG9yRmllbGRcbiAgICAgIH0pO1xuICAgICAgdGhpcy51cGRhdGVMYXllclZpc3VhbENoYW5uZWwoZGF0YXNldCwgJ2NvbG9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZFBhaXJzID0gW119KSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXTtcblxuICAgIC8vIE1ha2UgbGF5ZXIgZm9yIGVhY2ggcGFpclxuICAgIGZpZWxkUGFpcnMuZm9yRWFjaChwYWlyID0+IHtcbiAgICAgIGNvbnN0IGxhdEZpZWxkID0gcGFpci5wYWlyLmxhdDtcbiAgICAgIGNvbnN0IGxuZ0ZpZWxkID0gcGFpci5wYWlyLmxuZztcbiAgICAgIGNvbnN0IGxheWVyTmFtZSA9IHBhaXIuZGVmYXVsdE5hbWU7XG5cbiAgICAgIGNvbnN0IHByb3AgPSB7XG4gICAgICAgIGxhYmVsOiBsYXllck5hbWUubGVuZ3RoID8gbGF5ZXJOYW1lIDogJ1BvaW50J1xuICAgICAgfTtcblxuICAgICAgLy8gZGVmYXVsdCBsYXllciBjb2xvciBmb3IgYmVnaW50cmlwIGFuZCBkcm9wb2ZmIHBvaW50XG4gICAgICBpZiAobGF0RmllbGQudmFsdWUgaW4gREVGQVVMVF9MQVlFUl9DT0xPUikge1xuICAgICAgICBwcm9wLmNvbG9yID0gaGV4VG9SZ2IoREVGQVVMVF9MQVlFUl9DT0xPUltsYXRGaWVsZC52YWx1ZV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIGZpcnN0IGxheWVyIHRvIGJlIHZpc2libGVcbiAgICAgIGlmIChwcm9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcHJvcC5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwcm9wLmNvbHVtbnMgPSB7XG4gICAgICAgIGxhdDogbGF0RmllbGQsXG4gICAgICAgIGxuZzogbG5nRmllbGQsXG4gICAgICAgIGFsdGl0dWRlOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMSwgb3B0aW9uYWw6IHRydWV9XG4gICAgICB9O1xuXG4gICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtwcm9wc307XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgc3Ryb2tlIGNvbG9yIHZpc3VhbCBjaGFubmVsXG4gICAgICBzdHJva2VDb2xvckZpZWxkOiBudWxsLFxuICAgICAgc3Ryb2tlQ29sb3JEb21haW46IFswLCAxXSxcbiAgICAgIHN0cm9rZUNvbG9yU2NhbGU6ICdxdWFudGlsZSdcbiAgICB9O1xuICB9XG5cbiAgY2FsY3VsYXRlRGF0YUF0dHJpYnV0ZSh7ZmlsdGVyZWRJbmRleH0sIGdldFBvc2l0aW9uKSB7XG4gICAgY29uc3QgZGF0YSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJlZEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGZpbHRlcmVkSW5kZXhbaV07XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7aW5kZXh9KTtcblxuICAgICAgLy8gaWYgZG9lc24ndCBoYXZlIHBvaW50IGxhdCBvciBsbmcsIGRvIG5vdCBhZGQgdGhlIHBvaW50XG4gICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9IG51bGxcbiAgICAgIGlmIChwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSkge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICAgICAgaW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpIHtcbiAgICBjb25zdCB7dGV4dExhYmVsfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCB7ZGF0YSwgdHJpZ2dlckNoYW5nZWR9ID0gdGhpcy51cGRhdGVEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpO1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuXG4gICAgLy8gZ2V0IGFsbCBkaXN0aW5jdCBjaGFyYWN0ZXJzIGluIHRoZSB0ZXh0IGxhYmVsc1xuICAgIGNvbnN0IHRleHRMYWJlbHMgPSBmb3JtYXRUZXh0TGFiZWxEYXRhKHtcbiAgICAgIHRleHRMYWJlbCxcbiAgICAgIHRyaWdnZXJDaGFuZ2VkLFxuICAgICAgb2xkTGF5ZXJEYXRhLFxuICAgICAgZGF0YSxcbiAgICAgIGRhdGFDb250YWluZXJcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IHRoaXMuZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQ29udGFpbmVyfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldFBvc2l0aW9uLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZUFjY2Vzc29yKGRhdGFDb250YWluZXIpKCksXG4gICAgICB0ZXh0TGFiZWxzLFxuICAgICAgLi4uYWNjZXNzb3JzXG4gICAgfTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kc30pO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBncHVGaWx0ZXIsIG9iamVjdEhvdmVyZWQsIG1hcFN0YXRlLCBpbnRlcmFjdGlvbkNvbmZpZ30gPSBvcHRzO1xuXG4gICAgLy8gaWYgbm8gZmllbGQgc2l6ZSBpcyBkZWZpbmVkIHdlIG5lZWQgdG8gcGFzcyBmaXhlZCByYWRpdXMgPSBmYWxzZVxuICAgIGNvbnN0IGZpeGVkUmFkaXVzID0gdGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzICYmIEJvb2xlYW4odGhpcy5jb25maWcuc2l6ZUZpZWxkKTtcbiAgICBjb25zdCByYWRpdXNTY2FsZSA9IHRoaXMuZ2V0UmFkaXVzU2NhbGVCeVpvb20obWFwU3RhdGUsIGZpeGVkUmFkaXVzKTtcblxuICAgIGNvbnN0IGxheWVyUHJvcHMgPSB7XG4gICAgICBzdHJva2VkOiB0aGlzLmNvbmZpZy52aXNDb25maWcub3V0bGluZSxcbiAgICAgIGZpbGxlZDogdGhpcy5jb25maWcudmlzQ29uZmlnLmZpbGxlZCxcbiAgICAgIGxpbmVXaWR0aFNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcudGhpY2tuZXNzLFxuICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICAuLi4odGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzID8ge30gOiB7cmFkaXVzTWF4UGl4ZWxzOiA1MDB9KVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHtcbiAgICAgIGdldFBvc2l0aW9uOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzLFxuICAgICAgLi4udGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKVxuICAgIH07XG5cbiAgICBjb25zdCBkZWZhdWx0TGF5ZXJQcm9wcyA9IHRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpO1xuICAgIGNvbnN0IGJydXNoaW5nUHJvcHMgPSB0aGlzLmdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMoaW50ZXJhY3Rpb25Db25maWcpO1xuICAgIGNvbnN0IGdldFBpeGVsT2Zmc2V0ID0gZ2V0VGV4dE9mZnNldEJ5UmFkaXVzKHJhZGl1c1NjYWxlLCBkYXRhLmdldFJhZGl1cywgbWFwU3RhdGUpO1xuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBbLi4uZGVmYXVsdExheWVyUHJvcHMuZXh0ZW5zaW9ucywgYnJ1c2hpbmdFeHRlbnNpb25dO1xuXG4gICAgY29uc3Qgc2hhcmVkUHJvcHMgPSB7XG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZGF0YS5nZXRGaWx0ZXJWYWx1ZSxcbiAgICAgIGV4dGVuc2lvbnMsXG4gICAgICBmaWx0ZXJSYW5nZTogZGVmYXVsdExheWVyUHJvcHMuZmlsdGVyUmFuZ2UsXG4gICAgICAuLi5icnVzaGluZ1Byb3BzXG4gICAgfTtcbiAgICBjb25zdCBob3ZlcmVkT2JqZWN0ID0gdGhpcy5oYXNIb3ZlcmVkT2JqZWN0KG9iamVjdEhvdmVyZWQpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBTY2F0dGVycGxvdExheWVyKHtcbiAgICAgICAgLi4uZGVmYXVsdExheWVyUHJvcHMsXG4gICAgICAgIC4uLmJydXNoaW5nUHJvcHMsXG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAvLyBjaXJjbGVzIHdpbGwgYmUgZmxhdCBvbiB0aGUgbWFwIHdoZW4gdGhlIGFsdGl0dWRlIGNvbHVtbiBpcyBub3QgdXNlZFxuICAgICAgICAgIGRlcHRoVGVzdDogdGhpcy5jb25maWcuY29sdW1ucy5hbHRpdHVkZT8uZmllbGRJZHggPiAtMVxuICAgICAgICB9LFxuICAgICAgICBsaW5lV2lkdGhVbml0czogJ3BpeGVscycsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuICAgICAgICBleHRlbnNpb25zXG4gICAgICB9KSxcbiAgICAgIC8vIGhvdmVyIGxheWVyXG4gICAgICAuLi4oaG92ZXJlZE9iamVjdFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBTY2F0dGVycGxvdExheWVyKHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXREZWZhdWx0SG92ZXJMYXllclByb3BzKCksXG4gICAgICAgICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgICAgICAgIGRhdGE6IFtob3ZlcmVkT2JqZWN0XSxcbiAgICAgICAgICAgICAgZ2V0TGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0RmlsbENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgICAgICAgZ2V0UG9zaXRpb246IGRhdGEuZ2V0UG9zaXRpb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKSxcbiAgICAgIC8vIHRleHQgbGFiZWwgbGF5ZXJcbiAgICAgIC4uLnRoaXMucmVuZGVyVGV4dExhYmVsTGF5ZXIoXG4gICAgICAgIHtcbiAgICAgICAgICBnZXRQb3NpdGlvbjogZGF0YS5nZXRQb3NpdGlvbixcbiAgICAgICAgICBzaGFyZWRQcm9wcyxcbiAgICAgICAgICBnZXRQaXhlbE9mZnNldCxcbiAgICAgICAgICB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgICB9LFxuICAgICAgICBvcHRzXG4gICAgICApXG4gICAgXTtcbiAgfVxufVxuIl19