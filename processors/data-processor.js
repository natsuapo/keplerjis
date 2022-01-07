"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCsvData = processCsvData;
exports.parseRowsByFields = parseRowsByFields;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvRowsByFieldType = parseCsvRowsByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.processGoogleTrackGeojson = processGoogleTrackGeojson;
exports.processGoogleSemanticGeojson = processGoogleSemanticGeojson;
exports.processTrackToTripGeojson = processTrackToTripGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;
exports.processKeplerglJSON = processKeplerglJSON;
exports.processKeplerglDataset = processKeplerglDataset;
exports.Processors = exports.DATASET_HANDLERS = exports.PARSE_FIELD_VALUE_FROM_STRING = exports.CSV_NULLS = exports.ACCEPTED_ANALYZER_TYPES = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _d3Dsv = require("d3-dsv");

var _d3Array = require("d3-array");

var _window = require("global/window");

var _assert = _interopRequireDefault(require("assert"));

var _typeAnalyzer = require("type-analyzer");

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("../utils/data-utils");

var _schemas = _interopRequireDefault(require("../schemas"));

var _userGuides = require("../constants/user-guides");

var _utils = require("../utils/utils");

var turf = _interopRequireWildcard(require("@turf/turf"));

var _googleUtils = require("../utils/google-utils");

var _PARSE_FIELD_VALUE_FR, _DATASET_HANDLERS;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ACCEPTED_ANALYZER_TYPES = [_typeAnalyzer.DATA_TYPES.DATE, _typeAnalyzer.DATA_TYPES.TIME, _typeAnalyzer.DATA_TYPES.DATETIME, _typeAnalyzer.DATA_TYPES.NUMBER, _typeAnalyzer.DATA_TYPES.INT, _typeAnalyzer.DATA_TYPES.FLOAT, _typeAnalyzer.DATA_TYPES.BOOLEAN, _typeAnalyzer.DATA_TYPES.STRING, _typeAnalyzer.DATA_TYPES.GEOMETRY, _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING, _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING, _typeAnalyzer.DATA_TYPES.ZIPCODE, _typeAnalyzer.DATA_TYPES.ARRAY, _typeAnalyzer.DATA_TYPES.OBJECT]; // if any of these value occurs in csv, parse it to null;
// const CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN', '/N'];
// matches empty string

exports.ACCEPTED_ANALYZER_TYPES = ACCEPTED_ANALYZER_TYPES;
var CSV_NULLS = /^(null|NULL|Null|NaN|\/N||)$/;
exports.CSV_NULLS = CSV_NULLS;
var IGNORE_DATA_TYPES = Object.keys(_typeAnalyzer.DATA_TYPES).filter(function (type) {
  return !ACCEPTED_ANALYZER_TYPES.includes(type);
});
var PARSE_FIELD_VALUE_FROM_STRING = (_PARSE_FIELD_VALUE_FR = {}, (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES["boolean"], {
  valid: function valid(d) {
    return typeof d === 'boolean';
  },
  parse: function parse(d) {
    return d === 'true' || d === 'True' || d === 'TRUE' || d === '1';
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.integer, {
  valid: function valid(d) {
    return parseInt(d, 10) === d;
  },
  parse: function parse(d) {
    return parseInt(d, 10);
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.timestamp, {
  valid: function valid(d, field) {
    return ['x', 'X'].includes(field.format) ? typeof d === 'number' : typeof d === 'string';
  },
  parse: function parse(d, field) {
    return ['x', 'X'].includes(field.format) ? Number(d) : d;
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.real, {
  valid: function valid(d) {
    return parseFloat(d) === d;
  },
  // Note this will result in NaN for some string
  parse: parseFloat
}), _PARSE_FIELD_VALUE_FR);
/**
 * Process csv data, output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and pass to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * @param rawData raw csv string
 * @returns  data object `{fields: [], rows: []}` can be passed to addDataToMaps
 * @type {typeof import('./data-processor').processCsvData}
 * @public
 * @example
 * import {processCsvData} from 'kepler.gl/processors';
 *
 * const testData = `gps_data.utc_timestamp,gps_data.lat,gps_data.lng,gps_data.types,epoch,has_result,id,time,begintrip_ts_utc,begintrip_ts_local,date
 * 2016-09-17 00:09:55,29.9900937,31.2590542,driver_analytics,1472688000000,False,1,2016-09-23T00:00:00.000Z,2016-10-01 09:41:39+00:00,2016-10-01 09:41:39+00:00,2016-09-23
 * 2016-09-17 00:10:56,29.9927699,31.2461142,driver_analytics,1472688000000,False,2,2016-09-23T00:00:00.000Z,2016-10-01 09:46:37+00:00,2016-10-01 16:46:37+00:00,2016-09-23
 * 2016-09-17 00:11:56,29.9907261,31.2312742,driver_analytics,1472688000000,False,3,2016-09-23T00:00:00.000Z,,,2016-09-23
 * 2016-09-17 00:12:58,29.9870074,31.2175827,driver_analytics,1472688000000,False,4,2016-09-23T00:00:00.000Z,,,2016-09-23`
 *
 * const dataset = {
 *  info: {id: 'test_data', label: 'My Csv'},
 *  data: processCsvData(testData)
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: [dataset],
 *  options: {centerMap: true, readOnly: true}
 * }));
 */

exports.PARSE_FIELD_VALUE_FROM_STRING = PARSE_FIELD_VALUE_FROM_STRING;

function processCsvData(rawData, header) {
  var rows;
  var headerRow; // eslint-disable-next-line no-console
  // console.log('raw data', rawData);
  // eslint-disable-next-line no-console
  // console.log('header', header);

  if (typeof rawData === 'string') {
    var _parsedRows = (0, _d3Dsv.csvParseRows)(rawData);

    if (!Array.isArray(_parsedRows) || _parsedRows.length < 2) {
      // looks like an empty file, throw error to be catch
      throw new Error('process Csv Data Failed: CSV is empty');
    }

    headerRow = _parsedRows[0];
    rows = _parsedRows.slice(1);
  } else if (Array.isArray(rawData) && rawData.length) {
    rows = rawData;
    headerRow = header;

    if (!Array.isArray(headerRow)) {
      // if data is passed in as array of rows and missing header
      // assume first row is header
      headerRow = rawData[0];
      rows = rawData.slice(1);
    }
  }

  if (!rows || !headerRow) {
    throw new Error('invalid input passed to processCsvData');
  } // here we assume the csv file that people uploaded will have first row
  // as name of the column


  cleanUpFalsyCsvValue(rows); // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on

  var sample = getSampleForTypeAnalyze({
    fields: headerRow,
    rows: rows
  });
  var fields = getFieldsFromData(sample, headerRow);
  var parsedRows = parseRowsByFields(rows, fields); // eslint-disable-next-line no-console

  console.log(fields, parsedRows);
  return {
    fields: fields,
    rows: parsedRows
  };
}
/**
 * Parse rows of csv by analyzed field types. So that `'1'` -> `1`, `'True'` -> `true`
 * @param {Array<Array>} rows
 * @param {Array<Object>} fields
 */


function parseRowsByFields(rows, fields) {
  // Edit rows in place
  var geojsonFieldIdx = fields.findIndex(function (f) {
    return f.name === '_geojson';
  });
  fields.forEach(parseCsvRowsByFieldType.bind(null, rows, geojsonFieldIdx));
  return rows;
}
/**
 * Getting sample data for analyzing field type.
 *
 * @type {typeof import('./data-processor').getSampleForTypeAnalyze}
 */


function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      rows = _ref.rows,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === void 0 ? 50 : _ref$sampleCount;
  var total = Math.min(sampleCount, rows.length); // const fieldOrder = fields.map(f => f.name);

  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  }); // collect sample data for each field

  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0; // sample counter

    var j = 0;

    while (j < total) {
      if (i >= rows.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(rows[i][fieldIdx])) {
        var value = rows[i][fieldIdx];
        sample[j][field] = typeof value === 'string' ? value.trim() : value;
        j++;
        i++;
      } else {
        i++;
      }
    }
  });
  return sample;
}
/**
 * Convert falsy value in csv including `'', 'null', 'NULL', 'Null', 'NaN'` to `null`,
 * so that type-analyzer won't detect it as string
 *
 * @param {Array<Array>} rows
 */


function cleanUpFalsyCsvValue(rows) {
  var re = new RegExp(CSV_NULLS, 'g');

  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (typeof rows[i][j] === 'string' && rows[i][j].match(re)) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param rows
 * @param geoFieldIdx field index
 * @param field
 * @param i
 * @type {typeof import('./data-processor').parseCsvRowsByFieldType}
 */


function parseCsvRowsByFieldType(rows, geoFieldIdx, field, i) {
  var parser = PARSE_FIELD_VALUE_FROM_STRING[field.type];

  if (parser) {
    // check first not null value of it's already parsed
    var first = rows.find(function (r) {
      return (0, _dataUtils.notNullorUndefined)(r[i]);
    });

    if (!first || parser.valid(first[i], field)) {
      return;
    }

    rows.forEach(function (row) {
      // parse string value based on field type
      if (row[i] !== null) {
        row[i] = parser.parse(row[i], field);

        if (geoFieldIdx > -1 && row[geoFieldIdx] && row[geoFieldIdx].properties) {
          row[geoFieldIdx].properties[field.name] = row[i];
        }
      }
    });
  }
}
/**
 * Analyze field types from data in `string` format, e.g. uploaded csv.
 * Assign `type`, `fieldIdx` and `format` (timestamp only) to each field
 *
 * @param data array of row object
 * @param fieldOrder array of field names as string
 * @returns formatted fields
 * @type {typeof import('./data-processor').getFieldsFromData}
 * @public
 * @example
 *
 * import {getFieldsFromData} from 'kepler.gl/processors';
 * const data = [{
 *   time: '2016-09-17 00:09:55',
 *   value: '4',
 *   surge: '1.2',
 *   isTrip: 'true',
 *   zeroOnes: '0'
 * }, {
 *   time: '2016-09-17 00:30:08',
 *   value: '3',
 *   surge: null,
 *   isTrip: 'false',
 *   zeroOnes: '1'
 * }, {
 *   time: null,
 *   value: '2',
 *   surge: '1.3',
 *   isTrip: null,
 *   zeroOnes: '1'
 * }];
 *
 * const fieldOrder = ['time', 'value', 'surge', 'isTrip', 'zeroOnes'];
 * const fields = getFieldsFromData(data, fieldOrder);
 * // fields = [
 * // {name: 'time', format: 'YYYY-M-D H:m:s', fieldIdx: 1, type: 'timestamp'},
 * // {name: 'value', format: '', fieldIdx: 4, type: 'integer'},
 * // {name: 'surge', format: '', fieldIdx: 5, type: 'real'},
 * // {name: 'isTrip', format: '', fieldIdx: 6, type: 'boolean'},
 * // {name: 'zeroOnes', format: '', fieldIdx: 7, type: 'integer'}];
 *
 */


function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{
    regex: /.*geojson|all_points/g,
    dataType: 'GEOMETRY'
  }, {
    regex: /.*census/g,
    dataType: 'STRING'
  }], {
    ignoredDataTypes: IGNORE_DATA_TYPES
  });

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  var result = fieldOrder.map(function (field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    return {
      name: name,
      id: name,
      displayName: name,
      format: format,
      fieldIdx: index,
      type: analyzerTypeToFieldType(type),
      analyzerType: type,
      valueAccessor: function valueAccessor(dc) {
        return function (d) {
          return dc.valueAt(d.index, index);
        };
      }
    };
  }); // @ts-ignore

  return result;
}
/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {Array} fieldOrder
 * @returns {Object} new field name by index
 */


