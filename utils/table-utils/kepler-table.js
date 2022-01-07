"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSuffixAndDelimiters = removeSuffixAndDelimiters;
exports.findPointFieldPairs = findPointFieldPairs;
exports.sortDatasetByColumn = sortDatasetByColumn;
exports.copyTable = copyTable;
exports.copyTableAndUpdate = copyTableAndUpdate;
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _console = require("global/console");

var _defaultSettings = require("../../constants/default-settings");

var _d3Array = require("d3-array");

var _utils = require("../utils");

var _gpuFilterUtils = require("../gpu-filter-utils");

var _filterUtils = require("../filter-utils");

var _dataUtils = require("../data-utils");

var ScaleUtils = _interopRequireWildcard(require("../data-scale-utils"));

var _dataContainerUtils = require("./data-container-utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Unique identifier of each field
var FID_KEY = 'name';
/** @typedef {import('./kepler-table').KeplerTable} KeplerTableClass} */

/**
 * @type {KeplerTableClass}
 */

var KeplerTable = /*#__PURE__*/function () {
  function KeplerTable(_ref) {
    var _ref$info = _ref.info,
        info = _ref$info === void 0 ? {} : _ref$info,
        data = _ref.data,
        color = _ref.color,
        metadata = _ref.metadata;
    (0, _classCallCheck2["default"])(this, KeplerTable);
    // TODO - what to do if validation fails? Can kepler handle exceptions?
    // const validatedData = validateInputData(data);
    // if (!validatedData) {
    //   return this;
    // }
    var dataContainer = (0, _dataContainerUtils.createDataContainer)(data.rows, {
      fields: data.fields
    });

    var datasetInfo = _objectSpread({
      id: (0, _utils.generateHashId)(4),
      label: 'new dataset'
    }, info || {});

    var dataId = datasetInfo.id;
    var fields = data.fields.map(function (f, i) {
      return _objectSpread(_objectSpread({}, f), {}, {
        fieldIdx: i,
        id: f.name,
        displayName: f.displayName || f.name,
        valueAccessor: _dataUtils.maybeToDate.bind(null, // is time
        f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp, i, f.format, dataContainer)
      });
    });
    var allIndexes = dataContainer.getPlainIndex();
    this.id = datasetInfo.id;
    this.label = datasetInfo.label;
    this.color = color;
    this.metadata = _objectSpread(_objectSpread({}, metadata), {}, {
      id: datasetInfo.id,
      label: datasetInfo.label
    });
    this.dataContainer = dataContainer;
    this.allIndexes = allIndexes;
    this.filteredIndex = allIndexes;
    this.filteredIndexForDomain = allIndexes;
    this.fieldPairs = findPointFieldPairs(fields);
    this.fields = fields;
    this.gpuFilter = (0, _gpuFilterUtils.getGpuFilterProps)([], dataId, fields);
  }
  /**
   * Get field
   * @param columnName
   */


  (0, _createClass2["default"])(KeplerTable, [{
    key: "getColumnField",
    value: function getColumnField(columnName) {
      var field = this.fields.find(function (fd) {
        return fd[FID_KEY] === columnName;
      });

      this._assetField(columnName, field);

      return field;
    }
    /**
     * Get fieldIdx
     * @param columnName
     */

  }, {
    key: "getColumnFieldIdx",
    value: function getColumnFieldIdx(columnName) {
      var fieldIdx = this.fields.findIndex(function (fd) {
        return fd[FID_KEY] === columnName;
      });

      this._assetField(columnName, Boolean(fieldIdx > -1));

      return fieldIdx;
    }
    /**
     * Get the value of a cell
     */

  }, {
    key: "getValue",
    value: function getValue(columnName, rowIdx) {
      var field = this.getColumnField(columnName);
      return field ? field.valueAccessor({
        index: rowIdx
      }) : null;
    }
    /**
     * Updates existing field with a new object
     * @param fieldIdx
     * @param newField
     */

  }, {
    key: "updateColumnField",
    value: function updateColumnField(fieldIdx, newField) {
      this.fields = Object.assign((0, _toConsumableArray2["default"])(this.fields), (0, _defineProperty2["default"])({}, fieldIdx, newField));
    }
    /**
     * Save filterProps to field and retrieve it
     * @param {string} columnName
     */

  }, {
    key: "getColumnFilterProps",
    value: function getColumnFilterProps(columnName) {
      var fieldIdx = this.getColumnFieldIdx(columnName);

      if (fieldIdx < 0) {
        return null;
      }

      var field = this.fields[fieldIdx];

      if (field.hasOwnProperty('filterProps')) {
        return field.filterProps;
      }

      var fieldDomain = this.getColumnFilterDomain(field);

      if (!fieldDomain) {
        return null;
      }

      var filterProps = (0, _filterUtils.getFilterProps)(field, fieldDomain);

      var newField = _objectSpread(_objectSpread({}, field), {}, {
        filterProps: filterProps
      });

      this.updateColumnField(fieldIdx, newField);
      return filterProps;
    }
    /**
     * Apply filters to dataset, return the filtered dataset with updated `gpuFilter`, `filterRecord`, `filteredIndex`, `filteredIndexForDomain`
     * @param filters
     * @param layers
     * @param opt
     */

  }, {
    key: "filterTable",
    value: function filterTable(filters, layers, opt) {
      var _this = this;

      var dataContainer = this.dataContainer,
          dataId = this.id,
          oldFilterRecord = this.filterRecord,
          fields = this.fields;
      console.log('get filter table'); // if there is no filters

      var filterRecord = (0, _filterUtils.getFilterRecord)(dataId, filters, opt || {});
      this.filterRecord = filterRecord;
      this.gpuFilter = (0, _gpuFilterUtils.getGpuFilterProps)(filters, dataId, fields); // const newDataset = set(['filterRecord'], filterRecord, dataset);

      if (!filters.length) {
        this.filteredIndex = this.allIndexes;
        this.filteredIndexForDomain = this.allIndexes;
        return this;
      }

      this.changedFilters = (0, _filterUtils.diffFilters)(filterRecord, oldFilterRecord); // generate 2 sets of filter result
      // filteredIndex used to calculate layer data
      // filteredIndexForDomain used to calculate layer Domain

      var shouldCalDomain = Boolean(this.changedFilters.dynamicDomain);
      var shouldCalIndex = Boolean(this.changedFilters.cpu);
      var filterResult = {};

      if (shouldCalDomain || shouldCalIndex) {
        var dynamicDomainFilters = shouldCalDomain ? filterRecord.dynamicDomain : null;
        var cpuFilters = shouldCalIndex ? filterRecord.cpu : null;
        var filterFuncs = filters.reduce(function (acc, filter) {
          var fieldIndex = (0, _gpuFilterUtils.getDatasetFieldIndexForFilter)(_this.id, filter);
          var field = fieldIndex !== -1 ? fields[fieldIndex] : null;
          return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, filter.id, (0, _filterUtils.getFilterFunction)(field, _this.id, filter, layers, dataContainer)));
        }, {});
        filterResult = (0, _filterUtils.filterDataByFilterTypes)({
          dynamicDomainFilters: dynamicDomainFilters,
          cpuFilters: cpuFilters,
          filterFuncs: filterFuncs
        }, dataContainer);
      }

      this.filteredIndex = filterResult.filteredIndex || this.filteredIndex;
      this.filteredIndexForDomain = filterResult.filteredIndexForDomain || this.filteredIndexForDomain;
      return this;
    }
    /**
     * Apply filters to a dataset all on CPU, assign to `filteredIdxCPU`, `filterRecordCPU`
     * @param filters
     * @param layers
     */

  }, {
    key: "filterTableCPU",
    value: function filterTableCPU(filters, layers) {
      var opt = {
        cpuOnly: true,
        ignoreDomain: true
      }; // no filter

      if (!filters.length) {
        this.filteredIdxCPU = this.allIndexes;
        this.filterRecordCPU = (0, _filterUtils.getFilterRecord)(this.id, filters, opt);
        return this;
      } // no gpu filter


      if (!filters.find(function (f) {
        return f.gpu;
      })) {
        this.filteredIdxCPU = this.filteredIndex;
        this.filterRecordCPU = (0, _filterUtils.getFilterRecord)(this.id, filters, opt);
        return this;
      } // make a copy for cpu filtering


      var copied = copyTable(this);
      copied.filterRecord = this.filterRecordCPU;
      copied.filteredIndex = this.filteredIdxCPU || [];
      var filtered = copied.filterTable(filters, layers, opt);
      this.filteredIdxCPU = filtered.filteredIndex;
      this.filterRecordCPU = filtered.filterRecord;
      return this;
    }
    /**
     * Calculate field domain based on field type and data
     * for Filter
     */

  }, {
    key: "getColumnFilterDomain",
    value: function getColumnFilterDomain(field) {
      var dataContainer = this.dataContainer;
      var valueAccessor = field.valueAccessor;
      var domain;

      switch (field.type) {
        case _defaultSettings.ALL_FIELD_TYPES.real:
        case _defaultSettings.ALL_FIELD_TYPES.integer:
          // calculate domain and step
          return (0, _filterUtils.getNumericFieldDomain)(dataContainer, valueAccessor);

        case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
          return {
            domain: [true, false]
          };

        case _defaultSettings.ALL_FIELD_TYPES.string:
        case _defaultSettings.ALL_FIELD_TYPES.date:
          domain = (0, ScaleUtils.getOrdinalDomain)(dataContainer, valueAccessor).map(function (x) {
            return new Date(x);
          });
          return {
            domain: {
              date: [domain[0], domain.slice(-1)[0]],
              dow: _filterUtils.DOW_LIST,
              holiday: [true, false]
            }
          };

        case _defaultSettings.ALL_FIELD_TYPES.timestamp:
          return (0, _filterUtils.getTimestampFieldDomain)(dataContainer, valueAccessor);

        default:
          return {
            domain: (0, ScaleUtils.getOrdinalDomain)(dataContainer, valueAccessor)
          };
      }
    }
    /**
     *  Get the domain of this column based on scale type
     */

  }, {
    key: "getColumnLayerDomain",
    value: function getColumnLayerDomain(field, scaleType) {
      var dataContainer = this.dataContainer,
          filteredIndexForDomain = this.filteredIndexForDomain;

      if (!_defaultSettings.SCALE_TYPES[scaleType]) {
        _console.console.error("scale type ".concat(scaleType, " not supported"));

        return null;
      }

      var valueAccessor = field.valueAccessor;

      var indexValueAccessor = function indexValueAccessor(i) {
        return valueAccessor({
          index: i
        });
      };

      var sortFunction = (0, _dataUtils.getSortingFunction)(field.type);

      switch (scaleType) {
        case _defaultSettings.SCALE_TYPES.ordinal:
        case _defaultSettings.SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          return (0, ScaleUtils.getOrdinalDomain)(dataContainer, valueAccessor);

        case _defaultSettings.SCALE_TYPES.quantile:
          return (0, ScaleUtils.getQuantileDomain)(filteredIndexForDomain, indexValueAccessor, sortFunction);

        case _defaultSettings.SCALE_TYPES.log:
          return (0, ScaleUtils.getLogDomain)(filteredIndexForDomain, indexValueAccessor);

        case _defaultSettings.SCALE_TYPES.quantize:
        case _defaultSettings.SCALE_TYPES.linear:
        case _defaultSettings.SCALE_TYPES.sqrt:
        default:
          return (0, ScaleUtils.getLinearDomain)(filteredIndexForDomain, indexValueAccessor);
      }
    }
    /**
     * Get a sample of rows to calculate layer boundaries
     */
    // getSampleData(rows)

    /**
     * Parse cell value based on column type and return a string representation
     * Value the field value, type the field type
     */
    // parseFieldValue(value, type)
    // sortDatasetByColumn()

    /**
     * Assert whether field exist
     * @param fieldName
     * @param condition
     */

  }, {
    key: "_assetField",
    value: function _assetField(fieldName, condition) {
      if (!condition) {
        _console.console.error("".concat(fieldName, " doesnt exist in dataset ").concat(this.id));
      }
    }
  }]);
  return KeplerTable;
}(); // HELPER FUNCTIONS (MAINLY EXPORTED FOR TEST...)


