"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("../../../website/src/components/common/styled-components");

var _lineChart = _interopRequireDefault(require("../common/icons/line-chart"));

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
// This is a dummy component that can be replaced to inject more side panel sub panels into the side bar
function CustomPanelsFactory() {
  var CustomPanels = function CustomPanels(props) {
    // if (props.activeSidePanel === 'Processor') {
    //   return <div className="rocket-panel">
    //     <Button>Geocoding</Button>
    //   </div>;
    // }
    // else
    if (props.activeSidePanel === 'chart') {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rocket-panel"
      }, /*#__PURE__*/_react["default"].createElement(_styledComponents.Button, null, "Chart"));
    }

    return null;
  };

  CustomPanels.defaultProps = {
    // provide a list of additional panels
    panels: [{
      id: 'solution',
      label: 'Solution',
      iconComponent: _lineChart["default"]
    }],
    // prop selector from side panel props
    getProps: function getProps(sidePanelProps) {
      return {};
    }
  };
  return CustomPanels;
}

var _default = CustomPanelsFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvY3VzdG9tLXBhbmVsLmpzIl0sIm5hbWVzIjpbIkN1c3RvbVBhbmVsc0ZhY3RvcnkiLCJDdXN0b21QYW5lbHMiLCJwcm9wcyIsImFjdGl2ZVNpZGVQYW5lbCIsImRlZmF1bHRQcm9wcyIsInBhbmVscyIsImlkIiwibGFiZWwiLCJpY29uQ29tcG9uZW50IiwiTGluZUNoYXJ0IiwiZ2V0UHJvcHMiLCJzaWRlUGFuZWxQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQXRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0EsU0FBU0EsbUJBQVQsR0FBK0I7QUFDN0IsTUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsS0FBSyxFQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUlBLEtBQUssQ0FBQ0MsZUFBTixLQUEwQixPQUE5QixFQUF1QztBQUNyQywwQkFDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsc0JBQ0UsZ0NBQUMsd0JBQUQsZ0JBREYsQ0FERjtBQUtEOztBQUVELFdBQU8sSUFBUDtBQUNELEdBaEJEOztBQWtCQUYsRUFBQUEsWUFBWSxDQUFDRyxZQUFiLEdBQTRCO0FBQzFCO0FBQ0FDLElBQUFBLE1BQU0sRUFBRSxDQUNOO0FBQ0VDLE1BQUFBLEVBQUUsRUFBRSxVQUROO0FBRUVDLE1BQUFBLEtBQUssRUFBRSxVQUZUO0FBR0VDLE1BQUFBLGFBQWEsRUFBRUM7QUFIakIsS0FETSxDQUZrQjtBQVMxQjtBQUNBQyxJQUFBQSxRQUFRLEVBQUUsa0JBQUFDLGNBQWM7QUFBQSxhQUFLLEVBQUw7QUFBQTtBQVZFLEdBQTVCO0FBYUEsU0FBT1YsWUFBUDtBQUNEOztlQUVjRCxtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vd2Vic2l0ZS9zcmMvY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IExpbmVDaGFydCBmcm9tICcuLi9jb21tb24vaWNvbnMvbGluZS1jaGFydCc7XG5cbi8vIFRoaXMgaXMgYSBkdW1teSBjb21wb25lbnQgdGhhdCBjYW4gYmUgcmVwbGFjZWQgdG8gaW5qZWN0IG1vcmUgc2lkZSBwYW5lbCBzdWIgcGFuZWxzIGludG8gdGhlIHNpZGUgYmFyXG5mdW5jdGlvbiBDdXN0b21QYW5lbHNGYWN0b3J5KCkge1xuICBjb25zdCBDdXN0b21QYW5lbHMgPSBwcm9wcyA9PiB7XG4gICAgLy8gaWYgKHByb3BzLmFjdGl2ZVNpZGVQYW5lbCA9PT0gJ1Byb2Nlc3NvcicpIHtcbiAgICAvLyAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInJvY2tldC1wYW5lbFwiPlxuICAgIC8vICAgICA8QnV0dG9uPkdlb2NvZGluZzwvQnV0dG9uPlxuICAgIC8vICAgPC9kaXY+O1xuICAgIC8vIH1cbiAgICAvLyBlbHNlXG4gICAgaWYgKHByb3BzLmFjdGl2ZVNpZGVQYW5lbCA9PT0gJ2NoYXJ0Jykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb2NrZXQtcGFuZWxcIj5cbiAgICAgICAgICA8QnV0dG9uPkNoYXJ0PC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBDdXN0b21QYW5lbHMuZGVmYXVsdFByb3BzID0ge1xuICAgIC8vIHByb3ZpZGUgYSBsaXN0IG9mIGFkZGl0aW9uYWwgcGFuZWxzXG4gICAgcGFuZWxzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnc29sdXRpb24nLFxuICAgICAgICBsYWJlbDogJ1NvbHV0aW9uJyxcbiAgICAgICAgaWNvbkNvbXBvbmVudDogTGluZUNoYXJ0XG4gICAgICB9XG4gICAgXSxcbiAgICAvLyBwcm9wIHNlbGVjdG9yIGZyb20gc2lkZSBwYW5lbCBwcm9wc1xuICAgIGdldFByb3BzOiBzaWRlUGFuZWxQcm9wcyA9PiAoe30pXG4gIH07XG5cbiAgcmV0dXJuIEN1c3RvbVBhbmVscztcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tUGFuZWxzRmFjdG9yeTtcbiJdfQ==