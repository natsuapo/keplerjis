"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pointVisConfigs = exports.iconOptionalColumns = exports.iconRequiredColumns = exports.iconAccessor = exports.iconPosAccessor = exports.SVG_ICON_URL = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _window = _interopRequireDefault(require("global/window"));

var _extensions = require("@deck.gl/extensions");

var _svgIconLayer = _interopRequireDefault(require("../../deckgl-layers/svg-icon-layer/svg-icon-layer"));

var _iconLayerIcon = _interopRequireDefault(require("./icon-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _iconInfoModal = _interopRequireDefault(require("./icon-info-modal"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _layerTextLabel = require("../layer-text-label");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var brushingExtension = new _extensions.BrushingExtension();
var SVG_ICON_URL = "".concat(_defaultSettings.CLOUDFRONT, "/icons/svg-icons.json");
exports.SVG_ICON_URL = SVG_ICON_URL;

var iconPosAccessor = function iconPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng,
      altitude = _ref.altitude;
  return function (dc) {
    return function (d) {
      return [dc.valueAt(d.index, lng.fieldIdx), dc.valueAt(d.index, lat.fieldIdx), (altitude === null || altitude === void 0 ? void 0 : altitude.fieldIdx) > -1 ? dc.valueAt(d.index, altitude.fieldIdx) : 0];
    };
  };
};

exports.iconPosAccessor = iconPosAccessor;

var iconAccessor = function iconAccessor(_ref2) {
  var icon = _ref2.icon;
  return function (dc) {
    return function (d) {
      return dc.valueAt(d.index, icon.fieldIdx);
    };
  };
};

exports.iconAccessor = iconAccessor;
var iconRequiredColumns = ['lat', 'lng', 'icon'];
exports.iconRequiredColumns = iconRequiredColumns;
var iconOptionalColumns = ['altitude'];
exports.iconOptionalColumns = iconOptionalColumns;
var pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  colorRange: 'colorRange',
  radiusRange: 'radiusRange'
};
exports.pointVisConfigs = pointVisConfigs;

function flatterIconPositions(icon) {
  // had to flip y, since @luma modal has changed
  return icon.mesh.cells.reduce(function (prev, cell) {
    cell.forEach(function (p) {
      prev.push.apply(prev, [icon.mesh.positions[p][0], -icon.mesh.positions[p][1], icon.mesh.positions[p][2]]);
    });
    return prev;
  }, []);
}

var IconLayer = /*#__PURE__*/function (_Layer) {
  (0, _inherits2["default"])(IconLayer, _Layer);

  var _super = _createSuper(IconLayer);

  function IconLayer() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, IconLayer);
    _this = _super.call(this, props);

    _this.registerVisConfig(pointVisConfigs);

    _this.getPositionAccessor = function (dataContainer) {
      return iconPosAccessor(_this.config.columns)(dataContainer);
    };

    _this.getIconAccessor = function (dataContainer) {
      return iconAccessor(_this.config.columns)(dataContainer);
    }; // prepare layer info modal


    _this._layerInfoModal = (0, _iconInfoModal["default"])();
    _this.iconGeometry = props.iconGeometry || null;

    _this.getSvgIcons();

    return _this;
  }

  (0, _createClass2["default"])(IconLayer, [{
    key: "type",
    get: function get() {
      return 'icon';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return iconRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return iconOptionalColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _iconLayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(IconLayer.prototype), "visualChannels", this).color), {}, {
          accessor: 'getFillColor',
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        }),
        size: _objectSpread(_objectSpread({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(IconLayer.prototype), "visualChannels", this).size), {}, {
          property: 'radius',
          range: 'radiusRange',
          channelScaleType: 'radius',
          accessor: 'getRadius',
          defaultValue: 1
        })
      };
    }
  }, {
    key: "layerInfoModal",
    get: function get() {
      return {
        id: 'iconInfo',
        template: this._layerInfoModal,
        modalProps: {
          title: 'modal.iconInfo.title'
        }
      };
    }
  }, {
    key: "getSvgIcons",
    value: function getSvgIcons() {
      var _this2 = this;

      var fetchConfig = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
      };

      if (_window["default"].fetch) {
        _window["default"].fetch(SVG_ICON_URL, fetchConfig).then(function (response) {
          return response.json();
        }).then(function () {
          var parsed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var _parsed$svgIcons = parsed.svgIcons,
              svgIcons = _parsed$svgIcons === void 0 ? [] : _parsed$svgIcons;
          _this2.iconGeometry = svgIcons.reduce(function (accu, curr) {
            return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, curr.id, flatterIconPositions(curr)));
          }, {});
          _this2._layerInfoModal = (0, _iconInfoModal["default"])(svgIcons);
        });
      }
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(_ref3, getPosition) {
      var dataContainer = _ref3.dataContainer,
          filteredIndex = _ref3.filteredIndex;
      var getIcon = this.getIconAccessor(dataContainer);
      var data = [];

      for (var i = 0; i < filteredIndex.length; i++) {
        var index = filteredIndex[i];
        var rowIndex = {
          index: index
        };
        var pos = getPosition(rowIndex);
        var icon = getIcon(rowIndex); // if doesn't have point lat or lng, do not add the point
        // deck.gl can't handle position = null

        if (pos.every(Number.isFinite) && typeof icon === 'string') {
          data.push({
            index: index,
            icon: icon
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
      var getPosition = this.getPositionAccessor(dataContainer);

      var _this$updateData = this.updateData(datasets, oldLayerData),
          data = _this$updateData.data,
          triggerChanged = _this$updateData.triggerChanged; // get all distinct characters in the text labels


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
      var _this$config$columns$,
          _this3 = this;

      var data = opts.data,
          gpuFilter = opts.gpuFilter,
          objectHovered = opts.objectHovered,
          mapState = opts.mapState,
          interactionConfig = opts.interactionConfig;
      var radiusScale = this.getRadiusScaleByZoom(mapState);

      var layerProps = _objectSpread({
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
      var extensions = [].concat((0, _toConsumableArray2["default"])(defaultLayerProps.extensions), [brushingExtension]); // shared Props between layer and label layer

      var sharedProps = _objectSpread({
        getFilterValue: data.getFilterValue,
        extensions: extensions,
        filterRange: defaultLayerProps.filterRange
      }, brushingProps);

      var labelLayers = (0, _toConsumableArray2["default"])(this.renderTextLabelLayer({
        getPosition: data.getPosition,
        sharedProps: sharedProps,
        getPixelOffset: getPixelOffset,
        updateTriggers: updateTriggers
      }, opts));
      var hoveredObject = this.hasHoveredObject(objectHovered);
      var parameters = {
        // icons will be flat on the map when the altitude column is not used
        depthTest: ((_this$config$columns$ = this.config.columns.altitude) === null || _this$config$columns$ === void 0 ? void 0 : _this$config$columns$.fieldIdx) > -1
      };
      return !this.iconGeometry ? [] : [new _svgIconLayer["default"](_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultLayerProps), brushingProps), layerProps), data), {}, {
        parameters: parameters,
        getIconGeometry: function getIconGeometry(id) {
          return _this3.iconGeometry[id];
        },
        // update triggers
        updateTriggers: updateTriggers,
        extensions: extensions
      }))].concat((0, _toConsumableArray2["default"])(hoveredObject ? [new _svgIconLayer["default"](_objectSpread(_objectSpread(_objectSpread({}, this.getDefaultHoverLayerProps()), layerProps), {}, {
        data: [hoveredObject],
        parameters: parameters,
        getPosition: data.getPosition,
        getRadius: data.getRadius,
        getFillColor: this.config.highlightColor,
        getIconGeometry: function getIconGeometry(id) {
          return _this3.iconGeometry[id];
        }
      }))] : []), (0, _toConsumableArray2["default"])(labelLayers));
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === void 0 ? [] : _ref4$fieldPairs,
          _ref4$fields = _ref4.fields,
          fields = _ref4$fields === void 0 ? [] : _ref4$fields;
      var notFound = {
        props: []
      };

      if (!fieldPairs.length || !fields.length) {
        return notFound;
      }

      var iconFields = fields.filter(function (_ref5) {
        var name = _ref5.name;
        return name.replace(/[_,.]+/g, ' ').trim().split(' ').some(function (seg) {
          return _defaultSettings.ICON_FIELDS.icon.some(function (t) {
            return t.includes(seg);
          });
        });
      });

      if (!iconFields.length) {
        return notFound;
      } // create icon layers for first point pair


      var ptPair = fieldPairs[0];
      var props = iconFields.map(function (iconField) {
        return {
          label: iconField.name.replace(/[_,.]+/g, ' ').trim(),
          columns: {
            lat: ptPair.pair.lat,
            lng: ptPair.pair.lng,
            icon: {
              value: iconField.name,
              fieldIdx: iconField.fieldIdx
            }
          },
          isVisible: true
        };
      });
      return {
        props: props
      };
    }
  }]);
  return IconLayer;
}(_baseLayer["default"]);

