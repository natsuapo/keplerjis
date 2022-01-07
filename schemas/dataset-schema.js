"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash.pick"));

var _window = require("global/window");

var _versions = require("./versions");

var _schema = _interopRequireDefault(require("./schema"));

var _dataProcessor = require("../processors/data-processor");

var _datasetSchema;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// version v0
var fieldPropertiesV0 = {
  name: null,
  type: null
};
var fieldPropertiesV1 = {
  name: null,
  type: null,
  format: null,
  analyzerType: null
};

var FieldSchema = /*#__PURE__*/function (_Schema) {
  (0, _inherits2["default"])(FieldSchema, _Schema);

  var _super = _createSuper(FieldSchema);

  function FieldSchema() {
    (0, _classCallCheck2["default"])(this, FieldSchema);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(FieldSchema, [{
    key: "save",
    value: function save(fields) {
      var _this = this;

      return (0, _defineProperty2["default"])({}, this.key, fields.map(function (f) {
        return _this.savePropertiesOrApplySchema(f)[_this.key];
      }));
    }
  }, {
    key: "load",
    value: function load(fields) {
      return (0, _defineProperty2["default"])({}, this.key, fields);
    }
  }]);
  return FieldSchema;
}(_schema["default"]);

var propertiesV0 = {
  id: null,
  label: null,
  color: null,
  allData: null,
  fields: new FieldSchema({
    key: 'fields',
    version: _versions.VERSIONS.v0,
    properties: fieldPropertiesV0
  })
};

var propertiesV1 = _objectSpread(_objectSpread({}, propertiesV0), {}, {
  fields: new FieldSchema({
    key: 'fields',
    version: _versions.VERSIONS.v1,
    properties: fieldPropertiesV1
  })
});

var DatasetSchema = /*#__PURE__*/function (_Schema2) {
  (0, _inherits2["default"])(DatasetSchema, _Schema2);

  var _super2 = _createSuper(DatasetSchema);

  function DatasetSchema() {
    var _this2;

    (0, _classCallCheck2["default"])(this, DatasetSchema);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "key", 'dataset');
    return _this2;
  }

  (0, _createClass2["default"])(DatasetSchema, [{
    key: "save",
    value: function save(dataset) {
      var datasetFlattened = dataset.dataContainer ? _objectSpread(_objectSpread({}, dataset), {}, {
        allData: dataset.dataContainer.flattenData()
      }) : dataset;
      return this.savePropertiesOrApplySchema(datasetFlattened)[this.key];
    }
  }, {
    key: "load",
    value: function load(dataset) {
      var fields = dataset.fields,
          allData = dataset.allData;
      var updatedFields = fields; // recalculate field type
      // because we have updated type-analyzer
      // we need to add format to each field

      var needCalculateMeta = fields[0] && (!fields[0].hasOwnProperty('format') || !fields[0].hasOwnProperty('analyzerType'));

      if (needCalculateMeta) {
        var fieldOrder = fields.map(function (f) {
          return f.name;
        });
        var sampleData = (0, _dataProcessor.getSampleForTypeAnalyze)({
          fields: fieldOrder,
          rows: allData
        });
        var meta = (0, _dataProcessor.getFieldsFromData)(sampleData, fieldOrder);
        updatedFields = meta.map(function (f, i) {
          return _objectSpread(_objectSpread({}, (0, _lodash["default"])(meta[i], ['name', 'type', 'format'])), {}, {
            analyzerType: meta[i].analyzerType
          });
        });
        updatedFields.forEach(function (f, i) {
          if (fields[i].type !== f.type) {
            // if newly detected field type is different from saved type
            // we log it but won't update it, cause we don't want to break people's map
            _window.console.warn("detect ".concat(f.name, " type is now ").concat(f.type, " instead of ").concat(fields[i].type));
          }
        });
      } // get format of all fields


      return {
        data: {
          fields: updatedFields,
          rows: dataset.allData
        },
        info: (0, _lodash["default"])(dataset, ['id', 'label', 'color'])
      };
    }
  }]);
  return DatasetSchema;
}(_schema["default"]);

