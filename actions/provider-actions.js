"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedMapsError = exports.getSavedMapsSuccess = exports.getSavedMaps = exports.loadCloudMapError = exports.loadCloudMapSuccess = exports.loadCloudMap = exports.setCloudProvider = exports.resetProviderStatus = exports.postSaveLoadSuccess = exports.exportFileError = exports.exportFileSuccess = exports.exportFileToCloud = exports.ActionTypes = void 0;

var _reduxActions = require("redux-actions");

var _actionTypes = require("../constants/action-types");

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

/** @type {import('./provider-actions').ProviderActionTypes} */
var ActionTypes = {
  EXPORT_FILE_TO_CLOUD: "".concat(_actionTypes.ACTION_PREFIX, "EXPORT_FILE_TO_CLOUD"),
  EXPORT_FILE_SUCCESS: "".concat(_actionTypes.ACTION_PREFIX, "EXPORT_FILE_SUCCESS"),
  EXPORT_FILE_ERROR: "".concat(_actionTypes.ACTION_PREFIX, "EXPORT_FILE_ERROR"),
  RESET_PROVIDER_STATUS: "".concat(_actionTypes.ACTION_PREFIX, "RESET_PROVIDER_STATUS"),
  SET_CLOUD_PROVIDER: "".concat(_actionTypes.ACTION_PREFIX, "SET_CLOUD_PROVIDER"),
  POST_SAVE_LOAD_SUCCESS: "".concat(_actionTypes.ACTION_PREFIX, "POST_SAVE_LOAD_SUCCESS"),
  LOAD_CLOUD_MAP: "".concat(_actionTypes.ACTION_PREFIX, "LOAD_CLOUD_MAP"),
  LOAD_CLOUD_MAP_SUCCESS: "".concat(_actionTypes.ACTION_PREFIX, "LOAD_CLOUD_MAP_SUCCESS"),
  LOAD_CLOUD_MAP_ERROR: "".concat(_actionTypes.ACTION_PREFIX, "LOAD_CLOUD_MAP_ERROR"),
  GET_SAVED_MAPS: "".concat(_actionTypes.ACTION_PREFIX, "GET_SAVED_MAPS"),
  GET_SAVED_MAPS_SUCCESS: "".concat(_actionTypes.ACTION_PREFIX, "GET_SAVED_MAPS_SUCCESS"),
  GET_SAVED_MAPS_ERROR: "".concat(_actionTypes.ACTION_PREFIX, "GET_SAVED_MAPS_ERROR")
};
/**
 * Call provider to upload file to cloud
 * @param mapData
 * @param provider
 * @param options
 * @param onSuccess
 * @param onError
 * @param closeModal
 * @type {typeof import('./provider-actions').exportFileToCloud}
 */

exports.ActionTypes = ActionTypes;
var exportFileToCloud = (0, _reduxActions.createAction)(ActionTypes.EXPORT_FILE_TO_CLOUD, function (payload) {
  return payload;
});
/**
 * @type {typeof import('./provider-actions').exportFileSuccess}
 */

exports.exportFileToCloud = exportFileToCloud;
var exportFileSuccess = (0, _reduxActions.createAction)(ActionTypes.EXPORT_FILE_SUCCESS, function (payload) {
  return payload;
});
/** @type {typeof import('./provider-actions').exportFileError} */

exports.exportFileSuccess = exportFileSuccess;
var exportFileError = (0, _reduxActions.createAction)(ActionTypes.EXPORT_FILE_ERROR, function (payload) {
  return payload;
});
/** @type {typeof import('./provider-actions').postSaveLoadSuccess} */

exports.exportFileError = exportFileError;
var postSaveLoadSuccess = (0, _reduxActions.createAction)(ActionTypes.POST_SAVE_LOAD_SUCCESS, function (message) {
  return message;
});
/** @type {typeof import('./provider-actions').resetProviderStatus} */

exports.postSaveLoadSuccess = postSaveLoadSuccess;
var resetProviderStatus = (0, _reduxActions.createAction)(ActionTypes.RESET_PROVIDER_STATUS);
/** @type {typeof import('./provider-actions').setCloudProvider} */

exports.resetProviderStatus = resetProviderStatus;
var setCloudProvider = (0, _reduxActions.createAction)(ActionTypes.SET_CLOUD_PROVIDER, function (provider) {
  return provider;
});
/** @type {typeof import('./provider-actions').loadCloudMap} */

