"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.scenegraphVisConfigs = exports.scenegraphPosAccessor = exports.scenegraphOptionalColumns = exports.scenegraphRequiredColumns = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _meshLayers = require("@deck.gl/mesh-layers");

var _core = require("@loaders.gl/core");

var _gltf = require("@loaders.gl/gltf");

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _scenegraphLayerIcon = _interopRequireDefault(require("./scenegraph-layer-icon"));

var _scenegraphInfoModal = _interopRequireDefault(require("./scenegraph-info-modal"));

var _layerFactory = require("../layer-factory");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var scenegraphRequiredColumns = ['lat', 'lng'];
exports.scenegraphRequiredColumns = scenegraphRequiredColumns;
var scenegraphOptionalColumns = ['altitude'];
exports.scenegraphOptionalColumns = scenegraphOptionalColumns;

function fetch(url, _ref) {
  var propName = _ref.propName,
      layer = _ref.layer;

  if (propName === 'scenegraph') {
    return (0, _core.load)(url, _gltf.GLTFLoader, layer.getLoadOptions());
  }

  return fetch(url).then(function (response) {
    return response.json();
  });
}

var scenegraphPosAccessor = function scenegraphPosAccessor(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng,
      altitude = _ref2.altitude;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng.fieldIdx), dc.valueAt(d.index, lat.fieldIdx), altitude && altitude.fieldIdx > -1 ? dc.valueAt(d.index, altitude.fieldIdx) : 0];
    };
  };
};

exports.scenegraphPosAccessor = scenegraphPosAccessor;
var scenegraphVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  //
  sizeScale: 'sizeScale',
  angleX: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.angle), {}, {
    property: 'angleX',
    label: 'angle X'
  }),
  angleY: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.angle), {}, {
    property: 'angleY',
    label: 'angle Y'
  }),
  angleZ: _objectSpread(_objectSpread({}, _layerFactory.LAYER_VIS_CONFIGS.angle), {}, {
    property: 'angleZ',
    defaultValue: 90,
    label: 'angle Z'
  })
};
exports.scenegraphVisConfigs = scenegraphVisConfigs;
var DEFAULT_MODEL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb';
var DEFAULT_TRANSITION = [0, 0, 0];
var DEFAULT_SCALE = [1, 1, 1];
var DEFAULT_COLOR = [255, 255, 255, 255];

var ScenegraphLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(ScenegraphLayer, _Layer);

  var _super = _createSuper(ScenegraphLayer);

  function ScenegraphLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ScenegraphLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(scenegraphVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return scenegraphPosAccessor(_this.config.columns)(dataContainer);
    }; // prepare layer info modal


    _this._layerInfoModal = (0, _scenegraphInfoModal["default"])();
    return _this;
  }

  (0, _createClass2["default"])(ScenegraphLayer, [{
    key: "type",
    get: function get() {
      return '3D';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return scenegraphRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return scenegraphOptionalColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _scenegraphLayerIcon["default"];
    }
  }, {
    key: "layerInfoModal",
    get: function get() {
      return {
        id: 'scenegraphInfo',
        template: this._layerInfoModal,
        modalProps: {
          title: 'How to use Scenegraph'
        }
      };
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref3, getPosition) {
      var dataContainer = _ref3.dataContainer,
          filteredIndex = _ref3.filteredIndex;
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
      var _datasets$this$config = datasets[this.config.dataId],
          gpuFilter = _datasets$this$config.gpuFilter,
          dataContainer = _datasets$this$config.dataContainer;

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data;

      var getPosition = this.getPositionAccessor(dataContainer);
      return {
        data: data,
        getPosition: getPosition,
        getFilterValue: gpuFilter.filterValueAccessor(dataContainer)()
      };
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getPosition) {
      var bounds = this.getPointsBounds(dataContainer, getPosition);
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(opts) {
      var data = opts.data,
          gpuFilter = opts.gpuFilter;
      var _this$config$visConfi = this.config.visConfig,
          _this$config$visConfi2 = _this$config$visConfi.sizeScale,
          sizeScale = _this$config$visConfi2 === void 0 ? 1 : _this$config$visConfi2,
          _this$config$visConfi3 = _this$config$visConfi.angleX,
          angleX = _this$config$visConfi3 === void 0 ? 0 : _this$config$visConfi3,
          _this$config$visConfi4 = _this$config$visConfi.angleY,
          angleY = _this$config$visConfi4 === void 0 ? 0 : _this$config$visConfi4,
          _this$config$visConfi5 = _this$config$visConfi.angleZ,
          angleZ = _this$config$visConfi5 === void 0 ? 90 : _this$config$visConfi5;
      return [new _meshLayers.ScenegraphLayer(_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultDeckLayerProps(opts)), data), {}, {
        fetch: fetch,
        scenegraph: this.config.visConfig.scenegraph || DEFAULT_MODEL,
        sizeScale: sizeScale,
        getTranslation: DEFAULT_TRANSITION,
        getScale: DEFAULT_SCALE,
        getOrientation: [angleX, angleY, angleZ],
        getColor: DEFAULT_COLOR,
        // parameters
        parameters: {
          depthTest: true,
          blend: false
        },
        // update triggers
        updateTriggers: {
          getOrientation: {
            angleX: angleX,
            angleY: angleY,
            angleZ: angleZ
          },
          getPosition: this.config.columns,
          getFilterValue: gpuFilter.filterValueUpdateTriggers
        }
      }))];
    }
  }]);
  return ScenegraphLayer;
}(_baseLayer["default"]);

