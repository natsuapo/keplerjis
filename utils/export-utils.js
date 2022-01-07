"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMSEdge = isMSEdge;
exports.getScaleFromImageSize = getScaleFromImageSize;
exports.calculateExportImageSize = calculateExportImageSize;
exports.convertToPng = convertToPng;
exports.dataURItoBlob = dataURItoBlob;
exports.downloadFile = downloadFile;
exports.exportImage = exportImage;
exports.exportToJsonString = exportToJsonString;
exports.getMapJSON = getMapJSON;
exports.exportJson = exportJson;
exports.exportHtml = exportHtml;
exports.exportData = exportData;
exports.exportMap = exportMap;
exports["default"] = exports.DEFAULT_EXPORT_JSON_SETTINGS = exports.DEFAULT_DATA_NAME = exports.DEFAULT_JSON_NAME = exports.DEFAULT_HTML_NAME = exports.DEFAULT_IMAGE_NAME = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _domToImage = _interopRequireDefault(require("./dom-to-image"));

var _window = require("global/window");

var _defaultSettings = require("../constants/default-settings");

var _exportMapHtml = require("../templates/export-map-html");

var _dataProcessor = require("../processors/data-processor");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _utils = require("./utils");

var _dataContainerUtils = require("./table-utils/data-container-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Default file names
 */
var DEFAULT_IMAGE_NAME = 'kepler.gl.png';
exports.DEFAULT_IMAGE_NAME = DEFAULT_IMAGE_NAME;
var DEFAULT_HTML_NAME = 'kepler.gl.html';
exports.DEFAULT_HTML_NAME = DEFAULT_HTML_NAME;
var DEFAULT_JSON_NAME = 'kepler.gl.json';
exports.DEFAULT_JSON_NAME = DEFAULT_JSON_NAME;
var DEFAULT_DATA_NAME = 'kepler.gl';
/**
 * Default json export settings
 * @type {{hasData: boolean}}
 */

exports.DEFAULT_DATA_NAME = DEFAULT_DATA_NAME;
var DEFAULT_EXPORT_JSON_SETTINGS = {
  hasData: true
};
exports.DEFAULT_EXPORT_JSON_SETTINGS = DEFAULT_EXPORT_JSON_SETTINGS;

var defaultResolution = _defaultSettings.EXPORT_IMG_RESOLUTION_OPTIONS.find(function (op) {
  return op.id === _defaultSettings.RESOLUTIONS.ONE_X;
});

var defaultRatio = _defaultSettings.EXPORT_IMG_RATIO_OPTIONS.find(function (op) {
  return op.id === _defaultSettings.EXPORT_IMG_RATIOS.FOUR_BY_THREE;
});

function isMSEdge(window) {
  return Boolean(window.navigator && window.navigator.msSaveOrOpenBlob);
}

function getScaleFromImageSize() {
  var imageW = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var imageH = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mapW = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var mapH = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if ([imageW, imageH, mapW, mapH].some(function (d) {
    return d <= 0;
  })) {
    return 1;
  }

  var base = imageW / imageH > 1 ? imageW : imageH;
  var mapBase = imageW / imageH > 1 ? mapW : mapH;
  return base / mapBase;
}

function calculateExportImageSize(_ref) {
  var mapW = _ref.mapW,
      mapH = _ref.mapH,
      ratio = _ref.ratio,
      resolution = _ref.resolution;

  if (mapW <= 0 || mapH <= 0) {
    return null;
  }

  var ratioItem = _defaultSettings.EXPORT_IMG_RATIO_OPTIONS.find(function (op) {
    return op.id === ratio;
  }) || defaultRatio;
  var resolutionItem = _defaultSettings.EXPORT_IMG_RESOLUTION_OPTIONS.find(function (op) {
    return op.id === resolution;
  }) || defaultResolution;

  var _resolutionItem$getSi = resolutionItem.getSize(mapW, mapH),
      scaledWidth = _resolutionItem$getSi.width,
      scaledHeight = _resolutionItem$getSi.height;

  var _ratioItem$getSize = ratioItem.getSize(scaledWidth, scaledHeight),
      imageW = _ratioItem$getSize.width,
      imageH = _ratioItem$getSize.height;

  var _ref2 = ratioItem.id === _defaultSettings.EXPORT_IMG_RATIOS.CUSTOM ? {} : resolutionItem,
      scale = _ref2.scale;

  return {
    scale: scale,
    imageW: imageW,
    imageH: imageH
  };
}

function convertToPng(sourceElem, options) {
  return _domToImage["default"].toPng(sourceElem, options);
}

function dataURItoBlob(dataURI) {
  var binary = (0, _window.atob)(dataURI.split(',')[1]); // separate out the mime component

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // write the bytes of the string to an ArrayBuffer

  var ab = new _window.ArrayBuffer(binary.length); // create a view into the buffer

  var ia = new _window.Uint8Array(ab);

  for (var i = 0; i < binary.length; i++) {
    ia[i] = binary.charCodeAt(i);
  }

  return new _window.Blob([ab], {
    type: mimeString
  });
}

function downloadFile(fileBlob, fileName) {
  if (isMSEdge(window)) {
    window.navigator.msSaveOrOpenBlob(fileBlob, fileName);
  } else {
    var url = _window.URL.createObjectURL(fileBlob);

    var link = _window.document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);

    _window.document.body.appendChild(link);

    link.click();

    _window.document.body.removeChild(link);

    _window.URL.revokeObjectURL(url);
  }
}

