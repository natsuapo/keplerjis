"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATASET_COLUMNS = exports.DEFAULT_OUTPUT_COL_TYPES = exports.OUTPUT_COL_TYPES = exports.GEOMETRY_RANGE = exports.JAPAN_PREF_DICT_BK = exports.JAPAN_PREF_DICT = exports.TIME_LIST = exports.EXPORT_FILE_LIST = exports.ADDRESS_LEVEL_DICT = exports.DATASET_FORMATS = exports.LOADING_METHODS = exports.MAP_INFO_CHARACTER = exports.MAP_THUMBNAIL_DIMENSION = exports.MAX_GPU_FILTERS = exports.EDITOR_AVAILABLE_LAYERS = exports.EDITOR_MODES = exports.GEOCODER_ICON_SIZE = exports.GEOCODER_ICON_COLOR = exports.GEOCODER_GEO_OFFSET = exports.GEOCODER_LAYER_ID = exports.GEOCODER_DATASET_NAME = exports.SPEED_CONTROL_STEP = exports.SPEED_CONTROL_RANGE = exports.DEFAULT_TIME_FORMAT = exports.ANIMATION_WINDOW = exports.FPS = exports.BASE_SPEED = exports.THROTTLE_NOTIFICATION_TIME = exports.DEFAULT_NOTIFICATION_TOPICS = exports.DEFAULT_NOTIFICATION_TYPES = exports.DEFAULT_NOTIFICATION_MESSAGE = exports.DEFAULT_UUID_COUNT = exports.EXPORT_HTML_MAP_MODE_OPTIONS = exports.EXPORT_MAP_FORMAT_OPTIONS = exports.EXPORT_HTML_MAP_MODES = exports.EXPORT_MAP_FORMATS = exports.EXPORT_DATA_TYPE_OPTIONS = exports.EXPORT_DATA_TYPE = exports.EXPORT_IMG_RESOLUTION_OPTIONS = exports.EXPORT_IMG_RATIO_OPTIONS = exports.EXPORT_IMG_RATIOS = exports.RESOLUTIONS = exports.MAX_DEFAULT_TOOLTIPS = exports.LAYER_BLENDINGS = exports.NO_VALUE_COLOR = exports.DEFAULT_TOOLTIP_FIELDS = exports.DEFAULT_LAYER_COLOR = exports.CHANNEL_SCALE_SUPPORTED_FIELDS = exports.FIELD_OPTS = exports.DEFAULT_AGGREGATION = exports.notSupportAggrOpts = exports.notSupportedScaleOpts = exports.ordinalFieldAggrScaleFunctions = exports.ordinalFieldScaleFunctions = exports.linearFieldAggrScaleFunctions = exports.linearFieldScaleFunctions = exports.AGGREGATION_TYPES = exports.CHANNEL_SCALES = exports.HIGHLIGH_COLOR_3D = exports.FIELD_COLORS = exports.FILED_TYPE_DISPLAY = exports.TABLE_OPTION_LIST = exports.TABLE_OPTION = exports.SORT_ORDER = exports.SPATIAL_INTERACTION_METHOD = exports.JOIN_METHOD = exports.PROCESS_LIST = exports.PROCESS_ITEMS = exports.ALL_FIELD_TYPES = exports.SCALE_FUNC = exports.SCALE_TYPES = exports.FILTER_TYPES = exports.TRIP_ARC_FIELDS = exports.TRIP_POINT_FIELDS = exports.ICON_FIELDS = exports.GEOJSON_FIELDS = exports.DEFAULT_MAP_STYLES = exports.DEFAULT_LAYER_GROUPS = exports.PANELS = exports.SIDEBAR_PANELS = exports.THEME = exports.DIMENSIONS = exports.KEPLER_GL_WEBSITE = exports.KEPLER_GL_VERSION = exports.KEPLER_GL_NAME = exports.SHARE_MAP_ID = exports.OVERWRITE_MAP_ID = exports.SAVE_MAP_ID = exports.EXPORT_MAP_ID = exports.ADD_MAP_STYLE_ID = exports.EXPORT_DATA_ID = exports.EXPORT_IMAGE_ID = exports.ADD_DATA_ID = exports.DELETE_DATA_ID = exports.DATA_TABLE_ID = exports.DEFAULT_MAPBOX_API_URL = exports.ICON_PREFIX = exports.CLOUDFRONT = exports.ACTION_PREFIX = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _keymirror = _interopRequireDefault(require("keymirror"));

var _reactMapGlDraw = require("react-map-gl-draw");

var _d3Scale = require("d3-scale");

var _icons = require("../components/common/icons");

var _utils = require("../utils/utils");

var _tooltip = require("./tooltip");

var _types = require("../layers/types");

var _trash = _interopRequireDefault(require("../components/common/icons/trash"));

var _rocket = _interopRequireDefault(require("../components/common/icons/rocket"));

var _google = _interopRequireDefault(require("../components/common/icons/google"));

var _SCALE_FUNC, _PROCESS_LIST, _FILED_TYPE_DISPLAY, _linearFieldScaleFunc, _CHANNEL_SCALES$color, _CHANNEL_SCALES$sizeA, _linearFieldAggrScale, _ordinalFieldScaleFun, _CHANNEL_SCALES$color2, _ordinalFieldAggrScal, _notSupportedScaleOpt, _notSupportAggrOpts, _DEFAULT_AGGREGATION;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ACTION_PREFIX = '@@kepler.gl/';
exports.ACTION_PREFIX = ACTION_PREFIX;
var CLOUDFRONT = 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl';
exports.CLOUDFRONT = CLOUDFRONT;
var ICON_PREFIX = "".concat(CLOUDFRONT, "/geodude");
exports.ICON_PREFIX = ICON_PREFIX;
var DEFAULT_MAPBOX_API_URL = 'https://api.mapbox.com'; // Modal Ids

/**
 * Modal id: data table
 * @constant
 * @type {string}
 * @public
 */

exports.DEFAULT_MAPBOX_API_URL = DEFAULT_MAPBOX_API_URL;
var DATA_TABLE_ID = 'dataTable';
/**
 * Modal id: delete dataset confirm dialog
 * @constant
 * @type {string}
 * @public
 */

exports.DATA_TABLE_ID = DATA_TABLE_ID;
var DELETE_DATA_ID = 'deleteData';
/**
 * Modal id: add data modal
 * @constant
 * @type {string}
 * @public
 */

exports.DELETE_DATA_ID = DELETE_DATA_ID;
var ADD_DATA_ID = 'addData';
/**
 * Modal id: export image modal
 * @constant
 * @type {string}
 * @public
 */

exports.ADD_DATA_ID = ADD_DATA_ID;
var EXPORT_IMAGE_ID = 'exportImage';
/**
 * Modal id: export data modal
 * @constant
 * @type {string}
 * @public
 */

exports.EXPORT_IMAGE_ID = EXPORT_IMAGE_ID;
var EXPORT_DATA_ID = 'exportData';
/**
 * Modal id: add custom map style modal
 * @constant
 * @type {string}
 * @public
 */

exports.EXPORT_DATA_ID = EXPORT_DATA_ID;
var ADD_MAP_STYLE_ID = 'addMapStyle';
/**
 * Modal id: export map modal
 * @constant
 * @type {string}
 * @public
 */

exports.ADD_MAP_STYLE_ID = ADD_MAP_STYLE_ID;
var EXPORT_MAP_ID = 'exportMap';
/**
 * Modal id: save map modal
 * @constant
 * @type {string}
 * @public
 */

exports.EXPORT_MAP_ID = EXPORT_MAP_ID;
var SAVE_MAP_ID = 'saveMap';
/**
 * Modal id: confirm to overwrite saved map
 * @constant
 * @type {string}
 * @public
 */

exports.SAVE_MAP_ID = SAVE_MAP_ID;
var OVERWRITE_MAP_ID = 'overwriteMap';
/**
 * Modal id: share map url modal
 * @constant
 * @type {string}
 * @public
 */

exports.OVERWRITE_MAP_ID = OVERWRITE_MAP_ID;
var SHARE_MAP_ID = 'shareMap';
exports.SHARE_MAP_ID = SHARE_MAP_ID;
var KEPLER_GL_NAME = 'kepler.gl'; // __PACKAGE_VERSION__ is automatically injected by Babel/Webpack during the building process
// Since we are injecting this during the build process with babel
// while developing VERSION is not defined, we capture the exception and return
// an empty string which will allow us to retrieve the latest umd version

exports.KEPLER_GL_NAME = KEPLER_GL_NAME;
var KEPLER_GL_VERSION = "2.5.4";
exports.KEPLER_GL_VERSION = KEPLER_GL_VERSION;
var KEPLER_GL_WEBSITE = 'http://kepler.gl/';
exports.KEPLER_GL_WEBSITE = KEPLER_GL_WEBSITE;
var DIMENSIONS = {
  sidePanel: {
    width: 300,
    margin: {
      top: 20,
      left: 20,
      bottom: 30,
      right: 20
    },
    headerHeight: 96
  },
  mapControl: {
    width: 184,
    padding: 12
  }
};
/**
 * Theme name that can be passed to `KeplerGl` `prop.theme`.
 * Available themes are `THEME.light` and `THEME.dark`. Default theme is `THEME.dark`
 * @constant
 * @type {object}
 * @public
 * @example
 * ```js
 * const Map = () => <KeplerGl theme={THEME.light} id="map"/>
 * ```
 */

exports.DIMENSIONS = DIMENSIONS;
var THEME = (0, _keymirror["default"])({
  light: null,
  dark: null,
  base: null
}); //here set side bar panels:

exports.THEME = THEME;
var SIDEBAR_PANELS = [{
  id: 'layer',
  label: 'sidebar.panels.layer',
  iconComponent: _icons.Layers,
  onClick: null
}, {
  id: 'filter',
  label: 'sidebar.panels.filter',
  iconComponent: _icons.FilterFunnel,
  onClick: null
}, {
  id: 'interaction',
  label: 'sidebar.panels.interaction',
  iconComponent: _icons.CursorClick,
  onClick: null
}, {
  id: 'map',
  label: 'sidebar.panels.basemap',
  iconComponent: _icons.Settings,
  onClick: null
} // {
//   id:'processor',
//   label:'sidebar.panels.process',
//   iconComponent:Rocket,
//   onClick: null
//
// },
// {
//   id:'gmtprocess',
//   label:'sidebar.panels.gmtprocess',
//   iconComponent:Google,
//   onClick: null
// }
]; // backward compatibility

exports.SIDEBAR_PANELS = SIDEBAR_PANELS;
var PANELS = SIDEBAR_PANELS; // MAP STYLES

