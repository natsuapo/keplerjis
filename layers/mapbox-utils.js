"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapboxLayers = generateMapboxLayers;
exports.updateMapboxLayers = updateMapboxLayers;
exports.geoJsonFromData = geoJsonFromData;
exports.gpuFilterToMapboxFilter = gpuFilterToMapboxFilter;
exports.prefixGpuField = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _baseLayer = require("./base-layer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @typedef {import("geojson").FeatureCollection} FeatureCollection */

/** @typedef {import("geojson").Feature} Feature */

/**
 * This function will convert layers to mapbox layers
 * @param {Array<Object>} layers the layers to be converted
 * @param {Array<Object>} layerData extra layer information
 * @param {Array<Number>} layerOrder the order by which we should convert layers
 * @param {Object} layersToRender {[id]: true | false} object whether each layer should be rendered
 * @returns {Object} {[id]: layer}
 */
function generateMapboxLayers() {
  var layers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var layerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var layerOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var layersToRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (layerData.length > 0) {
    return layerOrder.slice().reverse().filter(function (idx) {
      return layers[idx].overlayType === _baseLayer.OVERLAY_TYPE.mapboxgl && layersToRender[layers[idx].id];
    }).reduce(function (accu, index) {
      var layer = layers[index];
      return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, layer.id, {
        id: layer.id,
        data: layerData[index].data,
        isVisible: layer.config.isVisible,
        config: layerData[index].config,
        hidden: layer.config.hidden,
        sourceId: layerData[index].config.source
      }));
    }, {});
  }

  return {};
}
/**
 * Update mapbox layers on the given map
 * @param {Object} map
 * @param {Object} newLayers Map of new mapbox layers to be displayed
 * @param {Object} oldLayers Map of the old layers to be compare with the current ones to detect deleted layers
 *                  {layerId: sourceId}
 */


function updateMapboxLayers(map) {
  var newLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var oldLayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  // delete no longer existed old layers
  if (oldLayers) {
    checkAndRemoveOldLayers(map, oldLayers, newLayers);
  } // insert or update new layer


  Object.values(newLayers).forEach(function (overlay) {
    var layerId = overlay.id,
        config = overlay.config,
        data = overlay.data,
        sourceId = overlay.sourceId,
        isVisible = overlay.isVisible;

    if (!data && !config) {
      return;
    }

    var _ref = oldLayers && oldLayers[layerId] || {},
        oldData = _ref.data,
        oldConfig = _ref.config;

    if (data && data !== oldData) {
      updateSourceData(map, sourceId, data);
    } // compare with previous configs


    if (oldConfig !== config) {
      updateLayerConfig(map, layerId, config, isVisible);
    }
  });
}

function checkAndRemoveOldLayers(map, oldLayers, newLayers) {
  Object.keys(oldLayers).forEach(function (layerId) {
    if (!newLayers[layerId]) {
      map.removeLayer(layerId);
    }
  });
}

function updateLayerConfig(map, layerId, config, isVisible) {
  var mapboxLayer = map.getLayer(layerId);

  if (mapboxLayer) {
    // check if layer already is set
    // remove it if exists
    map.removeLayer(layerId);
  }

  map.addLayer(config);
  map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
}

function updateSourceData(map, sourceId, data) {
  var source = map.getSource(sourceId);

  if (!source) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: data
    });
  } else {
    source.setData(data);
  }
}
/**
 *
 * @param filteredIndex
 * @param getGeometry {({index: number}) => any}
 * @param getProperties {({index: number}) => any}
 * @returns FeatureCollection
 */


function geoJsonFromData() {
  var filteredIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var getGeometry = arguments.length > 1 ? arguments[1] : undefined;
  var getProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (d) {};
  var geojson = {
    type: 'FeatureCollection',

    /** @type {Feature[]} */
    features: []
  };

  for (var i = 0; i < filteredIndex.length; i++) {
    var index = filteredIndex[i];
    var rowIndex = {
      index: index
    };
    var geometry = getGeometry(rowIndex);

    if (geometry) {
      geojson.features.push({
        type: 'Feature',
        properties: _objectSpread({
          index: index
        }, getProperties(rowIndex)),
        geometry: geometry
      });
    }
  }

  return geojson;
}

