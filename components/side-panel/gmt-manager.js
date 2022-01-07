"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledMessageText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _localization = require("../../localization");

var _styledComponents = require("../common/styled-components");

var _sourceDataCatalog = _interopRequireDefault(require("./common/source-data-catalog"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _loadingSpinner = _interopRequireDefault(require("../common/loading-spinner"));

var _styledComponents2 = _interopRequireDefault(require("styled-components"));

var _gmtPanel = _interopRequireDefault(require("./auto-gmt-panel/gmt-panel"));

var _processorUtils = require("../../utils/processor-utils");

var _lodash2 = _interopRequireDefault(require("lodash"));

var _templateObject;

GMTManagerFactory.deps = [_sourceDataCatalog["default"], _gmtPanel["default"]];

var StyledMessageText = _styledComponents2["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 12px;\n  color:", ";\n"])), function (props) {
  return props.flag ? 'green' : 'red';
});

exports.StyledMessageText = StyledMessageText;

function GMTManagerFactory(SourceDataCatalog, GMTPanel) {
  var GMTManager = function GMTManager(_ref) {
    var processor = _ref.processor,
        datasets = _ref.datasets,
        layers = _ref.layers,
        showDatasetTable = _ref.showDatasetTable,
        visStateActions = _ref.visStateActions;
    var setProcessor = visStateActions.setProcessor,
        runProcessorBatch = visStateActions.runProcessorBatch;

    var fieldsSelector = function fieldsSelector() {
      var pairs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // console.log('set field selector')
      var datasetId = processor && processor.dataId ? processor.dataId[0] : undefined;

      if (!datasetId) {
        return [];
      }

      if (!pairs) {
        return (0, _lodash["default"])(datasets, [datasetId, 'fields'], []);
      } else {
        var dataset_data = (0, _lodash["default"])(datasets, [datasetId, 'fields'], []);
        var point_layer = datasets[datasetId].fieldPairs ? datasets[datasetId].fieldPairs.map(function (fp) {
          return {
            name: fp.defaultName === '' ? Object.keys(fp.pair).join('_') : fp.defaultName,
            type: 'point',
            format: 'pair',
            id: 'temp_' + Object.keys(fp.pair).join('_'),
            fieldIdx: Object.keys(fp.pair).map(function (x) {
              return fp.pair[x].fieldIdx;
            }),
            displayName: fp.defaultName === '' ? Object.keys(fp.pair).join('_') : fp.defaultName,
            analyzerType: "POINT",
            pair: Object.keys(fp.pair)
          };
        }) : null; // return {suggested:point_layer,columns:dataset_data}

        return Array.isArray(point_layer) ? dataset_data.concat(point_layer) : dataset_data;
      }
    }; //here better to use remo:


    var filterDatasetById = function filterDatasetById(datasets, dataset_type) {
      console.log('filter dataset');
      var target_dataset = Object.keys(datasets).filter(function (x) {
        return datasets[x].label === dataset_type;
      }); // if(target_dataset.length>=0){
      //   switch(dataset_type){
      //     case 'activity information':
      //       batch.oddataset=target_dataset[0];
      //       setProcessor('batch',batch);
      //       break;
      //     case 'visited place information':
      //       batch.poidataset=target_dataset[0];
      //       setProcessor('batch',batch);
      //       break;
      //   }
      // }

      return target_dataset.length > 0 ? target_dataset[0] : null;
    };

    var runProlist = function runProlist(prop) {
      if (processor) {
        console.log('run processor');
        return runProcessorBatch(prop, visStateActions);
      }
    }; // const new_processor_with_batch= useMemo(() =>{
    //   console.log('new porcessor generate')
    //   const new_processor = {...DEFAULT_PROCESSOR_STRUCTURE}
    //   const filter_info = [['activity information','oddataId'],['visited place information','poidataId'],['GMT raw gps data','gpsdataId']]
    //   let batch = new_processor.batch
    //   filter_info.map((x)=>{
    //     const filtered_dataset = filterDatasetById(datasets,x[0])
    //     if(filtered_dataset){
    //       batch[x[1]] = x[0]
    //     }
    //   })
    //   new_processor.batch = batch
    //   return new_processor
    // },[datasets])
    // const new_processor_with_batch= useMemo(() => {
    //     // console.log('new porcessor generate')
    //     const new_processor = {...DEFAULT_PROCESSOR_STRUCTURE}
    //     const filter_info = [['activity information','oddataId'],['visited place information','poidataId'],['GMT raw gps data','gpsdataId']]
    //     let batch = new_processor.batch
    //     filter_info.map((x)=>{
    //       const filtered_dataset = filterDatasetById(datasets,x[0])
    //       if(filtered_dataset){
    //         batch[x[1]] = filtered_dataset
    //       }
    //     })
    //     return batch
    //   },[datasets])


    var exist_processor = processor ? processor : _lodash2["default"].cloneDeep(_processorUtils.DEFAULT_PROCESSOR_STRUCTURE);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "process-manager"
    }, /*#__PURE__*/_react["default"].createElement(SourceDataCatalog, {
      datasets: datasets,
      showDatasetTable: showDatasetTable
    }), /*#__PURE__*/_react["default"].createElement(_styledComponents.SidePanelDivider, null), /*#__PURE__*/_react["default"].createElement(_styledComponents.SidePanelSection, null, /*#__PURE__*/_react["default"].createElement(GMTPanel, {
      visStateActions: visStateActions,
      processor: exist_processor,
      setProcessor: setProcessor,
      datasets: datasets,
      allAvailableFields: fieldsSelector // filterDataset={filterDatasetById}
      // batchInfo={new_processor_with_batch}

    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_styledComponents.Button, {
      className: "add-processor-button" // inactive={hadEmptyProcessor || !hadDataset}
      ,
      width: "210px",
      onClick: runProlist
    }, processor && processor.flag ? /*#__PURE__*/_react["default"].createElement(_loadingSpinner["default"], {
      size: 12
    }) : /*#__PURE__*/_react["default"].createElement(_localization.FormattedMessage, {
      id: "processor.ProcessBatch"
    })), processor && /*#__PURE__*/_react["default"].createElement(StyledMessageText, {
      flag: processor.preprocessor ? processor.preprocessor.prebatchflag : false
    }, processor.preprocessor ? processor.preprocessor.prebatchflag ? 'sucess' : 'failed' : 'no result')), /*#__PURE__*/_react["default"].createElement("br", null));
  };

  return GMTManager;
}

