"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waypoint_to_geometry = waypoint_to_geometry;
exports.read_semantic_mobility = read_semantic_mobility;
exports.read_gps_mobility = read_gps_mobility;
exports.od_cast_row = od_cast_row;
exports.convert_track_line = convert_track_line;
exports.detectResponseError = detectResponseError;
exports.fetchGoogleAPI = fetchGoogleAPI;
exports.batchExportGMTResults = batchExportGMTResults;
exports.CompressExportData = CompressExportData;

var _dataframeUtils = require("./dataframe-utils");

var turf = _interopRequireWildcard(require("@turf/turf"));

var _dataframeJs = _interopRequireDefault(require("dataframe-js"));

var _d3Request = require("d3-request");

var _dataUtils = require("./data-utils");

var _tableUtils = require("./table-utils");

var _defaultSettings = require("../constants/default-settings");

var _dataProcessor = require("../processors/data-processor");

var _global = require("global");

var _exportUtils = require("./export-utils");

var _jszip = _interopRequireDefault(require("jszip"));

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
function waypoint_to_geometry(way_json) {
  var lat_col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latE7';
  var lng_col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'lngE7';
  var way_gdf = new _dataframeUtils.GeoDataframe((0, _dataframeUtils.applymap)(new _dataframeJs["default"](way_json), [lat_col, lng_col], function (x) {
    return x / 1e7;
  }), undefined, lat_col, lng_col);
  var features = way_gdf.toFeatureCollection();
  return turf.lineString(features.features.map(function (x) {
    return x.geometry.coordinates;
  }));
}

function read_semantic_mobility(json_data) {
  var _cast_df, _applymap;

  console.log('semantic mobility read');
  var df = new _dataframeJs["default"](json_data.timelineObjects); //processing

  df = df.map(function (row, row_num) {
    return row.set('postPlaceVisit', df.getRow(row_num + 1) ? df.getRow(row_num + 1).get('placeVisit') : undefined);
  }).map(function (row, row_num) {
    return row.set('prePlaceVisit', df.getRow(row_num - 1) ? df.getRow(row_num - 1).get('placeVisit') : undefined);
  });
  var normalized_df = (0, _dataframeUtils.json_normalize)(df.filter(function (x) {
    return x.get('activitySegment') !== undefined;
  }), 'activitySegment');
  var norm_list = ['activitySegment_startLocation', 'activitySegment_endLocation', 'activitySegment_duration'];
  var new_df = norm_list.reduce(function (x, y) {
    return (0, _dataframeUtils.json_normalize)(x, y);
  }, normalized_df);
  var cast_df = new_df.map(function (x) {
    return od_cast_row(x);
  }).map(function (x) {
    return x.set('waypoint_geom', !x.get('activitySegment_transitPath') ? x.get('activitySegment_waypointPath') ? waypoint_to_geometry(x.get('activitySegment_waypointPath')['waypoints']) : undefined : waypoint_to_geometry(x.get('activitySegment_transitPath')['transitStops'], 'latitudeE7', 'longitudeE7'));
  });
  cast_df = (0, _dataframeUtils.applymap)(cast_df, ['activitySegment_endLocation_latitudeE7', 'activitySegment_endLocation_longitudeE7', 'activitySegment_startLocation_latitudeE7', 'activitySegment_startLocation_longitudeE7'], function (x) {
    return x / 1e7;
  });

  var activity_seg_df = (_cast_df = cast_df).select.apply(_cast_df, ['index', 'activitySegment_distance', 'activitySegment_activityType', 'activitySegment_confidence', // 'activitySegment_editConfirmationStatus',
  'activitySegment_startLocation_latitudeE7', 'activitySegment_startLocation_longitudeE7', // 'activitySegment_startLocation_sourceInfo',
  'activitySegment_startLocation_placeId', 'activitySegment_startLocation_address', 'activitySegment_startLocation_name', 'activitySegment_startLocation_locationConfidence', 'activitySegment_endLocation_latitudeE7', 'activitySegment_endLocation_longitudeE7', // 'activitySegment_endLocation_sourceInfo',
  'activitySegment_endLocation_placeId', 'activitySegment_endLocation_address', 'activitySegment_endLocation_name', 'activitySegment_endLocation_locationConfidence', 'activitySegment_duration_startTimestampMs', 'activitySegment_duration_endTimestampMs', 'waypoint_geom']).map(function (x) {
    return x.set('activitySegment_duration_endDate', new Date(parseInt(x.get('activitySegment_duration_endTimestampMs'))).toLocaleDateString());
  }).map(function (x) {
    return x.set('activitySegment_duration_startDate', new Date(parseInt(x.get('activitySegment_duration_startTimestampMs'))).toLocaleDateString());
  }); //processing place visiting data;


  var place_visit_df = (0, _dataframeUtils.df_json_col_to_df)(df, 'placeVisit', null, null);
  var result_df = ['location', 'duration'].reduce(function (x, y) {
    return (0, _dataframeUtils.json_normalize)(x, y, 'inner');
  }, new _dataframeUtils.IndexedDataframe(place_visit_df).df);
  result_df = (0, _dataframeUtils.applymap)(result_df, ['location_latitudeE7', 'location_longitudeE7'], function (x) {
    return x / 1e7;
  });
  result_df = (_applymap = (0, _dataframeUtils.applymap)(result_df, ['duration_startTimestampMs', 'duration_endTimestampMs'], function (x) {
    return parseInt(x);
  })).select.apply(_applymap, ['placeConfidence', 'visitConfidence', 'otherCandidateLocations', 'editConfirmationStatus', 'simplifiedRawPath', 'index', 'location_latitudeE7', 'location_longitudeE7', 'location_placeId', 'location_address', 'location_name', 'location_locationConfidence', 'location_sourceInfo', 'duration_startTimestampMs', 'duration_endTimestampMs']).map(function (x) {
    return x.set('duration_startDate', new Date(parseInt(x.get('duration_startTimestampMs'))).toLocaleDateString());
  }).map(function (x) {
    return x.set('duration_endDate', new Date(parseInt(x.get('duration_endTimestampMs'))).toLocaleDateString());
  }); // @ts-ignore

  var place_visit_result_df = new _dataframeUtils.GeoDataframe(result_df, null, 'location_latitudeE7', 'location_longitudeE7');
  return {
    acitivity: activity_seg_df,
    place: place_visit_result_df
  };
}

