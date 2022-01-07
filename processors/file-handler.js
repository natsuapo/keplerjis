"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGeoJson = isGeoJson;
exports.isFeature = isFeature;
exports.isFeatureCollection = isFeatureCollection;
exports.isRowObject = isRowObject;
exports.isKeplerGlMap = isKeplerGlMap;
exports.isGoogleTrackJson = isGoogleTrackJson;
exports.isGoogleSemanticJson = isGoogleSemanticJson;
exports.makeProgressIterator = makeProgressIterator;
exports.readBatch = readBatch;
exports.readFileInBatches = readFileInBatches;
exports.processFileData = processFileData;
exports.filesToDataPayload = filesToDataPayload;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _awaitAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/awaitAsyncGenerator"));

var _wrapAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapAsyncGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

require("@loaders.gl/polyfills");

var _core = require("@loaders.gl/core");

var _json = require("@loaders.gl/json");

var _csv = require("@loaders.gl/csv");

var _dataProcessor = require("./data-processor");

var _utils = require("../utils/utils");

var _defaultSettings = require("../constants/default-settings");

var _googleUtils = require("../utils/google-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BATCH_TYPE = {
  METADATA: 'metadata',
  PARTIAL_RESULT: 'partial-result',
  FINAL_RESULT: 'final-result'
};
var CSV_LOADER_OPTIONS = {
  batchSize: 4000,
  // Auto de tect number of rows per batch (network batch size)
  rowFormat: 'object',
  dynamicTyping: false // not working for now

};
var JSON_LOADER_OPTIONS = {
  // instruct loaders.gl on what json paths to stream
  jsonpaths: ['$', // JSON Row array
  '$.features', // GeoJSON
  '$.datasets' // KeplerGL JSON
  ]
};

function isGeoJson(json) {
  // json can be feature collection
  // or single feature
  return (0, _utils.isPlainObject)(json) && (isFeature(json) || isFeatureCollection(json));
}

function isFeature(json) {
  return json.type === 'Feature' && json.geometry;
}

function isFeatureCollection(json) {
  return json.type === 'FeatureCollection' && json.features;
}

function isRowObject(json) {
  return Array.isArray(json) && (0, _utils.isPlainObject)(json[0]);
}

function isKeplerGlMap(json) {
  return Boolean((0, _utils.isPlainObject)(json) && json.datasets && json.config && json.info && json.info.app === 'kepler.gl');
}

function isGoogleTrackJson(json) {
  return Boolean(json.locations && json.locations[0].latitudeE7);
}

function isGoogleSemanticJson(json) {
  return Boolean(json.timelineObjects);
}

function makeProgressIterator(_x, _x2) {
  return _makeProgressIterator.apply(this, arguments);
} // eslint-disable-next-line complexity


function _makeProgressIterator() {
  _makeProgressIterator = (0, _wrapAsyncGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(asyncIterator, info) {
    var rowCount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, batch, rowCountInBatch, percent, progress;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rowCount = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 3;
            _iterator = (0, _asyncIterator2["default"])(asyncIterator);

          case 5:
            _context.next = 7;
            return (0, _awaitAsyncGenerator2["default"])(_iterator.next());

          case 7:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 11;
            return (0, _awaitAsyncGenerator2["default"])(_step.value);

          case 11:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 23;
              break;
            }

            batch = _value;
            rowCountInBatch = batch.data && batch.data.length || 0;
            rowCount += rowCountInBatch;
            percent = Number.isFinite(batch.bytesUsed) ? batch.bytesUsed / info.size : null; // Update progress object

            progress = _objectSpread({
              rowCount: rowCount,
              rowCountInBatch: rowCountInBatch
            }, Number.isFinite(percent) ? {
              percent: percent
            } : {});
            _context.next = 20;
            return _objectSpread(_objectSpread({}, batch), {}, {
              progress: progress
            });

          case 20:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 23:
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 29:
            _context.prev = 29;
            _context.prev = 30;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return (0, _awaitAsyncGenerator2["default"])(_iterator["return"]());

          case 34:
            _context.prev = 34;

            if (!_didIteratorError) {
              _context.next = 37;
              break;
            }

            throw _iteratorError;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(29);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 25, 29, 39], [30,, 34, 38]]);
  }));
  return _makeProgressIterator.apply(this, arguments);
}

function readBatch(_x3, _x4) {
  return _readBatch.apply(this, arguments);
}

function _readBatch() {
  _readBatch = (0, _wrapAsyncGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(asyncIterator, fileName) {
    var result, batches, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value2, batch, streamingPath, i;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = null;
            batches = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _context2.prev = 4;
            _iterator2 = (0, _asyncIterator2["default"])(asyncIterator);

          case 6:
            _context2.next = 8;
            return (0, _awaitAsyncGenerator2["default"])(_iterator2.next());

          case 8:
            _step2 = _context2.sent;
            _iteratorNormalCompletion2 = _step2.done;
            _context2.next = 12;
            return (0, _awaitAsyncGenerator2["default"])(_step2.value);

          case 12:
            _value2 = _context2.sent;

            if (_iteratorNormalCompletion2) {
              _context2.next = 21;
              break;
            }

            batch = _value2;

            // Last batch will have this special type and will provide all the root
            // properties of the parsed document.
            // Only json parse will have `FINAL_RESULT`
            if (batch.batchType === BATCH_TYPE.FINAL_RESULT) {
              if (batch.container) {
                result = _objectSpread({}, batch.container);
              } // Set the streamed data correctly is Batch json path is set
              // and the path streamed is not the top level object (jsonpath = '$')


              if (batch.jsonpath && batch.jsonpath.length > 1) {
                streamingPath = new _json._JSONPath(batch.jsonpath);
                streamingPath.setFieldAtPath(result, batches);
              } else if (batch.jsonpath && batch.jsonpath.length === 1) {
                // The streamed object is a ROW JSON-batch (jsonpath = '$')
                // row objects
                result = batches;
              }
            } else {
              for (i = 0; i < batch.data.length; i++) {
                batches.push(batch.data[i]);
              }
            }

            _context2.next = 18;
            return _objectSpread(_objectSpread(_objectSpread({}, batch), batch.schema ? {
              headers: Object.keys(batch.schema)
            } : {}), {}, {
              fileName: fileName,
              // if dataset is CSV, data is set to the raw batches
              data: result ? result : batches
            });

          case 18:
            _iteratorNormalCompletion2 = true;
            _context2.next = 6;
            break;

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 27:
            _context2.prev = 27;
            _context2.prev = 28;

            if (!(!_iteratorNormalCompletion2 && _iterator2["return"] != null)) {
              _context2.next = 32;
              break;
            }

            _context2.next = 32;
            return (0, _awaitAsyncGenerator2["default"])(_iterator2["return"]());

          case 32:
            _context2.prev = 32;

            if (!_didIteratorError2) {
              _context2.next = 35;
              break;
            }

            throw _iteratorError2;

          case 35:
            return _context2.finish(32);

          case 36:
            return _context2.finish(27);

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 23, 27, 37], [28,, 32, 36]]);
  }));
  return _readBatch.apply(this, arguments);
}

