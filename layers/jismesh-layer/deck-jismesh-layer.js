"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeLongitudes = normalizeLongitudes;
exports.scalePolygon = scalePolygon;
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _core = require("@deck.gl/core");

var _layers = require("@deck.gl/layers");

var _jismeshUtils = require("../../utils/jismesh-utils");

var _math = require("math.gl");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var UPDATE_THRESHOLD_KM = 10;

function normalizeLongitudes(vertices, refLng) {
  refLng = refLng === undefined ? vertices[0][0] : refLng;

  var _iterator = _createForOfIteratorHelper(vertices),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pt = _step.value;
      var deltaLng = pt[0] - refLng;

      if (deltaLng > 180) {
        pt[0] -= 360;
      } else if (deltaLng < -180) {
        pt[0] += 360;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} //how to use this function?


function scalePolygon(meshCode, vertices, factor) {
  var _getCentroid = (0, _jismeshUtils.getCentroid)(meshCode),
      _getCentroid2 = (0, _slicedToArray2["default"])(_getCentroid, 2),
      lat = _getCentroid2[0],
      lng = _getCentroid2[1];

  var actualCount = vertices.length;
  normalizeLongitudes(vertices, lng);
  var vertexCount = vertices[0] === vertices[actualCount - 1] ? actualCount - 1 : actualCount;

  for (var i = 0; i < vertexCount; i++) {
    vertices[i][0] = (0, _math.lerp)(lng, vertices[i][0], factor);
    vertices[i][1] = (0, _math.lerp)(lat, vertices[i][1], factor);
  }
}

function getMeshCodeCentroid(getMeshCode, object, objectInfo) {
  console.log('get meshcode');
  var meshCode = getMeshCode(object, objectInfo); // const [lat, lng] = getCentroid(meshCode);

  return (0, _jismeshUtils.getCentroid)({
    id: meshCode
  });
} // guess: columnlayer is lighter than polygon when rendering
//core function here to convert h3 to polygon


function meshToPolygon(hexId) {
  var coverage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var flatten = arguments.length > 2 ? arguments[2] : undefined;
  var vertices = (0, _jismeshUtils.meshToGeoBoundary)(hexId, true);

  if (coverage !== 1) {
    scalePolygon(hexId, vertices, coverage);
  } else {
    normalizeLongitudes(vertices);
  }

  if (flatten) {
    var positions = new Float64Array(vertices.length * 2);
    var i = 0;

    var _iterator2 = _createForOfIteratorHelper(vertices),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var pt = _step2.value;
        positions[i++] = pt[0];
        positions[i++] = pt[1];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return positions;
  }

  return vertices;
} //how it works?


function mergeTriggers(getMeshCode, coverage) {
  var trigger;

  if (getMeshCode === undefined || getMeshCode === null) {
    trigger = coverage;
  } else if ((0, _typeof2["default"])(getMeshCode) === 'object') {
    trigger = Object.assign({}, getMeshCode, {
      coverage: coverage
    });
  } else {
    trigger = {
      getMeshCode: getMeshCode,
      coverage: coverage
    };
  }

  return trigger;
}

var defaultProps = Object.assign({}, _layers.PolygonLayer.defaultProps, {
  highPrecision: false,
  coverage: {
    type: 'number',
    min: 0,
    max: 1,
    value: 1
  },
  centerMeshCode: null,
  //how to use get polygon
  getMeshCode: {
    type: 'accessor',
    value: function value(x) {
      return x.meshcode;
    }
  },
  extruded: true
});
delete defaultProps.getLineDashArray;

var DeckJismeshLayer = /*#__PURE__*/function (_CompositeLayer) {
  (0, _inherits2["default"])(DeckJismeshLayer, _CompositeLayer);

  var _super = _createSuper(DeckJismeshLayer);

  function DeckJismeshLayer() {
    (0, _classCallCheck2["default"])(this, DeckJismeshLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DeckJismeshLayer, [{
    key: "shouldUpdateState",
    value: function shouldUpdateState(_ref) {
      var changeFlags = _ref.changeFlags;
      return this._shouldUseHighPrecision() ? changeFlags.propsOrDataChanged : changeFlags.somethingChanged;
    }
  }, {
    key: "updateState",
    value: function updateState(_ref2) {
      var props = _ref2.props,
          oldProps = _ref2.oldProps,
          changeFlags = _ref2.changeFlags;
      console.log('update state');

      if (changeFlags.dataChanged || changeFlags.updateTriggers && changeFlags.updateTriggers.getMeshCode) {
        var resolution = -1;
        var hasPentagon = false;
        var hasMultipleRes = false;

        var _createIterable = (0, _core.createIterable)(props.data),
            iterable = _createIterable.iterable,
            objectInfo = _createIterable.objectInfo;

        var _iterator3 = _createForOfIteratorHelper(iterable),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var object = _step3.value;
            objectInfo.index++;
            var meshCode = props.getMeshCode(object, objectInfo);
            var hexResolution = (0, _jismeshUtils.getResolution)(meshCode);
            if (resolution < 0) resolution = hexResolution;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        this.setState({
          resolution: resolution //todo: change edge length setting here;
          // edgeLengthKM: resolution >= 0 ? edgeLength(resolution, 'km') : 0,

        });
      }

      this._updateVertices(this.context.viewport);
    } //why larger area requires rendering in polygon?

  }, {
    key: "_shouldUseHighPrecision",
    value: function _shouldUseHighPrecision() {
      var resolution = this.state.resolution;
      var viewport = this.context.viewport;
      return this.props.highPrecision || viewport.resolution || resolution >= 0 && resolution <= 2;
    } //if the resolution is high, then the total number is small, so it can support higher visualization;

  }, {
    key: "_updateVertices",
    value: function _updateVertices(viewport) {
      // console.log('update vertices')
      //if using geojson layer, then there is no necessary to use
      if (this._shouldUseHighPrecision()) {
        return;
      } //here is to compute the distance based on h3;
      //necessary to use projectFlat to project the center coordinates to xy;


      var _this$state = this.state,
          resolution = _this$state.resolution,
          centerMesh = _this$state.centerMesh;

      if (resolution < 0) {
        return;
      }

      var meshcode = this.props.centerMeshCode || (0, _jismeshUtils.geom_to_meshcode)(resolution, viewport.latitude, viewport.longitude);

      if (centerMesh === meshcode) {
        return;
      } //here the original way to set mesh vertices is not so good, need to be changed;


      if (centerMesh) {//if distance is within a threshold, not change the center meshcode;
      } //here also in common scale, no necessary?


      var unitsPerMeter = viewport.distanceScales.unitsPerMeter;
      var vertices = (0, _jismeshUtils.meshToGeoBoundary)(meshcode).slice(0, 4);

      var _getCentroid3 = (0, _jismeshUtils.getCentroid)({
        id: meshcode
      }),
          _getCentroid4 = (0, _slicedToArray2["default"])(_getCentroid3, 2),
          centerLng = _getCentroid4[0],
          centerLat = _getCentroid4[1]; //here centerX and centerY is in common scale;


      var _viewport$projectFlat = viewport.projectFlat([centerLng, centerLat]),
          _viewport$projectFlat2 = (0, _slicedToArray2["default"])(_viewport$projectFlat, 2),
          centerX = _viewport$projectFlat2[0],
          centerY = _viewport$projectFlat2[1];

      vertices = vertices.map(function (p) {
        var worldPosition = viewport.projectFlat(p);
        return [(worldPosition[0] - centerX) / unitsPerMeter[0], (worldPosition[1] - centerY) / unitsPerMeter[1]]; // return [(worldPosition[0] - centerX), (worldPosition[1] - centerY)];
      });
      this.setState({
        centerMesh: meshcode,
        vertices: vertices
      });
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      console.log('render layers');
      return this._shouldUseHighPrecision() ? this._renderPolygonLayer() : this._renderColumnLayer();
    }
  }, {
    key: "_getForwardProps",
    value: function _getForwardProps() {
      var _this$props = this.props,
          elevationScale = _this$props.elevationScale,
          material = _this$props.material,
          coverage = _this$props.coverage,
          extruded = _this$props.extruded,
          wireframe = _this$props.wireframe,
          stroked = _this$props.stroked,
          filled = _this$props.filled,
          lineWidthUnits = _this$props.lineWidthUnits,
          lineWidthScale = _this$props.lineWidthScale,
          lineWidthMinPixels = _this$props.lineWidthMinPixels,
          lineWidthMaxPixels = _this$props.lineWidthMaxPixels,
          getFillColor = _this$props.getFillColor,
          getElevation = _this$props.getElevation,
          getLineColor = _this$props.getLineColor,
          getLineWidth = _this$props.getLineWidth,
          updateTriggers = _this$props.updateTriggers;
      return {
        elevationScale: elevationScale,
        extruded: extruded,
        coverage: coverage,
        wireframe: wireframe,
        stroked: stroked,
        filled: filled,
        lineWidthUnits: lineWidthUnits,
        lineWidthScale: lineWidthScale,
        lineWidthMinPixels: lineWidthMinPixels,
        lineWidthMaxPixels: lineWidthMaxPixels,
        material: material,
        getElevation: getElevation,
        getFillColor: getFillColor,
        getLineColor: getLineColor,
        getLineWidth: getLineWidth,
        updateTriggers: {
          getFillColor: updateTriggers.getFillColor,
          getElevation: updateTriggers.getElevation,
          getLineColor: updateTriggers.getLineColor,
          getLineWidth: updateTriggers.getLineWidth
        }
      };
    }
  }, {
    key: "_renderPolygonLayer",
    value: function _renderPolygonLayer() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          getMeshCode = _this$props2.getMeshCode,
          updateTriggers = _this$props2.updateTriggers,
          coverage = _this$props2.coverage;
      var SubLayerClass = this.getSubLayerClass('hexagon-cell-hifi', _layers.PolygonLayer);

      var forwardProps = this._getForwardProps();

      forwardProps.updateTriggers.getPolygon = mergeTriggers(updateTriggers.getMeshCode, coverage);
      return new SubLayerClass(forwardProps, this.getSubLayerProps({
        id: 'hexagon-cell-hifi',
        updateTriggers: forwardProps.updateTriggers
      }), {
        data: data,
        _normalize: false,
        positionFormat: 'XY',
        getPolygon: function getPolygon(object, objectInfo) {
          var meshCode = getMeshCode(object, objectInfo);
          return meshToPolygon(meshCode, coverage, true);
        }
      });
    }
  }, {
    key: "_renderColumnLayer",
    value: function _renderColumnLayer() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          updateTriggers = _this$props3.updateTriggers; //guess that get sublayer id is only utilized for naming the layer

      var SubLayerClass = this.getSubLayerClass('meshcode-cell', _layers.ColumnLayer);

      var forwardProps = this._getForwardProps();

      forwardProps.updateTriggers.getPosition = updateTriggers.getMeshCode;
      console.log('render column layer for jis ID'); //seems that, standard hexagon utilize vertices to control the size, instead of radius

      return new SubLayerClass(forwardProps, this.getSubLayerProps({
        id: 'meshcode-cell',
        updateTriggers: forwardProps.updateTriggers
      }), {
        data: data,
        diskResolution: 4,
        radius: 1,
        radiusUnits: 'common',
        vertices: this.state.vertices,
        // getPosition: getMeshCodeCentroid.bind(null, getMeshCode)
        getPosition: function getPosition(x) {
          return x.centroid;
        }
      });
    }
  }]);
  return DeckJismeshLayer;
}(_core.CompositeLayer);

