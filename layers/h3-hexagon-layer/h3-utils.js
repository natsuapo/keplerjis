"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVertices = getVertices;
exports.getCentroid = getCentroid;
exports.idToPolygonGeo = idToPolygonGeo;
Object.defineProperty(exports, "h3GetResolution", {
  enumerable: true,
  get: function get() {
    return _h3Js.h3GetResolution;
  }
});
Object.defineProperty(exports, "h3IsValid", {
  enumerable: true,
  get: function get() {
    return _h3Js.h3IsValid;
  }
});
exports.getHexFields = exports.isHexField = void 0;

var _h3Js = require("h3-js");

var _defaultSettings = require("../../constants/default-settings");

var _dataUtils = require("../../utils/data-utils");

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
// get vertices should return [lon, lat]
function getVertices(_ref) {
  var id = _ref.id;
  // always reverse it
  return (0, _h3Js.h3ToGeoBoundary)(id, true);
} // get centroid should return [lon, lat]


function getCentroid(_ref2) {
  var id = _ref2.id;
  // always reverse it to [lng, lat]
  return (0, _h3Js.h3ToGeo)(id).reverse();
}

function idToPolygonGeo(object, properties) {
  if (!object || !object.id) {
    return null;
  }

  var vertices = getVertices(object);
  return {
    geometry: {
      coordinates: vertices,
      type: 'LineString'
    },
    properties: properties
  };
}

var isHexField = function isHexField(field, fieldIdx, dataContainer) {
  if (field.type !== _defaultSettings.ALL_FIELD_TYPES.string) {
    return false;
  }

  var firstDP = dataContainer.find(function (d) {
    return (0, _dataUtils.notNullorUndefined)(d.valueAt(fieldIdx));
  }, true);
  return firstDP && (0, _h3Js.h3IsValid)(firstDP.valueAt(fieldIdx));
};

exports.isHexField = isHexField;

var getHexFields = function getHexFields(fields, dataContainer) {
  return fields.filter(function (f, i) {
    return isHexField(f, i, dataContainer);
  });
};