function removeSuffixAndDelimiters(layerName, suffix) {
  return layerName.replace(new RegExp(suffix, 'ig'), '').replace(/[_,.]+/g, ' ').trim();
}
/**
 * Find point fields pairs from fields
 *
 * @param fields
 * @returns found point fields
 * @type {typeof import('./kepler-table').findPointFieldPairs}
 */


function findPointFieldPairs(fields) {
  var allNames = fields.map(function (f) {
    return f.name.toLowerCase();
  }); // get list of all fields with matching suffixes

  var acc = [];
  return allNames.reduce(function (carry, fieldName, idx) {
    // This search for pairs will early exit if found.
    var _iterator = _createForOfIteratorHelper(_defaultSettings.TRIP_POINT_FIELDS),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var suffixPair = _step.value;

        // match first suffix```
        if (fieldName.endsWith(suffixPair[0])) {
          var _ret = function () {
            // match second suffix
            var otherPattern = new RegExp("".concat(suffixPair[0], "$"));
            var partner = fieldName.replace(otherPattern, suffixPair[1]);
            var partnerIdx = allNames.findIndex(function (d) {
              return d === partner;
            });

            if (partnerIdx > -1) {
              var defaultName = removeSuffixAndDelimiters(fieldName, suffixPair[0]);
              carry.push({
                defaultName: defaultName,
                pair: {
                  lat: {
                    fieldIdx: idx,
                    value: fields[idx].name
                  },
                  lng: {
                    fieldIdx: partnerIdx,
                    value: fields[partnerIdx].name
                  }
                },
                suffix: suffixPair
              });
              return {
                v: carry
              };
            }
          }();

          if ((0, _typeof2["default"])(_ret) === "object") return _ret.v;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return carry;
  }, acc);
}
/**
 *
 * @param dataset
 * @param column
 * @param mode
 * @type {typeof import('./kepler-table').sortDatasetByColumn}
 */


function sortDatasetByColumn(dataset, column, mode) {
  var allIndexes = dataset.allIndexes,
      fields = dataset.fields,
      dataContainer = dataset.dataContainer;
  var fieldIndex = fields.findIndex(function (f) {
    return f.name === column;
  });

  if (fieldIndex < 0) {
    return dataset;
  }

  var sortBy = _defaultSettings.SORT_ORDER[mode] || _defaultSettings.SORT_ORDER.ASCENDING;

  if (sortBy === _defaultSettings.SORT_ORDER.UNSORT) {
    return _objectSpread(_objectSpread({}, dataset), {}, {
      sortColumn: {},
      sortOrder: null
    });
  }

  var sortFunction = sortBy === _defaultSettings.SORT_ORDER.ASCENDING ? _d3Array.ascending : _d3Array.descending;
  var sortOrder = allIndexes.slice().sort(function (a, b) {
    return sortFunction(dataContainer.valueAt(a, fieldIndex), dataContainer.valueAt(b, fieldIndex));
  });
  return _objectSpread(_objectSpread({}, dataset), {}, {
    sortColumn: (0, _defineProperty2["default"])({}, column, sortBy),
    sortOrder: sortOrder
  });
}

function copyTable(original) {
  return Object.assign(Object.create(Object.getPrototypeOf(original)), original);
}

function copyTableAndUpdate(original) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.entries(options).reduce(function (acc, entry) {
    acc[entry[0]] = entry[1];
    return acc;
  }, copyTable(original));
}

