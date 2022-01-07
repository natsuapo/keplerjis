"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModalContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("styled-components");

var _reactDom = require("react-dom");

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _document = _interopRequireDefault(require("global/document"));

var _defaultSettings = require("../constants/default-settings");

var _modalDialog = _interopRequireDefault(require("./modals/modal-dialog"));

var _exportUtils = require("../utils/export-utils");

var _mapInfoUtils = require("../utils/map-info-utils");

var _deleteDataModal = _interopRequireDefault(require("./modals/delete-data-modal"));

var _overwriteMapModal = _interopRequireDefault(require("./modals/overwrite-map-modal"));

var _dataTableModal = _interopRequireDefault(require("./modals/data-table-modal"));

var _loadDataModal = _interopRequireDefault(require("./modals/load-data-modal"));

var _exportImageModal = _interopRequireDefault(require("./modals/export-image-modal"));

var _exportDataModal = _interopRequireDefault(require("./modals/export-data-modal"));

var _exportMapModal = _interopRequireDefault(require("./modals/export-map-modal/export-map-modal"));

var _addMapStyleModal = _interopRequireDefault(require("./modals/add-map-style-modal"));

var _saveMapModal = _interopRequireDefault(require("./modals/save-map-modal"));

var _shareMapModal = _interopRequireDefault(require("./modals/share-map-modal"));

var _mediaBreakpoints = require("../styles/media-breakpoints");

var _keyevent = _interopRequireDefault(require("../constants/keyevent"));

