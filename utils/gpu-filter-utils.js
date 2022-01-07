"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFilterGpuMode = setFilterGpuMode;
exports.assignGpuChannels = assignGpuChannels;
exports.assignGpuChannel = assignGpuChannel;
exports.resetFilterGpuMode = resetFilterGpuMode;
exports.getGpuFilterProps = getGpuFilterProps;
exports.getDatasetFieldIndexForFilter = getDatasetFieldIndexForFilter;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("./utils");

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var _moment = _interopRequireDefault(require("moment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Set gpu mode based on current number of gpu filters exists
 * @type {typeof import('./gpu-filter-utils').setFilterGpuMode}
 */
function setFilterGpuMode(filter, filters) {
  // filter can be applied to multiple datasets, hence gpu filter mode should also be
  // an array, however, to keep us sane, for now, we only check if there is available channel for every dataId,
  // if all of them has, we set gpu mode to true
  // TODO: refactor filter so we don't keep an array of everything
  filter.dataId.forEach(function (dataId, datasetIdx) {
    var gpuFilters = filters.filter(function (f) {
      return f.dataId.includes(dataId) && f.gpu;
    });

    if (filter.gpu && gpuFilters.length === _defaultSettings.MAX_GPU_FILTERS) {
      return (0, _utils.set)(['gpu'], false, filter);
    }
  });
  return filter;
}
/**
 * Scan though all filters and assign gpu chanel to gpu filter
 * @type {typeof import('./gpu-filter-utils').assignGpuChannels}
 */


function assignGpuChannels(allFilters) {
  return allFilters.reduce(function (accu, f, index) {
    var filters = accu; // if gpu is true assign and validate gpu Channel

    if (f.gpu) {
      f = assignGpuChannel(f, accu);
      filters = (0, _utils.set)([index], f, accu);
    }

    return filters;
  }, allFilters);
}
/**
 * Assign a new gpu filter a channel based on first availability
 * @type {typeof import('./gpu-filter-utils').assignGpuChannel}
 */


function assignGpuChannel(filter, filters) {
  // find first available channel
  if (!filter.gpu) {
    return filter;
  }

  var gpuChannel = filter.gpuChannel || [];
  filter.dataId.forEach(function (dataId, datasetIdx) {
    var findGpuChannel = function findGpuChannel(channel) {
      return function (f) {
        var dataIdx = (0, _utils.toArray)(f.dataId).indexOf(dataId);
        return f.id !== filter.id && dataIdx > -1 && f.gpu && (0, _utils.toArray)(f.gpuChannel)[dataIdx] === channel;
      };
    };

    if (Number.isFinite(gpuChannel[datasetIdx]) && !filters.find(findGpuChannel(gpuChannel[datasetIdx]))) {
      // if value is already assigned and valid
      return;
    }

    var i = 0;

    while (i < _defaultSettings.MAX_GPU_FILTERS) {
      if (!filters.find(findGpuChannel(i))) {
        gpuChannel[datasetIdx] = i;
        return;
      }

      i++;
    }
  }); // if cannot find channel for all dataid, set gpu back to false
  // TODO: refactor filter to handle same filter different gpu mode

  if (!gpuChannel.length || !gpuChannel.every(Number.isFinite)) {
    return _objectSpread(_objectSpread({}, filter), {}, {
      gpu: false
    });
  }

  return _objectSpread(_objectSpread({}, filter), {}, {
    gpuChannel: gpuChannel
  });
}
/**
 * Edit filter.gpu to ensure that only
 * X number of gpu filers can coexist.
 * @type {typeof import('./gpu-filter-utils').resetFilterGpuMode}
 */


function resetFilterGpuMode(filters) {
  var gpuPerDataset = {};
  return filters.map(function (f, i) {
    if (f.gpu) {
      var gpu = true;
      (0, _utils.toArray)(f.dataId).forEach(function (dataId) {
        var count = gpuPerDataset[dataId];

        if (count === _defaultSettings.MAX_GPU_FILTERS) {
          gpu = false;
        } else {
          gpuPerDataset[dataId] = count ? count + 1 : 1;
        }
      });

      if (!gpu) {
        return (0, _utils.set)(['gpu'], false, f);
      }
    }

    return f;
  });
}
/**
 * Initial filter uniform
 * @returns {Array<Array<Number>>}
 */


function getEmptyFilterRange() {
  return new Array(_defaultSettings.MAX_GPU_FILTERS).fill(0).map(function (d) {
    return [0, 0];
  });
}
/**
 * Returns index of the data element.
 * @param {any} d Data element with row index info.
 * @returns number
 */


var defaultGetIndex = function defaultGetIndex(d) {
  return d.index;
};
/**
 * Returns value at the specified row from the data container.
 * @param {import('./table-utils/data-container-interface').DataContainerInterface} dc Data container.
 * @param {any} d Data element with row index info.
 * @param {number} fieldIndex Column index in the data container.
 * @returns
 */


var defaultGetData = function defaultGetData(dc, d, fieldIndex) {
  return dc.valueAt(d.index, fieldIndex);
};
/**
 * @param {Array<Object>} channels
 * @param {string} dataId
 * @param {Array<Object>} fields
 * @return {Function} getFilterValue
 */


var getFilterValueAccessor = function getFilterValueAccessor(channels, dataId, fields) {
  return function (dc) {
    return function () {
      var getIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultGetIndex;
      var getData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultGetData;
      return function (d) {
        return (// for empty channel, value is 0 and min max would be [0, 0]
          channels.map(function (filter) {
            if (!filter) {
              return 0;
            }

            var fieldIndex = getDatasetFieldIndexForFilter(dataId, filter);
            var field = fields[fieldIndex];
            var value = filter.type === _defaultSettings.FILTER_TYPES.timeRange ? field.filterProps && Array.isArray(field.filterProps.mappedValue) ? field.filterProps.mappedValue[getIndex(d)] : _moment["default"].utc(getData(dc, d, fieldIndex)).valueOf() : getData(dc, d, fieldIndex);
            return (0, _dataUtils.notNullorUndefined)(value) ? value - filter.domain[0] : Number.MIN_SAFE_INTEGER;
          })
        );
      };
    };
  };
};
/**
 * Get filter properties for gpu filtering
 * @type {typeof import('./gpu-filter-utils').getGpuFilterProps}
 */


function getGpuFilterProps(filters, dataId, fields) {
  var filterRange = getEmptyFilterRange();
  var triggers = {}; // array of filter for each channel, undefined, if no filter is assigned to that channel

  var channels = [];

  var _loop = function _loop(i) {
    var filter = filters.find(function (f) {
      return f.gpu && f.dataId.includes(dataId) && f.gpuChannel && f.gpuChannel[f.dataId.indexOf(dataId)] === i;
    }); // @ts-ignore

    filterRange[i][0] = filter ? filter.value[0] - filter.domain[0] : 0; // @ts-ignore

    filterRange[i][1] = filter ? filter.value[1] - filter.domain[0] : 0;
    triggers["gpuFilter_".concat(i)] = filter ? filter.name[filter.dataId.indexOf(dataId)] : null;
    channels.push(filter);
  };

  for (var i = 0; i < _defaultSettings.MAX_GPU_FILTERS; i++) {
    _loop(i);
  }

  var filterValueAccessor = getFilterValueAccessor(channels, dataId, fields);
  return {
    filterRange: filterRange,
    filterValueUpdateTriggers: triggers,
    filterValueAccessor: filterValueAccessor
  };
}
/**
 * Return dataset field index from filter.fieldIdx
 * The index matches the same dataset index for filter.dataId
 * @type {typeof import('./gpu-filter-utils').getDatasetFieldIndexForFilter}
 */


function getDatasetFieldIndexForFilter(dataId, filter) {
  var datasetIndex = (0, _utils.toArray)(filter.dataId).indexOf(dataId);

  if (datasetIndex < 0) {
    return -1;
  }

  var fieldIndex = filter.fieldIdx[datasetIndex];
  return (0, _dataUtils.notNullorUndefined)(fieldIndex) ? fieldIndex : -1;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ncHUtZmlsdGVyLXV0aWxzLmpzIl0sIm5hbWVzIjpbInNldEZpbHRlckdwdU1vZGUiLCJmaWx0ZXIiLCJmaWx0ZXJzIiwiZGF0YUlkIiwiZm9yRWFjaCIsImRhdGFzZXRJZHgiLCJncHVGaWx0ZXJzIiwiZiIsImluY2x1ZGVzIiwiZ3B1IiwibGVuZ3RoIiwiTUFYX0dQVV9GSUxURVJTIiwiYXNzaWduR3B1Q2hhbm5lbHMiLCJhbGxGaWx0ZXJzIiwicmVkdWNlIiwiYWNjdSIsImluZGV4IiwiYXNzaWduR3B1Q2hhbm5lbCIsImdwdUNoYW5uZWwiLCJmaW5kR3B1Q2hhbm5lbCIsImNoYW5uZWwiLCJkYXRhSWR4IiwiaW5kZXhPZiIsImlkIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJmaW5kIiwiaSIsImV2ZXJ5IiwicmVzZXRGaWx0ZXJHcHVNb2RlIiwiZ3B1UGVyRGF0YXNldCIsIm1hcCIsImNvdW50IiwiZ2V0RW1wdHlGaWx0ZXJSYW5nZSIsIkFycmF5IiwiZmlsbCIsImQiLCJkZWZhdWx0R2V0SW5kZXgiLCJkZWZhdWx0R2V0RGF0YSIsImRjIiwiZmllbGRJbmRleCIsInZhbHVlQXQiLCJnZXRGaWx0ZXJWYWx1ZUFjY2Vzc29yIiwiY2hhbm5lbHMiLCJmaWVsZHMiLCJnZXRJbmRleCIsImdldERhdGEiLCJnZXREYXRhc2V0RmllbGRJbmRleEZvckZpbHRlciIsImZpZWxkIiwidmFsdWUiLCJ0eXBlIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwiZmlsdGVyUHJvcHMiLCJpc0FycmF5IiwibWFwcGVkVmFsdWUiLCJtb21lbnQiLCJ1dGMiLCJ2YWx1ZU9mIiwiZG9tYWluIiwiTUlOX1NBRkVfSU5URUdFUiIsImdldEdwdUZpbHRlclByb3BzIiwiZmlsdGVyUmFuZ2UiLCJ0cmlnZ2VycyIsIm5hbWUiLCJwdXNoIiwiZmlsdGVyVmFsdWVBY2Nlc3NvciIsImZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMiLCJkYXRhc2V0SW5kZXgi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QUFPO0FBQ0xrQixJQUFBQSxXQUFXLEVBQVhBLFdBREs7QUFFTEssSUFBQUEseUJBQXlCLEVBQUVKLFFBRnRCO0FBR0xHLElBQUFBLG1CQUFtQixFQUFuQkE7QUFISyxHQUFQO0FBS0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTbkIsNkJBQVQsQ0FBdUM1QyxNQUF2QyxFQUErQ0YsTUFBL0MsRUFBdUQ7QUFDNUQsTUFBTW1FLFlBQVksR0FBRyxvQkFBUW5FLE1BQU0sQ0FBQ0UsTUFBZixFQUF1Qm1CLE9BQXZCLENBQStCbkIsTUFBL0IsQ0FBckI7O0FBQ0EsTUFBSWlFLFlBQVksR0FBRyxDQUFuQixFQUFzQjtBQUNwQixXQUFPLENBQUMsQ0FBUjtBQUNEOztBQUVELE1BQU01QixVQUFVLEdBQUd2QyxNQUFNLENBQUNvRSxRQUFQLENBQWdCRCxZQUFoQixDQUFuQjtBQUVBLFNBQU8sbUNBQW1CNUIsVUFBbkIsSUFBaUNBLFVBQWpDLEdBQThDLENBQUMsQ0FBdEQ7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7c2V0LCB0b0FycmF5fSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7TUFYX0dQVV9GSUxURVJTLCBGSUxURVJfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7bm90TnVsbG9yVW5kZWZpbmVkfSBmcm9tICcuL2RhdGEtdXRpbHMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG4vKipcbiAqIFNldCBncHUgbW9kZSBiYXNlZCBvbiBjdXJyZW50IG51bWJlciBvZiBncHUgZmlsdGVycyBleGlzdHNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2dwdS1maWx0ZXItdXRpbHMnKS5zZXRGaWx0ZXJHcHVNb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyR3B1TW9kZShmaWx0ZXIsIGZpbHRlcnMpIHtcbiAgLy8gZmlsdGVyIGNhbiBiZSBhcHBsaWVkIHRvIG11bHRpcGxlIGRhdGFzZXRzLCBoZW5jZSBncHUgZmlsdGVyIG1vZGUgc2hvdWxkIGFsc28gYmVcbiAgLy8gYW4gYXJyYXksIGhvd2V2ZXIsIHRvIGtlZXAgdXMgc2FuZSwgZm9yIG5vdywgd2Ugb25seSBjaGVjayBpZiB0aGVyZSBpcyBhdmFpbGFibGUgY2hhbm5lbCBmb3IgZXZlcnkgZGF0YUlkLFxuICAvLyBpZiBhbGwgb2YgdGhlbSBoYXMsIHdlIHNldCBncHUgbW9kZSB0byB0cnVlXG4gIC8vIFRPRE86IHJlZmFjdG9yIGZpbHRlciBzbyB3ZSBkb24ndCBrZWVwIGFuIGFycmF5IG9mIGV2ZXJ5dGhpbmdcblxuICBmaWx0ZXIuZGF0YUlkLmZvckVhY2goKGRhdGFJZCwgZGF0YXNldElkeCkgPT4ge1xuICAgIGNvbnN0IGdwdUZpbHRlcnMgPSBmaWx0ZXJzLmZpbHRlcihmID0+IGYuZGF0YUlkLmluY2x1ZGVzKGRhdGFJZCkgJiYgZi5ncHUpO1xuXG4gICAgaWYgKGZpbHRlci5ncHUgJiYgZ3B1RmlsdGVycy5sZW5ndGggPT09IE1BWF9HUFVfRklMVEVSUykge1xuICAgICAgcmV0dXJuIHNldChbJ2dwdSddLCBmYWxzZSwgZmlsdGVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmaWx0ZXI7XG59XG5cbi8qKlxuICogU2NhbiB0aG91Z2ggYWxsIGZpbHRlcnMgYW5kIGFzc2lnbiBncHUgY2hhbmVsIHRvIGdwdSBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2dwdS1maWx0ZXItdXRpbHMnKS5hc3NpZ25HcHVDaGFubmVsc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbkdwdUNoYW5uZWxzKGFsbEZpbHRlcnMpIHtcbiAgcmV0dXJuIGFsbEZpbHRlcnMucmVkdWNlKChhY2N1LCBmLCBpbmRleCkgPT4ge1xuICAgIGxldCBmaWx0ZXJzID0gYWNjdTtcblxuICAgIC8vIGlmIGdwdSBpcyB0cnVlIGFzc2lnbiBhbmQgdmFsaWRhdGUgZ3B1IENoYW5uZWxcbiAgICBpZiAoZi5ncHUpIHtcbiAgICAgIGYgPSBhc3NpZ25HcHVDaGFubmVsKGYsIGFjY3UpO1xuICAgICAgZmlsdGVycyA9IHNldChbaW5kZXhdLCBmLCBhY2N1KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVycztcbiAgfSwgYWxsRmlsdGVycyk7XG59XG4vKipcbiAqIEFzc2lnbiBhIG5ldyBncHUgZmlsdGVyIGEgY2hhbm5lbCBiYXNlZCBvbiBmaXJzdCBhdmFpbGFiaWxpdHlcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2dwdS1maWx0ZXItdXRpbHMnKS5hc3NpZ25HcHVDaGFubmVsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduR3B1Q2hhbm5lbChmaWx0ZXIsIGZpbHRlcnMpIHtcbiAgLy8gZmluZCBmaXJzdCBhdmFpbGFibGUgY2hhbm5lbFxuICBpZiAoIWZpbHRlci5ncHUpIHtcbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG5cbiAgY29uc3QgZ3B1Q2hhbm5lbCA9IGZpbHRlci5ncHVDaGFubmVsIHx8IFtdO1xuXG4gIGZpbHRlci5kYXRhSWQuZm9yRWFjaCgoZGF0YUlkLCBkYXRhc2V0SWR4KSA9PiB7XG4gICAgY29uc3QgZmluZEdwdUNoYW5uZWwgPSBjaGFubmVsID0+IGYgPT4ge1xuICAgICAgY29uc3QgZGF0YUlkeCA9IHRvQXJyYXkoZi5kYXRhSWQpLmluZGV4T2YoZGF0YUlkKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGYuaWQgIT09IGZpbHRlci5pZCAmJiBkYXRhSWR4ID4gLTEgJiYgZi5ncHUgJiYgdG9BcnJheShmLmdwdUNoYW5uZWwpW2RhdGFJZHhdID09PSBjaGFubmVsXG4gICAgICApO1xuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICBOdW1iZXIuaXNGaW5pdGUoZ3B1Q2hhbm5lbFtkYXRhc2V0SWR4XSkgJiZcbiAgICAgICFmaWx0ZXJzLmZpbmQoZmluZEdwdUNoYW5uZWwoZ3B1Q2hhbm5lbFtkYXRhc2V0SWR4XSkpXG4gICAgKSB7XG4gICAgICAvLyBpZiB2YWx1ZSBpcyBhbHJlYWR5IGFzc2lnbmVkIGFuZCB2YWxpZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgTUFYX0dQVV9GSUxURVJTKSB7XG4gICAgICBpZiAoIWZpbHRlcnMuZmluZChmaW5kR3B1Q2hhbm5lbChpKSkpIHtcbiAgICAgICAgZ3B1Q2hhbm5lbFtkYXRhc2V0SWR4XSA9IGk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGlmIGNhbm5vdCBmaW5kIGNoYW5uZWwgZm9yIGFsbCBkYXRhaWQsIHNldCBncHUgYmFjayB0byBmYWxzZVxuICAvLyBUT0RPOiByZWZhY3RvciBmaWx0ZXIgdG8gaGFuZGxlIHNhbWUgZmlsdGVyIGRpZmZlcmVudCBncHUgbW9kZVxuICBpZiAoIWdwdUNoYW5uZWwubGVuZ3RoIHx8ICFncHVDaGFubmVsLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZmlsdGVyLFxuICAgICAgZ3B1OiBmYWxzZVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLmZpbHRlcixcbiAgICBncHVDaGFubmVsXG4gIH07XG59XG4vKipcbiAqIEVkaXQgZmlsdGVyLmdwdSB0byBlbnN1cmUgdGhhdCBvbmx5XG4gKiBYIG51bWJlciBvZiBncHUgZmlsZXJzIGNhbiBjb2V4aXN0LlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZ3B1LWZpbHRlci11dGlscycpLnJlc2V0RmlsdGVyR3B1TW9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0RmlsdGVyR3B1TW9kZShmaWx0ZXJzKSB7XG4gIGNvbnN0IGdwdVBlckRhdGFzZXQgPSB7fTtcblxuICByZXR1cm4gZmlsdGVycy5tYXAoKGYsIGkpID0+IHtcbiAgICBpZiAoZi5ncHUpIHtcbiAgICAgIGxldCBncHUgPSB0cnVlO1xuICAgICAgdG9BcnJheShmLmRhdGFJZCkuZm9yRWFjaChkYXRhSWQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudCA9IGdwdVBlckRhdGFzZXRbZGF0YUlkXTtcblxuICAgICAgICBpZiAoY291bnQgPT09IE1BWF9HUFVfRklMVEVSUykge1xuICAgICAgICAgIGdwdSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdwdVBlckRhdGFzZXRbZGF0YUlkXSA9IGNvdW50ID8gY291bnQgKyAxIDogMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZ3B1KSB7XG4gICAgICAgIHJldHVybiBzZXQoWydncHUnXSwgZmFsc2UsIGYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJbml0aWFsIGZpbHRlciB1bmlmb3JtXG4gKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8TnVtYmVyPj59XG4gKi9cbmZ1bmN0aW9uIGdldEVtcHR5RmlsdGVyUmFuZ2UoKSB7XG4gIHJldHVybiBuZXcgQXJyYXkoTUFYX0dQVV9GSUxURVJTKS5maWxsKDApLm1hcChkID0+IFswLCAwXSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBpbmRleCBvZiB0aGUgZGF0YSBlbGVtZW50LlxuICogQHBhcmFtIHthbnl9IGQgRGF0YSBlbGVtZW50IHdpdGggcm93IGluZGV4IGluZm8uXG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuY29uc3QgZGVmYXVsdEdldEluZGV4ID0gZCA9PiBkLmluZGV4O1xuXG4vKipcbiAqIFJldHVybnMgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCByb3cgZnJvbSB0aGUgZGF0YSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi90YWJsZS11dGlscy9kYXRhLWNvbnRhaW5lci1pbnRlcmZhY2UnKS5EYXRhQ29udGFpbmVySW50ZXJmYWNlfSBkYyBEYXRhIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7YW55fSBkIERhdGEgZWxlbWVudCB3aXRoIHJvdyBpbmRleCBpbmZvLlxuICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkSW5kZXggQ29sdW1uIGluZGV4IGluIHRoZSBkYXRhIGNvbnRhaW5lci5cbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IGRlZmF1bHRHZXREYXRhID0gKGRjLCBkLCBmaWVsZEluZGV4KSA9PiB7XG4gIHJldHVybiBkYy52YWx1ZUF0KGQuaW5kZXgsIGZpZWxkSW5kZXgpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGNoYW5uZWxzXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpZWxkc1xuICogQHJldHVybiB7RnVuY3Rpb259IGdldEZpbHRlclZhbHVlXG4gKi9cbmNvbnN0IGdldEZpbHRlclZhbHVlQWNjZXNzb3IgPSAoY2hhbm5lbHMsIGRhdGFJZCwgZmllbGRzKSA9PiBkYyA9PiAoXG4gIGdldEluZGV4ID0gZGVmYXVsdEdldEluZGV4LFxuICBnZXREYXRhID0gZGVmYXVsdEdldERhdGFcbikgPT4gZCA9PlxuICAvLyBmb3IgZW1wdHkgY2hhbm5lbCwgdmFsdWUgaXMgMCBhbmQgbWluIG1heCB3b3VsZCBiZSBbMCwgMF1cbiAgY2hhbm5lbHMubWFwKGZpbHRlciA9PiB7XG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBjb25zdCBmaWVsZEluZGV4ID0gZ2V0RGF0YXNldEZpZWxkSW5kZXhGb3JGaWx0ZXIoZGF0YUlkLCBmaWx0ZXIpO1xuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzW2ZpZWxkSW5kZXhdO1xuXG4gICAgY29uc3QgdmFsdWUgPVxuICAgICAgZmlsdGVyLnR5cGUgPT09IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2VcbiAgICAgICAgPyBmaWVsZC5maWx0ZXJQcm9wcyAmJiBBcnJheS5pc0FycmF5KGZpZWxkLmZpbHRlclByb3BzLm1hcHBlZFZhbHVlKVxuICAgICAgICAgID8gZmllbGQuZmlsdGVyUHJvcHMubWFwcGVkVmFsdWVbZ2V0SW5kZXgoZCldXG4gICAgICAgICAgOiBtb21lbnQudXRjKGdldERhdGEoZGMsIGQsIGZpZWxkSW5kZXgpKS52YWx1ZU9mKClcbiAgICAgICAgOiBnZXREYXRhKGRjLCBkLCBmaWVsZEluZGV4KTtcblxuICAgIHJldHVybiBub3ROdWxsb3JVbmRlZmluZWQodmFsdWUpID8gdmFsdWUgLSBmaWx0ZXIuZG9tYWluWzBdIDogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVI7XG4gIH0pO1xuXG4vKipcbiAqIEdldCBmaWx0ZXIgcHJvcGVydGllcyBmb3IgZ3B1IGZpbHRlcmluZ1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZ3B1LWZpbHRlci11dGlscycpLmdldEdwdUZpbHRlclByb3BzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3B1RmlsdGVyUHJvcHMoZmlsdGVycywgZGF0YUlkLCBmaWVsZHMpIHtcbiAgY29uc3QgZmlsdGVyUmFuZ2UgPSBnZXRFbXB0eUZpbHRlclJhbmdlKCk7XG4gIGNvbnN0IHRyaWdnZXJzID0ge307XG5cbiAgLy8gYXJyYXkgb2YgZmlsdGVyIGZvciBlYWNoIGNoYW5uZWwsIHVuZGVmaW5lZCwgaWYgbm8gZmlsdGVyIGlzIGFzc2lnbmVkIHRvIHRoYXQgY2hhbm5lbFxuICBjb25zdCBjaGFubmVscyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTUFYX0dQVV9GSUxURVJTOyBpKyspIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJzLmZpbmQoXG4gICAgICBmID0+XG4gICAgICAgIGYuZ3B1ICYmXG4gICAgICAgIGYuZGF0YUlkLmluY2x1ZGVzKGRhdGFJZCkgJiZcbiAgICAgICAgZi5ncHVDaGFubmVsICYmXG4gICAgICAgIGYuZ3B1Q2hhbm5lbFtmLmRhdGFJZC5pbmRleE9mKGRhdGFJZCldID09PSBpXG4gICAgKTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmaWx0ZXJSYW5nZVtpXVswXSA9IGZpbHRlciA/IGZpbHRlci52YWx1ZVswXSAtIGZpbHRlci5kb21haW5bMF0gOiAwO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmaWx0ZXJSYW5nZVtpXVsxXSA9IGZpbHRlciA/IGZpbHRlci52YWx1ZVsxXSAtIGZpbHRlci5kb21haW5bMF0gOiAwO1xuXG4gICAgdHJpZ2dlcnNbYGdwdUZpbHRlcl8ke2l9YF0gPSBmaWx0ZXIgPyBmaWx0ZXIubmFtZVtmaWx0ZXIuZGF0YUlkLmluZGV4T2YoZGF0YUlkKV0gOiBudWxsO1xuICAgIGNoYW5uZWxzLnB1c2goZmlsdGVyKTtcbiAgfVxuXG4gIGNvbnN0IGZpbHRlclZhbHVlQWNjZXNzb3IgPSBnZXRGaWx0ZXJWYWx1ZUFjY2Vzc29yKGNoYW5uZWxzLCBkYXRhSWQsIGZpZWxkcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJSYW5nZSxcbiAgICBmaWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzOiB0cmlnZ2VycyxcbiAgICBmaWx0ZXJWYWx1ZUFjY2Vzc29yXG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJuIGRhdGFzZXQgZmllbGQgaW5kZXggZnJvbSBmaWx0ZXIuZmllbGRJZHhcbiAqIFRoZSBpbmRleCBtYXRjaGVzIHRoZSBzYW1lIGRhdGFzZXQgaW5kZXggZm9yIGZpbHRlci5kYXRhSWRcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2dwdS1maWx0ZXItdXRpbHMnKS5nZXREYXRhc2V0RmllbGRJbmRleEZvckZpbHRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFzZXRGaWVsZEluZGV4Rm9yRmlsdGVyKGRhdGFJZCwgZmlsdGVyKSB7XG4gIGNvbnN0IGRhdGFzZXRJbmRleCA9IHRvQXJyYXkoZmlsdGVyLmRhdGFJZCkuaW5kZXhPZihkYXRhSWQpO1xuICBpZiAoZGF0YXNldEluZGV4IDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGNvbnN0IGZpZWxkSW5kZXggPSBmaWx0ZXIuZmllbGRJZHhbZGF0YXNldEluZGV4XTtcblxuICByZXR1cm4gbm90TnVsbG9yVW5kZWZpbmVkKGZpZWxkSW5kZXgpID8gZmllbGRJbmRleCA6IC0xO1xufVxuIl19