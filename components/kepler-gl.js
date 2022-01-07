"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = mapStateToProps;
exports["default"] = exports.DEFAULT_KEPLER_GL_PROPS = exports.notificationPanelSelector = exports.geoCoderPanelSelector = exports.modalContainerSelector = exports.bottomWidgetSelector = exports.containerWSelector = exports.isSplitSelector = exports.plotContainerSelector = exports.sidePanelSelector = exports.mapFieldsSelector = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _window = require("global/window");

var _redux = require("redux");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reselect = require("reselect");

var _keplerglConnect = require("../connect/keplergl-connect");

var _reactIntl = require("react-intl");

var _localization = require("../localization");

var _context = require("./context");

var VisStateActions = _interopRequireWildcard(require("../actions/vis-state-actions"));

var MapStateActions = _interopRequireWildcard(require("../actions/map-state-actions"));

var MapStyleActions = _interopRequireWildcard(require("../actions/map-style-actions"));

var UIStateActions = _interopRequireWildcard(require("../actions/ui-state-actions"));

var ProviderActions = _interopRequireWildcard(require("../actions/provider-actions"));

var _defaultSettings = require("../constants/default-settings");

var _userFeedbacks = require("../constants/user-feedbacks");

var _sidePanel = _interopRequireDefault(require("./side-panel"));

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _bottomWidget = _interopRequireDefault(require("./bottom-widget"));

var _modalContainer = _interopRequireDefault(require("./modal-container"));

var _plotContainer = _interopRequireDefault(require("./plot-container"));

var _notificationPanel = _interopRequireDefault(require("./notification-panel"));

var _geocoderPanel = _interopRequireDefault(require("./geocoder-panel"));

var _utils = require("../utils/utils");

var _mapboxUtils = require("../utils/mapbox-utils");

var _localeUtils = require("../utils/locale-utils");

var _base = require("../styles/base");

var _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// Maybe we should think about exporting this or creating a variable
// as part of the base.js theme
var GlobalStyle = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: ", ";\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n\n  .mapboxgl-ctrl .mapboxgl-ctrl-logo {\n    display: none;\n  }\n"])), function (props) {
  return props.theme.fontFamily;
}, function (props) {
  return props.theme.fontWeight;
}, function (props) {
  return props.theme.fontSize;
}, function (props) {
  return props.theme.lineHeight;
}, function (props) {
  return props.theme.labelColor;
});

var mapFieldsSelector = function mapFieldsSelector(props) {
  return {
    getMapboxRef: props.getMapboxRef,
    mapboxApiAccessToken: props.mapboxApiAccessToken,
    mapboxApiUrl: props.mapboxApiUrl,
    mapState: props.mapState,
    mapStyle: props.mapStyle,
    onDeckInitialized: props.onDeckInitialized,
    onViewStateChange: props.onViewStateChange,
    deckGlProps: props.deckGlProps,
    uiStateActions: props.uiStateActions,
    visStateActions: props.visStateActions,
    mapStateActions: props.mapStateActions,
    // visState
    editor: props.visState.editor,
    datasets: props.visState.datasets,
    layers: props.visState.layers,
    layerOrder: props.visState.layerOrder,
    layerData: props.visState.layerData,
    layerBlending: props.visState.layerBlending,
    filters: props.visState.filters,
    interactionConfig: props.visState.interactionConfig,
    hoverInfo: props.visState.hoverInfo,
    clicked: props.visState.clicked,
    mousePos: props.visState.mousePos,
    animationConfig: props.visState.animationConfig,
    // uiState
    activeSidePanel: props.uiState.activeSidePanel,
    mapControls: props.uiState.mapControls,
    readOnly: props.uiState.readOnly,
    locale: props.uiState.locale
  };
};

exports.mapFieldsSelector = mapFieldsSelector;

var sidePanelSelector = function sidePanelSelector(props, availableProviders) {
  return {
    appName: props.appName,
    version: props.version,
    appWebsite: props.appWebsite,
    mapStyle: props.mapStyle,
    onSaveMap: props.onSaveMap,
    uiState: props.uiState,
    mapStyleActions: props.mapStyleActions,
    visStateActions: props.visStateActions,
    uiStateActions: props.uiStateActions,
    datasets: props.visState.datasets,
    filters: props.visState.filters,
    layers: props.visState.layers,
    processor: props.visState.processor,
    layerOrder: props.visState.layerOrder,
    layerClasses: props.visState.layerClasses,
    interactionConfig: props.visState.interactionConfig,
    mapInfo: props.visState.mapInfo,
    layerBlending: props.visState.layerBlending,
    width: props.sidePanelWidth,
    availableProviders: availableProviders,
    mapSaved: props.providerState.mapSaved
  };
};

exports.sidePanelSelector = sidePanelSelector;

var plotContainerSelector = function plotContainerSelector(props) {
  return {
    width: props.width,
    height: props.height,
    exportImageSetting: props.uiState.exportImage,
    mapFields: mapFieldsSelector(props),
    addNotification: props.uiStateActions.addNotification,
    setExportImageSetting: props.uiStateActions.setExportImageSetting,
    setExportImageDataUri: props.uiStateActions.setExportImageDataUri,
    setExportImageError: props.uiStateActions.setExportImageError,
    splitMaps: props.visState.splitMaps
  };
};

exports.plotContainerSelector = plotContainerSelector;

var isSplitSelector = function isSplitSelector(props) {
  return props.visState.splitMaps && props.visState.splitMaps.length > 1;
};

exports.isSplitSelector = isSplitSelector;

var containerWSelector = function containerWSelector(props) {
  return props.mapState.width * (Number(isSplitSelector(props)) + 1);
};

exports.containerWSelector = containerWSelector;

var bottomWidgetSelector = function bottomWidgetSelector(props, theme) {
  return {
    filters: props.visState.filters,
    datasets: props.visState.datasets,
    uiState: props.uiState,
    layers: props.visState.layers,
    animationConfig: props.visState.animationConfig,
    visStateActions: props.visStateActions,
    sidePanelWidth: props.uiState.readOnly ? 0 : props.sidePanelWidth + theme.sidePanel.margin.left,
    containerW: containerWSelector(props)
  };
};

exports.bottomWidgetSelector = bottomWidgetSelector;

var modalContainerSelector = function modalContainerSelector(props, rootNode) {
  return {
    appName: props.appName,
    mapStyle: props.mapStyle,
    visState: props.visState,
    mapState: props.mapState,
    uiState: props.uiState,
    providerState: props.providerState,
    mapboxApiAccessToken: props.mapboxApiAccessToken,
    mapboxApiUrl: props.mapboxApiUrl,
    visStateActions: props.visStateActions,
    uiStateActions: props.uiStateActions,
    mapStyleActions: props.mapStyleActions,
    providerActions: props.providerActions,
    rootNode: rootNode,
    containerW: containerWSelector(props),
    containerH: props.mapState.height,
    // User defined cloud provider props
    cloudProviders: props.cloudProviders,
    onExportToCloudSuccess: props.onExportToCloudSuccess,
    onLoadCloudMapSuccess: props.onLoadCloudMapSuccess,
    onLoadCloudMapError: props.onLoadCloudMapError,
    onExportToCloudError: props.onExportToCloudError
  };
};

exports.modalContainerSelector = modalContainerSelector;

var geoCoderPanelSelector = function geoCoderPanelSelector(props) {
  return {
    isGeocoderEnabled: props.visState.interactionConfig.geocoder.enabled,
    mapboxApiAccessToken: props.mapboxApiAccessToken,
    mapState: props.mapState,
    updateVisData: props.visStateActions.updateVisData,
    removeDataset: props.visStateActions.removeDataset,
    updateMap: props.mapStateActions.updateMap
  };
};

exports.geoCoderPanelSelector = geoCoderPanelSelector;

var notificationPanelSelector = function notificationPanelSelector(props) {
  return {
    removeNotification: props.uiStateActions.removeNotification,
    notifications: props.uiState.notifications
  };
};

