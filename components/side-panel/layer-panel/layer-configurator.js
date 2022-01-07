"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LayerConfiguratorFactory;
exports.ChannelByValueSelectorFactory = ChannelByValueSelectorFactory;
exports.AggregationTypeSelector = exports.AggrScaleSelector = exports.LayerColorRangeSelector = exports.ArcLayerColorSelector = exports.LayerColorSelector = exports.HowToButton = exports.getLayerChannelConfigProps = exports.getVisConfiguratorProps = exports.getLayerConfiguratorProps = exports.getLayerDataset = exports.getLayerFields = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _localization = require("../../../localization");

var _styledComponents2 = require("../../common/styled-components");

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _visConfigByFieldSelector = _interopRequireDefault(require("./vis-config-by-field-selector"));

var _layerColumnConfig = _interopRequireDefault(require("./layer-column-config"));

var _layerTypeSelector = _interopRequireDefault(require("./layer-type-selector"));

var _dimensionScaleSelector = _interopRequireDefault(require("./dimension-scale-selector"));

var _colorSelector = _interopRequireDefault(require("./color-selector"));

var _sourceDataSelector = _interopRequireDefault(require("../common/source-data-selector"));

var _visConfigSwitch = _interopRequireDefault(require("./vis-config-switch"));

var _visConfigSlider = _interopRequireDefault(require("./vis-config-slider"));

var _layerConfigGroup = _interopRequireWildcard(require("./layer-config-group"));

var _textLabelPanel = _interopRequireDefault(require("./text-label-panel"));

var _utils = require("../../../utils/utils");

var _defaultSettings = require("../../../constants/default-settings");

var _types = require("../../../layers/types");

var _templateObject, _templateObject2, _templateObject3;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var StyledLayerConfigurator = _styledComponents["default"].div.attrs({
  className: 'layer-panel__config'
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  margin-top: ", ";\n  padding: ", ";\n  border-left: ", " dashed\n    ", ";\n"])), function (props) {
  return props.theme.layerConfiguratorMargin;
}, function (props) {
  return props.theme.layerConfiguratorPadding;
}, function (props) {
  return props.theme.layerConfiguratorBorder;
}, function (props) {
  return props.theme.layerConfiguratorBorderColor;
});

var StyledLayerVisualConfigurator = _styledComponents["default"].div.attrs({
  className: 'layer-panel__config__visualC-config'
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 12px;\n"])));

var getLayerFields = function getLayerFields(datasets, layer) {
  return layer.config && datasets[layer.config.dataId] ? datasets[layer.config.dataId].fields : [];
};

exports.getLayerFields = getLayerFields;

var getLayerDataset = function getLayerDataset(datasets, layer) {
  return layer.config && datasets[layer.config.dataId] ? datasets[layer.config.dataId] : null;
};

exports.getLayerDataset = getLayerDataset;

var getLayerConfiguratorProps = function getLayerConfiguratorProps(props) {
  return {
    layer: props.layer,
    fields: getLayerFields(props.datasets, props.layer),
    onChange: props.updateLayerConfig,
    setColorUI: props.updateLayerColorUI
  };
};

exports.getLayerConfiguratorProps = getLayerConfiguratorProps;

var getVisConfiguratorProps = function getVisConfiguratorProps(props) {
  return {
    layer: props.layer,
    fields: getLayerFields(props.datasets, props.layer),
    onChange: props.updateLayerVisConfig,
    setColorUI: props.updateLayerColorUI
  };
};

exports.getVisConfiguratorProps = getVisConfiguratorProps;

var getLayerChannelConfigProps = function getLayerChannelConfigProps(props) {
  return {
    layer: props.layer,
    fields: getLayerFields(props.datasets, props.layer),
    onChange: props.updateLayerVisualChannelConfig
  };
};

exports.getLayerChannelConfigProps = getLayerChannelConfigProps;
LayerConfiguratorFactory.deps = [_sourceDataSelector["default"], _visConfigSlider["default"], _textLabelPanel["default"], _layerConfigGroup["default"], ChannelByValueSelectorFactory, _layerColumnConfig["default"], _layerTypeSelector["default"], _visConfigSwitch["default"]];

function LayerConfiguratorFactory(SourceDataSelector, VisConfigSlider, TextLabelPanel, LayerConfigGroup, ChannelByValueSelector, LayerColumnConfig, LayerTypeSelector, VisConfigSwitch) {
  var LayerConfigurator = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(LayerConfigurator, _Component);

    var _super = _createSuper(LayerConfigurator);

    function LayerConfigurator() {
      (0, _classCallCheck2["default"])(this, LayerConfigurator);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(LayerConfigurator, [{
      key: "_renderPointLayerConfig",
      value: function _renderPointLayerConfig(props) {
        console.log('render point layer');
        return this._renderScatterplotLayerConfig(props);
      }
    }, {
      key: "_renderIconLayerConfig",
      value: function _renderIconLayerConfig(props) {
        return this._renderScatterplotLayerConfig(props);
      }
    }, {
      key: "_renderScatterplotLayerConfig",
      value: function _renderScatterplotLayerConfig(_ref) {
        var layer = _ref.layer,
            visConfiguratorProps = _ref.visConfiguratorProps,
            layerChannelConfigProps = _ref.layerChannelConfigProps,
            layerConfiguratorProps = _ref.layerConfiguratorProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled || {
          label: 'layer.color'
        }, visConfiguratorProps, {
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), layer.type === _types.LAYER_TYPES.point ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.outline, visConfiguratorProps, {
          collapsible: true
        }), layer.config.strokeColorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          property: "strokeColorRange"
        })) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.strokeColor
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          disabled: !layer.config.visConfig.outline
        })))) : null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, !layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
          label: false,
          disabled: Boolean(layer.config.sizeField)
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps, {
          label: false,
          disabled: !layer.config.sizeField || layer.config.visConfig.fixedRadius
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.fixedRadius, visConfiguratorProps)) : null)), /*#__PURE__*/_react["default"].createElement(TextLabelPanel, {
          fields: visConfiguratorProps.fields,
          updateLayerTextLabel: this.props.updateLayerTextLabel,
          textLabel: layer.config.textLabel,
          colorPalette: visConfiguratorProps.colorPalette,
          setColorPaletteUI: visConfiguratorProps.setColorPaletteUI
        }));
      }
    }, {
      key: "_renderClusterLayerConfig",
      value: function _renderClusterLayerConfig(_ref2) {
        var layer = _ref2.layer,
            visConfiguratorProps = _ref2.visConfiguratorProps,
            layerConfiguratorProps = _ref2.layerConfiguratorProps,
            layerChannelConfigProps = _ref2.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(AggrScaleSelector, (0, _extends2["default"])({}, layerConfiguratorProps, {
          channel: layer.visualChannels.color
        })), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
          channel: layer.visualChannels.color
        })) : null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.clusterRadius, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps)))));
      }
    }, {
      key: "_renderHeatmapLayerConfig",
      value: function _renderHeatmapLayerConfig(_ref3) {
        var layer = _ref3.layer,
            visConfiguratorProps = _ref3.visConfiguratorProps,
            layerConfiguratorProps = _ref3.layerConfiguratorProps,
            layerChannelConfigProps = _ref3.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius'
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
          label: false
        }))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.weight'
        }, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.weight
        }, layerChannelConfigProps))));
      }
    }, {
      key: "_renderGridLayerConfig",
      value: function _renderGridLayerConfig(props) {
        return this._renderAggregationLayerConfig(props);
      }
    }, {
      key: "_renderHexagonLayerConfig",
      value: function _renderHexagonLayerConfig(props) {
        return this._renderAggregationLayerConfig(props);
      }
    }, {
      key: "_renderMeshaggLayerConfig",
      value: function _renderMeshaggLayerConfig(props) {
        console.log('render meshcode layer config');
        return this._renderAggregationLayerConfig(props);
      }
    }, {
      key: "_renderMeshcodeLayerConfig",
      value: function _renderMeshcodeLayerConfig(_ref4) {
        var layer = _ref4.layer,
            visConfiguratorProps = _ref4.visConfiguratorProps,
            layerConfiguratorProps = _ref4.layerConfiguratorProps,
            layerChannelConfigProps = _ref4.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)))));
      }
    }, {
      key: "_renderAggregationLayerConfig",
      value: function _renderAggregationLayerConfig(_ref5) {
        var layer = _ref5.layer,
            visConfiguratorProps = _ref5.visConfiguratorProps,
            layerConfiguratorProps = _ref5.layerConfiguratorProps,
            layerChannelConfigProps = _ref5.layerChannelConfigProps;
        console.log('render agg layer config');
        var config = layer.config;
        var enable3d = config.visConfig.enable3d;
        var elevationByDescription = 'layer.elevationByDescription';
        var colorByDescription = 'layer.colorByDescription';
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(AggrScaleSelector, (0, _extends2["default"])({}, layerConfiguratorProps, {
          channel: layer.visualChannels.color
        })), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
          description: colorByDescription,
          channel: layer.visualChannels.color
        })) : null, layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.percentile, visConfiguratorProps)) : null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), layer.visConfigSettings.worldUnitSize && /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.worldUnitSize, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps)))), layer.visConfigSettings.meshLevel &&
        /*#__PURE__*/
        // <ItemSelector >
        _react["default"].createElement(LayerConfigGroup, {
          label: 'layer.meshsize',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.meshLevel, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps)))), layer.visConfigSettings.enable3d ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps, {
          label: "layerVisConfigs.heightMultiplier"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({}, layerChannelConfigProps, {
          channel: layer.visualChannels.size,
          description: elevationByDescription,
          disabled: !enable3d
        })), /*#__PURE__*/_react["default"].createElement(AggrScaleSelector, (0, _extends2["default"])({}, layerConfiguratorProps, {
          channel: layer.visualChannels.size
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps, {
          label: "layerVisConfigs.enableHeightZoomFactor"
        })), layer.visConfigSettings.sizeAggregation.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
          channel: layer.visualChannels.size
        })) : null, layer.visConfigSettings.elevationPercentile.condition(layer.config) ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationPercentile, visConfiguratorProps)) : null)) : null);
      } // TODO: Shan move these into layer class

    }, {
      key: "_renderHexagonIdLayerConfig",
      value: function _renderHexagonIdLayerConfig(_ref6) {
        var layer = _ref6.layer,
            visConfiguratorProps = _ref6.visConfiguratorProps,
            layerConfiguratorProps = _ref6.layerConfiguratorProps,
            layerChannelConfigProps = _ref6.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.coverage',
          collapsible: true
        }, !layer.config.coverageField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.coverageRange, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.coverage
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)))));
      }
    }, {
      key: "_renderArcLayerConfig",
      value: function _renderArcLayerConfig(args) {
        return this._renderLineLayerConfig(args);
      }
    }, {
      key: "_renderLineLayerConfig",
      value: function _renderLineLayerConfig(_ref7) {
        var layer = _ref7.layer,
            visConfiguratorProps = _ref7.visConfiguratorProps,
            layerConfiguratorProps = _ref7.layerConfiguratorProps,
            layerChannelConfigProps = _ref7.layerChannelConfigProps;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(ArcLayerColorSelector, {
          layer: layer,
          setColorUI: layerConfiguratorProps.setColorUI,
          onChangeConfig: layerConfiguratorProps.onChange,
          onChangeVisConfig: visConfiguratorProps.onChange
        }), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.sourceColor
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.stroke',
          collapsible: true
        }, layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          disabled: !layer.config.sizeField,
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), layer.visConfigSettings.elevationScale ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: "layerVisConfigs.elevationScale",
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps))) : null);
      }
    }, {
      key: "_renderTripLayerConfig",
      value: function _renderTripLayerConfig(_ref8) {
        var layer = _ref8.layer,
            visConfiguratorProps = _ref8.visConfiguratorProps,
            layerConfiguratorProps = _ref8.layerConfiguratorProps,
            layerChannelConfigProps = _ref8.layerChannelConfigProps;
        var _layer$meta$featureTy = layer.meta.featureTypes,
            featureTypes = _layer$meta$featureTy === void 0 ? {} : _layer$meta$featureTy;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.color',
          collapsible: true
        }, layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, {
          label: "layer.strokeWidth",
          collapsible: true
        }), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, featureTypes.polygon ? layer.visConfigSettings.stroked : {}, {
          label: "layer.trailLength",
          description: "layer.trailLengthDescription"
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.trailLength, visConfiguratorProps, {
          label: false
        }))));
      }
    }, {
      key: "_renderGeojsonLayerConfig",
      value: function _renderGeojsonLayerConfig(_ref9) {
        var layer = _ref9.layer,
            visConfiguratorProps = _ref9.visConfiguratorProps,
            layerConfiguratorProps = _ref9.layerConfiguratorProps,
            layerChannelConfigProps = _ref9.layerChannelConfigProps;
        var _layer$meta$featureTy2 = layer.meta.featureTypes,
            featureTypes = _layer$meta$featureTy2 === void 0 ? {} : _layer$meta$featureTy2,
            visConfig = layer.config.visConfig;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, featureTypes.polygon || featureTypes.point ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
          label: "layer.fillColor",
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))) : null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.stroked, visConfiguratorProps, {
          label: "layer.strokeColor",
          collapsible: true
        }), layer.config.strokeColorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          property: "strokeColorRange"
        })) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.strokeColor
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.strokeOpacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, featureTypes.polygon ? layer.visConfigSettings.stroked : {}, {
          label: "layer.strokeWidth",
          collapsible: true
        }), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), featureTypes.polygon ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.enable3d, {
          disabled: !visConfig.filled,
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.height
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.wireframe)))) : null, featureTypes.point ? /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.radius',
          collapsible: true
        }, !layer.config.radiusField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
          label: false,
          disabled: Boolean(layer.config.radiusField)
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps, {
          label: false,
          disabled: !layer.config.radiusField
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.radius
        }, layerChannelConfigProps)))) : null);
      }
    }, {
      key: "_render3DLayerConfig",
      value: function _render3DLayerConfig(_ref10) {
        var layer = _ref10.layer,
            visConfiguratorProps = _ref10.visConfiguratorProps;
        return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.3DModel',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(_styledComponents2.Input, {
          type: "file",
          accept: ".glb,.gltf",
          onChange: function onChange(e) {
            if (e.target.files && e.target.files[0]) {
              var url = URL.createObjectURL(e.target.files[0]);
              visConfiguratorProps.onChange({
                scenegraph: url
              });
            }
          }
        })), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.3DModelOptions',
          collapsible: true
        }, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeScale, visConfiguratorProps, {
          disabled: false
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.angleX, visConfiguratorProps, {
          disabled: false
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.angleY, visConfiguratorProps, {
          disabled: false
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.angleZ, visConfiguratorProps, {
          disabled: false
        }))));
      }
    }, {
      key: "_renderS2LayerConfig",
      value: function _renderS2LayerConfig(_ref11) {
        var layer = _ref11.layer,
            visConfiguratorProps = _ref11.visConfiguratorProps,
            layerConfiguratorProps = _ref11.layerConfiguratorProps,
            layerChannelConfigProps = _ref11.layerChannelConfigProps;
        var visConfig = layer.config.visConfig;
        return /*#__PURE__*/_react["default"].createElement(StyledLayerVisualConfigurator, null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
          label: "layer.fillColor",
          collapsible: true
        }), layer.config.colorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, visConfiguratorProps) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, layerConfiguratorProps), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.color
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, layer.visConfigSettings.stroked, visConfiguratorProps, {
          label: "layer.strokeColor",
          collapsible: true
        }), layer.config.strokeColorField ? /*#__PURE__*/_react["default"].createElement(LayerColorRangeSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          property: "strokeColorRange"
        })) : /*#__PURE__*/_react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
          selectedColor: layer.config.visConfig.strokeColor,
          property: "strokeColor"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.strokeColor
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, {
          label: "layer.strokeWidth",
          collapsible: true
        }), layer.config.sizeField ? /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.sizeRange, visConfiguratorProps, {
          label: false
        })) : /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
          label: false
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.size
        }, layerChannelConfigProps)))), /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.enable3d, {
          disabled: !visConfig.filled,
          collapsible: true
        }), /*#__PURE__*/_react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
          channel: layer.visualChannels.height
        }, layerChannelConfigProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps, {
          label: "layerVisConfigs.elevationScale"
        })), /*#__PURE__*/_react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, /*#__PURE__*/_react["default"].createElement(VisConfigSlider, (0, _extends2["default"])({}, layer.visConfigSettings.heightRange, visConfiguratorProps, {
          label: "layerVisConfigs.heightRange"
        })), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, layer.visConfigSettings.enableElevationZoomFactor, visConfiguratorProps)), /*#__PURE__*/_react["default"].createElement(VisConfigSwitch, (0, _extends2["default"])({}, visConfiguratorProps, layer.visConfigSettings.wireframe)))));
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
            layer = _this$props.layer,
            datasets = _this$props.datasets,
            updateLayerConfig = _this$props.updateLayerConfig,
            layerTypeOptions = _this$props.layerTypeOptions,
            updateLayerType = _this$props.updateLayerType;

        var _ref12 = layer.config.dataId ? datasets[layer.config.dataId] : {},
            _ref12$fields = _ref12.fields,
            fields = _ref12$fields === void 0 ? [] : _ref12$fields,
            _ref12$fieldPairs = _ref12.fieldPairs,
            fieldPairs = _ref12$fieldPairs === void 0 ? undefined : _ref12$fieldPairs;

        var config = layer.config;
        var visConfiguratorProps = getVisConfiguratorProps(this.props);
        var layerConfiguratorProps = getLayerConfiguratorProps(this.props);
        var layerChannelConfigProps = getLayerChannelConfigProps(this.props);
        var dataset = getLayerDataset(datasets, layer);
        var renderTemplate = layer.type && "_render".concat((0, _utils.capitalizeFirstLetter)(layer.type), "LayerConfig");
        return /*#__PURE__*/_react["default"].createElement(StyledLayerConfigurator, null, layer.layerInfoModal ? /*#__PURE__*/_react["default"].createElement(HowToButton, {
          onClick: function onClick() {
            return _this.props.openModal(layer.layerInfoModal);
          }
        }) : null, /*#__PURE__*/_react["default"].createElement(LayerConfigGroup, {
          label: 'layer.basic',
          collapsible: true,
          expanded: !layer.hasAllColumns()
        }, /*#__PURE__*/_react["default"].createElement(LayerTypeSelector, {
          datasets: datasets,
          layer: layer,
          layerTypeOptions: layerTypeOptions,
          onSelect: updateLayerType
        }), Object.keys(datasets).length > 1 && /*#__PURE__*/_react["default"].createElement(SourceDataSelector, {
          datasets: datasets,
          id: layer.id,
          dataId: config.dataId,
          onSelect: function onSelect(value) {
            return updateLayerConfig({
              dataId: value
            });
          }
        }), /*#__PURE__*/_react["default"].createElement(LayerColumnConfig, {
          columnPairs: layer.columnPairs,
          columns: layer.config.columns,
          assignColumnPairs: layer.assignColumnPairs.bind(layer),
          assignColumn: layer.assignColumn.bind(layer),
          columnLabels: layer.columnLabels,
          fields: fields,
          fieldPairs: fieldPairs,
          updateLayerConfig: updateLayerConfig,
          updateLayerType: this.props.updateLayerType
        })), this[renderTemplate] && this[renderTemplate]({
          layer: layer,
          dataset: dataset,
          visConfiguratorProps: visConfiguratorProps,
          layerChannelConfigProps: layerChannelConfigProps,
          layerConfiguratorProps: layerConfiguratorProps
        }));
      }
    }]);
    return LayerConfigurator;
  }(_react.Component);

  (0, _defineProperty2["default"])(LayerConfigurator, "propTypes", {
    layer: _propTypes["default"].object.isRequired,
    datasets: _propTypes["default"].object.isRequired,
    layerTypeOptions: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    openModal: _propTypes["default"].func.isRequired,
    updateLayerConfig: _propTypes["default"].func.isRequired,
    updateLayerType: _propTypes["default"].func.isRequired,
    updateLayerVisConfig: _propTypes["default"].func.isRequired,
    updateLayerVisualChannelConfig: _propTypes["default"].func.isRequired,
    updateLayerColorUI: _propTypes["default"].func.isRequired
  });
  return LayerConfigurator;
}
/*
 * Componentize config component into pure functional components
 */