function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;
    var fieldName = field; // add a counter to duplicated names

    if (allNames.includes(field)) {
      var counter = 0;

      while (allNames.includes("".concat(field, "-").concat(counter))) {
        counter++;
      }

      fieldName = "".concat(field, "-").concat(counter);
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);
    return accu;
  }, {
    allNames: [],
    fieldByIndex: {}
  });
}
/**
 * Convert type-analyzer output to kepler.gl field types
 *
 * @param aType
 * @returns corresponding type in `ALL_FIELD_TYPES`
 * @type {typeof import('./data-processor').analyzerTypeToFieldType}}
 */

/* eslint-disable complexity */


function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      ARRAY = _typeAnalyzer.DATA_TYPES.ARRAY,
      OBJECT = _typeAnalyzer.DATA_TYPES.OBJECT; // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;

    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;

    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;

    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;

    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES["boolean"];

    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
    case ARRAY:
    case OBJECT:
      // TODO: create a new data type for objects and arrays
      return _defaultSettings.ALL_FIELD_TYPES.geojson;

    case NUMBER:
    case STRING:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;

    default:
      _window.console.warn("Unsupported analyzer type: ".concat(aType));

      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/**
 * Process data where each row is an object, output can be passed to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * NOTE: This function may mutate input.
 * @param rawData an array of row object, each object should have the same number of keys
 * @returns dataset containing `fields` and `rows`
 * @type {typeof import('./data-processor').processRowObject}
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processRowObject} from 'kepler.gl/processors';
 *
 * const data = [
 *  {lat: 31.27, lng: 127.56, value: 3},
 *  {lat: 31.22, lng: 126.26, value: 1}
 * ];
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {label: 'My Data', id: 'my_data'},
 *    data: processRowObject(data)
 *  }
 * }));
 */


function processRowObject(rawData) {
  if (!Array.isArray(rawData) || !rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  }); // row object an still contain values like `Null` or `N/A`

  cleanUpFalsyCsvValue(rows);
  return processCsvData(rows, keys);
}
/**
 * Process GeoJSON [`FeatureCollection`](http://wiki.geojson.org/GeoJSON_draft_version_6#FeatureCollection),
 * output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and passed to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * NOTE: This function may mutate input.
 *
 * @param  rawData raw geojson feature collection
 * @returns  dataset containing `fields` and `rows`
 * @type {typeof import('./data-processor').processGeojson}
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processGeojson} from 'kepler.gl/processors';
 *
 * const geojson = {
 * 	"type" : "FeatureCollection",
 * 	"features" : [{
 * 		"type" : "Feature",
 * 		"properties" : {
 * 			"capacity" : "10",
 * 			"type" : "U-Rack"
 * 		},
 * 		"geometry" : {
 * 			"type" : "Point",
 * 			"coordinates" : [ -71.073283, 42.417500 ]
 * 		}
 * 	}]
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {
 *      label: 'Sample Taxi Trips in New York City',
 *      id: 'test_trip_data'
 *    },
 *    data: processGeojson(geojson)
 *  }
 * }));
 */


function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize["default"])(rawData); // eslint-disable-next-line no-console

  console.log(normalizedGeojson);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    var error = new Error("Read File Failed: File is not a valid GeoJSON. Read more about [supported file format](".concat(_userGuides.GUIDES_FILE_FORMAT_DOC, ")"));
    throw error; // fail to normalize geojson
  } // getting all feature fields


  var allDataRows = [];

  for (var i = 0; i < normalizedGeojson.features.length; i++) {
    var f = normalizedGeojson.features[i];

    if (f.geometry) {
      allDataRows.push(_objectSpread({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }
  } // get all the field


  var fields = allDataRows.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []); // make sure each feature has exact same fields

  allDataRows.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
        d._geojson.properties[f] = null;
      }
    });
  });
  return processRowObject(allDataRows);
}

function processGoogleTrackGeojson(rawData) {
  var df = (0, _googleUtils.read_gps_mobility)(rawData);
  console.log(df);
  return processCsvData(df.toArray(), df.listColumns());
}

function processGoogleSemanticGeojson(rawData) {
  var df_dict = (0, _googleUtils.read_semantic_mobility)(rawData);
  console.log('df_dict_place here');
  var activity_result = processCsvData(df_dict.acitivity.toArray(), df_dict.acitivity.listColumns());
  var place_result = processCsvData(df_dict.place.toArray(), df_dict.place.listColumns());
  return [activity_result, place_result];
}

function processTrackToTripGeojson(track_array) {
  return turf.lineString(track_array.map(function (x) {
    return [x.lng, x.lat, x.altitude, x.timestamp];
  }));
}
/**
 * On export data to csv
 * @param {import('utils/table-utils/data-container-interface').DataContainerInterface} dataContainer
 * @param {Array<Object>} fields `dataset.fields`
 * @returns {string} csv string
 */


function formatCsv(dataContainer, fields) {
  var columns = fields.map(function (f) {
    return f.displayName || f.name;
  });
  var formattedData = [columns]; // parse geojson object as string

  var _iterator = _createForOfIteratorHelper(dataContainer.rows(true)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      formattedData.push(row.map(function (d, i) {
        return (0, _dataUtils.parseFieldValue)(d, fields[i].type);
      }));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return (0, _d3Dsv.csvFormatRows)(formattedData);
}
/**
 * Validate input data, adding missing field types, rename duplicate columns
 * @type {typeof import('./data-processor').validateInputData}
 */


function validateInputData(data) {
  if (!(0, _utils.isPlainObject)(data)) {
    (0, _assert["default"])('addDataToMap Error: dataset.data cannot be null');
    return null;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert["default"])('addDataToMap Error: expect dataset.data.fields to be an array');
    return null;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert["default"])('addDataToMap Error: expect dataset.data.rows to be an array');
    return null;
  }

  var fields = data.fields,
      rows = data.rows; // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if (!(0, _utils.isPlainObject)(f)) {
      (0, _assert["default"])("fields needs to be an array of object, but find ".concat((0, _typeof2["default"])(f)));
      fields[i] = {};
    }

    if (!f.name) {
      (0, _assert["default"])("field.name is required but missing in ".concat(JSON.stringify(f))); // assign a name

      fields[i].name = "column_".concat(i);
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert["default"])("unknown field type ".concat(f.type));
      return false;
    }

    if (!fields.every(function (field) {
      return field.analyzerType;
    })) {
      (0, _assert["default"])('field missing analyzerType');
      return false;
    } // check time format is correct based on first 10 not empty element


    if (f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
      var sample = findNonEmptyRowsAtField(rows, i, 10).map(function (r) {
        return {
          ts: r[i]
        };
      });

      var analyzedType = _typeAnalyzer.Analyzer.computeColMeta(sample)[0];

      return analyzedType && analyzedType.category === 'TIME' && analyzedType.format === f.format;
    }

    return true;
  });

  if (allValid) {
    return {
      rows: rows,
      fields: fields
    };
  } // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity


  var sampleData = getSampleForTypeAnalyze({
    fields: fields.map(function (f) {
      return f.name;
    }),
    rows: rows
  });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return _objectSpread(_objectSpread({}, f), {}, {
      type: meta[i].type,
      format: meta[i].format,
      analyzerType: meta[i].analyzerType
    });
  });
  return {
    fields: updatedFields,
    rows: rows
  };
}

function findNonEmptyRowsAtField(rows, fieldIdx, total) {
  var sample = [];
  var i = 0;

  while (sample.length < total && i < rows.length) {
    if ((0, _dataUtils.notNullorUndefined)(rows[i][fieldIdx])) {
      sample.push(rows[i]);
    }

    i++;
  }

  return sample;
}
/**
 * Process saved kepler.gl json to be pass to [`addDataToMap`](../actions/actions.md#adddatatomap).
 * The json object should contain `datasets` and `config`.
 * @param {Object} rawData
 * @param {Array} rawData.datasets
 * @param {Object} rawData.config
 * @returns {Object} datasets and config `{datasets: {}, config: {}}`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processKeplerglJSON} from 'kepler.gl/processors';
 *
 * dispatch(addDataToMap(processKeplerglJSON(keplerGlJson)));
 */


function processKeplerglJSON(rawData) {
  return rawData ? _schemas["default"].load(rawData.datasets, rawData.config) : null;
}
/**
 * Parse a single or an array of datasets saved using kepler.gl schema
 * @param {Array | Array<Object>} rawData
 */


function processKeplerglDataset(rawData) {
  if (!rawData) {
    return null;
  }

  var results = _schemas["default"].parseSavedData((0, _utils.toArray)(rawData));

  if (!results) {
    return null;
  }

  return Array.isArray(rawData) ? results : results[0];
}

var DATASET_HANDLERS = (_DATASET_HANDLERS = {}, (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.row, processRowObject), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.geojson, processGeojson), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.csv, processCsvData), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.keplergl, processKeplerglDataset), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.google_semantic, processGoogleSemanticGeojson), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.google_track, processGoogleTrackGeojson), _DATASET_HANDLERS); //todo: process meshcode data

