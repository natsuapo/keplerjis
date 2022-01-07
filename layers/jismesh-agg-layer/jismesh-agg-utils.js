"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointToMeshPolygonGeo = pointToMeshPolygonGeo;
exports.pointToJISMesh = pointToJISMesh;
exports.getMeshLayerDataFromMeshHash = getMeshLayerDataFromMeshHash;
exports.getPointsCenter = getPointsCenter;
exports.getRadiusInCommon = getRadiusInCommon;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _core = require("@deck.gl/core");

var _jismeshUtils = require("../../utils/jismesh-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pointToMeshPolygonGeo() {}

function pointToJISMesh(props, aggregationParams) {
  var data = props.data,
      cellSize = props.cellSize;
  var meshLevel = cellSize;
  console.log('point to jismesh');
  var viewport = aggregationParams.viewport,
      attributes = aggregationParams.attributes,
      projectPoints = aggregationParams.projectPoints;
  var centerLngLat = data.length ? getPointsCenter(data, aggregationParams) : null; // const radiusCommon = getRadiusInCommon(level, viewport, centerLngLat);

  var meshHash = {};

  var _createIterable = (0, _core.createIterable)(data),
      iterable = _createIterable.iterable,
      objectInfo = _createIterable.objectInfo;

  var positions = attributes.positions.value; //first to check the coordinates of the positions

  var _attributes$positions = attributes.positions.getAccessor(),
      size = _attributes$positions.size; //put visible objects into screenpoints, check if points in the screen;


  var _iterator = _createForOfIteratorHelper(iterable),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var object = _step.value;
      objectInfo.index++;
      var posIndex = objectInfo.index * size;
      var position = [positions[posIndex], positions[posIndex + 1]];
      var arrayIsFinite = Number.isFinite(position[0]) && Number.isFinite(position[1]);

      if (arrayIsFinite) {
        var meshcode = (0, _jismeshUtils.geom_to_meshcode)(meshLevel, position[1], position[0]);
        meshHash[meshcode] = meshHash[meshcode] || {
          count: 0,
          points: []
        };
        meshHash[meshcode].count += 1;
        meshHash[meshcode].points.push(object);
      } else {
        _core.log.warn('JISMeshLayer: invalid position')();
      }
    } //here screen point will save the data;

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var result = getMeshLayerDataFromMeshHash(meshHash);
  return {
    data: result
  };
} //here need to check the coordinate system


function getMeshLayerDataFromMeshHash(meshHash) {
  // const data = new Array(Object.keys(hashInfo.meshHash).length)
  console.log('get meshlayer func start');
  var data = Object.keys(meshHash).map(function (x, i) {
    console.log('get meshlayer data from mesh hash');
    return _objectSpread(_objectSpread({}, {
      index: i,
      meshcode: x,
      position: [(0, _jismeshUtils.getCentroid)({
        id: x
      })]
    }), meshHash[x]);
  });
  return data;
}

function getPointsCenter(data, aggregationParams) {
  var attributes = aggregationParams.attributes;
  var positions = attributes.positions.value;

  var _attributes$positions2 = attributes.positions.getAccessor(),
      size = _attributes$positions2.size;

  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  var i;

  for (i = 0; i < size * data.length; i += size) {
    var x = positions[i];
    var y = positions[i + 1];
    var arrayIsFinite = Number.isFinite(x) && Number.isFinite(y);

    if (arrayIsFinite) {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }
  } // return center


  return [minX, minY, maxX, maxY].every(Number.isFinite) ? [(minX + maxX) / 2, (minY + maxY) / 2] : null;
}