exports.PANELS = PANELS;
var DEFAULT_LAYER_GROUPS = [{
  slug: 'label',
  filter: function filter(_ref) {
    var id = _ref.id;
    return id.match(/(?=(label|place-|poi-))/);
  },
  defaultVisibility: true
}, {
  slug: 'road',
  filter: function filter(_ref2) {
    var id = _ref2.id;
    return id.match(/(?=(road|railway|tunnel|street|bridge))(?!.*label)/);
  },
  defaultVisibility: true
}, {
  slug: 'border',
  filter: function filter(_ref3) {
    var id = _ref3.id;
    return id.match(/border|boundaries/);
  },
  defaultVisibility: false
}, {
  slug: 'building',
  filter: function filter(_ref4) {
    var id = _ref4.id;
    return id.match(/building/);
  },
  defaultVisibility: true
}, {
  slug: 'water',
  filter: function filter(_ref5) {
    var id = _ref5.id;
    return id.match(/(?=(water|stream|ferry))/);
  },
  defaultVisibility: true
}, {
  slug: 'land',
  filter: function filter(_ref6) {
    var id = _ref6.id;
    return id.match(/(?=(parks|landcover|industrial|sand|hillshade))/);
  },
  defaultVisibility: true
}, {
  slug: '3d building',
  filter: function filter() {
    return false;
  },
  defaultVisibility: false
}];
exports.DEFAULT_LAYER_GROUPS = DEFAULT_LAYER_GROUPS;
var DEFAULT_MAP_STYLES = [{
  id: 'dark',
  label: 'Dark',
  url: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
  icon: "".concat(ICON_PREFIX, "/UBER_DARK_V2.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'light',
  label: 'Light',
  url: 'mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4',
  icon: "".concat(ICON_PREFIX, "/UBER_LIGHT_V2.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'muted',
  label: 'Muted Light',
  url: 'mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4',
  icon: "".concat(ICON_PREFIX, "/UBER_MUTED_LIGHT.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'muted_night',
  label: 'Muted Night',
  url: 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs',
  icon: "".concat(ICON_PREFIX, "/UBER_MUTED_NIGHT.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'satellite',
  label: 'Satellite',
  url: "mapbox://styles/mapbox/satellite-v9",
  icon: "".concat(ICON_PREFIX, "/UBER_SATELLITE.png")
}];
exports.DEFAULT_MAP_STYLES = DEFAULT_MAP_STYLES;
var GEOJSON_FIELDS = {
  geojson: ['_geojson', 'all_points', 'geojson']
};
exports.GEOJSON_FIELDS = GEOJSON_FIELDS;
var ICON_FIELDS = {
  icon: ['icon']
};
exports.ICON_FIELDS = ICON_FIELDS;
var TRIP_POINT_FIELDS = [['lat', 'lng'], ['lat', 'lon'], ['latitude', 'longitude'], ['latitudee7', 'longitudee7'], ['late7', 'lnge7']];
exports.TRIP_POINT_FIELDS = TRIP_POINT_FIELDS;
var TRIP_ARC_FIELDS = {
  lat0: 'begintrip',
  lng0: 'begintrip',
  lat1: 'dropoff',
  lng1: 'dropoff'
};
exports.TRIP_ARC_FIELDS = TRIP_ARC_FIELDS;
var FILTER_TYPES = (0, _keymirror["default"])({
  range: null,
  select: null,
  input: null,
  timeRange: null,
  multiSelect: null,
  polygon: null,
  dateSelect: null
});
exports.FILTER_TYPES = FILTER_TYPES;
var SCALE_TYPES = (0, _keymirror["default"])({
  ordinal: null,
  quantile: null,
  quantize: null,
  linear: null,
  sqrt: null,
  log: null,
  // ordinal domain to linear range
  point: null
});
exports.SCALE_TYPES = SCALE_TYPES;
var SCALE_FUNC = (_SCALE_FUNC = {}, (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.linear, _d3Scale.scaleLinear), (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.quantize, _d3Scale.scaleQuantize), (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.quantile, _d3Scale.scaleQuantile), (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.ordinal, _d3Scale.scaleOrdinal), (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.sqrt, _d3Scale.scaleSqrt), (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.log, _d3Scale.scaleLog), (0, _defineProperty2["default"])(_SCALE_FUNC, SCALE_TYPES.point, _d3Scale.scalePoint), _SCALE_FUNC);
exports.SCALE_FUNC = SCALE_FUNC;
var ALL_FIELD_TYPES = (0, _keymirror["default"])({
  "boolean": null,
  date: null,
  geojson: null,
  integer: null,
  real: null,
  string: null,
  timestamp: null,
  point: null,
  time: null,
  dow: null
});
exports.ALL_FIELD_TYPES = ALL_FIELD_TYPES;
var PROCESS_ITEMS = {
  //address processor:
  ADDRESS_NORMALIZATION: 'Address normalization',
  GOOGLE_API_QUERY: 'Google API Query with id',
  REVERSE_GEOCODING: 'Reverse Geocoding',
  ADDRESS_IDENTIFICATION: 'Address identification',
  GEOCODING: 'GeoCoding',
  TYPE_CONVERSION: 'Change Google POI name to type',
  //basic functions:
  TABLE_JOIN: 'Join two datasets',
  TIME_OD_JOIN: 'Join another datasets with timespan',
  DATE_FILTERING: 'Filtering date with a calendar',
  TIME_FILTERING: 'Setting temporal fencing within one day',
  //geometry related function:
  CENTROID_EXTRACTION: 'Extracting centroid from geometry',
  MESHCODE_GENERALIZATION: 'Generalizing meshcode',
  MESHCODE_AGGREGATION: 'Aggregating data by meshcode',
  SPATIAL_FITLERING: 'Filtering by spatial information',
  SPATIAL_MASKING: 'Spatial masking',
  COPY_GEOJSON: 'Copying Geojson to clipboard',
  LINE_SIMPLIFICATION: 'Simplifying line data',
  WKB_GENERATION: 'Generating wkb row',
  MESHCODE_GENERATION: 'Generating meshcode',
  //temporal column related function:
  // TEMPORAL
  //differences between time flooring and time indexing
  TIME_FLOORING: 'Time flooring',
  TIME_INDEXING: 'Time indexing',
  //float processing:
  DIGIT_SLICING: 'slicing digits'
};
exports.PROCESS_ITEMS = PROCESS_ITEMS;
var PROCESS_LIST = (_PROCESS_LIST = {}, (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.geojson, [PROCESS_ITEMS.CENTROID_EXTRACTION, PROCESS_ITEMS.SPATIAL_MASKING, PROCESS_ITEMS.MESHCODE_AGGREGATION, PROCESS_ITEMS.COPY_GEOJSON, PROCESS_ITEMS.REVERSE_GEOCODING, PROCESS_ITEMS.LINE_SIMPLIFICATION, PROCESS_ITEMS.WKB_GENERATION]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.string, [PROCESS_ITEMS.ADDRESS_IDENTIFICATION, PROCESS_ITEMS.GEOCODING, PROCESS_ITEMS.TYPE_CONVERSION, PROCESS_ITEMS.GOOGLE_API_QUERY, PROCESS_ITEMS.TABLE_JOIN]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES["float"], [PROCESS_ITEMS.DIGIT_SLICING]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.integer, [PROCESS_ITEMS.TABLE_JOIN]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.time, [PROCESS_ITEMS.TIME_OD_JOIN]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.date, [PROCESS_ITEMS.DATE_FILTERING]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.timestamp, [PROCESS_ITEMS.TIME_OD_JOIN, PROCESS_ITEMS.TIME_INDEXING, PROCESS_ITEMS.TIME_FLOORING]), (0, _defineProperty2["default"])(_PROCESS_LIST, ALL_FIELD_TYPES.point, [PROCESS_ITEMS.SPATIAL_MASKING, PROCESS_ITEMS.MESHCODE_AGGREGATION, PROCESS_ITEMS.REVERSE_GEOCODING, PROCESS_ITEMS.MESHCODE_GENERATION]), _PROCESS_LIST); //only left join will keep the number of rows;

exports.PROCESS_LIST = PROCESS_LIST;
var JOIN_METHOD = (0, _keymirror["default"])({
  left: null,
  inner: null,
  outer: null
});
exports.JOIN_METHOD = JOIN_METHOD;
var SPATIAL_INTERACTION_METHOD = (0, _keymirror["default"])({
  within: null,
  contain: null,
  intersect: null
}); // Data Table

exports.SPATIAL_INTERACTION_METHOD = SPATIAL_INTERACTION_METHOD;
var SORT_ORDER = (0, _keymirror["default"])({
  ASCENDING: null,
  DESCENDING: null,
  UNSORT: null
});
exports.SORT_ORDER = SORT_ORDER;
var TABLE_OPTION = (0, _keymirror["default"])({
  SORT_ASC: null,
  SORT_DES: null,
  UNSORT: null,
  PIN: null,
  UNPIN: null,
  COPY: null,
  DELETE: null
});
exports.TABLE_OPTION = TABLE_OPTION;
var TABLE_OPTION_LIST = [{
  value: TABLE_OPTION.SORT_ASC,
  display: 'Sort Ascending',
  icon: _icons.ArrowUp,
  condition: function condition(props) {
    return props.sortMode !== SORT_ORDER.ASCENDING;
  }
}, {
  value: TABLE_OPTION.SORT_DES,
  display: 'Sort Descending',
  icon: _icons.ArrowDown,
  condition: function condition(props) {
    return props.sortMode !== SORT_ORDER.DESCENDING;
  }
}, {
  value: TABLE_OPTION.UNSORT,
  display: 'Unsort Column',
  icon: _icons.Cancel,
  condition: function condition(props) {
    return props.isSorted;
  }
}, {
  value: TABLE_OPTION.PIN,
  display: 'Pin Column',
  icon: _icons.Pin,
  condition: function condition(props) {
    return !props.isPinned;
  }
}, {
  value: TABLE_OPTION.UNPIN,
  display: 'Unpin Column',
  icon: _icons.Cancel,
  condition: function condition(props) {
    return props.isPinned;
  }
}, {
  value: TABLE_OPTION.COPY,
  display: 'Copy Column',
  icon: _icons.Clipboard
}, {
  value: TABLE_OPTION.DELETE,
  display: 'DELETE Column',
  icon: _trash["default"]
}];
exports.TABLE_OPTION_LIST = TABLE_OPTION_LIST;
var ORANGE = '248, 194, 28';
var PINK = '231, 189, 194';
var PURPLE = '160, 106, 206';
var BLUE = '140, 210, 205';
var BLUE2 = '106, 160, 206';
var BLUE3 = '0, 172, 237';
var GREEN = '106, 160, 56';
var RED = '237, 88, 106';
var FILED_TYPE_DISPLAY = (_FILED_TYPE_DISPLAY = {}, (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES["boolean"], {
  label: 'bool',
  color: PINK
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.date, {
  label: 'date',
  color: PURPLE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.geojson, {
  label: 'geo',
  color: BLUE2
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.integer, {
  label: 'int',
  color: ORANGE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.real, {
  label: 'float',
  color: ORANGE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.string, {
  label: 'string',
  color: BLUE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.timestamp, {
  label: 'time',
  color: GREEN
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.point, {
  label: 'point',
  color: BLUE3
}), _FILED_TYPE_DISPLAY);
exports.FILED_TYPE_DISPLAY = FILED_TYPE_DISPLAY;
var FIELD_COLORS = {
  "default": RED
};
exports.FIELD_COLORS = FIELD_COLORS;
var HIGHLIGH_COLOR_3D = [255, 255, 255, 60];
exports.HIGHLIGH_COLOR_3D = HIGHLIGH_COLOR_3D;
var CHANNEL_SCALES = (0, _keymirror["default"])({
  color: null,
  radius: null,
  size: null,
  colorAggr: null,
  sizeAggr: null
});
exports.CHANNEL_SCALES = CHANNEL_SCALES;
var AGGREGATION_TYPES = {
  // default
  count: 'count',
  // linear
  average: 'average',
  maximum: 'maximum',
  minimum: 'minimum',
  median: 'median',
  stdev: 'stdev',
  sum: 'sum',
  variance: 'variance',
  // ordinal
  mode: 'mode',
  countUnique: 'count unique'
};
exports.AGGREGATION_TYPES = AGGREGATION_TYPES;
var linearFieldScaleFunctions = (_linearFieldScaleFunc = {}, (0, _defineProperty2["default"])(_linearFieldScaleFunc, CHANNEL_SCALES.color, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_linearFieldScaleFunc, CHANNEL_SCALES.radius, [SCALE_TYPES.sqrt]), (0, _defineProperty2["default"])(_linearFieldScaleFunc, CHANNEL_SCALES.size, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), _linearFieldScaleFunc);
exports.linearFieldScaleFunctions = linearFieldScaleFunctions;
var linearFieldAggrScaleFunctions = (_linearFieldAggrScale = {}, (0, _defineProperty2["default"])(_linearFieldAggrScale, CHANNEL_SCALES.colorAggr, (_CHANNEL_SCALES$color = {}, (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.average, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.maximum, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.minimum, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.median, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.stdev, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.sum, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.variance, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), _CHANNEL_SCALES$color)), (0, _defineProperty2["default"])(_linearFieldAggrScale, CHANNEL_SCALES.sizeAggr, (_CHANNEL_SCALES$sizeA = {}, (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.average, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.maximum, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.minimum, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.median, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.stdev, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.sum, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.variance, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log]), _CHANNEL_SCALES$sizeA)), _linearFieldAggrScale);
exports.linearFieldAggrScaleFunctions = linearFieldAggrScaleFunctions;
var ordinalFieldScaleFunctions = (_ordinalFieldScaleFun = {}, (0, _defineProperty2["default"])(_ordinalFieldScaleFun, CHANNEL_SCALES.color, [SCALE_TYPES.ordinal]), (0, _defineProperty2["default"])(_ordinalFieldScaleFun, CHANNEL_SCALES.radius, [SCALE_TYPES.point]), (0, _defineProperty2["default"])(_ordinalFieldScaleFun, CHANNEL_SCALES.size, [SCALE_TYPES.point]), _ordinalFieldScaleFun);
exports.ordinalFieldScaleFunctions = ordinalFieldScaleFunctions;
var ordinalFieldAggrScaleFunctions = (_ordinalFieldAggrScal = {}, (0, _defineProperty2["default"])(_ordinalFieldAggrScal, CHANNEL_SCALES.colorAggr, (_CHANNEL_SCALES$color2 = {}, (0, _defineProperty2["default"])(_CHANNEL_SCALES$color2, AGGREGATION_TYPES.mode, [SCALE_TYPES.ordinal]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color2, AGGREGATION_TYPES.countUnique, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), _CHANNEL_SCALES$color2)), (0, _defineProperty2["default"])(_ordinalFieldAggrScal, CHANNEL_SCALES.sizeAggr, {}), _ordinalFieldAggrScal);
exports.ordinalFieldAggrScaleFunctions = ordinalFieldAggrScaleFunctions;
var notSupportedScaleOpts = (_notSupportedScaleOpt = {}, (0, _defineProperty2["default"])(_notSupportedScaleOpt, CHANNEL_SCALES.color, []), (0, _defineProperty2["default"])(_notSupportedScaleOpt, CHANNEL_SCALES.radius, []), (0, _defineProperty2["default"])(_notSupportedScaleOpt, CHANNEL_SCALES.size, []), _notSupportedScaleOpt);
exports.notSupportedScaleOpts = notSupportedScaleOpts;
var notSupportAggrOpts = (_notSupportAggrOpts = {}, (0, _defineProperty2["default"])(_notSupportAggrOpts, CHANNEL_SCALES.colorAggr, {}), (0, _defineProperty2["default"])(_notSupportAggrOpts, CHANNEL_SCALES.sizeAggr, {}), _notSupportAggrOpts);
/**
 * Default aggregation are based on ocunt
 */

exports.notSupportAggrOpts = notSupportAggrOpts;
var DEFAULT_AGGREGATION = (_DEFAULT_AGGREGATION = {}, (0, _defineProperty2["default"])(_DEFAULT_AGGREGATION, CHANNEL_SCALES.colorAggr, (0, _defineProperty2["default"])({}, AGGREGATION_TYPES.count, [SCALE_TYPES.quantize, SCALE_TYPES.quantile])), (0, _defineProperty2["default"])(_DEFAULT_AGGREGATION, CHANNEL_SCALES.sizeAggr, (0, _defineProperty2["default"])({}, AGGREGATION_TYPES.count, [SCALE_TYPES.linear, SCALE_TYPES.sqrt, SCALE_TYPES.log])), _DEFAULT_AGGREGATION);
/**
 * Define what type of scale operation is allowed on each type of fields
 */

exports.DEFAULT_AGGREGATION = DEFAULT_AGGREGATION;
var FIELD_OPTS = {
  string: {
    type: 'categorical',
    scale: _objectSpread(_objectSpread({}, ordinalFieldScaleFunctions), ordinalFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      },
      tooltip: []
    }
  },
  real: {
    type: 'numerical',
    scale: _objectSpread(_objectSpread({}, linearFieldScaleFunctions), linearFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      },
      tooltip: [_tooltip.TOOLTIP_FORMAT_TYPES.NONE, _tooltip.TOOLTIP_FORMAT_TYPES.DECIMAL, _tooltip.TOOLTIP_FORMAT_TYPES.PERCENTAGE]
    }
  },
  timestamp: {
    type: 'time',
    scale: _objectSpread(_objectSpread({}, linearFieldScaleFunctions), notSupportAggrOpts),
    format: {
      legend: function legend(d) {
        return d;
      },
      tooltip: [_tooltip.TOOLTIP_FORMAT_TYPES.NONE, _tooltip.TOOLTIP_FORMAT_TYPES.DATE, _tooltip.TOOLTIP_FORMAT_TYPES.DATE_TIME]
    }
  },
  integer: {
    type: 'numerical',
    scale: _objectSpread(_objectSpread({}, linearFieldScaleFunctions), linearFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      },
      tooltip: [_tooltip.TOOLTIP_FORMAT_TYPES.NONE, _tooltip.TOOLTIP_FORMAT_TYPES.DECIMAL, _tooltip.TOOLTIP_FORMAT_TYPES.PERCENTAGE]
    }
  },
  "boolean": {
    type: 'boolean',
    scale: _objectSpread(_objectSpread({}, ordinalFieldScaleFunctions), ordinalFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      },
      tooltip: [_tooltip.TOOLTIP_FORMAT_TYPES.NONE, _tooltip.TOOLTIP_FORMAT_TYPES.BOOLEAN]
    }
  },
  date: {
    scale: _objectSpread(_objectSpread({}, ordinalFieldScaleFunctions), ordinalFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      },
      tooltip: [_tooltip.TOOLTIP_FORMAT_TYPES.NONE, _tooltip.TOOLTIP_FORMAT_TYPES.DATE]
    }
  },
  geojson: {
    type: 'geometry',
    scale: _objectSpread(_objectSpread({}, notSupportedScaleOpts), notSupportAggrOpts),
    format: {
      legend: function legend(d) {
        return '...';
      },
      tooltip: []
    }
  }
};
exports.FIELD_OPTS = FIELD_OPTS;
var CHANNEL_SCALE_SUPPORTED_FIELDS = Object.keys(CHANNEL_SCALES).reduce(function (accu, key) {
  return _objectSpread(_objectSpread({}, accu), {}, (0, _defineProperty2["default"])({}, key, Object.keys(FIELD_OPTS).filter(function (ft) {
    return Object.keys(FIELD_OPTS[ft].scale[key]).length;
  })));
}, {});
exports.CHANNEL_SCALE_SUPPORTED_FIELDS = CHANNEL_SCALE_SUPPORTED_FIELDS;
var DEFAULT_LAYER_COLOR = {
  tripArc: '#9226C6',
  begintrip_lat: '#1E96BE',
  dropoff_lat: '#FF991F',
  request_lat: '#52A353'
}; // let user pass in default tooltip fields

exports.DEFAULT_LAYER_COLOR = DEFAULT_LAYER_COLOR;
var DEFAULT_TOOLTIP_FIELDS = [];
exports.DEFAULT_TOOLTIP_FIELDS = DEFAULT_TOOLTIP_FIELDS;
var NO_VALUE_COLOR = [0, 0, 0, 0];
exports.NO_VALUE_COLOR = NO_VALUE_COLOR;
var LAYER_BLENDINGS = {
  additive: {
    label: 'layerBlending.additive',
    blendFunc: ['SRC_ALPHA', 'DST_ALPHA'],
    blendEquation: 'FUNC_ADD'
  },
  normal: {
    // reference to
    // https://limnu.com/webgl-blending-youre-probably-wrong/
    label: 'layerBlending.normal',
    blendFunc: ['SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA', 'ONE', 'ONE_MINUS_SRC_ALPHA'],
    blendEquation: ['FUNC_ADD', 'FUNC_ADD']
  },
  subtractive: {
    label: 'layerBlending.subtractive',
    blendFunc: ['ONE', 'ONE_MINUS_DST_COLOR', 'SRC_ALPHA', 'DST_ALPHA'],
    blendEquation: ['FUNC_SUBTRACT', 'FUNC_ADD']
  }
};
exports.LAYER_BLENDINGS = LAYER_BLENDINGS;
var MAX_DEFAULT_TOOLTIPS = 5;
exports.MAX_DEFAULT_TOOLTIPS = MAX_DEFAULT_TOOLTIPS;
var RESOLUTIONS = (0, _keymirror["default"])({
  ONE_X: null,
  TWO_X: null
});
exports.RESOLUTIONS = RESOLUTIONS;
var EXPORT_IMG_RATIOS = (0, _keymirror["default"])({
  SCREEN: null,
  FOUR_BY_THREE: null,
  SIXTEEN_BY_NINE: null,
  CUSTOM: null
});
exports.EXPORT_IMG_RATIOS = EXPORT_IMG_RATIOS;
var EXPORT_IMG_RATIO_OPTIONS = [{
  id: EXPORT_IMG_RATIOS.SCREEN,
  label: 'modal.exportImage.ratioOriginalScreen',
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: screenH
    };
  }
}, {
  id: EXPORT_IMG_RATIOS.CUSTOM,
  hidden: true,
  label: 'modal.exportImage.ratioCustom',
  getSize: function getSize(mapW, mapH) {
    return {
      width: mapW,
      height: mapH
    };
  }
}, {
  id: EXPORT_IMG_RATIOS.FOUR_BY_THREE,
  label: 'modal.exportImage.ratio4_3',
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: Math.round(screenW * 0.75)
    };
  }
}, {
  id: EXPORT_IMG_RATIOS.SIXTEEN_BY_NINE,
  label: 'modal.exportImage.ratio16_9',
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: Math.round(screenW * 0.5625)
    };
  }
}];
exports.EXPORT_IMG_RATIO_OPTIONS = EXPORT_IMG_RATIO_OPTIONS;
var EXPORT_IMG_RESOLUTION_OPTIONS = [{
  id: RESOLUTIONS.ONE_X,
  label: '1x',
  available: true,
  scale: 1,
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: screenH
    };
  }
}, {
  id: RESOLUTIONS.TWO_X,
  label: '2x',
  available: true,
  scale: 2,
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW * 2,
      height: screenH * 2
    };
  }
}];
exports.EXPORT_IMG_RESOLUTION_OPTIONS = EXPORT_IMG_RESOLUTION_OPTIONS;
var EXPORT_DATA_TYPE = (0, _keymirror["default"])({
  CSV: null // SHAPEFILE: null,
  // JSON: null,
  // GEOJSON: null,
  // TOPOJSON: null

});
exports.EXPORT_DATA_TYPE = EXPORT_DATA_TYPE;
var EXPORT_DATA_TYPE_OPTIONS = [{
  id: EXPORT_DATA_TYPE.CSV,
  label: EXPORT_DATA_TYPE.CSV.toLowerCase(),
  available: true
} // {
//   id: EXPORT_DATA_TYPE.SHAPEFILE,
//   label: 'shapefile',
//   available: false
// },
// {
//   id: EXPORT_DATA_TYPE.JSON,
//   label: 'json',
//   available: false
// },
// {
//   id: EXPORT_DATA_TYPE.GEOJSON,
//   label: 'geojson',
//   available: false
// },
// {
//   id: EXPORT_DATA_TYPE.TOPOJSON,
//   label: 'topojson',
//   available: false
// }
]; // Export map types

exports.EXPORT_DATA_TYPE_OPTIONS = EXPORT_DATA_TYPE_OPTIONS;
var EXPORT_MAP_FORMATS = (0, _keymirror["default"])({
  HTML: null,
  JSON: null
});
exports.EXPORT_MAP_FORMATS = EXPORT_MAP_FORMATS;
var EXPORT_HTML_MAP_MODES = (0, _keymirror["default"])({
  READ: null,
  EDIT: null
}); // Export map options

exports.EXPORT_HTML_MAP_MODES = EXPORT_HTML_MAP_MODES;
var EXPORT_MAP_FORMAT_OPTIONS = Object.entries(EXPORT_MAP_FORMATS).map(function (entry) {
  return {
    id: entry[0],
    label: entry[1].toLowerCase(),
    available: true
  };
});
exports.EXPORT_MAP_FORMAT_OPTIONS = EXPORT_MAP_FORMAT_OPTIONS;
var EXPORT_HTML_MAP_MODE_OPTIONS = Object.entries(EXPORT_HTML_MAP_MODES).map(function (entry) {
  return {
    id: entry[0],
    label: "modal.exportMap.html.".concat(entry[1].toLowerCase()),
    available: true,
    url: (0, _utils.getHTMLMapModeTileUrl)(entry[1])
  };
});
exports.EXPORT_HTML_MAP_MODE_OPTIONS = EXPORT_HTML_MAP_MODE_OPTIONS;
var DEFAULT_UUID_COUNT = 6;
exports.DEFAULT_UUID_COUNT = DEFAULT_UUID_COUNT;
var DEFAULT_NOTIFICATION_MESSAGE = 'MESSAGE_NOT_PROVIDED';
exports.DEFAULT_NOTIFICATION_MESSAGE = DEFAULT_NOTIFICATION_MESSAGE;
var DEFAULT_NOTIFICATION_TYPES = (0, _keymirror["default"])({
  info: null,
  error: null,
  warning: null,
  success: null
});
exports.DEFAULT_NOTIFICATION_TYPES = DEFAULT_NOTIFICATION_TYPES;
var DEFAULT_NOTIFICATION_TOPICS = (0, _keymirror["default"])({
  global: null,
  file: null
}); // Minimum time between identical notifications about deck.gl errors

exports.DEFAULT_NOTIFICATION_TOPICS = DEFAULT_NOTIFICATION_TOPICS;
var THROTTLE_NOTIFICATION_TIME = 2500; // Animation

exports.THROTTLE_NOTIFICATION_TIME = THROTTLE_NOTIFICATION_TIME;
var BASE_SPEED = 600;
exports.BASE_SPEED = BASE_SPEED;
var FPS = 60;
/**
 * 4 Animation Window Types
 * 1. free
 *  |->  |->
 * Current time is a fixed range, animation controller calls next animation frames continuously to animation a moving window
 * The increment id based on domain / BASE_SPEED * SPEED
 *
 * 2. incremental
 * |    |->
 * Same as free, current time is a growing range, only the max value of range increment during animation.
 * The increment is also based on domain / BASE_SPEED * SPEED
 *
 * 3. point
 * o -> o
 * Current time is a point, animation controller calls next animation frame continuously to animation a moving point
 * The increment is based on domain / BASE_SPEED * SPEED
 *
 * 4. interval
 * o ~> o
 * Current time is a point. An array of sorted time steps need to be provided.
 * animation controller calls next animation at a interval when the point jumps to the next step
 */

exports.FPS = FPS;
var ANIMATION_WINDOW = (0, _keymirror["default"])({
  free: null,
  incremental: null,
  point: null,
  interval: null
});
exports.ANIMATION_WINDOW = ANIMATION_WINDOW;
var DEFAULT_TIME_FORMAT = 'MM/DD/YY HH:mm:ssa';
exports.DEFAULT_TIME_FORMAT = DEFAULT_TIME_FORMAT;
var SPEED_CONTROL_RANGE = [0, 10];
exports.SPEED_CONTROL_RANGE = SPEED_CONTROL_RANGE;
var SPEED_CONTROL_STEP = 0.001; // Geocoder

exports.SPEED_CONTROL_STEP = SPEED_CONTROL_STEP;
var GEOCODER_DATASET_NAME = 'geocoder_dataset';
exports.GEOCODER_DATASET_NAME = GEOCODER_DATASET_NAME;
var GEOCODER_LAYER_ID = 'geocoder_layer';
exports.GEOCODER_LAYER_ID = GEOCODER_LAYER_ID;
var GEOCODER_GEO_OFFSET = 0.05;
exports.GEOCODER_GEO_OFFSET = GEOCODER_GEO_OFFSET;
var GEOCODER_ICON_COLOR = [255, 0, 0];
exports.GEOCODER_ICON_COLOR = GEOCODER_ICON_COLOR;
var GEOCODER_ICON_SIZE = 80; // We could use directly react-map-gl-draw EditorMode but this would
// create a direct dependency with react-map-gl-draw
// Created this map to be independent from react-map-gl-draw