var _default = GMTManagerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZ210LW1hbmFnZXIuanMiXSwibmFtZXMiOlsiR01UTWFuYWdlckZhY3RvcnkiLCJkZXBzIiwiU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5IiwiR01UUGFuZWxGYWN0b3J5IiwiU3R5bGVkTWVzc2FnZVRleHQiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImZsYWciLCJTb3VyY2VEYXRhQ2F0YWxvZyIsIkdNVFBhbmVsIiwiR01UTWFuYWdlciIsInByb2Nlc3NvciIsImRhdGFzZXRzIiwibGF5ZXJzIiwic2hvd0RhdGFzZXRUYWJsZSIsInZpc1N0YXRlQWN0aW9ucyIsInNldFByb2Nlc3NvciIsInJ1blByb2Nlc3NvckJhdGNoIiwiZmllbGRzU2VsZWN0b3IiLCJwYWlycyIsImRhdGFzZXRJZCIsImRhdGFJZCIsInVuZGVmaW5lZCIsImRhdGFzZXRfZGF0YSIsInBvaW50X2xheWVyIiwiZmllbGRQYWlycyIsIm1hcCIsImZwIiwibmFtZSIsImRlZmF1bHROYW1lIiwiT2JqZWN0Iiwia2V5cyIsInBhaXIiLCJqb2luIiwidHlwZSIsImZvcm1hdCIsImlkIiwiZmllbGRJZHgiLCJ4IiwiZGlzcGxheU5hbWUiLCJhbmFseXplclR5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJmaWx0ZXJEYXRhc2V0QnlJZCIsImRhdGFzZXRfdHlwZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXRfZGF0YXNldCIsImZpbHRlciIsImxhYmVsIiwibGVuZ3RoIiwicnVuUHJvbGlzdCIsInByb3AiLCJleGlzdF9wcm9jZXNzb3IiLCJfIiwiY2xvbmVEZWVwIiwiREVGQVVMVF9QUk9DRVNTT1JfU1RSVUNUVVJFIiwicHJlcHJvY2Vzc29yIiwicHJlYmF0Y2hmbGFnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztB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V0FBM0ssQ0FkQSxDQWZGLGVBaUNFLDJDQWpDRixDQURBO0FBdUNELEdBcklEOztBQXVJQSxTQUFPakQsVUFBUDtBQUNEOztlQUVjWCxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge3VzZU1lbW99IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnbG9jYWxpemF0aW9uJztcbmltcG9ydCB7QnV0dG9uLCBTaWRlUGFuZWxEaXZpZGVyLCBTaWRlUGFuZWxTZWN0aW9ufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5IGZyb20gJy4vY29tbW9uL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0JztcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tICcuLi9jb21tb24vbG9hZGluZy1zcGlubmVyJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEdNVFBhbmVsRmFjdG9yeSBmcm9tICcuL2F1dG8tZ210LXBhbmVsL2dtdC1wYW5lbCc7XG5pbXBvcnQge0RFRkFVTFRfUFJPQ0VTU09SX1NUUlVDVFVSRX0gZnJvbSAnLi4vLi4vdXRpbHMvcHJvY2Vzc29yLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbkdNVE1hbmFnZXJGYWN0b3J5LmRlcHMgPSBbU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5LCBHTVRQYW5lbEZhY3RvcnldO1xuXG5cbmV4cG9ydCBjb25zdCBTdHlsZWRNZXNzYWdlVGV4dCA9IHN0eWxlZC5kaXZgXG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6JHtwcm9wcyA9PiBwcm9wcy5mbGFnPydncmVlbic6J3JlZCd9O1xuYDtcblxuZnVuY3Rpb24gR01UTWFuYWdlckZhY3RvcnkoU291cmNlRGF0YUNhdGFsb2csIEdNVFBhbmVsKSB7XG4gIGNvbnN0IEdNVE1hbmFnZXIgPSAoe3Byb2Nlc3NvcixkYXRhc2V0cyxsYXllcnMsc2hvd0RhdGFzZXRUYWJsZSx2aXNTdGF0ZUFjdGlvbnN9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2V0UHJvY2Vzc29yLFxuICAgICAgcnVuUHJvY2Vzc29yQmF0Y2gsXG4gICAgfSA9IHZpc1N0YXRlQWN0aW9ucztcblxuICAgIGNvbnN0IGZpZWxkc1NlbGVjdG9yID0gKHBhaXJzPWZhbHNlKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc2V0IGZpZWxkIHNlbGVjdG9yJylcbiAgICAgIGNvbnN0IGRhdGFzZXRJZCA9IHByb2Nlc3NvciAmJiBwcm9jZXNzb3IuZGF0YUlkP3Byb2Nlc3Nvci5kYXRhSWRbMF06dW5kZWZpbmVkO1xuICAgICAgaWYgKCFkYXRhc2V0SWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgaWYoIXBhaXJzKXtcbiAgICAgICAgcmV0dXJuIGdldChkYXRhc2V0cywgWyBkYXRhc2V0SWQsICdmaWVsZHMnXSwgW10pO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgY29uc3QgZGF0YXNldF9kYXRhID0gZ2V0KGRhdGFzZXRzLCBbIGRhdGFzZXRJZCwgJ2ZpZWxkcyddLCBbXSlcbiAgICAgICAgY29uc3QgcG9pbnRfbGF5ZXIgPVxuICAgICAgICAgICAgZGF0YXNldHNbZGF0YXNldElkXS5maWVsZFBhaXJzXG4gICAgICAgICAgICAgID8gZGF0YXNldHNbZGF0YXNldElkXS5maWVsZFBhaXJzLm1hcChmcCA9PiAoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGZwLmRlZmF1bHROYW1lID09PSAnJz9PYmplY3Qua2V5cyhmcC5wYWlyKS5qb2luKCdfJyk6ZnAuZGVmYXVsdE5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BvaW50JyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6J3BhaXInLFxuICAgICAgICAgICAgICAgIGlkOid0ZW1wXycgKyBPYmplY3Qua2V5cyhmcC5wYWlyKS5qb2luKCdfJyksXG4gICAgICAgICAgICAgICAgZmllbGRJZHg6IE9iamVjdC5rZXlzKGZwLnBhaXIpLm1hcCgoeCk9PmZwLnBhaXJbeF0uZmllbGRJZHgpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBmcC5kZWZhdWx0TmFtZSA9PT0gJyc/T2JqZWN0LmtleXMoZnAucGFpcikuam9pbignXycpOmZwLmRlZmF1bHROYW1lLFxuICAgICAgICAgICAgICAgIGFuYWx5emVyVHlwZTogXCJQT0lOVFwiLFxuICAgICAgICAgICAgICAgIHBhaXI6T2JqZWN0LmtleXMoZnAucGFpcilcbiAgICAgICAgICAgICAgfSkpOm51bGw7XG4gICAgICAgIC8vIHJldHVybiB7c3VnZ2VzdGVkOnBvaW50X2xheWVyLGNvbHVtbnM6ZGF0YXNldF9kYXRhfVxuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwb2ludF9sYXllcik/ZGF0YXNldF9kYXRhLmNvbmNhdChwb2ludF9sYXllcik6ZGF0YXNldF9kYXRhXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9oZXJlIGJldHRlciB0byB1c2UgcmVtbzpcbiAgICBjb25zdCBmaWx0ZXJEYXRhc2V0QnlJZCA9IChkYXRhc2V0cyxkYXRhc2V0X3R5cGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdmaWx0ZXIgZGF0YXNldCcpXG4gICAgICBjb25zdCB0YXJnZXRfZGF0YXNldCA9IE9iamVjdC5rZXlzKGRhdGFzZXRzKS5maWx0ZXIoKHgpPT5kYXRhc2V0c1t4XS5sYWJlbD09PWRhdGFzZXRfdHlwZSlcbiAgICAgIC8vIGlmKHRhcmdldF9kYXRhc2V0Lmxlbmd0aD49MCl7XG4gICAgICAvLyAgIHN3aXRjaChkYXRhc2V0X3R5cGUpe1xuICAgICAgLy8gICAgIGNhc2UgJ2FjdGl2aXR5IGluZm9ybWF0aW9uJzpcbiAgICAgIC8vICAgICAgIGJhdGNoLm9kZGF0YXNldD10YXJnZXRfZGF0YXNldFswXTtcbiAgICAgIC8vICAgICAgIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKTtcbiAgICAgIC8vICAgICAgIGJyZWFrO1xuICAgICAgLy8gICAgIGNhc2UgJ3Zpc2l0ZWQgcGxhY2UgaW5mb3JtYXRpb24nOlxuICAgICAgLy8gICAgICAgYmF0Y2gucG9pZGF0YXNldD10YXJnZXRfZGF0YXNldFswXTtcbiAgICAgIC8vICAgICAgIHNldFByb2Nlc3NvcignYmF0Y2gnLGJhdGNoKTtcbiAgICAgIC8vICAgICAgIGJyZWFrO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgICByZXR1cm4gdGFyZ2V0X2RhdGFzZXQubGVuZ3RoPjA/dGFyZ2V0X2RhdGFzZXRbMF06bnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHJ1blByb2xpc3QgPSAocHJvcCkgPT57XG4gICAgICBpZihwcm9jZXNzb3Ipe1xuICAgICAgICBjb25zb2xlLmxvZygncnVuIHByb2Nlc3NvcicpXG4gICAgICAgIHJldHVybiBydW5Qcm9jZXNzb3JCYXRjaChwcm9wLHZpc1N0YXRlQWN0aW9ucylcbiAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvLyBjb25zdCBuZXdfcHJvY2Vzc29yX3dpdGhfYmF0Y2g9IHVzZU1lbW8oKCkgPT57XG4gICAgLy8gICBjb25zb2xlLmxvZygnbmV3IHBvcmNlc3NvciBnZW5lcmF0ZScpXG4gICAgLy8gICBjb25zdCBuZXdfcHJvY2Vzc29yID0gey4uLkRFRkFVTFRfUFJPQ0VTU09SX1NUUlVDVFVSRX1cbiAgICAvLyAgIGNvbnN0IGZpbHRlcl9pbmZvID0gW1snYWN0aXZpdHkgaW5mb3JtYXRpb24nLCdvZGRhdGFJZCddLFsndmlzaXRlZCBwbGFjZSBpbmZvcm1hdGlvbicsJ3BvaWRhdGFJZCddLFsnR01UIHJhdyBncHMgZGF0YScsJ2dwc2RhdGFJZCddXVxuICAgIC8vICAgbGV0IGJhdGNoID0gbmV3X3Byb2Nlc3Nvci5iYXRjaFxuICAgIC8vICAgZmlsdGVyX2luZm8ubWFwKCh4KT0+e1xuICAgIC8vICAgICBjb25zdCBmaWx0ZXJlZF9kYXRhc2V0ID0gZmlsdGVyRGF0YXNldEJ5SWQoZGF0YXNldHMseFswXSlcbiAgICAvLyAgICAgaWYoZmlsdGVyZWRfZGF0YXNldCl7XG4gICAgLy8gICAgICAgYmF0Y2hbeFsxXV0gPSB4WzBdXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gICBuZXdfcHJvY2Vzc29yLmJhdGNoID0gYmF0Y2hcbiAgICAvLyAgIHJldHVybiBuZXdfcHJvY2Vzc29yXG4gICAgLy8gfSxbZGF0YXNldHNdKVxuXG4gICAgLy8gY29uc3QgbmV3X3Byb2Nlc3Nvcl93aXRoX2JhdGNoPSB1c2VNZW1vKCgpID0+IHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ25ldyBwb3JjZXNzb3IgZ2VuZXJhdGUnKVxuICAgIC8vICAgICBjb25zdCBuZXdfcHJvY2Vzc29yID0gey4uLkRFRkFVTFRfUFJPQ0VTU09SX1NUUlVDVFVSRX1cbiAgICAvLyAgICAgY29uc3QgZmlsdGVyX2luZm8gPSBbWydhY3Rpdml0eSBpbmZvcm1hdGlvbicsJ29kZGF0YUlkJ10sWyd2aXNpdGVkIHBsYWNlIGluZm9ybWF0aW9uJywncG9pZGF0YUlkJ10sWydHTVQgcmF3IGdwcyBkYXRhJywnZ3BzZGF0YUlkJ11dXG4gICAgLy8gICAgIGxldCBiYXRjaCA9IG5ld19wcm9jZXNzb3IuYmF0Y2hcbiAgICAvLyAgICAgZmlsdGVyX2luZm8ubWFwKCh4KT0+e1xuICAgIC8vICAgICAgIGNvbnN0IGZpbHRlcmVkX2RhdGFzZXQgPSBmaWx0ZXJEYXRhc2V0QnlJZChkYXRhc2V0cyx4WzBdKVxuICAgIC8vICAgICAgIGlmKGZpbHRlcmVkX2RhdGFzZXQpe1xuICAgIC8vICAgICAgICAgYmF0Y2hbeFsxXV0gPSBmaWx0ZXJlZF9kYXRhc2V0XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICByZXR1cm4gYmF0Y2hcbiAgICAvLyAgIH0sW2RhdGFzZXRzXSlcblxuXG4gICAgY29uc3QgZXhpc3RfcHJvY2Vzc29yID0gcHJvY2Vzc29yP3Byb2Nlc3NvcjpfLmNsb25lRGVlcChERUZBVUxUX1BST0NFU1NPUl9TVFJVQ1RVUkUpXG5cbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvY2Vzcy1tYW5hZ2VyXCI+XG4gICAgICA8U291cmNlRGF0YUNhdGFsb2cgZGF0YXNldHM9e2RhdGFzZXRzfSBzaG93RGF0YXNldFRhYmxlPXtzaG93RGF0YXNldFRhYmxlfSAvPlxuICAgICAgPFNpZGVQYW5lbERpdmlkZXIgLz5cbiAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICA8R01UUGFuZWxcbiAgICAgICAgICB2aXNTdGF0ZUFjdGlvbnM9e3Zpc1N0YXRlQWN0aW9uc31cbiAgICAgICAgICBwcm9jZXNzb3I9e2V4aXN0X3Byb2Nlc3Nvcn1cbiAgICAgICAgICBzZXRQcm9jZXNzb3I9e3NldFByb2Nlc3Nvcn1cbiAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgYWxsQXZhaWxhYmxlRmllbGRzPXtmaWVsZHNTZWxlY3Rvcn1cbiAgICAgICAgICAvLyBmaWx0ZXJEYXRhc2V0PXtmaWx0ZXJEYXRhc2V0QnlJZH1cbiAgICAgICAgICAvLyBiYXRjaEluZm89e25ld19wcm9jZXNzb3Jfd2l0aF9iYXRjaH1cbiAgICAgICAgLz5cbiAgICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cblxuICAgICAgPGRpdj5cblxuICAgICAgPEJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9XCJhZGQtcHJvY2Vzc29yLWJ1dHRvblwiXG4gICAgICAgIC8vIGluYWN0aXZlPXtoYWRFbXB0eVByb2Nlc3NvciB8fCAhaGFkRGF0YXNldH1cbiAgICAgICAgd2lkdGg9XCIyMTBweFwiXG4gICAgICAgIG9uQ2xpY2s9e3J1blByb2xpc3R9XG4gICAgICA+XG4gICAgICAgIHsvKiB0b2RvOiBzcGlubmVyIGdlbmVyYXRpb24gKi99XG5cbiAgICAgICAge3Byb2Nlc3NvciAmJiBwcm9jZXNzb3IuZmxhZyA/IDxMb2FkaW5nU3Bpbm5lciBzaXplPXsxMn0gLz46PEZvcm1hdHRlZE1lc3NhZ2UgaWQ9J3Byb2Nlc3Nvci5Qcm9jZXNzQmF0Y2gnIC8+fVxuICAgICAgPC9CdXR0b24+XG5cbiAgICAgIHtwcm9jZXNzb3IgJiZcbiAgICAgIDxTdHlsZWRNZXNzYWdlVGV4dCBmbGFnPXtwcm9jZXNzb3IucHJlcHJvY2Vzc29yP3Byb2Nlc3Nvci5wcmVwcm9jZXNzb3IucHJlYmF0Y2hmbGFnOmZhbHNlfT57cHJvY2Vzc29yLnByZXByb2Nlc3Nvcj8ocHJvY2Vzc29yLnByZXByb2Nlc3Nvci5wcmViYXRjaGZsYWc/J3N1Y2Vzcyc6J2ZhaWxlZCcpOidubyByZXN1bHQnfVxuICAgICAgPC9TdHlsZWRNZXNzYWdlVGV4dD59XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGJyLz5cbiAgICA8L2Rpdj5cblxuXG4gIClcbiAgfVxuXG4gIHJldHVybiBHTVRNYW5hZ2VyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBHTVRNYW5hZ2VyRmFjdG9yeTtcblxuXG4iXX0=