var _default = KeplerTable;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90YWJsZS11dGlscy9rZXBsZXItdGFibGUuanMiXSwibmFtZXMiOlsiRklEX0tFWSIsIktlcGxlclRhYmxlIiwiaW5mbyIsImRhdGEiLCJjb2xvciIsIm1ldGFkYXRhIiwiZGF0YUNvbnRhaW5lciIsInJvd3MiLCJmaWVsZHMiLCJkYXRhc2V0SW5mbyIsImlkIiwibGFiZWwiLCJkYXRhSWQiLCJtYXAiLCJmIiwiaSIsImZpZWxkSWR4IiwibmFtZSIsImRpc3BsYXlOYW1lIiwidmFsdWVBY2Nlc3NvciIsIm1heWJlVG9EYXRlIiwiYmluZCIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJ0aW1lc3RhbXAiLCJmb3JtYXQiLCJhbGxJbmRleGVzIiwiZ2V0UGxhaW5JbmRleCIsImZpbHRlcmVkSW5kZXgiLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwiZmllbGRQYWlycyIsImZpbmRQb2ludEZpZWxkUGFpcnMiLCJncHVGaWx0ZXIiLCJjb2x1bW5OYW1lIiwiZmllbGQiLCJmaW5kIiwiZmQiLCJfYXNzZXRGaWVsZCIsImZpbmRJbmRleCIsIkJvb2xlYW4iLCJyb3dJZHgiLCJnZXRDb2x1bW5GaWVsZCIsImluZGV4IiwibmV3RmllbGQiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXRDb2x1bW5GaWVsZElkeCIsImhhc093blByb3BlcnR5IiwiZmlsdGVyUHJvcHMiLCJmaWVsZERvbWFpbiIsImdldENvbHVtbkZpbHRlckRvbWFpbiIsInVwZGF0ZUNvbHVtbkZpZWxkIiwiZmlsdGVycyIsImxheWVycyIsIm9wdCIsIm9sZEZpbHRlclJlY29yZCIsImZpbHRlclJlY29yZCIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJjaGFuZ2VkRmlsdGVycyIsInNob3VsZENhbERvbWFpbiIsImR5bmFtaWNEb21haW4iLCJzaG91bGRDYWxJbmRleCIsImNwdSIsImZpbHRlclJlc3VsdCIsImR5bmFtaWNEb21haW5GaWx0ZXJzIiwiY3B1RmlsdGVycyIsImZpbHRlckZ1bmNzIiwicmVkdWNlIiwiYWNjIiwiZmlsdGVyIiwiZmllbGRJbmRleCIsImNwdU9ubHkiLCJpZ25vcmVEb21haW4iLCJmaWx0ZXJlZElkeENQVSIsImZpbHRlclJlY29yZENQVSIsImdwdSIsImNvcGllZCIsImNvcHlUYWJsZSIsImZpbHRlcmVkIiwiZmlsdGVyVGFibGUiLCJkb21haW4iLCJyZWFsIiwiaW50ZWdlciIsInN0cmluZyIsImRhdGUiLCJ4IiwiRGF0ZSIsInNsaWNlIiwiZG93IiwiRE9XX0xJU1QiLCJob2xpZGF5Iiwic2NhbGVUeXBlIiwiU0NBTEVfVFlQRVMiLCJDb25zb2xlIiwiZXJyb3IiLCJpbmRleFZhbHVlQWNjZXNzb3IiLCJzb3J0RnVuY3Rpb24iLCJvcmRpbmFsIiwicG9pbnQiLCJxdWFudGlsZSIsInF1YW50aXplIiwibGluZWFyIiwic3FydCIsImZpZWxkTmFtZSIsImNvbmRpdGlvbiIsInJlbW92ZVN1ZmZpeEFuZERlbGltaXRlcnMiLCJsYXllck5hbWUiLCJzdWZmaXgiLCJyZXBsYWNlIiwiUmVnRXhwIiwidHJpbSIsImFsbE5hbWVzIiwidG9Mb3dlckNhc2UiLCJjYXJyeSIsImlkeCIsIlRSSVBfUE9JTlRfRklFTERTIiwic3VmZml4UGFpciIsImVuZHNXaXRoIiwib3RoZXJQYXR0ZXJuIiwicGFydG5lciIsInBhcnRuZXJJZHgiLCJkIiwiZGVmYXVsdE5hbWUiLCJwdXNoIiwicGFpciIsImxhdCIsInZhbHVlIiwibG5nIiwic29ydERhdGFzZXRCeUNvbHVtbiIsImRhdGFzZXQiLCJjb2x1bW4iLCJtb2RlIiwic29ydEJ5IiwiU09SVF9PUkRFUiIsIkFTQ0VORElORyIsIlVOU09SVCIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJhc2NlbmRpbmciLCJkZXNjZW5kaW5nIiwic29ydCIsImEiLCJiIiwidmFsdWVBdCIsIm9yaWdpbmFsIiwiY3JlYXRlIiwiZ2V0UHJvdG90eXBlT2YiLCJjb3B5VGFibGVBbmRVcGRhdGUiLCJvcHRpb25zIiwiZW50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RCxJQUZlLENBRVYsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FDSjlDLFlBQVksQ0FBQzVGLGFBQWEsQ0FBQzJJLE9BQWQsQ0FBc0JGLENBQXRCLEVBQXlCdkUsVUFBekIsQ0FBRCxFQUF1Q2xFLGFBQWEsQ0FBQzJJLE9BQWQsQ0FBc0JELENBQXRCLEVBQXlCeEUsVUFBekIsQ0FBdkMsQ0FEUjtBQUFBLEdBRlUsQ0FBbEI7QUFNQSx5Q0FDSzJELE9BREw7QUFFRU8sSUFBQUEsVUFBVSx1Q0FDUE4sTUFETyxFQUNFRSxNQURGLENBRlo7QUFLRUssSUFBQUEsU0FBUyxFQUFUQTtBQUxGO0FBT0Q7O0FBRU0sU0FBUzVELFNBQVQsQ0FBbUJtRSxRQUFuQixFQUE2QjtBQUNsQyxTQUFPdEcsTUFBTSxDQUFDQyxNQUFQLENBQWNELE1BQU0sQ0FBQ3VHLE1BQVAsQ0FBY3ZHLE1BQU0sQ0FBQ3dHLGNBQVAsQ0FBc0JGLFFBQXRCLENBQWQsQ0FBZCxFQUE4REEsUUFBOUQsQ0FBUDtBQUNEOztBQUVNLFNBQVNHLGtCQUFULENBQTRCSCxRQUE1QixFQUFvRDtBQUFBLE1BQWRJLE9BQWMsdUVBQUosRUFBSTtBQUN6RCxTQUFPMUcsTUFBTSxDQUFDMkcsT0FBUCxDQUFlRCxPQUFmLEVBQXdCakYsTUFBeEIsQ0FBK0IsVUFBQ0MsR0FBRCxFQUFNa0YsS0FBTixFQUFnQjtBQUNwRGxGLElBQUFBLEdBQUcsQ0FBQ2tGLEtBQUssQ0FBQyxDQUFELENBQU4sQ0FBSCxHQUFnQkEsS0FBSyxDQUFDLENBQUQsQ0FBckI7QUFDQSxXQUFPbEYsR0FBUDtBQUNELEdBSE0sRUFHSlMsU0FBUyxDQUFDbUUsUUFBRCxDQUhMLENBQVA7QUFJRDs7ZUFFY2pKLFciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL2NvbnNvbGUnO1xuaW1wb3J0IHtUUklQX1BPSU5UX0ZJRUxEUywgU09SVF9PUkRFUn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHthc2NlbmRpbmcsIGRlc2NlbmRpbmd9IGZyb20gJ2QzLWFycmF5JztcblxuLy8gaW1wb3J0IHt2YWxpZGF0ZUlucHV0RGF0YX0gZnJvbSAncHJvY2Vzc29ycy9kYXRhLXByb2Nlc3Nvcic7XG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICd1dGlscy91dGlscyc7XG5pbXBvcnQge2dldEdwdUZpbHRlclByb3BzLCBnZXREYXRhc2V0RmllbGRJbmRleEZvckZpbHRlcn0gZnJvbSAndXRpbHMvZ3B1LWZpbHRlci11dGlscyc7XG5pbXBvcnQge1xuICBnZXRGaWx0ZXJQcm9wcyxcbiAgZ2V0RmlsdGVyUmVjb3JkLFxuICBkaWZmRmlsdGVycyxcbiAgZ2V0RmlsdGVyRnVuY3Rpb24sXG4gIGZpbHRlckRhdGFCeUZpbHRlclR5cGVzLFxuICBnZXROdW1lcmljRmllbGREb21haW4sXG4gIGdldFRpbWVzdGFtcEZpZWxkRG9tYWluXG59IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5pbXBvcnQge21heWJlVG9EYXRlLCBnZXRTb3J0aW5nRnVuY3Rpb259IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuaW1wb3J0IHtcbiAgZ2V0UXVhbnRpbGVEb21haW4sXG4gIGdldE9yZGluYWxEb21haW4sXG4gIGdldExvZ0RvbWFpbixcbiAgZ2V0TGluZWFyRG9tYWluXG59IGZyb20gJ3V0aWxzL2RhdGEtc2NhbGUtdXRpbHMnO1xuXG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFUywgU0NBTEVfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuaW1wb3J0IHtjcmVhdGVEYXRhQ29udGFpbmVyfSBmcm9tICcuL2RhdGEtY29udGFpbmVyLXV0aWxzJztcbmltcG9ydCAqIGFzIFNjYWxlVXRpbHMgZnJvbSAnLi4vZGF0YS1zY2FsZS11dGlscyc7XG5pbXBvcnQge0RPV19MSVNUfSBmcm9tICcuLi9maWx0ZXItdXRpbHMnO1xuXG4vLyBVbmlxdWUgaWRlbnRpZmllciBvZiBlYWNoIGZpZWxkXG5jb25zdCBGSURfS0VZID0gJ25hbWUnO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi9rZXBsZXItdGFibGUnKS5LZXBsZXJUYWJsZX0gS2VwbGVyVGFibGVDbGFzc30gKi9cblxuLyoqXG4gKiBAdHlwZSB7S2VwbGVyVGFibGVDbGFzc31cbiAqL1xuY2xhc3MgS2VwbGVyVGFibGUge1xuICBjb25zdHJ1Y3Rvcih7aW5mbyA9IHt9LCBkYXRhLCBjb2xvciwgbWV0YWRhdGF9KSB7XG4gICAgLy8gVE9ETyAtIHdoYXQgdG8gZG8gaWYgdmFsaWRhdGlvbiBmYWlscz8gQ2FuIGtlcGxlciBoYW5kbGUgZXhjZXB0aW9ucz9cbiAgICAvLyBjb25zdCB2YWxpZGF0ZWREYXRhID0gdmFsaWRhdGVJbnB1dERhdGEoZGF0YSk7XG4gICAgLy8gaWYgKCF2YWxpZGF0ZWREYXRhKSB7XG4gICAgLy8gICByZXR1cm4gdGhpcztcbiAgICAvLyB9XG5cbiAgICBjb25zdCBkYXRhQ29udGFpbmVyID0gY3JlYXRlRGF0YUNvbnRhaW5lcihkYXRhLnJvd3MsIHtmaWVsZHM6IGRhdGEuZmllbGRzfSk7XG5cbiAgICBjb25zdCBkYXRhc2V0SW5mbyA9IHtcbiAgICAgIGlkOiBnZW5lcmF0ZUhhc2hJZCg0KSxcbiAgICAgIGxhYmVsOiAnbmV3IGRhdGFzZXQnLFxuICAgICAgLi4uKGluZm8gfHwge30pXG4gICAgfTtcbiAgICBjb25zdCBkYXRhSWQgPSBkYXRhc2V0SW5mby5pZDtcblxuICAgIGNvbnN0IGZpZWxkcyA9IGRhdGEuZmllbGRzLm1hcCgoZiwgaSkgPT4gKHtcbiAgICAgIC4uLmYsXG4gICAgICBmaWVsZElkeDogaSxcbiAgICAgIGlkOiBmLm5hbWUsXG4gICAgICBkaXNwbGF5TmFtZTogZi5kaXNwbGF5TmFtZSB8fCBmLm5hbWUsXG4gICAgICB2YWx1ZUFjY2Vzc29yOiBtYXliZVRvRGF0ZS5iaW5kKFxuICAgICAgICBudWxsLFxuICAgICAgICAvLyBpcyB0aW1lXG4gICAgICAgIGYudHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcCxcbiAgICAgICAgaSxcbiAgICAgICAgZi5mb3JtYXQsXG4gICAgICAgIGRhdGFDb250YWluZXJcbiAgICAgIClcbiAgICB9KSk7XG5cbiAgICBjb25zdCBhbGxJbmRleGVzID0gZGF0YUNvbnRhaW5lci5nZXRQbGFpbkluZGV4KCk7XG5cbiAgICB0aGlzLmlkID0gZGF0YXNldEluZm8uaWQ7XG4gICAgdGhpcy5sYWJlbCA9IGRhdGFzZXRJbmZvLmxhYmVsO1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgLi4ubWV0YWRhdGEsXG4gICAgICBpZDogZGF0YXNldEluZm8uaWQsXG4gICAgICBsYWJlbDogZGF0YXNldEluZm8ubGFiZWxcbiAgICB9O1xuXG4gICAgdGhpcy5kYXRhQ29udGFpbmVyID0gZGF0YUNvbnRhaW5lcjtcbiAgICB0aGlzLmFsbEluZGV4ZXMgPSBhbGxJbmRleGVzO1xuICAgIHRoaXMuZmlsdGVyZWRJbmRleCA9IGFsbEluZGV4ZXM7XG4gICAgdGhpcy5maWx0ZXJlZEluZGV4Rm9yRG9tYWluID0gYWxsSW5kZXhlcztcbiAgICB0aGlzLmZpZWxkUGFpcnMgPSBmaW5kUG9pbnRGaWVsZFBhaXJzKGZpZWxkcyk7XG4gICAgdGhpcy5maWVsZHMgPSBmaWVsZHM7XG4gICAgdGhpcy5ncHVGaWx0ZXIgPSBnZXRHcHVGaWx0ZXJQcm9wcyhbXSwgZGF0YUlkLCBmaWVsZHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmaWVsZFxuICAgKiBAcGFyYW0gY29sdW1uTmFtZVxuICAgKi9cbiAgZ2V0Q29sdW1uRmllbGQoY29sdW1uTmFtZSkge1xuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHMuZmluZChmZCA9PiBmZFtGSURfS0VZXSA9PT0gY29sdW1uTmFtZSk7XG4gICAgdGhpcy5fYXNzZXRGaWVsZChjb2x1bW5OYW1lLCBmaWVsZCk7XG4gICAgcmV0dXJuIGZpZWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmaWVsZElkeFxuICAgKiBAcGFyYW0gY29sdW1uTmFtZVxuICAgKi9cbiAgZ2V0Q29sdW1uRmllbGRJZHgoY29sdW1uTmFtZSkge1xuICAgIGNvbnN0IGZpZWxkSWR4ID0gdGhpcy5maWVsZHMuZmluZEluZGV4KGZkID0+IGZkW0ZJRF9LRVldID09PSBjb2x1bW5OYW1lKTtcbiAgICB0aGlzLl9hc3NldEZpZWxkKGNvbHVtbk5hbWUsIEJvb2xlYW4oZmllbGRJZHggPiAtMSkpO1xuICAgIHJldHVybiBmaWVsZElkeDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIGEgY2VsbFxuICAgKi9cbiAgZ2V0VmFsdWUoY29sdW1uTmFtZSwgcm93SWR4KSB7XG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmdldENvbHVtbkZpZWxkKGNvbHVtbk5hbWUpO1xuICAgIHJldHVybiBmaWVsZCA/IGZpZWxkLnZhbHVlQWNjZXNzb3Ioe2luZGV4OiByb3dJZHh9KSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBleGlzdGluZyBmaWVsZCB3aXRoIGEgbmV3IG9iamVjdFxuICAgKiBAcGFyYW0gZmllbGRJZHhcbiAgICogQHBhcmFtIG5ld0ZpZWxkXG4gICAqL1xuICB1cGRhdGVDb2x1bW5GaWVsZChmaWVsZElkeCwgbmV3RmllbGQpIHtcbiAgICB0aGlzLmZpZWxkcyA9IE9iamVjdC5hc3NpZ24oWy4uLnRoaXMuZmllbGRzXSwge1tmaWVsZElkeF06IG5ld0ZpZWxkfSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBmaWx0ZXJQcm9wcyB0byBmaWVsZCBhbmQgcmV0cmlldmUgaXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtbk5hbWVcbiAgICovXG4gIGdldENvbHVtbkZpbHRlclByb3BzKGNvbHVtbk5hbWUpIHtcbiAgICBjb25zdCBmaWVsZElkeCA9IHRoaXMuZ2V0Q29sdW1uRmllbGRJZHgoY29sdW1uTmFtZSk7XG4gICAgaWYgKGZpZWxkSWR4IDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbZmllbGRJZHhdO1xuICAgIGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZmlsdGVyUHJvcHMnKSkge1xuICAgICAgcmV0dXJuIGZpZWxkLmZpbHRlclByb3BzO1xuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkRG9tYWluID0gdGhpcy5nZXRDb2x1bW5GaWx0ZXJEb21haW4oZmllbGQpO1xuICAgIGlmICghZmllbGREb21haW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbHRlclByb3BzID0gZ2V0RmlsdGVyUHJvcHMoZmllbGQsIGZpZWxkRG9tYWluKTtcbiAgICBjb25zdCBuZXdGaWVsZCA9IHtcbiAgICAgIC4uLmZpZWxkLFxuICAgICAgZmlsdGVyUHJvcHNcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVDb2x1bW5GaWVsZChmaWVsZElkeCwgbmV3RmllbGQpO1xuXG4gICAgcmV0dXJuIGZpbHRlclByb3BzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGZpbHRlcnMgdG8gZGF0YXNldCwgcmV0dXJuIHRoZSBmaWx0ZXJlZCBkYXRhc2V0IHdpdGggdXBkYXRlZCBgZ3B1RmlsdGVyYCwgYGZpbHRlclJlY29yZGAsIGBmaWx0ZXJlZEluZGV4YCwgYGZpbHRlcmVkSW5kZXhGb3JEb21haW5gXG4gICAqIEBwYXJhbSBmaWx0ZXJzXG4gICAqIEBwYXJhbSBsYXllcnNcbiAgICogQHBhcmFtIG9wdFxuICAgKi9cbiAgZmlsdGVyVGFibGUoZmlsdGVycywgbGF5ZXJzLCBvcHQpIHtcbiAgICBjb25zdCB7ZGF0YUNvbnRhaW5lciwgaWQ6IGRhdGFJZCwgZmlsdGVyUmVjb3JkOiBvbGRGaWx0ZXJSZWNvcmQsIGZpZWxkc30gPSB0aGlzO1xuXG4gICAgY29uc29sZS5sb2coJ2dldCBmaWx0ZXIgdGFibGUnKVxuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gZmlsdGVyc1xuICAgIGNvbnN0IGZpbHRlclJlY29yZCA9IGdldEZpbHRlclJlY29yZChkYXRhSWQsIGZpbHRlcnMsIG9wdCB8fCB7fSk7XG5cbiAgICB0aGlzLmZpbHRlclJlY29yZCA9IGZpbHRlclJlY29yZDtcbiAgICB0aGlzLmdwdUZpbHRlciA9IGdldEdwdUZpbHRlclByb3BzKGZpbHRlcnMsIGRhdGFJZCwgZmllbGRzKTtcblxuICAgIC8vIGNvbnN0IG5ld0RhdGFzZXQgPSBzZXQoWydmaWx0ZXJSZWNvcmQnXSwgZmlsdGVyUmVjb3JkLCBkYXRhc2V0KTtcblxuICAgIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRJbmRleCA9IHRoaXMuYWxsSW5kZXhlcztcbiAgICAgIHRoaXMuZmlsdGVyZWRJbmRleEZvckRvbWFpbiA9IHRoaXMuYWxsSW5kZXhlcztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlZEZpbHRlcnMgPSBkaWZmRmlsdGVycyhmaWx0ZXJSZWNvcmQsIG9sZEZpbHRlclJlY29yZCk7XG5cbiAgICAvLyBnZW5lcmF0ZSAyIHNldHMgb2YgZmlsdGVyIHJlc3VsdFxuICAgIC8vIGZpbHRlcmVkSW5kZXggdXNlZCB0byBjYWxjdWxhdGUgbGF5ZXIgZGF0YVxuICAgIC8vIGZpbHRlcmVkSW5kZXhGb3JEb21haW4gdXNlZCB0byBjYWxjdWxhdGUgbGF5ZXIgRG9tYWluXG4gICAgY29uc3Qgc2hvdWxkQ2FsRG9tYWluID0gQm9vbGVhbih0aGlzLmNoYW5nZWRGaWx0ZXJzLmR5bmFtaWNEb21haW4pO1xuICAgIGNvbnN0IHNob3VsZENhbEluZGV4ID0gQm9vbGVhbih0aGlzLmNoYW5nZWRGaWx0ZXJzLmNwdSk7XG5cbiAgICBsZXQgZmlsdGVyUmVzdWx0ID0ge307XG4gICAgaWYgKHNob3VsZENhbERvbWFpbiB8fCBzaG91bGRDYWxJbmRleCkge1xuICAgICAgY29uc3QgZHluYW1pY0RvbWFpbkZpbHRlcnMgPSBzaG91bGRDYWxEb21haW4gPyBmaWx0ZXJSZWNvcmQuZHluYW1pY0RvbWFpbiA6IG51bGw7XG4gICAgICBjb25zdCBjcHVGaWx0ZXJzID0gc2hvdWxkQ2FsSW5kZXggPyBmaWx0ZXJSZWNvcmQuY3B1IDogbnVsbDtcblxuICAgICAgY29uc3QgZmlsdGVyRnVuY3MgPSBmaWx0ZXJzLnJlZHVjZSgoYWNjLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRJbmRleCA9IGdldERhdGFzZXRGaWVsZEluZGV4Rm9yRmlsdGVyKHRoaXMuaWQsIGZpbHRlcik7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRJbmRleCAhPT0gLTEgPyBmaWVsZHNbZmllbGRJbmRleF0gOiBudWxsO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgIFtmaWx0ZXIuaWRdOiBnZXRGaWx0ZXJGdW5jdGlvbihmaWVsZCwgdGhpcy5pZCwgZmlsdGVyLCBsYXllcnMsIGRhdGFDb250YWluZXIpXG4gICAgICAgIH07XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIGZpbHRlclJlc3VsdCA9IGZpbHRlckRhdGFCeUZpbHRlclR5cGVzKFxuICAgICAgICB7ZHluYW1pY0RvbWFpbkZpbHRlcnMsIGNwdUZpbHRlcnMsIGZpbHRlckZ1bmNzfSxcbiAgICAgICAgZGF0YUNvbnRhaW5lclxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlcmVkSW5kZXggPSBmaWx0ZXJSZXN1bHQuZmlsdGVyZWRJbmRleCB8fCB0aGlzLmZpbHRlcmVkSW5kZXg7XG4gICAgdGhpcy5maWx0ZXJlZEluZGV4Rm9yRG9tYWluID1cbiAgICAgIGZpbHRlclJlc3VsdC5maWx0ZXJlZEluZGV4Rm9yRG9tYWluIHx8IHRoaXMuZmlsdGVyZWRJbmRleEZvckRvbWFpbjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGZpbHRlcnMgdG8gYSBkYXRhc2V0IGFsbCBvbiBDUFUsIGFzc2lnbiB0byBgZmlsdGVyZWRJZHhDUFVgLCBgZmlsdGVyUmVjb3JkQ1BVYFxuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKiBAcGFyYW0gbGF5ZXJzXG4gICAqL1xuICBmaWx0ZXJUYWJsZUNQVShmaWx0ZXJzLCBsYXllcnMpIHtcbiAgICBjb25zdCBvcHQgPSB7XG4gICAgICBjcHVPbmx5OiB0cnVlLFxuICAgICAgaWdub3JlRG9tYWluOiB0cnVlXG4gICAgfTtcblxuICAgIC8vIG5vIGZpbHRlclxuICAgIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRJZHhDUFUgPSB0aGlzLmFsbEluZGV4ZXM7XG4gICAgICB0aGlzLmZpbHRlclJlY29yZENQVSA9IGdldEZpbHRlclJlY29yZCh0aGlzLmlkLCBmaWx0ZXJzLCBvcHQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gbm8gZ3B1IGZpbHRlclxuICAgIGlmICghZmlsdGVycy5maW5kKGYgPT4gZi5ncHUpKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkSWR4Q1BVID0gdGhpcy5maWx0ZXJlZEluZGV4O1xuICAgICAgdGhpcy5maWx0ZXJSZWNvcmRDUFUgPSBnZXRGaWx0ZXJSZWNvcmQodGhpcy5pZCwgZmlsdGVycywgb3B0KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIG1ha2UgYSBjb3B5IGZvciBjcHUgZmlsdGVyaW5nXG4gICAgY29uc3QgY29waWVkID0gY29weVRhYmxlKHRoaXMpO1xuXG4gICAgY29waWVkLmZpbHRlclJlY29yZCA9IHRoaXMuZmlsdGVyUmVjb3JkQ1BVO1xuICAgIGNvcGllZC5maWx0ZXJlZEluZGV4ID0gdGhpcy5maWx0ZXJlZElkeENQVSB8fCBbXTtcblxuICAgIGNvbnN0IGZpbHRlcmVkID0gY29waWVkLmZpbHRlclRhYmxlKGZpbHRlcnMsIGxheWVycywgb3B0KTtcblxuICAgIHRoaXMuZmlsdGVyZWRJZHhDUFUgPSBmaWx0ZXJlZC5maWx0ZXJlZEluZGV4O1xuICAgIHRoaXMuZmlsdGVyUmVjb3JkQ1BVID0gZmlsdGVyZWQuZmlsdGVyUmVjb3JkO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgZmllbGQgZG9tYWluIGJhc2VkIG9uIGZpZWxkIHR5cGUgYW5kIGRhdGFcbiAgICogZm9yIEZpbHRlclxuICAgKi9cbiAgZ2V0Q29sdW1uRmlsdGVyRG9tYWluKGZpZWxkKSB7XG4gICAgY29uc3Qge2RhdGFDb250YWluZXJ9ID0gdGhpcztcbiAgICBjb25zdCB7dmFsdWVBY2Nlc3Nvcn0gPSBmaWVsZDtcblxuICAgIGxldCBkb21haW47XG5cbiAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyOlxuICAgICAgICAvLyBjYWxjdWxhdGUgZG9tYWluIGFuZCBzdGVwXG4gICAgICAgIHJldHVybiBnZXROdW1lcmljRmllbGREb21haW4oZGF0YUNvbnRhaW5lciwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW46XG4gICAgICAgIHJldHVybiB7ZG9tYWluOiBbdHJ1ZSwgZmFsc2VdfTtcblxuICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMuc3RyaW5nOlxuICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMuZGF0ZTpcbiAgICAgICAgZG9tYWluID0gZ2V0T3JkaW5hbERvbWFpbihkYXRhQ29udGFpbmVyLCB2YWx1ZUFjY2Vzc29yKS5tYXAoKHgpPT5uZXcgRGF0ZSh4KSk7XG4gICAgICAgIHJldHVybiB7ZG9tYWluOntkYXRlOltkb21haW5bMF0sZG9tYWluLnNsaWNlKC0xKVswXV0sZG93OkRPV19MSVNULGhvbGlkYXk6W3RydWUsZmFsc2VdfX07XG5cbiAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDpcbiAgICAgICAgcmV0dXJuIGdldFRpbWVzdGFtcEZpZWxkRG9tYWluKGRhdGFDb250YWluZXIsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge2RvbWFpbjogZ2V0T3JkaW5hbERvbWFpbihkYXRhQ29udGFpbmVyLCB2YWx1ZUFjY2Vzc29yKX07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBHZXQgdGhlIGRvbWFpbiBvZiB0aGlzIGNvbHVtbiBiYXNlZCBvbiBzY2FsZSB0eXBlXG4gICAqL1xuICBnZXRDb2x1bW5MYXllckRvbWFpbihmaWVsZCwgc2NhbGVUeXBlKSB7XG4gICAgY29uc3Qge2RhdGFDb250YWluZXIsIGZpbHRlcmVkSW5kZXhGb3JEb21haW59ID0gdGhpcztcblxuICAgIGlmICghU0NBTEVfVFlQRVNbc2NhbGVUeXBlXSkge1xuICAgICAgQ29uc29sZS5lcnJvcihgc2NhbGUgdHlwZSAke3NjYWxlVHlwZX0gbm90IHN1cHBvcnRlZGApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qge3ZhbHVlQWNjZXNzb3J9ID0gZmllbGQ7XG4gICAgY29uc3QgaW5kZXhWYWx1ZUFjY2Vzc29yID0gaSA9PiB2YWx1ZUFjY2Vzc29yKHtpbmRleDogaX0pO1xuICAgIGNvbnN0IHNvcnRGdW5jdGlvbiA9IGdldFNvcnRpbmdGdW5jdGlvbihmaWVsZC50eXBlKTtcblxuICAgIHN3aXRjaCAoc2NhbGVUeXBlKSB7XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLm9yZGluYWw6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnBvaW50OlxuICAgICAgICAvLyBkbyBub3QgcmVjYWxjdWxhdGUgb3JkaW5hbCBkb21haW4gYmFzZWQgb24gZmlsdGVyZWQgZGF0YVxuICAgICAgICAvLyBkb24ndCBuZWVkIHRvIHVwZGF0ZSBvcmRpbmFsIGRvbWFpbiBldmVyeSB0aW1lXG4gICAgICAgIHJldHVybiBnZXRPcmRpbmFsRG9tYWluKGRhdGFDb250YWluZXIsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnF1YW50aWxlOlxuICAgICAgICByZXR1cm4gZ2V0UXVhbnRpbGVEb21haW4oZmlsdGVyZWRJbmRleEZvckRvbWFpbiwgaW5kZXhWYWx1ZUFjY2Vzc29yLCBzb3J0RnVuY3Rpb24pO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLmxvZzpcbiAgICAgICAgcmV0dXJuIGdldExvZ0RvbWFpbihmaWx0ZXJlZEluZGV4Rm9yRG9tYWluLCBpbmRleFZhbHVlQWNjZXNzb3IpO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnF1YW50aXplOlxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5saW5lYXI6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnNxcnQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZ2V0TGluZWFyRG9tYWluKGZpbHRlcmVkSW5kZXhGb3JEb21haW4sIGluZGV4VmFsdWVBY2Nlc3Nvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNhbXBsZSBvZiByb3dzIHRvIGNhbGN1bGF0ZSBsYXllciBib3VuZGFyaWVzXG4gICAqL1xuICAvLyBnZXRTYW1wbGVEYXRhKHJvd3MpXG5cbiAgLyoqXG4gICAqIFBhcnNlIGNlbGwgdmFsdWUgYmFzZWQgb24gY29sdW1uIHR5cGUgYW5kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvblxuICAgKiBWYWx1ZSB0aGUgZmllbGQgdmFsdWUsIHR5cGUgdGhlIGZpZWxkIHR5cGVcbiAgICovXG4gIC8vIHBhcnNlRmllbGRWYWx1ZSh2YWx1ZSwgdHlwZSlcblxuICAvLyBzb3J0RGF0YXNldEJ5Q29sdW1uKClcblxuICAvKipcbiAgICogQXNzZXJ0IHdoZXRoZXIgZmllbGQgZXhpc3RcbiAgICogQHBhcmFtIGZpZWxkTmFtZVxuICAgKiBAcGFyYW0gY29uZGl0aW9uXG4gICAqL1xuICBfYXNzZXRGaWVsZChmaWVsZE5hbWUsIGNvbmRpdGlvbikge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBDb25zb2xlLmVycm9yKGAke2ZpZWxkTmFtZX0gZG9lc250IGV4aXN0IGluIGRhdGFzZXQgJHt0aGlzLmlkfWApO1xuICAgIH1cbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TIChNQUlOTFkgRVhQT1JURUQgRk9SIFRFU1QuLi4pXG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTdWZmaXhBbmREZWxpbWl0ZXJzKGxheWVyTmFtZSwgc3VmZml4KSB7XG4gIHJldHVybiBsYXllck5hbWVcbiAgICAucmVwbGFjZShuZXcgUmVnRXhwKHN1ZmZpeCwgJ2lnJyksICcnKVxuICAgIC5yZXBsYWNlKC9bXywuXSsvZywgJyAnKVxuICAgIC50cmltKCk7XG59XG5cbi8qKlxuICogRmluZCBwb2ludCBmaWVsZHMgcGFpcnMgZnJvbSBmaWVsZHNcbiAqXG4gKiBAcGFyYW0gZmllbGRzXG4gKiBAcmV0dXJucyBmb3VuZCBwb2ludCBmaWVsZHNcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2tlcGxlci10YWJsZScpLmZpbmRQb2ludEZpZWxkUGFpcnN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUG9pbnRGaWVsZFBhaXJzKGZpZWxkcykge1xuICBjb25zdCBhbGxOYW1lcyA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUudG9Mb3dlckNhc2UoKSk7XG5cbiAgLy8gZ2V0IGxpc3Qgb2YgYWxsIGZpZWxkcyB3aXRoIG1hdGNoaW5nIHN1ZmZpeGVzXG4gIGNvbnN0IGFjYyA9IFtdO1xuICByZXR1cm4gYWxsTmFtZXMucmVkdWNlKChjYXJyeSwgZmllbGROYW1lLCBpZHgpID0+IHtcbiAgICAvLyBUaGlzIHNlYXJjaCBmb3IgcGFpcnMgd2lsbCBlYXJseSBleGl0IGlmIGZvdW5kLlxuICAgIGZvciAoY29uc3Qgc3VmZml4UGFpciBvZiBUUklQX1BPSU5UX0ZJRUxEUykge1xuICAgICAgLy8gbWF0Y2ggZmlyc3Qgc3VmZml4YGBgXG4gICAgICBpZiAoZmllbGROYW1lLmVuZHNXaXRoKHN1ZmZpeFBhaXJbMF0pKSB7XG4gICAgICAgIC8vIG1hdGNoIHNlY29uZCBzdWZmaXhcbiAgICAgICAgY29uc3Qgb3RoZXJQYXR0ZXJuID0gbmV3IFJlZ0V4cChgJHtzdWZmaXhQYWlyWzBdfVxcJGApO1xuICAgICAgICBjb25zdCBwYXJ0bmVyID0gZmllbGROYW1lLnJlcGxhY2Uob3RoZXJQYXR0ZXJuLCBzdWZmaXhQYWlyWzFdKTtcblxuICAgICAgICBjb25zdCBwYXJ0bmVySWR4ID0gYWxsTmFtZXMuZmluZEluZGV4KGQgPT4gZCA9PT0gcGFydG5lcik7XG4gICAgICAgIGlmIChwYXJ0bmVySWR4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBkZWZhdWx0TmFtZSA9IHJlbW92ZVN1ZmZpeEFuZERlbGltaXRlcnMoZmllbGROYW1lLCBzdWZmaXhQYWlyWzBdKTtcblxuICAgICAgICAgIGNhcnJ5LnB1c2goe1xuICAgICAgICAgICAgZGVmYXVsdE5hbWUsXG4gICAgICAgICAgICBwYWlyOiB7XG4gICAgICAgICAgICAgIGxhdDoge1xuICAgICAgICAgICAgICAgIGZpZWxkSWR4OiBpZHgsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZpZWxkc1tpZHhdLm5hbWVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbG5nOiB7XG4gICAgICAgICAgICAgICAgZmllbGRJZHg6IHBhcnRuZXJJZHgsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZpZWxkc1twYXJ0bmVySWR4XS5uYW1lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWZmaXg6IHN1ZmZpeFBhaXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gY2Fycnk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhcnJ5O1xuICB9LCBhY2MpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gZGF0YXNldFxuICogQHBhcmFtIGNvbHVtblxuICogQHBhcmFtIG1vZGVcbiAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KCcuL2tlcGxlci10YWJsZScpLnNvcnREYXRhc2V0QnlDb2x1bW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RGF0YXNldEJ5Q29sdW1uKGRhdGFzZXQsIGNvbHVtbiwgbW9kZSkge1xuICBjb25zdCB7YWxsSW5kZXhlcywgZmllbGRzLCBkYXRhQ29udGFpbmVyfSA9IGRhdGFzZXQ7XG4gIGNvbnN0IGZpZWxkSW5kZXggPSBmaWVsZHMuZmluZEluZGV4KGYgPT4gZi5uYW1lID09PSBjb2x1bW4pO1xuICBpZiAoZmllbGRJbmRleCA8IDApIHtcbiAgICByZXR1cm4gZGF0YXNldDtcbiAgfVxuXG4gIGNvbnN0IHNvcnRCeSA9IFNPUlRfT1JERVJbbW9kZV0gfHwgU09SVF9PUkRFUi5BU0NFTkRJTkc7XG5cbiAgaWYgKHNvcnRCeSA9PT0gU09SVF9PUkRFUi5VTlNPUlQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGF0YXNldCxcbiAgICAgIHNvcnRDb2x1bW46IHt9LFxuICAgICAgc29ydE9yZGVyOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHNvcnRGdW5jdGlvbiA9IHNvcnRCeSA9PT0gU09SVF9PUkRFUi5BU0NFTkRJTkcgPyBhc2NlbmRpbmcgOiBkZXNjZW5kaW5nO1xuICBjb25zdCBzb3J0T3JkZXIgPSBhbGxJbmRleGVzXG4gICAgLnNsaWNlKClcbiAgICAuc29ydCgoYSwgYikgPT5cbiAgICAgIHNvcnRGdW5jdGlvbihkYXRhQ29udGFpbmVyLnZhbHVlQXQoYSwgZmllbGRJbmRleCksIGRhdGFDb250YWluZXIudmFsdWVBdChiLCBmaWVsZEluZGV4KSlcbiAgICApO1xuXG4gIHJldHVybiB7XG4gICAgLi4uZGF0YXNldCxcbiAgICBzb3J0Q29sdW1uOiB7XG4gICAgICBbY29sdW1uXTogc29ydEJ5XG4gICAgfSxcbiAgICBzb3J0T3JkZXJcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUYWJsZShvcmlnaW5hbCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpLCBvcmlnaW5hbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5VGFibGVBbmRVcGRhdGUob3JpZ2luYWwsIG9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMob3B0aW9ucykucmVkdWNlKChhY2MsIGVudHJ5KSA9PiB7XG4gICAgYWNjW2VudHJ5WzBdXSA9IGVudHJ5WzFdO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIGNvcHlUYWJsZShvcmlnaW5hbCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJUYWJsZTtcbiJdfQ==