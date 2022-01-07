"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelTabFactory = PanelTabFactory;
exports["default"] = exports.StyledPanelTab = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../common/styled-components");

var _localization = require("../../localization");

var _templateObject;

var StyledPanelTab = _styledComponents["default"].div.attrs({
  className: 'side-panel__tab'
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: flex-end;\n  border-bottom-style: solid;\n  border-bottom-width: 2px;\n  border-bottom-color: ", ";\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  margin-right: ", "px;\n  padding-bottom: ", "px;\n  width: ", ";\n\n  :hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"])), function (props) {
  return props.active ? props.theme.panelToggleBorderColor : 'transparent';
}, function (props) {
  return props.active ? props.theme.subtextColorActive : props.theme.panelTabColor;
}, function (props) {
  return props.theme.panelToggleMarginRight;
}, function (props) {
  return props.theme.panelToggleBottomPadding;
}, function (props) {
  return props.theme.panelTabWidth;
}, function (props) {
  return props.theme.textColorHl;
});

exports.StyledPanelTab = StyledPanelTab;

function PanelTabFactory() {
  var PanelTab = function PanelTab(_ref) {
    var isActive = _ref.isActive,
        onClick = _ref.onClick,
        panel = _ref.panel;
    return /*#__PURE__*/_react["default"].createElement(StyledPanelTab, {
      "data-tip": true,
      "data-for": "".concat(panel.id, "-nav"),
      active: isActive,
      onClick: onClick
    }, /*#__PURE__*/_react["default"].createElement(panel.iconComponent, {
      height: "20px"
    }), /*#__PURE__*/_react["default"].createElement(_styledComponents2.Tooltip, {
      id: "".concat(panel.id, "-nav"),
      effect: "solid",
      delayShow: 500,
      place: "bottom"
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: panel.label || panel.id
    }))));
  };

  return PanelTab;
}

