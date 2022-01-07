"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply_func_column = apply_func_column;
exports.update_dataset_column_with_list = update_dataset_column_with_list;
exports.get_idx_by_name = get_idx_by_name;
exports.generate_dataframe_from_dataset = generate_dataframe_from_dataset;
exports.delete_dataset_column = delete_dataset_column;
exports.copy_rename_dataset_column = copy_rename_dataset_column;
exports.dataset_joining = dataset_joining;
exports.get_minmax_by_col_name = get_minmax_by_col_name;
exports.range_joining = range_joining;
exports.spatial_join_dataset = spatial_join_dataset;
exports.reset_index_dataset = reset_index_dataset;
exports.add_dataset_column = add_dataset_column;
exports.distinct_value_lists = distinct_value_lists;
exports.exportFilteringProcess = exportFilteringProcess;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _dataframeJs = _interopRequireDefault(require("dataframe-js"));

var _dataframeUtils = require("./dataframe-utils");

var _actions = require("../actions/actions");

var _dataProcessor = require("../processors/data-processor");

var _sampleTripData = _interopRequireDefault(require("../../examples/demo-app/src/data/sample-trip-data"));

var _lodash = _interopRequireDefault(require("lodash"));

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
function apply_func_column(dataset, func, field_name, new_field_name) {
  var alldata = dataset.allData;
  var df = new _dataframeJs["default"](alldata);
  var json_df = df.renameAll(dataset.fields.map(function (x) {
    return x.name;
  }));
  var fieldIdx = dataset.fields.findIndex(function (f) {
    return f.name === field_name;
  }); // alldata.map((x=>x.set(new_field_name),)

  df.map(function (row, row_num) {
    row.set(new_field_name, func(row.get(field_name)));
  }); // dataset.fields
} //todo: currently not support insert in any location, only the last one with no pair computed


function update_dataset_column_with_list(dataset, field_name, datalist) {
  var fieldIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // const alldata = dataset.allData
  // const df = new DataFrame(alldata)
  // const json_df = df.renameAll(dataset.fields.map((x)=>x.name))
  // const fieldIdx = dataset.fields.findIndex(f => f.name === field_name);
  dataset.dataContainer._numColumns = dataset.dataContainer._numColumns + 1;
}

function get_idx_by_name(dataset, name) {
  var total_fields = dataset.fields.filter(function (x) {
    return x.name === name;
  });
  return total_fields.length ? total_fields[0].fieldIdx : null;
}

function generate_dataframe_from_dataset(dataset) {
  var geom_col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var lat_col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var lon_col = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  console.log('generate dataframe from dataset');
  var dataContainer = dataset.dataContainer;
  var df = new _dataframeJs["default"](dataContainer._rows);
  var json_df = df.renameAll(dataset.fields.map(function (x) {
    return x.name;
  }));

  if (geom_col !== null || lat_col !== null && lon_col !== null) {
    // @ts-ignore
    return geom_col ? new _dataframeUtils.GeoDataframe(json_df, geom_col) : new _dataframeUtils.GeoDataframe(json_df, null, lat_col, lon_col);
  }

  return json_df;
}

function delete_dataset_column(dataset, drop_field_name) {
  // let df = new DataFrame(dataset['timelineObjects'])
  //currently cannot used in gpu filtering:
  console.log('delete dataset column'); // const dataContainer = dataset.dataContainer
  // const df = new DataFrame(dataContainer._rows)
  // const json_df = df.renameAll(dataset.fields.map((x)=>x.name))

  var json_df = generate_dataframe_from_dataset(dataset); // const gdf = new GeoDataframe(json_df,'_geometry')

  var fieldIdx = dataset.fields.findIndex(function (f) {
    return f.name === drop_field_name;
  });
  dataset.fields = dataset.fields.map(function (x) {
    return x.fieldIdx === fieldIdx ? null : x.fieldIdx > fieldIdx ? function () {
      x.fieldIdx = x.fieldIdx - 1;
      return x;
    }() : x;
  }).filter(function (x) {
    return x !== null;
  });
  dataset.dataContainer._rows = json_df.drop(drop_field_name).toArray();
  dataset.dataContainer._numColumns = dataset.dataContainer._numColumns - 1; // dataset.filteredIndexForDomain = dataset.filteredIndexForDomain.map((x)=>x>fieldIdx-1?x-1:x===fieldIdx-1?null:x).filter((x)=>x!==null)
  // dataset.allIndexes = dataset.allIndexes.map((x)=>x>fieldIdx-1?x-1:x===fieldIdx-1?null:x).filter((x)=>x!==null)
  // dataset.filteredIndex = dataset.filteredIndex.map((x)=>x>fieldIdx-1?x-1:x===fieldIdx-1?null:x).filter((x)=>x!==null)
  // dataset.filteredIndexForDomain = filtered_list
  // ['filteredIndex','allIndexes','filteredIndexForDomain'].map((x)=>dataset[x] = dataset[x].map((y)=>y>fieldIdx-1?y-1:y===fieldIdx-1?null:y).filter((z)=>z!==null))

  dataset.fieldPairs.map(function (x) {
    return x.pair = pair_recomputing(x.pair, fieldIdx);
  });
  return dataset;
} //this function is to copy or rename the exisiting column


function copy_rename_dataset_column(dataset, col_name, new_name) {
  var rename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  // let df = new DataFrame(dataset['timelineObjects'])
  //currently cannot used in gpu filtering:
  console.log('rename dataset column');

  if (rename) {
    dataset.fields = dataset.fields.map(function (x) {
      x.name === col_name ? x.name = new_name : x.name;
      return x;
    }); // dataset.fieldPairs.map()
  } else {
    dataset = add_dataset_column(dataset, new_name, dataset.fields.filter(function (x) {
      return x.name == col_name;
    })[0].type);
  }

  return dataset;
}

function pair_recomputing(pair, target_idx) {
  // @ts-ignore
  Object.keys(pair).forEach(function (x) {
    if (pair[x].fieldIdx === target_idx) {
      return null;
    } else if (pair[x].fieldIdx > target_idx) {
      pair[x].fieldIdx = pair[x].fieldIdx - 1;
    }
  });
  return pair;
} //if conducting inner join, then there will be several rows that are not available