function exportImage(state) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_IMAGE_NAME;
  var imageDataUri = state.uiState.exportImage.imageDataUri;

  if (imageDataUri) {
    var file = dataURItoBlob(imageDataUri);
    downloadFile(file, filename);
  }
}

function exportToJsonString(data) {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return e.description;
  }
}

function getMapJSON(state) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_EXPORT_JSON_SETTINGS;
  var hasData = options.hasData;
  var schema = state.visState.schema;

  if (!hasData) {
    return schema.getConfigToSave(state);
  }

  var mapToSave = schema.save(state); // add file name if title is not provided

  var title = (0, _lodash["default"])(mapToSave, ['info', 'title']);

  if (!title || !title.length) {
    mapToSave = (0, _utils.set)(['info', 'title'], "keplergl_".concat((0, _utils.generateHashId)(6)), mapToSave);
  }

  return mapToSave;
}

function exportJson(state) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var map = getMapJSON(state, options);
  var fileBlob = new _window.Blob([exportToJsonString(map)], {
    type: 'application/json'
  });
  var fileName = state.appName ? "".concat(state.appName, ".json") : DEFAULT_JSON_NAME;
  downloadFile(fileBlob, fileName);
}

function exportHtml(state, options) {
  var userMapboxToken = options.userMapboxToken,
      exportMapboxAccessToken = options.exportMapboxAccessToken,
      mode = options.mode;

  var data = _objectSpread(_objectSpread({}, getMapJSON(state)), {}, {
    mapboxApiAccessToken: (userMapboxToken || '') !== '' ? userMapboxToken : exportMapboxAccessToken,
    mode: mode
  });

  var fileBlob = new _window.Blob([(0, _exportMapHtml.exportMapToHTML)(data)], {
    type: 'text/html'
  });
  downloadFile(fileBlob, state.appName ? "".concat(state.appName, ".html") : DEFAULT_HTML_NAME);
}

