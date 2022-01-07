"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFilter = getDefaultFilter;
exports.shouldApplyFilter = shouldApplyFilter;
exports.validatePolygonFilter = validatePolygonFilter;
exports.validateFilter = validateFilter;
exports.validateFilterWithData = validateFilterWithData;
exports.getFilterProps = getFilterProps;
exports.getFieldDomain = getFieldDomain;
exports.getFilterFunction = getFilterFunction;
exports.updateFilterDataId = updateFilterDataId;
exports.filterDataByFilterTypes = filterDataByFilterTypes;
exports.getFilterRecord = getFilterRecord;
exports.diffFilters = diffFilters;
exports.adjustValueToFilterDomain = adjustValueToFilterDomain;
exports.getNumericFieldDomain = getNumericFieldDomain;
exports.getNumericStepSize = getNumericStepSize;
exports.getTimestampFieldDomain = getTimestampFieldDomain;
exports.histogramConstruct = histogramConstruct;
exports.getHistogram = getHistogram;
exports.formatNumberByStep = formatNumberByStep;
exports.isInRange = isInRange;
exports.isInDateRange = isInDateRange;
exports.isInPolygon = isInPolygon;
exports.isValidTimeDomain = isValidTimeDomain;
exports.getTimeWidgetTitleFormatter = getTimeWidgetTitleFormatter;
exports.getTimeWidgetHintFormatter = getTimeWidgetHintFormatter;
exports.isValidFilterValue = isValidFilterValue;
exports.getFilterPlot = getFilterPlot;
exports.getDefaultFilterPlotType = getDefaultFilterPlotType;
exports.applyFiltersToDatasets = applyFiltersToDatasets;
exports.applyFilterFieldName = applyFilterFieldName;
exports.mergeFilterDomainStep = mergeFilterDomainStep;
exports.generatePolygonFilter = generatePolygonFilter;
exports.filterDatasetCPU = filterDatasetCPU;
exports.validateFiltersUpdateDatasets = validateFiltersUpdateDatasets;
exports.getIntervalBins = getIntervalBins;
exports.getFilterIdInFeature = exports.featureToFilterValue = exports.getPolygonFilterFunctor = exports.LAYER_FILTERS = exports.FILTER_ID_LENGTH = exports.DEFAULT_FILTER_STRUCTURE = exports.FILTER_COMPONENTS = exports.LIMITED_FILTER_EFFECT_PROPS = exports.FILTER_UPDATER_PROPS = exports.PLOT_TYPES = exports.enlargedHistogramBins = exports.histogramBins = exports.TimestampStepMap = exports.DOW_LIST = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _d3Array = require("d3-array");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _console = require("global/console");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.isequal"));

var _booleanWithin = _interopRequireDefault(require("@turf/boolean-within"));

var _helpers = require("@turf/helpers");

var _decimal = require("decimal.js");

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var ScaleUtils = _interopRequireWildcard(require("./data-scale-utils"));

var _types = require("../layers/types");

var _utils = require("./utils");

var _h3Utils = require("../layers/h3-hexagon-layer/h3-utils");

var _gpuFilterUtils = require("./gpu-filter-utils");

var _dateUtils = require("./date-utils");

var _FILTER_TYPES$timeRan, _FILTER_TYPES$range, _SupportedPlotType, _FILTER_COMPONENTS;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// import {DATE_DICT} from '../constants/default-settings';
var DOW_LIST = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // TYPE

/** @typedef {import('./table-utils/kepler-table').FilterRecord} FilterRecord */

/** @typedef {import('./filter-utils').FilterResult} FilterResult */

exports.DOW_LIST = DOW_LIST;
var TimestampStepMap = [{
  max: 1,
  step: 0.05
}, {
  max: 10,
  step: 0.1
}, {
  max: 100,
  step: 1
}, {
  max: 500,
  step: 5
}, {
  max: 1000,
  step: 10
}, {
  max: 5000,
  step: 50
}, {
  max: Number.POSITIVE_INFINITY,
  step: 1000
}];
exports.TimestampStepMap = TimestampStepMap;
var histogramBins = 30;
exports.histogramBins = histogramBins;
var enlargedHistogramBins = 100;
exports.enlargedHistogramBins = enlargedHistogramBins;
var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationYear = durationDay * 365;
var PLOT_TYPES = (0, _keymirror["default"])({
  histogram: null,
  lineChart: null
});
exports.PLOT_TYPES = PLOT_TYPES;
var FILTER_UPDATER_PROPS = (0, _keymirror["default"])({
  dataId: null,
  name: null,
  layerId: null
});
exports.FILTER_UPDATER_PROPS = FILTER_UPDATER_PROPS;
var LIMITED_FILTER_EFFECT_PROPS = (0, _keymirror["default"])((0, _defineProperty2["default"])({}, FILTER_UPDATER_PROPS.name, null));
/**
 * Max number of filter value buffers that deck.gl provides
 */

exports.LIMITED_FILTER_EFFECT_PROPS = LIMITED_FILTER_EFFECT_PROPS;
var SupportedPlotType = (_SupportedPlotType = {}, (0, _defineProperty2["default"])(_SupportedPlotType, _defaultSettings.FILTER_TYPES.timeRange, (_FILTER_TYPES$timeRan = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$timeRan)), (0, _defineProperty2["default"])(_SupportedPlotType, _defaultSettings.FILTER_TYPES.range, (_FILTER_TYPES$range = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$range)), _SupportedPlotType);
var FILTER_COMPONENTS = (_FILTER_COMPONENTS = {}, (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.select, 'SingleSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.multiSelect, 'MultiSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.timeRange, 'TimeRangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.range, 'RangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.polygon, 'PolygonFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.dateSelect, 'DateSelectFilter'), _FILTER_COMPONENTS);
exports.FILTER_COMPONENTS = FILTER_COMPONENTS;
var DEFAULT_FILTER_STRUCTURE = {
  dataId: [],
  // [string]
  freeze: false,
  id: null,
  // time range filter specific
  fixedDomain: false,
  enlarged: false,
  isAnimating: false,
  animationWindow: _defaultSettings.ANIMATION_WINDOW.free,
  speed: 1,
  // field specific
  name: [],
  // string
  type: null,
  fieldIdx: [],
  // [integer]
  domain: null,
  value: null,
  // plot
  plotType: PLOT_TYPES.histogram,
  yAxis: null,
  interval: null,
  // mode
  gpu: false
};
exports.DEFAULT_FILTER_STRUCTURE = DEFAULT_FILTER_STRUCTURE;
var FILTER_ID_LENGTH = 4;
exports.FILTER_ID_LENGTH = FILTER_ID_LENGTH;
var LAYER_FILTERS = [_defaultSettings.FILTER_TYPES.polygon];
/**
 * Generates a filter with a dataset id as dataId
 * @type {typeof import('./filter-utils').getDefaultFilter}
 */

exports.LAYER_FILTERS = LAYER_FILTERS;

function getDefaultFilter(dataId) {
  return _objectSpread(_objectSpread({}, DEFAULT_FILTER_STRUCTURE), {}, {
    // store it as dataId and it could be one or many
    dataId: (0, _utils.toArray)(dataId),
    id: (0, _utils.generateHashId)(FILTER_ID_LENGTH)
  });
}
/**
 * Check if a filter is valid based on the given dataId
 * @param  filter to validate
 * @param  datasetId id to validate filter against
 * @return true if a filter is valid, false otherwise
 * @type {typeof import('./filter-utils').shouldApplyFilter}
 */


function shouldApplyFilter(filter, datasetId) {
  var dataIds = (0, _utils.toArray)(filter.dataId);
  return dataIds.includes(datasetId) && filter.value !== null;
}
/**
 * Validates and modifies polygon filter structure
 * @param dataset
 * @param filter
 * @param layers
 * @return - {filter, dataset}
 * @type {typeof import('./filter-utils').validatePolygonFilter}
 */


function validatePolygonFilter(dataset, filter, layers) {
  var failed = {
    dataset: dataset,
    filter: null
  };
  var value = filter.value,
      layerId = filter.layerId,
      type = filter.type,
      dataId = filter.dataId;

  if (!layerId || !isValidFilterValue(type, value)) {
    return failed;
  }

  var isValidDataset = dataId.includes(dataset.id);

  if (!isValidDataset) {
    return failed;
  }

  var layer = layers.find(function (l) {
    return layerId.includes(l.id);
  });

  if (!layer) {
    return failed;
  }

  return {
    filter: _objectSpread(_objectSpread({}, filter), {}, {
      freeze: true,
      fieldIdx: []
    }),
    dataset: dataset
  };
}
/**
 * Custom filter validators
 */


var filterValidators = (0, _defineProperty2["default"])({}, _defaultSettings.FILTER_TYPES.polygon, validatePolygonFilter);
/**
 * Default validate filter function
 * @param dataset
 * @param filter
 * @return - {filter, dataset}
 * @type {typeof import('./filter-utils').validateFilter}
 */

function validateFilter(dataset, filter) {
  // match filter.dataId
  console.log('run validate filter');
  var failed = {
    dataset: dataset,
    filter: null
  };
  var filterDataId = (0, _utils.toArray)(filter.dataId);
  var filterDatasetIndex = filterDataId.indexOf(dataset.id);

  if (filterDatasetIndex < 0) {
    // the current filter is not mapped against the current dataset
    return failed;
  }

  var initializeFilter = _objectSpread(_objectSpread(_objectSpread({}, getDefaultFilter(filter.dataId)), filter), {}, {
    dataId: filterDataId,
    name: (0, _utils.toArray)(filter.name)
  });

  var fieldName = initializeFilter.name[filterDatasetIndex];

  var _applyFilterFieldName = applyFilterFieldName(initializeFilter, dataset, fieldName, filterDatasetIndex, {
    mergeDomain: true
  }),
      updatedFilter = _applyFilterFieldName.filter,
      updatedDataset = _applyFilterFieldName.dataset;

  if (!updatedFilter) {
    return failed;
  }

  updatedFilter.value = adjustValueToFilterDomain(filter.value, updatedFilter);
  updatedFilter.enlarged = typeof filter.enlarged === 'boolean' ? filter.enlarged : updatedFilter.enlarged;

  if (updatedFilter.value === null) {
    // cannot adjust saved value to filter
    return failed;
  }

  return {
    filter: validateFilterYAxis(updatedFilter, updatedDataset),
    dataset: updatedDataset
  };
}
/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param dataset
 * @param filter - filter to be validate
 * @param layers - layers
 * @return validated filter
 * @type {typeof import('./filter-utils').validateFilterWithData}
 */


function validateFilterWithData(dataset, filter, layers) {
  // @ts-ignore
  return filterValidators.hasOwnProperty(filter.type) ? filterValidators[filter.type](dataset, filter, layers) : validateFilter(dataset, filter);
}
/**
 * Validate YAxis
 * @param filter
 * @param dataset
 * @return {*}
 */


function validateFilterYAxis(filter, dataset) {
  // TODO: validate yAxis against other datasets
  var fields = dataset.fields;
  var _filter = filter,
      yAxis = _filter.yAxis; // TODO: validate yAxis against other datasets

  if (yAxis) {
    var matchedAxis = fields.find(function (_ref) {
      var name = _ref.name,
          type = _ref.type;
      return name === yAxis.name && type === yAxis.type;
    });
    filter = matchedAxis ? _objectSpread(_objectSpread({}, filter), {}, {
      yAxis: matchedAxis
    }, getFilterPlot(_objectSpread(_objectSpread({}, filter), {}, {
      yAxis: matchedAxis
    }), dataset)) : filter;
  }

  return filter;
}
/**
 * Get default filter prop based on field type
 *
 * @param field
 * @param fieldDomain
 * @returns default filter
 * @type {typeof import('./filter-utils').getFilterProps}
 */


function getFilterProps(field, fieldDomain) {
  var filterProps = _objectSpread(_objectSpread({}, fieldDomain), {}, {
    fieldType: field.type
  });

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        value: fieldDomain.domain,
        type: _defaultSettings.FILTER_TYPES.range,
        typeOptions: [_defaultSettings.FILTER_TYPES.range],
        gpu: true
      });

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.select,
        value: true,
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.string:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.multiSelect,
        value: [],
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.date:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.dateSelect,
        value: {
          date: filterProps.domain.date,
          dow: DOW_LIST,
          holiday: false
        },
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return _objectSpread(_objectSpread({}, filterProps), {}, {
        type: _defaultSettings.FILTER_TYPES.timeRange,
        enlarged: true,
        fixedDomain: true,
        value: filterProps.domain,
        gpu: true
      });

    default:
      return {};
  }
}
/**
 * Calculate field domain based on field type and data
 *
 * @type {typeof import('./filter-utils').getFieldDomain}
 */


function getFieldDomain(allData, field) {
  var fieldIdx = field.tableFieldIndex - 1;
  var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;

  var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);

  var domain;
  console.log('here get domain');

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      // calculate domain and step
      return getNumericFieldDomain(allData, valueAccessor);

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return {
        domain: [true, false]
      };

    case _defaultSettings.ALL_FIELD_TYPES.string:
      domain = ScaleUtils.getOrdinalDomain(allData, valueAccessor);
      return {
        domain: domain
      };

    case _defaultSettings.ALL_FIELD_TYPES.date:
      domain = ScaleUtils.getOrdinalDomain(allData, valueAccessor).map(function (x) {
        return new Date(x);
      });
      return {
        domain: {
          date: [domain[0], domain.slice(-1)[0]],
          dow: DOW_LIST,
          holiday: [true, false]
        }
      };

    case _defaultSettings.ALL_FIELD_TYPES.dow:
      return {
        domain: DOW_LIST
      };
    // case ALL_FIELD_TYPES.time:
    //   return {domain: [0,1440]}

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return getTimestampFieldDomain(allData, valueAccessor);

    default:
      return {
        domain: ScaleUtils.getOrdinalDomain(allData, valueAccessor)
      };
  }
}

var getPolygonFilterFunctor = function getPolygonFilterFunctor(layer, filter, dataContainer) {
  var getPosition = layer.getPositionAccessor(dataContainer);

  switch (layer.type) {
    case _types.LAYER_TYPES.point:
    case _types.LAYER_TYPES.icon:
      return function (data) {
        var pos = getPosition(data);
        return pos.every(Number.isFinite) && isInPolygon(pos, filter.value);
      };

    case _types.LAYER_TYPES.arc:
    case _types.LAYER_TYPES.line:
      return function (data) {
        var pos = getPosition(data);
        return pos.every(Number.isFinite) && [[pos[0], pos[1]], [pos[3], pos[4]]].every(function (point) {
          return isInPolygon(point, filter.value);
        });
      };

    case _types.LAYER_TYPES.hexagonId:
      if (layer.dataToFeature && layer.dataToFeature.centroids) {
        return function (data) {
          // null or getCentroid({id})
          var centroid = layer.dataToFeature.centroids[data.index];
          return centroid && isInPolygon(centroid, filter.value);
        };
      }

      return function (data) {
        var id = getPosition(data);

        if (!(0, _h3Utils.h3IsValid)(id)) {
          return false;
        }

        var pos = (0, _h3Utils.getCentroid)({
          id: id
        });
        return pos.every(Number.isFinite) && isInPolygon(pos, filter.value);
      };

    default:
      return function () {
        return true;
      };
  }
};
/**
 * @param field dataset Field
 * @param dataId Dataset id
 * @param filter Filter object
 * @param layers list of layers to filter upon
 * @param dataContainer Data container
 * @return filterFunction
 * @type {typeof import('./filter-utils').getFilterFunction}
 */


exports.getPolygonFilterFunctor = getPolygonFilterFunctor;