function dataset_joining(dataset, join_dataset, how) {
  var generate_new_dataset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var left_on = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var right_on = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var on = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

  try {
    console.log('run dataset joining'); //better to generate a dict column:

    var df = generate_dataframe_from_dataset(dataset);

    if (left_on === right_on) {
      on = left_on;
    } //remove duplicate name


    var duplicate_columns = dataset.fields.map(function (x) {
      return x.name;
    }).filter(function (y) {
      return join_dataset.fields.map(function (x) {
        return x.name;
      }).includes(y) && y != on;
    });
    var new_join_dataset = duplicate_columns.reduce(function (ds, x) {
      return copy_rename_dataset_column(ds, x, x + '_1');
    }, join_dataset);
    var joint_df = generate_dataframe_from_dataset(new_join_dataset); // const total_list = new_join_dataset.fields.concat(dataset.fields)
    // const duplicate_columns = joint_df.listColumns().filter((x)=>df.listColumns().includes(x) && x!==on)

    var out_df = df.join(right_on ? joint_df.rename(right_on, left_on) : joint_df, left_on ? left_on : on, how ? how : 'inner'); // out_df.listColumns()
    // change duplicate columns:
    // duplicate_columns.map((x)=>)
    //change field info:
    // const fields = out_df.listColumns().map((x,index)=>{
    //   const result_col = total_list.filter((y)=>y.name === x)[0]
    //   result_col.fieldIdx = x
    //   return result_col
    // })
    // require to consider the new data structure
    // dataset.dataContainer._rows = dataset.dataContainer._rows.map((x, index) => (x.concat([values[index][col_id]])));
    //here use processCSVData will cause the lost of the column pairs, but still there seems to be no better and easier solution.

    return (0, _dataProcessor.processCsvData)(out_df.toArray(), out_df.listColumns());
  } catch (e) {
    console.log(e);
    return dataset;
  }
}

function get_minmax_by_col_name(dataset, col_name) {
  try {
    var filter_columns = dataset.fields.filter(function (x) {
      return x.name === col_name;
    });

    if (filter_columns.length > 0) {
      console.log('get minmax');
      var filter_column = filter_columns[0];
      var sliced_data = [];

      if (/date/.test(filter_column.type)) {
        sliced_data = dataset.dataContainer._rows.map(function (row) {
          return new Date(row[filter_column.fieldIdx]);
        });
      } else {
        sliced_data = dataset.dataContainer._rows.map(function (row) {
          return row[filter_column.fieldIdx];
        });
      }

      var result = sliced_data.reduce(function (acc, row) {
        acc[0] = acc[0] === undefined || row < acc[0] ? row : acc[0];
        acc[1] = acc[1] === undefined || row > acc[1] ? row : acc[1];
        return acc;
      }, []);
      return result;
    }
  } catch (e) {
    return [];
  }
}

function range_joining(dataset, join_dataset, how, generate_new_dataset, left_on, right_on) {
  var join_cols = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  console.log('time od joining');
  var df = generate_dataframe_from_dataset(dataset); // if(dataset.fields.filter((x)=>x.name==left_on).type)
  //todo: add same type check;

  var duplicate_columns = dataset.fields.map(function (x) {
    return x.name;
  }).filter(function (y) {
    return join_dataset.fields.map(function (x) {
      return x.name;
    }).includes(y);
  });
  var new_join_dataset = duplicate_columns.reduce(function (ds, x) {
    return copy_rename_dataset_column(ds, x, x + '_1');
  }, join_dataset);
  var joint_df = generate_dataframe_from_dataset(new_join_dataset); // df.map((x)=>joint_df.filter((y)=>y.get(right_on[0]) <= x.get(left_on) <= y.get(right_on[1]))).toArray()
  // joint_df.map((x)=>df.filter((y)=>((x.get(right_on[0])<= y.get(left_on)) && (y.get(left_on)<=x.get(right_on[1])))).map((z)=>{return {...z.toDict(),...x.toDict()}}))

  if (join_cols) {
    var out_df = (0, _dataframeUtils.range_join)(df, joint_df, left_on, right_on);
    return (0, _dataProcessor.processCsvData)(out_df.toArray(), out_df.listColumns());
  } else {
    var spans = joint_df.restructure(right_on).toArray();
    dataset.dataContainer._rows = df.filter(function (x) {
      return spans.some(function (y) {
        return y[0] <= x.get(left_on) && y[1] >= x.get(left_on);
      });
    }).toArray();
    return dataset;
  } // const final_array = []
  // joint_df.map((x)=>{
  //   const filtered_result = df.filter((y)=>((x.get(right_on[0])<= y.get(left_on)) && (y.get(left_on)<=x.get(right_on[1]))))
  //   filtered_result.map((z)=>{
  //     console.log('run od matching')
  //     const ori_dict = z.toDict();
  //     const dst_dict = x.toDict();
  //     Object.keys(ori_dict).map((x)=>{
  //       Object.keys(dst_dict).includes(x)?dst_dict[x + '_1']=ori_dict[x]:dst_dict[x]=ori_dict[x]
  //     })
  //     final_array.push(dst_dict)
  //   })
  // })
  // console.log('finish join')
  // const out_df = new DataFrame(final_array)

} //here, join will join all the fields expect for the spatial field


function spatial_join_dataset(dataset, join_dataset, geom_col, join_geom_col, how, generate_new_dataset) {
  var df = generate_dataframe_from_dataset(dataset, geom_col);
  var joint_df = generate_dataframe_from_dataset(join_dataset, join_geom_col);
  df.intersects();
}

function reset_index_dataset(dataset) {
  var new_index = (0, _toConsumableArray2["default"])(Array(dataset.dataContainer._rows.length).keys());
  dataset.allIndexes = new_index;
  dataset.filteredIndex = new_index;
  dataset.filteredIndexForDomain = new_index;
  return dataset;
}

function add_dataset_column(dataset, column, data_type, values) {
  var replace_dup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  console.log('add dataset column here'); // dataset.fields.filter((x)=>column == x.name)

  var column_list = typeof column == 'string' ? [column] : column;
  column_list.map(function (col, col_id) {
    var remaining_cols = dataset.fields.filter(function (x) {
      return col === x.name;
    });

    if (remaining_cols.length === 0 || replace_dup === false) {
      var column_spec = {
        analyzerType: data_type.toUpperCase(),
        displayName: remaining_cols.length === 0 ? col : col + '_1',
        fieldIdx: dataset.fields.length,
        format: '',
        id: col,
        name: col,
        type: data_type
      };
      dataset.dataContainer._rows = dataset.dataContainer._rows.map(function (x, index) {
        return x.concat([values[index][col_id]]);
      });
      dataset.fields.push(column_spec);
      dataset.dataContainer._numColumns = dataset.dataContainer._numColumns + 1;
    } else {
      var _column_spec = remaining_cols[0];
      _column_spec['analyzerType'] = data_type.toUpperCase();
      _column_spec['type'] = data_type;
      dataset.fields[_column_spec.fieldIdx] = _column_spec;
      dataset.dataContainer._rows = dataset.dataContainer._rows.map(function (x, index) {
        x[_column_spec.fieldIdx] = [values[index][col_id]];
        return x;
      });
    }
  });
  return dataset;
}

function distinct_value_lists(dataset, col_names) {
  var dropna = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  console.log('distinct value list');
  var value_array = col_names.reduce(function (value, col) {
    return value.concat(_lodash["default"].uniq(dataset.fields.filter(function (x) {
      return x.name === col;
    }).map(function (x) {
      return x.fieldIdx;
    }).reduce(function (value, idx) {
      return value.concat(dataset.dataContainer._rows.map(function (x) {
        return x[idx];
      }));
    }, [])));
  }, []);
  return dropna ? _lodash["default"].uniq(value_array).filter(function (x) {
    return x != undefined;
  }) : _lodash["default"].uniq(value_array);
}

function exportFilteringProcess(datasets, exportSetting) {
  var outData = exportSetting.outData,
      outColumns = exportSetting.outColumns,
      header = exportSetting.header;
  var outDataDict = {};

  if (outData.includes('activity information')) {}

  if (outData.includes('visited place information')) {}

  if (outData.includes('matched GPS data')) {}
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhc2V0LWV4dGVuc2lvbi11dGlscy5qcyJdLCJuYW1lcyI6WyJhcHBseV9mdW5jX2NvbHVtbiIsImRhdGFzZXQiLCJmdW5jIiwiZmllbGRfbmFtZSIsIm5ld19maWVsZF9uYW1lIiwiYWxsZGF0YSIsImFsbERhdGEiLCJkZiIsIkRhdGFGcmFtZSIsImpzb25fZGYiLCJyZW5hbWVBbGwiLCJmaWVsZHMiLCJtYXAiLCJ4IiwibmFtZSIsImZpZWxkSWR4IiwiZmluZEluZGV4IiwiZiIsInJvdyIsInJvd19udW0iLCJzZXQiLCJnZXQiLCJ1cGRhdGVfZGF0YXNldF9jb2x1bW5fd2l0aF9saXN0IiwiZGF0YWxpc3QiLCJmaWVsZEluZGV4IiwiZGF0YUNvbnRhaW5lciIsIl9udW1Db2x1bW5zIiwiZ2V0X2lkeF9ieV9uYW1lIiwidG90YWxfZmllbGRzIiwiZmlsdGVyIiwibGVuZ3RoIiwiZ2VuZXJhdGVfZGF0YWZyYW1lX2Zyb21fZGF0YXNldCIsImdlb21fY29sIiwibGF0X2NvbCIsImxvbl9jb2wiLCJjb25zb2xlIiwibG9nIiwiX3Jvd3MiLCJHZW9EYXRhZnJhbWUiLCJkZWxldGVfZGF0YXNldF9jb2x1bW4iLCJkcm9wX2ZpZWxkX25hbWUiLCJkcm9wIiwidG9BcnJheSIsImZpZWxkUGFpcnMiLCJwYWlyIiwicGFpcl9yZWNvbXB1dGluZyIsImNvcHlfcmVuYW1lX2RhdGFzZXRfY29sdW1uIiwiY29sX25hbWUiLCJuZXdfbmFtZSIsInJlbmFtZSIsImFkZF9kYXRhc2V0X2NvbHVtbiIsInR5cGUiLCJ0YXJnZXRfaWR4IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJkYXRhc2V0X2pvaW5pbmciLCJqb2luX2RhdGFzZXQiLCJob3ciLCJnZW5lcmF0ZV9uZXdfZGF0YXNldCIsImxlZnRfb24iLCJyaWdodF9vbiIsIm9uIiwiZHVwbGljYXRlX2NvbHVtbnMiLCJ5IiwiaW5jbHVkZXMiLCJuZXdfam9pbl9kYXRhc2V0IiwicmVkdWNlIiwiZHMiLCJqb2ludF9kZiIsIm91dF9kZiIsImpvaW4iLCJsaXN0Q29sdW1ucyIsImUiLCJnZXRfbWlubWF4X2J5X2NvbF9uYW1lIiwiZmlsdGVyX2NvbHVtbnMiLCJmaWx0ZXJfY29sdW1uIiwic2xpY2VkX2RhdGEiLCJ0ZXN0IiwiRGF0ZSIsInJlc3VsdCIsImFjYyIsInVuZGVmaW5lZCIsInJhbmdlX2pvaW5pbmciLCJqb2luX2NvbHMiLCJzcGFucyIsInJlc3RydWN0dXJlIiwic29tZSIsInNwYXRpYWxfam9pbl9kYXRhc2V0Iiwiam9pbl9nZW9tX2NvbCIsImludGVyc2VjdHMiLCJyZXNldF9pbmRleF9kYXRhc2V0IiwibmV3X2luZGV4IiwiQXJyYXkiLCJhbGxJbmRleGVzIiwiZmlsdGVyZWRJbmRleCIsImZpbHRlcmVkSW5kZXhGb3JEb21haW4iLCJjb2x1bW4iLCJkYXRhX3R5cGUiLCJ2YWx1ZXMiLCJyZXBsYWNlX2R1cCIsImNvbHVtbl9saXN0IiwiY29sIiwiY29sX2lkIiwicmVtYWluaW5nX2NvbHMiLCJjb2x1bW5fc3BlYyIsImFuYWx5emVyVHlwZSIsInRvVXBwZXJDYXNlIiwiZGlzcGxheU5hbWUiLCJmb3JtYXQiLCJpZCIsImluZGV4IiwiY29uY2F0IiwicHVzaCIsImRpc3RpbmN0X3ZhbHVlX2xpc3RzIiwiY29sX25hbWVzIiwiZHJvcG5hIiwidmFsdWVfYXJyYXkiLCJ2YWx1ZSIsIl8iLCJ1bmlxIiwiaWR4IiwiZXhwb3J0RmlsdGVyaW5nUHJvY2VzcyIsImRhdGFzZXRzIiwiZXhwb3J0U2V0dGluZyIsIm91dERhdGEiLCJvdXRDb2x1bW5zIiwiaGVhZGVyIiwib3V0RGF0YURpY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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T0FBTyxDQUFDd0IsYUFBUixDQUFzQlksS0FBdEIsQ0FBNEJ6QixHQUE1QixDQUFnQyxVQUFBQyxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDNEcsR0FBRCxDQUFMO0FBQUEsT0FBakMsQ0FBYixDQUFoQjtBQUFBLEtBQTNFLEVBQXVKLEVBQXZKLENBQVAsQ0FBYixDQUFoQjtBQUFBLEdBQWpCLEVBQW1OLEVBQW5OLENBQXBCO0FBQ0EsU0FBT0wsTUFBTSxHQUFDRyxtQkFBRUMsSUFBRixDQUFPSCxXQUFQLEVBQW9CeEYsTUFBcEIsQ0FBMkIsVUFBQWhCLENBQUM7QUFBQSxXQUFFQSxDQUFDLElBQUVxRSxTQUFMO0FBQUEsR0FBNUIsQ0FBRCxHQUE2Q3FDLG1CQUFFQyxJQUFGLENBQU9ILFdBQVAsQ0FBMUQ7QUFDRDs7QUFHTSxTQUFTSyxzQkFBVCxDQUFnQ0MsUUFBaEMsRUFBeUNDLGFBQXpDLEVBQXVEO0FBQUEsTUFDckRDLE9BRHFELEdBQ3hCRCxhQUR3QixDQUNyREMsT0FEcUQ7QUFBQSxNQUM3Q0MsVUFENkMsR0FDeEJGLGFBRHdCLENBQzdDRSxVQUQ2QztBQUFBLE1BQ2xDQyxNQURrQyxHQUN4QkgsYUFEd0IsQ0FDbENHLE1BRGtDO0FBRzVELE1BQU1DLFdBQVcsR0FBRyxFQUFwQjs7QUFFQSxNQUFHSCxPQUFPLENBQUM1RCxRQUFSLENBQWlCLHNCQUFqQixDQUFILEVBQTRDLENBRTNDOztBQUVELE1BQUc0RCxPQUFPLENBQUM1RCxRQUFSLENBQWlCLDJCQUFqQixDQUFILEVBQWlELENBRWhEOztBQUVELE1BQUc0RCxPQUFPLENBQUM1RCxRQUFSLENBQWlCLGtCQUFqQixDQUFILEVBQXdDLENBRXZDO0FBSUYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgRGF0YUZyYW1lIGZyb20gJ2RhdGFmcmFtZS1qcyc7XG5pbXBvcnQge0dlb0RhdGFmcmFtZSwgcmFuZ2Vfam9pbn0gZnJvbSAnLi9kYXRhZnJhbWUtdXRpbHMnO1xuaW1wb3J0IHthZGREYXRhVG9NYXB9IGZyb20gJy4uL2FjdGlvbnMvYWN0aW9ucyc7XG5pbXBvcnQge3Byb2Nlc3NDc3ZEYXRhfSBmcm9tICcuLi9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCBzYW1wbGVUcmlwRGF0YSBmcm9tICcuLi8uLi9leGFtcGxlcy9kZW1vLWFwcC9zcmMvZGF0YS9zYW1wbGUtdHJpcC1kYXRhJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5X2Z1bmNfY29sdW1uKGRhdGFzZXQsIGZ1bmMsIGZpZWxkX25hbWUsIG5ld19maWVsZF9uYW1lKSB7XG4gIGNvbnN0IGFsbGRhdGEgPSBkYXRhc2V0LmFsbERhdGE7XG4gIGNvbnN0IGRmID0gbmV3IERhdGFGcmFtZShhbGxkYXRhKTtcbiAgY29uc3QganNvbl9kZiA9IGRmLnJlbmFtZUFsbChkYXRhc2V0LmZpZWxkcy5tYXAoKHgpID0+IHgubmFtZSkpO1xuICBjb25zdCBmaWVsZElkeCA9IGRhdGFzZXQuZmllbGRzLmZpbmRJbmRleChmID0+IGYubmFtZSA9PT0gZmllbGRfbmFtZSk7XG4gIC8vIGFsbGRhdGEubWFwKCh4PT54LnNldChuZXdfZmllbGRfbmFtZSksKVxuICBkZi5tYXAoKHJvdywgcm93X251bSkgPT4ge1xuICAgIHJvdy5zZXQobmV3X2ZpZWxkX25hbWUsIGZ1bmMocm93LmdldChmaWVsZF9uYW1lKSkpO1xuICB9KTtcbiAgLy8gZGF0YXNldC5maWVsZHNcbn1cblxuXG5cbi8vdG9kbzogY3VycmVudGx5IG5vdCBzdXBwb3J0IGluc2VydCBpbiBhbnkgbG9jYXRpb24sIG9ubHkgdGhlIGxhc3Qgb25lIHdpdGggbm8gcGFpciBjb21wdXRlZFxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9kYXRhc2V0X2NvbHVtbl93aXRoX2xpc3QoZGF0YXNldCwgZmllbGRfbmFtZSwgZGF0YWxpc3QsIGZpZWxkSW5kZXggPSBudWxsKSB7XG4gIC8vIGNvbnN0IGFsbGRhdGEgPSBkYXRhc2V0LmFsbERhdGFcbiAgLy8gY29uc3QgZGYgPSBuZXcgRGF0YUZyYW1lKGFsbGRhdGEpXG4gIC8vIGNvbnN0IGpzb25fZGYgPSBkZi5yZW5hbWVBbGwoZGF0YXNldC5maWVsZHMubWFwKCh4KT0+eC5uYW1lKSlcbiAgLy8gY29uc3QgZmllbGRJZHggPSBkYXRhc2V0LmZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IGZpZWxkX25hbWUpO1xuICBkYXRhc2V0LmRhdGFDb250YWluZXIuX251bUNvbHVtbnMgPSBkYXRhc2V0LmRhdGFDb250YWluZXIuX251bUNvbHVtbnMgKyAxO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRfaWR4X2J5X25hbWUoZGF0YXNldCxuYW1lKXtcbiAgY29uc3QgdG90YWxfZmllbGRzID0gZGF0YXNldC5maWVsZHMuZmlsdGVyKHg9PngubmFtZSA9PT0gbmFtZSlcbiAgcmV0dXJuIHRvdGFsX2ZpZWxkcy5sZW5ndGg/dG90YWxfZmllbGRzWzBdLmZpZWxkSWR4Om51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlX2RhdGFmcmFtZV9mcm9tX2RhdGFzZXQoZGF0YXNldCwgZ2VvbV9jb2wgPSBudWxsLGxhdF9jb2w9bnVsbCxsb25fY29sPW51bGwpIHtcbiAgY29uc29sZS5sb2coJ2dlbmVyYXRlIGRhdGFmcmFtZSBmcm9tIGRhdGFzZXQnKTtcbiAgY29uc3QgZGF0YUNvbnRhaW5lciA9IGRhdGFzZXQuZGF0YUNvbnRhaW5lcjtcbiAgY29uc3QgZGYgPSBuZXcgRGF0YUZyYW1lKGRhdGFDb250YWluZXIuX3Jvd3MpO1xuICBjb25zdCBqc29uX2RmID0gZGYucmVuYW1lQWxsKGRhdGFzZXQuZmllbGRzLm1hcCgoeCkgPT4geC5uYW1lKSk7XG4gIGlmIChnZW9tX2NvbCAhPT0gbnVsbCB8fCAobGF0X2NvbCAhPT0gbnVsbCAmJiBsb25fY29sICE9PSBudWxsKSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gZ2VvbV9jb2w/bmV3IEdlb0RhdGFmcmFtZShqc29uX2RmLCBnZW9tX2NvbCk6bmV3IEdlb0RhdGFmcmFtZShqc29uX2RmLCBudWxsLGxhdF9jb2wsbG9uX2NvbCk7XG4gIH1cbiAgcmV0dXJuIGpzb25fZGY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVfZGF0YXNldF9jb2x1bW4oZGF0YXNldCwgZHJvcF9maWVsZF9uYW1lKSB7XG4gIC8vIGxldCBkZiA9IG5ldyBEYXRhRnJhbWUoZGF0YXNldFsndGltZWxpbmVPYmplY3RzJ10pXG4gIC8vY3VycmVudGx5IGNhbm5vdCB1c2VkIGluIGdwdSBmaWx0ZXJpbmc6XG4gIGNvbnNvbGUubG9nKCdkZWxldGUgZGF0YXNldCBjb2x1bW4nKTtcbiAgLy8gY29uc3QgZGF0YUNvbnRhaW5lciA9IGRhdGFzZXQuZGF0YUNvbnRhaW5lclxuICAvLyBjb25zdCBkZiA9IG5ldyBEYXRhRnJhbWUoZGF0YUNvbnRhaW5lci5fcm93cylcbiAgLy8gY29uc3QganNvbl9kZiA9IGRmLnJlbmFtZUFsbChkYXRhc2V0LmZpZWxkcy5tYXAoKHgpPT54Lm5hbWUpKVxuICBjb25zdCBqc29uX2RmID0gZ2VuZXJhdGVfZGF0YWZyYW1lX2Zyb21fZGF0YXNldChkYXRhc2V0KTtcbiAgLy8gY29uc3QgZ2RmID0gbmV3IEdlb0RhdGFmcmFtZShqc29uX2RmLCdfZ2VvbWV0cnknKVxuICBjb25zdCBmaWVsZElkeCA9IGRhdGFzZXQuZmllbGRzLmZpbmRJbmRleChmID0+IGYubmFtZSA9PT0gZHJvcF9maWVsZF9uYW1lKTtcbiAgZGF0YXNldC5maWVsZHMgPSBkYXRhc2V0LmZpZWxkcy5tYXAoeCA9PiAoeC5maWVsZElkeCA9PT0gZmllbGRJZHggPyBudWxsIDogeC5maWVsZElkeCA+IGZpZWxkSWR4ID8gKCgpID0+IHtcbiAgICB4LmZpZWxkSWR4ID0geC5maWVsZElkeCAtIDE7XG4gICAgcmV0dXJuIHg7XG4gIH0pKCkgOiB4KSkuZmlsdGVyKCh4KSA9PiB4ICE9PSBudWxsKTtcbiAgZGF0YXNldC5kYXRhQ29udGFpbmVyLl9yb3dzID0ganNvbl9kZi5kcm9wKGRyb3BfZmllbGRfbmFtZSkudG9BcnJheSgpO1xuICBkYXRhc2V0LmRhdGFDb250YWluZXIuX251bUNvbHVtbnMgPSBkYXRhc2V0LmRhdGFDb250YWluZXIuX251bUNvbHVtbnMgLSAxO1xuICAvLyBkYXRhc2V0LmZpbHRlcmVkSW5kZXhGb3JEb21haW4gPSBkYXRhc2V0LmZpbHRlcmVkSW5kZXhGb3JEb21haW4ubWFwKCh4KT0+eD5maWVsZElkeC0xP3gtMTp4PT09ZmllbGRJZHgtMT9udWxsOngpLmZpbHRlcigoeCk9PnghPT1udWxsKVxuICAvLyBkYXRhc2V0LmFsbEluZGV4ZXMgPSBkYXRhc2V0LmFsbEluZGV4ZXMubWFwKCh4KT0+eD5maWVsZElkeC0xP3gtMTp4PT09ZmllbGRJZHgtMT9udWxsOngpLmZpbHRlcigoeCk9PnghPT1udWxsKVxuICAvLyBkYXRhc2V0LmZpbHRlcmVkSW5kZXggPSBkYXRhc2V0LmZpbHRlcmVkSW5kZXgubWFwKCh4KT0+eD5maWVsZElkeC0xP3gtMTp4PT09ZmllbGRJZHgtMT9udWxsOngpLmZpbHRlcigoeCk9PnghPT1udWxsKVxuICAvLyBkYXRhc2V0LmZpbHRlcmVkSW5kZXhGb3JEb21haW4gPSBmaWx0ZXJlZF9saXN0XG4gIC8vIFsnZmlsdGVyZWRJbmRleCcsJ2FsbEluZGV4ZXMnLCdmaWx0ZXJlZEluZGV4Rm9yRG9tYWluJ10ubWFwKCh4KT0+ZGF0YXNldFt4XSA9IGRhdGFzZXRbeF0ubWFwKCh5KT0+eT5maWVsZElkeC0xP3ktMTp5PT09ZmllbGRJZHgtMT9udWxsOnkpLmZpbHRlcigoeik9PnohPT1udWxsKSlcbiAgZGF0YXNldC5maWVsZFBhaXJzLm1hcCgoeCkgPT4geC5wYWlyID0gcGFpcl9yZWNvbXB1dGluZygoeCkucGFpciwgZmllbGRJZHgpKTtcbiAgcmV0dXJuIGRhdGFzZXQ7XG59XG5cbi8vdGhpcyBmdW5jdGlvbiBpcyB0byBjb3B5IG9yIHJlbmFtZSB0aGUgZXhpc2l0aW5nIGNvbHVtblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlfcmVuYW1lX2RhdGFzZXRfY29sdW1uKGRhdGFzZXQsIGNvbF9uYW1lLG5ld19uYW1lLHJlbmFtZT10cnVlKSB7XG4gIC8vIGxldCBkZiA9IG5ldyBEYXRhRnJhbWUoZGF0YXNldFsndGltZWxpbmVPYmplY3RzJ10pXG4gIC8vY3VycmVudGx5IGNhbm5vdCB1c2VkIGluIGdwdSBmaWx0ZXJpbmc6XG4gIGNvbnNvbGUubG9nKCdyZW5hbWUgZGF0YXNldCBjb2x1bW4nKTtcbiAgaWYocmVuYW1lKXtcbiAgICBkYXRhc2V0LmZpZWxkcyA9IGRhdGFzZXQuZmllbGRzLm1hcCgoeCk9Pnt4Lm5hbWUgPT09IGNvbF9uYW1lP3gubmFtZT1uZXdfbmFtZTp4Lm5hbWU7cmV0dXJuIHh9KVxuICAgIC8vIGRhdGFzZXQuZmllbGRQYWlycy5tYXAoKVxuICB9XG4gIGVsc2V7XG5cbiAgICBkYXRhc2V0ID0gYWRkX2RhdGFzZXRfY29sdW1uKGRhdGFzZXQsbmV3X25hbWUsZGF0YXNldC5maWVsZHMuZmlsdGVyKCh4KT0+eC5uYW1lPT1jb2xfbmFtZSlbMF0udHlwZSlcbiAgfVxuXG4gIHJldHVybiBkYXRhc2V0O1xufVxuXG5mdW5jdGlvbiBwYWlyX3JlY29tcHV0aW5nKHBhaXIsIHRhcmdldF9pZHgpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBPYmplY3Qua2V5cyhwYWlyKS5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChwYWlyW3hdLmZpZWxkSWR4ID09PSB0YXJnZXRfaWR4KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHBhaXJbeF0uZmllbGRJZHggPiB0YXJnZXRfaWR4KSB7XG4gICAgICBwYWlyW3hdLmZpZWxkSWR4ID0gcGFpclt4XS5maWVsZElkeCAtIDE7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHBhaXI7XG59XG5cblxuLy9pZiBjb25kdWN0aW5nIGlubmVyIGpvaW4sIHRoZW4gdGhlcmUgd2lsbCBiZSBzZXZlcmFsIHJvd3MgdGhhdCBhcmUgbm90IGF2YWlsYWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFzZXRfam9pbmluZyhkYXRhc2V0LGpvaW5fZGF0YXNldCxob3csZ2VuZXJhdGVfbmV3X2RhdGFzZXQ9dHJ1ZSxsZWZ0X29uPW51bGwscmlnaHRfb249bnVsbCxvbj1udWxsKXtcblxuICB0cnl7XG4gICAgY29uc29sZS5sb2coJ3J1biBkYXRhc2V0IGpvaW5pbmcnKVxuICAgIC8vYmV0dGVyIHRvIGdlbmVyYXRlIGEgZGljdCBjb2x1bW46XG4gICAgY29uc3QgZGYgPSBnZW5lcmF0ZV9kYXRhZnJhbWVfZnJvbV9kYXRhc2V0KGRhdGFzZXQpXG5cbiAgICBpZihsZWZ0X29uID09PSByaWdodF9vbil7XG4gICAgICBvbiA9IGxlZnRfb25cbiAgICB9XG5cbiAgICAvL3JlbW92ZSBkdXBsaWNhdGUgbmFtZVxuICAgIGNvbnN0IGR1cGxpY2F0ZV9jb2x1bW5zID0gZGF0YXNldC5maWVsZHMubWFwKCh4KT0+eC5uYW1lKS5maWx0ZXIoKHkpPT4gam9pbl9kYXRhc2V0LmZpZWxkcy5tYXAoKHgpPT54Lm5hbWUpLmluY2x1ZGVzKHkpICYmIHkgIT0gb24pXG5cbiAgICBjb25zdCBuZXdfam9pbl9kYXRhc2V0ID0gZHVwbGljYXRlX2NvbHVtbnMucmVkdWNlKChkcyx4KT0+Y29weV9yZW5hbWVfZGF0YXNldF9jb2x1bW4oZHMseCx4KydfMScpLGpvaW5fZGF0YXNldClcblxuICAgIGNvbnN0IGpvaW50X2RmID0gZ2VuZXJhdGVfZGF0YWZyYW1lX2Zyb21fZGF0YXNldChuZXdfam9pbl9kYXRhc2V0KVxuXG4gICAgLy8gY29uc3QgdG90YWxfbGlzdCA9IG5ld19qb2luX2RhdGFzZXQuZmllbGRzLmNvbmNhdChkYXRhc2V0LmZpZWxkcylcbiAgICAvLyBjb25zdCBkdXBsaWNhdGVfY29sdW1ucyA9IGpvaW50X2RmLmxpc3RDb2x1bW5zKCkuZmlsdGVyKCh4KT0+ZGYubGlzdENvbHVtbnMoKS5pbmNsdWRlcyh4KSAmJiB4IT09b24pXG5cbiAgICBjb25zdCBvdXRfZGYgPSBkZi5qb2luKHJpZ2h0X29uP2pvaW50X2RmLnJlbmFtZShyaWdodF9vbixsZWZ0X29uKTpqb2ludF9kZixsZWZ0X29uP2xlZnRfb246b24saG93P2hvdzonaW5uZXInKVxuXG4gICAgLy8gb3V0X2RmLmxpc3RDb2x1bW5zKClcbiAgICAvLyBjaGFuZ2UgZHVwbGljYXRlIGNvbHVtbnM6XG5cbiAgICAvLyBkdXBsaWNhdGVfY29sdW1ucy5tYXAoKHgpPT4pXG4gICAgLy9jaGFuZ2UgZmllbGQgaW5mbzpcbiAgICAvLyBjb25zdCBmaWVsZHMgPSBvdXRfZGYubGlzdENvbHVtbnMoKS5tYXAoKHgsaW5kZXgpPT57XG4gICAgLy8gICBjb25zdCByZXN1bHRfY29sID0gdG90YWxfbGlzdC5maWx0ZXIoKHkpPT55Lm5hbWUgPT09IHgpWzBdXG4gICAgLy8gICByZXN1bHRfY29sLmZpZWxkSWR4ID0geFxuICAgIC8vICAgcmV0dXJuIHJlc3VsdF9jb2xcbiAgICAvLyB9KVxuICAgIC8vIHJlcXVpcmUgdG8gY29uc2lkZXIgdGhlIG5ldyBkYXRhIHN0cnVjdHVyZVxuICAgIC8vIGRhdGFzZXQuZGF0YUNvbnRhaW5lci5fcm93cyA9IGRhdGFzZXQuZGF0YUNvbnRhaW5lci5fcm93cy5tYXAoKHgsIGluZGV4KSA9PiAoeC5jb25jYXQoW3ZhbHVlc1tpbmRleF1bY29sX2lkXV0pKSk7XG5cbiAgICAvL2hlcmUgdXNlIHByb2Nlc3NDU1ZEYXRhIHdpbGwgY2F1c2UgdGhlIGxvc3Qgb2YgdGhlIGNvbHVtbiBwYWlycywgYnV0IHN0aWxsIHRoZXJlIHNlZW1zIHRvIGJlIG5vIGJldHRlciBhbmQgZWFzaWVyIHNvbHV0aW9uLlxuXG4gICAgcmV0dXJuIHByb2Nlc3NDc3ZEYXRhKG91dF9kZi50b0FycmF5KCksIG91dF9kZi5saXN0Q29sdW1ucygpKVxuICB9XG4gIGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgICByZXR1cm4gZGF0YXNldFxuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldF9taW5tYXhfYnlfY29sX25hbWUoZGF0YXNldCxjb2xfbmFtZSl7XG4gIHRyeXtcbiAgICBjb25zdCBmaWx0ZXJfY29sdW1ucyA9IGRhdGFzZXQuZmllbGRzLmZpbHRlcigoeCk9PngubmFtZSA9PT0gY29sX25hbWUpXG5cbiAgICBpZihmaWx0ZXJfY29sdW1ucy5sZW5ndGggPiAwKXtcblxuICAgICAgY29uc29sZS5sb2coJ2dldCBtaW5tYXgnKVxuICAgICAgY29uc3QgZmlsdGVyX2NvbHVtbiA9IGZpbHRlcl9jb2x1bW5zWzBdXG5cbiAgICAgIGxldCBzbGljZWRfZGF0YSA9IFtdO1xuXG4gICAgICBpZigvZGF0ZS8udGVzdChmaWx0ZXJfY29sdW1uLnR5cGUpKXtcbiAgICAgICAgc2xpY2VkX2RhdGEgPSBkYXRhc2V0LmRhdGFDb250YWluZXIuX3Jvd3MubWFwKChyb3cpPT5uZXcgRGF0ZShyb3dbZmlsdGVyX2NvbHVtbi5maWVsZElkeF0pKVxuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgc2xpY2VkX2RhdGEgPSBkYXRhc2V0LmRhdGFDb250YWluZXIuX3Jvd3MubWFwKChyb3cpPT5yb3dbZmlsdGVyX2NvbHVtbi5maWVsZElkeF0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHNsaWNlZF9kYXRhLnJlZHVjZSgoYWNjLHJvdyk9PntcbiAgICAgICAgYWNjWzBdID0gKCBhY2NbMF0gPT09IHVuZGVmaW5lZCB8fCByb3cgPCBhY2NbMF0gKSA/IHJvdyA6IGFjY1swXVxuICAgICAgICBhY2NbMV0gPSAoIGFjY1sxXSA9PT0gdW5kZWZpbmVkIHx8IHJvdyA+IGFjY1sxXSApID8gcm93IDogYWNjWzFdXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sW10pXG5cbiAgICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZV9qb2luaW5nKGRhdGFzZXQsIGpvaW5fZGF0YXNldCwgaG93LCBnZW5lcmF0ZV9uZXdfZGF0YXNldCwgbGVmdF9vbiwgcmlnaHRfb24sIGpvaW5fY29scz10cnVlKXtcbiAgY29uc29sZS5sb2coJ3RpbWUgb2Qgam9pbmluZycpO1xuICBjb25zdCBkZiA9IGdlbmVyYXRlX2RhdGFmcmFtZV9mcm9tX2RhdGFzZXQoZGF0YXNldClcblxuICAvLyBpZihkYXRhc2V0LmZpZWxkcy5maWx0ZXIoKHgpPT54Lm5hbWU9PWxlZnRfb24pLnR5cGUpXG4gIC8vdG9kbzogYWRkIHNhbWUgdHlwZSBjaGVjaztcblxuICBjb25zdCBkdXBsaWNhdGVfY29sdW1ucyA9IGRhdGFzZXQuZmllbGRzLm1hcCgoeCk9PngubmFtZSkuZmlsdGVyKCh5KT0+IGpvaW5fZGF0YXNldC5maWVsZHMubWFwKCh4KT0+eC5uYW1lKS5pbmNsdWRlcyh5KSlcbiAgY29uc3QgbmV3X2pvaW5fZGF0YXNldCA9IGR1cGxpY2F0ZV9jb2x1bW5zLnJlZHVjZSgoZHMseCk9PmNvcHlfcmVuYW1lX2RhdGFzZXRfY29sdW1uKGRzLHgseCsnXzEnKSxqb2luX2RhdGFzZXQpXG4gIGNvbnN0IGpvaW50X2RmID0gZ2VuZXJhdGVfZGF0YWZyYW1lX2Zyb21fZGF0YXNldChuZXdfam9pbl9kYXRhc2V0KVxuICAvLyBkZi5tYXAoKHgpPT5qb2ludF9kZi5maWx0ZXIoKHkpPT55LmdldChyaWdodF9vblswXSkgPD0geC5nZXQobGVmdF9vbikgPD0geS5nZXQocmlnaHRfb25bMV0pKSkudG9BcnJheSgpXG4gIC8vIGpvaW50X2RmLm1hcCgoeCk9PmRmLmZpbHRlcigoeSk9PigoeC5nZXQocmlnaHRfb25bMF0pPD0geS5nZXQobGVmdF9vbikpICYmICh5LmdldChsZWZ0X29uKTw9eC5nZXQocmlnaHRfb25bMV0pKSkpLm1hcCgoeik9PntyZXR1cm4gey4uLnoudG9EaWN0KCksLi4ueC50b0RpY3QoKX19KSlcbiAgaWYoam9pbl9jb2xzKXtcbiAgICBjb25zdCBvdXRfZGYgPSByYW5nZV9qb2luKGRmLGpvaW50X2RmLGxlZnRfb24scmlnaHRfb24pXG4gICAgcmV0dXJuIHByb2Nlc3NDc3ZEYXRhKG91dF9kZi50b0FycmF5KCksIG91dF9kZi5saXN0Q29sdW1ucygpKVxuICB9XG4gIGVsc2V7XG4gICAgY29uc3Qgc3BhbnMgPSBqb2ludF9kZi5yZXN0cnVjdHVyZShyaWdodF9vbikudG9BcnJheSgpXG4gICAgZGF0YXNldC5kYXRhQ29udGFpbmVyLl9yb3dzID0gZGYuZmlsdGVyKCh4KT0+e1xuICAgICAgcmV0dXJuIHNwYW5zLnNvbWUoKHkpPT4gKHlbMF0gPD0geC5nZXQobGVmdF9vbikpICYmICh5WzFdPj14LmdldChsZWZ0X29uKSkpXG4gICAgfSkudG9BcnJheSgpXG4gICAgcmV0dXJuIGRhdGFzZXRcbiAgfVxuXG4gIC8vIGNvbnN0IGZpbmFsX2FycmF5ID0gW11cbiAgLy8gam9pbnRfZGYubWFwKCh4KT0+e1xuICAvLyAgIGNvbnN0IGZpbHRlcmVkX3Jlc3VsdCA9IGRmLmZpbHRlcigoeSk9PigoeC5nZXQocmlnaHRfb25bMF0pPD0geS5nZXQobGVmdF9vbikpICYmICh5LmdldChsZWZ0X29uKTw9eC5nZXQocmlnaHRfb25bMV0pKSkpXG4gIC8vICAgZmlsdGVyZWRfcmVzdWx0Lm1hcCgoeik9PntcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdydW4gb2QgbWF0Y2hpbmcnKVxuICAvLyAgICAgY29uc3Qgb3JpX2RpY3QgPSB6LnRvRGljdCgpO1xuICAvLyAgICAgY29uc3QgZHN0X2RpY3QgPSB4LnRvRGljdCgpO1xuICAvLyAgICAgT2JqZWN0LmtleXMob3JpX2RpY3QpLm1hcCgoeCk9PntcbiAgLy8gICAgICAgT2JqZWN0LmtleXMoZHN0X2RpY3QpLmluY2x1ZGVzKHgpP2RzdF9kaWN0W3ggKyAnXzEnXT1vcmlfZGljdFt4XTpkc3RfZGljdFt4XT1vcmlfZGljdFt4XVxuICAvLyAgICAgfSlcbiAgLy8gICAgIGZpbmFsX2FycmF5LnB1c2goZHN0X2RpY3QpXG4gIC8vICAgfSlcbiAgLy8gfSlcbiAgLy8gY29uc29sZS5sb2coJ2ZpbmlzaCBqb2luJylcbiAgLy8gY29uc3Qgb3V0X2RmID0gbmV3IERhdGFGcmFtZShmaW5hbF9hcnJheSlcblxufVxuXG5cbi8vaGVyZSwgam9pbiB3aWxsIGpvaW4gYWxsIHRoZSBmaWVsZHMgZXhwZWN0IGZvciB0aGUgc3BhdGlhbCBmaWVsZFxuZXhwb3J0IGZ1bmN0aW9uIHNwYXRpYWxfam9pbl9kYXRhc2V0KGRhdGFzZXQsam9pbl9kYXRhc2V0LGdlb21fY29sLGpvaW5fZ2VvbV9jb2wsaG93LGdlbmVyYXRlX25ld19kYXRhc2V0KXtcbiAgY29uc3QgZGYgPSBnZW5lcmF0ZV9kYXRhZnJhbWVfZnJvbV9kYXRhc2V0KGRhdGFzZXQsZ2VvbV9jb2wpXG4gIGNvbnN0IGpvaW50X2RmID0gZ2VuZXJhdGVfZGF0YWZyYW1lX2Zyb21fZGF0YXNldChqb2luX2RhdGFzZXQsam9pbl9nZW9tX2NvbClcblxuICBkZi5pbnRlcnNlY3RzKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0X2luZGV4X2RhdGFzZXQoZGF0YXNldCl7XG4gIGNvbnN0IG5ld19pbmRleCA9IFsuLi5BcnJheShkYXRhc2V0LmRhdGFDb250YWluZXIuX3Jvd3MubGVuZ3RoKS5rZXlzKCldXG4gIGRhdGFzZXQuYWxsSW5kZXhlcyA9IG5ld19pbmRleFxuICBkYXRhc2V0LmZpbHRlcmVkSW5kZXggPSBuZXdfaW5kZXhcbiAgZGF0YXNldC5maWx0ZXJlZEluZGV4Rm9yRG9tYWluID0gbmV3X2luZGV4XG4gIHJldHVybiBkYXRhc2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRfZGF0YXNldF9jb2x1bW4oZGF0YXNldCwgY29sdW1uLCBkYXRhX3R5cGUsIHZhbHVlcywgcmVwbGFjZV9kdXAgPSBmYWxzZSkge1xuICBjb25zb2xlLmxvZygnYWRkIGRhdGFzZXQgY29sdW1uIGhlcmUnKTtcbiAgLy8gZGF0YXNldC5maWVsZHMuZmlsdGVyKCh4KT0+Y29sdW1uID09IHgubmFtZSlcbiAgbGV0IGNvbHVtbl9saXN0ID0gdHlwZW9mIChjb2x1bW4pID09ICdzdHJpbmcnID8gW2NvbHVtbl0gOiBjb2x1bW47XG5cbiAgY29sdW1uX2xpc3QubWFwKChjb2wsIGNvbF9pZCkgPT4ge1xuICAgIGxldCByZW1haW5pbmdfY29scyA9IGRhdGFzZXQuZmllbGRzLmZpbHRlcigoeCkgPT4gY29sID09PSB4Lm5hbWUpO1xuXG4gICAgaWYgKHJlbWFpbmluZ19jb2xzLmxlbmd0aCA9PT0gMCB8fCByZXBsYWNlX2R1cCA9PT0gZmFsc2UpIHtcbiAgICAgIGxldCBjb2x1bW5fc3BlYyA9IHtcbiAgICAgICAgYW5hbHl6ZXJUeXBlOiBkYXRhX3R5cGUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgZGlzcGxheU5hbWU6IHJlbWFpbmluZ19jb2xzLmxlbmd0aCA9PT0gMCA/IGNvbCA6IGNvbCArICdfMScsXG4gICAgICAgIGZpZWxkSWR4OiBkYXRhc2V0LmZpZWxkcy5sZW5ndGgsXG4gICAgICAgIGZvcm1hdDogJycsXG4gICAgICAgIGlkOiBjb2wsXG4gICAgICAgIG5hbWU6IGNvbCxcbiAgICAgICAgdHlwZTogZGF0YV90eXBlXG4gICAgICB9O1xuICAgICAgZGF0YXNldC5kYXRhQ29udGFpbmVyLl9yb3dzID0gZGF0YXNldC5kYXRhQ29udGFpbmVyLl9yb3dzLm1hcCgoeCwgaW5kZXgpID0+ICh4LmNvbmNhdChbdmFsdWVzW2luZGV4XVtjb2xfaWRdXSkpKTtcbiAgICAgIGRhdGFzZXQuZmllbGRzLnB1c2goY29sdW1uX3NwZWMpO1xuICAgICAgZGF0YXNldC5kYXRhQ29udGFpbmVyLl9udW1Db2x1bW5zID0gZGF0YXNldC5kYXRhQ29udGFpbmVyLl9udW1Db2x1bW5zICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvbHVtbl9zcGVjID0gcmVtYWluaW5nX2NvbHNbMF07XG4gICAgICBjb2x1bW5fc3BlY1snYW5hbHl6ZXJUeXBlJ10gPSBkYXRhX3R5cGUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbHVtbl9zcGVjWyd0eXBlJ10gPSBkYXRhX3R5cGU7XG4gICAgICBkYXRhc2V0LmZpZWxkc1tjb2x1bW5fc3BlYy5maWVsZElkeF0gPSBjb2x1bW5fc3BlYztcbiAgICAgIGRhdGFzZXQuZGF0YUNvbnRhaW5lci5fcm93cyA9IGRhdGFzZXQuZGF0YUNvbnRhaW5lci5fcm93cy5tYXAoKHgsIGluZGV4KSA9PiB7XG4gICAgICAgIHhbY29sdW1uX3NwZWMuZmllbGRJZHhdID0gW3ZhbHVlc1tpbmRleF1bY29sX2lkXV07XG4gICAgICAgIHJldHVybiB4O1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGF0YXNldDtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGluY3RfdmFsdWVfbGlzdHMoZGF0YXNldCxjb2xfbmFtZXMsZHJvcG5hPXRydWUpIHtcbiAgY29uc29sZS5sb2coJ2Rpc3RpbmN0IHZhbHVlIGxpc3QnKVxuICBjb25zdCB2YWx1ZV9hcnJheSA9IGNvbF9uYW1lcy5yZWR1Y2UoKHZhbHVlLCBjb2wpID0+IHZhbHVlLmNvbmNhdChfLnVuaXEoZGF0YXNldC5maWVsZHMuZmlsdGVyKCh4KSA9PiB4Lm5hbWUgPT09IGNvbCkubWFwKCh4KSA9PiB4LmZpZWxkSWR4KS5yZWR1Y2UoKHZhbHVlLCBpZHgpID0+IHZhbHVlLmNvbmNhdChkYXRhc2V0LmRhdGFDb250YWluZXIuX3Jvd3MubWFwKHggPT4geFtpZHhdKSksIFtdKSkpLCBbXSlcbiAgcmV0dXJuIGRyb3BuYT9fLnVuaXEodmFsdWVfYXJyYXkpLmZpbHRlcih4PT54IT11bmRlZmluZWQpOl8udW5pcSh2YWx1ZV9hcnJheSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0RmlsdGVyaW5nUHJvY2VzcyhkYXRhc2V0cyxleHBvcnRTZXR0aW5nKXtcbiAgY29uc3Qge291dERhdGEsb3V0Q29sdW1ucyxoZWFkZXJ9ID0gZXhwb3J0U2V0dGluZ1xuXG4gIGNvbnN0IG91dERhdGFEaWN0ID0ge31cblxuICBpZihvdXREYXRhLmluY2x1ZGVzKCdhY3Rpdml0eSBpbmZvcm1hdGlvbicpKXtcblxuICB9XG5cbiAgaWYob3V0RGF0YS5pbmNsdWRlcygndmlzaXRlZCBwbGFjZSBpbmZvcm1hdGlvbicpKXtcblxuICB9XG5cbiAgaWYob3V0RGF0YS5pbmNsdWRlcygnbWF0Y2hlZCBHUFMgZGF0YScpKXtcblxuICB9XG5cblxuXG59XG4iXX0=