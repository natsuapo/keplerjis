"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerConfigChange = layerConfigChange;
exports.layerTextLabelChange = layerTextLabelChange;
exports.layerTypeChange = layerTypeChange;
exports.layerVisualChannelConfigChange = layerVisualChannelConfigChange;
exports.layerVisConfigChange = layerVisConfigChange;
exports.layerColorUIChange = layerColorUIChange;
exports.updateLayerBlending = updateLayerBlending;
exports.interactionConfigChange = interactionConfigChange;
exports.setFilter = setFilter;
exports.setProcessor = setProcessor;
exports.runProcessor = runProcessor;
exports.runProcessorBatch = runProcessorBatch;
exports.removeProcessor = removeProcessor;
exports.activateProcessor = activateProcessor;
exports.setFilterAnimationTime = setFilterAnimationTime;
exports.setFilterAnimationWindow = setFilterAnimationWindow;
exports.addFilter = addFilter;
exports.addProcessor = addProcessor;
exports.addLayer = addLayer;
exports.reorderLayer = reorderLayer;
exports.removeFilter = removeFilter;
exports.removeLayer = removeLayer;
exports.duplicateLayer = duplicateLayer;
exports.removeDataset = removeDataset;
exports.showDatasetTable = showDatasetTable;
exports.sortTableColumn = sortTableColumn;
exports.deleteTableColumn = deleteTableColumn;
exports.addTableColumn = addTableColumn;
exports.GMTModifyTableColumn = GMTModifyTableColumn;
exports.pinTableColumn = pinTableColumn;
exports.copyTableColumn = copyTableColumn;
exports.updateVisData = updateVisData;
exports.renameDataset = renameDataset;
exports.toggleFilterAnimation = toggleFilterAnimation;
exports.updateFilterAnimationSpeed = updateFilterAnimationSpeed;
exports.setLayerAnimationTime = setLayerAnimationTime;
exports.updateLayerAnimationSpeed = updateLayerAnimationSpeed;
exports.toggleLayerAnimation = toggleLayerAnimation;
exports.toggleLayerAnimationControl = toggleLayerAnimationControl;
exports.enlargeFilter = enlargeFilter;
exports.toggleFilterFeature = toggleFilterFeature;
exports.onLayerHover = onLayerHover;
exports.onLayerClick = onLayerClick;
exports.onMapClick = onMapClick;
exports.onMouseMove = onMouseMove;
exports.toggleLayerForMap = toggleLayerForMap;
exports.setFilterPlot = setFilterPlot;
exports.setMapInfo = setMapInfo;
exports.loadFiles = loadFiles;
exports.loadNextFile = loadNextFile;
exports.loadFilesSuccess = loadFilesSuccess;
exports.loadFileStepSuccess = loadFileStepSuccess;
exports.loadFilesErr = loadFilesErr;
exports.setFeatures = setFeatures;
exports.setPolygonFilterLayer = setPolygonFilterLayer;
exports.setSelectedFeature = setSelectedFeature;
exports.deleteFeature = deleteFeature;
exports.setEditorMode = setEditorMode;
exports.applyCPUFilter = applyCPUFilter;
exports.toggleEditorVisibility = toggleEditorVisibility;
exports.nextFileBatch = nextFileBatch;
exports.processFileContent = processFileContent;
exports.setLayerAnimationTimeConfig = setLayerAnimationTimeConfig;
exports.setFilterAnimationTimeConfig = setFilterAnimationTimeConfig;

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// vis-state-reducer

/**
 * Update layer base config: dataId, label, column, isVisible
 * @param oldLayer - layer to be updated
 * @param newConfig - new config to be merged with old config
 * @returns action
 * @type {typeof import('./vis-state-actions').layerConfigChange}
 * @public
 */
function layerConfigChange(oldLayer, newConfig) {
  return {
    type: _actionTypes["default"].LAYER_CONFIG_CHANGE,
    oldLayer: oldLayer,
    newConfig: newConfig
  };
}
/**
 * Update layer text label
 * @param oldLayer - layer to be updated
 * @param idx -`idx` of text label to be updated
 * @param prop - `prop` of text label, e,g, `anchor`, `alignment`, `color`, `size`, `field`
 * @param value - new value
 * @returns action
 * @type {typeof import('./vis-state-actions').layerTextLabelChange}
 * @public
 */


function layerTextLabelChange(oldLayer, idx, prop, value) {
  return {
    type: _actionTypes["default"].LAYER_TEXT_LABEL_CHANGE,
    oldLayer: oldLayer,
    idx: idx,
    prop: prop,
    value: value
  };
}
/**
 * Update layer type. Previews layer config will be copied if applicable.
 * @param oldLayer - layer to be updated
 * @param newType - new type
 * @returns action
 * @type {typeof import('./vis-state-actions').layerTypeChange}
 * @public
 */


function layerTypeChange(oldLayer, newType) {
  return {
    type: _actionTypes["default"].LAYER_TYPE_CHANGE,
    oldLayer: oldLayer,
    newType: newType
  };
}
/**
 * Update layer visual channel
 * @memberof visStateActions
 * @param oldLayer - layer to be updated
 * @param newConfig - new visual channel config
 * @param channel - channel to be updated
 * @returns action
 * @type {typeof import('./vis-state-actions').layerVisualChannelConfigChange}
 * @public
 */


function layerVisualChannelConfigChange(oldLayer, newConfig, channel) {
  return {
    type: _actionTypes["default"].LAYER_VISUAL_CHANNEL_CHANGE,
    oldLayer: oldLayer,
    newConfig: newConfig,
    channel: channel
  };
}
/**
 * Update layer `visConfig`
 * @memberof visStateActions
 * @param oldLayer - layer to be updated
 * @param newVisConfig - new visConfig as a key value map: e.g. `{opacity: 0.8}`
 * @returns action
 * @type {typeof import('./vis-state-actions').layerVisConfigChange}
 * @public
 */


function layerVisConfigChange(oldLayer, newVisConfig) {
  return {
    type: _actionTypes["default"].LAYER_VIS_CONFIG_CHANGE,
    oldLayer: oldLayer,
    newVisConfig: newVisConfig
  };
}
/**
 * Set the color palette ui for layer color
 * @memberOf visStateActions
 * @param oldLayer - layer to be updated
 * @param prop - which color prop
 * @param newConfig - to be merged
 * @returns action
 * @type {typeof import('./vis-state-actions').layerColorUIChange}
 * @public
 */


function layerColorUIChange(oldLayer, prop, newConfig) {
  return {
    type: _actionTypes["default"].LAYER_COLOR_UI_CHANGE,
    oldLayer: oldLayer,
    prop: prop,
    newConfig: newConfig
  };
}
/**
 * Update layer blending mode
 * @memberof visStateActions
 * @param mode one of `additive`, `normal` and `subtractive`
 * @returns action
 * @type {typeof import('./vis-state-actions').updateLayerBlending}
 * @public
 */


function updateLayerBlending(mode) {
  return {
    type: _actionTypes["default"].UPDATE_LAYER_BLENDING,
    mode: mode
  };
}
/**
 * Update `interactionConfig`
 * @memberof visStateActions
 * @param config - new config as key value map: `{tooltip: {enabled: true}}`
 * @returns action
 * @type {typeof import('./vis-state-actions').interactionConfigChange}
 * @public
 */


function interactionConfigChange(config) {
  return {
    type: _actionTypes["default"].INTERACTION_CONFIG_CHANGE,
    config: config
  };
}
/**
 * Update filter property
 * @memberof visStateActions
 * @param idx -`idx` of filter to be updated
 * @param prop - `prop` of filter, e,g, `dataId`, `name`, `value`
 * @param value - new value
 * @param valueIndex - dataId index
 * @returns action
 * @type {typeof import('./vis-state-actions').setFilter}
 * @public
 */


function setFilter(idx, prop, value, valueIndex) {
  return {
    type: _actionTypes["default"].SET_FILTER,
    idx: idx,
    prop: prop,
    value: value,
    valueIndex: valueIndex
  };
}

function setProcessor(prop, value, valueIndex) {
  return {
    type: _actionTypes["default"].SET_PROCESSOR,
    prop: prop,
    value: value,
    valueIndex: valueIndex
  };
} // export function setProcessorList(prop,value,valueIndex) {
//   return {
//     type: ActionTypes.SET_PROCESSOR_LIST,
//     prop,
//     value,
//     valueIndex
//   };
// }


function runProcessor(prop, visStateAction) {
  return {
    type: _actionTypes["default"].RUN_PROCESSOR,
    prop: prop,
    visStateAction: visStateAction
  };
}

function runProcessorBatch(prop, visStateAction) {
  return {
    type: _actionTypes["default"].RUN_PROCESSOR_BATCH,
    prop: prop,
    visStateAction: visStateAction
  };
}

function removeProcessor(flag) {
  return {
    'type': _actionTypes["default"].REMOVE_PROCESSOR,
    flag: flag
  };
}

function activateProcessor() {
  return {
    'type': _actionTypes["default"].ACTIVATE_PROCESSOR
  };
}
/**
 * Same as Update filter
 * @memberof visStateActions
 * @param idx -`idx` of filter to be updated
 * @param prop - `prop` of filter, e,g, `dataId`, `name`, `value`
 * @param value - new value
 * @param valueIndex - dataId index
 * @returns action
 * @type {typeof import('./vis-state-actions').setFilterAnimationTime}
 * @public
 */


function setFilterAnimationTime(idx, prop, value, valueIndex) {
  return {
    type: _actionTypes["default"].SET_FILTER_ANIMATION_TIME,
    idx: idx,
    prop: prop,
    value: value,
    valueIndex: valueIndex
  };
}
/**
 * Same as Update filter
 * @memberof visStateActions
 * @type {typeof import('./vis-state-actions').setFilterAnimationWindow}
 * @public
 */


