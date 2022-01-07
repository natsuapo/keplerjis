"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueFunc = getValueFunc;
exports.getScaleFunctor = getScaleFunctor;
exports.getGetValue = getGetValue;
exports.getDimensionSortedBins = getDimensionSortedBins;
exports.getDimensionValueDomain = getDimensionValueDomain;
exports.getDimensionScale = getDimensionScale;
exports.getAggregatedData = getAggregatedData;
exports["default"] = exports.defaultDimensions = exports.defaultElevationDimension = exports.defaultColorDimension = exports.defaultAggregation = exports.DECK_AGGREGATION_MAP = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _aggregationLayers = require("@deck.gl/aggregation-layers");

var _window = require("global/window");

var _aggregateUtils = require("../../utils/aggregate-utils");

var _defaultSettings = require("../../constants/default-settings");

var _DECK_AGGREGATION_MAP;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DECK_AGGREGATION_MAP = (_DECK_AGGREGATION_MAP = {}, (0, _defineProperty2["default"])(_DECK_AGGREGATION_MAP, _aggregationLayers.AGGREGATION_OPERATION.SUM, _defaultSettings.AGGREGATION_TYPES.sum), (0, _defineProperty2["default"])(_DECK_AGGREGATION_MAP, _aggregationLayers.AGGREGATION_OPERATION.MEAN, _defaultSettings.AGGREGATION_TYPES.average), (0, _defineProperty2["default"])(_DECK_AGGREGATION_MAP, _aggregationLayers.AGGREGATION_OPERATION.MIN, _defaultSettings.AGGREGATION_TYPES.minimum), (0, _defineProperty2["default"])(_DECK_AGGREGATION_MAP, _aggregationLayers.AGGREGATION_OPERATION.MAX, _defaultSettings.AGGREGATION_TYPES.maximum), _DECK_AGGREGATION_MAP);
exports.DECK_AGGREGATION_MAP = DECK_AGGREGATION_MAP;

function getValueFunc(aggregation, accessor) {
  if (!aggregation || !_aggregationLayers.AGGREGATION_OPERATION[aggregation.toUpperCase()]) {
    _window.console.warn("Aggregation ".concat(aggregation, " is not supported"));
  }

  var op = _aggregationLayers.AGGREGATION_OPERATION[aggregation.toUpperCase()] || _aggregationLayers.AGGREGATION_OPERATION.SUM;

  var keplerOp = DECK_AGGREGATION_MAP[op];
  return function (pts) {
    return (0, _aggregateUtils.aggregate)(pts.map(accessor), keplerOp);
  };
}

function getScaleFunctor(scaleType) {
  if (!scaleType || !_defaultSettings.SCALE_FUNC[scaleType]) {
    _window.console.warn("Scale ".concat(scaleType, " is not supported"));
  }

  return _defaultSettings.SCALE_FUNC[scaleType] || _defaultSettings.SCALE_FUNC.quantize;
}

function nop() {}

function getGetValue(step, props, dimensionUpdater) {
  var key = dimensionUpdater.key;
  var _step$triggers = step.triggers,
      value = _step$triggers.value,
      weight = _step$triggers.weight,
      aggregation = _step$triggers.aggregation;
  var getValue = props[value.prop];

  if (getValue === null) {
    // If `getValue` is not provided from props, build it with aggregation and weight.
    getValue = getValueFunc(props[aggregation.prop], props[weight.prop]);
  }

  if (getValue) {
    this._setDimensionState(key, {
      getValue: getValue
    });
  }
}

function getDimensionSortedBins(step, props, dimensionUpdater) {
  var key = dimensionUpdater.key;
  var getValue = this.state.dimensions[key].getValue;
  var sortedBins = new _aggregationLayers._BinSorter(this.state.layerData.data || [], {
    getValue: getValue,
    filterData: props._filterData
  });

  this._setDimensionState(key, {
    sortedBins: sortedBins
  });
}

function getDimensionValueDomain(step, props, dimensionUpdater) {
  var key = dimensionUpdater.key;
  var _step$triggers2 = step.triggers,
      lowerPercentile = _step$triggers2.lowerPercentile,
      upperPercentile = _step$triggers2.upperPercentile,
      scaleType = _step$triggers2.scaleType;

  if (!this.state.dimensions[key].sortedBins) {
    // the previous step should set sortedBins, if not, something went wrong
    return;
  } // for log and sqrt scale, returns linear domain by default
  // TODO: support other scale function domain in bin sorter


  var valueDomain = this.state.dimensions[key].sortedBins.getValueDomainByScale(props[scaleType.prop], [props[lowerPercentile.prop], props[upperPercentile.prop]]);

  this._setDimensionState(key, {
    valueDomain: valueDomain
  });
}

function getDimensionScale(step, props, dimensionUpdater) {
  var key = dimensionUpdater.key;
  var _step$triggers3 = step.triggers,
      domain = _step$triggers3.domain,
      range = _step$triggers3.range,
      scaleType = _step$triggers3.scaleType;
  var onSet = step.onSet;

  if (!this.state.dimensions[key].valueDomain) {
    // the previous step should set valueDomain, if not, something went wrong
    return;
  }

  var dimensionRange = props[range.prop];
  var dimensionDomain = props[domain.prop] || this.state.dimensions[key].valueDomain;
  var scaleFunctor = getScaleFunctor(scaleType && props[scaleType.prop])();
  var scaleFunc = scaleFunctor.domain(dimensionDomain).range(dimensionRange);

  if ((0, _typeof2["default"])(onSet) === 'object' && typeof props[onSet.props] === 'function') {
    props[onSet.props](scaleFunc.domain());
  }

  this._setDimensionState(key, {
    scaleFunc: scaleFunc
  });
}

function normalizeResult() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // support previous hexagonAggregator API
  if (result.hexagons) {
    return Object.assign({
      data: result.hexagons
    }, result);
  } else if (result.layerData) {
    return Object.assign({
      data: result.layerData
    }, result);
  }

  return result;
}

function getAggregatedData(step, props, aggregation, aggregationParams) {
  console.log('get aggregated data');
  var aggr = step.triggers.aggregator;
  var aggregator = props[aggr.prop]; // result should contain a data array and other props
  // result = {data: [], ...other props}

  var result = aggregator(props, aggregationParams);
  this.setState({
    layerData: normalizeResult(result)
  });
}

var defaultAggregation = {
  key: 'position',
  updateSteps: [{
    key: 'aggregate',
    triggers: {
      cellSize: {
        prop: 'cellSize'
      },
      position: {
        prop: 'getPosition',
        updateTrigger: 'getPosition'
      },
      aggregator: {
        prop: 'gridAggregator'
      }
    },
    updater: getAggregatedData
  }]
};
exports.defaultAggregation = defaultAggregation;

function getSubLayerAccessor(dimensionState, dimension, layerProps) {
  return function (cell) {
    var sortedBins = dimensionState.sortedBins,
        scaleFunc = dimensionState.scaleFunc;
    var bin = sortedBins.binMap[cell.index];

    if (bin && bin.counts === 0) {
      // no points left in bin after filtering
      return dimension.nullValue;
    }

    var cv = bin && bin.value;
    var domain = scaleFunc.domain();
    var isValueInDomain = cv >= domain[0] && cv <= domain[domain.length - 1]; // if cell value is outside domain, set alpha to 0

    return isValueInDomain ? scaleFunc(cv) : dimension.nullValue;
  };
}

