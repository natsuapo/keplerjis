"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TableSection = exports.Container = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactVirtualized = require("react-virtualized");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.debounce"));

var _optionDropdown = _interopRequireDefault(require("./option-dropdown"));

var _grid = _interopRequireDefault(require("./grid"));

var _button = _interopRequireDefault(require("./button"));

var _icons = require("../icons");

var _dataUtils = require("../../../utils/data-utils");

var _cellSize = require("./cell-size");

var _defaultSettings = require("../../../constants/default-settings");

var _fieldToken = _interopRequireDefault(require("../field-token"));

var _fieldToAlignRight, _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultHeaderRowHeight = 55;
var defaultRowHeight = 32;
var overscanColumnCount = 10;
var overscanRowCount = 10;
var fieldToAlignRight = (_fieldToAlignRight = {}, (0, _defineProperty2["default"])(_fieldToAlignRight, _defaultSettings.ALL_FIELD_TYPES.integer, true), (0, _defineProperty2["default"])(_fieldToAlignRight, _defaultSettings.ALL_FIELD_TYPES.real, true), _fieldToAlignRight);

var Container = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  font-size: 11px;\n  flex-grow: 1;\n  color: ", ";\n  width: 100%;\n\n  .ReactVirtualized__Grid:focus,\n  .ReactVirtualized__Grid:active {\n    outline: 0;\n  }\n\n  .cell {\n    &::-webkit-scrollbar {\n      display: none;\n    }\n  }\n\n  *:focus {\n    outline: 0;\n  }\n\n  .results-table-wrapper {\n    position: relative;\n    min-height: 100%;\n    max-height: 100%;\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1;\n    overflow: hidden;\n    border-top: none;\n\n    .scroll-in-ui-thread::after {\n      content: '';\n      height: 100%;\n      left: 0;\n      position: absolute;\n      pointer-events: none;\n      top: 0;\n      width: 100%;\n    }\n\n    .grid-row {\n      position: relative;\n      display: flex;\n      flex-direction: row;\n    }\n    .grid-column {\n      display: flex;\n      flex-direction: column;\n      flex: 1 1 auto;\n    }\n    .pinned-grid-container {\n      flex: 0 0 75px;\n      z-index: 10;\n      position: absolute;\n      left: 0;\n      top: 0;\n      border-right: 2px solid ", ";\n    }\n\n    .header-grid {\n      overflow: hidden !important;\n    }\n\n    .body-grid {\n      overflow: overlay !important;\n    }\n\n    .pinned-grid {\n      overflow: overlay !important;\n    }\n\n    .even-row {\n      background-color: ", ";\n    }\n    .odd-row {\n      background-color: ", ";\n    }\n    .cell,\n    .header-cell {\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: flex-start;\n      text-align: center;\n      overflow: hidden;\n\n      .n-sort-idx {\n        font-size: 9px;\n      }\n    }\n    .cell {\n      border-bottom: 1px solid ", ";\n      border-right: 1px solid ", ";\n      white-space: nowrap;\n      overflow: auto;\n      padding: 0 ", "px;\n      font-size: ", "px;\n\n      .result-link {\n        text-decoration: none;\n      }\n    }\n    .cell.end-cell,\n    .header-cell.end-cell {\n      border-right: none;\n      padding-right: ", "px;\n    }\n    .cell.first-cell,\n    .header-cell.first-cell {\n      padding-left: ", "px;\n    }\n    .cell.bottom-cell {\n      border-bottom: none;\n    }\n    .cell.align-right {\n      align-items: flex-end;\n    }\n    .header-cell {\n      border-bottom: 1px solid ", ";\n      border-top: 1px solid ", ";\n      padding-top: ", "px;\n      padding-right: 0;\n      padding-bottom: ", "px;\n      padding-left: ", "px;\n      align-items: center;\n      justify-content: space-between;\n      display: flex;\n      flex-direction: row;\n      background-color: ", ";\n\n      &:hover {\n        .more {\n          color: ", ";\n        }\n      }\n      .n-sort-idx {\n        font-size: 9px;\n      }\n      .details {\n        font-weight: 500;\n        display: flex;\n        flex-direction: column;\n        justify-content: flex-start;\n        height: 100%;\n        overflow: hidden;\n        flex-grow: 1;\n\n        .col-name {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          cursor: pointer;\n\n          .col-name__left {\n            display: flex;\n            align-items: center;\n            overflow: hidden;\n            svg {\n              margin-left: 6px;\n            }\n          }\n          .col-name__name {\n            overflow: hidden;\n            white-space: nowrap;\n          }\n        }\n      }\n\n      .more {\n        color: transparent;\n        margin-left: 5px;\n      }\n    }\n  }\n\n  :focus {\n    outline: none;\n  }\n"])), function (props) {
  return props.theme.dataTableTextColor;
}, function (props) {
  return props.theme.pinnedGridBorderColor;
}, function (props) {
  return props.theme.evenRowBackground;
}, function (props) {
  return props.theme.oddRowBackground;
}, function (props) {
  return props.theme.cellBorderColor;
}, function (props) {
  return props.theme.cellBorderColor;
}, function (props) {
  return props.theme.cellPaddingSide;
}, function (props) {
  return props.theme.cellFontSize;
}, function (props) {
  return props.theme.cellPaddingSide + props.theme.edgeCellPaddingSide;
}, function (props) {
  return props.theme.cellPaddingSide + props.theme.edgeCellPaddingSide;
}, function (props) {
  return props.theme.headerCellBorderColor;
}, function (props) {
  return props.theme.headerCellBorderColor;
}, function (props) {
  return props.theme.headerPaddingTop;
}, function (props) {
  return props.theme.headerPaddingBottom;
}, function (props) {
  return props.theme.cellPaddingSide;
}, function (props) {
  return props.theme.headerCellBackground;
}, function (props) {
  return props.theme.headerCellIconColor;
});

exports.Container = Container;
var defaultColumnWidth = 200;

var columnWidthFunction = function columnWidthFunction(columns, cellSizeCache, ghost) {
  return function (_ref) {
    var index = _ref.index;
    return (columns[index] || {}).ghost ? ghost : cellSizeCache[columns[index]] || defaultColumnWidth;
  };
};
/*
 * This is an accessor method used to generalize getting a cell from a data row
 */


var getRowCell = function getRowCell(_ref2) {
  var dataContainer = _ref2.dataContainer,
      columns = _ref2.columns,
      column = _ref2.column,
      colMeta = _ref2.colMeta,
      rowIndex = _ref2.rowIndex,
      sortOrder = _ref2.sortOrder;
  var rowIdx = sortOrder && sortOrder.length ? (0, _lodash["default"])(sortOrder, rowIndex) : rowIndex;
  var type = colMeta[column].type;
  var value = dataContainer.valueAt(rowIdx, columns.indexOf(column));
  if (value === undefined) value = 'Err';
  return (0, _dataUtils.parseFieldValue)(value, type);
};

