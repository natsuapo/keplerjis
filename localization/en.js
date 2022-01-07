"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _locales = require("./locales");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  property: {
    weight: 'weight',
    label: 'label',
    fillColor: 'fill color',
    color: 'color',
    coverage: 'coverage',
    strokeColor: 'stroke color',
    radius: 'radius',
    outline: 'outline',
    stroke: 'stroke',
    density: 'density',
    height: 'height',
    sum: 'sum',
    pointCount: 'Point Count'
  },
  placeholder: {
    search: 'Search',
    selectField: 'Select a field',
    yAxis: 'Y Axis',
    selectType: 'Select A Type',
    selectValue: 'Select A Value',
    enterValue: 'Enter a value',
    empty: 'empty'
  },
  misc: {
    by: '',
    valuesIn: 'Values in',
    valueEquals: 'Value equals',
    dataSource: 'Data Source',
    brushRadius: 'Brush Radius (km)',
    empty: ' '
  },
  mapLayers: {
    title: 'Map Layers',
    label: 'Label',
    road: 'Road',
    border: 'Border',
    building: 'Building',
    water: 'Water',
    land: 'Land',
    '3dBuilding': '3d Building'
  },
  panel: {
    text: {
      label: 'label',
      labelWithId: 'Label {labelId}',
      fontSize: 'Font size',
      fontColor: 'Font color',
      textAnchor: 'Text anchor',
      alignment: 'Alignment',
      addMoreLabel: 'Add More Label'
    }
  },
  processor: {
    ProcessBatch: 'Process and download',
    outColumnName: 'Output column name',
    outTableName: 'Output table name',
    outlat: 'output latitude column',
    outlng: 'output longitude column',
    joininfo: 'Joint table information',
    choosepro: 'Choose a processor',
    replaceCol: 'replace column if the column name is existed',
    addSpatialFilter: 'Add spatial filter',
    addTemporalFilter: 'Add temporal filter',
    replaceDs: 'replace the original dataset',
    slice: 'slice column with digit info',
    floor: 'floor a datetime with unit info',
    oddataset: 'Semantic OD dataset',
    poidataset: 'Semantic POI dataset',
    gpsdataset: 'Raw GPS dataset',
    setDow: 'Set days of week to export',
    removeHoliday: 'Remove holidays in the results',
    //this is the most difficult part:
    setAddresLevel: 'Select the query address level (requires google place API token)',
    setGoogleAPIKey: 'Please input your google API key (blank OK)',
    addPOIConveter: 'Convert POI name to POI type (requires google place API token)',
    addPrefFilter: 'Add prefecture filter',
    addPredefinedFilter: 'Select from predefined filter',
    exportSetting: 'Export setting',
    header: 'Keep header',
    addPOIConverter: 'Convert POI name to POI type',
    addCoordsModify: 'Modify coordinates based on simplified address',
    startTime: 'Set recording start time of the day',
    endTime: 'Set recording end time of the day',
    setGeometryFilter: 'Set geometry filter',
    setStartDate: 'Set date range of the datasets',
    outColumn: 'Set columns to export'
  },
  sidebar: {
    panels: {
      layer: 'Layers',
      filter: 'Filters',
      interaction: 'Interactions',
      basemap: 'Base map',
      process: 'Processor',
      gmtprocess: 'GMT Processor'
    }
  },
  layer: {
    required: 'Required*',
    radius: 'Radius',
    color: 'Color',
    fillColor: 'Fill Color',
    outline: 'Outline',
    weight: 'Weight',
    meshsize: 'Mesh setting',
    propertyBasedOn: '{property} based on',
    coverage: 'Coverage',
    stroke: 'Stroke',
    strokeWidth: 'Stroke Width',
    strokeColor: 'Stroke Color',
    basic: 'Basic',
    trailLength: 'Trail Length',
    trailLengthDescription: 'Number of seconds for a path to completely fade out',
    newLayer: 'new layer',
    elevationByDescription: 'When off, height is based on count of points',
    colorByDescription: 'When off, color is based on count of points',
    aggregateBy: 'Aggregate {field} by',
    '3DModel': '3D Model',
    '3DModelOptions': '3D Model Options',
    type: {
      point: 'point',
      arc: 'arc',
      line: 'line',
      grid: 'grid',
      hexbin: 'hexbin',
      polygon: 'polygon',
      geojson: 'geojson',
      cluster: 'cluster',
      icon: 'icon',
      heatmap: 'heatmap',
      hexagon: 'hexagon',
      hexagonid: 'H3',
      trip: 'trip',
      s2: 'S2',
      '3d': '3D',
      meshagg: 'Mesh aggregation',
      meshcode: 'JIS(ID)'
    }
  },
  layerVisConfigs: {
    angle: 'Angle',
    strokeWidth: 'Stroke Width (Pixels)',
    strokeWidthRange: 'Stroke Width Range',
    radius: 'Radius',
    fixedRadius: 'Fixed Radius to meter',
    fixedRadiusDescription: 'Map radius to absolute radius in meters, e.g. 5 to 5 meters',
    radiusRange: 'Radius Range',
    clusterRadius: 'Cluster Radius in Pixels',
    radiusRangePixels: 'Radius Range in pixels',
    opacity: 'Opacity',
    coverage: 'Coverage',
    outline: 'Outline',
    colorRange: 'Color range',
    stroke: 'Stroke',
    strokeColor: 'Stroke Color',
    strokeColorRange: 'Stroke Color range',
    targetColor: 'Target Color',
    colorAggregation: 'Color Aggregation',
    heightAggregation: 'Height Aggregation',
    resolutionRange: 'Resolution range',
    sizeScale: 'Size Scale',
    worldUnitSize: 'World Unit Size',
    elevationScale: 'Elevation Scale',
    enableElevationZoomFactor: 'Use elevation zoom factor',
    enableElevationZoomFactorDescription: 'Adjust height/elevation based on current zoom factor',
    enableHeightZoomFactor: 'Use height zoom factor',
    heightScale: 'Height Scale',
    coverageRange: 'Coverage Range',
    highPrecisionRendering: 'High Precision Rendering',
    highPrecisionRenderingDescription: 'High precision will result in slower performance',
    height: 'Height',
    heightDescription: 'Click button at top right of the map to switch to 3d view',
    fill: 'Fill',
    level: 'Mesh level',
    enablePolygonHeight: 'Enable Polygon Height',
    showWireframe: 'Show Wireframe',
    weightIntensity: 'Weight Intensity',
    zoomScale: 'Zoom Scale',
    heightRange: 'Height Range',
    heightMultiplier: 'Height Multiplier'
  },
  layerManager: {
    addData: 'Add Data',
    addLayer: 'Add Layer',
    layerBlending: 'Layer Blending'
  },
  mapManager: {
    mapStyle: 'Map style',
    addMapStyle: 'Add Map Style',
    '3dBuildingColor': '3D Building Color'
  },
  layerConfiguration: {
    defaultDescription: 'Calculate {property} based on selected field',
    howTo: 'How to'
  },
  filterManager: {
    addFilter: 'Add Filter'
  },
  datasetTitle: {
    showDataTable: 'Show data table',
    removeDataset: 'Remove dataset'
  },
  datasetInfo: {
    rowCount: '{rowCount} rows'
  },
  tooltip: {
    hideLayer: 'hide layer',
    showLayer: 'show layer',
    hideFeature: 'Hide Feature',
    showFeature: 'Show feature',
    hide: 'hide',
    show: 'show',
    removeLayer: 'Remove layer',
    duplicateLayer: 'Duplicate layer',
    layerSettings: 'Layer settings',
    closePanel: 'Close current panel',
    switchToDualView: 'Switch to dual map view',
    showLegend: 'show legend',
    disable3DMap: 'Disable 3D Map',
    DrawOnMap: 'Draw on map',
    selectLocale: 'Select locale',
    hideLayerPanel: 'Hide layer panel',
    showLayerPanel: 'Show layer panel',
    moveToTop: 'Move to top of data layers',
    selectBaseMapStyle: 'Select Base Map Style',
    "delete": 'Delete',
    timePlayback: 'Time Playback',
    cloudStorage: 'Cloud Storage',
    '3DMap': '3D Map',
    animationByWindow: 'Moving Time Window',
    animationByIncremental: 'Incremental Time Window',
    speed: 'speed',
    play: 'play',
    pause: 'pause',
    reset: 'reset'
  },
  toolbar: _objectSpread({
    exportImage: 'Export Image',
    exportData: 'Export Data',
    exportMap: 'Export Map',
    shareMapURL: 'Share Map URL',
    saveMap: 'Save Map',
    select: 'Select',
    polygon: 'Polygon',
    rectangle: 'Rectangle',
    hide: 'Hide',
    show: 'Show'
  }, _locales.LOCALES),
  editor: {
    filterLayer: 'Filter Layers',
    copyGeometry: 'Copy Geometry'
  },
  modal: {
    title: {
      deleteDataset: 'Delete Dataset',
      addDataToMap: 'Add Data To Map',
      exportImage: 'Export Image',
      exportData: 'Export Data',
      exportMap: 'Export Map',
      addCustomMapboxStyle: 'Add Custom Map Style',
      saveMap: 'Save Map',
      shareURL: 'Share URL'
    },
    button: {
      "delete": 'Delete',
      download: 'Download',
      "export": 'Export',
      addStyle: 'Add Style',
      save: 'Save',
      defaultCancel: 'Cancel',
      defaultConfirm: 'Confirm'
    },
    exportImage: {
      ratioTitle: 'Ratio',
      ratioDescription: 'Choose the ratio for various usages.',
      ratioOriginalScreen: 'Original Screen',
      ratioCustom: 'Custom',
      ratio4_3: '4:3',
      ratio16_9: '16:9',
      resolutionTitle: 'Resolution',
      resolutionDescription: 'High resolution is better for prints.',
      mapLegendTitle: 'Map Legend',
      mapLegendAdd: 'Add legend on map'
    },
    exportData: {
      datasetTitle: 'Dataset',
      datasetSubtitle: 'Choose the datasets you want to export',
      allDatasets: 'All',
      dataTypeTitle: 'Data Type',
      dataTypeSubtitle: 'Choose the type of data you want to export',
      filterDataTitle: 'Filter Data',
      filterDataSubtitle: 'You can choose exporting original data or filtered data',
      filteredData: 'Filtered data',
      unfilteredData: 'Unfiltered Data',
      fileCount: '{fileCount} Files',
      rowCount: '{rowCount} Rows'
    },
    deleteData: {
      warning: 'you are going to delete this dataset. It will affect {length} layers'
    },
    addStyle: {
      publishTitle: '2. If entered mapbox stule url in step.1, publish your style at mapbox or provide access token. (Optional)',
      publishSubtitle1: 'You can create your own map style at',
      publishSubtitle2: 'and',
      publishSubtitle3: 'publish',
      publishSubtitle4: 'it.',
      publishSubtitle5: 'To use private style, paste your',
      publishSubtitle6: 'access token',
      publishSubtitle7: 'here. *kepler.gl is a client-side application, data stays in your browser..',
      exampleToken: 'e.g. pk.abcdefg.xxxxxx',
      pasteTitle: '1. Paste style url',
      pasteSubtitle0: 'Style url can be a mapbox',
      pasteSubtitle1: 'What is a',
      pasteSubtitle2: 'style URL',
      pasteSubtitle3: 'or a style.json using the',
      pasteSubtitle4: 'Mapbox GL Style Spec',
      namingTitle: '3. Name your style'
    },
    shareMap: {
      shareUriTitle: 'Share Map Url',
      shareUriSubtitle: 'Generate a map url to share with others',
      cloudTitle: 'Cloud storage',
      cloudSubtitle: 'Login and upload map data to your personal cloud storage',
      shareDisclaimer: 'kepler.gl will save your map data to your personal cloud storage, only people with the URL can access your map and data. ' + 'You can edit/delete the data file in your cloud account anytime.',
      gotoPage: 'Go to your Kepler.gl {currentProvider} page'
    },
    statusPanel: {
      mapUploading: 'Map Uploading',
      error: 'Error'
    },
    saveMap: {
      title: 'Cloud storage',
      subtitle: 'Login to save map to your personal cloud storage'
    },
    exportMap: {
      formatTitle: 'Map format',
      formatSubtitle: 'Choose the format to export your map to',
      html: {
        selection: 'Export your map into an interactive html file.',
        tokenTitle: 'Mapbox access token',
        tokenSubtitle: 'Use your own Mapbox access token in the html (optional)',
        tokenPlaceholder: 'Paste your Mapbox access token',
        tokenMisuseWarning: '* If you do not provide your own token, the map may fail to display at any time when we replace ours to avoid misuse. ',
        tokenDisclaimer: 'You can change the Mapbox token later using the following instructions: ',
        tokenUpdate: 'How to update an existing map token.',
        modeTitle: 'Map Mode',
        modeSubtitle1: 'Select the app mode. More ',
        modeSubtitle2: 'info',
        modeDescription: 'Allow users to {mode} the map',
        read: 'read',
        edit: 'edit'
      },
      json: {
        configTitle: 'Map Config',
        configDisclaimer: 'Map config will be included in the Json file. If you are using kepler.gl in your own app. You can copy this config and pass it to ',
        selection: 'Export current map data and config into a single Json file. You can later open the same map by uploading this file to kepler.gl.',
        disclaimer: '* Map config is coupled with loaded datasets. ‘dataId’ is used to bind layers, filters, and tooltips to a specific dataset. ' + 'When passing this config to addDataToMap, make sure the dataset id matches the dataId/s in this config.'
      }
    },
    loadingDialog: {
      loading: 'Loading...'
    },
    loadData: {
      upload: 'Load Files',
      storage: 'Load from Storage'
    },
    tripInfo: {
      title: 'How to enable trip animation',
      description1: 'In order to animate the path, the geoJSON data needs to contain `LineString` in its feature geometry, and the coordinates in the LineString need to have 4 elements in the formats of',
      code: ' [longitude, latitude, altitude, timestamp] ',
      description2: 'with the last element being a timestamp. Valid timestamp formats include unix in seconds such as `1564184363` or in milliseconds such as `1564184363000`.',
      example: 'Example:'
    },
    iconInfo: {
      title: 'How to draw icons',
      description1: 'In your csv, create a column, put the name of the icon you want to draw in it. You can leave the cell empty if you do not want the icon to show for some points. When the column is named',
      code: 'icon',
      description2: ' kepler.gl will automatically create a icon layer for you.',
      example: 'Example:',
      icons: 'Icons'
    },
    storageMapViewer: {
      lastModified: 'Last modified {lastUpdated} ago',
      back: 'Back'
    },
    overwriteMap: {
      title: 'Saving map...',
      alreadyExists: 'already exists in your {mapSaved}. Would you like to overwrite it?'
    },
    loadStorageMap: {
      back: 'Back',
      goToPage: 'Go to your Kepler.gl {displayName} page',
      storageMaps: 'Storage / Maps',
      noSavedMaps: 'No saved maps yet'
    }
  },
  header: {
    visibleLayers: 'Visible layers',
    layerLegend: 'Layer Legend'
  },
  interactions: {
    tooltip: 'Tooltip',
    brush: 'Brush',
    coordinate: 'Coordinates',
    geocoder: 'Geocoder'
  },
  layerBlending: {
    title: 'Layer Blending',
    additive: 'additive',
    normal: 'normal',
    subtractive: 'subtractive'
  },
  columns: {
    title: 'Columns',
    lat: 'lat',
    lng: 'lon',
    altitude: 'altitude',
    icon: 'icon',
    geojson: 'geojson',
    token: 'token',
    arc: {
      lat0: 'source lat',
      lng0: 'source lng',
      lat1: 'target lat',
      lng1: 'target lng'
    },
    line: {
      alt0: 'source altitude',
      alt1: 'target altitude'
    },
    grid: {
      worldUnitSize: 'Grid Size (km)'
    },
    hexagon: {
      worldUnitSize: 'Hexagon Radius (km)'
    },
    meshagg: 'meshagg',
    meshCodeSize: 'Mesh Level',
    hex_id: 'hex id',
    meshcode: 'meshcode'
  },
  color: {
    customPalette: 'Custom Palette',
    steps: 'steps',
    type: 'type',
    reversed: 'reversed'
  },
  scale: {
    colorScale: 'Color Scale',
    sizeScale: 'Size Scale',
    strokeScale: 'Stroke Scale',
    scale: 'Scale'
  },
  fileUploader: {
    message: 'Drag & Drop Your File(s) Here',
    chromeMessage: '*Chrome user: Limit file size to 250mb, if need to upload larger file, try Safari',
    disclaimer: '*kepler.gl is a client-side application with no server backend. Data lives only on your machine/browser. ' + 'No information or map data is sent to any server.',
    configUploadMessage: 'Upload {fileFormatNames} or saved map **Json**. Read more about [**supported file formats**]',
    browseFiles: 'browse your files',
    uploading: 'Uploading',
    fileNotSupported: 'File {errorFiles} is not supported.',
    or: 'or'
  },
  geocoder: {
    title: 'Enter an address or coordinates, ex 37.79,-122.40'
  },
  fieldSelector: {
    clearAll: 'Clear All',
    formatting: 'Formatting'
  },
  compare: {
    modeLabel: 'Comparison Mode',
    typeLabel: 'Comparison Type',
    types: {
      absolute: 'Absolute',
      relative: 'Relative'
    }
  },
  mapPopover: {
    primary: 'Primary'
  },
  density: 'density',
  'Bug Report': 'Bug Report',
  'User Guide': 'User Guide',
  Save: 'Save',
  Share: 'Share'
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2NhbGl6YXRpb24vZW4uanMiXSwibmFtZXMiOlsicHJvcGVydHkiLCJ3ZWlnaHQiLCJsYWJlbCIsImZpbGxDb2xvciIsImNvbG9yIiwiY292ZXJhZ2UiLCJzdHJva2VDb2xvciIsInJhZGl1cyIsIm91dGxpbmUiLCJzdHJva2UiLCJkZW5zaXR5IiwiaGVpZ2h0Iiwic3VtIiwicG9pbnRDb3VudCIsInBsYWNlaG9sZGVyIiwic2VhcmNoIiwic2VsZWN0RmllbGQiLCJ5QXhpcyIsInNlbGVjdFR5cGUiLCJzZWxlY3RWYWx1ZSIsImVudGVyVmFsdWUiLCJlbXB0eSIsIm1pc2MiLCJieSIsInZhbHVlc0luIiwidmFsdWVFcXVhbHMiLCJkYXRhU291cmNlIiwiYnJ1c2hSYWRpdXMiLCJtYXBMYXllcnMiLCJ0aXRsZSIsInJvYWQiLCJib3JkZXIiLCJidWlsZGluZyIsIndhdGVyIiwibGFuZCIsInBhbmVsIiwidGV4dCIsImxhYmVsV2l0aElkIiwiZm9udFNpemUiLCJmb250Q29sb3IiLCJ0ZXh0QW5jaG9yIiwiYWxpZ25tZW50IiwiYWRkTW9yZUxhYmVsIiwicHJvY2Vzc29yIiwiUHJvY2Vzc0JhdGNoIiwib3V0Q29sdW1uTmFtZSIsIm91dFRhYmxlTmFtZSIsIm91dGxhdCIsIm91dGxuZyIsImpvaW5pbmZvIiwiY2hvb3NlcHJvIiwicmVwbGFjZUNvbCIsImFkZFNwYXRpYWxGaWx0ZXIiLCJhZGRUZW1wb3JhbEZpbHRlciIsInJlcGxhY2VEcyIsInNsaWNlIiwiZmxvb3IiLCJvZGRhdGFzZXQiLCJwb2lkYXRhc2V0IiwiZ3BzZGF0YXNldCIsInNldERvdyIsInJlbW92ZUhvbGlkYXkiLCJzZXRBZGRyZXNMZXZlbCIsInNldEdvb2dsZUFQSUtleSIsImFkZFBPSUNvbnZldGVyIiwiYWRkUHJlZkZpbHRlciIsImFkZFByZWRlZmluZWRGaWx0ZXIiLCJleHBvcnRTZXR0aW5nIiwiaGVhZGVyIiwiYWRkUE9JQ29udmVydGVyIiwiYWRkQ29vcmRzTW9kaWZ5Iiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInNldEdlb21ldHJ5RmlsdGVyIiwic2V0U3RhcnREYXRlIiwib3V0Q29sdW1uIiwic2lkZWJhciIsInBhbmVscyIsImxheWVyIiwiZmlsdGVyIiwiaW50ZXJhY3Rpb24iLCJiYXNlbWFwIiwicHJvY2VzcyIsImdtdHByb2Nlc3MiLCJyZXF1aXJlZCIsIm1lc2hzaXplIiwicHJvcGVydHlCYXNlZE9uIiwic3Ryb2tlV2lkdGgiLCJiYXNpYyIsInRyYWlsTGVuZ3RoIiwidHJhaWxMZW5ndGhEZXNjcmlwdGlvbiIsIm5ld0xheWVyIiwiZWxldmF0aW9uQnlEZXNjcmlwdGlvbiIsImNvbG9yQnlEZXNjcmlwdGlvbiIsImFnZ3JlZ2F0ZUJ5IiwidHlwZSIsInBvaW50IiwiYXJjIiwibGluZSIsImdyaWQiLCJoZXhiaW4iLCJwb2x5Z29uIiwiZ2VvanNvbiIsImNsdXN0ZXIiLCJpY29uIiwiaGVhdG1hcCIsImhleGFnb24iLCJoZXhhZ29uaWQiLCJ0cmlwIiwiczIiLCJtZXNoYWdnIiwibWVzaGNvZGUiLCJsYXllclZpc0NvbmZpZ3MiLCJhbmdsZSIsInN0cm9rZVdpZHRoUmFuZ2UiLCJmaXhlZFJhZGl1cyIsImZpeGVkUmFkaXVzRGVzY3JpcHRpb24iLCJyYWRpdXNSYW5nZSIsImNsdXN0ZXJSYWRpdXMiLCJyYWRpdXNSYW5nZVBpeGVscyIsIm9wYWNpdHkiLCJjb2xvclJhbmdlIiwic3Ryb2tlQ29sb3JSYW5nZSIsInRhcmdldENvbG9yIiwiY29sb3JBZ2dyZWdhdGlvbiIsImhlaWdodEFnZ3JlZ2F0aW9uIiwicmVzb2x1dGlvblJhbmdlIiwic2l6ZVNjYWxlIiwid29ybGRVbml0U2l6ZSIsImVsZXZhdGlvblNjYWxlIiwiZW5hYmxlRWxldmF0aW9uWm9vbUZhY3RvciIsImVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3JEZXNjcmlwdGlvbiIsImVuYWJsZUhlaWdodFpvb21GYWN0b3IiLCJoZWlnaHRTY2FsZSIsImNvdmVyYWdlUmFuZ2UiLCJoaWdoUHJlY2lzaW9uUmVuZGVyaW5nIiwiaGlnaFByZWNpc2lvblJlbmRlcmluZ0Rlc2NyaXB0aW9uIiwiaGVpZ2h0RGVzY3JpcHRpb24iLCJmaWxsIiwibGV2ZWwiLCJlbmFibGVQb2x5Z29uSGVpZ2h0Iiwic2hvd1dpcmVmcmFtZSIsIndlaWdodEludGVuc2l0eSIsInpvb21TY2FsZSIsImhlaWdodFJhbmdlIiwiaGVpZ2h0TXVsdGlwbGllciIsImxheWVyTWFuYWdlciIsImFkZERhdGEiLCJhZGRMYXllciIsImxheWVyQmxlbmRpbmciLCJtYXBNYW5hZ2VyIiwibWFwU3R5bGUiLCJhZGRNYXBTdHlsZSIsImxheWVyQ29uZmlndXJhdGlvbiIsImRlZmF1bHREZXNjcmlwdGlvbiIsImhvd1RvIiwiZmlsdGVyTWFuYWdlciIsImFkZEZpbHRlciIsImRhdGFzZXRUaXRsZSIsInNob3dEYXRhVGFibGUiLCJyZW1vdmVEYXRhc2V0IiwiZGF0YXNldEluZm8iLCJyb3dDb3VudCIsInRvb2x0aXAiLCJoaWRlTGF5ZXIiLCJzaG93TGF5ZXIiLCJoaWRlRmVhdHVyZSIsInNob3dGZWF0dXJlIiwiaGlkZSIsInNob3ciLCJyZW1vdmVMYXllciIsImR1cGxpY2F0ZUxheWVyIiwibGF5ZXJTZXR0aW5ncyIsImNsb3NlUGFuZWwiLCJzd2l0Y2hUb0R1YWxWaWV3Iiwic2hvd0xlZ2VuZCIsImRpc2FibGUzRE1hcCIsIkRyYXdPbk1hcCIsInNlbGVjdExvY2FsZSIsImhpZGVMYXllclBhbmVsIiwic2hvd0xheWVyUGFuZWwiLCJtb3ZlVG9Ub3AiLCJzZWxlY3RCYXNlTWFwU3R5bGUiLCJ0aW1lUGxheWJhY2siLCJjbG91ZFN0b3JhZ2UiLCJhbmltYXRpb25CeVdpbmRvdyIsImFuaW1hdGlvbkJ5SW5jcmVtZW50YWwiLCJzcGVlZCIsInBsYXkiLCJwYXVzZSIsInJlc2V0IiwidG9vbGJhciIsImV4cG9ydEltYWdlIiwiZXhwb3J0RGF0YSIsImV4cG9ydE1hcCIsInNoYXJlTWFwVVJMIiwic2F2ZU1hcCIsInNlbGVjdCIsInJlY3RhbmdsZSIsIkxPQ0FMRVMiLCJlZGl0b3IiLCJmaWx0ZXJMYXllciIsImNvcHlHZW9tZXRyeSIsIm1vZGFsIiwiZGVsZXRlRGF0YXNldCIsImFkZERhdGFUb01hcCIsImFkZEN1c3RvbU1hcGJveFN0eWxlIiwic2hhcmVVUkwiLCJidXR0b24iLCJkb3dubG9hZCIsImFkZFN0eWxlIiwic2F2ZSIsImRlZmF1bHRDYW5jZWwiLCJkZWZhdWx0Q29uZmlybSIsInJhdGlvVGl0bGUiLCJyYXRpb0Rlc2NyaXB0aW9uIiwicmF0aW9PcmlnaW5hbFNjcmVlbiIsInJhdGlvQ3VzdG9tIiwicmF0aW80XzMiLCJyYXRpbzE2XzkiLCJyZXNvbHV0aW9uVGl0bGUiLCJyZXNvbHV0aW9uRGVzY3JpcHRpb24iLCJtYXBMZWdlbmRUaXRsZSIsIm1hcExlZ2VuZEFkZCIsImRhdGFzZXRTdWJ0aXRsZSIsImFsbERhdGFzZXRzIiwiZGF0YVR5cGVUaXRsZSIsImRhdGFUeXBlU3VidGl0bGUiLCJmaWx0ZXJEYXRhVGl0bGUiLCJmaWx0ZXJEYXRhU3VidGl0bGUiLCJmaWx0ZXJlZERhdGEiLCJ1bmZpbHRlcmVkRGF0YSIsImZpbGVDb3VudCIsImRlbGV0ZURhdGEiLCJ3YXJuaW5nIiwicHVibGlzaFRpdGxlIiwicHVibGlzaFN1YnRpdGxlMSIsInB1Ymxpc2hTdWJ0aXRsZTIiLCJwdWJsaXNoU3VidGl0bGUzIiwicHVibGlzaFN1YnRpdGxlNCIsInB1Ymxpc2hTdWJ0aXRsZTUiLCJwdWJsaXNoU3VidGl0bGU2IiwicHVibGlzaFN1YnRpdGxlNyIsImV4YW1wbGVUb2tlbiIsInBhc3RlVGl0bGUiLCJwYXN0ZVN1YnRpdGxlMCIsInBhc3RlU3VidGl0bGUxIiwicGFzdGVTdWJ0aXRsZTIiLCJwYXN0ZVN1YnRpdGxlMyIsInBhc3RlU3VidGl0bGU0IiwibmFtaW5nVGl0bGUiLCJzaGFyZU1hcCIsInNoYXJlVXJpVGl0bGUiLCJzaGFyZVVyaVN1YnRpdGxlIiwiY2xvdWRUaXRsZSIsImNsb3VkU3VidGl0bGUiLCJzaGFyZURpc2NsYWltZXIiLCJnb3RvUGFnZSIsInN0YXR1c1BhbmVsIiwibWFwVXBsb2FkaW5nIiwiZXJyb3IiLCJzdWJ0aXRsZSIsImZvcm1hdFRpdGxlIiwiZm9ybWF0U3VidGl0bGUiLCJodG1sIiwic2VsZWN0aW9uIiwidG9rZW5UaXRsZSIsInRva2VuU3VidGl0bGUiLCJ0b2tlblBsYWNlaG9sZGVyIiwidG9rZW5NaXN1c2VXYXJuaW5nIiwidG9rZW5EaXNjbGFpbWVyIiwidG9rZW5VcGRhdGUiLCJtb2RlVGl0bGUiLCJtb2RlU3VidGl0bGUxIiwibW9kZVN1YnRpdGxlMiIsIm1vZGVEZXNjcmlwdGlvbiIsInJlYWQiLCJlZGl0IiwianNvbiIsImNvbmZpZ1RpdGxlIiwiY29uZmlnRGlzY2xhaW1lciIsImRpc2NsYWltZXIiLCJsb2FkaW5nRGlhbG9nIiwibG9hZGluZyIsImxvYWREYXRhIiwidXBsb2FkIiwic3RvcmFnZSIsInRyaXBJbmZvIiwiZGVzY3JpcHRpb24xIiwiY29kZSIsImRlc2NyaXB0aW9uMiIsImV4YW1wbGUiLCJpY29uSW5mbyIsImljb25zIiwic3RvcmFnZU1hcFZpZXdlciIsImxhc3RNb2RpZmllZCIsImJhY2siLCJvdmVyd3JpdGVNYXAiLCJhbHJlYWR5RXhpc3RzIiwibG9hZFN0b3JhZ2VNYXAiLCJnb1RvUGFnZSIsInN0b3JhZ2VNYXBzIiwibm9TYXZlZE1hcHMiLCJ2aXNpYmxlTGF5ZXJzIiwibGF5ZXJMZWdlbmQiLCJpbnRlcmFjdGlvbnMiLCJicnVzaCIsImNvb3JkaW5hdGUiLCJnZW9jb2RlciIsImFkZGl0aXZlIiwibm9ybWFsIiwic3VidHJhY3RpdmUiLCJjb2x1bW5zIiwibGF0IiwibG5nIiwiYWx0aXR1ZGUiLCJ0b2tlbiIsImxhdDAiLCJsbmcwIiwibGF0MSIsImxuZzEiLCJhbHQwIiwiYWx0MSIsIm1lc2hDb2RlU2l6ZSIsImhleF9pZCIsImN1c3RvbVBhbGV0dGUiLCJzdGVwcyIsInJldmVyc2VkIiwic2NhbGUiLCJjb2xvclNjYWxlIiwic3Ryb2tlU2NhbGUiLCJmaWxlVXBsb2FkZXIiLCJtZXNzYWdlIiwiY2hyb21lTWVzc2FnZSIsImNvbmZpZ1VwbG9hZE1lc3NhZ2UiLCJicm93c2VGaWxlcyIsInVwbG9hZGluZyIsImZpbGVOb3RTdXBwb3J0ZWQiLCJvciIsImZpZWxkU2VsZWN0b3IiLCJjbGVhckFsbCIsImZvcm1hdHRpbmciLCJjb21wYXJlIiwibW9kZUxhYmVsIiwidHlwZUxhYmVsIiwidHlwZXMiLCJhYnNvbHV0ZSIsInJlbGF0aXZlIiwibWFwUG9wb3ZlciIsInByaW1hcnkiLCJTYXZlIiwiU2hhcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7ZUFFZTtBQUNiQSxFQUFBQSxRQUFRLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFLFFBREE7QUFFUkMsSUFBQUEsS0FBSyxFQUFFLE9BRkM7QUFHUkMsSUFBQUEsU0FBUyxFQUFFLFlBSEg7QUFJUkMsSUFBQUEsS0FBSyxFQUFFLE9BSkM7QUFLUkMsSUFBQUEsUUFBUSxFQUFFLFVBTEY7QUFNUkMsSUFBQUEsV0FBVyxFQUFFLGNBTkw7QUFPUkMsSUFBQUEsTUFBTSxFQUFFLFFBUEE7QUFRUkMsSUFBQUEsT0FBTyxFQUFFLFNBUkQ7QUFTUkMsSUFBQUEsTUFBTSxFQUFFLFFBVEE7QUFVUkMsSUFBQUEsT0FBTyxFQUFFLFNBVkQ7QUFXUkMsSUFBQUEsTUFBTSxFQUFFLFFBWEE7QUFZUkMsSUFBQUEsR0FBRyxFQUFFLEtBWkc7QUFhUkMsSUFBQUEsVUFBVSxFQUFFO0FBYkosR0FERztBQWdCYkMsRUFBQUEsV0FBVyxFQUFFO0FBQ1hDLElBQUFBLE1BQU0sRUFBRSxRQURHO0FBRVhDLElBQUFBLFdBQVcsRUFBRSxnQkFGRjtBQUdYQyxJQUFBQSxLQUFLLEVBQUUsUUFISTtBQUlYQyxJQUFBQSxVQUFVLEVBQUUsZUFKRDtBQUtYQyxJQUFBQSxXQUFXLEVBQUUsZ0JBTEY7QUFNWEMsSUFBQUEsVUFBVSxFQUFFLGVBTkQ7QUFPWEMsSUFBQUEsS0FBSyxFQUFFO0FBUEksR0FoQkE7QUF5QmJDLEVBQUFBLElB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LG1EQU5VO0FBT1pxRCxJQUFBQSxtQkFBbUIsRUFDakIsOEZBUlU7QUFTWkMsSUFBQUEsV0FBVyxFQUFFLG1CQVREO0FBVVpDLElBQUFBLFNBQVMsRUFBRSxXQVZDO0FBV1pDLElBQUFBLGdCQUFnQixFQUFFLHFDQVhOO0FBWVpDLElBQUFBLEVBQUUsRUFBRTtBQVpRLEdBdmREO0FBcWViOUIsRUFBQUEsUUFBUSxFQUFFO0FBQ1J2UixJQUFBQSxLQUFLLEVBQUU7QUFEQyxHQXJlRztBQXdlYnNULEVBQUFBLGFBQWEsRUFBRTtBQUNiQyxJQUFBQSxRQUFRLEVBQUUsV0FERztBQUViQyxJQUFBQSxVQUFVLEVBQUU7QUFGQyxHQXhlRjtBQTRlYkMsRUFBQUEsT0FBTyxFQUFFO0FBQ1BDLElBQUFBLFNBQVMsRUFBRSxpQkFESjtBQUVQQyxJQUFBQSxTQUFTLEVBQUUsaUJBRko7QUFHUEMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xDLE1BQUFBLFFBQVEsRUFBRSxVQURMO0FBRUxDLE1BQUFBLFFBQVEsRUFBRTtBQUZMO0FBSEEsR0E1ZUk7QUFvZmJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxPQUFPLEVBQUU7QUFEQyxHQXBmQztBQXVmYm5WLEVBQUFBLE9BQU8sRUFBRSxTQXZmSTtBQXdmYixnQkFBYyxZQXhmRDtBQXlmYixnQkFBYyxZQXpmRDtBQTBmYm9WLEVBQUFBLElBQUksRUFBRSxNQTFmTztBQTJmYkMsRUFBQUEsS0FBSyxFQUFFO0FBM2ZNLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjIgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0xPQ0FMRVN9IGZyb20gJy4vbG9jYWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcGVydHk6IHtcbiAgICB3ZWlnaHQ6ICd3ZWlnaHQnLFxuICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgIGZpbGxDb2xvcjogJ2ZpbGwgY29sb3InLFxuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIGNvdmVyYWdlOiAnY292ZXJhZ2UnLFxuICAgIHN0cm9rZUNvbG9yOiAnc3Ryb2tlIGNvbG9yJyxcbiAgICByYWRpdXM6ICdyYWRpdXMnLFxuICAgIG91dGxpbmU6ICdvdXRsaW5lJyxcbiAgICBzdHJva2U6ICdzdHJva2UnLFxuICAgIGRlbnNpdHk6ICdkZW5zaXR5JyxcbiAgICBoZWlnaHQ6ICdoZWlnaHQnLFxuICAgIHN1bTogJ3N1bScsXG4gICAgcG9pbnRDb3VudDogJ1BvaW50IENvdW50J1xuICB9LFxuICBwbGFjZWhvbGRlcjoge1xuICAgIHNlYXJjaDogJ1NlYXJjaCcsXG4gICAgc2VsZWN0RmllbGQ6ICdTZWxlY3QgYSBmaWVsZCcsXG4gICAgeUF4aXM6ICdZIEF4aXMnLFxuICAgIHNlbGVjdFR5cGU6ICdTZWxlY3QgQSBUeXBlJyxcbiAgICBzZWxlY3RWYWx1ZTogJ1NlbGVjdCBBIFZhbHVlJyxcbiAgICBlbnRlclZhbHVlOiAnRW50ZXIgYSB2YWx1ZScsXG4gICAgZW1wdHk6ICdlbXB0eSdcbiAgfSxcbiAgbWlzYzoge1xuICAgIGJ5OiAnJyxcbiAgICB2YWx1ZXNJbjogJ1ZhbHVlcyBpbicsXG4gICAgdmFsdWVFcXVhbHM6ICdWYWx1ZSBlcXVhbHMnLFxuICAgIGRhdGFTb3VyY2U6ICdEYXRhIFNvdXJjZScsXG4gICAgYnJ1c2hSYWRpdXM6ICdCcnVzaCBSYWRpdXMgKGttKScsXG4gICAgZW1wdHk6ICcgJ1xuICB9LFxuICBtYXBMYXllcnM6IHtcbiAgICB0aXRsZTogJ01hcCBMYXllcnMnLFxuICAgIGxhYmVsOiAnTGFiZWwnLFxuICAgIHJvYWQ6ICdSb2FkJyxcbiAgICBib3JkZXI6ICdCb3JkZXInLFxuICAgIGJ1aWxkaW5nOiAnQnVpbGRpbmcnLFxuICAgIHdhdGVyOiAnV2F0ZXInLFxuICAgIGxhbmQ6ICdMYW5kJyxcbiAgICAnM2RCdWlsZGluZyc6ICczZCBCdWlsZGluZydcbiAgfSxcbiAgcGFuZWw6IHtcbiAgICB0ZXh0OiB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIGxhYmVsV2l0aElkOiAnTGFiZWwge2xhYmVsSWR9JyxcbiAgICAgIGZvbnRTaXplOiAnRm9udCBzaXplJyxcbiAgICAgIGZvbnRDb2xvcjogJ0ZvbnQgY29sb3InLFxuICAgICAgdGV4dEFuY2hvcjogJ1RleHQgYW5jaG9yJyxcbiAgICAgIGFsaWdubWVudDogJ0FsaWdubWVudCcsXG4gICAgICBhZGRNb3JlTGFiZWw6ICdBZGQgTW9yZSBMYWJlbCdcbiAgICB9XG4gIH0sXG4gIHByb2Nlc3Nvcjp7XG4gICAgUHJvY2Vzc0JhdGNoOidQcm9jZXNzIGFuZCBkb3dubG9hZCcsXG4gICAgb3V0Q29sdW1uTmFtZTonT3V0cHV0IGNvbHVtbiBuYW1lJyxcbiAgICBvdXRUYWJsZU5hbWU6J091dHB1dCB0YWJsZSBuYW1lJyxcbiAgICBvdXRsYXQ6J291dHB1dCBsYXRpdHVkZSBjb2x1bW4nLFxuICAgIG91dGxuZzonb3V0cHV0IGxvbmdpdHVkZSBjb2x1bW4nLFxuICAgIGpvaW5pbmZvOidKb2ludCB0YWJsZSBpbmZvcm1hdGlvbicsXG4gICAgY2hvb3NlcHJvOidDaG9vc2UgYSBwcm9jZXNzb3InLFxuICAgIHJlcGxhY2VDb2w6J3JlcGxhY2UgY29sdW1uIGlmIHRoZSBjb2x1bW4gbmFtZSBpcyBleGlzdGVkJyxcbiAgICBhZGRTcGF0aWFsRmlsdGVyOidBZGQgc3BhdGlhbCBmaWx0ZXInLFxuICAgIGFkZFRlbXBvcmFsRmlsdGVyOidBZGQgdGVtcG9yYWwgZmlsdGVyJyxcbiAgICByZXBsYWNlRHM6J3JlcGxhY2UgdGhlIG9yaWdpbmFsIGRhdGFzZXQnLFxuICAgIHNsaWNlOidzbGljZSBjb2x1bW4gd2l0aCBkaWdpdCBpbmZvJyxcbiAgICBmbG9vcjonZmxvb3IgYSBkYXRldGltZSB3aXRoIHVuaXQgaW5mbycsXG4gICAgb2RkYXRhc2V0OidTZW1hbnRpYyBPRCBkYXRhc2V0JyxcbiAgICBwb2lkYXRhc2V0OidTZW1hbnRpYyBQT0kgZGF0YXNldCcsXG4gICAgZ3BzZGF0YXNldDonUmF3IEdQUyBkYXRhc2V0JyxcbiAgICBzZXREb3c6J1NldCBkYXlzIG9mIHdlZWsgdG8gZXhwb3J0JyxcbiAgICByZW1vdmVIb2xpZGF5OidSZW1vdmUgaG9saWRheXMgaW4gdGhlIHJlc3VsdHMnLFxuICAgIC8vdGhpcyBpcyB0aGUgbW9zdCBkaWZmaWN1bHQgcGFydDpcbiAgICBzZXRBZGRyZXNMZXZlbDonU2VsZWN0IHRoZSBxdWVyeSBhZGRyZXNzIGxldmVsIChyZXF1aXJlcyBnb29nbGUgcGxhY2UgQVBJIHRva2VuKScsXG4gICAgc2V0R29vZ2xlQVBJS2V5OidQbGVhc2UgaW5wdXQgeW91ciBnb29nbGUgQVBJIGtleSAoYmxhbmsgT0spJyxcbiAgICBhZGRQT0lDb252ZXRlcjonQ29udmVydCBQT0kgbmFtZSB0byBQT0kgdHlwZSAocmVxdWlyZXMgZ29vZ2xlIHBsYWNlIEFQSSB0b2tlbiknLFxuICAgIGFkZFByZWZGaWx0ZXI6J0FkZCBwcmVmZWN0dXJlIGZpbHRlcicsXG4gICAgYWRkUHJlZGVmaW5lZEZpbHRlcjonU2VsZWN0IGZyb20gcHJlZGVmaW5lZCBmaWx0ZXInLFxuICAgIGV4cG9ydFNldHRpbmc6J0V4cG9ydCBzZXR0aW5nJyxcbiAgICBoZWFkZXI6J0tlZXAgaGVhZGVyJyxcbiAgICBhZGRQT0lDb252ZXJ0ZXI6J0NvbnZlcnQgUE9JIG5hbWUgdG8gUE9JIHR5cGUnLFxuICAgIGFkZENvb3Jkc01vZGlmeTonTW9kaWZ5IGNvb3JkaW5hdGVzIGJhc2VkIG9uIHNpbXBsaWZpZWQgYWRkcmVzcycsXG4gICAgc3RhcnRUaW1lOidTZXQgcmVjb3JkaW5nIHN0YXJ0IHRpbWUgb2YgdGhlIGRheScsXG4gICAgZW5kVGltZTogJ1NldCByZWNvcmRpbmcgZW5kIHRpbWUgb2YgdGhlIGRheScsXG4gICAgc2V0R2VvbWV0cnlGaWx0ZXI6J1NldCBnZW9tZXRyeSBmaWx0ZXInLFxuICAgIHNldFN0YXJ0RGF0ZTonU2V0IGRhdGUgcmFuZ2Ugb2YgdGhlIGRhdGFzZXRzJyxcbiAgICBvdXRDb2x1bW46J1NldCBjb2x1bW5zIHRvIGV4cG9ydCdcbiAgfSxcbiAgc2lkZWJhcjoge1xuICAgIHBhbmVsczoge1xuICAgICAgbGF5ZXI6ICdMYXllcnMnLFxuICAgICAgZmlsdGVyOiAnRmlsdGVycycsXG4gICAgICBpbnRlcmFjdGlvbjogJ0ludGVyYWN0aW9ucycsXG4gICAgICBiYXNlbWFwOiAnQmFzZSBtYXAnLFxuICAgICAgcHJvY2VzczonUHJvY2Vzc29yJyxcbiAgICAgIGdtdHByb2Nlc3M6J0dNVCBQcm9jZXNzb3InLFxuICAgIH1cbiAgfSxcbiAgbGF5ZXI6IHtcbiAgICByZXF1aXJlZDogJ1JlcXVpcmVkKicsXG4gICAgcmFkaXVzOiAnUmFkaXVzJyxcbiAgICBjb2xvcjogJ0NvbG9yJyxcbiAgICBmaWxsQ29sb3I6ICdGaWxsIENvbG9yJyxcbiAgICBvdXRsaW5lOiAnT3V0bGluZScsXG4gICAgd2VpZ2h0OiAnV2VpZ2h0JyxcbiAgICBtZXNoc2l6ZTonTWVzaCBzZXR0aW5nJyxcbiAgICBwcm9wZXJ0eUJhc2VkT246ICd7cHJvcGVydHl9IGJhc2VkIG9uJyxcbiAgICBjb3ZlcmFnZTogJ0NvdmVyYWdlJyxcbiAgICBzdHJva2U6ICdTdHJva2UnLFxuICAgIHN0cm9rZVdpZHRoOiAnU3Ryb2tlIFdpZHRoJyxcbiAgICBzdHJva2VDb2xvcjogJ1N0cm9rZSBDb2xvcicsXG4gICAgYmFzaWM6ICdCYXNpYycsXG4gICAgdHJhaWxMZW5ndGg6ICdUcmFpbCBMZW5ndGgnLFxuICAgIHRyYWlsTGVuZ3RoRGVzY3JpcHRpb246ICdOdW1iZXIgb2Ygc2Vjb25kcyBmb3IgYSBwYXRoIHRvIGNvbXBsZXRlbHkgZmFkZSBvdXQnLFxuICAgIG5ld0xheWVyOiAnbmV3IGxheWVyJyxcbiAgICBlbGV2YXRpb25CeURlc2NyaXB0aW9uOiAnV2hlbiBvZmYsIGhlaWdodCBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnLFxuICAgIGNvbG9yQnlEZXNjcmlwdGlvbjogJ1doZW4gb2ZmLCBjb2xvciBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnLFxuICAgIGFnZ3JlZ2F0ZUJ5OiAnQWdncmVnYXRlIHtmaWVsZH0gYnknLFxuICAgICczRE1vZGVsJzogJzNEIE1vZGVsJyxcbiAgICAnM0RNb2RlbE9wdGlvbnMnOiAnM0QgTW9kZWwgT3B0aW9ucycsXG4gICAgdHlwZToge1xuICAgICAgcG9pbnQ6ICdwb2ludCcsXG4gICAgICBhcmM6ICdhcmMnLFxuICAgICAgbGluZTogJ2xpbmUnLFxuICAgICAgZ3JpZDogJ2dyaWQnLFxuICAgICAgaGV4YmluOiAnaGV4YmluJyxcbiAgICAgIHBvbHlnb246ICdwb2x5Z29uJyxcbiAgICAgIGdlb2pzb246ICdnZW9qc29uJyxcbiAgICAgIGNsdXN0ZXI6ICdjbHVzdGVyJyxcbiAgICAgIGljb246ICdpY29uJyxcbiAgICAgIGhlYXRtYXA6ICdoZWF0bWFwJyxcbiAgICAgIGhleGFnb246ICdoZXhhZ29uJyxcbiAgICAgIGhleGFnb25pZDogJ0gzJyxcbiAgICAgIHRyaXA6ICd0cmlwJyxcbiAgICAgIHMyOiAnUzInLFxuICAgICAgJzNkJzogJzNEJyxcbiAgICAgIG1lc2hhZ2c6J01lc2ggYWdncmVnYXRpb24nLFxuICAgICAgbWVzaGNvZGU6J0pJUyhJRCknXG5cbiAgICB9XG4gIH0sXG4gIGxheWVyVmlzQ29uZmlnczoge1xuICAgIGFuZ2xlOiAnQW5nbGUnLFxuICAgIHN0cm9rZVdpZHRoOiAnU3Ryb2tlIFdpZHRoIChQaXhlbHMpJyxcbiAgICBzdHJva2VXaWR0aFJhbmdlOiAnU3Ryb2tlIFdpZHRoIFJhbmdlJyxcbiAgICByYWRpdXM6ICdSYWRpdXMnLFxuICAgIGZpeGVkUmFkaXVzOiAnRml4ZWQgUmFkaXVzIHRvIG1ldGVyJyxcbiAgICBmaXhlZFJhZGl1c0Rlc2NyaXB0aW9uOiAnTWFwIHJhZGl1cyB0byBhYnNvbHV0ZSByYWRpdXMgaW4gbWV0ZXJzLCBlLmcuIDUgdG8gNSBtZXRlcnMnLFxuICAgIHJhZGl1c1JhbmdlOiAnUmFkaXVzIFJhbmdlJyxcbiAgICBjbHVzdGVyUmFkaXVzOiAnQ2x1c3RlciBSYWRpdXMgaW4gUGl4ZWxzJyxcbiAgICByYWRpdXNSYW5nZVBpeGVsczogJ1JhZGl1cyBSYW5nZSBpbiBwaXhlbHMnLFxuICAgIG9wYWNpdHk6ICdPcGFjaXR5JyxcbiAgICBjb3ZlcmFnZTogJ0NvdmVyYWdlJyxcbiAgICBvdXRsaW5lOiAnT3V0bGluZScsXG4gICAgY29sb3JSYW5nZTogJ0NvbG9yIHJhbmdlJyxcbiAgICBzdHJva2U6ICdTdHJva2UnLFxuICAgIHN0cm9rZUNvbG9yOiAnU3Ryb2tlIENvbG9yJyxcbiAgICBzdHJva2VDb2xvclJhbmdlOiAnU3Ryb2tlIENvbG9yIHJhbmdlJyxcbiAgICB0YXJnZXRDb2xvcjogJ1RhcmdldCBDb2xvcicsXG4gICAgY29sb3JBZ2dyZWdhdGlvbjogJ0NvbG9yIEFnZ3JlZ2F0aW9uJyxcbiAgICBoZWlnaHRBZ2dyZWdhdGlvbjogJ0hlaWdodCBBZ2dyZWdhdGlvbicsXG4gICAgcmVzb2x1dGlvblJhbmdlOiAnUmVzb2x1dGlvbiByYW5nZScsXG4gICAgc2l6ZVNjYWxlOiAnU2l6ZSBTY2FsZScsXG4gICAgd29ybGRVbml0U2l6ZTogJ1dvcmxkIFVuaXQgU2l6ZScsXG4gICAgZWxldmF0aW9uU2NhbGU6ICdFbGV2YXRpb24gU2NhbGUnLFxuICAgIGVuYWJsZUVsZXZhdGlvblpvb21GYWN0b3I6ICdVc2UgZWxldmF0aW9uIHpvb20gZmFjdG9yJyxcbiAgICBlbmFibGVFbGV2YXRpb25ab29tRmFjdG9yRGVzY3JpcHRpb246ICdBZGp1c3QgaGVpZ2h0L2VsZXZhdGlvbiBiYXNlZCBvbiBjdXJyZW50IHpvb20gZmFjdG9yJyxcbiAgICBlbmFibGVIZWlnaHRab29tRmFjdG9yOiAnVXNlIGhlaWdodCB6b29tIGZhY3RvcicsXG4gICAgaGVpZ2h0U2NhbGU6ICdIZWlnaHQgU2NhbGUnLFxuICAgIGNvdmVyYWdlUmFuZ2U6ICdDb3ZlcmFnZSBSYW5nZScsXG4gICAgaGlnaFByZWNpc2lvblJlbmRlcmluZzogJ0hpZ2ggUHJlY2lzaW9uIFJlbmRlcmluZycsXG4gICAgaGlnaFByZWNpc2lvblJlbmRlcmluZ0Rlc2NyaXB0aW9uOiAnSGlnaCBwcmVjaXNpb24gd2lsbCByZXN1bHQgaW4gc2xvd2VyIHBlcmZvcm1hbmNlJyxcbiAgICBoZWlnaHQ6ICdIZWlnaHQnLFxuICAgIGhlaWdodERlc2NyaXB0aW9uOiAnQ2xpY2sgYnV0dG9uIGF0IHRvcCByaWdodCBvZiB0aGUgbWFwIHRvIHN3aXRjaCB0byAzZCB2aWV3JyxcbiAgICBmaWxsOiAnRmlsbCcsXG4gICAgbGV2ZWw6J01lc2ggbGV2ZWwnLFxuICAgIGVuYWJsZVBvbHlnb25IZWlnaHQ6ICdFbmFibGUgUG9seWdvbiBIZWlnaHQnLFxuICAgIHNob3dXaXJlZnJhbWU6ICdTaG93IFdpcmVmcmFtZScsXG4gICAgd2VpZ2h0SW50ZW5zaXR5OiAnV2VpZ2h0IEludGVuc2l0eScsXG4gICAgem9vbVNjYWxlOiAnWm9vbSBTY2FsZScsXG4gICAgaGVpZ2h0UmFuZ2U6ICdIZWlnaHQgUmFuZ2UnLFxuICAgIGhlaWdodE11bHRpcGxpZXI6ICdIZWlnaHQgTXVsdGlwbGllcidcbiAgfSxcbiAgbGF5ZXJNYW5hZ2VyOiB7XG4gICAgYWRkRGF0YTogJ0FkZCBEYXRhJyxcbiAgICBhZGRMYXllcjogJ0FkZCBMYXllcicsXG4gICAgbGF5ZXJCbGVuZGluZzogJ0xheWVyIEJsZW5kaW5nJ1xuICB9LFxuICBtYXBNYW5hZ2VyOiB7XG4gICAgbWFwU3R5bGU6ICdNYXAgc3R5bGUnLFxuICAgIGFkZE1hcFN0eWxlOiAnQWRkIE1hcCBTdHlsZScsXG4gICAgJzNkQnVpbGRpbmdDb2xvcic6ICczRCBCdWlsZGluZyBDb2xvcidcbiAgfSxcbiAgbGF5ZXJDb25maWd1cmF0aW9uOiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnQ2FsY3VsYXRlIHtwcm9wZXJ0eX0gYmFzZWQgb24gc2VsZWN0ZWQgZmllbGQnLFxuICAgIGhvd1RvOiAnSG93IHRvJ1xuICB9LFxuICBmaWx0ZXJNYW5hZ2VyOiB7XG4gICAgYWRkRmlsdGVyOiAnQWRkIEZpbHRlcidcbiAgfSxcbiAgZGF0YXNldFRpdGxlOiB7XG4gICAgc2hvd0RhdGFUYWJsZTogJ1Nob3cgZGF0YSB0YWJsZScsXG4gICAgcmVtb3ZlRGF0YXNldDogJ1JlbW92ZSBkYXRhc2V0J1xuICB9LFxuICBkYXRhc2V0SW5mbzoge1xuICAgIHJvd0NvdW50OiAne3Jvd0NvdW50fSByb3dzJ1xuICB9LFxuICB0b29sdGlwOiB7XG4gICAgaGlkZUxheWVyOiAnaGlkZSBsYXllcicsXG4gICAgc2hvd0xheWVyOiAnc2hvdyBsYXllcicsXG4gICAgaGlkZUZlYXR1cmU6ICdIaWRlIEZlYXR1cmUnLFxuICAgIHNob3dGZWF0dXJlOiAnU2hvdyBmZWF0dXJlJyxcbiAgICBoaWRlOiAnaGlkZScsXG4gICAgc2hvdzogJ3Nob3cnLFxuICAgIHJlbW92ZUxheWVyOiAnUmVtb3ZlIGxheWVyJyxcbiAgICBkdXBsaWNhdGVMYXllcjogJ0R1cGxpY2F0ZSBsYXllcicsXG4gICAgbGF5ZXJTZXR0aW5nczogJ0xheWVyIHNldHRpbmdzJyxcbiAgICBjbG9zZVBhbmVsOiAnQ2xvc2UgY3VycmVudCBwYW5lbCcsXG4gICAgc3dpdGNoVG9EdWFsVmlldzogJ1N3aXRjaCB0byBkdWFsIG1hcCB2aWV3JyxcbiAgICBzaG93TGVnZW5kOiAnc2hvdyBsZWdlbmQnLFxuICAgIGRpc2FibGUzRE1hcDogJ0Rpc2FibGUgM0QgTWFwJyxcbiAgICBEcmF3T25NYXA6ICdEcmF3IG9uIG1hcCcsXG4gICAgc2VsZWN0TG9jYWxlOiAnU2VsZWN0IGxvY2FsZScsXG4gICAgaGlkZUxheWVyUGFuZWw6ICdIaWRlIGxheWVyIHBhbmVsJyxcbiAgICBzaG93TGF5ZXJQYW5lbDogJ1Nob3cgbGF5ZXIgcGFuZWwnLFxuICAgIG1vdmVUb1RvcDogJ01vdmUgdG8gdG9wIG9mIGRhdGEgbGF5ZXJzJyxcbiAgICBzZWxlY3RCYXNlTWFwU3R5bGU6ICdTZWxlY3QgQmFzZSBNYXAgU3R5bGUnLFxuICAgIGRlbGV0ZTogJ0RlbGV0ZScsXG4gICAgdGltZVBsYXliYWNrOiAnVGltZSBQbGF5YmFjaycsXG4gICAgY2xvdWRTdG9yYWdlOiAnQ2xvdWQgU3RvcmFnZScsXG4gICAgJzNETWFwJzogJzNEIE1hcCcsXG4gICAgYW5pbWF0aW9uQnlXaW5kb3c6ICdNb3ZpbmcgVGltZSBXaW5kb3cnLFxuICAgIGFuaW1hdGlvbkJ5SW5jcmVtZW50YWw6ICdJbmNyZW1lbnRhbCBUaW1lIFdpbmRvdycsXG4gICAgc3BlZWQ6ICdzcGVlZCcsXG4gICAgcGxheTogJ3BsYXknLFxuICAgIHBhdXNlOiAncGF1c2UnLFxuICAgIHJlc2V0OiAncmVzZXQnXG4gIH0sXG4gIHRvb2xiYXI6IHtcbiAgICBleHBvcnRJbWFnZTogJ0V4cG9ydCBJbWFnZScsXG4gICAgZXhwb3J0RGF0YTogJ0V4cG9ydCBEYXRhJyxcbiAgICBleHBvcnRNYXA6ICdFeHBvcnQgTWFwJyxcbiAgICBzaGFyZU1hcFVSTDogJ1NoYXJlIE1hcCBVUkwnLFxuICAgIHNhdmVNYXA6ICdTYXZlIE1hcCcsXG4gICAgc2VsZWN0OiAnU2VsZWN0JyxcbiAgICBwb2x5Z29uOiAnUG9seWdvbicsXG4gICAgcmVjdGFuZ2xlOiAnUmVjdGFuZ2xlJyxcbiAgICBoaWRlOiAnSGlkZScsXG4gICAgc2hvdzogJ1Nob3cnLFxuICAgIC4uLkxPQ0FMRVNcbiAgfSxcbiAgZWRpdG9yOiB7XG4gICAgZmlsdGVyTGF5ZXI6ICdGaWx0ZXIgTGF5ZXJzJyxcbiAgICBjb3B5R2VvbWV0cnk6ICdDb3B5IEdlb21ldHJ5J1xuICB9LFxuXG4gIG1vZGFsOiB7XG4gICAgdGl0bGU6IHtcbiAgICAgIGRlbGV0ZURhdGFzZXQ6ICdEZWxldGUgRGF0YXNldCcsXG4gICAgICBhZGREYXRhVG9NYXA6ICdBZGQgRGF0YSBUbyBNYXAnLFxuICAgICAgZXhwb3J0SW1hZ2U6ICdFeHBvcnQgSW1hZ2UnLFxuICAgICAgZXhwb3J0RGF0YTogJ0V4cG9ydCBEYXRhJyxcbiAgICAgIGV4cG9ydE1hcDogJ0V4cG9ydCBNYXAnLFxuICAgICAgYWRkQ3VzdG9tTWFwYm94U3R5bGU6ICdBZGQgQ3VzdG9tIE1hcCBTdHlsZScsXG4gICAgICBzYXZlTWFwOiAnU2F2ZSBNYXAnLFxuICAgICAgc2hhcmVVUkw6ICdTaGFyZSBVUkwnXG4gICAgfSxcbiAgICBidXR0b246IHtcbiAgICAgIGRlbGV0ZTogJ0RlbGV0ZScsXG4gICAgICBkb3dubG9hZDogJ0Rvd25sb2FkJyxcbiAgICAgIGV4cG9ydDogJ0V4cG9ydCcsXG4gICAgICBhZGRTdHlsZTogJ0FkZCBTdHlsZScsXG4gICAgICBzYXZlOiAnU2F2ZScsXG4gICAgICBkZWZhdWx0Q2FuY2VsOiAnQ2FuY2VsJyxcbiAgICAgIGRlZmF1bHRDb25maXJtOiAnQ29uZmlybSdcbiAgICB9LFxuICAgIGV4cG9ydEltYWdlOiB7XG4gICAgICByYXRpb1RpdGxlOiAnUmF0aW8nLFxuICAgICAgcmF0aW9EZXNjcmlwdGlvbjogJ0Nob29zZSB0aGUgcmF0aW8gZm9yIHZhcmlvdXMgdXNhZ2VzLicsXG4gICAgICByYXRpb09yaWdpbmFsU2NyZWVuOiAnT3JpZ2luYWwgU2NyZWVuJyxcbiAgICAgIHJhdGlvQ3VzdG9tOiAnQ3VzdG9tJyxcbiAgICAgIHJhdGlvNF8zOiAnNDozJyxcbiAgICAgIHJhdGlvMTZfOTogJzE2OjknLFxuICAgICAgcmVzb2x1dGlvblRpdGxlOiAnUmVzb2x1dGlvbicsXG4gICAgICByZXNvbHV0aW9uRGVzY3JpcHRpb246ICdIaWdoIHJlc29sdXRpb24gaXMgYmV0dGVyIGZvciBwcmludHMuJyxcbiAgICAgIG1hcExlZ2VuZFRpdGxlOiAnTWFwIExlZ2VuZCcsXG4gICAgICBtYXBMZWdlbmRBZGQ6ICdBZGQgbGVnZW5kIG9uIG1hcCdcbiAgICB9LFxuICAgIGV4cG9ydERhdGE6IHtcbiAgICAgIGRhdGFzZXRUaXRsZTogJ0RhdGFzZXQnLFxuICAgICAgZGF0YXNldFN1YnRpdGxlOiAnQ2hvb3NlIHRoZSBkYXRhc2V0cyB5b3Ugd2FudCB0byBleHBvcnQnLFxuICAgICAgYWxsRGF0YXNldHM6ICdBbGwnLFxuICAgICAgZGF0YVR5cGVUaXRsZTogJ0RhdGEgVHlwZScsXG4gICAgICBkYXRhVHlwZVN1YnRpdGxlOiAnQ2hvb3NlIHRoZSB0eXBlIG9mIGRhdGEgeW91IHdhbnQgdG8gZXhwb3J0JyxcbiAgICAgIGZpbHRlckRhdGFUaXRsZTogJ0ZpbHRlciBEYXRhJyxcbiAgICAgIGZpbHRlckRhdGFTdWJ0aXRsZTogJ1lvdSBjYW4gY2hvb3NlIGV4cG9ydGluZyBvcmlnaW5hbCBkYXRhIG9yIGZpbHRlcmVkIGRhdGEnLFxuICAgICAgZmlsdGVyZWREYXRhOiAnRmlsdGVyZWQgZGF0YScsXG4gICAgICB1bmZpbHRlcmVkRGF0YTogJ1VuZmlsdGVyZWQgRGF0YScsXG4gICAgICBmaWxlQ291bnQ6ICd7ZmlsZUNvdW50fSBGaWxlcycsXG4gICAgICByb3dDb3VudDogJ3tyb3dDb3VudH0gUm93cydcbiAgICB9LFxuICAgIGRlbGV0ZURhdGE6IHtcbiAgICAgIHdhcm5pbmc6ICd5b3UgYXJlIGdvaW5nIHRvIGRlbGV0ZSB0aGlzIGRhdGFzZXQuIEl0IHdpbGwgYWZmZWN0IHtsZW5ndGh9IGxheWVycydcbiAgICB9LFxuICAgIGFkZFN0eWxlOiB7XG4gICAgICBwdWJsaXNoVGl0bGU6XG4gICAgICAgICcyLiBJZiBlbnRlcmVkIG1hcGJveCBzdHVsZSB1cmwgaW4gc3RlcC4xLCBwdWJsaXNoIHlvdXIgc3R5bGUgYXQgbWFwYm94IG9yIHByb3ZpZGUgYWNjZXNzIHRva2VuLiAoT3B0aW9uYWwpJyxcbiAgICAgIHB1Ymxpc2hTdWJ0aXRsZTE6ICdZb3UgY2FuIGNyZWF0ZSB5b3VyIG93biBtYXAgc3R5bGUgYXQnLFxuICAgICAgcHVibGlzaFN1YnRpdGxlMjogJ2FuZCcsXG4gICAgICBwdWJsaXNoU3VidGl0bGUzOiAncHVibGlzaCcsXG4gICAgICBwdWJsaXNoU3VidGl0bGU0OiAnaXQuJyxcbiAgICAgIHB1Ymxpc2hTdWJ0aXRsZTU6ICdUbyB1c2UgcHJpdmF0ZSBzdHlsZSwgcGFzdGUgeW91cicsXG4gICAgICBwdWJsaXNoU3VidGl0bGU2OiAnYWNjZXNzIHRva2VuJyxcbiAgICAgIHB1Ymxpc2hTdWJ0aXRsZTc6XG4gICAgICAgICdoZXJlLiAqa2VwbGVyLmdsIGlzIGEgY2xpZW50LXNpZGUgYXBwbGljYXRpb24sIGRhdGEgc3RheXMgaW4geW91ciBicm93c2VyLi4nLFxuICAgICAgZXhhbXBsZVRva2VuOiAnZS5nLiBway5hYmNkZWZnLnh4eHh4eCcsXG4gICAgICBwYXN0ZVRpdGxlOiAnMS4gUGFzdGUgc3R5bGUgdXJsJyxcbiAgICAgIHBhc3RlU3VidGl0bGUwOiAnU3R5bGUgdXJsIGNhbiBiZSBhIG1hcGJveCcsXG4gICAgICBwYXN0ZVN1YnRpdGxlMTogJ1doYXQgaXMgYScsXG4gICAgICBwYXN0ZVN1YnRpdGxlMjogJ3N0eWxlIFVSTCcsXG4gICAgICBwYXN0ZVN1YnRpdGxlMzogJ29yIGEgc3R5bGUuanNvbiB1c2luZyB0aGUnLFxuICAgICAgcGFzdGVTdWJ0aXRsZTQ6ICdNYXBib3ggR0wgU3R5bGUgU3BlYycsXG4gICAgICBuYW1pbmdUaXRsZTogJzMuIE5hbWUgeW91ciBzdHlsZSdcbiAgICB9LFxuICAgIHNoYXJlTWFwOiB7XG4gICAgICBzaGFyZVVyaVRpdGxlOiAnU2hhcmUgTWFwIFVybCcsXG4gICAgICBzaGFyZVVyaVN1YnRpdGxlOiAnR2VuZXJhdGUgYSBtYXAgdXJsIHRvIHNoYXJlIHdpdGggb3RoZXJzJyxcbiAgICAgIGNsb3VkVGl0bGU6ICdDbG91ZCBzdG9yYWdlJyxcbiAgICAgIGNsb3VkU3VidGl0bGU6ICdMb2dpbiBhbmQgdXBsb2FkIG1hcCBkYXRhIHRvIHlvdXIgcGVyc29uYWwgY2xvdWQgc3RvcmFnZScsXG4gICAgICBzaGFyZURpc2NsYWltZXI6XG4gICAgICAgICdrZXBsZXIuZ2wgd2lsbCBzYXZlIHlvdXIgbWFwIGRhdGEgdG8geW91ciBwZXJzb25hbCBjbG91ZCBzdG9yYWdlLCBvbmx5IHBlb3BsZSB3aXRoIHRoZSBVUkwgY2FuIGFjY2VzcyB5b3VyIG1hcCBhbmQgZGF0YS4gJyArXG4gICAgICAgICdZb3UgY2FuIGVkaXQvZGVsZXRlIHRoZSBkYXRhIGZpbGUgaW4geW91ciBjbG91ZCBhY2NvdW50IGFueXRpbWUuJyxcbiAgICAgIGdvdG9QYWdlOiAnR28gdG8geW91ciBLZXBsZXIuZ2wge2N1cnJlbnRQcm92aWRlcn0gcGFnZSdcbiAgICB9LFxuICAgIHN0YXR1c1BhbmVsOiB7XG4gICAgICBtYXBVcGxvYWRpbmc6ICdNYXAgVXBsb2FkaW5nJyxcbiAgICAgIGVycm9yOiAnRXJyb3InXG4gICAgfSxcbiAgICBzYXZlTWFwOiB7XG4gICAgICB0aXRsZTogJ0Nsb3VkIHN0b3JhZ2UnLFxuICAgICAgc3VidGl0bGU6ICdMb2dpbiB0byBzYXZlIG1hcCB0byB5b3VyIHBlcnNvbmFsIGNsb3VkIHN0b3JhZ2UnXG4gICAgfSxcbiAgICBleHBvcnRNYXA6IHtcbiAgICAgIGZvcm1hdFRpdGxlOiAnTWFwIGZvcm1hdCcsXG4gICAgICBmb3JtYXRTdWJ0aXRsZTogJ0Nob29zZSB0aGUgZm9ybWF0IHRvIGV4cG9ydCB5b3VyIG1hcCB0bycsXG4gICAgICBodG1sOiB7XG4gICAgICAgIHNlbGVjdGlvbjogJ0V4cG9ydCB5b3VyIG1hcCBpbnRvIGFuIGludGVyYWN0aXZlIGh0bWwgZmlsZS4nLFxuICAgICAgICB0b2tlblRpdGxlOiAnTWFwYm94IGFjY2VzcyB0b2tlbicsXG4gICAgICAgIHRva2VuU3VidGl0bGU6ICdVc2UgeW91ciBvd24gTWFwYm94IGFjY2VzcyB0b2tlbiBpbiB0aGUgaHRtbCAob3B0aW9uYWwpJyxcbiAgICAgICAgdG9rZW5QbGFjZWhvbGRlcjogJ1Bhc3RlIHlvdXIgTWFwYm94IGFjY2VzcyB0b2tlbicsXG4gICAgICAgIHRva2VuTWlzdXNlV2FybmluZzpcbiAgICAgICAgICAnKiBJZiB5b3UgZG8gbm90IHByb3ZpZGUgeW91ciBvd24gdG9rZW4sIHRoZSBtYXAgbWF5IGZhaWwgdG8gZGlzcGxheSBhdCBhbnkgdGltZSB3aGVuIHdlIHJlcGxhY2Ugb3VycyB0byBhdm9pZCBtaXN1c2UuICcsXG4gICAgICAgIHRva2VuRGlzY2xhaW1lcjogJ1lvdSBjYW4gY2hhbmdlIHRoZSBNYXBib3ggdG9rZW4gbGF0ZXIgdXNpbmcgdGhlIGZvbGxvd2luZyBpbnN0cnVjdGlvbnM6ICcsXG4gICAgICAgIHRva2VuVXBkYXRlOiAnSG93IHRvIHVwZGF0ZSBhbiBleGlzdGluZyBtYXAgdG9rZW4uJyxcbiAgICAgICAgbW9kZVRpdGxlOiAnTWFwIE1vZGUnLFxuICAgICAgICBtb2RlU3VidGl0bGUxOiAnU2VsZWN0IHRoZSBhcHAgbW9kZS4gTW9yZSAnLFxuICAgICAgICBtb2RlU3VidGl0bGUyOiAnaW5mbycsXG4gICAgICAgIG1vZGVEZXNjcmlwdGlvbjogJ0FsbG93IHVzZXJzIHRvIHttb2RlfSB0aGUgbWFwJyxcbiAgICAgICAgcmVhZDogJ3JlYWQnLFxuICAgICAgICBlZGl0OiAnZWRpdCdcbiAgICAgIH0sXG4gICAgICBqc29uOiB7XG4gICAgICAgIGNvbmZpZ1RpdGxlOiAnTWFwIENvbmZpZycsXG4gICAgICAgIGNvbmZpZ0Rpc2NsYWltZXI6XG4gICAgICAgICAgJ01hcCBjb25maWcgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgSnNvbiBmaWxlLiBJZiB5b3UgYXJlIHVzaW5nIGtlcGxlci5nbCBpbiB5b3VyIG93biBhcHAuIFlvdSBjYW4gY29weSB0aGlzIGNvbmZpZyBhbmQgcGFzcyBpdCB0byAnLFxuICAgICAgICBzZWxlY3Rpb246XG4gICAgICAgICAgJ0V4cG9ydCBjdXJyZW50IG1hcCBkYXRhIGFuZCBjb25maWcgaW50byBhIHNpbmdsZSBKc29uIGZpbGUuIFlvdSBjYW4gbGF0ZXIgb3BlbiB0aGUgc2FtZSBtYXAgYnkgdXBsb2FkaW5nIHRoaXMgZmlsZSB0byBrZXBsZXIuZ2wuJyxcbiAgICAgICAgZGlzY2xhaW1lcjpcbiAgICAgICAgICAnKiBNYXAgY29uZmlnIGlzIGNvdXBsZWQgd2l0aCBsb2FkZWQgZGF0YXNldHMuIOKAmGRhdGFJZOKAmSBpcyB1c2VkIHRvIGJpbmQgbGF5ZXJzLCBmaWx0ZXJzLCBhbmQgdG9vbHRpcHMgdG8gYSBzcGVjaWZpYyBkYXRhc2V0LiAnICtcbiAgICAgICAgICAnV2hlbiBwYXNzaW5nIHRoaXMgY29uZmlnIHRvIGFkZERhdGFUb01hcCwgbWFrZSBzdXJlIHRoZSBkYXRhc2V0IGlkIG1hdGNoZXMgdGhlIGRhdGFJZC9zIGluIHRoaXMgY29uZmlnLidcbiAgICAgIH1cbiAgICB9LFxuICAgIGxvYWRpbmdEaWFsb2c6IHtcbiAgICAgIGxvYWRpbmc6ICdMb2FkaW5nLi4uJ1xuICAgIH0sXG4gICAgbG9hZERhdGE6IHtcbiAgICAgIHVwbG9hZDogJ0xvYWQgRmlsZXMnLFxuICAgICAgc3RvcmFnZTogJ0xvYWQgZnJvbSBTdG9yYWdlJ1xuICAgIH0sXG4gICAgdHJpcEluZm86IHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIGVuYWJsZSB0cmlwIGFuaW1hdGlvbicsXG4gICAgICBkZXNjcmlwdGlvbjE6XG4gICAgICAgICdJbiBvcmRlciB0byBhbmltYXRlIHRoZSBwYXRoLCB0aGUgZ2VvSlNPTiBkYXRhIG5lZWRzIHRvIGNvbnRhaW4gYExpbmVTdHJpbmdgIGluIGl0cyBmZWF0dXJlIGdlb21ldHJ5LCBhbmQgdGhlIGNvb3JkaW5hdGVzIGluIHRoZSBMaW5lU3RyaW5nIG5lZWQgdG8gaGF2ZSA0IGVsZW1lbnRzIGluIHRoZSBmb3JtYXRzIG9mJyxcbiAgICAgIGNvZGU6ICcgW2xvbmdpdHVkZSwgbGF0aXR1ZGUsIGFsdGl0dWRlLCB0aW1lc3RhbXBdICcsXG4gICAgICBkZXNjcmlwdGlvbjI6XG4gICAgICAgICd3aXRoIHRoZSBsYXN0IGVsZW1lbnQgYmVpbmcgYSB0aW1lc3RhbXAuIFZhbGlkIHRpbWVzdGFtcCBmb3JtYXRzIGluY2x1ZGUgdW5peCBpbiBzZWNvbmRzIHN1Y2ggYXMgYDE1NjQxODQzNjNgIG9yIGluIG1pbGxpc2Vjb25kcyBzdWNoIGFzIGAxNTY0MTg0MzYzMDAwYC4nLFxuICAgICAgZXhhbXBsZTogJ0V4YW1wbGU6J1xuICAgIH0sXG4gICAgaWNvbkluZm86IHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIGRyYXcgaWNvbnMnLFxuICAgICAgZGVzY3JpcHRpb24xOlxuICAgICAgICAnSW4geW91ciBjc3YsIGNyZWF0ZSBhIGNvbHVtbiwgcHV0IHRoZSBuYW1lIG9mIHRoZSBpY29uIHlvdSB3YW50IHRvIGRyYXcgaW4gaXQuIFlvdSBjYW4gbGVhdmUgdGhlIGNlbGwgZW1wdHkgaWYgeW91IGRvIG5vdCB3YW50IHRoZSBpY29uIHRvIHNob3cgZm9yIHNvbWUgcG9pbnRzLiBXaGVuIHRoZSBjb2x1bW4gaXMgbmFtZWQnLFxuICAgICAgY29kZTogJ2ljb24nLFxuICAgICAgZGVzY3JpcHRpb24yOiAnIGtlcGxlci5nbCB3aWxsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGEgaWNvbiBsYXllciBmb3IgeW91LicsXG4gICAgICBleGFtcGxlOiAnRXhhbXBsZTonLFxuICAgICAgaWNvbnM6ICdJY29ucydcbiAgICB9LFxuICAgIHN0b3JhZ2VNYXBWaWV3ZXI6IHtcbiAgICAgIGxhc3RNb2RpZmllZDogJ0xhc3QgbW9kaWZpZWQge2xhc3RVcGRhdGVkfSBhZ28nLFxuICAgICAgYmFjazogJ0JhY2snXG4gICAgfSxcbiAgICBvdmVyd3JpdGVNYXA6IHtcbiAgICAgIHRpdGxlOiAnU2F2aW5nIG1hcC4uLicsXG4gICAgICBhbHJlYWR5RXhpc3RzOiAnYWxyZWFkeSBleGlzdHMgaW4geW91ciB7bWFwU2F2ZWR9LiBXb3VsZCB5b3UgbGlrZSB0byBvdmVyd3JpdGUgaXQ/J1xuICAgIH0sXG4gICAgbG9hZFN0b3JhZ2VNYXA6IHtcbiAgICAgIGJhY2s6ICdCYWNrJyxcbiAgICAgIGdvVG9QYWdlOiAnR28gdG8geW91ciBLZXBsZXIuZ2wge2Rpc3BsYXlOYW1lfSBwYWdlJyxcbiAgICAgIHN0b3JhZ2VNYXBzOiAnU3RvcmFnZSAvIE1hcHMnLFxuICAgICAgbm9TYXZlZE1hcHM6ICdObyBzYXZlZCBtYXBzIHlldCdcbiAgICB9XG4gIH0sXG4gIGhlYWRlcjoge1xuICAgIHZpc2libGVMYXllcnM6ICdWaXNpYmxlIGxheWVycycsXG4gICAgbGF5ZXJMZWdlbmQ6ICdMYXllciBMZWdlbmQnXG4gIH0sXG4gIGludGVyYWN0aW9uczoge1xuICAgIHRvb2x0aXA6ICdUb29sdGlwJyxcbiAgICBicnVzaDogJ0JydXNoJyxcbiAgICBjb29yZGluYXRlOiAnQ29vcmRpbmF0ZXMnLFxuICAgIGdlb2NvZGVyOiAnR2VvY29kZXInXG4gIH0sXG4gIGxheWVyQmxlbmRpbmc6IHtcbiAgICB0aXRsZTogJ0xheWVyIEJsZW5kaW5nJyxcbiAgICBhZGRpdGl2ZTogJ2FkZGl0aXZlJyxcbiAgICBub3JtYWw6ICdub3JtYWwnLFxuICAgIHN1YnRyYWN0aXZlOiAnc3VidHJhY3RpdmUnXG4gIH0sXG4gIGNvbHVtbnM6IHtcbiAgICB0aXRsZTogJ0NvbHVtbnMnLFxuICAgIGxhdDogJ2xhdCcsXG4gICAgbG5nOiAnbG9uJyxcbiAgICBhbHRpdHVkZTogJ2FsdGl0dWRlJyxcbiAgICBpY29uOiAnaWNvbicsXG4gICAgZ2VvanNvbjogJ2dlb2pzb24nLFxuICAgIHRva2VuOiAndG9rZW4nLFxuICAgIGFyYzoge1xuICAgICAgbGF0MDogJ3NvdXJjZSBsYXQnLFxuICAgICAgbG5nMDogJ3NvdXJjZSBsbmcnLFxuICAgICAgbGF0MTogJ3RhcmdldCBsYXQnLFxuICAgICAgbG5nMTogJ3RhcmdldCBsbmcnXG4gICAgfSxcbiAgICBsaW5lOiB7XG4gICAgICBhbHQwOiAnc291cmNlIGFsdGl0dWRlJyxcbiAgICAgIGFsdDE6ICd0YXJnZXQgYWx0aXR1ZGUnXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB3b3JsZFVuaXRTaXplOiAnR3JpZCBTaXplIChrbSknXG4gICAgfSxcbiAgICBoZXhhZ29uOiB7XG4gICAgICB3b3JsZFVuaXRTaXplOiAnSGV4YWdvbiBSYWRpdXMgKGttKSdcbiAgICB9LFxuICAgIG1lc2hhZ2c6J21lc2hhZ2cnLFxuICAgIG1lc2hDb2RlU2l6ZTonTWVzaCBMZXZlbCcsXG4gICAgaGV4X2lkOiAnaGV4IGlkJyxcbiAgICBtZXNoY29kZTonbWVzaGNvZGUnLFxuXG4gIH0sXG4gIGNvbG9yOiB7XG4gICAgY3VzdG9tUGFsZXR0ZTogJ0N1c3RvbSBQYWxldHRlJyxcbiAgICBzdGVwczogJ3N0ZXBzJyxcbiAgICB0eXBlOiAndHlwZScsXG4gICAgcmV2ZXJzZWQ6ICdyZXZlcnNlZCdcbiAgfSxcbiAgc2NhbGU6IHtcbiAgICBjb2xvclNjYWxlOiAnQ29sb3IgU2NhbGUnLFxuICAgIHNpemVTY2FsZTogJ1NpemUgU2NhbGUnLFxuICAgIHN0cm9rZVNjYWxlOiAnU3Ryb2tlIFNjYWxlJyxcbiAgICBzY2FsZTogJ1NjYWxlJ1xuICB9LFxuICBmaWxlVXBsb2FkZXI6IHtcbiAgICBtZXNzYWdlOiAnRHJhZyAmIERyb3AgWW91ciBGaWxlKHMpIEhlcmUnLFxuICAgIGNocm9tZU1lc3NhZ2U6XG4gICAgICAnKkNocm9tZSB1c2VyOiBMaW1pdCBmaWxlIHNpemUgdG8gMjUwbWIsIGlmIG5lZWQgdG8gdXBsb2FkIGxhcmdlciBmaWxlLCB0cnkgU2FmYXJpJyxcbiAgICBkaXNjbGFpbWVyOlxuICAgICAgJyprZXBsZXIuZ2wgaXMgYSBjbGllbnQtc2lkZSBhcHBsaWNhdGlvbiB3aXRoIG5vIHNlcnZlciBiYWNrZW5kLiBEYXRhIGxpdmVzIG9ubHkgb24geW91ciBtYWNoaW5lL2Jyb3dzZXIuICcgK1xuICAgICAgJ05vIGluZm9ybWF0aW9uIG9yIG1hcCBkYXRhIGlzIHNlbnQgdG8gYW55IHNlcnZlci4nLFxuICAgIGNvbmZpZ1VwbG9hZE1lc3NhZ2U6XG4gICAgICAnVXBsb2FkIHtmaWxlRm9ybWF0TmFtZXN9IG9yIHNhdmVkIG1hcCAqKkpzb24qKi4gUmVhZCBtb3JlIGFib3V0IFsqKnN1cHBvcnRlZCBmaWxlIGZvcm1hdHMqKl0nLFxuICAgIGJyb3dzZUZpbGVzOiAnYnJvd3NlIHlvdXIgZmlsZXMnLFxuICAgIHVwbG9hZGluZzogJ1VwbG9hZGluZycsXG4gICAgZmlsZU5vdFN1cHBvcnRlZDogJ0ZpbGUge2Vycm9yRmlsZXN9IGlzIG5vdCBzdXBwb3J0ZWQuJyxcbiAgICBvcjogJ29yJ1xuICB9LFxuICBnZW9jb2Rlcjoge1xuICAgIHRpdGxlOiAnRW50ZXIgYW4gYWRkcmVzcyBvciBjb29yZGluYXRlcywgZXggMzcuNzksLTEyMi40MCdcbiAgfSxcbiAgZmllbGRTZWxlY3Rvcjoge1xuICAgIGNsZWFyQWxsOiAnQ2xlYXIgQWxsJyxcbiAgICBmb3JtYXR0aW5nOiAnRm9ybWF0dGluZydcbiAgfSxcbiAgY29tcGFyZToge1xuICAgIG1vZGVMYWJlbDogJ0NvbXBhcmlzb24gTW9kZScsXG4gICAgdHlwZUxhYmVsOiAnQ29tcGFyaXNvbiBUeXBlJyxcbiAgICB0eXBlczoge1xuICAgICAgYWJzb2x1dGU6ICdBYnNvbHV0ZScsXG4gICAgICByZWxhdGl2ZTogJ1JlbGF0aXZlJ1xuICAgIH1cbiAgfSxcbiAgbWFwUG9wb3Zlcjoge1xuICAgIHByaW1hcnk6ICdQcmltYXJ5J1xuICB9LFxuICBkZW5zaXR5OiAnZGVuc2l0eScsXG4gICdCdWcgUmVwb3J0JzogJ0J1ZyBSZXBvcnQnLFxuICAnVXNlciBHdWlkZSc6ICdVc2VyIEd1aWRlJyxcbiAgU2F2ZTogJ1NhdmUnLFxuICBTaGFyZTogJ1NoYXJlJ1xufTtcbiJdfQ==