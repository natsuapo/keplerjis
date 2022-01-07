"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexedDataContainer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _dataRow = require("./data-row");

var _marked = /*#__PURE__*/_regenerator["default"].mark(rowsIterator),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(columnIterator);

/**
 * @param {import('./data-container-interface').DataContainerInterface} dataContainer
 * @param {number[]} indices
 * @param {import('./data-row').SharedRowOptions} sharedRow
 * @returns {Generator<DataRow, void, unknown>}
 */
function rowsIterator(dataContainer, indices, sharedRow) {
  var numRows, rowIndex, mappedRowIndex;
  return _regenerator["default"].wrap(function rowsIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          numRows = indices.length;
          rowIndex = 0;

        case 2:
          if (!(rowIndex < numRows)) {
            _context.next = 9;
            break;
          }

          mappedRowIndex = indices[rowIndex];
          _context.next = 6;
          return dataContainer.row(mappedRowIndex, sharedRow);

        case 6:
          ++rowIndex;
          _context.next = 2;
          break;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * @param {import('./data-container-interface').DataContainerInterface} dataContainer
 * @param {number[]} indices
 * @param {number} columnIndex
 * @returns {Generator<any, void, unknown>}
 */


function columnIterator(dataContainer, indices, columnIndex) {
  var numRows, rowIndex, mappedRowIndex;
  return _regenerator["default"].wrap(function columnIterator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          numRows = indices.length;
          rowIndex = 0;

        case 2:
          if (!(rowIndex < numRows)) {
            _context2.next = 9;
            break;
          }

          mappedRowIndex = indices[rowIndex];
          _context2.next = 6;
          return dataContainer.valueAt(mappedRowIndex, columnIndex);

        case 6:
          ++rowIndex;
          _context2.next = 2;
          break;

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var IndexedDataContainer = /*#__PURE__*/function () {
  function IndexedDataContainer(parentDataContainer, indices) {
    (0, _classCallCheck2["default"])(this, IndexedDataContainer);
    this._parentDataContainer = parentDataContainer;
    this._indices = indices;
  }

  (0, _createClass2["default"])(IndexedDataContainer, [{
    key: "numRows",
    value: function numRows() {
      return this._indices.length;
    }
  }, {
    key: "numColumns",
    value: function numColumns() {
      return this._parentDataContainer.numColumns();
    }
    /**
     * Remaps a local index to an index in the parent dataset
     * @param {number} rowIndex
     * @returns number
     */

  }, {
    key: "_mappedRowIndex",
    value: function _mappedRowIndex(rowIndex) {
      return this._indices[rowIndex];
    }
  }, {
    key: "valueAt",
    value: function valueAt(rowIndex, columnIndex) {
      return this._parentDataContainer.valueAt(this._mappedRowIndex(rowIndex), columnIndex);
    }
  }, {
    key: "row",
    value: function row(rowIndex, sharedRow) {
      return this._parentDataContainer.row(this._mappedRowIndex(rowIndex), sharedRow);
    }
  }, {
    key: "rowAsArray",
    value: function rowAsArray(rowIndex) {
      return this._parentDataContainer.rowAsArray(this._mappedRowIndex(rowIndex));
    }
  }, {
    key: "rows",
    value: function rows(sharedRow) {
      return rowsIterator(this._parentDataContainer, this._indices, sharedRow);
    }
  }, {
    key: "column",
    value: function column(columnIndex) {
      return columnIterator(this._parentDataContainer, this._indices, columnIndex);
    }
  }, {
    key: "getPlainIndex",
    value: function getPlainIndex() {
      return this._indices.map(function (_, i) {
        return i;
      });
    }
  }, {
    key: "flattenData",
    value: function flattenData() {
      var _this = this;

      var tSharedRow = _dataRow.DataRow.createSharedRow(true);

      return this._indices.map(function (_, i) {
        return _this.row(i, tSharedRow).values();
      }, this);
    }
  }, {
    key: "map",
    value: function map(func, sharedRow) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$start = options.start,
          start = _options$start === void 0 ? 0 : _options$start,
          _options$end = options.end,
          end = _options$end === void 0 ? this.numRows() : _options$end;
      var endRow = Math.min(this.numRows(), end);

      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      var out = [];

      for (var rowIndex = start; rowIndex < endRow; ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);
        out.push(func(row, rowIndex));
      }

      return out;
    }
  }, {
    key: "mapIndex",
    value: function mapIndex(func) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$start2 = options.start,
          start = _options$start2 === void 0 ? 0 : _options$start2,
          _options$end2 = options.end,
          end = _options$end2 === void 0 ? this.numRows() : _options$end2;
      var endRow = Math.min(this.numRows(), end);
      var out = [];

      for (var rowIndex = start; rowIndex < endRow; ++rowIndex) {
        out.push(func({
          index: this._mappedRowIndex(rowIndex)
        }, this._parentDataContainer));
      }

      return out;
    }
  }, {
    key: "find",
    value: function find(func, sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      for (var rowIndex = 0; rowIndex < this.numRows(); ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);

        if (func(row, rowIndex)) {
          return row;
        }
      }

      return undefined;
    }
  }, {
    key: "reduce",
    value: function reduce(func, initialValue, sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      for (var rowIndex = 0; rowIndex < this._indices.length; ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);
        initialValue = func(initialValue, row, rowIndex);
      }

      return initialValue;
    }
  }]);
  return IndexedDataContainer;
}();