function read_gps_mobility(json_data) {
  var df = new _dataframeJs["default"](json_data.locations);
  return df.map(function (row) {
    return row.set('lat', row.get('latitudeE7') / 1e7);
  }).map(function (row) {
    return row.set('lng', row.get('longitudeE7') / 1e7);
  }).map(function (row) {
    return row // eslint-disable-next-line radix
    .set('timestamp', new Date(parseInt(row.get('timestampMs'))).getTime())["delete"]('latitudeE7')["delete"]('longitudeE7')["delete"]('timestampMs')["delete"]('activity');
  });
}

function od_cast_row(row) {
  var time_threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300000;
  console.log('od cast');
  var pre_flag = 0;
  var post_flag = 0;

  try {
    if (row.get('prePlaceVisit') != null && (!row.has('activitySegment_startLocation_placeId') || !row.get('activitySegment_startLocation_placeId'))) {
      if (Math.abs(row.get('prePlaceVisit').duration.endTimestampMs - row.get('activitySegment_duration_startTimestampMs')) <= time_threshold) {
        if (Math.abs(row.get('prePlaceVisit').location.latitudeE7 - row.get('activitySegment_startLocation_latitudeE7')) + Math.abs(row.get('prePlaceVisit').location.longitudeE7 - row.get('activitySegment_startLocation_longitudeE7')) < 60000) {
          row = ['activitySegment_startLocation_latitudeE7', 'activitySegment_startLocation_longitudeE7', 'activitySegment_startLocation_sourceInfo', 'activitySegment_startLocation_placeId', 'activitySegment_startLocation_address', 'activitySegment_startLocation_name', 'activitySegment_startLocation_locationConfidence'].reduce(function (x, y) {
            return x.set(y, row.get('prePlaceVisit').location[y.split('_').slice(-1)[0]]);
          }, row);
        }
      }
    }

    if (!row.has('activitySegment_startLocation_placeId')) {
      row = ['activitySegment_startLocation_sourceInfo', 'activitySegment_startLocation_placeId', 'activitySegment_startLocation_address', 'activitySegment_startLocation_name', 'activitySegment_startLocation_locationConfidence'].reduce(function (x, y) {
        return x.set(y, null);
      }, row);
    }

    if (row.get('postPlaceVisit') != null && (!row.has('activitySegment_endLocation_placeId') || !row.get('activitySegment_endLocation_placeId'))) {
      if (Math.abs(row.get('postPlaceVisit').duration.startTimestampMs - row.get('activitySegment_duration_endTimestampMs')) <= time_threshold) {
        if (Math.abs(row.get('postPlaceVisit').location.latitudeE7 - row.get('activitySegment_endLocation_latitudeE7')) + Math.abs(row.get('postPlaceVisit').location.longitudeE7 - row.get('activitySegment_endLocation_longitudeE7')) < 60000) {
          row = ['activitySegment_endLocation_latitudeE7', 'activitySegment_endLocation_longitudeE7', 'activitySegment_endLocation_sourceInfo', 'activitySegment_endLocation_placeId', 'activitySegment_endLocation_address', 'activitySegment_endLocation_name', 'activitySegment_endLocation_locationConfidence'].reduce(function (x, y) {
            return x.set(y, row.get('postPlaceVisit').location[y.split('_').slice(-1)[0]]);
          }, row);
          post_flag = 1;
        }
      }
    }

    if (!row.has('activitySegment_endLocation_placeId')) {
      ['activitySegment_endLocation_sourceInfo', 'activitySegment_endLocation_placeId', 'activitySegment_endLocation_address', 'activitySegment_endLocation_name', 'activitySegment_endLocation_locationConfidence'].reduce(function (x, y) {
        return x.set(y, null);
      }, row);
    } // if(pre_flag === 0){
    // }
    //
    // if(post_flag === 0){
    // }


    return row;
  } catch (e) {
    console.log(e);
  }
}

function convert_track_line(result) {
  var local_dict = {};
  result.fields.forEach(function (x) {
    local_dict[x.name] = x.tableFieldIndex - 1;
  });
  return turf.lineString(result.rows.map(function (x) {
    return [x[local_dict.lng], x[local_dict.lat], 0, x[local_dict.timestamp]];
  }));
} // @ts-ignore


function detectResponseError(response) {
  if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
    return {
      status: response.statusCode,
      message: response.body || response.message || response
    };
  }
}

function fetchGoogleAPI(url, token) {
  var api_url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + url + '&fields=name,type,formatted_address,address_components&key=' + token + '&language=ja';
  return new Promise(function (resolve, reject) {
    (0, _d3Request.json)(api_url, function (error, config) {
      if (error) {
        reject(error);
        return;
      }

      var responseError = detectResponseError(config);

      if (responseError) {
        reject(responseError);
        return;
      }

      resolve(config);
    });
  });
}

function batchExportGMTResults(datasets, batchAttrs) {
  var oddataID = batchAttrs.oddataID,
      gpsdataID = batchAttrs.gpsdataID,
      poidataID = batchAttrs.poidataID,
      spatialFilter = batchAttrs.spatialFilter,
      temporalFilter = batchAttrs.temporalFilter,
      apikey = batchAttrs.apikey,
      exportSetting = batchAttrs.exportSetting;
  var outData = exportSetting.outData,
      outColumns = exportSetting.outColumns,
      headers = exportSetting.headers;
  var selected_datasets = []; // console.log(outData)
  // const filter_info = [['activity information','oddataId'],['visited place information','poidataId'],['GMT raw gps data','gpsdataId']]

  if (oddataID && outData.includes('activity information')) {
    selected_datasets = selected_datasets.concat([oddataID]);
  }

  if (poidataID && outData.includes('visited place information')) {
    selected_datasets = selected_datasets.concat([gpsdataID]);
  }

  if (gpsdataID && outData.includes('GMT raw gps data')) {
    selected_datasets = selected_datasets.concat([gpsdataID]);
  }
}

