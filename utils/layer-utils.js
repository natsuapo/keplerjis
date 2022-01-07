"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDefaultLayer = findDefaultLayer;
exports.calculateLayerData = calculateLayerData;
exports.getLayerHoverProp = getLayerHoverProp;
exports.renderDeckGlLayer = renderDeckGlLayer;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/**
 * Find default layers from fields
 * @type {typeof import('./layer-utils').findDefaultLayer}
 */
function findDefaultLayer(dataset, layerClasses) {
  console.log('find default layer');

  if (!dataset) {
    return [];
  }

  var layerProps = Object.keys(layerClasses).reduce(function (previous, lc) {
    var result = typeof layerClasses[lc].findDefaultLayerProps === 'function' ? layerClasses[lc].findDefaultLayerProps(dataset, previous) : {
      props: []
    };
    var props = Array.isArray(result) ? result : result.props || [];
    var foundLayers = result.foundLayers || previous;
    return foundLayers.concat(props.map(function (p) {
      return _objectSpread(_objectSpread({}, p), {}, {
        type: lc,
        dataId: dataset.id
      });
    }));
  }, []); // go through all layerProps to create layer

  return layerProps.map(function (props) {
    var layer = new layerClasses[props.type](props);
    return typeof layer.setInitialLayerConfig === 'function' && dataset.dataContainer ? layer.setInitialLayerConfig(dataset) : layer;
  });
}
/**
 * calculate layer data based on layer type, col Config,
 * return updated layer if colorDomain, dataMap has changed
 * @type {typeof import('./layer-utils').calculateLayerData}
 */


function calculateLayerData(layer, state, oldLayerData) {
  var type = layer.type;

  if (!type || !layer.hasAllColumns() || !layer.config.dataId) {
    return {
      layer: layer,
      layerData: {}
    };
  }

  var layerData = layer.formatLayerData(state.datasets, oldLayerData);
  return {
    layerData: layerData,
    layer: layer
  };
}
/**
 * Calculate props passed to LayerHoverInfo
 * @type {typeof import('./layer-utils').getLayerHoverProp}
 */


function getLayerHoverProp(_ref) {
  var interactionConfig = _ref.interactionConfig,
      hoverInfo = _ref.hoverInfo,
      layers = _ref.layers,
      layersToRender = _ref.layersToRender,
      datasets = _ref.datasets;

  if (interactionConfig.tooltip.enabled && hoverInfo && hoverInfo.picked) {
    // if anything hovered
    var object = hoverInfo.object,
        overlay = hoverInfo.layer; // deckgl layer to kepler-gl layer

    var layer = layers[overlay.props.idx];

    if (object && layer && layer.getHoverData && layersToRender[layer.id]) {
      // if layer is visible and have hovered data
      var dataId = layer.config.dataId;

      if (!dataId) {
        return null;
      }

      var _datasets$dataId = datasets[dataId],
          dataContainer = _datasets$dataId.dataContainer,
          fields = _datasets$dataId.fields;
      var data = layer.getHoverData(object, dataContainer, fields);
      var fieldsToShow = interactionConfig.tooltip.config.fieldsToShow[dataId];
      return {
        data: data,
        fields: fields,
        fieldsToShow: fieldsToShow,
        layer: layer
      };
    }
  }

  return null;
}