function exportData(state, option) {
  var getVisState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  console.log('export data');
  var visState;
  var appName;

  if (!getVisState) {
    visState = state.visState;
    appName = state.appName;
  } else {
    visState = state;
    appName = DEFAULT_DATA_NAME;
  }

  var _visState = visState,
      datasets = _visState.datasets;
  var selectedDataset = option.selectedDataset,
      dataType = option.dataType,
      filtered = option.filtered; // get the selected data

  var filename = appName ? appName : DEFAULT_DATA_NAME;
  var selectedDatasets = datasets[selectedDataset] ? [datasets[selectedDataset]] : Object.values(datasets);

  if (!selectedDatasets.length) {
    // error: selected dataset not found.
    return;
  }

  selectedDatasets.forEach(function (selectedData) {
    var dataContainer = selectedData.dataContainer,
        fields = selectedData.fields,
        label = selectedData.label,
        _selectedData$filtere = selectedData.filteredIdxCPU,
        filteredIdxCPU = _selectedData$filtere === void 0 ? [] : _selectedData$filtere;
    var toExport = filtered ? (0, _dataContainerUtils.createIndexedDataContainer)(dataContainer, filteredIdxCPU) : dataContainer; // start to export data according to selected data type

    switch (dataType) {
      case _defaultSettings.EXPORT_DATA_TYPE.CSV:
        {
          var csv = (0, _dataProcessor.formatCsv)(toExport, fields);
          var fileBlob = new _window.Blob([csv], {
            type: 'text/csv'
          });
          downloadFile(fileBlob, "".concat(filename, "_").concat(label, ".csv"));
          break;
        }
      // TODO: support more file types.

      default:
        break;
    }
  });
}

function exportMap(state, option) {
  var imageDataUri = state.uiState.exportImage.imageDataUri;
  var thumbnail = imageDataUri ? dataURItoBlob(imageDataUri) : null;
  var mapToSave = getMapJSON(state, option);
  return {
    map: mapToSave,
    thumbnail: thumbnail
  };
}

