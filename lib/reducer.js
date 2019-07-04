"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.initial = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _const = require("./const");

var initial = {
  route: {
    name: null,
    status: null,
    loading: false
  },
  params: {},
  location: {
    query: {}
  }
};
exports.initial = initial;

var reduceLocation = function reduceLocation(state, _ref) {
  var location = _ref.location;
  var loc = (0, _objectSpread2.default)({}, location, {
    host: location.host || state.host,
    port: location.port || state.port,
    hostname: location.hostname || state.hostname,
    protocol: location.protocol || state.protocol
  });
  var protocol = loc.protocol,
      hostname = loc.hostname,
      port = loc.port,
      pathname = loc.pathname,
      search = loc.search,
      hash = loc.hash;
  return Object.assign(loc, {
    href: [protocol ? "".concat(protocol, "//") : '', protocol ? hostname : '', protocol && hostname && port ? ":".concat(port) : '', pathname, search, hash].join('')
  });
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _const.CHANGE_LOCATION:
      return (0, _objectSpread2.default)({}, state, {
        route: action.status ? (0, _objectSpread2.default)({}, state.route, {
          status: action.status
        }) : state.route,
        location: reduceLocation(state.location, action)
      });

    case _const.CHANGE_ROUTE:
      return (0, _objectSpread2.default)({}, state, {
        route: (0, _objectSpread2.default)({}, action.route),
        params: (0, _objectSpread2.default)({}, action.params)
      });

    case _const.RENDER_ROUTE:
      return (0, _objectSpread2.default)({}, state, {
        route: (0, _objectSpread2.default)({}, action.route)
      });

    case _const.CHANGE_STATUS:
      return (0, _objectSpread2.default)({}, state, {
        route: (0, _objectSpread2.default)({}, state.route, {
          status: action.status
        })
      });

    case _const.CHANGE_LOADING:
      return (0, _objectSpread2.default)({}, state, {
        route: (0, _objectSpread2.default)({}, state.route, {
          loading: action.loading
        })
      });

    default:
      return state;
  }
};

exports.default = _default;