function getFilterFunction(field, dataId, filter, layers, dataContainer) {
  // field could be null in polygon filter
  var valueAccessor = field ? field.valueAccessor : function (data) {
    return null;
  };

  var defaultFunc = function defaultFunc(d) {
    return true;
  };

  console.log('filter function get here');

  switch (filter.type) {
    case _defaultSettings.FILTER_TYPES.dateSelect:
      return function (data) {
        return isInDateRange(valueAccessor(data), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.range:
      return function (data) {
        return isInRange(valueAccessor(data), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.multiSelect:
      return function (data) {
        return filter.value.includes(valueAccessor(data));
      };

    case _defaultSettings.FILTER_TYPES.select:
      return function (data) {
        return valueAccessor(data) === filter.value;
      };

    case _defaultSettings.FILTER_TYPES.timeRange:
      if (!field) {
        return defaultFunc;
      }

      var mappedValue = (0, _lodash["default"])(field, ['filterProps', 'mappedValue']);
      var accessor = Array.isArray(mappedValue) ? function (data) {
        return mappedValue[data.index];
      } : function (data) {
        return (0, _dataUtils.timeToUnixMilli)(valueAccessor(data), field.format);
      };
      return function (data) {
        return isInRange(accessor(data), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.polygon:
      if (!layers || !layers.length) {
        return defaultFunc;
      } // @ts-ignore


      var layerFilterFunctions = filter.layerId.map(function (id) {
        return layers.find(function (l) {
          return l.id === id;
        });
      }).filter(function (l) {
        return l && l.config.dataId === dataId;
      }).map(function (layer) {
        return getPolygonFilterFunctor(layer, filter, dataContainer);
      });
      return function (data) {
        return layerFilterFunctions.every(function (filterFunc) {
          return filterFunc(data);
        });
      };

    default:
      return defaultFunc;
  }
}

function updateFilterDataId(dataId) {
  return getDefaultFilter(dataId);
}
/**
 * @type {typeof import('./filter-utils').filterDataByFilterTypes}
 */


function filterDataByFilterTypes(_ref2, dataContainer) {
  var dynamicDomainFilters = _ref2.dynamicDomainFilters,
      cpuFilters = _ref2.cpuFilters,
      filterFuncs = _ref2.filterFuncs;

  var result = _objectSpread(_objectSpread({}, dynamicDomainFilters ? {
    filteredIndexForDomain: []
  } : {}), cpuFilters ? {
    filteredIndex: []
  } : {});

  var filterContext = {
    index: -1,
    dataContainer: dataContainer
  };

  var filterFuncCaller = function filterFuncCaller(filter) {
    return filterFuncs[filter.id](filterContext);
  };

  var numRows = dataContainer.numRows();

  for (var i = 0; i < numRows; ++i) {
    filterContext.index = i;
    var matchForDomain = dynamicDomainFilters && dynamicDomainFilters.every(filterFuncCaller);

    if (matchForDomain) {
      // @ts-ignore
      result.filteredIndexForDomain.push(filterContext.index);
    }

    var matchForRender = cpuFilters && cpuFilters.every(filterFuncCaller);

    if (matchForRender) {
      // @ts-ignore
      result.filteredIndex.push(filterContext.index);
    }
  }

  return result;
}
/**
 * Get a record of filters based on domain type and gpu / cpu
 * @type {typeof import('./filter-utils').getFilterRecord}
 */


function getFilterRecord(dataId, filters) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  /**
   * @type {FilterRecord}
   */
  var filterRecord = {
    dynamicDomain: [],
    fixedDomain: [],
    cpu: [],
    gpu: []
  };
  filters.forEach(function (f) {
    if (isValidFilterValue(f.type, f.value) && (0, _utils.toArray)(f.dataId).includes(dataId)) {
      (f.fixedDomain || opt.ignoreDomain ? filterRecord.fixedDomain : filterRecord.dynamicDomain).push(f);
      (f.gpu && !opt.cpuOnly ? filterRecord.gpu : filterRecord.cpu).push(f);
    }
  });
  console.log('run filter record');
  return filterRecord;
}
/**
 * Compare filter records to get what has changed
 * @type {typeof import('./filter-utils').diffFilters}
 */


function diffFilters(filterRecord) {
  var oldFilterRecord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var filterChanged = {};
  console.log('diff filters');
  Object.entries(filterRecord).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        record = _ref4[0],
        items = _ref4[1];

    items.forEach(function (filter) {
      var oldFilter = (oldFilterRecord[record] || []).find(function (f) {
        return f.id === filter.id;
      });

      if (!oldFilter) {
        // added
        filterChanged = (0, _utils.set)([record, filter.id], 'added', filterChanged);
      } else {
        // check  what has changed
        ['name', 'value', 'dataId'].forEach(function (prop) {
          if (filter[prop] !== oldFilter[prop]) {
            filterChanged = (0, _utils.set)([record, filter.id], "".concat(prop, "_changed"), filterChanged);
          }
        });
      }
    });
    (oldFilterRecord[record] || []).forEach(function (oldFilter) {
      // deleted
      if (!items.find(function (f) {
        return f.id === oldFilter.id;
      })) {
        filterChanged = (0, _utils.set)([record, oldFilter.id], 'deleted', filterChanged);
      }
    });

    if (!filterChanged[record]) {
      filterChanged[record] = null;
    }
  }); // @ts-ignore

  return filterChanged;
}
/**
 * Call by parsing filters from URL
 * Check if value of filter within filter domain, if not adjust it to match
 * filter domain
 *
 * @type {typeof import('./filter-utils').adjustValueToFilterDomain}
 * @returns value - adjusted value to match filter or null to remove filter
 */

/* eslint-disable complexity */


function adjustValueToFilterDomain(value, _ref5) {
  var domain = _ref5.domain,
      type = _ref5.type;

  if (!domain || !type) {
    return false;
  }

  console.log('adjust Value domain');

  switch (type) {
    case _defaultSettings.FILTER_TYPES.range:
    case _defaultSettings.FILTER_TYPES.timeRange:
      if (!Array.isArray(value) || value.length !== 2) {
        return domain.map(function (d) {
          return d;
        });
      }

      return value.map(function (d, i) {
        return (0, _dataUtils.notNullorUndefined)(d) && isInRange(d, domain) ? d : domain[i];
      });

    case _defaultSettings.FILTER_TYPES.multiSelect:
      if (!Array.isArray(value)) {
        return [];
      }

      var filteredValue = value.filter(function (d) {
        return domain.includes(d);
      });
      return filteredValue.length ? filteredValue : [];

    case _defaultSettings.FILTER_TYPES.select:
      return domain.includes(value) ? value : true;

    default:
      return null;
  }
}
/* eslint-enable complexity */

/**
 * Calculate numeric domain and suitable step
 *
 * @type {typeof import('./filter-utils').getNumericFieldDomain}
 */


function getNumericFieldDomain(dataContainer, valueAccessor) {
  var domain = [0, 1];
  var step = 0.1;
  var mappedValue = dataContainer.mapIndex(valueAccessor);

  if (dataContainer.numRows() > 1) {
    domain = ScaleUtils.getLinearDomain(mappedValue);
    var diff = domain[1] - domain[0]; // in case equal domain, [96, 96], which will break quantize scale

    if (!diff) {
      domain[1] = domain[0] + 1;
    }

    step = getNumericStepSize(diff) || step;
    domain[0] = formatNumberByStep(domain[0], step, 'floor');
    domain[1] = formatNumberByStep(domain[1], step, 'ceil');
  } // @ts-ignore


  var _getHistogram = getHistogram(domain, mappedValue),
      histogram = _getHistogram.histogram,
      enlargedHistogram = _getHistogram.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * Calculate step size for range and timerange filter
 *
 * @type {typeof import('./filter-utils').getNumericStepSize}
 */


function getNumericStepSize(diff) {
  diff = Math.abs(diff);

  if (diff > 100) {
    return 1;
  } else if (diff > 3) {
    return 0.01;
  } else if (diff > 1) {
    return 0.001;
  } // Try to get at least 1000 steps - and keep the step size below that of
  // the (diff > 1) case.


  var x = diff / 1000; // Find the exponent and truncate to 10 to the power of that exponent

  var exponentialForm = x.toExponential();
  var exponent = parseFloat(exponentialForm.split('e')[1]); // Getting ready for node 12
  // this is why we need decimal.js
  // Math.pow(10, -5) = 0.000009999999999999999
  // the above result shows in browser and node 10
  // node 12 behaves correctly

  return new _decimal.Decimal(10).pow(exponent).toNumber();
}
/**
 * Calculate timestamp domain and suitable step
 * @type {typeof import('./filter-utils').getTimestampFieldDomain}
 */


function getTimestampFieldDomain(dataContainer, valueAccessor) {
  // to avoid converting string format time to epoch
  // every time we compare we store a value mapped to int in filter domain
  var mappedValue = dataContainer.mapIndex(valueAccessor);
  var domain = ScaleUtils.getLinearDomain(mappedValue);
  var defaultTimeFormat = getTimeWidgetTitleFormatter(domain);
  var step = 0.01;
  var diff = domain[1] - domain[0];
  var entry = TimestampStepMap.find(function (f) {
    return f.max >= diff;
  });

  if (entry) {
    step = entry.step;
  }

  var _getHistogram2 = getHistogram(domain, mappedValue),
      histogram = _getHistogram2.histogram,
      enlargedHistogram = _getHistogram2.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    mappedValue: mappedValue,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram,
    defaultTimeFormat: defaultTimeFormat
  };
}
/**
 *
 * @type {typeof import('./filter-utils').histogramConstruct}
 */


function histogramConstruct(domain, mappedValue, bins) {
  return (0, _d3Array.histogram)().thresholds((0, _d3Array.ticks)(domain[0], domain[1], bins)).domain(domain)(mappedValue).map(function (bin) {
    return {
      count: bin.length,
      x0: bin.x0,
      x1: bin.x1
    };
  });
}
/**
 * Calculate histogram from domain and array of values
 *
 * @type {typeof import('./filter-utils').getHistogram}
 */


function getHistogram(domain, mappedValue) {
  var histogram = histogramConstruct(domain, mappedValue, histogramBins);
  var enlargedHistogram = histogramConstruct(domain, mappedValue, enlargedHistogramBins);
  return {
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * round number based on step
 *
 * @param {Number} val
 * @param {Number} step
 * @param {string} bound
 * @returns {Number} rounded number
 */


function formatNumberByStep(val, step, bound) {
  if (bound === 'floor') {
    return Math.floor(val * (1 / step)) / (1 / step);
  }

  return Math.ceil(val * (1 / step)) / (1 / step);
}
/**
 *
 * @type {typeof import('./filter-utils').isInRange}
 */


function isInRange(val, domain) {
  if (!Array.isArray(domain)) {
    return false;
  }

  return val >= domain[0] && val <= domain[1];
}

function isInDateRange(val, domain) {
  console.log('is in date range');

  if (!Object.keys(domain).includes("date", "dow", "holiday")) {
    return false;
  }

  var date_val = new Date(val);
  return date_val >= domain.date[0] && date_val <= domain.date[1] && domain.dow.includes(DOW_LIST[date_val.getDay()]) && (domain.holiday ? (0, _dateUtils.isJapaneseHoliday)(date_val) : true);
}
/**
 * Determines whether a point is within the provided polygon
 *
 * @param point as input search [lat, lng]
 * @param polygon Points must be within these (Multi)Polygon(s)
 * @return {boolean}
 */


function isInPolygon(point, polygon) {
  return (0, _booleanWithin["default"])((0, _helpers.point)(point), polygon);
}

function isValidTimeDomain(domain) {
  return Array.isArray(domain) && domain.every(Number.isFinite);
}

function getTimeWidgetTitleFormatter(domain) {
  if (!isValidTimeDomain(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0]; // Local aware formats
  // https://momentjs.com/docs/#/parsing/string-format

  return diff > durationYear ? 'L' : diff > durationDay ? 'L LT' : 'L LTS';
}

function getTimeWidgetHintFormatter(domain) {
  if (!isValidTimeDomain(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationWeek ? 'L' : diff > durationDay ? 'L LT' : diff > durationHour ? 'LT' : 'LTS';
}
/**
 * Sanity check on filters to prepare for save
 * @type {typeof import('./filter-utils').isValidFilterValue}
 */

/* eslint-disable complexity */


function isValidFilterValue(type, value) {
  if (!type) {
    return false;
  }

  switch (type) {
    case _defaultSettings.FILTER_TYPES.select:
      return value === true || value === false;

    case _defaultSettings.FILTER_TYPES.range:
    case _defaultSettings.FILTER_TYPES.timeRange:
      return Array.isArray(value) && value.every(function (v) {
        return v !== null && !isNaN(v);
      });

    case _defaultSettings.FILTER_TYPES.multiSelect:
      return Array.isArray(value) && Boolean(value.length);

    case _defaultSettings.FILTER_TYPES.input:
      return Boolean(value.length);

    case _defaultSettings.FILTER_TYPES.polygon:
      var coordinates = (0, _lodash["default"])(value, ['geometry', 'coordinates']);
      return Boolean(value && value.id && coordinates);

    default:
      return true;
  }
}
/**
 *
 * @type {typeof import('./filter-utils').getFilterPlot}
 */


function getFilterPlot(filter, dataset) {
  if (filter.plotType === PLOT_TYPES.histogram || !filter.yAxis) {
    // histogram should be calculated when create filter
    return {};
  }

  var _filter$mappedValue = filter.mappedValue,
      mappedValue = _filter$mappedValue === void 0 ? [] : _filter$mappedValue;
  var yAxis = filter.yAxis;
  var fieldIdx = dataset.getColumnFieldIdx(yAxis.name);

  if (fieldIdx < 0) {
    _console.console.warn("yAxis ".concat(yAxis.name, " does not exist in dataset"));

    return {
      lineChart: {},
      yAxis: yAxis
    };
  } // return lineChart


  var series = dataset.dataContainer.map(function (row, rowIndex) {
    return {
      x: mappedValue[rowIndex],
      y: row.valueAt(fieldIdx)
    };
  }, true).filter(function (_ref6) {
    var x = _ref6.x,
        y = _ref6.y;
    return Number.isFinite(x) && Number.isFinite(y);
  }).sort(function (a, b) {
    return (0, _d3Array.ascending)(a.x, b.x);
  });
  var yDomain = (0, _d3Array.extent)(series, function (d) {
    return d.y;
  });
  var xDomain = [series[0].x, series[series.length - 1].x];
  return {
    lineChart: {
      series: series,
      yDomain: yDomain,
      xDomain: xDomain
    },
    yAxis: yAxis
  };
}

function getDefaultFilterPlotType(filter) {
  var filterPlotTypes = SupportedPlotType[filter.type];

  if (!filterPlotTypes) {
    return null;
  }

  if (!filter.yAxis) {
    return filterPlotTypes["default"];
  }

  return filterPlotTypes[filter.yAxis.type] || null;
}
/**
 *
 * @param datasetIds list of dataset ids to be filtered
 * @param datasets all datasets
 * @param filters all filters to be applied to datasets
 * @return datasets - new updated datasets
 * @type {typeof import('./filter-utils').applyFiltersToDatasets}
 */


function applyFiltersToDatasets(datasetIds, datasets, filters, layers) {
  console.log('apply filters to datasets');
  var dataIds = (0, _utils.toArray)(datasetIds);
  return dataIds.reduce(function (acc, dataId) {
    var layersToFilter = (layers || []).filter(function (l) {
      return l.config.dataId === dataId;
    });
    var appliedFilters = filters.filter(function (d) {
      return shouldApplyFilter(d, dataId);
    });
    var table = datasets[dataId];
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, dataId, table.filterTable(appliedFilters, layersToFilter, {})));
  }, datasets);
}
/**
 * Applies a new field name value to fielter and update both filter and dataset
 * @param filter - to be applied the new field name on
 * @param dataset - dataset the field belongs to
 * @param fieldName - field.name
 * @param filterDatasetIndex - field.name
 * @param option
 * @return - {filter, datasets}
 * @type {typeof import('./filter-utils').applyFilterFieldName}
 */


function applyFilterFieldName(filter, dataset, fieldName) {
  var filterDatasetIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var option = arguments.length > 4 ? arguments[4] : undefined;
  // using filterDatasetIndex we can filter only the specified dataset
  var mergeDomain = option && option.hasOwnProperty('mergeDomain') ? option.mergeDomain : false;
  var fieldIndex = dataset.getColumnFieldIdx(fieldName); // if no field with same name is found, move to the next datasets

  if (fieldIndex === -1) {
    // throw new Error(`fieldIndex not found. Dataset must contain a property with name: ${fieldName}`);
    return {
      filter: null,
      dataset: dataset
    };
  } // TODO: validate field type


  var filterProps = dataset.getColumnFilterProps(fieldName);

  var newFilter = _objectSpread(_objectSpread({}, mergeDomain ? mergeFilterDomainStep(filter, filterProps) : _objectSpread(_objectSpread({}, filter), filterProps)), {}, {
    name: Object.assign((0, _toConsumableArray2["default"])((0, _utils.toArray)(filter.name)), (0, _defineProperty2["default"])({}, filterDatasetIndex, fieldName)),
    fieldIdx: Object.assign((0, _toConsumableArray2["default"])((0, _utils.toArray)(filter.fieldIdx)), (0, _defineProperty2["default"])({}, filterDatasetIndex, fieldIndex)),
    // TODO, since we allow to add multiple fields to a filter we can no longer freeze the filter
    freeze: true
  });

  return {
    filter: newFilter,
    dataset: dataset
  };
}
/**
 * Merge one filter with other filter prop domain
 * @type {typeof import('./filter-utils').mergeFilterDomainStep}
 */

/* eslint-disable complexity */


function mergeFilterDomainStep(filter, filterProps) {
  if (!filter) {
    return null;
  }

  if (!filterProps) {
    return filter;
  }

  if (filter.fieldType && filter.fieldType !== filterProps.fieldType || !filterProps.domain) {
    return filter;
  }

  var combinedDomain = !filter.domain ? filterProps.domain : [].concat((0, _toConsumableArray2["default"])(filter.domain || []), (0, _toConsumableArray2["default"])(filterProps.domain || [])).sort(function (a, b) {
    return a - b;
  });

  var newFilter = _objectSpread(_objectSpread(_objectSpread({}, filter), filterProps), {}, {
    domain: [combinedDomain[0], combinedDomain[combinedDomain.length - 1]]
  });

  switch (filterProps.fieldType) {
    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return _objectSpread(_objectSpread({}, newFilter), {}, {
        domain: (0, _dataUtils.unique)(combinedDomain).sort()
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      // @ts-ignore
      var step = filter.step < filterProps.step ? filter.step : filterProps.step;
      return _objectSpread(_objectSpread({}, newFilter), {}, {
        step: step
      });

    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
    default:
      return newFilter;
  }
}
/* eslint-enable complexity */

/**
 * Generates polygon filter
 * @type {typeof import('./filter-utils').featureToFilterValue}
 */


var featureToFilterValue = function featureToFilterValue(feature, filterId) {
  var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread(_objectSpread({}, feature), {}, {
    id: feature.id,
    properties: _objectSpread(_objectSpread(_objectSpread({}, feature.properties), properties), {}, {
      filterId: filterId
    })
  });
};
/**
 * @type {typeof import('./filter-utils').getFilterIdInFeature}
 */


exports.featureToFilterValue = featureToFilterValue;

var getFilterIdInFeature = function getFilterIdInFeature(f) {
  return (0, _lodash["default"])(f, ['properties', 'filterId']);
};
/**
 * Generates polygon filter
 * @type {typeof import('./filter-utils').generatePolygonFilter}
 */


exports.getFilterIdInFeature = getFilterIdInFeature;

function generatePolygonFilter(layers, feature) {
  var dataId = layers.map(function (l) {
    return l.config.dataId;
  }).filter(function (d) {
    return d;
  });
  var layerId = layers.map(function (l) {
    return l.id;
  });
  var name = layers.map(function (l) {
    return l.config.label;
  }); // @ts-ignore

  var filter = getDefaultFilter(dataId);
  return _objectSpread(_objectSpread({}, filter), {}, {
    fixedDomain: true,
    type: _defaultSettings.FILTER_TYPES.polygon,
    name: name,
    layerId: layerId,
    value: featureToFilterValue(feature, filter.id, {
      isVisible: true
    })
  });
}
/**
 * Run filter entirely on CPU
 * @type {typeof import('./filter-utils').filterDatasetCPU}
 */


function filterDatasetCPU(state, dataId) {
  var datasetFilters = state.filters.filter(function (f) {
    return f.dataId.includes(dataId);
  });
  var dataset = state.datasets[dataId];

  if (!dataset) {
    return state;
  }

  var cpuFilteredDataset = dataset.filterTableCPU(datasetFilters, state.layers);
  return (0, _utils.set)(['datasets', dataId], cpuFilteredDataset, state);
}
/**
 * Validate parsed filters with datasets and add filterProps to field
 * @type {typeof import('./filter-utils').validateFiltersUpdateDatasets}
 */


function validateFiltersUpdateDatasets(state) {
  var filtersToValidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var validated = [];
  var failed = [];
  var datasets = state.datasets;
  var updatedDatasets = datasets; // merge filters

  filtersToValidate.forEach(function (filter) {
    // we can only look for datasets define in the filter dataId
    var datasetIds = (0, _utils.toArray)(filter.dataId); // we can merge a filter only if all datasets in filter.dataId are loaded

    if (datasetIds.every(function (d) {
      return datasets[d];
    })) {
      // all datasetIds in filter must be present the state datasets
      var _datasetIds$reduce = datasetIds.reduce(function (acc, datasetId) {
        var dataset = updatedDatasets[datasetId];
        var layers = state.layers.filter(function (l) {
          return l.config.dataId === dataset.id;
        });

        var _validateFilterWithDa = validateFilterWithData(acc.augmentedDatasets[datasetId] || dataset, filter, layers),
            updatedFilter = _validateFilterWithDa.filter,
            updatedDataset = _validateFilterWithDa.dataset;

        if (updatedFilter) {
          return _objectSpread(_objectSpread({}, acc), {}, {
            // merge filter props
            filter: acc.filter ? _objectSpread(_objectSpread({}, acc.filter), mergeFilterDomainStep(acc, updatedFilter)) : updatedFilter,
            applyToDatasets: [].concat((0, _toConsumableArray2["default"])(acc.applyToDatasets), [datasetId]),
            augmentedDatasets: _objectSpread(_objectSpread({}, acc.augmentedDatasets), {}, (0, _defineProperty2["default"])({}, datasetId, updatedDataset))
          });
        }

        return acc;
      }, {
        filter: null,
        applyToDatasets: [],
        augmentedDatasets: {}
      }),
          validatedFilter = _datasetIds$reduce.filter,
          applyToDatasets = _datasetIds$reduce.applyToDatasets,
          augmentedDatasets = _datasetIds$reduce.augmentedDatasets;

      if (validatedFilter && (0, _lodash2["default"])(datasetIds, applyToDatasets)) {
        validated.push(validatedFilter);
        updatedDatasets = _objectSpread(_objectSpread({}, updatedDatasets), augmentedDatasets);
      }
    } else {
      failed.push(filter);
    }
  });
  return {
    validated: validated,
    failed: failed,
    updatedDatasets: updatedDatasets
  };
}
/**
 * Retrieve interval bins for time filter
 * @type {typeof import('./filter-utils').getIntervalBins}
 */


function getIntervalBins(filter) {
  var _filter$plotType;

  var bins = filter.bins;
  var interval = (_filter$plotType = filter.plotType) === null || _filter$plotType === void 0 ? void 0 : _filter$plotType.interval;

  if (!interval || !bins || Object.keys(bins).length === 0) {
    return null;
  }

  var values = Object.values(bins);
  return values[0] ? values[0][interval] : null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiRE9XX0xJU1QiLCJUaW1lc3RhbXBTdGVwTWFwIiwibWF4Iiwic3RlcCIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwiaGlzdG9ncmFtQmlucyIsImVubGFyZ2VkSGlzdG9ncmFtQmlucyIsImR1cmF0aW9uU2Vjb25kIiwiZHVyYXRpb25NaW51dGUiLCJkdXJhdGlvbkhvdXIiLCJkdXJhdGlvbkRheSIsImR1cmF0aW9uV2VlayIsImR1cmF0aW9uWWVhciIsIlBMT1RfVFlQRVMiLCJoaXN0b2dyYW0iLCJsaW5lQ2hhcnQiLCJGSUxURVJfVVBEQVRFUl9QUk9QUyIsImRhdGFJZCIsIm5hbWUiLCJsYXllcklkIiwiTElNSVRFRF9GSUxURVJfRUZGRUNUX1BST1BTIiwiU3VwcG9ydGVkUGxvdFR5cGUiLCJGSUxURVJfVFlQRVMiLCJ0aW1lUmFuZ2UiLCJBTExfRklFTERfVFlQRVMiLCJpbnRlZ2VyIiwicmVhbCIsInJhbmdlIiwiRklMVEVSX0NPTVBPTkVOVFMiLCJzZWxlY3QiLCJtdWx0aVNlbGVjdCIsInBvbHlnb24iLCJkYXRlU2VsZWN0IiwiREVGQVVMVF9GSUxURVJfU1RSVUNUVVJFIiwiZnJlZXplIiwiaWQiLCJmaXhlZERvbWFpbiIsImVubGFyZ2VkIiwiaXNBbmltYXRpbmciLCJhbmltYXRpb25XaW5kb3ciLCJBTklNQVRJT05fV0lORE9XIiwiZnJlZSIsInNwZWVkIiwidHlwZSIsImZpZWxkSWR4IiwiZG9tYWluIiwidmFsdWUiLCJwbG90VHlwZSIsInlBeGlzIiwiaW50ZXJ2YWwiLCJncHUiLCJGSUxURVJfSURfTEVOR1RIIiwiTEFZRVJfRklMVEVSUyIsImdldERlZmF1bHRGaWx0ZXIiLCJzaG91bGRBcHBseUZpbHRlciIsImZpbHRlciIsImRhdGFzZXRJZCIsImRhdGFJZHMiLCJpbmNsdWRlcyIsInZhbGlkYXRlUG9seWdvbkZpbHRlciIsImRhdGFzZXQiLCJsYXllcnMiLCJmYWlsZWQiLCJpc1ZhbGlkRmlsdGVyVmFsdWUiLCJpc1ZhbGlkRGF0YXNldCIsImxheWVyIiwiZmluZCIsImwiLCJmaWx0ZXJWYWxpZGF0b3JzIiwidmFsaWRhdGVGaWx0ZXIiLCJjb25zb2xlIiwibG9nIiwiZmlsdGVyRGF0YUlkIiwiZmlsdGVyRGF0YXNldEluZGV4IiwiaW5kZXhPZiIsImluaXRpYWxpemVGaWx0ZXIiLCJmaWVsZE5hbWUiLCJhcHBseUZpbHRlckZpZWxkTmFtZSIsIm1lcmdlRG9tYWluIiwidXBkYXRlZEZpbHRlciIsInVwZGF0ZWREYXRhc2V0IiwiYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbiIsInZhbGlkYXRlRmlsdGVyWUF4aXMiLCJ2YWxpZGF0ZUZpbHRlcldpdGhEYXRhIiwiaGFzT3duUHJvcGVydHkiLCJmaWVsZHMiLCJtYXRjaGVkQXhpcyIsImdldEZpbHRlclBsb3QiLCJnZXRGaWx0ZXJQcm9wcyIsImZpZWxkIiwiZmllbGREb21haW4iLCJmaWx0ZXJQcm9wcyIsImZpZWxkVHlwZSIsInR5cGVPcHRpb25zIiwic3RyaW5nIiwiZGF0ZSIsImRvdyIsImhvbGlkYXkiLCJ0aW1lc3RhbXAiLCJnZXRGaWVsZERvbWFpbiIsImFsbERhdGEiLCJ0YWJsZUZpZWxkSW5kZXgiLCJpc1RpbWUiLCJ2YWx1ZUFjY2Vzc29yIiwibWF5YmVUb0RhdGUiLCJiaW5kIiwiZm9ybWF0IiwiZ2V0TnVtZXJpY0ZpZWxkRG9tYWluIiwiU2NhbGVVdGlscyIsImdldE9yZGluYWxEb21haW4iLCJtYXAiLCJ4IiwiRGF0ZSIsInNsaWNlIiwiZ2V0VGltZXN0YW1wRmllbGREb21haW4iLCJnZXRQb2x5Z29uRmlsdGVyRnVuY3RvciIsImRhdGFDb250YWluZXIiLCJnZXRQb3NpdGlvbiIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJMQVlFUl9UWVBFUyIsInBvaW50IiwiaWNvbiIsImRhdGEiLCJwb3MiLCJldmVyeSIsImlzRmluaXRlIiwiaXNJblBvbHlnb24iLCJhcmMiLCJsaW5lIiwiaGV4YWdvbklkIiwiZGF0YVRvRmVhdHVyZSIsImNlbnRyb2lkcyIsImNlbnRyb2lkIiwiaW5kZXgiLCJnZXRGaWx0ZXJGdW5jdGlvbiIsImRlZmF1bHRGdW5jIiwiZCIsImlzSW5EYXRlUmFuZ2UiLCJpc0luUmFuZ2UiLCJtYXBwZWRWYWx1ZSIsImFjY2Vzc29yIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwibGF5ZXJGaWx0ZXJGdW5jdGlvbnMiLCJjb25maWciLCJmaWx0ZXJGdW5jIiwidXBkYXRlRmlsdGVyRGF0YUlkIiwiZmlsdGVyRGF0YUJ5RmlsdGVyVHlwZXMiLCJkeW5hbWljRG9tYWluRmlsdGVycyIsImNwdUZpbHRlcnMiLCJmaWx0ZXJGdW5jcyIsInJlc3VsdCIsImZpbHRlcmVkSW5kZXhGb3JEb21haW4iLCJmaWx0ZXJlZEluZGV4IiwiZmlsdGVyQ29udGV4dCIsImZpbHRlckZ1bmNDYWxsZXIiLCJudW1Sb3dzIiwiaSIsIm1hdGNoRm9yRG9tYWluIiwicHVzaCIsIm1hdGNoRm9yUmVuZGVyIiwiZ2V0RmlsdGVyUmVjb3JkIiwiZmlsdGVycyIsIm9wdCIsImZpbHRlclJlY29yZCIsImR5bmFtaWNEb21haW4iLCJjcHUiLCJmb3JFYWNoIiwiZiIsImlnbm9yZURvbWFpbiIsImNwdU9ubHkiLCJkaWZmRmlsdGVycyIsIm9sZEZpbHRlclJlY29yZCIsImZpbHRlckNoYW5nZWQiLCJPYmplY3QiLCJlbnRyaWVzIiwicmVjb3JkIiwiaXRlbXMiLCJvbGRGaWx0ZXIiLCJwcm9wIiwiZmlsdGVyZWRWYWx1ZSIsIm1hcEluZGV4IiwiZ2V0TGluZWFyRG9tYWluIiwiZGlmZiIsImdldE51bWVyaWNTdGVwU2l6ZSIsImZvcm1hdE51bWJlckJ5U3RlcCIsImdldEhpc3RvZ3JhbSIsImVubGFyZ2VkSGlzdG9ncmFtIiwiTWF0aCIsImFicyIsImV4cG9uZW50aWFsRm9ybSIsInRvRXhwb25lbnRpYWwiLCJleHBvbmVudCIsInBhcnNlRmxvYXQiLCJzcGxpdCIsIkRlY2ltYWwiLCJwb3ciLCJ0b051bWJlciIsImRlZmF1bHRUaW1lRm9ybWF0IiwiZ2V0VGltZVdpZGdldFRpdGxlRm9ybWF0dGVyIiwiZW50cnkiLCJoaXN0b2dyYW1Db25zdHJ1Y3QiLCJiaW5zIiwidGhyZXNob2xkcyIsImJpbiIsImNvdW50IiwieDAiLCJ4MSIsInZhbCIsImJvdW5kIiwiZmxvb3IiLCJjZWlsIiwia2V5cyIsImRhdGVfdmFsIiwiZ2V0RGF5IiwiaXNWYWxpZFRpbWVEb21haW4iLCJnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlciIsInYiLCJpc05hTiIsIkJvb2xlYW4iLCJpbnB1dCIsImNvb3JkaW5hdGVzIiwiZ2V0Q29sdW1uRmllbGRJZHgiLCJDb25zb2xlIiwid2FybiIsInNlcmllcyIsInJvdyIsInJvd0luZGV4IiwieSIsInZhbHVlQXQiLCJzb3J0IiwiYSIsImIiLCJ5RG9tYWluIiwieERvbWFpbiIsImdldERlZmF1bHRGaWx0ZXJQbG90VHlwZSIsImZpbHRlclBsb3RUeXBlcyIsImFwcGx5RmlsdGVyc1RvRGF0YXNldHMiLCJkYXRhc2V0SWRzIiwiZGF0YXNldHMiLCJyZWR1Y2UiLCJhY2MiLCJsYXllcnNUb0ZpbHRlciIsImFwcGxpZWRGaWx0ZXJzIiwidGFibGUiLCJmaWx0ZXJUYWJsZSIsIm9wdGlvbiIsImZpZWxkSW5kZXgiLCJnZXRDb2x1bW5GaWx0ZXJQcm9wcyIsIm5ld0ZpbHRlciIsIm1lcmdlRmlsdGVyRG9tYWluU3RlcCIsImFzc2lnbiIsImNvbWJpbmVkRG9tYWluIiwiZmVhdHVyZVRvRmlsdGVyVmFsdWUiLCJmZWF0dXJlIiwiZmlsdGVySWQiLCJwcm9wZXJ0aWVzIiwiZ2V0RmlsdGVySWRJbkZlYXR1cmUiLCJnZW5lcmF0ZVBvbHlnb25GaWx0ZXIiLCJsYWJlbCIsImlzVmlzaWJsZSIsImZpbHRlckRhdGFzZXRDUFUiLCJzdGF0ZSIsImRhdGFzZXRGaWx0ZXJzIiwiY3B1RmlsdGVyZWREYXRhc2V0IiwiZmlsdGVyVGFibGVDUFUiLCJ2YWxpZGF0ZUZpbHRlcnNVcGRhdGVEYXRhc2V0cyIsImZpbHRlcnNUb1ZhbGlkYXRlIiwidmFsaWRhdGVkIiwidXBkYXRlZERhdGFzZXRzIiwiYXVnbWVudGVkRGF0YXNldHMiLCJhcHBseVRvRGF0YXNldHMiLCJ2YWxpZGF0ZWRGaWx0ZXIiLCJnZXRJbnRlcnZhbEJpbnMiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFHTyxJQUFNQSxRQUFRLEdBQUcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixTQUFyQixFQUFnQyxXQUFoQyxFQUE2QyxVQUE3QyxFQUF5RCxRQUF6RCxFQUFtRSxVQUFuRSxDQUFqQixDLENBRVA7O0FBQ0E7O0FBQ0E7OztBQUVPLElBQU1DLGdCQUFnQixHQUFHLENBQzlCO0FBQUNDLEVBQUFBLEdBQUcsRUFBRSxDQUFOO0FBQVNDLEVBQUFBLElBQUksRUFBRTtBQUFmLENBRDhCLEVBRTlCO0FBQUNELEVBQUFBLEdBQUcsRUFBRSxFQUFOO0FBQVVDLEVBQUFBLElBQUksRUFBRTtBQUFoQixDQUY4QixFQUc5QjtBQUFDRCxFQUFBQSxHQUFHLEVBQUUsR0FBTjtBQUFXQyxFQUFBQSxJQUFJLEVBQUU7QUFBakIsQ0FIOEIsRUFJOUI7QUFBQ0QsRUFBQUEsR0FBRyxFQUFFLEdBQU47QUFBV0MsRUFBQUEsSUFBSSxFQUFFO0FBQWpCLENBSjhCLEVBSzlCO0FBQUNELEVBQUFBLEdBQUcsRUFBRSxJQUFOO0FBQVlDLEVBQUFBLElBQUksRUFBRTtBQUFsQixDQUw4QixFQU05QjtBQUFDRCxFQUFBQSxHQUFHLEVBQUUsSUFBTjtBQUFZQyxFQUFBQSxJQUFJLEVBQUU7QUFBbEIsQ0FOOEIsRUFPOUI7QUFBQ0QsRUFBQUEsR0FBRyxFQUFFRSxNQUFNLENBQUNDLGlC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ZUFBZjtBQUNBSCxRQUFBQSxlQUFlLG1DQUNWQSxlQURVLEdBRVZDLGlCQUZVLENBQWY7QUFJRDtBQUNGLEtBaERELE1BZ0RPO0FBQ0xqTixNQUFBQSxNQUFNLENBQUNrRyxJQUFQLENBQVl6RyxNQUFaO0FBQ0Q7QUFDRixHQXhERDtBQTBEQSxTQUFPO0FBQUNzTixJQUFBQSxTQUFTLEVBQVRBLFNBQUQ7QUFBWS9NLElBQUFBLE1BQU0sRUFBTkEsTUFBWjtBQUFvQmdOLElBQUFBLGVBQWUsRUFBZkE7QUFBcEIsR0FBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNJLGVBQVQsQ0FBeUIzTixNQUF6QixFQUFpQztBQUFBOztBQUFBLE1BQy9Cb0osSUFEK0IsR0FDdkJwSixNQUR1QixDQUMvQm9KLElBRCtCO0FBRXRDLE1BQU0xSixRQUFRLHVCQUFHTSxNQUFNLENBQUNSLFFBQVYscURBQUcsaUJBQWlCRSxRQUFsQzs7QUFDQSxNQUFJLENBQUNBLFFBQUQsSUFBYSxDQUFDMEosSUFBZCxJQUFzQjVCLE1BQU0sQ0FBQ3NDLElBQVAsQ0FBWVYsSUFBWixFQUFrQjVELE1BQWxCLEtBQTZCLENBQXZELEVBQTBEO0FBQ3hELFdBQU8sSUFBUDtBQUNEOztBQUNELE1BQU1vSSxNQUFNLEdBQUdwRyxNQUFNLENBQUNvRyxNQUFQLENBQWN4RSxJQUFkLENBQWY7QUFDQSxTQUFPd0UsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZQSxNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVVsTyxRQUFWLENBQVosR0FBa0MsSUFBekM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7YXNjZW5kaW5nLCBleHRlbnQsIGhpc3RvZ3JhbSBhcyBkM0hpc3RvZ3JhbSwgdGlja3N9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAna2V5bWlycm9yJztcbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvY29uc29sZSc7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoLmlzZXF1YWwnO1xuXG5pbXBvcnQgYm9vbGVhbldpdGhpbiBmcm9tICdAdHVyZi9ib29sZWFuLXdpdGhpbic7XG5pbXBvcnQge3BvaW50IGFzIHR1cmZQb2ludH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQge0RlY2ltYWx9IGZyb20gJ2RlY2ltYWwuanMnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIEZJTFRFUl9UWVBFUywgQU5JTUFUSU9OX1dJTkRPV30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtub3ROdWxsb3JVbmRlZmluZWQsIHVuaXF1ZSwgdGltZVRvVW5peE1pbGxpLCBtYXliZVRvRGF0ZX0gZnJvbSAnLi9kYXRhLXV0aWxzJztcbmltcG9ydCAqIGFzIFNjYWxlVXRpbHMgZnJvbSAnLi9kYXRhLXNjYWxlLXV0aWxzJztcbmltcG9ydCB7TEFZRVJfVFlQRVN9IGZyb20gJ2xheWVycy90eXBlcyc7XG5pbXBvcnQge2dlbmVyYXRlSGFzaElkLCBzZXQsIHRvQXJyYXl9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtnZXRDZW50cm9pZCwgaDNJc1ZhbGlkfSBmcm9tICdsYXllcnMvaDMtaGV4YWdvbi1sYXllci9oMy11dGlscyc7XG5pbXBvcnQge2dldERhdGFzZXRGaWVsZEluZGV4Rm9yRmlsdGVyLCBnZXRHcHVGaWx0ZXJQcm9wc30gZnJvbSAnLi9ncHUtZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7aXNKYXBhbmVzZUhvbGlkYXl9IGZyb20gJy4vZGF0ZS11dGlscyc7XG4vLyBpbXBvcnQge0RBVEVfRElDVH0gZnJvbSAnLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5cbmV4cG9ydCBjb25zdCBET1dfTElTVCA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxuXG4vLyBUWVBFXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi90YWJsZS11dGlscy9rZXBsZXItdGFibGUnKS5GaWx0ZXJSZWNvcmR9IEZpbHRlclJlY29yZCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuRmlsdGVyUmVzdWx0fSBGaWx0ZXJSZXN1bHQgKi9cblxuZXhwb3J0IGNvbnN0IFRpbWVzdGFtcFN0ZXBNYXAgPSBbXG4gIHttYXg6IDEsIHN0ZXA6IDAuMDV9LFxuICB7bWF4OiAxMCwgc3RlcDogMC4xfSxcbiAge21heDogMTAwLCBzdGVwOiAxfSxcbiAge21heDogNTAwLCBzdGVwOiA1fSxcbiAge21heDogMTAwMCwgc3RlcDogMTB9LFxuICB7bWF4OiA1MDAwLCBzdGVwOiA1MH0sXG4gIHttYXg6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSwgc3RlcDogMTAwMH1cbl07XG5cbmV4cG9ydCBjb25zdCBoaXN0b2dyYW1CaW5zID0gMzA7XG5leHBvcnQgY29uc3QgZW5sYXJnZWRIaXN0b2dyYW1CaW5zID0gMTAwO1xuXG5jb25zdCBkdXJhdGlvblNlY29uZCA9IDEwMDA7XG5jb25zdCBkdXJhdGlvbk1pbnV0ZSA9IGR1cmF0aW9uU2Vjb25kICogNjA7XG5jb25zdCBkdXJhdGlvbkhvdXIgPSBkdXJhdGlvbk1pbnV0ZSAqIDYwO1xuY29uc3QgZHVyYXRpb25EYXkgPSBkdXJhdGlvbkhvdXIgKiAyNDtcbmNvbnN0IGR1cmF0aW9uV2VlayA9IGR1cmF0aW9uRGF5ICogNztcbmNvbnN0IGR1cmF0aW9uWWVhciA9IGR1cmF0aW9uRGF5ICogMzY1O1xuXG5leHBvcnQgY29uc3QgUExPVF9UWVBFUyA9IGtleU1pcnJvcih7XG4gIGhpc3RvZ3JhbTogbnVsbCxcbiAgbGluZUNoYXJ0OiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9VUERBVEVSX1BST1BTID0ga2V5TWlycm9yKHtcbiAgZGF0YUlkOiBudWxsLFxuICBuYW1lOiBudWxsLFxuICBsYXllcklkOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IExJTUlURURfRklMVEVSX0VGRkVDVF9QUk9QUyA9IGtleU1pcnJvcih7XG4gIFtGSUxURVJfVVBEQVRFUl9QUk9QUy5uYW1lXTogbnVsbFxufSk7XG4vKipcbiAqIE1heCBudW1iZXIgb2YgZmlsdGVyIHZhbHVlIGJ1ZmZlcnMgdGhhdCBkZWNrLmdsIHByb3ZpZGVzXG4gKi9cblxuY29uc3QgU3VwcG9ydGVkUGxvdFR5cGUgPSB7XG4gIFtGSUxURVJfVFlQRVMudGltZVJhbmdlXToge1xuICAgIGRlZmF1bHQ6ICdoaXN0b2dyYW0nLFxuICAgIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06ICdsaW5lQ2hhcnQnLFxuICAgIFtBTExfRklFTERfVFlQRVMucmVhbF06ICdsaW5lQ2hhcnQnXG4gIH0sXG4gIFtGSUxURVJfVFlQRVMucmFuZ2VdOiB7XG4gICAgZGVmYXVsdDogJ2hpc3RvZ3JhbScsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXTogJ2xpbmVDaGFydCcsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXTogJ2xpbmVDaGFydCdcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QT05FTlRTID0ge1xuICBbRklMVEVSX1RZUEVTLnNlbGVjdF06ICdTaW5nbGVTZWxlY3RGaWx0ZXInLFxuICBbRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0XTogJ011bHRpU2VsZWN0RmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy50aW1lUmFuZ2VdOiAnVGltZVJhbmdlRmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5yYW5nZV06ICdSYW5nZUZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMucG9seWdvbl06ICdQb2x5Z29uRmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5kYXRlU2VsZWN0XTonRGF0ZVNlbGVjdEZpbHRlcidcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0ZJTFRFUl9TVFJVQ1RVUkUgPSB7XG4gIGRhdGFJZDogW10sIC8vIFtzdHJpbmddXG4gIGZyZWV6ZTogZmFsc2UsXG4gIGlkOiBudWxsLFxuXG4gIC8vIHRpbWUgcmFuZ2UgZmlsdGVyIHNwZWNpZmljXG4gIGZpeGVkRG9tYWluOiBmYWxzZSxcbiAgZW5sYXJnZWQ6IGZhbHNlLFxuICBpc0FuaW1hdGluZzogZmFsc2UsXG4gIGFuaW1hdGlvbldpbmRvdzogQU5JTUFUSU9OX1dJTkRPVy5mcmVlLFxuICBzcGVlZDogMSxcblxuICAvLyBmaWVsZCBzcGVjaWZpY1xuICBuYW1lOiBbXSwgLy8gc3RyaW5nXG4gIHR5cGU6IG51bGwsXG4gIGZpZWxkSWR4OiBbXSwgLy8gW2ludGVnZXJdXG4gIGRvbWFpbjogbnVsbCxcbiAgdmFsdWU6IG51bGwsXG5cbiAgLy8gcGxvdFxuICBwbG90VHlwZTogUExPVF9UWVBFUy5oaXN0b2dyYW0sXG4gIHlBeGlzOiBudWxsLFxuICBpbnRlcnZhbDogbnVsbCxcblxuICAvLyBtb2RlXG4gIGdwdTogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfSURfTEVOR1RIID0gNDtcblxuZXhwb3J0IGNvbnN0IExBWUVSX0ZJTFRFUlMgPSBbRklMVEVSX1RZUEVTLnBvbHlnb25dO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZpbHRlciB3aXRoIGEgZGF0YXNldCBpZCBhcyBkYXRhSWRcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldERlZmF1bHRGaWx0ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RmlsdGVyKGRhdGFJZCkge1xuICByZXR1cm4ge1xuICAgIC4uLkRFRkFVTFRfRklMVEVSX1NUUlVDVFVSRSxcbiAgICAvLyBzdG9yZSBpdCBhcyBkYXRhSWQgYW5kIGl0IGNvdWxkIGJlIG9uZSBvciBtYW55XG4gICAgZGF0YUlkOiB0b0FycmF5KGRhdGFJZCksXG4gICAgaWQ6IGdlbmVyYXRlSGFzaElkKEZJTFRFUl9JRF9MRU5HVEgpXG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBmaWx0ZXIgaXMgdmFsaWQgYmFzZWQgb24gdGhlIGdpdmVuIGRhdGFJZFxuICogQHBhcmFtICBmaWx0ZXIgdG8gdmFsaWRhdGVcbiAqIEBwYXJhbSAgZGF0YXNldElkIGlkIHRvIHZhbGlkYXRlIGZpbHRlciBhZ2FpbnN0XG4gKiBAcmV0dXJuIHRydWUgaWYgYSBmaWx0ZXIgaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuc2hvdWxkQXBwbHlGaWx0ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRBcHBseUZpbHRlcihmaWx0ZXIsIGRhdGFzZXRJZCkge1xuICBjb25zdCBkYXRhSWRzID0gdG9BcnJheShmaWx0ZXIuZGF0YUlkKTtcbiAgcmV0dXJuIGRhdGFJZHMuaW5jbHVkZXMoZGF0YXNldElkKSAmJiBmaWx0ZXIudmFsdWUgIT09IG51bGw7XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIGFuZCBtb2RpZmllcyBwb2x5Z29uIGZpbHRlciBzdHJ1Y3R1cmVcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcGFyYW0gZmlsdGVyXG4gKiBAcGFyYW0gbGF5ZXJzXG4gKiBAcmV0dXJuIC0ge2ZpbHRlciwgZGF0YXNldH1cbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLnZhbGlkYXRlUG9seWdvbkZpbHRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUG9seWdvbkZpbHRlcihkYXRhc2V0LCBmaWx0ZXIsIGxheWVycykge1xuICBjb25zdCBmYWlsZWQgPSB7ZGF0YXNldCwgZmlsdGVyOiBudWxsfTtcbiAgY29uc3Qge3ZhbHVlLCBsYXllcklkLCB0eXBlLCBkYXRhSWR9ID0gZmlsdGVyO1xuXG4gIGlmICghbGF5ZXJJZCB8fCAhaXNWYWxpZEZpbHRlclZhbHVlKHR5cGUsIHZhbHVlKSkge1xuICAgIHJldHVybiBmYWlsZWQ7XG4gIH1cblxuICBjb25zdCBpc1ZhbGlkRGF0YXNldCA9IGRhdGFJZC5pbmNsdWRlcyhkYXRhc2V0LmlkKTtcblxuICBpZiAoIWlzVmFsaWREYXRhc2V0KSB7XG4gICAgcmV0dXJuIGZhaWxlZDtcbiAgfVxuXG4gIGNvbnN0IGxheWVyID0gbGF5ZXJzLmZpbmQobCA9PiBsYXllcklkLmluY2x1ZGVzKGwuaWQpKTtcblxuICBpZiAoIWxheWVyKSB7XG4gICAgcmV0dXJuIGZhaWxlZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiB7XG4gICAgICAuLi5maWx0ZXIsXG4gICAgICBmcmVlemU6IHRydWUsXG4gICAgICBmaWVsZElkeDogW11cbiAgICB9LFxuICAgIGRhdGFzZXRcbiAgfTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZmlsdGVyIHZhbGlkYXRvcnNcbiAqL1xuY29uc3QgZmlsdGVyVmFsaWRhdG9ycyA9IHtcbiAgW0ZJTFRFUl9UWVBFUy5wb2x5Z29uXTogdmFsaWRhdGVQb2x5Z29uRmlsdGVyXG59O1xuXG4vKipcbiAqIERlZmF1bHQgdmFsaWRhdGUgZmlsdGVyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gZGF0YXNldFxuICogQHBhcmFtIGZpbHRlclxuICogQHJldHVybiAtIHtmaWx0ZXIsIGRhdGFzZXR9XG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS52YWxpZGF0ZUZpbHRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRmlsdGVyKGRhdGFzZXQsIGZpbHRlcikge1xuICAvLyBtYXRjaCBmaWx0ZXIuZGF0YUlkXG4gIGNvbnNvbGUubG9nKCdydW4gdmFsaWRhdGUgZmlsdGVyJylcbiAgY29uc3QgZmFpbGVkID0ge2RhdGFzZXQsIGZpbHRlcjogbnVsbH07XG4gIGNvbnN0IGZpbHRlckRhdGFJZCA9IHRvQXJyYXkoZmlsdGVyLmRhdGFJZCk7XG5cbiAgY29uc3QgZmlsdGVyRGF0YXNldEluZGV4ID0gZmlsdGVyRGF0YUlkLmluZGV4T2YoZGF0YXNldC5pZCk7XG4gIGlmIChmaWx0ZXJEYXRhc2V0SW5kZXggPCAwKSB7XG4gICAgLy8gdGhlIGN1cnJlbnQgZmlsdGVyIGlzIG5vdCBtYXBwZWQgYWdhaW5zdCB0aGUgY3VycmVudCBkYXRhc2V0XG4gICAgcmV0dXJuIGZhaWxlZDtcbiAgfVxuXG4gIGNvbnN0IGluaXRpYWxpemVGaWx0ZXIgPSB7XG4gICAgLi4uZ2V0RGVmYXVsdEZpbHRlcihmaWx0ZXIuZGF0YUlkKSxcbiAgICAuLi5maWx0ZXIsXG4gICAgZGF0YUlkOiBmaWx0ZXJEYXRhSWQsXG4gICAgbmFtZTogdG9BcnJheShmaWx0ZXIubmFtZSlcbiAgfTtcblxuICBjb25zdCBmaWVsZE5hbWUgPSBpbml0aWFsaXplRmlsdGVyLm5hbWVbZmlsdGVyRGF0YXNldEluZGV4XTtcbiAgY29uc3Qge2ZpbHRlcjogdXBkYXRlZEZpbHRlciwgZGF0YXNldDogdXBkYXRlZERhdGFzZXR9ID0gYXBwbHlGaWx0ZXJGaWVsZE5hbWUoXG4gICAgaW5pdGlhbGl6ZUZpbHRlcixcbiAgICBkYXRhc2V0LFxuICAgIGZpZWxkTmFtZSxcbiAgICBmaWx0ZXJEYXRhc2V0SW5kZXgsXG4gICAge21lcmdlRG9tYWluOiB0cnVlfVxuICApO1xuXG4gIGlmICghdXBkYXRlZEZpbHRlcikge1xuICAgIHJldHVybiBmYWlsZWQ7XG4gIH1cblxuICB1cGRhdGVkRmlsdGVyLnZhbHVlID0gYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbihmaWx0ZXIudmFsdWUsIHVwZGF0ZWRGaWx0ZXIpO1xuICB1cGRhdGVkRmlsdGVyLmVubGFyZ2VkID1cbiAgICB0eXBlb2YgZmlsdGVyLmVubGFyZ2VkID09PSAnYm9vbGVhbicgPyBmaWx0ZXIuZW5sYXJnZWQgOiB1cGRhdGVkRmlsdGVyLmVubGFyZ2VkO1xuXG4gIGlmICh1cGRhdGVkRmlsdGVyLnZhbHVlID09PSBudWxsKSB7XG4gICAgLy8gY2Fubm90IGFkanVzdCBzYXZlZCB2YWx1ZSB0byBmaWx0ZXJcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHZhbGlkYXRlRmlsdGVyWUF4aXModXBkYXRlZEZpbHRlciwgdXBkYXRlZERhdGFzZXQpLFxuICAgIGRhdGFzZXQ6IHVwZGF0ZWREYXRhc2V0XG4gIH07XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgZmlsdGVyIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogY2FsY3VsYXRlIGRvbWFpbiBhbmQgZmllbGRJZHggYmFzZWQgbmV3IGZpZWxkcyBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcGFyYW0gZmlsdGVyIC0gZmlsdGVyIHRvIGJlIHZhbGlkYXRlXG4gKiBAcGFyYW0gbGF5ZXJzIC0gbGF5ZXJzXG4gKiBAcmV0dXJuIHZhbGlkYXRlZCBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLnZhbGlkYXRlRmlsdGVyV2l0aERhdGF9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcldpdGhEYXRhKGRhdGFzZXQsIGZpbHRlciwgbGF5ZXJzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIGZpbHRlclZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkoZmlsdGVyLnR5cGUpXG4gICAgPyBmaWx0ZXJWYWxpZGF0b3JzW2ZpbHRlci50eXBlXShkYXRhc2V0LCBmaWx0ZXIsIGxheWVycylcbiAgICA6IHZhbGlkYXRlRmlsdGVyKGRhdGFzZXQsIGZpbHRlcik7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgWUF4aXNcbiAqIEBwYXJhbSBmaWx0ZXJcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcllBeGlzKGZpbHRlciwgZGF0YXNldCkge1xuICAvLyBUT0RPOiB2YWxpZGF0ZSB5QXhpcyBhZ2FpbnN0IG90aGVyIGRhdGFzZXRzXG5cbiAgY29uc3Qge2ZpZWxkc30gPSBkYXRhc2V0O1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuICAvLyBUT0RPOiB2YWxpZGF0ZSB5QXhpcyBhZ2FpbnN0IG90aGVyIGRhdGFzZXRzXG4gIGlmICh5QXhpcykge1xuICAgIGNvbnN0IG1hdGNoZWRBeGlzID0gZmllbGRzLmZpbmQoKHtuYW1lLCB0eXBlfSkgPT4gbmFtZSA9PT0geUF4aXMubmFtZSAmJiB0eXBlID09PSB5QXhpcy50eXBlKTtcblxuICAgIGZpbHRlciA9IG1hdGNoZWRBeGlzXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5maWx0ZXIsXG4gICAgICAgICAgeUF4aXM6IG1hdGNoZWRBeGlzLFxuICAgICAgICAgIC4uLmdldEZpbHRlclBsb3Qoey4uLmZpbHRlciwgeUF4aXM6IG1hdGNoZWRBeGlzfSwgZGF0YXNldClcbiAgICAgICAgfVxuICAgICAgOiBmaWx0ZXI7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyO1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IGZpbHRlciBwcm9wIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0gZmllbGRcbiAqIEBwYXJhbSBmaWVsZERvbWFpblxuICogQHJldHVybnMgZGVmYXVsdCBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEZpbHRlclByb3BzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUHJvcHMoZmllbGQsIGZpZWxkRG9tYWluKSB7XG4gIGNvbnN0IGZpbHRlclByb3BzID0ge1xuICAgIC4uLmZpZWxkRG9tYWluLFxuICAgIGZpZWxkVHlwZTogZmllbGQudHlwZVxuICB9O1xuXG4gIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB2YWx1ZTogZmllbGREb21haW4uZG9tYWluLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMucmFuZ2UsXG4gICAgICAgIHR5cGVPcHRpb25zOiBbRklMVEVSX1RZUEVTLnJhbmdlXSxcbiAgICAgICAgZ3B1OiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMuc2VsZWN0LFxuICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgZ3B1OiBmYWxzZVxuICAgICAgfTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3QsXG4gICAgICAgIHZhbHVlOiBbXSxcbiAgICAgICAgZ3B1OiBmYWxzZVxuICAgICAgfTtcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5kYXRlU2VsZWN0LFxuICAgICAgICB2YWx1ZToge2RhdGU6ZmlsdGVyUHJvcHMuZG9tYWluLmRhdGUsZG93OkRPV19MSVNULGhvbGlkYXk6ZmFsc2V9LFxuICAgICAgICBncHU6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2UsXG4gICAgICAgIGVubGFyZ2VkOiB0cnVlLFxuICAgICAgICBmaXhlZERvbWFpbjogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZpbHRlclByb3BzLmRvbWFpbixcbiAgICAgICAgZ3B1OiB0cnVlXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBmaWVsZCBkb21haW4gYmFzZWQgb24gZmllbGQgdHlwZSBhbmQgZGF0YVxuICpcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEZpZWxkRG9tYWlufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGREb21haW4oYWxsRGF0YSwgZmllbGQpIHtcbiAgY29uc3QgZmllbGRJZHggPSBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxO1xuICBjb25zdCBpc1RpbWUgPSBmaWVsZC50eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wO1xuICBjb25zdCB2YWx1ZUFjY2Vzc29yID0gbWF5YmVUb0RhdGUuYmluZChudWxsLCBpc1RpbWUsIGZpZWxkSWR4LCBmaWVsZC5mb3JtYXQpO1xuICBsZXQgZG9tYWluO1xuICBjb25zb2xlLmxvZygnaGVyZSBnZXQgZG9tYWluJylcbiAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMucmVhbDpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyOlxuICAgICAgLy8gY2FsY3VsYXRlIGRvbWFpbiBhbmQgc3RlcFxuICAgICAgcmV0dXJuIGdldE51bWVyaWNGaWVsZERvbWFpbihhbGxEYXRhLCB2YWx1ZUFjY2Vzc29yKTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW46XG4gICAgICByZXR1cm4ge2RvbWFpbjogW3RydWUsIGZhbHNlXX07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc6XG4gICAgICBkb21haW4gPSBTY2FsZVV0aWxzLmdldE9yZGluYWxEb21haW4oYWxsRGF0YSwgdmFsdWVBY2Nlc3Nvcik7XG4gICAgICByZXR1cm4ge2RvbWFpbn07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgZG9tYWluID0gU2NhbGVVdGlscy5nZXRPcmRpbmFsRG9tYWluKGFsbERhdGEsIHZhbHVlQWNjZXNzb3IpLm1hcCgoeCk9Pm5ldyBEYXRlKHgpKTtcbiAgICAgIHJldHVybiB7ZG9tYWluOntkYXRlOltkb21haW5bMF0sZG9tYWluLnNsaWNlKC0xKVswXV0sZG93OkRPV19MSVNULGhvbGlkYXk6W3RydWUsZmFsc2VdfX07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kb3c6XG4gICAgICByZXR1cm4ge2RvbWFpbjpET1dfTElTVH07XG5cbiAgICAvLyBjYXNlIEFMTF9GSUVMRF9UWVBFUy50aW1lOlxuICAgIC8vICAgcmV0dXJuIHtkb21haW46IFswLDE0NDBdfVxuXG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA6XG4gICAgICByZXR1cm4gZ2V0VGltZXN0YW1wRmllbGREb21haW4oYWxsRGF0YSwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHtkb21haW46IFNjYWxlVXRpbHMuZ2V0T3JkaW5hbERvbWFpbihhbGxEYXRhLCB2YWx1ZUFjY2Vzc29yKX07XG4gIH1cbn1cblxuXG5cblxuZXhwb3J0IGNvbnN0IGdldFBvbHlnb25GaWx0ZXJGdW5jdG9yID0gKGxheWVyLCBmaWx0ZXIsIGRhdGFDb250YWluZXIpID0+IHtcbiAgY29uc3QgZ2V0UG9zaXRpb24gPSBsYXllci5nZXRQb3NpdGlvbkFjY2Vzc29yKGRhdGFDb250YWluZXIpO1xuXG4gIHN3aXRjaCAobGF5ZXIudHlwZSkge1xuICAgIGNhc2UgTEFZRVJfVFlQRVMucG9pbnQ6XG4gICAgY2FzZSBMQVlFUl9UWVBFUy5pY29uOlxuICAgICAgcmV0dXJuIGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbihkYXRhKTtcbiAgICAgICAgcmV0dXJuIHBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpICYmIGlzSW5Qb2x5Z29uKHBvcywgZmlsdGVyLnZhbHVlKTtcbiAgICAgIH07XG4gICAgY2FzZSBMQVlFUl9UWVBFUy5hcmM6XG4gICAgY2FzZSBMQVlFUl9UWVBFUy5saW5lOlxuICAgICAgcmV0dXJuIGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbihkYXRhKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSAmJlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIFtwb3NbMF0sIHBvc1sxXV0sXG4gICAgICAgICAgICBbcG9zWzNdLCBwb3NbNF1dXG4gICAgICAgICAgXS5ldmVyeShwb2ludCA9PiBpc0luUG9seWdvbihwb2ludCwgZmlsdGVyLnZhbHVlKSlcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgY2FzZSBMQVlFUl9UWVBFUy5oZXhhZ29uSWQ6XG4gICAgICBpZiAobGF5ZXIuZGF0YVRvRmVhdHVyZSAmJiBsYXllci5kYXRhVG9GZWF0dXJlLmNlbnRyb2lkcykge1xuICAgICAgICByZXR1cm4gZGF0YSA9PiB7XG4gICAgICAgICAgLy8gbnVsbCBvciBnZXRDZW50cm9pZCh7aWR9KVxuICAgICAgICAgIGNvbnN0IGNlbnRyb2lkID0gbGF5ZXIuZGF0YVRvRmVhdHVyZS5jZW50cm9pZHNbZGF0YS5pbmRleF07XG4gICAgICAgICAgcmV0dXJuIGNlbnRyb2lkICYmIGlzSW5Qb2x5Z29uKGNlbnRyb2lkLCBmaWx0ZXIudmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGdldFBvc2l0aW9uKGRhdGEpO1xuICAgICAgICBpZiAoIWgzSXNWYWxpZChpZCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zID0gZ2V0Q2VudHJvaWQoe2lkfSk7XG4gICAgICAgIHJldHVybiBwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSAmJiBpc0luUG9seWdvbihwb3MsIGZpbHRlci52YWx1ZSk7XG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKCkgPT4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0gZmllbGQgZGF0YXNldCBGaWVsZFxuICogQHBhcmFtIGRhdGFJZCBEYXRhc2V0IGlkXG4gKiBAcGFyYW0gZmlsdGVyIEZpbHRlciBvYmplY3RcbiAqIEBwYXJhbSBsYXllcnMgbGlzdCBvZiBsYXllcnMgdG8gZmlsdGVyIHVwb25cbiAqIEBwYXJhbSBkYXRhQ29udGFpbmVyIERhdGEgY29udGFpbmVyXG4gKiBAcmV0dXJuIGZpbHRlckZ1bmN0aW9uXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5nZXRGaWx0ZXJGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlckZ1bmN0aW9uKGZpZWxkLCBkYXRhSWQsIGZpbHRlciwgbGF5ZXJzLCBkYXRhQ29udGFpbmVyKSB7XG4gIC8vIGZpZWxkIGNvdWxkIGJlIG51bGwgaW4gcG9seWdvbiBmaWx0ZXJcbiAgY29uc3QgdmFsdWVBY2Nlc3NvciA9IGZpZWxkID8gZmllbGQudmFsdWVBY2Nlc3NvciA6IGRhdGEgPT4gbnVsbDtcbiAgY29uc3QgZGVmYXVsdEZ1bmMgPSBkID0+IHRydWU7XG4gIGNvbnNvbGUubG9nKCdmaWx0ZXIgZnVuY3Rpb24gZ2V0IGhlcmUnKVxuICBzd2l0Y2ggKGZpbHRlci50eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMuZGF0ZVNlbGVjdDpcbiAgICAgIHJldHVybiBkYXRhID0+IGlzSW5EYXRlUmFuZ2UodmFsdWVBY2Nlc3NvcihkYXRhKSxmaWx0ZXIudmFsdWUpO1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnJhbmdlOlxuICAgICAgcmV0dXJuIGRhdGEgPT4gaXNJblJhbmdlKHZhbHVlQWNjZXNzb3IoZGF0YSksIGZpbHRlci52YWx1ZSk7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3Q6XG4gICAgICByZXR1cm4gZGF0YSA9PiBmaWx0ZXIudmFsdWUuaW5jbHVkZXModmFsdWVBY2Nlc3NvcihkYXRhKSk7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIGRhdGEgPT4gdmFsdWVBY2Nlc3NvcihkYXRhKSA9PT0gZmlsdGVyLnZhbHVlO1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnRpbWVSYW5nZTpcbiAgICAgIGlmICghZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRGdW5jO1xuICAgICAgfVxuICAgICAgY29uc3QgbWFwcGVkVmFsdWUgPSBnZXQoZmllbGQsIFsnZmlsdGVyUHJvcHMnLCAnbWFwcGVkVmFsdWUnXSk7XG4gICAgICBjb25zdCBhY2Nlc3NvciA9IEFycmF5LmlzQXJyYXkobWFwcGVkVmFsdWUpXG4gICAgICAgID8gZGF0YSA9PiBtYXBwZWRWYWx1ZVtkYXRhLmluZGV4XVxuICAgICAgICA6IGRhdGEgPT4gdGltZVRvVW5peE1pbGxpKHZhbHVlQWNjZXNzb3IoZGF0YSksIGZpZWxkLmZvcm1hdCk7XG4gICAgICByZXR1cm4gZGF0YSA9PiBpc0luUmFuZ2UoYWNjZXNzb3IoZGF0YSksIGZpbHRlci52YWx1ZSk7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMucG9seWdvbjpcbiAgICAgIGlmICghbGF5ZXJzIHx8ICFsYXllcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0RnVuYztcbiAgICAgIH1cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNvbnN0IGxheWVyRmlsdGVyRnVuY3Rpb25zID0gZmlsdGVyLmxheWVySWRcbiAgICAgICAgLm1hcChpZCA9PiBsYXllcnMuZmluZChsID0+IGwuaWQgPT09IGlkKSlcbiAgICAgICAgLmZpbHRlcihsID0+IGwgJiYgbC5jb25maWcuZGF0YUlkID09PSBkYXRhSWQpXG4gICAgICAgIC5tYXAobGF5ZXIgPT4gZ2V0UG9seWdvbkZpbHRlckZ1bmN0b3IobGF5ZXIsIGZpbHRlciwgZGF0YUNvbnRhaW5lcikpO1xuXG4gICAgICByZXR1cm4gZGF0YSA9PiBsYXllckZpbHRlckZ1bmN0aW9ucy5ldmVyeShmaWx0ZXJGdW5jID0+IGZpbHRlckZ1bmMoZGF0YSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZGVmYXVsdEZ1bmM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbHRlckRhdGFJZChkYXRhSWQpIHtcbiAgcmV0dXJuIGdldERlZmF1bHRGaWx0ZXIoZGF0YUlkKTtcbn1cblxuLyoqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5maWx0ZXJEYXRhQnlGaWx0ZXJUeXBlc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckRhdGFCeUZpbHRlclR5cGVzKFxuICB7ZHluYW1pY0RvbWFpbkZpbHRlcnMsIGNwdUZpbHRlcnMsIGZpbHRlckZ1bmNzfSxcbiAgZGF0YUNvbnRhaW5lclxuKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAuLi4oZHluYW1pY0RvbWFpbkZpbHRlcnMgPyB7ZmlsdGVyZWRJbmRleEZvckRvbWFpbjogW119IDoge30pLFxuICAgIC4uLihjcHVGaWx0ZXJzID8ge2ZpbHRlcmVkSW5kZXg6IFtdfSA6IHt9KVxuICB9O1xuXG4gIGNvbnN0IGZpbHRlckNvbnRleHQgPSB7aW5kZXg6IC0xLCBkYXRhQ29udGFpbmVyfTtcbiAgY29uc3QgZmlsdGVyRnVuY0NhbGxlciA9IGZpbHRlciA9PiBmaWx0ZXJGdW5jc1tmaWx0ZXIuaWRdKGZpbHRlckNvbnRleHQpO1xuXG4gIGNvbnN0IG51bVJvd3MgPSBkYXRhQ29udGFpbmVyLm51bVJvd3MoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Sb3dzOyArK2kpIHtcbiAgICBmaWx0ZXJDb250ZXh0LmluZGV4ID0gaTtcblxuICAgIGNvbnN0IG1hdGNoRm9yRG9tYWluID0gZHluYW1pY0RvbWFpbkZpbHRlcnMgJiYgZHluYW1pY0RvbWFpbkZpbHRlcnMuZXZlcnkoZmlsdGVyRnVuY0NhbGxlcik7XG4gICAgaWYgKG1hdGNoRm9yRG9tYWluKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXN1bHQuZmlsdGVyZWRJbmRleEZvckRvbWFpbi5wdXNoKGZpbHRlckNvbnRleHQuaW5kZXgpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoRm9yUmVuZGVyID0gY3B1RmlsdGVycyAmJiBjcHVGaWx0ZXJzLmV2ZXJ5KGZpbHRlckZ1bmNDYWxsZXIpO1xuICAgIGlmIChtYXRjaEZvclJlbmRlcikge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmVzdWx0LmZpbHRlcmVkSW5kZXgucHVzaChmaWx0ZXJDb250ZXh0LmluZGV4KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldCBhIHJlY29yZCBvZiBmaWx0ZXJzIGJhc2VkIG9uIGRvbWFpbiB0eXBlIGFuZCBncHUgLyBjcHVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEZpbHRlclJlY29yZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlclJlY29yZChkYXRhSWQsIGZpbHRlcnMsIG9wdCA9IHt9KSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7RmlsdGVyUmVjb3JkfVxuICAgKi9cbiAgY29uc3QgZmlsdGVyUmVjb3JkID0ge1xuICAgIGR5bmFtaWNEb21haW46IFtdLFxuICAgIGZpeGVkRG9tYWluOiBbXSxcbiAgICBjcHU6IFtdLFxuICAgIGdwdTogW11cbiAgfTtcblxuICBmaWx0ZXJzLmZvckVhY2goZiA9PiB7XG4gICAgaWYgKGlzVmFsaWRGaWx0ZXJWYWx1ZShmLnR5cGUsIGYudmFsdWUpICYmIHRvQXJyYXkoZi5kYXRhSWQpLmluY2x1ZGVzKGRhdGFJZCkpIHtcbiAgICAgIChmLmZpeGVkRG9tYWluIHx8IG9wdC5pZ25vcmVEb21haW5cbiAgICAgICAgPyBmaWx0ZXJSZWNvcmQuZml4ZWREb21haW5cbiAgICAgICAgOiBmaWx0ZXJSZWNvcmQuZHluYW1pY0RvbWFpblxuICAgICAgKS5wdXNoKGYpO1xuXG4gICAgICAoZi5ncHUgJiYgIW9wdC5jcHVPbmx5ID8gZmlsdGVyUmVjb3JkLmdwdSA6IGZpbHRlclJlY29yZC5jcHUpLnB1c2goZik7XG4gICAgfVxuICB9KTtcbiAgY29uc29sZS5sb2coJ3J1biBmaWx0ZXIgcmVjb3JkJylcbiAgcmV0dXJuIGZpbHRlclJlY29yZDtcbn1cblxuLyoqXG4gKiBDb21wYXJlIGZpbHRlciByZWNvcmRzIHRvIGdldCB3aGF0IGhhcyBjaGFuZ2VkXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5kaWZmRmlsdGVyc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZGaWx0ZXJzKGZpbHRlclJlY29yZCwgb2xkRmlsdGVyUmVjb3JkID0ge30pIHtcbiAgbGV0IGZpbHRlckNoYW5nZWQgPSB7fTtcblxuICBjb25zb2xlLmxvZygnZGlmZiBmaWx0ZXJzJylcblxuICBPYmplY3QuZW50cmllcyhmaWx0ZXJSZWNvcmQpLmZvckVhY2goKFtyZWNvcmQsIGl0ZW1zXSkgPT4ge1xuICAgIGl0ZW1zLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgIGNvbnN0IG9sZEZpbHRlciA9IChvbGRGaWx0ZXJSZWNvcmRbcmVjb3JkXSB8fCBbXSkuZmluZChmID0+IGYuaWQgPT09IGZpbHRlci5pZCk7XG5cbiAgICAgIGlmICghb2xkRmlsdGVyKSB7XG4gICAgICAgIC8vIGFkZGVkXG4gICAgICAgIGZpbHRlckNoYW5nZWQgPSBzZXQoW3JlY29yZCwgZmlsdGVyLmlkXSwgJ2FkZGVkJywgZmlsdGVyQ2hhbmdlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjaGVjayAgd2hhdCBoYXMgY2hhbmdlZFxuICAgICAgICBbJ25hbWUnLCAndmFsdWUnLCAnZGF0YUlkJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBpZiAoZmlsdGVyW3Byb3BdICE9PSBvbGRGaWx0ZXJbcHJvcF0pIHtcbiAgICAgICAgICAgIGZpbHRlckNoYW5nZWQgPSBzZXQoW3JlY29yZCwgZmlsdGVyLmlkXSwgYCR7cHJvcH1fY2hhbmdlZGAsIGZpbHRlckNoYW5nZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAob2xkRmlsdGVyUmVjb3JkW3JlY29yZF0gfHwgW10pLmZvckVhY2gob2xkRmlsdGVyID0+IHtcbiAgICAgIC8vIGRlbGV0ZWRcbiAgICAgIGlmICghaXRlbXMuZmluZChmID0+IGYuaWQgPT09IG9sZEZpbHRlci5pZCkpIHtcbiAgICAgICAgZmlsdGVyQ2hhbmdlZCA9IHNldChbcmVjb3JkLCBvbGRGaWx0ZXIuaWRdLCAnZGVsZXRlZCcsIGZpbHRlckNoYW5nZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFmaWx0ZXJDaGFuZ2VkW3JlY29yZF0pIHtcbiAgICAgIGZpbHRlckNoYW5nZWRbcmVjb3JkXSA9IG51bGw7XG4gICAgfVxuICB9KTtcblxuICAvLyBAdHMtaWdub3JlXG4gIHJldHVybiBmaWx0ZXJDaGFuZ2VkO1xufVxuLyoqXG4gKiBDYWxsIGJ5IHBhcnNpbmcgZmlsdGVycyBmcm9tIFVSTFxuICogQ2hlY2sgaWYgdmFsdWUgb2YgZmlsdGVyIHdpdGhpbiBmaWx0ZXIgZG9tYWluLCBpZiBub3QgYWRqdXN0IGl0IHRvIG1hdGNoXG4gKiBmaWx0ZXIgZG9tYWluXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbn1cbiAqIEByZXR1cm5zIHZhbHVlIC0gYWRqdXN0ZWQgdmFsdWUgdG8gbWF0Y2ggZmlsdGVyIG9yIG51bGwgdG8gcmVtb3ZlIGZpbHRlclxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbih2YWx1ZSwge2RvbWFpbiwgdHlwZX0pIHtcbiAgaWYgKCFkb21haW4gfHwgIXR5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc29sZS5sb2coJ2FkanVzdCBWYWx1ZSBkb21haW4nKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMucmFuZ2U6XG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgcmV0dXJuIGRvbWFpbi5tYXAoZCA9PiBkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlLm1hcCgoZCwgaSkgPT4gKG5vdE51bGxvclVuZGVmaW5lZChkKSAmJiBpc0luUmFuZ2UoZCwgZG9tYWluKSA/IGQgOiBkb21haW5baV0pKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUuZmlsdGVyKGQgPT4gZG9tYWluLmluY2x1ZGVzKGQpKTtcbiAgICAgIHJldHVybiBmaWx0ZXJlZFZhbHVlLmxlbmd0aCA/IGZpbHRlcmVkVmFsdWUgOiBbXTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiBkb21haW4uaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiB0cnVlO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLyoqXG4gKiBDYWxjdWxhdGUgbnVtZXJpYyBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5nZXROdW1lcmljRmllbGREb21haW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1lcmljRmllbGREb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcikge1xuICBsZXQgZG9tYWluID0gWzAsIDFdO1xuICBsZXQgc3RlcCA9IDAuMTtcblxuICBjb25zdCBtYXBwZWRWYWx1ZSA9IGRhdGFDb250YWluZXIubWFwSW5kZXgodmFsdWVBY2Nlc3Nvcik7XG5cbiAgaWYgKGRhdGFDb250YWluZXIubnVtUm93cygpID4gMSkge1xuICAgIGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0TGluZWFyRG9tYWluKG1hcHBlZFZhbHVlKTtcbiAgICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuXG4gICAgLy8gaW4gY2FzZSBlcXVhbCBkb21haW4sIFs5NiwgOTZdLCB3aGljaCB3aWxsIGJyZWFrIHF1YW50aXplIHNjYWxlXG4gICAgaWYgKCFkaWZmKSB7XG4gICAgICBkb21haW5bMV0gPSBkb21haW5bMF0gKyAxO1xuICAgIH1cblxuICAgIHN0ZXAgPSBnZXROdW1lcmljU3RlcFNpemUoZGlmZikgfHwgc3RlcDtcbiAgICBkb21haW5bMF0gPSBmb3JtYXROdW1iZXJCeVN0ZXAoZG9tYWluWzBdLCBzdGVwLCAnZmxvb3InKTtcbiAgICBkb21haW5bMV0gPSBmb3JtYXROdW1iZXJCeVN0ZXAoZG9tYWluWzFdLCBzdGVwLCAnY2VpbCcpO1xuICB9XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtkb21haW4sIHN0ZXAsIGhpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBzdGVwIHNpemUgZm9yIHJhbmdlIGFuZCB0aW1lcmFuZ2UgZmlsdGVyXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0TnVtZXJpY1N0ZXBTaXplfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtZXJpY1N0ZXBTaXplKGRpZmYpIHtcbiAgZGlmZiA9IE1hdGguYWJzKGRpZmYpO1xuXG4gIGlmIChkaWZmID4gMTAwKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDMpIHtcbiAgICByZXR1cm4gMC4wMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMSkge1xuICAgIHJldHVybiAwLjAwMTtcbiAgfVxuICAvLyBUcnkgdG8gZ2V0IGF0IGxlYXN0IDEwMDAgc3RlcHMgLSBhbmQga2VlcCB0aGUgc3RlcCBzaXplIGJlbG93IHRoYXQgb2ZcbiAgLy8gdGhlIChkaWZmID4gMSkgY2FzZS5cbiAgY29uc3QgeCA9IGRpZmYgLyAxMDAwO1xuICAvLyBGaW5kIHRoZSBleHBvbmVudCBhbmQgdHJ1bmNhdGUgdG8gMTAgdG8gdGhlIHBvd2VyIG9mIHRoYXQgZXhwb25lbnRcblxuICBjb25zdCBleHBvbmVudGlhbEZvcm0gPSB4LnRvRXhwb25lbnRpYWwoKTtcbiAgY29uc3QgZXhwb25lbnQgPSBwYXJzZUZsb2F0KGV4cG9uZW50aWFsRm9ybS5zcGxpdCgnZScpWzFdKTtcblxuICAvLyBHZXR0aW5nIHJlYWR5IGZvciBub2RlIDEyXG4gIC8vIHRoaXMgaXMgd2h5IHdlIG5lZWQgZGVjaW1hbC5qc1xuICAvLyBNYXRoLnBvdygxMCwgLTUpID0gMC4wMDAwMDk5OTk5OTk5OTk5OTk5OTlcbiAgLy8gdGhlIGFib3ZlIHJlc3VsdCBzaG93cyBpbiBicm93c2VyIGFuZCBub2RlIDEwXG4gIC8vIG5vZGUgMTIgYmVoYXZlcyBjb3JyZWN0bHlcbiAgcmV0dXJuIG5ldyBEZWNpbWFsKDEwKS5wb3coZXhwb25lbnQpLnRvTnVtYmVyKCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRpbWVzdGFtcCBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldFRpbWVzdGFtcEZpZWxkRG9tYWlufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXN0YW1wRmllbGREb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcikge1xuICAvLyB0byBhdm9pZCBjb252ZXJ0aW5nIHN0cmluZyBmb3JtYXQgdGltZSB0byBlcG9jaFxuICAvLyBldmVyeSB0aW1lIHdlIGNvbXBhcmUgd2Ugc3RvcmUgYSB2YWx1ZSBtYXBwZWQgdG8gaW50IGluIGZpbHRlciBkb21haW5cblxuICBjb25zdCBtYXBwZWRWYWx1ZSA9IGRhdGFDb250YWluZXIubWFwSW5kZXgodmFsdWVBY2Nlc3Nvcik7XG4gIGNvbnN0IGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0TGluZWFyRG9tYWluKG1hcHBlZFZhbHVlKTtcbiAgY29uc3QgZGVmYXVsdFRpbWVGb3JtYXQgPSBnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIoZG9tYWluKTtcblxuICBsZXQgc3RlcCA9IDAuMDE7XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgY29uc3QgZW50cnkgPSBUaW1lc3RhbXBTdGVwTWFwLmZpbmQoZiA9PiBmLm1heCA+PSBkaWZmKTtcbiAgaWYgKGVudHJ5KSB7XG4gICAgc3RlcCA9IGVudHJ5LnN0ZXA7XG4gIH1cblxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkb21haW4sXG4gICAgc3RlcCxcbiAgICBtYXBwZWRWYWx1ZSxcbiAgICBoaXN0b2dyYW0sXG4gICAgZW5sYXJnZWRIaXN0b2dyYW0sXG4gICAgZGVmYXVsdFRpbWVGb3JtYXRcbiAgfTtcbn1cblxuLyoqXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuaGlzdG9ncmFtQ29uc3RydWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9ncmFtQ29uc3RydWN0KGRvbWFpbiwgbWFwcGVkVmFsdWUsIGJpbnMpIHtcbiAgcmV0dXJuIGQzSGlzdG9ncmFtKClcbiAgICAudGhyZXNob2xkcyh0aWNrcyhkb21haW5bMF0sIGRvbWFpblsxXSwgYmlucykpXG4gICAgLmRvbWFpbihkb21haW4pKG1hcHBlZFZhbHVlKVxuICAgIC5tYXAoYmluID0+ICh7XG4gICAgICBjb3VudDogYmluLmxlbmd0aCxcbiAgICAgIHgwOiBiaW4ueDAsXG4gICAgICB4MTogYmluLngxXG4gICAgfSkpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgaGlzdG9ncmFtIGZyb20gZG9tYWluIGFuZCBhcnJheSBvZiB2YWx1ZXNcbiAqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5nZXRIaXN0b2dyYW19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSkge1xuICBjb25zdCBoaXN0b2dyYW0gPSBoaXN0b2dyYW1Db25zdHJ1Y3QoZG9tYWluLCBtYXBwZWRWYWx1ZSwgaGlzdG9ncmFtQmlucyk7XG4gIGNvbnN0IGVubGFyZ2VkSGlzdG9ncmFtID0gaGlzdG9ncmFtQ29uc3RydWN0KGRvbWFpbiwgbWFwcGVkVmFsdWUsIGVubGFyZ2VkSGlzdG9ncmFtQmlucyk7XG5cbiAgcmV0dXJuIHtoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuLyoqXG4gKiByb3VuZCBudW1iZXIgYmFzZWQgb24gc3RlcFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHJvdW5kZWQgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXJCeVN0ZXAodmFsLCBzdGVwLCBib3VuZCkge1xuICBpZiAoYm91bmQgPT09ICdmbG9vcicpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKiAoMSAvIHN0ZXApKSAvICgxIC8gc3RlcCk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5jZWlsKHZhbCAqICgxIC8gc3RlcCkpIC8gKDEgLyBzdGVwKTtcbn1cblxuLyoqXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuaXNJblJhbmdlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJblJhbmdlKHZhbCwgZG9tYWluKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHZhbCA+PSBkb21haW5bMF0gJiYgdmFsIDw9IGRvbWFpblsxXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5EYXRlUmFuZ2UodmFsLGRvbWFpbil7XG4gIGNvbnNvbGUubG9nKCdpcyBpbiBkYXRlIHJhbmdlJylcbiAgaWYoIShPYmplY3Qua2V5cyhkb21haW4pLmluY2x1ZGVzKFwiZGF0ZVwiLFwiZG93XCIsXCJob2xpZGF5XCIpKSl7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgZGF0ZV92YWwgPSBuZXcgRGF0ZSh2YWwpXG4gIHJldHVybiAoZGF0ZV92YWwgPj0gZG9tYWluLmRhdGVbMF0gJiYgZGF0ZV92YWwgPD0gZG9tYWluLmRhdGVbMV0pICYmIChkb21haW4uZG93LmluY2x1ZGVzKERPV19MSVNUW2RhdGVfdmFsLmdldERheSgpXSkpICYmIChkb21haW4uaG9saWRheT9pc0phcGFuZXNlSG9saWRheShkYXRlX3ZhbCk6dHJ1ZSlcblxufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHBvaW50IGlzIHdpdGhpbiB0aGUgcHJvdmlkZWQgcG9seWdvblxuICpcbiAqIEBwYXJhbSBwb2ludCBhcyBpbnB1dCBzZWFyY2ggW2xhdCwgbG5nXVxuICogQHBhcmFtIHBvbHlnb24gUG9pbnRzIG11c3QgYmUgd2l0aGluIHRoZXNlIChNdWx0aSlQb2x5Z29uKHMpXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJblBvbHlnb24ocG9pbnQsIHBvbHlnb24pIHtcbiAgcmV0dXJuIGJvb2xlYW5XaXRoaW4odHVyZlBvaW50KHBvaW50KSwgcG9seWdvbik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFRpbWVEb21haW4oZG9tYWluKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGRvbWFpbikgJiYgZG9tYWluLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVdpZGdldFRpdGxlRm9ybWF0dGVyKGRvbWFpbikge1xuICBpZiAoIWlzVmFsaWRUaW1lRG9tYWluKGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG5cbiAgLy8gTG9jYWwgYXdhcmUgZm9ybWF0c1xuICAvLyBodHRwczovL21vbWVudGpzLmNvbS9kb2NzLyMvcGFyc2luZy9zdHJpbmctZm9ybWF0XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25ZZWFyID8gJ0wnIDogZGlmZiA+IGR1cmF0aW9uRGF5ID8gJ0wgTFQnIDogJ0wgTFRTJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyKGRvbWFpbikge1xuICBpZiAoIWlzVmFsaWRUaW1lRG9tYWluKGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25XZWVrXG4gICAgPyAnTCdcbiAgICA6IGRpZmYgPiBkdXJhdGlvbkRheVxuICAgID8gJ0wgTFQnXG4gICAgOiBkaWZmID4gZHVyYXRpb25Ib3VyXG4gICAgPyAnTFQnXG4gICAgOiAnTFRTJztcbn1cblxuLyoqXG4gKiBTYW5pdHkgY2hlY2sgb24gZmlsdGVycyB0byBwcmVwYXJlIGZvciBzYXZlXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5pc1ZhbGlkRmlsdGVyVmFsdWV9XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRmlsdGVyVmFsdWUodHlwZSwgdmFsdWUpIHtcbiAgaWYgKCF0eXBlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5yYW5nZTpcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy50aW1lUmFuZ2U6XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkodiA9PiB2ICE9PSBudWxsICYmICFpc05hTih2KSk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdDpcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiBCb29sZWFuKHZhbHVlLmxlbmd0aCk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5pbnB1dDpcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlLmxlbmd0aCk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5wb2x5Z29uOlxuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXQodmFsdWUsIFsnZ2VvbWV0cnknLCAnY29vcmRpbmF0ZXMnXSk7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSAmJiB2YWx1ZS5pZCAmJiBjb29yZGluYXRlcyk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0RmlsdGVyUGxvdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlclBsb3QoZmlsdGVyLCBkYXRhc2V0KSB7XG4gIGlmIChmaWx0ZXIucGxvdFR5cGUgPT09IFBMT1RfVFlQRVMuaGlzdG9ncmFtIHx8ICFmaWx0ZXIueUF4aXMpIHtcbiAgICAvLyBoaXN0b2dyYW0gc2hvdWxkIGJlIGNhbGN1bGF0ZWQgd2hlbiBjcmVhdGUgZmlsdGVyXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3Qge21hcHBlZFZhbHVlID0gW119ID0gZmlsdGVyO1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuICBjb25zdCBmaWVsZElkeCA9IGRhdGFzZXQuZ2V0Q29sdW1uRmllbGRJZHgoeUF4aXMubmFtZSk7XG4gIGlmIChmaWVsZElkeCA8IDApIHtcbiAgICBDb25zb2xlLndhcm4oYHlBeGlzICR7eUF4aXMubmFtZX0gZG9lcyBub3QgZXhpc3QgaW4gZGF0YXNldGApO1xuICAgIHJldHVybiB7bGluZUNoYXJ0OiB7fSwgeUF4aXN9O1xuICB9XG5cbiAgLy8gcmV0dXJuIGxpbmVDaGFydFxuICBjb25zdCBzZXJpZXMgPSBkYXRhc2V0LmRhdGFDb250YWluZXJcbiAgICAubWFwKFxuICAgICAgKHJvdywgcm93SW5kZXgpID0+ICh7XG4gICAgICAgIHg6IG1hcHBlZFZhbHVlW3Jvd0luZGV4XSxcbiAgICAgICAgeTogcm93LnZhbHVlQXQoZmllbGRJZHgpXG4gICAgICB9KSxcbiAgICAgIHRydWVcbiAgICApXG4gICAgLmZpbHRlcigoe3gsIHl9KSA9PiBOdW1iZXIuaXNGaW5pdGUoeCkgJiYgTnVtYmVyLmlzRmluaXRlKHkpKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhc2NlbmRpbmcoYS54LCBiLngpKTtcblxuICBjb25zdCB5RG9tYWluID0gZXh0ZW50KHNlcmllcywgZCA9PiBkLnkpO1xuICBjb25zdCB4RG9tYWluID0gW3Nlcmllc1swXS54LCBzZXJpZXNbc2VyaWVzLmxlbmd0aCAtIDFdLnhdO1xuXG4gIHJldHVybiB7bGluZUNoYXJ0OiB7c2VyaWVzLCB5RG9tYWluLCB4RG9tYWlufSwgeUF4aXN9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlKGZpbHRlcikge1xuICBjb25zdCBmaWx0ZXJQbG90VHlwZXMgPSBTdXBwb3J0ZWRQbG90VHlwZVtmaWx0ZXIudHlwZV07XG4gIGlmICghZmlsdGVyUGxvdFR5cGVzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoIWZpbHRlci55QXhpcykge1xuICAgIHJldHVybiBmaWx0ZXJQbG90VHlwZXMuZGVmYXVsdDtcbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJQbG90VHlwZXNbZmlsdGVyLnlBeGlzLnR5cGVdIHx8IG51bGw7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBkYXRhc2V0SWRzIGxpc3Qgb2YgZGF0YXNldCBpZHMgdG8gYmUgZmlsdGVyZWRcbiAqIEBwYXJhbSBkYXRhc2V0cyBhbGwgZGF0YXNldHNcbiAqIEBwYXJhbSBmaWx0ZXJzIGFsbCBmaWx0ZXJzIHRvIGJlIGFwcGxpZWQgdG8gZGF0YXNldHNcbiAqIEByZXR1cm4gZGF0YXNldHMgLSBuZXcgdXBkYXRlZCBkYXRhc2V0c1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuYXBwbHlGaWx0ZXJzVG9EYXRhc2V0c31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RmlsdGVyc1RvRGF0YXNldHMoZGF0YXNldElkcywgZGF0YXNldHMsIGZpbHRlcnMsIGxheWVycykge1xuICBjb25zb2xlLmxvZygnYXBwbHkgZmlsdGVycyB0byBkYXRhc2V0cycpXG4gIGNvbnN0IGRhdGFJZHMgPSB0b0FycmF5KGRhdGFzZXRJZHMpO1xuICByZXR1cm4gZGF0YUlkcy5yZWR1Y2UoKGFjYywgZGF0YUlkKSA9PiB7XG4gICAgY29uc3QgbGF5ZXJzVG9GaWx0ZXIgPSAobGF5ZXJzIHx8IFtdKS5maWx0ZXIobCA9PiBsLmNvbmZpZy5kYXRhSWQgPT09IGRhdGFJZCk7XG4gICAgY29uc3QgYXBwbGllZEZpbHRlcnMgPSBmaWx0ZXJzLmZpbHRlcihkID0+IHNob3VsZEFwcGx5RmlsdGVyKGQsIGRhdGFJZCkpO1xuICAgIGNvbnN0IHRhYmxlID0gZGF0YXNldHNbZGF0YUlkXTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5hY2MsXG4gICAgICBbZGF0YUlkXTogdGFibGUuZmlsdGVyVGFibGUoYXBwbGllZEZpbHRlcnMsIGxheWVyc1RvRmlsdGVyLCB7fSlcbiAgICB9O1xuICB9LCBkYXRhc2V0cyk7XG59XG5cbi8qKlxuICogQXBwbGllcyBhIG5ldyBmaWVsZCBuYW1lIHZhbHVlIHRvIGZpZWx0ZXIgYW5kIHVwZGF0ZSBib3RoIGZpbHRlciBhbmQgZGF0YXNldFxuICogQHBhcmFtIGZpbHRlciAtIHRvIGJlIGFwcGxpZWQgdGhlIG5ldyBmaWVsZCBuYW1lIG9uXG4gKiBAcGFyYW0gZGF0YXNldCAtIGRhdGFzZXQgdGhlIGZpZWxkIGJlbG9uZ3MgdG9cbiAqIEBwYXJhbSBmaWVsZE5hbWUgLSBmaWVsZC5uYW1lXG4gKiBAcGFyYW0gZmlsdGVyRGF0YXNldEluZGV4IC0gZmllbGQubmFtZVxuICogQHBhcmFtIG9wdGlvblxuICogQHJldHVybiAtIHtmaWx0ZXIsIGRhdGFzZXRzfVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuYXBwbHlGaWx0ZXJGaWVsZE5hbWV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUZpbHRlckZpZWxkTmFtZShmaWx0ZXIsIGRhdGFzZXQsIGZpZWxkTmFtZSwgZmlsdGVyRGF0YXNldEluZGV4ID0gMCwgb3B0aW9uKSB7XG4gIC8vIHVzaW5nIGZpbHRlckRhdGFzZXRJbmRleCB3ZSBjYW4gZmlsdGVyIG9ubHkgdGhlIHNwZWNpZmllZCBkYXRhc2V0XG4gIGNvbnN0IG1lcmdlRG9tYWluID0gb3B0aW9uICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbWVyZ2VEb21haW4nKSA/IG9wdGlvbi5tZXJnZURvbWFpbiA6IGZhbHNlO1xuXG4gIGNvbnN0IGZpZWxkSW5kZXggPSBkYXRhc2V0LmdldENvbHVtbkZpZWxkSWR4KGZpZWxkTmFtZSk7XG4gIC8vIGlmIG5vIGZpZWxkIHdpdGggc2FtZSBuYW1lIGlzIGZvdW5kLCBtb3ZlIHRvIHRoZSBuZXh0IGRhdGFzZXRzXG4gIGlmIChmaWVsZEluZGV4ID09PSAtMSkge1xuICAgIC8vIHRocm93IG5ldyBFcnJvcihgZmllbGRJbmRleCBub3QgZm91bmQuIERhdGFzZXQgbXVzdCBjb250YWluIGEgcHJvcGVydHkgd2l0aCBuYW1lOiAke2ZpZWxkTmFtZX1gKTtcbiAgICByZXR1cm4ge2ZpbHRlcjogbnVsbCwgZGF0YXNldH07XG4gIH1cblxuICAvLyBUT0RPOiB2YWxpZGF0ZSBmaWVsZCB0eXBlXG4gIGNvbnN0IGZpbHRlclByb3BzID0gZGF0YXNldC5nZXRDb2x1bW5GaWx0ZXJQcm9wcyhmaWVsZE5hbWUpO1xuXG4gIGNvbnN0IG5ld0ZpbHRlciA9IHtcbiAgICAuLi4obWVyZ2VEb21haW4gPyBtZXJnZUZpbHRlckRvbWFpblN0ZXAoZmlsdGVyLCBmaWx0ZXJQcm9wcykgOiB7Li4uZmlsdGVyLCAuLi5maWx0ZXJQcm9wc30pLFxuICAgIG5hbWU6IE9iamVjdC5hc3NpZ24oWy4uLnRvQXJyYXkoZmlsdGVyLm5hbWUpXSwge1tmaWx0ZXJEYXRhc2V0SW5kZXhdOiBmaWVsZE5hbWV9KSxcbiAgICBmaWVsZElkeDogT2JqZWN0LmFzc2lnbihbLi4udG9BcnJheShmaWx0ZXIuZmllbGRJZHgpXSwge1xuICAgICAgW2ZpbHRlckRhdGFzZXRJbmRleF06IGZpZWxkSW5kZXhcbiAgICB9KSxcbiAgICAvLyBUT0RPLCBzaW5jZSB3ZSBhbGxvdyB0byBhZGQgbXVsdGlwbGUgZmllbGRzIHRvIGEgZmlsdGVyIHdlIGNhbiBubyBsb25nZXIgZnJlZXplIHRoZSBmaWx0ZXJcbiAgICBmcmVlemU6IHRydWVcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogbmV3RmlsdGVyLFxuICAgIGRhdGFzZXRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBvbmUgZmlsdGVyIHdpdGggb3RoZXIgZmlsdGVyIHByb3AgZG9tYWluXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5tZXJnZUZpbHRlckRvbWFpblN0ZXB9XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUZpbHRlckRvbWFpblN0ZXAoZmlsdGVyLCBmaWx0ZXJQcm9wcykge1xuICBpZiAoIWZpbHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKCFmaWx0ZXJQcm9wcykge1xuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBpZiAoKGZpbHRlci5maWVsZFR5cGUgJiYgZmlsdGVyLmZpZWxkVHlwZSAhPT0gZmlsdGVyUHJvcHMuZmllbGRUeXBlKSB8fCAhZmlsdGVyUHJvcHMuZG9tYWluKSB7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIGNvbnN0IGNvbWJpbmVkRG9tYWluID0gIWZpbHRlci5kb21haW5cbiAgICA/IGZpbHRlclByb3BzLmRvbWFpblxuICAgIDogWy4uLihmaWx0ZXIuZG9tYWluIHx8IFtdKSwgLi4uKGZpbHRlclByb3BzLmRvbWFpbiB8fCBbXSldLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcblxuICBjb25zdCBuZXdGaWx0ZXIgPSB7XG4gICAgLi4uZmlsdGVyLFxuICAgIC4uLmZpbHRlclByb3BzLFxuICAgIGRvbWFpbjogW2NvbWJpbmVkRG9tYWluWzBdLCBjb21iaW5lZERvbWFpbltjb21iaW5lZERvbWFpbi5sZW5ndGggLSAxXV1cbiAgfTtcblxuICBzd2l0Y2ggKGZpbHRlclByb3BzLmZpZWxkVHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICBkb21haW46IHVuaXF1ZShjb21iaW5lZERvbWFpbikuc29ydCgpXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3Qgc3RlcCA9IGZpbHRlci5zdGVwIDwgZmlsdGVyUHJvcHMuc3RlcCA/IGZpbHRlci5zdGVwIDogZmlsdGVyUHJvcHMuc3RlcDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICBzdGVwXG4gICAgICB9O1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5ld0ZpbHRlcjtcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbi8qKlxuICogR2VuZXJhdGVzIHBvbHlnb24gZmlsdGVyXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5mZWF0dXJlVG9GaWx0ZXJWYWx1ZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZlYXR1cmVUb0ZpbHRlclZhbHVlID0gKGZlYXR1cmUsIGZpbHRlcklkLCBwcm9wZXJ0aWVzID0ge30pID0+ICh7XG4gIC4uLmZlYXR1cmUsXG4gIGlkOiBmZWF0dXJlLmlkLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgLi4uZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgIC4uLnByb3BlcnRpZXMsXG4gICAgZmlsdGVySWRcbiAgfVxufSk7XG5cbi8qKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZmlsdGVyLXV0aWxzJykuZ2V0RmlsdGVySWRJbkZlYXR1cmV9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJJZEluRmVhdHVyZSA9IGYgPT4gZ2V0KGYsIFsncHJvcGVydGllcycsICdmaWx0ZXJJZCddKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcG9seWdvbiBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdlbmVyYXRlUG9seWdvbkZpbHRlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUG9seWdvbkZpbHRlcihsYXllcnMsIGZlYXR1cmUpIHtcbiAgY29uc3QgZGF0YUlkID0gbGF5ZXJzLm1hcChsID0+IGwuY29uZmlnLmRhdGFJZCkuZmlsdGVyKGQgPT4gZCk7XG4gIGNvbnN0IGxheWVySWQgPSBsYXllcnMubWFwKGwgPT4gbC5pZCk7XG4gIGNvbnN0IG5hbWUgPSBsYXllcnMubWFwKGwgPT4gbC5jb25maWcubGFiZWwpO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGZpbHRlciA9IGdldERlZmF1bHRGaWx0ZXIoZGF0YUlkKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5maWx0ZXIsXG4gICAgZml4ZWREb21haW46IHRydWUsXG4gICAgdHlwZTogRklMVEVSX1RZUEVTLnBvbHlnb24sXG4gICAgbmFtZSxcbiAgICBsYXllcklkLFxuICAgIHZhbHVlOiBmZWF0dXJlVG9GaWx0ZXJWYWx1ZShmZWF0dXJlLCBmaWx0ZXIuaWQsIHtpc1Zpc2libGU6IHRydWV9KVxuICB9O1xufVxuXG4vKipcbiAqIFJ1biBmaWx0ZXIgZW50aXJlbHkgb24gQ1BVXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9maWx0ZXItdXRpbHMnKS5maWx0ZXJEYXRhc2V0Q1BVfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRGF0YXNldENQVShzdGF0ZSwgZGF0YUlkKSB7XG4gIGNvbnN0IGRhdGFzZXRGaWx0ZXJzID0gc3RhdGUuZmlsdGVycy5maWx0ZXIoZiA9PiBmLmRhdGFJZC5pbmNsdWRlcyhkYXRhSWQpKTtcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW2RhdGFJZF07XG5cbiAgaWYgKCFkYXRhc2V0KSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgY3B1RmlsdGVyZWREYXRhc2V0ID0gZGF0YXNldC5maWx0ZXJUYWJsZUNQVShkYXRhc2V0RmlsdGVycywgc3RhdGUubGF5ZXJzKTtcblxuICByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWRdLCBjcHVGaWx0ZXJlZERhdGFzZXQsIHN0YXRlKTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBwYXJzZWQgZmlsdGVycyB3aXRoIGRhdGFzZXRzIGFuZCBhZGQgZmlsdGVyUHJvcHMgdG8gZmllbGRcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLnZhbGlkYXRlRmlsdGVyc1VwZGF0ZURhdGFzZXRzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGaWx0ZXJzVXBkYXRlRGF0YXNldHMoc3RhdGUsIGZpbHRlcnNUb1ZhbGlkYXRlID0gW10pIHtcbiAgY29uc3QgdmFsaWRhdGVkID0gW107XG4gIGNvbnN0IGZhaWxlZCA9IFtdO1xuICBjb25zdCB7ZGF0YXNldHN9ID0gc3RhdGU7XG4gIGxldCB1cGRhdGVkRGF0YXNldHMgPSBkYXRhc2V0cztcblxuICAvLyBtZXJnZSBmaWx0ZXJzXG4gIGZpbHRlcnNUb1ZhbGlkYXRlLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAvLyB3ZSBjYW4gb25seSBsb29rIGZvciBkYXRhc2V0cyBkZWZpbmUgaW4gdGhlIGZpbHRlciBkYXRhSWRcbiAgICBjb25zdCBkYXRhc2V0SWRzID0gdG9BcnJheShmaWx0ZXIuZGF0YUlkKTtcblxuICAgIC8vIHdlIGNhbiBtZXJnZSBhIGZpbHRlciBvbmx5IGlmIGFsbCBkYXRhc2V0cyBpbiBmaWx0ZXIuZGF0YUlkIGFyZSBsb2FkZWRcbiAgICBpZiAoZGF0YXNldElkcy5ldmVyeShkID0+IGRhdGFzZXRzW2RdKSkge1xuICAgICAgLy8gYWxsIGRhdGFzZXRJZHMgaW4gZmlsdGVyIG11c3QgYmUgcHJlc2VudCB0aGUgc3RhdGUgZGF0YXNldHNcbiAgICAgIGNvbnN0IHtmaWx0ZXI6IHZhbGlkYXRlZEZpbHRlciwgYXBwbHlUb0RhdGFzZXRzLCBhdWdtZW50ZWREYXRhc2V0c30gPSBkYXRhc2V0SWRzLnJlZHVjZShcbiAgICAgICAgKGFjYywgZGF0YXNldElkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YXNldCA9IHVwZGF0ZWREYXRhc2V0c1tkYXRhc2V0SWRdO1xuICAgICAgICAgIGNvbnN0IGxheWVycyA9IHN0YXRlLmxheWVycy5maWx0ZXIobCA9PiBsLmNvbmZpZy5kYXRhSWQgPT09IGRhdGFzZXQuaWQpO1xuICAgICAgICAgIGNvbnN0IHtmaWx0ZXI6IHVwZGF0ZWRGaWx0ZXIsIGRhdGFzZXQ6IHVwZGF0ZWREYXRhc2V0fSA9IHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoXG4gICAgICAgICAgICBhY2MuYXVnbWVudGVkRGF0YXNldHNbZGF0YXNldElkXSB8fCBkYXRhc2V0LFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgbGF5ZXJzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmICh1cGRhdGVkRmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICAgIC8vIG1lcmdlIGZpbHRlciBwcm9wc1xuICAgICAgICAgICAgICBmaWx0ZXI6IGFjYy5maWx0ZXJcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWNjLmZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgLi4ubWVyZ2VGaWx0ZXJEb21haW5TdGVwKGFjYywgdXBkYXRlZEZpbHRlcilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHVwZGF0ZWRGaWx0ZXIsXG5cbiAgICAgICAgICAgICAgYXBwbHlUb0RhdGFzZXRzOiBbLi4uYWNjLmFwcGx5VG9EYXRhc2V0cywgZGF0YXNldElkXSxcblxuICAgICAgICAgICAgICBhdWdtZW50ZWREYXRhc2V0czoge1xuICAgICAgICAgICAgICAgIC4uLmFjYy5hdWdtZW50ZWREYXRhc2V0cyxcbiAgICAgICAgICAgICAgICBbZGF0YXNldElkXTogdXBkYXRlZERhdGFzZXRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmlsdGVyOiBudWxsLFxuICAgICAgICAgIGFwcGx5VG9EYXRhc2V0czogW10sXG4gICAgICAgICAgYXVnbWVudGVkRGF0YXNldHM6IHt9XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGlmICh2YWxpZGF0ZWRGaWx0ZXIgJiYgaXNFcXVhbChkYXRhc2V0SWRzLCBhcHBseVRvRGF0YXNldHMpKSB7XG4gICAgICAgIHZhbGlkYXRlZC5wdXNoKHZhbGlkYXRlZEZpbHRlcik7XG4gICAgICAgIHVwZGF0ZWREYXRhc2V0cyA9IHtcbiAgICAgICAgICAuLi51cGRhdGVkRGF0YXNldHMsXG4gICAgICAgICAgLi4uYXVnbWVudGVkRGF0YXNldHNcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbGVkLnB1c2goZmlsdGVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7dmFsaWRhdGVkLCBmYWlsZWQsIHVwZGF0ZWREYXRhc2V0c307XG59XG5cbi8qKlxuICogUmV0cmlldmUgaW50ZXJ2YWwgYmlucyBmb3IgdGltZSBmaWx0ZXJcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2ZpbHRlci11dGlscycpLmdldEludGVydmFsQmluc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVydmFsQmlucyhmaWx0ZXIpIHtcbiAgY29uc3Qge2JpbnN9ID0gZmlsdGVyO1xuICBjb25zdCBpbnRlcnZhbCA9IGZpbHRlci5wbG90VHlwZT8uaW50ZXJ2YWw7XG4gIGlmICghaW50ZXJ2YWwgfHwgIWJpbnMgfHwgT2JqZWN0LmtleXMoYmlucykubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhiaW5zKTtcbiAgcmV0dXJuIHZhbHVlc1swXSA/IHZhbHVlc1swXVtpbnRlcnZhbF0gOiBudWxsO1xufVxuIl19