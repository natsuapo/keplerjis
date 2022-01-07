"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseGeoJsonRawFeature = parseGeoJsonRawFeature;
exports.getGeojsonDataMaps = getGeojsonDataMaps;
exports.parseGeometryFromString = parseGeometryFromString;
exports.getGeojsonBounds = getGeojsonBounds;
exports.getGeojsonFeatureTypes = getGeojsonFeatureTypes;
exports.featureToDeckGlGeoType = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _wellknown = _interopRequireDefault(require("wellknown"));

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var _dataUtils = require("../../utils/data-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function parseGeoJsonRawFeature(rawFeature) {
  if ((0, _typeof2["default"])(rawFeature) === 'object') {
    // Support GeoJson feature as object
    // probably need to normalize it as well
    var normalized = (0, _geojsonNormalize["default"])(rawFeature);

    if (!normalized || !Array.isArray(normalized.features)) {
      // fail to normalize GeoJson
      return null;
    }

    return normalized.features[0];
  } else if (typeof rawFeature === 'string') {
    return parseGeometryFromString(rawFeature);
  } else if (Array.isArray(rawFeature)) {
    // Support GeoJson  LineString as an array of points
    return {
      type: 'Feature',
      geometry: {
        // why do we need to flip it...
        coordinates: rawFeature.map(function (pts) {
          return [pts[1], pts[0]];
        }),
        type: 'LineString'
      }
    };
  }

  return null;
}
/**
 * Parse raw data to GeoJson feature
 * @param dataContainer
 * @param getFeature
 * @returns {{}}
 */


function getGeojsonDataMaps(dataContainer, getFeature) {
  var acceptableTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'];
  var dataToFeature = [];

  for (var index = 0; index < dataContainer.numRows(); index++) {
    var feature = parseGeoJsonRawFeature(getFeature({
      index: index
    }));

    if (feature && feature.geometry && acceptableTypes.includes(feature.geometry.type)) {
      var cleaned = _objectSpread(_objectSpread({}, feature), {}, {
        // store index of the data in feature properties
        properties: _objectSpread(_objectSpread({}, feature.properties), {}, {
          index: index
        })
      });

      dataToFeature[index] = cleaned;
    } else {
      dataToFeature[index] = null;
    }
  }

  return dataToFeature;
}
/**
 * Parse geojson from string
 * @param {String} geoString
 * @returns {null | Object} geojson object or null if failed
 */


function parseGeometryFromString(geoString) {
  var parsedGeo; // try parse as geojson string
  // {"type":"Polygon","coordinates":[[[-74.158491,40.83594]]]}

  try {
    parsedGeo = JSON.parse(geoString);
  } catch (e) {// keep trying to parse
  } // try parse as wkt


  if (!parsedGeo) {
    try {
      parsedGeo = (0, _wellknown["default"])(geoString);
    } catch (e) {
      return null;
    }
  }

  if (!parsedGeo) {
    return null;
  }

  var normalized = (0, _geojsonNormalize["default"])(parsedGeo);

  if (!normalized || !Array.isArray(normalized.features)) {
    // fail to normalize geojson
    return null;
  }

  return normalized.features[0];
}

function getGeojsonBounds() {
  var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 70 ms for 10,000 polygons
  // here we only pick couple
  var maxCount = 10000;
  var samples = features.length > maxCount ? (0, _dataUtils.getSampleData)(features, maxCount) : features;
  var nonEmpty = samples.filter(function (d) {
    return d && d.geometry && d.geometry.coordinates && d.geometry.coordinates.length;
  });

  try {
    return (0, _bbox["default"])({
      type: 'FeatureCollection',
      features: nonEmpty
    });
  } catch (e) {
    return null;
  }
}

var featureToDeckGlGeoType = {
  Point: 'point',
  MultiPoint: 'point',
  LineString: 'line',
  MultiLineString: 'line',
  Polygon: 'polygon',
  MultiPolygon: 'polygon'
};
/**
 * Parse geojson from string
 * @param {Array<Object>} allFeatures
 * @returns {Object} mapping of feature type existence
 */