exports.IndexedDataContainer = IndexedDataContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90YWJsZS11dGlscy9pbmRleGVkLWRhdGEtY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInJvd3NJdGVyYXRvciIsImNvbHVtbkl0ZXJhdG9yIiwiZGF0YUNvbnRhaW5lciIsImluZGljZXMiLCJzaGFyZWRSb3ciLCJudW1Sb3dzIiwibGVuZ3RoIiwicm93SW5kZXgiLCJtYXBwZWRSb3dJbmRleCIsInJvdyIsImNvbHVtbkluZGV4IiwidmFsdWVBdCIsIkluZGV4ZWREYXRhQ29udGFpbmVyIiwicGFyZW50RGF0YUNvbnRhaW5lciIsIl9wYXJlbnREYXRhQ29udGFpbmVyIiwiX2luZGljZXMiLCJudW1Db2x1bW5zIiwiX21hcHBlZFJvd0luZGV4Iiwicm93QXNBcnJheSIsIm1hcCIsIl8iLCJpIiwidFNoYXJlZFJvdyIsIkRhdGFSb3ciLCJjcmVhdGVTaGFyZWRSb3ciLCJ2YWx1ZXMiLCJmdW5jIiwib3B0aW9ucyIsInN0YXJ0IiwiZW5kIiwiZW5kUm93IiwiTWF0aCIsIm1pbiIsIm91dCIsInB1c2giLCJpbmRleCIsInVuZGVmaW5lZCIsImluaXRpYWxWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzt3REFRVUEsWTt5REFjQUMsYzs7QUFwQlY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBVUQsWUFBVixDQUF1QkUsYUFBdkIsRUFBc0NDLE9BQXRDLEVBQStDQyxTQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUUMsVUFBQUEsT0FEUixHQUNrQkYsT0FBTyxDQUFDRyxNQUQxQjtBQUVXQyxVQUFBQSxRQUZYLEdBRXNCLENBRnRCOztBQUFBO0FBQUEsZ0JBRXlCQSxRQUFRLEdBQUdGLE9BRnBDO0FBQUE7QUFBQTtBQUFBOztBQUdVRyxVQUFBQSxjQUhWLEdBRzJCTCxPQUFPLENBQUNJLFFBQUQsQ0FIbEM7QUFBQTtBQUlJLGlCQUFNTCxhQUFhLENBQUNPLEdBQWQsQ0FBa0JE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dCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0RhdGFSb3d9IGZyb20gJy4vZGF0YS1yb3cnO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2RhdGEtY29udGFpbmVyLWludGVyZmFjZScpLkRhdGFDb250YWluZXJJbnRlcmZhY2V9IGRhdGFDb250YWluZXJcbiAqIEBwYXJhbSB7bnVtYmVyW119IGluZGljZXNcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2RhdGEtcm93JykuU2hhcmVkUm93T3B0aW9uc30gc2hhcmVkUm93XG4gKiBAcmV0dXJucyB7R2VuZXJhdG9yPERhdGFSb3csIHZvaWQsIHVua25vd24+fVxuICovXG5mdW5jdGlvbiogcm93c0l0ZXJhdG9yKGRhdGFDb250YWluZXIsIGluZGljZXMsIHNoYXJlZFJvdykge1xuICBjb25zdCBudW1Sb3dzID0gaW5kaWNlcy5sZW5ndGg7XG4gIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBudW1Sb3dzOyArK3Jvd0luZGV4KSB7XG4gICAgY29uc3QgbWFwcGVkUm93SW5kZXggPSBpbmRpY2VzW3Jvd0luZGV4XTtcbiAgICB5aWVsZCBkYXRhQ29udGFpbmVyLnJvdyhtYXBwZWRSb3dJbmRleCwgc2hhcmVkUm93KTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2RhdGEtY29udGFpbmVyLWludGVyZmFjZScpLkRhdGFDb250YWluZXJJbnRlcmZhY2V9IGRhdGFDb250YWluZXJcbiAqIEBwYXJhbSB7bnVtYmVyW119IGluZGljZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5JbmRleFxuICogQHJldHVybnMge0dlbmVyYXRvcjxhbnksIHZvaWQsIHVua25vd24+fVxuICovXG5mdW5jdGlvbiogY29sdW1uSXRlcmF0b3IoZGF0YUNvbnRhaW5lciwgaW5kaWNlcywgY29sdW1uSW5kZXgpIHtcbiAgY29uc3QgbnVtUm93cyA9IGluZGljZXMubGVuZ3RoO1xuICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgbnVtUm93czsgKytyb3dJbmRleCkge1xuICAgIGNvbnN0IG1hcHBlZFJvd0luZGV4ID0gaW5kaWNlc1tyb3dJbmRleF07XG4gICAgeWllbGQgZGF0YUNvbnRhaW5lci52YWx1ZUF0KG1hcHBlZFJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEluZGV4ZWREYXRhQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IocGFyZW50RGF0YUNvbnRhaW5lciwgaW5kaWNlcykge1xuICAgIHRoaXMuX3BhcmVudERhdGFDb250YWluZXIgPSBwYXJlbnREYXRhQ29udGFpbmVyO1xuICAgIHRoaXMuX2luZGljZXMgPSBpbmRpY2VzO1xuICB9XG5cbiAgbnVtUm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kaWNlcy5sZW5ndGg7XG4gIH1cblxuICBudW1Db2x1bW5zKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnREYXRhQ29udGFpbmVyLm51bUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1hcHMgYSBsb2NhbCBpbmRleCB0byBhbiBpbmRleCBpbiB0aGUgcGFyZW50IGRhdGFzZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJvd0luZGV4XG4gICAqIEByZXR1cm5zIG51bWJlclxuICAgKi9cbiAgX21hcHBlZFJvd0luZGV4KHJvd0luZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGljZXNbcm93SW5kZXhdO1xuICB9XG5cbiAgdmFsdWVBdChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50RGF0YUNvbnRhaW5lci52YWx1ZUF0KHRoaXMuX21hcHBlZFJvd0luZGV4KHJvd0luZGV4KSwgY29sdW1uSW5kZXgpO1xuICB9XG5cbiAgcm93KHJvd0luZGV4LCBzaGFyZWRSb3cpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50RGF0YUNvbnRhaW5lci5yb3codGhpcy5fbWFwcGVkUm93SW5kZXgocm93SW5kZXgpLCBzaGFyZWRSb3cpO1xuICB9XG5cbiAgcm93QXNBcnJheShyb3dJbmRleCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnREYXRhQ29udGFpbmVyLnJvd0FzQXJyYXkodGhpcy5fbWFwcGVkUm93SW5kZXgocm93SW5kZXgpKTtcbiAgfVxuXG4gIHJvd3Moc2hhcmVkUm93KSB7XG4gICAgcmV0dXJuIHJvd3NJdGVyYXRvcih0aGlzLl9wYXJlbnREYXRhQ29udGFpbmVyLCB0aGlzLl9pbmRpY2VzLCBzaGFyZWRSb3cpO1xuICB9XG5cbiAgY29sdW1uKGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIGNvbHVtbkl0ZXJhdG9yKHRoaXMuX3BhcmVudERhdGFDb250YWluZXIsIHRoaXMuX2luZGljZXMsIGNvbHVtbkluZGV4KTtcbiAgfVxuXG4gIGdldFBsYWluSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGljZXMubWFwKChfLCBpKSA9PiBpKTtcbiAgfVxuXG4gIGZsYXR0ZW5EYXRhKCkge1xuICAgIGNvbnN0IHRTaGFyZWRSb3cgPSBEYXRhUm93LmNyZWF0ZVNoYXJlZFJvdyh0cnVlKTtcblxuICAgIHJldHVybiB0aGlzLl9pbmRpY2VzLm1hcCgoXywgaSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucm93KGksIHRTaGFyZWRSb3cpLnZhbHVlcygpO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgbWFwKGZ1bmMsIHNoYXJlZFJvdywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge3N0YXJ0ID0gMCwgZW5kID0gdGhpcy5udW1Sb3dzKCl9ID0gb3B0aW9ucztcbiAgICBjb25zdCBlbmRSb3cgPSBNYXRoLm1pbih0aGlzLm51bVJvd3MoKSwgZW5kKTtcblxuICAgIGNvbnN0IHRTaGFyZWRSb3cgPSBEYXRhUm93LmNyZWF0ZVNoYXJlZFJvdyhzaGFyZWRSb3cpO1xuXG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgZm9yIChsZXQgcm93SW5kZXggPSBzdGFydDsgcm93SW5kZXggPCBlbmRSb3c7ICsrcm93SW5kZXgpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93KHJvd0luZGV4LCB0U2hhcmVkUm93KTtcbiAgICAgIG91dC5wdXNoKGZ1bmMocm93LCByb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgbWFwSW5kZXgoZnVuYywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge3N0YXJ0ID0gMCwgZW5kID0gdGhpcy5udW1Sb3dzKCl9ID0gb3B0aW9ucztcbiAgICBjb25zdCBlbmRSb3cgPSBNYXRoLm1pbih0aGlzLm51bVJvd3MoKSwgZW5kKTtcblxuICAgIGNvbnN0IG91dCA9IFtdO1xuICAgIGZvciAobGV0IHJvd0luZGV4ID0gc3RhcnQ7IHJvd0luZGV4IDwgZW5kUm93OyArK3Jvd0luZGV4KSB7XG4gICAgICBvdXQucHVzaChmdW5jKHtpbmRleDogdGhpcy5fbWFwcGVkUm93SW5kZXgocm93SW5kZXgpfSwgdGhpcy5fcGFyZW50RGF0YUNvbnRhaW5lcikpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZmluZChmdW5jLCBzaGFyZWRSb3cpIHtcbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93KTtcblxuICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLm51bVJvd3MoKTsgKytyb3dJbmRleCkge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3cocm93SW5kZXgsIHRTaGFyZWRSb3cpO1xuICAgICAgaWYgKGZ1bmMocm93LCByb3dJbmRleCkpIHtcbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlZHVjZShmdW5jLCBpbml0aWFsVmFsdWUsIHNoYXJlZFJvdykge1xuICAgIGNvbnN0IHRTaGFyZWRSb3cgPSBEYXRhUm93LmNyZWF0ZVNoYXJlZFJvdyhzaGFyZWRSb3cpO1xuXG4gICAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IHRoaXMuX2luZGljZXMubGVuZ3RoOyArK3Jvd0luZGV4KSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLnJvdyhyb3dJbmRleCwgdFNoYXJlZFJvdyk7XG4gICAgICBpbml0aWFsVmFsdWUgPSBmdW5jKGluaXRpYWxWYWx1ZSwgcm93LCByb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBpbml0aWFsVmFsdWU7XG4gIH1cbn1cbiJdfQ==