var TableSection = function TableSection(_ref3) {
  var classList = _ref3.classList,
      isPinned = _ref3.isPinned,
      columns = _ref3.columns,
      headerGridProps = _ref3.headerGridProps,
      fixedWidth = _ref3.fixedWidth,
      _ref3$fixedHeight = _ref3.fixedHeight,
      fixedHeight = _ref3$fixedHeight === void 0 ? undefined : _ref3$fixedHeight,
      onScroll = _ref3.onScroll,
      scrollTop = _ref3.scrollTop,
      dataGridProps = _ref3.dataGridProps,
      columnWidth = _ref3.columnWidth,
      setGridRef = _ref3.setGridRef,
      headerCellRender = _ref3.headerCellRender,
      dataCellRender = _ref3.dataCellRender,
      _ref3$scrollLeft = _ref3.scrollLeft,
      scrollLeft = _ref3$scrollLeft === void 0 ? undefined : _ref3$scrollLeft;
  return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.AutoSizer, null, function (_ref4) {
    var width = _ref4.width,
        height = _ref4.height;
    var gridDimension = {
      columnCount: columns.length,
      columnWidth: columnWidth,
      width: fixedWidth || width
    };
    var dataGridHeight = fixedHeight || height;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames3["default"])('scroll-in-ui-thread', classList.header)
    }, /*#__PURE__*/_react["default"].createElement(_grid["default"], (0, _extends2["default"])({
      cellRenderer: headerCellRender
    }, headerGridProps, gridDimension, {
      scrollLeft: scrollLeft
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames3["default"])('scroll-in-ui-thread', classList.rows),
      style: {
        top: headerGridProps.height
      }
    }, /*#__PURE__*/_react["default"].createElement(_grid["default"], (0, _extends2["default"])({
      cellRenderer: dataCellRender
    }, dataGridProps, gridDimension, {
      className: isPinned ? 'pinned-grid' : 'body-grid',
      height: dataGridHeight - headerGridProps.height,
      onScroll: onScroll,
      scrollTop: scrollTop,
      setGridRef: setGridRef
    }))));
  });
};

exports.TableSection = TableSection;
DataTableFactory.deps = [_fieldToken["default"]];