var exporters = {
  exportImage: exportImage,
  exportJson: exportJson,
  exportHtml: exportHtml,
  exportData: exportData
};
var _default = exporters;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9leHBvcnQtdXRpbHMuanMiXSwibmFtZXMiOlsiREVGQVVMVF9JTUFHRV9OQU1FIiwiREVGQVVMVF9IVE1MX05BTUUiLCJERUZBVUxUX0pTT05fTkFNRSIsIkRFRkFVTFRfREFUQV9OQU1FIiwiREVGQVVMVF9FWFBPUlRfSlNPTl9TRVRUSU5HUyIsImhhc0RhdGEiLCJkZWZhdWx0UmVzb2x1dGlvbiIsIkVYUE9SVF9JTUdfUkVTT0xVVElPTl9PUFRJT05TIiwiZmluZCIsIm9wIiwiaWQiLCJSRVNPTFVUSU9OUyIsIk9ORV9YIiwiZGVmYXVsdFJhdGlvIiwiRVhQT1JUX0lNR19SQVRJT19PUFRJT05TIiwiRVhQT1JUX0lNR19SQVRJT1MiLCJGT1VSX0JZX1RIUkVFIiwiaXNNU0VkZ2UiLCJ3aW5kb3ciLCJCb29sZWFuIiwibmF2aWdhdG9yIiwibXNTYXZlT3JPcGVuQmxvYiIsImdldFNjYWxlRnJvbUltYWdlU2l6ZSIsImltYWdlVyIsImltYWdlSCIsIm1hcFciLCJtYXBIIiwic29tZSIsImQiLCJiYXNlIiwibWFwQmFzZSIsImNhbGN1bGF0ZUV4cG9ydEltYWdlU2l6ZSIsInJhdGlvIiwicmVzb2x1dGlvbiIsInJhdGlvSXRlbSIsInJlc29sdXRpb25JdGVtIiwiZ2V0U2l6ZSIsInNjYWxlZFdpZHRoIiwid2lkdGgiLCJzY2FsZWRIZWlnaHQiLCJoZWlnaHQiLCJDVVNUT00iLCJzY2FsZSIsImNvbnZlcnRUb1BuZyIsInNvdXJjZUVsZW0iLCJvcHRpb25zIiwiZG9tdG9pbWFnZSIsInRvUG5nIiwiZGF0YVVSSXRvQmxvYiIsImRhdGFVUkkiLCJiaW5hcnkiLCJzcGxpdCIsIm1pbWVTdHJpbmciLCJhYiIsIkFycmF5QnVmZmVyIiwibGVuZ3RoIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwidHlwZSIsImRvd25sb2FkRmlsZSIsImZpbGVCbG9iIiwiZmlsZU5hbWUiLCJ1cmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsInJldm9rZU9iamVjdFVSTCIsImV4cG9ydEltYWdlIiwic3RhdGUiLCJmaWxlbmFtZSIsImltYWdlRGF0YVVyaSIsInVpU3RhdGUiLCJmaWxlIiwiZXhwb3J0VG9Kc29uU3RyaW5nIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlIiwiZGVzY3JpcHRpb24iLCJnZXRNYXBKU09OIiwic2NoZW1hIiwidmlzU3RhdGUiLCJnZXRDb25maWdUb1NhdmUiLCJtYXBUb1NhdmUiLCJzYXZlIiwidGl0bGUiLCJleHBvcnRKc29uIiwibWFwIiwiYXBwTmFtZSIsImV4cG9ydEh0bWwiLCJ1c2VyTWFwYm94VG9rZW4iLCJleHBvcnRNYXBib3hBY2Nlc3NUb2tlbiIsIm1vZGUiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsImV4cG9ydERhdGEiLCJvcHRpb24iLCJnZXRWaXNTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJkYXRhc2V0cyIsInNlbGVjdGVkRGF0YXNldCIsImRhdGFUeXBlIiwiZmlsdGVyZWQiLCJzZWxlY3RlZERhdGFzZXRzIiwiT2JqZWN0IiwidmFsdWVzIiwiZm9yRWFjaCIsInNlbGVjdGVkRGF0YSIsImRhdGFDb250YWluZXIiLCJmaWVsZHMiLCJsYWJlbCIsImZpbHRlcmVkSWR4Q1BVIiwidG9FeHBvcnQiLCJFWFBPUlRfREFUQV9UWVBFIiwiQ1NWIiwiY3N2IiwiZXhwb3J0TWFwIiwidGh1bWJuYWlsIiwiZXhwb3J0ZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7O0FBQ0E7O0FBQ0E7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNPLElBQU1BLGtCQUFrQixHQUFHLGVBQTNCOztBQUNBLElBQU1DLGlCQUFpQixHQUFHLGdC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LEdBQXRCO0FBQTJCO0FBQ3pCLGNBQU1DLEdBQUcsR0FBRyw4QkFBVUgsUUFBVixFQUFvQkgsTUFBcEIsQ0FBWjtBQUVBLGNBQU14RCxRQUFRLEdBQUcsSUFBSUgsWUFBSixDQUFTLENBQUNpRSxHQUFELENBQVQsRUFBZ0I7QUFBQ2hFLFlBQUFBLElBQUksRUFBRTtBQUFQLFdBQWhCLENBQWpCO0FBQ0FDLFVBQUFBLFlBQVksQ0FBQ0MsUUFBRCxZQUFjZ0IsUUFBZCxjQUEwQnlDLEtBQTFCLFVBQVo7QUFDQTtBQUNEO0FBQ0Q7O0FBQ0E7QUFDRTtBQVZKO0FBWUQsR0FuQkQ7QUFvQkQ7O0FBRU0sU0FBU00sU0FBVCxDQUFtQmhELEtBQW5CLEVBQTBCMkIsTUFBMUIsRUFBa0M7QUFBQSxNQUNoQ3pCLFlBRGdDLEdBQ2hCRixLQUFLLENBQUNHLE9BQU4sQ0FBY0osV0FERSxDQUNoQ0csWUFEZ0M7QUFFdkMsTUFBTStDLFNBQVMsR0FBRy9DLFlBQVksR0FBR2hDLGFBQWEsQ0FBQ2dDLFlBQUQsQ0FBaEIsR0FBaUMsSUFBL0Q7QUFDQSxNQUFNYSxTQUFTLEdBQUdKLFVBQVUsQ0FBQ1gsS0FBRCxFQUFRMkIsTUFBUixDQUE1QjtBQUVBLFNBQU87QUFDTFIsSUFBQUEsR0FBRyxFQUFFSixTQURBO0FBRUxrQyxJQUFBQSxTQUFTLEVBQVRBO0FBRkssR0FBUDtBQUlEOztBQUVELElBQU1DLFNBQVMsR0FBRztBQUNoQm5ELEVBQUFBLFdBQVcsRUFBWEEsV0FEZ0I7QUFFaEJtQixFQUFBQSxVQUFVLEVBQVZBLFVBRmdCO0FBR2hCRyxFQUFBQSxVQUFVLEVBQVZBLFVBSGdCO0FBSWhCSyxFQUFBQSxVQUFVLEVBQVZBO0FBSmdCLENBQWxCO2VBT2V3QixTIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCBkb210b2ltYWdlIGZyb20gJ3V0aWxzL2RvbS10by1pbWFnZSc7XG5pbXBvcnQge0Jsb2IsIFVSTCwgYXRvYiwgVWludDhBcnJheSwgQXJyYXlCdWZmZXIsIGRvY3VtZW50fSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7XG4gIEVYUE9SVF9JTUdfUkVTT0xVVElPTl9PUFRJT05TLFxuICBFWFBPUlRfSU1HX1JBVElPX09QVElPTlMsXG4gIFJFU09MVVRJT05TLFxuICBFWFBPUlRfSU1HX1JBVElPUyxcbiAgRVhQT1JUX0RBVEFfVFlQRVxufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2V4cG9ydE1hcFRvSFRNTH0gZnJvbSAndGVtcGxhdGVzL2V4cG9ydC1tYXAtaHRtbCc7XG5pbXBvcnQge2Zvcm1hdENzdn0gZnJvbSAncHJvY2Vzc29ycy9kYXRhLXByb2Nlc3Nvcic7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuaW1wb3J0IHtzZXQsIGdlbmVyYXRlSGFzaElkfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7Y3JlYXRlSW5kZXhlZERhdGFDb250YWluZXJ9IGZyb20gJy4vdGFibGUtdXRpbHMvZGF0YS1jb250YWluZXItdXRpbHMnO1xuXG4vKipcbiAqIERlZmF1bHQgZmlsZSBuYW1lc1xuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9JTUFHRV9OQU1FID0gJ2tlcGxlci5nbC5wbmcnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSFRNTF9OQU1FID0gJ2tlcGxlci5nbC5odG1sJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0pTT05fTkFNRSA9ICdrZXBsZXIuZ2wuanNvbic7XG5leHBvcnQgY29uc3QgREVGQVVMVF9EQVRBX05BTUUgPSAna2VwbGVyLmdsJztcblxuLyoqXG4gKiBEZWZhdWx0IGpzb24gZXhwb3J0IHNldHRpbmdzXG4gKiBAdHlwZSB7e2hhc0RhdGE6IGJvb2xlYW59fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfSlNPTl9TRVRUSU5HUyA9IHtcbiAgaGFzRGF0YTogdHJ1ZVxufTtcblxuY29uc3QgZGVmYXVsdFJlc29sdXRpb24gPSBFWFBPUlRfSU1HX1JFU09MVVRJT05fT1BUSU9OUy5maW5kKG9wID0+IG9wLmlkID09PSBSRVNPTFVUSU9OUy5PTkVfWCk7XG5cbmNvbnN0IGRlZmF1bHRSYXRpbyA9IEVYUE9SVF9JTUdfUkFUSU9fT1BUSU9OUy5maW5kKG9wID0+IG9wLmlkID09PSBFWFBPUlRfSU1HX1JBVElPUy5GT1VSX0JZX1RIUkVFKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTVNFZGdlKHdpbmRvdykge1xuICByZXR1cm4gQm9vbGVhbih3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZUZyb21JbWFnZVNpemUoaW1hZ2VXID0gMCwgaW1hZ2VIID0gMCwgbWFwVyA9IDAsIG1hcEggPSAwKSB7XG4gIGlmIChbaW1hZ2VXLCBpbWFnZUgsIG1hcFcsIG1hcEhdLnNvbWUoZCA9PiBkIDw9IDApKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBjb25zdCBiYXNlID0gaW1hZ2VXIC8gaW1hZ2VIID4gMSA/IGltYWdlVyA6IGltYWdlSDtcbiAgY29uc3QgbWFwQmFzZSA9IGltYWdlVyAvIGltYWdlSCA+IDEgPyBtYXBXIDogbWFwSDtcbiAgcmV0dXJuIGJhc2UgLyBtYXBCYXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlRXhwb3J0SW1hZ2VTaXplKHttYXBXLCBtYXBILCByYXRpbywgcmVzb2x1dGlvbn0pIHtcbiAgaWYgKG1hcFcgPD0gMCB8fCBtYXBIIDw9IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHJhdGlvSXRlbSA9IEVYUE9SVF9JTUdfUkFUSU9fT1BUSU9OUy5maW5kKG9wID0+IG9wLmlkID09PSByYXRpbykgfHwgZGVmYXVsdFJhdGlvO1xuXG4gIGNvbnN0IHJlc29sdXRpb25JdGVtID1cbiAgICBFWFBPUlRfSU1HX1JFU09MVVRJT05fT1BUSU9OUy5maW5kKG9wID0+IG9wLmlkID09PSByZXNvbHV0aW9uKSB8fCBkZWZhdWx0UmVzb2x1dGlvbjtcblxuICBjb25zdCB7d2lkdGg6IHNjYWxlZFdpZHRoLCBoZWlnaHQ6IHNjYWxlZEhlaWdodH0gPSByZXNvbHV0aW9uSXRlbS5nZXRTaXplKG1hcFcsIG1hcEgpO1xuXG4gIGNvbnN0IHt3aWR0aDogaW1hZ2VXLCBoZWlnaHQ6IGltYWdlSH0gPSByYXRpb0l0ZW0uZ2V0U2l6ZShzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcblxuICBjb25zdCB7c2NhbGV9ID0gcmF0aW9JdGVtLmlkID09PSBFWFBPUlRfSU1HX1JBVElPUy5DVVNUT00gPyB7fSA6IHJlc29sdXRpb25JdGVtO1xuXG4gIHJldHVybiB7XG4gICAgc2NhbGUsXG4gICAgaW1hZ2VXLFxuICAgIGltYWdlSFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvUG5nKHNvdXJjZUVsZW0sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRvbXRvaW1hZ2UudG9Qbmcoc291cmNlRWxlbSwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgY29uc3QgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuXG4gIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgY29uc3QgbWltZVN0cmluZyA9IGRhdGFVUklcbiAgICAuc3BsaXQoJywnKVswXVxuICAgIC5zcGxpdCgnOicpWzFdXG4gICAgLnNwbGl0KCc7JylbMF07XG5cbiAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXJcbiAgY29uc3QgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYmluYXJ5Lmxlbmd0aCk7XG5cbiAgLy8gY3JlYXRlIGEgdmlldyBpbnRvIHRoZSBidWZmZXJcbiAgY29uc3QgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICBpYVtpXSA9IGJpbmFyeS5jaGFyQ29kZUF0KGkpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHt0eXBlOiBtaW1lU3RyaW5nfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUoZmlsZUJsb2IsIGZpbGVOYW1lKSB7XG4gIGlmIChpc01TRWRnZSh3aW5kb3cpKSB7XG4gICAgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGZpbGVCbG9iLCBmaWxlTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlQmxvYik7XG5cbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0SW1hZ2Uoc3RhdGUsIGZpbGVuYW1lID0gREVGQVVMVF9JTUFHRV9OQU1FKSB7XG4gIGNvbnN0IHtpbWFnZURhdGFVcml9ID0gc3RhdGUudWlTdGF0ZS5leHBvcnRJbWFnZTtcbiAgaWYgKGltYWdlRGF0YVVyaSkge1xuICAgIGNvbnN0IGZpbGUgPSBkYXRhVVJJdG9CbG9iKGltYWdlRGF0YVVyaSk7XG4gICAgZG93bmxvYWRGaWxlKGZpbGUsIGZpbGVuYW1lKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0VG9Kc29uU3RyaW5nKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZS5kZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwSlNPTihzdGF0ZSwgb3B0aW9ucyA9IERFRkFVTFRfRVhQT1JUX0pTT05fU0VUVElOR1MpIHtcbiAgY29uc3Qge2hhc0RhdGF9ID0gb3B0aW9ucztcbiAgY29uc3Qgc2NoZW1hID0gc3RhdGUudmlzU3RhdGUuc2NoZW1hO1xuXG4gIGlmICghaGFzRGF0YSkge1xuICAgIHJldHVybiBzY2hlbWEuZ2V0Q29uZmlnVG9TYXZlKHN0YXRlKTtcbiAgfVxuXG4gIGxldCBtYXBUb1NhdmUgPSBzY2hlbWEuc2F2ZShzdGF0ZSk7XG4gIC8vIGFkZCBmaWxlIG5hbWUgaWYgdGl0bGUgaXMgbm90IHByb3ZpZGVkXG4gIGNvbnN0IHRpdGxlID0gZ2V0KG1hcFRvU2F2ZSwgWydpbmZvJywgJ3RpdGxlJ10pO1xuICBpZiAoIXRpdGxlIHx8ICF0aXRsZS5sZW5ndGgpIHtcbiAgICBtYXBUb1NhdmUgPSBzZXQoWydpbmZvJywgJ3RpdGxlJ10sIGBrZXBsZXJnbF8ke2dlbmVyYXRlSGFzaElkKDYpfWAsIG1hcFRvU2F2ZSk7XG4gIH1cbiAgcmV0dXJuIG1hcFRvU2F2ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEpzb24oc3RhdGUsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBtYXAgPSBnZXRNYXBKU09OKHN0YXRlLCBvcHRpb25zKTtcblxuICBjb25zdCBmaWxlQmxvYiA9IG5ldyBCbG9iKFtleHBvcnRUb0pzb25TdHJpbmcobWFwKV0sIHt0eXBlOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgY29uc3QgZmlsZU5hbWUgPSBzdGF0ZS5hcHBOYW1lID8gYCR7c3RhdGUuYXBwTmFtZX0uanNvbmAgOiBERUZBVUxUX0pTT05fTkFNRTtcbiAgZG93bmxvYWRGaWxlKGZpbGVCbG9iLCBmaWxlTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRIdG1sKHN0YXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IHt1c2VyTWFwYm94VG9rZW4sIGV4cG9ydE1hcGJveEFjY2Vzc1Rva2VuLCBtb2RlfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICAuLi5nZXRNYXBKU09OKHN0YXRlKSxcbiAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjpcbiAgICAgICh1c2VyTWFwYm94VG9rZW4gfHwgJycpICE9PSAnJyA/IHVzZXJNYXBib3hUb2tlbiA6IGV4cG9ydE1hcGJveEFjY2Vzc1Rva2VuLFxuICAgIG1vZGVcbiAgfTtcblxuICBjb25zdCBmaWxlQmxvYiA9IG5ldyBCbG9iKFtleHBvcnRNYXBUb0hUTUwoZGF0YSldLCB7dHlwZTogJ3RleHQvaHRtbCd9KTtcbiAgZG93bmxvYWRGaWxlKGZpbGVCbG9iLCBzdGF0ZS5hcHBOYW1lID8gYCR7c3RhdGUuYXBwTmFtZX0uaHRtbGAgOiBERUZBVUxUX0hUTUxfTkFNRSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnREYXRhKHN0YXRlLCBvcHRpb24sZ2V0VmlzU3RhdGU9ZmFsc2UpIHtcbiAgY29uc29sZS5sb2coJ2V4cG9ydCBkYXRhJylcbiAgbGV0IHZpc1N0YXRlXG4gIGxldCBhcHBOYW1lXG5cbiAgaWYoIWdldFZpc1N0YXRlKXtcbiAgICAgIHZpc1N0YXRlID0gc3RhdGUudmlzU3RhdGU7XG4gICAgICBhcHBOYW1lID0gc3RhdGUuYXBwTmFtZTtcbiAgfVxuICBlbHNle1xuICAgIHZpc1N0YXRlID0gc3RhdGVcbiAgICBhcHBOYW1lID0gREVGQVVMVF9EQVRBX05BTUVcbiAgfVxuICBjb25zdCB7ZGF0YXNldHN9ID0gdmlzU3RhdGU7XG4gIGNvbnN0IHtzZWxlY3RlZERhdGFzZXQsIGRhdGFUeXBlLCBmaWx0ZXJlZH0gPSBvcHRpb247XG4gIC8vIGdldCB0aGUgc2VsZWN0ZWQgZGF0YVxuICBjb25zdCBmaWxlbmFtZSA9IGFwcE5hbWUgPyBhcHBOYW1lIDogREVGQVVMVF9EQVRBX05BTUU7XG4gIGNvbnN0IHNlbGVjdGVkRGF0YXNldHMgPSBkYXRhc2V0c1tzZWxlY3RlZERhdGFzZXRdXG4gICAgPyBbZGF0YXNldHNbc2VsZWN0ZWREYXRhc2V0XV1cbiAgICA6IE9iamVjdC52YWx1ZXMoZGF0YXNldHMpO1xuICBpZiAoIXNlbGVjdGVkRGF0YXNldHMubGVuZ3RoKSB7XG4gICAgLy8gZXJyb3I6IHNlbGVjdGVkIGRhdGFzZXQgbm90IGZvdW5kLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHNlbGVjdGVkRGF0YXNldHMuZm9yRWFjaChzZWxlY3RlZERhdGEgPT4ge1xuICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyLCBmaWVsZHMsIGxhYmVsLCBmaWx0ZXJlZElkeENQVSA9IFtdfSA9IHNlbGVjdGVkRGF0YTtcbiAgICBjb25zdCB0b0V4cG9ydCA9IGZpbHRlcmVkXG4gICAgICA/IGNyZWF0ZUluZGV4ZWREYXRhQ29udGFpbmVyKGRhdGFDb250YWluZXIsIGZpbHRlcmVkSWR4Q1BVKVxuICAgICAgOiBkYXRhQ29udGFpbmVyO1xuXG4gICAgLy8gc3RhcnQgdG8gZXhwb3J0IGRhdGEgYWNjb3JkaW5nIHRvIHNlbGVjdGVkIGRhdGEgdHlwZVxuICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcbiAgICAgIGNhc2UgRVhQT1JUX0RBVEFfVFlQRS5DU1Y6IHtcbiAgICAgICAgY29uc3QgY3N2ID0gZm9ybWF0Q3N2KHRvRXhwb3J0LCBmaWVsZHMpO1xuXG4gICAgICAgIGNvbnN0IGZpbGVCbG9iID0gbmV3IEJsb2IoW2Nzdl0sIHt0eXBlOiAndGV4dC9jc3YnfSk7XG4gICAgICAgIGRvd25sb2FkRmlsZShmaWxlQmxvYiwgYCR7ZmlsZW5hbWV9XyR7bGFiZWx9LmNzdmApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IHN1cHBvcnQgbW9yZSBmaWxlIHR5cGVzLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydE1hcChzdGF0ZSwgb3B0aW9uKSB7XG4gIGNvbnN0IHtpbWFnZURhdGFVcml9ID0gc3RhdGUudWlTdGF0ZS5leHBvcnRJbWFnZTtcbiAgY29uc3QgdGh1bWJuYWlsID0gaW1hZ2VEYXRhVXJpID8gZGF0YVVSSXRvQmxvYihpbWFnZURhdGFVcmkpIDogbnVsbDtcbiAgY29uc3QgbWFwVG9TYXZlID0gZ2V0TWFwSlNPTihzdGF0ZSwgb3B0aW9uKTtcblxuICByZXR1cm4ge1xuICAgIG1hcDogbWFwVG9TYXZlLFxuICAgIHRodW1ibmFpbFxuICB9O1xufVxuXG5jb25zdCBleHBvcnRlcnMgPSB7XG4gIGV4cG9ydEltYWdlLFxuICBleHBvcnRKc29uLFxuICBleHBvcnRIdG1sLFxuICBleHBvcnREYXRhXG59O1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRlcnM7XG4iXX0=