exports.notificationPanelSelector = notificationPanelSelector;
var DEFAULT_KEPLER_GL_PROPS = {
  mapStyles: [],
  mapStylesReplaceDefault: false,
  mapboxApiUrl: _defaultSettings.DEFAULT_MAPBOX_API_URL,
  width: 800,
  height: 800,
  appName: _defaultSettings.KEPLER_GL_NAME,
  version: _defaultSettings.KEPLER_GL_VERSION,
  sidePanelWidth: _defaultSettings.DIMENSIONS.sidePanel.width,
  theme: {},
  cloudProviders: [],
  readOnly: false
};
exports.DEFAULT_KEPLER_GL_PROPS = DEFAULT_KEPLER_GL_PROPS;
KeplerGlFactory.deps = [_bottomWidget["default"], _geocoderPanel["default"], _mapContainer["default"], _modalContainer["default"], _sidePanel["default"], _plotContainer["default"], _notificationPanel["default"]];

function KeplerGlFactory(BottomWidget, GeoCoderPanel, MapContainer, ModalContainer, SidePanel, PlotContainer, NotificationPanel) {
  /** @typedef {import('./kepler-gl').UnconnectedKeplerGlProps} KeplerGlProps */

  /** @augments React.Component<KeplerGlProps> */
  var KeplerGL = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(KeplerGL, _Component);

    var _super = _createSuper(KeplerGL);

    function KeplerGL() {
      var _this;

      (0, _classCallCheck2["default"])(this, KeplerGL);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "root", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "themeSelector", function (props) {
        return props.theme;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableThemeSelector", (0, _reselect.createSelector)(_this.themeSelector, function (theme) {
        return (0, _typeof2["default"])(theme) === 'object' ? _objectSpread(_objectSpread({}, _base.theme), theme) : theme === _defaultSettings.THEME.light ? _base.themeLT : theme === _defaultSettings.THEME.base ? _base.themeBS : theme;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableProviders", (0, _reselect.createSelector)(function (props) {
        return props.cloudProviders;
      }, function (providers) {
        return Array.isArray(providers) && providers.length ? {
          hasStorage: providers.some(function (p) {
            return p.hasPrivateStorage();
          }),
          hasShare: providers.some(function (p) {
            return p.hasSharingUrl();
          })
        } : {};
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "localeMessagesSelector", (0, _reselect.createSelector)(function (props) {
        return props.localeMessages;
      }, function (customMessages) {
        return customMessages ? (0, _localeUtils.mergeMessages)(_localization.messages, customMessages) : _localization.messages;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_loadMapStyle", function () {
        var defaultStyles = Object.values(_this.props.mapStyle.mapStyles); // add id to custom map styles if not given

        var customStyles = (_this.props.mapStyles || []).map(function (ms) {
          return _objectSpread(_objectSpread({}, ms), {}, {
            id: ms.id || (0, _utils.generateHashId)()
          });
        });
        var allStyles = [].concat((0, _toConsumableArray2["default"])(customStyles), (0, _toConsumableArray2["default"])(defaultStyles)).reduce(function (accu, style) {
          var hasStyleObject = style.style && (0, _typeof2["default"])(style.style) === 'object';
          accu[hasStyleObject ? 'toLoad' : 'toRequest'][style.id] = style;
          return accu;
        }, {
          toLoad: {},
          toRequest: {}
        });

        _this.props.mapStyleActions.loadMapStyles(allStyles.toLoad);

        _this.props.mapStyleActions.requestMapStyles(allStyles.toRequest);
      });
      return _this;
    }

    (0, _createClass2["default"])(KeplerGL, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._validateMapboxToken();

        this._loadMapStyle();

        this._handleResize(this.props);

        if (typeof this.props.onKeplerGlInitialized === 'function') {
          this.props.onKeplerGlInitialized();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if ( // if dimension props has changed
        this.props.height !== prevProps.height || this.props.width !== prevProps.width || // react-map-gl will dispatch updateViewport after this._handleResize is called
        // here we check if this.props.mapState.height is sync with props.height
        this.props.height !== this.props.mapState.height) {
          this._handleResize(this.props);
        }
      }
    }, {
      key: "_validateMapboxToken",
      value:
      /* private methods */
      function _validateMapboxToken() {
        var mapboxApiAccessToken = this.props.mapboxApiAccessToken;

        if (!(0, _mapboxUtils.validateToken)(mapboxApiAccessToken)) {
          _window.console.warn(_userFeedbacks.MISSING_MAPBOX_TOKEN);
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          _window.console.warn('width and height is required');

          return;
        }

        this.props.mapStateActions.updateMap({
          width: width / (1 + Number(this.props.mapState.isSplit)),
          height: height
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            id = _this$props.id,
            width = _this$props.width,
            height = _this$props.height,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            readOnly = _this$props.readOnly;
        var splitMaps = visState.splitMaps,
            interactionConfig = visState.interactionConfig;
        var isSplit = isSplitSelector(this.props);
        var theme = this.availableThemeSelector(this.props);
        var localeMessages = this.localeMessagesSelector(this.props);
        var isExportingImage = uiState.exportImage.exporting;
        var availableProviders = this.availableProviders(this.props);
        var mapFields = mapFieldsSelector(this.props);
        var sideFields = sidePanelSelector(this.props, availableProviders);
        var plotContainerFields = plotContainerSelector(this.props);
        var bottomWidgetFields = bottomWidgetSelector(this.props, theme);
        var modalContainerFields = modalContainerSelector(this.props, this.root.current);
        var geoCoderPanelFields = geoCoderPanelSelector(this.props);
        var notificationPanelFields = notificationPanelSelector(this.props);
        var mapContainers = !isSplit ? [/*#__PURE__*/_react["default"].createElement(MapContainer, (0, _extends2["default"])({
          key: 0,
          index: 0
        }, mapFields, {
          mapLayers: null
        }))] : splitMaps.map(function (settings, index) {
          return /*#__PURE__*/_react["default"].createElement(MapContainer, (0, _extends2["default"])({
            key: index,
            index: index
          }, mapFields, {
            mapLayers: splitMaps[index].layers
          }));
        });
        return /*#__PURE__*/_react["default"].createElement(_context.RootContext.Provider, {
          value: this.root
        }, /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
          locale: uiState.locale,
          messages: localeMessages[uiState.locale]
        }, /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeProvider, {
          theme: theme
        }, /*#__PURE__*/_react["default"].createElement(GlobalStyle, {
          className: "kepler-gl",
          id: "kepler-gl__".concat(id),
          style: {
            position: 'relative',
            width: "".concat(width, "px"),
            height: "".concat(height, "px")
          },
          ref: this.root
        }, /*#__PURE__*/_react["default"].createElement(NotificationPanel, notificationPanelFields), !uiState.readOnly && !readOnly && /*#__PURE__*/_react["default"].createElement(SidePanel, sideFields), /*#__PURE__*/_react["default"].createElement("div", {
          className: "maps",
          style: {
            display: 'flex'
          }
        }, mapContainers), isExportingImage && /*#__PURE__*/_react["default"].createElement(PlotContainer, plotContainerFields), interactionConfig.geocoder.enabled && /*#__PURE__*/_react["default"].createElement(GeoCoderPanel, geoCoderPanelFields), /*#__PURE__*/_react["default"].createElement(BottomWidget, bottomWidgetFields), /*#__PURE__*/_react["default"].createElement(ModalContainer, modalContainerFields)))));
      }
    }]);
    return KeplerGL;
  }(_react.Component);

  (0, _defineProperty2["default"])(KeplerGL, "defaultProps", DEFAULT_KEPLER_GL_PROPS);
  (0, _defineProperty2["default"])(KeplerGL, "contextType", _context.RootContext);
  return (0, _keplerglConnect.connect)(mapStateToProps, makeMapDispatchToProps)((0, _styledComponents.withTheme)(KeplerGL));
}

function mapStateToProps() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, props), {}, {
    visState: state.visState,
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    uiState: state.uiState,
    providerState: state.providerState
  });
}

