"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledLayerName = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../common/styled-components");

var _icons = require("../common/icons");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dataUtils = require("../../utils/data-utils");

var _interactionUtils = require("../../utils/interaction-utils");

var _templateObject, _templateObject2;

var StyledLayerName = (0, _styledComponents["default"])(_styledComponents2.CenterFlexbox)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n\n  svg {\n    margin-right: 4px;\n  }\n"])), function (props) {
  return props.theme.textColorHl;
});
exports.StyledLayerName = StyledLayerName;

var StyledTable = _styledComponents["default"].table(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  & .row__delta-value {\n    text-align: right;\n\n    &.positive {\n      color: ", ";\n    }\n\n    &.negative {\n      color: ", ";\n    }\n  }\n"])), function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.negativeBtnActBgd;
});
/** @type {import('./layer-hover-info').RowComponent} */


var Row = function Row(_ref) {
  var name = _ref.name,
      value = _ref.value,
      deltaValue = _ref.deltaValue,
      url = _ref.url;

  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  var asImg = /<img>/.test(name);
  return /*#__PURE__*/_react["default"].createElement("tr", {
    className: "row",
    key: name
  }, /*#__PURE__*/_react["default"].createElement("td", {
    className: "row__name"
  }, name), /*#__PURE__*/_react["default"].createElement("td", {
    className: "row__value"
  }, asImg ? /*#__PURE__*/_react["default"].createElement("img", {
    src: value
  }) : url ? /*#__PURE__*/_react["default"].createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: url
  }, value) : value), (0, _dataUtils.notNullorUndefined)(deltaValue) && /*#__PURE__*/_react["default"].createElement("td", {
    className: "row__delta-value ".concat(deltaValue.toString().charAt(0) === '+' ? 'positive' : 'negative')
  }, deltaValue));
};

var EntryInfo = function EntryInfo(_ref2) {
  var fieldsToShow = _ref2.fieldsToShow,
      fields = _ref2.fields,
      data = _ref2.data,
      primaryData = _ref2.primaryData,
      compareType = _ref2.compareType;
  return /*#__PURE__*/_react["default"].createElement("tbody", null, fieldsToShow.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(EntryInfoRow, {
      key: item.name,
      item: item,
      fields: fields,
      data: data,
      primaryData: primaryData,
      compareType: compareType
    });
  }));
};

var EntryInfoRow = function EntryInfoRow(_ref3) {
  var item = _ref3.item,
      fields = _ref3.fields,
      data = _ref3.data,
      primaryData = _ref3.primaryData,
      compareType = _ref3.compareType;
  var fieldIdx = fields.findIndex(function (f) {
    return f.name === item.name;
  });

  if (fieldIdx < 0) {
    return null;
  }

  var field = fields[fieldIdx];
  var displayValue = (0, _interactionUtils.getTooltipDisplayValue)({
    item: item,
    field: field,
    data: data,
    fieldIdx: fieldIdx
  });
  var displayDeltaValue = (0, _interactionUtils.getTooltipDisplayDeltaValue)({
    item: item,
    field: field,
    data: data,
    fieldIdx: fieldIdx,
    primaryData: primaryData,
    compareType: compareType
  });
  return /*#__PURE__*/_react["default"].createElement(Row, {
    name: field.displayName || field.name,
    value: displayValue,
    deltaValue: displayDeltaValue
  });
}; // TODO: supporting comparative value for aggregated cells as well


var CellInfo = function CellInfo(_ref4) {
  var data = _ref4.data,
      layer = _ref4.layer;
  console.log('show cell info');
  var _layer$config = layer.config,
      colorField = _layer$config.colorField,
      sizeField = _layer$config.sizeField;
  return /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement(Row, {
    name: 'total points',
    key: "count",
    value: data.points && data.points.length
  }), colorField && layer.visualChannels.color ? /*#__PURE__*/_react["default"].createElement(Row, {
    name: layer.getVisualChannelDescription('color').measure,
    key: "color",
    value: data.colorValue || 'N/A'
  }) : null, sizeField && layer.visualChannels.size ? /*#__PURE__*/_react["default"].createElement(Row, {
    name: layer.getVisualChannelDescription('size').measure,
    key: "size",
    value: data.elevationValue || 'N/A'
  }) : null, layer.type === 'meshagg' && /*#__PURE__*/_react["default"].createElement(Row, {
    name: 'meshcode',
    key: "size",
    value: data.meshcode || 'N/A'
  }));
};