function readFileInBatches(_x5) {
  return _readFileInBatches.apply(this, arguments);
}

function _readFileInBatches() {
  _readFileInBatches = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
    var file, _ref$fileCache, fileCache, _ref$loaders, loaders, _ref$loadOptions, loadOptions, batchIterator, progressIterator;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            file = _ref.file, _ref$fileCache = _ref.fileCache, fileCache = _ref$fileCache === void 0 ? [] : _ref$fileCache, _ref$loaders = _ref.loaders, loaders = _ref$loaders === void 0 ? [] : _ref$loaders, _ref$loadOptions = _ref.loadOptions, loadOptions = _ref$loadOptions === void 0 ? {} : _ref$loadOptions;
            loaders = [_json.JSONLoader, _csv.CSVLoader].concat((0, _toConsumableArray2["default"])(loaders));
            loadOptions = _objectSpread({
              csv: CSV_LOADER_OPTIONS,
              json: JSON_LOADER_OPTIONS,
              metadata: true
            }, loadOptions);
            _context3.next = 5;
            return (0, _core.parseInBatches)(file, loaders, loadOptions);

          case 5:
            batchIterator = _context3.sent;
            progressIterator = makeProgressIterator(batchIterator, {
              size: file.size
            });
            return _context3.abrupt("return", readBatch(progressIterator, file.name));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _readFileInBatches.apply(this, arguments);
}

function processFileData(_ref2) {
  var content = _ref2.content,
      fileCache = _ref2.fileCache;
  return new Promise(function (resolve, reject) {
    var data = content.data; // eslint-disable-next-line no-console

    console.log('start analyzing');
    var format;
    var processor;

    if (isKeplerGlMap(data)) {
      format = _defaultSettings.DATASET_FORMATS.keplergl;
      processor = _dataProcessor.processKeplerglJSON;
    } else if (isRowObject(data)) {
      format = _defaultSettings.DATASET_FORMATS.row;
      processor = _dataProcessor.processRowObject;
    } else if (isGeoJson(data)) {
      format = _defaultSettings.DATASET_FORMATS.geojson;
      processor = _dataProcessor.processGeojson;
    } else if (isGoogleTrackJson(data)) {
      // eslint-disable-next-line no-console
      console.log('google detected');
      format = _defaultSettings.DATASET_FORMATS.google_track;
      processor = _dataProcessor.processGoogleTrackGeojson;
    } else if (isGoogleSemanticJson(data)) {
      console.log('google semantic detected');
      format = _defaultSettings.DATASET_FORMATS.google_semantic;
      processor = _dataProcessor.processGoogleSemanticGeojson;
    }

    if (format) {
      if (processor) {
        var result = processor(data);
        var layer_list = [];

        if (processor !== _dataProcessor.processGoogleSemanticGeojson && processor !== _dataProcessor.processGoogleTrackGeojson) {
          layer_list.push({
            data: result,
            info: {
              label: content.fileName,
              format: format
            }
          });
        } else if (processor === _dataProcessor.processGoogleSemanticGeojson) {
          layer_list.push({
            data: result[0],
            info: {
              label: 'activity information',
              format: format
            }
          });
          layer_list.push({
            data: result[1],
            info: {
              label: 'visited place information',
              format: format
            }
          });
        } else {
          layer_list.push({
            data: result,
            info: {
              label: 'GMT raw gps data',
              format: format
            }
          }); // layer_list.push({
          //   data: processGeojson(convert_track_line(result)),
          //   info: {
          //     label: 'track',
          //     format
          //   }
          // });
        }

        resolve([].concat((0, _toConsumableArray2["default"])(fileCache), layer_list));
      }
    }

    reject('Unknow File Format');
  });
}

