"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meshcode_to_geom = meshcode_to_geom;
exports.geom_to_meshcode = geom_to_meshcode;
exports.meshdf_to_gdf = meshdf_to_gdf;
exports.getCentroid = getCentroid;
exports.pointToMeshdensityDataCPU = pointToMeshdensityDataCPU;
exports.meshToGeoBoundary = meshToGeoBoundary;
exports.meshToGeojson = meshToGeojson;
exports.getResolution = getResolution;
exports.edgeLength = edgeLength;
exports.getMeshOffset = getMeshOffset;
exports.meshIsValid = meshIsValid;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var turf = _interopRequireWildcard(require("@turf/turf"));

var jismesh = _interopRequireWildcard(require("jismesh-js"));

var _dataframeUtils = require("./dataframe-utils");

var _gridAggregationUtils = require("@deck.gl/aggregation-layers/dist/es5/utils/grid-aggregation-utils");

var _core = require("@deck.gl/core");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MESH_DEGREE_SIZE = {
  1: [40 / 60, 1],
  2: [5 / 60, 7.5 / 60],
  3: [30 / 3600, 45 / 3600],
  4: [30 / 7200, 45 / 7200],
  5: [30 / 14400, 45 / 14400],
  6: [30 / 28800, 45 / 28800]
};
var MESH_KM_SIZE = {
  1: 80,
  2: 10,
  3: 1,
  4: 0.5,
  5: 0.25,
  6: 0.125
};

function meshcode_to_geom(mesh_code) {
  var boundary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return boundary ? turf.bboxPolygon([].concat((0, _toConsumableArray2["default"])(jismesh.toMeshPoint(mesh_code, 0, 0).reverse()), (0, _toConsumableArray2["default"])(jismesh.toMeshPoint(mesh_code, 1, 1).reverse()))) : turf.point(jismesh.toMeshPoint(mesh_code, 0.5, 0.5));
} //todo: add meshcode


function geom_to_meshcode(level, lat, lng) {
  return jismesh.toMeshCode(lat, lng, level);
}

function meshdf_to_gdf(mesh_df) {
  var mesh_col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'meshcode';
  var geom_col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'geometry';
  var boundary = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return new _dataframeUtils.GeoDataframe(mesh_df.map(function (row) {
    return row.set(geom_col, meshcode_to_geom(row.get(mesh_col)), boundary);
  }), geom_col);
}

function getCentroid(_ref) {
  var id = _ref.id;
  //should return as lng,lat
  return jismesh.toMeshPoint(id.toString(), 0.5, 0.5).reverse();
}

function pointToMeshdensityDataCPU(props, aggregationParams) {
  var hashInfo = pointsToJISMeshHashing(props, aggregationParams);
  var result = getJISMeshLayerDataFromMeshHash(hashInfo);
  return {
    gridHash: hashInfo.gridHash,
    gridOffset: hashInfo.gridOffset,
    data: result
  };
}

function meshToGeoBoundary(meshcode) {
  var lnglat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  // console.log('meshcode to geoboundary')
  var geom_array = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]].map(function (x) {
    return jismesh.toMeshPoint(meshcode, x[0], x[1]);
  });
  return lnglat ? geom_array.map(function (x) {
    return x.reverse();
  }) : geom_array;
}

function meshToGeojson(meshcode) {
  var json_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'LineString';
  var turf_obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var coords = meshToGeoBoundary(meshcode);
  return turf_obj ? json_type === 'LineString' ? turf.lineString(coords) : turf.polygon(coords) : {
    geometry: {
      coordinates: coords,
      type: json_type
    }
  };
} //currently not support no standard mesh


function getResolution(meshcode) {
  var mesh_level = {
    4: 1,
    6: 2,
    8: 3,
    9: 4,
    10: 5,
    11: 6
  };
  return mesh_level[meshcode.toString().length];
}