var LayerHoverInfoFactory = function LayerHoverInfoFactory() {
  var LayerHoverInfo = function LayerHoverInfo(props) {
    var data = props.data,
        layer = props.layer;

    if (!data || !layer) {
      return null;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "map-popover__layer-info"
    }, /*#__PURE__*/_react["default"].createElement(StyledLayerName, {
      className: "map-popover__layer-name"
    }, /*#__PURE__*/_react["default"].createElement(_icons.Layers, {
      height: "12px"
    }), props.layer.config.label), /*#__PURE__*/_react["default"].createElement(StyledTable, null, props.layer.isAggregated ? /*#__PURE__*/_react["default"].createElement(CellInfo, props) : /*#__PURE__*/_react["default"].createElement(EntryInfo, props)));
  };

  LayerHoverInfo.propTypes = {
    fields: _propTypes["default"].arrayOf(_propTypes["default"].any),
    fieldsToShow: _propTypes["default"].arrayOf(_propTypes["default"].any),
    layer: _propTypes["default"].object,
    data: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].any), _propTypes["default"].object])
  };
  return LayerHoverInfo;
};

var _default = LayerHoverInfoFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9sYXllci1ob3Zlci1pbmZvLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyTmFtZSIsIkNlbnRlckZsZXhib3giLCJwcm9wcyIsInRoZW1lIiwidGV4dENvbG9ySGwiLCJTdHlsZWRUYWJsZSIsInN0eWxlZCIsInRhYmxlIiwicHJpbWFyeUJ0bkJnZCIsIm5lZ2F0aXZlQnRuQWN0QmdkIiwiUm93IiwibmFtZSIsInZhbHVlIiwiZGVsdGFWYWx1ZSIsInVybCIsIm1hdGNoIiwiYXNJbWciLCJ0ZXN0IiwidG9TdHJpbmciLCJjaGFyQXQiLCJFbnRyeUluZm8iLCJmaWVsZHNUb1Nob3ciLCJmaWVsZHMiLCJkYXRhIiwicHJpbWFyeURhdGEiLCJjb21wYXJlVHlwZSIsIm1hcCIsIml0ZW0iLCJFbnRyeUluZm9Sb3ciLCJmaWVsZElkeCIsImZpbmRJbmRleCIsImYiLCJmaWVsZCIsImRpc3BsYXlWYWx1ZSIsImRpc3BsYXlEZWx0YVZhbHVlIiwiZGlzcGxheU5hbWUiLCJDZWxsSW5mbyIsImxheWVyIiwiY29uc29sZSIsImxvZyIsImNvbmZpZyIsImNvbG9yRmllbGQiLCJzaXplRmllbGQiLCJwb2ludHMiLCJsZW5ndGgiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uIiwibWVhc3VyZSIsImNvbG9yVmFsdWUiLCJzaXplIiwiZWxldmF0aW9uVmFsdWUiLCJ0eXBlIiwibWVzaGNvZGUiLCJMYXllckhvdmVySW5mb0ZhY3RvcnkiLCJMYXllckhvdmVySW5mbyIsImxhYmVsIiwiaXNBZ2dyZWdhdGVkIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsImFueSIsIm9iamVjdCIsIm9uZU9mVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSxlQUFlLEdBQUcsa0NBQU9DLGdDQUFQLENBQUgsK05BQ2pCLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsV0FBaEI7QUFBQSxDQURZLENBQXJCOzs7QUFXUCxJQUFNQyxXQUFXLEdBQUdDLDZCQUFPQyxLQUFWLCtPQUtGLFVBQUFMLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUssYUFBaEI7QUFBQSxDQUxILEVBU0YsVUFBQU4sS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTSxpQkFBaEI7QUFBQSxDQVRILENBQWpCO0FBY0E7OztBQUNBLElBQU1DLEdBQUcsR0FBRyxTQUFOQSxHQUFNLE9BQW9DO0FBQUEsTUFBbENDLElBQWtDLFFBQWxDQSxJQUFrQztBQUFBLE1BQTVCQyxLQUE0QixRQUE1QkEsS0FBNEI7QUFBQSxNQUFyQkMsVUFBcUIsUUFBckJBLFVBQXFCO0FBQUEsTUFBVEMsR0FBUyxRQUFUQSxHQUFTOztBQUM5QztBQUNBLE1BQUksQ0FBQ0EsR0FBRCxJQUFRRixLQUFSLElBQWlCLE9BQU9BLEtBQVAsS0FBaUIsUUFBbEMsSUFBOENBLEtBQUssQ0FBQ0csS0FBTixDQUFZLE9BQVosQ0FBbEQsRUFBd0U7QUFDdEVELElBQUFBLEdBQUcsR0FBR0YsS0FBTjtBQUNEOztBQUVELE1BQU1JLEtBQUssR0FBRyxRQUFRQyxJQUFSLENBQWFOLElBQWIsQ0FBZDtBQUNBLHNCQUNFO0FBQUksSUFBQSxTQUFTLEVBQUMsS0FBZDtBQUFvQixJQUFBLEdBQUcsRUFBRUE7QUFBekIsa0JBQ0U7QUFBSSxJQUFBLFNBQVMsRUFBQztBQUFkLEtBQTJCQSxJQUEzQixDQURGLGVBRUU7QUFBSSxJQUFBLFNBQVMsRUFBQztBQUFkLEtBQ0dLLEtBQUssZ0JBQ0o7QUFBSyxJQUFBLEdBQUcsRUFBRUo7QUFBVixJQURJLEdBRUZFLEdBQUcsZ0JBQ0w7QUFBRyxJQUFBLE1BQU0sRUFBQyxRQUFWO0FBQW1CLElBQUEsR0FBRyxFQUFDLHFCQUF2QjtBQUE2QyxJQUFBLElBQUksRUFBRUE7QUFBbkQsS0FDR0YsS0FESCxDQURLLEdBS0xBLEtBUkosQ0FGRixFQWFHLG1DQUFtQkMsVUFBbkIsa0JBQ0M7QUFDRSxJQUFBLFNBQVMsNkJBQ1BBLFVBQVUsQ0FBQ0ssUUFBWCxHQUFzQkMsTUFBdEIsQ0FBNkIsQ0FBN0IsTUFBb0MsR0FBcEMsR0FBMEMsVUFBMUMsR0FBdUQsVUFEaEQ7QUFEWCxLQUtHTixVQUxILENBZEosQ0FERjtBQXlCRCxDQWhDRDs7QUFrQ0EsSUFBTU8sU0FBUyxHQUFHLFNBQVpBLFNBQVk7QUFBQSxNQUFFQyxZQUFGLFNBQUVBLFlBQUY7QUFBQSxNQUFnQkMsTUFBaEIsU0FBZ0JBLE1BQWhCO0FBQUEsTUFBd0JDLElBQXhCLFNBQXdCQSxJQUF4QjtBQUFBLE1BQThCQyxXQUE5QixTQUE4QkEsV0FBOUI7QUFBQSxNQUEyQ0MsV0FBM0MsU0FBMkNBLFdBQTNDO0FBQUEsc0JBQ2hCLCtDQUNHSixZQUFZLENBQUNLLEdBQWIsQ0FBaUIsVUFBQUMsSUFBSTtBQUFBLHdCQUNwQixnQ0FBQyxZQUFEO0FBQ0UsTUFBQSxHQUFHLEVBQUVBLElBQUksQ0FBQ2hCLElBRFo7QUFFRSxNQUFBLElBQUksRUFBRWdCLElBRlI7QUFHRSxNQUFBLE1BQU0sRUFBRUwsTUFIVjtBQUlFLE1BQUEsSUFBSSxFQUFFQyxJQUpSO0FBS0UsTUFBQSxXQUFXLEVBQUVDLFdBTGY7QUFNRSxNQUFBLFdBQVcsRUFBRUM7QUFOZixNQURvQjtBQUFBLEdBQXJCLENBREgsQ0FEZ0I7QUFBQSxDQUFsQjs7QUFlQSxJQUFNRyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxRQUFvRDtBQUFBLE1BQWxERCxJQUFrRCxTQUFsREEsSUFBa0Q7QUFBQSxNQUE1Q0wsTUFBNEMsU0FBNUNBLE1BQTRDO0FBQUEsTUFBcENDLElBQW9DLFNBQXBDQSxJQUFvQztBQUFBLE1BQTlCQyxXQUE4QixTQUE5QkEsV0FBOEI7QUFBQSxNQUFqQkMsV0FBaUIsU0FBakJBLFdBQWlCO0FBQ3ZFLE1BQU1JLFFBQVEsR0FBR1AsTUFBTSxDQUFDUSxTQUFQLENBQWlCLFVBQUFDLENBQUM7QUFBQSxXQUFJQSxDQUFDLENBQUNwQixJQUFGLEtBQVdnQixJQUFJLENBQUNoQixJQUFwQjtBQUFBLEdBQWxCLENBQWpCOztBQUNBLE1BQUlrQixRQUFRLEdBQUcsQ0FBZixFQUFrQjtBQUNoQixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFNRyxLQUFLLEdBQUdWLE1BQU0sQ0FBQ08sUUFBRCxDQUFwQjtBQUNBLE1BQU1JLFlBQVksR0FBRyw4Q0FBdUI7QUFBQ04sSUFBQUEsSUFBSSxFQUFKQSxJQUFEO0FBQU9LLElBQUFBLEtBQUssRUFBTEEsS0FBUDtBQUFjVCxJQUFBQSxJQUFJLEVBQUpBLElBQWQ7QUFBb0JNLElBQUFBLFFBQVEsRUFBUkE7QUFBcEIsR0FBdkIsQ0FBckI7QUFFQSxNQUFNSyxpQkFBaUIsR0FBRyxtREFBNEI7QUFDcERQLElBQUFBLElBQUksRUFBSkEsSUFEb0Q7QUFFcERLLElBQUFBLEtBQUssRUFBTEEsS0FGb0Q7QUFHcERULElBQUFBLElBQUksRUFBSkEsSUFIb0Q7QUFJcERNLElBQUFBLFFBQVEsRUFBUkEsUUFKb0Q7QUFLcERMLElBQUFBLFdBQVcsRUFBWEEsV0FMb0Q7QUFNcERDLElBQUFBLFdBQVcsRUFBWEE7QUFOb0QsR0FBNUIsQ0FBMUI7QUFTQSxzQkFDRSxnQ0FBQyxHQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUVPLEtBQUssQ0FBQ0csV0FBTixJQUFxQkgsS0FBSyxDQUFDckIsSUFEbkM7QUFFRSxJQUFBLEtBQUssRUFBRXNCLFlBRlQ7QUFHRSxJQUFBLFVBQVUsRUFBRUM7QUFIZCxJQURGO0FBT0QsQ0F4QkQsQyxDQTBCQTs7O0FBQ0EsSUFBTUUsUUFBUSxHQUFHLFNBQVhBLFFBQVcsUUFBbUI7QUFBQSxNQUFqQmIsSUFBaUIsU0FBakJBLElBQWlCO0FBQUEsTUFBWGMsS0FBVyxTQUFYQSxLQUFXO0FBQ2xDQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQURrQyxzQkFFRkYsS0FBSyxDQUFDRyxNQUZKO0FBQUEsTUFFM0JDLFVBRjJCLGlCQUUzQkEsVUFGMkI7QUFBQSxNQUVmQyxTQUZlLGlCQUVmQSxTQUZlO0FBSWxDLHNCQUNFLDREQUNFLGdDQUFDLEdBQUQ7QUFBSyxJQUFBLElBQUksRUFBRSxjQUFYO0FBQTJCLElBQUEsR0FBRyxFQUFDLE9BQS9CO0FBQXVDLElBQUEsS0FBSyxFQUFFbkIsSUFBSSxDQUFDb0IsTUFBTCxJQUFlcEIsSUFBSSxDQUFDb0IsTUFBTCxDQUFZQztBQUF6RSxJQURGLEVBRUdILFVBQVUsSUFBSUosS0FBSyxDQUFDUSxjQUFOLENBQXFCQyxLQUFuQyxnQkFDQyxnQ0FBQyxHQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUVULEtBQUssQ0FBQ1UsMkJBQU4sQ0FBa0MsT0FBbEMsRUFBMkNDLE9BRG5EO0FBRUUsSUFBQSxHQUFHLEVBQUMsT0FGTjtBQUdFLElBQUEsS0FBSyxFQUFFekIsSUFBSSxDQUFDMEIsVUFBTCxJQUFtQjtBQUg1QixJQURELEdBTUcsSUFSTixFQVNHUCxTQUFTLElBQUlMLEtBQUssQ0FBQ1EsY0FBTixDQUFxQkssSUFBbEMsZ0JBQ0MsZ0NBQUMsR0FBRDtBQUNFLElBQUEsSUFBSSxFQUFFYixLQUFLLENBQUNVLDJCQUFOLENBQWtDLE1BQWxDLEVBQTBDQyxPQURsRDtBQUVFLElBQUEsR0FBRyxFQUFDLE1BRk47QUFHRSxJQUFBLEtBQUssRUFBRXpCLElBQUksQ0FBQzRCLGNBQUwsSUFBdUI7QUFIaEMsSUFERCxHQU1HLElBZk4sRUFpQkdkLEtBQUssQ0FBQ2UsSUFBTixLQUFlLFNBQWYsaUJBQTZCLGdDQUFDLEdBQUQ7QUFDNUIsSUFBQSxJQUFJLEVBQUUsVUFEc0I7QUFFNUIsSUFBQSxHQUFHLEVBQUMsTUFGd0I7QUFHNUIsSUFBQSxLQUFLLEVBQUU3QixJQUFJLENBQUM4QixRQUFMLElBQWlCO0FBSEksSUFqQmhDLENBREY7QUF5QkQsQ0E3QkQ7O0FBK0JBLElBQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsR0FBTTtBQUNsQyxNQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUFyRCxLQUFLLEVBQUk7QUFBQSxRQUN2QnFCLElBRHVCLEdBQ1JyQixLQURRLENBQ3ZCcUIsSUFEdUI7QUFBQSxRQUNqQmMsS0FEaUIsR0FDUm5DLEtBRFEsQ0FDakJtQyxLQURpQjs7QUFHOUIsUUFBSSxDQUFDZCxJQUFELElBQVMsQ0FBQ2MsS0FBZCxFQUFxQjtBQUNuQixhQUFPLElBQVA7QUFDRDs7QUFFRCx3QkFDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsb0JBQ0UsZ0NBQUMsZUFBRDtBQUFpQixNQUFBLFNBQVMsRUFBQztBQUEzQixvQkFDRSxnQ0FBQyxhQUFEO0FBQVEsTUFBQSxNQUFNLEVBQUM7QUFBZixNQURGLEVBRUduQyxLQUFLLENBQUNtQyxLQUFOLENBQVlHLE1BQVosQ0FBbUJnQixLQUZ0QixDQURGLGVBS0UsZ0NBQUMsV0FBRCxRQUNHdEQsS0FBSyxDQUFDbUMsS0FBTixDQUFZb0IsWUFBWixnQkFBMkIsZ0NBQUMsUUFBRCxFQUFjdkQsS0FBZCxDQUEzQixnQkFBcUQsZ0NBQUMsU0FBRCxFQUFlQSxLQUFmLENBRHhELENBTEYsQ0FERjtBQVdELEdBbEJEOztBQW9CQXFELEVBQUFBLGNBQWMsQ0FBQ0csU0FBZixHQUEyQjtBQUN6QnBDLElBQUFBLE1BQU0sRUFBRXFDLHNCQUFVQyxPQUFWLENBQWtCRCxzQkFBVUUsR0FBNUIsQ0FEaUI7QUFFekJ4QyxJQUFBQSxZQUFZLEVBQUVzQyxzQkFBVUMsT0FBVixDQUFrQkQsc0JBQVVFLEdBQTVCLENBRlc7QUFHekJ4QixJQUFBQSxLQUFLLEVBQUVzQixzQkFBVUcsTUFIUTtBQUl6QnZDLElBQUFBLElBQUksRUFBRW9DLHNCQUFVSSxTQUFWLENBQW9CLENBQUNKLHNCQUFVQyxPQUFWLENBQWtCRCxzQkFBVUUsR0FBNUIsQ0FBRCxFQUFtQ0Ysc0JBQVVHLE1BQTdDLENBQXBCO0FBSm1CLEdBQTNCO0FBTUEsU0FBT1AsY0FBUDtBQUNELENBNUJEOztlQThCZUQscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge0NlbnRlckZsZXhib3h9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7TGF5ZXJzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtub3ROdWxsb3JVbmRlZmluZWR9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuaW1wb3J0IHtnZXRUb29sdGlwRGlzcGxheVZhbHVlLCBnZXRUb29sdGlwRGlzcGxheURlbHRhVmFsdWV9IGZyb20gJ3V0aWxzL2ludGVyYWN0aW9uLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExheWVyTmFtZSA9IHN0eWxlZChDZW50ZXJGbGV4Ym94KWBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjQzcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuXG4gIHN2ZyB7XG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFRhYmxlID0gc3R5bGVkLnRhYmxlYFxuICAmIC5yb3dfX2RlbHRhLXZhbHVlIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcblxuICAgICYucG9zaXRpdmUge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gICAgfVxuXG4gICAgJi5uZWdhdGl2ZSB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5uZWdhdGl2ZUJ0bkFjdEJnZH07XG4gICAgfVxuICB9XG5gO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9sYXllci1ob3Zlci1pbmZvJykuUm93Q29tcG9uZW50fSAqL1xuY29uc3QgUm93ID0gKHtuYW1lLCB2YWx1ZSwgZGVsdGFWYWx1ZSwgdXJsfSkgPT4ge1xuICAvLyBTZXQgJ3VybCcgdG8gJ3ZhbHVlJyBpZiBpdCBsb29rcyBsaWtlIGEgdXJsXG4gIGlmICghdXJsICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2goL15odHRwLykpIHtcbiAgICB1cmwgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGFzSW1nID0gLzxpbWc+Ly50ZXN0KG5hbWUpO1xuICByZXR1cm4gKFxuICAgIDx0ciBjbGFzc05hbWU9XCJyb3dcIiBrZXk9e25hbWV9PlxuICAgICAgPHRkIGNsYXNzTmFtZT1cInJvd19fbmFtZVwiPntuYW1lfTwvdGQ+XG4gICAgICA8dGQgY2xhc3NOYW1lPVwicm93X192YWx1ZVwiPlxuICAgICAgICB7YXNJbWcgPyAoXG4gICAgICAgICAgPGltZyBzcmM9e3ZhbHVlfSAvPlxuICAgICAgICApIDogdXJsID8gKFxuICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPXt1cmx9PlxuICAgICAgICAgICAge3ZhbHVlfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICApfVxuICAgICAgPC90ZD5cbiAgICAgIHtub3ROdWxsb3JVbmRlZmluZWQoZGVsdGFWYWx1ZSkgJiYgKFxuICAgICAgICA8dGRcbiAgICAgICAgICBjbGFzc05hbWU9e2Byb3dfX2RlbHRhLXZhbHVlICR7XG4gICAgICAgICAgICBkZWx0YVZhbHVlLnRvU3RyaW5nKCkuY2hhckF0KDApID09PSAnKycgPyAncG9zaXRpdmUnIDogJ25lZ2F0aXZlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAge2RlbHRhVmFsdWV9XG4gICAgICAgIDwvdGQ+XG4gICAgICApfVxuICAgIDwvdHI+XG4gICk7XG59O1xuXG5jb25zdCBFbnRyeUluZm8gPSAoe2ZpZWxkc1RvU2hvdywgZmllbGRzLCBkYXRhLCBwcmltYXJ5RGF0YSwgY29tcGFyZVR5cGV9KSA9PiAoXG4gIDx0Ym9keT5cbiAgICB7ZmllbGRzVG9TaG93Lm1hcChpdGVtID0+IChcbiAgICAgIDxFbnRyeUluZm9Sb3dcbiAgICAgICAga2V5PXtpdGVtLm5hbWV9XG4gICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgIGZpZWxkcz17ZmllbGRzfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICBwcmltYXJ5RGF0YT17cHJpbWFyeURhdGF9XG4gICAgICAgIGNvbXBhcmVUeXBlPXtjb21wYXJlVHlwZX1cbiAgICAgIC8+XG4gICAgKSl9XG4gIDwvdGJvZHk+XG4pO1xuXG5jb25zdCBFbnRyeUluZm9Sb3cgPSAoe2l0ZW0sIGZpZWxkcywgZGF0YSwgcHJpbWFyeURhdGEsIGNvbXBhcmVUeXBlfSkgPT4ge1xuICBjb25zdCBmaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IGl0ZW0ubmFtZSk7XG4gIGlmIChmaWVsZElkeCA8IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBmaWVsZCA9IGZpZWxkc1tmaWVsZElkeF07XG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IGdldFRvb2x0aXBEaXNwbGF5VmFsdWUoe2l0ZW0sIGZpZWxkLCBkYXRhLCBmaWVsZElkeH0pO1xuXG4gIGNvbnN0IGRpc3BsYXlEZWx0YVZhbHVlID0gZ2V0VG9vbHRpcERpc3BsYXlEZWx0YVZhbHVlKHtcbiAgICBpdGVtLFxuICAgIGZpZWxkLFxuICAgIGRhdGEsXG4gICAgZmllbGRJZHgsXG4gICAgcHJpbWFyeURhdGEsXG4gICAgY29tcGFyZVR5cGVcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Um93XG4gICAgICBuYW1lPXtmaWVsZC5kaXNwbGF5TmFtZSB8fCBmaWVsZC5uYW1lfVxuICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cbiAgICAgIGRlbHRhVmFsdWU9e2Rpc3BsYXlEZWx0YVZhbHVlfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyBUT0RPOiBzdXBwb3J0aW5nIGNvbXBhcmF0aXZlIHZhbHVlIGZvciBhZ2dyZWdhdGVkIGNlbGxzIGFzIHdlbGxcbmNvbnN0IENlbGxJbmZvID0gKHtkYXRhLCBsYXllcn0pID0+IHtcbiAgY29uc29sZS5sb2coJ3Nob3cgY2VsbCBpbmZvJyk7XG4gIGNvbnN0IHtjb2xvckZpZWxkLCBzaXplRmllbGR9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIHJldHVybiAoXG4gICAgPHRib2R5PlxuICAgICAgPFJvdyBuYW1lPXsndG90YWwgcG9pbnRzJ30ga2V5PVwiY291bnRcIiB2YWx1ZT17ZGF0YS5wb2ludHMgJiYgZGF0YS5wb2ludHMubGVuZ3RofSAvPlxuICAgICAge2NvbG9yRmllbGQgJiYgbGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3IgPyAoXG4gICAgICAgIDxSb3dcbiAgICAgICAgICBuYW1lPXtsYXllci5nZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oJ2NvbG9yJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJjb2xvclwiXG4gICAgICAgICAgdmFsdWU9e2RhdGEuY29sb3JWYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3NpemVGaWVsZCAmJiBsYXllci52aXN1YWxDaGFubmVscy5zaXplID8gKFxuICAgICAgICA8Um93XG4gICAgICAgICAgbmFtZT17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdzaXplJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJzaXplXCJcbiAgICAgICAgICB2YWx1ZT17ZGF0YS5lbGV2YXRpb25WYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7bGF5ZXIudHlwZSA9PT0gJ21lc2hhZ2cnICYmICA8Um93XG4gICAgICAgIG5hbWU9eydtZXNoY29kZSd9XG4gICAgICAgIGtleT1cInNpemVcIlxuICAgICAgICB2YWx1ZT17ZGF0YS5tZXNoY29kZSB8fCAnTi9BJ31cbiAgICAgIC8+fVxuICAgIDwvdGJvZHk+XG4gICk7XG59O1xuXG5jb25zdCBMYXllckhvdmVySW5mb0ZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IExheWVySG92ZXJJbmZvID0gcHJvcHMgPT4ge1xuICAgIGNvbnN0IHtkYXRhLCBsYXllcn0gPSBwcm9wcztcblxuICAgIGlmICghZGF0YSB8fCAhbGF5ZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX19sYXllci1pbmZvXCI+XG4gICAgICAgIDxTdHlsZWRMYXllck5hbWUgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX2xheWVyLW5hbWVcIj5cbiAgICAgICAgICA8TGF5ZXJzIGhlaWdodD1cIjEycHhcIiAvPlxuICAgICAgICAgIHtwcm9wcy5sYXllci5jb25maWcubGFiZWx9XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJOYW1lPlxuICAgICAgICA8U3R5bGVkVGFibGU+XG4gICAgICAgICAge3Byb3BzLmxheWVyLmlzQWdncmVnYXRlZCA/IDxDZWxsSW5mbyB7Li4ucHJvcHN9IC8+IDogPEVudHJ5SW5mbyB7Li4ucHJvcHN9IC8+fVxuICAgICAgICA8L1N0eWxlZFRhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBMYXllckhvdmVySW5mby5wcm9wVHlwZXMgPSB7XG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBmaWVsZHNUb1Nob3c6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRhdGE6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLCBQcm9wVHlwZXMub2JqZWN0XSlcbiAgfTtcbiAgcmV0dXJuIExheWVySG92ZXJJbmZvO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJIb3ZlckluZm9GYWN0b3J5O1xuIl19