function setFilterAnimationWindow(_ref) {
  var id = _ref.id,
      animationWindow = _ref.animationWindow;
  return {
    type: _actionTypes["default"].SET_FILTER_ANIMATION_WINDOW,
    id: id,
    animationWindow: animationWindow
  };
}
/**
 * Add a new filter
 * @memberof visStateActions
 * @param dataId - dataset `id` this new filter is associated with
 * @returns action
 * @type {typeof import('./vis-state-actions').addFilter}
 * @public
 */


function addFilter(dataId) {
  return {
    type: _actionTypes["default"].ADD_FILTER,
    dataId: dataId
  };
}

function addProcessor(dataId) {
  return {
    type: _actionTypes["default"].ADD_PROCESSOR,
    dataId: dataId
  };
}
/**
 * Add a new layer
 * @memberof visStateActions
 * @param config - new layer config
 * @returns action
 * @type {typeof import('./vis-state-actions').addLayer}
 * @public
 */


function addLayer(config) {
  return {
    type: _actionTypes["default"].ADD_LAYER,
    config: config
  };
}
/**
 * Reorder layer, order is an array of layer indexes, index 0 will be the one at the bottom
 * @memberof visStateActions
 * @param order an array of layer indexes
 * @returns action
 * @type {typeof import('./vis-state-actions').reorderLayer}
 * @public
 * @example
 *
 * // bring `layers[1]` below `layers[0]`, the sequence layers will be rendered is `1`, `0`, `2`, `3`.
 * // `1` will be at the bottom, `3` will be at the top.
 * this.props.dispatch(reorderLayer([1, 0, 2, 3]));
 */


function reorderLayer(order) {
  return {
    type: _actionTypes["default"].REORDER_LAYER,
    order: order
  };
}
/**
 * Remove a filter from `visState.filters`, once a filter is removed, data will be re-filtered and layer will be updated
 * @memberof visStateActions
 * @param idx idx of filter to be removed
 * @returns action
 * @type {typeof import('./vis-state-actions').removeFilter}
 * @public
 */


function removeFilter(idx) {
  return {
    type: _actionTypes["default"].REMOVE_FILTER,
    idx: idx
  };
}
/**
 * Remove a layer
 * @memberof visStateActions
 * @param idx idx of layer to be removed
 * @returns action
 * @type {typeof import('./vis-state-actions').removeLayer}
 * @public
 */


function removeLayer(idx) {
  return {
    type: _actionTypes["default"].REMOVE_LAYER,
    idx: idx
  };
}
/**
 * Duplicate a layer
 * @memberof visStateActions
 * @param idx idx of layer to be duplicated
 * @returns action
 * @type {typeof import('./vis-state-actions').duplicateLayer}
 * @public
 */


function duplicateLayer(idx) {
  return {
    type: _actionTypes["default"].DUPLICATE_LAYER,
    idx: idx
  };
}
/**
 * Remove a dataset and all layers, filters, tooltip configs that based on it
 * @memberof visStateActions
 * @param dataId dataset id
 * @returns action
 * @type {typeof import('./vis-state-actions').removeDataset}
 * @public
 */


function removeDataset(dataId) {
  return {
    type: _actionTypes["default"].REMOVE_DATASET,
    dataId: dataId
  };
}
/**
 * Display dataset table in a modal
 * @memberof visStateActions
 * @param dataId dataset id to show in table
 * @returns action
 * @type {typeof import('./vis-state-actions').showDatasetTable}
 * @public
 */


function showDatasetTable(dataId) {
  return {
    type: _actionTypes["default"].SHOW_DATASET_TABLE,
    dataId: dataId
  };
}
/**
 * Sort dataset column, for table display
 * @memberof visStateActions
 * @param dataId
 * @param column
 * @param mode
 * @returns action
 * @type {typeof import('./vis-state-actions').sortTableColumn}
 * @public
 */


function sortTableColumn(dataId, column, mode) {
  return {
    type: _actionTypes["default"].SORT_TABLE_COLUMN,
    dataId: dataId,
    column: column,
    mode: mode
  };
}
/**
 * Copy column, for table display
 * @param dataId
 * @param column
 * @returns action
 * @type {typeof import('./vis-state-actions').deleteTableColumn}
 * @public
 */


function deleteTableColumn(dataId, column) {
  console.log('delete table column');
  return {
    type: _actionTypes["default"].DELETE_TABLE_COLUMN,
    dataId: dataId,
    column: column
  };
}
/**
 * Copy column, for table display
 * @param dataId
 * @param column
 * @param data_type
 * @param values
 * @returns action
 * @type {typeof import('./vis-state-actions').addTableColumn}
 * @public
 */


function addTableColumn(dataId, column, data_type, values, replace) {
  console.log('action types:' + _actionTypes["default"].ADD_TABLE_COLUMN);
  return {
    type: _actionTypes["default"].ADD_TABLE_COLUMN,
    dataId: dataId,
    column: column,
    // @ts-ignore
    data_type: data_type,
    values: values,
    replace: replace
  };
}

function GMTModifyTableColumn(valueList, datasets) {
  return {
    type: _actionTypes["default"].GMT_MODIFY_TABLE_COLUMN,
    valueList: valueList,
    datasets: datasets
  };
}
/**
 * Pin dataset column, for table display
 * @param dataId
 * @param column
 * @returns action
 * @type {typeof import('./vis-state-actions').pinTableColumn}
 * @public
 */


function pinTableColumn(dataId, column) {
  return {
    type: _actionTypes["default"].PIN_TABLE_COLUMN,
    dataId: dataId,
    column: column
  };
}
/**
 * Copy column, for table display
 * @param dataId
 * @param column
 * @returns action
 * @type {typeof import('./vis-state-actions').copyTableColumn}
 * @public
 */


function copyTableColumn(dataId, column) {
  return {
    type: _actionTypes["default"].COPY_TABLE_COLUMN,
    dataId: dataId,
    column: column
  };
} // * @param dataset.info -info of a dataset
// * @param dataset.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
// * @param dataset.info.label - A display name of this dataset
// * @param dataset.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
// * @param dataset.data.fields - ***required** Array of fields,
// * @param dataset.data.fields.name - ***required** Name of the field,
// * @param dataset.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`

/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateActions
 * @param datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {object} options
 * @param options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
 * place the map view within the data points boundaries
 * @param options.readOnly `default: false` if `readOnly` is set to `true`
 * the left setting panel will be hidden
 * @param config this object will contain the full kepler.gl instance configuration {mapState, mapStyle, visState}
 * @returns action
 * @type {typeof import('./vis-state-actions').updateVisData}
 * @public
 */


function updateVisData(datasets, options, config) {
  return {
    type: _actionTypes["default"].UPDATE_VIS_DATA,
    datasets: datasets,
    options: options,
    config: config
  };
}
/**
 * Rename an existing dataset in `visState`
 * @memberof visStateActions
 * @param dataId - ***required** Id of the dataset to update
 * @param label - ***required** New name for the dataset
 * @returns action
 * @type {typeof import('./vis-state-actions').renameDataset}
 * @public
 */


function renameDataset(dataId, label) {
  return {
    type: _actionTypes["default"].RENAME_DATASET,
    dataId: dataId,
    label: label
  };
}
/**
 * Start and end filter animation
 * @memberof visStateActions
 * @param {Number} idx of filter
 * @type {typeof import('./vis-state-actions').toggleFilterAnimation}
 * @returns action
 * @public
 */


function toggleFilterAnimation(idx) {
  return {
    type: _actionTypes["default"].TOGGLE_FILTER_ANIMATION,
    idx: idx
  };
}
/**
 * Change filter animation speed
 * @memberof visStateActions
 * @param idx -  `idx` of filter
 * @param speed - `speed` to change it to. `speed` is a multiplier
 * @type {typeof import('./vis-state-actions').updateFilterAnimationSpeed}
 * @returns action
 * @public
 */


function updateFilterAnimationSpeed(idx, speed) {
  return {
    type: _actionTypes["default"].UPDATE_FILTER_ANIMATION_SPEED,
    idx: idx,
    speed: speed
  };
}
/**
 * Reset animation
 * @memberof visStateActions
 * @param value -  Current value of the slider
 * @type {typeof import('./vis-state-actions').setLayerAnimationTime}
 * @returns action
 * @public
 */


function setLayerAnimationTime(value) {
  return {
    type: _actionTypes["default"].SET_LAYER_ANIMATION_TIME,
    value: value
  };
}
/**
 * update trip layer animation speed
 * @memberof visStateActions
 * @param speed - `speed` to change it to. `speed` is a multiplier
 * @type {typeof import('./vis-state-actions').updateLayerAnimationSpeed}
 * @returns action
 * @public
 */


function updateLayerAnimationSpeed(speed) {
  return {
    type: _actionTypes["default"].UPDATE_LAYER_ANIMATION_SPEED,
    speed: speed
  };
}
/**
 * start end end layer animation
 * @memberof visStateActions
 * @type {typeof import('./vis-state-actions').toggleLayerAnimation}
 * @returns action
 * @public
 */


function toggleLayerAnimation() {
  return {
    type: _actionTypes["default"].TOGGLE_LAYER_ANIMATION
  };
}
/**
 * hide and show layer animation control
 * @memberof visStateActions
 * @type {typeof import('./vis-state-actions').toggleLayerAnimationControl}
 * @returns action
 * @public
 */


function toggleLayerAnimationControl() {
  return {
    type: _actionTypes["default"].TOGGLE_LAYER_ANIMATION_CONTROL
  };
}
/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateActions
 * @param idx - index of filter to enlarge
 * @type {typeof import('./vis-state-actions').enlargeFilter}
 * @returns action
 * @public
 */