var defaultUserActions = {};

var getDispatch = function getDispatch(dispatch, props) {
  return dispatch;
};

var getUserActions = function getUserActions(dispatch, props) {
  return props.actions || defaultUserActions;
};
/** @type {() => import('reselect').OutputParametricSelector<any, any, any, any>} */


function makeGetActionCreators() {
  return (0, _reselect.createSelector)([getDispatch, getUserActions], function (dispatch, userActions) {
    var _map = [VisStateActions, MapStateActions, MapStyleActions, UIStateActions, ProviderActions].map(function (actions) {
      return (0, _redux.bindActionCreators)(mergeActions(actions, userActions), dispatch);
    }),
        _map2 = (0, _slicedToArray2["default"])(_map, 5),
        visStateActions = _map2[0],
        mapStateActions = _map2[1],
        mapStyleActions = _map2[2],
        uiStateActions = _map2[3],
        providerActions = _map2[4];

    return {
      visStateActions: visStateActions,
      mapStateActions: mapStateActions,
      mapStyleActions: mapStyleActions,
      uiStateActions: uiStateActions,
      providerActions: providerActions,
      dispatch: dispatch
    };
  });
}

function makeMapDispatchToProps() {
  var getActionCreators = makeGetActionCreators();

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var groupedActionCreators = getActionCreators(dispatch, ownProps);
    return _objectSpread(_objectSpread({}, groupedActionCreators), {}, {
      dispatch: dispatch
    });
  };

  return mapDispatchToProps;
}
/**
 * Override default kepler.gl actions with user defined actions using the same key
 */