var datasetSchema = (_datasetSchema = {}, (0, _defineProperty2["default"])(_datasetSchema, _versions.VERSIONS.v0, new DatasetSchema({
  key: 'dataset',
  version: _versions.VERSIONS.v0,
  properties: propertiesV0
})), (0, _defineProperty2["default"])(_datasetSchema, _versions.VERSIONS.v1, new DatasetSchema({
  key: 'dataset',
  version: _versions.VERSIONS.v1,
  properties: propertiesV1
})), _datasetSchema);
var _default = datasetSchema;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL2RhdGFzZXQtc2NoZW1hLmpzIl0sIm5hbWVzIjpbImZpZWxkUHJvcGVydGllc1YwIiwibmFtZSIsInR5cGUiLCJmaWVsZFByb3BlcnRpZXNWMSIsImZvcm1hdCIsImFuYWx5emVyVHlwZSIsIkZpZWxkU2NoZW1hIiwiZmllbGRzIiwia2V5IiwibWFwIiwiZiIsInNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsIlNjaGVtYSIsInByb3BlcnRpZXNWMCIsImlkIiwibGFiZWwiLCJjb2xvciIsImFsbERhdGEiLCJ2ZXJzaW9uIiwiVkVSU0lPTlMiLCJ2MCIsInByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzVjEiLCJ2MSIsIkRhdGFzZXRTY2hlbWEiLCJkYXRhc2V0IiwiZGF0YXNldEZsYXR0ZW5lZCIsImRhdGFDb250YWluZXIiLCJmbGF0dGVuRGF0YSIsInVwZGF0ZWRGaWVsZHMiLCJuZWVkQ2FsY3VsYXRlTWV0YSIsImhhc093blByb3BlcnR5IiwiZmllbGRPcmRlciIsInNhbXBsZURhdGEiLCJyb3dzIiwibWV0YSIsImkiLCJmb3JFYWNoIiwiZ2xvYmFsQ29uc29sZSIsIndhcm4iLCJkYXRhIiwiaW5mbyIsImRhdGFzZXRTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGlCQUFpQixHQUFHO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsSUFEa0I7QUFFeEJDLEVBQUFBLElBQUksRUFBRTtBQUZrQixDQUExQjtBQUtBLElBQU1DLGlCQUFpQixHQUFHO0FBQ3hCRixFQUFBQSxJQUFJLEVBQUUsSUFEa0I7QUFFeEJDLEVBQUFBLElBQUksRUFBRSxJQUZrQjtBQUd4QkUsRUFBQUEsTUFBTSxFQUFFLElBSGdCO0FBSXhCQyxFQUFBQSxZQUFZLEVBQUU7QUFKVSxDQUExQjs7SUFPTUMsVzs7Ozs7Ozs7Ozs7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YmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJztcbmltcG9ydCB7Y29uc29sZSBhcyBnbG9iYWxDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHtWRVJTSU9OU30gZnJvbSAnLi92ZXJzaW9ucyc7XG5pbXBvcnQgU2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7Z2V0RmllbGRzRnJvbURhdGEsIGdldFNhbXBsZUZvclR5cGVBbmFseXplfSBmcm9tICdwcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcblxuLy8gdmVyc2lvbiB2MFxuY29uc3QgZmllbGRQcm9wZXJ0aWVzVjAgPSB7XG4gIG5hbWU6IG51bGwsXG4gIHR5cGU6IG51bGxcbn07XG5cbmNvbnN0IGZpZWxkUHJvcGVydGllc1YxID0ge1xuICBuYW1lOiBudWxsLFxuICB0eXBlOiBudWxsLFxuICBmb3JtYXQ6IG51bGwsXG4gIGFuYWx5emVyVHlwZTogbnVsbFxufTtcblxuY2xhc3MgRmllbGRTY2hlbWEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKGZpZWxkcykge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiBmaWVsZHMubWFwKGYgPT4gdGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEoZilbdGhpcy5rZXldKVxuICAgIH07XG4gIH1cbiAgbG9hZChmaWVsZHMpIHtcbiAgICByZXR1cm4ge1t0aGlzLmtleV06IGZpZWxkc307XG4gIH1cbn1cblxuY29uc3QgcHJvcGVydGllc1YwID0ge1xuICBpZDogbnVsbCxcbiAgbGFiZWw6IG51bGwsXG4gIGNvbG9yOiBudWxsLFxuICBhbGxEYXRhOiBudWxsLFxuICBmaWVsZHM6IG5ldyBGaWVsZFNjaGVtYSh7XG4gICAga2V5OiAnZmllbGRzJyxcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MCxcbiAgICBwcm9wZXJ0aWVzOiBmaWVsZFByb3BlcnRpZXNWMFxuICB9KVxufTtcblxuY29uc3QgcHJvcGVydGllc1YxID0ge1xuICAuLi5wcm9wZXJ0aWVzVjAsXG4gIGZpZWxkczogbmV3IEZpZWxkU2NoZW1hKHtcbiAgICBrZXk6ICdmaWVsZHMnLFxuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIHByb3BlcnRpZXM6IGZpZWxkUHJvcGVydGllc1YxXG4gIH0pXG59O1xuXG5jbGFzcyBEYXRhc2V0U2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAga2V5ID0gJ2RhdGFzZXQnO1xuXG4gIHNhdmUoZGF0YXNldCkge1xuICAgIGNvbnN0IGRhdGFzZXRGbGF0dGVuZWQgPSBkYXRhc2V0LmRhdGFDb250YWluZXJcbiAgICAgID8ge1xuICAgICAgICAgIC4uLmRhdGFzZXQsXG4gICAgICAgICAgYWxsRGF0YTogZGF0YXNldC5kYXRhQ29udGFpbmVyLmZsYXR0ZW5EYXRhKClcbiAgICAgICAgfVxuICAgICAgOiBkYXRhc2V0O1xuXG4gICAgcmV0dXJuIHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGRhdGFzZXRGbGF0dGVuZWQpW3RoaXMua2V5XTtcbiAgfVxuICBsb2FkKGRhdGFzZXQpIHtcbiAgICBjb25zdCB7ZmllbGRzLCBhbGxEYXRhfSA9IGRhdGFzZXQ7XG4gICAgbGV0IHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHM7XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBmaWVsZCB0eXBlXG4gICAgLy8gYmVjYXVzZSB3ZSBoYXZlIHVwZGF0ZWQgdHlwZS1hbmFseXplclxuICAgIC8vIHdlIG5lZWQgdG8gYWRkIGZvcm1hdCB0byBlYWNoIGZpZWxkXG4gICAgY29uc3QgbmVlZENhbGN1bGF0ZU1ldGEgPVxuICAgICAgZmllbGRzWzBdICYmXG4gICAgICAoIWZpZWxkc1swXS5oYXNPd25Qcm9wZXJ0eSgnZm9ybWF0JykgfHwgIWZpZWxkc1swXS5oYXNPd25Qcm9wZXJ0eSgnYW5hbHl6ZXJUeXBlJykpO1xuXG4gICAgaWYgKG5lZWRDYWxjdWxhdGVNZXRhKSB7XG4gICAgICBjb25zdCBmaWVsZE9yZGVyID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG5cbiAgICAgIGNvbnN0IHNhbXBsZURhdGEgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7XG4gICAgICAgIGZpZWxkczogZmllbGRPcmRlcixcbiAgICAgICAgcm93czogYWxsRGF0YVxuICAgICAgfSk7XG4gICAgICBjb25zdCBtZXRhID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlRGF0YSwgZmllbGRPcmRlcik7XG5cbiAgICAgIHVwZGF0ZWRGaWVsZHMgPSBtZXRhLm1hcCgoZiwgaSkgPT4gKHtcbiAgICAgICAgLi4ucGljayhtZXRhW2ldLCBbJ25hbWUnLCAndHlwZScsICdmb3JtYXQnXSksXG4gICAgICAgIGFuYWx5emVyVHlwZTogbWV0YVtpXS5hbmFseXplclR5cGVcbiAgICAgIH0pKTtcblxuICAgICAgdXBkYXRlZEZpZWxkcy5mb3JFYWNoKChmLCBpKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZHNbaV0udHlwZSAhPT0gZi50eXBlKSB7XG4gICAgICAgICAgLy8gaWYgbmV3bHkgZGV0ZWN0ZWQgZmllbGQgdHlwZSBpcyBkaWZmZXJlbnQgZnJvbSBzYXZlZCB0eXBlXG4gICAgICAgICAgLy8gd2UgbG9nIGl0IGJ1dCB3b24ndCB1cGRhdGUgaXQsIGNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYnJlYWsgcGVvcGxlJ3MgbWFwXG4gICAgICAgICAgZ2xvYmFsQ29uc29sZS53YXJuKGBkZXRlY3QgJHtmLm5hbWV9IHR5cGUgaXMgbm93ICR7Zi50eXBlfSBpbnN0ZWFkIG9mICR7ZmllbGRzW2ldLnR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGdldCBmb3JtYXQgb2YgYWxsIGZpZWxkc1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7ZmllbGRzOiB1cGRhdGVkRmllbGRzLCByb3dzOiBkYXRhc2V0LmFsbERhdGF9LFxuICAgICAgaW5mbzogcGljayhkYXRhc2V0LCBbJ2lkJywgJ2xhYmVsJywgJ2NvbG9yJ10pXG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBkYXRhc2V0U2NoZW1hID0ge1xuICBbVkVSU0lPTlMudjBdOiBuZXcgRGF0YXNldFNjaGVtYSh7XG4gICAga2V5OiAnZGF0YXNldCcsXG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YwXG4gIH0pLFxuICBbVkVSU0lPTlMudjFdOiBuZXcgRGF0YXNldFNjaGVtYSh7XG4gICAga2V5OiAnZGF0YXNldCcsXG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YxXG4gIH0pXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhc2V0U2NoZW1hO1xuIl19