function enlargeFilter(idx) {
  return {
    type: _actionTypes["default"].ENLARGE_FILTER,
    idx: idx
  };
}
/**
 * Show/hide filter feature on map
 * @memberof visStateActions
 * @param idx - index of filter feature to show/hide
 * @type {typeof import('./vis-state-actions').toggleFilterFeature}
 * @return action
 */


function toggleFilterFeature(idx) {
  return {
    type: _actionTypes["default"].TOGGLE_FILTER_FEATURE,
    idx: idx
  };
}
/**
 * Trigger layer hover event with hovered object
 * @memberof visStateActions
 * @param info - Object hovered, returned by deck.gl
 * @type {typeof import('./vis-state-actions').onLayerHover}
 * @returns action
 * @public
 */


function onLayerHover(info) {
  return {
    type: _actionTypes["default"].LAYER_HOVER,
    info: info
  };
}
/**
 * Trigger layer click event with clicked object
 * @memberof visStateActions
 * @param info - Object clicked, returned by deck.gl
 * @type {typeof import('./vis-state-actions').onLayerClick}
 * @returns action
 * @public
 */


function onLayerClick(info) {
  return {
    type: _actionTypes["default"].LAYER_CLICK,
    info: info
  };
}
/**
 * Trigger map click event, unselect clicked object
 * @memberof visStateActions
 * @type {typeof import('./vis-state-actions').onMapClick}
 * @returns action
 * @public
 */


function onMapClick() {
  return {
    type: _actionTypes["default"].MAP_CLICK
  };
}
/**
 * Trigger map mouse moveevent, payload would be
 * React-map-gl PointerEvent
 * https://uber.github.io/react-map-gl/#/documentation/api-reference/pointer-event
 *
 * @memberof visStateActions
 * @param evt - PointerEvent
 * @type {typeof import('./vis-state-actions').onMouseMove}
 * @returns action
 * @public
 */


function onMouseMove(evt) {
  return {
    type: _actionTypes["default"].MOUSE_MOVE,
    evt: evt
  };
}
/**
 * Toggle visibility of a layer in a split map
 * @memberof visStateActions
 * @param mapIndex - index of the split map
 * @param layerId - id of the layer
 * @type {typeof import('./vis-state-actions').toggleLayerForMap}
 * @returns action
 * @public
 */


function toggleLayerForMap(mapIndex, layerId) {
  return {
    type: _actionTypes["default"].TOGGLE_LAYER_FOR_MAP,
    mapIndex: mapIndex,
    layerId: layerId
  };
}
/**
 * Set the property of a filter plot
 * @memberof visStateActions
 * @param idx
 * @param newProp key value mapping of new prop `{yAxis: 'histogram'}`
 * @param valueIndex dataId index
 * @type {typeof import('./vis-state-actions').setFilterPlot}
 * @returns action
 * @public
 */


function setFilterPlot(idx, newProp, valueIndex) {
  return {
    type: _actionTypes["default"].SET_FILTER_PLOT,
    idx: idx,
    newProp: newProp,
    valueIndex: valueIndex
  };
}
/**
 * Set the property of a filter plot
 * @memberof visStateActions
 * @param info
 * @type {typeof import('./vis-state-actions').setMapInfo}
 * @returns action
 * @public
 */