var _default = PanelTabFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtdGFiLmpzIl0sIm5hbWVzIjpbIlN0eWxlZFBhbmVsVGFiIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsImFjdGl2ZSIsInRoZW1lIiwicGFuZWxUb2dnbGVCb3JkZXJDb2xvciIsInN1YnRleHRDb2xvckFjdGl2ZSIsInBhbmVsVGFiQ29sb3IiLCJwYW5lbFRvZ2dsZU1hcmdpblJpZ2h0IiwicGFuZWxUb2dnbGVCb3R0b21QYWRkaW5nIiwicGFuZWxUYWJXaWR0aCIsInRleHRDb2xvckhsIiwiUGFuZWxUYWJGYWN0b3J5IiwiUGFuZWxUYWIiLCJpc0FjdGl2ZSIsIm9uQ2xpY2siLCJwYW5lbCIsImlkIiwibGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVPLElBQU1BLGNBQWMsR0FBR0MsNkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUM3Q0MsRUFBQUEsU0FBUyxFQUFFO0FBRGtDLENBQWpCLENBQUgsMFlBTUYsVUFBQUMsS0FBSztBQUFBLFNBQzFCQSxLQUFLLENBQUNDLE1BQU4sR0FBZUQsS0FBSyxDQUFDRSxLQUFOLENBQVlDLHNCQUEzQixHQUFvRCxhQUQxQjtBQUFBLENBTkgsRUFRaEIsVUFBQUgsS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ0MsTUFBTixHQUFlRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUUsa0JBQTNCLEdBQWdESixLQUFLLENBQUNFLEtBQU4sQ0FBWUcsYUFBakU7QUFBQSxDQVJXLEVBV1QsVUFBQUwsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0UsS0FBTixDQUFZSSxzQkFBaEI7QUFBQSxDQVhJLEVBWVAsVUFBQU4sS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0UsS0FBTixDQUFZSyx3QkFBaEI7QUFBQSxDQVpFLEVBYWhCLFVBQUFQLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNFLEtBQU4sQ0FBWU0sYUFBaEI7QUFBQSxDQWJXLEVBaUJkLFVBQUFSLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNFLEtBQU4sQ0FBWU8sV0FBaEI7QUFBQSxDQWpCUyxDQUFwQjs7OztBQXFCQSxTQUFTQyxlQUFULEdBQTJCO0FBQ2hDLE1BQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXO0FBQUEsUUFBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsUUFBWUMsT0FBWixRQUFZQSxPQUFaO0FBQUEsUUFBcUJDLEtBQXJCLFFBQXFCQSxLQUFyQjtBQUFBLHdCQUNmLGdDQUFDLGNBQUQ7QUFBZ0Isc0JBQWhCO0FBQXlCLDRCQUFhQSxLQUFLLENBQUNDLEVBQW5CLFNBQXpCO0FBQXNELE1BQUEsTUFBTSxFQUFFSCxRQUE5RDtBQUF3RSxNQUFBLE9BQU8sRUFBRUM7QUFBakYsb0JBQ0UsZ0NBQUMsS0FBRCxDQUFPLGFBQVA7QUFBcUIsTUFBQSxNQUFNLEVBQUM7QUFBNUIsTUFERixlQUVFLGdDQUFDLDBCQUFEO0FBQVMsTUFBQSxFQUFFLFlBQUtDLEtBQUssQ0FBQ0MsRUFBWCxTQUFYO0FBQWdDLE1BQUEsTUFBTSxFQUFDLE9BQXZDO0FBQStDLE1BQUEsU0FBUyxFQUFFLEdBQTFEO0FBQStELE1BQUEsS0FBSyxFQUFDO0FBQXJFLG9CQUNFLDJEQUNFLGdDQUFDLDhCQUFEO0FBQWtCLE1BQUEsRUFBRSxFQUFFRCxLQUFLLENBQUNFLEtBQU4sSUFBZUYsS0FBSyxDQUFDQztBQUEzQyxNQURGLENBREYsQ0FGRixDQURlO0FBQUEsR0FBakI7O0FBV0EsU0FBT0osUUFBUDtBQUNEOztlQUVjRCxlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtUb29sdGlwfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2xvY2FsaXphdGlvbic7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRQYW5lbFRhYiA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsX190YWInXG59KWBcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xuICBib3JkZXItYm90dG9tLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUucGFuZWxUb2dnbGVCb3JkZXJDb2xvciA6ICd0cmFuc3BhcmVudCd9O1xuICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yQWN0aXZlIDogcHJvcHMudGhlbWUucGFuZWxUYWJDb2xvcil9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsVG9nZ2xlTWFyZ2luUmlnaHR9cHg7XG4gIHBhZGRpbmctYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsVG9nZ2xlQm90dG9tUGFkZGluZ31weDtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxUYWJXaWR0aH07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gUGFuZWxUYWJGYWN0b3J5KCkge1xuICBjb25zdCBQYW5lbFRhYiA9ICh7aXNBY3RpdmUsIG9uQ2xpY2ssIHBhbmVsfSkgPT4gKFxuICAgIDxTdHlsZWRQYW5lbFRhYiBkYXRhLXRpcCBkYXRhLWZvcj17YCR7cGFuZWwuaWR9LW5hdmB9IGFjdGl2ZT17aXNBY3RpdmV9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAgPHBhbmVsLmljb25Db21wb25lbnQgaGVpZ2h0PVwiMjBweFwiIC8+XG4gICAgICA8VG9vbHRpcCBpZD17YCR7cGFuZWwuaWR9LW5hdmB9IGVmZmVjdD1cInNvbGlkXCIgZGVsYXlTaG93PXs1MDB9IHBsYWNlPVwiYm90dG9tXCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtwYW5lbC5sYWJlbCB8fCBwYW5lbC5pZH0gLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9Ub29sdGlwPlxuICAgIDwvU3R5bGVkUGFuZWxUYWI+XG4gICk7XG5cbiAgcmV0dXJuIFBhbmVsVGFiO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQYW5lbFRhYkZhY3Rvcnk7XG4iXX0=