var StyledHowToButton = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  right: 12px;\n  top: -4px;\n"])));

var HowToButton = function HowToButton(_ref13) {
  var onClick = _ref13.onClick;
  return /*#__PURE__*/_react["default"].createElement(StyledHowToButton, null, /*#__PURE__*/_react["default"].createElement(_styledComponents2.Button, {
    link: true,
    small: true,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: 'layerConfiguration.howTo'
  })));
};

exports.HowToButton = HowToButton;

var LayerColorSelector = function LayerColorSelector(_ref14) {
  var layer = _ref14.layer,
      onChange = _ref14.onChange,
      label = _ref14.label,
      selectedColor = _ref14.selectedColor,
      _ref14$property = _ref14.property,
      property = _ref14$property === void 0 ? 'color' : _ref14$property,
      _setColorUI = _ref14.setColorUI;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: selectedColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChange((0, _defineProperty2["default"])({}, property, rgbValue));
      }
    }],
    colorUI: layer.config.colorUI[property],
    setColorUI: function setColorUI(newConfig) {
      return _setColorUI(property, newConfig);
    }
  }));
};

exports.LayerColorSelector = LayerColorSelector;

var ArcLayerColorSelector = function ArcLayerColorSelector(_ref15) {
  var layer = _ref15.layer,
      onChangeConfig = _ref15.onChangeConfig,
      onChangeVisConfig = _ref15.onChangeVisConfig,
      _ref15$property = _ref15.property,
      property = _ref15$property === void 0 ? 'color' : _ref15$property,
      _setColorUI2 = _ref15.setColorUI;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeConfig({
          color: rgbValue
        });
      },
      label: 'Source'
    }, {
      selectedColor: layer.config.visConfig.targetColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeVisConfig({
          targetColor: rgbValue
        });
      },
      label: 'Target'
    }],
    colorUI: layer.config.colorUI[property],
    setColorUI: function setColorUI(newConfig) {
      return _setColorUI2(property, newConfig);
    }
  }));
};

exports.ArcLayerColorSelector = ArcLayerColorSelector;

var LayerColorRangeSelector = function LayerColorRangeSelector(_ref16) {
  var layer = _ref16.layer,
      onChange = _ref16.onChange,
      _ref16$property = _ref16.property,
      property = _ref16$property === void 0 ? 'colorRange' : _ref16$property,
      _setColorUI3 = _ref16.setColorUI;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: layer.config.visConfig[property],
      isRange: true,
      setColor: function setColor(colorRange) {
        return onChange((0, _defineProperty2["default"])({}, property, colorRange));
      }
    }],
    colorUI: layer.config.colorUI[property],
    setColorUI: function setColorUI(newConfig) {
      return _setColorUI3(property, newConfig);
    }
  }));
};

exports.LayerColorRangeSelector = LayerColorRangeSelector;
ChannelByValueSelectorFactory.deps = [_visConfigByFieldSelector["default"]];

function ChannelByValueSelectorFactory(VisConfigByFieldSelector) {
  var ChannelByValueSelector = function ChannelByValueSelector(_ref17) {
    var layer = _ref17.layer,
        channel = _ref17.channel,
        onChange = _ref17.onChange,
        fields = _ref17.fields,
        description = _ref17.description;
    var channelScaleType = channel.channelScaleType,
        domain = channel.domain,
        field = channel.field,
        key = channel.key,
        property = channel.property,
        range = channel.range,
        scale = channel.scale,
        defaultMeasure = channel.defaultMeasure,
        supportedFieldTypes = channel.supportedFieldTypes;
    var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
    var supportedFields = fields.filter(function (_ref18) {
      var type = _ref18.type;
      return channelSupportedFieldTypes.includes(type);
    });
    var scaleOptions = layer.getScaleOptions(channel.key);
    var showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
    var defaultDescription = 'layerConfiguration.defaultDescription';
    return /*#__PURE__*/_react["default"].createElement(VisConfigByFieldSelector, {
      channel: channel.key,
      description: description || defaultDescription,
      domain: layer.config[domain],
      fields: supportedFields,
      id: layer.id,
      key: "".concat(key, "-channel-selector"),
      property: property,
      placeholder: defaultMeasure || 'placeholder.selectField',
      range: layer.config.visConfig[range],
      scaleOptions: scaleOptions,
      scaleType: scale ? layer.config[scale] : null,
      selectedField: layer.config[field],
      showScale: showScale,
      updateField: function updateField(val) {
        return onChange((0, _defineProperty2["default"])({}, field, val), key);
      },
      updateScale: function updateScale(val) {
        return onChange((0, _defineProperty2["default"])({}, scale, val), key);
      }
    });
  };

  return ChannelByValueSelector;
}

var AggrScaleSelector = function AggrScaleSelector(_ref19) {
  var channel = _ref19.channel,
      layer = _ref19.layer,
      onChange = _ref19.onChange;
  var scale = channel.scale,
      key = channel.key;
  var scaleOptions = layer.getScaleOptions(key);
  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? /*#__PURE__*/_react["default"].createElement(_dimensionScaleSelector["default"], {
    label: "".concat(key, " Scale"),
    options: scaleOptions,
    scaleType: layer.config[scale],
    onSelect: function onSelect(val) {
      return onChange((0, _defineProperty2["default"])({}, scale, val), key);
    }
  }) : null;
};

exports.AggrScaleSelector = AggrScaleSelector;

var AggregationTypeSelector = function AggregationTypeSelector(_ref20) {
  var layer = _ref20.layer,
      channel = _ref20.channel,
      _onChange6 = _ref20.onChange;
  var field = channel.field,
      aggregation = channel.aggregation,
      key = channel.key;
  var selectedField = layer.config[field];
  var visConfig = layer.config.visConfig; // aggregation should only be selectable when field is selected

  var aggregationOptions = layer.getAggregationOptions(key);
  return /*#__PURE__*/_react["default"].createElement(_styledComponents2.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(_styledComponents2.PanelLabel, null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
    id: 'layer.aggregateBy',
    values: {
      field: selectedField.name
    }
  })), /*#__PURE__*/_react["default"].createElement(_itemSelector["default"], {
    selectedItems: visConfig[aggregation],
    options: aggregationOptions,
    multiSelect: false,
    searchable: false,
    onChange: function onChange(value) {
      return _onChange6({
        visConfig: _objectSpread(_objectSpread({}, layer.config.visConfig), {}, (0, _defineProperty2["default"])({}, aggregation, value))
      }, channel.key);
    }
  }));
};
/* eslint-enable max-params */


