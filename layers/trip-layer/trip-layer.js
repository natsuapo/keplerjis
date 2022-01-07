"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.featureResolver = exports.featureAccessor = exports.geoJsonRequiredColumns = exports.tripVisConfigs = exports.defaultLineWidth = exports.defaultThickness = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _lodash2 = _interopRequireDefault(require("lodash.uniq"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _geoLayers = require("@deck.gl/geo-layers");

var _defaultSettings = require("../../constants/default-settings");

var _tripLayerIcon = _interopRequireDefault(require("./trip-layer-icon"));

var _geojsonUtils = require("../geojson-layer/geojson-utils");

var _tripUtils = require("./trip-utils");

var _tripInfoModal = _interopRequireDefault(require("./trip-info-modal"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var zoomFactorValue = 8;
var defaultThickness = 0.5;
exports.defaultThickness = defaultThickness;
var defaultLineWidth = 1;
exports.defaultLineWidth = defaultLineWidth;
var tripVisConfigs = {
  opacity: 'opacity',
  thickness: {
    type: 'number',
    defaultValue: defaultThickness,
    label: 'Stroke Width',
    isRanged: false,
    range: [0, 100],
    step: 0.1,
    group: 'stroke',
    property: 'thickness'
  },
  colorRange: 'colorRange',
  trailLength: 'trailLength',
  sizeRange: 'strokeWidthRange'
};
exports.tripVisConfigs = tripVisConfigs;
var geoJsonRequiredColumns = ['geojson'];
exports.geoJsonRequiredColumns = geoJsonRequiredColumns;

var featureAccessor = function featureAccessor(_ref) {
  var geojson = _ref.geojson;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, geojson.fieldIdx);
    };
  };
};

exports.featureAccessor = featureAccessor;

var featureResolver = function featureResolver(_ref2) {
  var geojson = _ref2.geojson;
  return geojson.fieldIdx;
};

exports.featureResolver = featureResolver;

var TripLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(TripLayer, _Layer);

  var _super = _createSuper(TripLayer);

  function TripLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TripLayer);
    _this = _super.call(this, props);
    _this.dataToFeature = [];
    _this.dataToTimeStamp = [];

    _this.registerVisConfig(tripVisConfigs);

    _this.getFeature = (0, _lodash["default"])(featureAccessor, featureResolver);
    _this._layerInfoModal = (0, _tripInfoModal["default"])();
    return _this;
  }

  (0, _createClass2["default"])(TripLayer, [{
    key: "type",
    get: function get() {
      return 'trip';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Trip';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _tripLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return geoJsonRequiredColumns;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      var visualChannels = (0, _get2["default"])((0, _getPrototypeOf2["default"])(TripLayer.prototype), "visualChannels", this);
      return _objectSpread(_objectSpread({}, visualChannels), {}, {
        color: _objectSpread(_objectSpread({}, visualChannels.color), {}, {
          accessor: 'getColor',
          nullValue: visualChannels.color.nullValue,
          getAttributeValue: function getAttributeValue(config) {
            return function (d) {
              return d.properties.lineColor || config.color;
            };
          },
          // used this to get updateTriggers
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        }),
        size: _objectSpread(_objectSpread({}, visualChannels.size), {}, {
          property: 'stroke',
          accessor: 'getWidth',
          condition: function condition(config) {
            return config.visConfig.stroked;
          },
          nullValue: 0,
          getAttributeValue: function getAttributeValue() {
            return function (d) {
              return d.properties.lineWidth || defaultLineWidth;
            };
          }
        })
      });
    }
  }, {
    key: "animationDomain",
    get: function get() {
      return this.config.animation.domain;
    }
  }, {
    key: "layerInfoModal",
    get: function get() {
      return {
        id: 'iconInfo',
        template: this._layerInfoModal,
        modalProps: {
          title: 'modal.tripInfo.title'
        }
      };
    }
  }, {
    key: "getPositionAccessor",
    value: function getPositionAccessor(dataContainer) {
      return this.getFeature(this.config.columns)(dataContainer);
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig(props) {
      return _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(TripLayer.prototype), "getDefaultLayerConfig", this).call(this, props)), {}, {
        animation: {
          enabled: true,
          domain: null
        }
      });
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, dataContainer) {
      // index for dataContainer is saved to feature.properties
      return dataContainer.row(object.properties.index);
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref3, getPosition) {
      var _this2 = this;

      var dataContainer = _ref3.dataContainer,
          filteredIndex = _ref3.filteredIndex;
      return filteredIndex.map(function (i) {
        return _this2.dataToFeature[i];
      }).filter(function (d) {
        return d && d.geometry.type === 'LineString';
      });
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, oldLayerData) {
      var _this3 = this;

      // to-do: parse segment from dataContainer
      var _datasets$this$config = datasets[this.config.dataId],
          dataContainer = _datasets$this$config.dataContainer,
          gpuFilter = _datasets$this$config.gpuFilter;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var customFilterValueAccessor = function customFilterValueAccessor(dc, f, fieldIndex) {
        return dc.valueAt(f.properties.index, fieldIndex);
      };

      var indexAccessor = function indexAccessor(f) {
        return f.properties.index;
      };

      var dataAccessor = function dataAccessor(dc) {
        return function (d) {
          return {
            index: d.properties.index
          };
        };
      };

      var accessors = this.getAttributeAccessors({
        dataAccessor: dataAccessor,
        dataContainer: dataContainer
      });
      return _objectSpread({
        data: data,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)(indexAccessor, customFilterValueAccessor),
        getPath: function getPath(d) {
          return d.geometry.coordinates;
        },
        getTimestamps: function getTimestamps(d) {
          return _this3.dataToTimeStamp[d.properties.index];
        }
      }, accessors);
    }
  }, {
    key: "updateAnimationDomain",
    value: function updateAnimationDomain(domain) {
      this.updateLayerConfig({
        animation: _objectSpread(_objectSpread({}, this.config.animation), {}, {
          domain: domain
        })
      });
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer) {
      var getFeature = this.getPositionAccessor(dataContainer);

      if (getFeature === this.meta.getFeature) {
        // TODO: revisit this after gpu filtering
        return;
      }

      this.dataToFeature = (0, _geojsonUtils.getGeojsonDataMaps)(dataContainer, getFeature);

      var _parseTripGeoJsonTime = (0, _tripUtils.parseTripGeoJsonTimestamp)(this.dataToFeature),
          dataToTimeStamp = _parseTripGeoJsonTime.dataToTimeStamp,
          animationDomain = _parseTripGeoJsonTime.animationDomain;

      this.dataToTimeStamp = dataToTimeStamp;
      this.updateAnimationDomain(animationDomain); // get bounds from features

      var bounds = (0, _geojsonUtils.getGeojsonBounds)(this.dataToFeature); // keep a record of what type of geometry the collection has

      var featureTypes = (0, _geojsonUtils.getGeojsonFeatureTypes)(this.dataToFeature);
      this.updateMeta({
        bounds: bounds,
        featureTypes: featureTypes,
        getFeature: getFeature
      });
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(_ref4) {
      var dataContainer = _ref4.dataContainer;
      this.updateLayerMeta(dataContainer);
      return this;
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var _animationConfig$doma;

      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          mapState = opts.mapState,
          animationConfig = opts.animationConfig;
      var visConfig = this.config.visConfig;
      var zoomFactor = this.getZoomFactor(mapState);
      var isValidTime = animationConfig && Array.isArray(animationConfig.domain) && animationConfig.domain.every(Number.isFinite) && Number.isFinite(animationConfig.currentTime);

      if (!isValidTime) {
        return [];
      }

      var domain0 = (_animationConfig$doma = animationConfig.domain) === null || _animationConfig$doma === void 0 ? void 0 : _animationConfig$doma[0];

      var updateTriggers = _objectSpread(_objectSpread({}, this.getVisualChannelUpdateTriggers()), {}, {
        getTimestamps: {
          columns: this.config.columns,
          domain0: domain0
        },
        getFilterValue: gpuFilter.filterValueUpdateTriggers
      });

      var defaultLayerProps = this.getDefaultDeckLayerProps(opts);
      return [new _geoLayers.TripsLayer(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), data), {}, {
        getTimestamps: function getTimestamps(d) {
          return data.getTimestamps(d).map(function (ts) {
            return ts - domain0;
          });
        },
        widthScale: this.config.visConfig.thickness * zoomFactor * zoomFactorValue,
        rounded: true,
        wrapLongitude: false,
        parameters: {
          depthTest: mapState.dragRotate,
          depthMask: false
        },
        trailLength: visConfig.trailLength * 1000,
        currentTime: animationConfig.currentTime - domain0,
        updateTriggers: updateTriggers
      }))];
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref5, foundLayers) {
      var _this4 = this;

      var label = _ref5.label,
          _ref5$fields = _ref5.fields,
          fields = _ref5$fields === void 0 ? [] : _ref5$fields,
          dataContainer = _ref5.dataContainer,
          id = _ref5.id;
      var geojsonColumns = fields.filter(function (f) {
        return f.type === 'geojson';
      }).map(function (f) {
        return f.name;
      });
      var defaultColumns = {
        geojson: (0, _lodash2["default"])([].concat((0, _toConsumableArray2["default"])(_defaultSettings.GEOJSON_FIELDS.geojson), (0, _toConsumableArray2["default"])(geojsonColumns)))
      };
      var geoJsonColumns = this.findDefaultColumnField(defaultColumns, fields);
      var tripColumns = (geoJsonColumns || []).filter(function (col) {
        return (0, _tripUtils.isTripGeoJsonField)(dataContainer, fields[col.geojson.fieldIdx]);
      });

      if (!tripColumns.length) {
        return {
          props: []
        };
      }

      return {
        props: tripColumns.map(function (columns) {
          return {
            label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this4.type,
            columns: columns,
            isVisible: true
          };
        }),
        // if a geojson layer is created from this column, delete it
        foundLayers: foundLayers.filter(function (prop) {
          return prop.type !== 'geojson' || prop.dataId !== id || !tripColumns.find(function (c) {
            return prop.columns.geojson.name === c.geojson.name;
          });
        })
      };
    }
  }]);
  return TripLayer;
}(_baseLayer["default"]);

exports["default"] = TripLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvdHJpcC1sYXllci90cmlwLWxheWVyLmpzIl0sIm5hbWVzIjpbInpvb21GYWN0b3JWYWx1ZSIsImRlZmF1bHRUaGlja25lc3MiLCJkZWZhdWx0TGluZVdpZHRoIiwidHJpcFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwidGhpY2tuZXNzIiwidHlwZSIsImRlZmF1bHRWYWx1ZSIsImxhYmVsIiwiaXNSYW5nZWQiLCJyYW5nZSIsInN0ZXAiLCJncm91cCIsInByb3BlcnR5IiwiY29sb3JSYW5nZSIsInRyYWlsTGVuZ3RoIiwic2l6ZVJhbmdlIiwiZ2VvSnNvblJlcXVpcmVkQ29sdW1ucyIsImZlYXR1cmVBY2Nlc3NvciIsImdlb2pzb24iLCJkYyIsImQiLCJ2YWx1ZUF0IiwiaW5kZXgiLCJmaWVsZElkeCIsImZlYXR1cmVSZXNvbHZlciIsIlRyaXBMYXllciIsInByb3BzIiwiZGF0YVRvRmVhdHVyZSIsImRhdGFUb1RpbWVTdGFtcCIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0RmVhdHVyZSIsIl9sYXllckluZm9Nb2RhbCIsIlRyaXBMYXllckljb24iLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiYWNjZXNzb3IiLCJudWxsVmFsdWUiLCJnZXRBdHRyaWJ1dGVWYWx1ZSIsImNvbmZpZyIsInByb3BlcnRpZXMiLCJsaW5lQ29sb3IiLCJzaXplIiwiY29uZGl0aW9uIiwidmlzQ29uZmlnIiwic3Ryb2tlZCIsImxpbmVXaWR0aCIsImFuaW1hdGlvbiIsImRvbWFpbiIsImlkIiwidGVtcGxhdGUiLCJtb2RhbFByb3BzIiwidGl0bGUiLCJkYXRhQ29udGFpbmVyIiwiY29sdW1ucyIsImVuYWJsZWQiLCJvYmplY3QiLCJyb3ciLCJnZXRQb3NpdGlvbiIsImZpbHRlcmVkSW5kZXgiLCJtYXAiLCJpIiwiZmlsdGVyIiwiZ2VvbWV0cnkiLCJkYXRhc2V0cyIsIm9sZExheWVyRGF0YSIsImRhdGFJZCIsImdwdUZpbHRlciIsInVwZGF0ZURhdGEiLCJkYXRhIiwiY3VzdG9tRmlsdGVyVmFsdWVBY2Nlc3NvciIsImYiLCJmaWVsZEluZGV4IiwiaW5kZXhBY2Nlc3NvciIsImRhdGFBY2Nlc3NvciIsImFjY2Vzc29ycyIsImdldEF0dHJpYnV0ZUFjY2Vzc29ycyIsImdldEZpbHRlclZhbHVlIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsImdldFBhdGgiLCJjb29yZGluYXRlcyIsImdldFRpbWVzdGFtcHMiLCJ1cGRhdGVMYXllckNvbmZpZyIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJtZXRhIiwiYW5pbWF0aW9uRG9tYWluIiwidXBkYXRlQW5pbWF0aW9uRG9tYWluIiwiYm91bmRzIiwiZmVhdHVyZVR5cGVzIiwidXBkYXRlTWV0YSIsInVwZGF0ZUxheWVyTWV0YSIsIm9wdHMiLCJtYXBTdGF0ZSIsImFuaW1hdGlvbkNvbmZpZyIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwiaXNWYWxpZFRpbWUiLCJBcnJheSIsImlzQXJyYXkiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwiY3VycmVudFRpbWUiLCJkb21haW4wIiwidXBkYXRlVHJpZ2dlcnMiLCJnZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMiLCJmaWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzIiwiZGVmYXVsdExheWVyUHJvcHMiLCJnZXREZWZhdWx0RGVja0xheWVyUHJvcHMiLCJEZWNrR0xUcmlwc0xheWVyIiwidHMiLCJ3aWR0aFNjYWxlIiwicm91bmRlZCIsIndyYXBMb25naXR1ZGUiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsImRlcHRoTWFzayIsImZvdW5kTGF5ZXJzIiwiZmllbGRzIiwiZ2VvanNvbkNvbHVtbnMiLCJuYW1lIiwiZGVmYXVsdENvbHVtbnMiLCJHRU9KU09OX0ZJRUxEUyIsImdlb0pzb25Db2x1bW5zIiwiZmluZERlZmF1bHRDb2x1bW5GaWVsZCIsInRyaXBDb2x1bW5zIiwiY29sIiwibGVuZ3RoIiwicmVwbGFjZSIsImlz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QUFDdkIsZUFBTztBQUFDckcsVUFBQUEsS0FBSyxFQUFFO0FBQVIsU0FBUDtBQUNEOztBQUVELGFBQU87QUFDTEEsUUFBQUEsS0FBSyxFQUFFbUcsV0FBVyxDQUFDbEUsR0FBWixDQUFnQixVQUFBTixPQUFPO0FBQUEsaUJBQUs7QUFDakM5QyxZQUFBQSxLQUFLLEVBQUcsT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsS0FBSyxDQUFDeUgsT0FBTixDQUFjLFdBQWQsRUFBMkIsRUFBM0IsQ0FBOUIsSUFBaUUsTUFBSSxDQUFDM0gsSUFENUM7QUFFakNnRCxZQUFBQSxPQUFPLEVBQVBBLE9BRmlDO0FBR2pDNEUsWUFBQUEsU0FBUyxFQUFFO0FBSHNCLFdBQUw7QUFBQSxTQUF2QixDQURGO0FBT0w7QUFDQVosUUFBQUEsV0FBVyxFQUFFQSxXQUFXLENBQUN4RCxNQUFaLENBQ1gsVUFBQXFFLElBQUk7QUFBQSxpQkFDRkEsSUFBSSxDQUFDN0gsSUFBTCxLQUFjLFNBQWQsSUFDQTZILElBQUksQ0FBQ2pFLE1BQUwsS0FBZ0JqQixFQURoQixJQUVBLENBQUM2RSxXQUFXLENBQUNNLElBQVosQ0FBaUIsVUFBQUMsQ0FBQztBQUFBLG1CQUFJRixJQUFJLENBQUM3RSxPQUFMLENBQWFuQyxPQUFiLENBQXFCc0csSUFBckIsS0FBOEJZLENBQUMsQ0FBQ2xILE9BQUYsQ0FBVXNHLElBQTVDO0FBQUEsV0FBbEIsQ0FIQztBQUFBLFNBRE87QUFSUixPQUFQO0FBZUQ7OztFQXJHb0NhLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtUcmlwc0xheWVyIGFzIERlY2tHTFRyaXBzTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2dlby1sYXllcnMnO1xuXG5pbXBvcnQge0dFT0pTT05fRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQgVHJpcExheWVySWNvbiBmcm9tICcuL3RyaXAtbGF5ZXItaWNvbic7XG5cbmltcG9ydCB7XG4gIGdldEdlb2pzb25EYXRhTWFwcyxcbiAgZ2V0R2VvanNvbkJvdW5kcyxcbiAgZ2V0R2VvanNvbkZlYXR1cmVUeXBlc1xufSBmcm9tICdsYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLXV0aWxzJztcblxuaW1wb3J0IHtpc1RyaXBHZW9Kc29uRmllbGQsIHBhcnNlVHJpcEdlb0pzb25UaW1lc3RhbXB9IGZyb20gJy4vdHJpcC11dGlscyc7XG5pbXBvcnQgVHJpcEluZm9Nb2RhbEZhY3RvcnkgZnJvbSAnLi90cmlwLWluZm8tbW9kYWwnO1xuXG5jb25zdCB6b29tRmFjdG9yVmFsdWUgPSA4O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFRoaWNrbmVzcyA9IDAuNTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0TGluZVdpZHRoID0gMTtcblxuZXhwb3J0IGNvbnN0IHRyaXBWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHRoaWNrbmVzczoge1xuICAgIHR5cGU6ICdudW1iZXInLFxuICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdFRoaWNrbmVzcyxcbiAgICBsYWJlbDogJ1N0cm9rZSBXaWR0aCcsXG4gICAgaXNSYW5nZWQ6IGZhbHNlLFxuICAgIHJhbmdlOiBbMCwgMTAwXSxcbiAgICBzdGVwOiAwLjEsXG4gICAgZ3JvdXA6ICdzdHJva2UnLFxuICAgIHByb3BlcnR5OiAndGhpY2tuZXNzJ1xuICB9LFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHRyYWlsTGVuZ3RoOiAndHJhaWxMZW5ndGgnLFxuICBzaXplUmFuZ2U6ICdzdHJva2VXaWR0aFJhbmdlJ1xufTtcblxuZXhwb3J0IGNvbnN0IGdlb0pzb25SZXF1aXJlZENvbHVtbnMgPSBbJ2dlb2pzb24nXTtcbmV4cG9ydCBjb25zdCBmZWF0dXJlQWNjZXNzb3IgPSAoe2dlb2pzb259KSA9PiBkYyA9PiBkID0+IGRjLnZhbHVlQXQoZC5pbmRleCwgZ2VvanNvbi5maWVsZElkeCk7XG5leHBvcnQgY29uc3QgZmVhdHVyZVJlc29sdmVyID0gKHtnZW9qc29ufSkgPT4gZ2VvanNvbi5maWVsZElkeDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJpcExheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IFtdO1xuICAgIHRoaXMuZGF0YVRvVGltZVN0YW1wID0gW107XG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyh0cmlwVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRGZWF0dXJlID0gbWVtb2l6ZShmZWF0dXJlQWNjZXNzb3IsIGZlYXR1cmVSZXNvbHZlcik7XG4gICAgdGhpcy5fbGF5ZXJJbmZvTW9kYWwgPSBUcmlwSW5mb01vZGFsRmFjdG9yeSgpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICd0cmlwJztcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnVHJpcCc7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBUcmlwTGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBnZW9Kc29uUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWxzID0gc3VwZXIudmlzdWFsQ2hhbm5lbHM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udmlzdWFsQ2hhbm5lbHMsXG4gICAgICBjb2xvcjoge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRDb2xvcicsXG4gICAgICAgIG51bGxWYWx1ZTogdmlzdWFsQ2hhbm5lbHMuY29sb3IubnVsbFZhbHVlLFxuICAgICAgICBnZXRBdHRyaWJ1dGVWYWx1ZTogY29uZmlnID0+IGQgPT4gZC5wcm9wZXJ0aWVzLmxpbmVDb2xvciB8fCBjb25maWcuY29sb3IsXG4gICAgICAgIC8vIHVzZWQgdGhpcyB0byBnZXQgdXBkYXRlVHJpZ2dlcnNcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBjb25maWcgPT4gY29uZmlnLmNvbG9yXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZScsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0V2lkdGgnLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZWQsXG4gICAgICAgIG51bGxWYWx1ZTogMCxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWU6ICgpID0+IGQgPT4gZC5wcm9wZXJ0aWVzLmxpbmVXaWR0aCB8fCBkZWZhdWx0TGluZVdpZHRoXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBhbmltYXRpb25Eb21haW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFuaW1hdGlvbi5kb21haW47XG4gIH1cblxuICBnZXQgbGF5ZXJJbmZvTW9kYWwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnaWNvbkluZm8nLFxuICAgICAgdGVtcGxhdGU6IHRoaXMuX2xheWVySW5mb01vZGFsLFxuICAgICAgbW9kYWxQcm9wczoge1xuICAgICAgICB0aXRsZTogJ21vZGFsLnRyaXBJbmZvLnRpdGxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGZWF0dXJlKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7bGFiZWwsIGZpZWxkcyA9IFtdLCBkYXRhQ29udGFpbmVyLCBpZH0sIGZvdW5kTGF5ZXJzKSB7XG4gICAgY29uc3QgZ2VvanNvbkNvbHVtbnMgPSBmaWVsZHMuZmlsdGVyKGYgPT4gZi50eXBlID09PSAnZ2VvanNvbicpLm1hcChmID0+IGYubmFtZSk7XG5cbiAgICBjb25zdCBkZWZhdWx0Q29sdW1ucyA9IHtcbiAgICAgIGdlb2pzb246IHVuaXEoWy4uLkdFT0pTT05fRklFTERTLmdlb2pzb24sIC4uLmdlb2pzb25Db2x1bW5zXSlcbiAgICB9O1xuXG4gICAgY29uc3QgZ2VvSnNvbkNvbHVtbnMgPSB0aGlzLmZpbmREZWZhdWx0Q29sdW1uRmllbGQoZGVmYXVsdENvbHVtbnMsIGZpZWxkcyk7XG5cbiAgICBjb25zdCB0cmlwQ29sdW1ucyA9IChnZW9Kc29uQ29sdW1ucyB8fCBbXSkuZmlsdGVyKGNvbCA9PlxuICAgICAgaXNUcmlwR2VvSnNvbkZpZWxkKGRhdGFDb250YWluZXIsIGZpZWxkc1tjb2wuZ2VvanNvbi5maWVsZElkeF0pXG4gICAgKTtcblxuICAgIGlmICghdHJpcENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge3Byb3BzOiBbXX07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB0cmlwQ29sdW1ucy5tYXAoY29sdW1ucyA9PiAoe1xuICAgICAgICBsYWJlbDogKHR5cGVvZiBsYWJlbCA9PT0gJ3N0cmluZycgJiYgbGFiZWwucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKSkgfHwgdGhpcy50eXBlLFxuICAgICAgICBjb2x1bW5zLFxuICAgICAgICBpc1Zpc2libGU6IHRydWVcbiAgICAgIH0pKSxcblxuICAgICAgLy8gaWYgYSBnZW9qc29uIGxheWVyIGlzIGNyZWF0ZWQgZnJvbSB0aGlzIGNvbHVtbiwgZGVsZXRlIGl0XG4gICAgICBmb3VuZExheWVyczogZm91bmRMYXllcnMuZmlsdGVyKFxuICAgICAgICBwcm9wID0+XG4gICAgICAgICAgcHJvcC50eXBlICE9PSAnZ2VvanNvbicgfHxcbiAgICAgICAgICBwcm9wLmRhdGFJZCAhPT0gaWQgfHxcbiAgICAgICAgICAhdHJpcENvbHVtbnMuZmluZChjID0+IHByb3AuY29sdW1ucy5nZW9qc29uLm5hbWUgPT09IGMuZ2VvanNvbi5uYW1lKVxuICAgICAgKVxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzKSxcbiAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICBkb21haW46IG51bGxcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCwgZGF0YUNvbnRhaW5lcikge1xuICAgIC8vIGluZGV4IGZvciBkYXRhQ29udGFpbmVyIGlzIHNhdmVkIHRvIGZlYXR1cmUucHJvcGVydGllc1xuICAgIHJldHVybiBkYXRhQ29udGFpbmVyLnJvdyhvYmplY3QucHJvcGVydGllcy5pbmRleCk7XG4gIH1cblxuICBjYWxjdWxhdGVEYXRhQXR0cmlidXRlKHtkYXRhQ29udGFpbmVyLCBmaWx0ZXJlZEluZGV4fSwgZ2V0UG9zaXRpb24pIHtcbiAgICByZXR1cm4gZmlsdGVyZWRJbmRleFxuICAgICAgLm1hcChpID0+IHRoaXMuZGF0YVRvRmVhdHVyZVtpXSlcbiAgICAgIC5maWx0ZXIoZCA9PiBkICYmIGQuZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnKTtcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKSB7XG4gICAgLy8gdG8tZG86IHBhcnNlIHNlZ21lbnQgZnJvbSBkYXRhQ29udGFpbmVyXG4gICAgY29uc3Qge2RhdGFDb250YWluZXIsIGdwdUZpbHRlcn0gPSBkYXRhc2V0c1t0aGlzLmNvbmZpZy5kYXRhSWRdO1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMudXBkYXRlRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKTtcblxuICAgIGNvbnN0IGN1c3RvbUZpbHRlclZhbHVlQWNjZXNzb3IgPSAoZGMsIGYsIGZpZWxkSW5kZXgpID0+IHtcbiAgICAgIHJldHVybiBkYy52YWx1ZUF0KGYucHJvcGVydGllcy5pbmRleCwgZmllbGRJbmRleCk7XG4gICAgfTtcbiAgICBjb25zdCBpbmRleEFjY2Vzc29yID0gZiA9PiBmLnByb3BlcnRpZXMuaW5kZXg7XG5cbiAgICBjb25zdCBkYXRhQWNjZXNzb3IgPSBkYyA9PiBkID0+ICh7aW5kZXg6IGQucHJvcGVydGllcy5pbmRleH0pO1xuICAgIGNvbnN0IGFjY2Vzc29ycyA9IHRoaXMuZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQWNjZXNzb3IsIGRhdGFDb250YWluZXJ9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZUFjY2Vzc29yKGRhdGFDb250YWluZXIpKFxuICAgICAgICBpbmRleEFjY2Vzc29yLFxuICAgICAgICBjdXN0b21GaWx0ZXJWYWx1ZUFjY2Vzc29yXG4gICAgICApLFxuICAgICAgZ2V0UGF0aDogZCA9PiBkLmdlb21ldHJ5LmNvb3JkaW5hdGVzLFxuICAgICAgZ2V0VGltZXN0YW1wczogZCA9PiB0aGlzLmRhdGFUb1RpbWVTdGFtcFtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgLi4uYWNjZXNzb3JzXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZUFuaW1hdGlvbkRvbWFpbihkb21haW4pIHtcbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAuLi50aGlzLmNvbmZpZy5hbmltYXRpb24sXG4gICAgICAgIGRvbWFpblxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIpIHtcbiAgICBjb25zdCBnZXRGZWF0dXJlID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGlmIChnZXRGZWF0dXJlID09PSB0aGlzLm1ldGEuZ2V0RmVhdHVyZSkge1xuICAgICAgLy8gVE9ETzogcmV2aXNpdCB0aGlzIGFmdGVyIGdwdSBmaWx0ZXJpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGFUb0ZlYXR1cmUgPSBnZXRHZW9qc29uRGF0YU1hcHMoZGF0YUNvbnRhaW5lciwgZ2V0RmVhdHVyZSk7XG5cbiAgICBjb25zdCB7ZGF0YVRvVGltZVN0YW1wLCBhbmltYXRpb25Eb21haW59ID0gcGFyc2VUcmlwR2VvSnNvblRpbWVzdGFtcCh0aGlzLmRhdGFUb0ZlYXR1cmUpO1xuXG4gICAgdGhpcy5kYXRhVG9UaW1lU3RhbXAgPSBkYXRhVG9UaW1lU3RhbXA7XG4gICAgdGhpcy51cGRhdGVBbmltYXRpb25Eb21haW4oYW5pbWF0aW9uRG9tYWluKTtcblxuICAgIC8vIGdldCBib3VuZHMgZnJvbSBmZWF0dXJlc1xuICAgIGNvbnN0IGJvdW5kcyA9IGdldEdlb2pzb25Cb3VuZHModGhpcy5kYXRhVG9GZWF0dXJlKTtcblxuICAgIC8vIGtlZXAgYSByZWNvcmQgb2Ygd2hhdCB0eXBlIG9mIGdlb21ldHJ5IHRoZSBjb2xsZWN0aW9uIGhhc1xuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGdldEdlb2pzb25GZWF0dXJlVHlwZXModGhpcy5kYXRhVG9GZWF0dXJlKTtcblxuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzLCBmZWF0dXJlVHlwZXMsIGdldEZlYXR1cmV9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxMYXllckNvbmZpZyh7ZGF0YUNvbnRhaW5lcn0pIHtcbiAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShkYXRhQ29udGFpbmVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbmRlckxheWVyKG9wdHMpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ3B1RmlsdGVyLCBtYXBTdGF0ZSwgYW5pbWF0aW9uQ29uZmlnfSA9IG9wdHM7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCBpc1ZhbGlkVGltZSA9XG4gICAgICBhbmltYXRpb25Db25maWcgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkoYW5pbWF0aW9uQ29uZmlnLmRvbWFpbikgJiZcbiAgICAgIGFuaW1hdGlvbkNvbmZpZy5kb21haW4uZXZlcnkoTnVtYmVyLmlzRmluaXRlKSAmJlxuICAgICAgTnVtYmVyLmlzRmluaXRlKGFuaW1hdGlvbkNvbmZpZy5jdXJyZW50VGltZSk7XG5cbiAgICBpZiAoIWlzVmFsaWRUaW1lKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgZG9tYWluMCA9IGFuaW1hdGlvbkNvbmZpZy5kb21haW4/LlswXTtcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgLi4udGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKSxcbiAgICAgIGdldFRpbWVzdGFtcHM6IHtcbiAgICAgICAgY29sdW1uczogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgICAgZG9tYWluMFxuICAgICAgfSxcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2Vyc1xuICAgIH07XG4gICAgY29uc3QgZGVmYXVsdExheWVyUHJvcHMgPSB0aGlzLmdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyhvcHRzKTtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRGVja0dMVHJpcHNMYXllcih7XG4gICAgICAgIC4uLmRlZmF1bHRMYXllclByb3BzLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBnZXRUaW1lc3RhbXBzOiBkID0+IGRhdGEuZ2V0VGltZXN0YW1wcyhkKS5tYXAodHMgPT4gdHMgLSBkb21haW4wKSxcbiAgICAgICAgd2lkdGhTY2FsZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnRoaWNrbmVzcyAqIHpvb21GYWN0b3IgKiB6b29tRmFjdG9yVmFsdWUsXG4gICAgICAgIHJvdW5kZWQ6IHRydWUsXG4gICAgICAgIHdyYXBMb25naXR1ZGU6IGZhbHNlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgZGVwdGhUZXN0OiBtYXBTdGF0ZS5kcmFnUm90YXRlLFxuICAgICAgICAgIGRlcHRoTWFzazogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgdHJhaWxMZW5ndGg6IHZpc0NvbmZpZy50cmFpbExlbmd0aCAqIDEwMDAsXG4gICAgICAgIGN1cnJlbnRUaW1lOiBhbmltYXRpb25Db25maWcuY3VycmVudFRpbWUgLSBkb21haW4wLFxuICAgICAgICB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgfSlcbiAgICBdO1xuICB9XG59XG4iXX0=