function getRadiusInCommon(radius, viewport, center) {
  var _viewport$getDistance = viewport.getDistanceScales(center),
      unitsPerMeter = _viewport$getDistance.unitsPerMeter; // x, y distance should be the same


  return radius * unitsPerMeter[0];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1hZ2ctbGF5ZXIvamlzbWVzaC1hZ2ctdXRpbHMuanMiXSwibmFtZXMiOlsicG9pbnRUb01lc2hQb2x5Z29uR2VvIiwicG9pbnRUb0pJU01lc2giLCJwcm9wcyIsImFnZ3JlZ2F0aW9uUGFyYW1zIiwiZGF0YSIsImNlbGxTaXplIiwibWVzaExldmVsIiwiY29uc29sZSIsImxvZyIsInZpZXdwb3J0IiwiYXR0cmlidXRlcyIsInByb2plY3RQb2ludHMiLCJjZW50ZXJMbmdMYXQiLCJsZW5ndGgiLCJnZXRQb2ludHNDZW50ZXIiLCJtZXNoSGFzaCIsIml0ZXJhYmxlIiwib2JqZWN0SW5mbyIsInBvc2l0aW9ucyIsInZhbHVlIiwiZ2V0QWNjZXNzb3IiLCJzaXplIiwib2JqZWN0IiwiaW5kZXgiLCJwb3NJbmRleCIsInBvc2l0aW9uIiwiYXJyYXlJc0Zpbml0ZSIsIk51bWJlciIsImlzRmluaXRlIiwibWVzaGNvZGUiLCJjb3VudCIsInBvaW50cyIsInB1c2giLCJ3YXJuIiwicmVzdWx0IiwiZ2V0TWVzaExheWVyRGF0YUZyb21NZXNoSGFzaCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJ4IiwiaSIsImlkIiwibWluWCIsIkluZmluaXR5IiwibWluWSIsIm1heFgiLCJtYXhZIiwieSIsIk1hdGgiLCJtaW4iLCJtYXgiLCJldmVyeSIsImdldFJhZGl1c0luQ29tbW9uIiwicmFkaXVzIiwiY2VudGVyIiwiZ2V0RGlzdGFuY2VTY2FsZXMiLCJ1bml0c1Blck1ldGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVPLFNBQVNBLHFCQUFULEdBQWdDLENBRXRDOztBQUVNLFNBQVNDLGNBQVQsQ0FBd0JDLEtBQXhCLEVBQThCQyxpQkFBOUIsRUFBZ0Q7QUFBQSxNQUVuREMsSUFGbUQsR0FHakRGLEtBSGlELENBRW5ERSxJQUZtRDtBQUFBLE1BRTdDQyxRQUY2QyxHQUdq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LE1BQUFBLElBQUksR0FBR00sSUFBSSxDQUFDQyxHQUFMLENBQVNWLENBQVQsRUFBWUcsSUFBWixDQUFQO0FBQ0FHLE1BQUFBLElBQUksR0FBR0csSUFBSSxDQUFDRSxHQUFMLENBQVNYLENBQVQsRUFBWU0sSUFBWixDQUFQO0FBQ0FELE1BQUFBLElBQUksR0FBR0ksSUFBSSxDQUFDQyxHQUFMLENBQVNGLENBQVQsRUFBWUgsSUFBWixDQUFQO0FBQ0FFLE1BQUFBLElBQUksR0FBR0UsSUFBSSxDQUFDRSxHQUFMLENBQVNILENBQVQsRUFBWUQsSUFBWixDQUFQO0FBQ0Q7QUFDRixHQXRCcUQsQ0F3QnREOzs7QUFDQSxTQUFPLENBQUNKLElBQUQsRUFBT0UsSUFBUCxFQUFhQyxJQUFiLEVBQW1CQyxJQUFuQixFQUF5QkssS0FBekIsQ0FBK0J4QixNQUFNLENBQUNDLFFBQXRDLElBQ0gsQ0FBQyxDQUFDYyxJQUFJLEdBQUdHLElBQVIsSUFBZ0IsQ0FBakIsRUFBb0IsQ0FBQ0QsSUFBSSxHQUFHRSxJQUFSLElBQWdCLENBQXBDLENBREcsR0FFSCxJQUZKO0FBR0Q7O0FBRU0sU0FBU00saUJBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DNUMsUUFBbkMsRUFBNkM2QyxNQUE3QyxFQUFxRDtBQUFBLDhCQUNsQzdDLFFBQVEsQ0FBQzhDLGlCQUFULENBQTJCRCxNQUEzQixDQURrQztBQUFBLE1BQ25ERSxhQURtRCx5QkFDbkRBLGFBRG1ELEVBRTFEOzs7QUFDQSxTQUFPSCxNQUFNLEdBQUdHLGFBQWEsQ0FBQyxDQUFELENBQTdCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NyZWF0ZUl0ZXJhYmxlLCBsb2d9IGZyb20gJ0BkZWNrLmdsL2NvcmUnO1xuaW1wb3J0IHtnZW9tX3RvX21lc2hjb2RlLCBnZXRDZW50cm9pZH0gZnJvbSAnLi4vLi4vdXRpbHMvamlzbWVzaC11dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludFRvTWVzaFBvbHlnb25HZW8oKXtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRUb0pJU01lc2gocHJvcHMsYWdncmVnYXRpb25QYXJhbXMpe1xuICBjb25zdCB7XG4gICAgZGF0YSwgY2VsbFNpemVcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IG1lc2hMZXZlbCA9IGNlbGxTaXplXG4gIGNvbnNvbGUubG9nKCdwb2ludCB0byBqaXNtZXNoJylcblxuICBjb25zdCB7dmlld3BvcnQsIGF0dHJpYnV0ZXMscHJvamVjdFBvaW50c30gPSBhZ2dyZWdhdGlvblBhcmFtcztcbiAgY29uc3QgY2VudGVyTG5nTGF0ID0gZGF0YS5sZW5ndGggPyBnZXRQb2ludHNDZW50ZXIoZGF0YSxhZ2dyZWdhdGlvblBhcmFtcyk6bnVsbDtcbiAgLy8gY29uc3QgcmFkaXVzQ29tbW9uID0gZ2V0UmFkaXVzSW5Db21tb24obGV2ZWwsIHZpZXdwb3J0LCBjZW50ZXJMbmdMYXQpO1xuICBjb25zdCBtZXNoSGFzaCA9IHt9O1xuXG4gIGNvbnN0IHtpdGVyYWJsZSwgb2JqZWN0SW5mb30gPSBjcmVhdGVJdGVyYWJsZShkYXRhKTtcbiAgY29uc3QgcG9zaXRpb25zID0gYXR0cmlidXRlcy5wb3NpdGlvbnMudmFsdWU7XG5cbiAgLy9maXJzdCB0byBjaGVjayB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHBvc2l0aW9uc1xuICBjb25zdCB7c2l6ZX0gPSBhdHRyaWJ1dGVzLnBvc2l0aW9ucy5nZXRBY2Nlc3NvcigpO1xuXG4gIC8vcHV0IHZpc2libGUgb2JqZWN0cyBpbnRvIHNjcmVlbnBvaW50cywgY2hlY2sgaWYgcG9pbnRzIGluIHRoZSBzY3JlZW47XG4gIGZvciAoY29uc3Qgb2JqZWN0IG9mIGl0ZXJhYmxlKSB7XG4gICAgb2JqZWN0SW5mby5pbmRleCsrO1xuICAgIGNvbnN0IHBvc0luZGV4ID0gb2JqZWN0SW5mby5pbmRleCAqIHNpemU7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbcG9zaXRpb25zW3Bvc0luZGV4XSwgcG9zaXRpb25zW3Bvc0luZGV4ICsgMV1dO1xuICAgIGNvbnN0IGFycmF5SXNGaW5pdGUgPSBOdW1iZXIuaXNGaW5pdGUocG9zaXRpb25bMF0pICYmIE51bWJlci5pc0Zpbml0ZShwb3NpdGlvblsxXSk7XG5cbiAgICBpZiAoYXJyYXlJc0Zpbml0ZSkge1xuXG4gICAgICBjb25zdCBtZXNoY29kZSA9IGdlb21fdG9fbWVzaGNvZGUobWVzaExldmVsLHBvc2l0aW9uWzFdLHBvc2l0aW9uWzBdKVxuXG4gICAgICBtZXNoSGFzaFttZXNoY29kZV0gPSBtZXNoSGFzaFttZXNoY29kZV0gfHwge2NvdW50OjAscG9pbnRzOltdfTtcbiAgICAgIG1lc2hIYXNoW21lc2hjb2RlXS5jb3VudCArPSAxXG4gICAgICBtZXNoSGFzaFttZXNoY29kZV0ucG9pbnRzLnB1c2gob2JqZWN0KVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybignSklTTWVzaExheWVyOiBpbnZhbGlkIHBvc2l0aW9uJykoKTtcbiAgICB9XG4gIH1cbiAgLy9oZXJlIHNjcmVlbiBwb2ludCB3aWxsIHNhdmUgdGhlIGRhdGE7XG5cbiAgY29uc3QgcmVzdWx0ID0gZ2V0TWVzaExheWVyRGF0YUZyb21NZXNoSGFzaChtZXNoSGFzaClcblxuICByZXR1cm4ge1xuICAgIGRhdGE6cmVzdWx0XG4gIH1cbn1cblxuLy9oZXJlIG5lZWQgdG8gY2hlY2sgdGhlIGNvb3JkaW5hdGUgc3lzdGVtXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWVzaExheWVyRGF0YUZyb21NZXNoSGFzaChtZXNoSGFzaCl7XG4gIC8vIGNvbnN0IGRhdGEgPSBuZXcgQXJyYXkoT2JqZWN0LmtleXMoaGFzaEluZm8ubWVzaEhhc2gpLmxlbmd0aClcbiAgY29uc29sZS5sb2coJ2dldCBtZXNobGF5ZXIgZnVuYyBzdGFydCcpXG4gIGNvbnN0IGRhdGEgPSBPYmplY3Qua2V5cyhtZXNoSGFzaCkubWFwKCh4LGkpPT5cbiAgICB7XG4gICAgY29uc29sZS5sb2coJ2dldCBtZXNobGF5ZXIgZGF0YSBmcm9tIG1lc2ggaGFzaCcpXG4gICAgcmV0dXJuIHsuLi57aW5kZXg6aSxcbiAgICAgICAgbWVzaGNvZGU6eCxcbiAgICAgIHBvc2l0aW9uOltnZXRDZW50cm9pZCh7aWQ6eH0pXX0sLi4ubWVzaEhhc2hbeF19XG4gIH0pXG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRzQ2VudGVyKGRhdGEsIGFnZ3JlZ2F0aW9uUGFyYW1zKXtcbiAgY29uc3Qge2F0dHJpYnV0ZXN9ID0gYWdncmVnYXRpb25QYXJhbXM7XG4gIGNvbnN0IHBvc2l0aW9ucyA9IGF0dHJpYnV0ZXMucG9zaXRpb25zLnZhbHVlO1xuICBjb25zdCB7c2l6ZX0gPSBhdHRyaWJ1dGVzLnBvc2l0aW9ucy5nZXRBY2Nlc3NvcigpO1xuXG4gIGxldCBtaW5YID0gSW5maW5pdHk7XG4gIGxldCBtaW5ZID0gSW5maW5pdHk7XG4gIGxldCBtYXhYID0gLUluZmluaXR5O1xuICBsZXQgbWF4WSA9IC1JbmZpbml0eTtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNpemUgKiBkYXRhLmxlbmd0aDsgaSArPSBzaXplKSB7XG4gICAgY29uc3QgeCA9IHBvc2l0aW9uc1tpXTtcbiAgICBjb25zdCB5ID0gcG9zaXRpb25zW2kgKyAxXTtcbiAgICBjb25zdCBhcnJheUlzRmluaXRlID0gTnVtYmVyLmlzRmluaXRlKHgpICYmIE51bWJlci5pc0Zpbml0ZSh5KTtcblxuICAgIGlmIChhcnJheUlzRmluaXRlKSB7XG4gICAgICBtaW5YID0gTWF0aC5taW4oeCwgbWluWCk7XG4gICAgICBtYXhYID0gTWF0aC5tYXgoeCwgbWF4WCk7XG4gICAgICBtaW5ZID0gTWF0aC5taW4oeSwgbWluWSk7XG4gICAgICBtYXhZID0gTWF0aC5tYXgoeSwgbWF4WSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmV0dXJuIGNlbnRlclxuICByZXR1cm4gW21pblgsIG1pblksIG1heFgsIG1heFldLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSlcbiAgICA/IFsobWluWCArIG1heFgpIC8gMiwgKG1pblkgKyBtYXhZKSAvIDJdXG4gICAgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFkaXVzSW5Db21tb24ocmFkaXVzLCB2aWV3cG9ydCwgY2VudGVyKSB7XG4gIGNvbnN0IHt1bml0c1Blck1ldGVyfSA9IHZpZXdwb3J0LmdldERpc3RhbmNlU2NhbGVzKGNlbnRlcik7XG4gIC8vIHgsIHkgZGlzdGFuY2Ugc2hvdWxkIGJlIHRoZSBzYW1lXG4gIHJldHVybiByYWRpdXMgKiB1bml0c1Blck1ldGVyWzBdO1xufVxuXG5cblxuIl19