var _visStateSelectors = require("../reducers/vis-state-selectors");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DataTableModalStyle = (0, _styledComponents.css)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  top: 80px;\n  padding: 32px 0 0 0;\n  width: 90vw;\n  max-width: 90vw;\n\n  ", " ", ";\n"])), _mediaBreakpoints.media.portable(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n    padding: 0;\n  "]))), _mediaBreakpoints.media.palm(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n    padding: 0;\n    margin: 0 auto;\n  "]))));
var smallModalCss = (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  width: 40%;\n  padding: 40px 40px 32px 40px;\n"])));
var LoadDataModalStyle = (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n  top: 60px;\n"])));
var DefaultStyle = (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 960px;\n"])));
ModalContainerFactory.deps = [_deleteDataModal["default"], _overwriteMapModal["default"], _dataTableModal["default"], _loadDataModal["default"], _exportImageModal["default"], _exportDataModal["default"], _exportMapModal["default"], _addMapStyleModal["default"], _modalDialog["default"], _saveMapModal["default"], _shareMapModal["default"]];

function ModalContainerFactory(DeleteDatasetModal, OverWriteMapModal, DataTableModal, LoadDataModal, ExportImageModal, ExportDataModal, ExportMapModal, AddMapStyleModal, ModalDialog, SaveMapModal, ShareMapModal) {
  /** @typedef {import('./modal-container').ModalContainerProps} ModalContainerProps */

  /** @augments React.Component<ModalContainerProps> */
  var ModalContainer = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(ModalContainer, _Component);

    var _super = _createSuper(ModalContainer);

    function ModalContainer() {
      var _this;

      (0, _classCallCheck2["default"])(this, ModalContainer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "componentDidMount", function () {
        _document["default"].addEventListener('keyup', _this._onKeyUp);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cloudProviders", function (props) {
        return props.cloudProviders;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "providerWithStorage", (0, _reselect.createSelector)(_this.cloudProviders, function (cloudProviders) {
        return cloudProviders.filter(function (p) {
          return p.hasPrivateStorage();
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "providerWithShare", (0, _reselect.createSelector)(_this.cloudProviders, function (cloudProviders) {
        return cloudProviders.filter(function (p) {
          return p.hasSharingUrl();
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyUp", function (event) {
        var keyCode = event.keyCode;

        if (keyCode === _keyevent["default"].DOM_VK_ESCAPE) {
          _this._closeModal();
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_closeModal", function () {
        _this.props.uiStateActions.toggleModal(null);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_deleteDataset", function (key) {
        _this.props.visStateActions.removeDataset(key);

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onAddCustomMapStyle", function () {
        _this.props.mapStyleActions.addCustomMapStyle();

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFileUpload", function (fileList) {
        _this.props.visStateActions.loadFiles(fileList);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportImage", function () {
        if (!_this.props.uiState.exportImage.processing) {
          (0, _exportUtils.exportImage)(_this.props, "".concat(_this.props.appName, ".png"));

          _this.props.uiStateActions.cleanupExportImage();

          _this._closeModal();
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportData", function () {
        (0, _exportUtils.exportData)(_this.props, _this.props.uiState.exportData);

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportMap", function () {
        var uiState = _this.props.uiState;
        var format = uiState.exportMap.format;
        (format === _defaultSettings.EXPORT_MAP_FORMATS.HTML ? _exportUtils.exportHtml : _exportUtils.exportJson)(_this.props, _this.props.uiState.exportMap[format] || {});

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_exportFileToCloud", function (_ref) {
        var provider = _ref.provider,
            isPublic = _ref.isPublic,
            overwrite = _ref.overwrite,
            closeModal = _ref.closeModal;
        var toSave = (0, _exportUtils.exportMap)(_this.props);

        _this.props.providerActions.exportFileToCloud({
          // @ts-ignore
          mapData: toSave,
          provider: provider,
          options: {
            isPublic: isPublic,
            overwrite: overwrite
          },
          closeModal: closeModal,
          onSuccess: _this.props.onExportToCloudSuccess,
          onError: _this.props.onExportToCloudError
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSaveMap", function () {
        var overwrite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var currentProvider = _this.props.providerState.currentProvider; // @ts-ignore

        var provider = _this.props.cloudProviders.find(function (p) {
          return p.name === currentProvider;
        });

        _this._exportFileToCloud({
          provider: provider,
          isPublic: false,
          overwrite: overwrite,
          closeModal: true
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOverwriteMap", function () {
        _this._onSaveMap(true);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onShareMapUrl", function (provider) {
        _this._exportFileToCloud({
          provider: provider,
          isPublic: true,
          overwrite: false,
          closeModal: false
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCloseSaveMap", function () {
        _this.props.providerActions.resetProviderStatus();

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLoadCloudMap", function (payload) {
        _this.props.providerActions.loadCloudMap(_objectSpread(_objectSpread({}, payload), {}, {
          onSuccess: _this.props.onLoadCloudMapSuccess,
          onError: _this.props.onLoadCloudMapError
        }));
      });
      return _this;
    }

    (0, _createClass2["default"])(ModalContainer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        _document["default"].removeEventListener('keyup', this._onKeyUp);
      }
    }, {
      key: "render",
      value:
      /* eslint-disable complexity */
      function render() {
        var _this2 = this;

        var _this$props = this.props,
            containerW = _this$props.containerW,
            containerH = _this$props.containerH,
            mapStyle = _this$props.mapStyle,
            mapState = _this$props.mapState,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            rootNode = _this$props.rootNode,
            visStateActions = _this$props.visStateActions,
            uiStateActions = _this$props.uiStateActions,
            providerState = _this$props.providerState;
        var currentModal = uiState.currentModal,
            datasetKeyToRemove = uiState.datasetKeyToRemove;
        var datasets = visState.datasets,
            layers = visState.layers,
            editingDataset = visState.editingDataset;
        var template = null;
        var modalProps = {}; // TODO - currentModal is a string
        // @ts-ignore

        if (currentModal && currentModal.id && currentModal.template) {
          // if currentMdoal template is already provided
          // TODO: need to check whether template is valid
          // @ts-ignore
          template = /*#__PURE__*/_react["default"].createElement(currentModal.template, null); // @ts-ignore

          modalProps = currentModal.modalProps;
        } else {
          switch (currentModal) {
            case _defaultSettings.DATA_TABLE_ID:
              var width = containerW * 0.9;
              template = /*#__PURE__*/_react["default"].createElement(DataTableModal, {
                width: containerW * 0.9,
                height: containerH * 0.85,
                datasets: datasets,
                dataId: editingDataset,
                showDatasetTable: visStateActions.showDatasetTable,
                sortTableColumn: visStateActions.sortTableColumn,
                pinTableColumn: visStateActions.pinTableColumn,
                copyTableColumn: visStateActions.copyTableColumn // @ts-ignore
                ,
                deleteTableColumn: visStateActions.deleteTableColumn
              }); // TODO: we need to make this width consistent with the css rule defined modal.js:32 max-width: 70vw

              modalProps.cssStyle = (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2["default"])(["\n              ", ";\n              ", ";\n            "])), DataTableModalStyle, _mediaBreakpoints.media.palm(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2["default"])(["\n                width: ", "px;\n              "])), width));
              break;

            case _defaultSettings.DELETE_DATA_ID:
              // validate options
              if (datasetKeyToRemove && datasets && datasets[datasetKeyToRemove]) {
                template = /*#__PURE__*/_react["default"].createElement(DeleteDatasetModal, {
                  dataset: datasets[datasetKeyToRemove],
                  layers: layers
                });
                modalProps = {
                  title: 'modal.title.deleteDataset',
                  cssStyle: smallModalCss,
                  footer: true,
                  onConfirm: function onConfirm() {
                    return _this2._deleteDataset(datasetKeyToRemove);
                  },
                  onCancel: this._closeModal,
                  confirmButton: {
                    negative: true,
                    large: true,
                    children: 'modal.button.delete'
                  }
                };
              }

              break;
            // in case we add a new case after this one

            case _defaultSettings.ADD_DATA_ID:
              template = /*#__PURE__*/_react["default"].createElement(LoadDataModal, (0, _extends2["default"])({}, providerState, {
                onClose: this._closeModal,
                onFileUpload: this._onFileUpload,
                onLoadCloudMap: this._onLoadCloudMap,
                cloudProviders: this.providerWithStorage(this.props),
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                getSavedMaps: this.props.providerActions.getSavedMaps,
                loadFiles: uiState.loadFiles,
                fileLoading: visState.fileLoading,
                fileLoadingProgress: visState.fileLoadingProgress,
                fileFormatNames: (0, _visStateSelectors.getFileFormatNames)(this.props.visState),
                fileExtensions: (0, _visStateSelectors.getFileExtensions)(this.props.visState)
              }));
              modalProps = {
                title: 'modal.title.addDataToMap',
                cssStyle: LoadDataModalStyle,
                footer: false,
                onConfirm: this._closeModal
              };
              break;

            case _defaultSettings.EXPORT_IMAGE_ID:
              template = /*#__PURE__*/_react["default"].createElement(ExportImageModal, {
                exportImage: uiState.exportImage,
                mapW: containerW,
                mapH: containerH,
                onUpdateImageSetting: uiStateActions.setExportImageSetting,
                cleanupExportImage: uiStateActions.cleanupExportImage
              });
              modalProps = {
                title: 'modal.title.exportImage',
                cssStyle: '',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportImage,
                confirmButton: {
                  large: true,
                  disabled: uiState.exportImage.processing,
                  children: 'modal.button.download'
                }
              };
              break;

            case _defaultSettings.EXPORT_DATA_ID:
              template = /*#__PURE__*/_react["default"].createElement(ExportDataModal, (0, _extends2["default"])({}, uiState.exportData, {
                supportedDataTypes: _defaultSettings.EXPORT_DATA_TYPE_OPTIONS,
                datasets: datasets,
                applyCPUFilter: this.props.visStateActions.applyCPUFilter,
                onClose: this._closeModal,
                onChangeExportDataType: uiStateActions.setExportDataType,
                onChangeExportSelectedDataset: uiStateActions.setExportSelectedDataset,
                onChangeExportFiltered: uiStateActions.setExportFiltered
              }));
              modalProps = {
                title: 'modal.title.exportData',
                cssStyle: '',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportData,
                confirmButton: {
                  large: true,
                  children: 'modal.button.export'
                }
              };
              break;

            case _defaultSettings.EXPORT_MAP_ID:
              var keplerGlConfig = visState.schema.getConfigToSave({
                mapStyle: mapStyle,
                visState: visState,
                mapState: mapState,
                uiState: uiState
              });
              template = /*#__PURE__*/_react["default"].createElement(ExportMapModal, {
                config: keplerGlConfig,
                options: uiState.exportMap,
                onChangeExportMapFormat: uiStateActions.setExportMapFormat,
                onEditUserMapboxAccessToken: uiStateActions.setUserMapboxAccessToken,
                onChangeExportMapHTMLMode: uiStateActions.setExportHTMLMapMode
              });
              modalProps = {
                title: 'modal.title.exportMap',
                cssStyle: '',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportMap,
                confirmButton: {
                  large: true,
                  children: 'modal.button.export'
                }
              };
              break;

            case _defaultSettings.ADD_MAP_STYLE_ID:
              template = /*#__PURE__*/_react["default"].createElement(AddMapStyleModal, {
                mapboxApiAccessToken: this.props.mapboxApiAccessToken,
                mapboxApiUrl: this.props.mapboxApiUrl,
                mapState: this.props.mapState,
                inputStyle: mapStyle.inputStyle,
                inputMapStyle: this.props.mapStyleActions.inputMapStyle,
                loadCustomMapStyle: this.props.mapStyleActions.loadCustomMapStyle
              });
              modalProps = {
                title: 'modal.title.addCustomMapboxStyle',
                cssStyle: '',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onAddCustomMapStyle,
                confirmButton: {
                  large: true,
                  disabled: !mapStyle.inputStyle.style,
                  children: 'modal.button.addStyle'
                }
              };
              break;

            case _defaultSettings.SAVE_MAP_ID:
              template = /*#__PURE__*/_react["default"].createElement(SaveMapModal, (0, _extends2["default"])({}, providerState, {
                exportImage: uiState.exportImage,
                mapInfo: visState.mapInfo,
                onSetMapInfo: visStateActions.setMapInfo,
                cloudProviders: this.providerWithStorage(this.props),
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                cleanupExportImage: uiStateActions.cleanupExportImage,
                onUpdateImageSetting: uiStateActions.setExportImageSetting
              }));
              modalProps = {
                title: 'modal.title.saveMap',
                cssStyle: '',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: function onConfirm() {
                  return _this2._onSaveMap(false);
                },
                confirmButton: {
                  large: true,
                  disabled: uiState.exportImage.processing || !(0, _mapInfoUtils.isValidMapInfo)(visState.mapInfo) || !providerState.currentProvider,
                  children: 'modal.button.save'
                }
              };
              break;

            case _defaultSettings.OVERWRITE_MAP_ID:
              template = /*#__PURE__*/_react["default"].createElement(OverWriteMapModal, (0, _extends2["default"])({}, providerState, {
                cloudProviders: this.props.cloudProviders,
                title: (0, _lodash["default"])(visState, ['mapInfo', 'title']),
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                onUpdateImageSetting: uiStateActions.setExportImageSetting,
                cleanupExportImage: uiStateActions.cleanupExportImage
              }));
              modalProps = {
                title: 'Overwrite Existing File?',
                cssStyle: smallModalCss,
                footer: true,
                onConfirm: this._onOverwriteMap,
                onCancel: this._closeModal,
                confirmButton: {
                  large: true,
                  children: 'Yes',
                  disabled: uiState.exportImage.processing || !(0, _mapInfoUtils.isValidMapInfo)(visState.mapInfo) || !providerState.currentProvider
                }
              };
              break;

            case _defaultSettings.SHARE_MAP_ID:
              template = /*#__PURE__*/_react["default"].createElement(ShareMapModal, (0, _extends2["default"])({}, providerState, {
                isReady: !uiState.exportImage.processing,
                cloudProviders: this.providerWithShare(this.props),
                onExport: this._onShareMapUrl,
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                cleanupExportImage: uiStateActions.cleanupExportImage,
                onUpdateImageSetting: uiStateActions.setExportImageSetting
              }));
              modalProps = {
                title: 'modal.title.shareURL',
                cssStyle: '',
                onCancel: this._onCloseSaveMap
              };
              break;

            default:
              break;
          }
        }

        return this.props.rootNode ? /*#__PURE__*/_react["default"].createElement(ModalDialog, (0, _extends2["default"])({
          parentSelector: function parentSelector() {
            return (0, _reactDom.findDOMNode)(rootNode);
          },
          isOpen: Boolean(currentModal),
          onCancel: this._closeModal
        }, modalProps, {
          cssStyle: DefaultStyle.concat(modalProps.cssStyle)
        }), template) : null;
      }
      /* eslint-enable complexity */

    }]);
    return ModalContainer;
  }(_react.Component);

  (0, _defineProperty2["default"])(ModalContainer, "propTypes", {
    rootNode: _propTypes["default"].object,
    containerW: _propTypes["default"].number,
    containerH: _propTypes["default"].number,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    mapboxApiUrl: _propTypes["default"].string,
    mapState: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    uiState: _propTypes["default"].object.isRequired,
    visState: _propTypes["default"].object.isRequired,
    visStateActions: _propTypes["default"].object.isRequired,
    uiStateActions: _propTypes["default"].object.isRequired,
    mapStyleActions: _propTypes["default"].object.isRequired,
    onSaveToStorage: _propTypes["default"].func,
    cloudProviders: _propTypes["default"].arrayOf(_propTypes["default"].object)
  });
  return ModalContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsLWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJEYXRhVGFibGVNb2RhbFN0eWxlIiwiY3NzIiwibWVkaWEiLCJwb3J0YWJsZSIsInBhbG0iLCJzbWFsbE1vZGFsQ3NzIiwiTG9hZERhdGFNb2RhbFN0eWxlIiwiRGVmYXVsdFN0eWxlIiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiZGVwcyIsIkRlbGV0ZURhdGFzZXRNb2RhbEZhY3RvcnkiLCJPdmVyV3JpdGVNYXBNb2RhbEZhY3RvcnkiLCJEYXRhVGFibGVNb2RhbEZhY3RvcnkiLCJMb2FkRGF0YU1vZGFsRmFjdG9yeSIsIkV4cG9ydEltYWdlTW9kYWxGYWN0b3J5IiwiRXhwb3J0RGF0YU1vZGFsRmFjdG9yeSIsIkV4cG9ydE1hcE1vZGFsRmFjdG9yeSIsIkFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5IiwiTW9kYWxEaWFsb2dGYWN0b3J5IiwiU2F2ZU1hcE1vZGFsRmFjdG9yeSIsIlNoYXJlTWFwTW9kYWxGYWN0b3J5IiwiRGVsZXRlRGF0YXNldE1vZGFsIiwiT3ZlcldyaXRlTWFwTW9kYWwiLCJEYXRhVGFibGVNb2RhbCIsIkxvYWREYXRhTW9kYWwiLCJFeHBvcnRJbWFnZU1vZGFsIiwiRXhwb3J0RGF0YU1vZGFsIiwiRXhwb3J0TWFwTW9kYWwiLCJBZGRNYXBTdHlsZU1vZGFsIiwiTW9kYWxEaWFsb2ciLCJTYXZlTWFwTW9kYWwiLCJTaGFyZU1hcE1vZGFsIiwiTW9kYWxDb250YWluZXIiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25LZXlVcCIsInByb3BzIiwiY2xvdWRQcm92aWRlcnMiLCJmaWx0ZXIiLCJwIiwiaGFzUHJpdmF0ZVN0b3JhZ2UiLCJoYXNTaGFyaW5nVXJsIiwiZXZlbnQiLCJrZXlDb2RlIiwiS2V5RXZlbnQiLCJET01fVktfRVNDQVBFIiwiX2Nsb3NlTW9kYWwiLCJ1aVN0YXRlQWN0aW9ucyIsInRvZ2dsZU1vZGFsIiwia2V5IiwidmlzU3RhdGVBY3Rpb25zIiwicmVtb3ZlRGF0YXNldCIsIm1hcFN0eWxlQWN0aW9ucyIsImFkZEN1c3RvbU1hcFN0eWxlIiwiZmlsZUxpc3QiLCJsb2FkRmlsZXMiLCJ1aVN0YXRlIiwiZXhwb3J0SW1hZ2UiLCJwcm9jZXNzaW5nIiwiYXBwTmFtZSIsImNsZWFudXBFeHBvcnRJbWFnZSIsImV4cG9ydERhdGEiLCJmb3JtYXQiLCJleHBvcnRNYXAiLCJFWFBPUlRfTUFQX0ZPUk1BVFMiLCJIVE1MIiwiZXhwb3J0SHRtbCIsImV4cG9ydEpzb24iLCJwcm92aWRlciIsImlzUHVibGljIiwib3ZlcndyaXRlIiwiY2xvc2VNb2RhbCIsInRvU2F2ZSIsInByb3ZpZGVyQWN0aW9ucyIsImV4cG9ydEZpbGVUb0Nsb3VkIiwibWFwRGF0YSIsIm9wdGlvbnMiLCJvblN1Y2Nlc3MiLCJvbkV4cG9ydFRvQ2xvdWRTdWNjZXNzIiwib25FcnJvciIsIm9uRXhwb3J0VG9DbG91ZEVycm9yIiwiY3VycmVudFByb3ZpZGVyIiwicHJvdmlkZXJTdGF0ZSIsImZpbmQiLCJuYW1lIiwiX2V4cG9ydEZpbGVUb0Nsb3VkIiwiX29uU2F2ZU1hcCIsInJlc2V0UHJvdmlkZXJTdGF0dXMiLCJwYXlsb2FkIiwibG9hZENsb3VkTWFwIiwib25Mb2FkQ2xvdWRNYXBTdWNjZXNzIiwib25Mb2FkQ2xvdWRNYXBFcnJvciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb250YWluZXJXIiwiY29udGFpbmVySCIsIm1hcFN0eWxlIiwibWFwU3RhdGUiLCJ2aXNTdGF0ZSIsInJvb3ROb2RlIiwiY3VycmVudE1vZGFsIiwiZGF0YXNldEtleVRvUmVtb3ZlIiwiZGF0YXNldHMiLCJsYXllcnMiLCJlZGl0aW5nRGF0YXNldCIsInRlbXBsYXRlIiwibW9kYWxQcm9wcyIsImlkIiwiREFUQV9UQUJMRV9JRCIsIndpZHRoIiwic2hvd0RhdGFzZXRUYWJsZSIsInNvcnRUYWJsZUNvbHVtbiIsInBpblRhYmxlQ29sdW1uIiwiY29weVRhYmxlQ29sdW1uIiwiZGVsZXRlVGFibGVDb2x1bW4iLCJjc3NTdHlsZSIsIkRFTEVURV9EQVRBX0lEIiwidGl0bGUiLCJmb290ZXIiLCJvbkNvbmZpcm0iLCJfZGVsZXRlRGF0YXNldCIsIm9uQ2FuY2VsIiwiY29uZmlybUJ1dHRvbiIsIm5lZ2F0aXZlIiwibGFyZ2UiLCJjaGlsZHJlbiIsIkFERF9EQVRBX0lEIiwiX29uRmlsZVVwbG9hZCIsIl9vbkxvYWRDbG91ZE1hcCIsInByb3ZpZGVyV2l0aFN0b3JhZ2UiLCJzZXRDbG91ZFByb3ZpZGVyIiwiZ2V0U2F2ZWRNYXBzIiwiZmlsZUxvYWRpbmciLCJmaWxlTG9hZGluZ1Byb2dyZXNzIiwiRVhQT1JUX0lNQUdFX0lEIiwic2V0RXhwb3J0SW1hZ2VTZXR0aW5nIiwiX29uRXhwb3J0SW1hZ2UiLCJkaXNhYmxlZCIsIkVYUE9SVF9EQVRBX0lEIiwiRVhQT1JUX0RBVEFfVFlQRV9PUFRJT05TIiwiYXBwbHlDUFVGaWx0ZXIiLCJzZXRFeHBvcnREYXRhVHlwZSIsInNldEV4cG9ydFNlbGVjdGVkRGF0YXNldCIsInNldEV4cG9ydEZpbHRlcmVkIiwiX29uRXhwb3J0RGF0YSIsIkVYUE9SVF9NQVBfSUQiLCJrZXBsZXJHbENvbmZpZyIsInNjaGVtYSIsImdldENvbmZpZ1RvU2F2ZSIsInNldEV4cG9ydE1hcEZvcm1hdCIsInNldFVzZXJNYXBib3hBY2Nlc3NUb2tlbiIsInNldEV4cG9ydEhUTUxNYXBNb2RlIiwiX29uRXhwb3J0TWFwIiwiQUREX01BUF9TVFlMRV9JRCIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwibWFwYm94QXBpVXJsIiwiaW5wdXRTdHlsZSIsImlucHV0TWFwU3R5bGUiLCJsb2FkQ3VzdG9tTWFwU3R5bGUiLCJfb25BZGRDdXN0b21NYXBTdHlsZSIsInN0eWxlIiwiU0FWRV9NQVBfSUQiLCJtYXBJbmZvIiwic2V0TWFwSW5mbyIsIk9WRVJXUklURV9NQVBfSUQiLCJfb25PdmVyd3JpdGVNYXAiLCJTSEFSRV9NQVBfSUQiLCJwcm92aWRlcldpdGhTaGFyZSIsIl9vblNoYXJlTWFwVXJsIiwiX29uQ2xvc2VTYXZlTWFwIiwiQm9vbGVhbiIsImNvbmNhdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsIm51bWJlciIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvblNhdmVUb1N0b3JhZ2UiLCJmdW5jIiwiYXJyYXlPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBZ0JBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxtQkFBbUIsT0FBR0MscUJBQUgsb0xBTXJCQyx3QkFBTUMsUUFOZSwrR0FRbEJELHdCQUFNRSxJQVJZLG1JQUF6QjtBQWFBLElBQU1DLGFBQWEsT0FBR0oscUJBQUgsMklBQW5CO0FBS0EsSUFBTUssa0JBQWtCLE9BQUdMLHFCQUFILHlHQUF4QjtBQUlBLElBQU1NLFlBQVksT0FBR04scUJBQUgsZ0hBQWxCO0FBSUFPLHFCQUFxQixDQUFDQyxJQUF0QixHQUE2QixDQUMzQkMsMkJBRDJCLEVBRTNCQyw2QkFGMkIsRUFHM0JDLDBCQUgyQixFQUkzQkMseUJBSjJCLEVBSzNCQyw0QkFMMkIsRUFNM0JDLDJCQU4yQixFQU8zQkMsMEJBUDJCLEVBUTNCQyw0QkFSMkIsRUFTM0JDLHVCQVQyQixFQVUzQkMsd0JBVjJCLEVBVzNCQyx5QkFYMkIsQ0FBN0I7O0FBY2UsU0FBU1oscUJBQVQsQ0FDYmEsa0JBRGEsRUFFYkMsaUJBRmEsRUFHYkMsY0FIYSxFQUliQyxhQUphLEVBS2JDLGdCQUxhLEVBTWJDLGVBTmEsRUFPYkMsY0FQYSxFQVFiQyxnQkFSYSxFQVNiQyxXQVRhLEVBVWJDLFlBVmEsRUFXYkMsYUFYYSxFQVliO0FBQ0E7O0FBQ0E7QUFGQSxNQUdNQyxjQUhO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THJCO0FBNGFBLFNBQU83SSxjQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2Nzc30gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoLmdldCc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnZ2xvYmFsL2RvY3VtZW50JztcblxuaW1wb3J0IHtFWFBPUlRfREFUQV9UWVBFX09QVElPTlN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCBNb2RhbERpYWxvZ0ZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvbW9kYWwtZGlhbG9nJztcbmltcG9ydCB7ZXhwb3J0SnNvbiwgZXhwb3J0SHRtbCwgZXhwb3J0RGF0YSwgZXhwb3J0SW1hZ2UsIGV4cG9ydE1hcH0gZnJvbSAndXRpbHMvZXhwb3J0LXV0aWxzJztcbmltcG9ydCB7aXNWYWxpZE1hcEluZm99IGZyb20gJ3V0aWxzL21hcC1pbmZvLXV0aWxzJztcblxuLy8gbW9kYWxzXG5pbXBvcnQgRGVsZXRlRGF0YXNldE1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9kZWxldGUtZGF0YS1tb2RhbCc7XG5pbXBvcnQgT3ZlcldyaXRlTWFwTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL292ZXJ3cml0ZS1tYXAtbW9kYWwnO1xuaW1wb3J0IERhdGFUYWJsZU1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9kYXRhLXRhYmxlLW1vZGFsJztcbmltcG9ydCBMb2FkRGF0YU1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9sb2FkLWRhdGEtbW9kYWwnO1xuaW1wb3J0IEV4cG9ydEltYWdlTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL2V4cG9ydC1pbWFnZS1tb2RhbCc7XG5pbXBvcnQgRXhwb3J0RGF0YU1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9leHBvcnQtZGF0YS1tb2RhbCc7XG5pbXBvcnQgRXhwb3J0TWFwTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL2V4cG9ydC1tYXAtbW9kYWwvZXhwb3J0LW1hcC1tb2RhbCc7XG5pbXBvcnQgQWRkTWFwU3R5bGVNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvYWRkLW1hcC1zdHlsZS1tb2RhbCc7XG5pbXBvcnQgU2F2ZU1hcE1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9zYXZlLW1hcC1tb2RhbCc7XG5pbXBvcnQgU2hhcmVNYXBNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvc2hhcmUtbWFwLW1vZGFsJztcblxuLy8gQnJlYWtwb2ludHNcbmltcG9ydCB7bWVkaWF9IGZyb20gJ3N0eWxlcy9tZWRpYS1icmVha3BvaW50cyc7XG5cbi8vIFRlbXBsYXRlXG5pbXBvcnQge1xuICBBRERfREFUQV9JRCxcbiAgREFUQV9UQUJMRV9JRCxcbiAgREVMRVRFX0RBVEFfSUQsXG4gIEVYUE9SVF9EQVRBX0lELFxuICBFWFBPUlRfSU1BR0VfSUQsXG4gIEVYUE9SVF9NQVBfSUQsXG4gIEFERF9NQVBfU1RZTEVfSUQsXG4gIFNBVkVfTUFQX0lELFxuICBTSEFSRV9NQVBfSUQsXG4gIE9WRVJXUklURV9NQVBfSURcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtFWFBPUlRfTUFQX0ZPUk1BVFN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCBLZXlFdmVudCBmcm9tICdjb25zdGFudHMva2V5ZXZlbnQnO1xuaW1wb3J0IHtnZXRGaWxlRm9ybWF0TmFtZXMsIGdldEZpbGVFeHRlbnNpb25zfSBmcm9tICcuLi9yZWR1Y2Vycy92aXMtc3RhdGUtc2VsZWN0b3JzJztcblxuY29uc3QgRGF0YVRhYmxlTW9kYWxTdHlsZSA9IGNzc2BcbiAgdG9wOiA4MHB4O1xuICBwYWRkaW5nOiAzMnB4IDAgMCAwO1xuICB3aWR0aDogOTB2dztcbiAgbWF4LXdpZHRoOiA5MHZ3O1xuXG4gICR7bWVkaWEucG9ydGFibGVgXG4gICAgcGFkZGluZzogMDtcbiAgYH0gJHttZWRpYS5wYWxtYFxuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIGB9O1xuYDtcbmNvbnN0IHNtYWxsTW9kYWxDc3MgPSBjc3NgXG4gIHdpZHRoOiA0MCU7XG4gIHBhZGRpbmc6IDQwcHggNDBweCAzMnB4IDQwcHg7XG5gO1xuXG5jb25zdCBMb2FkRGF0YU1vZGFsU3R5bGUgPSBjc3NgXG4gIHRvcDogNjBweDtcbmA7XG5cbmNvbnN0IERlZmF1bHRTdHlsZSA9IGNzc2BcbiAgbWF4LXdpZHRoOiA5NjBweDtcbmA7XG5cbk1vZGFsQ29udGFpbmVyRmFjdG9yeS5kZXBzID0gW1xuICBEZWxldGVEYXRhc2V0TW9kYWxGYWN0b3J5LFxuICBPdmVyV3JpdGVNYXBNb2RhbEZhY3RvcnksXG4gIERhdGFUYWJsZU1vZGFsRmFjdG9yeSxcbiAgTG9hZERhdGFNb2RhbEZhY3RvcnksXG4gIEV4cG9ydEltYWdlTW9kYWxGYWN0b3J5LFxuICBFeHBvcnREYXRhTW9kYWxGYWN0b3J5LFxuICBFeHBvcnRNYXBNb2RhbEZhY3RvcnksXG4gIEFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5LFxuICBNb2RhbERpYWxvZ0ZhY3RvcnksXG4gIFNhdmVNYXBNb2RhbEZhY3RvcnksXG4gIFNoYXJlTWFwTW9kYWxGYWN0b3J5XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb2RhbENvbnRhaW5lckZhY3RvcnkoXG4gIERlbGV0ZURhdGFzZXRNb2RhbCxcbiAgT3ZlcldyaXRlTWFwTW9kYWwsXG4gIERhdGFUYWJsZU1vZGFsLFxuICBMb2FkRGF0YU1vZGFsLFxuICBFeHBvcnRJbWFnZU1vZGFsLFxuICBFeHBvcnREYXRhTW9kYWwsXG4gIEV4cG9ydE1hcE1vZGFsLFxuICBBZGRNYXBTdHlsZU1vZGFsLFxuICBNb2RhbERpYWxvZyxcbiAgU2F2ZU1hcE1vZGFsLFxuICBTaGFyZU1hcE1vZGFsXG4pIHtcbiAgLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vbW9kYWwtY29udGFpbmVyJykuTW9kYWxDb250YWluZXJQcm9wc30gTW9kYWxDb250YWluZXJQcm9wcyAqL1xuICAvKiogQGF1Z21lbnRzIFJlYWN0LkNvbXBvbmVudDxNb2RhbENvbnRhaW5lclByb3BzPiAqL1xuICBjbGFzcyBNb2RhbENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLy8gVE9ETyAtIHJlbW92ZSB3aGVuIHByb3AgdHlwZXMgYXJlIGZ1bGx5IGV4cG9ydGVkXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIHJvb3ROb2RlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgY29udGFpbmVyVzogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGNvbnRhaW5lckg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWFwYm94QXBpVXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWFwU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICB1aVN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICB2aXNTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICB1aVN0YXRlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBvblNhdmVUb1N0b3JhZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgY2xvdWRQcm92aWRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpXG4gICAgfTtcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25LZXlVcCk7XG4gICAgfTtcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25LZXlVcCk7XG4gICAgfVxuXG4gICAgY2xvdWRQcm92aWRlcnMgPSBwcm9wcyA9PiBwcm9wcy5jbG91ZFByb3ZpZGVycztcbiAgICBwcm92aWRlcldpdGhTdG9yYWdlID0gY3JlYXRlU2VsZWN0b3IodGhpcy5jbG91ZFByb3ZpZGVycywgY2xvdWRQcm92aWRlcnMgPT5cbiAgICAgIGNsb3VkUHJvdmlkZXJzLmZpbHRlcihwID0+IHAuaGFzUHJpdmF0ZVN0b3JhZ2UoKSlcbiAgICApO1xuICAgIHByb3ZpZGVyV2l0aFNoYXJlID0gY3JlYXRlU2VsZWN0b3IodGhpcy5jbG91ZFByb3ZpZGVycywgY2xvdWRQcm92aWRlcnMgPT5cbiAgICAgIGNsb3VkUHJvdmlkZXJzLmZpbHRlcihwID0+IHAuaGFzU2hhcmluZ1VybCgpKVxuICAgICk7XG5cbiAgICBfb25LZXlVcCA9IGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleUNvZGUgPT09IEtleUV2ZW50LkRPTV9WS19FU0NBUEUpIHtcbiAgICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwobnVsbCk7XG4gICAgfTtcblxuICAgIF9kZWxldGVEYXRhc2V0ID0ga2V5ID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLnJlbW92ZURhdGFzZXQoa2V5KTtcbiAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICB9O1xuXG4gICAgX29uQWRkQ3VzdG9tTWFwU3R5bGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5hZGRDdXN0b21NYXBTdHlsZSgpO1xuICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgIH07XG5cbiAgICBfb25GaWxlVXBsb2FkID0gZmlsZUxpc3QgPT4ge1xuICAgICAgdGhpcy5wcm9wcy52aXNTdGF0ZUFjdGlvbnMubG9hZEZpbGVzKGZpbGVMaXN0KTtcbiAgICB9O1xuXG4gICAgX29uRXhwb3J0SW1hZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMudWlTdGF0ZS5leHBvcnRJbWFnZS5wcm9jZXNzaW5nKSB7XG4gICAgICAgIGV4cG9ydEltYWdlKHRoaXMucHJvcHMsIGAke3RoaXMucHJvcHMuYXBwTmFtZX0ucG5nYCk7XG4gICAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMuY2xlYW51cEV4cG9ydEltYWdlKCk7XG4gICAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX29uRXhwb3J0RGF0YSA9ICgpID0+IHtcbiAgICAgIGV4cG9ydERhdGEodGhpcy5wcm9wcywgdGhpcy5wcm9wcy51aVN0YXRlLmV4cG9ydERhdGEpO1xuICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgIH07XG5cbiAgICBfb25FeHBvcnRNYXAgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7dWlTdGF0ZX0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge2Zvcm1hdH0gPSB1aVN0YXRlLmV4cG9ydE1hcDtcbiAgICAgIChmb3JtYXQgPT09IEVYUE9SVF9NQVBfRk9STUFUUy5IVE1MID8gZXhwb3J0SHRtbCA6IGV4cG9ydEpzb24pKFxuICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICB0aGlzLnByb3BzLnVpU3RhdGUuZXhwb3J0TWFwW2Zvcm1hdF0gfHwge31cbiAgICAgICk7XG4gICAgICB0aGlzLl9jbG9zZU1vZGFsKCk7XG4gICAgfTtcblxuICAgIF9leHBvcnRGaWxlVG9DbG91ZCA9ICh7cHJvdmlkZXIsIGlzUHVibGljLCBvdmVyd3JpdGUsIGNsb3NlTW9kYWx9KSA9PiB7XG4gICAgICBjb25zdCB0b1NhdmUgPSBleHBvcnRNYXAodGhpcy5wcm9wcyk7XG5cbiAgICAgIHRoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLmV4cG9ydEZpbGVUb0Nsb3VkKHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBtYXBEYXRhOiB0b1NhdmUsXG4gICAgICAgIHByb3ZpZGVyLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgaXNQdWJsaWMsXG4gICAgICAgICAgb3ZlcndyaXRlXG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlTW9kYWwsXG4gICAgICAgIG9uU3VjY2VzczogdGhpcy5wcm9wcy5vbkV4cG9ydFRvQ2xvdWRTdWNjZXNzLFxuICAgICAgICBvbkVycm9yOiB0aGlzLnByb3BzLm9uRXhwb3J0VG9DbG91ZEVycm9yXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX29uU2F2ZU1hcCA9IChvdmVyd3JpdGUgPSBmYWxzZSkgPT4ge1xuICAgICAgY29uc3Qge2N1cnJlbnRQcm92aWRlcn0gPSB0aGlzLnByb3BzLnByb3ZpZGVyU3RhdGU7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMucHJvcHMuY2xvdWRQcm92aWRlcnMuZmluZChwID0+IHAubmFtZSA9PT0gY3VycmVudFByb3ZpZGVyKTtcbiAgICAgIHRoaXMuX2V4cG9ydEZpbGVUb0Nsb3VkKHtcbiAgICAgICAgcHJvdmlkZXIsXG4gICAgICAgIGlzUHVibGljOiBmYWxzZSxcbiAgICAgICAgb3ZlcndyaXRlLFxuICAgICAgICBjbG9zZU1vZGFsOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX29uT3ZlcndyaXRlTWFwID0gKCkgPT4ge1xuICAgICAgdGhpcy5fb25TYXZlTWFwKHRydWUpO1xuICAgIH07XG5cbiAgICBfb25TaGFyZU1hcFVybCA9IHByb3ZpZGVyID0+IHtcbiAgICAgIHRoaXMuX2V4cG9ydEZpbGVUb0Nsb3VkKHtwcm92aWRlciwgaXNQdWJsaWM6IHRydWUsIG92ZXJ3cml0ZTogZmFsc2UsIGNsb3NlTW9kYWw6IGZhbHNlfSk7XG4gICAgfTtcblxuICAgIF9vbkNsb3NlU2F2ZU1hcCA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLnJlc2V0UHJvdmlkZXJTdGF0dXMoKTtcbiAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICB9O1xuXG4gICAgX29uTG9hZENsb3VkTWFwID0gcGF5bG9hZCA9PiB7XG4gICAgICB0aGlzLnByb3BzLnByb3ZpZGVyQWN0aW9ucy5sb2FkQ2xvdWRNYXAoe1xuICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICBvblN1Y2Nlc3M6IHRoaXMucHJvcHMub25Mb2FkQ2xvdWRNYXBTdWNjZXNzLFxuICAgICAgICBvbkVycm9yOiB0aGlzLnByb3BzLm9uTG9hZENsb3VkTWFwRXJyb3JcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb250YWluZXJXLFxuICAgICAgICBjb250YWluZXJILFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIHZpc1N0YXRlLFxuICAgICAgICByb290Tm9kZSxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICB1aVN0YXRlQWN0aW9ucyxcbiAgICAgICAgcHJvdmlkZXJTdGF0ZVxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7Y3VycmVudE1vZGFsLCBkYXRhc2V0S2V5VG9SZW1vdmV9ID0gdWlTdGF0ZTtcbiAgICAgIGNvbnN0IHtkYXRhc2V0cywgbGF5ZXJzLCBlZGl0aW5nRGF0YXNldH0gPSB2aXNTdGF0ZTtcblxuICAgICAgbGV0IHRlbXBsYXRlID0gbnVsbDtcbiAgICAgIGxldCBtb2RhbFByb3BzID0ge307XG5cbiAgICAgIC8vIFRPRE8gLSBjdXJyZW50TW9kYWwgaXMgYSBzdHJpbmdcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmIChjdXJyZW50TW9kYWwgJiYgY3VycmVudE1vZGFsLmlkICYmIGN1cnJlbnRNb2RhbC50ZW1wbGF0ZSkge1xuICAgICAgICAvLyBpZiBjdXJyZW50TWRvYWwgdGVtcGxhdGUgaXMgYWxyZWFkeSBwcm92aWRlZFxuICAgICAgICAvLyBUT0RPOiBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgdGVtcGxhdGUgaXMgdmFsaWRcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0ZW1wbGF0ZSA9IDxjdXJyZW50TW9kYWwudGVtcGxhdGUgLz47XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbW9kYWxQcm9wcyA9IGN1cnJlbnRNb2RhbC5tb2RhbFByb3BzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjdXJyZW50TW9kYWwpIHtcbiAgICAgICAgICBjYXNlIERBVEFfVEFCTEVfSUQ6XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNvbnRhaW5lclcgKiAwLjk7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPERhdGFUYWJsZU1vZGFsXG4gICAgICAgICAgICAgICAgd2lkdGg9e2NvbnRhaW5lclcgKiAwLjl9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtjb250YWluZXJIICogMC44NX1cbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgZGF0YUlkPXtlZGl0aW5nRGF0YXNldH1cbiAgICAgICAgICAgICAgICBzaG93RGF0YXNldFRhYmxlPXt2aXNTdGF0ZUFjdGlvbnMuc2hvd0RhdGFzZXRUYWJsZX1cbiAgICAgICAgICAgICAgICBzb3J0VGFibGVDb2x1bW49e3Zpc1N0YXRlQWN0aW9ucy5zb3J0VGFibGVDb2x1bW59XG4gICAgICAgICAgICAgICAgcGluVGFibGVDb2x1bW49e3Zpc1N0YXRlQWN0aW9ucy5waW5UYWJsZUNvbHVtbn1cbiAgICAgICAgICAgICAgICBjb3B5VGFibGVDb2x1bW49e3Zpc1N0YXRlQWN0aW9ucy5jb3B5VGFibGVDb2x1bW59XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGRlbGV0ZVRhYmxlQ29sdW1uPXt2aXNTdGF0ZUFjdGlvbnMuZGVsZXRlVGFibGVDb2x1bW59XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB3ZSBuZWVkIHRvIG1ha2UgdGhpcyB3aWR0aCBjb25zaXN0ZW50IHdpdGggdGhlIGNzcyBydWxlIGRlZmluZWQgbW9kYWwuanM6MzIgbWF4LXdpZHRoOiA3MHZ3XG4gICAgICAgICAgICBtb2RhbFByb3BzLmNzc1N0eWxlID0gY3NzYFxuICAgICAgICAgICAgICAke0RhdGFUYWJsZU1vZGFsU3R5bGV9O1xuICAgICAgICAgICAgICAke21lZGlhLnBhbG1gXG4gICAgICAgICAgICAgICAgd2lkdGg6ICR7d2lkdGh9cHg7XG4gICAgICAgICAgICAgIGB9O1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgREVMRVRFX0RBVEFfSUQ6XG4gICAgICAgICAgICAvLyB2YWxpZGF0ZSBvcHRpb25zXG4gICAgICAgICAgICBpZiAoZGF0YXNldEtleVRvUmVtb3ZlICYmIGRhdGFzZXRzICYmIGRhdGFzZXRzW2RhdGFzZXRLZXlUb1JlbW92ZV0pIHtcbiAgICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgICAgPERlbGV0ZURhdGFzZXRNb2RhbCBkYXRhc2V0PXtkYXRhc2V0c1tkYXRhc2V0S2V5VG9SZW1vdmVdfSBsYXllcnM9e2xheWVyc30gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLmRlbGV0ZURhdGFzZXQnLFxuICAgICAgICAgICAgICAgIGNzc1N0eWxlOiBzbWFsbE1vZGFsQ3NzLFxuICAgICAgICAgICAgICAgIGZvb3RlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHRoaXMuX2RlbGV0ZURhdGFzZXQoZGF0YXNldEtleVRvUmVtb3ZlKSxcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICBuZWdhdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGxhcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY2hpbGRyZW46ICdtb2RhbC5idXR0b24uZGVsZXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrOyAvLyBpbiBjYXNlIHdlIGFkZCBhIG5ldyBjYXNlIGFmdGVyIHRoaXMgb25lXG4gICAgICAgICAgY2FzZSBBRERfREFUQV9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8TG9hZERhdGFNb2RhbFxuICAgICAgICAgICAgICAgIHsuLi5wcm92aWRlclN0YXRlfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX2Nsb3NlTW9kYWx9XG4gICAgICAgICAgICAgICAgb25GaWxlVXBsb2FkPXt0aGlzLl9vbkZpbGVVcGxvYWR9XG4gICAgICAgICAgICAgICAgb25Mb2FkQ2xvdWRNYXA9e3RoaXMuX29uTG9hZENsb3VkTWFwfVxuICAgICAgICAgICAgICAgIGNsb3VkUHJvdmlkZXJzPXt0aGlzLnByb3ZpZGVyV2l0aFN0b3JhZ2UodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgb25TZXRDbG91ZFByb3ZpZGVyPXt0aGlzLnByb3BzLnByb3ZpZGVyQWN0aW9ucy5zZXRDbG91ZFByb3ZpZGVyfVxuICAgICAgICAgICAgICAgIGdldFNhdmVkTWFwcz17dGhpcy5wcm9wcy5wcm92aWRlckFjdGlvbnMuZ2V0U2F2ZWRNYXBzfVxuICAgICAgICAgICAgICAgIGxvYWRGaWxlcz17dWlTdGF0ZS5sb2FkRmlsZXN9XG4gICAgICAgICAgICAgICAgZmlsZUxvYWRpbmc9e3Zpc1N0YXRlLmZpbGVMb2FkaW5nfVxuICAgICAgICAgICAgICAgIGZpbGVMb2FkaW5nUHJvZ3Jlc3M9e3Zpc1N0YXRlLmZpbGVMb2FkaW5nUHJvZ3Jlc3N9XG4gICAgICAgICAgICAgICAgZmlsZUZvcm1hdE5hbWVzPXtnZXRGaWxlRm9ybWF0TmFtZXModGhpcy5wcm9wcy52aXNTdGF0ZSl9XG4gICAgICAgICAgICAgICAgZmlsZUV4dGVuc2lvbnM9e2dldEZpbGVFeHRlbnNpb25zKHRoaXMucHJvcHMudmlzU3RhdGUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1vZGFsUHJvcHMgPSB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnbW9kYWwudGl0bGUuYWRkRGF0YVRvTWFwJyxcbiAgICAgICAgICAgICAgY3NzU3R5bGU6IExvYWREYXRhTW9kYWxTdHlsZSxcbiAgICAgICAgICAgICAgZm9vdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9jbG9zZU1vZGFsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFWFBPUlRfSU1BR0VfSUQ6XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPEV4cG9ydEltYWdlTW9kYWxcbiAgICAgICAgICAgICAgICBleHBvcnRJbWFnZT17dWlTdGF0ZS5leHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgICBtYXBXPXtjb250YWluZXJXfVxuICAgICAgICAgICAgICAgIG1hcEg9e2NvbnRhaW5lckh9XG4gICAgICAgICAgICAgICAgb25VcGRhdGVJbWFnZVNldHRpbmc9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlU2V0dGluZ31cbiAgICAgICAgICAgICAgICBjbGVhbnVwRXhwb3J0SW1hZ2U9e3VpU3RhdGVBY3Rpb25zLmNsZWFudXBFeHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLmV4cG9ydEltYWdlJyxcbiAgICAgICAgICAgICAgY3NzU3R5bGU6ICcnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX29uRXhwb3J0SW1hZ2UsXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246IHtcbiAgICAgICAgICAgICAgICBsYXJnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdWlTdGF0ZS5leHBvcnRJbWFnZS5wcm9jZXNzaW5nLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnbW9kYWwuYnV0dG9uLmRvd25sb2FkJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFWFBPUlRfREFUQV9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8RXhwb3J0RGF0YU1vZGFsXG4gICAgICAgICAgICAgICAgey4uLnVpU3RhdGUuZXhwb3J0RGF0YX1cbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWREYXRhVHlwZXM9e0VYUE9SVF9EQVRBX1RZUEVfT1BUSU9OU31cbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgYXBwbHlDUFVGaWx0ZXI9e3RoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLmFwcGx5Q1BVRmlsdGVyfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX2Nsb3NlTW9kYWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnREYXRhVHlwZT17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0RGF0YVR5cGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnRTZWxlY3RlZERhdGFzZXQ9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydFNlbGVjdGVkRGF0YXNldH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUV4cG9ydEZpbHRlcmVkPXt1aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRGaWx0ZXJlZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLmV4cG9ydERhdGEnLFxuICAgICAgICAgICAgICBjc3NTdHlsZTogJycsXG4gICAgICAgICAgICAgIGZvb3RlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgb25DYW5jZWw6IHRoaXMuX2Nsb3NlTW9kYWwsXG4gICAgICAgICAgICAgIG9uQ29uZmlybTogdGhpcy5fb25FeHBvcnREYXRhLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46ICdtb2RhbC5idXR0b24uZXhwb3J0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFWFBPUlRfTUFQX0lEOlxuICAgICAgICAgICAgY29uc3Qga2VwbGVyR2xDb25maWcgPSB2aXNTdGF0ZS5zY2hlbWEuZ2V0Q29uZmlnVG9TYXZlKHtcbiAgICAgICAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgICAgICAgIHZpc1N0YXRlLFxuICAgICAgICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgICAgICAgdWlTdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPEV4cG9ydE1hcE1vZGFsXG4gICAgICAgICAgICAgICAgY29uZmlnPXtrZXBsZXJHbENvbmZpZ31cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt1aVN0YXRlLmV4cG9ydE1hcH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUV4cG9ydE1hcEZvcm1hdD17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0TWFwRm9ybWF0fVxuICAgICAgICAgICAgICAgIG9uRWRpdFVzZXJNYXBib3hBY2Nlc3NUb2tlbj17dWlTdGF0ZUFjdGlvbnMuc2V0VXNlck1hcGJveEFjY2Vzc1Rva2VufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlRXhwb3J0TWFwSFRNTE1vZGU9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEhUTUxNYXBNb2RlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1vZGFsUHJvcHMgPSB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnbW9kYWwudGl0bGUuZXhwb3J0TWFwJyxcbiAgICAgICAgICAgICAgY3NzU3R5bGU6ICcnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX29uRXhwb3J0TWFwLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46ICdtb2RhbC5idXR0b24uZXhwb3J0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBBRERfTUFQX1NUWUxFX0lEOlxuICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgIDxBZGRNYXBTdHlsZU1vZGFsXG4gICAgICAgICAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW49e3RoaXMucHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW59XG4gICAgICAgICAgICAgICAgbWFwYm94QXBpVXJsPXt0aGlzLnByb3BzLm1hcGJveEFwaVVybH1cbiAgICAgICAgICAgICAgICBtYXBTdGF0ZT17dGhpcy5wcm9wcy5tYXBTdGF0ZX1cbiAgICAgICAgICAgICAgICBpbnB1dFN0eWxlPXttYXBTdHlsZS5pbnB1dFN0eWxlfVxuICAgICAgICAgICAgICAgIGlucHV0TWFwU3R5bGU9e3RoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmlucHV0TWFwU3R5bGV9XG4gICAgICAgICAgICAgICAgbG9hZEN1c3RvbU1hcFN0eWxlPXt0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5sb2FkQ3VzdG9tTWFwU3R5bGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdtb2RhbC50aXRsZS5hZGRDdXN0b21NYXBib3hTdHlsZScsXG4gICAgICAgICAgICAgIGNzc1N0eWxlOiAnJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9vbkFkZEN1c3RvbU1hcFN0eWxlLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFtYXBTdHlsZS5pbnB1dFN0eWxlLnN0eWxlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnbW9kYWwuYnV0dG9uLmFkZFN0eWxlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTQVZFX01BUF9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8U2F2ZU1hcE1vZGFsXG4gICAgICAgICAgICAgICAgey4uLnByb3ZpZGVyU3RhdGV9XG4gICAgICAgICAgICAgICAgZXhwb3J0SW1hZ2U9e3VpU3RhdGUuZXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgICAgbWFwSW5mbz17dmlzU3RhdGUubWFwSW5mb31cbiAgICAgICAgICAgICAgICBvblNldE1hcEluZm89e3Zpc1N0YXRlQWN0aW9ucy5zZXRNYXBJbmZvfVxuICAgICAgICAgICAgICAgIGNsb3VkUHJvdmlkZXJzPXt0aGlzLnByb3ZpZGVyV2l0aFN0b3JhZ2UodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgb25TZXRDbG91ZFByb3ZpZGVyPXt0aGlzLnByb3BzLnByb3ZpZGVyQWN0aW9ucy5zZXRDbG91ZFByb3ZpZGVyfVxuICAgICAgICAgICAgICAgIGNsZWFudXBFeHBvcnRJbWFnZT17dWlTdGF0ZUFjdGlvbnMuY2xlYW51cEV4cG9ydEltYWdlfVxuICAgICAgICAgICAgICAgIG9uVXBkYXRlSW1hZ2VTZXR0aW5nPXt1aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRJbWFnZVNldHRpbmd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdtb2RhbC50aXRsZS5zYXZlTWFwJyxcbiAgICAgICAgICAgICAgY3NzU3R5bGU6ICcnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHRoaXMuX29uU2F2ZU1hcChmYWxzZSksXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246IHtcbiAgICAgICAgICAgICAgICBsYXJnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDpcbiAgICAgICAgICAgICAgICAgIHVpU3RhdGUuZXhwb3J0SW1hZ2UucHJvY2Vzc2luZyB8fFxuICAgICAgICAgICAgICAgICAgIWlzVmFsaWRNYXBJbmZvKHZpc1N0YXRlLm1hcEluZm8pIHx8XG4gICAgICAgICAgICAgICAgICAhcHJvdmlkZXJTdGF0ZS5jdXJyZW50UHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46ICdtb2RhbC5idXR0b24uc2F2ZSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgT1ZFUldSSVRFX01BUF9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8T3ZlcldyaXRlTWFwTW9kYWxcbiAgICAgICAgICAgICAgICB7Li4ucHJvdmlkZXJTdGF0ZX1cbiAgICAgICAgICAgICAgICBjbG91ZFByb3ZpZGVycz17dGhpcy5wcm9wcy5jbG91ZFByb3ZpZGVyc31cbiAgICAgICAgICAgICAgICB0aXRsZT17Z2V0KHZpc1N0YXRlLCBbJ21hcEluZm8nLCAndGl0bGUnXSl9XG4gICAgICAgICAgICAgICAgb25TZXRDbG91ZFByb3ZpZGVyPXt0aGlzLnByb3BzLnByb3ZpZGVyQWN0aW9ucy5zZXRDbG91ZFByb3ZpZGVyfVxuICAgICAgICAgICAgICAgIG9uVXBkYXRlSW1hZ2VTZXR0aW5nPXt1aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRJbWFnZVNldHRpbmd9XG4gICAgICAgICAgICAgICAgY2xlYW51cEV4cG9ydEltYWdlPXt1aVN0YXRlQWN0aW9ucy5jbGVhbnVwRXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdPdmVyd3JpdGUgRXhpc3RpbmcgRmlsZT8nLFxuICAgICAgICAgICAgICBjc3NTdHlsZTogc21hbGxNb2RhbENzcyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX29uT3ZlcndyaXRlTWFwLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGxhcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnWWVzJyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDpcbiAgICAgICAgICAgICAgICAgIHVpU3RhdGUuZXhwb3J0SW1hZ2UucHJvY2Vzc2luZyB8fFxuICAgICAgICAgICAgICAgICAgIWlzVmFsaWRNYXBJbmZvKHZpc1N0YXRlLm1hcEluZm8pIHx8XG4gICAgICAgICAgICAgICAgICAhcHJvdmlkZXJTdGF0ZS5jdXJyZW50UHJvdmlkZXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgU0hBUkVfTUFQX0lEOlxuICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgIDxTaGFyZU1hcE1vZGFsXG4gICAgICAgICAgICAgICAgey4uLnByb3ZpZGVyU3RhdGV9XG4gICAgICAgICAgICAgICAgaXNSZWFkeT17IXVpU3RhdGUuZXhwb3J0SW1hZ2UucHJvY2Vzc2luZ31cbiAgICAgICAgICAgICAgICBjbG91ZFByb3ZpZGVycz17dGhpcy5wcm92aWRlcldpdGhTaGFyZSh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgICAgICBvbkV4cG9ydD17dGhpcy5fb25TaGFyZU1hcFVybH1cbiAgICAgICAgICAgICAgICBvblNldENsb3VkUHJvdmlkZXI9e3RoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLnNldENsb3VkUHJvdmlkZXJ9XG4gICAgICAgICAgICAgICAgY2xlYW51cEV4cG9ydEltYWdlPXt1aVN0YXRlQWN0aW9ucy5jbGVhbnVwRXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgICAgb25VcGRhdGVJbWFnZVNldHRpbmc9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlU2V0dGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLnNoYXJlVVJMJyxcbiAgICAgICAgICAgICAgY3NzU3R5bGU6ICcnLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fb25DbG9zZVNhdmVNYXBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm9vdE5vZGUgPyAoXG4gICAgICAgIDxNb2RhbERpYWxvZ1xuICAgICAgICAgIHBhcmVudFNlbGVjdG9yPXsoKSA9PiBmaW5kRE9NTm9kZShyb290Tm9kZSl9XG4gICAgICAgICAgaXNPcGVuPXtCb29sZWFuKGN1cnJlbnRNb2RhbCl9XG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuX2Nsb3NlTW9kYWx9XG4gICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgY3NzU3R5bGU9e0RlZmF1bHRTdHlsZS5jb25jYXQobW9kYWxQcm9wcy5jc3NTdHlsZSl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGVtcGxhdGV9XG4gICAgICAgIDwvTW9kYWxEaWFsb2c+XG4gICAgICApIDogbnVsbDtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG4gIH1cblxuICByZXR1cm4gTW9kYWxDb250YWluZXI7XG59XG4iXX0=