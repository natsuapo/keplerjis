"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.df_json_col_to_df = df_json_col_to_df;
exports.kepler_dataset_to_gdf = kepler_dataset_to_gdf;
exports.gdf_to_kepler_dataset = gdf_to_kepler_dataset;
exports.to_key_col_dict = to_key_col_dict;
exports.add_suffix = add_suffix;
exports.add_column_from_list = add_column_from_list;
exports.applymap = applymap;
exports.join_replace = join_replace;
exports.json_normalize = json_normalize;
exports.nested_column_to_df = nested_column_to_df;
exports.unflatten = unflatten;
exports.unnest_dataframe = unnest_dataframe;
exports.spatial_computing = spatial_computing;
exports.range_join = range_join;
exports.GeoDataframe = exports.IndexedDataframe = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dataframeJs = _interopRequireDefault(require("dataframe-js"));

var turf = _interopRequireWildcard(require("@turf/turf"));

var wkx = _interopRequireWildcard(require("wkx"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function df_json_col_to_df(df, col_name) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keep_cols = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['index'];
  var col_filter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'union';
  var target_json = keep_cols ? df.map(function (x) {
    return x.set(col_name, _objectSpread(_objectSpread({}, x.get(col_name)), x.select.apply(x, (0, _toConsumableArray2["default"])(keep_cols)).toDict()));
  }).select(col_name).toDict()[col_name] : df.filter(function (x) {
    return x.get(col_name) !== undefined;
  }).select(col_name).toDict()[col_name];
  var new_df = col_filter === 'intersection' ? new _dataframeJs["default"](target_json) : new _dataframeJs["default"](target_json, Array.from(target_json.map(function (x) {
    return new Set(Object.keys(x));
  }).reduce(function (x, y) {
    return x.union(y);
  }, new Set())));
  return suffix ? add_suffix(new_df, col_name, keep_cols) : new_df;
}

function kepler_dataset_to_gdf(dataset) {
  var geom_col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'geometry';
}

function gdf_to_kepler_dataset(gdf, geom_col) {} //here to ensure


function to_key_col_dict(df, key_col) {
  console.log('to key col dict');
  var dict_list = {};
  df.map(function (x) {
    dict_list[x.get(key_col)] = x.toDict();
  });
  return dict_list;
}

function add_suffix(df, suffix_name, filter_cols) {
  return suffix_name ? df.renameAll(df.listColumns().map(function (x) {
    return filter_cols.includes(x) ? x : suffix_name + '_' + x;
  })) : df;
}

function add_column_from_list(df, list, new_col_name) {
  return df.map(function (row, row_num) {
    return row.set(new_col_name, list[row_num]);
  });
}

function applymap(df, cols, func) {
  if (cols === undefined) {
    cols = df.listColumns();
  }

  return cols.reduce(function (x, y) {
    return x.map(function (row) {
      return row.set(y, func(row.get(y)));
    });
  }, df);
} //todo: make join more easy


function join_replace(df, joint_df) {
  return;
}

function json_normalize(df, json_col) {
  var how = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'inner';

  // @ts-ignore
  if ((0, _typeof2["default"])(df) !== IndexedDataframe) {
    df = new IndexedDataframe(df).df;
  }

  var one_col_df = df_json_col_to_df(df, json_col, json_col, ['index']);
  return df.join(one_col_df, 'index', how).drop(json_col);
}

var IndexedDataframe = /*#__PURE__*/function () {
  function IndexedDataframe(dataframe) {
    (0, _classCallCheck2["default"])(this, IndexedDataframe);
    var count = 0;
    this.df = dataframe.map(function (row) {
      return row.set('index', count++);
    });
    this.name = '';
  }

  (0, _createClass2["default"])(IndexedDataframe, [{
    key: "iloc",
    value: function iloc(x) {
      if ((0, _typeof2["default"])(x) === Array) {}
    }
  }, {
    key: "index",
    value: function index(x) {
      return this.df.select('index').toArray();
    } //for one row loc, for field locs

  }, {
    key: "loc",
    value: function loc(x) {}
  }, {
    key: "setIndex",
    value: function setIndex(x) {}
  }, {
    key: "resetIndex",
    value: function resetIndex(x) {}
  }]);
  return IndexedDataframe;
}(); //for computation, geometry is necessary in some case,seems extend is more ideal?


exports.IndexedDataframe = IndexedDataframe;

var GeoDataframe = /*#__PURE__*/function () {
  function GeoDataframe(dataframe) {
    var geom_col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'geometry';
    var lat_col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var lon_col = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    (0, _classCallCheck2["default"])(this, GeoDataframe);
    // console.log('generate geodataframe')
    var count = 0;
    this.name = '';

    if (lat_col !== null && lon_col !== null) {
      this.df = dataframe.map(function (x) {
        return x.set('geometry', turf.point([x.get(lon_col), x.get(lat_col)]));
      });
      this.geom_col = 'geometry';
    } else {
      if (Array.isArray(geom_col) && geom_col.length === 2) {
        //by default lat,lng order
        this.df = dataframe.map(function (x) {
          return x.set('geometry', turf.point([x.get(geom_col[1]), x.get(geom_col[0])]));
        });
        this.geom_col = 'geometry';
      } else {
        //current geojson is only for geojson data
        if (dataframe.listColumns().includes(geom_col)) {
          dataframe.map(function (x) {
            return x.set(geom_col, turf.feature(x.get(geom_col).geometry));
          });
        }

        this.df = dataframe;
        this.geom_col = geom_col;
      }

      this.geom_type = this.get_geom_type();
    }
  }

  (0, _createClass2["default"])(GeoDataframe, [{
    key: "toDict",
    value: function toDict() {
      return this.df.toDict();
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.df.toArray();
    }
  }, {
    key: "resetGeom",
    value: function resetGeom(col) {}
  }, {
    key: "listColumns",
    value: function listColumns() {
      return this.df.listColumns();
    }
  }, {
    key: "rename",
    value: function rename(col_name, new_col_name) {
      this.df.rename(col_name, new_col_name);

      if (this.geom_col === col_name) {
        this.geom_col = new_col_name;
      }

      return this;
    } //todo: to check the size of the column

  }, {
    key: "concat",
    value: function concat(df) {// this.df.listColumns()

      var name_suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_1';
      var check_size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    }
  }, {
    key: "geometry",
    value: function geometry() {
      return this.df.select(this.geom_col).toDict()[this.geom_col];
    }
  }, {
    key: "dissolve",
    value: function dissolve() {}
  }, {
    key: "toFeatureCollection",
    value: function toFeatureCollection() {
      var _this = this;

      var keep_attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return keep_attr ? turf.featureCollection(this.df.map(function (x) {
        turf.feature(x.get(_this.geom_col), x["delete"](_this.geom_col).toDict());
      }).toArray()) : turf.featureCollection(this.df.map(function (x) {
        return x.select(_this.geom_col);
      }).toDict()[this.geom_col]);
    }
  }, {
    key: "get_geom_type",
    value: function get_geom_type() {
      var _this2 = this;

      console.log('get geom type');
      var geom_type_list = this.df.map(function (x) {
        return x.set('geom_type', x.toDict()[_this2.geom_col].geometry.type);
      }).select('geom_type').toDict()['geom_type'];
      var type_set = Array.from(new Set(geom_type_list));
      return type_set.size > 1 ? "Features" : type_set[0];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var keep_attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return JSON.stringify(this.toFeatureCollection());
    } //todo: unary union setting: this will output a union result of geodata, currently not necessary

  }, {
    key: "union",
    value: function union() {
      // to check if different geometry types matter the result
      // const geom_types = this.geom_type()
      var geom = this.geometry();
      return geom.reduce(function (x, y) {
        return turf.union(x, y);
      });
    } //todo:spatial join another geodataframe, a combination with contains, intersects and within function

  }, {
    key: "spatial_join",
    value: function spatial_join() {}
  }, {
    key: "contains",
    value: function contains(geometry) {
      var _this3 = this;

      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var new_df = this.df.filter(function (x) {
        return turf.booleanContains(x.get(_this3.geom_col), geometry);
      });

      if (!replace) {
        return new GeoDataframe(new_df, this.geom_col);
      } else {
        this.df = new_df;
        return this;
      }
    }
  }, {
    key: "intersects",
    value: function intersects(geometry) {
      var _this4 = this;

      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var new_df = this.df.filter(function (x) {
        return turf.booleanIntersects(x.get(_this4.geom_col), geometry);
      });

      if (!replace) {
        return new GeoDataframe(new_df, this.geom_col);
      } else {
        this.df = new_df;
        return this;
      }
    }
  }, {
    key: "within",
    value: function within(geometry) {
      var _this5 = this;

      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var new_df = this.df.filter(function (x) {
        return turf.booleanWithin(x.get(_this5.geom_col), geometry);
      });

      if (!replace) {
        return new GeoDataframe(new_df, this.geom_col);
      } else {
        this.df = new_df;
        return this;
      }
    }
  }, {
    key: "intersection",
    value: function intersection(geometry) {
      var _this6 = this;

      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var new_df = this.df.filter(function (x) {
        return turf.intersect(x.get(_this6.geom_col), geometry);
      });

      if (!replace) {
        return new GeoDataframe(new_df, this.geom_col);
      } else {
        this.df = new_df;
        return this;
      }
    } //todo: might move the meshcode utils

  }, {
    key: "getMeshCode",
    value: function getMeshCode(geometry) {
      var geom_types = this.geom_type();
    }
  }, {
    key: "toWkt",
    value: function toWkt() {
      var _this7 = this;

      var col_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wkt';

      if (col_name) {
        this.df = this.df.map(function (x) {
          return x.set(col_name, wkx.Geometry.parseGeoJSON(x.get(_this7.geom_col)).toWkt());
        });
      } else {
        return this.df.map(function (x) {
          return x.set('_temp', wkx.Geometry.parseGeoJSON(x.get(_this7.geom_col)).toWkt());
        }).select('_temp');
      }
    }
  }, {
    key: "toWkb",
    value: function toWkb() {
      var _this8 = this;

      var col_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wkb';
      var hex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      console.log('check to wkb');

      if (col_name) {
        // const test = wkx.Geometry.parseGeoJSON(this.df.select(this.geom_col).toArray()[0][0].geometry)
        this.df = this.df.map(function (x) {
          return x.set(col_name, hex ? wkx.Geometry.parseGeoJSON(x.get(_this8.geom_col).geometry).toWkb().toString('hex') : wkx.Geometry.parseGeoJSON(x.get(_this8.geom_col)).toWkb());
        });
      } else {
        return this.df.map(function (x) {
          return x.set('_temp', hex ? wkx.Geometry.parseGeoJSON(x.get(_this8.geom_col).geometry).toWkb().toString('hex') : wkx.Geometry.parseGeoJSON(x.get(_this8.geom_col)).toWkb());
        }).select('_temp');
      }
    } // how to copy a dict.

  }, {
    key: "centroid",
    value: function centroid() {
      var _this9 = this;

      var inplace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!inplace) {
        return this.df.select(this.geom_col).map(function (x) {
          return x.set(_this9.geom_col, turf.centroid(x.get(_this9.geom_col)));
        } // (x) => {
        // const geom = x.get(this.geom_col)
        // const centroid = turf.centroid(geom)
        // return centroid
        // turf.centroid(x.select(this.geom_col))
        // }
        );
      } else {
        this.df = this.df.map(function (x) {
          return x.set(_this9.geom_col, turf.centroid(x.get(_this9.geom_col)));
        });
      }
    } //todo: simplify the geometry info

  }, {
    key: "simplification",
    value: function simplification() {}
  }]);
  return GeoDataframe;
}(); // export function