exports.setCloudProvider = setCloudProvider;
var loadCloudMap = (0, _reduxActions.createAction)(ActionTypes.LOAD_CLOUD_MAP, function (payload) {
  return payload;
});
/** @type {typeof import('./provider-actions').loadCloudMapSuccess} */

exports.loadCloudMap = loadCloudMap;
var loadCloudMapSuccess = (0, _reduxActions.createAction)(ActionTypes.LOAD_CLOUD_MAP_SUCCESS, function (payload) {
  return payload;
});
/** @type {typeof import('./provider-actions').loadCloudMapError} */

exports.loadCloudMapSuccess = loadCloudMapSuccess;
var loadCloudMapError = (0, _reduxActions.createAction)(ActionTypes.LOAD_CLOUD_MAP_ERROR, function (payload) {
  return payload;
});
/** @type {typeof import('./provider-actions').getSavedMaps} */

exports.loadCloudMapError = loadCloudMapError;
var getSavedMaps = (0, _reduxActions.createAction)(ActionTypes.GET_SAVED_MAPS, function (provider) {
  return provider;
});
/** @type {typeof import('./provider-actions').getSavedMapsSuccess} */

exports.getSavedMaps = getSavedMaps;
var getSavedMapsSuccess = (0, _reduxActions.createAction)(ActionTypes.GET_SAVED_MAPS_SUCCESS, function (payload) {
  return payload;
});
/** @type {typeof import('./provider-actions').getSavedMapsError} */