function renderDeckGlLayer(props, layerCallbacks, idx) {
  var datasets = props.datasets,
      layers = props.layers,
      layerData = props.layerData,
      hoverInfo = props.hoverInfo,
      clicked = props.clicked,
      mapState = props.mapState,
      interactionConfig = props.interactionConfig,
      animationConfig = props.animationConfig;
  var layer = layers[idx];
  var data = layerData[idx];

  var _ref2 = datasets[layer.config.dataId] || {},
      gpuFilter = _ref2.gpuFilter;

  var objectHovered = clicked || hoverInfo; // Layer is Layer class

  return layer.renderLayer({
    data: data,
    gpuFilter: gpuFilter,
    idx: idx,
    interactionConfig: interactionConfig,
    layerCallbacks: layerCallbacks,
    mapState: mapState,
    animationConfig: animationConfig,
    objectHovered: objectHovered
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sYXllci11dGlscy5qcyJdLCJuYW1lcyI6WyJmaW5kRGVmYXVsdExheWVyIiwiZGF0YXNldCIsImxheWVyQ2xhc3NlcyIsImNvbnNvbGUiLCJsb2ciLCJsYXllclByb3BzIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsInByZXZpb3VzIiwibGMiLCJyZXN1bHQiLCJmaW5kRGVmYXVsdExheWVyUHJvcHMiLCJwcm9wcyIsIkFycmF5IiwiaXNBcnJheSIsImZvdW5kTGF5ZXJzIiwiY29uY2F0IiwibWFwIiwicCIsInR5cGUiLCJkYXRhSWQiLCJpZCIsImxheWVyIiwic2V0SW5pdGlhbExheWVyQ29uZmlnIiwiZGF0YUNvbnRhaW5lciIsImNhbGN1bGF0ZUxheWVyRGF0YSIsInN0YXRlIiwib2xkTGF5ZXJEYXRhIiwiaGFzQWxsQ29sdW1ucyIsImNvbmZpZyIsImxheWVyRGF0YSIsImZvcm1hdExheWVyRGF0YSIsImRhdGFzZXRzIiwiZ2V0TGF5ZXJIb3ZlclByb3AiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImhvdmVySW5mbyIsImxheWVycyIsImxheWVyc1RvUmVuZGVyIiwidG9vbHRpcCIsImVuYWJsZWQiLCJwaWNrZWQiLCJvYmplY3QiLCJvdmVybGF5IiwiaWR4IiwiZ2V0SG92ZXJEYXRhIiwiZmllbGRzIiwiZGF0YSIsImZpZWxkc1RvU2hvdyIsInJlbmRlckRlY2tHbExheWVyIiwibGF5ZXJDYWxsYmFja3MiLCJjbGlja2VkIiwibWFwU3RhdGUiLCJhbmltYXRpb25Db25maWciLCJncHVGaWx0ZXIiLCJvYmplY3RIb3ZlcmVkIiwicmVuZGVyTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ08s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dCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIEZpbmQgZGVmYXVsdCBsYXllcnMgZnJvbSBmaWVsZHNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2xheWVyLXV0aWxzJykuZmluZERlZmF1bHRMYXllcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmREZWZhdWx0TGF5ZXIoZGF0YXNldCwgbGF5ZXJDbGFzc2VzKSB7XG4gIGNvbnNvbGUubG9nKCdmaW5kIGRlZmF1bHQgbGF5ZXInKVxuICBpZiAoIWRhdGFzZXQpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3QgbGF5ZXJQcm9wcyA9IE9iamVjdC5rZXlzKGxheWVyQ2xhc3NlcykucmVkdWNlKChwcmV2aW91cywgbGMpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPVxuICAgICAgdHlwZW9mIGxheWVyQ2xhc3Nlc1tsY10uZmluZERlZmF1bHRMYXllclByb3BzID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gbGF5ZXJDbGFzc2VzW2xjXS5maW5kRGVmYXVsdExheWVyUHJvcHMoZGF0YXNldCwgcHJldmlvdXMpXG4gICAgICAgIDoge3Byb3BzOiBbXX07XG5cbiAgICBjb25zdCBwcm9wcyA9IEFycmF5LmlzQXJyYXkocmVzdWx0KSA/IHJlc3VsdCA6IHJlc3VsdC5wcm9wcyB8fCBbXTtcbiAgICBjb25zdCBmb3VuZExheWVycyA9IHJlc3VsdC5mb3VuZExheWVycyB8fCBwcmV2aW91cztcblxuICAgIHJldHVybiBmb3VuZExheWVycy5jb25jYXQoXG4gICAgICBwcm9wcy5tYXAocCA9PiAoe1xuICAgICAgICAuLi5wLFxuICAgICAgICB0eXBlOiBsYyxcbiAgICAgICAgZGF0YUlkOiBkYXRhc2V0LmlkXG4gICAgICB9KSlcbiAgICApO1xuICB9LCBbXSk7XG5cbiAgLy8gZ28gdGhyb3VnaCBhbGwgbGF5ZXJQcm9wcyB0byBjcmVhdGUgbGF5ZXJcbiAgcmV0dXJuIGxheWVyUHJvcHMubWFwKHByb3BzID0+IHtcbiAgICBjb25zdCBsYXllciA9IG5ldyBsYXllckNsYXNzZXNbcHJvcHMudHlwZV0ocHJvcHMpO1xuICAgIHJldHVybiB0eXBlb2YgbGF5ZXIuc2V0SW5pdGlhbExheWVyQ29uZmlnID09PSAnZnVuY3Rpb24nICYmIGRhdGFzZXQuZGF0YUNvbnRhaW5lclxuICAgICAgPyBsYXllci5zZXRJbml0aWFsTGF5ZXJDb25maWcoZGF0YXNldClcbiAgICAgIDogbGF5ZXI7XG4gIH0pO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSBsYXllciBkYXRhIGJhc2VkIG9uIGxheWVyIHR5cGUsIGNvbCBDb25maWcsXG4gKiByZXR1cm4gdXBkYXRlZCBsYXllciBpZiBjb2xvckRvbWFpbiwgZGF0YU1hcCBoYXMgY2hhbmdlZFxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vbGF5ZXItdXRpbHMnKS5jYWxjdWxhdGVMYXllckRhdGF9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVMYXllckRhdGEobGF5ZXIsIHN0YXRlLCBvbGRMYXllckRhdGEpIHtcbiAgY29uc3Qge3R5cGV9ID0gbGF5ZXI7XG5cbiAgaWYgKCF0eXBlIHx8ICFsYXllci5oYXNBbGxDb2x1bW5zKCkgfHwgIWxheWVyLmNvbmZpZy5kYXRhSWQpIHtcbiAgICByZXR1cm4ge2xheWVyLCBsYXllckRhdGE6IHt9fTtcbiAgfVxuXG4gIGNvbnN0IGxheWVyRGF0YSA9IGxheWVyLmZvcm1hdExheWVyRGF0YShzdGF0ZS5kYXRhc2V0cywgb2xkTGF5ZXJEYXRhKTtcbiAgcmV0dXJuIHtsYXllckRhdGEsIGxheWVyfTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgcHJvcHMgcGFzc2VkIHRvIExheWVySG92ZXJJbmZvXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9sYXllci11dGlscycpLmdldExheWVySG92ZXJQcm9wfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF5ZXJIb3ZlclByb3Aoe1xuICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgaG92ZXJJbmZvLFxuICBsYXllcnMsXG4gIGxheWVyc1RvUmVuZGVyLFxuICBkYXRhc2V0c1xufSkge1xuICBpZiAoaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5lbmFibGVkICYmIGhvdmVySW5mbyAmJiBob3ZlckluZm8ucGlja2VkKSB7XG4gICAgLy8gaWYgYW55dGhpbmcgaG92ZXJlZFxuICAgIGNvbnN0IHtvYmplY3QsIGxheWVyOiBvdmVybGF5fSA9IGhvdmVySW5mbztcblxuICAgIC8vIGRlY2tnbCBsYXllciB0byBrZXBsZXItZ2wgbGF5ZXJcbiAgICBjb25zdCBsYXllciA9IGxheWVyc1tvdmVybGF5LnByb3BzLmlkeF07XG5cbiAgICBpZiAob2JqZWN0ICYmIGxheWVyICYmIGxheWVyLmdldEhvdmVyRGF0YSAmJiBsYXllcnNUb1JlbmRlcltsYXllci5pZF0pIHtcbiAgICAgIC8vIGlmIGxheWVyIGlzIHZpc2libGUgYW5kIGhhdmUgaG92ZXJlZCBkYXRhXG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbmZpZzoge2RhdGFJZH1cbiAgICAgIH0gPSBsYXllcjtcbiAgICAgIGlmICghZGF0YUlkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qge2RhdGFDb250YWluZXIsIGZpZWxkc30gPSBkYXRhc2V0c1tkYXRhSWRdO1xuICAgICAgY29uc3QgZGF0YSA9IGxheWVyLmdldEhvdmVyRGF0YShvYmplY3QsIGRhdGFDb250YWluZXIsIGZpZWxkcyk7XG4gICAgICBjb25zdCBmaWVsZHNUb1Nob3cgPSBpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZmllbGRzLFxuICAgICAgICBmaWVsZHNUb1Nob3csXG4gICAgICAgIGxheWVyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRGVja0dsTGF5ZXIocHJvcHMsIGxheWVyQ2FsbGJhY2tzLCBpZHgpIHtcbiAgY29uc3Qge1xuICAgIGRhdGFzZXRzLFxuICAgIGxheWVycyxcbiAgICBsYXllckRhdGEsXG4gICAgaG92ZXJJbmZvLFxuICAgIGNsaWNrZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgYW5pbWF0aW9uQ29uZmlnXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaWR4XTtcbiAgY29uc3QgZGF0YSA9IGxheWVyRGF0YVtpZHhdO1xuICBjb25zdCB7Z3B1RmlsdGVyfSA9IGRhdGFzZXRzW2xheWVyLmNvbmZpZy5kYXRhSWRdIHx8IHt9O1xuXG4gIGNvbnN0IG9iamVjdEhvdmVyZWQgPSBjbGlja2VkIHx8IGhvdmVySW5mbztcblxuICAvLyBMYXllciBpcyBMYXllciBjbGFzc1xuICByZXR1cm4gbGF5ZXIucmVuZGVyTGF5ZXIoe1xuICAgIGRhdGEsXG4gICAgZ3B1RmlsdGVyLFxuICAgIGlkeCxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICBsYXllckNhbGxiYWNrcyxcbiAgICBtYXBTdGF0ZSxcbiAgICBhbmltYXRpb25Db25maWcsXG4gICAgb2JqZWN0SG92ZXJlZFxuICB9KTtcbn1cbiJdfQ==