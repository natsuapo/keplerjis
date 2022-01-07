"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStateWithLayerAndData = updateStateWithLayerAndData;
exports.updateStateOnLayerVisibilityChange = updateStateOnLayerVisibilityChange;
exports.layerConfigChangeUpdater = layerConfigChangeUpdater;
exports.layerTextLabelChangeUpdater = layerTextLabelChangeUpdater;
exports.layerDataIdChangeUpdater = layerDataIdChangeUpdater;
exports.layerTypeChangeUpdater = layerTypeChangeUpdater;
exports.layerVisualChannelChangeUpdater = layerVisualChannelChangeUpdater;
exports.layerVisConfigChangeUpdater = layerVisConfigChangeUpdater;
exports.setProcessorUpdater = setProcessorUpdater;
exports.runProcessorUpdater = runProcessorUpdater;
exports.runProcessorBatchUpdater = runProcessorBatchUpdater;
exports.rerenderWithDataset = rerenderWithDataset;
exports.setFilterAnimationTimeUpdater = setFilterAnimationTimeUpdater;
exports.setFilterAnimationWindowUpdater = setFilterAnimationWindowUpdater;
exports.setFilterUpdater = setFilterUpdater;
exports.interactionConfigChangeUpdater = interactionConfigChangeUpdater;
exports.renameDatasetUpdater = renameDatasetUpdater;
exports.loadFileStepSuccessUpdater = loadFileStepSuccessUpdater;
exports.loadNextFileUpdater = loadNextFileUpdater;
exports.makeLoadFileTask = makeLoadFileTask;
exports.processFileContentUpdater = processFileContentUpdater;
exports.parseProgress = parseProgress;
exports.addDefaultLayers = addDefaultLayers;
exports.addDefaultTooltips = addDefaultTooltips;
exports.initialFileLoadingProgress = initialFileLoadingProgress;
exports.updateFileLoadingProgressUpdater = updateFileLoadingProgressUpdater;
exports.updateAllLayerDomainData = updateAllLayerDomainData;
exports.updateAnimationDomain = updateAnimationDomain;
exports.setFeaturesUpdater = setFeaturesUpdater;
exports.deleteFeatureUpdater = deleteFeatureUpdater;
exports.setPolygonFilterLayerUpdater = setPolygonFilterLayerUpdater;
exports.sortTableColumnUpdater = sortTableColumnUpdater;
exports.pinTableColumnUpdater = pinTableColumnUpdater;
exports.copyTableColumnUpdater = copyTableColumnUpdater;
exports.deleteTableColumnUpdater = deleteTableColumnUpdater;
exports.addTableColumnUpdater = addTableColumnUpdater;
exports.GMTModifyTableColumnUpdater = GMTModifyTableColumnUpdater;
exports.removeProcessorUpdater = removeProcessorUpdater;
exports.activateProcessorUpdater = activateProcessorUpdater;
exports.updateTableColumnUpdater = updateTableColumnUpdater;
exports.toggleEditorVisibilityUpdater = toggleEditorVisibilityUpdater;
exports.setFilterAnimationTimeConfigUpdater = setFilterAnimationTimeConfigUpdater;
exports.setLayerAnimationTimeConfigUpdater = setLayerAnimationTimeConfigUpdater;
exports.setSelectedFeatureUpdater = exports.setEditorModeUpdater = exports.setMapInfoUpdater = exports.applyCPUFilterUpdater = exports.loadFilesErrUpdater = exports.nextFileBatchUpdater = exports.loadFilesUpdater = exports.updateVisDataUpdater = exports.toggleLayerForMapUpdater = exports.toggleSplitMapUpdater = exports.mouseMoveUpdater = exports.mapClickUpdater = exports.layerClickUpdater = exports.layerHoverUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigUpdater = exports.showDatasetTableUpdater = exports.updateLayerBlendingUpdater = exports.removeDatasetUpdater = exports.reorderLayerUpdater = exports.duplicateLayerUpdater = exports.removeLayerUpdater = exports.addLayerUpdater = exports.removeFilterUpdater = exports.toggleFilterFeatureUpdater = exports.enlargeFilterUpdater = exports.updateLayerAnimationSpeedUpdater = exports.setLayerAnimationTimeUpdater = exports.updateFilterAnimationSpeedUpdater = exports.toggleLayerAnimationControlUpdater = exports.toggleLayerAnimationUpdater = exports.toggleFilterAnimationUpdater = exports.layerColorUIChangeUpdater = exports.addFilterUpdater = exports.setFilterPlotUpdater = exports.INITIAL_VIS_STATE = exports.DEFAULT_EDITOR = exports.DEFAULT_ANIMATION_CONFIG = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _tasks = require("react-palm/tasks");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lodash2 = _interopRequireDefault(require("lodash.uniq"));

var _lodash3 = _interopRequireDefault(require("lodash.get"));

var _lodash4 = _interopRequireDefault(require("lodash.xor"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _dataUtils = require("../utils/data-utils");

var _tasks2 = require("../tasks/tasks");

var _visStateActions = require("../actions/vis-state-actions");

var _interactionUtils = require("../utils/interaction-utils");

var _filterUtils = require("../utils/filter-utils");

var _processorUtils = require("../utils/processor-utils");

var _gpuFilterUtils = require("../utils/gpu-filter-utils");

var _datasetUtils = require("../utils/dataset-utils");

var _keplerTable = require("../utils/table-utils/kepler-table");

var _utils = require("../utils/utils");

var _layerUtils = require("../utils/layer-utils");

var _visStateMerger = require("./vis-state-merger");

var _splitMapUtils = require("../utils/split-map-utils");

var _layers = require("../layers");

var _layerFactory = require("../layers/layer-factory");

var _defaultSettings = require("../constants/default-settings");

var _composerHelpers = require("./composer-helpers");

var _schemas = _interopRequireDefault(require("../schemas"));

var _datasetExtensionUtils = require("../utils/dataset-extension-utils");

var _lodash5 = _interopRequireDefault(require("lodash"));

var _dataframeJs = require("dataframe-js");

var _exportUtils = require("../utils/export-utils");

var _googleUtils = require("../utils/google-utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// type imports

/** @typedef {import('./vis-state-updaters').Field} Field */

/** @typedef {import('./vis-state-updaters').Filter} Filter */

/** @typedef {import('./vis-state-updaters').KeplerTable} KeplerTable */

/** @typedef {import('./vis-state-updaters').VisState} VisState */

/** @typedef {import('./vis-state-updaters').Datasets} Datasets */

/** @typedef {import('./vis-state-updaters').AnimationConfig} AnimationConfig */

/** @typedef {import('./vis-state-updaters').Editor} Editor */
// react-palm
// disable capture exception for react-palm call to withTask
(0, _tasks.disableStackCapturing)();
/**
 * Updaters for `visState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 *
 * @public
 * @example
 *
 * import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             visState: visStateUpdaters.enlargeFilterUpdater(
 *               state.keplerGl.foo.visState,
 *               {idx: 0}
 *             )
 *          }
 *        }
 *      };
 *  }
 *  return reducers(state, action);
 * };
 *
 * export default composedReducer;
 */

/* eslint-disable no-unused-vars */
// @ts-ignore

var visStateUpdaters = null;
/* eslint-enable no-unused-vars */

/** @type {AnimationConfig} */

var DEFAULT_ANIMATION_CONFIG = {
  domain: null,
  currentTime: null,
  speed: 1,
  isAnimating: false,
  timeFormat: null,
  timezone: null,
  defaultTimeFormat: null
};
/** @type {Editor} */

exports.DEFAULT_ANIMATION_CONFIG = DEFAULT_ANIMATION_CONFIG;
var DEFAULT_EDITOR = {
  mode: _defaultSettings.EDITOR_MODES.DRAW_POLYGON,
  features: [],
  selectedFeature: null,
  visible: true
};
/**
 * Default initial `visState`
 * @memberof visStateUpdaters
 * @constant
 * @type {VisState}
 * @public
 */

exports.DEFAULT_EDITOR = DEFAULT_EDITOR;
var INITIAL_VIS_STATE = {
  // map info
  mapInfo: {
    title: '',
    description: ''
  },
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],
  // filters
  filters: [],
  filterToBeMerged: [],
  // a collection of multiple dataset
  datasets: {},
  editingDataset: undefined,
  //processor
  processor: undefined,
  interactionConfig: (0, _interactionUtils.getDefaultInteraction)(),
  interactionToBeMerged: undefined,
  layerBlending: 'normal',
  hoverInfo: undefined,
  clicked: undefined,
  mousePos: {},
  // this is used when user split maps
  splitMaps: [// this will contain a list of objects to
    // describe the state of layer availability and visibility for each map
    // [
    //   {
    //      layers: {layer_id: true | false}
    //   }
    // ]
  ],
  splitMapsToBeMerged: [],
  // defaults layer classes
  layerClasses: _layers.LayerClasses,
  // default animation
  // time in unix timestamp (milliseconds) (the number of seconds since the Unix Epoch)
  animationConfig: DEFAULT_ANIMATION_CONFIG,
  editor: DEFAULT_EDITOR,
  fileLoading: false,
  fileLoadingProgress: {},
  loaders: [],
  loadOptions: {},
  // visStateMergers
  mergers: _visStateMerger.VIS_STATE_MERGERS,
  // kepler schemas
  schema: _schemas["default"]
};
/**
 * Update state with updated layer and layerData
 * @type {typeof import('./vis-state-updaters').updateStateWithLayerAndData}
 *
 */

exports.INITIAL_VIS_STATE = INITIAL_VIS_STATE;

function updateStateWithLayerAndData(state, _ref) {
  var layerData = _ref.layerData,
      layer = _ref.layer,
      idx = _ref.idx;
  return _objectSpread(_objectSpread({}, state), {}, {
    layers: state.layers.map(function (lyr, i) {
      return i === idx ? layer : lyr;
    }),
    layerData: layerData ? state.layerData.map(function (d, i) {
      return i === idx ? layerData : d;
    }) : state.layerData
  });
}

function updateStateOnLayerVisibilityChange(state, layer) {
  var newState = state;

  if (state.splitMaps.length) {
    newState = _objectSpread(_objectSpread({}, state), {}, {
      splitMaps: layer.config.isVisible ? (0, _splitMapUtils.addNewLayersToSplitMap)(state.splitMaps, layer) : (0, _splitMapUtils.removeLayerFromSplitMaps)(state.splitMaps, layer)
    });
  }

  if (layer.config.animation.enabled) {
    newState = updateAnimationDomain(state);
  }

  return newState;
}
/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerConfigChangeUpdater}
 * @returns nextState
 */


function layerConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newConfig);

  if (typeof action.newConfig.dataId === 'string') {
    var _action$newConfig = action.newConfig,
        dataId = _action$newConfig.dataId,
        restConfig = (0, _objectWithoutProperties2["default"])(_action$newConfig, ["dataId"]);
    var stateWithDataId = layerDataIdChangeUpdater(state, {
      oldLayer: oldLayer,
      newConfig: {
        dataId: dataId
      }
    });
    var nextLayer = stateWithDataId.layers.find(function (l) {
      return l.id === oldLayer.id;
    });
    return nextLayer && Object.keys(restConfig).length ? layerConfigChangeUpdater(stateWithDataId, {
      oldLayer: nextLayer,
      newConfig: restConfig
    }) : stateWithDataId;
  }

  var newLayer = oldLayer.updateLayerConfig(action.newConfig);
  var layerData; // let newLayer;

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];
    var updateLayerDataResult = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData);
    layerData = updateLayerDataResult.layerData;
    newLayer = updateLayerDataResult.layer;
  }

  var newState = state;

  if ('isVisible' in action.newConfig) {
    newState = updateStateOnLayerVisibilityChange(state, newLayer);
  }

  return updateStateWithLayerAndData(newState, {
    layer: newLayer,
    layerData: layerData,
    idx: idx
  });
}

function addOrRemoveTextLabels(newFields, textLabel) {
  var newTextLabel = textLabel.slice();
  var currentFields = textLabel.map(function (tl) {
    return tl.field && tl.field.name;
  }).filter(function (d) {
    return d;
  });
  var addFields = newFields.filter(function (f) {
    return !currentFields.includes(f.name);
  });
  var deleteFields = currentFields.filter(function (f) {
    return !newFields.find(function (fd) {
      return fd.name === f;
    });
  }); // delete

  newTextLabel = newTextLabel.filter(function (tl) {
    return tl.field && !deleteFields.includes(tl.field.name);
  });
  newTextLabel = !newTextLabel.length ? [_layerFactory.DEFAULT_TEXT_LABEL] : newTextLabel; // add

  newTextLabel = [].concat((0, _toConsumableArray2["default"])(newTextLabel.filter(function (tl) {
    return tl.field;
  })), (0, _toConsumableArray2["default"])(addFields.map(function (af) {
    return _objectSpread(_objectSpread({}, _layerFactory.DEFAULT_TEXT_LABEL), {}, {
      field: af
    });
  })));
  return newTextLabel;
}

function updateTextLabelPropAndValue(idx, prop, value, textLabel) {
  if (!textLabel[idx].hasOwnProperty(prop)) {
    return textLabel;
  }

  var newTextLabel = textLabel.slice();

  if (prop && (value || textLabel.length === 1)) {
    newTextLabel = textLabel.map(function (tl, i) {
      return i === idx ? _objectSpread(_objectSpread({}, tl), {}, (0, _defineProperty2["default"])({}, prop, value)) : tl;
    });
  } else if (prop === 'field' && value === null && textLabel.length > 1) {
    // remove label when field value is set to null
    newTextLabel.splice(idx, 1);
  }

  return newTextLabel;
}
/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerTextLabelChangeUpdater}
 * @returns nextState
 */


function layerTextLabelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      idx = action.idx,
      prop = action.prop,
      value = action.value;
  var textLabel = oldLayer.config.textLabel;
  var newTextLabel = textLabel.slice();

  if (!textLabel[idx] && idx === textLabel.length) {
    // if idx is set to length, add empty text label
    newTextLabel = [].concat((0, _toConsumableArray2["default"])(textLabel), [_layerFactory.DEFAULT_TEXT_LABEL]);
  }

  if (idx === 'all' && prop === 'fields') {
    newTextLabel = addOrRemoveTextLabels(value, textLabel);
  } else {
    newTextLabel = updateTextLabelPropAndValue(idx, prop, value, newTextLabel);
  } // update text label prop and value


  return layerConfigChangeUpdater(state, {
    oldLayer: oldLayer,
    newConfig: {
      textLabel: newTextLabel
    }
  });
}

function validateExistingLayerWithData(dataset, layerClasses, layer) {
  var loadedLayer = (0, _visStateMerger.serializeLayer)(layer);
  return (0, _visStateMerger.validateLayerWithData)(dataset, loadedLayer, layerClasses, {
    allowEmptyColumn: true
  });
}
/**
 * Update layer config dataId
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerDataIdChangeUpdater}
 * @returns nextState
 */


function layerDataIdChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig;
  var dataId = newConfig.dataId;

  if (!oldLayer || !state.datasets[dataId]) {
    return state;
  }

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig({
    dataId: dataId
  }); // this may happen when a layer is new (type: null and no columns) but it's not ready to be saved

  if (newLayer.isValidToSave()) {
    var validated = validateExistingLayerWithData(state.datasets[dataId], state.layerClasses, newLayer); // if cant validate it with data create a new one

    if (!validated) {
      newLayer = new state.layerClasses[oldLayer.type]({
        dataId: dataId,
        id: oldLayer.id
      });
    } else {
      newLayer = validated;
    }
  }

  newLayer = newLayer.updateLayerConfig({
    isVisible: oldLayer.config.isVisible,
    isConfigActive: true
  });
  newLayer.updateLayerDomain(state.datasets);

  var _calculateLayerData = (0, _layerUtils.calculateLayerData)(newLayer, state, undefined),
      layerData = _calculateLayerData.layerData,
      layer = _calculateLayerData.layer;

  return updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer type. Previews layer config will be copied if applicable.
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerTypeChangeUpdater}
 * @public
 */


function layerTypeChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newType = action.newType;

  if (!oldLayer) {
    return state;
  }

  var oldId = oldLayer.id;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldId;
  });

  if (!state.layerClasses[newType]) {
    Console.error("".concat(newType, " is not a valid layer type"));
    return state;
  } // get a mint layer, with new id and type
  // because deck.gl uses id to match between new and old layer.
  // If type has changed but id is the same, it will break


  var newLayer = new state.layerClasses[newType]();
  newLayer.assignConfigToLayer(oldLayer.config, oldLayer.visConfigSettings);
  newLayer.updateLayerDomain(state.datasets);

  var _calculateLayerData2 = (0, _layerUtils.calculateLayerData)(newLayer, state),
      layerData = _calculateLayerData2.layerData,
      layer = _calculateLayerData2.layer;

  var newState = updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });

  if (layer.config.animation.enabled || oldLayer.config.animation.enabled) {
    newState = updateAnimationDomain(newState);
  } // update splitMap layer id


  if (state.splitMaps.length) {
    newState = _objectSpread(_objectSpread({}, newState), {}, {
      splitMaps: newState.splitMaps.map(function (settings) {
        var _settings$layers = settings.layers,
            oldLayerMap = _settings$layers[oldId],
            otherLayers = (0, _objectWithoutProperties2["default"])(_settings$layers, [oldId].map(_toPropertyKey));
        return oldId in settings.layers ? _objectSpread(_objectSpread({}, settings), {}, {
          layers: _objectSpread(_objectSpread({}, otherLayers), {}, (0, _defineProperty2["default"])({}, layer.id, oldLayerMap))
        }) : settings;
      })
    });
  }

  return newState;
}
/**
 * Update layer visual channel
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerVisualChannelChangeUpdater}
 * @returns {Object} nextState
 * @public
 */


function layerVisualChannelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig,
      channel = action.channel;

  if (!oldLayer.config.dataId) {
    return state;
  }

  var dataset = state.datasets[oldLayer.config.dataId];
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig(newConfig);
  newLayer.updateLayerVisualChannel(dataset, channel);
  var oldLayerData = state.layerData[idx];

  var _calculateLayerData3 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData),
      layerData = _calculateLayerData3.layerData,
      layer = _calculateLayerData3.layer;

  return updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer `visConfig`
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerVisConfigChangeUpdater}
 * @public
 */


function layerVisConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newVisConfig);

  var newVisConfig = _objectSpread(_objectSpread({}, oldLayer.config.visConfig), action.newVisConfig);

  var newLayer = oldLayer.updateLayerConfig({
    visConfig: newVisConfig
  });

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData4 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData),
        layerData = _calculateLayerData4.layerData,
        layer = _calculateLayerData4.layer;

    return updateStateWithLayerAndData(state, {
      layerData: layerData,
      layer: layer,
      idx: idx
    });
  }

  return updateStateWithLayerAndData(state, {
    layer: newLayer,
    idx: idx
  });
} //difference with processor and filter: processor only need to rerender once;
//several processors: geometry processor, column processor: geometry processor: change based


function setProcessorUpdater(state, action) {
  console.log('set processor example');
  var prop = action.prop,
      value = action.value,
      _action$valueIndex = action.valueIndex,
      valueIndex = _action$valueIndex === void 0 ? 0 : _action$valueIndex; // state.currentProcrssor[idx]

  var oldProcessor = state.processor;
  var newProcessor = (0, _utils.set)([prop], value, oldProcessor ? oldProcessor : _processorUtils.DEFAULT_PROCESSOR_STRUCTURE);
  var newState = state;
  var _newProcessor = newProcessor,
      dataId = _newProcessor.dataId;

  switch (prop) {
    case _processorUtils.PROCESSOR_UPDATER_PROPS.dataId:
      // if trying to update filter dataId. create an empty new filter
      newProcessor = (0, _processorUtils.updateProcessorDataId)(dataId);
      break;
    // case PROCESSOR_UPDATER_PROPS.pair:
    //   newProcessor = updateProcessorDataId();
  }

  newState = (0, _utils.set)(['processor'], newProcessor, newState);
  return newState;
} // export function removeProcessorUpdater(state){
//   return set(['processor'], null, state);
// }
//


function runProcessorUpdater(state, visStateAction) {
  console.log('run processor updater here');
  var _state = state,
      processor = _state.processor,
      datasets = _state.datasets;
  var dataId = processor.dataId,
      id = processor.id,
      name = processor.name;

  if (dataId && id && name) {
    //output should include
    var _execute_processor = (0, _processorUtils.execute_processor)(datasets, processor),
        dataset = _execute_processor.dataset,
        flag = _execute_processor.flag;

    if (flag === 1) {
      // let newState = set(['processor',flag],false,state)
      // visStateAction.visStateAction.removeProcessor(true)
      return (0, _utils.set)(['datasets', dataId], dataset, removeProcessorUpdater(state, true));
    }

    if (flag === 2) {
      //here call another task
      processor.attrs = _objectSpread(_objectSpread({}, processor.attrs), {
        dataId: dataId
      });
      var tasks = (0, _processorUtils.execute_processor_tasks)(datasets, processor, visStateAction); //here with task only include data change?

      return (0, _tasks.withTask)(state, tasks);
    }

    if (flag === 0) {
      console.log('datasets example');
      state = (0, _utils.set)(['datasets'], dataset, removeProcessorUpdater(state, true, 1));
      return processor.attrs.replace ? rerenderWithDataset(state, dataset[dataId]) : updateVisDataUpdater(state, {
        datasets: {
          'merged': dataset['merged']
        },
        rerender: true
      });
    }
  }

  return state;
} //finished: downloading export files, if not finished, strategy: running temporal processing at first, then running spatial processing


function runProcessorBatchUpdater(state, visStateAction) {
  var _state2 = state,
      processor = _state2.processor,
      datasets = _state2.datasets;
  var batch = processor.batch;

  var new_datasets = _lodash5["default"].cloneDeep(datasets);

  var oddataID = batch.oddataID,
      gpsdataID = batch.gpsdataID,
      poidataID = batch.poidataID,
      spatialFilter = batch.spatialFilter,
      temporalFilter = batch.temporalFilter,
      apikey = batch.apikey,
      exportSetting = batch.exportSetting;
  console.log('run processor batch updater');

  var _batch_processing_tas = (0, _processorUtils.batch_processing_task)(new_datasets, batch, visStateAction),
      result = _batch_processing_tas.result,
      flag = _batch_processing_tas.flag;

  if (flag === 1) {
    //here chnge to reduce
    try {
      state = [batch.oddataID, batch.gpsdataID, batch.poidataID].reduce(function (st, id) {
        return id ? rerenderWithDataset(st, new_datasets[id]) : st;
      }, state);
      (0, _googleUtils.CompressExportData)(state, {
        selectedDataset: '',
        dataType: 'CSV',
        filtered: false
      }, true);
      return removeProcessorUpdater(state, true, 0);
    } catch (e) {
      removeProcessorUpdater(state, false, 0);
    }
  } else {
    return (0, _tasks.withTask)(state, result);
  } //这里的问题是layer？

}

function rerenderWithDataset(state, newDataSet) {
  state = removeDatasetUpdater(state, {
    dataId: newDataSet.id
  });
  state = (0, _utils.set)(['datasets', newDataSet.id], newDataSet, state);
  return updateVisDataUpdater(state, {
    datasets: (0, _defineProperty2["default"])({}, newDataSet.id, newDataSet),
    rerender: true
  });
}
/**
 * Update filter property
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterAnimationTimeUpdater}
 * @public
 */


function setFilterAnimationTimeUpdater(state, action) {
  return setFilterUpdater(state, action);
}
/**
 * Update filter animation window
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterAnimationWindowUpdater}
 * @public
 */


function setFilterAnimationWindowUpdater(state, _ref2) {
  var id = _ref2.id,
      animationWindow = _ref2.animationWindow;
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f) {
      return f.id === id ? _objectSpread(_objectSpread({}, f), {}, {
        animationWindow: animationWindow
      }) : f;
    })
  });
}
/**
 * Update filter property
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterUpdater}
 * @public
 */


function setFilterUpdater(state, action) {
  var idx = action.idx,
      prop = action.prop,
      value = action.value,
      _action$valueIndex2 = action.valueIndex,
      valueIndex = _action$valueIndex2 === void 0 ? 0 : _action$valueIndex2;
  var oldFilter = state.filters[idx];
  console.log('setFilterUpdater here');

  if (!oldFilter) {
    Console.error("filters.".concat(idx, " is undefined"));
    return state;
  }

  var newFilter = (0, _utils.set)([prop], value, oldFilter);
  var newState = state;
  var _newFilter = newFilter,
      dataId = _newFilter.dataId; // Ensuring backward compatibility

  var datasetIds = (0, _utils.toArray)(dataId);

  switch (prop) {
    // TODO: Next PR for UI if we update dataId, we need to consider two cases:
    // 1. dataId is empty: create a default filter
    // 2. Add a new dataset id
    case _filterUtils.FILTER_UPDATER_PROPS.dataId:
      // if trying to update filter dataId. create an empty new filter
      newFilter = (0, _filterUtils.updateFilterDataId)(dataId);
      break;

    case _filterUtils.FILTER_UPDATER_PROPS.name:
      // we are supporting the current functionality
      // TODO: Next PR for UI filter name will only update filter name but it won't have side effects
      // we are gonna use pair of datasets and fieldIdx to update the filter
      var datasetId = newFilter.dataId[valueIndex];

      var _applyFilterFieldName = (0, _filterUtils.applyFilterFieldName)(newFilter, state.datasets[datasetId], value, valueIndex, {
        mergeDomain: false
      }),
          updatedFilter = _applyFilterFieldName.filter,
          newDataset = _applyFilterFieldName.dataset;

      if (!updatedFilter) {
        return state;
      }

      newFilter = updatedFilter;

      if (newFilter.gpu) {
        newFilter = (0, _gpuFilterUtils.setFilterGpuMode)(newFilter, state.filters);
        newFilter = (0, _gpuFilterUtils.assignGpuChannel)(newFilter, state.filters);
      }

      newState = (0, _utils.set)(['datasets', datasetId], newDataset, state); // only filter the current dataset

      break;

    case _filterUtils.FILTER_UPDATER_PROPS.layerId:
      // We need to update only datasetId/s if we have added/removed layers
      // - check for layerId changes (XOR works because of string values)
      // if no differences between layerIds, don't do any filtering
      // @ts-ignore
      var layerIdDifference = (0, _lodash4["default"])(newFilter.layerId, oldFilter.layerId);
      var layerDataIds = (0, _lodash2["default"])(layerIdDifference.map(function (lid) {
        return (0, _lodash3["default"])(state.layers.find(function (l) {
          return l.id === lid;
        }), ['config', 'dataId']);
      }).filter(function (d) {
        return d;
      })); // only filter datasetsIds

      datasetIds = layerDataIds; // Update newFilter dataIds

      var newDataIds = (0, _lodash2["default"])(newFilter.layerId.map(function (lid) {
        return (0, _lodash3["default"])(state.layers.find(function (l) {
          return l.id === lid;
        }), ['config', 'dataId']);
      }).filter(function (d) {
        return d;
      }));
      newFilter = _objectSpread(_objectSpread({}, newFilter), {}, {
        dataId: newDataIds
      });
      break;

    default:
      break;
  }

  var enlargedFilter = state.filters.find(function (f) {
    return f.enlarged;
  });

  if (enlargedFilter && enlargedFilter.id !== newFilter.id) {
    // there should be only one enlarged filter
    newFilter.enlarged = false;
  } // save new filters to newState


  newState = (0, _utils.set)(['filters', idx], newFilter, newState); // if we are currently setting a prop that only requires to filter the current
  // dataset we will pass only the current dataset to applyFiltersToDatasets and
  // updateAllLayerDomainData otherwise we pass the all list of datasets as defined in dataId

  var datasetIdsToFilter = _filterUtils.LIMITED_FILTER_EFFECT_PROPS[prop] ? [datasetIds[valueIndex]] : datasetIds; // filter data

  var filteredDatasets = (0, _filterUtils.applyFiltersToDatasets)(datasetIdsToFilter, newState.datasets, newState.filters, newState.layers);
  newState = (0, _utils.set)(['datasets'], filteredDatasets, newState); // dataId is an array
  // pass only the dataset we need to update

  newState = updateAllLayerDomainData(newState, datasetIdsToFilter, newFilter);
  return newState;
}
/**
 * Set the property of a filter plot
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFilterPlotUpdater}
 * @public
 */


var setFilterPlotUpdater = function setFilterPlotUpdater(state, _ref3) {
  var idx = _ref3.idx,
      newProp = _ref3.newProp,
      _ref3$valueIndex = _ref3.valueIndex,
      valueIndex = _ref3$valueIndex === void 0 ? 0 : _ref3$valueIndex;

  var newFilter = _objectSpread(_objectSpread({}, state.filters[idx]), newProp);

  var prop = Object.keys(newProp)[0];

  if (prop === 'yAxis') {
    var plotType = (0, _filterUtils.getDefaultFilterPlotType)(newFilter); // TODO: plot is not supported in multi dataset filter for now

    if (plotType) {
      newFilter = _objectSpread(_objectSpread(_objectSpread({}, newFilter), (0, _filterUtils.getFilterPlot)(_objectSpread(_objectSpread({}, newFilter), {}, {
        plotType: plotType
      }), state.datasets[newFilter.dataId[valueIndex]])), {}, {
        plotType: plotType
      });
    }
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });
};
/**
 * Add a new filter
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').addFilterUpdater}
 * @public
 */


exports.setFilterPlotUpdater = setFilterPlotUpdater;

var addFilterUpdater = function addFilterUpdater(state, action) {
  return !action.dataId ? state : _objectSpread(_objectSpread({}, state), {}, {
    filters: [].concat((0, _toConsumableArray2["default"])(state.filters), [(0, _filterUtils.getDefaultFilter)(action.dataId)])
  });
};
/**
 * Set layer color palette ui state
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerColorUIChangeUpdater}
 */


exports.addFilterUpdater = addFilterUpdater;

var layerColorUIChangeUpdater = function layerColorUIChangeUpdater(state, _ref4) {
  var oldLayer = _ref4.oldLayer,
      prop = _ref4.prop,
      newConfig = _ref4.newConfig;
  var oldVixConfig = oldLayer.config.visConfig[prop];
  var newLayer = oldLayer.updateLayerColorUI(prop, newConfig);
  var newVisConfig = newLayer.config.visConfig[prop];

  if (oldVixConfig !== newVisConfig) {
    return layerVisConfigChangeUpdater(state, {
      oldLayer: oldLayer,
      newVisConfig: (0, _defineProperty2["default"])({}, prop, newVisConfig)
    });
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    layers: state.layers.map(function (l) {
      return l.id === oldLayer.id ? newLayer : l;
    })
  });
};
/**
 * Start and end filter animation
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleFilterAnimationUpdater}
 * @public
 */


exports.layerColorUIChangeUpdater = layerColorUIChangeUpdater;

var toggleFilterAnimationUpdater = function toggleFilterAnimationUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? _objectSpread(_objectSpread({}, f), {}, {
        isAnimating: !f.isAnimating
      }) : f;
    })
  });
};
/**
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleLayerAnimationUpdater}
 * @public
 */


exports.toggleFilterAnimationUpdater = toggleFilterAnimationUpdater;

var toggleLayerAnimationUpdater = function toggleLayerAnimationUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      isAnimating: !state.animationConfig.isAnimating
    })
  });
};
/**
 * Hide and show layer animation control
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleLayerAnimationControlUpdater}
 * @public
 */


exports.toggleLayerAnimationUpdater = toggleLayerAnimationUpdater;

var toggleLayerAnimationControlUpdater = function toggleLayerAnimationControlUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      hideControl: !state.animationConfig.hideControl
    })
  });
};
/**
 * Change filter animation speed
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateFilterAnimationSpeedUpdater}
 * @public
 */


exports.toggleLayerAnimationControlUpdater = toggleLayerAnimationControlUpdater;

var updateFilterAnimationSpeedUpdater = function updateFilterAnimationSpeedUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? _objectSpread(_objectSpread({}, f), {}, {
        speed: action.speed
      }) : f;
    })
  });
};
/**
 * Reset animation config current time to a specified value
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setLayerAnimationTimeUpdater}
 * @public
 *
 */


exports.updateFilterAnimationSpeedUpdater = updateFilterAnimationSpeedUpdater;

var setLayerAnimationTimeUpdater = function setLayerAnimationTimeUpdater(state, _ref5) {
  var value = _ref5.value;
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      currentTime: value
    })
  });
};
/**
 * Update animation speed with the vertical speed slider
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateLayerAnimationSpeedUpdater}
 * @public
 *
 */


exports.setLayerAnimationTimeUpdater = setLayerAnimationTimeUpdater;

var updateLayerAnimationSpeedUpdater = function updateLayerAnimationSpeedUpdater(state, _ref6) {
  var speed = _ref6.speed;
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      speed: speed
    })
  });
};
/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').enlargeFilterUpdater}
 * @public
 */


exports.updateLayerAnimationSpeedUpdater = updateLayerAnimationSpeedUpdater;

var enlargeFilterUpdater = function enlargeFilterUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? _objectSpread(_objectSpread({}, f), {}, {
        enlarged: !f.enlarged
      }) : f;
    })
  });
};
/**
 * Toggles filter feature visibility
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleFilterFeatureUpdater}
 */