function setMapInfo(info) {
  return {
    type: _actionTypes["default"].SET_MAP_INFO,
    info: info
  };
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @memberof visStateActions
 * @param files array of fileblob
 * @type {typeof import('./vis-state-actions').loadFiles}
 * @returns action
 * @public
 */


function loadFiles(files, onFinish) {
  return {
    type: _actionTypes["default"].LOAD_FILES,
    files: files,
    onFinish: onFinish
  };
}
/**
 * Called with next file to load
 * @memberof visStateActions
 * @type {typeof import('./vis-state-actions').loadNextFile}
 * @returns action
 * @public
 */


function loadNextFile() {
  return {
    type: _actionTypes["default"].LOAD_NEXT_FILE
  };
}
/**
 * called when all files are processed and loaded
 * @memberof visStateActions
 * @param result
 * @type {typeof import('./vis-state-actions').loadFilesSuccess}
 * @returns action
 */


function loadFilesSuccess(result) {
  return {
    type: _actionTypes["default"].LOAD_FILES_SUCCESS,
    result: result
  };
}
/**
 * called when successfully loaded one file, ready to move on to the next one
 * @memberof visStateActions
 * @param result
 * @type {typeof import('./vis-state-actions').loadFileStepSuccess}
 * @returns action
 */


function loadFileStepSuccess(_ref2) {
  var fileName = _ref2.fileName,
      fileCache = _ref2.fileCache;
  return {
    type: _actionTypes["default"].LOAD_FILE_STEP_SUCCESS,
    fileName: fileName,
    fileCache: fileCache
  };
}
/**
 * Trigger loading file error
 * @memberof visStateActions
 * @param  error
 * @type {typeof import('./vis-state-actions').loadFilesErr}
 * @returns action
 * @public
 */


function loadFilesErr(fileName, error) {
  return {
    type: _actionTypes["default"].LOAD_FILES_ERR,
    fileName: fileName,
    error: error
  };
}
/**
 * Store features to state
 * @memberof visStateActions
 * @param features
 * @type {typeof import('./vis-state-actions').setFeatures}
 * @returns action
 */


function setFeatures(features) {
  return {
    type: _actionTypes["default"].SET_FEATURES,
    features: features
  };
}
/**
 * It will apply the provide feature as filter to the given layer.
 * If the given feature is already applied as filter to the layer, it will remove the layer from the filter
 * @memberof visStateActions
 * @param layer
 * @param feature
 * @type {typeof import('./vis-state-actions').setPolygonFilterLayer}
 * @returns action
 */


function setPolygonFilterLayer(layer, feature) {
  return {
    type: _actionTypes["default"].SET_POLYGON_FILTER_LAYER,
    layer: layer,
    feature: feature
  };
}
/**
 * Set the current feature to be edited/deleted
 * @memberof visStateActions
 * @param feature
 * @type {typeof import('./vis-state-actions').setSelectedFeature}
 * @returns action
 */


function setSelectedFeature(feature) {
  return {
    type: _actionTypes["default"].SET_SELECTED_FEATURE,
    feature: feature
  };
}
/**
 * Delete the given feature
 * @memberof visStateActions
 * @param feature
 * @type {typeof import('./vis-state-actions').deleteFeature}
 * @returns action
 */


function deleteFeature(feature) {
  return {
    type: _actionTypes["default"].DELETE_FEATURE,
    feature: feature
  };
}
/** Set the map mode
 * @memberof visStateActions
 * @param mode one of EDITOR_MODES
 * @type {typeof import('./vis-state-actions').setEditorMode}
 * @returns action
 * @public
 * @example
 * import {setMapMode} from 'kepler.gl/actions';
 * import {EDITOR_MODES} from 'kepler.gl/constants';
 *
 * this.props.dispatch(setMapMode(EDITOR_MODES.DRAW_POLYGON));
 */


function setEditorMode(mode) {
  return {
    type: _actionTypes["default"].SET_EDITOR_MODE,
    mode: mode
  };
}
/**
 * Trigger CPU filter of selected dataset
 * @memberof visStateActions
 * @param dataId - single dataId or an array of dataIds
 * @type {typeof import('./vis-state-actions').applyCPUFilter}
 * @returns action
 * @public
 */


function applyCPUFilter(dataId) {
  return {
    type: _actionTypes["default"].APPLY_CPU_FILTER,
    dataId: dataId
  };
}
/**
 * Toggle editor layer visibility
 * @memberof visStateActions
 * @type {typeof import('./vis-state-actions').toggleEditorVisibility}
 * @return action
 */


function toggleEditorVisibility() {
  return {
    type: _actionTypes["default"].TOGGLE_EDITOR_VISIBILITY
  };
}
/**
 * Process the next file batch
 * @memberof visStateActions
 * @param payload - batch payload
 * @type {typeof import('./vis-state-actions').nextFileBatch}
 * @return action
 */


function nextFileBatch(payload) {
  return {
    type: _actionTypes["default"].NEXT_FILE_BATCH,
    payload: payload
  };
}
/**
 * Process the file content
 * @memberof visStateActions
 * @param payload - the file content
 * @type {typeof import('./vis-state-actions').processFileContent}
 * @return action
 */


function processFileContent(payload) {
  return {
    type: _actionTypes["default"].PROCESS_FILE_CONTENT,
    payload: payload
  };
}
/**
 * Set layer animation time format and timezone
 * @memberof visStateActions
 * @param config - {timeFormat: string, timezone: string}
 * @type {typeof import('./vis-state-actions').setLayerAnimationTimeConfig}
 * @return action
 */


function setLayerAnimationTimeConfig(config) {
  return {
    type: _actionTypes["default"].SET_LAYER_ANIMATION_TIME_CONFIG,
    config: config
  };
}
/**
 * Set Filter animation time format and timezone
 * @memberof visStateActions
 * @param idx
 * @param config
 * @type {typeof import('./vis-state-actions').setFilterAnimationTimeConfig}
 * @return action
 */


function setFilterAnimationTimeConfig(idx, config) {
  return {
    type: _actionTypes["default"].SET_FILTER_ANIMATION_TIME_CONFIG,
    idx: idx,
    config: config
  };
}
/**
 * This declaration is needed to group actions in docs
 */

/**
 * Actions handled mostly by `visState` reducer.
 * They manage how data is processed, filtered and displayed on the map by operates on layers,
 * filters and interaction settings.
 *
 * @public
 */

/* eslint-disable no-unused-vars */
// @ts-ignore


var visStateActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImxheWVyQ29uZmlnQ2hhbmdlIiwib2xkTGF5ZXIiLCJuZXdDb25maWciLCJ0eXBlIiwiQWN0aW9uVHlwZXMiLCJMQVlFUl9DT05GSUdfQ0hBTkdFIiwibGF5ZXJUZXh0TGFiZWxDaGFuZ2UiLCJpZHgiLCJwcm9wIiwidmFsdWUiLCJMQVlFUl9URVhUX0xBQkVMX0NIQU5HRSIsImxheWVyVHlwZUNoYW5nZSIsIm5ld1R5cGUiLCJMQVlFUl9UWVBFX0NIQU5HRSIsImxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSIsImNoYW5uZWwiLCJMQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UiLCJsYXllclZpc0NvbmZpZ0NoYW5nZSIsIm5ld1Zpc0NvbmZpZyIsIkxBWUVSX1ZJU19DT05GSUdfQ0hBTkdFIiwibGF5ZXJDb2xvclVJQ2hhbmdlIiwiTEFZRVJfQ09MT1JfVUlfQ0hBTkdFIiwidXBkYXRlTGF5ZXJCbGVuZGluZyIsIm1vZGUiLCJVUERBVEVfTEFZRVJfQkxFTkRJTkciLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZSIsImNvbmZpZyIsIklOVEVSQUNUSU9OX0NPTkZJR19DSEFOR0UiLCJzZXRGaWx0ZXIiLCJ2YWx1ZUluZGV4IiwiU0VUX0ZJTFRFUiIsInNldFByb2Nlc3NvciIsIlNFVF9QUk9DRVNTT1IiLCJydW5Qcm9jZXNzb3IiLCJ2aXNTdGF0ZUFjdGlvbiIsIlJVTl9QUk9DRVNTT1IiLCJydW5Qcm9jZXNzb3JCYXRjaCIsIlJVTl9QUk9DRVNTT1JfQkFUQ0giLCJyZW1vdmVQcm9jZXNzb3IiLCJmbGFnIiwiUkVNT1ZFX1BST0NFU1NPUiIsImFjdGl2YXRlUHJvY2Vzc29yIiwiQUNUSVZBVEVfUFJPQ0VTU09SIiwic2V0RmlsdGVyQW5pbWF0aW9uVGltZSIsIlNFVF9GSUxURVJfQU5JTUFUSU9OX1RJTUUiLCJzZXRGaWx0ZXJBbmltYXRpb25XaW5kb3ciLCJpZCIsImFuaW1hdGlvbldpbmRvdyIsIlNFVF9GSUxURVJfQU5JTUFUSU9OX1dJTkRPVyIsImFkZEZpbHRlciIsImRhdGFJZCIsIkFERF9GSUxURVIiLCJhZGRQcm9jZXNzb3IiLCJBRERfUFJPQ0VTU09SIiwiYWRkTGF5ZXIiLCJBRERfTEFZRVIiLCJyZW9yZGVyTGF5ZXIiLCJvcmRlciIsIlJFT1JERVJfTEFZRVIiLCJyZW1vdmVGaWx0ZXIiLCJSRU1PVkVfRklMVEVSIiwicmVtb3ZlTGF5ZXIiLCJSRU1PVkVfTEFZRVIiLCJkdXBsaWNhdGVMYXllciIsIkRVUExJQ0FURV9MQVlFUiIsInJlbW92ZURhdGFzZXQiLCJSRU1PVkVfREFUQVNFVCIsInNob3dEYXRhc2V0VGFibGUiLCJTSE9XX0RBVEFTRVRfVEFCTEUiLCJzb3J0VGFibGVDb2x1bW4iLCJjb2x1bW4iLCJTT1JUX1RBQkxFX0NPTFVNTiIsImRlbGV0ZVRhYmxlQ29sdW1uIiwiY29uc29sZSIsImxvZyIsIkRFTEVURV9UQUJMRV9DT0xVTU4iLCJhZGRUYWJsZUNvbHVtbiIsImRhdGFfdHlwZSIsInZhbHVlcyIsInJlcGxhY2UiLCJBRERfVEFCTEVfQ09MVU1OIiwiR01UTW9kaWZ5VGFibGVDb2x1bW4iLCJ2YWx1ZUxpc3QiLCJkYXRhc2V0cyIsIkdNVF9NT0RJRllfVEFCTEVfQ09MVU1OIiwicGluVGFibGVDb2x1bW4iLCJQSU5fVEFCTEVfQ09MVU1OIiwiY29weVRhYmxlQ29sdW1uIiwiQ09QWV9UQUJMRV9DT0xVTU4iLCJ1cGRhdGVWaXNEYXRhIiwib3B0aW9ucyIsIlVQREFURV9WSVNfREFUQSIsInJlbmFtZURhdGFzZXQiLCJsYWJlbCIsIlJFTkFNRV9EQVRBU0VUIiwidG9nZ2xlRmlsdGVyQW5pbWF0aW9uIiwiVE9HR0xFX0ZJTFRFUl9BTklNQVRJT04iLCJ1cGRhdGVGaWx0ZXJBbmltYXRpb25TcGVlZCIsInNwZWVkIiwiVVBEQVRFX0ZJTFRFUl9BTklNQVRJT05fU1BFRUQiLCJzZXRMYXllckFuaW1hdGlvblRpbWUiLCJTRVRfTEFZRVJfQU5JTUFUSU9OX1RJTUUiLCJ1cGRhdGVMYXllckFuaW1hdGlvblNwZWVkIiwiVVBEQVRFX0xBWUVSX0FOSU1BVElPTl9TUEVFRCIsInRvZ2dsZUxheWVyQW5pbWF0aW9uIiwiVE9HR0xFX0xBWUVSX0FOSU1BVElPTiIsInRvZ2dsZUxheWVyQW5pbWF0aW9uQ29udHJvbCIsIlRPR0dMRV9MQVlFUl9BTklNQVRJT05fQ09OVFJPTCIsImVubGFyZ2VGaWx0ZXIiLCJFTkxBUkdFX0ZJTFRFUiIsInRvZ2dsZUZpbHRlckZlYXR1cmUiLCJUT0dHTEVfRklMVEVSX0ZFQVRVUkUiLCJvbkxheWVySG92ZXIiLCJpbmZvIiwiTEFZRVJfSE9WRVIiLCJvbkxheWVyQ2xpY2siLCJMQVlFUl9DTElDSyIsIm9uTWFwQ2xpY2siLCJNQVBfQ0xJQ0siLCJvbk1vdXNlTW92ZSIsImV2dCIsIk1PVVNFX01PVkUiLCJ0b2dnbGVMYXllckZvck1hcCIsIm1hcEluZGV4IiwibGF5ZXJJZCIsIlRPR0dMRV9MQVlFUl9GT1JfTUFQIiwic2V0RmlsdGVyUGxvdCIsIm5ld1Byb3AiLCJTRVRfRklMVEVSX1BMT1QiLCJzZXRNYXBJbmZvIiwiU0VUX01BUF9JTkZPIiwibG9hZEZpbGVzIiwiZmlsZXMiLCJvbkZpbmlzaCIsIkxPQURfRklMRVMiLCJsb2FkTmV4dEZpbGUiLCJMT0FEX05FWFRfRklMRSIsImxvYWRGaWxlc1N1Y2Nlc3MiLCJyZXN1bHQiLCJMT0FEX0ZJTEVTX1NVQ0NFU1MiLCJsb2FkRmlsZVN0ZXBTdWNjZXNzIiwiZmlsZU5hbWUiLCJmaWxlQ2FjaGUiLCJMT0FEX0ZJTEVfU1RFUF9TVUNDRVNTIiwibG9hZEZpbGVzRXJyIiwiZXJyb3IiLCJMT0FEX0ZJTEVTX0VSUiIsInNldEZlYXR1cmVzIiwiZmVhdHVyZXMiLCJTRVRfRkVBVFVSRVMiLCJzZXRQb2x5Z29uRmlsdGVyTGF5ZXIiLCJsYXllciIsImZlYXR1cmUiLCJTRVRfUE9MWUdPTl9GSUxURVJfTEFZRVIiLCJzZXRTZWxlY3RlZEZlYXR1cmUiLCJTRVRfU0VMRUNURURfRkVBVFVSRSIsImRlbGV0ZUZlYXR1cmUiLCJERUxFVEVfRkVBVFVSRSIsInNldEVkaXRvck1vZGUiLCJTRVRfRURJVE9SX01PREUiLCJhcHBseUNQVUZpbHRlciIsIkFQUExZX0NQVV9GSUxURVIiLCJ0b2dnbGVFZGl0b3JWaXNpYmlsaXR5IiwiVE9HR0xFX0VESVRPUl9WSVNJQklMSVRZIiwibmV4dEZpbGVCYXRjaCIsInBheWxvYWQiLCJORVhUX0ZJTEVfQkFUQ0giLCJwcm9jZXNzRmlsZUNvbnRlbnQiLCJQUk9DRVNTX0ZJTEVfQ09OVEVOVCIsInNldExheWVyQW5pbWF0aW9uVGltZUNvbmZpZyIsIlNFVF9MQVlFUl9BTklNQVRJT05fVElNRV9DT05GSUciLCJzZXRGaWx0ZXJBbmltYXRpb25UaW1lQ29uZmlnIiwiU0VUX0ZJTFRFUl9BTklNQVRJT05fVElNRV9DT05GSUciLCJ2aXNTdGF0ZUFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0EsaUJBQVQsQ0FBMkJDLFFBQTNCLEVBQXFDQyxTQUFyQyxFQUFnRDtBQUNyRCxTQUFPO0FBQ0xDLElBQUFBLElBQUksRUFBRUMsd0JBQVlDLG1CQURiO0FBRUxKLElBQUFBLFFBQVEsRUFBUkEsUUFGSztBQUdMQyxJQUFBQSxTQUFTLEVBQVRBO0FBSEssR0FBUDtBQUtEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNJLG9CQUFULENBQThCTCxRQUE5QixFQUF3Q00sR0FBeEMs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QUNBOzs7QUFDTyxTQUFTaUosNEJBQVQsQ0FBc0NwSyxHQUF0QyxFQUEyQ21CLE1BQTNDLEVBQW1EO0FBQ3hELFNBQU87QUFDTHZCLElBQUFBLElBQUksRUFBRUMsd0JBQVl3SyxnQ0FEYjtBQUVMckssSUFBQUEsR0FBRyxFQUFIQSxHQUZLO0FBR0xtQixJQUFBQSxNQUFNLEVBQU5BO0FBSEssR0FBUDtBQUtEO0FBRUQ7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7OztBQUNBLElBQU1tSixlQUFlLEdBQUcsSUFBeEI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIHZpcy1zdGF0ZS1yZWR1Y2VyXG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnY29uc3RhbnRzL2FjdGlvbi10eXBlcyc7XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIGJhc2UgY29uZmlnOiBkYXRhSWQsIGxhYmVsLCBjb2x1bW4sIGlzVmlzaWJsZVxuICogQHBhcmFtIG9sZExheWVyIC0gbGF5ZXIgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIG5ld0NvbmZpZyAtIG5ldyBjb25maWcgdG8gYmUgbWVyZ2VkIHdpdGggb2xkIGNvbmZpZ1xuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxheWVyQ29uZmlnQ2hhbmdlfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJDb25maWdDaGFuZ2Uob2xkTGF5ZXIsIG5ld0NvbmZpZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX0NPTkZJR19DSEFOR0UsXG4gICAgb2xkTGF5ZXIsXG4gICAgbmV3Q29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIHRleHQgbGFiZWxcbiAqIEBwYXJhbSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSBpZHggLWBpZHhgIG9mIHRleHQgbGFiZWwgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIHByb3AgLSBgcHJvcGAgb2YgdGV4dCBsYWJlbCwgZSxnLCBgYW5jaG9yYCwgYGFsaWdubWVudGAsIGBjb2xvcmAsIGBzaXplYCwgYGZpZWxkYFxuICogQHBhcmFtIHZhbHVlIC0gbmV3IHZhbHVlXG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykubGF5ZXJUZXh0TGFiZWxDaGFuZ2V9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllclRleHRMYWJlbENoYW5nZShvbGRMYXllciwgaWR4LCBwcm9wLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1RFWFRfTEFCRUxfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIGlkeCxcbiAgICBwcm9wLFxuICAgIHZhbHVlXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIHR5cGUuIFByZXZpZXdzIGxheWVyIGNvbmZpZyB3aWxsIGJlIGNvcGllZCBpZiBhcHBsaWNhYmxlLlxuICogQHBhcmFtIG9sZExheWVyIC0gbGF5ZXIgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIG5ld1R5cGUgLSBuZXcgdHlwZVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxheWVyVHlwZUNoYW5nZX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVHlwZUNoYW5nZShvbGRMYXllciwgbmV3VHlwZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1RZUEVfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld1R5cGVcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgdmlzdWFsIGNoYW5uZWxcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSBuZXdDb25maWcgLSBuZXcgdmlzdWFsIGNoYW5uZWwgY29uZmlnXG4gKiBAcGFyYW0gY2hhbm5lbCAtIGNoYW5uZWwgdG8gYmUgdXBkYXRlZFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZShvbGRMYXllciwgbmV3Q29uZmlnLCBjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfVklTVUFMX0NIQU5ORUxfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld0NvbmZpZyxcbiAgICBjaGFubmVsXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIGB2aXNDb25maWdgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gb2xkTGF5ZXIgLSBsYXllciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0gbmV3VmlzQ29uZmlnIC0gbmV3IHZpc0NvbmZpZyBhcyBhIGtleSB2YWx1ZSBtYXA6IGUuZy4gYHtvcGFjaXR5OiAwLjh9YFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxheWVyVmlzQ29uZmlnQ2hhbmdlfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXNDb25maWdDaGFuZ2Uob2xkTGF5ZXIsIG5ld1Zpc0NvbmZpZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1ZJU19DT05GSUdfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld1Zpc0NvbmZpZ1xuICB9O1xufVxuXG4vKipcbiAqIFNldCB0aGUgY29sb3IgcGFsZXR0ZSB1aSBmb3IgbGF5ZXIgY29sb3JcbiAqIEBtZW1iZXJPZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSBwcm9wIC0gd2hpY2ggY29sb3IgcHJvcFxuICogQHBhcmFtIG5ld0NvbmZpZyAtIHRvIGJlIG1lcmdlZFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxheWVyQ29sb3JVSUNoYW5nZX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyQ29sb3JVSUNoYW5nZShvbGRMYXllciwgcHJvcCwgbmV3Q29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfQ09MT1JfVUlfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIHByb3AsXG4gICAgbmV3Q29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIGJsZW5kaW5nIG1vZGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBtb2RlIG9uZSBvZiBgYWRkaXRpdmVgLCBgbm9ybWFsYCBhbmQgYHN1YnRyYWN0aXZlYFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnVwZGF0ZUxheWVyQmxlbmRpbmd9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMYXllckJsZW5kaW5nKG1vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfTEFZRVJfQkxFTkRJTkcsXG4gICAgbW9kZVxuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBgaW50ZXJhY3Rpb25Db25maWdgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gY29uZmlnIC0gbmV3IGNvbmZpZyBhcyBrZXkgdmFsdWUgbWFwOiBge3Rvb2x0aXA6IHtlbmFibGVkOiB0cnVlfX1gXG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuaW50ZXJhY3Rpb25Db25maWdDaGFuZ2V9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZShjb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5JTlRFUkFDVElPTl9DT05GSUdfQ0hBTkdFLFxuICAgIGNvbmZpZ1xuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBmaWx0ZXIgcHJvcGVydHlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBpZHggLWBpZHhgIG9mIGZpbHRlciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0gcHJvcCAtIGBwcm9wYCBvZiBmaWx0ZXIsIGUsZywgYGRhdGFJZGAsIGBuYW1lYCwgYHZhbHVlYFxuICogQHBhcmFtIHZhbHVlIC0gbmV3IHZhbHVlXG4gKiBAcGFyYW0gdmFsdWVJbmRleCAtIGRhdGFJZCBpbmRleFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnNldEZpbHRlcn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlcihpZHgsIHByb3AsIHZhbHVlLCB2YWx1ZUluZGV4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX0ZJTFRFUixcbiAgICBpZHgsXG4gICAgcHJvcCxcbiAgICB2YWx1ZSxcbiAgICB2YWx1ZUluZGV4XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9jZXNzb3IocHJvcCx2YWx1ZSx2YWx1ZUluZGV4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX1BST0NFU1NPUixcbiAgICBwcm9wLFxuICAgIHZhbHVlLFxuICAgIHZhbHVlSW5kZXhcbiAgfTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNldFByb2Nlc3Nvckxpc3QocHJvcCx2YWx1ZSx2YWx1ZUluZGV4KSB7XG4vLyAgIHJldHVybiB7XG4vLyAgICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX1BST0NFU1NPUl9MSVNULFxuLy8gICAgIHByb3AsXG4vLyAgICAgdmFsdWUsXG4vLyAgICAgdmFsdWVJbmRleFxuLy8gICB9O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuUHJvY2Vzc29yKHByb3AsdmlzU3RhdGVBY3Rpb24pe1xuICByZXR1cm4ge1xuICAgIHR5cGU6QWN0aW9uVHlwZXMuUlVOX1BST0NFU1NPUixcbiAgICBwcm9wLFxuICAgIHZpc1N0YXRlQWN0aW9uXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blByb2Nlc3NvckJhdGNoKHByb3AsdmlzU3RhdGVBY3Rpb24pe1xuICByZXR1cm4ge1xuICAgIHR5cGU6QWN0aW9uVHlwZXMuUlVOX1BST0NFU1NPUl9CQVRDSCxcbiAgICBwcm9wLFxuICAgIHZpc1N0YXRlQWN0aW9uXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByb2Nlc3NvcihmbGFnKXtcbiAgcmV0dXJuIHtcbiAgICAndHlwZSc6QWN0aW9uVHlwZXMuUkVNT1ZFX1BST0NFU1NPUixcbiAgICBmbGFnXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlUHJvY2Vzc29yKCl7XG4gIHJldHVybiB7XG4gICAgJ3R5cGUnOkFjdGlvblR5cGVzLkFDVElWQVRFX1BST0NFU1NPUixcbiAgfVxufVxuXG5cblxuLyoqXG4gKiBTYW1lIGFzIFVwZGF0ZSBmaWx0ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBpZHggLWBpZHhgIG9mIGZpbHRlciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0gcHJvcCAtIGBwcm9wYCBvZiBmaWx0ZXIsIGUsZywgYGRhdGFJZGAsIGBuYW1lYCwgYHZhbHVlYFxuICogQHBhcmFtIHZhbHVlIC0gbmV3IHZhbHVlXG4gKiBAcGFyYW0gdmFsdWVJbmRleCAtIGRhdGFJZCBpbmRleFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnNldEZpbHRlckFuaW1hdGlvblRpbWV9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWx0ZXJBbmltYXRpb25UaW1lKGlkeCwgcHJvcCwgdmFsdWUsIHZhbHVlSW5kZXgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfRklMVEVSX0FOSU1BVElPTl9USU1FLFxuICAgIGlkeCxcbiAgICBwcm9wLFxuICAgIHZhbHVlLFxuICAgIHZhbHVlSW5kZXhcbiAgfTtcbn1cblxuLyoqXG4gKiBTYW1lIGFzIFVwZGF0ZSBmaWx0ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuc2V0RmlsdGVyQW5pbWF0aW9uV2luZG93fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyQW5pbWF0aW9uV2luZG93KHtpZCwgYW5pbWF0aW9uV2luZG93fSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVJfQU5JTUFUSU9OX1dJTkRPVyxcbiAgICBpZCxcbiAgICBhbmltYXRpb25XaW5kb3dcbiAgfTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGZpbHRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGRhdGFJZCAtIGRhdGFzZXQgYGlkYCB0aGlzIG5ldyBmaWx0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuYWRkRmlsdGVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRmlsdGVyKGRhdGFJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkFERF9GSUxURVIsXG4gICAgZGF0YUlkXG4gIH07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFByb2Nlc3NvcihkYXRhSWQpe1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkFERF9QUk9DRVNTT1IsXG4gICAgZGF0YUlkXG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBjb25maWcgLSBuZXcgbGF5ZXIgY29uZmlnXG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuYWRkTGF5ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllcihjb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5BRERfTEFZRVIsXG4gICAgY29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogUmVvcmRlciBsYXllciwgb3JkZXIgaXMgYW4gYXJyYXkgb2YgbGF5ZXIgaW5kZXhlcywgaW5kZXggMCB3aWxsIGJlIHRoZSBvbmUgYXQgdGhlIGJvdHRvbVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIG9yZGVyIGFuIGFycmF5IG9mIGxheWVyIGluZGV4ZXNcbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5yZW9yZGVyTGF5ZXJ9XG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGJyaW5nIGBsYXllcnNbMV1gIGJlbG93IGBsYXllcnNbMF1gLCB0aGUgc2VxdWVuY2UgbGF5ZXJzIHdpbGwgYmUgcmVuZGVyZWQgaXMgYDFgLCBgMGAsIGAyYCwgYDNgLlxuICogLy8gYDFgIHdpbGwgYmUgYXQgdGhlIGJvdHRvbSwgYDNgIHdpbGwgYmUgYXQgdGhlIHRvcC5cbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVvcmRlckxheWVyKFsxLCAwLCAyLCAzXSkpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVvcmRlckxheWVyKG9yZGVyKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVPUkRFUl9MQVlFUixcbiAgICBvcmRlclxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGZpbHRlciBmcm9tIGB2aXNTdGF0ZS5maWx0ZXJzYCwgb25jZSBhIGZpbHRlciBpcyByZW1vdmVkLCBkYXRhIHdpbGwgYmUgcmUtZmlsdGVyZWQgYW5kIGxheWVyIHdpbGwgYmUgdXBkYXRlZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGlkeCBpZHggb2YgZmlsdGVyIHRvIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5yZW1vdmVGaWx0ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGaWx0ZXIoaWR4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0ZJTFRFUixcbiAgICBpZHhcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBsYXllclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGlkeCBpZHggb2YgbGF5ZXIgdG8gYmUgcmVtb3ZlZFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnJlbW92ZUxheWVyfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTGF5ZXIoaWR4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0xBWUVSLFxuICAgIGlkeFxuICB9O1xufVxuXG4vKipcbiAqIER1cGxpY2F0ZSBhIGxheWVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaWR4IGlkeCBvZiBsYXllciB0byBiZSBkdXBsaWNhdGVkXG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuZHVwbGljYXRlTGF5ZXJ9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGVMYXllcihpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5EVVBMSUNBVEVfTEFZRVIsXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZGF0YXNldCBhbmQgYWxsIGxheWVycywgZmlsdGVycywgdG9vbHRpcCBjb25maWdzIHRoYXQgYmFzZWQgb24gaXRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBkYXRhSWQgZGF0YXNldCBpZFxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnJlbW92ZURhdGFzZXR9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEYXRhc2V0KGRhdGFJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlJFTU9WRV9EQVRBU0VULFxuICAgIGRhdGFJZFxuICB9O1xufVxuXG4vKipcbiAqIERpc3BsYXkgZGF0YXNldCB0YWJsZSBpbiBhIG1vZGFsXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gZGF0YUlkIGRhdGFzZXQgaWQgdG8gc2hvdyBpbiB0YWJsZVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnNob3dEYXRhc2V0VGFibGV9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGF0YXNldFRhYmxlKGRhdGFJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNIT1dfREFUQVNFVF9UQUJMRSxcbiAgICBkYXRhSWRcbiAgfTtcbn1cblxuLyoqXG4gKiBTb3J0IGRhdGFzZXQgY29sdW1uLCBmb3IgdGFibGUgZGlzcGxheVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGRhdGFJZFxuICogQHBhcmFtIGNvbHVtblxuICogQHBhcmFtIG1vZGVcbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5zb3J0VGFibGVDb2x1bW59XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0VGFibGVDb2x1bW4oZGF0YUlkLCBjb2x1bW4sIG1vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TT1JUX1RBQkxFX0NPTFVNTixcbiAgICBkYXRhSWQsXG4gICAgY29sdW1uLFxuICAgIG1vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBDb3B5IGNvbHVtbiwgZm9yIHRhYmxlIGRpc3BsYXlcbiAqIEBwYXJhbSBkYXRhSWRcbiAqIEBwYXJhbSBjb2x1bW5cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5kZWxldGVUYWJsZUNvbHVtbn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVRhYmxlQ29sdW1uKGRhdGFJZCxjb2x1bW4pe1xuICBjb25zb2xlLmxvZygnZGVsZXRlIHRhYmxlIGNvbHVtbicpXG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuREVMRVRFX1RBQkxFX0NPTFVNTixcbiAgICBkYXRhSWQsXG4gICAgY29sdW1uXG4gIH1cbn1cblxuLyoqXG4gKiBDb3B5IGNvbHVtbiwgZm9yIHRhYmxlIGRpc3BsYXlcbiAqIEBwYXJhbSBkYXRhSWRcbiAqIEBwYXJhbSBjb2x1bW5cbiAqIEBwYXJhbSBkYXRhX3R5cGVcbiAqIEBwYXJhbSB2YWx1ZXNcbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5hZGRUYWJsZUNvbHVtbn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhYmxlQ29sdW1uKGRhdGFJZCxjb2x1bW4sZGF0YV90eXBlLHZhbHVlcyxyZXBsYWNlKXtcbiAgY29uc29sZS5sb2coJ2FjdGlvbiB0eXBlczonICsgQWN0aW9uVHlwZXMuQUREX1RBQkxFX0NPTFVNTilcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5BRERfVEFCTEVfQ09MVU1OLFxuICAgIGRhdGFJZCxcbiAgICBjb2x1bW4sXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGRhdGFfdHlwZSxcbiAgICB2YWx1ZXMsXG4gICAgcmVwbGFjZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHTVRNb2RpZnlUYWJsZUNvbHVtbih2YWx1ZUxpc3QsZGF0YXNldHMpe1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkdNVF9NT0RJRllfVEFCTEVfQ09MVU1OLFxuICAgIHZhbHVlTGlzdCxcbiAgICBkYXRhc2V0c1xuICB9XG59XG5cblxuXG4vKipcbiAqIFBpbiBkYXRhc2V0IGNvbHVtbiwgZm9yIHRhYmxlIGRpc3BsYXlcbiAqIEBwYXJhbSBkYXRhSWRcbiAqIEBwYXJhbSBjb2x1bW5cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5waW5UYWJsZUNvbHVtbn1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpblRhYmxlQ29sdW1uKGRhdGFJZCwgY29sdW1uKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUElOX1RBQkxFX0NPTFVNTixcbiAgICBkYXRhSWQsXG4gICAgY29sdW1uXG4gIH07XG59XG5cbi8qKlxuICogQ29weSBjb2x1bW4sIGZvciB0YWJsZSBkaXNwbGF5XG4gKiBAcGFyYW0gZGF0YUlkXG4gKiBAcGFyYW0gY29sdW1uXG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuY29weVRhYmxlQ29sdW1ufVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29weVRhYmxlQ29sdW1uKGRhdGFJZCwgY29sdW1uKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuQ09QWV9UQUJMRV9DT0xVTU4sXG4gICAgZGF0YUlkLFxuICAgIGNvbHVtblxuICB9O1xufVxuXG5cbi8vICogQHBhcmFtIGRhdGFzZXQuaW5mbyAtaW5mbyBvZiBhIGRhdGFzZXRcbi8vICogQHBhcmFtIGRhdGFzZXQuaW5mby5pZCAtIGlkIG9mIHRoaXMgZGF0YXNldC4gSWYgY29uZmlnIGlzIGRlZmluZWQsIGBpZGAgc2hvdWxkIG1hdGNoZXMgdGhlIGBkYXRhSWRgIGluIGNvbmZpZy5cbi8vICogQHBhcmFtIGRhdGFzZXQuaW5mby5sYWJlbCAtIEEgZGlzcGxheSBuYW1lIG9mIHRoaXMgZGF0YXNldFxuLy8gKiBAcGFyYW0gZGF0YXNldC5kYXRhIC0gKioqcmVxdWlyZWQqKiBUaGUgZGF0YSBvYmplY3QsIGluIGEgdGFidWxhciBmb3JtYXQgd2l0aCAyIHByb3BlcnRpZXMgYGZpZWxkc2AgYW5kIGByb3dzYFxuLy8gKiBAcGFyYW0gZGF0YXNldC5kYXRhLmZpZWxkcyAtICoqKnJlcXVpcmVkKiogQXJyYXkgb2YgZmllbGRzLFxuLy8gKiBAcGFyYW0gZGF0YXNldC5kYXRhLmZpZWxkcy5uYW1lIC0gKioqcmVxdWlyZWQqKiBOYW1lIG9mIHRoZSBmaWVsZCxcbi8vICogQHBhcmFtIGRhdGFzZXQuZGF0YS5yb3dzIC0gKioqcmVxdWlyZWQqKiBBcnJheSBvZiByb3dzLCBpbiBhIHRhYnVsYXIgZm9ybWF0IHdpdGggYGZpZWxkc2AgYW5kIGByb3dzYFxuLyoqXG4gKiBBZGQgbmV3IGRhdGFzZXQgdG8gYHZpc1N0YXRlYCwgd2l0aCBvcHRpb24gdG8gbG9hZCBhIG1hcCBjb25maWcgYWxvbmcgd2l0aCB0aGUgZGF0YXNldHNcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBkYXRhc2V0cyAtICoqKnJlcXVpcmVkKiogZGF0YXNldHMgY2FuIGJlIGEgZGF0YXNldCBvciBhbiBhcnJheSBvZiBkYXRhc2V0c1xuICogRWFjaCBkYXRhc2V0IG9iamVjdCBuZWVkcyB0byBoYXZlIGBpbmZvYCBhbmQgYGRhdGFgIHByb3BlcnR5LlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zLmNlbnRlck1hcCBgZGVmYXVsdDogdHJ1ZWAgaWYgYGNlbnRlck1hcGAgaXMgc2V0IHRvIGB0cnVlYCBrZXBsZXIuZ2wgd2lsbFxuICogcGxhY2UgdGhlIG1hcCB2aWV3IHdpdGhpbiB0aGUgZGF0YSBwb2ludHMgYm91bmRhcmllc1xuICogQHBhcmFtIG9wdGlvbnMucmVhZE9ubHkgYGRlZmF1bHQ6IGZhbHNlYCBpZiBgcmVhZE9ubHlgIGlzIHNldCB0byBgdHJ1ZWBcbiAqIHRoZSBsZWZ0IHNldHRpbmcgcGFuZWwgd2lsbCBiZSBoaWRkZW5cbiAqIEBwYXJhbSBjb25maWcgdGhpcyBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBmdWxsIGtlcGxlci5nbCBpbnN0YW5jZSBjb25maWd1cmF0aW9uIHttYXBTdGF0ZSwgbWFwU3R5bGUsIHZpc1N0YXRlfVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnVwZGF0ZVZpc0RhdGF9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWaXNEYXRhKGRhdGFzZXRzLCBvcHRpb25zLCBjb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfVklTX0RBVEEsXG4gICAgZGF0YXNldHMsXG4gICAgb3B0aW9ucyxcbiAgICBjb25maWdcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW5hbWUgYW4gZXhpc3RpbmcgZGF0YXNldCBpbiBgdmlzU3RhdGVgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gZGF0YUlkIC0gKioqcmVxdWlyZWQqKiBJZCBvZiB0aGUgZGF0YXNldCB0byB1cGRhdGVcbiAqIEBwYXJhbSBsYWJlbCAtICoqKnJlcXVpcmVkKiogTmV3IG5hbWUgZm9yIHRoZSBkYXRhc2V0XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykucmVuYW1lRGF0YXNldH1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZURhdGFzZXQoZGF0YUlkLCBsYWJlbCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlJFTkFNRV9EQVRBU0VULFxuICAgIGRhdGFJZCxcbiAgICBsYWJlbFxuICB9O1xufVxuXG4vKipcbiAqIFN0YXJ0IGFuZCBlbmQgZmlsdGVyIGFuaW1hdGlvblxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBvZiBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykudG9nZ2xlRmlsdGVyQW5pbWF0aW9ufVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVGaWx0ZXJBbmltYXRpb24oaWR4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuVE9HR0xFX0ZJTFRFUl9BTklNQVRJT04sXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogQ2hhbmdlIGZpbHRlciBhbmltYXRpb24gc3BlZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBpZHggLSAgYGlkeGAgb2YgZmlsdGVyXG4gKiBAcGFyYW0gc3BlZWQgLSBgc3BlZWRgIHRvIGNoYW5nZSBpdCB0by4gYHNwZWVkYCBpcyBhIG11bHRpcGxpZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykudXBkYXRlRmlsdGVyQW5pbWF0aW9uU3BlZWR9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbHRlckFuaW1hdGlvblNwZWVkKGlkeCwgc3BlZWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfRklMVEVSX0FOSU1BVElPTl9TUEVFRCxcbiAgICBpZHgsXG4gICAgc3BlZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXNldCBhbmltYXRpb25cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB2YWx1ZSAtICBDdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuc2V0TGF5ZXJBbmltYXRpb25UaW1lfVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRMYXllckFuaW1hdGlvblRpbWUodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfTEFZRVJfQU5JTUFUSU9OX1RJTUUsXG4gICAgdmFsdWVcbiAgfTtcbn1cblxuLyoqXG4gKiB1cGRhdGUgdHJpcCBsYXllciBhbmltYXRpb24gc3BlZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBzcGVlZCAtIGBzcGVlZGAgdG8gY2hhbmdlIGl0IHRvLiBgc3BlZWRgIGlzIGEgbXVsdGlwbGllclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS51cGRhdGVMYXllckFuaW1hdGlvblNwZWVkfVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMYXllckFuaW1hdGlvblNwZWVkKHNwZWVkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuVVBEQVRFX0xBWUVSX0FOSU1BVElPTl9TUEVFRCxcbiAgICBzcGVlZFxuICB9O1xufVxuXG4vKipcbiAqIHN0YXJ0IGVuZCBlbmQgbGF5ZXIgYW5pbWF0aW9uXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnRvZ2dsZUxheWVyQW5pbWF0aW9ufVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVMYXllckFuaW1hdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfQU5JTUFUSU9OXG4gIH07XG59XG5cbi8qKlxuICogaGlkZSBhbmQgc2hvdyBsYXllciBhbmltYXRpb24gY29udHJvbFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS50b2dnbGVMYXllckFuaW1hdGlvbkNvbnRyb2x9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUxheWVyQW5pbWF0aW9uQ29udHJvbCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfQU5JTUFUSU9OX0NPTlRST0xcbiAgfTtcbn1cblxuLyoqXG4gKiBTaG93IGxhcmdlciB0aW1lIGZpbHRlciBhdCBib3R0b20gZm9yIHRpbWUgcGxheWJhY2sgKGFwcGx5IHRvIHRpbWUgZmlsdGVyIG9ubHkpXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaWR4IC0gaW5kZXggb2YgZmlsdGVyIHRvIGVubGFyZ2VcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuZW5sYXJnZUZpbHRlcn1cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW5sYXJnZUZpbHRlcihpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5FTkxBUkdFX0ZJTFRFUixcbiAgICBpZHhcbiAgfTtcbn1cblxuLyoqXG4gKiBTaG93L2hpZGUgZmlsdGVyIGZlYXR1cmUgb24gbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaWR4IC0gaW5kZXggb2YgZmlsdGVyIGZlYXR1cmUgdG8gc2hvdy9oaWRlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnRvZ2dsZUZpbHRlckZlYXR1cmV9XG4gKiBAcmV0dXJuIGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRmlsdGVyRmVhdHVyZShpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfRklMVEVSX0ZFQVRVUkUsXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBsYXllciBob3ZlciBldmVudCB3aXRoIGhvdmVyZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaW5mbyAtIE9iamVjdCBob3ZlcmVkLCByZXR1cm5lZCBieSBkZWNrLmdsXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLm9uTGF5ZXJIb3Zlcn1cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gb25MYXllckhvdmVyKGluZm8pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9IT1ZFUixcbiAgICBpbmZvXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBsYXllciBjbGljayBldmVudCB3aXRoIGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaW5mbyAtIE9iamVjdCBjbGlja2VkLCByZXR1cm5lZCBieSBkZWNrLmdsXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLm9uTGF5ZXJDbGlja31cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gb25MYXllckNsaWNrKGluZm8pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9DTElDSyxcbiAgICBpbmZvXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBtYXAgY2xpY2sgZXZlbnQsIHVuc2VsZWN0IGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLm9uTWFwQ2xpY2t9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTWFwQ2xpY2soKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTUFQX0NMSUNLXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBtYXAgbW91c2UgbW92ZWV2ZW50LCBwYXlsb2FkIHdvdWxkIGJlXG4gKiBSZWFjdC1tYXAtZ2wgUG9pbnRlckV2ZW50XG4gKiBodHRwczovL3ViZXIuZ2l0aHViLmlvL3JlYWN0LW1hcC1nbC8jL2RvY3VtZW50YXRpb24vYXBpLXJlZmVyZW5jZS9wb2ludGVyLWV2ZW50XG4gKlxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGV2dCAtIFBvaW50ZXJFdmVudFxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5vbk1vdXNlTW92ZX1cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZ0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTU9VU0VfTU9WRSxcbiAgICBldnRcbiAgfTtcbn1cblxuLyoqXG4gKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBhIGxheWVyIGluIGEgc3BsaXQgbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gbWFwSW5kZXggLSBpbmRleCBvZiB0aGUgc3BsaXQgbWFwXG4gKiBAcGFyYW0gbGF5ZXJJZCAtIGlkIG9mIHRoZSBsYXllclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS50b2dnbGVMYXllckZvck1hcH1cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTGF5ZXJGb3JNYXAobWFwSW5kZXgsIGxheWVySWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfRk9SX01BUCxcbiAgICBtYXBJbmRleCxcbiAgICBsYXllcklkXG4gIH07XG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhIGZpbHRlciBwbG90XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaWR4XG4gKiBAcGFyYW0gbmV3UHJvcCBrZXkgdmFsdWUgbWFwcGluZyBvZiBuZXcgcHJvcCBge3lBeGlzOiAnaGlzdG9ncmFtJ31gXG4gKiBAcGFyYW0gdmFsdWVJbmRleCBkYXRhSWQgaW5kZXhcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuc2V0RmlsdGVyUGxvdH1cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyUGxvdChpZHgsIG5ld1Byb3AsIHZhbHVlSW5kZXgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfRklMVEVSX1BMT1QsXG4gICAgaWR4LFxuICAgIG5ld1Byb3AsXG4gICAgdmFsdWVJbmRleFxuICB9O1xufVxuXG4vKipcbiAqIFNldCB0aGUgcHJvcGVydHkgb2YgYSBmaWx0ZXIgcGxvdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGluZm9cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuc2V0TWFwSW5mb31cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TWFwSW5mbyhpbmZvKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX01BUF9JTkZPLFxuICAgIGluZm9cbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGZpbGUgbG9hZGluZyBkaXNwYXRjaCBgYWRkRGF0YVRvTWFwYCBpZiBzdWNjZWVkLCBvciBgbG9hZEZpbGVzRXJyYCBpZiBmYWlsZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBmaWxlcyBhcnJheSBvZiBmaWxlYmxvYlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5sb2FkRmlsZXN9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlcyhmaWxlcywgb25GaW5pc2gpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MT0FEX0ZJTEVTLFxuICAgIGZpbGVzLFxuICAgIG9uRmluaXNoXG4gIH07XG59XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggbmV4dCBmaWxlIHRvIGxvYWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykubG9hZE5leHRGaWxlfVxuICogQHJldHVybnMgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkTmV4dEZpbGUoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTE9BRF9ORVhUX0ZJTEVcbiAgfTtcbn1cblxuLyoqXG4gKiBjYWxsZWQgd2hlbiBhbGwgZmlsZXMgYXJlIHByb2Nlc3NlZCBhbmQgbG9hZGVkXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gcmVzdWx0XG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxvYWRGaWxlc1N1Y2Nlc3N9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlc1N1Y2Nlc3MocmVzdWx0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTE9BRF9GSUxFU19TVUNDRVNTLFxuICAgIHJlc3VsdFxuICB9O1xufVxuXG4vKipcbiAqIGNhbGxlZCB3aGVuIHN1Y2Nlc3NmdWxseSBsb2FkZWQgb25lIGZpbGUsIHJlYWR5IHRvIG1vdmUgb24gdG8gdGhlIG5leHQgb25lXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gcmVzdWx0XG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLmxvYWRGaWxlU3RlcFN1Y2Nlc3N9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlU3RlcFN1Y2Nlc3Moe2ZpbGVOYW1lLCBmaWxlQ2FjaGV9KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTE9BRF9GSUxFX1NURVBfU1VDQ0VTUyxcbiAgICBmaWxlTmFtZSxcbiAgICBmaWxlQ2FjaGVcbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGxvYWRpbmcgZmlsZSBlcnJvclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtICBlcnJvclxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5sb2FkRmlsZXNFcnJ9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlc0VycihmaWxlTmFtZSwgZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MT0FEX0ZJTEVTX0VSUixcbiAgICBmaWxlTmFtZSxcbiAgICBlcnJvclxuICB9O1xufVxuXG4vKipcbiAqIFN0b3JlIGZlYXR1cmVzIHRvIHN0YXRlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gZmVhdHVyZXNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykuc2V0RmVhdHVyZXN9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZlYXR1cmVzKGZlYXR1cmVzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX0ZFQVRVUkVTLFxuICAgIGZlYXR1cmVzXG4gIH07XG59XG5cbi8qKlxuICogSXQgd2lsbCBhcHBseSB0aGUgcHJvdmlkZSBmZWF0dXJlIGFzIGZpbHRlciB0byB0aGUgZ2l2ZW4gbGF5ZXIuXG4gKiBJZiB0aGUgZ2l2ZW4gZmVhdHVyZSBpcyBhbHJlYWR5IGFwcGxpZWQgYXMgZmlsdGVyIHRvIHRoZSBsYXllciwgaXQgd2lsbCByZW1vdmUgdGhlIGxheWVyIGZyb20gdGhlIGZpbHRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGxheWVyXG4gKiBAcGFyYW0gZmVhdHVyZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5zZXRQb2x5Z29uRmlsdGVyTGF5ZXJ9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFBvbHlnb25GaWx0ZXJMYXllcihsYXllciwgZmVhdHVyZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9QT0xZR09OX0ZJTFRFUl9MQVlFUixcbiAgICBsYXllcixcbiAgICBmZWF0dXJlXG4gIH07XG59XG5cbi8qKlxuICogU2V0IHRoZSBjdXJyZW50IGZlYXR1cmUgdG8gYmUgZWRpdGVkL2RlbGV0ZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBmZWF0dXJlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnNldFNlbGVjdGVkRmVhdHVyZX1cbiAqIEByZXR1cm5zIGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VsZWN0ZWRGZWF0dXJlKGZlYXR1cmUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfU0VMRUNURURfRkVBVFVSRSxcbiAgICBmZWF0dXJlXG4gIH07XG59XG5cbi8qKlxuICogRGVsZXRlIHRoZSBnaXZlbiBmZWF0dXJlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gZmVhdHVyZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5kZWxldGVGZWF0dXJlfVxuICogQHJldHVybnMgYWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVGZWF0dXJlKGZlYXR1cmUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5ERUxFVEVfRkVBVFVSRSxcbiAgICBmZWF0dXJlXG4gIH07XG59XG5cbi8qKiBTZXQgdGhlIG1hcCBtb2RlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gbW9kZSBvbmUgb2YgRURJVE9SX01PREVTXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnNldEVkaXRvck1vZGV9XG4gKiBAcmV0dXJucyBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge3NldE1hcE1vZGV9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7RURJVE9SX01PREVTfSBmcm9tICdrZXBsZXIuZ2wvY29uc3RhbnRzJztcbiAqXG4gKiB0aGlzLnByb3BzLmRpc3BhdGNoKHNldE1hcE1vZGUoRURJVE9SX01PREVTLkRSQVdfUE9MWUdPTikpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RWRpdG9yTW9kZShtb2RlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX0VESVRPUl9NT0RFLFxuICAgIG1vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIENQVSBmaWx0ZXIgb2Ygc2VsZWN0ZWQgZGF0YXNldFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIGRhdGFJZCAtIHNpbmdsZSBkYXRhSWQgb3IgYW4gYXJyYXkgb2YgZGF0YUlkc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5hcHBseUNQVUZpbHRlcn1cbiAqIEByZXR1cm5zIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDUFVGaWx0ZXIoZGF0YUlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuQVBQTFlfQ1BVX0ZJTFRFUixcbiAgICBkYXRhSWRcbiAgfTtcbn1cblxuLyoqXG4gKiBUb2dnbGUgZWRpdG9yIGxheWVyIHZpc2liaWxpdHlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL3Zpcy1zdGF0ZS1hY3Rpb25zJykudG9nZ2xlRWRpdG9yVmlzaWJpbGl0eX1cbiAqIEByZXR1cm4gYWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVFZGl0b3JWaXNpYmlsaXR5KCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlRPR0dMRV9FRElUT1JfVklTSUJJTElUWVxuICB9O1xufVxuXG4vKipcbiAqIFByb2Nlc3MgdGhlIG5leHQgZmlsZSBiYXRjaFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHBheWxvYWQgLSBiYXRjaCBwYXlsb2FkXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLm5leHRGaWxlQmF0Y2h9XG4gKiBAcmV0dXJuIGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dEZpbGVCYXRjaChwYXlsb2FkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTkVYVF9GSUxFX0JBVENILFxuICAgIHBheWxvYWRcbiAgfTtcbn1cblxuLyoqXG4gKiBQcm9jZXNzIHRoZSBmaWxlIGNvbnRlbnRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBwYXlsb2FkIC0gdGhlIGZpbGUgY29udGVudFxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5wcm9jZXNzRmlsZUNvbnRlbnR9XG4gKiBAcmV0dXJuIGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0ZpbGVDb250ZW50KHBheWxvYWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5QUk9DRVNTX0ZJTEVfQ09OVEVOVCxcbiAgICBwYXlsb2FkXG4gIH07XG59XG5cbi8qKlxuICogU2V0IGxheWVyIGFuaW1hdGlvbiB0aW1lIGZvcm1hdCBhbmQgdGltZXpvbmVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSBjb25maWcgLSB7dGltZUZvcm1hdDogc3RyaW5nLCB0aW1lem9uZTogc3RyaW5nfVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vdmlzLXN0YXRlLWFjdGlvbnMnKS5zZXRMYXllckFuaW1hdGlvblRpbWVDb25maWd9XG4gKiBAcmV0dXJuIGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TGF5ZXJBbmltYXRpb25UaW1lQ29uZmlnKGNvbmZpZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9MQVlFUl9BTklNQVRJT05fVElNRV9DT05GSUcsXG4gICAgY29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogU2V0IEZpbHRlciBhbmltYXRpb24gdGltZSBmb3JtYXQgYW5kIHRpbWV6b25lXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0gaWR4XG4gKiBAcGFyYW0gY29uZmlnXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi92aXMtc3RhdGUtYWN0aW9ucycpLnNldEZpbHRlckFuaW1hdGlvblRpbWVDb25maWd9XG4gKiBAcmV0dXJuIGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyQW5pbWF0aW9uVGltZUNvbmZpZyhpZHgsIGNvbmZpZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVJfQU5JTUFUSU9OX1RJTUVfQ09ORklHLFxuICAgIGlkeCxcbiAgICBjb25maWdcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGRlY2xhcmF0aW9uIGlzIG5lZWRlZCB0byBncm91cCBhY3Rpb25zIGluIGRvY3NcbiAqL1xuLyoqXG4gKiBBY3Rpb25zIGhhbmRsZWQgbW9zdGx5IGJ5IGB2aXNTdGF0ZWAgcmVkdWNlci5cbiAqIFRoZXkgbWFuYWdlIGhvdyBkYXRhIGlzIHByb2Nlc3NlZCwgZmlsdGVyZWQgYW5kIGRpc3BsYXllZCBvbiB0aGUgbWFwIGJ5IG9wZXJhdGVzIG9uIGxheWVycyxcbiAqIGZpbHRlcnMgYW5kIGludGVyYWN0aW9uIHNldHRpbmdzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHZpc1N0YXRlQWN0aW9ucyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4iXX0=