function DataTableFactory(FieldToken) {
  var DataTable = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(DataTable, _Component);

    var _super = _createSuper(DataTable);

    function DataTable() {
      var _this;

      (0, _classCallCheck2["default"])(this, DataTable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        cellSizeCache: {},
        moreOptionsColumn: null
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "root", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "columns", function (props) {
        return props.columns;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pinnedColumns", function (props) {
        return props.pinnedColumns;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "unpinnedColumns", (0, _reselect.createSelector)(_this.columns, _this.pinnedColumns, function (columns, pinnedColumns) {
        return !Array.isArray(pinnedColumns) ? columns : columns.filter(function (c) {
          return !pinnedColumns.includes(c);
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleMoreOptions", function (moreOptionsColumn) {
        return _this.setState({
          moreOptionsColumn: _this.state.moreOptionsColumn === moreOptionsColumn ? null : moreOptionsColumn
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getCellSizeCache", function () {
        var _this$props = _this.props,
            propsCache = _this$props.cellSizeCache,
            fixedWidth = _this$props.fixedWidth,
            pinnedColumns = _this$props.pinnedColumns;

        var unpinnedColumns = _this.unpinnedColumns(_this.props);

        var width = fixedWidth ? fixedWidth : _this.root.current ? _this.root.current.clientWidth : 0; // pin column border is 2 pixel vs 1 pixel

        var adjustWidth = pinnedColumns.length ? width - 1 : width;

        var _adjustCellsToContain = (0, _cellSize.adjustCellsToContainer)(adjustWidth, propsCache, pinnedColumns, unpinnedColumns),
            cellSizeCache = _adjustCellsToContain.cellSizeCache,
            ghost = _adjustCellsToContain.ghost;

        return {
          cellSizeCache: cellSizeCache,
          ghost: ghost
        };
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "doScaleCellsToWidth", function () {
        _this.setState(_this.getCellSizeCache());
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "scaleCellsToWidth", (0, _lodash2["default"])(_this.doScaleCellsToWidth, 300));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderHeaderCell", function (columns, isPinned, props, toggleMoreOptions, moreOptionsColumn, TokenComponent) {
        // eslint-disable-next-line react/display-name
        return function (cellInfo) {
          var _classnames;

          var columnIndex = cellInfo.columnIndex,
              key = cellInfo.key,
              style = cellInfo.style;
          var colMeta = props.colMeta,
              sortColumn = props.sortColumn,
              _sortTableColumn = props.sortTableColumn,
              _pinTableColumn = props.pinTableColumn,
              _copyTableColumn = props.copyTableColumn,
              _deleteTableColumn = props.deleteTableColumn;
          var column = columns[columnIndex];
          var isGhost = column.ghost;
          var isSorted = sortColumn[column];
          var firstCell = columnIndex === 0;
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames3["default"])('header-cell', (_classnames = {}, (0, _defineProperty2["default"])(_classnames, "column-".concat(columnIndex), true), (0, _defineProperty2["default"])(_classnames, 'pinned-header-cell', isPinned), (0, _defineProperty2["default"])(_classnames, 'first-cell', firstCell), _classnames)),
            key: key,
            style: style,
            onClick: function onClick(e) {
              e.shiftKey ? _sortTableColumn(column) : null;
            },
            onDoubleClick: function onDoubleClick() {
              return _sortTableColumn(column);
            },
            title: column
          }, isGhost ? /*#__PURE__*/_react["default"].createElement("div", null) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("section", {
            className: "details"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "col-name"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "col-name__left"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "col-name__name"
          }, colMeta[column].name), /*#__PURE__*/_react["default"].createElement(_button["default"], {
            className: "col-name__sort",
            onClick: function onClick() {
              return _sortTableColumn(column);
            }
          }, isSorted ? isSorted === _defaultSettings.SORT_ORDER.ASCENDING ? /*#__PURE__*/_react["default"].createElement(_icons.ArrowUp, {
            height: "14px"
          }) : /*#__PURE__*/_react["default"].createElement(_icons.ArrowDown, {
            height: "14px"
          }) : null)), /*#__PURE__*/_react["default"].createElement(_button["default"], {
            className: "more",
            onClick: function onClick() {
              return toggleMoreOptions(column);
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.VertThreeDots, {
            height: "14px"
          }))), /*#__PURE__*/_react["default"].createElement(FieldToken, {
            type: colMeta[column].type
          })), /*#__PURE__*/_react["default"].createElement("section", {
            className: "options"
          }, /*#__PURE__*/_react["default"].createElement(_optionDropdown["default"], {
            isOpened: moreOptionsColumn === column,
            type: colMeta[column].type,
            column: column,
            toggleMoreOptions: toggleMoreOptions,
            sortTableColumn: function sortTableColumn(mode) {
              return _sortTableColumn(column, mode);
            },
            sortMode: sortColumn && sortColumn[column],
            pinTableColumn: function pinTableColumn() {
              return _pinTableColumn(column);
            },
            copyTableColumn: function copyTableColumn() {
              return _copyTableColumn(column);
            },
            deleteTableColumn: function deleteTableColumn() {
              return _deleteTableColumn(column);
            },
            isSorted: isSorted,
            isPinned: isPinned
          }))));
        };
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderDataCell", function (columns, isPinned, props) {
        return function (cellInfo) {
          var _classnames2;

          var columnIndex = cellInfo.columnIndex,
              key = cellInfo.key,
              style = cellInfo.style,
              rowIndex = cellInfo.rowIndex;
          var dataContainer = props.dataContainer,
              colMeta = props.colMeta;
          var column = columns[columnIndex];
          var isGhost = column.ghost;
          var rowCell = isGhost ? '' : getRowCell(_objectSpread(_objectSpread({}, props), {}, {
            column: column,
            rowIndex: rowIndex
          }));
          var type = isGhost ? null : colMeta[column].type;
          var lastRowIndex = dataContainer ? dataContainer.numRows() - 1 : 0;
          var endCell = columnIndex === columns.length - 1;
          var firstCell = columnIndex === 0;
          var bottomCell = rowIndex === lastRowIndex;
          var alignRight = fieldToAlignRight[type];

          var cell = /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames3["default"])('cell', (_classnames2 = {}, (0, _defineProperty2["default"])(_classnames2, rowIndex % 2 === 0 ? 'even-row' : 'odd-row', true), (0, _defineProperty2["default"])(_classnames2, "row-".concat(rowIndex), true), (0, _defineProperty2["default"])(_classnames2, 'pinned-cell', isPinned), (0, _defineProperty2["default"])(_classnames2, 'first-cell', firstCell), (0, _defineProperty2["default"])(_classnames2, 'end-cell', endCell), (0, _defineProperty2["default"])(_classnames2, 'bottom-cell', bottomCell), (0, _defineProperty2["default"])(_classnames2, 'align-right', alignRight), _classnames2)),
            key: key,
            style: style,
            title: isGhost ? undefined : rowCell
          }, "".concat(rowCell).concat(endCell ? '\n' : '\t'));

          return cell;
        };
      });
      return _this;
    }

    (0, _createClass2["default"])(DataTable, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        window.addEventListener('resize', this.scaleCellsToWidth);
        this.scaleCellsToWidth();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.cellSizeCache !== prevProps.cellSizeCache || this.props.pinnedColumns !== prevProps.pinnedColumns) {
          this.scaleCellsToWidth();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.scaleCellsToWidth); // fix Warning: Can't perform a React state update on an unmounted component

        this.setState = function () {
          return;
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
            dataContainer = _this$props2.dataContainer,
            pinnedColumns = _this$props2.pinnedColumns,
            _this$props2$theme = _this$props2.theme,
            theme = _this$props2$theme === void 0 ? {} : _this$props2$theme,
            fixedWidth = _this$props2.fixedWidth,
            fixedHeight = _this$props2.fixedHeight;
        var unpinnedColumns = this.unpinnedColumns(this.props);
        var _this$state = this.state,
            cellSizeCache = _this$state.cellSizeCache,
            moreOptionsColumn = _this$state.moreOptionsColumn,
            ghost = _this$state.ghost;
        var unpinnedColumnsGhost = ghost ? [].concat((0, _toConsumableArray2["default"])(unpinnedColumns), [{
          ghost: true
        }]) : unpinnedColumns;
        var pinnedColumnsWidth = pinnedColumns.reduce(function (acc, val) {
          return acc + (0, _lodash["default"])(cellSizeCache, val, 0);
        }, 0);
        var hasPinnedColumns = Boolean(pinnedColumns.length);
        var _theme$headerRowHeigh = theme.headerRowHeight,
            headerRowHeight = _theme$headerRowHeigh === void 0 ? defaultHeaderRowHeight : _theme$headerRowHeigh,
            _theme$rowHeight = theme.rowHeight,
            rowHeight = _theme$rowHeight === void 0 ? defaultRowHeight : _theme$rowHeight;
        var headerGridProps = {
          cellSizeCache: cellSizeCache,
          className: 'header-grid',
          height: headerRowHeight,
          rowCount: 1,
          rowHeight: headerRowHeight
        };
        var dataGridProps = {
          cellSizeCache: cellSizeCache,
          overscanColumnCount: overscanColumnCount,
          overscanRowCount: overscanRowCount,
          rowCount: dataContainer ? dataContainer.numRows() : 0,
          rowHeight: rowHeight
        };
        return /*#__PURE__*/_react["default"].createElement(Container, {
          className: "data-table-container",
          ref: this.root
        }, Object.keys(cellSizeCache).length && /*#__PURE__*/_react["default"].createElement(_reactVirtualized.ScrollSync, null, function (_ref5) {
          var _onScroll = _ref5.onScroll,
              scrollLeft = _ref5.scrollLeft,
              scrollTop = _ref5.scrollTop;
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "results-table-wrapper"
          }, hasPinnedColumns && /*#__PURE__*/_react["default"].createElement("div", {
            key: "pinned-columns",
            className: "pinned-columns grid-row"
          }, /*#__PURE__*/_react["default"].createElement(TableSection, {
            classList: {
              header: 'pinned-columns--header pinned-grid-container',
              rows: 'pinned-columns--rows pinned-grid-container'
            },
            isPinned: true,
            columns: pinnedColumns,
            headerGridProps: headerGridProps,
            fixedWidth: pinnedColumnsWidth,
            onScroll: function onScroll(args) {
              return _onScroll(_objectSpread(_objectSpread({}, args), {}, {
                scrollLeft: scrollLeft
              }));
            },
            scrollTop: scrollTop,
            dataGridProps: dataGridProps,
            setGridRef: function setGridRef(pinnedGrid) {
              return _this2.pinnedGrid = pinnedGrid;
            },
            columnWidth: columnWidthFunction(pinnedColumns, cellSizeCache),
            headerCellRender: _this2.renderHeaderCell(pinnedColumns, true, _this2.props, _this2.toggleMoreOptions, moreOptionsColumn),
            dataCellRender: _this2.renderDataCell(pinnedColumns, true, _this2.props)
          })), /*#__PURE__*/_react["default"].createElement("div", {
            key: "unpinned-columns",
            style: {
              marginLeft: "".concat(hasPinnedColumns ? "".concat(pinnedColumnsWidth, "px") : '0')
            },
            className: "unpinned-columns grid-column"
          }, /*#__PURE__*/_react["default"].createElement(TableSection, {
            classList: {
              header: 'unpinned-columns--header unpinned-grid-container',
              rows: 'unpinned-columns--rows unpinned-grid-container'
            },
            isPinned: false,
            columns: unpinnedColumnsGhost,
            headerGridProps: headerGridProps,
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,
            onScroll: _onScroll,
            scrollTop: scrollTop,
            scrollLeft: scrollLeft,
            dataGridProps: dataGridProps,
            setGridRef: function setGridRef(unpinnedGrid) {
              return _this2.unpinnedGrid = unpinnedGrid;
            },
            columnWidth: columnWidthFunction(unpinnedColumnsGhost, cellSizeCache, ghost),
            headerCellRender: _this2.renderHeaderCell(unpinnedColumnsGhost, false, _this2.props, _this2.toggleMoreOptions, moreOptionsColumn),
            dataCellRender: _this2.renderDataCell(unpinnedColumnsGhost, false, _this2.props)
          })));
        }));
      }
    }]);
    return DataTable;
  }(_react.Component);

  (0, _defineProperty2["default"])(DataTable, "defaultProps", {
    dataContainer: null,
    pinnedColumns: [],
    colMeta: {},
    cellSizeCache: {},
    sortColumn: {},
    fixedWidth: null,
    fixedHeight: null,
    theme: {}
  });
  return (0, _styledComponents.withTheme)(DataTable);
}

