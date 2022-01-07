"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewDatasetColor = getNewDatasetColor;
exports.createNewDataEntry = createNewDataEntry;
exports.findDefaultColorField = findDefaultColorField;
exports.sortDatasetByColumn = sortDatasetByColumn;
exports.datasetColorMaker = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _colorUtils = require("./color-utils");

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _defaultSettings = require("../constants/default-settings");

var _dataProcessor = require("../processors/data-processor");

var _d3Array = require("d3-array");

var _keplerTable = _interopRequireDefault(require("./table-utils/kepler-table"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(generateColor);

// apply a color for each dataset
// to use as label colors
var datasetColors = ['#8F2FBF', '#005CFF', '#C06C84', '#F8B195', '#547A82', '#3EACA8', '#A2D4AB'].map(_colorUtils.hexToRgb);
/**
 * Random color generator
 * @return {Generator<import('reducers/types').RGBColor>}
 */

function generateColor() {
  var index;
  return _regenerator["default"].wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < datasetColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === datasetColors.length) {
            index = 0;
          }

          _context.next = 5;
          return datasetColors[index++];

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

var datasetColorMaker = generateColor();
/** @type {typeof import('./dataset-utils').getNewDatasetColor} */

exports.datasetColorMaker = datasetColorMaker;

function getNewDatasetColor(datasets) {
  var presetColors = datasetColors.map(String);
  var usedColors = (0, _lodash["default"])(Object.values(datasets).map(function (d) {
    return String(d.color);
  })).filter(function (c) {
    return presetColors.includes(c);
  });

  if (usedColors.length === presetColors.length) {
    // if we already depleted the pool of color
    return datasetColorMaker.next().value;
  }

  var color = datasetColorMaker.next().value;

  while (usedColors.includes(String(color))) {
    color = datasetColorMaker.next().value;
  }

  return color;
}
/**
 * Take datasets payload from addDataToMap, create datasets entry save to visState
 * @type {typeof import('./dataset-utils').createNewDataEntry}
 */


function createNewDataEntry(_ref) {
  var info = _ref.info,
      data = _ref.data,
      metadata = _ref.metadata;
  var datasets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validatedData = (0, _dataProcessor.validateInputData)(data);

  if (!validatedData) {
    return {};
  }

  info = info || {};
  var color = info.color || getNewDatasetColor(datasets);
  var keplerTable = new _keplerTable["default"]({
    info: info,
    data: validatedData,
    color: color,
    metadata: metadata
  });
  return (0, _defineProperty2["default"])({}, keplerTable.id, keplerTable);
}
/**
 * Field name prefixes and suffixes which should not be considered
 * as metrics. Fields will still be included if a 'metric word'
 * is found on the field name, however.
 */


var EXCLUDED_DEFAULT_FIELDS = [// Serial numbers and identification numbers
'_id', 'id', 'index', 'uuid', 'guid', 'uid', 'gid', 'serial', // Geographic IDs are unlikely to be interesting to color
'zip', 'code', 'post', 'region', 'fips', 'cbgs', 'h3', 's2', // Geographic coords (but not z/elevation/altitude
// since that might be a metric)
'lat', 'lon', 'lng', 'latitude', 'longitude', '_x', '_y'];
/**
 * Prefixes and suffixes that indicate a field is a metric.
 *
 * Note that these are in order of preference, first being
 * most preferred.
 */

var METRIC_DEFAULT_FIELDS = ['metric', 'value', 'sum', 'count', 'unique', 'mean', 'mode', 'median', 'max', 'min', 'deviation', 'variance', 'p99', 'p95', 'p75', 'p50', 'p25', 'p05', // Abbreviations are less preferred
'cnt', 'val'];
/**
 * Choose a field to use as the default color field of a layer.
 *
 * The heuristic is:
 *
 * First, exclude fields that are on the exclusion list and don't
 * have names that suggest they contain metrics. Also exclude
 * field names that are blank.
 *
 * Next, look for a field that is of real type and contains one
 * of the preferred names (in order of the preferred names).
 *
 * Next, look for a field that is of integer type and contains
 * one of the preferred names (in order of the preferred names).
 *
 * Next, look for the first field that is of real type (in order
 * of field index).
 *
 * Next, look for the first field that is of integer type (in
 * order of field index).
 *
 * It's possible no field will be chosen (i.e. because all fields
 * are strings.)
 *
 * @param dataset
 */

function findDefaultColorField(_ref3) {
  var fields = _ref3.fields,
      _ref3$fieldPairs = _ref3.fieldPairs,
      fieldPairs = _ref3$fieldPairs === void 0 ? [] : _ref3$fieldPairs;
  var fieldsWithoutExcluded = fields.filter(function (field) {
    if (field.type !== _defaultSettings.ALL_FIELD_TYPES.real && field.type !== _defaultSettings.ALL_FIELD_TYPES.integer) {
      // Only select numeric fields.
      return false;
    }

    if (fieldPairs.find(function (pair) {
      return pair.pair.lat.value === field.name || pair.pair.lng.value === field.name;
    })) {
      // Do not permit lat, lon fields
      return false;
    }

    var normalizedFieldName = field.name.toLowerCase();

    if (normalizedFieldName === '') {
      // Special case excluded name when the name is blank.
      return false;
    }

    var hasExcluded = EXCLUDED_DEFAULT_FIELDS.find(function (f) {
      return normalizedFieldName.startsWith(f) || normalizedFieldName.endsWith(f);
    });
    var hasInclusion = METRIC_DEFAULT_FIELDS.find(function (f) {
      return normalizedFieldName.startsWith(f) || normalizedFieldName.endsWith(f);
    });
    return !hasExcluded || hasInclusion;
  });
  var sortedFields = fieldsWithoutExcluded.sort(function (left, right) {
    var normalizedLeft = left.name.toLowerCase();
    var normalizedRight = right.name.toLowerCase();
    var leftHasInclusion = METRIC_DEFAULT_FIELDS.findIndex(function (f) {
      return normalizedLeft.startsWith(f) || normalizedLeft.endsWith(f);
    });
    var rightHasInclusion = METRIC_DEFAULT_FIELDS.findIndex(function (f) {
      return normalizedRight.startsWith(f) || normalizedRight.endsWith(f);
    });

    if (leftHasInclusion !== rightHasInclusion) {
      if (leftHasInclusion === -1) {
        // Elements that do not have the inclusion list should go after those that do.
        return 1;
      } else if (rightHasInclusion === -1) {
        // Elements that do have the inclusion list should go before those that don't.
        return -1;
      } // Compare based on order in the inclusion list


      return leftHasInclusion - rightHasInclusion;
    } // Compare based on type


    if (left.type !== right.type) {
      if (left.type === _defaultSettings.ALL_FIELD_TYPES.real) {
        return -1;
      } // left is an integer and right is not
      // and reals come before integers


      return 1;
    } // Finally, order based on the order in the datasets columns


    return left.index - right.index;
  });

  if (sortedFields.length) {
    // There was a best match
    return sortedFields[0];
  } // No matches


  return null;
}
/**
 * Choose a field to use as the default color field of a layer.
 *
 * The heuristic is:
 *
 * First, exclude fields that are on the exclusion list and don't
 * have names that suggest they contain metrics. Also exclude
 * field names that are blank.
 *
 * Next, look for a field that is of real type and contains one
 * of the preferred names (in order of the preferred names).
 *
 * Next, look for a field that is of integer type and contains
 * one of the preferred names (in order of the preferred names).
 *
 * Next, look for the first field that is of real type (in order
 * of field index).
 *
 * Next, look for the first field that is of integer type (in
 * order of field index).
 *
 * It's possible no field will be chosen (i.e. because all fields
 * are strings.)
 *
 * @param dataset
 */


function sortDatasetByColumn(dataset, column, mode) {
  var allIndexes = dataset.allIndexes,
      fields = dataset.fields,
      allData = dataset.allData;
  var fieldIndex = fields.findIndex(function (f) {
    return f.name === column;
  });

  if (fieldIndex < 0) {
    return dataset;
  }

  var sortBy = _constants.SORT_ORDER[mode] || _constants.SORT_ORDER.ASCENDING;

  if (sortBy === _constants.SORT_ORDER.UNSORT) {
    return _objectSpread(_objectSpread({}, dataset), {}, {
      sortColumn: {},
      sortOrder: null
    });
  }

  var sortFunction = sortBy === _constants.SORT_ORDER.ASCENDING ? _d3Array.ascending : _d3Array.descending;
  var sortOrder = allIndexes.slice().sort(function (a, b) {
    return sortFunction(allData[a][fieldIndex], allData[b][fieldIndex]);
  });
  return _objectSpread(_objectSpread({}, dataset), {}, {
    sortColumn: (0, _defineProperty2["default"])({}, column, sortBy),
    sortOrder: sortOrder
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhc2V0LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlQ29sb3IiLCJkYXRhc2V0Q29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJpbmRleCIsImxlbmd0aCIsImRhdGFzZXRDb2xvck1ha2VyIiwiZ2V0TmV3RGF0YXNldENvbG9yIiwiZGF0YXNldHMiLCJwcmVzZXRDb2xvcnMiLCJTdHJpbmciLCJ1c2VkQ29sb3JzIiwiT2JqZWN0IiwidmFsdWVzIiwiZCIsImNvbG9yIiwiZmlsdGVyIiwiYyIsImluY2x1ZGVzIiwibmV4dCIsInZhbHVlIiwiY3JlYXRlTmV3RGF0YUVudHJ5IiwiaW5mbyIsImRhdGEiLCJtZXRhZGF0YSIsInZhbGlkYXRlZERhdGEiLCJrZXBsZXJUYWJsZSIsIktlcGxlclRhYmxlIiwiaWQiLCJFWENMVURFRF9ERUZBVUxUX0ZJRUxEUyIsIk1FVFJJQ19ERUZBVUxUX0ZJRUxEUyIsImZpbmREZWZhdWx0Q29sb3JGaWVsZCIsImZpZWxkcyIsImZpZWxkUGFpcnMiLCJmaWVsZHNXaXRob3V0RXhjbHVkZWQiLCJmaWVsZCIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJyZWFsIiwiaW50ZWdlciIsImZpbmQiLCJwYWlyIiwibGF0IiwibmFtZSIsImxuZyIsIm5vcm1hbGl6ZWRGaWVsZE5hbWUiLCJ0b0xvd2VyQ2FzZSIsImhhc0V4Y2x1ZGVkIiwiZiIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsImhhc0luY2x1c2lvbiIsInNvcnRlZEZpZWxkcyIsInNvcnQiLCJsZWZ0IiwicmlnaHQiLCJub3JtYWxpemVkTGVmdCIsIm5vcm1hbGl6ZWRSaWdodCIsImxlZnRIYXNJbmNsdXNpb24iLCJmaW5kSW5kZXgiLCJyaWdodEhhc0luY2x1c2lvbiIsInNvcnREYXRhc2V0QnlDb2x1bW4iLCJkYXRhc2V0IiwiY29sdW1uIiwibW9kZSIsImFsbEluZGV4ZXMiLCJhbGxEYXRhIiwiZmllbGRJbmRleCIsInNvcnRCeSIsIlNPUlRfT1JERVIiLCJBU0NFTkRJTkciLCJVTlNPUlQiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwic29ydEZ1bmN0aW9uIiwiYXNjZW5kaW5nIiwiZGVzY2VuZGluZyIsInNsaWNlIiwiYSIsImIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7d0RBa0JVQSxhOztBQWhCVjtBQUNBO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLENBQ3BCLFNBRG9CLEVBRXBCLFNBRm9CLEVBR3BCLFNBSG9CLEVBSXBCLFNBSm9CLEVBS3BCLFNBTG9CLEVBTXBCLFNBTm9CLEVBT3BCLFNBUG9CLEVBUXBCQyxHQVJvQixDQVFoQkMsb0JBUmdCLENBQXRCO0FBVUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBVUgsYUFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTUksVUFBQUEsS0FETixHQUNjLENBRGQ7O0FBQUE7QUFBQSxnQkFFU0EsS0FBSyxHQUFHSCxhQUFhLENBQUNJLE1BQWQsR0FBdUIsQ0FGeEM7QUFBQTtBQUFBO0FBQUE7O0FBR0ksY0FBSUQsS0FBSyxLQUFLSCxhQUFhLENBQUNJLE1BQTVCLEVBQW9DO0FBQ2xDRCxZQUFBQSxLQUFLLEdBQUcsQ0FBUjtBQUNEOztBQUxMO0FBTUksaUJBQU1ILGFBQWEsQ0FBQ0csS0FBSyxFQUFOLENBQW5COztBQU5KO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVTyxJQUFNRSxpQkFBaUIsR0FBR04sYUFBYSxFQUF2QztBQUVQOzs7O0FBQ08sU0FBU08sa0JBQVQsQ0FBNEJDLFFBQTVCLEVBQXNDO0FBQzNDLE1BQU1DLFlBQVksR0FBR1IsYUFBYSxDQUFDQyxHQUFkLENBQWtCUSxNQUFsQixDQUFyQjtBQUNBLE1BQU1DLFVBQVUsR0FBRyx3QkFBS0MsTUFBTSxDQUFDQyxNQUFQLENBQWNMLFFBQWQsRUFBd0JOLEdBQXhCLENBQTRC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LE1BQUlJLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNsQixXQUFPTCxPQUFQO0FBQ0Q7O0FBRUQsTUFBTU0sTUFBTSxHQUFHQyxzQkFBV0wsSUFBWCxLQUFvQkssc0JBQVdDLFNBQTlDOztBQUVBLE1BQUlGLE1BQU0sS0FBS0Msc0JBQVdFLE1BQTFCLEVBQWtDO0FBQ2hDLDJDQUNLVCxPQURMO0FBRUVVLE1BQUFBLFVBQVUsRUFBRSxFQUZkO0FBR0VDLE1BQUFBLFNBQVMsRUFBRTtBQUhiO0FBS0Q7O0FBRUQsTUFBTUMsWUFBWSxHQUFHTixNQUFNLEtBQUtDLHNCQUFXQyxTQUF0QixHQUFrQ0ssa0JBQWxDLEdBQThDQyxtQkFBbkU7QUFDQSxNQUFNSCxTQUFTLEdBQUdSLFVBQVUsQ0FDekJZLEtBRGUsR0FFZnhCLElBRmUsQ0FFVixVQUFDeUIsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUwsWUFBWSxDQUFDUixPQUFPLENBQUNZLENBQUQsQ0FBUCxDQUFXWCxVQUFYLENBQUQsRUFBeUJELE9BQU8sQ0FBQ2EsQ0FBRCxDQUFQLENBQVdaLFVBQVgsQ0FBekIsQ0FBdEI7QUFBQSxHQUZVLENBQWxCO0FBSUEseUNBQ0tMLE9BREw7QUFFRVUsSUFBQUEsVUFBVSx1Q0FDUFQsTUFETyxFQUNFSyxNQURGLENBRlo7QUFLRUssSUFBQUEsU0FBUyxFQUFUQTtBQUxGO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2hleFRvUmdifSBmcm9tICcuL2NvbG9yLXV0aWxzJztcbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC51bmlxJztcbmltcG9ydCB7QUxMX0ZJRUxEX1RZUEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge3ZhbGlkYXRlSW5wdXREYXRhfSBmcm9tICdwcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCB7YXNjZW5kaW5nLCBkZXNjZW5kaW5nfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQgS2VwbGVyVGFibGUgZnJvbSAnLi90YWJsZS11dGlscy9rZXBsZXItdGFibGUnO1xuaW1wb3J0IHtTT1JUX09SREVSfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG4vLyBhcHBseSBhIGNvbG9yIGZvciBlYWNoIGRhdGFzZXRcbi8vIHRvIHVzZSBhcyBsYWJlbCBjb2xvcnNcbmNvbnN0IGRhdGFzZXRDb2xvcnMgPSBbXG4gICcjOEYyRkJGJyxcbiAgJyMwMDVDRkYnLFxuICAnI0MwNkM4NCcsXG4gICcjRjhCMTk1JyxcbiAgJyM1NDdBODInLFxuICAnIzNFQUNBOCcsXG4gICcjQTJENEFCJ1xuXS5tYXAoaGV4VG9SZ2IpO1xuXG4vKipcbiAqIFJhbmRvbSBjb2xvciBnZW5lcmF0b3JcbiAqIEByZXR1cm4ge0dlbmVyYXRvcjxpbXBvcnQoJ3JlZHVjZXJzL3R5cGVzJykuUkdCQ29sb3I+fVxuICovXG5mdW5jdGlvbiogZ2VuZXJhdGVDb2xvcigpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKGluZGV4IDwgZGF0YXNldENvbG9ycy5sZW5ndGggKyAxKSB7XG4gICAgaWYgKGluZGV4ID09PSBkYXRhc2V0Q29sb3JzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB5aWVsZCBkYXRhc2V0Q29sb3JzW2luZGV4KytdO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBkYXRhc2V0Q29sb3JNYWtlciA9IGdlbmVyYXRlQ29sb3IoKTtcblxuLyoqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGFzZXQtdXRpbHMnKS5nZXROZXdEYXRhc2V0Q29sb3J9ICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3RGF0YXNldENvbG9yKGRhdGFzZXRzKSB7XG4gIGNvbnN0IHByZXNldENvbG9ycyA9IGRhdGFzZXRDb2xvcnMubWFwKFN0cmluZyk7XG4gIGNvbnN0IHVzZWRDb2xvcnMgPSB1bmlxKE9iamVjdC52YWx1ZXMoZGF0YXNldHMpLm1hcChkID0+IFN0cmluZyhkLmNvbG9yKSkpLmZpbHRlcihjID0+XG4gICAgcHJlc2V0Q29sb3JzLmluY2x1ZGVzKGMpXG4gICk7XG5cbiAgaWYgKHVzZWRDb2xvcnMubGVuZ3RoID09PSBwcmVzZXRDb2xvcnMubGVuZ3RoKSB7XG4gICAgLy8gaWYgd2UgYWxyZWFkeSBkZXBsZXRlZCB0aGUgcG9vbCBvZiBjb2xvclxuICAgIHJldHVybiBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIH1cblxuICBsZXQgY29sb3IgPSBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIHdoaWxlICh1c2VkQ29sb3JzLmluY2x1ZGVzKFN0cmluZyhjb2xvcikpKSB7XG4gICAgY29sb3IgPSBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIH1cblxuICByZXR1cm4gY29sb3I7XG59XG5cbi8qKlxuICogVGFrZSBkYXRhc2V0cyBwYXlsb2FkIGZyb20gYWRkRGF0YVRvTWFwLCBjcmVhdGUgZGF0YXNldHMgZW50cnkgc2F2ZSB0byB2aXNTdGF0ZVxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YXNldC11dGlscycpLmNyZWF0ZU5ld0RhdGFFbnRyeX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5ld0RhdGFFbnRyeSh7aW5mbywgZGF0YSwgbWV0YWRhdGF9LCBkYXRhc2V0cyA9IHt9KSB7XG4gIGNvbnN0IHZhbGlkYXRlZERhdGEgPSB2YWxpZGF0ZUlucHV0RGF0YShkYXRhKTtcbiAgaWYgKCF2YWxpZGF0ZWREYXRhKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgaW5mbyA9IGluZm8gfHwge307XG4gIGNvbnN0IGNvbG9yID0gaW5mby5jb2xvciB8fCBnZXROZXdEYXRhc2V0Q29sb3IoZGF0YXNldHMpO1xuXG4gIGNvbnN0IGtlcGxlclRhYmxlID0gbmV3IEtlcGxlclRhYmxlKHtpbmZvLCBkYXRhOiB2YWxpZGF0ZWREYXRhLCBjb2xvciwgbWV0YWRhdGF9KTtcbiAgcmV0dXJuIHtcbiAgICBba2VwbGVyVGFibGUuaWRdOiBrZXBsZXJUYWJsZVxuICB9O1xufVxuXG4vKipcbiAqIEZpZWxkIG5hbWUgcHJlZml4ZXMgYW5kIHN1ZmZpeGVzIHdoaWNoIHNob3VsZCBub3QgYmUgY29uc2lkZXJlZFxuICogYXMgbWV0cmljcy4gRmllbGRzIHdpbGwgc3RpbGwgYmUgaW5jbHVkZWQgaWYgYSAnbWV0cmljIHdvcmQnXG4gKiBpcyBmb3VuZCBvbiB0aGUgZmllbGQgbmFtZSwgaG93ZXZlci5cbiAqL1xuY29uc3QgRVhDTFVERURfREVGQVVMVF9GSUVMRFMgPSBbXG4gIC8vIFNlcmlhbCBudW1iZXJzIGFuZCBpZGVudGlmaWNhdGlvbiBudW1iZXJzXG4gICdfaWQnLFxuICAnaWQnLFxuICAnaW5kZXgnLFxuICAndXVpZCcsXG4gICdndWlkJyxcbiAgJ3VpZCcsXG4gICdnaWQnLFxuICAnc2VyaWFsJyxcbiAgLy8gR2VvZ3JhcGhpYyBJRHMgYXJlIHVubGlrZWx5IHRvIGJlIGludGVyZXN0aW5nIHRvIGNvbG9yXG4gICd6aXAnLFxuICAnY29kZScsXG4gICdwb3N0JyxcbiAgJ3JlZ2lvbicsXG4gICdmaXBzJyxcbiAgJ2NiZ3MnLFxuICAnaDMnLFxuICAnczInLFxuICAvLyBHZW9ncmFwaGljIGNvb3JkcyAoYnV0IG5vdCB6L2VsZXZhdGlvbi9hbHRpdHVkZVxuICAvLyBzaW5jZSB0aGF0IG1pZ2h0IGJlIGEgbWV0cmljKVxuICAnbGF0JyxcbiAgJ2xvbicsXG4gICdsbmcnLFxuICAnbGF0aXR1ZGUnLFxuICAnbG9uZ2l0dWRlJyxcbiAgJ194JyxcbiAgJ195J1xuXTtcblxuLyoqXG4gKiBQcmVmaXhlcyBhbmQgc3VmZml4ZXMgdGhhdCBpbmRpY2F0ZSBhIGZpZWxkIGlzIGEgbWV0cmljLlxuICpcbiAqIE5vdGUgdGhhdCB0aGVzZSBhcmUgaW4gb3JkZXIgb2YgcHJlZmVyZW5jZSwgZmlyc3QgYmVpbmdcbiAqIG1vc3QgcHJlZmVycmVkLlxuICovXG5jb25zdCBNRVRSSUNfREVGQVVMVF9GSUVMRFMgPSBbXG4gICdtZXRyaWMnLFxuICAndmFsdWUnLFxuICAnc3VtJyxcbiAgJ2NvdW50JyxcbiAgJ3VuaXF1ZScsXG4gICdtZWFuJyxcbiAgJ21vZGUnLFxuICAnbWVkaWFuJyxcbiAgJ21heCcsXG4gICdtaW4nLFxuICAnZGV2aWF0aW9uJyxcbiAgJ3ZhcmlhbmNlJyxcbiAgJ3A5OScsXG4gICdwOTUnLFxuICAncDc1JyxcbiAgJ3A1MCcsXG4gICdwMjUnLFxuICAncDA1JyxcbiAgLy8gQWJicmV2aWF0aW9ucyBhcmUgbGVzcyBwcmVmZXJyZWRcbiAgJ2NudCcsXG4gICd2YWwnXG5dO1xuXG4vKipcbiAqIENob29zZSBhIGZpZWxkIHRvIHVzZSBhcyB0aGUgZGVmYXVsdCBjb2xvciBmaWVsZCBvZiBhIGxheWVyLlxuICpcbiAqIFRoZSBoZXVyaXN0aWMgaXM6XG4gKlxuICogRmlyc3QsIGV4Y2x1ZGUgZmllbGRzIHRoYXQgYXJlIG9uIHRoZSBleGNsdXNpb24gbGlzdCBhbmQgZG9uJ3RcbiAqIGhhdmUgbmFtZXMgdGhhdCBzdWdnZXN0IHRoZXkgY29udGFpbiBtZXRyaWNzLiBBbHNvIGV4Y2x1ZGVcbiAqIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGJsYW5rLlxuICpcbiAqIE5leHQsIGxvb2sgZm9yIGEgZmllbGQgdGhhdCBpcyBvZiByZWFsIHR5cGUgYW5kIGNvbnRhaW5zIG9uZVxuICogb2YgdGhlIHByZWZlcnJlZCBuYW1lcyAoaW4gb3JkZXIgb2YgdGhlIHByZWZlcnJlZCBuYW1lcykuXG4gKlxuICogTmV4dCwgbG9vayBmb3IgYSBmaWVsZCB0aGF0IGlzIG9mIGludGVnZXIgdHlwZSBhbmQgY29udGFpbnNcbiAqIG9uZSBvZiB0aGUgcHJlZmVycmVkIG5hbWVzIChpbiBvcmRlciBvZiB0aGUgcHJlZmVycmVkIG5hbWVzKS5cbiAqXG4gKiBOZXh0LCBsb29rIGZvciB0aGUgZmlyc3QgZmllbGQgdGhhdCBpcyBvZiByZWFsIHR5cGUgKGluIG9yZGVyXG4gKiBvZiBmaWVsZCBpbmRleCkuXG4gKlxuICogTmV4dCwgbG9vayBmb3IgdGhlIGZpcnN0IGZpZWxkIHRoYXQgaXMgb2YgaW50ZWdlciB0eXBlIChpblxuICogb3JkZXIgb2YgZmllbGQgaW5kZXgpLlxuICpcbiAqIEl0J3MgcG9zc2libGUgbm8gZmllbGQgd2lsbCBiZSBjaG9zZW4gKGkuZS4gYmVjYXVzZSBhbGwgZmllbGRzXG4gKiBhcmUgc3RyaW5ncy4pXG4gKlxuICogQHBhcmFtIGRhdGFzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmREZWZhdWx0Q29sb3JGaWVsZCh7ZmllbGRzLCBmaWVsZFBhaXJzID0gW119KSB7XG4gIGNvbnN0IGZpZWxkc1dpdGhvdXRFeGNsdWRlZCA9IGZpZWxkcy5maWx0ZXIoZmllbGQgPT4ge1xuICAgIGlmIChmaWVsZC50eXBlICE9PSBBTExfRklFTERfVFlQRVMucmVhbCAmJiBmaWVsZC50eXBlICE9PSBBTExfRklFTERfVFlQRVMuaW50ZWdlcikge1xuICAgICAgLy8gT25seSBzZWxlY3QgbnVtZXJpYyBmaWVsZHMuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGZpZWxkUGFpcnMuZmluZChcbiAgICAgICAgcGFpciA9PiBwYWlyLnBhaXIubGF0LnZhbHVlID09PSBmaWVsZC5uYW1lIHx8IHBhaXIucGFpci5sbmcudmFsdWUgPT09IGZpZWxkLm5hbWVcbiAgICAgIClcbiAgICApIHtcbiAgICAgIC8vIERvIG5vdCBwZXJtaXQgbGF0LCBsb24gZmllbGRzXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZEZpZWxkTmFtZSA9IGZpZWxkLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobm9ybWFsaXplZEZpZWxkTmFtZSA9PT0gJycpIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBleGNsdWRlZCBuYW1lIHdoZW4gdGhlIG5hbWUgaXMgYmxhbmsuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGhhc0V4Y2x1ZGVkID0gRVhDTFVERURfREVGQVVMVF9GSUVMRFMuZmluZChcbiAgICAgIGYgPT4gbm9ybWFsaXplZEZpZWxkTmFtZS5zdGFydHNXaXRoKGYpIHx8IG5vcm1hbGl6ZWRGaWVsZE5hbWUuZW5kc1dpdGgoZilcbiAgICApO1xuICAgIGNvbnN0IGhhc0luY2x1c2lvbiA9IE1FVFJJQ19ERUZBVUxUX0ZJRUxEUy5maW5kKFxuICAgICAgZiA9PiBub3JtYWxpemVkRmllbGROYW1lLnN0YXJ0c1dpdGgoZikgfHwgbm9ybWFsaXplZEZpZWxkTmFtZS5lbmRzV2l0aChmKVxuICAgICk7XG4gICAgcmV0dXJuICFoYXNFeGNsdWRlZCB8fCBoYXNJbmNsdXNpb247XG4gIH0pO1xuXG4gIGNvbnN0IHNvcnRlZEZpZWxkcyA9IGZpZWxkc1dpdGhvdXRFeGNsdWRlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbGVmdC5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gcmlnaHQubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGxlZnRIYXNJbmNsdXNpb24gPSBNRVRSSUNfREVGQVVMVF9GSUVMRFMuZmluZEluZGV4KFxuICAgICAgZiA9PiBub3JtYWxpemVkTGVmdC5zdGFydHNXaXRoKGYpIHx8IG5vcm1hbGl6ZWRMZWZ0LmVuZHNXaXRoKGYpXG4gICAgKTtcbiAgICBjb25zdCByaWdodEhhc0luY2x1c2lvbiA9IE1FVFJJQ19ERUZBVUxUX0ZJRUxEUy5maW5kSW5kZXgoXG4gICAgICBmID0+IG5vcm1hbGl6ZWRSaWdodC5zdGFydHNXaXRoKGYpIHx8IG5vcm1hbGl6ZWRSaWdodC5lbmRzV2l0aChmKVxuICAgICk7XG4gICAgaWYgKGxlZnRIYXNJbmNsdXNpb24gIT09IHJpZ2h0SGFzSW5jbHVzaW9uKSB7XG4gICAgICBpZiAobGVmdEhhc0luY2x1c2lvbiA9PT0gLTEpIHtcbiAgICAgICAgLy8gRWxlbWVudHMgdGhhdCBkbyBub3QgaGF2ZSB0aGUgaW5jbHVzaW9uIGxpc3Qgc2hvdWxkIGdvIGFmdGVyIHRob3NlIHRoYXQgZG8uXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIGlmIChyaWdodEhhc0luY2x1c2lvbiA9PT0gLTEpIHtcbiAgICAgICAgLy8gRWxlbWVudHMgdGhhdCBkbyBoYXZlIHRoZSBpbmNsdXNpb24gbGlzdCBzaG91bGQgZ28gYmVmb3JlIHRob3NlIHRoYXQgZG9uJ3QuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIC8vIENvbXBhcmUgYmFzZWQgb24gb3JkZXIgaW4gdGhlIGluY2x1c2lvbiBsaXN0XG4gICAgICByZXR1cm4gbGVmdEhhc0luY2x1c2lvbiAtIHJpZ2h0SGFzSW5jbHVzaW9uO1xuICAgIH1cblxuICAgIC8vIENvbXBhcmUgYmFzZWQgb24gdHlwZVxuICAgIGlmIChsZWZ0LnR5cGUgIT09IHJpZ2h0LnR5cGUpIHtcbiAgICAgIGlmIChsZWZ0LnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy5yZWFsKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIC8vIGxlZnQgaXMgYW4gaW50ZWdlciBhbmQgcmlnaHQgaXMgbm90XG4gICAgICAvLyBhbmQgcmVhbHMgY29tZSBiZWZvcmUgaW50ZWdlcnNcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIEZpbmFsbHksIG9yZGVyIGJhc2VkIG9uIHRoZSBvcmRlciBpbiB0aGUgZGF0YXNldHMgY29sdW1uc1xuICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gIH0pO1xuXG4gIGlmIChzb3J0ZWRGaWVsZHMubGVuZ3RoKSB7XG4gICAgLy8gVGhlcmUgd2FzIGEgYmVzdCBtYXRjaFxuICAgIHJldHVybiBzb3J0ZWRGaWVsZHNbMF07XG4gIH1cbiAgLy8gTm8gbWF0Y2hlc1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDaG9vc2UgYSBmaWVsZCB0byB1c2UgYXMgdGhlIGRlZmF1bHQgY29sb3IgZmllbGQgb2YgYSBsYXllci5cbiAqXG4gKiBUaGUgaGV1cmlzdGljIGlzOlxuICpcbiAqIEZpcnN0LCBleGNsdWRlIGZpZWxkcyB0aGF0IGFyZSBvbiB0aGUgZXhjbHVzaW9uIGxpc3QgYW5kIGRvbid0XG4gKiBoYXZlIG5hbWVzIHRoYXQgc3VnZ2VzdCB0aGV5IGNvbnRhaW4gbWV0cmljcy4gQWxzbyBleGNsdWRlXG4gKiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBibGFuay5cbiAqXG4gKiBOZXh0LCBsb29rIGZvciBhIGZpZWxkIHRoYXQgaXMgb2YgcmVhbCB0eXBlIGFuZCBjb250YWlucyBvbmVcbiAqIG9mIHRoZSBwcmVmZXJyZWQgbmFtZXMgKGluIG9yZGVyIG9mIHRoZSBwcmVmZXJyZWQgbmFtZXMpLlxuICpcbiAqIE5leHQsIGxvb2sgZm9yIGEgZmllbGQgdGhhdCBpcyBvZiBpbnRlZ2VyIHR5cGUgYW5kIGNvbnRhaW5zXG4gKiBvbmUgb2YgdGhlIHByZWZlcnJlZCBuYW1lcyAoaW4gb3JkZXIgb2YgdGhlIHByZWZlcnJlZCBuYW1lcykuXG4gKlxuICogTmV4dCwgbG9vayBmb3IgdGhlIGZpcnN0IGZpZWxkIHRoYXQgaXMgb2YgcmVhbCB0eXBlIChpbiBvcmRlclxuICogb2YgZmllbGQgaW5kZXgpLlxuICpcbiAqIE5leHQsIGxvb2sgZm9yIHRoZSBmaXJzdCBmaWVsZCB0aGF0IGlzIG9mIGludGVnZXIgdHlwZSAoaW5cbiAqIG9yZGVyIG9mIGZpZWxkIGluZGV4KS5cbiAqXG4gKiBJdCdzIHBvc3NpYmxlIG5vIGZpZWxkIHdpbGwgYmUgY2hvc2VuIChpLmUuIGJlY2F1c2UgYWxsIGZpZWxkc1xuICogYXJlIHN0cmluZ3MuKVxuICpcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RGF0YXNldEJ5Q29sdW1uKGRhdGFzZXQsIGNvbHVtbiwgbW9kZSkge1xuICBjb25zdCB7YWxsSW5kZXhlcywgZmllbGRzLCBhbGxEYXRhfSA9IGRhdGFzZXQ7XG4gIGNvbnN0IGZpZWxkSW5kZXggPSBmaWVsZHMuZmluZEluZGV4KGYgPT4gZi5uYW1lID09PSBjb2x1bW4pO1xuICBpZiAoZmllbGRJbmRleCA8IDApIHtcbiAgICByZXR1cm4gZGF0YXNldDtcbiAgfVxuXG4gIGNvbnN0IHNvcnRCeSA9IFNPUlRfT1JERVJbbW9kZV0gfHwgU09SVF9PUkRFUi5BU0NFTkRJTkc7XG5cbiAgaWYgKHNvcnRCeSA9PT0gU09SVF9PUkRFUi5VTlNPUlQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGF0YXNldCxcbiAgICAgIHNvcnRDb2x1bW46IHt9LFxuICAgICAgc29ydE9yZGVyOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHNvcnRGdW5jdGlvbiA9IHNvcnRCeSA9PT0gU09SVF9PUkRFUi5BU0NFTkRJTkcgPyBhc2NlbmRpbmcgOiBkZXNjZW5kaW5nO1xuICBjb25zdCBzb3J0T3JkZXIgPSBhbGxJbmRleGVzXG4gICAgLnNsaWNlKClcbiAgICAuc29ydCgoYSwgYikgPT4gc29ydEZ1bmN0aW9uKGFsbERhdGFbYV1bZmllbGRJbmRleF0sIGFsbERhdGFbYl1bZmllbGRJbmRleF0pKTtcblxuICByZXR1cm4ge1xuICAgIC4uLmRhdGFzZXQsXG4gICAgc29ydENvbHVtbjoge1xuICAgICAgW2NvbHVtbl06IHNvcnRCeVxuICAgIH0sXG4gICAgc29ydE9yZGVyXG4gIH07XG59XG5cbiJdfQ==