function CompressExportData(state, option) {
  var getVisState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  console.log('export data');
  var visState;
  var appName;

  if (!getVisState) {
    visState = state.visState;
    appName = state.appName;
  } else {
    visState = state;
    appName = _exportUtils.DEFAULT_DATA_NAME;
  }

  var _visState = visState,
      datasets = _visState.datasets;
  var selectedDataset = option.selectedDataset,
      dataType = option.dataType,
      filtered = option.filtered; // get the selected data

  var filename = appName ? appName : _exportUtils.DEFAULT_DATA_NAME;
  var selectedDatasets = datasets[selectedDataset] ? [datasets[selectedDataset]] : Object.values(datasets);

  if (!selectedDatasets.length) {
    // error: selected dataset not found.
    return;
  }

  var zip = new _jszip["default"]();
  selectedDatasets.forEach(function (selectedData) {
    var dataContainer = selectedData.dataContainer,
        fields = selectedData.fields,
        label = selectedData.label,
        _selectedData$filtere = selectedData.filteredIdxCPU,
        filteredIdxCPU = _selectedData$filtere === void 0 ? [] : _selectedData$filtere;
    var toExport = filtered ? (0, _tableUtils.createIndexedDataContainer)(dataContainer, filteredIdxCPU) : dataContainer; // start to export data according to selected data type

    switch (dataType) {
      case _defaultSettings.EXPORT_DATA_TYPE.CSV:
        {
          var csv = (0, _dataProcessor.formatCsv)(toExport, fields);
          var fileBlob = new _global.Blob([csv], {
            type: 'text/csv'
          });
          zip.file("".concat(filename, "_").concat(label, ".csv"), fileBlob, {
            binary: true
          });
          break;
        }
      // TODO: support more file types.

      default:
        break;
    }
  });
  zip.generateAsync({
    type: "blob"
  }).then(function (x) {
    return (0, _exportUtils.downloadFile)(x, 'compressed_gmt_data.zip');
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nb29nbGUtdXRpbHMuanMiXSwibmFtZXMiOlsid2F5cG9pbnRfdG9fZ2VvbWV0cnkiLCJ3YXlfanNvbiIsImxhdF9jb2wiLCJsbmdfY29sIiwid2F5X2dkZiIsIkdlb0RhdGFmcmFtZSIsIkRhdGFGcmFtZSIsIngiLCJ1bmRlZmluZWQiLCJmZWF0dXJlcyIsInRvRmVhdHVyZUNvbGxlY3Rpb24iLCJ0dXJmIiwibGluZVN0cmluZyIsIm1hcCIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJyZWFkX3NlbWFudGljX21vYmlsaXR5IiwianNvbl9kYXRhIiwiY29uc29sZSIsImxvZyIsImRmIiwidGltZWxpbmVPYmplY3RzIiwicm93Iiwicm93X251bSIsInNldCIsImdldFJvdyIsImdldCIsIm5vcm1hbGl6ZWRfZGYiLCJmaWx0ZXIiLCJub3JtX2xpc3QiLCJuZXdfZGYiLCJyZWR1Y2UiLCJ5IiwiY2FzdF9kZiIsIm9kX2Nhc3Rfcm93IiwiYWN0aXZpdHlfc2VnX2RmIiwic2VsZWN0IiwiRGF0ZSIsInBhcnNlSW50IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwicGxhY2VfdmlzaXRfZGYiLCJyZXN1bHRfZGYiLCJJbmRleGVkRGF0YWZyYW1lIiwicGxhY2VfdmlzaXRfcmVzdWx0X2RmIiwiYWNpdGl2aXR5IiwicGxhY2UiLCJyZWFkX2dwc19tb2JpbGl0eSIsImxvY2F0aW9ucyIsImdldFRpbWUiLCJ0aW1lX3RocmVzaG9sZCIsInByZV9mbGFnIiwicG9zdF9mbGFnIiwiaGFzIiwiTWF0aCIsImFicyIsImR1cmF0aW9uIiwiZW5kVGltZXN0YW1wTXMiLCJsb2NhdGlvbiIsImxhdGl0dWRlRTciLCJsb25naXR1ZGVFNyIsInNwbGl0Iiwic2xpY2UiLCJzdGFydFRpbWVzdGFtcE1zIiwiZSIsImNvbnZlcnRfdHJhY2tfbGluZSIsInJlc3VsdCIsImxvY2FsX2RpY3QiLCJmaWVsZHMiLCJmb3JFYWNoIiwibmFtZSIsInRhYmxlRmllbGRJbmRleCIsInJvd3MiLCJsbmciLCJsYXQiLCJ0aW1lc3RhbXAiLCJkZXRlY3RSZXNwb25zZUVycm9yIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwic3RhdHVzIiwibWVzc2FnZSIsImJvZHkiLCJmZXRjaEdvb2dsZUFQSSIsInVybCIsInRva2VuIiwiYXBpX3VybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyb3IiLCJjb25maWciLCJyZXNwb25zZUVycm9yIiwiYmF0Y2hFeHBvcnRHTVRSZXN1bHRzIiwiZGF0YXNldHMiLCJiYXRjaEF0dHJzIiwib2RkYXRhSUQiLCJncHNkYXRhSUQiLCJwb2lkYXRhSUQiLCJzcGF0aWFsRmlsdGVyIiwidGVtcG9yYWxGaWx0ZXIiLCJhcGlrZXkiLCJleHBvcnRTZXR0aW5nIiwib3V0RGF0YSIsIm91dENvbHVtbnMiLCJoZWFkZXJzIiwic2VsZWN0ZWRfZGF0YXNldHMiLCJpbmNsdWRlcyIsImNvbmNhdCIsIkNvbXByZXNzRXhwb3J0RGF0YSIsInN0YXRlIiwib3B0aW9uIiwiZ2V0VmlzU3RhdGUiLCJ2aXNTdGF0ZSIsImFwcE5hbWUiLCJERUZBVUxUX0RBVEFfTkFNRSIsInNlbGVjdGVkRGF0YXNldCIsImRhdGFUeXBlIiwiZmlsdGVyZWQiLCJmaWxlbmFtZSIsInNlbGVjdGVkRGF0YXNldHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJsZW5ndGgiLCJ6aXAiLCJKU1ppcCIsInNlbGVjdGVkRGF0YSIsImRhdGFDb250YWluZXIiLCJsYWJlbCIsImZpbHRlcmVkSWR4Q1BVIiwidG9FeHBvcnQiLCJFWFBPUlRfREFUQV9UWVBFIiwiQ1NWIiwiY3N2IiwiZmlsZUJsb2IiLCJCbG9iIiwidHlwZSIsImZpbGUiLCJiaW5hcnkiLCJnZW5lcmF0ZUFzeW5jIiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFwQ0E7QUFD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Q3FCRixZQURyQixDQUNGRyxjQURFO0FBQUEsUUFDRkEsY0FERSxzQ0FDZSxFQURmO0FBRXZDLFFBQU1DLFFBQVEsR0FBR1osUUFBUSxHQUNyQiw0Q0FBMkJTLGFBQTNCLEVBQTBDRSxjQUExQyxDQURxQixHQUVyQkYsYUFGSixDQUZ1QyxDQU12Qzs7QUFDQSxZQUFRVixRQUFSO0FBQ0UsV0FBS2Msa0NBQWlCQyxHQUF0QjtBQUEyQjtBQUN6QixjQUFNQyxHQUFHLEdBQUcsOEJBQVVILFFBQVYsRUFBb0I3RCxNQUFwQixDQUFaO0FBQ0EsY0FBTWlFLFFBQVEsR0FBRyxJQUFJQyxZQUFKLENBQVMsQ0FBQ0YsR0FBRCxDQUFULEVBQWdCO0FBQUNHLFlBQUFBLElBQUksRUFBRTtBQUFQLFdBQWhCLENBQWpCO0FBQ0FaLFVBQUFBLEdBQUcsQ0FBQ2EsSUFBSixXQUFhbEIsUUFBYixjQUF5QlMsS0FBekIsV0FBcUNNLFFBQXJDLEVBQThDO0FBQUNJLFlBQUFBLE1BQU0sRUFBQztBQUFSLFdBQTlDO0FBQ0E7QUFDRDtBQUNEOztBQUNBO0FBQ0U7QUFUSjtBQVdELEdBbEJEO0FBb0JBZCxFQUFBQSxHQUFHLENBQUNlLGFBQUosQ0FBa0I7QUFBQ0gsSUFBQUEsSUFBSSxFQUFDO0FBQU4sR0FBbEIsRUFBaUNJLElBQWpDLENBQXNDLFVBQUNuSSxDQUFEO0FBQUEsV0FBSywrQkFBYUEsQ0FBYixFQUFlLHlCQUFmLENBQUw7QUFBQSxHQUF0QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtcbiAgYXBwbHltYXAsXG4gIGRmX2pzb25fY29sX3RvX2RmLFxuICBHZW9EYXRhZnJhbWUsXG4gIEluZGV4ZWREYXRhZnJhbWUsXG4gIGpzb25fbm9ybWFsaXplXG59IGZyb20gJy4vZGF0YWZyYW1lLXV0aWxzJztcbmltcG9ydCAqIGFzIHR1cmYgZnJvbSBcIkB0dXJmL3R1cmZcIjtcbmltcG9ydCBEYXRhRnJhbWUgZnJvbSAnZGF0YWZyYW1lLWpzJztcbmltcG9ydCB7cmVxdWVzdCwgdGV4dCBhcyByZXF1ZXN0VGV4dCwganNvbiBhcyByZXF1ZXN0SnNvbn0gZnJvbSAnZDMtcmVxdWVzdCc7XG5pbXBvcnQge2RhdGV0aW1lRm9ybWF0dGVyfSBmcm9tICcuL2RhdGEtdXRpbHMnO1xuaW1wb3J0IHtjcmVhdGVJbmRleGVkRGF0YUNvbnRhaW5lcn0gZnJvbSAnLi90YWJsZS11dGlscyc7XG5pbXBvcnQge0VYUE9SVF9EQVRBX1RZUEV9IGZyb20gJy4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7Zm9ybWF0Q3N2fSBmcm9tICcuLi9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCB7QmxvYn0gZnJvbSAnZ2xvYmFsJztcbmltcG9ydCB7REVGQVVMVF9EQVRBX05BTUUsIGRvd25sb2FkRmlsZX0gZnJvbSAnLi9leHBvcnQtdXRpbHMnO1xuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiB3YXlwb2ludF90b19nZW9tZXRyeSh3YXlfanNvbiwgbGF0X2NvbCA9ICdsYXRFNycsIGxuZ19jb2wgPSAnbG5nRTcnKSB7XG4gIGNvbnN0IHdheV9nZGYgPSBuZXcgR2VvRGF0YWZyYW1lKFxuICAgIGFwcGx5bWFwKG5ldyBEYXRhRnJhbWUod2F5X2pzb24pLCBbbGF0X2NvbCwgbG5nX2NvbF0sIHggPT4geCAvIDFlNyksIHVuZGVmaW5lZCwgbGF0X2NvbCwgbG5nX2NvbFxuICApO1xuICBjb25zdCBmZWF0dXJlcyA9IHdheV9nZGYudG9GZWF0dXJlQ29sbGVjdGlvbigpO1xuICByZXR1cm4gdHVyZi5saW5lU3RyaW5nKGZlYXR1cmVzLmZlYXR1cmVzLm1hcCh4ID0+IHguZ2VvbWV0cnkuY29vcmRpbmF0ZXMpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZF9zZW1hbnRpY19tb2JpbGl0eShqc29uX2RhdGEpIHtcbiAgY29uc29sZS5sb2coJ3NlbWFudGljIG1vYmlsaXR5IHJlYWQnKVxuICBsZXQgZGYgPSBuZXcgRGF0YUZyYW1lKGpzb25fZGF0YS50aW1lbGluZU9iamVjdHMpXG4gIC8vcHJvY2Vzc2luZ1xuICBkZiA9IGRmLm1hcCgocm93LHJvd19udW0pPT5yb3cuc2V0KCdwb3N0UGxhY2VWaXNpdCcsZGYuZ2V0Um93KHJvd19udW0gKyAxKT9kZi5nZXRSb3cocm93X251bSArIDEpLmdldCgncGxhY2VWaXNpdCcpOnVuZGVmaW5lZCkpLm1hcCgocm93LHJvd19udW0pPT5yb3cuc2V0KCdwcmVQbGFjZVZpc2l0JyxkZi5nZXRSb3cocm93X251bSAtIDEpP2RmLmdldFJvdyhyb3dfbnVtIC0gMSkuZ2V0KCdwbGFjZVZpc2l0Jyk6dW5kZWZpbmVkKSlcbiAgbGV0IG5vcm1hbGl6ZWRfZGYgPSBqc29uX25vcm1hbGl6ZShkZi5maWx0ZXIoKHgpPT54LmdldCgnYWN0aXZpdHlTZWdtZW50JykhPT11bmRlZmluZWQpLCdhY3Rpdml0eVNlZ21lbnQnKVxuICBjb25zdCBub3JtX2xpc3QgPSBbJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uJywnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uJywnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uJ11cbiAgY29uc3QgbmV3X2RmID0gbm9ybV9saXN0LnJlZHVjZSgoeCx5KT0+anNvbl9ub3JtYWxpemUoeCx5KSxub3JtYWxpemVkX2RmKVxuXG4gIGxldCBjYXN0X2RmID0gbmV3X2RmLm1hcCgoeCk9Pm9kX2Nhc3Rfcm93KHgpKS5tYXAoKHgpPT54LnNldCgnd2F5cG9pbnRfZ2VvbScsIXguZ2V0KCdhY3Rpdml0eVNlZ21lbnRfdHJhbnNpdFBhdGgnKSA/IHguZ2V0KCdhY3Rpdml0eVNlZ21lbnRfd2F5cG9pbnRQYXRoJykgPyB3YXlwb2ludF90b19nZW9tZXRyeSh4LmdldCgnYWN0aXZpdHlTZWdtZW50X3dheXBvaW50UGF0aCcpWyd3YXlwb2ludHMnXSkgOiB1bmRlZmluZWQgOiB3YXlwb2ludF90b19nZW9tZXRyeSh4LmdldCgnYWN0aXZpdHlTZWdtZW50X3RyYW5zaXRQYXRoJylbJ3RyYW5zaXRTdG9wcyddLCAgJ2xhdGl0dWRlRTcnLCAnbG9uZ2l0dWRlRTcnKSkpXG5cbiAgY2FzdF9kZiA9IGFwcGx5bWFwKGNhc3RfZGYsWydhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fbGF0aXR1ZGVFNycsJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sb25naXR1ZGVFNycsJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2xhdGl0dWRlRTcnLCdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9sb25naXR1ZGVFNyddLCh4KT0+eC8xZTcpXG4gIGNvbnN0IGFjdGl2aXR5X3NlZ19kZiA9IGNhc3RfZGYuc2VsZWN0KC4uLltcbiAgICAgICdpbmRleCcsXG4gICAgICAnYWN0aXZpdHlTZWdtZW50X2Rpc3RhbmNlJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfYWN0aXZpdHlUeXBlJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfY29uZmlkZW5jZScsXG4gICAgICAvLyAnYWN0aXZpdHlTZWdtZW50X2VkaXRDb25maXJtYXRpb25TdGF0dXMnLFxuICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2xhdGl0dWRlRTcnLFxuICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2xvbmdpdHVkZUU3JyxcbiAgICAgIC8vICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9zb3VyY2VJbmZvJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9wbGFjZUlkJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9hZGRyZXNzJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9uYW1lJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9sb2NhdGlvbkNvbmZpZGVuY2UnLFxuICAgICAgJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sYXRpdHVkZUU3JyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fbG9uZ2l0dWRlRTcnLFxuICAgICAgLy8gJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9zb3VyY2VJbmZvJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fcGxhY2VJZCcsXG4gICAgICAnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX2FkZHJlc3MnLFxuICAgICAgJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9uYW1lJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fbG9jYXRpb25Db25maWRlbmNlJyxcbiAgICAgICdhY3Rpdml0eVNlZ21lbnRfZHVyYXRpb25fc3RhcnRUaW1lc3RhbXBNcycsXG4gICAgICAnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX2VuZFRpbWVzdGFtcE1zJyxcbiAgICAgICd3YXlwb2ludF9nZW9tJ1xuICBdKS5tYXAoKHgpPT54LnNldCgnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX2VuZERhdGUnLChuZXcgRGF0ZShwYXJzZUludCh4LmdldCgnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX2VuZFRpbWVzdGFtcE1zJykpKSkudG9Mb2NhbGVEYXRlU3RyaW5nKCkpKS5tYXAoKHgpPT54LnNldCgnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX3N0YXJ0RGF0ZScsKG5ldyBEYXRlKHBhcnNlSW50KHguZ2V0KCdhY3Rpdml0eVNlZ21lbnRfZHVyYXRpb25fc3RhcnRUaW1lc3RhbXBNcycpKSkpLnRvTG9jYWxlRGF0ZVN0cmluZygpKSlcblxuICAvL3Byb2Nlc3NpbmcgcGxhY2UgdmlzaXRpbmcgZGF0YTtcbiAgbGV0IHBsYWNlX3Zpc2l0X2RmID0gZGZfanNvbl9jb2xfdG9fZGYoZGYsJ3BsYWNlVmlzaXQnLG51bGwsbnVsbClcbiAgbGV0IHJlc3VsdF9kZiA9Wydsb2NhdGlvbicsJ2R1cmF0aW9uJ10ucmVkdWNlKCh4LCB5KT0+anNvbl9ub3JtYWxpemUoeCx5LCdpbm5lcicpLG5ldyBJbmRleGVkRGF0YWZyYW1lKHBsYWNlX3Zpc2l0X2RmKS5kZilcbiAgcmVzdWx0X2RmID0gYXBwbHltYXAocmVzdWx0X2RmLFsnbG9jYXRpb25fbGF0aXR1ZGVFNycsJ2xvY2F0aW9uX2xvbmdpdHVkZUU3J10sKHgpPT54LzFlNylcbiAgcmVzdWx0X2RmID0gYXBwbHltYXAocmVzdWx0X2RmLFsnZHVyYXRpb25fc3RhcnRUaW1lc3RhbXBNcycsJ2R1cmF0aW9uX2VuZFRpbWVzdGFtcE1zJ10sKHgpPT5wYXJzZUludCh4KSkuc2VsZWN0KC4uLltcbiAgICAncGxhY2VDb25maWRlbmNlJyxcbiAgICAndmlzaXRDb25maWRlbmNlJyxcbiAgICAnb3RoZXJDYW5kaWRhdGVMb2NhdGlvbnMnLFxuICAgICdlZGl0Q29uZmlybWF0aW9uU3RhdHVzJyxcbiAgICAnc2ltcGxpZmllZFJhd1BhdGgnLFxuICAgICdpbmRleCcsXG4gICAgJ2xvY2F0aW9uX2xhdGl0dWRlRTcnLFxuICAgICdsb2NhdGlvbl9sb25naXR1ZGVFNycsXG4gICAgJ2xvY2F0aW9uX3BsYWNlSWQnLFxuICAgICdsb2NhdGlvbl9hZGRyZXNzJyxcbiAgICAnbG9jYXRpb25fbmFtZScsXG4gICAgJ2xvY2F0aW9uX2xvY2F0aW9uQ29uZmlkZW5jZScsXG4gICAgJ2xvY2F0aW9uX3NvdXJjZUluZm8nLFxuICAgICdkdXJhdGlvbl9zdGFydFRpbWVzdGFtcE1zJyxcbiAgICAnZHVyYXRpb25fZW5kVGltZXN0YW1wTXMnLFxuICBdKS5tYXAoKHgpPT54LnNldCgnZHVyYXRpb25fc3RhcnREYXRlJywobmV3IERhdGUocGFyc2VJbnQoeC5nZXQoJ2R1cmF0aW9uX3N0YXJ0VGltZXN0YW1wTXMnKSkpKS50b0xvY2FsZURhdGVTdHJpbmcoKSkpLm1hcCgoeCk9Pnguc2V0KCdkdXJhdGlvbl9lbmREYXRlJywobmV3IERhdGUocGFyc2VJbnQoeC5nZXQoJ2R1cmF0aW9uX2VuZFRpbWVzdGFtcE1zJykpKSkudG9Mb2NhbGVEYXRlU3RyaW5nKCkpKVxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IHBsYWNlX3Zpc2l0X3Jlc3VsdF9kZiA9IG5ldyBHZW9EYXRhZnJhbWUocmVzdWx0X2RmLG51bGwsJ2xvY2F0aW9uX2xhdGl0dWRlRTcnLCdsb2NhdGlvbl9sb25naXR1ZGVFNycpXG4gIHJldHVybiB7YWNpdGl2aXR5OiBhY3Rpdml0eV9zZWdfZGYsIHBsYWNlOiBwbGFjZV92aXNpdF9yZXN1bHRfZGZ9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZF9ncHNfbW9iaWxpdHkoanNvbl9kYXRhKXtcbiAgICBsZXQgZGYgPSBuZXcgRGF0YUZyYW1lKGpzb25fZGF0YS5sb2NhdGlvbnMpO1xuICAgIHJldHVybiBkZlxuICAgICAgICAubWFwKHJvdyA9PiByb3cuc2V0KCdsYXQnLCByb3cuZ2V0KCdsYXRpdHVkZUU3JykgLyAxZTcpKVxuICAgICAgICAubWFwKHJvdyA9PiByb3cuc2V0KCdsbmcnLCByb3cuZ2V0KCdsb25naXR1ZGVFNycpIC8gMWU3KSlcbiAgICAgICAgLm1hcChyb3cgPT5cbiAgICAgICAgICAgIHJvd1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByYWRpeFxuICAgICAgICAgICAgICAgIC5zZXQoJ3RpbWVzdGFtcCcsIG5ldyBEYXRlKHBhcnNlSW50KHJvdy5nZXQoJ3RpbWVzdGFtcE1zJykpKS5nZXRUaW1lKCkpXG4gICAgICAgICAgICAgICAgLmRlbGV0ZSgnbGF0aXR1ZGVFNycpXG4gICAgICAgICAgICAgICAgLmRlbGV0ZSgnbG9uZ2l0dWRlRTcnKVxuICAgICAgICAgICAgICAgIC5kZWxldGUoJ3RpbWVzdGFtcE1zJylcbiAgICAgICAgICAgICAgICAuZGVsZXRlKCdhY3Rpdml0eScpXG4gICAgICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvZF9jYXN0X3Jvdyhyb3csdGltZV90aHJlc2hvbGQ9MzAwMDAwKXtcbiAgY29uc29sZS5sb2coJ29kIGNhc3QnKVxuICBsZXQgcHJlX2ZsYWcgPSAwO1xuICBsZXQgcG9zdF9mbGFnID0gMDtcbiAgdHJ5e1xuICAgIGlmKChyb3cuZ2V0KCdwcmVQbGFjZVZpc2l0JykhPW51bGwpICYmICghcm93LmhhcygnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fcGxhY2VJZCcpIHx8ICFyb3cuZ2V0KCdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9wbGFjZUlkJykpKSB7XG4gICAgICBpZiAoTWF0aC5hYnMocm93LmdldCgncHJlUGxhY2VWaXNpdCcpLmR1cmF0aW9uLmVuZFRpbWVzdGFtcE1zIC0gcm93LmdldCgnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX3N0YXJ0VGltZXN0YW1wTXMnKSkgPD0gdGltZV90aHJlc2hvbGQpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHJvdy5nZXQoJ3ByZVBsYWNlVmlzaXQnKS5sb2NhdGlvbi5sYXRpdHVkZUU3IC0gcm93LmdldCgnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fbGF0aXR1ZGVFNycpKSArXG4gICAgICAgICAgTWF0aC5hYnMocm93LmdldCgncHJlUGxhY2VWaXNpdCcpLmxvY2F0aW9uLmxvbmdpdHVkZUU3IC0gcm93LmdldCgnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fbG9uZ2l0dWRlRTcnKSkgPCA2MDAwMCkge1xuICAgICAgICAgIHJvdyA9IFsnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fbGF0aXR1ZGVFNycsXG4gICAgICAgICAgICAnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fbG9uZ2l0dWRlRTcnLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX3NvdXJjZUluZm8nLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX3BsYWNlSWQnLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2FkZHJlc3MnLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX25hbWUnLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2xvY2F0aW9uQ29uZmlkZW5jZSddLnJlZHVjZSgoeCwgeSkgPT4gKHguc2V0KHksIHJvdy5nZXQoJ3ByZVBsYWNlVmlzaXQnKS5sb2NhdGlvblt5LnNwbGl0KCdfJykuc2xpY2UoLTEpWzBdXSkpLCByb3cpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighcm93LmhhcygnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fcGxhY2VJZCcpKXtcbiAgICAgIHJvdyA9IFsnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fc291cmNlSW5mbycsXG4gICAgICAgICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9wbGFjZUlkJyxcbiAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2FkZHJlc3MnLFxuICAgICAgICAnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fbmFtZScsXG4gICAgICAgICdhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9sb2NhdGlvbkNvbmZpZGVuY2UnXS5yZWR1Y2UoKHgsIHkpID0+IHguc2V0KHksIG51bGwpLCByb3cpXG4gICAgfVxuXG4gICAgaWYoKHJvdy5nZXQoJ3Bvc3RQbGFjZVZpc2l0JykhPW51bGwpICYmICghcm93LmhhcygnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX3BsYWNlSWQnKSB8fCAhcm93LmdldCgnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX3BsYWNlSWQnKSkpe1xuICAgICAgaWYoTWF0aC5hYnMocm93LmdldCgncG9zdFBsYWNlVmlzaXQnKS5kdXJhdGlvbi5zdGFydFRpbWVzdGFtcE1zIC0gcm93LmdldCgnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX2VuZFRpbWVzdGFtcE1zJykpPD0gdGltZV90aHJlc2hvbGQpe1xuICAgICAgICBpZihNYXRoLmFicyhyb3cuZ2V0KCdwb3N0UGxhY2VWaXNpdCcpLmxvY2F0aW9uLmxhdGl0dWRlRTcgLXJvdy5nZXQoJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sYXRpdHVkZUU3JykpICtcbiAgICAgICAgICBNYXRoLmFicyhyb3cuZ2V0KCdwb3N0UGxhY2VWaXNpdCcpLmxvY2F0aW9uLmxvbmdpdHVkZUU3IC1yb3cuZ2V0KCdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fbG9uZ2l0dWRlRTcnKSk8NjAwMDApe1xuICAgICAgICAgIHJvdyA9IFsnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX2xhdGl0dWRlRTcnLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sb25naXR1ZGVFNycsXG4gICAgICAgICAgICAnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX3NvdXJjZUluZm8nLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9wbGFjZUlkJyxcbiAgICAgICAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fYWRkcmVzcycsXG4gICAgICAgICAgICAnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX25hbWUnLFxuICAgICAgICAgICAgJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sb2NhdGlvbkNvbmZpZGVuY2UnXS5yZWR1Y2UoKHgseSk9Pih4LnNldCh5LHJvdy5nZXQoJ3Bvc3RQbGFjZVZpc2l0JykubG9jYXRpb25beS5zcGxpdCgnXycpLnNsaWNlKC0xKVswXV0pKSxyb3cpXG4gICAgICAgICAgcG9zdF9mbGFnID0gMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXJvdy5oYXMoJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9wbGFjZUlkJykpe1xuICAgICAgWydhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fc291cmNlSW5mbycsXG4gICAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fcGxhY2VJZCcsXG4gICAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fYWRkcmVzcycsXG4gICAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fbmFtZScsXG4gICAgICAgICdhY3Rpdml0eVNlZ21lbnRfZW5kTG9jYXRpb25fbG9jYXRpb25Db25maWRlbmNlJ10ucmVkdWNlKCh4LHkpPT54LnNldCh5LCBudWxsKSxyb3cpXG4gICAgfVxuXG4gICAgLy8gaWYocHJlX2ZsYWcgPT09IDApe1xuXG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gaWYocG9zdF9mbGFnID09PSAwKXtcblxuICAgIC8vIH1cblxuICAgIHJldHVybiByb3dcbiAgfWNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X3RyYWNrX2xpbmUocmVzdWx0KSB7XG4gIGNvbnN0IGxvY2FsX2RpY3QgPSB7fTtcbiAgcmVzdWx0LmZpZWxkcy5mb3JFYWNoKHggPT4ge1xuICAgIGxvY2FsX2RpY3RbeC5uYW1lXSA9IHgudGFibGVGaWVsZEluZGV4IC0gMTtcbiAgfSk7XG4gIHJldHVybiB0dXJmLmxpbmVTdHJpbmcoXG4gICAgcmVzdWx0LnJvd3MubWFwKHggPT4ge1xuICAgICAgcmV0dXJuIFt4W2xvY2FsX2RpY3QubG5nXSwgeFtsb2NhbF9kaWN0LmxhdF0sIDAsIHhbbG9jYWxfZGljdC50aW1lc3RhbXBdXTtcbiAgICB9KVxuICApO1xufVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0UmVzcG9uc2VFcnJvcihyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAmJiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA8IDIwMCB8fCByZXNwb25zZS5zdGF0dXNDb2RlID49IDMwMCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keSB8fCByZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hHb29nbGVBUEkodXJsLHRva2VuKXtcbiAgY29uc3QgYXBpX3VybCA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvcGxhY2UvZGV0YWlscy9qc29uP3BsYWNlX2lkPScgKyB1cmwgKyAnJmZpZWxkcz1uYW1lLHR5cGUsZm9ybWF0dGVkX2FkZHJlc3MsYWRkcmVzc19jb21wb25lbnRzJmtleT0nKyB0b2tlbiArICcmbGFuZ3VhZ2U9amEnXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdEpzb24oYXBpX3VybCwgKGVycm9yLCBjb25maWcpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByZXNwb25zZUVycm9yID0gZGV0ZWN0UmVzcG9uc2VFcnJvcihjb25maWcpO1xuICAgICAgaWYgKHJlc3BvbnNlRXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KHJlc3BvbnNlRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXNvbHZlKGNvbmZpZyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJhdGNoRXhwb3J0R01UUmVzdWx0cyhkYXRhc2V0cyxiYXRjaEF0dHJzKXtcbiAgY29uc3Qge29kZGF0YUlELCBncHNkYXRhSUQsIHBvaWRhdGFJRCwgc3BhdGlhbEZpbHRlciwgdGVtcG9yYWxGaWx0ZXIsIGFwaWtleSxleHBvcnRTZXR0aW5nfSA9IGJhdGNoQXR0cnNcbiAgY29uc3Qge291dERhdGEsb3V0Q29sdW1ucyxoZWFkZXJzfSA9IGV4cG9ydFNldHRpbmdcblxuICBsZXQgc2VsZWN0ZWRfZGF0YXNldHMgPSBbXVxuXG4gIC8vIGNvbnNvbGUubG9nKG91dERhdGEpXG4gIC8vIGNvbnN0IGZpbHRlcl9pbmZvID0gW1snYWN0aXZpdHkgaW5mb3JtYXRpb24nLCdvZGRhdGFJZCddLFsndmlzaXRlZCBwbGFjZSBpbmZvcm1hdGlvbicsJ3BvaWRhdGFJZCddLFsnR01UIHJhdyBncHMgZGF0YScsJ2dwc2RhdGFJZCddXVxuXG4gIGlmKG9kZGF0YUlEICYmIG91dERhdGEuaW5jbHVkZXMoJ2FjdGl2aXR5IGluZm9ybWF0aW9uJykpe1xuICAgIHNlbGVjdGVkX2RhdGFzZXRzID0gc2VsZWN0ZWRfZGF0YXNldHMuY29uY2F0KFtvZGRhdGFJRF0pXG4gIH1cblxuICBpZihwb2lkYXRhSUQgJiYgb3V0RGF0YS5pbmNsdWRlcygndmlzaXRlZCBwbGFjZSBpbmZvcm1hdGlvbicpKXtcbiAgICBzZWxlY3RlZF9kYXRhc2V0cyA9IHNlbGVjdGVkX2RhdGFzZXRzLmNvbmNhdChbZ3BzZGF0YUlEXSlcbiAgfVxuXG4gIGlmKGdwc2RhdGFJRCAmJiBvdXREYXRhLmluY2x1ZGVzKCdHTVQgcmF3IGdwcyBkYXRhJykpe1xuICAgIHNlbGVjdGVkX2RhdGFzZXRzID0gc2VsZWN0ZWRfZGF0YXNldHMuY29uY2F0KFtncHNkYXRhSURdKVxuICB9XG5cblxuXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXByZXNzRXhwb3J0RGF0YShzdGF0ZSwgb3B0aW9uLGdldFZpc1N0YXRlPWZhbHNlKSB7XG4gIGNvbnNvbGUubG9nKCdleHBvcnQgZGF0YScpXG4gIGxldCB2aXNTdGF0ZVxuICBsZXQgYXBwTmFtZVxuXG4gIGlmKCFnZXRWaXNTdGF0ZSl7XG4gICAgdmlzU3RhdGUgPSBzdGF0ZS52aXNTdGF0ZTtcbiAgICBhcHBOYW1lID0gc3RhdGUuYXBwTmFtZTtcbiAgfVxuICBlbHNle1xuICAgIHZpc1N0YXRlID0gc3RhdGVcbiAgICBhcHBOYW1lID0gREVGQVVMVF9EQVRBX05BTUVcbiAgfVxuICBjb25zdCB7ZGF0YXNldHN9ID0gdmlzU3RhdGU7XG4gIGNvbnN0IHtzZWxlY3RlZERhdGFzZXQsIGRhdGFUeXBlLCBmaWx0ZXJlZH0gPSBvcHRpb247XG4gIC8vIGdldCB0aGUgc2VsZWN0ZWQgZGF0YVxuICBjb25zdCBmaWxlbmFtZSA9IGFwcE5hbWUgPyBhcHBOYW1lIDogREVGQVVMVF9EQVRBX05BTUU7XG4gIGNvbnN0IHNlbGVjdGVkRGF0YXNldHMgPSBkYXRhc2V0c1tzZWxlY3RlZERhdGFzZXRdXG4gICAgPyBbZGF0YXNldHNbc2VsZWN0ZWREYXRhc2V0XV1cbiAgICA6IE9iamVjdC52YWx1ZXMoZGF0YXNldHMpO1xuICBpZiAoIXNlbGVjdGVkRGF0YXNldHMubGVuZ3RoKSB7XG4gICAgLy8gZXJyb3I6IHNlbGVjdGVkIGRhdGFzZXQgbm90IGZvdW5kLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB6aXAgPSBuZXcgSlNaaXAoKTtcblxuICBzZWxlY3RlZERhdGFzZXRzLmZvckVhY2goc2VsZWN0ZWREYXRhID0+IHtcbiAgICBjb25zdCB7ZGF0YUNvbnRhaW5lciwgZmllbGRzLCBsYWJlbCwgZmlsdGVyZWRJZHhDUFUgPSBbXX0gPSBzZWxlY3RlZERhdGE7XG4gICAgY29uc3QgdG9FeHBvcnQgPSBmaWx0ZXJlZFxuICAgICAgPyBjcmVhdGVJbmRleGVkRGF0YUNvbnRhaW5lcihkYXRhQ29udGFpbmVyLCBmaWx0ZXJlZElkeENQVSlcbiAgICAgIDogZGF0YUNvbnRhaW5lcjtcblxuICAgIC8vIHN0YXJ0IHRvIGV4cG9ydCBkYXRhIGFjY29yZGluZyB0byBzZWxlY3RlZCBkYXRhIHR5cGVcbiAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XG4gICAgICBjYXNlIEVYUE9SVF9EQVRBX1RZUEUuQ1NWOiB7XG4gICAgICAgIGNvbnN0IGNzdiA9IGZvcm1hdENzdih0b0V4cG9ydCwgZmllbGRzKTtcbiAgICAgICAgY29uc3QgZmlsZUJsb2IgPSBuZXcgQmxvYihbY3N2XSwge3R5cGU6ICd0ZXh0L2Nzdid9KTtcbiAgICAgICAgemlwLmZpbGUoIGAke2ZpbGVuYW1lfV8ke2xhYmVsfS5jc3ZgLGZpbGVCbG9iLHtiaW5hcnk6dHJ1ZX0pXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogc3VwcG9ydCBtb3JlIGZpbGUgdHlwZXMuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG4gIHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSkudGhlbigoeCk9PmRvd25sb2FkRmlsZSh4LCdjb21wcmVzc2VkX2dtdF9kYXRhLnppcCcpKVxufVxuXG5cblxuIl19