var defaultColorDimension = {
  key: 'fillColor',
  accessor: 'getFillColor',
  getPickingInfo: function getPickingInfo(dimensionState, cell) {
    var sortedBins = dimensionState.sortedBins;
    var colorValue = sortedBins.binMap[cell.index] && sortedBins.binMap[cell.index].value;
    return {
      colorValue: colorValue
    };
  },
  nullValue: [0, 0, 0, 0],
  updateSteps: [{
    key: 'getValue',
    triggers: {
      value: {
        prop: 'getColorValue',
        updateTrigger: 'getColorValue'
      },
      weight: {
        prop: 'getColorWeight',
        updateTrigger: 'getColorWeight'
      },
      aggregation: {
        prop: 'colorAggregation'
      }
    },
    updater: getGetValue
  }, {
    key: 'getBins',
    triggers: {
      _filterData: {
        prop: '_filterData',
        updateTrigger: '_filterData'
      }
    },
    updater: getDimensionSortedBins
  }, {
    key: 'getDomain',
    triggers: {
      lowerPercentile: {
        prop: 'lowerPercentile'
      },
      upperPercentile: {
        prop: 'upperPercentile'
      },
      scaleType: {
        prop: 'colorScaleType'
      }
    },
    updater: getDimensionValueDomain
  }, {
    key: 'getScaleFunc',
    triggers: {
      domain: {
        prop: 'colorDomain'
      },
      range: {
        prop: 'colorRange'
      },
      scaleType: {
        prop: 'colorScaleType'
      }
    },
    onSet: {
      props: 'onSetColorDomain'
    },
    updater: getDimensionScale
  }],
  getSubLayerAccessor: getSubLayerAccessor
};
exports.defaultColorDimension = defaultColorDimension;
var defaultElevationDimension = {
  key: 'elevation',
  accessor: 'getElevation',
  getPickingInfo: function getPickingInfo(dimensionState, cell) {
    var sortedBins = dimensionState.sortedBins;
    var elevationValue = sortedBins.binMap[cell.index] && sortedBins.binMap[cell.index].value;
    return {
      elevationValue: elevationValue
    };
  },
  nullValue: -1,
  updateSteps: [{
    key: 'getValue',
    triggers: {
      value: {
        prop: 'getElevationValue',
        updateTrigger: 'getElevationValue'
      },
      weight: {
        prop: 'getElevationWeight',
        updateTrigger: 'getElevationWeight'
      },
      aggregation: {
        prop: 'elevationAggregation'
      }
    },
    updater: getGetValue
  }, {
    key: 'getBins',
    triggers: {
      _filterData: {
        prop: '_filterData',
        updateTrigger: '_filterData'
      }
    },
    updater: getDimensionSortedBins
  }, {
    key: 'getDomain',
    triggers: {
      lowerPercentile: {
        prop: 'elevationLowerPercentile'
      },
      upperPercentile: {
        prop: 'elevationUpperPercentile'
      },
      scaleType: {
        prop: 'elevationScaleType'
      }
    },
    updater: getDimensionValueDomain
  }, {
    key: 'getScaleFunc',
    triggers: {
      domain: {
        prop: 'elevationDomain'
      },
      range: {
        prop: 'elevationRange'
      },
      scaleType: {
        prop: 'elevationScaleType'
      }
    },
    onSet: {
      props: 'onSetElevationDomain'
    },
    updater: getDimensionScale
  }],
  getSubLayerAccessor: getSubLayerAccessor
};
exports.defaultElevationDimension = defaultElevationDimension;
var _defaultDimensions = [defaultColorDimension, defaultElevationDimension];
exports.defaultDimensions = _defaultDimensions;

var CPUAggregator = /*#__PURE__*/function () {
  function CPUAggregator() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, CPUAggregator);
    this.state = _objectSpread({
      layerData: {},
      dimensions: {// color: {
        //   getValue: null,
        //   domain: null,
        //   sortedBins: null,
        //   scaleFunc: nop
        // },
        // elevation: {
        //   getValue: null,
        //   domain: null,
        //   sortedBins: null,
        //   scaleFunc: nop
        // }
      }
    }, opts.initialState);
    this.dimensionUpdaters = {};
    this.aggregationUpdater = {};

    this._addDimension(opts.dimensions || _defaultDimensions);

    this._addAggregation(opts.aggregation || defaultAggregation);
  }

  (0, _createClass2["default"])(CPUAggregator, [{
    key: "updateAllDimensions",
    value: function updateAllDimensions(props) {
      var dimensionChanges = []; // update all dimensions

      for (var dim in this.dimensionUpdaters) {
        var updaters = this._accumulateUpdaters(0, props, this.dimensionUpdaters[dim]);

        dimensionChanges = dimensionChanges.concat(updaters);
      }

      dimensionChanges.forEach(function (f) {
        return typeof f === 'function' && f();
      });
    }
  }, {
    key: "updateAggregation",
    value: function updateAggregation(props, aggregationParams) {
      var updaters = this._accumulateUpdaters(0, props, this.aggregationUpdater);

      updaters.forEach(function (f) {
        return typeof f === 'function' && f(aggregationParams);
      });
    }
  }, {
    key: "updateState",
    value: function updateState(opts, aggregationParams) {
      var oldProps = opts.oldProps,
          props = opts.props,
          changeFlags = opts.changeFlags;
      var dimensionChanges = [];

      if (changeFlags.dataChanged) {
        // if data changed update everything
        this.updateAggregation(props, aggregationParams);
        this.updateAllDimensions(props);
        return this.state;
      }

      var aggregationChanges = this._getAggregationChanges(oldProps, props, changeFlags);

      if (aggregationChanges && aggregationChanges.length) {
        // get aggregatedData
        aggregationChanges.forEach(function (f) {
          return typeof f === 'function' && f(aggregationParams);
        });
        this.updateAllDimensions(props);
      } else {
        // only update dimensions
        dimensionChanges = this._getDimensionChanges(oldProps, props, changeFlags) || [];
        dimensionChanges.forEach(function (f) {
          return typeof f === 'function' && f();
        });
      }

      return this.state;
    } // Update private state

  }, {
    key: "setState",
    value: function setState(updateObject) {
      this.state = Object.assign({}, this.state, updateObject);
    } // Update private state.dimensions

  }, {
    key: "_setDimensionState",
    value: function _setDimensionState(key, updateObject) {
      this.setState({
        dimensions: Object.assign({}, this.state.dimensions, (0, _defineProperty2["default"])({}, key, Object.assign({}, this.state.dimensions[key], updateObject)))
      });
    }
  }, {
    key: "_addAggregation",
    value: function _addAggregation(aggregation) {
      this.aggregationUpdater = aggregation;
    }
  }, {
    key: "_addDimension",
    value: function _addDimension() {
      var _this = this;

      var dimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      dimensions.forEach(function (dimension) {
        var key = dimension.key;
        _this.dimensionUpdaters[key] = dimension;
      });
    }
  }, {
    key: "_needUpdateStep",
    value: function _needUpdateStep(dimensionStep, oldProps, props, changeFlags) {
      // whether need to update current dimension step
      // dimension step is the value, domain, scaleFunction of each dimension
      // each step is an object with properties links to layer prop and whether the prop is
      // controlled by updateTriggers
      return Object.values(dimensionStep.triggers).some(function (item) {
        if (item.updateTrigger) {
          // check based on updateTriggers change first
          return changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged[item.updateTrigger]);
        } // fallback to direct comparison


        return oldProps[item.prop] !== props[item.prop];
      });
    }
  }, {
    key: "_accumulateUpdaters",
    value: function _accumulateUpdaters(step, props, dimension) {
      var updaters = [];

      for (var i = step; i < dimension.updateSteps.length; i++) {
        if (typeof dimension.updateSteps[i].updater === 'function') {
          updaters.push(dimension.updateSteps[i].updater.bind(this, dimension.updateSteps[i], props, dimension));
        }
      }

      return updaters;
    }
  }, {
    key: "_getAllUpdaters",
    value: function _getAllUpdaters(dimension, oldProps, props, changeFlags) {
      var _this2 = this;

      var updaters = [];
      var needUpdateStep = dimension.updateSteps.findIndex(function (step) {
        return _this2._needUpdateStep(step, oldProps, props, changeFlags);
      });

      if (needUpdateStep > -1) {
        updaters = updaters.concat(this._accumulateUpdaters(needUpdateStep, props, dimension));
      }

      return updaters;
    }
  }, {
    key: "_getAggregationChanges",
    value: function _getAggregationChanges(oldProps, props, changeFlags) {
      var updaters = this._getAllUpdaters(this.aggregationUpdater, oldProps, props, changeFlags);

      return updaters.length ? updaters : null;
    }
  }, {
    key: "_getDimensionChanges",
    value: function _getDimensionChanges(oldProps, props, changeFlags) {
      var updaters = []; // get dimension to be updated

      for (var key in this.dimensionUpdaters) {
        // return the first triggered updater for each dimension
        var dimension = this.dimensionUpdaters[key];

        var dimensionUpdaters = this._getAllUpdaters(dimension, oldProps, props, changeFlags);

        updaters = updaters.concat(dimensionUpdaters);
      }

      return updaters.length ? updaters : null;
    }
  }, {
    key: "getUpdateTriggers",
    value: function getUpdateTriggers(props) {
      var _this3 = this;

      var _updateTriggers = props.updateTriggers || {};

      var updateTriggers = {};

      var _loop = function _loop(key) {
        var _this3$dimensionUpdat = _this3.dimensionUpdaters[key],
            accessor = _this3$dimensionUpdat.accessor,
            updateSteps = _this3$dimensionUpdat.updateSteps; // fold dimension triggers into each accessor

        updateTriggers[accessor] = {};
        updateSteps.forEach(function (step) {
          Object.values(step.triggers || []).forEach(function (_ref) {
            var prop = _ref.prop,
                updateTrigger = _ref.updateTrigger;

            if (updateTrigger) {
              // if prop is based on updateTrigger e.g. getColorValue, getColorWeight
              // and updateTriggers is passed in from layer prop
              // fold the updateTriggers into accessor
              var fromProp = _updateTriggers[updateTrigger];

              if ((0, _typeof2["default"])(fromProp) === 'object' && !Array.isArray(fromProp)) {
                // if updateTrigger is an object spread it
                Object.assign(updateTriggers[accessor], fromProp);
              } else if (fromProp !== undefined) {
                updateTriggers[accessor][prop] = fromProp;
              }
            } else {
              // if prop is not based on updateTrigger
              updateTriggers[accessor][prop] = props[prop];
            }
          });
        });
      };

      for (var key in this.dimensionUpdaters) {
        _loop(key);
      }

      return updateTriggers;
    }
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(_ref2, layerProps) {
      var info = _ref2.info;
      var isPicked = info.picked && info.index > -1;
      var object = null;

      if (isPicked) {
        var cell = this.state.layerData.data[info.index];
        var binInfo = {};

        for (var key in this.dimensionUpdaters) {
          var getPickingInfo = this.dimensionUpdaters[key].getPickingInfo;

          if (typeof getPickingInfo === 'function') {
            binInfo = Object.assign({}, binInfo, getPickingInfo(this.state.dimensions[key], cell, layerProps));
          }
        }

        object = Object.assign(binInfo, cell, {
          points: cell.filteredPoints || cell.points
        });
      } // add bin  and  to info


      return Object.assign(info, {
        picked: Boolean(object),
        // override object with picked cell
        object: object
      });
    }
  }, {
    key: "getAccessor",
    value: function getAccessor(dimensionKey, layerProps) {
      if (!this.dimensionUpdaters.hasOwnProperty(dimensionKey)) {
        return nop;
      }

      return this.dimensionUpdaters[dimensionKey].getSubLayerAccessor(this.state.dimensions[dimensionKey], this.dimensionUpdaters[dimensionKey], layerProps);
    }
  }], [{
    key: "defaultDimensions",
    value: function defaultDimensions() {
      return _defaultDimensions;
    }
  }]);
  return CPUAggregator;
}();