exports.enlargeFilterUpdater = enlargeFilterUpdater;

var toggleFilterFeatureUpdater = function toggleFilterFeatureUpdater(state, action) {
  var filter = state.filters[action.idx];
  var isVisible = (0, _lodash3["default"])(filter, ['value', 'properties', 'isVisible']);

  var newFilter = _objectSpread(_objectSpread({}, filter), {}, {
    value: (0, _filterUtils.featureToFilterValue)(filter.value, filter.id, {
      isVisible: !isVisible
    })
  });

  return _objectSpread(_objectSpread({}, state), {}, {
    filters: Object.assign((0, _toConsumableArray2["default"])(state.filters), (0, _defineProperty2["default"])({}, action.idx, newFilter))
  });
};
/**
 * Remove a filter
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').removeFilterUpdater}
 * @public
 */


exports.toggleFilterFeatureUpdater = toggleFilterFeatureUpdater;

var removeFilterUpdater = function removeFilterUpdater(state, action) {
  var idx = action.idx;
  var _state$filters$idx = state.filters[idx],
      dataId = _state$filters$idx.dataId,
      id = _state$filters$idx.id;
  var newFilters = [].concat((0, _toConsumableArray2["default"])(state.filters.slice(0, idx)), (0, _toConsumableArray2["default"])(state.filters.slice(idx + 1, state.filters.length)));
  var filteredDatasets = (0, _filterUtils.applyFiltersToDatasets)(dataId, state.datasets, newFilters, state.layers);
  var newEditor = (0, _filterUtils.getFilterIdInFeature)(state.editor.selectedFeature) === id ? _objectSpread(_objectSpread({}, state.editor), {}, {
    selectedFeature: null
  }) : state.editor;
  var newState = (0, _utils.set)(['filters'], newFilters, state);
  newState = (0, _utils.set)(['datasets'], filteredDatasets, newState);
  newState = (0, _utils.set)(['editor'], newEditor, newState);
  return updateAllLayerDomainData(newState, dataId, undefined);
};
/**
 * Add a new layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').addLayerUpdater}
 * @public
 */


exports.removeFilterUpdater = removeFilterUpdater;

var addLayerUpdater = function addLayerUpdater(state, action) {
  var newLayer;
  var newLayerData;

  if (action.config) {
    newLayer = (0, _visStateMerger.createLayerFromConfig)(state, action.config);

    if (!newLayer) {
      Console.warn('Failed to create layer from config, it usually means the config is not be in correct format', action.config);
      return state;
    }

    var result = (0, _layerUtils.calculateLayerData)(newLayer, state);
    newLayer = result.layer;
    newLayerData = result.layerData;
  } else {
    // create an empty layer with the first available dataset
    var defaultDataset = Object.keys(state.datasets)[0];
    newLayer = new _layers.Layer({
      isVisible: true,
      isConfigActive: true,
      dataId: defaultDataset
    });
    newLayerData = {};
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    layers: [].concat((0, _toConsumableArray2["default"])(state.layers), [newLayer]),
    layerData: [].concat((0, _toConsumableArray2["default"])(state.layerData), [newLayerData]),
    layerOrder: [].concat((0, _toConsumableArray2["default"])(state.layerOrder), [state.layerOrder.length]),
    splitMaps: (0, _splitMapUtils.addNewLayersToSplitMap)(state.splitMaps, newLayer)
  });
};
/**
 * remove layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').removeLayerUpdater}
 * @public
 */


exports.addLayerUpdater = addLayerUpdater;

var removeLayerUpdater = function removeLayerUpdater(state, _ref7) {
  var idx = _ref7.idx;
  var layers = state.layers,
      layerData = state.layerData,
      clicked = state.clicked,
      hoverInfo = state.hoverInfo;
  var layerToRemove = state.layers[idx];
  var newMaps = (0, _splitMapUtils.removeLayerFromSplitMaps)(state.splitMaps, layerToRemove);

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    layers: [].concat((0, _toConsumableArray2["default"])(layers.slice(0, idx)), (0, _toConsumableArray2["default"])(layers.slice(idx + 1, layers.length))),
    layerData: [].concat((0, _toConsumableArray2["default"])(layerData.slice(0, idx)), (0, _toConsumableArray2["default"])(layerData.slice(idx + 1, layerData.length))),
    layerOrder: state.layerOrder.filter(function (i) {
      return i !== idx;
    }).map(function (pid) {
      return pid > idx ? pid - 1 : pid;
    }),
    clicked: layerToRemove.isLayerHovered(clicked) ? undefined : clicked,
    hoverInfo: layerToRemove.isLayerHovered(hoverInfo) ? undefined : hoverInfo,
    splitMaps: newMaps // TODO: update filters, create helper to remove layer form filter (remove layerid and dataid) if mapped

  });

  return updateAnimationDomain(newState);
};
/**
 * duplicate layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').duplicateLayerUpdater}
 * @public
 */


exports.removeLayerUpdater = removeLayerUpdater;

var duplicateLayerUpdater = function duplicateLayerUpdater(state, _ref8) {
  var idx = _ref8.idx;
  var layers = state.layers;
  var original = state.layers[idx];
  var originalLayerOrderIdx = state.layerOrder.findIndex(function (i) {
    return i === idx;
  });

  if (!original) {
    Console.warn("layer.".concat(idx, " is undefined"));
    return state;
  }

  var newLabel = "Copy of ".concat(original.config.label);
  var postfix = 0; // eslint-disable-next-line no-loop-func

  while (layers.find(function (l) {
    return l.config.label === newLabel;
  })) {
    newLabel = "Copy of ".concat(original.config.label, " ").concat(++postfix);
  } // collect layer config from original


  var loadedLayer = (0, _visStateMerger.serializeLayer)(original); // assign new id and label to copied layer

  if (!loadedLayer.config) {
    return state;
  }

  loadedLayer.config.label = newLabel;
  loadedLayer.id = (0, _utils.generateHashId)(_layers.LAYER_ID_LENGTH); // add layer to state

  var nextState = addLayerUpdater(state, {
    config: loadedLayer
  }); // new added layer are at the end, move it to be on top of original layer

  var newLayerOrderIdx = nextState.layerOrder.length - 1;
  var newLayerOrder = (0, _utils.arrayInsert)(nextState.layerOrder.slice(0, newLayerOrderIdx), originalLayerOrderIdx, newLayerOrderIdx);
  nextState = _objectSpread(_objectSpread({}, nextState), {}, {
    layerOrder: newLayerOrder
  });
  return updateAnimationDomain(nextState);
};
/**
 * Reorder layer
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').reorderLayerUpdater}
 * @public
 */


exports.duplicateLayerUpdater = duplicateLayerUpdater;

var reorderLayerUpdater = function reorderLayerUpdater(state, _ref9) {
  var order = _ref9.order;
  return _objectSpread(_objectSpread({}, state), {}, {
    layerOrder: order
  });
};
/**
 * Remove a dataset and all layers, filters, tooltip configs that based on it
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').removeDatasetUpdater}
 * @public
 */


exports.reorderLayerUpdater = reorderLayerUpdater;

var removeDatasetUpdater = function removeDatasetUpdater(state, action) {
  // extract dataset key
  var datasetKey = action.dataId;
  var datasets = state.datasets; // check if dataset is present

  if (!datasets[datasetKey]) {
    return state;
  }
  /* eslint-disable no-unused-vars */


  var layers = state.layers,
      _state$datasets = state.datasets,
      dataset = _state$datasets[datasetKey],
      newDatasets = (0, _objectWithoutProperties2["default"])(_state$datasets, [datasetKey].map(_toPropertyKey));
  /* eslint-enable no-unused-vars */

  var indexes = layers.reduce(function (listOfIndexes, layer, index) {
    if (layer.config.dataId === datasetKey) {
      // @ts-ignore
      listOfIndexes.push(index);
    }

    return listOfIndexes;
  }, []); // remove layers and datasets

  var _indexes$reduce = indexes.reduce(function (_ref10, idx) {
    var currentState = _ref10.newState,
        indexCounter = _ref10.indexCounter;
    var currentIndex = idx - indexCounter;
    currentState = removeLayerUpdater(currentState, {
      idx: currentIndex
    });
    indexCounter++;
    return {
      newState: currentState,
      indexCounter: indexCounter
    };
  }, {
    newState: _objectSpread(_objectSpread({}, state), {}, {
      datasets: newDatasets
    }),
    indexCounter: 0
  }),
      newState = _indexes$reduce.newState; // remove filters


  var filters = state.filters.filter(function (filter) {
    return !filter.dataId.includes(datasetKey);
  }); // update interactionConfig

  var interactionConfig = state.interactionConfig;
  var _interactionConfig = interactionConfig,
      tooltip = _interactionConfig.tooltip;

  if (tooltip) {
    var config = tooltip.config;
    /* eslint-disable no-unused-vars */

    var _config$fieldsToShow = config.fieldsToShow,
        fields = _config$fieldsToShow[datasetKey],
        fieldsToShow = (0, _objectWithoutProperties2["default"])(_config$fieldsToShow, [datasetKey].map(_toPropertyKey));
    /* eslint-enable no-unused-vars */

    interactionConfig = _objectSpread(_objectSpread({}, interactionConfig), {}, {
      tooltip: _objectSpread(_objectSpread({}, tooltip), {}, {
        config: _objectSpread(_objectSpread({}, config), {}, {
          fieldsToShow: fieldsToShow
        })
      })
    });
  }

  return _objectSpread(_objectSpread({}, newState), {}, {
    filters: filters,
    interactionConfig: interactionConfig
  });
};
/**
 * update layer blending mode
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateLayerBlendingUpdater}
 * @public
 */


exports.removeDatasetUpdater = removeDatasetUpdater;

var updateLayerBlendingUpdater = function updateLayerBlendingUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    layerBlending: action.mode
  });
};
/**
 * Display dataset table in a modal
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').showDatasetTableUpdater}
 * @public
 */


exports.updateLayerBlendingUpdater = updateLayerBlendingUpdater;

var showDatasetTableUpdater = function showDatasetTableUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    editingDataset: action.dataId
  });
};
/**
 * reset visState to initial State
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').resetMapConfigUpdater}
 * @public
 */


exports.showDatasetTableUpdater = showDatasetTableUpdater;

var resetMapConfigUpdater = function resetMapConfigUpdater(state) {
  return _objectSpread(_objectSpread(_objectSpread({}, INITIAL_VIS_STATE), state.initialState), {}, {
    initialState: state.initialState
  });
};
/**
 * Propagate `visState` reducer with a new configuration. Current config will be override.
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').receiveMapConfigUpdater}
 * @public
 */


exports.resetMapConfigUpdater = resetMapConfigUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, _ref11) {
  var _ref11$payload = _ref11.payload,
      _ref11$payload$config = _ref11$payload.config,
      config = _ref11$payload$config === void 0 ? {} : _ref11$payload$config,
      _ref11$payload$option = _ref11$payload.options,
      options = _ref11$payload$option === void 0 ? {} : _ref11$payload$option;

  if (!config.visState) {
    return state;
  }

  var keepExistingConfig = options.keepExistingConfig; // reset config if keepExistingConfig is falsy

  var mergedState = !keepExistingConfig ? resetMapConfigUpdater(state) : state;

  var _iterator = _createForOfIteratorHelper(state.mergers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var merger = _step.value;

      if ((0, _visStateMerger.isValidMerger)(merger) && config.visState[merger.prop]) {
        mergedState = merger.merge(mergedState, config.visState[merger.prop], true);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return mergedState;
};
/**
 * Trigger layer hover event with hovered object
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerHoverUpdater}
 * @public
 */


exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var layerHoverUpdater = function layerHoverUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    hoverInfo: action.info
  });
};
/* eslint-enable max-statements */

/**
 * Update `interactionConfig`
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').interactionConfigChangeUpdater}
 * @public
 */


exports.layerHoverUpdater = layerHoverUpdater;

function interactionConfigChangeUpdater(state, action) {
  var config = action.config;

  var interactionConfig = _objectSpread(_objectSpread({}, state.interactionConfig), (0, _defineProperty2["default"])({}, config.id, config)); // Don't enable tooltip and brush at the same time
  // but coordinates can be shown at all time


  var contradict = ['brush', 'tooltip'];

  if (contradict.includes(config.id) && config.enabled && !state.interactionConfig[config.id].enabled) {
    // only enable one interaction at a time
    contradict.forEach(function (k) {
      if (k !== config.id) {
        interactionConfig[k] = _objectSpread(_objectSpread({}, interactionConfig[k]), {}, {
          enabled: false
        });
      }
    });
  }

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    interactionConfig: interactionConfig
  });

  if (config.id === 'geocoder' && !config.enabled) {
    return removeDatasetUpdater(newState, {
      dataId: 'geocoder_dataset'
    });
  }

  return newState;
}
/**
 * Trigger layer click event with clicked object
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').layerClickUpdater}
 * @public
 */


var layerClickUpdater = function layerClickUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    mousePos: state.interactionConfig.coordinate.enabled ? _objectSpread(_objectSpread({}, state.mousePos), {}, {
      pinned: state.mousePos.pinned ? null : (0, _lodash["default"])(state.mousePos)
    }) : state.mousePos,
    clicked: action.info && action.info.picked ? action.info : null
  });
};
/**
 * Trigger map click event, unselect clicked object
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').mapClickUpdater}
 * @public
 */


exports.layerClickUpdater = layerClickUpdater;

var mapClickUpdater = function mapClickUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    clicked: null
  });
};
/**
 * Trigger map move event
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').mouseMoveUpdater}
 * @public
 */


exports.mapClickUpdater = mapClickUpdater;

var mouseMoveUpdater = function mouseMoveUpdater(state, _ref12) {
  var evt = _ref12.evt;

  if (Object.values(state.interactionConfig).some(function (config) {
    return config.enabled;
  })) {
    return _objectSpread(_objectSpread({}, state), {}, {
      mousePos: _objectSpread(_objectSpread({}, state.mousePos), {}, {
        mousePosition: (0, _toConsumableArray2["default"])(evt.point),
        coordinate: (0, _toConsumableArray2["default"])(evt.lngLat)
      })
    });
  }

  return state;
};
/**
 * Toggle visibility of a layer for a split map
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleSplitMapUpdater}
 * @public
 */


exports.mouseMoveUpdater = mouseMoveUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return state.splitMaps && state.splitMaps.length === 0 ? _objectSpread(_objectSpread({}, state), {}, {
    // maybe we should use an array to store state for a single map as well
    // if current maps length is equal to 0 it means that we are about to split the view
    splitMaps: (0, _splitMapUtils.computeSplitMapLayers)(state.layers)
  }) : closeSpecificMapAtIndex(state, action);
};
/**
 * Toggle visibility of a layer in a split map
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').toggleLayerForMapUpdater}
 * @public
 */


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

var toggleLayerForMapUpdater = function toggleLayerForMapUpdater(state, _ref13) {
  var mapIndex = _ref13.mapIndex,
      layerId = _ref13.layerId;
  var splitMaps = state.splitMaps;
  return _objectSpread(_objectSpread({}, state), {}, {
    splitMaps: splitMaps.map(function (sm, i) {
      return i === mapIndex ? _objectSpread(_objectSpread({}, splitMaps[i]), {}, {
        layers: _objectSpread(_objectSpread({}, splitMaps[i].layers), {}, (0, _defineProperty2["default"])({}, layerId, !splitMaps[i].layers[layerId]))
      }) : sm;
    })
  });
};
/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').updateVisDataUpdater}
 * @public
 */

/* eslint-disable max-statements */
// eslint-disable-next-line complexity


exports.toggleLayerForMapUpdater = toggleLayerForMapUpdater;

var updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  console.log('update vis data'); // datasets can be a single data entries or an array of multiple data entries

  var config = action.config,
      options = action.options;
  var datasets = (0, _utils.toArray)(action.datasets); // @ts-ignore

  var rerender = action.rerender;
  var newDataEntries = rerender ? datasets[0] : datasets.reduce(function (accu) {
    var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref14$info = _ref14.info,
        info = _ref14$info === void 0 ? {} : _ref14$info,
        data = _ref14.data,
        metadata = _ref14.metadata;

    return _objectSpread(_objectSpread({}, accu), (0, _datasetUtils.createNewDataEntry)({
      info: info,
      data: data,
      metadata: metadata
    }, state.datasets) || {});
  }, {});
  var dataEmpty = Object.keys(newDataEntries).length < 1; // apply config if passed from action

  var previousState = config ? receiveMapConfigUpdater(state, {
    payload: {
      config: config,
      options: options
    }
  }) : state;

  var mergedState = _objectSpread(_objectSpread({}, previousState), {}, {
    datasets: _objectSpread(_objectSpread({}, previousState.datasets), newDataEntries)
  }); // merge state with config to be merged


  var _iterator2 = _createForOfIteratorHelper(mergedState.mergers),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var merger = _step2.value;

      if ((0, _visStateMerger.isValidMerger)(merger) && merger.toMergeProp && mergedState[merger.toMergeProp]) {
        var toMerge = mergedState[merger.toMergeProp];
        mergedState[merger.toMergeProp] = INITIAL_VIS_STATE[merger.toMergeProp];
        mergedState = merger.merge(mergedState, toMerge);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var newLayers = !dataEmpty ? mergedState.layers.filter(function (l) {
    return l.config.dataId && l.config.dataId in newDataEntries;
  }) : [];

  if (!newLayers.length && (options || {}).autoCreateLayers !== false) {
    // no layer merged, find defaults
    var result = addDefaultLayers(mergedState, newDataEntries);
    mergedState = result.state;
    newLayers = result.newLayers;
  }

  if (mergedState.splitMaps.length) {
    // if map is split, add new layers to splitMaps
    newLayers = mergedState.layers.filter(function (l) {
      return l.config.dataId && l.config.dataId in newDataEntries;
    });
    mergedState = _objectSpread(_objectSpread({}, mergedState), {}, {
      splitMaps: (0, _splitMapUtils.addNewLayersToSplitMap)(mergedState.splitMaps, newLayers)
    });
  } // if no tooltips merged add default tooltips


  Object.keys(newDataEntries).forEach(function (dataId) {
    var tooltipFields = mergedState.interactionConfig.tooltip.config.fieldsToShow[dataId];

    if (!Array.isArray(tooltipFields) || !tooltipFields.length) {
      mergedState = addDefaultTooltips(mergedState, newDataEntries[dataId]);
    }
  });
  var updatedState = updateAllLayerDomainData(mergedState, dataEmpty ? Object.keys(mergedState.datasets) : Object.keys(newDataEntries), undefined); // register layer animation domain,
  // need to be called after layer data is calculated

  updatedState = updateAnimationDomain(updatedState);
  return updatedState;
};
/* eslint-enable max-statements */

/**
 * Rename an existing dataset in `visState`
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').renameDatasetUpdater}
 * @public
 */


exports.updateVisDataUpdater = updateVisDataUpdater;

function renameDatasetUpdater(state, action) {
  var dataId = action.dataId,
      label = action.label;
  var datasets = state.datasets;
  var existing = datasets[dataId]; // @ts-ignore

  return existing ? _objectSpread(_objectSpread({}, state), {}, {
    datasets: _objectSpread(_objectSpread({}, datasets), {}, (0, _defineProperty2["default"])({}, dataId, _objectSpread(_objectSpread({}, existing), {}, {
      label: label
    })))
  }) : // No-op if the dataset doesn't exist
  state;
}
/**
 * When a user clicks on the specific map closing icon
 * the application will close the selected map
 * and will merge the remaining one with the global state
 * TODO: i think in the future this action should be called merge map layers with global settings
 * @param {Object} state `visState`
 * @param {Object} action action
 * @returns {Object} nextState
 */


function closeSpecificMapAtIndex(state, action) {
  // retrieve layers meta data from the remaining map that we need to keep
  var indexToRetrieve = 1 - action.payload;
  var mapLayers = state.splitMaps[indexToRetrieve].layers;
  var layers = state.layers; // update layer visibility

  var newLayers = layers.map(function (layer) {
    return !mapLayers[layer.id] && layer.config.isVisible ? layer.updateLayerConfig({
      // if layer.id is not in mapLayers, it should be inVisible
      isVisible: false
    }) : layer;
  }); // delete map

  return _objectSpread(_objectSpread({}, state), {}, {
    layers: newLayers,
    splitMaps: []
  });
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadFilesUpdater}
 * @public
 */


var loadFilesUpdater = function loadFilesUpdater(state, action) {
  var files = action.files,
      _action$onFinish = action.onFinish,
      onFinish = _action$onFinish === void 0 ? _visStateActions.loadFilesSuccess : _action$onFinish;

  if (!files.length) {
    return state;
  }

  var fileLoadingProgress = Array.from(files).reduce(function (accu, f, i) {
    return (0, _composerHelpers.merge_)(initialFileLoadingProgress(f, i))(accu);
  }, {});
  var fileLoading = {
    fileCache: [],
    filesToLoad: files,
    onFinish: onFinish
  };
  var nextState = (0, _composerHelpers.merge_)({
    fileLoadingProgress: fileLoadingProgress,
    fileLoading: fileLoading
  })(state);
  return loadNextFileUpdater(nextState);
};
/**
 * Sucessfully loaded one file, move on to the next one
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadFileStepSuccessUpdater}
 * @public
 */


exports.loadFilesUpdater = loadFilesUpdater;

function loadFileStepSuccessUpdater(state, action) {
  if (!state.fileLoading) {
    return state;
  }

  var fileName = action.fileName,
      fileCache = action.fileCache;
  var _state$fileLoading = state.fileLoading,
      filesToLoad = _state$fileLoading.filesToLoad,
      onFinish = _state$fileLoading.onFinish;
  var stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName: fileName,
    progress: {
      percent: 1,
      message: 'Done'
    }
  }); // save processed file to fileCache

  var stateWithCache = (0, _composerHelpers.pick_)('fileLoading')((0, _composerHelpers.merge_)({
    fileCache: fileCache
  }))(stateWithProgress);
  return (0, _tasks.withTask)(stateWithCache, (0, _tasks2.DELAY_TASK)(200).map(filesToLoad.length ? _visStateActions.loadNextFile : function () {
    return onFinish(fileCache);
  }));
} // withTask<T>(state: T, task: any): T

/**
 *
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadNextFileUpdater}
 * @public
 */


function loadNextFileUpdater(state) {
  if (!state.fileLoading) {
    return state;
  }

  var filesToLoad = state.fileLoading.filesToLoad;

  var _filesToLoad = (0, _toArray2["default"])(filesToLoad),
      file = _filesToLoad[0],
      remainingFilesToLoad = _filesToLoad.slice(1); // save filesToLoad to state


  var nextState = (0, _composerHelpers.pick_)('fileLoading')((0, _composerHelpers.merge_)({
    filesToLoad: remainingFilesToLoad
  }))(state);
  var stateWithProgress = updateFileLoadingProgressUpdater(nextState, {
    fileName: file.name,
    progress: {
      percent: 0,
      message: 'loading...'
    }
  });
  var loaders = state.loaders,
      loadOptions = state.loadOptions;
  return (0, _tasks.withTask)(stateWithProgress, makeLoadFileTask(file, nextState.fileLoading.fileCache, loaders, loadOptions));
}

function makeLoadFileTask(file, fileCache) {
  var loaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var loadOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return (0, _tasks2.LOAD_FILE_TASK)({
    file: file,
    fileCache: fileCache,
    loaders: loaders,
    loadOptions: loadOptions
  }).bimap( // prettier ignore
  // success
  function (gen) {
    return (0, _visStateActions.nextFileBatch)({
      gen: gen,
      fileName: file.name,
      onFinish: function onFinish(result) {
        return (0, _visStateActions.processFileContent)({
          content: result,
          fileCache: fileCache
        });
      }
    });
  }, // error
  function (err) {
    return (0, _visStateActions.loadFilesErr)(file.name, err);
  });
}
/**
 *
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').processFileContentUpdater}
 * @public
 */


function processFileContentUpdater(state, action) {
  var _action$payload = action.payload,
      content = _action$payload.content,
      fileCache = _action$payload.fileCache;
  var stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName: content.fileName,
    progress: {
      percent: 1,
      message: 'processing...'
    }
  });
  return (0, _tasks.withTask)(stateWithProgress, (0, _tasks2.PROCESS_FILE_DATA)({
    content: content,
    fileCache: fileCache
  }).bimap(function (result) {
    return (0, _visStateActions.loadFileStepSuccess)({
      fileName: content.fileName,
      fileCache: result
    });
  }, function (err) {
    return (0, _visStateActions.loadFilesErr)(content.fileName, err);
  }));
}

function parseProgress() {
  var prevProgress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var progress = arguments.length > 1 ? arguments[1] : undefined;

  // This happens when receiving query metadata or other cases we don't
  // have an update for the user.
  if (!progress || !progress.percent) {
    return {};
  }

  return {
    percent: progress.percent
  };
}
/**
 * gets called with payload = AsyncGenerator<???>
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').nextFileBatchUpdater}
 * @public
 */


var nextFileBatchUpdater = function nextFileBatchUpdater(state, _ref15) {
  var _ref15$payload = _ref15.payload,
      gen = _ref15$payload.gen,
      fileName = _ref15$payload.fileName,
      progress = _ref15$payload.progress,
      accumulated = _ref15$payload.accumulated,
      onFinish = _ref15$payload.onFinish;
  var stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName: fileName,
    progress: parseProgress(state.fileLoadingProgress[fileName], progress)
  });
  return (0, _tasks.withTask)(stateWithProgress, (0, _tasks2.UNWRAP_TASK)(gen.next()).bimap(function (_ref16) {
    var value = _ref16.value,
        done = _ref16.done;
    return done ? onFinish(accumulated) : (0, _visStateActions.nextFileBatch)({
      gen: gen,
      fileName: fileName,
      progress: value.progress,
      accumulated: value,
      onFinish: onFinish
    });
  }, function (err) {
    return (0, _visStateActions.loadFilesErr)(fileName, err);
  }));
};
/**
 * Trigger loading file error
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').loadFilesErrUpdater}
 * @public
 */


exports.nextFileBatchUpdater = nextFileBatchUpdater;

var loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref17) {
  var error = _ref17.error,
      fileName = _ref17.fileName;
  // update ui with error message
  Console.warn(error);

  if (!state.fileLoading) {
    return state;
  }

  var _state$fileLoading2 = state.fileLoading,
      filesToLoad = _state$fileLoading2.filesToLoad,
      onFinish = _state$fileLoading2.onFinish,
      fileCache = _state$fileLoading2.fileCache;
  var nextState = updateFileLoadingProgressUpdater(state, {
    fileName: fileName,
    progress: {
      error: error
    }
  }); // kick off next file or finish

  return (0, _tasks.withTask)(nextState, (0, _tasks2.DELAY_TASK)(200).map(filesToLoad.length ? _visStateActions.loadNextFile : function () {
    return onFinish(fileCache);
  }));
};
/**
 * When select dataset for export, apply cpu filter to selected dataset
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').applyCPUFilterUpdater}
 * @public
 */


exports.loadFilesErrUpdater = loadFilesErrUpdater;

var applyCPUFilterUpdater = function applyCPUFilterUpdater(state, _ref18) {
  var dataId = _ref18.dataId;
  // apply cpuFilter
  var dataIds = (0, _utils.toArray)(dataId);
  return dataIds.reduce(function (accu, id) {
    return (0, _filterUtils.filterDatasetCPU)(accu, id);
  }, state);
};
/**
 * User input to update the info of the map
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setMapInfoUpdater}
 * @public
 */


exports.applyCPUFilterUpdater = applyCPUFilterUpdater;

var setMapInfoUpdater = function setMapInfoUpdater(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    mapInfo: _objectSpread(_objectSpread({}, state.mapInfo), action.info)
  });
};
/**
 * Helper function to update All layer domain and layer data of state
 * @type {typeof import('./vis-state-updaters').addDefaultLayers}
 */


exports.setMapInfoUpdater = setMapInfoUpdater;

function addDefaultLayers(state, datasets) {
  /** @type {Layer[]} */
  var empty = [];
  var defaultLayers = Object.values(datasets).reduce(function (accu, dataset) {
    var foundLayers = (0, _layerUtils.findDefaultLayer)(dataset, state.layerClasses);
    return foundLayers && foundLayers.length ? accu.concat(foundLayers) : accu;
  }, empty);
  return {
    state: _objectSpread(_objectSpread({}, state), {}, {
      layers: [].concat((0, _toConsumableArray2["default"])(state.layers), (0, _toConsumableArray2["default"])(defaultLayers)),
      layerOrder: [].concat((0, _toConsumableArray2["default"])(defaultLayers.map(function (_, i) {
        return state.layers.length + i;
      })), (0, _toConsumableArray2["default"])(state.layerOrder))
    }),
    newLayers: defaultLayers
  };
}
/**
 * helper function to find default tooltips
 * @param {Object} state
 * @param {Object} dataset
 * @returns {Object} nextState
 */


function addDefaultTooltips(state, dataset) {
  var tooltipFields = (0, _interactionUtils.findFieldsToShow)(dataset);

  var merged = _objectSpread(_objectSpread({}, state.interactionConfig.tooltip.config.fieldsToShow), tooltipFields);

  return (0, _utils.set)(['interactionConfig', 'tooltip', 'config', 'fieldsToShow'], merged, state);
}

function initialFileLoadingProgress(file, index) {
  var fileName = file.name || "Untitled File ".concat(index);
  return (0, _defineProperty2["default"])({}, fileName, {
    // percent of current file
    percent: 0,
    message: '',
    fileName: fileName,
    error: null
  });
}

function updateFileLoadingProgressUpdater(state, _ref20) {
  var fileName = _ref20.fileName,
      progress = _ref20.progress;
  return (0, _composerHelpers.pick_)('fileLoadingProgress')((0, _composerHelpers.pick_)(fileName)((0, _composerHelpers.merge_)(progress)))(state);
}
/**
 * Helper function to update layer domains for an array of datasets
 * @type {typeof import('./vis-state-updaters').updateAllLayerDomainData}
 */


function updateAllLayerDomainData(state, dataId, updatedFilter) {
  var dataIds = typeof dataId === 'string' ? [dataId] : dataId;
  var newLayers = [];
  var newLayerData = [];
  state.layers.forEach(function (oldLayer, i) {
    if (oldLayer.config.dataId && dataIds.includes(oldLayer.config.dataId)) {
      // No need to recalculate layer domain if filter has fixed domain
      var newLayer = updatedFilter && updatedFilter.fixedDomain ? oldLayer : oldLayer.updateLayerDomain(state.datasets, updatedFilter);

      var _calculateLayerData5 = (0, _layerUtils.calculateLayerData)(newLayer, state, state.layerData[i]),
          layerData = _calculateLayerData5.layerData,
          layer = _calculateLayerData5.layer;

      newLayers.push(layer);
      newLayerData.push(layerData);
    } else {
      newLayers.push(oldLayer);
      newLayerData.push(state.layerData[i]);
    }
  });

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    layers: newLayers,
    layerData: newLayerData
  });

  return newState;
}

function updateAnimationDomain(state) {
  // merge all animatable layer domain and update global config
  var animatableLayers = state.layers.filter(function (l) {
    return l.config.isVisible && l.config.animation && l.config.animation.enabled && Array.isArray(l.animationDomain);
  });

  if (!animatableLayers.length) {
    return _objectSpread(_objectSpread({}, state), {}, {
      animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
        domain: null,
        defaultTimeFormat: null
      })
    });
  }

  var mergedDomain = animatableLayers.reduce(function (accu, layer) {
    return [Math.min(accu[0], layer.animationDomain[0]), Math.max(accu[1], layer.animationDomain[1])];
  }, [Number(Infinity), -Infinity]);
  var defaultTimeFormat = (0, _filterUtils.getTimeWidgetTitleFormatter)(mergedDomain);
  return _objectSpread(_objectSpread({}, state), {}, {
    animationConfig: _objectSpread(_objectSpread({}, state.animationConfig), {}, {
      currentTime: (0, _filterUtils.isInRange)(state.animationConfig.currentTime, mergedDomain) ? state.animationConfig.currentTime : mergedDomain[0],
      domain: mergedDomain,
      defaultTimeFormat: defaultTimeFormat
    })
  });
}
/**
 * Update the status of the editor
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setEditorModeUpdater}
 */


var setEditorModeUpdater = function setEditorModeUpdater(state, _ref21) {
  var mode = _ref21.mode;
  return _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      mode: mode,
      selectedFeature: null
    })
  });
}; // const featureToFilterValue = (feature) => ({...feature, id: feature.id});

/**
 * Update editor features
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setFeaturesUpdater}
 */


exports.setEditorModeUpdater = setEditorModeUpdater;

function setFeaturesUpdater(state, _ref22) {
  var _ref22$features = _ref22.features,
      features = _ref22$features === void 0 ? [] : _ref22$features;
  var lastFeature = features.length && features[features.length - 1];

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      // only save none filter features to editor
      features: features.filter(function (f) {
        return !(0, _filterUtils.getFilterIdInFeature)(f);
      }),
      mode: lastFeature && lastFeature.properties.isClosed ? _defaultSettings.EDITOR_MODES.EDIT : state.editor.mode
    })
  }); // Retrieve existing feature


  var selectedFeature = state.editor.selectedFeature; // If no feature is selected we can simply return since no operations

  if (!selectedFeature) {
    return newState;
  } // TODO: check if the feature has changed


  var feature = features.find(function (f) {
    return f.id === selectedFeature.id;
  }); // if feature is part of a filter

  var filterId = feature && (0, _filterUtils.getFilterIdInFeature)(feature);

  if (filterId && feature) {
    var featureValue = (0, _filterUtils.featureToFilterValue)(feature, filterId);
    var filterIdx = state.filters.findIndex(function (fil) {
      return fil.id === filterId;
    });
    return setFilterUpdater(newState, {
      idx: filterIdx,
      prop: 'value',
      value: featureValue
    });
  }

  return newState;
}
/**
 * Set the current selected feature
 * @memberof uiStateUpdaters
 * @type {typeof import('./vis-state-updaters').setSelectedFeatureUpdater}
 */


var setSelectedFeatureUpdater = function setSelectedFeatureUpdater(state, _ref23) {
  var feature = _ref23.feature;
  return _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      selectedFeature: feature
    })
  });
};
/**
 * Delete existing feature from filters
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').deleteFeatureUpdater}
 */


exports.setSelectedFeatureUpdater = setSelectedFeatureUpdater;

function deleteFeatureUpdater(state, _ref24) {
  var feature = _ref24.feature;

  if (!feature) {
    return state;
  }

  var newState = _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      selectedFeature: null
    })
  });

  if ((0, _filterUtils.getFilterIdInFeature)(feature)) {
    var filterIdx = newState.filters.findIndex(function (f) {
      return f.id === (0, _filterUtils.getFilterIdInFeature)(feature);
    });
    return filterIdx > -1 ? removeFilterUpdater(newState, {
      idx: filterIdx
    }) : newState;
  } // modify editor object


  var newEditor = _objectSpread(_objectSpread({}, state.editor), {}, {
    features: state.editor.features.filter(function (f) {
      return f.id !== feature.id;
    }),
    selectedFeature: null
  });

  return _objectSpread(_objectSpread({}, state), {}, {
    editor: newEditor
  });
}
/**
 * Toggle feature as layer filter
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').setPolygonFilterLayerUpdater}
 */


function setPolygonFilterLayerUpdater(state, payload) {
  var layer = payload.layer,
      feature = payload.feature;
  var filterId = (0, _filterUtils.getFilterIdInFeature)(feature); // let newFilter = null;

  var filterIdx;
  var newLayerId = [layer.id];
  var newState = state; // If polygon filter already exists, we need to find out if the current layer is already included

  if (filterId) {
    filterIdx = state.filters.findIndex(function (f) {
      return f.id === filterId;
    });

    if (!state.filters[filterIdx]) {
      // what if filter doesn't exist?... not possible.
      // because features in the editor is passed in from filters and editors.
      // but we will move this feature back to editor just in case
      var noneFilterFeature = _objectSpread(_objectSpread({}, feature), {}, {
        properties: _objectSpread(_objectSpread({}, feature.properties), {}, {
          filterId: null
        })
      });

      return _objectSpread(_objectSpread({}, state), {}, {
        editor: _objectSpread(_objectSpread({}, state.editor), {}, {
          features: [].concat((0, _toConsumableArray2["default"])(state.editor.features), [noneFilterFeature]),
          selectedFeature: noneFilterFeature
        })
      });
    }

    var filter = state.filters[filterIdx];
    var _filter$layerId = filter.layerId,
        layerId = _filter$layerId === void 0 ? [] : _filter$layerId;
    var isLayerIncluded = layerId.includes(layer.id);
    newLayerId = isLayerIncluded ? // if layer is included, remove it
    layerId.filter(function (l) {
      return l !== layer.id;
    }) : [].concat((0, _toConsumableArray2["default"])(layerId), [layer.id]);
  } else {
    // if we haven't create the polygon filter, create it
    var newFilter = (0, _filterUtils.generatePolygonFilter)([], feature);
    filterIdx = state.filters.length; // add feature, remove feature from eidtor

    newState = _objectSpread(_objectSpread({}, state), {}, {
      filters: [].concat((0, _toConsumableArray2["default"])(state.filters), [newFilter]),
      editor: _objectSpread(_objectSpread({}, state.editor), {}, {
        features: state.editor.features.filter(function (f) {
          return f.id !== feature.id;
        }),
        selectedFeature: newFilter.value
      })
    });
  }

  return setFilterUpdater(newState, {
    idx: filterIdx,
    prop: 'layerId',
    value: newLayerId
  });
}
/**
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').sortTableColumnUpdater}
 * @public
 */


function sortTableColumnUpdater(state, _ref25) {
  var dataId = _ref25.dataId,
      column = _ref25.column,
      mode = _ref25.mode;
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var sortMode = mode;

  if (!sortMode) {
    var currentMode = (0, _lodash3["default"])(dataset, ['sortColumn', column]); // @ts-ignore - should be fixable in a TS file

    sortMode = currentMode ? Object.keys(_defaultSettings.SORT_ORDER).find(function (m) {
      return m !== currentMode;
    }) : _defaultSettings.SORT_ORDER.ASCENDING;
  }

  var sorted = (0, _keplerTable.sortDatasetByColumn)(dataset, column, sortMode);
  return (0, _utils.set)(['datasets', dataId], sorted, state);
}
/**
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').pinTableColumnUpdater}
 * @public
 */


function pinTableColumnUpdater(state, _ref26) {
  var dataId = _ref26.dataId,
      column = _ref26.column;
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var field = dataset.fields.find(function (f) {
    return f.name === column;
  });

  if (!field) {
    return state;
  }

  var pinnedColumns;

  if (Array.isArray(dataset.pinnedColumns) && dataset.pinnedColumns.includes(field.name)) {
    // unpin it
    pinnedColumns = dataset.pinnedColumns.filter(function (co) {
      return co !== field.name;
    });
  } else {
    pinnedColumns = (dataset.pinnedColumns || []).concat(field.name);
  }

  return (0, _utils.set)(['datasets', dataId, 'pinnedColumns'], pinnedColumns, state);
}
/**
 * Copy column content as strings
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').copyTableColumnUpdater}
 * @public
 */


function copyTableColumnUpdater(state, _ref27) {
  var dataId = _ref27.dataId,
      column = _ref27.column;
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var fieldIdx = dataset.fields.findIndex(function (f) {
    return f.name === column;
  });

  if (fieldIdx < 0) {
    return state;
  }

  var type = dataset.fields[fieldIdx].type;
  var text = dataset.dataContainer.map(function (row) {
    return (0, _dataUtils.parseFieldValue)(row.valueAt(fieldIdx), type);
  }, true).join('\n');
  (0, _copyToClipboard["default"])(text);
  return state;
} //如何实时修改datasets layer的效果？

/**
 * Copy column content as strings：tbc: how to change the visualization state?
 * @memberof visStateUpdaters
 * @type {typeof import('./vis-state-updaters').deleteTableColumnUpdater}
 * @public
 */


function deleteTableColumnUpdater(state, _ref28) {
  var dataId = _ref28.dataId,
      column = _ref28.column;
  console.log('delete table column updater here');
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var new_dataset = (0, _datasetExtensionUtils.delete_dataset_column)(dataset, column);
  return (0, _utils.set)(['datasets', dataId], new_dataset, state);
} //todo: add Column: first not considering adding a column lock. (while it is necessary for api query),
//todo: make it available to deal with multiple columns


function addTableColumnUpdater(state, _ref29) {
  var dataId = _ref29.dataId,
      column = _ref29.column,
      data_type = _ref29.data_type,
      values = _ref29.values,
      replace = _ref29.replace;
  console.log('add table column');
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var new_dataset = (0, _datasetExtensionUtils.add_dataset_column)(dataset, column, data_type, values, replace);
  return (0, _utils.set)(['datasets', dataId], new_dataset, state); // const new_dataset =
} //todo: here add modify column function


function GMTModifyTableColumnUpdater(state, action) {
  console.log('add table column'); // const datasets = state.datasets;

  var valueList = action.valueList,
      datasets = action.datasets;
  var _state$processor$batc = state.processor.batch,
      oddataID = _state$processor$batc.oddataID,
      poidataID = _state$processor$batc.poidataID,
      gpsdataID = _state$processor$batc.gpsdataID,
      spatialFilter = _state$processor$batc.spatialFilter;
  var coordsModify = spatialFilter.coordsModify,
      poiType = spatialFilter.poiType;
  var valuedict = {};
  valueList.map(function (x) {
    valuedict[x.id] = {
      'address': x.address,
      'lng': x.lng,
      'lat': x.lat,
      'poitype': x.poitype
    };
  });

  if (oddataID) {
    console.log('od data match example');
    var od_startid_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], _defaultSettings.DATASET_COLUMNS['oddata']['id'][0]);
    var od_endid_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], _defaultSettings.DATASET_COLUMNS['oddata']['id'][1]);
    var od_startadd_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], _defaultSettings.DATASET_COLUMNS['oddata']['address'][0]);
    var od_endadd_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], _defaultSettings.DATASET_COLUMNS['oddata']['address'][1]);

    var od_startgeo_idx = _defaultSettings.DATASET_COLUMNS['oddata']['gps'][0].map(function (x) {
      return (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], x);
    });

    var od_endgeo_idx = _defaultSettings.DATASET_COLUMNS['oddata']['gps'][1].map(function (x) {
      return (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], x);
    });

    var od_startpoi_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], _defaultSettings.DATASET_COLUMNS['oddata']['poi name'][0]);
    var od_endpoi_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[oddataID], _defaultSettings.DATASET_COLUMNS['oddata']['poi name'][1]); // here first get the index

    datasets[oddataID].dataContainer._rows = datasets[oddataID].dataContainer._rows.map(function (x) {
      var _valuedict$x$od_start, _valuedict$x$od_endid;

      x[od_startadd_idx] = (_valuedict$x$od_start = valuedict[x[od_startid_idx]]) === null || _valuedict$x$od_start === void 0 ? void 0 : _valuedict$x$od_start.address;
      x[od_endadd_idx] = (_valuedict$x$od_endid = valuedict[x[od_endid_idx]]) === null || _valuedict$x$od_endid === void 0 ? void 0 : _valuedict$x$od_endid.address;

      if (coordsModify) {
        var _valuedict$x$od_start2, _valuedict$x$od_start3, _valuedict$x$od_endid2, _valuedict$x$od_endid3;

        // @ts-ignore
        x[od_startgeo_idx[0]] = (_valuedict$x$od_start2 = valuedict[x[od_startid_idx]]) === null || _valuedict$x$od_start2 === void 0 ? void 0 : _valuedict$x$od_start2.lng;
        x[od_startgeo_idx[1]] = (_valuedict$x$od_start3 = valuedict[x[od_startid_idx]]) === null || _valuedict$x$od_start3 === void 0 ? void 0 : _valuedict$x$od_start3.lat;
        x[od_endgeo_idx[0]] = (_valuedict$x$od_endid2 = valuedict[x[od_endid_idx]]) === null || _valuedict$x$od_endid2 === void 0 ? void 0 : _valuedict$x$od_endid2.lng;
        x[od_endgeo_idx[1]] = (_valuedict$x$od_endid3 = valuedict[x[od_endid_idx]]) === null || _valuedict$x$od_endid3 === void 0 ? void 0 : _valuedict$x$od_endid3.lat;
      }

      if (poiType) {
        var _valuedict$x$od_start4, _valuedict$x$od_endid4;

        x[od_startpoi_idx] = (_valuedict$x$od_start4 = valuedict[x[od_startid_idx]]) === null || _valuedict$x$od_start4 === void 0 ? void 0 : _valuedict$x$od_start4.poitype;
        x[od_endpoi_idx] = (_valuedict$x$od_endid4 = valuedict[x[od_endid_idx]]) === null || _valuedict$x$od_endid4 === void 0 ? void 0 : _valuedict$x$od_endid4.poitype;
      }

      return x;
    });
  }

  if (poidataID) {
    var poi_id_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[poidataID], _defaultSettings.DATASET_COLUMNS['poidata']['id'][0]);
    var poi_add_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[poidataID], _defaultSettings.DATASET_COLUMNS['poidata']['address'][0]);

    var poi_geo_idx = _defaultSettings.DATASET_COLUMNS['poidata']['gps'][0].map(function (x) {
      return (0, _datasetExtensionUtils.get_idx_by_name)(datasets[poidataID], x);
    });

    var poi_type_idx = (0, _datasetExtensionUtils.get_idx_by_name)(datasets[poidataID], _defaultSettings.DATASET_COLUMNS['poidata']['poi name'][0]); //if keeping id? tbd

    datasets[poidataID].dataContainer._rows = datasets[poidataID].dataContainer._rows.map(function (x) {
      var _valuedict$x$poi_id_i;

      x[poi_add_idx] = (_valuedict$x$poi_id_i = valuedict[x[poi_id_idx]]) === null || _valuedict$x$poi_id_i === void 0 ? void 0 : _valuedict$x$poi_id_i.address;

      if (coordsModify) {
        var _valuedict$x$poi_id_i2, _valuedict$x$poi_id_i3;

        // @ts-ignore
        x[poi_geo_idx[0]] = (_valuedict$x$poi_id_i2 = valuedict[x[poi_id_idx]]) === null || _valuedict$x$poi_id_i2 === void 0 ? void 0 : _valuedict$x$poi_id_i2.lng;
        x[poi_geo_idx[1]] = (_valuedict$x$poi_id_i3 = valuedict[x[poi_id_idx]]) === null || _valuedict$x$poi_id_i3 === void 0 ? void 0 : _valuedict$x$poi_id_i3.lat;
      }

      if (poiType) {
        var _valuedict$x$poi_id_i4;

        x[poi_type_idx] = (_valuedict$x$poi_id_i4 = valuedict[x[poi_id_idx]]) === null || _valuedict$x$poi_id_i4 === void 0 ? void 0 : _valuedict$x$poi_id_i4.poitype;
      }

      return x;
    });
  }

  state = [oddataID, gpsdataID, poidataID].reduce(function (st, id) {
    return id ? rerenderWithDataset(st, datasets[id]) : st;
  }, state);
  (0, _googleUtils.CompressExportData)(state, {
    selectedDataset: '',
    dataType: 'CSV',
    filtered: false
  }, true);
  return state; // define the output of value list: [gps,address,poitype]
  // return set(['datasets', dataId], new_dataset, state);
  // const new_dataset =
}

function removeProcessorUpdater(state, flag) {
  var processor_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  console.log('remove processor here');
  var newState = state;
  var preprocessor = processor_type === 1 ? {
    proc: newState.processor,
    time: new Date().toLocaleDateString(),
    preflag: flag
  } : {
    proc: newState.processor,
    time: new Date().toLocaleDateString(),
    prebatchflag: flag
  };

  if (flag) {
    newState.processor = processor_type === 1 ? _lodash5["default"].cloneDeep(_processorUtils.DEFAULT_PROCESSOR_STRUCTURE) : newState.processor;
  }

  newState.processor.preprocessor = preprocessor;
  return newState;
}

function activateProcessorUpdater(state) {
  console.log('activate processor here');
  var newState = state;

  if (newState.processor) {
    newState.processor.flag = true;
  }

  return newState;
} //todo: update column:


function updateTableColumnUpdater(state, _ref30) {
  var dataId = _ref30.dataId,
      column = _ref30.column,
      values = _ref30.values;
  console.log('update table column');
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var new_dataset = (0, _processorUtils.update_dataset_column)(dataset, column, values);
  return (0, _utils.set)(['datasets', dataId], new_dataset, state);
}
/**
 * Update editor
 * @type {typeof import('./vis-state-updaters').toggleEditorVisibilityUpdater}
 */


function toggleEditorVisibilityUpdater(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    editor: _objectSpread(_objectSpread({}, state.editor), {}, {
      visible: !state.editor.visible
    })
  });
}

function setFilterAnimationTimeConfigUpdater(state, _ref31) {
  var idx = _ref31.idx,
      config = _ref31.config;
  var oldFilter = state.filters[idx];

  if (!oldFilter) {
    Console.error("filters.".concat(idx, " is undefined"));
    return state;
  }

  if (oldFilter.type !== _defaultSettings.FILTER_TYPES.timeRange) {
    Console.error("setFilterAnimationTimeConfig can only be called to update a time filter. check filter.type === 'timeRange'");
    return state;
  }

  var updates = checkTimeConfigArgs(config);
  return (0, _composerHelpers.pick_)('filters')((0, _composerHelpers.swap_)((0, _composerHelpers.merge_)(updates)(oldFilter)))(state);
}

function checkTimeConfigArgs(config) {
  var allowed = ['timeFormat', 'timezone'];
  return Object.keys(config).reduce(function (accu, prop) {
    if (!allowed.includes(prop)) {
      Console.error("setLayerAnimationTimeConfig takes timeFormat and/or timezone as options, found ".concat(prop));
      return accu;
    } // here we are NOT checking if timezone or timeFormat input is valid


    accu[prop] = config[prop];
    return accu;
  }, {});
}
/**
 * Update editor
 * @type {typeof import('./vis-state-updaters').setLayerAnimationTimeConfigUpdater}
 */