var prefixGpuField = function prefixGpuField(name) {
  return "gpu:".concat(name);
};

exports.prefixGpuField = prefixGpuField;

function gpuFilterToMapboxFilter(gpuFilter) {
  var filterRange = gpuFilter.filterRange,
      filterValueUpdateTriggers = gpuFilter.filterValueUpdateTriggers;
  var hasFilter = Object.values(filterValueUpdateTriggers).filter(function (d) {
    return d;
  });

  if (!hasFilter.length) {
    return null;
  }

  var condition = ['all']; // [">=", key, value]
  // ["<=", key, value]

  var expressions = Object.values(filterValueUpdateTriggers).reduce(function (accu, name, i) {
    return name ? [].concat((0, _toConsumableArray2["default"])(accu), [['>=', prefixGpuField(name), filterRange[i][0]], ['<=', prefixGpuField(name), filterRange[i][1]]]) : accu;
  }, condition);
  return expressions;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvbWFwYm94LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlTWFwYm94TGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJPcmRlciIsImxheWVyc1RvUmVuZGVyIiwibGVuZ3RoIiwic2xpY2UiLCJyZXZlcnNlIiwiZmlsdGVyIiwiaWR4Iiwib3ZlcmxheVR5cGUiLCJPVkVSTEFZX1RZUEUiLCJtYXBib3hnbCIsImlkIiwicmVkdWNlIiwiYWNjdSIsImluZGV4IiwibGF5ZXIiLCJkYXRhIiwiaXNWaXNpYmxlIiwiY29uZmlnIiwiaGlkZGVuIiwic291cmNlSWQiLCJzb3VyY2UiLCJ1cGRhdGVNYXBib3hMYXllcnMiLCJtYXAiLCJuZXdMYXllcnMiLCJvbGRMYXllcnMiLCJjaGVja0FuZFJlbW92ZU9sZExheWVycyIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJvdmVybGF5IiwibGF5ZXJJZCIsIm9sZERhdGEiLCJvbGRDb25maWciLCJ1cGRhdGVTb3VyY2VEYXRhIiwidXBkYXRlTGF5ZXJDb25maWciLCJrZXlzIiwicmVtb3ZlTGF5ZXIiLCJtYXBib3hMYXllciIsImdldExheWVyIiwiYWRkTGF5ZXIiLCJzZXRMYXlvdXRQcm9wZXJ0eSIsImdldFNvdXJjZSIsImFkZFNvdXJjZSIsInR5cGUiLCJzZXREYXRhIiwiZ2VvSnNvbkZyb21EYXRhIiwiZmlsdGVyZWRJbmRleCIsImdldEdlb21ldHJ5IiwiZ2V0UHJvcGVydGllcyIsImQiLCJnZW9qc29uIiwiZmVhdHVyZXMiLCJpIiwicm93SW5kZXgiLCJnZW9tZXRyeSIsInB1c2giLCJwcm9wZXJ0aWVzIiwicHJlZml4R3B1RmllbGQiLCJuYW1lIiwiZ3B1RmlsdGVyVG9NYXBib3hGaWx0ZXIiLCJncHVGaWx0ZXIiLCJmaWx0ZXJSYW5nZSIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJoYXNGaWx0ZXIiLCJjb25kaXRpb24iLCJleHByZXNzaW9ucyJd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QWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQUMsSUFBSTtBQUFBLHVCQUFXQSxJQUFYO0FBQUEsQ0FBM0I7Ozs7QUFFQSxTQUFTQyx1QkFBVCxDQUFpQ0MsU0FBakMsRUFBNEM7QUFBQSxNQUMxQ0MsV0FEMEMsR0FDQUQsU0FEQSxDQUMxQ0MsV0FEMEM7QUFBQSxNQUM3QkMseUJBRDZCLEdBQ0FGLFNBREEsQ0FDN0JFLHlCQUQ2QjtBQUdqRCxNQUFNQyxTQUFTLEdBQUdyQyxNQUFNLENBQUNDLE1BQVAsQ0FBY21DLHlCQUFkLEVBQXlDekQsTUFBekMsQ0FBZ0QsVUFBQTRDLENBQUM7QUFBQSxXQUFJQSxDQUFKO0FBQUEsR0FBakQsQ0FBbEI7O0FBRUEsTUFBSSxDQUFDYyxTQUFTLENBQUM3RCxNQUFmLEVBQXVCO0FBQ3JCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQU04RCxTQUFTLEdBQUcsQ0FBQyxLQUFELENBQWxCLENBVGlELENBV2pEO0FBQ0E7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHdkMsTUFBTSxDQUFDQyxNQUFQLENBQWNtQyx5QkFBZCxFQUF5Q25ELE1BQXpDLENBQ2xCLFVBQUNDLElBQUQsRUFBTzhDLElBQVAsRUFBYU4sQ0FBYjtBQUFBLFdBQ0VNLElBQUksaURBRUs5QyxJQUZMLElBR0UsQ0FBQyxJQUFELEVBQU82QyxjQUFjLENBQUNDLElBQUQsQ0FBckIsRUFBNkJHLFdBQVcsQ0FBQ1QsQ0FBRCxDQUFYLENBQWUsQ0FBZixDQUE3QixDQUhGLEVBSUUsQ0FBQyxJQUFELEVBQU9LLGNBQWMsQ0FBQ0MsSUFBRCxDQUFyQixFQUE2QkcsV0FBVyxDQUFDVCxDQUFELENBQVgsQ0FBZSxDQUFmLENBQTdCLENBSkYsS0FNQXhDLElBUE47QUFBQSxHQURrQixFQVNsQm9ELFNBVGtCLENBQXBCO0FBWUEsU0FBT0MsV0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtPVkVSTEFZX1RZUEV9IGZyb20gJy4vYmFzZS1sYXllcic7XG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiZ2VvanNvblwiKS5GZWF0dXJlQ29sbGVjdGlvbn0gRmVhdHVyZUNvbGxlY3Rpb24gKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiZ2VvanNvblwiKS5GZWF0dXJlfSBGZWF0dXJlICovXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgbGF5ZXJzIHRvIG1hcGJveCBsYXllcnNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gbGF5ZXJzIHRoZSBsYXllcnMgdG8gYmUgY29udmVydGVkXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGxheWVyRGF0YSBleHRyYSBsYXllciBpbmZvcm1hdGlvblxuICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBsYXllck9yZGVyIHRoZSBvcmRlciBieSB3aGljaCB3ZSBzaG91bGQgY29udmVydCBsYXllcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBsYXllcnNUb1JlbmRlciB7W2lkXTogdHJ1ZSB8IGZhbHNlfSBvYmplY3Qgd2hldGhlciBlYWNoIGxheWVyIHNob3VsZCBiZSByZW5kZXJlZFxuICogQHJldHVybnMge09iamVjdH0ge1tpZF06IGxheWVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNYXBib3hMYXllcnMoXG4gIGxheWVycyA9IFtdLFxuICBsYXllckRhdGEgPSBbXSxcbiAgbGF5ZXJPcmRlciA9IFtdLFxuICBsYXllcnNUb1JlbmRlciA9IHt9XG4pIHtcbiAgaWYgKGxheWVyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGxheWVyT3JkZXJcbiAgICAgIC5zbGljZSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuZmlsdGVyKFxuICAgICAgICBpZHggPT4gbGF5ZXJzW2lkeF0ub3ZlcmxheVR5cGUgPT09IE9WRVJMQVlfVFlQRS5tYXBib3hnbCAmJiBsYXllcnNUb1JlbmRlcltsYXllcnNbaWR4XS5pZF1cbiAgICAgIClcbiAgICAgIC5yZWR1Y2UoKGFjY3UsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2luZGV4XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIFtsYXllci5pZF06IHtcbiAgICAgICAgICAgIGlkOiBsYXllci5pZCxcbiAgICAgICAgICAgIGRhdGE6IGxheWVyRGF0YVtpbmRleF0uZGF0YSxcbiAgICAgICAgICAgIGlzVmlzaWJsZTogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZSxcbiAgICAgICAgICAgIGNvbmZpZzogbGF5ZXJEYXRhW2luZGV4XS5jb25maWcsXG4gICAgICAgICAgICBoaWRkZW46IGxheWVyLmNvbmZpZy5oaWRkZW4sXG4gICAgICAgICAgICBzb3VyY2VJZDogbGF5ZXJEYXRhW2luZGV4XS5jb25maWcuc291cmNlXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHt9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBtYXBib3ggbGF5ZXJzIG9uIHRoZSBnaXZlbiBtYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXdMYXllcnMgTWFwIG9mIG5ldyBtYXBib3ggbGF5ZXJzIHRvIGJlIGRpc3BsYXllZFxuICogQHBhcmFtIHtPYmplY3R9IG9sZExheWVycyBNYXAgb2YgdGhlIG9sZCBsYXllcnMgdG8gYmUgY29tcGFyZSB3aXRoIHRoZSBjdXJyZW50IG9uZXMgdG8gZGV0ZWN0IGRlbGV0ZWQgbGF5ZXJzXG4gKiAgICAgICAgICAgICAgICAgIHtsYXllcklkOiBzb3VyY2VJZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1hcGJveExheWVycyhtYXAsIG5ld0xheWVycyA9IHt9LCBvbGRMYXllcnMgPSBudWxsKSB7XG4gIC8vIGRlbGV0ZSBubyBsb25nZXIgZXhpc3RlZCBvbGQgbGF5ZXJzXG4gIGlmIChvbGRMYXllcnMpIHtcbiAgICBjaGVja0FuZFJlbW92ZU9sZExheWVycyhtYXAsIG9sZExheWVycywgbmV3TGF5ZXJzKTtcbiAgfVxuXG4gIC8vIGluc2VydCBvciB1cGRhdGUgbmV3IGxheWVyXG4gIE9iamVjdC52YWx1ZXMobmV3TGF5ZXJzKS5mb3JFYWNoKG92ZXJsYXkgPT4ge1xuICAgIGNvbnN0IHtpZDogbGF5ZXJJZCwgY29uZmlnLCBkYXRhLCBzb3VyY2VJZCwgaXNWaXNpYmxlfSA9IG92ZXJsYXk7XG4gICAgaWYgKCFkYXRhICYmICFjb25maWcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7ZGF0YTogb2xkRGF0YSwgY29uZmlnOiBvbGRDb25maWd9ID0gKG9sZExheWVycyAmJiBvbGRMYXllcnNbbGF5ZXJJZF0pIHx8IHt9O1xuXG4gICAgaWYgKGRhdGEgJiYgZGF0YSAhPT0gb2xkRGF0YSkge1xuICAgICAgdXBkYXRlU291cmNlRGF0YShtYXAsIHNvdXJjZUlkLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBjb21wYXJlIHdpdGggcHJldmlvdXMgY29uZmlnc1xuICAgIGlmIChvbGRDb25maWcgIT09IGNvbmZpZykge1xuICAgICAgdXBkYXRlTGF5ZXJDb25maWcobWFwLCBsYXllcklkLCBjb25maWcsIGlzVmlzaWJsZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tBbmRSZW1vdmVPbGRMYXllcnMobWFwLCBvbGRMYXllcnMsIG5ld0xheWVycykge1xuICBPYmplY3Qua2V5cyhvbGRMYXllcnMpLmZvckVhY2gobGF5ZXJJZCA9PiB7XG4gICAgaWYgKCFuZXdMYXllcnNbbGF5ZXJJZF0pIHtcbiAgICAgIG1hcC5yZW1vdmVMYXllcihsYXllcklkKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMYXllckNvbmZpZyhtYXAsIGxheWVySWQsIGNvbmZpZywgaXNWaXNpYmxlKSB7XG4gIGNvbnN0IG1hcGJveExheWVyID0gbWFwLmdldExheWVyKGxheWVySWQpO1xuXG4gIGlmIChtYXBib3hMYXllcikge1xuICAgIC8vIGNoZWNrIGlmIGxheWVyIGFscmVhZHkgaXMgc2V0XG4gICAgLy8gcmVtb3ZlIGl0IGlmIGV4aXN0c1xuICAgIG1hcC5yZW1vdmVMYXllcihsYXllcklkKTtcbiAgfVxuXG4gIG1hcC5hZGRMYXllcihjb25maWcpO1xuICBtYXAuc2V0TGF5b3V0UHJvcGVydHkobGF5ZXJJZCwgJ3Zpc2liaWxpdHknLCBpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnbm9uZScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTb3VyY2VEYXRhKG1hcCwgc291cmNlSWQsIGRhdGEpIHtcbiAgY29uc3Qgc291cmNlID0gbWFwLmdldFNvdXJjZShzb3VyY2VJZCk7XG5cbiAgaWYgKCFzb3VyY2UpIHtcbiAgICBtYXAuYWRkU291cmNlKHNvdXJjZUlkLCB7XG4gICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc291cmNlLnNldERhdGEoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGZpbHRlcmVkSW5kZXhcbiAqIEBwYXJhbSBnZXRHZW9tZXRyeSB7KHtpbmRleDogbnVtYmVyfSkgPT4gYW55fVxuICogQHBhcmFtIGdldFByb3BlcnRpZXMgeyh7aW5kZXg6IG51bWJlcn0pID0+IGFueX1cbiAqIEByZXR1cm5zIEZlYXR1cmVDb2xsZWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW9Kc29uRnJvbURhdGEoZmlsdGVyZWRJbmRleCA9IFtdLCBnZXRHZW9tZXRyeSwgZ2V0UHJvcGVydGllcyA9IGQgPT4ge30pIHtcbiAgY29uc3QgZ2VvanNvbiA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIC8qKiBAdHlwZSB7RmVhdHVyZVtdfSAqL1xuICAgIGZlYXR1cmVzOiBbXVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICBjb25zdCByb3dJbmRleCA9IHtpbmRleH07XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBnZXRHZW9tZXRyeShyb3dJbmRleCk7XG5cbiAgICBpZiAoZ2VvbWV0cnkpIHtcbiAgICAgIGdlb2pzb24uZmVhdHVyZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIC4uLmdldFByb3BlcnRpZXMocm93SW5kZXgpXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2VvanNvbjtcbn1cblxuZXhwb3J0IGNvbnN0IHByZWZpeEdwdUZpZWxkID0gbmFtZSA9PiBgZ3B1OiR7bmFtZX1gO1xuXG5leHBvcnQgZnVuY3Rpb24gZ3B1RmlsdGVyVG9NYXBib3hGaWx0ZXIoZ3B1RmlsdGVyKSB7XG4gIGNvbnN0IHtmaWx0ZXJSYW5nZSwgZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2Vyc30gPSBncHVGaWx0ZXI7XG5cbiAgY29uc3QgaGFzRmlsdGVyID0gT2JqZWN0LnZhbHVlcyhmaWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzKS5maWx0ZXIoZCA9PiBkKTtcblxuICBpZiAoIWhhc0ZpbHRlci5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGNvbmRpdGlvbiA9IFsnYWxsJ107XG5cbiAgLy8gW1wiPj1cIiwga2V5LCB2YWx1ZV1cbiAgLy8gW1wiPD1cIiwga2V5LCB2YWx1ZV1cbiAgY29uc3QgZXhwcmVzc2lvbnMgPSBPYmplY3QudmFsdWVzKGZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMpLnJlZHVjZShcbiAgICAoYWNjdSwgbmFtZSwgaSkgPT5cbiAgICAgIG5hbWVcbiAgICAgICAgPyBbXG4gICAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgICAgWyc+PScsIHByZWZpeEdwdUZpZWxkKG5hbWUpLCBmaWx0ZXJSYW5nZVtpXVswXV0sXG4gICAgICAgICAgICBbJzw9JywgcHJlZml4R3B1RmllbGQobmFtZSksIGZpbHRlclJhbmdlW2ldWzFdXVxuICAgICAgICAgIF1cbiAgICAgICAgOiBhY2N1LFxuICAgIGNvbmRpdGlvblxuICApO1xuXG4gIHJldHVybiBleHByZXNzaW9ucztcbn1cbiJdfQ==