exports.GeoDataframe = GeoDataframe;

function nested_column_to_df() {}

function unflatten(data) {
  "use strict";

  if (Object(data) !== data || Array.isArray(data)) return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};

  for (var p in data) {
    var cur = resultholder,
        prop = "",
        m;

    while (m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }

    cur[prop] = data[p];
  }

  return resultholder[""] || resultholder;
} //this function is not so easy to be implemented due to the strategy of dataframe-js


function unnest_dataframe(dataframe) {} //todo: in the future this function should be finished, there will be two geom cols, not sure which to save;


function spatial_computing(gdf, joint_gdf, how) {
  var rsuffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '_1';
  //first do the name change
  joint_gdf = rsuffix ? gdf.listColumns().filter(function (x) {
    return joint_gdf.listColumns().includes(x);
  }).reduce(function (x, y) {
    return x.rename(y, y + rsuffix);
  }, joint_gdf) : joint_gdf;
  var final_array = [];
  gdf.df.map(function (x) {
    var intersect_gdf = how === 'within' ? joint_gdf.within(x.get(joint_gdf.geom_col)) : how === 'contains' ? joint_gdf.contains(x.get(gdf.geom_col)) : joint_gdf.intersects(x.get(gdf.geom_xol));
    intersect_gdf.map(function (z) {
      console.log('run od matching');
      var ori_dict = z.toDict();
      var dst_dict = x.toDict();
      Object.keys(ori_dict).map(function (x) {
        Object.keys(dst_dict).includes(x) ? dst_dict[x + '_1'] = ori_dict[x] : dst_dict[x] = ori_dict[x];
      });
      final_array.push(dst_dict);
    });
  });
  return new GeoDataframe(new _dataframeJs["default"](final_array), gdf.geom_col);
} //right on must be a column