exports["default"] = DeckJismeshLayer;
DeckJismeshLayer.defaultProps = defaultProps;
DeckJismeshLayer.layerName = 'DeckJISMeshLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvamlzbWVzaC1sYXllci9kZWNrLWppc21lc2gtbGF5ZXIuanMiXSwibmFtZXMiOlsiVVBEQVRFX1RIUkVTSE9MRF9LTSIsIm5vcm1hbGl6ZUxvbmdpdHVkZXMiLCJ2ZXJ0aWNlcyIsInJlZkxuZyIsInVuZGVmaW5lZCIsInB0IiwiZGVsdGFMbmciLCJzY2FsZVBvbHlnb24iLCJtZXNoQ29kZSIsImZhY3RvciIsImxhdCIsImxuZyIsImFjdHVhbENvdW50IiwibGVuZ3RoIiwidmVydGV4Q291bnQiLCJpIiwiZ2V0TWVzaENvZGVDZW50cm9pZCIsImdldE1lc2hDb2RlIiwib2JqZWN0Iiwib2JqZWN0SW5mbyIsImNvbnNvbGUiLCJsb2ciLCJpZCIsIm1lc2hUb1BvbHlnb24iLCJoZXhJZCIsImNvdmVyYWdlIiwiZmxhdHRlbiIsInBvc2l0aW9ucyIsIkZsb2F0NjRBcnJheSIsIm1lcmdlVHJpZ2dlcnMiLCJ0cmlnZ2VyIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BzIiwiUG9seWdvbkxheWVyIiwiaGlnaFByZWNpc2lvbiIsInR5cGUiLCJtaW4iLCJtYXgiLCJ2YWx1ZSIsImNlbnRlck1lc2hDb2RlIiwieCIsIm1lc2hjb2RlIiwiZXh0cnVkZWQiLCJnZXRMaW5lRGFzaEFycmF5IiwiRGVja0ppc21lc2hMYXllciIsImNoYW5nZUZsYWdzIiwiX3Nob3VsZFVzZUhpZ2hQcmVjaXNpb24iLCJwcm9wc09yRGF0YUNoYW5nZWQiLCJzb21ldGhpbmdDaGFuZ2VkIiwicHJvcHMiLCJvbGRQcm9wcyIsImRhdGFDaGFuZ2VkIiwidXBkYXRlVHJpZ2dlcnMiLCJyZXNvbHV0aW9uIiwiaGFzUGVudGFnb24iLCJoYXNNdWx0aXBsZVJlcyIsImRhdGEiLCJpdGVyYWJsZSIsImluZGV4IiwiaGV4UmVzb2x1dGlvbiIsInNldFN0YXRlIiwiX3VwZGF0ZVZlcnRpY2VzIiwiY29udGV4dCIsInZpZXdwb3J0Iiwic3RhdGUiLCJjZW50ZXJNZXNoIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ1bml0c1Blck1ldGVyIiwiZGlzdGFuY2VTY2FsZXMiLCJzbGljZSIsImNlbnRlckxuZyIsImNlbnRlckxhdCIsInByb2plY3RGbGF0IiwiY2VudGVyWCIsImNlbnRlclkiLCJtYXAiLCJwIiwid29ybGRQb3NpdGlvbiIsIl9yZW5kZXJQb2x5Z29uTGF5ZXIiLCJfcmVuZGVyQ29sdW1uTGF5ZXIiLCJlbGV2YXRpb25TY2FsZSIsIm1hdGVyaWFsIiwid2lyZWZyYW1lIiwic3Ryb2tlZCIsImZpbGxlZCIsImxpbmVXaWR0aFVuaXRzIiwibGluZVdpZHRoU2NhbGUiLCJsaW5lV2lkdGhNaW5QaXhlbHMiLCJsaW5lV2lkdGhNYXhQaXhlbHMiLCJnZXRGaWxsQ29sb3IiLCJnZXRFbGV2YXRpb24iLCJnZXRMaW5lQ29sb3IiLCJnZXRMaW5lV2lkdGgiLCJTdWJMYXllckNsYXNzIiwiZ2V0U3ViTGF5ZXJDbGFzcyIsImZvcndhcmRQcm9wcyIsIl9nZXRGb3J3YXJkUHJvcHMiLCJnZXRQb2x5Z29uIiwiZ2V0U3ViTGF5ZXJQcm9wcyIsIl9ub3JtYWxpemUiLCJwb3NpdGlvbkZvcm1hdCIsIkNvbHVtbkxheWVyIiwiZ2V0UG9zaXRpb24iLCJkaXNrUmVzb2x1dGlvbiIsInJhZGl1cyIsInJhZGl1c1VuaXRzIiwiY2VudHJvaWQiLCJDb21wb3NpdGVMYXllciIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CLEdBQUcsRUFBNUI7O0FBRU8sU0FBU0MsbUJBQVQsQ0FBNkJDLFFBQTdCLEVBQXVDQyxNQUF2QyxFQUErQztBQUNwREEsRUFBQUEsTUFBTSxHQUFHQSxNQUFNLEtBQUtDLFNBQVgsR0FBdUJGLFFBQVEsQ0FBQyxDQUFELENBQVIsQ0FBWSxDQUFaLENBQXZCLEdBQXdDQyxNQUFqRDs7QUFEb0QsNkNBR25DRCxRQUhtQztBQUFBOztBQUFBO0FBR3BELHdEQUEyQjtBQUFBLFVBQWhCRyxFQUFnQjtBQUN6QixVQUFNQyxRQUFRLEdBQUdELEVBQUUsQ0FBQyxDQUFELENBQUYsR0FBUUYsTUFBekI7O0FBRUEsVUFBSUcsUUFBUSxHQUFHLEdBQWYsRUFBb0I7QUFDbEJELFFBQUFBLEVBQUUsQ0FBQyxDQUFELENBQUYsSUFBUyxHQUFUO0FBQ0QsT0FGRCxNQUVPLElBQUlDLFFBQVEsR0FBRyxDQUFDLEdBQWhCLEVBQXFCO0FBQzFCRCxRQUFBQSxFQUFFLENBQUMsQ0FBRCxDQUFGLElBQVMsR0FBVDtBQUNEO0FBQ0Y7QUFYbUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlyRCxDLENBRUQ7OztBQUNPLFNBQVNFLFlBQVQsQ0FBc0JDLFFBQXRCLEVBQWdDTixRQUFoQyxFQUEwQ08sTUFBMUMsRUFBa0Q7QUFBQSxxQkFDcEMsK0JBQVlELFFBQVosQ0FEb0M7QUFBQTtBQUFBLE1BQ2hERSxHQURnRDtBQUFBLE1BQzNDQyxHQUQyQzs7QUFFdkQsTUFBTUMsV0FBVyxHQUFHVixRQUFRLENBQUNXLE1BQTdCO0FBQ0FaLEVBQUFBLG1CQUFtQixDQUFDQyxRQUFELEVBQVdTLEdBQVgsQ0FBbkI7QUFDQSxNQUFNRyxXQUFXLEdBQUdaLFFBQVEsQ0FBQyxDQUFELENBQVIsS0FBZ0JBLFFBQVEsQ0FBQ1UsV0FBVyxHQUFHLENBQWYsQ0FBeEIsR0FBNENBLFdBQVcsR0FBRyxDQUExRCxHQUE4REEsV0FBbEY7O0FBRUEsT0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxXQUFwQixFQUFpQ0MsQ0FBQyxFQUFsQyxFQUFzQztBQUNwQ2IsSUFBQUEsUUFBUSxDQUFDYSxDQUFELENBQVIsQ0FBWSxDQUFaLElBQWlCLGdCQUFLSixHQUFMLEVBQVVULFFBQVEsQ0FBQ2EsQ0FBRCxDQUFSLENBQVksQ0FBWixDQUFWLEVBQTBCTixNQUExQixDQUFqQjtBQUNBUCxJQUFBQSxRQUFRLENBQUNhLENBQUQsQ0FBUixDQUFZLENBQVosSUFBaUIsZ0JBQUtMLEdBQUwsRUFBVVIsUUFBUSxDQUFDYSxDQUFELENBQVIsQ0FBWSxDQUFaLENBQVYsRUFBMEJOLE1BQTFCLENBQWpCO0FBQ0Q7QUFDRjs7QUFHRCxTQUFTTyxtQkFBVCxDQUE2QkMsV0FBN0IsRUFBMENDLE1BQTFDLEVBQWtEQyxVQUFsRCxFQUE4RDtBQUM1REMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBLE1BQU1iLFFBQVEsR0FBR1MsV0FBVyxDQUFDQyxNQUFELEVBQVNDLFVBQVQsQ0FBNUIsQ0FGNEQsQ0FHNUQ7O0FBQ0EsU0FBTywrQkFBWTtBQUFDRyxJQUFBQSxFQUFFLEVBQUNkO0FBQUosR0FBWixDQUFQO0FBQ0QsQyxDQUVEO0FBQ0E7OztBQUNBLFNBQVNlLGFBQVQsQ0FBdUJDLEtBQXZCLEVBQXFEO0FBQUEsTUFBdkJDLFFBQXVCLHVFQUFaLENBQVk7QUFBQSxNQUFUQyxPQUFTO0FBQ25ELE1BQU14QixRQUFRLEdBQUcscUNBQWtCc0IsS0FBbEIsRUFBeUIsSUFBekIsQ0FBakI7O0FBR0EsTUFBSUMsUUFBUSxLQUFLLENBQWpCLEVBQW9CO0FBQ2xCbEIsSUFBQUEsWUFBWSxDQUFDaUIsS0FBRCxFQUFRdEIsUUFBUixFQUFrQnVCLFFBQWxCLENBQVo7QUFDRCxHQUZELE1BRU87QUFDTHhCLElBQUFBLG1CQUFtQixDQUFDQyxRQUFELENBQW5CO0FBQ0Q7O0FBRUQsTUFBSXdCLE9BQUosRUFBYTtBQUNYLFFBQU1DLFNBQVMsR0FBRyxJQUFJQyxZQUFKLENBQWlCMUIsUUFBUSxDQUFDVyxNQUFULEdBQWtCLENBQW5DLENBQWxCO0FBQ0EsUUFBSUUsQ0FBQyxHQUFHLENBQVI7O0FBRlcsZ0RBSU1iLFFBSk47QUFBQTs7QUFBQTtBQUlYLDZEQUEyQjtBQUFBLFlBQWhCRyxFQUFnQjtBQUN6QnNCLFFBQUFBLFNBQVMsQ0FBQ1osQ0FBQyxFQUFGLENBQVQsR0FBaUJWLEVBQUUsQ0FBQyxDQUFELENBQW5CO0FBQ0FzQixRQUFBQSxTQUFTLENBQUNaLENBQUMsRUFBRixDQUFULEdBQWlCVixFQUFFLENBQUMsQ0FBRCxDQUFuQjtBQUNEO0FBUFU7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTWCxXQUFPc0IsU0FBUDtBQUNEOztBQUVELFNBQU96QixRQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxTQUFTMkIsYUFBVCxDQUF1QlosV0FBdkIsRUFBb0NRLFFBQXBDLEVBQThDO0FBQzVDLE1BQUlLLE9BQUo7O0FBRUEsTUFBSWIsV0FBVyxLQUFLYixTQUFoQixJQUE2QmEsV0FBVyxLQUFLLElBQWpELEVBQXVEO0FBQ3JEYSxJQUFBQSxPQUFPLEdBQUdMLFFBQVY7QUFDRCxHQUZELE1BRU8sSUFBSSx5QkFBT1IsV0FBUCxNQUF1QixRQUEzQixFQUFxQztBQUMxQ2EsSUFBQUEsT0FBTyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCZixXQUFsQixFQUErQjtBQUN2Q1EsTUFBQUEsUUFBUSxFQUFSQTtBQUR1QyxLQUEvQixDQUFWO0FBR0QsR0FKTSxNQUlBO0FBQ0xLLElBQUFBLE9BQU8sR0FBRztBQUNSYixNQUFBQSxXQUFXLEVBQVhBLFdBRFE7QUFFUlEsTUFBQUEsUUFBUSxFQUFSQTtBQUZRLEtBQVY7QUFJRDs7QUFFRCxTQUFPSyxPQUFQO0FBQ0Q7O0FBRUQsSUFBTUcsWUFBWSxHQUFJRixNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCRSxxQkFBYUQsWUFBL0IsRUFBNkM7QUFDakVFLEVBQUFBLGFBQWEsRUFBRSxLQURrRDtBQUVqRVYsRUFBQUEsUUFBUSxFQUFFO0FBQ1JXLElBQUFBLElBQUksRUFBRSxRQURFO0FBRVJDLElBQUFBLEdBQUcsRUFBRSxDQUZHO0FBR1JDLElBQUFBLEdBQUcsRUFBRSxDQUhHO0FBSVJDLElBQUFBLEtBQUssRUFBRTtBQUpDLEdBRnVEO0FBUWpFQyxFQUFBQSxjQUFjLEVBQUUsSUFSaUQ7QUFVakU7QUFDQXZCLEVBQUFBLFdBQVcsRUFBRTtBQUNYbUIsSUFBQUEsSUFBSSxFQUFFLFVBREs7QUFFWEcsSUFBQUEsS0FBSyxFQUFFLGVBQUFFLENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUNDLFFBQU47QUFBQTtBQUZHLEdBWG9EO0FBZWpFQyxFQUFBQSxRQUFRLEVBQUU7QUFmdUQsQ0FBN0MsQ0FBdEI7QUFrQkEsT0FBT1YsWUFBWSxDQUFDVyxnQkFBcEI7O0lBQ3FCQyxnQjs7Ozs7Ozs7Ozs7O1dBQ25CLGlDQUVxQjtBQUFBLFVBRERDLFdBQ0MsUUFEREEsV0FDQztBQUNuQixhQUFPLEtBQUtDLHVCQUFMLEtBQWlDRCxXQUFXLENBQUNFLGtCQUE3QyxHQUFrRUYsV0FBVyxDQUFDRyxnQkFBckY7QUFDRDs7O1dBRUQsNEJBSWU7QUFBQSxVQUhEQyxLQUdDLFNBSERBLEtBR0M7QUFBQSxVQUZEQyxRQUVDLFNBRkRBLFFBRUM7QUFBQSxVQURETCxXQUNDLFNBRERBLFdBQ0M7QUFFYjFCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7O0FBQ0EsVUFBSXlCLFdBQVcsQ0FBQ00sV0FBWixJQUEyQk4sV0FBVyxDQUFDTyxjQUFaLElBQThCUCxXQUFXLENBQUNPLGNBQVosQ0FBMkJwQyxXQUF4RixFQUFxRztBQUNuRyxZQUFJcUMsVUFBVSxHQUFHLENBQUMsQ0FBbEI7QUFDQSxZQUFJQyxXQUFXLEdBQUcsS0FBbEI7QUFDQSxZQUFJQyxjQUFjLEdBQUcsS0FBckI7O0FBSG1HLDhCQU8vRiwwQkFBZU4sS0FBSyxDQUFDTyxJQUFyQixDQVArRjtBQUFBLFlBS2pHQyxRQUxpRyxtQkFLakdBLFFBTGlHO0FBQUEsWUFNakd2QyxVQU5pRyxtQkFNakdBLFVBTmlHOztBQUFBLG9EQVM5RXVDLFFBVDhFO0FBQUE7O0FBQUE7QUFTbkcsaUVBQStCO0FBQUEsZ0JBQXBCeEMsTUFBb0I7QUFDN0JDLFlBQUFBLFVBQVUsQ0FBQ3dDLEtBQVg7QUFDQSxnQkFBTW5ELFFBQVEsR0FBRzBDLEtBQUssQ0FBQ2pDLFdBQU4sQ0FBa0JDLE1BQWxCLEVBQTBCQyxVQUExQixDQUFqQjtBQUNBLGdCQUFNeUMsYUFBYSxHQUFHLGlDQUFjcEQsUUFBZCxDQUF0QjtBQUNBLGdCQUFJOEMsVUFBVSxHQUFHLENBQWpCLEVBQW9CQSxVQUFVLEdBQUdNLGFBQWI7QUFDckI7QUFka0c7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnQm5HLGFBQUtDLFFBQUwsQ0FBYztBQUNaUCxVQUFBQSxVQUFVLEVBQVZBLFVBRFksQ0FFWjtBQUNBOztBQUhZLFNBQWQ7QUFLRDs7QUFFRCxXQUFLUSxlQUFMLENBQXFCLEtBQUtDLE9BQUwsQ0FBYUMsUUFBbEM7QUFDRCxLLENBRUQ7Ozs7V0FDQSxtQ0FBeUI7QUFBQSxVQUNoQlYsVUFEZ0IsR0FDRixLQUFLVyxLQURILENBQ2hCWCxVQURnQjtBQUFBLFVBRWhCVSxRQUZnQixHQUVKLEtBQUtELE9BRkQsQ0FFaEJDLFFBRmdCO0FBR3ZCLGFBQU8sS0FBS2QsS0FBTCxDQUFXZixhQUFYLElBQTRCNkIsUUFBUSxDQUFDVixVQUFyQyxJQUFtREEsVUFBVSxJQUFJLENBQWQsSUFBbUJBLFVBQVUsSUFBSSxDQUEzRjtBQUNELEssQ0FFRDs7OztXQUVBLHlCQUFnQlUsUUFBaEIsRUFBeUI7QUFDdkI7QUFDQTtBQUNBLFVBQUksS0FBS2pCLHVCQUFMLEVBQUosRUFBb0M7QUFDbEM7QUFDRCxPQUxzQixDQU12QjtBQUVBOzs7QUFSdUIsd0JBYW5CLEtBQUtrQixLQWJjO0FBQUEsVUFXckJYLFVBWHFCLGVBV3JCQSxVQVhxQjtBQUFBLFVBWXJCWSxVQVpxQixlQVlyQkEsVUFacUI7O0FBZXZCLFVBQUlaLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNsQjtBQUNEOztBQUVELFVBQU1aLFFBQVEsR0FBRyxLQUFLUSxLQUFMLENBQVdWLGNBQVgsSUFBNkIsb0NBQWlCYyxVQUFqQixFQUE0QlUsUUFBUSxDQUFDRyxRQUFyQyxFQUE4Q0gsUUFBUSxDQUFDSSxTQUF2RCxDQUE5Qzs7QUFFQSxVQUFHRixVQUFVLEtBQUt4QixRQUFsQixFQUEyQjtBQUN6QjtBQUNELE9BdkJzQixDQXlCdkI7OztBQUNBLFVBQUd3QixVQUFILEVBQWMsQ0FFWjtBQUNELE9BN0JzQixDQThCdkI7OztBQTlCdUIsVUErQmhCRyxhQS9CZ0IsR0ErQkNMLFFBQVEsQ0FBQ00sY0EvQlYsQ0ErQmhCRCxhQS9CZ0I7QUFnQ3ZCLFVBQUluRSxRQUFRLEdBQUcscUNBQWtCd0MsUUFBbEIsRUFBNEI2QixLQUE1QixDQUFrQyxDQUFsQyxFQUFvQyxDQUFwQyxDQUFmOztBQWhDdUIsMEJBaUNRLCtCQUFZO0FBQUNqRCxRQUFBQSxFQUFFLEVBQUNvQjtBQUFKLE9BQVosQ0FqQ1I7QUFBQTtBQUFBLFVBaUNoQjhCLFNBakNnQjtBQUFBLFVBaUNMQyxTQWpDSyxxQkFtQ3ZCOzs7QUFuQ3VCLGtDQW9DSVQsUUFBUSxDQUFDVSxXQUFULENBQXFCLENBQUNGLFNBQUQsRUFBWUMsU0FBWixDQUFyQixDQXBDSjtBQUFBO0FBQUEsVUFvQ2hCRSxPQXBDZ0I7QUFBQSxVQW9DUEMsT0FwQ087O0FBc0N2QjFFLE1BQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDMkUsR0FBVCxDQUFhLFVBQUFDLENBQUMsRUFBSTtBQUMzQixZQUFNQyxhQUFhLEdBQUdmLFFBQVEsQ0FBQ1UsV0FBVCxDQUFxQkksQ0FBckIsQ0FBdEI7QUFDQSxlQUFPLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUQsQ0FBYixHQUFtQkosT0FBcEIsSUFBK0JOLGFBQWEsQ0FBQyxDQUFELENBQTdDLEVBQWtELENBQUNVLGFBQWEsQ0FBQyxDQUFELENBQWIsR0FBbUJILE9BQXBCLElBQStCUCxhQUFhLENBQUMsQ0FBRCxDQUE5RixDQUFQLENBRjJCLENBRzNCO0FBQ0QsT0FKVSxDQUFYO0FBU0EsV0FBS1IsUUFBTCxDQUFjO0FBQ1pLLFFBQUFBLFVBQVUsRUFBQ3hCLFFBREM7QUFFWnhDLFFBQUFBLFFBQVEsRUFBUkE7QUFGWSxPQUFkO0FBTUQ7OztXQUVELHdCQUFjO0FBQ1prQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsYUFBTyxLQUFLMEIsdUJBQUwsS0FBK0IsS0FBS2lDLG1CQUFMLEVBQS9CLEdBQTBELEtBQUtDLGtCQUFMLEVBQWpFO0FBQ0Q7OztXQUVELDRCQUFtQjtBQUFBLHdCQWtCYixLQUFLL0IsS0FsQlE7QUFBQSxVQUVmZ0MsY0FGZSxlQUVmQSxjQUZlO0FBQUEsVUFHZkMsUUFIZSxlQUdmQSxRQUhlO0FBQUEsVUFJZjFELFFBSmUsZUFJZkEsUUFKZTtBQUFBLFVBS2ZrQixRQUxlLGVBS2ZBLFFBTGU7QUFBQSxVQU1meUMsU0FOZSxlQU1mQSxTQU5lO0FBQUEsVUFPZkMsT0FQZSxlQU9mQSxPQVBlO0FBQUEsVUFRZkMsTUFSZSxlQVFmQSxNQVJlO0FBQUEsVUFTZkMsY0FUZSxlQVNmQSxjQVRlO0FBQUEsVUFVZkMsY0FWZSxlQVVmQSxjQVZlO0FBQUEsVUFXZkMsa0JBWGUsZUFXZkEsa0JBWGU7QUFBQSxVQVlmQyxrQkFaZSxlQVlmQSxrQkFaZTtBQUFBLFVBYWZDLFlBYmUsZUFhZkEsWUFiZTtBQUFBLFVBY2ZDLFlBZGUsZUFjZkEsWUFkZTtBQUFBLFVBZWZDLFlBZmUsZUFlZkEsWUFmZTtBQUFBLFVBZ0JmQyxZQWhCZSxlQWdCZkEsWUFoQmU7QUFBQSxVQWlCZnpDLGNBakJlLGVBaUJmQSxjQWpCZTtBQW1CakIsYUFBTztBQUNMNkIsUUFBQUEsY0FBYyxFQUFkQSxjQURLO0FBRUx2QyxRQUFBQSxRQUFRLEVBQVJBLFFBRks7QUFHTGxCLFFBQUFBLFFBQVEsRUFBUkEsUUFISztBQUlMMkQsUUFBQUEsU0FBUyxFQUFUQSxTQUpLO0FBS0xDLFFBQUFBLE9BQU8sRUFBUEEsT0FMSztBQU1MQyxRQUFBQSxNQUFNLEVBQU5BLE1BTks7QUFPTEMsUUFBQUEsY0FBYyxFQUFkQSxjQVBLO0FBUUxDLFFBQUFBLGNBQWMsRUFBZEEsY0FSSztBQVNMQyxRQUFBQSxrQkFBa0IsRUFBbEJBLGtCQVRLO0FBVUxDLFFBQUFBLGtCQUFrQixFQUFsQkEsa0JBVks7QUFXTFAsUUFBQUEsUUFBUSxFQUFSQSxRQVhLO0FBWUxTLFFBQUFBLFlBQVksRUFBWkEsWUFaSztBQWFMRCxRQUFBQSxZQUFZLEVBQVpBLFlBYks7QUFjTEUsUUFBQUEsWUFBWSxFQUFaQSxZQWRLO0FBZUxDLFFBQUFBLFlBQVksRUFBWkEsWUFmSztBQWdCTHpDLFFBQUFBLGNBQWMsRUFBRTtBQUNkc0MsVUFBQUEsWUFBWSxFQUFFdEMsY0FBYyxDQUFDc0MsWUFEZjtBQUVkQyxVQUFBQSxZQUFZLEVBQUV2QyxjQUFjLENBQUN1QyxZQUZmO0FBR2RDLFVBQUFBLFlBQVksRUFBRXhDLGNBQWMsQ0FBQ3dDLFlBSGY7QUFJZEMsVUFBQUEsWUFBWSxFQUFFekMsY0FBYyxDQUFDeUM7QUFKZjtBQWhCWCxPQUFQO0FBdUJEOzs7V0FFRCwrQkFBcUI7QUFBQSx5QkFPZixLQUFLNUMsS0FQVTtBQUFBLFVBR2pCTyxJQUhpQixnQkFHakJBLElBSGlCO0FBQUEsVUFJakJ4QyxXQUppQixnQkFJakJBLFdBSmlCO0FBQUEsVUFLakJvQyxjQUxpQixnQkFLakJBLGNBTGlCO0FBQUEsVUFNakI1QixRQU5pQixnQkFNakJBLFFBTmlCO0FBU25CLFVBQU1zRSxhQUFhLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0IsbUJBQXRCLEVBQTJDOUQsb0JBQTNDLENBQXRCOztBQUNBLFVBQU0rRCxZQUFZLEdBQUcsS0FBS0MsZ0JBQUwsRUFBckI7O0FBRUFELE1BQUFBLFlBQVksQ0FBQzVDLGNBQWIsQ0FBNEI4QyxVQUE1QixHQUF5Q3RFLGFBQWEsQ0FBQ3dCLGNBQWMsQ0FBQ3BDLFdBQWhCLEVBQTZCUSxRQUE3QixDQUF0RDtBQUVBLGFBQU8sSUFBSXNFLGFBQUosQ0FBa0JFLFlBQWxCLEVBQWdDLEtBQUtHLGdCQUFMLENBQXNCO0FBQzNEOUUsUUFBQUEsRUFBRSxFQUFFLG1CQUR1RDtBQUUzRCtCLFFBQUFBLGNBQWMsRUFBRTRDLFlBQVksQ0FBQzVDO0FBRjhCLE9BQXRCLENBQWhDLEVBR0g7QUFDRkksUUFBQUEsSUFBSSxFQUFKQSxJQURFO0FBRUY0QyxRQUFBQSxVQUFVLEVBQUUsS0FGVjtBQUdGQyxRQUFBQSxjQUFjLEVBQUUsSUFIZDtBQUlGSCxRQUFBQSxVQUFVLEVBQUUsb0JBQUNqRixNQUFELEVBQVNDLFVBQVQsRUFBd0I7QUFDbEMsY0FBTVgsUUFBUSxHQUFHUyxXQUFXLENBQUNDLE1BQUQsRUFBU0MsVUFBVCxDQUE1QjtBQUNBLGlCQUFPSSxhQUFhLENBQUNmLFFBQUQsRUFBV2lCLFFBQVgsRUFBcUIsSUFBckIsQ0FBcEI7QUFDRDtBQVBDLE9BSEcsQ0FBUDtBQVlEOzs7V0FHRCw4QkFBb0I7QUFBQSx5QkFJZCxLQUFLeUIsS0FKUztBQUFBLFVBRWhCTyxJQUZnQixnQkFFaEJBLElBRmdCO0FBQUEsVUFHaEJKLGNBSGdCLGdCQUdoQkEsY0FIZ0IsRUFNbEI7O0FBQ0EsVUFBTTBDLGFBQWEsR0FBRyxLQUFLQyxnQkFBTCxDQUFzQixlQUF0QixFQUF1Q08sbUJBQXZDLENBQXRCOztBQUVBLFVBQU1OLFlBQVksR0FBRyxLQUFLQyxnQkFBTCxFQUFyQjs7QUFFQUQsTUFBQUEsWUFBWSxDQUFDNUMsY0FBYixDQUE0Qm1ELFdBQTVCLEdBQTBDbkQsY0FBYyxDQUFDcEMsV0FBekQ7QUFHQUcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0NBQVosRUFka0IsQ0FlbEI7O0FBQ0EsYUFBTyxJQUFJMEUsYUFBSixDQUFrQkUsWUFBbEIsRUFBZ0MsS0FBS0csZ0JBQUwsQ0FBc0I7QUFDM0Q5RSxRQUFBQSxFQUFFLEVBQUUsZUFEdUQ7QUFFM0QrQixRQUFBQSxjQUFjLEVBQUU0QyxZQUFZLENBQUM1QztBQUY4QixPQUF0QixDQUFoQyxFQUdIO0FBQ0ZJLFFBQUFBLElBQUksRUFBSkEsSUFERTtBQUVGZ0QsUUFBQUEsY0FBYyxFQUFFLENBRmQ7QUFHRkMsUUFBQUEsTUFBTSxFQUFFLENBSE47QUFJRkMsUUFBQUEsV0FBVyxFQUFFLFFBSlg7QUFLRnpHLFFBQUFBLFFBQVEsRUFBRSxLQUFLK0QsS0FBTCxDQUFXL0QsUUFMbkI7QUFNRjtBQUNBc0csUUFBQUEsV0FBVyxFQUFDLHFCQUFDL0QsQ0FBRDtBQUFBLGlCQUFLQSxDQUFDLENBQUNtRSxRQUFQO0FBQUE7QUFQVixPQUhHLENBQVA7QUFhRDs7O0VBbk4yQ0Msb0I7OztBQXVOOUNoRSxnQkFBZ0IsQ0FBQ1osWUFBakIsR0FBZ0NBLFlBQWhDO0FBQ0FZLGdCQUFnQixDQUFDaUUsU0FBakIsR0FBNkIsa0JBQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtDb21wb3NpdGVMYXllciwgY3JlYXRlSXRlcmFibGV9IGZyb20gJ0BkZWNrLmdsL2NvcmUnO1xuaW1wb3J0IHtDb2x1bW5MYXllciwgUG9seWdvbkxheWVyfSBmcm9tICdAZGVjay5nbC9sYXllcnMnO1xuLy8gaW1wb3J0IHtlZGdlTGVuZ3RoLCBoM0dldFJlc29sdXRpb24sIGgzSXNQZW50YWdvbiwgaDNUb0dlbywgaDNUb0dlb0JvdW5kYXJ5LCBVTklUU30gZnJvbSAnaDMtanMnO1xuaW1wb3J0IHtlZGdlTGVuZ3RoLCBnZW9tX3RvX21lc2hjb2RlLCBnZXRDZW50cm9pZCwgZ2V0UmVzb2x1dGlvbiwgbWVzaFRvR2VvQm91bmRhcnl9IGZyb20gJy4uLy4uL3V0aWxzL2ppc21lc2gtdXRpbHMnO1xuaW1wb3J0IHtsZXJwfSBmcm9tICdtYXRoLmdsJztcblxuY29uc3QgVVBEQVRFX1RIUkVTSE9MRF9LTSA9IDEwO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTG9uZ2l0dWRlcyh2ZXJ0aWNlcywgcmVmTG5nKSB7XG4gIHJlZkxuZyA9IHJlZkxuZyA9PT0gdW5kZWZpbmVkID8gdmVydGljZXNbMF1bMF0gOiByZWZMbmc7XG5cbiAgZm9yIChjb25zdCBwdCBvZiB2ZXJ0aWNlcykge1xuICAgIGNvbnN0IGRlbHRhTG5nID0gcHRbMF0gLSByZWZMbmc7XG5cbiAgICBpZiAoZGVsdGFMbmcgPiAxODApIHtcbiAgICAgIHB0WzBdIC09IDM2MDtcbiAgICB9IGVsc2UgaWYgKGRlbHRhTG5nIDwgLTE4MCkge1xuICAgICAgcHRbMF0gKz0gMzYwO1xuICAgIH1cbiAgfVxufVxuXG4vL2hvdyB0byB1c2UgdGhpcyBmdW5jdGlvbj9cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZVBvbHlnb24obWVzaENvZGUsIHZlcnRpY2VzLCBmYWN0b3IpIHtcbiAgY29uc3QgW2xhdCwgbG5nXSA9IGdldENlbnRyb2lkKG1lc2hDb2RlKTtcbiAgY29uc3QgYWN0dWFsQ291bnQgPSB2ZXJ0aWNlcy5sZW5ndGg7XG4gIG5vcm1hbGl6ZUxvbmdpdHVkZXModmVydGljZXMsIGxuZyk7XG4gIGNvbnN0IHZlcnRleENvdW50ID0gdmVydGljZXNbMF0gPT09IHZlcnRpY2VzW2FjdHVhbENvdW50IC0gMV0gPyBhY3R1YWxDb3VudCAtIDEgOiBhY3R1YWxDb3VudDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleENvdW50OyBpKyspIHtcbiAgICB2ZXJ0aWNlc1tpXVswXSA9IGxlcnAobG5nLCB2ZXJ0aWNlc1tpXVswXSwgZmFjdG9yKTtcbiAgICB2ZXJ0aWNlc1tpXVsxXSA9IGxlcnAobGF0LCB2ZXJ0aWNlc1tpXVsxXSwgZmFjdG9yKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldE1lc2hDb2RlQ2VudHJvaWQoZ2V0TWVzaENvZGUsIG9iamVjdCwgb2JqZWN0SW5mbykge1xuICBjb25zb2xlLmxvZygnZ2V0IG1lc2hjb2RlJyk7XG4gIGNvbnN0IG1lc2hDb2RlID0gZ2V0TWVzaENvZGUob2JqZWN0LCBvYmplY3RJbmZvKTtcbiAgLy8gY29uc3QgW2xhdCwgbG5nXSA9IGdldENlbnRyb2lkKG1lc2hDb2RlKTtcbiAgcmV0dXJuIGdldENlbnRyb2lkKHtpZDptZXNoQ29kZX0pO1xufVxuXG4vLyBndWVzczogY29sdW1ubGF5ZXIgaXMgbGlnaHRlciB0aGFuIHBvbHlnb24gd2hlbiByZW5kZXJpbmdcbi8vY29yZSBmdW5jdGlvbiBoZXJlIHRvIGNvbnZlcnQgaDMgdG8gcG9seWdvblxuZnVuY3Rpb24gbWVzaFRvUG9seWdvbihoZXhJZCwgY292ZXJhZ2UgPSAxLCBmbGF0dGVuKSB7XG4gIGNvbnN0IHZlcnRpY2VzID0gbWVzaFRvR2VvQm91bmRhcnkoaGV4SWQsIHRydWUpO1xuXG5cbiAgaWYgKGNvdmVyYWdlICE9PSAxKSB7XG4gICAgc2NhbGVQb2x5Z29uKGhleElkLCB2ZXJ0aWNlcywgY292ZXJhZ2UpO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZUxvbmdpdHVkZXModmVydGljZXMpO1xuICB9XG5cbiAgaWYgKGZsYXR0ZW4pIHtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQ2NEFycmF5KHZlcnRpY2VzLmxlbmd0aCAqIDIpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAoY29uc3QgcHQgb2YgdmVydGljZXMpIHtcbiAgICAgIHBvc2l0aW9uc1tpKytdID0gcHRbMF07XG4gICAgICBwb3NpdGlvbnNbaSsrXSA9IHB0WzFdO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbnM7XG4gIH1cblxuICByZXR1cm4gdmVydGljZXM7XG59XG5cbi8vaG93IGl0IHdvcmtzP1xuZnVuY3Rpb24gbWVyZ2VUcmlnZ2VycyhnZXRNZXNoQ29kZSwgY292ZXJhZ2UpIHtcbiAgbGV0IHRyaWdnZXI7XG5cbiAgaWYgKGdldE1lc2hDb2RlID09PSB1bmRlZmluZWQgfHwgZ2V0TWVzaENvZGUgPT09IG51bGwpIHtcbiAgICB0cmlnZ2VyID0gY292ZXJhZ2U7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdldE1lc2hDb2RlID09PSAnb2JqZWN0Jykge1xuICAgIHRyaWdnZXIgPSBPYmplY3QuYXNzaWduKHt9LCBnZXRNZXNoQ29kZSwge1xuICAgICAgY292ZXJhZ2VcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cmlnZ2VyID0ge1xuICAgICAgZ2V0TWVzaENvZGUsXG4gICAgICBjb3ZlcmFnZVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gdHJpZ2dlcjtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BzID0gIE9iamVjdC5hc3NpZ24oe30sIFBvbHlnb25MYXllci5kZWZhdWx0UHJvcHMsIHtcbiAgaGlnaFByZWNpc2lvbjogZmFsc2UsXG4gIGNvdmVyYWdlOiB7XG4gICAgdHlwZTogJ251bWJlcicsXG4gICAgbWluOiAwLFxuICAgIG1heDogMSxcbiAgICB2YWx1ZTogMVxuICB9LFxuICBjZW50ZXJNZXNoQ29kZTogbnVsbCxcblxuICAvL2hvdyB0byB1c2UgZ2V0IHBvbHlnb25cbiAgZ2V0TWVzaENvZGU6IHtcbiAgICB0eXBlOiAnYWNjZXNzb3InLFxuICAgIHZhbHVlOiB4ID0+IHgubWVzaGNvZGVcbiAgfSxcbiAgZXh0cnVkZWQ6IHRydWVcbn0pO1xuXG5kZWxldGUgZGVmYXVsdFByb3BzLmdldExpbmVEYXNoQXJyYXk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrSmlzbWVzaExheWVyIGV4dGVuZHMgQ29tcG9zaXRlTGF5ZXIge1xuICBzaG91bGRVcGRhdGVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhbmdlRmxhZ3NcbiAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB0aGlzLl9zaG91bGRVc2VIaWdoUHJlY2lzaW9uKCkgPyBjaGFuZ2VGbGFncy5wcm9wc09yRGF0YUNoYW5nZWQgOiBjaGFuZ2VGbGFncy5zb21ldGhpbmdDaGFuZ2VkO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUoe1xuICAgICAgICAgICAgICAgIHByb3BzLFxuICAgICAgICAgICAgICAgIG9sZFByb3BzLFxuICAgICAgICAgICAgICAgIGNoYW5nZUZsYWdzXG4gICAgICAgICAgICAgIH0pIHtcblxuICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgc3RhdGUnKTtcbiAgICBpZiAoY2hhbmdlRmxhZ3MuZGF0YUNoYW5nZWQgfHwgY2hhbmdlRmxhZ3MudXBkYXRlVHJpZ2dlcnMgJiYgY2hhbmdlRmxhZ3MudXBkYXRlVHJpZ2dlcnMuZ2V0TWVzaENvZGUpIHtcbiAgICAgIGxldCByZXNvbHV0aW9uID0gLTE7XG4gICAgICBsZXQgaGFzUGVudGFnb24gPSBmYWxzZTtcbiAgICAgIGxldCBoYXNNdWx0aXBsZVJlcyA9IGZhbHNlO1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVyYWJsZSxcbiAgICAgICAgb2JqZWN0SW5mb1xuICAgICAgfSA9IGNyZWF0ZUl0ZXJhYmxlKHByb3BzLmRhdGEpO1xuXG4gICAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBpdGVyYWJsZSkge1xuICAgICAgICBvYmplY3RJbmZvLmluZGV4Kys7XG4gICAgICAgIGNvbnN0IG1lc2hDb2RlID0gcHJvcHMuZ2V0TWVzaENvZGUob2JqZWN0LCBvYmplY3RJbmZvKTtcbiAgICAgICAgY29uc3QgaGV4UmVzb2x1dGlvbiA9IGdldFJlc29sdXRpb24obWVzaENvZGUpO1xuICAgICAgICBpZiAocmVzb2x1dGlvbiA8IDApIHJlc29sdXRpb24gPSBoZXhSZXNvbHV0aW9uO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmVzb2x1dGlvbixcbiAgICAgICAgLy90b2RvOiBjaGFuZ2UgZWRnZSBsZW5ndGggc2V0dGluZyBoZXJlO1xuICAgICAgICAvLyBlZGdlTGVuZ3RoS006IHJlc29sdXRpb24gPj0gMCA/IGVkZ2VMZW5ndGgocmVzb2x1dGlvbiwgJ2ttJykgOiAwLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlVmVydGljZXModGhpcy5jb250ZXh0LnZpZXdwb3J0KTtcbiAgfVxuXG4gIC8vd2h5IGxhcmdlciBhcmVhIHJlcXVpcmVzIHJlbmRlcmluZyBpbiBwb2x5Z29uP1xuICBfc2hvdWxkVXNlSGlnaFByZWNpc2lvbigpe1xuICAgIGNvbnN0IHtyZXNvbHV0aW9ufSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge3ZpZXdwb3J0fSA9IHRoaXMuY29udGV4dDtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5oaWdoUHJlY2lzaW9uIHx8IHZpZXdwb3J0LnJlc29sdXRpb24gfHwgcmVzb2x1dGlvbiA+PSAwICYmIHJlc29sdXRpb24gPD0gMjtcbiAgfVxuXG4gIC8vaWYgdGhlIHJlc29sdXRpb24gaXMgaGlnaCwgdGhlbiB0aGUgdG90YWwgbnVtYmVyIGlzIHNtYWxsLCBzbyBpdCBjYW4gc3VwcG9ydCBoaWdoZXIgdmlzdWFsaXphdGlvbjtcblxuICBfdXBkYXRlVmVydGljZXModmlld3BvcnQpe1xuICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGUgdmVydGljZXMnKVxuICAgIC8vaWYgdXNpbmcgZ2VvanNvbiBsYXllciwgdGhlbiB0aGVyZSBpcyBubyBuZWNlc3NhcnkgdG8gdXNlXG4gICAgaWYgKHRoaXMuX3Nob3VsZFVzZUhpZ2hQcmVjaXNpb24oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL2hlcmUgaXMgdG8gY29tcHV0ZSB0aGUgZGlzdGFuY2UgYmFzZWQgb24gaDM7XG5cbiAgICAvL25lY2Vzc2FyeSB0byB1c2UgcHJvamVjdEZsYXQgdG8gcHJvamVjdCB0aGUgY2VudGVyIGNvb3JkaW5hdGVzIHRvIHh5O1xuXG4gICAgY29uc3Qge1xuICAgICAgcmVzb2x1dGlvbixcbiAgICAgIGNlbnRlck1lc2hcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChyZXNvbHV0aW9uIDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hjb2RlID0gdGhpcy5wcm9wcy5jZW50ZXJNZXNoQ29kZSB8fCBnZW9tX3RvX21lc2hjb2RlKHJlc29sdXRpb24sdmlld3BvcnQubGF0aXR1ZGUsdmlld3BvcnQubG9uZ2l0dWRlKVxuXG4gICAgaWYoY2VudGVyTWVzaCA9PT0gbWVzaGNvZGUpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vaGVyZSB0aGUgb3JpZ2luYWwgd2F5IHRvIHNldCBtZXNoIHZlcnRpY2VzIGlzIG5vdCBzbyBnb29kLCBuZWVkIHRvIGJlIGNoYW5nZWQ7XG4gICAgaWYoY2VudGVyTWVzaCl7XG5cbiAgICAgIC8vaWYgZGlzdGFuY2UgaXMgd2l0aGluIGEgdGhyZXNob2xkLCBub3QgY2hhbmdlIHRoZSBjZW50ZXIgbWVzaGNvZGU7XG4gICAgfVxuICAgIC8vaGVyZSBhbHNvIGluIGNvbW1vbiBzY2FsZSwgbm8gbmVjZXNzYXJ5P1xuICAgIGNvbnN0IHt1bml0c1Blck1ldGVyfSA9IHZpZXdwb3J0LmRpc3RhbmNlU2NhbGVzO1xuICAgIGxldCB2ZXJ0aWNlcyA9IG1lc2hUb0dlb0JvdW5kYXJ5KG1lc2hjb2RlKS5zbGljZSgwLDQpO1xuICAgIGNvbnN0IFtjZW50ZXJMbmcsIGNlbnRlckxhdF0gPSBnZXRDZW50cm9pZCh7aWQ6bWVzaGNvZGV9KTtcblxuICAgIC8vaGVyZSBjZW50ZXJYIGFuZCBjZW50ZXJZIGlzIGluIGNvbW1vbiBzY2FsZTtcbiAgICBjb25zdCBbY2VudGVyWCwgY2VudGVyWV0gPSB2aWV3cG9ydC5wcm9qZWN0RmxhdChbY2VudGVyTG5nLCBjZW50ZXJMYXRdKTtcblxuICAgIHZlcnRpY2VzID0gdmVydGljZXMubWFwKHAgPT4ge1xuICAgICAgY29uc3Qgd29ybGRQb3NpdGlvbiA9IHZpZXdwb3J0LnByb2plY3RGbGF0KHApO1xuICAgICAgcmV0dXJuIFsod29ybGRQb3NpdGlvblswXSAtIGNlbnRlclgpIC8gdW5pdHNQZXJNZXRlclswXSwgKHdvcmxkUG9zaXRpb25bMV0gLSBjZW50ZXJZKSAvIHVuaXRzUGVyTWV0ZXJbMV1dO1xuICAgICAgLy8gcmV0dXJuIFsod29ybGRQb3NpdGlvblswXSAtIGNlbnRlclgpLCAod29ybGRQb3NpdGlvblsxXSAtIGNlbnRlclkpXTtcbiAgICB9KTtcblxuXG5cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2VudGVyTWVzaDptZXNoY29kZSxcbiAgICAgIHZlcnRpY2VzXG4gICAgfSlcblxuXG4gIH1cblxuICByZW5kZXJMYXllcnMoKXtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyIGxheWVycycpXG4gICAgcmV0dXJuIHRoaXMuX3Nob3VsZFVzZUhpZ2hQcmVjaXNpb24oKT90aGlzLl9yZW5kZXJQb2x5Z29uTGF5ZXIoKTp0aGlzLl9yZW5kZXJDb2x1bW5MYXllcigpO1xuICB9XG5cbiAgX2dldEZvcndhcmRQcm9wcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBlbGV2YXRpb25TY2FsZSxcbiAgICAgIG1hdGVyaWFsLFxuICAgICAgY292ZXJhZ2UsXG4gICAgICBleHRydWRlZCxcbiAgICAgIHdpcmVmcmFtZSxcbiAgICAgIHN0cm9rZWQsXG4gICAgICBmaWxsZWQsXG4gICAgICBsaW5lV2lkdGhVbml0cyxcbiAgICAgIGxpbmVXaWR0aFNjYWxlLFxuICAgICAgbGluZVdpZHRoTWluUGl4ZWxzLFxuICAgICAgbGluZVdpZHRoTWF4UGl4ZWxzLFxuICAgICAgZ2V0RmlsbENvbG9yLFxuICAgICAgZ2V0RWxldmF0aW9uLFxuICAgICAgZ2V0TGluZUNvbG9yLFxuICAgICAgZ2V0TGluZVdpZHRoLFxuICAgICAgdXBkYXRlVHJpZ2dlcnNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgZWxldmF0aW9uU2NhbGUsXG4gICAgICBleHRydWRlZCxcbiAgICAgIGNvdmVyYWdlLFxuICAgICAgd2lyZWZyYW1lLFxuICAgICAgc3Ryb2tlZCxcbiAgICAgIGZpbGxlZCxcbiAgICAgIGxpbmVXaWR0aFVuaXRzLFxuICAgICAgbGluZVdpZHRoU2NhbGUsXG4gICAgICBsaW5lV2lkdGhNaW5QaXhlbHMsXG4gICAgICBsaW5lV2lkdGhNYXhQaXhlbHMsXG4gICAgICBtYXRlcmlhbCxcbiAgICAgIGdldEVsZXZhdGlvbixcbiAgICAgIGdldEZpbGxDb2xvcixcbiAgICAgIGdldExpbmVDb2xvcixcbiAgICAgIGdldExpbmVXaWR0aCxcbiAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgIGdldEZpbGxDb2xvcjogdXBkYXRlVHJpZ2dlcnMuZ2V0RmlsbENvbG9yLFxuICAgICAgICBnZXRFbGV2YXRpb246IHVwZGF0ZVRyaWdnZXJzLmdldEVsZXZhdGlvbixcbiAgICAgICAgZ2V0TGluZUNvbG9yOiB1cGRhdGVUcmlnZ2Vycy5nZXRMaW5lQ29sb3IsXG4gICAgICAgIGdldExpbmVXaWR0aDogdXBkYXRlVHJpZ2dlcnMuZ2V0TGluZVdpZHRoXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIF9yZW5kZXJQb2x5Z29uTGF5ZXIoKXtcblxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRNZXNoQ29kZSxcbiAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuICAgICAgY292ZXJhZ2VcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IFN1YkxheWVyQ2xhc3MgPSB0aGlzLmdldFN1YkxheWVyQ2xhc3MoJ2hleGFnb24tY2VsbC1oaWZpJywgUG9seWdvbkxheWVyKTtcbiAgICBjb25zdCBmb3J3YXJkUHJvcHMgPSB0aGlzLl9nZXRGb3J3YXJkUHJvcHMoKTtcblxuICAgIGZvcndhcmRQcm9wcy51cGRhdGVUcmlnZ2Vycy5nZXRQb2x5Z29uID0gbWVyZ2VUcmlnZ2Vycyh1cGRhdGVUcmlnZ2Vycy5nZXRNZXNoQ29kZSwgY292ZXJhZ2UpO1xuXG4gICAgcmV0dXJuIG5ldyBTdWJMYXllckNsYXNzKGZvcndhcmRQcm9wcywgdGhpcy5nZXRTdWJMYXllclByb3BzKHtcbiAgICAgIGlkOiAnaGV4YWdvbi1jZWxsLWhpZmknLFxuICAgICAgdXBkYXRlVHJpZ2dlcnM6IGZvcndhcmRQcm9wcy51cGRhdGVUcmlnZ2Vyc1xuICAgIH0pLCB7XG4gICAgICBkYXRhLFxuICAgICAgX25vcm1hbGl6ZTogZmFsc2UsXG4gICAgICBwb3NpdGlvbkZvcm1hdDogJ1hZJyxcbiAgICAgIGdldFBvbHlnb246IChvYmplY3QsIG9iamVjdEluZm8pID0+IHtcbiAgICAgICAgY29uc3QgbWVzaENvZGUgPSBnZXRNZXNoQ29kZShvYmplY3QsIG9iamVjdEluZm8pO1xuICAgICAgICByZXR1cm4gbWVzaFRvUG9seWdvbihtZXNoQ29kZSwgY292ZXJhZ2UsIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuICBfcmVuZGVyQ29sdW1uTGF5ZXIoKXtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgdXBkYXRlVHJpZ2dlcnNcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vZ3Vlc3MgdGhhdCBnZXQgc3VibGF5ZXIgaWQgaXMgb25seSB1dGlsaXplZCBmb3IgbmFtaW5nIHRoZSBsYXllclxuICAgIGNvbnN0IFN1YkxheWVyQ2xhc3MgPSB0aGlzLmdldFN1YkxheWVyQ2xhc3MoJ21lc2hjb2RlLWNlbGwnLCBDb2x1bW5MYXllcik7XG5cbiAgICBjb25zdCBmb3J3YXJkUHJvcHMgPSB0aGlzLl9nZXRGb3J3YXJkUHJvcHMoKTtcblxuICAgIGZvcndhcmRQcm9wcy51cGRhdGVUcmlnZ2Vycy5nZXRQb3NpdGlvbiA9IHVwZGF0ZVRyaWdnZXJzLmdldE1lc2hDb2RlO1xuXG5cbiAgICBjb25zb2xlLmxvZygncmVuZGVyIGNvbHVtbiBsYXllciBmb3IgamlzIElEJylcbiAgICAvL3NlZW1zIHRoYXQsIHN0YW5kYXJkIGhleGFnb24gdXRpbGl6ZSB2ZXJ0aWNlcyB0byBjb250cm9sIHRoZSBzaXplLCBpbnN0ZWFkIG9mIHJhZGl1c1xuICAgIHJldHVybiBuZXcgU3ViTGF5ZXJDbGFzcyhmb3J3YXJkUHJvcHMsIHRoaXMuZ2V0U3ViTGF5ZXJQcm9wcyh7XG4gICAgICBpZDogJ21lc2hjb2RlLWNlbGwnLFxuICAgICAgdXBkYXRlVHJpZ2dlcnM6IGZvcndhcmRQcm9wcy51cGRhdGVUcmlnZ2Vyc1xuICAgIH0pLCB7XG4gICAgICBkYXRhLFxuICAgICAgZGlza1Jlc29sdXRpb246IDQsXG4gICAgICByYWRpdXM6IDEsXG4gICAgICByYWRpdXNVbml0czogJ2NvbW1vbicsXG4gICAgICB2ZXJ0aWNlczogdGhpcy5zdGF0ZS52ZXJ0aWNlcyxcbiAgICAgIC8vIGdldFBvc2l0aW9uOiBnZXRNZXNoQ29kZUNlbnRyb2lkLmJpbmQobnVsbCwgZ2V0TWVzaENvZGUpXG4gICAgICBnZXRQb3NpdGlvbjooeCk9PnguY2VudHJvaWRcbiAgICB9KVxuXG4gIH1cblxufVxuXG5EZWNrSmlzbWVzaExheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbkRlY2tKaXNtZXNoTGF5ZXIubGF5ZXJOYW1lID0gJ0RlY2tKSVNNZXNoTGF5ZXInO1xuIl19