var _default = DataTableFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9kYXRhLXRhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRIZWFkZXJSb3dIZWlnaHQiLCJkZWZhdWx0Um93SGVpZ2h0Iiwib3ZlcnNjYW5Db2x1bW5Db3VudCIsIm92ZXJzY2FuUm93Q291bnQiLCJmaWVsZFRvQWxpZ25SaWdodCIsIkFMTF9GSUVMRF9UWVBFUyIsImludGVnZXIiLCJyZWFsIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsImRhdGFUYWJsZVRleHRDb2xvciIsInBpbm5lZEdyaWRCb3JkZXJDb2xvciIsImV2ZW5Sb3dCYWNrZ3JvdW5kIiwib2RkUm93QmFja2dyb3VuZCIsImNlbGxCb3JkZXJDb2xvciIsImNlbGxQYWRkaW5nU2lkZSIsImNlbGxGb250U2l6ZSIsImVkZ2VDZWxsUGFkZGluZ1NpZGUiLCJoZWFkZXJDZWxsQm9yZGVyQ29sb3IiLCJoZWFkZXJQYWRkaW5nVG9wIiwiaGVhZGVyUGFkZGluZ0JvdHRvbSIsImhlYWRlckNlbGxCYWNrZ3JvdW5kIiwiaGVhZGVyQ2VsbEljb25Db2xvciIsImRlZmF1bHRDb2x1bW5XaWR0aCIsImNvbHVtbldpZHRoRnVuY3Rpb24iLCJjb2x1bW5zIiwiY2VsbFNpemVDYWNoZSIsImdob3N0IiwiaW5kZXgiLCJnZXRSb3dDZWxsIiwiZGF0YUNvbnRhaW5lciIsImNvbHVtbiIsImNvbE1ldGEiLCJyb3dJbmRleCIsInNvcnRPcmRlciIsInJvd0lkeCIsImxlbmd0aCIsInR5cGUiLCJ2YWx1ZSIsInZhbHVlQXQiLCJpbmRleE9mIiwidW5kZWZpbmVkIiwiVGFibGVTZWN0aW9uIiwiY2xhc3NMaXN0IiwiaXNQaW5uZWQiLCJoZWFkZXJHcmlkUHJvcHMiLCJmaXhlZFdpZHRoIiwiZml4ZWRIZWlnaHQiLCJvblNjcm9sbCIsInNjcm9sbFRvcCIsImRhdGFHcmlkUHJvcHMiLCJjb2x1bW5XaWR0aCIsInNldEdyaWRSZWYiLCJoZWFkZXJDZWxsUmVuZGVyIiwiZGF0YUNlbGxSZW5kZXIiLCJzY3JvbGxMZWZ0Iiwid2lkdGgiLCJoZWlnaHQiLCJncmlkRGltZW5zaW9uIiwiY29sdW1uQ291bnQiLCJkYXRhR3JpZEhlaWdodCIsImhlYWRlciIsInJvd3MiLCJ0b3AiLCJEYXRhVGFibGVGYWN0b3J5IiwiZGVwcyIsIkZpZWxkVG9rZW5GYWN0b3J5IiwiRmllbGRUb2tlbiIsIkRhdGFUYWJsZSIsIm1vcmVPcHRpb25zQ29sdW1uIiwicGlubmVkQ29sdW1ucyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsImMiLCJpbmNsdWRlcyIsInNldFN0YXRlIiwic3RhdGUiLCJwcm9wc0NhY2hlIiwidW5waW5uZWRDb2x1bW5zIiwicm9vdCIsImN1cnJlbnQiLCJjbGllbnRXaWR0aCIsImFkanVzdFdpZHRoIiwiZ2V0Q2VsbFNpemVDYWNoZSIsImRvU2NhbGVDZWxsc1RvV2lkdGgiLCJ0b2dnbGVNb3JlT3B0aW9ucyIsIlRva2VuQ29tcG9uZW50IiwiY2VsbEluZm8iLCJjb2x1bW5JbmRleCIsImtleSIsInN0eWxlIiwic29ydENvbHVtbiIsInNvcnRUYWJsZUNvbHVtbiIsInBpblRhYmxlQ29sdW1uIiwiY29weVRhYmxlQ29sdW1uIiwiZGVsZXRlVGFibGVDb2x1bW4iLCJpc0dob3N0IiwiaXNTb3J0ZWQiLCJmaXJzdENlbGwiLCJlIiwic2hpZnRLZXkiLCJuYW1lIiwiU09SVF9PUkRFUiIsIkFTQ0VORElORyIsIm1vZGUiLCJyb3dDZWxsIiwibGFzdFJvd0luZGV4IiwibnVtUm93cyIsImVuZENlbGwiLCJib3R0b21DZWxsIiwiYWxpZ25SaWdodCIsImNlbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2NhbGVDZWxsc1RvV2lkdGgiLCJwcmV2UHJvcHMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidW5waW5uZWRDb2x1bW5zR2hvc3QiLCJwaW5uZWRDb2x1bW5zV2lkdGgiLCJyZWR1Y2UiLCJhY2MiLCJ2YWwiLCJoYXNQaW5uZWRDb2x1bW5zIiwiQm9vbGVhbiIsImhlYWRlclJvd0hlaWdodCIsInJvd0hlaWdodCIsImNsYXNzTmFtZSIsInJvd0NvdW50IiwiT2JqZWN0Iiwia2V5cyIsImFyZ3MiLCJwaW5uZWRHcmlkIiwicmVuZGVySGVhZGVyQ2VsbCIsInJlbmRlckRhdGFDZWxsIiwibWFyZ2luTGVmdCIsInVucGlubmVkR3JpZCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsc0JBQXNCLEdBQUcsRUFBL0I7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxFQUF6QjtBQUNBLElBQU1DLG1CQUFtQixHQUFHLEVBQTVCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsRUFBekI7QUFDQSxJQUFNQyxpQkFBaUIsa0ZBQ3BCQyxpQ0FBZ0JDLE9BREksRUFDTSxJQUROLHdEQUVwQkQsaUNBQWdCRSxJQUZJLEVBRUcsSUFGSCxzQkFBdkI7O0FBS08sSUFBTUMsU0FBUyxHQUFHQyw2QkFBT0MsR0FBVixzbUhBSVgsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxrQkFBaEI7QUFBQSxDQUpNLEVBMERVLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUscUJBQWhCO0FBQUEsQ0ExRGYsRUEwRUksVUFBQUgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRyxpQkFBaEI7QUFBQSxDQTFFVCxFQTZFSSxVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlJLGdCQUFoQjtBQUFBLENBN0VULEVBK0ZXLFVBQUFMLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FB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QUFBLEtBQUssRUFBRTtBQVJhLEdBRlk7QUE0VHBDLFNBQU8saUNBQVUyRCxTQUFWLENBQVA7QUFDRDs7ZUFFY0osZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIGNyZWF0ZVJlZn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtTY3JvbGxTeW5jLCBBdXRvU2l6ZXJ9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkJztcbmltcG9ydCBzdHlsZWQsIHt3aXRoVGhlbWV9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0JztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuXG5pbXBvcnQgT3B0aW9uRHJvcGRvd24gZnJvbSAnLi9vcHRpb24tZHJvcGRvd24nO1xuXG5pbXBvcnQgR3JpZCBmcm9tICcuL2dyaWQnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XG5pbXBvcnQge0Fycm93VXAsIEFycm93RG93bn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IHtWZXJ0VGhyZWVEb3RzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge3BhcnNlRmllbGRWYWx1ZX0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5pbXBvcnQge2FkanVzdENlbGxzVG9Db250YWluZXJ9IGZyb20gJy4vY2VsbC1zaXplJztcblxuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIFNPUlRfT1JERVJ9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCBGaWVsZFRva2VuRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9maWVsZC10b2tlbic7XG5cbmNvbnN0IGRlZmF1bHRIZWFkZXJSb3dIZWlnaHQgPSA1NTtcbmNvbnN0IGRlZmF1bHRSb3dIZWlnaHQgPSAzMjtcbmNvbnN0IG92ZXJzY2FuQ29sdW1uQ291bnQgPSAxMDtcbmNvbnN0IG92ZXJzY2FuUm93Q291bnQgPSAxMDtcbmNvbnN0IGZpZWxkVG9BbGlnblJpZ2h0ID0ge1xuICBbQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdOiB0cnVlLFxuICBbQUxMX0ZJRUxEX1RZUEVTLnJlYWxdOiB0cnVlXG59O1xuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmbGV4LWdyb3c6IDE7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRhdGFUYWJsZVRleHRDb2xvcn07XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5SZWFjdFZpcnR1YWxpemVkX19HcmlkOmZvY3VzLFxuICAuUmVhY3RWaXJ0dWFsaXplZF9fR3JpZDphY3RpdmUge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cblxuICAuY2VsbCB7XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAqOmZvY3VzIHtcbiAgICBvdXRsaW5lOiAwO1xuICB9XG5cbiAgLnJlc3VsdHMtdGFibGUtd3JhcHBlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcblxuICAgIC5zY3JvbGwtaW4tdWktdGhyZWFkOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC5ncmlkLXJvdyB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICB9XG4gICAgLmdyaWQtY29sdW1uIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgfVxuICAgIC5waW5uZWQtZ3JpZC1jb250YWluZXIge1xuICAgICAgZmxleDogMCAwIDc1cHg7XG4gICAgICB6LWluZGV4OiAxMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB0b3A6IDA7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBpbm5lZEdyaWRCb3JkZXJDb2xvcn07XG4gICAgfVxuXG4gICAgLmhlYWRlci1ncmlkIHtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuYm9keS1ncmlkIHtcbiAgICAgIG92ZXJmbG93OiBvdmVybGF5ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLnBpbm5lZC1ncmlkIHtcbiAgICAgIG92ZXJmbG93OiBvdmVybGF5ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmV2ZW4tcm93IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXZlblJvd0JhY2tncm91bmR9O1xuICAgIH1cbiAgICAub2RkLXJvdyB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm9kZFJvd0JhY2tncm91bmR9O1xuICAgIH1cbiAgICAuY2VsbCxcbiAgICAuaGVhZGVyLWNlbGwge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgICAubi1zb3J0LWlkeCB7XG4gICAgICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgICAgfVxuICAgIH1cbiAgICAuY2VsbCB7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jZWxsQm9yZGVyQ29sb3J9O1xuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jZWxsQm9yZGVyQ29sb3J9O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgcGFkZGluZzogMCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNlbGxQYWRkaW5nU2lkZX1weDtcbiAgICAgIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jZWxsRm9udFNpemV9cHg7XG5cbiAgICAgIC5yZXN1bHQtbGluayB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmNlbGwuZW5kLWNlbGwsXG4gICAgLmhlYWRlci1jZWxsLmVuZC1jZWxsIHtcbiAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICAgIHBhZGRpbmctcmlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2VsbFBhZGRpbmdTaWRlICsgcHJvcHMudGhlbWUuZWRnZUNlbGxQYWRkaW5nU2lkZX1weDtcbiAgICB9XG4gICAgLmNlbGwuZmlyc3QtY2VsbCxcbiAgICAuaGVhZGVyLWNlbGwuZmlyc3QtY2VsbCB7XG4gICAgICBwYWRkaW5nLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2VsbFBhZGRpbmdTaWRlICsgcHJvcHMudGhlbWUuZWRnZUNlbGxQYWRkaW5nU2lkZX1weDtcbiAgICB9XG4gICAgLmNlbGwuYm90dG9tLWNlbGwge1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG4gICAgLmNlbGwuYWxpZ24tcmlnaHQge1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgIH1cbiAgICAuaGVhZGVyLWNlbGwge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGVhZGVyQ2VsbEJvcmRlckNvbG9yfTtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhlYWRlckNlbGxCb3JkZXJDb2xvcn07XG4gICAgICBwYWRkaW5nLXRvcDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oZWFkZXJQYWRkaW5nVG9wfXB4O1xuICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhlYWRlclBhZGRpbmdCb3R0b219cHg7XG4gICAgICBwYWRkaW5nLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2VsbFBhZGRpbmdTaWRlfXB4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oZWFkZXJDZWxsQmFja2dyb3VuZH07XG5cbiAgICAgICY6aG92ZXIge1xuICAgICAgICAubW9yZSB7XG4gICAgICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGVhZGVyQ2VsbEljb25Db2xvcn07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC5uLXNvcnQtaWR4IHtcbiAgICAgICAgZm9udC1zaXplOiA5cHg7XG4gICAgICB9XG4gICAgICAuZGV0YWlscyB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgLmNvbC1uYW1lIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICAgIC5jb2wtbmFtZV9fbGVmdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBzdmcge1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAuY29sLW5hbWVfX25hbWUge1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5tb3JlIHtcbiAgICAgICAgY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIDpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuYDtcblxuY29uc3QgZGVmYXVsdENvbHVtbldpZHRoID0gMjAwO1xuXG5jb25zdCBjb2x1bW5XaWR0aEZ1bmN0aW9uID0gKGNvbHVtbnMsIGNlbGxTaXplQ2FjaGUsIGdob3N0KSA9PiAoe2luZGV4fSkgPT4ge1xuICByZXR1cm4gKGNvbHVtbnNbaW5kZXhdIHx8IHt9KS5naG9zdCA/IGdob3N0IDogY2VsbFNpemVDYWNoZVtjb2x1bW5zW2luZGV4XV0gfHwgZGVmYXVsdENvbHVtbldpZHRoO1xufTtcblxuLypcbiAqIFRoaXMgaXMgYW4gYWNjZXNzb3IgbWV0aG9kIHVzZWQgdG8gZ2VuZXJhbGl6ZSBnZXR0aW5nIGEgY2VsbCBmcm9tIGEgZGF0YSByb3dcbiAqL1xuY29uc3QgZ2V0Um93Q2VsbCA9ICh7ZGF0YUNvbnRhaW5lciwgY29sdW1ucywgY29sdW1uLCBjb2xNZXRhLCByb3dJbmRleCwgc29ydE9yZGVyfSkgPT4ge1xuICBjb25zdCByb3dJZHggPSBzb3J0T3JkZXIgJiYgc29ydE9yZGVyLmxlbmd0aCA/IGdldChzb3J0T3JkZXIsIHJvd0luZGV4KSA6IHJvd0luZGV4O1xuICBjb25zdCB7dHlwZX0gPSBjb2xNZXRhW2NvbHVtbl07XG5cbiAgbGV0IHZhbHVlID0gZGF0YUNvbnRhaW5lci52YWx1ZUF0KHJvd0lkeCwgY29sdW1ucy5pbmRleE9mKGNvbHVtbikpO1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdmFsdWUgPSAnRXJyJztcbiAgcmV0dXJuIHBhcnNlRmllbGRWYWx1ZSh2YWx1ZSwgdHlwZSk7XG59O1xuXG5leHBvcnQgY29uc3QgVGFibGVTZWN0aW9uID0gKHtcbiAgY2xhc3NMaXN0LFxuICBpc1Bpbm5lZCxcbiAgY29sdW1ucyxcbiAgaGVhZGVyR3JpZFByb3BzLFxuICBmaXhlZFdpZHRoLFxuICBmaXhlZEhlaWdodCA9IHVuZGVmaW5lZCxcbiAgb25TY3JvbGwsXG4gIHNjcm9sbFRvcCxcbiAgZGF0YUdyaWRQcm9wcyxcbiAgY29sdW1uV2lkdGgsXG4gIHNldEdyaWRSZWYsXG4gIGhlYWRlckNlbGxSZW5kZXIsXG4gIGRhdGFDZWxsUmVuZGVyLFxuICBzY3JvbGxMZWZ0ID0gdW5kZWZpbmVkXG59KSA9PiAoXG4gIDxBdXRvU2l6ZXI+XG4gICAgeyh7d2lkdGgsIGhlaWdodH0pID0+IHtcbiAgICAgIGNvbnN0IGdyaWREaW1lbnNpb24gPSB7XG4gICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5zLmxlbmd0aCxcbiAgICAgICAgY29sdW1uV2lkdGgsXG4gICAgICAgIHdpZHRoOiBmaXhlZFdpZHRoIHx8IHdpZHRoXG4gICAgICB9O1xuICAgICAgY29uc3QgZGF0YUdyaWRIZWlnaHQgPSBmaXhlZEhlaWdodCB8fCBoZWlnaHQ7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdzY3JvbGwtaW4tdWktdGhyZWFkJywgY2xhc3NMaXN0LmhlYWRlcil9PlxuICAgICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtoZWFkZXJDZWxsUmVuZGVyfVxuICAgICAgICAgICAgICB7Li4uaGVhZGVyR3JpZFByb3BzfVxuICAgICAgICAgICAgICB7Li4uZ3JpZERpbWVuc2lvbn1cbiAgICAgICAgICAgICAgc2Nyb2xsTGVmdD17c2Nyb2xsTGVmdH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdzY3JvbGwtaW4tdWktdGhyZWFkJywgY2xhc3NMaXN0LnJvd3MpfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgdG9wOiBoZWFkZXJHcmlkUHJvcHMuaGVpZ2h0XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICAgIGNlbGxSZW5kZXJlcj17ZGF0YUNlbGxSZW5kZXJ9XG4gICAgICAgICAgICAgIHsuLi5kYXRhR3JpZFByb3BzfVxuICAgICAgICAgICAgICB7Li4uZ3JpZERpbWVuc2lvbn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpc1Bpbm5lZCA/ICdwaW5uZWQtZ3JpZCcgOiAnYm9keS1ncmlkJ31cbiAgICAgICAgICAgICAgaGVpZ2h0PXtkYXRhR3JpZEhlaWdodCAtIGhlYWRlckdyaWRQcm9wcy5oZWlnaHR9XG4gICAgICAgICAgICAgIG9uU2Nyb2xsPXtvblNjcm9sbH1cbiAgICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICAgICAgICAgIHNldEdyaWRSZWY9e3NldEdyaWRSZWZ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgfX1cbiAgPC9BdXRvU2l6ZXI+XG4pO1xuXG5EYXRhVGFibGVGYWN0b3J5LmRlcHMgPSBbRmllbGRUb2tlbkZhY3RvcnldO1xuZnVuY3Rpb24gRGF0YVRhYmxlRmFjdG9yeShGaWVsZFRva2VuKSB7XG4gIGNsYXNzIERhdGFUYWJsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGRhdGFDb250YWluZXI6IG51bGwsXG4gICAgICBwaW5uZWRDb2x1bW5zOiBbXSxcbiAgICAgIGNvbE1ldGE6IHt9LFxuICAgICAgY2VsbFNpemVDYWNoZToge30sXG4gICAgICBzb3J0Q29sdW1uOiB7fSxcbiAgICAgIGZpeGVkV2lkdGg6IG51bGwsXG4gICAgICBmaXhlZEhlaWdodDogbnVsbCxcbiAgICAgIHRoZW1lOiB7fVxuICAgIH07XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgIGNlbGxTaXplQ2FjaGU6IHt9LFxuICAgICAgbW9yZU9wdGlvbnNDb2x1bW46IG51bGxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zY2FsZUNlbGxzVG9XaWR0aCk7XG4gICAgICB0aGlzLnNjYWxlQ2VsbHNUb1dpZHRoKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNlbGxTaXplQ2FjaGUgIT09IHByZXZQcm9wcy5jZWxsU2l6ZUNhY2hlIHx8XG4gICAgICAgIHRoaXMucHJvcHMucGlubmVkQ29sdW1ucyAhPT0gcHJldlByb3BzLnBpbm5lZENvbHVtbnNcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNjYWxlQ2VsbHNUb1dpZHRoKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zY2FsZUNlbGxzVG9XaWR0aCk7XG4gICAgICAvLyBmaXggV2FybmluZzogQ2FuJ3QgcGVyZm9ybSBhIFJlYWN0IHN0YXRlIHVwZGF0ZSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50XG4gICAgICB0aGlzLnNldFN0YXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJvb3QgPSBjcmVhdGVSZWYoKTtcbiAgICBjb2x1bW5zID0gcHJvcHMgPT4gcHJvcHMuY29sdW1ucztcbiAgICBwaW5uZWRDb2x1bW5zID0gcHJvcHMgPT4gcHJvcHMucGlubmVkQ29sdW1ucztcbiAgICB1bnBpbm5lZENvbHVtbnMgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmNvbHVtbnMsIHRoaXMucGlubmVkQ29sdW1ucywgKGNvbHVtbnMsIHBpbm5lZENvbHVtbnMpID0+XG4gICAgICAhQXJyYXkuaXNBcnJheShwaW5uZWRDb2x1bW5zKSA/IGNvbHVtbnMgOiBjb2x1bW5zLmZpbHRlcihjID0+ICFwaW5uZWRDb2x1bW5zLmluY2x1ZGVzKGMpKVxuICAgICk7XG5cbiAgICB0b2dnbGVNb3JlT3B0aW9ucyA9IG1vcmVPcHRpb25zQ29sdW1uID0+XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbW9yZU9wdGlvbnNDb2x1bW46XG4gICAgICAgICAgdGhpcy5zdGF0ZS5tb3JlT3B0aW9uc0NvbHVtbiA9PT0gbW9yZU9wdGlvbnNDb2x1bW4gPyBudWxsIDogbW9yZU9wdGlvbnNDb2x1bW5cbiAgICAgIH0pO1xuXG4gICAgZ2V0Q2VsbFNpemVDYWNoZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtjZWxsU2l6ZUNhY2hlOiBwcm9wc0NhY2hlLCBmaXhlZFdpZHRoLCBwaW5uZWRDb2x1bW5zfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB1bnBpbm5lZENvbHVtbnMgPSB0aGlzLnVucGlubmVkQ29sdW1ucyh0aGlzLnByb3BzKTtcblxuICAgICAgY29uc3Qgd2lkdGggPSBmaXhlZFdpZHRoID8gZml4ZWRXaWR0aCA6IHRoaXMucm9vdC5jdXJyZW50ID8gdGhpcy5yb290LmN1cnJlbnQuY2xpZW50V2lkdGggOiAwO1xuXG4gICAgICAvLyBwaW4gY29sdW1uIGJvcmRlciBpcyAyIHBpeGVsIHZzIDEgcGl4ZWxcbiAgICAgIGNvbnN0IGFkanVzdFdpZHRoID0gcGlubmVkQ29sdW1ucy5sZW5ndGggPyB3aWR0aCAtIDEgOiB3aWR0aDtcbiAgICAgIGNvbnN0IHtjZWxsU2l6ZUNhY2hlLCBnaG9zdH0gPSBhZGp1c3RDZWxsc1RvQ29udGFpbmVyKFxuICAgICAgICBhZGp1c3RXaWR0aCxcbiAgICAgICAgcHJvcHNDYWNoZSxcbiAgICAgICAgcGlubmVkQ29sdW1ucyxcbiAgICAgICAgdW5waW5uZWRDb2x1bW5zXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjZWxsU2l6ZUNhY2hlLFxuICAgICAgICBnaG9zdFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZG9TY2FsZUNlbGxzVG9XaWR0aCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRDZWxsU2l6ZUNhY2hlKCkpO1xuICAgIH07XG5cbiAgICBzY2FsZUNlbGxzVG9XaWR0aCA9IGRlYm91bmNlKHRoaXMuZG9TY2FsZUNlbGxzVG9XaWR0aCwgMzAwKTtcblxuICAgIHJlbmRlckhlYWRlckNlbGwgPSAoXG4gICAgICBjb2x1bW5zLFxuICAgICAgaXNQaW5uZWQsXG4gICAgICBwcm9wcyxcbiAgICAgIHRvZ2dsZU1vcmVPcHRpb25zLFxuICAgICAgbW9yZU9wdGlvbnNDb2x1bW4sXG4gICAgICBUb2tlbkNvbXBvbmVudFxuICAgICkgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZVxuICAgICAgcmV0dXJuIGNlbGxJbmZvID0+IHtcbiAgICAgICAgY29uc3Qge2NvbHVtbkluZGV4LCBrZXksIHN0eWxlfSA9IGNlbGxJbmZvO1xuICAgICAgICBjb25zdCB7Y29sTWV0YSwgc29ydENvbHVtbiwgc29ydFRhYmxlQ29sdW1uLCBwaW5UYWJsZUNvbHVtbiwgY29weVRhYmxlQ29sdW1uLGRlbGV0ZVRhYmxlQ29sdW1ufSA9IHByb3BzO1xuXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNbY29sdW1uSW5kZXhdO1xuICAgICAgICBjb25zdCBpc0dob3N0ID0gY29sdW1uLmdob3N0O1xuICAgICAgICBjb25zdCBpc1NvcnRlZCA9IHNvcnRDb2x1bW5bY29sdW1uXTtcbiAgICAgICAgY29uc3QgZmlyc3RDZWxsID0gY29sdW1uSW5kZXggPT09IDA7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2hlYWRlci1jZWxsJywge1xuICAgICAgICAgICAgICBbYGNvbHVtbi0ke2NvbHVtbkluZGV4fWBdOiB0cnVlLFxuICAgICAgICAgICAgICAncGlubmVkLWhlYWRlci1jZWxsJzogaXNQaW5uZWQsXG4gICAgICAgICAgICAgICdmaXJzdC1jZWxsJzogZmlyc3RDZWxsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgICAgICAgIGUuc2hpZnRLZXkgPyBzb3J0VGFibGVDb2x1bW4oY29sdW1uKSA6IG51bGw7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Eb3VibGVDbGljaz17KCkgPT4gc29ydFRhYmxlQ29sdW1uKGNvbHVtbil9XG4gICAgICAgICAgICB0aXRsZT17Y29sdW1ufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0dob3N0ID8gKFxuICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbmFtZV9fbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW5hbWVfX25hbWVcIj57Y29sTWV0YVtjb2x1bW5dLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJjb2wtbmFtZV9fc29ydFwiIG9uQ2xpY2s9eygpID0+IHNvcnRUYWJsZUNvbHVtbihjb2x1bW4pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc1NvcnRlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTb3J0ZWQgPT09IFNPUlRfT1JERVIuQVNDRU5ESU5HID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1VwIGhlaWdodD1cIjE0cHhcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd0Rvd24gaGVpZ2h0PVwiMTRweFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJtb3JlXCIgb25DbGljaz17KCkgPT4gdG9nZ2xlTW9yZU9wdGlvbnMoY29sdW1uKX0+XG4gICAgICAgICAgICAgICAgICAgICAgPFZlcnRUaHJlZURvdHMgaGVpZ2h0PVwiMTRweFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxGaWVsZFRva2VuIHR5cGU9e2NvbE1ldGFbY29sdW1uXS50eXBlfSAvPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxPcHRpb25Ecm9wZG93blxuICAgICAgICAgICAgICAgICAgICBpc09wZW5lZD17bW9yZU9wdGlvbnNDb2x1bW4gPT09IGNvbHVtbn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT17Y29sTWV0YVtjb2x1bW5dLnR5cGV9XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbj17Y29sdW1ufVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVNb3JlT3B0aW9ucz17dG9nZ2xlTW9yZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHNvcnRUYWJsZUNvbHVtbj17bW9kZSA9PiBzb3J0VGFibGVDb2x1bW4oY29sdW1uLCBtb2RlKX1cbiAgICAgICAgICAgICAgICAgICAgc29ydE1vZGU9e3NvcnRDb2x1bW4gJiYgc29ydENvbHVtbltjb2x1bW5dfVxuICAgICAgICAgICAgICAgICAgICBwaW5UYWJsZUNvbHVtbj17KCkgPT4gcGluVGFibGVDb2x1bW4oY29sdW1uKX1cbiAgICAgICAgICAgICAgICAgICAgY29weVRhYmxlQ29sdW1uPXsoKSA9PiBjb3B5VGFibGVDb2x1bW4oY29sdW1uKX1cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlVGFibGVDb2x1bW49eygpID0+IGRlbGV0ZVRhYmxlQ29sdW1uKGNvbHVtbil9XG4gICAgICAgICAgICAgICAgICAgIGlzU29ydGVkPXtpc1NvcnRlZH1cbiAgICAgICAgICAgICAgICAgICAgaXNQaW5uZWQ9e2lzUGlubmVkfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlbmRlckRhdGFDZWxsID0gKGNvbHVtbnMsIGlzUGlubmVkLCBwcm9wcykgPT4ge1xuICAgICAgcmV0dXJuIGNlbGxJbmZvID0+IHtcbiAgICAgICAgY29uc3Qge2NvbHVtbkluZGV4LCBrZXksIHN0eWxlLCByb3dJbmRleH0gPSBjZWxsSW5mbztcbiAgICAgICAgY29uc3Qge2RhdGFDb250YWluZXIsIGNvbE1ldGF9ID0gcHJvcHM7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNbY29sdW1uSW5kZXhdO1xuICAgICAgICBjb25zdCBpc0dob3N0ID0gY29sdW1uLmdob3N0O1xuXG4gICAgICAgIGNvbnN0IHJvd0NlbGwgPSBpc0dob3N0ID8gJycgOiBnZXRSb3dDZWxsKHsuLi5wcm9wcywgY29sdW1uLCByb3dJbmRleH0pO1xuICAgICAgICBjb25zdCB0eXBlID0gaXNHaG9zdCA/IG51bGwgOiBjb2xNZXRhW2NvbHVtbl0udHlwZTtcblxuICAgICAgICBjb25zdCBsYXN0Um93SW5kZXggPSBkYXRhQ29udGFpbmVyID8gZGF0YUNvbnRhaW5lci5udW1Sb3dzKCkgLSAxIDogMDtcblxuICAgICAgICBjb25zdCBlbmRDZWxsID0gY29sdW1uSW5kZXggPT09IGNvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgZmlyc3RDZWxsID0gY29sdW1uSW5kZXggPT09IDA7XG4gICAgICAgIGNvbnN0IGJvdHRvbUNlbGwgPSByb3dJbmRleCA9PT0gbGFzdFJvd0luZGV4O1xuICAgICAgICBjb25zdCBhbGlnblJpZ2h0ID0gZmllbGRUb0FsaWduUmlnaHRbdHlwZV07XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2NlbGwnLCB7XG4gICAgICAgICAgICAgIFtyb3dJbmRleCAlIDIgPT09IDAgPyAnZXZlbi1yb3cnIDogJ29kZC1yb3cnXTogdHJ1ZSxcbiAgICAgICAgICAgICAgW2Byb3ctJHtyb3dJbmRleH1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ3Bpbm5lZC1jZWxsJzogaXNQaW5uZWQsXG4gICAgICAgICAgICAgICdmaXJzdC1jZWxsJzogZmlyc3RDZWxsLFxuICAgICAgICAgICAgICAnZW5kLWNlbGwnOiBlbmRDZWxsLFxuICAgICAgICAgICAgICAnYm90dG9tLWNlbGwnOiBib3R0b21DZWxsLFxuICAgICAgICAgICAgICAnYWxpZ24tcmlnaHQnOiBhbGlnblJpZ2h0XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgdGl0bGU9e2lzR2hvc3QgPyB1bmRlZmluZWQgOiByb3dDZWxsfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtgJHtyb3dDZWxsfSR7ZW5kQ2VsbCA/ICdcXG4nIDogJ1xcdCd9YH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtkYXRhQ29udGFpbmVyLCBwaW5uZWRDb2x1bW5zLCB0aGVtZSA9IHt9LCBmaXhlZFdpZHRoLCBmaXhlZEhlaWdodH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgdW5waW5uZWRDb2x1bW5zID0gdGhpcy51bnBpbm5lZENvbHVtbnModGhpcy5wcm9wcyk7XG5cbiAgICAgIGNvbnN0IHtjZWxsU2l6ZUNhY2hlLCBtb3JlT3B0aW9uc0NvbHVtbiwgZ2hvc3R9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IHVucGlubmVkQ29sdW1uc0dob3N0ID0gZ2hvc3QgPyBbLi4udW5waW5uZWRDb2x1bW5zLCB7Z2hvc3Q6IHRydWV9XSA6IHVucGlubmVkQ29sdW1ucztcbiAgICAgIGNvbnN0IHBpbm5lZENvbHVtbnNXaWR0aCA9IHBpbm5lZENvbHVtbnMucmVkdWNlKFxuICAgICAgICAoYWNjLCB2YWwpID0+IGFjYyArIGdldChjZWxsU2l6ZUNhY2hlLCB2YWwsIDApLFxuICAgICAgICAwXG4gICAgICApO1xuXG4gICAgICBjb25zdCBoYXNQaW5uZWRDb2x1bW5zID0gQm9vbGVhbihwaW5uZWRDb2x1bW5zLmxlbmd0aCk7XG4gICAgICBjb25zdCB7aGVhZGVyUm93SGVpZ2h0ID0gZGVmYXVsdEhlYWRlclJvd0hlaWdodCwgcm93SGVpZ2h0ID0gZGVmYXVsdFJvd0hlaWdodH0gPSB0aGVtZTtcblxuICAgICAgY29uc3QgaGVhZGVyR3JpZFByb3BzID0ge1xuICAgICAgICBjZWxsU2l6ZUNhY2hlLFxuICAgICAgICBjbGFzc05hbWU6ICdoZWFkZXItZ3JpZCcsXG4gICAgICAgIGhlaWdodDogaGVhZGVyUm93SGVpZ2h0LFxuICAgICAgICByb3dDb3VudDogMSxcbiAgICAgICAgcm93SGVpZ2h0OiBoZWFkZXJSb3dIZWlnaHRcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGRhdGFHcmlkUHJvcHMgPSB7XG4gICAgICAgIGNlbGxTaXplQ2FjaGUsXG4gICAgICAgIG92ZXJzY2FuQ29sdW1uQ291bnQsXG4gICAgICAgIG92ZXJzY2FuUm93Q291bnQsXG4gICAgICAgIHJvd0NvdW50OiBkYXRhQ29udGFpbmVyID8gZGF0YUNvbnRhaW5lci5udW1Sb3dzKCkgOiAwLFxuICAgICAgICByb3dIZWlnaHRcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPVwiZGF0YS10YWJsZS1jb250YWluZXJcIiByZWY9e3RoaXMucm9vdH0+XG4gICAgICAgICAge09iamVjdC5rZXlzKGNlbGxTaXplQ2FjaGUpLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICA8U2Nyb2xsU3luYz5cbiAgICAgICAgICAgICAgeyh7b25TY3JvbGwsIHNjcm9sbExlZnQsIHNjcm9sbFRvcH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzLXRhYmxlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge2hhc1Bpbm5lZENvbHVtbnMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PVwicGlubmVkLWNvbHVtbnNcIiBjbGFzc05hbWU9XCJwaW5uZWQtY29sdW1ucyBncmlkLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlU2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3Q9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdwaW5uZWQtY29sdW1ucy0taGVhZGVyIHBpbm5lZC1ncmlkLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogJ3Bpbm5lZC1jb2x1bW5zLS1yb3dzIHBpbm5lZC1ncmlkLWNvbnRhaW5lcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQaW5uZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17cGlubmVkQ29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyR3JpZFByb3BzPXtoZWFkZXJHcmlkUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg9e3Bpbm5lZENvbHVtbnNXaWR0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY3JvbGw9e2FyZ3MgPT4gb25TY3JvbGwoey4uLmFyZ3MsIHNjcm9sbExlZnR9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFHcmlkUHJvcHM9e2RhdGFHcmlkUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEdyaWRSZWY9e3Bpbm5lZEdyaWQgPT4gKHRoaXMucGlubmVkR3JpZCA9IHBpbm5lZEdyaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aD17Y29sdW1uV2lkdGhGdW5jdGlvbihwaW5uZWRDb2x1bW5zLCBjZWxsU2l6ZUNhY2hlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2VsbFJlbmRlcj17dGhpcy5yZW5kZXJIZWFkZXJDZWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbm5lZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTW9yZU9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9yZU9wdGlvbnNDb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUNlbGxSZW5kZXI9e3RoaXMucmVuZGVyRGF0YUNlbGwocGlubmVkQ29sdW1ucywgdHJ1ZSwgdGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAga2V5PVwidW5waW5uZWQtY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IGAke2hhc1Bpbm5lZENvbHVtbnMgPyBgJHtwaW5uZWRDb2x1bW5zV2lkdGh9cHhgIDogJzAnfWBcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInVucGlubmVkLWNvbHVtbnMgZ3JpZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlU2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NMaXN0PXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogJ3VucGlubmVkLWNvbHVtbnMtLWhlYWRlciB1bnBpbm5lZC1ncmlkLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6ICd1bnBpbm5lZC1jb2x1bW5zLS1yb3dzIHVucGlubmVkLWdyaWQtY29udGFpbmVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGlubmVkPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e3VucGlubmVkQ29sdW1uc0dob3N0fVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyR3JpZFByb3BzPXtoZWFkZXJHcmlkUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoPXtmaXhlZFdpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRIZWlnaHQ9e2ZpeGVkSGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TY3JvbGw9e29uU2Nyb2xsfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0PXtzY3JvbGxMZWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUdyaWRQcm9wcz17ZGF0YUdyaWRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEdyaWRSZWY9e3VucGlubmVkR3JpZCA9PiAodGhpcy51bnBpbm5lZEdyaWQgPSB1bnBpbm5lZEdyaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg9e2NvbHVtbldpZHRoRnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVucGlubmVkQ29sdW1uc0dob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsU2l6ZUNhY2hlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnaG9zdFxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNlbGxSZW5kZXI9e3RoaXMucmVuZGVySGVhZGVyQ2VsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5waW5uZWRDb2x1bW5zR2hvc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU1vcmVPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JlT3B0aW9uc0NvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFDZWxsUmVuZGVyPXt0aGlzLnJlbmRlckRhdGFDZWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1bnBpbm5lZENvbHVtbnNHaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHNcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPC9TY3JvbGxTeW5jPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2l0aFRoZW1lKERhdGFUYWJsZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFUYWJsZUZhY3Rvcnk7XG4iXX0=