function edgeLength(resolution, unit) {
  if (unit === 'degree') {
    return MESH_DEGREE_SIZE[resolution];
  }

  if (unit === 'km') {
    return MESH_KM_SIZE[resolution];
  }
}

function getMeshOffset(boundingBox) {
  if (boundingBox) {} else {
    return {};
  }
}

function meshIsValid(meshcode) {
  //dit range: 4,6,8,9,10,11 (currently not support 100m mesh)
  try {
    var mesh_code = typeof meshcode === 'string' ? parseInt(meshcode) : Number.isInteger(meshcode) ? meshcode : null;

    if (mesh_code) {
      if (![4, 6, 8, 9, 10, 11, 12].includes(mesh_code.toString().length)) {
        return false;
      } //after eight digit, the value should be in 1,2,3,4


      mesh_code.toString().slice(8).split('').map(function (x) {
        if (!['1', '2', '3', '4'].includes(x)) {
          return false;
        }
      }); //north east: 6950, south east: 3623, filter by range

      var one_level_mesh = parseInt(mesh_code.toString().slice(0, 4));
      return !(one_level_mesh > 6950 || one_level_mesh < 3623);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
} //offset is related to the


function pointsToJISMeshHashing(props, aggregationParams) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      level = props.level;
  var attributes = aggregationParams.attributes,
      viewport = aggregationParams.viewport,
      projectPoints = aggregationParams.projectPoints,
      numInstances = aggregationParams.numInstances; //to check what is position

  var positions = attributes.positions.value;

  var _attributes$positions = attributes.positions.getAccessor(),
      size = _attributes$positions.size; // const boundingBox = aggregationParams.boundingBox || getPositionBoundingBox(attributes.positions, numInstances);
  // const offsets = aggregationParams.posOffset || [180, 90];
  // here, to determine that grid offset is


  var gridOffset = getMeshOffset(boundingBox); //what is grid offset? how to shift it to mesh offset?

  if (gridOffset.xOffset <= 0 || gridOffset.yOffset) {
    return {
      gridHash: {},
      gridOffset: gridOffset
    };
  }

  var width = viewport.width,
      height = viewport.height; // this should be the range of viewport; current view point and math cell xoffset and yoffset

  var numCol = Math.ceil(width / gridOffset.xOffset);
  var numRow = Math.ceil(height / gridOffset.yOffset);
  var gridHash = {};

  var _createIterable = (0, _core.createIterable)(data),
      iterable = _createIterable.iterable,
      objectInfo = _createIterable.objectInfo;

  var position = new Array(3); // why infinite?

  var _iterator = _createForOfIteratorHelper(iterable),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pt = _step.value;
      console.log('run interable pt');
      objectInfo.index++;
      position[0] = positions[objectInfo.index * size];
      position[1] = positions[objectInfo.index * size + 1];
      position[2] = size >= 3 ? positions[objectInfo.index * size + 2] : 0;

      var _ref2 = projectPoints ? viewport.project(position) : position,
          _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          x = _ref3[0],
          y = _ref3[1];

      if (Number.isFinite(x) && Number.isFinite(y)) {
        var meshcode = jismesh.toMeshCode(y, x, level);
        gridHash[meshcode] = gridHash[meshcode] || {
          count: 0,
          points: []
        };
        gridHash[key].count += 1;
        gridHash[key].points.push(pt); // const yIndex = Math.floor((y + offsets[1]) / gridOffset.yOffset)
        // const xIndex = Math.floor((x + offsets[0]) / gridOffset.xOffset)
        // if(!projectPoins || xIndex >= 0 && xIndex < numCol && yIndex >= 0){
        //   const key = "".concat(yIndex,"-").concat(xIndex);
        // }
      }

      return {
        gridHash: gridHash,
        gridOffset: gridOffset
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function getJISMeshLayerDataFromMeshHash(_ref4) {
  var girdHash = _ref4.girdHash,
      gridOffset = _ref4.gridOffset,
      offsets = _ref4.offsets;
  var data = new Array(Object.keys(gridHash).length);
  var i = 0;

  for (var _key in gridHash) {
    console.log('generate key here');
    var index = i++;
    data[index] = Object.assign({
      index: index,
      position: jismesh.toMeshPoint(_key, 1, 1)
    }, gridHash[_key]);
  }

  return data;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9qaXNtZXNoLXV0aWxzLmpzIl0sIm5hbWVzIjpbIk1FU0hfREVHUkVFX1NJWkUiLCJNRVNIX0tNX1NJWkUiLCJtZXNoY29kZV90b19nZW9tIiwibWVzaF9jb2RlIiwiYm91bmRhcnkiLCJ0dXJmIiwiYmJveFBvbHlnb24iLCJqaXNtZXNoIiwidG9NZXNoUG9pbnQiLCJyZXZlcnNlIiwicG9pbnQiLCJnZW9tX3RvX21lc2hjb2RlIiwibGV2ZWwiLCJsYXQiLCJsbmciLCJ0b01lc2hDb2RlIiwibWVzaGRmX3RvX2dkZiIsIm1lc2hfZGYiLCJtZXNoX2NvbCIsImdlb21fY29sIiwiR2VvRGF0YWZyYW1lIiwibWFwIiwicm93Iiwic2V0IiwiZ2V0IiwiZ2V0Q2VudHJvaWQiLCJpZCIsInRvU3RyaW5nIiwicG9pbnRUb01lc2hkZW5zaXR5RGF0YUNQVSIsInByb3BzIiwiYWdncmVnYXRpb25QYXJhbXMiLCJoYXNoSW5mbyIsInBvaW50c1RvSklTTWVzaEhhc2hpbmciLCJyZXN1bHQiLCJnZXRKSVNNZXNoTGF5ZXJEYXRhRnJvbU1lc2hIYXNoIiwiZ3JpZEhhc2giLCJncmlkT2Zmc2V0IiwiZGF0YSIsIm1lc2hUb0dlb0JvdW5kYXJ5IiwibWVzaGNvZGUiLCJsbmdsYXQiLCJnZW9tX2FycmF5IiwieCIsIm1lc2hUb0dlb2pzb24iLCJqc29uX3R5cGUiLCJ0dXJmX29iaiIsImNvb3JkcyIsImxpbmVTdHJpbmciLCJwb2x5Z29uIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsInR5cGUiLCJnZXRSZXNvbHV0aW9uIiwibWVzaF9sZXZlbCIsImxlbmd0aCIsImVkZ2VMZW5ndGgiLCJyZXNvbHV0aW9uIiwidW5pdCIsImdldE1lc2hPZmZzZXQiLCJib3VuZGluZ0JveCIsIm1lc2hJc1ZhbGlkIiwicGFyc2VJbnQiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJpbmNsdWRlcyIsInNsaWNlIiwic3BsaXQiLCJvbmVfbGV2ZWxfbWVzaCIsImUiLCJhdHRyaWJ1dGVzIiwidmlld3BvcnQiLCJwcm9qZWN0UG9pbnRzIiwibnVtSW5zdGFuY2VzIiwicG9zaXRpb25zIiwidmFsdWUiLCJnZXRBY2Nlc3NvciIsInNpemUiLCJ4T2Zmc2V0IiwieU9mZnNldCIsIndpZHRoIiwiaGVpZ2h0IiwibnVtQ29sIiwiTWF0aCIsImNlaWwiLCJudW1Sb3ciLCJpdGVyYWJsZSIsIm9iamVjdEluZm8iLCJwb3NpdGlvbiIsIkFycmF5IiwicHQiLCJjb25zb2xlIiwibG9nIiwiaW5kZXgiLCJwcm9qZWN0IiwieSIsImlzRmluaXRlIiwiY291bnQiLCJwb2ludHMiLCJrZXkiLCJwdXNoIiwiZ2lyZEhhc2giLCJvZmZzZXRzIiwiT2JqZWN0Iiwia2V5cyIsImkiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBR0EsSUFBTUEsZ0JBQWdCLEdBQUc7QUFBQyxLQUFFLENBQUMsS0FBRyxFQUFKLEVBQU8sQ0FBUCxDQUFIO0FBQWEsS0FBRSxDQUFDLElBQUUsRUFBSCxFQUFNLE1BQUksRUFBVixDQUFmO0FBQTZCLEtBQUUsQ0FBQyxLQUFHLElBQUosRUFBUyxLQUFHLElBQVosQ0FBL0I7QUFBaUQsS0FBRSxDQUFDLEtBQUcsSUFBSixFQUFTLEtBQUcsSUFBWixDQUFuRDtBQUFxRSxLQUFFLENBQUMsS0FBRyxLQUFKLEVBQVUsS0FBRyxLQUFiLENBQXZFO0FBQTJGLEtBQUUsQ0FBQyxLQUFHLEtBQUosRUFBVSxLQUFHLEtBQWI7QUFBN0YsQ0FBekI7QUFFQSxJQUFNQyxZQUFZLEdBQUc7QUFBQyxLQUFFLEVBQUg7QUFBTSxLQUFFLEVBQVI7QUFBVyxLQUFFLENBQWI7QUFBZSxLQUFFLEdBQWpCO0FBQXFCLEtBQUUsSUFBdkI7QUFBNEIsS0FBRTtBQUE5QixDQUFyQjs7QUFFTyxTQUFTQyxnQkFBVCxDQUEwQkMsU0FBMUIsRUFBdUQ7QUFBQSxNQUFsQkMsUUFBa0IsdUVBQVAs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QUN1RCxLQUFELENBQUosR0FBY1UsTUFBTSxDQUFDRyxNQUFQLENBQWM7QUFDMUJiLE1BQUFBLEtBQUssRUFBTEEsS0FEMEI7QUFFMUJMLE1BQUFBLFFBQVEsRUFBQ2hGLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQjBGLElBQXBCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBRmlCLEtBQWQsRUFHWi9ELFFBQVEsQ0FBQytELElBQUQsQ0FISSxDQUFkO0FBSUQ7O0FBQ0QsU0FBTzdELElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIEB0cy1ub2NoZWNrXG5pbXBvcnQgKiBhcyB0dXJmIGZyb20gJ0B0dXJmL3R1cmYnO1xuaW1wb3J0ICogYXMgamlzbWVzaCBmcm9tICdqaXNtZXNoLWpzJztcbmltcG9ydCB7R2VvRGF0YWZyYW1lfSBmcm9tICcuL2RhdGFmcmFtZS11dGlscyc7XG5pbXBvcnQge2dldEdyaWRPZmZzZXR9IGZyb20gJ0BkZWNrLmdsL2FnZ3JlZ2F0aW9uLWxheWVycy9kaXN0L2VzNS91dGlscy9ncmlkLWFnZ3JlZ2F0aW9uLXV0aWxzJztcbmltcG9ydCB7Y3JlYXRlSXRlcmFibGV9IGZyb20gJ0BkZWNrLmdsL2NvcmUnO1xuXG5cbmNvbnN0IE1FU0hfREVHUkVFX1NJWkUgPSB7MTpbNDAvNjAsMV0sMjpbNS82MCw3LjUvNjBdLDM6WzMwLzM2MDAsNDUvMzYwMF0sNDpbMzAvNzIwMCw0NS83MjAwXSw1OlszMC8xNDQwMCw0NS8xNDQwMF0sNjpbMzAvMjg4MDAsNDUvMjg4MDBdfVxuXG5jb25zdCBNRVNIX0tNX1NJWkUgPSB7MTo4MCwyOjEwLDM6MSw0OjAuNSw1OjAuMjUsNjowLjEyNX1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lc2hjb2RlX3RvX2dlb20obWVzaF9jb2RlLCBib3VuZGFyeSA9IGZhbHNlKSB7XG4gIHJldHVybiBib3VuZGFyeSA/IHR1cmYuYmJveFBvbHlnb24oWy4uLmppc21lc2gudG9NZXNoUG9pbnQobWVzaF9jb2RlLCAwLCAwKS5yZXZlcnNlKCksIC4uLmppc21lc2gudG9NZXNoUG9pbnQobWVzaF9jb2RlLCAxLCAxKS5yZXZlcnNlKCldKSA6IHR1cmYucG9pbnQoamlzbWVzaC50b01lc2hQb2ludChtZXNoX2NvZGUsIDAuNSwgMC41KSk7XG59XG5cbi8vdG9kbzogYWRkIG1lc2hjb2RlXG5leHBvcnQgZnVuY3Rpb24gZ2VvbV90b19tZXNoY29kZShsZXZlbCxsYXQsbG5nKXtcbiAgcmV0dXJuIGppc21lc2gudG9NZXNoQ29kZShsYXQsbG5nLGxldmVsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVzaGRmX3RvX2dkZihtZXNoX2RmLCBtZXNoX2NvbCA9ICdtZXNoY29kZScsIGdlb21fY29sID0gJ2dlb21ldHJ5JywgYm91bmRhcnkgPSB0cnVlKSB7XG4gIHJldHVybiBuZXcgR2VvRGF0YWZyYW1lKG1lc2hfZGYubWFwKHJvdyA9PiByb3cuc2V0KGdlb21fY29sLCBtZXNoY29kZV90b19nZW9tKHJvdy5nZXQobWVzaF9jb2wpKSwgYm91bmRhcnkpKSwgZ2VvbV9jb2wpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2VudHJvaWQoe2lkfSl7XG4gIC8vc2hvdWxkIHJldHVybiBhcyBsbmcsbGF0XG4gIHJldHVybiBqaXNtZXNoLnRvTWVzaFBvaW50KGlkLnRvU3RyaW5nKCksMC41LDAuNSkucmV2ZXJzZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludFRvTWVzaGRlbnNpdHlEYXRhQ1BVKHByb3BzLGFnZ3JlZ2F0aW9uUGFyYW1zKXtcbiAgY29uc3QgaGFzaEluZm8gPSBwb2ludHNUb0pJU01lc2hIYXNoaW5nKHByb3BzLGFnZ3JlZ2F0aW9uUGFyYW1zKTtcbiAgY29uc3QgcmVzdWx0ID0gZ2V0SklTTWVzaExheWVyRGF0YUZyb21NZXNoSGFzaChoYXNoSW5mbyk7XG4gIHJldHVybiB7XG4gICAgZ3JpZEhhc2g6aGFzaEluZm8uZ3JpZEhhc2gsXG4gICAgZ3JpZE9mZnNldDogaGFzaEluZm8uZ3JpZE9mZnNldCxcbiAgICBkYXRhOiByZXN1bHRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVzaFRvR2VvQm91bmRhcnkobWVzaGNvZGUsbG5nbGF0PXRydWUpe1xuICAvLyBjb25zb2xlLmxvZygnbWVzaGNvZGUgdG8gZ2VvYm91bmRhcnknKVxuICBjb25zdCBnZW9tX2FycmF5ID0gW1swLDBdLFswLDFdLFsxLDFdLFsxLDBdLFswLDBdXS5tYXAoKHgpPT5qaXNtZXNoLnRvTWVzaFBvaW50KG1lc2hjb2RlLHhbMF0seFsxXSkpXG4gIHJldHVybiBsbmdsYXQ/Z2VvbV9hcnJheS5tYXAoKHgpPT54LnJldmVyc2UoKSk6Z2VvbV9hcnJheVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVzaFRvR2VvanNvbihtZXNoY29kZSxqc29uX3R5cGU9J0xpbmVTdHJpbmcnLHR1cmZfb2JqPWZhbHNlKXtcbiAgY29uc3QgY29vcmRzID0gbWVzaFRvR2VvQm91bmRhcnkobWVzaGNvZGUpXG4gIHJldHVybiB0dXJmX29iaj8oanNvbl90eXBlPT09J0xpbmVTdHJpbmcnP3R1cmYubGluZVN0cmluZyhjb29yZHMpOnR1cmYucG9seWdvbihjb29yZHMpKTp7XG4gICAgZ2VvbWV0cnk6e1xuICAgICAgY29vcmRpbmF0ZXM6Y29vcmRzLFxuICAgICAgdHlwZTpqc29uX3R5cGVcbiAgICB9XG4gIH1cbn1cblxuLy9jdXJyZW50bHkgbm90IHN1cHBvcnQgbm8gc3RhbmRhcmQgbWVzaFxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlc29sdXRpb24obWVzaGNvZGUpe1xuICBjb25zdCBtZXNoX2xldmVsID0gezQ6MSw2OjIsODozLDk6NCwxMDo1LDExOjZ9XG4gIHJldHVybiBtZXNoX2xldmVsW21lc2hjb2RlLnRvU3RyaW5nKCkubGVuZ3RoXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRnZUxlbmd0aChyZXNvbHV0aW9uLHVuaXQpe1xuICBpZih1bml0PT09J2RlZ3JlZScpe1xuICAgIHJldHVybiBNRVNIX0RFR1JFRV9TSVpFW3Jlc29sdXRpb25dXG4gIH1cblxuICBpZih1bml0PT09J2ttJyl7XG4gICAgcmV0dXJuIE1FU0hfS01fU0laRVtyZXNvbHV0aW9uXVxuICB9XG5cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWVzaE9mZnNldChib3VuZGluZ0JveCl7XG4gIGlmKGJvdW5kaW5nQm94KXtcblxuICB9XG4gIGVsc2V7XG4gICAgcmV0dXJuIHtcblxuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNoSXNWYWxpZChtZXNoY29kZSl7XG5cbiAgLy9kaXQgcmFuZ2U6IDQsNiw4LDksMTAsMTEgKGN1cnJlbnRseSBub3Qgc3VwcG9ydCAxMDBtIG1lc2gpXG4gIHRyeXtcblxuICAgIGNvbnN0IG1lc2hfY29kZSA9IHR5cGVvZihtZXNoY29kZSkgPT09ICdzdHJpbmcnP3BhcnNlSW50KG1lc2hjb2RlKTooTnVtYmVyLmlzSW50ZWdlcihtZXNoY29kZSk/bWVzaGNvZGU6bnVsbClcblxuICAgIGlmKG1lc2hfY29kZSl7XG5cbiAgICAgIGlmKCFbNCw2LDgsOSwxMCwxMSwxMl0uaW5jbHVkZXMobWVzaF9jb2RlLnRvU3RyaW5nKCkubGVuZ3RoKSl7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvL2FmdGVyIGVpZ2h0IGRpZ2l0LCB0aGUgdmFsdWUgc2hvdWxkIGJlIGluIDEsMiwzLDRcbiAgICAgIG1lc2hfY29kZS50b1N0cmluZygpLnNsaWNlKDgpLnNwbGl0KCcnKS5tYXAoKHgpPT57XG4gICAgICAgIGlmKCFbJzEnLCcyJywnMycsJzQnXS5pbmNsdWRlcyh4KSl7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vbm9ydGggZWFzdDogNjk1MCwgc291dGggZWFzdDogMzYyMywgZmlsdGVyIGJ5IHJhbmdlXG4gICAgICBjb25zdCBvbmVfbGV2ZWxfbWVzaCA9IHBhcnNlSW50KG1lc2hfY29kZS50b1N0cmluZygpLnNsaWNlKDAsNCkpXG4gICAgICByZXR1cm4gISgob25lX2xldmVsX21lc2gpID4gNjk1MCB8fCAob25lX2xldmVsX21lc2gpIDwgMzYyMyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG5cblxuICB9Y2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuXG4vL29mZnNldCBpcyByZWxhdGVkIHRvIHRoZVxuZnVuY3Rpb24gcG9pbnRzVG9KSVNNZXNoSGFzaGluZyhwcm9wcyxhZ2dyZWdhdGlvblBhcmFtcyl7XG4gIGNvbnN0IHtcbiAgICBkYXRhID0gW10sXG4gICAgbGV2ZWxcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHtcbiAgICBhdHRyaWJ1dGVzLFxuICAgIHZpZXdwb3J0LFxuICAgIHByb2plY3RQb2ludHMsXG4gICAgbnVtSW5zdGFuY2VzXG4gIH0gPSBhZ2dyZWdhdGlvblBhcmFtcztcblxuICAvL3RvIGNoZWNrIHdoYXQgaXMgcG9zaXRpb25cbiAgY29uc3QgcG9zaXRpb25zID0gYXR0cmlidXRlcy5wb3NpdGlvbnMudmFsdWU7XG5cbiAgY29uc3Qge1xuICAgIHNpemVcbiAgfSA9IGF0dHJpYnV0ZXMucG9zaXRpb25zLmdldEFjY2Vzc29yKClcblxuICAvLyBjb25zdCBib3VuZGluZ0JveCA9IGFnZ3JlZ2F0aW9uUGFyYW1zLmJvdW5kaW5nQm94IHx8IGdldFBvc2l0aW9uQm91bmRpbmdCb3goYXR0cmlidXRlcy5wb3NpdGlvbnMsIG51bUluc3RhbmNlcyk7XG4gIC8vIGNvbnN0IG9mZnNldHMgPSBhZ2dyZWdhdGlvblBhcmFtcy5wb3NPZmZzZXQgfHwgWzE4MCwgOTBdO1xuXG4gIC8vIGhlcmUsIHRvIGRldGVybWluZSB0aGF0IGdyaWQgb2Zmc2V0IGlzXG4gIGNvbnN0IGdyaWRPZmZzZXQgPSBnZXRNZXNoT2Zmc2V0KGJvdW5kaW5nQm94KTtcblxuXG4gIC8vd2hhdCBpcyBncmlkIG9mZnNldD8gaG93IHRvIHNoaWZ0IGl0IHRvIG1lc2ggb2Zmc2V0P1xuICBpZihncmlkT2Zmc2V0LnhPZmZzZXQgPD0gMCB8fCBncmlkT2Zmc2V0LnlPZmZzZXQpe1xuICAgIHJldHVybiB7XG4gICAgICBncmlkSGFzaDoge30sXG4gICAgICBncmlkT2Zmc2V0XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfSA9IHZpZXdwb3J0O1xuXG4gIC8vIHRoaXMgc2hvdWxkIGJlIHRoZSByYW5nZSBvZiB2aWV3cG9ydDsgY3VycmVudCB2aWV3IHBvaW50IGFuZCBtYXRoIGNlbGwgeG9mZnNldCBhbmQgeW9mZnNldFxuICBjb25zdCBudW1Db2wgPSBNYXRoLmNlaWwod2lkdGggLyBncmlkT2Zmc2V0LnhPZmZzZXQpO1xuICBjb25zdCBudW1Sb3cgPSBNYXRoLmNlaWwoaGVpZ2h0IC8gZ3JpZE9mZnNldC55T2Zmc2V0KTtcblxuICBjb25zdCBncmlkSGFzaCA9IHt9O1xuICBjb25zdCB7XG4gICAgaXRlcmFibGUsXG4gICAgb2JqZWN0SW5mb1xuICB9ID0gY3JlYXRlSXRlcmFibGUoZGF0YSk7XG5cbiAgY29uc3QgcG9zaXRpb24gPSBuZXcgQXJyYXkoMyk7XG5cbiAgLy8gd2h5IGluZmluaXRlP1xuICBmb3IgKGNvbnN0IHB0IG9mIGl0ZXJhYmxlKXtcblxuICAgIGNvbnNvbGUubG9nKCdydW4gaW50ZXJhYmxlIHB0JylcbiAgICBvYmplY3RJbmZvLmluZGV4Kys7XG4gICAgcG9zaXRpb25bMF0gPSBwb3NpdGlvbnNbb2JqZWN0SW5mby5pbmRleCAqIHNpemVdO1xuICAgIHBvc2l0aW9uWzFdID0gcG9zaXRpb25zW29iamVjdEluZm8uaW5kZXggKiBzaXplICsgMV07XG4gICAgcG9zaXRpb25bMl0gPSBzaXplID49IDMgPyBwb3NpdGlvbnNbb2JqZWN0SW5mby5pbmRleCAqIHNpemUgKyAyXSA6IDA7XG4gICAgY29uc3QgW3gsIHldID0gcHJvamVjdFBvaW50cyA/IHZpZXdwb3J0LnByb2plY3QocG9zaXRpb24pIDogcG9zaXRpb247XG5cbiAgICBpZihOdW1iZXIuaXNGaW5pdGUoeCkgJiYgTnVtYmVyLmlzRmluaXRlKHkpKXtcbiAgICAgIGNvbnN0IG1lc2hjb2RlID0gamlzbWVzaC50b01lc2hDb2RlKHkseCxsZXZlbClcbiAgICAgIGdyaWRIYXNoW21lc2hjb2RlXSA9IGdyaWRIYXNoW21lc2hjb2RlXSB8fCB7XG4gICAgICAgIGNvdW50OjAsXG4gICAgICAgIHBvaW50czpbXSxcbiAgICAgIH1cbiAgICAgIGdyaWRIYXNoW2tleV0uY291bnQgKz0gMVxuICAgICAgZ3JpZEhhc2hba2V5XS5wb2ludHMucHVzaChwdCk7XG5cbiAgICAgIC8vIGNvbnN0IHlJbmRleCA9IE1hdGguZmxvb3IoKHkgKyBvZmZzZXRzWzFdKSAvIGdyaWRPZmZzZXQueU9mZnNldClcbiAgICAgIC8vIGNvbnN0IHhJbmRleCA9IE1hdGguZmxvb3IoKHggKyBvZmZzZXRzWzBdKSAvIGdyaWRPZmZzZXQueE9mZnNldClcbiAgICAgIC8vIGlmKCFwcm9qZWN0UG9pbnMgfHwgeEluZGV4ID49IDAgJiYgeEluZGV4IDwgbnVtQ29sICYmIHlJbmRleCA+PSAwKXtcbiAgICAgIC8vICAgY29uc3Qga2V5ID0gXCJcIi5jb25jYXQoeUluZGV4LFwiLVwiKS5jb25jYXQoeEluZGV4KTtcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ3JpZEhhc2gsXG4gICAgICBncmlkT2Zmc2V0XG4gICAgfVxuXG4gIH1cblxuXG59XG5cblxuZnVuY3Rpb24gZ2V0SklTTWVzaExheWVyRGF0YUZyb21NZXNoSGFzaCh7Z2lyZEhhc2gsZ3JpZE9mZnNldCxvZmZzZXRzfSl7XG4gIGNvbnN0IGRhdGEgPSBuZXcgQXJyYXkoT2JqZWN0LmtleXMoZ3JpZEhhc2gpLmxlbmd0aCk7XG4gIGxldCBpID0gMDtcbiAgZm9yIChjb25zdCBrZXkgaW4gZ3JpZEhhc2gpe1xuICAgIGNvbnNvbGUubG9nKCdnZW5lcmF0ZSBrZXkgaGVyZScpXG4gICAgY29uc3QgaW5kZXggPSBpKytcbiAgICBkYXRhW2luZGV4XSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgaW5kZXgsXG4gICAgICBwb3NpdGlvbjpqaXNtZXNoLnRvTWVzaFBvaW50KGtleSwxLDEpXG4gICAgfSxncmlkSGFzaFtrZXldKVxuICB9XG4gIHJldHVybiBkYXRhXG59XG4iXX0=