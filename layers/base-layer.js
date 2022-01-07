"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.colorMaker = exports.layerColors = exports.OVERLAY_TYPE = exports.LAYER_ID_LENGTH = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _window = require("global/window");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _extensions = require("@deck.gl/extensions");

var _core = require("@deck.gl/core");

var _layers = require("@deck.gl/layers");

var _defaultLayerIcon = _interopRequireDefault(require("./default-layer-icon"));

var _layerUpdate = require("./layer-update");

var _defaultSettings = require("../constants/default-settings");

var _colorRanges = require("../constants/color-ranges");

var _customColorRanges = require("../constants/custom-color-ranges");

var _layerFactory = require("./layer-factory");

var _utils = require("../utils/utils");

var _dataUtils = require("../utils/data-utils");

var _dataContainerUtils = require("../utils/table-utils/data-container-utils");

var _colorUtils = require("../utils/color-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(generateColor);

/** @typedef {import('./index').Layer} LayerClass} */

/**
 * Approx. number of points to sample in a large data set
 * @type {number}
 */
var LAYER_ID_LENGTH = 6;
exports.LAYER_ID_LENGTH = LAYER_ID_LENGTH;
var MAX_SAMPLE_SIZE = 5000;
var defaultDomain = [0, 1];
var dataFilterExtension = new _extensions.DataFilterExtension({
  filterSize: _defaultSettings.MAX_GPU_FILTERS
});

var defaultDataAccessor = function defaultDataAccessor(dc) {
  return function (d) {
    return d;
  };
};

var defaultGetFieldValue = function defaultGetFieldValue(field, d) {
  return field.valueAccessor(d);
};

var OVERLAY_TYPE = (0, _keymirror["default"])({
  deckgl: null,
  mapboxgl: null
});
exports.OVERLAY_TYPE = OVERLAY_TYPE;
var layerColors = Object.values(_customColorRanges.DataVizColors).map(_colorUtils.hexToRgb);
exports.layerColors = layerColors;

function generateColor() {
  var index;
  return _regenerator["default"].wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < layerColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === layerColors.length) {
            index = 0;
          }

          _context.next = 5;
          return layerColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var colorMaker = generateColor();
/** @type {LayerClass} */

exports.colorMaker = colorMaker;

var Layer = /*#__PURE__*/function () {
  function Layer() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Layer);
    this.id = props.id || (0, _utils.generateHashId)(LAYER_ID_LENGTH); // meta

    this.meta = {}; // visConfigSettings

    this.visConfigSettings = {}; // @ts-ignore

    this.config = this.getDefaultLayerConfig(_objectSpread({
      columns: this.getLayerColumns()
    }, props));
  }

  (0, _createClass2["default"])(Layer, [{
    key: "layerIcon",
    get: function get() {
      return _defaultLayerIcon["default"];
    }
  }, {
    key: "overlayType",
    get: function get() {
      return OVERLAY_TYPE.deckgl;
    }
  }, {
    key: "type",
    get: function get() {
      return null;
    }
  }, {
    key: "name",
    get: function get() {
      return this.type;
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible', 'hidden'];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          property: 'color',
          field: 'colorField',
          scale: 'colorScale',
          domain: 'colorDomain',
          range: 'colorRange',
          key: 'color',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          nullValue: _defaultSettings.NO_VALUE_COLOR,
          defaultValue: function defaultValue(config) {
            return config.color;
          }
        },
        size: {
          property: 'size',
          field: 'sizeField',
          scale: 'sizeScale',
          domain: 'sizeDomain',
          range: 'sizeRange',
          key: 'size',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size,
          nullValue: 0,
          defaultValue: 1
        }
      };
    }
    /*
     * Column pairs maps layer column to a specific field pairs,
     * By default, it is set to null
     */

  }, {
    key: "columnPairs",
    get: function get() {
      return null;
    }
    /*
     * Default point column pairs, can be used for point based layers: point, icon etc.
     */

  }, {
    key: "defaultPointColumnPairs",
    get: function get() {
      return {
        lat: {
          pair: 'lng',
          fieldPairKey: 'lat'
        },
        lng: {
          pair: 'lat',
          fieldPairKey: 'lng'
        }
      };
    }
    /*
     * Default link column pairs, can be used for link based layers: arc, line etc
     */

  }, {
    key: "defaultLinkColumnPairs",
    get: function get() {
      return {
        lat0: {
          pair: 'lng0',
          fieldPairKey: 'lat'
        },
        lng0: {
          pair: 'lat0',
          fieldPairKey: 'lng'
        },
        lat1: {
          pair: 'lng1',
          fieldPairKey: 'lat'
        },
        lng1: {
          pair: 'lat1',
          fieldPairKey: 'lng'
        }
      };
    }
    /**
     * Return a React component for to render layer instructions in a modal
     * @returns {object} - an object
     * @example
     *  return {
     *    id: 'iconInfo',
     *    template: IconInfoModal,
     *    modalProps: {
     *      title: 'How to draw icons'
     *   };
     * }
     */

  }, {
    key: "layerInfoModal",
    get: function get() {
      return null;
    }
    /*
     * Given a dataset, automatically find props to create layer based on it
     * and return the props and previous found layers.
     * By default, no layers will be found
     */

  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        dataId: props.dataId || null,
        label: props.label || _layerFactory.DEFAULT_LAYER_LABEL,
        color: props.color || colorMaker.next().value,
        columns: props.columns || null,
        isVisible: props.isVisible || false,
        isConfigActive: props.isConfigActive || false,
        highlightColor: props.highlightColor || _layerFactory.DEFAULT_HIGHLIGHT_COLOR,
        hidden: props.hidden || false,
        // TODO: refactor this into separate visual Channel config
        // color by field, domain is set by filters, field, scale type
        colorField: null,
        colorDomain: [0, 1],
        colorScale: _defaultSettings.SCALE_TYPES.quantile,
        // color by size, domain is set by filters, field, scale type
        sizeDomain: [0, 1],
        sizeScale: _defaultSettings.SCALE_TYPES.linear,
        sizeField: null,
        visConfig: {},
        textLabel: [_layerFactory.DEFAULT_TEXT_LABEL],
        colorUI: {
          color: _layerFactory.DEFAULT_COLOR_UI,
          colorRange: _layerFactory.DEFAULT_COLOR_UI
        },
        animation: {
          enabled: false
        }
      };
    }
    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Vehicle Type
      return {
        label: this.visConfigSettings[this.visualChannels[key].range].label,
        measure: this.config[this.visualChannels[key].field] ? this.config[this.visualChannels[key].field].displayName || this.config[this.visualChannels[key].field].name : this.visualChannels[key].defaultMeasure
      };
    }
    /**
     * Assign a field to layer column, return column config
     * @param key - Column Key
     * @param field - Selected field
     * @returns {{}} - Column config
     */

  }, {
    key: "assignColumn",
    value: function assignColumn(key, field) {
      // field value could be null for optional columns
      var update = field ? {
        value: field.name,
        fieldIdx: field.fieldIdx
      } : {
        value: null,
        fieldIdx: -1
      };
      return _objectSpread(_objectSpread({}, this.config.columns), {}, (0, _defineProperty2["default"])({}, key, _objectSpread(_objectSpread({}, this.config.columns[key]), update)));
    }
    /**
     * Assign a field pair to column config, return column config
     * @param key - Column Key
     * @param pair - field Pair
     * @returns {object} - Column config
     */

  }, {
    key: "assignColumnPairs",
    value: function assignColumnPairs(key, pair) {
      var _this$columnPairs, _this$columnPairs2, _this$columnPairs3, _objectSpread3;

      if (!this.columnPairs || !((_this$columnPairs = this.columnPairs) !== null && _this$columnPairs !== void 0 && _this$columnPairs[key])) {
        // should not end in this state
        return this.config.columns;
      }

      var _this$columnPairs$key = (_this$columnPairs2 = this.columnPairs) === null || _this$columnPairs2 === void 0 ? void 0 : _this$columnPairs2[key],
          partnerKey = _this$columnPairs$key.pair,
          fieldPairKey = _this$columnPairs$key.fieldPairKey;

      var _this$columnPairs$par = (_this$columnPairs3 = this.columnPairs) === null || _this$columnPairs3 === void 0 ? void 0 : _this$columnPairs3[partnerKey],
          partnerFieldPairKey = _this$columnPairs$par.fieldPairKey;

      return _objectSpread(_objectSpread({}, this.config.columns), {}, (_objectSpread3 = {}, (0, _defineProperty2["default"])(_objectSpread3, key, pair[fieldPairKey]), (0, _defineProperty2["default"])(_objectSpread3, partnerKey, pair[partnerFieldPairKey]), _objectSpread3));
    }
    /**
     * Calculate a radius zoom multiplier to render points, so they are visible in all zoom level
     * @param {object} mapState
     * @param {number} mapState.zoom - actual zoom
     * @param {number | void} mapState.zoomOffset - zoomOffset when render in the plot container for export image
     * @returns {number}
     */

  }, {
    key: "getZoomFactor",
    value: function getZoomFactor(_ref) {
      var zoom = _ref.zoom,
          _ref$zoomOffset = _ref.zoomOffset,
          zoomOffset = _ref$zoomOffset === void 0 ? 0 : _ref$zoomOffset;
      return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }
    /**
     * Calculate a elevation zoom multiplier to render points, so they are visible in all zoom level
     * @param {object} mapState
     * @param {number} mapState.zoom - actual zoom
     * @param {number | void} mapState.zoomOffset - zoomOffset when render in the plot container for export image
     * @returns {number}
     */

  }, {
    key: "getElevationZoomFactor",
    value: function getElevationZoomFactor(_ref2) {
      var zoom = _ref2.zoom,
          _ref2$zoomOffset = _ref2.zoomOffset,
          zoomOffset = _ref2$zoomOffset === void 0 ? 0 : _ref2$zoomOffset;
      return this.config.visConfig.enableElevationZoomFactor ? Math.pow(2, Math.max(8 - zoom + zoomOffset, 0)) : 1;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(datasets, filteredIndex) {
      return {};
    }
  }, {
    key: "renderLayer",
    value: function renderLayer() {
      return [];
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, dataContainer) {
      if (!object) {
        return null;
      } // By default, each entry of layerData should have an index of a row in the original data container.
      // Each layer can implement its own getHoverData method


      return dataContainer.row(object.index);
    }
    /**
     * When change layer type, try to copy over layer configs as much as possible
     * @param configToCopy - config to copy over
     * @param visConfigSettings - visConfig settings of config to copy
     */

  }, {
    key: "assignConfigToLayer",
    value: function assignConfigToLayer(configToCopy, visConfigSettings) {
      var _this = this;

      // don't deep merge visualChannel field
      // don't deep merge color range, reversed: is not a key by default
      var shallowCopy = ['colorRange', 'strokeColorRange'].concat(Object.values(this.visualChannels).map(function (v) {
        return v.field;
      })); // don't copy over domain and animation

      var notToCopy = ['animation'].concat(Object.values(this.visualChannels).map(function (v) {
        return v.domain;
      })); // if range is for the same property group copy it, otherwise, not to copy

      Object.values(this.visualChannels).forEach(function (v) {
        if (configToCopy.visConfig[v.range] && _this.visConfigSettings[v.range] && visConfigSettings[v.range].group !== _this.visConfigSettings[v.range].group) {
          notToCopy.push(v.range);
        }
      }); // don't copy over visualChannel range

      var currentConfig = this.config;
      var copied = this.copyLayerConfig(currentConfig, configToCopy, {
        shallowCopy: shallowCopy,
        notToCopy: notToCopy
      });
      this.updateLayerConfig(copied); // validate visualChannel field type and scale types

      Object.keys(this.visualChannels).forEach(function (channel) {
        _this.validateVisualChannel(channel);
      });
    }
    /*
     * Recursively copy config over to an empty layer
     * when received saved config, or copy config over from a different layer type
     * make sure to only copy over value to existing keys
     * @param {object} currentConfig - existing config to be override
     * @param {object} configToCopy - new Config to copy over
     * @param {string[]} shallowCopy - array of properties to not to be deep copied
     * @param {string[]} notToCopy - array of properties not to copy
     * @returns {object} - copied config
     */

  }, {
    key: "copyLayerConfig",
    value: function copyLayerConfig(currentConfig, configToCopy) {
      var _this2 = this;

      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$shallowCopy = _ref3.shallowCopy,
          shallowCopy = _ref3$shallowCopy === void 0 ? [] : _ref3$shallowCopy,
          _ref3$notToCopy = _ref3.notToCopy,
          notToCopy = _ref3$notToCopy === void 0 ? [] : _ref3$notToCopy;

      var copied = {};
      Object.keys(currentConfig).forEach(function (key) {
        if ((0, _utils.isPlainObject)(currentConfig[key]) && (0, _utils.isPlainObject)(configToCopy[key]) && !shallowCopy.includes(key) && !notToCopy.includes(key)) {
          // recursively assign object value
          copied[key] = _this2.copyLayerConfig(currentConfig[key], configToCopy[key], {
            shallowCopy: shallowCopy,
            notToCopy: notToCopy
          });
        } else if ((0, _dataUtils.notNullorUndefined)(configToCopy[key]) && !notToCopy.includes(key)) {
          // copy
          copied[key] = configToCopy[key];
        } else {
          // keep existing
          copied[key] = currentConfig[key];
        }
      });
      return copied;
    }
  }, {
    key: "registerVisConfig",
    value: function registerVisConfig(layerVisConfigs) {
      var _this3 = this;

      Object.keys(layerVisConfigs).forEach(function (item) {
        if (typeof item === 'string' && _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]]) {
          // if assigned one of default LAYER_CONFIGS
          _this3.config.visConfig[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]].defaultValue;
          _this3.visConfigSettings[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]];
        } else if (['type', 'defaultValue'].every(function (p) {
          return layerVisConfigs[item].hasOwnProperty(p);
        })) {
          // if provided customized visConfig, and has type && defaultValue
          // TODO: further check if customized visConfig is valid
          _this3.config.visConfig[item] = layerVisConfigs[item].defaultValue;
          _this3.visConfigSettings[item] = layerVisConfigs[item];
        }
      });
    }
  }, {
    key: "getLayerColumns",
    value: function getLayerColumns() {
      var columnValidators = this.columnValidators || {};
      var required = this.requiredLayerColumns.reduce(function (accu, key) {
        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, columnValidators[key] ? {
          value: null,
          fieldIdx: -1,
          validator: columnValidators[key]
        } : {
          value: null,
          fieldIdx: -1
        }));
      }, {});
      var optional = this.optionalColumns.reduce(function (accu, key) {
        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, {
          value: null,
          fieldIdx: -1,
          optional: true
        }));
      }, {});
      return _objectSpread(_objectSpread({}, required), optional);
    }
  }, {
    key: "updateLayerConfig",
    value: function updateLayerConfig(newConfig) {
      this.config = _objectSpread(_objectSpread({}, this.config), newConfig);
      return this;
    }
  }, {
    key: "updateLayerVisConfig",
    value: function updateLayerVisConfig(newVisConfig) {
      this.config.visConfig = _objectSpread(_objectSpread({}, this.config.visConfig), newVisConfig);
      return this;
    }
  }, {
    key: "updateLayerColorUI",
    value: function updateLayerColorUI(prop, newConfig) {
      var _this$config = this.config,
          previous = _this$config.colorUI,
          visConfig = _this$config.visConfig;

      if (!(0, _utils.isPlainObject)(newConfig) || typeof prop !== 'string') {
        return this;
      }

      var colorUIProp = Object.entries(newConfig).reduce(function (accu, _ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
            key = _ref5[0],
            value = _ref5[1];

        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, (0, _utils.isPlainObject)(accu[key]) && (0, _utils.isPlainObject)(value) ? _objectSpread(_objectSpread({}, accu[key]), value) : value));
      }, previous[prop] || _layerFactory.DEFAULT_COLOR_UI);

      var colorUI = _objectSpread(_objectSpread({}, previous), {}, (0, _defineProperty2["default"])({}, prop, colorUIProp));

      this.updateLayerConfig({
        colorUI: colorUI
      }); // if colorUI[prop] is colorRange

      var isColorRange = visConfig[prop] && visConfig[prop].colors;

      if (isColorRange) {
        this.updateColorUIByColorRange(newConfig, prop);
        this.updateColorRangeByColorUI(newConfig, previous, prop);
        this.updateCustomPalette(newConfig, previous, prop);
      }

      return this;
    }
  }, {
    key: "updateCustomPalette",
    value: function updateCustomPalette(newConfig, previous, prop) {
      if (!newConfig.colorRangeConfig || !newConfig.colorRangeConfig.custom) {
        return;
      }

      var _this$config2 = this.config,
          colorUI = _this$config2.colorUI,
          visConfig = _this$config2.visConfig;
      if (!visConfig[prop]) return;
      var colors = visConfig[prop].colors;

      var customPalette = _objectSpread(_objectSpread({}, colorUI[prop].customPalette), {}, {
        name: 'Custom Palette',
        colors: (0, _toConsumableArray2["default"])(colors)
      });

      this.updateLayerConfig({
        colorUI: _objectSpread(_objectSpread({}, colorUI), {}, (0, _defineProperty2["default"])({}, prop, _objectSpread(_objectSpread({}, colorUI[prop]), {}, {
          customPalette: customPalette
        })))
      });
    }
    /**
     * if open dropdown and prop is color range
     * Automatically set colorRangeConfig's step and reversed
     * @param {*} newConfig
     * @param {*} prop
     */

  }, {
    key: "updateColorUIByColorRange",
    value: function updateColorUIByColorRange(newConfig, prop) {
      if (typeof newConfig.showDropdown !== 'number') return;
      var _this$config3 = this.config,
          colorUI = _this$config3.colorUI,
          visConfig = _this$config3.visConfig;
      this.updateLayerConfig({
        colorUI: _objectSpread(_objectSpread({}, colorUI), {}, (0, _defineProperty2["default"])({}, prop, _objectSpread(_objectSpread({}, colorUI[prop]), {}, {
          colorRangeConfig: _objectSpread(_objectSpread({}, colorUI[prop].colorRangeConfig), {}, {
            steps: visConfig[prop].colors.length,
            reversed: Boolean(visConfig[prop].reversed)
          })
        })))
      });
    }
  }, {
    key: "updateColorRangeByColorUI",
    value: function updateColorRangeByColorUI(newConfig, previous, prop) {
      // only update colorRange if changes in UI is made to 'reversed', 'steps' or steps
      var shouldUpdate = newConfig.colorRangeConfig && ['reversed', 'steps'].some(function (key) {
        return newConfig.colorRangeConfig.hasOwnProperty(key) && newConfig.colorRangeConfig[key] !== (previous[prop] || _layerFactory.DEFAULT_COLOR_UI).colorRangeConfig[key];
      });
      if (!shouldUpdate) return;
      var _this$config4 = this.config,
          colorUI = _this$config4.colorUI,
          visConfig = _this$config4.visConfig;
      var _colorUI$prop$colorRa = colorUI[prop].colorRangeConfig,
          steps = _colorUI$prop$colorRa.steps,
          reversed = _colorUI$prop$colorRa.reversed;
      var colorRange = visConfig[prop]; // find based on step or reversed

      var update;

      if (newConfig.colorRangeConfig.hasOwnProperty('steps')) {
        var group = (0, _colorUtils.getColorGroupByName)(colorRange);

        if (group) {
          var sameGroup = _colorRanges.COLOR_RANGES.filter(function (cr) {
            return (0, _colorUtils.getColorGroupByName)(cr) === group;
          });

          update = sameGroup.find(function (cr) {
            return cr.colors.length === steps;
          });

          if (update && colorRange.reversed) {
            update = (0, _colorUtils.reverseColorRange)(true, update);
          }
        }
      }

      if (newConfig.colorRangeConfig.hasOwnProperty('reversed')) {
        update = (0, _colorUtils.reverseColorRange)(reversed, update || colorRange);
      }

      if (update) {
        this.updateLayerVisConfig((0, _defineProperty2["default"])({}, prop, update));
      }
    }
    /**
     * Check whether layer has all columns
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasAllColumns",
    value: function hasAllColumns() {
      var columns = this.config.columns;
      return columns && Object.values(columns).every(function (v) {
        return Boolean(v.optional || v.value && v.fieldIdx > -1);
      });
    }
    /**
     * Check whether layer has data
     *
     * @param {Array | Object} layerData
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasLayerData",
    value: function hasLayerData(layerData) {
      if (!layerData) {
        return false;
      }

      return Boolean(layerData.data && layerData.data.length);
    }
  }, {
    key: "isValidToSave",
    value: function isValidToSave() {
      return this.type && this.hasAllColumns();
    }
  }, {
    key: "shouldRenderLayer",
    value: function shouldRenderLayer(data) {
      return this.type && this.config.isVisible && this.hasAllColumns() && this.hasLayerData(data) && typeof this.renderLayer === 'function';
    }
  }, {
    key: "getColorScale",
    value: function getColorScale(colorScale, colorDomain, colorRange) {
      if (Array.isArray(colorRange.colorMap)) {
        var cMap = new Map();
        colorRange.colorMap.forEach(function (_ref6) {
          var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
              k = _ref7[0],
              v = _ref7[1];

          cMap.set(k, typeof v === 'string' ? (0, _colorUtils.hexToRgb)(v) : v);
        });

        var scale = _defaultSettings.SCALE_FUNC[_defaultSettings.SCALE_TYPES.ordinal]().domain(cMap.keys()).range(cMap.values()).unknown(cMap.get(_layerFactory.UNKNOWN_COLOR_KEY) || _defaultSettings.NO_VALUE_COLOR);

        return scale;
      }

      return this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));
    }
    /**
     * Mapping from visual channels to deck.gl accesors
     * @param {Object} param Parameters
     * @param {Function} param.dataAccessor Access kepler.gl layer data from deck.gl layer
     * @param {import('utils/table-utils/data-container-interface').DataContainerInterface} param.dataContainer DataContainer to use use with dataAccessor
     * @return {Object} attributeAccessors - deck.gl layer attribute accessors
     */

  }, {
    key: "getAttributeAccessors",
    value: function getAttributeAccessors(_ref8) {
      var _this4 = this;

      var _ref8$dataAccessor = _ref8.dataAccessor,
          dataAccessor = _ref8$dataAccessor === void 0 ? defaultDataAccessor : _ref8$dataAccessor,
          dataContainer = _ref8.dataContainer;
      var attributeAccessors = {};
      Object.keys(this.visualChannels).forEach(function (channel) {
        var _this4$visualChannels = _this4.visualChannels[channel],
            field = _this4$visualChannels.field,
            fixed = _this4$visualChannels.fixed,
            scale = _this4$visualChannels.scale,
            domain = _this4$visualChannels.domain,
            range = _this4$visualChannels.range,
            accessor = _this4$visualChannels.accessor,
            defaultValue = _this4$visualChannels.defaultValue,
            getAttributeValue = _this4$visualChannels.getAttributeValue,
            nullValue = _this4$visualChannels.nullValue,
            channelScaleType = _this4$visualChannels.channelScaleType;
        var shouldGetScale = _this4.config[field];

        if (shouldGetScale) {
          var args = [_this4.config[scale], _this4.config[domain], _this4.config.visConfig[range]];
          var isFixed = fixed && _this4.config.visConfig[fixed];
          var scaleFunction = channelScaleType === _defaultSettings.CHANNEL_SCALES.color ? _this4.getColorScale.apply(_this4, args) : _this4.getVisChannelScale.apply(_this4, args.concat([isFixed]));

          attributeAccessors[accessor] = function (d) {
            return _this4.getEncodedChannelValue(scaleFunction, dataAccessor(dataContainer)(d), _this4.config[field], nullValue);
          };
        } else if (typeof getAttributeValue === 'function') {
          attributeAccessors[accessor] = getAttributeValue(_this4.config);
        } else {
          attributeAccessors[accessor] = typeof defaultValue === 'function' ? defaultValue(_this4.config) : defaultValue;
        }

        if (!attributeAccessors[accessor]) {
          _window.console.warn("Failed to provide accessor function for ".concat(accessor || channel));
        }
      });
      return attributeAccessors;
    }
  }, {
    key: "getVisChannelScale",
    value: function getVisChannelScale(scale, domain, range, fixed) {
      return _defaultSettings.SCALE_FUNC[fixed ? 'linear' : scale]().domain(domain).range(fixed ? domain : range);
    }
    /**
     * Get longitude and latitude bounds of the data.
     * @param {import('utils/table-utils/data-container-interface').DataContainerInterface} dataContainer DataContainer to calculate bounds for.
     * @param {(d: {index: number}, dc: import('utils/table-utils/data-container-interface').DataContainerInterface) => number[]} getPosition Access kepler.gl layer data from deck.gl layer
     * @return {number[]|null} bounds of the data.
     */

  }, {
    key: "getPointsBounds",
    value: function getPointsBounds(dataContainer, getPosition) {
      // no need to loop through the entire dataset
      // get a sample of data to calculate bounds
      var sampleData = dataContainer.numRows() > MAX_SAMPLE_SIZE ? (0, _dataContainerUtils.getSampleData)(dataContainer, MAX_SAMPLE_SIZE) : dataContainer;
      var points = sampleData.mapIndex(getPosition);
      var latBounds = (0, _dataUtils.getLatLngBounds)(points, 1, [-90, 90]);
      var lngBounds = (0, _dataUtils.getLatLngBounds)(points, 0, [-180, 180]);

      if (!latBounds || !lngBounds) {
        return null;
      }

      return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
    }
  }, {
    key: "getChangedTriggers",
    value: function getChangedTriggers(dataUpdateTriggers) {
      var triggerChanged = (0, _layerUpdate.diffUpdateTriggers)(dataUpdateTriggers, this._oldDataUpdateTriggers);
      this._oldDataUpdateTriggers = dataUpdateTriggers;
      return triggerChanged;
    }
  }, {
    key: "getEncodedChannelValue",
    value: function getEncodedChannelValue(scale, data, field) {
      var nullValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultSettings.NO_VALUE_COLOR;
      var getValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultGetFieldValue;
      var type = field.type;
      var value = getValue(field, data);

      if (!(0, _dataUtils.notNullorUndefined)(value)) {
        return nullValue;
      }

      var attributeValue;

      if (type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
        // shouldn't need to convert here
        // scale Function should take care of it
        attributeValue = scale(new Date(value));
      } else {
        attributeValue = scale(value);
      }

      if (!(0, _dataUtils.notNullorUndefined)(attributeValue)) {
        attributeValue = nullValue;
      }

      return attributeValue;
    }
  }, {
    key: "updateMeta",
    value: function updateMeta(meta) {
      this.meta = _objectSpread(_objectSpread({}, this.meta), meta);
    }
  }, {
    key: "getDataUpdateTriggers",
    value: function getDataUpdateTriggers(_ref9) {
      var filteredIndex = _ref9.filteredIndex,
          id = _ref9.id,
          allData = _ref9.allData;
      var columns = this.config.columns;
      return _objectSpread({
        getData: {
          datasetId: id,
          allData: allData,
          columns: columns,
          filteredIndex: filteredIndex
        },
        getMeta: {
          datasetId: id,
          allData: allData,
          columns: columns
        }
      }, (this.config.textLabel || []).reduce(function (accu, tl, i) {
        return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, "getLabelCharacterSet-".concat(i), tl.field ? tl.field.name : null));
      }, {}));
    }
  }, {
    key: "updateData",
    value: function updateData(datasets, oldLayerData) {
      console.log('update data');

      if (!this.config.dataId) {
        return {};
      }

      var layerDataset = datasets[this.config.dataId];
      var dataContainer = layerDataset.dataContainer;
      var getPosition = this.getPositionAccessor(dataContainer);
      var dataUpdateTriggers = this.getDataUpdateTriggers(layerDataset);
      var triggerChanged = this.getChangedTriggers(dataUpdateTriggers);

      if (triggerChanged.getMeta) {
        this.updateLayerMeta(dataContainer, getPosition);
      }

      var data = [];

      if (!triggerChanged.getData && oldLayerData && oldLayerData.data) {
        // same data
        data = oldLayerData.data;
      } else {
        data = this.calculateDataAttribute(layerDataset, getPosition);
      }

      return {
        data: data,
        triggerChanged: triggerChanged
      };
    }
    /**
     * helper function to update one layer domain when state.data changed
     * if state.data change is due ot update filter, newFiler will be passed
     * called by updateAllLayerDomainData
     * @param {Object} datasets
     * @param {Object} newFilter
     * @returns {object} layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(datasets, newFilter) {
      var _this5 = this;

      var table = this.getDataset(datasets);

      if (!table) {
        return this;
      }

      Object.values(this.visualChannels).forEach(function (channel) {
        var scale = channel.scale;
        var scaleType = _this5.config[scale]; // ordinal domain is based on dataContainer, if only filter changed
        // no need to update ordinal domain

        if (!newFilter || scaleType !== _defaultSettings.SCALE_TYPES.ordinal) {
          var domain = channel.domain;

          var updatedDomain = _this5.calculateLayerDomain(table, channel);

          _this5.updateLayerConfig((0, _defineProperty2["default"])({}, domain, updatedDomain));
        }
      });
      return this;
    }
  }, {
    key: "getDataset",
    value: function getDataset(datasets) {
      return this.config.dataId ? datasets[this.config.dataId] : null;
    }
    /**
     * Validate visual channel field and scales based on supported field & scale type
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      this.validateFieldType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate field type based on channelScaleType
     */

  }, {
    key: "validateFieldType",
    value: function validateFieldType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType,
          supportedFieldTypes = visualChannel.supportedFieldTypes;

      if (this.config[field]) {
        // if field is selected, check if field type is supported
        var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];

        if (!channelSupportedFieldTypes.includes(this.config[field].type)) {
          // field type is not supported, set it back to null
          // set scale back to default
          this.updateLayerConfig((0, _defineProperty2["default"])({}, field, null));
        }
      }
    }
    /**
     * Validate scale type based on aggregation
     */

  }, {
    key: "validateScale",
    value: function validateScale(channel) {
      var visualChannel = this.visualChannels[channel];
      var scale = visualChannel.scale;

      if (!scale) {
        // visualChannel doesn't have scale
        return;
      }

      var scaleOptions = this.getScaleOptions(channel); // check if current selected scale is
      // supported, if not, change to default

      if (!scaleOptions.includes(this.config[scale])) {
        this.updateLayerConfig((0, _defineProperty2["default"])({}, scale, scaleOptions[0]));
      }
    }
    /**
     * Get scale options based on current field
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          channelScaleType = visualChannel.channelScaleType;
      return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
    }
  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(dataset, channel) {
      console.log('update layer visual channel');
      var visualChannel = this.visualChannels[channel];
      this.validateVisualChannel(channel); // calculate layer channel domain

      var updatedDomain = this.calculateLayerDomain(dataset, visualChannel);
      this.updateLayerConfig((0, _defineProperty2["default"])({}, visualChannel.domain, updatedDomain));
    }
  }, {
    key: "getVisualChannelUpdateTriggers",
    value: function getVisualChannelUpdateTriggers() {
      var _this6 = this;

      var updateTriggers = {};
      Object.values(this.visualChannels).forEach(function (visualChannel) {
        var _objectSpread11;

        // field range scale domain
        var accessor = visualChannel.accessor,
            field = visualChannel.field,
            scale = visualChannel.scale,
            domain = visualChannel.domain,
            range = visualChannel.range,
            defaultValue = visualChannel.defaultValue,
            fixed = visualChannel.fixed;
        updateTriggers[accessor] = _objectSpread((_objectSpread11 = {}, (0, _defineProperty2["default"])(_objectSpread11, field, _this6.config[field]), (0, _defineProperty2["default"])(_objectSpread11, scale, _this6.config[scale]), (0, _defineProperty2["default"])(_objectSpread11, domain, _this6.config[domain]), (0, _defineProperty2["default"])(_objectSpread11, range, _this6.config.visConfig[range]), (0, _defineProperty2["default"])(_objectSpread11, "defaultValue", typeof defaultValue === 'function' ? defaultValue(_this6.config) : defaultValue), _objectSpread11), fixed ? (0, _defineProperty2["default"])({}, fixed, _this6.config.visConfig[fixed]) : {});
      });
      return updateTriggers;
    }
  }, {
    key: "calculateLayerDomain",
    value: function calculateLayerDomain(dataset, visualChannel) {
      var scale = visualChannel.scale;
      var scaleType = this.config[scale];
      var field = this.config[visualChannel.field];

      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }

      return dataset.getColumnLayerDomain(field, scaleType) || defaultDomain;
    }
  }, {
    key: "hasHoveredObject",
    value: function hasHoveredObject(objectInfo) {
      return this.isLayerHovered(objectInfo) && objectInfo.object ? objectInfo.object : null;
    }
  }, {
    key: "isLayerHovered",
    value: function isLayerHovered(objectInfo) {
      var _objectInfo$layer, _objectInfo$layer$pro;

      return (objectInfo === null || objectInfo === void 0 ? void 0 : objectInfo.picked) && (objectInfo === null || objectInfo === void 0 ? void 0 : (_objectInfo$layer = objectInfo.layer) === null || _objectInfo$layer === void 0 ? void 0 : (_objectInfo$layer$pro = _objectInfo$layer.props) === null || _objectInfo$layer$pro === void 0 ? void 0 : _objectInfo$layer$pro.id) === this.id;
    }
  }, {
    key: "getRadiusScaleByZoom",
    value: function getRadiusScaleByZoom(mapState, fixedRadius) {
      var radiusChannel = Object.values(this.visualChannels).find(function (vc) {
        return vc.property === 'radius';
      });

      if (!radiusChannel) {
        return 1;
      }

      var field = radiusChannel.field;
      var fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      var radius = this.config.visConfig.radius; // @ts-ignore

      return fixed ? 1 : (this.config[field] ? 1 : radius) * this.getZoomFactor(mapState);
    }
  }, {
    key: "shouldCalculateLayerData",
    value: function shouldCalculateLayerData(props) {
      var _this7 = this;

      return props.some(function (p) {
        return !_this7.noneLayerDataAffectingProps.includes(p);
      });
    }
  }, {
    key: "getBrushingExtensionProps",
    value: function getBrushingExtensionProps(interactionConfig, brushingTarget) {
      var brush = interactionConfig.brush;
      return {
        // brushing
        autoHighlight: !brush.enabled,
        brushingRadius: brush.config.size * 1000,
        brushingTarget: brushingTarget || 'source',
        brushingEnabled: brush.enabled
      };
    }
  }, {
    key: "getDefaultDeckLayerProps",
    value: function getDefaultDeckLayerProps(_ref11) {
      var idx = _ref11.idx,
          gpuFilter = _ref11.gpuFilter,
          mapState = _ref11.mapState;
      return {
        id: this.id,
        idx: idx,
        coordinateSystem: _core.COORDINATE_SYSTEM.LNGLAT,
        pickable: true,
        wrapLongitude: true,
        parameters: {
          depthTest: Boolean(mapState.dragRotate || this.config.visConfig.enable3d)
        },
        hidden: this.config.hidden,
        // visconfig
        opacity: this.config.visConfig.opacity,
        highlightColor: this.config.highlightColor,
        // data filtering
        extensions: [dataFilterExtension],
        filterRange: gpuFilter ? gpuFilter.filterRange : undefined
      };
    }
  }, {
    key: "getDefaultHoverLayerProps",
    value: function getDefaultHoverLayerProps() {
      return {
        id: "".concat(this.id, "-hovered"),
        pickable: false,
        wrapLongitude: true,
        coordinateSystem: _core.COORDINATE_SYSTEM.LNGLAT
      };
    }
  }, {
    key: "renderTextLabelLayer",
    value: function renderTextLabelLayer(_ref12, renderOpts) {
      var _this8 = this;

      var getPosition = _ref12.getPosition,
          getPixelOffset = _ref12.getPixelOffset,
          updateTriggers = _ref12.updateTriggers,
          sharedProps = _ref12.sharedProps;
      var data = renderOpts.data,
          mapState = renderOpts.mapState;
      var textLabel = this.config.textLabel;
      return data.textLabels.reduce(function (accu, d, i) {
        if (d.getText) {
          var _textLabel$i$field, _textLabel$i$field2;

          accu.push(new _layers.TextLayer(_objectSpread(_objectSpread({}, sharedProps), {}, {
            id: "".concat(_this8.id, "-label-").concat((_textLabel$i$field = textLabel[i].field) === null || _textLabel$i$field === void 0 ? void 0 : _textLabel$i$field.name),
            data: data.data,
            getText: d.getText,
            getPosition: getPosition,
            characterSet: d.characterSet,
            getPixelOffset: getPixelOffset(textLabel[i]),
            getSize: 1,
            sizeScale: textLabel[i].size,
            getTextAnchor: textLabel[i].anchor,
            getAlignmentBaseline: textLabel[i].alignment,
            getColor: textLabel[i].color,
            parameters: {
              // text will always show on top of all layers
              depthTest: false
            },
            getFilterValue: data.getFilterValue,
            updateTriggers: _objectSpread(_objectSpread({}, updateTriggers), {}, {
              getText: (_textLabel$i$field2 = textLabel[i].field) === null || _textLabel$i$field2 === void 0 ? void 0 : _textLabel$i$field2.name,
              getPixelOffset: _objectSpread(_objectSpread({}, updateTriggers.getRadius), {}, {
                mapState: mapState,
                anchor: textLabel[i].anchor,
                alignment: textLabel[i].alignment
              }),
              getTextAnchor: textLabel[i].anchor,
              getAlignmentBaseline: textLabel[i].alignment,
              getColor: textLabel[i].color
            })
          })));
        }

        return accu;
      }, []);
    }
  }, {
    key: "calculateDataAttribute",
    value: function calculateDataAttribute(keplerTable, getPosition) {
      // implemented in subclasses
      return [];
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(dataContainer, getPosition) {// implemented in subclasses
    }
  }, {
    key: "getPositionAccessor",
    value: function getPositionAccessor(dataContainer) {
      // implemented in subclasses
      return function () {
        return null;
      };
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(dataset, foundLayers) {
      return {
        props: [],
        foundLayers: foundLayers
      };
    }
    /**
     * Given a array of preset required column names
     * found field that has the same name to set as layer column
     *
     * @param {object} defaultFields
     * @param {object[]} allFields
     * @returns {object[] | null} all possible required layer column pairs
     */

  }, {
    key: "findDefaultColumnField",
    value: function findDefaultColumnField(defaultFields, allFields) {
      // find all matched fields for each required col
      var requiredColumns = Object.keys(defaultFields).reduce(function (prev, key) {
        var requiredFields = allFields.filter(function (f) {
          return f.name === defaultFields[key] || defaultFields[key].includes(f.name);
        });
        prev[key] = requiredFields.length ? requiredFields.map(function (f) {
          return {
            value: f.name,
            fieldIdx: f.fieldIdx
          };
        }) : null;
        return prev;
      }, {});

      if (!Object.values(requiredColumns).every(Boolean)) {
        // if any field missing, return null
        return null;
      }

      return this.getAllPossibleColumnParis(requiredColumns);
    }
  }, {
    key: "getAllPossibleColumnParis",
    value: function getAllPossibleColumnParis(requiredColumns) {
      // for multiple matched field for one required column, return multiple
      // combinations, e. g. if column a has 2 matched, column b has 3 matched
      // 6 possible column pairs will be returned
      var allKeys = Object.keys(requiredColumns);
      var pointers = allKeys.map(function (k, i) {
        return i === allKeys.length - 1 ? -1 : 0;
      });
      var countPerKey = allKeys.map(function (k) {
        return requiredColumns[k].length;
      });
      var pairs = [];
      /* eslint-disable no-loop-func */

      while (incrementPointers(pointers, countPerKey, pointers.length - 1)) {
        var newPair = pointers.reduce(function (prev, cuur, i) {
          prev[allKeys[i]] = requiredColumns[allKeys[i]][cuur];
          return prev;
        }, {});
        pairs.push(newPair);
      }
      /* eslint-enable no-loop-func */
      // recursively increment pointers


      function incrementPointers(pts, counts, index) {
        if (index === 0 && pts[0] === counts[0] - 1) {
          // nothing to increment
          return false;
        }

        if (pts[index] + 1 < counts[index]) {
          pts[index] = pts[index] + 1;
          return true;
        }

        pts[index] = 0;
        return incrementPointers(pts, counts, index - 1);
      }

      return pairs;
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(c) {
      return (0, _colorUtils.hexToRgb)(c);
    }
  }]);
  return Layer;
}();