function filesToDataPayload(fileCache) {
  // seperate out files which could be a single datasets. or a keplergl map json
  var collection = fileCache.reduce(function (accu, file) {
    var data = file.data,
        _file$info = file.info,
        info = _file$info === void 0 ? {} : _file$info;
    var format = info.format;

    if (format === _defaultSettings.DATASET_FORMATS.keplergl) {
      // if file contains a single kepler map dataset & config
      accu.keplerMaps.push(_objectSpread(_objectSpread({}, data), {}, {
        options: {
          centerMap: !(data.config && data.config.mapState)
        }
      }));
    } else if (_defaultSettings.DATASET_FORMATS[format]) {
      // if file contains only data
      var newDataset = {
        data: data,
        info: _objectSpread({
          id: info.id || (0, _utils.generateHashId)(4)
        }, info)
      };
      accu.datasets.push(newDataset);
    }

    return accu;
  }, {
    datasets: [],
    keplerMaps: []
  }); // add kepler map first with config
  // add datasets later in one add data call

  return collection.keplerMaps.concat({
    datasets: collection.datasets
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2ZpbGUtaGFuZGxlci5qcyJdLCJuYW1lcyI6WyJCQVRDSF9UWVBFIiwiTUVUQURBVEEiLCJQQVJUSUFMX1JFU1VMVCIsIkZJTkFMX1JFU1VMVCIsIkNTVl9MT0FERVJfT1BUSU9OUyIsImJhdGNoU2l6ZSIsInJvd0Zvcm1hdCIsImR5bmFtaWNUeXBpbmciLCJKU09OX0xPQURFUl9PUFRJT05TIiwianNvbnBhdGhzIiwiaXNHZW9Kc29uIiwianNvbiIsImlzRmVhdHVyZSIsImlzRmVhdHVyZUNvbGxlY3Rpb24iLCJ0eXBlIiwiZ2VvbWV0cnkiLCJmZWF0dXJlcyIsImlzUm93T2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiaXNLZXBsZXJHbE1hcCIsIkJvb2xlYW4iLCJkYXRhc2V0cyIsImNvbmZpZyIsImluZm8iLCJhcHAiLCJpc0dvb2dsZVRyYWNrSnNvbiIsImxvY2F0aW9ucyIsImxhdGl0dWRlRTciLCJpc0dvb2dsZVNlbWFudGljSnNvbiIsInRpbWVsaW5lT2JqZWN0cyIsIm1ha2VQcm9ncmVzc0l0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvciIsInJvd0NvdW50IiwiYmF0Y2giLCJyb3dDb3VudEluQmF0Y2giLCJkYXRhIiwibGVuZ3RoIiwicGVyY2VudCIsIk51bWJlciIsImlzRmluaXRlIiwiYnl0ZXNVc2VkIiwic2l6ZSIsInByb2dyZXNzIiwicmVhZEJhdGNoIiwiZmlsZU5hbWUiLCJyZXN1bHQiLCJiYXRjaGVzIiwiYmF0Y2hUeXBlIiwiY29udGFpbmVyIiwianNvbnBhdGgiLCJzdHJlYW1pbmdQYXRoIiwiX0pTT05QYXRoIiwic2V0RmllbGRBdFBhdGgiLCJpIiwicHVzaCIsInNjaGVtYSIsImhlYWRlcnMiLCJPYmplY3QiLCJrZXlzIiwicmVhZEZpbGVJbkJhdGNoZXMiLCJmaWxlIiwiZmlsZUNhY2hlIiwibG9hZGVycyIsImxvYWRPcHRpb25zIiwiSlNPTkxvYWRlciIsIkNTVkxvYWRlciIsImNzdiIsIm1ldGFkYXRhIiwiYmF0Y2hJdGVyYXRvciIsInByb2dyZXNzSXRlcmF0b3IiLCJuYW1lIiwicHJvY2Vzc0ZpbGVEYXRhIiwiY29udGVudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uc29sZSIsImxvZyIsImZvcm1hdCIsInByb2Nlc3NvciIsIkRBVEFTRVRfRk9STUFUUyIsImtlcGxlcmdsIiwicHJvY2Vzc0tlcGxlcmdsSlNPTiIsInJvdyIsInByb2Nlc3NSb3dPYmplY3QiLCJnZW9qc29uIiwicHJvY2Vzc0dlb2pzb24iLCJnb29nbGVfdHJhY2siLCJwcm9jZXNzR29vZ2xlVHJhY2tHZW9qc29uIiwiZ29vZ2xlX3NlbWFudGljIiwicHJvY2Vzc0dvb2dsZVNlbWFudGljR2VvanNvbiIsImxheWVyX2xpc3QiLCJsYWJlbCIsImZpbGVzVG9EYXRhUGF5bG9hZCIsImNvbGxlY3Rpb24iLCJyZWR1Y2UiLCJhY2N1Iiwia2VwbGVyTWFwcyIsIm9wdGlvbnMiLCJjZW50ZXJNYXAiLCJtYXBTdGF0ZSIsIm5ld0RhdGFzZXQiLCJpZCIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFRQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHO0FBQ2pCQyxFQUFBQSxRQUFRLEVBQUUsVUFETztBQUVqQkMsRUFBQUEsY0FBYyxFQUFFLGdCQUZDO0FBR2pCQyxFQUFBQSxZQUFZLEVBQUU7QUFIRyxDQUFuQjtBQU1BLElBQU1DLGtCQUFrQixHQUFHO0FBQ3pCQyxFQUFBQSxTQUFTLEVBQUUsSUFEYztBQUNSO0FBQ2pCQyxFQUFBQSxTQUFTLEVBQUUsUUFGYztBQUd6QkMsRUFBQUEsYUFBYSxFQUFFLEtBSFUsQ0FHSjs7QUFISSxDQUEzQjtBQU1BLElBQU1DLG1CQUFtQixHQUFHO0FBQzFCO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQUNULEdBRFMsRUFDSjtBQUNMLGNBRlMsRUFFSztBQUNkLGNBSFMsQ0FHSTtBQUhKO0FBRmUsQ0FBNUI7O0FBU08sU0FBU0MsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDOUI7QUFDQTtBQUNBLFNBQU8sMEJBQWNBLElBQWQsTUFBd0JDLFNBQVMsQ0FBQ0QsSUFBRCxDQUFULElBQW1CRSxtQkFBbUIsQ0FBQ0YsSUFBRCxDQUE5RCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsU0FBVCxDQUFtQkQsSUFBbkIsRUFBeUI7QUFDOUIsU0FBT0EsSUFBSSxDQUFDRyxJQUFMLEtBQWMsU0FBZCxJQUEyQkgsSUFBSSxDQUFDSSxRQUF2QztBQUNEOztBQUVNLFNBQVNGLG1CQUFULENBQTZCRixJQUE3QixFQUFtQztBQUN4QyxTQUFPQSxJQUFJLENBQUNHLElBQUwsS0FBYyxtQkFBZCxJQUFxQ0gsSUFBSSxDQUFDSyxRQUFqRDtBQUNEOztBQUVNLFNBQVNDLFdBQVQsQ0FBcUJOLElBQXJCLEVBQTJCO0FBQ2hDLFNBQU9PLEtBQUssQ0FBQ0MsT0FBTixDQUFjUixJQUFkLEtBQXVCLDBCQUFjQSxJQUFJLENBQUMsQ0FBRCxDQUFsQixDQUE5QjtBQUNEOztBQUVNLFNBQVNTLGFBQVQsQ0FBdUJULElBQXZCLEVBQTZCO0FBQ2xDLFNBQU9VLE9BQU8sQ0FDWiwwQkFBY1YsSUFBZCxLQUNFQSxJQUFJLENBQUNXLFFBRFAsSUFFRVgsSUFBSSxDQUFDWSxNQUZQLElBR0VaLElBQUksQ0FBQ2EsSUFIUCxJQUlFYixJQUFJLENBQUNhLElBQUwsQ0FBVUMsR0FBVixLQUFrQixXQUxSLENBQWQ7QUFPRDs7QUFFTSxTQUFTQyxpQkFBVCxDQUEyQmYsSUFBM0IsRUFBaUM7QUFDdEMsU0FBT1UsT0FBTyxDQUFDVixJQUFJLENBQUNnQixTQUFMLElBQWtCaEIsSUFBSSxDQUFDZ0IsU0FBTCxDQUFlLENBQWYsRUFBa0JDLFVBQXJDLENBQWQ7QUFDRDs7QUFFTSxTQUFTQyxvQkFBVCxDQUE4QmxCLElBQTlCLEVBQW9DO0FBQ3pDLFNBQU9VLE9BQU8sQ0FBQ1YsSUFBSSxDQUFDbUIsZUFBTixDQUFkO0FBQ0Q7O1NBRXNCQyxvQjs7RUFvQnZCOzs7OzBHQXBCTyxpQkFBcUNDLGFBQXJDLEVBQW9EUixJQUFwRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0RTLFlBQUFBLFFBREMsR0FDVSxDQURWO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0RBR3FCRCxhQUhyQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUdZRSxZQUFBQSxLQUhaO0FBSUdDLFlBQUFBLGVBSkgsR0FJc0JELEtBQUssQ0FBQ0UsSUFBTixJQUFjRixLQUFLLENBQUNFLElBQU4sQ0FBV0MsTUFBMUIsSUFBcUMsQ0FKMUQ7QUFLSEosWUFBQUEsUUFBUSxJQUFJRSxlQUFaO0FBQ01HLFlBQUFBLE9BTkgsR0FNYUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCTixLQUFLLENBQUNPLFNBQXRCLElBQW1DUCxLQUFLLENBQUNPLFNBQU4sR0FBa0JqQixJQUFJLENBQUNrQixJQUExRCxHQUFpRSxJQU45RSxFQVFIOztBQUNNQyxZQUFBQSxRQVRIO0FBVURWLGNBQUFBLFFBQVEsRUFBUkEsUUFWQztBQVdERSxjQUFBQSxlQUFlLEVBQWZBO0FBWEMsZUFhR0ksTUFBTSxDQUFDQyxRQUFQLENBQWdCRixPQUFoQixJQUEyQjtBQUFDQSxjQUFBQSxPQUFPLEVBQVBBO0FBQUQsYUFBM0IsR0FBdUMsRUFiMUM7QUFBQTtBQWdCSCxtREFBVUosS0FBVjtBQUFpQlMsY0FBQUEsUUFBUSxFQUFSQTtBQUFqQjs7QUFoQkc7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQXFCZ0JDLFM7Ozs7OytGQUFoQixrQkFBMEJaLGFBQTFCLEVBQXlDYSxRQUF6QztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0RDLFlBQUFBLE1BREMsR0FDUSxJQURSO0FBRUNDLFlBQUFBLE9BRkQsR0FFVyxFQUZYO0FBQUE7QUFBQTtBQUFBO0FBQUEseURBSXFCZixhQUpyQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUlZRSxZQUFBQSxLQUpaOztBQUtIO0FBQ0E7QUFDQTtBQUNBLGdCQUFJQSxLQUFLLENBQUNjLFNBQU4sS0FBb0JoRCxVQUFVLENBQUNHLFlBQW5DLEVBQWlEO0FBQy9DLGtCQUFJK0IsS0FBSyxDQUFDZSxTQUFWLEVBQXFCO0FBQ25CSCxnQkFBQUEsTUFBTSxxQkFBT1osS0FBSyxDQUFDZSxTQUFiLENBQU47QUFDRCxlQUg4QyxDQUkvQztBQUNBOzs7QUFDQSxrQkFBSWYsS0FBSyxDQUFDZ0IsUUFBTixJQUFrQmhCLEtBQUssQ0FBQ2dCLFFBQU4sQ0FBZWIsTUFBZixHQUF3QixDQUE5QyxFQUFpRDtBQUN6Q2MsZ0JBQUFBLGFBRHlDLEdBQ3pCLElBQUlDLGVBQUosQ0FBY2xCLEtBQUssQ0FBQ2dCLFFBQXBCLENBRHlCO0FBRS9DQyxnQkFBQUEsYUFBYSxDQUFDRSxjQUFkLENBQTZCUCxNQUE3QixFQUFxQ0MsT0FBckM7QUFDRCxlQUhELE1BR08sSUFBSWIsS0FBSyxDQUFDZ0IsUUFBTixJQUFrQmhCLEtBQUssQ0FBQ2dCLFFBQU4sQ0FBZWIsTUFBZixLQUEwQixDQUFoRCxFQUFtRDtBQUN4RDtBQUNBO0FBQ0FTLGdCQUFBQSxNQUFNLEdBQUdDLE9BQVQ7QUFDRDtBQUNGLGFBZEQsTUFjTztBQUNMLG1CQUFTTyxDQUFULEdBQWEsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcEIsS0FBSyxDQUFDRSxJQUFOLENBQVdDLE1BQS9CLEVBQXVDaUIsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQ1AsZ0JBQUFBLE9BQU8sQ0FBQ1EsSUFBUixDQUFhckIsS0FBSyxDQUFDRSxJQUFOLENBQVdrQixDQUFYLENBQWI7QUFDRDtBQUNGOztBQTFCRTtBQTRCSCxpRUFDS3BCLEtBREwsR0FFTUEsS0FBSyxDQUFDc0IsTUFBTixHQUFlO0FBQUNDLGNBQUFBLE9BQU8sRUFBRUMsTUFBTSxDQUFDQyxJQUFQLENBQVl6QixLQUFLLENBQUNzQixNQUFsQjtBQUFWLGFBQWYsR0FBc0QsRUFGNUQ7QUFHRVgsY0FBQUEsUUFBUSxFQUFSQSxRQUhGO0FBSUU7QUFDQVQsY0FBQUEsSUFBSSxFQUFFVSxNQUFNLEdBQUdBLE1BQUgsR0FBWUM7QUFMMUI7O0FBNUJHO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FzQ2VhLGlCOzs7OztxR0FBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtDQyxZQUFBQSxJQUFsQyxRQUFrQ0EsSUFBbEMsd0JBQXdDQyxTQUF4QyxFQUF3Q0EsU0FBeEMsK0JBQW9ELEVBQXBELHVDQUF3REMsT0FBeEQsRUFBd0RBLE9BQXhELDZCQUFrRSxFQUFsRSx5Q0FBc0VDLFdBQXRFLEVBQXNFQSxXQUF0RSxpQ0FBb0YsRUFBcEY7QUFDTEQsWUFBQUEsT0FBTyxJQUFJRSxnQkFBSixFQUFnQkMsY0FBaEIsNkNBQThCSCxPQUE5QixFQUFQO0FBQ0FDLFlBQUFBLFdBQVc7QUFDVEcsY0FBQUEsR0FBRyxFQUFFL0Qsa0JBREk7QUFFVE8sY0FBQUEsSUFBSSxFQUFFSCxtQkFGRztBQUdUNEQsY0FBQUEsUUFBUSxFQUFFO0FBSEQsZUFJTkosV0FKTSxDQUFYO0FBRks7QUFBQSxtQkFTdUIsMEJBQWVILElBQWYsRUFBcUJFLE9BQXJCLEVBQThCQyxXQUE5QixDQVR2Qjs7QUFBQTtBQVNDSyxZQUFBQSxhQVREO0FBVUNDLFlBQUFBLGdCQVZELEdBVW9CdkMsb0JBQW9CLENBQUNzQyxhQUFELEVBQWdCO0FBQUMzQixjQUFBQSxJQUFJLEVBQUVtQixJQUFJLENBQUNuQjtBQUFaLGFBQWhCLENBVnhDO0FBQUEsOENBWUVFLFNBQVMsQ0FBQzBCLGdCQUFELEVBQW1CVCxJQUFJLENBQUNVLElBQXhCLENBWlg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQWVBLFNBQVNDLGVBQVQsUUFBK0M7QUFBQSxNQUFyQkMsT0FBcUIsU0FBckJBLE9BQXFCO0FBQUEsTUFBWlgsU0FBWSxTQUFaQSxTQUFZO0FBQ3BELFNBQU8sSUFBSVksT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUFBLFFBQy9CeEMsSUFEK0IsR0FDdkJxQyxPQUR1QixDQUMvQnJDLElBRCtCLEVBRXRDOztBQUNBeUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7QUFDQSxRQUFJQyxNQUFKO0FBQ0EsUUFBSUMsU0FBSjs7QUFDQSxRQUFJNUQsYUFBYSxDQUFDZ0IsSUFBRCxDQUFqQixFQUF5QjtBQUN2QjJDLE1BQUFBLE1BQU0sR0FBR0UsaUNBQWdCQyxRQUF6QjtBQUNBRixNQUFBQSxTQUFTLEdBQUdHLGtDQUFaO0FBQ0QsS0FIRCxNQUdPLElBQUlsRSxXQUFXLENBQUNtQixJQUFELENBQWYsRUFBdUI7QUFDNUIyQyxNQUFBQSxNQUFNLEdBQUdFLGlDQUFnQkcsR0FBekI7QUFDQUosTUFBQUEsU0FBUyxHQUFHSywrQkFBWjtBQUNELEtBSE0sTUFHQSxJQUFJM0UsU0FBUyxDQUFDMEIsSUFBRCxDQUFiLEVBQXFCO0FBQzFCMkMsTUFBQUEsTUFBTSxHQUFHRSxpQ0FBZ0JLLE9BQXpCO0FBQ0FOLE1BQUFBLFNBQVMsR0FBR08sNkJBQVo7QUFDRCxLQUhNLE1BR0EsSUFBSTdELGlCQUFpQixDQUFDVSxJQUFELENBQXJCLEVBQTZCO0FBQ2xDO0FBQ0F5QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBQyxNQUFBQSxNQUFNLEdBQUdFLGlDQUFnQk8sWUFBekI7QUFDQVIsTUFBQUEsU0FBUyxHQUFHUyx3Q0FBWjtBQUNELEtBTE0sTUFLQSxJQUFJNUQsb0JBQW9CLENBQUNPLElBQUQsQ0FBeEIsRUFBK0I7QUFDcEN5QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWjtBQUNBQyxNQUFBQSxNQUFNLEdBQUdFLGlDQUFnQlMsZUFBekI7QUFDQVYsTUFBQUEsU0FBUyxHQUFHVywyQ0FBWjtBQUNEOztBQUVELFFBQUlaLE1BQUosRUFBWTtBQUNWLFVBQUlDLFNBQUosRUFBZTtBQUNiLFlBQU1sQyxNQUFNLEdBQUdrQyxTQUFTLENBQUM1QyxJQUFELENBQXhCO0FBQ0EsWUFBTXdELFVBQVUsR0FBRyxFQUFuQjs7QUFDQSxZQUFHWixTQUFTLEtBQUtXLDJDQUFkLElBQThDWCxTQUFTLEtBQUtTLHdDQUEvRCxFQUF5RjtBQUN2RkcsVUFBQUEsVUFBVSxDQUFDckMsSUFBWCxDQUFnQjtBQUNkbkIsWUFBQUEsSUFBSSxFQUFFVSxNQURRO0FBRWR0QixZQUFBQSxJQUFJLEVBQUU7QUFDSnFFLGNBQUFBLEtBQUssRUFBRXBCLE9BQU8sQ0FBQzVCLFFBRFg7QUFFSmtDLGNBQUFBLE1BQU0sRUFBTkE7QUFGSTtBQUZRLFdBQWhCO0FBT0QsU0FSRCxNQVFPLElBQUdDLFNBQVMsS0FBS1csMkNBQWpCLEVBQStDO0FBQ3BEQyxVQUFBQSxVQUFVLENBQUNyQyxJQUFYLENBQWdCO0FBQ2RuQixZQUFBQSxJQUFJLEVBQUVVLE1BQU0sQ0FBQyxDQUFELENBREU7QUFFZHRCLFlBQUFBLElBQUksRUFBRTtBQUNKcUUsY0FBQUEsS0FBSyxFQUFFLHNCQURIO0FBRUpkLGNBQUFBLE1BQU0sRUFBTkE7QUFGSTtBQUZRLFdBQWhCO0FBT0FhLFVBQUFBLFVBQVUsQ0FBQ3JDLElBQVgsQ0FBZ0I7QUFDZG5CLFlBQUFBLElBQUksRUFBRVUsTUFBTSxDQUFDLENBQUQsQ0FERTtBQUVkdEIsWUFBQUEsSUFBSSxFQUFFO0FBQ0pxRSxjQUFBQSxLQUFLLEVBQUUsMkJBREg7QUFFSmQsY0FBQUEsTUFBTSxFQUFOQTtBQUZJO0FBRlEsV0FBaEI7QUFPRCxTQWZNLE1BZUE7QUFDTGEsVUFBQUEsVUFBVSxDQUFDckMsSUFBWCxDQUFnQjtBQUNkbkIsWUFBQUEsSUFBSSxFQUFFVSxNQURRO0FBRWR0QixZQUFBQSxJQUFJLEVBQUU7QUFDSnFFLGNBQUFBLEtBQUssRUFBRSxrQkFESDtBQUVKZCxjQUFBQSxNQUFNLEVBQU5BO0FBRkk7QUFGUSxXQUFoQixFQURLLENBUUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFREosUUFBQUEsT0FBTywrQ0FBS2IsU0FBTCxHQUFtQjhCLFVBQW5CLEVBQVA7QUFDRDtBQUNGOztBQUVEaEIsSUFBQUEsTUFBTSxDQUFDLG9CQUFELENBQU47QUFDRCxHQTNFTSxDQUFQO0FBNEVEOztBQUVNLFNBQVNrQixrQkFBVCxDQUE0QmhDLFNBQTVCLEVBQXVDO0FBQzVDO0FBQ0EsTUFBTWlDLFVBQVUsR0FBR2pDLFNBQVMsQ0FBQ2tDLE1BQVYsQ0FDakIsVUFBQ0MsSUFBRCxFQUFPcEMsSUFBUCxFQUFnQjtBQUFBLFFBQ1B6QixJQURPLEdBQ1l5QixJQURaLENBQ1B6QixJQURPO0FBQUEscUJBQ1l5QixJQURaLENBQ0RyQyxJQURDO0FBQUEsUUFDREEsSUFEQywyQkFDTSxFQUROO0FBQUEsUUFFUHVELE1BRk8sR0FFR3ZELElBRkgsQ0FFUHVELE1BRk87O0FBR2QsUUFBSUEsTUFBTSxLQUFLRSxpQ0FBZ0JDLFFBQS9CLEVBQXlDO0FBQ3ZDO0FBQ0FlLE1BQUFBLElBQUksQ0FBQ0MsVUFBTCxDQUFnQjNDLElBQWhCLGlDQUNLbkIsSUFETDtBQUVFK0QsUUFBQUEsT0FBTyxFQUFFO0FBQ1BDLFVBQUFBLFNBQVMsRUFBRSxFQUFFaEUsSUFBSSxDQUFDYixNQUFMLElBQWVhLElBQUksQ0FBQ2IsTUFBTCxDQUFZOEUsUUFBN0I7QUFESjtBQUZYO0FBTUQsS0FSRCxNQVFPLElBQUlwQixpQ0FBZ0JGLE1BQWhCLENBQUosRUFBNkI7QUFDbEM7QUFDQSxVQUFNdUIsVUFBVSxHQUFHO0FBQ2pCbEUsUUFBQUEsSUFBSSxFQUFKQSxJQURpQjtBQUVqQlosUUFBQUEsSUFBSTtBQUNGK0UsVUFBQUEsRUFBRSxFQUFFL0UsSUFBSSxDQUFDK0UsRUFBTCxJQUFXLDJCQUFlLENBQWY7QUFEYixXQUVDL0UsSUFGRDtBQUZhLE9BQW5CO0FBT0F5RSxNQUFBQSxJQUFJLENBQUMzRSxRQUFMLENBQWNpQyxJQUFkLENBQW1CK0MsVUFBbkI7QUFDRDs7QUFDRCxXQUFPTCxJQUFQO0FBQ0QsR0F4QmdCLEVBeUJqQjtBQUFDM0UsSUFBQUEsUUFBUSxFQUFFLEVBQVg7QUFBZTRFLElBQUFBLFVBQVUsRUFBRTtBQUEzQixHQXpCaUIsQ0FBbkIsQ0FGNEMsQ0E4QjVDO0FBQ0E7O0FBQ0EsU0FBT0gsVUFBVSxDQUFDRyxVQUFYLENBQXNCTSxNQUF0QixDQUE2QjtBQUFDbEYsSUFBQUEsUUFBUSxFQUFFeUUsVUFBVSxDQUFDekU7QUFBdEIsR0FBN0IsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICdAbG9hZGVycy5nbC9wb2x5ZmlsbHMnO1xuaW1wb3J0IHtwYXJzZUluQmF0Y2hlc30gZnJvbSAnQGxvYWRlcnMuZ2wvY29yZSc7XG5pbXBvcnQge0pTT05Mb2FkZXIsIF9KU09OUGF0aH0gZnJvbSAnQGxvYWRlcnMuZ2wvanNvbic7XG5pbXBvcnQge0NTVkxvYWRlcn0gZnJvbSAnQGxvYWRlcnMuZ2wvY3N2JztcbmltcG9ydCB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJvY2Vzc0dlb2pzb24sIHByb2Nlc3NHb29nbGVTZW1hbnRpY0dlb2pzb24sXG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJvY2Vzc0dvb2dsZVRyYWNrR2VvanNvbixcbiAgcHJvY2Vzc0tlcGxlcmdsSlNPTixcbiAgcHJvY2Vzc1Jvd09iamVjdFxufSBmcm9tICcuL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCB7aXNQbGFpbk9iamVjdCwgZ2VuZXJhdGVIYXNoSWR9IGZyb20gJ3V0aWxzL3V0aWxzJztcbmltcG9ydCB7REFUQVNFVF9GT1JNQVRTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmltcG9ydCB7Y29udmVydF90cmFja19saW5lfSBmcm9tICcuLi91dGlscy9nb29nbGUtdXRpbHMnO1xuXG5jb25zdCBCQVRDSF9UWVBFID0ge1xuICBNRVRBREFUQTogJ21ldGFkYXRhJyxcbiAgUEFSVElBTF9SRVNVTFQ6ICdwYXJ0aWFsLXJlc3VsdCcsXG4gIEZJTkFMX1JFU1VMVDogJ2ZpbmFsLXJlc3VsdCdcbn07XG5cbmNvbnN0IENTVl9MT0FERVJfT1BUSU9OUyA9IHtcbiAgYmF0Y2hTaXplOiA0MDAwLCAvLyBBdXRvIGRlIHRlY3QgbnVtYmVyIG9mIHJvd3MgcGVyIGJhdGNoIChuZXR3b3JrIGJhdGNoIHNpemUpXG4gIHJvd0Zvcm1hdDogJ29iamVjdCcsXG4gIGR5bmFtaWNUeXBpbmc6IGZhbHNlIC8vIG5vdCB3b3JraW5nIGZvciBub3dcbn07XG5cbmNvbnN0IEpTT05fTE9BREVSX09QVElPTlMgPSB7XG4gIC8vIGluc3RydWN0IGxvYWRlcnMuZ2wgb24gd2hhdCBqc29uIHBhdGhzIHRvIHN0cmVhbVxuICBqc29ucGF0aHM6IFtcbiAgICAnJCcsIC8vIEpTT04gUm93IGFycmF5XG4gICAgJyQuZmVhdHVyZXMnLCAvLyBHZW9KU09OXG4gICAgJyQuZGF0YXNldHMnIC8vIEtlcGxlckdMIEpTT05cbiAgXVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzR2VvSnNvbihqc29uKSB7XG4gIC8vIGpzb24gY2FuIGJlIGZlYXR1cmUgY29sbGVjdGlvblxuICAvLyBvciBzaW5nbGUgZmVhdHVyZVxuICByZXR1cm4gaXNQbGFpbk9iamVjdChqc29uKSAmJiAoaXNGZWF0dXJlKGpzb24pIHx8IGlzRmVhdHVyZUNvbGxlY3Rpb24oanNvbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGZWF0dXJlKGpzb24pIHtcbiAgcmV0dXJuIGpzb24udHlwZSA9PT0gJ0ZlYXR1cmUnICYmIGpzb24uZ2VvbWV0cnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZlYXR1cmVDb2xsZWN0aW9uKGpzb24pIHtcbiAgcmV0dXJuIGpzb24udHlwZSA9PT0gJ0ZlYXR1cmVDb2xsZWN0aW9uJyAmJiBqc29uLmZlYXR1cmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSb3dPYmplY3QoanNvbikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShqc29uKSAmJiBpc1BsYWluT2JqZWN0KGpzb25bMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNLZXBsZXJHbE1hcChqc29uKSB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIGlzUGxhaW5PYmplY3QoanNvbikgJiZcbiAgICAgIGpzb24uZGF0YXNldHMgJiZcbiAgICAgIGpzb24uY29uZmlnICYmXG4gICAgICBqc29uLmluZm8gJiZcbiAgICAgIGpzb24uaW5mby5hcHAgPT09ICdrZXBsZXIuZ2wnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0dvb2dsZVRyYWNrSnNvbihqc29uKSB7XG4gIHJldHVybiBCb29sZWFuKGpzb24ubG9jYXRpb25zICYmIGpzb24ubG9jYXRpb25zWzBdLmxhdGl0dWRlRTcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHb29nbGVTZW1hbnRpY0pzb24oanNvbikge1xuICByZXR1cm4gQm9vbGVhbihqc29uLnRpbWVsaW5lT2JqZWN0cylcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uKiBtYWtlUHJvZ3Jlc3NJdGVyYXRvcihhc3luY0l0ZXJhdG9yLCBpbmZvKSB7XG4gIGxldCByb3dDb3VudCA9IDA7XG5cbiAgZm9yIGF3YWl0IChjb25zdCBiYXRjaCBvZiBhc3luY0l0ZXJhdG9yKSB7XG4gICAgY29uc3Qgcm93Q291bnRJbkJhdGNoID0gKGJhdGNoLmRhdGEgJiYgYmF0Y2guZGF0YS5sZW5ndGgpIHx8IDA7XG4gICAgcm93Q291bnQgKz0gcm93Q291bnRJbkJhdGNoO1xuICAgIGNvbnN0IHBlcmNlbnQgPSBOdW1iZXIuaXNGaW5pdGUoYmF0Y2guYnl0ZXNVc2VkKSA/IGJhdGNoLmJ5dGVzVXNlZCAvIGluZm8uc2l6ZSA6IG51bGw7XG5cbiAgICAvLyBVcGRhdGUgcHJvZ3Jlc3Mgb2JqZWN0XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSB7XG4gICAgICByb3dDb3VudCxcbiAgICAgIHJvd0NvdW50SW5CYXRjaCxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIC4uLihOdW1iZXIuaXNGaW5pdGUocGVyY2VudCkgPyB7cGVyY2VudH0gOiB7fSlcbiAgICB9O1xuXG4gICAgeWllbGQgey4uLmJhdGNoLCBwcm9ncmVzc307XG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogcmVhZEJhdGNoKGFzeW5jSXRlcmF0b3IsIGZpbGVOYW1lKSB7XG4gIGxldCByZXN1bHQgPSBudWxsO1xuICBjb25zdCBiYXRjaGVzID0gW107XG5cbiAgZm9yIGF3YWl0IChjb25zdCBiYXRjaCBvZiBhc3luY0l0ZXJhdG9yKSB7XG4gICAgLy8gTGFzdCBiYXRjaCB3aWxsIGhhdmUgdGhpcyBzcGVjaWFsIHR5cGUgYW5kIHdpbGwgcHJvdmlkZSBhbGwgdGhlIHJvb3RcbiAgICAvLyBwcm9wZXJ0aWVzIG9mIHRoZSBwYXJzZWQgZG9jdW1lbnQuXG4gICAgLy8gT25seSBqc29uIHBhcnNlIHdpbGwgaGF2ZSBgRklOQUxfUkVTVUxUYFxuICAgIGlmIChiYXRjaC5iYXRjaFR5cGUgPT09IEJBVENIX1RZUEUuRklOQUxfUkVTVUxUKSB7XG4gICAgICBpZiAoYmF0Y2guY29udGFpbmVyKSB7XG4gICAgICAgIHJlc3VsdCA9IHsuLi5iYXRjaC5jb250YWluZXJ9O1xuICAgICAgfVxuICAgICAgLy8gU2V0IHRoZSBzdHJlYW1lZCBkYXRhIGNvcnJlY3RseSBpcyBCYXRjaCBqc29uIHBhdGggaXMgc2V0XG4gICAgICAvLyBhbmQgdGhlIHBhdGggc3RyZWFtZWQgaXMgbm90IHRoZSB0b3AgbGV2ZWwgb2JqZWN0IChqc29ucGF0aCA9ICckJylcbiAgICAgIGlmIChiYXRjaC5qc29ucGF0aCAmJiBiYXRjaC5qc29ucGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbWluZ1BhdGggPSBuZXcgX0pTT05QYXRoKGJhdGNoLmpzb25wYXRoKTtcbiAgICAgICAgc3RyZWFtaW5nUGF0aC5zZXRGaWVsZEF0UGF0aChyZXN1bHQsIGJhdGNoZXMpO1xuICAgICAgfSBlbHNlIGlmIChiYXRjaC5qc29ucGF0aCAmJiBiYXRjaC5qc29ucGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgLy8gVGhlIHN0cmVhbWVkIG9iamVjdCBpcyBhIFJPVyBKU09OLWJhdGNoIChqc29ucGF0aCA9ICckJylcbiAgICAgICAgLy8gcm93IG9iamVjdHNcbiAgICAgICAgcmVzdWx0ID0gYmF0Y2hlcztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXRjaC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJhdGNoZXMucHVzaChiYXRjaC5kYXRhW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB5aWVsZCB7XG4gICAgICAuLi5iYXRjaCxcbiAgICAgIC4uLihiYXRjaC5zY2hlbWEgPyB7aGVhZGVyczogT2JqZWN0LmtleXMoYmF0Y2guc2NoZW1hKX0gOiB7fSksXG4gICAgICBmaWxlTmFtZSxcbiAgICAgIC8vIGlmIGRhdGFzZXQgaXMgQ1NWLCBkYXRhIGlzIHNldCB0byB0aGUgcmF3IGJhdGNoZXNcbiAgICAgIGRhdGE6IHJlc3VsdCA/IHJlc3VsdCA6IGJhdGNoZXNcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkRmlsZUluQmF0Y2hlcyh7ZmlsZSwgZmlsZUNhY2hlID0gW10sIGxvYWRlcnMgPSBbXSwgbG9hZE9wdGlvbnMgPSB7fX0pIHtcbiAgbG9hZGVycyA9IFtKU09OTG9hZGVyLCBDU1ZMb2FkZXIsIC4uLmxvYWRlcnNdO1xuICBsb2FkT3B0aW9ucyA9IHtcbiAgICBjc3Y6IENTVl9MT0FERVJfT1BUSU9OUyxcbiAgICBqc29uOiBKU09OX0xPQURFUl9PUFRJT05TLFxuICAgIG1ldGFkYXRhOiB0cnVlLFxuICAgIC4uLmxvYWRPcHRpb25zXG4gIH07XG5cbiAgY29uc3QgYmF0Y2hJdGVyYXRvciA9IGF3YWl0IHBhcnNlSW5CYXRjaGVzKGZpbGUsIGxvYWRlcnMsIGxvYWRPcHRpb25zKTtcbiAgY29uc3QgcHJvZ3Jlc3NJdGVyYXRvciA9IG1ha2VQcm9ncmVzc0l0ZXJhdG9yKGJhdGNoSXRlcmF0b3IsIHtzaXplOiBmaWxlLnNpemV9KTtcblxuICByZXR1cm4gcmVhZEJhdGNoKHByb2dyZXNzSXRlcmF0b3IsIGZpbGUubmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzRmlsZURhdGEoe2NvbnRlbnQsIGZpbGVDYWNoZX0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB7ZGF0YX0gPSBjb250ZW50O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coJ3N0YXJ0IGFuYWx5emluZycpO1xuICAgIGxldCBmb3JtYXQ7XG4gICAgbGV0IHByb2Nlc3NvcjtcbiAgICBpZiAoaXNLZXBsZXJHbE1hcChkYXRhKSkge1xuICAgICAgZm9ybWF0ID0gREFUQVNFVF9GT1JNQVRTLmtlcGxlcmdsO1xuICAgICAgcHJvY2Vzc29yID0gcHJvY2Vzc0tlcGxlcmdsSlNPTjtcbiAgICB9IGVsc2UgaWYgKGlzUm93T2JqZWN0KGRhdGEpKSB7XG4gICAgICBmb3JtYXQgPSBEQVRBU0VUX0ZPUk1BVFMucm93O1xuICAgICAgcHJvY2Vzc29yID0gcHJvY2Vzc1Jvd09iamVjdDtcbiAgICB9IGVsc2UgaWYgKGlzR2VvSnNvbihkYXRhKSkge1xuICAgICAgZm9ybWF0ID0gREFUQVNFVF9GT1JNQVRTLmdlb2pzb247XG4gICAgICBwcm9jZXNzb3IgPSBwcm9jZXNzR2VvanNvbjtcbiAgICB9IGVsc2UgaWYgKGlzR29vZ2xlVHJhY2tKc29uKGRhdGEpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coJ2dvb2dsZSBkZXRlY3RlZCcpO1xuICAgICAgZm9ybWF0ID0gREFUQVNFVF9GT1JNQVRTLmdvb2dsZV90cmFjaztcbiAgICAgIHByb2Nlc3NvciA9IHByb2Nlc3NHb29nbGVUcmFja0dlb2pzb247XG4gICAgfSBlbHNlIGlmIChpc0dvb2dsZVNlbWFudGljSnNvbihkYXRhKSl7XG4gICAgICBjb25zb2xlLmxvZygnZ29vZ2xlIHNlbWFudGljIGRldGVjdGVkJylcbiAgICAgIGZvcm1hdCA9IERBVEFTRVRfRk9STUFUUy5nb29nbGVfc2VtYW50aWM7XG4gICAgICBwcm9jZXNzb3IgPSBwcm9jZXNzR29vZ2xlU2VtYW50aWNHZW9qc29uO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQpIHtcbiAgICAgIGlmIChwcm9jZXNzb3IpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcHJvY2Vzc29yKGRhdGEpO1xuICAgICAgICBjb25zdCBsYXllcl9saXN0ID0gW107XG4gICAgICAgIGlmKHByb2Nlc3NvciAhPT0gcHJvY2Vzc0dvb2dsZVNlbWFudGljR2VvanNvbiAmJiBwcm9jZXNzb3IgIT09IHByb2Nlc3NHb29nbGVUcmFja0dlb2pzb24pe1xuICAgICAgICAgIGxheWVyX2xpc3QucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICAgIGxhYmVsOiBjb250ZW50LmZpbGVOYW1lLFxuICAgICAgICAgICAgICBmb3JtYXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmKHByb2Nlc3NvciA9PT0gcHJvY2Vzc0dvb2dsZVNlbWFudGljR2VvanNvbikge1xuICAgICAgICAgIGxheWVyX2xpc3QucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiByZXN1bHRbMF0sXG4gICAgICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnYWN0aXZpdHkgaW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgICBmb3JtYXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsYXllcl9saXN0LnB1c2goe1xuICAgICAgICAgICAgZGF0YTogcmVzdWx0WzFdLFxuICAgICAgICAgICAgaW5mbzoge1xuICAgICAgICAgICAgICBsYWJlbDogJ3Zpc2l0ZWQgcGxhY2UgaW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgICBmb3JtYXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxheWVyX2xpc3QucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnR01UIHJhdyBncHMgZGF0YScsXG4gICAgICAgICAgICAgIGZvcm1hdFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGxheWVyX2xpc3QucHVzaCh7XG4gICAgICAgICAgLy8gICBkYXRhOiBwcm9jZXNzR2VvanNvbihjb252ZXJ0X3RyYWNrX2xpbmUocmVzdWx0KSksXG4gICAgICAgICAgLy8gICBpbmZvOiB7XG4gICAgICAgICAgLy8gICAgIGxhYmVsOiAndHJhY2snLFxuICAgICAgICAgIC8vICAgICBmb3JtYXRcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUoWy4uLmZpbGVDYWNoZSwgLi4ubGF5ZXJfbGlzdF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlamVjdCgnVW5rbm93IEZpbGUgRm9ybWF0Jyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZXNUb0RhdGFQYXlsb2FkKGZpbGVDYWNoZSkge1xuICAvLyBzZXBlcmF0ZSBvdXQgZmlsZXMgd2hpY2ggY291bGQgYmUgYSBzaW5nbGUgZGF0YXNldHMuIG9yIGEga2VwbGVyZ2wgbWFwIGpzb25cbiAgY29uc3QgY29sbGVjdGlvbiA9IGZpbGVDYWNoZS5yZWR1Y2UoXG4gICAgKGFjY3UsIGZpbGUpID0+IHtcbiAgICAgIGNvbnN0IHtkYXRhLCBpbmZvID0ge319ID0gZmlsZTtcbiAgICAgIGNvbnN0IHtmb3JtYXR9ID0gaW5mbztcbiAgICAgIGlmIChmb3JtYXQgPT09IERBVEFTRVRfRk9STUFUUy5rZXBsZXJnbCkge1xuICAgICAgICAvLyBpZiBmaWxlIGNvbnRhaW5zIGEgc2luZ2xlIGtlcGxlciBtYXAgZGF0YXNldCAmIGNvbmZpZ1xuICAgICAgICBhY2N1LmtlcGxlck1hcHMucHVzaCh7XG4gICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjZW50ZXJNYXA6ICEoZGF0YS5jb25maWcgJiYgZGF0YS5jb25maWcubWFwU3RhdGUpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoREFUQVNFVF9GT1JNQVRTW2Zvcm1hdF0pIHtcbiAgICAgICAgLy8gaWYgZmlsZSBjb250YWlucyBvbmx5IGRhdGFcbiAgICAgICAgY29uc3QgbmV3RGF0YXNldCA9IHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIGlkOiBpbmZvLmlkIHx8IGdlbmVyYXRlSGFzaElkKDQpLFxuICAgICAgICAgICAgLi4uaW5mb1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYWNjdS5kYXRhc2V0cy5wdXNoKG5ld0RhdGFzZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSxcbiAgICB7ZGF0YXNldHM6IFtdLCBrZXBsZXJNYXBzOiBbXX1cbiAgKTtcblxuICAvLyBhZGQga2VwbGVyIG1hcCBmaXJzdCB3aXRoIGNvbmZpZ1xuICAvLyBhZGQgZGF0YXNldHMgbGF0ZXIgaW4gb25lIGFkZCBkYXRhIGNhbGxcbiAgcmV0dXJuIGNvbGxlY3Rpb24ua2VwbGVyTWFwcy5jb25jYXQoe2RhdGFzZXRzOiBjb2xsZWN0aW9uLmRhdGFzZXRzfSk7XG59XG4iXX0=