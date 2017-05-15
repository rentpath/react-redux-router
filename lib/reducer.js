'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initial = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initial = exports.initial = {
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

var reduceLocation = function reduceLocation(state, _ref) {
  var location = _ref.location;

  var loc = (0, _extends3.default)({}, location, {
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


  return (0, _assign2.default)(loc, {
    href: [protocol ? protocol + '//' : '', protocol ? hostname : '', protocol && hostname && port ? ':' + port : '', pathname, search, hash].join('')
  });
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var action = arguments[1];

  switch (action.type) {
    case _const.CHANGE_LOCATION:
      return (0, _extends3.default)({}, state, {
        route: action.status ? (0, _extends3.default)({}, state.route, {
          status: action.status
        }) : state.route,
        location: reduceLocation(state.location, action)
      });

    case _const.CHANGE_ROUTE:
      return (0, _extends3.default)({}, state, {
        route: (0, _extends3.default)({}, action.route),
        params: (0, _extends3.default)({}, action.params)
      });

    case _const.RENDER_ROUTE:
      return (0, _extends3.default)({}, state, {
        route: (0, _extends3.default)({}, action.route)
      });

    case _const.CHANGE_STATUS:
      return (0, _extends3.default)({}, state, {
        route: (0, _extends3.default)({}, state.route, {
          status: action.status
        })
      });

    case _const.CHANGE_LOADING:
      return (0, _extends3.default)({}, state, {
        route: {
          loading: action.loading
        }
      });

    default:
      return state;
  }
};