var _default = Layer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYmFzZS1sYXllci5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUNvbG9yIiwiTEFZRVJfSURfTEVOR1RIIiwiTUFYX1NBTVBMRV9TSVpFIiwiZGVmYXVsdERvbWFpbiIsImRhdGFGaWx0ZXJFeHRlbnNpb24iLCJEYXRhRmlsdGVyRXh0ZW5zaW9uIiwiZmlsdGVyU2l6ZSIsIk1BWF9HUFVfRklMVEVSUyIsImRlZmF1bHREYXRhQWNjZXNzb3IiLCJkYyIsImQiLCJkZWZhdWx0R2V0RmllbGRWYWx1ZSIsImZpZWxkIiwidmFsdWVBY2Nlc3NvciIsIk9WRVJMQVlfVFlQRSIsImRlY2tnbCIsIm1hcGJveGdsIiwibGF5ZXJDb2xvcnMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJEYXRhVml6Q29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJpbmRleCIsImxlbmd0aCIsImNvbG9yTWFrZXIiLCJMYXllciIsInByb3BzIiwiaWQiLCJtZXRhIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJjb25maWciLCJnZXREZWZhdWx0TGF5ZXJDb25maWciLCJjb2x1bW5zIiwiZ2V0TGF5ZXJDb2x1bW5zIiwiRGVmYXVsdExheWVySWNvbiIsInR5cGUiLCJjb2xvciIsInByb3BlcnR5Iiwic2NhbGUiLCJkb21haW4iLCJyYW5nZSIsImtleSIsImNoYW5uZWxTY2FsZVR5cGUiLCJDSEFOTkVMX1NDQUxFUyIsIm51bGxWYWx1ZSIsIk5PX1ZBTFVFX0NPTE9SIiwiZGVmYXVsdFZhbHVlIiwic2l6ZSIsImxhdCIsInBhaXIiLCJmaWVsZFBhaXJLZXkiLCJsbmciLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiZGF0YUlkIiwibGFiZWwiLCJERUZBVUxUX0xBWUVSX0xBQkVMIiwibmV4dCIsInZhbHVlIiwiaXNWaXNpYmxlIiwiaXNDb25maWdBY3RpdmUiLCJoaWdobGlnaHRDb2xvciIsIkRFRkFVTFRfSElHSExJR0hUX0NPTE9SIiwiaGlkZGVuIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JTY2FsZSIsIlNDQUxFX1RZUEVTIiwicXVhbnRpbGUiLCJzaXplRG9tYWluIiwic2l6ZVNjYWxlIiwibGluZWFyIiwic2l6ZUZpZWxkIiwidmlzQ29uZmlnIiwidGV4dExhYmVsIiwiREVGQVVMVF9URVhUX0xBQkVMIiwiY29sb3JVSSIsIkRFRkFVTFRfQ09MT1JfVUkiLCJjb2xvclJhbmdlIiwiYW5pbWF0aW9uIiwiZW5hYmxlZCIsInZpc3VhbENoYW5uZWxzIiwibWVhc3VyZSIsImRpc3BsYXlOYW1lIiwibmFtZSIsImRlZmF1bHRNZWFzdXJlIiwidXBkYXRlIiwiZmllbGRJZHgiLCJjb2x1bW5QYWlycyIsInBhcnRuZXJLZXkiLCJwYXJ0bmVyRmllbGRQYWlyS2V5Iiwiem9vbSIsInpvb21PZmZzZXQiLCJNYXRoIiwicG93IiwibWF4IiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsImRhdGFzZXRzIiwiZmlsdGVyZWRJbmRleCIsIm9iamVjdCIsImRhdGFDb250YWluZXIiLCJyb3ciLCJjb25maWdUb0NvcHkiLCJzaGFsbG93Q29weSIsImNvbmNhdCIsInYiLCJub3RUb0NvcHkiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwiY3VycmVudENvbmZpZyIsImNvcGllZCIsImNvcHlMYXllckNvbmZpZyIsInVwZGF0ZUxheWVyQ29uZmlnIiwia2V5cyIsImNoYW5uZWwiLCJ2YWxpZGF0ZVZpc3VhbENoYW5uZWwiLCJpbmNsdWRlcyIsImxheWVyVmlzQ29uZmlncyIsIml0ZW0iLCJMQVlFUl9WSVNfQ09ORklHUyIsImV2ZXJ5IiwicCIsImhhc093blByb3BlcnR5IiwiY29sdW1uVmFsaWRhdG9ycyIsInJlcXVpcmVkIiwicmVxdWlyZWRMYXllckNvbHVtbnMiLCJyZWR1Y2UiLCJhY2N1IiwidmFsaWRhdG9yIiwib3B0aW9uYWwiLCJvcHRpb25hbENvbHVtbnMiLCJuZXdDb25maWciLCJuZXdWaXNDb25maWciLCJwcm9wIiwicHJldmlvdXMiLCJjb2xvclVJUHJvcCIsImVudHJpZXMiLCJpc0NvbG9yUmFuZ2UiLCJjb2xvcnMiLCJ1cGRhdGVDb2xvclVJQnlDb2xvclJhbmdlIiwidXBkYXRlQ29sb3JSYW5nZUJ5Q29sb3JVSSIsInVwZGF0ZUN1c3RvbVBhbGV0dGUiLCJjb2xvclJhbmdlQ29uZmlnIiwiY3VzdG9tIiwiY3VzdG9tUGFsZXR0ZSIsInNob3dEcm9wZG93biIsInN0ZXBzIiwicmV2ZXJzZWQiLCJCb29sZWFuIiwic2hvdWxkVXBkYXRlIiwic29tZSIsInNhbWVHcm91cCIsIkNPTE9SX1JBTkdFUyIsImZpbHRlciIsImNyIiwiZmluZCIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwibGF5ZXJEYXRhIiwiZGF0YSIsImhhc0FsbENvbHVtbnMiLCJoYXNMYXllckRhdGEiLCJyZW5kZXJMYXllciIsIkFycmF5IiwiaXNBcnJheSIsImNvbG9yTWFwIiwiY01hcCIsIk1hcCIsImsiLCJzZXQiLCJTQ0FMRV9GVU5DIiwib3JkaW5hbCIsInVua25vd24iLCJnZXQiLCJVTktOT1dOX0NPTE9SX0tFWSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImRhdGFBY2Nlc3NvciIsImF0dHJpYnV0ZUFjY2Vzc29ycyIsImZpeGVkIiwiYWNjZXNzb3IiLCJnZXRBdHRyaWJ1dGVWYWx1ZSIsInNob3VsZEdldFNjYWxlIiwiYXJncyIsImlzRml4ZWQiLCJzY2FsZUZ1bmN0aW9uIiwiZ2V0Q29sb3JTY2FsZSIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJDb25zb2xlIiwid2FybiIsImdldFBvc2l0aW9uIiwic2FtcGxlRGF0YSIsIm51bVJvd3MiLCJwb2ludHMiLCJtYXBJbmRleCIsImxhdEJvdW5kcyIsImxuZ0JvdW5kcyIsImRhdGFVcGRhdGVUcmlnZ2VycyIsInRyaWdnZXJDaGFuZ2VkIiwiX29sZERhdGFVcGRhdGVUcmlnZ2VycyIsImdldFZhbHVlIiwiYXR0cmlidXRlVmFsdWUiLCJBTExfRklFTERfVFlQRVMiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiYWxsRGF0YSIsImdldERhdGEiLCJkYXRhc2V0SWQiLCJnZXRNZXRhIiwidGwiLCJpIiwib2xkTGF5ZXJEYXRhIiwiY29uc29sZSIsImxvZyIsImxheWVyRGF0YXNldCIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJnZXREYXRhVXBkYXRlVHJpZ2dlcnMiLCJnZXRDaGFuZ2VkVHJpZ2dlcnMiLCJ1cGRhdGVMYXllck1ldGEiLCJjYWxjdWxhdGVEYXRhQXR0cmlidXRlIiwibmV3RmlsdGVyIiwidGFibGUiLCJnZXREYXRhc2V0Iiwic2NhbGVUeXBlIiwidXBkYXRlZERvbWFpbiIsImNhbGN1bGF0ZUxheWVyRG9tYWluIiwidmFsaWRhdGVGaWVsZFR5cGUiLCJ2YWxpZGF0ZVNjYWxlIiwidmlzdWFsQ2hhbm5lbCIsInN1cHBvcnRlZEZpZWxkVHlwZXMiLCJjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyIsIkNIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsIkZJRUxEX09QVFMiLCJkYXRhc2V0IiwidXBkYXRlVHJpZ2dlcnMiLCJnZXRDb2x1bW5MYXllckRvbWFpbiIsIm9iamVjdEluZm8iLCJpc0xheWVySG92ZXJlZCIsInBpY2tlZCIsImxheWVyIiwibWFwU3RhdGUiLCJmaXhlZFJhZGl1cyIsInJhZGl1c0NoYW5uZWwiLCJ2YyIsInVuZGVmaW5lZCIsInJhZGl1cyIsImdldFpvb21GYWN0b3IiLCJub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImJydXNoaW5nVGFyZ2V0IiwiYnJ1c2giLCJhdXRvSGlnaGxpZ2h0IiwiYnJ1c2hpbmdSYWRpdXMiLCJicnVzaGluZ0VuYWJsZWQiLCJpZHgiLCJncHVGaWx0ZXIiLCJjb29yZGluYXRlU3lzdGVtIiwiQ09PUkRJTkFURV9TWVNURU0iLCJMTkdMQVQiLCJwaWNrYWJsZSIsIndyYXBMb25naXR1ZGUiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsImVuYWJsZTNkIiwib3BhY2l0eSIsImV4dGVuc2lvbnMiLCJmaWx0ZXJSYW5nZSIsInJlbmRlck9wdHMiLCJnZXRQaXhlbE9mZnNldCIsInNoYXJlZFByb3BzIiwidGV4dExhYmVscyIsImdldFRleHQiLCJUZXh0TGF5ZXIiLCJjaGFyYWN0ZXJTZXQiLCJnZXRTaXplIiwiZ2V0VGV4dEFuY2hvciIsImFuY2hvciIsImdldEFsaWdubWVudEJhc2VsaW5lIiwiYWxpZ25tZW50IiwiZ2V0Q29sb3IiLCJnZXRGaWx0ZXJWYWx1ZSIsImdldFJhZGl1cyIsImtlcGxlclRhYmxlIiwiZm91bmRMYXllcnMiLCJkZWZhdWx0RmllbGRzIiwiYWxsRmllbGRzIiwicmVxdWlyZWRDb2x1bW5zIiwicHJldiIsInJlcXVpcmVkRmllbGRzIiwiZiIsImdldEFsbFBvc3NpYmxlQ29sdW1uUGFyaXMiLCJhbGxLZXlzIiwicG9pbnRlcnMiLCJjb3VudFBlcktleSIsInBhaXJzIiwiaW5jcmVtZW50UG9pbnRlcnMiLCJuZXdQYWlyIiwiY3V1ciIsInB0cyIsImNvdW50cyIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFVQTs7QUFDQTs7QUFDQTs7QUFTQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7O3dEQXVCVUEsYTs7QUFyQlY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNQyxlQUFlLEdBQUcsQ0FBeEI7O0FBRVAsSUFBTUMsZUFBZSxHQUFHLElBQXhCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBdEI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxJQUFJQywrQkFBSixDQUF3QjtBQUFDQyxFQUFBQSxVQUFVLEVBQUVDO0FBQWIsQ0FBeEIsQ0FBNUI7O0FBRUEsSUFBTUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBQyxFQUFFO0FBQUEsU0FBSSxVQUFBQyxDQUFDO0FBQUEs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QWEsQ0FBYjtBQUNBLGVBQU9xUixpQkFBaUIsQ0FBQ0csR0FBRCxFQUFNQyxNQUFOLEVBQWN6UixLQUFLLEdBQUcsQ0FBdEIsQ0FBeEI7QUFDRDs7QUFFRCxhQUFPb1IsS0FBUDtBQUNEOzs7V0FFRCxrQkFBZ0JNLENBQWhCLEVBQW1CO0FBQ2pCLGFBQU8sMEJBQVNBLENBQVQsQ0FBUDtBQUNEOzs7OztlQTIyQll2UixLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGtleW1pcnJvciBmcm9tICdrZXltaXJyb3InO1xuaW1wb3J0IHtEYXRhRmlsdGVyRXh0ZW5zaW9ufSBmcm9tICdAZGVjay5nbC9leHRlbnNpb25zJztcbmltcG9ydCB7Q09PUkRJTkFURV9TWVNURU19IGZyb20gJ0BkZWNrLmdsL2NvcmUnO1xuaW1wb3J0IHtUZXh0TGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5cbmltcG9ydCBEZWZhdWx0TGF5ZXJJY29uIGZyb20gJy4vZGVmYXVsdC1sYXllci1pY29uJztcbmltcG9ydCB7ZGlmZlVwZGF0ZVRyaWdnZXJzfSBmcm9tICcuL2xheWVyLXVwZGF0ZSc7XG5cbmltcG9ydCB7XG4gIEFMTF9GSUVMRF9UWVBFUyxcbiAgTk9fVkFMVUVfQ09MT1IsXG4gIFNDQUxFX1RZUEVTLFxuICBDSEFOTkVMX1NDQUxFUyxcbiAgRklFTERfT1BUUyxcbiAgU0NBTEVfRlVOQyxcbiAgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTLFxuICBNQVhfR1BVX0ZJTFRFUlNcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtDT0xPUl9SQU5HRVN9IGZyb20gJ2NvbnN0YW50cy9jb2xvci1yYW5nZXMnO1xuaW1wb3J0IHtEYXRhVml6Q29sb3JzfSBmcm9tICdjb25zdGFudHMvY3VzdG9tLWNvbG9yLXJhbmdlcyc7XG5pbXBvcnQge1xuICBMQVlFUl9WSVNfQ09ORklHUyxcbiAgREVGQVVMVF9URVhUX0xBQkVMLFxuICBERUZBVUxUX0NPTE9SX1VJLFxuICBVTktOT1dOX0NPTE9SX0tFWSxcbiAgREVGQVVMVF9ISUdITElHSFRfQ09MT1IsXG4gIERFRkFVTFRfTEFZRVJfTEFCRUxcbn0gZnJvbSAnLi9sYXllci1mYWN0b3J5JztcblxuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZCwgaXNQbGFpbk9iamVjdH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5pbXBvcnQge2dldExhdExuZ0JvdW5kcywgbm90TnVsbG9yVW5kZWZpbmVkfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcbmltcG9ydCB7Z2V0U2FtcGxlRGF0YX0gZnJvbSAndXRpbHMvdGFibGUtdXRpbHMvZGF0YS1jb250YWluZXItdXRpbHMnO1xuXG5pbXBvcnQge2hleFRvUmdiLCBnZXRDb2xvckdyb3VwQnlOYW1lLCByZXZlcnNlQ29sb3JSYW5nZX0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi9pbmRleCcpLkxheWVyfSBMYXllckNsYXNzfSAqL1xuXG4vKipcbiAqIEFwcHJveC4gbnVtYmVyIG9mIHBvaW50cyB0byBzYW1wbGUgaW4gYSBsYXJnZSBkYXRhIHNldFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IExBWUVSX0lEX0xFTkdUSCA9IDY7XG5cbmNvbnN0IE1BWF9TQU1QTEVfU0laRSA9IDUwMDA7XG5jb25zdCBkZWZhdWx0RG9tYWluID0gWzAsIDFdO1xuY29uc3QgZGF0YUZpbHRlckV4dGVuc2lvbiA9IG5ldyBEYXRhRmlsdGVyRXh0ZW5zaW9uKHtmaWx0ZXJTaXplOiBNQVhfR1BVX0ZJTFRFUlN9KTtcblxuY29uc3QgZGVmYXVsdERhdGFBY2Nlc3NvciA9IGRjID0+IGQgPT4gZDtcbmNvbnN0IGRlZmF1bHRHZXRGaWVsZFZhbHVlID0gKGZpZWxkLCBkKSA9PiBmaWVsZC52YWx1ZUFjY2Vzc29yKGQpO1xuXG5leHBvcnQgY29uc3QgT1ZFUkxBWV9UWVBFID0ga2V5bWlycm9yKHtcbiAgZGVja2dsOiBudWxsLFxuICBtYXBib3hnbDogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBsYXllckNvbG9ycyA9IE9iamVjdC52YWx1ZXMoRGF0YVZpekNvbG9ycykubWFwKGhleFRvUmdiKTtcbmZ1bmN0aW9uKiBnZW5lcmF0ZUNvbG9yKCkge1xuICBsZXQgaW5kZXggPSAwO1xuICB3aGlsZSAoaW5kZXggPCBsYXllckNvbG9ycy5sZW5ndGggKyAxKSB7XG4gICAgaWYgKGluZGV4ID09PSBsYXllckNvbG9ycy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9XG4gICAgeWllbGQgbGF5ZXJDb2xvcnNbaW5kZXgrK107XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbG9yTWFrZXIgPSBnZW5lcmF0ZUNvbG9yKCk7XG5cbi8qKiBAdHlwZSB7TGF5ZXJDbGFzc30gKi9cbmNsYXNzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIHRoaXMuaWQgPSBwcm9wcy5pZCB8fCBnZW5lcmF0ZUhhc2hJZChMQVlFUl9JRF9MRU5HVEgpO1xuXG4gICAgLy8gbWV0YVxuICAgIHRoaXMubWV0YSA9IHt9O1xuXG4gICAgLy8gdmlzQ29uZmlnU2V0dGluZ3NcbiAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzID0ge307XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmdldERlZmF1bHRMYXllckNvbmZpZyh7XG4gICAgICBjb2x1bW5zOiB0aGlzLmdldExheWVyQ29sdW1ucygpLFxuICAgICAgLi4ucHJvcHNcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIERlZmF1bHRMYXllckljb247XG4gIH1cblxuICBnZXQgb3ZlcmxheVR5cGUoKSB7XG4gICAgcmV0dXJuIE9WRVJMQVlfVFlQRS5kZWNrZ2w7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXQgaXNBZ2dyZWdhdGVkKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQgb3B0aW9uYWxDb2x1bW5zKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldCBub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMoKSB7XG4gICAgcmV0dXJuIFsnbGFiZWwnLCAnb3BhY2l0eScsICd0aGlja25lc3MnLCAnaXNWaXNpYmxlJywgJ2hpZGRlbiddO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICBwcm9wZXJ0eTogJ2NvbG9yJyxcbiAgICAgICAgZmllbGQ6ICdjb2xvckZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdjb2xvclNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnY29sb3JEb21haW4nLFxuICAgICAgICByYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICAgICAgICBrZXk6ICdjb2xvcicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yLFxuICAgICAgICBudWxsVmFsdWU6IE5PX1ZBTFVFX0NPTE9SLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZyA9PiBjb25maWcuY29sb3JcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc2l6ZScsXG4gICAgICAgIGZpZWxkOiAnc2l6ZUZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdzaXplU2NhbGUnLFxuICAgICAgICBkb21haW46ICdzaXplRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdzaXplUmFuZ2UnLFxuICAgICAgICBrZXk6ICdzaXplJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuc2l6ZSxcbiAgICAgICAgbnVsbFZhbHVlOiAwLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IDFcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogQ29sdW1uIHBhaXJzIG1hcHMgbGF5ZXIgY29sdW1uIHRvIGEgc3BlY2lmaWMgZmllbGQgcGFpcnMsXG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBudWxsXG4gICAqL1xuICBnZXQgY29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKlxuICAgKiBEZWZhdWx0IHBvaW50IGNvbHVtbiBwYWlycywgY2FuIGJlIHVzZWQgZm9yIHBvaW50IGJhc2VkIGxheWVyczogcG9pbnQsIGljb24gZXRjLlxuICAgKi9cbiAgZ2V0IGRlZmF1bHRQb2ludENvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsYXQ6IHtwYWlyOiAnbG5nJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmc6IHtwYWlyOiAnbGF0JywgZmllbGRQYWlyS2V5OiAnbG5nJ31cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogRGVmYXVsdCBsaW5rIGNvbHVtbiBwYWlycywgY2FuIGJlIHVzZWQgZm9yIGxpbmsgYmFzZWQgbGF5ZXJzOiBhcmMsIGxpbmUgZXRjXG4gICAqL1xuICBnZXQgZGVmYXVsdExpbmtDb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGF0MDoge3BhaXI6ICdsbmcwJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmcwOiB7cGFpcjogJ2xhdDAnLCBmaWVsZFBhaXJLZXk6ICdsbmcnfSxcbiAgICAgIGxhdDE6IHtwYWlyOiAnbG5nMScsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nMToge3BhaXI6ICdsYXQxJywgZmllbGRQYWlyS2V5OiAnbG5nJ31cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIFJlYWN0IGNvbXBvbmVudCBmb3IgdG8gcmVuZGVyIGxheWVyIGluc3RydWN0aW9ucyBpbiBhIG1vZGFsXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gYW4gb2JqZWN0XG4gICAqIEBleGFtcGxlXG4gICAqICByZXR1cm4ge1xuICAgKiAgICBpZDogJ2ljb25JbmZvJyxcbiAgICogICAgdGVtcGxhdGU6IEljb25JbmZvTW9kYWwsXG4gICAqICAgIG1vZGFsUHJvcHM6IHtcbiAgICogICAgICB0aXRsZTogJ0hvdyB0byBkcmF3IGljb25zJ1xuICAgKiAgIH07XG4gICAqIH1cbiAgICovXG4gIGdldCBsYXllckluZm9Nb2RhbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvKlxuICAgKiBHaXZlbiBhIGRhdGFzZXQsIGF1dG9tYXRpY2FsbHkgZmluZCBwcm9wcyB0byBjcmVhdGUgbGF5ZXIgYmFzZWQgb24gaXRcbiAgICogYW5kIHJldHVybiB0aGUgcHJvcHMgYW5kIHByZXZpb3VzIGZvdW5kIGxheWVycy5cbiAgICogQnkgZGVmYXVsdCwgbm8gbGF5ZXJzIHdpbGwgYmUgZm91bmRcbiAgICovXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoZGF0YXNldCwgZm91bmRMYXllcnMpIHtcbiAgICByZXR1cm4ge3Byb3BzOiBbXSwgZm91bmRMYXllcnN9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgYXJyYXkgb2YgcHJlc2V0IHJlcXVpcmVkIGNvbHVtbiBuYW1lc1xuICAgKiBmb3VuZCBmaWVsZCB0aGF0IGhhcyB0aGUgc2FtZSBuYW1lIHRvIHNldCBhcyBsYXllciBjb2x1bW5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRlZmF1bHRGaWVsZHNcbiAgICogQHBhcmFtIHtvYmplY3RbXX0gYWxsRmllbGRzXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXSB8IG51bGx9IGFsbCBwb3NzaWJsZSByZXF1aXJlZCBsYXllciBjb2x1bW4gcGFpcnNcbiAgICovXG4gIHN0YXRpYyBmaW5kRGVmYXVsdENvbHVtbkZpZWxkKGRlZmF1bHRGaWVsZHMsIGFsbEZpZWxkcykge1xuICAgIC8vIGZpbmQgYWxsIG1hdGNoZWQgZmllbGRzIGZvciBlYWNoIHJlcXVpcmVkIGNvbFxuICAgIGNvbnN0IHJlcXVpcmVkQ29sdW1ucyA9IE9iamVjdC5rZXlzKGRlZmF1bHRGaWVsZHMpLnJlZHVjZSgocHJldiwga2V5KSA9PiB7XG4gICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IGFsbEZpZWxkcy5maWx0ZXIoXG4gICAgICAgIGYgPT4gZi5uYW1lID09PSBkZWZhdWx0RmllbGRzW2tleV0gfHwgZGVmYXVsdEZpZWxkc1trZXldLmluY2x1ZGVzKGYubmFtZSlcbiAgICAgICk7XG5cbiAgICAgIHByZXZba2V5XSA9IHJlcXVpcmVkRmllbGRzLmxlbmd0aFxuICAgICAgICA/IHJlcXVpcmVkRmllbGRzLm1hcChmID0+ICh7XG4gICAgICAgICAgICB2YWx1ZTogZi5uYW1lLFxuICAgICAgICAgICAgZmllbGRJZHg6IGYuZmllbGRJZHhcbiAgICAgICAgICB9KSlcbiAgICAgICAgOiBudWxsO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xuXG4gICAgaWYgKCFPYmplY3QudmFsdWVzKHJlcXVpcmVkQ29sdW1ucykuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgIC8vIGlmIGFueSBmaWVsZCBtaXNzaW5nLCByZXR1cm4gbnVsbFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyhyZXF1aXJlZENvbHVtbnMpO1xuICB9XG5cbiAgc3RhdGljIGdldEFsbFBvc3NpYmxlQ29sdW1uUGFyaXMocmVxdWlyZWRDb2x1bW5zKSB7XG4gICAgLy8gZm9yIG11bHRpcGxlIG1hdGNoZWQgZmllbGQgZm9yIG9uZSByZXF1aXJlZCBjb2x1bW4sIHJldHVybiBtdWx0aXBsZVxuICAgIC8vIGNvbWJpbmF0aW9ucywgZS4gZy4gaWYgY29sdW1uIGEgaGFzIDIgbWF0Y2hlZCwgY29sdW1uIGIgaGFzIDMgbWF0Y2hlZFxuICAgIC8vIDYgcG9zc2libGUgY29sdW1uIHBhaXJzIHdpbGwgYmUgcmV0dXJuZWRcbiAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMocmVxdWlyZWRDb2x1bW5zKTtcbiAgICBjb25zdCBwb2ludGVycyA9IGFsbEtleXMubWFwKChrLCBpKSA9PiAoKGkgPT09IGFsbEtleXMubGVuZ3RoIC0gMSA/IC0xIDogMCkpKTtcbiAgICBjb25zdCBjb3VudFBlcktleSA9IGFsbEtleXMubWFwKGsgPT4gcmVxdWlyZWRDb2x1bW5zW2tdLmxlbmd0aCk7XG4gICAgY29uc3QgcGFpcnMgPSBbXTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuICAgIHdoaWxlIChpbmNyZW1lbnRQb2ludGVycyhwb2ludGVycywgY291bnRQZXJLZXksIHBvaW50ZXJzLmxlbmd0aCAtIDEpKSB7XG4gICAgICBjb25zdCBuZXdQYWlyID0gcG9pbnRlcnMucmVkdWNlKChwcmV2LCBjdXVyLCBpKSA9PiB7XG4gICAgICAgIHByZXZbYWxsS2V5c1tpXV0gPSByZXF1aXJlZENvbHVtbnNbYWxsS2V5c1tpXV1bY3V1cl07XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSwge30pO1xuXG4gICAgICBwYWlycy5wdXNoKG5ld1BhaXIpO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG4gICAgLy8gcmVjdXJzaXZlbHkgaW5jcmVtZW50IHBvaW50ZXJzXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50UG9pbnRlcnMocHRzLCBjb3VudHMsIGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHRzWzBdID09PSBjb3VudHNbMF0gLSAxKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgdG8gaW5jcmVtZW50XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHB0c1tpbmRleF0gKyAxIDwgY291bnRzW2luZGV4XSkge1xuICAgICAgICBwdHNbaW5kZXhdID0gcHRzW2luZGV4XSArIDE7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwdHNbaW5kZXhdID0gMDtcbiAgICAgIHJldHVybiBpbmNyZW1lbnRQb2ludGVycyhwdHMsIGNvdW50cywgaW5kZXggLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFpcnM7XG4gIH1cblxuICBzdGF0aWMgaGV4VG9SZ2IoYykge1xuICAgIHJldHVybiBoZXhUb1JnYihjKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFJZDogcHJvcHMuZGF0YUlkIHx8IG51bGwsXG4gICAgICBsYWJlbDogcHJvcHMubGFiZWwgfHwgREVGQVVMVF9MQVlFUl9MQUJFTCxcbiAgICAgIGNvbG9yOiBwcm9wcy5jb2xvciB8fCBjb2xvck1ha2VyLm5leHQoKS52YWx1ZSxcbiAgICAgIGNvbHVtbnM6IHByb3BzLmNvbHVtbnMgfHwgbnVsbCxcbiAgICAgIGlzVmlzaWJsZTogcHJvcHMuaXNWaXNpYmxlIHx8IGZhbHNlLFxuICAgICAgaXNDb25maWdBY3RpdmU6IHByb3BzLmlzQ29uZmlnQWN0aXZlIHx8IGZhbHNlLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IHByb3BzLmhpZ2hsaWdodENvbG9yIHx8IERFRkFVTFRfSElHSExJR0hUX0NPTE9SLFxuICAgICAgaGlkZGVuOiBwcm9wcy5oaWRkZW4gfHwgZmFsc2UsXG5cbiAgICAgIC8vIFRPRE86IHJlZmFjdG9yIHRoaXMgaW50byBzZXBhcmF0ZSB2aXN1YWwgQ2hhbm5lbCBjb25maWdcbiAgICAgIC8vIGNvbG9yIGJ5IGZpZWxkLCBkb21haW4gaXMgc2V0IGJ5IGZpbHRlcnMsIGZpZWxkLCBzY2FsZSB0eXBlXG4gICAgICBjb2xvckZpZWxkOiBudWxsLFxuICAgICAgY29sb3JEb21haW46IFswLCAxXSxcbiAgICAgIGNvbG9yU2NhbGU6IFNDQUxFX1RZUEVTLnF1YW50aWxlLFxuXG4gICAgICAvLyBjb2xvciBieSBzaXplLCBkb21haW4gaXMgc2V0IGJ5IGZpbHRlcnMsIGZpZWxkLCBzY2FsZSB0eXBlXG4gICAgICBzaXplRG9tYWluOiBbMCwgMV0sXG4gICAgICBzaXplU2NhbGU6IFNDQUxFX1RZUEVTLmxpbmVhcixcbiAgICAgIHNpemVGaWVsZDogbnVsbCxcblxuICAgICAgdmlzQ29uZmlnOiB7fSxcblxuICAgICAgdGV4dExhYmVsOiBbREVGQVVMVF9URVhUX0xBQkVMXSxcblxuICAgICAgY29sb3JVSToge1xuICAgICAgICBjb2xvcjogREVGQVVMVF9DT0xPUl9VSSxcbiAgICAgICAgY29sb3JSYW5nZTogREVGQVVMVF9DT0xPUl9VSVxuICAgICAgfSxcbiAgICAgIGFuaW1hdGlvbjoge2VuYWJsZWQ6IGZhbHNlfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiBhIHZpc3VhbENoYW5uZWwgY29uZmlnXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHJldHVybnMge3tsYWJlbDogc3RyaW5nLCBtZWFzdXJlOiAoc3RyaW5nfHN0cmluZyl9fVxuICAgKi9cbiAgZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSkge1xuICAgIC8vIGUuZy4gbGFiZWw6IENvbG9yLCBtZWFzdXJlOiBWZWhpY2xlIFR5cGVcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHRoaXMudmlzQ29uZmlnU2V0dGluZ3NbdGhpcy52aXN1YWxDaGFubmVsc1trZXldLnJhbmdlXS5sYWJlbCxcbiAgICAgIG1lYXN1cmU6IHRoaXMuY29uZmlnW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF1cbiAgICAgICAgPyAodGhpcy5jb25maWdbdGhpcy52aXN1YWxDaGFubmVsc1trZXldLmZpZWxkXS5kaXNwbGF5TmFtZSB8fFxuICAgICAgICAgIHRoaXMuY29uZmlnW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0ubmFtZSlcbiAgICAgICAgOiB0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0uZGVmYXVsdE1lYXN1cmVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2lnbiBhIGZpZWxkIHRvIGxheWVyIGNvbHVtbiwgcmV0dXJuIGNvbHVtbiBjb25maWdcbiAgICogQHBhcmFtIGtleSAtIENvbHVtbiBLZXlcbiAgICogQHBhcmFtIGZpZWxkIC0gU2VsZWN0ZWQgZmllbGRcbiAgICogQHJldHVybnMge3t9fSAtIENvbHVtbiBjb25maWdcbiAgICovXG4gIGFzc2lnbkNvbHVtbihrZXksIGZpZWxkKSB7XG4gICAgLy8gZmllbGQgdmFsdWUgY291bGQgYmUgbnVsbCBmb3Igb3B0aW9uYWwgY29sdW1uc1xuICAgIGNvbnN0IHVwZGF0ZSA9IGZpZWxkXG4gICAgICA/IHtcbiAgICAgICAgICB2YWx1ZTogZmllbGQubmFtZSxcbiAgICAgICAgICBmaWVsZElkeDogZmllbGQuZmllbGRJZHhcbiAgICAgICAgfVxuICAgICAgOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMX07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIFtrZXldOiB7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnNba2V5XSxcbiAgICAgICAgLi4udXBkYXRlXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSBmaWVsZCBwYWlyIHRvIGNvbHVtbiBjb25maWcsIHJldHVybiBjb2x1bW4gY29uZmlnXG4gICAqIEBwYXJhbSBrZXkgLSBDb2x1bW4gS2V5XG4gICAqIEBwYXJhbSBwYWlyIC0gZmllbGQgUGFpclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIENvbHVtbiBjb25maWdcbiAgICovXG4gIGFzc2lnbkNvbHVtblBhaXJzKGtleSwgcGFpcikge1xuICAgIGlmICghdGhpcy5jb2x1bW5QYWlycyB8fCAhdGhpcy5jb2x1bW5QYWlycz8uW2tleV0pIHtcbiAgICAgIC8vIHNob3VsZCBub3QgZW5kIGluIHRoaXMgc3RhdGVcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2x1bW5zO1xuICAgIH1cblxuICAgIGNvbnN0IHtwYWlyOiBwYXJ0bmVyS2V5LCBmaWVsZFBhaXJLZXl9ID0gdGhpcy5jb2x1bW5QYWlycz8uW2tleV07XG4gICAgY29uc3Qge2ZpZWxkUGFpcktleTogcGFydG5lckZpZWxkUGFpcktleX0gPSB0aGlzLmNvbHVtblBhaXJzPy5bcGFydG5lcktleV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIFtrZXldOiBwYWlyW2ZpZWxkUGFpcktleV0sXG4gICAgICBbcGFydG5lcktleV06IHBhaXJbcGFydG5lckZpZWxkUGFpcktleV1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBhIHJhZGl1cyB6b29tIG11bHRpcGxpZXIgdG8gcmVuZGVyIHBvaW50cywgc28gdGhleSBhcmUgdmlzaWJsZSBpbiBhbGwgem9vbSBsZXZlbFxuICAgKiBAcGFyYW0ge29iamVjdH0gbWFwU3RhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1hcFN0YXRlLnpvb20gLSBhY3R1YWwgem9vbVxuICAgKiBAcGFyYW0ge251bWJlciB8IHZvaWR9IG1hcFN0YXRlLnpvb21PZmZzZXQgLSB6b29tT2Zmc2V0IHdoZW4gcmVuZGVyIGluIHRoZSBwbG90IGNvbnRhaW5lciBmb3IgZXhwb3J0IGltYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXRab29tRmFjdG9yKHt6b29tLCB6b29tT2Zmc2V0ID0gMH0pIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMiwgTWF0aC5tYXgoMTQgLSB6b29tICsgem9vbU9mZnNldCwgMCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBhIGVsZXZhdGlvbiB6b29tIG11bHRpcGxpZXIgdG8gcmVuZGVyIHBvaW50cywgc28gdGhleSBhcmUgdmlzaWJsZSBpbiBhbGwgem9vbSBsZXZlbFxuICAgKiBAcGFyYW0ge29iamVjdH0gbWFwU3RhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1hcFN0YXRlLnpvb20gLSBhY3R1YWwgem9vbVxuICAgKiBAcGFyYW0ge251bWJlciB8IHZvaWR9IG1hcFN0YXRlLnpvb21PZmZzZXQgLSB6b29tT2Zmc2V0IHdoZW4gcmVuZGVyIGluIHRoZSBwbG90IGNvbnRhaW5lciBmb3IgZXhwb3J0IGltYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXRFbGV2YXRpb25ab29tRmFjdG9yKHt6b29tLCB6b29tT2Zmc2V0ID0gMH0pIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcudmlzQ29uZmlnLmVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3JcbiAgICAgID8gTWF0aC5wb3coMiwgTWF0aC5tYXgoOCAtIHpvb20gKyB6b29tT2Zmc2V0LCAwKSlcbiAgICAgIDogMTtcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShkYXRhc2V0cywgZmlsdGVyZWRJbmRleCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEhvdmVyRGF0YShvYmplY3QsIGRhdGFDb250YWluZXIpIHtcbiAgICBpZiAoIW9iamVjdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQnkgZGVmYXVsdCwgZWFjaCBlbnRyeSBvZiBsYXllckRhdGEgc2hvdWxkIGhhdmUgYW4gaW5kZXggb2YgYSByb3cgaW4gdGhlIG9yaWdpbmFsIGRhdGEgY29udGFpbmVyLlxuICAgIC8vIEVhY2ggbGF5ZXIgY2FuIGltcGxlbWVudCBpdHMgb3duIGdldEhvdmVyRGF0YSBtZXRob2RcbiAgICByZXR1cm4gZGF0YUNvbnRhaW5lci5yb3cob2JqZWN0LmluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNoYW5nZSBsYXllciB0eXBlLCB0cnkgdG8gY29weSBvdmVyIGxheWVyIGNvbmZpZ3MgYXMgbXVjaCBhcyBwb3NzaWJsZVxuICAgKiBAcGFyYW0gY29uZmlnVG9Db3B5IC0gY29uZmlnIHRvIGNvcHkgb3ZlclxuICAgKiBAcGFyYW0gdmlzQ29uZmlnU2V0dGluZ3MgLSB2aXNDb25maWcgc2V0dGluZ3Mgb2YgY29uZmlnIHRvIGNvcHlcbiAgICovXG4gIGFzc2lnbkNvbmZpZ1RvTGF5ZXIoY29uZmlnVG9Db3B5LCB2aXNDb25maWdTZXR0aW5ncykge1xuICAgIC8vIGRvbid0IGRlZXAgbWVyZ2UgdmlzdWFsQ2hhbm5lbCBmaWVsZFxuICAgIC8vIGRvbid0IGRlZXAgbWVyZ2UgY29sb3IgcmFuZ2UsIHJldmVyc2VkOiBpcyBub3QgYSBrZXkgYnkgZGVmYXVsdFxuICAgIGNvbnN0IHNoYWxsb3dDb3B5ID0gWydjb2xvclJhbmdlJywgJ3N0cm9rZUNvbG9yUmFuZ2UnXS5jb25jYXQoXG4gICAgICBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLm1hcCh2ID0+IHYuZmllbGQpXG4gICAgKTtcblxuICAgIC8vIGRvbid0IGNvcHkgb3ZlciBkb21haW4gYW5kIGFuaW1hdGlvblxuICAgIGNvbnN0IG5vdFRvQ29weSA9IFsnYW5pbWF0aW9uJ10uY29uY2F0KE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykubWFwKHYgPT4gdi5kb21haW4pKTtcbiAgICAvLyBpZiByYW5nZSBpcyBmb3IgdGhlIHNhbWUgcHJvcGVydHkgZ3JvdXAgY29weSBpdCwgb3RoZXJ3aXNlLCBub3QgdG8gY29weVxuICAgIE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykuZm9yRWFjaCh2ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlnVG9Db3B5LnZpc0NvbmZpZ1t2LnJhbmdlXSAmJlxuICAgICAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3YucmFuZ2VdICYmXG4gICAgICAgIHZpc0NvbmZpZ1NldHRpbmdzW3YucmFuZ2VdLmdyb3VwICE9PSB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3YucmFuZ2VdLmdyb3VwXG4gICAgICApIHtcbiAgICAgICAgbm90VG9Db3B5LnB1c2godi5yYW5nZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBkb24ndCBjb3B5IG92ZXIgdmlzdWFsQ2hhbm5lbCByYW5nZVxuICAgIGNvbnN0IGN1cnJlbnRDb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCBjb3BpZWQgPSB0aGlzLmNvcHlMYXllckNvbmZpZyhjdXJyZW50Q29uZmlnLCBjb25maWdUb0NvcHksIHtcbiAgICAgIHNoYWxsb3dDb3B5LFxuICAgICAgbm90VG9Db3B5XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKGNvcGllZCk7XG4gICAgLy8gdmFsaWRhdGUgdmlzdWFsQ2hhbm5lbCBmaWVsZCB0eXBlIGFuZCBzY2FsZSB0eXBlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlY3Vyc2l2ZWx5IGNvcHkgY29uZmlnIG92ZXIgdG8gYW4gZW1wdHkgbGF5ZXJcbiAgICogd2hlbiByZWNlaXZlZCBzYXZlZCBjb25maWcsIG9yIGNvcHkgY29uZmlnIG92ZXIgZnJvbSBhIGRpZmZlcmVudCBsYXllciB0eXBlXG4gICAqIG1ha2Ugc3VyZSB0byBvbmx5IGNvcHkgb3ZlciB2YWx1ZSB0byBleGlzdGluZyBrZXlzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50Q29uZmlnIC0gZXhpc3RpbmcgY29uZmlnIHRvIGJlIG92ZXJyaWRlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdUb0NvcHkgLSBuZXcgQ29uZmlnIHRvIGNvcHkgb3ZlclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzaGFsbG93Q29weSAtIGFycmF5IG9mIHByb3BlcnRpZXMgdG8gbm90IHRvIGJlIGRlZXAgY29waWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG5vdFRvQ29weSAtIGFycmF5IG9mIHByb3BlcnRpZXMgbm90IHRvIGNvcHlcbiAgICogQHJldHVybnMge29iamVjdH0gLSBjb3BpZWQgY29uZmlnXG4gICAqL1xuICBjb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZywgY29uZmlnVG9Db3B5LCB7c2hhbGxvd0NvcHkgPSBbXSwgbm90VG9Db3B5ID0gW119ID0ge30pIHtcbiAgICBjb25zdCBjb3BpZWQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjdXJyZW50Q29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzUGxhaW5PYmplY3QoY3VycmVudENvbmZpZ1trZXldKSAmJlxuICAgICAgICBpc1BsYWluT2JqZWN0KGNvbmZpZ1RvQ29weVtrZXldKSAmJlxuICAgICAgICAhc2hhbGxvd0NvcHkuaW5jbHVkZXMoa2V5KSAmJlxuICAgICAgICAhbm90VG9Db3B5LmluY2x1ZGVzKGtleSlcbiAgICAgICkge1xuICAgICAgICAvLyByZWN1cnNpdmVseSBhc3NpZ24gb2JqZWN0IHZhbHVlXG4gICAgICAgIGNvcGllZFtrZXldID0gdGhpcy5jb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZ1trZXldLCBjb25maWdUb0NvcHlba2V5XSwge1xuICAgICAgICAgIHNoYWxsb3dDb3B5LFxuICAgICAgICAgIG5vdFRvQ29weVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobm90TnVsbG9yVW5kZWZpbmVkKGNvbmZpZ1RvQ29weVtrZXldKSAmJiAhbm90VG9Db3B5LmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgLy8gY29weVxuICAgICAgICBjb3BpZWRba2V5XSA9IGNvbmZpZ1RvQ29weVtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8ga2VlcCBleGlzdGluZ1xuICAgICAgICBjb3BpZWRba2V5XSA9IGN1cnJlbnRDb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3BpZWQ7XG4gIH1cblxuICByZWdpc3RlclZpc0NvbmZpZyhsYXllclZpc0NvbmZpZ3MpIHtcbiAgICBPYmplY3Qua2V5cyhsYXllclZpc0NvbmZpZ3MpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnICYmIExBWUVSX1ZJU19DT05GSUdTW2xheWVyVmlzQ29uZmlnc1tpdGVtXV0pIHtcbiAgICAgICAgLy8gaWYgYXNzaWduZWQgb25lIG9mIGRlZmF1bHQgTEFZRVJfQ09ORklHU1xuICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWdbaXRlbV0gPSBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgdGhpcy52aXNDb25maWdTZXR0aW5nc1tpdGVtXSA9IExBWUVSX1ZJU19DT05GSUdTW2xheWVyVmlzQ29uZmlnc1tpdGVtXV07XG4gICAgICB9IGVsc2UgaWYgKFsndHlwZScsICdkZWZhdWx0VmFsdWUnXS5ldmVyeShwID0+IGxheWVyVmlzQ29uZmlnc1tpdGVtXS5oYXNPd25Qcm9wZXJ0eShwKSkpIHtcbiAgICAgICAgLy8gaWYgcHJvdmlkZWQgY3VzdG9taXplZCB2aXNDb25maWcsIGFuZCBoYXMgdHlwZSAmJiBkZWZhdWx0VmFsdWVcbiAgICAgICAgLy8gVE9ETzogZnVydGhlciBjaGVjayBpZiBjdXN0b21pemVkIHZpc0NvbmZpZyBpcyB2YWxpZFxuICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWdbaXRlbV0gPSBsYXllclZpc0NvbmZpZ3NbaXRlbV0uZGVmYXVsdFZhbHVlO1xuICAgICAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW2l0ZW1dID0gbGF5ZXJWaXNDb25maWdzW2l0ZW1dO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGF5ZXJDb2x1bW5zKCkge1xuICAgIGNvbnN0IGNvbHVtblZhbGlkYXRvcnMgPSB0aGlzLmNvbHVtblZhbGlkYXRvcnMgfHwge307XG4gICAgY29uc3QgcmVxdWlyZWQgPSB0aGlzLnJlcXVpcmVkTGF5ZXJDb2x1bW5zLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiBjb2x1bW5WYWxpZGF0b3JzW2tleV1cbiAgICAgICAgICA/IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCB2YWxpZGF0b3I6IGNvbHVtblZhbGlkYXRvcnNba2V5XX1cbiAgICAgICAgICA6IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xfVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG4gICAgY29uc3Qgb3B0aW9uYWwgPSB0aGlzLm9wdGlvbmFsQ29sdW1ucy5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICBba2V5XToge3ZhbHVlOiBudWxsLCBmaWVsZElkeDogLTEsIG9wdGlvbmFsOiB0cnVlfVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgICByZXR1cm4gey4uLnJlcXVpcmVkLCAuLi5vcHRpb25hbH07XG4gIH1cblxuICB1cGRhdGVMYXllckNvbmZpZyhuZXdDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHsuLi50aGlzLmNvbmZpZywgLi4ubmV3Q29uZmlnfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVwZGF0ZUxheWVyVmlzQ29uZmlnKG5ld1Zpc0NvbmZpZykge1xuICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZyA9IHsuLi50aGlzLmNvbmZpZy52aXNDb25maWcsIC4uLm5ld1Zpc0NvbmZpZ307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVMYXllckNvbG9yVUkocHJvcCwgbmV3Q29uZmlnKSB7XG4gICAgY29uc3Qge2NvbG9yVUk6IHByZXZpb3VzLCB2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG5cbiAgICBpZiAoIWlzUGxhaW5PYmplY3QobmV3Q29uZmlnKSB8fCB0eXBlb2YgcHJvcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbG9yVUlQcm9wID0gT2JqZWN0LmVudHJpZXMobmV3Q29uZmlnKS5yZWR1Y2UoKGFjY3UsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IGlzUGxhaW5PYmplY3QoYWNjdVtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHsuLi5hY2N1W2tleV0sIC4uLnZhbHVlfSA6IHZhbHVlXG4gICAgICB9O1xuICAgIH0sIHByZXZpb3VzW3Byb3BdIHx8IERFRkFVTFRfQ09MT1JfVUkpO1xuXG4gICAgY29uc3QgY29sb3JVSSA9IHtcbiAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgW3Byb3BdOiBjb2xvclVJUHJvcFxuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtjb2xvclVJfSk7XG4gICAgLy8gaWYgY29sb3JVSVtwcm9wXSBpcyBjb2xvclJhbmdlXG4gICAgY29uc3QgaXNDb2xvclJhbmdlID0gdmlzQ29uZmlnW3Byb3BdICYmIHZpc0NvbmZpZ1twcm9wXS5jb2xvcnM7XG5cbiAgICBpZiAoaXNDb2xvclJhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbG9yVUlCeUNvbG9yUmFuZ2UobmV3Q29uZmlnLCBwcm9wKTtcbiAgICAgIHRoaXMudXBkYXRlQ29sb3JSYW5nZUJ5Q29sb3JVSShuZXdDb25maWcsIHByZXZpb3VzLCBwcm9wKTtcbiAgICAgIHRoaXMudXBkYXRlQ3VzdG9tUGFsZXR0ZShuZXdDb25maWcsIHByZXZpb3VzLCBwcm9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVwZGF0ZUN1c3RvbVBhbGV0dGUobmV3Q29uZmlnLCBwcmV2aW91cywgcHJvcCkge1xuICAgIGlmICghbmV3Q29uZmlnLmNvbG9yUmFuZ2VDb25maWcgfHwgIW5ld0NvbmZpZy5jb2xvclJhbmdlQ29uZmlnLmN1c3RvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtjb2xvclVJLCB2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG5cbiAgICBpZiAoIXZpc0NvbmZpZ1twcm9wXSkgcmV0dXJuO1xuICAgIGNvbnN0IHtjb2xvcnN9ID0gdmlzQ29uZmlnW3Byb3BdO1xuICAgIGNvbnN0IGN1c3RvbVBhbGV0dGUgPSB7XG4gICAgICAuLi5jb2xvclVJW3Byb3BdLmN1c3RvbVBhbGV0dGUsXG4gICAgICBuYW1lOiAnQ3VzdG9tIFBhbGV0dGUnLFxuICAgICAgY29sb3JzOiBbLi4uY29sb3JzXVxuICAgIH07XG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7XG4gICAgICBjb2xvclVJOiB7XG4gICAgICAgIC4uLmNvbG9yVUksXG4gICAgICAgIFtwcm9wXToge1xuICAgICAgICAgIC4uLmNvbG9yVUlbcHJvcF0sXG4gICAgICAgICAgY3VzdG9tUGFsZXR0ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIGlmIG9wZW4gZHJvcGRvd24gYW5kIHByb3AgaXMgY29sb3IgcmFuZ2VcbiAgICogQXV0b21hdGljYWxseSBzZXQgY29sb3JSYW5nZUNvbmZpZydzIHN0ZXAgYW5kIHJldmVyc2VkXG4gICAqIEBwYXJhbSB7Kn0gbmV3Q29uZmlnXG4gICAqIEBwYXJhbSB7Kn0gcHJvcFxuICAgKi9cbiAgdXBkYXRlQ29sb3JVSUJ5Q29sb3JSYW5nZShuZXdDb25maWcsIHByb3ApIHtcbiAgICBpZiAodHlwZW9mIG5ld0NvbmZpZy5zaG93RHJvcGRvd24gIT09ICdudW1iZXInKSByZXR1cm47XG5cbiAgICBjb25zdCB7Y29sb3JVSSwgdmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgICAgY29sb3JVSToge1xuICAgICAgICAuLi5jb2xvclVJLFxuICAgICAgICBbcHJvcF06IHtcbiAgICAgICAgICAuLi5jb2xvclVJW3Byb3BdLFxuICAgICAgICAgIGNvbG9yUmFuZ2VDb25maWc6IHtcbiAgICAgICAgICAgIC4uLmNvbG9yVUlbcHJvcF0uY29sb3JSYW5nZUNvbmZpZyxcbiAgICAgICAgICAgIHN0ZXBzOiB2aXNDb25maWdbcHJvcF0uY29sb3JzLmxlbmd0aCxcbiAgICAgICAgICAgIHJldmVyc2VkOiBCb29sZWFuKHZpc0NvbmZpZ1twcm9wXS5yZXZlcnNlZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUNvbG9yUmFuZ2VCeUNvbG9yVUkobmV3Q29uZmlnLCBwcmV2aW91cywgcHJvcCkge1xuICAgIC8vIG9ubHkgdXBkYXRlIGNvbG9yUmFuZ2UgaWYgY2hhbmdlcyBpbiBVSSBpcyBtYWRlIHRvICdyZXZlcnNlZCcsICdzdGVwcycgb3Igc3RlcHNcbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPVxuICAgICAgbmV3Q29uZmlnLmNvbG9yUmFuZ2VDb25maWcgJiZcbiAgICAgIFsncmV2ZXJzZWQnLCAnc3RlcHMnXS5zb21lKFxuICAgICAgICBrZXkgPT5cbiAgICAgICAgICBuZXdDb25maWcuY29sb3JSYW5nZUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICAgICAgbmV3Q29uZmlnLmNvbG9yUmFuZ2VDb25maWdba2V5XSAhPT1cbiAgICAgICAgICAgIChwcmV2aW91c1twcm9wXSB8fCBERUZBVUxUX0NPTE9SX1VJKS5jb2xvclJhbmdlQ29uZmlnW2tleV1cbiAgICAgICk7XG4gICAgaWYgKCFzaG91bGRVcGRhdGUpIHJldHVybjtcblxuICAgIGNvbnN0IHtjb2xvclVJLCB2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3Qge3N0ZXBzLCByZXZlcnNlZH0gPSBjb2xvclVJW3Byb3BdLmNvbG9yUmFuZ2VDb25maWc7XG4gICAgY29uc3QgY29sb3JSYW5nZSA9IHZpc0NvbmZpZ1twcm9wXTtcbiAgICAvLyBmaW5kIGJhc2VkIG9uIHN0ZXAgb3IgcmV2ZXJzZWRcbiAgICBsZXQgdXBkYXRlO1xuICAgIGlmIChuZXdDb25maWcuY29sb3JSYW5nZUNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnc3RlcHMnKSkge1xuICAgICAgY29uc3QgZ3JvdXAgPSBnZXRDb2xvckdyb3VwQnlOYW1lKGNvbG9yUmFuZ2UpO1xuXG4gICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgY29uc3Qgc2FtZUdyb3VwID0gQ09MT1JfUkFOR0VTLmZpbHRlcihjciA9PiBnZXRDb2xvckdyb3VwQnlOYW1lKGNyKSA9PT0gZ3JvdXApO1xuXG4gICAgICAgIHVwZGF0ZSA9IHNhbWVHcm91cC5maW5kKGNyID0+IGNyLmNvbG9ycy5sZW5ndGggPT09IHN0ZXBzKTtcblxuICAgICAgICBpZiAodXBkYXRlICYmIGNvbG9yUmFuZ2UucmV2ZXJzZWQpIHtcbiAgICAgICAgICB1cGRhdGUgPSByZXZlcnNlQ29sb3JSYW5nZSh0cnVlLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5ld0NvbmZpZy5jb2xvclJhbmdlQ29uZmlnLmhhc093blByb3BlcnR5KCdyZXZlcnNlZCcpKSB7XG4gICAgICB1cGRhdGUgPSByZXZlcnNlQ29sb3JSYW5nZShyZXZlcnNlZCwgdXBkYXRlIHx8IGNvbG9yUmFuZ2UpO1xuICAgIH1cblxuICAgIGlmICh1cGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJWaXNDb25maWcoe1twcm9wXTogdXBkYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgbGF5ZXIgaGFzIGFsbCBjb2x1bW5zXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIGhhc0FsbENvbHVtbnMoKSB7XG4gICAgY29uc3Qge2NvbHVtbnN9ID0gdGhpcy5jb25maWc7XG4gICAgcmV0dXJuIChcbiAgICAgIChjb2x1bW5zICYmXG4gICAgICBPYmplY3QudmFsdWVzKGNvbHVtbnMpLmV2ZXJ5KHYgPT4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih2Lm9wdGlvbmFsIHx8ICh2LnZhbHVlICYmIHYuZmllbGRJZHggPiAtMSkpO1xuICAgICAgfSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGxheWVyIGhhcyBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkgfCBPYmplY3R9IGxheWVyRGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0geWVzIG9yIG5vXG4gICAqL1xuICBoYXNMYXllckRhdGEobGF5ZXJEYXRhKSB7XG4gICAgaWYgKCFsYXllckRhdGEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIEJvb2xlYW4obGF5ZXJEYXRhLmRhdGEgJiYgbGF5ZXJEYXRhLmRhdGEubGVuZ3RoKTtcbiAgfVxuXG4gIGlzVmFsaWRUb1NhdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSAmJiB0aGlzLmhhc0FsbENvbHVtbnMoKTtcbiAgfVxuXG4gIHNob3VsZFJlbmRlckxheWVyKGRhdGEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMudHlwZSAmJlxuICAgICAgdGhpcy5jb25maWcuaXNWaXNpYmxlICYmXG4gICAgICB0aGlzLmhhc0FsbENvbHVtbnMoKSAmJlxuICAgICAgdGhpcy5oYXNMYXllckRhdGEoZGF0YSkgJiZcbiAgICAgIHR5cGVvZiB0aGlzLnJlbmRlckxheWVyID09PSAnZnVuY3Rpb24nKVxuICAgICk7XG4gIH1cblxuICBnZXRDb2xvclNjYWxlKGNvbG9yU2NhbGUsIGNvbG9yRG9tYWluLCBjb2xvclJhbmdlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sb3JSYW5nZS5jb2xvck1hcCkpIHtcbiAgICAgIGNvbnN0IGNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICBjb2xvclJhbmdlLmNvbG9yTWFwLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgICBjTWFwLnNldChrLCB0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyBoZXhUb1JnYih2KSA6IHYpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gU0NBTEVfRlVOQ1tTQ0FMRV9UWVBFUy5vcmRpbmFsXSgpXG4gICAgICAgIC5kb21haW4oY01hcC5rZXlzKCkpXG4gICAgICAgIC5yYW5nZShjTWFwLnZhbHVlcygpKVxuICAgICAgICAudW5rbm93bihjTWFwLmdldChVTktOT1dOX0NPTE9SX0tFWSkgfHwgTk9fVkFMVUVfQ09MT1IpO1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShjb2xvclNjYWxlLCBjb2xvckRvbWFpbiwgY29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKSk7XG4gIH1cblxuICAvKipcbiAgICogTWFwcGluZyBmcm9tIHZpc3VhbCBjaGFubmVscyB0byBkZWNrLmdsIGFjY2Vzb3JzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBQYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcmFtLmRhdGFBY2Nlc3NvciBBY2Nlc3Mga2VwbGVyLmdsIGxheWVyIGRhdGEgZnJvbSBkZWNrLmdsIGxheWVyXG4gICAqIEBwYXJhbSB7aW1wb3J0KCd1dGlscy90YWJsZS11dGlscy9kYXRhLWNvbnRhaW5lci1pbnRlcmZhY2UnKS5EYXRhQ29udGFpbmVySW50ZXJmYWNlfSBwYXJhbS5kYXRhQ29udGFpbmVyIERhdGFDb250YWluZXIgdG8gdXNlIHVzZSB3aXRoIGRhdGFBY2Nlc3NvclxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGF0dHJpYnV0ZUFjY2Vzc29ycyAtIGRlY2suZ2wgbGF5ZXIgYXR0cmlidXRlIGFjY2Vzc29yc1xuICAgKi9cbiAgZ2V0QXR0cmlidXRlQWNjZXNzb3JzKHtkYXRhQWNjZXNzb3IgPSBkZWZhdWx0RGF0YUFjY2Vzc29yLCBkYXRhQ29udGFpbmVyfSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZUFjY2Vzc29ycyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXModGhpcy52aXN1YWxDaGFubmVscykuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmllbGQsXG4gICAgICAgIGZpeGVkLFxuICAgICAgICBzY2FsZSxcbiAgICAgICAgZG9tYWluLFxuICAgICAgICByYW5nZSxcbiAgICAgICAgYWNjZXNzb3IsXG4gICAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWUsXG4gICAgICAgIG51bGxWYWx1ZSxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZVxuICAgICAgfSA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG5cbiAgICAgIGNvbnN0IHNob3VsZEdldFNjYWxlID0gdGhpcy5jb25maWdbZmllbGRdO1xuXG4gICAgICBpZiAoc2hvdWxkR2V0U2NhbGUpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IFt0aGlzLmNvbmZpZ1tzY2FsZV0sIHRoaXMuY29uZmlnW2RvbWFpbl0sIHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tyYW5nZV1dO1xuICAgICAgICBjb25zdCBpc0ZpeGVkID0gZml4ZWQgJiYgdGhpcy5jb25maWcudmlzQ29uZmlnW2ZpeGVkXTtcblxuICAgICAgICBjb25zdCBzY2FsZUZ1bmN0aW9uID1cbiAgICAgICAgICBjaGFubmVsU2NhbGVUeXBlID09PSBDSEFOTkVMX1NDQUxFUy5jb2xvclxuICAgICAgICAgICAgPyB0aGlzLmdldENvbG9yU2NhbGUoLi4uYXJncylcbiAgICAgICAgICAgIDogdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoLi4uYXJncywgaXNGaXhlZCk7XG5cbiAgICAgICAgYXR0cmlidXRlQWNjZXNzb3JzW2FjY2Vzc29yXSA9IGQgPT5cbiAgICAgICAgICB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICBzY2FsZUZ1bmN0aW9uLFxuICAgICAgICAgICAgZGF0YUFjY2Vzc29yKGRhdGFDb250YWluZXIpKGQpLFxuICAgICAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLFxuICAgICAgICAgICAgbnVsbFZhbHVlXG4gICAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGdldEF0dHJpYnV0ZVZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGF0dHJpYnV0ZUFjY2Vzc29yc1thY2Nlc3Nvcl0gPSBnZXRBdHRyaWJ1dGVWYWx1ZSh0aGlzLmNvbmZpZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRyaWJ1dGVBY2Nlc3NvcnNbYWNjZXNzb3JdID1cbiAgICAgICAgICB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nID8gZGVmYXVsdFZhbHVlKHRoaXMuY29uZmlnKSA6IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFhdHRyaWJ1dGVBY2Nlc3NvcnNbYWNjZXNzb3JdKSB7XG4gICAgICAgIENvbnNvbGUud2FybihgRmFpbGVkIHRvIHByb3ZpZGUgYWNjZXNzb3IgZnVuY3Rpb24gZm9yICR7YWNjZXNzb3IgfHwgY2hhbm5lbH1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhdHRyaWJ1dGVBY2Nlc3NvcnM7XG4gIH1cblxuICBnZXRWaXNDaGFubmVsU2NhbGUoc2NhbGUsIGRvbWFpbiwgcmFuZ2UsIGZpeGVkKSB7XG4gICAgcmV0dXJuIFNDQUxFX0ZVTkNbZml4ZWQgPyAnbGluZWFyJyA6IHNjYWxlXSgpXG4gICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgIC5yYW5nZShmaXhlZCA/IGRvbWFpbiA6IHJhbmdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbG9uZ2l0dWRlIGFuZCBsYXRpdHVkZSBib3VuZHMgb2YgdGhlIGRhdGEuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCd1dGlscy90YWJsZS11dGlscy9kYXRhLWNvbnRhaW5lci1pbnRlcmZhY2UnKS5EYXRhQ29udGFpbmVySW50ZXJmYWNlfSBkYXRhQ29udGFpbmVyIERhdGFDb250YWluZXIgdG8gY2FsY3VsYXRlIGJvdW5kcyBmb3IuXG4gICAqIEBwYXJhbSB7KGQ6IHtpbmRleDogbnVtYmVyfSwgZGM6IGltcG9ydCgndXRpbHMvdGFibGUtdXRpbHMvZGF0YS1jb250YWluZXItaW50ZXJmYWNlJykuRGF0YUNvbnRhaW5lckludGVyZmFjZSkgPT4gbnVtYmVyW119IGdldFBvc2l0aW9uIEFjY2VzcyBrZXBsZXIuZ2wgbGF5ZXIgZGF0YSBmcm9tIGRlY2suZ2wgbGF5ZXJcbiAgICogQHJldHVybiB7bnVtYmVyW118bnVsbH0gYm91bmRzIG9mIHRoZSBkYXRhLlxuICAgKi9cbiAgZ2V0UG9pbnRzQm91bmRzKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlIGVudGlyZSBkYXRhc2V0XG4gICAgLy8gZ2V0IGEgc2FtcGxlIG9mIGRhdGEgdG8gY2FsY3VsYXRlIGJvdW5kc1xuICAgIGNvbnN0IHNhbXBsZURhdGEgPVxuICAgICAgZGF0YUNvbnRhaW5lci5udW1Sb3dzKCkgPiBNQVhfU0FNUExFX1NJWkVcbiAgICAgICAgPyBnZXRTYW1wbGVEYXRhKGRhdGFDb250YWluZXIsIE1BWF9TQU1QTEVfU0laRSlcbiAgICAgICAgOiBkYXRhQ29udGFpbmVyO1xuXG4gICAgY29uc3QgcG9pbnRzID0gc2FtcGxlRGF0YS5tYXBJbmRleChnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBsYXRCb3VuZHMgPSBnZXRMYXRMbmdCb3VuZHMocG9pbnRzLCAxLCBbLTkwLCA5MF0pO1xuICAgIGNvbnN0IGxuZ0JvdW5kcyA9IGdldExhdExuZ0JvdW5kcyhwb2ludHMsIDAsIFstMTgwLCAxODBdKTtcblxuICAgIGlmICghbGF0Qm91bmRzIHx8ICFsbmdCb3VuZHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBbbG5nQm91bmRzWzBdLCBsYXRCb3VuZHNbMF0sIGxuZ0JvdW5kc1sxXSwgbGF0Qm91bmRzWzFdXTtcbiAgfVxuXG4gIGdldENoYW5nZWRUcmlnZ2VycyhkYXRhVXBkYXRlVHJpZ2dlcnMpIHtcbiAgICBjb25zdCB0cmlnZ2VyQ2hhbmdlZCA9IGRpZmZVcGRhdGVUcmlnZ2VycyhkYXRhVXBkYXRlVHJpZ2dlcnMsIHRoaXMuX29sZERhdGFVcGRhdGVUcmlnZ2Vycyk7XG4gICAgdGhpcy5fb2xkRGF0YVVwZGF0ZVRyaWdnZXJzID0gZGF0YVVwZGF0ZVRyaWdnZXJzO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJDaGFuZ2VkO1xuICB9XG5cbiAgZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICBzY2FsZSxcbiAgICBkYXRhLFxuICAgIGZpZWxkLFxuICAgIG51bGxWYWx1ZSA9IE5PX1ZBTFVFX0NPTE9SLFxuICAgIGdldFZhbHVlID0gZGVmYXVsdEdldEZpZWxkVmFsdWVcbiAgKSB7XG4gICAgY29uc3Qge3R5cGV9ID0gZmllbGQ7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShmaWVsZCwgZGF0YSk7XG5cbiAgICBpZiAoIW5vdE51bGxvclVuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBudWxsVmFsdWU7XG4gICAgfVxuXG4gICAgbGV0IGF0dHJpYnV0ZVZhbHVlO1xuICAgIGlmICh0eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wKSB7XG4gICAgICAvLyBzaG91bGRuJ3QgbmVlZCB0byBjb252ZXJ0IGhlcmVcbiAgICAgIC8vIHNjYWxlIEZ1bmN0aW9uIHNob3VsZCB0YWtlIGNhcmUgb2YgaXRcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gc2NhbGUobmV3IERhdGUodmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0cmlidXRlVmFsdWUgPSBzY2FsZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCFub3ROdWxsb3JVbmRlZmluZWQoYXR0cmlidXRlVmFsdWUpKSB7XG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IG51bGxWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlidXRlVmFsdWU7XG4gIH1cblxuICB1cGRhdGVNZXRhKG1ldGEpIHtcbiAgICB0aGlzLm1ldGEgPSB7Li4udGhpcy5tZXRhLCAuLi5tZXRhfTtcbiAgfVxuXG4gIGdldERhdGFVcGRhdGVUcmlnZ2Vycyh7ZmlsdGVyZWRJbmRleCwgaWQsIGFsbERhdGF9KSB7XG4gICAgY29uc3Qge2NvbHVtbnN9ID0gdGhpcy5jb25maWc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0RGF0YToge2RhdGFzZXRJZDogaWQsIGFsbERhdGEsIGNvbHVtbnMsIGZpbHRlcmVkSW5kZXh9LFxuICAgICAgZ2V0TWV0YToge2RhdGFzZXRJZDogaWQsIGFsbERhdGEsIGNvbHVtbnN9LFxuICAgICAgLi4uKHRoaXMuY29uZmlnLnRleHRMYWJlbCB8fCBbXSkucmVkdWNlKFxuICAgICAgICAoYWNjdSwgdGwsIGkpID0+ICh7XG4gICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICBbYGdldExhYmVsQ2hhcmFjdGVyU2V0LSR7aX1gXTogdGwuZmllbGQgPyB0bC5maWVsZC5uYW1lIDogbnVsbFxuICAgICAgICB9KSxcbiAgICAgICAge31cbiAgICAgIClcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlRGF0YShkYXRhc2V0cywgb2xkTGF5ZXJEYXRhKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZSBkYXRhJylcbiAgICBpZiAoIXRoaXMuY29uZmlnLmRhdGFJZCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCBsYXllckRhdGFzZXQgPSBkYXRhc2V0c1t0aGlzLmNvbmZpZy5kYXRhSWRdO1xuICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyfSA9IGxheWVyRGF0YXNldDtcblxuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuICAgIGNvbnN0IGRhdGFVcGRhdGVUcmlnZ2VycyA9IHRoaXMuZ2V0RGF0YVVwZGF0ZVRyaWdnZXJzKGxheWVyRGF0YXNldCk7XG4gICAgY29uc3QgdHJpZ2dlckNoYW5nZWQgPSB0aGlzLmdldENoYW5nZWRUcmlnZ2VycyhkYXRhVXBkYXRlVHJpZ2dlcnMpO1xuXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2VkLmdldE1ldGEpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGRhdGFDb250YWluZXIsIGdldFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFtdO1xuXG4gICAgaWYgKCF0cmlnZ2VyQ2hhbmdlZC5nZXREYXRhICYmIG9sZExheWVyRGF0YSAmJiBvbGRMYXllckRhdGEuZGF0YSkge1xuICAgICAgLy8gc2FtZSBkYXRhXG4gICAgICBkYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0aGlzLmNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUobGF5ZXJEYXRhc2V0LCBnZXRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtkYXRhLCB0cmlnZ2VyQ2hhbmdlZH07XG4gIH1cblxuICAvKipcbiAgICogaGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBvbmUgbGF5ZXIgZG9tYWluIHdoZW4gc3RhdGUuZGF0YSBjaGFuZ2VkXG4gICAqIGlmIHN0YXRlLmRhdGEgY2hhbmdlIGlzIGR1ZSBvdCB1cGRhdGUgZmlsdGVyLCBuZXdGaWxlciB3aWxsIGJlIHBhc3NlZFxuICAgKiBjYWxsZWQgYnkgdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gbmV3RmlsdGVyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGxheWVyXG4gICAqL1xuICB1cGRhdGVMYXllckRvbWFpbihkYXRhc2V0cywgbmV3RmlsdGVyKSB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLmdldERhdGFzZXQoZGF0YXNldHMpO1xuICAgIGlmICghdGFibGUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICBjb25zdCB7c2NhbGV9ID0gY2hhbm5lbDtcbiAgICAgIGNvbnN0IHNjYWxlVHlwZSA9IHRoaXMuY29uZmlnW3NjYWxlXTtcbiAgICAgIC8vIG9yZGluYWwgZG9tYWluIGlzIGJhc2VkIG9uIGRhdGFDb250YWluZXIsIGlmIG9ubHkgZmlsdGVyIGNoYW5nZWRcbiAgICAgIC8vIG5vIG5lZWQgdG8gdXBkYXRlIG9yZGluYWwgZG9tYWluXG4gICAgICBpZiAoIW5ld0ZpbHRlciB8fCBzY2FsZVR5cGUgIT09IFNDQUxFX1RZUEVTLm9yZGluYWwpIHtcbiAgICAgICAgY29uc3Qge2RvbWFpbn0gPSBjaGFubmVsO1xuICAgICAgICBjb25zdCB1cGRhdGVkRG9tYWluID0gdGhpcy5jYWxjdWxhdGVMYXllckRvbWFpbih0YWJsZSwgY2hhbm5lbCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tkb21haW5dOiB1cGRhdGVkRG9tYWlufSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldERhdGFzZXQoZGF0YXNldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGF0YUlkID8gZGF0YXNldHNbdGhpcy5jb25maWcuZGF0YUlkXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdmlzdWFsIGNoYW5uZWwgZmllbGQgYW5kIHNjYWxlcyBiYXNlZCBvbiBzdXBwb3J0ZWQgZmllbGQgJiBzY2FsZSB0eXBlXG4gICAqIEBwYXJhbSBjaGFubmVsXG4gICAqL1xuICB2YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCkge1xuICAgIHRoaXMudmFsaWRhdGVGaWVsZFR5cGUoY2hhbm5lbCk7XG4gICAgdGhpcy52YWxpZGF0ZVNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGZpZWxkIHR5cGUgYmFzZWQgb24gY2hhbm5lbFNjYWxlVHlwZVxuICAgKi9cbiAgdmFsaWRhdGVGaWVsZFR5cGUoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgY2hhbm5lbFNjYWxlVHlwZSwgc3VwcG9ydGVkRmllbGRUeXBlc30gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnW2ZpZWxkXSkge1xuICAgICAgLy8gaWYgZmllbGQgaXMgc2VsZWN0ZWQsIGNoZWNrIGlmIGZpZWxkIHR5cGUgaXMgc3VwcG9ydGVkXG4gICAgICBjb25zdCBjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyA9XG4gICAgICAgIHN1cHBvcnRlZEZpZWxkVHlwZXMgfHwgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTW2NoYW5uZWxTY2FsZVR5cGVdO1xuXG4gICAgICBpZiAoIWNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHRoaXMuY29uZmlnW2ZpZWxkXS50eXBlKSkge1xuICAgICAgICAvLyBmaWVsZCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQsIHNldCBpdCBiYWNrIHRvIG51bGxcbiAgICAgICAgLy8gc2V0IHNjYWxlIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbZmllbGRdOiBudWxsfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHNjYWxlIHR5cGUgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICovXG4gIHZhbGlkYXRlU2NhbGUoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtzY2FsZX0gPSB2aXN1YWxDaGFubmVsO1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIC8vIHZpc3VhbENoYW5uZWwgZG9lc24ndCBoYXZlIHNjYWxlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNjYWxlT3B0aW9ucyA9IHRoaXMuZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpO1xuICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgc2VsZWN0ZWQgc2NhbGUgaXNcbiAgICAvLyBzdXBwb3J0ZWQsIGlmIG5vdCwgY2hhbmdlIHRvIGRlZmF1bHRcbiAgICBpZiAoIXNjYWxlT3B0aW9ucy5pbmNsdWRlcyh0aGlzLmNvbmZpZ1tzY2FsZV0pKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbc2NhbGVdOiBzY2FsZU9wdGlvbnNbMF19KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gY3VycmVudCBmaWVsZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbFxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuICBnZXRTY2FsZU9wdGlvbnMoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgc2NhbGUsIGNoYW5uZWxTY2FsZVR5cGV9ID0gdmlzdWFsQ2hhbm5lbDtcblxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1tmaWVsZF1cbiAgICAgID8gRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV1cbiAgICAgIDogW3RoaXMuZ2V0RGVmYXVsdExheWVyQ29uZmlnKClbc2NhbGVdXTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbChkYXRhc2V0LCBjaGFubmVsKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZSBsYXllciB2aXN1YWwgY2hhbm5lbCcpXG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgdGhpcy52YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCk7XG4gICAgLy8gY2FsY3VsYXRlIGxheWVyIGNoYW5uZWwgZG9tYWluXG4gICAgY29uc3QgdXBkYXRlZERvbWFpbiA9IHRoaXMuY2FsY3VsYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgdmlzdWFsQ2hhbm5lbCk7XG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7W3Zpc3VhbENoYW5uZWwuZG9tYWluXTogdXBkYXRlZERvbWFpbn0pO1xuICB9XG5cbiAgZ2V0VmlzdWFsQ2hhbm5lbFVwZGF0ZVRyaWdnZXJzKCkge1xuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge307XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKHZpc3VhbENoYW5uZWwgPT4ge1xuICAgICAgLy8gZmllbGQgcmFuZ2Ugc2NhbGUgZG9tYWluXG4gICAgICBjb25zdCB7YWNjZXNzb3IsIGZpZWxkLCBzY2FsZSwgZG9tYWluLCByYW5nZSwgZGVmYXVsdFZhbHVlLCBmaXhlZH0gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgICB1cGRhdGVUcmlnZ2Vyc1thY2Nlc3Nvcl0gPSB7XG4gICAgICAgIFtmaWVsZF06IHRoaXMuY29uZmlnW2ZpZWxkXSxcbiAgICAgICAgW3NjYWxlXTogdGhpcy5jb25maWdbc2NhbGVdLFxuICAgICAgICBbZG9tYWluXTogdGhpcy5jb25maWdbZG9tYWluXSxcbiAgICAgICAgW3JhbmdlXTogdGhpcy5jb25maWcudmlzQ29uZmlnW3JhbmdlXSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nID8gZGVmYXVsdFZhbHVlKHRoaXMuY29uZmlnKSA6IGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgLi4uKGZpeGVkID8ge1tmaXhlZF06IHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tmaXhlZF19IDoge30pXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiB1cGRhdGVUcmlnZ2VycztcbiAgfVxuXG4gIGNhbGN1bGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIHZpc3VhbENoYW5uZWwpIHtcbiAgICBjb25zdCB7c2NhbGV9ID0gdmlzdWFsQ2hhbm5lbDtcbiAgICBjb25zdCBzY2FsZVR5cGUgPSB0aGlzLmNvbmZpZ1tzY2FsZV07XG5cbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuY29uZmlnW3Zpc3VhbENoYW5uZWwuZmllbGRdO1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIC8vIGlmIGNvbG9yRmllbGQgb3Igc2l6ZUZpZWxkIHdlcmUgc2V0IGJhY2sgdG8gbnVsbFxuICAgICAgcmV0dXJuIGRlZmF1bHREb21haW47XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFzZXQuZ2V0Q29sdW1uTGF5ZXJEb21haW4oZmllbGQsIHNjYWxlVHlwZSkgfHwgZGVmYXVsdERvbWFpbjtcbiAgfVxuXG4gIGhhc0hvdmVyZWRPYmplY3Qob2JqZWN0SW5mbykge1xuICAgIHJldHVybiB0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEluZm8pICYmIG9iamVjdEluZm8ub2JqZWN0ID8gb2JqZWN0SW5mby5vYmplY3QgOiBudWxsO1xuICB9XG5cbiAgaXNMYXllckhvdmVyZWQob2JqZWN0SW5mbykge1xuICAgIHJldHVybiBvYmplY3RJbmZvPy5waWNrZWQgJiYgb2JqZWN0SW5mbz8ubGF5ZXI/LnByb3BzPy5pZCA9PT0gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFJhZGl1c1NjYWxlQnlab29tKG1hcFN0YXRlLCBmaXhlZFJhZGl1cykge1xuICAgIGNvbnN0IHJhZGl1c0NoYW5uZWwgPSBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZpbmQodmMgPT4gdmMucHJvcGVydHkgPT09ICdyYWRpdXMnKTtcblxuICAgIGlmICghcmFkaXVzQ2hhbm5lbCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSByYWRpdXNDaGFubmVsLmZpZWxkO1xuICAgIGNvbnN0IGZpeGVkID0gZml4ZWRSYWRpdXMgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5maXhlZFJhZGl1cyA6IGZpeGVkUmFkaXVzO1xuICAgIGNvbnN0IHtyYWRpdXN9ID0gdGhpcy5jb25maWcudmlzQ29uZmlnO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBmaXhlZCA/IDEgOiAodGhpcy5jb25maWdbZmllbGRdID8gMSA6IHJhZGl1cykgKiB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICB9XG5cbiAgc2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhKHByb3BzKSB7XG4gICAgcmV0dXJuIHByb3BzLnNvbWUocCA9PiAhdGhpcy5ub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMuaW5jbHVkZXMocCkpO1xuICB9XG5cbiAgZ2V0QnJ1c2hpbmdFeHRlbnNpb25Qcm9wcyhpbnRlcmFjdGlvbkNvbmZpZywgYnJ1c2hpbmdUYXJnZXQpIHtcbiAgICBjb25zdCB7YnJ1c2h9ID0gaW50ZXJhY3Rpb25Db25maWc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gYnJ1c2hpbmdcbiAgICAgIGF1dG9IaWdobGlnaHQ6ICFicnVzaC5lbmFibGVkLFxuICAgICAgYnJ1c2hpbmdSYWRpdXM6IGJydXNoLmNvbmZpZy5zaXplICogMTAwMCxcbiAgICAgIGJydXNoaW5nVGFyZ2V0OiBicnVzaGluZ1RhcmdldCB8fCAnc291cmNlJyxcbiAgICAgIGJydXNoaW5nRW5hYmxlZDogYnJ1c2guZW5hYmxlZFxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0RGVja0xheWVyUHJvcHMoe2lkeCwgZ3B1RmlsdGVyLCBtYXBTdGF0ZX0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBpZHgsXG4gICAgICBjb29yZGluYXRlU3lzdGVtOiBDT09SRElOQVRFX1NZU1RFTS5MTkdMQVQsXG4gICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgIHdyYXBMb25naXR1ZGU6IHRydWUsXG4gICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBCb29sZWFuKG1hcFN0YXRlLmRyYWdSb3RhdGUgfHwgdGhpcy5jb25maWcudmlzQ29uZmlnLmVuYWJsZTNkKX0sXG4gICAgICBoaWRkZW46IHRoaXMuY29uZmlnLmhpZGRlbixcbiAgICAgIC8vIHZpc2NvbmZpZ1xuICAgICAgb3BhY2l0eTogdGhpcy5jb25maWcudmlzQ29uZmlnLm9wYWNpdHksXG4gICAgICBoaWdobGlnaHRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAvLyBkYXRhIGZpbHRlcmluZ1xuICAgICAgZXh0ZW5zaW9uczogW2RhdGFGaWx0ZXJFeHRlbnNpb25dLFxuICAgICAgZmlsdGVyUmFuZ2U6IGdwdUZpbHRlciA/IGdwdUZpbHRlci5maWx0ZXJSYW5nZSA6IHVuZGVmaW5lZFxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0SG92ZXJMYXllclByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogYCR7dGhpcy5pZH0taG92ZXJlZGAsXG4gICAgICBwaWNrYWJsZTogZmFsc2UsXG4gICAgICB3cmFwTG9uZ2l0dWRlOiB0cnVlLFxuICAgICAgY29vcmRpbmF0ZVN5c3RlbTogQ09PUkRJTkFURV9TWVNURU0uTE5HTEFUXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlclRleHRMYWJlbExheWVyKHtnZXRQb3NpdGlvbiwgZ2V0UGl4ZWxPZmZzZXQsIHVwZGF0ZVRyaWdnZXJzLCBzaGFyZWRQcm9wc30sIHJlbmRlck9wdHMpIHtcbiAgICBjb25zdCB7ZGF0YSwgbWFwU3RhdGV9ID0gcmVuZGVyT3B0cztcbiAgICBjb25zdCB7dGV4dExhYmVsfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgcmV0dXJuIGRhdGEudGV4dExhYmVscy5yZWR1Y2UoKGFjY3UsIGQsIGkpID0+IHtcbiAgICAgIGlmIChkLmdldFRleHQpIHtcbiAgICAgICAgYWNjdS5wdXNoKFxuICAgICAgICAgIG5ldyBUZXh0TGF5ZXIoe1xuICAgICAgICAgICAgLi4uc2hhcmVkUHJvcHMsXG4gICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0tbGFiZWwtJHt0ZXh0TGFiZWxbaV0uZmllbGQ/Lm5hbWV9YCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgIGdldFRleHQ6IGQuZ2V0VGV4dCxcbiAgICAgICAgICAgIGdldFBvc2l0aW9uLFxuICAgICAgICAgICAgY2hhcmFjdGVyU2V0OiBkLmNoYXJhY3RlclNldCxcbiAgICAgICAgICAgIGdldFBpeGVsT2Zmc2V0OiBnZXRQaXhlbE9mZnNldCh0ZXh0TGFiZWxbaV0pLFxuICAgICAgICAgICAgZ2V0U2l6ZTogMSxcbiAgICAgICAgICAgIHNpemVTY2FsZTogdGV4dExhYmVsW2ldLnNpemUsXG4gICAgICAgICAgICBnZXRUZXh0QW5jaG9yOiB0ZXh0TGFiZWxbaV0uYW5jaG9yLFxuICAgICAgICAgICAgZ2V0QWxpZ25tZW50QmFzZWxpbmU6IHRleHRMYWJlbFtpXS5hbGlnbm1lbnQsXG4gICAgICAgICAgICBnZXRDb2xvcjogdGV4dExhYmVsW2ldLmNvbG9yLFxuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAvLyB0ZXh0IHdpbGwgYWx3YXlzIHNob3cgb24gdG9wIG9mIGFsbCBsYXllcnNcbiAgICAgICAgICAgICAgZGVwdGhUZXN0OiBmYWxzZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0RmlsdGVyVmFsdWU6IGRhdGEuZ2V0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICB1cGRhdGVUcmlnZ2Vyczoge1xuICAgICAgICAgICAgICAuLi51cGRhdGVUcmlnZ2VycyxcbiAgICAgICAgICAgICAgZ2V0VGV4dDogdGV4dExhYmVsW2ldLmZpZWxkPy5uYW1lLFxuICAgICAgICAgICAgICBnZXRQaXhlbE9mZnNldDoge1xuICAgICAgICAgICAgICAgIC4uLnVwZGF0ZVRyaWdnZXJzLmdldFJhZGl1cyxcbiAgICAgICAgICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgICAgICAgICBhbmNob3I6IHRleHRMYWJlbFtpXS5hbmNob3IsXG4gICAgICAgICAgICAgICAgYWxpZ25tZW50OiB0ZXh0TGFiZWxbaV0uYWxpZ25tZW50XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGdldFRleHRBbmNob3I6IHRleHRMYWJlbFtpXS5hbmNob3IsXG4gICAgICAgICAgICAgIGdldEFsaWdubWVudEJhc2VsaW5lOiB0ZXh0TGFiZWxbaV0uYWxpZ25tZW50LFxuICAgICAgICAgICAgICBnZXRDb2xvcjogdGV4dExhYmVsW2ldLmNvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURhdGFBdHRyaWJ1dGUoa2VwbGVyVGFibGUsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gaW1wbGVtZW50ZWQgaW4gc3ViY2xhc3Nlc1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyTWV0YShkYXRhQ29udGFpbmVyLCBnZXRQb3NpdGlvbikge1xuICAgIC8vIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfVxuXG4gIGdldFBvc2l0aW9uQWNjZXNzb3IoZGF0YUNvbnRhaW5lcikge1xuICAgIC8vIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXllcjtcbiJdfQ==