'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.pop = exports.changeLocation = exports.changeLoading = exports.changeStatus = exports.renderRoute = exports.changeRoute = exports.initRouter = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _parseLocation = require('parse-location');

var _parseLocation2 = _interopRequireDefault(_parseLocation);

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initRouter = exports.initRouter = function initRouter(router) {
  return {
    type: _const.INIT_ROUTER,
    router: router
  };
};

var changeRoute = exports.changeRoute = function changeRoute(payload) {
  return (0, _extends3.default)({
    type: _const.CHANGE_ROUTE
  }, payload);
};

var renderRoute = exports.renderRoute = function renderRoute(payload) {
  return (0, _extends3.default)({
    type: _const.RENDER_ROUTE
  }, payload);
};

var changeStatus = exports.changeStatus = function changeStatus(status) {
  return {
    type: _const.CHANGE_STATUS,
    status: status
  };
};

var changeLoading = exports.changeLoading = function changeLoading(loading) {
  return {
    type: _const.CHANGE_LOADING,
    loading: loading
  };
};

var changeLocation = exports.changeLocation = function changeLocation() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _extends3.default)({
    type: _const.CHANGE_LOCATION
  }, payload, {
    location: (0, _parseLocation2.default)(payload.location || '')
  });
};

var pop = exports.pop = function pop(location) {
  return changeLocation({
    method: _const.POP,
    location: location
  });
};

var push = exports.push = function push(location, status) {
  return changeLocation({
    method: _const.PUSH,
    location: location,
    status: status
  });
};

var replace = exports.replace = function replace(location, status) {
  return changeLocation({
    method: _const.REPLACE,
    location: location,
    status: status
  });
};

var go = exports.go = function go(index) {
  return {
    type: _const.GO,
    index: index
  };
};

var goBack = exports.goBack = function goBack() {
  return {
    type: _const.GO_BACK
  };
};

var goForward = exports.goForward = function goForward() {
  return {
    type: _const.GO_FORWARD
  };
};