exports["default"] = ScenegraphLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvc2NlbmVncmFwaC1sYXllci9zY2VuZWdyYXBoLWxheWVyLmpzIl0sIm5hbWVzIjpbInNjZW5lZ3JhcGhSZXF1aXJlZENvbHVtbnMiLCJzY2VuZWdyYXBoT3B0aW9uYWxDb2x1bW5zIiwiZmV0Y2giLCJ1cmwiLCJwcm9wTmFtZSIsImxheWVyIiwiR0xURkxvYWRlciIsImdldExvYWRPcHRpb25zIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInNjZW5lZ3JhcGhQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImFsdGl0dWRlIiwiZGMiLCJkIiwidmFsdWVBdCIsImluZGV4IiwiZmllbGRJZHgiLCJzY2VuZWdyYXBoVmlzQ29uZmlncyIsIm9wYWNpdHkiLCJjb2xvclJhbmdlIiwic2l6ZVNjYWxlIiwiYW5nbGVYIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJhbmdsZSIsInByb3BlcnR5IiwibGFiZWwiLCJhbmdsZVkiLCJhbmdsZVoiLCJkZWZhdWx0VmFsdWUiLCJERUZBVUxUX01PREVMIiwiREVGQVVMVF9UUkFOU0lUSU9OIiwiREVGQVVMVF9TQ0FMRSIsIkRFRkFVTFRfQ09MT1IiLCJTY2VuZWdyYXBoTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiX2xheWVySW5mb01vZGFsIiwiZGVmYXVsdFBvaW50Q29sdW1uUGFpcnMiLCJTY2VuZWdyYXBoTGF5ZXJJY29uIiwiaWQiLCJ0ZW1wbGF0ZSIsIm1vZGFsUHJvcHMiLCJ0aXRsZSIsImdldFBvc2l0aW9uIiwiZmlsdGVyZWRJbmRleCIsImRhdGEiLCJpIiwibGVuZ3RoIiwicG9zIiwiZXZlcnkiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInB1c2giLCJwb3NpdGlvbiIsImRhdGFzZXRzIiwib2xkTGF5ZXJEYXRhIiwiZGF0YUlkIiwiZ3B1RmlsdGVyIiwidXBkYXRlRGF0YSIsImdldEZpbHRlclZhbHVlIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsInVwZGF0ZU1ldGEiLCJvcHRzIiwidmlzQ29uZmlnIiwiRGVja1NjZW5lZ3JhcGhMYXllciIsImdldERlZmF1bHREZWNrTGF5ZXJQcm9wcyIsInNjZW5lZ3JhcGgiLCJnZXRUcmFuc2xhdGlvbiIsImdldFNjYWxlIiwiZ2V0T3JpZW50YXRpb24iLCJnZXRDb2xvciIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJibGVuZCIsInVwZGF0ZVRyaWdnZXJzIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSx5QkFBeUIsR0FBRyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQWxDOztBQUNBLElBQU1DLHlCQUF5QixHQUFHLENBQUMsVUFBRCxDQUFsQzs7O0FBRVAsU0FBU0MsS0FBVCxDQUFlQyxHQUFmLFFBQXVDO0FBQUEsTUFBbEJDLFFBQWtCLFFBQWxCQSxRQUFrQjtBQUFBLE1BQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFDckMsTUFBSUQsUUFBUSxLQUFLLFlBQWpCLEVBQStCO0FBQzdCLFdBQU8sZ0JBQUtELEdBQUwsRUFBVUcsZ0JBQVYsRUFBc0JELEtBQUssQ0FBQ0UsY0FBTixFQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBT0wsS0FBSyxDQUFDQyxHQUFELENBQUwsQ0FBV0ssSUFBWCxDQUFnQixVQUFBQyxRQUFRO0FBQUEsV0FBSUEsUUFBUSxDQUFDQyxJQUFULEVBQUo7QUFBQSxHQUF4QixDQUFQO0FBQ0Q7O0FBRU0sSUFBTUMscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QjtBQUFBLE1BQUVDLEdBQUYsU0FBRUEsR0FBRjtBQUFBLE1BQU9DLEdBQVAsU0FBT0EsR0FBUDtBQUFBLE1BQVlD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QSxjQUFjLEVBQUU7QUFDZEwsVUFBQUEsY0FBYyxFQUFFO0FBQUN0RCxZQUFBQSxNQUFNLEVBQU5BLE1BQUQ7QUFBU0ssWUFBQUEsTUFBTSxFQUFOQSxNQUFUO0FBQWlCQyxZQUFBQSxNQUFNLEVBQU5BO0FBQWpCLFdBREY7QUFFZG9CLFVBQUFBLFdBQVcsRUFBRSxLQUFLVCxNQUFMLENBQVlDLE9BRlg7QUFHZHdCLFVBQUFBLGNBQWMsRUFBRUYsU0FBUyxDQUFDb0I7QUFIWjtBQWJsQixTQURLLENBQVA7QUFxQkQ7OztFQXpHMENDLHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtTY2VuZWdyYXBoTGF5ZXIgYXMgRGVja1NjZW5lZ3JhcGhMYXllcn0gZnJvbSAnQGRlY2suZ2wvbWVzaC1sYXllcnMnO1xuaW1wb3J0IHtsb2FkfSBmcm9tICdAbG9hZGVycy5nbC9jb3JlJztcbmltcG9ydCB7R0xURkxvYWRlcn0gZnJvbSAnQGxvYWRlcnMuZ2wvZ2x0Zic7XG5cbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCBTY2VuZWdyYXBoTGF5ZXJJY29uIGZyb20gJy4vc2NlbmVncmFwaC1sYXllci1pY29uJztcbmltcG9ydCBTY2VuZWdyYXBoSW5mb01vZGFsRmFjdG9yeSBmcm9tICcuL3NjZW5lZ3JhcGgtaW5mby1tb2RhbCc7XG5pbXBvcnQge0xBWUVSX1ZJU19DT05GSUdTfSBmcm9tICdsYXllcnMvbGF5ZXItZmFjdG9yeSc7XG5cbmV4cG9ydCBjb25zdCBzY2VuZWdyYXBoUmVxdWlyZWRDb2x1bW5zID0gWydsYXQnLCAnbG5nJ107XG5leHBvcnQgY29uc3Qgc2NlbmVncmFwaE9wdGlvbmFsQ29sdW1ucyA9IFsnYWx0aXR1ZGUnXTtcblxuZnVuY3Rpb24gZmV0Y2godXJsLCB7cHJvcE5hbWUsIGxheWVyfSkge1xuICBpZiAocHJvcE5hbWUgPT09ICdzY2VuZWdyYXBoJykge1xuICAgIHJldHVybiBsb2FkKHVybCwgR0xURkxvYWRlciwgbGF5ZXIuZ2V0TG9hZE9wdGlvbnMoKSk7XG4gIH1cblxuICByZXR1cm4gZmV0Y2godXJsKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbmV4cG9ydCBjb25zdCBzY2VuZWdyYXBoUG9zQWNjZXNzb3IgPSAoe2xhdCwgbG5nLCBhbHRpdHVkZX0pID0+IGRjID0+IGQgPT4gW1xuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxuZy5maWVsZElkeCksXG4gIGRjLnZhbHVlQXQoZC5pbmRleCwgbGF0LmZpZWxkSWR4KSxcbiAgYWx0aXR1ZGUgJiYgYWx0aXR1ZGUuZmllbGRJZHggPiAtMSA/IGRjLnZhbHVlQXQoZC5pbmRleCwgYWx0aXR1ZGUuZmllbGRJZHgpIDogMFxuXTtcblxuZXhwb3J0IGNvbnN0IHNjZW5lZ3JhcGhWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgLy9cbiAgc2l6ZVNjYWxlOiAnc2l6ZVNjYWxlJyxcbiAgYW5nbGVYOiB7XG4gICAgLi4uTEFZRVJfVklTX0NPTkZJR1MuYW5nbGUsXG4gICAgcHJvcGVydHk6ICdhbmdsZVgnLFxuICAgIGxhYmVsOiAnYW5nbGUgWCdcbiAgfSxcbiAgYW5nbGVZOiB7XG4gICAgLi4uTEFZRVJfVklTX0NPTkZJR1MuYW5nbGUsXG4gICAgcHJvcGVydHk6ICdhbmdsZVknLFxuICAgIGxhYmVsOiAnYW5nbGUgWSdcbiAgfSxcbiAgYW5nbGVaOiB7XG4gICAgLi4uTEFZRVJfVklTX0NPTkZJR1MuYW5nbGUsXG4gICAgcHJvcGVydHk6ICdhbmdsZVonLFxuICAgIGRlZmF1bHRWYWx1ZTogOTAsXG4gICAgbGFiZWw6ICdhbmdsZSBaJ1xuICB9XG59O1xuXG5jb25zdCBERUZBVUxUX01PREVMID1cbiAgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9LaHJvbm9zR3JvdXAvZ2xURi1TYW1wbGUtTW9kZWxzL21hc3Rlci8yLjAvRHVjay9nbFRGLUJpbmFyeS9EdWNrLmdsYic7XG5jb25zdCBERUZBVUxUX1RSQU5TSVRJT04gPSBbMCwgMCwgMF07XG5jb25zdCBERUZBVUxUX1NDQUxFID0gWzEsIDEsIDFdO1xuY29uc3QgREVGQVVMVF9DT0xPUiA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZWdyYXBoTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhzY2VuZWdyYXBoVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yID0gZGF0YUNvbnRhaW5lciA9PlxuICAgICAgc2NlbmVncmFwaFBvc0FjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuXG4gICAgLy8gcHJlcGFyZSBsYXllciBpbmZvIG1vZGFsXG4gICAgdGhpcy5fbGF5ZXJJbmZvTW9kYWwgPSBTY2VuZWdyYXBoSW5mb01vZGFsRmFjdG9yeSgpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICczRCc7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHNjZW5lZ3JhcGhSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgb3B0aW9uYWxDb2x1bW5zKCkge1xuICAgIHJldHVybiBzY2VuZWdyYXBoT3B0aW9uYWxDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gU2NlbmVncmFwaExheWVySWNvbjtcbiAgfVxuXG4gIGdldCBsYXllckluZm9Nb2RhbCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdzY2VuZWdyYXBoSW5mbycsXG4gICAgICB0ZW1wbGF0ZTogdGhpcy5fbGF5ZXJJbmZvTW9kYWwsXG4gICAgICBtb2RhbFByb3BzOiB7XG4gICAgICAgIHRpdGxlOiAnSG93IHRvIHVzZSBTY2VuZWdyYXBoJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjYWxjdWxhdGVEYXRhQXR0cmlidXRlKHtkYXRhQ29udGFpbmVyLCBmaWx0ZXJlZEluZGV4fSwgZ2V0UG9zaXRpb24pIHtcbiAgICBjb25zdCBkYXRhID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtpbmRleH0pO1xuXG4gICAgICAvLyBpZiBkb2Vzbid0IGhhdmUgcG9pbnQgbGF0IG9yIGxuZywgZG8gbm90IGFkZCB0aGUgcG9pbnRcbiAgICAgIC8vIGRlY2suZ2wgY2FuJ3QgaGFuZGxlIHBvc2l0aW9uID0gbnVsbFxuICAgICAgaWYgKHBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKSB7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgICAgICBpbmRleFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSkge1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnVwZGF0ZURhdGEoZGF0YXNldHMsIG9sZExheWVyRGF0YSk7XG4gICAgY29uc3QgZ2V0UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKSgpXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyTWV0YShkYXRhQ29udGFpbmVyLCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kc30pO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIob3B0cykge1xuICAgIGNvbnN0IHtkYXRhLCBncHVGaWx0ZXJ9ID0gb3B0cztcblxuICAgIGNvbnN0IHtcbiAgICAgIHZpc0NvbmZpZzoge3NpemVTY2FsZSA9IDEsIGFuZ2xlWCA9IDAsIGFuZ2xlWSA9IDAsIGFuZ2xlWiA9IDkwfVxuICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRGVja1NjZW5lZ3JhcGhMYXllcih7XG4gICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBmZXRjaCxcbiAgICAgICAgc2NlbmVncmFwaDogdGhpcy5jb25maWcudmlzQ29uZmlnLnNjZW5lZ3JhcGggfHwgREVGQVVMVF9NT0RFTCxcbiAgICAgICAgc2l6ZVNjYWxlLFxuICAgICAgICBnZXRUcmFuc2xhdGlvbjogREVGQVVMVF9UUkFOU0lUSU9OLFxuICAgICAgICBnZXRTY2FsZTogREVGQVVMVF9TQ0FMRSxcbiAgICAgICAgZ2V0T3JpZW50YXRpb246IFthbmdsZVgsIGFuZ2xlWSwgYW5nbGVaXSxcbiAgICAgICAgZ2V0Q29sb3I6IERFRkFVTFRfQ09MT1IsXG4gICAgICAgIC8vIHBhcmFtZXRlcnNcbiAgICAgICAgcGFyYW1ldGVyczoge2RlcHRoVGVzdDogdHJ1ZSwgYmxlbmQ6IGZhbHNlfSxcbiAgICAgICAgLy8gdXBkYXRlIHRyaWdnZXJzXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgZ2V0T3JpZW50YXRpb246IHthbmdsZVgsIGFuZ2xlWSwgYW5nbGVafSxcbiAgICAgICAgICBnZXRQb3NpdGlvbjogdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgICAgICBnZXRGaWx0ZXJWYWx1ZTogZ3B1RmlsdGVyLmZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdO1xuICB9XG59XG4iXX0=