exports.GEOCODER_ICON_SIZE = GEOCODER_ICON_SIZE;
var EDITOR_MODES = {
  READ_ONLY: _reactMapGlDraw.EditorModes.READ_ONLY,
  DRAW_POLYGON: _reactMapGlDraw.EditorModes.DRAW_POLYGON,
  DRAW_RECTANGLE: _reactMapGlDraw.EditorModes.DRAW_RECTANGLE,
  EDIT: _reactMapGlDraw.EditorModes.EDIT_VERTEX
};
exports.EDITOR_MODES = EDITOR_MODES;
var EDITOR_AVAILABLE_LAYERS = [_types.LAYER_TYPES.point, _types.LAYER_TYPES.hexagon, _types.LAYER_TYPES.arc, _types.LAYER_TYPES.line, _types.LAYER_TYPES.hexagonId]; // GPU Filtering

/**
 * Max number of filter value buffers that deck.gl provides
 */

exports.EDITOR_AVAILABLE_LAYERS = EDITOR_AVAILABLE_LAYERS;
var MAX_GPU_FILTERS = 4;
exports.MAX_GPU_FILTERS = MAX_GPU_FILTERS;
var MAP_THUMBNAIL_DIMENSION = {
  width: 300,
  height: 200
};
exports.MAP_THUMBNAIL_DIMENSION = MAP_THUMBNAIL_DIMENSION;
var MAP_INFO_CHARACTER = {
  title: 100,
  description: 100
}; // Load data

exports.MAP_INFO_CHARACTER = MAP_INFO_CHARACTER;
var LOADING_METHODS = (0, _keymirror["default"])({
  upload: null,
  storage: null
});
exports.LOADING_METHODS = LOADING_METHODS;
var DATASET_FORMATS = (0, _keymirror["default"])({
  row: null,
  geojson: null,
  csv: null,
  keplergl: null,
  google_track: null,
  google_semantic: null
});
exports.DATASET_FORMATS = DATASET_FORMATS;
var ADDRESS_LEVEL_DICT = {
  '階数': 'floor',
  '建物名': 'premise',
  '街区': 'sublocality_level_4',
  '小字・丁目': 'sublocality_level_3',
  '大字・町': 'sublocality_level_2',
  '政令指定都市の区': 'sublocality_level_1',
  '市区町村（東京都区部）': 'locality',
  '郡': 'administrative_area_level_2',
  '都道府県': 'administrative_area_level_1',
  '国': 'country',
  '郵便番号': 'postal_code'
};
exports.ADDRESS_LEVEL_DICT = ADDRESS_LEVEL_DICT;
var EXPORT_FILE_LIST = {
  'activity information': ['activity information'],
  //gps data matched: will match the mobility information to the gps data;
  'GMT raw gps data': ['matched GPS data', 'GMT raw GPS data'],
  'visited place information': ['visited place information']
};
exports.EXPORT_FILE_LIST = EXPORT_FILE_LIST;
var TIME_LIST = ['00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00'];
exports.TIME_LIST = TIME_LIST;
var JAPAN_PREF_DICT = [{
  'value': '000',
  'checked': true,
  'label': '北海道',
  'children': [{
    'value': 1,
    'checked': true,
    'label': '北海道'
  }]
}, {
  'value': '001',
  'checked': true,
  'label': '東北',
  'children': [{
    'value': 7,
    'checked': true,
    'label': '福島県'
  }, {
    'value': 5,
    'checked': true,
    'label': '秋田県'
  }, {
    'value': 2,
    'checked': true,
    'label': '青森県'
  }, {
    'value': 6,
    'checked': true,
    'label': '山形県'
  }, {
    'value': 4,
    'checked': true,
    'label': '宮城県'
  }, {
    'value': 3,
    'checked': true,
    'label': '岩手県'
  }]
}, {
  'value': '002',
  'checked': true,
  'label': '関東',
  'children': [{
    'value': 13,
    'checked': true,
    'label': '東京都'
  }, {
    'value': 11,
    'checked': true,
    'label': '埼玉県'
  }, {
    'value': 10,
    'checked': true,
    'label': '群馬県'
  }, {
    'value': 14,
    'checked': true,
    'label': '神奈川県'
  }, {
    'value': 8,
    'checked': true,
    'label': '茨城県'
  }, {
    'value': 12,
    'checked': true,
    'label': '千葉県'
  }, {
    'value': 9,
    'checked': true,
    'label': '栃木県'
  }]
}, {
  'value': '003',
  'checked': true,
  'label': '中部',
  'children': [{
    'value': 22,
    'checked': true,
    'label': '静岡県'
  }, {
    'value': 20,
    'checked': true,
    'label': '長野県'
  }, {
    'value': 21,
    'checked': true,
    'label': '岐阜県'
  }, {
    'value': 16,
    'checked': true,
    'label': '富山県'
  }, {
    'value': 19,
    'checked': true,
    'label': '山梨県'
  }, {
    'value': 18,
    'checked': true,
    'label': '福井県'
  }, {
    'value': 15,
    'checked': true,
    'label': '新潟県'
  }, {
    'value': 23,
    'checked': true,
    'label': '愛知県'
  }, {
    'value': 17,
    'checked': true,
    'label': '石川県'
  }]
}, {
  'value': '004',
  'checked': true,
  'label': '近畿',
  'children': [{
    'value': 30,
    'checked': true,
    'label': '和歌山県'
  }, {
    'value': 26,
    'checked': true,
    'label': '京都府'
  }, {
    'value': 24,
    'checked': true,
    'label': '三重県'
  }, {
    'value': 25,
    'checked': true,
    'label': '滋賀県'
  }, {
    'value': 27,
    'checked': true,
    'label': '大阪府'
  }, {
    'value': 28,
    'checked': true,
    'label': '兵庫県'
  }, {
    'value': 29,
    'checked': true,
    'label': '奈良県'
  }]
}, {
  'value': '005',
  'checked': true,
  'label': '中国',
  'children': [{
    'value': 31,
    'checked': true,
    'label': '鳥取県'
  }, {
    'value': 35,
    'checked': true,
    'label': '山口県'
  }, {
    'value': 32,
    'checked': true,
    'label': '島根県'
  }, {
    'value': 33,
    'checked': true,
    'label': '岡山県'
  }, {
    'value': 34,
    'checked': true,
    'label': '広島県'
  }]
}, {
  'value': '006',
  'checked': true,
  'label': '四国',
  'children': [{
    'value': 37,
    'checked': true,
    'label': '香川県'
  }, {
    'value': 38,
    'checked': true,
    'label': '愛媛県'
  }, {
    'value': 36,
    'checked': true,
    'label': '徳島県'
  }, {
    'value': 39,
    'checked': true,
    'label': '高知県'
  }]
}, {
  'value': '007',
  'checked': true,
  'label': '九州・沖縄',
  'children': [{
    'value': 40,
    'checked': true,
    'label': '福岡県'
  }, {
    'value': 44,
    'checked': true,
    'label': '大分県'
  }, {
    'value': 42,
    'checked': true,
    'label': '長崎県'
  }, {
    'value': 43,
    'checked': true,
    'label': '熊本県'
  }, {
    'value': 45,
    'checked': true,
    'label': '宮崎県'
  }, {
    'value': 46,
    'checked': true,
    'label': '鹿児島県'
  }, {
    'value': 41,
    'checked': true,
    'label': '佐賀県'
  }, {
    'value': 47,
    'checked': true,
    'label': '沖縄県'
  }]
}];
exports.JAPAN_PREF_DICT = JAPAN_PREF_DICT;
var JAPAN_PREF_DICT_BK = [{
  'value': '000',
  'label': '北海道',
  'children': [{
    'value': 1,
    'label': '北海道'
  }]
}, {
  'value': '001',
  'label': '東北',
  'children': [{
    'value': 7,
    'label': '福島県'
  }, {
    'value': 5,
    'label': '秋田県'
  }, {
    'value': 2,
    'label': '青森県'
  }, {
    'value': 6,
    'label': '山形県'
  }, {
    'value': 4,
    'label': '宮城県'
  }, {
    'value': 3,
    'label': '岩手県'
  }]
}, {
  'value': '002',
  'label': '関東',
  'children': [{
    'value': 13,
    'label': '東京都'
  }, {
    'value': 11,
    'label': '埼玉県'
  }, {
    'value': 10,
    'label': '群馬県'
  }, {
    'value': 14,
    'label': '神奈川県'
  }, {
    'value': 8,
    'label': '茨城県'
  }, {
    'value': 12,
    'label': '千葉県'
  }, {
    'value': 9,
    'label': '栃木県'
  }]
}, {
  'value': '003',
  'label': '中部',
  'children': [{
    'value': 22,
    'label': '静岡県'
  }, {
    'value': 20,
    'label': '長野県'
  }, {
    'value': 21,
    'label': '岐阜県'
  }, {
    'value': 16,
    'label': '富山県'
  }, {
    'value': 19,
    'label': '山梨県'
  }, {
    'value': 18,
    'label': '福井県'
  }, {
    'value': 15,
    'label': '新潟県'
  }, {
    'value': 23,
    'label': '愛知県'
  }, {
    'value': 17,
    'label': '石川県'
  }]
}, {
  'value': '004',
  'label': '近畿',
  'children': [{
    'value': 30,
    'label': '和歌山県'
  }, {
    'value': 26,
    'label': '京都府'
  }, {
    'value': 24,
    'label': '三重県'
  }, {
    'value': 25,
    'label': '滋賀県'
  }, {
    'value': 27,
    'label': '大阪府'
  }, {
    'value': 28,
    'label': '兵庫県'
  }, {
    'value': 29,
    'label': '奈良県'
  }]
}, {
  'value': '005',
  'label': '中国',
  'children': [{
    'value': 31,
    'label': '鳥取県'
  }, {
    'value': 35,
    'label': '山口県'
  }, {
    'value': 32,
    'label': '島根県'
  }, {
    'value': 33,
    'label': '岡山県'
  }, {
    'value': 34,
    'label': '広島県'
  }]
}, {
  'value': '006',
  'label': '四国',
  'children': [{
    'value': 37,
    'label': '香川県'
  }, {
    'value': 38,
    'label': '愛媛県'
  }, {
    'value': 36,
    'label': '徳島県'
  }, {
    'value': 39,
    'label': '高知県'
  }]
}, {
  'value': '007',
  'label': '九州・沖縄',
  'children': [{
    'value': 40,
    'label': '福岡県'
  }, {
    'value': 44,
    'label': '大分県'
  }, {
    'value': 42,
    'label': '長崎県'
  }, {
    'value': 43,
    'label': '熊本県'
  }, {
    'value': 45,
    'label': '宮崎県'
  }, {
    'value': 46,
    'label': '鹿児島県'
  }, {
    'value': 41,
    'label': '佐賀県'
  }, {
    'value': 47,
    'label': '沖縄県'
  }]
}];
exports.JAPAN_PREF_DICT_BK = JAPAN_PREF_DICT_BK;
var GEOMETRY_RANGE = {
  '関東広域': {
    "id": "0",
    "type": "Feature",
    "properties": {
      "dow": null,
      "end_date": "",
      "end_time": "",
      "filtering_name": "JR実証実験",
      "start_date": "",
      "start_time": ""
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[138.9150974223591, 36.36240690757039], [140.7004421711946, 36.35092277171098], [140.6915725981913, 35.1687306294764], [138.90737619083967, 35.16767143008357], [138.9150974223591, 36.36240690757039]]]
    }
  },
  '近畿広域': {
    "id": "0",
    "type": "Feature",
    "properties": {
      "dow": null,
      "end_date": "",
      "end_time": "",
      "filtering_name": "近畿広域",
      "start_date": "",
      "start_time": ""
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[134.51660156250003, 35.31736632923788], [134.527587890625, 34.17090836352573], [136.18652343750003, 34.14818102254435], [136.18103027343756, 34.70097741472011], [136.19750976562506, 35.32633026307481], [134.51660156250003, 35.31736632923788]]]
    }
  },
  '首都圏': {
    "id": "0",
    "type": "Feature",
    "properties": {
      "dow": null,
      "end_date": "",
      "end_time": "",
      "filtering_name": "首都圏",
      "start_date": "",
      "start_time": ""
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[139.06494140625, 36.1245647481333], [139.06768798828125, 35.238889532322595], [140.2239990234375, 35.23664622093195], [140.22125244140625, 36.12900165569652], [139.06494140625, 36.1245647481333]]]
    }
  },
  '東海広域': {
    "id": "0",
    "type": "Feature",
    "properties": {
      "dow": null,
      "end_date": "",
      "end_time": "",
      "filtering_name": "東海広域",
      "start_date": "",
      "start_time": ""
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[136.22344703173414, 35.62910733717071], [136.2157258002147, 34.423374592327654], [137.99992220756633, 34.424443396813466], [137.35107421875, 35.61711648382185], [136.22344703173414, 35.62910733717071]]]
    }
  }
};
exports.GEOMETRY_RANGE = GEOMETRY_RANGE;
var OUTPUT_COL_TYPES = ['date', 'address', 'gps supplementary info', 'datetime', 'precision', 'geometry', 'gps', 'candidate POI ID', 'distance', 'poi type', 'id', 'transporation mode']; //better to make the result difficult to be reversed queried

