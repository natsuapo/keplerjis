"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowDataContainer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _dataRow = require("./data-row");

var _marked = /*#__PURE__*/_regenerator["default"].mark(rowsIterator),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(columnIterator);

/**
 * @param {import('./data-container-interface').DataContainerInterface} dataContainer
 * @param {import('./data-row').SharedRowOptions} sharedRow
 */
function rowsIterator(dataContainer, sharedRow) {
  var numRows, rowIndex;
  return _regenerator["default"].wrap(function rowsIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          numRows = dataContainer.numRows();
          rowIndex = 0;

        case 2:
          if (!(rowIndex < numRows)) {
            _context.next = 8;
            break;
          }

          _context.next = 5;
          return dataContainer.row(rowIndex, sharedRow);

        case 5:
          ++rowIndex;
          _context.next = 2;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * @param {import('./data-container-interface').DataContainerInterface} dataContainer
 * @param {number} columnIndex
 */


function columnIterator(dataContainer, columnIndex) {
  var numRows, rowIndex;
  return _regenerator["default"].wrap(function columnIterator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          numRows = dataContainer.numRows();
          rowIndex = 0;

        case 2:
          if (!(rowIndex < numRows)) {
            _context2.next = 8;
            break;
          }

          _context2.next = 5;
          return dataContainer.valueAt(rowIndex, columnIndex);

        case 5:
          ++rowIndex;
          _context2.next = 2;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var RowDataContainer = /*#__PURE__*/function () {
  function RowDataContainer(data) {
    var _data$rows$;

    (0, _classCallCheck2["default"])(this, RowDataContainer);

    if (!data.rows) {
      throw Error('RowDataContainer: no rows provided');
    }

    if (!Array.isArray(data.rows)) {
      throw Error("RowDataContainer: rows object isn't an array");
    }

    this._rows = data.rows;
    this._numColumns = ((_data$rows$ = data.rows[0]) === null || _data$rows$ === void 0 ? void 0 : _data$rows$.length) || 0;
  }

  (0, _createClass2["default"])(RowDataContainer, [{
    key: "numRows",
    value: function numRows() {
      return this._rows.length;
    }
  }, {
    key: "numColumns",
    value: function numColumns() {
      return this._numColumns;
    }
  }, {
    key: "valueAt",
    value: function valueAt(rowIndex, columnIndex) {
      if (this._rows[rowIndex] === null) {
        return null;
      }

      return this._rows[rowIndex][columnIndex];
    }
  }, {
    key: "row",
    value: function row(rowIndex, sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      if (tSharedRow) {
        tSharedRow.setSource(this, rowIndex);
        return tSharedRow;
      }

      return new _dataRow.DataRow(this, rowIndex);
    }
  }, {
    key: "rowAsArray",
    value: function rowAsArray(rowIndex) {
      return this._rows[rowIndex];
    }
  }, {
    key: "rows",
    value: function rows(sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      return rowsIterator(this, tSharedRow);
    }
  }, {
    key: "column",
    value: function column(columnIndex) {
      return columnIterator(this, columnIndex);
    }
  }, {
    key: "flattenData",
    value: function flattenData() {
      return this._rows;
    }
  }, {
    key: "getPlainIndex",
    value: function getPlainIndex(valid) {
      return this._rows.map(function (_, i) {
        return i;
      });
    }
  }, {
    key: "map",
    value: function map(func, sharedRow) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      var _options$start = options.start,
          start = _options$start === void 0 ? 0 : _options$start,
          _options$end = options.end,
          end = _options$end === void 0 ? this.numRows() : _options$end;
      var endRow = Math.min(this.numRows(), end);
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
          index: rowIndex
        }, this));
      }

      return out;
    }
  }, {
    key: "find",
    value: function find(func, sharedRow) {
      var tSharedRow = _dataRow.DataRow.createSharedRow(sharedRow);

      for (var rowIndex = 0; rowIndex < this._rows.length; ++rowIndex) {
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

      for (var rowIndex = 0; rowIndex < this._rows.length; ++rowIndex) {
        var row = this.row(rowIndex, tSharedRow);
        initialValue = func(initialValue, row, rowIndex);
      }

      return initialValue;
    }
  }]);
  return RowDataContainer;
}();