exports.getHexFields = getHexFields;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaDMtaGV4YWdvbi1sYXllci9oMy11dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRWZXJ0aWNlcyIsImlkIiwiZ2V0Q2VudHJvaWQiLCJyZXZlcnNlIiwiaWRUb1BvbHlnb25HZW8iLCJvYmplY3QiLCJwcm9wZXJ0aWVzIiwidmVydGljZXMiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwidHlwZSIsImlzSGV4RmllbGQiLCJmaWVsZCIsImZpZWxkSWR4IiwiZGF0YUNvbnRhaW5lciIsIkFMTF9GSUVMRF9UWVBFUyIsInN0cmluZyIsImZpcnN0RFAiLCJmaW5kIiwiZCIsInZhbHVlQXQiLCJnZXRIZXhGaWVsZHMiLCJmaWVsZHMiLCJmaWx0ZXIiLCJmIiwiaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNPLFNBQVNBLFdBQVQsT0FBMkI7QUFBQSxNQUFMQyxFQUFLLFFBQUxBLEVBQUs7QUFDaEM7QUFDQSxTQUFPLDJCQUFnQkEsRUFBaEIsRUFBb0IsSUFBcEIsQ0FBUDtBQUNELEMsQ0FFRDs7O0FBQ08sU0FBU0MsV0FBVCxRQUEyQjtBQUFBLE1BQUxELEVBQUssU0FBTEEsRUFBSztBQUNoQztBQUNBLFNBQU8sbUJBQVFBLEVBQVIsRUFBWUUsT0FBWixFQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0NDLFVBQWhDLEVBQTRDO0FBQ2pELE1BQUksQ0FBQ0QsTUFBRCxJQUFXLENBQUNBLE1BQU0sQ0FBQ0osRUFBdkIsRUFBMkI7QUFDekIsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBTU0sUUFBUSxHQUFHUCxXQUFXLENBQUNLLE1BQUQsQ0FBNUI7QUFFQSxTQUFPO0FBQ0xHLElBQUFBLFFBQVEsRUFBRTtBQUNSQyxNQUFBQSxXQUFXLEVBQUVGLFFBREw7QUFFUkcsTUFBQUEsSUFBSSxFQUFFO0FBRkUsS0FETDtBQUtMSixJQUFBQSxVQUFVLEVBQVZBO0FBTEssR0FBUDtBQU9EOztBQUVNLElBQU1LLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFrQkMsYUFBbEIsRUFBb0M7QUFDNUQsTUFBSUYsS0FBSyxDQUFDRixJQUFOLEtBQWVLLGlDQUFnQkMsTUFBbkMsRUFBMkM7QUFDekMsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsT0FBTyxHQUFHSCxhQUFhLENBQUNJLElBQWQsQ0FBbUIsVUFBQUMsQ0FBQztBQUFBLFdBQUksbUNBQW1CQSxDQUFDLENBQUNDLE9BQUYsQ0FBVVAsUUFBVixDQUFuQixDQUFKO0FBQUEsR0FBcEIsRUFBaUUsSUFBakUsQ0FBaEI7QUFDQSxTQUFPSSxPQUFPLElBQUkscUJBQVVBLE9BQU8sQ0FBQ0csT0FBUixDQUFnQlAsUUFBaEIsQ0FBVixDQUFsQjtBQUNELENBUE07Ozs7QUFTQSxJQUFNUSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDQyxNQUFELEVBQVNSLGFBQVQ7QUFBQSxTQUMxQlEsTUFBTSxDQUFDQyxNQUFQLENBQWMsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVWQsVUFBVSxDQUFDYSxDQUFELEVBQUlDLENBQUosRUFBT1gsYUFBUCxDQUFwQjtBQUFBLEdBQWQsQ0FEMEI7QUFBQSxDQUFyQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7aDNHZXRSZXNvbHV0aW9uLCBoM0lzVmFsaWQsIGgzVG9HZW8sIGgzVG9HZW9Cb3VuZGFyeX0gZnJvbSAnaDMtanMnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7bm90TnVsbG9yVW5kZWZpbmVkfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcblxuZXhwb3J0IHtoM0dldFJlc29sdXRpb24sIGgzSXNWYWxpZH07XG5cbi8vIGdldCB2ZXJ0aWNlcyBzaG91bGQgcmV0dXJuIFtsb24sIGxhdF1cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJ0aWNlcyh7aWR9KSB7XG4gIC8vIGFsd2F5cyByZXZlcnNlIGl0XG4gIHJldHVybiBoM1RvR2VvQm91bmRhcnkoaWQsIHRydWUpO1xufVxuXG4vLyBnZXQgY2VudHJvaWQgc2hvdWxkIHJldHVybiBbbG9uLCBsYXRdXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2VudHJvaWQoe2lkfSkge1xuICAvLyBhbHdheXMgcmV2ZXJzZSBpdCB0byBbbG5nLCBsYXRdXG4gIHJldHVybiBoM1RvR2VvKGlkKS5yZXZlcnNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZFRvUG9seWdvbkdlbyhvYmplY3QsIHByb3BlcnRpZXMpIHtcbiAgaWYgKCFvYmplY3QgfHwgIW9iamVjdC5pZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdmVydGljZXMgPSBnZXRWZXJ0aWNlcyhvYmplY3QpO1xuXG4gIHJldHVybiB7XG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIGNvb3JkaW5hdGVzOiB2ZXJ0aWNlcyxcbiAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJ1xuICAgIH0sXG4gICAgcHJvcGVydGllc1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgaXNIZXhGaWVsZCA9IChmaWVsZCwgZmllbGRJZHgsIGRhdGFDb250YWluZXIpID0+IHtcbiAgaWYgKGZpZWxkLnR5cGUgIT09IEFMTF9GSUVMRF9UWVBFUy5zdHJpbmcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBmaXJzdERQID0gZGF0YUNvbnRhaW5lci5maW5kKGQgPT4gbm90TnVsbG9yVW5kZWZpbmVkKGQudmFsdWVBdChmaWVsZElkeCkpLCB0cnVlKTtcbiAgcmV0dXJuIGZpcnN0RFAgJiYgaDNJc1ZhbGlkKGZpcnN0RFAudmFsdWVBdChmaWVsZElkeCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEhleEZpZWxkcyA9IChmaWVsZHMsIGRhdGFDb250YWluZXIpID0+XG4gIGZpZWxkcy5maWx0ZXIoKGYsIGkpID0+IGlzSGV4RmllbGQoZiwgaSwgZGF0YUNvbnRhaW5lcikpO1xuIl19