exports.OUTPUT_COL_TYPES = OUTPUT_COL_TYPES;
var DEFAULT_OUTPUT_COL_TYPES = ['datetime', 'gps', 'address', 'transportation mode', 'poi type'];
exports.DEFAULT_OUTPUT_COL_TYPES = DEFAULT_OUTPUT_COL_TYPES;
var DATASET_COLUMNS = {
  'poidata': {
    'precision': ['placeConfidence', 'visitConfidence', 'editConfirmationStatus', 'location_locationConfidence', 'location_sourceInfo'],
    'gps': [['location_latitudeE7', 'location_longitudeE7']],
    'candidate POI ID': ['otherCandidateLocations'],
    'id': ['location_placeId'],
    'address': ['location_address'],
    'datetime': [['duration_startTimestampMs', 'duration_endTimestampMs']],
    'date': [['duration_startDate', 'duration_endDate']],
    'geometry': ['geometry'],
    'poi name': ['location_name']
  },
  'gpsdata': {
    "precision": ["accuracy", "'verticalAccuracy"],
    "datetime": ["timestamp"],
    'gps': [['lat', 'lng']],
    'gps supplementary info': ['velocity', 'heading', 'altitude']
  },
  'oddata': {
    'precision': ['activitySegment_confidence', 'activitySegment_editConfirmationStatus', 'activitySegment_startLocation_locationConfidence', 'activitySegment_endLocation_locationConfidence'],
    'gps': [['activitySegment_startLocation_latitudeE7', 'activitySegment_startLocation_longitudeE7'], ['activitySegment_endLocation_latitudeE7', 'activitySegment_endLocation_longitudeE7']],
    'distance': ['activitySegment_distance'],
    'transportation mode': ['activitySegment_activityType'],
    'id': ['activitySegment_startLocation_placeId', 'activitySegment_endLocation_placeId'],
    'address': ['activitySegment_startLocation_address', 'activitySegment_endLocation_address'],
    'poi name': ['activitySegment_startLocation_name', 'activitySegment_endLocation_name'],
    'datetime': [['activitySegment_duration_startTimestampMs', 'activitySegment_duration_endTimestampMs']],
    'date': [['activitySegment_duration_endDate', 'activitySegment_duration_startDate']],
    'geometry': ['waypoint_geom']
  }
};
exports.DATASET_COLUMNS = DATASET_COLUMNS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJBQ1RJT05fUFJFRklYIiwiQ0xPVURGUk9OVCIsIklDT05fUFJFRklYIiwiREVGQVVMVF9NQVBCT1hfQVBJX1VSTCIsIkRBVEFfVEFCTEVfSUQiLCJERUxFVEVfREFUQV9JRCIsIkFERF9EQVRBX0lEIiwiRVhQT1JUX0lNQUdFX0lEIiwiRVhQT1JUX0RBVEFfSUQiLCJBRERfTUFQX1NUWUxFX0lEIiwiRVhQT1JUX01BUF9JRCIsIlNBVkVfTUFQX0lEIiwiT1ZFUldSSVRFX01BUF9JRCIsIlNIQVJFX01BUF9JRCIsIktFUExFUl9HTF9OQU1FIiwiS0VQTEVSX0dMX1ZFUlNJT04iLCJLRVBMRVJfR0xfV0VCU0lURSIsIkRJTUVOU0lPTlMiLCJzaWRlUGFuZWwiLCJ3aWR0aCIsIm1hcmdpbiIsInRvcCIsImxlZnQiLCJib3R0b20iLCJyaWdodCIsImhlYWRlckhlaWdodCIsIm1hcENvbnRyb2wiLCJwYWRkaW5nIiwiVEhFTUUiLCJsaWdodCIsImRhcmsiLCJiYXNlIiwiU0lERUJBUl9QQU5FTFMiLCJpZCIsImxhYmVsIiwiaWNvbkNvbXBvbmVudCIsIkxheWVycyIsIm9uQ2xpY2siLCJGaWx0ZXJGdW5uZWwiLCJDdXJzb3JDbGljayIsIlNldHRpbmdzIiwiUEFORUxTIiwiREVGQVVMVF9MQVlFUl9HUk9VUFMiLCJzbHVnIiwiZmlsdGVyIiwibWF0Y2giLCJkZWZhdWx0VmlzaWJpbGl0eSIsIkRFRkFVTFRfTUFQX1NUWUxFUyIsInVybCIsImljb24iLCJsYXllckdyb3VwcyIsIkdFT0pTT05fRklFTERTIiwiZ2VvanNvbiIsIklDT05fRklFTERTIiwiVFJJUF9QT0lOVF9GSUVMRFMiLCJUUklQX0FSQ19GSUVMRFMiLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiRklMVEVSX1RZUEVTIiwicmFuZ2UiLCJzZWxlY3QiLCJpbnB1dCIsInRpbWVSYW5nZSIsIm11bHRpU2VsZWN0IiwicG9seWdvbiIsImRhdGVTZWxlY3QiLCJTQ0FMRV9UWVBFUyIsIm9yZGluYWwiLCJxdWFudGlsZSIsInF1YW50aXplIiwibGluZWFyIiwic3FydCIsImxvZyIsInBvaW50IiwiU0NBTEVfRlVOQyIsInNjYWxlTGluZWFyIiwic2NhbGVRdWFudGl6ZSIsInNjYWxlUXVhbnRpbGUiLCJzY2FsZU9yZGluYWwiLCJzY2FsZVNxcnQiLCJzY2FsZUxvZyIsInNjYWxlUG9pbnQiLCJBTExfRklFTERfVFlQRVMiLCJkYXRlIiwiaW50ZWdlciIsInJlYWwiLCJzdHJpbmciLCJ0aW1lc3RhbXAiLCJ0aW1lIiwiZG93IiwiUFJPQ0VTU19JVEVNUyIsIkFERFJFU1NfTk9STUFMSVpBVElPTiIsIkdPT0dMRV9BUElfUVVFUlkiLCJSRVZFUlNFX0dFT0NPRElORyIsIkFERFJFU1NfSURFTlRJRklDQVRJT04iLCJHRU9DT0RJTkciLCJUWVBFX0NPTlZFUlNJT04iLCJUQUJMRV9KT0lOIiwiVElNRV9PRF9KT0lOIiwiREFURV9GSUxURVJJTkciLCJUSU1FX0ZJTFRFUklORyIsIkNFTlRST0lEX0VYVFJBQ1RJT04iLCJNRVNIQ09ERV9HRU5FUkFMSVpBVElPTiIsIk1FU0hDT0RFX0FHR1JFR0FUSU9OIiwiU1BBVElBTF9GSVRMRVJJTkciLCJTUEFUSUFMX01BU0tJTkciLCJDT1BZX0dFT0pTT04iLCJMSU5FX1NJTVBMSUZJQ0FUSU9OIiwiV0tCX0dFTkVSQVRJT04iLCJNRVNIQ09ERV9HRU5FUkFUSU9OIiwiVElNRV9GTE9PUklORyIsIlRJTUVfSU5ERVhJTkciLCJESUdJVF9TTElDSU5HIiwiUFJPQ0VTU19MSVNUIiwiSk9JTl9NRVRIT0QiLCJpbm5lciIsIm91dGVyIiwiU1BBVElBTF9JTlRFUkFDVElPTl9NRVRIT0QiLCJ3aXRoaW4iLCJjb250YWluIiwiaW50ZXJzZWN0IiwiU09SVF9PUkRFUiIsIkFTQ0VORElORyIsIkRFU0NFTkRJTkciLCJVTlNPUlQiLCJUQUJMRV9PUFRJT04iLCJTT1JUX0FTQyIsIlNPUlRfREVTIiwiUElOIiwiVU5QSU4iLCJDT1BZIiwiREVMRVRFIiwiVEFCTEVfT1BUSU9OX0xJU1QiLCJ2YWx1ZSIsImRpc3BsYXkiLCJBcnJvd1VwIiwiY29uZGl0aW9uIiwicHJvcHMiLCJzb3J0TW9kZSIsIkFycm93RG93biIsIkNhbmNlbCIsImlzU29ydGVkIiwiUGluIiwiaXNQaW5uZWQiLCJDbGlwYm9hcmQiLCJUcmFzaCIsIk9SQU5HRSIsIlBJTksiLCJQVVJQTEUiLCJCTFVFIiwiQkxVRTIiLCJCTFVFMyIsIkdSRUVOIiwiUkVEIiwiRklMRURfVFlQRV9ESVNQTEFZIiwiY29sb3IiLCJGSUVMRF9DT0xPUlMiLCJISUdITElHSF9DT0xPUl8zRCIsIkNIQU5ORUxfU0NBTEVTIiwicmFkaXVzIiwic2l6ZSIsImNvbG9yQWdnciIsInNpemVBZ2dyIiwiQUdHUkVHQVRJT05fVFlQRVMiLCJjb3VudCIsImF2ZXJhZ2UiLCJtYXhpbXVtIiwibWluaW11bSIsIm1lZGlhbiIsInN0ZGV2Iiwic3VtIiwidmFyaWFuY2UiLCJtb2RlIiwiY291bnRVbmlxdWUiLCJsaW5lYXJGaWVsZFNjYWxlRnVuY3Rpb25zIiwibGluZWFyRmllbGRBZ2dyU2NhbGVGdW5jdGlvbnMiLCJvcmRpbmFsRmllbGRTY2FsZUZ1bmN0aW9ucyIsIm9yZGluYWxGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9ucyIsIm5vdFN1cHBvcnRlZFNjYWxlT3B0cyIsIm5vdFN1cHBvcnRBZ2dyT3B0cyIsIkRFRkFVTFRfQUdHUkVHQVRJT04iLCJGSUVMRF9PUFRTIiwidHlwZSIsInNjYWxlIiwiZm9ybWF0IiwibGVnZW5kIiwiZCIsInRvb2x0aXAiLCJUT09MVElQX0ZPUk1BVF9UWVBFUyIsIk5PTkUiLCJERUNJTUFMIiwiUEVSQ0VOVEFHRSIsIkRBVEUiLCJEQVRFX1RJTUUiLCJCT09MRUFOIiwiQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImFjY3UiLCJrZXkiLCJmdCIsImxlbmd0aCIsIkRFRkFVTFRfTEFZRVJfQ09MT1IiLCJ0cmlwQXJjIiwiYmVnaW50cmlwX2xhdCIsImRyb3BvZmZfbGF0IiwicmVxdWVzdF9sYXQiLCJERUZBVUxUX1RPT0xUSVBfRklFTERTIiwiTk9fVkFMVUVfQ09MT1IiLCJMQVlFUl9CTEVORElOR1MiLCJhZGRpdGl2ZSIsImJsZW5kRnVuYyIsImJsZW5kRXF1YXRpb24iLCJub3JtYWwiLCJzdWJ0cmFjdGl2ZSIsIk1BWF9ERUZBVUxUX1RPT0xUSVBTIiwiUkVTT0xVVElPTlMiLCJPTkVfWCIsIlRXT19YIiwiRVhQT1JUX0lNR19SQVRJT1MiLCJTQ1JFRU4iLCJGT1VSX0JZX1RIUkVFIiwiU0lYVEVFTl9CWV9OSU5FIiwiQ1VTVE9NIiwiRVhQT1JUX0lNR19SQVRJT19PUFRJT05TIiwiZ2V0U2l6ZSIsInNjcmVlblciLCJzY3JlZW5IIiwiaGVpZ2h0IiwiaGlkZGVuIiwibWFwVyIsIm1hcEgiLCJNYXRoIiwicm91bmQiLCJFWFBPUlRfSU1HX1JFU09MVVRJT05fT1BUSU9OUyIsImF2YWlsYWJsZSIsIkVYUE9SVF9EQVRBX1RZUEUiLCJDU1YiLCJFWFBPUlRfREFUQV9UWVBFX09QVElPTlMiLCJ0b0xvd2VyQ2FzZSIsIkVYUE9SVF9NQVBfRk9STUFUUyIsIkhUTUwiLCJKU09OIiwiRVhQT1JUX0hUTUxfTUFQX01PREVTIiwiUkVBRCIsIkVESVQiLCJFWFBPUlRfTUFQX0ZPUk1BVF9PUFRJT05TIiwiZW50cmllcyIsIm1hcCIsImVudHJ5IiwiRVhQT1JUX0hUTUxfTUFQX01PREVfT1BUSU9OUyIsIkRFRkFVTFRfVVVJRF9DT1VOVCIsIkRFRkFVTFRfTk9USUZJQ0FUSU9OX01FU1NBR0UiLCJERUZBVUxUX05PVElGSUNBVElPTl9UWVBFUyIsImluZm8iLCJlcnJvciIsIndhcm5pbmciLCJzdWNjZXNzIiwiREVGQVVMVF9OT1RJRklDQVRJT05fVE9QSUNTIiwiZ2xvYmFsIiwiZmlsZSIsIlRIUk9UVExFX05PVElGSUNBVElPTl9USU1FIiwiQkFTRV9TUEVFRCIsIkZQUyIsIkFOSU1BVElPTl9XSU5ET1ciLCJmcmVlIiwiaW5jcmVtZW50YWwiLCJpbnRlcnZhbCIsIkRFRkFVTFRfVElNRV9GT1JNQVQiLCJTUEVFRF9DT05UUk9MX1JBTkdFIiwiU1BFRURfQ09OVFJPTF9TVEVQIiwiR0VPQ09ERVJfREFUQVNFVF9OQU1FIiwiR0VPQ09ERVJfTEFZRVJfSUQiLCJHRU9DT0RFUl9HRU9fT0ZGU0VUIiwiR0VPQ09ERVJfSUNPTl9DT0xPUiIsIkdFT0NPREVSX0lDT05fU0laRSIsIkVESVRPUl9NT0RFUyIsIlJFQURfT05MWSIsIkVkaXRvck1vZGVzIiwiRFJBV19QT0xZR09OIiwiRFJBV19SRUNUQU5HTEUiLCJFRElUX1ZFUlRFWCIsIkVESVRPUl9BVkFJTEFCTEVfTEFZRVJTIiwiTEFZRVJfVFlQRVMiLCJoZXhhZ29uIiwiYXJjIiwibGluZSIsImhleGFnb25JZCIsIk1BWF9HUFVfRklMVEVSUyIsIk1BUF9USFVNQk5BSUxfRElNRU5TSU9OIiwiTUFQX0lORk9fQ0hBUkFDVEVSIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIkxPQURJTkdfTUVUSE9EUyIsInVwbG9hZCIsInN0b3JhZ2UiLCJEQVRBU0VUX0ZPUk1BVFMiLCJyb3ciLCJjc3YiLCJrZXBsZXJnbCIsImdvb2dsZV90cmFjayIsImdvb2dsZV9zZW1hbnRpYyIsIkFERFJFU1NfTEVWRUxfRElDVCIsIkVYUE9SVF9GSUxFX0xJU1QiLCJUSU1FX0xJU1QiLCJKQVBBTl9QUkVGX0RJQ1QiLCJKQVBBTl9QUkVGX0RJQ1RfQksiLCJHRU9NRVRSWV9SQU5HRSIsIk9VVFBVVF9DT0xfVFlQRVMiLCJERUZBVUxUX09VVFBVVF9DT0xfVFlQRVMiLCJEQVRBU0VUX0NPTFVNTlMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOztBQVdBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVPLElBQU1BLGFBQWEsR0FBRyxjQUF0Qjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcs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QkFBRCxFQUE4Qix5QkFBOUIsQ0FBRCxDQU5KO0FBT1IsWUFBTyxDQUFDLENBQUMsb0JBQUQsRUFBdUIsa0JBQXZCLENBQUQsQ0FQQztBQVFSLGdCQUFXLENBQUMsVUFBRCxDQVJIO0FBU1IsZ0JBQVcsQ0FBQyxlQUFEO0FBVEgsR0FEbUI7QUFZN0IsYUFBVTtBQUNSLGlCQUFZLENBQUMsVUFBRCxFQUFZLG1CQUFaLENBREo7QUFFUixnQkFBVyxDQUFDLFdBQUQsQ0FGSDtBQUdSLFdBQU0sQ0FBQyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQUQsQ0FIRTtBQUlSLDhCQUF5QixDQUFDLFVBQUQsRUFBYSxTQUFiLEVBQXdCLFVBQXhCO0FBSmpCLEdBWm1CO0FBa0I3QixZQUFTO0FBQ1AsaUJBQVksQ0FBQyw0QkFBRCxFQUErQix3Q0FBL0IsRUFBd0Usa0RBQXhFLEVBQTJILGdEQUEzSCxDQURMO0FBRVAsV0FBTSxDQUFDLENBQUMsMENBQUQsRUFBNkMsMkNBQTdDLENBQUQsRUFDSixDQUFDLHdDQUFELEVBQTJDLHlDQUEzQyxDQURJLENBRkM7QUFJUCxnQkFBVyxDQUFDLDBCQUFELENBSko7QUFLUCwyQkFBc0IsQ0FBQyw4QkFBRCxDQUxmO0FBTVAsVUFBSyxDQUFDLHVDQUFELEVBQXlDLHFDQUF6QyxDQU5FO0FBT1AsZUFBVSxDQUFDLHVDQUFELEVBQXlDLHFDQUF6QyxDQVBIO0FBUVAsZ0JBQVcsQ0FBQyxvQ0FBRCxFQUFzQyxrQ0FBdEMsQ0FSSjtBQVNQLGdCQUFXLENBQUMsQ0FBQywyQ0FBRCxFQUE2Qyx5Q0FBN0MsQ0FBRCxDQVRKO0FBVVAsWUFBTyxDQUFDLENBQUMsa0NBQUQsRUFBcUMsb0NBQXJDLENBQUQsQ0FWQTtBQVdQLGdCQUFXLENBQUMsZUFBRDtBQVhKO0FBbEJvQixDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAna2V5bWlycm9yJztcbmltcG9ydCB7RWRpdG9yTW9kZXN9IGZyb20gJ3JlYWN0LW1hcC1nbC1kcmF3JztcblxuaW1wb3J0IHtzY2FsZUxpbmVhciwgc2NhbGVMb2csIHNjYWxlT3JkaW5hbCwgc2NhbGVQb2ludCwgc2NhbGVRdWFudGlsZSwgc2NhbGVRdWFudGl6ZSwgc2NhbGVTcXJ0fSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQge1xuICBBcnJvd0Rvd24sXG4gIEFycm93VXAsXG4gIENhbmNlbCxcbiAgQ2xpcGJvYXJkLFxuICBDdXJzb3JDbGljayxcbiAgRmlsdGVyRnVubmVsLFxuICBMYXllcnMsXG4gIFBpbixcbiAgU2V0dGluZ3Ncbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IHtnZXRIVE1MTWFwTW9kZVRpbGVVcmx9IGZyb20gJ3V0aWxzL3V0aWxzJztcbmltcG9ydCB7VE9PTFRJUF9GT1JNQVRfVFlQRVN9IGZyb20gJy4vdG9vbHRpcCc7XG5pbXBvcnQge0xBWUVSX1RZUEVTfSBmcm9tICdsYXllcnMvdHlwZXMnO1xuaW1wb3J0IFRyYXNoIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbW9uL2ljb25zL3RyYXNoJztcbmltcG9ydCBSb2NrZXQgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24vaWNvbnMvcm9ja2V0JztcbmltcG9ydCBHb29nbGUgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMvZ29vZ2xlJztcblxuZXhwb3J0IGNvbnN0IEFDVElPTl9QUkVGSVggPSAnQEBrZXBsZXIuZ2wvJztcbmV4cG9ydCBjb25zdCBDTE9VREZST05UID0gJ2h0dHBzOi8vZDFhM2Y0c3BhenpycDQuY2xvdWRmcm9udC5uZXQva2VwbGVyLmdsJztcbmV4cG9ydCBjb25zdCBJQ09OX1BSRUZJWCA9IGAke0NMT1VERlJPTlR9L2dlb2R1ZGVgO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFQQk9YX0FQSV9VUkwgPSAnaHR0cHM6Ly9hcGkubWFwYm94LmNvbSc7XG5cbi8vIE1vZGFsIElkc1xuLyoqXG4gKiBNb2RhbCBpZDogZGF0YSB0YWJsZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREFUQV9UQUJMRV9JRCA9ICdkYXRhVGFibGUnO1xuLyoqXG4gKiBNb2RhbCBpZDogZGVsZXRlIGRhdGFzZXQgY29uZmlybSBkaWFsb2dcbiAqIEBjb25zdGFudFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IERFTEVURV9EQVRBX0lEID0gJ2RlbGV0ZURhdGEnO1xuLyoqXG4gKiBNb2RhbCBpZDogYWRkIGRhdGEgbW9kYWxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IEFERF9EQVRBX0lEID0gJ2FkZERhdGEnO1xuLyoqXG4gKiBNb2RhbCBpZDogZXhwb3J0IGltYWdlIG1vZGFsXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBFWFBPUlRfSU1BR0VfSUQgPSAnZXhwb3J0SW1hZ2UnO1xuLyoqXG4gKiBNb2RhbCBpZDogZXhwb3J0IGRhdGEgbW9kYWxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IEVYUE9SVF9EQVRBX0lEID0gJ2V4cG9ydERhdGEnO1xuLyoqXG4gKiBNb2RhbCBpZDogYWRkIGN1c3RvbSBtYXAgc3R5bGUgbW9kYWxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IEFERF9NQVBfU1RZTEVfSUQgPSAnYWRkTWFwU3R5bGUnO1xuLyoqXG4gKiBNb2RhbCBpZDogZXhwb3J0IG1hcCBtb2RhbFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgRVhQT1JUX01BUF9JRCA9ICdleHBvcnRNYXAnO1xuLyoqXG4gKiBNb2RhbCBpZDogc2F2ZSBtYXAgbW9kYWxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IFNBVkVfTUFQX0lEID0gJ3NhdmVNYXAnO1xuLyoqXG4gKiBNb2RhbCBpZDogY29uZmlybSB0byBvdmVyd3JpdGUgc2F2ZWQgbWFwXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBPVkVSV1JJVEVfTUFQX0lEID0gJ292ZXJ3cml0ZU1hcCc7XG4vKipcbiAqIE1vZGFsIGlkOiBzaGFyZSBtYXAgdXJsIG1vZGFsXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBTSEFSRV9NQVBfSUQgPSAnc2hhcmVNYXAnO1xuXG5leHBvcnQgY29uc3QgS0VQTEVSX0dMX05BTUUgPSAna2VwbGVyLmdsJztcblxuLy8gX19QQUNLQUdFX1ZFUlNJT05fXyBpcyBhdXRvbWF0aWNhbGx5IGluamVjdGVkIGJ5IEJhYmVsL1dlYnBhY2sgZHVyaW5nIHRoZSBidWlsZGluZyBwcm9jZXNzXG4vLyBTaW5jZSB3ZSBhcmUgaW5qZWN0aW5nIHRoaXMgZHVyaW5nIHRoZSBidWlsZCBwcm9jZXNzIHdpdGggYmFiZWxcbi8vIHdoaWxlIGRldmVsb3BpbmcgVkVSU0lPTiBpcyBub3QgZGVmaW5lZCwgd2UgY2FwdHVyZSB0aGUgZXhjZXB0aW9uIGFuZCByZXR1cm5cbi8vIGFuIGVtcHR5IHN0cmluZyB3aGljaCB3aWxsIGFsbG93IHVzIHRvIHJldHJpZXZlIHRoZSBsYXRlc3QgdW1kIHZlcnNpb25cbmV4cG9ydCBjb25zdCBLRVBMRVJfR0xfVkVSU0lPTiA9ICdfX1BBQ0tBR0VfVkVSU0lPTl9fJztcbmV4cG9ydCBjb25zdCBLRVBMRVJfR0xfV0VCU0lURSA9ICdodHRwOi8va2VwbGVyLmdsLyc7XG5cbmV4cG9ydCBjb25zdCBESU1FTlNJT05TID0ge1xuICBzaWRlUGFuZWw6IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIG1hcmdpbjoge3RvcDogMjAsIGxlZnQ6IDIwLCBib3R0b206IDMwLCByaWdodDogMjB9LFxuICAgIGhlYWRlckhlaWdodDogOTZcbiAgfSxcbiAgbWFwQ29udHJvbDoge1xuICAgIHdpZHRoOiAxODQsXG4gICAgcGFkZGluZzogMTJcbiAgfVxufTtcblxuLyoqXG4gKiBUaGVtZSBuYW1lIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBgS2VwbGVyR2xgIGBwcm9wLnRoZW1lYC5cbiAqIEF2YWlsYWJsZSB0aGVtZXMgYXJlIGBUSEVNRS5saWdodGAgYW5kIGBUSEVNRS5kYXJrYC4gRGVmYXVsdCB0aGVtZSBpcyBgVEhFTUUuZGFya2BcbiAqIEBjb25zdGFudFxuICogQHR5cGUge29iamVjdH1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogY29uc3QgTWFwID0gKCkgPT4gPEtlcGxlckdsIHRoZW1lPXtUSEVNRS5saWdodH0gaWQ9XCJtYXBcIi8+XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFRIRU1FID0ga2V5TWlycm9yKHtcbiAgbGlnaHQ6IG51bGwsXG4gIGRhcms6IG51bGwsXG4gIGJhc2U6IG51bGxcbn0pO1xuXG4vL2hlcmUgc2V0IHNpZGUgYmFyIHBhbmVsczpcbmV4cG9ydCBjb25zdCBTSURFQkFSX1BBTkVMUyA9IFtcbiAge1xuICAgIGlkOiAnbGF5ZXInLFxuICAgIGxhYmVsOiAnc2lkZWJhci5wYW5lbHMubGF5ZXInLFxuICAgIGljb25Db21wb25lbnQ6IExheWVycyxcbiAgICBvbkNsaWNrOiBudWxsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2ZpbHRlcicsXG4gICAgbGFiZWw6ICdzaWRlYmFyLnBhbmVscy5maWx0ZXInLFxuICAgIGljb25Db21wb25lbnQ6IEZpbHRlckZ1bm5lbCxcbiAgICBvbkNsaWNrOiBudWxsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2ludGVyYWN0aW9uJyxcbiAgICBsYWJlbDogJ3NpZGViYXIucGFuZWxzLmludGVyYWN0aW9uJyxcbiAgICBpY29uQ29tcG9uZW50OiBDdXJzb3JDbGljayxcbiAgICBvbkNsaWNrOiBudWxsXG4gIH0sXG4gIHtcbiAgICBpZDogJ21hcCcsXG4gICAgbGFiZWw6ICdzaWRlYmFyLnBhbmVscy5iYXNlbWFwJyxcbiAgICBpY29uQ29tcG9uZW50OiBTZXR0aW5ncyxcbiAgICBvbkNsaWNrOiBudWxsXG4gIH0sXG4gIC8vIHtcbiAgLy8gICBpZDoncHJvY2Vzc29yJyxcbiAgLy8gICBsYWJlbDonc2lkZWJhci5wYW5lbHMucHJvY2VzcycsXG4gIC8vICAgaWNvbkNvbXBvbmVudDpSb2NrZXQsXG4gIC8vICAgb25DbGljazogbnVsbFxuICAvL1xuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgaWQ6J2dtdHByb2Nlc3MnLFxuICAvLyAgIGxhYmVsOidzaWRlYmFyLnBhbmVscy5nbXRwcm9jZXNzJyxcbiAgLy8gICBpY29uQ29tcG9uZW50Okdvb2dsZSxcbiAgLy8gICBvbkNsaWNrOiBudWxsXG4gIC8vIH1cbl07XG5cbi8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmV4cG9ydCBjb25zdCBQQU5FTFMgPSBTSURFQkFSX1BBTkVMUztcblxuLy8gTUFQIFNUWUxFU1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MQVlFUl9HUk9VUFMgPSBbXG4gIHtcbiAgICBzbHVnOiAnbGFiZWwnLFxuICAgIGZpbHRlcjogKHtpZH0pID0+IGlkLm1hdGNoKC8oPz0obGFiZWx8cGxhY2UtfHBvaS0pKS8pLFxuICAgIGRlZmF1bHRWaXNpYmlsaXR5OiB0cnVlXG4gIH0sXG4gIHtcbiAgICBzbHVnOiAncm9hZCcsXG4gICAgZmlsdGVyOiAoe2lkfSkgPT4gaWQubWF0Y2goLyg/PShyb2FkfHJhaWx3YXl8dHVubmVsfHN0cmVldHxicmlkZ2UpKSg/IS4qbGFiZWwpLyksXG4gICAgZGVmYXVsdFZpc2liaWxpdHk6IHRydWVcbiAgfSxcbiAge1xuICAgIHNsdWc6ICdib3JkZXInLFxuICAgIGZpbHRlcjogKHtpZH0pID0+IGlkLm1hdGNoKC9ib3JkZXJ8Ym91bmRhcmllcy8pLFxuICAgIGRlZmF1bHRWaXNpYmlsaXR5OiBmYWxzZVxuICB9LFxuICB7XG4gICAgc2x1ZzogJ2J1aWxkaW5nJyxcbiAgICBmaWx0ZXI6ICh7aWR9KSA9PiBpZC5tYXRjaCgvYnVpbGRpbmcvKSxcbiAgICBkZWZhdWx0VmlzaWJpbGl0eTogdHJ1ZVxuICB9LFxuICB7XG4gICAgc2x1ZzogJ3dhdGVyJyxcbiAgICBmaWx0ZXI6ICh7aWR9KSA9PiBpZC5tYXRjaCgvKD89KHdhdGVyfHN0cmVhbXxmZXJyeSkpLyksXG4gICAgZGVmYXVsdFZpc2liaWxpdHk6IHRydWVcbiAgfSxcbiAge1xuICAgIHNsdWc6ICdsYW5kJyxcbiAgICBmaWx0ZXI6ICh7aWR9KSA9PiBpZC5tYXRjaCgvKD89KHBhcmtzfGxhbmRjb3ZlcnxpbmR1c3RyaWFsfHNhbmR8aGlsbHNoYWRlKSkvKSxcbiAgICBkZWZhdWx0VmlzaWJpbGl0eTogdHJ1ZVxuICB9LFxuICB7XG4gICAgc2x1ZzogJzNkIGJ1aWxkaW5nJyxcbiAgICBmaWx0ZXI6ICgpID0+IGZhbHNlLFxuICAgIGRlZmF1bHRWaXNpYmlsaXR5OiBmYWxzZVxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVBfU1RZTEVTID0gW1xuICB7XG4gICAgaWQ6ICdkYXJrJyxcbiAgICBsYWJlbDogJ0RhcmsnLFxuICAgIHVybDogJ21hcGJveDovL3N0eWxlcy91YmVyZGF0YS9jam9xYmJmNmw5azMwMnNsOTZ0eXZrYTA5JyxcbiAgICBpY29uOiBgJHtJQ09OX1BSRUZJWH0vVUJFUl9EQVJLX1YyLnBuZ2AsXG4gICAgbGF5ZXJHcm91cHM6IERFRkFVTFRfTEFZRVJfR1JPVVBTXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xpZ2h0JyxcbiAgICBsYWJlbDogJ0xpZ2h0JyxcbiAgICB1cmw6ICdtYXBib3g6Ly9zdHlsZXMvdWJlcmRhdGEvY2pvcWI5ajMzOWsxZjJzbDl0NWljNWJuNCcsXG4gICAgaWNvbjogYCR7SUNPTl9QUkVGSVh9L1VCRVJfTElHSFRfVjIucG5nYCxcbiAgICBsYXllckdyb3VwczogREVGQVVMVF9MQVlFUl9HUk9VUFNcbiAgfSxcbiAge1xuICAgIGlkOiAnbXV0ZWQnLFxuICAgIGxhYmVsOiAnTXV0ZWQgTGlnaHQnLFxuICAgIHVybDogJ21hcGJveDovL3N0eWxlcy91YmVyZGF0YS9jamZ5bDAza3AxdHVsMnNtZjV2MnRiZGQ0JyxcbiAgICBpY29uOiBgJHtJQ09OX1BSRUZJWH0vVUJFUl9NVVRFRF9MSUdIVC5wbmdgLFxuICAgIGxheWVyR3JvdXBzOiBERUZBVUxUX0xBWUVSX0dST1VQU1xuICB9LFxuICB7XG4gICAgaWQ6ICdtdXRlZF9uaWdodCcsXG4gICAgbGFiZWw6ICdNdXRlZCBOaWdodCcsXG4gICAgdXJsOiAnbWFwYm94Oi8vc3R5bGVzL3ViZXJkYXRhL2NqZnhobGlrbWFqMWIyc295emV2bnl3Z3MnLFxuICAgIGljb246IGAke0lDT05fUFJFRklYfS9VQkVSX01VVEVEX05JR0hULnBuZ2AsXG4gICAgbGF5ZXJHcm91cHM6IERFRkFVTFRfTEFZRVJfR1JPVVBTXG4gIH0sXG4gIHtcbiAgICBpZDogJ3NhdGVsbGl0ZScsXG4gICAgbGFiZWw6ICdTYXRlbGxpdGUnLFxuICAgIHVybDogYG1hcGJveDovL3N0eWxlcy9tYXBib3gvc2F0ZWxsaXRlLXY5YCxcbiAgICBpY29uOiBgJHtJQ09OX1BSRUZJWH0vVUJFUl9TQVRFTExJVEUucG5nYFxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgR0VPSlNPTl9GSUVMRFMgPSB7XG4gIGdlb2pzb246IFsnX2dlb2pzb24nLCAnYWxsX3BvaW50cycsICdnZW9qc29uJ11cbn07XG5cbmV4cG9ydCBjb25zdCBJQ09OX0ZJRUxEUyA9IHtcbiAgaWNvbjogWydpY29uJ11cbn07XG5cbmV4cG9ydCBjb25zdCBUUklQX1BPSU5UX0ZJRUxEUyA9IFtcbiAgWydsYXQnLCAnbG5nJ10sXG4gIFsnbGF0JywgJ2xvbiddLFxuICBbJ2xhdGl0dWRlJywgJ2xvbmdpdHVkZSddLFxuICBbJ2xhdGl0dWRlZTcnLCdsb25naXR1ZGVlNyddLFxuICBbJ2xhdGU3JywnbG5nZTcnXVxuXTtcblxuZXhwb3J0IGNvbnN0IFRSSVBfQVJDX0ZJRUxEUyA9IHtcbiAgbGF0MDogJ2JlZ2ludHJpcCcsXG4gIGxuZzA6ICdiZWdpbnRyaXAnLFxuICBsYXQxOiAnZHJvcG9mZicsXG4gIGxuZzE6ICdkcm9wb2ZmJ1xufTtcblxuXG5leHBvcnQgY29uc3QgRklMVEVSX1RZUEVTID0ga2V5TWlycm9yKHtcbiAgcmFuZ2U6IG51bGwsXG4gIHNlbGVjdDogbnVsbCxcbiAgaW5wdXQ6IG51bGwsXG4gIHRpbWVSYW5nZTogbnVsbCxcbiAgbXVsdGlTZWxlY3Q6IG51bGwsXG4gIHBvbHlnb246IG51bGwsXG4gIGRhdGVTZWxlY3Q6IG51bGxcbn0pO1xuXG5cbmV4cG9ydCBjb25zdCBTQ0FMRV9UWVBFUyA9IGtleU1pcnJvcih7XG4gIG9yZGluYWw6IG51bGwsXG4gIHF1YW50aWxlOiBudWxsLFxuICBxdWFudGl6ZTogbnVsbCxcbiAgbGluZWFyOiBudWxsLFxuICBzcXJ0OiBudWxsLFxuICBsb2c6IG51bGwsXG4gIC8vIG9yZGluYWwgZG9tYWluIHRvIGxpbmVhciByYW5nZVxuICBwb2ludDogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBTQ0FMRV9GVU5DID0ge1xuICBbU0NBTEVfVFlQRVMubGluZWFyXTogc2NhbGVMaW5lYXIsXG4gIFtTQ0FMRV9UWVBFUy5xdWFudGl6ZV06IHNjYWxlUXVhbnRpemUsXG4gIFtTQ0FMRV9UWVBFUy5xdWFudGlsZV06IHNjYWxlUXVhbnRpbGUsXG4gIFtTQ0FMRV9UWVBFUy5vcmRpbmFsXTogc2NhbGVPcmRpbmFsLFxuICBbU0NBTEVfVFlQRVMuc3FydF06IHNjYWxlU3FydCxcbiAgW1NDQUxFX1RZUEVTLmxvZ106IHNjYWxlTG9nLFxuICBbU0NBTEVfVFlQRVMucG9pbnRdOiBzY2FsZVBvaW50XG59O1xuXG5leHBvcnQgY29uc3QgQUxMX0ZJRUxEX1RZUEVTID0ga2V5TWlycm9yKHtcbiAgYm9vbGVhbjogbnVsbCxcbiAgZGF0ZTogbnVsbCxcbiAgZ2VvanNvbjogbnVsbCxcbiAgaW50ZWdlcjogbnVsbCxcbiAgcmVhbDogbnVsbCxcbiAgc3RyaW5nOiBudWxsLFxuICB0aW1lc3RhbXA6IG51bGwsXG4gIHBvaW50OiBudWxsLFxuICB0aW1lOm51bGwsXG4gIGRvdzpudWxsLFxufSk7XG5cbmV4cG9ydCBjb25zdCBQUk9DRVNTX0lURU1TID0ge1xuICAvL2FkZHJlc3MgcHJvY2Vzc29yOlxuICBBRERSRVNTX05PUk1BTElaQVRJT04gOiAnQWRkcmVzcyBub3JtYWxpemF0aW9uJyxcbiAgR09PR0xFX0FQSV9RVUVSWTogJ0dvb2dsZSBBUEkgUXVlcnkgd2l0aCBpZCcsXG4gIFJFVkVSU0VfR0VPQ09ESU5HOidSZXZlcnNlIEdlb2NvZGluZycsXG4gIEFERFJFU1NfSURFTlRJRklDQVRJT046J0FkZHJlc3MgaWRlbnRpZmljYXRpb24nLFxuICBHRU9DT0RJTkc6J0dlb0NvZGluZycsXG4gIFRZUEVfQ09OVkVSU0lPTjonQ2hhbmdlIEdvb2dsZSBQT0kgbmFtZSB0byB0eXBlJyxcblxuICAvL2Jhc2ljIGZ1bmN0aW9uczpcbiAgVEFCTEVfSk9JTjonSm9pbiB0d28gZGF0YXNldHMnLFxuICBUSU1FX09EX0pPSU46J0pvaW4gYW5vdGhlciBkYXRhc2V0cyB3aXRoIHRpbWVzcGFuJyxcblxuICBEQVRFX0ZJTFRFUklORzonRmlsdGVyaW5nIGRhdGUgd2l0aCBhIGNhbGVuZGFyJyxcbiAgVElNRV9GSUxURVJJTkc6J1NldHRpbmcgdGVtcG9yYWwgZmVuY2luZyB3aXRoaW4gb25lIGRheScsXG5cbiAgLy9nZW9tZXRyeSByZWxhdGVkIGZ1bmN0aW9uOlxuICBDRU5UUk9JRF9FWFRSQUNUSU9OOiAnRXh0cmFjdGluZyBjZW50cm9pZCBmcm9tIGdlb21ldHJ5JyxcbiAgTUVTSENPREVfR0VORVJBTElaQVRJT046J0dlbmVyYWxpemluZyBtZXNoY29kZScsXG4gIE1FU0hDT0RFX0FHR1JFR0FUSU9OOiAnQWdncmVnYXRpbmcgZGF0YSBieSBtZXNoY29kZScsXG4gIFNQQVRJQUxfRklUTEVSSU5HOidGaWx0ZXJpbmcgYnkgc3BhdGlhbCBpbmZvcm1hdGlvbicsXG4gIFNQQVRJQUxfTUFTS0lORzonU3BhdGlhbCBtYXNraW5nJyxcbiAgQ09QWV9HRU9KU09OOidDb3B5aW5nIEdlb2pzb24gdG8gY2xpcGJvYXJkJyxcbiAgTElORV9TSU1QTElGSUNBVElPTjonU2ltcGxpZnlpbmcgbGluZSBkYXRhJyxcbiAgV0tCX0dFTkVSQVRJT046J0dlbmVyYXRpbmcgd2tiIHJvdycsXG4gIE1FU0hDT0RFX0dFTkVSQVRJT046ICdHZW5lcmF0aW5nIG1lc2hjb2RlJyxcbiAgLy90ZW1wb3JhbCBjb2x1bW4gcmVsYXRlZCBmdW5jdGlvbjpcbiAgLy8gVEVNUE9SQUxcblxuICAvL2RpZmZlcmVuY2VzIGJldHdlZW4gdGltZSBmbG9vcmluZyBhbmQgdGltZSBpbmRleGluZ1xuICBUSU1FX0ZMT09SSU5HOidUaW1lIGZsb29yaW5nJyxcbiAgVElNRV9JTkRFWElORzonVGltZSBpbmRleGluZycsXG5cbiAgLy9mbG9hdCBwcm9jZXNzaW5nOlxuICBESUdJVF9TTElDSU5HOidzbGljaW5nIGRpZ2l0cydcbn1cblxuZXhwb3J0IGNvbnN0IFBST0NFU1NfTElTVCA9IHtcbiAgLy9wcm9jZXNzIHBhbmVsOlxuICBbQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb25dOltQUk9DRVNTX0lURU1TLkNFTlRST0lEX0VYVFJBQ1RJT04sUFJPQ0VTU19JVEVNUy5TUEFUSUFMX01BU0tJTkcsIFBST0NFU1NfSVRFTVMuTUVTSENPREVfQUdHUkVHQVRJT04sUFJPQ0VTU19JVEVNUy5DT1BZX0dFT0pTT04sUFJPQ0VTU19JVEVNUy5SRVZFUlNFX0dFT0NPRElORyxQUk9DRVNTX0lURU1TLkxJTkVfU0lNUExJRklDQVRJT04sUFJPQ0VTU19JVEVNUy5XS0JfR0VORVJBVElPTl0sXG4gIFtBTExfRklFTERfVFlQRVMuc3RyaW5nXTpbUFJPQ0VTU19JVEVNUy5BRERSRVNTX0lERU5USUZJQ0FUSU9OLFBST0NFU1NfSVRFTVMuR0VPQ09ESU5HLFBST0NFU1NfSVRFTVMuVFlQRV9DT05WRVJTSU9OLFBST0NFU1NfSVRFTVMuR09PR0xFX0FQSV9RVUVSWSxQUk9DRVNTX0lURU1TLlRBQkxFX0pPSU5dLFxuICBbQUxMX0ZJRUxEX1RZUEVTLmZsb2F0XTpbUFJPQ0VTU19JVEVNUy5ESUdJVF9TTElDSU5HXSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXTpbUFJPQ0VTU19JVEVNUy5UQUJMRV9KT0lOXSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lXTpbUFJPQ0VTU19JVEVNUy5USU1FX09EX0pPSU5dLFxuICBbQUxMX0ZJRUxEX1RZUEVTLmRhdGVdOltQUk9DRVNTX0lURU1TLkRBVEVfRklMVEVSSU5HXSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXBdOltQUk9DRVNTX0lURU1TLlRJTUVfT0RfSk9JTixQUk9DRVNTX0lURU1TLlRJTUVfSU5ERVhJTkcsUFJPQ0VTU19JVEVNUy5USU1FX0ZMT09SSU5HXSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5wb2ludF06W1BST0NFU1NfSVRFTVMuU1BBVElBTF9NQVNLSU5HLFBST0NFU1NfSVRFTVMuTUVTSENPREVfQUdHUkVHQVRJT04sUFJPQ0VTU19JVEVNUy5SRVZFUlNFX0dFT0NPRElORyxQUk9DRVNTX0lURU1TLk1FU0hDT0RFX0dFTkVSQVRJT05dXG59XG5cbi8vb25seSBsZWZ0IGpvaW4gd2lsbCBrZWVwIHRoZSBudW1iZXIgb2Ygcm93cztcbmV4cG9ydCBjb25zdCBKT0lOX01FVEhPRCA9IGtleU1pcnJvcih7XG4gIGxlZnQ6bnVsbCxcbiAgaW5uZXI6bnVsbCxcbiAgb3V0ZXI6bnVsbFxufSlcblxuZXhwb3J0IGNvbnN0IFNQQVRJQUxfSU5URVJBQ1RJT05fTUVUSE9EID0ga2V5TWlycm9yKHtcbiAgd2l0aGluOm51bGwsXG4gIGNvbnRhaW46bnVsbCxcbiAgaW50ZXJzZWN0Om51bGxcbn0pXG5cbi8vIERhdGEgVGFibGVcbmV4cG9ydCBjb25zdCBTT1JUX09SREVSID0ga2V5TWlycm9yKHtcbiAgQVNDRU5ESU5HOiBudWxsLFxuICBERVNDRU5ESU5HOiBudWxsLFxuICBVTlNPUlQ6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfT1BUSU9OID0ga2V5TWlycm9yKHtcbiAgU09SVF9BU0M6IG51bGwsXG4gIFNPUlRfREVTOiBudWxsLFxuICBVTlNPUlQ6IG51bGwsXG4gIFBJTjogbnVsbCxcbiAgVU5QSU46IG51bGwsXG4gIENPUFk6IG51bGwsXG4gIERFTEVURTpudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX09QVElPTl9MSVNUID0gW1xuICB7XG4gICAgdmFsdWU6IFRBQkxFX09QVElPTi5TT1JUX0FTQyxcbiAgICBkaXNwbGF5OiAnU29ydCBBc2NlbmRpbmcnLFxuICAgIGljb246IEFycm93VXAsXG4gICAgY29uZGl0aW9uOiBwcm9wcyA9PiBwcm9wcy5zb3J0TW9kZSAhPT0gU09SVF9PUkRFUi5BU0NFTkRJTkdcbiAgfSxcbiAge1xuICAgIHZhbHVlOiBUQUJMRV9PUFRJT04uU09SVF9ERVMsXG4gICAgZGlzcGxheTogJ1NvcnQgRGVzY2VuZGluZycsXG4gICAgaWNvbjogQXJyb3dEb3duLFxuICAgIGNvbmRpdGlvbjogcHJvcHMgPT4gcHJvcHMuc29ydE1vZGUgIT09IFNPUlRfT1JERVIuREVTQ0VORElOR1xuICB9LFxuICB7XG4gICAgdmFsdWU6IFRBQkxFX09QVElPTi5VTlNPUlQsXG4gICAgZGlzcGxheTogJ1Vuc29ydCBDb2x1bW4nLFxuICAgIGljb246IENhbmNlbCxcbiAgICBjb25kaXRpb246IHByb3BzID0+IHByb3BzLmlzU29ydGVkXG4gIH0sXG4gIHt2YWx1ZTogVEFCTEVfT1BUSU9OLlBJTiwgZGlzcGxheTogJ1BpbiBDb2x1bW4nLCBpY29uOiBQaW4sIGNvbmRpdGlvbjogcHJvcHMgPT4gIXByb3BzLmlzUGlubmVkfSxcbiAge1xuICAgIHZhbHVlOiBUQUJMRV9PUFRJT04uVU5QSU4sXG4gICAgZGlzcGxheTogJ1VucGluIENvbHVtbicsXG4gICAgaWNvbjogQ2FuY2VsLFxuICAgIGNvbmRpdGlvbjogcHJvcHMgPT4gcHJvcHMuaXNQaW5uZWRcbiAgfSxcbiAge3ZhbHVlOiBUQUJMRV9PUFRJT04uQ09QWSwgZGlzcGxheTogJ0NvcHkgQ29sdW1uJywgaWNvbjogQ2xpcGJvYXJkfSxcbiAge3ZhbHVlOiBUQUJMRV9PUFRJT04uREVMRVRFLCBkaXNwbGF5OiAnREVMRVRFIENvbHVtbicsIGljb246IFRyYXNofVxuXTtcblxuY29uc3QgT1JBTkdFID0gJzI0OCwgMTk0LCAyOCc7XG5jb25zdCBQSU5LID0gJzIzMSwgMTg5LCAxOTQnO1xuY29uc3QgUFVSUExFID0gJzE2MCwgMTA2LCAyMDYnO1xuY29uc3QgQkxVRSA9ICcxNDAsIDIxMCwgMjA1JztcbmNvbnN0IEJMVUUyID0gJzEwNiwgMTYwLCAyMDYnO1xuY29uc3QgQkxVRTMgPSAnMCwgMTcyLCAyMzcnO1xuY29uc3QgR1JFRU4gPSAnMTA2LCAxNjAsIDU2JztcbmNvbnN0IFJFRCA9ICcyMzcsIDg4LCAxMDYnO1xuXG5leHBvcnQgY29uc3QgRklMRURfVFlQRV9ESVNQTEFZID0ge1xuICBbQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW5dOiB7XG4gICAgbGFiZWw6ICdib29sJyxcbiAgICBjb2xvcjogUElOS1xuICB9LFxuICBbQUxMX0ZJRUxEX1RZUEVTLmRhdGVdOiB7XG4gICAgbGFiZWw6ICdkYXRlJyxcbiAgICBjb2xvcjogUFVSUExFXG4gIH0sXG4gIFtBTExfRklFTERfVFlQRVMuZ2VvanNvbl06IHtcbiAgICBsYWJlbDogJ2dlbycsXG4gICAgY29sb3I6IEJMVUUyXG4gIH0sXG4gIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06IHtcbiAgICBsYWJlbDogJ2ludCcsXG4gICAgY29sb3I6IE9SQU5HRVxuICB9LFxuICBbQUxMX0ZJRUxEX1RZUEVTLnJlYWxdOiB7XG4gICAgbGFiZWw6ICdmbG9hdCcsXG4gICAgY29sb3I6IE9SQU5HRVxuICB9LFxuICBbQUxMX0ZJRUxEX1RZUEVTLnN0cmluZ106IHtcbiAgICBsYWJlbDogJ3N0cmluZycsXG4gICAgY29sb3I6IEJMVUVcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXBdOiB7XG4gICAgbGFiZWw6ICd0aW1lJyxcbiAgICBjb2xvcjogR1JFRU5cbiAgfSxcbiAgLy8gZmllbGQgcGFpcnNcbiAgW0FMTF9GSUVMRF9UWVBFUy5wb2ludF06IHtcbiAgICBsYWJlbDogJ3BvaW50JyxcbiAgICBjb2xvcjogQkxVRTNcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEZJRUxEX0NPTE9SUyA9IHtcbiAgZGVmYXVsdDogUkVEXG59O1xuZXhwb3J0IGNvbnN0IEhJR0hMSUdIX0NPTE9SXzNEID0gWzI1NSwgMjU1LCAyNTUsIDYwXTtcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NDQUxFUyA9IGtleU1pcnJvcih7XG4gIGNvbG9yOiBudWxsLFxuICByYWRpdXM6IG51bGwsXG4gIHNpemU6IG51bGwsXG4gIGNvbG9yQWdncjogbnVsbCxcbiAgc2l6ZUFnZ3I6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgQUdHUkVHQVRJT05fVFlQRVMgPSB7XG4gIC8vIGRlZmF1bHRcbiAgY291bnQ6ICdjb3VudCcsXG4gIC8vIGxpbmVhclxuICBhdmVyYWdlOiAnYXZlcmFnZScsXG4gIG1heGltdW06ICdtYXhpbXVtJyxcbiAgbWluaW11bTogJ21pbmltdW0nLFxuICBtZWRpYW46ICdtZWRpYW4nLFxuICBzdGRldjogJ3N0ZGV2JyxcbiAgc3VtOiAnc3VtJyxcbiAgdmFyaWFuY2U6ICd2YXJpYW5jZScsXG4gIC8vIG9yZGluYWxcbiAgbW9kZTogJ21vZGUnLFxuICBjb3VudFVuaXF1ZTogJ2NvdW50IHVuaXF1ZSdcbn07XG5cbmV4cG9ydCBjb25zdCBsaW5lYXJGaWVsZFNjYWxlRnVuY3Rpb25zID0ge1xuICBbQ0hBTk5FTF9TQ0FMRVMuY29sb3JdOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXSxcbiAgW0NIQU5ORUxfU0NBTEVTLnJhZGl1c106IFtTQ0FMRV9UWVBFUy5zcXJ0XSxcbiAgW0NIQU5ORUxfU0NBTEVTLnNpemVdOiBbU0NBTEVfVFlQRVMubGluZWFyLCBTQ0FMRV9UWVBFUy5zcXJ0LCBTQ0FMRV9UWVBFUy5sb2ddXG59O1xuXG5leHBvcnQgY29uc3QgbGluZWFyRmllbGRBZ2dyU2NhbGVGdW5jdGlvbnMgPSB7XG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3JdOiB7XG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLmF2ZXJhZ2VdOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMubWF4aW11bV06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5taW5pbXVtXTogW1NDQUxFX1RZUEVTLnF1YW50aXplLCBTQ0FMRV9UWVBFUy5xdWFudGlsZV0sXG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLm1lZGlhbl06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5zdGRldl06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5zdW1dOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMudmFyaWFuY2VdOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXVxuICB9LFxuXG4gIFtDSEFOTkVMX1NDQUxFUy5zaXplQWdncl06IHtcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMuYXZlcmFnZV06IFtTQ0FMRV9UWVBFUy5saW5lYXIsIFNDQUxFX1RZUEVTLnNxcnQsIFNDQUxFX1RZUEVTLmxvZ10sXG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLm1heGltdW1dOiBbU0NBTEVfVFlQRVMubGluZWFyLCBTQ0FMRV9UWVBFUy5zcXJ0LCBTQ0FMRV9UWVBFUy5sb2ddLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5taW5pbXVtXTogW1NDQUxFX1RZUEVTLmxpbmVhciwgU0NBTEVfVFlQRVMuc3FydCwgU0NBTEVfVFlQRVMubG9nXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMubWVkaWFuXTogW1NDQUxFX1RZUEVTLmxpbmVhciwgU0NBTEVfVFlQRVMuc3FydCwgU0NBTEVfVFlQRVMubG9nXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMuc3RkZXZdOiBbU0NBTEVfVFlQRVMubGluZWFyLCBTQ0FMRV9UWVBFUy5zcXJ0LCBTQ0FMRV9UWVBFUy5sb2ddLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5zdW1dOiBbU0NBTEVfVFlQRVMubGluZWFyLCBTQ0FMRV9UWVBFUy5zcXJ0LCBTQ0FMRV9UWVBFUy5sb2ddLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy52YXJpYW5jZV06IFtTQ0FMRV9UWVBFUy5saW5lYXIsIFNDQUxFX1RZUEVTLnNxcnQsIFNDQUxFX1RZUEVTLmxvZ11cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG9yZGluYWxGaWVsZFNjYWxlRnVuY3Rpb25zID0ge1xuICBbQ0hBTk5FTF9TQ0FMRVMuY29sb3JdOiBbU0NBTEVfVFlQRVMub3JkaW5hbF0sXG4gIFtDSEFOTkVMX1NDQUxFUy5yYWRpdXNdOiBbU0NBTEVfVFlQRVMucG9pbnRdLFxuICBbQ0hBTk5FTF9TQ0FMRVMuc2l6ZV06IFtTQ0FMRV9UWVBFUy5wb2ludF1cbn07XG5cbmV4cG9ydCBjb25zdCBvcmRpbmFsRmllbGRBZ2dyU2NhbGVGdW5jdGlvbnMgPSB7XG4gIC8vIFtDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3JdOiBbU0NBTEVfVFlQRVMub3JkaW5hbCwgU0NBTEVfVFlQRVMubGluZWFyXSxcbiAgW0NIQU5ORUxfU0NBTEVTLmNvbG9yQWdncl06IHtcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMubW9kZV06IFtTQ0FMRV9UWVBFUy5vcmRpbmFsXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMuY291bnRVbmlxdWVdOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXVxuICB9LFxuXG4gIC8vIEN1cnJlbnRseSBkb2Vzbid0IHN1cHBvcnQgeWV0XG4gIFtDSEFOTkVMX1NDQUxFUy5zaXplQWdncl06IHt9XG59O1xuXG5leHBvcnQgY29uc3Qgbm90U3VwcG9ydGVkU2NhbGVPcHRzID0ge1xuICBbQ0hBTk5FTF9TQ0FMRVMuY29sb3JdOiBbXSxcbiAgW0NIQU5ORUxfU0NBTEVTLnJhZGl1c106IFtdLFxuICBbQ0hBTk5FTF9TQ0FMRVMuc2l6ZV06IFtdXG59O1xuXG5leHBvcnQgY29uc3Qgbm90U3VwcG9ydEFnZ3JPcHRzID0ge1xuICBbQ0hBTk5FTF9TQ0FMRVMuY29sb3JBZ2dyXToge30sXG4gIFtDSEFOTkVMX1NDQUxFUy5zaXplQWdncl06IHt9XG59O1xuXG4vKipcbiAqIERlZmF1bHQgYWdncmVnYXRpb24gYXJlIGJhc2VkIG9uIG9jdW50XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0FHR1JFR0FUSU9OID0ge1xuICBbQ0hBTk5FTF9TQ0FMRVMuY29sb3JBZ2dyXToge1xuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5jb3VudF06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdXG4gIH0sXG4gIFtDSEFOTkVMX1NDQUxFUy5zaXplQWdncl06IHtcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMuY291bnRdOiBbU0NBTEVfVFlQRVMubGluZWFyLCBTQ0FMRV9UWVBFUy5zcXJ0LCBTQ0FMRV9UWVBFUy5sb2ddXG4gIH1cbn07XG5cbi8qKlxuICogRGVmaW5lIHdoYXQgdHlwZSBvZiBzY2FsZSBvcGVyYXRpb24gaXMgYWxsb3dlZCBvbiBlYWNoIHR5cGUgb2YgZmllbGRzXG4gKi9cbmV4cG9ydCBjb25zdCBGSUVMRF9PUFRTID0ge1xuICBzdHJpbmc6IHtcbiAgICB0eXBlOiAnY2F0ZWdvcmljYWwnLFxuICAgIHNjYWxlOiB7XG4gICAgICAuLi5vcmRpbmFsRmllbGRTY2FsZUZ1bmN0aW9ucyxcbiAgICAgIC4uLm9yZGluYWxGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9uc1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gZCxcbiAgICAgIHRvb2x0aXA6IFtdXG4gICAgfVxuICB9LFxuICByZWFsOiB7XG4gICAgdHlwZTogJ251bWVyaWNhbCcsXG4gICAgc2NhbGU6IHtcbiAgICAgIC4uLmxpbmVhckZpZWxkU2NhbGVGdW5jdGlvbnMsXG4gICAgICAuLi5saW5lYXJGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9uc1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gZCxcbiAgICAgIHRvb2x0aXA6IFtcbiAgICAgICAgVE9PTFRJUF9GT1JNQVRfVFlQRVMuTk9ORSxcbiAgICAgICAgVE9PTFRJUF9GT1JNQVRfVFlQRVMuREVDSU1BTCxcbiAgICAgICAgVE9PTFRJUF9GT1JNQVRfVFlQRVMuUEVSQ0VOVEFHRVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgdGltZXN0YW1wOiB7XG4gICAgdHlwZTogJ3RpbWUnLFxuICAgIHNjYWxlOiB7XG4gICAgICAuLi5saW5lYXJGaWVsZFNjYWxlRnVuY3Rpb25zLFxuICAgICAgLi4ubm90U3VwcG9ydEFnZ3JPcHRzXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIGxlZ2VuZDogZCA9PiBkLFxuICAgICAgdG9vbHRpcDogW1xuICAgICAgICBUT09MVElQX0ZPUk1BVF9UWVBFUy5OT05FLFxuICAgICAgICBUT09MVElQX0ZPUk1BVF9UWVBFUy5EQVRFLFxuICAgICAgICBUT09MVElQX0ZPUk1BVF9UWVBFUy5EQVRFX1RJTUVcbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIGludGVnZXI6IHtcbiAgICB0eXBlOiAnbnVtZXJpY2FsJyxcbiAgICBzY2FsZToge1xuICAgICAgLi4ubGluZWFyRmllbGRTY2FsZUZ1bmN0aW9ucyxcbiAgICAgIC4uLmxpbmVhckZpZWxkQWdnclNjYWxlRnVuY3Rpb25zXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIGxlZ2VuZDogZCA9PiBkLFxuICAgICAgdG9vbHRpcDogW1xuICAgICAgICBUT09MVElQX0ZPUk1BVF9UWVBFUy5OT05FLFxuICAgICAgICBUT09MVElQX0ZPUk1BVF9UWVBFUy5ERUNJTUFMLFxuICAgICAgICBUT09MVElQX0ZPUk1BVF9UWVBFUy5QRVJDRU5UQUdFXG4gICAgICBdXG4gICAgfVxuICB9LFxuICBib29sZWFuOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIHNjYWxlOiB7XG4gICAgICAuLi5vcmRpbmFsRmllbGRTY2FsZUZ1bmN0aW9ucyxcbiAgICAgIC4uLm9yZGluYWxGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9uc1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gZCxcbiAgICAgIHRvb2x0aXA6IFtUT09MVElQX0ZPUk1BVF9UWVBFUy5OT05FLCBUT09MVElQX0ZPUk1BVF9UWVBFUy5CT09MRUFOXVxuICAgIH1cbiAgfSxcbiAgZGF0ZToge1xuICAgIHNjYWxlOiB7XG4gICAgICAuLi5vcmRpbmFsRmllbGRTY2FsZUZ1bmN0aW9ucyxcbiAgICAgIC4uLm9yZGluYWxGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9uc1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gZCxcbiAgICAgIHRvb2x0aXA6IFtUT09MVElQX0ZPUk1BVF9UWVBFUy5OT05FLCBUT09MVElQX0ZPUk1BVF9UWVBFUy5EQVRFXVxuICAgIH1cbiAgfSxcbiAgZ2VvanNvbjoge1xuICAgIHR5cGU6ICdnZW9tZXRyeScsXG4gICAgc2NhbGU6IHtcbiAgICAgIC4uLm5vdFN1cHBvcnRlZFNjYWxlT3B0cyxcbiAgICAgIC4uLm5vdFN1cHBvcnRBZ2dyT3B0c1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gJy4uLicsXG4gICAgICB0b29sdGlwOiBbXVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyA9IE9iamVjdC5rZXlzKENIQU5ORUxfU0NBTEVTKS5yZWR1Y2UoXG4gIChhY2N1LCBrZXkpID0+ICh7XG4gICAgLi4uYWNjdSxcbiAgICBba2V5XTogT2JqZWN0LmtleXMoRklFTERfT1BUUykuZmlsdGVyKGZ0ID0+IE9iamVjdC5rZXlzKEZJRUxEX09QVFNbZnRdLnNjYWxlW2tleV0pLmxlbmd0aClcbiAgfSksXG4gIHt9XG4pO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MQVlFUl9DT0xPUiA9IHtcbiAgdHJpcEFyYzogJyM5MjI2QzYnLFxuICBiZWdpbnRyaXBfbGF0OiAnIzFFOTZCRScsXG4gIGRyb3BvZmZfbGF0OiAnI0ZGOTkxRicsXG4gIHJlcXVlc3RfbGF0OiAnIzUyQTM1Mydcbn07XG5cbi8vIGxldCB1c2VyIHBhc3MgaW4gZGVmYXVsdCB0b29sdGlwIGZpZWxkc1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVE9PTFRJUF9GSUVMRFMgPSBbXTtcblxuZXhwb3J0IGNvbnN0IE5PX1ZBTFVFX0NPTE9SID0gWzAsIDAsIDAsIDBdO1xuXG5leHBvcnQgY29uc3QgTEFZRVJfQkxFTkRJTkdTID0ge1xuICBhZGRpdGl2ZToge1xuICAgIGxhYmVsOiAnbGF5ZXJCbGVuZGluZy5hZGRpdGl2ZScsXG4gICAgYmxlbmRGdW5jOiBbJ1NSQ19BTFBIQScsICdEU1RfQUxQSEEnXSxcbiAgICBibGVuZEVxdWF0aW9uOiAnRlVOQ19BREQnXG4gIH0sXG4gIG5vcm1hbDoge1xuICAgIC8vIHJlZmVyZW5jZSB0b1xuICAgIC8vIGh0dHBzOi8vbGltbnUuY29tL3dlYmdsLWJsZW5kaW5nLXlvdXJlLXByb2JhYmx5LXdyb25nL1xuICAgIGxhYmVsOiAnbGF5ZXJCbGVuZGluZy5ub3JtYWwnLFxuICAgIGJsZW5kRnVuYzogWydTUkNfQUxQSEEnLCAnT05FX01JTlVTX1NSQ19BTFBIQScsICdPTkUnLCAnT05FX01JTlVTX1NSQ19BTFBIQSddLFxuICAgIGJsZW5kRXF1YXRpb246IFsnRlVOQ19BREQnLCAnRlVOQ19BREQnXVxuICB9LFxuICBzdWJ0cmFjdGl2ZToge1xuICAgIGxhYmVsOiAnbGF5ZXJCbGVuZGluZy5zdWJ0cmFjdGl2ZScsXG4gICAgYmxlbmRGdW5jOiBbJ09ORScsICdPTkVfTUlOVVNfRFNUX0NPTE9SJywgJ1NSQ19BTFBIQScsICdEU1RfQUxQSEEnXSxcbiAgICBibGVuZEVxdWF0aW9uOiBbJ0ZVTkNfU1VCVFJBQ1QnLCAnRlVOQ19BREQnXVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgTUFYX0RFRkFVTFRfVE9PTFRJUFMgPSA1O1xuXG5leHBvcnQgY29uc3QgUkVTT0xVVElPTlMgPSBrZXlNaXJyb3Ioe1xuICBPTkVfWDogbnVsbCxcbiAgVFdPX1g6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgRVhQT1JUX0lNR19SQVRJT1MgPSBrZXlNaXJyb3Ioe1xuICBTQ1JFRU46IG51bGwsXG4gIEZPVVJfQllfVEhSRUU6IG51bGwsXG4gIFNJWFRFRU5fQllfTklORTogbnVsbCxcbiAgQ1VTVE9NOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IEVYUE9SVF9JTUdfUkFUSU9fT1BUSU9OUyA9IFtcbiAge1xuICAgIGlkOiBFWFBPUlRfSU1HX1JBVElPUy5TQ1JFRU4sXG4gICAgbGFiZWw6ICdtb2RhbC5leHBvcnRJbWFnZS5yYXRpb09yaWdpbmFsU2NyZWVuJyxcbiAgICBnZXRTaXplOiAoc2NyZWVuVywgc2NyZWVuSCkgPT4gKHt3aWR0aDogc2NyZWVuVywgaGVpZ2h0OiBzY3JlZW5IfSlcbiAgfSxcbiAge1xuICAgIGlkOiBFWFBPUlRfSU1HX1JBVElPUy5DVVNUT00sXG4gICAgaGlkZGVuOiB0cnVlLFxuICAgIGxhYmVsOiAnbW9kYWwuZXhwb3J0SW1hZ2UucmF0aW9DdXN0b20nLFxuICAgIGdldFNpemU6IChtYXBXLCBtYXBIKSA9PiAoe3dpZHRoOiBtYXBXLCBoZWlnaHQ6IG1hcEh9KVxuICB9LFxuICB7XG4gICAgaWQ6IEVYUE9SVF9JTUdfUkFUSU9TLkZPVVJfQllfVEhSRUUsXG4gICAgbGFiZWw6ICdtb2RhbC5leHBvcnRJbWFnZS5yYXRpbzRfMycsXG4gICAgZ2V0U2l6ZTogKHNjcmVlblcsIHNjcmVlbkgpID0+ICh7XG4gICAgICB3aWR0aDogc2NyZWVuVyxcbiAgICAgIGhlaWdodDogTWF0aC5yb3VuZChzY3JlZW5XICogMC43NSlcbiAgICB9KVxuICB9LFxuICB7XG4gICAgaWQ6IEVYUE9SVF9JTUdfUkFUSU9TLlNJWFRFRU5fQllfTklORSxcbiAgICBsYWJlbDogJ21vZGFsLmV4cG9ydEltYWdlLnJhdGlvMTZfOScsXG4gICAgZ2V0U2l6ZTogKHNjcmVlblcsIHNjcmVlbkgpID0+ICh7XG4gICAgICB3aWR0aDogc2NyZWVuVyxcbiAgICAgIGhlaWdodDogTWF0aC5yb3VuZChzY3JlZW5XICogMC41NjI1KVxuICAgIH0pXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBFWFBPUlRfSU1HX1JFU09MVVRJT05fT1BUSU9OUyA9IFtcbiAge1xuICAgIGlkOiBSRVNPTFVUSU9OUy5PTkVfWCxcbiAgICBsYWJlbDogJzF4JyxcbiAgICBhdmFpbGFibGU6IHRydWUsXG4gICAgc2NhbGU6IDEsXG4gICAgZ2V0U2l6ZTogKHNjcmVlblcsIHNjcmVlbkgpID0+ICh7XG4gICAgICB3aWR0aDogc2NyZWVuVyxcbiAgICAgIGhlaWdodDogc2NyZWVuSFxuICAgIH0pXG4gIH0sXG4gIHtcbiAgICBpZDogUkVTT0xVVElPTlMuVFdPX1gsXG4gICAgbGFiZWw6ICcyeCcsXG4gICAgYXZhaWxhYmxlOiB0cnVlLFxuICAgIHNjYWxlOiAyLFxuICAgIGdldFNpemU6IChzY3JlZW5XLCBzY3JlZW5IKSA9PiAoe1xuICAgICAgd2lkdGg6IHNjcmVlblcgKiAyLFxuICAgICAgaGVpZ2h0OiBzY3JlZW5IICogMlxuICAgIH0pXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBFWFBPUlRfREFUQV9UWVBFID0ga2V5TWlycm9yKHtcbiAgQ1NWOiBudWxsXG4gIC8vIFNIQVBFRklMRTogbnVsbCxcbiAgLy8gSlNPTjogbnVsbCxcbiAgLy8gR0VPSlNPTjogbnVsbCxcbiAgLy8gVE9QT0pTT046IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgRVhQT1JUX0RBVEFfVFlQRV9PUFRJT05TID0gW1xuICB7XG4gICAgaWQ6IEVYUE9SVF9EQVRBX1RZUEUuQ1NWLFxuICAgIGxhYmVsOiBFWFBPUlRfREFUQV9UWVBFLkNTVi50b0xvd2VyQ2FzZSgpLFxuICAgIGF2YWlsYWJsZTogdHJ1ZVxuICB9XG4gIC8vIHtcbiAgLy8gICBpZDogRVhQT1JUX0RBVEFfVFlQRS5TSEFQRUZJTEUsXG4gIC8vICAgbGFiZWw6ICdzaGFwZWZpbGUnLFxuICAvLyAgIGF2YWlsYWJsZTogZmFsc2VcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIGlkOiBFWFBPUlRfREFUQV9UWVBFLkpTT04sXG4gIC8vICAgbGFiZWw6ICdqc29uJyxcbiAgLy8gICBhdmFpbGFibGU6IGZhbHNlXG4gIC8vIH0sXG4gIC8vIHtcbiAgLy8gICBpZDogRVhQT1JUX0RBVEFfVFlQRS5HRU9KU09OLFxuICAvLyAgIGxhYmVsOiAnZ2VvanNvbicsXG4gIC8vICAgYXZhaWxhYmxlOiBmYWxzZVxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgaWQ6IEVYUE9SVF9EQVRBX1RZUEUuVE9QT0pTT04sXG4gIC8vICAgbGFiZWw6ICd0b3BvanNvbicsXG4gIC8vICAgYXZhaWxhYmxlOiBmYWxzZVxuICAvLyB9XG5dO1xuXG4vLyBFeHBvcnQgbWFwIHR5cGVzXG5leHBvcnQgY29uc3QgRVhQT1JUX01BUF9GT1JNQVRTID0ga2V5TWlycm9yKHtcbiAgSFRNTDogbnVsbCxcbiAgSlNPTjogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBFWFBPUlRfSFRNTF9NQVBfTU9ERVMgPSBrZXlNaXJyb3Ioe1xuICBSRUFEOiBudWxsLFxuICBFRElUOiBudWxsXG59KTtcblxuLy8gRXhwb3J0IG1hcCBvcHRpb25zXG5leHBvcnQgY29uc3QgRVhQT1JUX01BUF9GT1JNQVRfT1BUSU9OUyA9IE9iamVjdC5lbnRyaWVzKEVYUE9SVF9NQVBfRk9STUFUUykubWFwKGVudHJ5ID0+ICh7XG4gIGlkOiBlbnRyeVswXSxcbiAgbGFiZWw6IGVudHJ5WzFdLnRvTG93ZXJDYXNlKCksXG4gIGF2YWlsYWJsZTogdHJ1ZVxufSkpO1xuXG5leHBvcnQgY29uc3QgRVhQT1JUX0hUTUxfTUFQX01PREVfT1BUSU9OUyA9IE9iamVjdC5lbnRyaWVzKEVYUE9SVF9IVE1MX01BUF9NT0RFUykubWFwKGVudHJ5ID0+ICh7XG4gIGlkOiBlbnRyeVswXSxcbiAgbGFiZWw6IGBtb2RhbC5leHBvcnRNYXAuaHRtbC4ke2VudHJ5WzFdLnRvTG93ZXJDYXNlKCl9YCxcbiAgYXZhaWxhYmxlOiB0cnVlLFxuICB1cmw6IGdldEhUTUxNYXBNb2RlVGlsZVVybChlbnRyeVsxXSlcbn0pKTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVVVJRF9DT1VOVCA9IDY7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX05PVElGSUNBVElPTl9NRVNTQUdFID0gJ01FU1NBR0VfTk9UX1BST1ZJREVEJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTk9USUZJQ0FUSU9OX1RZUEVTID0ga2V5TWlycm9yKHtcbiAgaW5mbzogbnVsbCxcbiAgZXJyb3I6IG51bGwsXG4gIHdhcm5pbmc6IG51bGwsXG4gIHN1Y2Nlc3M6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9OT1RJRklDQVRJT05fVE9QSUNTID0ga2V5TWlycm9yKHtcbiAgZ2xvYmFsOiBudWxsLFxuICBmaWxlOiBudWxsXG59KTtcblxuLy8gTWluaW11bSB0aW1lIGJldHdlZW4gaWRlbnRpY2FsIG5vdGlmaWNhdGlvbnMgYWJvdXQgZGVjay5nbCBlcnJvcnNcbmV4cG9ydCBjb25zdCBUSFJPVFRMRV9OT1RJRklDQVRJT05fVElNRSA9IDI1MDA7XG5cbi8vIEFuaW1hdGlvblxuZXhwb3J0IGNvbnN0IEJBU0VfU1BFRUQgPSA2MDA7XG5leHBvcnQgY29uc3QgRlBTID0gNjA7XG5cbi8qKlxuICogNCBBbmltYXRpb24gV2luZG93IFR5cGVzXG4gKiAxLiBmcmVlXG4gKiAgfC0+ICB8LT5cbiAqIEN1cnJlbnQgdGltZSBpcyBhIGZpeGVkIHJhbmdlLCBhbmltYXRpb24gY29udHJvbGxlciBjYWxscyBuZXh0IGFuaW1hdGlvbiBmcmFtZXMgY29udGludW91c2x5IHRvIGFuaW1hdGlvbiBhIG1vdmluZyB3aW5kb3dcbiAqIFRoZSBpbmNyZW1lbnQgaWQgYmFzZWQgb24gZG9tYWluIC8gQkFTRV9TUEVFRCAqIFNQRUVEXG4gKlxuICogMi4gaW5jcmVtZW50YWxcbiAqIHwgICAgfC0+XG4gKiBTYW1lIGFzIGZyZWUsIGN1cnJlbnQgdGltZSBpcyBhIGdyb3dpbmcgcmFuZ2UsIG9ubHkgdGhlIG1heCB2YWx1ZSBvZiByYW5nZSBpbmNyZW1lbnQgZHVyaW5nIGFuaW1hdGlvbi5cbiAqIFRoZSBpbmNyZW1lbnQgaXMgYWxzbyBiYXNlZCBvbiBkb21haW4gLyBCQVNFX1NQRUVEICogU1BFRURcbiAqXG4gKiAzLiBwb2ludFxuICogbyAtPiBvXG4gKiBDdXJyZW50IHRpbWUgaXMgYSBwb2ludCwgYW5pbWF0aW9uIGNvbnRyb2xsZXIgY2FsbHMgbmV4dCBhbmltYXRpb24gZnJhbWUgY29udGludW91c2x5IHRvIGFuaW1hdGlvbiBhIG1vdmluZyBwb2ludFxuICogVGhlIGluY3JlbWVudCBpcyBiYXNlZCBvbiBkb21haW4gLyBCQVNFX1NQRUVEICogU1BFRURcbiAqXG4gKiA0LiBpbnRlcnZhbFxuICogbyB+PiBvXG4gKiBDdXJyZW50IHRpbWUgaXMgYSBwb2ludC4gQW4gYXJyYXkgb2Ygc29ydGVkIHRpbWUgc3RlcHMgbmVlZCB0byBiZSBwcm92aWRlZC5cbiAqIGFuaW1hdGlvbiBjb250cm9sbGVyIGNhbGxzIG5leHQgYW5pbWF0aW9uIGF0IGEgaW50ZXJ2YWwgd2hlbiB0aGUgcG9pbnQganVtcHMgdG8gdGhlIG5leHQgc3RlcFxuICovXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX1dJTkRPVyA9IGtleU1pcnJvcih7XG4gIGZyZWU6IG51bGwsXG4gIGluY3JlbWVudGFsOiBudWxsLFxuICBwb2ludDogbnVsbCxcbiAgaW50ZXJ2YWw6IG51bGxcbn0pO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElNRV9GT1JNQVQgPSAnTU0vREQvWVkgSEg6bW06c3NhJztcbmV4cG9ydCBjb25zdCBTUEVFRF9DT05UUk9MX1JBTkdFID0gWzAsIDEwXTtcbmV4cG9ydCBjb25zdCBTUEVFRF9DT05UUk9MX1NURVAgPSAwLjAwMTtcblxuLy8gR2VvY29kZXJcbmV4cG9ydCBjb25zdCBHRU9DT0RFUl9EQVRBU0VUX05BTUUgPSAnZ2VvY29kZXJfZGF0YXNldCc7XG5leHBvcnQgY29uc3QgR0VPQ09ERVJfTEFZRVJfSUQgPSAnZ2VvY29kZXJfbGF5ZXInO1xuZXhwb3J0IGNvbnN0IEdFT0NPREVSX0dFT19PRkZTRVQgPSAwLjA1O1xuZXhwb3J0IGNvbnN0IEdFT0NPREVSX0lDT05fQ09MT1IgPSBbMjU1LCAwLCAwXTtcbmV4cG9ydCBjb25zdCBHRU9DT0RFUl9JQ09OX1NJWkUgPSA4MDtcblxuLy8gV2UgY291bGQgdXNlIGRpcmVjdGx5IHJlYWN0LW1hcC1nbC1kcmF3IEVkaXRvck1vZGUgYnV0IHRoaXMgd291bGRcbi8vIGNyZWF0ZSBhIGRpcmVjdCBkZXBlbmRlbmN5IHdpdGggcmVhY3QtbWFwLWdsLWRyYXdcbi8vIENyZWF0ZWQgdGhpcyBtYXAgdG8gYmUgaW5kZXBlbmRlbnQgZnJvbSByZWFjdC1tYXAtZ2wtZHJhd1xuZXhwb3J0IGNvbnN0IEVESVRPUl9NT0RFUyA9IHtcbiAgUkVBRF9PTkxZOiBFZGl0b3JNb2Rlcy5SRUFEX09OTFksXG4gIERSQVdfUE9MWUdPTjogRWRpdG9yTW9kZXMuRFJBV19QT0xZR09OLFxuICBEUkFXX1JFQ1RBTkdMRTogRWRpdG9yTW9kZXMuRFJBV19SRUNUQU5HTEUsXG4gIEVESVQ6IEVkaXRvck1vZGVzLkVESVRfVkVSVEVYXG59O1xuXG5leHBvcnQgY29uc3QgRURJVE9SX0FWQUlMQUJMRV9MQVlFUlMgPSBbXG4gIExBWUVSX1RZUEVTLnBvaW50LFxuICBMQVlFUl9UWVBFUy5oZXhhZ29uLFxuICBMQVlFUl9UWVBFUy5hcmMsXG4gIExBWUVSX1RZUEVTLmxpbmUsXG4gIExBWUVSX1RZUEVTLmhleGFnb25JZFxuXTtcbi8vIEdQVSBGaWx0ZXJpbmdcbi8qKlxuICogTWF4IG51bWJlciBvZiBmaWx0ZXIgdmFsdWUgYnVmZmVycyB0aGF0IGRlY2suZ2wgcHJvdmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9HUFVfRklMVEVSUyA9IDQ7XG5leHBvcnQgY29uc3QgTUFQX1RIVU1CTkFJTF9ESU1FTlNJT04gPSB7XG4gIHdpZHRoOiAzMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgY29uc3QgTUFQX0lORk9fQ0hBUkFDVEVSID0ge1xuICB0aXRsZTogMTAwLFxuICBkZXNjcmlwdGlvbjogMTAwXG59O1xuXG4vLyBMb2FkIGRhdGFcbmV4cG9ydCBjb25zdCBMT0FESU5HX01FVEhPRFMgPSBrZXlNaXJyb3Ioe1xuICB1cGxvYWQ6IG51bGwsXG4gIHN0b3JhZ2U6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgREFUQVNFVF9GT1JNQVRTID0ga2V5TWlycm9yKHtcbiAgcm93OiBudWxsLFxuICBnZW9qc29uOiBudWxsLFxuICBjc3Y6IG51bGwsXG4gIGtlcGxlcmdsOiBudWxsLFxuICBnb29nbGVfdHJhY2s6bnVsbCxcbiAgZ29vZ2xlX3NlbWFudGljOm51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgQUREUkVTU19MRVZFTF9ESUNUID0geyfpmo7mlbAnOiAnZmxvb3InLFxuICAn5bu654mp5ZCNJzogJ3ByZW1pc2UnLFxuICAn6KGX5Yy6JzogJ3N1YmxvY2FsaXR5X2xldmVsXzQnLFxuICAn5bCP5a2X44O75LiB55uuJzogJ3N1YmxvY2FsaXR5X2xldmVsXzMnLFxuICAn5aSn5a2X44O755S6JzogJ3N1YmxvY2FsaXR5X2xldmVsXzInLFxuICAn5pS/5Luk5oyH5a6a6YO95biC44Gu5Yy6JzogJ3N1YmxvY2FsaXR5X2xldmVsXzEnLFxuICAn5biC5Yy655S65p2R77yI5p2x5Lqs6YO95Yy66YOo77yJJzogJ2xvY2FsaXR5JyxcbiAgJ+mDoSc6ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzInLFxuICAn6YO96YGT5bqc55yMJzogJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScsXG4gICflm70nOiAnY291bnRyeScsXG4gICfpg7Xkvr/nlarlj7cnOiAncG9zdGFsX2NvZGUnfVxuXG5cbmV4cG9ydCBjb25zdCBFWFBPUlRfRklMRV9MSVNUID0ge1xuICAnYWN0aXZpdHkgaW5mb3JtYXRpb24nOlsnYWN0aXZpdHkgaW5mb3JtYXRpb24nXSxcbiAgLy9ncHMgZGF0YSBtYXRjaGVkOiB3aWxsIG1hdGNoIHRoZSBtb2JpbGl0eSBpbmZvcm1hdGlvbiB0byB0aGUgZ3BzIGRhdGE7XG4gICdHTVQgcmF3IGdwcyBkYXRhJzpbJ21hdGNoZWQgR1BTIGRhdGEnLCdHTVQgcmF3IEdQUyBkYXRhJ10sXG4gICd2aXNpdGVkIHBsYWNlIGluZm9ybWF0aW9uJzpbJ3Zpc2l0ZWQgcGxhY2UgaW5mb3JtYXRpb24nXVxufVxuXG5leHBvcnQgY29uc3QgVElNRV9MSVNUID0gWycwMDowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwMTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwMjowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwMzowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwNDowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwNTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwNjowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwNzowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwODowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcwOTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxMDowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxMTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxMjowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxMzowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxNDowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxNTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxNjowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxNzowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxODowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcxOTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcyMDowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcyMTowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcyMjowMDowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcyMzowMDowMCddXG5cblxuXG5leHBvcnQgY29uc3QgSkFQQU5fUFJFRl9ESUNUID0gW3sndmFsdWUnOiAnMDAwJyxcbiAgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5YyX5rW36YGTJyxcbiAgJ2NoaWxkcmVuJzogW3sndmFsdWUnOiAxLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfljJfmtbfpgZMnfV19LFxuICB7J3ZhbHVlJzogJzAwMScsXG4gICAgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5p2x5YyXJyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDcsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+emj+WztuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDUsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+eni+eUsOecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDIsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+mdkuajruecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDYsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WxseW9ouecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDQsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WuruWfjuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDMsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WyqeaJi+ecjCd9XX0sXG4gIHsndmFsdWUnOiAnMDAyJyxcbiAgICAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfplqLmnbEnLFxuICAgICdjaGlsZHJlbic6IFt7J3ZhbHVlJzogMTMsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+adseS6rOmDvSd9LFxuICAgICAgeyd2YWx1ZSc6IDExLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfln7znjonnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAxMCwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn576k6aas55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMTQsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+elnuWliOW3neecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDgsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+iMqOWfjuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDEyLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfljYPokYnnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA5LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfmoIPmnKjnnIwnfV19LFxuICB7J3ZhbHVlJzogJzAwMycsXG4gICAgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5Lit6YOoJyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDIyLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfpnZnlsqHnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyMCwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn6ZW36YeO55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMjEsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WykOmYnOecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE2LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICflr4zlsbHnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAxOSwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5bGx5qKo55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMTgsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+emj+S6leecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE1LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfmlrDmvZ/nnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyMywgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5oSb55+l55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMTcsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+efs+W3neecjCd9XX0sXG4gIHsndmFsdWUnOiAnMDA0JyxcbiAgICAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfov5Hnlb8nLFxuICAgICdjaGlsZHJlbic6IFt7J3ZhbHVlJzogMzAsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WSjOatjOWxseecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDI2LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfkuqzpg73lupwnfSxcbiAgICAgIHsndmFsdWUnOiAyNCwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5LiJ6YeN55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMjUsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+a7i+izgOecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDI3LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICflpKfpmKrlupwnfSxcbiAgICAgIHsndmFsdWUnOiAyOCwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5YW15bqr55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMjksICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WliOiJr+ecjCd9XX0sXG4gIHsndmFsdWUnOiAnMDA1JyxcbiAgICAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfkuK3lm70nLFxuICAgICdjaGlsZHJlbic6IFt7J3ZhbHVlJzogMzEsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+mzpeWPluecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDM1LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICflsbHlj6PnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAzMiwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5bO25qC555yMJ30sXG4gICAgICB7J3ZhbHVlJzogMzMsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+WyoeWxseecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDM0LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfluoPls7bnnIwnfV19LFxuICB7J3ZhbHVlJzogJzAwNicsXG4gICAgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5Zub5Zu9JyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDM3LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfpppnlt53nnIwnfSxcbiAgICAgIHsndmFsdWUnOiAzOCwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5oSb5aqb55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMzYsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+W+s+WztuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDM5LCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfpq5jnn6XnnIwnfV19LFxuICB7J3ZhbHVlJzogJzAwNycsXG4gICAgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5Lmd5bee44O75rKW57iEJyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDQwLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfnpo/lsqHnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NCwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5aSn5YiG55yMJ30sXG4gICAgICB7J3ZhbHVlJzogNDIsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+mVt+W0juecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDQzLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfnhormnKznnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NSwgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5a6u5bSO55yMJ30sXG4gICAgICB7J3ZhbHVlJzogNDYsICdjaGVja2VkJzogdHJ1ZSwgJ2xhYmVsJzogJ+m5v+WFkOWztuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDQxLCAnY2hlY2tlZCc6IHRydWUsICdsYWJlbCc6ICfkvZDos4DnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NywgJ2NoZWNrZWQnOiB0cnVlLCAnbGFiZWwnOiAn5rKW57iE55yMJ31dfV07XG5cblxuXG5leHBvcnQgY29uc3QgSkFQQU5fUFJFRl9ESUNUX0JLID0gW3sndmFsdWUnOiAnMDAwJyxcbiAgICdsYWJlbCc6ICfljJfmtbfpgZMnLFxuICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDEsICAnbGFiZWwnOiAn5YyX5rW36YGTJ31dfSxcbiAgeyd2YWx1ZSc6ICcwMDEnLFxuICAgICAnbGFiZWwnOiAn5p2x5YyXJyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDcsICAnbGFiZWwnOiAn56aP5bO255yMJ30sXG4gICAgICB7J3ZhbHVlJzogNSwgICdsYWJlbCc6ICfnp4vnlLDnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyLCAgJ2xhYmVsJzogJ+mdkuajruecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDYsICAnbGFiZWwnOiAn5bGx5b2i55yMJ30sXG4gICAgICB7J3ZhbHVlJzogNCwgICdsYWJlbCc6ICflrq7ln47nnIwnfSxcbiAgICAgIHsndmFsdWUnOiAzLCAgJ2xhYmVsJzogJ+WyqeaJi+ecjCd9XX0sXG4gIHsndmFsdWUnOiAnMDAyJyxcbiAgICAgJ2xhYmVsJzogJ+mWouadsScsXG4gICAgJ2NoaWxkcmVuJzogW3sndmFsdWUnOiAxMywgICdsYWJlbCc6ICfmnbHkuqzpg70nfSxcbiAgICAgIHsndmFsdWUnOiAxMSwgICdsYWJlbCc6ICfln7znjonnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAxMCwgICdsYWJlbCc6ICfnvqTppqznnIwnfSxcbiAgICAgIHsndmFsdWUnOiAxNCwgICdsYWJlbCc6ICfnpZ7lpYjlt53nnIwnfSxcbiAgICAgIHsndmFsdWUnOiA4LCAgJ2xhYmVsJzogJ+iMqOWfjuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDEyLCAgJ2xhYmVsJzogJ+WNg+iRieecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDksICAnbGFiZWwnOiAn5qCD5pyo55yMJ31dfSxcbiAgeyd2YWx1ZSc6ICcwMDMnLFxuICAgICAnbGFiZWwnOiAn5Lit6YOoJyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDIyLCAgJ2xhYmVsJzogJ+mdmeWyoeecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDIwLCAgJ2xhYmVsJzogJ+mVt+mHjuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDIxLCAgJ2xhYmVsJzogJ+WykOmYnOecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE2LCAgJ2xhYmVsJzogJ+WvjOWxseecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE5LCAgJ2xhYmVsJzogJ+WxseaiqOecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE4LCAgJ2xhYmVsJzogJ+emj+S6leecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE1LCAgJ2xhYmVsJzogJ+aWsOa9n+ecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDIzLCAgJ2xhYmVsJzogJ+aEm+efpeecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDE3LCAgJ2xhYmVsJzogJ+efs+W3neecjCd9XX0sXG4gIHsndmFsdWUnOiAnMDA0JyxcbiAgICAgJ2xhYmVsJzogJ+i/keeVvycsXG4gICAgJ2NoaWxkcmVuJzogW3sndmFsdWUnOiAzMCwgICdsYWJlbCc6ICflkozmrYzlsbHnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyNiwgICdsYWJlbCc6ICfkuqzpg73lupwnfSxcbiAgICAgIHsndmFsdWUnOiAyNCwgICdsYWJlbCc6ICfkuInph43nnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyNSwgICdsYWJlbCc6ICfmu4vos4DnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyNywgICdsYWJlbCc6ICflpKfpmKrlupwnfSxcbiAgICAgIHsndmFsdWUnOiAyOCwgICdsYWJlbCc6ICflhbXluqvnnIwnfSxcbiAgICAgIHsndmFsdWUnOiAyOSwgICdsYWJlbCc6ICflpYjoia/nnIwnfV19LFxuICB7J3ZhbHVlJzogJzAwNScsXG4gICAgICdsYWJlbCc6ICfkuK3lm70nLFxuICAgICdjaGlsZHJlbic6IFt7J3ZhbHVlJzogMzEsICAnbGFiZWwnOiAn6bOl5Y+W55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMzUsICAnbGFiZWwnOiAn5bGx5Y+j55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMzIsICAnbGFiZWwnOiAn5bO25qC555yMJ30sXG4gICAgICB7J3ZhbHVlJzogMzMsICAnbGFiZWwnOiAn5bKh5bGx55yMJ30sXG4gICAgICB7J3ZhbHVlJzogMzQsICAnbGFiZWwnOiAn5bqD5bO255yMJ31dfSxcbiAgeyd2YWx1ZSc6ICcwMDYnLFxuICAgICAnbGFiZWwnOiAn5Zub5Zu9JyxcbiAgICAnY2hpbGRyZW4nOiBbeyd2YWx1ZSc6IDM3LCAgJ2xhYmVsJzogJ+mmmeW3neecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDM4LCAgJ2xhYmVsJzogJ+aEm+Wqm+ecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDM2LCAgJ2xhYmVsJzogJ+W+s+WztuecjCd9LFxuICAgICAgeyd2YWx1ZSc6IDM5LCAgJ2xhYmVsJzogJ+mrmOefpeecjCd9XX0sXG4gIHsndmFsdWUnOiAnMDA3JyxcbiAgICAgJ2xhYmVsJzogJ+S5neW3nuODu+aylue4hCcsXG4gICAgJ2NoaWxkcmVuJzogW3sndmFsdWUnOiA0MCwgICdsYWJlbCc6ICfnpo/lsqHnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NCwgICdsYWJlbCc6ICflpKfliIbnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0MiwgICdsYWJlbCc6ICfplbfltI7nnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0MywgICdsYWJlbCc6ICfnhormnKznnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NSwgICdsYWJlbCc6ICflrq7ltI7nnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NiwgICdsYWJlbCc6ICfpub/lhZDls7bnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0MSwgICdsYWJlbCc6ICfkvZDos4DnnIwnfSxcbiAgICAgIHsndmFsdWUnOiA0NywgICdsYWJlbCc6ICfmspbnuITnnIwnfV19XTtcblxuXG5leHBvcnQgY29uc3QgR0VPTUVUUllfUkFOR0UgPSB7XG4gICfplqLmnbHluoPln58nOntcImlkXCI6XCIwXCIsXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiZG93XCI6bnVsbCxcImVuZF9kYXRlXCI6XCJcIixcImVuZF90aW1lXCI6XCJcIixcImZpbHRlcmluZ19uYW1lXCI6XCJKUuWun+iovOWun+mok1wiLFwic3RhcnRfZGF0ZVwiOlwiXCIsXCJzdGFydF90aW1lXCI6XCJcIn0sXCJnZW9tZXRyeVwiOntcInR5cGVcIjpcIlBvbHlnb25cIixcImNvb3JkaW5hdGVzXCI6W1tbMTM4LjkxNTA5NzQyMjM1OTEsMzYuMzYyNDA2OTA3NTcwMzldLFsxNDAuNzAwNDQyMTcxMTk0NiwzNi4zNTA5MjI3NzE3MTA5OF0sWzE0MC42OTE1NzI1OTgxOTEzLDM1LjE2ODczMDYyOTQ3NjRdLFsxMzguOTA3Mzc2MTkwODM5NjcsMzUuMTY3NjcxNDMwMDgzNTddLFsxMzguOTE1MDk3NDIyMzU5MSwzNi4zNjI0MDY5MDc1NzAzOV1dXX19LFxuICAn6L+R55W/5bqD5Z+fJzp7XG4gICAgICAgIFwiaWRcIjogXCIwXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICBcImRvd1wiOiBudWxsLFxuICAgICAgICAgIFwiZW5kX2RhdGVcIjogXCJcIixcbiAgICAgICAgICBcImVuZF90aW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJmaWx0ZXJpbmdfbmFtZVwiOiBcIui/keeVv+W6g+Wfn1wiLFxuICAgICAgICAgIFwic3RhcnRfZGF0ZVwiOiBcIlwiLFxuICAgICAgICAgIFwic3RhcnRfdGltZVwiOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIDEzNC41MTY2MDE1NjI1MDAwMyxcbiAgICAgICAgICAgICAgICAzNS4zMTczNjYzMjkyMzc4OFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTM0LjUyNzU4Nzg5MDYyNSxcbiAgICAgICAgICAgICAgICAzNC4xNzA5MDgzNjM1MjU3M1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTM2LjE4NjUyMzQzNzUwMDAzLFxuICAgICAgICAgICAgICAgIDM0LjE0ODE4MTAyMjU0NDM1XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAxMzYuMTgxMDMwMjczNDM3NTYsXG4gICAgICAgICAgICAgICAgMzQuNzAwOTc3NDE0NzIwMTFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIDEzNi4xOTc1MDk3NjU2MjUwNixcbiAgICAgICAgICAgICAgICAzNS4zMjYzMzAyNjMwNzQ4MVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTM0LjUxNjYwMTU2MjUwMDAzLFxuICAgICAgICAgICAgICAgIDM1LjMxNzM2NjMyOTIzNzg4XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICBdXG4gICAgICAgIH19LFxuICAn6aaW6YO95ZyPJzp7XG4gICAgICAgIFwiaWRcIjogXCIwXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICBcImRvd1wiOiBudWxsLFxuICAgICAgICAgIFwiZW5kX2RhdGVcIjogXCJcIixcbiAgICAgICAgICBcImVuZF90aW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJmaWx0ZXJpbmdfbmFtZVwiOiBcIummlumDveWcj1wiLFxuICAgICAgICAgIFwic3RhcnRfZGF0ZVwiOiBcIlwiLFxuICAgICAgICAgIFwic3RhcnRfdGltZVwiOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIDEzOS4wNjQ5NDE0MDYyNSxcbiAgICAgICAgICAgICAgICAzNi4xMjQ1NjQ3NDgxMzMzXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAxMzkuMDY3Njg3OTg4MjgxMjUsXG4gICAgICAgICAgICAgICAgMzUuMjM4ODg5NTMyMzIyNTk1XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAxNDAuMjIzOTk5MDIzNDM3NSxcbiAgICAgICAgICAgICAgICAzNS4yMzY2NDYyMjA5MzE5NVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTQwLjIyMTI1MjQ0MTQwNjI1LFxuICAgICAgICAgICAgICAgIDM2LjEyOTAwMTY1NTY5NjUyXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAxMzkuMDY0OTQxNDA2MjUsXG4gICAgICAgICAgICAgICAgMzYuMTI0NTY0NzQ4MTMzM1xuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdXG4gICAgICAgICAgXVxuICAgICAgICB9fSxcbiAgJ+adsea1t+W6g+Wfnyc6IHtcbiAgICAgICAgXCJpZFwiOiBcIjBcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgIFwiZG93XCI6IG51bGwsXG4gICAgICAgICAgXCJlbmRfZGF0ZVwiOiBcIlwiLFxuICAgICAgICAgIFwiZW5kX3RpbWVcIjogXCJcIixcbiAgICAgICAgICBcImZpbHRlcmluZ19uYW1lXCI6IFwi5p2x5rW35bqD5Z+fXCIsXG4gICAgICAgICAgXCJzdGFydF9kYXRlXCI6IFwiXCIsXG4gICAgICAgICAgXCJzdGFydF90aW1lXCI6IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTM2LjIyMzQ0NzAzMTczNDE0LFxuICAgICAgICAgICAgICAgIDM1LjYyOTEwNzMzNzE3MDcxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAxMzYuMjE1NzI1ODAwMjE0NyxcbiAgICAgICAgICAgICAgICAzNC40MjMzNzQ1OTIzMjc2NTRcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIDEzNy45OTk5MjIyMDc1NjYzMyxcbiAgICAgICAgICAgICAgICAzNC40MjQ0NDMzOTY4MTM0NjZcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIDEzNy4zNTEwNzQyMTg3NSxcbiAgICAgICAgICAgICAgICAzNS42MTcxMTY0ODM4MjE4NVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTM2LjIyMzQ0NzAzMTczNDE0LFxuICAgICAgICAgICAgICAgIDM1LjYyOTEwNzMzNzE3MDcxXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgT1VUUFVUX0NPTF9UWVBFUyA9IFsnZGF0ZScsXG4gICdhZGRyZXNzJyxcbiAgJ2dwcyBzdXBwbGVtZW50YXJ5IGluZm8nLFxuICAnZGF0ZXRpbWUnLFxuICAncHJlY2lzaW9uJyxcbiAgJ2dlb21ldHJ5JyxcbiAgJ2dwcycsXG4gICdjYW5kaWRhdGUgUE9JIElEJyxcbiAgJ2Rpc3RhbmNlJyxcbiAgJ3BvaSB0eXBlJyxcbiAgJ2lkJyxcbiAgJ3RyYW5zcG9yYXRpb24gbW9kZSddXG5cblxuLy9iZXR0ZXIgdG8gbWFrZSB0aGUgcmVzdWx0IGRpZmZpY3VsdCB0byBiZSByZXZlcnNlZCBxdWVyaWVkXG5leHBvcnQgY29uc3QgREVGQVVMVF9PVVRQVVRfQ09MX1RZUEVTID0gW1xuICAnZGF0ZXRpbWUnLFxuICAnZ3BzJyxcbiAgJ2FkZHJlc3MnLFxuICAndHJhbnNwb3J0YXRpb24gbW9kZScsXG4gICdwb2kgdHlwZSdcbl1cblxuZXhwb3J0IGNvbnN0IERBVEFTRVRfQ09MVU1OUyA9IHtcbiAgJ3BvaWRhdGEnOntcbiAgICAncHJlY2lzaW9uJzpbJ3BsYWNlQ29uZmlkZW5jZScsICd2aXNpdENvbmZpZGVuY2UnLCdlZGl0Q29uZmlybWF0aW9uU3RhdHVzJywnbG9jYXRpb25fbG9jYXRpb25Db25maWRlbmNlJywnbG9jYXRpb25fc291cmNlSW5mbyddLFxuICAgICdncHMnOltbJ2xvY2F0aW9uX2xhdGl0dWRlRTcnLCAnbG9jYXRpb25fbG9uZ2l0dWRlRTcnXV0sXG4gICAgJ2NhbmRpZGF0ZSBQT0kgSUQnOlsnb3RoZXJDYW5kaWRhdGVMb2NhdGlvbnMnXSxcbiAgICAnaWQnOlsnbG9jYXRpb25fcGxhY2VJZCddLFxuICAgICdhZGRyZXNzJzpbJ2xvY2F0aW9uX2FkZHJlc3MnXSxcbiAgICAnZGF0ZXRpbWUnOiBbWydkdXJhdGlvbl9zdGFydFRpbWVzdGFtcE1zJywgJ2R1cmF0aW9uX2VuZFRpbWVzdGFtcE1zJ11dLFxuICAgICdkYXRlJzpbWydkdXJhdGlvbl9zdGFydERhdGUnLCAnZHVyYXRpb25fZW5kRGF0ZSddXSxcbiAgICAnZ2VvbWV0cnknOlsnZ2VvbWV0cnknXSxcbiAgICAncG9pIG5hbWUnOlsnbG9jYXRpb25fbmFtZSddXG4gIH0sXG4gICdncHNkYXRhJzp7XG4gICAgXCJwcmVjaXNpb25cIjpbXCJhY2N1cmFjeVwiLFwiJ3ZlcnRpY2FsQWNjdXJhY3lcIl0sXG4gICAgXCJkYXRldGltZVwiOltcInRpbWVzdGFtcFwiXSxcbiAgICAnZ3BzJzpbWydsYXQnLCAnbG5nJ11dLFxuICAgICdncHMgc3VwcGxlbWVudGFyeSBpbmZvJzpbJ3ZlbG9jaXR5JywgJ2hlYWRpbmcnLCAnYWx0aXR1ZGUnXVxuICB9LFxuICAnb2RkYXRhJzp7XG4gICAgJ3ByZWNpc2lvbic6WydhY3Rpdml0eVNlZ21lbnRfY29uZmlkZW5jZScsICdhY3Rpdml0eVNlZ21lbnRfZWRpdENvbmZpcm1hdGlvblN0YXR1cycsJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2xvY2F0aW9uQ29uZmlkZW5jZScsJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sb2NhdGlvbkNvbmZpZGVuY2UnXSxcbiAgICAnZ3BzJzpbWydhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9sYXRpdHVkZUU3JywgJ2FjdGl2aXR5U2VnbWVudF9zdGFydExvY2F0aW9uX2xvbmdpdHVkZUU3J10sXG4gICAgICBbJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sYXRpdHVkZUU3JywgJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9sb25naXR1ZGVFNyddXSxcbiAgICAnZGlzdGFuY2UnOlsnYWN0aXZpdHlTZWdtZW50X2Rpc3RhbmNlJ10sXG4gICAgJ3RyYW5zcG9ydGF0aW9uIG1vZGUnOlsnYWN0aXZpdHlTZWdtZW50X2FjdGl2aXR5VHlwZSddLFxuICAgICdpZCc6WydhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9wbGFjZUlkJywnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX3BsYWNlSWQnXSxcbiAgICAnYWRkcmVzcyc6WydhY3Rpdml0eVNlZ21lbnRfc3RhcnRMb2NhdGlvbl9hZGRyZXNzJywnYWN0aXZpdHlTZWdtZW50X2VuZExvY2F0aW9uX2FkZHJlc3MnXSxcbiAgICAncG9pIG5hbWUnOlsnYWN0aXZpdHlTZWdtZW50X3N0YXJ0TG9jYXRpb25fbmFtZScsJ2FjdGl2aXR5U2VnbWVudF9lbmRMb2NhdGlvbl9uYW1lJ10sXG4gICAgJ2RhdGV0aW1lJzpbWydhY3Rpdml0eVNlZ21lbnRfZHVyYXRpb25fc3RhcnRUaW1lc3RhbXBNcycsJ2FjdGl2aXR5U2VnbWVudF9kdXJhdGlvbl9lbmRUaW1lc3RhbXBNcyddXSxcbiAgICAnZGF0ZSc6W1snYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX2VuZERhdGUnLCAnYWN0aXZpdHlTZWdtZW50X2R1cmF0aW9uX3N0YXJ0RGF0ZSddXSxcbiAgICAnZ2VvbWV0cnknOlsnd2F5cG9pbnRfZ2VvbSddXG4gIH1cbn1cbiJdfQ==