exports.getSavedMapsSuccess = getSavedMapsSuccess;
var getSavedMapsError = (0, _reduxActions.createAction)(ActionTypes.GET_SAVED_MAPS_ERROR, function (payload) {
  return payload;
});
exports.getSavedMapsError = getSavedMapsError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3Byb3ZpZGVyLWFjdGlvbnMuanMiXSwibmFtZXMiOlsiQWN0aW9uVHlwZXMiLCJFWFBPUlRfRklMRV9UT19DTE9VRCIsIkFDVElPTl9QUkVGSVgiLCJFWFBPUlRfRklMRV9TVUNDRVNTIiwiRVhQT1JUX0ZJTEVfRVJST1IiLCJSRVNFVF9QUk9WSURFUl9TVEFUVVMiLCJTRVRfQ0xPVURfUFJPVklERVIiLCJQT1NUX1NBVkVfTE9BRF9TVUNDRVNTIiwiTE9BRF9DTE9VRF9NQVAiLCJMT0FEX0NMT1VEX01BUF9TVUNDRVNTIiwiTE9BRF9DTE9VRF9NQVBfRVJST1IiLCJHRVRfU0FWRURfTUFQUyIsIkdFVF9TQVZFRF9NQVBTX1NVQ0NFU1MiLCJHRVRfU0FWRURfTUFQU19FUlJPUiIsImV4cG9ydEZpbGVUb0Nsb3VkIiwicGF5bG9hZCIsImV4cG9ydEZpbGVTdWNjZXNzIiwiZXhwb3J0RmlsZUVycm9yIiwicG9zdFNhdmVMb2FkU3VjY2VzcyIsIm1lc3NhZ2UiLCJyZXNldFByb3ZpZGVyU3RhdHVzIiwic2V0Q2xvdWRQcm92aWRlciIsInByb3ZpZGVyIiwibG9hZENsb3VkTWFwIiwibG9hZENsb3VkTWFwU3VjY2VzcyIsImxvYWRDbG91ZE1hcEVycm9yIiwiZ2V0U2F2ZWRNYXBzIiwiZ2V0U2F2ZWRNYXBzU3VjY2VzcyIsImdldFNhdmVkTWFwc0Vycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTtBQUNPLElBQU1BLFdBQVcsR0FBRztBQUN6QkMsRUFBQUEsb0JBQW9CLFlBQUtDLDBCQUFMLHlCQURLO0FBRXpCQyxFQUFBQSxtQkFBbUIsWUFBS0QsMEJBQUwsd0JBRk07QUFHekJFLEVBQUFBLGlCQUFpQixZQUFLRiwwQkFBTCxzQkFIUTtBQUl6QkcsRUFBQUEscUJBQXFCLFlBQUtILDBCQUFMLDBCQUpJO0FBS3pCSSxFQUFBQSxrQkFBa0IsWUFBS0osMEJBQUwsdUJBTE87QUFNekJLLEVBQUFBLHNCQUFzQixZQUFLTCwwQkFBTCwyQkFORztBQU96Qk0sRUFBQUEsY0FBYyxZQUFLTiwwQkFBTCxtQkFQVztBQVF6Qk8sRUFBQUEsc0JBQXNCLFlBQUtQLDBCQUFMLDJCQVJHO0FBU3pCUSxFQUFBQSxvQkFBb0IsWUFBS1IsMEJBQUwseUJBVEs7QUFVekJTLEVBQUFBLGNBQWMsWUFBS1QsMEJBQUwsbUJBVlc7QUFXekJVLEVBQUFBLHNCQUFzQixZQUFLViwwQkFBTCwyQkFYRztBQVl6QlcsRUFBQUEsb0JBQW9CLFlBQUtYLDBCQUFMO0FBWkssQ0FBcEI7QUFlUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sSUFBTVksaUJBQWlCLEdBQUcsZ0NBQWFkLFdBQVcsQ0FBQ0Msb0JBQXpCLEVBQStDLFVBQUFjLE9BQU87QUFBQSxTQUFJQSxPQUFKO0FBQUEsQ0FBdEQsQ0FBMUI7QUFFUDtBQUNBO0FBQ0E7OztBQUNPLElBQU1DLGlCQUFpQixHQUFHLGdDQUFhaEIsV0FBVyxDQUFDRyxtQkFBekIsRUFBOEMsVUFBQVksT0FBTztBQUFBLFNBQUlBLE9BQUo7QUFBQSxDQUFyRCxDQUExQjtBQUVQOzs7QUFDTyxJQUFNRSxlQUFlLEdBQUcsZ0NBQWFqQixXQUFXLENBQUNJLGlCQUF6QixFQUE0QyxVQUFBVyxPQUFPO0FBQUEsU0FBSUEsT0FBSjtBQUFBLENBQW5ELENBQXhCO0FBRVA7OztBQUNPLElBQU1HLG1CQUFtQixHQUFHLGdDQUNqQ2xCLFdBQVcsQ0FBQ08sc0JBRHFCLEVBRWpDLFVBQUFZLE9BQU87QUFBQSxTQUFJQSxPQUFKO0FBQUEsQ0FGMEIsQ0FBNUI7QUFLUDs7O0FBQ08sSUFBTUMsbUJBQW1CLEdBQUcsZ0NBQWFwQixXQUFXLENBQUNLLHFCQUF6QixDQUE1QjtBQUVQOzs7QUFDTyxJQUFNZ0IsZ0JBQWdCLEdBQUcsZ0NBQWFyQixXQUFXLENBQUNNLGtCQUF6QixFQUE2QyxVQUFBZ0IsUUFBUTtBQUFBLFNBQUlBLFFBQUo7QUFBQSxDQUFyRCxDQUF6QjtBQUVQOzs7QUFDTyxJQUFNQyxZQUFZLEdBQUcsZ0NBQWF2QixXQUFXLENBQUNRLGNBQXpCLEVBQXlDLFVBQUFPLE9BQU87QUFBQSxTQUFJQSxPQUFKO0FBQUEsQ0FBaEQsQ0FBckI7QUFFUDs7O0FBQ08sSUFBTVMsbUJBQW1CLEdBQUcsZ0NBQ2pDeEIsV0FBVyxDQUFDUyxzQkFEcUIsRUFFakMsVUFBQU0sT0FBTztBQUFBLFNBQUlBLE9BQUo7QUFBQSxDQUYwQixDQUE1QjtBQUtQOzs7QUFDTyxJQUFNVSxpQkFBaUIsR0FBRyxnQ0FBYXpCLFdBQVcsQ0FBQ1Usb0JBQXpCLEVBQStDLFVBQUFLLE9BQU87QUFBQSxTQUFJQSxPQUFKO0FBQUEsQ0FBdEQsQ0FBMUI7QUFFUDs7O0FBQ08sSUFBTVcsWUFBWSxHQUFHLGdDQUFhMUIsV0FBVyxDQUFDVyxjQUF6QixFQUF5QyxVQUFBVyxRQUFRO0FBQUEsU0FBSUEsUUFBSjtBQUFBLENBQWpELENBQXJCO0FBRVA7OztBQUNPLElBQU1LLG1CQUFtQixHQUFHLGdDQUNqQzNCLFdBQVcsQ0FBQ1ksc0JBRHFCLEVBRWpDLFVBQUFHLE9BQU87QUFBQSxTQUFJQSxPQUFKO0FBQUEsQ0FGMEIsQ0FBNUI7QUFLUDs7O0FBQ08sSUFBTWEsaUJBQWlCLEdBQUcsZ0NBQWE1QixXQUFXLENBQUNhLG9CQUF6QixFQUErQyxVQUFBRSxPQUFPO0FBQUEsU0FBSUEsT0FBSjtBQUFBLENBQXRELENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIyIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjcmVhdGVBY3Rpb259IGZyb20gJ3JlZHV4LWFjdGlvbnMnO1xuaW1wb3J0IHtBQ1RJT05fUFJFRklYfSBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vcHJvdmlkZXItYWN0aW9ucycpLlByb3ZpZGVyQWN0aW9uVHlwZXN9ICovXG5leHBvcnQgY29uc3QgQWN0aW9uVHlwZXMgPSB7XG4gIEVYUE9SVF9GSUxFX1RPX0NMT1VEOiBgJHtBQ1RJT05fUFJFRklYfUVYUE9SVF9GSUxFX1RPX0NMT1VEYCxcbiAgRVhQT1JUX0ZJTEVfU1VDQ0VTUzogYCR7QUNUSU9OX1BSRUZJWH1FWFBPUlRfRklMRV9TVUNDRVNTYCxcbiAgRVhQT1JUX0ZJTEVfRVJST1I6IGAke0FDVElPTl9QUkVGSVh9RVhQT1JUX0ZJTEVfRVJST1JgLFxuICBSRVNFVF9QUk9WSURFUl9TVEFUVVM6IGAke0FDVElPTl9QUkVGSVh9UkVTRVRfUFJPVklERVJfU1RBVFVTYCxcbiAgU0VUX0NMT1VEX1BST1ZJREVSOiBgJHtBQ1RJT05fUFJFRklYfVNFVF9DTE9VRF9QUk9WSURFUmAsXG4gIFBPU1RfU0FWRV9MT0FEX1NVQ0NFU1M6IGAke0FDVElPTl9QUkVGSVh9UE9TVF9TQVZFX0xPQURfU1VDQ0VTU2AsXG4gIExPQURfQ0xPVURfTUFQOiBgJHtBQ1RJT05fUFJFRklYfUxPQURfQ0xPVURfTUFQYCxcbiAgTE9BRF9DTE9VRF9NQVBfU1VDQ0VTUzogYCR7QUNUSU9OX1BSRUZJWH1MT0FEX0NMT1VEX01BUF9TVUNDRVNTYCxcbiAgTE9BRF9DTE9VRF9NQVBfRVJST1I6IGAke0FDVElPTl9QUkVGSVh9TE9BRF9DTE9VRF9NQVBfRVJST1JgLFxuICBHRVRfU0FWRURfTUFQUzogYCR7QUNUSU9OX1BSRUZJWH1HRVRfU0FWRURfTUFQU2AsXG4gIEdFVF9TQVZFRF9NQVBTX1NVQ0NFU1M6IGAke0FDVElPTl9QUkVGSVh9R0VUX1NBVkVEX01BUFNfU1VDQ0VTU2AsXG4gIEdFVF9TQVZFRF9NQVBTX0VSUk9SOiBgJHtBQ1RJT05fUFJFRklYfUdFVF9TQVZFRF9NQVBTX0VSUk9SYFxufTtcblxuLyoqXG4gKiBDYWxsIHByb3ZpZGVyIHRvIHVwbG9hZCBmaWxlIHRvIGNsb3VkXG4gKiBAcGFyYW0gbWFwRGF0YVxuICogQHBhcmFtIHByb3ZpZGVyXG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQHBhcmFtIG9uU3VjY2Vzc1xuICogQHBhcmFtIG9uRXJyb3JcbiAqIEBwYXJhbSBjbG9zZU1vZGFsXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykuZXhwb3J0RmlsZVRvQ2xvdWR9XG4gKi9cbmV4cG9ydCBjb25zdCBleHBvcnRGaWxlVG9DbG91ZCA9IGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlcy5FWFBPUlRfRklMRV9UT19DTE9VRCwgcGF5bG9hZCA9PiBwYXlsb2FkKTtcblxuLyoqXG4gKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykuZXhwb3J0RmlsZVN1Y2Nlc3N9XG4gKi9cbmV4cG9ydCBjb25zdCBleHBvcnRGaWxlU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlcy5FWFBPUlRfRklMRV9TVUNDRVNTLCBwYXlsb2FkID0+IHBheWxvYWQpO1xuXG4vKiogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vcHJvdmlkZXItYWN0aW9ucycpLmV4cG9ydEZpbGVFcnJvcn0gKi9cbmV4cG9ydCBjb25zdCBleHBvcnRGaWxlRXJyb3IgPSBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZXMuRVhQT1JUX0ZJTEVfRVJST1IsIHBheWxvYWQgPT4gcGF5bG9hZCk7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykucG9zdFNhdmVMb2FkU3VjY2Vzc30gKi9cbmV4cG9ydCBjb25zdCBwb3N0U2F2ZUxvYWRTdWNjZXNzID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5QT1NUX1NBVkVfTE9BRF9TVUNDRVNTLFxuICBtZXNzYWdlID0+IG1lc3NhZ2Vcbik7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykucmVzZXRQcm92aWRlclN0YXR1c30gKi9cbmV4cG9ydCBjb25zdCByZXNldFByb3ZpZGVyU3RhdHVzID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLlJFU0VUX1BST1ZJREVSX1NUQVRVUyk7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykuc2V0Q2xvdWRQcm92aWRlcn0gKi9cbmV4cG9ydCBjb25zdCBzZXRDbG91ZFByb3ZpZGVyID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLlNFVF9DTE9VRF9QUk9WSURFUiwgcHJvdmlkZXIgPT4gcHJvdmlkZXIpO1xuXG4vKiogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vcHJvdmlkZXItYWN0aW9ucycpLmxvYWRDbG91ZE1hcH0gKi9cbmV4cG9ydCBjb25zdCBsb2FkQ2xvdWRNYXAgPSBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZXMuTE9BRF9DTE9VRF9NQVAsIHBheWxvYWQgPT4gcGF5bG9hZCk7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykubG9hZENsb3VkTWFwU3VjY2Vzc30gKi9cbmV4cG9ydCBjb25zdCBsb2FkQ2xvdWRNYXBTdWNjZXNzID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5MT0FEX0NMT1VEX01BUF9TVUNDRVNTLFxuICBwYXlsb2FkID0+IHBheWxvYWRcbik7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykubG9hZENsb3VkTWFwRXJyb3J9ICovXG5leHBvcnQgY29uc3QgbG9hZENsb3VkTWFwRXJyb3IgPSBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZXMuTE9BRF9DTE9VRF9NQVBfRVJST1IsIHBheWxvYWQgPT4gcGF5bG9hZCk7XG5cbi8qKiBAdHlwZSB7dHlwZW9mIGltcG9ydCgnLi9wcm92aWRlci1hY3Rpb25zJykuZ2V0U2F2ZWRNYXBzfSAqL1xuZXhwb3J0IGNvbnN0IGdldFNhdmVkTWFwcyA9IGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlcy5HRVRfU0FWRURfTUFQUywgcHJvdmlkZXIgPT4gcHJvdmlkZXIpO1xuXG4vKiogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vcHJvdmlkZXItYWN0aW9ucycpLmdldFNhdmVkTWFwc1N1Y2Nlc3N9ICovXG5leHBvcnQgY29uc3QgZ2V0U2F2ZWRNYXBzU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuR0VUX1NBVkVEX01BUFNfU1VDQ0VTUyxcbiAgcGF5bG9hZCA9PiBwYXlsb2FkXG4pO1xuXG4vKiogQHR5cGUge3R5cGVvZiBpbXBvcnQoJy4vcHJvdmlkZXItYWN0aW9ucycpLmdldFNhdmVkTWFwc0Vycm9yfSAqL1xuZXhwb3J0IGNvbnN0IGdldFNhdmVkTWFwc0Vycm9yID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLkdFVF9TQVZFRF9NQVBTX0VSUk9SLCBwYXlsb2FkID0+IHBheWxvYWQpO1xuIl19