exports.AggregationTypeSelector = AggregationTypeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlndXJhdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlndXJhdG9yIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsInRoZW1lIiwibGF5ZXJDb25maWd1cmF0b3JNYXJnaW4iLCJsYXllckNvbmZpZ3VyYXRvclBhZGRpbmciLCJsYXllckNvbmZpZ3VyYXRvckJvcmRlciIsImxheWVyQ29uZmlndXJhdG9yQm9yZGVyQ29sb3IiLCJTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciIsImdldExheWVyRmllbGRzIiwiZGF0YXNldHMiLCJsYXllciIsImNvbmZpZyIsImRhdGFJZCIsImZpZWxkcyIsImdldExheWVyRGF0YXNldCIsImdldExheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJvbkNoYW5nZSIsInVwZGF0ZUxheWVyQ29uZmlnIiwic2V0Q29sb3JVSSIsInVwZGF0ZUxheWVyQ29sb3JVSSIsImdldFZpc0NvbmZpZ3VyYXRvclByb3BzIiwidXBkYXRlTGF5ZXJWaXNDb25maWciLCJnZXRMYXllckNoYW5uZWxDb25maWdQcm9wcyIsInVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZyIsIkxheWVyQ29uZmlndXJhdG9yRmFjdG9yeSIsImRlcHMiLCJTb3VyY2VEYXRhU2VsZWN0b3JGYWN0b3J5IiwiVmlzQ29uZmlnU2xpZGVyRmFjdG9yeSIsIlRleHRMYWJlbFBhbmVsRmFjdG9yeSIsIkxheWVyQ29uZmlnR3JvdXBGYWN0b3J5IiwiQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvckZhY3RvcnkiLCJMYXllckNvbHVtbkNvbmZpZ0ZhY3RvcnkiLCJMYXllclR5cGVTZWxlY3RvckZhY3RvcnkiLCJWaXNDb25maWdTd2l0Y2hGYWN0b3J5IiwiU291cmNlRGF0YVNlbGVjdG9yIiwiVmlzQ29uZmlnU2xpZGVyIiwiVGV4dExhYmVsUGFuZWwiLCJMYXllckNvbmZpZ0dyb3VwIiwiQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvciIsIkxheWVyQ29sdW1uQ29uZmlnIiwiTGF5ZXJUeXBlU2VsZWN0b3IiLCJWaXNDb25maWdTd2l0Y2giLCJMYXllckNvbmZpZ3VyYXRvciIsImNvbnNvbGUiLCJsb2ciLCJfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyIsInZpc0NvbmZpZ3VyYXRvclByb3BzIiwibGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMiLCJsYXllckNvbmZpZ3VyYXRvclByb3BzIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJmaWxsZWQiLCJsYWJlbCIsImNvbG9yRmllbGQiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwib3BhY2l0eSIsInR5cGUiLCJMQVlFUl9UWVBFUyIsInBvaW50Iiwib3V0bGluZSIsInN0cm9rZUNvbG9yRmllbGQiLCJ2aXNDb25maWciLCJzdHJva2VDb2xvciIsInRoaWNrbmVzcyIsInNpemVGaWVsZCIsInJhZGl1cyIsIkJvb2xlYW4iLCJyYWRpdXNSYW5nZSIsImZpeGVkUmFkaXVzIiwic2l6ZSIsInVwZGF0ZUxheWVyVGV4dExhYmVsIiwidGV4dExhYmVsIiwiY29sb3JQYWxldHRlIiwic2V0Q29sb3JQYWxldHRlVUkiLCJjb2xvckFnZ3JlZ2F0aW9uIiwiY29uZGl0aW9uIiwiY2x1c3RlclJhZGl1cyIsIndlaWdodCIsIl9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnIiwiZW5hYmxlM2QiLCJlbGV2YXRpb25TY2FsZSIsInNpemVSYW5nZSIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3IiLCJlbGV2YXRpb25CeURlc2NyaXB0aW9uIiwiY29sb3JCeURlc2NyaXB0aW9uIiwicGVyY2VudGlsZSIsIndvcmxkVW5pdFNpemUiLCJjb3ZlcmFnZSIsIm1lc2hMZXZlbCIsInNpemVBZ2dyZWdhdGlvbiIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJjb3ZlcmFnZUZpZWxkIiwiY292ZXJhZ2VSYW5nZSIsImFyZ3MiLCJfcmVuZGVyTGluZUxheWVyQ29uZmlnIiwic291cmNlQ29sb3IiLCJtZXRhIiwiZmVhdHVyZVR5cGVzIiwicG9seWdvbiIsInN0cm9rZWQiLCJ0cmFpbExlbmd0aCIsInN0cm9rZU9wYWNpdHkiLCJoZWlnaHQiLCJ3aXJlZnJhbWUiLCJyYWRpdXNGaWVsZCIsImUiLCJ0YXJnZXQiLCJmaWxlcyIsInVybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInNjZW5lZ3JhcGgiLCJzaXplU2NhbGUiLCJhbmdsZVgiLCJhbmdsZVkiLCJhbmdsZVoiLCJoZWlnaHRSYW5nZSIsImxheWVyVHlwZU9wdGlvbnMiLCJ1cGRhdGVMYXllclR5cGUiLCJmaWVsZFBhaXJzIiwidW5kZWZpbmVkIiwiZGF0YXNldCIsInJlbmRlclRlbXBsYXRlIiwibGF5ZXJJbmZvTW9kYWwiLCJvcGVuTW9kYWwiLCJoYXNBbGxDb2x1bW5zIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImlkIiwidmFsdWUiLCJjb2x1bW5QYWlycyIsImNvbHVtbnMiLCJhc3NpZ25Db2x1bW5QYWlycyIsImJpbmQiLCJhc3NpZ25Db2x1bW4iLCJjb2x1bW5MYWJlbHMiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImZ1bmMiLCJTdHlsZWRIb3dUb0J1dHRvbiIsIkhvd1RvQnV0dG9uIiwib25DbGljayIsIkxheWVyQ29sb3JTZWxlY3RvciIsInNlbGVjdGVkQ29sb3IiLCJwcm9wZXJ0eSIsInNldENvbG9yIiwicmdiVmFsdWUiLCJjb2xvclVJIiwibmV3Q29uZmlnIiwiQXJjTGF5ZXJDb2xvclNlbGVjdG9yIiwib25DaGFuZ2VDb25maWciLCJvbkNoYW5nZVZpc0NvbmZpZyIsInRhcmdldENvbG9yIiwiTGF5ZXJDb2xvclJhbmdlU2VsZWN0b3IiLCJpc1JhbmdlIiwiY29sb3JSYW5nZSIsIlZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvckZhY3RvcnkiLCJWaXNDb25maWdCeUZpZWxkU2VsZWN0b3IiLCJjaGFubmVsIiwiZGVzY3JpcHRpb24iLCJjaGFubmVsU2NhbGVUeXBlIiwiZG9tYWluIiwiZmllbGQiLCJrZXkiLCJyYW5nZSIsInNjYWxlIiwiZGVmYXVsdE1lYXN1cmUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJzdXBwb3J0ZWRGaWVsZHMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsInNob3dTY2FsZSIsImlzQWdncmVnYXRlZCIsImRlZmF1bHREZXNjcmlwdGlvbiIsInZhbCIsIkFnZ3JTY2FsZVNlbGVjdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiQWdncmVnYXRpb25UeXBlU2VsZWN0b3IiLCJhZ2dyZWdhdGlvbiIsInNlbGVjdGVkRmllbGQiLCJhZ2dyZWdhdGlvbk9wdGlvbnMiLCJnZXRBZ2dyZWdhdGlvbk9wdGlvbnMiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsdUJBQXVCLEdBQUdDLDZCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDL0NDLEVBQUFBLFNBQVMsRUFBRTtBQURvQyxDQUFqQixDQUFILDhMQUliLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsdUJBQWhCO0FBQUEsQ0FKUSxFQUtoQixVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLHdCQUFoQjtBQUFBLENBTFcsRUFNWixVQUFBSCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlHLHVCQUFoQjtBQUFBLENBTk8sRUFPdkIsVUFBQUosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSSw0QkFBaEI7QUFBQSxDQVBrQixDQUE3Qjs7QUFVQSxJQUFNQyw2QkFBNkIsR0FBR1YsNkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUNyREMsRUFBQUEsU0FBUyxFQUFFO0FBRDBDLENBQWpCLENBQUgsK0dBQW5DOztBQU1PLElBQU1RLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsUUFBRCxFQUFXQyxLQUFYO0FBQUEsU0FDNUJBLEtBQUssQ0FBQ0MsTUFBTixJQUFnQkYsUUFBUSxDQUFDQyxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsTUFBZCxDQUF4QixHQUFnREgsUUFBUSxDQUFDQyxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsTUFBZCxDQUFSLENBQThCQyxNQUE5RSxHQUF1RixFQUQzRDtBQUFBLENBQXZCOzs7O0FBR0EsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDTCxRQUFELEVBQVdDLEtBQVg7QUFBQSxTQUM3QkEsS0FBSyxDQUFDQyxNQUFOLElBQWdCRixRQUFRLENBQUNDLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxNQUFkLENBQXhCLEdBQWdESCxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxNQUFkLENBQXhELEdBQWdGLElBRG5EO0FBQUEsQ0FBeEI7Ozs7QUFHQSxJQUFNRyx5QkFBeUIsR0FBRyxTQUE1QkEseUJBQTRCLENBQUFkLEtBQUs7QUFBQSxTQUFLO0FBQ2pEUyxJQUFBQSxLQUFLLEVBQUVULEtBQUssQ0FBQ1MsS0FEb0M7QUFFakRHLElBQUFBLE1BQU0sRUFBRUwsY0FBYyxDQUFDUCxLQUFLLENBQUNRLFFBQVAsRUFBaUJSLEtBQUssQ0FBQ1MsS0FBdkIsQ0FGMkI7QUFHakRNLElBQUFBLFFBQVEsRUFBRWYsS0FBSyxDQUFDZ0IsaUJBSGlDO0FBSWpEQyxJQUFBQSxVQUFVLEVBQUVqQixLQUFLLENBQUNrQjtBQUorQixHQUFMO0FBQUEsQ0FBdkM7Ozs7QUFPQSxJQUFNQyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUFuQixLQUFLO0FBQUEsU0FBSztBQUMvQ1MsSUFBQUEsS0FBSyxFQUFFVCxLQUFLLENBQUNTLEtBRGtDO0FBRS9DRyxJQUFBQSxNQUFNLEVBQUVMLGNBQWMsQ0FBQ1AsS0FBSyxDQUFDUSxRQUFQLEVBQWlCUixLQUFLLENBQUNTLEtBQXZCLENBRnlCO0FBRy9DTSxJQUFBQSxRQUFRLEVBQUVmLEtBQUssQ0FBQ29CLG9CQUgrQjtBQUkvQ0gsSUFBQUEsVUFBVSxFQUFFakIsS0FBSyxDQUFDa0I7QUFKNkIsR0FBTDtBQUFBLENBQXJDOzs7O0FBT0EsSUFBTUcsMEJBQTBCLEdBQUcsU0FBN0JBLDBCQUE2QixDQUFBckIsS0FBSztBQUFBLFNBQUs7QUFDbERTLElBQUFBLEtBQUssRUFBRVQsS0FBSyxDQUFDUyxLQURxQztBQUVsREcsSUFBQUEsTUFBTSxFQUFFTCxjQUFjLENBQUNQLEtBQUssQ0FBQ1EsUUFBUCxFQUFpQlIsS0FBSyxDQUFDUyxLQUF2QixDQUY0QjtBQUdsRE0sSUFBQUEsUUFBUSxFQUFFZixLQUFLLENBQUNzQjtBQUhrQyxHQUFMO0FBQUEsQ0FBeEM7OztBQU1QQyx3QkFBd0IsQ0FBQ0MsSUFBekIsR0FBZ0MsQ0FDOUJDLDhCQUQ4QixFQUU5QkMsMkJBRjhCLEVBRzlCQywwQkFIOEIsRUFJOUJDLDRCQUo4QixFQUs5QkMsNkJBTDhCLEVBTTlCQyw2QkFOOEIsRUFPOUJDLDZCQVA4QixFQVE5QkMsMkJBUjhCLENBQWhDOztBQVdlLFNBQVNULHdCQUFULENBQ2JVLGtCQURhLEVBRWJDLGVBRmEsRUFHYkMsY0FIYSxFQUliQyxnQkFKYSxFQUtiQyxzQkFMYSxFQU1iQyxpQkFOYSxFQU9iQyxpQkFQYSxFQVFiQyxlQVJhLEVBU2I7QUFBQSxNQUNNQyxpQkFETjtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxhQWNFLGlDQUF3QnpDLEtBQXhCLEVBQStCO0FBQzdCMEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVo7QUFDQSxlQUFPLEtBQUtDLDZCQUFMLENBQW1DNUMsS0FBbkMsQ0FBUDtBQUNEO0FBakJIO0FBQUE7QUFBQSxhQW1CRSxnQ0FBdUJBLEtBQXZCLEVBQThCO0FBQzVCLGVBQU8sS0FBSzRDLDZCQUFMLENBQW1DNUMsS0FBbkMsQ0FBUDtBQUNEO0FBckJIO0FBQUE7QUFBQSxhQXVCRSw2Q0FLRztBQUFBLFlBSkRTLEtBSUMsUUFKREEsS0FJQztBQUFBLFlBSERvQyxvQkFHQyxRQUhEQSxvQkFHQztBQUFBLFlBRkRDLHVCQUVDLFFBRkRBLHVCQUVDO0FBQUEsWUFEREMsc0JBQ0MsUUFEREEsc0JBQ0M7QUFDRCw0QkFDRSxnQ0FBQyw2QkFBRCxxQkFFRSxnQ0FBQyxnQkFBRCxnQ0FDT3RDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCQyxNQUF4QixJQUFrQztBQUFDQyxVQUFBQSxLQUFLLEVBQUU7QUFBUixTQUR6QyxFQUVNTCxvQkFGTjtBQUdFLFVBQUEsV0FBVztBQUhiLFlBS0dwQyxLQUFLLENBQUNDLE1BQU4sQ0FBYXlDLFVBQWIsZ0JBQ0MsZ0NBQUMsdUJBQUQsRUFBNkJOLG9CQUE3QixDQURELGdCQUdDLGdDQUFDLGtCQUFELEVBQXdCRSxzQkFBeEIsQ0FSSixlQVVFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUV0QyxLQUFLLENBQUMyQyxjQUFOLENBQXFCQztBQURoQyxXQUVNUCx1QkFGTixFQURGLGVBS0UsZ0NBQUMsZUFBRCxnQ0FBcUJyQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3Qk0sT0FBN0MsRUFBMERULG9CQUExRCxFQUxGLENBVkYsQ0FGRixFQXNCR3BDLEtBQUssQ0FBQzhDLElBQU4sS0FBZUMsbUJBQVlDLEtBQTNCLGdCQUNDLGdDQUFDLGdCQUFELGdDQUNNaEQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JVLE9BRDlCLEVBRU1iLG9CQUZOO0FBR0UsVUFBQSxXQUFXO0FBSGIsWUFLR3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhaUQsZ0JBQWIsZ0JBQ0MsZ0NBQUMsdUJBQUQsZ0NBQTZCZCxvQkFBN0I7QUFBbUQsVUFBQSxRQUFRLEVBQUM7QUFBNUQsV0FERCxnQkFHQyxnQ0FBQyxrQkFBRCxnQ0FDTUEsb0JBRE47QUFFRSxVQUFBLGFBQWEsRUFBRXBDLEtBQUssQ0FBQ0MsTUFBTixDQUFha0QsU0FBYixDQUF1QkMsV0FGeEM7QUFHRSxVQUFBLFFBQVEsRUFBQztBQUhYLFdBUkosZUFjRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEQsS0FBSyxDQUFDMkMsY0FBTixDQUFxQlM7QUFEaEMsV0FFTWYsdUJBRk4sRUFERixlQUtFLGdDQUFDLGVBQUQsZ0NBQ01yQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QmMsU0FEOUIsRUFFTWpCLG9CQUZOO0FBR0UsVUFBQSxRQUFRLEVBQUUsQ0FBQ3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFha0QsU0FBYixDQUF1QkY7QUFIcEMsV0FMRixDQWRGLENBREQsR0EyQkcsSUFqRE4sZUFvREUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsY0FBekI7QUFBeUMsVUFBQSxXQUFXO0FBQXBELFdBQ0csQ0FBQ2pELEtBQUssQ0FBQ0MsTUFBTixDQUFhcUQsU0FBZCxnQkFDQyxnQ0FBQyxlQUFELGdDQUNNdEQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JnQixNQUQ5QixFQUVNbkIsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRSxLQUhUO0FBSUUsVUFBQSxRQUFRLEVBQUVvQixPQUFPLENBQUN4RCxLQUFLLENBQUNDLE1BQU4sQ0FBYXFELFNBQWQ7QUFKbkIsV0FERCxnQkFRQyxnQ0FBQyxlQUFELGdDQUNNdEQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JrQixXQUQ5QixFQUVNckIsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRSxLQUhUO0FBSUUsVUFBQSxRQUFRLEVBQUUsQ0FBQ3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhcUQsU0FBZCxJQUEyQnRELEtBQUssQ0FBQ0MsTUFBTixDQUFha0QsU0FBYixDQUF1Qk87QUFKOUQsV0FUSixlQWdCRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFMUQsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCO0FBRGhDLFdBRU10Qix1QkFGTixFQURGLEVBS0dyQyxLQUFLLENBQUNDLE1BQU4sQ0FBYXFELFNBQWIsZ0JBQ0MsZ0NBQUMsZUFBRCxnQ0FDTXRELEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCbUIsV0FEOUIsRUFFTXRCLG9CQUZOLEVBREQsR0FLRyxJQVZOLENBaEJGLENBcERGLGVBbUZFLGdDQUFDLGNBQUQ7QUFDRSxVQUFBLE1BQU0sRUFBRUEsb0JBQW9CLENBQUNqQyxNQUQvQjtBQUVFLFVBQUEsb0JBQW9CLEVBQUUsS0FBS1osS0FBTCxDQUFXcUUsb0JBRm5DO0FBR0UsVUFBQSxTQUFTLEVBQUU1RCxLQUFLLENBQUNDLE1BQU4sQ0FBYTRELFNBSDFCO0FBSUUsVUFBQSxZQUFZLEVBQUV6QixvQkFBb0IsQ0FBQzBCLFlBSnJDO0FBS0UsVUFBQSxpQkFBaUIsRUFBRTFCLG9CQUFvQixDQUFDMkI7QUFMMUMsVUFuRkYsQ0FERjtBQTZGRDtBQTFISDtBQUFBO0FBQUEsYUE0SEUsMENBS0c7QUFBQSxZQUpEL0QsS0FJQyxTQUpEQSxLQUlDO0FBQUEsWUFIRG9DLG9CQUdDLFNBSERBLG9CQUdDO0FBQUEsWUFGREUsc0JBRUMsU0FGREEsc0JBRUM7QUFBQSxZQURERCx1QkFDQyxTQUREQSx1QkFDQztBQUNELDRCQUNFLGdDQUFDLDZCQUFELHFCQUVFLGdDQUFDLGdCQUFEO0FBQWtCLFVBQUEsS0FBSyxFQUFFLGFBQXpCO0FBQXdDLFVBQUEsV0FBVztBQUFuRCx3QkFDRSxnQ0FBQyx1QkFBRCxFQUE2QkQsb0JBQTdCLENBREYsZUFFRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxpQkFBRCxnQ0FBdUJFLHNCQUF2QjtBQUErQyxVQUFBLE9BQU8sRUFBRXRDLEtBQUssQ0FBQzJDLGNBQU4sQ0FBcUJDO0FBQTdFLFdBREYsZUFFRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFNUMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQkM7QUFEaEMsV0FFTVAsdUJBRk4sRUFGRixFQU1HckMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0J5QixnQkFBeEIsQ0FBeUNDLFNBQXpDLENBQW1EakUsS0FBSyxDQUFDQyxNQUF6RCxpQkFDQyxnQ0FBQyx1QkFBRCxnQ0FDTUQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0J5QixnQkFEOUIsRUFFTTNCLHVCQUZOO0FBR0UsVUFBQSxPQUFPLEVBQUVyQyxLQUFLLENBQUMyQyxjQUFOLENBQXFCQztBQUhoQyxXQURELEdBTUcsSUFaTixlQWFFLGdDQUFDLGVBQUQsZ0NBQXFCNUMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFiRixDQUZGLENBRkYsZUFzQkUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsY0FBekI7QUFBeUMsVUFBQSxXQUFXO0FBQXBELHdCQUNFLGdDQUFDLGVBQUQsZ0NBQXFCcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0IyQixhQUE3QyxFQUFnRTlCLG9CQUFoRSxFQURGLGVBRUUsZ0NBQUMsK0NBQUQscUJBQ0UsZ0NBQUMsZUFBRCxnQ0FBcUJwQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QmtCLFdBQTdDLEVBQThEckIsb0JBQTlELEVBREYsQ0FGRixDQXRCRixDQURGO0FBK0JEO0FBaktIO0FBQUE7QUFBQSxhQW1LRSwwQ0FLRztBQUFBLFlBSkRwQyxLQUlDLFNBSkRBLEtBSUM7QUFBQSxZQUhEb0Msb0JBR0MsU0FIREEsb0JBR0M7QUFBQSxZQUZERSxzQkFFQyxTQUZEQSxzQkFFQztBQUFBLFlBRERELHVCQUNDLFNBRERBLHVCQUNDO0FBQ0QsNEJBQ0UsZ0NBQUMsNkJBQUQscUJBRUUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsYUFBekI7QUFBd0MsVUFBQSxXQUFXO0FBQW5ELHdCQUNFLGdDQUFDLHVCQUFELEVBQTZCRCxvQkFBN0IsQ0FERixlQUVFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLGVBQUQsZ0NBQXFCcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFERixDQUZGLENBRkYsZUFTRSxnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRTtBQUF6Qix3QkFDRSxnQ0FBQyxlQUFELGdDQUNNcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JnQixNQUQ5QixFQUVNbkIsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRTtBQUhULFdBREYsQ0FURixlQWlCRSxnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRTtBQUF6Qix3QkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQndCO0FBRGhDLFdBRU05Qix1QkFGTixFQURGLENBakJGLENBREY7QUEwQkQ7QUFuTUg7QUFBQTtBQUFBLGFBcU1FLGdDQUF1QjlDLEtBQXZCLEVBQThCO0FBQzVCLGVBQU8sS0FBSzZFLDZCQUFMLENBQW1DN0UsS0FBbkMsQ0FBUDtBQUNEO0FBdk1IO0FBQUE7QUFBQSxhQXlNRSxtQ0FBMEJBLEtBQTFCLEVBQWlDO0FBQy9CLGVBQU8sS0FBSzZFLDZCQUFMLENBQW1DN0UsS0FBbkMsQ0FBUDtBQUNEO0FBM01IO0FBQUE7QUFBQSxhQTZNRSxtQ0FBMEJBLEtBQTFCLEVBQWdDO0FBQzlCMEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksOEJBQVo7QUFDQSxlQUFPLEtBQUtrQyw2QkFBTCxDQUFtQzdFLEtBQW5DLENBQVA7QUFDRDtBQWhOSDtBQUFBO0FBQUEsYUFrTkUsMkNBR29EO0FBQUEsWUFIeEJTLEtBR3dCLFNBSHhCQSxLQUd3QjtBQUFBLFlBRnpCb0Msb0JBRXlCLFNBRnpCQSxvQkFFeUI7QUFBQSxZQUR6QkUsc0JBQ3lCLFNBRHpCQSxzQkFDeUI7QUFBQSxZQUF6QkQsdUJBQXlCLFNBQXpCQSx1QkFBeUI7QUFDbEQsNEJBQ0UsZ0NBQUMsNkJBQUQscUJBRUUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsYUFBekI7QUFBd0MsVUFBQSxXQUFXO0FBQW5ELFdBQ0dyQyxLQUFLLENBQUNDLE1BQU4sQ0FBYXlDLFVBQWIsZ0JBQ0MsZ0NBQUMsdUJBQUQsRUFBNkJOLG9CQUE3QixDQURELGdCQUdDLGdDQUFDLGtCQUFELEVBQXdCRSxzQkFBeEIsQ0FKSixlQU1FLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUV0QyxLQUFLLENBQUMyQyxjQUFOLENBQXFCQztBQURoQyxXQUVNUCx1QkFGTixFQURGLGVBS0UsZ0NBQUMsZUFBRCxnQ0FBcUJyQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3Qk0sT0FBN0MsRUFBMERULG9CQUExRCxFQUxGLENBTkYsQ0FGRixlQWtCRSxnQ0FBQyxnQkFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCOEIsUUFEOUIsRUFFTWpDLG9CQUZOO0FBR0UsVUFBQSxXQUFXO0FBSGIseUJBS0UsZ0NBQUMsc0JBQUQ7QUFDRSxVQUFBLE9BQU8sRUFBRXBDLEtBQUssQ0FBQzJDLGNBQU4sQ0FBcUJnQjtBQURoQyxXQUVNdEIsdUJBRk4sRUFMRixlQVNFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLGVBQUQsZ0NBQ01yQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QitCLGNBRDlCLEVBRU1sQyxvQkFGTixFQURGLGVBS0UsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCZ0MsU0FEOUIsRUFFTW5DLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUM7QUFIUixXQUxGLGVBVUUsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCaUMseUJBRDlCLEVBRU1wQyxvQkFGTixFQVZGLENBVEYsQ0FsQkYsQ0FERjtBQThDRDtBQXBRSDtBQUFBO0FBQUEsYUFzUUUsOENBS0c7QUFBQSxZQUpEcEMsS0FJQyxTQUpEQSxLQUlDO0FBQUEsWUFIRG9DLG9CQUdDLFNBSERBLG9CQUdDO0FBQUEsWUFGREUsc0JBRUMsU0FGREEsc0JBRUM7QUFBQSxZQURERCx1QkFDQyxTQUREQSx1QkFDQztBQUNESixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtBQURDLFlBRU1qQyxNQUZOLEdBRWdCRCxLQUZoQixDQUVNQyxNQUZOO0FBQUEsWUFJYW9FLFFBSmIsR0FLR3BFLE1BTEgsQ0FJQ2tELFNBSkQsQ0FJYWtCLFFBSmI7QUFNRCxZQUFNSSxzQkFBc0IsR0FBRyw4QkFBL0I7QUFDQSxZQUFNQyxrQkFBa0IsR0FBRywwQkFBM0I7QUFFQSw0QkFDRSxnQ0FBQyw2QkFBRCxxQkFFRSxnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRSxhQUF6QjtBQUF3QyxVQUFBLFdBQVc7QUFBbkQsd0JBQ0UsZ0NBQUMsdUJBQUQsRUFBNkJ0QyxvQkFBN0IsQ0FERixlQUVFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLGlCQUFELGdDQUF1QkUsc0JBQXZCO0FBQStDLFVBQUEsT0FBTyxFQUFFdEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQkM7QUFBN0UsV0FERixlQUVFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUU1QyxLQUFLLENBQUMyQyxjQUFOLENBQXFCQztBQURoQyxXQUVNUCx1QkFGTixFQUZGLEVBTUdyQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QnlCLGdCQUF4QixDQUF5Q0MsU0FBekMsQ0FBbURqRSxLQUFLLENBQUNDLE1BQXpELGlCQUNDLGdDQUFDLHVCQUFELGdDQUNNRCxLQUFLLENBQUN1QyxpQkFBTixDQUF3QnlCLGdCQUQ5QixFQUVNM0IsdUJBRk47QUFHRSxVQUFBLFdBQVcsRUFBRXFDLGtCQUhmO0FBSUUsVUFBQSxPQUFPLEVBQUUxRSxLQUFLLENBQUMyQyxjQUFOLENBQXFCQztBQUpoQyxXQURELEdBT0csSUFiTixFQWNHNUMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JvQyxVQUF4QixJQUNEM0UsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JvQyxVQUF4QixDQUFtQ1YsU0FBbkMsQ0FBNkNqRSxLQUFLLENBQUNDLE1BQW5ELENBREMsZ0JBRUMsZ0NBQUMsZUFBRCxnQ0FDTUQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JvQyxVQUQ5QixFQUVNdkMsb0JBRk4sRUFGRCxHQU1HLElBcEJOLGVBcUJFLGdDQUFDLGVBQUQsZ0NBQXFCcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFyQkYsQ0FGRixDQUZGLEVBK0JJcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JxQyxhQUF4QixpQkFDRixnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRSxjQUF6QjtBQUF5QyxVQUFBLFdBQVc7QUFBcEQsd0JBQ0UsZ0NBQUMsZUFBRCxnQ0FBcUI1RSxLQUFLLENBQUN1QyxpQkFBTixDQUF3QnFDLGFBQTdDLEVBQWdFeEMsb0JBQWhFLEVBREYsZUFFRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxlQUFELGdDQUFxQnBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCc0MsUUFBN0MsRUFBMkR6QyxvQkFBM0QsRUFERixDQUZGLENBaENGLEVBd0NJcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0J1QyxTQUF4QjtBQUFBO0FBQ0U7QUFDRix3Q0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRSxnQkFBekI7QUFBMkMsVUFBQSxXQUFXO0FBQXRELHdCQUNFLGdDQUFDLGVBQUQsZ0NBQXFCOUUsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0J1QyxTQUE3QyxFQUE0RDFDLG9CQUE1RCxFQURGLGVBRUUsZ0NBQUMsK0NBQUQscUJBQ0UsZ0NBQUMsZUFBRCxnQ0FBcUJwQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QnNDLFFBQTdDLEVBQTJEekMsb0JBQTNELEVBREYsQ0FGRixDQTFDSixFQW1ER3BDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCOEIsUUFBeEIsZ0JBQ0MsZ0NBQUMsZ0JBQUQsZ0NBQ01yRSxLQUFLLENBQUN1QyxpQkFBTixDQUF3QjhCLFFBRDlCLEVBRU1qQyxvQkFGTjtBQUdFLFVBQUEsV0FBVztBQUhiLHlCQUtFLGdDQUFDLGVBQUQsZ0NBQ01wQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QitCLGNBRDlCLEVBRU1sQyxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFDO0FBSFIsV0FMRixlQVVFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFELGdDQUNNQyx1QkFETjtBQUVFLFVBQUEsT0FBTyxFQUFFckMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCLElBRmhDO0FBR0UsVUFBQSxXQUFXLEVBQUVjLHNCQUhmO0FBSUUsVUFBQSxRQUFRLEVBQUUsQ0FBQ0o7QUFKYixXQURGLGVBT0UsZ0NBQUMsaUJBQUQsZ0NBQ00vQixzQkFETjtBQUVFLFVBQUEsT0FBTyxFQUFFdEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCO0FBRmhDLFdBUEYsZUFXRSxnQ0FBQyxlQUFELGdDQUNNM0QsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JnQyxTQUQ5QixFQUVNbkMsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBQztBQUhSLFdBWEYsZUFnQkUsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCaUMseUJBRDlCLEVBRU1wQyxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFDO0FBSFIsV0FoQkYsRUFxQkdwQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QndDLGVBQXhCLENBQXdDZCxTQUF4QyxDQUFrRGpFLEtBQUssQ0FBQ0MsTUFBeEQsaUJBQ0MsZ0NBQUMsdUJBQUQsZ0NBQ01ELEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCd0MsZUFEOUIsRUFFTTFDLHVCQUZOO0FBR0UsVUFBQSxPQUFPLEVBQUVyQyxLQUFLLENBQUMyQyxjQUFOLENBQXFCZ0I7QUFIaEMsV0FERCxHQU1HLElBM0JOLEVBNEJHM0QsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0J5QyxtQkFBeEIsQ0FBNENmLFNBQTVDLENBQXNEakUsS0FBSyxDQUFDQyxNQUE1RCxpQkFDQyxnQ0FBQyxlQUFELGdDQUNNRCxLQUFLLENBQUN1QyxpQkFBTixDQUF3QnlDLG1CQUQ5QixFQUVNNUMsb0JBRk4sRUFERCxHQUtHLElBakNOLENBVkYsQ0FERCxHQStDRyxJQWxHTixDQURGO0FBc0dELE9BMVhILENBNFhFOztBQTVYRjtBQUFBO0FBQUEsYUE2WEUsNENBS0c7QUFBQSxZQUpEcEMsS0FJQyxTQUpEQSxLQUlDO0FBQUEsWUFIRG9DLG9CQUdDLFNBSERBLG9CQUdDO0FBQUEsWUFGREUsc0JBRUMsU0FGREEsc0JBRUM7QUFBQSxZQURERCx1QkFDQyxTQUREQSx1QkFDQztBQUNELDRCQUNFLGdDQUFDLDZCQUFELHFCQUVFLGdDQUFDLGdCQUFEO0FBQWtCLFVBQUEsS0FBSyxFQUFFLGFBQXpCO0FBQXdDLFVBQUEsV0FBVztBQUFuRCxXQUNHckMsS0FBSyxDQUFDQyxNQUFOLENBQWF5QyxVQUFiLGdCQUNDLGdDQUFDLHVCQUFELEVBQTZCTixvQkFBN0IsQ0FERCxnQkFHQyxnQ0FBQyxrQkFBRCxFQUF3QkUsc0JBQXhCLENBSkosZUFNRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFdEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQkM7QUFEaEMsV0FFTVAsdUJBRk4sRUFERixlQUtFLGdDQUFDLGVBQUQsZ0NBQXFCckMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFMRixDQU5GLENBRkYsZUFrQkUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsZ0JBQXpCO0FBQTJDLFVBQUEsV0FBVztBQUF0RCxXQUNHLENBQUNwQyxLQUFLLENBQUNDLE1BQU4sQ0FBYWdGLGFBQWQsZ0JBQ0MsZ0NBQUMsZUFBRCxnQ0FDTWpGLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCc0MsUUFEOUIsRUFFTXpDLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUU7QUFIVCxXQURELGdCQU9DLGdDQUFDLGVBQUQsZ0NBQ01wQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QjJDLGFBRDlCLEVBRU05QyxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFO0FBSFQsV0FSSixlQWNFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUVwQyxLQUFLLENBQUMyQyxjQUFOLENBQXFCa0M7QUFEaEMsV0FFTXhDLHVCQUZOLEVBREYsQ0FkRixDQWxCRixlQXlDRSxnQ0FBQyxnQkFBRCxnQ0FDTXJDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCOEIsUUFEOUIsRUFFTWpDLG9CQUZOO0FBR0UsVUFBQSxXQUFXO0FBSGIseUJBS0UsZ0NBQUMsc0JBQUQ7QUFDRSxVQUFBLE9BQU8sRUFBRXBDLEtBQUssQ0FBQzJDLGNBQU4sQ0FBcUJnQjtBQURoQyxXQUVNdEIsdUJBRk4sRUFMRixlQVNFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLGVBQUQsZ0NBQ01yQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QitCLGNBRDlCLEVBRU1sQyxvQkFGTixFQURGLGVBS0UsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCZ0MsU0FEOUIsRUFFTW5DLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUM7QUFIUixXQUxGLGVBVUUsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCaUMseUJBRDlCLEVBRU1wQyxvQkFGTixFQVZGLENBVEYsQ0F6Q0YsQ0FERjtBQXFFRDtBQXhjSDtBQUFBO0FBQUEsYUEwY0UsK0JBQXNCK0MsSUFBdEIsRUFBNEI7QUFDMUIsZUFBTyxLQUFLQyxzQkFBTCxDQUE0QkQsSUFBNUIsQ0FBUDtBQUNEO0FBNWNIO0FBQUE7QUFBQSxhQThjRSx1Q0FLRztBQUFBLFlBSkRuRixLQUlDLFNBSkRBLEtBSUM7QUFBQSxZQUhEb0Msb0JBR0MsU0FIREEsb0JBR0M7QUFBQSxZQUZERSxzQkFFQyxTQUZEQSxzQkFFQztBQUFBLFlBRERELHVCQUNDLFNBRERBLHVCQUNDO0FBQ0QsNEJBQ0UsZ0NBQUMsNkJBQUQscUJBRUUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsYUFBekI7QUFBd0MsVUFBQSxXQUFXO0FBQW5ELFdBQ0dyQyxLQUFLLENBQUNDLE1BQU4sQ0FBYXlDLFVBQWIsZ0JBQ0MsZ0NBQUMsdUJBQUQsRUFBNkJOLG9CQUE3QixDQURELGdCQUdDLGdDQUFDLHFCQUFEO0FBQ0UsVUFBQSxLQUFLLEVBQUVwQyxLQURUO0FBRUUsVUFBQSxVQUFVLEVBQUVzQyxzQkFBc0IsQ0FBQzlCLFVBRnJDO0FBR0UsVUFBQSxjQUFjLEVBQUU4QixzQkFBc0IsQ0FBQ2hDLFFBSHpDO0FBSUUsVUFBQSxpQkFBaUIsRUFBRThCLG9CQUFvQixDQUFDOUI7QUFKMUMsVUFKSixlQVdFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUVOLEtBQUssQ0FBQzJDLGNBQU4sQ0FBcUIwQztBQURoQyxXQUVNaEQsdUJBRk4sRUFERixlQUtFLGdDQUFDLGVBQUQsZ0NBQXFCckMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFMRixDQVhGLENBRkYsZUF1QkUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsY0FBekI7QUFBeUMsVUFBQSxXQUFXO0FBQXBELFdBQ0dwQyxLQUFLLENBQUNDLE1BQU4sQ0FBYXFELFNBQWIsZ0JBQ0MsZ0NBQUMsZUFBRCxnQ0FDTXRELEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCZ0MsU0FEOUIsRUFFTW5DLG9CQUZOO0FBR0UsVUFBQSxRQUFRLEVBQUUsQ0FBQ3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhcUQsU0FIMUI7QUFJRSxVQUFBLEtBQUssRUFBRTtBQUpULFdBREQsZ0JBUUMsZ0NBQUMsZUFBRCxnQ0FDTXRELEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCYyxTQUQ5QixFQUVNakIsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRTtBQUhULFdBVEosZUFlRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCO0FBRGhDLFdBRU10Qix1QkFGTixFQURGLENBZkYsQ0F2QkYsRUErQ0dyQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QitCLGNBQXhCLGdCQUNDLGdDQUFDLGdCQUFEO0FBQWtCLFVBQUEsS0FBSyxFQUFDLGdDQUF4QjtBQUF5RCxVQUFBLFdBQVc7QUFBcEUsd0JBQ0UsZ0NBQUMsZUFBRCxnQ0FDTXRFLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCK0IsY0FEOUIsRUFFTWxDLG9CQUZOLEVBREYsQ0FERCxHQU9HLElBdEROLENBREY7QUEwREQ7QUE5Z0JIO0FBQUE7QUFBQSxhQWdoQkUsdUNBS0c7QUFBQSxZQUpEcEMsS0FJQyxTQUpEQSxLQUlDO0FBQUEsWUFIRG9DLG9CQUdDLFNBSERBLG9CQUdDO0FBQUEsWUFGREUsc0JBRUMsU0FGREEsc0JBRUM7QUFBQSxZQURERCx1QkFDQyxTQUREQSx1QkFDQztBQUFBLG9DQUdHckMsS0FISCxDQUVDc0YsSUFGRCxDQUVRQyxZQUZSO0FBQUEsWUFFUUEsWUFGUixzQ0FFdUIsRUFGdkI7QUFLRCw0QkFDRSxnQ0FBQyw2QkFBRCxxQkFFRSxnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRSxhQUF6QjtBQUF3QyxVQUFBLFdBQVc7QUFBbkQsV0FDR3ZGLEtBQUssQ0FBQ0MsTUFBTixDQUFheUMsVUFBYixnQkFDQyxnQ0FBQyx1QkFBRCxFQUE2Qk4sb0JBQTdCLENBREQsZ0JBR0MsZ0NBQUMsa0JBQUQsRUFBd0JFLHNCQUF4QixDQUpKLGVBTUUsZ0NBQUMsK0NBQUQscUJBQ0UsZ0NBQUMsc0JBQUQ7QUFDRSxVQUFBLE9BQU8sRUFBRXRDLEtBQUssQ0FBQzJDLGNBQU4sQ0FBcUJDO0FBRGhDLFdBRU1QLHVCQUZOLEVBREYsZUFLRSxnQ0FBQyxlQUFELGdDQUFxQnJDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCTSxPQUE3QyxFQUEwRFQsb0JBQTFELEVBTEYsQ0FORixDQUZGLGVBa0JFLGdDQUFDLGdCQUFELGdDQUFzQkEsb0JBQXRCO0FBQTRDLFVBQUEsS0FBSyxFQUFDLG1CQUFsRDtBQUFzRSxVQUFBLFdBQVc7QUFBakYsWUFDR3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhcUQsU0FBYixnQkFDQyxnQ0FBQyxlQUFELGdDQUNNdEQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JnQyxTQUQ5QixFQUVNbkMsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRTtBQUhULFdBREQsZ0JBT0MsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCYyxTQUQ5QixFQUVNakIsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRTtBQUhULFdBUkosZUFlRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCO0FBRGhDLFdBRU10Qix1QkFGTixFQURGLENBZkYsQ0FsQkYsZUEwQ0UsZ0NBQUMsZ0JBQUQsZ0NBQ01ELG9CQUROLEVBRU9tRCxZQUFZLENBQUNDLE9BQWIsR0FBdUJ4RixLQUFLLENBQUN1QyxpQkFBTixDQUF3QmtELE9BQS9DLEdBQXlELEVBRmhFO0FBR0UsVUFBQSxLQUFLLEVBQUMsbUJBSFI7QUFJRSxVQUFBLFdBQVcsRUFBQztBQUpkLHlCQU1FLGdDQUFDLGVBQUQsZ0NBQ016RixLQUFLLENBQUN1QyxpQkFBTixDQUF3Qm1ELFdBRDlCLEVBRU10RCxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFO0FBSFQsV0FORixDQTFDRixDQURGO0FBeUREO0FBbmxCSDtBQUFBO0FBQUEsYUFxbEJFLDBDQUtHO0FBQUEsWUFKRHBDLEtBSUMsU0FKREEsS0FJQztBQUFBLFlBSERvQyxvQkFHQyxTQUhEQSxvQkFHQztBQUFBLFlBRkRFLHNCQUVDLFNBRkRBLHNCQUVDO0FBQUEsWUFEREQsdUJBQ0MsU0FEREEsdUJBQ0M7QUFBQSxxQ0FJR3JDLEtBSkgsQ0FFQ3NGLElBRkQsQ0FFUUMsWUFGUjtBQUFBLFlBRVFBLFlBRlIsdUNBRXVCLEVBRnZCO0FBQUEsWUFHVXBDLFNBSFYsR0FJR25ELEtBSkgsQ0FHQ0MsTUFIRCxDQUdVa0QsU0FIVjtBQU1ELDRCQUNFLGdDQUFDLDZCQUFELFFBRUdvQyxZQUFZLENBQUNDLE9BQWIsSUFBd0JELFlBQVksQ0FBQ3ZDLEtBQXJDLGdCQUNDLGdDQUFDLGdCQUFELGdDQUNNaEQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JDLE1BRDlCLEVBRU1KLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUMsaUJBSFI7QUFJRSxVQUFBLFdBQVc7QUFKYixZQU1HcEMsS0FBSyxDQUFDQyxNQUFOLENBQWF5QyxVQUFiLGdCQUNDLGdDQUFDLHVCQUFELEVBQTZCTixvQkFBN0IsQ0FERCxnQkFHQyxnQ0FBQyxrQkFBRCxFQUF3QkUsc0JBQXhCLENBVEosZUFXRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFdEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQkM7QUFEaEMsV0FFTVAsdUJBRk4sRUFERixlQUtFLGdDQUFDLGVBQUQsZ0NBQXFCckMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFMRixDQVhGLENBREQsR0FvQkcsSUF0Qk4sZUF5QkUsZ0NBQUMsZ0JBQUQsZ0NBQ01wQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QmtELE9BRDlCLEVBRU1yRCxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFDLG1CQUhSO0FBSUUsVUFBQSxXQUFXO0FBSmIsWUFNR3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhaUQsZ0JBQWIsZ0JBQ0MsZ0NBQUMsdUJBQUQsZ0NBQTZCZCxvQkFBN0I7QUFBbUQsVUFBQSxRQUFRLEVBQUM7QUFBNUQsV0FERCxnQkFHQyxnQ0FBQyxrQkFBRCxnQ0FDTUEsb0JBRE47QUFFRSxVQUFBLGFBQWEsRUFBRXBDLEtBQUssQ0FBQ0MsTUFBTixDQUFha0QsU0FBYixDQUF1QkMsV0FGeEM7QUFHRSxVQUFBLFFBQVEsRUFBQztBQUhYLFdBVEosZUFlRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEQsS0FBSyxDQUFDMkMsY0FBTixDQUFxQlM7QUFEaEMsV0FFTWYsdUJBRk4sRUFERixlQUtFLGdDQUFDLGVBQUQsZ0NBQ01yQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3Qm9ELGFBRDlCLEVBRU12RCxvQkFGTixFQUxGLENBZkYsQ0F6QkYsZUFxREUsZ0NBQUMsZ0JBQUQsZ0NBQ01BLG9CQUROLEVBRU9tRCxZQUFZLENBQUNDLE9BQWIsR0FBdUJ4RixLQUFLLENBQUN1QyxpQkFBTixDQUF3QmtELE9BQS9DLEdBQXlELEVBRmhFO0FBR0UsVUFBQSxLQUFLLEVBQUMsbUJBSFI7QUFJRSxVQUFBLFdBQVc7QUFKYixZQU1HekYsS0FBSyxDQUFDQyxNQUFOLENBQWFxRCxTQUFiLGdCQUNDLGdDQUFDLGVBQUQsZ0NBQ010RCxLQUFLLENBQUN1QyxpQkFBTixDQUF3QmdDLFNBRDlCLEVBRU1uQyxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFO0FBSFQsV0FERCxnQkFPQyxnQ0FBQyxlQUFELGdDQUNNcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JjLFNBRDlCLEVBRU1qQixvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFO0FBSFQsV0FiSixlQW1CRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCO0FBRGhDLFdBRU10Qix1QkFGTixFQURGLENBbkJGLENBckRGLEVBaUZHa0QsWUFBWSxDQUFDQyxPQUFiLGdCQUNDLGdDQUFDLGdCQUFELGdDQUNNcEQsb0JBRE4sRUFFTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCOEIsUUFGOUI7QUFHRSxVQUFBLFFBQVEsRUFBRSxDQUFDbEIsU0FBUyxDQUFDWCxNQUh2QjtBQUlFLFVBQUEsV0FBVztBQUpiLHlCQU1FLGdDQUFDLGVBQUQsZ0NBQ014QyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QitCLGNBRDlCLEVBRU1sQyxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFO0FBSFQsV0FORixlQVdFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUVwQyxLQUFLLENBQUMyQyxjQUFOLENBQXFCaUQ7QUFEaEMsV0FFTXZELHVCQUZOLEVBREYsZUFLRSxnQ0FBQyxlQUFELGdDQUNNckMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JpQyx5QkFEOUIsRUFFTXBDLG9CQUZOLEVBTEYsZUFTRSxnQ0FBQyxlQUFELGdDQUFxQkEsb0JBQXJCLEVBQStDcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JzRCxTQUF2RSxFQVRGLENBWEYsQ0FERCxHQXdCRyxJQXpHTixFQTRHR04sWUFBWSxDQUFDdkMsS0FBYixnQkFDQyxnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRSxjQUF6QjtBQUF5QyxVQUFBLFdBQVc7QUFBcEQsV0FDRyxDQUFDaEQsS0FBSyxDQUFDQyxNQUFOLENBQWE2RixXQUFkLGdCQUNDLGdDQUFDLGVBQUQsZ0NBQ005RixLQUFLLENBQUN1QyxpQkFBTixDQUF3QmdCLE1BRDlCLEVBRU1uQixvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFLEtBSFQ7QUFJRSxVQUFBLFFBQVEsRUFBRW9CLE9BQU8sQ0FBQ3hELEtBQUssQ0FBQ0MsTUFBTixDQUFhNkYsV0FBZDtBQUpuQixXQURELGdCQVFDLGdDQUFDLGVBQUQsZ0NBQ005RixLQUFLLENBQUN1QyxpQkFBTixDQUF3QmtCLFdBRDlCLEVBRU1yQixvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFFLEtBSFQ7QUFJRSxVQUFBLFFBQVEsRUFBRSxDQUFDcEMsS0FBSyxDQUFDQyxNQUFOLENBQWE2RjtBQUoxQixXQVRKLGVBZ0JFLGdDQUFDLCtDQUFELHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxPQUFPLEVBQUU5RixLQUFLLENBQUMyQyxjQUFOLENBQXFCWTtBQURoQyxXQUVNbEIsdUJBRk4sRUFERixDQWhCRixDQURELEdBd0JHLElBcElOLENBREY7QUF3SUQ7QUF4dUJIO0FBQUE7QUFBQSxhQTB1QkUsc0NBQW9EO0FBQUEsWUFBOUJyQyxLQUE4QixVQUE5QkEsS0FBOEI7QUFBQSxZQUF2Qm9DLG9CQUF1QixVQUF2QkEsb0JBQXVCO0FBQ2xELDRCQUNFLGdDQUFDLGVBQUQscUJBQ0UsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsZUFBekI7QUFBMEMsVUFBQSxXQUFXO0FBQXJELHdCQUNFLGdDQUFDLHdCQUFEO0FBQ0UsVUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLFVBQUEsTUFBTSxFQUFDLFlBRlQ7QUFHRSxVQUFBLFFBQVEsRUFBRSxrQkFBQTJELENBQUMsRUFBSTtBQUNiLGdCQUFJQSxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsS0FBVCxJQUFrQkYsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLEtBQVQsQ0FBZSxDQUFmLENBQXRCLEVBQXlDO0FBQ3ZDLGtCQUFNQyxHQUFHLEdBQUdDLEdBQUcsQ0FBQ0MsZUFBSixDQUFvQkwsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLEtBQVQsQ0FBZSxDQUFmLENBQXBCLENBQVo7QUFDQTdELGNBQUFBLG9CQUFvQixDQUFDOUIsUUFBckIsQ0FBOEI7QUFBQytGLGdCQUFBQSxVQUFVLEVBQUVIO0FBQWIsZUFBOUI7QUFDRDtBQUNGO0FBUkgsVUFERixDQURGLGVBYUUsZ0NBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxLQUFLLEVBQUUsc0JBQXpCO0FBQWlELFVBQUEsV0FBVztBQUE1RCx3QkFDRSxnQ0FBQyxlQUFELGdDQUNNbEcsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0IrRCxTQUQ5QixFQUVNbEUsb0JBRk47QUFHRSxVQUFBLFFBQVEsRUFBRTtBQUhaLFdBREYsZUFNRSxnQ0FBQyxlQUFELGdDQUNNcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JnRSxNQUQ5QixFQUVNbkUsb0JBRk47QUFHRSxVQUFBLFFBQVEsRUFBRTtBQUhaLFdBTkYsZUFXRSxnQ0FBQyxlQUFELGdDQUNNcEMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JpRSxNQUQ5QixFQUVNcEUsb0JBRk47QUFHRSxVQUFBLFFBQVEsRUFBRTtBQUhaLFdBWEYsZUFnQkUsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCa0UsTUFEOUIsRUFFTXJFLG9CQUZOO0FBR0UsVUFBQSxRQUFRLEVBQUU7QUFIWixXQWhCRixDQWJGLENBREY7QUFzQ0Q7QUFqeEJIO0FBQUE7QUFBQSxhQW14QkUsc0NBS0c7QUFBQSxZQUpEcEMsS0FJQyxVQUpEQSxLQUlDO0FBQUEsWUFIRG9DLG9CQUdDLFVBSERBLG9CQUdDO0FBQUEsWUFGREUsc0JBRUMsVUFGREEsc0JBRUM7QUFBQSxZQURERCx1QkFDQyxVQUREQSx1QkFDQztBQUFBLFlBRVVjLFNBRlYsR0FHR25ELEtBSEgsQ0FFQ0MsTUFGRCxDQUVVa0QsU0FGVjtBQUtELDRCQUNFLGdDQUFDLDZCQUFELHFCQUVFLGdDQUFDLGdCQUFELGdDQUNNbkQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JDLE1BRDlCLEVBRU1KLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUMsaUJBSFI7QUFJRSxVQUFBLFdBQVc7QUFKYixZQU1HcEMsS0FBSyxDQUFDQyxNQUFOLENBQWF5QyxVQUFiLGdCQUNDLGdDQUFDLHVCQUFELEVBQTZCTixvQkFBN0IsQ0FERCxnQkFHQyxnQ0FBQyxrQkFBRCxFQUF3QkUsc0JBQXhCLENBVEosZUFXRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFdEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQkM7QUFEaEMsV0FFTVAsdUJBRk4sRUFERixlQUtFLGdDQUFDLGVBQUQsZ0NBQXFCckMsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JNLE9BQTdDLEVBQTBEVCxvQkFBMUQsRUFMRixDQVhGLENBRkYsZUF1QkUsZ0NBQUMsZ0JBQUQsZ0NBQ01wQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QmtELE9BRDlCLEVBRU1yRCxvQkFGTjtBQUdFLFVBQUEsS0FBSyxFQUFDLG1CQUhSO0FBSUUsVUFBQSxXQUFXO0FBSmIsWUFNR3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhaUQsZ0JBQWIsZ0JBQ0MsZ0NBQUMsdUJBQUQsZ0NBQTZCZCxvQkFBN0I7QUFBbUQsVUFBQSxRQUFRLEVBQUM7QUFBNUQsV0FERCxnQkFHQyxnQ0FBQyxrQkFBRCxnQ0FDTUEsb0JBRE47QUFFRSxVQUFBLGFBQWEsRUFBRXBDLEtBQUssQ0FBQ0MsTUFBTixDQUFha0QsU0FBYixDQUF1QkMsV0FGeEM7QUFHRSxVQUFBLFFBQVEsRUFBQztBQUhYLFdBVEosZUFlRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEQsS0FBSyxDQUFDMkMsY0FBTixDQUFxQlM7QUFEaEMsV0FFTWYsdUJBRk4sRUFERixDQWZGLENBdkJGLGVBK0NFLGdDQUFDLGdCQUFELGdDQUFzQkQsb0JBQXRCO0FBQTRDLFVBQUEsS0FBSyxFQUFDLG1CQUFsRDtBQUFzRSxVQUFBLFdBQVc7QUFBakYsWUFDR3BDLEtBQUssQ0FBQ0MsTUFBTixDQUFhcUQsU0FBYixnQkFDQyxnQ0FBQyxlQUFELGdDQUNNdEQsS0FBSyxDQUFDdUMsaUJBQU4sQ0FBd0JnQyxTQUQ5QixFQUVNbkMsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRTtBQUhULFdBREQsZ0JBT0MsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCYyxTQUQ5QixFQUVNakIsb0JBRk47QUFHRSxVQUFBLEtBQUssRUFBRTtBQUhULFdBUkosZUFjRSxnQ0FBQywrQ0FBRCxxQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFcEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmdCO0FBRGhDLFdBRU10Qix1QkFGTixFQURGLENBZEYsQ0EvQ0YsZUFzRUUsZ0NBQUMsZ0JBQUQsZ0NBQ01ELG9CQUROLEVBRU1wQyxLQUFLLENBQUN1QyxpQkFBTixDQUF3QjhCLFFBRjlCO0FBR0UsVUFBQSxRQUFRLEVBQUUsQ0FBQ2xCLFNBQVMsQ0FBQ1gsTUFIdkI7QUFJRSxVQUFBLFdBQVc7QUFKYix5QkFNRSxnQ0FBQyxzQkFBRDtBQUNFLFVBQUEsT0FBTyxFQUFFeEMsS0FBSyxDQUFDMkMsY0FBTixDQUFxQmlEO0FBRGhDLFdBRU12RCx1QkFGTixFQU5GLGVBVUUsZ0NBQUMsZUFBRCxnQ0FDTXJDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCK0IsY0FEOUIsRUFFTWxDLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUM7QUFIUixXQVZGLGVBZUUsZ0NBQUMsK0NBQUQscUJBQ0UsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCbUUsV0FEOUIsRUFFTXRFLG9CQUZOO0FBR0UsVUFBQSxLQUFLLEVBQUM7QUFIUixXQURGLGVBTUUsZ0NBQUMsZUFBRCxnQ0FDTXBDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCaUMseUJBRDlCLEVBRU1wQyxvQkFGTixFQU5GLGVBVUUsZ0NBQUMsZUFBRCxnQ0FBcUJBLG9CQUFyQixFQUErQ3BDLEtBQUssQ0FBQ3VDLGlCQUFOLENBQXdCc0QsU0FBdkUsRUFWRixDQWZGLENBdEVGLENBREY7QUFxR0Q7QUFsNEJIO0FBQUE7QUFBQSxhQW80QkUsa0JBQVM7QUFBQTs7QUFBQSwwQkFDeUUsS0FBS3RHLEtBRDlFO0FBQUEsWUFDQVMsS0FEQSxlQUNBQSxLQURBO0FBQUEsWUFDT0QsUUFEUCxlQUNPQSxRQURQO0FBQUEsWUFDaUJRLGlCQURqQixlQUNpQkEsaUJBRGpCO0FBQUEsWUFDb0NvRyxnQkFEcEMsZUFDb0NBLGdCQURwQztBQUFBLFlBQ3NEQyxlQUR0RCxlQUNzREEsZUFEdEQ7O0FBQUEscUJBRXVDNUcsS0FBSyxDQUFDQyxNQUFOLENBQWFDLE1BQWIsR0FDMUNILFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxNQUFOLENBQWFDLE1BQWQsQ0FEa0MsR0FFMUMsRUFKRztBQUFBLG1DQUVBQyxNQUZBO0FBQUEsWUFFQUEsTUFGQSw4QkFFUyxFQUZUO0FBQUEsdUNBRWEwRyxVQUZiO0FBQUEsWUFFYUEsVUFGYixrQ0FFMEJDLFNBRjFCOztBQUFBLFlBS0E3RyxNQUxBLEdBS1VELEtBTFYsQ0FLQUMsTUFMQTtBQU9QLFlBQU1tQyxvQkFBb0IsR0FBRzFCLHVCQUF1QixDQUFDLEtBQUtuQixLQUFOLENBQXBEO0FBQ0EsWUFBTStDLHNCQUFzQixHQUFHakMseUJBQXlCLENBQUMsS0FBS2QsS0FBTixDQUF4RDtBQUNBLFlBQU04Qyx1QkFBdUIsR0FBR3pCLDBCQUEwQixDQUFDLEtBQUtyQixLQUFOLENBQTFEO0FBQ0EsWUFBTXdILE9BQU8sR0FBRzNHLGVBQWUsQ0FBQ0wsUUFBRCxFQUFXQyxLQUFYLENBQS9CO0FBQ0EsWUFBTWdILGNBQWMsR0FBR2hILEtBQUssQ0FBQzhDLElBQU4scUJBQXdCLGtDQUFzQjlDLEtBQUssQ0FBQzhDLElBQTVCLENBQXhCLGdCQUF2QjtBQUVBLDRCQUNFLGdDQUFDLHVCQUFELFFBQ0c5QyxLQUFLLENBQUNpSCxjQUFOLGdCQUNDLGdDQUFDLFdBQUQ7QUFBYSxVQUFBLE9BQU8sRUFBRTtBQUFBLG1CQUFNLEtBQUksQ0FBQzFILEtBQUwsQ0FBVzJILFNBQVgsQ0FBcUJsSCxLQUFLLENBQUNpSCxjQUEzQixDQUFOO0FBQUE7QUFBdEIsVUFERCxHQUVHLElBSE4sZUFJRSxnQ0FBQyxnQkFBRDtBQUFrQixVQUFBLEtBQUssRUFBRSxhQUF6QjtBQUF3QyxVQUFBLFdBQVcsTUFBbkQ7QUFBb0QsVUFBQSxRQUFRLEVBQUUsQ0FBQ2pILEtBQUssQ0FBQ21ILGFBQU47QUFBL0Qsd0JBQ0UsZ0NBQUMsaUJBQUQ7QUFDRSxVQUFBLFFBQVEsRUFBRXBILFFBRFo7QUFFRSxVQUFBLEtBQUssRUFBRUMsS0FGVDtBQUdFLFVBQUEsZ0JBQWdCLEVBQUUyRyxnQkFIcEI7QUFJRSxVQUFBLFFBQVEsRUFBRUM7QUFKWixVQURGLEVBT0dRLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZdEgsUUFBWixFQUFzQnVILE1BQXRCLEdBQStCLENBQS9CLGlCQUNDLGdDQUFDLGtCQUFEO0FBQ0UsVUFBQSxRQUFRLEVBQUV2SCxRQURaO0FBRUUsVUFBQSxFQUFFLEVBQUVDLEtBQUssQ0FBQ3VILEVBRlo7QUFHRSxVQUFBLE1BQU0sRUFBRXRILE1BQU0sQ0FBQ0MsTUFIakI7QUFJRSxVQUFBLFFBQVEsRUFBRSxrQkFBQXNILEtBQUs7QUFBQSxtQkFBSWpILGlCQUFpQixDQUFDO0FBQUNMLGNBQUFBLE1BQU0sRUFBRXNIO0FBQVQsYUFBRCxDQUFyQjtBQUFBO0FBSmpCLFVBUkosZUFlRSxnQ0FBQyxpQkFBRDtBQUNFLFVBQUEsV0FBVyxFQUFFeEgsS0FBSyxDQUFDeUgsV0FEckI7QUFFRSxVQUFBLE9BQU8sRUFBRXpILEtBQUssQ0FBQ0MsTUFBTixDQUFheUgsT0FGeEI7QUFHRSxVQUFBLGlCQUFpQixFQUFFMUgsS0FBSyxDQUFDMkgsaUJBQU4sQ0FBd0JDLElBQXhCLENBQTZCNUgsS0FBN0IsQ0FIckI7QUFJRSxVQUFBLFlBQVksRUFBRUEsS0FBSyxDQUFDNkgsWUFBTixDQUFtQkQsSUFBbkIsQ0FBd0I1SCxLQUF4QixDQUpoQjtBQUtFLFVBQUEsWUFBWSxFQUFFQSxLQUFLLENBQUM4SCxZQUx0QjtBQU1FLFVBQUEsTUFBTSxFQUFFM0gsTUFOVjtBQU9FLFVBQUEsVUFBVSxFQUFFMEcsVUFQZDtBQVFFLFVBQUEsaUJBQWlCLEVBQUV0RyxpQkFSckI7QUFTRSxVQUFBLGVBQWUsRUFBRSxLQUFLaEIsS0FBTCxDQUFXcUg7QUFUOUIsVUFmRixDQUpGLEVBK0JHLEtBQUtJLGNBQUwsS0FDQyxLQUFLQSxjQUFMLEVBQXFCO0FBQ25CaEgsVUFBQUEsS0FBSyxFQUFMQSxLQURtQjtBQUVuQitHLFVBQUFBLE9BQU8sRUFBUEEsT0FGbUI7QUFHbkIzRSxVQUFBQSxvQkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkMsVUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFKbUI7QUFLbkJDLFVBQUFBLHNCQUFzQixFQUF0QkE7QUFMbUIsU0FBckIsQ0FoQ0osQ0FERjtBQTBDRDtBQTM3Qkg7QUFBQTtBQUFBLElBQ2dDeUYsZ0JBRGhDOztBQUFBLG1DQUNNL0YsaUJBRE4sZUFFcUI7QUFDakJoQyxJQUFBQSxLQUFLLEVBQUVnSSxzQkFBVUMsTUFBVixDQUFpQkMsVUFEUDtBQUVqQm5JLElBQUFBLFFBQVEsRUFBRWlJLHNCQUFVQyxNQUFWLENBQWlCQyxVQUZWO0FBR2pCdkIsSUFBQUEsZ0JBQWdCLEVBQUVxQixzQkFBVUcsT0FBVixDQUFrQkgsc0JBQVVJLEdBQTVCLEVBQWlDRixVQUhsQztBQUlqQmhCLElBQUFBLFNBQVMsRUFBRWMsc0JBQVVLLElBQVYsQ0FBZUgsVUFKVDtBQUtqQjNILElBQUFBLGlCQUFpQixFQUFFeUgsc0JBQVVLLElBQVYsQ0FBZUgsVUFMakI7QUFNakJ0QixJQUFBQSxlQUFlLEVBQUVvQixzQkFBVUssSUFBVixDQUFlSCxVQU5mO0FBT2pCdkgsSUFBQUEsb0JBQW9CLEVBQUVxSCxzQkFBVUssSUFBVixDQUFlSCxVQVBwQjtBQVFqQnJILElBQUFBLDhCQUE4QixFQUFFbUgsc0JBQVVLLElBQVYsQ0FBZUgsVUFSOUI7QUFTakJ6SCxJQUFBQSxrQkFBa0IsRUFBRXVILHNCQUFVSyxJQUFWLENBQWVIO0FBVGxCLEdBRnJCO0FBODdCQSxTQUFPbEcsaUJBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQTs7O0FBRUEsSUFBTXNHLGlCQUFpQixHQUFHbkosNkJBQU9DLEdBQVYsK0lBQXZCOztBQU1PLElBQU1tSixXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLE1BQUVDLE9BQUYsVUFBRUEsT0FBRjtBQUFBLHNCQUN6QixnQ0FBQyxpQkFBRCxxQkFDRSxnQ0FBQyx5QkFBRDtBQUFRLElBQUEsSUFBSSxNQUFaO0FBQWEsSUFBQSxLQUFLLE1BQWxCO0FBQW1CLElBQUEsT0FBTyxFQUFFQTtBQUE1QixrQkFDRSxnQ0FBQyw4QkFBRDtBQUFrQixJQUFBLEVBQUUsRUFBRTtBQUF0QixJQURGLENBREYsQ0FEeUI7QUFBQSxDQUFwQjs7OztBQVFBLElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUI7QUFBQSxNQUNoQ3pJLEtBRGdDLFVBQ2hDQSxLQURnQztBQUFBLE1BRWhDTSxRQUZnQyxVQUVoQ0EsUUFGZ0M7QUFBQSxNQUdoQ21DLEtBSGdDLFVBR2hDQSxLQUhnQztBQUFBLE1BSWhDaUcsYUFKZ0MsVUFJaENBLGFBSmdDO0FBQUEsK0JBS2hDQyxRQUxnQztBQUFBLE1BS2hDQSxRQUxnQyxnQ0FLckIsT0FMcUI7QUFBQSxNQU1oQ25JLFdBTmdDLFVBTWhDQSxVQU5nQztBQUFBLHNCQVFoQyxnQ0FBQyxtQ0FBRCxxQkFDRSxnQ0FBQyx5QkFBRDtBQUNFLElBQUEsU0FBUyxFQUFFLENBQ1Q7QUFDRWtJLE1BQUFBLGFBQWEsRUFBRUEsYUFBYSxJQUFJMUksS0FBSyxDQUFDQyxNQUFOLENBQWEyQyxLQUQvQztBQUVFZ0csTUFBQUEsUUFBUSxFQUFFLGtCQUFBQyxRQUFRO0FBQUEsZUFBSXZJLFFBQVEsc0NBQUdxSSxRQUFILEVBQWNFLFFBQWQsRUFBWjtBQUFBO0FBRnBCLEtBRFMsQ0FEYjtBQU9FLElBQUEsT0FBTyxFQUFFN0ksS0FBSyxDQUFDQyxNQUFOLENBQWE2SSxPQUFiLENBQXFCSCxRQUFyQixDQVBYO0FBUUUsSUFBQSxVQUFVLEVBQUUsb0JBQUFJLFNBQVM7QUFBQSxhQUFJdkksV0FBVSxDQUFDbUksUUFBRCxFQUFXSSxTQUFYLENBQWQ7QUFBQTtBQVJ2QixJQURGLENBUmdDO0FBQUEsQ0FBM0I7Ozs7QUFzQkEsSUFBTUMscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QjtBQUFBLE1BQ25DaEosS0FEbUMsVUFDbkNBLEtBRG1DO0FBQUEsTUFFbkNpSixjQUZtQyxVQUVuQ0EsY0FGbUM7QUFBQSxNQUduQ0MsaUJBSG1DLFVBR25DQSxpQkFIbUM7QUFBQSwrQkFJbkNQLFFBSm1DO0FBQUEsTUFJbkNBLFFBSm1DLGdDQUl4QixPQUp3QjtBQUFBLE1BS25DbkksWUFMbUMsVUFLbkNBLFVBTG1DO0FBQUEsc0JBT25DLGdDQUFDLG1DQUFELHFCQUNFLGdDQUFDLHlCQUFEO0FBQ0UsSUFBQSxTQUFTLEVBQUUsQ0FDVDtBQUNFa0ksTUFBQUEsYUFBYSxFQUFFMUksS0FBSyxDQUFDQyxNQUFOLENBQWEyQyxLQUQ5QjtBQUVFZ0csTUFBQUEsUUFBUSxFQUFFLGtCQUFBQyxRQUFRO0FBQUEsZUFBSUksY0FBYyxDQUFDO0FBQUNyRyxVQUFBQSxLQUFLLEVBQUVpRztBQUFSLFNBQUQsQ0FBbEI7QUFBQSxPQUZwQjtBQUdFcEcsTUFBQUEsS0FBSyxFQUFFO0FBSFQsS0FEUyxFQU1UO0FBQ0VpRyxNQUFBQSxhQUFhLEVBQUUxSSxLQUFLLENBQUNDLE1BQU4sQ0FBYWtELFNBQWIsQ0FBdUJnRyxXQUF2QixJQUFzQ25KLEtBQUssQ0FBQ0MsTUFBTixDQUFhMkMsS0FEcEU7QUFFRWdHLE1BQUFBLFFBQVEsRUFBRSxrQkFBQUMsUUFBUTtBQUFBLGVBQUlLLGlCQUFpQixDQUFDO0FBQUNDLFVBQUFBLFdBQVcsRUFBRU47QUFBZCxTQUFELENBQXJCO0FBQUEsT0FGcEI7QUFHRXBHLE1BQUFBLEtBQUssRUFBRTtBQUhULEtBTlMsQ0FEYjtBQWFFLElBQUEsT0FBTyxFQUFFekMsS0FBSyxDQUFDQyxNQUFOLENBQWE2SSxPQUFiLENBQXFCSCxRQUFyQixDQWJYO0FBY0UsSUFBQSxVQUFVLEVBQUUsb0JBQUFJLFNBQVM7QUFBQSxhQUFJdkksWUFBVSxDQUFDbUksUUFBRCxFQUFXSSxTQUFYLENBQWQ7QUFBQTtBQWR2QixJQURGLENBUG1DO0FBQUEsQ0FBOUI7Ozs7QUEyQkEsSUFBTUssdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQjtBQUFBLE1BQUVwSixLQUFGLFVBQUVBLEtBQUY7QUFBQSxNQUFTTSxRQUFULFVBQVNBLFFBQVQ7QUFBQSwrQkFBbUJxSSxRQUFuQjtBQUFBLE1BQW1CQSxRQUFuQixnQ0FBOEIsWUFBOUI7QUFBQSxNQUE0Q25JLFlBQTVDLFVBQTRDQSxVQUE1QztBQUFBLHNCQUNyQyxnQ0FBQyxtQ0FBRCxxQkFDRSxnQ0FBQyx5QkFBRDtBQUNFLElBQUEsU0FBUyxFQUFFLENBQ1Q7QUFDRWtJLE1BQUFBLGFBQWEsRUFBRTFJLEtBQUssQ0FBQ0MsTUFBTixDQUFha0QsU0FBYixDQUF1QndGLFFBQXZCLENBRGpCO0FBRUVVLE1BQUFBLE9BQU8sRUFBRSxJQUZYO0FBR0VULE1BQUFBLFFBQVEsRUFBRSxrQkFBQVUsVUFBVTtBQUFBLGVBQUloSixRQUFRLHNDQUFHcUksUUFBSCxFQUFjVyxVQUFkLEVBQVo7QUFBQTtBQUh0QixLQURTLENBRGI7QUFRRSxJQUFBLE9BQU8sRUFBRXRKLEtBQUssQ0FBQ0MsTUFBTixDQUFhNkksT0FBYixDQUFxQkgsUUFBckIsQ0FSWDtBQVNFLElBQUEsVUFBVSxFQUFFLG9CQUFBSSxTQUFTO0FBQUEsYUFBSXZJLFlBQVUsQ0FBQ21JLFFBQUQsRUFBV0ksU0FBWCxDQUFkO0FBQUE7QUFUdkIsSUFERixDQURxQztBQUFBLENBQWhDOzs7QUFnQlAzSCw2QkFBNkIsQ0FBQ0wsSUFBOUIsR0FBcUMsQ0FBQ3dJLG9DQUFELENBQXJDOztBQUNPLFNBQVNuSSw2QkFBVCxDQUF1Q29JLHdCQUF2QyxFQUFpRTtBQUN0RSxNQUFNNUgsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixTQUFxRDtBQUFBLFFBQW5ENUIsS0FBbUQsVUFBbkRBLEtBQW1EO0FBQUEsUUFBNUN5SixPQUE0QyxVQUE1Q0EsT0FBNEM7QUFBQSxRQUFuQ25KLFFBQW1DLFVBQW5DQSxRQUFtQztBQUFBLFFBQXpCSCxNQUF5QixVQUF6QkEsTUFBeUI7QUFBQSxRQUFqQnVKLFdBQWlCLFVBQWpCQSxXQUFpQjtBQUFBLFFBRWhGQyxnQkFGZ0YsR0FXOUVGLE9BWDhFLENBRWhGRSxnQkFGZ0Y7QUFBQSxRQUdoRkMsTUFIZ0YsR0FXOUVILE9BWDhFLENBR2hGRyxNQUhnRjtBQUFBLFFBSWhGQyxLQUpnRixHQVc5RUosT0FYOEUsQ0FJaEZJLEtBSmdGO0FBQUEsUUFLaEZDLEdBTGdGLEdBVzlFTCxPQVg4RSxDQUtoRkssR0FMZ0Y7QUFBQSxRQU1oRm5CLFFBTmdGLEdBVzlFYyxPQVg4RSxDQU1oRmQsUUFOZ0Y7QUFBQSxRQU9oRm9CLEtBUGdGLEdBVzlFTixPQVg4RSxDQU9oRk0sS0FQZ0Y7QUFBQSxRQVFoRkMsS0FSZ0YsR0FXOUVQLE9BWDhFLENBUWhGTyxLQVJnRjtBQUFBLFFBU2hGQyxjQVRnRixHQVc5RVIsT0FYOEUsQ0FTaEZRLGNBVGdGO0FBQUEsUUFVaEZDLG1CQVZnRixHQVc5RVQsT0FYOEUsQ0FVaEZTLG1CQVZnRjtBQVlsRixRQUFNQywwQkFBMEIsR0FDOUJELG1CQUFtQixJQUFJRSxnREFBK0JULGdCQUEvQixDQUR6QjtBQUVBLFFBQU1VLGVBQWUsR0FBR2xLLE1BQU0sQ0FBQ21LLE1BQVAsQ0FBYztBQUFBLFVBQUV4SCxJQUFGLFVBQUVBLElBQUY7QUFBQSxhQUFZcUgsMEJBQTBCLENBQUNJLFFBQTNCLENBQW9DekgsSUFBcEMsQ0FBWjtBQUFBLEtBQWQsQ0FBeEI7QUFDQSxRQUFNMEgsWUFBWSxHQUFHeEssS0FBSyxDQUFDeUssZUFBTixDQUFzQmhCLE9BQU8sQ0FBQ0ssR0FBOUIsQ0FBckI7QUFDQSxRQUFNWSxTQUFTLEdBQUcsQ0FBQzFLLEtBQUssQ0FBQzJLLFlBQVAsSUFBdUIzSyxLQUFLLENBQUNDLE1BQU4sQ0FBYStKLEtBQWIsQ0FBdkIsSUFBOENRLFlBQVksQ0FBQ2xELE1BQWIsR0FBc0IsQ0FBdEY7QUFDQSxRQUFNc0Qsa0JBQWtCLEdBQUcsdUNBQTNCO0FBRUEsd0JBQ0UsZ0NBQUMsd0JBQUQ7QUFDRSxNQUFBLE9BQU8sRUFBRW5CLE9BQU8sQ0FBQ0ssR0FEbkI7QUFFRSxNQUFBLFdBQVcsRUFBRUosV0FBVyxJQUFJa0Isa0JBRjlCO0FBR0UsTUFBQSxNQUFNLEVBQUU1SyxLQUFLLENBQUNDLE1BQU4sQ0FBYTJKLE1BQWIsQ0FIVjtBQUlFLE1BQUEsTUFBTSxFQUFFUyxlQUpWO0FBS0UsTUFBQSxFQUFFLEVBQUVySyxLQUFLLENBQUN1SCxFQUxaO0FBTUUsTUFBQSxHQUFHLFlBQUt1QyxHQUFMLHNCQU5MO0FBT0UsTUFBQSxRQUFRLEVBQUVuQixRQVBaO0FBUUUsTUFBQSxXQUFXLEVBQUVzQixjQUFjLElBQUkseUJBUmpDO0FBU0UsTUFBQSxLQUFLLEVBQUVqSyxLQUFLLENBQUNDLE1BQU4sQ0FBYWtELFNBQWIsQ0FBdUI0RyxLQUF2QixDQVRUO0FBVUUsTUFBQSxZQUFZLEVBQUVTLFlBVmhCO0FBV0UsTUFBQSxTQUFTLEVBQUVSLEtBQUssR0FBR2hLLEtBQUssQ0FBQ0MsTUFBTixDQUFhK0osS0FBYixDQUFILEdBQXlCLElBWDNDO0FBWUUsTUFBQSxhQUFhLEVBQUVoSyxLQUFLLENBQUNDLE1BQU4sQ0FBYTRKLEtBQWIsQ0FaakI7QUFhRSxNQUFBLFNBQVMsRUFBRWEsU0FiYjtBQWNFLE1BQUEsV0FBVyxFQUFFLHFCQUFBRyxHQUFHO0FBQUEsZUFBSXZLLFFBQVEsc0NBQUd1SixLQUFILEVBQVdnQixHQUFYLEdBQWlCZixHQUFqQixDQUFaO0FBQUEsT0FkbEI7QUFlRSxNQUFBLFdBQVcsRUFBRSxxQkFBQWUsR0FBRztBQUFBLGVBQUl2SyxRQUFRLHNDQUFHMEosS0FBSCxFQUFXYSxHQUFYLEdBQWlCZixHQUFqQixDQUFaO0FBQUE7QUFmbEIsTUFERjtBQW1CRCxHQXRDRDs7QUF3Q0EsU0FBT2xJLHNCQUFQO0FBQ0Q7O0FBRU0sSUFBTWtKLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsU0FBZ0M7QUFBQSxNQUE5QnJCLE9BQThCLFVBQTlCQSxPQUE4QjtBQUFBLE1BQXJCekosS0FBcUIsVUFBckJBLEtBQXFCO0FBQUEsTUFBZE0sUUFBYyxVQUFkQSxRQUFjO0FBQUEsTUFDeEQwSixLQUR3RCxHQUMxQ1AsT0FEMEMsQ0FDeERPLEtBRHdEO0FBQUEsTUFDakRGLEdBRGlELEdBQzFDTCxPQUQwQyxDQUNqREssR0FEaUQ7QUFFL0QsTUFBTVUsWUFBWSxHQUFHeEssS0FBSyxDQUFDeUssZUFBTixDQUFzQlgsR0FBdEIsQ0FBckI7QUFFQSxTQUFPaUIsS0FBSyxDQUFDQyxPQUFOLENBQWNSLFlBQWQsS0FBK0JBLFlBQVksQ0FBQ2xELE1BQWIsR0FBc0IsQ0FBckQsZ0JBQ0wsZ0NBQUMsa0NBQUQ7QUFDRSxJQUFBLEtBQUssWUFBS3dDLEdBQUwsV0FEUDtBQUVFLElBQUEsT0FBTyxFQUFFVSxZQUZYO0FBR0UsSUFBQSxTQUFTLEVBQUV4SyxLQUFLLENBQUNDLE1BQU4sQ0FBYStKLEtBQWIsQ0FIYjtBQUlFLElBQUEsUUFBUSxFQUFFLGtCQUFBYSxHQUFHO0FBQUEsYUFBSXZLLFFBQVEsc0NBQUcwSixLQUFILEVBQVdhLEdBQVgsR0FBaUJmLEdBQWpCLENBQVo7QUFBQTtBQUpmLElBREssR0FPSCxJQVBKO0FBUUQsQ0FaTTs7OztBQWNBLElBQU1tQix1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLFNBQWdDO0FBQUEsTUFBOUJqTCxLQUE4QixVQUE5QkEsS0FBOEI7QUFBQSxNQUF2QnlKLE9BQXVCLFVBQXZCQSxPQUF1QjtBQUFBLE1BQWRuSixVQUFjLFVBQWRBLFFBQWM7QUFBQSxNQUM5RHVKLEtBRDhELEdBQ25DSixPQURtQyxDQUM5REksS0FEOEQ7QUFBQSxNQUN2RHFCLFdBRHVELEdBQ25DekIsT0FEbUMsQ0FDdkR5QixXQUR1RDtBQUFBLE1BQzFDcEIsR0FEMEMsR0FDbkNMLE9BRG1DLENBQzFDSyxHQUQwQztBQUVyRSxNQUFNcUIsYUFBYSxHQUFHbkwsS0FBSyxDQUFDQyxNQUFOLENBQWE0SixLQUFiLENBQXRCO0FBRnFFLE1BRzlEMUcsU0FIOEQsR0FHakRuRCxLQUFLLENBQUNDLE1BSDJDLENBRzlEa0QsU0FIOEQsRUFLckU7O0FBQ0EsTUFBTWlJLGtCQUFrQixHQUFHcEwsS0FBSyxDQUFDcUwscUJBQU4sQ0FBNEJ2QixHQUE1QixDQUEzQjtBQUVBLHNCQUNFLGdDQUFDLG1DQUFELHFCQUNFLGdDQUFDLDZCQUFELHFCQUNFLGdDQUFDLDhCQUFEO0FBQWtCLElBQUEsRUFBRSxFQUFFLG1CQUF0QjtBQUEyQyxJQUFBLE1BQU0sRUFBRTtBQUFDRCxNQUFBQSxLQUFLLEVBQUVzQixhQUFhLENBQUNHO0FBQXRCO0FBQW5ELElBREYsQ0FERixlQUlFLGdDQUFDLHdCQUFEO0FBQ0UsSUFBQSxhQUFhLEVBQUVuSSxTQUFTLENBQUMrSCxXQUFELENBRDFCO0FBRUUsSUFBQSxPQUFPLEVBQUVFLGtCQUZYO0FBR0UsSUFBQSxXQUFXLEVBQUUsS0FIZjtBQUlFLElBQUEsVUFBVSxFQUFFLEtBSmQ7QUFLRSxJQUFBLFFBQVEsRUFBRSxrQkFBQTVELEtBQUs7QUFBQSxhQUNibEgsVUFBUSxDQUNOO0FBQ0U2QyxRQUFBQSxTQUFTLGtDQUNKbkQsS0FBSyxDQUFDQyxNQUFOLENBQWFrRCxTQURULDRDQUVOK0gsV0FGTSxFQUVRMUQsS0FGUjtBQURYLE9BRE0sRUFPTmlDLE9BQU8sQ0FBQ0ssR0FQRixDQURLO0FBQUE7QUFMakIsSUFKRixDQURGO0FBd0JELENBaENNO0FBaUNQIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBGcmFnbWVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICdsb2NhbGl6YXRpb24nO1xuXG5pbXBvcnQge0J1dHRvbiwgSW5wdXQsIFBhbmVsTGFiZWwsIFNpZGVQYW5lbFNlY3Rpb259IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcblxuaW1wb3J0IFZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi92aXMtY29uZmlnLWJ5LWZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCBMYXllckNvbHVtbkNvbmZpZ0ZhY3RvcnkgZnJvbSAnLi9sYXllci1jb2x1bW4tY29uZmlnJztcbmltcG9ydCBMYXllclR5cGVTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi9sYXllci10eXBlLXNlbGVjdG9yJztcbmltcG9ydCBEaW1lbnNpb25TY2FsZVNlbGVjdG9yIGZyb20gJy4vZGltZW5zaW9uLXNjYWxlLXNlbGVjdG9yJztcbmltcG9ydCBDb2xvclNlbGVjdG9yIGZyb20gJy4vY29sb3Itc2VsZWN0b3InO1xuaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvckZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL2NvbW1vbi9zb3VyY2UtZGF0YS1zZWxlY3Rvcic7XG5pbXBvcnQgVmlzQ29uZmlnU3dpdGNoRmFjdG9yeSBmcm9tICcuL3Zpcy1jb25maWctc3dpdGNoJztcbmltcG9ydCBWaXNDb25maWdTbGlkZXJGYWN0b3J5IGZyb20gJy4vdmlzLWNvbmZpZy1zbGlkZXInO1xuaW1wb3J0IExheWVyQ29uZmlnR3JvdXBGYWN0b3J5LCB7Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnR9IGZyb20gJy4vbGF5ZXItY29uZmlnLWdyb3VwJztcbmltcG9ydCBUZXh0TGFiZWxQYW5lbEZhY3RvcnkgZnJvbSAnLi90ZXh0LWxhYmVsLXBhbmVsJztcblxuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJ9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHtDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7TEFZRVJfVFlQRVN9IGZyb20gJ2xheWVycy90eXBlcyc7XG5cbmNvbnN0IFN0eWxlZExheWVyQ29uZmlndXJhdG9yID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2xheWVyLXBhbmVsX19jb25maWcnXG59KWBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxheWVyQ29uZmlndXJhdG9yTWFyZ2lufTtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYXllckNvbmZpZ3VyYXRvclBhZGRpbmd9O1xuICBib3JkZXItbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYXllckNvbmZpZ3VyYXRvckJvcmRlcn0gZGFzaGVkXG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYXllckNvbmZpZ3VyYXRvckJvcmRlckNvbG9yfTtcbmA7XG5cbmNvbnN0IFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2xheWVyLXBhbmVsX19jb25maWdfX3Zpc3VhbEMtY29uZmlnJ1xufSlgXG4gIG1hcmdpbi10b3A6IDEycHg7XG5gO1xuXG5leHBvcnQgY29uc3QgZ2V0TGF5ZXJGaWVsZHMgPSAoZGF0YXNldHMsIGxheWVyKSA9PlxuICBsYXllci5jb25maWcgJiYgZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0gPyBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXS5maWVsZHMgOiBbXTtcblxuZXhwb3J0IGNvbnN0IGdldExheWVyRGF0YXNldCA9IChkYXRhc2V0cywgbGF5ZXIpID0+XG4gIGxheWVyLmNvbmZpZyAmJiBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXSA/IGRhdGFzZXRzW2xheWVyLmNvbmZpZy5kYXRhSWRdIDogbnVsbDtcblxuZXhwb3J0IGNvbnN0IGdldExheWVyQ29uZmlndXJhdG9yUHJvcHMgPSBwcm9wcyA9PiAoe1xuICBsYXllcjogcHJvcHMubGF5ZXIsXG4gIGZpZWxkczogZ2V0TGF5ZXJGaWVsZHMocHJvcHMuZGF0YXNldHMsIHByb3BzLmxheWVyKSxcbiAgb25DaGFuZ2U6IHByb3BzLnVwZGF0ZUxheWVyQ29uZmlnLFxuICBzZXRDb2xvclVJOiBwcm9wcy51cGRhdGVMYXllckNvbG9yVUlcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0VmlzQ29uZmlndXJhdG9yUHJvcHMgPSBwcm9wcyA9PiAoe1xuICBsYXllcjogcHJvcHMubGF5ZXIsXG4gIGZpZWxkczogZ2V0TGF5ZXJGaWVsZHMocHJvcHMuZGF0YXNldHMsIHByb3BzLmxheWVyKSxcbiAgb25DaGFuZ2U6IHByb3BzLnVwZGF0ZUxheWVyVmlzQ29uZmlnLFxuICBzZXRDb2xvclVJOiBwcm9wcy51cGRhdGVMYXllckNvbG9yVUlcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0TGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMgPSBwcm9wcyA9PiAoe1xuICBsYXllcjogcHJvcHMubGF5ZXIsXG4gIGZpZWxkczogZ2V0TGF5ZXJGaWVsZHMocHJvcHMuZGF0YXNldHMsIHByb3BzLmxheWVyKSxcbiAgb25DaGFuZ2U6IHByb3BzLnVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ1xufSk7XG5cbkxheWVyQ29uZmlndXJhdG9yRmFjdG9yeS5kZXBzID0gW1xuICBTb3VyY2VEYXRhU2VsZWN0b3JGYWN0b3J5LFxuICBWaXNDb25maWdTbGlkZXJGYWN0b3J5LFxuICBUZXh0TGFiZWxQYW5lbEZhY3RvcnksXG4gIExheWVyQ29uZmlnR3JvdXBGYWN0b3J5LFxuICBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yRmFjdG9yeSxcbiAgTGF5ZXJDb2x1bW5Db25maWdGYWN0b3J5LFxuICBMYXllclR5cGVTZWxlY3RvckZhY3RvcnksXG4gIFZpc0NvbmZpZ1N3aXRjaEZhY3Rvcnlcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExheWVyQ29uZmlndXJhdG9yRmFjdG9yeShcbiAgU291cmNlRGF0YVNlbGVjdG9yLFxuICBWaXNDb25maWdTbGlkZXIsXG4gIFRleHRMYWJlbFBhbmVsLFxuICBMYXllckNvbmZpZ0dyb3VwLFxuICBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yLFxuICBMYXllckNvbHVtbkNvbmZpZyxcbiAgTGF5ZXJUeXBlU2VsZWN0b3IsXG4gIFZpc0NvbmZpZ1N3aXRjaFxuKSB7XG4gIGNsYXNzIExheWVyQ29uZmlndXJhdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllclR5cGVPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgb3Blbk1vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdXBkYXRlTGF5ZXJDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB1cGRhdGVMYXllclR5cGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB1cGRhdGVMYXllclZpc0NvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHVwZGF0ZUxheWVyQ29sb3JVSTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICAgIH07XG5cbiAgICBfcmVuZGVyUG9pbnRMYXllckNvbmZpZyhwcm9wcykge1xuICAgICAgY29uc29sZS5sb2coJ3JlbmRlciBwb2ludCBsYXllcicpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcocHJvcHMpO1xuICAgIH1cblxuICAgIF9yZW5kZXJJY29uTGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTY2F0dGVycGxvdExheWVyQ29uZmlnKHByb3BzKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzXG4gICAgfSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBGaWxsIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4uKGxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmZpbGxlZCB8fCB7bGFiZWw6ICdsYXllci5jb2xvcid9KX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBvdXRsaW5lIGNvbG9yICovfVxuICAgICAgICAgIHtsYXllci50eXBlID09PSBMQVlFUl9UWVBFUy5wb2ludCA/IChcbiAgICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vdXRsaW5lfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYXllci5jb25maWcuc3Ryb2tlQ29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSBwcm9wZXJ0eT1cInN0cm9rZUNvbG9yUmFuZ2VcIiAvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I9e2xheWVyLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eT1cInN0cm9rZUNvbG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnN0cm9rZUNvbG9yfVxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnRoaWNrbmVzc31cbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5vdXRsaW5lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7LyogUmFkaXVzICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIucmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICB7IWxheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucmFkaXVzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4obGF5ZXIuY29uZmlnLnNpemVGaWVsZCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c1JhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcuc2l6ZUZpZWxkIHx8IGxheWVyLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZml4ZWRSYWRpdXN9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiB0ZXh0IGxhYmVsICovfVxuICAgICAgICAgIDxUZXh0TGFiZWxQYW5lbFxuICAgICAgICAgICAgZmllbGRzPXt2aXNDb25maWd1cmF0b3JQcm9wcy5maWVsZHN9XG4gICAgICAgICAgICB1cGRhdGVMYXllclRleHRMYWJlbD17dGhpcy5wcm9wcy51cGRhdGVMYXllclRleHRMYWJlbH1cbiAgICAgICAgICAgIHRleHRMYWJlbD17bGF5ZXIuY29uZmlnLnRleHRMYWJlbH1cbiAgICAgICAgICAgIGNvbG9yUGFsZXR0ZT17dmlzQ29uZmlndXJhdG9yUHJvcHMuY29sb3JQYWxldHRlfVxuICAgICAgICAgICAgc2V0Q29sb3JQYWxldHRlVUk9e3Zpc0NvbmZpZ3VyYXRvclByb3BzLnNldENvbG9yUGFsZXR0ZVVJfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9yZW5kZXJDbHVzdGVyTGF5ZXJDb25maWcoe1xuICAgICAgbGF5ZXIsXG4gICAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICAgIH0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5jb2xvcid9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPEFnZ3JTY2FsZVNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn0gLz5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9uLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb259XG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX0gey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogQ2x1c3RlciBSYWRpdXMgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5yYWRpdXMnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNsdXN0ZXJSYWRpdXN9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucmFkaXVzUmFuZ2V9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVySGVhdG1hcExheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5yYWRpdXMnfT5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c31cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICB7LyogV2VpZ2h0ICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIud2VpZ2h0J30+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy53ZWlnaHR9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyR3JpZExheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyQWdncmVnYXRpb25MYXllckNvbmZpZyhwcm9wcyk7XG4gICAgfVxuXG4gICAgX3JlbmRlckhleGFnb25MYXllckNvbmZpZyhwcm9wcykge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICAgIH1cblxuICAgIF9yZW5kZXJNZXNoYWdnTGF5ZXJDb25maWcocHJvcHMpe1xuICAgICAgY29uc29sZS5sb2coJ3JlbmRlciBtZXNoY29kZSBsYXllciBjb25maWcnKVxuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICAgIH1cblxuICAgIF9yZW5kZXJNZXNoY29kZUxheWVyQ29uZmlnKHtsYXllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfSl7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX0gey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogaGVpZ2h0ICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uU2NhbGV9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9XCJsYXllclZpc0NvbmZpZ3MuaGVpZ2h0UmFuZ2VcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3J9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICBjb25zb2xlLmxvZygncmVuZGVyIGFnZyBsYXllciBjb25maWcnKVxuICAgICAgY29uc3Qge2NvbmZpZ30gPSBsYXllcjtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlzQ29uZmlnOiB7ZW5hYmxlM2R9XG4gICAgICB9ID0gY29uZmlnO1xuICAgICAgY29uc3QgZWxldmF0aW9uQnlEZXNjcmlwdGlvbiA9ICdsYXllci5lbGV2YXRpb25CeURlc2NyaXB0aW9uJztcbiAgICAgIGNvbnN0IGNvbG9yQnlEZXNjcmlwdGlvbiA9ICdsYXllci5jb2xvckJ5RGVzY3JpcHRpb24nO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxBZ2dyU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9IC8+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgICA8QWdncmVnYXRpb25UeXBlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249e2NvbG9yQnlEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucGVyY2VudGlsZSAmJlxuICAgICAgICAgICAgICBsYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBDZWxsIHNpemUgKi99XG4gICAgICAgICAge1xuICAgICAgICAgICAgbGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mud29ybGRVbml0U2l6ZSAmJlxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIucmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy53b3JsZFVuaXRTaXplfSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvdmVyYWdlfSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD59XG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYXllci52aXNDb25maWdTZXR0aW5ncy5tZXNoTGV2ZWwgJiZcbiAgICAgICAgICAgICAgLy8gPEl0ZW1TZWxlY3RvciA+XG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLm1lc2hzaXplJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm1lc2hMZXZlbH0gey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2V9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGUzZCA/IChcbiAgICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGUzZH1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD1cImxheWVyVmlzQ29uZmlncy5oZWlnaHRNdWx0aXBsaWVyXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249e2VsZXZhdGlvbkJ5RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWVuYWJsZTNkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEFnZ3JTY2FsZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZVJhbmdlfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJsYXllclZpc0NvbmZpZ3MuaGVpZ2h0UmFuZ2VcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3J9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICBsYWJlbD1cImxheWVyVmlzQ29uZmlncy5lbmFibGVIZWlnaHRab29tRmFjdG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplQWdncmVnYXRpb24uY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICAgICAgICA8QWdncmVnYXRpb25UeXBlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVBZ2dyZWdhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uUGVyY2VudGlsZS5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblBlcmNlbnRpbGV9XG4gICAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFNoYW4gbW92ZSB0aGVzZSBpbnRvIGxheWVyIGNsYXNzXG4gICAgX3JlbmRlckhleGFnb25JZExheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlciB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX0gey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogQ292ZXJhZ2UgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5jb3ZlcmFnZSd9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAgeyFsYXllci5jb25maWcuY292ZXJhZ2VGaWVsZCA/IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb3ZlcmFnZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb3ZlcmFnZVJhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvdmVyYWdlfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIGhlaWdodCAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZTNkfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplUmFuZ2V9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPVwibGF5ZXJWaXNDb25maWdzLmhlaWdodFJhbmdlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGVFbGV2YXRpb25ab29tRmFjdG9yfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyQXJjTGF5ZXJDb25maWcoYXJncykge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckxpbmVMYXllckNvbmZpZyhhcmdzKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyTGluZUxheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxBcmNMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XG4gICAgICAgICAgICAgICAgc2V0Q29sb3JVST17bGF5ZXJDb25maWd1cmF0b3JQcm9wcy5zZXRDb2xvclVJfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlQ29uZmlnPXtsYXllckNvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlVmlzQ29uZmlnPXt2aXNDb25maWd1cmF0b3JQcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc291cmNlQ29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiB0aGlja25lc3MgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydsYXllci5zdHJva2UnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcuc2l6ZUZpZWxkfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MudGhpY2tuZXNzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogZWxldmF0aW9uIHNjYWxlICovfVxuICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25TY2FsZSA/IChcbiAgICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPVwibGF5ZXJWaXNDb25maWdzLmVsZXZhdGlvblNjYWxlXCIgY29sbGFwc2libGU+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uU2NhbGV9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyVHJpcExheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1ldGE6IHtmZWF0dXJlVHlwZXMgPSB7fX1cbiAgICAgIH0gPSBsYXllcjtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLmNvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXIgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9IHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIFN0cm9rZSBXaWR0aCAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IGxhYmVsPVwibGF5ZXIuc3Ryb2tlV2lkdGhcIiBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy50aGlja25lc3N9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIFRyYWlsIExlbmd0aCovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4uKGZlYXR1cmVUeXBlcy5wb2x5Z29uID8gbGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc3Ryb2tlZCA6IHt9KX1cbiAgICAgICAgICAgIGxhYmVsPVwibGF5ZXIudHJhaWxMZW5ndGhcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJsYXllci50cmFpbExlbmd0aERlc2NyaXB0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy50cmFpbExlbmd0aH1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlckdlb2pzb25MYXllckNvbmZpZyh7XG4gICAgICBsYXllcixcbiAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gICAgfSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtZXRhOiB7ZmVhdHVyZVR5cGVzID0ge319LFxuICAgICAgICBjb25maWc6IHt2aXNDb25maWd9XG4gICAgICB9ID0gbGF5ZXI7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgICB7LyogRmlsbCBDb2xvciAqL31cbiAgICAgICAgICB7ZmVhdHVyZVR5cGVzLnBvbHlnb24gfHwgZmVhdHVyZVR5cGVzLnBvaW50ID8gKFxuICAgICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmZpbGxlZH1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD1cImxheWVyLmZpbGxDb2xvclwiXG4gICAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Lyogc3Ryb2tlIGNvbG9yICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc3Ryb2tlZH1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPVwibGF5ZXIuc3Ryb2tlQ29sb3JcIlxuICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnN0cm9rZUNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yUmFuZ2VTZWxlY3RvciB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IHByb3BlcnR5PVwic3Ryb2tlQ29sb3JSYW5nZVwiIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yXG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I9e2xheWVyLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgICAgcHJvcGVydHk9XCJzdHJva2VDb2xvclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnN0cm9rZUNvbG9yfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zdHJva2VPcGFjaXR5fVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIFN0cm9rZSBXaWR0aCAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgey4uLihmZWF0dXJlVHlwZXMucG9seWdvbiA/IGxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnN0cm9rZWQgOiB7fSl9XG4gICAgICAgICAgICBsYWJlbD1cImxheWVyLnN0cm9rZVdpZHRoXCJcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZVJhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnRoaWNrbmVzc31cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIEVsZXZhdGlvbiAqL31cbiAgICAgICAgICB7ZmVhdHVyZVR5cGVzLnBvbHlnb24gPyAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGUzZH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF2aXNDb25maWcuZmlsbGVkfVxuICAgICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuaGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3J9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLndpcmVmcmFtZX0gLz5cbiAgICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2ludCA/IChcbiAgICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIucmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICAgIHshbGF5ZXIuY29uZmlnLnJhZGl1c0ZpZWxkID8gKFxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5yYWRpdXN9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17Qm9vbGVhbihsYXllci5jb25maWcucmFkaXVzRmllbGQpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c1JhbmdlfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcucmFkaXVzRmllbGR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5yYWRpdXN9XG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlcjNETGF5ZXJDb25maWcoe2xheWVyLCB2aXNDb25maWd1cmF0b3JQcm9wc30pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLjNETW9kZWwnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cIi5nbGIsLmdsdGZcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmZpbGVzICYmIGUudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGUudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlKHtzY2VuZWdyYXBoOiB1cmx9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2xheWVyLjNETW9kZWxPcHRpb25zJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplU2NhbGV9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmFuZ2xlWH1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuYW5nbGVZfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5hbmdsZVp9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9yZW5kZXJTMkxheWVyQ29uZmlnKHtcbiAgICAgIGxheWVyLFxuICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgICB9KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbmZpZzoge3Zpc0NvbmZpZ31cbiAgICAgIH0gPSBsYXllcjtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmZpbGxlZH1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPVwibGF5ZXIuZmlsbENvbG9yXCJcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclJhbmdlU2VsZWN0b3Igey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fSB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICAgIHsvKiBTdHJva2UgKi99XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zdHJva2VkfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgbGFiZWw9XCJsYXllci5zdHJva2VDb2xvclwiXG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuc3Ryb2tlQ29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JSYW5nZVNlbGVjdG9yIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gcHJvcGVydHk9XCJzdHJva2VDb2xvclJhbmdlXCIgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcj17bGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5zdHJva2VDb2xvcn1cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eT1cInN0cm9rZUNvbG9yXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgICB7LyogU3Ryb2tlIFdpZHRoICovfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gbGFiZWw9XCJsYXllci5zdHJva2VXaWR0aFwiIGNvbGxhcHNpYmxlPlxuICAgICAgICAgICAge2xheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Muc2l6ZVJhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnRoaWNrbmVzc31cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgICAgey8qIEVsZXZhdGlvbiAqL31cbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZTNkfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyF2aXNDb25maWcuZmlsbGVkfVxuICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5oZWlnaHR9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25TY2FsZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD1cImxheWVyVmlzQ29uZmlncy5lbGV2YXRpb25TY2FsZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmhlaWdodFJhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD1cImxheWVyVmlzQ29uZmlncy5oZWlnaHRSYW5nZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlRWxldmF0aW9uWm9vbUZhY3Rvcn1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2ggey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mud2lyZWZyYW1lfSAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtsYXllciwgZGF0YXNldHMsIHVwZGF0ZUxheWVyQ29uZmlnLCBsYXllclR5cGVPcHRpb25zLCB1cGRhdGVMYXllclR5cGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtmaWVsZHMgPSBbXSwgZmllbGRQYWlycyA9IHVuZGVmaW5lZH0gPSBsYXllci5jb25maWcuZGF0YUlkXG4gICAgICAgID8gZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF1cbiAgICAgICAgOiB7fTtcbiAgICAgIGNvbnN0IHtjb25maWd9ID0gbGF5ZXI7XG5cbiAgICAgIGNvbnN0IHZpc0NvbmZpZ3VyYXRvclByb3BzID0gZ2V0VmlzQ29uZmlndXJhdG9yUHJvcHModGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBsYXllckNvbmZpZ3VyYXRvclByb3BzID0gZ2V0TGF5ZXJDb25maWd1cmF0b3JQcm9wcyh0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzID0gZ2V0TGF5ZXJDaGFubmVsQ29uZmlnUHJvcHModGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBkYXRhc2V0ID0gZ2V0TGF5ZXJEYXRhc2V0KGRhdGFzZXRzLCBsYXllcik7XG4gICAgICBjb25zdCByZW5kZXJUZW1wbGF0ZSA9IGxheWVyLnR5cGUgJiYgYF9yZW5kZXIke2NhcGl0YWxpemVGaXJzdExldHRlcihsYXllci50eXBlKX1MYXllckNvbmZpZ2A7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRMYXllckNvbmZpZ3VyYXRvcj5cbiAgICAgICAgICB7bGF5ZXIubGF5ZXJJbmZvTW9kYWwgPyAoXG4gICAgICAgICAgICA8SG93VG9CdXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5vcGVuTW9kYWwobGF5ZXIubGF5ZXJJbmZvTW9kYWwpfSAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnbGF5ZXIuYmFzaWMnfSBjb2xsYXBzaWJsZSBleHBhbmRlZD17IWxheWVyLmhhc0FsbENvbHVtbnMoKX0+XG4gICAgICAgICAgICA8TGF5ZXJUeXBlU2VsZWN0b3JcbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XG4gICAgICAgICAgICAgIGxheWVyVHlwZU9wdGlvbnM9e2xheWVyVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt1cGRhdGVMYXllclR5cGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge09iamVjdC5rZXlzKGRhdGFzZXRzKS5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICAgICAgPFNvdXJjZURhdGFTZWxlY3RvclxuICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICAgICAgICAgICAgZGF0YUlkPXtjb25maWcuZGF0YUlkfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiB1cGRhdGVMYXllckNvbmZpZyh7ZGF0YUlkOiB2YWx1ZX0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxMYXllckNvbHVtbkNvbmZpZ1xuICAgICAgICAgICAgICBjb2x1bW5QYWlycz17bGF5ZXIuY29sdW1uUGFpcnN9XG4gICAgICAgICAgICAgIGNvbHVtbnM9e2xheWVyLmNvbmZpZy5jb2x1bW5zfVxuICAgICAgICAgICAgICBhc3NpZ25Db2x1bW5QYWlycz17bGF5ZXIuYXNzaWduQ29sdW1uUGFpcnMuYmluZChsYXllcil9XG4gICAgICAgICAgICAgIGFzc2lnbkNvbHVtbj17bGF5ZXIuYXNzaWduQ29sdW1uLmJpbmQobGF5ZXIpfVxuICAgICAgICAgICAgICBjb2x1bW5MYWJlbHM9e2xheWVyLmNvbHVtbkxhYmVsc31cbiAgICAgICAgICAgICAgZmllbGRzPXtmaWVsZHN9XG4gICAgICAgICAgICAgIGZpZWxkUGFpcnM9e2ZpZWxkUGFpcnN9XG4gICAgICAgICAgICAgIHVwZGF0ZUxheWVyQ29uZmlnPXt1cGRhdGVMYXllckNvbmZpZ31cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJUeXBlPXt0aGlzLnByb3BzLnVwZGF0ZUxheWVyVHlwZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICAgIHt0aGlzW3JlbmRlclRlbXBsYXRlXSAmJlxuICAgICAgICAgICAgdGhpc1tyZW5kZXJUZW1wbGF0ZV0oe1xuICAgICAgICAgICAgICBsYXllcixcbiAgICAgICAgICAgICAgZGF0YXNldCxcbiAgICAgICAgICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgICAgICAgICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzLFxuICAgICAgICAgICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC9TdHlsZWRMYXllckNvbmZpZ3VyYXRvcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIExheWVyQ29uZmlndXJhdG9yO1xufVxuLypcbiAqIENvbXBvbmVudGl6ZSBjb25maWcgY29tcG9uZW50IGludG8gcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudHNcbiAqL1xuXG5jb25zdCBTdHlsZWRIb3dUb0J1dHRvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDEycHg7XG4gIHRvcDogLTRweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBIb3dUb0J1dHRvbiA9ICh7b25DbGlja30pID0+IChcbiAgPFN0eWxlZEhvd1RvQnV0dG9uPlxuICAgIDxCdXR0b24gbGluayBzbWFsbCBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsnbGF5ZXJDb25maWd1cmF0aW9uLmhvd1RvJ30gLz5cbiAgICA8L0J1dHRvbj5cbiAgPC9TdHlsZWRIb3dUb0J1dHRvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBMYXllckNvbG9yU2VsZWN0b3IgPSAoe1xuICBsYXllcixcbiAgb25DaGFuZ2UsXG4gIGxhYmVsLFxuICBzZWxlY3RlZENvbG9yLFxuICBwcm9wZXJ0eSA9ICdjb2xvcicsXG4gIHNldENvbG9yVUlcbn0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPENvbG9yU2VsZWN0b3JcbiAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogc2VsZWN0ZWRDb2xvciB8fCBsYXllci5jb25maWcuY29sb3IsXG4gICAgICAgICAgc2V0Q29sb3I6IHJnYlZhbHVlID0+IG9uQ2hhbmdlKHtbcHJvcGVydHldOiByZ2JWYWx1ZX0pXG4gICAgICAgIH1cbiAgICAgIF19XG4gICAgICBjb2xvclVJPXtsYXllci5jb25maWcuY29sb3JVSVtwcm9wZXJ0eV19XG4gICAgICBzZXRDb2xvclVJPXtuZXdDb25maWcgPT4gc2V0Q29sb3JVSShwcm9wZXJ0eSwgbmV3Q29uZmlnKX1cbiAgICAvPlxuICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4pO1xuXG5leHBvcnQgY29uc3QgQXJjTGF5ZXJDb2xvclNlbGVjdG9yID0gKHtcbiAgbGF5ZXIsXG4gIG9uQ2hhbmdlQ29uZmlnLFxuICBvbkNoYW5nZVZpc0NvbmZpZyxcbiAgcHJvcGVydHkgPSAnY29sb3InLFxuICBzZXRDb2xvclVJXG59KSA9PiAoXG4gIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgIDxDb2xvclNlbGVjdG9yXG4gICAgICBjb2xvclNldHM9e1tcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkQ29sb3I6IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2VDb25maWcoe2NvbG9yOiByZ2JWYWx1ZX0pLFxuICAgICAgICAgIGxhYmVsOiAnU291cmNlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy50YXJnZXRDb2xvciB8fCBsYXllci5jb25maWcuY29sb3IsXG4gICAgICAgICAgc2V0Q29sb3I6IHJnYlZhbHVlID0+IG9uQ2hhbmdlVmlzQ29uZmlnKHt0YXJnZXRDb2xvcjogcmdiVmFsdWV9KSxcbiAgICAgICAgICBsYWJlbDogJ1RhcmdldCdcbiAgICAgICAgfVxuICAgICAgXX1cbiAgICAgIGNvbG9yVUk9e2xheWVyLmNvbmZpZy5jb2xvclVJW3Byb3BlcnR5XX1cbiAgICAgIHNldENvbG9yVUk9e25ld0NvbmZpZyA9PiBzZXRDb2xvclVJKHByb3BlcnR5LCBuZXdDb25maWcpfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBMYXllckNvbG9yUmFuZ2VTZWxlY3RvciA9ICh7bGF5ZXIsIG9uQ2hhbmdlLCBwcm9wZXJ0eSA9ICdjb2xvclJhbmdlJywgc2V0Q29sb3JVSX0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPENvbG9yU2VsZWN0b3JcbiAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogbGF5ZXIuY29uZmlnLnZpc0NvbmZpZ1twcm9wZXJ0eV0sXG4gICAgICAgICAgaXNSYW5nZTogdHJ1ZSxcbiAgICAgICAgICBzZXRDb2xvcjogY29sb3JSYW5nZSA9PiBvbkNoYW5nZSh7W3Byb3BlcnR5XTogY29sb3JSYW5nZX0pXG4gICAgICAgIH1cbiAgICAgIF19XG4gICAgICBjb2xvclVJPXtsYXllci5jb25maWcuY29sb3JVSVtwcm9wZXJ0eV19XG4gICAgICBzZXRDb2xvclVJPXtuZXdDb25maWcgPT4gc2V0Q29sb3JVSShwcm9wZXJ0eSwgbmV3Q29uZmlnKX1cbiAgICAvPlxuICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4pO1xuXG5DaGFubmVsQnlWYWx1ZVNlbGVjdG9yRmFjdG9yeS5kZXBzID0gW1Zpc0NvbmZpZ0J5RmllbGRTZWxlY3RvckZhY3RvcnldO1xuZXhwb3J0IGZ1bmN0aW9uIENoYW5uZWxCeVZhbHVlU2VsZWN0b3JGYWN0b3J5KFZpc0NvbmZpZ0J5RmllbGRTZWxlY3Rvcikge1xuICBjb25zdCBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yID0gKHtsYXllciwgY2hhbm5lbCwgb25DaGFuZ2UsIGZpZWxkcywgZGVzY3JpcHRpb259KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2hhbm5lbFNjYWxlVHlwZSxcbiAgICAgIGRvbWFpbixcbiAgICAgIGZpZWxkLFxuICAgICAga2V5LFxuICAgICAgcHJvcGVydHksXG4gICAgICByYW5nZSxcbiAgICAgIHNjYWxlLFxuICAgICAgZGVmYXVsdE1lYXN1cmUsXG4gICAgICBzdXBwb3J0ZWRGaWVsZFR5cGVzXG4gICAgfSA9IGNoYW5uZWw7XG4gICAgY29uc3QgY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMgPVxuICAgICAgc3VwcG9ydGVkRmllbGRUeXBlcyB8fCBDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFNbY2hhbm5lbFNjYWxlVHlwZV07XG4gICAgY29uc3Qgc3VwcG9ydGVkRmllbGRzID0gZmllbGRzLmZpbHRlcigoe3R5cGV9KSA9PiBjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcy5pbmNsdWRlcyh0eXBlKSk7XG4gICAgY29uc3Qgc2NhbGVPcHRpb25zID0gbGF5ZXIuZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwua2V5KTtcbiAgICBjb25zdCBzaG93U2NhbGUgPSAhbGF5ZXIuaXNBZ2dyZWdhdGVkICYmIGxheWVyLmNvbmZpZ1tzY2FsZV0gJiYgc2NhbGVPcHRpb25zLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgZGVmYXVsdERlc2NyaXB0aW9uID0gJ2xheWVyQ29uZmlndXJhdGlvbi5kZWZhdWx0RGVzY3JpcHRpb24nO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxWaXNDb25maWdCeUZpZWxkU2VsZWN0b3JcbiAgICAgICAgY2hhbm5lbD17Y2hhbm5lbC5rZXl9XG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb259XG4gICAgICAgIGRvbWFpbj17bGF5ZXIuY29uZmlnW2RvbWFpbl19XG4gICAgICAgIGZpZWxkcz17c3VwcG9ydGVkRmllbGRzfVxuICAgICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICAgIGtleT17YCR7a2V5fS1jaGFubmVsLXNlbGVjdG9yYH1cbiAgICAgICAgcHJvcGVydHk9e3Byb3BlcnR5fVxuICAgICAgICBwbGFjZWhvbGRlcj17ZGVmYXVsdE1lYXN1cmUgfHwgJ3BsYWNlaG9sZGVyLnNlbGVjdEZpZWxkJ31cbiAgICAgICAgcmFuZ2U9e2xheWVyLmNvbmZpZy52aXNDb25maWdbcmFuZ2VdfVxuICAgICAgICBzY2FsZU9wdGlvbnM9e3NjYWxlT3B0aW9uc31cbiAgICAgICAgc2NhbGVUeXBlPXtzY2FsZSA/IGxheWVyLmNvbmZpZ1tzY2FsZV0gOiBudWxsfVxuICAgICAgICBzZWxlY3RlZEZpZWxkPXtsYXllci5jb25maWdbZmllbGRdfVxuICAgICAgICBzaG93U2NhbGU9e3Nob3dTY2FsZX1cbiAgICAgICAgdXBkYXRlRmllbGQ9e3ZhbCA9PiBvbkNoYW5nZSh7W2ZpZWxkXTogdmFsfSwga2V5KX1cbiAgICAgICAgdXBkYXRlU2NhbGU9e3ZhbCA9PiBvbkNoYW5nZSh7W3NjYWxlXTogdmFsfSwga2V5KX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbEJ5VmFsdWVTZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGNvbnN0IEFnZ3JTY2FsZVNlbGVjdG9yID0gKHtjaGFubmVsLCBsYXllciwgb25DaGFuZ2V9KSA9PiB7XG4gIGNvbnN0IHtzY2FsZSwga2V5fSA9IGNoYW5uZWw7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucyhrZXkpO1xuXG4gIHJldHVybiBBcnJheS5pc0FycmF5KHNjYWxlT3B0aW9ucykgJiYgc2NhbGVPcHRpb25zLmxlbmd0aCA+IDEgPyAoXG4gICAgPERpbWVuc2lvblNjYWxlU2VsZWN0b3JcbiAgICAgIGxhYmVsPXtgJHtrZXl9IFNjYWxlYH1cbiAgICAgIG9wdGlvbnM9e3NjYWxlT3B0aW9uc31cbiAgICAgIHNjYWxlVHlwZT17bGF5ZXIuY29uZmlnW3NjYWxlXX1cbiAgICAgIG9uU2VsZWN0PXt2YWwgPT4gb25DaGFuZ2Uoe1tzY2FsZV06IHZhbH0sIGtleSl9XG4gICAgLz5cbiAgKSA6IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgQWdncmVnYXRpb25UeXBlU2VsZWN0b3IgPSAoe2xheWVyLCBjaGFubmVsLCBvbkNoYW5nZX0pID0+IHtcbiAgY29uc3Qge2ZpZWxkLCBhZ2dyZWdhdGlvbiwga2V5fSA9IGNoYW5uZWw7XG4gIGNvbnN0IHNlbGVjdGVkRmllbGQgPSBsYXllci5jb25maWdbZmllbGRdO1xuICBjb25zdCB7dmlzQ29uZmlnfSA9IGxheWVyLmNvbmZpZztcblxuICAvLyBhZ2dyZWdhdGlvbiBzaG91bGQgb25seSBiZSBzZWxlY3RhYmxlIHdoZW4gZmllbGQgaXMgc2VsZWN0ZWRcbiAgY29uc3QgYWdncmVnYXRpb25PcHRpb25zID0gbGF5ZXIuZ2V0QWdncmVnYXRpb25PcHRpb25zKGtleSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgIDxQYW5lbExhYmVsPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17J2xheWVyLmFnZ3JlZ2F0ZUJ5J30gdmFsdWVzPXt7ZmllbGQ6IHNlbGVjdGVkRmllbGQubmFtZX19IC8+XG4gICAgICA8L1BhbmVsTGFiZWw+XG4gICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgIHNlbGVjdGVkSXRlbXM9e3Zpc0NvbmZpZ1thZ2dyZWdhdGlvbl19XG4gICAgICAgIG9wdGlvbnM9e2FnZ3JlZ2F0aW9uT3B0aW9uc31cbiAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+XG4gICAgICAgICAgb25DaGFuZ2UoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICAgICAgICAgIC4uLmxheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgICAgICAgICAgICAgW2FnZ3JlZ2F0aW9uXTogdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5uZWwua2V5XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1wYXJhbXMgKi9cbiJdfQ==