"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataRow = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
var DataRow = /*#__PURE__*/function () {
  function DataRow(dataContainer, rowIndex) {
    (0, _classCallCheck2["default"])(this, DataRow);
    this.setSource(dataContainer, rowIndex);
  }

  (0, _createClass2["default"])(DataRow, [{
    key: "valueAt",
    value: function valueAt(columnIndex) {
      return this._dataContainer.valueAt(this._rowIndex, columnIndex);
    }
  }, {
    key: "values",
    value: function values() {
      return this._dataContainer.rowAsArray(this._rowIndex);
    }
  }, {
    key: "setSource",
    value: function setSource(dataContainer, rowIndex) {
      this._dataContainer = dataContainer;
      this._rowIndex = rowIndex;
    }
  }, {
    key: "map",
    value: function map(handler) {
      var numColumns = this._dataContainer.numColumns();

      var out = [];

      for (var column = 0; column < numColumns; ++column) {
        out[column] = handler(this.valueAt(column), column);
      }

      return out;
    }
  }], [{
    key: "createSharedRow",
    value: function createSharedRow(sharedRowDesc) {
      if (sharedRowDesc === true) {
        return new DataRow(null, 0);
      }

      return sharedRowDesc;
    }
  }]);
  return DataRow;
}();

exports.DataRow = DataRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90YWJsZS11dGlscy9kYXRhLXJvdy5qcyJdLCJuYW1lcyI6WyJEYXRhUm93IiwiZGF0YUNvbnRhaW5lciIsInJvd0luZGV4Iiwic2V0U291cmNlIiwiY29sdW1uSW5kZXgiLCJfZGF0YUNvbnRhaW5lciIsInZhbHVlQXQiLCJfcm93SW5kZXgiLCJyb3dBc0FycmF5IiwiaGFuZGxlciIsIm51bUNvbHVtbnMiLCJvdXQiLCJjb2x1bW4iLCJzaGFyZWRSb3dEZXNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFFYUEsTztBQUNYLG1CQUFZQyxhQUFaLEVBQTJCQyxRQUEzQixFQUFxQztBQUFBO0FBQ25DLFNBQUtDLFNBQUwsQ0FBZUYsYUFBZixFQUE4QkMsUUFBOUI7QUFDRDs7OztXQVNELGlCQUFRRSxXQUFSLEVBQXFCO0FBQ25CLGFBQU8sS0FBS0MsY0FBTCxDQUFvQkMsT0FBcEIsQ0FBNEIsS0FBS0MsU0FBakMsRUFBNENILFdBQTVDLENBQVA7QUFDRDs7O1dBRUQsa0JBQVM7QUFDUCxhQUFPLEtBQUtDLGNBQUwsQ0FBb0JHLFVBQXBCLENBQStCLEtBQUtELFNBQXBDLENBQVA7QUFDRDs7O1dBRUQsbUJBQVVOLGFBQVYsRUFBeUJDLFFBQXpCLEVBQW1DO0FBQ2pDLFdBQUtHLGNBQUwsR0FBc0JKLGFBQXRCO0FBQ0EsV0FBS00sU0FBTCxHQUFpQkwsUUFBakI7QUFDRDs7O1dBRUQsYUFBSU8sT0FBSixFQUFhO0FBQ1gsVUFBTUMsVUFBVSxHQUFHLEtBQUtMLGNBQUwsQ0FBb0JLLFVBQXBCLEVBQW5COztBQUNBLFVBQU1DLEdBQUcsR0FBRyxFQUFaOztBQUNBLFdBQUssSUFBSUMsTUFBTSxHQUFHLENBQWxCLEVBQXFCQSxNQUFNLEdBQUdGLFVBQTlCLEVBQTBDLEVBQUVFLE1BQTVDLEVBQW9EO0FBQ2xERCxRQUFBQSxHQUFHLENBQUNDLE1BQUQsQ0FBSCxHQUFjSCxPQUFPLENBQUMsS0FBS0gsT0FBTCxDQUFhTSxNQUFiLENBQUQsRUFBdUJBLE1BQXZCLENBQXJCO0FBQ0Q7O0FBQ0QsYUFBT0QsR0FBUDtBQUNEOzs7V0EzQkQseUJBQXVCRSxhQUF2QixFQUFzQztBQUNwQyxVQUFJQSxhQUFhLEtBQUssSUFBdEIsRUFBNEI7QUFDMUIsZUFBTyxJQUFJYixPQUFKLENBQVksSUFBWixFQUFrQixDQUFsQixDQUFQO0FBQ0Q7O0FBQ0QsYUFBT2EsYUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGNsYXNzIERhdGFSb3cge1xuICBjb25zdHJ1Y3RvcihkYXRhQ29udGFpbmVyLCByb3dJbmRleCkge1xuICAgIHRoaXMuc2V0U291cmNlKGRhdGFDb250YWluZXIsIHJvd0luZGV4KTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTaGFyZWRSb3coc2hhcmVkUm93RGVzYykge1xuICAgIGlmIChzaGFyZWRSb3dEZXNjID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGFSb3cobnVsbCwgMCk7XG4gICAgfVxuICAgIHJldHVybiBzaGFyZWRSb3dEZXNjO1xuICB9XG5cbiAgdmFsdWVBdChjb2x1bW5JbmRleCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhQ29udGFpbmVyLnZhbHVlQXQodGhpcy5fcm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgfVxuXG4gIHZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YUNvbnRhaW5lci5yb3dBc0FycmF5KHRoaXMuX3Jvd0luZGV4KTtcbiAgfVxuXG4gIHNldFNvdXJjZShkYXRhQ29udGFpbmVyLCByb3dJbmRleCkge1xuICAgIHRoaXMuX2RhdGFDb250YWluZXIgPSBkYXRhQ29udGFpbmVyO1xuICAgIHRoaXMuX3Jvd0luZGV4ID0gcm93SW5kZXg7XG4gIH1cblxuICBtYXAoaGFuZGxlcikge1xuICAgIGNvbnN0IG51bUNvbHVtbnMgPSB0aGlzLl9kYXRhQ29udGFpbmVyLm51bUNvbHVtbnMoKTtcbiAgICBjb25zdCBvdXQgPSBbXTtcbiAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBudW1Db2x1bW5zOyArK2NvbHVtbikge1xuICAgICAgb3V0W2NvbHVtbl0gPSBoYW5kbGVyKHRoaXMudmFsdWVBdChjb2x1bW4pLCBjb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG59XG4iXX0=