exports["default"] = CPUAggregator;
CPUAggregator.getDimensionScale = getDimensionScale;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL2NwdS1hZ2dyZWdhdG9yLmpzIl0sIm5hbWVzIjpbIkRFQ0tfQUdHUkVHQVRJT05fTUFQIiwiQUdHUkVHQVRJT05fT1BFUkFUSU9OIiwiU1VNIiwiQUdHUkVHQVRJT05fVFlQRVMiLCJzdW0iLCJNRUFOIiwiYXZlcmFnZSIsIk1JTiIsIm1pbmltdW0iLCJNQVgiLCJtYXhpbXVtIiwiZ2V0VmFsdWVGdW5jIiwiYWdncmVnYXRpb24iLCJhY2Nlc3NvciIsInRvVXBwZXJDYXNlIiwiQ29uc29sZSIsIndhcm4iLCJvcCIsImtlcGxlck9wIiwicHRzIiwibWFwIiwiZ2V0U2NhbGVGdW5jdG9yIiwic2NhbGVUeXBlIiwiU0NBTEVfRlVOQyIsInF1YW50aXplIiwibm9wIiwiZ2V0R2V0VmFsdWUiLCJzdGVwIiwicHJvcHMiLCJkaW1lbnNpb25VcGRhdGVyIiwia2V5IiwidHJpZ2dlcnMiLCJ2YWx1ZSIsIndlaWdodCIsImdldFZhbHVlIiwicHJvcCIsIl9zZXREaW1lbnNpb25TdGF0ZSIsImdldERpbWVuc2lvblNvcnRlZEJpbnMiLCJzdGF0ZSIsImRpbWVuc2lvbnMiLCJzb3J0ZWRCaW5zIiwiQmluU29ydGVyIiwibGF5ZXJEYXRhIiwiZGF0YSIsImZpbHRlckRhdGEiLCJfZmlsdGVyRGF0YSIsImdldERpbWVuc2lvblZhbHVlRG9tYWluIiwibG93ZXJQZXJjZW50aWxlIiwidXBwZXJQZXJjZW50aWxlIiwidmFsdWVEb21haW4iLCJnZXRWYWx1ZURvbWFpbkJ5U2NhbGUiLCJnZXREaW1lbnNpb25TY2FsZSIsImRvbWFpbiIsInJhbmdlIiwib25TZXQiLCJkaW1lbnNpb25SYW5nZSIsImRpbWVuc2lvbkRvbWFpbiIsInNjYWxlRnVuY3RvciIsInNjYWxlRnVuYyIsIm5vcm1hbGl6ZVJlc3VsdCIsInJlc3VsdCIsImhleGFnb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0QWdncmVnYXRlZERhdGEiLCJhZ2dyZWdhdGlvblBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJhZ2dyIiwiYWdncmVnYXRvciIsInNldFN0YXRlIiwiZGVmYXVsdEFnZ3JlZ2F0aW9uIiwidXBkYXRlU3RlcHMiLCJjZWxsU2l6ZSIsInBvc2l0aW9uIiwidXBkYXRlVHJpZ2dlciIsInVwZGF0ZXIiLCJnZXRTdWJMYXllckFjY2Vzc29yIiwiZGltZW5zaW9uU3RhdGUiLCJkaW1lbnNpb24iLCJsYXllclByb3BzIiwiY2VsbCIsImJpbiIsImJpbk1hcCIsImluZGV4IiwiY291bnRzIiwibnVsbFZhbHVlIiwiY3YiLCJpc1ZhbHVlSW5Eb21haW4iLCJsZW5ndGgiLCJkZWZhdWx0Q29sb3JEaW1lbnNpb24iLCJnZXRQaWNraW5nSW5mbyIsImNvbG9yVmFsdWUiLCJkZWZhdWx0RWxldmF0aW9uRGltZW5zaW9uIiwiZWxldmF0aW9uVmFsdWUiLCJkZWZhdWx0RGltZW5zaW9ucyIsIkNQVUFnZ3JlZ2F0b3IiLCJvcHRzIiwiaW5pdGlhbFN0YXRlIiwiZGltZW5zaW9uVXBkYXRlcnMiLCJhZ2dyZWdhdGlvblVwZGF0ZXIiLCJfYWRkRGltZW5zaW9uIiwiX2FkZEFnZ3JlZ2F0aW9uIiwiZGltZW5zaW9uQ2hhbmdlcyIsImRpbSIsInVwZGF0ZXJzIiwiX2FjY3VtdWxhdGVVcGRhdGVycyIsImNvbmNhdCIsImZvckVhY2giLCJmIiwib2xkUHJvcHMiLCJjaGFuZ2VGbGFncyIsImRhdGFDaGFuZ2VkIiwidXBkYXRlQWdncmVnYXRpb24iLCJ1cGRhdGVBbGxEaW1lbnNpb25zIiwiYWdncmVnYXRpb25DaGFuZ2VzIiwiX2dldEFnZ3JlZ2F0aW9uQ2hhbmdlcyIsIl9nZXREaW1lbnNpb25DaGFuZ2VzIiwidXBkYXRlT2JqZWN0IiwiZGltZW5zaW9uU3RlcCIsInZhbHVlcyIsInNvbWUiLCJpdGVtIiwidXBkYXRlVHJpZ2dlcnNDaGFuZ2VkIiwiYWxsIiwiaSIsInB1c2giLCJiaW5kIiwibmVlZFVwZGF0ZVN0ZXAiLCJmaW5kSW5kZXgiLCJfbmVlZFVwZGF0ZVN0ZXAiLCJfZ2V0QWxsVXBkYXRlcnMiLCJfdXBkYXRlVHJpZ2dlcnMiLCJ1cGRhdGVUcmlnZ2VycyIsImZyb21Qcm9wIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiaW5mbyIsImlzUGlja2VkIiwicGlja2VkIiwib2JqZWN0IiwiYmluSW5mbyIsInBvaW50cyIsImZpbHRlcmVkUG9pbnRzIiwiQm9vbGVhbiIsImRpbWVuc2lvbktleSIsImhhc093blByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTUEsb0JBQW9CLHdGQUM5QkMseUNBQXNCQyxHQURRLEVBQ0ZDLG1DQUFrQkMsR0FEaEIsMkRBRTlCSCx5Q0FBc0JJLElBRlEsRUFFREYsbUNBQWtCRyxPQUZqQiwyREFHOUJMLHlDQUFzQk0sR0FIUSxFQUdGSixtQ0FBa0JLLE9BSGhCLDJEQUk5QlAseUNBQXNCUSxHQUpRLEVBSUZOLG1DQUFrQk8sT0FKaEIseUJBQTFCOzs7QUFPQSxTQUFTQyxZQUFULENBQXNCQyxXQUF0QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbEQsTUFBSSxDQUFDRCxXQUFELElBQWdCLENBQUNYLHlDQUFzQlcsV0FBVyxDQUFDRSxXQUFaLEVBQXRCLENBQXJCLEVBQXVFO0FBQ3JFQyxvQkFBUUMsSUFBUix1QkFBNEJKLFdBQTVCO0FBQ0Q7O0FBRUQsTUFBTUssRUFBRSxHQUFHaEIseUNBQXNCVyxXQUFXLENBQUNFLFdBQVosRUFBdEIsS0FBb0RiLHlDQUFzQkMsR0FBckY7O0FBQ0EsTUFBTWdCLFFBQVEsR0FBR2xCLG9CQUFvQixDQUFDaUIsRUFBRCxDQUFyQztBQUVBLFNBQU8sVUFBQUUsR0FBRztBQUFBLFdBQUksK0JBQVVBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRUCxRQUFSLENBQVYsRUFBNkJLLFFBQTdCLENBQUo7QUFBQSxHQUFWO0FBQ0Q7O0FBRU0sU0FBU0csZUFBVCxDQUF5QkMsU0FBekIsRUFB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TUFBTSxDQUFDQyxNQUFQLENBQWMyRSxJQUFkLEVBQW9CO0FBQ3pCRSxRQUFBQSxNQUFNLEVBQUVLLE9BQU8sQ0FBQ0osTUFBRCxDQURVO0FBRXpCO0FBQ0FBLFFBQUFBLE1BQU0sRUFBTkE7QUFIeUIsT0FBcEIsQ0FBUDtBQUtEOzs7V0FFRCxxQkFBWUssWUFBWixFQUEwQmxFLFVBQTFCLEVBQXNDO0FBQ3BDLFVBQUksQ0FBQyxLQUFLbUIsaUJBQUwsQ0FBdUJnRCxjQUF2QixDQUFzQ0QsWUFBdEMsQ0FBTCxFQUEwRDtBQUN4RCxlQUFPekgsR0FBUDtBQUNEOztBQUNELGFBQU8sS0FBSzBFLGlCQUFMLENBQXVCK0MsWUFBdkIsRUFBcUNyRSxtQkFBckMsQ0FDTCxLQUFLdkMsS0FBTCxDQUFXQyxVQUFYLENBQXNCMkcsWUFBdEIsQ0FESyxFQUVMLEtBQUsvQyxpQkFBTCxDQUF1QitDLFlBQXZCLENBRkssRUFHTGxFLFVBSEssQ0FBUDtBQUtEOzs7V0FsTkQsNkJBQTJCO0FBQ3pCLGFBQU9lLGtCQUFQO0FBQ0Q7Ozs7OztBQW1OSEMsYUFBYSxDQUFDN0MsaUJBQWQsR0FBa0NBLGlCQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuaW1wb3J0IHtBR0dSRUdBVElPTl9PUEVSQVRJT04sIF9CaW5Tb3J0ZXIgYXMgQmluU29ydGVyfSBmcm9tICdAZGVjay5nbC9hZ2dyZWdhdGlvbi1sYXllcnMnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQge2FnZ3JlZ2F0ZX0gZnJvbSAndXRpbHMvYWdncmVnYXRlLXV0aWxzJztcbmltcG9ydCB7QUdHUkVHQVRJT05fVFlQRVMsIFNDQUxFX0ZVTkN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IERFQ0tfQUdHUkVHQVRJT05fTUFQID0ge1xuICBbQUdHUkVHQVRJT05fT1BFUkFUSU9OLlNVTV06IEFHR1JFR0FUSU9OX1RZUEVTLnN1bSxcbiAgW0FHR1JFR0FUSU9OX09QRVJBVElPTi5NRUFOXTogQUdHUkVHQVRJT05fVFlQRVMuYXZlcmFnZSxcbiAgW0FHR1JFR0FUSU9OX09QRVJBVElPTi5NSU5dOiBBR0dSRUdBVElPTl9UWVBFUy5taW5pbXVtLFxuICBbQUdHUkVHQVRJT05fT1BFUkFUSU9OLk1BWF06IEFHR1JFR0FUSU9OX1RZUEVTLm1heGltdW1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZUZ1bmMoYWdncmVnYXRpb24sIGFjY2Vzc29yKSB7XG4gIGlmICghYWdncmVnYXRpb24gfHwgIUFHR1JFR0FUSU9OX09QRVJBVElPTlthZ2dyZWdhdGlvbi50b1VwcGVyQ2FzZSgpXSkge1xuICAgIENvbnNvbGUud2FybihgQWdncmVnYXRpb24gJHthZ2dyZWdhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG5cbiAgY29uc3Qgb3AgPSBBR0dSRUdBVElPTl9PUEVSQVRJT05bYWdncmVnYXRpb24udG9VcHBlckNhc2UoKV0gfHwgQUdHUkVHQVRJT05fT1BFUkFUSU9OLlNVTTtcbiAgY29uc3Qga2VwbGVyT3AgPSBERUNLX0FHR1JFR0FUSU9OX01BUFtvcF07XG5cbiAgcmV0dXJuIHB0cyA9PiBhZ2dyZWdhdGUocHRzLm1hcChhY2Nlc3NvciksIGtlcGxlck9wKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlRnVuY3RvcihzY2FsZVR5cGUpIHtcbiAgaWYgKCFzY2FsZVR5cGUgfHwgIVNDQUxFX0ZVTkNbc2NhbGVUeXBlXSkge1xuICAgIENvbnNvbGUud2FybihgU2NhbGUgJHtzY2FsZVR5cGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgfVxuICByZXR1cm4gU0NBTEVfRlVOQ1tzY2FsZVR5cGVdIHx8IFNDQUxFX0ZVTkMucXVhbnRpemU7XG59XG5cbmZ1bmN0aW9uIG5vcCgpIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZXRWYWx1ZShzdGVwLCBwcm9wcywgZGltZW5zaW9uVXBkYXRlcikge1xuICBjb25zdCB7a2V5fSA9IGRpbWVuc2lvblVwZGF0ZXI7XG4gIGNvbnN0IHt2YWx1ZSwgd2VpZ2h0LCBhZ2dyZWdhdGlvbn0gPSBzdGVwLnRyaWdnZXJzO1xuXG4gIGxldCBnZXRWYWx1ZSA9IHByb3BzW3ZhbHVlLnByb3BdO1xuXG4gIGlmIChnZXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgIC8vIElmIGBnZXRWYWx1ZWAgaXMgbm90IHByb3ZpZGVkIGZyb20gcHJvcHMsIGJ1aWxkIGl0IHdpdGggYWdncmVnYXRpb24gYW5kIHdlaWdodC5cbiAgICBnZXRWYWx1ZSA9IGdldFZhbHVlRnVuYyhwcm9wc1thZ2dyZWdhdGlvbi5wcm9wXSwgcHJvcHNbd2VpZ2h0LnByb3BdKTtcbiAgfVxuXG4gIGlmIChnZXRWYWx1ZSkge1xuICAgIHRoaXMuX3NldERpbWVuc2lvblN0YXRlKGtleSwge2dldFZhbHVlfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpbWVuc2lvblNvcnRlZEJpbnMoc3RlcCwgcHJvcHMsIGRpbWVuc2lvblVwZGF0ZXIpIHtcbiAgY29uc3Qge2tleX0gPSBkaW1lbnNpb25VcGRhdGVyO1xuICBjb25zdCB7Z2V0VmFsdWV9ID0gdGhpcy5zdGF0ZS5kaW1lbnNpb25zW2tleV07XG5cbiAgY29uc3Qgc29ydGVkQmlucyA9IG5ldyBCaW5Tb3J0ZXIodGhpcy5zdGF0ZS5sYXllckRhdGEuZGF0YSB8fCBbXSwge1xuICAgIGdldFZhbHVlLFxuICAgIGZpbHRlckRhdGE6IHByb3BzLl9maWx0ZXJEYXRhXG4gIH0pO1xuICB0aGlzLl9zZXREaW1lbnNpb25TdGF0ZShrZXksIHtzb3J0ZWRCaW5zfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaW1lbnNpb25WYWx1ZURvbWFpbihzdGVwLCBwcm9wcywgZGltZW5zaW9uVXBkYXRlcikge1xuICBjb25zdCB7a2V5fSA9IGRpbWVuc2lvblVwZGF0ZXI7XG4gIGNvbnN0IHtcbiAgICB0cmlnZ2Vyczoge2xvd2VyUGVyY2VudGlsZSwgdXBwZXJQZXJjZW50aWxlLCBzY2FsZVR5cGV9XG4gIH0gPSBzdGVwO1xuXG4gIGlmICghdGhpcy5zdGF0ZS5kaW1lbnNpb25zW2tleV0uc29ydGVkQmlucykge1xuICAgIC8vIHRoZSBwcmV2aW91cyBzdGVwIHNob3VsZCBzZXQgc29ydGVkQmlucywgaWYgbm90LCBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGZvciBsb2cgYW5kIHNxcnQgc2NhbGUsIHJldHVybnMgbGluZWFyIGRvbWFpbiBieSBkZWZhdWx0XG4gIC8vIFRPRE86IHN1cHBvcnQgb3RoZXIgc2NhbGUgZnVuY3Rpb24gZG9tYWluIGluIGJpbiBzb3J0ZXJcbiAgY29uc3QgdmFsdWVEb21haW4gPSB0aGlzLnN0YXRlLmRpbWVuc2lvbnNba2V5XS5zb3J0ZWRCaW5zLmdldFZhbHVlRG9tYWluQnlTY2FsZShcbiAgICBwcm9wc1tzY2FsZVR5cGUucHJvcF0sXG4gICAgW3Byb3BzW2xvd2VyUGVyY2VudGlsZS5wcm9wXSwgcHJvcHNbdXBwZXJQZXJjZW50aWxlLnByb3BdXVxuICApO1xuXG4gIHRoaXMuX3NldERpbWVuc2lvblN0YXRlKGtleSwge3ZhbHVlRG9tYWlufSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaW1lbnNpb25TY2FsZShzdGVwLCBwcm9wcywgZGltZW5zaW9uVXBkYXRlcikge1xuICBjb25zdCB7a2V5fSA9IGRpbWVuc2lvblVwZGF0ZXI7XG4gIGNvbnN0IHtkb21haW4sIHJhbmdlLCBzY2FsZVR5cGV9ID0gc3RlcC50cmlnZ2VycztcbiAgY29uc3Qge29uU2V0fSA9IHN0ZXA7XG4gIGlmICghdGhpcy5zdGF0ZS5kaW1lbnNpb25zW2tleV0udmFsdWVEb21haW4pIHtcbiAgICAvLyB0aGUgcHJldmlvdXMgc3RlcCBzaG91bGQgc2V0IHZhbHVlRG9tYWluLCBpZiBub3QsIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZGltZW5zaW9uUmFuZ2UgPSBwcm9wc1tyYW5nZS5wcm9wXTtcbiAgY29uc3QgZGltZW5zaW9uRG9tYWluID0gcHJvcHNbZG9tYWluLnByb3BdIHx8IHRoaXMuc3RhdGUuZGltZW5zaW9uc1trZXldLnZhbHVlRG9tYWluO1xuXG4gIGNvbnN0IHNjYWxlRnVuY3RvciA9IGdldFNjYWxlRnVuY3RvcihzY2FsZVR5cGUgJiYgcHJvcHNbc2NhbGVUeXBlLnByb3BdKSgpO1xuXG4gIGNvbnN0IHNjYWxlRnVuYyA9IHNjYWxlRnVuY3Rvci5kb21haW4oZGltZW5zaW9uRG9tYWluKS5yYW5nZShkaW1lbnNpb25SYW5nZSk7XG5cbiAgaWYgKHR5cGVvZiBvblNldCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHByb3BzW29uU2V0LnByb3BzXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb3BzW29uU2V0LnByb3BzXShzY2FsZUZ1bmMuZG9tYWluKCkpO1xuICB9XG4gIHRoaXMuX3NldERpbWVuc2lvblN0YXRlKGtleSwge3NjYWxlRnVuY30pO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVSZXN1bHQocmVzdWx0ID0ge30pIHtcbiAgLy8gc3VwcG9ydCBwcmV2aW91cyBoZXhhZ29uQWdncmVnYXRvciBBUElcbiAgaWYgKHJlc3VsdC5oZXhhZ29ucykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtkYXRhOiByZXN1bHQuaGV4YWdvbnN9LCByZXN1bHQpO1xuICB9IGVsc2UgaWYgKHJlc3VsdC5sYXllckRhdGEpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7ZGF0YTogcmVzdWx0LmxheWVyRGF0YX0sIHJlc3VsdCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdncmVnYXRlZERhdGEoc3RlcCwgcHJvcHMsIGFnZ3JlZ2F0aW9uLCBhZ2dyZWdhdGlvblBhcmFtcykge1xuXG4gIGNvbnNvbGUubG9nKCdnZXQgYWdncmVnYXRlZCBkYXRhJylcbiAgY29uc3Qge1xuICAgIHRyaWdnZXJzOiB7YWdncmVnYXRvcjogYWdncn1cbiAgfSA9IHN0ZXA7XG4gIGNvbnN0IGFnZ3JlZ2F0b3IgPSBwcm9wc1thZ2dyLnByb3BdO1xuXG4gIC8vIHJlc3VsdCBzaG91bGQgY29udGFpbiBhIGRhdGEgYXJyYXkgYW5kIG90aGVyIHByb3BzXG4gIC8vIHJlc3VsdCA9IHtkYXRhOiBbXSwgLi4ub3RoZXIgcHJvcHN9XG4gIGNvbnN0IHJlc3VsdCA9IGFnZ3JlZ2F0b3IocHJvcHMsIGFnZ3JlZ2F0aW9uUGFyYW1zKTtcbiAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgbGF5ZXJEYXRhOiBub3JtYWxpemVSZXN1bHQocmVzdWx0KVxuICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBZ2dyZWdhdGlvbiA9IHtcbiAga2V5OiAncG9zaXRpb24nLFxuICB1cGRhdGVTdGVwczogW1xuICAgIHtcbiAgICAgIGtleTogJ2FnZ3JlZ2F0ZScsXG4gICAgICB0cmlnZ2Vyczoge1xuICAgICAgICBjZWxsU2l6ZToge1xuICAgICAgICAgIHByb3A6ICdjZWxsU2l6ZSdcbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICBwcm9wOiAnZ2V0UG9zaXRpb24nLFxuICAgICAgICAgIHVwZGF0ZVRyaWdnZXI6ICdnZXRQb3NpdGlvbidcbiAgICAgICAgfSxcbiAgICAgICAgYWdncmVnYXRvcjoge1xuICAgICAgICAgIHByb3A6ICdncmlkQWdncmVnYXRvcidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZXI6IGdldEFnZ3JlZ2F0ZWREYXRhXG4gICAgfVxuICBdXG59O1xuXG5mdW5jdGlvbiBnZXRTdWJMYXllckFjY2Vzc29yKGRpbWVuc2lvblN0YXRlLCBkaW1lbnNpb24sIGxheWVyUHJvcHMpIHtcbiAgcmV0dXJuIGNlbGwgPT4ge1xuICAgIGNvbnN0IHtzb3J0ZWRCaW5zLCBzY2FsZUZ1bmN9ID0gZGltZW5zaW9uU3RhdGU7XG4gICAgY29uc3QgYmluID0gc29ydGVkQmlucy5iaW5NYXBbY2VsbC5pbmRleF07XG5cbiAgICBpZiAoYmluICYmIGJpbi5jb3VudHMgPT09IDApIHtcbiAgICAgIC8vIG5vIHBvaW50cyBsZWZ0IGluIGJpbiBhZnRlciBmaWx0ZXJpbmdcbiAgICAgIHJldHVybiBkaW1lbnNpb24ubnVsbFZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGN2ID0gYmluICYmIGJpbi52YWx1ZTtcbiAgICBjb25zdCBkb21haW4gPSBzY2FsZUZ1bmMuZG9tYWluKCk7XG5cbiAgICBjb25zdCBpc1ZhbHVlSW5Eb21haW4gPSBjdiA+PSBkb21haW5bMF0gJiYgY3YgPD0gZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXTtcblxuICAgIC8vIGlmIGNlbGwgdmFsdWUgaXMgb3V0c2lkZSBkb21haW4sIHNldCBhbHBoYSB0byAwXG4gICAgcmV0dXJuIGlzVmFsdWVJbkRvbWFpbiA/IHNjYWxlRnVuYyhjdikgOiBkaW1lbnNpb24ubnVsbFZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbG9yRGltZW5zaW9uID0ge1xuICBrZXk6ICdmaWxsQ29sb3InLFxuICBhY2Nlc3NvcjogJ2dldEZpbGxDb2xvcicsXG4gIGdldFBpY2tpbmdJbmZvOiAoZGltZW5zaW9uU3RhdGUsIGNlbGwpID0+IHtcbiAgICBjb25zdCB7c29ydGVkQmluc30gPSBkaW1lbnNpb25TdGF0ZTtcbiAgICBjb25zdCBjb2xvclZhbHVlID0gc29ydGVkQmlucy5iaW5NYXBbY2VsbC5pbmRleF0gJiYgc29ydGVkQmlucy5iaW5NYXBbY2VsbC5pbmRleF0udmFsdWU7XG4gICAgcmV0dXJuIHtjb2xvclZhbHVlfTtcbiAgfSxcbiAgbnVsbFZhbHVlOiBbMCwgMCwgMCwgMF0sXG4gIHVwZGF0ZVN0ZXBzOiBbXG4gICAge1xuICAgICAga2V5OiAnZ2V0VmFsdWUnLFxuICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBwcm9wOiAnZ2V0Q29sb3JWYWx1ZScsXG4gICAgICAgICAgdXBkYXRlVHJpZ2dlcjogJ2dldENvbG9yVmFsdWUnXG4gICAgICAgIH0sXG4gICAgICAgIHdlaWdodDoge1xuICAgICAgICAgIHByb3A6ICdnZXRDb2xvcldlaWdodCcsXG4gICAgICAgICAgdXBkYXRlVHJpZ2dlcjogJ2dldENvbG9yV2VpZ2h0J1xuICAgICAgICB9LFxuICAgICAgICBhZ2dyZWdhdGlvbjoge1xuICAgICAgICAgIHByb3A6ICdjb2xvckFnZ3JlZ2F0aW9uJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlcjogZ2V0R2V0VmFsdWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2dldEJpbnMnLFxuICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgX2ZpbHRlckRhdGE6IHtcbiAgICAgICAgICBwcm9wOiAnX2ZpbHRlckRhdGEnLFxuICAgICAgICAgIHVwZGF0ZVRyaWdnZXI6ICdfZmlsdGVyRGF0YSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZXI6IGdldERpbWVuc2lvblNvcnRlZEJpbnNcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2dldERvbWFpbicsXG4gICAgICB0cmlnZ2Vyczoge1xuICAgICAgICBsb3dlclBlcmNlbnRpbGU6IHtcbiAgICAgICAgICBwcm9wOiAnbG93ZXJQZXJjZW50aWxlJ1xuICAgICAgICB9LFxuICAgICAgICB1cHBlclBlcmNlbnRpbGU6IHtcbiAgICAgICAgICBwcm9wOiAndXBwZXJQZXJjZW50aWxlJ1xuICAgICAgICB9LFxuICAgICAgICBzY2FsZVR5cGU6IHtwcm9wOiAnY29sb3JTY2FsZVR5cGUnfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZXI6IGdldERpbWVuc2lvblZhbHVlRG9tYWluXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdnZXRTY2FsZUZ1bmMnLFxuICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgZG9tYWluOiB7cHJvcDogJ2NvbG9yRG9tYWluJ30sXG4gICAgICAgIHJhbmdlOiB7cHJvcDogJ2NvbG9yUmFuZ2UnfSxcbiAgICAgICAgc2NhbGVUeXBlOiB7cHJvcDogJ2NvbG9yU2NhbGVUeXBlJ31cbiAgICAgIH0sXG4gICAgICBvblNldDoge1xuICAgICAgICBwcm9wczogJ29uU2V0Q29sb3JEb21haW4nXG4gICAgICB9LFxuICAgICAgdXBkYXRlcjogZ2V0RGltZW5zaW9uU2NhbGVcbiAgICB9XG4gIF0sXG4gIGdldFN1YkxheWVyQWNjZXNzb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RWxldmF0aW9uRGltZW5zaW9uID0ge1xuICBrZXk6ICdlbGV2YXRpb24nLFxuICBhY2Nlc3NvcjogJ2dldEVsZXZhdGlvbicsXG4gIGdldFBpY2tpbmdJbmZvOiAoZGltZW5zaW9uU3RhdGUsIGNlbGwpID0+IHtcbiAgICBjb25zdCB7c29ydGVkQmluc30gPSBkaW1lbnNpb25TdGF0ZTtcbiAgICBjb25zdCBlbGV2YXRpb25WYWx1ZSA9IHNvcnRlZEJpbnMuYmluTWFwW2NlbGwuaW5kZXhdICYmIHNvcnRlZEJpbnMuYmluTWFwW2NlbGwuaW5kZXhdLnZhbHVlO1xuICAgIHJldHVybiB7ZWxldmF0aW9uVmFsdWV9O1xuICB9LFxuICBudWxsVmFsdWU6IC0xLFxuICB1cGRhdGVTdGVwczogW1xuICAgIHtcbiAgICAgIGtleTogJ2dldFZhbHVlJyxcbiAgICAgIHRyaWdnZXJzOiB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgcHJvcDogJ2dldEVsZXZhdGlvblZhbHVlJyxcbiAgICAgICAgICB1cGRhdGVUcmlnZ2VyOiAnZ2V0RWxldmF0aW9uVmFsdWUnXG4gICAgICAgIH0sXG4gICAgICAgIHdlaWdodDoge1xuICAgICAgICAgIHByb3A6ICdnZXRFbGV2YXRpb25XZWlnaHQnLFxuICAgICAgICAgIHVwZGF0ZVRyaWdnZXI6ICdnZXRFbGV2YXRpb25XZWlnaHQnXG4gICAgICAgIH0sXG4gICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgcHJvcDogJ2VsZXZhdGlvbkFnZ3JlZ2F0aW9uJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlcjogZ2V0R2V0VmFsdWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2dldEJpbnMnLFxuICAgICAgdHJpZ2dlcnM6IHtcbiAgICAgICAgX2ZpbHRlckRhdGE6IHtcbiAgICAgICAgICBwcm9wOiAnX2ZpbHRlckRhdGEnLFxuICAgICAgICAgIHVwZGF0ZVRyaWdnZXI6ICdfZmlsdGVyRGF0YSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZXI6IGdldERpbWVuc2lvblNvcnRlZEJpbnNcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2dldERvbWFpbicsXG4gICAgICB0cmlnZ2Vyczoge1xuICAgICAgICBsb3dlclBlcmNlbnRpbGU6IHtcbiAgICAgICAgICBwcm9wOiAnZWxldmF0aW9uTG93ZXJQZXJjZW50aWxlJ1xuICAgICAgICB9LFxuICAgICAgICB1cHBlclBlcmNlbnRpbGU6IHtcbiAgICAgICAgICBwcm9wOiAnZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlJ1xuICAgICAgICB9LFxuICAgICAgICBzY2FsZVR5cGU6IHtwcm9wOiAnZWxldmF0aW9uU2NhbGVUeXBlJ31cbiAgICAgIH0sXG4gICAgICB1cGRhdGVyOiBnZXREaW1lbnNpb25WYWx1ZURvbWFpblxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnZ2V0U2NhbGVGdW5jJyxcbiAgICAgIHRyaWdnZXJzOiB7XG4gICAgICAgIGRvbWFpbjoge3Byb3A6ICdlbGV2YXRpb25Eb21haW4nfSxcbiAgICAgICAgcmFuZ2U6IHtwcm9wOiAnZWxldmF0aW9uUmFuZ2UnfSxcbiAgICAgICAgc2NhbGVUeXBlOiB7cHJvcDogJ2VsZXZhdGlvblNjYWxlVHlwZSd9XG4gICAgICB9LFxuICAgICAgb25TZXQ6IHtcbiAgICAgICAgcHJvcHM6ICdvblNldEVsZXZhdGlvbkRvbWFpbidcbiAgICAgIH0sXG4gICAgICB1cGRhdGVyOiBnZXREaW1lbnNpb25TY2FsZVxuICAgIH1cbiAgXSxcbiAgZ2V0U3ViTGF5ZXJBY2Nlc3NvclxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHREaW1lbnNpb25zID0gW2RlZmF1bHRDb2xvckRpbWVuc2lvbiwgZGVmYXVsdEVsZXZhdGlvbkRpbWVuc2lvbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENQVUFnZ3JlZ2F0b3Ige1xuICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbGF5ZXJEYXRhOiB7fSxcbiAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgLy8gY29sb3I6IHtcbiAgICAgICAgLy8gICBnZXRWYWx1ZTogbnVsbCxcbiAgICAgICAgLy8gICBkb21haW46IG51bGwsXG4gICAgICAgIC8vICAgc29ydGVkQmluczogbnVsbCxcbiAgICAgICAgLy8gICBzY2FsZUZ1bmM6IG5vcFxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBlbGV2YXRpb246IHtcbiAgICAgICAgLy8gICBnZXRWYWx1ZTogbnVsbCxcbiAgICAgICAgLy8gICBkb21haW46IG51bGwsXG4gICAgICAgIC8vICAgc29ydGVkQmluczogbnVsbCxcbiAgICAgICAgLy8gICBzY2FsZUZ1bmM6IG5vcFxuICAgICAgICAvLyB9XG4gICAgICB9LFxuICAgICAgLi4ub3B0cy5pbml0aWFsU3RhdGVcbiAgICB9O1xuICAgIHRoaXMuZGltZW5zaW9uVXBkYXRlcnMgPSB7fTtcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVXBkYXRlciA9IHt9O1xuXG4gICAgdGhpcy5fYWRkRGltZW5zaW9uKG9wdHMuZGltZW5zaW9ucyB8fCBkZWZhdWx0RGltZW5zaW9ucyk7XG4gICAgdGhpcy5fYWRkQWdncmVnYXRpb24ob3B0cy5hZ2dyZWdhdGlvbiB8fCBkZWZhdWx0QWdncmVnYXRpb24pO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHREaW1lbnNpb25zKCkge1xuICAgIHJldHVybiBkZWZhdWx0RGltZW5zaW9ucztcbiAgfVxuXG4gIHVwZGF0ZUFsbERpbWVuc2lvbnMocHJvcHMpIHtcbiAgICBsZXQgZGltZW5zaW9uQ2hhbmdlcyA9IFtdO1xuICAgIC8vIHVwZGF0ZSBhbGwgZGltZW5zaW9uc1xuICAgIGZvciAoY29uc3QgZGltIGluIHRoaXMuZGltZW5zaW9uVXBkYXRlcnMpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZXJzID0gdGhpcy5fYWNjdW11bGF0ZVVwZGF0ZXJzKDAsIHByb3BzLCB0aGlzLmRpbWVuc2lvblVwZGF0ZXJzW2RpbV0pO1xuICAgICAgZGltZW5zaW9uQ2hhbmdlcyA9IGRpbWVuc2lvbkNoYW5nZXMuY29uY2F0KHVwZGF0ZXJzKTtcbiAgICB9XG5cbiAgICBkaW1lbnNpb25DaGFuZ2VzLmZvckVhY2goZiA9PiB0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJyAmJiBmKCkpO1xuICB9XG5cbiAgdXBkYXRlQWdncmVnYXRpb24ocHJvcHMsIGFnZ3JlZ2F0aW9uUGFyYW1zKSB7XG4gICAgY29uc3QgdXBkYXRlcnMgPSB0aGlzLl9hY2N1bXVsYXRlVXBkYXRlcnMoMCwgcHJvcHMsIHRoaXMuYWdncmVnYXRpb25VcGRhdGVyKTtcbiAgICB1cGRhdGVycy5mb3JFYWNoKGYgPT4gdHlwZW9mIGYgPT09ICdmdW5jdGlvbicgJiYgZihhZ2dyZWdhdGlvblBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUob3B0cywgYWdncmVnYXRpb25QYXJhbXMpIHtcbiAgICBjb25zdCB7b2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFnc30gPSBvcHRzO1xuICAgIGxldCBkaW1lbnNpb25DaGFuZ2VzID0gW107XG5cbiAgICBpZiAoY2hhbmdlRmxhZ3MuZGF0YUNoYW5nZWQpIHtcbiAgICAgIC8vIGlmIGRhdGEgY2hhbmdlZCB1cGRhdGUgZXZlcnl0aGluZ1xuICAgICAgdGhpcy51cGRhdGVBZ2dyZWdhdGlvbihwcm9wcywgYWdncmVnYXRpb25QYXJhbXMpO1xuICAgICAgdGhpcy51cGRhdGVBbGxEaW1lbnNpb25zKHByb3BzKTtcblxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgYWdncmVnYXRpb25DaGFuZ2VzID0gdGhpcy5fZ2V0QWdncmVnYXRpb25DaGFuZ2VzKG9sZFByb3BzLCBwcm9wcywgY2hhbmdlRmxhZ3MpO1xuXG4gICAgaWYgKGFnZ3JlZ2F0aW9uQ2hhbmdlcyAmJiBhZ2dyZWdhdGlvbkNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICAvLyBnZXQgYWdncmVnYXRlZERhdGFcbiAgICAgIGFnZ3JlZ2F0aW9uQ2hhbmdlcy5mb3JFYWNoKGYgPT4gdHlwZW9mIGYgPT09ICdmdW5jdGlvbicgJiYgZihhZ2dyZWdhdGlvblBhcmFtcykpO1xuICAgICAgdGhpcy51cGRhdGVBbGxEaW1lbnNpb25zKHByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25seSB1cGRhdGUgZGltZW5zaW9uc1xuICAgICAgZGltZW5zaW9uQ2hhbmdlcyA9IHRoaXMuX2dldERpbWVuc2lvbkNoYW5nZXMob2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFncykgfHwgW107XG4gICAgICBkaW1lbnNpb25DaGFuZ2VzLmZvckVhY2goZiA9PiB0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJyAmJiBmKCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgLy8gVXBkYXRlIHByaXZhdGUgc3RhdGVcbiAgc2V0U3RhdGUodXBkYXRlT2JqZWN0KSB7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHVwZGF0ZU9iamVjdCk7XG4gIH1cblxuICAvLyBVcGRhdGUgcHJpdmF0ZSBzdGF0ZS5kaW1lbnNpb25zXG4gIF9zZXREaW1lbnNpb25TdGF0ZShrZXksIHVwZGF0ZU9iamVjdCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGltZW5zaW9uczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5kaW1lbnNpb25zLCB7XG4gICAgICAgIFtrZXldOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLmRpbWVuc2lvbnNba2V5XSwgdXBkYXRlT2JqZWN0KVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIF9hZGRBZ2dyZWdhdGlvbihhZ2dyZWdhdGlvbikge1xuICAgIHRoaXMuYWdncmVnYXRpb25VcGRhdGVyID0gYWdncmVnYXRpb247XG4gIH1cblxuICBfYWRkRGltZW5zaW9uKGRpbWVuc2lvbnMgPSBbXSkge1xuICAgIGRpbWVuc2lvbnMuZm9yRWFjaChkaW1lbnNpb24gPT4ge1xuICAgICAgY29uc3Qge2tleX0gPSBkaW1lbnNpb247XG4gICAgICB0aGlzLmRpbWVuc2lvblVwZGF0ZXJzW2tleV0gPSBkaW1lbnNpb247XG4gICAgfSk7XG4gIH1cblxuICBfbmVlZFVwZGF0ZVN0ZXAoZGltZW5zaW9uU3RlcCwgb2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFncykge1xuICAgIC8vIHdoZXRoZXIgbmVlZCB0byB1cGRhdGUgY3VycmVudCBkaW1lbnNpb24gc3RlcFxuICAgIC8vIGRpbWVuc2lvbiBzdGVwIGlzIHRoZSB2YWx1ZSwgZG9tYWluLCBzY2FsZUZ1bmN0aW9uIG9mIGVhY2ggZGltZW5zaW9uXG4gICAgLy8gZWFjaCBzdGVwIGlzIGFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgbGlua3MgdG8gbGF5ZXIgcHJvcCBhbmQgd2hldGhlciB0aGUgcHJvcCBpc1xuICAgIC8vIGNvbnRyb2xsZWQgYnkgdXBkYXRlVHJpZ2dlcnNcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhkaW1lbnNpb25TdGVwLnRyaWdnZXJzKS5zb21lKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0udXBkYXRlVHJpZ2dlcikge1xuICAgICAgICAvLyBjaGVjayBiYXNlZCBvbiB1cGRhdGVUcmlnZ2VycyBjaGFuZ2UgZmlyc3RcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBjaGFuZ2VGbGFncy51cGRhdGVUcmlnZ2Vyc0NoYW5nZWQgJiZcbiAgICAgICAgICAoY2hhbmdlRmxhZ3MudXBkYXRlVHJpZ2dlcnNDaGFuZ2VkLmFsbCB8fFxuICAgICAgICAgICAgY2hhbmdlRmxhZ3MudXBkYXRlVHJpZ2dlcnNDaGFuZ2VkW2l0ZW0udXBkYXRlVHJpZ2dlcl0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBmYWxsYmFjayB0byBkaXJlY3QgY29tcGFyaXNvblxuICAgICAgcmV0dXJuIG9sZFByb3BzW2l0ZW0ucHJvcF0gIT09IHByb3BzW2l0ZW0ucHJvcF07XG4gICAgfSk7XG4gIH1cblxuICBfYWNjdW11bGF0ZVVwZGF0ZXJzKHN0ZXAsIHByb3BzLCBkaW1lbnNpb24pIHtcbiAgICBjb25zdCB1cGRhdGVycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSBzdGVwOyBpIDwgZGltZW5zaW9uLnVwZGF0ZVN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZW9mIGRpbWVuc2lvbi51cGRhdGVTdGVwc1tpXS51cGRhdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHVwZGF0ZXJzLnB1c2goXG4gICAgICAgICAgZGltZW5zaW9uLnVwZGF0ZVN0ZXBzW2ldLnVwZGF0ZXIuYmluZCh0aGlzLCBkaW1lbnNpb24udXBkYXRlU3RlcHNbaV0sIHByb3BzLCBkaW1lbnNpb24pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVwZGF0ZXJzO1xuICB9XG5cbiAgX2dldEFsbFVwZGF0ZXJzKGRpbWVuc2lvbiwgb2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFncykge1xuICAgIGxldCB1cGRhdGVycyA9IFtdO1xuICAgIGNvbnN0IG5lZWRVcGRhdGVTdGVwID0gZGltZW5zaW9uLnVwZGF0ZVN0ZXBzLmZpbmRJbmRleChzdGVwID0+XG4gICAgICB0aGlzLl9uZWVkVXBkYXRlU3RlcChzdGVwLCBvbGRQcm9wcywgcHJvcHMsIGNoYW5nZUZsYWdzKVxuICAgICk7XG5cbiAgICBpZiAobmVlZFVwZGF0ZVN0ZXAgPiAtMSkge1xuICAgICAgdXBkYXRlcnMgPSB1cGRhdGVycy5jb25jYXQodGhpcy5fYWNjdW11bGF0ZVVwZGF0ZXJzKG5lZWRVcGRhdGVTdGVwLCBwcm9wcywgZGltZW5zaW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVwZGF0ZXJzO1xuICB9XG5cbiAgX2dldEFnZ3JlZ2F0aW9uQ2hhbmdlcyhvbGRQcm9wcywgcHJvcHMsIGNoYW5nZUZsYWdzKSB7XG4gICAgY29uc3QgdXBkYXRlcnMgPSB0aGlzLl9nZXRBbGxVcGRhdGVycyh0aGlzLmFnZ3JlZ2F0aW9uVXBkYXRlciwgb2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFncyk7XG4gICAgcmV0dXJuIHVwZGF0ZXJzLmxlbmd0aCA/IHVwZGF0ZXJzIDogbnVsbDtcbiAgfVxuXG4gIF9nZXREaW1lbnNpb25DaGFuZ2VzKG9sZFByb3BzLCBwcm9wcywgY2hhbmdlRmxhZ3MpIHtcbiAgICBsZXQgdXBkYXRlcnMgPSBbXTtcblxuICAgIC8vIGdldCBkaW1lbnNpb24gdG8gYmUgdXBkYXRlZFxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGltZW5zaW9uVXBkYXRlcnMpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgZmlyc3QgdHJpZ2dlcmVkIHVwZGF0ZXIgZm9yIGVhY2ggZGltZW5zaW9uXG4gICAgICBjb25zdCBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvblVwZGF0ZXJzW2tleV07XG4gICAgICBjb25zdCBkaW1lbnNpb25VcGRhdGVycyA9IHRoaXMuX2dldEFsbFVwZGF0ZXJzKGRpbWVuc2lvbiwgb2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFncyk7XG4gICAgICB1cGRhdGVycyA9IHVwZGF0ZXJzLmNvbmNhdChkaW1lbnNpb25VcGRhdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVwZGF0ZXJzLmxlbmd0aCA/IHVwZGF0ZXJzIDogbnVsbDtcbiAgfVxuXG4gIGdldFVwZGF0ZVRyaWdnZXJzKHByb3BzKSB7XG4gICAgY29uc3QgX3VwZGF0ZVRyaWdnZXJzID0gcHJvcHMudXBkYXRlVHJpZ2dlcnMgfHwge307XG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGltZW5zaW9uVXBkYXRlcnMpIHtcbiAgICAgIGNvbnN0IHthY2Nlc3NvciwgdXBkYXRlU3RlcHN9ID0gdGhpcy5kaW1lbnNpb25VcGRhdGVyc1trZXldO1xuICAgICAgLy8gZm9sZCBkaW1lbnNpb24gdHJpZ2dlcnMgaW50byBlYWNoIGFjY2Vzc29yXG4gICAgICB1cGRhdGVUcmlnZ2Vyc1thY2Nlc3Nvcl0gPSB7fTtcblxuICAgICAgdXBkYXRlU3RlcHMuZm9yRWFjaChzdGVwID0+IHtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhzdGVwLnRyaWdnZXJzIHx8IFtdKS5mb3JFYWNoKCh7cHJvcCwgdXBkYXRlVHJpZ2dlcn0pID0+IHtcbiAgICAgICAgICBpZiAodXBkYXRlVHJpZ2dlcikge1xuICAgICAgICAgICAgLy8gaWYgcHJvcCBpcyBiYXNlZCBvbiB1cGRhdGVUcmlnZ2VyIGUuZy4gZ2V0Q29sb3JWYWx1ZSwgZ2V0Q29sb3JXZWlnaHRcbiAgICAgICAgICAgIC8vIGFuZCB1cGRhdGVUcmlnZ2VycyBpcyBwYXNzZWQgaW4gZnJvbSBsYXllciBwcm9wXG4gICAgICAgICAgICAvLyBmb2xkIHRoZSB1cGRhdGVUcmlnZ2VycyBpbnRvIGFjY2Vzc29yXG4gICAgICAgICAgICBjb25zdCBmcm9tUHJvcCA9IF91cGRhdGVUcmlnZ2Vyc1t1cGRhdGVUcmlnZ2VyXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZnJvbVByb3AgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGZyb21Qcm9wKSkge1xuICAgICAgICAgICAgICAvLyBpZiB1cGRhdGVUcmlnZ2VyIGlzIGFuIG9iamVjdCBzcHJlYWQgaXRcbiAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih1cGRhdGVUcmlnZ2Vyc1thY2Nlc3Nvcl0sIGZyb21Qcm9wKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZnJvbVByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB1cGRhdGVUcmlnZ2Vyc1thY2Nlc3Nvcl1bcHJvcF0gPSBmcm9tUHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgcHJvcCBpcyBub3QgYmFzZWQgb24gdXBkYXRlVHJpZ2dlclxuICAgICAgICAgICAgdXBkYXRlVHJpZ2dlcnNbYWNjZXNzb3JdW3Byb3BdID0gcHJvcHNbcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB1cGRhdGVUcmlnZ2VycztcbiAgfVxuXG4gIGdldFBpY2tpbmdJbmZvKHtpbmZvfSwgbGF5ZXJQcm9wcykge1xuICAgIGNvbnN0IGlzUGlja2VkID0gaW5mby5waWNrZWQgJiYgaW5mby5pbmRleCA+IC0xO1xuICAgIGxldCBvYmplY3QgPSBudWxsO1xuXG4gICAgaWYgKGlzUGlja2VkKSB7XG4gICAgICBjb25zdCBjZWxsID0gdGhpcy5zdGF0ZS5sYXllckRhdGEuZGF0YVtpbmZvLmluZGV4XTtcblxuICAgICAgbGV0IGJpbkluZm8gPSB7fTtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGltZW5zaW9uVXBkYXRlcnMpIHtcbiAgICAgICAgY29uc3Qge2dldFBpY2tpbmdJbmZvfSA9IHRoaXMuZGltZW5zaW9uVXBkYXRlcnNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRQaWNraW5nSW5mbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGJpbkluZm8gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBiaW5JbmZvLFxuICAgICAgICAgICAgZ2V0UGlja2luZ0luZm8odGhpcy5zdGF0ZS5kaW1lbnNpb25zW2tleV0sIGNlbGwsIGxheWVyUHJvcHMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvYmplY3QgPSBPYmplY3QuYXNzaWduKGJpbkluZm8sIGNlbGwsIHtcbiAgICAgICAgcG9pbnRzOiBjZWxsLmZpbHRlcmVkUG9pbnRzIHx8IGNlbGwucG9pbnRzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYmluICBhbmQgIHRvIGluZm9cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihpbmZvLCB7XG4gICAgICBwaWNrZWQ6IEJvb2xlYW4ob2JqZWN0KSxcbiAgICAgIC8vIG92ZXJyaWRlIG9iamVjdCB3aXRoIHBpY2tlZCBjZWxsXG4gICAgICBvYmplY3RcbiAgICB9KTtcbiAgfVxuXG4gIGdldEFjY2Vzc29yKGRpbWVuc2lvbktleSwgbGF5ZXJQcm9wcykge1xuICAgIGlmICghdGhpcy5kaW1lbnNpb25VcGRhdGVycy5oYXNPd25Qcm9wZXJ0eShkaW1lbnNpb25LZXkpKSB7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaW1lbnNpb25VcGRhdGVyc1tkaW1lbnNpb25LZXldLmdldFN1YkxheWVyQWNjZXNzb3IoXG4gICAgICB0aGlzLnN0YXRlLmRpbWVuc2lvbnNbZGltZW5zaW9uS2V5XSxcbiAgICAgIHRoaXMuZGltZW5zaW9uVXBkYXRlcnNbZGltZW5zaW9uS2V5XSxcbiAgICAgIGxheWVyUHJvcHNcbiAgICApO1xuICB9XG59XG5cbkNQVUFnZ3JlZ2F0b3IuZ2V0RGltZW5zaW9uU2NhbGUgPSBnZXREaW1lbnNpb25TY2FsZTtcbiJdfQ==