exports.DATASET_HANDLERS = DATASET_HANDLERS;
var Processors = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  processKeplerglJSON: processKeplerglJSON,
  processKeplerglDataset: processKeplerglDataset,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvRowsByFieldType: parseCsvRowsByFieldType,
  formatCsv: formatCsv,
  processGoogleTrackGeojson: processGoogleTrackGeojson,
  processGoogleSemanticGeojson: processGoogleSemanticGeojson
};
exports.Processors = Processors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbIkFDQ0VQVEVEX0FOQUxZWkVSX1RZUEVTIiwiQW5hbHl6ZXJEQVRBX1RZUEVTIiwiREFURSIsIlRJTUUiLCJEQVRFVElNRSIsIk5VTUJFUiIsIklOVCIsIkZMT0FUIiwiQk9PTEVBTiIsIlNUUklORyIsIkdFT01FVFJZIiwiR0VPTUVUUllfRlJPTV9TVFJJTkciLCJQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HIiwiWklQQ09ERSIsIkFSUkFZIiwiT0JKRUNUIiwiQ1NWX05VTExTIiwiSUdOT1JFX0RBVEFfVFlQRVMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwidHlwZSIsImluY2x1ZGVzIiwiUEFSU0VfRklFTERfVkFMVUVfRlJPTV9TVFJJTkciLCJBTExfRklFTERfVFlQRVMiLCJ2YWxpZCIsImQiLCJwYXJzZSIsImludGVnZXIiLCJwYXJzZUludCIsInRpbWVzdGFtcCIsImZpZWxkIiwiZm9ybWF0IiwiTnVtYmVyIiwicmVhbCIsInBhcnNlRmxvYXQiLCJwcm9jZXNzQ3N2RGF0YSIsInJhd0RhdGEiLCJoZWFkZXIiLCJyb3dzIiwiaGVhZGVyUm93IiwicGFyc2VkUm93cyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsIkVycm9yIiwic2xpY2UiLCJjbGVhblVwRmFsc3lDc3ZWYWx1ZSIsInNhbXBsZSIsImdldFNhbXBsZUZvclR5cGVBbmFseXplIiwiZmllbGRzIiwiZ2V0RmllbGRzRnJvbURhdGEiLCJwYXJzZVJvd3NCeUZpZWxkcyIsImNvbnNvbGUiLCJsb2ciLCJnZW9qc29uRmllbGRJZHgiLCJmaW5kSW5kZXgiLCJmIiwibmFtZSIsImZvckVhY2giLCJwYXJzZUNzdlJvd3NCeUZpZWxkVHlwZSIsImJpbmQiLCJzYW1wbGVDb3VudCIsInRvdGFsIiwiTWF0aCIsIm1pbiIsIm1hcCIsImZpZWxkSWR4IiwiaSIsImoiLCJ2YWx1ZSIsInRyaW0iLCJyZSIsIlJlZ0V4cCIsIm1hdGNoIiwiZ2VvRmllbGRJZHgiLCJwYXJzZXIiLCJmaXJzdCIsImZpbmQiLCJyIiwicm93IiwicHJvcGVydGllcyIsImRhdGEiLCJmaWVsZE9yZGVyIiwibWV0YWRhdGEiLCJBbmFseXplciIsImNvbXB1dGVDb2xNZXRhIiwicmVnZXgiLCJkYXRhVHlwZSIsImlnbm9yZWREYXRhVHlwZXMiLCJyZW5hbWVEdXBsaWNhdGVGaWVsZHMiLCJmaWVsZEJ5SW5kZXgiLCJyZXN1bHQiLCJpbmRleCIsImZpZWxkTWV0YSIsIm0iLCJrZXkiLCJpZCIsImRpc3BsYXlOYW1lIiwiYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUiLCJhbmFseXplclR5cGUiLCJ2YWx1ZUFjY2Vzc29yIiwiZGMiLCJ2YWx1ZUF0IiwicmVkdWNlIiwiYWNjdSIsImFsbE5hbWVzIiwiZmllbGROYW1lIiwiY291bnRlciIsInB1c2giLCJhVHlwZSIsImRhdGUiLCJnZW9qc29uIiwic3RyaW5nIiwiZ2xvYmFsQ29uc29sZSIsIndhcm4iLCJwcm9jZXNzUm93T2JqZWN0IiwicHJvY2Vzc0dlb2pzb24iLCJub3JtYWxpemVkR2VvanNvbiIsImZlYXR1cmVzIiwiZXJyb3IiLCJHVUlERVNfRklMRV9GT1JNQVRfRE9DIiwiYWxsRGF0YVJvd3MiLCJnZW9tZXRyeSIsIl9nZW9qc29uIiwicHJldiIsImN1cnIiLCJwcm9jZXNzR29vZ2xlVHJhY2tHZW9qc29uIiwiZGYiLCJ0b0FycmF5IiwibGlzdENvbHVtbnMiLCJwcm9jZXNzR29vZ2xlU2VtYW50aWNHZW9qc29uIiwiZGZfZGljdCIsImFjdGl2aXR5X3Jlc3VsdCIsImFjaXRpdml0eSIsInBsYWNlX3Jlc3VsdCIsInBsYWNlIiwicHJvY2Vzc1RyYWNrVG9UcmlwR2VvanNvbiIsInRyYWNrX2FycmF5IiwidHVyZiIsImxpbmVTdHJpbmciLCJ4IiwibG5nIiwibGF0IiwiYWx0aXR1ZGUiLCJmb3JtYXRDc3YiLCJkYXRhQ29udGFpbmVyIiwiY29sdW1ucyIsImZvcm1hdHRlZERhdGEiLCJ2YWxpZGF0ZUlucHV0RGF0YSIsImFsbFZhbGlkIiwiZXZlcnkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmluZE5vbkVtcHR5Um93c0F0RmllbGQiLCJ0cyIsImFuYWx5emVkVHlwZSIsImNhdGVnb3J5Iiwic2FtcGxlRGF0YSIsIm1ldGEiLCJ1cGRhdGVkRmllbGRzIiwicHJvY2Vzc0tlcGxlcmdsSlNPTiIsIktlcGxlckdsU2NoZW1hIiwibG9hZCIsImRhdGFzZXRzIiwiY29uZmlnIiwicHJvY2Vzc0tlcGxlcmdsRGF0YXNldCIsInJlc3VsdHMiLCJwYXJzZVNhdmVkRGF0YSIsIkRBVEFTRVRfSEFORExFUlMiLCJEQVRBU0VUX0ZPUk1BVFMiLCJjc3YiLCJrZXBsZXJnbCIsImdvb2dsZV9zZW1hbnRpYyIsImdvb2dsZV90cmFjayIsIlByb2Nlc3NvcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsdUJBQXVCLEdBQUcsQ0FDckNDLHlCQUFtQkMsSUFEa0IsRUFFckNELHlCQUFtQkUsSUFGa0IsRUFHckNGLHlCQUFtQkcsUUFIa0IsRUFJckNILHlCQUFtQkksTUFKa0IsRUFLckNKLHlCQUFtQkssR0FMa0IsRUFNckNMLHlCQUFtQk0sS0FOa0IsRUFPckNOLHlCQUFtQk8sT0FQa0IsRUFRckNQLHlCQUFtQlEsTUFSa0IsRUFTckNSLHlCQUFtQlMsUUFUa0IsRUFVckNULHlCQUFtQlUsb0JBVmtCLEVBV3JDVix5QkFBbUJXLHlCQVhrQixFQVlyQ1gseUJBQW1CWSxPQVprQixFQWFyQ1oseUJBQW1CYSxLQWJrQixFQWNyQ2IseUJBQW1CYyxNQWRrQixDQUFoQyxDLENBaUJQO0FBQ0E7QUFDQTs7O0FBQ08sSUFBTUMsU0FBUyxHQUFHLDhCQUFsQjs7QUFFUCxJQUFNQyxpQkFBaUIsR0FB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R0FBR0wsb0JBQWVNLGNBQWYsQ0FBOEIsb0JBQVFuSSxPQUFSLENBQTlCLENBQWhCOztBQUNBLE1BQUksQ0FBQ2tJLE9BQUwsRUFBYztBQUNaLFdBQU8sSUFBUDtBQUNEOztBQUNELFNBQU83SCxLQUFLLENBQUNDLE9BQU4sQ0FBY04sT0FBZCxJQUF5QmtJLE9BQXpCLEdBQW1DQSxPQUFPLENBQUMsQ0FBRCxDQUFqRDtBQUNEOztBQUVNLElBQU1FLGdCQUFnQixnRkFDMUJDLGlDQUFnQjFGLEdBRFUsRUFDSm9DLGdCQURJLHVEQUUxQnNELGlDQUFnQjFELE9BRlUsRUFFQUssY0FGQSx1REFHMUJxRCxpQ0FBZ0JDLEdBSFUsRUFHSnZJLGNBSEksdURBSTFCc0ksaUNBQWdCRSxRQUpVLEVBSUNOLHNCQUpELHVEQUsxQkksaUNBQWdCRyxlQUxVLEVBS08xQyw0QkFMUCx1REFNMUJ1QyxpQ0FBZ0JJLFlBTlUsRUFNSS9DLHlCQU5KLHFCQUF0QixDLENBU1A7OztBQUNPLElBQU1nRCxVQUFVLEdBQUc7QUFDeEIxRCxFQUFBQSxjQUFjLEVBQWRBLGNBRHdCO0FBRXhCakYsRUFBQUEsY0FBYyxFQUFkQSxjQUZ3QjtBQUd4QmdGLEVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBSHdCO0FBSXhCNkMsRUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFKd0I7QUFLeEJLLEVBQUFBLHNCQUFzQixFQUF0QkEsc0JBTHdCO0FBTXhCbkUsRUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFOd0I7QUFPeEJoRCxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQVB3QjtBQVF4QlMsRUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFSd0I7QUFTeEJxRixFQUFBQSxTQUFTLEVBQVRBLFNBVHdCO0FBVXhCbEIsRUFBQUEseUJBQXlCLEVBQXpCQSx5QkFWd0I7QUFXeEJJLEVBQUFBLDRCQUE0QixFQUE1QkE7QUFYd0IsQ0FBbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NzdlBhcnNlUm93cywgY3N2Rm9ybWF0Um93c30gZnJvbSAnZDMtZHN2JztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7Y29uc29sZSBhcyBnbG9iYWxDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7QW5hbHl6ZXIsIERBVEFfVFlQRVMgYXMgQW5hbHl6ZXJEQVRBX1RZUEVTfSBmcm9tICd0eXBlLWFuYWx5emVyJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnQG1hcGJveC9nZW9qc29uLW5vcm1hbGl6ZSc7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFUywgREFUQVNFVF9GT1JNQVRTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge25vdE51bGxvclVuZGVmaW5lZCwgcGFyc2VGaWVsZFZhbHVlfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcbmltcG9ydCBLZXBsZXJHbFNjaGVtYSBmcm9tICdzY2hlbWFzJztcbmltcG9ydCB7R1VJREVTX0ZJTEVfRk9STUFUX0RPQ30gZnJvbSAnY29uc3RhbnRzL3VzZXItZ3VpZGVzJztcbmltcG9ydCB7aXNQbGFpbk9iamVjdCwgdG9BcnJheX0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5pbXBvcnQgKiBhcyB0dXJmIGZyb20gJ0B0dXJmL3R1cmYnO1xuaW1wb3J0IHtyZWFkX2dwc19tb2JpbGl0eSwgcmVhZF9zZW1hbnRpY19tb2JpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZ29vZ2xlLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IEFDQ0VQVEVEX0FOQUxZWkVSX1RZUEVTID0gW1xuICBBbmFseXplckRBVEFfVFlQRVMuREFURSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLlRJTUUsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5EQVRFVElNRSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLk5VTUJFUixcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLklOVCxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkZMT0FULFxuICBBbmFseXplckRBVEFfVFlQRVMuQk9PTEVBTixcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLlNUUklORyxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkdFT01FVFJZLFxuICBBbmFseXplckRBVEFfVFlQRVMuR0VPTUVUUllfRlJPTV9TVFJJTkcsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5QQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HLFxuICBBbmFseXplckRBVEFfVFlQRVMuWklQQ09ERSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkFSUkFZLFxuICBBbmFseXplckRBVEFfVFlQRVMuT0JKRUNUXG5dO1xuXG4vLyBpZiBhbnkgb2YgdGhlc2UgdmFsdWUgb2NjdXJzIGluIGNzdiwgcGFyc2UgaXQgdG8gbnVsbDtcbi8vIGNvbnN0IENTVl9OVUxMUyA9IFsnJywgJ251bGwnLCAnTlVMTCcsICdOdWxsJywgJ05hTicsICcvTiddO1xuLy8gbWF0Y2hlcyBlbXB0eSBzdHJpbmdcbmV4cG9ydCBjb25zdCBDU1ZfTlVMTFMgPSAvXihudWxsfE5VTEx8TnVsbHxOYU58XFwvTnx8KSQvO1xuXG5jb25zdCBJR05PUkVfREFUQV9UWVBFUyA9IE9iamVjdC5rZXlzKEFuYWx5emVyREFUQV9UWVBFUykuZmlsdGVyKFxuICB0eXBlID0+ICFBQ0NFUFRFRF9BTkFMWVpFUl9UWVBFUy5pbmNsdWRlcyh0eXBlKVxuKTtcblxuZXhwb3J0IGNvbnN0IFBBUlNFX0ZJRUxEX1ZBTFVFX0ZST01fU1RSSU5HID0ge1xuICBbQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW5dOiB7XG4gICAgdmFsaWQ6IGQgPT4gdHlwZW9mIGQgPT09ICdib29sZWFuJyxcbiAgICBwYXJzZTogZCA9PiBkID09PSAndHJ1ZScgfHwgZCA9PT0gJ1RydWUnIHx8IGQgPT09ICdUUlVFJyB8fCBkID09PSAnMSdcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXToge1xuICAgIHZhbGlkOiBkID0+IHBhcnNlSW50KGQsIDEwKSA9PT0gZCxcbiAgICBwYXJzZTogZCA9PiBwYXJzZUludChkLCAxMClcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXBdOiB7XG4gICAgdmFsaWQ6IChkLCBmaWVsZCkgPT5cbiAgICAgIFsneCcsICdYJ10uaW5jbHVkZXMoZmllbGQuZm9ybWF0KSA/IHR5cGVvZiBkID09PSAnbnVtYmVyJyA6IHR5cGVvZiBkID09PSAnc3RyaW5nJyxcbiAgICBwYXJzZTogKGQsIGZpZWxkKSA9PiAoWyd4JywgJ1gnXS5pbmNsdWRlcyhmaWVsZC5mb3JtYXQpID8gTnVtYmVyKGQpIDogZClcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXToge1xuICAgIHZhbGlkOiBkID0+IHBhcnNlRmxvYXQoZCkgPT09IGQsXG4gICAgLy8gTm90ZSB0aGlzIHdpbGwgcmVzdWx0IGluIE5hTiBmb3Igc29tZSBzdHJpbmdcbiAgICBwYXJzZTogcGFyc2VGbG9hdFxuICB9XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgY3N2IGRhdGEsIG91dHB1dCBhIGRhdGEgb2JqZWN0IHdpdGggYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gLlxuICogVGhlIGRhdGEgb2JqZWN0IGNhbiBiZSB3cmFwcGVkIGluIGEgYGRhdGFzZXRgIGFuZCBwYXNzIHRvIFtgYWRkRGF0YVRvTWFwYF0oLi4vYWN0aW9ucy9hY3Rpb25zLm1kI2FkZGRhdGF0b21hcClcbiAqIEBwYXJhbSByYXdEYXRhIHJhdyBjc3Ygc3RyaW5nXG4gKiBAcmV0dXJucyAgZGF0YSBvYmplY3QgYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gIGNhbiBiZSBwYXNzZWQgdG8gYWRkRGF0YVRvTWFwc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YS1wcm9jZXNzb3InKS5wcm9jZXNzQ3N2RGF0YX1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge3Byb2Nlc3NDc3ZEYXRhfSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgdGVzdERhdGEgPSBgZ3BzX2RhdGEudXRjX3RpbWVzdGFtcCxncHNfZGF0YS5sYXQsZ3BzX2RhdGEubG5nLGdwc19kYXRhLnR5cGVzLGVwb2NoLGhhc19yZXN1bHQsaWQsdGltZSxiZWdpbnRyaXBfdHNfdXRjLGJlZ2ludHJpcF90c19sb2NhbCxkYXRlXG4gKiAyMDE2LTA5LTE3IDAwOjA5OjU1LDI5Ljk5MDA5MzcsMzEuMjU5MDU0Mixkcml2ZXJfYW5hbHl0aWNzLDE0NzI2ODgwMDAwMDAsRmFsc2UsMSwyMDE2LTA5LTIzVDAwOjAwOjAwLjAwMFosMjAxNi0xMC0wMSAwOTo0MTozOSswMDowMCwyMDE2LTEwLTAxIDA5OjQxOjM5KzAwOjAwLDIwMTYtMDktMjNcbiAqIDIwMTYtMDktMTcgMDA6MTA6NTYsMjkuOTkyNzY5OSwzMS4yNDYxMTQyLGRyaXZlcl9hbmFseXRpY3MsMTQ3MjY4ODAwMDAwMCxGYWxzZSwyLDIwMTYtMDktMjNUMDA6MDA6MDAuMDAwWiwyMDE2LTEwLTAxIDA5OjQ2OjM3KzAwOjAwLDIwMTYtMTAtMDEgMTY6NDY6MzcrMDA6MDAsMjAxNi0wOS0yM1xuICogMjAxNi0wOS0xNyAwMDoxMTo1NiwyOS45OTA3MjYxLDMxLjIzMTI3NDIsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDMsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLCwsMjAxNi0wOS0yM1xuICogMjAxNi0wOS0xNyAwMDoxMjo1OCwyOS45ODcwMDc0LDMxLjIxNzU4MjcsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDQsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLCwsMjAxNi0wOS0yM2BcbiAqXG4gKiBjb25zdCBkYXRhc2V0ID0ge1xuICogIGluZm86IHtpZDogJ3Rlc3RfZGF0YScsIGxhYmVsOiAnTXkgQ3N2J30sXG4gKiAgZGF0YTogcHJvY2Vzc0NzdkRhdGEodGVzdERhdGEpXG4gKiB9O1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcCh7XG4gKiAgZGF0YXNldHM6IFtkYXRhc2V0XSxcbiAqICBvcHRpb25zOiB7Y2VudGVyTWFwOiB0cnVlLCByZWFkT25seTogdHJ1ZX1cbiAqIH0pKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NDc3ZEYXRhKHJhd0RhdGEsIGhlYWRlcikge1xuICBsZXQgcm93cztcbiAgbGV0IGhlYWRlclJvdztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgLy8gY29uc29sZS5sb2coJ3JhdyBkYXRhJywgcmF3RGF0YSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIC8vIGNvbnNvbGUubG9nKCdoZWFkZXInLCBoZWFkZXIpO1xuXG4gIGlmICh0eXBlb2YgcmF3RGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBwYXJzZWRSb3dzID0gY3N2UGFyc2VSb3dzKHJhd0RhdGEpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcnNlZFJvd3MpIHx8IHBhcnNlZFJvd3MubGVuZ3RoIDwgMikge1xuICAgICAgLy8gbG9va3MgbGlrZSBhbiBlbXB0eSBmaWxlLCB0aHJvdyBlcnJvciB0byBiZSBjYXRjaFxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzIENzdiBEYXRhIEZhaWxlZDogQ1NWIGlzIGVtcHR5Jyk7XG4gICAgfVxuICAgIGhlYWRlclJvdyA9IHBhcnNlZFJvd3NbMF07XG4gICAgcm93cyA9IHBhcnNlZFJvd3Muc2xpY2UoMSk7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyYXdEYXRhKSAmJiByYXdEYXRhLmxlbmd0aCkge1xuICAgIHJvd3MgPSByYXdEYXRhO1xuICAgIGhlYWRlclJvdyA9IGhlYWRlcjtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShoZWFkZXJSb3cpKSB7XG4gICAgICAvLyBpZiBkYXRhIGlzIHBhc3NlZCBpbiBhcyBhcnJheSBvZiByb3dzIGFuZCBtaXNzaW5nIGhlYWRlclxuICAgICAgLy8gYXNzdW1lIGZpcnN0IHJvdyBpcyBoZWFkZXJcbiAgICAgIGhlYWRlclJvdyA9IHJhd0RhdGFbMF07XG4gICAgICByb3dzID0gcmF3RGF0YS5zbGljZSgxKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXJvd3MgfHwgIWhlYWRlclJvdykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbnB1dCBwYXNzZWQgdG8gcHJvY2Vzc0NzdkRhdGEnKTtcbiAgfVxuXG4gIC8vIGhlcmUgd2UgYXNzdW1lIHRoZSBjc3YgZmlsZSB0aGF0IHBlb3BsZSB1cGxvYWRlZCB3aWxsIGhhdmUgZmlyc3Qgcm93XG4gIC8vIGFzIG5hbWUgb2YgdGhlIGNvbHVtblxuXG4gIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpO1xuICAvLyBObyBuZWVkIHRvIHJ1biB0eXBlIGRldGVjdGlvbiBvbiBldmVyeSBkYXRhIHBvaW50XG4gIC8vIGhlcmUgd2UgZ2V0IGEgbGlzdCBvZiBub25lIG51bGwgdmFsdWVzIHRvIHJ1biBhbmFseXplIG9uXG4gIGNvbnN0IHNhbXBsZSA9IGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHM6IGhlYWRlclJvdywgcm93c30pO1xuICBjb25zdCBmaWVsZHMgPSBnZXRGaWVsZHNGcm9tRGF0YShzYW1wbGUsIGhlYWRlclJvdyk7XG4gIGNvbnN0IHBhcnNlZFJvd3MgPSBwYXJzZVJvd3NCeUZpZWxkcyhyb3dzLCBmaWVsZHMpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLmxvZyhmaWVsZHMsIHBhcnNlZFJvd3MpO1xuICByZXR1cm4ge2ZpZWxkcywgcm93czogcGFyc2VkUm93c307XG59XG5cbi8qKlxuICogUGFyc2Ugcm93cyBvZiBjc3YgYnkgYW5hbHl6ZWQgZmllbGQgdHlwZXMuIFNvIHRoYXQgYCcxJ2AgLT4gYDFgLCBgJ1RydWUnYCAtPiBgdHJ1ZWBcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSb3dzQnlGaWVsZHMocm93cywgZmllbGRzKSB7XG4gIC8vIEVkaXQgcm93cyBpbiBwbGFjZVxuICBjb25zdCBnZW9qc29uRmllbGRJZHggPSBmaWVsZHMuZmluZEluZGV4KGYgPT4gZi5uYW1lID09PSAnX2dlb2pzb24nKTtcbiAgZmllbGRzLmZvckVhY2gocGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUuYmluZChudWxsLCByb3dzLCBnZW9qc29uRmllbGRJZHgpKTtcblxuICByZXR1cm4gcm93cztcbn1cbi8qKlxuICogR2V0dGluZyBzYW1wbGUgZGF0YSBmb3IgYW5hbHl6aW5nIGZpZWxkIHR5cGUuXG4gKlxuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YS1wcm9jZXNzb3InKS5nZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHMsIHJvd3MsIHNhbXBsZUNvdW50ID0gNTB9KSB7XG4gIGNvbnN0IHRvdGFsID0gTWF0aC5taW4oc2FtcGxlQ291bnQsIHJvd3MubGVuZ3RoKTtcbiAgLy8gY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBzYW1wbGUgPSByYW5nZSgwLCB0b3RhbCwgMSkubWFwKGQgPT4gKHt9KSk7XG5cbiAgLy8gY29sbGVjdCBzYW1wbGUgZGF0YSBmb3IgZWFjaCBmaWVsZFxuICBmaWVsZHMuZm9yRWFjaCgoZmllbGQsIGZpZWxkSWR4KSA9PiB7XG4gICAgLy8gZGF0YSBjb3VudGVyXG4gICAgbGV0IGkgPSAwO1xuICAgIC8vIHNhbXBsZSBjb3VudGVyXG4gICAgbGV0IGogPSAwO1xuXG4gICAgd2hpbGUgKGogPCB0b3RhbCkge1xuICAgICAgaWYgKGkgPj0gcm93cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgZGVwbGV0ZWQgZGF0YSBwb29sXG4gICAgICAgIHNhbXBsZVtqXVtmaWVsZF0gPSBudWxsO1xuICAgICAgICBqKys7XG4gICAgICB9IGVsc2UgaWYgKG5vdE51bGxvclVuZGVmaW5lZChyb3dzW2ldW2ZpZWxkSWR4XSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSByb3dzW2ldW2ZpZWxkSWR4XTtcbiAgICAgICAgc2FtcGxlW2pdW2ZpZWxkXSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZS50cmltKCkgOiB2YWx1ZTtcbiAgICAgICAgaisrO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2FtcGxlO1xufVxuXG4vKipcbiAqIENvbnZlcnQgZmFsc3kgdmFsdWUgaW4gY3N2IGluY2x1ZGluZyBgJycsICdudWxsJywgJ05VTEwnLCAnTnVsbCcsICdOYU4nYCB0byBgbnVsbGAsXG4gKiBzbyB0aGF0IHR5cGUtYW5hbHl6ZXIgd29uJ3QgZGV0ZWN0IGl0IGFzIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpIHtcbiAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKENTVl9OVUxMUywgJ2cnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAvLyBhbmFseXplciB3aWxsIHNldCBhbnkgZmllbGRzIHRvICdzdHJpbmcnIGlmIHRoZXJlIGFyZSBlbXB0eSB2YWx1ZXNcbiAgICAgIC8vIHdoaWNoIHdpbGwgYmUgcGFyc2VkIGFzICcnIGJ5IGQzLmNzdlxuICAgICAgLy8gaGVyZSB3ZSBwYXJzZSBlbXB0eSBkYXRhIGFzIG51bGxcbiAgICAgIC8vIFRPRE86IGNyZWF0ZSB3YXJuaW5nIHdoZW4gZGVsdGVjdCBgQ1NWX05VTExTYCBpbiB0aGUgZGF0YVxuICAgICAgaWYgKHR5cGVvZiByb3dzW2ldW2pdID09PSAnc3RyaW5nJyAmJiByb3dzW2ldW2pdLm1hdGNoKHJlKSkge1xuICAgICAgICByb3dzW2ldW2pdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBQcm9jZXNzIHVwbG9hZGVkIGNzdiBmaWxlIHRvIHBhcnNlIHZhbHVlIGJ5IGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0gcm93c1xuICogQHBhcmFtIGdlb0ZpZWxkSWR4IGZpZWxkIGluZGV4XG4gKiBAcGFyYW0gZmllbGRcbiAqIEBwYXJhbSBpXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9kYXRhLXByb2Nlc3NvcicpLnBhcnNlQ3N2Um93c0J5RmllbGRUeXBlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUocm93cywgZ2VvRmllbGRJZHgsIGZpZWxkLCBpKSB7XG4gIGNvbnN0IHBhcnNlciA9IFBBUlNFX0ZJRUxEX1ZBTFVFX0ZST01fU1RSSU5HW2ZpZWxkLnR5cGVdO1xuICBpZiAocGFyc2VyKSB7XG4gICAgLy8gY2hlY2sgZmlyc3Qgbm90IG51bGwgdmFsdWUgb2YgaXQncyBhbHJlYWR5IHBhcnNlZFxuICAgIGNvbnN0IGZpcnN0ID0gcm93cy5maW5kKHIgPT4gbm90TnVsbG9yVW5kZWZpbmVkKHJbaV0pKTtcbiAgICBpZiAoIWZpcnN0IHx8IHBhcnNlci52YWxpZChmaXJzdFtpXSwgZmllbGQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgLy8gcGFyc2Ugc3RyaW5nIHZhbHVlIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAgICAgIGlmIChyb3dbaV0gIT09IG51bGwpIHtcbiAgICAgICAgcm93W2ldID0gcGFyc2VyLnBhcnNlKHJvd1tpXSwgZmllbGQpO1xuICAgICAgICBpZiAoZ2VvRmllbGRJZHggPiAtMSAmJiByb3dbZ2VvRmllbGRJZHhdICYmIHJvd1tnZW9GaWVsZElkeF0ucHJvcGVydGllcykge1xuICAgICAgICAgIHJvd1tnZW9GaWVsZElkeF0ucHJvcGVydGllc1tmaWVsZC5uYW1lXSA9IHJvd1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQW5hbHl6ZSBmaWVsZCB0eXBlcyBmcm9tIGRhdGEgaW4gYHN0cmluZ2AgZm9ybWF0LCBlLmcuIHVwbG9hZGVkIGNzdi5cbiAqIEFzc2lnbiBgdHlwZWAsIGBmaWVsZElkeGAgYW5kIGBmb3JtYXRgICh0aW1lc3RhbXAgb25seSkgdG8gZWFjaCBmaWVsZFxuICpcbiAqIEBwYXJhbSBkYXRhIGFycmF5IG9mIHJvdyBvYmplY3RcbiAqIEBwYXJhbSBmaWVsZE9yZGVyIGFycmF5IG9mIGZpZWxkIG5hbWVzIGFzIHN0cmluZ1xuICogQHJldHVybnMgZm9ybWF0dGVkIGZpZWxkc1xuICogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vZGF0YS1wcm9jZXNzb3InKS5nZXRGaWVsZHNGcm9tRGF0YX1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IHtnZXRGaWVsZHNGcm9tRGF0YX0gZnJvbSAna2VwbGVyLmdsL3Byb2Nlc3NvcnMnO1xuICogY29uc3QgZGF0YSA9IFt7XG4gKiAgIHRpbWU6ICcyMDE2LTA5LTE3IDAwOjA5OjU1JyxcbiAqICAgdmFsdWU6ICc0JyxcbiAqICAgc3VyZ2U6ICcxLjInLFxuICogICBpc1RyaXA6ICd0cnVlJyxcbiAqICAgemVyb09uZXM6ICcwJ1xuICogfSwge1xuICogICB0aW1lOiAnMjAxNi0wOS0xNyAwMDozMDowOCcsXG4gKiAgIHZhbHVlOiAnMycsXG4gKiAgIHN1cmdlOiBudWxsLFxuICogICBpc1RyaXA6ICdmYWxzZScsXG4gKiAgIHplcm9PbmVzOiAnMSdcbiAqIH0sIHtcbiAqICAgdGltZTogbnVsbCxcbiAqICAgdmFsdWU6ICcyJyxcbiAqICAgc3VyZ2U6ICcxLjMnLFxuICogICBpc1RyaXA6IG51bGwsXG4gKiAgIHplcm9PbmVzOiAnMSdcbiAqIH1dO1xuICpcbiAqIGNvbnN0IGZpZWxkT3JkZXIgPSBbJ3RpbWUnLCAndmFsdWUnLCAnc3VyZ2UnLCAnaXNUcmlwJywgJ3plcm9PbmVzJ107XG4gKiBjb25zdCBmaWVsZHMgPSBnZXRGaWVsZHNGcm9tRGF0YShkYXRhLCBmaWVsZE9yZGVyKTtcbiAqIC8vIGZpZWxkcyA9IFtcbiAqIC8vIHtuYW1lOiAndGltZScsIGZvcm1hdDogJ1lZWVktTS1EIEg6bTpzJywgZmllbGRJZHg6IDEsIHR5cGU6ICd0aW1lc3RhbXAnfSxcbiAqIC8vIHtuYW1lOiAndmFsdWUnLCBmb3JtYXQ6ICcnLCBmaWVsZElkeDogNCwgdHlwZTogJ2ludGVnZXInfSxcbiAqIC8vIHtuYW1lOiAnc3VyZ2UnLCBmb3JtYXQ6ICcnLCBmaWVsZElkeDogNSwgdHlwZTogJ3JlYWwnfSxcbiAqIC8vIHtuYW1lOiAnaXNUcmlwJywgZm9ybWF0OiAnJywgZmllbGRJZHg6IDYsIHR5cGU6ICdib29sZWFuJ30sXG4gKiAvLyB7bmFtZTogJ3plcm9PbmVzJywgZm9ybWF0OiAnJywgZmllbGRJZHg6IDcsIHR5cGU6ICdpbnRlZ2VyJ31dO1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkc0Zyb21EYXRhKGRhdGEsIGZpZWxkT3JkZXIpIHtcbiAgLy8gYWRkIGEgY2hlY2sgZm9yIGVwb2NoIHRpbWVzdGFtcFxuICBjb25zdCBtZXRhZGF0YSA9IEFuYWx5emVyLmNvbXB1dGVDb2xNZXRhKFxuICAgIGRhdGEsXG4gICAgW1xuICAgICAge3JlZ2V4OiAvLipnZW9qc29ufGFsbF9wb2ludHMvZywgZGF0YVR5cGU6ICdHRU9NRVRSWSd9LFxuICAgICAge3JlZ2V4OiAvLipjZW5zdXMvZywgZGF0YVR5cGU6ICdTVFJJTkcnfVxuICAgIF0sXG4gICAge2lnbm9yZWREYXRhVHlwZXM6IElHTk9SRV9EQVRBX1RZUEVTfVxuICApO1xuXG4gIGNvbnN0IHtmaWVsZEJ5SW5kZXh9ID0gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGZpZWxkT3JkZXIubWFwKChmaWVsZCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZmllbGRCeUluZGV4W2luZGV4XTtcblxuICAgIGNvbnN0IGZpZWxkTWV0YSA9IG1ldGFkYXRhLmZpbmQobSA9PiBtLmtleSA9PT0gZmllbGQpO1xuICAgIGNvbnN0IHt0eXBlLCBmb3JtYXR9ID0gZmllbGRNZXRhIHx8IHt9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBpZDogbmFtZSxcbiAgICAgIGRpc3BsYXlOYW1lOiBuYW1lLFxuICAgICAgZm9ybWF0LFxuICAgICAgZmllbGRJZHg6IGluZGV4LFxuICAgICAgdHlwZTogYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUodHlwZSksXG4gICAgICBhbmFseXplclR5cGU6IHR5cGUsXG4gICAgICB2YWx1ZUFjY2Vzc29yOiBkYyA9PiBkID0+IHtcbiAgICAgICAgcmV0dXJuIGRjLnZhbHVlQXQoZC5pbmRleCwgaW5kZXgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBwYXNzIGluIGFuIGFycmF5IG9mIGZpZWxkIG5hbWVzLCByZW5hbWUgZHVwbGljYXRlZCBvbmVcbiAqIGFuZCByZXR1cm4gYSBtYXAgZnJvbSBvbGQgZmllbGQgaW5kZXggdG8gbmV3IG5hbWVcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZE9yZGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXcgZmllbGQgbmFtZSBieSBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpIHtcbiAgcmV0dXJuIGZpZWxkT3JkZXIucmVkdWNlKFxuICAgIChhY2N1LCBmaWVsZCwgaSkgPT4ge1xuICAgICAgY29uc3Qge2FsbE5hbWVzfSA9IGFjY3U7XG4gICAgICBsZXQgZmllbGROYW1lID0gZmllbGQ7XG5cbiAgICAgIC8vIGFkZCBhIGNvdW50ZXIgdG8gZHVwbGljYXRlZCBuYW1lc1xuICAgICAgaWYgKGFsbE5hbWVzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChhbGxOYW1lcy5pbmNsdWRlcyhgJHtmaWVsZH0tJHtjb3VudGVyfWApKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkTmFtZSA9IGAke2ZpZWxkfS0ke2NvdW50ZXJ9YDtcbiAgICAgIH1cblxuICAgICAgYWNjdS5maWVsZEJ5SW5kZXhbaV0gPSBmaWVsZE5hbWU7XG4gICAgICBhY2N1LmFsbE5hbWVzLnB1c2goZmllbGROYW1lKTtcblxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSxcbiAgICB7YWxsTmFtZXM6IFtdLCBmaWVsZEJ5SW5kZXg6IHt9fVxuICApO1xufVxuXG4vKipcbiAqIENvbnZlcnQgdHlwZS1hbmFseXplciBvdXRwdXQgdG8ga2VwbGVyLmdsIGZpZWxkIHR5cGVzXG4gKlxuICogQHBhcmFtIGFUeXBlXG4gKiBAcmV0dXJucyBjb3JyZXNwb25kaW5nIHR5cGUgaW4gYEFMTF9GSUVMRF9UWVBFU2BcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGEtcHJvY2Vzc29yJykuYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGV9fVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUoYVR5cGUpIHtcbiAgY29uc3Qge1xuICAgIERBVEUsXG4gICAgVElNRSxcbiAgICBEQVRFVElNRSxcbiAgICBOVU1CRVIsXG4gICAgSU5ULFxuICAgIEZMT0FULFxuICAgIEJPT0xFQU4sXG4gICAgU1RSSU5HLFxuICAgIEdFT01FVFJZLFxuICAgIEdFT01FVFJZX0ZST01fU1RSSU5HLFxuICAgIFBBSVJfR0VPTUVUUllfRlJPTV9TVFJJTkcsXG4gICAgWklQQ09ERSxcbiAgICBBUlJBWSxcbiAgICBPQkpFQ1RcbiAgfSA9IEFuYWx5emVyREFUQV9UWVBFUztcblxuICAvLyBUT0RPOiB1biByZWNvZ25pemVkIHR5cGVzXG4gIC8vIENVUlJFTkNZIFBFUkNFTlQgTk9ORVxuICBzd2l0Y2ggKGFUeXBlKSB7XG4gICAgY2FzZSBEQVRFOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5kYXRlO1xuICAgIGNhc2UgVElNRTpcbiAgICBjYXNlIERBVEVUSU1FOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gICAgY2FzZSBGTE9BVDpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMucmVhbDtcbiAgICBjYXNlIElOVDpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuaW50ZWdlcjtcbiAgICBjYXNlIEJPT0xFQU46XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW47XG4gICAgY2FzZSBHRU9NRVRSWTpcbiAgICBjYXNlIEdFT01FVFJZX0ZST01fU1RSSU5HOlxuICAgIGNhc2UgUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORzpcbiAgICBjYXNlIEFSUkFZOlxuICAgIGNhc2UgT0JKRUNUOlxuICAgICAgLy8gVE9ETzogY3JlYXRlIGEgbmV3IGRhdGEgdHlwZSBmb3Igb2JqZWN0cyBhbmQgYXJyYXlzXG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb247XG4gICAgY2FzZSBOVU1CRVI6XG4gICAgY2FzZSBTVFJJTkc6XG4gICAgY2FzZSBaSVBDT0RFOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGdsb2JhbENvbnNvbGUud2FybihgVW5zdXBwb3J0ZWQgYW5hbHl6ZXIgdHlwZTogJHthVHlwZX1gKTtcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuc3RyaW5nO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLyoqXG4gKiBQcm9jZXNzIGRhdGEgd2hlcmUgZWFjaCByb3cgaXMgYW4gb2JqZWN0LCBvdXRwdXQgY2FuIGJlIHBhc3NlZCB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApXG4gKiBOT1RFOiBUaGlzIGZ1bmN0aW9uIG1heSBtdXRhdGUgaW5wdXQuXG4gKiBAcGFyYW0gcmF3RGF0YSBhbiBhcnJheSBvZiByb3cgb2JqZWN0LCBlYWNoIG9iamVjdCBzaG91bGQgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2Yga2V5c1xuICogQHJldHVybnMgZGF0YXNldCBjb250YWluaW5nIGBmaWVsZHNgIGFuZCBgcm93c2BcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGEtcHJvY2Vzc29yJykucHJvY2Vzc1Jvd09iamVjdH1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge2FkZERhdGFUb01hcH0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICogaW1wb3J0IHtwcm9jZXNzUm93T2JqZWN0fSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgZGF0YSA9IFtcbiAqICB7bGF0OiAzMS4yNywgbG5nOiAxMjcuNTYsIHZhbHVlOiAzfSxcbiAqICB7bGF0OiAzMS4yMiwgbG5nOiAxMjYuMjYsIHZhbHVlOiAxfVxuICogXTtcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAoe1xuICogIGRhdGFzZXRzOiB7XG4gKiAgICBpbmZvOiB7bGFiZWw6ICdNeSBEYXRhJywgaWQ6ICdteV9kYXRhJ30sXG4gKiAgICBkYXRhOiBwcm9jZXNzUm93T2JqZWN0KGRhdGEpXG4gKiAgfVxuICogfSkpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1Jvd09iamVjdChyYXdEYXRhKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShyYXdEYXRhKSB8fCAhcmF3RGF0YS5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyYXdEYXRhWzBdKTtcbiAgY29uc3Qgcm93cyA9IHJhd0RhdGEubWFwKGQgPT4ga2V5cy5tYXAoa2V5ID0+IGRba2V5XSkpO1xuXG4gIC8vIHJvdyBvYmplY3QgYW4gc3RpbGwgY29udGFpbiB2YWx1ZXMgbGlrZSBgTnVsbGAgb3IgYE4vQWBcbiAgY2xlYW5VcEZhbHN5Q3N2VmFsdWUocm93cyk7XG5cbiAgcmV0dXJuIHByb2Nlc3NDc3ZEYXRhKHJvd3MsIGtleXMpO1xufVxuXG4vKipcbiAqIFByb2Nlc3MgR2VvSlNPTiBbYEZlYXR1cmVDb2xsZWN0aW9uYF0oaHR0cDovL3dpa2kuZ2VvanNvbi5vcmcvR2VvSlNPTl9kcmFmdF92ZXJzaW9uXzYjRmVhdHVyZUNvbGxlY3Rpb24pLFxuICogb3V0cHV0IGEgZGF0YSBvYmplY3Qgd2l0aCBge2ZpZWxkczogW10sIHJvd3M6IFtdfWAuXG4gKiBUaGUgZGF0YSBvYmplY3QgY2FuIGJlIHdyYXBwZWQgaW4gYSBgZGF0YXNldGAgYW5kIHBhc3NlZCB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApXG4gKiBOT1RFOiBUaGlzIGZ1bmN0aW9uIG1heSBtdXRhdGUgaW5wdXQuXG4gKlxuICogQHBhcmFtICByYXdEYXRhIHJhdyBnZW9qc29uIGZlYXR1cmUgY29sbGVjdGlvblxuICogQHJldHVybnMgIGRhdGFzZXQgY29udGFpbmluZyBgZmllbGRzYCBhbmQgYHJvd3NgXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9kYXRhLXByb2Nlc3NvcicpLnByb2Nlc3NHZW9qc29ufVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQge3Byb2Nlc3NHZW9qc29ufSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgZ2VvanNvbiA9IHtcbiAqIFx0XCJ0eXBlXCIgOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gKiBcdFwiZmVhdHVyZXNcIiA6IFt7XG4gKiBcdFx0XCJ0eXBlXCIgOiBcIkZlYXR1cmVcIixcbiAqIFx0XHRcInByb3BlcnRpZXNcIiA6IHtcbiAqIFx0XHRcdFwiY2FwYWNpdHlcIiA6IFwiMTBcIixcbiAqIFx0XHRcdFwidHlwZVwiIDogXCJVLVJhY2tcIlxuICogXHRcdH0sXG4gKiBcdFx0XCJnZW9tZXRyeVwiIDoge1xuICogXHRcdFx0XCJ0eXBlXCIgOiBcIlBvaW50XCIsXG4gKiBcdFx0XHRcImNvb3JkaW5hdGVzXCIgOiBbIC03MS4wNzMyODMsIDQyLjQxNzUwMCBdXG4gKiBcdFx0fVxuICogXHR9XVxuICogfTtcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAoe1xuICogIGRhdGFzZXRzOiB7XG4gKiAgICBpbmZvOiB7XG4gKiAgICAgIGxhYmVsOiAnU2FtcGxlIFRheGkgVHJpcHMgaW4gTmV3IFlvcmsgQ2l0eScsXG4gKiAgICAgIGlkOiAndGVzdF90cmlwX2RhdGEnXG4gKiAgICB9LFxuICogICAgZGF0YTogcHJvY2Vzc0dlb2pzb24oZ2VvanNvbilcbiAqICB9XG4gKiB9KSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzR2VvanNvbihyYXdEYXRhKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRHZW9qc29uID0gbm9ybWFsaXplKHJhd0RhdGEpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLmxvZyhub3JtYWxpemVkR2VvanNvbik7XG5cbiAgaWYgKCFub3JtYWxpemVkR2VvanNvbiB8fCAhQXJyYXkuaXNBcnJheShub3JtYWxpemVkR2VvanNvbi5mZWF0dXJlcykpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgIGBSZWFkIEZpbGUgRmFpbGVkOiBGaWxlIGlzIG5vdCBhIHZhbGlkIEdlb0pTT04uIFJlYWQgbW9yZSBhYm91dCBbc3VwcG9ydGVkIGZpbGUgZm9ybWF0XSgke0dVSURFU19GSUxFX0ZPUk1BVF9ET0N9KWBcbiAgICApO1xuICAgIHRocm93IGVycm9yO1xuICAgIC8vIGZhaWwgdG8gbm9ybWFsaXplIGdlb2pzb25cbiAgfVxuXG4gIC8vIGdldHRpbmcgYWxsIGZlYXR1cmUgZmllbGRzXG4gIGNvbnN0IGFsbERhdGFSb3dzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmID0gbm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXNbaV07XG4gICAgaWYgKGYuZ2VvbWV0cnkpIHtcbiAgICAgIGFsbERhdGFSb3dzLnB1c2goe1xuICAgICAgICAvLyBhZGQgZmVhdHVyZSB0byBfZ2VvanNvbiBmaWVsZFxuICAgICAgICBfZ2VvanNvbjogZixcbiAgICAgICAgLi4uKGYucHJvcGVydGllcyB8fCB7fSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgYWxsIHRoZSBmaWVsZFxuICBjb25zdCBmaWVsZHMgPSBhbGxEYXRhUm93cy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICBPYmplY3Qua2V5cyhjdXJyKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXByZXYuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBwcmV2LnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcHJldjtcbiAgfSwgW10pO1xuXG4gIC8vIG1ha2Ugc3VyZSBlYWNoIGZlYXR1cmUgaGFzIGV4YWN0IHNhbWUgZmllbGRzXG4gIGFsbERhdGFSb3dzLmZvckVhY2goZCA9PiB7XG4gICAgZmllbGRzLmZvckVhY2goZiA9PiB7XG4gICAgICBpZiAoIShmIGluIGQpKSB7XG4gICAgICAgIGRbZl0gPSBudWxsO1xuICAgICAgICBkLl9nZW9qc29uLnByb3BlcnRpZXNbZl0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcHJvY2Vzc1Jvd09iamVjdChhbGxEYXRhUm93cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzR29vZ2xlVHJhY2tHZW9qc29uKHJhd0RhdGEpIHtcbiAgY29uc3QgZGYgPSByZWFkX2dwc19tb2JpbGl0eShyYXdEYXRhKVxuICBjb25zb2xlLmxvZyhkZik7XG4gIHJldHVybiBwcm9jZXNzQ3N2RGF0YShkZi50b0FycmF5KCksIGRmLmxpc3RDb2x1bW5zKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0dvb2dsZVNlbWFudGljR2VvanNvbihyYXdEYXRhKSB7XG4gIGNvbnN0IGRmX2RpY3QgPSByZWFkX3NlbWFudGljX21vYmlsaXR5KHJhd0RhdGEpXG4gIGNvbnNvbGUubG9nKCdkZl9kaWN0X3BsYWNlIGhlcmUnKVxuICBjb25zdCBhY3Rpdml0eV9yZXN1bHQgPSBwcm9jZXNzQ3N2RGF0YShkZl9kaWN0LmFjaXRpdml0eS50b0FycmF5KCksZGZfZGljdC5hY2l0aXZpdHkubGlzdENvbHVtbnMoKSk7XG4gIGNvbnN0IHBsYWNlX3Jlc3VsdCA9IHByb2Nlc3NDc3ZEYXRhKGRmX2RpY3QucGxhY2UudG9BcnJheSgpLGRmX2RpY3QucGxhY2UubGlzdENvbHVtbnMoKSk7XG4gIHJldHVybiBbYWN0aXZpdHlfcmVzdWx0LHBsYWNlX3Jlc3VsdF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzVHJhY2tUb1RyaXBHZW9qc29uKHRyYWNrX2FycmF5KSB7XG4gIHJldHVybiB0dXJmLmxpbmVTdHJpbmcodHJhY2tfYXJyYXkubWFwKHggPT4gW3gubG5nLCB4LmxhdCwgeC5hbHRpdHVkZSwgeC50aW1lc3RhbXBdKSk7XG59XG5cbi8qKlxuICogT24gZXhwb3J0IGRhdGEgdG8gY3N2XG4gKiBAcGFyYW0ge2ltcG9ydCgndXRpbHMvdGFibGUtdXRpbHMvZGF0YS1jb250YWluZXItaW50ZXJmYWNlJykuRGF0YUNvbnRhaW5lckludGVyZmFjZX0gZGF0YUNvbnRhaW5lclxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWVsZHMgYGRhdGFzZXQuZmllbGRzYFxuICogQHJldHVybnMge3N0cmluZ30gY3N2IHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q3N2KGRhdGFDb250YWluZXIsIGZpZWxkcykge1xuICBjb25zdCBjb2x1bW5zID0gZmllbGRzLm1hcChmID0+IGYuZGlzcGxheU5hbWUgfHwgZi5uYW1lKTtcbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IFtjb2x1bW5zXTtcblxuICAvLyBwYXJzZSBnZW9qc29uIG9iamVjdCBhcyBzdHJpbmdcbiAgZm9yIChjb25zdCByb3cgb2YgZGF0YUNvbnRhaW5lci5yb3dzKHRydWUpKSB7XG4gICAgZm9ybWF0dGVkRGF0YS5wdXNoKHJvdy5tYXAoKGQsIGkpID0+IHBhcnNlRmllbGRWYWx1ZShkLCBmaWVsZHNbaV0udHlwZSkpKTtcbiAgfVxuXG4gIHJldHVybiBjc3ZGb3JtYXRSb3dzKGZvcm1hdHRlZERhdGEpO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIGlucHV0IGRhdGEsIGFkZGluZyBtaXNzaW5nIGZpZWxkIHR5cGVzLCByZW5hbWUgZHVwbGljYXRlIGNvbHVtbnNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2RhdGEtcHJvY2Vzc29yJykudmFsaWRhdGVJbnB1dERhdGF9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlucHV0RGF0YShkYXRhKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgIGFzc2VydCgnYWRkRGF0YVRvTWFwIEVycm9yOiBkYXRhc2V0LmRhdGEgY2Fubm90IGJlIG51bGwnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShkYXRhLmZpZWxkcykpIHtcbiAgICBhc3NlcnQoJ2FkZERhdGFUb01hcCBFcnJvcjogZXhwZWN0IGRhdGFzZXQuZGF0YS5maWVsZHMgdG8gYmUgYW4gYXJyYXknKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShkYXRhLnJvd3MpKSB7XG4gICAgYXNzZXJ0KCdhZGREYXRhVG9NYXAgRXJyb3I6IGV4cGVjdCBkYXRhc2V0LmRhdGEucm93cyB0byBiZSBhbiBhcnJheScpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qge2ZpZWxkcywgcm93c30gPSBkYXRhO1xuXG4gIC8vIGNoZWNrIGlmIGFsbCBmaWVsZHMgaGFzIG5hbWUsIGZvcm1hdCBhbmQgdHlwZVxuICBjb25zdCBhbGxWYWxpZCA9IGZpZWxkcy5ldmVyeSgoZiwgaSkgPT4ge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChmKSkge1xuICAgICAgYXNzZXJ0KGBmaWVsZHMgbmVlZHMgdG8gYmUgYW4gYXJyYXkgb2Ygb2JqZWN0LCBidXQgZmluZCAke3R5cGVvZiBmfWApO1xuICAgICAgZmllbGRzW2ldID0ge307XG4gICAgfVxuXG4gICAgaWYgKCFmLm5hbWUpIHtcbiAgICAgIGFzc2VydChgZmllbGQubmFtZSBpcyByZXF1aXJlZCBidXQgbWlzc2luZyBpbiAke0pTT04uc3RyaW5naWZ5KGYpfWApO1xuICAgICAgLy8gYXNzaWduIGEgbmFtZVxuICAgICAgZmllbGRzW2ldLm5hbWUgPSBgY29sdW1uXyR7aX1gO1xuICAgIH1cblxuICAgIGlmICghQUxMX0ZJRUxEX1RZUEVTW2YudHlwZV0pIHtcbiAgICAgIGFzc2VydChgdW5rbm93biBmaWVsZCB0eXBlICR7Zi50eXBlfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghZmllbGRzLmV2ZXJ5KGZpZWxkID0+IGZpZWxkLmFuYWx5emVyVHlwZSkpIHtcbiAgICAgIGFzc2VydCgnZmllbGQgbWlzc2luZyBhbmFseXplclR5cGUnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0aW1lIGZvcm1hdCBpcyBjb3JyZWN0IGJhc2VkIG9uIGZpcnN0IDEwIG5vdCBlbXB0eSBlbGVtZW50XG4gICAgaWYgKGYudHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcCkge1xuICAgICAgY29uc3Qgc2FtcGxlID0gZmluZE5vbkVtcHR5Um93c0F0RmllbGQocm93cywgaSwgMTApLm1hcChyID0+ICh7dHM6IHJbaV19KSk7XG4gICAgICBjb25zdCBhbmFseXplZFR5cGUgPSBBbmFseXplci5jb21wdXRlQ29sTWV0YShzYW1wbGUpWzBdO1xuICAgICAgcmV0dXJuIGFuYWx5emVkVHlwZSAmJiBhbmFseXplZFR5cGUuY2F0ZWdvcnkgPT09ICdUSU1FJyAmJiBhbmFseXplZFR5cGUuZm9ybWF0ID09PSBmLmZvcm1hdDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKGFsbFZhbGlkKSB7XG4gICAgcmV0dXJuIHtyb3dzLCBmaWVsZHN9O1xuICB9XG5cbiAgLy8gaWYgYW55IGZpZWxkIGhhcyBtaXNzaW5nIHR5cGUsIHJlY2FsY3VsYXRlIGl0IGZvciBldmVyeW9uZVxuICAvLyBiZWNhdXNlIHdlIHNpbXBseSBsb3N0IGZhaXRoIGluIGh1bWFuaXR5XG4gIGNvbnN0IHNhbXBsZURhdGEgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7XG4gICAgZmllbGRzOiBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKSxcbiAgICByb3dzXG4gIH0pO1xuICBjb25zdCBmaWVsZE9yZGVyID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG4gIGNvbnN0IG1ldGEgPSBnZXRGaWVsZHNGcm9tRGF0YShzYW1wbGVEYXRhLCBmaWVsZE9yZGVyKTtcbiAgY29uc3QgdXBkYXRlZEZpZWxkcyA9IGZpZWxkcy5tYXAoKGYsIGkpID0+ICh7XG4gICAgLi4uZixcbiAgICB0eXBlOiBtZXRhW2ldLnR5cGUsXG4gICAgZm9ybWF0OiBtZXRhW2ldLmZvcm1hdCxcbiAgICBhbmFseXplclR5cGU6IG1ldGFbaV0uYW5hbHl6ZXJUeXBlXG4gIH0pKTtcblxuICByZXR1cm4ge2ZpZWxkczogdXBkYXRlZEZpZWxkcywgcm93c307XG59XG5cbmZ1bmN0aW9uIGZpbmROb25FbXB0eVJvd3NBdEZpZWxkKHJvd3MsIGZpZWxkSWR4LCB0b3RhbCkge1xuICBjb25zdCBzYW1wbGUgPSBbXTtcbiAgbGV0IGkgPSAwO1xuICB3aGlsZSAoc2FtcGxlLmxlbmd0aCA8IHRvdGFsICYmIGkgPCByb3dzLmxlbmd0aCkge1xuICAgIGlmIChub3ROdWxsb3JVbmRlZmluZWQocm93c1tpXVtmaWVsZElkeF0pKSB7XG4gICAgICBzYW1wbGUucHVzaChyb3dzW2ldKTtcbiAgICB9XG4gICAgaSsrO1xuICB9XG4gIHJldHVybiBzYW1wbGU7XG59XG5cbi8qKlxuICogUHJvY2VzcyBzYXZlZCBrZXBsZXIuZ2wganNvbiB0byBiZSBwYXNzIHRvIFtgYWRkRGF0YVRvTWFwYF0oLi4vYWN0aW9ucy9hY3Rpb25zLm1kI2FkZGRhdGF0b21hcCkuXG4gKiBUaGUganNvbiBvYmplY3Qgc2hvdWxkIGNvbnRhaW4gYGRhdGFzZXRzYCBhbmQgYGNvbmZpZ2AuXG4gKiBAcGFyYW0ge09iamVjdH0gcmF3RGF0YVxuICogQHBhcmFtIHtBcnJheX0gcmF3RGF0YS5kYXRhc2V0c1xuICogQHBhcmFtIHtPYmplY3R9IHJhd0RhdGEuY29uZmlnXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhc2V0cyBhbmQgY29uZmlnIGB7ZGF0YXNldHM6IHt9LCBjb25maWc6IHt9fWBcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge2FkZERhdGFUb01hcH0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICogaW1wb3J0IHtwcm9jZXNzS2VwbGVyZ2xKU09OfSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogZGlzcGF0Y2goYWRkRGF0YVRvTWFwKHByb2Nlc3NLZXBsZXJnbEpTT04oa2VwbGVyR2xKc29uKSkpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0tlcGxlcmdsSlNPTihyYXdEYXRhKSB7XG4gIHJldHVybiByYXdEYXRhID8gS2VwbGVyR2xTY2hlbWEubG9hZChyYXdEYXRhLmRhdGFzZXRzLCByYXdEYXRhLmNvbmZpZykgOiBudWxsO1xufVxuXG4vKipcbiAqIFBhcnNlIGEgc2luZ2xlIG9yIGFuIGFycmF5IG9mIGRhdGFzZXRzIHNhdmVkIHVzaW5nIGtlcGxlci5nbCBzY2hlbWFcbiAqIEBwYXJhbSB7QXJyYXkgfCBBcnJheTxPYmplY3Q+fSByYXdEYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzS2VwbGVyZ2xEYXRhc2V0KHJhd0RhdGEpIHtcbiAgaWYgKCFyYXdEYXRhKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCByZXN1bHRzID0gS2VwbGVyR2xTY2hlbWEucGFyc2VTYXZlZERhdGEodG9BcnJheShyYXdEYXRhKSk7XG4gIGlmICghcmVzdWx0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHJhd0RhdGEpID8gcmVzdWx0cyA6IHJlc3VsdHNbMF07XG59XG5cbmV4cG9ydCBjb25zdCBEQVRBU0VUX0hBTkRMRVJTID0ge1xuICBbREFUQVNFVF9GT1JNQVRTLnJvd106IHByb2Nlc3NSb3dPYmplY3QsXG4gIFtEQVRBU0VUX0ZPUk1BVFMuZ2VvanNvbl06IHByb2Nlc3NHZW9qc29uLFxuICBbREFUQVNFVF9GT1JNQVRTLmNzdl06IHByb2Nlc3NDc3ZEYXRhLFxuICBbREFUQVNFVF9GT1JNQVRTLmtlcGxlcmdsXTogcHJvY2Vzc0tlcGxlcmdsRGF0YXNldCxcbiAgW0RBVEFTRVRfRk9STUFUUy5nb29nbGVfc2VtYW50aWNdOnByb2Nlc3NHb29nbGVTZW1hbnRpY0dlb2pzb24sXG4gIFtEQVRBU0VUX0ZPUk1BVFMuZ29vZ2xlX3RyYWNrXTpwcm9jZXNzR29vZ2xlVHJhY2tHZW9qc29uXG59O1xuXG4vL3RvZG86IHByb2Nlc3MgbWVzaGNvZGUgZGF0YVxuZXhwb3J0IGNvbnN0IFByb2Nlc3NvcnMgPSB7XG4gIHByb2Nlc3NHZW9qc29uLFxuICBwcm9jZXNzQ3N2RGF0YSxcbiAgcHJvY2Vzc1Jvd09iamVjdCxcbiAgcHJvY2Vzc0tlcGxlcmdsSlNPTixcbiAgcHJvY2Vzc0tlcGxlcmdsRGF0YXNldCxcbiAgYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUsXG4gIGdldEZpZWxkc0Zyb21EYXRhLFxuICBwYXJzZUNzdlJvd3NCeUZpZWxkVHlwZSxcbiAgZm9ybWF0Q3N2LFxuICBwcm9jZXNzR29vZ2xlVHJhY2tHZW9qc29uLFxuICBwcm9jZXNzR29vZ2xlU2VtYW50aWNHZW9qc29uXG59O1xuXG4iXX0=