exports.featureToDeckGlGeoType = featureToDeckGlGeoType;

function getGeojsonFeatureTypes(allFeatures) {
  var featureTypes = {};

  for (var f = 0; f < allFeatures.length; f++) {
    var feature = allFeatures[f];
    var geoType = featureToDeckGlGeoType[feature && feature.geometry && feature.geometry.type];

    if (geoType) {
      featureTypes[geoType] = true;
    }
  }

  return featureTypes;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLXV0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlR2VvSnNvblJhd0ZlYXR1cmUiLCJyYXdGZWF0dXJlIiwibm9ybWFsaXplZCIsIkFycmF5IiwiaXNBcnJheSIsImZlYXR1cmVzIiwicGFyc2VHZW9tZXRyeUZyb21TdHJpbmciLCJ0eXBlIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsIm1hcCIsInB0cyIsImdldEdlb2pzb25EYXRhTWFwcyIsImRhdGFDb250YWluZXIiLCJnZXRGZWF0dXJlIiwiYWNjZXB0YWJsZVR5cGVzIiwiZGF0YVRvRmVhdHVyZSIsImluZGV4IiwibnVtUm93cyIsImZlYXR1cmUiLCJpbmNsdWRlcyIsImNsZWFuZWQiLCJwcm9wZXJ0aWVzIiwiZ2VvU3RyaW5nIiwicGFyc2VkR2VvIiwiSlNPTiIsInBhcnNlIiwiZSIsImdldEdlb2pzb25Cb3VuZHMiLCJtYXhDb3VudCIsInNhbXBsZXMiLCJsZW5ndGgiLCJub25FbXB0eSIsImZpbHRlciIsImQiLCJmZWF0dXJlVG9EZWNrR2xHZW9UeXBlIiwiUG9pbnQiLCJNdWx0aVBvaW50IiwiTGluZVN0cmluZyIsIk11bHRpTGluZVN0cmluZyIsIlBvbHlnb24iLCJNdWx0aVBvbHlnb24iLCJnZXRHZW9qc29uRmVhdHVyZVR5cGVzIiwiYWxsRmVhdHVyZXMiLCJmZWF0dXJlVHlwZXMiLCJmIiwiZ2VvVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFFTyxTQUFTQSxzQkFBVCxDQUFnQ0MsVUFBaEMsRUFBNEM7QUFDakQsTUFBSSx5QkFBT0EsVUFBUCxNQUFzQixRQUExQixFQUFvQztBQUNsQztBQUNBO0FBQ0EsUUFBTUMsVUFBVSxHQUFHLGtDQUFVRCxVQUFWLENBQW5COztBQUNBLFFBQUksQ0FBQ0MsVUFBRCxJQUFlLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixVQUFVLENBQUNHLFFBQXpCLENBQXBCLEVBQXdEO0FBQ3REO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBT0gsVUFBVSxDQUFDRyxRQUFYLENBQW9CLENBQXBCLENBQVA7QUFDRCxHQVZELE1BVU8sSUFBSSxPQUFPSixVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3pDLFdBQU9LLHVCQUF1QixDQUFDTCxVQUFELENBQTlCO0FBQ0QsR0FGTSxNQUVBLElBQUlFLEtBQUssQ0FBQ0MsT0FBTixDQUFjSCxVQUFkLENBQUosRUFBK0I7QUFDcEM7QUFDQSxXQUFPO0FBQ0xNLE1BQUFBLElBQUksRUFBRSxTQUREO0FBRUxDLE1BQUFBLFFBQVEsRUFBRTtBQUNSO0FBQ0FDLFFBQUFBLFdBQVcsRUFBRVIsVUFBVSxDQUFDUyxHQUFYLENBQWUsVUFBQUMsR0FBRztBQUFBLGlCQUFJLENBQUNBLEdBQUcsQ0FBQyxDQUFELENBQUosRUFBU0EsR0FBRyxDQUFDLENBQUQsQ0FBWixDQUFKO0FBQUEsU0FBbEIsQ0FGTDtBQUdSSixRQUFBQSxJQUFJLEVBQUU7QUFIRTtBQUZMLEtBQVA7QUFRRDs7QUFFRCxTQUFPLElBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU0ssa0JBQVQsQ0FBNEJDLGFBQTVCLEVBQTJDQyxVQUEzQyxFQUF1RDtBQUM1RCxNQUFNQyxlQUFlLEdBQUcsQ0FDdEIsT0FEc0IsRUFFdEIsWUFGc0IsRUFHdEIsWUFIc0IsRUFJdEIsaUJBSnNCLEVBS3RCLFNBTHNCLEVBTXRCLGNBTnNCLEVBT3RCLG9CQVBzQixDQUF4QjtBQVVBLE1BQU1DLGFBQWEsR0FBRyxFQUF0Qjs7QUFFQSxPQUFLLElBQUlDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHSixhQUFhLENBQUNLLE9BQWQsRUFBNUIsRUFBcURELEtBQUssRUFBMUQsRUFBOEQ7QUFDNUQsUUFBTUUsT0FBTyxHQUFHbkIsc0JBQXNCLENBQUNjLFVBQVUsQ0FBQztBQUFDRyxNQUFBQSxLQUFLLEVBQUxBO0FBQUQsS0FBRCxDQUFYLENBQXRDOztBQUVBLFFBQUlFLE9BQU8sSUFBSUEsT0FBTyxDQUFDWCxRQUFuQixJQUErQk8sZUFBZSxDQUFDSyxRQUFoQixDQUF5QkQsT0FBTyxDQUFDWCxRQUFSLENBQWlCRCxJQUExQyxDQUFuQyxFQUFvRjtBQUNsRixVQUFNYyxPQUFPLG1DQUNSRixPQURRO0FBRVg7QUFDQUcsUUFBQUEsVUFBVSxrQ0FDTEgsT0FBTyxDQUFDRyxVQURIO0FBRVJMLFVBQUFBLEtBQUssRUFBTEE7QUFGUTtBQUhDLFFBQWI7O0FBU0FELE1BQUFBLGFBQWEsQ0FBQ0MsS0FBRCxDQUFiLEdBQXVCSSxPQUF2QjtBQUNELEtBWEQsTUFXTztBQUNMTCxNQUFBQSxhQUFhLENBQUNDLEtBQUQsQ0FBYixHQUF1QixJQUF2QjtBQUNEO0FBQ0Y7O0FBRUQsU0FBT0QsYUFBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU1YsdUJBQVQsQ0FBaUNpQixTQUFqQyxFQUE0QztBQUNqRCxNQUFJQyxTQUFKLENBRGlELENBR2pEO0FBQ0E7O0FBQ0EsTUFBSTtBQUNGQSxJQUFBQSxTQUFTLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxTQUFYLENBQVo7QUFDRCxHQUZELENBRUUsT0FBT0ksQ0FBUCxFQUFVLENBQ1Y7QUFDRCxHQVRnRCxDQVdqRDs7O0FBQ0EsTUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ2QsUUFBSTtBQUNGQSxNQUFBQSxTQUFTLEdBQUcsMkJBQVVELFNBQVYsQ0FBWjtBQUNELEtBRkQsQ0FFRSxPQUFPSSxDQUFQLEVBQVU7QUFDVixhQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELE1BQUksQ0FBQ0gsU0FBTCxFQUFnQjtBQUNkLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQU10QixVQUFVLEdBQUcsa0NBQVVzQixTQUFWLENBQW5COztBQUVBLE1BQUksQ0FBQ3RCLFVBQUQsSUFBZSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsVUFBVSxDQUFDRyxRQUF6QixDQUFwQixFQUF3RDtBQUN0RDtBQUNBLFdBQU8sSUFBUDtBQUNEOztBQUVELFNBQU9ILFVBQVUsQ0FBQ0csUUFBWCxDQUFvQixDQUFwQixDQUFQO0FBQ0Q7O0FBRU0sU0FBU3VCLGdCQUFULEdBQXlDO0FBQUEsTUFBZnZCLFFBQWUsdUVBQUosRUFBSTtBQUM5QztBQUNBO0FBQ0EsTUFBTXdCLFFBQVEsR0FBRyxLQUFqQjtBQUNBLE1BQU1DLE9BQU8sR0FBR3pCLFFBQVEsQ0FBQzBCLE1BQVQsR0FBa0JGLFFBQWxCLEdBQTZCLDhCQUFjeEIsUUFBZCxFQUF3QndCLFFBQXhCLENBQTdCLEdBQWlFeEIsUUFBakY7QUFFQSxNQUFNMkIsUUFBUSxHQUFHRixPQUFPLENBQUNHLE1BQVIsQ0FDZixVQUFBQyxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxJQUFJQSxDQUFDLENBQUMxQixRQUFQLElBQW1CMEIsQ0FBQyxDQUFDMUIsUUFBRixDQUFXQyxXQUE5QixJQUE2Q3lCLENBQUMsQ0FBQzFCLFFBQUYsQ0FBV0MsV0FBWCxDQUF1QnNCLE1BQXhFO0FBQUEsR0FEYyxDQUFqQjs7QUFJQSxNQUFJO0FBQ0YsV0FBTyxzQkFBSztBQUNWeEIsTUFBQUEsSUFBSSxFQUFFLG1CQURJO0FBRVZGLE1BQUFBLFFBQVEsRUFBRTJCO0FBRkEsS0FBTCxDQUFQO0FBSUQsR0FMRCxDQUtFLE9BQU9MLENBQVAsRUFBVTtBQUNWLFdBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRU0sSUFBTVEsc0JBQXNCLEdBQUc7QUFDcENDLEVBQUFBLEtBQUssRUFBRSxPQUQ2QjtBQUVwQ0MsRUFBQUEsVUFBVSxFQUFFLE9BRndCO0FBR3BDQyxFQUFBQSxVQUFVLEVBQUUsTUFId0I7QUFJcENDLEVBQUFBLGVBQWUsRUFBRSxNQUptQjtBQUtwQ0MsRUFBQUEsT0FBTyxFQUFFLFNBTDJCO0FBTXBDQyxFQUFBQSxZQUFZLEVBQUU7QUFOc0IsQ0FBL0I7QUFTUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBQ08sU0FBU0Msc0JBQVQsQ0FBZ0NDLFdBQWhDLEVBQTZDO0FBQ2xELE1BQU1DLFlBQVksR0FBRyxFQUFyQjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLFdBQVcsQ0FBQ1osTUFBaEMsRUFBd0NjLENBQUMsRUFBekMsRUFBNkM7QUFDM0MsUUFBTTFCLE9BQU8sR0FBR3dCLFdBQVcsQ0FBQ0UsQ0FBRCxDQUEzQjtBQUNBLFFBQU1DLE9BQU8sR0FBR1gsc0JBQXNCLENBQUNoQixPQUFPLElBQUlBLE9BQU8sQ0FBQ1gsUUFBbkIsSUFBK0JXLE9BQU8sQ0FBQ1gsUUFBUixDQUFpQkQsSUFBakQsQ0FBdEM7O0FBQ0EsUUFBSXVDLE9BQUosRUFBYTtBQUNYRixNQUFBQSxZQUFZLENBQUNFLE9BQUQsQ0FBWixHQUF3QixJQUF4QjtBQUNEO0FBQ0Y7O0FBRUQsU0FBT0YsWUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHdrdFBhcnNlciBmcm9tICd3ZWxsa25vd24nO1xuaW1wb3J0IG5vcm1hbGl6ZSBmcm9tICdAbWFwYm94L2dlb2pzb24tbm9ybWFsaXplJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuXG5pbXBvcnQge2dldFNhbXBsZURhdGF9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHZW9Kc29uUmF3RmVhdHVyZShyYXdGZWF0dXJlKSB7XG4gIGlmICh0eXBlb2YgcmF3RmVhdHVyZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBTdXBwb3J0IEdlb0pzb24gZmVhdHVyZSBhcyBvYmplY3RcbiAgICAvLyBwcm9iYWJseSBuZWVkIHRvIG5vcm1hbGl6ZSBpdCBhcyB3ZWxsXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZShyYXdGZWF0dXJlKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWQgfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZC5mZWF0dXJlcykpIHtcbiAgICAgIC8vIGZhaWwgdG8gbm9ybWFsaXplIEdlb0pzb25cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemVkLmZlYXR1cmVzWzBdO1xuICB9IGVsc2UgaWYgKHR5cGVvZiByYXdGZWF0dXJlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBwYXJzZUdlb21ldHJ5RnJvbVN0cmluZyhyYXdGZWF0dXJlKTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJhd0ZlYXR1cmUpKSB7XG4gICAgLy8gU3VwcG9ydCBHZW9Kc29uICBMaW5lU3RyaW5nIGFzIGFuIGFycmF5IG9mIHBvaW50c1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCB0byBmbGlwIGl0Li4uXG4gICAgICAgIGNvb3JkaW5hdGVzOiByYXdGZWF0dXJlLm1hcChwdHMgPT4gW3B0c1sxXSwgcHRzWzBdXSksXG4gICAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogUGFyc2UgcmF3IGRhdGEgdG8gR2VvSnNvbiBmZWF0dXJlXG4gKiBAcGFyYW0gZGF0YUNvbnRhaW5lclxuICogQHBhcmFtIGdldEZlYXR1cmVcbiAqIEByZXR1cm5zIHt7fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdlb2pzb25EYXRhTWFwcyhkYXRhQ29udGFpbmVyLCBnZXRGZWF0dXJlKSB7XG4gIGNvbnN0IGFjY2VwdGFibGVUeXBlcyA9IFtcbiAgICAnUG9pbnQnLFxuICAgICdNdWx0aVBvaW50JyxcbiAgICAnTGluZVN0cmluZycsXG4gICAgJ011bHRpTGluZVN0cmluZycsXG4gICAgJ1BvbHlnb24nLFxuICAgICdNdWx0aVBvbHlnb24nLFxuICAgICdHZW9tZXRyeUNvbGxlY3Rpb24nXG4gIF07XG5cbiAgY29uc3QgZGF0YVRvRmVhdHVyZSA9IFtdO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhQ29udGFpbmVyLm51bVJvd3MoKTsgaW5kZXgrKykge1xuICAgIGNvbnN0IGZlYXR1cmUgPSBwYXJzZUdlb0pzb25SYXdGZWF0dXJlKGdldEZlYXR1cmUoe2luZGV4fSkpO1xuXG4gICAgaWYgKGZlYXR1cmUgJiYgZmVhdHVyZS5nZW9tZXRyeSAmJiBhY2NlcHRhYmxlVHlwZXMuaW5jbHVkZXMoZmVhdHVyZS5nZW9tZXRyeS50eXBlKSkge1xuICAgICAgY29uc3QgY2xlYW5lZCA9IHtcbiAgICAgICAgLi4uZmVhdHVyZSxcbiAgICAgICAgLy8gc3RvcmUgaW5kZXggb2YgdGhlIGRhdGEgaW4gZmVhdHVyZSBwcm9wZXJ0aWVzXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAuLi5mZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgaW5kZXhcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZGF0YVRvRmVhdHVyZVtpbmRleF0gPSBjbGVhbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhVG9GZWF0dXJlW2luZGV4XSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGFUb0ZlYXR1cmU7XG59XG5cbi8qKlxuICogUGFyc2UgZ2VvanNvbiBmcm9tIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IGdlb1N0cmluZ1xuICogQHJldHVybnMge251bGwgfCBPYmplY3R9IGdlb2pzb24gb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUdlb21ldHJ5RnJvbVN0cmluZyhnZW9TdHJpbmcpIHtcbiAgbGV0IHBhcnNlZEdlbztcblxuICAvLyB0cnkgcGFyc2UgYXMgZ2VvanNvbiBzdHJpbmdcbiAgLy8ge1widHlwZVwiOlwiUG9seWdvblwiLFwiY29vcmRpbmF0ZXNcIjpbW1stNzQuMTU4NDkxLDQwLjgzNTk0XV1dfVxuICB0cnkge1xuICAgIHBhcnNlZEdlbyA9IEpTT04ucGFyc2UoZ2VvU3RyaW5nKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGtlZXAgdHJ5aW5nIHRvIHBhcnNlXG4gIH1cblxuICAvLyB0cnkgcGFyc2UgYXMgd2t0XG4gIGlmICghcGFyc2VkR2VvKSB7XG4gICAgdHJ5IHtcbiAgICAgIHBhcnNlZEdlbyA9IHdrdFBhcnNlcihnZW9TdHJpbmcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlmICghcGFyc2VkR2VvKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplKHBhcnNlZEdlbyk7XG5cbiAgaWYgKCFub3JtYWxpemVkIHx8ICFBcnJheS5pc0FycmF5KG5vcm1hbGl6ZWQuZmVhdHVyZXMpKSB7XG4gICAgLy8gZmFpbCB0byBub3JtYWxpemUgZ2VvanNvblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZWQuZmVhdHVyZXNbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW9qc29uQm91bmRzKGZlYXR1cmVzID0gW10pIHtcbiAgLy8gNzAgbXMgZm9yIDEwLDAwMCBwb2x5Z29uc1xuICAvLyBoZXJlIHdlIG9ubHkgcGljayBjb3VwbGVcbiAgY29uc3QgbWF4Q291bnQgPSAxMDAwMDtcbiAgY29uc3Qgc2FtcGxlcyA9IGZlYXR1cmVzLmxlbmd0aCA+IG1heENvdW50ID8gZ2V0U2FtcGxlRGF0YShmZWF0dXJlcywgbWF4Q291bnQpIDogZmVhdHVyZXM7XG5cbiAgY29uc3Qgbm9uRW1wdHkgPSBzYW1wbGVzLmZpbHRlcihcbiAgICBkID0+IGQgJiYgZC5nZW9tZXRyeSAmJiBkLmdlb21ldHJ5LmNvb3JkaW5hdGVzICYmIGQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoXG4gICk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYmJveCh7XG4gICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgZmVhdHVyZXM6IG5vbkVtcHR5XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZmVhdHVyZVRvRGVja0dsR2VvVHlwZSA9IHtcbiAgUG9pbnQ6ICdwb2ludCcsXG4gIE11bHRpUG9pbnQ6ICdwb2ludCcsXG4gIExpbmVTdHJpbmc6ICdsaW5lJyxcbiAgTXVsdGlMaW5lU3RyaW5nOiAnbGluZScsXG4gIFBvbHlnb246ICdwb2x5Z29uJyxcbiAgTXVsdGlQb2x5Z29uOiAncG9seWdvbidcbn07XG5cbi8qKlxuICogUGFyc2UgZ2VvanNvbiBmcm9tIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBhbGxGZWF0dXJlc1xuICogQHJldHVybnMge09iamVjdH0gbWFwcGluZyBvZiBmZWF0dXJlIHR5cGUgZXhpc3RlbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW9qc29uRmVhdHVyZVR5cGVzKGFsbEZlYXR1cmVzKSB7XG4gIGNvbnN0IGZlYXR1cmVUeXBlcyA9IHt9O1xuICBmb3IgKGxldCBmID0gMDsgZiA8IGFsbEZlYXR1cmVzLmxlbmd0aDsgZisrKSB7XG4gICAgY29uc3QgZmVhdHVyZSA9IGFsbEZlYXR1cmVzW2ZdO1xuICAgIGNvbnN0IGdlb1R5cGUgPSBmZWF0dXJlVG9EZWNrR2xHZW9UeXBlW2ZlYXR1cmUgJiYgZmVhdHVyZS5nZW9tZXRyeSAmJiBmZWF0dXJlLmdlb21ldHJ5LnR5cGVdO1xuICAgIGlmIChnZW9UeXBlKSB7XG4gICAgICBmZWF0dXJlVHlwZXNbZ2VvVHlwZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmZWF0dXJlVHlwZXM7XG59XG4iXX0=