function range_join(df, joint_df, left_on, right_on) {
  var rsuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  console.log('range join');
  joint_df = rsuffix ? df.listColumns().filter(function (x) {
    return joint_df.listColumns().includes(x);
  }).reduce(function (x, y) {
    return x.rename(y, y + rsuffix);
  }, joint_df) : joint_df;
  var final_array = [];
  joint_df.map(function (x) {
    var filtered_result = df.filter(function (y) {
      return x.get(right_on[0]) <= y.get(left_on) && y.get(left_on) <= x.get(right_on[1]);
    });
    filtered_result.map(function (z) {
      console.log('run od matching');
      var ori_dict = z.toDict();
      var dst_dict = x.toDict();
      Object.keys(ori_dict).map(function (x) {
        Object.keys(dst_dict).includes(x) ? dst_dict[x + '_1'] = ori_dict[x] : dst_dict[x] = ori_dict[x];
      });
      final_array.push(dst_dict);
    });
  });
  return new _dataframeJs["default"](final_array);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhZnJhbWUtdXRpbHMuanMiXSwibmFtZXMiOlsiZGZfanNvbl9jb2xfdG9fZGYiLCJkZiIsImNvbF9uYW1lIiwic3VmZml4Iiwia2VlcF9jb2xzIiwiY29sX2ZpbHRlciIsInRhcmdldF9qc29uIiwibWFwIiwieCIsInNldCIsImdldCIsInNlbGVjdCIsInRvRGljdCIsImZpbHRlciIsInVuZGVmaW5lZCIsIm5ld19kZiIsIkRhdGFGcmFtZSIsIkFycmF5IiwiZnJvbSIsIlNldCIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJ5IiwidW5pb24iLCJhZGRfc3VmZml4Iiwia2VwbGVyX2RhdGFzZXRfdG9fZ2RmIiwiZGF0YXNldCIsImdlb21fY29sIiwiZ2RmX3RvX2tlcGxlcl9kYXRhc2V0IiwiZ2RmIiwidG9fa2V5X2NvbF9kaWN0Iiwia2V5X2NvbCIsImNvbnNvbGUiLCJsb2ciLCJkaWN0X2xpc3QiLCJzdWZmaXhfbmFtZSIsImZpbHRlcl9jb2xzIiwicmVuYW1lQWxsIiwibGlzdENvbHVtbnMiLCJpbmNsdWRlcyIsImFkZF9jb2x1bW5fZnJvbV9saXN0IiwibGlzdCIsIm5ld19jb2xfbmFtZSIsInJvdyIsInJvd19udW0iLCJhcHBseW1hcCIsImNvbHMiLCJmdW5jIiwiam9pbl9yZXBsYWNlIiwiam9pbnRfZGYiLCJqc29uX25vcm1hbGl6ZSIsImpzb25fY29sIiwiaG93IiwiSW5kZXhlZERhdGFmcmFtZSIsIm9uZV9jb2xfZGYiLCJqb2luIiwiZHJvcCIsImRhdGFmcmFtZSIsImNvdW50IiwibmFtZSIsInRvQXJyYXkiLCJHZW9EYXRhZnJhbWUiLCJsYXRfY29sIiwibG9uX2NvbCIsInR1cmYiLCJwb2ludCIsImlzQXJyYXkiLCJsZW5ndGgiLCJmZWF0dXJlIiwiZ2VvbWV0cnkiLCJnZW9tX3R5cGUiLCJnZXRfZ2VvbV90eXBlIiwiY29sIiwicmVuYW1lIiwibmFtZV9zdWZmaXgiLCJjaGVja19zaXplIiwia2VlcF9hdHRyIiwiZmVhdHVyZUNvbGxlY3Rpb24iLCJnZW9tX3R5cGVfbGlzdCIsInR5cGUiLCJ0eXBlX3NldCIsInNpemUiLCJKU09OIiwic3RyaW5naWZ5IiwidG9GZWF0dXJlQ29sbGVjdGlvbiIsImdlb20iLCJyZXBsYWNlIiwiYm9vbGVhbkNvbnRhaW5zIiwiYm9vbGVhbkludGVyc2VjdHMiLCJib29sZWFuV2l0aGluIiwiaW50ZXJzZWN0IiwiZ2VvbV90eXBlcyIsIndreCIsIkdlb21ldHJ5IiwicGFyc2VHZW9KU09OIiwidG9Xa3QiLCJoZXgiLCJ0b1drYiIsInRvU3RyaW5nIiwiaW5wbGFjZSIsImNlbnRyb2lkIiwibmVzdGVkX2NvbHVtbl90b19kZiIsInVuZmxhdHRlbiIsImRhdGEiLCJyZWdleCIsInJlc3VsdGhvbGRlciIsInAiLCJjdXIiLCJwcm9wIiwibSIsImV4ZWMiLCJ1bm5lc3RfZGF0YWZyYW1lIiwic3BhdGlhbF9jb21wdXRpbmciLCJqb2ludF9nZGYiLCJyc3VmZml4IiwiZmluYWxfYXJyYXkiLCJpbnRlcnNlY3RfZ2RmIiwid2l0aGluIiwiY29udGFpbnMiLCJpbnRlcnNlY3RzIiwiZ2VvbV94b2wiLCJ6Iiwib3JpX2RpY3QiLCJkc3RfZGljdCIsInB1c2giLCJyYW5nZV9qb2luIiwibGVmdF9vbiIsInJpZ2h0X29uIiwiZmlsdGVyZWRfcmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRU8sU0FBU0EsaUJBQVQsQ0FBMkJDLEVBQTNCLEVBQThCQyxRQUE5QixFQUEwRjtBQUFBLE1BQW5EQyxNQUFtRCx1RUFBNUMsSUFBNEM7QUFBQSxNQUF2Q0MsU0FBdUMsdUVBQTdCLENBQUMsT0FBRCxDQUE2QjtBQUFBLE1BQW5CQyxVQUFtQix1RUFBUixPQUFRO0FBQzdGLE1BQU1DLFdBQVcsR0FBR0YsU0FBUyxHQUFDSCxFQUFFLENBQUNNLEdBQUgsQ0FBTyxVQUFDQyxDQUFEO0FBQUEsV0FBS0Es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QUFtQm1ILFFBQVEsQ0FBQ25ILENBQUQsQ0FBN0QsR0FBaUVvSCxRQUFRLENBQUNwSCxDQUFELENBQVIsR0FBWW1ILFFBQVEsQ0FBQ25ILENBQUQsQ0FBckY7QUFDRCxPQUZEO0FBR0E0RyxNQUFBQSxXQUFXLENBQUNTLElBQVosQ0FBaUJELFFBQWpCO0FBQ0QsS0FSRDtBQVNELEdBWEQ7QUFZQSxTQUFPLElBQUk1Ryx1QkFBSixDQUFjb0csV0FBZCxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgRGF0YUZyYW1lIGZyb20gJ2RhdGFmcmFtZS1qcyc7XG5pbXBvcnQgKiBhcyB0dXJmIGZyb20gJ0B0dXJmL3R1cmYnO1xuXG5pbXBvcnQgKiBhcyB3a3ggZnJvbSAnd2t4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGRmX2pzb25fY29sX3RvX2RmKGRmLGNvbF9uYW1lLHN1ZmZpeD1udWxsLGtlZXBfY29scz1bJ2luZGV4J10sY29sX2ZpbHRlcj0ndW5pb24nKXtcbiAgICBjb25zdCB0YXJnZXRfanNvbiA9IGtlZXBfY29scz9kZi5tYXAoKHgpPT54LnNldChjb2xfbmFtZSx7Li4ueC5nZXQoY29sX25hbWUpLC4uLnguc2VsZWN0KC4uLmtlZXBfY29scykudG9EaWN0KCl9KSkuc2VsZWN0KGNvbF9uYW1lKS50b0RpY3QoKVtjb2xfbmFtZV06ZGYuZmlsdGVyKCh4KT0+eC5nZXQoY29sX25hbWUpICE9PSB1bmRlZmluZWQpLnNlbGVjdChjb2xfbmFtZSkudG9EaWN0KClbY29sX25hbWVdXG4gICAgY29uc3QgbmV3X2RmID0gY29sX2ZpbHRlcj09PSdpbnRlcnNlY3Rpb24nP25ldyBEYXRhRnJhbWUodGFyZ2V0X2pzb24pOm5ldyBEYXRhRnJhbWUodGFyZ2V0X2pzb24sQXJyYXkuZnJvbSh0YXJnZXRfanNvbi5tYXAoKHgpPT5uZXcgU2V0KE9iamVjdC5rZXlzKHgpKSkucmVkdWNlKCh4LHkpPT54LnVuaW9uKHkpLG5ldyBTZXQoKSkpKVxuICAgIHJldHVybiBzdWZmaXg/YWRkX3N1ZmZpeChuZXdfZGYsY29sX25hbWUsa2VlcF9jb2xzKTpuZXdfZGZcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtlcGxlcl9kYXRhc2V0X3RvX2dkZihkYXRhc2V0LGdlb21fY29sPSdnZW9tZXRyeScpe1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZGZfdG9fa2VwbGVyX2RhdGFzZXQoZ2RmLGdlb21fY29sKXtcblxufVxuXG4vL2hlcmUgdG8gZW5zdXJlXG5leHBvcnQgZnVuY3Rpb24gdG9fa2V5X2NvbF9kaWN0KGRmLGtleV9jb2wpe1xuICBjb25zb2xlLmxvZygndG8ga2V5IGNvbCBkaWN0Jyk7XG4gIGNvbnN0IGRpY3RfbGlzdCA9IHt9XG4gIGRmLm1hcCh4PT57XG4gICAgZGljdF9saXN0W3guZ2V0KGtleV9jb2wpXSA9IHgudG9EaWN0KClcbiAgfSlcblxuICByZXR1cm4gZGljdF9saXN0XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZF9zdWZmaXgoZGYsc3VmZml4X25hbWUsZmlsdGVyX2NvbHMpe1xuICAgIHJldHVybiBzdWZmaXhfbmFtZT9kZi5yZW5hbWVBbGwoZGYubGlzdENvbHVtbnMoKS5tYXAoKHgpPT5maWx0ZXJfY29scy5pbmNsdWRlcyh4KT94OnN1ZmZpeF9uYW1lICsgJ18nICsgeCkpOmRmXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRfY29sdW1uX2Zyb21fbGlzdChkZixsaXN0LG5ld19jb2xfbmFtZSl7XG4gIHJldHVybiBkZi5tYXAoKHJvdyxyb3dfbnVtKT0+IHJvdy5zZXQobmV3X2NvbF9uYW1lLGxpc3Rbcm93X251bV0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHltYXAoZGYsY29scyxmdW5jKXtcbiAgaWYoY29scyA9PT0gdW5kZWZpbmVkKXtcbiAgICBjb2xzID0gZGYubGlzdENvbHVtbnMoKVxuICB9XG4gIHJldHVybiBjb2xzLnJlZHVjZSgoeCwgeSkgPT4ge1xuICAgIHJldHVybiB4Lm1hcChyb3cgPT4gcm93LnNldCh5LCBmdW5jKHJvdy5nZXQoeSkpKSlcbiAgfSwgZGYpXG59XG5cblxuLy90b2RvOiBtYWtlIGpvaW4gbW9yZSBlYXN5XG5leHBvcnQgZnVuY3Rpb24gam9pbl9yZXBsYWNlKGRmLGpvaW50X2RmKXtcbiAgcmV0dXJuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uX25vcm1hbGl6ZShkZixqc29uX2NvbCxob3c9J2lubmVyJyl7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYodHlwZW9mKGRmKSAhPT0gSW5kZXhlZERhdGFmcmFtZSl7XG4gICAgZGYgPSBuZXcgSW5kZXhlZERhdGFmcmFtZShkZikuZGZcbiAgfVxuICBjb25zdCBvbmVfY29sX2RmID0gZGZfanNvbl9jb2xfdG9fZGYoZGYsanNvbl9jb2wsanNvbl9jb2wsWydpbmRleCddKVxuICByZXR1cm4gZGYuam9pbihvbmVfY29sX2RmLCdpbmRleCcsaG93KS5kcm9wKGpzb25fY29sKVxufVxuXG5leHBvcnQgY2xhc3MgSW5kZXhlZERhdGFmcmFtZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YWZyYW1lKXtcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICB0aGlzLmRmID0gZGF0YWZyYW1lLm1hcChyb3c9PnJvdy5zZXQoJ2luZGV4Jyxjb3VudCsrKSlcbiAgICAgICAgdGhpcy5uYW1lID0gJydcbiAgICB9O1xuXG4gICAgaWxvYyh4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHgpID09PSBBcnJheSkge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleCh4KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGYuc2VsZWN0KCdpbmRleCcpLnRvQXJyYXkoKVxuICAgIH1cblxuICAgIC8vZm9yIG9uZSByb3cgbG9jLCBmb3IgZmllbGQgbG9jc1xuICAgIGxvYyh4KXtcblxuICAgIH1cblxuICAgIHNldEluZGV4KHgpe1xuXG4gICAgfVxuXG4gICAgcmVzZXRJbmRleCh4KXtcblxuICAgIH1cblxufVxuXG4vL2ZvciBjb21wdXRhdGlvbiwgZ2VvbWV0cnkgaXMgbmVjZXNzYXJ5IGluIHNvbWUgY2FzZSxzZWVtcyBleHRlbmQgaXMgbW9yZSBpZGVhbD9cbmV4cG9ydCBjbGFzcyBHZW9EYXRhZnJhbWV7XG4gIGNvbnN0cnVjdG9yKGRhdGFmcmFtZSxnZW9tX2NvbD0nZ2VvbWV0cnknLGxhdF9jb2w9bnVsbCxsb25fY29sPW51bGwpe1xuICAgIC8vIGNvbnNvbGUubG9nKCdnZW5lcmF0ZSBnZW9kYXRhZnJhbWUnKVxuICAgIGxldCBjb3VudCA9IDBcbiAgICB0aGlzLm5hbWUgPSAnJ1xuICAgIGlmKGxhdF9jb2whPT1udWxsICYmIGxvbl9jb2whPT1udWxsKXtcbiAgICAgIHRoaXMuZGYgPSBkYXRhZnJhbWUubWFwKCh4KT0+eC5zZXQoJ2dlb21ldHJ5Jyx0dXJmLnBvaW50KFt4LmdldChsb25fY29sKSx4LmdldChsYXRfY29sKV0pKSlcbiAgICAgIHRoaXMuZ2VvbV9jb2wgPSAnZ2VvbWV0cnknXG4gICAgfWVsc2V7XG5cbiAgICAgIGlmKEFycmF5LmlzQXJyYXkoZ2VvbV9jb2wpICYmIGdlb21fY29sLmxlbmd0aD09PTIpe1xuICAgICAgICAvL2J5IGRlZmF1bHQgbGF0LGxuZyBvcmRlclxuICAgICAgICB0aGlzLmRmID0gZGF0YWZyYW1lLm1hcCgoeCk9Pnguc2V0KCdnZW9tZXRyeScsdHVyZi5wb2ludChbeC5nZXQoZ2VvbV9jb2xbMV0pLHguZ2V0KGdlb21fY29sWzBdKV0pKSlcbiAgICAgICAgdGhpcy5nZW9tX2NvbCA9ICdnZW9tZXRyeSdcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvL2N1cnJlbnQgZ2VvanNvbiBpcyBvbmx5IGZvciBnZW9qc29uIGRhdGFcbiAgICAgICAgaWYgKGRhdGFmcmFtZS5saXN0Q29sdW1ucygpLmluY2x1ZGVzKGdlb21fY29sKSkge1xuICAgICAgICAgIGRhdGFmcmFtZS5tYXAoKHgpID0+IHguc2V0KGdlb21fY29sLCB0dXJmLmZlYXR1cmUoeC5nZXQoZ2VvbV9jb2wpLmdlb21ldHJ5KSkpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZiA9IGRhdGFmcmFtZVxuICAgICAgICB0aGlzLmdlb21fY29sID0gZ2VvbV9jb2xcblxuICAgICAgfVxuXG4gICAgICB0aGlzLmdlb21fdHlwZSA9IHRoaXMuZ2V0X2dlb21fdHlwZSgpXG4gICAgfVxuICB9O1xuXG4gIHRvRGljdCgpe1xuICAgIHJldHVybiB0aGlzLmRmLnRvRGljdCgpXG4gIH1cblxuICB0b0FycmF5KCl7XG4gICAgcmV0dXJuIHRoaXMuZGYudG9BcnJheSgpXG4gIH1cblxuICByZXNldEdlb20oY29sKXtcblxuICB9XG5cbiAgbGlzdENvbHVtbnMoKXtcbiAgICByZXR1cm4gdGhpcy5kZi5saXN0Q29sdW1ucygpXG5cbiAgfVxuXG4gIHJlbmFtZShjb2xfbmFtZSxuZXdfY29sX25hbWUpe1xuICAgIHRoaXMuZGYucmVuYW1lKGNvbF9uYW1lLG5ld19jb2xfbmFtZSlcbiAgICBpZih0aGlzLmdlb21fY29sID09PSBjb2xfbmFtZSl7XG4gICAgICB0aGlzLmdlb21fY29sID0gbmV3X2NvbF9uYW1lXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvL3RvZG86IHRvIGNoZWNrIHRoZSBzaXplIG9mIHRoZSBjb2x1bW5cbiAgY29uY2F0KGRmLG5hbWVfc3VmZml4PSdfMScsY2hlY2tfc2l6ZT10cnVlKXtcbiAgICAvLyB0aGlzLmRmLmxpc3RDb2x1bW5zKClcbiAgfVxuXG4gIGdlb21ldHJ5KCl7XG4gICAgcmV0dXJuIHRoaXMuZGYuc2VsZWN0KHRoaXMuZ2VvbV9jb2wpLnRvRGljdCgpW3RoaXMuZ2VvbV9jb2xdXG4gIH1cblxuICBkaXNzb2x2ZSgpe1xuXG4gIH1cblxuICB0b0ZlYXR1cmVDb2xsZWN0aW9uKGtlZXBfYXR0cj1mYWxzZSkge1xuICAgIHJldHVybiBrZWVwX2F0dHIgPyB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKHRoaXMuZGYubWFwKCh4KSA9PiB7XG4gICAgICAgIHR1cmYuZmVhdHVyZSh4LmdldCh0aGlzLmdlb21fY29sKSwgeC5kZWxldGUodGhpcy5nZW9tX2NvbCkudG9EaWN0KCkpXG4gICAgICB9KS50b0FycmF5KCkpXG4gICAgICA6IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24odGhpcy5kZi5tYXAoKHgpID0+ICh4LnNlbGVjdCh0aGlzLmdlb21fY29sKSkpLnRvRGljdCgpW3RoaXMuZ2VvbV9jb2xdKVxuICB9XG5cbiAgZ2V0X2dlb21fdHlwZSgpIHtcbiAgICBjb25zb2xlLmxvZygnZ2V0IGdlb20gdHlwZScpXG4gICAgY29uc3QgZ2VvbV90eXBlX2xpc3QgPSB0aGlzLmRmLm1hcCgoeCkgPT4geC5zZXQoJ2dlb21fdHlwZScsIHgudG9EaWN0KClbdGhpcy5nZW9tX2NvbF0uZ2VvbWV0cnkudHlwZSkpLnNlbGVjdCgnZ2VvbV90eXBlJykudG9EaWN0KClbJ2dlb21fdHlwZSddXG4gICAgY29uc3QgdHlwZV9zZXQgPSBBcnJheS5mcm9tKG5ldyBTZXQoZ2VvbV90eXBlX2xpc3QpKVxuICAgIHJldHVybiB0eXBlX3NldC5zaXplID4gMSA/IFwiRmVhdHVyZXNcIiA6IHR5cGVfc2V0WzBdXG4gIH1cblxuICB0b0pTT04oa2VlcF9hdHRyPWZhbHNlKXsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9GZWF0dXJlQ29sbGVjdGlvbigpKX1cblxuICAvL3RvZG86IHVuYXJ5IHVuaW9uIHNldHRpbmc6IHRoaXMgd2lsbCBvdXRwdXQgYSB1bmlvbiByZXN1bHQgb2YgZ2VvZGF0YSwgY3VycmVudGx5IG5vdCBuZWNlc3NhcnlcbiAgdW5pb24oKXtcbiAgICAvLyB0byBjaGVjayBpZiBkaWZmZXJlbnQgZ2VvbWV0cnkgdHlwZXMgbWF0dGVyIHRoZSByZXN1bHRcbiAgICAvLyBjb25zdCBnZW9tX3R5cGVzID0gdGhpcy5nZW9tX3R5cGUoKVxuICAgIGNvbnN0IGdlb20gPSB0aGlzLmdlb21ldHJ5KClcbiAgICByZXR1cm4gZ2VvbS5yZWR1Y2UoKHgseSk9PnR1cmYudW5pb24oeCx5KSlcbiAgfVxuXG4gIC8vdG9kbzpzcGF0aWFsIGpvaW4gYW5vdGhlciBnZW9kYXRhZnJhbWUsIGEgY29tYmluYXRpb24gd2l0aCBjb250YWlucywgaW50ZXJzZWN0cyBhbmQgd2l0aGluIGZ1bmN0aW9uXG4gIHNwYXRpYWxfam9pbigpe1xuXG4gIH1cblxuICBjb250YWlucyhnZW9tZXRyeSxyZXBsYWNlPXRydWUpe1xuICAgIGNvbnN0IG5ld19kZiA9IHRoaXMuZGYuZmlsdGVyKCh4KT0+dHVyZi5ib29sZWFuQ29udGFpbnMoeC5nZXQodGhpcy5nZW9tX2NvbCksZ2VvbWV0cnkpKVxuICAgIGlmKCFyZXBsYWNlKXtcbiAgICAgIHJldHVybiBuZXcgR2VvRGF0YWZyYW1lKG5ld19kZix0aGlzLmdlb21fY29sKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5kZiA9IG5ld19kZlxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBpbnRlcnNlY3RzKGdlb21ldHJ5LHJlcGxhY2U9dHJ1ZSl7XG4gICAgY29uc3QgbmV3X2RmID0gdGhpcy5kZi5maWx0ZXIoKHgpPT50dXJmLmJvb2xlYW5JbnRlcnNlY3RzKHguZ2V0KHRoaXMuZ2VvbV9jb2wpLGdlb21ldHJ5KSlcbiAgICBpZighcmVwbGFjZSl7XG4gICAgICByZXR1cm4gbmV3IEdlb0RhdGFmcmFtZShuZXdfZGYsdGhpcy5nZW9tX2NvbClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRoaXMuZGYgPSBuZXdfZGZcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgd2l0aGluKGdlb21ldHJ5LHJlcGxhY2U9dHJ1ZSl7XG4gICAgY29uc3QgbmV3X2RmID0gdGhpcy5kZi5maWx0ZXIoKHgpPT50dXJmLmJvb2xlYW5XaXRoaW4oeC5nZXQodGhpcy5nZW9tX2NvbCksZ2VvbWV0cnkpKVxuICAgIGlmKCFyZXBsYWNlKXtcbiAgICAgIHJldHVybiBuZXcgR2VvRGF0YWZyYW1lKG5ld19kZix0aGlzLmdlb21fY29sKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5kZiA9IG5ld19kZlxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oZ2VvbWV0cnkscmVwbGFjZT10cnVlKXtcbiAgICBjb25zdCBuZXdfZGYgPSB0aGlzLmRmLmZpbHRlcigoeCk9PnR1cmYuaW50ZXJzZWN0KHguZ2V0KHRoaXMuZ2VvbV9jb2wpLGdlb21ldHJ5KSlcbiAgICBpZighcmVwbGFjZSl7XG4gICAgICByZXR1cm4gbmV3IEdlb0RhdGFmcmFtZShuZXdfZGYsdGhpcy5nZW9tX2NvbClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRoaXMuZGYgPSBuZXdfZGZcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgLy90b2RvOiBtaWdodCBtb3ZlIHRoZSBtZXNoY29kZSB1dGlsc1xuICBnZXRNZXNoQ29kZShnZW9tZXRyeSl7XG4gICAgY29uc3QgZ2VvbV90eXBlcyA9IHRoaXMuZ2VvbV90eXBlKClcblxuICB9XG5cbiAgdG9Xa3QoY29sX25hbWU9J3drdCcpe1xuICAgIGlmKGNvbF9uYW1lKXtcbiAgICAgIHRoaXMuZGYgPSB0aGlzLmRmLm1hcCgoeCk9Pnguc2V0KGNvbF9uYW1lLHdreC5HZW9tZXRyeS5wYXJzZUdlb0pTT04oeC5nZXQodGhpcy5nZW9tX2NvbCkpLnRvV2t0KCkpKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgcmV0dXJuIHRoaXMuZGYubWFwKCh4KT0+eC5zZXQoJ190ZW1wJyx3a3guR2VvbWV0cnkucGFyc2VHZW9KU09OKHguZ2V0KHRoaXMuZ2VvbV9jb2wpKS50b1drdCgpKSkuc2VsZWN0KCdfdGVtcCcpXG4gICAgfVxuICB9XG5cbiAgdG9Xa2IoY29sX25hbWU9J3drYicsaGV4PXRydWUpe1xuICAgIGNvbnNvbGUubG9nKCdjaGVjayB0byB3a2InKVxuICAgIGlmKGNvbF9uYW1lKXtcbiAgICAgIC8vIGNvbnN0IHRlc3QgPSB3a3guR2VvbWV0cnkucGFyc2VHZW9KU09OKHRoaXMuZGYuc2VsZWN0KHRoaXMuZ2VvbV9jb2wpLnRvQXJyYXkoKVswXVswXS5nZW9tZXRyeSlcbiAgICAgIHRoaXMuZGYgPSB0aGlzLmRmLm1hcCgoeCk9Pnguc2V0KGNvbF9uYW1lLGhleD93a3guR2VvbWV0cnkucGFyc2VHZW9KU09OKHguZ2V0KHRoaXMuZ2VvbV9jb2wpLmdlb21ldHJ5KS50b1drYigpLnRvU3RyaW5nKCdoZXgnKTp3a3guR2VvbWV0cnkucGFyc2VHZW9KU09OKHguZ2V0KHRoaXMuZ2VvbV9jb2wpKS50b1drYigpKSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiB0aGlzLmRmLm1hcCgoeCk9Pnguc2V0KCdfdGVtcCcsaGV4P3dreC5HZW9tZXRyeS5wYXJzZUdlb0pTT04oeC5nZXQodGhpcy5nZW9tX2NvbCkuZ2VvbWV0cnkpLnRvV2tiKCkudG9TdHJpbmcoJ2hleCcpOndreC5HZW9tZXRyeS5wYXJzZUdlb0pTT04oeC5nZXQodGhpcy5nZW9tX2NvbCkpLnRvV2tiKCkpKS5zZWxlY3QoJ190ZW1wJylcbiAgICB9XG4gIH1cbiAgLy8gaG93IHRvIGNvcHkgYSBkaWN0LlxuICBjZW50cm9pZChpbnBsYWNlPWZhbHNlKXtcbiAgICBpZighaW5wbGFjZSl7XG4gICAgICByZXR1cm4gdGhpcy5kZi5zZWxlY3QodGhpcy5nZW9tX2NvbCkubWFwKFxuICAgICAgICAoeCkgPT4geC5zZXQodGhpcy5nZW9tX2NvbCx0dXJmLmNlbnRyb2lkKHguZ2V0KHRoaXMuZ2VvbV9jb2wpKSlcbiAgICAgICAgLy8gKHgpID0+IHtcbiAgICAgICAgLy8gY29uc3QgZ2VvbSA9IHguZ2V0KHRoaXMuZ2VvbV9jb2wpXG4gICAgICAgIC8vIGNvbnN0IGNlbnRyb2lkID0gdHVyZi5jZW50cm9pZChnZW9tKVxuICAgICAgICAvLyByZXR1cm4gY2VudHJvaWRcbiAgICAgICAgLy8gdHVyZi5jZW50cm9pZCh4LnNlbGVjdCh0aGlzLmdlb21fY29sKSlcbiAgICAgICAgLy8gfVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGYgPSB0aGlzLmRmLm1hcCgoeCkgPT4geC5zZXQodGhpcy5nZW9tX2NvbCwgdHVyZi5jZW50cm9pZCh4LmdldCh0aGlzLmdlb21fY29sKSkpKVxuICAgIH1cbiAgfVxuXG4gIC8vdG9kbzogc2ltcGxpZnkgdGhlIGdlb21ldHJ5IGluZm9cbiAgc2ltcGxpZmljYXRpb24oKXtcblxuICB9XG5cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uXG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5lc3RlZF9jb2x1bW5fdG9fZGYoKXt9XG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiB1bmZsYXR0ZW4oZGF0YSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGlmIChPYmplY3QoZGF0YSkgIT09IGRhdGEgfHwgQXJyYXkuaXNBcnJheShkYXRhKSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgdmFyIHJlZ2V4ID0gL1xcLj8oW14uXFxbXFxdXSspfFxcWyhcXGQrKVxcXS9nLFxuICAgICAgICByZXN1bHRob2xkZXIgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIGRhdGEpIHtcbiAgICAgICAgdmFyIGN1ciA9IHJlc3VsdGhvbGRlcixcbiAgICAgICAgICAgIHByb3AgPSBcIlwiLFxuICAgICAgICAgICAgbTtcbiAgICAgICAgd2hpbGUgKG0gPSByZWdleC5leGVjKHApKSB7XG4gICAgICAgICAgICBjdXIgPSBjdXJbcHJvcF0gfHwgKGN1cltwcm9wXSA9IChtWzJdID8gW10gOiB7fSkpO1xuICAgICAgICAgICAgcHJvcCA9IG1bMl0gfHwgbVsxXTtcbiAgICAgICAgfVxuICAgICAgICBjdXJbcHJvcF0gPSBkYXRhW3BdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0aG9sZGVyW1wiXCJdIHx8IHJlc3VsdGhvbGRlcjtcbn1cblxuXG4vL3RoaXMgZnVuY3Rpb24gaXMgbm90IHNvIGVhc3kgdG8gYmUgaW1wbGVtZW50ZWQgZHVlIHRvIHRoZSBzdHJhdGVneSBvZiBkYXRhZnJhbWUtanNcbmV4cG9ydCBmdW5jdGlvbiB1bm5lc3RfZGF0YWZyYW1lKGRhdGFmcmFtZSl7XG5cbn1cblxuXG4vL3RvZG86IGluIHRoZSBmdXR1cmUgdGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgZmluaXNoZWQsIHRoZXJlIHdpbGwgYmUgdHdvIGdlb20gY29scywgbm90IHN1cmUgd2hpY2ggdG8gc2F2ZTtcbmV4cG9ydCBmdW5jdGlvbiBzcGF0aWFsX2NvbXB1dGluZyhnZGYsam9pbnRfZ2RmLGhvdyxyc3VmZml4PSdfMScpe1xuXG4gIC8vZmlyc3QgZG8gdGhlIG5hbWUgY2hhbmdlXG4gIGpvaW50X2dkZiA9IHJzdWZmaXg/Z2RmLmxpc3RDb2x1bW5zKCkuZmlsdGVyKCh4KT0+am9pbnRfZ2RmLmxpc3RDb2x1bW5zKCkuaW5jbHVkZXMoeCkpLnJlZHVjZSgoeCx5KT0+eC5yZW5hbWUoeSx5ICsgcnN1ZmZpeCksam9pbnRfZ2RmKTpqb2ludF9nZGZcblxuICBjb25zdCBmaW5hbF9hcnJheSA9IFtdXG5cbiAgZ2RmLmRmLm1hcCgoeCk9PiB7XG4gICAgY29uc3QgaW50ZXJzZWN0X2dkZiA9IGhvdyA9PT0gJ3dpdGhpbic/am9pbnRfZ2RmLndpdGhpbih4LmdldChqb2ludF9nZGYuZ2VvbV9jb2wpKTpob3c9PT0nY29udGFpbnMnP2pvaW50X2dkZi5jb250YWlucyh4LmdldChnZGYuZ2VvbV9jb2wpKTpqb2ludF9nZGYuaW50ZXJzZWN0cyh4LmdldChnZGYuZ2VvbV94b2wpKVxuICAgIGludGVyc2VjdF9nZGYubWFwKCh6KT0+e1xuICAgICAgY29uc29sZS5sb2coJ3J1biBvZCBtYXRjaGluZycpXG4gICAgICBjb25zdCBvcmlfZGljdCA9IHoudG9EaWN0KCk7XG4gICAgICBjb25zdCBkc3RfZGljdCA9IHgudG9EaWN0KCk7XG4gICAgICBPYmplY3Qua2V5cyhvcmlfZGljdCkubWFwKCh4KT0+e1xuICAgICAgICBPYmplY3Qua2V5cyhkc3RfZGljdCkuaW5jbHVkZXMoeCk/ZHN0X2RpY3RbeCArICdfMSddPW9yaV9kaWN0W3hdOmRzdF9kaWN0W3hdPW9yaV9kaWN0W3hdXG4gICAgICB9KVxuICAgICAgZmluYWxfYXJyYXkucHVzaChkc3RfZGljdClcbiAgICB9KVxuICB9KVxuICByZXR1cm4gbmV3IEdlb0RhdGFmcmFtZShuZXcgRGF0YUZyYW1lKGZpbmFsX2FycmF5KSxnZGYuZ2VvbV9jb2wpXG59XG5cbi8vcmlnaHQgb24gbXVzdCBiZSBhIGNvbHVtblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlX2pvaW4oZGYsam9pbnRfZGYsbGVmdF9vbixyaWdodF9vbixyc3VmZml4PWZhbHNlKXtcbiAgY29uc29sZS5sb2coJ3JhbmdlIGpvaW4nKVxuICBqb2ludF9kZiA9IHJzdWZmaXg/ZGYubGlzdENvbHVtbnMoKS5maWx0ZXIoKHgpPT5qb2ludF9kZi5saXN0Q29sdW1ucygpLmluY2x1ZGVzKHgpKS5yZWR1Y2UoKHgseSk9PngucmVuYW1lKHkseSArIHJzdWZmaXgpLGpvaW50X2RmKTpqb2ludF9kZlxuICBjb25zdCBmaW5hbF9hcnJheSA9IFtdXG4gIGpvaW50X2RmLm1hcCgoeCk9PntcbiAgICBjb25zdCBmaWx0ZXJlZF9yZXN1bHQgPSBkZi5maWx0ZXIoKHkpPT4oKHguZ2V0KHJpZ2h0X29uWzBdKTw9IHkuZ2V0KGxlZnRfb24pKSAmJiAoeS5nZXQobGVmdF9vbik8PXguZ2V0KHJpZ2h0X29uWzFdKSkpKVxuICAgIGZpbHRlcmVkX3Jlc3VsdC5tYXAoKHopPT57XG4gICAgICBjb25zb2xlLmxvZygncnVuIG9kIG1hdGNoaW5nJylcbiAgICAgIGNvbnN0IG9yaV9kaWN0ID0gei50b0RpY3QoKTtcbiAgICAgIGNvbnN0IGRzdF9kaWN0ID0geC50b0RpY3QoKTtcbiAgICAgIE9iamVjdC5rZXlzKG9yaV9kaWN0KS5tYXAoKHgpPT57XG4gICAgICAgIE9iamVjdC5rZXlzKGRzdF9kaWN0KS5pbmNsdWRlcyh4KT9kc3RfZGljdFt4ICsgJ18xJ109b3JpX2RpY3RbeF06ZHN0X2RpY3RbeF09b3JpX2RpY3RbeF1cbiAgICAgIH0pXG4gICAgICBmaW5hbF9hcnJheS5wdXNoKGRzdF9kaWN0KVxuICAgIH0pXG4gIH0pXG4gIHJldHVybiBuZXcgRGF0YUZyYW1lKGZpbmFsX2FycmF5KVxufVxuXG5cblxuIl19