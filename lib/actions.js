"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.pop = exports.changeLocation = exports.changeLoading = exports.changeStatus = exports.renderRoute = exports.changeRoute = exports.initRouter = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _parseLocation = _interopRequireDefault(require("parse-location"));

var _const = require("./const");

var initRouter = function initRouter(router) {
  return {
    type: _const.INIT_ROUTER,
    router: router
  };
};

exports.initRouter = initRouter;

var changeRoute = function changeRoute(payload) {
  return (0, _objectSpread2.default)({
    type: _const.CHANGE_ROUTE
  }, payload);
};

exports.changeRoute = changeRoute;

var renderRoute = function renderRoute(payload) {
  return (0, _objectSpread2.default)({
    type: _const.RENDER_ROUTE
  }, payload);
};

exports.renderRoute = renderRoute;

var changeStatus = function changeStatus(status) {
  return {
    type: _const.CHANGE_STATUS,
    status: status
  };
};

exports.changeStatus = changeStatus;

var changeLoading = function changeLoading(loading) {
  return {
    type: _const.CHANGE_LOADING,
    loading: loading
  };
};

exports.changeLoading = changeLoading;

var changeLocation = function changeLocation() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _objectSpread2.default)({
    type: _const.CHANGE_LOCATION
  }, payload, {
    location: (0, _parseLocation.default)(payload.location || '')
  });
};

exports.changeLocation = changeLocation;

var pop = function pop(location) {
  return changeLocation({
    method: _const.POP,
    location: location
  });
};

exports.pop = pop;

var push = function push(location, status) {
  return changeLocation({
    method: _const.PUSH,
    location: location,
    status: status
  });
};

exports.push = push;

var replace = function replace(location, status) {
  return changeLocation({
    method: _const.REPLACE,
    location: location,
    status: status
  });
};

exports.replace = replace;

var go = function go(index) {
  return {
    type: _const.GO,
    index: index
  };
};

exports.go = go;

var goBack = function goBack() {
  return {
    type: _const.GO_BACK
  };
};

exports.goBack = goBack;

var goForward = function goForward() {
  return {
    type: _const.GO_FORWARD
  };
};

exports.goForward = goForward;