function mergeActions(actions, userActions) {
  var overrides = {};

  for (var key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return _objectSpread(_objectSpread({}, actions), overrides);
}

var _default = KeplerGlFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImxhYmVsQ29sb3IiLCJtYXBGaWVsZHNTZWxlY3RvciIsImdldE1hcGJveFJlZiIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwibWFwYm94QXBpVXJsIiwibWFwU3RhdGUiLCJtYXBTdHlsZSIsIm9uRGVja0luaXRpYWxpemVkIiwib25WaWV3U3RhdGVDaGFuZ2UiLCJkZWNrR2xQcm9wcyIsInVpU3RhdGVBY3Rpb25zIiwidmlzU3RhdGVBY3Rpb25zIiwibWFwU3RhdGVBY3Rpb25zIiwiZWRpdG9yIiwidmlzU3RhdGUiLCJkYXRhc2V0cyIsImxheWVycyIsImxheWVyT3JkZXIiLCJsYXllckRhdGEiLCJsYXllckJsZW5kaW5nIiwiZmlsdGVycyIsImludGVyYWN0aW9uQ29uZmlnIiwiaG92ZXJJbmZvIiwiY2xpY2tlZCIsIm1vdXNlUG9zIiwiYW5pbWF0aW9uQ29uZmlnIiwiYWN0aXZlU2lkZVBhbmVsIiwidWlTdGF0ZSIsIm1hcENvbnRyb2xzIiwicmVhZE9ubHkiLCJsb2NhbGUiLCJzaWRlUGFuZWxTZWxlY3RvciIsImF2YWlsYWJsZVByb3ZpZGVycyIsImFwcE5hbWUiLCJ2ZXJzaW9uIiwiYXBwV2Vic2l0ZSIsIm9uU2F2ZU1hcCIsIm1hcFN0eWxlQWN0aW9ucyIsInByb2Nlc3NvciIsImxheWVyQ2xhc3NlcyIsIm1hcEluZm8iLCJ3aWR0aCIsInNpZGVQYW5lbFdpZHRoIiwibWFwU2F2ZWQiLCJwcm92aWRlclN0YXRlIiwicGxvdENvbnRhaW5lclNlbGVjdG9yIiwiaGVpZ2h0IiwiZXhwb3J0SW1hZ2VTZXR0aW5nIiwiZXhwb3J0SW1hZ2UiLCJtYXBGaWVsZHMiLCJhZGROb3RpZmljYXRpb24iLCJzZXRFeHBvcnRJbWFnZVNldHRpbmciLCJzZXRFeHBvcnRJbWFnZURhdGFVcmkiLCJzZXRFeHBvcnRJbWFnZUVycm9yIiwic3BsaXRNYXBzIiwiaXNTcGxpdFNlbGVjdG9yIiwibGVuZ3RoIiwiY29udGFpbmVyV1NlbGVjdG9yIiwiTnVtYmVyIiwiYm90dG9tV2lkZ2V0U2VsZWN0b3IiLCJzaWRlUGFuZWwiLCJtYXJnaW4iLCJsZWZ0IiwiY29udGFpbmVyVyIsIm1vZGFsQ29udGFpbmVyU2VsZWN0b3IiLCJyb290Tm9kZSIsInByb3ZpZGVyQWN0aW9ucyIsImNvbnRhaW5lckgiLCJjbG91ZFByb3ZpZGVycyIsIm9uRXhwb3J0VG9DbG91ZFN1Y2Nlc3MiLCJvbkxvYWRDbG91ZE1hcFN1Y2Nlc3MiLCJvbkxvYWRDbG91ZE1hcEVycm9yIiwib25FeHBvcnRUb0Nsb3VkRXJyb3IiLCJnZW9Db2RlclBhbmVsU2VsZWN0b3IiLCJpc0dlb2NvZGVyRW5hYmxlZCIsImdlb2NvZGVyIiwiZW5hYmxlZCIsInVwZGF0ZVZpc0RhdGEiLCJyZW1vdmVEYXRhc2V0IiwidXBkYXRlTWFwIiwibm90aWZpY2F0aW9uUGFuZWxTZWxlY3RvciIsInJlbW92ZU5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJERUZBVUxUX0tFUExFUl9HTF9QUk9QUyIsIm1hcFN0eWxlcyIsIm1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0IiwiREVGQVVMVF9NQVBCT1hfQVBJX1VSTCIsIktFUExFUl9HTF9OQU1FIiwiS0VQTEVSX0dMX1ZFUlNJT04iLCJESU1FTlNJT05TIiwiS2VwbGVyR2xGYWN0b3J5IiwiZGVwcyIsIkJvdHRvbVdpZGdldEZhY3RvcnkiLCJHZW9Db2RlclBhbmVsRmFjdG9yeSIsIk1hcENvbnRhaW5lckZhY3RvcnkiLCJNb2RhbENvbnRhaW5lckZhY3RvcnkiLCJTaWRlUGFuZWxGYWN0b3J5IiwiUGxvdENvbnRhaW5lckZhY3RvcnkiLCJOb3RpZmljYXRpb25QYW5lbEZhY3RvcnkiLCJCb3R0b21XaWRnZXQiLCJHZW9Db2RlclBhbmVsIiwiTWFwQ29udGFpbmVyIiwiTW9kYWxDb250YWluZXIiLCJTaWRlUGFuZWwiLCJQbG90Q29udGFpbmVyIiwiTm90aWZpY2F0aW9uUGFuZWwiLCJLZXBsZXJHTCIsInRoZW1lU2VsZWN0b3IiLCJiYXNpY1RoZW1lIiwiVEhFTUUiLCJsaWdodCIsInRoZW1lTFQiLCJiYXNlIiwidGhlbWVCUyIsInByb3ZpZGVycyIsIkFycmF5IiwiaXNBcnJheSIsImhhc1N0b3JhZ2UiLCJzb21lIiwicCIsImhhc1ByaXZhdGVTdG9yYWdlIiwiaGFzU2hhcmUiLCJoYXNTaGFyaW5nVXJsIiwibG9jYWxlTWVzc2FnZXMiLCJjdXN0b21NZXNzYWdlcyIsIm1lc3NhZ2VzIiwiZGVmYXVsdFN0eWxlcyIsIk9iamVjdCIsInZhbHVlcyIsImN1c3RvbVN0eWxlcyIsIm1hcCIsIm1zIiwiaWQiLCJhbGxTdHlsZXMiLCJyZWR1Y2UiLCJhY2N1Iiwic3R5bGUiLCJoYXNTdHlsZU9iamVjdCIsInRvTG9hZCIsInRvUmVxdWVzdCIsImxvYWRNYXBTdHlsZXMiLCJyZXF1ZXN0TWFwU3R5bGVzIiwiX3ZhbGlkYXRlTWFwYm94VG9rZW4iLCJfbG9hZE1hcFN0eWxlIiwiX2hhbmRsZVJlc2l6ZSIsIm9uS2VwbGVyR2xJbml0aWFsaXplZCIsInByZXZQcm9wcyIsIkNvbnNvbGUiLCJ3YXJuIiwiTUlTU0lOR19NQVBCT1hfVE9LRU4iLCJpc0Zpbml0ZSIsImlzU3BsaXQiLCJhdmFpbGFibGVUaGVtZVNlbGVjdG9yIiwibG9jYWxlTWVzc2FnZXNTZWxlY3RvciIsImlzRXhwb3J0aW5nSW1hZ2UiLCJleHBvcnRpbmciLCJzaWRlRmllbGRzIiwicGxvdENvbnRhaW5lckZpZWxkcyIsImJvdHRvbVdpZGdldEZpZWxkcyIsIm1vZGFsQ29udGFpbmVyRmllbGRzIiwicm9vdCIsImN1cnJlbnQiLCJnZW9Db2RlclBhbmVsRmllbGRzIiwibm90aWZpY2F0aW9uUGFuZWxGaWVsZHMiLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsInBvc2l0aW9uIiwiZGlzcGxheSIsIkNvbXBvbmVudCIsIlJvb3RDb250ZXh0IiwibWFwU3RhdGVUb1Byb3BzIiwibWFrZU1hcERpc3BhdGNoVG9Qcm9wcyIsInN0YXRlIiwiZGVmYXVsdFVzZXJBY3Rpb25zIiwiZ2V0RGlzcGF0Y2giLCJkaXNwYXRjaCIsImdldFVzZXJBY3Rpb25zIiwiYWN0aW9ucyIsIm1ha2VHZXRBY3Rpb25DcmVhdG9ycyIsInVzZXJBY3Rpb25zIiwiVmlzU3RhdGVBY3Rpb25zIiwiTWFwU3RhdGVBY3Rpb25zIiwiTWFwU3R5bGVBY3Rpb25zIiwiVUlTdGF0ZUFjdGlvbnMiLCJQcm92aWRlckFjdGlvbnMiLCJtZXJnZUFjdGlvbnMiLCJnZXRBY3Rpb25DcmVhdG9ycyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm93blByb3BzIiwiZ3JvdXBlZEFjdGlvbkNyZWF0b3JzIiwib3ZlcnJpZGVzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFPQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBLElBQU1BLFdBQVcsR0FBR0MsNkJBQU9DLEdBQVYsd2dCQUNBLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBaEI7QUFBQSxDQURMLEVBRUEsVUFBQUYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRSxVQUFoQjtBQUFBLENBRkwsRUFHRixVQUFBSCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlHLFFBQWhCO0FBQUEsQ0FISCxFQUlBLFVBQUFKLEtB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Ii8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgY3JlYXRlUmVmfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHN0eWxlZCwge1RoZW1lUHJvdmlkZXIsIHdpdGhUaGVtZX0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtjb25uZWN0IGFzIGtlcGxlckdsQ29ubmVjdH0gZnJvbSAnY29ubmVjdC9rZXBsZXJnbC1jb25uZWN0JztcbmltcG9ydCB7SW50bFByb3ZpZGVyfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7bWVzc2FnZXN9IGZyb20gJy4uL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge1Jvb3RDb250ZXh0fSBmcm9tICdjb21wb25lbnRzL2NvbnRleHQnO1xuXG5pbXBvcnQgKiBhcyBWaXNTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy92aXMtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdHlsZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3R5bGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBVSVN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3VpLXN0YXRlLWFjdGlvbnMnO1xuaW1wb3J0ICogYXMgUHJvdmlkZXJBY3Rpb25zIGZyb20gJ2FjdGlvbnMvcHJvdmlkZXItYWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIERJTUVOU0lPTlMsXG4gIEtFUExFUl9HTF9OQU1FLFxuICBLRVBMRVJfR0xfVkVSU0lPTixcbiAgVEhFTUUsXG4gIERFRkFVTFRfTUFQQk9YX0FQSV9VUkxcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtNSVNTSU5HX01BUEJPWF9UT0tFTn0gZnJvbSAnY29uc3RhbnRzL3VzZXItZmVlZGJhY2tzJztcblxuaW1wb3J0IFNpZGVQYW5lbEZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsJztcbmltcG9ydCBNYXBDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRhaW5lcic7XG5pbXBvcnQgQm90dG9tV2lkZ2V0RmFjdG9yeSBmcm9tICcuL2JvdHRvbS13aWRnZXQnO1xuaW1wb3J0IE1vZGFsQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgUGxvdENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9wbG90LWNvbnRhaW5lcic7XG5pbXBvcnQgTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IGZyb20gJy4vbm90aWZpY2F0aW9uLXBhbmVsJztcbmltcG9ydCBHZW9Db2RlclBhbmVsRmFjdG9yeSBmcm9tICcuL2dlb2NvZGVyLXBhbmVsJztcblxuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHt2YWxpZGF0ZVRva2VufSBmcm9tICd1dGlscy9tYXBib3gtdXRpbHMnO1xuaW1wb3J0IHttZXJnZU1lc3NhZ2VzfSBmcm9tICd1dGlscy9sb2NhbGUtdXRpbHMnO1xuXG5pbXBvcnQge3RoZW1lIGFzIGJhc2ljVGhlbWUsIHRoZW1lTFQsIHRoZW1lQlN9IGZyb20gJ3N0eWxlcy9iYXNlJztcblxuLy8gTWF5YmUgd2Ugc2hvdWxkIHRoaW5rIGFib3V0IGV4cG9ydGluZyB0aGlzIG9yIGNyZWF0aW5nIGEgdmFyaWFibGVcbi8vIGFzIHBhcnQgb2YgdGhlIGJhc2UuanMgdGhlbWVcbmNvbnN0IEdsb2JhbFN0eWxlID0gc3R5bGVkLmRpdmBcbiAgZm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udEZhbWlseX07XG4gIGZvbnQtd2VpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnRXZWlnaHR9O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udFNpemV9O1xuICBsaW5lLWhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5saW5lSGVpZ2h0fTtcblxuICAqLFxuICAqOmJlZm9yZSxcbiAgKjphZnRlciB7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgdWwge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgbGkge1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgfVxuXG4gIC5tYXBib3hnbC1jdHJsIC5tYXBib3hnbC1jdHJsLWxvZ28ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBtYXBGaWVsZHNTZWxlY3RvciA9IHByb3BzID0+ICh7XG4gIGdldE1hcGJveFJlZjogcHJvcHMuZ2V0TWFwYm94UmVmLFxuICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogcHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gIG1hcGJveEFwaVVybDogcHJvcHMubWFwYm94QXBpVXJsLFxuICBtYXBTdGF0ZTogcHJvcHMubWFwU3RhdGUsXG4gIG1hcFN0eWxlOiBwcm9wcy5tYXBTdHlsZSxcbiAgb25EZWNrSW5pdGlhbGl6ZWQ6IHByb3BzLm9uRGVja0luaXRpYWxpemVkLFxuICBvblZpZXdTdGF0ZUNoYW5nZTogcHJvcHMub25WaWV3U3RhdGVDaGFuZ2UsXG4gIGRlY2tHbFByb3BzOiBwcm9wcy5kZWNrR2xQcm9wcyxcbiAgdWlTdGF0ZUFjdGlvbnM6IHByb3BzLnVpU3RhdGVBY3Rpb25zLFxuICB2aXNTdGF0ZUFjdGlvbnM6IHByb3BzLnZpc1N0YXRlQWN0aW9ucyxcbiAgbWFwU3RhdGVBY3Rpb25zOiBwcm9wcy5tYXBTdGF0ZUFjdGlvbnMsXG5cbiAgLy8gdmlzU3RhdGVcbiAgZWRpdG9yOiBwcm9wcy52aXNTdGF0ZS5lZGl0b3IsXG4gIGRhdGFzZXRzOiBwcm9wcy52aXNTdGF0ZS5kYXRhc2V0cyxcbiAgbGF5ZXJzOiBwcm9wcy52aXNTdGF0ZS5sYXllcnMsXG4gIGxheWVyT3JkZXI6IHByb3BzLnZpc1N0YXRlLmxheWVyT3JkZXIsXG4gIGxheWVyRGF0YTogcHJvcHMudmlzU3RhdGUubGF5ZXJEYXRhLFxuICBsYXllckJsZW5kaW5nOiBwcm9wcy52aXNTdGF0ZS5sYXllckJsZW5kaW5nLFxuICBmaWx0ZXJzOiBwcm9wcy52aXNTdGF0ZS5maWx0ZXJzLFxuICBpbnRlcmFjdGlvbkNvbmZpZzogcHJvcHMudmlzU3RhdGUuaW50ZXJhY3Rpb25Db25maWcsXG4gIGhvdmVySW5mbzogcHJvcHMudmlzU3RhdGUuaG92ZXJJbmZvLFxuICBjbGlja2VkOiBwcm9wcy52aXNTdGF0ZS5jbGlja2VkLFxuICBtb3VzZVBvczogcHJvcHMudmlzU3RhdGUubW91c2VQb3MsXG4gIGFuaW1hdGlvbkNvbmZpZzogcHJvcHMudmlzU3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuXG4gIC8vIHVpU3RhdGVcbiAgYWN0aXZlU2lkZVBhbmVsOiBwcm9wcy51aVN0YXRlLmFjdGl2ZVNpZGVQYW5lbCxcbiAgbWFwQ29udHJvbHM6IHByb3BzLnVpU3RhdGUubWFwQ29udHJvbHMsXG4gIHJlYWRPbmx5OiBwcm9wcy51aVN0YXRlLnJlYWRPbmx5LFxuICBsb2NhbGU6IHByb3BzLnVpU3RhdGUubG9jYWxlXG59KTtcblxuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbFNlbGVjdG9yID0gKHByb3BzLCBhdmFpbGFibGVQcm92aWRlcnMpID0+ICh7XG4gIGFwcE5hbWU6IHByb3BzLmFwcE5hbWUsXG4gIHZlcnNpb246IHByb3BzLnZlcnNpb24sXG4gIGFwcFdlYnNpdGU6IHByb3BzLmFwcFdlYnNpdGUsXG4gIG1hcFN0eWxlOiBwcm9wcy5tYXBTdHlsZSxcbiAgb25TYXZlTWFwOiBwcm9wcy5vblNhdmVNYXAsXG4gIHVpU3RhdGU6IHByb3BzLnVpU3RhdGUsXG4gIG1hcFN0eWxlQWN0aW9uczogcHJvcHMubWFwU3R5bGVBY3Rpb25zLFxuICB2aXNTdGF0ZUFjdGlvbnM6IHByb3BzLnZpc1N0YXRlQWN0aW9ucyxcbiAgdWlTdGF0ZUFjdGlvbnM6IHByb3BzLnVpU3RhdGVBY3Rpb25zLFxuXG4gIGRhdGFzZXRzOiBwcm9wcy52aXNTdGF0ZS5kYXRhc2V0cyxcbiAgZmlsdGVyczogcHJvcHMudmlzU3RhdGUuZmlsdGVycyxcbiAgbGF5ZXJzOiBwcm9wcy52aXNTdGF0ZS5sYXllcnMsXG4gIHByb2Nlc3NvcjogcHJvcHMudmlzU3RhdGUucHJvY2Vzc29yLFxuICBsYXllck9yZGVyOiBwcm9wcy52aXNTdGF0ZS5sYXllck9yZGVyLFxuICBsYXllckNsYXNzZXM6IHByb3BzLnZpc1N0YXRlLmxheWVyQ2xhc3NlcyxcbiAgaW50ZXJhY3Rpb25Db25maWc6IHByb3BzLnZpc1N0YXRlLmludGVyYWN0aW9uQ29uZmlnLFxuICBtYXBJbmZvOiBwcm9wcy52aXNTdGF0ZS5tYXBJbmZvLFxuICBsYXllckJsZW5kaW5nOiBwcm9wcy52aXNTdGF0ZS5sYXllckJsZW5kaW5nLFxuXG4gIHdpZHRoOiBwcm9wcy5zaWRlUGFuZWxXaWR0aCxcbiAgYXZhaWxhYmxlUHJvdmlkZXJzLFxuICBtYXBTYXZlZDogcHJvcHMucHJvdmlkZXJTdGF0ZS5tYXBTYXZlZFxufSk7XG5cbmV4cG9ydCBjb25zdCBwbG90Q29udGFpbmVyU2VsZWN0b3IgPSBwcm9wcyA9PiAoe1xuICB3aWR0aDogcHJvcHMud2lkdGgsXG4gIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICBleHBvcnRJbWFnZVNldHRpbmc6IHByb3BzLnVpU3RhdGUuZXhwb3J0SW1hZ2UsXG4gIG1hcEZpZWxkczogbWFwRmllbGRzU2VsZWN0b3IocHJvcHMpLFxuICBhZGROb3RpZmljYXRpb246IHByb3BzLnVpU3RhdGVBY3Rpb25zLmFkZE5vdGlmaWNhdGlvbixcbiAgc2V0RXhwb3J0SW1hZ2VTZXR0aW5nOiBwcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRJbWFnZVNldHRpbmcsXG4gIHNldEV4cG9ydEltYWdlRGF0YVVyaTogcHJvcHMudWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0SW1hZ2VEYXRhVXJpLFxuICBzZXRFeHBvcnRJbWFnZUVycm9yOiBwcm9wcy51aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRJbWFnZUVycm9yLFxuICBzcGxpdE1hcHM6IHByb3BzLnZpc1N0YXRlLnNwbGl0TWFwc1xufSk7XG5cbmV4cG9ydCBjb25zdCBpc1NwbGl0U2VsZWN0b3IgPSBwcm9wcyA9PlxuICBwcm9wcy52aXNTdGF0ZS5zcGxpdE1hcHMgJiYgcHJvcHMudmlzU3RhdGUuc3BsaXRNYXBzLmxlbmd0aCA+IDE7XG5leHBvcnQgY29uc3QgY29udGFpbmVyV1NlbGVjdG9yID0gcHJvcHMgPT5cbiAgcHJvcHMubWFwU3RhdGUud2lkdGggKiAoTnVtYmVyKGlzU3BsaXRTZWxlY3Rvcihwcm9wcykpICsgMSk7XG5cbmV4cG9ydCBjb25zdCBib3R0b21XaWRnZXRTZWxlY3RvciA9IChwcm9wcywgdGhlbWUpID0+ICh7XG4gIGZpbHRlcnM6IHByb3BzLnZpc1N0YXRlLmZpbHRlcnMsXG4gIGRhdGFzZXRzOiBwcm9wcy52aXNTdGF0ZS5kYXRhc2V0cyxcbiAgdWlTdGF0ZTogcHJvcHMudWlTdGF0ZSxcbiAgbGF5ZXJzOiBwcm9wcy52aXNTdGF0ZS5sYXllcnMsXG4gIGFuaW1hdGlvbkNvbmZpZzogcHJvcHMudmlzU3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuICB2aXNTdGF0ZUFjdGlvbnM6IHByb3BzLnZpc1N0YXRlQWN0aW9ucyxcbiAgc2lkZVBhbmVsV2lkdGg6IHByb3BzLnVpU3RhdGUucmVhZE9ubHkgPyAwIDogcHJvcHMuc2lkZVBhbmVsV2lkdGggKyB0aGVtZS5zaWRlUGFuZWwubWFyZ2luLmxlZnQsXG4gIGNvbnRhaW5lclc6IGNvbnRhaW5lcldTZWxlY3Rvcihwcm9wcylcbn0pO1xuXG5leHBvcnQgY29uc3QgbW9kYWxDb250YWluZXJTZWxlY3RvciA9IChwcm9wcywgcm9vdE5vZGUpID0+ICh7XG4gIGFwcE5hbWU6IHByb3BzLmFwcE5hbWUsXG4gIG1hcFN0eWxlOiBwcm9wcy5tYXBTdHlsZSxcbiAgdmlzU3RhdGU6IHByb3BzLnZpc1N0YXRlLFxuICBtYXBTdGF0ZTogcHJvcHMubWFwU3RhdGUsXG4gIHVpU3RhdGU6IHByb3BzLnVpU3RhdGUsXG4gIHByb3ZpZGVyU3RhdGU6IHByb3BzLnByb3ZpZGVyU3RhdGUsXG5cbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IHByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICBtYXBib3hBcGlVcmw6IHByb3BzLm1hcGJveEFwaVVybCxcbiAgdmlzU3RhdGVBY3Rpb25zOiBwcm9wcy52aXNTdGF0ZUFjdGlvbnMsXG4gIHVpU3RhdGVBY3Rpb25zOiBwcm9wcy51aVN0YXRlQWN0aW9ucyxcbiAgbWFwU3R5bGVBY3Rpb25zOiBwcm9wcy5tYXBTdHlsZUFjdGlvbnMsXG4gIHByb3ZpZGVyQWN0aW9uczogcHJvcHMucHJvdmlkZXJBY3Rpb25zLFxuXG4gIHJvb3ROb2RlLFxuICBjb250YWluZXJXOiBjb250YWluZXJXU2VsZWN0b3IocHJvcHMpLFxuICBjb250YWluZXJIOiBwcm9wcy5tYXBTdGF0ZS5oZWlnaHQsXG4gIC8vIFVzZXIgZGVmaW5lZCBjbG91ZCBwcm92aWRlciBwcm9wc1xuICBjbG91ZFByb3ZpZGVyczogcHJvcHMuY2xvdWRQcm92aWRlcnMsXG4gIG9uRXhwb3J0VG9DbG91ZFN1Y2Nlc3M6IHByb3BzLm9uRXhwb3J0VG9DbG91ZFN1Y2Nlc3MsXG4gIG9uTG9hZENsb3VkTWFwU3VjY2VzczogcHJvcHMub25Mb2FkQ2xvdWRNYXBTdWNjZXNzLFxuICBvbkxvYWRDbG91ZE1hcEVycm9yOiBwcm9wcy5vbkxvYWRDbG91ZE1hcEVycm9yLFxuICBvbkV4cG9ydFRvQ2xvdWRFcnJvcjogcHJvcHMub25FeHBvcnRUb0Nsb3VkRXJyb3Jcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2VvQ29kZXJQYW5lbFNlbGVjdG9yID0gcHJvcHMgPT4gKHtcbiAgaXNHZW9jb2RlckVuYWJsZWQ6IHByb3BzLnZpc1N0YXRlLmludGVyYWN0aW9uQ29uZmlnLmdlb2NvZGVyLmVuYWJsZWQsXG4gIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBwcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgbWFwU3RhdGU6IHByb3BzLm1hcFN0YXRlLFxuICB1cGRhdGVWaXNEYXRhOiBwcm9wcy52aXNTdGF0ZUFjdGlvbnMudXBkYXRlVmlzRGF0YSxcbiAgcmVtb3ZlRGF0YXNldDogcHJvcHMudmlzU3RhdGVBY3Rpb25zLnJlbW92ZURhdGFzZXQsXG4gIHVwZGF0ZU1hcDogcHJvcHMubWFwU3RhdGVBY3Rpb25zLnVwZGF0ZU1hcFxufSk7XG5cbmV4cG9ydCBjb25zdCBub3RpZmljYXRpb25QYW5lbFNlbGVjdG9yID0gcHJvcHMgPT4gKHtcbiAgcmVtb3ZlTm90aWZpY2F0aW9uOiBwcm9wcy51aVN0YXRlQWN0aW9ucy5yZW1vdmVOb3RpZmljYXRpb24sXG4gIG5vdGlmaWNhdGlvbnM6IHByb3BzLnVpU3RhdGUubm90aWZpY2F0aW9uc1xufSk7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0tFUExFUl9HTF9QUk9QUyA9IHtcbiAgbWFwU3R5bGVzOiBbXSxcbiAgbWFwU3R5bGVzUmVwbGFjZURlZmF1bHQ6IGZhbHNlLFxuICBtYXBib3hBcGlVcmw6IERFRkFVTFRfTUFQQk9YX0FQSV9VUkwsXG4gIHdpZHRoOiA4MDAsXG4gIGhlaWdodDogODAwLFxuICBhcHBOYW1lOiBLRVBMRVJfR0xfTkFNRSxcbiAgdmVyc2lvbjogS0VQTEVSX0dMX1ZFUlNJT04sXG4gIHNpZGVQYW5lbFdpZHRoOiBESU1FTlNJT05TLnNpZGVQYW5lbC53aWR0aCxcbiAgdGhlbWU6IHt9LFxuICBjbG91ZFByb3ZpZGVyczogW10sXG4gIHJlYWRPbmx5OiBmYWxzZVxufTtcblxuS2VwbGVyR2xGYWN0b3J5LmRlcHMgPSBbXG4gIEJvdHRvbVdpZGdldEZhY3RvcnksXG4gIEdlb0NvZGVyUGFuZWxGYWN0b3J5LFxuICBNYXBDb250YWluZXJGYWN0b3J5LFxuICBNb2RhbENvbnRhaW5lckZhY3RvcnksXG4gIFNpZGVQYW5lbEZhY3RvcnksXG4gIFBsb3RDb250YWluZXJGYWN0b3J5LFxuICBOb3RpZmljYXRpb25QYW5lbEZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEtlcGxlckdsRmFjdG9yeShcbiAgQm90dG9tV2lkZ2V0LFxuICBHZW9Db2RlclBhbmVsLFxuICBNYXBDb250YWluZXIsXG4gIE1vZGFsQ29udGFpbmVyLFxuICBTaWRlUGFuZWwsXG4gIFBsb3RDb250YWluZXIsXG4gIE5vdGlmaWNhdGlvblBhbmVsXG4pIHtcbiAgLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4va2VwbGVyLWdsJykuVW5jb25uZWN0ZWRLZXBsZXJHbFByb3BzfSBLZXBsZXJHbFByb3BzICovXG4gIC8qKiBAYXVnbWVudHMgUmVhY3QuQ29tcG9uZW50PEtlcGxlckdsUHJvcHM+ICovXG4gIGNsYXNzIEtlcGxlckdMIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0gREVGQVVMVF9LRVBMRVJfR0xfUFJPUFM7XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRlTWFwYm94VG9rZW4oKTtcbiAgICAgIHRoaXMuX2xvYWRNYXBTdHlsZSgpO1xuICAgICAgdGhpcy5faGFuZGxlUmVzaXplKHRoaXMucHJvcHMpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2VwbGVyR2xJbml0aWFsaXplZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uS2VwbGVyR2xJbml0aWFsaXplZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gaWYgZGltZW5zaW9uIHByb3BzIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucHJvcHMuaGVpZ2h0ICE9PSBwcmV2UHJvcHMuaGVpZ2h0IHx8XG4gICAgICAgIHRoaXMucHJvcHMud2lkdGggIT09IHByZXZQcm9wcy53aWR0aCB8fFxuICAgICAgICAvLyByZWFjdC1tYXAtZ2wgd2lsbCBkaXNwYXRjaCB1cGRhdGVWaWV3cG9ydCBhZnRlciB0aGlzLl9oYW5kbGVSZXNpemUgaXMgY2FsbGVkXG4gICAgICAgIC8vIGhlcmUgd2UgY2hlY2sgaWYgdGhpcy5wcm9wcy5tYXBTdGF0ZS5oZWlnaHQgaXMgc3luYyB3aXRoIHByb3BzLmhlaWdodFxuICAgICAgICB0aGlzLnByb3BzLmhlaWdodCAhPT0gdGhpcy5wcm9wcy5tYXBTdGF0ZS5oZWlnaHRcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUodGhpcy5wcm9wcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFJvb3RDb250ZXh0O1xuXG4gICAgcm9vdCA9IGNyZWF0ZVJlZigpO1xuXG4gICAgLyogc2VsZWN0b3JzICovXG4gICAgdGhlbWVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLnRoZW1lO1xuICAgIGF2YWlsYWJsZVRoZW1lU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLnRoZW1lU2VsZWN0b3IsIHRoZW1lID0+XG4gICAgICB0eXBlb2YgdGhlbWUgPT09ICdvYmplY3QnXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uYmFzaWNUaGVtZSxcbiAgICAgICAgICAgIC4uLnRoZW1lXG4gICAgICAgICAgfVxuICAgICAgICA6IHRoZW1lID09PSBUSEVNRS5saWdodFxuICAgICAgICA/IHRoZW1lTFRcbiAgICAgICAgOiB0aGVtZSA9PT0gVEhFTUUuYmFzZVxuICAgICAgICA/IHRoZW1lQlNcbiAgICAgICAgOiB0aGVtZVxuICAgICk7XG5cbiAgICBhdmFpbGFibGVQcm92aWRlcnMgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHByb3BzID0+IHByb3BzLmNsb3VkUHJvdmlkZXJzLFxuICAgICAgcHJvdmlkZXJzID0+XG4gICAgICAgIEFycmF5LmlzQXJyYXkocHJvdmlkZXJzKSAmJiBwcm92aWRlcnMubGVuZ3RoXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIGhhc1N0b3JhZ2U6IHByb3ZpZGVycy5zb21lKHAgPT4gcC5oYXNQcml2YXRlU3RvcmFnZSgpKSxcbiAgICAgICAgICAgICAgaGFzU2hhcmU6IHByb3ZpZGVycy5zb21lKHAgPT4gcC5oYXNTaGFyaW5nVXJsKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB7fVxuICAgICk7XG5cbiAgICBsb2NhbGVNZXNzYWdlc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICBwcm9wcyA9PiBwcm9wcy5sb2NhbGVNZXNzYWdlcyxcbiAgICAgIGN1c3RvbU1lc3NhZ2VzID0+IChjdXN0b21NZXNzYWdlcyA/IG1lcmdlTWVzc2FnZXMobWVzc2FnZXMsIGN1c3RvbU1lc3NhZ2VzKSA6IG1lc3NhZ2VzKVxuICAgICk7XG5cbiAgICAvKiBwcml2YXRlIG1ldGhvZHMgKi9cbiAgICBfdmFsaWRhdGVNYXBib3hUb2tlbigpIHtcbiAgICAgIGNvbnN0IHttYXBib3hBcGlBY2Nlc3NUb2tlbn0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKCF2YWxpZGF0ZVRva2VuKG1hcGJveEFwaUFjY2Vzc1Rva2VuKSkge1xuICAgICAgICBDb25zb2xlLndhcm4oTUlTU0lOR19NQVBCT1hfVE9LRU4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVSZXNpemUoe3dpZHRoLCBoZWlnaHR9KSB7XG4gICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh3aWR0aCkgfHwgIU51bWJlci5pc0Zpbml0ZShoZWlnaHQpKSB7XG4gICAgICAgIENvbnNvbGUud2Fybignd2lkdGggYW5kIGhlaWdodCBpcyByZXF1aXJlZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm1hcFN0YXRlQWN0aW9ucy51cGRhdGVNYXAoe1xuICAgICAgICB3aWR0aDogd2lkdGggLyAoMSArIE51bWJlcih0aGlzLnByb3BzLm1hcFN0YXRlLmlzU3BsaXQpKSxcbiAgICAgICAgaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfbG9hZE1hcFN0eWxlID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IE9iamVjdC52YWx1ZXModGhpcy5wcm9wcy5tYXBTdHlsZS5tYXBTdHlsZXMpO1xuICAgICAgLy8gYWRkIGlkIHRvIGN1c3RvbSBtYXAgc3R5bGVzIGlmIG5vdCBnaXZlblxuICAgICAgY29uc3QgY3VzdG9tU3R5bGVzID0gKHRoaXMucHJvcHMubWFwU3R5bGVzIHx8IFtdKS5tYXAobXMgPT4gKHtcbiAgICAgICAgLi4ubXMsXG4gICAgICAgIGlkOiBtcy5pZCB8fCBnZW5lcmF0ZUhhc2hJZCgpXG4gICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IGFsbFN0eWxlcyA9IFsuLi5jdXN0b21TdHlsZXMsIC4uLmRlZmF1bHRTdHlsZXNdLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIHN0eWxlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaGFzU3R5bGVPYmplY3QgPSBzdHlsZS5zdHlsZSAmJiB0eXBlb2Ygc3R5bGUuc3R5bGUgPT09ICdvYmplY3QnO1xuICAgICAgICAgIGFjY3VbaGFzU3R5bGVPYmplY3QgPyAndG9Mb2FkJyA6ICd0b1JlcXVlc3QnXVtzdHlsZS5pZF0gPSBzdHlsZTtcblxuICAgICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgICB9LFxuICAgICAgICB7dG9Mb2FkOiB7fSwgdG9SZXF1ZXN0OiB7fX1cbiAgICAgICk7XG5cbiAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmxvYWRNYXBTdHlsZXMoYWxsU3R5bGVzLnRvTG9hZCk7XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5yZXF1ZXN0TWFwU3R5bGVzKGFsbFN0eWxlcy50b1JlcXVlc3QpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGlkLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB1aVN0YXRlLFxuICAgICAgICB2aXNTdGF0ZSxcbiAgICAgICAgLy8gcmVhZE9ubHkgb3ZlcnJpZGVcbiAgICAgICAgcmVhZE9ubHlcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB7XG4gICAgICAgIHNwbGl0TWFwcywgLy8gdGhpcyB3aWxsIHN0b3JlIHN1cHBvcnQgZm9yIHNwbGl0IG1hcCB2aWV3IGlzIG5lY2Vzc2FyeVxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZ1xuICAgICAgfSA9IHZpc1N0YXRlO1xuXG4gICAgICBjb25zdCBpc1NwbGl0ID0gaXNTcGxpdFNlbGVjdG9yKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3QgdGhlbWUgPSB0aGlzLmF2YWlsYWJsZVRoZW1lU2VsZWN0b3IodGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBsb2NhbGVNZXNzYWdlcyA9IHRoaXMubG9jYWxlTWVzc2FnZXNTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IGlzRXhwb3J0aW5nSW1hZ2UgPSB1aVN0YXRlLmV4cG9ydEltYWdlLmV4cG9ydGluZztcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVByb3ZpZGVycyA9IHRoaXMuYXZhaWxhYmxlUHJvdmlkZXJzKHRoaXMucHJvcHMpO1xuXG4gICAgICBjb25zdCBtYXBGaWVsZHMgPSBtYXBGaWVsZHNTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IHNpZGVGaWVsZHMgPSBzaWRlUGFuZWxTZWxlY3Rvcih0aGlzLnByb3BzLCBhdmFpbGFibGVQcm92aWRlcnMpO1xuICAgICAgY29uc3QgcGxvdENvbnRhaW5lckZpZWxkcyA9IHBsb3RDb250YWluZXJTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IGJvdHRvbVdpZGdldEZpZWxkcyA9IGJvdHRvbVdpZGdldFNlbGVjdG9yKHRoaXMucHJvcHMsIHRoZW1lKTtcbiAgICAgIGNvbnN0IG1vZGFsQ29udGFpbmVyRmllbGRzID0gbW9kYWxDb250YWluZXJTZWxlY3Rvcih0aGlzLnByb3BzLCB0aGlzLnJvb3QuY3VycmVudCk7XG4gICAgICBjb25zdCBnZW9Db2RlclBhbmVsRmllbGRzID0gZ2VvQ29kZXJQYW5lbFNlbGVjdG9yKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUGFuZWxGaWVsZHMgPSBub3RpZmljYXRpb25QYW5lbFNlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgICBjb25zdCBtYXBDb250YWluZXJzID0gIWlzU3BsaXRcbiAgICAgICAgPyBbPE1hcENvbnRhaW5lciBrZXk9ezB9IGluZGV4PXswfSB7Li4ubWFwRmllbGRzfSBtYXBMYXllcnM9e251bGx9IC8+XVxuICAgICAgICA6IHNwbGl0TWFwcy5tYXAoKHNldHRpbmdzLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPE1hcENvbnRhaW5lclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgIHsuLi5tYXBGaWVsZHN9XG4gICAgICAgICAgICAgIG1hcExheWVycz17c3BsaXRNYXBzW2luZGV4XS5sYXllcnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Um9vdENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMucm9vdH0+XG4gICAgICAgICAgPEludGxQcm92aWRlciBsb2NhbGU9e3VpU3RhdGUubG9jYWxlfSBtZXNzYWdlcz17bG9jYWxlTWVzc2FnZXNbdWlTdGF0ZS5sb2NhbGVdfT5cbiAgICAgICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgICAgIDxHbG9iYWxTdHlsZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImtlcGxlci1nbFwiXG4gICAgICAgICAgICAgICAgaWQ9e2BrZXBsZXItZ2xfXyR7aWR9YH1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICByZWY9e3RoaXMucm9vdH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxOb3RpZmljYXRpb25QYW5lbCB7Li4ubm90aWZpY2F0aW9uUGFuZWxGaWVsZHN9IC8+XG4gICAgICAgICAgICAgICAgeyF1aVN0YXRlLnJlYWRPbmx5ICYmICFyZWFkT25seSAmJiA8U2lkZVBhbmVsIHsuLi5zaWRlRmllbGRzfSAvPn1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcHNcIiBzdHlsZT17e2Rpc3BsYXk6ICdmbGV4J319PlxuICAgICAgICAgICAgICAgICAge21hcENvbnRhaW5lcnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2lzRXhwb3J0aW5nSW1hZ2UgJiYgPFBsb3RDb250YWluZXIgey4uLnBsb3RDb250YWluZXJGaWVsZHN9IC8+fVxuICAgICAgICAgICAgICAgIHtpbnRlcmFjdGlvbkNvbmZpZy5nZW9jb2Rlci5lbmFibGVkICYmIDxHZW9Db2RlclBhbmVsIHsuLi5nZW9Db2RlclBhbmVsRmllbGRzfSAvPn1cbiAgICAgICAgICAgICAgICA8Qm90dG9tV2lkZ2V0IHsuLi5ib3R0b21XaWRnZXRGaWVsZHN9IC8+XG4gICAgICAgICAgICAgICAgPE1vZGFsQ29udGFpbmVyIHsuLi5tb2RhbENvbnRhaW5lckZpZWxkc30gLz5cbiAgICAgICAgICAgICAgPC9HbG9iYWxTdHlsZT5cbiAgICAgICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgICAgICA8L0ludGxQcm92aWRlcj5cbiAgICAgICAgPC9Sb290Q29udGV4dC5Qcm92aWRlcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtlcGxlckdsQ29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1ha2VNYXBEaXNwYXRjaFRvUHJvcHMpKHdpdGhUaGVtZShLZXBsZXJHTCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlID0ge30sIHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgdmlzU3RhdGU6IHN0YXRlLnZpc1N0YXRlLFxuICAgIG1hcFN0eWxlOiBzdGF0ZS5tYXBTdHlsZSxcbiAgICBtYXBTdGF0ZTogc3RhdGUubWFwU3RhdGUsXG4gICAgdWlTdGF0ZTogc3RhdGUudWlTdGF0ZSxcbiAgICBwcm92aWRlclN0YXRlOiBzdGF0ZS5wcm92aWRlclN0YXRlXG4gIH07XG59XG5cbmNvbnN0IGRlZmF1bHRVc2VyQWN0aW9ucyA9IHt9O1xuXG5jb25zdCBnZXREaXNwYXRjaCA9IChkaXNwYXRjaCwgcHJvcHMpID0+IGRpc3BhdGNoO1xuY29uc3QgZ2V0VXNlckFjdGlvbnMgPSAoZGlzcGF0Y2gsIHByb3BzKSA9PiBwcm9wcy5hY3Rpb25zIHx8IGRlZmF1bHRVc2VyQWN0aW9ucztcblxuLyoqIEB0eXBlIHsoKSA9PiBpbXBvcnQoJ3Jlc2VsZWN0JykuT3V0cHV0UGFyYW1ldHJpY1NlbGVjdG9yPGFueSwgYW55LCBhbnksIGFueT59ICovXG5mdW5jdGlvbiBtYWtlR2V0QWN0aW9uQ3JlYXRvcnMoKSB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvcihbZ2V0RGlzcGF0Y2gsIGdldFVzZXJBY3Rpb25zXSwgKGRpc3BhdGNoLCB1c2VyQWN0aW9ucykgPT4ge1xuICAgIGNvbnN0IFt2aXNTdGF0ZUFjdGlvbnMsIG1hcFN0YXRlQWN0aW9ucywgbWFwU3R5bGVBY3Rpb25zLCB1aVN0YXRlQWN0aW9ucywgcHJvdmlkZXJBY3Rpb25zXSA9IFtcbiAgICAgIFZpc1N0YXRlQWN0aW9ucyxcbiAgICAgIE1hcFN0YXRlQWN0aW9ucyxcbiAgICAgIE1hcFN0eWxlQWN0aW9ucyxcbiAgICAgIFVJU3RhdGVBY3Rpb25zLFxuICAgICAgUHJvdmlkZXJBY3Rpb25zXG4gICAgXS5tYXAoYWN0aW9ucyA9PiBiaW5kQWN0aW9uQ3JlYXRvcnMobWVyZ2VBY3Rpb25zKGFjdGlvbnMsIHVzZXJBY3Rpb25zKSwgZGlzcGF0Y2gpKTtcblxuICAgIHJldHVybiB7XG4gICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICAgIHByb3ZpZGVyQWN0aW9ucyxcbiAgICAgIGRpc3BhdGNoXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VNYXBEaXNwYXRjaFRvUHJvcHMoKSB7XG4gIGNvbnN0IGdldEFjdGlvbkNyZWF0b3JzID0gbWFrZUdldEFjdGlvbkNyZWF0b3JzKCk7XG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBncm91cGVkQWN0aW9uQ3JlYXRvcnMgPSBnZXRBY3Rpb25DcmVhdG9ycyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmdyb3VwZWRBY3Rpb25DcmVhdG9ycyxcbiAgICAgIGRpc3BhdGNoXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbWFwRGlzcGF0Y2hUb1Byb3BzO1xufVxuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQga2VwbGVyLmdsIGFjdGlvbnMgd2l0aCB1c2VyIGRlZmluZWQgYWN0aW9ucyB1c2luZyB0aGUgc2FtZSBrZXlcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBY3Rpb25zKGFjdGlvbnMsIHVzZXJBY3Rpb25zKSB7XG4gIGNvbnN0IG92ZXJyaWRlcyA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB1c2VyQWN0aW9ucykge1xuICAgIGlmICh1c2VyQWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGFjdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgb3ZlcnJpZGVzW2tleV0gPSB1c2VyQWN0aW9uc1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7Li4uYWN0aW9ucywgLi4ub3ZlcnJpZGVzfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgS2VwbGVyR2xGYWN0b3J5O1xuIl19