exports["default"] = IconLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaWNvbi1sYXllci9pY29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImJydXNoaW5nRXh0ZW5zaW9uIiwiQnJ1c2hpbmdFeHRlbnNpb24iLCJTVkdfSUNPTl9VUkwiLCJDTE9VREZST05UIiwiaWNvblBvc0FjY2Vzc29yIiwibGF0IiwibG5nIiwiYWx0aXR1ZGUiLCJkYyIsImQiLCJ2YWx1ZUF0IiwiaW5kZXgiLCJmaWVsZElkeCIsImljb25BY2Nlc3NvciIsImljb24iLCJpY29uUmVxdWlyZWRDb2x1bW5zIiwiaWNvbk9wdGlvbmFsQ29sdW1ucyIsInBvaW50VmlzQ29uZmlncyIsInJhZGl1cyIsImZpeGVkUmFkaXVzIiwib3BhY2l0eSIsImNvbG9yUmFuZ2UiLCJyYWRpdXNSYW5nZSIsImZsYXR0ZXJJY29uUG9zaXRpb25zIiwibWVzaCIsImNlbGxzIiwicmVkdWNlIiwicHJldiIsImNlbGwiLCJmb3JFYWNoIiwicCIsInB1c2giLCJwb3NpdGlvbnMiLCJJY29uTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImRhdGFDb250YWluZXIiLCJjb25maWciLCJjb2x1bW5zIiwiZ2V0SWNvbkFjY2Vzc29yIiwiX2xheWVySW5mb01vZGFsIiwiaWNvbkdlb21ldHJ5IiwiZ2V0U3ZnSWNvbnMiLCJkZWZhdWx0UG9pbnRDb2x1bW5QYWlycyIsIkljb25MYXllckljb24iLCJjb2xvciIsImFjY2Vzc29yIiwiZGVmYXVsdFZhbHVlIiwic2l6ZSIsInByb3BlcnR5IiwicmFuZ2UiLCJjaGFubmVsU2NhbGVUeXBlIiwiaWQiLCJ0ZW1wbGF0ZSIsIm1vZGFsUHJvcHMiLCJ0aXRsZSIsImZldGNoQ29uZmlnIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwid2luZG93IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicGFyc2VkIiwic3ZnSWNvbnMiLCJhY2N1IiwiY3VyciIsImdldFBvc2l0aW9uIiwiZmlsdGVyZWRJbmRleCIsImdldEljb24iLCJkYXRhIiwiaSIsImxlbmd0aCIsInJvd0luZGV4IiwicG9zIiwiZXZlcnkiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImRhdGFzZXRzIiwib2xkTGF5ZXJEYXRhIiwidGV4dExhYmVsIiwiZGF0YUlkIiwiZ3B1RmlsdGVyIiwidXBkYXRlRGF0YSIsInRyaWdnZXJDaGFuZ2VkIiwidGV4dExhYmVscyIsImFjY2Vzc29ycyIsImdldEF0dHJpYnV0ZUFjY2Vzc29ycyIsImdldEZpbHRlclZhbHVlIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsInVwZGF0ZU1ldGEiLCJvcHRzIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJyYWRpdXNTY2FsZSIsImdldFJhZGl1c1NjYWxlQnlab29tIiwibGF5ZXJQcm9wcyIsInZpc0NvbmZpZyIsInJhZGl1c01heFBpeGVscyIsInVwZGF0ZVRyaWdnZXJzIiwiZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycyIsImdldFZpc3VhbENoYW5uZWxVcGRhdGVUcmlnZ2VycyIsImRlZmF1bHRMYXllclByb3BzIiwiZ2V0RGVmYXVsdERlY2tMYXllclByb3BzIiwiYnJ1c2hpbmdQcm9wcyIsImdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMiLCJnZXRQaXhlbE9mZnNldCIsImdldFJhZGl1cyIsImV4dGVuc2lvbnMiLCJzaGFyZWRQcm9wcyIsImZpbHRlclJhbmdlIiwibGFiZWxMYXllcnMiLCJyZW5kZXJUZXh0TGFiZWxMYXllciIsImhvdmVyZWRPYmplY3QiLCJoYXNIb3ZlcmVkT2JqZWN0IiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsIlN2Z0ljb25MYXllciIsImdldEljb25HZW9tZXRyeSIsImdldERlZmF1bHRIb3ZlckxheWVyUHJvcHMiLCJnZXRGaWxsQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsImZpZWxkUGFpcnMiLCJmaWVsZHMiLCJub3RGb3VuZCIsImljb25GaWVsZHMiLCJmaWx0ZXIiLCJuYW1lIiwicmVwbGFjZSIsInRyaW0iLCJzcGxpdCIsInNvbWUiLCJzZWciLCJJQ09OX0ZJRUxEUyIsInQiLCJpbmNsdWRlcyIsInB0UGFpciIsIm1hcCIsImljb25GaWVsZCIsImxhYmVsIiwicGFpciIsInZhbHVlIiwiaXNWaXNpYmxlIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsR0FBRyxJQUFJQyw2QkFBSixFQUExQjtBQUVPLElBQU1DLFlBQVksYUFBTUMsMkJBQU4sMEJBQWxCOzs7QUFFQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEsTUFBRUMsR0FBRixRQUFFQSxHQUFGO0FBQUEsTUFBT0MsR0FBUCxRQUFPQSxHQUFQO0FBQUEsTUFBWUMsUUFBWixRQUFZQSxRQUFaO0FBQUEsU0FBMEIsVUFBQUMsRUFBRTtBQUFBLFdBQUksVUFBQUMsQ0FBQztBQUFBLGFBQUksQ0FDbEVELEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JMLEdBQUcsQ0FBQ00sUUFBeEIsQ0FEa0UsRUFFbEVKLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXRCxDQUFDLENBQUNFLEtBQWIsRUFBb0JOLEdBQUcsQ0FBQ08sUUFBeEIsQ0FGa0UsRUFHbEUsQ0FBQUwsUUFBUSxTQUFSLElBQUFBLFFBQVEsV0FBUixZQUFBQSxRQUFRLENBQUVLLFFBQVYsSUFBcUIsQ0FBQyxDQUF0QixHQUEwQkosRUFBRSxDQUFDRSxPQUFILENBQVdELENBQUMsQ0FBQ0UsS0FBYixFQUFvQkosUUFBUSxDQUFDSyxRQUE3QixDQUExQixHQUFtRSxDQUhELENBQUo7QUFBQSxLQUFMO0FBQUEsR0FBNUI7QUFBQSxDQUF4Qjs7OztBQU1BLElBQU1DLFlBQVksR0FBRyxT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QUMsQ0FBRCxDQUF6QjtBQUVBLFVBQU05RixLQUFLLEdBQUdpRyxVQUFVLENBQUNZLEdBQVgsQ0FBZSxVQUFBQyxTQUFTO0FBQUEsZUFBSztBQUN6Q0MsVUFBQUEsS0FBSyxFQUFFRCxTQUFTLENBQUNYLElBQVYsQ0FBZUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxHQUFsQyxFQUF1Q0MsSUFBdkMsRUFEa0M7QUFFekNoRyxVQUFBQSxPQUFPLEVBQUU7QUFDUGxDLFlBQUFBLEdBQUcsRUFBRXlJLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZN0ksR0FEVjtBQUVQQyxZQUFBQSxHQUFHLEVBQUV3SSxNQUFNLENBQUNJLElBQVAsQ0FBWTVJLEdBRlY7QUFHUFEsWUFBQUEsSUFBSSxFQUFFO0FBQ0pxSSxjQUFBQSxLQUFLLEVBQUVILFNBQVMsQ0FBQ1gsSUFEYjtBQUVKekgsY0FBQUEsUUFBUSxFQUFFb0ksU0FBUyxDQUFDcEk7QUFGaEI7QUFIQyxXQUZnQztBQVV6Q3dJLFVBQUFBLFNBQVMsRUFBRTtBQVY4QixTQUFMO0FBQUEsT0FBeEIsQ0FBZDtBQWFBLGFBQU87QUFBQ2xILFFBQUFBLEtBQUssRUFBTEE7QUFBRCxPQUFQO0FBQ0Q7OztFQTNIb0NtSCxxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB3aW5kb3cgZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQge0JydXNoaW5nRXh0ZW5zaW9ufSBmcm9tICdAZGVjay5nbC9leHRlbnNpb25zJztcblxuaW1wb3J0IFN2Z0ljb25MYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL3N2Zy1pY29uLWxheWVyL3N2Zy1pY29uLWxheWVyJztcbmltcG9ydCBJY29uTGF5ZXJJY29uIGZyb20gJy4vaWNvbi1sYXllci1pY29uJztcbmltcG9ydCB7SUNPTl9GSUVMRFMsIENMT1VERlJPTlR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCBJY29uSW5mb01vZGFsRmFjdG9yeSBmcm9tICcuL2ljb24taW5mby1tb2RhbCc7XG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQge2dldFRleHRPZmZzZXRCeVJhZGl1cywgZm9ybWF0VGV4dExhYmVsRGF0YX0gZnJvbSAnLi4vbGF5ZXItdGV4dC1sYWJlbCc7XG5cbmNvbnN0IGJydXNoaW5nRXh0ZW5zaW9uID0gbmV3IEJydXNoaW5nRXh0ZW5zaW9uKCk7XG5cbmV4cG9ydCBjb25zdCBTVkdfSUNPTl9VUkwgPSBgJHtDTE9VREZST05UfS9pY29ucy9zdmctaWNvbnMuanNvbmA7XG5cbmV4cG9ydCBjb25zdCBpY29uUG9zQWNjZXNzb3IgPSAoe2xhdCwgbG5nLCBhbHRpdHVkZX0pID0+IGRjID0+IGQgPT4gW1xuICBkYy52YWx1ZUF0KGQuaW5kZXgsIGxuZy5maWVsZElkeCksXG4gIGRjLnZhbHVlQXQoZC5pbmRleCwgbGF0LmZpZWxkSWR4KSxcbiAgYWx0aXR1ZGU/LmZpZWxkSWR4ID4gLTEgPyBkYy52YWx1ZUF0KGQuaW5kZXgsIGFsdGl0dWRlLmZpZWxkSWR4KSA6IDBcbl07XG5cbmV4cG9ydCBjb25zdCBpY29uQWNjZXNzb3IgPSAoe2ljb259KSA9PiBkYyA9PiBkID0+IGRjLnZhbHVlQXQoZC5pbmRleCwgaWNvbi5maWVsZElkeCk7XG5cbmV4cG9ydCBjb25zdCBpY29uUmVxdWlyZWRDb2x1bW5zID0gWydsYXQnLCAnbG5nJywgJ2ljb24nXTtcbmV4cG9ydCBjb25zdCBpY29uT3B0aW9uYWxDb2x1bW5zID0gWydhbHRpdHVkZSddO1xuXG5leHBvcnQgY29uc3QgcG9pbnRWaXNDb25maWdzID0ge1xuICByYWRpdXM6ICdyYWRpdXMnLFxuICBmaXhlZFJhZGl1czogJ2ZpeGVkUmFkaXVzJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHJhZGl1c1JhbmdlOiAncmFkaXVzUmFuZ2UnXG59O1xuXG5mdW5jdGlvbiBmbGF0dGVySWNvblBvc2l0aW9ucyhpY29uKSB7XG4gIC8vIGhhZCB0byBmbGlwIHksIHNpbmNlIEBsdW1hIG1vZGFsIGhhcyBjaGFuZ2VkXG4gIHJldHVybiBpY29uLm1lc2guY2VsbHMucmVkdWNlKChwcmV2LCBjZWxsKSA9PiB7XG4gICAgY2VsbC5mb3JFYWNoKHAgPT4ge1xuICAgICAgcHJldi5wdXNoKFxuICAgICAgICAuLi5baWNvbi5tZXNoLnBvc2l0aW9uc1twXVswXSwgLWljb24ubWVzaC5wb3NpdGlvbnNbcF1bMV0sIGljb24ubWVzaC5wb3NpdGlvbnNbcF1bMl1dXG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiBwcmV2O1xuICB9LCBbXSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25MYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcocG9pbnRWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IgPSBkYXRhQ29udGFpbmVyID0+IGljb25Qb3NBY2Nlc3Nvcih0aGlzLmNvbmZpZy5jb2x1bW5zKShkYXRhQ29udGFpbmVyKTtcbiAgICB0aGlzLmdldEljb25BY2Nlc3NvciA9IGRhdGFDb250YWluZXIgPT4gaWNvbkFjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbnMpKGRhdGFDb250YWluZXIpO1xuXG4gICAgLy8gcHJlcGFyZSBsYXllciBpbmZvIG1vZGFsXG4gICAgdGhpcy5fbGF5ZXJJbmZvTW9kYWwgPSBJY29uSW5mb01vZGFsRmFjdG9yeSgpO1xuICAgIHRoaXMuaWNvbkdlb21ldHJ5ID0gcHJvcHMuaWNvbkdlb21ldHJ5IHx8IG51bGw7XG4gICAgdGhpcy5nZXRTdmdJY29ucygpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdpY29uJztcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gaWNvblJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBvcHRpb25hbENvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGljb25PcHRpb25hbENvbHVtbnM7XG4gIH1cblxuICBnZXQgY29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdFBvaW50Q29sdW1uUGFpcnM7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBJY29uTGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRGaWxsQ29sb3InLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcuY29sb3JcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLnNpemUsXG4gICAgICAgIHByb3BlcnR5OiAncmFkaXVzJyxcbiAgICAgICAgcmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnLFxuICAgICAgICBhY2Nlc3NvcjogJ2dldFJhZGl1cycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgbGF5ZXJJbmZvTW9kYWwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnaWNvbkluZm8nLFxuICAgICAgdGVtcGxhdGU6IHRoaXMuX2xheWVySW5mb01vZGFsLFxuICAgICAgbW9kYWxQcm9wczoge1xuICAgICAgICB0aXRsZTogJ21vZGFsLmljb25JbmZvLnRpdGxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXRTdmdJY29ucygpIHtcbiAgICBjb25zdCBmZXRjaENvbmZpZyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBjYWNoZTogJ25vLWNhY2hlJ1xuICAgIH07XG5cbiAgICBpZiAod2luZG93LmZldGNoKSB7XG4gICAgICB3aW5kb3dcbiAgICAgICAgLmZldGNoKFNWR19JQ09OX1VSTCwgZmV0Y2hDb25maWcpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHBhcnNlZCA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3Qge3N2Z0ljb25zID0gW119ID0gcGFyc2VkO1xuICAgICAgICAgIHRoaXMuaWNvbkdlb21ldHJ5ID0gc3ZnSWNvbnMucmVkdWNlKFxuICAgICAgICAgICAgKGFjY3UsIGN1cnIpID0+ICh7XG4gICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgIFtjdXJyLmlkXTogZmxhdHRlckljb25Qb3NpdGlvbnMoY3VycilcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5fbGF5ZXJJbmZvTW9kYWwgPSBJY29uSW5mb01vZGFsRmFjdG9yeShzdmdJY29ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkUGFpcnMgPSBbXSwgZmllbGRzID0gW119KSB7XG4gICAgY29uc3Qgbm90Rm91bmQgPSB7cHJvcHM6IFtdfTtcbiAgICBpZiAoIWZpZWxkUGFpcnMubGVuZ3RoIHx8ICFmaWVsZHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbm90Rm91bmQ7XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkZpZWxkcyA9IGZpZWxkcy5maWx0ZXIoKHtuYW1lfSkgPT5cbiAgICAgIG5hbWVcbiAgICAgICAgLnJlcGxhY2UoL1tfLC5dKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLnNvbWUoc2VnID0+IElDT05fRklFTERTLmljb24uc29tZSh0ID0+IHQuaW5jbHVkZXMoc2VnKSkpXG4gICAgKTtcblxuICAgIGlmICghaWNvbkZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBub3RGb3VuZDtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgaWNvbiBsYXllcnMgZm9yIGZpcnN0IHBvaW50IHBhaXJcbiAgICBjb25zdCBwdFBhaXIgPSBmaWVsZFBhaXJzWzBdO1xuXG4gICAgY29uc3QgcHJvcHMgPSBpY29uRmllbGRzLm1hcChpY29uRmllbGQgPT4gKHtcbiAgICAgIGxhYmVsOiBpY29uRmllbGQubmFtZS5yZXBsYWNlKC9bXywuXSsvZywgJyAnKS50cmltKCksXG4gICAgICBjb2x1bW5zOiB7XG4gICAgICAgIGxhdDogcHRQYWlyLnBhaXIubGF0LFxuICAgICAgICBsbmc6IHB0UGFpci5wYWlyLmxuZyxcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgIHZhbHVlOiBpY29uRmllbGQubmFtZSxcbiAgICAgICAgICBmaWVsZElkeDogaWNvbkZpZWxkLmZpZWxkSWR4XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc1Zpc2libGU6IHRydWVcbiAgICB9KSk7XG5cbiAgICByZXR1cm4ge3Byb3BzfTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoe2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXh9LCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGdldEljb24gPSB0aGlzLmdldEljb25BY2Nlc3NvcihkYXRhQ29udGFpbmVyKTtcbiAgICBjb25zdCBkYXRhID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICAgIGNvbnN0IHJvd0luZGV4ID0ge2luZGV4fTtcbiAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHJvd0luZGV4KTtcbiAgICAgIGNvbnN0IGljb24gPSBnZXRJY29uKHJvd0luZGV4KTtcblxuICAgICAgLy8gaWYgZG9lc24ndCBoYXZlIHBvaW50IGxhdCBvciBsbmcsIGRvIG5vdCBhZGQgdGhlIHBvaW50XG4gICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9IG51bGxcbiAgICAgIGlmIChwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSAmJiB0eXBlb2YgaWNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBpY29uXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGFzZXRzLCBvbGRMYXllckRhdGEpIHtcbiAgICBjb25zdCB7dGV4dExhYmVsfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHtncHVGaWx0ZXIsIGRhdGFDb250YWluZXJ9ID0gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXTtcblxuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuXG4gICAgY29uc3Qge2RhdGEsIHRyaWdnZXJDaGFuZ2VkfSA9IHRoaXMudXBkYXRlRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKTtcblxuICAgIC8vIGdldCBhbGwgZGlzdGluY3QgY2hhcmFjdGVycyBpbiB0aGUgdGV4dCBsYWJlbHNcbiAgICBjb25zdCB0ZXh0TGFiZWxzID0gZm9ybWF0VGV4dExhYmVsRGF0YSh7XG4gICAgICB0ZXh0TGFiZWwsXG4gICAgICB0cmlnZ2VyQ2hhbmdlZCxcbiAgICAgIG9sZExheWVyRGF0YSxcbiAgICAgIGRhdGEsXG4gICAgICBkYXRhQ29udGFpbmVyXG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSB0aGlzLmdldEF0dHJpYnV0ZUFjY2Vzc29ycyh7ZGF0YUNvbnRhaW5lcn0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIGdldEZpbHRlclZhbHVlOiBncHVGaWx0ZXIuZmlsdGVyVmFsdWVBY2Nlc3NvcihkYXRhQ29udGFpbmVyKSgpLFxuICAgICAgdGV4dExhYmVscyxcbiAgICAgIC4uLmFjY2Vzc29yc1xuICAgIH07XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoZGF0YUNvbnRhaW5lciwgZ2V0UG9zaXRpb24pIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhkYXRhQ29udGFpbmVyLCBnZXRQb3NpdGlvbik7XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKG9wdHMpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ3B1RmlsdGVyLCBvYmplY3RIb3ZlcmVkLCBtYXBTdGF0ZSwgaW50ZXJhY3Rpb25Db25maWd9ID0gb3B0cztcblxuICAgIGNvbnN0IHJhZGl1c1NjYWxlID0gdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSk7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICAuLi4odGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzID8ge30gOiB7cmFkaXVzTWF4UGl4ZWxzOiA1MDB9KVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVUcmlnZ2VycyA9IHtcbiAgICAgIGdldFBvc2l0aW9uOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgZ2V0RmlsdGVyVmFsdWU6IGdwdUZpbHRlci5maWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzLFxuICAgICAgLi4udGhpcy5nZXRWaXN1YWxDaGFubmVsVXBkYXRlVHJpZ2dlcnMoKVxuICAgIH07XG5cbiAgICBjb25zdCBkZWZhdWx0TGF5ZXJQcm9wcyA9IHRoaXMuZ2V0RGVmYXVsdERlY2tMYXllclByb3BzKG9wdHMpO1xuICAgIGNvbnN0IGJydXNoaW5nUHJvcHMgPSB0aGlzLmdldEJydXNoaW5nRXh0ZW5zaW9uUHJvcHMoaW50ZXJhY3Rpb25Db25maWcpO1xuICAgIGNvbnN0IGdldFBpeGVsT2Zmc2V0ID0gZ2V0VGV4dE9mZnNldEJ5UmFkaXVzKHJhZGl1c1NjYWxlLCBkYXRhLmdldFJhZGl1cywgbWFwU3RhdGUpO1xuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBbLi4uZGVmYXVsdExheWVyUHJvcHMuZXh0ZW5zaW9ucywgYnJ1c2hpbmdFeHRlbnNpb25dO1xuXG4gICAgLy8gc2hhcmVkIFByb3BzIGJldHdlZW4gbGF5ZXIgYW5kIGxhYmVsIGxheWVyXG4gICAgY29uc3Qgc2hhcmVkUHJvcHMgPSB7XG4gICAgICBnZXRGaWx0ZXJWYWx1ZTogZGF0YS5nZXRGaWx0ZXJWYWx1ZSxcbiAgICAgIGV4dGVuc2lvbnMsXG4gICAgICBmaWx0ZXJSYW5nZTogZGVmYXVsdExheWVyUHJvcHMuZmlsdGVyUmFuZ2UsXG4gICAgICAuLi5icnVzaGluZ1Byb3BzXG4gICAgfTtcblxuICAgIGNvbnN0IGxhYmVsTGF5ZXJzID0gW1xuICAgICAgLi4udGhpcy5yZW5kZXJUZXh0TGFiZWxMYXllcihcbiAgICAgICAge1xuICAgICAgICAgIGdldFBvc2l0aW9uOiBkYXRhLmdldFBvc2l0aW9uLFxuICAgICAgICAgIHNoYXJlZFByb3BzLFxuICAgICAgICAgIGdldFBpeGVsT2Zmc2V0LFxuICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzXG4gICAgICAgIH0sXG4gICAgICAgIG9wdHNcbiAgICAgIClcbiAgICBdO1xuICAgIGNvbnN0IGhvdmVyZWRPYmplY3QgPSB0aGlzLmhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SG92ZXJlZCk7XG5cbiAgICBjb25zdCBwYXJhbWV0ZXJzID0ge1xuICAgICAgLy8gaWNvbnMgd2lsbCBiZSBmbGF0IG9uIHRoZSBtYXAgd2hlbiB0aGUgYWx0aXR1ZGUgY29sdW1uIGlzIG5vdCB1c2VkXG4gICAgICBkZXB0aFRlc3Q6IHRoaXMuY29uZmlnLmNvbHVtbnMuYWx0aXR1ZGU/LmZpZWxkSWR4ID4gLTFcbiAgICB9O1xuXG4gICAgcmV0dXJuICF0aGlzLmljb25HZW9tZXRyeVxuICAgICAgPyBbXVxuICAgICAgOiBbXG4gICAgICAgICAgbmV3IFN2Z0ljb25MYXllcih7XG4gICAgICAgICAgICAuLi5kZWZhdWx0TGF5ZXJQcm9wcyxcbiAgICAgICAgICAgIC4uLmJydXNoaW5nUHJvcHMsXG4gICAgICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICBnZXRJY29uR2VvbWV0cnk6IGlkID0+IHRoaXMuaWNvbkdlb21ldHJ5W2lkXSxcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRyaWdnZXJzXG4gICAgICAgICAgICB1cGRhdGVUcmlnZ2VycyxcbiAgICAgICAgICAgIGV4dGVuc2lvbnNcbiAgICAgICAgICB9KSxcblxuICAgICAgICAgIC4uLihob3ZlcmVkT2JqZWN0XG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBuZXcgU3ZnSWNvbkxheWVyKHtcbiAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RGVmYXVsdEhvdmVyTGF5ZXJQcm9wcygpLFxuICAgICAgICAgICAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IFtob3ZlcmVkT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICBnZXRQb3NpdGlvbjogZGF0YS5nZXRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgIGdldFJhZGl1czogZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICAgICAgICBnZXRGaWxsQ29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgICAgICAgZ2V0SWNvbkdlb21ldHJ5OiBpZCA9PiB0aGlzLmljb25HZW9tZXRyeVtpZF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IFtdKSxcblxuICAgICAgICAgIC8vIHRleHQgbGFiZWwgbGF5ZXJcbiAgICAgICAgICAuLi5sYWJlbExheWVyc1xuICAgICAgICBdO1xuICB9XG59XG4iXX0=