exports.RowDataContainer = RowDataContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90YWJsZS11dGlscy9yb3ctZGF0YS1jb250YWluZXIuanMiXSwibmFtZXMiOlsicm93c0l0ZXJhdG9yIiwiY29sdW1uSXRlcmF0b3IiLCJkYXRhQ29udGFpbmVyIiwic2hhcmVkUm93IiwibnVtUm93cyIsInJvd0luZGV4Iiwicm93IiwiY29sdW1uSW5kZXgiLCJ2YWx1ZUF0IiwiUm93RGF0YUNvbnRhaW5lciIsImRhdGEiLCJyb3dzIiwiRXJyb3IiLCJBcnJheSIsImlzQXJyYXkiLCJfcm93cyIsIl9udW1Db2x1bW5zIiwibGVuZ3RoIiwidFNoYXJlZFJvdyIsIkRhdGFSb3ciLCJjcmVhdGVTaGFyZWRSb3ciLCJzZXRTb3VyY2UiLCJ2YWxpZCIsIm1hcCIsIl8iLCJpIiwiZnVuYyIsIm9wdGlvbnMiLCJzdGFydCIsImVuZCIsImVuZFJvdyIsIk1hdGgiLCJtaW4iLCJvdXQiLCJwdXNoIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJpbml0aWFsVmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7d0RBTVVBLFk7eURBV0FDLGM7O0FBZlY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFVRCxZQUFWLENBQXVCRSxhQUF2QixFQUFzQ0MsU0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FDLFVBQUFBLE9BRFIsR0FDa0JGLGFBQWEsQ0FBQ0UsT0FBZCxFQURsQjtBQUVXQyxVQUFBQSxRQUZYLEdBRXNCLENBRnRCOztBQUFBO0FBQUEsZ0JBRXlCQSxRQUFRLEdBQUdELE9BRnBDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBR0ksaUJBQU1GLGFBQWEsQ0FBQ0ksR0FBZCxDQUFrQkQsUUFBbEIsRUFBNEJGLFNBQTVCLENBQU47O0FBSEo7QUFFNkMsWUFBRUUsUUFGL0M7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFNBQVVK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V0FFRCxjQUFLUCxJQUFMLEVBQVd2QixTQUFYLEVBQXNCO0FBQ3BCLFVBQU1lLFVBQVUsR0FBR0MsaUJBQVFDLGVBQVIsQ0FBd0JqQixTQUF4QixDQUFuQjs7QUFFQSxXQUFLLElBQUlFLFFBQVEsR0FBRyxDQUFwQixFQUF1QkEsUUFBUSxHQUFHLEtBQUtVLEtBQUwsQ0FBV0UsTUFBN0MsRUFBcUQsRUFBRVosUUFBdkQsRUFBaUU7QUFDL0QsWUFBTUMsR0FBRyxHQUFHLEtBQUtBLEdBQUwsQ0FBU0QsUUFBVCxFQUFtQmEsVUFBbkIsQ0FBWjs7QUFDQSxZQUFJUSxJQUFJLENBQUNwQixHQUFELEVBQU1ELFFBQU4sQ0FBUixFQUF5QjtBQUN2QixpQkFBT0MsR0FBUDtBQUNEO0FBQ0Y7O0FBQ0QsYUFBTzhCLFNBQVA7QUFDRDs7O1dBRUQsZ0JBQU9WLElBQVAsRUFBYVcsWUFBYixFQUEyQmxDLFNBQTNCLEVBQXNDO0FBQ3BDLFVBQU1lLFVBQVUsR0FBR0MsaUJBQVFDLGVBQVIsQ0FBd0JqQixTQUF4QixDQUFuQjs7QUFFQSxXQUFLLElBQUlFLFFBQVEsR0FBRyxDQUFwQixFQUF1QkEsUUFBUSxHQUFHLEtBQUtVLEtBQUwsQ0FBV0UsTUFBN0MsRUFBcUQsRUFBRVosUUFBdkQsRUFBaUU7QUFDL0QsWUFBTUMsR0FBRyxHQUFHLEtBQUtBLEdBQUwsQ0FBU0QsUUFBVCxFQUFtQmEsVUFBbkIsQ0FBWjtBQUNBbUIsUUFBQUEsWUFBWSxHQUFHWCxJQUFJLENBQUNXLFlBQUQsRUFBZS9CLEdBQWYsRUFBb0JELFFBQXBCLENBQW5CO0FBQ0Q7O0FBQ0QsYUFBT2dDLFlBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7RGF0YVJvd30gZnJvbSAnLi9kYXRhLXJvdyc7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vZGF0YS1jb250YWluZXItaW50ZXJmYWNlJykuRGF0YUNvbnRhaW5lckludGVyZmFjZX0gZGF0YUNvbnRhaW5lclxuICogQHBhcmFtIHtpbXBvcnQoJy4vZGF0YS1yb3cnKS5TaGFyZWRSb3dPcHRpb25zfSBzaGFyZWRSb3dcbiAqL1xuZnVuY3Rpb24qIHJvd3NJdGVyYXRvcihkYXRhQ29udGFpbmVyLCBzaGFyZWRSb3cpIHtcbiAgY29uc3QgbnVtUm93cyA9IGRhdGFDb250YWluZXIubnVtUm93cygpO1xuICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgbnVtUm93czsgKytyb3dJbmRleCkge1xuICAgIHlpZWxkIGRhdGFDb250YWluZXIucm93KHJvd0luZGV4LCBzaGFyZWRSb3cpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vZGF0YS1jb250YWluZXItaW50ZXJmYWNlJykuRGF0YUNvbnRhaW5lckludGVyZmFjZX0gZGF0YUNvbnRhaW5lclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbkluZGV4XG4gKi9cbmZ1bmN0aW9uKiBjb2x1bW5JdGVyYXRvcihkYXRhQ29udGFpbmVyLCBjb2x1bW5JbmRleCkge1xuICBjb25zdCBudW1Sb3dzID0gZGF0YUNvbnRhaW5lci5udW1Sb3dzKCk7XG4gIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBudW1Sb3dzOyArK3Jvd0luZGV4KSB7XG4gICAgeWllbGQgZGF0YUNvbnRhaW5lci52YWx1ZUF0KHJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvd0RhdGFDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgaWYgKCFkYXRhLnJvd3MpIHtcbiAgICAgIHRocm93IEVycm9yKCdSb3dEYXRhQ29udGFpbmVyOiBubyByb3dzIHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEucm93cykpIHtcbiAgICAgIHRocm93IEVycm9yKFwiUm93RGF0YUNvbnRhaW5lcjogcm93cyBvYmplY3QgaXNuJ3QgYW4gYXJyYXlcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fcm93cyA9IGRhdGEucm93cztcbiAgICB0aGlzLl9udW1Db2x1bW5zID0gZGF0YS5yb3dzWzBdPy5sZW5ndGggfHwgMDtcbiAgfVxuXG4gIG51bVJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3MubGVuZ3RoO1xuICB9XG5cbiAgbnVtQ29sdW1ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtQ29sdW1ucztcbiAgfVxuXG4gIHZhbHVlQXQocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgaWYgKHRoaXMuX3Jvd3Nbcm93SW5kZXhdID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3Nbcm93SW5kZXhdW2NvbHVtbkluZGV4XTtcbiAgfVxuXG4gIHJvdyhyb3dJbmRleCwgc2hhcmVkUm93KSB7XG4gICAgY29uc3QgdFNoYXJlZFJvdyA9IERhdGFSb3cuY3JlYXRlU2hhcmVkUm93KHNoYXJlZFJvdyk7XG4gICAgaWYgKHRTaGFyZWRSb3cpIHtcbiAgICAgIHRTaGFyZWRSb3cuc2V0U291cmNlKHRoaXMsIHJvd0luZGV4KTtcbiAgICAgIHJldHVybiB0U2hhcmVkUm93O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0YVJvdyh0aGlzLCByb3dJbmRleCk7XG4gIH1cblxuICByb3dBc0FycmF5KHJvd0luZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3Nbcm93SW5kZXhdO1xuICB9XG5cbiAgcm93cyhzaGFyZWRSb3cpIHtcbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93KTtcbiAgICByZXR1cm4gcm93c0l0ZXJhdG9yKHRoaXMsIHRTaGFyZWRSb3cpO1xuICB9XG5cbiAgY29sdW1uKGNvbHVtbkluZGV4KSB7XG4gICAgcmV0dXJuIGNvbHVtbkl0ZXJhdG9yKHRoaXMsIGNvbHVtbkluZGV4KTtcbiAgfVxuXG4gIGZsYXR0ZW5EYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgZ2V0UGxhaW5JbmRleCh2YWxpZCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzLm1hcCgoXywgaSkgPT4gaSk7XG4gIH1cblxuICBtYXAoZnVuYywgc2hhcmVkUm93LCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93KTtcblxuICAgIGNvbnN0IHtzdGFydCA9IDAsIGVuZCA9IHRoaXMubnVtUm93cygpfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgZW5kUm93ID0gTWF0aC5taW4odGhpcy5udW1Sb3dzKCksIGVuZCk7XG5cbiAgICBjb25zdCBvdXQgPSBbXTtcbiAgICBmb3IgKGxldCByb3dJbmRleCA9IHN0YXJ0OyByb3dJbmRleCA8IGVuZFJvdzsgKytyb3dJbmRleCkge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3cocm93SW5kZXgsIHRTaGFyZWRSb3cpO1xuICAgICAgb3V0LnB1c2goZnVuYyhyb3csIHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBtYXBJbmRleChmdW5jLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7c3RhcnQgPSAwLCBlbmQgPSB0aGlzLm51bVJvd3MoKX0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGVuZFJvdyA9IE1hdGgubWluKHRoaXMubnVtUm93cygpLCBlbmQpO1xuXG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgZm9yIChsZXQgcm93SW5kZXggPSBzdGFydDsgcm93SW5kZXggPCBlbmRSb3c7ICsrcm93SW5kZXgpIHtcbiAgICAgIG91dC5wdXNoKGZ1bmMoe2luZGV4OiByb3dJbmRleH0sIHRoaXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZpbmQoZnVuYywgc2hhcmVkUm93KSB7XG4gICAgY29uc3QgdFNoYXJlZFJvdyA9IERhdGFSb3cuY3JlYXRlU2hhcmVkUm93KHNoYXJlZFJvdyk7XG5cbiAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgdGhpcy5fcm93cy5sZW5ndGg7ICsrcm93SW5kZXgpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93KHJvd0luZGV4LCB0U2hhcmVkUm93KTtcbiAgICAgIGlmIChmdW5jKHJvdywgcm93SW5kZXgpKSB7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZWR1Y2UoZnVuYywgaW5pdGlhbFZhbHVlLCBzaGFyZWRSb3cpIHtcbiAgICBjb25zdCB0U2hhcmVkUm93ID0gRGF0YVJvdy5jcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93KTtcblxuICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLl9yb3dzLmxlbmd0aDsgKytyb3dJbmRleCkge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3cocm93SW5kZXgsIHRTaGFyZWRSb3cpO1xuICAgICAgaW5pdGlhbFZhbHVlID0gZnVuYyhpbml0aWFsVmFsdWUsIHJvdywgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdGlhbFZhbHVlO1xuICB9XG59XG4iXX0=