function setLayerAnimationTimeConfigUpdater(state, _ref32) {
  var config = _ref32.config;

  if (!config) {
    return state;
  }

  var updates = checkTimeConfigArgs(config);
  return (0, _composerHelpers.pick_)('animationConfig')((0, _composerHelpers.merge_)(updates))(state);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsidmlzU3RhdGVVcGRhdGVycyIsIkRFRkFVTFRfQU5JTUFUSU9OX0NPTkZJRyIsImRvbWFpbiIsImN1cnJlbnRUaW1lIiwic3BlZWQiLCJpc0FuaW1hdGluZyIsInRpbWVGb3JtYXQiLCJ0aW1lem9uZSIsImRlZmF1bHRUaW1lRm9ybWF0IiwiREVGQVVMVF9FRElUT1IiLCJtb2RlIiwiRURJVE9SX01PREVTIiwiRFJBV19QT0xZR09OIiwiZmVhdHVyZXMiLCJzZWxlY3RlZEZlYXR1cmUiLCJ2aXNpYmxlIiwiSU5JVElBTF9WSVNfU1RBVEUiLCJtYXBJbmZvIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImxheWVycyIsImxheWVyRGF0YSIsImxheWVyVG9CZU1lcmdlZCIsImxheWVyT3JkZXIiLCJmaWx0ZXJzIiwiZmlsdGVyVG9CZU1lcmdlZCIsImRhdGFzZXRzIiwiZWRpdGluZ0RhdGFzZXQiLCJ1bmRlZmluZWQiLCJwcm9jZXNzb3IiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImludGVyYWN0aW9uVG9CZU1lcmdlZCIsImxheWVyQmxlbmRpbmciLCJob3ZlckluZm8iLCJjbGlja2VkIiwibW91c2VQb3MiLCJzcGxpdE1hcHMiLCJzcGxpdE1hcHNUb0JlTWVyZ2VkIiwibGF5ZXJDbGFzc2VzIiwiTGF5ZXJDbGFzc2VzIiwiYW5pbWF0aW9uQ29uZmlnIiwiZWRpdG9yIiwiZmlsZUxvYWRpbmciLCJmaWxlTG9hZGluZ1Byb2dyZXNzIiwibG9hZGVycyIsImxvYWRPcHRpb25zIiwibWVyZ2VycyIsIlZJU19TVEFURV9NRVJHRVJTIiwic2NoZW1hIiwiS2VwbGVyR0xTY2hlbWEiLCJ1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEiLCJzdGF0ZSIsImxheWVyIiwiaWR4IiwibWFwIiwibHlyIiwiaSIsImQiLCJ1cGRhdGVTdGF0ZU9uTGF5ZXJWaXNpYmlsaXR5Q2hhbmdlIiwibmV3U3RhdGUiLCJsZW5ndGgiLCJjb25maWciLCJpc1Zpc2libGUiLCJhbmltYXRpb24iLCJlbmFibGVkIiwidXBkYXRlQW5pbWF0aW9uRG9tYWluIiwibGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyIiwiYWN0aW9uIiwib2xkTGF5ZXIiLCJmaW5kSW5kZXgiLCJsIiwiaWQiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJuZXdDb25maWciLCJkYXRhSWQiLCJyZXN0Q29uZmlnIiwic3RhdGVXaXRoRGF0YUlkIiwibGF5ZXJEYXRhSWRDaGFuZ2VVcGRhdGVyIiwibmV4dExheWVyIiwiZmluZCIsIm5ld0xheWVyIiwidXBkYXRlTGF5ZXJDb25maWciLCJzaG91bGRDYWxjdWxhdGVMYXllckRhdGEiLCJvbGRMYXllckRhdGEiLCJ1cGRhdGVMYXllckRhdGFSZXN1bHQiLCJhZGRPclJlbW92ZVRleHRMYWJlbHMiLCJuZXdGaWVsZHMiLCJ0ZXh0TGFiZWwiLCJuZXdUZXh0TGFiZWwiLCJzbGljZSIsImN1cnJlbnRGaWVsZHMiLCJ0bCIsImZpZWxkIiwibmFtZSIsImZpbHRlciIsImFkZEZpZWxkcyIsImYiLCJpbmNsdWRlcyIsImRlbGV0ZUZpZWxkcyIsImZkIiwiREVGQVVMVF9URVhUX0xBQkVMIiwiYWYiLCJ1cGRhdGVUZXh0TGFiZWxQcm9wQW5kVmFsdWUiLCJwcm9wIiwidmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsInNwbGljZSIsImxheWVyVGV4dExhYmVsQ2hhbmdlVXBkYXRlciIsInZhbGlkYXRlRXhpc3RpbmdMYXllcldpdGhEYXRhIiwiZGF0YXNldCIsImxvYWRlZExheWVyIiwiYWxsb3dFbXB0eUNvbHVtbiIsImlzVmFsaWRUb1NhdmUiLCJ2YWxpZGF0ZWQiLCJ0eXBlIiwiaXNDb25maWdBY3RpdmUiLCJ1cGRhdGVMYXllckRvbWFpbiIsImxheWVyVHlwZUNoYW5nZVVwZGF0ZXIiLCJuZXdUeXBlIiwib2xkSWQiLCJDb25zb2xlIiwiZXJyb3IiLCJhc3NpZ25Db25maWdUb0xheWVyIiwidmlzQ29uZmlnU2V0dGluZ3MiLCJzZXR0aW5ncyIsIm9sZExheWVyTWFwIiwib3RoZXJMYXllcnMiLCJsYXllclZpc3VhbENoYW5uZWxDaGFuZ2VVcGRhdGVyIiwiY2hhbm5lbCIsInVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbCIsImxheWVyVmlzQ29uZmlnQ2hhbmdlVXBkYXRlciIsIm5ld1Zpc0NvbmZpZyIsInZpc0NvbmZpZyIsInNldFByb2Nlc3NvclVwZGF0ZXIiLCJjb25zb2xlIiwibG9nIiwidmFsdWVJbmRleCIsIm9sZFByb2Nlc3NvciIsIm5ld1Byb2Nlc3NvciIsIkRFRkFVTFRfUFJPQ0VTU09SX1NUUlVDVFVSRSIsIlBST0NFU1NPUl9VUERBVEVSX1BST1BTIiwicnVuUHJvY2Vzc29yVXBkYXRlciIsInZpc1N0YXRlQWN0aW9uIiwiZmxhZyIsInJlbW92ZVByb2Nlc3NvclVwZGF0ZXIiLCJhdHRycyIsInRhc2tzIiwicmVwbGFjZSIsInJlcmVuZGVyV2l0aERhdGFzZXQiLCJ1cGRhdGVWaXNEYXRhVXBkYXRlciIsInJlcmVuZGVyIiwicnVuUHJvY2Vzc29yQmF0Y2hVcGRhdGVyIiwiYmF0Y2giLCJuZXdfZGF0YXNldHMiLCJfIiwiY2xvbmVEZWVwIiwib2RkYXRhSUQiLCJncHNkYXRhSUQiLCJwb2lkYXRhSUQiLCJzcGF0aWFsRmlsdGVyIiwidGVtcG9yYWxGaWx0ZXIiLCJhcGlrZXkiLCJleHBvcnRTZXR0aW5nIiwicmVzdWx0IiwicmVkdWNlIiwic3QiLCJzZWxlY3RlZERhdGFzZXQiLCJkYXRhVHlwZSIsImZpbHRlcmVkIiwiZSIsIm5ld0RhdGFTZXQiLCJyZW1vdmVEYXRhc2V0VXBkYXRlciIsInNldEZpbHRlckFuaW1hdGlvblRpbWVVcGRhdGVyIiwic2V0RmlsdGVyVXBkYXRlciIsInNldEZpbHRlckFuaW1hdGlvbldpbmRvd1VwZGF0ZXIiLCJhbmltYXRpb25XaW5kb3ciLCJvbGRGaWx0ZXIiLCJuZXdGaWx0ZXIiLCJkYXRhc2V0SWRzIiwiRklMVEVSX1VQREFURVJfUFJPUFMiLCJkYXRhc2V0SWQiLCJtZXJnZURvbWFpbiIsInVwZGF0ZWRGaWx0ZXIiLCJuZXdEYXRhc2V0IiwiZ3B1IiwibGF5ZXJJZCIsImxheWVySWREaWZmZXJlbmNlIiwibGF5ZXJEYXRhSWRzIiwibGlkIiwibmV3RGF0YUlkcyIsImVubGFyZ2VkRmlsdGVyIiwiZW5sYXJnZWQiLCJkYXRhc2V0SWRzVG9GaWx0ZXIiLCJMSU1JVEVEX0ZJTFRFUl9FRkZFQ1RfUFJPUFMiLCJmaWx0ZXJlZERhdGFzZXRzIiwidXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhIiwic2V0RmlsdGVyUGxvdFVwZGF0ZXIiLCJuZXdQcm9wIiwicGxvdFR5cGUiLCJhZGRGaWx0ZXJVcGRhdGVyIiwibGF5ZXJDb2xvclVJQ2hhbmdlVXBkYXRlciIsIm9sZFZpeENvbmZpZyIsInVwZGF0ZUxheWVyQ29sb3JVSSIsInRvZ2dsZUZpbHRlckFuaW1hdGlvblVwZGF0ZXIiLCJ0b2dnbGVMYXllckFuaW1hdGlvblVwZGF0ZXIiLCJ0b2dnbGVMYXllckFuaW1hdGlvbkNvbnRyb2xVcGRhdGVyIiwiaGlkZUNvbnRyb2wiLCJ1cGRhdGVGaWx0ZXJBbmltYXRpb25TcGVlZFVwZGF0ZXIiLCJzZXRMYXllckFuaW1hdGlvblRpbWVVcGRhdGVyIiwidXBkYXRlTGF5ZXJBbmltYXRpb25TcGVlZFVwZGF0ZXIiLCJlbmxhcmdlRmlsdGVyVXBkYXRlciIsInRvZ2dsZUZpbHRlckZlYXR1cmVVcGRhdGVyIiwiYXNzaWduIiwicmVtb3ZlRmlsdGVyVXBkYXRlciIsIm5ld0ZpbHRlcnMiLCJuZXdFZGl0b3IiLCJhZGRMYXllclVwZGF0ZXIiLCJuZXdMYXllckRhdGEiLCJ3YXJuIiwiZGVmYXVsdERhdGFzZXQiLCJMYXllciIsInJlbW92ZUxheWVyVXBkYXRlciIsImxheWVyVG9SZW1vdmUiLCJuZXdNYXBzIiwicGlkIiwiaXNMYXllckhvdmVyZWQiLCJkdXBsaWNhdGVMYXllclVwZGF0ZXIiLCJvcmlnaW5hbCIsIm9yaWdpbmFsTGF5ZXJPcmRlcklkeCIsIm5ld0xhYmVsIiwibGFiZWwiLCJwb3N0Zml4IiwiTEFZRVJfSURfTEVOR1RIIiwibmV4dFN0YXRlIiwibmV3TGF5ZXJPcmRlcklkeCIsIm5ld0xheWVyT3JkZXIiLCJyZW9yZGVyTGF5ZXJVcGRhdGVyIiwib3JkZXIiLCJkYXRhc2V0S2V5IiwibmV3RGF0YXNldHMiLCJpbmRleGVzIiwibGlzdE9mSW5kZXhlcyIsImluZGV4IiwicHVzaCIsImN1cnJlbnRTdGF0ZSIsImluZGV4Q291bnRlciIsImN1cnJlbnRJbmRleCIsInRvb2x0aXAiLCJmaWVsZHNUb1Nob3ciLCJmaWVsZHMiLCJ1cGRhdGVMYXllckJsZW5kaW5nVXBkYXRlciIsInNob3dEYXRhc2V0VGFibGVVcGRhdGVyIiwicmVzZXRNYXBDb25maWdVcGRhdGVyIiwiaW5pdGlhbFN0YXRlIiwicmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIiLCJwYXlsb2FkIiwib3B0aW9ucyIsInZpc1N0YXRlIiwia2VlcEV4aXN0aW5nQ29uZmlnIiwibWVyZ2VkU3RhdGUiLCJtZXJnZXIiLCJtZXJnZSIsImxheWVySG92ZXJVcGRhdGVyIiwiaW5mbyIsImludGVyYWN0aW9uQ29uZmlnQ2hhbmdlVXBkYXRlciIsImNvbnRyYWRpY3QiLCJmb3JFYWNoIiwiayIsImxheWVyQ2xpY2tVcGRhdGVyIiwiY29vcmRpbmF0ZSIsInBpbm5lZCIsInBpY2tlZCIsIm1hcENsaWNrVXBkYXRlciIsIm1vdXNlTW92ZVVwZGF0ZXIiLCJldnQiLCJ2YWx1ZXMiLCJzb21lIiwibW91c2VQb3NpdGlvbiIsInBvaW50IiwibG5nTGF0IiwidG9nZ2xlU3BsaXRNYXBVcGRhdGVyIiwiY2xvc2VTcGVjaWZpY01hcEF0SW5kZXgiLCJ0b2dnbGVMYXllckZvck1hcFVwZGF0ZXIiLCJtYXBJbmRleCIsInNtIiwibmV3RGF0YUVudHJpZXMiLCJhY2N1IiwiZGF0YSIsIm1ldGFkYXRhIiwiZGF0YUVtcHR5IiwicHJldmlvdXNTdGF0ZSIsInRvTWVyZ2VQcm9wIiwidG9NZXJnZSIsIm5ld0xheWVycyIsImF1dG9DcmVhdGVMYXllcnMiLCJhZGREZWZhdWx0TGF5ZXJzIiwidG9vbHRpcEZpZWxkcyIsIkFycmF5IiwiaXNBcnJheSIsImFkZERlZmF1bHRUb29sdGlwcyIsInVwZGF0ZWRTdGF0ZSIsInJlbmFtZURhdGFzZXRVcGRhdGVyIiwiZXhpc3RpbmciLCJpbmRleFRvUmV0cmlldmUiLCJtYXBMYXllcnMiLCJsb2FkRmlsZXNVcGRhdGVyIiwiZmlsZXMiLCJvbkZpbmlzaCIsImxvYWRGaWxlc1N1Y2Nlc3MiLCJmcm9tIiwiaW5pdGlhbEZpbGVMb2FkaW5nUHJvZ3Jlc3MiLCJmaWxlQ2FjaGUiLCJmaWxlc1RvTG9hZCIsImxvYWROZXh0RmlsZVVwZGF0ZXIiLCJsb2FkRmlsZVN0ZXBTdWNjZXNzVXBkYXRlciIsImZpbGVOYW1lIiwic3RhdGVXaXRoUHJvZ3Jlc3MiLCJ1cGRhdGVGaWxlTG9hZGluZ1Byb2dyZXNzVXBkYXRlciIsInByb2dyZXNzIiwicGVyY2VudCIsIm1lc3NhZ2UiLCJzdGF0ZVdpdGhDYWNoZSIsImxvYWROZXh0RmlsZSIsImZpbGUiLCJyZW1haW5pbmdGaWxlc1RvTG9hZCIsIm1ha2VMb2FkRmlsZVRhc2siLCJiaW1hcCIsImdlbiIsImNvbnRlbnQiLCJlcnIiLCJwcm9jZXNzRmlsZUNvbnRlbnRVcGRhdGVyIiwicGFyc2VQcm9ncmVzcyIsInByZXZQcm9ncmVzcyIsIm5leHRGaWxlQmF0Y2hVcGRhdGVyIiwiYWNjdW11bGF0ZWQiLCJuZXh0IiwiZG9uZSIsImxvYWRGaWxlc0VyclVwZGF0ZXIiLCJhcHBseUNQVUZpbHRlclVwZGF0ZXIiLCJkYXRhSWRzIiwic2V0TWFwSW5mb1VwZGF0ZXIiLCJlbXB0eSIsImRlZmF1bHRMYXllcnMiLCJmb3VuZExheWVycyIsImNvbmNhdCIsIm1lcmdlZCIsImZpeGVkRG9tYWluIiwiYW5pbWF0YWJsZUxheWVycyIsImFuaW1hdGlvbkRvbWFpbiIsIm1lcmdlZERvbWFpbiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJOdW1iZXIiLCJJbmZpbml0eSIsInNldEVkaXRvck1vZGVVcGRhdGVyIiwic2V0RmVhdHVyZXNVcGRhdGVyIiwibGFzdEZlYXR1cmUiLCJwcm9wZXJ0aWVzIiwiaXNDbG9zZWQiLCJFRElUIiwiZmVhdHVyZSIsImZpbHRlcklkIiwiZmVhdHVyZVZhbHVlIiwiZmlsdGVySWR4IiwiZmlsIiwic2V0U2VsZWN0ZWRGZWF0dXJlVXBkYXRlciIsImRlbGV0ZUZlYXR1cmVVcGRhdGVyIiwic2V0UG9seWdvbkZpbHRlckxheWVyVXBkYXRlciIsIm5ld0xheWVySWQiLCJub25lRmlsdGVyRmVhdHVyZSIsImlzTGF5ZXJJbmNsdWRlZCIsInNvcnRUYWJsZUNvbHVtblVwZGF0ZXIiLCJjb2x1bW4iLCJzb3J0TW9kZSIsImN1cnJlbnRNb2RlIiwiU09SVF9PUkRFUiIsIm0iLCJBU0NFTkRJTkciLCJzb3J0ZWQiLCJwaW5UYWJsZUNvbHVtblVwZGF0ZXIiLCJwaW5uZWRDb2x1bW5zIiwiY28iLCJjb3B5VGFibGVDb2x1bW5VcGRhdGVyIiwiZmllbGRJZHgiLCJ0ZXh0IiwiZGF0YUNvbnRhaW5lciIsInJvdyIsInZhbHVlQXQiLCJqb2luIiwiZGVsZXRlVGFibGVDb2x1bW5VcGRhdGVyIiwibmV3X2RhdGFzZXQiLCJhZGRUYWJsZUNvbHVtblVwZGF0ZXIiLCJkYXRhX3R5cGUiLCJHTVRNb2RpZnlUYWJsZUNvbHVtblVwZGF0ZXIiLCJ2YWx1ZUxpc3QiLCJjb29yZHNNb2RpZnkiLCJwb2lUeXBlIiwidmFsdWVkaWN0IiwieCIsImFkZHJlc3MiLCJsbmciLCJsYXQiLCJwb2l0eXBlIiwib2Rfc3RhcnRpZF9pZHgiLCJEQVRBU0VUX0NPTFVNTlMiLCJvZF9lbmRpZF9pZHgiLCJvZF9zdGFydGFkZF9pZHgiLCJvZF9lbmRhZGRfaWR4Iiwib2Rfc3RhcnRnZW9faWR4Iiwib2RfZW5kZ2VvX2lkeCIsIm9kX3N0YXJ0cG9pX2lkeCIsIm9kX2VuZHBvaV9pZHgiLCJfcm93cyIsInBvaV9pZF9pZHgiLCJwb2lfYWRkX2lkeCIsInBvaV9nZW9faWR4IiwicG9pX3R5cGVfaWR4IiwicHJvY2Vzc29yX3R5cGUiLCJwcmVwcm9jZXNzb3IiLCJwcm9jIiwidGltZSIsIkRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJwcmVmbGFnIiwicHJlYmF0Y2hmbGFnIiwiYWN0aXZhdGVQcm9jZXNzb3JVcGRhdGVyIiwidXBkYXRlVGFibGVDb2x1bW5VcGRhdGVyIiwidG9nZ2xlRWRpdG9yVmlzaWJpbGl0eVVwZGF0ZXIiLCJzZXRGaWx0ZXJBbmltYXRpb25UaW1lQ29uZmlnVXBkYXRlciIsIkZJTFRFUl9UWVBFUyIsInRpbWVSYW5nZSIsInVwZGF0ZXMiLCJjaGVja1RpbWVDb25maWdBcmdzIiwiYWxsb3dlZCIsInNldExheWVyQW5pbWF0aW9uVGltZUNvbmZpZ1VwZGF0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQVFBOztBQUNBOztBQWlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFRQTs7QUFNQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFZQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0EsSUFBTUEsZ0JBQWdCLEdBQUcsSUFBekI7QUFDQTs7QUFFQTs7QUFDTyxJQUFNQyx3QkFB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O0FBRUQsU0FBU2dZLG1CQUFULENBQTZCdFgsTUFBN0IsRUFBcUM7QUFDbkMsTUFBTXVYLE9BQU8sR0FBRyxDQUFDLFlBQUQsRUFBZSxVQUFmLENBQWhCO0FBQ0EsU0FBTzNXLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZYixNQUFaLEVBQW9CeUcsTUFBcEIsQ0FBMkIsVUFBQzBILElBQUQsRUFBT3ZMLElBQVAsRUFBZ0I7QUFDaEQsUUFBSSxDQUFDMlUsT0FBTyxDQUFDalYsUUFBUixDQUFpQk0sSUFBakIsQ0FBTCxFQUE2QjtBQUMzQmlCLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUiwwRkFDb0ZsQixJQURwRjtBQUdBLGFBQU91TCxJQUFQO0FBQ0QsS0FOK0MsQ0FRaEQ7OztBQUNBQSxJQUFBQSxJQUFJLENBQUN2TCxJQUFELENBQUosR0FBYTVDLE1BQU0sQ0FBQzRDLElBQUQsQ0FBbkI7QUFDQSxXQUFPdUwsSUFBUDtBQUNELEdBWE0sRUFXSixFQVhJLENBQVA7QUFZRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTcUosa0NBQVQsQ0FBNENsWSxLQUE1QyxVQUE2RDtBQUFBLE1BQVRVLE1BQVMsVUFBVEEsTUFBUzs7QUFDbEUsTUFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDWCxXQUFPVixLQUFQO0FBQ0Q7O0FBQ0QsTUFBTStYLE9BQU8sR0FBR0MsbUJBQW1CLENBQUN0WCxNQUFELENBQW5DO0FBQ0EsU0FBTyw0QkFBTSxpQkFBTixFQUF5Qiw2QkFBT3FYLE9BQVAsQ0FBekIsRUFBMEMvWCxLQUExQyxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyBAdHMtbm9jaGVja2ltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7ZGlzYWJsZVN0YWNrQ2FwdHVyaW5nLCB3aXRoVGFza30gZnJvbSAncmVhY3QtcGFsbS90YXNrcyc7XG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC5jbG9uZWRlZXAnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0JztcbmltcG9ydCB4b3IgZnJvbSAnbG9kYXNoLnhvcic7XG5pbXBvcnQgY29weSBmcm9tICdjb3B5LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQge3BhcnNlRmllbGRWYWx1ZX0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG4vLyBUYXNrc1xuaW1wb3J0IHtMT0FEX0ZJTEVfVEFTSywgVU5XUkFQX1RBU0ssIFBST0NFU1NfRklMRV9EQVRBLCBERUxBWV9UQVNLfSBmcm9tICd0YXNrcy90YXNrcyc7XG4vLyBBY3Rpb25zXG5pbXBvcnQge1xuICBsb2FkRmlsZXNFcnIsXG4gIGxvYWRGaWxlc1N1Y2Nlc3MsXG4gIGxvYWRGaWxlU3RlcFN1Y2Nlc3MsXG4gIGxvYWROZXh0RmlsZSxcbiAgbmV4dEZpbGVCYXRjaFxufSBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbi8vIFV0aWxzXG5pbXBvcnQge2ZpbmRGaWVsZHNUb1Nob3csIGdldERlZmF1bHRJbnRlcmFjdGlvbn0gZnJvbSAndXRpbHMvaW50ZXJhY3Rpb24tdXRpbHMnO1xuaW1wb3J0IHtcbiAgYXBwbHlGaWx0ZXJGaWVsZE5hbWUsXG4gIGFwcGx5RmlsdGVyc1RvRGF0YXNldHMsXG4gIGZlYXR1cmVUb0ZpbHRlclZhbHVlLFxuICBGSUxURVJfVVBEQVRFUl9QUk9QUyxcbiAgZmlsdGVyRGF0YXNldENQVSxcbiAgZ2VuZXJhdGVQb2x5Z29uRmlsdGVyLFxuICBnZXREZWZhdWx0RmlsdGVyLFxuICBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUsXG4gIGdldEZpbHRlcklkSW5GZWF0dXJlLFxuICBnZXRGaWx0ZXJQbG90LFxuICBnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIsXG4gIGlzSW5SYW5nZSxcbiAgTElNSVRFRF9GSUxURVJfRUZGRUNUX1BST1BTLFxuICB1cGRhdGVGaWx0ZXJEYXRhSWRcbn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcblxuaW1wb3J0IHtERUZBVUxUX1BST0NFU1NPUl9TVFJVQ1RVUkUsIFBST0NFU1NPUl9VUERBVEVSX1BST1BTfSBmcm9tICd1dGlscy9wcm9jZXNzb3ItdXRpbHMnO1xuaW1wb3J0IHthc3NpZ25HcHVDaGFubmVsLCBzZXRGaWx0ZXJHcHVNb2RlfSBmcm9tICd1dGlscy9ncHUtZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7Y3JlYXRlTmV3RGF0YUVudHJ5fSBmcm9tICd1dGlscy9kYXRhc2V0LXV0aWxzJztcbmltcG9ydCB7c29ydERhdGFzZXRCeUNvbHVtbn0gZnJvbSAndXRpbHMvdGFibGUtdXRpbHMva2VwbGVyLXRhYmxlJztcbmltcG9ydCB7c2V0LCB0b0FycmF5LCBhcnJheUluc2VydCwgZ2VuZXJhdGVIYXNoSWR9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHtjYWxjdWxhdGVMYXllckRhdGEsIGZpbmREZWZhdWx0TGF5ZXJ9IGZyb20gJ3V0aWxzL2xheWVyLXV0aWxzJztcblxuaW1wb3J0IHtcbiAgaXNWYWxpZE1lcmdlcixcbiAgVklTX1NUQVRFX01FUkdFUlMsXG4gIHZhbGlkYXRlTGF5ZXJXaXRoRGF0YSxcbiAgY3JlYXRlTGF5ZXJGcm9tQ29uZmlnLFxuICBzZXJpYWxpemVMYXllclxufSBmcm9tICcuL3Zpcy1zdGF0ZS1tZXJnZXInO1xuXG5pbXBvcnQge1xuICBhZGROZXdMYXllcnNUb1NwbGl0TWFwLFxuICBjb21wdXRlU3BsaXRNYXBMYXllcnMsXG4gIHJlbW92ZUxheWVyRnJvbVNwbGl0TWFwc1xufSBmcm9tICd1dGlscy9zcGxpdC1tYXAtdXRpbHMnO1xuXG5pbXBvcnQge0xheWVyLCBMYXllckNsYXNzZXMsIExBWUVSX0lEX0xFTkdUSH0gZnJvbSAnbGF5ZXJzJztcbmltcG9ydCB7REVGQVVMVF9URVhUX0xBQkVMfSBmcm9tICdsYXllcnMvbGF5ZXItZmFjdG9yeSc7XG5pbXBvcnQge0VESVRPUl9NT0RFUywgU09SVF9PUkRFUiwgRklMVEVSX1RZUEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge3BpY2tfLCBtZXJnZV8sIHN3YXBffSBmcm9tICcuL2NvbXBvc2VyLWhlbHBlcnMnO1xuaW1wb3J0IHtwcm9jZXNzRmlsZUNvbnRlbnR9IGZyb20gJ2FjdGlvbnMvdmlzLXN0YXRlLWFjdGlvbnMnO1xuXG5pbXBvcnQgS2VwbGVyR0xTY2hlbWEgZnJvbSAnc2NoZW1hcyc7XG5pbXBvcnQge1xuICBhZGRfZGF0YXNldF9jb2x1bW4sXG4gIGRlbGV0ZV9kYXRhc2V0X2NvbHVtbixcbiAgZ2V0X2lkeF9ieV9uYW1lLFxuICByZXNldF9pbmRleF9kYXRhc2V0XG59IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQtZXh0ZW5zaW9uLXV0aWxzJztcbmltcG9ydCB7XG4gIGJhdGNoX3Byb2Nlc3NpbmdfdGFzayxcbiAgZXhlY3V0ZV9wcm9jZXNzb3IsIGV4ZWN1dGVfcHJvY2Vzc29yX3Rhc2tzLFxuICB1cGRhdGVfZGF0YXNldF9jb2x1bW4sXG4gIHVwZGF0ZVByb2Nlc3NvckRhdGFJZFxufSBmcm9tICcuLi91dGlscy9wcm9jZXNzb3ItdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7RGF0YUZyYW1lfSBmcm9tICdkYXRhZnJhbWUtanMnO1xuaW1wb3J0IHtEQVRBU0VUX0NPTFVNTlN9IGZyb20gJy4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7ZXhwb3J0RGF0YX0gZnJvbSAnLi4vdXRpbHMvZXhwb3J0LXV0aWxzJztcbmltcG9ydCB7Q29tcHJlc3NFeHBvcnREYXRhfSBmcm9tICcuLi91dGlscy9nb29nbGUtdXRpbHMnO1xuXG4vLyB0eXBlIGltcG9ydHNcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLkZpZWxkfSBGaWVsZCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuRmlsdGVyfSBGaWx0ZXIgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLktlcGxlclRhYmxlfSBLZXBsZXJUYWJsZSAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuVmlzU3RhdGV9IFZpc1N0YXRlICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5EYXRhc2V0c30gRGF0YXNldHMgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLkFuaW1hdGlvbkNvbmZpZ30gQW5pbWF0aW9uQ29uZmlnICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5FZGl0b3J9IEVkaXRvciAqL1xuXG4vLyByZWFjdC1wYWxtXG4vLyBkaXNhYmxlIGNhcHR1cmUgZXhjZXB0aW9uIGZvciByZWFjdC1wYWxtIGNhbGwgdG8gd2l0aFRhc2tcbmRpc2FibGVTdGFja0NhcHR1cmluZygpO1xuXG4vKipcbiAqIFVwZGF0ZXJzIGZvciBgdmlzU3RhdGVgIHJlZHVjZXIuIENhbiBiZSB1c2VkIGluIHlvdXIgcm9vdCByZWR1Y2VyIHRvIGRpcmVjdGx5IG1vZGlmeSBrZXBsZXIuZ2wncyBzdGF0ZS5cbiAqIFJlYWQgbW9yZSBhYm91dCBbVXNpbmcgdXBkYXRlcnNdKC4uL2FkdmFuY2VkLXVzYWdlL3VzaW5nLXVwZGF0ZXJzLm1kKVxuICpcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IGtlcGxlckdsUmVkdWNlciwge3Zpc1N0YXRlVXBkYXRlcnN9IGZyb20gJ2tlcGxlci5nbC9yZWR1Y2Vycyc7XG4gKiAvLyBSb290IFJlZHVjZXJcbiAqIGNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAqICBrZXBsZXJHbDoga2VwbGVyR2xSZWR1Y2VyLFxuICogIGFwcDogYXBwUmVkdWNlclxuICogfSk7XG4gKlxuICogY29uc3QgY29tcG9zZWRSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAqICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gKiAgICBjYXNlICdDTElDS19CVVRUT04nOlxuICogICAgICByZXR1cm4ge1xuICogICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgIGtlcGxlckdsOiB7XG4gKiAgICAgICAgICAuLi5zdGF0ZS5rZXBsZXJHbCxcbiAqICAgICAgICAgIGZvbzoge1xuICogICAgICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wuZm9vLFxuICogICAgICAgICAgICAgdmlzU3RhdGU6IHZpc1N0YXRlVXBkYXRlcnMuZW5sYXJnZUZpbHRlclVwZGF0ZXIoXG4gKiAgICAgICAgICAgICAgIHN0YXRlLmtlcGxlckdsLmZvby52aXNTdGF0ZSxcbiAqICAgICAgICAgICAgICAge2lkeDogMH1cbiAqICAgICAgICAgICAgIClcbiAqICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICAgIH07XG4gKiAgfVxuICogIHJldHVybiByZWR1Y2VycyhzdGF0ZSwgYWN0aW9uKTtcbiAqIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29tcG9zZWRSZWR1Y2VyO1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLy8gQHRzLWlnbm9yZVxuY29uc3QgdmlzU3RhdGVVcGRhdGVycyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKiBAdHlwZSB7QW5pbWF0aW9uQ29uZmlnfSAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQU5JTUFUSU9OX0NPTkZJRyA9IHtcbiAgZG9tYWluOiBudWxsLFxuICBjdXJyZW50VGltZTogbnVsbCxcbiAgc3BlZWQ6IDEsXG4gIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgdGltZUZvcm1hdDogbnVsbCxcbiAgdGltZXpvbmU6IG51bGwsXG4gIGRlZmF1bHRUaW1lRm9ybWF0OiBudWxsXG59O1xuXG4vKiogQHR5cGUge0VkaXRvcn0gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VESVRPUiA9IHtcbiAgbW9kZTogRURJVE9SX01PREVTLkRSQVdfUE9MWUdPTixcbiAgZmVhdHVyZXM6IFtdLFxuICBzZWxlY3RlZEZlYXR1cmU6IG51bGwsXG4gIHZpc2libGU6IHRydWVcbn07XG5cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGB2aXNTdGF0ZWBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtWaXNTdGF0ZX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfVklTX1NUQVRFID0ge1xuICAvLyBtYXAgaW5mb1xuICBtYXBJbmZvOiB7XG4gICAgdGl0bGU6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJ1xuICB9LFxuICAvLyBsYXllcnNcbiAgbGF5ZXJzOiBbXSxcbiAgbGF5ZXJEYXRhOiBbXSxcbiAgbGF5ZXJUb0JlTWVyZ2VkOiBbXSxcbiAgbGF5ZXJPcmRlcjogW10sXG5cbiAgLy8gZmlsdGVyc1xuICBmaWx0ZXJzOiBbXSxcbiAgZmlsdGVyVG9CZU1lcmdlZDogW10sXG5cbiAgLy8gYSBjb2xsZWN0aW9uIG9mIG11bHRpcGxlIGRhdGFzZXRcbiAgZGF0YXNldHM6IHt9LFxuICBlZGl0aW5nRGF0YXNldDogdW5kZWZpbmVkLFxuXG4gIC8vcHJvY2Vzc29yXG4gIHByb2Nlc3NvcjogdW5kZWZpbmVkLFxuXG4gIGludGVyYWN0aW9uQ29uZmlnOiBnZXREZWZhdWx0SW50ZXJhY3Rpb24oKSxcbiAgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkOiB1bmRlZmluZWQsXG5cbiAgbGF5ZXJCbGVuZGluZzogJ25vcm1hbCcsXG4gIGhvdmVySW5mbzogdW5kZWZpbmVkLFxuICBjbGlja2VkOiB1bmRlZmluZWQsXG4gIG1vdXNlUG9zOiB7fSxcblxuICAvLyB0aGlzIGlzIHVzZWQgd2hlbiB1c2VyIHNwbGl0IG1hcHNcbiAgc3BsaXRNYXBzOiBbXG4gICAgLy8gdGhpcyB3aWxsIGNvbnRhaW4gYSBsaXN0IG9mIG9iamVjdHMgdG9cbiAgICAvLyBkZXNjcmliZSB0aGUgc3RhdGUgb2YgbGF5ZXIgYXZhaWxhYmlsaXR5IGFuZCB2aXNpYmlsaXR5IGZvciBlYWNoIG1hcFxuICAgIC8vIFtcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgIGxheWVyczoge2xheWVyX2lkOiB0cnVlIHwgZmFsc2V9XG4gICAgLy8gICB9XG4gICAgLy8gXVxuICBdLFxuICBzcGxpdE1hcHNUb0JlTWVyZ2VkOiBbXSxcblxuICAvLyBkZWZhdWx0cyBsYXllciBjbGFzc2VzXG4gIGxheWVyQ2xhc3NlczogTGF5ZXJDbGFzc2VzLFxuXG4gIC8vIGRlZmF1bHQgYW5pbWF0aW9uXG4gIC8vIHRpbWUgaW4gdW5peCB0aW1lc3RhbXAgKG1pbGxpc2Vjb25kcykgKHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaClcbiAgYW5pbWF0aW9uQ29uZmlnOiBERUZBVUxUX0FOSU1BVElPTl9DT05GSUcsXG5cbiAgZWRpdG9yOiBERUZBVUxUX0VESVRPUixcblxuICBmaWxlTG9hZGluZzogZmFsc2UsXG4gIGZpbGVMb2FkaW5nUHJvZ3Jlc3M6IHt9LFxuXG4gIGxvYWRlcnM6IFtdLFxuICBsb2FkT3B0aW9uczoge30sXG5cbiAgLy8gdmlzU3RhdGVNZXJnZXJzXG4gIG1lcmdlcnM6IFZJU19TVEFURV9NRVJHRVJTLFxuXG4gIC8vIGtlcGxlciBzY2hlbWFzXG4gIHNjaGVtYTogS2VwbGVyR0xTY2hlbWFcbn07XG5cbi8qKlxuICogVXBkYXRlIHN0YXRlIHdpdGggdXBkYXRlZCBsYXllciBhbmQgbGF5ZXJEYXRhXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS51cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGF9XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSkge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogc3RhdGUubGF5ZXJzLm1hcCgobHlyLCBpKSA9PiAoaSA9PT0gaWR4ID8gbGF5ZXIgOiBseXIpKSxcbiAgICBsYXllckRhdGE6IGxheWVyRGF0YVxuICAgICAgPyBzdGF0ZS5sYXllckRhdGEubWFwKChkLCBpKSA9PiAoaSA9PT0gaWR4ID8gbGF5ZXJEYXRhIDogZCkpXG4gICAgICA6IHN0YXRlLmxheWVyRGF0YVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdGVPbkxheWVyVmlzaWJpbGl0eUNoYW5nZShzdGF0ZSwgbGF5ZXIpIHtcbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG4gIGlmIChzdGF0ZS5zcGxpdE1hcHMubGVuZ3RoKSB7XG4gICAgbmV3U3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNwbGl0TWFwczogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZVxuICAgICAgICA/IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAoc3RhdGUuc3BsaXRNYXBzLCBsYXllcilcbiAgICAgICAgOiByZW1vdmVMYXllckZyb21TcGxpdE1hcHMoc3RhdGUuc3BsaXRNYXBzLCBsYXllcilcbiAgICB9O1xuICB9XG5cbiAgaWYgKGxheWVyLmNvbmZpZy5hbmltYXRpb24uZW5hYmxlZCkge1xuICAgIG5ld1N0YXRlID0gdXBkYXRlQW5pbWF0aW9uRG9tYWluKHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYmFzZSBjb25maWc6IGRhdGFJZCwgbGFiZWwsIGNvbHVtbiwgaXNWaXNpYmxlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyfVxuICogQHJldHVybnMgbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllckNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXJ9ID0gYWN0aW9uO1xuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkTGF5ZXIuaWQpO1xuICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKGFjdGlvbi5uZXdDb25maWcpO1xuICBpZiAodHlwZW9mIGFjdGlvbi5uZXdDb25maWcuZGF0YUlkID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHtkYXRhSWQsIC4uLnJlc3RDb25maWd9ID0gYWN0aW9uLm5ld0NvbmZpZztcbiAgICBjb25zdCBzdGF0ZVdpdGhEYXRhSWQgPSBsYXllckRhdGFJZENoYW5nZVVwZGF0ZXIoc3RhdGUsIHtcbiAgICAgIG9sZExheWVyLFxuICAgICAgbmV3Q29uZmlnOiB7ZGF0YUlkfVxuICAgIH0pO1xuICAgIGNvbnN0IG5leHRMYXllciA9IHN0YXRlV2l0aERhdGFJZC5sYXllcnMuZmluZChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgICByZXR1cm4gbmV4dExheWVyICYmIE9iamVjdC5rZXlzKHJlc3RDb25maWcpLmxlbmd0aFxuICAgICAgPyBsYXllckNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGVXaXRoRGF0YUlkLCB7b2xkTGF5ZXI6IG5leHRMYXllciwgbmV3Q29uZmlnOiByZXN0Q29uZmlnfSlcbiAgICAgIDogc3RhdGVXaXRoRGF0YUlkO1xuICB9XG5cbiAgbGV0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoYWN0aW9uLm5ld0NvbmZpZyk7XG5cbiAgbGV0IGxheWVyRGF0YTtcblxuICAvLyBsZXQgbmV3TGF5ZXI7XG4gIGlmIChuZXdMYXllci5zaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpKSB7XG4gICAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gICAgY29uc3QgdXBkYXRlTGF5ZXJEYXRhUmVzdWx0ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSwgb2xkTGF5ZXJEYXRhKTtcblxuICAgIGxheWVyRGF0YSA9IHVwZGF0ZUxheWVyRGF0YVJlc3VsdC5sYXllckRhdGE7XG4gICAgbmV3TGF5ZXIgPSB1cGRhdGVMYXllckRhdGFSZXN1bHQubGF5ZXI7XG4gIH1cblxuICBsZXQgbmV3U3RhdGUgPSBzdGF0ZTtcbiAgaWYgKCdpc1Zpc2libGUnIGluIGFjdGlvbi5uZXdDb25maWcpIHtcbiAgICBuZXdTdGF0ZSA9IHVwZGF0ZVN0YXRlT25MYXllclZpc2liaWxpdHlDaGFuZ2Uoc3RhdGUsIG5ld0xheWVyKTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEobmV3U3RhdGUsIHtcbiAgICBsYXllcjogbmV3TGF5ZXIsXG4gICAgbGF5ZXJEYXRhLFxuICAgIGlkeFxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkT3JSZW1vdmVUZXh0TGFiZWxzKG5ld0ZpZWxkcywgdGV4dExhYmVsKSB7XG4gIGxldCBuZXdUZXh0TGFiZWwgPSB0ZXh0TGFiZWwuc2xpY2UoKTtcblxuICBjb25zdCBjdXJyZW50RmllbGRzID0gdGV4dExhYmVsLm1hcCh0bCA9PiB0bC5maWVsZCAmJiB0bC5maWVsZC5uYW1lKS5maWx0ZXIoZCA9PiBkKTtcblxuICBjb25zdCBhZGRGaWVsZHMgPSBuZXdGaWVsZHMuZmlsdGVyKGYgPT4gIWN1cnJlbnRGaWVsZHMuaW5jbHVkZXMoZi5uYW1lKSk7XG4gIGNvbnN0IGRlbGV0ZUZpZWxkcyA9IGN1cnJlbnRGaWVsZHMuZmlsdGVyKGYgPT4gIW5ld0ZpZWxkcy5maW5kKGZkID0+IGZkLm5hbWUgPT09IGYpKTtcblxuICAvLyBkZWxldGVcbiAgbmV3VGV4dExhYmVsID0gbmV3VGV4dExhYmVsLmZpbHRlcih0bCA9PiB0bC5maWVsZCAmJiAhZGVsZXRlRmllbGRzLmluY2x1ZGVzKHRsLmZpZWxkLm5hbWUpKTtcbiAgbmV3VGV4dExhYmVsID0gIW5ld1RleHRMYWJlbC5sZW5ndGggPyBbREVGQVVMVF9URVhUX0xBQkVMXSA6IG5ld1RleHRMYWJlbDtcblxuICAvLyBhZGRcbiAgbmV3VGV4dExhYmVsID0gW1xuICAgIC4uLm5ld1RleHRMYWJlbC5maWx0ZXIodGwgPT4gdGwuZmllbGQpLFxuICAgIC4uLmFkZEZpZWxkcy5tYXAoYWYgPT4gKHtcbiAgICAgIC4uLkRFRkFVTFRfVEVYVF9MQUJFTCxcbiAgICAgIGZpZWxkOiBhZlxuICAgIH0pKVxuICBdO1xuXG4gIHJldHVybiBuZXdUZXh0TGFiZWw7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRleHRMYWJlbFByb3BBbmRWYWx1ZShpZHgsIHByb3AsIHZhbHVlLCB0ZXh0TGFiZWwpIHtcbiAgaWYgKCF0ZXh0TGFiZWxbaWR4XS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgIHJldHVybiB0ZXh0TGFiZWw7XG4gIH1cblxuICBsZXQgbmV3VGV4dExhYmVsID0gdGV4dExhYmVsLnNsaWNlKCk7XG5cbiAgaWYgKHByb3AgJiYgKHZhbHVlIHx8IHRleHRMYWJlbC5sZW5ndGggPT09IDEpKSB7XG4gICAgbmV3VGV4dExhYmVsID0gdGV4dExhYmVsLm1hcCgodGwsIGkpID0+IChpID09PSBpZHggPyB7Li4udGwsIFtwcm9wXTogdmFsdWV9IDogdGwpKTtcbiAgfSBlbHNlIGlmIChwcm9wID09PSAnZmllbGQnICYmIHZhbHVlID09PSBudWxsICYmIHRleHRMYWJlbC5sZW5ndGggPiAxKSB7XG4gICAgLy8gcmVtb3ZlIGxhYmVsIHdoZW4gZmllbGQgdmFsdWUgaXMgc2V0IHRvIG51bGxcbiAgICBuZXdUZXh0TGFiZWwuc3BsaWNlKGlkeCwgMSk7XG4gIH1cblxuICByZXR1cm4gbmV3VGV4dExhYmVsO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciBiYXNlIGNvbmZpZzogZGF0YUlkLCBsYWJlbCwgY29sdW1uLCBpc1Zpc2libGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllclRleHRMYWJlbENoYW5nZVVwZGF0ZXJ9XG4gKiBAcmV0dXJucyBuZXh0U3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVGV4dExhYmVsQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgaWR4LCBwcm9wLCB2YWx1ZX0gPSBhY3Rpb247XG4gIGNvbnN0IHt0ZXh0TGFiZWx9ID0gb2xkTGF5ZXIuY29uZmlnO1xuXG4gIGxldCBuZXdUZXh0TGFiZWwgPSB0ZXh0TGFiZWwuc2xpY2UoKTtcbiAgaWYgKCF0ZXh0TGFiZWxbaWR4XSAmJiBpZHggPT09IHRleHRMYWJlbC5sZW5ndGgpIHtcbiAgICAvLyBpZiBpZHggaXMgc2V0IHRvIGxlbmd0aCwgYWRkIGVtcHR5IHRleHQgbGFiZWxcbiAgICBuZXdUZXh0TGFiZWwgPSBbLi4udGV4dExhYmVsLCBERUZBVUxUX1RFWFRfTEFCRUxdO1xuICB9XG5cbiAgaWYgKGlkeCA9PT0gJ2FsbCcgJiYgcHJvcCA9PT0gJ2ZpZWxkcycpIHtcbiAgICBuZXdUZXh0TGFiZWwgPSBhZGRPclJlbW92ZVRleHRMYWJlbHModmFsdWUsIHRleHRMYWJlbCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3VGV4dExhYmVsID0gdXBkYXRlVGV4dExhYmVsUHJvcEFuZFZhbHVlKGlkeCwgcHJvcCwgdmFsdWUsIG5ld1RleHRMYWJlbCk7XG4gIH1cbiAgLy8gdXBkYXRlIHRleHQgbGFiZWwgcHJvcCBhbmQgdmFsdWVcbiAgcmV0dXJuIGxheWVyQ29uZmlnQ2hhbmdlVXBkYXRlcihzdGF0ZSwge1xuICAgIG9sZExheWVyLFxuICAgIG5ld0NvbmZpZzoge3RleHRMYWJlbDogbmV3VGV4dExhYmVsfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFeGlzdGluZ0xheWVyV2l0aERhdGEoZGF0YXNldCwgbGF5ZXJDbGFzc2VzLCBsYXllcikge1xuICBjb25zdCBsb2FkZWRMYXllciA9IHNlcmlhbGl6ZUxheWVyKGxheWVyKTtcbiAgcmV0dXJuIHZhbGlkYXRlTGF5ZXJXaXRoRGF0YShkYXRhc2V0LCBsb2FkZWRMYXllciwgbGF5ZXJDbGFzc2VzLCB7XG4gICAgYWxsb3dFbXB0eUNvbHVtbjogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgY29uZmlnIGRhdGFJZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxheWVyRGF0YUlkQ2hhbmdlVXBkYXRlcn1cbiAqIEByZXR1cm5zIG5leHRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJEYXRhSWRDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyLCBuZXdDb25maWd9ID0gYWN0aW9uO1xuICBjb25zdCB7ZGF0YUlkfSA9IG5ld0NvbmZpZztcblxuICBpZiAoIW9sZExheWVyIHx8ICFzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRMYXllci5pZCk7XG5cbiAgbGV0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe2RhdGFJZH0pO1xuICAvLyB0aGlzIG1heSBoYXBwZW4gd2hlbiBhIGxheWVyIGlzIG5ldyAodHlwZTogbnVsbCBhbmQgbm8gY29sdW1ucykgYnV0IGl0J3Mgbm90IHJlYWR5IHRvIGJlIHNhdmVkXG4gIGlmIChuZXdMYXllci5pc1ZhbGlkVG9TYXZlKCkpIHtcbiAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0ZUV4aXN0aW5nTGF5ZXJXaXRoRGF0YShcbiAgICAgIHN0YXRlLmRhdGFzZXRzW2RhdGFJZF0sXG4gICAgICBzdGF0ZS5sYXllckNsYXNzZXMsXG4gICAgICBuZXdMYXllclxuICAgICk7XG4gICAgLy8gaWYgY2FudCB2YWxpZGF0ZSBpdCB3aXRoIGRhdGEgY3JlYXRlIGEgbmV3IG9uZVxuICAgIGlmICghdmFsaWRhdGVkKSB7XG4gICAgICBuZXdMYXllciA9IG5ldyBzdGF0ZS5sYXllckNsYXNzZXNbb2xkTGF5ZXIudHlwZV0oe2RhdGFJZCwgaWQ6IG9sZExheWVyLmlkfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0xheWVyID0gdmFsaWRhdGVkO1xuICAgIH1cbiAgfVxuXG4gIG5ld0xheWVyID0gbmV3TGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgIGlzVmlzaWJsZTogb2xkTGF5ZXIuY29uZmlnLmlzVmlzaWJsZSxcbiAgICBpc0NvbmZpZ0FjdGl2ZTogdHJ1ZVxuICB9KTtcblxuICBuZXdMYXllci51cGRhdGVMYXllckRvbWFpbihzdGF0ZS5kYXRhc2V0cyk7XG4gIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUsIHVuZGVmaW5lZCk7XG5cbiAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB0eXBlLiBQcmV2aWV3cyBsYXllciBjb25maWcgd2lsbCBiZSBjb3BpZWQgaWYgYXBwbGljYWJsZS5cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllclR5cGVDaGFuZ2VVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJUeXBlQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3VHlwZX0gPSBhY3Rpb247XG4gIGlmICghb2xkTGF5ZXIpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qgb2xkSWQgPSBvbGRMYXllci5pZDtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZElkKTtcblxuICBpZiAoIXN0YXRlLmxheWVyQ2xhc3Nlc1tuZXdUeXBlXSkge1xuICAgIENvbnNvbGUuZXJyb3IoYCR7bmV3VHlwZX0gaXMgbm90IGEgdmFsaWQgbGF5ZXIgdHlwZWApO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIGdldCBhIG1pbnQgbGF5ZXIsIHdpdGggbmV3IGlkIGFuZCB0eXBlXG4gIC8vIGJlY2F1c2UgZGVjay5nbCB1c2VzIGlkIHRvIG1hdGNoIGJldHdlZW4gbmV3IGFuZCBvbGQgbGF5ZXIuXG4gIC8vIElmIHR5cGUgaGFzIGNoYW5nZWQgYnV0IGlkIGlzIHRoZSBzYW1lLCBpdCB3aWxsIGJyZWFrXG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IHN0YXRlLmxheWVyQ2xhc3Nlc1tuZXdUeXBlXSgpO1xuXG4gIG5ld0xheWVyLmFzc2lnbkNvbmZpZ1RvTGF5ZXIob2xkTGF5ZXIuY29uZmlnLCBvbGRMYXllci52aXNDb25maWdTZXR0aW5ncyk7XG5cbiAgbmV3TGF5ZXIudXBkYXRlTGF5ZXJEb21haW4oc3RhdGUuZGF0YXNldHMpO1xuICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlKTtcbiAgbGV0IG5ld1N0YXRlID0gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG5cbiAgaWYgKGxheWVyLmNvbmZpZy5hbmltYXRpb24uZW5hYmxlZCB8fCBvbGRMYXllci5jb25maWcuYW5pbWF0aW9uLmVuYWJsZWQpIHtcbiAgICBuZXdTdGF0ZSA9IHVwZGF0ZUFuaW1hdGlvbkRvbWFpbihuZXdTdGF0ZSk7XG4gIH1cblxuICAvLyB1cGRhdGUgc3BsaXRNYXAgbGF5ZXIgaWRcbiAgaWYgKHN0YXRlLnNwbGl0TWFwcy5sZW5ndGgpIHtcbiAgICBuZXdTdGF0ZSA9IHtcbiAgICAgIC4uLm5ld1N0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBuZXdTdGF0ZS5zcGxpdE1hcHMubWFwKHNldHRpbmdzID0+IHtcbiAgICAgICAgY29uc3Qge1tvbGRJZF06IG9sZExheWVyTWFwLCAuLi5vdGhlckxheWVyc30gPSBzZXR0aW5ncy5sYXllcnM7XG4gICAgICAgIHJldHVybiBvbGRJZCBpbiBzZXR0aW5ncy5sYXllcnNcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICAgICAgICAgIGxheWVyczoge1xuICAgICAgICAgICAgICAgIC4uLm90aGVyTGF5ZXJzLFxuICAgICAgICAgICAgICAgIFtsYXllci5pZF06IG9sZExheWVyTWFwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHNldHRpbmdzO1xuICAgICAgfSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB2aXN1YWwgY2hhbm5lbFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXJ9XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXIsIG5ld0NvbmZpZywgY2hhbm5lbH0gPSBhY3Rpb247XG4gIGlmICghb2xkTGF5ZXIuY29uZmlnLmRhdGFJZCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbb2xkTGF5ZXIuY29uZmlnLmRhdGFJZF07XG5cbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgbmV3TGF5ZXIgPSBvbGRMYXllci51cGRhdGVMYXllckNvbmZpZyhuZXdDb25maWcpO1xuXG4gIG5ld0xheWVyLnVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbChkYXRhc2V0LCBjaGFubmVsKTtcblxuICBjb25zdCBvbGRMYXllckRhdGEgPSBzdGF0ZS5sYXllckRhdGFbaWR4XTtcbiAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSwgb2xkTGF5ZXJEYXRhKTtcblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIGB2aXNDb25maWdgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyfSA9IGFjdGlvbjtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhY3Rpb24ubmV3VmlzQ29uZmlnKTtcbiAgY29uc3QgbmV3VmlzQ29uZmlnID0ge1xuICAgIC4uLm9sZExheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgLi4uYWN0aW9uLm5ld1Zpc0NvbmZpZ1xuICB9O1xuXG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe3Zpc0NvbmZpZzogbmV3VmlzQ29uZmlnfSk7XG5cbiAgaWYgKG5ld0xheWVyLnNob3VsZENhbGN1bGF0ZUxheWVyRGF0YShwcm9wcykpIHtcbiAgICBjb25zdCBvbGRMYXllckRhdGEgPSBzdGF0ZS5sYXllckRhdGFbaWR4XTtcbiAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlLCBvbGRMYXllckRhdGEpO1xuICAgIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllcjogbmV3TGF5ZXIsIGlkeH0pO1xufVxuXG4vL2RpZmZlcmVuY2Ugd2l0aCBwcm9jZXNzb3IgYW5kIGZpbHRlcjogcHJvY2Vzc29yIG9ubHkgbmVlZCB0byByZXJlbmRlciBvbmNlO1xuLy9zZXZlcmFsIHByb2Nlc3NvcnM6IGdlb21ldHJ5IHByb2Nlc3NvciwgY29sdW1uIHByb2Nlc3NvcjogZ2VvbWV0cnkgcHJvY2Vzc29yOiBjaGFuZ2UgYmFzZWRcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9jZXNzb3JVcGRhdGVyKHN0YXRlLGFjdGlvbil7XG4gIGNvbnNvbGUubG9nKCdzZXQgcHJvY2Vzc29yIGV4YW1wbGUnKVxuICBjb25zdCB7cHJvcCwgdmFsdWUsIHZhbHVlSW5kZXggPSAwfSA9IGFjdGlvbjtcbiAgLy8gc3RhdGUuY3VycmVudFByb2Nyc3NvcltpZHhdXG4gIGNvbnN0IG9sZFByb2Nlc3NvciA9IHN0YXRlLnByb2Nlc3NvclxuICBsZXQgbmV3UHJvY2Vzc29yID0gc2V0KFtwcm9wXSwgdmFsdWUsIG9sZFByb2Nlc3Nvcj9vbGRQcm9jZXNzb3I6REVGQVVMVF9QUk9DRVNTT1JfU1RSVUNUVVJFKTtcblxuICBsZXQgbmV3U3RhdGUgPSBzdGF0ZTtcblxuICBjb25zdCB7ZGF0YUlkfSA9IG5ld1Byb2Nlc3NvclxuXG4gIHN3aXRjaCAocHJvcCl7XG4gICAgY2FzZSBQUk9DRVNTT1JfVVBEQVRFUl9QUk9QUy5kYXRhSWQ6XG4gICAgICAvLyBpZiB0cnlpbmcgdG8gdXBkYXRlIGZpbHRlciBkYXRhSWQuIGNyZWF0ZSBhbiBlbXB0eSBuZXcgZmlsdGVyXG4gICAgICBuZXdQcm9jZXNzb3IgPSB1cGRhdGVQcm9jZXNzb3JEYXRhSWQoZGF0YUlkKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIGNhc2UgUFJPQ0VTU09SX1VQREFURVJfUFJPUFMucGFpcjpcbiAgICAvLyAgIG5ld1Byb2Nlc3NvciA9IHVwZGF0ZVByb2Nlc3NvckRhdGFJZCgpO1xuICB9XG5cbiAgbmV3U3RhdGUgPSBzZXQoWydwcm9jZXNzb3InXSwgbmV3UHJvY2Vzc29yLCBuZXdTdGF0ZSk7XG4gIHJldHVybiBuZXdTdGF0ZVxuXG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByb2Nlc3NvclVwZGF0ZXIoc3RhdGUpe1xuLy8gICByZXR1cm4gc2V0KFsncHJvY2Vzc29yJ10sIG51bGwsIHN0YXRlKTtcbi8vIH1cblxuLy9cbmV4cG9ydCBmdW5jdGlvbiBydW5Qcm9jZXNzb3JVcGRhdGVyKHN0YXRlLHZpc1N0YXRlQWN0aW9uKXtcbiAgY29uc29sZS5sb2coJ3J1biBwcm9jZXNzb3IgdXBkYXRlciBoZXJlJylcbiAgY29uc3Qge3Byb2Nlc3NvcixkYXRhc2V0c30gPSBzdGF0ZVxuICBjb25zdCB7ZGF0YUlkLGlkLG5hbWV9ID0gcHJvY2Vzc29yXG5cbiAgaWYoZGF0YUlkICYmIGlkICYmIG5hbWUpe1xuICAgICAgLy9vdXRwdXQgc2hvdWxkIGluY2x1ZGVcblxuXG4gICAgICAgY29uc3Qge2RhdGFzZXQsZmxhZ30gPSBleGVjdXRlX3Byb2Nlc3NvcihkYXRhc2V0cyxwcm9jZXNzb3IpXG4gICAgICAgaWYoZmxhZyA9PT0gMSl7XG4gICAgICAgICAvLyBsZXQgbmV3U3RhdGUgPSBzZXQoWydwcm9jZXNzb3InLGZsYWddLGZhbHNlLHN0YXRlKVxuICAgICAgICAgLy8gdmlzU3RhdGVBY3Rpb24udmlzU3RhdGVBY3Rpb24ucmVtb3ZlUHJvY2Vzc29yKHRydWUpXG4gICAgICAgICByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWRdLCBkYXRhc2V0LCByZW1vdmVQcm9jZXNzb3JVcGRhdGVyKHN0YXRlLHRydWUpKTtcbiAgICAgICB9XG4gICAgICBpZihmbGFnID09PSAyKXtcbiAgICAgICAvL2hlcmUgY2FsbCBhbm90aGVyIHRhc2tcbiAgICAgICBwcm9jZXNzb3IuYXR0cnMgPSB7Li4ucHJvY2Vzc29yLmF0dHJzLC4uLntkYXRhSWQ6ZGF0YUlkfX1cbiAgICAgICBjb25zdCB0YXNrcyA9IGV4ZWN1dGVfcHJvY2Vzc29yX3Rhc2tzKGRhdGFzZXRzLHByb2Nlc3Nvcix2aXNTdGF0ZUFjdGlvbilcbiAgICAgICAvL2hlcmUgd2l0aCB0YXNrIG9ubHkgaW5jbHVkZSBkYXRhIGNoYW5nZT9cbiAgICAgICByZXR1cm4gd2l0aFRhc2soc3RhdGUsdGFza3MpXG4gICAgIH1cbiAgICAgaWYoZmxhZyA9PT0gMCl7XG4gICAgICAgY29uc29sZS5sb2coJ2RhdGFzZXRzIGV4YW1wbGUnKVxuICAgICAgIHN0YXRlID0gc2V0KFsnZGF0YXNldHMnXSxkYXRhc2V0LHJlbW92ZVByb2Nlc3NvclVwZGF0ZXIoc3RhdGUsdHJ1ZSwxKSlcbiAgICAgICByZXR1cm4gcHJvY2Vzc29yLmF0dHJzLnJlcGxhY2U/cmVyZW5kZXJXaXRoRGF0YXNldChzdGF0ZSxkYXRhc2V0W2RhdGFJZF0pOnVwZGF0ZVZpc0RhdGFVcGRhdGVyKHN0YXRlLHtkYXRhc2V0czp7J21lcmdlZCc6ZGF0YXNldFsnbWVyZ2VkJ119LHJlcmVuZGVyOnRydWV9KVxuICAgICB9XG4gIH1cblxuXG4gIHJldHVybiBzdGF0ZVxufVxuXG4vL2ZpbmlzaGVkOiBkb3dubG9hZGluZyBleHBvcnQgZmlsZXMsIGlmIG5vdCBmaW5pc2hlZCwgc3RyYXRlZ3k6IHJ1bm5pbmcgdGVtcG9yYWwgcHJvY2Vzc2luZyBhdCBmaXJzdCwgdGhlbiBydW5uaW5nIHNwYXRpYWwgcHJvY2Vzc2luZ1xuZXhwb3J0IGZ1bmN0aW9uIHJ1blByb2Nlc3NvckJhdGNoVXBkYXRlcihzdGF0ZSx2aXNTdGF0ZUFjdGlvbil7XG4gIGNvbnN0IHtwcm9jZXNzb3IsZGF0YXNldHN9ID0gc3RhdGVcbiAgY29uc3Qge2JhdGNofSA9IHByb2Nlc3NvclxuXG4gIGxldCBuZXdfZGF0YXNldHMgPSBfLmNsb25lRGVlcChkYXRhc2V0cylcblxuICBjb25zdCB7b2RkYXRhSUQsIGdwc2RhdGFJRCwgcG9pZGF0YUlELCBzcGF0aWFsRmlsdGVyLCB0ZW1wb3JhbEZpbHRlciwgYXBpa2V5LGV4cG9ydFNldHRpbmd9ID0gYmF0Y2hcblxuICBjb25zb2xlLmxvZygncnVuIHByb2Nlc3NvciBiYXRjaCB1cGRhdGVyJylcblxuICBjb25zdCB7cmVzdWx0LGZsYWd9ID0gYmF0Y2hfcHJvY2Vzc2luZ190YXNrKG5ld19kYXRhc2V0cyxiYXRjaCx2aXNTdGF0ZUFjdGlvbilcblxuICBpZihmbGFnID09PSAxKXtcbiAgICAvL2hlcmUgY2huZ2UgdG8gcmVkdWNlXG4gICAgdHJ5e1xuICAgICAgc3RhdGUgPSBbYmF0Y2gub2RkYXRhSUQsYmF0Y2guZ3BzZGF0YUlELGJhdGNoLnBvaWRhdGFJRF0ucmVkdWNlKChzdCxpZCk9PmlkP3JlcmVuZGVyV2l0aERhdGFzZXQoc3QsbmV3X2RhdGFzZXRzW2lkXSk6c3Qsc3RhdGUpXG4gICAgICBDb21wcmVzc0V4cG9ydERhdGEoc3RhdGUse3NlbGVjdGVkRGF0YXNldDogJycsIGRhdGFUeXBlOiAnQ1NWJywgZmlsdGVyZWQ6IGZhbHNlfSx0cnVlKVxuICAgICAgcmV0dXJuIHJlbW92ZVByb2Nlc3NvclVwZGF0ZXIoc3RhdGUsdHJ1ZSwwKVxuICAgIH1jYXRjaCAoZSkge1xuICAgICAgcmVtb3ZlUHJvY2Vzc29yVXBkYXRlcihzdGF0ZSxmYWxzZSwwKVxuICAgIH1cblxuICB9XG5cbiAgZWxzZXtcbiAgICByZXR1cm4gd2l0aFRhc2soc3RhdGUscmVzdWx0KVxuICB9XG5cbiAgLy/ov5nph4znmoTpl67popjmmK9sYXllcu+8n1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVyZW5kZXJXaXRoRGF0YXNldChzdGF0ZSwgbmV3RGF0YVNldCl7XG4gIHN0YXRlID0gcmVtb3ZlRGF0YXNldFVwZGF0ZXIoc3RhdGUse2RhdGFJZDpuZXdEYXRhU2V0LmlkfSlcbiAgc3RhdGUgPSBzZXQoWydkYXRhc2V0cycsbmV3RGF0YVNldC5pZF0sbmV3RGF0YVNldCxzdGF0ZSlcbiAgcmV0dXJuIHVwZGF0ZVZpc0RhdGFVcGRhdGVyKHN0YXRlLHtkYXRhc2V0czp7W25ld0RhdGFTZXQuaWRdOm5ld0RhdGFTZXR9LHJlcmVuZGVyOnRydWV9KVxufVxuXG4vKipcbiAqIFVwZGF0ZSBmaWx0ZXIgcHJvcGVydHlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRGaWx0ZXJBbmltYXRpb25UaW1lVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlckFuaW1hdGlvblRpbWVVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgcmV0dXJuIHNldEZpbHRlclVwZGF0ZXIoc3RhdGUsIGFjdGlvbik7XG59XG5cbi8qKlxuICogVXBkYXRlIGZpbHRlciBhbmltYXRpb24gd2luZG93XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0RmlsdGVyQW5pbWF0aW9uV2luZG93VXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlckFuaW1hdGlvbldpbmRvd1VwZGF0ZXIoc3RhdGUsIHtpZCwgYW5pbWF0aW9uV2luZG93fSkge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKGYgPT5cbiAgICAgIGYuaWQgPT09IGlkXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgIGFuaW1hdGlvbldpbmRvd1xuICAgICAgICAgIH1cbiAgICAgICAgOiBmXG4gICAgKVxuICB9O1xufVxuLyoqXG4gKiBVcGRhdGUgZmlsdGVyIHByb3BlcnR5XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0RmlsdGVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlclVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7aWR4LCBwcm9wLCB2YWx1ZSwgdmFsdWVJbmRleCA9IDB9ID0gYWN0aW9uO1xuICBjb25zdCBvbGRGaWx0ZXIgPSBzdGF0ZS5maWx0ZXJzW2lkeF07XG4gIGNvbnNvbGUubG9nKCdzZXRGaWx0ZXJVcGRhdGVyIGhlcmUnKVxuXG4gIGlmICghb2xkRmlsdGVyKSB7XG4gICAgQ29uc29sZS5lcnJvcihgZmlsdGVycy4ke2lkeH0gaXMgdW5kZWZpbmVkYCk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGxldCBuZXdGaWx0ZXIgPSBzZXQoW3Byb3BdLCB2YWx1ZSwgb2xkRmlsdGVyKTtcbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG5cbiAgY29uc3Qge2RhdGFJZH0gPSBuZXdGaWx0ZXI7XG5cbiAgLy8gRW5zdXJpbmcgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICBsZXQgZGF0YXNldElkcyA9IHRvQXJyYXkoZGF0YUlkKTtcblxuICBzd2l0Y2ggKHByb3ApIHtcbiAgICAvLyBUT0RPOiBOZXh0IFBSIGZvciBVSSBpZiB3ZSB1cGRhdGUgZGF0YUlkLCB3ZSBuZWVkIHRvIGNvbnNpZGVyIHR3byBjYXNlczpcbiAgICAvLyAxLiBkYXRhSWQgaXMgZW1wdHk6IGNyZWF0ZSBhIGRlZmF1bHQgZmlsdGVyXG4gICAgLy8gMi4gQWRkIGEgbmV3IGRhdGFzZXQgaWRcbiAgICBjYXNlIEZJTFRFUl9VUERBVEVSX1BST1BTLmRhdGFJZDpcbiAgICAgIC8vIGlmIHRyeWluZyB0byB1cGRhdGUgZmlsdGVyIGRhdGFJZC4gY3JlYXRlIGFuIGVtcHR5IG5ldyBmaWx0ZXJcbiAgICAgIG5ld0ZpbHRlciA9IHVwZGF0ZUZpbHRlckRhdGFJZChkYXRhSWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEZJTFRFUl9VUERBVEVSX1BST1BTLm5hbWU6XG4gICAgICAvLyB3ZSBhcmUgc3VwcG9ydGluZyB0aGUgY3VycmVudCBmdW5jdGlvbmFsaXR5XG4gICAgICAvLyBUT0RPOiBOZXh0IFBSIGZvciBVSSBmaWx0ZXIgbmFtZSB3aWxsIG9ubHkgdXBkYXRlIGZpbHRlciBuYW1lIGJ1dCBpdCB3b24ndCBoYXZlIHNpZGUgZWZmZWN0c1xuICAgICAgLy8gd2UgYXJlIGdvbm5hIHVzZSBwYWlyIG9mIGRhdGFzZXRzIGFuZCBmaWVsZElkeCB0byB1cGRhdGUgdGhlIGZpbHRlclxuICAgICAgY29uc3QgZGF0YXNldElkID0gbmV3RmlsdGVyLmRhdGFJZFt2YWx1ZUluZGV4XTtcbiAgICAgIGNvbnN0IHtmaWx0ZXI6IHVwZGF0ZWRGaWx0ZXIsIGRhdGFzZXQ6IG5ld0RhdGFzZXR9ID0gYXBwbHlGaWx0ZXJGaWVsZE5hbWUoXG4gICAgICAgIG5ld0ZpbHRlcixcbiAgICAgICAgc3RhdGUuZGF0YXNldHNbZGF0YXNldElkXSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHZhbHVlSW5kZXgsXG4gICAgICAgIHttZXJnZURvbWFpbjogZmFsc2V9XG4gICAgICApO1xuICAgICAgaWYgKCF1cGRhdGVkRmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgbmV3RmlsdGVyID0gdXBkYXRlZEZpbHRlcjtcblxuICAgICAgaWYgKG5ld0ZpbHRlci5ncHUpIHtcbiAgICAgICAgbmV3RmlsdGVyID0gc2V0RmlsdGVyR3B1TW9kZShuZXdGaWx0ZXIsIHN0YXRlLmZpbHRlcnMpO1xuICAgICAgICBuZXdGaWx0ZXIgPSBhc3NpZ25HcHVDaGFubmVsKG5ld0ZpbHRlciwgc3RhdGUuZmlsdGVycyk7XG4gICAgICB9XG5cbiAgICAgIG5ld1N0YXRlID0gc2V0KFsnZGF0YXNldHMnLCBkYXRhc2V0SWRdLCBuZXdEYXRhc2V0LCBzdGF0ZSk7XG5cbiAgICAgIC8vIG9ubHkgZmlsdGVyIHRoZSBjdXJyZW50IGRhdGFzZXRcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRklMVEVSX1VQREFURVJfUFJPUFMubGF5ZXJJZDpcbiAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIG9ubHkgZGF0YXNldElkL3MgaWYgd2UgaGF2ZSBhZGRlZC9yZW1vdmVkIGxheWVyc1xuICAgICAgLy8gLSBjaGVjayBmb3IgbGF5ZXJJZCBjaGFuZ2VzIChYT1Igd29ya3MgYmVjYXVzZSBvZiBzdHJpbmcgdmFsdWVzKVxuICAgICAgLy8gaWYgbm8gZGlmZmVyZW5jZXMgYmV0d2VlbiBsYXllcklkcywgZG9uJ3QgZG8gYW55IGZpbHRlcmluZ1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgbGF5ZXJJZERpZmZlcmVuY2UgPSB4b3IobmV3RmlsdGVyLmxheWVySWQsIG9sZEZpbHRlci5sYXllcklkKTtcblxuICAgICAgY29uc3QgbGF5ZXJEYXRhSWRzID0gdW5pcShcbiAgICAgICAgbGF5ZXJJZERpZmZlcmVuY2VcbiAgICAgICAgICAubWFwKGxpZCA9PlxuICAgICAgICAgICAgZ2V0KFxuICAgICAgICAgICAgICBzdGF0ZS5sYXllcnMuZmluZChsID0+IGwuaWQgPT09IGxpZCksXG4gICAgICAgICAgICAgIFsnY29uZmlnJywgJ2RhdGFJZCddXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5maWx0ZXIoZCA9PiBkKVxuICAgICAgKTtcblxuICAgICAgLy8gb25seSBmaWx0ZXIgZGF0YXNldHNJZHNcbiAgICAgIGRhdGFzZXRJZHMgPSBsYXllckRhdGFJZHM7XG5cbiAgICAgIC8vIFVwZGF0ZSBuZXdGaWx0ZXIgZGF0YUlkc1xuICAgICAgY29uc3QgbmV3RGF0YUlkcyA9IHVuaXEoXG4gICAgICAgIG5ld0ZpbHRlci5sYXllcklkXG4gICAgICAgICAgLm1hcChsaWQgPT5cbiAgICAgICAgICAgIGdldChcbiAgICAgICAgICAgICAgc3RhdGUubGF5ZXJzLmZpbmQobCA9PiBsLmlkID09PSBsaWQpLFxuICAgICAgICAgICAgICBbJ2NvbmZpZycsICdkYXRhSWQnXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuZmlsdGVyKGQgPT4gZClcbiAgICAgICk7XG5cbiAgICAgIG5ld0ZpbHRlciA9IHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICBkYXRhSWQ6IG5ld0RhdGFJZHNcbiAgICAgIH07XG5cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnN0IGVubGFyZ2VkRmlsdGVyID0gc3RhdGUuZmlsdGVycy5maW5kKGYgPT4gZi5lbmxhcmdlZCk7XG5cbiAgaWYgKGVubGFyZ2VkRmlsdGVyICYmIGVubGFyZ2VkRmlsdGVyLmlkICE9PSBuZXdGaWx0ZXIuaWQpIHtcbiAgICAvLyB0aGVyZSBzaG91bGQgYmUgb25seSBvbmUgZW5sYXJnZWQgZmlsdGVyXG4gICAgbmV3RmlsdGVyLmVubGFyZ2VkID0gZmFsc2U7XG4gIH1cblxuICAvLyBzYXZlIG5ldyBmaWx0ZXJzIHRvIG5ld1N0YXRlXG4gIG5ld1N0YXRlID0gc2V0KFsnZmlsdGVycycsIGlkeF0sIG5ld0ZpbHRlciwgbmV3U3RhdGUpO1xuXG4gIC8vIGlmIHdlIGFyZSBjdXJyZW50bHkgc2V0dGluZyBhIHByb3AgdGhhdCBvbmx5IHJlcXVpcmVzIHRvIGZpbHRlciB0aGUgY3VycmVudFxuICAvLyBkYXRhc2V0IHdlIHdpbGwgcGFzcyBvbmx5IHRoZSBjdXJyZW50IGRhdGFzZXQgdG8gYXBwbHlGaWx0ZXJzVG9EYXRhc2V0cyBhbmRcbiAgLy8gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhIG90aGVyd2lzZSB3ZSBwYXNzIHRoZSBhbGwgbGlzdCBvZiBkYXRhc2V0cyBhcyBkZWZpbmVkIGluIGRhdGFJZFxuICBjb25zdCBkYXRhc2V0SWRzVG9GaWx0ZXIgPSBMSU1JVEVEX0ZJTFRFUl9FRkZFQ1RfUFJPUFNbcHJvcF1cbiAgICA/IFtkYXRhc2V0SWRzW3ZhbHVlSW5kZXhdXVxuICAgIDogZGF0YXNldElkcztcblxuICAvLyBmaWx0ZXIgZGF0YVxuICBjb25zdCBmaWx0ZXJlZERhdGFzZXRzID0gYXBwbHlGaWx0ZXJzVG9EYXRhc2V0cyhcbiAgICBkYXRhc2V0SWRzVG9GaWx0ZXIsXG4gICAgbmV3U3RhdGUuZGF0YXNldHMsXG4gICAgbmV3U3RhdGUuZmlsdGVycyxcbiAgICBuZXdTdGF0ZS5sYXllcnNcbiAgKTtcblxuICBuZXdTdGF0ZSA9IHNldChbJ2RhdGFzZXRzJ10sIGZpbHRlcmVkRGF0YXNldHMsIG5ld1N0YXRlKTtcbiAgLy8gZGF0YUlkIGlzIGFuIGFycmF5XG4gIC8vIHBhc3Mgb25seSB0aGUgZGF0YXNldCB3ZSBuZWVkIHRvIHVwZGF0ZVxuICBuZXdTdGF0ZSA9IHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShuZXdTdGF0ZSwgZGF0YXNldElkc1RvRmlsdGVyLCBuZXdGaWx0ZXIpO1xuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHByb3BlcnR5IG9mIGEgZmlsdGVyIHBsb3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRGaWx0ZXJQbG90VXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEZpbHRlclBsb3RVcGRhdGVyID0gKHN0YXRlLCB7aWR4LCBuZXdQcm9wLCB2YWx1ZUluZGV4ID0gMH0pID0+IHtcbiAgbGV0IG5ld0ZpbHRlciA9IHsuLi5zdGF0ZS5maWx0ZXJzW2lkeF0sIC4uLm5ld1Byb3B9O1xuICBjb25zdCBwcm9wID0gT2JqZWN0LmtleXMobmV3UHJvcClbMF07XG4gIGlmIChwcm9wID09PSAneUF4aXMnKSB7XG4gICAgY29uc3QgcGxvdFR5cGUgPSBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUobmV3RmlsdGVyKTtcbiAgICAvLyBUT0RPOiBwbG90IGlzIG5vdCBzdXBwb3J0ZWQgaW4gbXVsdGkgZGF0YXNldCBmaWx0ZXIgZm9yIG5vd1xuICAgIGlmIChwbG90VHlwZSkge1xuICAgICAgbmV3RmlsdGVyID0ge1xuICAgICAgICAuLi5uZXdGaWx0ZXIsXG4gICAgICAgIC4uLmdldEZpbHRlclBsb3Qoey4uLm5ld0ZpbHRlciwgcGxvdFR5cGV9LCBzdGF0ZS5kYXRhc2V0c1tuZXdGaWx0ZXIuZGF0YUlkW3ZhbHVlSW5kZXhdXSksXG4gICAgICAgIHBsb3RUeXBlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoKGYsIGkpID0+IChpID09PSBpZHggPyBuZXdGaWx0ZXIgOiBmKSlcbiAgfTtcbn07XG5cbi8qKlxuICogQWRkIGEgbmV3IGZpbHRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmFkZEZpbHRlclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gICFhY3Rpb24uZGF0YUlkXG4gICAgPyBzdGF0ZVxuICAgIDoge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyczogWy4uLnN0YXRlLmZpbHRlcnMsIGdldERlZmF1bHRGaWx0ZXIoYWN0aW9uLmRhdGFJZCldXG4gICAgICB9O1xuXG4vKipcbiAqIFNldCBsYXllciBjb2xvciBwYWxldHRlIHVpIHN0YXRlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubGF5ZXJDb2xvclVJQ2hhbmdlVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGxheWVyQ29sb3JVSUNoYW5nZVVwZGF0ZXIgPSAoc3RhdGUsIHtvbGRMYXllciwgcHJvcCwgbmV3Q29uZmlnfSkgPT4ge1xuICBjb25zdCBvbGRWaXhDb25maWcgPSBvbGRMYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BdO1xuICBjb25zdCBuZXdMYXllciA9IG9sZExheWVyLnVwZGF0ZUxheWVyQ29sb3JVSShwcm9wLCBuZXdDb25maWcpO1xuICBjb25zdCBuZXdWaXNDb25maWcgPSBuZXdMYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BdO1xuICBpZiAob2xkVml4Q29uZmlnICE9PSBuZXdWaXNDb25maWcpIHtcbiAgICByZXR1cm4gbGF5ZXJWaXNDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCB7XG4gICAgICBvbGRMYXllcixcbiAgICAgIG5ld1Zpc0NvbmZpZzoge1xuICAgICAgICBbcHJvcF06IG5ld1Zpc0NvbmZpZ1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBzdGF0ZS5sYXllcnMubWFwKGwgPT4gKGwuaWQgPT09IG9sZExheWVyLmlkID8gbmV3TGF5ZXIgOiBsKSlcbiAgfTtcbn07XG5cbi8qKlxuICogU3RhcnQgYW5kIGVuZCBmaWx0ZXIgYW5pbWF0aW9uXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudG9nZ2xlRmlsdGVyQW5pbWF0aW9uVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlckFuaW1hdGlvblVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiAoaSA9PT0gYWN0aW9uLmlkeCA/IHsuLi5mLCBpc0FuaW1hdGluZzogIWYuaXNBbmltYXRpbmd9IDogZikpXG59KTtcblxuLyoqXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudG9nZ2xlTGF5ZXJBbmltYXRpb25VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTGF5ZXJBbmltYXRpb25VcGRhdGVyID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGFuaW1hdGlvbkNvbmZpZzoge1xuICAgIC4uLnN0YXRlLmFuaW1hdGlvbkNvbmZpZyxcbiAgICBpc0FuaW1hdGluZzogIXN0YXRlLmFuaW1hdGlvbkNvbmZpZy5pc0FuaW1hdGluZ1xuICB9XG59KTtcblxuLyoqXG4gKiBIaWRlIGFuZCBzaG93IGxheWVyIGFuaW1hdGlvbiBjb250cm9sXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudG9nZ2xlTGF5ZXJBbmltYXRpb25Db250cm9sVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUxheWVyQW5pbWF0aW9uQ29udHJvbFVwZGF0ZXIgPSBzdGF0ZSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgYW5pbWF0aW9uQ29uZmlnOiB7XG4gICAgLi4uc3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuICAgIGhpZGVDb250cm9sOiAhc3RhdGUuYW5pbWF0aW9uQ29uZmlnLmhpZGVDb250cm9sXG4gIH1cbn0pO1xuXG4vKipcbiAqIENoYW5nZSBmaWx0ZXIgYW5pbWF0aW9uIHNwZWVkXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudXBkYXRlRmlsdGVyQW5pbWF0aW9uU3BlZWRVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlRmlsdGVyQW5pbWF0aW9uU3BlZWRVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGFjdGlvbi5pZHggPyB7Li4uZiwgc3BlZWQ6IGFjdGlvbi5zcGVlZH0gOiBmKSlcbn0pO1xuXG4vKipcbiAqIFJlc2V0IGFuaW1hdGlvbiBjb25maWcgY3VycmVudCB0aW1lIHRvIGEgc3BlY2lmaWVkIHZhbHVlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0TGF5ZXJBbmltYXRpb25UaW1lVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRMYXllckFuaW1hdGlvblRpbWVVcGRhdGVyID0gKHN0YXRlLCB7dmFsdWV9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgYW5pbWF0aW9uQ29uZmlnOiB7XG4gICAgLi4uc3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuICAgIGN1cnJlbnRUaW1lOiB2YWx1ZVxuICB9XG59KTtcblxuLyoqXG4gKiBVcGRhdGUgYW5pbWF0aW9uIHNwZWVkIHdpdGggdGhlIHZlcnRpY2FsIHNwZWVkIHNsaWRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnVwZGF0ZUxheWVyQW5pbWF0aW9uU3BlZWRVcGRhdGVyfVxuICogQHB1YmxpY1xuICpcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUxheWVyQW5pbWF0aW9uU3BlZWRVcGRhdGVyID0gKHN0YXRlLCB7c3BlZWR9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgYW5pbWF0aW9uQ29uZmlnOiB7XG4gICAgICAuLi5zdGF0ZS5hbmltYXRpb25Db25maWcsXG4gICAgICBzcGVlZFxuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogU2hvdyBsYXJnZXIgdGltZSBmaWx0ZXIgYXQgYm90dG9tIGZvciB0aW1lIHBsYXliYWNrIChhcHBseSB0byB0aW1lIGZpbHRlciBvbmx5KVxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLmVubGFyZ2VGaWx0ZXJVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgZW5sYXJnZUZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PlxuICAgICAgaSA9PT0gYWN0aW9uLmlkeFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICBlbmxhcmdlZDogIWYuZW5sYXJnZWRcbiAgICAgICAgICB9XG4gICAgICAgIDogZlxuICAgIClcbiAgfTtcbn07XG5cbi8qKlxuICogVG9nZ2xlcyBmaWx0ZXIgZmVhdHVyZSB2aXNpYmlsaXR5XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudG9nZ2xlRmlsdGVyRmVhdHVyZVVwZGF0ZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJGZWF0dXJlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IGZpbHRlciA9IHN0YXRlLmZpbHRlcnNbYWN0aW9uLmlkeF07XG4gIGNvbnN0IGlzVmlzaWJsZSA9IGdldChmaWx0ZXIsIFsndmFsdWUnLCAncHJvcGVydGllcycsICdpc1Zpc2libGUnXSk7XG4gIGNvbnN0IG5ld0ZpbHRlciA9IHtcbiAgICAuLi5maWx0ZXIsXG4gICAgdmFsdWU6IGZlYXR1cmVUb0ZpbHRlclZhbHVlKGZpbHRlci52YWx1ZSwgZmlsdGVyLmlkLCB7XG4gICAgICBpc1Zpc2libGU6ICFpc1Zpc2libGVcbiAgICB9KVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUuZmlsdGVyc10sIHtbYWN0aW9uLmlkeF06IG5ld0ZpbHRlcn0pXG4gIH07XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIGZpbHRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnJlbW92ZUZpbHRlclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge2lkeH0gPSBhY3Rpb247XG4gIGNvbnN0IHtkYXRhSWQsIGlkfSA9IHN0YXRlLmZpbHRlcnNbaWR4XTtcblxuICBjb25zdCBuZXdGaWx0ZXJzID0gW1xuICAgIC4uLnN0YXRlLmZpbHRlcnMuc2xpY2UoMCwgaWR4KSxcbiAgICAuLi5zdGF0ZS5maWx0ZXJzLnNsaWNlKGlkeCArIDEsIHN0YXRlLmZpbHRlcnMubGVuZ3RoKVxuICBdO1xuXG4gIGNvbnN0IGZpbHRlcmVkRGF0YXNldHMgPSBhcHBseUZpbHRlcnNUb0RhdGFzZXRzKGRhdGFJZCwgc3RhdGUuZGF0YXNldHMsIG5ld0ZpbHRlcnMsIHN0YXRlLmxheWVycyk7XG4gIGNvbnN0IG5ld0VkaXRvciA9XG4gICAgZ2V0RmlsdGVySWRJbkZlYXR1cmUoc3RhdGUuZWRpdG9yLnNlbGVjdGVkRmVhdHVyZSkgPT09IGlkXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgICAgICAgc2VsZWN0ZWRGZWF0dXJlOiBudWxsXG4gICAgICAgIH1cbiAgICAgIDogc3RhdGUuZWRpdG9yO1xuXG4gIGxldCBuZXdTdGF0ZSA9IHNldChbJ2ZpbHRlcnMnXSwgbmV3RmlsdGVycywgc3RhdGUpO1xuICBuZXdTdGF0ZSA9IHNldChbJ2RhdGFzZXRzJ10sIGZpbHRlcmVkRGF0YXNldHMsIG5ld1N0YXRlKTtcbiAgbmV3U3RhdGUgPSBzZXQoWydlZGl0b3InXSwgbmV3RWRpdG9yLCBuZXdTdGF0ZSk7XG5cbiAgcmV0dXJuIHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShuZXdTdGF0ZSwgZGF0YUlkLCB1bmRlZmluZWQpO1xufTtcblxuLyoqXG4gKiBBZGQgYSBuZXcgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5hZGRMYXllclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRMYXllclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBsZXQgbmV3TGF5ZXI7XG4gIGxldCBuZXdMYXllckRhdGE7XG4gIGlmIChhY3Rpb24uY29uZmlnKSB7XG4gICAgbmV3TGF5ZXIgPSBjcmVhdGVMYXllckZyb21Db25maWcoc3RhdGUsIGFjdGlvbi5jb25maWcpO1xuICAgIGlmICghbmV3TGF5ZXIpIHtcbiAgICAgIENvbnNvbGUud2FybihcbiAgICAgICAgJ0ZhaWxlZCB0byBjcmVhdGUgbGF5ZXIgZnJvbSBjb25maWcsIGl0IHVzdWFsbHkgbWVhbnMgdGhlIGNvbmZpZyBpcyBub3QgYmUgaW4gY29ycmVjdCBmb3JtYXQnLFxuICAgICAgICBhY3Rpb24uY29uZmlnXG4gICAgICApO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUpO1xuICAgIG5ld0xheWVyID0gcmVzdWx0LmxheWVyO1xuICAgIG5ld0xheWVyRGF0YSA9IHJlc3VsdC5sYXllckRhdGE7XG4gIH0gZWxzZSB7XG4gICAgLy8gY3JlYXRlIGFuIGVtcHR5IGxheWVyIHdpdGggdGhlIGZpcnN0IGF2YWlsYWJsZSBkYXRhc2V0XG4gICAgY29uc3QgZGVmYXVsdERhdGFzZXQgPSBPYmplY3Qua2V5cyhzdGF0ZS5kYXRhc2V0cylbMF07XG4gICAgbmV3TGF5ZXIgPSBuZXcgTGF5ZXIoe1xuICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgaXNDb25maWdBY3RpdmU6IHRydWUsXG4gICAgICBkYXRhSWQ6IGRlZmF1bHREYXRhc2V0XG4gICAgfSk7XG4gICAgbmV3TGF5ZXJEYXRhID0ge307XG4gIH1cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5zdGF0ZS5sYXllcnMsIG5ld0xheWVyXSxcbiAgICBsYXllckRhdGE6IFsuLi5zdGF0ZS5sYXllckRhdGEsIG5ld0xheWVyRGF0YV0sXG4gICAgbGF5ZXJPcmRlcjogWy4uLnN0YXRlLmxheWVyT3JkZXIsIHN0YXRlLmxheWVyT3JkZXIubGVuZ3RoXSxcbiAgICBzcGxpdE1hcHM6IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAoc3RhdGUuc3BsaXRNYXBzLCBuZXdMYXllcilcbiAgfTtcbn07XG5cbi8qKlxuICogcmVtb3ZlIGxheWVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykucmVtb3ZlTGF5ZXJVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTGF5ZXJVcGRhdGVyID0gKHN0YXRlLCB7aWR4fSkgPT4ge1xuICBjb25zdCB7bGF5ZXJzLCBsYXllckRhdGEsIGNsaWNrZWQsIGhvdmVySW5mb30gPSBzdGF0ZTtcbiAgY29uc3QgbGF5ZXJUb1JlbW92ZSA9IHN0YXRlLmxheWVyc1tpZHhdO1xuICBjb25zdCBuZXdNYXBzID0gcmVtb3ZlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLnNwbGl0TWFwcywgbGF5ZXJUb1JlbW92ZSk7XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBbLi4ubGF5ZXJzLnNsaWNlKDAsIGlkeCksIC4uLmxheWVycy5zbGljZShpZHggKyAxLCBsYXllcnMubGVuZ3RoKV0sXG4gICAgbGF5ZXJEYXRhOiBbLi4ubGF5ZXJEYXRhLnNsaWNlKDAsIGlkeCksIC4uLmxheWVyRGF0YS5zbGljZShpZHggKyAxLCBsYXllckRhdGEubGVuZ3RoKV0sXG4gICAgbGF5ZXJPcmRlcjogc3RhdGUubGF5ZXJPcmRlci5maWx0ZXIoaSA9PiBpICE9PSBpZHgpLm1hcChwaWQgPT4gKHBpZCA+IGlkeCA/IHBpZCAtIDEgOiBwaWQpKSxcbiAgICBjbGlja2VkOiBsYXllclRvUmVtb3ZlLmlzTGF5ZXJIb3ZlcmVkKGNsaWNrZWQpID8gdW5kZWZpbmVkIDogY2xpY2tlZCxcbiAgICBob3ZlckluZm86IGxheWVyVG9SZW1vdmUuaXNMYXllckhvdmVyZWQoaG92ZXJJbmZvKSA/IHVuZGVmaW5lZCA6IGhvdmVySW5mbyxcbiAgICBzcGxpdE1hcHM6IG5ld01hcHNcbiAgICAvLyBUT0RPOiB1cGRhdGUgZmlsdGVycywgY3JlYXRlIGhlbHBlciB0byByZW1vdmUgbGF5ZXIgZm9ybSBmaWx0ZXIgKHJlbW92ZSBsYXllcmlkIGFuZCBkYXRhaWQpIGlmIG1hcHBlZFxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVBbmltYXRpb25Eb21haW4obmV3U3RhdGUpO1xufTtcblxuLyoqXG4gKiBkdXBsaWNhdGUgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5kdXBsaWNhdGVMYXllclVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBkdXBsaWNhdGVMYXllclVwZGF0ZXIgPSAoc3RhdGUsIHtpZHh9KSA9PiB7XG4gIGNvbnN0IHtsYXllcnN9ID0gc3RhdGU7XG4gIGNvbnN0IG9yaWdpbmFsID0gc3RhdGUubGF5ZXJzW2lkeF07XG4gIGNvbnN0IG9yaWdpbmFsTGF5ZXJPcmRlcklkeCA9IHN0YXRlLmxheWVyT3JkZXIuZmluZEluZGV4KGkgPT4gaSA9PT0gaWR4KTtcblxuICBpZiAoIW9yaWdpbmFsKSB7XG4gICAgQ29uc29sZS53YXJuKGBsYXllci4ke2lkeH0gaXMgdW5kZWZpbmVkYCk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGxldCBuZXdMYWJlbCA9IGBDb3B5IG9mICR7b3JpZ2luYWwuY29uZmlnLmxhYmVsfWA7XG4gIGxldCBwb3N0Zml4ID0gMDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xuICB3aGlsZSAobGF5ZXJzLmZpbmQobCA9PiBsLmNvbmZpZy5sYWJlbCA9PT0gbmV3TGFiZWwpKSB7XG4gICAgbmV3TGFiZWwgPSBgQ29weSBvZiAke29yaWdpbmFsLmNvbmZpZy5sYWJlbH0gJHsrK3Bvc3RmaXh9YDtcbiAgfVxuXG4gIC8vIGNvbGxlY3QgbGF5ZXIgY29uZmlnIGZyb20gb3JpZ2luYWxcbiAgY29uc3QgbG9hZGVkTGF5ZXIgPSBzZXJpYWxpemVMYXllcihvcmlnaW5hbCk7XG5cbiAgLy8gYXNzaWduIG5ldyBpZCBhbmQgbGFiZWwgdG8gY29waWVkIGxheWVyXG4gIGlmICghbG9hZGVkTGF5ZXIuY29uZmlnKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGxvYWRlZExheWVyLmNvbmZpZy5sYWJlbCA9IG5ld0xhYmVsO1xuICBsb2FkZWRMYXllci5pZCA9IGdlbmVyYXRlSGFzaElkKExBWUVSX0lEX0xFTkdUSCk7XG5cbiAgLy8gYWRkIGxheWVyIHRvIHN0YXRlXG4gIGxldCBuZXh0U3RhdGUgPSBhZGRMYXllclVwZGF0ZXIoc3RhdGUsIHtjb25maWc6IGxvYWRlZExheWVyfSk7XG5cbiAgLy8gbmV3IGFkZGVkIGxheWVyIGFyZSBhdCB0aGUgZW5kLCBtb3ZlIGl0IHRvIGJlIG9uIHRvcCBvZiBvcmlnaW5hbCBsYXllclxuICBjb25zdCBuZXdMYXllck9yZGVySWR4ID0gbmV4dFN0YXRlLmxheWVyT3JkZXIubGVuZ3RoIC0gMTtcbiAgY29uc3QgbmV3TGF5ZXJPcmRlciA9IGFycmF5SW5zZXJ0KFxuICAgIG5leHRTdGF0ZS5sYXllck9yZGVyLnNsaWNlKDAsIG5ld0xheWVyT3JkZXJJZHgpLFxuICAgIG9yaWdpbmFsTGF5ZXJPcmRlcklkeCxcbiAgICBuZXdMYXllck9yZGVySWR4XG4gICk7XG5cbiAgbmV4dFN0YXRlID0ge1xuICAgIC4uLm5leHRTdGF0ZSxcbiAgICBsYXllck9yZGVyOiBuZXdMYXllck9yZGVyXG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZUFuaW1hdGlvbkRvbWFpbihuZXh0U3RhdGUpO1xufTtcblxuLyoqXG4gKiBSZW9yZGVyIGxheWVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykucmVvcmRlckxheWVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlb3JkZXJMYXllclVwZGF0ZXIgPSAoc3RhdGUsIHtvcmRlcn0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBsYXllck9yZGVyOiBvcmRlclxufSk7XG5cbi8qKlxuICogUmVtb3ZlIGEgZGF0YXNldCBhbmQgYWxsIGxheWVycywgZmlsdGVycywgdG9vbHRpcCBjb25maWdzIHRoYXQgYmFzZWQgb24gaXRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5yZW1vdmVEYXRhc2V0VXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZURhdGFzZXRVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8gZXh0cmFjdCBkYXRhc2V0IGtleVxuICBjb25zdCB7ZGF0YUlkOiBkYXRhc2V0S2V5fSA9IGFjdGlvbjtcbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIC8vIGNoZWNrIGlmIGRhdGFzZXQgaXMgcHJlc2VudFxuICBpZiAoIWRhdGFzZXRzW2RhdGFzZXRLZXldKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgY29uc3Qge1xuICAgIGxheWVycyxcbiAgICBkYXRhc2V0czoge1tkYXRhc2V0S2V5XTogZGF0YXNldCwgLi4ubmV3RGF0YXNldHN9XG4gIH0gPSBzdGF0ZTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gIGNvbnN0IGluZGV4ZXMgPSBsYXllcnMucmVkdWNlKChsaXN0T2ZJbmRleGVzLCBsYXllciwgaW5kZXgpID0+IHtcbiAgICBpZiAobGF5ZXIuY29uZmlnLmRhdGFJZCA9PT0gZGF0YXNldEtleSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbGlzdE9mSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RPZkluZGV4ZXM7XG4gIH0sIFtdKTtcblxuICAvLyByZW1vdmUgbGF5ZXJzIGFuZCBkYXRhc2V0c1xuICBjb25zdCB7bmV3U3RhdGV9ID0gaW5kZXhlcy5yZWR1Y2UoXG4gICAgKHtuZXdTdGF0ZTogY3VycmVudFN0YXRlLCBpbmRleENvdW50ZXJ9LCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGlkeCAtIGluZGV4Q291bnRlcjtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHJlbW92ZUxheWVyVXBkYXRlcihjdXJyZW50U3RhdGUsIHtpZHg6IGN1cnJlbnRJbmRleH0pO1xuICAgICAgaW5kZXhDb3VudGVyKys7XG4gICAgICByZXR1cm4ge25ld1N0YXRlOiBjdXJyZW50U3RhdGUsIGluZGV4Q291bnRlcn07XG4gICAgfSxcbiAgICB7bmV3U3RhdGU6IHsuLi5zdGF0ZSwgZGF0YXNldHM6IG5ld0RhdGFzZXRzfSwgaW5kZXhDb3VudGVyOiAwfVxuICApO1xuXG4gIC8vIHJlbW92ZSBmaWx0ZXJzXG4gIGNvbnN0IGZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gIWZpbHRlci5kYXRhSWQuaW5jbHVkZXMoZGF0YXNldEtleSkpO1xuXG4gIC8vIHVwZGF0ZSBpbnRlcmFjdGlvbkNvbmZpZ1xuICBsZXQge2ludGVyYWN0aW9uQ29uZmlnfSA9IHN0YXRlO1xuICBjb25zdCB7dG9vbHRpcH0gPSBpbnRlcmFjdGlvbkNvbmZpZztcbiAgaWYgKHRvb2x0aXApIHtcbiAgICBjb25zdCB7Y29uZmlnfSA9IHRvb2x0aXA7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBjb25zdCB7W2RhdGFzZXRLZXldOiBmaWVsZHMsIC4uLmZpZWxkc1RvU2hvd30gPSBjb25maWcuZmllbGRzVG9TaG93O1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBpbnRlcmFjdGlvbkNvbmZpZyA9IHtcbiAgICAgIC4uLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgdG9vbHRpcDogey4uLnRvb2x0aXAsIGNvbmZpZzogey4uLmNvbmZpZywgZmllbGRzVG9TaG93fX1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsuLi5uZXdTdGF0ZSwgZmlsdGVycywgaW50ZXJhY3Rpb25Db25maWd9O1xufTtcblxuLyoqXG4gKiB1cGRhdGUgbGF5ZXIgYmxlbmRpbmcgbW9kZVxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnVwZGF0ZUxheWVyQmxlbmRpbmdVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlTGF5ZXJCbGVuZGluZ1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxheWVyQmxlbmRpbmc6IGFjdGlvbi5tb2RlXG59KTtcblxuLyoqXG4gKiBEaXNwbGF5IGRhdGFzZXQgdGFibGUgaW4gYSBtb2RhbFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnNob3dEYXRhc2V0VGFibGVVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2hvd0RhdGFzZXRUYWJsZVVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGVkaXRpbmdEYXRhc2V0OiBhY3Rpb24uZGF0YUlkXG4gIH07XG59O1xuXG4vKipcbiAqIHJlc2V0IHZpc1N0YXRlIHRvIGluaXRpYWwgU3RhdGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5yZXNldE1hcENvbmZpZ1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZXNldE1hcENvbmZpZ1VwZGF0ZXIgPSBzdGF0ZSA9PiAoe1xuICAuLi5JTklUSUFMX1ZJU19TVEFURSxcbiAgLi4uc3RhdGUuaW5pdGlhbFN0YXRlLFxuICBpbml0aWFsU3RhdGU6IHN0YXRlLmluaXRpYWxTdGF0ZVxufSk7XG5cbi8qKlxuICogUHJvcGFnYXRlIGB2aXNTdGF0ZWAgcmVkdWNlciB3aXRoIGEgbmV3IGNvbmZpZ3VyYXRpb24uIEN1cnJlbnQgY29uZmlnIHdpbGwgYmUgb3ZlcnJpZGUuXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykucmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZWNlaXZlTWFwQ29uZmlnVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IHtjb25maWcgPSB7fSwgb3B0aW9ucyA9IHt9fX0pID0+IHtcbiAgaWYgKCFjb25maWcudmlzU3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCB7a2VlcEV4aXN0aW5nQ29uZmlnfSA9IG9wdGlvbnM7XG5cbiAgLy8gcmVzZXQgY29uZmlnIGlmIGtlZXBFeGlzdGluZ0NvbmZpZyBpcyBmYWxzeVxuICBsZXQgbWVyZ2VkU3RhdGUgPSAha2VlcEV4aXN0aW5nQ29uZmlnID8gcmVzZXRNYXBDb25maWdVcGRhdGVyKHN0YXRlKSA6IHN0YXRlO1xuICBmb3IgKGNvbnN0IG1lcmdlciBvZiBzdGF0ZS5tZXJnZXJzKSB7XG4gICAgaWYgKGlzVmFsaWRNZXJnZXIobWVyZ2VyKSAmJiBjb25maWcudmlzU3RhdGVbbWVyZ2VyLnByb3BdKSB7XG4gICAgICBtZXJnZWRTdGF0ZSA9IG1lcmdlci5tZXJnZShtZXJnZWRTdGF0ZSwgY29uZmlnLnZpc1N0YXRlW21lcmdlci5wcm9wXSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1lcmdlZFN0YXRlO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGxheWVyIGhvdmVyIGV2ZW50IHdpdGggaG92ZXJlZCBvYmplY3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sYXllckhvdmVyVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGxheWVySG92ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBob3ZlckluZm86IGFjdGlvbi5pbmZvXG59KTtcblxuLyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuXG4vKipcbiAqIFVwZGF0ZSBgaW50ZXJhY3Rpb25Db25maWdgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuaW50ZXJhY3Rpb25Db25maWdDaGFuZ2VVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJhY3Rpb25Db25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge2NvbmZpZ30gPSBhY3Rpb247XG5cbiAgY29uc3QgaW50ZXJhY3Rpb25Db25maWcgPSB7XG4gICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcsXG4gICAgLi4ue1tjb25maWcuaWRdOiBjb25maWd9XG4gIH07XG5cbiAgLy8gRG9uJ3QgZW5hYmxlIHRvb2x0aXAgYW5kIGJydXNoIGF0IHRoZSBzYW1lIHRpbWVcbiAgLy8gYnV0IGNvb3JkaW5hdGVzIGNhbiBiZSBzaG93biBhdCBhbGwgdGltZVxuICBjb25zdCBjb250cmFkaWN0ID0gWydicnVzaCcsICd0b29sdGlwJ107XG5cbiAgaWYgKFxuICAgIGNvbnRyYWRpY3QuaW5jbHVkZXMoY29uZmlnLmlkKSAmJlxuICAgIGNvbmZpZy5lbmFibGVkICYmXG4gICAgIXN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2NvbmZpZy5pZF0uZW5hYmxlZFxuICApIHtcbiAgICAvLyBvbmx5IGVuYWJsZSBvbmUgaW50ZXJhY3Rpb24gYXQgYSB0aW1lXG4gICAgY29udHJhZGljdC5mb3JFYWNoKGsgPT4ge1xuICAgICAgaWYgKGsgIT09IGNvbmZpZy5pZCkge1xuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZ1trXSA9IHsuLi5pbnRlcmFjdGlvbkNvbmZpZ1trXSwgZW5hYmxlZDogZmFsc2V9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfTtcblxuICBpZiAoY29uZmlnLmlkID09PSAnZ2VvY29kZXInICYmICFjb25maWcuZW5hYmxlZCkge1xuICAgIHJldHVybiByZW1vdmVEYXRhc2V0VXBkYXRlcihuZXdTdGF0ZSwge2RhdGFJZDogJ2dlb2NvZGVyX2RhdGFzZXQnfSk7XG4gIH1cblxuICByZXR1cm4gbmV3U3RhdGU7XG59XG5cbi8qKlxuICogVHJpZ2dlciBsYXllciBjbGljayBldmVudCB3aXRoIGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubGF5ZXJDbGlja1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsYXllckNsaWNrVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbW91c2VQb3M6IHN0YXRlLmludGVyYWN0aW9uQ29uZmlnLmNvb3JkaW5hdGUuZW5hYmxlZFxuICAgID8ge1xuICAgICAgICAuLi5zdGF0ZS5tb3VzZVBvcyxcbiAgICAgICAgcGlubmVkOiBzdGF0ZS5tb3VzZVBvcy5waW5uZWQgPyBudWxsIDogY2xvbmVEZWVwKHN0YXRlLm1vdXNlUG9zKVxuICAgICAgfVxuICAgIDogc3RhdGUubW91c2VQb3MsXG4gIGNsaWNrZWQ6IGFjdGlvbi5pbmZvICYmIGFjdGlvbi5pbmZvLnBpY2tlZCA/IGFjdGlvbi5pbmZvIDogbnVsbFxufSk7XG5cbi8qKlxuICogVHJpZ2dlciBtYXAgY2xpY2sgZXZlbnQsIHVuc2VsZWN0IGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubWFwQ2xpY2tVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbWFwQ2xpY2tVcGRhdGVyID0gc3RhdGUgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGNsaWNrZWQ6IG51bGxcbiAgfTtcbn07XG5cbi8qKlxuICogVHJpZ2dlciBtYXAgbW92ZSBldmVudFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLm1vdXNlTW92ZVVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBtb3VzZU1vdmVVcGRhdGVyID0gKHN0YXRlLCB7ZXZ0fSkgPT4ge1xuICBpZiAoT2JqZWN0LnZhbHVlcyhzdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZykuc29tZShjb25maWcgPT4gY29uZmlnLmVuYWJsZWQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbW91c2VQb3M6IHtcbiAgICAgICAgLi4uc3RhdGUubW91c2VQb3MsXG4gICAgICAgIG1vdXNlUG9zaXRpb246IFsuLi5ldnQucG9pbnRdLFxuICAgICAgICBjb29yZGluYXRlOiBbLi4uZXZ0LmxuZ0xhdF1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcbi8qKlxuICogVG9nZ2xlIHZpc2liaWxpdHkgb2YgYSBsYXllciBmb3IgYSBzcGxpdCBtYXBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS50b2dnbGVTcGxpdE1hcFVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTcGxpdE1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgc3RhdGUuc3BsaXRNYXBzICYmIHN0YXRlLnNwbGl0TWFwcy5sZW5ndGggPT09IDBcbiAgICA/IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC8vIG1heWJlIHdlIHNob3VsZCB1c2UgYW4gYXJyYXkgdG8gc3RvcmUgc3RhdGUgZm9yIGEgc2luZ2xlIG1hcCBhcyB3ZWxsXG4gICAgICAgIC8vIGlmIGN1cnJlbnQgbWFwcyBsZW5ndGggaXMgZXF1YWwgdG8gMCBpdCBtZWFucyB0aGF0IHdlIGFyZSBhYm91dCB0byBzcGxpdCB0aGUgdmlld1xuICAgICAgICBzcGxpdE1hcHM6IGNvbXB1dGVTcGxpdE1hcExheWVycyhzdGF0ZS5sYXllcnMpXG4gICAgICB9XG4gICAgOiBjbG9zZVNwZWNpZmljTWFwQXRJbmRleChzdGF0ZSwgYWN0aW9uKTtcblxuLyoqXG4gKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBhIGxheWVyIGluIGEgc3BsaXQgbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykudG9nZ2xlTGF5ZXJGb3JNYXBVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTGF5ZXJGb3JNYXBVcGRhdGVyID0gKHN0YXRlLCB7bWFwSW5kZXgsIGxheWVySWR9KSA9PiB7XG4gIGNvbnN0IHtzcGxpdE1hcHN9ID0gc3RhdGU7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBzcGxpdE1hcHM6IHNwbGl0TWFwcy5tYXAoKHNtLCBpKSA9PlxuICAgICAgaSA9PT0gbWFwSW5kZXhcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAuLi5zcGxpdE1hcHNbaV0sXG4gICAgICAgICAgICBsYXllcnM6IHtcbiAgICAgICAgICAgICAgLi4uc3BsaXRNYXBzW2ldLmxheWVycyxcbiAgICAgICAgICAgICAgLy8gaWYgbGF5ZXJJZCBub3QgaW4gbGF5ZXJzLCBzZXQgaXQgdG8gdmlzaWJsZVxuICAgICAgICAgICAgICBbbGF5ZXJJZF06ICFzcGxpdE1hcHNbaV0ubGF5ZXJzW2xheWVySWRdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICA6IHNtXG4gICAgKVxuICB9O1xufTtcblxuLyoqXG4gKiBBZGQgbmV3IGRhdGFzZXQgdG8gYHZpc1N0YXRlYCwgd2l0aCBvcHRpb24gdG8gbG9hZCBhIG1hcCBjb25maWcgYWxvbmcgd2l0aCB0aGUgZGF0YXNldHNcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS51cGRhdGVWaXNEYXRhVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5leHBvcnQgY29uc3QgdXBkYXRlVmlzRGF0YVVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zb2xlLmxvZygndXBkYXRlIHZpcyBkYXRhJyk7XG4gIC8vIGRhdGFzZXRzIGNhbiBiZSBhIHNpbmdsZSBkYXRhIGVudHJpZXMgb3IgYW4gYXJyYXkgb2YgbXVsdGlwbGUgZGF0YSBlbnRyaWVzXG4gIGNvbnN0IHtjb25maWcsIG9wdGlvbnN9ID0gYWN0aW9uO1xuICBjb25zdCBkYXRhc2V0cyA9IHRvQXJyYXkoYWN0aW9uLmRhdGFzZXRzKTtcblxuXG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3Qge3JlcmVuZGVyfSA9IGFjdGlvbjtcblxuICBjb25zdCBuZXdEYXRhRW50cmllcyA9IHJlcmVuZGVyP2RhdGFzZXRzWzBdOmRhdGFzZXRzLnJlZHVjZShcbiAgICAoYWNjdSwge2luZm8gPSB7fSwgZGF0YSwgbWV0YWRhdGF9ID0ge30pID0+ICh7XG4gICAgICAuLi5hY2N1LFxuICAgICAgLi4uKGNyZWF0ZU5ld0RhdGFFbnRyeSh7aW5mbywgZGF0YSwgbWV0YWRhdGF9LCBzdGF0ZS5kYXRhc2V0cykgfHwge30pXG4gICAgfSksXG4gICAge31cbiAgKTtcblxuICBjb25zdCBkYXRhRW1wdHkgPSBPYmplY3Qua2V5cyhuZXdEYXRhRW50cmllcykubGVuZ3RoIDwgMTtcblxuICAvLyBhcHBseSBjb25maWcgaWYgcGFzc2VkIGZyb20gYWN0aW9uXG4gIGNvbnN0IHByZXZpb3VzU3RhdGUgPSBjb25maWdcbiAgICA/IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyKHN0YXRlLCB7XG4gICAgICAgIHBheWxvYWQ6IHtjb25maWcsIG9wdGlvbnN9XG4gICAgICB9KVxuICAgIDogc3RhdGU7XG5cbiAgbGV0IG1lcmdlZFN0YXRlID0ge1xuICAgIC4uLnByZXZpb3VzU3RhdGUsXG4gICAgZGF0YXNldHM6IHtcbiAgICAgIC4uLnByZXZpb3VzU3RhdGUuZGF0YXNldHMsXG4gICAgICAuLi5uZXdEYXRhRW50cmllc1xuICAgIH1cbiAgfTtcblxuICAvLyBtZXJnZSBzdGF0ZSB3aXRoIGNvbmZpZyB0byBiZSBtZXJnZWRcbiAgZm9yIChjb25zdCBtZXJnZXIgb2YgbWVyZ2VkU3RhdGUubWVyZ2Vycykge1xuICAgIGlmIChpc1ZhbGlkTWVyZ2VyKG1lcmdlcikgJiYgbWVyZ2VyLnRvTWVyZ2VQcm9wICYmIG1lcmdlZFN0YXRlW21lcmdlci50b01lcmdlUHJvcF0pIHtcbiAgICAgIGNvbnN0IHRvTWVyZ2UgPSBtZXJnZWRTdGF0ZVttZXJnZXIudG9NZXJnZVByb3BdO1xuICAgICAgbWVyZ2VkU3RhdGVbbWVyZ2VyLnRvTWVyZ2VQcm9wXSA9IElOSVRJQUxfVklTX1NUQVRFW21lcmdlci50b01lcmdlUHJvcF07XG4gICAgICBtZXJnZWRTdGF0ZSA9IG1lcmdlci5tZXJnZShtZXJnZWRTdGF0ZSwgdG9NZXJnZSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IG5ld0xheWVycyA9ICFkYXRhRW1wdHlcbiAgICA/IG1lcmdlZFN0YXRlLmxheWVycy5maWx0ZXIobCA9PiBsLmNvbmZpZy5kYXRhSWQgJiYgbC5jb25maWcuZGF0YUlkIGluIG5ld0RhdGFFbnRyaWVzKVxuICAgIDogW107XG5cbiAgaWYgKCFuZXdMYXllcnMubGVuZ3RoICYmIChvcHRpb25zIHx8IHt9KS5hdXRvQ3JlYXRlTGF5ZXJzICE9PSBmYWxzZSkge1xuICAgIC8vIG5vIGxheWVyIG1lcmdlZCwgZmluZCBkZWZhdWx0c1xuICAgIGNvbnN0IHJlc3VsdCA9IGFkZERlZmF1bHRMYXllcnMobWVyZ2VkU3RhdGUsIG5ld0RhdGFFbnRyaWVzKTtcbiAgICBtZXJnZWRTdGF0ZSA9IHJlc3VsdC5zdGF0ZTtcbiAgICBuZXdMYXllcnMgPSByZXN1bHQubmV3TGF5ZXJzO1xuICB9XG5cbiAgaWYgKG1lcmdlZFN0YXRlLnNwbGl0TWFwcy5sZW5ndGgpIHtcbiAgICAvLyBpZiBtYXAgaXMgc3BsaXQsIGFkZCBuZXcgbGF5ZXJzIHRvIHNwbGl0TWFwc1xuICAgIG5ld0xheWVycyA9IG1lcmdlZFN0YXRlLmxheWVycy5maWx0ZXIoXG4gICAgICBsID0+IGwuY29uZmlnLmRhdGFJZCAmJiBsLmNvbmZpZy5kYXRhSWQgaW4gbmV3RGF0YUVudHJpZXNcbiAgICApO1xuICAgIG1lcmdlZFN0YXRlID0ge1xuICAgICAgLi4ubWVyZ2VkU3RhdGUsXG4gICAgICBzcGxpdE1hcHM6IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAobWVyZ2VkU3RhdGUuc3BsaXRNYXBzLCBuZXdMYXllcnMpXG4gICAgfTtcbiAgfVxuXG4gIC8vIGlmIG5vIHRvb2x0aXBzIG1lcmdlZCBhZGQgZGVmYXVsdCB0b29sdGlwc1xuICBPYmplY3Qua2V5cyhuZXdEYXRhRW50cmllcykuZm9yRWFjaChkYXRhSWQgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXBGaWVsZHMgPSBtZXJnZWRTdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodG9vbHRpcEZpZWxkcykgfHwgIXRvb2x0aXBGaWVsZHMubGVuZ3RoKSB7XG4gICAgICBtZXJnZWRTdGF0ZSA9IGFkZERlZmF1bHRUb29sdGlwcyhtZXJnZWRTdGF0ZSwgbmV3RGF0YUVudHJpZXNbZGF0YUlkXSk7XG4gICAgfVxuICB9KTtcblxuICBsZXQgdXBkYXRlZFN0YXRlID0gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKFxuICAgIG1lcmdlZFN0YXRlLFxuICAgIGRhdGFFbXB0eSA/IE9iamVjdC5rZXlzKG1lcmdlZFN0YXRlLmRhdGFzZXRzKSA6IE9iamVjdC5rZXlzKG5ld0RhdGFFbnRyaWVzKSxcbiAgICB1bmRlZmluZWRcbiAgKTtcblxuICAvLyByZWdpc3RlciBsYXllciBhbmltYXRpb24gZG9tYWluLFxuICAvLyBuZWVkIHRvIGJlIGNhbGxlZCBhZnRlciBsYXllciBkYXRhIGlzIGNhbGN1bGF0ZWRcbiAgdXBkYXRlZFN0YXRlID0gdXBkYXRlQW5pbWF0aW9uRG9tYWluKHVwZGF0ZWRTdGF0ZSk7XG5cbiAgcmV0dXJuIHVwZGF0ZWRTdGF0ZTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbi8qKlxuICogUmVuYW1lIGFuIGV4aXN0aW5nIGRhdGFzZXQgaW4gYHZpc1N0YXRlYFxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnJlbmFtZURhdGFzZXRVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRGF0YXNldFVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7ZGF0YUlkLCBsYWJlbH0gPSBhY3Rpb247XG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcbiAgY29uc3QgZXhpc3RpbmcgPSBkYXRhc2V0c1tkYXRhSWRdO1xuICAvLyBAdHMtaWdub3JlXG4gIHJldHVybiBleGlzdGluZ1xuICAgID8ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YXNldHM6IHtcbiAgICAgICAgICAuLi5kYXRhc2V0cyxcbiAgICAgICAgICBbZGF0YUlkXToge1xuICAgICAgICAgICAgLi4uZXhpc3RpbmcsXG4gICAgICAgICAgICBsYWJlbFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIDogLy8gTm8tb3AgaWYgdGhlIGRhdGFzZXQgZG9lc24ndCBleGlzdFxuICAgICAgc3RhdGU7XG59XG5cbi8qKlxuICogV2hlbiBhIHVzZXIgY2xpY2tzIG9uIHRoZSBzcGVjaWZpYyBtYXAgY2xvc2luZyBpY29uXG4gKiB0aGUgYXBwbGljYXRpb24gd2lsbCBjbG9zZSB0aGUgc2VsZWN0ZWQgbWFwXG4gKiBhbmQgd2lsbCBtZXJnZSB0aGUgcmVtYWluaW5nIG9uZSB3aXRoIHRoZSBnbG9iYWwgc3RhdGVcbiAqIFRPRE86IGkgdGhpbmsgaW4gdGhlIGZ1dHVyZSB0aGlzIGFjdGlvbiBzaG91bGQgYmUgY2FsbGVkIG1lcmdlIG1hcCBsYXllcnMgd2l0aCBnbG9iYWwgc2V0dGluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIGFjdGlvblxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKi9cbmZ1bmN0aW9uIGNsb3NlU3BlY2lmaWNNYXBBdEluZGV4KHN0YXRlLCBhY3Rpb24pIHtcbiAgLy8gcmV0cmlldmUgbGF5ZXJzIG1ldGEgZGF0YSBmcm9tIHRoZSByZW1haW5pbmcgbWFwIHRoYXQgd2UgbmVlZCB0byBrZWVwXG4gIGNvbnN0IGluZGV4VG9SZXRyaWV2ZSA9IDEgLSBhY3Rpb24ucGF5bG9hZDtcbiAgY29uc3QgbWFwTGF5ZXJzID0gc3RhdGUuc3BsaXRNYXBzW2luZGV4VG9SZXRyaWV2ZV0ubGF5ZXJzO1xuICBjb25zdCB7bGF5ZXJzfSA9IHN0YXRlO1xuXG4gIC8vIHVwZGF0ZSBsYXllciB2aXNpYmlsaXR5XG4gIGNvbnN0IG5ld0xheWVycyA9IGxheWVycy5tYXAobGF5ZXIgPT5cbiAgICAhbWFwTGF5ZXJzW2xheWVyLmlkXSAmJiBsYXllci5jb25maWcuaXNWaXNpYmxlXG4gICAgICA/IGxheWVyLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICAgICAgICAvLyBpZiBsYXllci5pZCBpcyBub3QgaW4gbWFwTGF5ZXJzLCBpdCBzaG91bGQgYmUgaW5WaXNpYmxlXG4gICAgICAgICAgaXNWaXNpYmxlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgOiBsYXllclxuICApO1xuXG4gIC8vIGRlbGV0ZSBtYXBcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IG5ld0xheWVycyxcbiAgICBzcGxpdE1hcHM6IFtdXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBmaWxlIGxvYWRpbmcgZGlzcGF0Y2ggYGFkZERhdGFUb01hcGAgaWYgc3VjY2VlZCwgb3IgYGxvYWRGaWxlc0VycmAgaWYgZmFpbGVkXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubG9hZEZpbGVzVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlc1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7ZmlsZXMsIG9uRmluaXNoID0gbG9hZEZpbGVzU3VjY2Vzc30gPSBhY3Rpb247XG4gIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgZmlsZUxvYWRpbmdQcm9ncmVzcyA9IEFycmF5LmZyb20oZmlsZXMpLnJlZHVjZShcbiAgICAoYWNjdSwgZiwgaSkgPT4gbWVyZ2VfKGluaXRpYWxGaWxlTG9hZGluZ1Byb2dyZXNzKGYsIGkpKShhY2N1KSxcbiAgICB7fVxuICApO1xuXG4gIGNvbnN0IGZpbGVMb2FkaW5nID0ge1xuICAgIGZpbGVDYWNoZTogW10sXG4gICAgZmlsZXNUb0xvYWQ6IGZpbGVzLFxuICAgIG9uRmluaXNoXG4gIH07XG5cbiAgY29uc3QgbmV4dFN0YXRlID0gbWVyZ2VfKHtmaWxlTG9hZGluZ1Byb2dyZXNzLCBmaWxlTG9hZGluZ30pKHN0YXRlKTtcblxuICByZXR1cm4gbG9hZE5leHRGaWxlVXBkYXRlcihuZXh0U3RhdGUpO1xufTtcblxuLyoqXG4gKiBTdWNlc3NmdWxseSBsb2FkZWQgb25lIGZpbGUsIG1vdmUgb24gdG8gdGhlIG5leHQgb25lXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykubG9hZEZpbGVTdGVwU3VjY2Vzc1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmlsZVN0ZXBTdWNjZXNzVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGlmICghc3RhdGUuZmlsZUxvYWRpbmcpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge2ZpbGVOYW1lLCBmaWxlQ2FjaGV9ID0gYWN0aW9uO1xuICBjb25zdCB7ZmlsZXNUb0xvYWQsIG9uRmluaXNofSA9IHN0YXRlLmZpbGVMb2FkaW5nO1xuICBjb25zdCBzdGF0ZVdpdGhQcm9ncmVzcyA9IHVwZGF0ZUZpbGVMb2FkaW5nUHJvZ3Jlc3NVcGRhdGVyKHN0YXRlLCB7XG4gICAgZmlsZU5hbWUsXG4gICAgcHJvZ3Jlc3M6IHtwZXJjZW50OiAxLCBtZXNzYWdlOiAnRG9uZSd9XG4gIH0pO1xuXG4gIC8vIHNhdmUgcHJvY2Vzc2VkIGZpbGUgdG8gZmlsZUNhY2hlXG4gIGNvbnN0IHN0YXRlV2l0aENhY2hlID0gcGlja18oJ2ZpbGVMb2FkaW5nJykobWVyZ2VfKHtmaWxlQ2FjaGV9KSkoc3RhdGVXaXRoUHJvZ3Jlc3MpO1xuXG4gIHJldHVybiB3aXRoVGFzayhcbiAgICBzdGF0ZVdpdGhDYWNoZSxcbiAgICBERUxBWV9UQVNLKDIwMCkubWFwKGZpbGVzVG9Mb2FkLmxlbmd0aCA/IGxvYWROZXh0RmlsZSA6ICgpID0+IG9uRmluaXNoKGZpbGVDYWNoZSkpXG4gICk7XG59XG5cbi8vIHdpdGhUYXNrPFQ+KHN0YXRlOiBULCB0YXNrOiBhbnkpOiBUXG5cbi8qKlxuICpcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sb2FkTmV4dEZpbGVVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5leHRGaWxlVXBkYXRlcihzdGF0ZSkge1xuICBpZiAoIXN0YXRlLmZpbGVMb2FkaW5nKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHtmaWxlc1RvTG9hZH0gPSBzdGF0ZS5maWxlTG9hZGluZztcbiAgY29uc3QgW2ZpbGUsIC4uLnJlbWFpbmluZ0ZpbGVzVG9Mb2FkXSA9IGZpbGVzVG9Mb2FkO1xuXG4gIC8vIHNhdmUgZmlsZXNUb0xvYWQgdG8gc3RhdGVcbiAgY29uc3QgbmV4dFN0YXRlID0gcGlja18oJ2ZpbGVMb2FkaW5nJykobWVyZ2VfKHtmaWxlc1RvTG9hZDogcmVtYWluaW5nRmlsZXNUb0xvYWR9KSkoc3RhdGUpO1xuXG4gIGNvbnN0IHN0YXRlV2l0aFByb2dyZXNzID0gdXBkYXRlRmlsZUxvYWRpbmdQcm9ncmVzc1VwZGF0ZXIobmV4dFN0YXRlLCB7XG4gICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICBwcm9ncmVzczoge3BlcmNlbnQ6IDAsIG1lc3NhZ2U6ICdsb2FkaW5nLi4uJ31cbiAgfSk7XG5cbiAgY29uc3Qge2xvYWRlcnMsIGxvYWRPcHRpb25zfSA9IHN0YXRlO1xuICByZXR1cm4gd2l0aFRhc2soXG4gICAgc3RhdGVXaXRoUHJvZ3Jlc3MsXG4gICAgbWFrZUxvYWRGaWxlVGFzayhmaWxlLCBuZXh0U3RhdGUuZmlsZUxvYWRpbmcuZmlsZUNhY2hlLCBsb2FkZXJzLCBsb2FkT3B0aW9ucylcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMb2FkRmlsZVRhc2soZmlsZSwgZmlsZUNhY2hlLCBsb2FkZXJzID0gW10sIGxvYWRPcHRpb25zID0ge30pIHtcbiAgcmV0dXJuIExPQURfRklMRV9UQVNLKHtmaWxlLCBmaWxlQ2FjaGUsIGxvYWRlcnMsIGxvYWRPcHRpb25zfSkuYmltYXAoXG4gICAgLy8gcHJldHRpZXIgaWdub3JlXG4gICAgLy8gc3VjY2Vzc1xuICAgIGdlbiA9PlxuICAgICAgbmV4dEZpbGVCYXRjaCh7XG4gICAgICAgIGdlbixcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgb25GaW5pc2g6IHJlc3VsdCA9PlxuICAgICAgICAgIHByb2Nlc3NGaWxlQ29udGVudCh7XG4gICAgICAgICAgICBjb250ZW50OiByZXN1bHQsXG4gICAgICAgICAgICBmaWxlQ2FjaGVcbiAgICAgICAgICB9KVxuICAgICAgfSksXG5cbiAgICAvLyBlcnJvclxuICAgIGVyciA9PiBsb2FkRmlsZXNFcnIoZmlsZS5uYW1lLCBlcnIpXG4gICk7XG59XG5cbi8qKlxuICpcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5wcm9jZXNzRmlsZUNvbnRlbnRVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0ZpbGVDb250ZW50VXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtjb250ZW50LCBmaWxlQ2FjaGV9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgY29uc3Qgc3RhdGVXaXRoUHJvZ3Jlc3MgPSB1cGRhdGVGaWxlTG9hZGluZ1Byb2dyZXNzVXBkYXRlcihzdGF0ZSwge1xuICAgIGZpbGVOYW1lOiBjb250ZW50LmZpbGVOYW1lLFxuICAgIHByb2dyZXNzOiB7cGVyY2VudDogMSwgbWVzc2FnZTogJ3Byb2Nlc3NpbmcuLi4nfVxuICB9KTtcblxuICByZXR1cm4gd2l0aFRhc2soXG4gICAgc3RhdGVXaXRoUHJvZ3Jlc3MsXG4gICAgUFJPQ0VTU19GSUxFX0RBVEEoe2NvbnRlbnQsIGZpbGVDYWNoZX0pLmJpbWFwKFxuICAgICAgcmVzdWx0ID0+IGxvYWRGaWxlU3RlcFN1Y2Nlc3Moe2ZpbGVOYW1lOiBjb250ZW50LmZpbGVOYW1lLCBmaWxlQ2FjaGU6IHJlc3VsdH0pLFxuICAgICAgZXJyID0+IGxvYWRGaWxlc0Vycihjb250ZW50LmZpbGVOYW1lLCBlcnIpXG4gICAgKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQcm9ncmVzcyhwcmV2UHJvZ3Jlc3MgPSB7fSwgcHJvZ3Jlc3MpIHtcbiAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gcmVjZWl2aW5nIHF1ZXJ5IG1ldGFkYXRhIG9yIG90aGVyIGNhc2VzIHdlIGRvbid0XG4gIC8vIGhhdmUgYW4gdXBkYXRlIGZvciB0aGUgdXNlci5cbiAgaWYgKCFwcm9ncmVzcyB8fCAhcHJvZ3Jlc3MucGVyY2VudCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGVyY2VudDogcHJvZ3Jlc3MucGVyY2VudFxuICB9O1xufVxuXG4vKipcbiAqIGdldHMgY2FsbGVkIHdpdGggcGF5bG9hZCA9IEFzeW5jR2VuZXJhdG9yPD8/Pz5cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5uZXh0RmlsZUJhdGNoVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IG5leHRGaWxlQmF0Y2hVcGRhdGVyID0gKFxuICBzdGF0ZSxcbiAge3BheWxvYWQ6IHtnZW4sIGZpbGVOYW1lLCBwcm9ncmVzcywgYWNjdW11bGF0ZWQsIG9uRmluaXNofX1cbikgPT4ge1xuICBjb25zdCBzdGF0ZVdpdGhQcm9ncmVzcyA9IHVwZGF0ZUZpbGVMb2FkaW5nUHJvZ3Jlc3NVcGRhdGVyKHN0YXRlLCB7XG4gICAgZmlsZU5hbWUsXG4gICAgcHJvZ3Jlc3M6IHBhcnNlUHJvZ3Jlc3Moc3RhdGUuZmlsZUxvYWRpbmdQcm9ncmVzc1tmaWxlTmFtZV0sIHByb2dyZXNzKVxuICB9KTtcbiAgcmV0dXJuIHdpdGhUYXNrKFxuICAgIHN0YXRlV2l0aFByb2dyZXNzLFxuICAgIFVOV1JBUF9UQVNLKGdlbi5uZXh0KCkpLmJpbWFwKFxuICAgICAgKHt2YWx1ZSwgZG9uZX0pID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmVcbiAgICAgICAgICA/IG9uRmluaXNoKGFjY3VtdWxhdGVkKVxuICAgICAgICAgIDogbmV4dEZpbGVCYXRjaCh7XG4gICAgICAgICAgICAgIGdlbixcbiAgICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAgIHByb2dyZXNzOiB2YWx1ZS5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgYWNjdW11bGF0ZWQ6IHZhbHVlLFxuICAgICAgICAgICAgICBvbkZpbmlzaFxuICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXJyID0+IGxvYWRGaWxlc0VycihmaWxlTmFtZSwgZXJyKVxuICAgIClcbiAgKTtcbn07XG5cbi8qKlxuICogVHJpZ2dlciBsb2FkaW5nIGZpbGUgZXJyb3JcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5sb2FkRmlsZXNFcnJVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGVzRXJyVXBkYXRlciA9IChzdGF0ZSwge2Vycm9yLCBmaWxlTmFtZX0pID0+IHtcbiAgLy8gdXBkYXRlIHVpIHdpdGggZXJyb3IgbWVzc2FnZVxuICBDb25zb2xlLndhcm4oZXJyb3IpO1xuICBpZiAoIXN0YXRlLmZpbGVMb2FkaW5nKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHtmaWxlc1RvTG9hZCwgb25GaW5pc2gsIGZpbGVDYWNoZX0gPSBzdGF0ZS5maWxlTG9hZGluZztcblxuICBjb25zdCBuZXh0U3RhdGUgPSB1cGRhdGVGaWxlTG9hZGluZ1Byb2dyZXNzVXBkYXRlcihzdGF0ZSwge1xuICAgIGZpbGVOYW1lLFxuICAgIHByb2dyZXNzOiB7ZXJyb3J9XG4gIH0pO1xuXG4gIC8vIGtpY2sgb2ZmIG5leHQgZmlsZSBvciBmaW5pc2hcbiAgcmV0dXJuIHdpdGhUYXNrKFxuICAgIG5leHRTdGF0ZSxcbiAgICBERUxBWV9UQVNLKDIwMCkubWFwKGZpbGVzVG9Mb2FkLmxlbmd0aCA/IGxvYWROZXh0RmlsZSA6ICgpID0+IG9uRmluaXNoKGZpbGVDYWNoZSkpXG4gICk7XG59O1xuXG4vKipcbiAqIFdoZW4gc2VsZWN0IGRhdGFzZXQgZm9yIGV4cG9ydCwgYXBwbHkgY3B1IGZpbHRlciB0byBzZWxlY3RlZCBkYXRhc2V0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuYXBwbHlDUFVGaWx0ZXJVcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgYXBwbHlDUFVGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCB7ZGF0YUlkfSkgPT4ge1xuICAvLyBhcHBseSBjcHVGaWx0ZXJcbiAgY29uc3QgZGF0YUlkcyA9IHRvQXJyYXkoZGF0YUlkKTtcblxuICByZXR1cm4gZGF0YUlkcy5yZWR1Y2UoKGFjY3UsIGlkKSA9PiBmaWx0ZXJEYXRhc2V0Q1BVKGFjY3UsIGlkKSwgc3RhdGUpO1xufTtcblxuLyoqXG4gKiBVc2VyIGlucHV0IHRvIHVwZGF0ZSB0aGUgaW5mbyBvZiB0aGUgbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0TWFwSW5mb1VwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRNYXBJbmZvVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbWFwSW5mbzoge1xuICAgIC4uLnN0YXRlLm1hcEluZm8sXG4gICAgLi4uYWN0aW9uLmluZm9cbiAgfVxufSk7XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byB1cGRhdGUgQWxsIGxheWVyIGRvbWFpbiBhbmQgbGF5ZXIgZGF0YSBvZiBzdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuYWRkRGVmYXVsdExheWVyc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZERlZmF1bHRMYXllcnMoc3RhdGUsIGRhdGFzZXRzKSB7XG4gIC8qKiBAdHlwZSB7TGF5ZXJbXX0gKi9cbiAgY29uc3QgZW1wdHkgPSBbXTtcbiAgY29uc3QgZGVmYXVsdExheWVycyA9IE9iamVjdC52YWx1ZXMoZGF0YXNldHMpLnJlZHVjZSgoYWNjdSwgZGF0YXNldCkgPT4ge1xuICAgIGNvbnN0IGZvdW5kTGF5ZXJzID0gZmluZERlZmF1bHRMYXllcihkYXRhc2V0LCBzdGF0ZS5sYXllckNsYXNzZXMpO1xuICAgIHJldHVybiBmb3VuZExheWVycyAmJiBmb3VuZExheWVycy5sZW5ndGggPyBhY2N1LmNvbmNhdChmb3VuZExheWVycykgOiBhY2N1O1xuICB9LCBlbXB0eSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0ZToge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBsYXllcnM6IFsuLi5zdGF0ZS5sYXllcnMsIC4uLmRlZmF1bHRMYXllcnNdLFxuICAgICAgbGF5ZXJPcmRlcjogW1xuICAgICAgICAvLyBwdXQgbmV3IGxheWVycyBvbiB0b3Agb2Ygb2xkIG9uZXNcbiAgICAgICAgLi4uZGVmYXVsdExheWVycy5tYXAoKF8sIGkpID0+IHN0YXRlLmxheWVycy5sZW5ndGggKyBpKSxcbiAgICAgICAgLi4uc3RhdGUubGF5ZXJPcmRlclxuICAgICAgXVxuICAgIH0sXG4gICAgbmV3TGF5ZXJzOiBkZWZhdWx0TGF5ZXJzXG4gIH07XG59XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uIHRvIGZpbmQgZGVmYXVsdCB0b29sdGlwc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YXNldFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWZhdWx0VG9vbHRpcHMoc3RhdGUsIGRhdGFzZXQpIHtcbiAgY29uc3QgdG9vbHRpcEZpZWxkcyA9IGZpbmRGaWVsZHNUb1Nob3coZGF0YXNldCk7XG4gIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3csXG4gICAgLi4udG9vbHRpcEZpZWxkc1xuICB9O1xuXG4gIHJldHVybiBzZXQoWydpbnRlcmFjdGlvbkNvbmZpZycsICd0b29sdGlwJywgJ2NvbmZpZycsICdmaWVsZHNUb1Nob3cnXSwgbWVyZ2VkLCBzdGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsRmlsZUxvYWRpbmdQcm9ncmVzcyhmaWxlLCBpbmRleCkge1xuICBjb25zdCBmaWxlTmFtZSA9IGZpbGUubmFtZSB8fCBgVW50aXRsZWQgRmlsZSAke2luZGV4fWA7XG4gIHJldHVybiB7XG4gICAgW2ZpbGVOYW1lXToge1xuICAgICAgLy8gcGVyY2VudCBvZiBjdXJyZW50IGZpbGVcbiAgICAgIHBlcmNlbnQ6IDAsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICAgIGZpbGVOYW1lLFxuICAgICAgZXJyb3I6IG51bGxcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWxlTG9hZGluZ1Byb2dyZXNzVXBkYXRlcihzdGF0ZSwge2ZpbGVOYW1lLCBwcm9ncmVzc30pIHtcbiAgcmV0dXJuIHBpY2tfKCdmaWxlTG9hZGluZ1Byb2dyZXNzJykocGlja18oZmlsZU5hbWUpKG1lcmdlXyhwcm9ncmVzcykpKShzdGF0ZSk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byB1cGRhdGUgbGF5ZXIgZG9tYWlucyBmb3IgYW4gYXJyYXkgb2YgZGF0YXNldHNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnVwZGF0ZUFsbExheWVyRG9tYWluRGF0YX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShzdGF0ZSwgZGF0YUlkLCB1cGRhdGVkRmlsdGVyKSB7XG4gIGNvbnN0IGRhdGFJZHMgPSB0eXBlb2YgZGF0YUlkID09PSAnc3RyaW5nJyA/IFtkYXRhSWRdIDogZGF0YUlkO1xuICBjb25zdCBuZXdMYXllcnMgPSBbXTtcbiAgY29uc3QgbmV3TGF5ZXJEYXRhID0gW107XG5cbiAgc3RhdGUubGF5ZXJzLmZvckVhY2goKG9sZExheWVyLCBpKSA9PiB7XG4gICAgaWYgKG9sZExheWVyLmNvbmZpZy5kYXRhSWQgJiYgZGF0YUlkcy5pbmNsdWRlcyhvbGRMYXllci5jb25maWcuZGF0YUlkKSkge1xuICAgICAgLy8gTm8gbmVlZCB0byByZWNhbGN1bGF0ZSBsYXllciBkb21haW4gaWYgZmlsdGVyIGhhcyBmaXhlZCBkb21haW5cbiAgICAgIGNvbnN0IG5ld0xheWVyID1cbiAgICAgICAgdXBkYXRlZEZpbHRlciAmJiB1cGRhdGVkRmlsdGVyLmZpeGVkRG9tYWluXG4gICAgICAgICAgPyBvbGRMYXllclxuICAgICAgICAgIDogb2xkTGF5ZXIudXBkYXRlTGF5ZXJEb21haW4oc3RhdGUuZGF0YXNldHMsIHVwZGF0ZWRGaWx0ZXIpO1xuXG4gICAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlLCBzdGF0ZS5sYXllckRhdGFbaV0pO1xuXG4gICAgICBuZXdMYXllcnMucHVzaChsYXllcik7XG4gICAgICBuZXdMYXllckRhdGEucHVzaChsYXllckRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMYXllcnMucHVzaChvbGRMYXllcik7XG4gICAgICBuZXdMYXllckRhdGEucHVzaChzdGF0ZS5sYXllckRhdGFbaV0pO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBuZXdMYXllcnMsXG4gICAgbGF5ZXJEYXRhOiBuZXdMYXllckRhdGFcbiAgfTtcblxuICByZXR1cm4gbmV3U3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBbmltYXRpb25Eb21haW4oc3RhdGUpIHtcbiAgLy8gbWVyZ2UgYWxsIGFuaW1hdGFibGUgbGF5ZXIgZG9tYWluIGFuZCB1cGRhdGUgZ2xvYmFsIGNvbmZpZ1xuICBjb25zdCBhbmltYXRhYmxlTGF5ZXJzID0gc3RhdGUubGF5ZXJzLmZpbHRlcihcbiAgICBsID0+XG4gICAgICBsLmNvbmZpZy5pc1Zpc2libGUgJiZcbiAgICAgIGwuY29uZmlnLmFuaW1hdGlvbiAmJlxuICAgICAgbC5jb25maWcuYW5pbWF0aW9uLmVuYWJsZWQgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkobC5hbmltYXRpb25Eb21haW4pXG4gICk7XG5cbiAgaWYgKCFhbmltYXRhYmxlTGF5ZXJzLmxlbmd0aCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFuaW1hdGlvbkNvbmZpZzoge1xuICAgICAgICAuLi5zdGF0ZS5hbmltYXRpb25Db25maWcsXG4gICAgICAgIGRvbWFpbjogbnVsbCxcbiAgICAgICAgZGVmYXVsdFRpbWVGb3JtYXQ6IG51bGxcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgbWVyZ2VkRG9tYWluID0gYW5pbWF0YWJsZUxheWVycy5yZWR1Y2UoXG4gICAgKGFjY3UsIGxheWVyKSA9PiBbXG4gICAgICBNYXRoLm1pbihhY2N1WzBdLCBsYXllci5hbmltYXRpb25Eb21haW5bMF0pLFxuICAgICAgTWF0aC5tYXgoYWNjdVsxXSwgbGF5ZXIuYW5pbWF0aW9uRG9tYWluWzFdKVxuICAgIF0sXG4gICAgW051bWJlcihJbmZpbml0eSksIC1JbmZpbml0eV1cbiAgKTtcbiAgY29uc3QgZGVmYXVsdFRpbWVGb3JtYXQgPSBnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIobWVyZ2VkRG9tYWluKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGFuaW1hdGlvbkNvbmZpZzoge1xuICAgICAgLi4uc3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuICAgICAgY3VycmVudFRpbWU6IGlzSW5SYW5nZShzdGF0ZS5hbmltYXRpb25Db25maWcuY3VycmVudFRpbWUsIG1lcmdlZERvbWFpbilcbiAgICAgICAgPyBzdGF0ZS5hbmltYXRpb25Db25maWcuY3VycmVudFRpbWVcbiAgICAgICAgOiBtZXJnZWREb21haW5bMF0sXG4gICAgICBkb21haW46IG1lcmdlZERvbWFpbixcbiAgICAgIGRlZmF1bHRUaW1lRm9ybWF0XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgc3RhdHVzIG9mIHRoZSBlZGl0b3JcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zZXRFZGl0b3JNb2RlVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEVkaXRvck1vZGVVcGRhdGVyID0gKHN0YXRlLCB7bW9kZX0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBlZGl0b3I6IHtcbiAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgbW9kZSxcbiAgICBzZWxlY3RlZEZlYXR1cmU6IG51bGxcbiAgfVxufSk7XG5cbi8vIGNvbnN0IGZlYXR1cmVUb0ZpbHRlclZhbHVlID0gKGZlYXR1cmUpID0+ICh7Li4uZmVhdHVyZSwgaWQ6IGZlYXR1cmUuaWR9KTtcbi8qKlxuICogVXBkYXRlIGVkaXRvciBmZWF0dXJlc1xuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnNldEZlYXR1cmVzVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZlYXR1cmVzVXBkYXRlcihzdGF0ZSwge2ZlYXR1cmVzID0gW119KSB7XG4gIGNvbnN0IGxhc3RGZWF0dXJlID0gZmVhdHVyZXMubGVuZ3RoICYmIGZlYXR1cmVzW2ZlYXR1cmVzLmxlbmd0aCAtIDFdO1xuXG4gIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIGVkaXRvcjoge1xuICAgICAgLi4uc3RhdGUuZWRpdG9yLFxuICAgICAgLy8gb25seSBzYXZlIG5vbmUgZmlsdGVyIGZlYXR1cmVzIHRvIGVkaXRvclxuICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzLmZpbHRlcihmID0+ICFnZXRGaWx0ZXJJZEluRmVhdHVyZShmKSksXG4gICAgICBtb2RlOiBsYXN0RmVhdHVyZSAmJiBsYXN0RmVhdHVyZS5wcm9wZXJ0aWVzLmlzQ2xvc2VkID8gRURJVE9SX01PREVTLkVESVQgOiBzdGF0ZS5lZGl0b3IubW9kZVxuICAgIH1cbiAgfTtcblxuICAvLyBSZXRyaWV2ZSBleGlzdGluZyBmZWF0dXJlXG4gIGNvbnN0IHtzZWxlY3RlZEZlYXR1cmV9ID0gc3RhdGUuZWRpdG9yO1xuXG4gIC8vIElmIG5vIGZlYXR1cmUgaXMgc2VsZWN0ZWQgd2UgY2FuIHNpbXBseSByZXR1cm4gc2luY2Ugbm8gb3BlcmF0aW9uc1xuICBpZiAoIXNlbGVjdGVkRmVhdHVyZSkge1xuICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgfVxuXG4gIC8vIFRPRE86IGNoZWNrIGlmIHRoZSBmZWF0dXJlIGhhcyBjaGFuZ2VkXG4gIGNvbnN0IGZlYXR1cmUgPSBmZWF0dXJlcy5maW5kKGYgPT4gZi5pZCA9PT0gc2VsZWN0ZWRGZWF0dXJlLmlkKTtcblxuICAvLyBpZiBmZWF0dXJlIGlzIHBhcnQgb2YgYSBmaWx0ZXJcbiAgY29uc3QgZmlsdGVySWQgPSBmZWF0dXJlICYmIGdldEZpbHRlcklkSW5GZWF0dXJlKGZlYXR1cmUpO1xuICBpZiAoZmlsdGVySWQgJiYgZmVhdHVyZSkge1xuICAgIGNvbnN0IGZlYXR1cmVWYWx1ZSA9IGZlYXR1cmVUb0ZpbHRlclZhbHVlKGZlYXR1cmUsIGZpbHRlcklkKTtcbiAgICBjb25zdCBmaWx0ZXJJZHggPSBzdGF0ZS5maWx0ZXJzLmZpbmRJbmRleChmaWwgPT4gZmlsLmlkID09PSBmaWx0ZXJJZCk7XG4gICAgcmV0dXJuIHNldEZpbHRlclVwZGF0ZXIobmV3U3RhdGUsIHtcbiAgICAgIGlkeDogZmlsdGVySWR4LFxuICAgICAgcHJvcDogJ3ZhbHVlJyxcbiAgICAgIHZhbHVlOiBmZWF0dXJlVmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgZmVhdHVyZVxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0U2VsZWN0ZWRGZWF0dXJlVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFNlbGVjdGVkRmVhdHVyZVVwZGF0ZXIgPSAoc3RhdGUsIHtmZWF0dXJlfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGVkaXRvcjoge1xuICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICBzZWxlY3RlZEZlYXR1cmU6IGZlYXR1cmVcbiAgfVxufSk7XG5cbi8qKlxuICogRGVsZXRlIGV4aXN0aW5nIGZlYXR1cmUgZnJvbSBmaWx0ZXJzXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuZGVsZXRlRmVhdHVyZVVwZGF0ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVGZWF0dXJlVXBkYXRlcihzdGF0ZSwge2ZlYXR1cmV9KSB7XG4gIGlmICghZmVhdHVyZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIGVkaXRvcjoge1xuICAgICAgLi4uc3RhdGUuZWRpdG9yLFxuICAgICAgc2VsZWN0ZWRGZWF0dXJlOiBudWxsXG4gICAgfVxuICB9O1xuXG4gIGlmIChnZXRGaWx0ZXJJZEluRmVhdHVyZShmZWF0dXJlKSkge1xuICAgIGNvbnN0IGZpbHRlcklkeCA9IG5ld1N0YXRlLmZpbHRlcnMuZmluZEluZGV4KGYgPT4gZi5pZCA9PT0gZ2V0RmlsdGVySWRJbkZlYXR1cmUoZmVhdHVyZSkpO1xuXG4gICAgcmV0dXJuIGZpbHRlcklkeCA+IC0xID8gcmVtb3ZlRmlsdGVyVXBkYXRlcihuZXdTdGF0ZSwge2lkeDogZmlsdGVySWR4fSkgOiBuZXdTdGF0ZTtcbiAgfVxuXG4gIC8vIG1vZGlmeSBlZGl0b3Igb2JqZWN0XG4gIGNvbnN0IG5ld0VkaXRvciA9IHtcbiAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgZmVhdHVyZXM6IHN0YXRlLmVkaXRvci5mZWF0dXJlcy5maWx0ZXIoZiA9PiBmLmlkICE9PSBmZWF0dXJlLmlkKSxcbiAgICBzZWxlY3RlZEZlYXR1cmU6IG51bGxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGVkaXRvcjogbmV3RWRpdG9yXG4gIH07XG59XG5cbi8qKlxuICogVG9nZ2xlIGZlYXR1cmUgYXMgbGF5ZXIgZmlsdGVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0UG9seWdvbkZpbHRlckxheWVyVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFBvbHlnb25GaWx0ZXJMYXllclVwZGF0ZXIoc3RhdGUsIHBheWxvYWQpIHtcbiAgY29uc3Qge2xheWVyLCBmZWF0dXJlfSA9IHBheWxvYWQ7XG4gIGNvbnN0IGZpbHRlcklkID0gZ2V0RmlsdGVySWRJbkZlYXR1cmUoZmVhdHVyZSk7XG5cbiAgLy8gbGV0IG5ld0ZpbHRlciA9IG51bGw7XG4gIGxldCBmaWx0ZXJJZHg7XG4gIGxldCBuZXdMYXllcklkID0gW2xheWVyLmlkXTtcbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG4gIC8vIElmIHBvbHlnb24gZmlsdGVyIGFscmVhZHkgZXhpc3RzLCB3ZSBuZWVkIHRvIGZpbmQgb3V0IGlmIHRoZSBjdXJyZW50IGxheWVyIGlzIGFscmVhZHkgaW5jbHVkZWRcbiAgaWYgKGZpbHRlcklkKSB7XG4gICAgZmlsdGVySWR4ID0gc3RhdGUuZmlsdGVycy5maW5kSW5kZXgoZiA9PiBmLmlkID09PSBmaWx0ZXJJZCk7XG5cbiAgICBpZiAoIXN0YXRlLmZpbHRlcnNbZmlsdGVySWR4XSkge1xuICAgICAgLy8gd2hhdCBpZiBmaWx0ZXIgZG9lc24ndCBleGlzdD8uLi4gbm90IHBvc3NpYmxlLlxuICAgICAgLy8gYmVjYXVzZSBmZWF0dXJlcyBpbiB0aGUgZWRpdG9yIGlzIHBhc3NlZCBpbiBmcm9tIGZpbHRlcnMgYW5kIGVkaXRvcnMuXG4gICAgICAvLyBidXQgd2Ugd2lsbCBtb3ZlIHRoaXMgZmVhdHVyZSBiYWNrIHRvIGVkaXRvciBqdXN0IGluIGNhc2VcbiAgICAgIGNvbnN0IG5vbmVGaWx0ZXJGZWF0dXJlID0ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgLi4uZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgIGZpbHRlcklkOiBudWxsXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBlZGl0b3I6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgICAgICAgZmVhdHVyZXM6IFsuLi5zdGF0ZS5lZGl0b3IuZmVhdHVyZXMsIG5vbmVGaWx0ZXJGZWF0dXJlXSxcbiAgICAgICAgICBzZWxlY3RlZEZlYXR1cmU6IG5vbmVGaWx0ZXJGZWF0dXJlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlciA9IHN0YXRlLmZpbHRlcnNbZmlsdGVySWR4XTtcbiAgICBjb25zdCB7bGF5ZXJJZCA9IFtdfSA9IGZpbHRlcjtcbiAgICBjb25zdCBpc0xheWVySW5jbHVkZWQgPSBsYXllcklkLmluY2x1ZGVzKGxheWVyLmlkKTtcblxuICAgIG5ld0xheWVySWQgPSBpc0xheWVySW5jbHVkZWRcbiAgICAgID8gLy8gaWYgbGF5ZXIgaXMgaW5jbHVkZWQsIHJlbW92ZSBpdFxuICAgICAgICBsYXllcklkLmZpbHRlcihsID0+IGwgIT09IGxheWVyLmlkKVxuICAgICAgOiBbLi4ubGF5ZXJJZCwgbGF5ZXIuaWRdO1xuICB9IGVsc2Uge1xuICAgIC8vIGlmIHdlIGhhdmVuJ3QgY3JlYXRlIHRoZSBwb2x5Z29uIGZpbHRlciwgY3JlYXRlIGl0XG4gICAgY29uc3QgbmV3RmlsdGVyID0gZ2VuZXJhdGVQb2x5Z29uRmlsdGVyKFtdLCBmZWF0dXJlKTtcbiAgICBmaWx0ZXJJZHggPSBzdGF0ZS5maWx0ZXJzLmxlbmd0aDtcblxuICAgIC8vIGFkZCBmZWF0dXJlLCByZW1vdmUgZmVhdHVyZSBmcm9tIGVpZHRvclxuICAgIG5ld1N0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBmaWx0ZXJzOiBbLi4uc3RhdGUuZmlsdGVycywgbmV3RmlsdGVyXSxcbiAgICAgIGVkaXRvcjoge1xuICAgICAgICAuLi5zdGF0ZS5lZGl0b3IsXG4gICAgICAgIGZlYXR1cmVzOiBzdGF0ZS5lZGl0b3IuZmVhdHVyZXMuZmlsdGVyKGYgPT4gZi5pZCAhPT0gZmVhdHVyZS5pZCksXG4gICAgICAgIHNlbGVjdGVkRmVhdHVyZTogbmV3RmlsdGVyLnZhbHVlXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzZXRGaWx0ZXJVcGRhdGVyKG5ld1N0YXRlLCB7XG4gICAgaWR4OiBmaWx0ZXJJZHgsXG4gICAgcHJvcDogJ2xheWVySWQnLFxuICAgIHZhbHVlOiBuZXdMYXllcklkXG4gIH0pO1xufVxuXG4vKipcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5zb3J0VGFibGVDb2x1bW5VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc29ydFRhYmxlQ29sdW1uVXBkYXRlcihzdGF0ZSwge2RhdGFJZCwgY29sdW1uLCBtb2RlfSkge1xuICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXTtcbiAgaWYgKCFkYXRhc2V0KSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGxldCBzb3J0TW9kZSA9IG1vZGU7XG4gIGlmICghc29ydE1vZGUpIHtcbiAgICBjb25zdCBjdXJyZW50TW9kZSA9IGdldChkYXRhc2V0LCBbJ3NvcnRDb2x1bW4nLCBjb2x1bW5dKTtcbiAgICAvLyBAdHMtaWdub3JlIC0gc2hvdWxkIGJlIGZpeGFibGUgaW4gYSBUUyBmaWxlXG4gICAgc29ydE1vZGUgPSBjdXJyZW50TW9kZVxuICAgICAgPyBPYmplY3Qua2V5cyhTT1JUX09SREVSKS5maW5kKG0gPT4gbSAhPT0gY3VycmVudE1vZGUpXG4gICAgICA6IFNPUlRfT1JERVIuQVNDRU5ESU5HO1xuICB9XG5cbiAgY29uc3Qgc29ydGVkID0gc29ydERhdGFzZXRCeUNvbHVtbihkYXRhc2V0LCBjb2x1bW4sIHNvcnRNb2RlKTtcbiAgcmV0dXJuIHNldChbJ2RhdGFzZXRzJywgZGF0YUlkXSwgc29ydGVkLCBzdGF0ZSk7XG59XG5cbi8qKlxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnBpblRhYmxlQ29sdW1uVXBkYXRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpblRhYmxlQ29sdW1uVXBkYXRlcihzdGF0ZSwge2RhdGFJZCwgY29sdW1ufSkge1xuICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXTtcbiAgaWYgKCFkYXRhc2V0KSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IGZpZWxkID0gZGF0YXNldC5maWVsZHMuZmluZChmID0+IGYubmFtZSA9PT0gY29sdW1uKTtcbiAgaWYgKCFmaWVsZCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGxldCBwaW5uZWRDb2x1bW5zO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhc2V0LnBpbm5lZENvbHVtbnMpICYmIGRhdGFzZXQucGlubmVkQ29sdW1ucy5pbmNsdWRlcyhmaWVsZC5uYW1lKSkge1xuICAgIC8vIHVucGluIGl0XG4gICAgcGlubmVkQ29sdW1ucyA9IGRhdGFzZXQucGlubmVkQ29sdW1ucy5maWx0ZXIoY28gPT4gY28gIT09IGZpZWxkLm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHBpbm5lZENvbHVtbnMgPSAoZGF0YXNldC5waW5uZWRDb2x1bW5zIHx8IFtdKS5jb25jYXQoZmllbGQubmFtZSk7XG4gIH1cblxuICByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWQsICdwaW5uZWRDb2x1bW5zJ10sIHBpbm5lZENvbHVtbnMsIHN0YXRlKTtcbn1cblxuLyoqXG4gKiBDb3B5IGNvbHVtbiBjb250ZW50IGFzIHN0cmluZ3NcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5jb3B5VGFibGVDb2x1bW5VcGRhdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29weVRhYmxlQ29sdW1uVXBkYXRlcihzdGF0ZSwge2RhdGFJZCwgY29sdW1ufSkge1xuICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXTtcbiAgaWYgKCFkYXRhc2V0KSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IGZpZWxkSWR4ID0gZGF0YXNldC5maWVsZHMuZmluZEluZGV4KGYgPT4gZi5uYW1lID09PSBjb2x1bW4pO1xuICBpZiAoZmllbGRJZHggPCAwKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHt0eXBlfSA9IGRhdGFzZXQuZmllbGRzW2ZpZWxkSWR4XTtcbiAgY29uc3QgdGV4dCA9IGRhdGFzZXQuZGF0YUNvbnRhaW5lclxuICAgIC5tYXAocm93ID0+IHBhcnNlRmllbGRWYWx1ZShyb3cudmFsdWVBdChmaWVsZElkeCksIHR5cGUpLCB0cnVlKVxuICAgIC5qb2luKCdcXG4nKTtcblxuICBjb3B5KHRleHQpO1xuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuXG4vL+WmguS9leWunuaXtuS/ruaUuWRhdGFzZXRzIGxheWVy55qE5pWI5p6c77yfXG4vKipcbiAqIENvcHkgY29sdW1uIGNvbnRlbnQgYXMgc3RyaW5nc++8mnRiYzogaG93IHRvIGNoYW5nZSB0aGUgdmlzdWFsaXphdGlvbiBzdGF0ZT9cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtdXBkYXRlcnMnKS5kZWxldGVUYWJsZUNvbHVtblVwZGF0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUYWJsZUNvbHVtblVwZGF0ZXIoc3RhdGUse2RhdGFJZCxjb2x1bW59KXtcbiAgY29uc29sZS5sb2coJ2RlbGV0ZSB0YWJsZSBjb2x1bW4gdXBkYXRlciBoZXJlJylcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW2RhdGFJZF07XG4gIGlmICghZGF0YXNldCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IG5ld19kYXRhc2V0ID0gZGVsZXRlX2RhdGFzZXRfY29sdW1uKGRhdGFzZXQsY29sdW1uKVxuICByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWRdLCBuZXdfZGF0YXNldCwgc3RhdGUpO1xufVxuXG4vL3RvZG86IGFkZCBDb2x1bW46IGZpcnN0IG5vdCBjb25zaWRlcmluZyBhZGRpbmcgYSBjb2x1bW4gbG9jay4gKHdoaWxlIGl0IGlzIG5lY2Vzc2FyeSBmb3IgYXBpIHF1ZXJ5KSxcbi8vdG9kbzogbWFrZSBpdCBhdmFpbGFibGUgdG8gZGVhbCB3aXRoIG11bHRpcGxlIGNvbHVtbnNcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWJsZUNvbHVtblVwZGF0ZXIoc3RhdGUse2RhdGFJZCxjb2x1bW4sZGF0YV90eXBlLHZhbHVlcyxyZXBsYWNlfSl7XG4gIGNvbnNvbGUubG9nKCdhZGQgdGFibGUgY29sdW1uJylcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW2RhdGFJZF07XG4gIGlmICghZGF0YXNldCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IG5ld19kYXRhc2V0ID0gYWRkX2RhdGFzZXRfY29sdW1uKGRhdGFzZXQsY29sdW1uLGRhdGFfdHlwZSx2YWx1ZXMscmVwbGFjZSlcbiAgcmV0dXJuIHNldChbJ2RhdGFzZXRzJywgZGF0YUlkXSwgbmV3X2RhdGFzZXQsIHN0YXRlKTtcbiAgLy8gY29uc3QgbmV3X2RhdGFzZXQgPVxufVxuXG4vL3RvZG86IGhlcmUgYWRkIG1vZGlmeSBjb2x1bW4gZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBHTVRNb2RpZnlUYWJsZUNvbHVtblVwZGF0ZXIoc3RhdGUsYWN0aW9uKXtcbiAgY29uc29sZS5sb2coJ2FkZCB0YWJsZSBjb2x1bW4nKVxuICAvLyBjb25zdCBkYXRhc2V0cyA9IHN0YXRlLmRhdGFzZXRzO1xuICBjb25zdCB7dmFsdWVMaXN0LGRhdGFzZXRzfSA9IGFjdGlvblxuICBjb25zdCB7b2RkYXRhSUQscG9pZGF0YUlELGdwc2RhdGFJRCxzcGF0aWFsRmlsdGVyfSA9IHN0YXRlLnByb2Nlc3Nvci5iYXRjaFxuXG4gIGNvbnN0IHtjb29yZHNNb2RpZnkscG9pVHlwZX0gPSBzcGF0aWFsRmlsdGVyXG5cbiAgY29uc3QgdmFsdWVkaWN0ID0ge31cbiAgdmFsdWVMaXN0Lm1hcCgoeCkgPT4ge1xuICAgIHZhbHVlZGljdFt4LmlkXSA9IHsnYWRkcmVzcyc6eC5hZGRyZXNzLCdsbmcnOngubG5nLCdsYXQnOngubGF0LCdwb2l0eXBlJzp4LnBvaXR5cGV9O1xuICB9KVxuXG5cbiAgaWYob2RkYXRhSUQpe1xuXG4gICAgY29uc29sZS5sb2coJ29kIGRhdGEgbWF0Y2ggZXhhbXBsZScpXG5cbiAgICBjb25zdCBvZF9zdGFydGlkX2lkeCA9IGdldF9pZHhfYnlfbmFtZShkYXRhc2V0c1tvZGRhdGFJRF0sREFUQVNFVF9DT0xVTU5TWydvZGRhdGEnXVsnaWQnXVswXSlcbiAgICBjb25zdCBvZF9lbmRpZF9pZHggPSBnZXRfaWR4X2J5X25hbWUoZGF0YXNldHNbb2RkYXRhSURdLERBVEFTRVRfQ09MVU1OU1snb2RkYXRhJ11bJ2lkJ11bMV0pXG5cbiAgICBjb25zdCBvZF9zdGFydGFkZF9pZHggPSBnZXRfaWR4X2J5X25hbWUoZGF0YXNldHNbb2RkYXRhSURdLERBVEFTRVRfQ09MVU1OU1snb2RkYXRhJ11bJ2FkZHJlc3MnXVswXSlcbiAgICBjb25zdCBvZF9lbmRhZGRfaWR4ID0gZ2V0X2lkeF9ieV9uYW1lKGRhdGFzZXRzW29kZGF0YUlEXSxEQVRBU0VUX0NPTFVNTlNbJ29kZGF0YSddWydhZGRyZXNzJ11bMV0pXG5cbiAgICBjb25zdCBvZF9zdGFydGdlb19pZHggPSBEQVRBU0VUX0NPTFVNTlNbJ29kZGF0YSddWydncHMnXVswXS5tYXAoKHgpPT5nZXRfaWR4X2J5X25hbWUoZGF0YXNldHNbb2RkYXRhSURdLHgpKVxuICAgIGNvbnN0IG9kX2VuZGdlb19pZHggPSBEQVRBU0VUX0NPTFVNTlNbJ29kZGF0YSddWydncHMnXVsxXS5tYXAoKHgpPT5nZXRfaWR4X2J5X25hbWUoZGF0YXNldHNbb2RkYXRhSURdLHgpKVxuXG4gICAgY29uc3Qgb2Rfc3RhcnRwb2lfaWR4ID0gZ2V0X2lkeF9ieV9uYW1lKGRhdGFzZXRzW29kZGF0YUlEXSxEQVRBU0VUX0NPTFVNTlNbJ29kZGF0YSddWydwb2kgbmFtZSddWzBdKVxuICAgIGNvbnN0IG9kX2VuZHBvaV9pZHggPSBnZXRfaWR4X2J5X25hbWUoZGF0YXNldHNbb2RkYXRhSURdLERBVEFTRVRfQ09MVU1OU1snb2RkYXRhJ11bJ3BvaSBuYW1lJ11bMV0pXG5cbiAgICAvLyBoZXJlIGZpcnN0IGdldCB0aGUgaW5kZXhcbiAgICBkYXRhc2V0c1tvZGRhdGFJRF0uZGF0YUNvbnRhaW5lci5fcm93cyA9IGRhdGFzZXRzW29kZGF0YUlEXS5kYXRhQ29udGFpbmVyLl9yb3dzLm1hcCgoeCk9PntcblxuICAgICAgeFtvZF9zdGFydGFkZF9pZHhdID0gdmFsdWVkaWN0W3hbb2Rfc3RhcnRpZF9pZHhdXT8uYWRkcmVzc1xuICAgICAgeFtvZF9lbmRhZGRfaWR4XSA9IHZhbHVlZGljdFt4W29kX2VuZGlkX2lkeF1dPy5hZGRyZXNzXG5cbiAgICAgIGlmKGNvb3Jkc01vZGlmeSl7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgeFtvZF9zdGFydGdlb19pZHhbMF1dID0gdmFsdWVkaWN0W3hbb2Rfc3RhcnRpZF9pZHhdXT8ubG5nXG4gICAgICAgIHhbb2Rfc3RhcnRnZW9faWR4WzFdXSA9IHZhbHVlZGljdFt4W29kX3N0YXJ0aWRfaWR4XV0/LmxhdFxuICAgICAgICB4W29kX2VuZGdlb19pZHhbMF1dID0gdmFsdWVkaWN0W3hbb2RfZW5kaWRfaWR4XV0/LmxuZ1xuICAgICAgICB4W29kX2VuZGdlb19pZHhbMV1dID0gdmFsdWVkaWN0W3hbb2RfZW5kaWRfaWR4XV0/LmxhdFxuICAgICAgfVxuXG4gICAgICBpZihwb2lUeXBlKXtcbiAgICAgICAgeFtvZF9zdGFydHBvaV9pZHhdID0gdmFsdWVkaWN0W3hbb2Rfc3RhcnRpZF9pZHhdXT8ucG9pdHlwZVxuICAgICAgICB4W29kX2VuZHBvaV9pZHhdID0gdmFsdWVkaWN0W3hbb2RfZW5kaWRfaWR4XV0/LnBvaXR5cGVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgKVxuICB9XG5cbiAgaWYocG9pZGF0YUlEKXtcbiAgICBjb25zdCBwb2lfaWRfaWR4ID0gZ2V0X2lkeF9ieV9uYW1lKGRhdGFzZXRzW3BvaWRhdGFJRF0sREFUQVNFVF9DT0xVTU5TWydwb2lkYXRhJ11bJ2lkJ11bMF0pXG4gICAgY29uc3QgcG9pX2FkZF9pZHggPSBnZXRfaWR4X2J5X25hbWUoZGF0YXNldHNbcG9pZGF0YUlEXSxEQVRBU0VUX0NPTFVNTlNbJ3BvaWRhdGEnXVsnYWRkcmVzcyddWzBdKVxuICAgIGNvbnN0IHBvaV9nZW9faWR4ID0gREFUQVNFVF9DT0xVTU5TWydwb2lkYXRhJ11bJ2dwcyddWzBdLm1hcCgoeCk9PmdldF9pZHhfYnlfbmFtZShkYXRhc2V0c1twb2lkYXRhSURdLHgpKVxuICAgIGNvbnN0IHBvaV90eXBlX2lkeCA9IGdldF9pZHhfYnlfbmFtZShkYXRhc2V0c1twb2lkYXRhSURdLERBVEFTRVRfQ09MVU1OU1sncG9pZGF0YSddWydwb2kgbmFtZSddWzBdKVxuXG5cbiAgICAvL2lmIGtlZXBpbmcgaWQ/IHRiZFxuICAgIGRhdGFzZXRzW3BvaWRhdGFJRF0uZGF0YUNvbnRhaW5lci5fcm93cyA9IGRhdGFzZXRzW3BvaWRhdGFJRF0uZGF0YUNvbnRhaW5lci5fcm93cy5tYXAoKHgpPT57XG4gICAgICB4W3BvaV9hZGRfaWR4XSA9IHZhbHVlZGljdFt4W3BvaV9pZF9pZHhdXT8uYWRkcmVzc1xuICAgICAgaWYoY29vcmRzTW9kaWZ5KXtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB4W3BvaV9nZW9faWR4WzBdXSA9IHZhbHVlZGljdFt4W3BvaV9pZF9pZHhdXT8ubG5nXG4gICAgICAgIHhbcG9pX2dlb19pZHhbMV1dID0gdmFsdWVkaWN0W3hbcG9pX2lkX2lkeF1dPy5sYXRcbiAgICAgIH1cblxuICAgICAgaWYocG9pVHlwZSl7XG4gICAgICAgIHhbcG9pX3R5cGVfaWR4XSA9IHZhbHVlZGljdFt4W3BvaV9pZF9pZHhdXT8ucG9pdHlwZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geFxuICAgIH0pXG5cbiAgfVxuXG4gIHN0YXRlID0gW29kZGF0YUlELGdwc2RhdGFJRCxwb2lkYXRhSURdLnJlZHVjZSgoc3QsaWQpPT5pZD9yZXJlbmRlcldpdGhEYXRhc2V0KHN0LGRhdGFzZXRzW2lkXSk6c3Qsc3RhdGUpXG4gIENvbXByZXNzRXhwb3J0RGF0YShzdGF0ZSx7c2VsZWN0ZWREYXRhc2V0OiAnJywgZGF0YVR5cGU6ICdDU1YnLCBmaWx0ZXJlZDogZmFsc2V9LHRydWUpXG4gIHJldHVybiBzdGF0ZVxuXG5cblxuXG4gIC8vIGRlZmluZSB0aGUgb3V0cHV0IG9mIHZhbHVlIGxpc3Q6IFtncHMsYWRkcmVzcyxwb2l0eXBlXVxuICAvLyByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWRdLCBuZXdfZGF0YXNldCwgc3RhdGUpO1xuICAvLyBjb25zdCBuZXdfZGF0YXNldCA9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByb2Nlc3NvclVwZGF0ZXIoc3RhdGUsZmxhZyxwcm9jZXNzb3JfdHlwZT0xKXtcbiAgY29uc29sZS5sb2coJ3JlbW92ZSBwcm9jZXNzb3IgaGVyZScpXG4gIGxldCBuZXdTdGF0ZSA9IHN0YXRlXG4gIGNvbnN0IHByZXByb2Nlc3NvciA9IHByb2Nlc3Nvcl90eXBlPT09MT97cHJvYzpuZXdTdGF0ZS5wcm9jZXNzb3IsdGltZTpuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpLHByZWZsYWc6ZmxhZ306e3Byb2M6bmV3U3RhdGUucHJvY2Vzc29yLHRpbWU6bmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKSxwcmViYXRjaGZsYWc6ZmxhZ31cbiAgaWYoZmxhZyl7XG4gICAgbmV3U3RhdGUucHJvY2Vzc29yID0gcHJvY2Vzc29yX3R5cGU9PT0xP18uY2xvbmVEZWVwKERFRkFVTFRfUFJPQ0VTU09SX1NUUlVDVFVSRSk6bmV3U3RhdGUucHJvY2Vzc29yXG4gIH1cbiAgbmV3U3RhdGUucHJvY2Vzc29yLnByZXByb2Nlc3NvciA9IHByZXByb2Nlc3NvclxuICByZXR1cm4gbmV3U3RhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlUHJvY2Vzc29yVXBkYXRlcihzdGF0ZSl7XG4gIGNvbnNvbGUubG9nKCdhY3RpdmF0ZSBwcm9jZXNzb3IgaGVyZScpXG4gIGxldCBuZXdTdGF0ZSA9IHN0YXRlXG5cbiAgaWYobmV3U3RhdGUucHJvY2Vzc29yKXtcbiAgICBuZXdTdGF0ZS5wcm9jZXNzb3IuZmxhZyA9IHRydWVcbiAgfVxuXG4gIHJldHVybiBuZXdTdGF0ZVxufVxuXG5cbi8vdG9kbzogdXBkYXRlIGNvbHVtbjpcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVUYWJsZUNvbHVtblVwZGF0ZXIoc3RhdGUse2RhdGFJZCxjb2x1bW4sdmFsdWVzfSl7XG4gIGNvbnNvbGUubG9nKCd1cGRhdGUgdGFibGUgY29sdW1uJylcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW2RhdGFJZF07XG4gIGlmICghZGF0YXNldCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IG5ld19kYXRhc2V0ID0gdXBkYXRlX2RhdGFzZXRfY29sdW1uKGRhdGFzZXQsY29sdW1uLHZhbHVlcylcbiAgcmV0dXJuIHNldChbJ2RhdGFzZXRzJywgZGF0YUlkXSwgbmV3X2RhdGFzZXQsIHN0YXRlKTtcblxufVxuXG4vKipcbiAqIFVwZGF0ZSBlZGl0b3JcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS11cGRhdGVycycpLnRvZ2dsZUVkaXRvclZpc2liaWxpdHlVcGRhdGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWRpdG9yVmlzaWJpbGl0eVVwZGF0ZXIoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBlZGl0b3I6IHtcbiAgICAgIC4uLnN0YXRlLmVkaXRvcixcbiAgICAgIHZpc2libGU6ICFzdGF0ZS5lZGl0b3IudmlzaWJsZVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlckFuaW1hdGlvblRpbWVDb25maWdVcGRhdGVyKHN0YXRlLCB7aWR4LCBjb25maWd9KSB7XG4gIGNvbnN0IG9sZEZpbHRlciA9IHN0YXRlLmZpbHRlcnNbaWR4XTtcbiAgaWYgKCFvbGRGaWx0ZXIpIHtcbiAgICBDb25zb2xlLmVycm9yKGBmaWx0ZXJzLiR7aWR4fSBpcyB1bmRlZmluZWRgKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgaWYgKG9sZEZpbHRlci50eXBlICE9PSBGSUxURVJfVFlQRVMudGltZVJhbmdlKSB7XG4gICAgQ29uc29sZS5lcnJvcihcbiAgICAgIGBzZXRGaWx0ZXJBbmltYXRpb25UaW1lQ29uZmlnIGNhbiBvbmx5IGJlIGNhbGxlZCB0byB1cGRhdGUgYSB0aW1lIGZpbHRlci4gY2hlY2sgZmlsdGVyLnR5cGUgPT09ICd0aW1lUmFuZ2UnYFxuICAgICk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgdXBkYXRlcyA9IGNoZWNrVGltZUNvbmZpZ0FyZ3MoY29uZmlnKTtcblxuICByZXR1cm4gcGlja18oJ2ZpbHRlcnMnKShzd2FwXyhtZXJnZV8odXBkYXRlcykob2xkRmlsdGVyKSkpKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUaW1lQ29uZmlnQXJncyhjb25maWcpIHtcbiAgY29uc3QgYWxsb3dlZCA9IFsndGltZUZvcm1hdCcsICd0aW1lem9uZSddO1xuICByZXR1cm4gT2JqZWN0LmtleXMoY29uZmlnKS5yZWR1Y2UoKGFjY3UsIHByb3ApID0+IHtcbiAgICBpZiAoIWFsbG93ZWQuaW5jbHVkZXMocHJvcCkpIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoXG4gICAgICAgIGBzZXRMYXllckFuaW1hdGlvblRpbWVDb25maWcgdGFrZXMgdGltZUZvcm1hdCBhbmQvb3IgdGltZXpvbmUgYXMgb3B0aW9ucywgZm91bmQgJHtwcm9wfWBcbiAgICAgICk7XG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9XG5cbiAgICAvLyBoZXJlIHdlIGFyZSBOT1QgY2hlY2tpbmcgaWYgdGltZXpvbmUgb3IgdGltZUZvcm1hdCBpbnB1dCBpcyB2YWxpZFxuICAgIGFjY3VbcHJvcF0gPSBjb25maWdbcHJvcF07XG4gICAgcmV0dXJuIGFjY3U7XG4gIH0sIHt9KTtcbn1cbi8qKlxuICogVXBkYXRlIGVkaXRvclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJykuc2V0TGF5ZXJBbmltYXRpb25UaW1lQ29uZmlnVXBkYXRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExheWVyQW5pbWF0aW9uVGltZUNvbmZpZ1VwZGF0ZXIoc3RhdGUsIHtjb25maWd9KSB7XG4gIGlmICghY29uZmlnKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHVwZGF0ZXMgPSBjaGVja1RpbWVDb25maWdBcmdzKGNvbmZpZyk7XG4gIHJldHVybiBwaWNrXygnYW5pbWF0aW9uQ29uZmlnJykobWVyZ2VfKHVwZGF0ZXMpKShzdGF0ZSk7XG59XG5cbiJdfQ==